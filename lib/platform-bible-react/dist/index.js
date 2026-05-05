var Os = Object.defineProperty;
var Is = (t, e, n) => e in t ? Os(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Et = (t, e, n) => Is(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as it } from "react/jsx-runtime";
import v, { forwardRef as fn, useRef as U, useMemo as j, useState as D, useCallback as z, useLayoutEffect as Bt, createContext as Ln, useContext as Tr, useEffect as q, Component as As, createElement as Jr, Suspense as Ps, Fragment as Oo } from "react";
import { Command as Dt } from "cmdk";
import { X as hn, Search as Io, Check as ne, Clock as Zr, ChevronsLeft as Qr, ChevronsRight as to, ChevronLeft as sr, ChevronRight as Ke, ArrowLeft as $s, ArrowRight as Ls, Circle as Vn, ChevronDown as Xe, BoldIcon as Vs, ItalicIcon as js, AtSign as Ao, Pencil as Fs, Trash2 as zs, ArrowUp as Po, MoreHorizontal as Bs, MailOpen as Ks, Mail as Gs, ChevronUp as $o, FilterIcon as Us, ArrowLeftIcon as qs, ChevronLeftIcon as Hs, ChevronRightIcon as Ys, ArrowRightIcon as Xs, Copy as Lo, Filter as Ws, User as Js, Link as Zs, CircleHelp as Qs, ChevronsUpDown as Vo, Star as ti, Undo as ei, Redo as ni, SquareX as jo, FunctionSquare as Fo, SquareSigma as zo, Ban as ri, AlertCircle as ir, CircleCheckIcon as oi, CircleXIcon as ai, CircleHelpIcon as si, ArrowUpIcon as ii, ArrowDownIcon as li, PanelLeft as ci, PanelRight as wi, ScrollText as di, MenuIcon as pi, Menu as ui, EllipsisVertical as mi, MoreVertical as eo, LoaderCircle as fi, GripVertical as hi } from "lucide-react";
import { clsx as gi } from "clsx";
import { extendTailwindMerge as bi } from "tailwind-merge";
import * as $t from "@radix-ui/react-dialog";
import { Canon as dt } from "@sillsdev/scripture";
import { includes as vn, Section as W, getChaptersForBook as vi, formatScrRef as Se, getSectionForBook as sn, formatRelativeDate as xi, formatReplacementString as Re, sanitizeHtml as yi, NumberFormat as Ni, formatBytes as ki, getCurrentLocale as _i, usfmMarkers as _n, getFormatCallerFunction as Ci, deepEqual as Ei, isString as no, compareScrRefs as lr, scrRefToBBBCCCVVV as qn, getLocalizeKeyForScrollGroupId as Z } from "platform-bible-utils";
import { Slot as Le } from "@radix-ui/react-slot";
import { cva as fe } from "class-variance-authority";
import * as Ge from "@radix-ui/react-popover";
import * as Bo from "@radix-ui/react-label";
import * as dn from "@radix-ui/react-radio-group";
import { createEditor as Ko, $getRoot as pe, $createParagraphNode as We, $getSelection as St, HISTORY_MERGE_TAG as Rr, ParagraphNode as Go, TextNode as Uo, $isTokenOrSegmented as Ti, $getCharacterOffsets as Ri, $cloneWithPropertiesEphemeral as Si, $getPreviousSelection as Di, $isRangeSelection as Qt, $caretFromPoint as Mi, $getSiblingCaret as qo, $getChildCaret as Oi, $getAdjacentChildCaret as Ii, $isChildCaret as Ai, $normalizeCaret as Pi, $setSelectionFromCaretRange as $i, $getCollapsedCaretRange as Li, $getCaretInDirection as ro, $splitAtPointCaretNext as Vi, $isTextPointCaret as ji, $findMatchingParent as Ho, $isElementNode as ce, mergeRegister as ue, getDOMTextNode as Fi, isHTMLElement as Yo, CLEAR_EDITOR_COMMAND as Xo, COMMAND_PRIORITY_EDITOR as Sr, shallowMergeConfig as zi, defineExtension as Ut, safeCast as Ve, createState as Bi, FORMAT_TEXT_COMMAND as Wo, $isNodeSelection as Jo, COMMAND_PRIORITY_LOW as Zo, RootNode as Ki, LineBreakNode as Gi, TabNode as Ui, $isEditorState as qi, createCommand as Hi, CLICK_COMMAND as Yi, isDOMNode as Xi, $getNodeFromDOMNode as Wi, $createNodeSelection as Ji, $setSelection as Zi, $getEditor as Qi, DecoratorNode as cr, $getState as tl, toggleTextFormatType as oo, TEXT_TYPE_TO_FORMAT as el, $setState as nl, addClassNamesToElement as Qo, $create as rl, $getNodeByKey as ol, removeClassNamesFromElement as al, KEY_TAB_COMMAND as sl, $isBlockElementNode as Tn, $createRangeSelection as il, $normalizeSelection__EXPERIMENTAL as ll, OUTDENT_CONTENT_COMMAND as cl, INDENT_CONTENT_COMMAND as ao, INSERT_TAB_COMMAND as wl, COMMAND_PRIORITY_CRITICAL as Dr, $isDecoratorNode as dl, $isParagraphNode as pl, $isTextNode as Rn, SELECTION_CHANGE_COMMAND as ta, getRegisteredNode as ul, isDocumentFragment as so, isDOMDocumentNode as ml, ArtificialNode__DO_NOT_USE as ea, $createLineBreakNode as na, $isRootOrShadowRoot as fl, isBlockDomNode as io, isInlineDomNode as lo, $insertNodes as hl } from "lexical";
import * as Oe from "@radix-ui/react-tooltip";
import { TooltipTrigger as gl } from "@radix-ui/react-tooltip";
import { HeadingNode as bl, QuoteNode as vl, registerRichText as xl } from "@lexical/rich-text";
import { flushSync as yl, createPortal as Nl } from "react-dom";
import { $isTableSelection as kl } from "@lexical/table";
import * as jn from "@radix-ui/react-toggle-group";
import * as ra from "@radix-ui/react-toggle";
import { createHeadlessEditor as oa } from "@lexical/headless";
import * as aa from "@radix-ui/react-separator";
import * as Je from "@radix-ui/react-avatar";
import * as nt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as _l } from "@radix-ui/react-dropdown-menu";
import { useReactTable as sa, getFilteredRowModel as Cl, getSortedRowModel as ia, getPaginationRowModel as El, getCoreRowModel as la, flexRender as ln, getGroupedRowModel as Tl, getExpandedRowModel as Rl } from "@tanstack/react-table";
import * as wt from "@radix-ui/react-select";
import Sl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as wr, HIDDEN_NOTE_CALLER as dr, getDefaultViewOptions as Dl, isInsertEmbedOpOfType as xn, Editorial as Ml } from "@eten-tech-foundation/platform-editor";
import * as pr from "@radix-ui/react-checkbox";
import * as Mt from "@radix-ui/react-tabs";
import * as rt from "@radix-ui/react-menubar";
import { useHotkeys as Ol } from "react-hotkeys-hook";
import * as ot from "@radix-ui/react-context-menu";
import { Drawer as Yt } from "vaul";
import * as ur from "@radix-ui/react-progress";
import * as Mr from "react-resizable-panels";
import { Toaster as Il } from "sonner";
import { toast as fm } from "sonner";
import * as an from "@radix-ui/react-slider";
import * as mr from "@radix-ui/react-switch";
const Al = bi({ prefix: "tw-" });
function h(...t) {
  return Al(gi(t));
}
const Ze = 250, ca = 300, Pl = 400, $l = 450, Ll = 500, Vl = "layoutDirection";
function pt() {
  const t = localStorage.getItem(Vl);
  return t === "rtl" ? t : "ltr";
}
const jl = $t.Root, ou = $t.Trigger, Fl = $t.Portal, au = $t.Close, wa = v.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  $t.Overlay,
  {
    ref: o,
    className: h(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: $l, ...e },
    ...n
  }
));
wa.displayName = $t.Overlay.displayName;
const da = v.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = pt();
  return /* @__PURE__ */ p(Fl, { children: [
    /* @__PURE__ */ r(wa, { className: n }),
    /* @__PURE__ */ p(
      $t.Content,
      {
        ref: s,
        className: h(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: Ll, ...o },
        ...a,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ p(
            $t.Close,
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
da.displayName = $t.Content.displayName;
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
  $t.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ua.displayName = $t.Title.displayName;
const Bl = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Bl.displayName = $t.Description.displayName;
const he = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
he.displayName = Dt.displayName;
const Qe = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Io, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Dt.Input,
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
Qe.displayName = Dt.Input.displayName;
const ge = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ge.displayName = Dt.List.displayName;
const gn = v.forwardRef((t, e) => /* @__PURE__ */ r(Dt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
gn.displayName = Dt.Empty.displayName;
const te = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
te.displayName = Dt.Group.displayName;
const Or = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Or.displayName = Dt.Separator.displayName;
const re = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
re.displayName = Dt.Item.displayName;
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
}, Kl = (t, e, n, o, a) => {
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
function ze(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? dt.bookIdToEnglishName(t);
}
function Ir(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ha = dt.allBookIds.filter(
  (t) => !dt.isObsolete(dt.bookIdToNumber(t))
), De = Object.fromEntries(
  ha.map((t) => [t, dt.bookIdToEnglishName(t)])
);
function Ar(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = dt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(vn(a.toLowerCase(), o) || vn(t.toLowerCase(), o) || (s ? vn(s.localizedName.toLowerCase(), o) || vn(s.localizedId.toLowerCase(), o) : !1));
}
const ga = fn(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: w
  }, c) => {
    const d = U(!1), m = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (x) => {
      d.current = !0, o ? o(x) : n == null || n(t);
    }, u = j(
      () => ze(t, l),
      [t, l]
    ), g = j(
      () => Ir(t, l),
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
          re,
          {
            ref: c,
            value: w || `${t} ${dt.bookIdToEnglishName(t)}`,
            onSelect: m,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${dt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                ne,
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
), ba = fe(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Le : "button", { className: h(ba({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const be = Ge.Root, _e = Ge.Trigger, Gl = Ge.Anchor, oe = v.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = pt();
  return /* @__PURE__ */ r(Ge.Portal, { children: /* @__PURE__ */ r(
    Ge.Content,
    {
      ref: s,
      align: e,
      sideOffset: n,
      className: h(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Ze, ...o },
      ...a,
      dir: i
    }
  ) });
});
oe.displayName = Ge.Content.displayName;
function fr(t, e, n) {
  return `${t} ${De[t]}${e ? ` ${Ir(t, e)} ${ze(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Ul({
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
  const [d, m] = D(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(be, { open: d, onOpenChange: m, children: [
    /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ r(Zr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(oe, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(he, { children: /* @__PURE__ */ r(ge, { children: /* @__PURE__ */ r(te, { heading: s, children: t.map((u) => /* @__PURE__ */ p(
      re,
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
function su(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Hn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, ql = [
  Hn.BOOK_ONLY,
  Hn.BOOK_CHAPTER,
  Hn.BOOK_CHAPTER_VERSE
];
function co(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Zt(t) {
  return vi(dt.bookIdToNumber(t));
}
function Hl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = ql.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, w = void 0, c = void 0] = i.slice(1);
        let d;
        const m = e.filter((f) => Ar(f, l, n));
        if (m.length === 1 && ([d] = m), !d && w) {
          if (dt.isBookIdValid(l)) {
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
          const u = ((g) => Object.keys(De).find(
            (x) => De[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = w ? parseInt(w, 10) : void 0;
          f && f > Zt(d) && (f = Math.max(Zt(d), 1));
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
function Yl(t, e, n, o) {
  const a = z(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w > 0) {
        const c = e[w - 1], d = Math.max(Zt(c), 1);
        o({
          book: c,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = z(() => {
    const w = Zt(t.book);
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
  }, [t, e, o]), i = z(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = z(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return j(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Qr : to
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? sr : Ke
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ke : sr
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === Zt(t.book) || Zt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? to : Qr
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
function wo({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Zt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      re,
      {
        value: `${t} ${De[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: h(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && i === e.chapterNum
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
function iu({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: w
}) {
  const c = pt(), [d, m] = D(!1), [f, u] = D(""), [g, x] = D(""), [b, C] = D("books"), [N, _] = D(void 0), [k, L] = D(!1), A = U(void 0), $ = U(void 0), E = U(void 0), R = U(void 0), T = U({}), I = z(
    (O) => {
      e(O), l && l(O);
    },
    [e, l]
  ), V = j(() => o ? o() : ha, [o]), H = j(() => ({
    [W.OT]: V.filter((Y) => dt.isBookOT(Y)),
    [W.NT]: V.filter((Y) => dt.isBookNT(Y)),
    [W.DC]: V.filter((Y) => dt.isBookDC(Y)),
    [W.Extra]: V.filter((Y) => dt.extraBooks().includes(Y))
  }), [V]), P = j(() => Object.values(H).flat(), [H]), X = j(() => {
    if (!g.trim()) return H;
    const O = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return [W.OT, W.NT, W.DC, W.Extra].forEach((Q) => {
      O[Q] = H[Q].filter((ht) => Ar(ht, g, a));
    }), O;
  }, [H, g, a]), y = j(
    () => Hl(g, P, a),
    [g, P, a]
  ), B = z(() => {
    y && (I({
      book: y.book,
      chapterNum: y.chapterNum ?? 1,
      verseNum: y.verseNum ?? 1
    }), m(!1), x(""), u(""));
  }, [I, y]), ut = z(
    (O) => {
      if (Zt(O) <= 1) {
        I({
          book: O,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), x("");
        return;
      }
      _(O), C("chapters");
    },
    [I]
  ), Nt = z(
    (O) => {
      const Y = b === "chapters" ? N : y == null ? void 0 : y.book;
      Y && (I({
        book: Y,
        chapterNum: O,
        verseNum: 1
      }), m(!1), C("books"), _(void 0), x(""));
    },
    [I, b, N, y]
  ), jt = z(
    (O) => {
      I(O), m(!1), x("");
    },
    [I]
  ), mt = Yl(t, P, c, e), Ot = z(() => {
    C("books"), _(void 0), setTimeout(() => {
      $.current && $.current.focus();
    }, 0);
  }, []), G = z(
    (O) => {
      if (!O && b === "chapters") {
        Ot();
        return;
      }
      m(O), O && (C("books"), _(void 0), x(""));
    },
    [b, Ot]
  ), { otLong: lt, ntLong: at, dcLong: ft, extraLong: Rt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, xe = z(
    (O) => fa(O, lt, at, ft, Rt),
    [lt, at, ft, Rt]
  ), kt = z(
    (O) => y ? !!y.chapterNum && !O.toString().includes(y.chapterNum.toString()) : !1,
    [y]
  ), ye = j(
    () => Se(
      t,
      a ? ze(t.book, a) : "English"
    ),
    [t, a]
  ), se = z((O) => (Y) => {
    T.current[O] = Y;
  }, []), _t = z((O) => {
    (O.key === "Home" || O.key === "End") && O.stopPropagation();
  }, []), qt = z(
    (O) => {
      if (O.ctrlKey) return;
      const { isLetter: Y, isDigit: Q } = co(O.key);
      if (b === "chapters") {
        if (O.key === "Backspace") {
          O.preventDefault(), O.stopPropagation(), Ot();
          return;
        }
        if (Y || Q) {
          if (O.preventDefault(), O.stopPropagation(), C("books"), _(void 0), Q && N) {
            const ht = De[N];
            x(`${ht} ${O.key}`);
          } else
            x(O.key);
          setTimeout(() => {
            $.current && $.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && y) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(O.key)) {
        const ht = b === "chapters" ? N : y == null ? void 0 : y.book;
        if (!ht) return;
        const st = (() => {
          if (!f) return 1;
          const et = f.match(/(\d+)$/);
          return et ? parseInt(et[1], 10) : 0;
        })(), It = Zt(ht);
        if (!It) return;
        let M = st;
        const K = 6;
        switch (O.key) {
          case "ArrowLeft":
            st !== 0 && (M = st > 1 ? st - 1 : It);
            break;
          case "ArrowRight":
            st !== 0 && (M = st < It ? st + 1 : 1);
            break;
          case "ArrowUp":
            M = st === 0 ? It : Math.max(1, st - K);
            break;
          case "ArrowDown":
            M = st === 0 ? 1 : Math.min(It, st + K);
            break;
          default:
            return;
        }
        M !== st && (O.preventDefault(), O.stopPropagation(), u(fr(ht, a, M)), setTimeout(() => {
          const et = T.current[M];
          et && et.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      y,
      Ot,
      N,
      f,
      a
    ]
  ), ie = z((O) => {
    if (O.shiftKey || O.key === "Tab" || O.key === " ") return;
    const { isLetter: Y, isDigit: Q } = co(O.key);
    (Y || Q) && (O.preventDefault(), x((ht) => ht + O.key), $.current.focus(), L(!1));
  }, []);
  return Bt(() => {
    const O = setTimeout(() => {
      if (d && b === "books" && E.current && R.current) {
        const Y = E.current, Q = R.current, ht = Q.offsetTop, st = Y.clientHeight, It = Q.clientHeight, M = ht - st / 2 + It / 2;
        Y.scrollTo({
          top: Math.max(0, M),
          behavior: "smooth"
        }), u(fr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(O);
    };
  }, [d, b, g, y, t.book]), Bt(() => {
    if (b === "chapters" && N) {
      const O = N === t.book;
      setTimeout(() => {
        if (E.current)
          if (O) {
            const Y = T.current[t.chapterNum];
            Y && Y.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            E.current.scrollTo({ top: 0 });
        A.current && A.current.focus();
      }, 0);
    }
  }, [b, N, y, t.book, t.chapterNum]), /* @__PURE__ */ p(be, { open: d, onOpenChange: G, children: [
    /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ r(
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
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: ye })
      }
    ) }),
    /* @__PURE__ */ r(oe, { id: w, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      he,
      {
        ref: A,
        onKeyDown: qt,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Qe,
                {
                  ref: $,
                  value: g,
                  onValueChange: x,
                  onKeyDown: _t,
                  onFocus: () => L(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                Ul,
                {
                  recentSearches: i,
                  onSearchItemSelect: jt,
                  renderItem: (O) => Se(O, "English"),
                  getItemKey: (O) => `${O.book}-${O.chapterNum}-${O.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: mt.map(({ onClick: O, disabled: Y, title: Q, icon: ht }) => /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  L(!0), O();
                },
                disabled: Y,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: Q,
                onKeyDown: ie,
                children: /* @__PURE__ */ r(ht, {})
              },
              Q
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: Ot,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r($s, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ls, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: ze(N, a) })
          ] }),
          !k && /* @__PURE__ */ p(ge, { ref: E, children: [
            b === "books" && /* @__PURE__ */ p(it, { children: [
              !y && Object.entries(X).map(([O, Y]) => {
                if (Y.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(te, { heading: xe(O), children: Y.map((Q) => /* @__PURE__ */ r(
                      ga,
                      {
                        bookId: Q,
                        onSelect: (ht) => ut(ht),
                        section: sn(Q),
                        commandValue: `${Q} ${De[Q]}`,
                        ref: Q === t.book ? R : void 0,
                        localizedBookNames: a
                      },
                      Q
                    )) }, O)
                  );
              }),
              y && /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(
                re,
                {
                  value: `${y.book} ${De[y.book]} ${y.chapterNum || ""}:${y.verseNum || ""})}`,
                  onSelect: B,
                  className: "tw-font-semibold tw-text-primary",
                  children: Se(
                    {
                      book: y.book,
                      chapterNum: y.chapterNum ?? 1,
                      verseNum: y.verseNum ?? 1
                    },
                    a ? Ir(y.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              y && Zt(y.book) > 1 && /* @__PURE__ */ p(it, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: ze(y.book, a) }),
                /* @__PURE__ */ r(
                  wo,
                  {
                    bookId: y.book,
                    scrRef: t,
                    onChapterSelect: Nt,
                    setChapterRef: se,
                    isChapterDimmed: kt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && N && /* @__PURE__ */ r(
              wo,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: Nt,
                setChapterRef: se,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const lu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Xl = fe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), xt = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Bo.Root, { ref: n, className: h("pr-twp", Xl(), t), ...e }));
xt.displayName = Bo.Root.displayName;
const Pr = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
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
function Wl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function hr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: w = Wl,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: b = !1,
  ariaLabel: C,
  ...N
}) {
  const [_, k] = D(!1), L = c ?? w, A = (E) => E.length > 0 && typeof E[0] == "object" && "options" in E[0], $ = (E, R) => {
    const T = w(E), I = typeof E == "object" && "secondaryLabel" in E ? E.secondaryLabel : void 0, V = `${R ?? ""}${T}${I ?? ""}`;
    return /* @__PURE__ */ p(
      re,
      {
        value: T,
        onSelect: () => {
          l(E), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            ne,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || w(i) !== T
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            T,
            I && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              I
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ p(be, { open: _, onOpenChange: k, ...N, children: [
    /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": C,
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
                children: i ? L(i) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(Xe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      oe,
      {
        align: x,
        className: h("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ p(he, { children: [
          /* @__PURE__ */ r(Qe, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(gn, { children: u }),
          /* @__PURE__ */ r(ge, { children: A(e) ? e.map((E) => /* @__PURE__ */ r(te, { heading: E.groupHeading, children: E.options.map((R) => $(R, E.groupHeading)) }, E.groupHeading)) : e.map((E) => $(E)) })
        ] })
      }
    )
  ] });
}
function Jl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = j(
    () => Array.from({ length: s }, (c, d) => d + 1),
    [s]
  );
  return /* @__PURE__ */ p(it, { children: [
    /* @__PURE__ */ r(xt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      hr,
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
    /* @__PURE__ */ r(xt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      hr,
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
var gr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(gr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(gr || (gr = {}));
const cu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Yn = (t, e) => t[e] ?? e;
function wu({
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
  const d = Yn(c, "%webView_bookSelector_currentBook%"), m = Yn(c, "%webView_bookSelector_choose%"), f = Yn(c, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), x = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ r(
    Pr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (b) => x(b),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Sn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(xt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(xt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Jl,
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
            /* @__PURE__ */ r(Sn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(xt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(xt, { className: "tw-flex tw-items-center", children: o.map((b) => dt.bookIdToEnglishName(b)).join(", ") }),
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
function Zl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ae() {
  const t = Tr(va);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ql = xa ? Bt : q, yn = { tag: Rr };
function tc({ initialConfig: t, children: e }) {
  const n = j(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: w } = t, c = Zl(null, o), d = Ko({ editable: t.editable, html: w, namespace: a, nodes: s, onError: (m) => i(m, d), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = pe();
          if (u.isEmpty()) {
            const g = We();
            u.append(g);
            const x = xa ? document.activeElement : null;
            (St() !== null || x !== null && x === m.getRootElement()) && g.select();
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
              pe().isEmpty() && f(m);
            }, yn);
        }
      }
    }(d, l), [d, c];
  }, []);
  return Ql(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(va.Provider, { value: n, children: e });
}
const ec = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Bt : q;
function nc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = ae();
  return ec(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: w }) => {
      e && s.size === 0 && i.size === 0 || t && w.has(Rr) || l.isEmpty() || n(a, o, w);
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
}, Lt = Oe.Provider, Kt = Oe.Root, Gt = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Oe.Trigger,
  {
    ref: o,
    className: e ? h(ba({ variant: e }), t) : t,
    ...n
  }
));
Gt.displayName = Oe.Trigger.displayName;
const Vt = v.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Oe.Portal, { children: /* @__PURE__ */ r(
  Oe.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: Ze, ...n },
    className: h(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
Vt.displayName = Oe.Content.displayName;
const Lr = [
  bl,
  Go,
  Uo,
  vl
], rc = Ln(null), Xn = {
  didCatch: !1,
  error: null
};
class oc extends As {
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
      for (var n, o, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
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
    if (o && n.error !== null && ac(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
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
        l = Jr(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Jr(rc.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function ac() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function sc({ children: t, onError: e }) {
  return r(oc, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ic = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Bt : q;
function lc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function cc() {
  return function(t) {
    const [e] = ae(), n = j(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), s = U(o);
    return ic(() => {
      const { initialValueFn: i, subscribe: l } = n, w = i();
      return s.current !== w && (s.current = w, a(w)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(lc);
}
function wc(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), s = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), i = Array.from(e.getClientRects());
  let l, w = i.length;
  i.sort((c, d) => {
    const m = c.top - d.top;
    return Math.abs(m) <= 3 ? c.left - d.left : m;
  });
  for (let c = 0; c < w; c++) {
    const d = i[c], m = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, f = d.width + s === o.width;
    m || f ? (i.splice(c--, 1), w--) : l = d;
  }
  return i;
}
function dc(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Ti(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), w = s.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [m, f] = Ri(t), u = l.is(w), g = e.is(i ? w : l), x = e.is(i ? l : w);
      let b, C = 0;
      u ? (C = m > f ? f : m, b = m > f ? m : f) : g ? (C = i ? f : m, b = void 0) : x && (C = 0, b = i ? m : f);
      const N = e.__text.slice(C, b);
      N !== e.__text && (n === "clone" && (e = Si(e)), e.__text = N);
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
const ya = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, pc = ya && "documentMode" in document ? document.documentMode : null;
!(!ya || !("InputEvent" in window) || pc) && "getTargetRanges" in new window.InputEvent("input");
function Jt(t) {
  return `${t}px`;
}
const uc = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function mc(t, e, n) {
  let o = null, a = null, s = null, i = [];
  const l = document.createElement("div");
  function w() {
    o === null && Dn(182), a === null && Dn(183);
    const { left: m, top: f } = a.getBoundingClientRect(), u = wc(t, e);
    var g, x;
    l.isConnected || (x = l, (g = a).insertBefore(x, g.firstChild));
    let b = !1;
    for (let C = 0; C < u.length; C++) {
      const N = u[C], _ = i[C] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const L = Jt(N.left - m);
      k.left !== L && (k.left = L, b = !0);
      const A = Jt(N.top - f);
      k.top !== A && (_.style.top = A, b = !0);
      const $ = Jt(N.width);
      k.width !== $ && (_.style.width = $, b = !0);
      const E = Jt(N.height);
      k.height !== E && (_.style.height = E, b = !0), _.parentNode !== l && (l.append(_), b = !0), i[C] = _;
    }
    for (; i.length > u.length; ) i.pop();
    b && n(i);
  }
  function c() {
    a = null, o = null, s !== null && s.disconnect(), s = null, l.remove();
    for (const m of i) m.remove();
    i = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function m() {
    const f = t.getRootElement();
    if (f === null) return c();
    const u = f.parentElement;
    if (!Yo(u)) return c();
    c(), o = f, a = u, s = new MutationObserver((g) => {
      const x = t.getRootElement(), b = x && x.parentElement;
      if (x !== o || b !== a) return m();
      for (const C of g) if (!l.contains(C.target)) return w();
    }), s.observe(u, uc), w();
  });
  return () => {
    d(), c();
  };
}
function po(t, e, n) {
  if (t.type !== "text" && ce(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Fi(n) || n, t.offset];
}
function fc(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== Jt(-1.5) && (n.marginTop = Jt(-1.5)), n.paddingTop !== Jt(4) && (n.paddingTop = Jt(4)), n.paddingBottom !== Jt(0) && (n.paddingBottom = Jt(0));
  }
}
function hc(t, e = fc) {
  let n = null, o = null, a = null, s = null, i = null, l = null, w = () => {
  };
  function c(d) {
    d.read(() => {
      const m = St();
      if (!Qt(m)) return n = null, a = null, s = null, l = null, w(), void (w = () => {
      });
      const [f, u] = function(E) {
        const R = E.getStartEndPoints();
        return E.isBackward() ? [R[1], R[0]] : R;
      }(m), g = f.getNode(), x = g.getKey(), b = f.offset, C = u.getNode(), N = C.getKey(), _ = u.offset, k = t.getElementByKey(x), L = t.getElementByKey(N), A = n === null || k !== o || b !== a || x !== n.getKey(), $ = s === null || L !== i || _ !== l || N !== s.getKey();
      if ((A || $) && k !== null && L !== null) {
        const E = function(R, T, I, V, H, P, X) {
          const y = (R._window ? R._window.document : document).createRange();
          return y.setStart(...po(T, I, V)), y.setEnd(...po(H, P, X)), y;
        }(t, f, g, k, u, C, L);
        w(), w = mc(t, E, e);
      }
      n = g, o = k, a = b, s = C, i = L, l = _;
    });
  }
  return c(t.getEditorState()), ue(t.registerUpdateListener(({ editorState: d }) => c(d)), () => {
    w();
  });
}
function gc(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), s = a && a.anchorNode, i = t.getRootElement();
    s !== null && i !== null && i.contains(s) ? n !== null && (n(), n = null) : n === null && (n = hc(t, e));
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
function bc(t) {
  const e = Ho(t, (n) => ce(n) && !n.isInline());
  return ce(e) || Dn(4, t.__key), e;
}
function vc(t) {
  const e = St() || Di();
  let n;
  if (Qt(e)) n = Mi(e.focus, "next");
  else {
    if (e != null) {
      const i = e.getNodes(), l = i[i.length - 1];
      l && (n = qo(l, "next"));
    }
    n = n || Oi(pe(), "previous").getFlipped().insert(We());
  }
  const o = xc(t, n), a = Ii(o), s = Ai(a) ? Pi(a) : o;
  return $i(Li(s)), t.getLatest();
}
function xc(t, e, n) {
  let o = ro(e, "next");
  for (let a = o; a; a = Vi(a, n)) o = a;
  return ji(o) && Dn(283), o.insert(t.isInline() ? We().append(t) : t), ro(qo(t.getLatest(), "next"), e.direction);
}
function yc(t) {
  const e = St();
  if (!Qt(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Ho(s, (c) => ce(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !n.has(w) && (n.add(w), t(l));
  }
  return n.size > 0;
}
const Nc = Symbol.for("preact-signals");
function Fn() {
  if (we > 1) return void we--;
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
  if (On = 0, we--, e) throw t;
}
function kc(t) {
  if (we > 0) return t();
  br = ++_c, we++;
  try {
    return t();
  } finally {
    Fn();
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
let Mn, we = 0, On = 0, _c = 0, br = 0, Cn = 0;
function mo(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function Tt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function pn(t, e) {
  return new Tt(t, e);
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
function Ee(t, e) {
  Tt.call(this, void 0), this.x = t, this.s = void 0, this.g = Cn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Cc(t, e) {
  return new Ee(t, e);
}
function _a(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    we++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Vr(t), o;
    } finally {
      J = n, Fn();
    }
  }
}
function Vr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, _a(t);
}
function Ec(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  ka(this), J = t, this.f &= -2, 8 & this.f && Vr(this), Fn();
}
function Fe(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ee(t, e) {
  const n = new Fe(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function tn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = pn(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
Tt.prototype.brand = Nc, Tt.prototype.h = function() {
  return !0;
}, Tt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : uo(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Tt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && uo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Tt.prototype.subscribe = function(t) {
  return ee(() => {
    const e = this.value, n = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, Tt.prototype.valueOf = function() {
  return this.value;
}, Tt.prototype.toString = function() {
  return this.value + "";
}, Tt.prototype.toJSON = function() {
  return this.value;
}, Tt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(Tt.prototype, "value", { get() {
  const t = mo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (On > 100) throw new Error("Cycle detected");
    (function(e) {
      we !== 0 && On === 0 && e.l !== br && (e.l = br, Mn = { S: e, v: e.v, i: e.i, o: Mn });
    })(this), this.v = t, this.i++, Cn++, we++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Fn();
    }
  }
} }), Ee.prototype = new Tt(), Ee.prototype.h = function() {
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
}, Ee.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Tt.prototype.S.call(this, t);
}, Ee.prototype.U = function(t) {
  if (this.t !== void 0 && (Tt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Ee.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Ee.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = mo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Fe.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Fe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, _a(this), fo(this), we++;
  const t = J;
  return J = this, Ec.bind(this, t);
}, Fe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = cn, cn = this);
}, Fe.prototype.d = function() {
  this.f |= 8, 1 & this.f || Vr(this);
}, Fe.prototype.dispose = function() {
  this.d();
};
Ut({ build: (t, e, n) => tn(e), config: Ve({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return ee(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ca() {
  const t = pe(), e = St(), n = We();
  t.clear(), t.append(n), e !== null && n.select(), Qt(e) && (e.format = 0);
}
function Ea(t, e = Ca) {
  return t.registerCommand(Xo, (n) => (t.update(e), !0), Sr);
}
Ut({ build: (t, e, n) => tn(e), config: Ve({ $onClear: Ca }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return ee(() => Ea(t, o.value));
} });
function Tc(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Wn = Bi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Ta extends cr {
  $config() {
    return this.config("decorator-text", { extends: cr, stateConfigs: [{ flat: !0, stateConfig: Wn }] });
  }
  getFormat() {
    return tl(this, Wn);
  }
  getFormatFlags(e, n) {
    return oo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = el[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return nl(this, Wn, e);
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
function Rc(t) {
  return t instanceof Ta;
}
Ut({ name: "@lexical/extension/DecoratorText", nodes: () => [Ta], register: (t, e, n) => t.registerCommand(Wo, (o) => {
  const a = St();
  if (Jo(a) || Qt(a)) for (const s of a.getNodes()) Rc(s) && s.toggleFormat(o);
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
const vr = Ut({ build: (t) => Ra(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function tt(t, ...e) {
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
const jr = 0, xr = 1, Da = 2, Jn = 3, Nn = 4, je = 5, Zn = 6, rn = 7;
function Qn(t) {
  return t.id === jr;
}
function Ma(t) {
  return t.id === Da;
}
function Sc(t) {
  return function(e) {
    return e.id === xr;
  }(t) || tt(305, String(t.id), String(xr)), Object.assign(t, { id: Da });
}
const Dc = /* @__PURE__ */ new Set();
class Mc {
  constructor(e, n) {
    Et(this, "builder");
    Et(this, "configs");
    Et(this, "_dependency");
    Et(this, "_peerNameSet");
    Et(this, "extension");
    Et(this, "state");
    Et(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: jr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : zi;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Ma(n) || tt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, w, c) {
      return Object.assign(l, { config: w, id: Jn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: Nn, initResult: w, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Nn && tt(307, String(n.id), String(je)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: je, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== je && tt(308, String(o.id), String(je));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Zn });
    }(o), () => {
      const s = this.state;
      s.id !== rn && tt(309, String(o.id), String(rn)), this.state = function(i) {
        return Object.assign(i, { id: je });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Zn && tt(310, String(n.id), String(Zn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: rn });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && tt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && tt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Nn;
    }(e) || tt(313, String(e.id), String(Nn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Jn;
    }(e) || tt(314, String(e.id), String(Jn)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && tt(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && tt(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= rn;
    }(e) || tt(316, String(e.id), String(rn)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Dc;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= je;
      })(e) || tt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ho = { tag: Rr };
function Oc() {
  const t = pe();
  t.isEmpty() && t.append(We());
}
const Ic = Ut({ config: Ve({ setOptions: ho, updateOptions: ho }), init: ({ $initialEditorState: t = Oc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (qi(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Ki, Uo, Gi, Ui, Go] }), go = Symbol.for("@lexical/extension/LexicalBuilder");
function bo() {
}
function Ac(t) {
  throw t;
}
function kn(t) {
  return Array.isArray(t) ? t : [t];
}
const tr = "0.43.0+prod.esm";
class Be {
  constructor(e) {
    Et(this, "roots");
    Et(this, "extensionNameMap");
    Et(this, "outgoingConfigEdges");
    Et(this, "incomingEdges");
    Et(this, "conflicts");
    Et(this, "_sortedExtensionReps");
    Et(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = tr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [kn(Ic)];
    for (const o of e) n.push(kn(o));
    return new Be(n);
  }
  static maybeFromEditor(e) {
    const n = e[go];
    return n && (n.PACKAGE_VERSION !== tr && tt(292, n.PACKAGE_VERSION, tr), n instanceof Be || tt(293)), n;
  }
  static fromEditor(e) {
    const n = Be.maybeFromEditor(e);
    return n === void 0 && tt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Ko({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [go]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
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
    return e = ue(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && tt(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && tt(296);
    const n = kn(e), [o] = n;
    typeof o.name != "string" && tt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && tt(298, o.name), !a) {
      a = new Mc(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && tt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && tt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = kn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (Ma(s)) return;
      const i = o.extension.name;
      var l;
      Qn(s) || tt(300, i, a || "[unknown]"), Qn(l = s) || tt(304, String(l.id), String(jr)), s = Object.assign(l, { id: xr }), o.state = s;
      const w = this.outgoingConfigEdges.get(i);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && n(d, i);
      }
      s = Sc(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Qn(o.state) && n(o);
    for (const o of e) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && tt(301, o.name);
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
    return ue(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: m } = d;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of Tc(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && tt(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, d);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && Sa(i, m.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const w = Object.keys(s).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = s), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Ac), e;
  }
}
const Pc = /* @__PURE__ */ new Set(), vo = Ut({ build(t, e, n) {
  const o = n.getDependency(vr).output, a = pn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Ra(() => {
  }, () => ee(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (St()) for (const [d, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(d);
          continue;
        }
        const f = ol(d), u = f && f.isSelected() || !1;
        c = c || u !== (!!i && i.has(d)), u && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && i && w.size === i.size || (s.value = w);
  }));
  return { watchNodeKey: function(i) {
    const l = Cc(() => (s.value || Pc).has(i)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(i);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(i, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [vr], name: "@lexical/extension/NodeSelection" }), $c = Hi("INSERT_HORIZONTAL_RULE_COMMAND");
class Ue extends cr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ue(e.__key);
  }
  static importJSON(e) {
    return Fr().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Lc, priority: 0 }) };
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
function Lc() {
  return { node: Fr() };
}
function Fr() {
  return rl(Ue);
}
function Vc(t) {
  return t instanceof Ue;
}
Ut({ dependencies: [vr, vo], name: "@lexical/extension/HorizontalRule", nodes: () => [Ue], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(vo).output, a = pn({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return ue(t.registerCommand($c, (i) => {
    const l = St();
    if (!Qt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const w = Fr();
      vc(w);
    }
    return !0;
  }, Sr), t.registerCommand(Yi, (i) => {
    if (Xi(i.target)) {
      const l = Wi(i.target);
      if (Vc(l)) return function(w, c = !1) {
        const d = St(), m = w.isSelected(), f = w.getKey();
        let u;
        c && Jo(d) ? u = d : (u = Ji(), Zi(u)), m ? u.delete(f) : u.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Zo), t.registerMutationListener(Ue, (i, l) => {
    kc(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, m] of i.entries()) if (m === "destroyed") c.delete(d), w = !0;
      else {
        const f = c.get(d), u = t.getElementByKey(d);
        f ? f.domNode.value = u : (w = !0, c.set(d, { domNode: pn(u), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), ee(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) i.push(ee(() => {
      const c = l.value;
      c && (w.value ? Qo(c, s) : al(c, s));
    }));
    return ue(...i);
  }));
} });
Ut({ build: (t, e) => tn({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Ve({ $getParentEditor: function() {
  const t = Qi();
  return Be.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => ee(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
Ut({ build: (t, e, n) => tn(e), config: Ve({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return ee(() => {
    if (!o.disabled.value) return gc(t, o.onReposition.value);
  });
} });
function Oa(t) {
  return t.canBeEmpty();
}
function jc(t, e, n = Oa) {
  return ue(t.registerCommand(sl, (o) => {
    const a = St();
    if (!Qt(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((f) => Tn(f) && f.canIndent()).length > 0) return !0;
      const l = i.anchor, w = i.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), m = bc(d);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = il();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = ll(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? cl : ao : wl;
    return t.dispatchCommand(s, void 0);
  }, Sr), t.registerCommand(ao, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = St();
    if (!Qt(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return yc((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, Dr));
}
Ut({ build: (t, e, n) => tn(e), config: Ve({ $canIndent: Oa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return ee(() => {
    if (!o.value) return jc(t, a, s);
  });
} });
const Fc = Ut({ name: "@lexical/react/ReactProvider" });
function zc() {
  return pe().getTextContent();
}
function Bc(t, e = !0) {
  if (t) return !1;
  let n = zc();
  return e && (n = n.trim()), n === "";
}
function Kc(t) {
  if (!Bc(t, !1)) return !1;
  const e = pe().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (dl(a)) return !1;
    if (ce(a)) {
      if (!pl(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const w = s[o];
        if (!Rn(w)) return !1;
      }
    }
  }
  return !0;
}
function Ia(t) {
  return () => Kc(t);
}
function Aa(t) {
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
            const [c, d, m, f, u] = w;
            t.update(() => {
              const g = St();
              if (Qt(g)) {
                const x = g.anchor;
                let b = x.getNode(), C = 0, N = 0;
                if (Rn(b) && c >= 0 && d >= 0 && (C = c, N = c + d, g.setTextNodeRange(b, C, b, N)), C === N && m === "" || (g.insertRawText(m), b = x.getNode()), Rn(b)) {
                  C = f, N = f + u;
                  const _ = b.getTextContentSize();
                  C = C > _ ? _ : C, N = N > _ ? _ : N, g.setTextNodeRange(b, C, b, N);
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
Ut({ build: (t, e, n) => tn(e), config: Ve({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => ee(() => n.getOutput().disabled.value ? void 0 : Aa(t)) });
function Gc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const zr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Bt : q;
function Uc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = D(() => n.getDecorators());
    return zr(() => n.registerDecoratorListener((i) => {
      yl(() => {
        s(i);
      });
    }), [n]), q(() => {
      s(n.getDecorators());
    }, [n]), j(() => {
      const i = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = r(o, { onError: (f) => n._onError(f), children: r(Ps, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(Nl(d, m, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function qc({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Be.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Fc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Gc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Uc, { editor: t, ErrorBoundary: e });
}
function xo(t) {
  return t.getEditorState().read(Ia(t.isComposing()));
}
function Hc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = ae();
  return function(a) {
    zr(() => ue(xl(a), Aa(a)), [a]);
  }(o), p(it, { children: [t, r(Yc, { content: e }), r(qc, { editor: o, ErrorBoundary: n })] });
}
function Yc({ content: t }) {
  const [e] = ae(), n = function(a) {
    const [s, i] = D(() => xo(a));
    return zr(() => {
      function l() {
        const w = xo(a);
        i(w);
      }
      return l(), ue(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = cc();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Xc({ defaultSelection: t }) {
  const [e] = ae();
  return q(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Wc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Bt : q;
function Jc({ onClear: t }) {
  const [e] = ae();
  return Wc(() => Ea(e, t), [e, t]), null;
}
const Pa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Bt : q;
function Zc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: x, role: b = "textbox", spellCheck: C = !0, style: N, tabIndex: _, "data-testid": k, ...L }, A) {
  const [$, E] = D(t.isEditable()), R = z((I) => {
    I && I.ownerDocument && I.ownerDocument.defaultView ? t.setRootElement(I) : t.setRootElement(null);
  }, [t]), T = j(() => /* @__PURE__ */ function(...I) {
    return (V) => {
      for (const H of I) typeof H == "function" ? H(V) : H != null && (H.current = V);
    };
  }(A, R), [R, A]);
  return Pa(() => (E(t.isEditable()), t.registerEditableListener((I) => {
    E(I);
  })), [t]), r("div", { "aria-activedescendant": $ ? e : void 0, "aria-autocomplete": $ ? n : "none", "aria-controls": $ ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": $ && b === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": $ ? m : void 0, "aria-readonly": !$ || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: $, "data-testid": k, id: x, ref: T, role: b, spellCheck: C, style: N, tabIndex: _, ...L });
}
const Qc = fn(Zc);
function yo(t) {
  return t.getEditorState().read(Ia(t.isComposing()));
}
const tw = fn(ew);
function ew(t, e) {
  const { placeholder: n, ...o } = t, [a] = ae();
  return p(it, { children: [r(Qc, { editor: a, ...o, ref: e }), n != null && r(nw, { editor: a, content: n })] });
}
function nw({ content: t, editor: e }) {
  const n = function(i) {
    const [l, w] = D(() => yo(i));
    return Pa(() => {
      function c() {
        const d = yo(i);
        w(d);
      }
      return c(), ue(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = D(e.isEditable());
  if (Bt(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function rw({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    tw,
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
function ow({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = j(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r($a.Provider, { value: i, children: s });
}
function La() {
  const t = Tr($a);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function aw() {
  const [t, e] = D(void 0), n = z(() => {
    e(void 0);
  }, []), o = j(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(jl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(da, { children: [
      /* @__PURE__ */ r(pa, { children: /* @__PURE__ */ r(ua, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = z(
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
function sw({
  children: t
}) {
  const [e] = ae(), [n, o] = D(e), [a, s] = D("paragraph"), [i, l] = aw(), w = () => {
  };
  return q(() => n.registerCommand(
    ta,
    (c, d) => (o(d), !1),
    Dr
  ), [n]), /* @__PURE__ */ p(
    ow,
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
function iw(t) {
  const [e] = ae(), { activeEditor: n } = La();
  q(() => n.registerCommand(
    ta,
    () => {
      const o = St();
      return o && t(o), !1;
    },
    Dr
  ), [e, t]), q(() => {
    n.getEditorState().read(() => {
      const o = St();
      o && t(o);
    });
  }, [n, t]);
}
const Va = fe(
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
), lw = v.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  ra.Root,
  {
    ref: a,
    className: h(Va({ variant: e, size: n, className: t })),
    ...o
  }
));
lw.displayName = ra.Root.displayName;
const ja = v.createContext({
  size: "default",
  variant: "default"
}), Br = v.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = pt();
  return /* @__PURE__ */ r(
    jn.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
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
const wn = v.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = v.useContext(ja);
  return /* @__PURE__ */ r(
    jn.Item,
    {
      ref: s,
      className: h(
        Va({
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
wn.displayName = jn.Item.displayName;
const No = [
  { format: "bold", icon: Vs, label: "Bold" },
  { format: "italic", icon: js, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function cw() {
  const { activeEditor: t } = La(), [e, n] = D([]), o = z((a) => {
    if (Qt(a) || kl(a)) {
      const s = [];
      No.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
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
      children: No.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        wn,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Wo, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function ww({ onClear: t }) {
  const [e] = ae();
  q(() => {
    t && t(() => {
      e.dispatchCommand(Xo, void 0);
    });
  }, [e, t]);
}
function dw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(sw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(cw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Hc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(rw, { placeholder: t }) }),
          ErrorBoundary: sc
        }
      ),
      e && /* @__PURE__ */ r(Xc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(ww, { onClear: n }),
      /* @__PURE__ */ r(Jc, {})
    ] })
  ] });
}
const pw = {
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
          tc,
          {
            initialConfig: {
              ...pw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(Lt, { children: [
              /* @__PURE__ */ r(dw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                nc,
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
function uw(t, e) {
  const n = ml(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!za.has(s.nodeName)) {
    const i = Ba(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof ea && i.insertAfter(na());
    for (const i of s) {
      const l = i.getChildren();
      for (const w of l) i.insertBefore(w);
      i.remove();
    }
  }(a), o;
}
function mw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = pe().getChildren();
  for (let a = 0; a < o.length; a++)
    Fa(t, o[a], n, e);
  return n.innerHTML;
}
function Fa(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = ce(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && Rn(e) && (i = dc(o, e, "clone"));
  const l = ce(i) ? i.getChildren() : [], w = ul(t, i.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, i) : i.exportDOM(t);
  const { element: d, after: m } = c;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = Fa(t, g, f, o);
    !a && ce(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Yo(d) || so(d)) && d.append(f), n.append(d), m) {
      const u = m.call(i, d);
      u && (so(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const za = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ba(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (za.has(t.nodeName)) return i;
  let l = null;
  const w = function(g, x) {
    const { nodeName: b } = g, C = x._htmlConversions.get(b.toLowerCase());
    let N = null;
    if (C !== void 0) for (const _ of C) {
      const k = _(g);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let d = null;
  if (c !== null) {
    d = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const m = t.childNodes;
  let f = [];
  const u = (l == null || !fl(l)) && (l != null && Tn(l) || o);
  for (let g = 0; g < m.length; g++) f.push(...Ba(m[g], e, n, u, new Map(a), l));
  return d != null && (f = d(f)), io(t) && (f = fw(t, f, u ? () => {
    const g = new ea();
    return n.push(g), g;
  } : We)), l == null ? f.length > 0 ? i = i.concat(f) : io(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : lo(g.nextSibling) && lo(g.previousSibling);
  }(t) && (i = i.concat(na())) : ce(l) && l.append(...f), i;
}
function fw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (Tn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && Tn(e[i + 1])) {
      const w = n();
      w.setFormat(o), w.append(...s), a.push(w), s = [];
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
function Ft(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ga(t.root.children) : !1;
}
function hw(t) {
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
      const a = new DOMParser().parseFromString(t, "text/html"), s = uw(e, a);
      pe().clear(), hl(s);
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
    o = mw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Kr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const Ie = v.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
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
Ie.displayName = aa.Root.displayName;
const gw = fe(
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
      className: h("pr-twp", gw({ orientation: e }), t),
      ...n
    }
  );
}
function du({
  className: t,
  asChild: e = !1,
  ...n
}) {
  return /* @__PURE__ */ r(
    e ? Le : "div",
    {
      className: h(
        "tw-shadow-xs tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-border tw-bg-muted tw-px-4 tw-text-sm tw-font-medium [&_svg:not([class*=size-])]:tw-size-4 [&_svg]:tw-pointer-events-none",
        t
      ),
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
    Ie,
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
  className: a = "tw-h-6 tw-w-6",
  acceptLabel: s
}) {
  const i = ko(o, "%cancelButton_tooltip%"), l = s ?? ko(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(Gr, { children: [
    /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(
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
      /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ r(Ua, {}),
    /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !n,
          children: /* @__PURE__ */ r(ne, {})
        }
      ) }),
      /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r("p", { children: l }) })
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
const bw = {
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
function pu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o,
  initialAssignedUser: a
}) {
  const [s, i] = D(bw), [l, w] = D(a), [c, d] = D(!1), m = U(void 0), f = U(null);
  q(() => {
    let b = !0;
    const C = f.current;
    if (!C) return;
    const N = setTimeout(() => {
      b && Ka(C);
    }, 300);
    return () => {
      b = !1, clearTimeout(N);
    };
  }, []);
  const u = z(() => {
    if (!Ft(s)) return;
    const b = An(s);
    e(b, l);
  }, [s, e, l]), g = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: x }),
      /* @__PURE__ */ r(
        Ha,
        {
          onCancelClick: n,
          onAcceptClick: u,
          canAccept: Ft(s),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(be, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Ao, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: er(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        oe,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (b) => {
            b.key === "Escape" && (b.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ r(he, { children: /* @__PURE__ */ r(ge, { children: t.map((b) => /* @__PURE__ */ r(
            re,
            {
              onSelect: () => {
                w(b || void 0), d(!1);
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
        ref: f,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (b) => {
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), n()) : Ur(b) && (b.preventDefault(), b.stopPropagation(), Ft(s) && u());
        },
        onKeyDown: (b) => {
          Kr(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          In,
          {
            editorSerializedState: s,
            onSerializedChange: (b) => i(b),
            placeholder: g,
            onClear: (b) => {
              m.current = b;
            }
          }
        )
      }
    )
  ] });
}
const uu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...qa
]), mu = [
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
  "%comment_thread_single_reply%",
  "%comment_aria_assign_user%",
  "%comment_aria_submit_comment%",
  "%comment_aria_mark_as_read%",
  "%comment_aria_mark_as_unread%",
  "%comment_aria_resolve_thread%"
], vw = ["input", "select", "textarea", "button"], xw = ["button", "textbox"], yw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = U(null), [s, i] = D(void 0), [l, w] = D(void 0), c = z(
    (u) => {
      i(u);
      const g = t.find((b) => b.id === u);
      g && (e == null || e(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = z(
    (u) => {
      const g = t.find((x) => x.id === u);
      g && (w((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || vw.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && xw.includes(x)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, f = z(
    (u) => {
      var $;
      const g = u.target, x = (E) => E ? document.getElementById(E) : void 0, b = x(l), C = x(s);
      if (!!(b && g && b.contains(g) && g !== b) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const E = t.find((R) => R.id === l);
            E && c(E.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!b) return;
          const E = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (E.length === 0) return;
          const R = E.findIndex((I) => I === g);
          if (R === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(R + 1, E.length - 1) : T = Math.max(R - 1, 0), T !== R && (u.preventDefault(), u.stopPropagation(), ($ = E[T]) == null || $.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((E) => E.id === s);
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
          s && d(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const E = C;
          if (E) {
            const R = E.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = E.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), I = R ?? T;
            if (I) {
              u.preventDefault(), I.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const A = t[L];
      A && c(A.id);
    },
    [t, c, s, l, d, o]
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
}, Nw = fe(
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
), qe = v.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", Nw({ variant: e }), t), ...n })
);
qe.displayName = "Badge";
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
const kw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
kw.displayName = "CardHeader";
const _w = v.forwardRef(
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
_w.displayName = "CardTitle";
const Cw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Cw.displayName = "CardDescription";
const Xa = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Xa.displayName = "CardContent";
const Ew = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Ew.displayName = "CardFooter";
const Wa = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Wa.displayName = Je.Root.displayName;
const Tw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Tw.displayName = Je.Image.displayName;
const Ja = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ja.displayName = Je.Fallback.displayName;
const qr = Ln(void 0);
function Xt() {
  const t = Tr(qr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ve = fe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ae = nt.Trigger, Za = nt.Group, Rw = nt.Portal, Sw = nt.Sub, Dw = nt.RadioGroup;
function ke({ variant: t = "default", ...e }) {
  const n = v.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(qr.Provider, { value: n, children: /* @__PURE__ */ r(nt.Root, { ...e }) });
}
const Qa = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Xt();
  return /* @__PURE__ */ p(
    nt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ve({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ke, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Qa.displayName = nt.SubTrigger.displayName;
const ts = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = pt();
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
ts.displayName = nt.SubContent.displayName;
const me = v.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = pt();
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
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
me.displayName = nt.Content.displayName;
const Pn = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = pt(), s = Xt();
  return /* @__PURE__ */ r(
    nt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ve({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Pn.displayName = nt.Item.displayName;
const de = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = pt(), i = Xt();
  return /* @__PURE__ */ p(
    nt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ve({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
de.displayName = nt.CheckboxItem.displayName;
const es = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = pt(), s = Xt();
  return /* @__PURE__ */ p(
    nt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ve({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
es.displayName = nt.RadioItem.displayName;
const bn = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  nt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
bn.displayName = nt.Label.displayName;
const en = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
en.displayName = nt.Separator.displayName;
function Mw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Mw.displayName = "DropdownMenuShortcut";
function _o({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [w, c] = D(!1), [d, m] = D(), f = U(null);
  q(() => {
    if (!w) return;
    let k = !0;
    const L = f.current;
    if (!L) return;
    const A = setTimeout(() => {
      k && Ka(L);
    }, 300);
    return () => {
      k = !1, clearTimeout(A);
    };
  }, [w]);
  const u = z(
    (k) => {
      k && k.stopPropagation(), c(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = z(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        An(d)
      ) && (c(!1), m(void 0), i == null || i(!1));
    },
    [d, a, t.id, i]
  ), x = j(() => {
    const k = new Date(t.date), L = xi(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), A = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Re(n["%comment_dateAtTime%"], {
      date: L,
      time: A
    });
  }, [t.date, n]), b = j(() => t.user, [t.user]), C = j(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = j(() => yi(t.contents), [t.contents]), _ = j(() => {
    if (o && l)
      return /* @__PURE__ */ p(it, { children: [
        /* @__PURE__ */ p(
          Pn,
          {
            onClick: (k) => {
              k.stopPropagation(), c(!0), m(hw(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(Fs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Pn,
          {
            onClick: async (k) => {
              k.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(zs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
        /* @__PURE__ */ r(Wa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ja, { className: "tw-text-xs tw-font-medium", children: C }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: b }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(qe, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
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
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : Ur(k) && (k.preventDefault(), k.stopPropagation(), Ft(d) && g());
              },
              onKeyDown: (k) => {
                Kr(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
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
                    onSerializedChange: (k) => m(k)
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
                      disabled: !Ft(d),
                      children: /* @__PURE__ */ r(Po, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ p(it, { children: [
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
        _ && /* @__PURE__ */ p(ke, { children: [
          /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Bs, {}) }) }),
          /* @__PURE__ */ r(me, { align: "end", children: _ })
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
function Ow({
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
  handleAddCommentToThread: m,
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: C,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: L = 5,
  onVerseRefClick: A,
  initialAssignedUser: $
}) {
  const [E, R] = D(Co), [T, I] = D(), [V, H] = D(), P = o, [X, y] = D(!1), [B, ut] = D(!1), [Nt, jt] = D(!1), [mt, Ot] = D(!1), [G, lt] = D(!1), [at, ft] = D(k), [Rt, xe] = D(!1), kt = U(void 0), [ye, se] = D(/* @__PURE__ */ new Map());
  q(() => {
    let S = !0;
    return (async () => {
      const vt = N ? await N(w) : !1;
      S && lt(vt);
    })(), () => {
      S = !1;
    };
  }, [w, N]), q(() => {
    let S = !0;
    if (!o) {
      Ot(!1), se(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const vt = C ? await C(w) : !1;
      S && Ot(vt);
    })(), () => {
      S = !1;
    };
  }, [o, w, C]);
  const _t = U("idle");
  q(() => {
    if (!o) {
      _t.current !== "idle" && (I(void 0), H(void 0), _t.current = "idle");
      return;
    }
    _t.current === "idle" && (_t.current = "pending"), mt ? _t.current === "pending" && $ !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    $ !== s && (I($), _t.current = "auto-populated") : _t.current === "auto-populated" && (I(void 0), _t.current = "pending");
  }, [o, $, mt, s]);
  const qt = j(() => e.filter((S) => !S.deleted), [e]);
  q(() => {
    let S = !0;
    if (!o || !_) {
      se(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const vt = /* @__PURE__ */ new Map();
      await Promise.all(
        qt.map(async (Ht) => {
          const Ms = await _(Ht.id);
          S && vt.set(Ht.id, Ms);
        })
      ), S && se(vt);
    })(), () => {
      S = !1;
    };
  }, [o, qt, _]);
  const ie = j(() => qt[0], [qt]), O = U(null), Y = U(void 0), Q = z(() => {
    var S;
    (S = Y.current) == null || S.call(Y), R(Co);
  }, []), ht = z(() => {
    const S = !at;
    ft(S), xe(!S), g == null || g(w, S);
  }, [at, g, w]);
  q(() => {
    y(!1);
  }, [o]), q(() => {
    if (o && !at && !Rt) {
      const S = setTimeout(() => {
        ft(!0), g == null || g(w, !0);
      }, L * 1e3);
      return kt.current = S, () => clearTimeout(S);
    }
    kt.current && (clearTimeout(kt.current), kt.current = void 0);
  }, [o, at, Rt, L, w, g]);
  const st = j(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), It = j(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const S = En(s, n);
    return Re(n["%comment_assigned_to%"], {
      assignedUser: S
    });
  }, [s, n]), M = j(() => qt.slice(1), [qt]), K = j(() => M.length ?? 0, [M.length]), et = j(() => K > 0, [K]), ct = j(() => X || K <= 2 ? M : M.slice(-2), [M, K, X]), gt = j(() => X || K <= 2 ? 0 : K - 2, [K, X]), Ct = j(
    () => K === 1 ? st.singleReply : Re(st.multipleReplies, { count: K }),
    [K, st]
  ), At = j(
    () => gt === 1 ? st.singleReply : Re(st.multipleReplies, { count: gt }),
    [gt, st]
  );
  q(() => {
    !o && B && et && ut(!1);
  }, [o, B, et]);
  const yt = z(
    async (S) => {
      S && S.stopPropagation();
      const bt = Ft(E) ? An(E) : void 0;
      if (T !== void 0) {
        await m({
          threadId: w,
          contents: bt,
          assignedUser: T
        }) && (H(T), bt && Q());
        return;
      }
      bt && await m({ threadId: w, contents: bt }) && Q();
    },
    [
      Q,
      E,
      m,
      T,
      w
    ]
  ), Pt = z(
    async (S) => {
      const bt = Ft(E) ? An(E) : void 0, vt = S.status ? S.assignedUser : T ?? S.assignedUser, Ht = await m({
        ...S,
        contents: bt,
        assignedUser: vt
      });
      return Ht && (vt !== void 0 && H(vt), bt && Q()), Ht;
    },
    [Q, E, m, T]
  );
  if (qt.length !== 0)
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
            "tw-bg-primary-foreground": !o && d !== "Resolved" && at,
            "tw-bg-background": o && d !== "Resolved" && at,
            "tw-bg-muted": d === "Resolved",
            "tw-bg-accent": !at && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(w);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Xa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              It && /* @__PURE__ */ r(qe, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: It }),
              /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (S) => {
                    S.stopPropagation(), ht();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": at ? n["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : n["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: at ? /* @__PURE__ */ r(Ks, {}) : /* @__PURE__ */ r(Gs, {})
                }
              ),
              G && d !== "Resolved" && /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (S) => {
                    S.stopPropagation(), Pt({
                      threadId: w,
                      status: "Resolved"
                    });
                  },
                  "aria-label": n["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: O,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": P
                  },
                  { "tw-whitespace-nowrap": !P }
                ),
                children: [
                  a && A ? /* @__PURE__ */ r(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (S) => {
                        S.stopPropagation(), A(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    ie.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: ie.selectedText }),
                    ie.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              _o,
              {
                comment: ie,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Pt,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: ut,
                canEditOrDelete: (!B && ye.get(ie.id)) ?? !1,
                canUserResolveThread: G
              }
            )
          ] }),
          /* @__PURE__ */ p(it, { children: [
            et && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Ct })
            ] }),
            !o && Ft(E) && /* @__PURE__ */ r(
              In,
              {
                editorSerializedState: E,
                onSerializedChange: (S) => R(S),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(it, { children: [
              gt > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (S) => {
                    S.stopPropagation(), y(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (S) => {
                    (S.key === "Enter" || S.key === " ") && (S.preventDefault(), S.stopPropagation(), y(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: At }),
                      X ? /* @__PURE__ */ r($o, {}) : /* @__PURE__ */ r(Xe, {})
                    ] })
                  ]
                }
              ),
              ct.map((S) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                _o,
                {
                  comment: S,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: ut,
                  canEditOrDelete: (!B && ye.get(S.id)) ?? !1
                }
              ) }, S.id)),
              b !== !1 && (!B || Ft(E)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (S) => S.stopPropagation(),
                  onKeyDownCapture: (S) => {
                    Ur(S) && (S.preventDefault(), S.stopPropagation(), (Ft(E) || T !== void 0 && T !== V) && yt());
                  },
                  onKeyDown: (S) => {
                    Kr(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      In,
                      {
                        editorSerializedState: E,
                        onSerializedChange: (S) => R(S),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (S) => {
                          Y.current = S;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      T !== void 0 && (Ft(E) || T !== V) && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: Re(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: En(
                            T,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(be, { open: Nt, onOpenChange: jt, children: [
                        /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ r(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !mt || !x || x.length === 0 || !x.includes(i),
                            "aria-label": n["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ r(Ao, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          oe,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (S) => {
                              S.key === "Escape" && (S.stopPropagation(), jt(!1));
                            },
                            children: /* @__PURE__ */ r(he, { children: /* @__PURE__ */ r(ge, { children: x == null ? void 0 : x.map((S) => /* @__PURE__ */ r(
                              re,
                              {
                                onSelect: () => {
                                  I(S !== s ? S : void 0), _t.current = "user-selected", H(void 0), jt(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: En(S, n) })
                              },
                              S || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          onClick: yt,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ft(E) && (T === void 0 || T === V),
                          "aria-label": n["%comment_aria_submit_comment%"] ?? "Submit comment",
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
function fu({
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
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: b
}) {
  const [C, N] = D(/* @__PURE__ */ new Set()), [_, k] = D(), [L, A] = D(), $ = z(
    async (y) => {
      const B = await s(y);
      return B !== void 0 && y.assignedUser !== void 0 && y.assignedUser !== "" && A(y.assignedUser), B;
    },
    [s]
  );
  q(() => {
    g && (N((y) => new Set(y).add(g)), k(g));
  }, [g]);
  const E = n.filter(
    (y) => y.comments.some((B) => !B.deleted)
  ), R = E.map((y) => ({ id: y.id })), T = z(
    (y) => {
      N((B) => new Set(B).add(y.id)), k(y.id), x == null || x(y.id);
    },
    [x]
  ), I = z(
    (y) => {
      const B = C.has(y);
      N((ut) => {
        const Nt = new Set(ut);
        return Nt.has(y) ? Nt.delete(y) : Nt.add(y), Nt;
      }), k(y), x == null || x(B ? void 0 : y);
    },
    [C, x]
  ), { listboxRef: V, activeId: H, handleKeyDown: P } = yw({
    options: R,
    onOptionSelect: T
  }), X = z(
    (y) => {
      y.key === "Escape" ? (_ && C.has(_) && (N((B) => {
        const ut = new Set(B);
        return ut.delete(_), ut;
      }), k(void 0), x == null || x(void 0)), y.preventDefault(), y.stopPropagation()) : P(y);
    },
    [_, C, P, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: V,
      "aria-activedescendant": H ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: X,
      children: E.map((y) => /* @__PURE__ */ r(
        "div",
        {
          className: h({
            "tw-opacity-60": y.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Ow,
            {
              classNameForVerseText: e,
              comments: y.comments,
              localizedStrings: a,
              verseRef: y.verseRef,
              handleSelectThread: I,
              threadId: y.id,
              thread: y,
              isRead: y.isRead,
              isSelected: C.has(y.id),
              currentUser: o,
              assignedUser: y.assignedUser,
              threadStatus: y.status,
              handleAddCommentToThread: $,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: b,
              initialAssignedUser: L
            }
          )
        },
        y.id
      ))
    }
  );
}
function Iw({ table: t }) {
  return /* @__PURE__ */ p(ke, { children: [
    /* @__PURE__ */ r(_l, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Us, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(me, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(bn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(en, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        de,
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
const He = wt.Root, Aw = wt.Group, Ye = wt.Value, Pw = fe(
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
), Pe = v.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = pt();
  return /* @__PURE__ */ p(
    wt.Trigger,
    {
      className: h(Pw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(wt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Xe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Pe.displayName = wt.Trigger.displayName;
const ns = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r($o, { className: "tw-h-4 tw-w-4" })
  }
));
ns.displayName = wt.ScrollUpButton.displayName;
const rs = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Xe, { className: "tw-h-4 tw-w-4" })
  }
));
rs.displayName = wt.ScrollDownButton.displayName;
const $e = v.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = pt();
  return /* @__PURE__ */ r(wt.Portal, { children: /* @__PURE__ */ p(
    wt.Content,
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
        /* @__PURE__ */ r(ns, {}),
        /* @__PURE__ */ r(
          wt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(rs, {})
      ]
    }
  ) });
});
$e.displayName = wt.Content.displayName;
const $w = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
$w.displayName = wt.Label.displayName;
const zt = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  wt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(wt.ItemIndicator, { children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(wt.ItemText, { children: e })
    ]
  }
));
zt.displayName = wt.Item.displayName;
const Lw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Lw.displayName = wt.Separator.displayName;
function Vw({ table: t }) {
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
        He,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Pe, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ye, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r($e, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(zt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(qs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ys, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Xs, { className: "tw-h-4 tw-w-4" })
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
function jw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function un(t, e) {
  const n = e ? `${Eo}, ${e}` : Eo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && jw(o)
  );
}
const zn = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = v.useRef(null);
  v.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), v.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        un(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        i.preventDefault(), un(l)[0].focus();
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
zn.displayName = "Table";
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
const Fw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Fw.displayName = "TableFooter";
function zw(t) {
  v.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? un(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function Bw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Kw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const le = v.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = v.useRef(null);
  v.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), zw(i);
  const l = v.useMemo(
    () => i.current ? un(i.current) : [],
    [i]
  ), w = v.useCallback(
    (d) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        un(f).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Kw(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Bw(l, x, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = m.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [i, l, e]
  ), c = v.useCallback(
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
le.displayName = "TableRow";
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
const Me = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Me.displayName = "TableCell";
const Gw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Gw.displayName = "TableCaption";
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Uw({
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
  var A;
  const [d, m] = D([]), [f, u] = D([]), [g, x] = D({}), [b, C] = D({}), N = j(() => e ?? [], [e]), _ = sa({
    data: N,
    columns: t,
    getCoreRowModel: la(),
    ...n && { getPaginationRowModel: El() },
    onSortingChange: m,
    getSortedRowModel: ia(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Cl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: C,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let L;
  return w ? L = Array.from({ length: 10 }).map((R, T) => `skeleton-row-${T}`).map((R) => /* @__PURE__ */ r(le, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Me, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(yr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, R)) : ((A = _.getRowModel().rows) == null ? void 0 : A.length) > 0 ? L = _.getRowModel().rows.map(($) => /* @__PURE__ */ r(
    le,
    {
      onClick: () => i($, _),
      "data-state": $.getIsSelected() && "selected",
      children: $.getVisibleCells().map((E) => /* @__PURE__ */ r(Me, { children: ln(E.column.columnDef.cell, E.getContext()) }, E.id))
    },
    $.id
  )) : L = /* @__PURE__ */ r(le, { children: /* @__PURE__ */ r(Me, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Iw, { table: _ }),
    /* @__PURE__ */ p(zn, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Bn, { stickyHeader: s, children: _.getHeaderGroups().map(($) => /* @__PURE__ */ r(le, { children: $.headers.map((E) => /* @__PURE__ */ r(mn, { className: "tw-p-0", children: E.isPlaceholder ? void 0 : ln(E.column.columnDef.header, E.getContext()) }, E.id)) }, $.id)) }),
      /* @__PURE__ */ r(Kn, { children: L })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Vw, { table: _ })
  ] });
}
function hu({
  id: t,
  markdown: e,
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
      id: t,
      className: h(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Sl, { options: s, children: e })
    }
  );
}
const qw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), To = (t, e) => t[e] ?? e;
function Hw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = To(n, "%webView_error_dump_header%"), s = To(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Lo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const gu = Object.freeze([
  ...qw,
  "%webView_error_dump_copied_message%"
]);
function bu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = D(!1), w = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(be, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(_e, { asChild: !0, children: o }),
    /* @__PURE__ */ p(oe, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(xt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Hw,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Yw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Yw || {});
function vu({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = D({}), l = (c, d) => {
    const m = !o[c][d];
    a((u) => (u[c][d] = m, { ...u }));
    const f = n[c].items[d];
    f.onUpdate(f.id, m);
  }, w = (c, d) => {
    i((f) => (f[c] = d, { ...f }));
    const m = n[c].items.find((f) => f.id === d);
    m ? m.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(ke, { children: [
    /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ r(Ws, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Xe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(me, { children: n.map((c, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(bn, { children: c.label }),
      /* @__PURE__ */ r(Za, { children: c.itemType === 0 ? /* @__PURE__ */ r(it, { children: c.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        de,
        {
          checked: o[d][f],
          onCheckedChange: () => l(d, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        Dw,
        {
          value: s[d],
          onValueChange: (m) => w(d, m),
          children: c.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(es, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(en, {})
    ] }, c.label)) })
  ] }) });
}
function xu({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const w = new Ni("en", {
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
            /* @__PURE__ */ r(Js, { className: "tw-h-4 tw-w-4" }),
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
            F,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Zs, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(Qs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Xw({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
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
function yu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = j(() => ki(n), [n]), w = ((c) => {
    const d = new Intl.DisplayNames(_i(), { type: "language" });
    return c.map((m) => d.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Xw, { versionHistory: a }),
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
function Ww({
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
  isDisabled: m = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: b
}) {
  const [C, N] = D(!1), _ = z(
    (T) => {
      var V;
      const I = (V = t.find((H) => H.label === T)) == null ? void 0 : V.value;
      I && n(
        e.includes(I) ? e.filter((H) => H !== I) : [...e, I]
      );
    },
    [t, e, n]
  ), k = () => w || o, L = j(() => {
    if (!f) return t;
    const T = t.filter((V) => V.starred).sort((V, H) => V.label.localeCompare(H.label)), I = t.filter((V) => !V.starred).sort((V, H) => {
      const P = e.includes(V.value), X = e.includes(H.value);
      return P && !X ? -1 : !P && X ? 1 : V.label.localeCompare(H.label);
    });
    return [...T, ...I];
  }, [t, e, f]), A = () => {
    n(t.map((T) => T.value));
  }, $ = () => {
    n([]);
  }, E = c ?? C;
  return /* @__PURE__ */ r("div", { id: b, className: g, children: /* @__PURE__ */ p(be, { open: E, onOpenChange: d ?? N, children: [
    /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": E,
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
          /* @__PURE__ */ r(Vo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(oe, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(he, { children: [
      /* @__PURE__ */ r(Qe, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: A, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: $, children: i })
      ] }),
      /* @__PURE__ */ p(ge, { children: [
        /* @__PURE__ */ r(gn, { children: l }),
        /* @__PURE__ */ r(te, { children: L.map((T) => /* @__PURE__ */ p(
          re,
          {
            value: T.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                ne,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(ti, { className: "tw-h-4 tw-w-4" }),
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
function Nu({
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
  id: m
}) {
  return /* @__PURE__ */ p("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Ww,
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
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((f) => {
      var u;
      return /* @__PURE__ */ p(qe, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
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
    }) }) : /* @__PURE__ */ r(xt, { children: d })
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
const Jw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ro = (t, e) => t[e] ?? e;
function Zw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const w = j(() => /Macintosh/i.test(navigator.userAgent), []), c = Ro(a, "%undoButton_tooltip%"), d = Ro(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(Gr, { children: [
    /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": c,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(ei, {})
        }
      ) }),
      /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ p("p", { children: [
        c,
        s && /* @__PURE__ */ p(it, { children: [
          " ",
          /* @__PURE__ */ r(Nr, { children: w ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ r(Ua, {}),
    e && /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(ni, {})
        }
      ) }),
      /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ p("p", { children: [
        d,
        s && /* @__PURE__ */ p(it, { children: [
          " ",
          /* @__PURE__ */ r(Nr, { children: w ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Qw({
  children: t,
  editorRef: e,
  canUndo: n = !0,
  canRedo: o = !0
}) {
  const a = U(null);
  return q(() => {
    var w;
    const s = /Macintosh/i.test(navigator.userAgent), i = ((w = a.current) == null ? void 0 : w.querySelector(".editor-input")) ?? void 0, l = (c) => {
      var m, f, u, g;
      if (!i || document.activeElement !== i) return;
      const d = c.key.toLowerCase();
      if (s) {
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
const nn = v.forwardRef(
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
nn.displayName = "Input";
const td = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function ed({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = U(null), i = U(null), l = U(!1), [w, c] = D(t), [d, m] = D(n), [f, u] = D(!1);
  q(() => {
    c(t);
  }, [t]), q(() => {
    d !== n && m(n);
  }, [n]);
  const g = (b) => {
    l.current = !1, u(b), b || (w !== "custom" || d ? (e(w), o(d)) : (c(t), m(n)));
  }, x = (b) => {
    var C, N, _, k;
    b.stopPropagation(), document.activeElement === i.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((C = s.current) == null || C.focus(), l.current = !0) : document.activeElement === s.current && b.key === "ArrowUp" ? ((N = i.current) == null || N.focus(), l.current = !1) : document.activeElement === s.current && b.key === "ArrowLeft" && ((_ = s.current) == null ? void 0 : _.selectionStart) === 0 && ((k = i.current) == null || k.focus(), l.current = !1), w === "custom" && b.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ p(ke, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: td(t, a, n) }) }) }),
      /* @__PURE__ */ r(Vt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      me,
      {
        style: { zIndex: ca },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var b;
          l.current && ((b = s.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ r(bn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(en, {}),
          /* @__PURE__ */ r(
            de,
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
            de,
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
            de,
            {
              ref: i,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (b) => {
                var C;
                b.stopPropagation(), l.current = !0, (C = s.current) == null || C.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  nn,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
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
const nd = (t, e) => t === "f" ? /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r(Fo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r(zo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(it, { children: [
  /* @__PURE__ */ r(jo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), rd = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), Re(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function od({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(ke, { children: [
    /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(gl, { asChild: !0, children: /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: nd(t, n) }) }) }),
      /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r("p", { children: rd(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(me, { style: { zIndex: ca }, children: [
      /* @__PURE__ */ r(bn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(en, {}),
      /* @__PURE__ */ p(
        de,
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
        de,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Fo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        de,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(zo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const ad = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function sd({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? ri, { className: e, size: 16 });
}
function So({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    re,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(sd, { icon: t.icon }) }) }),
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
  const [o, a] = D(""), [s, i] = j(() => {
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
  return /* @__PURE__ */ p(he, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Qe,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(ge, { children: [
      /* @__PURE__ */ r(gn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(te, { children: s.map((l) => {
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
      i.length > 0 && /* @__PURE__ */ p(it, { children: [
        s.length > 0 && /* @__PURE__ */ r(Or, { alwaysRender: !0 }),
        /* @__PURE__ */ r(te, { children: i.map((l) => {
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
function ld(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = _n[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[_n[l].description] ?? _n[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function cd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function wd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const dd = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function ku({
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
  const d = U(null), m = U(null), f = U(null), u = U(null);
  Bt(() => {
    if (!u.current) return;
    const { width: M } = u.current.getBoundingClientRect();
    M > 0 && (u.current.style.width = `${M}px`);
  }, []);
  const [g, x] = D("generated"), [b, C] = D("generated"), [N, _] = D("*"), [k, L] = D("*"), [A, $] = D("f"), [E, R] = D(!1), [T, I] = D(!0), [V, H] = D(!1), P = U(!1), X = U(""), [y, B] = D(!1), [ut, Nt] = D(), [jt, mt] = D(), [Ot, G] = D(), [lt, at] = D(), ft = U(null), Rt = j(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? Dl(), noteMode: "expanded" }
    }),
    [i, l]
  ), xe = j(
    () => ld(
      d,
      () => B(!1),
      w,
      lt
    ),
    [w, lt]
  );
  q(() => {
    var M;
    y || (M = d.current) == null || M.focus();
  }, [A, y]), q(() => {
    var et, ct;
    let M;
    P.current = !1, I(!0);
    const K = e == null ? void 0 : e.at(0);
    if (K && xn("note", K)) {
      const gt = (et = K.insert.note) == null ? void 0 : et.caller;
      let Ct = "custom";
      gt === wr ? Ct = "generated" : gt === dr ? Ct = "hidden" : gt && (_(gt), L(gt)), x(Ct), C(Ct), $(((ct = K.insert.note) == null ? void 0 : ct.style) ?? "f"), M = setTimeout(() => {
        var At;
        (At = d.current) == null || At.applyUpdate([K]);
      }, 0);
    }
    return () => {
      M && clearTimeout(M);
    };
  }, [e, s]);
  const kt = z(
    (M, K, et = !1) => {
      var gt, Ct, At;
      const ct = (Ct = (gt = d.current) == null ? void 0 : gt.getNoteOps(0)) == null ? void 0 : Ct.at(0);
      if (ct && xn("note", ct)) {
        if (ct.insert.note) {
          let yt;
          M === "custom" ? yt = K : M === "generated" ? yt = wr : yt = dr, ct.insert.note.caller = yt;
        }
        n == null || n([ct]), et && c && s && ((At = c.current) == null || At.replaceEmbedUpdate(s, [ct]));
      }
    },
    [s, n, c]
  ), ye = z(() => {
    kt(g, N, !0), o();
  }, [g, N, o, kt]), se = U(ye);
  Bt(() => {
    se.current = ye;
  });
  const _t = U({ book: a.book, chapterNum: a.chapterNum });
  Bt(() => {
    (_t.current.book !== a.book || _t.current.chapterNum !== a.chapterNum) && (_t.current = { book: a.book, chapterNum: a.chapterNum }, se.current());
  }, [a.book, a.chapterNum]);
  const qt = () => {
    var K;
    const M = (K = m.current) == null ? void 0 : K.getElementsByClassName("editor-input")[0];
    M != null && M.textContent && navigator.clipboard.writeText(M.textContent);
  }, ie = z(
    (M) => {
      x(M), kt(M, N);
    },
    [N, kt]
  ), O = z(
    (M) => {
      _(M), kt(g, M);
    },
    [g, kt]
  ), Y = (M) => {
    var et, ct, gt, Ct, At;
    $(M);
    const K = (ct = (et = d.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : ct.at(0);
    if (K && xn("note", K)) {
      K.insert.note && (K.insert.note.style = M);
      const yt = (Ct = (gt = K.insert.note) == null ? void 0 : gt.contents) == null ? void 0 : Ct.ops;
      A !== "x" && M === "x" ? yt == null || yt.forEach((Pt) => cd(Pt)) : A === "x" && M !== "x" && (yt == null || yt.forEach((Pt) => wd(Pt))), (At = d.current) == null || At.applyUpdate([K, { delete: 1 }]);
    }
  }, Q = (M) => {
    at(M.contextMarker), H(M.canRedo);
  }, ht = z(
    (M) => {
      var et, ct, gt, Ct, At;
      const K = (ct = (et = d.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : ct.at(0);
      if (K && xn("note", K)) {
        M.content.length > 1 && setTimeout(() => {
          var S;
          (S = d.current) == null || S.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const yt = (gt = K.insert.note) == null ? void 0 : gt.style, Pt = (At = (Ct = K.insert.note) == null ? void 0 : Ct.contents) == null ? void 0 : At.ops;
        if (yt || R(!1), R(
          yt === "x" ? !!(Pt != null && Pt.every((S) => {
            var vt, Ht;
            if (!((vt = S.attributes) != null && vt.char)) return !0;
            const bt = ((Ht = S.attributes) == null ? void 0 : Ht.char).style;
            return bt === "xt" || bt === "xo" || bt === "xq";
          })) : !!(Pt != null && Pt.every((S) => {
            var vt, Ht;
            if (!((vt = S.attributes) != null && vt.char)) return !0;
            const bt = ((Ht = S.attributes) == null ? void 0 : Ht.char).style;
            return bt === "ft" || bt === "fr" || bt === "fq";
          }))
        ), !P.current) {
          P.current = !0, X.current = JSON.stringify(K), I(!0);
          return;
        }
        I(JSON.stringify(K) === X.current), kt(g, N);
      } else
        R(!1), I(!0);
    },
    [g, N, kt]
  ), st = z(() => {
    const M = window.getSelection();
    if (f.current && xe.length && M && M.rangeCount > 0) {
      const K = M.getRangeAt(0).getBoundingClientRect(), et = f.current.getBoundingClientRect();
      Nt(K.left - et.left), mt(K.top - et.top), G(K.height), B(!0);
    }
  }, [xe, f]);
  q(() => {
    const M = () => {
      y && B(!1);
    };
    return window.addEventListener("click", M), () => {
      window.removeEventListener("click", M);
    };
  }, [y]), q(() => {
    var M;
    y && ((M = ft.current) == null || M.focus());
  }, [y]), q(() => {
    var et;
    const M = ((et = m.current) == null ? void 0 : et.querySelector(".editor-input")) ?? void 0, K = (ct) => {
      !y && M && document.activeElement === M && ct.key === l ? (ct.preventDefault(), st()) : y && ct.key === "Escape" && (ct.preventDefault(), B(!1));
    };
    return document.addEventListener("keydown", K), () => {
      document.removeEventListener("keydown", K);
    };
  }, [y, st, l]);
  const It = w["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ p(it, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            od,
            {
              isTypeSwitchable: E,
              noteType: A,
              handleNoteTypeChange: Y,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            ed,
            {
              callerType: g,
              updateCallerType: ie,
              customCaller: N,
              updateCustomCaller: O,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-full tw-justify-end", children: /* @__PURE__ */ p(Gr, { children: [
          /* @__PURE__ */ r(
            Zw,
            {
              onUndoClick: () => {
                var M;
                return (M = d.current) == null ? void 0 : M.undo();
              },
              onRedoClick: () => {
                var M;
                return (M = d.current) == null ? void 0 : M.redo();
              },
              canUndo: !T,
              canRedo: V,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            Ha,
            {
              onCancelClick: o,
              onAcceptClick: ye,
              canAccept: !T || b !== g || g === "custom" && N !== k,
              localizedStrings: w,
              acceptLabel: w["%footnoteEditor_saveButton_tooltip%"]
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
              Qw,
              {
                editorRef: d,
                canUndo: !T,
                canRedo: V,
                children: /* @__PURE__ */ r(
                  Ml,
                  {
                    options: Rt,
                    onStateChange: Q,
                    onUsjChange: ht,
                    defaultUsj: dd,
                    onScrRefChange: () => {
                    },
                    scrRef: a,
                    ref: d
                  }
                )
              }
            ) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
              /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  "aria-label": It,
                  onClick: qt,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Lo, {})
                }
              ) }),
              /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r("p", { children: It }) })
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
    /* @__PURE__ */ p(be, { open: y, children: [
      /* @__PURE__ */ r(
        Gl,
        {
          className: "tw-absolute",
          style: {
            top: jt,
            left: ut,
            height: Ot,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        oe,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (M) => {
            M.preventDefault(), M.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            id,
            {
              markerMenuItems: xe,
              localizedStrings: w,
              searchRef: ft
            }
          )
        }
      )
    ] })
  ] });
}
const _u = Object.freeze([
  ...ad,
  ...Object.entries(_n).map(([, t]) => t.description).filter((t) => !!t),
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%",
  ...Jw,
  ...qa
]);
function os(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function pd(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, w) => {
    const c = w === s.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Hr(t, l, n, !0, a),
      c && o
    ] }, os(t, l));
  });
}
function Hr(t, e, n = !0, o = !0, a = []) {
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
              /* @__PURE__ */ r(ir, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(ir, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return ud(
        s,
        os(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function ud(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      ir,
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
function md({
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
  /* @__PURE__ */ p("span", { className: h("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ p(it, { children: [
    Hr(t.marker, [i], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = h(f, u);
  return /* @__PURE__ */ p(it, { children: [
    /* @__PURE__ */ p("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      w,
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
        children: l && l.length > 0 && /* @__PURE__ */ r(it, { children: pd(t.marker, l, o, c) })
      }
    )
  ] });
}
function Cu({
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
  const d = w ?? Ci(n, void 0), m = (N, _) => {
    c == null || c(N, _, a);
  }, f = s ? n.findIndex((N) => N === s) : -1, [u, g] = D(f), x = (N, _, k) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), c == null || c(_, k, a);
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
  }, C = U([]);
  return q(() => {
    var N;
    u >= 0 && u < C.current.length && ((N = C.current[u]) == null || N.focus());
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
            const k = N === s, L = `${a}-${_}`;
            return /* @__PURE__ */ p(it, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (A) => {
                    C.current[_] = A;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === u ? 0 : -1,
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
                  onClick: () => m(N, _),
                  onKeyDown: (A) => x(A, N, _),
                  children: /* @__PURE__ */ r(
                    md,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => d(N.caller, _),
                      showMarkers: i
                    }
                  )
                },
                L
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Ie, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function fd(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function hd({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = j(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(zn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Bn, { stickyHeader: !0, children: /* @__PURE__ */ p(le, { children: [
      /* @__PURE__ */ r(mn, { children: a }),
      /* @__PURE__ */ r(mn, { children: s })
    ] }) }),
    /* @__PURE__ */ r(Kn, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ p(
      le,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Me, { children: Se(l.reference, "English") }),
          /* @__PURE__ */ r(Me, { className: o, children: fd(l.text) })
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
        children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Yr.displayName = pr.Root.displayName;
const gd = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(ii, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(li, { className: "tw-h-4 tw-w-4" });
}, Gn = (t, e, n) => /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
  /* @__PURE__ */ p(
    Gt,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        gd(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Vt, { side: "bottom", children: e })
] }) }), Eu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Gn(e, t)
}), bd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Gn(n, t)
}), Tu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Gn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), nr = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((w) => {
    e === "approved" ? i.includes(w) || i.push(w) : i = i.filter((c) => c !== w);
  }), o(i);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), s(l);
}, Ru = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => Gn(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(Br, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
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
          children: /* @__PURE__ */ r(oi, {})
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
          children: /* @__PURE__ */ r(ai, {})
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
          children: /* @__PURE__ */ r(si, {})
        }
      )
    ] });
  }
}), Su = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Du = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Mu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, vd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ou = Object.freeze([
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
]), xd = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, yd = (t, e, n) => t.map((o) => {
  const a = no(o.key) ? o.key : o.key[0];
  return {
    items: no(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || vd(a, e, n),
    occurrences: o.occurrences || []
  };
}), Wt = (t, e) => t[e] ?? e;
function Iu({
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
  classNameForVerseText: m,
  onItemSelected: f
}) {
  const u = Wt(n, "%webView_inventory_all%"), g = Wt(n, "%webView_inventory_approved%"), x = Wt(n, "%webView_inventory_unapproved%"), b = Wt(n, "%webView_inventory_unknown%"), C = Wt(n, "%webView_inventory_scope_currentBook%"), N = Wt(n, "%webView_inventory_scope_chapter%"), _ = Wt(n, "%webView_inventory_scope_verse%"), k = Wt(n, "%webView_inventory_filter_text%"), L = Wt(
    n,
    "%webView_inventory_show_additional_items%"
  ), A = Wt(n, "%webView_inventory_no_results%"), [$, E] = D(!1), [R, T] = D("all"), [I, V] = D(""), [H, P] = D([]), X = j(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : yd(G, a, s);
  }, [t, a, s]), y = j(() => {
    if ($) return X;
    const G = [];
    return X.forEach((lt) => {
      const at = lt.items[0], ft = G.find(
        (Rt) => Rt.items[0] === at
      );
      ft ? (ft.count += lt.count, ft.occurrences = ft.occurrences.concat(lt.occurrences)) : G.push({
        items: [at],
        count: lt.count,
        occurrences: lt.occurrences,
        status: lt.status
      });
    }), G;
  }, [$, X]), B = j(() => y.length === 0 ? [] : xd(y, R, I), [y, R, I]), ut = j(() => {
    var at, ft;
    if (!$) return w;
    const G = (at = o == null ? void 0 : o.tableHeaders) == null ? void 0 : at.length;
    if (!G) return w;
    const lt = [];
    for (let Rt = 0; Rt < G; Rt++)
      lt.push(
        bd(
          ((ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft[Rt]) || "Additional Item",
          Rt + 1
        )
      );
    return [...lt, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, $]);
  q(() => {
    B.length === 0 ? P([]) : B.length === 1 && P(B[0].items);
  }, [B]);
  const Nt = (G, lt) => {
    lt.setRowSelection(() => {
      const ft = {};
      return ft[G.index] = !0, ft;
    });
    const at = G.original.items;
    P(at), f && at.length > 0 && f(at[0]);
  }, jt = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      l(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, mt = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      T(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, Ot = j(() => {
    if (y.length === 0 || H.length === 0) return [];
    const G = y.filter((lt) => Ei(
      $ ? lt.items : [lt.items[0]],
      H
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [H, $, y]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        He,
        {
          onValueChange: (G) => mt(G),
          defaultValue: R,
          children: [
            /* @__PURE__ */ r(Pe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ye, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p($e, { children: [
              /* @__PURE__ */ r(zt, { value: "all", children: u }),
              /* @__PURE__ */ r(zt, { value: "approved", children: g }),
              /* @__PURE__ */ r(zt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(zt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(He, { onValueChange: (G) => jt(G), defaultValue: i, children: [
        /* @__PURE__ */ r(Pe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ye, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p($e, { children: [
          /* @__PURE__ */ r(zt, { value: "book", children: C }),
          /* @__PURE__ */ r(zt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(zt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        nn,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: k,
          value: I,
          onChange: (G) => {
            V(G.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(Lt, { children: /* @__PURE__ */ p(Kt, { children: [
        /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Yr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: $,
              onCheckedChange: (G) => {
                E(G);
              }
            }
          ),
          /* @__PURE__ */ r(xt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? L })
        ] }) }),
        /* @__PURE__ */ r(Vt, { children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Uw,
      {
        columns: ut,
        data: B,
        onRowClickHandler: Nt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: A
      }
    ) }),
    Ot.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      hd,
      {
        classNameForText: m,
        occurrenceData: Ot,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const Nd = "16rem", kd = "3rem", as = v.createContext(void 0);
function Un() {
  const t = v.useContext(as);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ss = v.forwardRef(
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
    const [c, d] = v.useState(t), m = e ?? c, f = v.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(m) : _;
        n ? n(k) : d(k);
      },
      [n, m]
    ), u = v.useCallback(() => f((_) => !_), [f]), g = m ? "expanded" : "collapsed", C = pt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = v.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: C
      }),
      [g, m, f, u, C]
    );
    return /* @__PURE__ */ r(as.Provider, { value: N, children: /* @__PURE__ */ r(Lt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Nd,
            "--sidebar-width-icon": kd,
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
        children: s
      }
    ) }) });
  }
);
ss.displayName = "SidebarProvider";
const is = v.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Un();
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
is.displayName = "Sidebar";
const _d = v.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Un();
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
        a.side === "primary" ? /* @__PURE__ */ r(ci, {}) : /* @__PURE__ */ r(wi, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
_d.displayName = "SidebarTrigger";
const Cd = v.forwardRef(
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
Cd.displayName = "SidebarRail";
const ls = v.forwardRef(
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
ls.displayName = "SidebarInset";
const Ed = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nn,
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
Ed.displayName = "SidebarInput";
const Td = v.forwardRef(
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
Td.displayName = "SidebarHeader";
const Rd = v.forwardRef(
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
Rd.displayName = "SidebarFooter";
const Sd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ie,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Sd.displayName = "SidebarSeparator";
const cs = v.forwardRef(
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
cs.displayName = "SidebarContent";
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
  e ? Le : "div",
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
const Dd = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Le : "button",
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
Dd.displayName = "SidebarGroupAction";
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
const ws = v.forwardRef(
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
ws.displayName = "SidebarMenu";
const ds = v.forwardRef(
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
ds.displayName = "SidebarMenuItem";
const Md = fe(
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
), ps = v.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const w = t ? Le : "button", { state: c } = Un(), d = /* @__PURE__ */ r(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(Md({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: d }),
      /* @__PURE__ */ r(Vt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : d;
  }
);
ps.displayName = "SidebarMenuButton";
const Od = v.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Le : "button",
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
Od.displayName = "SidebarMenuAction";
const Id = v.forwardRef(
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
Id.displayName = "SidebarMenuBadge";
const Ad = v.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
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
Ad.displayName = "SidebarMenuSkeleton";
const Pd = v.forwardRef(
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
Pd.displayName = "SidebarMenuSub";
const $d = v.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
$d.displayName = "SidebarMenuSubItem";
const Ld = v.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? Le : "a",
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
Ld.displayName = "SidebarMenuSubButton";
function Vd({
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
  const c = z(
    (f, u) => {
      o(f, u);
    },
    [o]
  ), d = z(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = z(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    is,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ p(cs, { children: [
        /* @__PURE__ */ p(kr, { children: [
          /* @__PURE__ */ r(_r, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Cr, { children: /* @__PURE__ */ r(ws, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ r(ds, { children: /* @__PURE__ */ r(
            ps,
            {
              onClick: () => c(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(kr, { children: [
          /* @__PURE__ */ r(_r, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Cr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            hr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Pl },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = d(f);
                c(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(di, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Xr = fn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const w = pt();
    return /* @__PURE__ */ p("div", { id: i, className: h("tw-relative", { "tw-w-full": o }, a), children: [
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
        nn,
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
function Au({
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
      Xr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      ss,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Vd,
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
          /* @__PURE__ */ r(ls, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Ne = "scrBook", jd = "scrRef", Te = "source", Fd = "details", zd = "Scripture Reference", Bd = "Scripture Book", us = "Type", Kd = "Details";
function Gd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Ne,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? zd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? dt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Ne ? Se(a.start) : void 0;
      },
      getGroupingValue: (o) => dt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => lr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Se(o.start),
      id: jd,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Se(a.start);
      },
      sortingFn: (o, a) => lr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Te,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? us : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Fd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Kd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Ud = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || lr(t.start, t.end) === 0 ? `${qn(t.start)}+${e}` : `${qn(t.start)}+${e}-${qn(t.end)}+${n}`;
}, Do = (t) => `${Ud({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Pu({
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
  const [c, d] = D([]), [m, f] = D([{ id: Ne, desc: !1 }]), [u, g] = D({}), x = j(
    () => t.flatMap((R) => R.data.map((T) => ({
      ...T,
      source: R.source
    }))),
    [t]
  ), b = j(
    () => Gd(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  q(() => {
    c.includes(Te) ? f([
      { id: Te, desc: !1 },
      { id: Ne, desc: !1 }
    ]) : f([{ id: Ne, desc: !1 }]);
  }, [c]);
  const C = sa({
    data: x,
    columns: b,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Rl(),
    getGroupedRowModel: Tl(),
    getCoreRowModel: la(),
    getSortedRowModel: ia(),
    getRowId: Do,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const R = C.getSelectedRowModel().rowsById, T = Object.keys(R);
      if (T.length === 1) {
        const I = x.find((V) => Do(V) === T[0]) || void 0;
        I && l(I);
      }
    }
  }, [u, x, l, C]);
  const N = a ?? Bd, _ = s ?? us, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [Ne] },
    { label: `Group by ${_}`, value: [Te] },
    {
      label: `Group by ${N} and ${_}`,
      value: [Ne, Te]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [Te, Ne]
    }
  ], L = (R) => {
    d(JSON.parse(R));
  }, A = (R, T) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(T);
  }, $ = (R, T) => R.getIsGrouped() ? "" : h("banded-row", T % 2 === 0 ? "even" : "odd"), E = (R, T, I) => {
    if (!((R == null ? void 0 : R.length) === 0 || T.depth < I.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ p("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      He,
      {
        value: JSON.stringify(c),
        onValueChange: (R) => {
          L(R);
        },
        children: [
          /* @__PURE__ */ r(Pe, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ye, {}) }),
          /* @__PURE__ */ r($e, { position: "item-aligned", children: /* @__PURE__ */ r(Aw, { children: k.map((R) => /* @__PURE__ */ r(zt, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(zn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Bn, { children: C.getHeaderGroups().map((R) => /* @__PURE__ */ r(le, { children: R.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(mn, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
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
          ln(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, R.id)) }),
      /* @__PURE__ */ r(Kn, { children: C.getRowModel().rows.map((R, T) => {
        const I = pt();
        return /* @__PURE__ */ r(
          le,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: h($(R, T)),
            onClick: (V) => A(R, V),
            children: R.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== Te || !n)))
                return /* @__PURE__ */ r(
                  Me,
                  {
                    className: h(
                      V.column.columnDef.id,
                      "tw-p-[1px]",
                      E(c, R, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ r(Xe, {}),
                          !R.getIsExpanded() && (I === "ltr" ? /* @__PURE__ */ r(Ke, {}) : /* @__PURE__ */ r(sr, {})),
                          " ",
                          ln(V.column.columnDef.cell, V.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : ln(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          R.id
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
}), ms = (t, e, n) => Wr(t, e).every((o) => n.includes(o));
function qd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Wr(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        ms(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Kl(
        t,
        i,
        l,
        w,
        c
      )
    }
  );
}
const Mo = 5, rr = 6;
function Hd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, C] = D(!1), [N, _] = D(""), k = U(void 0), L = U(!1);
  if (t.length !== dt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const A = j(() => dt.allBookIds.filter(
    (P, X) => t[X] === "1" && !dt.isObsolete(dt.bookIdToNumber(P))
  ), [t]), $ = j(() => {
    if (!N.trim()) {
      const y = {
        [W.OT]: [],
        [W.NT]: [],
        [W.DC]: [],
        [W.Extra]: []
      };
      return A.forEach((B) => {
        const ut = sn(B);
        y[ut].push(B);
      }), y;
    }
    const P = A.filter(
      (y) => Ar(y, N, a)
    ), X = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return P.forEach((y) => {
      const B = sn(y);
      X[B].push(y);
    }), X;
  }, [A, N, a]), E = z(
    (P, X = !1) => {
      if (!X || !k.current) {
        n(
          e.includes(P) ? e.filter((mt) => mt !== P) : [...e, P]
        ), k.current = P;
        return;
      }
      const y = A.findIndex((mt) => mt === k.current), B = A.findIndex((mt) => mt === P);
      if (y === -1 || B === -1) return;
      const [ut, Nt] = [
        Math.min(y, B),
        Math.max(y, B)
      ], jt = A.slice(ut, Nt + 1).map((mt) => mt);
      n(
        e.includes(P) ? e.filter((mt) => !jt.includes(mt)) : [.../* @__PURE__ */ new Set([...e, ...jt])]
      );
    },
    [e, n, A]
  ), R = (P) => {
    E(P, L.current), L.current = !1;
  }, T = (P, X) => {
    P.preventDefault(), E(X, P.shiftKey);
  }, I = z(
    (P) => {
      const X = Wr(A, P).map((y) => y);
      n(
        ms(A, P, e) ? e.filter((y) => !X.includes(y)) : [.../* @__PURE__ */ new Set([...e, ...X])]
      );
    },
    [e, n, A]
  ), V = () => {
    n(A.map((P) => P));
  }, H = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(W).map((P) => /* @__PURE__ */ r(
      qd,
      {
        section: P,
        availableBookIds: A,
        selectedBookIds: e,
        onToggle: I,
        localizedStrings: o
      },
      P
    )) }),
    /* @__PURE__ */ p(
      be,
      {
        open: b,
        onOpenChange: (P) => {
          C(P), P || _("");
        },
        children: [
          /* @__PURE__ */ r(_e, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(Vo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(oe, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            he,
            {
              shouldFilter: !1,
              onKeyDown: (P) => {
                P.key === "Enter" && (L.current = P.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Qe,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: V, children: w }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: H, children: c })
                ] }),
                /* @__PURE__ */ p(ge, { children: [
                  /* @__PURE__ */ r(gn, { children: d }),
                  Object.values(W).map((P, X) => {
                    const y = $[P];
                    if (y.length !== 0)
                      return /* @__PURE__ */ p(Oo, { children: [
                        /* @__PURE__ */ r(
                          te,
                          {
                            heading: fa(P, f, u, g, x),
                            children: y.map((B) => /* @__PURE__ */ r(
                              ga,
                              {
                                bookId: B,
                                isSelected: e.includes(B),
                                onSelect: () => R(B),
                                onMouseDown: (ut) => T(ut, B),
                                section: sn(B),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: fr(B, a),
                                className: "tw-flex tw-items-center"
                              },
                              B
                            ))
                          }
                        ),
                        X < Object.values(W).length - 1 && /* @__PURE__ */ r(Or, {})
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
        e.length === rr ? rr : Mo
      ).map((P) => /* @__PURE__ */ r(qe, { className: "hover:tw-bg-secondary", variant: "secondary", children: ze(P, a) }, P)),
      e.length > rr && /* @__PURE__ */ r(
        qe,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Mo} ${m}`
        }
      )
    ] })
  ] });
}
const $u = Object.freeze([
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
]), Ce = (t, e) => t[e] ?? e;
function Lu({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: w
}) {
  const c = Ce(
    i,
    "%webView_scope_selector_selected_text%"
  ), d = Ce(
    i,
    "%webView_scope_selector_current_verse%"
  ), m = Ce(
    i,
    "%webView_scope_selector_current_chapter%"
  ), f = Ce(i, "%webView_scope_selector_current_book%"), u = Ce(i, "%webView_scope_selector_choose_books%"), g = Ce(i, "%webView_scope_selector_scope%"), x = Ce(i, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], C = e ? b.filter((N) => e.includes(N.value)) : b;
  return /* @__PURE__ */ p("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(xt, { children: g }),
      /* @__PURE__ */ r(
        Pr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: C.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Sn, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(xt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(xt, { children: x }),
      /* @__PURE__ */ r(
        Hd,
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
function Vu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
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
  }, w = pt();
  return /* @__PURE__ */ p(
    He,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Pe, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Ye,
          {
            placeholder: l[Z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          $e,
          {
            id: i,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: Ze },
            children: t.map((c) => /* @__PURE__ */ r(zt, { value: `${c}`, children: l[Z(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function ju({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Fu({
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
function zu({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Ie, {}) : ""
  ] });
}
function fs(t, e) {
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
const hs = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ p(Kt, { children: [
  /* @__PURE__ */ r(Gt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
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
  ) : /* @__PURE__ */ p(Sw, { children: [
    /* @__PURE__ */ r(Qa, { children: l.label }),
    /* @__PURE__ */ r(Rw, { children: /* @__PURE__ */ r(ts, { children: hs(
      t,
      e,
      fs(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Vt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function Er({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(ke, { variant: s, children: [
    /* @__PURE__ */ r(Ae, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(pi, {}) }) }),
    /* @__PURE__ */ r(me, { align: "start", style: { zIndex: Ze }, children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ p(Oo, { children: [
      /* @__PURE__ */ r(Za, { children: /* @__PURE__ */ r(Lt, { children: hs(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ r(en, {})
    ] }, w)) })
  ] });
}
const gs = v.forwardRef(
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
function Bu({
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
  return /* @__PURE__ */ p(gs, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      Er,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(ui, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        Er,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(mi, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function Ku({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(gs, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
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
const bs = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
  return /* @__PURE__ */ r(
    Mt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
bs.displayName = Mt.List.displayName;
const vs = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
vs.displayName = Mt.List.displayName;
const Yd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), xs = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Content,
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
xs.displayName = Mt.Content.displayName;
function Gu({
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
        Xr,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(bs, { children: [
      /* @__PURE__ */ r(vs, { children: t.map((l) => /* @__PURE__ */ r(Yd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(xs, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Xd({ ...t }) {
  return /* @__PURE__ */ r(rt.Menu, { ...t });
}
function Wd({ ...t }) {
  return /* @__PURE__ */ r(rt.Sub, { "data-slot": "menubar-sub", ...t });
}
const ys = v.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = v.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(qr.Provider, { value: a, children: /* @__PURE__ */ r(
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
ys.displayName = rt.Root.displayName;
const Ns = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Xt();
  return /* @__PURE__ */ r(
    rt.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        ve({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
Ns.displayName = rt.Trigger.displayName;
const ks = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Xt();
  return /* @__PURE__ */ p(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ve({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ke, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ks.displayName = rt.SubTrigger.displayName;
const _s = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Xt();
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
_s.displayName = rt.SubContent.displayName;
const Cs = v.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Xt();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
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
Cs.displayName = rt.Content.displayName;
const Es = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Xt();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ve({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Es.displayName = rt.Item.displayName;
const Jd = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Xt();
  return /* @__PURE__ */ p(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ve({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Jd.displayName = rt.CheckboxItem.displayName;
const Zd = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Xt();
  return /* @__PURE__ */ p(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ve({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Zd.displayName = rt.RadioItem.displayName;
const Qd = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Qd.displayName = rt.Label.displayName;
const Ts = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ts.displayName = rt.Separator.displayName;
const on = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Rs = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ p(Kt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        Es,
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
      ) : /* @__PURE__ */ p(Wd, { children: [
        /* @__PURE__ */ r(ks, { children: c.label }),
        /* @__PURE__ */ r(_s, { children: Rs(
          t,
          e,
          fs(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Vt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && i < a.length - 1 && w.push(/* @__PURE__ */ r(Ts, {}, `separator-${s}`)), w;
  });
};
function tp({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = U(void 0), s = U(void 0), i = U(void 0), l = U(void 0), w = U(void 0), c = (d) => {
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
  if (Ol(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, m) => {
    var g, x, b, C;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        on(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), on(s, [f, u]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), on(i, [f, u]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), on(l, [f, u]);
        break;
      case "alt+h":
        (C = w.current) == null || C.focus(), on(w, [f, u]);
        break;
    }
  }), q(() => {
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
    return /* @__PURE__ */ r(ys, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, m]) => typeof d == "boolean" || typeof m == "boolean" ? 0 : d.order - m.order).map(([d, m]) => /* @__PURE__ */ p(Xd, { children: [
      /* @__PURE__ */ r(Ns, { ref: c(d), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        Cs,
        {
          style: { zIndex: Ze },
          children: /* @__PURE__ */ r(Lt, { children: Rs(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Uu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function qu({
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
  const d = U(void 0);
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
                  i,
                  t && /* @__PURE__ */ r(
                    tp,
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
const ep = (t, e) => t[e] ?? e;
function Hu({
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
  const c = ep(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, m] = D(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), m(!1);
  }, u = (g, x) => {
    var C, N, _, k, L, A;
    const b = x !== g ? ((N = (C = t[g]) == null ? void 0 : C.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(L = t[g]) == null ? void 0 : L.autonym} (${b})` : (A = t[g]) == null ? void 0 : A.autonym;
  };
  return /* @__PURE__ */ p("div", { id: w, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      He,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(Pe, { children: /* @__PURE__ */ r(Ye, {}) }),
          /* @__PURE__ */ r(
            $e,
            {
              style: { zIndex: Ze },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(zt, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(xt, { className: "tw-font-normal tw-text-muted-foreground", children: Re(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function np({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(xt, { children: e(t) }) : n ? /* @__PURE__ */ r(xt, { children: n(t) }) : /* @__PURE__ */ r(xt, { children: t });
}
function Yu({
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
      Yr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ r(
      np,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Xu({
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
            !e && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: w }),
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(ke, { children: [
              /* @__PURE__ */ r(Ae, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(me, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(ke, { children: [
              /* @__PURE__ */ r(Ae, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(me, { align: "end", children: c })
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
const rp = fn(({ className: t, ...e }, n) => /* @__PURE__ */ r(fi, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
rp.displayName = "Spinner";
function Wu({
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
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      xt,
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
      nn,
      {
        id: t,
        disabled: e,
        placeholder: i,
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
const op = fe(
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
), ap = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      op({ variant: e }),
      t
    ),
    ...n
  }
));
ap.displayName = "Alert";
const sp = v.forwardRef(
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
sp.displayName = "AlertTitle";
const ip = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
ip.displayName = "AlertDescription";
const Ju = ot.Root, Zu = ot.Trigger, Qu = ot.Group, tm = ot.Portal, em = ot.Sub, nm = ot.RadioGroup, lp = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ r(Ke, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
lp.displayName = ot.SubTrigger.displayName;
const cp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
cp.displayName = ot.SubContent.displayName;
const wp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
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
wp.displayName = ot.Content.displayName;
const dp = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
dp.displayName = ot.Item.displayName;
const pp = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(ne, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
pp.displayName = ot.CheckboxItem.displayName;
const up = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  ot.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
up.displayName = ot.RadioItem.displayName;
const mp = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
mp.displayName = ot.Label.displayName;
const fp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
fp.displayName = ot.Separator.displayName;
function hp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
hp.displayName = "ContextMenuShortcut";
const Ss = v.createContext({
  direction: "bottom"
});
function gp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = v.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Ss.Provider, { value: o, children: /* @__PURE__ */ r(
    Yt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
gp.displayName = "Drawer";
const rm = Yt.Trigger, bp = Yt.Portal, om = Yt.Close, Ds = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Ds.displayName = Yt.Overlay.displayName;
const vp = v.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = v.useContext(Ss), i = {
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
  return /* @__PURE__ */ p(bp, { children: [
    /* @__PURE__ */ r(Ds, {}),
    /* @__PURE__ */ p(
      Yt.Content,
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
vp.displayName = "DrawerContent";
function xp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
xp.displayName = "DrawerHeader";
function yp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
yp.displayName = "DrawerFooter";
const Np = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Np.displayName = Yt.Title.displayName;
const kp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
kp.displayName = Yt.Description.displayName;
const _p = v.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
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
_p.displayName = ur.Root.displayName;
function am({
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
const sm = Mr.Panel;
function im({
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
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(hi, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function lm({ ...t }) {
  return /* @__PURE__ */ r(
    Il,
    {
      className: "tw-toaster tw-group",
      toastOptions: {
        classNames: {
          toast: "tw-group tw-toast group-[.tw-toaster]:tw-bg-background group-[.tw-toaster]:tw-text-foreground group-[.tw-toaster]:tw-border-border group-[.tw-toaster]:tw-shadow-lg",
          description: "group-[.tw-toast]:tw-text-muted-foreground",
          actionButton: "group-[.tw-toast]:tw-bg-primary group-[.tw-toast]:tw-text-primary-foreground",
          cancelButton: "group-[.tw-toast]:tw-bg-muted group-[.tw-toast]:tw-text-muted-foreground"
        }
      },
      ...t
    }
  );
}
const Cp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
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
Cp.displayName = an.Root.displayName;
const Ep = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
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
Ep.displayName = mr.Root.displayName;
const cm = Mt.Root, Tp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = pt();
  return /* @__PURE__ */ r(
    Mt.List,
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
Tp.displayName = Mt.List.displayName;
const Rp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Rp.displayName = Mt.Trigger.displayName;
const Sp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Sp.displayName = Mt.Content.displayName;
const Dp = v.forwardRef(
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
Dp.displayName = "Textarea";
const wm = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Mp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Op = (t, e, n = {}) => {
  const o = U(e);
  o.current = e;
  const a = U(n);
  a.current = Mp(a.current);
  const [s, i] = D(() => o.current), [l, w] = D(!0);
  return q(() => {
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
}, ar = () => !1, dm = (t, e) => {
  const [n] = Op(
    z(async () => {
      if (!t) return ar;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    ar,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== ar && n();
  }, [n]);
};
function pm(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Ip(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Ip(`*, ::before, ::after {
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
.tw-group.tw-toaster .group-\\[\\.tw-toaster\\]\\:tw-border-border {
  border-color: hsl(var(--border));
}
.tw-group.tw-toast .group-\\[\\.tw-toast\\]\\:tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-group.tw-toast .group-\\[\\.tw-toast\\]\\:tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-group.tw-toaster .group-\\[\\.tw-toaster\\]\\:tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-group.tw-toast .group-\\[\\.tw-toast\\]\\:tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-group.tw-toast .group-\\[\\.tw-toast\\]\\:tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-group.tw-toaster .group-\\[\\.tw-toaster\\]\\:tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-group.tw-toaster .group-\\[\\.tw-toaster\\]\\:tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
  ap as Alert,
  ip as AlertDescription,
  sp as AlertTitle,
  Wa as Avatar,
  Ja as AvatarFallback,
  Tw as AvatarImage,
  lu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  cu as BOOK_SELECTOR_STRING_KEYS,
  qe as Badge,
  iu as BookChapterControl,
  gr as BookSelectionMode,
  wu as BookSelector,
  F as Button,
  Gr as ButtonGroup,
  Ua as ButtonGroupSeparator,
  du as ButtonGroupText,
  qa as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  uu as COMMENT_EDITOR_STRING_KEYS,
  mu as COMMENT_LIST_STRING_KEYS,
  Ha as CancelAcceptButtons,
  Ya as Card,
  Xa as CardContent,
  Cw as CardDescription,
  Ew as CardFooter,
  kw as CardHeader,
  _w as CardTitle,
  Jl as ChapterRangeSelector,
  Yr as Checkbox,
  Yu as Checklist,
  hr as ComboBox,
  he as Command,
  gn as CommandEmpty,
  te as CommandGroup,
  Qe as CommandInput,
  re as CommandItem,
  ge as CommandList,
  pu as CommentEditor,
  fu as CommentList,
  Ju as ContextMenu,
  pp as ContextMenuCheckboxItem,
  wp as ContextMenuContent,
  Qu as ContextMenuGroup,
  dp as ContextMenuItem,
  mp as ContextMenuLabel,
  tm as ContextMenuPortal,
  nm as ContextMenuRadioGroup,
  up as ContextMenuRadioItem,
  fp as ContextMenuSeparator,
  hp as ContextMenuShortcut,
  em as ContextMenuSub,
  cp as ContextMenuSubContent,
  lp as ContextMenuSubTrigger,
  Zu as ContextMenuTrigger,
  Uw as DataTable,
  jl as Dialog,
  au as DialogClose,
  da as DialogContent,
  Bl as DialogDescription,
  zl as DialogFooter,
  pa as DialogHeader,
  wa as DialogOverlay,
  Fl as DialogPortal,
  ua as DialogTitle,
  ou as DialogTrigger,
  gp as Drawer,
  om as DrawerClose,
  vp as DrawerContent,
  kp as DrawerDescription,
  yp as DrawerFooter,
  xp as DrawerHeader,
  Ds as DrawerOverlay,
  bp as DrawerPortal,
  Np as DrawerTitle,
  rm as DrawerTrigger,
  ke as DropdownMenu,
  de as DropdownMenuCheckboxItem,
  me as DropdownMenuContent,
  Za as DropdownMenuGroup,
  Pn as DropdownMenuItem,
  Yw as DropdownMenuItemType,
  bn as DropdownMenuLabel,
  Rw as DropdownMenuPortal,
  Dw as DropdownMenuRadioGroup,
  es as DropdownMenuRadioItem,
  en as DropdownMenuSeparator,
  Mw as DropdownMenuShortcut,
  Sw as DropdownMenuSub,
  ts as DropdownMenuSubContent,
  Qa as DropdownMenuSubTrigger,
  Ae as DropdownMenuTrigger,
  qw as ERROR_DUMP_STRING_KEYS,
  gu as ERROR_POPOVER_STRING_KEYS,
  Qw as EditorKeyboardShortcuts,
  Hw as ErrorDump,
  bu as ErrorPopover,
  _u as FOOTNOTE_EDITOR_STRING_KEYS,
  Nu as Filter,
  vu as FilterDropdown,
  yu as Footer,
  ku as FootnoteEditor,
  md as FootnoteItem,
  Cu as FootnoteList,
  Ou as INVENTORY_STRING_KEYS,
  nn as Input,
  Iu as Inventory,
  Nr as Kbd,
  xt as Label,
  ad as MARKER_MENU_STRING_KEYS,
  hu as MarkdownRenderer,
  id as MarkerMenu,
  xu as MoreInfo,
  Ww as MultiSelectComboBox,
  Gu as NavigationContentSearch,
  be as Popover,
  Gl as PopoverAnchor,
  oe as PopoverContent,
  _e as PopoverTrigger,
  _p as Progress,
  Pr as RadioGroup,
  Sn as RadioGroupItem,
  Ul as RecentSearches,
  im as ResizableHandle,
  sm as ResizablePanel,
  am as ResizablePanelGroup,
  Xu as ResultsCard,
  $u as SCOPE_SELECTOR_STRING_KEYS,
  Lu as ScopeSelector,
  Pu as ScriptureResultsViewer,
  Vu as ScrollGroupSelector,
  Xr as SearchBar,
  He as Select,
  $e as SelectContent,
  Aw as SelectGroup,
  zt as SelectItem,
  $w as SelectLabel,
  rs as SelectScrollDownButton,
  ns as SelectScrollUpButton,
  Lw as SelectSeparator,
  Pe as SelectTrigger,
  Ye as SelectValue,
  Ie as Separator,
  ju as SettingsList,
  zu as SettingsListHeader,
  Fu as SettingsListItem,
  Vd as SettingsSidebar,
  Au as SettingsSidebarContentSearch,
  is as Sidebar,
  cs as SidebarContent,
  Rd as SidebarFooter,
  kr as SidebarGroup,
  Dd as SidebarGroupAction,
  Cr as SidebarGroupContent,
  _r as SidebarGroupLabel,
  Td as SidebarHeader,
  Ed as SidebarInput,
  ls as SidebarInset,
  ws as SidebarMenu,
  Od as SidebarMenuAction,
  Id as SidebarMenuBadge,
  ps as SidebarMenuButton,
  ds as SidebarMenuItem,
  Ad as SidebarMenuSkeleton,
  Pd as SidebarMenuSub,
  Ld as SidebarMenuSubButton,
  $d as SidebarMenuSubItem,
  ss as SidebarProvider,
  Cd as SidebarRail,
  Sd as SidebarSeparator,
  _d as SidebarTrigger,
  yr as Skeleton,
  Cp as Slider,
  lm as Sonner,
  rp as Spinner,
  Ep as Switch,
  Er as TabDropdownMenu,
  Ku as TabFloatingMenu,
  Bu as TabToolbar,
  zn as Table,
  Kn as TableBody,
  Gw as TableCaption,
  Me as TableCell,
  Fw as TableFooter,
  mn as TableHead,
  Bn as TableHeader,
  le as TableRow,
  cm as Tabs,
  Sp as TabsContent,
  Tp as TabsList,
  Rp as TabsTrigger,
  Wu as TextField,
  Dp as Textarea,
  Br as ToggleGroup,
  wn as ToggleGroupItem,
  qu as Toolbar,
  Kt as Tooltip,
  Vt as TooltipContent,
  Lt as TooltipProvider,
  Gt as TooltipTrigger,
  Jw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Hu as UiLanguageSelector,
  Zw as UndoRedoButtons,
  bs as VerticalTabs,
  xs as VerticalTabsContent,
  vs as VerticalTabsList,
  Yd as VerticalTabsTrigger,
  Ze as Z_INDEX_ABOVE_DOCK,
  ca as Z_INDEX_FOOTNOTE_EDITOR,
  Ll as Z_INDEX_MODAL,
  $l as Z_INDEX_MODAL_BACKDROP,
  Pl as Z_INDEX_OVERLAY,
  Nw as badgeVariants,
  gw as buttonGroupVariants,
  ba as buttonVariants,
  h as cn,
  Mu as getBookIdFromUSFM,
  Gn as getInventoryHeader,
  Su as getLinesFromUSFM,
  Du as getNumberFromUSFM,
  vd as getStatusForItem,
  Uu as getToolbarOSReservedSpaceClassName,
  Tu as inventoryCountColumn,
  Eu as inventoryItemColumn,
  Ru as inventoryStatusColumn,
  Pw as selectTriggerVariants,
  fm as sonner,
  wm as useEvent,
  dm as useEventAsync,
  yw as useListbox,
  Op as usePromise,
  su as useRecentSearches,
  Un as useSidebar,
  pm as useStylesheet
};
//# sourceMappingURL=index.js.map
