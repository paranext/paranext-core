var Ys = Object.defineProperty;
var Xs = (t, e, n) => e in t ? Ys(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Bt = (t, e, n) => Xs(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as dt } from "react/jsx-runtime";
import b, { forwardRef as An, useRef as H, useMemo as q, useState as S, useCallback as j, useEffect as J, useLayoutEffect as Xt, createContext as er, useContext as Zr, Component as Ws, createElement as xo, Suspense as Js, Fragment as Qo } from "react";
import { Command as Ut } from "cmdk";
import { X as dn, Search as ta, Check as Qt, Clock as yo, ChevronsLeft as No, ChevronsRight as ko, ChevronLeft as Mr, ChevronRight as rn, ArrowLeft as Zs, ArrowRight as Qs, Circle as nr, ChevronDown as Se, BoldIcon as ti, ItalicIcon as ei, AtSign as ea, Pencil as ni, Trash2 as ri, ArrowUp as na, MoreHorizontal as oi, MailOpen as ai, Mail as si, ChevronUp as ra, FilterIcon as ii, ArrowLeftIcon as li, ChevronLeftIcon as ci, ChevronRightIcon as wi, ArrowRightIcon as di, Copy as oa, Filter as pi, User as ui, Link as mi, CircleHelp as fi, ChevronsUpDown as aa, Star as hi, Undo as gi, Redo as bi, SquareX as sa, FunctionSquare as ia, SquareSigma as la, Ban as vi, AlertCircle as Or, CircleCheckIcon as xi, CircleXIcon as yi, CircleHelpIcon as Ni, ArrowUpIcon as ki, ArrowDownIcon as _i, PanelLeft as Ci, PanelRight as Ei, ScrollText as Ti, MenuIcon as Ri, Menu as Si, EllipsisVertical as Di, MoreVertical as _o, LoaderCircle as Mi, GripVertical as Oi } from "lucide-react";
import { clsx as Ii } from "clsx";
import { extendTailwindMerge as Ai } from "tailwind-merge";
import * as Wt from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as Vn, Section as Q, getChaptersForBook as Pi, formatScrRef as ge, getSectionForBook as Cn, formatRelativeDate as $i, formatReplacementString as qe, sanitizeHtml as Vi, NumberFormat as Li, formatBytes as ji, getCurrentLocale as Fi, usfmMarkers as zn, getFormatCallerFunction as Bi, deepEqual as zi, isString as Co, compareScrRefs as Ir, scrRefToBBBCCCVVV as mr, defaultScrRef as fr, formatScrRefRange as Ki, getLocalizeKeyForScrollGroupId as at } from "platform-bible-utils";
import { Slot as pn } from "@radix-ui/react-slot";
import { cva as Pe } from "class-variance-authority";
import * as on from "@radix-ui/react-popover";
import * as ca from "@radix-ui/react-label";
import * as Dn from "@radix-ui/react-radio-group";
import { createEditor as wa, $getRoot as De, $createParagraphNode as rr, $getSelection as ne, HISTORY_MERGE_TAG as Qr, ParagraphNode as da, TextNode as pa, $isTokenOrSegmented as Gi, $getCharacterOffsets as qi, $cloneWithPropertiesEphemeral as Hi, $findMatchingParent as ua, $isElementNode as Te, $isRangeSelection as Ye, CLEAR_EDITOR_COMMAND as ma, COMMAND_PRIORITY_EDITOR as fa, mergeRegister as Me, shallowMergeConfig as Ui, defineExtension as pe, safeCast as Pn, createState as Yi, FORMAT_TEXT_COMMAND as ha, $isNodeSelection as ga, COMMAND_PRIORITY_LOW as ba, RootNode as Xi, LineBreakNode as Wi, TabNode as Ji, $isEditorState as Zi, createCommand as Qi, CLICK_COMMAND as tl, isDOMNode as el, $getNodeFromDOMNode as nl, $createNodeSelection as rl, $setSelection as ol, DecoratorNode as Ar, $getState as al, toggleTextFormatType as Eo, TEXT_TYPE_TO_FORMAT as sl, $setState as il, addClassNamesToElement as va, $create as ll, $getNodeByKey as cl, removeClassNamesFromElement as wl, KEY_TAB_COMMAND as dl, $isBlockElementNode as Hn, $createRangeSelection as pl, $normalizeSelection__EXPERIMENTAL as ul, OUTDENT_CONTENT_COMMAND as ml, INDENT_CONTENT_COMMAND as To, INSERT_TAB_COMMAND as fl, COMMAND_PRIORITY_CRITICAL as to, $isDecoratorNode as hl, $isParagraphNode as gl, $isTextNode as Un, SELECTION_CHANGE_COMMAND as xa, getRegisteredNode as bl, isHTMLElement as vl, isDocumentFragment as Ro, isDOMDocumentNode as xl, ArtificialNode__DO_NOT_USE as ya, $createLineBreakNode as Na, $isRootOrShadowRoot as yl, isBlockDomNode as So, isInlineDomNode as Do, $insertNodes as Nl } from "lexical";
import * as Xe from "@radix-ui/react-tooltip";
import { TooltipTrigger as kl } from "@radix-ui/react-tooltip";
import { HeadingNode as _l, QuoteNode as Cl, registerRichText as El } from "@lexical/rich-text";
import { flushSync as Tl, createPortal as Rl } from "react-dom";
import { $isTableSelection as Sl } from "@lexical/table";
import * as or from "@radix-ui/react-toggle-group";
import * as ka from "@radix-ui/react-toggle";
import { createHeadlessEditor as _a } from "@lexical/headless";
import * as Ca from "@radix-ui/react-separator";
import * as un from "@radix-ui/react-avatar";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Dl } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Ea, getFilteredRowModel as Ml, getSortedRowModel as Ta, getPaginationRowModel as Ol, getCoreRowModel as Ra, flexRender as En, getGroupedRowModel as Il, getExpandedRowModel as Al } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import Pl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Pr, HIDDEN_NOTE_CALLER as $r, getDefaultViewOptions as $l, isInsertEmbedOpOfType as Ln, Editorial as Vl } from "@eten-tech-foundation/platform-editor";
import * as Vr from "@radix-ui/react-checkbox";
import * as Yt from "@radix-ui/react-tabs";
import * as gt from "@radix-ui/react-menubar";
import { useHotkeys as Ll } from "react-hotkeys-hook";
import * as bt from "@radix-ui/react-context-menu";
import { Drawer as oe } from "vaul";
import * as Lr from "@radix-ui/react-progress";
import * as eo from "react-resizable-panels";
import { Toaster as jl } from "sonner";
import { toast as wm } from "sonner";
import * as _n from "@radix-ui/react-slider";
import * as jr from "@radix-ui/react-switch";
const Fl = Ai({ prefix: "tw-" });
function m(...t) {
  return Fl(Ii(t));
}
const mn = 250, Sa = 300, Bl = 400, zl = 450, Kl = 500, Gl = "layoutDirection";
function Ct() {
  const t = localStorage.getItem(Gl);
  return t === "rtl" ? t : "ltr";
}
const Fr = Wt.Root, eu = Wt.Trigger, ql = Wt.Portal, nu = Wt.Close, Da = b.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  Wt.Overlay,
  {
    ref: o,
    className: m(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: zl, ...e },
    ...n
  }
));
Da.displayName = Wt.Overlay.displayName;
const Yn = b.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = Ct();
  return /* @__PURE__ */ p(ql, { children: [
    /* @__PURE__ */ r(Da, { className: n }),
    /* @__PURE__ */ p(
      Wt.Content,
      {
        ref: s,
        className: m(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: Kl, ...o },
        ...a,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ p(
            Wt.Close,
            {
              className: m(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": i === "ltr" },
                { "tw-left-4": i === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(dn, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Yn.displayName = Wt.Content.displayName;
function Xn({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        t
      ),
      ...e
    }
  );
}
Xn.displayName = "DialogHeader";
function Br({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",
        t
      ),
      ...e
    }
  );
}
Br.displayName = "DialogFooter";
const Wn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Wn.displayName = Wt.Title.displayName;
const Hl = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Wt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Hl.displayName = Wt.Description.displayName;
const ve = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ut,
  {
    ref: n,
    className: m(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ve.displayName = Ut.displayName;
const fn = b.forwardRef(({ className: t, onKeyDown: e, ...n }, o) => {
  const a = Ct(), s = b.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), w = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (i.preventDefault(), i.stopPropagation(), w.click());
    },
    [e]
  );
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(ta, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Ut.Input,
      {
        ref: o,
        className: m(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        onKeyDown: s,
        ...n
      }
    )
  ] });
});
fn.displayName = Ut.Input.displayName;
const xe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ut.List,
  {
    ref: n,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
xe.displayName = Ut.List.displayName;
const $n = b.forwardRef((t, e) => /* @__PURE__ */ r(Ut.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
$n.displayName = Ut.Empty.displayName;
const re = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ut.Group,
  {
    ref: n,
    className: m(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
re.displayName = Ut.Group.displayName;
const no = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ut.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
no.displayName = Ut.Separator.displayName;
const ae = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ut.Item,
  {
    ref: n,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
ae.displayName = Ut.Item.displayName;
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Ma.displayName = "CommandShortcut";
const Oa = (t, e, n, o, a) => {
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
}, Ul = (t, e, n, o, a) => {
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
function Ee(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function ro(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Ia = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), te = Object.fromEntries(
  Ia.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function oo(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = wt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(Vn(a.toLowerCase(), o) || Vn(t.toLowerCase(), o) || (s ? Vn(s.localizedName.toLowerCase(), o) || Vn(s.localizedId.toLowerCase(), o) : !1));
}
const Aa = An(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: w,
    disabled: c = !1
  }, d) => {
    const f = H(!1), h = () => {
      c || (f.current || n == null || n(t), setTimeout(() => {
        f.current = !1;
      }, 100));
    }, u = (v) => {
      if (c) {
        v.preventDefault();
        return;
      }
      f.current = !0, o ? o(v) : n == null || n(t);
    }, g = q(
      () => Ee(t, l),
      [t, l]
    ), N = q(
      () => ro(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Q.OT,
            "tw-border-s-purple-200": a === Q.NT,
            "tw-border-s-indigo-200": a === Q.DC,
            "tw-border-s-amber-200": a === Q.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          ae,
          {
            ref: d,
            value: w || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: u,
            role: "option",
            "aria-selected": e,
            "aria-disabled": c || void 0,
            "aria-label": `${wt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            disabled: c,
            className: m(s, c && "tw-cursor-not-allowed tw-opacity-50"),
            children: [
              i && /* @__PURE__ */ r(
                Qt,
                {
                  className: m(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: g }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: N })
            ]
          }
        )
      }
    );
  }
), Pa = Pe(
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
), G = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? pn : "button", { className: m(Pa({ variant: e, size: n, className: t })), ref: s, ...a })
);
G.displayName = "Button";
const ye = on.Root, $e = on.Trigger, Yl = on.Anchor, $a = b.createContext(null);
function hr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r($a.Provider, { value: t, children: e });
}
const ue = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = Ct(), l = b.useContext($a);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(on.Portal, { container: l ?? void 0, children: /* @__PURE__ */ r(
      on.Content,
      {
        ref: s,
        align: e,
        sideOffset: n,
        className: m(
          "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
          t
        ),
        style: { zIndex: mn, ...o },
        ...a,
        dir: i
      }
    ) })
  );
});
ue.displayName = on.Content.displayName;
function Va(t, e, n) {
  return `${t} ${te[t]}${e ? ` ${ro(t, e)} ${Ee(t, e)}` : ""}`;
}
function Xl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l,
  buttonClassName: w = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost"
}) {
  const [d, f] = S(!1);
  if (t.length === 0)
    return;
  const h = (u) => {
    e(u), f(!1);
  };
  return /* @__PURE__ */ p(ye, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
      G,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ r(yo, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(ue, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: /* @__PURE__ */ r(re, { heading: s, children: t.map((u) => /* @__PURE__ */ p(
      ae,
      {
        onSelect: () => h(u),
        className: m("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(yo, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function ru(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Kn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Wl = [
  Kn.BOOK_ONLY,
  Kn.BOOK_CHAPTER,
  Kn.BOOK_CHAPTER_VERSE
];
function Jl(t) {
  return Kn.BOOK_CHAPTER_VERSE.test(t.trim());
}
function Mo(t, e) {
  return wt.bookIdToNumber(t) < wt.bookIdToNumber(e.book);
}
function Zl(t, e, n) {
  const o = wt.bookIdToNumber(t) - wt.bookIdToNumber(n.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < n.chapterNum;
}
function gr(t, e, n, o) {
  const a = wt.bookIdToNumber(t) - wt.bookIdToNumber(o.book);
  return a < 0 ? !0 : a > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : n < o.verseNum;
}
function Oo(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function ce(t) {
  return Pi(wt.bookIdToNumber(t));
}
function Ql(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Wl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, w = void 0, c = void 0] = i.slice(1);
        let d;
        const f = e.filter((h) => oo(h, l, n));
        if (f.length === 1 && ([d] = f), !d && w) {
          if (wt.isBookIdValid(l)) {
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
        if (!d && w) {
          const u = ((g) => Object.keys(te).find(
            (N) => te[N].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, N]) => N.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let h = w ? parseInt(w, 10) : void 0;
          h && h > ce(d) && (h = Math.max(ce(d), 1));
          const u = c ? parseInt(c, 10) : void 0;
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
function tc(t, e, n, o) {
  const a = j(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w > 0) {
        const c = e[w - 1], d = Math.max(ce(c), 1);
        o({
          book: c,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = j(() => {
    const w = ce(t.book);
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
  }, [t, e, o]), i = j(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = j(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return q(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? No : ko
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Mr : rn
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? rn : Mr
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === ce(t.book) || ce(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? ko : No
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
function Io({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  isChapterDisabled: s,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: ce(t) }, (l, w) => w + 1).map((l) => {
      const w = (s == null ? void 0 : s(l)) ?? !1;
      return /* @__PURE__ */ r(
        ae,
        {
          value: `${t} ${te[t] || ""} ${l}`,
          onSelect: () => {
            w || n(l);
          },
          ref: o(l),
          disabled: w,
          "aria-disabled": w || void 0,
          className: m(
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
              "tw-bg-muted/50 tw-text-muted-foreground/50": ((a == null ? void 0 : a(l)) ?? !1) && !w
            },
            w && "tw-cursor-not-allowed tw-opacity-40"
          ),
          children: l
        },
        l
      );
    }) }) });
}
function Ao({
  bookId: t,
  chapterNum: e,
  endVerse: n,
  scrRef: o,
  onVerseSelect: a,
  setVerseRef: s,
  isVerseDimmed: i,
  isVerseDisabled: l,
  className: w
}) {
  if (!(!t || n <= 0))
    return /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", w), children: Array.from({ length: n }, (c, d) => d + 1).map((c) => {
      const d = (l == null ? void 0 : l(c)) ?? !1;
      return /* @__PURE__ */ r(
        ae,
        {
          value: `${t} ${te[t] || ""} ${e}:${c}`,
          onSelect: () => {
            d || a(c);
          },
          ref: s(c),
          disabled: d,
          "aria-disabled": d || void 0,
          className: m(
            // See chapter-grid — no fixed width, min-w-0, and px-0 override
            // so multi-digit verse numbers fit when the popover is narrow.
            "tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",
            {
              "tw-bg-primary tw-text-primary-foreground": t === o.book && e === o.chapterNum && c === o.verseNum
            },
            {
              "tw-bg-muted/50 tw-text-muted-foreground/50": ((i == null ? void 0 : i(c)) ?? !1) && !d
            },
            d && "tw-cursor-not-allowed tw-opacity-40"
          ),
          children: c
        },
        c
      );
    }) }) });
}
function br({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: w,
  getEndVerse: c,
  disableReferencesUpTo: d,
  submitKeys: f,
  triggerContent: h,
  triggerVariant: u = "outline",
  onOpenChange: g,
  onCloseAutoFocus: N,
  modal: v = !1,
  align: k = "center"
}) {
  const _ = Ct(), [E, C] = S(!1), [B, F] = S(""), [A, I] = S(""), [y, M] = S("books"), [$, V] = S(void 0), [D, P] = S(
    void 0
  ), [Y, X] = S(void 0), [et, Tt] = S(!1), $t = H(null), St = H(!1), rt = H(void 0), vt = H(void 0), K = H(void 0), st = H(void 0), lt = H({}), pt = H({}), ut = j(
    (x) => {
      e(x), l && l(x);
    },
    [e, l]
  ), Dt = q(() => o ? o() : Ia, [o]), Ot = q(() => ({
    [Q.OT]: Dt.filter((U) => wt.isBookOT(U)),
    [Q.NT]: Dt.filter((U) => wt.isBookNT(U)),
    [Q.DC]: Dt.filter((U) => wt.isBookDC(U)),
    [Q.Extra]: Dt.filter((U) => wt.extraBooks().includes(U))
  }), [Dt]), Vt = q(() => Object.values(Ot).flat(), [Ot]), ke = q(() => {
    if (!A.trim()) return Ot;
    const x = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((tt) => {
      x[tt] = Ot[tt].filter((Ft) => oo(Ft, A, a));
    }), x;
  }, [Ot, A, a]), O = q(
    () => Ql(A, Vt, a),
    [A, Vt, a]
  ), Lt = H(!1);
  J(() => {
    if (!Lt.current) {
      Lt.current = !0;
      return;
    }
    g == null || g(E);
  }, [E, g]);
  const Jt = j(() => {
    if (O) {
      const x = O.chapterNum ?? 1, U = O.verseNum ?? 1;
      if (d && gr(O.book, x, U, d))
        return;
      ut({
        book: O.book,
        chapterNum: x,
        verseNum: U
      }), C(!1), I(""), F("");
    }
  }, [ut, O, d]), jt = j(
    (x) => {
      const U = D ?? (O == null ? void 0 : O.book), tt = Y ?? (O == null ? void 0 : O.chapterNum);
      !U || !tt || (ut({
        book: U,
        chapterNum: tt,
        verseNum: x
      }), C(!1));
    },
    [ut, D, Y, O]
  ), L = j(
    (x) => {
      if (d && Mo(x, d)) return;
      if (ce(x) <= 1) {
        ut({
          book: x,
          chapterNum: 1,
          verseNum: 1
        }), C(!1), I("");
        return;
      }
      V(x), M("chapters");
    },
    [ut, d]
  ), W = j(
    (x) => {
      const U = y === "chapters" ? $ : O == null ? void 0 : O.book;
      if (U) {
        if (c && c(U, x) > 1) {
          P(U), X(x), M("verses"), F("");
          return;
        }
        ut({
          book: U,
          chapterNum: x,
          verseNum: 1
        }), C(!1);
      }
    },
    [ut, y, $, O, c]
  ), nt = j(
    (x) => {
      ut(x), C(!1), I("");
    },
    [ut]
  ), it = tc(t, Vt, _, e), mt = j(() => {
    M("books"), V(void 0), P(void 0), X(void 0), setTimeout(() => {
      vt.current && vt.current.focus();
    }, 0);
  }, []), ft = j(() => {
    const x = D;
    P(void 0), X(void 0), x ? (V(x), M("chapters"), F("")) : mt();
  }, [D, mt]), Mt = j((x) => {
    C(x), x && (M("books"), V(void 0), P(void 0), X(void 0), I(""));
  }, []), { otLong: Nt, ntLong: kt, dcLong: Rt, extraLong: R } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, _t = j(
    (x) => Oa(x, Nt, kt, Rt, R),
    [Nt, kt, Rt, R]
  ), xt = j(
    (x) => O ? !!O.chapterNum && !x.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), fe = q(
    () => ge(
      t,
      a ? Ee(t.book, a) : "English"
    ),
    [t, a]
  ), Ve = j((x) => (U) => {
    lt.current[x] = U;
  }, []), Ze = j((x) => (U) => {
    pt.current[x] = U;
  }, []), bn = q(
    () => Jl(A),
    [A]
  ), vn = q(() => !c || !O || !O.chapterNum || !bn ? !1 : c(O.book, O.chapterNum) > 0, [c, O, bn]), Le = j(
    (x) => d ? Mo(x, d) : !1,
    [d]
  ), xn = j(
    (x) => (U) => d ? Zl(x, U, d) : !1,
    [d]
  ), Qe = j(
    (x, U) => (tt) => d ? gr(x, U, tt, d) : !1,
    [d]
  ), yn = (s == null ? void 0 : s["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", je = (s == null ? void 0 : s["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", pr = j(
    (x) => {
      (x.key === "Home" || x.key === "End") && x.stopPropagation(), f && f.includes(x.key) && O && O.chapterNum !== void 0 && O.verseNum !== void 0 && (x.preventDefault(), x.stopPropagation(), Jt());
    },
    [f, O, Jt]
  ), tn = j(
    (x) => {
      var _e, Fe, Be;
      if (x.ctrlKey) return;
      const { isLetter: U, isDigit: tt } = Oo(x.key);
      if ((y === "chapters" || y === "verses") && (x.key === " " || x.key === "Enter")) {
        const It = x.target instanceof HTMLElement ? x.target : void 0;
        if (!!(It != null && It.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          x.stopPropagation();
          return;
        }
        const z = (_e = rt.current) == null ? void 0 : _e.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (z) {
          x.preventDefault(), x.stopPropagation(), z.click();
          return;
        }
      }
      if ((y === "chapters" || y === "verses") && (U || tt)) {
        x.preventDefault(), x.stopPropagation();
        return;
      }
      if (y === "chapters" && x.key === "Backspace") {
        x.preventDefault(), x.stopPropagation(), mt();
        return;
      }
      if (y === "verses" && x.key === "Backspace") {
        x.preventDefault(), x.stopPropagation(), ft();
        return;
      }
      const Ft = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(x.key);
      if (y === "verses" && Ft) {
        const It = D, T = Y;
        if (!It || !T || !c) return;
        const z = c(It, T);
        if (!z) return;
        (Fe = rt.current) == null || Fe.focus();
        const Z = (() => {
          if (!B) return 1;
          const ze = B.match(/:(\d+)$/);
          return ze ? parseInt(ze[1], 10) : 0;
        })();
        let At = Z;
        const ie = 6;
        switch (x.key) {
          case "ArrowLeft":
            Z !== 0 && (At = Z > 1 ? Z - 1 : z);
            break;
          case "ArrowRight":
            Z !== 0 && (At = Z < z ? Z + 1 : 1);
            break;
          case "ArrowUp":
            At = Z === 0 ? z : Math.max(1, Z - ie);
            break;
          case "ArrowDown":
            At = Z === 0 ? 1 : Math.min(z, Z + ie);
            break;
          default:
            return;
        }
        At !== Z && (x.preventDefault(), x.stopPropagation(), F(
          `${It} ${te[It] || ""} ${T}:${At}`
        ), setTimeout(() => {
          const ze = pt.current[At];
          ze && ze.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((y === "chapters" || y === "books" && O) && Ft) {
        const It = y === "chapters" ? $ : O == null ? void 0 : O.book;
        if (!It) return;
        y === "chapters" && ((Be = rt.current) == null || Be.focus());
        const T = (() => {
          if (!B) return 1;
          const ie = B.match(/(\d+)$/);
          return ie ? parseInt(ie[1], 10) : 0;
        })(), z = ce(It);
        if (!z) return;
        let Z = T;
        const At = 6;
        switch (x.key) {
          case "ArrowLeft":
            T !== 0 && (Z = T > 1 ? T - 1 : z);
            break;
          case "ArrowRight":
            T !== 0 && (Z = T < z ? T + 1 : 1);
            break;
          case "ArrowUp":
            Z = T === 0 ? z : Math.max(1, T - At);
            break;
          case "ArrowDown":
            Z = T === 0 ? 1 : Math.min(z, T + At);
            break;
          default:
            return;
        }
        Z !== T && (x.preventDefault(), x.stopPropagation(), F(
          `${It} ${te[It] || ""} ${Z}`
        ), setTimeout(() => {
          const ie = lt.current[Z];
          ie && ie.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      y,
      O,
      mt,
      ft,
      $,
      D,
      Y,
      c,
      B
    ]
  ), ur = j((x) => {
    var Ft;
    if (x.shiftKey || x.key === "Tab" || x.key === " ") return;
    if (x.key === "Enter") {
      x.stopPropagation();
      return;
    }
    if (x.key === "ArrowUp" || x.key === "ArrowDown") {
      (Ft = vt.current) == null || Ft.focus();
      return;
    }
    const { isLetter: U, isDigit: tt } = Oo(x.key);
    (U || tt) && (x.preventDefault(), I((_e) => _e + x.key), vt.current.focus(), Tt(!1));
  }, []);
  return Xt(() => {
    const x = setTimeout(() => {
      if (E && y === "books" && K.current && st.current) {
        const U = K.current, tt = st.current, Ft = tt.offsetTop, _e = U.clientHeight, Fe = tt.clientHeight, Be = Ft - _e / 2 + Fe / 2;
        U.scrollTo({
          top: Math.max(0, Be),
          behavior: "smooth"
        }), F(Va(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(x);
    };
  }, [E, y, A, O, t.book]), Xt(() => {
    if (y === "chapters" && $) {
      const x = $ === t.book, U = x ? t.chapterNum : 1;
      F(
        `${$} ${te[$] || ""} ${U}`
      ), setTimeout(() => {
        if (K.current)
          if (x) {
            const tt = lt.current[t.chapterNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        rt.current && rt.current.focus();
      }, 0);
    }
  }, [y, $, O, t.book, t.chapterNum]), Xt(() => {
    if (y === "verses" && D && Y !== void 0) {
      const x = D === t.book && Y === t.chapterNum, U = x ? t.verseNum : 1;
      F(
        `${D} ${te[D] || ""} ${Y}:${U}`
      ), setTimeout(() => {
        if (K.current)
          if (x) {
            const tt = pt.current[t.verseNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            K.current.scrollTo({ top: 0 });
        rt.current && rt.current.focus();
      }, 0);
    }
  }, [
    y,
    D,
    Y,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ p(ye, { open: E, onOpenChange: Mt, modal: v, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
      G,
      {
        ref: $t,
        "aria-label": "book-chapter-trigger",
        variant: u,
        role: "combobox",
        "aria-expanded": E,
        className: m(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        onClick: (x) => {
          St.current && (St.current = !1, x.preventDefault());
        },
        children: h ?? /* @__PURE__ */ r("span", { className: "tw-truncate", children: fe })
      }
    ) }),
    /* @__PURE__ */ r(
      ue,
      {
        id: w,
        className: "tw-w-[var(--radix-popper-anchor-width,280px)] tw-min-w-[200px] tw-max-w-[280px] tw-p-0",
        align: k,
        onKeyDownCapture: tn,
        onKeyDown: (x) => x.stopPropagation(),
        onPointerDownOutside: (x) => {
          const U = x.target;
          $t.current && U instanceof Node && $t.current.contains(U) && (St.current = !0, Mt(!1));
        },
        onCloseAutoFocus: N,
        children: /* @__PURE__ */ p(
          ve,
          {
            ref: rt,
            loop: !0,
            value: B,
            onValueChange: F,
            shouldFilter: !1,
            children: [
              y === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
                /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
                  /* @__PURE__ */ r(
                    fn,
                    {
                      ref: vt,
                      value: A,
                      onValueChange: I,
                      onKeyDown: pr,
                      onFocus: () => Tt(!1),
                      className: i && i.length > 0 ? "!tw-pr-10" : ""
                    }
                  ),
                  i && i.length > 0 && /* @__PURE__ */ r(
                    Xl,
                    {
                      recentSearches: i,
                      onSearchItemSelect: nt,
                      renderItem: (x) => ge(x, "English"),
                      getItemKey: (x) => `${x.book}-${x.chapterNum}-${x.verseNum}`,
                      ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                      groupHeading: s == null ? void 0 : s["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: it.map(({ onClick: x, disabled: U, title: tt, icon: Ft }) => /* @__PURE__ */ r(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      Tt(!0), x();
                    },
                    disabled: U,
                    className: "tw-h-10 tw-w-4 tw-p-0",
                    title: tt,
                    onKeyDown: ur,
                    children: /* @__PURE__ */ r(Ft, {})
                  },
                  tt
                )) })
              ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
                /* @__PURE__ */ r(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: y === "verses" ? ft : mt,
                    className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                    children: _ === "ltr" ? /* @__PURE__ */ r(Zs, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Qs, { className: "tw-h-4 tw-w-4" })
                  }
                ),
                y === "chapters" && $ && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Ee($, a) }),
                y === "verses" && D && Y !== void 0 && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: `${Ee(D, a)} ${Y}` }),
                /* @__PURE__ */ r(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",
                    children: y === "verses" ? je : yn
                  }
                )
              ] }),
              !et && /* @__PURE__ */ p(xe, { ref: K, children: [
                y === "books" && /* @__PURE__ */ p(dt, { children: [
                  !O && Object.entries(ke).map(([x, U]) => {
                    if (U.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ r(re, { heading: _t(x), children: U.map((tt) => /* @__PURE__ */ r(
                          Aa,
                          {
                            bookId: tt,
                            onSelect: (Ft) => L(Ft),
                            section: Cn(tt),
                            commandValue: `${tt} ${te[tt]}`,
                            ref: tt === t.book ? st : void 0,
                            localizedBookNames: a,
                            disabled: Le(tt)
                          },
                          tt
                        )) }, x)
                      );
                  }),
                  O && /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r(
                    ae,
                    {
                      value: `${O.book} ${te[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                      onSelect: Jt,
                      disabled: !!d && gr(
                        O.book,
                        O.chapterNum ?? 1,
                        O.verseNum ?? 1,
                        d
                      ),
                      className: "tw-font-semibold tw-text-primary",
                      children: ge(
                        {
                          book: O.book,
                          chapterNum: O.chapterNum ?? 1,
                          verseNum: O.verseNum ?? 1
                        },
                        a ? ro(O.book, a) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  O && vn && O.chapterNum && c && /* @__PURE__ */ p(dt, { children: [
                    /* @__PURE__ */ p("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: `${Ee(O.book, a)} ${O.chapterNum}` }),
                      /* @__PURE__ */ r("span", { children: je })
                    ] }),
                    /* @__PURE__ */ r(
                      Ao,
                      {
                        bookId: O.book,
                        chapterNum: O.chapterNum,
                        endVerse: c(O.book, O.chapterNum),
                        scrRef: t,
                        onVerseSelect: jt,
                        setVerseRef: Ze,
                        isVerseDisabled: Qe(O.book, O.chapterNum),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] }),
                  O && !vn && ce(O.book) > 1 && /* @__PURE__ */ p(dt, { children: [
                    /* @__PURE__ */ p("div", { className: "tw-mb-2 tw-flex tw-items-center tw-justify-between tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: [
                      /* @__PURE__ */ r("span", { children: Ee(O.book, a) }),
                      /* @__PURE__ */ r("span", { children: yn })
                    ] }),
                    /* @__PURE__ */ r(
                      Io,
                      {
                        bookId: O.book,
                        scrRef: t,
                        onChapterSelect: W,
                        setChapterRef: Ve,
                        isChapterDimmed: xt,
                        isChapterDisabled: xn(O.book),
                        className: "tw-px-4 tw-pb-4"
                      }
                    )
                  ] })
                ] }),
                y === "chapters" && $ && /* @__PURE__ */ r(
                  Io,
                  {
                    bookId: $,
                    scrRef: t,
                    onChapterSelect: W,
                    setChapterRef: Ve,
                    isChapterDisabled: xn($),
                    className: "tw-p-4"
                  }
                ),
                y === "verses" && D && Y !== void 0 && c && /* @__PURE__ */ r(
                  Ao,
                  {
                    bookId: D,
                    chapterNum: Y,
                    endVerse: c(D, Y),
                    scrRef: t,
                    onVerseSelect: jt,
                    setVerseRef: Ze,
                    isVerseDisabled: Qe(
                      D,
                      Y
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
const ou = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]), ec = Pe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Et = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ca.Root, { ref: n, className: m("pr-twp", ec(), t), ...e }));
Et.displayName = ca.Root.displayName;
const ao = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Dn.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
ao.displayName = Dn.Root.displayName;
const Jn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dn.Item,
  {
    ref: n,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Dn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(nr, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Jn.displayName = Dn.Item.displayName;
function nc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function zr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: w = nc,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: f = "",
  textPlaceholder: h = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: N = "start",
  isDisabled: v = !1,
  ariaLabel: k,
  ..._
}) {
  const [E, C] = S(!1), B = c ?? w, F = (I) => I.length > 0 && typeof I[0] == "object" && "options" in I[0], A = (I, y) => {
    const M = w(I), $ = typeof I == "object" && "secondaryLabel" in I ? I.secondaryLabel : void 0, V = `${y ?? ""}${M}${$ ?? ""}`;
    return /* @__PURE__ */ p(
      ae,
      {
        value: M,
        onSelect: () => {
          l(I), C(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Qt,
            {
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || w(i) !== M
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            M,
            $ && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              $
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ p(ye, { open: E, onOpenChange: C, ..._, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ p(
      G,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": E,
        "aria-label": k,
        id: t,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            d && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: d }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? B(i) : f
              }
            )
          ] }),
          /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ue,
      {
        align: N,
        className: m("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ p(ve, { children: [
          /* @__PURE__ */ r(fn, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r($n, { children: u }),
          /* @__PURE__ */ r(xe, { children: F(e) ? e.map((I) => /* @__PURE__ */ r(re, { heading: I.groupHeading, children: I.options.map((y) => A(y, I.groupHeading)) }, I.groupHeading)) : e.map((I) => A(I)) })
        ] })
      }
    )
  ] });
}
function rc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = q(
    () => Array.from({ length: s }, (c, d) => d + 1),
    [s]
  );
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ r(Et, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      zr,
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
      zr,
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
var Kr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Kr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Kr || (Kr = {}));
const au = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), vr = (t, e) => t[e] ?? e;
function su({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: w,
  localizedStrings: c
}) {
  const d = vr(c, "%webView_bookSelector_currentBook%"), f = vr(c, "%webView_bookSelector_choose%"), h = vr(c, "%webView_bookSelector_chooseBooks%"), [u, g] = S(
    "current book"
    /* CurrentBook */
  ), N = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    ao,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (v) => N(v),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(Et, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            rc,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: w,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(Et, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(Et, { className: "tw-flex tw-items-center", children: o.map((v) => wt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            G,
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
const La = er(null);
function oc(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function me() {
  const t = Zr(La);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ja = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, ac = ja ? Xt : J, jn = { tag: Qr };
function sc({ initialConfig: t, children: e }) {
  const n = q(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: w } = t, c = oc(null, o), d = wa({ editable: t.editable, html: w, namespace: a, nodes: s, onError: (f) => i(f, d), theme: o });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const u = De();
          if (u.isEmpty()) {
            const g = rr();
            u.append(g);
            const N = ja ? document.activeElement : null;
            (ne() !== null || N !== null && N === f.getRootElement()) && g.select();
          }
        }, jn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = f.parseEditorState(h);
            f.setEditorState(u, jn);
            break;
          }
          case "object":
            f.setEditorState(h, jn);
            break;
          case "function":
            f.update(() => {
              De().isEmpty() && h(f);
            }, jn);
        }
      }
    }(d, l), [d, c];
  }, []);
  return ac(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(La.Provider, { value: n, children: e });
}
const ic = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : J;
function lc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = me();
  return ic(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: w }) => {
      e && s.size === 0 && i.size === 0 || t && w.has(Qr) || l.isEmpty() || n(a, o, w);
    });
  }, [o, t, e, n]), null;
}
const so = {
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
}, Kt = Xe.Provider, qt = Xe.Root, Ht = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Xe.Trigger,
  {
    ref: o,
    className: e ? m(Pa({ variant: e }), t) : t,
    ...n
  }
));
Ht.displayName = Xe.Trigger.displayName;
const Gt = b.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Xe.Portal, { children: /* @__PURE__ */ r(
  Xe.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: mn, ...n },
    className: m(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
Gt.displayName = Xe.Content.displayName;
const io = [
  _l,
  da,
  pa,
  Cl
], cc = er(null), xr = {
  didCatch: !1,
  error: null
};
class wc extends Ws {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = xr;
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
      }), this.setState(xr);
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
    if (o && n.error !== null && dc(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(xr);
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
      const w = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(w);
      else if (o)
        l = xo(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return xo(cc.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function dc() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function pc({ children: t, onError: e }) {
  return r(wc, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const uc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : J;
function mc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function fc() {
  return function(t) {
    const [e] = me(), n = q(() => t(e), [e, t]), [o, a] = S(() => n.initialValueFn()), s = H(o);
    return uc(() => {
      const { initialValueFn: i, subscribe: l } = n, w = i();
      return s.current !== w && (s.current = w, a(w)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(mc);
}
function hc(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Gi(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), w = s.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [f, h] = qi(t), u = l.is(w), g = e.is(i ? w : l), N = e.is(i ? l : w);
      let v, k = 0;
      u ? (k = f > h ? h : f, v = f > h ? f : h) : g ? (k = i ? h : f, v = void 0) : N && (k = 0, v = i ? f : h);
      const _ = e.__text.slice(k, v);
      _ !== e.__text && (n === "clone" && (e = Hi(e)), e.__text = _);
    }
  }
  return e;
}
function gc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Fa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bc = Fa && "documentMode" in document ? document.documentMode : null;
!(!Fa || !("InputEvent" in window) || bc) && "getTargetRanges" in new window.InputEvent("input");
function vc(t) {
  const e = ua(t, (n) => Te(n) && !n.isInline());
  return Te(e) || gc(4, t.__key), e;
}
function xc(t) {
  const e = ne();
  if (!Ye(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = ua(s, (c) => Te(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !n.has(w) && (n.add(w), t(l));
  }
  return n.size > 0;
}
const yc = Symbol.for("preact-signals");
function ar() {
  if (Re > 1) return void Re--;
  let t, e = !1;
  for (; Tn !== void 0; ) {
    let n = Tn;
    for (Tn = void 0, Gr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && Ba(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (Gr = 0, Re--, e) throw t;
}
function Nc(t) {
  if (Re > 0) return t();
  Re++;
  try {
    return t();
  } finally {
    ar();
  }
}
let ot, Tn;
function Po(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let Re = 0, Gr = 0, Gn = 0;
function $o(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function zt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Mn(t, e) {
  return new zt(t, e);
}
function Ba(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Vo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function za(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function Ke(t, e) {
  zt.call(this, void 0), this.x = t, this.s = void 0, this.g = Gn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function kc(t, e) {
  return new Ke(t, e);
}
function Ka(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    Re++;
    const n = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, lo(t), o;
    } finally {
      ot = n, ar();
    }
  }
}
function lo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Ka(t);
}
function _c(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  za(this), ot = t, this.f &= -2, 8 & this.f && lo(this), ar();
}
function nn(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Oe(t, e) {
  const n = new nn(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function sr(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = Mn(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
zt.prototype.brand = yc, zt.prototype.h = function() {
  return !0;
}, zt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Po(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, zt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Po(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, zt.prototype.subscribe = function(t) {
  return Oe(() => {
    const e = this.value, n = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = n;
    }
  }, { name: "sub" });
}, zt.prototype.valueOf = function() {
  return this.value;
}, zt.prototype.toString = function() {
  return this.value + "";
}, zt.prototype.toJSON = function() {
  return this.value;
}, zt.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(zt.prototype, "value", { get() {
  const t = $o(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Gr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, Gn++, Re++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      ar();
    }
  }
} }), Ke.prototype = new zt(), Ke.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Gn)) return !0;
  if (this.g = Gn, this.f |= 1, this.i > 0 && !Ba(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    Vo(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, za(this), this.f &= -2, !0;
}, Ke.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  zt.prototype.S.call(this, t);
}, Ke.prototype.U = function(t) {
  if (this.t !== void 0 && (zt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Ke.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Ke.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = $o(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), nn.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, nn.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Ka(this), Vo(this), Re++;
  const t = ot;
  return ot = this, _c.bind(this, t);
}, nn.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Tn, Tn = this);
}, nn.prototype.d = function() {
  this.f |= 8, 1 & this.f || lo(this);
}, nn.prototype.dispose = function() {
  this.d();
};
pe({ build: (t, e, n) => sr(e), config: Pn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return Oe(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ga() {
  const t = De(), e = ne(), n = rr();
  t.clear(), t.append(n), e !== null && n.select(), Ye(e) && (e.format = 0);
}
function qa(t, e = Ga) {
  return t.registerCommand(ma, (n) => (t.update(e), !0), fa);
}
pe({ build: (t, e, n) => sr(e), config: Pn({ $onClear: Ga }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return Oe(() => qa(t, o.value));
} });
function Cc(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const yr = Yi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Ha extends Ar {
  $config() {
    return this.config("decorator-text", { extends: Ar, stateConfigs: [{ flat: !0, stateConfig: yr }] });
  }
  getFormat() {
    return al(this, yr);
  }
  getFormatFlags(e, n) {
    return Eo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = sl[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return il(this, yr, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Eo(n, e, null);
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
function Ec(t) {
  return t instanceof Ha;
}
pe({ name: "@lexical/extension/DecoratorText", nodes: () => [Ha], register: (t, e, n) => t.registerCommand(ha, (o) => {
  const a = ne();
  if (ga(a) || Ye(a)) for (const s of a.getNodes()) Ec(s) && s.toggleFormat(o);
  return !1;
}, ba) });
function Ua(t, e) {
  let n;
  return Mn(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const qr = pe({ build: (t) => Ua(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function ct(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ya(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Ya(n[a], o[a]);
    return t;
  }
  return e;
}
const co = 0, Hr = 1, Xa = 2, Nr = 3, Fn = 4, en = 5, kr = 6, Nn = 7;
function _r(t) {
  return t.id === co;
}
function Wa(t) {
  return t.id === Xa;
}
function Tc(t) {
  return function(e) {
    return e.id === Hr;
  }(t) || ct(305, String(t.id), String(Hr)), Object.assign(t, { id: Xa });
}
const Rc = /* @__PURE__ */ new Set();
class Sc {
  constructor(e, n) {
    Bt(this, "builder");
    Bt(this, "configs");
    Bt(this, "_dependency");
    Bt(this, "_peerNameSet");
    Bt(this, "extension");
    Bt(this, "state");
    Bt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: co };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ui;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Wa(n) || ct(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, w, c) {
      return Object.assign(l, { config: w, id: Nr, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: Fn, initResult: w, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Fn && ct(307, String(n.id), String(en)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: en, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== en && ct(308, String(o.id), String(en));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: kr });
    }(o), () => {
      const s = this.state;
      s.id !== Nn && ct(309, String(o.id), String(Nn)), this.state = function(i) {
        return Object.assign(i, { id: en });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== kr && ct(310, String(n.id), String(kr)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Nn });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && ct(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ct(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Fn;
    }(e) || ct(313, String(e.id), String(Fn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Nr;
    }(e) || ct(314, String(e.id), String(Nr)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && ct(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && ct(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= Nn;
    }(e) || ct(316, String(e.id), String(Nn)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Rc;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= en;
      })(e) || ct(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Lo = { tag: Qr };
function Dc() {
  const t = De();
  t.isEmpty() && t.append(rr());
}
const Mc = pe({ config: Pn({ setOptions: Lo, updateOptions: Lo }), init: ({ $initialEditorState: t = Dc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (Zi(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Xi, pa, Wi, Ji, da] }), jo = Symbol.for("@lexical/extension/LexicalBuilder");
function Fo() {
}
function Oc(t) {
  throw t;
}
function Bn(t) {
  return Array.isArray(t) ? t : [t];
}
const Cr = "0.41.0+prod.esm";
class Rn {
  constructor(e) {
    Bt(this, "roots");
    Bt(this, "extensionNameMap");
    Bt(this, "outgoingConfigEdges");
    Bt(this, "incomingEdges");
    Bt(this, "conflicts");
    Bt(this, "_sortedExtensionReps");
    Bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Cr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [Bn(Mc)];
    for (const o of e) n.push(Bn(o));
    return new Rn(n);
  }
  static maybeFromEditor(e) {
    const n = e[jo];
    return n && (n.PACKAGE_VERSION !== Cr && ct(292, n.PACKAGE_VERSION, Cr), n instanceof Rn || ct(293)), n;
  }
  static fromEditor(e) {
    const n = Rn.maybeFromEditor(e);
    return n === void 0 && ct(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(wa({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [jo]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = Fo;
    function n() {
      try {
        e();
      } finally {
        e = Fo;
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
    if (n) return n.extension !== e && ct(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && ct(296);
    const n = Bn(e), [o] = n;
    typeof o.name != "string" && ct(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && ct(298, o.name), !a) {
      a = new Sc(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && ct(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && ct(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = Bn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (Wa(s)) return;
      const i = o.extension.name;
      var l;
      _r(s) || ct(300, i, a || "[unknown]"), _r(l = s) || ct(304, String(l.id), String(co)), s = Object.assign(l, { id: Hr }), o.state = s;
      const w = this.outgoingConfigEdges.get(i);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && n(d, i);
      }
      s = Tc(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) _r(o.state) && n(o);
    for (const o of e) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && ct(301, o.name);
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
    for (const d of l) {
      const { extension: f } = d;
      if (f.onError !== void 0 && (e.onError = f.onError), f.disableEvents !== void 0 && (e.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (e.parentEditor = f.parentEditor), f.editable !== void 0 && (e.editable = f.editable), f.namespace !== void 0 && (e.namespace = f.namespace), f.$initialEditorState !== void 0 && (e.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of Cc(f)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && ct(302, f.name, h.replace.name, u.extension.name), o.set(h.replace, d);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, u] of f.html.export.entries()) a.set(h, u);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && Ya(i, f.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const w = Object.keys(s).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = s), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Oc), e;
  }
}
const Ic = /* @__PURE__ */ new Set(), Bo = pe({ build(t, e, n) {
  const o = n.getDependency(qr).output, a = Mn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ua(() => {
  }, () => Oe(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (ne()) for (const [d, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(d);
          continue;
        }
        const h = cl(d), u = h && h.isSelected() || !1;
        c = c || u !== (!!i && i.has(d)), u && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && i && w.size === i.size || (s.value = w);
  }));
  return { watchNodeKey: function(i) {
    const l = kc(() => (s.value || Ic).has(i)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(i);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(i, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [qr], name: "@lexical/extension/NodeSelection" });
Qi("INSERT_HORIZONTAL_RULE_COMMAND");
class an extends Ar {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new an(e.__key);
  }
  static importJSON(e) {
    return Ja().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Ac, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return va(n, e.theme.hr), n;
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
function Ac() {
  return { node: Ja() };
}
function Ja() {
  return ll(an);
}
function Pc(t) {
  return t instanceof an;
}
pe({ dependencies: [qr, Bo], name: "@lexical/extension/HorizontalRule", nodes: () => [an], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(Bo).output, a = Mn({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return Me(t.registerCommand(tl, (i) => {
    if (el(i.target)) {
      const l = nl(i.target);
      if (Pc(l)) return function(w, c = !1) {
        const d = ne(), f = w.isSelected(), h = w.getKey();
        let u;
        c && ga(d) ? u = d : (u = rl(), ol(u)), f ? u.delete(h) : u.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, ba), t.registerMutationListener(an, (i, l) => {
    Nc(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, f] of i.entries()) if (f === "destroyed") c.delete(d), w = !0;
      else {
        const h = c.get(d), u = t.getElementByKey(d);
        h ? h.domNode.value = u : (w = !0, c.set(d, { domNode: Mn(u), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), Oe(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) i.push(Oe(() => {
      const c = l.value;
      c && (w.value ? va(c, s) : wl(c, s));
    }));
    return Me(...i);
  }));
} });
function Za(t) {
  return t.canBeEmpty();
}
function $c(t, e, n = Za) {
  return Me(t.registerCommand(dl, (o) => {
    const a = ne();
    if (!Ye(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => Hn(h) && h.canIndent()).length > 0) return !0;
      const l = i.anchor, w = i.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), f = vc(d);
      if (f.canIndent()) {
        const h = f.getKey();
        let u = pl();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = ul(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? ml : To : fl;
    return t.dispatchCommand(s, void 0);
  }, fa), t.registerCommand(To, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = ne();
    if (!Ye(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return xc((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, to));
}
pe({ build: (t, e, n) => sr(e), config: Pn({ $canIndent: Za, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return Oe(() => {
    if (!o.value) return $c(t, a, s);
  });
} });
const Vc = pe({ name: "@lexical/react/ReactProvider" });
function Lc() {
  return De().getTextContent();
}
function jc(t, e = !0) {
  if (t) return !1;
  let n = Lc();
  return e && (n = n.trim()), n === "";
}
function Fc(t) {
  if (!jc(t, !1)) return !1;
  const e = De().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (hl(a)) return !1;
    if (Te(a)) {
      if (!gl(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const w = s[o];
        if (!Un(w)) return !1;
      }
    }
  }
  return !0;
}
function Qa(t) {
  return () => Fc(t);
}
function ts(t) {
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
          const w = l.args;
          if (w) {
            const [c, d, f, h, u] = w;
            t.update(() => {
              const g = ne();
              if (Ye(g)) {
                const N = g.anchor;
                let v = N.getNode(), k = 0, _ = 0;
                if (Un(v) && c >= 0 && d >= 0 && (k = c, _ = c + d, g.setTextNodeRange(v, k, v, _)), k === _ && f === "" || (g.insertRawText(f), v = N.getNode()), Un(v)) {
                  k = h, _ = h + u;
                  const E = v.getTextContentSize();
                  k = k > E ? E : k, _ = _ > E ? E : _, g.setTextNodeRange(v, k, v, _);
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
pe({ build: (t, e, n) => sr(e), config: Pn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => Oe(() => n.getOutput().disabled.value ? void 0 : ts(t)) });
function Bc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const wo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : J;
function zc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = S(() => n.getDecorators());
    return wo(() => n.registerDecoratorListener((i) => {
      Tl(() => {
        s(i);
      });
    }), [n]), J(() => {
      s(n.getDecorators());
    }, [n]), q(() => {
      const i = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = r(o, { onError: (h) => n._onError(h), children: r(Js, { fallback: null, children: a[c] }) }), f = n.getElementByKey(c);
        f !== null && i.push(Rl(d, f, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function Kc({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Rn.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Vc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Bc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(zc, { editor: t, ErrorBoundary: e });
}
function zo(t) {
  return t.getEditorState().read(Qa(t.isComposing()));
}
function Gc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = me();
  return function(a) {
    wo(() => Me(El(a), ts(a)), [a]);
  }(o), p(dt, { children: [t, r(qc, { content: e }), r(Kc, { editor: o, ErrorBoundary: n })] });
}
function qc({ content: t }) {
  const [e] = me(), n = function(a) {
    const [s, i] = S(() => zo(a));
    return wo(() => {
      function l() {
        const w = zo(a);
        i(w);
      }
      return l(), Me(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = fc();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Hc({ defaultSelection: t }) {
  const [e] = me();
  return J(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Uc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : J;
function Yc({ onClear: t }) {
  const [e] = me();
  return Uc(() => qa(e, t), [e, t]), null;
}
const es = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : J;
function Xc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: f, ariaRequired: h, autoCapitalize: u, className: g, id: N, role: v = "textbox", spellCheck: k = !0, style: _, tabIndex: E, "data-testid": C, ...B }, F) {
  const [A, I] = S(t.isEditable()), y = j(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? t.setRootElement($) : t.setRootElement(null);
  }, [t]), M = q(() => /* @__PURE__ */ function(...$) {
    return (V) => {
      for (const D of $) typeof D == "function" ? D(V) : D != null && (D.current = V);
    };
  }(F, y), [y, F]);
  return es(() => (I(t.isEditable()), t.registerEditableListener(($) => {
    I($);
  })), [t]), r("div", { "aria-activedescendant": A ? e : void 0, "aria-autocomplete": A ? n : "none", "aria-controls": A ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": A && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": A ? f : void 0, "aria-readonly": !A || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: A, "data-testid": C, id: N, ref: M, role: v, spellCheck: k, style: _, tabIndex: E, ...B });
}
const Wc = An(Xc);
function Ko(t) {
  return t.getEditorState().read(Qa(t.isComposing()));
}
const Jc = An(Zc);
function Zc(t, e) {
  const { placeholder: n, ...o } = t, [a] = me();
  return p(dt, { children: [r(Wc, { editor: a, ...o, ref: e }), n != null && r(Qc, { editor: a, content: n })] });
}
function Qc({ content: t, editor: e }) {
  const n = function(i) {
    const [l, w] = S(() => Ko(i));
    return es(() => {
      function c() {
        const d = Ko(i);
        w(d);
      }
      return c(), Me(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = S(e.isEditable());
  if (Xt(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function tw({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Jc,
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
const ns = er(void 0);
function ew({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = q(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(ns.Provider, { value: i, children: s });
}
function rs() {
  const t = Zr(ns);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function nw() {
  const [t, e] = S(void 0), n = j(() => {
    e(void 0);
  }, []), o = q(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(Fr, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(Yn, { children: [
      /* @__PURE__ */ r(Xn, { children: /* @__PURE__ */ r(Wn, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = j(
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
function rw({
  children: t
}) {
  const [e] = me(), [n, o] = S(e), [a, s] = S("paragraph"), [i, l] = nw(), w = () => {
  };
  return J(() => n.registerCommand(
    xa,
    (c, d) => (o(d), !1),
    to
  ), [n]), /* @__PURE__ */ p(
    ew,
    {
      activeEditor: n,
      $updateToolbar: w,
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
function ow(t) {
  const [e] = me(), { activeEditor: n } = rs();
  J(() => n.registerCommand(
    xa,
    () => {
      const o = ne();
      return o && t(o), !1;
    },
    to
  ), [e, t]), J(() => {
    n.getEditorState().read(() => {
      const o = ne();
      o && t(o);
    });
  }, [n, t]);
}
const os = Pe(
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
), aw = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  ka.Root,
  {
    ref: a,
    className: m(os({ variant: e, size: n, className: t })),
    ...o
  }
));
aw.displayName = ka.Root.displayName;
const as = b.createContext({
  size: "default",
  variant: "default"
}), po = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = Ct();
  return /* @__PURE__ */ r(
    or.Root,
    {
      ref: s,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        as.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
po.displayName = or.Root.displayName;
const Sn = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(as);
  return /* @__PURE__ */ r(
    or.Item,
    {
      ref: s,
      className: m(
        os({
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
Sn.displayName = or.Item.displayName;
const Go = [
  { format: "bold", icon: ti, label: "Bold" },
  { format: "italic", icon: ei, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function sw() {
  const { activeEditor: t } = rs(), [e, n] = S([]), o = j((a) => {
    if (Ye(a) || Sl(a)) {
      const s = [];
      Go.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return ow(o), /* @__PURE__ */ r(
    po,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: Go.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        Sn,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(ha, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function iw({ onClear: t }) {
  const [e] = me();
  J(() => {
    t && t(() => {
      e.dispatchCommand(ma, void 0);
    });
  }, [e, t]);
}
function lw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = S(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(rw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(sw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Gc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(tw, { placeholder: t }) }),
          ErrorBoundary: pc
        }
      ),
      e && /* @__PURE__ */ r(Hc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(iw, { onClear: n }),
      /* @__PURE__ */ r(Yc, {})
    ] })
  ] });
}
const cw = {
  namespace: "commentEditor",
  theme: so,
  nodes: io,
  onError: (t) => {
    console.error(t);
  }
};
function Zn({
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
        className: m(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          sc,
          {
            initialConfig: {
              ...cw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(Kt, { children: [
              /* @__PURE__ */ r(lw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                lc,
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
function ww(t, e) {
  const n = xl(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!is.has(s.nodeName)) {
    const i = ls(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof ya && i.insertAfter(Na());
    for (const i of s) {
      const l = i.getChildren();
      for (const w of l) i.insertBefore(w);
      i.remove();
    }
  }(a), o;
}
function dw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = De().getChildren();
  for (let a = 0; a < o.length; a++)
    ss(t, o[a], n, e);
  return n.innerHTML;
}
function ss(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = Te(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && Un(e) && (i = hc(o, e, "clone"));
  const l = Te(i) ? i.getChildren() : [], w = bl(t, i.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, i) : i.exportDOM(t);
  const { element: d, after: f } = c;
  if (!d) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], N = ss(t, g, h, o);
    !a && Te(e) && N && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((vl(d) || Ro(d)) && d.append(h), n.append(d), f) {
      const u = f.call(i, d);
      u && (Ro(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const is = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ls(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (is.has(t.nodeName)) return i;
  let l = null;
  const w = function(g, N) {
    const { nodeName: v } = g, k = N._htmlConversions.get(v.toLowerCase());
    let _ = null;
    if (k !== void 0) for (const E of k) {
      const C = E(g);
      C !== null && (_ === null || (_.priority || 0) <= (C.priority || 0)) && (_ = C);
    }
    return _ !== null ? _.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let d = null;
  if (c !== null) {
    d = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, N] of a) if (l = N(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const f = t.childNodes;
  let h = [];
  const u = (l == null || !yl(l)) && (l != null && Hn(l) || o);
  for (let g = 0; g < f.length; g++) h.push(...ls(f[g], e, n, u, new Map(a), l));
  return d != null && (h = d(h)), So(t) && (h = pw(t, h, u ? () => {
    const g = new ya();
    return n.push(g), g;
  } : rr)), l == null ? h.length > 0 ? i = i.concat(h) : So(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Do(g.nextSibling) && Do(g.previousSibling);
  }(t) && (i = i.concat(Na())) : Te(l) && l.append(...h), i;
}
function pw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (Hn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && Hn(e[i + 1])) {
      const w = n();
      w.setFormat(o), w.append(...s), a.push(w), s = [];
    }
  }
  return a;
}
function cs(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function ws(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ws(e.children)
  ) : !1;
}
function ee(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ws(t.root.children) : !1;
}
function uw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = _a({
    namespace: "EditorUtils",
    theme: so,
    nodes: io,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = ww(e, a);
      De().clear(), Nl(s);
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
function Qn(t) {
  const e = _a({
    namespace: "EditorUtils",
    theme: so,
    nodes: io,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = dw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function uo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function qn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function mo(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const mw = {
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
function Er(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function iu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = S(mw), [i, l] = S(void 0), [w, c] = S(!1), d = H(void 0), f = H(null);
  J(() => {
    let k = !0;
    const _ = f.current;
    if (!_) return;
    const E = setTimeout(() => {
      k && cs(_);
    }, 300);
    return () => {
      k = !1, clearTimeout(E);
    };
  }, []);
  const h = j(() => {
    if (!ee(a)) return;
    const k = Qn(a);
    e(k, i);
  }, [a, e, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", N = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
          /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(G, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(dn, {}) }) }),
          /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: N }) })
        ] }) }),
        /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
          /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
            G,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !ee(a),
              children: /* @__PURE__ */ r(Qt, {})
            }
          ) }),
          /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(ye, { open: w, onOpenChange: c, children: [
      /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ p(
        G,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(ea, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Er(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        ue,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (k) => {
            k.key === "Escape" && (k.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: t.map((k) => /* @__PURE__ */ r(
            ae,
            {
              onSelect: () => {
                l(k === "" ? void 0 : k), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Er(k, o) })
            },
            k || "unassigned"
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
        onKeyDownCapture: (k) => {
          k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), n()) : mo(k) && (k.preventDefault(), k.stopPropagation(), ee(a) && h());
        },
        onKeyDown: (k) => {
          uo(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          Zn,
          {
            editorSerializedState: a,
            onSerializedChange: (k) => s(k),
            placeholder: u,
            onClear: (k) => {
              d.current = k;
            }
          }
        )
      }
    )
  ] });
}
const lu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), cu = [
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
], fw = ["input", "select", "textarea", "button"], hw = ["button", "textbox"], gw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [s, i] = S(void 0), [l, w] = S(void 0), c = j(
    (u) => {
      i(u);
      const g = t.find((v) => v.id === u);
      g && (e == null || e(g));
      const N = document.getElementById(u);
      N && (N.scrollIntoView({ block: "center" }), N.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = j(
    (u) => {
      const g = t.find((N) => N.id === u);
      g && (w((N) => N === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || fw.includes(g)) return !0;
    const N = u.getAttribute("role");
    if (N && hw.includes(N)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = j(
    (u) => {
      var A;
      const g = u.target, N = (I) => I ? document.getElementById(I) : void 0, v = N(l), k = N(s);
      if (!!(v && g && v.contains(g) && g !== v) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const I = t.find((y) => y.id === l);
            I && c(I.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!v) return;
          const I = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (I.length === 0) return;
          const y = I.findIndex(($) => $ === g);
          if (y === -1) return;
          let M;
          u.key === "ArrowDown" ? M = Math.min(y + 1, I.length - 1) : M = Math.max(y - 1, 0), M !== y && (u.preventDefault(), u.stopPropagation(), (A = I[M]) == null || A.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((I) => I.id === s);
      let B = C;
      switch (u.key) {
        case "ArrowDown":
          B = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          B = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          B = 0, u.preventDefault();
          break;
        case "End":
          B = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && d(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const I = k;
          if (I) {
            const y = I.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), M = I.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), $ = y ?? M;
            if ($) {
              u.preventDefault(), $.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const F = t[B];
      F && c(F.id);
    },
    [t, c, s, l, d, o]
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
}, bw = Pe(
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
), sn = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", bw({ variant: e }), t), ...n })
);
sn.displayName = "Badge";
const ds = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
ds.displayName = "Card";
const vw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
vw.displayName = "CardHeader";
const xw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: m(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
xw.displayName = "CardTitle";
const yw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
yw.displayName = "CardDescription";
const ps = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ps.displayName = "CardContent";
const Nw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Nw.displayName = "CardFooter";
const ln = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Ca.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: m(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
ln.displayName = Ca.Root.displayName;
const us = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  un.Root,
  {
    ref: n,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
us.displayName = un.Root.displayName;
const kw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  un.Image,
  {
    ref: n,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
kw.displayName = un.Image.displayName;
const ms = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  un.Fallback,
  {
    ref: n,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
ms.displayName = un.Fallback.displayName;
const fo = er(void 0);
function se() {
  const t = Zr(fo);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ne = Pe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ie = ht.Trigger, fs = ht.Group, _w = ht.Portal, Cw = ht.Sub, Ew = ht.RadioGroup;
function be({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(fo.Provider, { value: n, children: /* @__PURE__ */ r(ht.Root, { ...e }) });
}
const hs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = se();
  return /* @__PURE__ */ p(
    ht.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        Ne({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(rn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
hs.displayName = ht.SubTrigger.displayName;
const gs = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ct();
  return /* @__PURE__ */ r(
    ht.SubContent,
    {
      ref: o,
      className: m(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: a, children: e })
    }
  );
});
gs.displayName = ht.SubContent.displayName;
const de = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ r(ht.Portal, { children: /* @__PURE__ */ r(
    ht.Content,
    {
      ref: a,
      sideOffset: e,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
de.displayName = ht.Content.displayName;
const He = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Ct(), s = se();
  return /* @__PURE__ */ r(
    ht.Item,
    {
      ref: o,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        Ne({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
He.displayName = ht.Item.displayName;
const we = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Ct(), i = se();
  return /* @__PURE__ */ p(
    ht.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ne({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
we.displayName = ht.CheckboxItem.displayName;
const bs = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ct(), s = se();
  return /* @__PURE__ */ p(
    ht.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ne({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(nr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
bs.displayName = ht.RadioItem.displayName;
const hn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ht.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
hn.displayName = ht.Label.displayName;
const Ae = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ht.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ae.displayName = ht.Separator.displayName;
function Tw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Tw.displayName = "DropdownMenuShortcut";
function qo({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [w, c] = S(!1), [d, f] = S(), h = H(null);
  J(() => {
    if (!w) return;
    let C = !0;
    const B = h.current;
    if (!B) return;
    const F = setTimeout(() => {
      C && cs(B);
    }, 300);
    return () => {
      C = !1, clearTimeout(F);
    };
  }, [w]);
  const u = j(
    (C) => {
      C && C.stopPropagation(), c(!1), f(void 0), i == null || i(!1);
    },
    [i]
  ), g = j(
    async (C) => {
      if (C && C.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Qn(d)
      ) && (c(!1), f(void 0), i == null || i(!1));
    },
    [d, a, t.id, i]
  ), N = q(() => {
    const C = new Date(t.date), B = $i(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), F = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return qe(n["%comment_dateAtTime%"], {
      date: B,
      time: F
    });
  }, [t.date, n]), v = q(() => t.user, [t.user]), k = q(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), _ = q(() => Vi(t.contents), [t.contents]), E = q(() => {
    if (o && l)
      return /* @__PURE__ */ p(dt, { children: [
        /* @__PURE__ */ p(
          He,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), f(uw(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(ni, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          He,
          {
            onClick: async (C) => {
              C.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(ri, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
      className: m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(us, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(ms, { className: "tw-text-xs tw-font-medium", children: k }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: N }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(sn, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              qn(t.assignedUser, n)
            ] })
          ] }),
          w && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), u()) : mo(C) && (C.preventDefault(), C.stopPropagation(), ee(d) && g());
              },
              onKeyDown: (C) => {
                uo(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  Zn,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: d,
                    onSerializedChange: (C) => f(C)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    G,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(dn, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    G,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !ee(d),
                      children: /* @__PURE__ */ r(na, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ p(dt, { children: [
            t.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
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
                dangerouslySetInnerHTML: { __html: _ }
              }
            )
          ] })
        ] }),
        E && /* @__PURE__ */ p(be, { children: [
          /* @__PURE__ */ r(Ie, { asChild: !0, children: /* @__PURE__ */ r(G, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(oi, {}) }) }),
          /* @__PURE__ */ r(de, { align: "end", children: E })
        ] })
      ]
    }
  );
}
const Ho = {
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
function Rw({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: w,
  thread: c,
  threadStatus: d,
  handleAddCommentToThread: f,
  handleUpdateComment: h,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: N,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: k,
  canUserResolveThreadCallback: _,
  canUserEditOrDeleteCommentCallback: E,
  isRead: C = !1,
  autoReadDelay: B = 5,
  onVerseRefClick: F
}) {
  const [A, I] = S(Ho), [y, M] = S(
    void 0
  ), $ = o, [V, D] = S(!1), [P, Y] = S(!1), [X, et] = S(!1), [Tt, $t] = S(!1), [St, rt] = S(!1), [vt, K] = S(C), [st, lt] = S(!1), pt = H(void 0), [ut, Dt] = S(/* @__PURE__ */ new Map());
  J(() => {
    let R = !0;
    return (async () => {
      const xt = _ ? await _(w) : !1;
      R && rt(xt);
    })(), () => {
      R = !1;
    };
  }, [w, _]), J(() => {
    let R = !0;
    if (!o) {
      $t(!1), Dt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = k ? await k(w) : !1;
      R && $t(xt);
    })(), () => {
      R = !1;
    };
  }, [o, w, k]);
  const Ot = q(() => e.filter((R) => !R.deleted), [e]);
  J(() => {
    let R = !0;
    if (!o || !E) {
      Dt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = /* @__PURE__ */ new Map();
      await Promise.all(
        Ot.map(async (fe) => {
          const Ve = await E(fe.id);
          R && xt.set(fe.id, Ve);
        })
      ), R && Dt(xt);
    })(), () => {
      R = !1;
    };
  }, [o, Ot, E]);
  const Vt = q(() => Ot[0], [Ot]), ke = H(null), O = H(void 0), Lt = j(() => {
    var R;
    (R = O.current) == null || R.call(O), I(Ho);
  }, []), Jt = j(() => {
    const R = !vt;
    K(R), lt(!R), g == null || g(w, R);
  }, [vt, g, w]);
  J(() => {
    D(!1);
  }, [o]), J(() => {
    if (o && !vt && !st) {
      const R = setTimeout(() => {
        K(!0), g == null || g(w, !0);
      }, B * 1e3);
      return pt.current = R, () => clearTimeout(R);
    }
    pt.current && (clearTimeout(pt.current), pt.current = void 0);
  }, [o, vt, st, B, w, g]);
  const jt = q(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), L = q(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const R = qn(s, n);
    return qe(n["%comment_assigned_to%"], {
      assignedUser: R
    });
  }, [s, n]), W = q(() => Ot.slice(1), [Ot]), nt = q(() => W.length ?? 0, [W.length]), it = q(() => nt > 0, [nt]), mt = q(() => V || nt <= 2 ? W : W.slice(-2), [W, nt, V]), ft = q(() => V || nt <= 2 ? 0 : nt - 2, [nt, V]), Mt = q(
    () => nt === 1 ? jt.singleReply : qe(jt.multipleReplies, { count: nt }),
    [nt, jt]
  ), Nt = q(
    () => ft === 1 ? jt.singleReply : qe(jt.multipleReplies, { count: ft }),
    [ft, jt]
  );
  J(() => {
    !o && P && it && Y(!1);
  }, [o, P, it]);
  const kt = j(
    async (R) => {
      R && R.stopPropagation();
      const _t = ee(A) ? Qn(A) : void 0;
      if (y !== void 0) {
        await f({
          threadId: w,
          contents: _t,
          assignedUser: y
        }) && (M(void 0), _t && Lt());
        return;
      }
      _t && await f({ threadId: w, contents: _t }) && Lt();
    },
    [
      Lt,
      A,
      f,
      y,
      w
    ]
  ), Rt = j(
    async (R) => {
      const _t = ee(A) ? Qn(A) : void 0, xt = await f({
        ...R,
        contents: _t,
        assignedUser: y ?? R.assignedUser
      });
      return xt && _t && Lt(), xt && y !== void 0 && M(void 0), xt;
    },
    [Lt, A, f, y]
  );
  if (Vt)
    return /* @__PURE__ */ r(
      ds,
      {
        role: "option",
        "aria-selected": o,
        id: w,
        className: m(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && d !== "Resolved" && vt,
            "tw-bg-background": o && d !== "Resolved" && vt,
            "tw-bg-muted": d === "Resolved",
            "tw-bg-accent": !vt && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(w);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(ps, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              L && /* @__PURE__ */ r(sn, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: L }),
              /* @__PURE__ */ r(
                G,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (R) => {
                    R.stopPropagation(), Jt();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": vt ? "Mark as unread" : "Mark as read",
                  children: vt ? /* @__PURE__ */ r(ai, {}) : /* @__PURE__ */ r(si, {})
                }
              ),
              St && d !== "Resolved" && /* @__PURE__ */ r(
                G,
                {
                  variant: "ghost",
                  size: "icon",
                  className: m(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (R) => {
                    R.stopPropagation(), Rt({
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
                ref: ke,
                className: m(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": $
                  },
                  { "tw-whitespace-nowrap": !$ }
                ),
                children: [
                  a && F ? /* @__PURE__ */ r(
                    G,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (R) => {
                        R.stopPropagation(), F(c);
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
              qo,
              {
                comment: Vt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Rt,
                handleUpdateComment: h,
                handleDeleteComment: u,
                onEditingChange: Y,
                canEditOrDelete: (!P && ut.get(Vt.id)) ?? !1,
                canUserResolveThread: St
              }
            )
          ] }),
          /* @__PURE__ */ p(dt, { children: [
            it && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(ln, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Mt })
            ] }),
            !o && ee(A) && /* @__PURE__ */ r(
              Zn,
              {
                editorSerializedState: A,
                onSerializedChange: (R) => I(R),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(dt, { children: [
              ft > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (R) => {
                    R.stopPropagation(), D(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (R) => {
                    (R.key === "Enter" || R.key === " ") && (R.preventDefault(), R.stopPropagation(), D(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(ln, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Nt }),
                      V ? /* @__PURE__ */ r(ra, {}) : /* @__PURE__ */ r(Se, {})
                    ] })
                  ]
                }
              ),
              mt.map((R) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                qo,
                {
                  comment: R,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: h,
                  handleDeleteComment: u,
                  onEditingChange: Y,
                  canEditOrDelete: (!P && ut.get(R.id)) ?? !1
                }
              ) }, R.id)),
              v !== !1 && (!P || ee(A)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (R) => R.stopPropagation(),
                  onKeyDownCapture: (R) => {
                    mo(R) && (R.preventDefault(), R.stopPropagation(), (ee(A) || y !== void 0) && kt());
                  },
                  onKeyDown: (R) => {
                    uo(R), (R.key === "Enter" || R.key === " ") && R.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      Zn,
                      {
                        editorSerializedState: A,
                        onSerializedChange: (R) => I(R),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (R) => {
                          O.current = R;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      y !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: qe(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: qn(
                            y,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(ye, { open: X, onOpenChange: et, children: [
                        /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(
                          G,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Tt || !N || N.length === 0 || !N.includes(i),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(ea, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          ue,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (R) => {
                              R.key === "Escape" && (R.stopPropagation(), et(!1));
                            },
                            children: /* @__PURE__ */ r(ve, { children: /* @__PURE__ */ r(xe, { children: N == null ? void 0 : N.map((R) => /* @__PURE__ */ r(
                              ae,
                              {
                                onSelect: () => {
                                  M(R !== s ? R : void 0), et(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: qn(R, n) })
                              },
                              R || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        G,
                        {
                          size: "icon",
                          onClick: kt,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !ee(A) && y === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(na, {})
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
function wu({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: w,
  assignableUsers: c,
  canUserAddCommentToThread: d,
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: N,
  onVerseRefClick: v
}) {
  const [k, _] = S(/* @__PURE__ */ new Set()), [E, C] = S();
  J(() => {
    g && (_((D) => new Set(D).add(g)), C(g));
  }, [g]);
  const B = n.filter(
    (D) => D.comments.some((P) => !P.deleted)
  ), F = B.map((D) => ({ id: D.id })), A = j(
    (D) => {
      _((P) => new Set(P).add(D.id)), C(D.id), N == null || N(D.id);
    },
    [N]
  ), I = j(
    (D) => {
      const P = k.has(D);
      _((Y) => {
        const X = new Set(Y);
        return X.has(D) ? X.delete(D) : X.add(D), X;
      }), C(D), N == null || N(P ? void 0 : D);
    },
    [k, N]
  ), { listboxRef: y, activeId: M, handleKeyDown: $ } = gw({
    options: F,
    onOptionSelect: A
  }), V = j(
    (D) => {
      D.key === "Escape" ? (E && k.has(E) && (_((P) => {
        const Y = new Set(P);
        return Y.delete(E), Y;
      }), C(void 0), N == null || N(void 0)), D.preventDefault(), D.stopPropagation()) : $(D);
    },
    [E, k, $, N]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: y,
      "aria-activedescendant": M ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: B.map((D) => /* @__PURE__ */ r(
        "div",
        {
          className: m({
            "tw-opacity-60": D.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Rw,
            {
              classNameForVerseText: e,
              comments: D.comments,
              localizedStrings: a,
              verseRef: D.verseRef,
              handleSelectThread: I,
              threadId: D.id,
              thread: D,
              isRead: D.isRead,
              isSelected: k.has(D.id),
              currentUser: o,
              assignedUser: D.assignedUser,
              threadStatus: D.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: v
            }
          )
        },
        D.id
      ))
    }
  );
}
function Sw({ table: t }) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(Dl, { asChild: !0, children: /* @__PURE__ */ p(G, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(ii, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(de, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(hn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ae, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        we,
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
const cn = yt.Root, Dw = yt.Group, wn = yt.Value, Mw = Pe(
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
), We = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ p(
    yt.Trigger,
    {
      className: m(Mw({ size: n, className: t })),
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
We.displayName = yt.Trigger.displayName;
const vs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.ScrollUpButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ra, { className: "tw-h-4 tw-w-4" })
  }
));
vs.displayName = yt.ScrollUpButton.displayName;
const xs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.ScrollDownButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Se, { className: "tw-h-4 tw-w-4" })
  }
));
xs.displayName = yt.ScrollDownButton.displayName;
const Je = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = Ct();
  return /* @__PURE__ */ r(yt.Portal, { children: /* @__PURE__ */ p(
    yt.Content,
    {
      ref: a,
      className: m(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(vs, {}),
        /* @__PURE__ */ r(
          yt.Viewport,
          {
            className: m(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(xs, {})
      ]
    }
  ) });
});
Je.displayName = yt.Content.displayName;
const Ow = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.Label,
  {
    ref: n,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Ow.displayName = yt.Label.displayName;
const Zt = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  yt.Item,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(yt.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(yt.ItemText, { children: e })
    ]
  }
));
Zt.displayName = yt.Item.displayName;
const Iw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  yt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Iw.displayName = yt.Separator.displayName;
function Aw({ table: t }) {
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
        cn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(We, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(wn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Je, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Zt, { value: `${e}`, children: e }, e)) })
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
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(li, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(ci, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(wi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(di, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Uo = `
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
function Pw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function On(t, e) {
  const n = e ? `${Uo}, ${e}` : Uo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Pw(o)
  );
}
const ir = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        On(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
          d.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const w = new MutationObserver(() => {
      l();
    });
    return w.observe(i, {
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
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), On(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: m("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
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
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
ir.displayName = "Table";
const lr = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: m(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
lr.displayName = "TableHeader";
const cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", t), ...e }));
cr.displayName = "TableBody";
const $w = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
$w.displayName = "TableFooter";
function Vw(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? On(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function Lw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function jw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const he = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Vw(i);
  const l = b.useMemo(
    () => i.current ? On(i.current) : [],
    [i]
  ), w = b.useCallback(
    (d) => {
      const { current: f } = i;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        On(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = u.indexOf(f), N = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), jw(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Lw(l, N, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const v = f.closest("table");
        v && v.focus();
      }
      e == null || e(d);
    },
    [i, l, e]
  ), c = b.useCallback(
    (d) => {
      o && (n == null || n(d));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: w,
      onFocus: c,
      className: m(
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
he.displayName = "TableRow";
const In = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: m(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
In.displayName = "TableHead";
const Ue = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ue.displayName = "TableCell";
const Fw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Fw.displayName = "TableCaption";
function Ur({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Bw({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: w = !1,
  noResultsMessage: c
}) {
  var F;
  const [d, f] = S([]), [h, u] = S([]), [g, N] = S({}), [v, k] = S({}), _ = q(() => e ?? [], [e]), E = Ea({
    data: _,
    columns: t,
    getCoreRowModel: Ra(),
    ...n && { getPaginationRowModel: Ol() },
    onSortingChange: f,
    getSortedRowModel: Ta(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ml(),
    onColumnVisibilityChange: N,
    onRowSelectionChange: k,
    state: {
      sorting: d,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: v
    }
  }), C = E.getVisibleFlatColumns();
  let B;
  return w ? B = Array.from({ length: 10 }).map((y, M) => `skeleton-row-${M}`).map((y) => /* @__PURE__ */ r(he, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Ue, { colSpan: C.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(Ur, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, y)) : ((F = E.getRowModel().rows) == null ? void 0 : F.length) > 0 ? B = E.getRowModel().rows.map((A) => /* @__PURE__ */ r(
    he,
    {
      onClick: () => i(A, E),
      "data-state": A.getIsSelected() && "selected",
      children: A.getVisibleCells().map((I) => /* @__PURE__ */ r(Ue, { children: En(I.column.columnDef.cell, I.getContext()) }, I.id))
    },
    A.id
  )) : B = /* @__PURE__ */ r(he, { children: /* @__PURE__ */ r(Ue, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Sw, { table: E }),
    /* @__PURE__ */ p(ir, { stickyHeader: s, children: [
      /* @__PURE__ */ r(lr, { stickyHeader: s, children: E.getHeaderGroups().map((A) => /* @__PURE__ */ r(he, { children: A.headers.map((I) => /* @__PURE__ */ r(In, { className: "tw-p-0", children: I.isPlaceholder ? void 0 : En(I.column.columnDef.header, I.getContext()) }, I.id)) }, A.id)) }),
      /* @__PURE__ */ r(cr, { children: B })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Aw, { table: E })
  ] });
}
function du({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = q(
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
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Pl, { options: s, children: e })
    }
  );
}
const zw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Yo = (t, e) => t[e] ?? e;
function Kw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = Yo(n, "%webView_error_dump_header%"), s = Yo(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(G, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(oa, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const pu = Object.freeze([
  ...zw,
  "%webView_error_dump_copied_message%"
]);
function uu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = S(!1), w = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(ye, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: o }),
    /* @__PURE__ */ p(ue, { id: s, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(Et, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Kw,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Gw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Gw || {});
function mu({ id: t, label: e, groups: n }) {
  const [o, a] = S(
    Object.fromEntries(
      n.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = S({}), l = (c, d) => {
    const f = !o[c][d];
    a((u) => (u[c][d] = f, { ...u }));
    const h = n[c].items[d];
    h.onUpdate(h.id, f);
  }, w = (c, d) => {
    i((h) => (h[c] = d, { ...h }));
    const f = n[c].items.find((h) => h.id === d);
    f ? f.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(Ie, { asChild: !0, children: /* @__PURE__ */ p(G, { variant: "default", children: [
      /* @__PURE__ */ r(pi, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Se, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(de, { children: n.map((c, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(hn, { children: c.label }),
      /* @__PURE__ */ r(fs, { children: c.itemType === 0 ? /* @__PURE__ */ r(dt, { children: c.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        we,
        {
          checked: o[d][h],
          onCheckedChange: () => l(d, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ r(
        Ew,
        {
          value: s[d],
          onValueChange: (f) => w(d, f),
          children: c.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(bs, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ r(Ae, {})
    ] }, c.label)) })
  ] }) });
}
function fu({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const w = new Li("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, f) => d + f, 0)), c = () => {
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
            /* @__PURE__ */ r(ui, { className: "tw-h-4 tw-w-4" }),
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
        (a || i) && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            G,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(mi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            G,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(fi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function qw({ id: t, versionHistory: e }) {
  const [n, o] = S(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, f = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(e).sort((l, w) => w[0].localeCompare(l[0]));
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
function hu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = q(() => ji(n), [n]), w = ((c) => {
    const d = new Intl.DisplayNames(Fi(), { type: "language" });
    return c.map((f) => d.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(qw, { versionHistory: a }),
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Hw({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: c = void 0,
  onOpenChange: d = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: N = "ghost",
  id: v
}) {
  const [k, _] = S(!1), E = j(
    (M) => {
      var V;
      const $ = (V = t.find((D) => D.label === M)) == null ? void 0 : V.value;
      $ && n(
        e.includes($) ? e.filter((D) => D !== $) : [...e, $]
      );
    },
    [t, e, n]
  ), C = () => w || o, B = q(() => {
    if (!h) return t;
    const M = t.filter((V) => V.starred).sort((V, D) => V.label.localeCompare(D.label)), $ = t.filter((V) => !V.starred).sort((V, D) => {
      const P = e.includes(V.value), Y = e.includes(D.value);
      return P && !Y ? -1 : !P && Y ? 1 : V.label.localeCompare(D.label);
    });
    return [...M, ...$];
  }, [t, e, h]), F = () => {
    n(t.map((M) => M.value));
  }, A = () => {
    n([]);
  }, I = c ?? k;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ p(ye, { open: I, onOpenChange: d ?? _, children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ p(
      G,
      {
        variant: N,
        role: "combobox",
        "aria-expanded": I,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: C()
              }
            )
          ] }),
          /* @__PURE__ */ r(aa, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ue, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ve, { children: [
      /* @__PURE__ */ r(fn, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(G, { variant: "ghost", size: "sm", onClick: F, children: s }),
        /* @__PURE__ */ r(G, { variant: "ghost", size: "sm", onClick: A, children: i })
      ] }),
      /* @__PURE__ */ p(xe, { children: [
        /* @__PURE__ */ r($n, { children: l }),
        /* @__PURE__ */ r(re, { children: B.map((M) => /* @__PURE__ */ p(
          ae,
          {
            value: M.label,
            onSelect: E,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Qt,
                {
                  className: m(
                    "tw-h-4 tw-w-4",
                    e.includes(M.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              M.starred && /* @__PURE__ */ r(hi, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: M.label }),
              M.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: M.secondaryLabel })
            ]
          },
          M.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function gu({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: w,
  className: c,
  badgesPlaceholder: d,
  id: f
}) {
  return /* @__PURE__ */ p("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Hw,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: w,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var u;
      return /* @__PURE__ */ p(sn, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          G,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(dn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(Et, { children: d })
  ] });
}
const Uw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Xo = (t, e) => t[e] ?? e;
function Yw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const w = q(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
        G,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(gi, {})
        }
      ) }),
      /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ p("p", { children: [
        Xo(a, "%undoButton_tooltip%"),
        s && ` (${w ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
        G,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(bi, {})
        }
      ) }),
      /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ p("p", { children: [
        Xo(a, "%redoButton_tooltip%"),
        s && ` (${w ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Xw({ children: t, editorRef: e }) {
  const n = H(null);
  return J(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, d, f, h;
      if (!a || document.activeElement !== a) return;
      const w = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && w === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (f = e.current) == null || f.undo()) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), (h = e.current) == null || h.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const gn = b.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: m(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
gn.displayName = "Input";
const Ww = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Jw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = H(null), i = H(null), l = H(!1), [w, c] = S(t), [d, f] = S(n), [h, u] = S(!1);
  J(() => {
    c(t);
  }, [t]), J(() => {
    d !== n && f(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (w !== "custom" || d ? (e(w), o(d)) : (c(t), f(n)));
  }, N = (v) => {
    var k, _, E, C;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((k = s.current) == null || k.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((_ = i.current) == null || _.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((E = s.current) == null ? void 0 : E.selectionStart) === 0 && ((C = i.current) == null || C.focus(), l.current = !1), w === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ p(be, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(Ie, { asChild: !0, children: /* @__PURE__ */ r(G, { variant: "outline", className: "tw-h-6", children: Ww(t, a, n) }) }) }),
      /* @__PURE__ */ r(Gt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      de,
      {
        style: { zIndex: Sa },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: N,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(hn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Ae, {}),
          /* @__PURE__ */ r(
            we,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Pr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            we,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: $r })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            we,
            {
              ref: i,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var k;
                v.stopPropagation(), l.current = !0, (k = s.current) == null || k.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  gn,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: d,
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
const Zw = (t, e) => t === "f" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r(ia, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r(la, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(dt, { children: [
  /* @__PURE__ */ r(sa, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Qw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), qe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function td({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(kl, { asChild: !0, children: /* @__PURE__ */ r(Ie, { asChild: !0, children: /* @__PURE__ */ r(G, { variant: "outline", className: "tw-h-6", children: Zw(t, n) }) }) }),
      /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: Qw(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(de, { style: { zIndex: Sa }, children: [
      /* @__PURE__ */ r(hn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Ae, {}),
      /* @__PURE__ */ p(
        we,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(sa, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        we,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ia, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        we,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(la, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const ed = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function nd({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? vi, { className: e, size: 16 });
}
function Wo({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    ae,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(nd, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(Ma, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function rd({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = S(""), [s, i] = q(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const w = e.filter(
      (d) => {
        var f;
        return (f = d.marker) == null ? void 0 : f.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !w.includes(d)
    );
    return [w, c];
  }, [o, e]);
  return /* @__PURE__ */ p(ve, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      fn,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(xe, { children: [
      /* @__PURE__ */ r($n, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(re, { children: s.map((l) => {
        var w;
        return /* @__PURE__ */ r(
          Wo,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ p(dt, { children: [
        s.length > 0 && /* @__PURE__ */ r(no, { alwaysRender: !0 }),
        /* @__PURE__ */ r(re, { children: i.map((l) => {
          var w;
          return /* @__PURE__ */ r(
            Wo,
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
function od(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = zn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[zn[l].description] ?? zn[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function ad(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function sd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const id = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function bu({
  classNameForEditor: t,
  noteOps: e,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: w,
  parentEditorRef: c
}) {
  const d = H(null), f = H(null), h = H(null), u = H(null);
  Xt(() => {
    if (!u.current) return;
    const { width: L } = u.current.getBoundingClientRect();
    L > 0 && (u.current.style.width = `${L}px`);
  }, []);
  const [g, N] = S("generated"), [v, k] = S("*"), [_, E] = S("f"), [C, B] = S(!1), [F, A] = S(!0), [I, y] = S(!1), M = H(!1), $ = H(""), [V, D] = S(!1), [P, Y] = S(), [X, et] = S(), [Tt, $t] = S(), [St, rt] = S(), vt = H(null), K = q(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? $l(), noteMode: "expanded" }
    }),
    [i, l]
  ), st = q(
    () => od(
      d,
      () => D(!1),
      w,
      St
    ),
    [w, St]
  );
  J(() => {
    var L;
    V || (L = d.current) == null || L.focus();
  }, [_, V]), J(() => {
    var nt, it;
    let L;
    M.current = !1, A(!0);
    const W = e == null ? void 0 : e.at(0);
    if (W && Ln("note", W)) {
      const mt = (nt = W.insert.note) == null ? void 0 : nt.caller;
      let ft = "custom";
      mt === Pr ? ft = "generated" : mt === $r ? ft = "hidden" : mt && k(mt), N(ft), E(((it = W.insert.note) == null ? void 0 : it.style) ?? "f"), L = setTimeout(() => {
        var Mt;
        (Mt = d.current) == null || Mt.applyUpdate([W]);
      }, 0);
    }
    return () => {
      L && clearTimeout(L);
    };
  }, [e, s]);
  const lt = j(
    (L, W, nt = !1) => {
      var mt, ft, Mt;
      const it = (ft = (mt = d.current) == null ? void 0 : mt.getNoteOps(0)) == null ? void 0 : ft.at(0);
      if (it && Ln("note", it)) {
        if (it.insert.note) {
          let Nt;
          L === "custom" ? Nt = W : L === "generated" ? Nt = Pr : Nt = $r, it.insert.note.caller = Nt;
        }
        n == null || n([it]), nt && c && s && ((Mt = c.current) == null || Mt.replaceEmbedUpdate(s, [it]));
      }
    },
    [s, n, c]
  ), pt = j(() => {
    lt(g, v, !0), o();
  }, [g, v, o, lt]), ut = H(pt);
  Xt(() => {
    ut.current = pt;
  });
  const Dt = H({ book: a.book, chapterNum: a.chapterNum });
  Xt(() => {
    (Dt.current.book !== a.book || Dt.current.chapterNum !== a.chapterNum) && (Dt.current = { book: a.book, chapterNum: a.chapterNum }, ut.current());
  }, [a.book, a.chapterNum]);
  const Ot = () => {
    var W;
    const L = (W = f.current) == null ? void 0 : W.getElementsByClassName("editor-input")[0];
    L != null && L.textContent && navigator.clipboard.writeText(L.textContent);
  }, Vt = j(
    (L) => {
      N(L), lt(L, v);
    },
    [v, lt]
  ), ke = j(
    (L) => {
      k(L), lt(g, L);
    },
    [g, lt]
  ), O = (L) => {
    var nt, it, mt, ft, Mt;
    E(L);
    const W = (it = (nt = d.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : it.at(0);
    if (W && Ln("note", W)) {
      W.insert.note && (W.insert.note.style = L);
      const Nt = (ft = (mt = W.insert.note) == null ? void 0 : mt.contents) == null ? void 0 : ft.ops;
      _ !== "x" && L === "x" ? Nt == null || Nt.forEach((kt) => ad(kt)) : _ === "x" && L !== "x" && (Nt == null || Nt.forEach((kt) => sd(kt))), (Mt = d.current) == null || Mt.applyUpdate([W, { delete: 1 }]);
    }
  }, Lt = (L) => {
    rt(L.contextMarker), y(L.canRedo);
  }, Jt = j(
    (L) => {
      var nt, it, mt, ft, Mt;
      const W = (it = (nt = d.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : it.at(0);
      if (W && Ln("note", W)) {
        L.content.length > 1 && setTimeout(() => {
          var Rt;
          (Rt = d.current) == null || Rt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (mt = W.insert.note) == null ? void 0 : mt.style, kt = (Mt = (ft = W.insert.note) == null ? void 0 : ft.contents) == null ? void 0 : Mt.ops;
        if (Nt || B(!1), B(
          Nt === "x" ? !!(kt != null && kt.every((Rt) => {
            var _t, xt;
            if (!((_t = Rt.attributes) != null && _t.char)) return !0;
            const R = ((xt = Rt.attributes) == null ? void 0 : xt.char).style;
            return R === "xt" || R === "xo" || R === "xq";
          })) : !!(kt != null && kt.every((Rt) => {
            var _t, xt;
            if (!((_t = Rt.attributes) != null && _t.char)) return !0;
            const R = ((xt = Rt.attributes) == null ? void 0 : xt.char).style;
            return R === "ft" || R === "fr" || R === "fq";
          }))
        ), !M.current) {
          M.current = !0, $.current = JSON.stringify(W), A(!0);
          return;
        }
        A(JSON.stringify(W) === $.current), lt(g, v);
      } else
        B(!1), A(!0);
    },
    [g, v, lt]
  ), jt = j(() => {
    const L = window.getSelection();
    if (h.current && st.length && L && L.rangeCount > 0) {
      const W = L.getRangeAt(0).getBoundingClientRect(), nt = h.current.getBoundingClientRect();
      Y(W.left - nt.left), et(W.top - nt.top), $t(W.height), D(!0);
    }
  }, [st, h]);
  return J(() => {
    const L = () => {
      V && D(!1);
    };
    return window.addEventListener("click", L), () => {
      window.removeEventListener("click", L);
    };
  }, [V]), J(() => {
    var L;
    V && ((L = vt.current) == null || L.focus());
  }, [V]), J(() => {
    var nt;
    const L = ((nt = f.current) == null ? void 0 : nt.querySelector(".editor-input")) ?? void 0, W = (it) => {
      !V && L && document.activeElement === L && it.key === l ? (it.preventDefault(), jt()) : V && it.key === "Escape" && (it.preventDefault(), D(!1));
    };
    return document.addEventListener("keydown", W), () => {
      document.removeEventListener("keydown", W);
    };
  }, [V, jt, l]), /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            td,
            {
              isTypeSwitchable: C,
              noteType: _,
              handleNoteTypeChange: O,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            Jw,
            {
              callerType: g,
              updateCallerType: Vt,
              customCaller: v,
              updateCustomCaller: ke,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Yw,
            {
              onUndoClick: () => {
                var L;
                return (L = d.current) == null ? void 0 : L.undo();
              },
              onRedoClick: () => {
                var L;
                return (L = d.current) == null ? void 0 : L.redo();
              },
              canUndo: !F,
              canRedo: I,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
            /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
              G,
              {
                onClick: pt,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Qt, {})
              }
            ) }),
            /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
            /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(G, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(dn, {}) }) }),
            /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: f,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Xw, { editorRef: d, children: /* @__PURE__ */ r(
              Vl,
              {
                options: K,
                onStateChange: Lt,
                onUsjChange: Jt,
                defaultUsj: id,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
              /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ r(
                G,
                {
                  onClick: Ot,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(oa, {})
                }
              ) }),
              /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ p(ye, { open: V, children: [
      /* @__PURE__ */ r(
        Yl,
        {
          className: "tw-absolute",
          style: {
            top: X,
            left: P,
            height: Tt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        ue,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (L) => {
            L.preventDefault(), L.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            rd,
            {
              markerMenuItems: st,
              localizedStrings: w,
              searchRef: vt
            }
          )
        }
      )
    ] })
  ] });
}
const vu = Object.freeze([
  ...ed,
  ...Object.entries(zn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Uw
]);
function ys(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function ld(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, w) => {
    const c = w === s.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      ho(t, l, n, !0, a),
      c && o
    ] }, ys(t, l));
  });
}
function ho(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Or, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Or, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return cd(
        s,
        ys(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function cd(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Or,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    ho(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function wd({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...l] = t.content);
  const w = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: m("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), f = i && /* @__PURE__ */ p(dt, { children: [
    ho(t.marker, [i], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", N = m(h, u);
  return /* @__PURE__ */ p(dt, { children: [
    /* @__PURE__ */ p("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", N), children: [
      w,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", N), children: f }),
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          N
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(dt, { children: ld(t.marker, l, o, c) })
      }
    )
  ] });
}
function xu({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: c
}) {
  const d = w ?? Bi(n, void 0), f = (_, E) => {
    c == null || c(_, E, a);
  }, h = s ? n.findIndex((_) => _ === s) : -1, [u, g] = S(h), N = (_, E, C) => {
    if (n.length)
      switch (_.key) {
        case "Enter":
        case " ":
          _.preventDefault(), c == null || c(E, C, a);
          break;
      }
  }, v = (_) => {
    if (n.length)
      switch (_.key) {
        case "ArrowDown":
          _.preventDefault(), g((E) => Math.min(E + 1, n.length - 1));
          break;
        case "ArrowUp":
          _.preventDefault(), g((E) => Math.max(E - 1, 0));
          break;
      }
  }, k = H([]);
  return J(() => {
    var _;
    u >= 0 && u < k.current.length && ((_ = k.current[u]) == null || _.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: m("tw-h-full tw-overflow-y-auto", t),
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
          children: n.map((_, E) => {
            const C = _ === s, B = `${a}-${E}`;
            return /* @__PURE__ */ p(dt, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (F) => {
                    k.current[E] = F;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": _.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: E === u ? 0 : -1,
                  className: m(
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
                  onClick: () => f(_, E),
                  onKeyDown: (F) => N(F, _, E),
                  children: /* @__PURE__ */ r(
                    wd,
                    {
                      footnote: _,
                      layout: o,
                      formatCaller: () => d(_.caller, E),
                      showMarkers: i
                    }
                  )
                },
                B
              ),
              E < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(ln, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function dd(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function pd({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = q(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(ir, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(lr, { stickyHeader: !0, children: /* @__PURE__ */ p(he, { children: [
      /* @__PURE__ */ r(In, { children: a }),
      /* @__PURE__ */ r(In, { children: s })
    ] }) }),
    /* @__PURE__ */ r(cr, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ p(
      he,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Ue, { children: ge(l.reference, "English") }),
          /* @__PURE__ */ r(Ue, { className: o, children: dd(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const go = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Vr.Root,
  {
    ref: n,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Vr.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
go.displayName = Vr.Root.displayName;
const ud = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(ki, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(_i, { className: "tw-h-4 tw-w-4" });
}, wr = (t, e, n) => /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
  /* @__PURE__ */ p(
    Ht,
    {
      className: m("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        ud(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Gt, { side: "bottom", children: e })
] }) }), yu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => wr(e, t)
}), md = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => wr(n, t)
}), Nu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => wr(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Tr = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((w) => {
    e === "approved" ? i.includes(w) || i.push(w) : i = i.filter((c) => c !== w);
  }), o(i);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), s(l);
}, ku = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => wr(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(po, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        Sn,
        {
          onClick: (w) => {
            w.stopPropagation(), Tr(
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
          children: /* @__PURE__ */ r(xi, {})
        }
      ),
      /* @__PURE__ */ r(
        Sn,
        {
          onClick: (w) => {
            w.stopPropagation(), Tr(
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
          children: /* @__PURE__ */ r(yi, {})
        }
      ),
      /* @__PURE__ */ r(
        Sn,
        {
          onClick: (w) => {
            w.stopPropagation(), Tr(
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
          children: /* @__PURE__ */ r(Ni, {})
        }
      )
    ] });
  }
}), _u = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Cu = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Eu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, fd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Tu = Object.freeze([
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
]), hd = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, gd = (t, e, n) => t.map((o) => {
  const a = Co(o.key) ? o.key : o.key[0];
  return {
    items: Co(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || fd(a, e, n),
    occurrences: o.occurrences || []
  };
}), le = (t, e) => t[e] ?? e;
function Ru({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: w,
  id: c,
  areInventoryItemsLoading: d = !1,
  classNameForVerseText: f,
  onItemSelected: h
}) {
  const u = le(n, "%webView_inventory_all%"), g = le(n, "%webView_inventory_approved%"), N = le(n, "%webView_inventory_unapproved%"), v = le(n, "%webView_inventory_unknown%"), k = le(n, "%webView_inventory_scope_currentBook%"), _ = le(n, "%webView_inventory_scope_chapter%"), E = le(n, "%webView_inventory_scope_verse%"), C = le(n, "%webView_inventory_filter_text%"), B = le(
    n,
    "%webView_inventory_show_additional_items%"
  ), F = le(n, "%webView_inventory_no_results%"), [A, I] = S(!1), [y, M] = S("all"), [$, V] = S(""), [D, P] = S([]), Y = q(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : gd(K, a, s);
  }, [t, a, s]), X = q(() => {
    if (A) return Y;
    const K = [];
    return Y.forEach((st) => {
      const lt = st.items[0], pt = K.find(
        (ut) => ut.items[0] === lt
      );
      pt ? (pt.count += st.count, pt.occurrences = pt.occurrences.concat(st.occurrences)) : K.push({
        items: [lt],
        count: st.count,
        occurrences: st.occurrences,
        status: st.status
      });
    }), K;
  }, [A, Y]), et = q(() => X.length === 0 ? [] : hd(X, y, $), [X, y, $]), Tt = q(() => {
    var lt, pt;
    if (!A) return w;
    const K = (lt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : lt.length;
    if (!K) return w;
    const st = [];
    for (let ut = 0; ut < K; ut++)
      st.push(
        md(
          ((pt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : pt[ut]) || "Additional Item",
          ut + 1
        )
      );
    return [...st, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, A]);
  J(() => {
    et.length === 0 ? P([]) : et.length === 1 && P(et[0].items);
  }, [et]);
  const $t = (K, st) => {
    st.setRowSelection(() => {
      const pt = {};
      return pt[K.index] = !0, pt;
    });
    const lt = K.original.items;
    P(lt), h && lt.length > 0 && h(lt[0]);
  }, St = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, rt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      M(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, vt = q(() => {
    if (X.length === 0 || D.length === 0) return [];
    const K = X.filter((st) => zi(
      A ? st.items : [st.items[0]],
      D
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [D, A, X]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        cn,
        {
          onValueChange: (K) => rt(K),
          defaultValue: y,
          children: [
            /* @__PURE__ */ r(We, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(wn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Je, { children: [
              /* @__PURE__ */ r(Zt, { value: "all", children: u }),
              /* @__PURE__ */ r(Zt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Zt, { value: "unapproved", children: N }),
              /* @__PURE__ */ r(Zt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(cn, { onValueChange: (K) => St(K), defaultValue: i, children: [
        /* @__PURE__ */ r(We, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(wn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Je, { children: [
          /* @__PURE__ */ r(Zt, { value: "book", children: k }),
          /* @__PURE__ */ r(Zt, { value: "chapter", children: _ }),
          /* @__PURE__ */ r(Zt, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ r(
        gn,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: C,
          value: $,
          onChange: (K) => {
            V(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(Kt, { children: /* @__PURE__ */ p(qt, { children: [
        /* @__PURE__ */ r(Ht, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            go,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: A,
              onCheckedChange: (K) => {
                I(K);
              }
            }
          ),
          /* @__PURE__ */ r(Et, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? B })
        ] }) }),
        /* @__PURE__ */ r(Gt, { children: (o == null ? void 0 : o.checkboxText) ?? B })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Bw,
      {
        columns: Tt,
        data: et,
        onRowClickHandler: $t,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: F
      }
    ) }),
    vt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      pd,
      {
        classNameForText: f,
        occurrenceData: vt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const bd = "16rem", vd = "3rem", Ns = b.createContext(void 0);
function dr() {
  const t = b.useContext(Ns);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ks = b.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, w) => {
    const [c, d] = b.useState(t), f = e ?? c, h = b.useCallback(
      (E) => {
        const C = typeof E == "function" ? E(f) : E;
        n ? n(C) : d(C);
      },
      [n, f]
    ), u = b.useCallback(() => h((E) => !E), [h]), g = f ? "expanded" : "collapsed", k = Ct() === "ltr" ? i : i === "primary" ? "secondary" : "primary", _ = b.useMemo(
      () => ({
        state: g,
        open: f,
        setOpen: h,
        toggleSidebar: u,
        side: k
      }),
      [g, f, h, u, k]
    );
    return /* @__PURE__ */ r(Ns.Provider, { value: _, children: /* @__PURE__ */ r(Kt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": bd,
            "--sidebar-width-icon": vd,
            ...a
          }
        ),
        className: m(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: w,
        ...l,
        children: s
      }
    ) }) });
  }
);
ks.displayName = "SidebarProvider";
const _s = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = dr();
  return e === "none" ? /* @__PURE__ */ r(
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
            className: m(
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
            className: m(
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
_s.displayName = "Sidebar";
const xd = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = dr();
  return /* @__PURE__ */ p(
    G,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(Ci, {}) : /* @__PURE__ */ r(Ei, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
xd.displayName = "SidebarTrigger";
const yd = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = dr();
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
          t
        ),
        ...e
      }
    );
  }
);
yd.displayName = "SidebarRail";
const Cs = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: m(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Cs.displayName = "SidebarInset";
const Nd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  gn,
  {
    ref: n,
    "data-sidebar": "input",
    className: m(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Nd.displayName = "SidebarInput";
const kd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
kd.displayName = "SidebarHeader";
const _d = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
_d.displayName = "SidebarFooter";
const Cd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ln,
  {
    ref: n,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Cd.displayName = "SidebarSeparator";
const Es = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: m(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Es.displayName = "SidebarContent";
const Yr = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Yr.displayName = "SidebarGroup";
const Xr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? pn : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: m(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Xr.displayName = "SidebarGroupLabel";
const Ed = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? pn : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: m(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Ed.displayName = "SidebarGroupAction";
const Wr = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: m("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
Wr.displayName = "SidebarGroupContent";
const Ts = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Ts.displayName = "SidebarMenu";
const Rs = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: m("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Rs.displayName = "SidebarMenuItem";
const Td = Pe(
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
), Ss = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const w = t ? pn : "button", { state: c } = dr(), d = /* @__PURE__ */ r(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: m(Td({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: d }),
      /* @__PURE__ */ r(Gt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : d;
  }
);
Ss.displayName = "SidebarMenuButton";
const Rd = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? pn : "button",
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
      t
    ),
    ...o
  }
));
Rd.displayName = "SidebarMenuAction";
const Sd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
        t
      ),
      ...e
    }
  )
);
Sd.displayName = "SidebarMenuBadge";
const Dd = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(Ur, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          Ur,
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
Dd.displayName = "SidebarMenuSkeleton";
const Md = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: m(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Md.displayName = "SidebarMenuSub";
const Od = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Od.displayName = "SidebarMenuSubItem";
const Id = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? pn : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: m(
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
Id.displayName = "SidebarMenuSubButton";
function Ad({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: w
}) {
  const c = j(
    (h, u) => {
      o(h, u);
    },
    [o]
  ), d = j(
    (h) => {
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), f = j(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    _s,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ p(Es, { children: [
        /* @__PURE__ */ p(Yr, { children: [
          /* @__PURE__ */ r(Xr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Wr, { children: /* @__PURE__ */ r(Ts, { children: Object.entries(e).map(([h, u]) => /* @__PURE__ */ r(Rs, { children: /* @__PURE__ */ r(
            Ss,
            {
              onClick: () => c(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ p(Yr, { children: [
          /* @__PURE__ */ r(Xr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Wr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            zr,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Bl },
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = d(h);
                c(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Ti, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const bo = An(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const w = Ct();
    return /* @__PURE__ */ p("div", { id: i, className: m("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        ta,
        {
          className: m(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        gn,
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
        G,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": w === "rtl" },
            { "tw-right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(dn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
bo.displayName = "SearchBar";
function Su({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: w,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ p("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      bo,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      ks,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Ad,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: w,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ r(Cs, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Ce = "scrBook", Pd = "scrRef", Ge = "source", $d = "details", Vd = "Scripture Reference", Ld = "Scripture Book", Ds = "Type", jd = "Details";
function Fd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Ce,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Vd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Ce ? ge(a.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Ir(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ge(o.start),
      id: Pd,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ge(a.start);
      },
      sortingFn: (o, a) => Ir(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ge,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Ds : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: $d,
      header: (t == null ? void 0 : t.detailsColumnName) ?? jd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Bd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Ir(t.start, t.end) === 0 ? `${mr(t.start)}+${e}` : `${mr(t.start)}+${e}-${mr(t.end)}+${n}`;
}, Jo = (t) => `${Bd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Du({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: w
}) {
  const [c, d] = S([]), [f, h] = S([{ id: Ce, desc: !1 }]), [u, g] = S({}), N = q(
    () => t.flatMap((y) => y.data.map((M) => ({
      ...M,
      source: y.source
    }))),
    [t]
  ), v = q(
    () => Fd(
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
    c.includes(Ge) ? h([
      { id: Ge, desc: !1 },
      { id: Ce, desc: !1 }
    ]) : h([{ id: Ce, desc: !1 }]);
  }, [c]);
  const k = Ea({
    data: N,
    columns: v,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: Al(),
    getGroupedRowModel: Il(),
    getCoreRowModel: Ra(),
    getSortedRowModel: Ta(),
    getRowId: Jo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  J(() => {
    if (l) {
      const y = k.getSelectedRowModel().rowsById, M = Object.keys(y);
      if (M.length === 1) {
        const $ = N.find((V) => Jo(V) === M[0]) || void 0;
        $ && l($);
      }
    }
  }, [u, N, l, k]);
  const _ = a ?? Ld, E = s ?? Ds, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [Ce] },
    { label: `Group by ${E}`, value: [Ge] },
    {
      label: `Group by ${_} and ${E}`,
      value: [Ce, Ge]
    },
    {
      label: `Group by ${E} and ${_}`,
      value: [Ge, Ce]
    }
  ], B = (y) => {
    d(JSON.parse(y));
  }, F = (y, M) => {
    !y.getIsGrouped() && !y.getIsSelected() && y.getToggleSelectedHandler()(M);
  }, A = (y, M) => y.getIsGrouped() ? "" : m("banded-row", M % 2 === 0 ? "even" : "odd"), I = (y, M, $) => {
    if (!((y == null ? void 0 : y.length) === 0 || M.depth < $.column.getGroupedIndex())) {
      if (M.getIsGrouped())
        switch (M.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (M.depth) {
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
      cn,
      {
        value: JSON.stringify(c),
        onValueChange: (y) => {
          B(y);
        },
        children: [
          /* @__PURE__ */ r(We, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(wn, {}) }),
          /* @__PURE__ */ r(Je, { position: "item-aligned", children: /* @__PURE__ */ r(Dw, { children: C.map((y) => /* @__PURE__ */ r(Zt, { value: JSON.stringify(y.value), children: y.label }, y.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(ir, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(lr, { children: k.getHeaderGroups().map((y) => /* @__PURE__ */ r(he, { children: y.headers.filter((M) => M.column.columnDef.header).map((M) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(In, { colSpan: M.colSpan, className: "top-0 tw-sticky", children: M.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          M.column.getCanGroup() ? /* @__PURE__ */ r(
            G,
            {
              variant: "ghost",
              title: `Toggle grouping by ${M.column.columnDef.header}`,
              onClick: M.column.getToggleGroupingHandler(),
              type: "button",
              children: M.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          En(M.column.columnDef.header, M.getContext())
        ] }) }, M.id)
      )) }, y.id)) }),
      /* @__PURE__ */ r(cr, { children: k.getRowModel().rows.map((y, M) => {
        const $ = Ct();
        return /* @__PURE__ */ r(
          he,
          {
            "data-state": y.getIsSelected() ? "selected" : "",
            className: m(A(y, M)),
            onClick: (V) => F(y, V),
            children: y.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== Ge || !n)))
                return /* @__PURE__ */ r(
                  Ue,
                  {
                    className: m(
                      V.column.columnDef.id,
                      "tw-p-[1px]",
                      I(c, y, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ p(
                      G,
                      {
                        variant: "link",
                        onClick: y.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          y.getIsExpanded() && /* @__PURE__ */ r(Se, {}),
                          !y.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(rn, {}) : /* @__PURE__ */ r(Mr, {})),
                          " ",
                          En(V.column.columnDef.cell, V.getContext()),
                          " (",
                          y.subRows.length,
                          ")"
                        ]
                      }
                    ) : En(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          y.id
        );
      }) })
    ] })
  ] });
}
const vo = (t, e) => t.filter((n) => {
  try {
    return Cn(n) === e;
  } catch {
    return !1;
  }
}), Ms = (t, e, n) => vo(t, e).every((o) => n.includes(o));
function zd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = vo(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    G,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Ms(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Ul(
        t,
        i,
        l,
        w,
        c
      )
    }
  );
}
const Zo = 5, Rr = 6;
function Kd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: N } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, k] = S(!1), [_, E] = S(""), C = H(void 0), B = H(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const F = q(() => wt.allBookIds.filter(
    (P, Y) => t[Y] === "1" && !wt.isObsolete(wt.bookIdToNumber(P))
  ), [t]), A = q(() => {
    if (!_.trim()) {
      const X = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return F.forEach((et) => {
        const Tt = Cn(et);
        X[Tt].push(et);
      }), X;
    }
    const P = F.filter(
      (X) => oo(X, _, a)
    ), Y = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return P.forEach((X) => {
      const et = Cn(X);
      Y[et].push(X);
    }), Y;
  }, [F, _, a]), I = j(
    (P, Y = !1) => {
      if (!Y || !C.current) {
        n(
          e.includes(P) ? e.filter((rt) => rt !== P) : [...e, P]
        ), C.current = P;
        return;
      }
      const X = F.findIndex((rt) => rt === C.current), et = F.findIndex((rt) => rt === P);
      if (X === -1 || et === -1) return;
      const [Tt, $t] = [
        Math.min(X, et),
        Math.max(X, et)
      ], St = F.slice(Tt, $t + 1).map((rt) => rt);
      n(
        e.includes(P) ? e.filter((rt) => !St.includes(rt)) : [.../* @__PURE__ */ new Set([...e, ...St])]
      );
    },
    [e, n, F]
  ), y = (P) => {
    I(P, B.current), B.current = !1;
  }, M = (P, Y) => {
    P.preventDefault(), I(Y, P.shiftKey);
  }, $ = j(
    (P) => {
      const Y = vo(F, P).map((X) => X);
      n(
        Ms(F, P, e) ? e.filter((X) => !Y.includes(X)) : [.../* @__PURE__ */ new Set([...e, ...Y])]
      );
    },
    [e, n, F]
  ), V = () => {
    n(F.map((P) => P));
  }, D = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Q).map((P) => /* @__PURE__ */ r(
      zd,
      {
        section: P,
        availableBookIds: F,
        selectedBookIds: e,
        onToggle: $,
        localizedStrings: o
      },
      P
    )) }),
    /* @__PURE__ */ p(
      ye,
      {
        open: v,
        onOpenChange: (P) => {
          k(P), P || E("");
        },
        children: [
          /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ p(
            G,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(aa, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(ue, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ve,
            {
              shouldFilter: !1,
              onKeyDown: (P) => {
                P.key === "Enter" && (B.current = P.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  fn,
                  {
                    placeholder: l,
                    value: _,
                    onValueChange: E
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(G, { variant: "ghost", size: "sm", onClick: V, children: w }),
                  /* @__PURE__ */ r(G, { variant: "ghost", size: "sm", onClick: D, children: c })
                ] }),
                /* @__PURE__ */ p(xe, { children: [
                  /* @__PURE__ */ r($n, { children: d }),
                  Object.values(Q).map((P, Y) => {
                    const X = A[P];
                    if (X.length !== 0)
                      return /* @__PURE__ */ p(Qo, { children: [
                        /* @__PURE__ */ r(
                          re,
                          {
                            heading: Oa(P, h, u, g, N),
                            children: X.map((et) => /* @__PURE__ */ r(
                              Aa,
                              {
                                bookId: et,
                                isSelected: e.includes(et),
                                onSelect: () => y(et),
                                onMouseDown: (Tt) => M(Tt, et),
                                section: Cn(et),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Va(et, a),
                                className: "tw-flex tw-items-center"
                              },
                              et
                            ))
                          }
                        ),
                        Y < Object.values(Q).length - 1 && /* @__PURE__ */ r(no, {})
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
        e.length === Rr ? Rr : Zo
      ).map((P) => /* @__PURE__ */ r(sn, { className: "hover:tw-bg-secondary", variant: "secondary", children: Ee(P, a) }, P)),
      e.length > Rr && /* @__PURE__ */ r(
        sn,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Zo} ${f}`
        }
      )
    ] })
  ] });
}
const Mu = Object.freeze([
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
]), Pt = (t, e) => t[e] ?? e, Gd = Object.freeze([" ", "-"]);
function Ou({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: w,
  variant: c = "radio",
  rangeStart: d,
  rangeEnd: f,
  onRangeStartChange: h,
  onRangeEndChange: u,
  currentScrRef: g,
  onCurrentScrRefChange: N,
  bookChapterControlLocalizedStrings: v,
  getEndVerse: k
}) {
  const _ = Pt(
    i,
    "%webView_scope_selector_selected_text%"
  ), E = Pt(i, "%webView_scope_selector_verse%"), C = Pt(i, "%webView_scope_selector_chapter%"), B = Pt(i, "%webView_scope_selector_book%"), F = Pt(
    i,
    "%webView_scope_selector_current_verse%"
  ), A = Pt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), I = Pt(i, "%webView_scope_selector_current_book%"), y = Pt(i, "%webView_scope_selector_choose_books%"), M = Pt(i, "%webView_scope_selector_scope%"), $ = Pt(i, "%webView_scope_selector_select_books%"), V = Pt(i, "%webView_scope_selector_range%"), D = Pt(i, "%webView_scope_selector_select_range%"), P = Pt(i, "%webView_scope_selector_range_start%"), Y = Pt(i, "%webView_scope_selector_range_end%"), X = Pt(i, "%webView_scope_selector_ok%"), et = Pt(i, "%webView_scope_selector_navigate%"), Tt = (T) => {
    if (!g) return;
    const z = g.book.toUpperCase();
    switch (T) {
      case "verse":
        return ge(g, "id");
      case "chapter":
        return `${z} ${g.chapterNum}`;
      case "book":
        return z;
      default:
        return;
    }
  }, $t = [
    { value: "selectedText", label: _, id: "scope-selected-text" },
    {
      value: "verse",
      label: E,
      dropdownLabel: F,
      scrRefSuffix: Tt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: C,
      dropdownLabel: A,
      scrRefSuffix: Tt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: B,
      dropdownLabel: I,
      scrRefSuffix: Tt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: y, id: "scope-selected" },
    { value: "range", label: V, id: "scope-range" }
  ], St = (T, z, Z = !1) => /* @__PURE__ */ p(dt, { children: [
    T,
    z && !Z && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
      ": ",
      z
    ] })
  ] }), rt = e ? $t.filter((T) => e.includes(T.value)) : $t, vt = g ?? fr, K = d ?? vt, st = f ?? vt, lt = () => {
  }, pt = H(null), ut = H(null), Dt = H(!1), Ot = H(null), Vt = H(!1), [ke, O] = S(void 0), Lt = H(!1), Jt = H(!1), jt = H(null), L = j((T) => {
    if (T) {
      O("start"), Lt.current = !1;
      return;
    }
    O((z) => z === "start" ? void 0 : z), Lt.current && (Lt.current = !1, requestAnimationFrame(() => {
      var Z;
      const z = (Z = pt.current) == null ? void 0 : Z.querySelector("button");
      z == null || z.click();
    }));
  }, []), W = j((T) => {
    if (T) {
      O("end"), Jt.current = !1;
      return;
    }
    O((z) => z === "end" ? void 0 : z);
  }, []), nt = j(
    (T) => {
      h == null || h(T), u == null || u(T), Lt.current = !0;
    },
    [h, u]
  ), it = j(
    (T) => {
      u == null || u(T), Jt.current = !0;
    },
    [u]
  ), mt = j(
    (T) => {
      n(T), T === "selectedBooks" && a.length === 0 && (g != null && g.book) && s([g.book]);
    },
    [n, a, g, s]
  ), ft = rt.find((T) => T.value === t), Mt = () => t === "selectedBooks" && a.length > 0 ? a.map((T) => T.toUpperCase()).join(", ") : t === "range" ? Ki(K, st, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : ft ? St(ft.label, ft.scrRefSuffix) : t, Nt = rt.filter(
    (T) => T.value !== "selectedBooks" && T.value !== "range"
  ), kt = rt.find((T) => T.value === "selectedBooks"), Rt = rt.find((T) => T.value === "range"), R = /* @__PURE__ */ r(
    Kd,
    {
      availableBookInfo: o,
      selectedBookIds: a,
      onChangeSelectedBookIds: s,
      localizedStrings: i,
      localizedBookNames: l
    }
  ), _t = ke === "end", xt = ke === "start", fe = "tw-text-muted-foreground", Ve = /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-wrap tw-items-end tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-start", className: m(_t && fe), children: P }),
      /* @__PURE__ */ r(
        br,
        {
          id: "scope-range-start",
          scrRef: K,
          handleSubmit: nt,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: k,
          submitKeys: Gd,
          onOpenChange: L,
          className: m(_t && fe),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { ref: pt, className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { htmlFor: "scope-range-end", className: m(xt && fe), children: Y }),
      /* @__PURE__ */ r(
        br,
        {
          id: "scope-range-end",
          scrRef: st,
          handleSubmit: u ? it : lt,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: k,
          disableReferencesUpTo: K,
          onOpenChange: W,
          onCloseAutoFocus: (T) => {
            var z;
            Jt.current && (Jt.current = !1, T.preventDefault(), (z = jt.current) == null || z.focus());
          },
          className: m(xt && fe),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), [Ze, bn] = S(!1), [vn, Le] = S(void 0), xn = H({}), Qe = j(
    (T) => (z) => {
      xn.current[T] = z;
    },
    []
  ), yn = H(null);
  J(() => {
    if (!Ze) return;
    let T = 0;
    const z = requestAnimationFrame(() => {
      T = requestAnimationFrame(() => {
        var Z;
        (Z = xn.current[t]) == null || Z.focus();
      });
    });
    return () => {
      cancelAnimationFrame(z), T && cancelAnimationFrame(T);
    };
  }, [Ze, t]);
  const [je, pr] = S(null), [tn, ur] = S(null), [x, U] = S(null), tt = 200, [Ft, _e] = S(!1);
  J(() => {
    if (!x || typeof ResizeObserver > "u") return;
    const T = new ResizeObserver(([z]) => {
      _e(z.contentRect.width < tt);
    });
    return T.observe(x), () => T.disconnect();
  }, [x]);
  const Fe = j(
    (T) => {
      mt(T), bn(!1), Le(T);
    },
    [mt]
  ), Be = j((T) => {
    var z;
    T.preventDefault(), (z = yn.current) == null || z.focus();
  }, []), It = (T) => t === T ? /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) : void 0;
  return /* @__PURE__ */ p("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { children: M }),
      c === "dropdown" ? /* @__PURE__ */ p(be, { open: Ze, onOpenChange: bn, children: [
        /* @__PURE__ */ r(Ie, { asChild: !0, children: /* @__PURE__ */ p(
          G,
          {
            ref: yn,
            variant: "outline",
            role: "combobox",
            className: "tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",
            children: [
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: Mt() }),
              /* @__PURE__ */ r(Se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ r(
          de,
          {
            ref: U,
            className: "tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ p(hr, { container: x, children: [
              Nt.map(({ value: T, label: z, dropdownLabel: Z, scrRefSuffix: At, id: ie }) => /* @__PURE__ */ r(
                we,
                {
                  ref: Qe(T),
                  checked: t === T,
                  onCheckedChange: (ze) => {
                    ze && mt(T);
                  },
                  children: St(Z ?? z, At, Ft)
                },
                ie
              )),
              (kt || Rt) && /* @__PURE__ */ r(Ae, {}),
              kt && /* @__PURE__ */ p(
                He,
                {
                  ref: Qe("selectedBooks"),
                  className: m("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),
                  onSelect: () => Fe("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    It("selectedBooks"),
                    `${kt.label}…`
                  ]
                }
              ),
              Rt && /* @__PURE__ */ p(
                He,
                {
                  ref: Qe("range"),
                  className: m("tw-relative tw-ps-8 focus:tw-text-accent-foreground"),
                  onSelect: () => Fe("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    It("range"),
                    `${Rt.label}…`
                  ]
                }
              ),
              N && /* @__PURE__ */ p(dt, { children: [
                /* @__PURE__ */ r(Ae, {}),
                /* @__PURE__ */ r(hn, { className: "tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground", children: et }),
                /* @__PURE__ */ r(
                  He,
                  {
                    ref: Ot,
                    className: "tw-p-0",
                    onSelect: (T) => {
                      var z, Z;
                      if (T.preventDefault(), Dt.current) {
                        Dt.current = !1;
                        return;
                      }
                      Vt.current || (Z = (z = ut.current) == null ? void 0 : z.querySelector("button")) == null || Z.click();
                    },
                    children: /* @__PURE__ */ r(
                      "div",
                      {
                        ref: ut,
                        className: "tw-w-full tw-px-1 tw-pb-1",
                        onPointerDownCapture: (T) => {
                          const z = T.target instanceof HTMLElement ? T.target : void 0;
                          z != null && z.closest("button") && (Dt.current = !0, requestAnimationFrame(() => {
                            Dt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ r(
                          br,
                          {
                            id: "scope-navigate",
                            scrRef: g ?? fr,
                            handleSubmit: N,
                            localizedBookNames: l,
                            localizedStrings: v,
                            getEndVerse: k,
                            triggerVariant: "ghost",
                            onOpenChange: (T) => {
                              Vt.current = T;
                            },
                            onCloseAutoFocus: (T) => {
                              var z;
                              T.preventDefault(), (z = Ot.current) == null || z.focus();
                            },
                            modal: !0,
                            className: "tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",
                            triggerContent: /* @__PURE__ */ p(dt, { children: [
                              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1 tw-truncate tw-text-start", children: ge(g ?? fr, "id") }),
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
        ao,
        {
          value: t,
          onValueChange: mt,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: rt.map(({ value: T, label: z, scrRefSuffix: Z, id: At }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jn, { className: "tw-me-2", value: T, id: At }),
            /* @__PURE__ */ r(Et, { htmlFor: At, children: St(z, Z) })
          ] }, At))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Et, { children: $ }),
      R
    ] }),
    c === "radio" && t === "range" && Ve,
    c === "dropdown" && kt && /* @__PURE__ */ r(
      Fr,
      {
        open: vn === "selectedBooks",
        onOpenChange: (T) => {
          T || Le(void 0);
        },
        children: /* @__PURE__ */ r(
          Yn,
          {
            ref: ur,
            onCloseAutoFocus: Be,
            onEscapeKeyDown: (T) => {
              tn != null && tn.querySelector('[data-state="open"]') && T.preventDefault();
            },
            children: /* @__PURE__ */ p(hr, { container: tn, children: [
              /* @__PURE__ */ r(Xn, { className: "tw-pe-8", children: /* @__PURE__ */ r(Wn, { children: y }) }),
              R,
              /* @__PURE__ */ r(Br, { children: /* @__PURE__ */ r(G, { onClick: () => Le(void 0), children: X }) })
            ] })
          }
        )
      }
    ),
    c === "dropdown" && Rt && /* @__PURE__ */ r(
      Fr,
      {
        open: vn === "range",
        onOpenChange: (T) => {
          T || Le(void 0);
        },
        children: /* @__PURE__ */ r(
          Yn,
          {
            ref: pr,
            onCloseAutoFocus: Be,
            onEscapeKeyDown: (T) => {
              je != null && je.querySelector('[data-state="open"]') && T.preventDefault();
            },
            children: /* @__PURE__ */ p(hr, { container: je, children: [
              /* @__PURE__ */ r(Xn, { className: "tw-pe-8", children: /* @__PURE__ */ r(Wn, { children: D }) }),
              Ve,
              /* @__PURE__ */ r(Br, { children: /* @__PURE__ */ r(G, { ref: jt, onClick: () => Le(void 0), children: X }) })
            ] })
          }
        )
      }
    )
  ] });
}
const Sr = {
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
function Iu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Sr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, d]) => [
          c,
          c === d && c in Sr ? Sr[c] : d
        ]
      )
    )
  }, w = Ct();
  return /* @__PURE__ */ p(
    cn,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(We, { size: a, className: m("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          wn,
          {
            placeholder: l[at(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Je,
          {
            id: i,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: mn },
            children: t.map((c) => /* @__PURE__ */ r(Zt, { value: `${c}`, children: l[at(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Au({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Pu({
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
function $u({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(ln, {}) : ""
  ] });
}
function Os(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function tr({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Is = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ p(qt, { children: [
  /* @__PURE__ */ r(Ht, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    He,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(tr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(tr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Cw, { children: [
    /* @__PURE__ */ r(hs, { children: l.label }),
    /* @__PURE__ */ r(_w, { children: /* @__PURE__ */ r(gs, { children: Is(
      t,
      e,
      Os(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Gt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function Jr({
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
    /* @__PURE__ */ r(Ie, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(G, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Ri, {}) }) }),
    /* @__PURE__ */ r(de, { align: "start", style: { zIndex: mn }, children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ p(Qo, { children: [
      /* @__PURE__ */ r(fs, { children: /* @__PURE__ */ r(Kt, { children: Is(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ r(Ae, {})
    ] }, w)) })
  ] });
}
const As = b.forwardRef(
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
function Vu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: w,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ p(As, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      Jr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(Si, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        Jr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Di, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function Lu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(As, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    Jr,
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
const Ps = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Yt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ps.displayName = Yt.List.displayName;
const $s = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.List,
  {
    ref: n,
    className: m(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
$s.displayName = Yt.List.displayName;
const qd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Trigger,
  {
    ref: n,
    ...e,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Vs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Content,
  {
    ref: n,
    className: m(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Vs.displayName = Yt.Content.displayName;
function ju({
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
        bo,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(Ps, { children: [
      /* @__PURE__ */ r($s, { children: t.map((l) => /* @__PURE__ */ r(qd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Vs, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Hd({ ...t }) {
  return /* @__PURE__ */ r(gt.Menu, { ...t });
}
function Ud({ ...t }) {
  return /* @__PURE__ */ r(gt.Sub, { "data-slot": "menubar-sub", ...t });
}
const Ls = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(fo.Provider, { value: a, children: /* @__PURE__ */ r(
    gt.Root,
    {
      ref: o,
      className: m(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
Ls.displayName = gt.Root.displayName;
const js = b.forwardRef(({ className: t, ...e }, n) => {
  const o = se();
  return /* @__PURE__ */ r(
    gt.Trigger,
    {
      ref: n,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ne({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
js.displayName = gt.Trigger.displayName;
const Fs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = se();
  return /* @__PURE__ */ p(
    gt.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Ne({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(rn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Fs.displayName = gt.SubTrigger.displayName;
const Bs = b.forwardRef(({ className: t, ...e }, n) => {
  const o = se();
  return /* @__PURE__ */ r(
    gt.SubContent,
    {
      ref: n,
      className: m(
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
Bs.displayName = gt.SubContent.displayName;
const zs = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = se();
  return /* @__PURE__ */ r(gt.Portal, { children: /* @__PURE__ */ r(
    gt.Content,
    {
      ref: s,
      align: e,
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
        t
      ),
      ...a
    }
  ) });
});
zs.displayName = gt.Content.displayName;
const Ks = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = se();
  return /* @__PURE__ */ r(
    gt.Item,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Ne({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Ks.displayName = gt.Item.displayName;
const Yd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = se();
  return /* @__PURE__ */ p(
    gt.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ne({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(gt.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Yd.displayName = gt.CheckboxItem.displayName;
const Xd = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = se();
  return /* @__PURE__ */ p(
    gt.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ne({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(gt.ItemIndicator, { children: /* @__PURE__ */ r(nr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Xd.displayName = gt.RadioItem.displayName;
const Wd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  gt.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Wd.displayName = gt.Label.displayName;
const Gs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  gt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Gs.displayName = gt.Separator.displayName;
const kn = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, qs = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ p(qt, { children: [
      /* @__PURE__ */ r(Ht, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        Ks,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(tr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(tr, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ p(Ud, { children: [
        /* @__PURE__ */ r(Fs, { children: c.label }),
        /* @__PURE__ */ r(Bs, { children: qs(
          t,
          e,
          Os(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Gt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && i < a.length - 1 && w.push(/* @__PURE__ */ r(Gs, {}, `separator-${s}`)), w;
  });
};
function Jd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), s = H(void 0), i = H(void 0), l = H(void 0), w = H(void 0), c = (d) => {
    switch (d) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return w;
      default:
        return;
    }
  };
  if (Ll(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, f) => {
    var g, N, v, k;
    d.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        kn(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), kn(s, [h, u]);
        break;
      case "alt+l":
        (N = i.current) == null || N.focus(), kn(i, [h, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), kn(l, [h, u]);
        break;
      case "alt+h":
        (k = w.current) == null || k.focus(), kn(w, [h, u]);
        break;
    }
  }), J(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const N = g.target.getAttribute("data-state");
          n(N === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Ls, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, f]) => typeof d == "boolean" || typeof f == "boolean" ? 0 : d.order - f.order).map(([d, f]) => /* @__PURE__ */ p(Hd, { children: [
      /* @__PURE__ */ r(js, { ref: c(d), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ r(
        zs,
        {
          style: { zIndex: mn },
          children: /* @__PURE__ */ r(Kt, { children: qs(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Fu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Bu({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: w,
  menubarVariant: c = "default"
}) {
  const d = H(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-border tw-px-4 tw-text-foreground", o),
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
                  i,
                  t && /* @__PURE__ */ r(
                    Jd,
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
                children: s
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
const Zd = (t, e) => t[e] ?? e;
function zu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: w
}) {
  const c = Zd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, f] = S(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((N) => N !== g)]), s && n.find((N) => N === g) && s([...n.filter((N) => N !== g)]), f(!1);
  }, u = (g, N) => {
    var k, _, E, C, B, F;
    const v = N !== g ? ((_ = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : _[N]) ?? ((C = (E = t[g]) == null ? void 0 : E.uiNames) == null ? void 0 : C.en) : void 0;
    return v ? `${(B = t[g]) == null ? void 0 : B.autonym} (${v})` : (F = t[g]) == null ? void 0 : F.autonym;
  };
  return /* @__PURE__ */ p("div", { id: w, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      cn,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: d,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ r(We, { children: /* @__PURE__ */ r(wn, {}) }),
          /* @__PURE__ */ r(
            Je,
            {
              style: { zIndex: mn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Zt, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(Et, { className: "tw-font-normal tw-text-muted-foreground", children: qe(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Qd({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Et, { children: e(t) }) : n ? /* @__PURE__ */ r(Et, { children: n(t) }) : /* @__PURE__ */ r(Et, { children: t });
}
function Ku({
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
      go,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ r(
      Qd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Gu({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  selectedButtons: l,
  hoverButtons: w,
  dropdownContent: c,
  additionalContent: d,
  accentColor: f,
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
      className: m(
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
            !e && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: w }),
            !e && h && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(Ie, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(G, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(_o, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(Ie, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(G, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(_o, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
            ] })
          ] }),
          d && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: d })
        ] }),
        f && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${f}`
          }
        )
      ]
    },
    t
  );
}
const tp = An(({ className: t, ...e }, n) => /* @__PURE__ */ r(Mi, { size: 35, className: m("tw-animate-spin", t), ...e, ref: n }));
tp.displayName = "Spinner";
function qu({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: w,
  defaultValue: c,
  value: d,
  onChange: f,
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      Et,
      {
        htmlFor: t,
        className: m({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      gn,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: m(w, { "tw-border-red-600": n }),
        defaultValue: c,
        value: d,
        onChange: f,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: m({ "tw-hidden": !a }), children: a })
  ] });
}
const ep = Pe(
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
), np = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: m(
      // CUSTOM
      "pr-twp",
      ep({ variant: e }),
      t
    ),
    ...n
  }
));
np.displayName = "Alert";
const rp = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ p(
    "h5",
    {
      ref: n,
      className: m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
rp.displayName = "AlertTitle";
const op = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
op.displayName = "AlertDescription";
const Hu = bt.Root, Uu = bt.Trigger, Yu = bt.Group, Xu = bt.Portal, Wu = bt.Sub, Ju = bt.RadioGroup, ap = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  bt.SubTrigger,
  {
    ref: a,
    className: m(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(rn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
ap.displayName = bt.SubTrigger.displayName;
const sp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  bt.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
sp.displayName = bt.SubContent.displayName;
const ip = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(bt.Portal, { children: /* @__PURE__ */ r(
  bt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
ip.displayName = bt.Content.displayName;
const lp = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  bt.Item,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
lp.displayName = bt.Item.displayName;
const cp = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  bt.CheckboxItem,
  {
    ref: a,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(bt.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
cp.displayName = bt.CheckboxItem.displayName;
const wp = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  bt.RadioItem,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(bt.ItemIndicator, { children: /* @__PURE__ */ r(nr, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
wp.displayName = bt.RadioItem.displayName;
const dp = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  bt.Label,
  {
    ref: o,
    className: m(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
dp.displayName = bt.Label.displayName;
const pp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  bt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
pp.displayName = bt.Separator.displayName;
function up({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
up.displayName = "ContextMenuShortcut";
const Hs = b.createContext({
  direction: "bottom"
});
function mp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Hs.Provider, { value: o, children: /* @__PURE__ */ r(
    oe.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
mp.displayName = "Drawer";
const Zu = oe.Trigger, fp = oe.Portal, Qu = oe.Close, Us = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  oe.Overlay,
  {
    ref: n,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Us.displayName = oe.Overlay.displayName;
const hp = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(Hs), i = {
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
  return /* @__PURE__ */ p(fp, { children: [
    /* @__PURE__ */ r(Us, {}),
    /* @__PURE__ */ p(
      oe.Content,
      {
        ref: a,
        className: m(
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
hp.displayName = "DrawerContent";
function gp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
gp.displayName = "DrawerHeader";
function bp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
bp.displayName = "DrawerFooter";
const vp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  oe.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
vp.displayName = oe.Title.displayName;
const xp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  oe.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
xp.displayName = oe.Description.displayName;
const yp = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Lr.Root,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Lr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
yp.displayName = Lr.Root.displayName;
function tm({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    eo.PanelGroup,
    {
      className: m(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const em = eo.Panel;
function nm({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    eo.PanelResizeHandle,
    {
      className: m(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(Oi, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function rm({ ...t }) {
  return /* @__PURE__ */ r(
    jl,
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
const Np = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ p(
    _n.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(_n.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(_n.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(_n.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Np.displayName = _n.Root.displayName;
const kp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    jr.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        jr.Thumb,
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
kp.displayName = jr.Root.displayName;
const om = Yt.Root, _p = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ct();
  return /* @__PURE__ */ r(
    Yt.List,
    {
      ref: n,
      className: m(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
_p.displayName = Yt.List.displayName;
const Cp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Trigger,
  {
    ref: n,
    className: m(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Cp.displayName = Yt.Trigger.displayName;
const Ep = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ep.displayName = Yt.Content.displayName;
const Tp = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: m(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Tp.displayName = "Textarea";
const am = (t, e) => {
  J(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Rp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Sp = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = Rp(a.current);
  const [s, i] = S(() => o.current), [l, w] = S(!0);
  return J(() => {
    let c = !0;
    return w(!!t), (async () => {
      if (t) {
        const d = await t();
        c && (i(() => d), w(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, l];
}, Dr = () => !1, sm = (t, e) => {
  const [n] = Sp(
    j(async () => {
      if (!t) return Dr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Dr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  J(() => () => {
    n !== Dr && n();
  }, [n]);
};
function im(t) {
  J(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Dp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Dp(`*, ::before, ::after {
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
  np as Alert,
  op as AlertDescription,
  rp as AlertTitle,
  us as Avatar,
  ms as AvatarFallback,
  kw as AvatarImage,
  ou as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  au as BOOK_SELECTOR_STRING_KEYS,
  sn as Badge,
  br as BookChapterControl,
  Kr as BookSelectionMode,
  su as BookSelector,
  G as Button,
  lu as COMMENT_EDITOR_STRING_KEYS,
  cu as COMMENT_LIST_STRING_KEYS,
  ds as Card,
  ps as CardContent,
  yw as CardDescription,
  Nw as CardFooter,
  vw as CardHeader,
  xw as CardTitle,
  rc as ChapterRangeSelector,
  go as Checkbox,
  Ku as Checklist,
  zr as ComboBox,
  ve as Command,
  $n as CommandEmpty,
  re as CommandGroup,
  fn as CommandInput,
  ae as CommandItem,
  xe as CommandList,
  iu as CommentEditor,
  wu as CommentList,
  Hu as ContextMenu,
  cp as ContextMenuCheckboxItem,
  ip as ContextMenuContent,
  Yu as ContextMenuGroup,
  lp as ContextMenuItem,
  dp as ContextMenuLabel,
  Xu as ContextMenuPortal,
  Ju as ContextMenuRadioGroup,
  wp as ContextMenuRadioItem,
  pp as ContextMenuSeparator,
  up as ContextMenuShortcut,
  Wu as ContextMenuSub,
  sp as ContextMenuSubContent,
  ap as ContextMenuSubTrigger,
  Uu as ContextMenuTrigger,
  Bw as DataTable,
  Fr as Dialog,
  nu as DialogClose,
  Yn as DialogContent,
  Hl as DialogDescription,
  Br as DialogFooter,
  Xn as DialogHeader,
  Da as DialogOverlay,
  ql as DialogPortal,
  Wn as DialogTitle,
  eu as DialogTrigger,
  mp as Drawer,
  Qu as DrawerClose,
  hp as DrawerContent,
  xp as DrawerDescription,
  bp as DrawerFooter,
  gp as DrawerHeader,
  Us as DrawerOverlay,
  fp as DrawerPortal,
  vp as DrawerTitle,
  Zu as DrawerTrigger,
  be as DropdownMenu,
  we as DropdownMenuCheckboxItem,
  de as DropdownMenuContent,
  fs as DropdownMenuGroup,
  He as DropdownMenuItem,
  Gw as DropdownMenuItemType,
  hn as DropdownMenuLabel,
  _w as DropdownMenuPortal,
  Ew as DropdownMenuRadioGroup,
  bs as DropdownMenuRadioItem,
  Ae as DropdownMenuSeparator,
  Tw as DropdownMenuShortcut,
  Cw as DropdownMenuSub,
  gs as DropdownMenuSubContent,
  hs as DropdownMenuSubTrigger,
  Ie as DropdownMenuTrigger,
  zw as ERROR_DUMP_STRING_KEYS,
  pu as ERROR_POPOVER_STRING_KEYS,
  Xw as EditorKeyboardShortcuts,
  Kw as ErrorDump,
  uu as ErrorPopover,
  vu as FOOTNOTE_EDITOR_STRING_KEYS,
  gu as Filter,
  mu as FilterDropdown,
  hu as Footer,
  bu as FootnoteEditor,
  wd as FootnoteItem,
  xu as FootnoteList,
  Tu as INVENTORY_STRING_KEYS,
  gn as Input,
  Ru as Inventory,
  Et as Label,
  ed as MARKER_MENU_STRING_KEYS,
  du as MarkdownRenderer,
  rd as MarkerMenu,
  fu as MoreInfo,
  Hw as MultiSelectComboBox,
  ju as NavigationContentSearch,
  ye as Popover,
  Yl as PopoverAnchor,
  ue as PopoverContent,
  hr as PopoverPortalContainerProvider,
  $e as PopoverTrigger,
  yp as Progress,
  ao as RadioGroup,
  Jn as RadioGroupItem,
  Xl as RecentSearches,
  nm as ResizableHandle,
  em as ResizablePanel,
  tm as ResizablePanelGroup,
  Gu as ResultsCard,
  Mu as SCOPE_SELECTOR_STRING_KEYS,
  Ou as ScopeSelector,
  Du as ScriptureResultsViewer,
  Iu as ScrollGroupSelector,
  bo as SearchBar,
  cn as Select,
  Je as SelectContent,
  Dw as SelectGroup,
  Zt as SelectItem,
  Ow as SelectLabel,
  xs as SelectScrollDownButton,
  vs as SelectScrollUpButton,
  Iw as SelectSeparator,
  We as SelectTrigger,
  wn as SelectValue,
  ln as Separator,
  Au as SettingsList,
  $u as SettingsListHeader,
  Pu as SettingsListItem,
  Ad as SettingsSidebar,
  Su as SettingsSidebarContentSearch,
  _s as Sidebar,
  Es as SidebarContent,
  _d as SidebarFooter,
  Yr as SidebarGroup,
  Ed as SidebarGroupAction,
  Wr as SidebarGroupContent,
  Xr as SidebarGroupLabel,
  kd as SidebarHeader,
  Nd as SidebarInput,
  Cs as SidebarInset,
  Ts as SidebarMenu,
  Rd as SidebarMenuAction,
  Sd as SidebarMenuBadge,
  Ss as SidebarMenuButton,
  Rs as SidebarMenuItem,
  Dd as SidebarMenuSkeleton,
  Md as SidebarMenuSub,
  Id as SidebarMenuSubButton,
  Od as SidebarMenuSubItem,
  ks as SidebarProvider,
  yd as SidebarRail,
  Cd as SidebarSeparator,
  xd as SidebarTrigger,
  Ur as Skeleton,
  Np as Slider,
  rm as Sonner,
  tp as Spinner,
  kp as Switch,
  Jr as TabDropdownMenu,
  Lu as TabFloatingMenu,
  Vu as TabToolbar,
  ir as Table,
  cr as TableBody,
  Fw as TableCaption,
  Ue as TableCell,
  $w as TableFooter,
  In as TableHead,
  lr as TableHeader,
  he as TableRow,
  om as Tabs,
  Ep as TabsContent,
  _p as TabsList,
  Cp as TabsTrigger,
  qu as TextField,
  Tp as Textarea,
  po as ToggleGroup,
  Sn as ToggleGroupItem,
  Bu as Toolbar,
  qt as Tooltip,
  Gt as TooltipContent,
  Kt as TooltipProvider,
  Ht as TooltipTrigger,
  Uw as UNDO_REDO_BUTTONS_STRING_KEYS,
  zu as UiLanguageSelector,
  Yw as UndoRedoButtons,
  Ps as VerticalTabs,
  Vs as VerticalTabsContent,
  $s as VerticalTabsList,
  qd as VerticalTabsTrigger,
  mn as Z_INDEX_ABOVE_DOCK,
  Sa as Z_INDEX_FOOTNOTE_EDITOR,
  Kl as Z_INDEX_MODAL,
  zl as Z_INDEX_MODAL_BACKDROP,
  Bl as Z_INDEX_OVERLAY,
  bw as badgeVariants,
  Pa as buttonVariants,
  m as cn,
  Eu as getBookIdFromUSFM,
  wr as getInventoryHeader,
  _u as getLinesFromUSFM,
  Cu as getNumberFromUSFM,
  fd as getStatusForItem,
  Fu as getToolbarOSReservedSpaceClassName,
  Nu as inventoryCountColumn,
  yu as inventoryItemColumn,
  ku as inventoryStatusColumn,
  Mw as selectTriggerVariants,
  wm as sonner,
  am as useEvent,
  sm as useEventAsync,
  gw as useListbox,
  Sp as usePromise,
  ru as useRecentSearches,
  dr as useSidebar,
  im as useStylesheet
};
//# sourceMappingURL=index.js.map
