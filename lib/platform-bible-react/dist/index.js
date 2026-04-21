var Ni = Object.defineProperty;
var ki = (t, e, n) => e in t ? Ni(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yt = (t, e, n) => ki(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as lt } from "react/jsx-runtime";
import v, { forwardRef as dn, useRef as H, useMemo as B, useState as D, useCallback as K, useLayoutEffect as Pt, createContext as On, useContext as yr, useEffect as Y, Component as _i, createElement as Ur, Suspense as Ci, Fragment as Co } from "react";
import { Command as Tt } from "cmdk";
import { X as Be, Search as Eo, Check as Ft, Clock as qr, ChevronsLeft as Hr, ChevronsRight as Yr, ChevronLeft as er, ChevronRight as Pe, ArrowLeft as Ei, ArrowRight as Ri, Circle as In, ChevronDown as Ke, BoldIcon as Ti, ItalicIcon as Si, AtSign as Ro, Pencil as Di, Trash2 as Mi, ArrowUp as To, MoreHorizontal as Oi, MailOpen as Ii, Mail as Ai, ChevronUp as So, FilterIcon as Pi, ArrowLeftIcon as $i, ChevronLeftIcon as Li, ChevronRightIcon as Vi, ArrowRightIcon as ji, Copy as Do, Filter as Fi, User as zi, Link as Bi, CircleHelp as Ki, ChevronsUpDown as Mo, Star as Gi, Undo as Ui, Redo as qi, SquareX as Oo, FunctionSquare as Io, SquareSigma as Ao, Ban as Hi, AlertCircle as nr, CircleCheckIcon as Yi, CircleXIcon as Xi, CircleHelpIcon as Wi, ArrowUpIcon as Ji, ArrowDownIcon as Zi, PanelLeft as Qi, PanelRight as ts, ScrollText as es, MenuIcon as ns, Menu as rs, EllipsisVertical as os, MoreVertical as Xr, LoaderCircle as as, GripVertical as is } from "lucide-react";
import { clsx as ss } from "clsx";
import { extendTailwindMerge as ls } from "tailwind-merge";
import * as Ot from "@radix-ui/react-dialog";
import { Canon as ut } from "@sillsdev/scripture";
import { includes as mn, Section as W, getChaptersForBook as cs, formatScrRef as Ne, getSectionForBook as nn, formatRelativeDate as ws, formatReplacementString as ye, sanitizeHtml as ds, NumberFormat as ps, formatBytes as us, getCurrentLocale as ms, usfmMarkers as vn, getFormatCallerFunction as fs, deepEqual as hs, isString as Wr, compareScrRefs as rr, scrRefToBBBCCCVVV as zn, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import { Slot as Ge } from "@radix-ui/react-slot";
import { cva as he } from "class-variance-authority";
import * as $e from "@radix-ui/react-popover";
import * as Po from "@radix-ui/react-label";
import * as sn from "@radix-ui/react-radio-group";
import { createEditor as $o, $getRoot as ie, $createParagraphNode as Ue, $getSelection as Rt, HISTORY_MERGE_TAG as Nr, ParagraphNode as Lo, TextNode as Vo, $isTokenOrSegmented as gs, $getCharacterOffsets as bs, $cloneWithPropertiesEphemeral as vs, $getPreviousSelection as xs, $isRangeSelection as Yt, $caretFromPoint as ys, $getSiblingCaret as jo, $getChildCaret as Ns, $getAdjacentChildCaret as ks, $isChildCaret as _s, $normalizeCaret as Cs, $setSelectionFromCaretRange as Es, $getCollapsedCaretRange as Rs, $getCaretInDirection as Jr, $splitAtPointCaretNext as Ts, $isTextPointCaret as Ss, $findMatchingParent as Fo, $isElementNode as re, mergeRegister as se, getDOMTextNode as Ds, isHTMLElement as zo, CLEAR_EDITOR_COMMAND as Bo, COMMAND_PRIORITY_EDITOR as kr, shallowMergeConfig as Ms, defineExtension as $t, safeCast as Se, createState as Os, FORMAT_TEXT_COMMAND as Ko, $isNodeSelection as Go, COMMAND_PRIORITY_LOW as Uo, RootNode as Is, LineBreakNode as As, TabNode as Ps, $isEditorState as $s, createCommand as Ls, CLICK_COMMAND as Vs, isDOMNode as js, $getNodeFromDOMNode as Fs, $createNodeSelection as zs, $setSelection as Bs, $getEditor as Ks, DecoratorNode as or, $getState as Gs, toggleTextFormatType as Zr, TEXT_TYPE_TO_FORMAT as Us, $setState as qs, addClassNamesToElement as qo, $create as Hs, $getNodeByKey as Ys, removeClassNamesFromElement as Xs, KEY_TAB_COMMAND as Ws, $isBlockElementNode as Nn, $createRangeSelection as Js, $normalizeSelection__EXPERIMENTAL as Zs, OUTDENT_CONTENT_COMMAND as Qs, INDENT_CONTENT_COMMAND as Qr, INSERT_TAB_COMMAND as tl, COMMAND_PRIORITY_CRITICAL as _r, $isDecoratorNode as el, $isParagraphNode as nl, $isTextNode as kn, SELECTION_CHANGE_COMMAND as Ho, getRegisteredNode as rl, isDocumentFragment as to, isDOMDocumentNode as ol, ArtificialNode__DO_NOT_USE as Yo, $createLineBreakNode as Xo, $isRootOrShadowRoot as al, isBlockDomNode as eo, isInlineDomNode as no, $insertNodes as il } from "lexical";
import * as Ce from "@radix-ui/react-tooltip";
import { TooltipTrigger as sl } from "@radix-ui/react-tooltip";
import { HeadingNode as ll, QuoteNode as cl, registerRichText as wl } from "@lexical/rich-text";
import { flushSync as dl, createPortal as pl } from "react-dom";
import { $isTableSelection as ul } from "@lexical/table";
import * as An from "@radix-ui/react-toggle-group";
import * as Wo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Jo } from "@lexical/headless";
import * as Zo from "@radix-ui/react-separator";
import * as qe from "@radix-ui/react-avatar";
import * as nt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ml } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Qo, getFilteredRowModel as fl, getSortedRowModel as ta, getPaginationRowModel as hl, getCoreRowModel as ea, flexRender as rn, getGroupedRowModel as gl, getExpandedRowModel as bl } from "@tanstack/react-table";
import * as dt from "@radix-ui/react-select";
import vl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as ar, HIDDEN_NOTE_CALLER as ir, getDefaultViewOptions as xl, isInsertEmbedOpOfType as fn, Editorial as yl } from "@eten-tech-foundation/platform-editor";
import * as sr from "@radix-ui/react-checkbox";
import * as St from "@radix-ui/react-tabs";
import * as rt from "@radix-ui/react-menubar";
import { useHotkeys as Nl } from "react-hotkeys-hook";
import * as ot from "@radix-ui/react-context-menu";
import { Drawer as zt } from "vaul";
import * as lr from "@radix-ui/react-progress";
import * as Cr from "react-resizable-panels";
import { Toaster as kl } from "sonner";
import { toast as rm } from "sonner";
import * as en from "@radix-ui/react-slider";
import * as cr from "@radix-ui/react-switch";
const _l = ls({ prefix: "tw-" });
function h(...t) {
  return _l(ss(t));
}
const He = 250, na = 300, Cl = 400, El = 450, Rl = 500, Tl = "layoutDirection";
function mt() {
  const t = localStorage.getItem(Tl);
  return t === "rtl" ? t : "ltr";
}
const Sl = Ot.Root, Hp = Ot.Trigger, Dl = Ot.Portal, Yp = Ot.Close, ra = v.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  Ot.Overlay,
  {
    ref: o,
    className: h(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: El, ...e },
    ...n
  }
));
ra.displayName = Ot.Overlay.displayName;
const oa = v.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, i) => {
  const s = mt();
  return /* @__PURE__ */ p(Dl, { children: [
    /* @__PURE__ */ r(ra, { className: n }),
    /* @__PURE__ */ p(
      Ot.Content,
      {
        ref: i,
        className: h(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: Rl, ...o },
        ...a,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ p(
            Ot.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": s === "ltr" },
                { "tw-left-4": s === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Be, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
oa.displayName = Ot.Content.displayName;
function aa({ className: t, ...e }) {
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
aa.displayName = "DialogHeader";
function Ml({ className: t, ...e }) {
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
Ml.displayName = "DialogFooter";
const ia = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ot.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ia.displayName = Ot.Title.displayName;
const Ol = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ot.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ol.displayName = Ot.Description.displayName;
const ce = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ce.displayName = Tt.displayName;
const Ye = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Eo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Tt.Input,
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
Ye.displayName = Tt.Input.displayName;
const we = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
we.displayName = Tt.List.displayName;
const pn = v.forwardRef((t, e) => /* @__PURE__ */ r(Tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
pn.displayName = Tt.Empty.displayName;
const Xt = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Xt.displayName = Tt.Group.displayName;
const Er = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Er.displayName = Tt.Separator.displayName;
const Jt = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Jt.displayName = Tt.Item.displayName;
function sa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
sa.displayName = "CommandShortcut";
const la = (t, e, n, o, a) => {
  switch (t) {
    case W.OT:
      return e ?? "Old Testament";
    case W.NT:
      return n ?? "New Testament";
    case W.DC:
      return o ?? "Deuterocanon";
    case W.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Il = (t, e, n, o, a) => {
  switch (t) {
    case W.OT:
      return e ?? "OT";
    case W.NT:
      return n ?? "NT";
    case W.DC:
      return o ?? "DC";
    case W.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ie(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ut.bookIdToEnglishName(t);
}
function Rr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ca = ut.allBookIds.filter(
  (t) => !ut.isObsolete(ut.bookIdToNumber(t))
), ke = Object.fromEntries(
  ca.map((t) => [t, ut.bookIdToEnglishName(t)])
);
function Tr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ut.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(mn(a.toLowerCase(), o) || mn(t.toLowerCase(), o) || (i ? mn(i.localizedName.toLowerCase(), o) || mn(i.localizedId.toLowerCase(), o) : !1));
}
const wa = dn(
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
    const d = H(!1), m = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (x) => {
      d.current = !0, o ? o(x) : n == null || n(t);
    }, u = B(
      () => Ie(t, l),
      [t, l]
    ), g = B(
      () => Rr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === W.OT,
            "tw-border-s-purple-200": a === W.NT,
            "tw-border-s-indigo-200": a === W.DC,
            "tw-border-s-amber-200": a === W.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          Jt,
          {
            ref: w,
            value: c || `${t} ${ut.bookIdToEnglishName(t)}`,
            onSelect: m,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ut.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Ft,
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
), da = he(
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
), z = v.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ge : "button", { className: h(da({ variant: e, size: n, className: t })), ref: i, ...a })
);
z.displayName = "Button";
const de = $e.Root, ge = $e.Trigger, Al = $e.Anchor, Zt = v.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, i) => {
  const s = mt();
  return /* @__PURE__ */ r($e.Portal, { children: /* @__PURE__ */ r(
    $e.Content,
    {
      ref: i,
      align: e,
      sideOffset: n,
      className: h(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: He, ...o },
      ...a,
      dir: s
    }
  ) });
});
Zt.displayName = $e.Content.displayName;
function wr(t, e, n) {
  return `${t} ${ke[t]}${e ? ` ${Rr(t, e)} ${Ie(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Pl({
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
  const [d, m] = D(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(de, { open: d, onOpenChange: m, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(qr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Zt, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ce, { children: /* @__PURE__ */ r(we, { children: /* @__PURE__ */ r(Xt, { heading: i, children: t.map((u) => /* @__PURE__ */ p(
      Jt,
      {
        onSelect: () => f(u),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(qr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function Xp(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Bn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, $l = [
  Bn.BOOK_ONLY,
  Bn.BOOK_CHAPTER,
  Bn.BOOK_CHAPTER_VERSE
];
function ro(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Ht(t) {
  return cs(ut.bookIdToNumber(t));
}
function Ll(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = $l.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let d;
        const m = e.filter((f) => Tr(f, l, n));
        if (m.length === 1 && ([d] = m), !d && c) {
          if (ut.isBookIdValid(l)) {
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
        if (!d && c) {
          const u = ((g) => Object.keys(ke).find(
            (x) => ke[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = c ? parseInt(c, 10) : void 0;
          f && f > Ht(d) && (f = Math.max(Ht(d), 1));
          const u = w ? parseInt(w, 10) : void 0;
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
function Vl(t, e, n, o) {
  const a = K(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const w = e[c - 1], d = Math.max(Ht(w), 1);
        o({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = K(() => {
    const c = Ht(t.book);
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
  }, [t, e, o]), s = K(() => {
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
  return B(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Hr : Yr
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? er : Pe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Pe : er
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Ht(t.book) || Ht(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Yr : Hr
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
function oo({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Xt, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Ht(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      Jt,
      {
        value: `${t} ${ke[t] || ""} ${s}`,
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
function Wp({
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
  const w = mt(), [d, m] = D(!1), [f, u] = D(""), [g, x] = D(""), [b, y] = D("books"), [N, _] = D(void 0), [k, L] = D(!1), F = H(void 0), A = H(void 0), R = H(void 0), C = H(void 0), S = H({}), j = K(
    (M) => {
      e(M), l && l(M);
    },
    [e, l]
  ), $ = B(() => o ? o() : ca, [o]), I = B(() => ({
    [W.OT]: $.filter((E) => ut.isBookOT(E)),
    [W.NT]: $.filter((E) => ut.isBookNT(E)),
    [W.DC]: $.filter((E) => ut.isBookDC(E)),
    [W.Extra]: $.filter((E) => ut.extraBooks().includes(E))
  }), [$]), P = B(() => Object.values(I).flat(), [I]), X = B(() => {
    if (!g.trim()) return I;
    const M = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return [W.OT, W.NT, W.DC, W.Extra].forEach((V) => {
      M[V] = I[V].filter((U) => Tr(U, g, a));
    }), M;
  }, [I, g, a]), O = B(
    () => Ll(g, P, a),
    [g, P, a]
  ), J = K(() => {
    O && (j({
      book: O.book,
      chapterNum: O.chapterNum ?? 1,
      verseNum: O.verseNum ?? 1
    }), m(!1), x(""), u(""));
  }, [j, O]), Dt = K(
    (M) => {
      if (Ht(M) <= 1) {
        j({
          book: M,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), x("");
        return;
      }
      _(M), y("chapters");
    },
    [j]
  ), Lt = K(
    (M) => {
      const E = b === "chapters" ? N : O == null ? void 0 : O.book;
      E && (j({
        book: E,
        chapterNum: M,
        verseNum: 1
      }), m(!1), y("books"), _(void 0), x(""));
    },
    [j, b, N, O]
  ), It = K(
    (M) => {
      j(M), m(!1), x("");
    },
    [j]
  ), gt = Vl(t, P, w, e), pt = K(() => {
    y("books"), _(void 0), setTimeout(() => {
      A.current && A.current.focus();
    }, 0);
  }, []), G = K(
    (M) => {
      if (!M && b === "chapters") {
        pt();
        return;
      }
      m(M), M && (y("books"), _(void 0), x(""));
    },
    [b, pt]
  ), { otLong: at, ntLong: it, dcLong: ct, extraLong: xt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, te = K(
    (M) => la(M, at, it, ct, xt),
    [at, it, ct, xt]
  ), Kt = K(
    (M) => O ? !!O.chapterNum && !M.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), Gt = B(
    () => Ne(
      t,
      a ? Ie(t.book, a) : "English"
    ),
    [t, a]
  ), De = K((M) => (E) => {
    S.current[M] = E;
  }, []), ue = K((M) => {
    (M.key === "Home" || M.key === "End") && M.stopPropagation();
  }, []), ee = K(
    (M) => {
      if (M.ctrlKey) return;
      const { isLetter: E, isDigit: V } = ro(M.key);
      if (b === "chapters") {
        if (M.key === "Backspace") {
          M.preventDefault(), M.stopPropagation(), pt();
          return;
        }
        if (E || V) {
          if (M.preventDefault(), M.stopPropagation(), y("books"), _(void 0), V && N) {
            const U = ke[N];
            x(`${U} ${M.key}`);
          } else
            x(M.key);
          setTimeout(() => {
            A.current && A.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && O) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(M.key)) {
        const U = b === "chapters" ? N : O == null ? void 0 : O.book;
        if (!U) return;
        const q = (() => {
          if (!f) return 1;
          const wt = f.match(/(\d+)$/);
          return wt ? parseInt(wt[1], 10) : 0;
        })(), st = Ht(U);
        if (!st) return;
        let tt = q;
        const bt = 6;
        switch (M.key) {
          case "ArrowLeft":
            q !== 0 && (tt = q > 1 ? q - 1 : st);
            break;
          case "ArrowRight":
            q !== 0 && (tt = q < st ? q + 1 : 1);
            break;
          case "ArrowUp":
            tt = q === 0 ? st : Math.max(1, q - bt);
            break;
          case "ArrowDown":
            tt = q === 0 ? 1 : Math.min(st, q + bt);
            break;
          default:
            return;
        }
        tt !== q && (M.preventDefault(), M.stopPropagation(), u(wr(U, a, tt)), setTimeout(() => {
          const wt = S.current[tt];
          wt && wt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      O,
      pt,
      N,
      f,
      a
    ]
  ), Ze = K((M) => {
    if (M.shiftKey || M.key === "Tab" || M.key === " ") return;
    const { isLetter: E, isDigit: V } = ro(M.key);
    (E || V) && (M.preventDefault(), x((U) => U + M.key), A.current.focus(), L(!1));
  }, []);
  return Pt(() => {
    const M = setTimeout(() => {
      if (d && b === "books" && R.current && C.current) {
        const E = R.current, V = C.current, U = V.offsetTop, q = E.clientHeight, st = V.clientHeight, tt = U - q / 2 + st / 2;
        E.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), u(wr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(M);
    };
  }, [d, b, g, O, t.book]), Pt(() => {
    if (b === "chapters" && N) {
      const M = N === t.book;
      setTimeout(() => {
        if (R.current)
          if (M) {
            const E = S.current[t.chapterNum];
            E && E.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            R.current.scrollTo({ top: 0 });
        F.current && F.current.focus();
      }, 0);
    }
  }, [b, N, O, t.book, t.chapterNum]), /* @__PURE__ */ p(de, { open: d, onOpenChange: G, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Gt })
      }
    ) }),
    /* @__PURE__ */ r(Zt, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      ce,
      {
        ref: F,
        onKeyDown: ee,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ye,
                {
                  ref: A,
                  value: g,
                  onValueChange: x,
                  onKeyDown: ue,
                  onFocus: () => L(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Pl,
                {
                  recentSearches: s,
                  onSearchItemSelect: It,
                  renderItem: (M) => Ne(M, "English"),
                  getItemKey: (M) => `${M.book}-${M.chapterNum}-${M.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: gt.map(({ onClick: M, disabled: E, title: V, icon: U }) => /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  L(!0), M();
                },
                disabled: E,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: V,
                onKeyDown: Ze,
                children: /* @__PURE__ */ r(U, {})
              },
              V
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: pt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(Ei, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ri, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Ie(N, a) })
          ] }),
          !k && /* @__PURE__ */ p(we, { ref: R, children: [
            b === "books" && /* @__PURE__ */ p(lt, { children: [
              !O && Object.entries(X).map(([M, E]) => {
                if (E.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Xt, { heading: te(M), children: E.map((V) => /* @__PURE__ */ r(
                      wa,
                      {
                        bookId: V,
                        onSelect: (U) => Dt(U),
                        section: nn(V),
                        commandValue: `${V} ${ke[V]}`,
                        ref: V === t.book ? C : void 0,
                        localizedBookNames: a
                      },
                      V
                    )) }, M)
                  );
              }),
              O && /* @__PURE__ */ r(Xt, { children: /* @__PURE__ */ r(
                Jt,
                {
                  value: `${O.book} ${ke[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                  onSelect: J,
                  className: "tw-font-semibold tw-text-primary",
                  children: Ne(
                    {
                      book: O.book,
                      chapterNum: O.chapterNum ?? 1,
                      verseNum: O.verseNum ?? 1
                    },
                    a ? Rr(O.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              O && Ht(O.book) > 1 && /* @__PURE__ */ p(lt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Ie(O.book, a) }),
                /* @__PURE__ */ r(
                  oo,
                  {
                    bookId: O.book,
                    scrRef: t,
                    onChapterSelect: Lt,
                    setChapterRef: De,
                    isChapterDimmed: Kt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && N && /* @__PURE__ */ r(
              oo,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: Lt,
                setChapterRef: De,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Jp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), jl = he(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ht = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Po.Root, { ref: n, className: h("pr-twp", jl(), t), ...e }));
ht.displayName = Po.Root.displayName;
const Sr = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    sn.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Sr.displayName = sn.Root.displayName;
const _n = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  sn.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(sn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(In, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
_n.displayName = sn.Item.displayName;
function Fl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function dr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = Fl,
  getButtonLabel: w,
  icon: d = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: b = !1,
  ariaLabel: y,
  ...N
}) {
  const [_, k] = D(!1), L = w ?? c, F = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], A = (R, C) => {
    const S = c(R), j = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, $ = `${C ?? ""}${S}${j ?? ""}`;
    return /* @__PURE__ */ p(
      Jt,
      {
        value: S,
        onSelect: () => {
          l(R), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Ft,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || c(s) !== S
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            S,
            j && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              j
            ] })
          ] })
        ]
      },
      $
    );
  };
  return /* @__PURE__ */ p(de, { open: _, onOpenChange: k, ...N, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ p(
      z,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": y,
        id: t,
        className: h(
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
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? L(s) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(Ke, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Zt,
      {
        align: x,
        className: h("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ p(ce, { children: [
          /* @__PURE__ */ r(Ye, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(pn, { children: u }),
          /* @__PURE__ */ r(we, { children: F(e) ? e.map((R) => /* @__PURE__ */ r(Xt, { heading: R.groupHeading, children: R.options.map((C) => A(C, R.groupHeading)) }, R.groupHeading)) : e.map((R) => A(R)) })
        ] })
      }
    )
  ] });
}
function zl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = B(
    () => Array.from({ length: i }, (w, d) => d + 1),
    [i]
  );
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ r(ht, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      dr,
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
    /* @__PURE__ */ r(ht, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      dr,
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
var pr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(pr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(pr || (pr = {}));
const Zp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Kn = (t, e) => t[e] ?? e;
function Qp({
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
  const d = Kn(w, "%webView_bookSelector_currentBook%"), m = Kn(w, "%webView_bookSelector_choose%"), f = Kn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), x = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ r(
    Sr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (b) => x(b),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(_n, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ht, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(ht, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            zl,
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
            /* @__PURE__ */ r(_n, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ht, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(ht, { className: "tw-flex tw-items-center", children: o.map((b) => ut.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ r(
            z,
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
const pa = On(null);
function Bl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Qt() {
  const t = yr(pa);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ua = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Kl = ua ? Pt : Y, hn = { tag: Nr };
function Gl({ initialConfig: t, children: e }) {
  const n = B(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = Bl(null, o), d = $o({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (m) => s(m, d), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = ie();
          if (u.isEmpty()) {
            const g = Ue();
            u.append(g);
            const x = ua ? document.activeElement : null;
            (Rt() !== null || x !== null && x === m.getRootElement()) && g.select();
          }
        }, hn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, hn);
            break;
          }
          case "object":
            m.setEditorState(f, hn);
            break;
          case "function":
            m.update(() => {
              ie().isEmpty() && f(m);
            }, hn);
        }
      }
    }(d, l), [d, w];
  }, []);
  return Kl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(pa.Provider, { value: n, children: e });
}
const Ul = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : Y;
function ql({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Qt();
  return Ul(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(Nr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const Dr = {
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
}, kt = Ce.Provider, Ct = Ce.Root, Et = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Ce.Trigger,
  {
    ref: o,
    className: e ? h(da({ variant: e }), t) : t,
    ...n
  }
));
Et.displayName = Ce.Trigger.displayName;
const _t = v.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Ce.Portal, { children: /* @__PURE__ */ r(
  Ce.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: He, ...n },
    className: h(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
_t.displayName = Ce.Content.displayName;
const Mr = [
  ll,
  Lo,
  Vo,
  cl
], Hl = On(null), Gn = {
  didCatch: !1,
  error: null
};
class Yl extends _i {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Gn;
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
      }), this.setState(Gn);
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
    if (o && n.error !== null && Xl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Gn);
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
        l = Ur(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Ur(Hl.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Xl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function Wl({ children: t, onError: e }) {
  return r(Yl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Jl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : Y;
function Zl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Ql() {
  return function(t) {
    const [e] = Qt(), n = B(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), i = H(o);
    return Jl(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(Zl);
}
function tc(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), i = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = Array.from(e.getClientRects());
  let l, c = s.length;
  s.sort((w, d) => {
    const m = w.top - d.top;
    return Math.abs(m) <= 3 ? w.left - d.left : m;
  });
  for (let w = 0; w < c; w++) {
    const d = s[w], m = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, f = d.width + i === o.width;
    m || f ? (s.splice(w--, 1), c--) : l = d;
  }
  return s;
}
function ec(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !gs(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), d = e.is(c);
    if (w || d) {
      const [m, f] = bs(t), u = l.is(c), g = e.is(s ? c : l), x = e.is(s ? l : c);
      let b, y = 0;
      u ? (y = m > f ? f : m, b = m > f ? m : f) : g ? (y = s ? f : m, b = void 0) : x && (y = 0, b = s ? m : f);
      const N = e.__text.slice(y, b);
      N !== e.__text && (n === "clone" && (e = vs(e)), e.__text = N);
    }
  }
  return e;
}
function Cn(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ma = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, nc = ma && "documentMode" in document ? document.documentMode : null;
!(!ma || !("InputEvent" in window) || nc) && "getTargetRanges" in new window.InputEvent("input");
function qt(t) {
  return `${t}px`;
}
const rc = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function oc(t, e, n) {
  let o = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function c() {
    o === null && Cn(182), a === null && Cn(183);
    const { left: m, top: f } = a.getBoundingClientRect(), u = tc(t, e);
    var g, x;
    l.isConnected || (x = l, (g = a).insertBefore(x, g.firstChild));
    let b = !1;
    for (let y = 0; y < u.length; y++) {
      const N = u[y], _ = s[y] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const L = qt(N.left - m);
      k.left !== L && (k.left = L, b = !0);
      const F = qt(N.top - f);
      k.top !== F && (_.style.top = F, b = !0);
      const A = qt(N.width);
      k.width !== A && (_.style.width = A, b = !0);
      const R = qt(N.height);
      k.height !== R && (_.style.height = R, b = !0), _.parentNode !== l && (l.append(_), b = !0), s[y] = _;
    }
    for (; s.length > u.length; ) s.pop();
    b && n(s);
  }
  function w() {
    a = null, o = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const m of s) m.remove();
    s = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function m() {
    const f = t.getRootElement();
    if (f === null) return w();
    const u = f.parentElement;
    if (!zo(u)) return w();
    w(), o = f, a = u, i = new MutationObserver((g) => {
      const x = t.getRootElement(), b = x && x.parentElement;
      if (x !== o || b !== a) return m();
      for (const y of g) if (!l.contains(y.target)) return c();
    }), i.observe(u, rc), c();
  });
  return () => {
    d(), w();
  };
}
function ao(t, e, n) {
  if (t.type !== "text" && re(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Ds(n) || n, t.offset];
}
function ac(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== qt(-1.5) && (n.marginTop = qt(-1.5)), n.paddingTop !== qt(4) && (n.paddingTop = qt(4)), n.paddingBottom !== qt(0) && (n.paddingBottom = qt(0));
  }
}
function ic(t, e = ac) {
  let n = null, o = null, a = null, i = null, s = null, l = null, c = () => {
  };
  function w(d) {
    d.read(() => {
      const m = Rt();
      if (!Yt(m)) return n = null, a = null, i = null, l = null, c(), void (c = () => {
      });
      const [f, u] = function(R) {
        const C = R.getStartEndPoints();
        return R.isBackward() ? [C[1], C[0]] : C;
      }(m), g = f.getNode(), x = g.getKey(), b = f.offset, y = u.getNode(), N = y.getKey(), _ = u.offset, k = t.getElementByKey(x), L = t.getElementByKey(N), F = n === null || k !== o || b !== a || x !== n.getKey(), A = i === null || L !== s || _ !== l || N !== i.getKey();
      if ((F || A) && k !== null && L !== null) {
        const R = function(C, S, j, $, I, P, X) {
          const O = (C._window ? C._window.document : document).createRange();
          return O.setStart(...ao(S, j, $)), O.setEnd(...ao(I, P, X)), O;
        }(t, f, g, k, u, y, L);
        c(), c = oc(t, R, e);
      }
      n = g, o = k, a = b, i = y, s = L, l = _;
    });
  }
  return w(t.getEditorState()), se(t.registerUpdateListener(({ editorState: d }) => w(d)), () => {
    c();
  });
}
function sc(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? n !== null && (n(), n = null) : n === null && (n = ic(t, e));
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
function lc(t) {
  const e = Fo(t, (n) => re(n) && !n.isInline());
  return re(e) || Cn(4, t.__key), e;
}
function cc(t) {
  const e = Rt() || xs();
  let n;
  if (Yt(e)) n = ys(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (n = jo(l, "next"));
    }
    n = n || Ns(ie(), "previous").getFlipped().insert(Ue());
  }
  const o = wc(t, n), a = ks(o), i = _s(a) ? Cs(a) : o;
  return Es(Rs(i)), t.getLatest();
}
function wc(t, e, n) {
  let o = Jr(e, "next");
  for (let a = o; a; a = Ts(a, n)) o = a;
  return Ss(o) && Cn(283), o.insert(t.isInline() ? Ue().append(t) : t), Jr(jo(t.getLatest(), "next"), e.direction);
}
function dc(t) {
  const e = Rt();
  if (!Yt(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Fo(i, (w) => re(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !n.has(c) && (n.add(c), t(l));
  }
  return n.size > 0;
}
const pc = Symbol.for("preact-signals");
function Pn() {
  if (oe > 1) return void oe--;
  let t, e = !1;
  for (!function() {
    let n = En;
    for (En = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); on !== void 0; ) {
    let n = on;
    for (on = void 0, Rn++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && fa(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (Rn = 0, oe--, e) throw t;
}
function uc(t) {
  if (oe > 0) return t();
  ur = ++mc, oe++;
  try {
    return t();
  } finally {
    Pn();
  }
}
let Z, on;
function io(t) {
  const e = Z;
  Z = void 0;
  try {
    return t();
  } finally {
    Z = e;
  }
}
let En, oe = 0, Rn = 0, mc = 0, ur = 0, xn = 0;
function so(t) {
  if (Z === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Z ? (e = { i: 0, S: t, p: Z.s, n: void 0, t: Z, e: void 0, x: void 0, r: e }, Z.s !== void 0 && (Z.s.n = e), Z.s = e, t.n = e, 32 & Z.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Z.s, e.n = void 0, Z.s.n = e, Z.s = e), e) : void 0;
}
function Nt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ln(t, e) {
  return new Nt(t, e);
}
function fa(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function lo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function ha(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ve(t, e) {
  Nt.call(this, void 0), this.x = t, this.s = void 0, this.g = xn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function fc(t, e) {
  return new ve(t, e);
}
function ga(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    oe++;
    const n = Z;
    Z = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Or(t), o;
    } finally {
      Z = n, Pn();
    }
  }
}
function Or(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ga(t);
}
function hc(t) {
  if (Z !== this) throw new Error("Out-of-order effect");
  ha(this), Z = t, this.f &= -2, 8 & this.f && Or(this), Pn();
}
function Oe(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Wt(t, e) {
  const n = new Oe(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Xe(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = ln(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
Nt.prototype.brand = pc, Nt.prototype.h = function() {
  return !0;
}, Nt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : io(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Nt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && io(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Nt.prototype.subscribe = function(t) {
  return Wt(() => {
    const e = this.value, n = Z;
    Z = void 0;
    try {
      t(e);
    } finally {
      Z = n;
    }
  }, { name: "sub" });
}, Nt.prototype.valueOf = function() {
  return this.value;
}, Nt.prototype.toString = function() {
  return this.value + "";
}, Nt.prototype.toJSON = function() {
  return this.value;
}, Nt.prototype.peek = function() {
  const t = Z;
  Z = void 0;
  try {
    return this.value;
  } finally {
    Z = t;
  }
}, Object.defineProperty(Nt.prototype, "value", { get() {
  const t = so(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Rn > 100) throw new Error("Cycle detected");
    (function(e) {
      oe !== 0 && Rn === 0 && e.l !== ur && (e.l = ur, En = { S: e, v: e.v, i: e.i, o: En });
    })(this), this.v = t, this.i++, xn++, oe++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Pn();
    }
  }
} }), ve.prototype = new Nt(), ve.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === xn)) return !0;
  if (this.g = xn, this.f |= 1, this.i > 0 && !fa(this)) return this.f &= -2, !0;
  const t = Z;
  try {
    lo(this), Z = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Z = t, ha(this), this.f &= -2, !0;
}, ve.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Nt.prototype.S.call(this, t);
}, ve.prototype.U = function(t) {
  if (this.t !== void 0 && (Nt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ve.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ve.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = so(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Oe.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Oe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ga(this), lo(this), oe++;
  const t = Z;
  return Z = this, hc.bind(this, t);
}, Oe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = on, on = this);
}, Oe.prototype.d = function() {
  this.f |= 8, 1 & this.f || Or(this);
}, Oe.prototype.dispose = function() {
  this.d();
};
$t({ build: (t, e, n) => Xe(e), config: Se({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return Wt(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ba() {
  const t = ie(), e = Rt(), n = Ue();
  t.clear(), t.append(n), e !== null && n.select(), Yt(e) && (e.format = 0);
}
function va(t, e = ba) {
  return t.registerCommand(Bo, (n) => (t.update(e), !0), kr);
}
$t({ build: (t, e, n) => Xe(e), config: Se({ $onClear: ba }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return Wt(() => va(t, o.value));
} });
function gc(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Un = Os("format", { parse: (t) => typeof t == "number" ? t : 0 });
class xa extends or {
  $config() {
    return this.config("decorator-text", { extends: or, stateConfigs: [{ flat: !0, stateConfig: Un }] });
  }
  getFormat() {
    return Gs(this, Un);
  }
  getFormatFlags(e, n) {
    return Zr(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Us[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return qs(this, Un, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Zr(n, e, null);
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
function bc(t) {
  return t instanceof xa;
}
$t({ name: "@lexical/extension/DecoratorText", nodes: () => [xa], register: (t, e, n) => t.registerCommand(Ko, (o) => {
  const a = Rt();
  if (Go(a) || Yt(a)) for (const i of a.getNodes()) bc(i) && i.toggleFormat(o);
  return !1;
}, Uo) });
function ya(t, e) {
  let n;
  return ln(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const mr = $t({ build: (t) => ya(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Na(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Na(n[a], o[a]);
    return t;
  }
  return e;
}
const Ir = 0, fr = 1, ka = 2, qn = 3, gn = 4, Me = 5, Hn = 6, Qe = 7;
function Yn(t) {
  return t.id === Ir;
}
function _a(t) {
  return t.id === ka;
}
function vc(t) {
  return function(e) {
    return e.id === fr;
  }(t) || et(305, String(t.id), String(fr)), Object.assign(t, { id: ka });
}
const xc = /* @__PURE__ */ new Set();
class yc {
  constructor(e, n) {
    yt(this, "builder");
    yt(this, "configs");
    yt(this, "_dependency");
    yt(this, "_peerNameSet");
    yt(this, "extension");
    yt(this, "state");
    yt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ir };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ms;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    _a(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: qn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: gn, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== gn && et(307, String(n.id), String(Me)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Me, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Me && et(308, String(o.id), String(Me));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Hn });
    }(o), () => {
      const i = this.state;
      i.id !== Qe && et(309, String(o.id), String(Qe)), this.state = function(s) {
        return Object.assign(s, { id: Me });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Hn && et(310, String(n.id), String(Hn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Qe });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= gn;
    }(e) || et(313, String(e.id), String(gn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= qn;
    }(e) || et(314, String(e.id), String(qn)), { config: e.config };
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
      return n.id >= Qe;
    }(e) || et(316, String(e.id), String(Qe)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || xc;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= Me;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const co = { tag: Nr };
function Nc() {
  const t = ie();
  t.isEmpty() && t.append(Ue());
}
const kc = $t({ config: Se({ setOptions: co, updateOptions: co }), init: ({ $initialEditorState: t = Nc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if ($s(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Is, Vo, As, Ps, Lo] }), wo = Symbol.for("@lexical/extension/LexicalBuilder");
function po() {
}
function _c(t) {
  throw t;
}
function bn(t) {
  return Array.isArray(t) ? t : [t];
}
const Xn = "0.43.0+prod.esm";
class Ae {
  constructor(e) {
    yt(this, "roots");
    yt(this, "extensionNameMap");
    yt(this, "outgoingConfigEdges");
    yt(this, "incomingEdges");
    yt(this, "conflicts");
    yt(this, "_sortedExtensionReps");
    yt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Xn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [bn(kc)];
    for (const o of e) n.push(bn(o));
    return new Ae(n);
  }
  static maybeFromEditor(e) {
    const n = e[wo];
    return n && (n.PACKAGE_VERSION !== Xn && et(292, n.PACKAGE_VERSION, Xn), n instanceof Ae || et(293)), n;
  }
  static fromEditor(e) {
    const n = Ae.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign($o({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [wo]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = po;
    function n() {
      try {
        e();
      } finally {
        e = po;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = se(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const n = bn(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new yc(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && et(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && et(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = bn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (_a(i)) return;
      const s = o.extension.name;
      var l;
      Yn(i) || et(300, s, a || "[unknown]"), Yn(l = i) || et(304, String(l.id), String(Ir)), i = Object.assign(l, { id: fr }), o.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && n(d, s);
      }
      i = vc(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Yn(o.state) && n(o);
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
    return se(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: m } = d;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of gc(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && et(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, d);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(i, m.html.import);
      }
      m.theme && Na(s, m.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = _c), e;
  }
}
const Cc = /* @__PURE__ */ new Set(), uo = $t({ build(t, e, n) {
  const o = n.getDependency(mr).output, a = ln({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ya(() => {
  }, () => Wt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Rt()) for (const [d, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(d);
          continue;
        }
        const f = Ys(d), u = f && f.isSelected() || !1;
        w = w || u !== (!!s && s.has(d)), u && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = fc(() => (i.value || Cc).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [mr], name: "@lexical/extension/NodeSelection" }), Ec = Ls("INSERT_HORIZONTAL_RULE_COMMAND");
class Le extends or {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Le(e.__key);
  }
  static importJSON(e) {
    return Ar().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Rc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return qo(n, e.theme.hr), n;
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
function Rc() {
  return { node: Ar() };
}
function Ar() {
  return Hs(Le);
}
function Tc(t) {
  return t instanceof Le;
}
$t({ dependencies: [mr, uo], name: "@lexical/extension/HorizontalRule", nodes: () => [Le], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(uo).output, a = ln({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return se(t.registerCommand(Ec, (s) => {
    const l = Rt();
    if (!Yt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const c = Ar();
      cc(c);
    }
    return !0;
  }, kr), t.registerCommand(Vs, (s) => {
    if (js(s.target)) {
      const l = Fs(s.target);
      if (Tc(l)) return function(c, w = !1) {
        const d = Rt(), m = c.isSelected(), f = c.getKey();
        let u;
        w && Go(d) ? u = d : (u = zs(), Bs(u)), m ? u.delete(f) : u.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Uo), t.registerMutationListener(Le, (s, l) => {
    uc(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, m] of s.entries()) if (m === "destroyed") w.delete(d), c = !0;
      else {
        const f = w.get(d), u = t.getElementByKey(d);
        f ? f.domNode.value = u : (c = !0, w.set(d, { domNode: ln(u), selectedSignal: o(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), Wt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(Wt(() => {
      const w = l.value;
      w && (c.value ? qo(w, i) : Xs(w, i));
    }));
    return se(...s);
  }));
} });
$t({ build: (t, e) => Xe({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Se({ $getParentEditor: function() {
  const t = Ks();
  return Ae.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => Wt(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
$t({ build: (t, e, n) => Xe(e), config: Se({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return Wt(() => {
    if (!o.disabled.value) return sc(t, o.onReposition.value);
  });
} });
function Ca(t) {
  return t.canBeEmpty();
}
function Sc(t, e, n = Ca) {
  return se(t.registerCommand(Ws, (o) => {
    const a = Rt();
    if (!Yt(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => Nn(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), m = lc(d);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = Js();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = Zs(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Qs : Qr : tl;
    return t.dispatchCommand(i, void 0);
  }, kr), t.registerCommand(Qr, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Rt();
    if (!Yt(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return dc((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, _r));
}
$t({ build: (t, e, n) => Xe(e), config: Se({ $canIndent: Ca, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return Wt(() => {
    if (!o.value) return Sc(t, a, i);
  });
} });
const Dc = $t({ name: "@lexical/react/ReactProvider" });
function Mc() {
  return ie().getTextContent();
}
function Oc(t, e = !0) {
  if (t) return !1;
  let n = Mc();
  return e && (n = n.trim()), n === "";
}
function Ic(t) {
  if (!Oc(t, !1)) return !1;
  const e = ie().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (el(a)) return !1;
    if (re(a)) {
      if (!nl(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!kn(c)) return !1;
      }
    }
  }
  return !0;
}
function Ea(t) {
  return () => Ic(t);
}
function Ra(t) {
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
            const [w, d, m, f, u] = c;
            t.update(() => {
              const g = Rt();
              if (Yt(g)) {
                const x = g.anchor;
                let b = x.getNode(), y = 0, N = 0;
                if (kn(b) && w >= 0 && d >= 0 && (y = w, N = w + d, g.setTextNodeRange(b, y, b, N)), y === N && m === "" || (g.insertRawText(m), b = x.getNode()), kn(b)) {
                  y = f, N = f + u;
                  const _ = b.getTextContentSize();
                  y = y > _ ? _ : y, N = N > _ ? _ : N, g.setTextNodeRange(b, y, b, N);
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
$t({ build: (t, e, n) => Xe(e), config: Se({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => Wt(() => n.getOutput().disabled.value ? void 0 : Ra(t)) });
function Ac(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Pr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : Y;
function Pc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = D(() => n.getDecorators());
    return Pr(() => n.registerDecoratorListener((s) => {
      dl(() => {
        i(s);
      });
    }), [n]), Y(() => {
      i(n.getDecorators());
    }, [n]), B(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = r(o, { onError: (f) => n._onError(f), children: r(Ci, { fallback: null, children: a[w] }) }), m = n.getElementByKey(w);
        m !== null && s.push(pl(d, m, w));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function $c({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Ae.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Dc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Ac(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Pc, { editor: t, ErrorBoundary: e });
}
function mo(t) {
  return t.getEditorState().read(Ea(t.isComposing()));
}
function Lc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Qt();
  return function(a) {
    Pr(() => se(wl(a), Ra(a)), [a]);
  }(o), p(lt, { children: [t, r(Vc, { content: e }), r($c, { editor: o, ErrorBoundary: n })] });
}
function Vc({ content: t }) {
  const [e] = Qt(), n = function(a) {
    const [i, s] = D(() => mo(a));
    return Pr(() => {
      function l() {
        const c = mo(a);
        s(c);
      }
      return l(), se(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = Ql();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function jc({ defaultSelection: t }) {
  const [e] = Qt();
  return Y(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Fc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : Y;
function zc({ onClear: t }) {
  const [e] = Qt();
  return Fc(() => va(e, t), [e, t]), null;
}
const Ta = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : Y;
function Bc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: x, role: b = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...L }, F) {
  const [A, R] = D(t.isEditable()), C = K((j) => {
    j && j.ownerDocument && j.ownerDocument.defaultView ? t.setRootElement(j) : t.setRootElement(null);
  }, [t]), S = B(() => /* @__PURE__ */ function(...j) {
    return ($) => {
      for (const I of j) typeof I == "function" ? I($) : I != null && (I.current = $);
    };
  }(F, C), [C, F]);
  return Ta(() => (R(t.isEditable()), t.registerEditableListener((j) => {
    R(j);
  })), [t]), r("div", { "aria-activedescendant": A ? e : void 0, "aria-autocomplete": A ? n : "none", "aria-controls": A ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": A && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": A ? m : void 0, "aria-readonly": !A || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: A, "data-testid": k, id: x, ref: S, role: b, spellCheck: y, style: N, tabIndex: _, ...L });
}
const Kc = dn(Bc);
function fo(t) {
  return t.getEditorState().read(Ea(t.isComposing()));
}
const Gc = dn(Uc);
function Uc(t, e) {
  const { placeholder: n, ...o } = t, [a] = Qt();
  return p(lt, { children: [r(Kc, { editor: a, ...o, ref: e }), n != null && r(qc, { editor: a, content: n })] });
}
function qc({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = D(() => fo(s));
    return Ta(() => {
      function w() {
        const d = fo(s);
        c(d);
      }
      return w(), se(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, a] = D(e.isEditable());
  if (Pt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function Hc({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Gc,
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
const Sa = On(void 0);
function Yc({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: i
}) {
  const s = B(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(Sa.Provider, { value: s, children: i });
}
function Da() {
  const t = yr(Sa);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Xc() {
  const [t, e] = D(void 0), n = K(() => {
    e(void 0);
  }, []), o = B(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(Sl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(oa, { children: [
      /* @__PURE__ */ r(aa, { children: /* @__PURE__ */ r(ia, { children: i }) }),
      s
    ] }) });
  }, [t, n]), a = K(
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
function Wc({
  children: t
}) {
  const [e] = Qt(), [n, o] = D(e), [a, i] = D("paragraph"), [s, l] = Xc(), c = () => {
  };
  return Y(() => n.registerCommand(
    Ho,
    (w, d) => (o(d), !1),
    _r
  ), [n]), /* @__PURE__ */ p(
    Yc,
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
function Jc(t) {
  const [e] = Qt(), { activeEditor: n } = Da();
  Y(() => n.registerCommand(
    Ho,
    () => {
      const o = Rt();
      return o && t(o), !1;
    },
    _r
  ), [e, t]), Y(() => {
    n.getEditorState().read(() => {
      const o = Rt();
      o && t(o);
    });
  }, [n, t]);
}
const Ma = he(
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
), Zc = v.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Wo.Root,
  {
    ref: a,
    className: h(Ma({ variant: e, size: n, className: t })),
    ...o
  }
));
Zc.displayName = Wo.Root.displayName;
const Oa = v.createContext({
  size: "default",
  variant: "default"
}), $r = v.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = mt();
  return /* @__PURE__ */ r(
    An.Root,
    {
      ref: i,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        Oa.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
$r.displayName = An.Root.displayName;
const an = v.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = v.useContext(Oa);
  return /* @__PURE__ */ r(
    An.Item,
    {
      ref: i,
      className: h(
        Ma({
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
an.displayName = An.Item.displayName;
const ho = [
  { format: "bold", icon: Ti, label: "Bold" },
  { format: "italic", icon: Si, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Qc() {
  const { activeEditor: t } = Da(), [e, n] = D([]), o = K((a) => {
    if (Yt(a) || ul(a)) {
      const i = [];
      ho.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Jc(o), /* @__PURE__ */ r(
    $r,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: ho.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        an,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Ko, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function tw({ onClear: t }) {
  const [e] = Qt();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(Bo, void 0);
    });
  }, [e, t]);
}
function ew({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Wc, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Qc, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Lc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(Hc, { placeholder: t }) }),
          ErrorBoundary: Wl
        }
      ),
      e && /* @__PURE__ */ r(jc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(tw, { onClear: n }),
      /* @__PURE__ */ r(zc, {})
    ] })
  ] });
}
const nw = {
  namespace: "commentEditor",
  theme: Dr,
  nodes: Mr,
  onError: (t) => {
    console.error(t);
  }
};
function Tn({
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
          Gl,
          {
            initialConfig: {
              ...nw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(kt, { children: [
              /* @__PURE__ */ r(ew, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                ql,
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
function rw(t, e) {
  const n = ol(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!Aa.has(i.nodeName)) {
    const s = Pa(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Yo && s.insertAfter(Xo());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), o;
}
function ow(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ie().getChildren();
  for (let a = 0; a < o.length; a++)
    Ia(t, o[a], n, e);
  return n.innerHTML;
}
function Ia(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = re(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && kn(e) && (s = ec(o, e, "clone"));
  const l = re(s) ? s.getChildren() : [], c = rl(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: m } = w;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = Ia(t, g, f, o);
    !a && re(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((zo(d) || to(d)) && d.append(f), n.append(d), m) {
      const u = m.call(s, d);
      u && (to(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const Aa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Pa(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Aa.has(t.nodeName)) return s;
  let l = null;
  const c = function(g, x) {
    const { nodeName: b } = g, y = x._htmlConversions.get(b.toLowerCase());
    let N = null;
    if (y !== void 0) for (const _ of y) {
      const k = _(g);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const m = t.childNodes;
  let f = [];
  const u = (l == null || !al(l)) && (l != null && Nn(l) || o);
  for (let g = 0; g < m.length; g++) f.push(...Pa(m[g], e, n, u, new Map(a), l));
  return d != null && (f = d(f)), eo(t) && (f = aw(t, f, u ? () => {
    const g = new Yo();
    return n.push(g), g;
  } : Ue)), l == null ? f.length > 0 ? s = s.concat(f) : eo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : no(g.nextSibling) && no(g.previousSibling);
  }(t) && (s = s.concat(Xo())) : re(l) && l.append(...f), s;
}
function aw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (Nn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && Nn(e[s + 1])) {
      const c = n();
      c.setFormat(o), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function $a(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function La(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : La(e.children)
  ) : !1;
}
function jt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? La(t.root.children) : !1;
}
function iw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Jo({
    namespace: "EditorUtils",
    theme: Dr,
    nodes: Mr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = rw(e, a);
      ie().clear(), il(i);
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
function Sn(t) {
  const e = Jo({
    namespace: "EditorUtils",
    theme: Dr,
    nodes: Mr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = ow(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Lr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function yn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Vr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const sw = {
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
function Wn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function tu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = D(sw), [s, l] = D(void 0), [c, w] = D(!1), d = H(void 0), m = H(null);
  Y(() => {
    let y = !0;
    const N = m.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && $a(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
  const f = K(() => {
    if (!jt(a)) return;
    const y = Sn(a);
    e(y, s);
  }, [a, e, s]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: b }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Be, {}) }) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
            z,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !jt(a),
              children: /* @__PURE__ */ r(Ft, {})
            }
          ) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(de, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Ro, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Wn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Zt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(ce, { children: /* @__PURE__ */ r(we, { children: t.map((y) => /* @__PURE__ */ r(
            Jt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Wn(y, o) })
            },
            y || "unassigned"
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
        onKeyDownCapture: (y) => {
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : Vr(y) && (y.preventDefault(), y.stopPropagation(), jt(a) && f());
        },
        onKeyDown: (y) => {
          Lr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          Tn,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => i(y),
            placeholder: u,
            onClear: (y) => {
              d.current = y;
            }
          }
        )
      }
    )
  ] });
}
const eu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), nu = [
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
], lw = ["input", "select", "textarea", "button"], cw = ["button", "textbox"], ww = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [i, s] = D(void 0), [l, c] = D(void 0), w = K(
    (u) => {
      s(u);
      const g = t.find((b) => b.id === u);
      g && (e == null || e(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = K(
    (u) => {
      const g = t.find((x) => x.id === u);
      g && (c((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || lw.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && cw.includes(x)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, f = K(
    (u) => {
      var A;
      const g = u.target, x = (R) => R ? document.getElementById(R) : void 0, b = x(l), y = x(i);
      if (!!(b && g && b.contains(g) && g !== b) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const R = t.find((C) => C.id === l);
            R && w(R.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!b) return;
          const R = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (R.length === 0) return;
          const C = R.findIndex((j) => j === g);
          if (C === -1) return;
          let S;
          u.key === "ArrowDown" ? S = Math.min(C + 1, R.length - 1) : S = Math.max(C - 1, 0), S !== C && (u.preventDefault(), u.stopPropagation(), (A = R[S]) == null || A.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((R) => R.id === i);
      let L = k;
      switch (u.key) {
        case "ArrowDown":
          L = Math.min(k + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(k - 1, 0), u.preventDefault();
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
          const R = y;
          if (R) {
            const C = R.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = R.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), j = C ?? S;
            if (j) {
              u.preventDefault(), j.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const F = t[L];
      F && w(F.id);
    },
    [t, w, i, l, d, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: w
  };
}, dw = he(
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
), Ve = v.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", dw({ variant: e }), t), ...n })
);
Ve.displayName = "Badge";
const Va = v.forwardRef(
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
Va.displayName = "Card";
const pw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
pw.displayName = "CardHeader";
const uw = v.forwardRef(
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
uw.displayName = "CardTitle";
const mw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
mw.displayName = "CardDescription";
const ja = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ja.displayName = "CardContent";
const fw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
fw.displayName = "CardFooter";
const je = v.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Zo.Root,
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
je.displayName = Zo.Root.displayName;
const Fa = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Fa.displayName = qe.Root.displayName;
const hw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
hw.displayName = qe.Image.displayName;
const za = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
za.displayName = qe.Fallback.displayName;
const jr = On(void 0);
function Bt() {
  const t = yr(jr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const pe = he("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ee = nt.Trigger, Ba = nt.Group, gw = nt.Portal, bw = nt.Sub, vw = nt.RadioGroup;
function fe({ variant: t = "default", ...e }) {
  const n = v.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(jr.Provider, { value: n, children: /* @__PURE__ */ r(nt.Root, { ...e }) });
}
const Ka = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Bt();
  return /* @__PURE__ */ p(
    nt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        pe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ka.displayName = nt.SubTrigger.displayName;
const Ga = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = mt();
  return /* @__PURE__ */ r(
    nt.SubContent,
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
Ga.displayName = nt.SubContent.displayName;
const le = v.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = mt();
  return /* @__PURE__ */ r(nt.Portal, { children: /* @__PURE__ */ r(
    nt.Content,
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
le.displayName = nt.Content.displayName;
const Dn = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = mt(), i = Bt();
  return /* @__PURE__ */ r(
    nt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        pe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Dn.displayName = nt.Item.displayName;
const ae = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = mt(), s = Bt();
  return /* @__PURE__ */ p(
    nt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        pe({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
ae.displayName = nt.CheckboxItem.displayName;
const Ua = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = mt(), i = Bt();
  return /* @__PURE__ */ p(
    nt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        pe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Ua.displayName = nt.RadioItem.displayName;
const un = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  nt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
un.displayName = nt.Label.displayName;
const We = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
We.displayName = nt.Separator.displayName;
function xw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
xw.displayName = "DropdownMenuShortcut";
function go({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = D(!1), [d, m] = D(), f = H(null);
  Y(() => {
    if (!c) return;
    let k = !0;
    const L = f.current;
    if (!L) return;
    const F = setTimeout(() => {
      k && $a(L);
    }, 300);
    return () => {
      k = !1, clearTimeout(F);
    };
  }, [c]);
  const u = K(
    (k) => {
      k && k.stopPropagation(), w(!1), m(void 0), s == null || s(!1);
    },
    [s]
  ), g = K(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Sn(d)
      ) && (w(!1), m(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), x = B(() => {
    const k = new Date(t.date), L = ws(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), F = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ye(n["%comment_dateAtTime%"], {
      date: L,
      time: F
    });
  }, [t.date, n]), b = B(() => t.user, [t.user]), y = B(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = B(() => ds(t.contents), [t.contents]), _ = B(() => {
    if (o && l)
      return /* @__PURE__ */ p(lt, { children: [
        /* @__PURE__ */ p(
          Dn,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), m(iw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(Di, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Dn,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ r(Mi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
        /* @__PURE__ */ r(Fa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(za, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: b }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Ve, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              yn(t.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : Vr(k) && (k.preventDefault(), k.stopPropagation(), jt(d) && g());
              },
              onKeyDown: (k) => {
                Lr(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  Tn,
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
                    onSerializedChange: (k) => m(k)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Be, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !jt(d),
                      children: /* @__PURE__ */ r(To, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ p(lt, { children: [
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
                dangerouslySetInnerHTML: { __html: N }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ p(fe, { children: [
          /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Oi, {}) }) }),
          /* @__PURE__ */ r(le, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const bo = {
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
function yw({
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
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: L = 5,
  onVerseRefClick: F
}) {
  const [A, R] = D(bo), [C, S] = D(
    void 0
  ), j = o, [$, I] = D(!1), [P, X] = D(!1), [O, J] = D(!1), [Dt, Lt] = D(!1), [It, gt] = D(!1), [pt, G] = D(k), [at, it] = D(!1), ct = H(void 0), [xt, te] = D(/* @__PURE__ */ new Map());
  Y(() => {
    let T = !0;
    return (async () => {
      const ft = N ? await N(c) : !1;
      T && gt(ft);
    })(), () => {
      T = !1;
    };
  }, [c, N]), Y(() => {
    let T = !0;
    if (!o) {
      Lt(!1), te(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = y ? await y(c) : !1;
      T && Lt(ft);
    })(), () => {
      T = !1;
    };
  }, [o, c, y]);
  const Kt = B(() => e.filter((T) => !T.deleted), [e]);
  Y(() => {
    let T = !0;
    if (!o || !_) {
      te(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = /* @__PURE__ */ new Map();
      await Promise.all(
        Kt.map(async (Gr) => {
          const yi = await _(Gr.id);
          T && ft.set(Gr.id, yi);
        })
      ), T && te(ft);
    })(), () => {
      T = !1;
    };
  }, [o, Kt, _]);
  const Gt = B(() => Kt[0], [Kt]), De = H(null), ue = H(void 0), ee = K(() => {
    var T;
    (T = ue.current) == null || T.call(ue), R(bo);
  }, []), Ze = K(() => {
    const T = !pt;
    G(T), it(!T), g == null || g(c, T);
  }, [pt, g, c]);
  Y(() => {
    I(!1);
  }, [o]), Y(() => {
    if (o && !pt && !at) {
      const T = setTimeout(() => {
        G(!0), g == null || g(c, !0);
      }, L * 1e3);
      return ct.current = T, () => clearTimeout(T);
    }
    ct.current && (clearTimeout(ct.current), ct.current = void 0);
  }, [o, pt, at, L, c, g]);
  const M = B(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), E = B(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = yn(i, n);
    return ye(n["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [i, n]), V = B(() => Kt.slice(1), [Kt]), U = B(() => V.length ?? 0, [V.length]), q = B(() => U > 0, [U]), st = B(() => $ || U <= 2 ? V : V.slice(-2), [V, U, $]), tt = B(() => $ || U <= 2 ? 0 : U - 2, [U, $]), bt = B(
    () => U === 1 ? M.singleReply : ye(M.multipleReplies, { count: U }),
    [U, M]
  ), wt = B(
    () => tt === 1 ? M.singleReply : ye(M.multipleReplies, { count: tt }),
    [tt, M]
  );
  Y(() => {
    !o && P && q && X(!1);
  }, [o, P, q]);
  const Mt = K(
    async (T) => {
      T && T.stopPropagation();
      const vt = jt(A) ? Sn(A) : void 0;
      if (C !== void 0) {
        await m({
          threadId: c,
          contents: vt,
          assignedUser: C
        }) && (S(void 0), vt && ee());
        return;
      }
      vt && await m({ threadId: c, contents: vt }) && ee();
    },
    [
      ee,
      A,
      m,
      C,
      c
    ]
  ), Vt = K(
    async (T) => {
      const vt = jt(A) ? Sn(A) : void 0, ft = await m({
        ...T,
        contents: vt,
        assignedUser: C ?? T.assignedUser
      });
      return ft && vt && ee(), ft && C !== void 0 && S(void 0), ft;
    },
    [ee, A, m, C]
  );
  if (Gt)
    return /* @__PURE__ */ r(
      Va,
      {
        role: "option",
        "aria-selected": o,
        id: c,
        className: h(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && d !== "Resolved" && pt,
            "tw-bg-background": o && d !== "Resolved" && pt,
            "tw-bg-muted": d === "Resolved",
            "tw-bg-accent": !pt && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(c);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(ja, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              E && /* @__PURE__ */ r(Ve, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: E }),
              /* @__PURE__ */ r(
                z,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (T) => {
                    T.stopPropagation(), Ze();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": pt ? "Mark as unread" : "Mark as read",
                  children: pt ? /* @__PURE__ */ r(Ii, {}) : /* @__PURE__ */ r(Ai, {})
                }
              ),
              It && d !== "Resolved" && /* @__PURE__ */ r(
                z,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (T) => {
                    T.stopPropagation(), Vt({
                      threadId: c,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: De,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": j
                  },
                  { "tw-whitespace-nowrap": !j }
                ),
                children: [
                  a && F ? /* @__PURE__ */ r(
                    z,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (T) => {
                        T.stopPropagation(), F(w);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    Gt.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: Gt.selectedText }),
                    Gt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              go,
              {
                comment: Gt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Vt,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: X,
                canEditOrDelete: (!P && xt.get(Gt.id)) ?? !1,
                canUserResolveThread: It
              }
            )
          ] }),
          /* @__PURE__ */ p(lt, { children: [
            q && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(je, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: bt })
            ] }),
            !o && jt(A) && /* @__PURE__ */ r(
              Tn,
              {
                editorSerializedState: A,
                onSerializedChange: (T) => R(T),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(lt, { children: [
              tt > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (T) => {
                    T.stopPropagation(), I(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (T) => {
                    (T.key === "Enter" || T.key === " ") && (T.preventDefault(), T.stopPropagation(), I(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(je, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: wt }),
                      $ ? /* @__PURE__ */ r(So, {}) : /* @__PURE__ */ r(Ke, {})
                    ] })
                  ]
                }
              ),
              st.map((T) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                go,
                {
                  comment: T,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: X,
                  canEditOrDelete: (!P && xt.get(T.id)) ?? !1
                }
              ) }, T.id)),
              b !== !1 && (!P || jt(A)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (T) => T.stopPropagation(),
                  onKeyDownCapture: (T) => {
                    Vr(T) && (T.preventDefault(), T.stopPropagation(), (jt(A) || C !== void 0) && Mt());
                  },
                  onKeyDown: (T) => {
                    Lr(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      Tn,
                      {
                        editorSerializedState: A,
                        onSerializedChange: (T) => R(T),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (T) => {
                          ue.current = T;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ye(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: yn(
                            C,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(de, { open: O, onOpenChange: J, children: [
                        /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
                          z,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Dt || !x || x.length === 0 || !x.includes(s),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(Ro, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          Zt,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (T) => {
                              T.key === "Escape" && (T.stopPropagation(), J(!1));
                            },
                            children: /* @__PURE__ */ r(ce, { children: /* @__PURE__ */ r(we, { children: x == null ? void 0 : x.map((T) => /* @__PURE__ */ r(
                              Jt,
                              {
                                onSelect: () => {
                                  S(T !== i ? T : void 0), J(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: yn(T, n) })
                              },
                              T || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        z,
                        {
                          size: "icon",
                          onClick: Mt,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !jt(A) && C === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(To, {})
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
function ru({
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
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: b
}) {
  const [y, N] = D(/* @__PURE__ */ new Set()), [_, k] = D();
  Y(() => {
    g && (N((I) => new Set(I).add(g)), k(g));
  }, [g]);
  const L = n.filter(
    (I) => I.comments.some((P) => !P.deleted)
  ), F = L.map((I) => ({ id: I.id })), A = K(
    (I) => {
      N((P) => new Set(P).add(I.id)), k(I.id), x == null || x(I.id);
    },
    [x]
  ), R = K(
    (I) => {
      const P = y.has(I);
      N((X) => {
        const O = new Set(X);
        return O.has(I) ? O.delete(I) : O.add(I), O;
      }), k(I), x == null || x(P ? void 0 : I);
    },
    [y, x]
  ), { listboxRef: C, activeId: S, handleKeyDown: j } = ww({
    options: F,
    onOptionSelect: A
  }), $ = K(
    (I) => {
      I.key === "Escape" ? (_ && y.has(_) && (N((P) => {
        const X = new Set(P);
        return X.delete(_), X;
      }), k(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : j(I);
    },
    [_, y, j, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: $,
      children: L.map((I) => /* @__PURE__ */ r(
        "div",
        {
          className: h({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            yw,
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: R,
              threadId: I.id,
              thread: I,
              isRead: I.isRead,
              isSelected: y.has(I.id),
              currentUser: o,
              assignedUser: I.assignedUser,
              threadStatus: I.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: b
            }
          )
        },
        I.id
      ))
    }
  );
}
function Nw({ table: t }) {
  return /* @__PURE__ */ p(fe, { children: [
    /* @__PURE__ */ r(ml, { asChild: !0, children: /* @__PURE__ */ p(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Pi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(le, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(un, { children: "Toggle columns" }),
      /* @__PURE__ */ r(We, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        ae,
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
const Fe = dt.Root, kw = dt.Group, ze = dt.Value, _w = he(
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
), Re = v.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = mt();
  return /* @__PURE__ */ p(
    dt.Trigger,
    {
      className: h(_w({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(dt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Re.displayName = dt.Trigger.displayName;
const qa = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(So, { className: "tw-h-4 tw-w-4" })
  }
));
qa.displayName = dt.ScrollUpButton.displayName;
const Ha = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" })
  }
));
Ha.displayName = dt.ScrollDownButton.displayName;
const Te = v.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = mt();
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
        /* @__PURE__ */ r(qa, {}),
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
        /* @__PURE__ */ r(Ha, {})
      ]
    }
  ) });
});
Te.displayName = dt.Content.displayName;
const Cw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Cw.displayName = dt.Label.displayName;
const At = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  dt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(dt.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(dt.ItemText, { children: e })
    ]
  }
));
At.displayName = dt.Item.displayName;
const Ew = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ew.displayName = dt.Separator.displayName;
function Rw({ table: t }) {
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
        Fe,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Re, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(ze, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Te, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(At, { value: `${e}`, children: e }, e)) })
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
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r($i, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Li, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Vi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(ji, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const vo = `
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
function Tw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function cn(t, e) {
  const n = e ? `${vo}, ${e}` : vo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Tw(o)
  );
}
const $n = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = v.useRef(null);
  v.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), v.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        cn(s, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        s.preventDefault(), cn(l)[0].focus();
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
$n.displayName = "Table";
const Ln = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
Ln.displayName = "TableHeader";
const Vn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
Vn.displayName = "TableBody";
const Sw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Sw.displayName = "TableFooter";
function Dw(t) {
  v.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? cn(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function Mw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ow(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const ne = v.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = v.useRef(null);
  v.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), Dw(s);
  const l = v.useMemo(
    () => s.current ? cn(s.current) : [],
    [s]
  ), c = v.useCallback(
    (d) => {
      const { current: m } = s;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        cn(f).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Ow(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Mw(l, x, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = m.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), w = v.useCallback(
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
ne.displayName = "TableRow";
const wn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
wn.displayName = "TableHead";
const _e = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
_e.displayName = "TableCell";
const Iw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Iw.displayName = "TableCaption";
function hr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Aw({
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
  var F;
  const [d, m] = D([]), [f, u] = D([]), [g, x] = D({}), [b, y] = D({}), N = B(() => e ?? [], [e]), _ = Qo({
    data: N,
    columns: t,
    getCoreRowModel: ea(),
    ...n && { getPaginationRowModel: hl() },
    onSortingChange: m,
    getSortedRowModel: ta(),
    onColumnFiltersChange: u,
    getFilteredRowModel: fl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let L;
  return c ? L = Array.from({ length: 10 }).map((C, S) => `skeleton-row-${S}`).map((C) => /* @__PURE__ */ r(ne, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(_e, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(hr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((F = _.getRowModel().rows) == null ? void 0 : F.length) > 0 ? L = _.getRowModel().rows.map((A) => /* @__PURE__ */ r(
    ne,
    {
      onClick: () => s(A, _),
      "data-state": A.getIsSelected() && "selected",
      children: A.getVisibleCells().map((R) => /* @__PURE__ */ r(_e, { children: rn(R.column.columnDef.cell, R.getContext()) }, R.id))
    },
    A.id
  )) : L = /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(_e, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Nw, { table: _ }),
    /* @__PURE__ */ p($n, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Ln, { stickyHeader: i, children: _.getHeaderGroups().map((A) => /* @__PURE__ */ r(ne, { children: A.headers.map((R) => /* @__PURE__ */ r(wn, { className: "tw-p-0", children: R.isPlaceholder ? void 0 : rn(R.column.columnDef.header, R.getContext()) }, R.id)) }, A.id)) }),
      /* @__PURE__ */ r(Vn, { children: L })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Rw, { table: _ })
  ] });
}
function ou({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const i = B(
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
      children: /* @__PURE__ */ r(vl, { options: i, children: e })
    }
  );
}
const Pw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), xo = (t, e) => t[e] ?? e;
function $w({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = xo(n, "%webView_error_dump_header%"), i = xo(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(Do, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const au = Object.freeze([
  ...Pw,
  "%webView_error_dump_copied_message%"
]);
function iu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = D(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(de, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: o }),
    /* @__PURE__ */ p(Zt, { id: i, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ht, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        $w,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Lw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Lw || {});
function su({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (w, d) => w.itemType === 0 ? [d, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = D({}), l = (w, d) => {
    const m = !o[w][d];
    a((u) => (u[w][d] = m, { ...u }));
    const f = n[w].items[d];
    f.onUpdate(f.id, m);
  }, c = (w, d) => {
    s((f) => (f[w] = d, { ...f }));
    const m = n[w].items.find((f) => f.id === d);
    m ? m.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(fe, { children: [
    /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ p(z, { variant: "default", children: [
      /* @__PURE__ */ r(Fi, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Ke, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(le, { children: n.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(un, { children: w.label }),
      /* @__PURE__ */ r(Ba, { children: w.itemType === 0 ? /* @__PURE__ */ r(lt, { children: w.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        ae,
        {
          checked: o[d][f],
          onCheckedChange: () => l(d, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        vw,
        {
          value: i[d],
          onValueChange: (m) => c(d, m),
          children: w.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Ua, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(We, {})
    ] }, w.label)) })
  ] }) });
}
function lu({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new ps("en", {
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
            /* @__PURE__ */ r(zi, { className: "tw-h-4 tw-w-4" }),
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
            z,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Bi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            z,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Ki, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Vw({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), d = w.getUTCFullYear() - 1970, m = w.getUTCMonth(), f = w.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
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
function cu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = B(() => us(n), [n]), c = ((w) => {
    const d = new Intl.DisplayNames(ms(), { type: "language" });
    return w.map((m) => d.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Vw, { versionHistory: a }),
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
function jw({
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
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: b
}) {
  const [y, N] = D(!1), _ = K(
    (S) => {
      var $;
      const j = ($ = t.find((I) => I.label === S)) == null ? void 0 : $.value;
      j && n(
        e.includes(j) ? e.filter((I) => I !== j) : [...e, j]
      );
    },
    [t, e, n]
  ), k = () => c || o, L = B(() => {
    if (!f) return t;
    const S = t.filter(($) => $.starred).sort(($, I) => $.label.localeCompare(I.label)), j = t.filter(($) => !$.starred).sort(($, I) => {
      const P = e.includes($.value), X = e.includes(I.value);
      return P && !X ? -1 : !P && X ? 1 : $.label.localeCompare(I.label);
    });
    return [...S, ...j];
  }, [t, e, f]), F = () => {
    n(t.map((S) => S.value));
  }, A = () => {
    n([]);
  }, R = w ?? y;
  return /* @__PURE__ */ r("div", { id: b, className: g, children: /* @__PURE__ */ p(de, { open: R, onOpenChange: d ?? N, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ p(
      z,
      {
        variant: x,
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
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ r(Mo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Zt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ce, { children: [
      /* @__PURE__ */ r(Ye, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: F, children: i }),
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: A, children: s })
      ] }),
      /* @__PURE__ */ p(we, { children: [
        /* @__PURE__ */ r(pn, { children: l }),
        /* @__PURE__ */ r(Xt, { children: L.map((S) => /* @__PURE__ */ p(
          Jt,
          {
            value: S.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Ft,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(Gi, { className: "tw-h-4 tw-w-4" }),
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
function wu({
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
      jw,
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
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((f) => {
      var u;
      return /* @__PURE__ */ p(Ve, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ r(Be, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(ht, { children: d })
  ] });
}
const Fw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), yo = (t, e) => t[e] ?? e;
function zw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const c = B(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Ui, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        yo(a, "%undoButton_tooltip%"),
        i && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(qi, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        yo(a, "%redoButton_tooltip%"),
        i && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Bw({ children: t, editorRef: e }) {
  const n = H(null);
  return Y(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var w, d, m, f;
      if (!a || document.activeElement !== a) return;
      const c = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (w = e.current) == null || w.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Je = v.forwardRef(
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
Je.displayName = "Input";
const Kw = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Gw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = H(null), s = H(null), l = H(!1), [c, w] = D(t), [d, m] = D(n), [f, u] = D(!1);
  Y(() => {
    w(t);
  }, [t]), Y(() => {
    d !== n && m(n);
  }, [n]);
  const g = (b) => {
    l.current = !1, u(b), b || (c !== "custom" || d ? (e(c), o(d)) : (w(t), m(n)));
  }, x = (b) => {
    var y, N, _, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((y = i.current) == null || y.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ p(fe, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: Kw(t, a, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      le,
      {
        style: { zIndex: na },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ r(un, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(We, {}),
          /* @__PURE__ */ r(
            ae,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: ar })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            ae,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: ir })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            ae,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (b) => {
                var y;
                b.stopPropagation(), l.current = !0, (y = i.current) == null || y.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Je,
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
const Uw = (t, e) => t === "f" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(Io, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(Ao, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(Oo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), qw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ye(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Hw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(fe, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(sl, { asChild: !0, children: /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: Uw(t, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: qw(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(le, { style: { zIndex: na }, children: [
      /* @__PURE__ */ r(un, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(We, {}),
      /* @__PURE__ */ p(
        ae,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Oo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        ae,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Io, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        ae,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Ao, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Yw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Xw({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Hi, { className: e, size: 16 });
}
function No({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    Jt,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Xw, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(sa, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Ww({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = D(""), [i, s] = B(() => {
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
  return /* @__PURE__ */ p(ce, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Ye,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(we, { children: [
      /* @__PURE__ */ r(pn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Xt, { children: i.map((l) => {
        var c;
        return /* @__PURE__ */ r(
          No,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(lt, { children: [
        i.length > 0 && /* @__PURE__ */ r(Er, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Xt, { children: s.map((l) => {
          var c;
          return /* @__PURE__ */ r(
            No,
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
function Jw(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = vn[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[vn[l].description] ?? vn[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Zw(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Qw(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const td = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function du({
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
  const d = H(null), m = H(null), f = H(null), u = H(null);
  Pt(() => {
    if (!u.current) return;
    const { width: E } = u.current.getBoundingClientRect();
    E > 0 && (u.current.style.width = `${E}px`);
  }, []);
  const [g, x] = D("generated"), [b, y] = D("*"), [N, _] = D("f"), [k, L] = D(!1), [F, A] = D(!0), [R, C] = D(!1), S = H(!1), j = H(""), [$, I] = D(!1), [P, X] = D(), [O, J] = D(), [Dt, Lt] = D(), [It, gt] = D(), pt = H(null), G = B(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? xl(), noteMode: "expanded" }
    }),
    [s, l]
  ), at = B(
    () => Jw(
      d,
      () => I(!1),
      c,
      It
    ),
    [c, It]
  );
  Y(() => {
    var E;
    $ || (E = d.current) == null || E.focus();
  }, [N, $]), Y(() => {
    var U, q;
    let E;
    S.current = !1, A(!0);
    const V = e == null ? void 0 : e.at(0);
    if (V && fn("note", V)) {
      const st = (U = V.insert.note) == null ? void 0 : U.caller;
      let tt = "custom";
      st === ar ? tt = "generated" : st === ir ? tt = "hidden" : st && y(st), x(tt), _(((q = V.insert.note) == null ? void 0 : q.style) ?? "f"), E = setTimeout(() => {
        var bt;
        (bt = d.current) == null || bt.applyUpdate([V]);
      }, 0);
    }
    return () => {
      E && clearTimeout(E);
    };
  }, [e, i]);
  const it = K(
    (E, V, U = !1) => {
      var st, tt, bt;
      const q = (tt = (st = d.current) == null ? void 0 : st.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (q && fn("note", q)) {
        if (q.insert.note) {
          let wt;
          E === "custom" ? wt = V : E === "generated" ? wt = ar : wt = ir, q.insert.note.caller = wt;
        }
        n == null || n([q]), U && w && i && ((bt = w.current) == null || bt.replaceEmbedUpdate(i, [q]));
      }
    },
    [i, n, w]
  ), ct = K(() => {
    it(g, b, !0), o();
  }, [g, b, o, it]), xt = H(ct);
  Pt(() => {
    xt.current = ct;
  });
  const te = H({ book: a.book, chapterNum: a.chapterNum });
  Pt(() => {
    (te.current.book !== a.book || te.current.chapterNum !== a.chapterNum) && (te.current = { book: a.book, chapterNum: a.chapterNum }, xt.current());
  }, [a.book, a.chapterNum]);
  const Kt = () => {
    var V;
    const E = (V = m.current) == null ? void 0 : V.getElementsByClassName("editor-input")[0];
    E != null && E.textContent && navigator.clipboard.writeText(E.textContent);
  }, Gt = K(
    (E) => {
      x(E), it(E, b);
    },
    [b, it]
  ), De = K(
    (E) => {
      y(E), it(g, E);
    },
    [g, it]
  ), ue = (E) => {
    var U, q, st, tt, bt;
    _(E);
    const V = (q = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : q.at(0);
    if (V && fn("note", V)) {
      V.insert.note && (V.insert.note.style = E);
      const wt = (tt = (st = V.insert.note) == null ? void 0 : st.contents) == null ? void 0 : tt.ops;
      N !== "x" && E === "x" ? wt == null || wt.forEach((Mt) => Zw(Mt)) : N === "x" && E !== "x" && (wt == null || wt.forEach((Mt) => Qw(Mt))), (bt = d.current) == null || bt.applyUpdate([V, { delete: 1 }]);
    }
  }, ee = (E) => {
    gt(E.contextMarker), C(E.canRedo);
  }, Ze = K(
    (E) => {
      var U, q, st, tt, bt;
      const V = (q = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (V && fn("note", V)) {
        E.content.length > 1 && setTimeout(() => {
          var Vt;
          (Vt = d.current) == null || Vt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const wt = (st = V.insert.note) == null ? void 0 : st.style, Mt = (bt = (tt = V.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : bt.ops;
        if (wt || L(!1), L(
          wt === "x" ? !!(Mt != null && Mt.every((Vt) => {
            var vt, ft;
            if (!((vt = Vt.attributes) != null && vt.char)) return !0;
            const T = ((ft = Vt.attributes) == null ? void 0 : ft.char).style;
            return T === "xt" || T === "xo" || T === "xq";
          })) : !!(Mt != null && Mt.every((Vt) => {
            var vt, ft;
            if (!((vt = Vt.attributes) != null && vt.char)) return !0;
            const T = ((ft = Vt.attributes) == null ? void 0 : ft.char).style;
            return T === "ft" || T === "fr" || T === "fq";
          }))
        ), !S.current) {
          S.current = !0, j.current = JSON.stringify(V), A(!0);
          return;
        }
        A(JSON.stringify(V) === j.current), it(g, b);
      } else
        L(!1), A(!0);
    },
    [g, b, it]
  ), M = K(() => {
    const E = window.getSelection();
    if (f.current && at.length && E && E.rangeCount > 0) {
      const V = E.getRangeAt(0).getBoundingClientRect(), U = f.current.getBoundingClientRect();
      X(V.left - U.left), J(V.top - U.top), Lt(V.height), I(!0);
    }
  }, [at, f]);
  return Y(() => {
    const E = () => {
      $ && I(!1);
    };
    return window.addEventListener("click", E), () => {
      window.removeEventListener("click", E);
    };
  }, [$]), Y(() => {
    var E;
    $ && ((E = pt.current) == null || E.focus());
  }, [$]), Y(() => {
    var U;
    const E = ((U = m.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0, V = (q) => {
      !$ && E && document.activeElement === E && q.key === l ? (q.preventDefault(), M()) : $ && q.key === "Escape" && (q.preventDefault(), I(!1));
    };
    return document.addEventListener("keydown", V), () => {
      document.removeEventListener("keydown", V);
    };
  }, [$, M, l]), /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            Hw,
            {
              isTypeSwitchable: k,
              noteType: N,
              handleNoteTypeChange: ue,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            Gw,
            {
              callerType: g,
              updateCallerType: Gt,
              customCaller: b,
              updateCustomCaller: De,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            zw,
            {
              onUndoClick: () => {
                var E;
                return (E = d.current) == null ? void 0 : E.undo();
              },
              onRedoClick: () => {
                var E;
                return (E = d.current) == null ? void 0 : E.redo();
              },
              canUndo: !F,
              canRedo: R,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
              z,
              {
                onClick: ct,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Ft, {})
              }
            ) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(Be, {}) }) }),
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
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Bw, { editorRef: d, children: /* @__PURE__ */ r(
              yl,
              {
                options: G,
                onStateChange: ee,
                onUsjChange: Ze,
                defaultUsj: td,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
              /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
                z,
                {
                  onClick: Kt,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Do, {})
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
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(de, { open: $, children: [
      /* @__PURE__ */ r(
        Al,
        {
          className: "tw-absolute",
          style: {
            top: O,
            left: P,
            height: Dt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Zt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (E) => {
            E.preventDefault(), E.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Ww,
            {
              markerMenuItems: at,
              localizedStrings: c,
              searchRef: pt
            }
          )
        }
      )
    ] })
  ] });
}
const pu = Object.freeze([
  ...Yw,
  ...Object.entries(vn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Fw
]);
function Ya(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function ed(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Fr(t, l, n, !0, a),
      w && o
    ] }, Ya(t, l));
  });
}
function Fr(t, e, n = !0, o = !0, a = []) {
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
              /* @__PURE__ */ r(nr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(nr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return nd(
        i,
        Ya(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function nd(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      nr,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Fr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function rd({
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
  /* @__PURE__ */ p("span", { className: h("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), m = s && /* @__PURE__ */ p(lt, { children: [
    Fr(t.marker, [s], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = h(f, u);
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ p("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(lt, { children: ed(t.marker, l, o, w) })
      }
    )
  ] });
}
function uu({
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
  const d = c ?? fs(n, void 0), m = (N, _) => {
    w == null || w(N, _, a);
  }, f = i ? n.findIndex((N) => N === i) : -1, [u, g] = D(f), x = (N, _, k) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), w == null || w(_, k, a);
          break;
      }
  }, b = (N) => {
    if (n.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), g((_) => Math.min(_ + 1, n.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, y = H([]);
  return Y(() => {
    var N;
    u >= 0 && u < y.current.length && ((N = y.current[u]) == null || N.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: h("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: h(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((N, _) => {
            const k = N === i, L = `${a}-${_}`;
            return /* @__PURE__ */ p(lt, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (F) => {
                    y.current[_] = F;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === u ? 0 : -1,
                  className: h(
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
                  onClick: () => m(N, _),
                  onKeyDown: (F) => x(F, N, _),
                  children: /* @__PURE__ */ r(
                    rd,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => d(N.caller, _),
                      showMarkers: s
                    }
                  )
                },
                L
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(je, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function od(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function ad({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = B(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const d = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(d) || (c.add(d), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p($n, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Ln, { stickyHeader: !0, children: /* @__PURE__ */ p(ne, { children: [
      /* @__PURE__ */ r(wn, { children: a }),
      /* @__PURE__ */ r(wn, { children: i })
    ] }) }),
    /* @__PURE__ */ r(Vn, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      ne,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(_e, { children: Ne(l.reference, "English") }),
          /* @__PURE__ */ r(_e, { className: o, children: od(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const zr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  sr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      sr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
zr.displayName = sr.Root.displayName;
const id = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Ji, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Zi, { className: "tw-h-4 tw-w-4" });
}, jn = (t, e, n) => /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ p(
    Et,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        id(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(_t, { side: "bottom", children: e })
] }) }), mu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => jn(e, t)
}), sd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => jn(n, t)
}), fu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => jn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Jn = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), o(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, hu = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => jn(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p($r, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(Yi, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(Xi, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(Wi, {})
        }
      )
    ] });
  }
}), gu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), bu = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, vu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, ld = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", xu = Object.freeze([
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
]), cd = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, wd = (t, e, n) => t.map((o) => {
  const a = Wr(o.key) ? o.key : o.key[0];
  return {
    items: Wr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || ld(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ut = (t, e) => t[e] ?? e;
function yu({
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
  onItemSelected: f
}) {
  const u = Ut(n, "%webView_inventory_all%"), g = Ut(n, "%webView_inventory_approved%"), x = Ut(n, "%webView_inventory_unapproved%"), b = Ut(n, "%webView_inventory_unknown%"), y = Ut(n, "%webView_inventory_scope_currentBook%"), N = Ut(n, "%webView_inventory_scope_chapter%"), _ = Ut(n, "%webView_inventory_scope_verse%"), k = Ut(n, "%webView_inventory_filter_text%"), L = Ut(
    n,
    "%webView_inventory_show_additional_items%"
  ), F = Ut(n, "%webView_inventory_no_results%"), [A, R] = D(!1), [C, S] = D("all"), [j, $] = D(""), [I, P] = D([]), X = B(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : wd(G, a, i);
  }, [t, a, i]), O = B(() => {
    if (A) return X;
    const G = [];
    return X.forEach((at) => {
      const it = at.items[0], ct = G.find(
        (xt) => xt.items[0] === it
      );
      ct ? (ct.count += at.count, ct.occurrences = ct.occurrences.concat(at.occurrences)) : G.push({
        items: [it],
        count: at.count,
        occurrences: at.occurrences,
        status: at.status
      });
    }), G;
  }, [A, X]), J = B(() => O.length === 0 ? [] : cd(O, C, j), [O, C, j]), Dt = B(() => {
    var it, ct;
    if (!A) return c;
    const G = (it = o == null ? void 0 : o.tableHeaders) == null ? void 0 : it.length;
    if (!G) return c;
    const at = [];
    for (let xt = 0; xt < G; xt++)
      at.push(
        sd(
          ((ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct[xt]) || "Additional Item",
          xt + 1
        )
      );
    return [...at, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, A]);
  Y(() => {
    J.length === 0 ? P([]) : J.length === 1 && P(J[0].items);
  }, [J]);
  const Lt = (G, at) => {
    at.setRowSelection(() => {
      const ct = {};
      return ct[G.index] = !0, ct;
    });
    const it = G.original.items;
    P(it), f && it.length > 0 && f(it[0]);
  }, It = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      l(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, gt = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      S(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, pt = B(() => {
    if (O.length === 0 || I.length === 0) return [];
    const G = O.filter((at) => hs(
      A ? at.items : [at.items[0]],
      I
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [I, A, O]);
  return /* @__PURE__ */ r("div", { id: w, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Fe,
        {
          onValueChange: (G) => gt(G),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(Re, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(ze, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Te, { children: [
              /* @__PURE__ */ r(At, { value: "all", children: u }),
              /* @__PURE__ */ r(At, { value: "approved", children: g }),
              /* @__PURE__ */ r(At, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(At, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Fe, { onValueChange: (G) => It(G), defaultValue: s, children: [
        /* @__PURE__ */ r(Re, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(ze, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Te, { children: [
          /* @__PURE__ */ r(At, { value: "book", children: y }),
          /* @__PURE__ */ r(At, { value: "chapter", children: N }),
          /* @__PURE__ */ r(At, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Je,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: k,
          value: j,
          onChange: (G) => {
            $(G.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
        /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            zr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: A,
              onCheckedChange: (G) => {
                R(G);
              }
            }
          ),
          /* @__PURE__ */ r(ht, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? L })
        ] }) }),
        /* @__PURE__ */ r(_t, { children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Aw,
      {
        columns: Dt,
        data: J,
        onRowClickHandler: Lt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: F
      }
    ) }),
    pt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      ad,
      {
        classNameForText: m,
        occurrenceData: pt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const dd = "16rem", pd = "3rem", Xa = v.createContext(void 0);
function Fn() {
  const t = v.useContext(Xa);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Wa = v.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: i,
    side: s = "primary",
    ...l
  }, c) => {
    const [w, d] = v.useState(t), m = e ?? w, f = v.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(m) : _;
        n ? n(k) : d(k);
      },
      [n, m]
    ), u = v.useCallback(() => f((_) => !_), [f]), g = m ? "expanded" : "collapsed", y = mt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = v.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: y
      }),
      [g, m, f, u, y]
    );
    return /* @__PURE__ */ r(Xa.Provider, { value: N, children: /* @__PURE__ */ r(kt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": dd,
            "--sidebar-width-icon": pd,
            ...a
          }
        ),
        className: h(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: c,
        ...l,
        children: i
      }
    ) }) });
  }
);
Wa.displayName = "SidebarProvider";
const Ja = v.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = Fn();
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
Ja.displayName = "Sidebar";
const ud = v.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Fn();
  return /* @__PURE__ */ p(
    z,
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
        a.side === "primary" ? /* @__PURE__ */ r(Qi, {}) : /* @__PURE__ */ r(ts, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ud.displayName = "SidebarTrigger";
const md = v.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Fn();
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
md.displayName = "SidebarRail";
const Za = v.forwardRef(
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
Za.displayName = "SidebarInset";
const fd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je,
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
fd.displayName = "SidebarInput";
const hd = v.forwardRef(
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
hd.displayName = "SidebarHeader";
const gd = v.forwardRef(
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
gd.displayName = "SidebarFooter";
const bd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  je,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
bd.displayName = "SidebarSeparator";
const Qa = v.forwardRef(
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
Qa.displayName = "SidebarContent";
const gr = v.forwardRef(
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
gr.displayName = "SidebarGroup";
const br = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ge : "div",
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
br.displayName = "SidebarGroupLabel";
const vd = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ge : "button",
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
vd.displayName = "SidebarGroupAction";
const vr = v.forwardRef(
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
vr.displayName = "SidebarGroupContent";
const ti = v.forwardRef(
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
ti.displayName = "SidebarMenu";
const ei = v.forwardRef(
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
ei.displayName = "SidebarMenuItem";
const xd = he(
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
), ni = v.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const c = t ? Ge : "button", { state: w } = Fn(), d = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(xd({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: d }),
      /* @__PURE__ */ r(_t, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : d;
  }
);
ni.displayName = "SidebarMenuButton";
const yd = v.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ge : "button",
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
yd.displayName = "SidebarMenuAction";
const Nd = v.forwardRef(
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
Nd.displayName = "SidebarMenuBadge";
const kd = v.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = v.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(hr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          hr,
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
kd.displayName = "SidebarMenuSkeleton";
const _d = v.forwardRef(
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
_d.displayName = "SidebarMenuSub";
const Cd = v.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Cd.displayName = "SidebarMenuSubItem";
const Ed = v.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ge : "a",
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
Ed.displayName = "SidebarMenuSubButton";
function Rd({
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
  const w = K(
    (f, u) => {
      o(f, u);
    },
    [o]
  ), d = K(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = K(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Ja,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ p(Qa, { children: [
        /* @__PURE__ */ p(gr, { children: [
          /* @__PURE__ */ r(br, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(vr, { children: /* @__PURE__ */ r(ti, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ r(ei, { children: /* @__PURE__ */ r(
            ni,
            {
              onClick: () => w(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(gr, { children: [
          /* @__PURE__ */ r(br, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(vr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            dr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Cl },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = d(f);
                w(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(es, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Br = dn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = mt();
    return /* @__PURE__ */ p("div", { id: s, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Eo,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Je,
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
        z,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Be, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Br.displayName = "SearchBar";
function Nu({
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
      Br,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Wa,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Rd,
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
          /* @__PURE__ */ r(Za, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const me = "scrBook", Td = "scrRef", xe = "source", Sd = "details", Dd = "Scripture Reference", Md = "Scripture Book", ri = "Type", Od = "Details";
function Id(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: me,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Dd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ut.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === me ? Ne(a.start) : void 0;
      },
      getGroupingValue: (o) => ut.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => rr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ne(o.start),
      id: Td,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ne(a.start);
      },
      sortingFn: (o, a) => rr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: xe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? ri : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Sd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Od,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Ad = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || rr(t.start, t.end) === 0 ? `${zn(t.start)}+${e}` : `${zn(t.start)}+${e}-${zn(t.end)}+${n}`;
}, ko = (t) => `${Ad({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function ku({
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
  const [w, d] = D([]), [m, f] = D([{ id: me, desc: !1 }]), [u, g] = D({}), x = B(
    () => t.flatMap((C) => C.data.map((S) => ({
      ...S,
      source: C.source
    }))),
    [t]
  ), b = B(
    () => Id(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [o, i, s, n]
  );
  Y(() => {
    w.includes(xe) ? f([
      { id: xe, desc: !1 },
      { id: me, desc: !1 }
    ]) : f([{ id: me, desc: !1 }]);
  }, [w]);
  const y = Qo({
    data: x,
    columns: b,
    state: {
      grouping: w,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: bl(),
    getGroupedRowModel: gl(),
    getCoreRowModel: ea(),
    getSortedRowModel: ta(),
    getRowId: ko,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (l) {
      const C = y.getSelectedRowModel().rowsById, S = Object.keys(C);
      if (S.length === 1) {
        const j = x.find(($) => ko($) === S[0]) || void 0;
        j && l(j);
      }
    }
  }, [u, x, l, y]);
  const N = a ?? Md, _ = i ?? ri, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [me] },
    { label: `Group by ${_}`, value: [xe] },
    {
      label: `Group by ${N} and ${_}`,
      value: [me, xe]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [xe, me]
    }
  ], L = (C) => {
    d(JSON.parse(C));
  }, F = (C, S) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(S);
  }, A = (C, S) => C.getIsGrouped() ? "" : h("banded-row", S % 2 === 0 ? "even" : "odd"), R = (C, S, j) => {
    if (!((C == null ? void 0 : C.length) === 0 || S.depth < j.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ p("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      Fe,
      {
        value: JSON.stringify(w),
        onValueChange: (C) => {
          L(C);
        },
        children: [
          /* @__PURE__ */ r(Re, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(ze, {}) }),
          /* @__PURE__ */ r(Te, { position: "item-aligned", children: /* @__PURE__ */ r(kw, { children: k.map((C) => /* @__PURE__ */ r(At, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p($n, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Ln, { children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(ne, { children: C.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(wn, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          rn(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(Vn, { children: y.getRowModel().rows.map((C, S) => {
        const j = mt();
        return /* @__PURE__ */ r(
          ne,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: h(A(C, S)),
            onClick: ($) => F(C, $),
            children: C.getVisibleCells().map(($) => {
              if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== xe || !n)))
                return /* @__PURE__ */ r(
                  _e,
                  {
                    className: h(
                      $.column.columnDef.id,
                      "tw-p-[1px]",
                      R(w, C, $)
                    ),
                    children: $.getIsGrouped() ? /* @__PURE__ */ p(
                      z,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r(Ke, {}),
                          !C.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Pe, {}) : /* @__PURE__ */ r(er, {})),
                          " ",
                          rn($.column.columnDef.cell, $.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : rn($.column.columnDef.cell, $.getContext())
                  },
                  $.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Kr = (t, e) => t.filter((n) => {
  try {
    return nn(n) === e;
  } catch {
    return !1;
  }
}), oi = (t, e, n) => Kr(t, e).every((o) => n.includes(o));
function Pd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Kr(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        oi(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Il(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const _o = 5, Zn = 6;
function $d({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, y] = D(!1), [N, _] = D(""), k = H(void 0), L = H(!1);
  if (t.length !== ut.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const F = B(() => ut.allBookIds.filter(
    (P, X) => t[X] === "1" && !ut.isObsolete(ut.bookIdToNumber(P))
  ), [t]), A = B(() => {
    if (!N.trim()) {
      const O = {
        [W.OT]: [],
        [W.NT]: [],
        [W.DC]: [],
        [W.Extra]: []
      };
      return F.forEach((J) => {
        const Dt = nn(J);
        O[Dt].push(J);
      }), O;
    }
    const P = F.filter(
      (O) => Tr(O, N, a)
    ), X = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return P.forEach((O) => {
      const J = nn(O);
      X[J].push(O);
    }), X;
  }, [F, N, a]), R = K(
    (P, X = !1) => {
      if (!X || !k.current) {
        n(
          e.includes(P) ? e.filter((gt) => gt !== P) : [...e, P]
        ), k.current = P;
        return;
      }
      const O = F.findIndex((gt) => gt === k.current), J = F.findIndex((gt) => gt === P);
      if (O === -1 || J === -1) return;
      const [Dt, Lt] = [
        Math.min(O, J),
        Math.max(O, J)
      ], It = F.slice(Dt, Lt + 1).map((gt) => gt);
      n(
        e.includes(P) ? e.filter((gt) => !It.includes(gt)) : [.../* @__PURE__ */ new Set([...e, ...It])]
      );
    },
    [e, n, F]
  ), C = (P) => {
    R(P, L.current), L.current = !1;
  }, S = (P, X) => {
    P.preventDefault(), R(X, P.shiftKey);
  }, j = K(
    (P) => {
      const X = Kr(F, P).map((O) => O);
      n(
        oi(F, P, e) ? e.filter((O) => !X.includes(O)) : [.../* @__PURE__ */ new Set([...e, ...X])]
      );
    },
    [e, n, F]
  ), $ = () => {
    n(F.map((P) => P));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(W).map((P) => /* @__PURE__ */ r(
      Pd,
      {
        section: P,
        availableBookIds: F,
        selectedBookIds: e,
        onToggle: j,
        localizedStrings: o
      },
      P
    )) }),
    /* @__PURE__ */ p(
      de,
      {
        open: b,
        onOpenChange: (P) => {
          y(P), P || _("");
        },
        children: [
          /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ p(
            z,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(Mo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Zt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ce,
            {
              shouldFilter: !1,
              onKeyDown: (P) => {
                P.key === "Enter" && (L.current = P.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ye,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: $, children: c }),
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: I, children: w })
                ] }),
                /* @__PURE__ */ p(we, { children: [
                  /* @__PURE__ */ r(pn, { children: d }),
                  Object.values(W).map((P, X) => {
                    const O = A[P];
                    if (O.length !== 0)
                      return /* @__PURE__ */ p(Co, { children: [
                        /* @__PURE__ */ r(
                          Xt,
                          {
                            heading: la(P, f, u, g, x),
                            children: O.map((J) => /* @__PURE__ */ r(
                              wa,
                              {
                                bookId: J,
                                isSelected: e.includes(J),
                                onSelect: () => C(J),
                                onMouseDown: (Dt) => S(Dt, J),
                                section: nn(J),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: wr(J, a),
                                className: "tw-flex tw-items-center"
                              },
                              J
                            ))
                          }
                        ),
                        X < Object.values(W).length - 1 && /* @__PURE__ */ r(Er, {})
                      ] }, P);
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
        e.length === Zn ? Zn : _o
      ).map((P) => /* @__PURE__ */ r(Ve, { className: "hover:tw-bg-secondary", variant: "secondary", children: Ie(P, a) }, P)),
      e.length > Zn && /* @__PURE__ */ r(
        Ve,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - _o} ${m}`
        }
      )
    ] })
  ] });
}
const _u = Object.freeze([
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
]), be = (t, e) => t[e] ?? e;
function Cu({
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
  const w = be(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = be(
    s,
    "%webView_scope_selector_current_verse%"
  ), m = be(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = be(s, "%webView_scope_selector_current_book%"), u = be(s, "%webView_scope_selector_choose_books%"), g = be(s, "%webView_scope_selector_scope%"), x = be(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], y = e ? b.filter((N) => e.includes(N.value)) : b;
  return /* @__PURE__ */ p("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ht, { children: g }),
      /* @__PURE__ */ r(
        Sr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(_n, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(ht, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ht, { children: x }),
      /* @__PURE__ */ r(
        $d,
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
const Qn = {
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
function Eu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Qn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, d]) => [
          w,
          w === d && w in Qn ? Qn[w] : d
        ]
      )
    )
  }, c = mt();
  return /* @__PURE__ */ p(
    Fe,
    {
      value: `${e}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(Re, { size: a, className: h("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          ze,
          {
            placeholder: l[Q(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Te,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: He },
            children: t.map((w) => /* @__PURE__ */ r(At, { value: `${w}`, children: l[Q(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Ru({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Tu({
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
function Su({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(je, {}) : ""
  ] });
}
function ai(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function Mn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ii = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    Dn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(Mn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(Mn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(bw, { children: [
    /* @__PURE__ */ r(Ka, { children: l.label }),
    /* @__PURE__ */ r(gw, { children: /* @__PURE__ */ r(Ga, { children: ii(
      t,
      e,
      ai(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(_t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function xr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(fe, { variant: i, children: [
    /* @__PURE__ */ r(Ee, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(z, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(ns, {}) }) }),
    /* @__PURE__ */ r(le, { align: "start", style: { zIndex: He }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p(Co, { children: [
      /* @__PURE__ */ r(Ba, { children: /* @__PURE__ */ r(kt, { children: ii(e.groups, e.items, c, t) }) }),
      w < d.length - 1 && /* @__PURE__ */ r(We, {})
    ] }, c)) })
  ] });
}
const si = v.forwardRef(
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
function Du({
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
  return /* @__PURE__ */ p(si, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      xr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(rs, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        xr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(os, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Mu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(si, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    xr,
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
const li = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    St.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
li.displayName = St.List.displayName;
const ci = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  St.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
ci.displayName = St.List.displayName;
const Ld = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  St.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), wi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  St.Content,
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
wi.displayName = St.Content.displayName;
function Ou({
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
        Br,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(li, { children: [
      /* @__PURE__ */ r(ci, { children: t.map((l) => /* @__PURE__ */ r(Ld, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(wi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Vd({ ...t }) {
  return /* @__PURE__ */ r(rt.Menu, { ...t });
}
function jd({ ...t }) {
  return /* @__PURE__ */ r(rt.Sub, { "data-slot": "menubar-sub", ...t });
}
const di = v.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = v.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(jr.Provider, { value: a, children: /* @__PURE__ */ r(
    rt.Root,
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
di.displayName = rt.Root.displayName;
const pi = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Bt();
  return /* @__PURE__ */ r(
    rt.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        pe({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
pi.displayName = rt.Trigger.displayName;
const ui = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Bt();
  return /* @__PURE__ */ p(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        pe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ui.displayName = rt.SubTrigger.displayName;
const mi = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Bt();
  return /* @__PURE__ */ r(
    rt.SubContent,
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
mi.displayName = rt.SubContent.displayName;
const fi = v.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = Bt();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
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
fi.displayName = rt.Content.displayName;
const hi = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Bt();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        pe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
hi.displayName = rt.Item.displayName;
const Fd = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = Bt();
  return /* @__PURE__ */ p(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        pe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Fd.displayName = rt.CheckboxItem.displayName;
const zd = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Bt();
  return /* @__PURE__ */ p(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        pe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
zd.displayName = rt.RadioItem.displayName;
const Bd = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Bd.displayName = rt.Label.displayName;
const gi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
gi.displayName = rt.Separator.displayName;
const tn = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, bi = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        hi,
        {
          onClick: () => {
            o(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ r(Mn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ r(Mn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(jd, { children: [
        /* @__PURE__ */ r(ui, { children: w.label }),
        /* @__PURE__ */ r(mi, { children: bi(
          t,
          e,
          ai(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(_t, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ r(gi, {}, `separator-${i}`)), c;
  });
};
function Kd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), i = H(void 0), s = H(void 0), l = H(void 0), c = H(void 0), w = (d) => {
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
  if (Nl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, m) => {
    var g, x, b, y;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        tn(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), tn(i, [f, u]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), tn(s, [f, u]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), tn(l, [f, u]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), tn(c, [f, u]);
        break;
    }
  }), Y(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(di, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, m]) => typeof d == "boolean" || typeof m == "boolean" ? 0 : d.order - m.order).map(([d, m]) => /* @__PURE__ */ p(Vd, { children: [
      /* @__PURE__ */ r(pi, { ref: w(d), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        fi,
        {
          style: { zIndex: He },
          children: /* @__PURE__ */ r(kt, { children: bi(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Iu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Au({
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
  const d = H(void 0);
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
                    Kd,
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
const Gd = (t, e) => t[e] ?? e;
function Pu({
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
  const w = Gd(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, m] = D(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), i && n.find((x) => x === g) && i([...n.filter((x) => x !== g)]), m(!1);
  }, u = (g, x) => {
    var y, N, _, k, L, F;
    const b = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(L = t[g]) == null ? void 0 : L.autonym} (${b})` : (F = t[g]) == null ? void 0 : F.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Fe,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(Re, { children: /* @__PURE__ */ r(ze, {}) }),
          /* @__PURE__ */ r(
            Te,
            {
              style: { zIndex: He },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(At, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ht, { className: "tw-font-normal tw-text-muted-foreground", children: ye(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Ud({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ht, { children: e(t) }) : n ? /* @__PURE__ */ r(ht, { children: n(t) }) : /* @__PURE__ */ r(ht, { children: t });
}
function $u({
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
      zr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      Ud,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function Lu({
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
            !e && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: c }),
            !e && f && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(fe, { children: [
              /* @__PURE__ */ r(Ee, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Xr, {}) }) }),
              /* @__PURE__ */ r(le, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ p(fe, { children: [
              /* @__PURE__ */ r(Ee, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Xr, {}) }) }),
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
const qd = dn(({ className: t, ...e }, n) => /* @__PURE__ */ r(as, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
qd.displayName = "Spinner";
function Vu({
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
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ht,
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
      Je,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: h(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: d,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const Hd = he(
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
), Yd = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      Hd({ variant: e }),
      t
    ),
    ...n
  }
));
Yd.displayName = "Alert";
const Xd = v.forwardRef(
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
Xd.displayName = "AlertTitle";
const Wd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Wd.displayName = "AlertDescription";
const ju = ot.Root, Fu = ot.Trigger, zu = ot.Group, Bu = ot.Portal, Ku = ot.Sub, Gu = ot.RadioGroup, Jd = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  ot.SubTrigger,
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
      /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Jd.displayName = ot.SubTrigger.displayName;
const Zd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Zd.displayName = ot.SubContent.displayName;
const Qd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
  ot.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
Qd.displayName = ot.Content.displayName;
const tp = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Item,
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
tp.displayName = ot.Item.displayName;
const ep = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  ot.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
ep.displayName = ot.CheckboxItem.displayName;
const np = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  ot.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
np.displayName = ot.RadioItem.displayName;
const rp = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
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
rp.displayName = ot.Label.displayName;
const op = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
op.displayName = ot.Separator.displayName;
function ap({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ap.displayName = "ContextMenuShortcut";
const vi = v.createContext({
  direction: "bottom"
});
function ip({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = v.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(vi.Provider, { value: o, children: /* @__PURE__ */ r(
    zt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
ip.displayName = "Drawer";
const Uu = zt.Trigger, sp = zt.Portal, qu = zt.Close, xi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
xi.displayName = zt.Overlay.displayName;
const lp = v.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = v.useContext(vi), s = {
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
  return /* @__PURE__ */ p(sp, { children: [
    /* @__PURE__ */ r(xi, {}),
    /* @__PURE__ */ p(
      zt.Content,
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
lp.displayName = "DrawerContent";
function cp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
cp.displayName = "DrawerHeader";
function wp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
wp.displayName = "DrawerFooter";
const dp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
dp.displayName = zt.Title.displayName;
const pp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
pp.displayName = zt.Description.displayName;
const up = v.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  lr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      lr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
up.displayName = lr.Root.displayName;
function Hu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Cr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Yu = Cr.Panel;
function Xu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Cr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(is, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Wu({ ...t }) {
  return /* @__PURE__ */ r(
    kl,
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
const mp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ p(
    en.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(en.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(en.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(en.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
mp.displayName = en.Root.displayName;
const fp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    cr.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        cr.Thumb,
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
fp.displayName = cr.Root.displayName;
const Ju = St.Root, hp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    St.List,
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
hp.displayName = St.List.displayName;
const gp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  St.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
gp.displayName = St.Trigger.displayName;
const bp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  St.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
bp.displayName = St.Content.displayName;
const vp = v.forwardRef(
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
vp.displayName = "Textarea";
const Zu = (t, e) => {
  Y(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function xp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const yp = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = xp(a.current);
  const [i, s] = D(() => o.current), [l, c] = D(!0);
  return Y(() => {
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
}, tr = () => !1, Qu = (t, e) => {
  const [n] = yp(
    K(async () => {
      if (!t) return tr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    tr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Y(() => () => {
    n !== tr && n();
  }, [n]);
};
function tm(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Np(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Np(`*, ::before, ::after {
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
  Yd as Alert,
  Wd as AlertDescription,
  Xd as AlertTitle,
  Fa as Avatar,
  za as AvatarFallback,
  hw as AvatarImage,
  Jp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Zp as BOOK_SELECTOR_STRING_KEYS,
  Ve as Badge,
  Wp as BookChapterControl,
  pr as BookSelectionMode,
  Qp as BookSelector,
  z as Button,
  eu as COMMENT_EDITOR_STRING_KEYS,
  nu as COMMENT_LIST_STRING_KEYS,
  Va as Card,
  ja as CardContent,
  mw as CardDescription,
  fw as CardFooter,
  pw as CardHeader,
  uw as CardTitle,
  zl as ChapterRangeSelector,
  zr as Checkbox,
  $u as Checklist,
  dr as ComboBox,
  ce as Command,
  pn as CommandEmpty,
  Xt as CommandGroup,
  Ye as CommandInput,
  Jt as CommandItem,
  we as CommandList,
  tu as CommentEditor,
  ru as CommentList,
  ju as ContextMenu,
  ep as ContextMenuCheckboxItem,
  Qd as ContextMenuContent,
  zu as ContextMenuGroup,
  tp as ContextMenuItem,
  rp as ContextMenuLabel,
  Bu as ContextMenuPortal,
  Gu as ContextMenuRadioGroup,
  np as ContextMenuRadioItem,
  op as ContextMenuSeparator,
  ap as ContextMenuShortcut,
  Ku as ContextMenuSub,
  Zd as ContextMenuSubContent,
  Jd as ContextMenuSubTrigger,
  Fu as ContextMenuTrigger,
  Aw as DataTable,
  Sl as Dialog,
  Yp as DialogClose,
  oa as DialogContent,
  Ol as DialogDescription,
  Ml as DialogFooter,
  aa as DialogHeader,
  ra as DialogOverlay,
  Dl as DialogPortal,
  ia as DialogTitle,
  Hp as DialogTrigger,
  ip as Drawer,
  qu as DrawerClose,
  lp as DrawerContent,
  pp as DrawerDescription,
  wp as DrawerFooter,
  cp as DrawerHeader,
  xi as DrawerOverlay,
  sp as DrawerPortal,
  dp as DrawerTitle,
  Uu as DrawerTrigger,
  fe as DropdownMenu,
  ae as DropdownMenuCheckboxItem,
  le as DropdownMenuContent,
  Ba as DropdownMenuGroup,
  Dn as DropdownMenuItem,
  Lw as DropdownMenuItemType,
  un as DropdownMenuLabel,
  gw as DropdownMenuPortal,
  vw as DropdownMenuRadioGroup,
  Ua as DropdownMenuRadioItem,
  We as DropdownMenuSeparator,
  xw as DropdownMenuShortcut,
  bw as DropdownMenuSub,
  Ga as DropdownMenuSubContent,
  Ka as DropdownMenuSubTrigger,
  Ee as DropdownMenuTrigger,
  Pw as ERROR_DUMP_STRING_KEYS,
  au as ERROR_POPOVER_STRING_KEYS,
  Bw as EditorKeyboardShortcuts,
  $w as ErrorDump,
  iu as ErrorPopover,
  pu as FOOTNOTE_EDITOR_STRING_KEYS,
  wu as Filter,
  su as FilterDropdown,
  cu as Footer,
  du as FootnoteEditor,
  rd as FootnoteItem,
  uu as FootnoteList,
  xu as INVENTORY_STRING_KEYS,
  Je as Input,
  yu as Inventory,
  ht as Label,
  Yw as MARKER_MENU_STRING_KEYS,
  ou as MarkdownRenderer,
  Ww as MarkerMenu,
  lu as MoreInfo,
  jw as MultiSelectComboBox,
  Ou as NavigationContentSearch,
  de as Popover,
  Al as PopoverAnchor,
  Zt as PopoverContent,
  ge as PopoverTrigger,
  up as Progress,
  Sr as RadioGroup,
  _n as RadioGroupItem,
  Pl as RecentSearches,
  Xu as ResizableHandle,
  Yu as ResizablePanel,
  Hu as ResizablePanelGroup,
  Lu as ResultsCard,
  _u as SCOPE_SELECTOR_STRING_KEYS,
  Cu as ScopeSelector,
  ku as ScriptureResultsViewer,
  Eu as ScrollGroupSelector,
  Br as SearchBar,
  Fe as Select,
  Te as SelectContent,
  kw as SelectGroup,
  At as SelectItem,
  Cw as SelectLabel,
  Ha as SelectScrollDownButton,
  qa as SelectScrollUpButton,
  Ew as SelectSeparator,
  Re as SelectTrigger,
  ze as SelectValue,
  je as Separator,
  Ru as SettingsList,
  Su as SettingsListHeader,
  Tu as SettingsListItem,
  Rd as SettingsSidebar,
  Nu as SettingsSidebarContentSearch,
  Ja as Sidebar,
  Qa as SidebarContent,
  gd as SidebarFooter,
  gr as SidebarGroup,
  vd as SidebarGroupAction,
  vr as SidebarGroupContent,
  br as SidebarGroupLabel,
  hd as SidebarHeader,
  fd as SidebarInput,
  Za as SidebarInset,
  ti as SidebarMenu,
  yd as SidebarMenuAction,
  Nd as SidebarMenuBadge,
  ni as SidebarMenuButton,
  ei as SidebarMenuItem,
  kd as SidebarMenuSkeleton,
  _d as SidebarMenuSub,
  Ed as SidebarMenuSubButton,
  Cd as SidebarMenuSubItem,
  Wa as SidebarProvider,
  md as SidebarRail,
  bd as SidebarSeparator,
  ud as SidebarTrigger,
  hr as Skeleton,
  mp as Slider,
  Wu as Sonner,
  qd as Spinner,
  fp as Switch,
  xr as TabDropdownMenu,
  Mu as TabFloatingMenu,
  Du as TabToolbar,
  $n as Table,
  Vn as TableBody,
  Iw as TableCaption,
  _e as TableCell,
  Sw as TableFooter,
  wn as TableHead,
  Ln as TableHeader,
  ne as TableRow,
  Ju as Tabs,
  bp as TabsContent,
  hp as TabsList,
  gp as TabsTrigger,
  Vu as TextField,
  vp as Textarea,
  $r as ToggleGroup,
  an as ToggleGroupItem,
  Au as Toolbar,
  Ct as Tooltip,
  _t as TooltipContent,
  kt as TooltipProvider,
  Et as TooltipTrigger,
  Fw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Pu as UiLanguageSelector,
  zw as UndoRedoButtons,
  li as VerticalTabs,
  wi as VerticalTabsContent,
  ci as VerticalTabsList,
  Ld as VerticalTabsTrigger,
  He as Z_INDEX_ABOVE_DOCK,
  na as Z_INDEX_FOOTNOTE_EDITOR,
  Rl as Z_INDEX_MODAL,
  El as Z_INDEX_MODAL_BACKDROP,
  Cl as Z_INDEX_OVERLAY,
  dw as badgeVariants,
  da as buttonVariants,
  h as cn,
  vu as getBookIdFromUSFM,
  jn as getInventoryHeader,
  gu as getLinesFromUSFM,
  bu as getNumberFromUSFM,
  ld as getStatusForItem,
  Iu as getToolbarOSReservedSpaceClassName,
  fu as inventoryCountColumn,
  mu as inventoryItemColumn,
  hu as inventoryStatusColumn,
  _w as selectTriggerVariants,
  rm as sonner,
  Zu as useEvent,
  Qu as useEventAsync,
  ww as useListbox,
  yp as usePromise,
  Xp as useRecentSearches,
  Fn as useSidebar,
  tm as useStylesheet
};
//# sourceMappingURL=index.js.map
