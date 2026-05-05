var Si = Object.defineProperty;
var Ri = (t, e, n) => e in t ? Si(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var qt = (t, e, n) => Ri(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as w, Fragment as it } from "react/jsx-runtime";
import b, { forwardRef as zn, useRef as q, useMemo as z, useState as D, useCallback as G, useEffect as J, useLayoutEffect as ee, createContext as gr, useContext as mo, Component as Ii, createElement as zo, Suspense as Di, Fragment as fo } from "react";
import { Command as Wt } from "cmdk";
import { X as bn, Search as Ea, Check as Yt, Clock as Ko, ChevronsLeft as qo, ChevronsRight as Ho, ChevronLeft as Hr, ChevronRight as pn, ArrowLeft as Oi, ArrowRight as Ta, Circle as br, ChevronDown as Oe, BoldIcon as Mi, ItalicIcon as Ai, AtSign as Sa, Pencil as Pi, Trash2 as $i, ArrowUp as Ra, MoreHorizontal as ji, MailOpen as Li, Mail as Vi, ChevronUp as Ia, FilterIcon as Bi, ArrowLeftIcon as Gi, ChevronLeftIcon as Fi, ChevronRightIcon as zi, ArrowRightIcon as Ki, Copy as Da, Filter as Oa, User as qi, Link as Hi, CircleHelp as Ui, ChevronsUpDown as ho, Star as Yi, Undo as Xi, Redo as Wi, SquareX as Ma, FunctionSquare as Aa, SquareSigma as Pa, Ban as Ji, AlertCircle as Ur, CircleCheckIcon as Zi, CircleXIcon as Qi, CircleHelpIcon as tl, ArrowUpIcon as el, ArrowDownIcon as nl, PanelLeft as rl, PanelRight as ol, ScrollText as al, MenuIcon as sl, Menu as il, EllipsisVertical as ll, MoreVertical as Uo, LoaderCircle as cl, GripVertical as dl } from "lucide-react";
import { clsx as wl } from "clsx";
import { extendTailwindMerge as pl } from "tailwind-merge";
import * as ne from "@radix-ui/react-dialog";
import { Canon as pt } from "@sillsdev/scripture";
import { includes as Wn, Section as Q, getChaptersForBook as ul, formatScrRef as Re, getSectionForBook as An, formatRelativeDate as ml, formatReplacementString as Qe, sanitizeHtml as fl, NumberFormat as hl, formatBytes as gl, getCurrentLocale as bl, usfmMarkers as er, getFormatCallerFunction as vl, deepEqual as xl, isString as Yo, compareScrRefs as Yr, scrRefToBBBCCCVVV as Tr, defaultScrRef as Sr, formatScrRefRange as yl, getLocalizeKeyForScrollGroupId as st } from "platform-bible-utils";
import { Slot as vn } from "@radix-ui/react-slot";
import { cva as He } from "class-variance-authority";
import * as un from "@radix-ui/react-popover";
import * as $a from "@radix-ui/react-label";
import * as Ln from "@radix-ui/react-radio-group";
import { createEditor as ja, $getRoot as Me, $createParagraphNode as xn, $getSelection as Xt, HISTORY_MERGE_TAG as go, ParagraphNode as La, TextNode as Va, $isTokenOrSegmented as Nl, $getCharacterOffsets as kl, $cloneWithPropertiesEphemeral as _l, $getPreviousSelection as Cl, $isRangeSelection as xe, $caretFromPoint as El, $getSiblingCaret as Ba, $getChildCaret as Tl, $getAdjacentChildCaret as Sl, $isChildCaret as Rl, $normalizeCaret as Il, $setSelectionFromCaretRange as Dl, $getCollapsedCaretRange as Ol, $getCaretInDirection as Xo, $splitAtPointCaretNext as Ml, $isTextPointCaret as Al, $findMatchingParent as Ga, $isElementNode as Ie, mergeRegister as Ae, getDOMTextNode as Pl, isHTMLElement as Fa, CLEAR_EDITOR_COMMAND as za, COMMAND_PRIORITY_EDITOR as bo, shallowMergeConfig as $l, defineExtension as ae, safeCast as on, createState as jl, FORMAT_TEXT_COMMAND as Ka, $isNodeSelection as qa, COMMAND_PRIORITY_LOW as Ha, RootNode as Ll, LineBreakNode as Vl, TabNode as Bl, $isEditorState as Gl, createCommand as Fl, CLICK_COMMAND as zl, isDOMNode as Kl, $getNodeFromDOMNode as ql, $createNodeSelection as Hl, $setSelection as Ul, $getEditor as Yl, DecoratorNode as Xr, $getState as Xl, toggleTextFormatType as Wo, TEXT_TYPE_TO_FORMAT as Wl, $setState as Jl, addClassNamesToElement as Ua, $create as Zl, $getNodeByKey as Ql, removeClassNamesFromElement as tc, KEY_TAB_COMMAND as ec, $isBlockElementNode as ar, $createRangeSelection as nc, $normalizeSelection__EXPERIMENTAL as rc, OUTDENT_CONTENT_COMMAND as oc, INDENT_CONTENT_COMMAND as Jo, INSERT_TAB_COMMAND as ac, COMMAND_PRIORITY_CRITICAL as vo, $isDecoratorNode as sc, $isParagraphNode as ic, $isTextNode as sr, SELECTION_CHANGE_COMMAND as Ya, getRegisteredNode as lc, isDocumentFragment as Zo, isDOMDocumentNode as cc, ArtificialNode__DO_NOT_USE as Xa, $createLineBreakNode as Wa, $isRootOrShadowRoot as dc, isBlockDomNode as Qo, isInlineDomNode as ta, $insertNodes as wc } from "lexical";
import * as en from "@radix-ui/react-tooltip";
import { TooltipTrigger as pc } from "@radix-ui/react-tooltip";
import { HeadingNode as uc, QuoteNode as mc, registerRichText as fc } from "@lexical/rich-text";
import { flushSync as hc, createPortal as gc } from "react-dom";
import { $isTableSelection as bc } from "@lexical/table";
import * as vr from "@radix-ui/react-toggle-group";
import * as Ja from "@radix-ui/react-toggle";
import { createHeadlessEditor as Za } from "@lexical/headless";
import * as Qa from "@radix-ui/react-separator";
import * as yn from "@radix-ui/react-avatar";
import * as mt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as vc } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ts, getFilteredRowModel as xc, getSortedRowModel as es, getPaginationRowModel as yc, getCoreRowModel as ns, flexRender as Pn, getGroupedRowModel as Nc, getExpandedRowModel as kc } from "@tanstack/react-table";
import * as kt from "@radix-ui/react-select";
import _c from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Wr, HIDDEN_NOTE_CALLER as Jr, getDefaultViewOptions as Cc, isInsertEmbedOpOfType as Jn, Editorial as Ec } from "@eten-tech-foundation/platform-editor";
import * as Zr from "@radix-ui/react-checkbox";
import * as Jt from "@radix-ui/react-tabs";
import * as ft from "@radix-ui/react-menubar";
import { useHotkeys as Tc } from "react-hotkeys-hook";
import * as ht from "@radix-ui/react-context-menu";
import { Drawer as we } from "vaul";
import * as Qr from "@radix-ui/react-progress";
import * as xo from "react-resizable-panels";
import { Toaster as Sc } from "sonner";
import { toast as xf } from "sonner";
import * as Mn from "@radix-ui/react-slider";
import * as to from "@radix-ui/react-switch";
const Rc = pl({ prefix: "tw-" });
function h(...t) {
  return Rc(wl(t));
}
const Kn = 250, rs = 300, yo = 400, Ic = 450, Dc = 500, Oc = 550, Mc = "layoutDirection";
function _t() {
  const t = localStorage.getItem(Mc);
  return t === "rtl" ? t : "ltr";
}
const eo = ne.Root, lm = ne.Trigger, Ac = ne.Portal, cm = ne.Close, os = b.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  ne.Overlay,
  {
    ref: o,
    className: h(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: Ic, ...e },
    ...n
  }
));
os.displayName = ne.Overlay.displayName;
const ir = b.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = _t();
  return /* @__PURE__ */ w(Ac, { children: [
    /* @__PURE__ */ r(os, { className: n }),
    /* @__PURE__ */ w(
      ne.Content,
      {
        ref: s,
        className: h(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: Dc, ...o },
        ...a,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ w(
            ne.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": i === "ltr" },
                { "tw-left-4": i === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(bn, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
ir.displayName = ne.Content.displayName;
function lr({ className: t, ...e }) {
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
lr.displayName = "DialogHeader";
function no({ className: t, ...e }) {
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
no.displayName = "DialogFooter";
const cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ne.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
cr.displayName = ne.Title.displayName;
const Pc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ne.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Pc.displayName = ne.Description.displayName;
const _e = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
_e.displayName = Wt.displayName;
const an = b.forwardRef(({ className: t, onKeyDown: e, ...n }, o) => {
  const a = _t(), s = b.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), d = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (i.preventDefault(), i.stopPropagation(), d.click());
    },
    [e]
  );
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(Ea, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Wt.Input,
      {
        ref: o,
        className: h(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        onKeyDown: s,
        ...n
      }
    )
  ] });
});
an.displayName = Wt.Input.displayName;
const Ce = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Ce.displayName = Wt.List.displayName;
const Nn = b.forwardRef((t, e) => /* @__PURE__ */ r(Wt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Nn.displayName = Wt.Empty.displayName;
const ce = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
ce.displayName = Wt.Group.displayName;
const xr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
xr.displayName = Wt.Separator.displayName;
const pe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
pe.displayName = Wt.Item.displayName;
function as({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
as.displayName = "CommandShortcut";
const ss = (t, e, n, o, a) => {
  switch (t) {
    case Q.OT:
      return e ?? "Old Testament";
    case Q.NT:
      return n ?? "New Testament";
    case Q.DC:
      return o ?? "Deuterocanon";
    case Q.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, $c = (t, e, n, o, a) => {
  switch (t) {
    case Q.OT:
      return e ?? "OT";
    case Q.NT:
      return n ?? "NT";
    case Q.DC:
      return o ?? "DC";
    case Q.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function ze(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? pt.bookIdToEnglishName(t);
}
function No(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const is = pt.allBookIds.filter(
  (t) => !pt.isObsolete(pt.bookIdToNumber(t))
), se = Object.fromEntries(
  is.map((t) => [t, pt.bookIdToEnglishName(t)])
);
function ko(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = pt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(Wn(a.toLowerCase(), o) || Wn(t.toLowerCase(), o) || (s ? Wn(s.localizedName.toLowerCase(), o) || Wn(s.localizedId.toLowerCase(), o) : !1));
}
const ls = zn(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: d,
    disabled: c = !1
  }, p) => {
    const m = q(!1), f = () => {
      c || (m.current || n == null || n(t), setTimeout(() => {
        m.current = !1;
      }, 100));
    }, u = (x) => {
      if (c) {
        x.preventDefault();
        return;
      }
      m.current = !0, o ? o(x) : n == null || n(t);
    }, g = z(
      () => ze(t, l),
      [t, l]
    ), y = z(
      () => No(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Q.OT,
            "tw-border-s-purple-200": a === Q.NT,
            "tw-border-s-indigo-200": a === Q.DC,
            "tw-border-s-amber-200": a === Q.Extra
          }
        ),
        children: /* @__PURE__ */ w(
          pe,
          {
            ref: p,
            value: d || `${t} ${pt.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: u,
            role: "option",
            "aria-selected": e,
            "aria-disabled": c || void 0,
            "aria-label": `${pt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            disabled: c,
            className: h(s, c && "tw-cursor-not-allowed tw-opacity-50"),
            children: [
              i && /* @__PURE__ */ r(
                Yt,
                {
                  className: h(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: g }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: y })
            ]
          }
        )
      }
    );
  }
), cs = He(
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
), F = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? vn : "button", { className: h(cs({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const Ee = un.Root, je = un.Trigger, jc = un.Anchor, ds = b.createContext(null);
function Rr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(ds.Provider, { value: t, children: e });
}
const ue = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = _t(), l = b.useContext(ds);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(un.Portal, { container: l ?? void 0, children: /* @__PURE__ */ r(
      un.Content,
      {
        ref: s,
        align: e,
        sideOffset: n,
        className: h(
          "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
          t
        ),
        style: { zIndex: Kn, ...o },
        ...a,
        dir: i
      }
    ) })
  );
});
ue.displayName = un.Content.displayName;
function ws(t, e, n) {
  return `${t} ${se[t]}${e ? ` ${No(t, e)} ${ze(t, e)}` : ""}`;
}
function Lc({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l,
  buttonClassName: d = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost"
}) {
  const [p, m] = D(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ w(Ee, { open: p, onOpenChange: m, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": a,
        children: /* @__PURE__ */ r(Ko, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(ue, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Ce, { children: /* @__PURE__ */ r(ce, { heading: s, children: t.map((u) => /* @__PURE__ */ w(
      pe,
      {
        onSelect: () => f(u),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Ko, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function dm(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const nr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Vc = [
  nr.BOOK_ONLY,
  nr.BOOK_CHAPTER,
  nr.BOOK_CHAPTER_VERSE
];
function Bc(t) {
  return nr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function ea(t, e) {
  return pt.bookIdToNumber(t) < pt.bookIdToNumber(e.book);
}
function Gc(t, e, n) {
  const o = pt.bookIdToNumber(t) - pt.bookIdToNumber(n.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < n.chapterNum;
}
function Ir(t, e, n, o) {
  const a = pt.bookIdToNumber(t) - pt.bookIdToNumber(o.book);
  return a < 0 ? !0 : a > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : n < o.verseNum;
}
function na(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function ve(t) {
  return ul(pt.bookIdToNumber(t));
}
function Fc(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Vc.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, d = void 0, c = void 0] = i.slice(1);
        let p;
        const m = e.filter((f) => ko(f, l, n));
        if (m.length === 1 && ([p] = m), !p && d) {
          if (pt.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (p = f);
          }
          if (!p && n) {
            const f = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([p] = f);
          }
        }
        if (!p && d) {
          const u = ((g) => Object.keys(se).find(
            (y) => se[y].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let f = d ? parseInt(d, 10) : void 0;
          f && f > ve(p) && (f = Math.max(ve(p), 1));
          const u = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
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
function zc(t, e, n, o) {
  const a = G(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], p = Math.max(ve(c), 1);
        o({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = G(() => {
    const d = ve(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const p = e[c + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = G(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = G(() => {
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
      icon: n === "ltr" ? qo : Ho
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Hr : pn
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? pn : Hr
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === ve(t.book) || ve(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Ho : qo
    }
  ], [
    t,
    e,
    n,
    a,
    i,
    l,
    s
  ]);
}
function ps({
  count: t,
  valueBuilder: e,
  onSelect: n,
  itemRef: o,
  isDisabled: a,
  isDimmed: s,
  isSelected: i,
  className: l
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ r(ce, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", l), children: Array.from({ length: t }, (d, c) => c + 1).map((d) => {
      const c = (a == null ? void 0 : a(d)) ?? !1;
      return /* @__PURE__ */ r(
        pe,
        {
          value: e(d),
          onSelect: () => {
            c || n(d);
          },
          ref: o(d),
          disabled: c,
          "aria-disabled": c || void 0,
          className: h(
            // No fixed width (previously `tw-w-8`) so cells fill their grid
            // column (1fr) and adapt when the popover is narrower than the
            // default 280px. `tw-min-w-0` lets cells shrink below their
            // intrinsic content width; `tw-px-0` overrides CommandItem's
            // default horizontal padding so multi-digit numbers still fit
            // in tight cells. Keep `tw-h-8` for a consistent row height.
            "tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",
            {
              "tw-bg-primary tw-text-primary-foreground": (i == null ? void 0 : i(d)) ?? !1
            },
            {
              "tw-bg-muted/50 tw-text-muted-foreground/50": ((s == null ? void 0 : s(d)) ?? !1) && !c
            },
            c && "tw-cursor-not-allowed tw-opacity-40"
          ),
          children: d
        },
        d
      );
    }) }) });
}
function ra({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  isChapterDisabled: s,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(
      ps,
      {
        count: ve(t),
        valueBuilder: (l) => `${t} ${se[t] || ""} ${l}`,
        onSelect: n,
        itemRef: o,
        isDisabled: s,
        isDimmed: a,
        isSelected: (l) => t === e.book && l === e.chapterNum,
        className: i
      }
    );
}
function oa({
  bookId: t,
  chapterNum: e,
  endVerse: n,
  scrRef: o,
  onVerseSelect: a,
  setVerseRef: s,
  isVerseDimmed: i,
  isVerseDisabled: l,
  className: d
}) {
  if (!(!t || n <= 0))
    return /* @__PURE__ */ r(
      ps,
      {
        count: n,
        valueBuilder: (c) => `${t} ${se[t] || ""} ${e}:${c}`,
        onSelect: a,
        itemRef: s,
        isDisabled: l,
        isDimmed: i,
        isSelected: (c) => t === o.book && e === o.chapterNum && c === o.verseNum,
        className: d
      }
    );
}
function Dr({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: d,
  getEndVerse: c,
  disableReferencesUpTo: p,
  submitKeys: m,
  triggerContent: f,
  triggerVariant: u = "outline",
  onOpenChange: g,
  onCloseAutoFocus: y,
  modal: x = !1,
  align: N = "center"
}) {
  const R = _t(), [I, S] = D(!1), [V, k] = D(""), [T, C] = D(""), [v, E] = D("books"), [P, L] = D(void 0), [M, $] = D(
    void 0
  ), [H, Y] = D(void 0), [tt, St] = D(!1), Gt = q(null), jt = q(!1), lt = q(void 0), gt = q(void 0), K = q(void 0), nt = q(void 0), ct = q({}), rt = q({}), at = G(
    (_) => {
      e(_), l && l(_);
    },
    [e, l]
  ), Ft = z(() => o ? o() : is, [o]), Dt = z(() => ({
    [Q.OT]: Ft.filter((U) => pt.isBookOT(U)),
    [Q.NT]: Ft.filter((U) => pt.isBookNT(U)),
    [Q.DC]: Ft.filter((U) => pt.isBookDC(U)),
    [Q.Extra]: Ft.filter((U) => pt.extraBooks().includes(U))
  }), [Ft]), zt = z(() => Object.values(Dt).flat(), [Dt]), fe = z(() => {
    if (!T.trim()) return Dt;
    const _ = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((Z) => {
      _[Z] = Dt[Z].filter((It) => ko(It, T, a));
    }), _;
  }, [Dt, T, a]), A = z(
    () => Fc(T, zt, a),
    [T, zt, a]
  ), Zt = q(!1);
  J(() => {
    if (!Zt.current) {
      Zt.current = !0;
      return;
    }
    g == null || g(I);
  }, [I, g]);
  const he = G(() => {
    if (A) {
      const _ = A.chapterNum ?? 1, U = A.verseNum ?? 1;
      if (p && Ir(A.book, _, U, p))
        return;
      at({
        book: A.book,
        chapterNum: _,
        verseNum: U
      }), S(!1), C(""), k("");
    }
  }, [at, A, p]), Ot = G(
    (_) => {
      const U = M ?? (A == null ? void 0 : A.book), Z = H ?? (A == null ? void 0 : A.chapterNum);
      !U || !Z || (at({
        book: U,
        chapterNum: Z,
        verseNum: _
      }), S(!1));
    },
    [at, M, H, A]
  ), B = G(
    (_) => {
      if (p && ea(_, p)) return;
      if (ve(_) <= 1) {
        at({
          book: _,
          chapterNum: 1,
          verseNum: 1
        }), S(!1), C("");
        return;
      }
      L(_), E("chapters");
    },
    [at, p]
  ), X = G(
    (_) => {
      const U = v === "chapters" ? P : A == null ? void 0 : A.book;
      if (U) {
        if (c && c(U, _) > 1) {
          $(U), Y(_), E("verses"), k("");
          return;
        }
        at({
          book: U,
          chapterNum: _,
          verseNum: 1
        }), S(!1);
      }
    },
    [at, v, P, A, c]
  ), et = G(
    (_) => {
      at(_), S(!1), C("");
    },
    [at]
  ), dt = zc(t, zt, R, e), xt = G(() => {
    E("books"), L(void 0), $(void 0), Y(void 0), setTimeout(() => {
      gt.current && gt.current.focus();
    }, 0);
  }, []), yt = G(() => {
    const _ = M;
    $(void 0), Y(void 0), _ ? (L(_), E("chapters"), k("")) : xt();
  }, [M, xt]), Rt = G((_) => {
    S(_), _ && (E("books"), L(void 0), $(void 0), Y(void 0), C(""));
  }, []), { otLong: bt, ntLong: Ct, dcLong: Lt, extraLong: O } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Nt = G(
    (_) => ss(_, bt, Ct, Lt, O),
    [bt, Ct, Lt, O]
  ), ut = G(
    (_) => A ? !!A.chapterNum && !_.toString().includes(A.chapterNum.toString()) : !1,
    [A]
  ), Ve = z(
    () => Re(
      t,
      a ? ze(t.book, a) : "English"
    ),
    [t, a]
  ), Ue = G((_) => (U) => {
    ct.current[_] = U;
  }, []), Ye = G((_) => (U) => {
    rt.current[_] = U;
  }, []), sn = z(
    () => Bc(T),
    [T]
  ), Be = z(() => !c || !A || !A.chapterNum || !sn ? !1 : c(A.book, A.chapterNum) > 0, [c, A, sn]), Cn = G(
    (_) => p ? ea(_, p) : !1,
    [p]
  ), Ge = G(
    (_) => (U) => p ? Gc(_, U, p) : !1,
    [p]
  ), En = G(
    (_, U) => (Z) => p ? Ir(_, U, Z, p) : !1,
    [p]
  ), Xe = (s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", Tn = (s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", Sn = G(
    (_) => {
      (_.key === "Home" || _.key === "End") && _.stopPropagation(), m && m.includes(_.key) && A && A.chapterNum !== void 0 && A.verseNum !== void 0 && (_.preventDefault(), _.stopPropagation(), he());
    },
    [m, A, he]
  ), qn = G(
    (_) => {
      var re, ln, Rn;
      if (_.ctrlKey) return;
      const { isLetter: U, isDigit: Z } = na(_.key);
      if ((v === "chapters" || v === "verses") && (_.key === " " || _.key === "Enter")) {
        const Kt = _.target instanceof HTMLElement ? _.target : void 0;
        if (!!(Kt != null && Kt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          _.stopPropagation();
          return;
        }
        const Mt = (re = lt.current) == null ? void 0 : re.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Mt) {
          _.preventDefault(), _.stopPropagation(), Mt.click();
          return;
        }
      }
      if ((v === "chapters" || v === "verses") && (U || Z)) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      if (v === "chapters" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), xt();
        return;
      }
      if (v === "verses" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), yt();
        return;
      }
      const It = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(_.key);
      if (v === "verses" && It) {
        const Kt = M, Et = H;
        if (!Kt || !Et || !c) return;
        const Mt = c(Kt, Et);
        if (!Mt) return;
        (ln = lt.current) == null || ln.focus();
        const vt = (() => {
          if (!V) return 1;
          const We = V.match(/:(\d+)$/);
          return We ? parseInt(We[1], 10) : 0;
        })();
        let Qt = vt;
        const te = 6;
        switch (_.key) {
          case "ArrowLeft":
            vt !== 0 && (Qt = vt > 1 ? vt - 1 : Mt);
            break;
          case "ArrowRight":
            vt !== 0 && (Qt = vt < Mt ? vt + 1 : 1);
            break;
          case "ArrowUp":
            Qt = vt === 0 ? Mt : Math.max(1, vt - te);
            break;
          case "ArrowDown":
            Qt = vt === 0 ? 1 : Math.min(Mt, vt + te);
            break;
          default:
            return;
        }
        Qt !== vt && (_.preventDefault(), _.stopPropagation(), k(
          `${Kt} ${se[Kt] || ""} ${Et}:${Qt}`
        ), setTimeout(() => {
          const We = rt.current[Qt];
          We && We.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((v === "chapters" || v === "books" && A) && It) {
        const Kt = v === "chapters" ? P : A == null ? void 0 : A.book;
        if (!Kt) return;
        v === "chapters" && ((Rn = lt.current) == null || Rn.focus());
        const Et = (() => {
          if (!V) return 1;
          const te = V.match(/(\d+)$/);
          return te ? parseInt(te[1], 10) : 0;
        })(), Mt = ve(Kt);
        if (!Mt) return;
        let vt = Et;
        const Qt = 6;
        switch (_.key) {
          case "ArrowLeft":
            Et !== 0 && (vt = Et > 1 ? Et - 1 : Mt);
            break;
          case "ArrowRight":
            Et !== 0 && (vt = Et < Mt ? Et + 1 : 1);
            break;
          case "ArrowUp":
            vt = Et === 0 ? Mt : Math.max(1, Et - Qt);
            break;
          case "ArrowDown":
            vt = Et === 0 ? 1 : Math.min(Mt, Et + Qt);
            break;
          default:
            return;
        }
        vt !== Et && (_.preventDefault(), _.stopPropagation(), k(
          `${Kt} ${se[Kt] || ""} ${vt}`
        ), setTimeout(() => {
          const te = ct.current[vt];
          te && te.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      A,
      xt,
      yt,
      P,
      M,
      H,
      c,
      V
    ]
  ), Hn = G((_) => {
    var It;
    if (_.shiftKey || _.key === "Tab" || _.key === " ") return;
    if (_.key === "Enter") {
      _.stopPropagation();
      return;
    }
    if (_.key === "ArrowUp" || _.key === "ArrowDown") {
      (It = gt.current) == null || It.focus();
      return;
    }
    const { isLetter: U, isDigit: Z } = na(_.key);
    (U || Z) && (_.preventDefault(), C((re) => re + _.key), gt.current.focus(), St(!1));
  }, []);
  return ee(() => {
    const _ = setTimeout(() => {
      if (I && v === "books" && K.current && nt.current) {
        const U = K.current, Z = nt.current, It = Z.offsetTop, re = U.clientHeight, ln = Z.clientHeight, Rn = It - re / 2 + ln / 2;
        U.scrollTo({
          top: Math.max(0, Rn),
          behavior: "smooth"
        }), k(ws(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(_);
    };
  }, [I, v, T, A, t.book]), ee(() => {
    if (v === "chapters" && P) {
      const _ = P === t.book, U = _ ? t.chapterNum : 1;
      k(
        `${P} ${se[P] || ""} ${U}`
      ), setTimeout(() => {
        if (K.current)
          if (_) {
            const Z = ct.current[t.chapterNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        lt.current && lt.current.focus();
      }, 0);
    }
  }, [v, P, A, t.book, t.chapterNum]), ee(() => {
    if (v === "verses" && M && H !== void 0) {
      const _ = M === t.book && H === t.chapterNum, U = _ ? t.verseNum : 1;
      k(
        `${M} ${se[M] || ""} ${H}:${U}`
      ), setTimeout(() => {
        if (K.current)
          if (_) {
            const Z = rt.current[t.verseNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        lt.current && lt.current.focus();
      }, 0);
    }
  }, [
    v,
    M,
    H,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ w(Ee, { open: I, onOpenChange: Rt, modal: x, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        ref: Gt,
        "aria-label": "book-chapter-trigger",
        variant: u,
        role: "combobox",
        "aria-expanded": I,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        onClick: (_) => {
          jt.current && (jt.current = !1, _.preventDefault());
        },
        children: f ?? /* @__PURE__ */ r("span", { className: "tw-truncate", children: Ve })
      }
    ) }),
    /* @__PURE__ */ r(
      ue,
      {
        id: d,
        className: "tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",
        align: N,
        onKeyDownCapture: qn,
        onKeyDown: (_) => _.stopPropagation(),
        onPointerDownOutside: (_) => {
          const { target: U } = _;
          I && Gt.current && U instanceof Node && Gt.current.contains(U) && (jt.current = !0, Rt(!1));
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ w(
          _e,
          {
            ref: lt,
            loop: !0,
            value: V,
            onValueChange: k,
            shouldFilter: !1,
            children: [
              v === "books" ? /* @__PURE__ */ w("div", { className: "tw-flex tw-items-end", children: [
                /* @__PURE__ */ w("div", { className: "tw-relative tw-flex-1", children: [
                  /* @__PURE__ */ r(
                    an,
                    {
                      ref: gt,
                      value: T,
                      onValueChange: C,
                      onKeyDown: Sn,
                      onFocus: () => St(!1),
                      className: i && i.length > 0 ? "!tw-pr-10" : ""
                    }
                  ),
                  i && i.length > 0 && /* @__PURE__ */ r(
                    Lc,
                    {
                      recentSearches: i,
                      onSearchItemSelect: et,
                      renderItem: (_) => Re(_, "English"),
                      getItemKey: (_) => `${_.book}-${_.chapterNum}-${_.verseNum}`,
                      ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                      groupHeading: s == null ? void 0 : s["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: dt.map(({ onClick: _, disabled: U, title: Z, icon: It }) => /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      St(!0), _();
                    },
                    disabled: U,
                    className: "tw-h-10 tw-w-4 tw-p-0",
                    title: Z,
                    onKeyDown: Hn,
                    children: /* @__PURE__ */ r(It, {})
                  },
                  Z
                )) })
              ] }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
                /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: v === "verses" ? yt : xt,
                    className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                    children: R === "ltr" ? /* @__PURE__ */ r(Oi, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ta, { className: "tw-h-4 tw-w-4" })
                  }
                ),
                v === "chapters" && P && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: ze(P, a) }),
                v === "verses" && M && H !== void 0 && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: `${ze(M, a)} ${H}` }),
                /* @__PURE__ */ r(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",
                    children: v === "verses" ? Tn : Xe
                  }
                )
              ] }),
              !tt && /* @__PURE__ */ w(Ce, { ref: K, children: [
                v === "books" && /* @__PURE__ */ w(it, { children: [
                  !A && Object.entries(fe).map(([_, U]) => {
                    if (U.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ r(ce, { heading: Nt(_), children: U.map((Z) => /* @__PURE__ */ r(
                          ls,
                          {
                            bookId: Z,
                            onSelect: (It) => B(It),
                            section: An(Z),
                            commandValue: `${Z} ${se[Z]}`,
                            ref: Z === t.book ? nt : void 0,
                            localizedBookNames: a,
                            disabled: Cn(Z)
                          },
                          Z
                        )) }, _)
                      );
                  }),
                  A && /* @__PURE__ */ r(ce, { children: /* @__PURE__ */ r(
                    pe,
                    {
                      value: `${A.book} ${se[A.book]} ${A.chapterNum || ""}:${A.verseNum || ""})}`,
                      onSelect: he,
                      disabled: !!p && Ir(
                        A.book,
                        A.chapterNum ?? 1,
                        A.verseNum ?? 1,
                        p
                      ),
                      className: "tw-font-semibold tw-text-primary",
                      children: Re(
                        {
                          book: A.book,
                          chapterNum: A.chapterNum ?? 1,
                          verseNum: A.verseNum ?? 1
                        },
                        a ? No(A.book, a) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  A && Be && A.chapterNum && c && /* @__PURE__ */ w(it, { children: [
                    /* @__PURE__ */ w("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: `${ze(A.book, a)} ${A.chapterNum}` }),
                      /* @__PURE__ */ r("span", { children: Tn })
                    ] }),
                    /* @__PURE__ */ r(
                      oa,
                      {
                        bookId: A.book,
                        chapterNum: A.chapterNum,
                        endVerse: c(A.book, A.chapterNum),
                        scrRef: t,
                        onVerseSelect: Ot,
                        setVerseRef: Ye,
                        isVerseDisabled: En(A.book, A.chapterNum),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] }),
                  A && !Be && ve(A.book) > 1 && /* @__PURE__ */ w(it, { children: [
                    /* @__PURE__ */ w("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: ze(A.book, a) }),
                      /* @__PURE__ */ r("span", { children: Xe })
                    ] }),
                    /* @__PURE__ */ r(
                      ra,
                      {
                        bookId: A.book,
                        scrRef: t,
                        onChapterSelect: X,
                        setChapterRef: Ue,
                        isChapterDimmed: ut,
                        isChapterDisabled: Ge(A.book),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] })
                ] }),
                v === "chapters" && P && /* @__PURE__ */ r(
                  ra,
                  {
                    bookId: P,
                    scrRef: t,
                    onChapterSelect: X,
                    setChapterRef: Ue,
                    isChapterDisabled: Ge(P),
                    className: "tw-p-4"
                  }
                ),
                v === "verses" && M && H !== void 0 && c && /* @__PURE__ */ r(
                  oa,
                  {
                    bookId: M,
                    chapterNum: H,
                    endVerse: c(M, H),
                    scrRef: t,
                    onVerseSelect: Ot,
                    setVerseRef: Ye,
                    isVerseDisabled: En(
                      M,
                      H
                    ),
                    className: "tw-p-4"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const wm = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]), Kc = He(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Tt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r($a.Root, { ref: n, className: h("pr-twp", Kc(), t), ...e }));
Tt.displayName = $a.Root.displayName;
const _o = b.forwardRef(({ className: t, ...e }, n) => {
  const o = _t();
  return /* @__PURE__ */ r(
    Ln.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
_o.displayName = Ln.Root.displayName;
const dr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ln.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Ln.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(br, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
dr.displayName = Ln.Item.displayName;
function qc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function ro({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: d = qc,
  getButtonLabel: c,
  icon: p = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: y = "start",
  isDisabled: x = !1,
  ariaLabel: N,
  ...R
}) {
  const [I, S] = D(!1), V = c ?? d, k = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], T = (C, v) => {
    const E = d(C), P = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, L = `${v ?? ""}${E}${P ?? ""}`;
    return /* @__PURE__ */ w(
      pe,
      {
        value: E,
        onSelect: () => {
          l(C), S(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Yt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || d(i) !== E
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            P && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              P
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ w(Ee, { open: I, onOpenChange: S, ...R, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": I,
        "aria-label": N,
        id: t,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: p }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? V(i) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ue,
      {
        align: y,
        className: h("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ w(_e, { children: [
          /* @__PURE__ */ r(an, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Nn, { children: u }),
          /* @__PURE__ */ r(Ce, { children: k(e) ? e.map((C) => /* @__PURE__ */ r(ce, { heading: C.groupHeading, children: C.options.map((v) => T(v, C.groupHeading)) }, C.groupHeading)) : e.map((C) => T(C)) })
        ] })
      }
    )
  ] });
}
function Hc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = z(
    () => Array.from({ length: s }, (c, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ w(it, { children: [
    /* @__PURE__ */ r(Tt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      ro,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(Tt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      ro,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var oo = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(oo || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(oo || (oo = {}));
const pm = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Or = (t, e) => t[e] ?? e;
function um({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: c
}) {
  const p = Or(c, "%webView_bookSelector_currentBook%"), m = Or(c, "%webView_bookSelector_choose%"), f = Or(c, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), y = (x) => {
    g(x), t(x);
  };
  return /* @__PURE__ */ r(
    _o,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => y(x),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(dr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(Tt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(Tt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Hc,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(dr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(Tt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(Tt, { className: "tw-flex tw-items-center", children: o.map((x) => pt.bookIdToEnglishName(x)).join(", ") }),
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
const us = gr(null);
function Uc(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Te() {
  const t = mo(us);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ms = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Yc = ms ? ee : J, Zn = { tag: go };
function Xc({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: d } = t, c = Uc(null, o), p = ja({ editable: t.editable, html: d, namespace: a, nodes: s, onError: (m) => i(m, p), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = Me();
          if (u.isEmpty()) {
            const g = xn();
            u.append(g);
            const y = ms ? document.activeElement : null;
            (Xt() !== null || y !== null && y === m.getRootElement()) && g.select();
          }
        }, Zn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, Zn);
            break;
          }
          case "object":
            m.setEditorState(f, Zn);
            break;
          case "function":
            m.update(() => {
              Me().isEmpty() && f(m);
            }, Zn);
        }
      }
    }(p, l), [p, c];
  }, []);
  return Yc(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(us.Provider, { value: n, children: e });
}
const Wc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Jc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Te();
  return Wc(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(go) || l.isEmpty() || n(a, o, d);
    });
  }, [o, t, e, n]), null;
}
const Co = {
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
}, Pt = en.Provider, Vt = en.Root, Bt = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  en.Trigger,
  {
    ref: o,
    className: e ? h(cs({ variant: e }), t) : t,
    ...n
  }
));
Bt.displayName = en.Trigger.displayName;
const $t = b.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(en.Portal, { children: /* @__PURE__ */ r(
  en.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: Oc, ...n },
    className: h(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
$t.displayName = en.Content.displayName;
const Eo = [
  uc,
  La,
  Va,
  mc
], Zc = gr(null), Mr = {
  didCatch: !1,
  error: null
};
class Qc extends Ii {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Mr;
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
      for (var n, o, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Mr);
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
    if (o && n.error !== null && td(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Mr);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: a
    } = this.props, {
      didCatch: s,
      error: i
    } = this.state;
    let l = e;
    if (s) {
      const d = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(d);
      else if (o)
        l = zo(o, d);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return zo(Zc.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function td() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function ed({ children: t, onError: e }) {
  return r(Qc, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const nd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function rd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function od() {
  return function(t) {
    const [e] = Te(), n = z(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), s = q(o);
    return nd(() => {
      const { initialValueFn: i, subscribe: l } = n, d = i();
      return s.current !== d && (s.current = d, a(d)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(rd);
}
function ad(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), s = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), i = Array.from(e.getClientRects());
  let l, d = i.length;
  i.sort((c, p) => {
    const m = c.top - p.top;
    return Math.abs(m) <= 3 ? c.left - p.left : m;
  });
  for (let c = 0; c < d; c++) {
    const p = i[c], m = l && l.top <= p.top && l.top + l.height > p.top && l.left + l.width > p.left, f = p.width + s === o.width;
    m || f ? (i.splice(c--, 1), d--) : l = p;
  }
  return i;
}
function sd(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Nl(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), d = s.getNode(), c = e.is(l), p = e.is(d);
    if (c || p) {
      const [m, f] = kl(t), u = l.is(d), g = e.is(i ? d : l), y = e.is(i ? l : d);
      let x, N = 0;
      u ? (N = m > f ? f : m, x = m > f ? m : f) : g ? (N = i ? f : m, x = void 0) : y && (N = 0, x = i ? m : f);
      const R = e.__text.slice(N, x);
      R !== e.__text && (n === "clone" && (e = _l(e)), e.__text = R);
    }
  }
  return e;
}
function wr(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const fs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, id = fs && "documentMode" in document ? document.documentMode : null;
!(!fs || !("InputEvent" in window) || id) && "getTargetRanges" in new window.InputEvent("input");
function be(t) {
  return `${t}px`;
}
const ld = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function cd(t, e, n) {
  let o = null, a = null, s = null, i = [];
  const l = document.createElement("div");
  function d() {
    o === null && wr(182), a === null && wr(183);
    const { left: m, top: f } = a.getBoundingClientRect(), u = ad(t, e);
    var g, y;
    l.isConnected || (y = l, (g = a).insertBefore(y, g.firstChild));
    let x = !1;
    for (let N = 0; N < u.length; N++) {
      const R = u[N], I = i[N] || document.createElement("div"), S = I.style;
      S.position !== "absolute" && (S.position = "absolute", x = !0);
      const V = be(R.left - m);
      S.left !== V && (S.left = V, x = !0);
      const k = be(R.top - f);
      S.top !== k && (I.style.top = k, x = !0);
      const T = be(R.width);
      S.width !== T && (I.style.width = T, x = !0);
      const C = be(R.height);
      S.height !== C && (I.style.height = C, x = !0), I.parentNode !== l && (l.append(I), x = !0), i[N] = I;
    }
    for (; i.length > u.length; ) i.pop();
    x && n(i);
  }
  function c() {
    a = null, o = null, s !== null && s.disconnect(), s = null, l.remove();
    for (const m of i) m.remove();
    i = [];
  }
  l.style.position = "relative";
  const p = t.registerRootListener(function m() {
    const f = t.getRootElement();
    if (f === null) return c();
    const u = f.parentElement;
    if (!Fa(u)) return c();
    c(), o = f, a = u, s = new MutationObserver((g) => {
      const y = t.getRootElement(), x = y && y.parentElement;
      if (y !== o || x !== a) return m();
      for (const N of g) if (!l.contains(N.target)) return d();
    }), s.observe(u, ld), d();
  });
  return () => {
    p(), c();
  };
}
function aa(t, e, n) {
  if (t.type !== "text" && Ie(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Pl(n) || n, t.offset];
}
function dd(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== be(-1.5) && (n.marginTop = be(-1.5)), n.paddingTop !== be(4) && (n.paddingTop = be(4)), n.paddingBottom !== be(0) && (n.paddingBottom = be(0));
  }
}
function wd(t, e = dd) {
  let n = null, o = null, a = null, s = null, i = null, l = null, d = () => {
  };
  function c(p) {
    p.read(() => {
      const m = Xt();
      if (!xe(m)) return n = null, a = null, s = null, l = null, d(), void (d = () => {
      });
      const [f, u] = function(C) {
        const v = C.getStartEndPoints();
        return C.isBackward() ? [v[1], v[0]] : v;
      }(m), g = f.getNode(), y = g.getKey(), x = f.offset, N = u.getNode(), R = N.getKey(), I = u.offset, S = t.getElementByKey(y), V = t.getElementByKey(R), k = n === null || S !== o || x !== a || y !== n.getKey(), T = s === null || V !== i || I !== l || R !== s.getKey();
      if ((k || T) && S !== null && V !== null) {
        const C = function(v, E, P, L, M, $, H) {
          const Y = (v._window ? v._window.document : document).createRange();
          return Y.setStart(...aa(E, P, L)), Y.setEnd(...aa(M, $, H)), Y;
        }(t, f, g, S, u, N, V);
        d(), d = cd(t, C, e);
      }
      n = g, o = S, a = x, s = N, i = V, l = I;
    });
  }
  return c(t.getEditorState()), Ae(t.registerUpdateListener(({ editorState: p }) => c(p)), () => {
    d();
  });
}
function pd(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), s = a && a.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? n !== null && (n(), n = null) : n === null && (n = wd(t, e));
  };
  return t.registerRootListener((a) => {
    if (a) {
      const s = a.ownerDocument;
      return s.addEventListener("selectionchange", o), o(), () => {
        n !== null && n(), s.removeEventListener("selectionchange", o);
      };
    }
  });
}
function ud(t) {
  const e = Ga(t, (n) => Ie(n) && !n.isInline());
  return Ie(e) || wr(4, t.__key), e;
}
function md(t) {
  const e = Xt() || Cl();
  let n;
  if (xe(e)) n = El(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), l = i[i.length - 1];
      l && (n = Ba(l, "next"));
    }
    n = n || Tl(Me(), "previous").getFlipped().insert(xn());
  }
  const o = fd(t, n), a = Sl(o), s = Rl(a) ? Il(a) : o;
  return Dl(Ol(s)), t.getLatest();
}
function fd(t, e, n) {
  let o = Xo(e, "next");
  for (let a = o; a; a = Ml(a, n)) o = a;
  return Al(o) && wr(283), o.insert(t.isInline() ? xn().append(t) : t), Xo(Ba(t.getLatest(), "next"), e.direction);
}
function hd(t) {
  const e = Xt();
  if (!xe(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Ga(s, (c) => Ie(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
const gd = Symbol.for("preact-signals");
function yr() {
  if (De > 1) return void De--;
  let t, e = !1;
  for (!function() {
    let n = pr;
    for (pr = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); $n !== void 0; ) {
    let n = $n;
    for ($n = void 0, ur++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && hs(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (ur = 0, De--, e) throw t;
}
function bd(t) {
  if (De > 0) return t();
  ao = ++vd, De++;
  try {
    return t();
  } finally {
    yr();
  }
}
let ot, $n;
function sa(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let pr, De = 0, ur = 0, vd = 0, ao = 0, rr = 0;
function ia(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function Ht(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Vn(t, e) {
  return new Ht(t, e);
}
function hs(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function la(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function gs(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function Je(t, e) {
  Ht.call(this, void 0), this.x = t, this.s = void 0, this.g = rr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function xd(t, e) {
  return new Je(t, e);
}
function bs(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    De++;
    const n = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, To(t), o;
    } finally {
      ot = n, yr();
    }
  }
}
function To(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, bs(t);
}
function yd(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  gs(this), ot = t, this.f &= -2, 8 & this.f && To(this), yr();
}
function dn(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ye(t, e) {
  const n = new dn(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function kn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = Vn(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
Ht.prototype.brand = gd, Ht.prototype.h = function() {
  return !0;
}, Ht.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : sa(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Ht.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && sa(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Ht.prototype.subscribe = function(t) {
  return ye(() => {
    const e = this.value, n = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = n;
    }
  }, { name: "sub" });
}, Ht.prototype.valueOf = function() {
  return this.value;
}, Ht.prototype.toString = function() {
  return this.value + "";
}, Ht.prototype.toJSON = function() {
  return this.value;
}, Ht.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(Ht.prototype, "value", { get() {
  const t = ia(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ur > 100) throw new Error("Cycle detected");
    (function(e) {
      De !== 0 && ur === 0 && e.l !== ao && (e.l = ao, pr = { S: e, v: e.v, i: e.i, o: pr });
    })(this), this.v = t, this.i++, rr++, De++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      yr();
    }
  }
} }), Je.prototype = new Ht(), Je.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === rr)) return !0;
  if (this.g = rr, this.f |= 1, this.i > 0 && !hs(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    la(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, gs(this), this.f &= -2, !0;
}, Je.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Ht.prototype.S.call(this, t);
}, Je.prototype.U = function(t) {
  if (this.t !== void 0 && (Ht.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Je.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Je.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = ia(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), dn.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, dn.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, bs(this), la(this), De++;
  const t = ot;
  return ot = this, yd.bind(this, t);
}, dn.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = $n, $n = this);
}, dn.prototype.d = function() {
  this.f |= 8, 1 & this.f || To(this);
}, dn.prototype.dispose = function() {
  this.d();
};
ae({ build: (t, e, n) => kn(e), config: on({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return ye(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function vs() {
  const t = Me(), e = Xt(), n = xn();
  t.clear(), t.append(n), e !== null && n.select(), xe(e) && (e.format = 0);
}
function xs(t, e = vs) {
  return t.registerCommand(za, (n) => (t.update(e), !0), bo);
}
ae({ build: (t, e, n) => kn(e), config: on({ $onClear: vs }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return ye(() => xs(t, o.value));
} });
function Nd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Ar = jl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ys extends Xr {
  $config() {
    return this.config("decorator-text", { extends: Xr, stateConfigs: [{ flat: !0, stateConfig: Ar }] });
  }
  getFormat() {
    return Xl(this, Ar);
  }
  getFormatFlags(e, n) {
    return Wo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Wl[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Jl(this, Ar, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Wo(n, e, null);
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
function kd(t) {
  return t instanceof ys;
}
ae({ name: "@lexical/extension/DecoratorText", nodes: () => [ys], register: (t, e, n) => t.registerCommand(Ka, (o) => {
  const a = Xt();
  if (qa(a) || xe(a)) for (const s of a.getNodes()) kd(s) && s.toggleFormat(o);
  return !1;
}, Ha) });
function Ns(t, e) {
  let n;
  return Vn(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const so = ae({ build: (t) => Ns(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function wt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ks(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ks(n[a], o[a]);
    return t;
  }
  return e;
}
const So = 0, io = 1, _s = 2, Pr = 3, Qn = 4, cn = 5, $r = 6, Dn = 7;
function jr(t) {
  return t.id === So;
}
function Cs(t) {
  return t.id === _s;
}
function _d(t) {
  return function(e) {
    return e.id === io;
  }(t) || wt(305, String(t.id), String(io)), Object.assign(t, { id: _s });
}
const Cd = /* @__PURE__ */ new Set();
class Ed {
  constructor(e, n) {
    qt(this, "builder");
    qt(this, "configs");
    qt(this, "_dependency");
    qt(this, "_peerNameSet");
    qt(this, "extension");
    qt(this, "state");
    qt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: So };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : $l;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Cs(n) || wt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, c) {
      return Object.assign(l, { config: d, id: Pr, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: Qn, initResult: d, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Qn && wt(307, String(n.id), String(cn)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: cn, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== cn && wt(308, String(o.id), String(cn));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: $r });
    }(o), () => {
      const s = this.state;
      s.id !== Dn && wt(309, String(o.id), String(Dn)), this.state = function(i) {
        return Object.assign(i, { id: cn });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== $r && wt(310, String(n.id), String($r)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Dn });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && wt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && wt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Qn;
    }(e) || wt(313, String(e.id), String(Qn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Pr;
    }(e) || wt(314, String(e.id), String(Pr)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && wt(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && wt(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= Dn;
    }(e) || wt(316, String(e.id), String(Dn)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Cd;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= cn;
      })(e) || wt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ca = { tag: go };
function Td() {
  const t = Me();
  t.isEmpty() && t.append(xn());
}
const Sd = ae({ config: on({ setOptions: ca, updateOptions: ca }), init: ({ $initialEditorState: t = Td }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (Gl(s)) t.setEditorState(s, n);
    else if (typeof s == "function") t.update(() => {
      s(t);
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = t.parseEditorState(s);
      t.setEditorState(i, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [Ll, Va, Vl, Bl, La] }), da = Symbol.for("@lexical/extension/LexicalBuilder");
function wa() {
}
function Rd(t) {
  throw t;
}
function tr(t) {
  return Array.isArray(t) ? t : [t];
}
const Lr = "0.43.0+prod.esm";
class wn {
  constructor(e) {
    qt(this, "roots");
    qt(this, "extensionNameMap");
    qt(this, "outgoingConfigEdges");
    qt(this, "incomingEdges");
    qt(this, "conflicts");
    qt(this, "_sortedExtensionReps");
    qt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Lr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [tr(Sd)];
    for (const o of e) n.push(tr(o));
    return new wn(n);
  }
  static maybeFromEditor(e) {
    const n = e[da];
    return n && (n.PACKAGE_VERSION !== Lr && wt(292, n.PACKAGE_VERSION, Lr), n instanceof wn || wt(293)), n;
  }
  static fromEditor(e) {
    const n = wn.maybeFromEditor(e);
    return n === void 0 && wt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(ja({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [da]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = wa;
    function n() {
      try {
        e();
      } finally {
        e = wa;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = Ae(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && wt(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && wt(296);
    const n = tr(e), [o] = n;
    typeof o.name != "string" && wt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && wt(298, o.name), !a) {
      a = new Ed(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && wt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && wt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = tr(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (Cs(s)) return;
      const i = o.extension.name;
      var l;
      jr(s) || wt(300, i, a || "[unknown]"), jr(l = s) || wt(304, String(l.id), String(So)), s = Object.assign(l, { id: io }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const c of d.keys()) {
        const p = this.extensionNameMap.get(c);
        p && n(p, i);
      }
      s = _d(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) jr(o.state) && n(o);
    for (const o of e) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && wt(301, o.name);
      for (const i of a) s.configs.add(i);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const n = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], s = o.signal;
    for (const i of n) {
      const l = i.register(e, s);
      l && a.push(l);
    }
    for (const i of n) {
      const l = i.afterRegistration(e);
      l && a.push(l);
    }
    return Ae(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: m } = p;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of Nd(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && wt(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, p);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && ks(i, m.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const d = Object.keys(s).length > 0, c = a.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = s), c && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = Rd), e;
  }
}
const Id = /* @__PURE__ */ new Set(), pa = ae({ build(t, e, n) {
  const o = n.getDependency(so).output, a = Vn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ns(() => {
  }, () => ye(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let d, c = !1;
    o.value.read(() => {
      if (Xt()) for (const [p, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(p);
          continue;
        }
        const f = Ql(p), u = f && f.isSelected() || !1;
        c = c || u !== (!!i && i.has(p)), u && (d = d || /* @__PURE__ */ new Set(), d.add(p));
      }
    }), !c && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const l = xd(() => (s.value || Id).has(i)), { watchedNodeKeys: d } = a.peek();
    let c = d.get(i);
    const p = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), p || (d.set(i, c), a.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [so], name: "@lexical/extension/NodeSelection" }), Dd = Fl("INSERT_HORIZONTAL_RULE_COMMAND");
class mn extends Xr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new mn(e.__key);
  }
  static importJSON(e) {
    return Ro().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Od, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Ua(n, e.theme.hr), n;
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
function Od() {
  return { node: Ro() };
}
function Ro() {
  return Zl(mn);
}
function Md(t) {
  return t instanceof mn;
}
ae({ dependencies: [so, pa], name: "@lexical/extension/HorizontalRule", nodes: () => [mn], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(pa).output, a = Vn({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Ae(t.registerCommand(Dd, (i) => {
    const l = Xt();
    if (!xe(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = Ro();
      md(d);
    }
    return !0;
  }, bo), t.registerCommand(zl, (i) => {
    if (Kl(i.target)) {
      const l = ql(i.target);
      if (Md(l)) return function(d, c = !1) {
        const p = Xt(), m = d.isSelected(), f = d.getKey();
        let u;
        c && qa(p) ? u = p : (u = Hl(), Ul(u)), m ? u.delete(f) : u.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Ha), t.registerMutationListener(mn, (i, l) => {
    bd(() => {
      let d = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, m] of i.entries()) if (m === "destroyed") c.delete(p), d = !0;
      else {
        const f = c.get(p), u = t.getElementByKey(p);
        f ? f.domNode.value = u : (d = !0, c.set(p, { domNode: Vn(u), selectedSignal: o(p) }));
      }
      d && (a.value = { nodeSelections: c });
    });
  }), ye(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: d } of a.value.nodeSelections.values()) i.push(ye(() => {
      const c = l.value;
      c && (d.value ? Ua(c, s) : tc(c, s));
    }));
    return Ae(...i);
  }));
} });
ae({ build: (t, e) => kn({ inheritEditableFromParent: e.inheritEditableFromParent }), config: on({ $getParentEditor: function() {
  const t = Yl();
  return wn.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => ye(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
ae({ build: (t, e, n) => kn(e), config: on({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return ye(() => {
    if (!o.disabled.value) return pd(t, o.onReposition.value);
  });
} });
function Es(t) {
  return t.canBeEmpty();
}
function Ad(t, e, n = Es) {
  return Ae(t.registerCommand(ec, (o) => {
    const a = Xt();
    if (!xe(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((f) => ar(f) && f.canIndent()).length > 0) return !0;
      const l = i.anchor, d = i.focus, c = d.isBefore(l) ? d : l, p = c.getNode(), m = ud(p);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = nc();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = rc(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? oc : Jo : ac;
    return t.dispatchCommand(s, void 0);
  }, bo), t.registerCommand(Jo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Xt();
    if (!xe(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return hd((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, vo));
}
ae({ build: (t, e, n) => kn(e), config: on({ $canIndent: Es, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return ye(() => {
    if (!o.value) return Ad(t, a, s);
  });
} });
const Pd = ae({ name: "@lexical/react/ReactProvider" });
function $d() {
  return Me().getTextContent();
}
function jd(t, e = !0) {
  if (t) return !1;
  let n = $d();
  return e && (n = n.trim()), n === "";
}
function Ld(t) {
  if (!jd(t, !1)) return !1;
  const e = Me().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (sc(a)) return !1;
    if (Ie(a)) {
      if (!ic(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const d = s[o];
        if (!sr(d)) return !1;
      }
    }
  }
  return !0;
}
function Ts(t) {
  return () => Ld(t);
}
function Ss(t) {
  const e = window.location.origin, n = (o) => {
    if (o.origin !== e) return;
    const a = t.getRootElement();
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
          const d = l.args;
          if (d) {
            const [c, p, m, f, u] = d;
            t.update(() => {
              const g = Xt();
              if (xe(g)) {
                const y = g.anchor;
                let x = y.getNode(), N = 0, R = 0;
                if (sr(x) && c >= 0 && p >= 0 && (N = c, R = c + p, g.setTextNodeRange(x, N, x, R)), N === R && m === "" || (g.insertRawText(m), x = y.getNode()), sr(x)) {
                  N = f, R = f + u;
                  const I = x.getTextContentSize();
                  N = N > I ? I : N, R = R > I ? I : R, g.setTextNodeRange(x, N, x, R);
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
ae({ build: (t, e, n) => kn(e), config: on({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => ye(() => n.getOutput().disabled.value ? void 0 : Ss(t)) });
function Vd(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Io = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Bd({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = D(() => n.getDecorators());
    return Io(() => n.registerDecoratorListener((i) => {
      hc(() => {
        s(i);
      });
    }), [n]), J(() => {
      s(n.getDecorators());
    }, [n]), z(() => {
      const i = [], l = Object.keys(a);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], p = r(o, { onError: (f) => n._onError(f), children: r(Di, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(gc(p, m, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function Gd({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = wn.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Pd.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Vd(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Bd, { editor: t, ErrorBoundary: e });
}
function ua(t) {
  return t.getEditorState().read(Ts(t.isComposing()));
}
function Fd({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Te();
  return function(a) {
    Io(() => Ae(fc(a), Ss(a)), [a]);
  }(o), w(it, { children: [t, r(zd, { content: e }), r(Gd, { editor: o, ErrorBoundary: n })] });
}
function zd({ content: t }) {
  const [e] = Te(), n = function(a) {
    const [s, i] = D(() => ua(a));
    return Io(() => {
      function l() {
        const d = ua(a);
        i(d);
      }
      return l(), Ae(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = od();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Kd({ defaultSelection: t }) {
  const [e] = Te();
  return J(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const qd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Hd({ onClear: t }) {
  const [e] = Te();
  return qd(() => xs(e, t), [e, t]), null;
}
const Rs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : J;
function Ud({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: y, role: x = "textbox", spellCheck: N = !0, style: R, tabIndex: I, "data-testid": S, ...V }, k) {
  const [T, C] = D(t.isEditable()), v = G((P) => {
    P && P.ownerDocument && P.ownerDocument.defaultView ? t.setRootElement(P) : t.setRootElement(null);
  }, [t]), E = z(() => /* @__PURE__ */ function(...P) {
    return (L) => {
      for (const M of P) typeof M == "function" ? M(L) : M != null && (M.current = L);
    };
  }(k, v), [v, k]);
  return Rs(() => (C(t.isEditable()), t.registerEditableListener((P) => {
    C(P);
  })), [t]), r("div", { "aria-activedescendant": T ? e : void 0, "aria-autocomplete": T ? n : "none", "aria-controls": T ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": T && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": T ? m : void 0, "aria-readonly": !T || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: T, "data-testid": S, id: y, ref: E, role: x, spellCheck: N, style: R, tabIndex: I, ...V });
}
const Yd = zn(Ud);
function ma(t) {
  return t.getEditorState().read(Ts(t.isComposing()));
}
const Xd = zn(Wd);
function Wd(t, e) {
  const { placeholder: n, ...o } = t, [a] = Te();
  return w(it, { children: [r(Yd, { editor: a, ...o, ref: e }), n != null && r(Jd, { editor: a, content: n })] });
}
function Jd({ content: t, editor: e }) {
  const n = function(i) {
    const [l, d] = D(() => ma(i));
    return Rs(() => {
      function c() {
        const p = ma(i);
        d(p);
      }
      return c(), Ae(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = D(e.isEditable());
  if (ee(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function Zd({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Xd,
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
const Is = gr(void 0);
function Qd({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = z(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(Is.Provider, { value: i, children: s });
}
function Ds() {
  const t = mo(Is);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function tw() {
  const [t, e] = D(void 0), n = G(() => {
    e(void 0);
  }, []), o = z(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(eo, { open: !0, onOpenChange: n, children: /* @__PURE__ */ w(ir, { children: [
      /* @__PURE__ */ r(lr, { children: /* @__PURE__ */ r(cr, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = G(
    (s, i, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: i(n),
        title: s
      });
    },
    [n]
  );
  return [o, a];
}
function ew({
  children: t
}) {
  const [e] = Te(), [n, o] = D(e), [a, s] = D("paragraph"), [i, l] = tw(), d = () => {
  };
  return J(() => n.registerCommand(
    Ya,
    (c, p) => (o(p), !1),
    vo
  ), [n]), /* @__PURE__ */ w(
    Qd,
    {
      activeEditor: n,
      $updateToolbar: d,
      blockType: a,
      setBlockType: s,
      showModal: l,
      children: [
        i,
        t({ blockType: a })
      ]
    }
  );
}
function nw(t) {
  const [e] = Te(), { activeEditor: n } = Ds();
  J(() => n.registerCommand(
    Ya,
    () => {
      const o = Xt();
      return o && t(o), !1;
    },
    vo
  ), [e, t]), J(() => {
    n.getEditorState().read(() => {
      const o = Xt();
      o && t(o);
    });
  }, [n, t]);
}
const Os = He(
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
), rw = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Ja.Root,
  {
    ref: a,
    className: h(Os({ variant: e, size: n, className: t })),
    ...o
  }
));
rw.displayName = Ja.Root.displayName;
const Ms = b.createContext({
  size: "default",
  variant: "default"
}), Do = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = _t();
  return /* @__PURE__ */ r(
    vr.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        Ms.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Do.displayName = vr.Root.displayName;
const jn = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(Ms);
  return /* @__PURE__ */ r(
    vr.Item,
    {
      ref: s,
      className: h(
        Os({
          variant: i.variant || n,
          size: i.size || o
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
jn.displayName = vr.Item.displayName;
const fa = [
  { format: "bold", icon: Mi, label: "Bold" },
  { format: "italic", icon: Ai, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function ow() {
  const { activeEditor: t } = Ds(), [e, n] = D([]), o = G((a) => {
    if (xe(a) || bc(a)) {
      const s = [];
      fa.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return nw(o), /* @__PURE__ */ r(
    Do,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: fa.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        jn,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Ka, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function aw({ onClear: t }) {
  const [e] = Te();
  J(() => {
    t && t(() => {
      e.dispatchCommand(za, void 0);
    });
  }, [e, t]);
}
function sw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ w("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(ew, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(ow, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Fd,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(Zd, { placeholder: t }) }),
          ErrorBoundary: ed
        }
      ),
      e && /* @__PURE__ */ r(Kd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(aw, { onClear: n }),
      /* @__PURE__ */ r(Hd, {})
    ] })
  ] });
}
const iw = {
  namespace: "commentEditor",
  theme: Co,
  nodes: Eo,
  onError: (t) => {
    console.error(t);
  }
};
function mr({
  editorState: t,
  editorSerializedState: e,
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
        className: h(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          Xc,
          {
            initialConfig: {
              ...iw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(Pt, { children: [
              /* @__PURE__ */ r(sw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                Jc,
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
function lw(t, e) {
  const n = cc(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!Ps.has(s.nodeName)) {
    const i = $s(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Xa && i.insertAfter(Wa());
    for (const i of s) {
      const l = i.getChildren();
      for (const d of l) i.insertBefore(d);
      i.remove();
    }
  }(a), o;
}
function cw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = Me().getChildren();
  for (let a = 0; a < o.length; a++)
    As(t, o[a], n, e);
  return n.innerHTML;
}
function As(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = Ie(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && sr(e) && (i = sd(o, e, "clone"));
  const l = Ie(i) ? i.getChildren() : [], d = lc(t, i.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, i) : i.exportDOM(t);
  const { element: p, after: m } = c;
  if (!p) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], y = As(t, g, f, o);
    !a && Ie(e) && y && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Fa(p) || Zo(p)) && p.append(f), n.append(p), m) {
      const u = m.call(i, p);
      u && (Zo(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const Ps = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function $s(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Ps.has(t.nodeName)) return i;
  let l = null;
  const d = function(g, y) {
    const { nodeName: x } = g, N = y._htmlConversions.get(x.toLowerCase());
    let R = null;
    if (N !== void 0) for (const I of N) {
      const S = I(g);
      S !== null && (R === null || (R.priority || 0) <= (S.priority || 0)) && (R = S);
    }
    return R !== null ? R.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let p = null;
  if (c !== null) {
    p = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, y] of a) if (l = y(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const m = t.childNodes;
  let f = [];
  const u = (l == null || !dc(l)) && (l != null && ar(l) || o);
  for (let g = 0; g < m.length; g++) f.push(...$s(m[g], e, n, u, new Map(a), l));
  return p != null && (f = p(f)), Qo(t) && (f = dw(t, f, u ? () => {
    const g = new Xa();
    return n.push(g), g;
  } : xn)), l == null ? f.length > 0 ? i = i.concat(f) : Qo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : ta(g.nextSibling) && ta(g.previousSibling);
  }(t) && (i = i.concat(Wa())) : Ie(l) && l.append(...f), i;
}
function dw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (ar(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && ar(e[i + 1])) {
      const d = n();
      d.setFormat(o), d.append(...s), a.push(d), s = [];
    }
  }
  return a;
}
function js(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Ls(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ls(e.children)
  ) : !1;
}
function ie(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ls(t.root.children) : !1;
}
function ww(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Za({
    namespace: "EditorUtils",
    theme: Co,
    nodes: Eo,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = lw(e, a);
      Me().clear(), wc(s);
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
function fr(t) {
  const e = Za({
    namespace: "EditorUtils",
    theme: Co,
    nodes: Eo,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = cw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Oo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function or(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Mo(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const pw = {
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
function Vr(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function mm({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = D(pw), [i, l] = D(void 0), [d, c] = D(!1), p = q(void 0), m = q(null);
  J(() => {
    let N = !0;
    const R = m.current;
    if (!R) return;
    const I = setTimeout(() => {
      N && js(R);
    }, 300);
    return () => {
      N = !1, clearTimeout(I);
    };
  }, []);
  const f = G(() => {
    if (!ie(a)) return;
    const N = fr(a);
    e(N, i);
  }, [a, e, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", y = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: x }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
          /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(bn, {}) }) }),
          /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: y }) })
        ] }) }),
        /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
          /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !ie(a),
              children: /* @__PURE__ */ r(Yt, {})
            }
          ) }),
          /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Ee, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Sa, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Vr(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        ue,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Ce, { children: t.map((N) => /* @__PURE__ */ r(
            pe,
            {
              onSelect: () => {
                l(N === "" ? void 0 : N), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Vr(N, o) })
            },
            N || "unassigned"
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
        onKeyDownCapture: (N) => {
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : Mo(N) && (N.preventDefault(), N.stopPropagation(), ie(a) && f());
        },
        onKeyDown: (N) => {
          Oo(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          mr,
          {
            editorSerializedState: a,
            onSerializedChange: (N) => s(N),
            placeholder: u,
            onClear: (N) => {
              p.current = N;
            }
          }
        )
      }
    )
  ] });
}
const fm = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), hm = [
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
], uw = ["input", "select", "textarea", "button"], mw = ["button", "textbox"], fw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = q(null), [s, i] = D(void 0), [l, d] = D(void 0), c = G(
    (u) => {
      i(u);
      const g = t.find((x) => x.id === u);
      g && (e == null || e(g));
      const y = document.getElementById(u);
      y && (y.scrollIntoView({ block: "center" }), y.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), p = G(
    (u) => {
      const g = t.find((y) => y.id === u);
      g && (d((y) => y === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || uw.includes(g)) return !0;
    const y = u.getAttribute("role");
    if (y && mw.includes(y)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, f = G(
    (u) => {
      var T;
      const g = u.target, y = (C) => C ? document.getElementById(C) : void 0, x = y(l), N = y(s);
      if (!!(x && g && x.contains(g) && g !== x) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const C = t.find((v) => v.id === l);
            C && c(C.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const C = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const v = C.findIndex((P) => P === g);
          if (v === -1) return;
          let E;
          u.key === "ArrowDown" ? E = Math.min(v + 1, C.length - 1) : E = Math.max(v - 1, 0), E !== v && (u.preventDefault(), u.stopPropagation(), (T = C[E]) == null || T.focus());
          return;
        }
        return;
      }
      const S = t.findIndex((C) => C.id === s);
      let V = S;
      switch (u.key) {
        case "ArrowDown":
          V = Math.min(S + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          V = Math.max(S - 1, 0), u.preventDefault();
          break;
        case "Home":
          V = 0, u.preventDefault();
          break;
        case "End":
          V = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const C = N;
          if (C) {
            const v = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), E = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), P = v ?? E;
            if (P) {
              u.preventDefault(), P.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const k = t[V];
      k && c(k.id);
    },
    [t, c, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: c
  };
}, hw = He(
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
), Ne = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", hw({ variant: e }), t), ...n })
);
Ne.displayName = "Badge";
const Vs = b.forwardRef(
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
Vs.displayName = "Card";
const gw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
gw.displayName = "CardHeader";
const bw = b.forwardRef(
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
bw.displayName = "CardTitle";
const vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
vw.displayName = "CardDescription";
const Bs = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Bs.displayName = "CardContent";
const xw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
xw.displayName = "CardFooter";
const fn = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Qa.Root,
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
fn.displayName = Qa.Root.displayName;
const Gs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yn.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Gs.displayName = yn.Root.displayName;
const yw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yn.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
yw.displayName = yn.Image.displayName;
const Fs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yn.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Fs.displayName = yn.Fallback.displayName;
const Ao = gr(void 0);
function me() {
  const t = mo(Ao);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Le = He("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Pe = mt.Trigger, zs = mt.Group, Nw = mt.Portal, kw = mt.Sub, _w = mt.RadioGroup;
function ke({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Ao.Provider, { value: n, children: /* @__PURE__ */ r(mt.Root, { ...e }) });
}
const Ks = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = me();
  return /* @__PURE__ */ w(
    mt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        Le({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(pn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ks.displayName = mt.SubTrigger.displayName;
const qs = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = _t();
  return /* @__PURE__ */ r(
    mt.SubContent,
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
qs.displayName = mt.SubContent.displayName;
const de = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = _t();
  return /* @__PURE__ */ r(mt.Portal, { children: /* @__PURE__ */ r(
    mt.Content,
    {
      ref: a,
      sideOffset: e,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
de.displayName = mt.Content.displayName;
const Ke = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = _t(), s = me();
  return /* @__PURE__ */ r(
    mt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        Le({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Ke.displayName = mt.Item.displayName;
const le = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = _t(), i = me();
  return /* @__PURE__ */ w(
    mt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Le({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
le.displayName = mt.CheckboxItem.displayName;
const Hs = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = _t(), s = me();
  return /* @__PURE__ */ w(
    mt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Le({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Hs.displayName = mt.RadioItem.displayName;
const qe = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  mt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
qe.displayName = mt.Label.displayName;
const $e = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
$e.displayName = mt.Separator.displayName;
function Cw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Cw.displayName = "DropdownMenuShortcut";
function ha({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [d, c] = D(!1), [p, m] = D(), f = q(null);
  J(() => {
    if (!d) return;
    let S = !0;
    const V = f.current;
    if (!V) return;
    const k = setTimeout(() => {
      S && js(V);
    }, 300);
    return () => {
      S = !1, clearTimeout(k);
    };
  }, [d]);
  const u = G(
    (S) => {
      S && S.stopPropagation(), c(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = G(
    async (S) => {
      if (S && S.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        fr(p)
      ) && (c(!1), m(void 0), i == null || i(!1));
    },
    [p, a, t.id, i]
  ), y = z(() => {
    const S = new Date(t.date), V = ml(
      S,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), k = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Qe(n["%comment_dateAtTime%"], {
      date: V,
      time: k
    });
  }, [t.date, n]), x = z(() => t.user, [t.user]), N = z(
    () => t.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = z(() => fl(t.contents), [t.contents]), I = z(() => {
    if (o && l)
      return /* @__PURE__ */ w(it, { children: [
        /* @__PURE__ */ w(
          Ke,
          {
            onClick: (S) => {
              S.stopPropagation(), c(!0), m(ww(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(Pi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          Ke,
          {
            onClick: async (S) => {
              S.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r($i, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
    i
  ]);
  return /* @__PURE__ */ w(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(Gs, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Fs, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: y }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ne, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              or(t.assignedUser, n)
            ] })
          ] }),
          d && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (S) => {
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), u()) : Mo(S) && (S.preventDefault(), S.stopPropagation(), ie(p) && g());
              },
              onKeyDown: (S) => {
                Oo(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              },
              onClick: (S) => {
                S.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  mr,
                  {
                    className: h(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: p,
                    onSerializedChange: (S) => m(S)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(bn, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !ie(p),
                      children: /* @__PURE__ */ r(Ra, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(it, { children: [
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
                dangerouslySetInnerHTML: { __html: R }
              }
            )
          ] })
        ] }),
        I && /* @__PURE__ */ w(ke, { children: [
          /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(ji, {}) }) }),
          /* @__PURE__ */ r(de, { align: "end", children: I })
        ] })
      ]
    }
  );
}
const ga = {
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
function Ew({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: d,
  thread: c,
  threadStatus: p,
  handleAddCommentToThread: m,
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: y,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: R,
  canUserEditOrDeleteCommentCallback: I,
  isRead: S = !1,
  autoReadDelay: V = 5,
  onVerseRefClick: k
}) {
  const [T, C] = D(ga), [v, E] = D(
    void 0
  ), P = o, [L, M] = D(!1), [$, H] = D(!1), [Y, tt] = D(!1), [St, Gt] = D(!1), [jt, lt] = D(!1), [gt, K] = D(S), [nt, ct] = D(!1), rt = q(void 0), [at, Ft] = D(/* @__PURE__ */ new Map());
  J(() => {
    let O = !0;
    return (async () => {
      const ut = R ? await R(d) : !1;
      O && lt(ut);
    })(), () => {
      O = !1;
    };
  }, [d, R]), J(() => {
    let O = !0;
    if (!o) {
      Gt(!1), Ft(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ut = N ? await N(d) : !1;
      O && Gt(ut);
    })(), () => {
      O = !1;
    };
  }, [o, d, N]);
  const Dt = z(() => e.filter((O) => !O.deleted), [e]);
  J(() => {
    let O = !0;
    if (!o || !I) {
      Ft(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ut = /* @__PURE__ */ new Map();
      await Promise.all(
        Dt.map(async (Ve) => {
          const Ue = await I(Ve.id);
          O && ut.set(Ve.id, Ue);
        })
      ), O && Ft(ut);
    })(), () => {
      O = !1;
    };
  }, [o, Dt, I]);
  const zt = z(() => Dt[0], [Dt]), fe = q(null), A = q(void 0), Zt = G(() => {
    var O;
    (O = A.current) == null || O.call(A), C(ga);
  }, []), he = G(() => {
    const O = !gt;
    K(O), ct(!O), g == null || g(d, O);
  }, [gt, g, d]);
  J(() => {
    M(!1);
  }, [o]), J(() => {
    if (o && !gt && !nt) {
      const O = setTimeout(() => {
        K(!0), g == null || g(d, !0);
      }, V * 1e3);
      return rt.current = O, () => clearTimeout(O);
    }
    rt.current && (clearTimeout(rt.current), rt.current = void 0);
  }, [o, gt, nt, V, d, g]);
  const Ot = z(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), B = z(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const O = or(s, n);
    return Qe(n["%comment_assigned_to%"], {
      assignedUser: O
    });
  }, [s, n]), X = z(() => Dt.slice(1), [Dt]), et = z(() => X.length ?? 0, [X.length]), dt = z(() => et > 0, [et]), xt = z(() => L || et <= 2 ? X : X.slice(-2), [X, et, L]), yt = z(() => L || et <= 2 ? 0 : et - 2, [et, L]), Rt = z(
    () => et === 1 ? Ot.singleReply : Qe(Ot.multipleReplies, { count: et }),
    [et, Ot]
  ), bt = z(
    () => yt === 1 ? Ot.singleReply : Qe(Ot.multipleReplies, { count: yt }),
    [yt, Ot]
  );
  J(() => {
    !o && $ && dt && H(!1);
  }, [o, $, dt]);
  const Ct = G(
    async (O) => {
      O && O.stopPropagation();
      const Nt = ie(T) ? fr(T) : void 0;
      if (v !== void 0) {
        await m({
          threadId: d,
          contents: Nt,
          assignedUser: v
        }) && (E(void 0), Nt && Zt());
        return;
      }
      Nt && await m({ threadId: d, contents: Nt }) && Zt();
    },
    [
      Zt,
      T,
      m,
      v,
      d
    ]
  ), Lt = G(
    async (O) => {
      const Nt = ie(T) ? fr(T) : void 0, ut = await m({
        ...O,
        contents: Nt,
        assignedUser: v ?? O.assignedUser
      });
      return ut && Nt && Zt(), ut && v !== void 0 && E(void 0), ut;
    },
    [Zt, T, m, v]
  );
  if (zt)
    return /* @__PURE__ */ r(
      Vs,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: h(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && p !== "Resolved" && gt,
            "tw-bg-background": o && p !== "Resolved" && gt,
            "tw-bg-muted": p === "Resolved",
            "tw-bg-accent": !gt && !o && p !== "Resolved"
          }
        ),
        onClick: () => {
          l(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ w(Bs, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              B && /* @__PURE__ */ r(Ne, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: B }),
              /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (O) => {
                    O.stopPropagation(), he();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": gt ? "Mark as unread" : "Mark as read",
                  children: gt ? /* @__PURE__ */ r(Li, {}) : /* @__PURE__ */ r(Vi, {})
                }
              ),
              jt && p !== "Resolved" && /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (O) => {
                    O.stopPropagation(), Lt({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ w(
              "p",
              {
                ref: fe,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": P
                  },
                  { "tw-whitespace-nowrap": !P }
                ),
                children: [
                  a && k ? /* @__PURE__ */ r(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (O) => {
                        O.stopPropagation(), k(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ w("span", { className: t, children: [
                    zt.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: zt.selectedText }),
                    zt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              ha,
              {
                comment: zt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: p,
                handleAddCommentToThread: Lt,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: H,
                canEditOrDelete: (!$ && at.get(zt.id)) ?? !1,
                canUserResolveThread: jt
              }
            )
          ] }),
          /* @__PURE__ */ w(it, { children: [
            dt && !o && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(fn, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Rt })
            ] }),
            !o && ie(T) && /* @__PURE__ */ r(
              mr,
              {
                editorSerializedState: T,
                onSerializedChange: (O) => C(O),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ w(it, { children: [
              yt > 0 && /* @__PURE__ */ w(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (O) => {
                    O.stopPropagation(), M(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (O) => {
                    (O.key === "Enter" || O.key === " ") && (O.preventDefault(), O.stopPropagation(), M(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(fn, {}) }),
                    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: bt }),
                      L ? /* @__PURE__ */ r(Ia, {}) : /* @__PURE__ */ r(Oe, {})
                    ] })
                  ]
                }
              ),
              xt.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                ha,
                {
                  comment: O,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: H,
                  canEditOrDelete: (!$ && at.get(O.id)) ?? !1
                }
              ) }, O.id)),
              x !== !1 && (!$ || ie(T)) && /* @__PURE__ */ w(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (O) => O.stopPropagation(),
                  onKeyDownCapture: (O) => {
                    Mo(O) && (O.preventDefault(), O.stopPropagation(), (ie(T) || v !== void 0) && Ct());
                  },
                  onKeyDown: (O) => {
                    Oo(O), (O.key === "Enter" || O.key === " ") && O.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      mr,
                      {
                        editorSerializedState: T,
                        onSerializedChange: (O) => C(O),
                        placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (O) => {
                          A.current = O;
                        }
                      }
                    ),
                    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      v !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: Qe(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: or(
                            v,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ w(Ee, { open: Y, onOpenChange: tt, children: [
                        /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ r(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !St || !y || y.length === 0 || !y.includes(i),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(Sa, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          ue,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (O) => {
                              O.key === "Escape" && (O.stopPropagation(), tt(!1));
                            },
                            children: /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Ce, { children: y == null ? void 0 : y.map((O) => /* @__PURE__ */ r(
                              pe,
                              {
                                onSelect: () => {
                                  E(O !== s ? O : void 0), tt(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: or(O, n) })
                              },
                              O || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          onClick: Ct,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !ie(T) && v === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(Ra, {})
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
function gm({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: c,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: y,
  onVerseRefClick: x
}) {
  const [N, R] = D(/* @__PURE__ */ new Set()), [I, S] = D();
  J(() => {
    g && (R((M) => new Set(M).add(g)), S(g));
  }, [g]);
  const V = n.filter(
    (M) => M.comments.some(($) => !$.deleted)
  ), k = V.map((M) => ({ id: M.id })), T = G(
    (M) => {
      R(($) => new Set($).add(M.id)), S(M.id), y == null || y(M.id);
    },
    [y]
  ), C = G(
    (M) => {
      const $ = N.has(M);
      R((H) => {
        const Y = new Set(H);
        return Y.has(M) ? Y.delete(M) : Y.add(M), Y;
      }), S(M), y == null || y($ ? void 0 : M);
    },
    [N, y]
  ), { listboxRef: v, activeId: E, handleKeyDown: P } = fw({
    options: k,
    onOptionSelect: T
  }), L = G(
    (M) => {
      M.key === "Escape" ? (I && N.has(I) && (R(($) => {
        const H = new Set($);
        return H.delete(I), H;
      }), S(void 0), y == null || y(void 0)), M.preventDefault(), M.stopPropagation()) : P(M);
    },
    [I, N, P, y]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: v,
      "aria-activedescendant": E ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: L,
      children: V.map((M) => /* @__PURE__ */ r(
        "div",
        {
          className: h({
            "tw-opacity-60": M.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Ew,
            {
              classNameForVerseText: e,
              comments: M.comments,
              localizedStrings: a,
              verseRef: M.verseRef,
              handleSelectThread: C,
              threadId: M.id,
              thread: M,
              isRead: M.isRead,
              isSelected: N.has(M.id),
              currentUser: o,
              assignedUser: M.assignedUser,
              threadStatus: M.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: x
            }
          )
        },
        M.id
      ))
    }
  );
}
function Tw({ table: t }) {
  return /* @__PURE__ */ w(ke, { children: [
    /* @__PURE__ */ r(vc, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Bi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(de, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(qe, { children: "Toggle columns" }),
      /* @__PURE__ */ r($e, {}),
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
const hn = kt.Root, Sw = kt.Group, gn = kt.Value, Rw = He(
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
), nn = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = _t();
  return /* @__PURE__ */ w(
    kt.Trigger,
    {
      className: h(Rw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(kt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
nn.displayName = kt.Trigger.displayName;
const Us = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ia, { className: "tw-h-4 tw-w-4" })
  }
));
Us.displayName = kt.ScrollUpButton.displayName;
const Ys = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4" })
  }
));
Ys.displayName = kt.ScrollDownButton.displayName;
const rn = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = _t();
  return /* @__PURE__ */ r(kt.Portal, { children: /* @__PURE__ */ w(
    kt.Content,
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
        /* @__PURE__ */ r(Us, {}),
        /* @__PURE__ */ r(
          kt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Ys, {})
      ]
    }
  ) });
});
rn.displayName = kt.Content.displayName;
const Iw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Iw.displayName = kt.Label.displayName;
const oe = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  kt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(kt.ItemIndicator, { children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(kt.ItemText, { children: e })
    ]
  }
));
oe.displayName = kt.Item.displayName;
const Dw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Dw.displayName = kt.Separator.displayName;
function Ow({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ w(
        hn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(nn, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(gn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(rn, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(oe, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Gi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Fi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(zi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Ki, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ba = `
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
function Mw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Bn(t, e) {
  const n = e ? `${ba}, ${e}` : ba;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Mw(o)
  );
}
const Nr = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Bn(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(i, {
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
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Bn(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: h("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
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
Nr.displayName = "Table";
const kr = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
kr.displayName = "TableHeader";
const _r = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
_r.displayName = "TableBody";
const Aw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Aw.displayName = "TableFooter";
function Pw(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? Bn(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function $w(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function jw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Se = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Pw(i);
  const l = b.useMemo(
    () => i.current ? Bn(i.current) : [],
    [i]
  ), d = b.useCallback(
    (p) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Bn(f).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), y = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), jw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), $w(l, y, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const x = m.closest("table");
        x && x.focus();
      }
      e == null || e(p);
    },
    [i, l, e]
  ), c = b.useCallback(
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
      onKeyDown: d,
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
Se.displayName = "TableRow";
const Gn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Gn.displayName = "TableHead";
const tn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
tn.displayName = "TableCell";
const Lw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Lw.displayName = "TableCaption";
function lo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Vw({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: d = !1,
  noResultsMessage: c
}) {
  var k;
  const [p, m] = D([]), [f, u] = D([]), [g, y] = D({}), [x, N] = D({}), R = z(() => e ?? [], [e]), I = ts({
    data: R,
    columns: t,
    getCoreRowModel: ns(),
    ...n && { getPaginationRowModel: yc() },
    onSortingChange: m,
    getSortedRowModel: es(),
    onColumnFiltersChange: u,
    getFilteredRowModel: xc(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: N,
    state: {
      sorting: p,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: x
    }
  }), S = I.getVisibleFlatColumns();
  let V;
  return d ? V = Array.from({ length: 10 }).map((v, E) => `skeleton-row-${E}`).map((v) => /* @__PURE__ */ r(Se, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(tn, { colSpan: S.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(lo, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, v)) : ((k = I.getRowModel().rows) == null ? void 0 : k.length) > 0 ? V = I.getRowModel().rows.map((T) => /* @__PURE__ */ r(
    Se,
    {
      onClick: () => i(T, I),
      "data-state": T.getIsSelected() && "selected",
      children: T.getVisibleCells().map((C) => /* @__PURE__ */ r(tn, { children: Pn(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    T.id
  )) : V = /* @__PURE__ */ r(Se, { children: /* @__PURE__ */ r(tn, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Tw, { table: I }),
    /* @__PURE__ */ w(Nr, { stickyHeader: s, children: [
      /* @__PURE__ */ r(kr, { stickyHeader: s, children: I.getHeaderGroups().map((T) => /* @__PURE__ */ r(Se, { children: T.headers.map((C) => /* @__PURE__ */ r(Gn, { className: "tw-p-0", children: C.isPlaceholder ? void 0 : Pn(C.column.columnDef.header, C.getContext()) }, C.id)) }, T.id)) }),
      /* @__PURE__ */ r(_r, { children: V })
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => I.previousPage(),
          disabled: !I.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => I.nextPage(),
          disabled: !I.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Ow, { table: I })
  ] });
}
function bm({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = z(
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
      children: /* @__PURE__ */ r(_c, { options: s, children: e })
    }
  );
}
const Bw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), va = (t, e) => t[e] ?? e;
function Gw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = va(n, "%webView_error_dump_header%"), s = va(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ w(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ w("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ w("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Da, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const vm = Object.freeze([
  ...Bw,
  "%webView_error_dump_copied_message%"
]);
function xm({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = D(!1), d = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ w(Ee, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: o }),
    /* @__PURE__ */ w(ue, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(Tt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Gw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Fw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Fw || {});
function ym({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = D({}), l = (c, p) => {
    const m = !o[c][p];
    a((u) => (u[c][p] = m, { ...u }));
    const f = n[c].items[p];
    f.onUpdate(f.id, m);
  }, d = (c, p) => {
    i((f) => (f[c] = p, { ...f }));
    const m = n[c].items.find((f) => f.id === p);
    m ? m.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(ke, { children: [
    /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "default", children: [
      /* @__PURE__ */ r(Oa, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Oe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(de, { children: n.map((c, p) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r(qe, { children: c.label }),
      /* @__PURE__ */ r(zs, { children: c.itemType === 0 ? /* @__PURE__ */ r(it, { children: c.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        le,
        {
          checked: o[p][f],
          onCheckedChange: () => l(p, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        _w,
        {
          value: s[p],
          onValueChange: (m) => d(p, m),
          children: c.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Hs, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r($e, {})
    ] }, c.label)) })
  ] }) });
}
function Nm({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const d = new hl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, m) => p + m, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        e && /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(qi, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ w(
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
        (a || i) && /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            F,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Hi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Ui, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function zw({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), p = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ w("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ w("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ w("div", { children: [
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
function km({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = z(() => gl(n), [n]), d = ((c) => {
    const p = new Intl.DisplayNames(bl(), { type: "language" });
    return c.map((m) => p.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(zw, { versionHistory: a }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Kw({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: m = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: y = "ghost",
  id: x
}) {
  const [N, R] = D(!1), I = G(
    (E) => {
      var L;
      const P = (L = t.find((M) => M.label === E)) == null ? void 0 : L.value;
      P && n(
        e.includes(P) ? e.filter((M) => M !== P) : [...e, P]
      );
    },
    [t, e, n]
  ), S = () => d || o, V = z(() => {
    if (!f) return t;
    const E = t.filter((L) => L.starred).sort((L, M) => L.label.localeCompare(M.label)), P = t.filter((L) => !L.starred).sort((L, M) => {
      const $ = e.includes(L.value), H = e.includes(M.value);
      return $ && !H ? -1 : !$ && H ? 1 : L.label.localeCompare(M.label);
    });
    return [...E, ...P];
  }, [t, e, f]), k = () => {
    n(t.map((E) => E.value));
  }, T = () => {
    n([]);
  }, C = c ?? N;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ w(Ee, { open: C, onOpenChange: p ?? R, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": C,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ r(ho, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ue, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(_e, { children: [
      /* @__PURE__ */ r(an, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: k, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: T, children: i })
      ] }),
      /* @__PURE__ */ w(Ce, { children: [
        /* @__PURE__ */ r(Nn, { children: l }),
        /* @__PURE__ */ r(ce, { children: V.map((E) => /* @__PURE__ */ w(
          pe,
          {
            value: E.label,
            onSelect: I,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Yt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(E.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              E.starred && /* @__PURE__ */ r(Yi, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: E.label }),
              E.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: E.secondaryLabel })
            ]
          },
          E.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function _m({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: d,
  className: c,
  badgesPlaceholder: p,
  id: m
}) {
  return /* @__PURE__ */ w("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Kw,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: d,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((f) => {
      var u;
      return /* @__PURE__ */ w(Ne, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ r(bn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(Tt, { children: p })
  ] });
}
const qw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), xa = (t, e) => t[e] ?? e;
function Hw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const d = z(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ w(it, { children: [
    /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Xi, {})
        }
      ) }),
      /* @__PURE__ */ r($t, { children: /* @__PURE__ */ w("p", { children: [
        xa(a, "%undoButton_tooltip%"),
        s && ` (${d ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(Wi, {})
        }
      ) }),
      /* @__PURE__ */ r($t, { children: /* @__PURE__ */ w("p", { children: [
        xa(a, "%redoButton_tooltip%"),
        s && ` (${d ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Uw({ children: t, editorRef: e }) {
  const n = q(null);
  return J(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, p, m, f;
      if (!a || document.activeElement !== a) return;
      const d = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && d === "z" && (l.preventDefault(), (p = e.current) == null || p.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (d === "y" || l.shiftKey && d === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const _n = b.forwardRef(
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
_n.displayName = "Input";
const Yw = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Xw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = q(null), i = q(null), l = q(!1), [d, c] = D(t), [p, m] = D(n), [f, u] = D(!1);
  J(() => {
    c(t);
  }, [t]), J(() => {
    p !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (d !== "custom" || p ? (e(d), o(p)) : (c(t), m(n)));
  }, y = (x) => {
    var N, R, I, S;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((R = i.current) == null || R.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((I = s.current) == null ? void 0 : I.selectionStart) === 0 && ((S = i.current) == null || S.focus(), l.current = !1), d === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ w(ke, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Yw(t, a, n) }) }) }),
      /* @__PURE__ */ r($t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      de,
      {
        style: { zIndex: rs },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: y,
        onMouseMove: () => {
          var x;
          l.current && ((x = s.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ r(qe, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r($e, {}),
          /* @__PURE__ */ r(
            le,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Wr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Jr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
            {
              ref: i,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (x) => {
                var N;
                x.stopPropagation(), l.current = !0, (N = s.current) == null || N.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  _n,
                  {
                    tabIndex: 0,
                    onMouseDown: (x) => {
                      x.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
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
const Ww = (t, e) => t === "f" ? /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r(Aa, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r(Pa, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(it, { children: [
  /* @__PURE__ */ r(Ma, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Jw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), Qe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Zw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(ke, { children: [
    /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(pc, { asChild: !0, children: /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Ww(t, n) }) }) }),
      /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: Jw(t, n) }) })
    ] }) }),
    /* @__PURE__ */ w(de, { style: { zIndex: rs }, children: [
      /* @__PURE__ */ r(qe, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r($e, {}),
      /* @__PURE__ */ w(
        le,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Ma, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        le,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Aa, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        le,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Pa, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Qw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function tp({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ji, { className: e, size: 16 });
}
function ya({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ w(
    pe,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(tp, { icon: t.icon }) }) }),
        /* @__PURE__ */ w("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(as, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ep({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = D(""), [s, i] = z(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const d = e.filter(
      (p) => {
        var m;
        return (m = p.marker) == null ? void 0 : m.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (p) => p.title.toLowerCase().includes(l) && !d.includes(p)
    );
    return [d, c];
  }, [o, e]);
  return /* @__PURE__ */ w(_e, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      an,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(Ce, { children: [
      /* @__PURE__ */ r(Nn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(ce, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ r(
          ya,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ w(it, { children: [
        s.length > 0 && /* @__PURE__ */ r(xr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(ce, { children: i.map((l) => {
          var d;
          return /* @__PURE__ */ r(
            ya,
            {
              item: l,
              localizedStrings: t
            },
            `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function np(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = er[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[er[l].description] ?? er[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function rp(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function op(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ap = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Cm({
  classNameForEditor: t,
  noteOps: e,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: c
}) {
  const p = q(null), m = q(null), f = q(null), u = q(null);
  ee(() => {
    if (!u.current) return;
    const { width: B } = u.current.getBoundingClientRect();
    B > 0 && (u.current.style.width = `${B}px`);
  }, []);
  const [g, y] = D("generated"), [x, N] = D("*"), [R, I] = D("f"), [S, V] = D(!1), [k, T] = D(!0), [C, v] = D(!1), E = q(!1), P = q(""), [L, M] = D(!1), [$, H] = D(), [Y, tt] = D(), [St, Gt] = D(), [jt, lt] = D(), gt = q(null), K = z(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? Cc(), noteMode: "expanded" }
    }),
    [i, l]
  ), nt = z(
    () => np(
      p,
      () => M(!1),
      d,
      jt
    ),
    [d, jt]
  );
  J(() => {
    var B;
    L || (B = p.current) == null || B.focus();
  }, [R, L]), J(() => {
    var et, dt;
    let B;
    E.current = !1, T(!0);
    const X = e == null ? void 0 : e.at(0);
    if (X && Jn("note", X)) {
      const xt = (et = X.insert.note) == null ? void 0 : et.caller;
      let yt = "custom";
      xt === Wr ? yt = "generated" : xt === Jr ? yt = "hidden" : xt && N(xt), y(yt), I(((dt = X.insert.note) == null ? void 0 : dt.style) ?? "f"), B = setTimeout(() => {
        var Rt;
        (Rt = p.current) == null || Rt.applyUpdate([X]);
      }, 0);
    }
    return () => {
      B && clearTimeout(B);
    };
  }, [e, s]);
  const ct = G(
    (B, X, et = !1) => {
      var xt, yt, Rt;
      const dt = (yt = (xt = p.current) == null ? void 0 : xt.getNoteOps(0)) == null ? void 0 : yt.at(0);
      if (dt && Jn("note", dt)) {
        if (dt.insert.note) {
          let bt;
          B === "custom" ? bt = X : B === "generated" ? bt = Wr : bt = Jr, dt.insert.note.caller = bt;
        }
        n == null || n([dt]), et && c && s && ((Rt = c.current) == null || Rt.replaceEmbedUpdate(s, [dt]));
      }
    },
    [s, n, c]
  ), rt = G(() => {
    ct(g, x, !0), o();
  }, [g, x, o, ct]), at = q(rt);
  ee(() => {
    at.current = rt;
  });
  const Ft = q({ book: a.book, chapterNum: a.chapterNum });
  ee(() => {
    (Ft.current.book !== a.book || Ft.current.chapterNum !== a.chapterNum) && (Ft.current = { book: a.book, chapterNum: a.chapterNum }, at.current());
  }, [a.book, a.chapterNum]);
  const Dt = () => {
    var X;
    const B = (X = m.current) == null ? void 0 : X.getElementsByClassName("editor-input")[0];
    B != null && B.textContent && navigator.clipboard.writeText(B.textContent);
  }, zt = G(
    (B) => {
      y(B), ct(B, x);
    },
    [x, ct]
  ), fe = G(
    (B) => {
      N(B), ct(g, B);
    },
    [g, ct]
  ), A = (B) => {
    var et, dt, xt, yt, Rt;
    I(B);
    const X = (dt = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : dt.at(0);
    if (X && Jn("note", X)) {
      X.insert.note && (X.insert.note.style = B);
      const bt = (yt = (xt = X.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : yt.ops;
      R !== "x" && B === "x" ? bt == null || bt.forEach((Ct) => rp(Ct)) : R === "x" && B !== "x" && (bt == null || bt.forEach((Ct) => op(Ct))), (Rt = p.current) == null || Rt.applyUpdate([X, { delete: 1 }]);
    }
  }, Zt = (B) => {
    lt(B.contextMarker), v(B.canRedo);
  }, he = G(
    (B) => {
      var et, dt, xt, yt, Rt;
      const X = (dt = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : dt.at(0);
      if (X && Jn("note", X)) {
        B.content.length > 1 && setTimeout(() => {
          var Lt;
          (Lt = p.current) == null || Lt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const bt = (xt = X.insert.note) == null ? void 0 : xt.style, Ct = (Rt = (yt = X.insert.note) == null ? void 0 : yt.contents) == null ? void 0 : Rt.ops;
        if (bt || V(!1), V(
          bt === "x" ? !!(Ct != null && Ct.every((Lt) => {
            var Nt, ut;
            if (!((Nt = Lt.attributes) != null && Nt.char)) return !0;
            const O = ((ut = Lt.attributes) == null ? void 0 : ut.char).style;
            return O === "xt" || O === "xo" || O === "xq";
          })) : !!(Ct != null && Ct.every((Lt) => {
            var Nt, ut;
            if (!((Nt = Lt.attributes) != null && Nt.char)) return !0;
            const O = ((ut = Lt.attributes) == null ? void 0 : ut.char).style;
            return O === "ft" || O === "fr" || O === "fq";
          }))
        ), !E.current) {
          E.current = !0, P.current = JSON.stringify(X), T(!0);
          return;
        }
        T(JSON.stringify(X) === P.current), ct(g, x);
      } else
        V(!1), T(!0);
    },
    [g, x, ct]
  ), Ot = G(() => {
    const B = window.getSelection();
    if (f.current && nt.length && B && B.rangeCount > 0) {
      const X = B.getRangeAt(0).getBoundingClientRect(), et = f.current.getBoundingClientRect();
      H(X.left - et.left), tt(X.top - et.top), Gt(X.height), M(!0);
    }
  }, [nt, f]);
  return J(() => {
    const B = () => {
      L && M(!1);
    };
    return window.addEventListener("click", B), () => {
      window.removeEventListener("click", B);
    };
  }, [L]), J(() => {
    var B;
    L && ((B = gt.current) == null || B.focus());
  }, [L]), J(() => {
    var et;
    const B = ((et = m.current) == null ? void 0 : et.querySelector(".editor-input")) ?? void 0, X = (dt) => {
      !L && B && document.activeElement === B && dt.key === l ? (dt.preventDefault(), Ot()) : L && dt.key === "Escape" && (dt.preventDefault(), M(!1));
    };
    return document.addEventListener("keydown", X), () => {
      document.removeEventListener("keydown", X);
    };
  }, [L, Ot, l]), /* @__PURE__ */ w(it, { children: [
    /* @__PURE__ */ w("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            Zw,
            {
              isTypeSwitchable: S,
              noteType: R,
              handleNoteTypeChange: A,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
            Xw,
            {
              callerType: g,
              updateCallerType: zt,
              customCaller: x,
              updateCustomCaller: fe,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Hw,
            {
              onUndoClick: () => {
                var B;
                return (B = p.current) == null ? void 0 : B.undo();
              },
              onRedoClick: () => {
                var B;
                return (B = p.current) == null ? void 0 : B.redo();
              },
              canUndo: !k,
              canRedo: C,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
            /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: rt,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Yt, {})
              }
            ) }),
            /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
            /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(bn, {}) }) }),
            /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Uw, { editorRef: p, children: /* @__PURE__ */ r(
              Ec,
              {
                options: K,
                onStateChange: Zt,
                onUsjChange: he,
                defaultUsj: ap,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: p
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
              /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: Dt,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Da, {})
                }
              ) }),
              /* @__PURE__ */ r($t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ w(Ee, { open: L, children: [
      /* @__PURE__ */ r(
        jc,
        {
          className: "tw-absolute",
          style: {
            top: Y,
            left: $,
            height: St,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        ue,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (B) => {
            B.preventDefault(), B.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            ep,
            {
              markerMenuItems: nt,
              localizedStrings: d,
              searchRef: gt
            }
          )
        }
      )
    ] })
  ] });
}
const Em = Object.freeze([
  ...Qw,
  ...Object.entries(er).map(([, t]) => t.description).filter((t) => !!t),
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
  ...qw
]);
function Xs(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function sp(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, d) => {
    const c = d === s.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Po(t, l, n, !0, a),
      c && o
    ] }, Xs(t, l));
  });
}
function Po(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ w(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Ur, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Ur, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return ip(
        s,
        Xs(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function ip(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ w("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Ur,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Po(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function lp({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...l] = t.content);
  const d = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ w("span", { className: h("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ w(it, { children: [
    Po(t.marker, [i], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", y = h(f, u);
  return /* @__PURE__ */ w(it, { children: [
    /* @__PURE__ */ w("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: [
      d,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          y
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(it, { children: sp(t.marker, l, o, c) })
      }
    )
  ] });
}
function Tm({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: c
}) {
  const p = d ?? vl(n, void 0), m = (R, I) => {
    c == null || c(R, I, a);
  }, f = s ? n.findIndex((R) => R === s) : -1, [u, g] = D(f), y = (R, I, S) => {
    if (n.length)
      switch (R.key) {
        case "Enter":
        case " ":
          R.preventDefault(), c == null || c(I, S, a);
          break;
      }
  }, x = (R) => {
    if (n.length)
      switch (R.key) {
        case "ArrowDown":
          R.preventDefault(), g((I) => Math.min(I + 1, n.length - 1));
          break;
        case "ArrowUp":
          R.preventDefault(), g((I) => Math.max(I - 1, 0));
          break;
      }
  }, N = q([]);
  return J(() => {
    var R;
    u >= 0 && u < N.current.length && ((R = N.current[u]) == null || R.focus());
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
          children: n.map((R, I) => {
            const S = R === s, V = `${a}-${I}`;
            return /* @__PURE__ */ w(it, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (k) => {
                    N.current[I] = k;
                  },
                  role: "option",
                  "aria-selected": S,
                  "data-marker": R.marker,
                  "data-state": S ? "selected" : void 0,
                  tabIndex: I === u ? 0 : -1,
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
                  onClick: () => m(R, I),
                  onKeyDown: (k) => y(k, R, I),
                  children: /* @__PURE__ */ r(
                    lp,
                    {
                      footnote: R,
                      layout: o,
                      formatCaller: () => p(R.caller, I),
                      showMarkers: i
                    }
                  )
                },
                V
              ),
              I < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(fn, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function cp(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function dp({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = z(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const p = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(p) || (d.add(p), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(Nr, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(kr, { stickyHeader: !0, children: /* @__PURE__ */ w(Se, { children: [
      /* @__PURE__ */ r(Gn, { children: a }),
      /* @__PURE__ */ r(Gn, { children: s })
    ] }) }),
    /* @__PURE__ */ r(_r, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ w(
      Se,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(tn, { children: Re(l.reference, "English") }),
          /* @__PURE__ */ r(tn, { className: o, children: cp(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const $o = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Zr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Zr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
$o.displayName = Zr.Root.displayName;
const wp = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(el, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(nl, { className: "tw-h-4 tw-w-4" });
}, Cr = (t, e, n) => /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
  /* @__PURE__ */ w(
    Bt,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        wp(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r($t, { side: "bottom", children: e })
] }) }), Sm = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Cr(e, t)
}), pp = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Cr(n, t)
}), Rm = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Cr(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Br = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((c) => c !== d);
  }), o(i);
  let l = [...a];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), s(l);
}, Im = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => Cr(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(Do, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        jn,
        {
          onClick: (d) => {
            d.stopPropagation(), Br(
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
          children: /* @__PURE__ */ r(Zi, {})
        }
      ),
      /* @__PURE__ */ r(
        jn,
        {
          onClick: (d) => {
            d.stopPropagation(), Br(
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
          children: /* @__PURE__ */ r(Qi, {})
        }
      ),
      /* @__PURE__ */ r(
        jn,
        {
          onClick: (d) => {
            d.stopPropagation(), Br(
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
          children: /* @__PURE__ */ r(tl, {})
        }
      )
    ] });
  }
}), Dm = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Om = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Mm = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, up = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Am = Object.freeze([
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
]), mp = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, fp = (t, e, n) => t.map((o) => {
  const a = Yo(o.key) ? o.key : o.key[0];
  return {
    items: Yo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || up(a, e, n),
    occurrences: o.occurrences || []
  };
}), ge = (t, e) => t[e] ?? e;
function Pm({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: d,
  id: c,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: m,
  onItemSelected: f
}) {
  const u = ge(n, "%webView_inventory_all%"), g = ge(n, "%webView_inventory_approved%"), y = ge(n, "%webView_inventory_unapproved%"), x = ge(n, "%webView_inventory_unknown%"), N = ge(n, "%webView_inventory_scope_currentBook%"), R = ge(n, "%webView_inventory_scope_chapter%"), I = ge(n, "%webView_inventory_scope_verse%"), S = ge(n, "%webView_inventory_filter_text%"), V = ge(
    n,
    "%webView_inventory_show_additional_items%"
  ), k = ge(n, "%webView_inventory_no_results%"), [T, C] = D(!1), [v, E] = D("all"), [P, L] = D(""), [M, $] = D([]), H = z(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : fp(K, a, s);
  }, [t, a, s]), Y = z(() => {
    if (T) return H;
    const K = [];
    return H.forEach((nt) => {
      const ct = nt.items[0], rt = K.find(
        (at) => at.items[0] === ct
      );
      rt ? (rt.count += nt.count, rt.occurrences = rt.occurrences.concat(nt.occurrences)) : K.push({
        items: [ct],
        count: nt.count,
        occurrences: nt.occurrences,
        status: nt.status
      });
    }), K;
  }, [T, H]), tt = z(() => Y.length === 0 ? [] : mp(Y, v, P), [Y, v, P]), St = z(() => {
    var ct, rt;
    if (!T) return d;
    const K = (ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct.length;
    if (!K) return d;
    const nt = [];
    for (let at = 0; at < K; at++)
      nt.push(
        pp(
          ((rt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : rt[at]) || "Additional Item",
          at + 1
        )
      );
    return [...nt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, T]);
  J(() => {
    tt.length === 0 ? $([]) : tt.length === 1 && $(tt[0].items);
  }, [tt]);
  const Gt = (K, nt) => {
    nt.setRowSelection(() => {
      const rt = {};
      return rt[K.index] = !0, rt;
    });
    const ct = K.original.items;
    $(ct), f && ct.length > 0 && f(ct[0]);
  }, jt = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, lt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      E(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, gt = z(() => {
    if (Y.length === 0 || M.length === 0) return [];
    const K = Y.filter((nt) => xl(
      T ? nt.items : [nt.items[0]],
      M
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [M, T, Y]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ w(
        hn,
        {
          onValueChange: (K) => lt(K),
          defaultValue: v,
          children: [
            /* @__PURE__ */ r(nn, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(gn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(rn, { children: [
              /* @__PURE__ */ r(oe, { value: "all", children: u }),
              /* @__PURE__ */ r(oe, { value: "approved", children: g }),
              /* @__PURE__ */ r(oe, { value: "unapproved", children: y }),
              /* @__PURE__ */ r(oe, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(hn, { onValueChange: (K) => jt(K), defaultValue: i, children: [
        /* @__PURE__ */ r(nn, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(gn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(rn, { children: [
          /* @__PURE__ */ r(oe, { value: "book", children: N }),
          /* @__PURE__ */ r(oe, { value: "chapter", children: R }),
          /* @__PURE__ */ r(oe, { value: "verse", children: I })
        ] })
      ] }),
      /* @__PURE__ */ r(
        _n,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: S,
          value: P,
          onChange: (K) => {
            L(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w(Vt, { children: [
        /* @__PURE__ */ r(Bt, { asChild: !0, children: /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            $o,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: T,
              onCheckedChange: (K) => {
                C(K);
              }
            }
          ),
          /* @__PURE__ */ r(Tt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? V })
        ] }) }),
        /* @__PURE__ */ r($t, { children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Vw,
      {
        columns: St,
        data: tt,
        onRowClickHandler: Gt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: k
      }
    ) }),
    gt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      dp,
      {
        classNameForText: m,
        occurrenceData: gt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
function hp(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const o = e.get(n.projectId), a = {
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: n.scrollGroupScrRefLabel
    };
    o ? o.some((s) => s.scrollGroupId === n.scrollGroupId) || o.push(a) : e.set(n.projectId, [a]);
  }), e.forEach((n) => n.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function Na(t, e, n) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === n);
}
function Gr(t) {
  const e = hp(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(s.id) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        language: s.language,
        languageCode: s.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a === s.id,
        isMuted: i.length === 0,
        isBoundButClosed: !1
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
  return t.projects.forEach((a) => {
    const s = e.get(a.id);
    if (!s || s.length === 0) {
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
        isSelected: Na(n, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Na(n, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1
      });
    });
  }), n.forEach((a) => {
    if (a.scrollGroupId === void 0 || o.some((i) => i.projectId === a.projectId && i.scrollGroupId === a.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === a.projectId);
    s && o.push({
      rowKey: `closed:${s.id}:${a.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      language: s.language,
      languageCode: s.languageCode,
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0
    });
  }), o;
}
function ka(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Fr(t, e) {
  if (t.isSelected !== e.isSelected) return t.isSelected ? -1 : 1;
  const n = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (n !== 0) return n;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function gp(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Fr) }];
  const n = t.filter(ka).sort(Fr), o = t.filter((s) => !ka(s)).sort(Fr), a = [];
  return n.length > 0 && a.push({ kind: "openTabs", rows: n }), o.length > 0 && a.push({ kind: "other", rows: o }), a;
}
const bp = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group",
  filterSectionLabel: "Filter",
  filterGroupByOpenTabs: "By open tabs",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Open tabs",
  otherProjectsSectionHeading: "Other projects",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function vp(t) {
  return { ...bp, ...t };
}
function Fn(t) {
  return t >= 0 && t <= 25 ? String.fromCharCode(65 + t) : String(t);
}
const xp = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function yp({ scrollGroupId: t, isBoundButClosed: e }) {
  const n = Fn(t);
  return e ? /* @__PURE__ */ r(
    Ne,
    {
      variant: "outline",
      className: "tw-relative tw-text-muted-foreground",
      style: xp,
      children: n
    }
  ) : /* @__PURE__ */ r(Ne, { variant: "secondary", children: n });
}
function Np({ row: t, mode: e, strings: n, onClick: o, onOpen: a }) {
  const s = !!(t.language || t.languageCode), i = /* @__PURE__ */ r(Yt, { className: h("tw-h-4 tw-w-4", t.isSelected ? "tw-opacity-100" : "tw-opacity-0") });
  let l;
  e === "project" ? t.openGroups.length > 0 && (l = /* @__PURE__ */ r("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-gap-1", children: t.openGroups.map((m) => /* @__PURE__ */ r(Ne, { variant: "secondary", children: Fn(m) }, m)) })) : t.scrollGroupId !== void 0 && (l = /* @__PURE__ */ w("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      yp,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && a && /* @__PURE__ */ w(
      F,
      {
        size: "sm",
        variant: "ghost",
        className: "tw-h-6 tw-gap-1 tw-px-2 tw-text-xs",
        onClick: (m) => {
          m.stopPropagation(), a(t);
        },
        onMouseDown: (m) => m.stopPropagation(),
        "aria-label": n.openButtonLabel,
        title: n.openButtonLabel,
        children: [
          /* @__PURE__ */ r(Ta, { className: "tw-h-3 tw-w-3" }),
          n.openButtonLabel
        ]
      }
    )
  ] }));
  const d = /* @__PURE__ */ w(
    pe,
    {
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => o(t),
      className: "tw-flex tw-items-center tw-gap-2 tw-pe-4 tw-@container",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center", children: i }),
        /* @__PURE__ */ r("span", { className: "tw-w-16 tw-shrink-0 tw-truncate", children: t.shortName }),
        /* @__PURE__ */ r("span", { className: "tw-hidden tw-min-w-0 tw-flex-1 tw-truncate tw-text-start tw-text-muted-foreground @[250px]:tw-block", children: t.fullName }),
        l
      ]
    }
  ), c = t.scrollGroupId !== void 0 ? Fn(t.scrollGroupId) : void 0, p = t.isBoundButClosed && c ? n.boundButClosedTooltip.replace("{group}", c) : void 0;
  return /* @__PURE__ */ w(Vt, { delayDuration: 200, children: [
    /* @__PURE__ */ r(Bt, { asChild: !0, children: d }),
    /* @__PURE__ */ w(
      $t,
      {
        side: "right",
        align: "start",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw-max-w-xs",
        style: { zIndex: yo },
        children: [
          /* @__PURE__ */ r("div", { className: "tw-font-semibold", children: t.fullName }),
          s && /* @__PURE__ */ w("div", { className: "tw-text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && c && /* @__PURE__ */ w("div", { className: "tw-text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " (",
              c,
              ")"
            ] })
          ] }),
          p && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: p })
        ]
      }
    )
  ] });
}
function kp({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: n,
  onChangeShowSelectedOnly: o,
  strings: a
}) {
  const s = !!n;
  return /* @__PURE__ */ w(ke, { children: [
    /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: "ghost",
        size: "sm",
        className: h(
          "tw-h-8 tw-w-8 tw-shrink-0 tw-p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw-bg-accent tw-text-accent-foreground hover:tw-bg-accent/80 data-[state=open]:tw-bg-accent"
        ),
        "aria-label": a.filterAriaLabel,
        "aria-pressed": s,
        title: a.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ r(Oa, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ w(de, { align: "end", className: "tw-w-56", style: { zIndex: yo }, children: [
      /* @__PURE__ */ r(qe, { children: a.groupSectionLabel }),
      /* @__PURE__ */ r(
        le,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: a.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ w(it, { children: [
        /* @__PURE__ */ r($e, {}),
        /* @__PURE__ */ r(qe, { children: a.filterSectionLabel }),
        /* @__PURE__ */ r(
          le,
          {
            checked: !!n,
            onCheckedChange: o,
            onSelect: (i) => i.preventDefault(),
            children: a.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function $m(t) {
  const [e, n] = D(!1), [o, a] = D(""), [s, i] = D(t.defaultGroupByOpenTabs ?? !0), [l, d] = D(!1), c = vp(t.localizedStrings), p = z(() => t.mode === "project" ? Gr({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Gr({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Gr({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), m = z(() => {
    const k = o.trim().toLowerCase();
    let T = p;
    return k && (T = T.filter(
      (C) => C.shortName.toLowerCase().includes(k) || C.fullName.toLowerCase().includes(k) || (C.language ?? "").toLowerCase().includes(k) || (C.languageCode ?? "").toLowerCase().includes(k)
    )), t.mode === "project-multi" && l && (T = T.filter((C) => C.isSelected)), T;
  }, [p, o, t.mode, l]), f = z(
    () => gp(m, s),
    [m, s]
  ), u = z(() => {
    if (t.mode !== "project-multi") return [];
    const k = [];
    return t.projects.forEach((T) => {
      const C = t.openTabs.filter((E) => E.projectId === T.id);
      if (C.length === 0) {
        k.push({ projectId: T.id });
        return;
      }
      const v = /* @__PURE__ */ new Set();
      C.forEach((E) => {
        v.has(E.scrollGroupId) || (v.add(E.scrollGroupId), k.push({ projectId: T.id, scrollGroupId: E.scrollGroupId }));
      });
    }), k;
  }, [t.mode, t.projects, t.openTabs]), g = (k) => {
    if (k.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(k.projectId, k.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(k.projectId, k.scrollGroupId);
    }
  }, y = (k) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: k.projectId }), n(!1);
        return;
      }
      case "project-multi": {
        const T = t.selection.pairs, C = (E) => E.projectId === k.projectId && E.scrollGroupId === k.scrollGroupId, v = T.some(C) ? T.filter((E) => !C(E)) : [...T, { projectId: k.projectId, scrollGroupId: k.scrollGroupId }];
        t.onChangeSelection({ pairs: v }), v.length === 0 && l && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (k.isBoundButClosed && k.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(k.projectId, k.scrollGroupId), n(!1);
          return;
        }
        if (k.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: k.projectId,
            scrollGroupId: k.scrollGroupId
          }), n(!1);
          return;
        }
        const T = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: k.projectId, scrollGroupId: T }), t.onOpenProjectInGroup(k.projectId, T), n(!1);
      }
    }
  }, x = () => {
    if (t.mode !== "project-multi") return;
    const k = t.selection.pairs, T = new Set(k.map((v) => `${v.projectId}:${v.scrollGroupId ?? ""}`)), C = [...k];
    u.forEach((v) => {
      const E = `${v.projectId}:${v.scrollGroupId ?? ""}`;
      T.has(E) || (T.add(E), C.push(v));
    }), t.onChangeSelection({ pairs: C });
  }, N = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, R = z(() => {
    switch (t.mode) {
      case "project": {
        const k = t.projects.find((C) => C.id === t.selection.projectId), T = k ? k.shortName : t.buttonPlaceholder ?? "";
        return { node: T, title: T };
      }
      case "project-multi": {
        const { pairs: k } = t.selection;
        if (k.length === 0) {
          const E = t.buttonPlaceholder ?? "";
          return { node: E, title: E };
        }
        const T = [];
        if (k.forEach((E) => {
          const P = t.projects.find((L) => L.id === E.projectId);
          P && T.push({ project: P, scrollGroupId: E.scrollGroupId });
        }), T.length === 0) {
          const E = t.buttonPlaceholder ?? "";
          return { node: E, title: E };
        }
        if (t.getSelectedText) {
          const E = t.getSelectedText(T);
          return { node: E, title: E };
        }
        const C = T.map(
          ({ project: E, scrollGroupId: P }) => P === void 0 ? E.shortName : `${E.shortName} (${Fn(P)})`
        ).join(", ");
        if (T.length === 1) return { node: C, title: C };
        const v = T.length.toString();
        return {
          node: /* @__PURE__ */ w(it, { children: [
            /* @__PURE__ */ r(Ne, { variant: "muted", className: "tw-shrink-0", children: v }),
            /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-truncate", children: C })
          ] }),
          title: `${v} ${C}`
        };
      }
      case "projectScrollGroup": {
        const k = t.projects.find((v) => v.id === t.selection.projectId);
        if (!k) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const T = t.selection.scrollGroupId;
        if (T === void 0)
          return { node: k.shortName, title: k.shortName };
        const C = `${k.shortName} · ${Fn(T)}`;
        return { node: C, title: C };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), I = t.mode === "project-multi" ? /* @__PURE__ */ r(ho, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }) : /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }), S = t.mode === "project-multi" && t.selection.pairs.length > 0, V = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? g : void 0;
  return /* @__PURE__ */ w(Ee, { open: e, onOpenChange: n, children: [
    /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: t.buttonVariant ?? "outline",
        role: "combobox",
        "aria-expanded": e,
        "aria-label": t.ariaLabel,
        disabled: t.isDisabled ?? !1,
        title: S ? R.title : void 0,
        className: h(
          "tw-flex tw-w-[180px] tw-items-center tw-justify-between tw-overflow-hidden",
          t.buttonClassName
        ),
        children: [
          /* @__PURE__ */ r("span", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-start", children: typeof R.node == "string" ? /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-truncate", children: R.node }) : R.node }),
          I
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ue,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: h(
          "tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",
          t.popoverContentClassName
        ),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ r(Pt, { delayDuration: 200, children: /* @__PURE__ */ w(_e, { shouldFilter: !1, children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-pe-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-flex-1", children: /* @__PURE__ */ r(
              an,
              {
                value: o,
                onValueChange: a,
                placeholder: c.searchPlaceholder,
                className: "tw-border-0"
              }
            ) }),
            /* @__PURE__ */ r(
              kp,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: c
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-py-2 tw-pe-4 tw-ps-2", children: [
            /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: x, children: `${c.selectAll} (${u.length.toString()})` }),
            /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: N, children: `${c.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ w(Ce, { children: [
            /* @__PURE__ */ r(Nn, { children: t.commandEmptyMessage ?? "No projects found" }),
            f.map((k, T) => /* @__PURE__ */ w(fo, { children: [
              /* @__PURE__ */ r(ce, { heading: _p(k, c), children: k.rows.map((C) => /* @__PURE__ */ r(
                Np,
                {
                  row: C,
                  mode: t.mode,
                  strings: c,
                  onClick: y,
                  onOpen: V
                },
                C.rowKey
              )) }),
              T < f.length - 1 && /* @__PURE__ */ r(xr, {})
            ] }, k.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function _p(t, e) {
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
const Cp = "16rem", Ep = "3rem", Ws = b.createContext(void 0);
function Er() {
  const t = b.useContext(Ws);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Js = b.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, d) => {
    const [c, p] = b.useState(t), m = e ?? c, f = b.useCallback(
      (I) => {
        const S = typeof I == "function" ? I(m) : I;
        n ? n(S) : p(S);
      },
      [n, m]
    ), u = b.useCallback(() => f((I) => !I), [f]), g = m ? "expanded" : "collapsed", N = _t() === "ltr" ? i : i === "primary" ? "secondary" : "primary", R = b.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: N
      }),
      [g, m, f, u, N]
    );
    return /* @__PURE__ */ r(Ws.Provider, { value: R, children: /* @__PURE__ */ r(Pt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Cp,
            "--sidebar-width-icon": Ep,
            ...a
          }
        ),
        className: h(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: d,
        ...l,
        children: s
      }
    ) }) });
  }
);
Js.displayName = "SidebarProvider";
const Zs = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Er();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ w(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": i.side,
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
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
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
Zs.displayName = "Sidebar";
const Tp = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Er();
  return /* @__PURE__ */ w(
    F,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(rl, {}) : /* @__PURE__ */ r(ol, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Tp.displayName = "SidebarTrigger";
const Sp = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Er();
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
Sp.displayName = "SidebarRail";
const Qs = b.forwardRef(
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
Qs.displayName = "SidebarInset";
const Rp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _n,
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
Rp.displayName = "SidebarInput";
const Ip = b.forwardRef(
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
Ip.displayName = "SidebarHeader";
const Dp = b.forwardRef(
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
Dp.displayName = "SidebarFooter";
const Op = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  fn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Op.displayName = "SidebarSeparator";
const ti = b.forwardRef(
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
ti.displayName = "SidebarContent";
const co = b.forwardRef(
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
co.displayName = "SidebarGroup";
const wo = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? vn : "div",
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
wo.displayName = "SidebarGroupLabel";
const Mp = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? vn : "button",
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
Mp.displayName = "SidebarGroupAction";
const po = b.forwardRef(
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
po.displayName = "SidebarGroupContent";
const ei = b.forwardRef(
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
ei.displayName = "SidebarMenu";
const ni = b.forwardRef(
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
ni.displayName = "SidebarMenuItem";
const Ap = He(
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
), ri = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const d = t ? vn : "button", { state: c } = Er(), p = /* @__PURE__ */ r(
      d,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(Ap({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(Bt, { asChild: !0, children: p }),
      /* @__PURE__ */ r($t, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
ri.displayName = "SidebarMenuButton";
const Pp = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? vn : "button",
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
Pp.displayName = "SidebarMenuAction";
const $p = b.forwardRef(
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
$p.displayName = "SidebarMenuBadge";
const jp = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(lo, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          lo,
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
jp.displayName = "SidebarMenuSkeleton";
const Lp = b.forwardRef(
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
Lp.displayName = "SidebarMenuSub";
const Vp = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Vp.displayName = "SidebarMenuSubItem";
const Bp = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? vn : "a",
  {
    ref: s,
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
Bp.displayName = "SidebarMenuSubButton";
function Gp({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: d
}) {
  const c = G(
    (f, u) => {
      o(f, u);
    },
    [o]
  ), p = G(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = G(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Zs,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ w(ti, { children: [
        /* @__PURE__ */ w(co, { children: [
          /* @__PURE__ */ r(wo, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(po, { children: /* @__PURE__ */ r(ei, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ r(ni, { children: /* @__PURE__ */ r(
            ri,
            {
              onClick: () => c(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ w(co, { children: [
          /* @__PURE__ */ r(wo, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(po, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            ro,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: yo },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = p(f);
                c(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(al, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const jo = zn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = _t();
    return /* @__PURE__ */ w("div", { id: i, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Ea,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": d === "rtl" },
            { "tw-left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        _n,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ w(
        F,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": d === "rtl" },
            { "tw-right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(bn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
jo.displayName = "SearchBar";
function jm({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      jo,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      Js,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Gp,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(Qs, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Fe = "scrBook", Fp = "scrRef", Ze = "source", zp = "details", Kp = "Scripture Reference", qp = "Scripture Book", oi = "Type", Hp = "Details";
function Up(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Fe,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Kp,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? pt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Fe ? Re(a.start) : void 0;
      },
      getGroupingValue: (o) => pt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Yr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Re(o.start),
      id: Fp,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Re(a.start);
      },
      sortingFn: (o, a) => Yr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ze,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? oi : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: zp,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Hp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Yp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Yr(t.start, t.end) === 0 ? `${Tr(t.start)}+${e}` : `${Tr(t.start)}+${e}-${Tr(t.end)}+${n}`;
}, _a = (t) => `${Yp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Lm({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: d
}) {
  const [c, p] = D([]), [m, f] = D([{ id: Fe, desc: !1 }]), [u, g] = D({}), y = z(
    () => t.flatMap((v) => v.data.map((E) => ({
      ...E,
      source: v.source
    }))),
    [t]
  ), x = z(
    () => Up(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  J(() => {
    c.includes(Ze) ? f([
      { id: Ze, desc: !1 },
      { id: Fe, desc: !1 }
    ]) : f([{ id: Fe, desc: !1 }]);
  }, [c]);
  const N = ts({
    data: y,
    columns: x,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: kc(),
    getGroupedRowModel: Nc(),
    getCoreRowModel: ns(),
    getSortedRowModel: es(),
    getRowId: _a,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  J(() => {
    if (l) {
      const v = N.getSelectedRowModel().rowsById, E = Object.keys(v);
      if (E.length === 1) {
        const P = y.find((L) => _a(L) === E[0]) || void 0;
        P && l(P);
      }
    }
  }, [u, y, l, N]);
  const R = a ?? qp, I = s ?? oi, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${R}`, value: [Fe] },
    { label: `Group by ${I}`, value: [Ze] },
    {
      label: `Group by ${R} and ${I}`,
      value: [Fe, Ze]
    },
    {
      label: `Group by ${I} and ${R}`,
      value: [Ze, Fe]
    }
  ], V = (v) => {
    p(JSON.parse(v));
  }, k = (v, E) => {
    !v.getIsGrouped() && !v.getIsSelected() && v.getToggleSelectedHandler()(E);
  }, T = (v, E) => v.getIsGrouped() ? "" : h("banded-row", E % 2 === 0 ? "even" : "odd"), C = (v, E, P) => {
    if (!((v == null ? void 0 : v.length) === 0 || E.depth < P.column.getGroupedIndex())) {
      if (E.getIsGrouped())
        switch (E.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (E.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ w(
      hn,
      {
        value: JSON.stringify(c),
        onValueChange: (v) => {
          V(v);
        },
        children: [
          /* @__PURE__ */ r(nn, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(gn, {}) }),
          /* @__PURE__ */ r(rn, { position: "item-aligned", children: /* @__PURE__ */ r(Sw, { children: S.map((v) => /* @__PURE__ */ r(oe, { value: JSON.stringify(v.value), children: v.label }, v.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(Nr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(kr, { children: N.getHeaderGroups().map((v) => /* @__PURE__ */ r(Se, { children: v.headers.filter((E) => E.column.columnDef.header).map((E) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Gn, { colSpan: E.colSpan, className: "top-0 tw-sticky", children: E.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          E.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${E.column.columnDef.header}`,
              onClick: E.column.getToggleGroupingHandler(),
              type: "button",
              children: E.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Pn(E.column.columnDef.header, E.getContext())
        ] }) }, E.id)
      )) }, v.id)) }),
      /* @__PURE__ */ r(_r, { children: N.getRowModel().rows.map((v, E) => {
        const P = _t();
        return /* @__PURE__ */ r(
          Se,
          {
            "data-state": v.getIsSelected() ? "selected" : "",
            className: h(T(v, E)),
            onClick: (L) => k(v, L),
            children: v.getVisibleCells().map((L) => {
              if (!(L.getIsPlaceholder() || L.column.columnDef.enableGrouping && !L.getIsGrouped() && (L.column.columnDef.id !== Ze || !n)))
                return /* @__PURE__ */ r(
                  tn,
                  {
                    className: h(
                      L.column.columnDef.id,
                      "tw-p-[1px]",
                      C(c, v, L)
                    ),
                    children: L.getIsGrouped() ? /* @__PURE__ */ w(
                      F,
                      {
                        variant: "link",
                        onClick: v.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          v.getIsExpanded() && /* @__PURE__ */ r(Oe, {}),
                          !v.getIsExpanded() && (P === "ltr" ? /* @__PURE__ */ r(pn, {}) : /* @__PURE__ */ r(Hr, {})),
                          " ",
                          Pn(L.column.columnDef.cell, L.getContext()),
                          " (",
                          v.subRows.length,
                          ")"
                        ]
                      }
                    ) : Pn(L.column.columnDef.cell, L.getContext())
                  },
                  L.id
                );
            })
          },
          v.id
        );
      }) })
    ] })
  ] });
}
const Lo = (t, e) => t.filter((n) => {
  try {
    return An(n) === e;
  } catch {
    return !1;
  }
}), ai = (t, e, n) => Lo(t, e).every((o) => n.includes(o));
function Xp({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Lo(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], d = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        ai(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: $c(
        t,
        i,
        l,
        d,
        c
      )
    }
  );
}
const Ca = 5, zr = 6;
function Wp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, N] = D(!1), [R, I] = D(""), S = q(void 0), V = q(!1);
  if (t.length !== pt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const k = z(() => pt.allBookIds.filter(
    ($, H) => t[H] === "1" && !pt.isObsolete(pt.bookIdToNumber($))
  ), [t]), T = z(() => {
    if (!R.trim()) {
      const Y = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return k.forEach((tt) => {
        const St = An(tt);
        Y[St].push(tt);
      }), Y;
    }
    const $ = k.filter(
      (Y) => ko(Y, R, a)
    ), H = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return $.forEach((Y) => {
      const tt = An(Y);
      H[tt].push(Y);
    }), H;
  }, [k, R, a]), C = G(
    ($, H = !1) => {
      if (!H || !S.current) {
        n(
          e.includes($) ? e.filter((lt) => lt !== $) : [...e, $]
        ), S.current = $;
        return;
      }
      const Y = k.findIndex((lt) => lt === S.current), tt = k.findIndex((lt) => lt === $);
      if (Y === -1 || tt === -1) return;
      const [St, Gt] = [
        Math.min(Y, tt),
        Math.max(Y, tt)
      ], jt = k.slice(St, Gt + 1).map((lt) => lt);
      n(
        e.includes($) ? e.filter((lt) => !jt.includes(lt)) : [.../* @__PURE__ */ new Set([...e, ...jt])]
      );
    },
    [e, n, k]
  ), v = ($) => {
    C($, V.current), V.current = !1;
  }, E = ($, H) => {
    $.preventDefault(), C(H, $.shiftKey);
  }, P = G(
    ($) => {
      const H = Lo(k, $).map((Y) => Y);
      n(
        ai(k, $, e) ? e.filter((Y) => !H.includes(Y)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, n, k]
  ), L = () => {
    n(k.map(($) => $));
  }, M = () => {
    n([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Q).map(($) => /* @__PURE__ */ r(
      Xp,
      {
        section: $,
        availableBookIds: k,
        selectedBookIds: e,
        onToggle: P,
        localizedStrings: o
      },
      $
    )) }),
    /* @__PURE__ */ w(
      Ee,
      {
        open: x,
        onOpenChange: ($) => {
          N($), $ || I("");
        },
        children: [
          /* @__PURE__ */ r(je, { asChild: !0, children: /* @__PURE__ */ w(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(ho, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(ue, { className: "tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0", align: "start", children: /* @__PURE__ */ w(
            _e,
            {
              shouldFilter: !1,
              onKeyDown: ($) => {
                $.key === "Enter" && (V.current = $.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  an,
                  {
                    placeholder: l,
                    value: R,
                    onValueChange: I
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: L, children: d }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: M, children: c })
                ] }),
                /* @__PURE__ */ w(Ce, { children: [
                  /* @__PURE__ */ r(Nn, { children: p }),
                  Object.values(Q).map(($, H) => {
                    const Y = T[$];
                    if (Y.length !== 0)
                      return /* @__PURE__ */ w(fo, { children: [
                        /* @__PURE__ */ r(
                          ce,
                          {
                            heading: ss($, f, u, g, y),
                            children: Y.map((tt) => /* @__PURE__ */ r(
                              ls,
                              {
                                bookId: tt,
                                isSelected: e.includes(tt),
                                onSelect: () => v(tt),
                                onMouseDown: (St) => E(St, tt),
                                section: An(tt),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ws(tt, a),
                                className: "tw-flex tw-items-center"
                              },
                              tt
                            ))
                          }
                        ),
                        H < Object.values(Q).length - 1 && /* @__PURE__ */ r(xr, {})
                      ] }, $);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ w("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === zr ? zr : Ca
      ).map(($) => /* @__PURE__ */ r(Ne, { className: "hover:tw-bg-secondary", variant: "secondary", children: ze($, a) }, $)),
      e.length > zr && /* @__PURE__ */ r(
        Ne,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Ca} ${m}`
        }
      )
    ] })
  ] });
}
const Vm = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_verse%",
  "%webView_scope_selector_chapter%",
  "%webView_scope_selector_book%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
  "%webView_scope_selector_range%",
  "%webView_scope_selector_select_range%",
  "%webView_scope_selector_range_start%",
  "%webView_scope_selector_range_end%",
  "%webView_scope_selector_ok%",
  "%webView_scope_selector_cancel%",
  "%webView_scope_selector_navigate%",
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
]), At = (t, e) => t[e] ?? e, Jp = Object.freeze([" ", "-"]);
function Bm({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: d,
  variant: c = "radio",
  rangeStart: p,
  rangeEnd: m,
  onRangeStartChange: f,
  onRangeEndChange: u,
  currentScrRef: g,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: x,
  getEndVerse: N,
  hideLabel: R = !1,
  buttonClassName: I
}) {
  const S = At(
    i,
    "%webView_scope_selector_selected_text%"
  ), V = At(i, "%webView_scope_selector_verse%"), k = At(i, "%webView_scope_selector_chapter%"), T = At(i, "%webView_scope_selector_book%"), C = At(
    i,
    "%webView_scope_selector_current_verse%"
  ), v = At(
    i,
    "%webView_scope_selector_current_chapter%"
  ), E = At(i, "%webView_scope_selector_current_book%"), P = At(i, "%webView_scope_selector_choose_books%"), L = At(i, "%webView_scope_selector_scope%"), M = At(i, "%webView_scope_selector_select_books%"), $ = At(i, "%webView_scope_selector_range%"), H = At(i, "%webView_scope_selector_select_range%"), Y = At(i, "%webView_scope_selector_range_start%"), tt = At(i, "%webView_scope_selector_range_end%"), St = At(i, "%webView_scope_selector_ok%"), Gt = At(i, "%webView_scope_selector_cancel%"), jt = At(i, "%webView_scope_selector_navigate%"), lt = (j) => {
    if (!g) return;
    const W = g.book.toUpperCase();
    switch (j) {
      case "verse":
        return Re(g, "id");
      case "chapter":
        return `${W} ${g.chapterNum}`;
      case "book":
        return W;
      default:
        return;
    }
  }, gt = [
    { value: "selectedText", label: S, id: "scope-selected-text" },
    {
      value: "verse",
      label: V,
      dropdownLabel: C,
      scrRefSuffix: lt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: k,
      dropdownLabel: v,
      scrRefSuffix: lt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: T,
      dropdownLabel: E,
      scrRefSuffix: lt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: P, id: "scope-selected" },
    { value: "range", label: $, id: "scope-range" }
  ], K = (j, W, Ut = !1) => /* @__PURE__ */ w(it, { children: [
    j,
    W && !Ut && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
      ": ",
      W
    ] })
  ] }), nt = e ? gt.filter((j) => e.includes(j.value)) : gt, ct = g ?? Sr, rt = p ?? ct, at = m ?? ct, Ft = () => {
  }, Dt = q(null), zt = q(null), fe = q(!1), A = q(null), Zt = q(!1), [he, Ot] = D(void 0), B = q(!1), X = q(!1), et = q(null), dt = G((j) => {
    if (j) {
      Ot("start"), B.current = !1;
      return;
    }
    Ot((W) => W === "start" ? void 0 : W), B.current && (B.current = !1, requestAnimationFrame(() => {
      var Ut;
      const W = (Ut = Dt.current) == null ? void 0 : Ut.querySelector("button");
      W == null || W.click();
    }));
  }, []), xt = G((j) => {
    if (j) {
      Ot("end"), X.current = !1;
      return;
    }
    Ot((W) => W === "end" ? void 0 : W);
  }, []), yt = G(
    (j) => {
      f == null || f(j), u == null || u(j), B.current = !0;
    },
    [f, u]
  ), Rt = G(
    (j) => {
      u == null || u(j), X.current = !0;
    },
    [u]
  ), bt = G(
    (j) => {
      n(j), j === "selectedBooks" && a.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [n, a, g, s]
  ), Ct = nt.find((j) => j.value === t), Lt = () => t === "selectedBooks" && a.length > 0 ? a.map((j) => j.toUpperCase()).join(", ") : t === "range" ? yl(rt, at, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : Ct ? K(Ct.label, Ct.scrRefSuffix) : t, O = nt.filter(
    (j) => j.value !== "selectedBooks" && j.value !== "range"
  ), Nt = nt.find((j) => j.value === "selectedBooks"), ut = nt.find((j) => j.value === "range"), [Ve, Ue] = D(!1), [Ye, sn] = D(void 0), [Be, Cn] = D(void 0), [Ge, En] = D(void 0), [Xe, Tn] = D(void 0), [Sn, qn] = D([]), Hn = c === "dropdown" && Ye === "selectedBooks", _ = /* @__PURE__ */ r(
    Wp,
    {
      availableBookInfo: o,
      selectedBookIds: Hn ? Sn : a,
      onChangeSelectedBookIds: Hn ? qn : s,
      localizedStrings: i,
      localizedBookNames: l
    }
  ), U = he === "end", Z = he === "start", It = "tw-text-muted-foreground", re = c === "dropdown" && Ye === "range", ln = re ? En : yt, Kt = re ? Tn : u ? Rt : Ft, Et = /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-wrap tw-items-end tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Tt, { htmlFor: "scope-range-start", className: h(U && It), children: Y }),
      /* @__PURE__ */ r(
        Dr,
        {
          id: "scope-range-start",
          scrRef: re ? Ge ?? rt : rt,
          handleSubmit: ln,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          submitKeys: Jp,
          onOpenChange: dt,
          className: h(U && It),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { ref: Dt, className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Tt, { htmlFor: "scope-range-end", className: h(Z && It), children: tt }),
      /* @__PURE__ */ r(
        Dr,
        {
          id: "scope-range-end",
          scrRef: re ? Xe ?? at : at,
          handleSubmit: Kt,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          disableReferencesUpTo: re ? Ge ?? rt : rt,
          onOpenChange: xt,
          onCloseAutoFocus: (j) => {
            var W;
            X.current && (X.current = !1, j.preventDefault(), (W = et.current) == null || W.focus());
          },
          className: h(Z && It),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Mt = q({}), vt = G(
    (j) => (W) => {
      Mt.current[j] = W;
    },
    []
  ), Qt = q(null);
  J(() => {
    if (!Ve) return;
    let j = 0;
    const W = requestAnimationFrame(() => {
      j = requestAnimationFrame(() => {
        var Ut;
        (Ut = Mt.current[t]) == null || Ut.focus();
      });
    });
    return () => {
      cancelAnimationFrame(W), j && cancelAnimationFrame(j);
    };
  }, [Ve, t]);
  const [te, We] = D(null), [Un, Ni] = D(null), [Yn, ki] = D(null), _i = 200, [Ci, Ei] = D(!1);
  J(() => {
    if (!Yn || typeof ResizeObserver > "u") return;
    const j = new ResizeObserver(([W]) => {
      Ei(W.contentRect.width < _i);
    });
    return j.observe(Yn), () => j.disconnect();
  }, [Yn]);
  const Vo = G(
    (j) => {
      Cn(j), En(rt), Tn(at), qn(a), Ue(!1), sn(j);
    },
    [rt, at, a]
  ), Bo = G(() => {
    Be !== void 0 && (Be === "range" ? (Ge && (f == null || f(Ge)), Xe && (u == null || u(Xe))) : Be === "selectedBooks" && s(Sn), bt(Be), sn(void 0), Cn(void 0));
  }, [
    Be,
    Ge,
    Xe,
    Sn,
    f,
    u,
    s,
    bt
  ]), Xn = G((j) => {
    j || (sn(void 0), Cn(void 0));
  }, []), Go = G((j) => {
    var W;
    j.preventDefault(), (W = Qt.current) == null || W.focus();
  }, []), Fo = (j) => t === j ? /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }) : void 0;
  return /* @__PURE__ */ w("div", { id: d, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      !R && /* @__PURE__ */ r(Tt, { children: L }),
      c === "dropdown" ? /* @__PURE__ */ w(ke, { open: Ve, onOpenChange: Ue, children: [
        /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ w(
          F,
          {
            ref: Qt,
            variant: "outline",
            role: "combobox",
            className: h(
              "tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",
              I
            ),
            children: [
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Lt() }),
              /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ r(
          de,
          {
            ref: ki,
            className: "tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ w(Rr, { container: Yn, children: [
              O.map(({ value: j, label: W, dropdownLabel: Ut, scrRefSuffix: In, id: Ti }) => /* @__PURE__ */ w(
                Ke,
                {
                  ref: vt(j),
                  className: "tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground",
                  onSelect: () => bt(j),
                  "data-selected": t === j ? "true" : void 0,
                  children: [
                    t === j && /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }),
                    K(Ut ?? W, In, Ci)
                  ]
                },
                Ti
              )),
              (Nt || ut) && /* @__PURE__ */ r($e, {}),
              Nt && /* @__PURE__ */ w(
                Ke,
                {
                  ref: vt("selectedBooks"),
                  className: h(
                    "tw-relative tw-ps-8",
                    "data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
                  ),
                  onSelect: () => Vo("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Fo("selectedBooks"),
                    `${Nt.label}…`
                  ]
                }
              ),
              ut && /* @__PURE__ */ w(
                Ke,
                {
                  ref: vt("range"),
                  className: h(
                    "tw-relative tw-ps-8",
                    "data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
                  ),
                  onSelect: () => Vo("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Fo("range"),
                    `${ut.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ w(it, { children: [
                /* @__PURE__ */ r($e, {}),
                /* @__PURE__ */ r(qe, { className: "tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground", children: jt }),
                /* @__PURE__ */ r(
                  Ke,
                  {
                    ref: A,
                    className: "tw-p-0",
                    onSelect: (j) => {
                      var W, Ut;
                      if (j.preventDefault(), fe.current) {
                        fe.current = !1;
                        return;
                      }
                      Zt.current || (Ut = (W = zt.current) == null ? void 0 : W.querySelector("button")) == null || Ut.click();
                    },
                    children: /* @__PURE__ */ r(
                      "div",
                      {
                        ref: zt,
                        className: "tw-w-full tw-px-1 tw-pb-1",
                        onPointerDownCapture: (j) => {
                          const W = j.target instanceof HTMLElement ? j.target : void 0;
                          W != null && W.closest("button") && (fe.current = !0, requestAnimationFrame(() => {
                            fe.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ r(
                          Dr,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? Sr,
                            handleSubmit: y,
                            localizedBookNames: l,
                            localizedStrings: x,
                            getEndVerse: N,
                            triggerVariant: "ghost",
                            onOpenChange: (j) => {
                              Zt.current = j;
                            },
                            onCloseAutoFocus: (j) => {
                              var W;
                              j.preventDefault(), (W = A.current) == null || W.focus();
                            },
                            modal: !0,
                            className: "tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",
                            triggerContent: /* @__PURE__ */ w(it, { children: [
                              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Re(g ?? Sr, "id") }),
                              /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
                            ] })
                          }
                        )
                      }
                    )
                  }
                )
              ] })
            ] })
          }
        )
      ] }) : /* @__PURE__ */ r(
        _o,
        {
          value: t,
          onValueChange: bt,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: nt.map(({ value: j, label: W, scrRefSuffix: Ut, id: In }) => /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(dr, { className: "tw-me-2", value: j, id: In }),
            /* @__PURE__ */ r(Tt, { htmlFor: In, children: K(W, Ut) })
          ] }, In))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Tt, { children: M }),
      _
    ] }),
    c === "radio" && t === "range" && Et,
    c === "dropdown" && Nt && /* @__PURE__ */ r(eo, { open: Ye === "selectedBooks", onOpenChange: Xn, children: /* @__PURE__ */ r(
      ir,
      {
        ref: Ni,
        onCloseAutoFocus: Go,
        onEscapeKeyDown: (j) => {
          Un != null && Un.querySelector('[data-state="open"]') && j.preventDefault();
        },
        children: /* @__PURE__ */ w(Rr, { container: Un, children: [
          /* @__PURE__ */ r(lr, { className: "tw-pe-8", children: /* @__PURE__ */ r(cr, { children: P }) }),
          _,
          /* @__PURE__ */ w(no, { children: [
            /* @__PURE__ */ r(F, { variant: "outline", onClick: () => Xn(!1), children: Gt }),
            /* @__PURE__ */ r(F, { onClick: Bo, children: St })
          ] })
        ] })
      }
    ) }),
    c === "dropdown" && ut && /* @__PURE__ */ r(eo, { open: Ye === "range", onOpenChange: Xn, children: /* @__PURE__ */ r(
      ir,
      {
        ref: We,
        onCloseAutoFocus: Go,
        onEscapeKeyDown: (j) => {
          te != null && te.querySelector('[data-state="open"]') && j.preventDefault();
        },
        children: /* @__PURE__ */ w(Rr, { container: te, children: [
          /* @__PURE__ */ r(lr, { className: "tw-pe-8", children: /* @__PURE__ */ r(cr, { children: H }) }),
          Et,
          /* @__PURE__ */ w(no, { children: [
            /* @__PURE__ */ r(F, { variant: "outline", onClick: () => Xn(!1), children: Gt }),
            /* @__PURE__ */ r(F, { ref: et, onClick: Bo, children: St })
          ] })
        ] })
      }
    ) })
  ] });
}
const Kr = {
  [st("undefined")]: "Ø",
  [st(0)]: "A",
  [st(1)]: "B",
  [st(2)]: "C",
  [st(3)]: "D",
  [st(4)]: "E",
  [st(5)]: "F",
  [st(6)]: "G",
  [st(7)]: "H",
  [st(8)]: "I",
  [st(9)]: "J",
  [st(10)]: "K",
  [st(11)]: "L",
  [st(12)]: "M",
  [st(13)]: "N",
  [st(14)]: "O",
  [st(15)]: "P",
  [st(16)]: "Q",
  [st(17)]: "R",
  [st(18)]: "S",
  [st(19)]: "T",
  [st(20)]: "U",
  [st(21)]: "V",
  [st(22)]: "W",
  [st(23)]: "X",
  [st(24)]: "Y",
  [st(25)]: "Z"
};
function Gm({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Kr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, p]) => [
          c,
          c === p && c in Kr ? Kr[c] : p
        ]
      )
    )
  }, d = _t();
  return /* @__PURE__ */ w(
    hn,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(nn, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          gn,
          {
            placeholder: l[st(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          rn,
          {
            id: i,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: Kn },
            children: t.map((c) => /* @__PURE__ */ r(oe, { value: `${c}`, children: l[st(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Fm({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function zm({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Km({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(fn, {}) : ""
  ] });
}
function si(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function hr({ icon: t, menuLabel: e, leading: n }) {
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
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Vt, { children: [
  /* @__PURE__ */ r(Bt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    Ke,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(hr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(hr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(kw, { children: [
    /* @__PURE__ */ r(Ks, { children: l.label }),
    /* @__PURE__ */ r(Nw, { children: /* @__PURE__ */ r(qs, { children: ii(
      t,
      e,
      si(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r($t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function uo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(ke, { variant: s, children: [
    /* @__PURE__ */ r(Pe, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(sl, {}) }) }),
    /* @__PURE__ */ r(de, { align: "start", style: { zIndex: Kn }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, p) => /* @__PURE__ */ w(fo, { children: [
      /* @__PURE__ */ r(zs, { children: /* @__PURE__ */ r(Pt, { children: ii(e.groups, e.items, d, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r($e, {})
    ] }, d)) })
  ] });
}
const li = b.forwardRef(
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
function qm({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ w(li, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      uo,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(il, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        uo,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ll, {}),
          className: "tw-h-full"
        }
      ),
      d
    ] })
  ] });
}
function Hm({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(li, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    uo,
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
const ci = b.forwardRef(({ className: t, ...e }, n) => {
  const o = _t();
  return /* @__PURE__ */ r(
    Jt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ci.displayName = Jt.List.displayName;
const di = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
di.displayName = Jt.List.displayName;
const Zp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), wi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Content,
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
wi.displayName = Jt.Content.displayName;
function Um({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ w("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        jo,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(ci, { children: [
      /* @__PURE__ */ r(di, { children: t.map((l) => /* @__PURE__ */ r(Zp, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(wi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Qp({ ...t }) {
  return /* @__PURE__ */ r(ft.Menu, { ...t });
}
function tu({ ...t }) {
  return /* @__PURE__ */ r(ft.Sub, { "data-slot": "menubar-sub", ...t });
}
const pi = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Ao.Provider, { value: a, children: /* @__PURE__ */ r(
    ft.Root,
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
pi.displayName = ft.Root.displayName;
const ui = b.forwardRef(({ className: t, ...e }, n) => {
  const o = me();
  return /* @__PURE__ */ r(
    ft.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Le({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ui.displayName = ft.Trigger.displayName;
const mi = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = me();
  return /* @__PURE__ */ w(
    ft.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Le({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(pn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
mi.displayName = ft.SubTrigger.displayName;
const fi = b.forwardRef(({ className: t, ...e }, n) => {
  const o = me();
  return /* @__PURE__ */ r(
    ft.SubContent,
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
fi.displayName = ft.SubContent.displayName;
const hi = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = me();
  return /* @__PURE__ */ r(ft.Portal, { children: /* @__PURE__ */ r(
    ft.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: h(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": i.variant === "muted"
        },
        t
      ),
      ...a
    }
  ) });
});
hi.displayName = ft.Content.displayName;
const gi = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = me();
  return /* @__PURE__ */ r(
    ft.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Le({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
gi.displayName = ft.Item.displayName;
const eu = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = me();
  return /* @__PURE__ */ w(
    ft.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Le({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
eu.displayName = ft.CheckboxItem.displayName;
const nu = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = me();
  return /* @__PURE__ */ w(
    ft.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Le({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
nu.displayName = ft.RadioItem.displayName;
const ru = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ft.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
ru.displayName = ft.Label.displayName;
const bi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
bi.displayName = ft.Separator.displayName;
const On = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, vi = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ w(Vt, { children: [
      /* @__PURE__ */ r(Bt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
        gi,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(hr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(hr, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ w(tu, { children: [
        /* @__PURE__ */ r(mi, { children: c.label }),
        /* @__PURE__ */ r(fi, { children: vi(
          t,
          e,
          si(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r($t, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && i < a.length - 1 && d.push(/* @__PURE__ */ r(bi, {}, `separator-${s}`)), d;
  });
};
function ou({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = q(void 0), s = q(void 0), i = q(void 0), l = q(void 0), d = q(void 0), c = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (Tc(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, m) => {
    var g, y, x, N;
    p.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        On(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), On(s, [f, u]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), On(i, [f, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), On(l, [f, u]);
        break;
      case "alt+h":
        (N = d.current) == null || N.focus(), On(d, [f, u]);
        break;
    }
  }), J(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const y = g.target.getAttribute("data-state");
          n(y === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(pi, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, m]) => typeof p == "boolean" || typeof m == "boolean" ? 0 : p.order - m.order).map(([p, m]) => /* @__PURE__ */ w(Qp, { children: [
      /* @__PURE__ */ r(ui, { ref: c(p), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        hi,
        {
          style: { zIndex: Kn },
          children: /* @__PURE__ */ r(Pt, { children: vi(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Ym(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Xm({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: c = "default"
}) {
  const p = q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    ou,
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
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
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
const au = (t, e) => t[e] ?? e;
function Wm({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: d
}) {
  const c = au(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, m] = D(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((y) => y !== g)]), s && n.find((y) => y === g) && s([...n.filter((y) => y !== g)]), m(!1);
  }, u = (g, y) => {
    var N, R, I, S, V, k;
    const x = y !== g ? ((R = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : R[y]) ?? ((S = (I = t[g]) == null ? void 0 : I.uiNames) == null ? void 0 : S.en) : void 0;
    return x ? `${(V = t[g]) == null ? void 0 : V.autonym} (${x})` : (k = t[g]) == null ? void 0 : k.autonym;
  };
  return /* @__PURE__ */ w("div", { id: d, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      hn,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: p,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(nn, { children: /* @__PURE__ */ r(gn, {}) }),
          /* @__PURE__ */ r(
            rn,
            {
              style: { zIndex: Kn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(oe, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(Tt, { className: "tw-font-normal tw-text-muted-foreground", children: Qe(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function su({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Tt, { children: e(t) }) : n ? /* @__PURE__ */ r(Tt, { children: n(t) }) : /* @__PURE__ */ r(Tt, { children: t });
}
function Jm({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ w("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      $o,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => a(l, d)
      }
    ),
    /* @__PURE__ */ r(
      su,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Zm({
  scrRef: t,
  onClick: e,
  tooltipContent: n,
  ariaLabel: o,
  className: a,
  testId: s = "linked-scr-ref-button"
}) {
  if (t === "") return;
  const i = /* @__PURE__ */ r(
    F,
    {
      type: "button",
      variant: "link",
      onClick: e,
      disabled: !e,
      "aria-label": o,
      className: h(
        // Tight, inline link-button styling — no extra padding / height. Consumers can override
        // typography (font, size) via the `className` prop.
        "tw-h-auto tw-p-0 tw-text-start tw-font-mono tw-text-sm",
        a
      ),
      "data-testid": s,
      children: t
    }
  );
  return n ? /* @__PURE__ */ r(Pt, { delayDuration: 0, children: /* @__PURE__ */ w(Vt, { children: [
    /* @__PURE__ */ r(Bt, { asChild: !0, children: i }),
    /* @__PURE__ */ r($t, { children: n })
  ] }) }) : i;
}
function Qm({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  selectedButtons: l,
  hoverButtons: d,
  dropdownContent: c,
  additionalContent: p,
  accentColor: m,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ w(
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
        s
      ),
      children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && l,
            !e && d && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: d }),
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ w(ke, { children: [
              /* @__PURE__ */ r(Pe, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Uo, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ w(ke, { children: [
              /* @__PURE__ */ r(Pe, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Uo, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
            ] })
          ] }),
          p && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: p })
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
const iu = zn(({ className: t, ...e }, n) => /* @__PURE__ */ r(cl, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
iu.displayName = "Spinner";
function tf({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: d,
  defaultValue: c,
  value: p,
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ w("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      Tt,
      {
        htmlFor: t,
        className: h({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      _n,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: h(d, { "tw-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const lu = He(
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
), cu = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      lu({ variant: e }),
      t
    ),
    ...n
  }
));
cu.displayName = "Alert";
const du = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ w(
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
du.displayName = "AlertTitle";
const wu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
wu.displayName = "AlertDescription";
const ef = ht.Root, nf = ht.Trigger, rf = ht.Group, of = ht.Portal, af = ht.Sub, sf = ht.RadioGroup, pu = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
  ht.SubTrigger,
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
      /* @__PURE__ */ r(pn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
pu.displayName = ht.SubTrigger.displayName;
const uu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ht.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
uu.displayName = ht.SubContent.displayName;
const mu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ht.Portal, { children: /* @__PURE__ */ r(
  ht.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
mu.displayName = ht.Content.displayName;
const fu = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ht.Item,
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
fu.displayName = ht.Item.displayName;
const hu = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
  ht.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(Yt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
hu.displayName = ht.CheckboxItem.displayName;
const gu = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  ht.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
gu.displayName = ht.RadioItem.displayName;
const bu = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ht.Label,
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
bu.displayName = ht.Label.displayName;
const vu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ht.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
vu.displayName = ht.Separator.displayName;
function xu({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
xu.displayName = "ContextMenuShortcut";
const xi = b.createContext({
  direction: "bottom"
});
function yu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(xi.Provider, { value: o, children: /* @__PURE__ */ r(
    we.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
yu.displayName = "Drawer";
const lf = we.Trigger, Nu = we.Portal, cf = we.Close, yi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  we.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
yi.displayName = we.Overlay.displayName;
const ku = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(xi), i = {
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
  return /* @__PURE__ */ w(Nu, { children: [
    /* @__PURE__ */ r(yi, {}),
    /* @__PURE__ */ w(
      we.Content,
      {
        ref: a,
        className: h(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          t
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: l[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: l[s] })
        ]
      }
    )
  ] });
});
ku.displayName = "DrawerContent";
function _u({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
_u.displayName = "DrawerHeader";
function Cu({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Cu.displayName = "DrawerFooter";
const Eu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  we.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Eu.displayName = we.Title.displayName;
const Tu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  we.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Tu.displayName = we.Description.displayName;
const Su = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Qr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Qr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Su.displayName = Qr.Root.displayName;
function df({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    xo.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const wf = xo.Panel;
function pf({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    xo.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(dl, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function uf({ ...t }) {
  return /* @__PURE__ */ r(
    Sc,
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
const Ru = b.forwardRef(({ className: t, ...e }, n) => {
  const o = _t();
  return /* @__PURE__ */ w(
    Mn.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Mn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Mn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Mn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Ru.displayName = Mn.Root.displayName;
const Iu = b.forwardRef(({ className: t, ...e }, n) => {
  const o = _t();
  return /* @__PURE__ */ r(
    to.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        to.Thumb,
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
Iu.displayName = to.Root.displayName;
const mf = Jt.Root, Du = b.forwardRef(({ className: t, ...e }, n) => {
  const o = _t();
  return /* @__PURE__ */ r(
    Jt.List,
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
Du.displayName = Jt.List.displayName;
const Ou = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Ou.displayName = Jt.Trigger.displayName;
const Mu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Mu.displayName = Jt.Content.displayName;
const Au = b.forwardRef(
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
Au.displayName = "Textarea";
const ff = (t, e) => {
  J(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Pu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const $u = (t, e, n = {}) => {
  const o = q(e);
  o.current = e;
  const a = q(n);
  a.current = Pu(a.current);
  const [s, i] = D(() => o.current), [l, d] = D(!0);
  return J(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const p = await t();
        c && (i(() => p), d(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, l];
}, qr = () => !1, hf = (t, e) => {
  const [n] = $u(
    G(async () => {
      if (!t) return qr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    qr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  J(() => () => {
    n !== qr && n();
  }, [n]);
};
function gf(t) {
  J(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function ju(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
ju(`*, ::before, ::after {
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
.tw-w-16 {
  width: 4rem;
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
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[320px\\] {
  width: 320px;
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
.tw-w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\] {
  width: var(--radix-dropdown-menu-trigger-width);
}
.tw-w-\\[var\\(--radix-popper-anchor-width\\,280px\\)\\] {
  width: var(--radix-popper-anchor-width,280px);
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
.tw-min-w-\\[200px\\] {
  min-width: 200px;
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
.tw-max-w-\\[280px\\] {
  max-width: 280px;
}
.tw-max-w-\\[calc\\(100vw-2rem\\)\\] {
  max-width: calc(100vw - 2rem);
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
.tw-max-w-xs {
  max-width: 20rem;
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
.tw-cursor-not-allowed {
  cursor: not-allowed;
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
.tw-pb-1 {
  padding-bottom: 0.25rem;
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
.tw-pe-4 {
  padding-inline-end: 1rem;
}
.tw-pe-8 {
  padding-inline-end: 2rem;
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
.tw-ps-2 {
  padding-inline-start: 0.5rem;
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
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
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
.tw-opacity-40 {
  opacity: 0.4;
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
.tw-\\@container {
  container-type: inline-size;
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
.hover\\:tw-bg-accent\\/80:hover {
  background-color: hsl(var(--accent) / 0.8);
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
.data-\\[highlighted\\]\\:tw-bg-accent[data-highlighted] {
  background-color: hsl(var(--accent));
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
.data-\\[highlighted\\]\\:tw-text-accent-foreground[data-highlighted] {
  color: hsl(var(--accent-foreground));
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
@container (min-width: 250px) {

  .\\@\\[250px\\]\\:tw-block {
    display: block;
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
  cu as Alert,
  wu as AlertDescription,
  du as AlertTitle,
  Gs as Avatar,
  Fs as AvatarFallback,
  yw as AvatarImage,
  wm as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  pm as BOOK_SELECTOR_STRING_KEYS,
  Ne as Badge,
  Dr as BookChapterControl,
  oo as BookSelectionMode,
  um as BookSelector,
  F as Button,
  fm as COMMENT_EDITOR_STRING_KEYS,
  hm as COMMENT_LIST_STRING_KEYS,
  Vs as Card,
  Bs as CardContent,
  vw as CardDescription,
  xw as CardFooter,
  gw as CardHeader,
  bw as CardTitle,
  Hc as ChapterRangeSelector,
  $o as Checkbox,
  Jm as Checklist,
  ro as ComboBox,
  _e as Command,
  Nn as CommandEmpty,
  ce as CommandGroup,
  an as CommandInput,
  pe as CommandItem,
  Ce as CommandList,
  mm as CommentEditor,
  gm as CommentList,
  ef as ContextMenu,
  hu as ContextMenuCheckboxItem,
  mu as ContextMenuContent,
  rf as ContextMenuGroup,
  fu as ContextMenuItem,
  bu as ContextMenuLabel,
  of as ContextMenuPortal,
  sf as ContextMenuRadioGroup,
  gu as ContextMenuRadioItem,
  vu as ContextMenuSeparator,
  xu as ContextMenuShortcut,
  af as ContextMenuSub,
  uu as ContextMenuSubContent,
  pu as ContextMenuSubTrigger,
  nf as ContextMenuTrigger,
  Vw as DataTable,
  eo as Dialog,
  cm as DialogClose,
  ir as DialogContent,
  Pc as DialogDescription,
  no as DialogFooter,
  lr as DialogHeader,
  os as DialogOverlay,
  Ac as DialogPortal,
  cr as DialogTitle,
  lm as DialogTrigger,
  yu as Drawer,
  cf as DrawerClose,
  ku as DrawerContent,
  Tu as DrawerDescription,
  Cu as DrawerFooter,
  _u as DrawerHeader,
  yi as DrawerOverlay,
  Nu as DrawerPortal,
  Eu as DrawerTitle,
  lf as DrawerTrigger,
  ke as DropdownMenu,
  le as DropdownMenuCheckboxItem,
  de as DropdownMenuContent,
  zs as DropdownMenuGroup,
  Ke as DropdownMenuItem,
  Fw as DropdownMenuItemType,
  qe as DropdownMenuLabel,
  Nw as DropdownMenuPortal,
  _w as DropdownMenuRadioGroup,
  Hs as DropdownMenuRadioItem,
  $e as DropdownMenuSeparator,
  Cw as DropdownMenuShortcut,
  kw as DropdownMenuSub,
  qs as DropdownMenuSubContent,
  Ks as DropdownMenuSubTrigger,
  Pe as DropdownMenuTrigger,
  Bw as ERROR_DUMP_STRING_KEYS,
  vm as ERROR_POPOVER_STRING_KEYS,
  Uw as EditorKeyboardShortcuts,
  Gw as ErrorDump,
  xm as ErrorPopover,
  Em as FOOTNOTE_EDITOR_STRING_KEYS,
  _m as Filter,
  ym as FilterDropdown,
  km as Footer,
  Cm as FootnoteEditor,
  lp as FootnoteItem,
  Tm as FootnoteList,
  Am as INVENTORY_STRING_KEYS,
  _n as Input,
  Pm as Inventory,
  Tt as Label,
  Zm as LinkedScrRefButton,
  Qw as MARKER_MENU_STRING_KEYS,
  bm as MarkdownRenderer,
  ep as MarkerMenu,
  Nm as MoreInfo,
  Kw as MultiSelectComboBox,
  Um as NavigationContentSearch,
  Ee as Popover,
  jc as PopoverAnchor,
  ue as PopoverContent,
  Rr as PopoverPortalContainerProvider,
  je as PopoverTrigger,
  Su as Progress,
  $m as ProjectSelector,
  _o as RadioGroup,
  dr as RadioGroupItem,
  Lc as RecentSearches,
  pf as ResizableHandle,
  wf as ResizablePanel,
  df as ResizablePanelGroup,
  Qm as ResultsCard,
  Vm as SCOPE_SELECTOR_STRING_KEYS,
  Bm as ScopeSelector,
  Lm as ScriptureResultsViewer,
  Gm as ScrollGroupSelector,
  jo as SearchBar,
  hn as Select,
  rn as SelectContent,
  Sw as SelectGroup,
  oe as SelectItem,
  Iw as SelectLabel,
  Ys as SelectScrollDownButton,
  Us as SelectScrollUpButton,
  Dw as SelectSeparator,
  nn as SelectTrigger,
  gn as SelectValue,
  fn as Separator,
  Fm as SettingsList,
  Km as SettingsListHeader,
  zm as SettingsListItem,
  Gp as SettingsSidebar,
  jm as SettingsSidebarContentSearch,
  Zs as Sidebar,
  ti as SidebarContent,
  Dp as SidebarFooter,
  co as SidebarGroup,
  Mp as SidebarGroupAction,
  po as SidebarGroupContent,
  wo as SidebarGroupLabel,
  Ip as SidebarHeader,
  Rp as SidebarInput,
  Qs as SidebarInset,
  ei as SidebarMenu,
  Pp as SidebarMenuAction,
  $p as SidebarMenuBadge,
  ri as SidebarMenuButton,
  ni as SidebarMenuItem,
  jp as SidebarMenuSkeleton,
  Lp as SidebarMenuSub,
  Bp as SidebarMenuSubButton,
  Vp as SidebarMenuSubItem,
  Js as SidebarProvider,
  Sp as SidebarRail,
  Op as SidebarSeparator,
  Tp as SidebarTrigger,
  lo as Skeleton,
  Ru as Slider,
  uf as Sonner,
  iu as Spinner,
  Iu as Switch,
  uo as TabDropdownMenu,
  Hm as TabFloatingMenu,
  qm as TabToolbar,
  Nr as Table,
  _r as TableBody,
  Lw as TableCaption,
  tn as TableCell,
  Aw as TableFooter,
  Gn as TableHead,
  kr as TableHeader,
  Se as TableRow,
  mf as Tabs,
  Mu as TabsContent,
  Du as TabsList,
  Ou as TabsTrigger,
  tf as TextField,
  Au as Textarea,
  Do as ToggleGroup,
  jn as ToggleGroupItem,
  Xm as Toolbar,
  Vt as Tooltip,
  $t as TooltipContent,
  Pt as TooltipProvider,
  Bt as TooltipTrigger,
  qw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Wm as UiLanguageSelector,
  Hw as UndoRedoButtons,
  ci as VerticalTabs,
  wi as VerticalTabsContent,
  di as VerticalTabsList,
  Zp as VerticalTabsTrigger,
  Kn as Z_INDEX_ABOVE_DOCK,
  rs as Z_INDEX_FOOTNOTE_EDITOR,
  Dc as Z_INDEX_MODAL,
  Ic as Z_INDEX_MODAL_BACKDROP,
  yo as Z_INDEX_OVERLAY,
  Oc as Z_INDEX_TOOLTIP,
  hw as badgeVariants,
  cs as buttonVariants,
  h as cn,
  Gr as computeRows,
  Mm as getBookIdFromUSFM,
  Cr as getInventoryHeader,
  Dm as getLinesFromUSFM,
  Om as getNumberFromUSFM,
  up as getStatusForItem,
  Ym as getToolbarOSReservedSpaceClassName,
  Rm as inventoryCountColumn,
  Sm as inventoryItemColumn,
  Im as inventoryStatusColumn,
  gp as partitionAndSort,
  Fn as scrollGroupLetter,
  Rw as selectTriggerVariants,
  xf as sonner,
  ff as useEvent,
  hf as useEventAsync,
  fw as useListbox,
  $u as usePromise,
  dm as useRecentSearches,
  Er as useSidebar,
  gf as useStylesheet
};
//# sourceMappingURL=index.js.map
