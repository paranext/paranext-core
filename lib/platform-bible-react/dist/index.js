var di = Object.defineProperty;
var wi = (t, e, n) => e in t ? di(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var zt = (t, e, n) => wi(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as st } from "react/jsx-runtime";
import b, { forwardRef as Bn, useRef as H, useMemo as z, useState as D, useCallback as G, useEffect as J, useLayoutEffect as Wt, createContext as lr, useContext as so, Component as pi, createElement as Oo, Suspense as ui, Fragment as io } from "react";
import { Command as Yt } from "cmdk";
import { X as hn, Search as fa, Check as Zt, Clock as Mo, ChevronsLeft as Ao, ChevronsRight as Po, ChevronLeft as Vr, ChevronRight as dn, ArrowLeft as mi, ArrowRight as ha, Circle as cr, ChevronDown as Se, BoldIcon as fi, ItalicIcon as hi, AtSign as ga, Pencil as gi, Trash2 as bi, ArrowUp as ba, MoreHorizontal as vi, MailOpen as xi, Mail as yi, ChevronUp as va, FilterIcon as Ni, ArrowLeftIcon as ki, ChevronLeftIcon as _i, ChevronRightIcon as Ci, ArrowRightIcon as Ei, Copy as xa, Filter as ya, User as Ti, Link as Si, CircleHelp as Ri, ChevronsUpDown as lo, Star as Ii, Undo as Di, Redo as Oi, SquareX as Na, FunctionSquare as ka, SquareSigma as _a, Ban as Mi, AlertCircle as Br, CircleCheckIcon as Ai, CircleXIcon as Pi, CircleHelpIcon as $i, ArrowUpIcon as ji, ArrowDownIcon as Li, PanelLeft as Vi, PanelRight as Bi, ScrollText as Gi, MenuIcon as Fi, Menu as zi, EllipsisVertical as Ki, MoreVertical as $o, LoaderCircle as qi, GripVertical as Hi } from "lucide-react";
import { clsx as Ui } from "clsx";
import { extendTailwindMerge as Yi } from "tailwind-merge";
import * as Jt from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as Gn, Section as Q, getChaptersForBook as Xi, formatScrRef as Ce, getSectionForBook as Dn, formatRelativeDate as Wi, formatReplacementString as Xe, sanitizeHtml as Ji, NumberFormat as Zi, formatBytes as Qi, getCurrentLocale as tl, usfmMarkers as Hn, getFormatCallerFunction as el, deepEqual as nl, isString as jo, compareScrRefs as Gr, scrRefToBBBCCCVVV as xr, defaultScrRef as yr, formatScrRefRange as rl, getLocalizeKeyForScrollGroupId as at } from "platform-bible-utils";
import { Slot as gn } from "@radix-ui/react-slot";
import { cva as Be } from "class-variance-authority";
import * as wn from "@radix-ui/react-popover";
import * as Ca from "@radix-ui/react-label";
import * as Pn from "@radix-ui/react-radio-group";
import { createEditor as Ea, $getRoot as Re, $createParagraphNode as bn, $getSelection as Ut, HISTORY_MERGE_TAG as co, ParagraphNode as Ta, TextNode as Sa, $isTokenOrSegmented as ol, $getCharacterOffsets as al, $cloneWithPropertiesEphemeral as sl, $getPreviousSelection as il, $isRangeSelection as fe, $caretFromPoint as ll, $getSiblingCaret as Ra, $getChildCaret as cl, $getAdjacentChildCaret as dl, $isChildCaret as wl, $normalizeCaret as pl, $setSelectionFromCaretRange as ul, $getCollapsedCaretRange as ml, $getCaretInDirection as Lo, $splitAtPointCaretNext as fl, $isTextPointCaret as hl, $findMatchingParent as Ia, $isElementNode as Ee, mergeRegister as Ie, getDOMTextNode as gl, isHTMLElement as Da, CLEAR_EDITOR_COMMAND as Oa, COMMAND_PRIORITY_EDITOR as wo, shallowMergeConfig as bl, defineExtension as re, safeCast as en, createState as vl, FORMAT_TEXT_COMMAND as Ma, $isNodeSelection as Aa, COMMAND_PRIORITY_LOW as Pa, RootNode as xl, LineBreakNode as yl, TabNode as Nl, $isEditorState as kl, createCommand as _l, CLICK_COMMAND as Cl, isDOMNode as El, $getNodeFromDOMNode as Tl, $createNodeSelection as Sl, $setSelection as Rl, $getEditor as Il, DecoratorNode as Fr, $getState as Dl, toggleTextFormatType as Vo, TEXT_TYPE_TO_FORMAT as Ol, $setState as Ml, addClassNamesToElement as $a, $create as Al, $getNodeByKey as Pl, removeClassNamesFromElement as $l, KEY_TAB_COMMAND as jl, $isBlockElementNode as Wn, $createRangeSelection as Ll, $normalizeSelection__EXPERIMENTAL as Vl, OUTDENT_CONTENT_COMMAND as Bl, INDENT_CONTENT_COMMAND as Bo, INSERT_TAB_COMMAND as Gl, COMMAND_PRIORITY_CRITICAL as po, $isDecoratorNode as Fl, $isParagraphNode as zl, $isTextNode as Jn, SELECTION_CHANGE_COMMAND as ja, getRegisteredNode as Kl, isDocumentFragment as Go, isDOMDocumentNode as ql, ArtificialNode__DO_NOT_USE as La, $createLineBreakNode as Va, $isRootOrShadowRoot as Hl, isBlockDomNode as Fo, isInlineDomNode as zo, $insertNodes as Ul } from "lexical";
import * as Ze from "@radix-ui/react-tooltip";
import { TooltipTrigger as Yl } from "@radix-ui/react-tooltip";
import { HeadingNode as Xl, QuoteNode as Wl, registerRichText as Jl } from "@lexical/rich-text";
import { flushSync as Zl, createPortal as Ql } from "react-dom";
import { $isTableSelection as tc } from "@lexical/table";
import * as dr from "@radix-ui/react-toggle-group";
import * as Ba from "@radix-ui/react-toggle";
import { createHeadlessEditor as Ga } from "@lexical/headless";
import * as Fa from "@radix-ui/react-separator";
import * as vn from "@radix-ui/react-avatar";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ec } from "@radix-ui/react-dropdown-menu";
import { useReactTable as za, getFilteredRowModel as nc, getSortedRowModel as Ka, getPaginationRowModel as rc, getCoreRowModel as qa, flexRender as On, getGroupedRowModel as oc, getExpandedRowModel as ac } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import sc from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as zr, HIDDEN_NOTE_CALLER as Kr, getDefaultViewOptions as ic, isInsertEmbedOpOfType as Fn, Editorial as lc } from "@eten-tech-foundation/platform-editor";
import * as qr from "@radix-ui/react-checkbox";
import * as Xt from "@radix-ui/react-tabs";
import * as gt from "@radix-ui/react-menubar";
import { useHotkeys as cc } from "react-hotkeys-hook";
import * as bt from "@radix-ui/react-context-menu";
import { Drawer as le } from "vaul";
import * as Hr from "@radix-ui/react-progress";
import * as uo from "react-resizable-panels";
import { Toaster as dc } from "sonner";
import { toast as Qm } from "sonner";
import * as In from "@radix-ui/react-slider";
import * as Ur from "@radix-ui/react-switch";
const wc = Yi({ prefix: "tw-" });
function h(...t) {
  return wc(Ui(t));
}
const xn = 250, Ha = 300, mo = 400, pc = 450, uc = 500, mc = "layoutDirection";
function Ct() {
  const t = localStorage.getItem(mc);
  return t === "rtl" ? t : "ltr";
}
const Yr = Jt.Root, zu = Jt.Trigger, fc = Jt.Portal, Ku = Jt.Close, Ua = b.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  Jt.Overlay,
  {
    ref: o,
    className: h(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: pc, ...e },
    ...n
  }
));
Ua.displayName = Jt.Overlay.displayName;
const Zn = b.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = Ct();
  return /* @__PURE__ */ p(fc, { children: [
    /* @__PURE__ */ r(Ua, { className: n }),
    /* @__PURE__ */ p(
      Jt.Content,
      {
        ref: s,
        className: h(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: uc, ...o },
        ...a,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ p(
            Jt.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": i === "ltr" },
                { "tw-left-4": i === "rtl" }
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
Zn.displayName = Jt.Content.displayName;
function Qn({ className: t, ...e }) {
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
Qn.displayName = "DialogHeader";
function Xr({ className: t, ...e }) {
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
Xr.displayName = "DialogFooter";
const tr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
tr.displayName = Jt.Title.displayName;
const hc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Jt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
hc.displayName = Jt.Description.displayName;
const ve = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ve.displayName = Yt.displayName;
const nn = b.forwardRef(({ className: t, onKeyDown: e, ...n }, o) => {
  const a = Ct(), s = b.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), d = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (i.preventDefault(), i.stopPropagation(), d.click());
    },
    [e]
  );
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(fa, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Yt.Input,
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
nn.displayName = Yt.Input.displayName;
const xe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
xe.displayName = Yt.List.displayName;
const yn = b.forwardRef((t, e) => /* @__PURE__ */ r(Yt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
yn.displayName = Yt.Empty.displayName;
const ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
ne.displayName = Yt.Group.displayName;
const wr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
wr.displayName = Yt.Separator.displayName;
const oe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
oe.displayName = Yt.Item.displayName;
function Ya({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Ya.displayName = "CommandShortcut";
const Xa = (t, e, n, o, a) => {
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
}, gc = (t, e, n, o, a) => {
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
function Le(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function fo(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Wa = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), ae = Object.fromEntries(
  Wa.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function ho(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = wt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(Gn(a.toLowerCase(), o) || Gn(t.toLowerCase(), o) || (s ? Gn(s.localizedName.toLowerCase(), o) || Gn(s.localizedId.toLowerCase(), o) : !1));
}
const Ja = Bn(
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
  }, w) => {
    const m = H(!1), f = () => {
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
      () => Le(t, l),
      [t, l]
    ), y = z(
      () => fo(t, l),
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
        children: /* @__PURE__ */ p(
          oe,
          {
            ref: w,
            value: d || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: u,
            role: "option",
            "aria-selected": e,
            "aria-disabled": c || void 0,
            "aria-label": `${wt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            disabled: c,
            className: h(s, c && "tw-cursor-not-allowed tw-opacity-50"),
            children: [
              i && /* @__PURE__ */ r(
                Zt,
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
), Za = Be(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? gn : "button", { className: h(Za({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const ye = wn.Root, Me = wn.Trigger, bc = wn.Anchor, Qa = b.createContext(null);
function Nr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(Qa.Provider, { value: t, children: e });
}
const ce = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = Ct(), l = b.useContext(Qa);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(wn.Portal, { container: l ?? void 0, children: /* @__PURE__ */ r(
      wn.Content,
      {
        ref: s,
        align: e,
        sideOffset: n,
        className: h(
          "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
          t
        ),
        style: { zIndex: xn, ...o },
        ...a,
        dir: i
      }
    ) })
  );
});
ce.displayName = wn.Content.displayName;
function ts(t, e, n) {
  return `${t} ${ae[t]}${e ? ` ${fo(t, e)} ${Le(t, e)}` : ""}`;
}
function vc({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l,
  buttonClassName: d = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost"
}) {
  const [w, m] = D(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(ye, { open: w, onOpenChange: m, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": a,
        children: /* @__PURE__ */ r(Mo, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(ce, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: /* @__PURE__ */ r(ne, { heading: s, children: t.map((u) => /* @__PURE__ */ p(
      oe,
      {
        onSelect: () => f(u),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Mo, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function qu(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Un = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, xc = [
  Un.BOOK_ONLY,
  Un.BOOK_CHAPTER,
  Un.BOOK_CHAPTER_VERSE
];
function yc(t) {
  return Un.BOOK_CHAPTER_VERSE.test(t.trim());
}
function Ko(t, e) {
  return wt.bookIdToNumber(t) < wt.bookIdToNumber(e.book);
}
function Nc(t, e, n) {
  const o = wt.bookIdToNumber(t) - wt.bookIdToNumber(n.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < n.chapterNum;
}
function kr(t, e, n, o) {
  const a = wt.bookIdToNumber(t) - wt.bookIdToNumber(o.book);
  return a < 0 ? !0 : a > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : n < o.verseNum;
}
function qo(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function me(t) {
  return Xi(wt.bookIdToNumber(t));
}
function kc(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = xc.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, d = void 0, c = void 0] = i.slice(1);
        let w;
        const m = e.filter((f) => ho(f, l, n));
        if (m.length === 1 && ([w] = m), !w && d) {
          if (wt.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (w = f);
          }
          if (!w && n) {
            const f = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (!w && d) {
          const u = ((g) => Object.keys(ae).find(
            (y) => ae[y].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (w = u), !w && n) {
            const g = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([w] = g);
          }
        }
        if (w) {
          let f = d ? parseInt(d, 10) : void 0;
          f && f > me(w) && (f = Math.max(me(w), 1));
          const u = c ? parseInt(c, 10) : void 0;
          return {
            book: w,
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
function _c(t, e, n, o) {
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
        const c = e[d - 1], w = Math.max(me(c), 1);
        o({
          book: c,
          chapterNum: w,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = G(() => {
    const d = me(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const w = e[c + 1];
        o({
          book: w,
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
      icon: n === "ltr" ? Ao : Po
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Vr : dn
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? dn : Vr
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === me(t.book) || me(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Po : Ao
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
function Ho({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  isChapterDisabled: s,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: me(t) }, (l, d) => d + 1).map((l) => {
      const d = (s == null ? void 0 : s(l)) ?? !1;
      return /* @__PURE__ */ r(
        oe,
        {
          value: `${t} ${ae[t] || ""} ${l}`,
          onSelect: () => {
            d || n(l);
          },
          ref: o(l),
          disabled: d,
          "aria-disabled": d || void 0,
          className: h(
            // No fixed width (previously `tw-w-8`) so cells fill their grid
            // column (1fr) and adapt when the popover is narrower than the
            // default 280px. `tw-min-w-0` lets cells shrink below their
            // intrinsic content width; `tw-px-0` overrides CommandItem's
            // default horizontal padding so multi-digit chapter numbers still
            // fit in tight cells. Keep `tw-h-8` for a consistent row height.
            "tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",
            {
              "tw-bg-primary tw-text-primary-foreground": t === e.book && l === e.chapterNum
            },
            {
              "tw-bg-muted/50 tw-text-muted-foreground/50": ((a == null ? void 0 : a(l)) ?? !1) && !d
            },
            d && "tw-cursor-not-allowed tw-opacity-40"
          ),
          children: l
        },
        l
      );
    }) }) });
}
function Uo({
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
    return /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", d), children: Array.from({ length: n }, (c, w) => w + 1).map((c) => {
      const w = (l == null ? void 0 : l(c)) ?? !1;
      return /* @__PURE__ */ r(
        oe,
        {
          value: `${t} ${ae[t] || ""} ${e}:${c}`,
          onSelect: () => {
            w || a(c);
          },
          ref: s(c),
          disabled: w,
          "aria-disabled": w || void 0,
          className: h(
            // See chapter-grid — no fixed width, min-w-0, and px-0 override
            // so multi-digit verse numbers fit when the popover is narrow.
            "tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",
            {
              "tw-bg-primary tw-text-primary-foreground": t === o.book && e === o.chapterNum && c === o.verseNum
            },
            {
              "tw-bg-muted/50 tw-text-muted-foreground/50": ((i == null ? void 0 : i(c)) ?? !1) && !w
            },
            w && "tw-cursor-not-allowed tw-opacity-40"
          ),
          children: c
        },
        c
      );
    }) }) });
}
function _r({
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
  disableReferencesUpTo: w,
  submitKeys: m,
  triggerContent: f,
  triggerVariant: u = "outline",
  onOpenChange: g,
  onCloseAutoFocus: y,
  modal: x = !1,
  align: N = "center"
}) {
  const R = Ct(), [I, S] = D(!1), [V, _] = D(""), [T, C] = D(""), [v, E] = D("books"), [$, L] = D(void 0), [A, j] = D(
    void 0
  ), [U, X] = D(void 0), [et, Tt] = D(!1), Lt = H(null), Rt = H(!1), rt = H(void 0), vt = H(void 0), q = H(void 0), it = H(void 0), ct = H({}), pt = H({}), ut = G(
    (k) => {
      e(k), l && l(k);
    },
    [e, l]
  ), It = z(() => o ? o() : Wa, [o]), Ot = z(() => ({
    [Q.OT]: It.filter((Y) => wt.isBookOT(Y)),
    [Q.NT]: It.filter((Y) => wt.isBookNT(Y)),
    [Q.DC]: It.filter((Y) => wt.isBookDC(Y)),
    [Q.Extra]: It.filter((Y) => wt.extraBooks().includes(Y))
  }), [It]), Vt = z(() => Object.values(Ot).flat(), [Ot]), Pe = z(() => {
    if (!T.trim()) return Ot;
    const k = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((tt) => {
      k[tt] = Ot[tt].filter((Ft) => ho(Ft, T, a));
    }), k;
  }, [Ot, T, a]), P = z(
    () => kc(T, Vt, a),
    [T, Vt, a]
  ), Bt = H(!1);
  J(() => {
    if (!Bt.current) {
      Bt.current = !0;
      return;
    }
    g == null || g(I);
  }, [I, g]);
  const Qt = G(() => {
    if (P) {
      const k = P.chapterNum ?? 1, Y = P.verseNum ?? 1;
      if (w && kr(P.book, k, Y, w))
        return;
      ut({
        book: P.book,
        chapterNum: k,
        verseNum: Y
      }), S(!1), C(""), _("");
    }
  }, [ut, P, w]), Gt = G(
    (k) => {
      const Y = A ?? (P == null ? void 0 : P.book), tt = U ?? (P == null ? void 0 : P.chapterNum);
      !Y || !tt || (ut({
        book: Y,
        chapterNum: tt,
        verseNum: k
      }), S(!1));
    },
    [ut, A, U, P]
  ), B = G(
    (k) => {
      if (w && Ko(k, w)) return;
      if (me(k) <= 1) {
        ut({
          book: k,
          chapterNum: 1,
          verseNum: 1
        }), S(!1), C("");
        return;
      }
      L(k), E("chapters");
    },
    [ut, w]
  ), W = G(
    (k) => {
      const Y = v === "chapters" ? $ : P == null ? void 0 : P.book;
      if (Y) {
        if (c && c(Y, k) > 1) {
          j(Y), X(k), E("verses"), _("");
          return;
        }
        ut({
          book: Y,
          chapterNum: k,
          verseNum: 1
        }), S(!1);
      }
    },
    [ut, v, $, P, c]
  ), nt = G(
    (k) => {
      ut(k), S(!1), C("");
    },
    [ut]
  ), lt = _c(t, Vt, R, e), mt = G(() => {
    E("books"), L(void 0), j(void 0), X(void 0), setTimeout(() => {
      vt.current && vt.current.focus();
    }, 0);
  }, []), ft = G(() => {
    const k = A;
    j(void 0), X(void 0), k ? (L(k), E("chapters"), _("")) : mt();
  }, [A, mt]), Dt = G((k) => {
    S(k), k && (E("books"), L(void 0), j(void 0), X(void 0), C(""));
  }, []), { otLong: Nt, ntLong: kt, dcLong: St, extraLong: M } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, _t = G(
    (k) => Xa(k, Nt, kt, St, M),
    [Nt, kt, St, M]
  ), xt = G(
    (k) => P ? !!P.chapterNum && !k.toString().includes(P.chapterNum.toString()) : !1,
    [P]
  ), ke = z(
    () => Ce(
      t,
      a ? Le(t.book, a) : "English"
    ),
    [t, a]
  ), Ge = G((k) => (Y) => {
    ct.current[k] = Y;
  }, []), rn = G((k) => (Y) => {
    pt.current[k] = Y;
  }, []), _n = z(
    () => yc(T),
    [T]
  ), Cn = z(() => !c || !P || !P.chapterNum || !_n ? !1 : c(P.book, P.chapterNum) > 0, [c, P, _n]), Fe = G(
    (k) => w ? Ko(k, w) : !1,
    [w]
  ), En = G(
    (k) => (Y) => w ? Nc(k, Y, w) : !1,
    [w]
  ), on = G(
    (k, Y) => (tt) => w ? kr(k, Y, tt, w) : !1,
    [w]
  ), Tn = (s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", ze = (s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", br = G(
    (k) => {
      (k.key === "Home" || k.key === "End") && k.stopPropagation(), m && m.includes(k.key) && P && P.chapterNum !== void 0 && P.verseNum !== void 0 && (k.preventDefault(), k.stopPropagation(), Qt());
    },
    [m, P, Qt]
  ), an = G(
    (k) => {
      var $e, Ke, qe;
      if (k.ctrlKey) return;
      const { isLetter: Y, isDigit: tt } = qo(k.key);
      if ((v === "chapters" || v === "verses") && (k.key === " " || k.key === "Enter")) {
        const Mt = k.target instanceof HTMLElement ? k.target : void 0;
        if (!!(Mt != null && Mt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          k.stopPropagation();
          return;
        }
        const K = ($e = rt.current) == null ? void 0 : $e.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (K) {
          k.preventDefault(), k.stopPropagation(), K.click();
          return;
        }
      }
      if ((v === "chapters" || v === "verses") && (Y || tt)) {
        k.preventDefault(), k.stopPropagation();
        return;
      }
      if (v === "chapters" && k.key === "Backspace") {
        k.preventDefault(), k.stopPropagation(), mt();
        return;
      }
      if (v === "verses" && k.key === "Backspace") {
        k.preventDefault(), k.stopPropagation(), ft();
        return;
      }
      const Ft = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(k.key);
      if (v === "verses" && Ft) {
        const Mt = A, O = U;
        if (!Mt || !O || !c) return;
        const K = c(Mt, O);
        if (!K) return;
        (Ke = rt.current) == null || Ke.focus();
        const Z = (() => {
          if (!V) return 1;
          const He = V.match(/:(\d+)$/);
          return He ? parseInt(He[1], 10) : 0;
        })();
        let At = Z;
        const we = 6;
        switch (k.key) {
          case "ArrowLeft":
            Z !== 0 && (At = Z > 1 ? Z - 1 : K);
            break;
          case "ArrowRight":
            Z !== 0 && (At = Z < K ? Z + 1 : 1);
            break;
          case "ArrowUp":
            At = Z === 0 ? K : Math.max(1, Z - we);
            break;
          case "ArrowDown":
            At = Z === 0 ? 1 : Math.min(K, Z + we);
            break;
          default:
            return;
        }
        At !== Z && (k.preventDefault(), k.stopPropagation(), _(
          `${Mt} ${ae[Mt] || ""} ${O}:${At}`
        ), setTimeout(() => {
          const He = pt.current[At];
          He && He.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((v === "chapters" || v === "books" && P) && Ft) {
        const Mt = v === "chapters" ? $ : P == null ? void 0 : P.book;
        if (!Mt) return;
        v === "chapters" && ((qe = rt.current) == null || qe.focus());
        const O = (() => {
          if (!V) return 1;
          const we = V.match(/(\d+)$/);
          return we ? parseInt(we[1], 10) : 0;
        })(), K = me(Mt);
        if (!K) return;
        let Z = O;
        const At = 6;
        switch (k.key) {
          case "ArrowLeft":
            O !== 0 && (Z = O > 1 ? O - 1 : K);
            break;
          case "ArrowRight":
            O !== 0 && (Z = O < K ? O + 1 : 1);
            break;
          case "ArrowUp":
            Z = O === 0 ? K : Math.max(1, O - At);
            break;
          case "ArrowDown":
            Z = O === 0 ? 1 : Math.min(K, O + At);
            break;
          default:
            return;
        }
        Z !== O && (k.preventDefault(), k.stopPropagation(), _(
          `${Mt} ${ae[Mt] || ""} ${Z}`
        ), setTimeout(() => {
          const we = ct.current[Z];
          we && we.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      P,
      mt,
      ft,
      $,
      A,
      U,
      c,
      V
    ]
  ), vr = G((k) => {
    var Ft;
    if (k.shiftKey || k.key === "Tab" || k.key === " ") return;
    if (k.key === "Enter") {
      k.stopPropagation();
      return;
    }
    if (k.key === "ArrowUp" || k.key === "ArrowDown") {
      (Ft = vt.current) == null || Ft.focus();
      return;
    }
    const { isLetter: Y, isDigit: tt } = qo(k.key);
    (Y || tt) && (k.preventDefault(), C(($e) => $e + k.key), vt.current.focus(), Tt(!1));
  }, []);
  return Wt(() => {
    const k = setTimeout(() => {
      if (I && v === "books" && q.current && it.current) {
        const Y = q.current, tt = it.current, Ft = tt.offsetTop, $e = Y.clientHeight, Ke = tt.clientHeight, qe = Ft - $e / 2 + Ke / 2;
        Y.scrollTo({
          top: Math.max(0, qe),
          behavior: "smooth"
        }), _(ts(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(k);
    };
  }, [I, v, T, P, t.book]), Wt(() => {
    if (v === "chapters" && $) {
      const k = $ === t.book, Y = k ? t.chapterNum : 1;
      _(
        `${$} ${ae[$] || ""} ${Y}`
      ), setTimeout(() => {
        if (q.current)
          if (k) {
            const tt = ct.current[t.chapterNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        rt.current && rt.current.focus();
      }, 0);
    }
  }, [v, $, P, t.book, t.chapterNum]), Wt(() => {
    if (v === "verses" && A && U !== void 0) {
      const k = A === t.book && U === t.chapterNum, Y = k ? t.verseNum : 1;
      _(
        `${A} ${ae[A] || ""} ${U}:${Y}`
      ), setTimeout(() => {
        if (q.current)
          if (k) {
            const tt = pt.current[t.verseNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        rt.current && rt.current.focus();
      }, 0);
    }
  }, [
    v,
    A,
    U,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ p(ye, { open: I, onOpenChange: Dt, modal: x, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        ref: Lt,
        "aria-label": "book-chapter-trigger",
        variant: u,
        role: "combobox",
        "aria-expanded": I,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        onClick: (k) => {
          Rt.current && (Rt.current = !1, k.preventDefault());
        },
        children: f ?? /* @__PURE__ */ r("span", { className: "tw-truncate", children: ke })
      }
    ) }),
    /* @__PURE__ */ r(
      ce,
      {
        id: d,
        className: "tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",
        align: N,
        onKeyDownCapture: an,
        onKeyDown: (k) => k.stopPropagation(),
        onPointerDownOutside: (k) => {
          const { target: Y } = k;
          Lt.current && Y instanceof Node && Lt.current.contains(Y) && (Rt.current = !0, Dt(!1));
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ p(
          ve,
          {
            ref: rt,
            loop: !0,
            value: V,
            onValueChange: _,
            shouldFilter: !1,
            children: [
              v === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
                /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
                  /* @__PURE__ */ r(
                    nn,
                    {
                      ref: vt,
                      value: T,
                      onValueChange: C,
                      onKeyDown: br,
                      onFocus: () => Tt(!1),
                      className: i && i.length > 0 ? "!tw-pr-10" : ""
                    }
                  ),
                  i && i.length > 0 && /* @__PURE__ */ r(
                    vc,
                    {
                      recentSearches: i,
                      onSearchItemSelect: nt,
                      renderItem: (k) => Ce(k, "English"),
                      getItemKey: (k) => `${k.book}-${k.chapterNum}-${k.verseNum}`,
                      ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                      groupHeading: s == null ? void 0 : s["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: lt.map(({ onClick: k, disabled: Y, title: tt, icon: Ft }) => /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      Tt(!0), k();
                    },
                    disabled: Y,
                    className: "tw-h-10 tw-w-4 tw-p-0",
                    title: tt,
                    onKeyDown: vr,
                    children: /* @__PURE__ */ r(Ft, {})
                  },
                  tt
                )) })
              ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
                /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: v === "verses" ? ft : mt,
                    className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                    children: R === "ltr" ? /* @__PURE__ */ r(mi, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(ha, { className: "tw-h-4 tw-w-4" })
                  }
                ),
                v === "chapters" && $ && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Le($, a) }),
                v === "verses" && A && U !== void 0 && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: `${Le(A, a)} ${U}` }),
                /* @__PURE__ */ r(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",
                    children: v === "verses" ? ze : Tn
                  }
                )
              ] }),
              !et && /* @__PURE__ */ p(xe, { ref: q, children: [
                v === "books" && /* @__PURE__ */ p(st, { children: [
                  !P && Object.entries(Pe).map(([k, Y]) => {
                    if (Y.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ r(ne, { heading: _t(k), children: Y.map((tt) => /* @__PURE__ */ r(
                          Ja,
                          {
                            bookId: tt,
                            onSelect: (Ft) => B(Ft),
                            section: Dn(tt),
                            commandValue: `${tt} ${ae[tt]}`,
                            ref: tt === t.book ? it : void 0,
                            localizedBookNames: a,
                            disabled: Fe(tt)
                          },
                          tt
                        )) }, k)
                      );
                  }),
                  P && /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(
                    oe,
                    {
                      value: `${P.book} ${ae[P.book]} ${P.chapterNum || ""}:${P.verseNum || ""})}`,
                      onSelect: Qt,
                      disabled: !!w && kr(
                        P.book,
                        P.chapterNum ?? 1,
                        P.verseNum ?? 1,
                        w
                      ),
                      className: "tw-font-semibold tw-text-primary",
                      children: Ce(
                        {
                          book: P.book,
                          chapterNum: P.chapterNum ?? 1,
                          verseNum: P.verseNum ?? 1
                        },
                        a ? fo(P.book, a) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  P && Cn && P.chapterNum && c && /* @__PURE__ */ p(st, { children: [
                    /* @__PURE__ */ p("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: `${Le(P.book, a)} ${P.chapterNum}` }),
                      /* @__PURE__ */ r("span", { children: ze })
                    ] }),
                    /* @__PURE__ */ r(
                      Uo,
                      {
                        bookId: P.book,
                        chapterNum: P.chapterNum,
                        endVerse: c(P.book, P.chapterNum),
                        scrRef: t,
                        onVerseSelect: Gt,
                        setVerseRef: rn,
                        isVerseDisabled: on(P.book, P.chapterNum),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] }),
                  P && !Cn && me(P.book) > 1 && /* @__PURE__ */ p(st, { children: [
                    /* @__PURE__ */ p("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: Le(P.book, a) }),
                      /* @__PURE__ */ r("span", { children: Tn })
                    ] }),
                    /* @__PURE__ */ r(
                      Ho,
                      {
                        bookId: P.book,
                        scrRef: t,
                        onChapterSelect: W,
                        setChapterRef: Ge,
                        isChapterDimmed: xt,
                        isChapterDisabled: En(P.book),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] })
                ] }),
                v === "chapters" && $ && /* @__PURE__ */ r(
                  Ho,
                  {
                    bookId: $,
                    scrRef: t,
                    onChapterSelect: W,
                    setChapterRef: Ge,
                    isChapterDisabled: En($),
                    className: "tw-p-4"
                  }
                ),
                v === "verses" && A && U !== void 0 && c && /* @__PURE__ */ r(
                  Uo,
                  {
                    bookId: A,
                    chapterNum: U,
                    endVerse: c(A, U),
                    scrRef: t,
                    onVerseSelect: Gt,
                    setVerseRef: rn,
                    isVerseDisabled: on(
                      A,
                      U
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
const Hu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]), Cc = Be(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Et = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Ca.Root, { ref: n, className: h("pr-twp", Cc(), t), ...e }));
Et.displayName = Ca.Root.displayName;
const go = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Pn.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
go.displayName = Pn.Root.displayName;
const er = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pn.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Pn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(cr, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
er.displayName = Pn.Item.displayName;
function Ec(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Wr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: d = Ec,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: y = "start",
  isDisabled: x = !1,
  ariaLabel: N,
  ...R
}) {
  const [I, S] = D(!1), V = c ?? d, _ = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], T = (C, v) => {
    const E = d(C), $ = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, L = `${v ?? ""}${E}${$ ?? ""}`;
    return /* @__PURE__ */ p(
      oe,
      {
        value: E,
        onSelect: () => {
          l(C), S(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Zt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || d(i) !== E
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            $ && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              $
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ p(ye, { open: I, onOpenChange: S, ...R, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(
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
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
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
          /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ce,
      {
        align: y,
        className: h("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ p(ve, { children: [
          /* @__PURE__ */ r(nn, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(yn, { children: u }),
          /* @__PURE__ */ r(xe, { children: _(e) ? e.map((C) => /* @__PURE__ */ r(ne, { heading: C.groupHeading, children: C.options.map((v) => T(v, C.groupHeading)) }, C.groupHeading)) : e.map((C) => T(C)) })
        ] })
      }
    )
  ] });
}
function Tc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = z(
    () => Array.from({ length: s }, (c, w) => w + 1),
    [s]
  );
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ r(Et, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Wr,
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
      Wr,
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
var Jr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Jr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Jr || (Jr = {}));
const Uu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Cr = (t, e) => t[e] ?? e;
function Yu({
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
  const w = Cr(c, "%webView_bookSelector_currentBook%"), m = Cr(c, "%webView_bookSelector_choose%"), f = Cr(c, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), y = (x) => {
    g(x), t(x);
  };
  return /* @__PURE__ */ r(
    go,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => y(x),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(er, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: w })
          ] }),
          /* @__PURE__ */ r(Et, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Tc,
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
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(er, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: f })
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
const es = lr(null);
function Sc(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ne() {
  const t = so(es);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ns = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Rc = ns ? Wt : J, zn = { tag: co };
function Ic({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: d } = t, c = Sc(null, o), w = Ea({ editable: t.editable, html: d, namespace: a, nodes: s, onError: (m) => i(m, w), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = Re();
          if (u.isEmpty()) {
            const g = bn();
            u.append(g);
            const y = ns ? document.activeElement : null;
            (Ut() !== null || y !== null && y === m.getRootElement()) && g.select();
          }
        }, zn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, zn);
            break;
          }
          case "object":
            m.setEditorState(f, zn);
            break;
          case "function":
            m.update(() => {
              Re().isEmpty() && f(m);
            }, zn);
        }
      }
    }(w, l), [w, c];
  }, []);
  return Rc(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(es.Provider, { value: n, children: e });
}
const Dc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : J;
function Oc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Ne();
  return Dc(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(co) || l.isEmpty() || n(a, o, d);
    });
  }, [o, t, e, n]), null;
}
const bo = {
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
}, $t = Ze.Provider, qt = Ze.Root, Ht = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Ze.Trigger,
  {
    ref: o,
    className: e ? h(Za({ variant: e }), t) : t,
    ...n
  }
));
Ht.displayName = Ze.Trigger.displayName;
const jt = b.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Ze.Portal, { children: /* @__PURE__ */ r(
  Ze.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: xn, ...n },
    className: h(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
jt.displayName = Ze.Content.displayName;
const vo = [
  Xl,
  Ta,
  Sa,
  Wl
], Mc = lr(null), Er = {
  didCatch: !1,
  error: null
};
class Ac extends pi {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Er;
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
      }), this.setState(Er);
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
    if (o && n.error !== null && Pc(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Er);
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
        l = Oo(o, d);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Oo(Mc.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Pc() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function $c({ children: t, onError: e }) {
  return r(Ac, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const jc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : J;
function Lc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Vc() {
  return function(t) {
    const [e] = Ne(), n = z(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), s = H(o);
    return jc(() => {
      const { initialValueFn: i, subscribe: l } = n, d = i();
      return s.current !== d && (s.current = d, a(d)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(Lc);
}
function Bc(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), s = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), i = Array.from(e.getClientRects());
  let l, d = i.length;
  i.sort((c, w) => {
    const m = c.top - w.top;
    return Math.abs(m) <= 3 ? c.left - w.left : m;
  });
  for (let c = 0; c < d; c++) {
    const w = i[c], m = l && l.top <= w.top && l.top + l.height > w.top && l.left + l.width > w.left, f = w.width + s === o.width;
    m || f ? (i.splice(c--, 1), d--) : l = w;
  }
  return i;
}
function Gc(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ol(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), d = s.getNode(), c = e.is(l), w = e.is(d);
    if (c || w) {
      const [m, f] = al(t), u = l.is(d), g = e.is(i ? d : l), y = e.is(i ? l : d);
      let x, N = 0;
      u ? (N = m > f ? f : m, x = m > f ? m : f) : g ? (N = i ? f : m, x = void 0) : y && (N = 0, x = i ? m : f);
      const R = e.__text.slice(N, x);
      R !== e.__text && (n === "clone" && (e = sl(e)), e.__text = R);
    }
  }
  return e;
}
function nr(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const rs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fc = rs && "documentMode" in document ? document.documentMode : null;
!(!rs || !("InputEvent" in window) || Fc) && "getTargetRanges" in new window.InputEvent("input");
function ue(t) {
  return `${t}px`;
}
const zc = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Kc(t, e, n) {
  let o = null, a = null, s = null, i = [];
  const l = document.createElement("div");
  function d() {
    o === null && nr(182), a === null && nr(183);
    const { left: m, top: f } = a.getBoundingClientRect(), u = Bc(t, e);
    var g, y;
    l.isConnected || (y = l, (g = a).insertBefore(y, g.firstChild));
    let x = !1;
    for (let N = 0; N < u.length; N++) {
      const R = u[N], I = i[N] || document.createElement("div"), S = I.style;
      S.position !== "absolute" && (S.position = "absolute", x = !0);
      const V = ue(R.left - m);
      S.left !== V && (S.left = V, x = !0);
      const _ = ue(R.top - f);
      S.top !== _ && (I.style.top = _, x = !0);
      const T = ue(R.width);
      S.width !== T && (I.style.width = T, x = !0);
      const C = ue(R.height);
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
  const w = t.registerRootListener(function m() {
    const f = t.getRootElement();
    if (f === null) return c();
    const u = f.parentElement;
    if (!Da(u)) return c();
    c(), o = f, a = u, s = new MutationObserver((g) => {
      const y = t.getRootElement(), x = y && y.parentElement;
      if (y !== o || x !== a) return m();
      for (const N of g) if (!l.contains(N.target)) return d();
    }), s.observe(u, zc), d();
  });
  return () => {
    w(), c();
  };
}
function Yo(t, e, n) {
  if (t.type !== "text" && Ee(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [gl(n) || n, t.offset];
}
function qc(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== ue(-1.5) && (n.marginTop = ue(-1.5)), n.paddingTop !== ue(4) && (n.paddingTop = ue(4)), n.paddingBottom !== ue(0) && (n.paddingBottom = ue(0));
  }
}
function Hc(t, e = qc) {
  let n = null, o = null, a = null, s = null, i = null, l = null, d = () => {
  };
  function c(w) {
    w.read(() => {
      const m = Ut();
      if (!fe(m)) return n = null, a = null, s = null, l = null, d(), void (d = () => {
      });
      const [f, u] = function(C) {
        const v = C.getStartEndPoints();
        return C.isBackward() ? [v[1], v[0]] : v;
      }(m), g = f.getNode(), y = g.getKey(), x = f.offset, N = u.getNode(), R = N.getKey(), I = u.offset, S = t.getElementByKey(y), V = t.getElementByKey(R), _ = n === null || S !== o || x !== a || y !== n.getKey(), T = s === null || V !== i || I !== l || R !== s.getKey();
      if ((_ || T) && S !== null && V !== null) {
        const C = function(v, E, $, L, A, j, U) {
          const X = (v._window ? v._window.document : document).createRange();
          return X.setStart(...Yo(E, $, L)), X.setEnd(...Yo(A, j, U)), X;
        }(t, f, g, S, u, N, V);
        d(), d = Kc(t, C, e);
      }
      n = g, o = S, a = x, s = N, i = V, l = I;
    });
  }
  return c(t.getEditorState()), Ie(t.registerUpdateListener(({ editorState: w }) => c(w)), () => {
    d();
  });
}
function Uc(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), s = a && a.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? n !== null && (n(), n = null) : n === null && (n = Hc(t, e));
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
function Yc(t) {
  const e = Ia(t, (n) => Ee(n) && !n.isInline());
  return Ee(e) || nr(4, t.__key), e;
}
function Xc(t) {
  const e = Ut() || il();
  let n;
  if (fe(e)) n = ll(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), l = i[i.length - 1];
      l && (n = Ra(l, "next"));
    }
    n = n || cl(Re(), "previous").getFlipped().insert(bn());
  }
  const o = Wc(t, n), a = dl(o), s = wl(a) ? pl(a) : o;
  return ul(ml(s)), t.getLatest();
}
function Wc(t, e, n) {
  let o = Lo(e, "next");
  for (let a = o; a; a = fl(a, n)) o = a;
  return hl(o) && nr(283), o.insert(t.isInline() ? bn().append(t) : t), Lo(Ra(t.getLatest(), "next"), e.direction);
}
function Jc(t) {
  const e = Ut();
  if (!fe(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Ia(s, (c) => Ee(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
const Zc = Symbol.for("preact-signals");
function pr() {
  if (Te > 1) return void Te--;
  let t, e = !1;
  for (!function() {
    let n = rr;
    for (rr = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); Mn !== void 0; ) {
    let n = Mn;
    for (Mn = void 0, or++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && os(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (or = 0, Te--, e) throw t;
}
function Qc(t) {
  if (Te > 0) return t();
  Zr = ++td, Te++;
  try {
    return t();
  } finally {
    pr();
  }
}
let ot, Mn;
function Xo(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let rr, Te = 0, or = 0, td = 0, Zr = 0, Yn = 0;
function Wo(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function Kt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function $n(t, e) {
  return new Kt(t, e);
}
function os(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Jo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function as(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function Ue(t, e) {
  Kt.call(this, void 0), this.x = t, this.s = void 0, this.g = Yn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ed(t, e) {
  return new Ue(t, e);
}
function ss(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Te++;
    const n = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, xo(t), o;
    } finally {
      ot = n, pr();
    }
  }
}
function xo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ss(t);
}
function nd(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  as(this), ot = t, this.f &= -2, 8 & this.f && xo(this), pr();
}
function ln(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function he(t, e) {
  const n = new ln(t, e);
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
    const a = e[o], s = $n(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
Kt.prototype.brand = Zc, Kt.prototype.h = function() {
  return !0;
}, Kt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Xo(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Kt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Xo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Kt.prototype.subscribe = function(t) {
  return he(() => {
    const e = this.value, n = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = n;
    }
  }, { name: "sub" });
}, Kt.prototype.valueOf = function() {
  return this.value;
}, Kt.prototype.toString = function() {
  return this.value + "";
}, Kt.prototype.toJSON = function() {
  return this.value;
}, Kt.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(Kt.prototype, "value", { get() {
  const t = Wo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (or > 100) throw new Error("Cycle detected");
    (function(e) {
      Te !== 0 && or === 0 && e.l !== Zr && (e.l = Zr, rr = { S: e, v: e.v, i: e.i, o: rr });
    })(this), this.v = t, this.i++, Yn++, Te++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      pr();
    }
  }
} }), Ue.prototype = new Kt(), Ue.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Yn)) return !0;
  if (this.g = Yn, this.f |= 1, this.i > 0 && !os(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    Jo(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, as(this), this.f &= -2, !0;
}, Ue.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Kt.prototype.S.call(this, t);
}, Ue.prototype.U = function(t) {
  if (this.t !== void 0 && (Kt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Ue.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Ue.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Wo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), ln.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, ln.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ss(this), Jo(this), Te++;
  const t = ot;
  return ot = this, nd.bind(this, t);
}, ln.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Mn, Mn = this);
}, ln.prototype.d = function() {
  this.f |= 8, 1 & this.f || xo(this);
}, ln.prototype.dispose = function() {
  this.d();
};
re({ build: (t, e, n) => Nn(e), config: en({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return he(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function is() {
  const t = Re(), e = Ut(), n = bn();
  t.clear(), t.append(n), e !== null && n.select(), fe(e) && (e.format = 0);
}
function ls(t, e = is) {
  return t.registerCommand(Oa, (n) => (t.update(e), !0), wo);
}
re({ build: (t, e, n) => Nn(e), config: en({ $onClear: is }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return he(() => ls(t, o.value));
} });
function rd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Tr = vl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class cs extends Fr {
  $config() {
    return this.config("decorator-text", { extends: Fr, stateConfigs: [{ flat: !0, stateConfig: Tr }] });
  }
  getFormat() {
    return Dl(this, Tr);
  }
  getFormatFlags(e, n) {
    return Vo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Ol[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Ml(this, Tr, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Vo(n, e, null);
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
function od(t) {
  return t instanceof cs;
}
re({ name: "@lexical/extension/DecoratorText", nodes: () => [cs], register: (t, e, n) => t.registerCommand(Ma, (o) => {
  const a = Ut();
  if (Aa(a) || fe(a)) for (const s of a.getNodes()) od(s) && s.toggleFormat(o);
  return !1;
}, Pa) });
function ds(t, e) {
  let n;
  return $n(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const Qr = re({ build: (t) => ds(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function dt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ws(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ws(n[a], o[a]);
    return t;
  }
  return e;
}
const yo = 0, to = 1, ps = 2, Sr = 3, Kn = 4, sn = 5, Rr = 6, Sn = 7;
function Ir(t) {
  return t.id === yo;
}
function us(t) {
  return t.id === ps;
}
function ad(t) {
  return function(e) {
    return e.id === to;
  }(t) || dt(305, String(t.id), String(to)), Object.assign(t, { id: ps });
}
const sd = /* @__PURE__ */ new Set();
class id {
  constructor(e, n) {
    zt(this, "builder");
    zt(this, "configs");
    zt(this, "_dependency");
    zt(this, "_peerNameSet");
    zt(this, "extension");
    zt(this, "state");
    zt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: yo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : bl;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    us(n) || dt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, c) {
      return Object.assign(l, { config: d, id: Sr, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: Kn, initResult: d, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Kn && dt(307, String(n.id), String(sn)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: sn, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== sn && dt(308, String(o.id), String(sn));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Rr });
    }(o), () => {
      const s = this.state;
      s.id !== Sn && dt(309, String(o.id), String(Sn)), this.state = function(i) {
        return Object.assign(i, { id: sn });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Rr && dt(310, String(n.id), String(Rr)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Sn });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && dt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && dt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Kn;
    }(e) || dt(313, String(e.id), String(Kn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Sr;
    }(e) || dt(314, String(e.id), String(Sr)), { config: e.config };
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
      return n.id >= Sn;
    }(e) || dt(316, String(e.id), String(Sn)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || sd;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= sn;
      })(e) || dt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Zo = { tag: co };
function ld() {
  const t = Re();
  t.isEmpty() && t.append(bn());
}
const cd = re({ config: en({ setOptions: Zo, updateOptions: Zo }), init: ({ $initialEditorState: t = ld }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (kl(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [xl, Sa, yl, Nl, Ta] }), Qo = Symbol.for("@lexical/extension/LexicalBuilder");
function ta() {
}
function dd(t) {
  throw t;
}
function qn(t) {
  return Array.isArray(t) ? t : [t];
}
const Dr = "0.43.0+prod.esm";
class cn {
  constructor(e) {
    zt(this, "roots");
    zt(this, "extensionNameMap");
    zt(this, "outgoingConfigEdges");
    zt(this, "incomingEdges");
    zt(this, "conflicts");
    zt(this, "_sortedExtensionReps");
    zt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Dr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [qn(cd)];
    for (const o of e) n.push(qn(o));
    return new cn(n);
  }
  static maybeFromEditor(e) {
    const n = e[Qo];
    return n && (n.PACKAGE_VERSION !== Dr && dt(292, n.PACKAGE_VERSION, Dr), n instanceof cn || dt(293)), n;
  }
  static fromEditor(e) {
    const n = cn.maybeFromEditor(e);
    return n === void 0 && dt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Ea({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [Qo]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = ta;
    function n() {
      try {
        e();
      } finally {
        e = ta;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = Ie(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const n = qn(e), [o] = n;
    typeof o.name != "string" && dt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && dt(298, o.name), !a) {
      a = new id(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && dt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && dt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = qn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (us(s)) return;
      const i = o.extension.name;
      var l;
      Ir(s) || dt(300, i, a || "[unknown]"), Ir(l = s) || dt(304, String(l.id), String(yo)), s = Object.assign(l, { id: to }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const c of d.keys()) {
        const w = this.extensionNameMap.get(c);
        w && n(w, i);
      }
      s = ad(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Ir(o.state) && n(o);
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
    return Ie(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const w of l) {
      const { extension: m } = w;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of rd(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && dt(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, w);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && ws(i, m.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const d = Object.keys(s).length > 0, c = a.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = s), c && (e.html.export = a));
    for (const w of l) w.init(e);
    return e.onError || (e.onError = dd), e;
  }
}
const wd = /* @__PURE__ */ new Set(), ea = re({ build(t, e, n) {
  const o = n.getDependency(Qr).output, a = $n({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ds(() => {
  }, () => he(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let d, c = !1;
    o.value.read(() => {
      if (Ut()) for (const [w, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(w);
          continue;
        }
        const f = Pl(w), u = f && f.isSelected() || !1;
        c = c || u !== (!!i && i.has(w)), u && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !c && d && i && d.size === i.size || (s.value = d);
  }));
  return { watchNodeKey: function(i) {
    const l = ed(() => (s.value || wd).has(i)), { watchedNodeKeys: d } = a.peek();
    let c = d.get(i);
    const w = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), w || (d.set(i, c), a.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [Qr], name: "@lexical/extension/NodeSelection" }), pd = _l("INSERT_HORIZONTAL_RULE_COMMAND");
class pn extends Fr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new pn(e.__key);
  }
  static importJSON(e) {
    return No().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: ud, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return $a(n, e.theme.hr), n;
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
function ud() {
  return { node: No() };
}
function No() {
  return Al(pn);
}
function md(t) {
  return t instanceof pn;
}
re({ dependencies: [Qr, ea], name: "@lexical/extension/HorizontalRule", nodes: () => [pn], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(ea).output, a = $n({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Ie(t.registerCommand(pd, (i) => {
    const l = Ut();
    if (!fe(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = No();
      Xc(d);
    }
    return !0;
  }, wo), t.registerCommand(Cl, (i) => {
    if (El(i.target)) {
      const l = Tl(i.target);
      if (md(l)) return function(d, c = !1) {
        const w = Ut(), m = d.isSelected(), f = d.getKey();
        let u;
        c && Aa(w) ? u = w : (u = Sl(), Rl(u)), m ? u.delete(f) : u.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Pa), t.registerMutationListener(pn, (i, l) => {
    Qc(() => {
      let d = !1;
      const { nodeSelections: c } = a.peek();
      for (const [w, m] of i.entries()) if (m === "destroyed") c.delete(w), d = !0;
      else {
        const f = c.get(w), u = t.getElementByKey(w);
        f ? f.domNode.value = u : (d = !0, c.set(w, { domNode: $n(u), selectedSignal: o(w) }));
      }
      d && (a.value = { nodeSelections: c });
    });
  }), he(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: d } of a.value.nodeSelections.values()) i.push(he(() => {
      const c = l.value;
      c && (d.value ? $a(c, s) : $l(c, s));
    }));
    return Ie(...i);
  }));
} });
re({ build: (t, e) => Nn({ inheritEditableFromParent: e.inheritEditableFromParent }), config: en({ $getParentEditor: function() {
  const t = Il();
  return cn.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => he(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
re({ build: (t, e, n) => Nn(e), config: en({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return he(() => {
    if (!o.disabled.value) return Uc(t, o.onReposition.value);
  });
} });
function ms(t) {
  return t.canBeEmpty();
}
function fd(t, e, n = ms) {
  return Ie(t.registerCommand(jl, (o) => {
    const a = Ut();
    if (!fe(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((f) => Wn(f) && f.canIndent()).length > 0) return !0;
      const l = i.anchor, d = i.focus, c = d.isBefore(l) ? d : l, w = c.getNode(), m = Yc(w);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = Ll();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = Vl(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Bl : Bo : Gl;
    return t.dispatchCommand(s, void 0);
  }, wo), t.registerCommand(Bo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Ut();
    if (!fe(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return Jc((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, po));
}
re({ build: (t, e, n) => Nn(e), config: en({ $canIndent: ms, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return he(() => {
    if (!o.value) return fd(t, a, s);
  });
} });
const hd = re({ name: "@lexical/react/ReactProvider" });
function gd() {
  return Re().getTextContent();
}
function bd(t, e = !0) {
  if (t) return !1;
  let n = gd();
  return e && (n = n.trim()), n === "";
}
function vd(t) {
  if (!bd(t, !1)) return !1;
  const e = Re().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Fl(a)) return !1;
    if (Ee(a)) {
      if (!zl(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const d = s[o];
        if (!Jn(d)) return !1;
      }
    }
  }
  return !0;
}
function fs(t) {
  return () => vd(t);
}
function hs(t) {
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
            const [c, w, m, f, u] = d;
            t.update(() => {
              const g = Ut();
              if (fe(g)) {
                const y = g.anchor;
                let x = y.getNode(), N = 0, R = 0;
                if (Jn(x) && c >= 0 && w >= 0 && (N = c, R = c + w, g.setTextNodeRange(x, N, x, R)), N === R && m === "" || (g.insertRawText(m), x = y.getNode()), Jn(x)) {
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
re({ build: (t, e, n) => Nn(e), config: en({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => he(() => n.getOutput().disabled.value ? void 0 : hs(t)) });
function xd(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ko = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : J;
function yd({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = D(() => n.getDecorators());
    return ko(() => n.registerDecoratorListener((i) => {
      Zl(() => {
        s(i);
      });
    }), [n]), J(() => {
      s(n.getDecorators());
    }, [n]), z(() => {
      const i = [], l = Object.keys(a);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], w = r(o, { onError: (f) => n._onError(f), children: r(ui, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(Ql(w, m, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function Nd({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = cn.maybeFromEditor(n);
    if (o && o.hasExtensionByName(hd.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && xd(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(yd, { editor: t, ErrorBoundary: e });
}
function na(t) {
  return t.getEditorState().read(fs(t.isComposing()));
}
function kd({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Ne();
  return function(a) {
    ko(() => Ie(Jl(a), hs(a)), [a]);
  }(o), p(st, { children: [t, r(_d, { content: e }), r(Nd, { editor: o, ErrorBoundary: n })] });
}
function _d({ content: t }) {
  const [e] = Ne(), n = function(a) {
    const [s, i] = D(() => na(a));
    return ko(() => {
      function l() {
        const d = na(a);
        i(d);
      }
      return l(), Ie(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = Vc();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Cd({ defaultSelection: t }) {
  const [e] = Ne();
  return J(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Ed = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : J;
function Td({ onClear: t }) {
  const [e] = Ne();
  return Ed(() => ls(e, t), [e, t]), null;
}
const gs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : J;
function Sd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: w, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: y, role: x = "textbox", spellCheck: N = !0, style: R, tabIndex: I, "data-testid": S, ...V }, _) {
  const [T, C] = D(t.isEditable()), v = G(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? t.setRootElement($) : t.setRootElement(null);
  }, [t]), E = z(() => /* @__PURE__ */ function(...$) {
    return (L) => {
      for (const A of $) typeof A == "function" ? A(L) : A != null && (A.current = L);
    };
  }(_, v), [v, _]);
  return gs(() => (C(t.isEditable()), t.registerEditableListener(($) => {
    C($);
  })), [t]), r("div", { "aria-activedescendant": T ? e : void 0, "aria-autocomplete": T ? n : "none", "aria-controls": T ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": T && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": w, "aria-owns": T ? m : void 0, "aria-readonly": !T || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: T, "data-testid": S, id: y, ref: E, role: x, spellCheck: N, style: R, tabIndex: I, ...V });
}
const Rd = Bn(Sd);
function ra(t) {
  return t.getEditorState().read(fs(t.isComposing()));
}
const Id = Bn(Dd);
function Dd(t, e) {
  const { placeholder: n, ...o } = t, [a] = Ne();
  return p(st, { children: [r(Rd, { editor: a, ...o, ref: e }), n != null && r(Od, { editor: a, content: n })] });
}
function Od({ content: t, editor: e }) {
  const n = function(i) {
    const [l, d] = D(() => ra(i));
    return gs(() => {
      function c() {
        const w = ra(i);
        d(w);
      }
      return c(), Ie(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = D(e.isEditable());
  if (Wt(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function Md({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Id,
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
const bs = lr(void 0);
function Ad({
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
  return /* @__PURE__ */ r(bs.Provider, { value: i, children: s });
}
function vs() {
  const t = so(bs);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Pd() {
  const [t, e] = D(void 0), n = G(() => {
    e(void 0);
  }, []), o = z(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(Yr, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(Zn, { children: [
      /* @__PURE__ */ r(Qn, { children: /* @__PURE__ */ r(tr, { children: s }) }),
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
function $d({
  children: t
}) {
  const [e] = Ne(), [n, o] = D(e), [a, s] = D("paragraph"), [i, l] = Pd(), d = () => {
  };
  return J(() => n.registerCommand(
    ja,
    (c, w) => (o(w), !1),
    po
  ), [n]), /* @__PURE__ */ p(
    Ad,
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
function jd(t) {
  const [e] = Ne(), { activeEditor: n } = vs();
  J(() => n.registerCommand(
    ja,
    () => {
      const o = Ut();
      return o && t(o), !1;
    },
    po
  ), [e, t]), J(() => {
    n.getEditorState().read(() => {
      const o = Ut();
      o && t(o);
    });
  }, [n, t]);
}
const xs = Be(
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
), Ld = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Ba.Root,
  {
    ref: a,
    className: h(xs({ variant: e, size: n, className: t })),
    ...o
  }
));
Ld.displayName = Ba.Root.displayName;
const ys = b.createContext({
  size: "default",
  variant: "default"
}), _o = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = Ct();
  return /* @__PURE__ */ r(
    dr.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        ys.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
_o.displayName = dr.Root.displayName;
const An = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(ys);
  return /* @__PURE__ */ r(
    dr.Item,
    {
      ref: s,
      className: h(
        xs({
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
An.displayName = dr.Item.displayName;
const oa = [
  { format: "bold", icon: fi, label: "Bold" },
  { format: "italic", icon: hi, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Vd() {
  const { activeEditor: t } = vs(), [e, n] = D([]), o = G((a) => {
    if (fe(a) || tc(a)) {
      const s = [];
      oa.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return jd(o), /* @__PURE__ */ r(
    _o,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: oa.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        An,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Ma, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Bd({ onClear: t }) {
  const [e] = Ne();
  J(() => {
    t && t(() => {
      e.dispatchCommand(Oa, void 0);
    });
  }, [e, t]);
}
function Gd({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r($d, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Vd, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        kd,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(Md, { placeholder: t }) }),
          ErrorBoundary: $c
        }
      ),
      e && /* @__PURE__ */ r(Cd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Bd, { onClear: n }),
      /* @__PURE__ */ r(Td, {})
    ] })
  ] });
}
const Fd = {
  namespace: "commentEditor",
  theme: bo,
  nodes: vo,
  onError: (t) => {
    console.error(t);
  }
};
function ar({
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
          Ic,
          {
            initialConfig: {
              ...Fd,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p($t, { children: [
              /* @__PURE__ */ r(Gd, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                Oc,
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
function zd(t, e) {
  const n = ql(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!ks.has(s.nodeName)) {
    const i = _s(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof La && i.insertAfter(Va());
    for (const i of s) {
      const l = i.getChildren();
      for (const d of l) i.insertBefore(d);
      i.remove();
    }
  }(a), o;
}
function Kd(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = Re().getChildren();
  for (let a = 0; a < o.length; a++)
    Ns(t, o[a], n, e);
  return n.innerHTML;
}
function Ns(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = Ee(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && Jn(e) && (i = Gc(o, e, "clone"));
  const l = Ee(i) ? i.getChildren() : [], d = Kl(t, i.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, i) : i.exportDOM(t);
  const { element: w, after: m } = c;
  if (!w) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], y = Ns(t, g, f, o);
    !a && Ee(e) && y && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Da(w) || Go(w)) && w.append(f), n.append(w), m) {
      const u = m.call(i, w);
      u && (Go(w) ? w.replaceChildren(u) : w.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const ks = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function _s(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (ks.has(t.nodeName)) return i;
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
  let w = null;
  if (c !== null) {
    w = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, y] of a) if (l = y(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const m = t.childNodes;
  let f = [];
  const u = (l == null || !Hl(l)) && (l != null && Wn(l) || o);
  for (let g = 0; g < m.length; g++) f.push(..._s(m[g], e, n, u, new Map(a), l));
  return w != null && (f = w(f)), Fo(t) && (f = qd(t, f, u ? () => {
    const g = new La();
    return n.push(g), g;
  } : bn)), l == null ? f.length > 0 ? i = i.concat(f) : Fo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : zo(g.nextSibling) && zo(g.previousSibling);
  }(t) && (i = i.concat(Va())) : Ee(l) && l.append(...f), i;
}
function qd(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (Wn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && Wn(e[i + 1])) {
      const d = n();
      d.setFormat(o), d.append(...s), a.push(d), s = [];
    }
  }
  return a;
}
function Cs(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Es(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Es(e.children)
  ) : !1;
}
function se(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Es(t.root.children) : !1;
}
function Hd(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Ga({
    namespace: "EditorUtils",
    theme: bo,
    nodes: vo,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = zd(e, a);
      Re().clear(), Ul(s);
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
function sr(t) {
  const e = Ga({
    namespace: "EditorUtils",
    theme: bo,
    nodes: vo,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = Kd(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Co(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function Xn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Eo(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Ud = {
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
function Or(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Xu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = D(Ud), [i, l] = D(void 0), [d, c] = D(!1), w = H(void 0), m = H(null);
  J(() => {
    let N = !0;
    const R = m.current;
    if (!R) return;
    const I = setTimeout(() => {
      N && Cs(R);
    }, 300);
    return () => {
      N = !1, clearTimeout(I);
    };
  }, []);
  const f = G(() => {
    if (!se(a)) return;
    const N = sr(a);
    e(N, i);
  }, [a, e, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", y = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: x }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
          /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(hn, {}) }) }),
          /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: y }) })
        ] }) }),
        /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
          /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !se(a),
              children: /* @__PURE__ */ r(Zt, {})
            }
          ) }),
          /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(ye, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(ga, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Or(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        ce,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: t.map((N) => /* @__PURE__ */ r(
            oe,
            {
              onSelect: () => {
                l(N === "" ? void 0 : N), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Or(N, o) })
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
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : Eo(N) && (N.preventDefault(), N.stopPropagation(), se(a) && f());
        },
        onKeyDown: (N) => {
          Co(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          ar,
          {
            editorSerializedState: a,
            onSerializedChange: (N) => s(N),
            placeholder: u,
            onClear: (N) => {
              w.current = N;
            }
          }
        )
      }
    )
  ] });
}
const Wu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Ju = [
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
], Yd = ["input", "select", "textarea", "button"], Xd = ["button", "textbox"], Wd = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [s, i] = D(void 0), [l, d] = D(void 0), c = G(
    (u) => {
      i(u);
      const g = t.find((x) => x.id === u);
      g && (e == null || e(g));
      const y = document.getElementById(u);
      y && (y.scrollIntoView({ block: "center" }), y.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), w = G(
    (u) => {
      const g = t.find((y) => y.id === u);
      g && (d((y) => y === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Yd.includes(g)) return !0;
    const y = u.getAttribute("role");
    if (y && Xd.includes(y)) return !0;
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
          const v = C.findIndex(($) => $ === g);
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
          s && w(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const C = N;
          if (C) {
            const v = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), E = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), $ = v ?? E;
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
      const _ = t[V];
      _ && c(_.id);
    },
    [t, c, s, l, w, o]
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
}, Jd = Be(
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
), ge = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", Jd({ variant: e }), t), ...n })
);
ge.displayName = "Badge";
const Ts = b.forwardRef(
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
Ts.displayName = "Card";
const Zd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Zd.displayName = "CardHeader";
const Qd = b.forwardRef(
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
Qd.displayName = "CardTitle";
const tw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
tw.displayName = "CardDescription";
const Ss = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ss.displayName = "CardContent";
const ew = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
ew.displayName = "CardFooter";
const un = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Fa.Root,
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
un.displayName = Fa.Root.displayName;
const Rs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  vn.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Rs.displayName = vn.Root.displayName;
const nw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  vn.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
nw.displayName = vn.Image.displayName;
const Is = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  vn.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Is.displayName = vn.Fallback.displayName;
const To = lr(void 0);
function de() {
  const t = so(To);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ae = Be("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), De = ht.Trigger, Ds = ht.Group, rw = ht.Portal, ow = ht.Sub, aw = ht.RadioGroup;
function be({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(To.Provider, { value: n, children: /* @__PURE__ */ r(ht.Root, { ...e }) });
}
const Os = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = de();
  return /* @__PURE__ */ p(
    ht.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        Ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(dn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Os.displayName = ht.SubTrigger.displayName;
const Ms = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ct();
  return /* @__PURE__ */ r(
    ht.SubContent,
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
Ms.displayName = ht.SubContent.displayName;
const ie = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ r(ht.Portal, { children: /* @__PURE__ */ r(
    ht.Content,
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
ie.displayName = ht.Content.displayName;
const We = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Ct(), s = de();
  return /* @__PURE__ */ r(
    ht.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        Ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
We.displayName = ht.Item.displayName;
const ee = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Ct(), i = de();
  return /* @__PURE__ */ p(
    ht.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ae({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
ee.displayName = ht.CheckboxItem.displayName;
const As = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ct(), s = de();
  return /* @__PURE__ */ p(
    ht.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(cr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
As.displayName = ht.RadioItem.displayName;
const Ve = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ht.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Ve.displayName = ht.Label.displayName;
const Oe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ht.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Oe.displayName = ht.Separator.displayName;
function sw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
sw.displayName = "DropdownMenuShortcut";
function aa({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [d, c] = D(!1), [w, m] = D(), f = H(null);
  J(() => {
    if (!d) return;
    let S = !0;
    const V = f.current;
    if (!V) return;
    const _ = setTimeout(() => {
      S && Cs(V);
    }, 300);
    return () => {
      S = !1, clearTimeout(_);
    };
  }, [d]);
  const u = G(
    (S) => {
      S && S.stopPropagation(), c(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = G(
    async (S) => {
      if (S && S.stopPropagation(), !w || !a) return;
      await a(
        t.id,
        sr(w)
      ) && (c(!1), m(void 0), i == null || i(!1));
    },
    [w, a, t.id, i]
  ), y = z(() => {
    const S = new Date(t.date), V = Wi(
      S,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), _ = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Xe(n["%comment_dateAtTime%"], {
      date: V,
      time: _
    });
  }, [t.date, n]), x = z(() => t.user, [t.user]), N = z(
    () => t.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), R = z(() => Ji(t.contents), [t.contents]), I = z(() => {
    if (o && l)
      return /* @__PURE__ */ p(st, { children: [
        /* @__PURE__ */ p(
          We,
          {
            onClick: (S) => {
              S.stopPropagation(), c(!0), m(Hd(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(gi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          We,
          {
            onClick: async (S) => {
              S.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(bi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
  return /* @__PURE__ */ p(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(Rs, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Is, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: y }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(ge, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              Xn(t.assignedUser, n)
            ] })
          ] }),
          d && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (S) => {
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), u()) : Eo(S) && (S.preventDefault(), S.stopPropagation(), se(w) && g());
              },
              onKeyDown: (S) => {
                Co(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              },
              onClick: (S) => {
                S.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  ar,
                  {
                    className: h(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: w,
                    onSerializedChange: (S) => m(S)
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
                      disabled: !se(w),
                      children: /* @__PURE__ */ r(ba, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ p(st, { children: [
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
        I && /* @__PURE__ */ p(be, { children: [
          /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(vi, {}) }) }),
          /* @__PURE__ */ r(ie, { align: "end", children: I })
        ] })
      ]
    }
  );
}
const sa = {
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
function iw({
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
  threadStatus: w,
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
  onVerseRefClick: _
}) {
  const [T, C] = D(sa), [v, E] = D(
    void 0
  ), $ = o, [L, A] = D(!1), [j, U] = D(!1), [X, et] = D(!1), [Tt, Lt] = D(!1), [Rt, rt] = D(!1), [vt, q] = D(S), [it, ct] = D(!1), pt = H(void 0), [ut, It] = D(/* @__PURE__ */ new Map());
  J(() => {
    let M = !0;
    return (async () => {
      const xt = R ? await R(d) : !1;
      M && rt(xt);
    })(), () => {
      M = !1;
    };
  }, [d, R]), J(() => {
    let M = !0;
    if (!o) {
      Lt(!1), It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = N ? await N(d) : !1;
      M && Lt(xt);
    })(), () => {
      M = !1;
    };
  }, [o, d, N]);
  const Ot = z(() => e.filter((M) => !M.deleted), [e]);
  J(() => {
    let M = !0;
    if (!o || !I) {
      It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = /* @__PURE__ */ new Map();
      await Promise.all(
        Ot.map(async (ke) => {
          const Ge = await I(ke.id);
          M && xt.set(ke.id, Ge);
        })
      ), M && It(xt);
    })(), () => {
      M = !1;
    };
  }, [o, Ot, I]);
  const Vt = z(() => Ot[0], [Ot]), Pe = H(null), P = H(void 0), Bt = G(() => {
    var M;
    (M = P.current) == null || M.call(P), C(sa);
  }, []), Qt = G(() => {
    const M = !vt;
    q(M), ct(!M), g == null || g(d, M);
  }, [vt, g, d]);
  J(() => {
    A(!1);
  }, [o]), J(() => {
    if (o && !vt && !it) {
      const M = setTimeout(() => {
        q(!0), g == null || g(d, !0);
      }, V * 1e3);
      return pt.current = M, () => clearTimeout(M);
    }
    pt.current && (clearTimeout(pt.current), pt.current = void 0);
  }, [o, vt, it, V, d, g]);
  const Gt = z(
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
    const M = Xn(s, n);
    return Xe(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [s, n]), W = z(() => Ot.slice(1), [Ot]), nt = z(() => W.length ?? 0, [W.length]), lt = z(() => nt > 0, [nt]), mt = z(() => L || nt <= 2 ? W : W.slice(-2), [W, nt, L]), ft = z(() => L || nt <= 2 ? 0 : nt - 2, [nt, L]), Dt = z(
    () => nt === 1 ? Gt.singleReply : Xe(Gt.multipleReplies, { count: nt }),
    [nt, Gt]
  ), Nt = z(
    () => ft === 1 ? Gt.singleReply : Xe(Gt.multipleReplies, { count: ft }),
    [ft, Gt]
  );
  J(() => {
    !o && j && lt && U(!1);
  }, [o, j, lt]);
  const kt = G(
    async (M) => {
      M && M.stopPropagation();
      const _t = se(T) ? sr(T) : void 0;
      if (v !== void 0) {
        await m({
          threadId: d,
          contents: _t,
          assignedUser: v
        }) && (E(void 0), _t && Bt());
        return;
      }
      _t && await m({ threadId: d, contents: _t }) && Bt();
    },
    [
      Bt,
      T,
      m,
      v,
      d
    ]
  ), St = G(
    async (M) => {
      const _t = se(T) ? sr(T) : void 0, xt = await m({
        ...M,
        contents: _t,
        assignedUser: v ?? M.assignedUser
      });
      return xt && _t && Bt(), xt && v !== void 0 && E(void 0), xt;
    },
    [Bt, T, m, v]
  );
  if (Vt)
    return /* @__PURE__ */ r(
      Ts,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: h(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && w !== "Resolved" && vt,
            "tw-bg-background": o && w !== "Resolved" && vt,
            "tw-bg-muted": w === "Resolved",
            "tw-bg-accent": !vt && !o && w !== "Resolved"
          }
        ),
        onClick: () => {
          l(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Ss, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              B && /* @__PURE__ */ r(ge, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: B }),
              /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (M) => {
                    M.stopPropagation(), Qt();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": vt ? "Mark as unread" : "Mark as read",
                  children: vt ? /* @__PURE__ */ r(xi, {}) : /* @__PURE__ */ r(yi, {})
                }
              ),
              Rt && w !== "Resolved" && /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (M) => {
                    M.stopPropagation(), St({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: Pe,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": $
                  },
                  { "tw-whitespace-nowrap": !$ }
                ),
                children: [
                  a && _ ? /* @__PURE__ */ r(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (M) => {
                        M.stopPropagation(), _(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    Vt.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: Vt.selectedText }),
                    Vt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              aa,
              {
                comment: Vt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: w,
                handleAddCommentToThread: St,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: U,
                canEditOrDelete: (!j && ut.get(Vt.id)) ?? !1,
                canUserResolveThread: Rt
              }
            )
          ] }),
          /* @__PURE__ */ p(st, { children: [
            lt && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(un, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Dt })
            ] }),
            !o && se(T) && /* @__PURE__ */ r(
              ar,
              {
                editorSerializedState: T,
                onSerializedChange: (M) => C(M),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(st, { children: [
              ft > 0 && /* @__PURE__ */ p(
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
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(un, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Nt }),
                      L ? /* @__PURE__ */ r(va, {}) : /* @__PURE__ */ r(Se, {})
                    ] })
                  ]
                }
              ),
              mt.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                aa,
                {
                  comment: M,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: U,
                  canEditOrDelete: (!j && ut.get(M.id)) ?? !1
                }
              ) }, M.id)),
              x !== !1 && (!j || se(T)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (M) => M.stopPropagation(),
                  onKeyDownCapture: (M) => {
                    Eo(M) && (M.preventDefault(), M.stopPropagation(), (se(T) || v !== void 0) && kt());
                  },
                  onKeyDown: (M) => {
                    Co(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      ar,
                      {
                        editorSerializedState: T,
                        onSerializedChange: (M) => C(M),
                        placeholder: w === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (M) => {
                          P.current = M;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      v !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: Xe(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: Xn(
                            v,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(ye, { open: X, onOpenChange: et, children: [
                        /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Tt || !y || y.length === 0 || !y.includes(i),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(ga, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          ce,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (M) => {
                              M.key === "Escape" && (M.stopPropagation(), et(!1));
                            },
                            children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: y == null ? void 0 : y.map((M) => /* @__PURE__ */ r(
                              oe,
                              {
                                onSelect: () => {
                                  E(M !== s ? M : void 0), et(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: Xn(M, n) })
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
                          onClick: kt,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !se(T) && v === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(ba, {})
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
function Zu({
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
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: y,
  onVerseRefClick: x
}) {
  const [N, R] = D(/* @__PURE__ */ new Set()), [I, S] = D();
  J(() => {
    g && (R((A) => new Set(A).add(g)), S(g));
  }, [g]);
  const V = n.filter(
    (A) => A.comments.some((j) => !j.deleted)
  ), _ = V.map((A) => ({ id: A.id })), T = G(
    (A) => {
      R((j) => new Set(j).add(A.id)), S(A.id), y == null || y(A.id);
    },
    [y]
  ), C = G(
    (A) => {
      const j = N.has(A);
      R((U) => {
        const X = new Set(U);
        return X.has(A) ? X.delete(A) : X.add(A), X;
      }), S(A), y == null || y(j ? void 0 : A);
    },
    [N, y]
  ), { listboxRef: v, activeId: E, handleKeyDown: $ } = Wd({
    options: _,
    onOptionSelect: T
  }), L = G(
    (A) => {
      A.key === "Escape" ? (I && N.has(I) && (R((j) => {
        const U = new Set(j);
        return U.delete(I), U;
      }), S(void 0), y == null || y(void 0)), A.preventDefault(), A.stopPropagation()) : $(A);
    },
    [I, N, $, y]
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
      children: V.map((A) => /* @__PURE__ */ r(
        "div",
        {
          className: h({
            "tw-opacity-60": A.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            iw,
            {
              classNameForVerseText: e,
              comments: A.comments,
              localizedStrings: a,
              verseRef: A.verseRef,
              handleSelectThread: C,
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
              canUserAddCommentToThread: w,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
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
function lw({ table: t }) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(ec, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Ni, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(ie, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(Ve, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Oe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        ee,
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
const mn = yt.Root, cw = yt.Group, fn = yt.Value, dw = Be(
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
), Qe = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ p(
    yt.Trigger,
    {
      className: h(dw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(yt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Se, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Qe.displayName = yt.Trigger.displayName;
const Ps = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(va, { className: "tw-h-4 tw-w-4" })
  }
));
Ps.displayName = yt.ScrollUpButton.displayName;
const $s = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Se, { className: "tw-h-4 tw-w-4" })
  }
));
$s.displayName = yt.ScrollDownButton.displayName;
const tn = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ r(yt.Portal, { children: /* @__PURE__ */ p(
    yt.Content,
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
        /* @__PURE__ */ r(Ps, {}),
        /* @__PURE__ */ r(
          yt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r($s, {})
      ]
    }
  ) });
});
tn.displayName = yt.Content.displayName;
const ww = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
ww.displayName = yt.Label.displayName;
const te = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  yt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(yt.ItemIndicator, { children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(yt.ItemText, { children: e })
    ]
  }
));
te.displayName = yt.Item.displayName;
const pw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
pw.displayName = yt.Separator.displayName;
function uw({ table: t }) {
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
        mn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Qe, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(fn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(tn, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(te, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(ki, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(_i, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ci, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ei, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ia = `
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
function mw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function jn(t, e) {
  const n = e ? `${ia}, ${e}` : ia;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && mw(o)
  );
}
const ur = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        jn(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
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
        i.preventDefault(), jn(l)[0].focus();
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
ur.displayName = "Table";
const mr = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
mr.displayName = "TableHeader";
const fr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
fr.displayName = "TableBody";
const fw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
fw.displayName = "TableFooter";
function hw(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? jn(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function gw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function bw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const _e = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), hw(i);
  const l = b.useMemo(
    () => i.current ? jn(i.current) : [],
    [i]
  ), d = b.useCallback(
    (w) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        jn(f).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), y = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), bw(u, g, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), gw(l, y, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const x = m.closest("table");
        x && x.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), c = b.useCallback(
    (w) => {
      o && (n == null || n(w));
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
_e.displayName = "TableRow";
const Ln = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Ln.displayName = "TableHead";
const Je = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Je.displayName = "TableCell";
const vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
vw.displayName = "TableCaption";
function eo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function xw({
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
  var _;
  const [w, m] = D([]), [f, u] = D([]), [g, y] = D({}), [x, N] = D({}), R = z(() => e ?? [], [e]), I = za({
    data: R,
    columns: t,
    getCoreRowModel: qa(),
    ...n && { getPaginationRowModel: rc() },
    onSortingChange: m,
    getSortedRowModel: Ka(),
    onColumnFiltersChange: u,
    getFilteredRowModel: nc(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: N,
    state: {
      sorting: w,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: x
    }
  }), S = I.getVisibleFlatColumns();
  let V;
  return d ? V = Array.from({ length: 10 }).map((v, E) => `skeleton-row-${E}`).map((v) => /* @__PURE__ */ r(_e, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Je, { colSpan: S.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(eo, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, v)) : ((_ = I.getRowModel().rows) == null ? void 0 : _.length) > 0 ? V = I.getRowModel().rows.map((T) => /* @__PURE__ */ r(
    _e,
    {
      onClick: () => i(T, I),
      "data-state": T.getIsSelected() && "selected",
      children: T.getVisibleCells().map((C) => /* @__PURE__ */ r(Je, { children: On(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    T.id
  )) : V = /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Je, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(lw, { table: I }),
    /* @__PURE__ */ p(ur, { stickyHeader: s, children: [
      /* @__PURE__ */ r(mr, { stickyHeader: s, children: I.getHeaderGroups().map((T) => /* @__PURE__ */ r(_e, { children: T.headers.map((C) => /* @__PURE__ */ r(Ln, { className: "tw-p-0", children: C.isPlaceholder ? void 0 : On(C.column.columnDef.header, C.getContext()) }, C.id)) }, T.id)) }),
      /* @__PURE__ */ r(fr, { children: V })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
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
    n && o && /* @__PURE__ */ r(uw, { table: I })
  ] });
}
function Qu({
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
      children: /* @__PURE__ */ r(sc, { options: s, children: e })
    }
  );
}
const yw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), la = (t, e) => t[e] ?? e;
function Nw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = la(n, "%webView_error_dump_header%"), s = la(n, "%webView_error_dump_info_message%");
  function i() {
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
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(xa, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const tm = Object.freeze([
  ...yw,
  "%webView_error_dump_copied_message%"
]);
function em({
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
  return /* @__PURE__ */ p(ye, { onOpenChange: (w) => {
    w || l(!1);
  }, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: o }),
    /* @__PURE__ */ p(ce, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(Et, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Nw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var kw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(kw || {});
function nm({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (c, w) => c.itemType === 0 ? [w, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = D({}), l = (c, w) => {
    const m = !o[c][w];
    a((u) => (u[c][w] = m, { ...u }));
    const f = n[c].items[w];
    f.onUpdate(f.id, m);
  }, d = (c, w) => {
    i((f) => (f[c] = w, { ...f }));
    const m = n[c].items.find((f) => f.id === w);
    m ? m.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ r(ya, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Se, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ie, { children: n.map((c, w) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(Ve, { children: c.label }),
      /* @__PURE__ */ r(Ds, { children: c.itemType === 0 ? /* @__PURE__ */ r(st, { children: c.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        ee,
        {
          checked: o[w][f],
          onCheckedChange: () => l(w, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        aw,
        {
          value: s[w],
          onValueChange: (m) => d(w, m),
          children: c.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(As, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(Oe, {})
    ] }, c.label)) })
  ] }) });
}
function rm({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const d = new Zi("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((w, m) => w + m, 0)), c = () => {
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
            /* @__PURE__ */ r(Ti, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: w.toUpperCase() }, w)) }),
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
        (a || i) && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Si, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Ri, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function _w({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), w = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let u = "";
    return w > 0 ? u = `${w.toString()} year${w === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ p("div", { children: [
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
function om({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = z(() => Qi(n), [n]), d = ((c) => {
    const w = new Intl.DisplayNames(tl(), { type: "language" });
    return c.map((m) => w.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(_w, { versionHistory: a }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Cw({
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
  onOpenChange: w = void 0,
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
      const $ = (L = t.find((A) => A.label === E)) == null ? void 0 : L.value;
      $ && n(
        e.includes($) ? e.filter((A) => A !== $) : [...e, $]
      );
    },
    [t, e, n]
  ), S = () => d || o, V = z(() => {
    if (!f) return t;
    const E = t.filter((L) => L.starred).sort((L, A) => L.label.localeCompare(A.label)), $ = t.filter((L) => !L.starred).sort((L, A) => {
      const j = e.includes(L.value), U = e.includes(A.value);
      return j && !U ? -1 : !j && U ? 1 : L.label.localeCompare(A.label);
    });
    return [...E, ...$];
  }, [t, e, f]), _ = () => {
    n(t.map((E) => E.value));
  }, T = () => {
    n([]);
  }, C = c ?? N;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ p(ye, { open: C, onOpenChange: w ?? R, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": C,
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
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ r(lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ce, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ve, { children: [
      /* @__PURE__ */ r(nn, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: _, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: T, children: i })
      ] }),
      /* @__PURE__ */ p(xe, { children: [
        /* @__PURE__ */ r(yn, { children: l }),
        /* @__PURE__ */ r(ne, { children: V.map((E) => /* @__PURE__ */ p(
          oe,
          {
            value: E.label,
            onSelect: I,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Zt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(E.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              E.starred && /* @__PURE__ */ r(Ii, { className: "tw-h-4 tw-w-4" }),
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
function am({
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
  badgesPlaceholder: w,
  id: m
}) {
  return /* @__PURE__ */ p("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Cw,
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
      return /* @__PURE__ */ p(ge, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
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
    }) }) : /* @__PURE__ */ r(Et, { children: w })
  ] });
}
const Ew = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), ca = (t, e) => t[e] ?? e;
function Tw({
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
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Di, {})
        }
      ) }),
      /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ p("p", { children: [
        ca(a, "%undoButton_tooltip%"),
        s && ` (${d ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(Oi, {})
        }
      ) }),
      /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ p("p", { children: [
        ca(a, "%redoButton_tooltip%"),
        s && ` (${d ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Sw({ children: t, editorRef: e }) {
  const n = H(null);
  return J(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, w, m, f;
      if (!a || document.activeElement !== a) return;
      const d = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && d === "z" && (l.preventDefault(), (w = e.current) == null || w.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (d === "y" || l.shiftKey && d === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const kn = b.forwardRef(
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
kn.displayName = "Input";
const Rw = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(st, { children: [
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
function Iw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = H(null), i = H(null), l = H(!1), [d, c] = D(t), [w, m] = D(n), [f, u] = D(!1);
  J(() => {
    c(t);
  }, [t]), J(() => {
    w !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (d !== "custom" || w ? (e(d), o(w)) : (c(t), m(n)));
  }, y = (x) => {
    var N, R, I, S;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((R = i.current) == null || R.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((I = s.current) == null ? void 0 : I.selectionStart) === 0 && ((S = i.current) == null || S.focus(), l.current = !1), d === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ p(be, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Rw(t, a, n) }) }) }),
      /* @__PURE__ */ r(jt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ie,
      {
        style: { zIndex: Ha },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: y,
        onMouseMove: () => {
          var x;
          l.current && ((x = s.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ r(Ve, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Oe, {}),
          /* @__PURE__ */ r(
            ee,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: zr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            ee,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Kr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            ee,
            {
              ref: i,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (x) => {
                var N;
                x.stopPropagation(), l.current = !0, (N = s.current) == null || N.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
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
                    value: w,
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
const Dw = (t, e) => t === "f" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(ka, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(_a, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(Na, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ow = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), Xe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Mw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Yl, { asChild: !0, children: /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Dw(t, n) }) }) }),
      /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: Ow(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(ie, { style: { zIndex: Ha }, children: [
      /* @__PURE__ */ r(Ve, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Oe, {}),
      /* @__PURE__ */ p(
        ee,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Na, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        ee,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ka, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        ee,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(_a, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Aw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Pw({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Mi, { className: e, size: 16 });
}
function da({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    oe,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Pw, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(Ya, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function $w({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = D(""), [s, i] = z(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const d = e.filter(
      (w) => {
        var m;
        return (m = w.marker) == null ? void 0 : m.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (w) => w.title.toLowerCase().includes(l) && !d.includes(w)
    );
    return [d, c];
  }, [o, e]);
  return /* @__PURE__ */ p(ve, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      nn,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(xe, { children: [
      /* @__PURE__ */ r(yn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(ne, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ r(
          da,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ p(st, { children: [
        s.length > 0 && /* @__PURE__ */ r(wr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(ne, { children: i.map((l) => {
          var d;
          return /* @__PURE__ */ r(
            da,
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
function jw(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = Hn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[Hn[l].description] ?? Hn[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function Lw(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Vw(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Bw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function sm({
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
  const w = H(null), m = H(null), f = H(null), u = H(null);
  Wt(() => {
    if (!u.current) return;
    const { width: B } = u.current.getBoundingClientRect();
    B > 0 && (u.current.style.width = `${B}px`);
  }, []);
  const [g, y] = D("generated"), [x, N] = D("*"), [R, I] = D("f"), [S, V] = D(!1), [_, T] = D(!0), [C, v] = D(!1), E = H(!1), $ = H(""), [L, A] = D(!1), [j, U] = D(), [X, et] = D(), [Tt, Lt] = D(), [Rt, rt] = D(), vt = H(null), q = z(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? ic(), noteMode: "expanded" }
    }),
    [i, l]
  ), it = z(
    () => jw(
      w,
      () => A(!1),
      d,
      Rt
    ),
    [d, Rt]
  );
  J(() => {
    var B;
    L || (B = w.current) == null || B.focus();
  }, [R, L]), J(() => {
    var nt, lt;
    let B;
    E.current = !1, T(!0);
    const W = e == null ? void 0 : e.at(0);
    if (W && Fn("note", W)) {
      const mt = (nt = W.insert.note) == null ? void 0 : nt.caller;
      let ft = "custom";
      mt === zr ? ft = "generated" : mt === Kr ? ft = "hidden" : mt && N(mt), y(ft), I(((lt = W.insert.note) == null ? void 0 : lt.style) ?? "f"), B = setTimeout(() => {
        var Dt;
        (Dt = w.current) == null || Dt.applyUpdate([W]);
      }, 0);
    }
    return () => {
      B && clearTimeout(B);
    };
  }, [e, s]);
  const ct = G(
    (B, W, nt = !1) => {
      var mt, ft, Dt;
      const lt = (ft = (mt = w.current) == null ? void 0 : mt.getNoteOps(0)) == null ? void 0 : ft.at(0);
      if (lt && Fn("note", lt)) {
        if (lt.insert.note) {
          let Nt;
          B === "custom" ? Nt = W : B === "generated" ? Nt = zr : Nt = Kr, lt.insert.note.caller = Nt;
        }
        n == null || n([lt]), nt && c && s && ((Dt = c.current) == null || Dt.replaceEmbedUpdate(s, [lt]));
      }
    },
    [s, n, c]
  ), pt = G(() => {
    ct(g, x, !0), o();
  }, [g, x, o, ct]), ut = H(pt);
  Wt(() => {
    ut.current = pt;
  });
  const It = H({ book: a.book, chapterNum: a.chapterNum });
  Wt(() => {
    (It.current.book !== a.book || It.current.chapterNum !== a.chapterNum) && (It.current = { book: a.book, chapterNum: a.chapterNum }, ut.current());
  }, [a.book, a.chapterNum]);
  const Ot = () => {
    var W;
    const B = (W = m.current) == null ? void 0 : W.getElementsByClassName("editor-input")[0];
    B != null && B.textContent && navigator.clipboard.writeText(B.textContent);
  }, Vt = G(
    (B) => {
      y(B), ct(B, x);
    },
    [x, ct]
  ), Pe = G(
    (B) => {
      N(B), ct(g, B);
    },
    [g, ct]
  ), P = (B) => {
    var nt, lt, mt, ft, Dt;
    I(B);
    const W = (lt = (nt = w.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : lt.at(0);
    if (W && Fn("note", W)) {
      W.insert.note && (W.insert.note.style = B);
      const Nt = (ft = (mt = W.insert.note) == null ? void 0 : mt.contents) == null ? void 0 : ft.ops;
      R !== "x" && B === "x" ? Nt == null || Nt.forEach((kt) => Lw(kt)) : R === "x" && B !== "x" && (Nt == null || Nt.forEach((kt) => Vw(kt))), (Dt = w.current) == null || Dt.applyUpdate([W, { delete: 1 }]);
    }
  }, Bt = (B) => {
    rt(B.contextMarker), v(B.canRedo);
  }, Qt = G(
    (B) => {
      var nt, lt, mt, ft, Dt;
      const W = (lt = (nt = w.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : lt.at(0);
      if (W && Fn("note", W)) {
        B.content.length > 1 && setTimeout(() => {
          var St;
          (St = w.current) == null || St.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (mt = W.insert.note) == null ? void 0 : mt.style, kt = (Dt = (ft = W.insert.note) == null ? void 0 : ft.contents) == null ? void 0 : Dt.ops;
        if (Nt || V(!1), V(
          Nt === "x" ? !!(kt != null && kt.every((St) => {
            var _t, xt;
            if (!((_t = St.attributes) != null && _t.char)) return !0;
            const M = ((xt = St.attributes) == null ? void 0 : xt.char).style;
            return M === "xt" || M === "xo" || M === "xq";
          })) : !!(kt != null && kt.every((St) => {
            var _t, xt;
            if (!((_t = St.attributes) != null && _t.char)) return !0;
            const M = ((xt = St.attributes) == null ? void 0 : xt.char).style;
            return M === "ft" || M === "fr" || M === "fq";
          }))
        ), !E.current) {
          E.current = !0, $.current = JSON.stringify(W), T(!0);
          return;
        }
        T(JSON.stringify(W) === $.current), ct(g, x);
      } else
        V(!1), T(!0);
    },
    [g, x, ct]
  ), Gt = G(() => {
    const B = window.getSelection();
    if (f.current && it.length && B && B.rangeCount > 0) {
      const W = B.getRangeAt(0).getBoundingClientRect(), nt = f.current.getBoundingClientRect();
      U(W.left - nt.left), et(W.top - nt.top), Lt(W.height), A(!0);
    }
  }, [it, f]);
  return J(() => {
    const B = () => {
      L && A(!1);
    };
    return window.addEventListener("click", B), () => {
      window.removeEventListener("click", B);
    };
  }, [L]), J(() => {
    var B;
    L && ((B = vt.current) == null || B.focus());
  }, [L]), J(() => {
    var nt;
    const B = ((nt = m.current) == null ? void 0 : nt.querySelector(".editor-input")) ?? void 0, W = (lt) => {
      !L && B && document.activeElement === B && lt.key === l ? (lt.preventDefault(), Gt()) : L && lt.key === "Escape" && (lt.preventDefault(), A(!1));
    };
    return document.addEventListener("keydown", W), () => {
      document.removeEventListener("keydown", W);
    };
  }, [L, Gt, l]), /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            Mw,
            {
              isTypeSwitchable: S,
              noteType: R,
              handleNoteTypeChange: P,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
            Iw,
            {
              callerType: g,
              updateCallerType: Vt,
              customCaller: x,
              updateCustomCaller: Pe,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Tw,
            {
              onUndoClick: () => {
                var B;
                return (B = w.current) == null ? void 0 : B.undo();
              },
              onRedoClick: () => {
                var B;
                return (B = w.current) == null ? void 0 : B.redo();
              },
              canUndo: !_,
              canRedo: C,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
            /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: pt,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Zt, {})
              }
            ) }),
            /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
            /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(hn, {}) }) }),
            /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Sw, { editorRef: w, children: /* @__PURE__ */ r(
              lc,
              {
                options: q,
                onStateChange: Bt,
                onUsjChange: Qt,
                defaultUsj: Bw,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: w
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
              /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: Ot,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(xa, {})
                }
              ) }),
              /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ p(ye, { open: L, children: [
      /* @__PURE__ */ r(
        bc,
        {
          className: "tw-absolute",
          style: {
            top: X,
            left: j,
            height: Tt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        ce,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (B) => {
            B.preventDefault(), B.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            $w,
            {
              markerMenuItems: it,
              localizedStrings: d,
              searchRef: vt
            }
          )
        }
      )
    ] })
  ] });
}
const im = Object.freeze([
  ...Aw,
  ...Object.entries(Hn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Ew
]);
function js(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Gw(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, d) => {
    const c = d === s.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      So(t, l, n, !0, a),
      c && o
    ] }, js(t, l));
  });
}
function So(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Br, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Br, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return Fw(
        s,
        js(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Fw(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Br,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    So(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function zw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...l] = t.content);
  const d = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: h("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ p(st, { children: [
    So(t.marker, [i], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", y = h(f, u);
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: [
      d,
      w
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
        children: l && l.length > 0 && /* @__PURE__ */ r(st, { children: Gw(t.marker, l, o, c) })
      }
    )
  ] });
}
function lm({
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
  const w = d ?? el(n, void 0), m = (R, I) => {
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
  }, N = H([]);
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
            return /* @__PURE__ */ p(st, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (_) => {
                    N.current[I] = _;
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
                  onKeyDown: (_) => y(_, R, I),
                  children: /* @__PURE__ */ r(
                    zw,
                    {
                      footnote: R,
                      layout: o,
                      formatCaller: () => w(R.caller, I),
                      showMarkers: i
                    }
                  )
                },
                V
              ),
              I < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(un, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Kw(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function qw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = z(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const w = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(w) || (d.add(w), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(ur, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(mr, { stickyHeader: !0, children: /* @__PURE__ */ p(_e, { children: [
      /* @__PURE__ */ r(Ln, { children: a }),
      /* @__PURE__ */ r(Ln, { children: s })
    ] }) }),
    /* @__PURE__ */ r(fr, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ p(
      _e,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Je, { children: Ce(l.reference, "English") }),
          /* @__PURE__ */ r(Je, { className: o, children: Kw(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Ro = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      qr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ro.displayName = qr.Root.displayName;
const Hw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(ji, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Li, { className: "tw-h-4 tw-w-4" });
}, hr = (t, e, n) => /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
  /* @__PURE__ */ p(
    Ht,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        Hw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(jt, { side: "bottom", children: e })
] }) }), cm = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => hr(e, t)
}), Uw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => hr(n, t)
}), dm = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => hr(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Mr = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((c) => c !== d);
  }), o(i);
  let l = [...a];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), s(l);
}, wm = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => hr(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(_o, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        An,
        {
          onClick: (d) => {
            d.stopPropagation(), Mr(
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
          children: /* @__PURE__ */ r(Ai, {})
        }
      ),
      /* @__PURE__ */ r(
        An,
        {
          onClick: (d) => {
            d.stopPropagation(), Mr(
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
          children: /* @__PURE__ */ r(Pi, {})
        }
      ),
      /* @__PURE__ */ r(
        An,
        {
          onClick: (d) => {
            d.stopPropagation(), Mr(
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
          children: /* @__PURE__ */ r($i, {})
        }
      )
    ] });
  }
}), pm = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), um = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, mm = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Yw = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", fm = Object.freeze([
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
]), Xw = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Ww = (t, e, n) => t.map((o) => {
  const a = jo(o.key) ? o.key : o.key[0];
  return {
    items: jo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Yw(a, e, n),
    occurrences: o.occurrences || []
  };
}), pe = (t, e) => t[e] ?? e;
function hm({
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
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: m,
  onItemSelected: f
}) {
  const u = pe(n, "%webView_inventory_all%"), g = pe(n, "%webView_inventory_approved%"), y = pe(n, "%webView_inventory_unapproved%"), x = pe(n, "%webView_inventory_unknown%"), N = pe(n, "%webView_inventory_scope_currentBook%"), R = pe(n, "%webView_inventory_scope_chapter%"), I = pe(n, "%webView_inventory_scope_verse%"), S = pe(n, "%webView_inventory_filter_text%"), V = pe(
    n,
    "%webView_inventory_show_additional_items%"
  ), _ = pe(n, "%webView_inventory_no_results%"), [T, C] = D(!1), [v, E] = D("all"), [$, L] = D(""), [A, j] = D([]), U = z(() => {
    const q = t ?? [];
    return q.length === 0 ? [] : Ww(q, a, s);
  }, [t, a, s]), X = z(() => {
    if (T) return U;
    const q = [];
    return U.forEach((it) => {
      const ct = it.items[0], pt = q.find(
        (ut) => ut.items[0] === ct
      );
      pt ? (pt.count += it.count, pt.occurrences = pt.occurrences.concat(it.occurrences)) : q.push({
        items: [ct],
        count: it.count,
        occurrences: it.occurrences,
        status: it.status
      });
    }), q;
  }, [T, U]), et = z(() => X.length === 0 ? [] : Xw(X, v, $), [X, v, $]), Tt = z(() => {
    var ct, pt;
    if (!T) return d;
    const q = (ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct.length;
    if (!q) return d;
    const it = [];
    for (let ut = 0; ut < q; ut++)
      it.push(
        Uw(
          ((pt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : pt[ut]) || "Additional Item",
          ut + 1
        )
      );
    return [...it, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, T]);
  J(() => {
    et.length === 0 ? j([]) : et.length === 1 && j(et[0].items);
  }, [et]);
  const Lt = (q, it) => {
    it.setRowSelection(() => {
      const pt = {};
      return pt[q.index] = !0, pt;
    });
    const ct = q.original.items;
    j(ct), f && ct.length > 0 && f(ct[0]);
  }, Rt = (q) => {
    if (q === "book" || q === "chapter" || q === "verse")
      l(q);
    else
      throw new Error(`Invalid scope value: ${q}`);
  }, rt = (q) => {
    if (q === "all" || q === "approved" || q === "unapproved" || q === "unknown")
      E(q);
    else
      throw new Error(`Invalid status filter value: ${q}`);
  }, vt = z(() => {
    if (X.length === 0 || A.length === 0) return [];
    const q = X.filter((it) => nl(
      T ? it.items : [it.items[0]],
      A
    ));
    if (q.length > 1) throw new Error("Selected item is not unique");
    return q.length === 0 ? [] : q[0].occurrences;
  }, [A, T, X]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        mn,
        {
          onValueChange: (q) => rt(q),
          defaultValue: v,
          children: [
            /* @__PURE__ */ r(Qe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(fn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(tn, { children: [
              /* @__PURE__ */ r(te, { value: "all", children: u }),
              /* @__PURE__ */ r(te, { value: "approved", children: g }),
              /* @__PURE__ */ r(te, { value: "unapproved", children: y }),
              /* @__PURE__ */ r(te, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(mn, { onValueChange: (q) => Rt(q), defaultValue: i, children: [
        /* @__PURE__ */ r(Qe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(fn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(tn, { children: [
          /* @__PURE__ */ r(te, { value: "book", children: N }),
          /* @__PURE__ */ r(te, { value: "chapter", children: R }),
          /* @__PURE__ */ r(te, { value: "verse", children: I })
        ] })
      ] }),
      /* @__PURE__ */ r(
        kn,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: S,
          value: $,
          onChange: (q) => {
            L(q.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r($t, { children: /* @__PURE__ */ p(qt, { children: [
        /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Ro,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: T,
              onCheckedChange: (q) => {
                C(q);
              }
            }
          ),
          /* @__PURE__ */ r(Et, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? V })
        ] }) }),
        /* @__PURE__ */ r(jt, { children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      xw,
      {
        columns: Tt,
        data: et,
        onRowClickHandler: Lt,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: _
      }
    ) }),
    vt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      qw,
      {
        classNameForText: m,
        occurrenceData: vt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
function Jw(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const o = e.get(n.projectId), a = {
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: n.scrollGroupScrRefLabel
    };
    o ? o.some((s) => s.scrollGroupId === n.scrollGroupId) || o.push(a) : e.set(n.projectId, [a]);
  }), e.forEach((n) => n.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function wa(t, e, n) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === n);
}
function Ar(t) {
  const e = Jw(t.openTabs);
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
  const n = t.mode === "project-multi" ? t.selection.pairs : t.selection.projectId !== void 0 ? [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ] : [], o = [];
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
        isSelected: wa(n, a.id, void 0),
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
        isSelected: wa(n, a.id, i.scrollGroupId),
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
function pa(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Pr(t, e) {
  if (t.isSelected !== e.isSelected) return t.isSelected ? -1 : 1;
  const n = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (n !== 0) return n;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function Zw(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Pr) }];
  const n = t.filter(pa).sort(Pr), o = t.filter((s) => !pa(s)).sort(Pr), a = [];
  return n.length > 0 && a.push({ kind: "openTabs", rows: n }), o.length > 0 && a.push({ kind: "other", rows: o }), a;
}
const Qw = {
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
function tp(t) {
  return { ...Qw, ...t };
}
function Vn(t) {
  return t >= 0 && t <= 25 ? String.fromCharCode(65 + t) : String(t);
}
const ep = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function np({ scrollGroupId: t, isBoundButClosed: e }) {
  const n = Vn(t);
  return e ? /* @__PURE__ */ r(
    ge,
    {
      variant: "outline",
      className: "tw-relative tw-text-muted-foreground",
      style: ep,
      children: n
    }
  ) : /* @__PURE__ */ r(ge, { variant: "secondary", children: n });
}
function rp({ row: t, mode: e, strings: n, onClick: o, onOpen: a }) {
  const s = !!(t.language || t.languageCode), i = /* @__PURE__ */ r(Zt, { className: h("tw-h-4 tw-w-4", t.isSelected ? "tw-opacity-100" : "tw-opacity-0") });
  let l = null;
  e === "project" ? t.openGroups.length > 0 && (l = /* @__PURE__ */ r("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-gap-1", children: t.openGroups.map((m) => /* @__PURE__ */ r(ge, { variant: "secondary", children: Vn(m) }, m)) })) : t.scrollGroupId !== void 0 && (l = /* @__PURE__ */ p("span", { className: "tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      np,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && a && /* @__PURE__ */ p(
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
          /* @__PURE__ */ r(ha, { className: "tw-h-3 tw-w-3" }),
          n.openButtonLabel
        ]
      }
    )
  ] }));
  const d = /* @__PURE__ */ p(
    oe,
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
  ), c = t.scrollGroupId !== void 0 ? Vn(t.scrollGroupId) : void 0, w = t.isBoundButClosed && c ? n.boundButClosedTooltip.replace("{group}", c) : void 0;
  return /* @__PURE__ */ p(qt, { delayDuration: 200, children: [
    /* @__PURE__ */ r(Ht, { asChild: !0, children: d }),
    /* @__PURE__ */ p(
      jt,
      {
        side: "right",
        align: "start",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw-max-w-xs",
        style: { zIndex: mo },
        children: [
          /* @__PURE__ */ r("div", { className: "tw-font-semibold", children: t.fullName }),
          s && /* @__PURE__ */ p("div", { className: "tw-text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && c && /* @__PURE__ */ p("div", { className: "tw-text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " (",
              c,
              ")"
            ] })
          ] }),
          w && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: w })
        ]
      }
    )
  ] });
}
function op({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: n,
  onChangeShowSelectedOnly: o,
  strings: a
}) {
  const s = !!n;
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ r(
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
        children: /* @__PURE__ */ r(ya, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ p(ie, { align: "end", className: "tw-w-56", style: { zIndex: mo }, children: [
      /* @__PURE__ */ r(Ve, { children: a.groupSectionLabel }),
      /* @__PURE__ */ r(
        ee,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: a.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ p(st, { children: [
        /* @__PURE__ */ r(Oe, {}),
        /* @__PURE__ */ r(Ve, { children: a.filterSectionLabel }),
        /* @__PURE__ */ r(
          ee,
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
function gm(t) {
  const [e, n] = D(!1), [o, a] = D(""), [s, i] = D(t.defaultGroupByOpenTabs ?? !0), [l, d] = D(!1), c = tp(t.localizedStrings), w = z(() => t.mode === "project" ? Ar({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ar({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ar({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), m = z(() => {
    const _ = o.trim().toLowerCase();
    let T = w;
    return _ && (T = T.filter(
      (C) => C.shortName.toLowerCase().includes(_) || C.fullName.toLowerCase().includes(_) || (C.language ?? "").toLowerCase().includes(_) || (C.languageCode ?? "").toLowerCase().includes(_)
    )), t.mode === "project-multi" && l && (T = T.filter((C) => C.isSelected)), T;
  }, [w, o, t.mode, l]), f = z(
    () => Zw(m, s),
    [m, s]
  ), u = z(() => {
    if (t.mode !== "project-multi") return [];
    const _ = [];
    return t.projects.forEach((T) => {
      const C = t.openTabs.filter((E) => E.projectId === T.id);
      if (C.length === 0) {
        _.push({ projectId: T.id });
        return;
      }
      const v = /* @__PURE__ */ new Set();
      C.forEach((E) => {
        v.has(E.scrollGroupId) || (v.add(E.scrollGroupId), _.push({ projectId: T.id, scrollGroupId: E.scrollGroupId }));
      });
    }), _;
  }, [t.mode, t.projects, t.openTabs]), g = (_) => {
    if (_.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(_.projectId, _.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(_.projectId, _.scrollGroupId);
    }
  }, y = (_) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: _.projectId }), n(!1);
        return;
      }
      case "project-multi": {
        const T = t.selection.pairs, C = (E) => E.projectId === _.projectId && E.scrollGroupId === _.scrollGroupId, v = T.some(C) ? T.filter((E) => !C(E)) : [...T, { projectId: _.projectId, scrollGroupId: _.scrollGroupId }];
        t.onChangeSelection({ pairs: v }), v.length === 0 && l && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (_.isBoundButClosed && _.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(_.projectId, _.scrollGroupId), n(!1);
          return;
        }
        if (_.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: _.projectId,
            scrollGroupId: _.scrollGroupId
          }), n(!1);
          return;
        }
        const T = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: _.projectId, scrollGroupId: T }), t.onOpenProjectInGroup(_.projectId, T), n(!1);
      }
    }
  }, x = () => {
    if (t.mode !== "project-multi") return;
    const _ = t.selection.pairs, T = new Set(_.map((v) => `${v.projectId}:${v.scrollGroupId ?? ""}`)), C = [..._];
    u.forEach((v) => {
      const E = `${v.projectId}:${v.scrollGroupId ?? ""}`;
      T.has(E) || (T.add(E), C.push(v));
    }), t.onChangeSelection({ pairs: C });
  }, N = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, R = z(() => {
    switch (t.mode) {
      case "project": {
        const _ = t.projects.find((C) => C.id === t.selection.projectId), T = _ ? _.shortName : t.buttonPlaceholder ?? "";
        return { node: T, title: T };
      }
      case "project-multi": {
        const { pairs: _ } = t.selection;
        if (_.length === 0) {
          const E = t.buttonPlaceholder ?? "";
          return { node: E, title: E };
        }
        const T = [];
        if (_.forEach((E) => {
          const $ = t.projects.find((L) => L.id === E.projectId);
          $ && T.push({ project: $, scrollGroupId: E.scrollGroupId });
        }), T.length === 0) {
          const E = t.buttonPlaceholder ?? "";
          return { node: E, title: E };
        }
        if (t.getSelectedText) {
          const E = t.getSelectedText(T);
          return { node: E, title: E };
        }
        const C = T.map(
          ({ project: E, scrollGroupId: $ }) => $ === void 0 ? E.shortName : `${E.shortName} (${Vn($)})`
        ).join(", ");
        if (T.length === 1) return { node: C, title: C };
        const v = T.length.toString();
        return {
          node: /* @__PURE__ */ p(st, { children: [
            /* @__PURE__ */ r(ge, { variant: "muted", className: "tw-shrink-0", children: v }),
            /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-truncate", children: C })
          ] }),
          title: `${v} ${C}`
        };
      }
      case "projectScrollGroup": {
        const _ = t.projects.find((v) => v.id === t.selection.projectId);
        if (!_) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const T = t.selection.scrollGroupId;
        if (T === void 0)
          return { node: _.shortName, title: _.shortName };
        const C = `${_.shortName} · ${Vn(T)}`;
        return { node: C, title: C };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), I = t.mode === "project-multi" ? /* @__PURE__ */ r(lo, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }) : /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }), S = t.mode === "project-multi" && t.selection.pairs.length > 0, V = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? g : void 0;
  return /* @__PURE__ */ p(ye, { open: e, onOpenChange: n, children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(
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
      ce,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: h(
          "tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",
          t.popoverContentClassName
        ),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ r($t, { delayDuration: 200, children: /* @__PURE__ */ p(ve, { shouldFilter: !1, children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-pe-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-flex-1", children: /* @__PURE__ */ r(
              nn,
              {
                value: o,
                onValueChange: a,
                placeholder: c.searchPlaceholder,
                className: "tw-border-0"
              }
            ) }),
            /* @__PURE__ */ r(
              op,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: c
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-py-2 tw-pe-4 tw-ps-2", children: [
            /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: x, children: `${c.selectAll} (${u.length.toString()})` }),
            /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: N, children: `${c.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ p(xe, { children: [
            /* @__PURE__ */ r(yn, { children: t.commandEmptyMessage ?? "No projects found" }),
            f.map((_, T) => /* @__PURE__ */ p(io, { children: [
              /* @__PURE__ */ r(ne, { heading: ap(_, c), children: _.rows.map((C) => /* @__PURE__ */ r(
                rp,
                {
                  row: C,
                  mode: t.mode,
                  strings: c,
                  onClick: y,
                  onOpen: V
                },
                C.rowKey
              )) }),
              T < f.length - 1 && /* @__PURE__ */ r(wr, {})
            ] }, _.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function ap(t, e) {
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
const sp = "16rem", ip = "3rem", Ls = b.createContext(void 0);
function gr() {
  const t = b.useContext(Ls);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Vs = b.forwardRef(
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
    const [c, w] = b.useState(t), m = e ?? c, f = b.useCallback(
      (I) => {
        const S = typeof I == "function" ? I(m) : I;
        n ? n(S) : w(S);
      },
      [n, m]
    ), u = b.useCallback(() => f((I) => !I), [f]), g = m ? "expanded" : "collapsed", N = Ct() === "ltr" ? i : i === "primary" ? "secondary" : "primary", R = b.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: N
      }),
      [g, m, f, u, N]
    );
    return /* @__PURE__ */ r(Ls.Provider, { value: R, children: /* @__PURE__ */ r($t, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": sp,
            "--sidebar-width-icon": ip,
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
Vs.displayName = "SidebarProvider";
const Bs = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = gr();
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
  ) : /* @__PURE__ */ p(
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
Bs.displayName = "Sidebar";
const lp = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = gr();
  return /* @__PURE__ */ p(
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
        a.side === "primary" ? /* @__PURE__ */ r(Vi, {}) : /* @__PURE__ */ r(Bi, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
lp.displayName = "SidebarTrigger";
const cp = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = gr();
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
cp.displayName = "SidebarRail";
const Gs = b.forwardRef(
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
Gs.displayName = "SidebarInset";
const dp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kn,
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
dp.displayName = "SidebarInput";
const wp = b.forwardRef(
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
wp.displayName = "SidebarHeader";
const pp = b.forwardRef(
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
pp.displayName = "SidebarFooter";
const up = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  un,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
up.displayName = "SidebarSeparator";
const Fs = b.forwardRef(
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
Fs.displayName = "SidebarContent";
const no = b.forwardRef(
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
no.displayName = "SidebarGroup";
const ro = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? gn : "div",
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
ro.displayName = "SidebarGroupLabel";
const mp = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? gn : "button",
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
mp.displayName = "SidebarGroupAction";
const oo = b.forwardRef(
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
oo.displayName = "SidebarGroupContent";
const zs = b.forwardRef(
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
zs.displayName = "SidebarMenu";
const Ks = b.forwardRef(
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
Ks.displayName = "SidebarMenuItem";
const fp = Be(
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
), qs = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const d = t ? gn : "button", { state: c } = gr(), w = /* @__PURE__ */ r(
      d,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(fp({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: w }),
      /* @__PURE__ */ r(jt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : w;
  }
);
qs.displayName = "SidebarMenuButton";
const hp = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? gn : "button",
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
hp.displayName = "SidebarMenuAction";
const gp = b.forwardRef(
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
gp.displayName = "SidebarMenuBadge";
const bp = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(eo, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          eo,
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
bp.displayName = "SidebarMenuSkeleton";
const vp = b.forwardRef(
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
vp.displayName = "SidebarMenuSub";
const xp = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
xp.displayName = "SidebarMenuSubItem";
const yp = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? gn : "a",
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
yp.displayName = "SidebarMenuSubButton";
function Np({
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
  ), w = G(
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
    Bs,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ p(Fs, { children: [
        /* @__PURE__ */ p(no, { children: [
          /* @__PURE__ */ r(ro, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(oo, { children: /* @__PURE__ */ r(zs, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ r(Ks, { children: /* @__PURE__ */ r(
            qs,
            {
              onClick: () => c(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(no, { children: [
          /* @__PURE__ */ r(ro, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(oo, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Wr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: mo },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: w,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = w(f);
                c(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Gi, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Io = Bn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = Ct();
    return /* @__PURE__ */ p("div", { id: i, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        fa,
        {
          className: h(
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
      t && /* @__PURE__ */ p(
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
            /* @__PURE__ */ r(hn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Io.displayName = "SearchBar";
function bm({
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
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ p("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Io,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Vs,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Np,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ r(Gs, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const je = "scrBook", kp = "scrRef", Ye = "source", _p = "details", Cp = "Scripture Reference", Ep = "Scripture Book", Hs = "Type", Tp = "Details";
function Sp(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: je,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Cp,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === je ? Ce(a.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Gr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ce(o.start),
      id: kp,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ce(a.start);
      },
      sortingFn: (o, a) => Gr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ye,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Hs : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: _p,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Tp,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Rp = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Gr(t.start, t.end) === 0 ? `${xr(t.start)}+${e}` : `${xr(t.start)}+${e}-${xr(t.end)}+${n}`;
}, ua = (t) => `${Rp({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function vm({
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
  const [c, w] = D([]), [m, f] = D([{ id: je, desc: !1 }]), [u, g] = D({}), y = z(
    () => t.flatMap((v) => v.data.map((E) => ({
      ...E,
      source: v.source
    }))),
    [t]
  ), x = z(
    () => Sp(
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
    c.includes(Ye) ? f([
      { id: Ye, desc: !1 },
      { id: je, desc: !1 }
    ]) : f([{ id: je, desc: !1 }]);
  }, [c]);
  const N = za({
    data: y,
    columns: x,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: w,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: ac(),
    getGroupedRowModel: oc(),
    getCoreRowModel: qa(),
    getSortedRowModel: Ka(),
    getRowId: ua,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  J(() => {
    if (l) {
      const v = N.getSelectedRowModel().rowsById, E = Object.keys(v);
      if (E.length === 1) {
        const $ = y.find((L) => ua(L) === E[0]) || void 0;
        $ && l($);
      }
    }
  }, [u, y, l, N]);
  const R = a ?? Ep, I = s ?? Hs, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${R}`, value: [je] },
    { label: `Group by ${I}`, value: [Ye] },
    {
      label: `Group by ${R} and ${I}`,
      value: [je, Ye]
    },
    {
      label: `Group by ${I} and ${R}`,
      value: [Ye, je]
    }
  ], V = (v) => {
    w(JSON.parse(v));
  }, _ = (v, E) => {
    !v.getIsGrouped() && !v.getIsSelected() && v.getToggleSelectedHandler()(E);
  }, T = (v, E) => v.getIsGrouped() ? "" : h("banded-row", E % 2 === 0 ? "even" : "odd"), C = (v, E, $) => {
    if (!((v == null ? void 0 : v.length) === 0 || E.depth < $.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ p("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      mn,
      {
        value: JSON.stringify(c),
        onValueChange: (v) => {
          V(v);
        },
        children: [
          /* @__PURE__ */ r(Qe, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(fn, {}) }),
          /* @__PURE__ */ r(tn, { position: "item-aligned", children: /* @__PURE__ */ r(cw, { children: S.map((v) => /* @__PURE__ */ r(te, { value: JSON.stringify(v.value), children: v.label }, v.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(ur, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(mr, { children: N.getHeaderGroups().map((v) => /* @__PURE__ */ r(_e, { children: v.headers.filter((E) => E.column.columnDef.header).map((E) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Ln, { colSpan: E.colSpan, className: "top-0 tw-sticky", children: E.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
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
          On(E.column.columnDef.header, E.getContext())
        ] }) }, E.id)
      )) }, v.id)) }),
      /* @__PURE__ */ r(fr, { children: N.getRowModel().rows.map((v, E) => {
        const $ = Ct();
        return /* @__PURE__ */ r(
          _e,
          {
            "data-state": v.getIsSelected() ? "selected" : "",
            className: h(T(v, E)),
            onClick: (L) => _(v, L),
            children: v.getVisibleCells().map((L) => {
              if (!(L.getIsPlaceholder() || L.column.columnDef.enableGrouping && !L.getIsGrouped() && (L.column.columnDef.id !== Ye || !n)))
                return /* @__PURE__ */ r(
                  Je,
                  {
                    className: h(
                      L.column.columnDef.id,
                      "tw-p-[1px]",
                      C(c, v, L)
                    ),
                    children: L.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: v.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          v.getIsExpanded() && /* @__PURE__ */ r(Se, {}),
                          !v.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(dn, {}) : /* @__PURE__ */ r(Vr, {})),
                          " ",
                          On(L.column.columnDef.cell, L.getContext()),
                          " (",
                          v.subRows.length,
                          ")"
                        ]
                      }
                    ) : On(L.column.columnDef.cell, L.getContext())
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
const Do = (t, e) => t.filter((n) => {
  try {
    return Dn(n) === e;
  } catch {
    return !1;
  }
}), Us = (t, e, n) => Do(t, e).every((o) => n.includes(o));
function Ip({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Do(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], d = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        Us(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: gc(
        t,
        i,
        l,
        d,
        c
      )
    }
  );
}
const ma = 5, $r = 6;
function Dp({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, N] = D(!1), [R, I] = D(""), S = H(void 0), V = H(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const _ = z(() => wt.allBookIds.filter(
    (j, U) => t[U] === "1" && !wt.isObsolete(wt.bookIdToNumber(j))
  ), [t]), T = z(() => {
    if (!R.trim()) {
      const X = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return _.forEach((et) => {
        const Tt = Dn(et);
        X[Tt].push(et);
      }), X;
    }
    const j = _.filter(
      (X) => ho(X, R, a)
    ), U = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return j.forEach((X) => {
      const et = Dn(X);
      U[et].push(X);
    }), U;
  }, [_, R, a]), C = G(
    (j, U = !1) => {
      if (!U || !S.current) {
        n(
          e.includes(j) ? e.filter((rt) => rt !== j) : [...e, j]
        ), S.current = j;
        return;
      }
      const X = _.findIndex((rt) => rt === S.current), et = _.findIndex((rt) => rt === j);
      if (X === -1 || et === -1) return;
      const [Tt, Lt] = [
        Math.min(X, et),
        Math.max(X, et)
      ], Rt = _.slice(Tt, Lt + 1).map((rt) => rt);
      n(
        e.includes(j) ? e.filter((rt) => !Rt.includes(rt)) : [.../* @__PURE__ */ new Set([...e, ...Rt])]
      );
    },
    [e, n, _]
  ), v = (j) => {
    C(j, V.current), V.current = !1;
  }, E = (j, U) => {
    j.preventDefault(), C(U, j.shiftKey);
  }, $ = G(
    (j) => {
      const U = Do(_, j).map((X) => X);
      n(
        Us(_, j, e) ? e.filter((X) => !U.includes(X)) : [.../* @__PURE__ */ new Set([...e, ...U])]
      );
    },
    [e, n, _]
  ), L = () => {
    n(_.map((j) => j));
  }, A = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Q).map((j) => /* @__PURE__ */ r(
      Ip,
      {
        section: j,
        availableBookIds: _,
        selectedBookIds: e,
        onToggle: $,
        localizedStrings: o
      },
      j
    )) }),
    /* @__PURE__ */ p(
      ye,
      {
        open: x,
        onOpenChange: (j) => {
          N(j), j || I("");
        },
        children: [
          /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(ce, { className: "tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ve,
            {
              shouldFilter: !1,
              onKeyDown: (j) => {
                j.key === "Enter" && (V.current = j.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  nn,
                  {
                    placeholder: l,
                    value: R,
                    onValueChange: I
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: L, children: d }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: A, children: c })
                ] }),
                /* @__PURE__ */ p(xe, { children: [
                  /* @__PURE__ */ r(yn, { children: w }),
                  Object.values(Q).map((j, U) => {
                    const X = T[j];
                    if (X.length !== 0)
                      return /* @__PURE__ */ p(io, { children: [
                        /* @__PURE__ */ r(
                          ne,
                          {
                            heading: Xa(j, f, u, g, y),
                            children: X.map((et) => /* @__PURE__ */ r(
                              Ja,
                              {
                                bookId: et,
                                isSelected: e.includes(et),
                                onSelect: () => v(et),
                                onMouseDown: (Tt) => E(Tt, et),
                                section: Dn(et),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ts(et, a),
                                className: "tw-flex tw-items-center"
                              },
                              et
                            ))
                          }
                        ),
                        U < Object.values(Q).length - 1 && /* @__PURE__ */ r(wr, {})
                      ] }, j);
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
        e.length === $r ? $r : ma
      ).map((j) => /* @__PURE__ */ r(ge, { className: "hover:tw-bg-secondary", variant: "secondary", children: Le(j, a) }, j)),
      e.length > $r && /* @__PURE__ */ r(
        ge,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - ma} ${m}`
        }
      )
    ] })
  ] });
}
const xm = Object.freeze([
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
]), Pt = (t, e) => t[e] ?? e, Op = Object.freeze([" ", "-"]);
function ym({
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
  rangeStart: w,
  rangeEnd: m,
  onRangeStartChange: f,
  onRangeEndChange: u,
  currentScrRef: g,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: x,
  getEndVerse: N
}) {
  const R = Pt(
    i,
    "%webView_scope_selector_selected_text%"
  ), I = Pt(i, "%webView_scope_selector_verse%"), S = Pt(i, "%webView_scope_selector_chapter%"), V = Pt(i, "%webView_scope_selector_book%"), _ = Pt(
    i,
    "%webView_scope_selector_current_verse%"
  ), T = Pt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), C = Pt(i, "%webView_scope_selector_current_book%"), v = Pt(i, "%webView_scope_selector_choose_books%"), E = Pt(i, "%webView_scope_selector_scope%"), $ = Pt(i, "%webView_scope_selector_select_books%"), L = Pt(i, "%webView_scope_selector_range%"), A = Pt(i, "%webView_scope_selector_select_range%"), j = Pt(i, "%webView_scope_selector_range_start%"), U = Pt(i, "%webView_scope_selector_range_end%"), X = Pt(i, "%webView_scope_selector_ok%"), et = Pt(i, "%webView_scope_selector_navigate%"), Tt = (O) => {
    if (!g) return;
    const K = g.book.toUpperCase();
    switch (O) {
      case "verse":
        return Ce(g, "id");
      case "chapter":
        return `${K} ${g.chapterNum}`;
      case "book":
        return K;
      default:
        return;
    }
  }, Lt = [
    { value: "selectedText", label: R, id: "scope-selected-text" },
    {
      value: "verse",
      label: I,
      dropdownLabel: _,
      scrRefSuffix: Tt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: S,
      dropdownLabel: T,
      scrRefSuffix: Tt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: V,
      dropdownLabel: C,
      scrRefSuffix: Tt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: v, id: "scope-selected" },
    { value: "range", label: L, id: "scope-range" }
  ], Rt = (O, K, Z = !1) => /* @__PURE__ */ p(st, { children: [
    O,
    K && !Z && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
      ": ",
      K
    ] })
  ] }), rt = e ? Lt.filter((O) => e.includes(O.value)) : Lt, vt = g ?? yr, q = w ?? vt, it = m ?? vt, ct = () => {
  }, pt = H(null), ut = H(null), It = H(!1), Ot = H(null), Vt = H(!1), [Pe, P] = D(void 0), Bt = H(!1), Qt = H(!1), Gt = H(null), B = G((O) => {
    if (O) {
      P("start"), Bt.current = !1;
      return;
    }
    P((K) => K === "start" ? void 0 : K), Bt.current && (Bt.current = !1, requestAnimationFrame(() => {
      var Z;
      const K = (Z = pt.current) == null ? void 0 : Z.querySelector("button");
      K == null || K.click();
    }));
  }, []), W = G((O) => {
    if (O) {
      P("end"), Qt.current = !1;
      return;
    }
    P((K) => K === "end" ? void 0 : K);
  }, []), nt = G(
    (O) => {
      f == null || f(O), u == null || u(O), Bt.current = !0;
    },
    [f, u]
  ), lt = G(
    (O) => {
      u == null || u(O), Qt.current = !0;
    },
    [u]
  ), mt = G(
    (O) => {
      n(O), O === "selectedBooks" && a.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [n, a, g, s]
  ), ft = rt.find((O) => O.value === t), Dt = () => t === "selectedBooks" && a.length > 0 ? a.map((O) => O.toUpperCase()).join(", ") : t === "range" ? rl(q, it, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : ft ? Rt(ft.label, ft.scrRefSuffix) : t, Nt = rt.filter(
    (O) => O.value !== "selectedBooks" && O.value !== "range"
  ), kt = rt.find((O) => O.value === "selectedBooks"), St = rt.find((O) => O.value === "range"), M = /* @__PURE__ */ r(
    Dp,
    {
      availableBookInfo: o,
      selectedBookIds: a,
      onChangeSelectedBookIds: s,
      localizedStrings: i,
      localizedBookNames: l
    }
  ), _t = Pe === "end", xt = Pe === "start", ke = "tw-text-muted-foreground", Ge = /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-wrap tw-items-end tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-start", className: h(_t && ke), children: j }),
      /* @__PURE__ */ r(
        _r,
        {
          id: "scope-range-start",
          scrRef: q,
          handleSubmit: nt,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          submitKeys: Op,
          onOpenChange: B,
          className: h(_t && ke),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: pt, className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-end", className: h(xt && ke), children: U }),
      /* @__PURE__ */ r(
        _r,
        {
          id: "scope-range-end",
          scrRef: it,
          handleSubmit: u ? lt : ct,
          localizedBookNames: l,
          localizedStrings: x,
          getEndVerse: N,
          disableReferencesUpTo: q,
          onOpenChange: W,
          onCloseAutoFocus: (O) => {
            var K;
            Qt.current && (Qt.current = !1, O.preventDefault(), (K = Gt.current) == null || K.focus());
          },
          className: h(xt && ke),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), [rn, _n] = D(!1), [Cn, Fe] = D(void 0), En = H({}), on = G(
    (O) => (K) => {
      En.current[O] = K;
    },
    []
  ), Tn = H(null);
  J(() => {
    if (!rn) return;
    let O = 0;
    const K = requestAnimationFrame(() => {
      O = requestAnimationFrame(() => {
        var Z;
        (Z = En.current[t]) == null || Z.focus();
      });
    });
    return () => {
      cancelAnimationFrame(K), O && cancelAnimationFrame(O);
    };
  }, [rn, t]);
  const [ze, br] = D(null), [an, vr] = D(null), [k, Y] = D(null), tt = 200, [Ft, $e] = D(!1);
  J(() => {
    if (!k || typeof ResizeObserver > "u") return;
    const O = new ResizeObserver(([K]) => {
      $e(K.contentRect.width < tt);
    });
    return O.observe(k), () => O.disconnect();
  }, [k]);
  const Ke = G(
    (O) => {
      mt(O), _n(!1), Fe(O);
    },
    [mt]
  ), qe = G((O) => {
    var K;
    O.preventDefault(), (K = Tn.current) == null || K.focus();
  }, []), Mt = (O) => t === O ? /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" }) }) : void 0;
  return /* @__PURE__ */ p("div", { id: d, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { children: E }),
      c === "dropdown" ? /* @__PURE__ */ p(be, { open: rn, onOpenChange: _n, children: [
        /* @__PURE__ */ r(De, { asChild: !0, children: /* @__PURE__ */ p(
          F,
          {
            ref: Tn,
            variant: "outline",
            role: "combobox",
            className: "tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",
            children: [
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Dt() }),
              /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ r(
          ie,
          {
            ref: Y,
            className: "tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(Nr, { container: k, children: [
              Nt.map(({ value: O, label: K, dropdownLabel: Z, scrRefSuffix: At, id: we }) => /* @__PURE__ */ r(
                ee,
                {
                  ref: on(O),
                  checked: t === O,
                  onCheckedChange: (He) => {
                    He && mt(O);
                  },
                  children: Rt(Z ?? K, At, Ft)
                },
                we
              )),
              (kt || St) && /* @__PURE__ */ r(Oe, {}),
              kt && /* @__PURE__ */ p(
                We,
                {
                  ref: on("selectedBooks"),
                  className: h("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),
                  onSelect: () => Ke("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Mt("selectedBooks"),
                    `${kt.label}…`
                  ]
                }
              ),
              St && /* @__PURE__ */ p(
                We,
                {
                  ref: on("range"),
                  className: h("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),
                  onSelect: () => Ke("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Mt("range"),
                    `${St.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ p(st, { children: [
                /* @__PURE__ */ r(Oe, {}),
                /* @__PURE__ */ r(Ve, { className: "tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground", children: et }),
                /* @__PURE__ */ r(
                  We,
                  {
                    ref: Ot,
                    className: "tw-p-0",
                    onSelect: (O) => {
                      var K, Z;
                      if (O.preventDefault(), It.current) {
                        It.current = !1;
                        return;
                      }
                      Vt.current || (Z = (K = ut.current) == null ? void 0 : K.querySelector("button")) == null || Z.click();
                    },
                    children: /* @__PURE__ */ r(
                      "div",
                      {
                        ref: ut,
                        className: "tw-w-full tw-px-1 tw-pb-1",
                        onPointerDownCapture: (O) => {
                          const K = O.target instanceof HTMLElement ? O.target : void 0;
                          K != null && K.closest("button") && (It.current = !0, requestAnimationFrame(() => {
                            It.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ r(
                          _r,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? yr,
                            handleSubmit: y,
                            localizedBookNames: l,
                            localizedStrings: x,
                            getEndVerse: N,
                            triggerVariant: "ghost",
                            onOpenChange: (O) => {
                              Vt.current = O;
                            },
                            onCloseAutoFocus: (O) => {
                              var K;
                              O.preventDefault(), (K = Ot.current) == null || K.focus();
                            },
                            modal: !0,
                            className: "tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",
                            triggerContent: /* @__PURE__ */ p(st, { children: [
                              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Ce(g ?? yr, "id") }),
                              /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
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
        go,
        {
          value: t,
          onValueChange: mt,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: rt.map(({ value: O, label: K, scrRefSuffix: Z, id: At }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(er, { className: "tw-me-2", value: O, id: At }),
            /* @__PURE__ */ r(Et, { htmlFor: At, children: Rt(K, Z) })
          ] }, At))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { children: $ }),
      M
    ] }),
    c === "radio" && t === "range" && Ge,
    c === "dropdown" && kt && /* @__PURE__ */ r(
      Yr,
      {
        open: Cn === "selectedBooks",
        onOpenChange: (O) => {
          O || Fe(void 0);
        },
        children: /* @__PURE__ */ r(
          Zn,
          {
            ref: vr,
            onCloseAutoFocus: qe,
            onEscapeKeyDown: (O) => {
              an != null && an.querySelector('[data-state="open"]') && O.preventDefault();
            },
            children: /* @__PURE__ */ p(Nr, { container: an, children: [
              /* @__PURE__ */ r(Qn, { className: "tw-pe-8", children: /* @__PURE__ */ r(tr, { children: v }) }),
              M,
              /* @__PURE__ */ r(Xr, { children: /* @__PURE__ */ r(F, { onClick: () => Fe(void 0), children: X }) })
            ] })
          }
        )
      }
    ),
    c === "dropdown" && St && /* @__PURE__ */ r(
      Yr,
      {
        open: Cn === "range",
        onOpenChange: (O) => {
          O || Fe(void 0);
        },
        children: /* @__PURE__ */ r(
          Zn,
          {
            ref: br,
            onCloseAutoFocus: qe,
            onEscapeKeyDown: (O) => {
              ze != null && ze.querySelector('[data-state="open"]') && O.preventDefault();
            },
            children: /* @__PURE__ */ p(Nr, { container: ze, children: [
              /* @__PURE__ */ r(Qn, { className: "tw-pe-8", children: /* @__PURE__ */ r(tr, { children: A }) }),
              Ge,
              /* @__PURE__ */ r(Xr, { children: /* @__PURE__ */ r(F, { ref: Gt, onClick: () => Fe(void 0), children: X }) })
            ] })
          }
        )
      }
    )
  ] });
}
const jr = {
  [at("undefined")]: "Ø",
  [at(0)]: "A",
  [at(1)]: "B",
  [at(2)]: "C",
  [at(3)]: "D",
  [at(4)]: "E",
  [at(5)]: "F",
  [at(6)]: "G",
  [at(7)]: "H",
  [at(8)]: "I",
  [at(9)]: "J",
  [at(10)]: "K",
  [at(11)]: "L",
  [at(12)]: "M",
  [at(13)]: "N",
  [at(14)]: "O",
  [at(15)]: "P",
  [at(16)]: "Q",
  [at(17)]: "R",
  [at(18)]: "S",
  [at(19)]: "T",
  [at(20)]: "U",
  [at(21)]: "V",
  [at(22)]: "W",
  [at(23)]: "X",
  [at(24)]: "Y",
  [at(25)]: "Z"
};
function Nm({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...jr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, w]) => [
          c,
          c === w && c in jr ? jr[c] : w
        ]
      )
    )
  }, d = Ct();
  return /* @__PURE__ */ p(
    mn,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Qe, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          fn,
          {
            placeholder: l[at(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          tn,
          {
            id: i,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: xn },
            children: t.map((c) => /* @__PURE__ */ r(te, { value: `${c}`, children: l[at(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function km({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function _m({
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
function Cm({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(un, {}) : ""
  ] });
}
function Ys(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function ir({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Xs = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ p(qt, { children: [
  /* @__PURE__ */ r(Ht, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    We,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(ir, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(ir, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(ow, { children: [
    /* @__PURE__ */ r(Os, { children: l.label }),
    /* @__PURE__ */ r(rw, { children: /* @__PURE__ */ r(Ms, { children: Xs(
      t,
      e,
      Ys(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(jt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function ao({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(be, { variant: s, children: [
    /* @__PURE__ */ r(De, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Fi, {}) }) }),
    /* @__PURE__ */ r(ie, { align: "start", style: { zIndex: xn }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, w) => /* @__PURE__ */ p(io, { children: [
      /* @__PURE__ */ r(Ds, { children: /* @__PURE__ */ r($t, { children: Xs(e.groups, e.items, d, t) }) }),
      c < w.length - 1 && /* @__PURE__ */ r(Oe, {})
    ] }, d)) })
  ] });
}
const Ws = b.forwardRef(
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
function Em({
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
  return /* @__PURE__ */ p(Ws, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      ao,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(zi, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        ao,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Ki, {}),
          className: "tw-h-full"
        }
      ),
      d
    ] })
  ] });
}
function Tm({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Ws, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    ao,
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
const Js = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Xt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Js.displayName = Xt.List.displayName;
const Zs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Zs.displayName = Xt.List.displayName;
const Mp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Qs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Content,
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
Qs.displayName = Xt.Content.displayName;
function Sm({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ p("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Io,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(Js, { children: [
      /* @__PURE__ */ r(Zs, { children: t.map((l) => /* @__PURE__ */ r(Mp, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Qs, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Ap({ ...t }) {
  return /* @__PURE__ */ r(gt.Menu, { ...t });
}
function Pp({ ...t }) {
  return /* @__PURE__ */ r(gt.Sub, { "data-slot": "menubar-sub", ...t });
}
const ti = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(To.Provider, { value: a, children: /* @__PURE__ */ r(
    gt.Root,
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
ti.displayName = gt.Root.displayName;
const ei = b.forwardRef(({ className: t, ...e }, n) => {
  const o = de();
  return /* @__PURE__ */ r(
    gt.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ae({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ei.displayName = gt.Trigger.displayName;
const ni = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = de();
  return /* @__PURE__ */ p(
    gt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(dn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ni.displayName = gt.SubTrigger.displayName;
const ri = b.forwardRef(({ className: t, ...e }, n) => {
  const o = de();
  return /* @__PURE__ */ r(
    gt.SubContent,
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
ri.displayName = gt.SubContent.displayName;
const oi = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = de();
  return /* @__PURE__ */ r(gt.Portal, { children: /* @__PURE__ */ r(
    gt.Content,
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
oi.displayName = gt.Content.displayName;
const ai = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = de();
  return /* @__PURE__ */ r(
    gt.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Ae({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ai.displayName = gt.Item.displayName;
const $p = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = de();
  return /* @__PURE__ */ p(
    gt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(gt.ItemIndicator, { children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
$p.displayName = gt.CheckboxItem.displayName;
const jp = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = de();
  return /* @__PURE__ */ p(
    gt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ae({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(gt.ItemIndicator, { children: /* @__PURE__ */ r(cr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
jp.displayName = gt.RadioItem.displayName;
const Lp = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  gt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Lp.displayName = gt.Label.displayName;
const si = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  gt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
si.displayName = gt.Separator.displayName;
const Rn = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ii = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, w) => c.order - w.order).map((c) => /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        ai,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(ir, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(ir, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ p(Pp, { children: [
        /* @__PURE__ */ r(ni, { children: c.label }),
        /* @__PURE__ */ r(ri, { children: ii(
          t,
          e,
          Ys(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(jt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && i < a.length - 1 && d.push(/* @__PURE__ */ r(si, {}, `separator-${s}`)), d;
  });
};
function Vp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), s = H(void 0), i = H(void 0), l = H(void 0), d = H(void 0), c = (w) => {
    switch (w) {
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
  if (cc(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, m) => {
    var g, y, x, N;
    w.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        Rn(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Rn(s, [f, u]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), Rn(i, [f, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), Rn(l, [f, u]);
        break;
      case "alt+h":
        (N = d.current) == null || N.focus(), Rn(d, [f, u]);
        break;
    }
  }), J(() => {
    if (!n || !a.current) return;
    const w = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const y = g.target.getAttribute("data-state");
          n(y === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      w.observe(u, { attributes: !0 });
    }), () => w.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(ti, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, m]) => typeof w == "boolean" || typeof m == "boolean" ? 0 : w.order - m.order).map(([w, m]) => /* @__PURE__ */ p(Ap, { children: [
      /* @__PURE__ */ r(ei, { ref: c(w), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        oi,
        {
          style: { zIndex: xn },
          children: /* @__PURE__ */ r($t, { children: ii(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function Rm(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Im({
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
  const w = H(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", o),
      ref: w,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    Vp,
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
const Bp = (t, e) => t[e] ?? e;
function Dm({
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
  const c = Bp(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, m] = D(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((y) => y !== g)]), s && n.find((y) => y === g) && s([...n.filter((y) => y !== g)]), m(!1);
  }, u = (g, y) => {
    var N, R, I, S, V, _;
    const x = y !== g ? ((R = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : R[y]) ?? ((S = (I = t[g]) == null ? void 0 : I.uiNames) == null ? void 0 : S.en) : void 0;
    return x ? `${(V = t[g]) == null ? void 0 : V.autonym} (${x})` : (_ = t[g]) == null ? void 0 : _.autonym;
  };
  return /* @__PURE__ */ p("div", { id: d, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      mn,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: w,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(Qe, { children: /* @__PURE__ */ r(fn, {}) }),
          /* @__PURE__ */ r(
            tn,
            {
              style: { zIndex: xn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(te, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(Et, { className: "tw-font-normal tw-text-muted-foreground", children: Xe(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Gp({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Et, { children: e(t) }) : n ? /* @__PURE__ */ r(Et, { children: n(t) }) : /* @__PURE__ */ r(Et, { children: t });
}
function Om({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ p("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Ro,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => a(l, d)
      }
    ),
    /* @__PURE__ */ r(
      Gp,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Mm({
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
  additionalContent: w,
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
        s
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && l,
            !e && d && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: d }),
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(De, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r($o, {}) }) }),
              /* @__PURE__ */ r(ie, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(De, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r($o, {}) }) }),
              /* @__PURE__ */ r(ie, { align: "end", children: c })
            ] })
          ] }),
          w && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: w })
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
const Fp = Bn(({ className: t, ...e }, n) => /* @__PURE__ */ r(qi, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
Fp.displayName = "Spinner";
function Am({
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
  value: w,
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      Et,
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
      kn,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: h(d, { "tw-border-red-600": n }),
        defaultValue: c,
        value: w,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const zp = Be(
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
), Kp = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      zp({ variant: e }),
      t
    ),
    ...n
  }
));
Kp.displayName = "Alert";
const qp = b.forwardRef(
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
qp.displayName = "AlertTitle";
const Hp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Hp.displayName = "AlertDescription";
const Pm = bt.Root, $m = bt.Trigger, jm = bt.Group, Lm = bt.Portal, Vm = bt.Sub, Bm = bt.RadioGroup, Up = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  bt.SubTrigger,
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
      /* @__PURE__ */ r(dn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Up.displayName = bt.SubTrigger.displayName;
const Yp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  bt.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Yp.displayName = bt.SubContent.displayName;
const Xp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(bt.Portal, { children: /* @__PURE__ */ r(
  bt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
Xp.displayName = bt.Content.displayName;
const Wp = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  bt.Item,
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
Wp.displayName = bt.Item.displayName;
const Jp = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  bt.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(bt.ItemIndicator, { children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Jp.displayName = bt.CheckboxItem.displayName;
const Zp = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  bt.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(bt.ItemIndicator, { children: /* @__PURE__ */ r(cr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Zp.displayName = bt.RadioItem.displayName;
const Qp = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  bt.Label,
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
Qp.displayName = bt.Label.displayName;
const tu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  bt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
tu.displayName = bt.Separator.displayName;
function eu({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
eu.displayName = "ContextMenuShortcut";
const li = b.createContext({
  direction: "bottom"
});
function nu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(li.Provider, { value: o, children: /* @__PURE__ */ r(
    le.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
nu.displayName = "Drawer";
const Gm = le.Trigger, ru = le.Portal, Fm = le.Close, ci = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  le.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
ci.displayName = le.Overlay.displayName;
const ou = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(li), i = {
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
  return /* @__PURE__ */ p(ru, { children: [
    /* @__PURE__ */ r(ci, {}),
    /* @__PURE__ */ p(
      le.Content,
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
ou.displayName = "DrawerContent";
function au({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
au.displayName = "DrawerHeader";
function su({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
su.displayName = "DrawerFooter";
const iu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  le.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
iu.displayName = le.Title.displayName;
const lu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  le.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
lu.displayName = le.Description.displayName;
const cu = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Hr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Hr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
cu.displayName = Hr.Root.displayName;
function zm({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    uo.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Km = uo.Panel;
function qm({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    uo.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(Hi, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Hm({ ...t }) {
  return /* @__PURE__ */ r(
    dc,
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
const du = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ p(
    In.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(In.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(In.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(In.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
du.displayName = In.Root.displayName;
const wu = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Ur.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Ur.Thumb,
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
wu.displayName = Ur.Root.displayName;
const Um = Xt.Root, pu = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Xt.List,
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
pu.displayName = Xt.List.displayName;
const uu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
uu.displayName = Xt.Trigger.displayName;
const mu = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
mu.displayName = Xt.Content.displayName;
const fu = b.forwardRef(
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
fu.displayName = "Textarea";
const Ym = (t, e) => {
  J(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function hu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const gu = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = hu(a.current);
  const [s, i] = D(() => o.current), [l, d] = D(!0);
  return J(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const w = await t();
        c && (i(() => w), d(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, l];
}, Lr = () => !1, Xm = (t, e) => {
  const [n] = gu(
    G(async () => {
      if (!t) return Lr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Lr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  J(() => () => {
    n !== Lr && n();
  }, [n]);
};
function Wm(t) {
  J(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function bu(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
bu(`*, ::before, ::after {
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
  Kp as Alert,
  Hp as AlertDescription,
  qp as AlertTitle,
  Rs as Avatar,
  Is as AvatarFallback,
  nw as AvatarImage,
  Hu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Uu as BOOK_SELECTOR_STRING_KEYS,
  ge as Badge,
  _r as BookChapterControl,
  Jr as BookSelectionMode,
  Yu as BookSelector,
  F as Button,
  Wu as COMMENT_EDITOR_STRING_KEYS,
  Ju as COMMENT_LIST_STRING_KEYS,
  Ts as Card,
  Ss as CardContent,
  tw as CardDescription,
  ew as CardFooter,
  Zd as CardHeader,
  Qd as CardTitle,
  Tc as ChapterRangeSelector,
  Ro as Checkbox,
  Om as Checklist,
  Wr as ComboBox,
  ve as Command,
  yn as CommandEmpty,
  ne as CommandGroup,
  nn as CommandInput,
  oe as CommandItem,
  xe as CommandList,
  Xu as CommentEditor,
  Zu as CommentList,
  Pm as ContextMenu,
  Jp as ContextMenuCheckboxItem,
  Xp as ContextMenuContent,
  jm as ContextMenuGroup,
  Wp as ContextMenuItem,
  Qp as ContextMenuLabel,
  Lm as ContextMenuPortal,
  Bm as ContextMenuRadioGroup,
  Zp as ContextMenuRadioItem,
  tu as ContextMenuSeparator,
  eu as ContextMenuShortcut,
  Vm as ContextMenuSub,
  Yp as ContextMenuSubContent,
  Up as ContextMenuSubTrigger,
  $m as ContextMenuTrigger,
  xw as DataTable,
  Yr as Dialog,
  Ku as DialogClose,
  Zn as DialogContent,
  hc as DialogDescription,
  Xr as DialogFooter,
  Qn as DialogHeader,
  Ua as DialogOverlay,
  fc as DialogPortal,
  tr as DialogTitle,
  zu as DialogTrigger,
  nu as Drawer,
  Fm as DrawerClose,
  ou as DrawerContent,
  lu as DrawerDescription,
  su as DrawerFooter,
  au as DrawerHeader,
  ci as DrawerOverlay,
  ru as DrawerPortal,
  iu as DrawerTitle,
  Gm as DrawerTrigger,
  be as DropdownMenu,
  ee as DropdownMenuCheckboxItem,
  ie as DropdownMenuContent,
  Ds as DropdownMenuGroup,
  We as DropdownMenuItem,
  kw as DropdownMenuItemType,
  Ve as DropdownMenuLabel,
  rw as DropdownMenuPortal,
  aw as DropdownMenuRadioGroup,
  As as DropdownMenuRadioItem,
  Oe as DropdownMenuSeparator,
  sw as DropdownMenuShortcut,
  ow as DropdownMenuSub,
  Ms as DropdownMenuSubContent,
  Os as DropdownMenuSubTrigger,
  De as DropdownMenuTrigger,
  yw as ERROR_DUMP_STRING_KEYS,
  tm as ERROR_POPOVER_STRING_KEYS,
  Sw as EditorKeyboardShortcuts,
  Nw as ErrorDump,
  em as ErrorPopover,
  im as FOOTNOTE_EDITOR_STRING_KEYS,
  am as Filter,
  nm as FilterDropdown,
  om as Footer,
  sm as FootnoteEditor,
  zw as FootnoteItem,
  lm as FootnoteList,
  fm as INVENTORY_STRING_KEYS,
  kn as Input,
  hm as Inventory,
  Et as Label,
  Aw as MARKER_MENU_STRING_KEYS,
  Qu as MarkdownRenderer,
  $w as MarkerMenu,
  rm as MoreInfo,
  Cw as MultiSelectComboBox,
  Sm as NavigationContentSearch,
  ye as Popover,
  bc as PopoverAnchor,
  ce as PopoverContent,
  Nr as PopoverPortalContainerProvider,
  Me as PopoverTrigger,
  cu as Progress,
  gm as ProjectSelector,
  go as RadioGroup,
  er as RadioGroupItem,
  vc as RecentSearches,
  qm as ResizableHandle,
  Km as ResizablePanel,
  zm as ResizablePanelGroup,
  Mm as ResultsCard,
  xm as SCOPE_SELECTOR_STRING_KEYS,
  ym as ScopeSelector,
  vm as ScriptureResultsViewer,
  Nm as ScrollGroupSelector,
  Io as SearchBar,
  mn as Select,
  tn as SelectContent,
  cw as SelectGroup,
  te as SelectItem,
  ww as SelectLabel,
  $s as SelectScrollDownButton,
  Ps as SelectScrollUpButton,
  pw as SelectSeparator,
  Qe as SelectTrigger,
  fn as SelectValue,
  un as Separator,
  km as SettingsList,
  Cm as SettingsListHeader,
  _m as SettingsListItem,
  Np as SettingsSidebar,
  bm as SettingsSidebarContentSearch,
  Bs as Sidebar,
  Fs as SidebarContent,
  pp as SidebarFooter,
  no as SidebarGroup,
  mp as SidebarGroupAction,
  oo as SidebarGroupContent,
  ro as SidebarGroupLabel,
  wp as SidebarHeader,
  dp as SidebarInput,
  Gs as SidebarInset,
  zs as SidebarMenu,
  hp as SidebarMenuAction,
  gp as SidebarMenuBadge,
  qs as SidebarMenuButton,
  Ks as SidebarMenuItem,
  bp as SidebarMenuSkeleton,
  vp as SidebarMenuSub,
  yp as SidebarMenuSubButton,
  xp as SidebarMenuSubItem,
  Vs as SidebarProvider,
  cp as SidebarRail,
  up as SidebarSeparator,
  lp as SidebarTrigger,
  eo as Skeleton,
  du as Slider,
  Hm as Sonner,
  Fp as Spinner,
  wu as Switch,
  ao as TabDropdownMenu,
  Tm as TabFloatingMenu,
  Em as TabToolbar,
  ur as Table,
  fr as TableBody,
  vw as TableCaption,
  Je as TableCell,
  fw as TableFooter,
  Ln as TableHead,
  mr as TableHeader,
  _e as TableRow,
  Um as Tabs,
  mu as TabsContent,
  pu as TabsList,
  uu as TabsTrigger,
  Am as TextField,
  fu as Textarea,
  _o as ToggleGroup,
  An as ToggleGroupItem,
  Im as Toolbar,
  qt as Tooltip,
  jt as TooltipContent,
  $t as TooltipProvider,
  Ht as TooltipTrigger,
  Ew as UNDO_REDO_BUTTONS_STRING_KEYS,
  Dm as UiLanguageSelector,
  Tw as UndoRedoButtons,
  Js as VerticalTabs,
  Qs as VerticalTabsContent,
  Zs as VerticalTabsList,
  Mp as VerticalTabsTrigger,
  xn as Z_INDEX_ABOVE_DOCK,
  Ha as Z_INDEX_FOOTNOTE_EDITOR,
  uc as Z_INDEX_MODAL,
  pc as Z_INDEX_MODAL_BACKDROP,
  mo as Z_INDEX_OVERLAY,
  Jd as badgeVariants,
  Za as buttonVariants,
  h as cn,
  Ar as computeRows,
  mm as getBookIdFromUSFM,
  hr as getInventoryHeader,
  pm as getLinesFromUSFM,
  um as getNumberFromUSFM,
  Yw as getStatusForItem,
  Rm as getToolbarOSReservedSpaceClassName,
  dm as inventoryCountColumn,
  cm as inventoryItemColumn,
  wm as inventoryStatusColumn,
  Zw as partitionAndSort,
  Vn as scrollGroupLetter,
  dw as selectTriggerVariants,
  Qm as sonner,
  Ym as useEvent,
  Xm as useEventAsync,
  Wd as useListbox,
  gu as usePromise,
  qu as useRecentSearches,
  gr as useSidebar,
  Wm as useStylesheet
};
//# sourceMappingURL=index.js.map
