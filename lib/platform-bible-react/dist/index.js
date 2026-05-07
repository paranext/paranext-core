var Si = Object.defineProperty;
var Ri = (t, e, n) => e in t ? Si(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Kt = (t, e, n) => Ri(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as w, Fragment as st } from "react/jsx-runtime";
import v, { forwardRef as Fn, useRef as q, useMemo as z, useState as D, useCallback as G, useEffect as J, useLayoutEffect as te, createContext as gr, useContext as uo, Component as Ii, createElement as Fo, Suspense as Di, Fragment as mo } from "react";
import { Command as Xt } from "cmdk";
import { X as gn, Search as Ea, Check as Ut, Clock as zo, ChevronsLeft as Ko, ChevronsRight as qo, ChevronLeft as qr, ChevronRight as wn, ArrowLeft as Oi, ArrowRight as Ta, Circle as br, ChevronDown as De, BoldIcon as Mi, ItalicIcon as Ai, AtSign as Sa, Pencil as Pi, Trash2 as $i, ArrowUp as Ra, MoreHorizontal as ji, MailOpen as Li, Mail as Vi, ChevronUp as Ia, FilterIcon as Bi, ArrowLeftIcon as Gi, ChevronLeftIcon as Fi, ChevronRightIcon as zi, ArrowRightIcon as Ki, ChevronsUpDown as fo, Filter as Da, Copy as Oa, User as qi, Link as Hi, CircleHelp as Ui, Star as Yi, Undo as Xi, Redo as Wi, SquareX as Ma, FunctionSquare as Aa, SquareSigma as Pa, Ban as Ji, AlertCircle as Hr, CircleCheckIcon as Zi, CircleXIcon as Qi, CircleHelpIcon as tl, ArrowUpIcon as el, ArrowDownIcon as nl, PanelLeft as rl, PanelRight as ol, ScrollText as al, MenuIcon as sl, Menu as il, EllipsisVertical as ll, MoreVertical as Ho, LoaderCircle as cl, GripVertical as dl } from "lucide-react";
import { clsx as wl } from "clsx";
import { extendTailwindMerge as pl } from "tailwind-merge";
import * as ee from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as Xn, Section as Q, getChaptersForBook as ul, formatScrRef as Se, getSectionForBook as Mn, formatRelativeDate as ml, formatReplacementString as Ze, sanitizeHtml as fl, DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS as tr, getLocalizeKeyForScrollGroupId as Ur, NumberFormat as hl, formatBytes as gl, getCurrentLocale as bl, usfmMarkers as er, getFormatCallerFunction as vl, deepEqual as xl, isString as Uo, compareScrRefs as Yr, scrRefToBBBCCCVVV as Tr, defaultScrRef as Sr, formatScrRefRange as yl } from "platform-bible-utils";
import { Slot as bn } from "@radix-ui/react-slot";
import { cva as qe } from "class-variance-authority";
import * as pn from "@radix-ui/react-popover";
import * as $a from "@radix-ui/react-label";
import * as jn from "@radix-ui/react-radio-group";
import { createEditor as ja, $getRoot as Oe, $createParagraphNode as vn, $getSelection as Yt, HISTORY_MERGE_TAG as ho, ParagraphNode as La, TextNode as Va, $isTokenOrSegmented as Nl, $getCharacterOffsets as kl, $cloneWithPropertiesEphemeral as _l, $getPreviousSelection as Cl, $isRangeSelection as ve, $caretFromPoint as El, $getSiblingCaret as Ba, $getChildCaret as Tl, $getAdjacentChildCaret as Sl, $isChildCaret as Rl, $normalizeCaret as Il, $setSelectionFromCaretRange as Dl, $getCollapsedCaretRange as Ol, $getCaretInDirection as Yo, $splitAtPointCaretNext as Ml, $isTextPointCaret as Al, $findMatchingParent as Ga, $isElementNode as Re, mergeRegister as Me, getDOMTextNode as Pl, isHTMLElement as Fa, CLEAR_EDITOR_COMMAND as za, COMMAND_PRIORITY_EDITOR as go, shallowMergeConfig as $l, defineExtension as oe, safeCast as rn, createState as jl, FORMAT_TEXT_COMMAND as Ka, $isNodeSelection as qa, COMMAND_PRIORITY_LOW as Ha, RootNode as Ll, LineBreakNode as Vl, TabNode as Bl, $isEditorState as Gl, createCommand as Fl, CLICK_COMMAND as zl, isDOMNode as Kl, $getNodeFromDOMNode as ql, $createNodeSelection as Hl, $setSelection as Ul, $getEditor as Yl, DecoratorNode as Xr, $getState as Xl, toggleTextFormatType as Xo, TEXT_TYPE_TO_FORMAT as Wl, $setState as Jl, addClassNamesToElement as Ua, $create as Zl, $getNodeByKey as Ql, removeClassNamesFromElement as tc, KEY_TAB_COMMAND as ec, $isBlockElementNode as ar, $createRangeSelection as nc, $normalizeSelection__EXPERIMENTAL as rc, OUTDENT_CONTENT_COMMAND as oc, INDENT_CONTENT_COMMAND as Wo, INSERT_TAB_COMMAND as ac, COMMAND_PRIORITY_CRITICAL as bo, $isDecoratorNode as sc, $isParagraphNode as ic, $isTextNode as sr, SELECTION_CHANGE_COMMAND as Ya, getRegisteredNode as lc, isDocumentFragment as Jo, isDOMDocumentNode as cc, ArtificialNode__DO_NOT_USE as Xa, $createLineBreakNode as Wa, $isRootOrShadowRoot as dc, isBlockDomNode as Zo, isInlineDomNode as Qo, $insertNodes as wc } from "lexical";
import * as tn from "@radix-ui/react-tooltip";
import { TooltipTrigger as pc } from "@radix-ui/react-tooltip";
import { HeadingNode as uc, QuoteNode as mc, registerRichText as fc } from "@lexical/rich-text";
import { flushSync as hc, createPortal as gc } from "react-dom";
import { $isTableSelection as bc } from "@lexical/table";
import * as vr from "@radix-ui/react-toggle-group";
import * as Ja from "@radix-ui/react-toggle";
import { createHeadlessEditor as Za } from "@lexical/headless";
import * as Qa from "@radix-ui/react-separator";
import * as xn from "@radix-ui/react-avatar";
import * as ut from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as vc } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ts, getFilteredRowModel as xc, getSortedRowModel as es, getPaginationRowModel as yc, getCoreRowModel as ns, flexRender as An, getGroupedRowModel as Nc, getExpandedRowModel as kc } from "@tanstack/react-table";
import * as Nt from "@radix-ui/react-select";
import _c from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Wr, HIDDEN_NOTE_CALLER as Jr, getDefaultViewOptions as Cc, isInsertEmbedOpOfType as Wn, Editorial as Ec } from "@eten-tech-foundation/platform-editor";
import * as Zr from "@radix-ui/react-checkbox";
import * as Wt from "@radix-ui/react-tabs";
import * as mt from "@radix-ui/react-menubar";
import { useHotkeys as Tc } from "react-hotkeys-hook";
import * as ft from "@radix-ui/react-context-menu";
import { Drawer as de } from "vaul";
import * as Qr from "@radix-ui/react-progress";
import * as vo from "react-resizable-panels";
import { Toaster as Sc } from "sonner";
import { toast as xf } from "sonner";
import * as On from "@radix-ui/react-slider";
import * as to from "@radix-ui/react-switch";
const Rc = pl({ prefix: "tw-" });
function f(...t) {
  return Rc(wl(t));
}
const zn = 250, rs = 300, xo = 400, Ic = 450, Dc = 500, Oc = 550, Mc = "layoutDirection";
function kt() {
  const t = localStorage.getItem(Mc);
  return t === "rtl" ? t : "ltr";
}
const eo = ee.Root, cm = ee.Trigger, Ac = ee.Portal, dm = ee.Close, os = v.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  ee.Overlay,
  {
    ref: o,
    className: f(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: Ic, ...e },
    ...n
  }
));
os.displayName = ee.Overlay.displayName;
const ir = v.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = kt();
  return /* @__PURE__ */ w(Ac, { children: [
    /* @__PURE__ */ r(os, { className: n }),
    /* @__PURE__ */ w(
      ee.Content,
      {
        ref: s,
        className: f(
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
            ee.Close,
            {
              className: f(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": i === "ltr" },
                { "tw-left-4": i === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(gn, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
ir.displayName = ee.Content.displayName;
function lr({ className: t, ...e }) {
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
lr.displayName = "DialogHeader";
function no({ className: t, ...e }) {
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
no.displayName = "DialogFooter";
const cr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ee.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
cr.displayName = ee.Title.displayName;
const Pc = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ee.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Pc.displayName = ee.Description.displayName;
const ke = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt,
  {
    ref: n,
    className: f(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ke.displayName = Xt.displayName;
const on = v.forwardRef(({ className: t, onKeyDown: e, ...n }, o) => {
  const a = kt(), s = v.useCallback(
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
      Xt.Input,
      {
        ref: o,
        className: f(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        onKeyDown: s,
        ...n
      }
    )
  ] });
});
on.displayName = Xt.Input.displayName;
const _e = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.List,
  {
    ref: n,
    className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
_e.displayName = Xt.List.displayName;
const yn = v.forwardRef((t, e) => /* @__PURE__ */ r(Xt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
yn.displayName = Xt.Empty.displayName;
const le = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Group,
  {
    ref: n,
    className: f(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
le.displayName = Xt.Group.displayName;
const xr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
xr.displayName = Xt.Separator.displayName;
const we = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Item,
  {
    ref: n,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
we.displayName = Xt.Item.displayName;
function as({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
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
function Fe(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function yo(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const is = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), ae = Object.fromEntries(
  is.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function No(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = wt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(Xn(a.toLowerCase(), o) || Xn(t.toLowerCase(), o) || (s ? Xn(s.localizedName.toLowerCase(), o) || Xn(s.localizedId.toLowerCase(), o) : !1));
}
const ls = Fn(
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
    const m = q(!1), h = () => {
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
      () => Fe(t, l),
      [t, l]
    ), y = z(
      () => yo(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Q.OT,
            "tw-border-s-purple-200": a === Q.NT,
            "tw-border-s-indigo-200": a === Q.DC,
            "tw-border-s-amber-200": a === Q.Extra
          }
        ),
        children: /* @__PURE__ */ w(
          we,
          {
            ref: p,
            value: d || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: u,
            role: "option",
            "aria-selected": e,
            "aria-disabled": c || void 0,
            "aria-label": `${wt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            disabled: c,
            className: f(s, c && "tw-cursor-not-allowed tw-opacity-50"),
            children: [
              i && /* @__PURE__ */ r(
                Ut,
                {
                  className: f(
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
), cs = qe(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? bn : "button", { className: f(cs({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const Ce = pn.Root, $e = pn.Trigger, jc = pn.Anchor, ds = v.createContext(null);
function Rr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(ds.Provider, { value: t, children: e });
}
const pe = v.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = kt(), l = v.useContext(ds);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(pn.Portal, { container: l ?? void 0, children: /* @__PURE__ */ r(
      pn.Content,
      {
        ref: s,
        align: e,
        sideOffset: n,
        className: f(
          "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
          t
        ),
        style: { zIndex: zn, ...o },
        ...a,
        dir: i
      }
    ) })
  );
});
pe.displayName = pn.Content.displayName;
function ws(t, e, n) {
  return `${t} ${ae[t]}${e ? ` ${yo(t, e)} ${Fe(t, e)}` : ""}`;
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
  const h = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ w(Ce, { open: p, onOpenChange: m, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": a,
        children: /* @__PURE__ */ r(zo, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(pe, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ke, { children: /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(le, { heading: s, children: t.map((u) => /* @__PURE__ */ w(
      we,
      {
        onSelect: () => h(u),
        className: f("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(zo, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function wm(t, e, n = (a, s) => a === s, o = 15) {
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
function ta(t, e) {
  return wt.bookIdToNumber(t) < wt.bookIdToNumber(e.book);
}
function Gc(t, e, n) {
  const o = wt.bookIdToNumber(t) - wt.bookIdToNumber(n.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < n.chapterNum;
}
function Ir(t, e, n, o) {
  const a = wt.bookIdToNumber(t) - wt.bookIdToNumber(o.book);
  return a < 0 ? !0 : a > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : n < o.verseNum;
}
function ea(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function be(t) {
  return ul(wt.bookIdToNumber(t));
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
        const m = e.filter((h) => No(h, l, n));
        if (m.length === 1 && ([p] = m), !p && d) {
          if (wt.isBookIdValid(l)) {
            const h = l.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && d) {
          const u = ((g) => Object.keys(ae).find(
            (y) => ae[y].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > be(p) && (h = Math.max(be(p), 1));
          const u = c ? parseInt(c, 10) : void 0;
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
        const c = e[d - 1], p = Math.max(be(c), 1);
        o({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = G(() => {
    const d = be(t.book);
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
      icon: n === "ltr" ? Ko : qo
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? qr : wn
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? wn : qr
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === be(t.book) || be(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? qo : Ko
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
    return /* @__PURE__ */ r(le, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", l), children: Array.from({ length: t }, (d, c) => c + 1).map((d) => {
      const c = (a == null ? void 0 : a(d)) ?? !1;
      return /* @__PURE__ */ r(
        we,
        {
          value: e(d),
          onSelect: () => {
            c || n(d);
          },
          ref: o(d),
          disabled: c,
          "aria-disabled": c || void 0,
          className: f(
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
function na({
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
        count: be(t),
        valueBuilder: (l) => `${t} ${ae[t] || ""} ${l}`,
        onSelect: n,
        itemRef: o,
        isDisabled: s,
        isDimmed: a,
        isSelected: (l) => t === e.book && l === e.chapterNum,
        className: i
      }
    );
}
function ra({
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
        valueBuilder: (c) => `${t} ${ae[t] || ""} ${e}:${c}`,
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
  triggerContent: h,
  triggerVariant: u = "outline",
  onOpenChange: g,
  onCloseAutoFocus: y,
  modal: x = !1,
  align: N = "center"
}) {
  const S = kt(), [E, C] = D(!1), [k, I] = D(""), [R, T] = D(""), [b, O] = D("books"), [$, V] = D(void 0), [A, j] = D(
    void 0
  ), [H, Y] = D(void 0), [tt, Tt] = D(!1), Bt = q(null), $t = q(!1), it = q(void 0), ht = q(void 0), K = q(void 0), nt = q(void 0), lt = q({}), rt = q({}), at = G(
    (_) => {
      e(_), l && l(_);
    },
    [e, l]
  ), Gt = z(() => o ? o() : is, [o]), It = z(() => ({
    [Q.OT]: Gt.filter((U) => wt.isBookOT(U)),
    [Q.NT]: Gt.filter((U) => wt.isBookNT(U)),
    [Q.DC]: Gt.filter((U) => wt.isBookDC(U)),
    [Q.Extra]: Gt.filter((U) => wt.extraBooks().includes(U))
  }), [Gt]), Ft = z(() => Object.values(It).flat(), [It]), me = z(() => {
    if (!R.trim()) return It;
    const _ = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((Z) => {
      _[Z] = It[Z].filter((Rt) => No(Rt, R, a));
    }), _;
  }, [It, R, a]), P = z(
    () => Fc(R, Ft, a),
    [R, Ft, a]
  ), Jt = q(!1);
  J(() => {
    if (!Jt.current) {
      Jt.current = !0;
      return;
    }
    g == null || g(E);
  }, [E, g]);
  const fe = G(() => {
    if (P) {
      const _ = P.chapterNum ?? 1, U = P.verseNum ?? 1;
      if (p && Ir(P.book, _, U, p))
        return;
      at({
        book: P.book,
        chapterNum: _,
        verseNum: U
      }), C(!1), T(""), I("");
    }
  }, [at, P, p]), Dt = G(
    (_) => {
      const U = A ?? (P == null ? void 0 : P.book), Z = H ?? (P == null ? void 0 : P.chapterNum);
      !U || !Z || (at({
        book: U,
        chapterNum: Z,
        verseNum: _
      }), C(!1));
    },
    [at, A, H, P]
  ), B = G(
    (_) => {
      if (p && ta(_, p)) return;
      if (be(_) <= 1) {
        at({
          book: _,
          chapterNum: 1,
          verseNum: 1
        }), C(!1), T("");
        return;
      }
      V(_), O("chapters");
    },
    [at, p]
  ), X = G(
    (_) => {
      const U = b === "chapters" ? $ : P == null ? void 0 : P.book;
      if (U) {
        if (c && c(U, _) > 1) {
          j(U), Y(_), O("verses"), I("");
          return;
        }
        at({
          book: U,
          chapterNum: _,
          verseNum: 1
        }), C(!1);
      }
    },
    [at, b, $, P, c]
  ), et = G(
    (_) => {
      at(_), C(!1), T("");
    },
    [at]
  ), ct = zc(t, Ft, S, e), vt = G(() => {
    O("books"), V(void 0), j(void 0), Y(void 0), setTimeout(() => {
      ht.current && ht.current.focus();
    }, 0);
  }, []), xt = G(() => {
    const _ = A;
    j(void 0), Y(void 0), _ ? (V(_), O("chapters"), I("")) : vt();
  }, [A, vt]), St = G((_) => {
    C(_), _ && (O("books"), V(void 0), j(void 0), Y(void 0), T(""));
  }, []), { otLong: gt, ntLong: _t, dcLong: jt, extraLong: M } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, yt = G(
    (_) => ss(_, gt, _t, jt, M),
    [gt, _t, jt, M]
  ), pt = G(
    (_) => P ? !!P.chapterNum && !_.toString().includes(P.chapterNum.toString()) : !1,
    [P]
  ), Le = z(
    () => Se(
      t,
      a ? Fe(t.book, a) : "English"
    ),
    [t, a]
  ), He = G((_) => (U) => {
    lt.current[_] = U;
  }, []), Ue = G((_) => (U) => {
    rt.current[_] = U;
  }, []), an = z(
    () => Bc(R),
    [R]
  ), Ve = z(() => !c || !P || !P.chapterNum || !an ? !1 : c(P.book, P.chapterNum) > 0, [c, P, an]), _n = G(
    (_) => p ? ta(_, p) : !1,
    [p]
  ), Be = G(
    (_) => (U) => p ? Gc(_, U, p) : !1,
    [p]
  ), Cn = G(
    (_, U) => (Z) => p ? Ir(_, U, Z, p) : !1,
    [p]
  ), Ye = (s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", En = (s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", Tn = G(
    (_) => {
      (_.key === "Home" || _.key === "End") && _.stopPropagation(), m && m.includes(_.key) && P && P.chapterNum !== void 0 && P.verseNum !== void 0 && (_.preventDefault(), _.stopPropagation(), fe());
    },
    [m, P, fe]
  ), Kn = G(
    (_) => {
      var ne, sn, Sn;
      if (_.ctrlKey) return;
      const { isLetter: U, isDigit: Z } = ea(_.key);
      if ((b === "chapters" || b === "verses") && (_.key === " " || _.key === "Enter")) {
        const zt = _.target instanceof HTMLElement ? _.target : void 0;
        if (!!(zt != null && zt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          _.stopPropagation();
          return;
        }
        const Ot = (ne = it.current) == null ? void 0 : ne.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Ot) {
          _.preventDefault(), _.stopPropagation(), Ot.click();
          return;
        }
      }
      if ((b === "chapters" || b === "verses") && (U || Z)) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      if (b === "chapters" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), vt();
        return;
      }
      if (b === "verses" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), xt();
        return;
      }
      const Rt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(_.key);
      if (b === "verses" && Rt) {
        const zt = A, Ct = H;
        if (!zt || !Ct || !c) return;
        const Ot = c(zt, Ct);
        if (!Ot) return;
        (sn = it.current) == null || sn.focus();
        const bt = (() => {
          if (!k) return 1;
          const Xe = k.match(/:(\d+)$/);
          return Xe ? parseInt(Xe[1], 10) : 0;
        })();
        let Zt = bt;
        const Qt = 6;
        switch (_.key) {
          case "ArrowLeft":
            bt !== 0 && (Zt = bt > 1 ? bt - 1 : Ot);
            break;
          case "ArrowRight":
            bt !== 0 && (Zt = bt < Ot ? bt + 1 : 1);
            break;
          case "ArrowUp":
            Zt = bt === 0 ? Ot : Math.max(1, bt - Qt);
            break;
          case "ArrowDown":
            Zt = bt === 0 ? 1 : Math.min(Ot, bt + Qt);
            break;
          default:
            return;
        }
        Zt !== bt && (_.preventDefault(), _.stopPropagation(), I(
          `${zt} ${ae[zt] || ""} ${Ct}:${Zt}`
        ), setTimeout(() => {
          const Xe = rt.current[Zt];
          Xe && Xe.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((b === "chapters" || b === "books" && P) && Rt) {
        const zt = b === "chapters" ? $ : P == null ? void 0 : P.book;
        if (!zt) return;
        b === "chapters" && ((Sn = it.current) == null || Sn.focus());
        const Ct = (() => {
          if (!k) return 1;
          const Qt = k.match(/(\d+)$/);
          return Qt ? parseInt(Qt[1], 10) : 0;
        })(), Ot = be(zt);
        if (!Ot) return;
        let bt = Ct;
        const Zt = 6;
        switch (_.key) {
          case "ArrowLeft":
            Ct !== 0 && (bt = Ct > 1 ? Ct - 1 : Ot);
            break;
          case "ArrowRight":
            Ct !== 0 && (bt = Ct < Ot ? Ct + 1 : 1);
            break;
          case "ArrowUp":
            bt = Ct === 0 ? Ot : Math.max(1, Ct - Zt);
            break;
          case "ArrowDown":
            bt = Ct === 0 ? 1 : Math.min(Ot, Ct + Zt);
            break;
          default:
            return;
        }
        bt !== Ct && (_.preventDefault(), _.stopPropagation(), I(
          `${zt} ${ae[zt] || ""} ${bt}`
        ), setTimeout(() => {
          const Qt = lt.current[bt];
          Qt && Qt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      P,
      vt,
      xt,
      $,
      A,
      H,
      c,
      k
    ]
  ), qn = G((_) => {
    var Rt;
    if (_.shiftKey || _.key === "Tab" || _.key === " ") return;
    if (_.key === "Enter") {
      _.stopPropagation();
      return;
    }
    if (_.key === "ArrowUp" || _.key === "ArrowDown") {
      (Rt = ht.current) == null || Rt.focus();
      return;
    }
    const { isLetter: U, isDigit: Z } = ea(_.key);
    (U || Z) && (_.preventDefault(), T((ne) => ne + _.key), ht.current.focus(), Tt(!1));
  }, []);
  return te(() => {
    const _ = setTimeout(() => {
      if (E && b === "books" && K.current && nt.current) {
        const U = K.current, Z = nt.current, Rt = Z.offsetTop, ne = U.clientHeight, sn = Z.clientHeight, Sn = Rt - ne / 2 + sn / 2;
        U.scrollTo({
          top: Math.max(0, Sn),
          behavior: "smooth"
        }), I(ws(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(_);
    };
  }, [E, b, R, P, t.book]), te(() => {
    if (b === "chapters" && $) {
      const _ = $ === t.book, U = _ ? t.chapterNum : 1;
      I(
        `${$} ${ae[$] || ""} ${U}`
      ), setTimeout(() => {
        if (K.current)
          if (_) {
            const Z = lt.current[t.chapterNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        it.current && it.current.focus();
      }, 0);
    }
  }, [b, $, P, t.book, t.chapterNum]), te(() => {
    if (b === "verses" && A && H !== void 0) {
      const _ = A === t.book && H === t.chapterNum, U = _ ? t.verseNum : 1;
      I(
        `${A} ${ae[A] || ""} ${H}:${U}`
      ), setTimeout(() => {
        if (K.current)
          if (_) {
            const Z = rt.current[t.verseNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        it.current && it.current.focus();
      }, 0);
    }
  }, [
    b,
    A,
    H,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ w(Ce, { open: E, onOpenChange: St, modal: x, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        ref: Bt,
        "aria-label": "book-chapter-trigger",
        variant: u,
        role: "combobox",
        "aria-expanded": E,
        className: f(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        onClick: (_) => {
          $t.current && ($t.current = !1, _.preventDefault());
        },
        children: h ?? /* @__PURE__ */ r("span", { className: "tw-truncate", children: Le })
      }
    ) }),
    /* @__PURE__ */ r(
      pe,
      {
        id: d,
        className: "tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",
        align: N,
        onKeyDownCapture: Kn,
        onKeyDown: (_) => _.stopPropagation(),
        onPointerDownOutside: (_) => {
          const { target: U } = _;
          E && Bt.current && U instanceof Node && Bt.current.contains(U) && ($t.current = !0, St(!1));
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ w(
          ke,
          {
            ref: it,
            loop: !0,
            value: k,
            onValueChange: I,
            shouldFilter: !1,
            children: [
              b === "books" ? /* @__PURE__ */ w("div", { className: "tw-flex tw-items-end", children: [
                /* @__PURE__ */ w("div", { className: "tw-relative tw-flex-1", children: [
                  /* @__PURE__ */ r(
                    on,
                    {
                      ref: ht,
                      value: R,
                      onValueChange: T,
                      onKeyDown: Tn,
                      onFocus: () => Tt(!1),
                      className: i && i.length > 0 ? "!tw-pr-10" : ""
                    }
                  ),
                  i && i.length > 0 && /* @__PURE__ */ r(
                    Lc,
                    {
                      recentSearches: i,
                      onSearchItemSelect: et,
                      renderItem: (_) => Se(_, "English"),
                      getItemKey: (_) => `${_.book}-${_.chapterNum}-${_.verseNum}`,
                      ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                      groupHeading: s == null ? void 0 : s["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: ct.map(({ onClick: _, disabled: U, title: Z, icon: Rt }) => /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      Tt(!0), _();
                    },
                    disabled: U,
                    className: "tw-h-10 tw-w-4 tw-p-0",
                    title: Z,
                    onKeyDown: qn,
                    children: /* @__PURE__ */ r(Rt, {})
                  },
                  Z
                )) })
              ] }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
                /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: b === "verses" ? xt : vt,
                    className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                    children: S === "ltr" ? /* @__PURE__ */ r(Oi, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ta, { className: "tw-h-4 tw-w-4" })
                  }
                ),
                b === "chapters" && $ && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Fe($, a) }),
                b === "verses" && A && H !== void 0 && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: `${Fe(A, a)} ${H}` }),
                /* @__PURE__ */ r(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",
                    children: b === "verses" ? En : Ye
                  }
                )
              ] }),
              !tt && /* @__PURE__ */ w(_e, { ref: K, children: [
                b === "books" && /* @__PURE__ */ w(st, { children: [
                  !P && Object.entries(me).map(([_, U]) => {
                    if (U.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ r(le, { heading: yt(_), children: U.map((Z) => /* @__PURE__ */ r(
                          ls,
                          {
                            bookId: Z,
                            onSelect: (Rt) => B(Rt),
                            section: Mn(Z),
                            commandValue: `${Z} ${ae[Z]}`,
                            ref: Z === t.book ? nt : void 0,
                            localizedBookNames: a,
                            disabled: _n(Z)
                          },
                          Z
                        )) }, _)
                      );
                  }),
                  P && /* @__PURE__ */ r(le, { children: /* @__PURE__ */ r(
                    we,
                    {
                      value: `${P.book} ${ae[P.book]} ${P.chapterNum || ""}:${P.verseNum || ""})}`,
                      onSelect: fe,
                      disabled: !!p && Ir(
                        P.book,
                        P.chapterNum ?? 1,
                        P.verseNum ?? 1,
                        p
                      ),
                      className: "tw-font-semibold tw-text-primary",
                      children: Se(
                        {
                          book: P.book,
                          chapterNum: P.chapterNum ?? 1,
                          verseNum: P.verseNum ?? 1
                        },
                        a ? yo(P.book, a) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  P && Ve && P.chapterNum && c && /* @__PURE__ */ w(st, { children: [
                    /* @__PURE__ */ w("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: `${Fe(P.book, a)} ${P.chapterNum}` }),
                      /* @__PURE__ */ r("span", { children: En })
                    ] }),
                    /* @__PURE__ */ r(
                      ra,
                      {
                        bookId: P.book,
                        chapterNum: P.chapterNum,
                        endVerse: c(P.book, P.chapterNum),
                        scrRef: t,
                        onVerseSelect: Dt,
                        setVerseRef: Ue,
                        isVerseDisabled: Cn(P.book, P.chapterNum),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] }),
                  P && !Ve && be(P.book) > 1 && /* @__PURE__ */ w(st, { children: [
                    /* @__PURE__ */ w("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: Fe(P.book, a) }),
                      /* @__PURE__ */ r("span", { children: Ye })
                    ] }),
                    /* @__PURE__ */ r(
                      na,
                      {
                        bookId: P.book,
                        scrRef: t,
                        onChapterSelect: X,
                        setChapterRef: He,
                        isChapterDimmed: pt,
                        isChapterDisabled: Be(P.book),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] })
                ] }),
                b === "chapters" && $ && /* @__PURE__ */ r(
                  na,
                  {
                    bookId: $,
                    scrRef: t,
                    onChapterSelect: X,
                    setChapterRef: He,
                    isChapterDisabled: Be($),
                    className: "tw-p-4"
                  }
                ),
                b === "verses" && A && H !== void 0 && c && /* @__PURE__ */ r(
                  ra,
                  {
                    bookId: A,
                    chapterNum: H,
                    endVerse: c(A, H),
                    scrRef: t,
                    onVerseSelect: Dt,
                    setVerseRef: Ue,
                    isVerseDisabled: Cn(
                      A,
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
const pm = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]), Kc = qe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Et = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r($a.Root, { ref: n, className: f("pr-twp", Kc(), t), ...e }));
Et.displayName = $a.Root.displayName;
const ko = v.forwardRef(({ className: t, ...e }, n) => {
  const o = kt();
  return /* @__PURE__ */ r(
    jn.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
ko.displayName = jn.Root.displayName;
const dr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jn.Item,
  {
    ref: n,
    className: f(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(jn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(br, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
dr.displayName = jn.Item.displayName;
function qc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function oa({
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
  textPlaceholder: h = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: y = "start",
  isDisabled: x = !1,
  ariaLabel: N,
  ...S
}) {
  const [E, C] = D(!1), k = c ?? d, I = (T) => T.length > 0 && typeof T[0] == "object" && "options" in T[0], R = (T, b) => {
    const O = d(T), $ = typeof T == "object" && "secondaryLabel" in T ? T.secondaryLabel : void 0, V = `${b ?? ""}${O}${$ ?? ""}`;
    return /* @__PURE__ */ w(
      we,
      {
        value: O,
        onSelect: () => {
          l(T), C(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Ut,
            {
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || d(i) !== O
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            O,
            $ && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              $
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ w(Ce, { open: E, onOpenChange: C, ...S, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": E,
        "aria-label": N,
        id: t,
        className: f(
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
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? k(i) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(De, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      pe,
      {
        align: y,
        className: f("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ w(ke, { children: [
          /* @__PURE__ */ r(on, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(yn, { children: u }),
          /* @__PURE__ */ r(_e, { children: I(e) ? e.map((T) => /* @__PURE__ */ r(le, { heading: T.groupHeading, children: T.options.map((b) => R(b, T.groupHeading)) }, T.groupHeading)) : e.map((T) => R(T)) })
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
  return /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ r(Et, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      oa,
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
    /* @__PURE__ */ r(Et, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      oa,
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
var ro = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ro || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ro || (ro = {}));
const um = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Or = (t, e) => t[e] ?? e;
function mm({
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
  const p = Or(c, "%webView_bookSelector_currentBook%"), m = Or(c, "%webView_bookSelector_choose%"), h = Or(c, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), y = (x) => {
    g(x), t(x);
  };
  return /* @__PURE__ */ r(
    ko,
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
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(Et, { className: "tw-flex tw-items-center", children: e }),
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
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(Et, { className: "tw-flex tw-items-center", children: o.map((x) => wt.bookIdToEnglishName(x)).join(", ") }),
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
function Ee() {
  const t = uo(us);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ms = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Yc = ms ? te : J, Jn = { tag: ho };
function Xc({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: d } = t, c = Uc(null, o), p = ja({ editable: t.editable, html: d, namespace: a, nodes: s, onError: (m) => i(m, p), theme: o });
    return function(m, h) {
      if (h !== null) {
        if (h === void 0) m.update(() => {
          const u = Oe();
          if (u.isEmpty()) {
            const g = vn();
            u.append(g);
            const y = ms ? document.activeElement : null;
            (Yt() !== null || y !== null && y === m.getRootElement()) && g.select();
          }
        }, Jn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = m.parseEditorState(h);
            m.setEditorState(u, Jn);
            break;
          }
          case "object":
            m.setEditorState(h, Jn);
            break;
          case "function":
            m.update(() => {
              Oe().isEmpty() && h(m);
            }, Jn);
        }
      }
    }(p, l), [p, c];
  }, []);
  return Yc(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(us.Provider, { value: n, children: e });
}
const Wc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? te : J;
function Jc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Ee();
  return Wc(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(ho) || l.isEmpty() || n(a, o, d);
    });
  }, [o, t, e, n]), null;
}
const _o = {
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
}, At = tn.Provider, Lt = tn.Root, Vt = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  tn.Trigger,
  {
    ref: o,
    className: e ? f(cs({ variant: e }), t) : t,
    ...n
  }
));
Vt.displayName = tn.Trigger.displayName;
const Pt = v.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(tn.Portal, { children: /* @__PURE__ */ r(
  tn.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: Oc, ...n },
    className: f(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
Pt.displayName = tn.Content.displayName;
const Co = [
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
        l = Fo(o, d);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Fo(Zc.Provider, {
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
const nd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? te : J;
function rd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function od() {
  return function(t) {
    const [e] = Ee(), n = z(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), s = q(o);
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
    const p = i[c], m = l && l.top <= p.top && l.top + l.height > p.top && l.left + l.width > p.left, h = p.width + s === o.width;
    m || h ? (i.splice(c--, 1), d--) : l = p;
  }
  return i;
}
function sd(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Nl(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), d = s.getNode(), c = e.is(l), p = e.is(d);
    if (c || p) {
      const [m, h] = kl(t), u = l.is(d), g = e.is(i ? d : l), y = e.is(i ? l : d);
      let x, N = 0;
      u ? (N = m > h ? h : m, x = m > h ? m : h) : g ? (N = i ? h : m, x = void 0) : y && (N = 0, x = i ? m : h);
      const S = e.__text.slice(N, x);
      S !== e.__text && (n === "clone" && (e = _l(e)), e.__text = S);
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
function ge(t) {
  return `${t}px`;
}
const ld = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function cd(t, e, n) {
  let o = null, a = null, s = null, i = [];
  const l = document.createElement("div");
  function d() {
    o === null && wr(182), a === null && wr(183);
    const { left: m, top: h } = a.getBoundingClientRect(), u = ad(t, e);
    var g, y;
    l.isConnected || (y = l, (g = a).insertBefore(y, g.firstChild));
    let x = !1;
    for (let N = 0; N < u.length; N++) {
      const S = u[N], E = i[N] || document.createElement("div"), C = E.style;
      C.position !== "absolute" && (C.position = "absolute", x = !0);
      const k = ge(S.left - m);
      C.left !== k && (C.left = k, x = !0);
      const I = ge(S.top - h);
      C.top !== I && (E.style.top = I, x = !0);
      const R = ge(S.width);
      C.width !== R && (E.style.width = R, x = !0);
      const T = ge(S.height);
      C.height !== T && (E.style.height = T, x = !0), E.parentNode !== l && (l.append(E), x = !0), i[N] = E;
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
    const h = t.getRootElement();
    if (h === null) return c();
    const u = h.parentElement;
    if (!Fa(u)) return c();
    c(), o = h, a = u, s = new MutationObserver((g) => {
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
  if (t.type !== "text" && Re(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Pl(n) || n, t.offset];
}
function dd(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== ge(-1.5) && (n.marginTop = ge(-1.5)), n.paddingTop !== ge(4) && (n.paddingTop = ge(4)), n.paddingBottom !== ge(0) && (n.paddingBottom = ge(0));
  }
}
function wd(t, e = dd) {
  let n = null, o = null, a = null, s = null, i = null, l = null, d = () => {
  };
  function c(p) {
    p.read(() => {
      const m = Yt();
      if (!ve(m)) return n = null, a = null, s = null, l = null, d(), void (d = () => {
      });
      const [h, u] = function(T) {
        const b = T.getStartEndPoints();
        return T.isBackward() ? [b[1], b[0]] : b;
      }(m), g = h.getNode(), y = g.getKey(), x = h.offset, N = u.getNode(), S = N.getKey(), E = u.offset, C = t.getElementByKey(y), k = t.getElementByKey(S), I = n === null || C !== o || x !== a || y !== n.getKey(), R = s === null || k !== i || E !== l || S !== s.getKey();
      if ((I || R) && C !== null && k !== null) {
        const T = function(b, O, $, V, A, j, H) {
          const Y = (b._window ? b._window.document : document).createRange();
          return Y.setStart(...aa(O, $, V)), Y.setEnd(...aa(A, j, H)), Y;
        }(t, h, g, C, u, N, k);
        d(), d = cd(t, T, e);
      }
      n = g, o = C, a = x, s = N, i = k, l = E;
    });
  }
  return c(t.getEditorState()), Me(t.registerUpdateListener(({ editorState: p }) => c(p)), () => {
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
  const e = Ga(t, (n) => Re(n) && !n.isInline());
  return Re(e) || wr(4, t.__key), e;
}
function md(t) {
  const e = Yt() || Cl();
  let n;
  if (ve(e)) n = El(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), l = i[i.length - 1];
      l && (n = Ba(l, "next"));
    }
    n = n || Tl(Oe(), "previous").getFlipped().insert(vn());
  }
  const o = fd(t, n), a = Sl(o), s = Rl(a) ? Il(a) : o;
  return Dl(Ol(s)), t.getLatest();
}
function fd(t, e, n) {
  let o = Yo(e, "next");
  for (let a = o; a; a = Ml(a, n)) o = a;
  return Al(o) && wr(283), o.insert(t.isInline() ? vn().append(t) : t), Yo(Ba(t.getLatest(), "next"), e.direction);
}
function hd(t) {
  const e = Yt();
  if (!ve(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Ga(s, (c) => Re(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
const gd = Symbol.for("preact-signals");
function yr() {
  if (Ie > 1) return void Ie--;
  let t, e = !1;
  for (!function() {
    let n = pr;
    for (pr = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); Pn !== void 0; ) {
    let n = Pn;
    for (Pn = void 0, ur++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && hs(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (ur = 0, Ie--, e) throw t;
}
function bd(t) {
  if (Ie > 0) return t();
  oo = ++vd, Ie++;
  try {
    return t();
  } finally {
    yr();
  }
}
let ot, Pn;
function sa(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let pr, Ie = 0, ur = 0, vd = 0, oo = 0, rr = 0;
function ia(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function qt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ln(t, e) {
  return new qt(t, e);
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
function We(t, e) {
  qt.call(this, void 0), this.x = t, this.s = void 0, this.g = rr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function xd(t, e) {
  return new We(t, e);
}
function bs(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ie++;
    const n = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Eo(t), o;
    } finally {
      ot = n, yr();
    }
  }
}
function Eo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, bs(t);
}
function yd(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  gs(this), ot = t, this.f &= -2, 8 & this.f && Eo(this), yr();
}
function cn(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function xe(t, e) {
  const n = new cn(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Nn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = Ln(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
qt.prototype.brand = gd, qt.prototype.h = function() {
  return !0;
}, qt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : sa(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, qt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && sa(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, qt.prototype.subscribe = function(t) {
  return xe(() => {
    const e = this.value, n = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = n;
    }
  }, { name: "sub" });
}, qt.prototype.valueOf = function() {
  return this.value;
}, qt.prototype.toString = function() {
  return this.value + "";
}, qt.prototype.toJSON = function() {
  return this.value;
}, qt.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(qt.prototype, "value", { get() {
  const t = ia(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ur > 100) throw new Error("Cycle detected");
    (function(e) {
      Ie !== 0 && ur === 0 && e.l !== oo && (e.l = oo, pr = { S: e, v: e.v, i: e.i, o: pr });
    })(this), this.v = t, this.i++, rr++, Ie++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      yr();
    }
  }
} }), We.prototype = new qt(), We.prototype.h = function() {
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
}, We.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  qt.prototype.S.call(this, t);
}, We.prototype.U = function(t) {
  if (this.t !== void 0 && (qt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, We.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(We.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = ia(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), cn.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, cn.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, bs(this), la(this), Ie++;
  const t = ot;
  return ot = this, yd.bind(this, t);
}, cn.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Pn, Pn = this);
}, cn.prototype.d = function() {
  this.f |= 8, 1 & this.f || Eo(this);
}, cn.prototype.dispose = function() {
  this.d();
};
oe({ build: (t, e, n) => Nn(e), config: rn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return xe(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function vs() {
  const t = Oe(), e = Yt(), n = vn();
  t.clear(), t.append(n), e !== null && n.select(), ve(e) && (e.format = 0);
}
function xs(t, e = vs) {
  return t.registerCommand(za, (n) => (t.update(e), !0), go);
}
oe({ build: (t, e, n) => Nn(e), config: rn({ $onClear: vs }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return xe(() => xs(t, o.value));
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
    return Xo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Wl[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Jl(this, Ar, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Xo(n, e, null);
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
oe({ name: "@lexical/extension/DecoratorText", nodes: () => [ys], register: (t, e, n) => t.registerCommand(Ka, (o) => {
  const a = Yt();
  if (qa(a) || ve(a)) for (const s of a.getNodes()) kd(s) && s.toggleFormat(o);
  return !1;
}, Ha) });
function Ns(t, e) {
  let n;
  return Ln(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const ao = oe({ build: (t) => Ns(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function dt(t, ...e) {
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
const To = 0, so = 1, _s = 2, Pr = 3, Zn = 4, ln = 5, $r = 6, In = 7;
function jr(t) {
  return t.id === To;
}
function Cs(t) {
  return t.id === _s;
}
function _d(t) {
  return function(e) {
    return e.id === so;
  }(t) || dt(305, String(t.id), String(so)), Object.assign(t, { id: _s });
}
const Cd = /* @__PURE__ */ new Set();
class Ed {
  constructor(e, n) {
    Kt(this, "builder");
    Kt(this, "configs");
    Kt(this, "_dependency");
    Kt(this, "_peerNameSet");
    Kt(this, "extension");
    Kt(this, "state");
    Kt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: To };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : $l;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Cs(n) || dt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, c) {
      return Object.assign(l, { config: d, id: Pr, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: Zn, initResult: d, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Zn && dt(307, String(n.id), String(ln)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: ln, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== ln && dt(308, String(o.id), String(ln));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: $r });
    }(o), () => {
      const s = this.state;
      s.id !== In && dt(309, String(o.id), String(In)), this.state = function(i) {
        return Object.assign(i, { id: ln });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== $r && dt(310, String(n.id), String($r)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: In });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && dt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && dt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Zn;
    }(e) || dt(313, String(e.id), String(Zn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Pr;
    }(e) || dt(314, String(e.id), String(Pr)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && dt(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && dt(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= In;
    }(e) || dt(316, String(e.id), String(In)), e;
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
        return n.id >= ln;
      })(e) || dt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ca = { tag: ho };
function Td() {
  const t = Oe();
  t.isEmpty() && t.append(vn());
}
const Sd = oe({ config: rn({ setOptions: ca, updateOptions: ca }), init: ({ $initialEditorState: t = Td }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
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
function Qn(t) {
  return Array.isArray(t) ? t : [t];
}
const Lr = "0.43.0+prod.esm";
class dn {
  constructor(e) {
    Kt(this, "roots");
    Kt(this, "extensionNameMap");
    Kt(this, "outgoingConfigEdges");
    Kt(this, "incomingEdges");
    Kt(this, "conflicts");
    Kt(this, "_sortedExtensionReps");
    Kt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Lr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [Qn(Sd)];
    for (const o of e) n.push(Qn(o));
    return new dn(n);
  }
  static maybeFromEditor(e) {
    const n = e[da];
    return n && (n.PACKAGE_VERSION !== Lr && dt(292, n.PACKAGE_VERSION, Lr), n instanceof dn || dt(293)), n;
  }
  static fromEditor(e) {
    const n = dn.maybeFromEditor(e);
    return n === void 0 && dt(294), n;
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
    return e = Me(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && dt(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && dt(296);
    const n = Qn(e), [o] = n;
    typeof o.name != "string" && dt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && dt(298, o.name), !a) {
      a = new Ed(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && dt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && dt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = Qn(i);
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
      jr(s) || dt(300, i, a || "[unknown]"), jr(l = s) || dt(304, String(l.id), String(To)), s = Object.assign(l, { id: so }), o.state = s;
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
      s === void 0 && dt(301, o.name);
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
    return Me(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: m } = p;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const h of Nd(m)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && dt(302, m.name, h.replace.name, u.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (m.html) {
        if (m.html.export) for (const [h, u] of m.html.export.entries()) a.set(h, u);
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
const Id = /* @__PURE__ */ new Set(), pa = oe({ build(t, e, n) {
  const o = n.getDependency(ao).output, a = Ln({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ns(() => {
  }, () => xe(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let d, c = !1;
    o.value.read(() => {
      if (Yt()) for (const [p, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(p);
          continue;
        }
        const h = Ql(p), u = h && h.isSelected() || !1;
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
}, dependencies: [ao], name: "@lexical/extension/NodeSelection" }), Dd = Fl("INSERT_HORIZONTAL_RULE_COMMAND");
class un extends Xr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new un(e.__key);
  }
  static importJSON(e) {
    return So().updateFromJSON(e);
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
  return { node: So() };
}
function So() {
  return Zl(un);
}
function Md(t) {
  return t instanceof un;
}
oe({ dependencies: [ao, pa], name: "@lexical/extension/HorizontalRule", nodes: () => [un], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(pa).output, a = Ln({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Me(t.registerCommand(Dd, (i) => {
    const l = Yt();
    if (!ve(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = So();
      md(d);
    }
    return !0;
  }, go), t.registerCommand(zl, (i) => {
    if (Kl(i.target)) {
      const l = ql(i.target);
      if (Md(l)) return function(d, c = !1) {
        const p = Yt(), m = d.isSelected(), h = d.getKey();
        let u;
        c && qa(p) ? u = p : (u = Hl(), Ul(u)), m ? u.delete(h) : u.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Ha), t.registerMutationListener(un, (i, l) => {
    bd(() => {
      let d = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, m] of i.entries()) if (m === "destroyed") c.delete(p), d = !0;
      else {
        const h = c.get(p), u = t.getElementByKey(p);
        h ? h.domNode.value = u : (d = !0, c.set(p, { domNode: Ln(u), selectedSignal: o(p) }));
      }
      d && (a.value = { nodeSelections: c });
    });
  }), xe(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: d } of a.value.nodeSelections.values()) i.push(xe(() => {
      const c = l.value;
      c && (d.value ? Ua(c, s) : tc(c, s));
    }));
    return Me(...i);
  }));
} });
oe({ build: (t, e) => Nn({ inheritEditableFromParent: e.inheritEditableFromParent }), config: rn({ $getParentEditor: function() {
  const t = Yl();
  return dn.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => xe(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
oe({ build: (t, e, n) => Nn(e), config: rn({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return xe(() => {
    if (!o.disabled.value) return pd(t, o.onReposition.value);
  });
} });
function Es(t) {
  return t.canBeEmpty();
}
function Ad(t, e, n = Es) {
  return Me(t.registerCommand(ec, (o) => {
    const a = Yt();
    if (!ve(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => ar(h) && h.canIndent()).length > 0) return !0;
      const l = i.anchor, d = i.focus, c = d.isBefore(l) ? d : l, p = c.getNode(), m = ud(p);
      if (m.canIndent()) {
        const h = m.getKey();
        let u = nc();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = rc(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? oc : Wo : ac;
    return t.dispatchCommand(s, void 0);
  }, go), t.registerCommand(Wo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Yt();
    if (!ve(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return hd((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, bo));
}
oe({ build: (t, e, n) => Nn(e), config: rn({ $canIndent: Es, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return xe(() => {
    if (!o.value) return Ad(t, a, s);
  });
} });
const Pd = oe({ name: "@lexical/react/ReactProvider" });
function $d() {
  return Oe().getTextContent();
}
function jd(t, e = !0) {
  if (t) return !1;
  let n = $d();
  return e && (n = n.trim()), n === "";
}
function Ld(t) {
  if (!jd(t, !1)) return !1;
  const e = Oe().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (sc(a)) return !1;
    if (Re(a)) {
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
            const [c, p, m, h, u] = d;
            t.update(() => {
              const g = Yt();
              if (ve(g)) {
                const y = g.anchor;
                let x = y.getNode(), N = 0, S = 0;
                if (sr(x) && c >= 0 && p >= 0 && (N = c, S = c + p, g.setTextNodeRange(x, N, x, S)), N === S && m === "" || (g.insertRawText(m), x = y.getNode()), sr(x)) {
                  N = h, S = h + u;
                  const E = x.getTextContentSize();
                  N = N > E ? E : N, S = S > E ? E : S, g.setTextNodeRange(x, N, x, S);
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
oe({ build: (t, e, n) => Nn(e), config: rn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => xe(() => n.getOutput().disabled.value ? void 0 : Ss(t)) });
function Vd(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ro = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? te : J;
function Bd({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = D(() => n.getDecorators());
    return Ro(() => n.registerDecoratorListener((i) => {
      hc(() => {
        s(i);
      });
    }), [n]), J(() => {
      s(n.getDecorators());
    }, [n]), z(() => {
      const i = [], l = Object.keys(a);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], p = r(o, { onError: (h) => n._onError(h), children: r(Di, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(gc(p, m, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function Gd({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = dn.maybeFromEditor(n);
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
  const [o] = Ee();
  return function(a) {
    Ro(() => Me(fc(a), Ss(a)), [a]);
  }(o), w(st, { children: [t, r(zd, { content: e }), r(Gd, { editor: o, ErrorBoundary: n })] });
}
function zd({ content: t }) {
  const [e] = Ee(), n = function(a) {
    const [s, i] = D(() => ua(a));
    return Ro(() => {
      function l() {
        const d = ua(a);
        i(d);
      }
      return l(), Me(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = od();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Kd({ defaultSelection: t }) {
  const [e] = Ee();
  return J(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const qd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? te : J;
function Hd({ onClear: t }) {
  const [e] = Ee();
  return qd(() => xs(e, t), [e, t]), null;
}
const Rs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? te : J;
function Ud({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: m, ariaRequired: h, autoCapitalize: u, className: g, id: y, role: x = "textbox", spellCheck: N = !0, style: S, tabIndex: E, "data-testid": C, ...k }, I) {
  const [R, T] = D(t.isEditable()), b = G(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? t.setRootElement($) : t.setRootElement(null);
  }, [t]), O = z(() => /* @__PURE__ */ function(...$) {
    return (V) => {
      for (const A of $) typeof A == "function" ? A(V) : A != null && (A.current = V);
    };
  }(I, b), [b, I]);
  return Rs(() => (T(t.isEditable()), t.registerEditableListener(($) => {
    T($);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": R && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": R ? m : void 0, "aria-readonly": !R || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: R, "data-testid": C, id: y, ref: O, role: x, spellCheck: N, style: S, tabIndex: E, ...k });
}
const Yd = Fn(Ud);
function ma(t) {
  return t.getEditorState().read(Ts(t.isComposing()));
}
const Xd = Fn(Wd);
function Wd(t, e) {
  const { placeholder: n, ...o } = t, [a] = Ee();
  return w(st, { children: [r(Yd, { editor: a, ...o, ref: e }), n != null && r(Jd, { editor: a, content: n })] });
}
function Jd({ content: t, editor: e }) {
  const n = function(i) {
    const [l, d] = D(() => ma(i));
    return Rs(() => {
      function c() {
        const p = ma(i);
        d(p);
      }
      return c(), Me(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = D(e.isEditable());
  if (te(() => (a(e.isEditable()), e.registerEditableListener((i) => {
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
  const t = uo(Is);
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
  const [e] = Ee(), [n, o] = D(e), [a, s] = D("paragraph"), [i, l] = tw(), d = () => {
  };
  return J(() => n.registerCommand(
    Ya,
    (c, p) => (o(p), !1),
    bo
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
  const [e] = Ee(), { activeEditor: n } = Ds();
  J(() => n.registerCommand(
    Ya,
    () => {
      const o = Yt();
      return o && t(o), !1;
    },
    bo
  ), [e, t]), J(() => {
    n.getEditorState().read(() => {
      const o = Yt();
      o && t(o);
    });
  }, [n, t]);
}
const Os = qe(
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
), rw = v.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Ja.Root,
  {
    ref: a,
    className: f(Os({ variant: e, size: n, className: t })),
    ...o
  }
));
rw.displayName = Ja.Root.displayName;
const Ms = v.createContext({
  size: "default",
  variant: "default"
}), Io = v.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = kt();
  return /* @__PURE__ */ r(
    vr.Root,
    {
      ref: s,
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
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
Io.displayName = vr.Root.displayName;
const $n = v.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = v.useContext(Ms);
  return /* @__PURE__ */ r(
    vr.Item,
    {
      ref: s,
      className: f(
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
$n.displayName = vr.Item.displayName;
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
    if (ve(a) || bc(a)) {
      const s = [];
      fa.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return nw(o), /* @__PURE__ */ r(
    Io,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: fa.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        $n,
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
  const [e] = Ee();
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
  theme: _o,
  nodes: Co,
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
        className: f(
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
            children: /* @__PURE__ */ w(At, { children: [
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
  const n = document.createElement("div"), o = Oe().getChildren();
  for (let a = 0; a < o.length; a++)
    As(t, o[a], n, e);
  return n.innerHTML;
}
function As(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = Re(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && sr(e) && (i = sd(o, e, "clone"));
  const l = Re(i) ? i.getChildren() : [], d = lc(t, i.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, i) : i.exportDOM(t);
  const { element: p, after: m } = c;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], y = As(t, g, h, o);
    !a && Re(e) && y && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Fa(p) || Jo(p)) && p.append(h), n.append(p), m) {
      const u = m.call(i, p);
      u && (Jo(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const Ps = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function $s(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Ps.has(t.nodeName)) return i;
  let l = null;
  const d = function(g, y) {
    const { nodeName: x } = g, N = y._htmlConversions.get(x.toLowerCase());
    let S = null;
    if (N !== void 0) for (const E of N) {
      const C = E(g);
      C !== null && (S === null || (S.priority || 0) <= (C.priority || 0)) && (S = C);
    }
    return S !== null ? S.conversion : null;
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
  let h = [];
  const u = (l == null || !dc(l)) && (l != null && ar(l) || o);
  for (let g = 0; g < m.length; g++) h.push(...$s(m[g], e, n, u, new Map(a), l));
  return p != null && (h = p(h)), Zo(t) && (h = dw(t, h, u ? () => {
    const g = new Xa();
    return n.push(g), g;
  } : vn)), l == null ? h.length > 0 ? i = i.concat(h) : Zo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Qo(g.nextSibling) && Qo(g.previousSibling);
  }(t) && (i = i.concat(Wa())) : Re(l) && l.append(...h), i;
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
function se(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ls(t.root.children) : !1;
}
function ww(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Za({
    namespace: "EditorUtils",
    theme: _o,
    nodes: Co,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = lw(e, a);
      Oe().clear(), wc(s);
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
    theme: _o,
    nodes: Co,
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
function Do(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function or(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Oo(t) {
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
function fm({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = D(pw), [i, l] = D(void 0), [d, c] = D(!1), p = q(void 0), m = q(null);
  J(() => {
    let N = !0;
    const S = m.current;
    if (!S) return;
    const E = setTimeout(() => {
      N && js(S);
    }, 300);
    return () => {
      N = !1, clearTimeout(E);
    };
  }, []);
  const h = G(() => {
    if (!se(a)) return;
    const N = fr(a);
    e(N, i);
  }, [a, e, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", y = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: x }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
          /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(gn, {}) }) }),
          /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: y }) })
        ] }) }),
        /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
          /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !se(a),
              children: /* @__PURE__ */ r(Ut, {})
            }
          ) }),
          /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Ce, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ w(
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
        pe,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(ke, { children: /* @__PURE__ */ r(_e, { children: t.map((N) => /* @__PURE__ */ r(
            we,
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
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : Oo(N) && (N.preventDefault(), N.stopPropagation(), se(a) && h());
        },
        onKeyDown: (N) => {
          Do(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
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
const hm = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), gm = [
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
  }, h = G(
    (u) => {
      var R;
      const g = u.target, y = (T) => T ? document.getElementById(T) : void 0, x = y(l), N = y(s);
      if (!!(x && g && x.contains(g) && g !== x) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const T = t.find((b) => b.id === l);
            T && c(T.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const T = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (T.length === 0) return;
          const b = T.findIndex(($) => $ === g);
          if (b === -1) return;
          let O;
          u.key === "ArrowDown" ? O = Math.min(b + 1, T.length - 1) : O = Math.max(b - 1, 0), O !== b && (u.preventDefault(), u.stopPropagation(), (R = T[O]) == null || R.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((T) => T.id === s);
      let k = C;
      switch (u.key) {
        case "ArrowDown":
          k = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          k = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          k = 0, u.preventDefault();
          break;
        case "End":
          k = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const T = N;
          if (T) {
            const b = T.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), O = T.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), $ = b ?? O;
            if ($) {
              u.preventDefault(), $.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const I = t[k];
      I && c(I.id);
    },
    [t, c, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: c
  };
}, hw = qe(
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
), ye = v.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: f("pr-twp", hw({ variant: e }), t), ...n })
);
ye.displayName = "Badge";
const Vs = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Vs.displayName = "Card";
const gw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
gw.displayName = "CardHeader";
const bw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: f(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
bw.displayName = "CardTitle";
const vw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: f("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
vw.displayName = "CardDescription";
const Bs = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Bs.displayName = "CardContent";
const xw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
xw.displayName = "CardFooter";
const mn = v.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Qa.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: f(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
mn.displayName = Qa.Root.displayName;
const Gs = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xn.Root,
  {
    ref: n,
    className: f(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Gs.displayName = xn.Root.displayName;
const yw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xn.Image,
  {
    ref: n,
    className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
yw.displayName = xn.Image.displayName;
const Fs = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xn.Fallback,
  {
    ref: n,
    className: f(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Fs.displayName = xn.Fallback.displayName;
const Mo = gr(void 0);
function ue() {
  const t = uo(Mo);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const je = qe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ae = ut.Trigger, zs = ut.Group, Nw = ut.Portal, kw = ut.Sub, _w = ut.RadioGroup;
function Ne({ variant: t = "default", ...e }) {
  const n = v.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Mo.Provider, { value: n, children: /* @__PURE__ */ r(ut.Root, { ...e }) });
}
const Ks = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = ue();
  return /* @__PURE__ */ w(
    ut.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        je({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(wn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ks.displayName = ut.SubTrigger.displayName;
const qs = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = kt();
  return /* @__PURE__ */ r(
    ut.SubContent,
    {
      ref: o,
      className: f(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: a, children: e })
    }
  );
});
qs.displayName = ut.SubContent.displayName;
const ce = v.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = kt();
  return /* @__PURE__ */ r(ut.Portal, { children: /* @__PURE__ */ r(
    ut.Content,
    {
      ref: a,
      sideOffset: e,
      className: f(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
ce.displayName = ut.Content.displayName;
const ze = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = kt(), s = ue();
  return /* @__PURE__ */ r(
    ut.Item,
    {
      ref: o,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        je({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
ze.displayName = ut.Item.displayName;
const ie = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = kt(), i = ue();
  return /* @__PURE__ */ w(
    ut.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        je({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ut.ItemIndicator, { children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
ie.displayName = ut.CheckboxItem.displayName;
const Hs = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = kt(), s = ue();
  return /* @__PURE__ */ w(
    ut.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        je({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ut.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Hs.displayName = ut.RadioItem.displayName;
const Ke = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ut.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Ke.displayName = ut.Label.displayName;
const Pe = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Pe.displayName = ut.Separator.displayName;
function Cw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
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
  const [d, c] = D(!1), [p, m] = D(), h = q(null);
  J(() => {
    if (!d) return;
    let C = !0;
    const k = h.current;
    if (!k) return;
    const I = setTimeout(() => {
      C && js(k);
    }, 300);
    return () => {
      C = !1, clearTimeout(I);
    };
  }, [d]);
  const u = G(
    (C) => {
      C && C.stopPropagation(), c(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = G(
    async (C) => {
      if (C && C.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        fr(p)
      ) && (c(!1), m(void 0), i == null || i(!1));
    },
    [p, a, t.id, i]
  ), y = z(() => {
    const C = new Date(t.date), k = ml(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), I = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ze(n["%comment_dateAtTime%"], {
      date: k,
      time: I
    });
  }, [t.date, n]), x = z(() => t.user, [t.user]), N = z(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), S = z(() => fl(t.contents), [t.contents]), E = z(() => {
    if (o && l)
      return /* @__PURE__ */ w(st, { children: [
        /* @__PURE__ */ w(
          ze,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), m(ww(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(Pi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          ze,
          {
            onClick: async (C) => {
              C.stopPropagation(), s && await s(t.id);
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
      className: f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(Gs, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Fs, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: y }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(ye, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
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
              ref: h,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), u()) : Oo(C) && (C.preventDefault(), C.stopPropagation(), se(p) && g());
              },
              onKeyDown: (C) => {
                Do(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  mr,
                  {
                    className: f(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: p,
                    onSerializedChange: (C) => m(C)
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
                      children: /* @__PURE__ */ r(gn, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !se(p),
                      children: /* @__PURE__ */ r(Ra, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(st, { children: [
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
                dangerouslySetInnerHTML: { __html: S }
              }
            )
          ] })
        ] }),
        E && /* @__PURE__ */ w(Ne, { children: [
          /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(ji, {}) }) }),
          /* @__PURE__ */ r(ce, { align: "end", children: E })
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
  handleUpdateComment: h,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: y,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: S,
  canUserEditOrDeleteCommentCallback: E,
  isRead: C = !1,
  autoReadDelay: k = 5,
  onVerseRefClick: I
}) {
  const [R, T] = D(ga), [b, O] = D(
    void 0
  ), $ = o, [V, A] = D(!1), [j, H] = D(!1), [Y, tt] = D(!1), [Tt, Bt] = D(!1), [$t, it] = D(!1), [ht, K] = D(C), [nt, lt] = D(!1), rt = q(void 0), [at, Gt] = D(/* @__PURE__ */ new Map());
  J(() => {
    let M = !0;
    return (async () => {
      const pt = S ? await S(d) : !1;
      M && it(pt);
    })(), () => {
      M = !1;
    };
  }, [d, S]), J(() => {
    let M = !0;
    if (!o) {
      Bt(!1), Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = N ? await N(d) : !1;
      M && Bt(pt);
    })(), () => {
      M = !1;
    };
  }, [o, d, N]);
  const It = z(() => e.filter((M) => !M.deleted), [e]);
  J(() => {
    let M = !0;
    if (!o || !E) {
      Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = /* @__PURE__ */ new Map();
      await Promise.all(
        It.map(async (Le) => {
          const He = await E(Le.id);
          M && pt.set(Le.id, He);
        })
      ), M && Gt(pt);
    })(), () => {
      M = !1;
    };
  }, [o, It, E]);
  const Ft = z(() => It[0], [It]), me = q(null), P = q(void 0), Jt = G(() => {
    var M;
    (M = P.current) == null || M.call(P), T(ga);
  }, []), fe = G(() => {
    const M = !ht;
    K(M), lt(!M), g == null || g(d, M);
  }, [ht, g, d]);
  J(() => {
    A(!1);
  }, [o]), J(() => {
    if (o && !ht && !nt) {
      const M = setTimeout(() => {
        K(!0), g == null || g(d, !0);
      }, k * 1e3);
      return rt.current = M, () => clearTimeout(M);
    }
    rt.current && (clearTimeout(rt.current), rt.current = void 0);
  }, [o, ht, nt, k, d, g]);
  const Dt = z(
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
    const M = or(s, n);
    return Ze(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [s, n]), X = z(() => It.slice(1), [It]), et = z(() => X.length ?? 0, [X.length]), ct = z(() => et > 0, [et]), vt = z(() => V || et <= 2 ? X : X.slice(-2), [X, et, V]), xt = z(() => V || et <= 2 ? 0 : et - 2, [et, V]), St = z(
    () => et === 1 ? Dt.singleReply : Ze(Dt.multipleReplies, { count: et }),
    [et, Dt]
  ), gt = z(
    () => xt === 1 ? Dt.singleReply : Ze(Dt.multipleReplies, { count: xt }),
    [xt, Dt]
  );
  J(() => {
    !o && j && ct && H(!1);
  }, [o, j, ct]);
  const _t = G(
    async (M) => {
      M && M.stopPropagation();
      const yt = se(R) ? fr(R) : void 0;
      if (b !== void 0) {
        await m({
          threadId: d,
          contents: yt,
          assignedUser: b
        }) && (O(void 0), yt && Jt());
        return;
      }
      yt && await m({ threadId: d, contents: yt }) && Jt();
    },
    [
      Jt,
      R,
      m,
      b,
      d
    ]
  ), jt = G(
    async (M) => {
      const yt = se(R) ? fr(R) : void 0, pt = await m({
        ...M,
        contents: yt,
        assignedUser: b ?? M.assignedUser
      });
      return pt && yt && Jt(), pt && b !== void 0 && O(void 0), pt;
    },
    [Jt, R, m, b]
  );
  if (Ft)
    return /* @__PURE__ */ r(
      Vs,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: f(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && p !== "Resolved" && ht,
            "tw-bg-background": o && p !== "Resolved" && ht,
            "tw-bg-muted": p === "Resolved",
            "tw-bg-accent": !ht && !o && p !== "Resolved"
          }
        ),
        onClick: () => {
          l(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ w(Bs, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              B && /* @__PURE__ */ r(ye, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: B }),
              /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (M) => {
                    M.stopPropagation(), fe();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": ht ? "Mark as unread" : "Mark as read",
                  children: ht ? /* @__PURE__ */ r(Li, {}) : /* @__PURE__ */ r(Vi, {})
                }
              ),
              $t && p !== "Resolved" && /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: f(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (M) => {
                    M.stopPropagation(), jt({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ w(
              "p",
              {
                ref: me,
                className: f(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": $
                  },
                  { "tw-whitespace-nowrap": !$ }
                ),
                children: [
                  a && I ? /* @__PURE__ */ r(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (M) => {
                        M.stopPropagation(), I(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ w("span", { className: t, children: [
                    Ft.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: Ft.selectedText }),
                    Ft.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              ha,
              {
                comment: Ft,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: p,
                handleAddCommentToThread: jt,
                handleUpdateComment: h,
                handleDeleteComment: u,
                onEditingChange: H,
                canEditOrDelete: (!j && at.get(Ft.id)) ?? !1,
                canUserResolveThread: $t
              }
            )
          ] }),
          /* @__PURE__ */ w(st, { children: [
            ct && !o && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(mn, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: St })
            ] }),
            !o && se(R) && /* @__PURE__ */ r(
              mr,
              {
                editorSerializedState: R,
                onSerializedChange: (M) => T(M),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ w(st, { children: [
              xt > 0 && /* @__PURE__ */ w(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (M) => {
                    M.stopPropagation(), A(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (M) => {
                    (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), A(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(mn, {}) }),
                    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: gt }),
                      V ? /* @__PURE__ */ r(Ia, {}) : /* @__PURE__ */ r(De, {})
                    ] })
                  ]
                }
              ),
              vt.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                ha,
                {
                  comment: M,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: h,
                  handleDeleteComment: u,
                  onEditingChange: H,
                  canEditOrDelete: (!j && at.get(M.id)) ?? !1
                }
              ) }, M.id)),
              x !== !1 && (!j || se(R)) && /* @__PURE__ */ w(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (M) => M.stopPropagation(),
                  onKeyDownCapture: (M) => {
                    Oo(M) && (M.preventDefault(), M.stopPropagation(), (se(R) || b !== void 0) && _t());
                  },
                  onKeyDown: (M) => {
                    Do(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      mr,
                      {
                        editorSerializedState: R,
                        onSerializedChange: (M) => T(M),
                        placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (M) => {
                          P.current = M;
                        }
                      }
                    ),
                    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      b !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: Ze(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: or(
                            b,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ w(Ce, { open: Y, onOpenChange: tt, children: [
                        /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Tt || !y || y.length === 0 || !y.includes(i),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(Sa, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          pe,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (M) => {
                              M.key === "Escape" && (M.stopPropagation(), tt(!1));
                            },
                            children: /* @__PURE__ */ r(ke, { children: /* @__PURE__ */ r(_e, { children: y == null ? void 0 : y.map((M) => /* @__PURE__ */ r(
                              we,
                              {
                                onSelect: () => {
                                  O(M !== s ? M : void 0), tt(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: or(M, n) })
                              },
                              M || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          onClick: _t,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !se(R) && b === void 0,
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
function bm({
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
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: y,
  onVerseRefClick: x
}) {
  const [N, S] = D(/* @__PURE__ */ new Set()), [E, C] = D();
  J(() => {
    g && (S((A) => new Set(A).add(g)), C(g));
  }, [g]);
  const k = n.filter(
    (A) => A.comments.some((j) => !j.deleted)
  ), I = k.map((A) => ({ id: A.id })), R = G(
    (A) => {
      S((j) => new Set(j).add(A.id)), C(A.id), y == null || y(A.id);
    },
    [y]
  ), T = G(
    (A) => {
      const j = N.has(A);
      S((H) => {
        const Y = new Set(H);
        return Y.has(A) ? Y.delete(A) : Y.add(A), Y;
      }), C(A), y == null || y(j ? void 0 : A);
    },
    [N, y]
  ), { listboxRef: b, activeId: O, handleKeyDown: $ } = fw({
    options: I,
    onOptionSelect: R
  }), V = G(
    (A) => {
      A.key === "Escape" ? (E && N.has(E) && (S((j) => {
        const H = new Set(j);
        return H.delete(E), H;
      }), C(void 0), y == null || y(void 0)), A.preventDefault(), A.stopPropagation()) : $(A);
    },
    [E, N, $, y]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: b,
      "aria-activedescendant": O ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: k.map((A) => /* @__PURE__ */ r(
        "div",
        {
          className: f({
            "tw-opacity-60": A.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Ew,
            {
              classNameForVerseText: e,
              comments: A.comments,
              localizedStrings: a,
              verseRef: A.verseRef,
              handleSelectThread: T,
              threadId: A.id,
              thread: A,
              isRead: A.isRead,
              isSelected: N.has(A.id),
              currentUser: o,
              assignedUser: A.assignedUser,
              threadStatus: A.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: x
            }
          )
        },
        A.id
      ))
    }
  );
}
function Tw({ table: t }) {
  return /* @__PURE__ */ w(Ne, { children: [
    /* @__PURE__ */ r(vc, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Bi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(ce, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(Ke, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Pe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        ie,
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
const fn = Nt.Root, Sw = Nt.Group, hn = Nt.Value, Rw = qe(
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
), en = v.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = kt();
  return /* @__PURE__ */ w(
    Nt.Trigger,
    {
      className: f(Rw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(Nt.Icon, { asChild: !0, children: /* @__PURE__ */ r(De, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
en.displayName = Nt.Trigger.displayName;
const Us = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Nt.ScrollUpButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ia, { className: "tw-h-4 tw-w-4" })
  }
));
Us.displayName = Nt.ScrollUpButton.displayName;
const Ys = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Nt.ScrollDownButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(De, { className: "tw-h-4 tw-w-4" })
  }
));
Ys.displayName = Nt.ScrollDownButton.displayName;
const nn = v.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = kt();
  return /* @__PURE__ */ r(Nt.Portal, { children: /* @__PURE__ */ w(
    Nt.Content,
    {
      ref: a,
      className: f(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(Us, {}),
        /* @__PURE__ */ r(
          Nt.Viewport,
          {
            className: f(
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
nn.displayName = Nt.Content.displayName;
const Iw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Nt.Label,
  {
    ref: n,
    className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Iw.displayName = Nt.Label.displayName;
const re = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  Nt.Item,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Nt.ItemIndicator, { children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(Nt.ItemText, { children: e })
    ]
  }
));
re.displayName = Nt.Item.displayName;
const Dw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Nt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Dw.displayName = Nt.Separator.displayName;
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
        fn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(en, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(hn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(nn, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(re, { value: `${e}`, children: e }, e)) })
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
function Vn(t, e) {
  const n = e ? `${ba}, ${e}` : ba;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Mw(o)
  );
}
const Nr = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = v.useRef(null);
  v.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), v.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Vn(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
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
        i.preventDefault(), Vn(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: f("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
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
      ...n
    }
  ) });
});
Nr.displayName = "Table";
const kr = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: f(
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
const _r = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: f("[&_tr:last-child]:tw-border-0", t), ...e }));
_r.displayName = "TableBody";
const Aw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Aw.displayName = "TableFooter";
function Pw(t) {
  v.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? Vn(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
const Te = v.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = v.useRef(null);
  v.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Pw(i);
  const l = v.useMemo(
    () => i.current ? Vn(i.current) : [],
    [i]
  ), d = v.useCallback(
    (p) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const h = m.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Vn(h).filter(
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
  ), c = v.useCallback(
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
      className: f(
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
Te.displayName = "TableRow";
const Bn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: f(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
Bn.displayName = "TableHead";
const Qe = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Qe.displayName = "TableCell";
const Lw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Lw.displayName = "TableCaption";
function io({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
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
  var I;
  const [p, m] = D([]), [h, u] = D([]), [g, y] = D({}), [x, N] = D({}), S = z(() => e ?? [], [e]), E = ts({
    data: S,
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
      columnFilters: h,
      columnVisibility: g,
      rowSelection: x
    }
  }), C = E.getVisibleFlatColumns();
  let k;
  return d ? k = Array.from({ length: 10 }).map((b, O) => `skeleton-row-${O}`).map((b) => /* @__PURE__ */ r(Te, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Qe, { colSpan: C.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(io, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, b)) : ((I = E.getRowModel().rows) == null ? void 0 : I.length) > 0 ? k = E.getRowModel().rows.map((R) => /* @__PURE__ */ r(
    Te,
    {
      onClick: () => i(R, E),
      "data-state": R.getIsSelected() && "selected",
      children: R.getVisibleCells().map((T) => /* @__PURE__ */ r(Qe, { children: An(T.column.columnDef.cell, T.getContext()) }, T.id))
    },
    R.id
  )) : k = /* @__PURE__ */ r(Te, { children: /* @__PURE__ */ r(Qe, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Tw, { table: E }),
    /* @__PURE__ */ w(Nr, { stickyHeader: s, children: [
      /* @__PURE__ */ r(kr, { stickyHeader: s, children: E.getHeaderGroups().map((R) => /* @__PURE__ */ r(Te, { children: R.headers.map((T) => /* @__PURE__ */ r(Bn, { className: "tw-p-0", children: T.isPlaceholder ? void 0 : An(T.column.columnDef.header, T.getContext()) }, T.id)) }, R.id)) }),
      /* @__PURE__ */ r(_r, { children: k })
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Ow, { table: E })
  ] });
}
function Bw(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const o = e.get(n.projectId), a = {
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: n.scrollGroupScrRefLabel
    };
    o ? o.some((s) => s.scrollGroupId === n.scrollGroupId) || o.push(a) : e.set(n.projectId, [a]);
  }), e.forEach((n) => n.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function va(t, e, n) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === n);
}
function Br(t) {
  const e = Bw(t.openTabs);
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
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason
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
        isSelected: va(n, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason
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
        isSelected: va(n, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason
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
      isBoundButClosed: !0,
      isDisabled: s.isDisabled === !0,
      disabledReason: s.disabledReason
    });
  }), o;
}
function xa(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Gr(t, e) {
  if (t.isSelected !== e.isSelected) return t.isSelected ? -1 : 1;
  const n = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (n !== 0) return n;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function Gw(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Gr) }];
  const n = t.filter(xa).sort(Gr), o = t.filter((s) => !xa(s)).sort(Gr);
  if (n.length === 0)
    return [{ kind: "flat", rows: o }];
  const a = [{ kind: "openTabs", rows: n }];
  return o.length > 0 && a.push({ kind: "other", rows: o }), a;
}
const Fw = {
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
function zw(t) {
  return { ...Fw, ...t };
}
function Gn(t) {
  return tr[Ur(t)] ?? String(t);
}
const Kw = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function qw({ scrollGroupId: t, isBoundButClosed: e }) {
  const n = Gn(t);
  return e ? /* @__PURE__ */ r(
    ye,
    {
      variant: "outline",
      className: "tw-relative tw-text-muted-foreground",
      style: Kw,
      children: n
    }
  ) : /* @__PURE__ */ r(ye, { variant: "secondary", children: n });
}
function Hw({ row: t, mode: e, strings: n, onClick: o, onOpen: a }) {
  const [s, i] = D(!1), l = q(null), d = !!(t.language || t.languageCode), c = d || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, p = G(() => {
    if (c) {
      i(!0);
      return;
    }
    const x = l.current;
    x && x.scrollWidth > x.clientWidth && i(!0);
  }, [c]), m = /* @__PURE__ */ r(Ut, { className: f("tw-h-4 tw-w-4", t.isSelected ? "tw-opacity-100" : "tw-opacity-0") });
  let h;
  e === "project" ? t.openGroups.length > 0 && (h = /* @__PURE__ */ r("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-gap-1", children: t.openGroups.map((x) => /* @__PURE__ */ r(ye, { variant: "secondary", children: Gn(x) }, x)) })) : t.scrollGroupId !== void 0 && (h = /* @__PURE__ */ w("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      qw,
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
        onClick: (x) => {
          x.stopPropagation(), a(t);
        },
        onMouseDown: (x) => x.stopPropagation(),
        "aria-label": n.openButtonLabel,
        title: n.openButtonLabel,
        children: [
          /* @__PURE__ */ r(Ta, { className: "tw-h-3 tw-w-3" }),
          n.openButtonLabel
        ]
      }
    )
  ] }));
  const u = /* @__PURE__ */ w(
    we,
    {
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: p,
      onPointerLeave: () => i(!1),
      className: "tw-flex tw-items-center tw-gap-2 tw-pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center", children: m }),
        /* @__PURE__ */ w("span", { ref: l, className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: [
          /* @__PURE__ */ r("span", { children: t.shortName }),
          /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
            " • ",
            t.fullName
          ] })
        ] }),
        h
      ]
    }
  ), g = t.scrollGroupId !== void 0 ? Gn(t.scrollGroupId) : void 0, y = t.isBoundButClosed && g ? n.boundButClosedTooltip.replace("{group}", g) : void 0;
  return /* @__PURE__ */ w(Lt, { open: s, delayDuration: 400, children: [
    /* @__PURE__ */ r(Vt, { asChild: !0, children: u }),
    /* @__PURE__ */ w(
      Pt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw-max-w-xs tw-text-center",
        style: { zIndex: xo },
        children: [
          /* @__PURE__ */ r("div", { className: "tw-font-semibold", children: t.fullName }),
          d && /* @__PURE__ */ w("div", { className: "tw-text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && g && /* @__PURE__ */ w("div", { className: "tw-text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " (",
              g,
              ")"
            ] })
          ] }),
          y && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: y }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic tw-text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Uw({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: n,
  onChangeShowSelectedOnly: o,
  strings: a
}) {
  const s = !!n;
  return /* @__PURE__ */ w(Ne, { children: [
    /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: "ghost",
        size: "sm",
        className: f(
          "tw-h-8 tw-w-8 tw-shrink-0 tw-p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw-bg-accent tw-text-accent-foreground hover:tw-bg-accent/80 data-[state=open]:tw-bg-accent"
        ),
        "aria-label": a.filterAriaLabel,
        "aria-pressed": s,
        title: a.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ r(Da, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ w(ce, { align: "end", className: "tw-w-56", style: { zIndex: xo }, children: [
      /* @__PURE__ */ r(Ke, { children: a.groupSectionLabel }),
      /* @__PURE__ */ r(
        ie,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: a.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ w(st, { children: [
        /* @__PURE__ */ r(Pe, {}),
        /* @__PURE__ */ r(Ke, { children: a.filterSectionLabel }),
        /* @__PURE__ */ r(
          ie,
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
function Yw(t) {
  const [e, n] = D(!1), [o, a] = D(""), [s, i] = D(t.defaultGroupByOpenTabs ?? !0), [l, d] = D(!1), c = zw(t.localizedStrings), p = z(() => t.mode === "project" ? Br({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Br({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Br({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), m = z(() => {
    const k = o.trim().toLowerCase();
    let I = p;
    return k && (I = I.filter(
      (R) => R.shortName.toLowerCase().includes(k) || R.fullName.toLowerCase().includes(k) || (R.language ?? "").toLowerCase().includes(k) || (R.languageCode ?? "").toLowerCase().includes(k)
    )), t.mode === "project-multi" && l && (I = I.filter((R) => R.isSelected)), I;
  }, [p, o, t.mode, l]), h = z(
    () => Gw(m, s),
    [m, s]
  ), u = z(() => {
    if (t.mode !== "project-multi") return [];
    const k = [];
    return t.projects.forEach((I) => {
      const R = t.openTabs.filter((b) => b.projectId === I.id);
      if (R.length === 0) {
        k.push({ projectId: I.id });
        return;
      }
      const T = /* @__PURE__ */ new Set();
      R.forEach((b) => {
        T.has(b.scrollGroupId) || (T.add(b.scrollGroupId), k.push({ projectId: I.id, scrollGroupId: b.scrollGroupId }));
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
        const I = t.selection.pairs, R = (b) => b.projectId === k.projectId && b.scrollGroupId === k.scrollGroupId, T = I.some(R) ? I.filter((b) => !R(b)) : [...I, { projectId: k.projectId, scrollGroupId: k.scrollGroupId }];
        t.onChangeSelection({ pairs: T }), T.length === 0 && l && d(!1);
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
        const I = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: k.projectId, scrollGroupId: I }), t.onOpenProjectInGroup(k.projectId, I), n(!1);
      }
    }
  }, x = () => {
    if (t.mode !== "project-multi") return;
    const k = t.selection.pairs, I = new Set(k.map((T) => `${T.projectId}:${T.scrollGroupId ?? ""}`)), R = [...k];
    u.forEach((T) => {
      const b = `${T.projectId}:${T.scrollGroupId ?? ""}`;
      I.has(b) || (I.add(b), R.push(T));
    }), t.onChangeSelection({ pairs: R });
  }, N = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, S = z(() => {
    switch (t.mode) {
      case "project": {
        const k = t.projects.find((R) => R.id === t.selection.projectId), I = k ? k.shortName : t.buttonPlaceholder ?? "";
        return { node: I, title: I };
      }
      case "project-multi": {
        const { pairs: k } = t.selection;
        if (k.length === 0) {
          const b = t.buttonPlaceholder ?? "";
          return { node: b, title: b };
        }
        const I = [];
        if (k.forEach((b) => {
          const O = t.projects.find(($) => $.id === b.projectId);
          O && I.push({ project: O, scrollGroupId: b.scrollGroupId });
        }), I.length === 0) {
          const b = t.buttonPlaceholder ?? "";
          return { node: b, title: b };
        }
        if (t.getSelectedText) {
          const b = t.getSelectedText(I);
          return { node: b, title: b };
        }
        const R = I.map(
          ({ project: b, scrollGroupId: O }) => O === void 0 ? b.shortName : `${b.shortName} (${Gn(O)})`
        ).join(", ");
        if (I.length === 1) return { node: R, title: R };
        const T = I.length.toString();
        return {
          node: /* @__PURE__ */ w(st, { children: [
            /* @__PURE__ */ r(ye, { variant: "muted", className: "tw-shrink-0", children: T }),
            /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-truncate", children: R })
          ] }),
          title: `${T} ${R}`
        };
      }
      case "projectScrollGroup": {
        const k = t.projects.find((T) => T.id === t.selection.projectId);
        if (!k) {
          const T = t.buttonPlaceholder ?? "";
          return { node: T, title: T };
        }
        const I = t.selection.scrollGroupId;
        if (I === void 0)
          return { node: k.shortName, title: k.shortName };
        const R = `${k.shortName} · ${Gn(I)}`;
        return { node: R, title: R };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), E = t.mode === "project-multi" ? /* @__PURE__ */ r(fo, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }) : /* @__PURE__ */ r(De, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }), C = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? g : void 0;
  return /* @__PURE__ */ w(Ce, { open: e, onOpenChange: n, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: t.buttonVariant ?? "outline",
        role: "combobox",
        "aria-expanded": e,
        "aria-label": t.ariaLabel,
        disabled: t.isDisabled ?? !1,
        className: f(
          "tw-flex tw-w-[180px] tw-items-center tw-justify-between tw-overflow-hidden",
          t.buttonClassName
        ),
        children: [
          /* @__PURE__ */ r("span", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-start", children: typeof S.node == "string" ? /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-truncate", children: S.node }) : S.node }),
          E
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      pe,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: f("tw-w-80 tw-max-w-[calc(100vw-2rem)] tw-p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ r(At, { delayDuration: 400, children: /* @__PURE__ */ w(ke, { shouldFilter: !1, children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-pe-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-flex-1", children: /* @__PURE__ */ r(
              on,
              {
                value: o,
                onValueChange: a,
                placeholder: c.searchPlaceholder,
                className: "tw-border-0"
              }
            ) }),
            /* @__PURE__ */ r(
              Uw,
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
          /* @__PURE__ */ w(_e, { children: [
            /* @__PURE__ */ r(yn, { children: t.commandEmptyMessage ?? "No projects found" }),
            h.map((k, I) => /* @__PURE__ */ w(mo, { children: [
              /* @__PURE__ */ r(le, { heading: Xw(k, c), children: k.rows.map((R) => /* @__PURE__ */ r(
                Hw,
                {
                  row: R,
                  mode: t.mode,
                  strings: c,
                  onClick: y,
                  onOpen: C
                },
                R.rowKey
              )) }),
              I < h.length - 1 && /* @__PURE__ */ r(xr, {})
            ] }, k.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function Xw(t, e) {
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
function vm({
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
      className: f(
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
const Ww = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ya = (t, e) => t[e] ?? e;
function Jw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = ya(n, "%webView_error_dump_header%"), s = ya(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Oa, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const xm = Object.freeze([
  ...Ww,
  "%webView_error_dump_copied_message%"
]);
function ym({
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
  return /* @__PURE__ */ w(Ce, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: o }),
    /* @__PURE__ */ w(pe, { id: s, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(Et, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Jw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Zw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Zw || {});
function Nm({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = D({}), l = (c, p) => {
    const m = !o[c][p];
    a((u) => (u[c][p] = m, { ...u }));
    const h = n[c].items[p];
    h.onUpdate(h.id, m);
  }, d = (c, p) => {
    i((h) => (h[c] = p, { ...h }));
    const m = n[c].items.find((h) => h.id === p);
    m ? m.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(Ne, { children: [
    /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "default", children: [
      /* @__PURE__ */ r(Da, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(De, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ce, { children: n.map((c, p) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r(Ke, { children: c.label }),
      /* @__PURE__ */ r(zs, { children: c.itemType === 0 ? /* @__PURE__ */ r(st, { children: c.items.map((m, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        ie,
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
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
      /* @__PURE__ */ r(Pe, {})
    ] }, c.label)) })
  ] }) });
}
function km({
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
function Qw({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), p = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
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
function _m({
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
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Qw, { versionHistory: a }),
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
function tp({
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
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: y = "ghost",
  id: x
}) {
  const [N, S] = D(!1), E = G(
    (O) => {
      var V;
      const $ = (V = t.find((A) => A.label === O)) == null ? void 0 : V.value;
      $ && n(
        e.includes($) ? e.filter((A) => A !== $) : [...e, $]
      );
    },
    [t, e, n]
  ), C = () => d || o, k = z(() => {
    if (!h) return t;
    const O = t.filter((V) => V.starred).sort((V, A) => V.label.localeCompare(A.label)), $ = t.filter((V) => !V.starred).sort((V, A) => {
      const j = e.includes(V.value), H = e.includes(A.value);
      return j && !H ? -1 : !j && H ? 1 : V.label.localeCompare(A.label);
    });
    return [...O, ...$];
  }, [t, e, h]), I = () => {
    n(t.map((O) => O.value));
  }, R = () => {
    n([]);
  }, T = c ?? N;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ w(Ce, { open: T, onOpenChange: p ?? S, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": T,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: C()
              }
            )
          ] }),
          /* @__PURE__ */ r(fo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(pe, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(ke, { children: [
      /* @__PURE__ */ r(on, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: I, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: R, children: i })
      ] }),
      /* @__PURE__ */ w(_e, { children: [
        /* @__PURE__ */ r(yn, { children: l }),
        /* @__PURE__ */ r(le, { children: k.map((O) => /* @__PURE__ */ w(
          we,
          {
            value: O.label,
            onSelect: E,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Ut,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    e.includes(O.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              O.starred && /* @__PURE__ */ r(Yi, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: O.label }),
              O.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: O.secondaryLabel })
            ]
          },
          O.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Cm({
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
      tp,
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
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var u;
      return /* @__PURE__ */ w(ye, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(gn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(Et, { children: p })
  ] });
}
const ep = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Na = (t, e) => t[e] ?? e;
function np({
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
  return /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
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
      /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w("p", { children: [
        Na(a, "%undoButton_tooltip%"),
        s && ` (${d ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
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
      /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ w("p", { children: [
        Na(a, "%redoButton_tooltip%"),
        s && ` (${d ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function rp({ children: t, editorRef: e }) {
  const n = q(null);
  return J(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, p, m, h;
      if (!a || document.activeElement !== a) return;
      const d = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && d === "z" && (l.preventDefault(), (p = e.current) == null || p.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (d === "y" || l.shiftKey && d === "z") && (l.preventDefault(), (h = e.current) == null || h.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const kn = v.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: f(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
kn.displayName = "Input";
const op = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(st, { children: [
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
function ap({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = q(null), i = q(null), l = q(!1), [d, c] = D(t), [p, m] = D(n), [h, u] = D(!1);
  J(() => {
    c(t);
  }, [t]), J(() => {
    p !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (d !== "custom" || p ? (e(d), o(p)) : (c(t), m(n)));
  }, y = (x) => {
    var N, S, E, C;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((S = i.current) == null || S.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((E = s.current) == null ? void 0 : E.selectionStart) === 0 && ((C = i.current) == null || C.focus(), l.current = !1), d === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ w(Ne, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: op(t, a, n) }) }) }),
      /* @__PURE__ */ r(Pt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      ce,
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
          /* @__PURE__ */ r(Ke, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Pe, {}),
          /* @__PURE__ */ r(
            ie,
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
            ie,
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
            ie,
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
                  kn,
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
const sp = (t, e) => t === "f" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(Aa, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(Pa, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(Ma, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ip = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), Ze(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function lp({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(Ne, { children: [
    /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(pc, { asChild: !0, children: /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: sp(t, n) }) }) }),
      /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: ip(t, n) }) })
    ] }) }),
    /* @__PURE__ */ w(ce, { style: { zIndex: rs }, children: [
      /* @__PURE__ */ r(Ke, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Pe, {}),
      /* @__PURE__ */ w(
        ie,
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
        ie,
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
        ie,
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
const cp = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function dp({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ji, { className: e, size: 16 });
}
function ka({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ w(
    we,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(dp, { icon: t.icon }) }) }),
        /* @__PURE__ */ w("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(as, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function wp({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
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
  return /* @__PURE__ */ w(ke, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      on,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(_e, { children: [
      /* @__PURE__ */ r(yn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(le, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ r(
          ka,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ w(st, { children: [
        s.length > 0 && /* @__PURE__ */ r(xr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(le, { children: i.map((l) => {
          var d;
          return /* @__PURE__ */ r(
            ka,
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
function pp(t, e, n, o) {
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
function up(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function mp(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const fp = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Em({
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
  const p = q(null), m = q(null), h = q(null), u = q(null);
  te(() => {
    if (!u.current) return;
    const { width: B } = u.current.getBoundingClientRect();
    B > 0 && (u.current.style.width = `${B}px`);
  }, []);
  const [g, y] = D("generated"), [x, N] = D("*"), [S, E] = D("f"), [C, k] = D(!1), [I, R] = D(!0), [T, b] = D(!1), O = q(!1), $ = q(""), [V, A] = D(!1), [j, H] = D(), [Y, tt] = D(), [Tt, Bt] = D(), [$t, it] = D(), ht = q(null), K = z(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? Cc(), noteMode: "expanded" }
    }),
    [i, l]
  ), nt = z(
    () => pp(
      p,
      () => A(!1),
      d,
      $t
    ),
    [d, $t]
  );
  J(() => {
    var B;
    V || (B = p.current) == null || B.focus();
  }, [S, V]), J(() => {
    var et, ct;
    let B;
    O.current = !1, R(!0);
    const X = e == null ? void 0 : e.at(0);
    if (X && Wn("note", X)) {
      const vt = (et = X.insert.note) == null ? void 0 : et.caller;
      let xt = "custom";
      vt === Wr ? xt = "generated" : vt === Jr ? xt = "hidden" : vt && N(vt), y(xt), E(((ct = X.insert.note) == null ? void 0 : ct.style) ?? "f"), B = setTimeout(() => {
        var St;
        (St = p.current) == null || St.applyUpdate([X]);
      }, 0);
    }
    return () => {
      B && clearTimeout(B);
    };
  }, [e, s]);
  const lt = G(
    (B, X, et = !1) => {
      var vt, xt, St;
      const ct = (xt = (vt = p.current) == null ? void 0 : vt.getNoteOps(0)) == null ? void 0 : xt.at(0);
      if (ct && Wn("note", ct)) {
        if (ct.insert.note) {
          let gt;
          B === "custom" ? gt = X : B === "generated" ? gt = Wr : gt = Jr, ct.insert.note.caller = gt;
        }
        n == null || n([ct]), et && c && s && ((St = c.current) == null || St.replaceEmbedUpdate(s, [ct]));
      }
    },
    [s, n, c]
  ), rt = G(() => {
    lt(g, x, !0), o();
  }, [g, x, o, lt]), at = q(rt);
  te(() => {
    at.current = rt;
  });
  const Gt = q({ book: a.book, chapterNum: a.chapterNum });
  te(() => {
    (Gt.current.book !== a.book || Gt.current.chapterNum !== a.chapterNum) && (Gt.current = { book: a.book, chapterNum: a.chapterNum }, at.current());
  }, [a.book, a.chapterNum]);
  const It = () => {
    var X;
    const B = (X = m.current) == null ? void 0 : X.getElementsByClassName("editor-input")[0];
    B != null && B.textContent && navigator.clipboard.writeText(B.textContent);
  }, Ft = G(
    (B) => {
      y(B), lt(B, x);
    },
    [x, lt]
  ), me = G(
    (B) => {
      N(B), lt(g, B);
    },
    [g, lt]
  ), P = (B) => {
    var et, ct, vt, xt, St;
    E(B);
    const X = (ct = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : ct.at(0);
    if (X && Wn("note", X)) {
      X.insert.note && (X.insert.note.style = B);
      const gt = (xt = (vt = X.insert.note) == null ? void 0 : vt.contents) == null ? void 0 : xt.ops;
      S !== "x" && B === "x" ? gt == null || gt.forEach((_t) => up(_t)) : S === "x" && B !== "x" && (gt == null || gt.forEach((_t) => mp(_t))), (St = p.current) == null || St.applyUpdate([X, { delete: 1 }]);
    }
  }, Jt = (B) => {
    it(B.contextMarker), b(B.canRedo);
  }, fe = G(
    (B) => {
      var et, ct, vt, xt, St;
      const X = (ct = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : ct.at(0);
      if (X && Wn("note", X)) {
        B.content.length > 1 && setTimeout(() => {
          var jt;
          (jt = p.current) == null || jt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const gt = (vt = X.insert.note) == null ? void 0 : vt.style, _t = (St = (xt = X.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : St.ops;
        if (gt || k(!1), k(
          gt === "x" ? !!(_t != null && _t.every((jt) => {
            var yt, pt;
            if (!((yt = jt.attributes) != null && yt.char)) return !0;
            const M = ((pt = jt.attributes) == null ? void 0 : pt.char).style;
            return M === "xt" || M === "xo" || M === "xq";
          })) : !!(_t != null && _t.every((jt) => {
            var yt, pt;
            if (!((yt = jt.attributes) != null && yt.char)) return !0;
            const M = ((pt = jt.attributes) == null ? void 0 : pt.char).style;
            return M === "ft" || M === "fr" || M === "fq";
          }))
        ), !O.current) {
          O.current = !0, $.current = JSON.stringify(X), R(!0);
          return;
        }
        R(JSON.stringify(X) === $.current), lt(g, x);
      } else
        k(!1), R(!0);
    },
    [g, x, lt]
  ), Dt = G(() => {
    const B = window.getSelection();
    if (h.current && nt.length && B && B.rangeCount > 0) {
      const X = B.getRangeAt(0).getBoundingClientRect(), et = h.current.getBoundingClientRect();
      H(X.left - et.left), tt(X.top - et.top), Bt(X.height), A(!0);
    }
  }, [nt, h]);
  return J(() => {
    const B = () => {
      V && A(!1);
    };
    return window.addEventListener("click", B), () => {
      window.removeEventListener("click", B);
    };
  }, [V]), J(() => {
    var B;
    V && ((B = ht.current) == null || B.focus());
  }, [V]), J(() => {
    var et;
    const B = ((et = m.current) == null ? void 0 : et.querySelector(".editor-input")) ?? void 0, X = (ct) => {
      !V && B && document.activeElement === B && ct.key === l ? (ct.preventDefault(), Dt()) : V && ct.key === "Escape" && (ct.preventDefault(), A(!1));
    };
    return document.addEventListener("keydown", X), () => {
      document.removeEventListener("keydown", X);
    };
  }, [V, Dt, l]), /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ w("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            lp,
            {
              isTypeSwitchable: C,
              noteType: S,
              handleNoteTypeChange: P,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
            ap,
            {
              callerType: g,
              updateCallerType: Ft,
              customCaller: x,
              updateCustomCaller: me,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            np,
            {
              onUndoClick: () => {
                var B;
                return (B = p.current) == null ? void 0 : B.undo();
              },
              onRedoClick: () => {
                var B;
                return (B = p.current) == null ? void 0 : B.redo();
              },
              canUndo: !I,
              canRedo: T,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: rt,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Ut, {})
              }
            ) }),
            /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(gn, {}) }) }),
            /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(rp, { editorRef: p, children: /* @__PURE__ */ r(
              Ec,
              {
                options: K,
                onStateChange: Jt,
                onUsjChange: fe,
                defaultUsj: fp,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: p
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
              /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: It,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Oa, {})
                }
              ) }),
              /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ w(Ce, { open: V, children: [
      /* @__PURE__ */ r(
        jc,
        {
          className: "tw-absolute",
          style: {
            top: Y,
            left: j,
            height: Tt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        pe,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (B) => {
            B.preventDefault(), B.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            wp,
            {
              markerMenuItems: nt,
              localizedStrings: d,
              searchRef: ht
            }
          )
        }
      )
    ] })
  ] });
}
const Tm = Object.freeze([
  ...cp,
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
  ...ep
]);
function Xs(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function hp(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, d) => {
    const c = d === s.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Ao(t, l, n, !0, a),
      c && o
    ] }, Xs(t, l));
  });
}
function Ao(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = f(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ w(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Hr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Hr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return gp(
        s,
        Xs(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function gp(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ w("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Hr,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ao(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function bp({
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
  /* @__PURE__ */ w("span", { className: f("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ w(st, { children: [
    Ao(t.marker, [i], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", y = f(h, u);
  return /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ w("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: [
      d,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          y
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(st, { children: hp(t.marker, l, o, c) })
      }
    )
  ] });
}
function Sm({
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
  const p = d ?? vl(n, void 0), m = (S, E) => {
    c == null || c(S, E, a);
  }, h = s ? n.findIndex((S) => S === s) : -1, [u, g] = D(h), y = (S, E, C) => {
    if (n.length)
      switch (S.key) {
        case "Enter":
        case " ":
          S.preventDefault(), c == null || c(E, C, a);
          break;
      }
  }, x = (S) => {
    if (n.length)
      switch (S.key) {
        case "ArrowDown":
          S.preventDefault(), g((E) => Math.min(E + 1, n.length - 1));
          break;
        case "ArrowUp":
          S.preventDefault(), g((E) => Math.max(E - 1, 0));
          break;
      }
  }, N = q([]);
  return J(() => {
    var S;
    u >= 0 && u < N.current.length && ((S = N.current[u]) == null || S.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: f("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: x,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: f(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((S, E) => {
            const C = S === s, k = `${a}-${E}`;
            return /* @__PURE__ */ w(st, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (I) => {
                    N.current[E] = I;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": S.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: E === u ? 0 : -1,
                  className: f(
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
                  onClick: () => m(S, E),
                  onKeyDown: (I) => y(I, S, E),
                  children: /* @__PURE__ */ r(
                    bp,
                    {
                      footnote: S,
                      layout: o,
                      formatCaller: () => p(S.caller, E),
                      showMarkers: i
                    }
                  )
                },
                k
              ),
              E < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(mn, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function vp(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function xp({
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
    /* @__PURE__ */ r(kr, { stickyHeader: !0, children: /* @__PURE__ */ w(Te, { children: [
      /* @__PURE__ */ r(Bn, { children: a }),
      /* @__PURE__ */ r(Bn, { children: s })
    ] }) }),
    /* @__PURE__ */ r(_r, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ w(
      Te,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Qe, { children: Se(l.reference, "English") }),
          /* @__PURE__ */ r(Qe, { className: o, children: vp(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Po = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Zr.Root,
  {
    ref: n,
    className: f(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Zr.Indicator,
      {
        className: f("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Po.displayName = Zr.Root.displayName;
const yp = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(el, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(nl, { className: "tw-h-4 tw-w-4" });
}, Cr = (t, e, n) => /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
  /* @__PURE__ */ w(
    Vt,
    {
      className: f("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        yp(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Pt, { side: "bottom", children: e })
] }) }), Rm = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Cr(e, t)
}), Np = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Cr(n, t)
}), Im = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Cr(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Fr = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((c) => c !== d);
  }), o(i);
  let l = [...a];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), s(l);
}, Dm = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => Cr(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(Io, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        $n,
        {
          onClick: (d) => {
            d.stopPropagation(), Fr(
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
        $n,
        {
          onClick: (d) => {
            d.stopPropagation(), Fr(
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
        $n,
        {
          onClick: (d) => {
            d.stopPropagation(), Fr(
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
}), Om = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Mm = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Am = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, kp = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Pm = Object.freeze([
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
]), _p = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Cp = (t, e, n) => t.map((o) => {
  const a = Uo(o.key) ? o.key : o.key[0];
  return {
    items: Uo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || kp(a, e, n),
    occurrences: o.occurrences || []
  };
}), he = (t, e) => t[e] ?? e;
function $m({
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
  onItemSelected: h
}) {
  const u = he(n, "%webView_inventory_all%"), g = he(n, "%webView_inventory_approved%"), y = he(n, "%webView_inventory_unapproved%"), x = he(n, "%webView_inventory_unknown%"), N = he(n, "%webView_inventory_scope_currentBook%"), S = he(n, "%webView_inventory_scope_chapter%"), E = he(n, "%webView_inventory_scope_verse%"), C = he(n, "%webView_inventory_filter_text%"), k = he(
    n,
    "%webView_inventory_show_additional_items%"
  ), I = he(n, "%webView_inventory_no_results%"), [R, T] = D(!1), [b, O] = D("all"), [$, V] = D(""), [A, j] = D([]), H = z(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : Cp(K, a, s);
  }, [t, a, s]), Y = z(() => {
    if (R) return H;
    const K = [];
    return H.forEach((nt) => {
      const lt = nt.items[0], rt = K.find(
        (at) => at.items[0] === lt
      );
      rt ? (rt.count += nt.count, rt.occurrences = rt.occurrences.concat(nt.occurrences)) : K.push({
        items: [lt],
        count: nt.count,
        occurrences: nt.occurrences,
        status: nt.status
      });
    }), K;
  }, [R, H]), tt = z(() => Y.length === 0 ? [] : _p(Y, b, $), [Y, b, $]), Tt = z(() => {
    var lt, rt;
    if (!R) return d;
    const K = (lt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : lt.length;
    if (!K) return d;
    const nt = [];
    for (let at = 0; at < K; at++)
      nt.push(
        Np(
          ((rt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : rt[at]) || "Additional Item",
          at + 1
        )
      );
    return [...nt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, R]);
  J(() => {
    tt.length === 0 ? j([]) : tt.length === 1 && j(tt[0].items);
  }, [tt]);
  const Bt = (K, nt) => {
    nt.setRowSelection(() => {
      const rt = {};
      return rt[K.index] = !0, rt;
    });
    const lt = K.original.items;
    j(lt), h && lt.length > 0 && h(lt[0]);
  }, $t = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, it = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      O(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, ht = z(() => {
    if (Y.length === 0 || A.length === 0) return [];
    const K = Y.filter((nt) => xl(
      R ? nt.items : [nt.items[0]],
      A
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [A, R, Y]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ w(
        fn,
        {
          onValueChange: (K) => it(K),
          defaultValue: b,
          children: [
            /* @__PURE__ */ r(en, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(hn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(nn, { children: [
              /* @__PURE__ */ r(re, { value: "all", children: u }),
              /* @__PURE__ */ r(re, { value: "approved", children: g }),
              /* @__PURE__ */ r(re, { value: "unapproved", children: y }),
              /* @__PURE__ */ r(re, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(fn, { onValueChange: (K) => $t(K), defaultValue: i, children: [
        /* @__PURE__ */ r(en, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(hn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(nn, { children: [
          /* @__PURE__ */ r(re, { value: "book", children: N }),
          /* @__PURE__ */ r(re, { value: "chapter", children: S }),
          /* @__PURE__ */ r(re, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ r(
        kn,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: C,
          value: $,
          onChange: (K) => {
            V(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(At, { children: /* @__PURE__ */ w(Lt, { children: [
        /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Po,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: R,
              onCheckedChange: (K) => {
                T(K);
              }
            }
          ),
          /* @__PURE__ */ r(Et, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? k })
        ] }) }),
        /* @__PURE__ */ r(Pt, { children: (o == null ? void 0 : o.checkboxText) ?? k })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Vw,
      {
        columns: Tt,
        data: tt,
        onRowClickHandler: Bt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: I
      }
    ) }),
    ht.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      xp,
      {
        classNameForText: m,
        occurrenceData: ht,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const Ep = "16rem", Tp = "3rem", Ws = v.createContext(void 0);
function Er() {
  const t = v.useContext(Ws);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Js = v.forwardRef(
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
    const [c, p] = v.useState(t), m = e ?? c, h = v.useCallback(
      (E) => {
        const C = typeof E == "function" ? E(m) : E;
        n ? n(C) : p(C);
      },
      [n, m]
    ), u = v.useCallback(() => h((E) => !E), [h]), g = m ? "expanded" : "collapsed", N = kt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", S = v.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: h,
        toggleSidebar: u,
        side: N
      }),
      [g, m, h, u, N]
    );
    return /* @__PURE__ */ r(Ws.Provider, { value: S, children: /* @__PURE__ */ r(At, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Ep,
            "--sidebar-width-icon": Tp,
            ...a
          }
        ),
        className: f(
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
const Zs = v.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Er();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: f(
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
const Sp = v.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Er();
  return /* @__PURE__ */ w(
    F,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: f("tw-h-7 tw-w-7", t),
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
Sp.displayName = "SidebarTrigger";
const Rp = v.forwardRef(
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
        className: f(
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
Rp.displayName = "SidebarRail";
const Qs = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: f(
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
const Ip = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kn,
  {
    ref: n,
    "data-sidebar": "input",
    className: f(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Ip.displayName = "SidebarInput";
const Dp = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Dp.displayName = "SidebarHeader";
const Op = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Op.displayName = "SidebarFooter";
const Mp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Mp.displayName = "SidebarSeparator";
const ti = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: f(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
ti.displayName = "SidebarContent";
const lo = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
lo.displayName = "SidebarGroup";
const co = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? bn : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: f(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
co.displayName = "SidebarGroupLabel";
const Ap = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? bn : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: f(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Ap.displayName = "SidebarGroupAction";
const wo = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: f("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
wo.displayName = "SidebarGroupContent";
const ei = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
ei.displayName = "SidebarMenu";
const ni = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: f("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
ni.displayName = "SidebarMenuItem";
const Pp = qe(
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
), ri = v.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const d = t ? bn : "button", { state: c } = Er(), p = /* @__PURE__ */ r(
      d,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: f(Pp({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Pt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
ri.displayName = "SidebarMenuButton";
const $p = v.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? bn : "button",
  {
    ref: a,
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
    ...o
  }
));
$p.displayName = "SidebarMenuAction";
const jp = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
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
      ...e
    }
  )
);
jp.displayName = "SidebarMenuBadge";
const Lp = v.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = v.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(io, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          io,
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
Lp.displayName = "SidebarMenuSkeleton";
const Vp = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: f(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Vp.displayName = "SidebarMenuSub";
const Bp = v.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Bp.displayName = "SidebarMenuSubItem";
const Gp = v.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? bn : "a",
  {
    ref: s,
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
    ...a
  }
));
Gp.displayName = "SidebarMenuSubButton";
function Fp({
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
    (u, g) => {
      o(u, g);
    },
    [o]
  ), p = G(
    (u) => {
      const g = n.find((y) => y.projectId === u);
      return g ? g.projectName : u;
    },
    [n]
  ), m = z(
    () => n.map((u) => ({
      id: u.projectId,
      shortName: u.projectName,
      fullName: u.projectName
    })),
    [n]
  ), h = G(
    (u) => !a.projectId && u === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Zs,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ w(ti, { children: [
        /* @__PURE__ */ w(lo, { children: [
          /* @__PURE__ */ r(co, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(wo, { children: /* @__PURE__ */ r(ei, { children: Object.entries(e).map(([u, g]) => /* @__PURE__ */ r(ni, { children: /* @__PURE__ */ r(
            ri,
            {
              onClick: () => c(u),
              isActive: h(u),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: g })
            }
          ) }, u)) }) })
        ] }),
        /* @__PURE__ */ w(lo, { children: [
          /* @__PURE__ */ r(co, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(wo, { className: "tw-pl-3", children: /* @__PURE__ */ w(
            "div",
            {
              className: f(
                "tw-flex tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-px-2 tw-py-1",
                {
                  "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
                }
              ),
              children: [
                /* @__PURE__ */ r(al, { className: "tw-h-4 tw-w-4 tw-shrink-0" }),
                /* @__PURE__ */ r(
                  Yw,
                  {
                    mode: "project",
                    projects: m,
                    openTabs: [],
                    selection: { projectId: (a == null ? void 0 : a.projectId) ?? "" },
                    onChangeSelection: ({ projectId: u }) => {
                      if (!u) return;
                      const g = p(u);
                      c(g, u);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw-h-8 tw-w-full tw-flex-1 tw-justify-start tw-font-normal",
                    buttonPlaceholder: l,
                    ariaLabel: i,
                    popoverContentStyle: { zIndex: xo }
                  }
                )
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
const $o = Fn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = kt();
    return /* @__PURE__ */ w("div", { id: i, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Ea,
        {
          className: f(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": d === "rtl" },
            { "tw-left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        kn,
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
          className: f(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": d === "rtl" },
            { "tw-right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(gn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
$o.displayName = "SearchBar";
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
      $o,
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
            Fp,
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
const Ge = "scrBook", zp = "scrRef", Je = "source", Kp = "details", qp = "Scripture Reference", Hp = "Scripture Book", oi = "Type", Up = "Details";
function Yp(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Ge,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? qp,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Ge ? Se(a.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Yr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Se(o.start),
      id: zp,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Se(a.start);
      },
      sortingFn: (o, a) => Yr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Je,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? oi : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Kp,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Up,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Xp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Yr(t.start, t.end) === 0 ? `${Tr(t.start)}+${e}` : `${Tr(t.start)}+${e}-${Tr(t.end)}+${n}`;
}, _a = (t) => `${Xp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
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
  const [c, p] = D([]), [m, h] = D([{ id: Ge, desc: !1 }]), [u, g] = D({}), y = z(
    () => t.flatMap((b) => b.data.map((O) => ({
      ...O,
      source: b.source
    }))),
    [t]
  ), x = z(
    () => Yp(
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
    c.includes(Je) ? h([
      { id: Je, desc: !1 },
      { id: Ge, desc: !1 }
    ]) : h([{ id: Ge, desc: !1 }]);
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
    onSortingChange: h,
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
      const b = N.getSelectedRowModel().rowsById, O = Object.keys(b);
      if (O.length === 1) {
        const $ = y.find((V) => _a(V) === O[0]) || void 0;
        $ && l($);
      }
    }
  }, [u, y, l, N]);
  const S = a ?? Hp, E = s ?? oi, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${S}`, value: [Ge] },
    { label: `Group by ${E}`, value: [Je] },
    {
      label: `Group by ${S} and ${E}`,
      value: [Ge, Je]
    },
    {
      label: `Group by ${E} and ${S}`,
      value: [Je, Ge]
    }
  ], k = (b) => {
    p(JSON.parse(b));
  }, I = (b, O) => {
    !b.getIsGrouped() && !b.getIsSelected() && b.getToggleSelectedHandler()(O);
  }, R = (b, O) => b.getIsGrouped() ? "" : f("banded-row", O % 2 === 0 ? "even" : "odd"), T = (b, O, $) => {
    if (!((b == null ? void 0 : b.length) === 0 || O.depth < $.column.getGroupedIndex())) {
      if (O.getIsGrouped())
        switch (O.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (O.depth) {
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
      fn,
      {
        value: JSON.stringify(c),
        onValueChange: (b) => {
          k(b);
        },
        children: [
          /* @__PURE__ */ r(en, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(hn, {}) }),
          /* @__PURE__ */ r(nn, { position: "item-aligned", children: /* @__PURE__ */ r(Sw, { children: C.map((b) => /* @__PURE__ */ r(re, { value: JSON.stringify(b.value), children: b.label }, b.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(Nr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(kr, { children: N.getHeaderGroups().map((b) => /* @__PURE__ */ r(Te, { children: b.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Bn, { colSpan: O.colSpan, className: "top-0 tw-sticky", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          An(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, b.id)) }),
      /* @__PURE__ */ r(_r, { children: N.getRowModel().rows.map((b, O) => {
        const $ = kt();
        return /* @__PURE__ */ r(
          Te,
          {
            "data-state": b.getIsSelected() ? "selected" : "",
            className: f(R(b, O)),
            onClick: (V) => I(b, V),
            children: b.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== Je || !n)))
                return /* @__PURE__ */ r(
                  Qe,
                  {
                    className: f(
                      V.column.columnDef.id,
                      "tw-p-[1px]",
                      T(c, b, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ w(
                      F,
                      {
                        variant: "link",
                        onClick: b.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          b.getIsExpanded() && /* @__PURE__ */ r(De, {}),
                          !b.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(wn, {}) : /* @__PURE__ */ r(qr, {})),
                          " ",
                          An(V.column.columnDef.cell, V.getContext()),
                          " (",
                          b.subRows.length,
                          ")"
                        ]
                      }
                    ) : An(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          b.id
        );
      }) })
    ] })
  ] });
}
const jo = (t, e) => t.filter((n) => {
  try {
    return Mn(n) === e;
  } catch {
    return !1;
  }
}), ai = (t, e, n) => jo(t, e).every((o) => n.includes(o));
function Wp({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = jo(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], d = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
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
function Jp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, N] = D(!1), [S, E] = D(""), C = q(void 0), k = q(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const I = z(() => wt.allBookIds.filter(
    (j, H) => t[H] === "1" && !wt.isObsolete(wt.bookIdToNumber(j))
  ), [t]), R = z(() => {
    if (!S.trim()) {
      const Y = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return I.forEach((tt) => {
        const Tt = Mn(tt);
        Y[Tt].push(tt);
      }), Y;
    }
    const j = I.filter(
      (Y) => No(Y, S, a)
    ), H = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return j.forEach((Y) => {
      const tt = Mn(Y);
      H[tt].push(Y);
    }), H;
  }, [I, S, a]), T = G(
    (j, H = !1) => {
      if (!H || !C.current) {
        n(
          e.includes(j) ? e.filter((it) => it !== j) : [...e, j]
        ), C.current = j;
        return;
      }
      const Y = I.findIndex((it) => it === C.current), tt = I.findIndex((it) => it === j);
      if (Y === -1 || tt === -1) return;
      const [Tt, Bt] = [
        Math.min(Y, tt),
        Math.max(Y, tt)
      ], $t = I.slice(Tt, Bt + 1).map((it) => it);
      n(
        e.includes(j) ? e.filter((it) => !$t.includes(it)) : [.../* @__PURE__ */ new Set([...e, ...$t])]
      );
    },
    [e, n, I]
  ), b = (j) => {
    T(j, k.current), k.current = !1;
  }, O = (j, H) => {
    j.preventDefault(), T(H, j.shiftKey);
  }, $ = G(
    (j) => {
      const H = jo(I, j).map((Y) => Y);
      n(
        ai(I, j, e) ? e.filter((Y) => !H.includes(Y)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, n, I]
  ), V = () => {
    n(I.map((j) => j));
  }, A = () => {
    n([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Q).map((j) => /* @__PURE__ */ r(
      Wp,
      {
        section: j,
        availableBookIds: I,
        selectedBookIds: e,
        onToggle: $,
        localizedStrings: o
      },
      j
    )) }),
    /* @__PURE__ */ w(
      Ce,
      {
        open: x,
        onOpenChange: (j) => {
          N(j), j || E("");
        },
        children: [
          /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ w(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(fo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(pe, { className: "tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0", align: "start", children: /* @__PURE__ */ w(
            ke,
            {
              shouldFilter: !1,
              onKeyDown: (j) => {
                j.key === "Enter" && (k.current = j.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  on,
                  {
                    placeholder: l,
                    value: S,
                    onValueChange: E
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: V, children: d }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: A, children: c })
                ] }),
                /* @__PURE__ */ w(_e, { children: [
                  /* @__PURE__ */ r(yn, { children: p }),
                  Object.values(Q).map((j, H) => {
                    const Y = R[j];
                    if (Y.length !== 0)
                      return /* @__PURE__ */ w(mo, { children: [
                        /* @__PURE__ */ r(
                          le,
                          {
                            heading: ss(j, h, u, g, y),
                            children: Y.map((tt) => /* @__PURE__ */ r(
                              ls,
                              {
                                bookId: tt,
                                isSelected: e.includes(tt),
                                onSelect: () => b(tt),
                                onMouseDown: (Tt) => O(Tt, tt),
                                section: Mn(tt),
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
                      ] }, j);
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
      ).map((j) => /* @__PURE__ */ r(ye, { className: "hover:tw-bg-secondary", variant: "secondary", children: Fe(j, a) }, j)),
      e.length > zr && /* @__PURE__ */ r(
        ye,
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
]), Mt = (t, e) => t[e] ?? e, Zp = Object.freeze([" ", "-"]);
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
  onRangeStartChange: h,
  onRangeEndChange: u,
  currentScrRef: g,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: x,
  getEndVerse: N,
  hideLabel: S = !1,
  buttonClassName: E
}) {
  const C = Mt(
    i,
    "%webView_scope_selector_selected_text%"
  ), k = Mt(i, "%webView_scope_selector_verse%"), I = Mt(i, "%webView_scope_selector_chapter%"), R = Mt(i, "%webView_scope_selector_book%"), T = Mt(
    i,
    "%webView_scope_selector_current_verse%"
  ), b = Mt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), O = Mt(i, "%webView_scope_selector_current_book%"), $ = Mt(i, "%webView_scope_selector_choose_books%"), V = Mt(i, "%webView_scope_selector_scope%"), A = Mt(i, "%webView_scope_selector_select_books%"), j = Mt(i, "%webView_scope_selector_range%"), H = Mt(i, "%webView_scope_selector_select_range%"), Y = Mt(i, "%webView_scope_selector_range_start%"), tt = Mt(i, "%webView_scope_selector_range_end%"), Tt = Mt(i, "%webView_scope_selector_ok%"), Bt = Mt(i, "%webView_scope_selector_cancel%"), $t = Mt(i, "%webView_scope_selector_navigate%"), it = (L) => {
    if (!g) return;
    const W = g.book.toUpperCase();
    switch (L) {
      case "verse":
        return Se(g, "id");
      case "chapter":
        return `${W} ${g.chapterNum}`;
      case "book":
        return W;
      default:
        return;
    }
  }, ht = [
    { value: "selectedText", label: C, id: "scope-selected-text" },
    {
      value: "verse",
      label: k,
      dropdownLabel: T,
      scrRefSuffix: it("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: I,
      dropdownLabel: b,
      scrRefSuffix: it("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: R,
      dropdownLabel: O,
      scrRefSuffix: it("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: $, id: "scope-selected" },
    { value: "range", label: j, id: "scope-range" }
  ], K = (L, W, Ht = !1) => /* @__PURE__ */ w(st, { children: [
    L,
    W && !Ht && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
      ": ",
      W
    ] })
  ] }), nt = e ? ht.filter((L) => e.includes(L.value)) : ht, lt = g ?? Sr, rt = p ?? lt, at = m ?? lt, Gt = () => {
  }, It = q(null), Ft = q(null), me = q(!1), P = q(null), Jt = q(!1), [fe, Dt] = D(void 0), B = q(!1), X = q(!1), et = q(null), ct = G((L) => {
    if (L) {
      Dt("start"), B.current = !1;
      return;
    }
    Dt((W) => W === "start" ? void 0 : W), B.current && (B.current = !1, requestAnimationFrame(() => {
      var Ht;
      const W = (Ht = It.current) == null ? void 0 : Ht.querySelector("button");
      W == null || W.click();
    }));
  }, []), vt = G((L) => {
    if (L) {
      Dt("end"), X.current = !1;
      return;
    }
    Dt((W) => W === "end" ? void 0 : W);
  }, []), xt = G(
    (L) => {
      h == null || h(L), u == null || u(L), B.current = !0;
    },
    [h, u]
  ), St = G(
    (L) => {
      u == null || u(L), X.current = !0;
    },
    [u]
  ), gt = G(
    (L) => {
      n(L), L === "selectedBooks" && a.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [n, a, g, s]
  ), _t = nt.find((L) => L.value === t), jt = () => t === "selectedBooks" && a.length > 0 ? a.map((L) => L.toUpperCase()).join(", ") : t === "range" ? yl(rt, at, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : _t ? K(_t.label, _t.scrRefSuffix) : t, M = nt.filter(
    (L) => L.value !== "selectedBooks" && L.value !== "range"
  ), yt = nt.find((L) => L.value === "selectedBooks"), pt = nt.find((L) => L.value === "range"), [Le, He] = D(!1), [Ue, an] = D(void 0), [Ve, _n] = D(void 0), [Be, Cn] = D(void 0), [Ye, En] = D(void 0), [Tn, Kn] = D([]), qn = c === "dropdown" && Ue === "selectedBooks", _ = /* @__PURE__ */ r(
    Jp,
    {
      availableBookInfo: o,
      selectedBookIds: qn ? Tn : a,
      onChangeSelectedBookIds: qn ? Kn : s,
      localizedStrings: i,
      localizedBookNames: l
    }
  ), U = fe === "end", Z = fe === "start", Rt = "tw-text-muted-foreground", ne = c === "dropdown" && Ue === "range", sn = ne ? Cn : xt, zt = ne ? En : u ? St : Gt, Ct = /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-wrap tw-items-end tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-start", className: f(U && Rt), children: Y }),
      /* @__PURE__ */ r(
        Dr,
        {
          id: "scope-range-start",
          scrRef: ne ? Be ?? rt : rt,
          handleSubmit: sn,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          submitKeys: Zp,
          onOpenChange: ct,
          className: f(U && Rt),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { ref: It, className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-end", className: f(Z && Rt), children: tt }),
      /* @__PURE__ */ r(
        Dr,
        {
          id: "scope-range-end",
          scrRef: ne ? Ye ?? at : at,
          handleSubmit: zt,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          disableReferencesUpTo: ne ? Be ?? rt : rt,
          onOpenChange: vt,
          onCloseAutoFocus: (L) => {
            var W;
            X.current && (X.current = !1, L.preventDefault(), (W = et.current) == null || W.focus());
          },
          className: f(Z && Rt),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Ot = q({}), bt = G(
    (L) => (W) => {
      Ot.current[L] = W;
    },
    []
  ), Zt = q(null);
  J(() => {
    if (!Le) return;
    let L = 0;
    const W = requestAnimationFrame(() => {
      L = requestAnimationFrame(() => {
        var Ht;
        (Ht = Ot.current[t]) == null || Ht.focus();
      });
    });
    return () => {
      cancelAnimationFrame(W), L && cancelAnimationFrame(L);
    };
  }, [Le, t]);
  const [Qt, Xe] = D(null), [Hn, Ni] = D(null), [Un, ki] = D(null), _i = 200, [Ci, Ei] = D(!1);
  J(() => {
    if (!Un || typeof ResizeObserver > "u") return;
    const L = new ResizeObserver(([W]) => {
      Ei(W.contentRect.width < _i);
    });
    return L.observe(Un), () => L.disconnect();
  }, [Un]);
  const Lo = G(
    (L) => {
      _n(L), Cn(rt), En(at), Kn(a), He(!1), an(L);
    },
    [rt, at, a]
  ), Vo = G(() => {
    Ve !== void 0 && (Ve === "range" ? (Be && (h == null || h(Be)), Ye && (u == null || u(Ye))) : Ve === "selectedBooks" && s(Tn), gt(Ve), an(void 0), _n(void 0));
  }, [
    Ve,
    Be,
    Ye,
    Tn,
    h,
    u,
    s,
    gt
  ]), Yn = G((L) => {
    L || (an(void 0), _n(void 0));
  }, []), Bo = G((L) => {
    var W;
    L.preventDefault(), (W = Zt.current) == null || W.focus();
  }, []), Go = (L) => t === L ? /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }) : void 0;
  return /* @__PURE__ */ w("div", { id: d, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      !S && /* @__PURE__ */ r(Et, { children: V }),
      c === "dropdown" ? /* @__PURE__ */ w(Ne, { open: Le, onOpenChange: He, children: [
        /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ w(
          F,
          {
            ref: Zt,
            variant: "outline",
            role: "combobox",
            className: f(
              "tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",
              E
            ),
            children: [
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: jt() }),
              /* @__PURE__ */ r(De, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ r(
          ce,
          {
            ref: ki,
            className: "tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ w(Rr, { container: Un, children: [
              M.map(({ value: L, label: W, dropdownLabel: Ht, scrRefSuffix: Rn, id: Ti }) => /* @__PURE__ */ w(
                ze,
                {
                  ref: bt(L),
                  className: "tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground",
                  onSelect: () => gt(L),
                  "data-selected": t === L ? "true" : void 0,
                  children: [
                    t === L && /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }),
                    K(Ht ?? W, Rn, Ci)
                  ]
                },
                Ti
              )),
              (yt || pt) && /* @__PURE__ */ r(Pe, {}),
              yt && /* @__PURE__ */ w(
                ze,
                {
                  ref: bt("selectedBooks"),
                  className: f(
                    "tw-relative tw-ps-8",
                    "data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
                  ),
                  onSelect: () => Lo("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Go("selectedBooks"),
                    `${yt.label}…`
                  ]
                }
              ),
              pt && /* @__PURE__ */ w(
                ze,
                {
                  ref: bt("range"),
                  className: f(
                    "tw-relative tw-ps-8",
                    "data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
                  ),
                  onSelect: () => Lo("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Go("range"),
                    `${pt.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ w(st, { children: [
                /* @__PURE__ */ r(Pe, {}),
                /* @__PURE__ */ r(Ke, { className: "tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground", children: $t }),
                /* @__PURE__ */ r(
                  ze,
                  {
                    ref: P,
                    className: "tw-p-0",
                    onSelect: (L) => {
                      var W, Ht;
                      if (L.preventDefault(), me.current) {
                        me.current = !1;
                        return;
                      }
                      Jt.current || (Ht = (W = Ft.current) == null ? void 0 : W.querySelector("button")) == null || Ht.click();
                    },
                    children: /* @__PURE__ */ r(
                      "div",
                      {
                        ref: Ft,
                        className: "tw-w-full tw-px-1 tw-pb-1",
                        onPointerDownCapture: (L) => {
                          const W = L.target instanceof HTMLElement ? L.target : void 0;
                          W != null && W.closest("button") && (me.current = !0, requestAnimationFrame(() => {
                            me.current = !1;
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
                            onOpenChange: (L) => {
                              Jt.current = L;
                            },
                            onCloseAutoFocus: (L) => {
                              var W;
                              L.preventDefault(), (W = P.current) == null || W.focus();
                            },
                            modal: !0,
                            className: "tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",
                            triggerContent: /* @__PURE__ */ w(st, { children: [
                              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Se(g ?? Sr, "id") }),
                              /* @__PURE__ */ r(De, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
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
        ko,
        {
          value: t,
          onValueChange: gt,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: nt.map(({ value: L, label: W, scrRefSuffix: Ht, id: Rn }) => /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(dr, { className: "tw-me-2", value: L, id: Rn }),
            /* @__PURE__ */ r(Et, { htmlFor: Rn, children: K(W, Ht) })
          ] }, Rn))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { children: A }),
      _
    ] }),
    c === "radio" && t === "range" && Ct,
    c === "dropdown" && yt && /* @__PURE__ */ r(eo, { open: Ue === "selectedBooks", onOpenChange: Yn, children: /* @__PURE__ */ r(
      ir,
      {
        ref: Ni,
        onCloseAutoFocus: Bo,
        onEscapeKeyDown: (L) => {
          Hn != null && Hn.querySelector('[data-state="open"]') && L.preventDefault();
        },
        children: /* @__PURE__ */ w(Rr, { container: Hn, children: [
          /* @__PURE__ */ r(lr, { className: "tw-pe-8", children: /* @__PURE__ */ r(cr, { children: $ }) }),
          _,
          /* @__PURE__ */ w(no, { children: [
            /* @__PURE__ */ r(F, { variant: "outline", onClick: () => Yn(!1), children: Bt }),
            /* @__PURE__ */ r(F, { onClick: Vo, children: Tt })
          ] })
        ] })
      }
    ) }),
    c === "dropdown" && pt && /* @__PURE__ */ r(eo, { open: Ue === "range", onOpenChange: Yn, children: /* @__PURE__ */ r(
      ir,
      {
        ref: Xe,
        onCloseAutoFocus: Bo,
        onEscapeKeyDown: (L) => {
          Qt != null && Qt.querySelector('[data-state="open"]') && L.preventDefault();
        },
        children: /* @__PURE__ */ w(Rr, { container: Qt, children: [
          /* @__PURE__ */ r(lr, { className: "tw-pe-8", children: /* @__PURE__ */ r(cr, { children: H }) }),
          Ct,
          /* @__PURE__ */ w(no, { children: [
            /* @__PURE__ */ r(F, { variant: "outline", onClick: () => Yn(!1), children: Bt }),
            /* @__PURE__ */ r(F, { ref: et, onClick: Vo, children: Tt })
          ] })
        ] })
      }
    ) })
  ] });
}
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
    ...tr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, p]) => [
          c,
          c === p && c in tr ? tr[c] : p
        ]
      )
    )
  }, d = kt();
  return /* @__PURE__ */ w(
    fn,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(en, { size: a, className: f("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          hn,
          {
            placeholder: l[Ur(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          nn,
          {
            id: i,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: zn },
            children: t.map((c) => /* @__PURE__ */ r(re, { value: `${c}`, children: l[Ur(c)] }, `${c}`))
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
    n ? /* @__PURE__ */ r(mn, {}) : ""
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
      className: f("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ii = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Lt, { children: [
  /* @__PURE__ */ r(Vt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    ze,
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
  l.tooltip && /* @__PURE__ */ r(Pt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function po({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(Ne, { variant: s, children: [
    /* @__PURE__ */ r(Ae, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(sl, {}) }) }),
    /* @__PURE__ */ r(ce, { align: "start", style: { zIndex: zn }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, p) => /* @__PURE__ */ w(mo, { children: [
      /* @__PURE__ */ r(zs, { children: /* @__PURE__ */ r(At, { children: ii(e.groups, e.items, d, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(Pe, {})
    ] }, d)) })
  ] });
}
const li = v.forwardRef(
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
      po,
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
        po,
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
    po,
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
const ci = v.forwardRef(({ className: t, ...e }, n) => {
  const o = kt();
  return /* @__PURE__ */ r(
    Wt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ci.displayName = Wt.List.displayName;
const di = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.List,
  {
    ref: n,
    className: f(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
di.displayName = Wt.List.displayName;
const Qp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Trigger,
  {
    ref: n,
    ...e,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), wi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Content,
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
wi.displayName = Wt.Content.displayName;
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
        $o,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(ci, { children: [
      /* @__PURE__ */ r(di, { children: t.map((l) => /* @__PURE__ */ r(Qp, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(wi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function tu({ ...t }) {
  return /* @__PURE__ */ r(mt.Menu, { ...t });
}
function eu({ ...t }) {
  return /* @__PURE__ */ r(mt.Sub, { "data-slot": "menubar-sub", ...t });
}
const pi = v.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = v.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Mo.Provider, { value: a, children: /* @__PURE__ */ r(
    mt.Root,
    {
      ref: o,
      className: f(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
pi.displayName = mt.Root.displayName;
const ui = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ue();
  return /* @__PURE__ */ r(
    mt.Trigger,
    {
      ref: n,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        je({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ui.displayName = mt.Trigger.displayName;
const mi = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = ue();
  return /* @__PURE__ */ w(
    mt.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        je({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(wn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
mi.displayName = mt.SubTrigger.displayName;
const fi = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ue();
  return /* @__PURE__ */ r(
    mt.SubContent,
    {
      ref: n,
      className: f(
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
fi.displayName = mt.SubContent.displayName;
const hi = v.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = ue();
  return /* @__PURE__ */ r(mt.Portal, { children: /* @__PURE__ */ r(
    mt.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: f(
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
hi.displayName = mt.Content.displayName;
const gi = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ue();
  return /* @__PURE__ */ r(
    mt.Item,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        je({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
gi.displayName = mt.Item.displayName;
const nu = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = ue();
  return /* @__PURE__ */ w(
    mt.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        je({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
nu.displayName = mt.CheckboxItem.displayName;
const ru = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ue();
  return /* @__PURE__ */ w(
    mt.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        je({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
ru.displayName = mt.RadioItem.displayName;
const ou = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  mt.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
ou.displayName = mt.Label.displayName;
const bi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
bi.displayName = mt.Separator.displayName;
const Dn = (t, e) => {
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
    const l = e.filter((c) => c.group === s).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
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
      ) : /* @__PURE__ */ w(eu, { children: [
        /* @__PURE__ */ r(mi, { children: c.label }),
        /* @__PURE__ */ r(fi, { children: vi(
          t,
          e,
          si(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Pt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && i < a.length - 1 && d.push(/* @__PURE__ */ r(bi, {}, `separator-${s}`)), d;
  });
};
function au({
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
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        Dn(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Dn(s, [h, u]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), Dn(i, [h, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), Dn(l, [h, u]);
        break;
      case "alt+h":
        (N = d.current) == null || N.focus(), Dn(d, [h, u]);
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
    return /* @__PURE__ */ r(pi, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, m]) => typeof p == "boolean" || typeof m == "boolean" ? 0 : p.order - m.order).map(([p, m]) => /* @__PURE__ */ w(tu, { children: [
      /* @__PURE__ */ r(ui, { ref: c(p), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        hi,
        {
          style: { zIndex: zn },
          children: /* @__PURE__ */ r(At, { children: vi(t.groups, t.items, p, e) })
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
      className: f("tw-border tw-px-4 tw-text-foreground", o),
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
                    au,
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
const su = (t, e) => t[e] ?? e;
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
  const c = su(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, m] = D(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((y) => y !== g)]), s && n.find((y) => y === g) && s([...n.filter((y) => y !== g)]), m(!1);
  }, u = (g, y) => {
    var N, S, E, C, k, I;
    const x = y !== g ? ((S = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : S[y]) ?? ((C = (E = t[g]) == null ? void 0 : E.uiNames) == null ? void 0 : C.en) : void 0;
    return x ? `${(k = t[g]) == null ? void 0 : k.autonym} (${x})` : (I = t[g]) == null ? void 0 : I.autonym;
  };
  return /* @__PURE__ */ w("div", { id: d, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      fn,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(en, { children: /* @__PURE__ */ r(hn, {}) }),
          /* @__PURE__ */ r(
            nn,
            {
              style: { zIndex: zn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(re, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(Et, { className: "tw-font-normal tw-text-muted-foreground", children: Ze(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function iu({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Et, { children: e(t) }) : n ? /* @__PURE__ */ r(Et, { children: n(t) }) : /* @__PURE__ */ r(Et, { children: t });
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
      Po,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => a(l, d)
      }
    ),
    /* @__PURE__ */ r(
      iu,
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
      className: f(
        // Tight, inline link-button styling — no extra padding / height. Consumers can override
        // typography (font, size) via the `className` prop.
        "tw-h-auto tw-p-0 tw-text-start tw-font-mono tw-text-sm",
        a
      ),
      "data-testid": s,
      children: t
    }
  );
  return n ? /* @__PURE__ */ r(At, { delayDuration: 0, children: /* @__PURE__ */ w(Lt, { children: [
    /* @__PURE__ */ r(Vt, { asChild: !0, children: i }),
    /* @__PURE__ */ r(Pt, { children: n })
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
  showDropdownOnHover: h = !1
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
      className: f(
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
            !e && h && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ w(Ne, { children: [
              /* @__PURE__ */ r(Ae, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ho, {}) }) }),
              /* @__PURE__ */ r(ce, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ w(Ne, { children: [
              /* @__PURE__ */ r(Ae, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ho, {}) }) }),
              /* @__PURE__ */ r(ce, { align: "end", children: c })
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
const lu = Fn(({ className: t, ...e }, n) => /* @__PURE__ */ r(cl, { size: 35, className: f("tw-animate-spin", t), ...e, ref: n }));
lu.displayName = "Spinner";
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
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ w("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      Et,
      {
        htmlFor: t,
        className: f({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      kn,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: f(d, { "tw-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: m,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
const cu = qe(
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
), du = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: f(
      // CUSTOM
      "pr-twp",
      cu({ variant: e }),
      t
    ),
    ...n
  }
));
du.displayName = "Alert";
const wu = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ w(
    "h5",
    {
      ref: n,
      className: f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
wu.displayName = "AlertTitle";
const pu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
pu.displayName = "AlertDescription";
const ef = ft.Root, nf = ft.Trigger, rf = ft.Group, of = ft.Portal, af = ft.Sub, sf = ft.RadioGroup, uu = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
  ft.SubTrigger,
  {
    ref: a,
    className: f(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(wn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
uu.displayName = ft.SubTrigger.displayName;
const mu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.SubContent,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
mu.displayName = ft.SubContent.displayName;
const fu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ft.Portal, { children: /* @__PURE__ */ r(
  ft.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
fu.displayName = ft.Content.displayName;
const hu = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ft.Item,
  {
    ref: o,
    className: f(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
hu.displayName = ft.Item.displayName;
const gu = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
  ft.CheckboxItem,
  {
    ref: a,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
gu.displayName = ft.CheckboxItem.displayName;
const bu = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  ft.RadioItem,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(br, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
bu.displayName = ft.RadioItem.displayName;
const vu = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ft.Label,
  {
    ref: o,
    className: f(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
vu.displayName = ft.Label.displayName;
const xu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
xu.displayName = ft.Separator.displayName;
function yu({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
yu.displayName = "ContextMenuShortcut";
const xi = v.createContext({
  direction: "bottom"
});
function Nu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = v.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(xi.Provider, { value: o, children: /* @__PURE__ */ r(
    de.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
Nu.displayName = "Drawer";
const lf = de.Trigger, ku = de.Portal, cf = de.Close, yi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  de.Overlay,
  {
    ref: n,
    className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
yi.displayName = de.Overlay.displayName;
const _u = v.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = v.useContext(xi), i = {
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
  return /* @__PURE__ */ w(ku, { children: [
    /* @__PURE__ */ r(yi, {}),
    /* @__PURE__ */ w(
      de.Content,
      {
        ref: a,
        className: f(
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
_u.displayName = "DrawerContent";
function Cu({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Cu.displayName = "DrawerHeader";
function Eu({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Eu.displayName = "DrawerFooter";
const Tu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  de.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Tu.displayName = de.Title.displayName;
const Su = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  de.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Su.displayName = de.Description.displayName;
const Ru = v.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Qr.Root,
  {
    ref: o,
    className: f(
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
Ru.displayName = Qr.Root.displayName;
function df({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    vo.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const wf = vo.Panel;
function pf({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    vo.PanelResizeHandle,
    {
      className: f(
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
const Iu = v.forwardRef(({ className: t, ...e }, n) => {
  const o = kt();
  return /* @__PURE__ */ w(
    On.Root,
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(On.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(On.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(On.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Iu.displayName = On.Root.displayName;
const Du = v.forwardRef(({ className: t, ...e }, n) => {
  const o = kt();
  return /* @__PURE__ */ r(
    to.Root,
    {
      className: f(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        to.Thumb,
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
});
Du.displayName = to.Root.displayName;
const mf = Wt.Root, Ou = v.forwardRef(({ className: t, ...e }, n) => {
  const o = kt();
  return /* @__PURE__ */ r(
    Wt.List,
    {
      ref: n,
      className: f(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
Ou.displayName = Wt.List.displayName;
const Mu = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Trigger,
  {
    ref: n,
    className: f(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Mu.displayName = Wt.Trigger.displayName;
const Au = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Au.displayName = Wt.Content.displayName;
const Pu = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: f(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Pu.displayName = "Textarea";
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
function $u(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const ju = (t, e, n = {}) => {
  const o = q(e);
  o.current = e;
  const a = q(n);
  a.current = $u(a.current);
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
}, Kr = () => !1, hf = (t, e) => {
  const [n] = ju(
    G(async () => {
      if (!t) return Kr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Kr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  J(() => () => {
    n !== Kr && n();
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
function Lu(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Lu(`*, ::before, ::after {
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
  du as Alert,
  pu as AlertDescription,
  wu as AlertTitle,
  Gs as Avatar,
  Fs as AvatarFallback,
  yw as AvatarImage,
  pm as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  um as BOOK_SELECTOR_STRING_KEYS,
  ye as Badge,
  Dr as BookChapterControl,
  ro as BookSelectionMode,
  mm as BookSelector,
  F as Button,
  hm as COMMENT_EDITOR_STRING_KEYS,
  gm as COMMENT_LIST_STRING_KEYS,
  Vs as Card,
  Bs as CardContent,
  vw as CardDescription,
  xw as CardFooter,
  gw as CardHeader,
  bw as CardTitle,
  Hc as ChapterRangeSelector,
  Po as Checkbox,
  Jm as Checklist,
  oa as ComboBox,
  ke as Command,
  yn as CommandEmpty,
  le as CommandGroup,
  on as CommandInput,
  we as CommandItem,
  _e as CommandList,
  fm as CommentEditor,
  bm as CommentList,
  ef as ContextMenu,
  gu as ContextMenuCheckboxItem,
  fu as ContextMenuContent,
  rf as ContextMenuGroup,
  hu as ContextMenuItem,
  vu as ContextMenuLabel,
  of as ContextMenuPortal,
  sf as ContextMenuRadioGroup,
  bu as ContextMenuRadioItem,
  xu as ContextMenuSeparator,
  yu as ContextMenuShortcut,
  af as ContextMenuSub,
  mu as ContextMenuSubContent,
  uu as ContextMenuSubTrigger,
  nf as ContextMenuTrigger,
  Vw as DataTable,
  eo as Dialog,
  dm as DialogClose,
  ir as DialogContent,
  Pc as DialogDescription,
  no as DialogFooter,
  lr as DialogHeader,
  os as DialogOverlay,
  Ac as DialogPortal,
  cr as DialogTitle,
  cm as DialogTrigger,
  Nu as Drawer,
  cf as DrawerClose,
  _u as DrawerContent,
  Su as DrawerDescription,
  Eu as DrawerFooter,
  Cu as DrawerHeader,
  yi as DrawerOverlay,
  ku as DrawerPortal,
  Tu as DrawerTitle,
  lf as DrawerTrigger,
  Ne as DropdownMenu,
  ie as DropdownMenuCheckboxItem,
  ce as DropdownMenuContent,
  zs as DropdownMenuGroup,
  ze as DropdownMenuItem,
  Zw as DropdownMenuItemType,
  Ke as DropdownMenuLabel,
  Nw as DropdownMenuPortal,
  _w as DropdownMenuRadioGroup,
  Hs as DropdownMenuRadioItem,
  Pe as DropdownMenuSeparator,
  Cw as DropdownMenuShortcut,
  kw as DropdownMenuSub,
  qs as DropdownMenuSubContent,
  Ks as DropdownMenuSubTrigger,
  Ae as DropdownMenuTrigger,
  Ww as ERROR_DUMP_STRING_KEYS,
  xm as ERROR_POPOVER_STRING_KEYS,
  rp as EditorKeyboardShortcuts,
  Jw as ErrorDump,
  ym as ErrorPopover,
  Tm as FOOTNOTE_EDITOR_STRING_KEYS,
  Cm as Filter,
  Nm as FilterDropdown,
  _m as Footer,
  Em as FootnoteEditor,
  bp as FootnoteItem,
  Sm as FootnoteList,
  Pm as INVENTORY_STRING_KEYS,
  kn as Input,
  $m as Inventory,
  Et as Label,
  Zm as LinkedScrRefButton,
  cp as MARKER_MENU_STRING_KEYS,
  vm as MarkdownRenderer,
  wp as MarkerMenu,
  km as MoreInfo,
  tp as MultiSelectComboBox,
  Um as NavigationContentSearch,
  Ce as Popover,
  jc as PopoverAnchor,
  pe as PopoverContent,
  Rr as PopoverPortalContainerProvider,
  $e as PopoverTrigger,
  Ru as Progress,
  Yw as ProjectSelector,
  ko as RadioGroup,
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
  $o as SearchBar,
  fn as Select,
  nn as SelectContent,
  Sw as SelectGroup,
  re as SelectItem,
  Iw as SelectLabel,
  Ys as SelectScrollDownButton,
  Us as SelectScrollUpButton,
  Dw as SelectSeparator,
  en as SelectTrigger,
  hn as SelectValue,
  mn as Separator,
  Fm as SettingsList,
  Km as SettingsListHeader,
  zm as SettingsListItem,
  Fp as SettingsSidebar,
  jm as SettingsSidebarContentSearch,
  Zs as Sidebar,
  ti as SidebarContent,
  Op as SidebarFooter,
  lo as SidebarGroup,
  Ap as SidebarGroupAction,
  wo as SidebarGroupContent,
  co as SidebarGroupLabel,
  Dp as SidebarHeader,
  Ip as SidebarInput,
  Qs as SidebarInset,
  ei as SidebarMenu,
  $p as SidebarMenuAction,
  jp as SidebarMenuBadge,
  ri as SidebarMenuButton,
  ni as SidebarMenuItem,
  Lp as SidebarMenuSkeleton,
  Vp as SidebarMenuSub,
  Gp as SidebarMenuSubButton,
  Bp as SidebarMenuSubItem,
  Js as SidebarProvider,
  Rp as SidebarRail,
  Mp as SidebarSeparator,
  Sp as SidebarTrigger,
  io as Skeleton,
  Iu as Slider,
  uf as Sonner,
  lu as Spinner,
  Du as Switch,
  po as TabDropdownMenu,
  Hm as TabFloatingMenu,
  qm as TabToolbar,
  Nr as Table,
  _r as TableBody,
  Lw as TableCaption,
  Qe as TableCell,
  Aw as TableFooter,
  Bn as TableHead,
  kr as TableHeader,
  Te as TableRow,
  mf as Tabs,
  Au as TabsContent,
  Ou as TabsList,
  Mu as TabsTrigger,
  tf as TextField,
  Pu as Textarea,
  Io as ToggleGroup,
  $n as ToggleGroupItem,
  Xm as Toolbar,
  Lt as Tooltip,
  Pt as TooltipContent,
  At as TooltipProvider,
  Vt as TooltipTrigger,
  ep as UNDO_REDO_BUTTONS_STRING_KEYS,
  Wm as UiLanguageSelector,
  np as UndoRedoButtons,
  ci as VerticalTabs,
  wi as VerticalTabsContent,
  di as VerticalTabsList,
  Qp as VerticalTabsTrigger,
  zn as Z_INDEX_ABOVE_DOCK,
  rs as Z_INDEX_FOOTNOTE_EDITOR,
  Dc as Z_INDEX_MODAL,
  Ic as Z_INDEX_MODAL_BACKDROP,
  xo as Z_INDEX_OVERLAY,
  Oc as Z_INDEX_TOOLTIP,
  hw as badgeVariants,
  cs as buttonVariants,
  f as cn,
  Am as getBookIdFromUSFM,
  Cr as getInventoryHeader,
  Om as getLinesFromUSFM,
  Mm as getNumberFromUSFM,
  kp as getStatusForItem,
  Ym as getToolbarOSReservedSpaceClassName,
  Im as inventoryCountColumn,
  Rm as inventoryItemColumn,
  Dm as inventoryStatusColumn,
  Rw as selectTriggerVariants,
  xf as sonner,
  ff as useEvent,
  hf as useEventAsync,
  fw as useListbox,
  ju as usePromise,
  wm as useRecentSearches,
  Er as useSidebar,
  gf as useStylesheet
};
//# sourceMappingURL=index.js.map
