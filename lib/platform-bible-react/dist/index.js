var Ms = Object.defineProperty;
var Os = (t, e, n) => e in t ? Ms(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Rt = (t, e, n) => Os(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as at } from "react/jsx-runtime";
import x, { forwardRef as pn, useRef as G, useMemo as z, useState as I, useCallback as K, useLayoutEffect as Lt, createContext as An, useContext as kr, useEffect as q, Component as As, createElement as Wr, Suspense as Ps, Fragment as Do } from "react";
import { Command as It } from "cmdk";
import { X as Be, Search as Io, Check as Bt, Clock as Jr, ChevronsLeft as Zr, ChevronsRight as Qr, ChevronLeft as or, ChevronRight as Ft, ArrowLeft as Ls, ArrowRight as $s, Circle as Pn, ChevronDown as Ke, BoldIcon as Vs, ItalicIcon as js, AtSign as Mo, Pencil as Fs, Trash2 as zs, ArrowUp as _r, MoreHorizontal as Oo, MailOpen as Bs, Mail as Ks, ChevronUp as Ao, FilterIcon as Us, ArrowLeftIcon as Gs, ChevronLeftIcon as qs, ChevronRightIcon as Hs, ArrowRightIcon as Ys, Copy as Po, Filter as Xs, User as Ws, Link as Js, CircleHelp as Zs, ChevronsUpDown as Lo, Star as Qs, Undo as ti, Redo as ei, SquareX as $o, FunctionSquare as Vo, SquareSigma as jo, Ban as ni, AlertCircle as ar, CircleCheckIcon as ri, CircleXIcon as oi, CircleHelpIcon as ai, ArrowUpIcon as si, ArrowDownIcon as ii, PanelLeft as li, PanelRight as ci, ScrollText as wi, MenuIcon as di, Menu as pi, EllipsisVertical as ui, GripVertical as mi, MoreVertical as to, LoaderCircle as fi } from "lucide-react";
import { clsx as hi } from "clsx";
import { extendTailwindMerge as gi } from "tailwind-merge";
import * as At from "@radix-ui/react-dialog";
import { Canon as ht } from "@sillsdev/scripture";
import { includes as fn, Section as Q, getChaptersForBook as bi, formatScrRef as Ce, getSectionForBook as nn, formatRelativeDate as vi, formatReplacementString as _e, sanitizeHtml as xi, NumberFormat as yi, formatBytes as Ni, getCurrentLocale as ki, usfmMarkers as xn, getFormatCallerFunction as _i, deepEqual as Ci, isString as eo, compareScrRefs as sr, scrRefToBBBCCCVVV as Kn, getLocalizeKeyForScrollGroupId as nt } from "platform-bible-utils";
import { Slot as Ue } from "@radix-ui/react-slot";
import { cva as ve } from "class-variance-authority";
import * as Ve from "@radix-ui/react-popover";
import * as Fo from "@radix-ui/react-label";
import * as sn from "@radix-ui/react-radio-group";
import { createEditor as zo, $getRoot as ce, $createParagraphNode as Ge, $getSelection as Dt, HISTORY_MERGE_TAG as Cr, ParagraphNode as Bo, TextNode as Ko, $isTokenOrSegmented as Ei, $getCharacterOffsets as Ti, $cloneWithPropertiesEphemeral as Ri, $getPreviousSelection as Si, $isRangeSelection as Wt, $caretFromPoint as Di, $getSiblingCaret as Uo, $getChildCaret as Ii, $getAdjacentChildCaret as Mi, $isChildCaret as Oi, $normalizeCaret as Ai, $setSelectionFromCaretRange as Pi, $getCollapsedCaretRange as Li, $getCaretInDirection as no, $splitAtPointCaretNext as $i, $isTextPointCaret as Vi, $findMatchingParent as Go, $isElementNode as se, mergeRegister as we, getDOMTextNode as ji, isHTMLElement as qo, CLEAR_EDITOR_COMMAND as Ho, COMMAND_PRIORITY_EDITOR as Er, shallowMergeConfig as Fi, defineExtension as $t, safeCast as Me, createState as zi, FORMAT_TEXT_COMMAND as Yo, $isNodeSelection as Xo, COMMAND_PRIORITY_LOW as Wo, RootNode as Bi, LineBreakNode as Ki, TabNode as Ui, $isEditorState as Gi, createCommand as qi, CLICK_COMMAND as Hi, isDOMNode as Yi, $getNodeFromDOMNode as Xi, $createNodeSelection as Wi, $setSelection as Ji, $getEditor as Zi, DecoratorNode as ir, $getState as Qi, toggleTextFormatType as ro, TEXT_TYPE_TO_FORMAT as tl, $setState as el, addClassNamesToElement as Jo, $create as nl, $getNodeByKey as rl, removeClassNamesFromElement as ol, KEY_TAB_COMMAND as al, $isBlockElementNode as kn, $createRangeSelection as sl, $normalizeSelection__EXPERIMENTAL as il, OUTDENT_CONTENT_COMMAND as ll, INDENT_CONTENT_COMMAND as oo, INSERT_TAB_COMMAND as cl, COMMAND_PRIORITY_CRITICAL as Tr, $isDecoratorNode as wl, $isParagraphNode as dl, $isTextNode as _n, SELECTION_CHANGE_COMMAND as Zo, getRegisteredNode as pl, isDocumentFragment as ao, isDOMDocumentNode as ul, ArtificialNode__DO_NOT_USE as Qo, $createLineBreakNode as ta, $isRootOrShadowRoot as ml, isBlockDomNode as so, isInlineDomNode as io, $insertNodes as fl } from "lexical";
import * as Re from "@radix-ui/react-tooltip";
import { TooltipTrigger as hl } from "@radix-ui/react-tooltip";
import { HeadingNode as gl, QuoteNode as bl, registerRichText as vl } from "@lexical/rich-text";
import { flushSync as xl, createPortal as yl } from "react-dom";
import { $isTableSelection as Nl } from "@lexical/table";
import * as Ln from "@radix-ui/react-toggle-group";
import * as ea from "@radix-ui/react-toggle";
import { createHeadlessEditor as na } from "@lexical/headless";
import * as ra from "@radix-ui/react-separator";
import * as qe from "@radix-ui/react-avatar";
import * as it from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as kl } from "@radix-ui/react-dropdown-menu";
import { useReactTable as oa, getFilteredRowModel as _l, getSortedRowModel as aa, getPaginationRowModel as Cl, getCoreRowModel as sa, flexRender as rn, getGroupedRowModel as El, getExpandedRowModel as Tl } from "@tanstack/react-table";
import * as ft from "@radix-ui/react-select";
import Rl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as lr, HIDDEN_NOTE_CALLER as cr, getDefaultViewOptions as Sl, isInsertEmbedOpOfType as hn, Editorial as Dl } from "@eten-tech-foundation/platform-editor";
import * as wr from "@radix-ui/react-checkbox";
import * as Mt from "@radix-ui/react-tabs";
import * as lt from "@radix-ui/react-menubar";
import { useHotkeys as Il } from "react-hotkeys-hook";
import * as Rr from "react-resizable-panels";
import * as ct from "@radix-ui/react-context-menu";
import { Drawer as Kt } from "vaul";
import * as dr from "@radix-ui/react-progress";
import { Toaster as Ml } from "sonner";
import { toast as ym } from "sonner";
import * as en from "@radix-ui/react-slider";
import * as pr from "@radix-ui/react-switch";
const Ol = gi({ prefix: "tw-" });
function g(...t) {
  return Ol(hi(t));
}
const He = 250, ia = 300, Al = 400, Pl = 450, la = 500, Ll = "layoutDirection";
function gt() {
  const t = localStorage.getItem(Ll);
  return t === "rtl" ? t : "ltr";
}
const $l = At.Root, lu = At.Trigger, Vl = At.Portal, cu = At.Close, ca = x.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  At.Overlay,
  {
    ref: o,
    className: g(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: Pl, ...e },
    ...n
  }
));
ca.displayName = At.Overlay.displayName;
const wa = x.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, i) => {
  const s = gt();
  return /* @__PURE__ */ p(Vl, { children: [
    /* @__PURE__ */ r(ca, { className: n }),
    /* @__PURE__ */ p(
      At.Content,
      {
        ref: i,
        className: g(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: la, ...o },
        ...a,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ p(
            At.Close,
            {
              className: g(
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
wa.displayName = At.Content.displayName;
function da({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: g(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        t
      ),
      ...e
    }
  );
}
da.displayName = "DialogHeader";
function jl({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: g(
        "tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",
        t
      ),
      ...e
    }
  );
}
jl.displayName = "DialogFooter";
const pa = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  At.Title,
  {
    ref: n,
    className: g("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
pa.displayName = At.Title.displayName;
const Fl = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  At.Description,
  {
    ref: n,
    className: g("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Fl.displayName = At.Description.displayName;
const pe = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It,
  {
    ref: n,
    className: g(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
pe.displayName = It.displayName;
const Ye = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Io, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      It.Input,
      {
        ref: n,
        className: g(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
Ye.displayName = It.Input.displayName;
const ue = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.List,
  {
    ref: n,
    className: g("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ue.displayName = It.List.displayName;
const un = x.forwardRef((t, e) => /* @__PURE__ */ r(It.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
un.displayName = It.Empty.displayName;
const Jt = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Group,
  {
    ref: n,
    className: g(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Jt.displayName = It.Group.displayName;
const Sr = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Separator,
  {
    ref: n,
    className: g("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Sr.displayName = It.Separator.displayName;
const te = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Item,
  {
    ref: n,
    className: g(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
te.displayName = It.Item.displayName;
function ua({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: g("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ua.displayName = "CommandShortcut";
const ma = (t, e, n, o, a) => {
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
}, zl = (t, e, n, o, a) => {
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
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ht.bookIdToEnglishName(t);
}
function Dr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const fa = ht.allBookIds.filter(
  (t) => !ht.isObsolete(ht.bookIdToNumber(t))
), Ee = Object.fromEntries(
  fa.map((t) => [t, ht.bookIdToEnglishName(t)])
);
function Ir(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ht.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(fn(a.toLowerCase(), o) || fn(t.toLowerCase(), o) || (i ? fn(i.localizedName.toLowerCase(), o) || fn(i.localizedId.toLowerCase(), o) : !1));
}
const ha = pn(
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
    const d = G(!1), u = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, m = (v) => {
      d.current = !0, o ? o(v) : n == null || n(t);
    }, f = z(
      () => Le(t, l),
      [t, l]
    ), h = z(
      () => Dr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: g(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Q.OT,
            "tw-border-s-purple-200": a === Q.NT,
            "tw-border-s-indigo-200": a === Q.DC,
            "tw-border-s-amber-200": a === Q.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          te,
          {
            ref: w,
            value: c || `${t} ${ht.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: m,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ht.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Bt,
                {
                  className: g(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: f }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: h })
            ]
          }
        )
      }
    );
  }
), ga = ve(
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
), U = x.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ue : "button", { className: g(ga({ variant: e, size: n, className: t })), ref: i, ...a })
);
U.displayName = "Button";
const me = Ve.Root, xe = Ve.Trigger, Bl = Ve.Anchor, ee = x.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, i) => {
  const s = gt();
  return /* @__PURE__ */ r(Ve.Portal, { children: /* @__PURE__ */ r(
    Ve.Content,
    {
      ref: i,
      align: e,
      sideOffset: n,
      className: g(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: He, ...o },
      ...a,
      dir: s
    }
  ) });
});
ee.displayName = Ve.Content.displayName;
function ur(t, e, n) {
  return `${t} ${Ee[t]}${e ? ` ${Dr(t, e)} ${Le(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Kl({
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
  const [d, u] = I(!1);
  if (t.length === 0)
    return;
  const m = (f) => {
    e(f), u(!1);
  };
  return /* @__PURE__ */ p(me, { open: d, onOpenChange: u, children: [
    /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ r(
      U,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(Jr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(ee, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ r(ue, { children: /* @__PURE__ */ r(Jt, { heading: i, children: t.map((f) => /* @__PURE__ */ p(
      te,
      {
        onSelect: () => m(f),
        className: g("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Jr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(f) })
        ]
      },
      o(f)
    )) }) }) }) })
  ] });
}
function wu(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Un = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ul = [
  Un.BOOK_ONLY,
  Un.BOOK_CHAPTER,
  Un.BOOK_CHAPTER_VERSE
];
function lo(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Xt(t) {
  return bi(ht.bookIdToNumber(t));
}
function Gl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Ul.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let d;
        const u = e.filter((m) => Ir(m, l, n));
        if (u.length === 1 && ([d] = u), !d && c) {
          if (ht.isBookIdValid(l)) {
            const m = l.toUpperCase();
            e.includes(m) && (d = m);
          }
          if (!d && n) {
            const m = Array.from(n.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === l.toLowerCase()
            );
            m && e.includes(m[0]) && ([d] = m);
          }
        }
        if (!d && c) {
          const f = ((h) => Object.keys(Ee).find(
            (v) => Ee[v].toLowerCase() === h.toLowerCase()
          ))(l);
          if (f && e.includes(f) && (d = f), !d && n) {
            const h = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([d] = h);
          }
        }
        if (d) {
          let m = c ? parseInt(c, 10) : void 0;
          m && m > Xt(d) && (m = Math.max(Xt(d), 1));
          const f = w ? parseInt(w, 10) : void 0;
          return {
            book: d,
            chapterNum: m,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function ql(t, e, n, o) {
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
        const w = e[c - 1], d = Math.max(Xt(w), 1);
        o({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = K(() => {
    const c = Xt(t.book);
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
  return z(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Zr : Qr
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? or : Ft
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ft : or
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Xt(t.book) || Xt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Qr : Zr
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
function co({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r("div", { className: g("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Xt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      te,
      {
        value: `${t} ${Ee[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: g(
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
function du({
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
  const w = gt(), [d, u] = I(!1), [m, f] = I(""), [h, v] = I(""), [b, y] = I("books"), [N, _] = I(void 0), [k, V] = I(!1), j = G(void 0), O = G(void 0), R = G(void 0), E = G(void 0), T = G({}), $ = K(
    (L) => {
      e(L), l && l(L);
    },
    [e, l]
  ), C = z(() => o ? o() : fa, [o]), D = z(() => ({
    [Q.OT]: C.filter((S) => ht.isBookOT(S)),
    [Q.NT]: C.filter((S) => ht.isBookNT(S)),
    [Q.DC]: C.filter((S) => ht.isBookDC(S)),
    [Q.Extra]: C.filter((S) => ht.extraBooks().includes(S))
  }), [C]), A = z(() => Object.values(D).flat(), [D]), W = z(() => {
    if (!h.trim()) return D;
    const L = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((F) => {
      L[F] = D[F].filter((Y) => Ir(Y, h, a));
    }), L;
  }, [D, h, a]), P = z(
    () => Gl(h, A, a),
    [h, A, a]
  ), tt = K(() => {
    P && ($({
      book: P.book,
      chapterNum: P.chapterNum ?? 1,
      verseNum: P.verseNum ?? 1
    }), u(!1), v(""), f(""));
  }, [$, P]), Et = K(
    (L) => {
      if (Xt(L) <= 1) {
        $({
          book: L,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), v("");
        return;
      }
      _(L), y("chapters");
    },
    [$]
  ), B = K(
    (L) => {
      const S = b === "chapters" ? N : P == null ? void 0 : P.book;
      S && ($({
        book: S,
        chapterNum: L,
        verseNum: 1
      }), u(!1), y("books"), _(void 0), v(""));
    },
    [$, b, N, P]
  ), st = K(
    (L) => {
      $(L), u(!1), v("");
    },
    [$]
  ), J = ql(t, A, w, e), Z = K(() => {
    y("books"), _(void 0), setTimeout(() => {
      O.current && O.current.focus();
    }, 0);
  }, []), H = K(
    (L) => {
      if (!L && b === "chapters") {
        Z();
        return;
      }
      u(L), L && (y("books"), _(void 0), v(""));
    },
    [b, Z]
  ), { otLong: wt, ntLong: dt, dcLong: ut, extraLong: Tt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, re = K(
    (L) => ma(L, wt, dt, ut, Tt),
    [wt, dt, ut, Tt]
  ), Gt = K(
    (L) => P ? !!P.chapterNum && !L.toString().includes(P.chapterNum.toString()) : !1,
    [P]
  ), qt = z(
    () => Ce(
      t,
      a ? Le(t.book, a) : "English"
    ),
    [t, a]
  ), Oe = K((L) => (S) => {
    T.current[L] = S;
  }, []), he = K((L) => {
    (L.key === "Home" || L.key === "End") && L.stopPropagation();
  }, []), oe = K(
    (L) => {
      if (L.ctrlKey) return;
      const { isLetter: S, isDigit: F } = lo(L.key);
      if (b === "chapters") {
        if (L.key === "Backspace") {
          L.preventDefault(), L.stopPropagation(), Z();
          return;
        }
        if (S || F) {
          if (L.preventDefault(), L.stopPropagation(), y("books"), _(void 0), F && N) {
            const Y = Ee[N];
            v(`${Y} ${L.key}`);
          } else
            v(L.key);
          setTimeout(() => {
            O.current && O.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && P) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(L.key)) {
        const Y = b === "chapters" ? N : P == null ? void 0 : P.book;
        if (!Y) return;
        const X = (() => {
          if (!m) return 1;
          const mt = m.match(/(\d+)$/);
          return mt ? parseInt(mt[1], 10) : 0;
        })(), pt = Xt(Y);
        if (!pt) return;
        let rt = X;
        const _t = 6;
        switch (L.key) {
          case "ArrowLeft":
            X !== 0 && (rt = X > 1 ? X - 1 : pt);
            break;
          case "ArrowRight":
            X !== 0 && (rt = X < pt ? X + 1 : 1);
            break;
          case "ArrowUp":
            rt = X === 0 ? pt : Math.max(1, X - _t);
            break;
          case "ArrowDown":
            rt = X === 0 ? 1 : Math.min(pt, X + _t);
            break;
          default:
            return;
        }
        rt !== X && (L.preventDefault(), L.stopPropagation(), f(ur(Y, a, rt)), setTimeout(() => {
          const mt = T.current[rt];
          mt && mt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      P,
      Z,
      N,
      m,
      a
    ]
  ), Ze = K((L) => {
    if (L.shiftKey || L.key === "Tab" || L.key === " ") return;
    const { isLetter: S, isDigit: F } = lo(L.key);
    (S || F) && (L.preventDefault(), v((Y) => Y + L.key), O.current.focus(), V(!1));
  }, []);
  return Lt(() => {
    const L = setTimeout(() => {
      if (d && b === "books" && R.current && E.current) {
        const S = R.current, F = E.current, Y = F.offsetTop, X = S.clientHeight, pt = F.clientHeight, rt = Y - X / 2 + pt / 2;
        S.scrollTo({
          top: Math.max(0, rt),
          behavior: "smooth"
        }), f(ur(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(L);
    };
  }, [d, b, h, P, t.book]), Lt(() => {
    if (b === "chapters" && N) {
      const L = N === t.book;
      setTimeout(() => {
        if (R.current)
          if (L) {
            const S = T.current[t.chapterNum];
            S && S.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            R.current.scrollTo({ top: 0 });
        j.current && j.current.focus();
      }, 0);
    }
  }, [b, N, P, t.book, t.chapterNum]), /* @__PURE__ */ p(me, { open: d, onOpenChange: H, children: [
    /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ r(
      U,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: g(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: qt })
      }
    ) }),
    /* @__PURE__ */ r(ee, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      pe,
      {
        ref: j,
        onKeyDown: oe,
        loop: !0,
        value: m,
        onValueChange: f,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ye,
                {
                  ref: O,
                  value: h,
                  onValueChange: v,
                  onKeyDown: he,
                  onFocus: () => V(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Kl,
                {
                  recentSearches: s,
                  onSearchItemSelect: st,
                  renderItem: (L) => Ce(L, "English"),
                  getItemKey: (L) => `${L.book}-${L.chapterNum}-${L.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: J.map(({ onClick: L, disabled: S, title: F, icon: Y }) => /* @__PURE__ */ r(
              U,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  V(!0), L();
                },
                disabled: S,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: F,
                onKeyDown: Ze,
                children: /* @__PURE__ */ r(Y, {})
              },
              F
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              U,
              {
                variant: "ghost",
                size: "sm",
                onClick: Z,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(Ls, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r($s, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Le(N, a) })
          ] }),
          !k && /* @__PURE__ */ p(ue, { ref: R, children: [
            b === "books" && /* @__PURE__ */ p(at, { children: [
              !P && Object.entries(W).map(([L, S]) => {
                if (S.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Jt, { heading: re(L), children: S.map((F) => /* @__PURE__ */ r(
                      ha,
                      {
                        bookId: F,
                        onSelect: (Y) => Et(Y),
                        section: nn(F),
                        commandValue: `${F} ${Ee[F]}`,
                        ref: F === t.book ? E : void 0,
                        localizedBookNames: a
                      },
                      F
                    )) }, L)
                  );
              }),
              P && /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(
                te,
                {
                  value: `${P.book} ${Ee[P.book]} ${P.chapterNum || ""}:${P.verseNum || ""})}`,
                  onSelect: tt,
                  className: "tw-font-semibold tw-text-primary",
                  children: Ce(
                    {
                      book: P.book,
                      chapterNum: P.chapterNum ?? 1,
                      verseNum: P.verseNum ?? 1
                    },
                    a ? Dr(P.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              P && Xt(P.book) > 1 && /* @__PURE__ */ p(at, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Le(P.book, a) }),
                /* @__PURE__ */ r(
                  co,
                  {
                    bookId: P.book,
                    scrRef: t,
                    onChapterSelect: B,
                    setChapterRef: Oe,
                    isChapterDimmed: Gt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && N && /* @__PURE__ */ r(
              co,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: B,
                setChapterRef: Oe,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const pu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Hl = ve(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), yt = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Fo.Root, { ref: n, className: g("pr-twp", Hl(), t), ...e }));
yt.displayName = Fo.Root.displayName;
const Mr = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ r(
    sn.Root,
    {
      className: g("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Mr.displayName = sn.Root.displayName;
const Cn = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  sn.Item,
  {
    ref: n,
    className: g(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(sn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Pn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Cn.displayName = sn.Item.displayName;
function Yl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function mr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = Yl,
  getButtonLabel: w,
  icon: d = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: m = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: v = "start",
  isDisabled: b = !1,
  ariaLabel: y,
  ...N
}) {
  const [_, k] = I(!1), V = w ?? c, j = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], O = (R, E) => {
    const T = c(R), $ = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, C = `${E ?? ""}${T}${$ ?? ""}`;
    return /* @__PURE__ */ p(
      te,
      {
        value: T,
        onSelect: () => {
          l(R), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Bt,
            {
              className: g("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || c(s) !== T
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            T,
            $ && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              $
            ] })
          ] })
        ]
      },
      C
    );
  };
  return /* @__PURE__ */ p(me, { open: _, onOpenChange: k, ...N, children: [
    /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ p(
      U,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": y,
        id: t,
        className: g(
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
                className: g(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? V(s) : u
              }
            )
          ] }),
          /* @__PURE__ */ r(Ke, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ee,
      {
        align: v,
        className: g("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ p(pe, { children: [
          /* @__PURE__ */ r(Ye, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(un, { children: f }),
          /* @__PURE__ */ r(ue, { children: j(e) ? e.map((R) => /* @__PURE__ */ r(Jt, { heading: R.groupHeading, children: R.options.map((E) => O(E, R.groupHeading)) }, R.groupHeading)) : e.map((R) => O(R)) })
        ] })
      }
    )
  ] });
}
function Xl({
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
    /* @__PURE__ */ r(yt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      mr,
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
    /* @__PURE__ */ r(yt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      mr,
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
var fr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(fr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(fr || (fr = {}));
const uu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Gn = (t, e) => t[e] ?? e;
function mu({
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
  const d = Gn(w, "%webView_bookSelector_currentBook%"), u = Gn(w, "%webView_bookSelector_choose%"), m = Gn(w, "%webView_bookSelector_chooseBooks%"), [f, h] = I(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    h(b), t(b);
  };
  return /* @__PURE__ */ r(
    Mr,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(yt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(yt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Xl,
            {
              isDisabled: f === "choose books",
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
            /* @__PURE__ */ r(Cn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(yt, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ r(yt, { className: "tw-flex tw-items-center", children: o.map((b) => ht.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ r(
            U,
            {
              disabled: f === "current book",
              onClick: () => n(),
              children: u
            }
          )
        ] })
      ] })
    }
  );
}
const ba = An(null);
function Wl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ne() {
  const t = kr(ba);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const va = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Jl = va ? Lt : q, gn = { tag: Cr };
function Zl({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = Wl(null, o), d = zo({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (u) => s(u, d), theme: o });
    return function(u, m) {
      if (m !== null) {
        if (m === void 0) u.update(() => {
          const f = ce();
          if (f.isEmpty()) {
            const h = Ge();
            f.append(h);
            const v = va ? document.activeElement : null;
            (Dt() !== null || v !== null && v === u.getRootElement()) && h.select();
          }
        }, gn);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const f = u.parseEditorState(m);
            u.setEditorState(f, gn);
            break;
          }
          case "object":
            u.setEditorState(m, gn);
            break;
          case "function":
            u.update(() => {
              ce().isEmpty() && m(u);
            }, gn);
        }
      }
    }(d, l), [d, w];
  }, []);
  return Jl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ba.Provider, { value: n, children: e });
}
const Ql = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : q;
function tc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = ne();
  return Ql(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(Cr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const Or = {
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
}, bt = Re.Provider, Nt = Re.Root, kt = x.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Re.Trigger,
  {
    ref: o,
    className: e ? g(ga({ variant: e }), t) : t,
    ...n
  }
));
kt.displayName = Re.Trigger.displayName;
const vt = x.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Re.Portal, { children: /* @__PURE__ */ r(
  Re.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: He, ...n },
    className: g(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
vt.displayName = Re.Content.displayName;
const Ar = [
  gl,
  Bo,
  Ko,
  bl
], ec = An(null), qn = {
  didCatch: !1,
  error: null
};
class nc extends As {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = qn;
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
      }), this.setState(qn);
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
    if (o && n.error !== null && rc(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(qn);
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
        l = Wr(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Wr(ec.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function rc() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function oc({ children: t, onError: e }) {
  return r(nc, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ac = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : q;
function sc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function ic() {
  return function(t) {
    const [e] = ne(), n = z(() => t(e), [e, t]), [o, a] = I(() => n.initialValueFn()), i = G(o);
    return ac(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(sc);
}
function lc(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), i = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = Array.from(e.getClientRects());
  let l, c = s.length;
  s.sort((w, d) => {
    const u = w.top - d.top;
    return Math.abs(u) <= 3 ? w.left - d.left : u;
  });
  for (let w = 0; w < c; w++) {
    const d = s[w], u = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, m = d.width + i === o.width;
    u || m ? (s.splice(w--, 1), c--) : l = d;
  }
  return s;
}
function cc(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Ei(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), d = e.is(c);
    if (w || d) {
      const [u, m] = Ti(t), f = l.is(c), h = e.is(s ? c : l), v = e.is(s ? l : c);
      let b, y = 0;
      f ? (y = u > m ? m : u, b = u > m ? u : m) : h ? (y = s ? m : u, b = void 0) : v && (y = 0, b = s ? u : m);
      const N = e.__text.slice(y, b);
      N !== e.__text && (n === "clone" && (e = Ri(e)), e.__text = N);
    }
  }
  return e;
}
function En(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, wc = xa && "documentMode" in document ? document.documentMode : null;
!(!xa || !("InputEvent" in window) || wc) && "getTargetRanges" in new window.InputEvent("input");
function Yt(t) {
  return `${t}px`;
}
const dc = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function pc(t, e, n) {
  let o = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function c() {
    o === null && En(182), a === null && En(183);
    const { left: u, top: m } = a.getBoundingClientRect(), f = lc(t, e);
    var h, v;
    l.isConnected || (v = l, (h = a).insertBefore(v, h.firstChild));
    let b = !1;
    for (let y = 0; y < f.length; y++) {
      const N = f[y], _ = s[y] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const V = Yt(N.left - u);
      k.left !== V && (k.left = V, b = !0);
      const j = Yt(N.top - m);
      k.top !== j && (_.style.top = j, b = !0);
      const O = Yt(N.width);
      k.width !== O && (_.style.width = O, b = !0);
      const R = Yt(N.height);
      k.height !== R && (_.style.height = R, b = !0), _.parentNode !== l && (l.append(_), b = !0), s[y] = _;
    }
    for (; s.length > f.length; ) s.pop();
    b && n(s);
  }
  function w() {
    a = null, o = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const u of s) u.remove();
    s = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function u() {
    const m = t.getRootElement();
    if (m === null) return w();
    const f = m.parentElement;
    if (!qo(f)) return w();
    w(), o = m, a = f, i = new MutationObserver((h) => {
      const v = t.getRootElement(), b = v && v.parentElement;
      if (v !== o || b !== a) return u();
      for (const y of h) if (!l.contains(y.target)) return c();
    }), i.observe(f, dc), c();
  });
  return () => {
    d(), w();
  };
}
function wo(t, e, n) {
  if (t.type !== "text" && se(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [ji(n) || n, t.offset];
}
function uc(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== Yt(-1.5) && (n.marginTop = Yt(-1.5)), n.paddingTop !== Yt(4) && (n.paddingTop = Yt(4)), n.paddingBottom !== Yt(0) && (n.paddingBottom = Yt(0));
  }
}
function mc(t, e = uc) {
  let n = null, o = null, a = null, i = null, s = null, l = null, c = () => {
  };
  function w(d) {
    d.read(() => {
      const u = Dt();
      if (!Wt(u)) return n = null, a = null, i = null, l = null, c(), void (c = () => {
      });
      const [m, f] = function(R) {
        const E = R.getStartEndPoints();
        return R.isBackward() ? [E[1], E[0]] : E;
      }(u), h = m.getNode(), v = h.getKey(), b = m.offset, y = f.getNode(), N = y.getKey(), _ = f.offset, k = t.getElementByKey(v), V = t.getElementByKey(N), j = n === null || k !== o || b !== a || v !== n.getKey(), O = i === null || V !== s || _ !== l || N !== i.getKey();
      if ((j || O) && k !== null && V !== null) {
        const R = function(E, T, $, C, D, A, W) {
          const P = (E._window ? E._window.document : document).createRange();
          return P.setStart(...wo(T, $, C)), P.setEnd(...wo(D, A, W)), P;
        }(t, m, h, k, f, y, V);
        c(), c = pc(t, R, e);
      }
      n = h, o = k, a = b, i = y, s = V, l = _;
    });
  }
  return w(t.getEditorState()), we(t.registerUpdateListener(({ editorState: d }) => w(d)), () => {
    c();
  });
}
function fc(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? n !== null && (n(), n = null) : n === null && (n = mc(t, e));
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
function hc(t) {
  const e = Go(t, (n) => se(n) && !n.isInline());
  return se(e) || En(4, t.__key), e;
}
function gc(t) {
  const e = Dt() || Si();
  let n;
  if (Wt(e)) n = Di(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (n = Uo(l, "next"));
    }
    n = n || Ii(ce(), "previous").getFlipped().insert(Ge());
  }
  const o = bc(t, n), a = Mi(o), i = Oi(a) ? Ai(a) : o;
  return Pi(Li(i)), t.getLatest();
}
function bc(t, e, n) {
  let o = no(e, "next");
  for (let a = o; a; a = $i(a, n)) o = a;
  return Vi(o) && En(283), o.insert(t.isInline() ? Ge().append(t) : t), no(Uo(t.getLatest(), "next"), e.direction);
}
function vc(t) {
  const e = Dt();
  if (!Wt(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Go(i, (w) => se(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !n.has(c) && (n.add(c), t(l));
  }
  return n.size > 0;
}
const xc = Symbol.for("preact-signals");
function $n() {
  if (ie > 1) return void ie--;
  let t, e = !1;
  for (!function() {
    let n = Tn;
    for (Tn = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); on !== void 0; ) {
    let n = on;
    for (on = void 0, Rn++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && ya(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (Rn = 0, ie--, e) throw t;
}
function yc(t) {
  if (ie > 0) return t();
  hr = ++Nc, ie++;
  try {
    return t();
  } finally {
    $n();
  }
}
let et, on;
function po(t) {
  const e = et;
  et = void 0;
  try {
    return t();
  } finally {
    et = e;
  }
}
let Tn, ie = 0, Rn = 0, Nc = 0, hr = 0, yn = 0;
function uo(t) {
  if (et === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== et ? (e = { i: 0, S: t, p: et.s, n: void 0, t: et, e: void 0, x: void 0, r: e }, et.s !== void 0 && (et.s.n = e), et.s = e, t.n = e, 32 & et.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = et.s, e.n = void 0, et.s.n = e, et.s = e), e) : void 0;
}
function St(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ln(t, e) {
  return new St(t, e);
}
function ya(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function mo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Na(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function Ne(t, e) {
  St.call(this, void 0), this.x = t, this.s = void 0, this.g = yn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function kc(t, e) {
  return new Ne(t, e);
}
function ka(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    ie++;
    const n = et;
    et = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Pr(t), o;
    } finally {
      et = n, $n();
    }
  }
}
function Pr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ka(t);
}
function _c(t) {
  if (et !== this) throw new Error("Out-of-order effect");
  Na(this), et = t, this.f &= -2, 8 & this.f && Pr(this), $n();
}
function Pe(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Zt(t, e) {
  const n = new Pe(t, e);
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
St.prototype.brand = xc, St.prototype.h = function() {
  return !0;
}, St.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : po(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, St.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && po(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, St.prototype.subscribe = function(t) {
  return Zt(() => {
    const e = this.value, n = et;
    et = void 0;
    try {
      t(e);
    } finally {
      et = n;
    }
  }, { name: "sub" });
}, St.prototype.valueOf = function() {
  return this.value;
}, St.prototype.toString = function() {
  return this.value + "";
}, St.prototype.toJSON = function() {
  return this.value;
}, St.prototype.peek = function() {
  const t = et;
  et = void 0;
  try {
    return this.value;
  } finally {
    et = t;
  }
}, Object.defineProperty(St.prototype, "value", { get() {
  const t = uo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Rn > 100) throw new Error("Cycle detected");
    (function(e) {
      ie !== 0 && Rn === 0 && e.l !== hr && (e.l = hr, Tn = { S: e, v: e.v, i: e.i, o: Tn });
    })(this), this.v = t, this.i++, yn++, ie++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      $n();
    }
  }
} }), Ne.prototype = new St(), Ne.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === yn)) return !0;
  if (this.g = yn, this.f |= 1, this.i > 0 && !ya(this)) return this.f &= -2, !0;
  const t = et;
  try {
    mo(this), et = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return et = t, Na(this), this.f &= -2, !0;
}, Ne.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  St.prototype.S.call(this, t);
}, Ne.prototype.U = function(t) {
  if (this.t !== void 0 && (St.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Ne.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Ne.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = uo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Pe.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Pe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ka(this), mo(this), ie++;
  const t = et;
  return et = this, _c.bind(this, t);
}, Pe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = on, on = this);
}, Pe.prototype.d = function() {
  this.f |= 8, 1 & this.f || Pr(this);
}, Pe.prototype.dispose = function() {
  this.d();
};
$t({ build: (t, e, n) => Xe(e), config: Me({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return Zt(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function _a() {
  const t = ce(), e = Dt(), n = Ge();
  t.clear(), t.append(n), e !== null && n.select(), Wt(e) && (e.format = 0);
}
function Ca(t, e = _a) {
  return t.registerCommand(Ho, (n) => (t.update(e), !0), Er);
}
$t({ build: (t, e, n) => Xe(e), config: Me({ $onClear: _a }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return Zt(() => Ca(t, o.value));
} });
function Cc(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Hn = zi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Ea extends ir {
  $config() {
    return this.config("decorator-text", { extends: ir, stateConfigs: [{ flat: !0, stateConfig: Hn }] });
  }
  getFormat() {
    return Qi(this, Hn);
  }
  getFormatFlags(e, n) {
    return ro(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = tl[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return el(this, Hn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = ro(n, e, null);
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
  return t instanceof Ea;
}
$t({ name: "@lexical/extension/DecoratorText", nodes: () => [Ea], register: (t, e, n) => t.registerCommand(Yo, (o) => {
  const a = Dt();
  if (Xo(a) || Wt(a)) for (const i of a.getNodes()) Ec(i) && i.toggleFormat(o);
  return !1;
}, Wo) });
function Ta(t, e) {
  let n;
  return ln(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const gr = $t({ build: (t) => Ta(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function ot(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ra(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Ra(n[a], o[a]);
    return t;
  }
  return e;
}
const Lr = 0, br = 1, Sa = 2, Yn = 3, bn = 4, Ae = 5, Xn = 6, Qe = 7;
function Wn(t) {
  return t.id === Lr;
}
function Da(t) {
  return t.id === Sa;
}
function Tc(t) {
  return function(e) {
    return e.id === br;
  }(t) || ot(305, String(t.id), String(br)), Object.assign(t, { id: Sa });
}
const Rc = /* @__PURE__ */ new Set();
class Sc {
  constructor(e, n) {
    Rt(this, "builder");
    Rt(this, "configs");
    Rt(this, "_dependency");
    Rt(this, "_peerNameSet");
    Rt(this, "extension");
    Rt(this, "state");
    Rt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Lr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Fi;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Da(n) || ot(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: Yn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: bn, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== bn && ot(307, String(n.id), String(Ae)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Ae, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Ae && ot(308, String(o.id), String(Ae));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Xn });
    }(o), () => {
      const i = this.state;
      i.id !== Qe && ot(309, String(o.id), String(Qe)), this.state = function(s) {
        return Object.assign(s, { id: Ae });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Xn && ot(310, String(n.id), String(Xn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Qe });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && ot(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ot(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= bn;
    }(e) || ot(313, String(e.id), String(bn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Yn;
    }(e) || ot(314, String(e.id), String(Yn)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && ot(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && ot(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= Qe;
    }(e) || ot(316, String(e.id), String(Qe)), e;
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
        return n.id >= Ae;
      })(e) || ot(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const fo = { tag: Cr };
function Dc() {
  const t = ce();
  t.isEmpty() && t.append(Ge());
}
const Ic = $t({ config: Me({ setOptions: fo, updateOptions: fo }), init: ({ $initialEditorState: t = Dc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (Gi(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Bi, Ko, Ki, Ui, Bo] }), ho = Symbol.for("@lexical/extension/LexicalBuilder");
function go() {
}
function Mc(t) {
  throw t;
}
function vn(t) {
  return Array.isArray(t) ? t : [t];
}
const Jn = "0.43.0+prod.esm";
class $e {
  constructor(e) {
    Rt(this, "roots");
    Rt(this, "extensionNameMap");
    Rt(this, "outgoingConfigEdges");
    Rt(this, "incomingEdges");
    Rt(this, "conflicts");
    Rt(this, "_sortedExtensionReps");
    Rt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Jn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [vn(Ic)];
    for (const o of e) n.push(vn(o));
    return new $e(n);
  }
  static maybeFromEditor(e) {
    const n = e[ho];
    return n && (n.PACKAGE_VERSION !== Jn && ot(292, n.PACKAGE_VERSION, Jn), n instanceof $e || ot(293)), n;
  }
  static fromEditor(e) {
    const n = $e.maybeFromEditor(e);
    return n === void 0 && ot(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(zo({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [ho]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = go;
    function n() {
      try {
        e();
      } finally {
        e = go;
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
    if (n) return n.extension !== e && ot(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const i = this.incomingEdges.get(n);
    i ? i.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && ot(296);
    const n = vn(e), [o] = n;
    typeof o.name != "string" && ot(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && ot(298, o.name), !a) {
      a = new Sc(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && ot(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && ot(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = vn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (Da(i)) return;
      const s = o.extension.name;
      var l;
      Wn(i) || ot(300, s, a || "[unknown]"), Wn(l = i) || ot(304, String(l.id), String(Lr)), i = Object.assign(l, { id: br }), o.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && n(d, s);
      }
      i = Tc(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Wn(o.state) && n(o);
    for (const o of e) for (const [a, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && ot(301, o.name);
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
      const { extension: u } = d;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const m of Cc(u)) {
        if (typeof m != "function") {
          const f = o.get(m.replace);
          f && ot(302, u.name, m.replace.name, f.extension.name), o.set(m.replace, d);
        }
        n.add(m);
      }
      if (u.html) {
        if (u.html.export) for (const [m, f] of u.html.export.entries()) a.set(m, f);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && Ra(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Mc), e;
  }
}
const Oc = /* @__PURE__ */ new Set(), bo = $t({ build(t, e, n) {
  const o = n.getDependency(gr).output, a = ln({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Ta(() => {
  }, () => Zt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Dt()) for (const [d, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(d);
          continue;
        }
        const m = rl(d), f = m && m.isSelected() || !1;
        w = w || f !== (!!s && s.has(d)), f && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = kc(() => (i.value || Oc).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [gr], name: "@lexical/extension/NodeSelection" }), Ac = qi("INSERT_HORIZONTAL_RULE_COMMAND");
class je extends ir {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new je(e.__key);
  }
  static importJSON(e) {
    return $r().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Pc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Jo(n, e.theme.hr), n;
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
function Pc() {
  return { node: $r() };
}
function $r() {
  return nl(je);
}
function Lc(t) {
  return t instanceof je;
}
$t({ dependencies: [gr, bo], name: "@lexical/extension/HorizontalRule", nodes: () => [je], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(bo).output, a = ln({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return we(t.registerCommand(Ac, (s) => {
    const l = Dt();
    if (!Wt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const c = $r();
      gc(c);
    }
    return !0;
  }, Er), t.registerCommand(Hi, (s) => {
    if (Yi(s.target)) {
      const l = Xi(s.target);
      if (Lc(l)) return function(c, w = !1) {
        const d = Dt(), u = c.isSelected(), m = c.getKey();
        let f;
        w && Xo(d) ? f = d : (f = Wi(), Ji(f)), u ? f.delete(m) : f.add(m);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Wo), t.registerMutationListener(je, (s, l) => {
    yc(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, u] of s.entries()) if (u === "destroyed") w.delete(d), c = !0;
      else {
        const m = w.get(d), f = t.getElementByKey(d);
        m ? m.domNode.value = f : (c = !0, w.set(d, { domNode: ln(f), selectedSignal: o(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), Zt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(Zt(() => {
      const w = l.value;
      w && (c.value ? Jo(w, i) : ol(w, i));
    }));
    return we(...s);
  }));
} });
$t({ build: (t, e) => Xe({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Me({ $getParentEditor: function() {
  const t = Zi();
  return $e.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => Zt(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
$t({ build: (t, e, n) => Xe(e), config: Me({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return Zt(() => {
    if (!o.disabled.value) return fc(t, o.onReposition.value);
  });
} });
function Ia(t) {
  return t.canBeEmpty();
}
function $c(t, e, n = Ia) {
  return we(t.registerCommand(al, (o) => {
    const a = Dt();
    if (!Wt(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((m) => kn(m) && m.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), u = hc(d);
      if (u.canIndent()) {
        const m = u.getKey();
        let f = sl();
        if (f.anchor.set(m, 0, "element"), f.focus.set(m, 0, "element"), f = il(f), f.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? ll : oo : cl;
    return t.dispatchCommand(i, void 0);
  }, Er), t.registerCommand(oo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Dt();
    if (!Wt(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return vc((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, Tr));
}
$t({ build: (t, e, n) => Xe(e), config: Me({ $canIndent: Ia, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return Zt(() => {
    if (!o.value) return $c(t, a, i);
  });
} });
const Vc = $t({ name: "@lexical/react/ReactProvider" });
function jc() {
  return ce().getTextContent();
}
function Fc(t, e = !0) {
  if (t) return !1;
  let n = jc();
  return e && (n = n.trim()), n === "";
}
function zc(t) {
  if (!Fc(t, !1)) return !1;
  const e = ce().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (wl(a)) return !1;
    if (se(a)) {
      if (!dl(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!_n(c)) return !1;
      }
    }
  }
  return !0;
}
function Ma(t) {
  return () => zc(t);
}
function Oa(t) {
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
            const [w, d, u, m, f] = c;
            t.update(() => {
              const h = Dt();
              if (Wt(h)) {
                const v = h.anchor;
                let b = v.getNode(), y = 0, N = 0;
                if (_n(b) && w >= 0 && d >= 0 && (y = w, N = w + d, h.setTextNodeRange(b, y, b, N)), y === N && u === "" || (h.insertRawText(u), b = v.getNode()), _n(b)) {
                  y = m, N = m + f;
                  const _ = b.getTextContentSize();
                  y = y > _ ? _ : y, N = N > _ ? _ : N, h.setTextNodeRange(b, y, b, N);
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
$t({ build: (t, e, n) => Xe(e), config: Me({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => Zt(() => n.getOutput().disabled.value ? void 0 : Oa(t)) });
function Bc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Vr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : q;
function Kc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = I(() => n.getDecorators());
    return Vr(() => n.registerDecoratorListener((s) => {
      xl(() => {
        i(s);
      });
    }), [n]), q(() => {
      i(n.getDecorators());
    }, [n]), z(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = r(o, { onError: (m) => n._onError(m), children: r(Ps, { fallback: null, children: a[w] }) }), u = n.getElementByKey(w);
        u !== null && s.push(yl(d, u, w));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function Uc({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = $e.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Vc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Bc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Kc, { editor: t, ErrorBoundary: e });
}
function vo(t) {
  return t.getEditorState().read(Ma(t.isComposing()));
}
function Gc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = ne();
  return function(a) {
    Vr(() => we(vl(a), Oa(a)), [a]);
  }(o), p(at, { children: [t, r(qc, { content: e }), r(Uc, { editor: o, ErrorBoundary: n })] });
}
function qc({ content: t }) {
  const [e] = ne(), n = function(a) {
    const [i, s] = I(() => vo(a));
    return Vr(() => {
      function l() {
        const c = vo(a);
        s(c);
      }
      return l(), we(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = ic();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Hc({ defaultSelection: t }) {
  const [e] = ne();
  return q(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Yc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : q;
function Xc({ onClear: t }) {
  const [e] = ne();
  return Yc(() => Ca(e, t), [e, t]), null;
}
const Aa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : q;
function Wc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: u, ariaRequired: m, autoCapitalize: f, className: h, id: v, role: b = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...V }, j) {
  const [O, R] = I(t.isEditable()), E = K(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? t.setRootElement($) : t.setRootElement(null);
  }, [t]), T = z(() => /* @__PURE__ */ function(...$) {
    return (C) => {
      for (const D of $) typeof D == "function" ? D(C) : D != null && (D.current = C);
    };
  }(j, E), [E, j]);
  return Aa(() => (R(t.isEditable()), t.registerEditableListener(($) => {
    R($);
  })), [t]), r("div", { "aria-activedescendant": O ? e : void 0, "aria-autocomplete": O ? n : "none", "aria-controls": O ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": O && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": O ? u : void 0, "aria-readonly": !O || void 0, "aria-required": m, autoCapitalize: f, className: h, contentEditable: O, "data-testid": k, id: v, ref: T, role: b, spellCheck: y, style: N, tabIndex: _, ...V });
}
const Jc = pn(Wc);
function xo(t) {
  return t.getEditorState().read(Ma(t.isComposing()));
}
const Zc = pn(Qc);
function Qc(t, e) {
  const { placeholder: n, ...o } = t, [a] = ne();
  return p(at, { children: [r(Jc, { editor: a, ...o, ref: e }), n != null && r(tw, { editor: a, content: n })] });
}
function tw({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = I(() => xo(s));
    return Aa(() => {
      function w() {
        const d = xo(s);
        c(d);
      }
      return w(), we(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, a] = I(e.isEditable());
  if (Lt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function ew({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Zc,
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
const Pa = An(void 0);
function nw({
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
  return /* @__PURE__ */ r(Pa.Provider, { value: s, children: i });
}
function La() {
  const t = kr(Pa);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function rw() {
  const [t, e] = I(void 0), n = K(() => {
    e(void 0);
  }, []), o = z(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r($l, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(wa, { children: [
      /* @__PURE__ */ r(da, { children: /* @__PURE__ */ r(pa, { children: i }) }),
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
function ow({
  children: t
}) {
  const [e] = ne(), [n, o] = I(e), [a, i] = I("paragraph"), [s, l] = rw(), c = () => {
  };
  return q(() => n.registerCommand(
    Zo,
    (w, d) => (o(d), !1),
    Tr
  ), [n]), /* @__PURE__ */ p(
    nw,
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
function aw(t) {
  const [e] = ne(), { activeEditor: n } = La();
  q(() => n.registerCommand(
    Zo,
    () => {
      const o = Dt();
      return o && t(o), !1;
    },
    Tr
  ), [e, t]), q(() => {
    n.getEditorState().read(() => {
      const o = Dt();
      o && t(o);
    });
  }, [n, t]);
}
const $a = ve(
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
), sw = x.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  ea.Root,
  {
    ref: a,
    className: g($a({ variant: e, size: n, className: t })),
    ...o
  }
));
sw.displayName = ea.Root.displayName;
const Va = x.createContext({
  size: "default",
  variant: "default"
}), jr = x.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = gt();
  return /* @__PURE__ */ r(
    Ln.Root,
    {
      ref: i,
      className: g("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        Va.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
jr.displayName = Ln.Root.displayName;
const an = x.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = x.useContext(Va);
  return /* @__PURE__ */ r(
    Ln.Item,
    {
      ref: i,
      className: g(
        $a({
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
an.displayName = Ln.Item.displayName;
const yo = [
  { format: "bold", icon: Vs, label: "Bold" },
  { format: "italic", icon: js, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function iw() {
  const { activeEditor: t } = La(), [e, n] = I([]), o = K((a) => {
    if (Wt(a) || Nl(a)) {
      const i = [];
      yo.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return aw(o), /* @__PURE__ */ r(
    jr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: yo.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        an,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Yo, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function lw({ onClear: t }) {
  const [e] = ne();
  q(() => {
    t && t(() => {
      e.dispatchCommand(Ho, void 0);
    });
  }, [e, t]);
}
function cw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = I(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(ow, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(iw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Gc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(ew, { placeholder: t }) }),
          ErrorBoundary: oc
        }
      ),
      e && /* @__PURE__ */ r(Hc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(lw, { onClear: n }),
      /* @__PURE__ */ r(Xc, {})
    ] })
  ] });
}
const ww = {
  namespace: "commentEditor",
  theme: Or,
  nodes: Ar,
  onError: (t) => {
    console.error(t);
  }
};
function Sn({
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
        className: g(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          Zl,
          {
            initialConfig: {
              ...ww,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(bt, { children: [
              /* @__PURE__ */ r(cw, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                tc,
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
function dw(t, e) {
  const n = ul(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!Fa.has(i.nodeName)) {
    const s = za(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Qo && s.insertAfter(ta());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), o;
}
function pw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ce().getChildren();
  for (let a = 0; a < o.length; a++)
    ja(t, o[a], n, e);
  return n.innerHTML;
}
function ja(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = se(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && _n(e) && (s = cc(o, e, "clone"));
  const l = se(s) ? s.getChildren() : [], c = pl(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: u } = w;
  if (!d) return !1;
  const m = document.createDocumentFragment();
  for (let f = 0; f < l.length; f++) {
    const h = l[f], v = ja(t, h, m, o);
    !a && se(e) && v && e.extractWithChild(h, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((qo(d) || ao(d)) && d.append(m), n.append(d), u) {
      const f = u.call(s, d);
      f && (ao(d) ? d.replaceChildren(f) : d.replaceWith(f));
    }
  } else n.append(m);
  return a;
}
const Fa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function za(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Fa.has(t.nodeName)) return s;
  let l = null;
  const c = function(h, v) {
    const { nodeName: b } = h, y = v._htmlConversions.get(b.toLowerCase());
    let N = null;
    if (y !== void 0) for (const _ of y) {
      const k = _(h);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const h = w.node;
    if (l = Array.isArray(h) ? h[h.length - 1] : h, l !== null) {
      for (const [, v] of a) if (l = v(l, i), !l) break;
      l && s.push(...Array.isArray(h) ? h : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const u = t.childNodes;
  let m = [];
  const f = (l == null || !ml(l)) && (l != null && kn(l) || o);
  for (let h = 0; h < u.length; h++) m.push(...za(u[h], e, n, f, new Map(a), l));
  return d != null && (m = d(m)), so(t) && (m = uw(t, m, f ? () => {
    const h = new Qo();
    return n.push(h), h;
  } : Ge)), l == null ? m.length > 0 ? s = s.concat(m) : so(t) && function(h) {
    return h.nextSibling == null || h.previousSibling == null ? !1 : io(h.nextSibling) && io(h.previousSibling);
  }(t) && (s = s.concat(ta())) : se(l) && l.append(...m), s;
}
function uw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (kn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && kn(e[s + 1])) {
      const c = n();
      c.setFormat(o), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function Ba(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Ka(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ka(e.children)
  ) : !1;
}
function jt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ka(t.root.children) : !1;
}
function mw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = na({
    namespace: "EditorUtils",
    theme: Or,
    nodes: Ar,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = dw(e, a);
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
function Dn(t) {
  const e = na({
    namespace: "EditorUtils",
    theme: Or,
    nodes: Ar,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = pw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Fr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function Nn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function zr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
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
function Zn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function fu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = I(fw), [s, l] = I(void 0), [c, w] = I(!1), d = G(void 0), u = G(null);
  q(() => {
    let y = !0;
    const N = u.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && Ba(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
  const m = K(() => {
    if (!jt(a)) return;
    const y = Dn(a);
    e(y, s);
  }, [a, e, s]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", h = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: b }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(U, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Be, {}) }) }),
          /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(
            U,
            {
              onClick: m,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !jt(a),
              children: /* @__PURE__ */ r(Bt, {})
            }
          ) }),
          /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: h }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(me, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ p(
        U,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Mo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Zn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        ee,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ r(ue, { children: t.map((y) => /* @__PURE__ */ r(
            te,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Zn(y, o) })
            },
            y || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: u,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (y) => {
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : zr(y) && (y.preventDefault(), y.stopPropagation(), jt(a) && m());
        },
        onKeyDown: (y) => {
          Fr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          Sn,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => i(y),
            placeholder: f,
            onClear: (y) => {
              d.current = y;
            }
          }
        )
      }
    )
  ] });
}
const hu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), gu = [
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
], hw = ["input", "select", "textarea", "button"], gw = ["button", "textbox"], Br = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = G(null), [i, s] = I(void 0), [l, c] = I(void 0), w = K(
    (f) => {
      s(f);
      const h = t.find((b) => b.id === f);
      h && (e == null || e(h));
      const v = document.getElementById(f);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), d = K(
    (f) => {
      const h = t.find((v) => v.id === f);
      h && (c((v) => v === f ? void 0 : f), n == null || n(h));
    },
    [n, t]
  ), u = (f) => {
    if (!f) return !1;
    const h = f.tagName.toLowerCase();
    if (f.isContentEditable || hw.includes(h)) return !0;
    const v = f.getAttribute("role");
    if (v && gw.includes(v)) return !0;
    const b = f.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, m = K(
    (f) => {
      var O;
      const h = f.target, v = (R) => R ? document.getElementById(R) : void 0, b = v(l), y = v(i);
      if (!!(b && h && b.contains(h) && h !== b) && u(h)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !h.isContentEditable) {
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const R = t.find((E) => E.id === l);
            R && w(R.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!b) return;
          const R = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (R.length === 0) return;
          const E = R.findIndex(($) => $ === h);
          if (E === -1) return;
          let T;
          f.key === "ArrowDown" ? T = Math.min(E + 1, R.length - 1) : T = Math.max(E - 1, 0), T !== E && (f.preventDefault(), f.stopPropagation(), (O = R[T]) == null || O.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((R) => R.id === i);
      let V = k;
      switch (f.key) {
        case "ArrowDown":
          V = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          V = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          V = 0, f.preventDefault();
          break;
        case "End":
          V = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const R = y;
          if (R) {
            const E = R.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = R.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), $ = E ?? T;
            if ($) {
              f.preventDefault(), $.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (u(h) || (o == null || o(f.key), f.preventDefault()));
          return;
      }
      const j = t[V];
      j && w(j.id);
    },
    [t, w, i, l, d, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: m,
    /** Focus an option by its ID */
    focusOption: w
  };
}, bw = ve(
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
), Se = x.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: g("pr-twp", bw({ variant: e }), t), ...n })
);
Se.displayName = "Badge";
const Ua = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: g(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Ua.displayName = "Card";
const vw = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: g("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
vw.displayName = "CardHeader";
const xw = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: g(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
xw.displayName = "CardTitle";
const yw = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: g("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
yw.displayName = "CardDescription";
const Ga = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: g("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ga.displayName = "CardContent";
const Nw = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: g("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Nw.displayName = "CardFooter";
const zt = x.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  ra.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: g(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
zt.displayName = ra.Root.displayName;
const qa = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Root,
  {
    ref: n,
    className: g(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
qa.displayName = qe.Root.displayName;
const kw = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Image,
  {
    ref: n,
    className: g("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
kw.displayName = qe.Image.displayName;
const Ha = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Fallback,
  {
    ref: n,
    className: g(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ha.displayName = qe.Fallback.displayName;
const Kr = An(void 0);
function Ut() {
  const t = kr(Kr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const fe = ve("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), be = it.Trigger, Ya = it.Group, _w = it.Portal, Cw = it.Sub, Ew = it.RadioGroup;
function de({ variant: t = "default", ...e }) {
  const n = x.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Kr.Provider, { value: n, children: /* @__PURE__ */ r(it.Root, { ...e }) });
}
const Xa = x.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Ut();
  return /* @__PURE__ */ p(
    it.SubTrigger,
    {
      ref: a,
      className: g(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        fe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Xa.displayName = it.SubTrigger.displayName;
const Wa = x.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = gt();
  return /* @__PURE__ */ r(
    it.SubContent,
    {
      ref: o,
      className: g(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: a, children: e })
    }
  );
});
Wa.displayName = it.SubContent.displayName;
const Qt = x.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = gt();
  return /* @__PURE__ */ r(it.Portal, { children: /* @__PURE__ */ r(
    it.Content,
    {
      ref: a,
      sideOffset: e,
      className: g(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
Qt.displayName = it.Content.displayName;
const In = x.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = gt(), i = Ut();
  return /* @__PURE__ */ r(
    it.Item,
    {
      ref: o,
      className: g(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        fe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
In.displayName = it.Item.displayName;
const le = x.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = gt(), s = Ut();
  return /* @__PURE__ */ p(
    it.CheckboxItem,
    {
      ref: a,
      className: g(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        fe({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(it.ItemIndicator, { children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
le.displayName = it.CheckboxItem.displayName;
const Ja = x.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = gt(), i = Ut();
  return /* @__PURE__ */ p(
    it.RadioItem,
    {
      ref: o,
      className: g(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        fe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(it.ItemIndicator, { children: /* @__PURE__ */ r(Pn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Ja.displayName = it.RadioItem.displayName;
const mn = x.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  it.Label,
  {
    ref: o,
    className: g("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
mn.displayName = it.Label.displayName;
const We = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Separator,
  {
    ref: n,
    className: g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
We.displayName = it.Separator.displayName;
function Tw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: g("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Tw.displayName = "DropdownMenuShortcut";
function No({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = I(!1), [d, u] = I(), m = G(null);
  q(() => {
    if (!c) return;
    let k = !0;
    const V = m.current;
    if (!V) return;
    const j = setTimeout(() => {
      k && Ba(V);
    }, 300);
    return () => {
      k = !1, clearTimeout(j);
    };
  }, [c]);
  const f = K(
    (k) => {
      k && k.stopPropagation(), w(!1), u(void 0), s == null || s(!1);
    },
    [s]
  ), h = K(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Dn(d)
      ) && (w(!1), u(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), v = z(() => {
    const k = new Date(t.date), V = vi(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), j = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return _e(n["%comment_dateAtTime%"], {
      date: V,
      time: j
    });
  }, [t.date, n]), b = z(() => t.user, [t.user]), y = z(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = z(() => xi(t.contents), [t.contents]), _ = z(() => {
    if (o && l)
      return /* @__PURE__ */ p(at, { children: [
        /* @__PURE__ */ p(
          In,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), u(mw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(Fs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          In,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
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
    i,
    s
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: g("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(qa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ha, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: b }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: v }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Se, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              Nn(t.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: m,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), f()) : zr(k) && (k.preventDefault(), k.stopPropagation(), jt(d) && h());
              },
              onKeyDown: (k) => {
                Fr(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  Sn,
                  {
                    className: g(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: d,
                    onSerializedChange: (k) => u(k)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    U,
                    {
                      size: "icon",
                      onClick: f,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Be, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    U,
                    {
                      size: "icon",
                      onClick: h,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !jt(d),
                      children: /* @__PURE__ */ r(_r, {})
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
                className: g(
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
        _ && /* @__PURE__ */ p(de, { children: [
          /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(U, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Oo, {}) }) }),
          /* @__PURE__ */ r(Qt, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const ko = {
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
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: d,
  handleAddCommentToThread: u,
  handleUpdateComment: m,
  handleDeleteComment: f,
  handleReadStatusChange: h,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: V = 5,
  onVerseRefClick: j
}) {
  const [O, R] = I(ko), [E, T] = I(
    void 0
  ), $ = o, [C, D] = I(!1), [A, W] = I(!1), [P, tt] = I(!1), [Et, B] = I(!1), [st, J] = I(!1), [Z, H] = I(k), [wt, dt] = I(!1), ut = G(void 0), [Tt, re] = I(/* @__PURE__ */ new Map());
  q(() => {
    let M = !0;
    return (async () => {
      const xt = N ? await N(c) : !1;
      M && J(xt);
    })(), () => {
      M = !1;
    };
  }, [c, N]), q(() => {
    let M = !0;
    if (!o) {
      B(!1), re(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = y ? await y(c) : !1;
      M && B(xt);
    })(), () => {
      M = !1;
    };
  }, [o, c, y]);
  const Gt = z(() => e.filter((M) => !M.deleted), [e]);
  q(() => {
    let M = !0;
    if (!o || !_) {
      re(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const xt = /* @__PURE__ */ new Map();
      await Promise.all(
        Gt.map(async (Xr) => {
          const Is = await _(Xr.id);
          M && xt.set(Xr.id, Is);
        })
      ), M && re(xt);
    })(), () => {
      M = !1;
    };
  }, [o, Gt, _]);
  const qt = z(() => Gt[0], [Gt]), Oe = G(null), he = G(void 0), oe = K(() => {
    var M;
    (M = he.current) == null || M.call(he), R(ko);
  }, []), Ze = K(() => {
    const M = !Z;
    H(M), dt(!M), h == null || h(c, M);
  }, [Z, h, c]);
  q(() => {
    D(!1);
  }, [o]), q(() => {
    if (o && !Z && !wt) {
      const M = setTimeout(() => {
        H(!0), h == null || h(c, !0);
      }, V * 1e3);
      return ut.current = M, () => clearTimeout(M);
    }
    ut.current && (clearTimeout(ut.current), ut.current = void 0);
  }, [o, Z, wt, V, c, h]);
  const L = z(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), S = z(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const M = Nn(i, n);
    return _e(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [i, n]), F = z(() => Gt.slice(1), [Gt]), Y = z(() => F.length ?? 0, [F.length]), X = z(() => Y > 0, [Y]), pt = z(() => C || Y <= 2 ? F : F.slice(-2), [F, Y, C]), rt = z(() => C || Y <= 2 ? 0 : Y - 2, [Y, C]), _t = z(
    () => Y === 1 ? L.singleReply : _e(L.multipleReplies, { count: Y }),
    [Y, L]
  ), mt = z(
    () => rt === 1 ? L.singleReply : _e(L.multipleReplies, { count: rt }),
    [rt, L]
  );
  q(() => {
    !o && A && X && W(!1);
  }, [o, A, X]);
  const Ot = K(
    async (M) => {
      M && M.stopPropagation();
      const Ct = jt(O) ? Dn(O) : void 0;
      if (E !== void 0) {
        await u({
          threadId: c,
          contents: Ct,
          assignedUser: E
        }) && (T(void 0), Ct && oe());
        return;
      }
      Ct && await u({ threadId: c, contents: Ct }) && oe();
    },
    [
      oe,
      O,
      u,
      E,
      c
    ]
  ), Vt = K(
    async (M) => {
      const Ct = jt(O) ? Dn(O) : void 0, xt = await u({
        ...M,
        contents: Ct,
        assignedUser: E ?? M.assignedUser
      });
      return xt && Ct && oe(), xt && E !== void 0 && T(void 0), xt;
    },
    [oe, O, u, E]
  );
  if (qt)
    return /* @__PURE__ */ r(
      Ua,
      {
        role: "option",
        "aria-selected": o,
        id: c,
        className: g(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && d !== "Resolved" && Z,
            "tw-bg-background": o && d !== "Resolved" && Z,
            "tw-bg-muted": d === "Resolved",
            "tw-bg-accent": !Z && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(c);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Ga, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              S && /* @__PURE__ */ r(Se, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: S }),
              /* @__PURE__ */ r(
                U,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (M) => {
                    M.stopPropagation(), Ze();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": Z ? "Mark as unread" : "Mark as read",
                  children: Z ? /* @__PURE__ */ r(Bs, {}) : /* @__PURE__ */ r(Ks, {})
                }
              ),
              st && d !== "Resolved" && /* @__PURE__ */ r(
                U,
                {
                  variant: "ghost",
                  size: "icon",
                  className: g(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (M) => {
                    M.stopPropagation(), Vt({
                      threadId: c,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: Oe,
                className: g(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": $
                  },
                  { "tw-whitespace-nowrap": !$ }
                ),
                children: [
                  a && j ? /* @__PURE__ */ r(
                    U,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (M) => {
                        M.stopPropagation(), j(w);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    qt.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: qt.selectedText }),
                    qt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              No,
              {
                comment: qt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Vt,
                handleUpdateComment: m,
                handleDeleteComment: f,
                onEditingChange: W,
                canEditOrDelete: (!A && Tt.get(qt.id)) ?? !1,
                canUserResolveThread: st
              }
            )
          ] }),
          /* @__PURE__ */ p(at, { children: [
            X && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(zt, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: _t })
            ] }),
            !o && jt(O) && /* @__PURE__ */ r(
              Sn,
              {
                editorSerializedState: O,
                onSerializedChange: (M) => R(M),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(at, { children: [
              rt > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (M) => {
                    M.stopPropagation(), D(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (M) => {
                    (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), D(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(zt, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: mt }),
                      C ? /* @__PURE__ */ r(Ao, {}) : /* @__PURE__ */ r(Ke, {})
                    ] })
                  ]
                }
              ),
              pt.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                No,
                {
                  comment: M,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: m,
                  handleDeleteComment: f,
                  onEditingChange: W,
                  canEditOrDelete: (!A && Tt.get(M.id)) ?? !1
                }
              ) }, M.id)),
              b !== !1 && (!A || jt(O)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (M) => M.stopPropagation(),
                  onKeyDownCapture: (M) => {
                    zr(M) && (M.preventDefault(), M.stopPropagation(), (jt(O) || E !== void 0) && Ot());
                  },
                  onKeyDown: (M) => {
                    Fr(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      Sn,
                      {
                        editorSerializedState: O,
                        onSerializedChange: (M) => R(M),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (M) => {
                          he.current = M;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      E !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: _e(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: Nn(
                            E,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(me, { open: P, onOpenChange: tt, children: [
                        /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ r(
                          U,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Et || !v || v.length === 0 || !v.includes(s),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(Mo, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          ee,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (M) => {
                              M.key === "Escape" && (M.stopPropagation(), tt(!1));
                            },
                            children: /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ r(ue, { children: v == null ? void 0 : v.map((M) => /* @__PURE__ */ r(
                              te,
                              {
                                onSelect: () => {
                                  T(M !== i ? M : void 0), tt(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: Nn(M, n) })
                              },
                              M || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ r(
                        U,
                        {
                          size: "icon",
                          onClick: Ot,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !jt(O) && E === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(_r, {})
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
function bu({
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
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: m,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: h,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [y, N] = I(/* @__PURE__ */ new Set()), [_, k] = I();
  q(() => {
    h && (N((D) => new Set(D).add(h)), k(h));
  }, [h]);
  const V = n.filter(
    (D) => D.comments.some((A) => !A.deleted)
  ), j = V.map((D) => ({ id: D.id })), O = K(
    (D) => {
      N((A) => new Set(A).add(D.id)), k(D.id), v == null || v(D.id);
    },
    [v]
  ), R = K(
    (D) => {
      const A = y.has(D);
      N((W) => {
        const P = new Set(W);
        return P.has(D) ? P.delete(D) : P.add(D), P;
      }), k(D), v == null || v(A ? void 0 : D);
    },
    [y, v]
  ), { listboxRef: E, activeId: T, handleKeyDown: $ } = Br({
    options: j,
    onOptionSelect: O
  }), C = K(
    (D) => {
      D.key === "Escape" ? (_ && y.has(_) && (N((A) => {
        const W = new Set(A);
        return W.delete(_), W;
      }), k(void 0), v == null || v(void 0)), D.preventDefault(), D.stopPropagation()) : $(D);
    },
    [_, y, $, v]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: E,
      "aria-activedescendant": T ?? void 0,
      "aria-label": "Comments",
      className: g(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: C,
      children: V.map((D) => /* @__PURE__ */ r(
        "div",
        {
          className: g({
            "tw-opacity-60": D.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Rw,
            {
              classNameForVerseText: e,
              comments: D.comments,
              localizedStrings: a,
              verseRef: D.verseRef,
              handleSelectThread: R,
              threadId: D.id,
              thread: D,
              isRead: D.isRead,
              isSelected: y.has(D.id),
              currentUser: o,
              assignedUser: D.assignedUser,
              threadStatus: D.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: u,
              canUserResolveThreadCallback: m,
              canUserEditOrDeleteCommentCallback: f,
              onVerseRefClick: b
            }
          )
        },
        D.id
      ))
    }
  );
}
function Sw({ table: t }) {
  return /* @__PURE__ */ p(de, { children: [
    /* @__PURE__ */ r(kl, { asChild: !0, children: /* @__PURE__ */ p(U, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Us, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(Qt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(mn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(We, {}),
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
const Fe = ft.Root, Dw = ft.Group, ze = ft.Value, Iw = ve(
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
), De = x.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = gt();
  return /* @__PURE__ */ p(
    ft.Trigger,
    {
      className: g(Iw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(ft.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
De.displayName = ft.Trigger.displayName;
const Za = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.ScrollUpButton,
  {
    ref: n,
    className: g("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ao, { className: "tw-h-4 tw-w-4" })
  }
));
Za.displayName = ft.ScrollUpButton.displayName;
const Qa = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.ScrollDownButton,
  {
    ref: n,
    className: g("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" })
  }
));
Qa.displayName = ft.ScrollDownButton.displayName;
const Ie = x.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = gt();
  return /* @__PURE__ */ r(ft.Portal, { children: /* @__PURE__ */ p(
    ft.Content,
    {
      ref: a,
      className: g(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(Za, {}),
        /* @__PURE__ */ r(
          ft.Viewport,
          {
            className: g(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(Qa, {})
      ]
    }
  ) });
});
Ie.displayName = ft.Content.displayName;
const Mw = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Label,
  {
    ref: n,
    className: g("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Mw.displayName = ft.Label.displayName;
const Pt = x.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  ft.Item,
  {
    ref: o,
    className: g(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(ft.ItemText, { children: e })
    ]
  }
));
Pt.displayName = ft.Item.displayName;
const Ow = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Separator,
  {
    ref: n,
    className: g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ow.displayName = ft.Separator.displayName;
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
        Fe,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(De, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(ze, { placeholder: t.getState().pagination.pageSize }) }),
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
        U,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Gs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(qs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Ys, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const _o = `
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
function cn(t, e) {
  const n = e ? `${_o}, ${e}` : _o;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Pw(o)
  );
}
const Vn = x.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = x.useRef(null);
  x.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), x.useEffect(() => {
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
  return /* @__PURE__ */ r("div", { className: g("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: a,
      className: g(
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
Vn.displayName = "Table";
const jn = x.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: g(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
jn.displayName = "TableHeader";
const Fn = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: g("[&_tr:last-child]:tw-border-0", t), ...e }));
Fn.displayName = "TableBody";
const Lw = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: g("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Lw.displayName = "TableFooter";
function $w(t) {
  x.useEffect(() => {
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
function Vw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function jw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const ae = x.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = x.useRef(null);
  x.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), $w(s);
  const l = x.useMemo(
    () => s.current ? cn(s.current) : [],
    [s]
  ), c = x.useCallback(
    (d) => {
      const { current: u } = s;
      if (!u || !u.parentElement) return;
      const m = u.closest("table"), f = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        cn(m).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], h = f.indexOf(u), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), jw(f, h, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Vw(l, v, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = u.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), w = x.useCallback(
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
      className: g(
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
const wn = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: g(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
wn.displayName = "TableHead";
const Te = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: g("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Te.displayName = "TableCell";
const Fw = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: g("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Fw.displayName = "TableCaption";
function dn({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: g("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function zw({
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
  const [d, u] = I([]), [m, f] = I([]), [h, v] = I({}), [b, y] = I({}), N = z(() => e ?? [], [e]), _ = oa({
    data: N,
    columns: t,
    getCoreRowModel: sa(),
    ...n && { getPaginationRowModel: Cl() },
    onSortingChange: u,
    getSortedRowModel: aa(),
    onColumnFiltersChange: f,
    getFilteredRowModel: _l(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: y,
    state: {
      sorting: d,
      columnFilters: m,
      columnVisibility: h,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let V;
  return c ? V = Array.from({ length: 10 }).map((E, T) => `skeleton-row-${T}`).map((E) => /* @__PURE__ */ r(ae, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Te, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(dn, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, E)) : ((j = _.getRowModel().rows) == null ? void 0 : j.length) > 0 ? V = _.getRowModel().rows.map((O) => /* @__PURE__ */ r(
    ae,
    {
      onClick: () => s(O, _),
      "data-state": O.getIsSelected() && "selected",
      children: O.getVisibleCells().map((R) => /* @__PURE__ */ r(Te, { children: rn(R.column.columnDef.cell, R.getContext()) }, R.id))
    },
    O.id
  )) : V = /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ r(Te, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Sw, { table: _ }),
    /* @__PURE__ */ p(Vn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(jn, { stickyHeader: i, children: _.getHeaderGroups().map((O) => /* @__PURE__ */ r(ae, { children: O.headers.map((R) => /* @__PURE__ */ r(wn, { className: "tw-p-0", children: R.isPlaceholder ? void 0 : rn(R.column.columnDef.header, R.getContext()) }, R.id)) }, O.id)) }),
      /* @__PURE__ */ r(Fn, { children: V })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        U,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        U,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Aw, { table: _ })
  ] });
}
function vu({
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
      className: g(
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
const Bw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Co = (t, e) => t[e] ?? e;
function Kw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = Co(n, "%webView_error_dump_header%"), i = Co(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(U, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(Po, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const xu = Object.freeze([
  ...Bw,
  "%webView_error_dump_copied_message%"
]);
function yu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = I(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(me, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(xe, { asChild: !0, children: o }),
    /* @__PURE__ */ p(ee, { id: i, className: g("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(yt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Kw,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Uw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Uw || {});
function Nu({ id: t, label: e, groups: n }) {
  const [o, a] = I(
    Object.fromEntries(
      n.map(
        (w, d) => w.itemType === 0 ? [d, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = I({}), l = (w, d) => {
    const u = !o[w][d];
    a((f) => (f[w][d] = u, { ...f }));
    const m = n[w].items[d];
    m.onUpdate(m.id, u);
  }, c = (w, d) => {
    s((m) => (m[w] = d, { ...m }));
    const u = n[w].items.find((m) => m.id === d);
    u ? u.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(de, { children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ p(U, { variant: "default", children: [
      /* @__PURE__ */ r(Xs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Ke, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(Qt, { children: n.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(mn, { children: w.label }),
      /* @__PURE__ */ r(Ya, { children: w.itemType === 0 ? /* @__PURE__ */ r(at, { children: w.items.map((u, m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        le,
        {
          checked: o[d][m],
          onCheckedChange: () => l(d, m),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ r(
        Ew,
        {
          value: i[d],
          onValueChange: (u) => c(d, u),
          children: w.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Ja, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ r(We, {})
    ] }, w.label)) })
  ] }) });
}
function ku({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new yi("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, u) => d + u, 0)), w = () => {
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
            /* @__PURE__ */ r(Ws, { className: "tw-h-4 tw-w-4" }),
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
            U,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Js, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            U,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Zs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Gw({ id: t, versionHistory: e }) {
  const [n, o] = I(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), d = w.getUTCFullYear() - 1970, u = w.getUTCMonth(), m = w.getUTCDate() - 1;
    let f = "";
    return d > 0 ? f = `${d.toString()} year${d === 1 ? "" : "s"} ago` : u > 0 ? f = `${u.toString()} month${u === 1 ? "" : "s"} ago` : m === 0 ? f = "today" : f = `${m.toString()} day${m === 1 ? "" : "s"} ago`, f;
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
function _u({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = z(() => Ni(n), [n]), c = ((w) => {
    const d = new Intl.DisplayNames(ki(), { type: "language" });
    return w.map((u) => d.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Gw, { versionHistory: a }),
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
function qw({
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
  isDisabled: u = !1,
  sortSelected: m = !1,
  icon: f = void 0,
  className: h = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [y, N] = I(!1), _ = K(
    (T) => {
      var C;
      const $ = (C = t.find((D) => D.label === T)) == null ? void 0 : C.value;
      $ && n(
        e.includes($) ? e.filter((D) => D !== $) : [...e, $]
      );
    },
    [t, e, n]
  ), k = () => c || o, V = z(() => {
    if (!m) return t;
    const T = t.filter((C) => C.starred).sort((C, D) => C.label.localeCompare(D.label)), $ = t.filter((C) => !C.starred).sort((C, D) => {
      const A = e.includes(C.value), W = e.includes(D.value);
      return A && !W ? -1 : !A && W ? 1 : C.label.localeCompare(D.label);
    });
    return [...T, ...$];
  }, [t, e, m]), j = () => {
    n(t.map((T) => T.value));
  }, O = () => {
    n([]);
  }, R = w ?? y;
  return /* @__PURE__ */ r("div", { id: b, className: h, children: /* @__PURE__ */ p(me, { open: R, onOpenChange: d ?? N, children: [
    /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ p(
      U,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": R,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            f && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: f }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: g(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ r(Lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ee, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(pe, { children: [
      /* @__PURE__ */ r(Ye, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: j, children: i }),
        /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: O, children: s })
      ] }),
      /* @__PURE__ */ p(ue, { children: [
        /* @__PURE__ */ r(un, { children: l }),
        /* @__PURE__ */ r(Jt, { children: V.map((T) => /* @__PURE__ */ p(
          te,
          {
            value: T.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Bt,
                {
                  className: g(
                    "tw-h-4 tw-w-4",
                    e.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(Qs, { className: "tw-h-4 tw-w-4" }),
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
function Cu({
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
  id: u
}) {
  return /* @__PURE__ */ p("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      qw,
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
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((m) => {
      var f;
      return /* @__PURE__ */ p(Se, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          U,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((h) => h !== m)),
            children: /* @__PURE__ */ r(Be, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((h) => h.value === m)) == null ? void 0 : f.label
      ] }, m);
    }) }) : /* @__PURE__ */ r(yt, { children: d })
  ] });
}
const Hw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Eo = (t, e) => t[e] ?? e;
function Yw({
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
    /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(
        U,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(ti, {})
        }
      ) }),
      /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ p("p", { children: [
        Eo(a, "%undoButton_tooltip%"),
        i && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(
        U,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(ei, {})
        }
      ) }),
      /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ p("p", { children: [
        Eo(a, "%redoButton_tooltip%"),
        i && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Xw({ children: t, editorRef: e }) {
  const n = G(null);
  return q(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var w, d, u, m;
      if (!a || document.activeElement !== a) return;
      const c = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (w = e.current) == null || w.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (u = e.current) == null || u.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (m = e.current) == null || m.redo());
      }
    };
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Je = x.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: g(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
Je.displayName = "Input";
const Ww = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(at, { children: [
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
function Jw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = G(null), s = G(null), l = G(!1), [c, w] = I(t), [d, u] = I(n), [m, f] = I(!1);
  q(() => {
    w(t);
  }, [t]), q(() => {
    d !== n && u(n);
  }, [n]);
  const h = (b) => {
    l.current = !1, f(b), b || (c !== "custom" || d ? (e(c), o(d)) : (w(t), u(n)));
  }, v = (b) => {
    var y, N, _, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((y = i.current) == null || y.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && h(!1);
  };
  return /* @__PURE__ */ p(de, { open: m, onOpenChange: h, children: [
    /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(U, { variant: "outline", className: "tw-h-6", children: Ww(t, a, n) }) }) }),
      /* @__PURE__ */ r(vt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      Qt,
      {
        style: { zIndex: ia },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ r(mn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(We, {}),
          /* @__PURE__ */ r(
            le,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: lr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: cr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
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
                    onChange: (b) => u(b.target.value)
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
const Zw = (t, e) => t === "f" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r(Vo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r(jo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r($o, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Qw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), _e(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function td({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(de, { children: [
    /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(hl, { asChild: !0, children: /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(U, { variant: "outline", className: "tw-h-6", children: Zw(t, n) }) }) }),
      /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: Qw(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(Qt, { style: { zIndex: ia }, children: [
      /* @__PURE__ */ r(mn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(We, {}),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r($o, {}),
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
            /* @__PURE__ */ r(Vo, {}),
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
            /* @__PURE__ */ r(jo, {}),
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
  return /* @__PURE__ */ r(t ?? ni, { className: e, size: 16 });
}
function To({
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
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(nd, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(ua, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function rd({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = I(""), [i, s] = z(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const c = e.filter(
      (d) => {
        var u;
        return (u = d.marker) == null ? void 0 : u.toLowerCase().includes(l);
      }
    ), w = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !c.includes(d)
    );
    return [c, w];
  }, [o, e]);
  return /* @__PURE__ */ p(pe, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
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
    /* @__PURE__ */ p(ue, { children: [
      /* @__PURE__ */ r(un, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Jt, { children: i.map((l) => {
        var c;
        return /* @__PURE__ */ r(
          To,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(at, { children: [
        i.length > 0 && /* @__PURE__ */ r(Sr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Jt, { children: s.map((l) => {
          var c;
          return /* @__PURE__ */ r(
            To,
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
function od(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = xn[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[xn[l].description] ?? xn[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
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
function Eu({
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
  const d = G(null), u = G(null), m = G(null), f = G(null);
  Lt(() => {
    if (!f.current) return;
    const { width: S } = f.current.getBoundingClientRect();
    S > 0 && (f.current.style.width = `${S}px`);
  }, []);
  const [h, v] = I("generated"), [b, y] = I("*"), [N, _] = I("f"), [k, V] = I(!1), [j, O] = I(!0), [R, E] = I(!1), T = G(!1), $ = G(""), [C, D] = I(!1), [A, W] = I(), [P, tt] = I(), [Et, B] = I(), [st, J] = I(), Z = G(null), H = z(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? Sl(), noteMode: "expanded" }
    }),
    [s, l]
  ), wt = z(
    () => od(
      d,
      () => D(!1),
      c,
      st
    ),
    [c, st]
  );
  q(() => {
    var S;
    C || (S = d.current) == null || S.focus();
  }, [N, C]), q(() => {
    var Y, X;
    let S;
    T.current = !1, O(!0);
    const F = e == null ? void 0 : e.at(0);
    if (F && hn("note", F)) {
      const pt = (Y = F.insert.note) == null ? void 0 : Y.caller;
      let rt = "custom";
      pt === lr ? rt = "generated" : pt === cr ? rt = "hidden" : pt && y(pt), v(rt), _(((X = F.insert.note) == null ? void 0 : X.style) ?? "f"), S = setTimeout(() => {
        var _t;
        (_t = d.current) == null || _t.applyUpdate([F]);
      }, 0);
    }
    return () => {
      S && clearTimeout(S);
    };
  }, [e, i]);
  const dt = K(
    (S, F, Y = !1) => {
      var pt, rt, _t;
      const X = (rt = (pt = d.current) == null ? void 0 : pt.getNoteOps(0)) == null ? void 0 : rt.at(0);
      if (X && hn("note", X)) {
        if (X.insert.note) {
          let mt;
          S === "custom" ? mt = F : S === "generated" ? mt = lr : mt = cr, X.insert.note.caller = mt;
        }
        n == null || n([X]), Y && w && i && ((_t = w.current) == null || _t.replaceEmbedUpdate(i, [X]));
      }
    },
    [i, n, w]
  ), ut = K(() => {
    dt(h, b, !0), o();
  }, [h, b, o, dt]), Tt = G(ut);
  Lt(() => {
    Tt.current = ut;
  });
  const re = G({ book: a.book, chapterNum: a.chapterNum });
  Lt(() => {
    (re.current.book !== a.book || re.current.chapterNum !== a.chapterNum) && (re.current = { book: a.book, chapterNum: a.chapterNum }, Tt.current());
  }, [a.book, a.chapterNum]);
  const Gt = () => {
    var F;
    const S = (F = u.current) == null ? void 0 : F.getElementsByClassName("editor-input")[0];
    S != null && S.textContent && navigator.clipboard.writeText(S.textContent);
  }, qt = K(
    (S) => {
      v(S), dt(S, b);
    },
    [b, dt]
  ), Oe = K(
    (S) => {
      y(S), dt(h, S);
    },
    [h, dt]
  ), he = (S) => {
    var Y, X, pt, rt, _t;
    _(S);
    const F = (X = (Y = d.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : X.at(0);
    if (F && hn("note", F)) {
      F.insert.note && (F.insert.note.style = S);
      const mt = (rt = (pt = F.insert.note) == null ? void 0 : pt.contents) == null ? void 0 : rt.ops;
      N !== "x" && S === "x" ? mt == null || mt.forEach((Ot) => ad(Ot)) : N === "x" && S !== "x" && (mt == null || mt.forEach((Ot) => sd(Ot))), (_t = d.current) == null || _t.applyUpdate([F, { delete: 1 }]);
    }
  }, oe = (S) => {
    J(S.contextMarker), E(S.canRedo);
  }, Ze = K(
    (S) => {
      var Y, X, pt, rt, _t;
      const F = (X = (Y = d.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : X.at(0);
      if (F && hn("note", F)) {
        S.content.length > 1 && setTimeout(() => {
          var Vt;
          (Vt = d.current) == null || Vt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (pt = F.insert.note) == null ? void 0 : pt.style, Ot = (_t = (rt = F.insert.note) == null ? void 0 : rt.contents) == null ? void 0 : _t.ops;
        if (mt || V(!1), V(
          mt === "x" ? !!(Ot != null && Ot.every((Vt) => {
            var Ct, xt;
            if (!((Ct = Vt.attributes) != null && Ct.char)) return !0;
            const M = ((xt = Vt.attributes) == null ? void 0 : xt.char).style;
            return M === "xt" || M === "xo" || M === "xq";
          })) : !!(Ot != null && Ot.every((Vt) => {
            var Ct, xt;
            if (!((Ct = Vt.attributes) != null && Ct.char)) return !0;
            const M = ((xt = Vt.attributes) == null ? void 0 : xt.char).style;
            return M === "ft" || M === "fr" || M === "fq";
          }))
        ), !T.current) {
          T.current = !0, $.current = JSON.stringify(F), O(!0);
          return;
        }
        O(JSON.stringify(F) === $.current), dt(h, b);
      } else
        V(!1), O(!0);
    },
    [h, b, dt]
  ), L = K(() => {
    const S = window.getSelection();
    if (m.current && wt.length && S && S.rangeCount > 0) {
      const F = S.getRangeAt(0).getBoundingClientRect(), Y = m.current.getBoundingClientRect();
      W(F.left - Y.left), tt(F.top - Y.top), B(F.height), D(!0);
    }
  }, [wt, m]);
  return q(() => {
    const S = () => {
      C && D(!1);
    };
    return window.addEventListener("click", S), () => {
      window.removeEventListener("click", S);
    };
  }, [C]), q(() => {
    var S;
    C && ((S = Z.current) == null || S.focus());
  }, [C]), q(() => {
    var Y;
    const S = ((Y = u.current) == null ? void 0 : Y.querySelector(".editor-input")) ?? void 0, F = (X) => {
      !C && S && document.activeElement === S && X.key === l ? (X.preventDefault(), L()) : C && X.key === "Escape" && (X.preventDefault(), D(!1));
    };
    return document.addEventListener("keydown", F), () => {
      document.removeEventListener("keydown", F);
    };
  }, [C, L, l]), /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { ref: f, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            td,
            {
              isTypeSwitchable: k,
              noteType: N,
              handleNoteTypeChange: he,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            Jw,
            {
              callerType: h,
              updateCallerType: qt,
              customCaller: b,
              updateCustomCaller: Oe,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Yw,
            {
              onUndoClick: () => {
                var S;
                return (S = d.current) == null ? void 0 : S.undo();
              },
              onRedoClick: () => {
                var S;
                return (S = d.current) == null ? void 0 : S.redo();
              },
              canUndo: !j,
              canRedo: R,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(
              U,
              {
                onClick: ut,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Bt, {})
              }
            ) }),
            /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(U, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(Be, {}) }) }),
            /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: u,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Xw, { editorRef: d, children: /* @__PURE__ */ r(
              Dl,
              {
                options: H,
                onStateChange: oe,
                onUsjChange: Ze,
                defaultUsj: id,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
              /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r(
                U,
                {
                  onClick: Gt,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Po, {})
                }
              ) }),
              /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: "tw-absolute",
        ref: m,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(me, { open: C, children: [
      /* @__PURE__ */ r(
        Bl,
        {
          className: "tw-absolute",
          style: {
            top: P,
            left: A,
            height: Et,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        ee,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (S) => {
            S.preventDefault(), S.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            rd,
            {
              markerMenuItems: wt,
              localizedStrings: c,
              searchRef: Z
            }
          )
        }
      )
    ] })
  ] });
}
const Tu = Object.freeze([
  ...ed,
  ...Object.entries(xn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Hw
]);
function ts(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function ld(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Ur(t, l, n, !0, a),
      w && o
    ] }, ts(t, l));
  });
}
function Ur(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = g(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(ar, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(ar, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return cd(
        i,
        ts(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function cd(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      ar,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ur(a, t.content, n, !0, [
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
  const a = n ? n(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: g("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), u = s && /* @__PURE__ */ p(at, { children: [
    Ur(t.marker, [s], o, !1),
    " "
  ] }), m = e === "horizontal" ? "horizontal" : "vertical", f = o ? "marker-visible" : "", h = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", v = g(m, f);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { className: g("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: [
      c,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: g("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: u }),
    /* @__PURE__ */ r(
      "div",
      {
        className: g(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          h,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(at, { children: ld(t.marker, l, o, w) })
      }
    )
  ] });
}
function Ru({
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
  const d = c ?? _i(n, void 0), u = (N, _) => {
    w == null || w(N, _, a);
  }, m = i ? n.findIndex((N) => N === i) : -1, [f, h] = I(m), v = (N, _, k) => {
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
          N.preventDefault(), h((_) => Math.min(_ + 1, n.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), h((_) => Math.max(_ - 1, 0));
          break;
      }
  }, y = G([]);
  return q(() => {
    var N;
    f >= 0 && f < y.current.length && ((N = y.current[f]) == null || N.focus());
  }, [f]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: f < 0 ? 0 : -1,
      className: g("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: g(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((N, _) => {
            const k = N === i, V = `${a}-${_}`;
            return /* @__PURE__ */ p(at, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (j) => {
                    y.current[_] = j;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === f ? 0 : -1,
                  className: g(
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
                  onClick: () => u(N, _),
                  onKeyDown: (j) => v(j, N, _),
                  children: /* @__PURE__ */ r(
                    wd,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => d(N.caller, _),
                      showMarkers: s
                    }
                  )
                },
                V
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(zt, { tabIndex: -1, className: "tw-col-span-2" })
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
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = z(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const d = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(d) || (c.add(d), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(Vn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(jn, { stickyHeader: !0, children: /* @__PURE__ */ p(ae, { children: [
      /* @__PURE__ */ r(wn, { children: a }),
      /* @__PURE__ */ r(wn, { children: i })
    ] }) }),
    /* @__PURE__ */ r(Fn, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      ae,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Te, { children: Ce(l.reference, "English") }),
          /* @__PURE__ */ r(Te, { className: o, children: dd(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Gr = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wr.Root,
  {
    ref: n,
    className: g(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      wr.Indicator,
      {
        className: g("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Gr.displayName = wr.Root.displayName;
const ud = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(si, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(ii, { className: "tw-h-4 tw-w-4" });
}, zn = (t, e, n) => /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ p(
    kt,
    {
      className: g("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        ud(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(vt, { side: "bottom", children: e })
] }) }), Su = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => zn(e, t)
}), md = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => zn(n, t)
}), Du = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => zn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Qn = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), o(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, Iu = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => zn(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p(jr, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Qn(
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
          children: /* @__PURE__ */ r(ri, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Qn(
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
          children: /* @__PURE__ */ r(oi, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (c) => {
            c.stopPropagation(), Qn(
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
          children: /* @__PURE__ */ r(ai, {})
        }
      )
    ] });
  }
}), Mu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ou = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Au = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, fd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Pu = Object.freeze([
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
  const a = eo(o.key) ? o.key : o.key[0];
  return {
    items: eo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || fd(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ht = (t, e) => t[e] ?? e;
function Lu({
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
  classNameForVerseText: u,
  onItemSelected: m
}) {
  const f = Ht(n, "%webView_inventory_all%"), h = Ht(n, "%webView_inventory_approved%"), v = Ht(n, "%webView_inventory_unapproved%"), b = Ht(n, "%webView_inventory_unknown%"), y = Ht(n, "%webView_inventory_scope_currentBook%"), N = Ht(n, "%webView_inventory_scope_chapter%"), _ = Ht(n, "%webView_inventory_scope_verse%"), k = Ht(n, "%webView_inventory_filter_text%"), V = Ht(
    n,
    "%webView_inventory_show_additional_items%"
  ), j = Ht(n, "%webView_inventory_no_results%"), [O, R] = I(!1), [E, T] = I("all"), [$, C] = I(""), [D, A] = I([]), W = z(() => {
    const H = t ?? [];
    return H.length === 0 ? [] : gd(H, a, i);
  }, [t, a, i]), P = z(() => {
    if (O) return W;
    const H = [];
    return W.forEach((wt) => {
      const dt = wt.items[0], ut = H.find(
        (Tt) => Tt.items[0] === dt
      );
      ut ? (ut.count += wt.count, ut.occurrences = ut.occurrences.concat(wt.occurrences)) : H.push({
        items: [dt],
        count: wt.count,
        occurrences: wt.occurrences,
        status: wt.status
      });
    }), H;
  }, [O, W]), tt = z(() => P.length === 0 ? [] : hd(P, E, $), [P, E, $]), Et = z(() => {
    var dt, ut;
    if (!O) return c;
    const H = (dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt.length;
    if (!H) return c;
    const wt = [];
    for (let Tt = 0; Tt < H; Tt++)
      wt.push(
        md(
          ((ut = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ut[Tt]) || "Additional Item",
          Tt + 1
        )
      );
    return [...wt, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, O]);
  q(() => {
    tt.length === 0 ? A([]) : tt.length === 1 && A(tt[0].items);
  }, [tt]);
  const B = (H, wt) => {
    wt.setRowSelection(() => {
      const ut = {};
      return ut[H.index] = !0, ut;
    });
    const dt = H.original.items;
    A(dt), m && dt.length > 0 && m(dt[0]);
  }, st = (H) => {
    if (H === "book" || H === "chapter" || H === "verse")
      l(H);
    else
      throw new Error(`Invalid scope value: ${H}`);
  }, J = (H) => {
    if (H === "all" || H === "approved" || H === "unapproved" || H === "unknown")
      T(H);
    else
      throw new Error(`Invalid status filter value: ${H}`);
  }, Z = z(() => {
    if (P.length === 0 || D.length === 0) return [];
    const H = P.filter((wt) => Ci(
      O ? wt.items : [wt.items[0]],
      D
    ));
    if (H.length > 1) throw new Error("Selected item is not unique");
    return H.length === 0 ? [] : H[0].occurrences;
  }, [D, O, P]);
  return /* @__PURE__ */ r("div", { id: w, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Fe,
        {
          onValueChange: (H) => J(H),
          defaultValue: E,
          children: [
            /* @__PURE__ */ r(De, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(ze, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Ie, { children: [
              /* @__PURE__ */ r(Pt, { value: "all", children: f }),
              /* @__PURE__ */ r(Pt, { value: "approved", children: h }),
              /* @__PURE__ */ r(Pt, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(Pt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Fe, { onValueChange: (H) => st(H), defaultValue: s, children: [
        /* @__PURE__ */ r(De, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(ze, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Ie, { children: [
          /* @__PURE__ */ r(Pt, { value: "book", children: y }),
          /* @__PURE__ */ r(Pt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Pt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Je,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: k,
          value: $,
          onChange: (H) => {
            C(H.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
        /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Gr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: O,
              onCheckedChange: (H) => {
                R(H);
              }
            }
          ),
          /* @__PURE__ */ r(yt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? V })
        ] }) }),
        /* @__PURE__ */ r(vt, { children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      zw,
      {
        columns: Et,
        data: tt,
        onRowClickHandler: B,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: j
      }
    ) }),
    Z.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      pd,
      {
        classNameForText: u,
        occurrenceData: Z,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const bd = "16rem", vd = "3rem", es = x.createContext(void 0);
function Bn() {
  const t = x.useContext(es);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ns = x.forwardRef(
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
    const [w, d] = x.useState(t), u = e ?? w, m = x.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(u) : _;
        n ? n(k) : d(k);
      },
      [n, u]
    ), f = x.useCallback(() => m((_) => !_), [m]), h = u ? "expanded" : "collapsed", y = gt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = x.useMemo(
      () => ({
        state: h,
        open: u,
        setOpen: m,
        toggleSidebar: f,
        side: y
      }),
      [h, u, m, f, y]
    );
    return /* @__PURE__ */ r(es.Provider, { value: N, children: /* @__PURE__ */ r(bt, { delayDuration: 0, children: /* @__PURE__ */ r(
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
        className: g(
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
ns.displayName = "SidebarProvider";
const rs = x.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = Bn();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: g(
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
            className: g(
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
            className: g(
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
rs.displayName = "Sidebar";
const xd = x.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Bn();
  return /* @__PURE__ */ p(
    U,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: g("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(li, {}) : /* @__PURE__ */ r(ci, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
xd.displayName = "SidebarTrigger";
const yd = x.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Bn();
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
        className: g(
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
const os = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: g(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
os.displayName = "SidebarInset";
const Nd = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je,
  {
    ref: n,
    "data-sidebar": "input",
    className: g(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Nd.displayName = "SidebarInput";
const kd = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: g("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
kd.displayName = "SidebarHeader";
const _d = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: g("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
_d.displayName = "SidebarFooter";
const Cd = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt,
  {
    ref: n,
    "data-sidebar": "separator",
    className: g("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Cd.displayName = "SidebarSeparator";
const as = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: g(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
as.displayName = "SidebarContent";
const vr = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: g("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
vr.displayName = "SidebarGroup";
const xr = x.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ue : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: g(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
xr.displayName = "SidebarGroupLabel";
const Ed = x.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ue : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: g(
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
const yr = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: g("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
yr.displayName = "SidebarGroupContent";
const ss = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: g("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
ss.displayName = "SidebarMenu";
const is = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: g("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
is.displayName = "SidebarMenuItem";
const Td = ve(
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
), ls = x.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const c = t ? Ue : "button", { state: w } = Bn(), d = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: g(Td({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(kt, { asChild: !0, children: d }),
      /* @__PURE__ */ r(vt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : d;
  }
);
ls.displayName = "SidebarMenuButton";
const Rd = x.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ue : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: g(
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
const Sd = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: g(
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
const Dd = x.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = x.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: g("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(dn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          dn,
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
const Id = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: g(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Id.displayName = "SidebarMenuSub";
const Md = x.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Md.displayName = "SidebarMenuSubItem";
const Od = x.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ue : "a",
  {
    ref: i,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: g(
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
Od.displayName = "SidebarMenuSubButton";
function Ad({
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
    (m, f) => {
      o(m, f);
    },
    [o]
  ), d = K(
    (m) => {
      const f = n.find((h) => h.projectId === m);
      return f ? f.projectName : m;
    },
    [n]
  ), u = K(
    (m) => !a.projectId && m === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    rs,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: g("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ p(as, { children: [
        /* @__PURE__ */ p(vr, { children: [
          /* @__PURE__ */ r(xr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(yr, { children: /* @__PURE__ */ r(ss, { children: Object.entries(e).map(([m, f]) => /* @__PURE__ */ r(is, { children: /* @__PURE__ */ r(
            ls,
            {
              onClick: () => w(m),
              isActive: u(m),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ p(vr, { children: [
          /* @__PURE__ */ r(xr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(yr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            mr,
            {
              buttonVariant: "ghost",
              buttonClassName: g("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Al },
              options: n.flatMap((m) => m.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (m) => {
                const f = d(m);
                w(f, m);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(wi, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const qr = pn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = gt();
    return /* @__PURE__ */ p("div", { id: s, className: g("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Io,
        {
          className: g(
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
        U,
        {
          variant: "ghost",
          size: "icon",
          className: g(
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
qr.displayName = "SearchBar";
function $u({
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
      qr,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      ns,
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
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ r(os, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ge = "scrBook", Pd = "scrRef", ke = "source", Ld = "details", $d = "Scripture Reference", Vd = "Scripture Book", cs = "Type", jd = "Details";
function Fd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ge,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? $d,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ht.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ge ? Ce(a.start) : void 0;
      },
      getGroupingValue: (o) => ht.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => sr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ce(o.start),
      id: Pd,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ce(a.start);
      },
      sortingFn: (o, a) => sr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: ke,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? cs : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Ld,
      header: (t == null ? void 0 : t.detailsColumnName) ?? jd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const zd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || sr(t.start, t.end) === 0 ? `${Kn(t.start)}+${e}` : `${Kn(t.start)}+${e}-${Kn(t.end)}+${n}`;
}, Ro = (t) => `${zd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Vu({
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
  const [w, d] = I([]), [u, m] = I([{ id: ge, desc: !1 }]), [f, h] = I({}), v = z(
    () => t.flatMap((E) => E.data.map((T) => ({
      ...T,
      source: E.source
    }))),
    [t]
  ), b = z(
    () => Fd(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [o, i, s, n]
  );
  q(() => {
    w.includes(ke) ? m([
      { id: ke, desc: !1 },
      { id: ge, desc: !1 }
    ]) : m([{ id: ge, desc: !1 }]);
  }, [w]);
  const y = oa({
    data: v,
    columns: b,
    state: {
      grouping: w,
      sorting: u,
      rowSelection: f
    },
    onGroupingChange: d,
    onSortingChange: m,
    onRowSelectionChange: h,
    getExpandedRowModel: Tl(),
    getGroupedRowModel: El(),
    getCoreRowModel: sa(),
    getSortedRowModel: aa(),
    getRowId: Ro,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const E = y.getSelectedRowModel().rowsById, T = Object.keys(E);
      if (T.length === 1) {
        const $ = v.find((C) => Ro(C) === T[0]) || void 0;
        $ && l($);
      }
    }
  }, [f, v, l, y]);
  const N = a ?? Vd, _ = i ?? cs, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [ge] },
    { label: `Group by ${_}`, value: [ke] },
    {
      label: `Group by ${N} and ${_}`,
      value: [ge, ke]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [ke, ge]
    }
  ], V = (E) => {
    d(JSON.parse(E));
  }, j = (E, T) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(T);
  }, O = (E, T) => E.getIsGrouped() ? "" : g("banded-row", T % 2 === 0 ? "even" : "odd"), R = (E, T, $) => {
    if (!((E == null ? void 0 : E.length) === 0 || T.depth < $.column.getGroupedIndex())) {
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
      Fe,
      {
        value: JSON.stringify(w),
        onValueChange: (E) => {
          V(E);
        },
        children: [
          /* @__PURE__ */ r(De, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(ze, {}) }),
          /* @__PURE__ */ r(Ie, { position: "item-aligned", children: /* @__PURE__ */ r(Dw, { children: k.map((E) => /* @__PURE__ */ r(Pt, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Vn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(jn, { children: y.getHeaderGroups().map((E) => /* @__PURE__ */ r(ae, { children: E.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(wn, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            U,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          rn(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, E.id)) }),
      /* @__PURE__ */ r(Fn, { children: y.getRowModel().rows.map((E, T) => {
        const $ = gt();
        return /* @__PURE__ */ r(
          ae,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: g(O(E, T)),
            onClick: (C) => j(E, C),
            children: E.getVisibleCells().map((C) => {
              if (!(C.getIsPlaceholder() || C.column.columnDef.enableGrouping && !C.getIsGrouped() && (C.column.columnDef.id !== ke || !n)))
                return /* @__PURE__ */ r(
                  Te,
                  {
                    className: g(
                      C.column.columnDef.id,
                      "tw-p-[1px]",
                      R(w, E, C)
                    ),
                    children: C.getIsGrouped() ? /* @__PURE__ */ p(
                      U,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ r(Ke, {}),
                          !E.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(Ft, {}) : /* @__PURE__ */ r(or, {})),
                          " ",
                          rn(C.column.columnDef.cell, C.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : rn(C.column.columnDef.cell, C.getContext())
                  },
                  C.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
const Hr = (t, e) => t.filter((n) => {
  try {
    return nn(n) === e;
  } catch {
    return !1;
  }
}), ws = (t, e, n) => Hr(t, e).every((o) => n.includes(o));
function Bd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Hr(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    U,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: g(
        ws(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: zl(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const So = 5, tr = 6;
function Kd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: m, ntLong: f, dcLong: h, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, y] = I(!1), [N, _] = I(""), k = G(void 0), V = G(!1);
  if (t.length !== ht.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const j = z(() => ht.allBookIds.filter(
    (A, W) => t[W] === "1" && !ht.isObsolete(ht.bookIdToNumber(A))
  ), [t]), O = z(() => {
    if (!N.trim()) {
      const P = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return j.forEach((tt) => {
        const Et = nn(tt);
        P[Et].push(tt);
      }), P;
    }
    const A = j.filter(
      (P) => Ir(P, N, a)
    ), W = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return A.forEach((P) => {
      const tt = nn(P);
      W[tt].push(P);
    }), W;
  }, [j, N, a]), R = K(
    (A, W = !1) => {
      if (!W || !k.current) {
        n(
          e.includes(A) ? e.filter((J) => J !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const P = j.findIndex((J) => J === k.current), tt = j.findIndex((J) => J === A);
      if (P === -1 || tt === -1) return;
      const [Et, B] = [
        Math.min(P, tt),
        Math.max(P, tt)
      ], st = j.slice(Et, B + 1).map((J) => J);
      n(
        e.includes(A) ? e.filter((J) => !st.includes(J)) : [.../* @__PURE__ */ new Set([...e, ...st])]
      );
    },
    [e, n, j]
  ), E = (A) => {
    R(A, V.current), V.current = !1;
  }, T = (A, W) => {
    A.preventDefault(), R(W, A.shiftKey);
  }, $ = K(
    (A) => {
      const W = Hr(j, A).map((P) => P);
      n(
        ws(j, A, e) ? e.filter((P) => !W.includes(P)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, n, j]
  ), C = () => {
    n(j.map((A) => A));
  }, D = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Q).map((A) => /* @__PURE__ */ r(
      Bd,
      {
        section: A,
        availableBookIds: j,
        selectedBookIds: e,
        onToggle: $,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ p(
      me,
      {
        open: b,
        onOpenChange: (A) => {
          y(A), A || _("");
        },
        children: [
          /* @__PURE__ */ r(xe, { asChild: !0, children: /* @__PURE__ */ p(
            U,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(Lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(ee, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            pe,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (V.current = A.shiftKey);
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
                  /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: C, children: c }),
                  /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: D, children: w })
                ] }),
                /* @__PURE__ */ p(ue, { children: [
                  /* @__PURE__ */ r(un, { children: d }),
                  Object.values(Q).map((A, W) => {
                    const P = O[A];
                    if (P.length !== 0)
                      return /* @__PURE__ */ p(Do, { children: [
                        /* @__PURE__ */ r(
                          Jt,
                          {
                            heading: ma(A, m, f, h, v),
                            children: P.map((tt) => /* @__PURE__ */ r(
                              ha,
                              {
                                bookId: tt,
                                isSelected: e.includes(tt),
                                onSelect: () => E(tt),
                                onMouseDown: (Et) => T(Et, tt),
                                section: nn(tt),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ur(tt, a),
                                className: "tw-flex tw-items-center"
                              },
                              tt
                            ))
                          }
                        ),
                        W < Object.values(Q).length - 1 && /* @__PURE__ */ r(Sr, {})
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
        e.length === tr ? tr : So
      ).map((A) => /* @__PURE__ */ r(Se, { className: "hover:tw-bg-secondary", variant: "secondary", children: Le(A, a) }, A)),
      e.length > tr && /* @__PURE__ */ r(
        Se,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - So} ${u}`
        }
      )
    ] })
  ] });
}
const ju = Object.freeze([
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
]), ye = (t, e) => t[e] ?? e;
function Fu({
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
  const w = ye(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = ye(
    s,
    "%webView_scope_selector_current_verse%"
  ), u = ye(
    s,
    "%webView_scope_selector_current_chapter%"
  ), m = ye(s, "%webView_scope_selector_current_book%"), f = ye(s, "%webView_scope_selector_choose_books%"), h = ye(s, "%webView_scope_selector_scope%"), v = ye(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: m, id: "scope-book" },
    { value: "selectedBooks", label: f, id: "scope-selected" }
  ], y = e ? b.filter((N) => e.includes(N.value)) : b;
  return /* @__PURE__ */ p("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(yt, { children: h }),
      /* @__PURE__ */ r(
        Mr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(yt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(yt, { children: v }),
      /* @__PURE__ */ r(
        Kd,
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
const er = {
  [nt("undefined")]: "Ø",
  [nt(0)]: "A",
  [nt(1)]: "B",
  [nt(2)]: "C",
  [nt(3)]: "D",
  [nt(4)]: "E",
  [nt(5)]: "F",
  [nt(6)]: "G",
  [nt(7)]: "H",
  [nt(8)]: "I",
  [nt(9)]: "J",
  [nt(10)]: "K",
  [nt(11)]: "L",
  [nt(12)]: "M",
  [nt(13)]: "N",
  [nt(14)]: "O",
  [nt(15)]: "P",
  [nt(16)]: "Q",
  [nt(17)]: "R",
  [nt(18)]: "S",
  [nt(19)]: "T",
  [nt(20)]: "U",
  [nt(21)]: "V",
  [nt(22)]: "W",
  [nt(23)]: "X",
  [nt(24)]: "Y",
  [nt(25)]: "Z"
};
function zu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...er,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, d]) => [
          w,
          w === d && w in er ? er[w] : d
        ]
      )
    )
  }, c = gt();
  return /* @__PURE__ */ p(
    Fe,
    {
      value: `${e}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(De, { size: a, className: g("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          ze,
          {
            placeholder: l[nt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ie,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: He },
            children: t.map((w) => /* @__PURE__ */ r(Pt, { value: `${w}`, children: l[nt(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Bu({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Ku({
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
function Uu({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(zt, {}) : ""
  ] });
}
function ds(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function Mn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: g("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ps = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ r(kt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    In,
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
  ) : /* @__PURE__ */ p(Cw, { children: [
    /* @__PURE__ */ r(Xa, { children: l.label }),
    /* @__PURE__ */ r(_w, { children: /* @__PURE__ */ r(Wa, { children: ps(
      t,
      e,
      ds(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(vt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function Nr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(de, { variant: i, children: [
    /* @__PURE__ */ r(be, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(U, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(di, {}) }) }),
    /* @__PURE__ */ r(Qt, { align: "start", style: { zIndex: He }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p(Do, { children: [
      /* @__PURE__ */ r(Ya, { children: /* @__PURE__ */ r(bt, { children: ps(e.groups, e.items, c, t) }) }),
      w < d.length - 1 && /* @__PURE__ */ r(We, {})
    ] }, c)) })
  ] });
}
const us = x.forwardRef(
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
function Gu({
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
  return /* @__PURE__ */ p(us, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      Nr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(pi, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        Nr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ui, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function qu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(us, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    Nr,
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
const ms = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ r(
    Mt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: g("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ms.displayName = Mt.List.displayName;
const fs = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.List,
  {
    ref: n,
    className: g(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
fs.displayName = Mt.List.displayName;
const Ud = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Trigger,
  {
    ref: n,
    ...e,
    className: g(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), hs = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Content,
  {
    ref: n,
    className: g(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
hs.displayName = Mt.Content.displayName;
function Hu({
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
        qr,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(ms, { children: [
      /* @__PURE__ */ r(fs, { children: t.map((l) => /* @__PURE__ */ r(Ud, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(hs, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Gd({ ...t }) {
  return /* @__PURE__ */ r(lt.Menu, { ...t });
}
function qd({ ...t }) {
  return /* @__PURE__ */ r(lt.Sub, { "data-slot": "menubar-sub", ...t });
}
const gs = x.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = x.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Kr.Provider, { value: a, children: /* @__PURE__ */ r(
    lt.Root,
    {
      ref: o,
      className: g(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
gs.displayName = lt.Root.displayName;
const bs = x.forwardRef(({ className: t, ...e }, n) => {
  const o = Ut();
  return /* @__PURE__ */ r(
    lt.Trigger,
    {
      ref: n,
      className: g(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        fe({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
bs.displayName = lt.Trigger.displayName;
const vs = x.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Ut();
  return /* @__PURE__ */ p(
    lt.SubTrigger,
    {
      ref: a,
      className: g(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        fe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
vs.displayName = lt.SubTrigger.displayName;
const xs = x.forwardRef(({ className: t, ...e }, n) => {
  const o = Ut();
  return /* @__PURE__ */ r(
    lt.SubContent,
    {
      ref: n,
      className: g(
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
xs.displayName = lt.SubContent.displayName;
const ys = x.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = Ut();
  return /* @__PURE__ */ r(lt.Portal, { children: /* @__PURE__ */ r(
    lt.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: g(
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
ys.displayName = lt.Content.displayName;
const Ns = x.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Ut();
  return /* @__PURE__ */ r(
    lt.Item,
    {
      ref: o,
      className: g(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        fe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Ns.displayName = lt.Item.displayName;
const Hd = x.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = Ut();
  return /* @__PURE__ */ p(
    lt.CheckboxItem,
    {
      ref: a,
      className: g(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        fe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(lt.ItemIndicator, { children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Hd.displayName = lt.CheckboxItem.displayName;
const Yd = x.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ut();
  return /* @__PURE__ */ p(
    lt.RadioItem,
    {
      ref: o,
      className: g(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        fe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(lt.ItemIndicator, { children: /* @__PURE__ */ r(Pn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Yd.displayName = lt.RadioItem.displayName;
const Xd = x.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  lt.Label,
  {
    ref: o,
    className: g("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Xd.displayName = lt.Label.displayName;
const ks = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
  {
    ref: n,
    className: g("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
ks.displayName = lt.Separator.displayName;
const tn = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, _s = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(kt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        Ns,
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
      ) : /* @__PURE__ */ p(qd, { children: [
        /* @__PURE__ */ r(vs, { children: w.label }),
        /* @__PURE__ */ r(xs, { children: _s(
          t,
          e,
          ds(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(vt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ r(ks, {}, `separator-${i}`)), c;
  });
};
function Wd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = G(void 0), i = G(void 0), s = G(void 0), l = G(void 0), c = G(void 0), w = (d) => {
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
  if (Il(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, u) => {
    var h, v, b, y;
    d.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        tn(i, [m]);
        break;
      case "alt+p":
        (h = i.current) == null || h.focus(), tn(i, [m, f]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), tn(s, [m, f]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), tn(l, [m, f]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), tn(c, [m, f]);
        break;
    }
  }), q(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((f) => {
      f.forEach((h) => {
        if (h.attributeName === "data-state" && h.target instanceof HTMLElement) {
          const v = h.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((f) => {
      d.observe(f, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(gs, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, u]) => typeof d == "boolean" || typeof u == "boolean" ? 0 : d.order - u.order).map(([d, u]) => /* @__PURE__ */ p(Gd, { children: [
      /* @__PURE__ */ r(bs, { ref: w(d), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ r(
        ys,
        {
          style: { zIndex: He },
          children: /* @__PURE__ */ r(bt, { children: _s(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Yu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Xu({
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
  const d = G(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: g("tw-border tw-px-4 tw-text-foreground", o),
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
                    Wd,
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
const Jd = (t, e) => t[e] ?? e;
function Wu({
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
  const w = Jd(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, u] = I(!1), m = (h) => {
    a && a(h), o && o([h, ...n.filter((v) => v !== h)]), i && n.find((v) => v === h) && i([...n.filter((v) => v !== h)]), u(!1);
  }, f = (h, v) => {
    var y, N, _, k, V, j;
    const b = v !== h ? ((N = (y = t[h]) == null ? void 0 : y.uiNames) == null ? void 0 : N[v]) ?? ((k = (_ = t[h]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(V = t[h]) == null ? void 0 : V.autonym} (${b})` : (j = t[h]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: g("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Fe,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: m,
        open: d,
        onOpenChange: (h) => u(h),
        children: [
          /* @__PURE__ */ r(De, { children: /* @__PURE__ */ r(ze, {}) }),
          /* @__PURE__ */ r(
            Ie,
            {
              style: { zIndex: He },
              children: Object.keys(t).map((h) => /* @__PURE__ */ r(Pt, { value: h, children: f(h, e) }, h))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(yt, { className: "tw-font-normal tw-text-muted-foreground", children: _e(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((h) => f(h, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Cs({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Rr.PanelGroup,
    {
      className: g(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const On = Rr.Panel;
function Es({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Rr.PanelResizeHandle,
    {
      className: g(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(mi, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Yr({
  items: t,
  renderItem: e,
  renderDetailContent: n,
  onItemClick: o,
  selectedItemId: a,
  emptyStateMessage: i = "No items found",
  isLoading: s = !1,
  variant: l = "text",
  showSourceLanguage: c = !1,
  showTransliteration: w = !1,
  onCharacterPress: d,
  className: u
}) {
  const [m, f] = I(), h = G(null), v = a ?? m, b = z(
    () => m ? t.find((C) => C.id === m) : void 0,
    [m, t]
  ), y = z(() => t.map((C) => ({ id: C.id })), [t]), N = (C) => {
    o == null || o(C), n && f(C.id === m ? void 0 : C.id);
  }, _ = (C) => {
    const D = t.find((A) => A.id === C.id);
    D && N(D);
  }, { listboxRef: k, activeId: V, handleKeyDown: j, focusOption: O } = Br({
    options: y,
    onOptionSelect: _,
    onCharacterPress: d
  }), R = () => {
    const C = m;
    f(void 0), C && requestAnimationFrame(() => {
      var D;
      O(C), (D = k.current) == null || D.focus();
    });
  }, E = G(null);
  if (q(() => {
    if (!b) return;
    const C = E.current;
    if (!C) return;
    const D = (A) => {
      A.key === "Escape" && (A.preventDefault(), R());
    };
    return C.addEventListener("keydown", D), () => C.removeEventListener("keydown", D);
  }, [b]), s)
    return /* @__PURE__ */ r("div", { className: g("tw-flex tw-flex-col tw-gap-2 tw-p-2", u), children: Array.from({ length: 6 }, (C, D) => /* @__PURE__ */ r(
      dn,
      {
        className: g("tw-h-12 tw-w-full tw-rounded", {
          "tw-h-20": l === "thumbnail"
        })
      },
      D
    )) });
  if (t.length === 0)
    return /* @__PURE__ */ r(
      "div",
      {
        className: g(
          "tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-sm tw-text-muted-foreground",
          u
        ),
        children: i
      }
    );
  const T = /* @__PURE__ */ r(
    "ul",
    {
      role: "listbox",
      tabIndex: 0,
      ref: k,
      "aria-activedescendant": V ?? void 0,
      className: "tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
      onKeyDown: j,
      children: t.map((C) => {
        const D = v === C.id;
        return /* @__PURE__ */ r(
          "li",
          {
            id: C.id,
            role: "option",
            "aria-selected": D,
            tabIndex: -1,
            onClick: () => N(C),
            onKeyDown: (A) => {
              (A.key === "Enter" || A.key === " ") && (A.preventDefault(), N(C));
            },
            className: g(
              "tw-flex tw-cursor-pointer tw-items-center tw-gap-3 tw-p-2 tw-outline-none",
              {
                "tw-bg-muted": D,
                "hover:tw-bg-muted": !D
              }
            ),
            children: e ? e(C) : /* @__PURE__ */ r(
              Zd,
              {
                item: C,
                variant: l,
                showSourceLanguage: c,
                showTransliteration: w
              }
            )
          },
          C.id
        );
      })
    }
  ), $ = n && b ? n(b, R) : void 0;
  return /* @__PURE__ */ r("div", { ref: h, className: g("tw-relative tw-flex tw-h-full tw-overflow-hidden", u), children: $ ? (
    // Side-by-side ResizablePanelGroup split per PR #2209 stories pattern: list at ~33% with
    // a draggable handle, detail at ~67%. The detail is a sibling of the list (not an overlay)
    // so all controls outside the SLI remain interactive while the detail is open.
    /* @__PURE__ */ p(Cs, { direction: "horizontal", className: "tw-h-full tw-w-full", children: [
      /* @__PURE__ */ r(On, { defaultSize: 33.3333, minSize: 20, children: /* @__PURE__ */ r("div", { className: "tw-h-full tw-overflow-y-auto", children: T }) }),
      /* @__PURE__ */ r(Es, {}),
      /* @__PURE__ */ r(On, { defaultSize: 66.6667, minSize: 30, children: /* @__PURE__ */ r(
        "div",
        {
          ref: E,
          role: "region",
          "aria-label": "Selected item details",
          className: "tw-h-full tw-overflow-y-auto tw-bg-background tw-p-4",
          children: $
        }
      ) })
    ] })
  ) : /* @__PURE__ */ r("div", { className: "tw-h-full tw-w-full tw-overflow-y-auto", children: T }) });
}
function Zd({
  item: t,
  variant: e,
  showSourceLanguage: n,
  showTransliteration: o
}) {
  return /* @__PURE__ */ p(at, { children: [
    e === "thumbnail" && t.thumbnailUrl && /* @__PURE__ */ r(
      "img",
      {
        src: t.thumbnailUrl,
        alt: t.thumbnailAlt ?? t.primaryText,
        className: "tw-h-14 tw-w-14 tw-shrink-0 tw-rounded tw-object-cover"
      }
    ),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-items-baseline tw-gap-4 tw-overflow-hidden", children: [
      /* @__PURE__ */ r("span", { className: "tw-shrink-0 tw-truncate tw-text-sm", children: t.primaryText }),
      n && t.sourceLanguageText && /* @__PURE__ */ p("span", { className: "tw-truncate tw-text-sm tw-text-muted-foreground", children: [
        t.sourceLanguageText,
        o && t.transliteration && /* @__PURE__ */ p("span", { className: "tw-ml-1", children: [
          "(",
          t.transliteration,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r(zt, { className: "tw-absolute tw-bottom-0 tw-left-0 tw-right-0" })
  ] });
}
const Ju = [
  "%sourceLanguageIndexedList_emptyState%",
  "%sourceLanguageIndexedList_loading%",
  "%sourceLanguageIndexedList_occurrenceCount%",
  "%sourceLanguageIndexedList_strongsCode%",
  "%sourceLanguageIndexedList_filterByDomain%",
  "%sourceLanguageIndexedList_navigationModeTree%",
  "%sourceLanguageIndexedList_navigationModeDropdown%",
  "%sourceLanguageIndexedList_backToList%"
];
function Zu({
  getDescription: t,
  getBadges: e,
  getOccurrenceCount: n,
  showSourceLanguage: o = !0,
  showTransliteration: a = !0,
  ...i
}) {
  return /* @__PURE__ */ r(
    Yr,
    {
      ...i,
      showSourceLanguage: o,
      showTransliteration: a,
      renderItem: (s) => /* @__PURE__ */ r(
        Qd,
        {
          item: s,
          showSourceLanguage: o,
          showTransliteration: a,
          description: t == null ? void 0 : t(s),
          badges: e == null ? void 0 : e(s),
          occurrenceCount: n == null ? void 0 : n(s)
        }
      )
    }
  );
}
function Qd({
  item: t,
  showSourceLanguage: e,
  showTransliteration: n,
  description: o,
  badges: a,
  occurrenceCount: i
}) {
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-0.5", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: t.primaryText }),
      e && t.sourceLanguageText && /* @__PURE__ */ p("span", { className: "tw-text-sm tw-text-muted-foreground", children: [
        t.sourceLanguageText,
        n && t.transliteration && /* @__PURE__ */ p("span", { className: "tw-ml-1", children: [
          "(",
          t.transliteration,
          ")"
        ] })
      ] }),
      i !== void 0 && /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
        /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r("span", { className: "tw-ml-1 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs", children: i }) }),
        /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: "Occurrences" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2 tw-overflow-hidden", children: [
      o && /* @__PURE__ */ r("p", { className: "tw-truncate tw-text-sm tw-text-muted-foreground", children: o }),
      a == null ? void 0 : a.map((s) => /* @__PURE__ */ r(
        "span",
        {
          className: g("tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs"),
          children: s
        },
        s
      ))
    ] }),
    /* @__PURE__ */ r(zt, { className: "tw-mt-1" })
  ] });
}
const tp = 100, ep = 150;
function Qu({
  items: t,
  renderItem: e,
  renderDetailContent: n,
  onItemClick: o,
  selectedItemId: a,
  emptyStateMessage: i,
  isLoading: s,
  domainPath: l,
  allDomains: c,
  onDomainChange: w,
  onClose: d,
  className: u
}) {
  const [m, f] = I(a), [h, v] = I(-1), b = G(null), y = G(null), [N, _] = I(!1), [k, V] = I(0);
  q(() => {
    const B = b.current;
    if (!B) return;
    const st = new ResizeObserver(([J]) => {
      const Z = (J == null ? void 0 : J.contentRect.width) ?? 0;
      V(Z), _(Z < 350);
    });
    return st.observe(B), () => st.disconnect();
  }, []);
  const j = k > 0 ? tp / k * 100 : 20, O = k > 0 ? ep / k * 100 : 30;
  q(() => {
    var B;
    (B = y.current) == null || B.focus();
  }, []);
  const R = K(
    (B) => {
      w(B), f(void 0);
    },
    [w]
  ), E = t.find((B) => B.id === m), T = E && !N, $ = E && N, C = K(
    (B) => {
      o == null || o(B), f(B.id === m ? void 0 : B.id);
    },
    [o, m]
  ), D = K(
    (B) => {
      if (t.length === 0) return;
      const st = m ? t.findIndex((Z) => Z.id === m) : -1, J = h >= 0 ? h : st;
      if (B.key === "ArrowDown") {
        B.preventDefault();
        const Z = J < 0 ? 0 : Math.min(J + 1, t.length - 1);
        if (Z === h) return;
        v(Z), N || C(t[Z]);
      } else if (B.key === "ArrowUp") {
        B.preventDefault();
        const Z = J < 0 ? t.length - 1 : Math.max(J - 1, 0);
        if (Z === h) return;
        v(Z), N || C(t[Z]);
      } else (B.key === "Enter" || B.key === " ") && N && h >= 0 && (B.preventDefault(), C(t[h]));
    },
    [t, h, N, C, m]
  ), A = K(() => {
    const B = m;
    if (f(void 0), B) {
      const st = t.findIndex((J) => J.id === B);
      st >= 0 && v(st), requestAnimationFrame(() => {
        var J;
        (J = y.current) == null || J.focus();
      });
    }
  }, [t, m]);
  q(() => {
    if (h < 0 || !y.current) return;
    const B = y.current.children[h];
    B instanceof HTMLElement && B.scrollIntoView({ block: "nearest" });
  }, [h]);
  const W = G(null);
  q(() => {
    var st;
    if (!N || !m) return;
    const B = (st = W.current) == null ? void 0 : st.querySelector("[data-back-to-list]");
    B == null || B.focus();
  }, [N, m]);
  const P = !!T;
  q(() => {
    var B;
    P && ((B = y.current) == null || B.focus());
  }, [P]);
  const Et = s ? /* @__PURE__ */ r("div", { className: "tw-p-4 tw-text-sm tw-text-muted-foreground", children: "Loading..." }) : t.length === 0 ? /* @__PURE__ */ r("div", { className: "tw-p-4 tw-text-sm tw-text-muted-foreground", children: i ?? "No items found" }) : /* @__PURE__ */ r(
    "ul",
    {
      ref: y,
      role: "listbox",
      tabIndex: 0,
      className: "tw-p-0.5 tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-inset focus-visible:tw-ring-ring",
      onKeyDown: D,
      children: t.map((B, st) => {
        const J = m === B.id;
        return (
          // Keyboard activation is handled at the parent <ul role="listbox">
          // via handleListKeyDown (Arrow/Enter/Space). Each <li role="option">
          // is selected by listbox semantics, not its own keydown handler.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          /* @__PURE__ */ r(
            "li",
            {
              role: "option",
              "aria-selected": J,
              onClick: () => {
                v(-1), C(B);
              },
              className: g("tw-cursor-pointer tw-border-b tw-p-2", {
                "tw-bg-muted": J,
                "hover:tw-bg-muted": !J,
                "tw-ring-1 tw-ring-inset tw-ring-ring": h === st && !J
              }),
              children: e ? e(B) : /* @__PURE__ */ r("span", { className: "tw-text-sm", children: B.primaryText })
            },
            B.id
          )
        );
      })
    }
  );
  return /* @__PURE__ */ p("div", { className: g("tw-flex tw-h-full tw-flex-col tw-overflow-hidden", u), children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-px-2 tw-py-1.5", children: [
      /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: /* @__PURE__ */ r(
        rp,
        {
          path: l,
          allDomains: c,
          onDomainSelect: R
        }
      ) }),
      d && /* @__PURE__ */ p(U, { variant: "ghost", size: "sm", className: "tw-shrink-0 tw-gap-1", onClick: d, children: [
        /* @__PURE__ */ r(_r, { className: "tw-h-4 tw-w-4" }),
        "Back"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { ref: b, className: "tw-relative tw-flex tw-flex-1 tw-overflow-hidden", children: np({
      showSideBySide: !!T,
      showFullDetail: !!$,
      listElement: Et,
      detailElement: E && n ? n(E, A) : void 0,
      listMinPct: j,
      detailMinPct: O,
      detailPanelRef: W
    }) })
  ] });
}
function np({
  showSideBySide: t,
  showFullDetail: e,
  listElement: n,
  detailElement: o,
  listMinPct: a,
  detailMinPct: i,
  detailPanelRef: s
}) {
  return t && o !== void 0 ? /* @__PURE__ */ p(Cs, { direction: "horizontal", children: [
    /* @__PURE__ */ r(On, { defaultSize: 33.3333, minSize: a, children: /* @__PURE__ */ r("div", { className: "tw-h-full tw-overflow-y-auto", children: n }) }),
    /* @__PURE__ */ r(Es, {}),
    /* @__PURE__ */ r(On, { defaultSize: 66.6667, minSize: i, children: /* @__PURE__ */ r("div", { className: "tw-h-full tw-overflow-y-auto tw-bg-background tw-p-4", children: o }) })
  ] }) : e && o !== void 0 ? /* @__PURE__ */ r(
    "div",
    {
      ref: s,
      className: "tw-h-full tw-w-full tw-overflow-y-auto tw-bg-background tw-p-4",
      children: o
    }
  ) : /* @__PURE__ */ r("div", { className: "tw-h-full tw-w-full tw-overflow-y-auto", children: n });
}
function rp({
  path: t,
  allDomains: e,
  onDomainSelect: n
}) {
  var f, h, v;
  const o = G(null), a = G(null), [i, s] = I(0);
  q(() => {
    const b = o.current, y = a.current;
    if (!b || !y) return;
    const N = () => {
      const k = b.clientWidth, V = Array.from(y.children).filter(
        (T) => T instanceof HTMLElement
      );
      if (V.length === 0) return;
      if (V.reduce((T, $) => T + $.offsetWidth, 0) <= k - 4) {
        s(0);
        return;
      }
      const O = V.map((T) => T.offsetWidth), R = t.length, E = 44;
      for (let T = 1; T < R; T += 1) {
        let $ = E;
        if (T < R - 1) {
          $ += O[0] ?? 0;
          for (let C = T + 1; C < R; C += 1) $ += O[C] ?? 0;
        } else
          $ += O[R - 1] ?? 0;
        if ($ <= k - 4) {
          s(T);
          return;
        }
      }
      s(R - 1);
    }, _ = new ResizeObserver(N);
    return _.observe(b), N(), () => _.disconnect();
  }, [t]);
  const l = i > 0, c = i >= t.length - 1, d = l ? c ? t.slice(0, -1) : t.slice(1, i + 1) : [], u = d.map((b) => b.label).join(" > "), m = ((f = d[0]) == null ? void 0 : f.id) ?? ((h = t[0]) == null ? void 0 : h.id);
  return /* @__PURE__ */ p("div", { ref: o, className: "tw-overflow-hidden", children: [
    /* @__PURE__ */ r(
      "div",
      {
        ref: a,
        className: "tw-pointer-events-none tw-invisible tw-absolute tw-flex tw-items-center tw-gap-0.5 tw-whitespace-nowrap",
        "aria-hidden": !0,
        children: t.map((b, y) => /* @__PURE__ */ p("span", { className: "tw-flex tw-shrink-0 tw-items-center tw-gap-0.5", children: [
          y > 0 && /* @__PURE__ */ r(Ft, { className: "tw-h-3 tw-w-3" }),
          /* @__PURE__ */ r("span", { className: "tw-px-1.5 tw-py-1 tw-text-sm", children: b.label })
        ] }, b.id))
      }
    ),
    /* @__PURE__ */ p("div", { className: "tw-inline-flex tw-items-center tw-gap-0.5", children: [
      !c && t[0] && /* @__PURE__ */ r(
        nr,
        {
          label: t[0].label,
          isLast: t.length === 1,
          allDomains: e,
          currentPath: t,
          expandToId: t[0].id,
          onDomainSelect: n
        }
      ),
      l && /* @__PURE__ */ p(at, { children: [
        !c && /* @__PURE__ */ r(Ft, { className: "tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" }),
        /* @__PURE__ */ r(bt, { delayDuration: 0, children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r("span", { children: /* @__PURE__ */ r(
            nr,
            {
              label: /* @__PURE__ */ r(Oo, { className: "tw-h-3 tw-w-3" }),
              isLast: !1,
              allDomains: e,
              currentPath: t,
              expandToId: m ?? ((v = t[0]) == null ? void 0 : v.id) ?? "",
              onDomainSelect: n,
              isEllipsis: !0
            }
          ) }) }),
          /* @__PURE__ */ r(vt, { side: "bottom", children: /* @__PURE__ */ r("p", { className: "tw-text-xs", children: u }) })
        ] }) })
      ] }),
      t.map((b, y) => {
        if (y === 0) return;
        const N = y === t.length - 1;
        if (!(y <= i && !N))
          return /* @__PURE__ */ p("span", { className: "tw-flex tw-shrink-0 tw-items-center tw-gap-0.5", children: [
            /* @__PURE__ */ r(Ft, { className: "tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" }),
            /* @__PURE__ */ r(
              nr,
              {
                label: b.label,
                isLast: N,
                allDomains: e,
                currentPath: t,
                expandToId: b.id,
                onDomainSelect: n
              }
            )
          ] }, b.id);
      })
    ] })
  ] });
}
function nr({
  label: t,
  isLast: e,
  allDomains: n,
  currentPath: o,
  expandToId: a,
  onDomainSelect: i,
  isEllipsis: s = !1
}) {
  const [l, c] = I(!1), w = K(
    (d) => {
      i(d), c(!1);
    },
    [i]
  );
  return /* @__PURE__ */ p(de, { open: l, onOpenChange: c, modal: !0, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: g(
          "tw-shrink-0 tw-cursor-pointer tw-rounded tw-text-sm hover:tw-bg-muted",
          s ? "tw-flex tw-items-center tw-px-1 tw-py-1" : "tw-px-1.5 tw-py-1",
          e && !s && "tw-font-bold"
        ),
        children: t
      }
    ) }),
    /* @__PURE__ */ r(
      Qt,
      {
        align: "start",
        className: "tw-max-h-[500px] tw-w-[300px] tw-overflow-y-auto tw-p-1",
        style: { zIndex: la + 10 },
        onEscapeKeyDown: (d) => {
          d.stopPropagation(), d.preventDefault(), c(!1);
        },
        onKeyDown: (d) => {
          d.key === "Escape" && d.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          op,
          {
            domains: n,
            currentPath: o,
            expandToId: a,
            onSelect: w,
            onClose: () => c(!1)
          }
        )
      }
    )
  ] });
}
function op({
  domains: t,
  currentPath: e,
  expandToId: n,
  onSelect: o,
  onClose: a
}) {
  const i = G(null), s = G(null);
  q(() => {
    const d = requestAnimationFrame(() => {
      var u;
      (u = s.current) == null || u.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(d);
  }, [n]);
  const l = () => i.current ? Array.from(i.current.querySelectorAll("button")) : [], c = (d) => {
    const u = l();
    if (u.length === 0) return;
    const m = document.activeElement;
    let h = (m instanceof HTMLButtonElement ? u.indexOf(m) : -1) + d;
    h < 0 && (h = u.length - 1), h >= u.length && (h = 0), u[h].focus();
  };
  return (
    // Custom keyboard nav handler attached for arrow/Tab/Escape; element wraps
    // a tree of buttons that retain individual focusability.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ r("div", { ref: i, onKeyDown: (d) => {
      switch (d.key) {
        case "ArrowDown":
          d.preventDefault(), d.stopPropagation(), d.nativeEvent.stopImmediatePropagation(), c(1);
          break;
        case "ArrowUp":
          d.preventDefault(), d.stopPropagation(), d.nativeEvent.stopImmediatePropagation(), c(-1);
          break;
        case "Tab":
          d.preventDefault(), d.stopPropagation(), d.nativeEvent.stopImmediatePropagation(), c(d.shiftKey ? -1 : 1);
          break;
        case "Escape":
          d.preventDefault(), d.stopPropagation(), d.nativeEvent.stopImmediatePropagation(), a();
          break;
      }
    }, children: /* @__PURE__ */ r(
      Rs,
      {
        domains: t,
        currentPath: e,
        expandToId: n,
        onSelect: o,
        parentPath: [],
        scrollRef: s
      }
    ) })
  );
}
function Ts(t, e) {
  var n;
  return t.id === e ? !0 : ((n = t.children) == null ? void 0 : n.some((o) => Ts(o, e))) ?? !1;
}
function Rs({
  domains: t,
  currentPath: e,
  expandToId: n,
  onSelect: o,
  parentPath: a,
  scrollRef: i
}) {
  const s = a.length;
  return /* @__PURE__ */ r("ul", { className: g("tw-space-y-0.5", { "tw-ml-3": a.length > 0 }), children: t.map((l) => {
    const c = [...a, l], w = l.id === n, d = l.children && l.children.length > 0, m = Ts(l, n) && l.id !== n, f = l.id === n;
    return /* @__PURE__ */ r(
      ap,
      {
        domain: l,
        thisPath: c,
        depth: s,
        isSelected: w,
        hasChildren: d ?? !1,
        defaultExpanded: m,
        currentPath: e,
        expandToId: n,
        onSelect: o,
        scrollRef: i,
        isScrollTarget: f
      },
      l.id
    );
  }) });
}
function ap({
  domain: t,
  thisPath: e,
  depth: n,
  isSelected: o,
  hasChildren: a,
  defaultExpanded: i,
  currentPath: s,
  expandToId: l,
  onSelect: c,
  scrollRef: w,
  isScrollTarget: d
}) {
  const [u, m] = I(i);
  return q(() => {
    i && m(!0);
  }, [i]), /* @__PURE__ */ p("li", { children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-0.5", children: n === 0 && a ? (
      // Combined chevron + label button. Clicking ONLY expands/collapses; it does not
      // call onSelect. This avoids the bug where clicking a top-level domain selected
      // it (and the parent path collapsed because the new path was rooted elsewhere).
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          ref: d ? w : void 0,
          className: g(
            "tw-flex tw-flex-1 tw-items-center tw-gap-0.5 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring",
            o ? "tw-bg-accent tw-font-medium" : "hover:tw-bg-muted"
          ),
          "aria-expanded": u,
          onClick: () => m(!u),
          children: [
            /* @__PURE__ */ r(
              Ft,
              {
                className: g("tw-h-3 tw-w-3 tw-shrink-0 tw-transition-transform", {
                  "tw-rotate-90": u
                })
              }
            ),
            /* @__PURE__ */ r("span", { children: t.label })
          ]
        }
      )
    ) : /* @__PURE__ */ p(at, { children: [
      a ? /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          className: "tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded hover:tw-bg-muted focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring",
          "aria-expanded": u,
          "aria-label": u ? "Collapse" : "Expand",
          onClick: () => m(!u),
          children: /* @__PURE__ */ r(
            Ft,
            {
              className: g("tw-h-3 tw-w-3 tw-transition-transform", {
                "tw-rotate-90": u
              })
            }
          )
        }
      ) : /* @__PURE__ */ r("span", { className: "tw-w-5 tw-shrink-0" }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          ref: d ? w : void 0,
          className: g(
            "tw-flex-1 tw-rounded tw-px-1.5 tw-py-0.5 tw-text-left tw-text-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring",
            o ? "tw-bg-accent tw-font-medium" : "hover:tw-bg-muted hover:tw-underline"
          ),
          onClick: () => c(e),
          children: t.label
        }
      )
    ] }) }),
    u && t.children && t.children.length > 0 && /* @__PURE__ */ r(
      Rs,
      {
        domains: t.children,
        currentPath: s,
        expandToId: l,
        onSelect: c,
        parentPath: e,
        scrollRef: w
      }
    )
  ] });
}
function tm({
  showSourceLanguage: t = !0,
  showTransliteration: e = !0,
  ...n
}) {
  return /* @__PURE__ */ r(
    Yr,
    {
      ...n,
      showSourceLanguage: t,
      showTransliteration: e,
      renderItem: (o) => /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-0.5", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
          /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: o.primaryText }),
          t && o.sourceLanguageText && /* @__PURE__ */ p("span", { className: "tw-text-sm tw-text-muted-foreground", children: [
            o.sourceLanguageText,
            e && o.transliteration && /* @__PURE__ */ p("span", { className: "tw-ml-1", children: [
              "(",
              o.transliteration,
              ")"
            ] })
          ] })
        ] }),
        o.teaserText && /* @__PURE__ */ r("p", { className: "tw-line-clamp-2 tw-text-xs tw-text-muted-foreground", children: o.teaserText }),
        /* @__PURE__ */ r(zt, { className: "tw-mt-1" })
      ] })
    }
  );
}
function em({
  showSourceLanguage: t = !0,
  showTransliteration: e = !1,
  ...n
}) {
  return /* @__PURE__ */ r(
    Yr,
    {
      ...n,
      variant: "thumbnail",
      showSourceLanguage: t,
      showTransliteration: e,
      renderItem: (o) => /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-items-center tw-gap-3", children: [
        o.thumbnailUrl && /* @__PURE__ */ r(
          "img",
          {
            src: o.thumbnailUrl,
            alt: o.thumbnailAlt ?? o.primaryText,
            className: "tw-h-14 tw-w-14 tw-shrink-0 tw-rounded tw-object-cover"
          }
        ),
        !o.thumbnailUrl && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-14 tw-w-14 tw-shrink-0 tw-items-center tw-justify-center tw-rounded tw-bg-muted", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-muted-foreground", children: o.mediaType === "map" ? "Map" : "Img" }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-0.5 tw-overflow-hidden", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
            /* @__PURE__ */ r("span", { className: "tw-truncate tw-text-sm tw-font-medium", children: o.primaryText }),
            /* @__PURE__ */ r(Se, { variant: "outline", className: "tw-shrink-0 tw-text-xs", children: o.mediaType })
          ] }),
          t && o.sourceLanguageText && /* @__PURE__ */ p("span", { className: "tw-truncate tw-text-xs tw-text-muted-foreground", children: [
            o.sourceLanguageText,
            e && o.transliteration && /* @__PURE__ */ p("span", { className: "tw-ml-1", children: [
              "(",
              o.transliteration,
              ")"
            ] })
          ] }),
          o.caption && /* @__PURE__ */ r("p", { className: "tw-truncate tw-text-xs tw-text-muted-foreground", children: o.caption })
        ] }),
        /* @__PURE__ */ r(zt, { className: "tw-absolute tw-bottom-0 tw-left-0 tw-right-0" })
      ] })
    }
  );
}
function nm({
  items: t,
  onItemClick: e,
  selectedItemId: n,
  emptyStateMessage: o = "No entries found",
  isLoading: a = !1,
  onCharacterPress: i,
  className: s,
  occurrenceCountLabel: l = "Occurrences",
  strongsCodeLabel: c = "Strong's code"
}) {
  const w = z(() => t.map((h) => ({ id: h.id })), [t]), d = (h) => {
    const v = t.find((b) => b.id === h.id);
    v && (e == null || e(v));
  }, { listboxRef: u, activeId: m, handleKeyDown: f } = Br({
    options: w,
    onOptionSelect: d,
    onCharacterPress: i
  });
  return a ? /* @__PURE__ */ r("div", { className: g("tw-flex tw-flex-col tw-gap-2 tw-p-2", s), children: Array.from({ length: 6 }, (h, v) => /* @__PURE__ */ r(
    dn,
    {
      className: "tw-h-12 tw-w-full tw-rounded"
    },
    v
  )) }) : t.length === 0 ? /* @__PURE__ */ r(
    "div",
    {
      className: g(
        "tw-flex tw-items-center tw-justify-center tw-p-8 tw-text-sm tw-text-muted-foreground",
        s
      ),
      children: o
    }
  ) : /* @__PURE__ */ r("div", { className: g("tw-overflow-y-auto tw-px-2 tw-py-2", s), children: /* @__PURE__ */ r(
    "ul",
    {
      role: "listbox",
      tabIndex: 0,
      ref: u,
      "aria-activedescendant": m ?? void 0,
      className: "tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
      onKeyDown: f,
      children: t.map((h) => {
        const v = n === h.id;
        return /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ p(
            "li",
            {
              role: "option",
              "aria-selected": v,
              id: h.id,
              onClick: () => e == null ? void 0 : e(h),
              className: g(
                "tw-flex tw-flex-col tw-p-2 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
                {
                  "tw-bg-muted": v,
                  "hover:tw-bg-muted": !v
                }
              ),
              tabIndex: -1,
              children: [
                /* @__PURE__ */ p("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
                  /* @__PURE__ */ r("span", { className: "scripture-font tw-text-sm", children: h.primaryText }),
                  /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
                    /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r("span", { className: "tw-ml-1 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs", children: h.occurrenceCount }) }),
                    /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: l }) })
                  ] }) })
                ] }),
                /* @__PURE__ */ p("div", { className: "tw-mt-0.5 tw-flex tw-items-center tw-gap-2 tw-overflow-hidden", children: [
                  /* @__PURE__ */ r("p", { className: "tw-truncate tw-text-sm tw-text-muted-foreground", children: h.glosses }),
                  h.strongsCodes.map((b) => /* @__PURE__ */ r(bt, { children: /* @__PURE__ */ p(Nt, { children: [
                    /* @__PURE__ */ r(kt, { asChild: !0, children: /* @__PURE__ */ r("span", { className: "tw-ml-1 tw-shrink-0 tw-cursor-help tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs", children: b }) }),
                    /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r("p", { children: c }) })
                  ] }) }, b))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r(zt, {})
        ] }, h.id);
      })
    }
  ) });
}
function sp({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(yt, { children: e(t) }) : n ? /* @__PURE__ */ r(yt, { children: n(t) }) : /* @__PURE__ */ r(yt, { children: t });
}
function rm({
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
      Gr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      sp,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function om({
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
  accentColor: u,
  showDropdownOnHover: m = !1
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: g(
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
            !e && m && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(de, { children: [
              /* @__PURE__ */ r(be, { className: g(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(U, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(to, {}) }) }),
              /* @__PURE__ */ r(Qt, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ p(de, { children: [
              /* @__PURE__ */ r(be, { className: g(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(U, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(to, {}) }) }),
              /* @__PURE__ */ r(Qt, { align: "end", children: w })
            ] })
          ] }),
          d && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: d })
        ] }),
        u && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`
          }
        )
      ]
    },
    t
  );
}
const ip = pn(({ className: t, ...e }, n) => /* @__PURE__ */ r(fi, { size: 35, className: g("tw-animate-spin", t), ...e, ref: n }));
ip.displayName = "Spinner";
function am({
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
  onChange: u,
  onFocus: m,
  onBlur: f
}) {
  return /* @__PURE__ */ p("div", { className: g("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      yt,
      {
        htmlFor: t,
        className: g({
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
        className: g(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: d,
        onChange: u,
        onFocus: m,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: g({ "tw-hidden": !a }), children: a })
  ] });
}
const lp = ve(
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
), cp = x.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: g(
      // CUSTOM
      "pr-twp",
      lp({ variant: e }),
      t
    ),
    ...n
  }
));
cp.displayName = "Alert";
const wp = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ p(
    "h5",
    {
      ref: n,
      className: g("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
wp.displayName = "AlertTitle";
const dp = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: g("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
dp.displayName = "AlertDescription";
const sm = ct.Root, im = ct.Trigger, lm = ct.Group, cm = ct.Portal, wm = ct.Sub, dm = ct.RadioGroup, pp = x.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  ct.SubTrigger,
  {
    ref: a,
    className: g(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
pp.displayName = ct.SubTrigger.displayName;
const up = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.SubContent,
  {
    ref: n,
    className: g(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
up.displayName = ct.SubContent.displayName;
const mp = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ct.Portal, { children: /* @__PURE__ */ r(
  ct.Content,
  {
    ref: n,
    className: g(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
mp.displayName = ct.Content.displayName;
const fp = x.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ct.Item,
  {
    ref: o,
    className: g(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
fp.displayName = ct.Item.displayName;
const hp = x.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  ct.CheckboxItem,
  {
    ref: a,
    className: g(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ct.ItemIndicator, { children: /* @__PURE__ */ r(Bt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
hp.displayName = ct.CheckboxItem.displayName;
const gp = x.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  ct.RadioItem,
  {
    ref: o,
    className: g(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ct.ItemIndicator, { children: /* @__PURE__ */ r(Pn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
gp.displayName = ct.RadioItem.displayName;
const bp = x.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ct.Label,
  {
    ref: o,
    className: g(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
bp.displayName = ct.Label.displayName;
const vp = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Separator,
  {
    ref: n,
    className: g("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
vp.displayName = ct.Separator.displayName;
function xp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: g("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
xp.displayName = "ContextMenuShortcut";
const Ss = x.createContext({
  direction: "bottom"
});
function yp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = x.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Ss.Provider, { value: o, children: /* @__PURE__ */ r(
    Kt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
yp.displayName = "Drawer";
const pm = Kt.Trigger, Np = Kt.Portal, um = Kt.Close, Ds = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Overlay,
  {
    ref: n,
    className: g("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Ds.displayName = Kt.Overlay.displayName;
const kp = x.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, container: o, ...a }, i) => {
  const { direction: s = "bottom" } = x.useContext(Ss), l = o ? "tw-absolute" : "tw-fixed", c = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"
  }, w = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ p(Np, { container: o, children: [
    !o && /* @__PURE__ */ r(Ds, {}),
    /* @__PURE__ */ p(
      Kt.Content,
      {
        ref: i,
        className: g(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          l,
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          c[s],
          t
        ),
        ...a,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: w[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: w[s] })
        ]
      }
    )
  ] });
});
kp.displayName = "DrawerContent";
function _p({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: g("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
_p.displayName = "DrawerHeader";
function Cp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: g("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Cp.displayName = "DrawerFooter";
const Ep = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Title,
  {
    ref: n,
    className: g("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ep.displayName = Kt.Title.displayName;
const Tp = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Description,
  {
    ref: n,
    className: g("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Tp.displayName = Kt.Description.displayName;
const Rp = x.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  dr.Root,
  {
    ref: o,
    className: g(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      dr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Rp.displayName = dr.Root.displayName;
function mm({ ...t }) {
  return /* @__PURE__ */ r(
    Ml,
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
const Sp = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ p(
    en.Root,
    {
      ref: n,
      className: g(
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
Sp.displayName = en.Root.displayName;
const Dp = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ r(
    pr.Root,
    {
      className: g(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        pr.Thumb,
        {
          className: g(
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
Dp.displayName = pr.Root.displayName;
const fm = Mt.Root, Ip = x.forwardRef(({ className: t, ...e }, n) => {
  const o = gt();
  return /* @__PURE__ */ r(
    Mt.List,
    {
      ref: n,
      className: g(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
Ip.displayName = Mt.List.displayName;
const Mp = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Trigger,
  {
    ref: n,
    className: g(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Mp.displayName = Mt.Trigger.displayName;
const Op = x.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt.Content,
  {
    ref: n,
    className: g(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Op.displayName = Mt.Content.displayName;
const Ap = x.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: g(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Ap.displayName = "Textarea";
const hm = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Pp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Lp = (t, e, n = {}) => {
  const o = G(e);
  o.current = e;
  const a = G(n);
  a.current = Pp(a.current);
  const [i, s] = I(() => o.current), [l, c] = I(!0);
  return q(() => {
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
}, rr = () => !1, gm = (t, e) => {
  const [n] = Lp(
    K(async () => {
      if (!t) return rr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    rr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== rr && n();
  }, [n]);
};
function bm(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function $p(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
$p(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
*, ::before, ::after {
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
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-3 {
  margin-left: 0.75rem;
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
.tw-mt-0\\.5 {
  margin-top: 0.125rem;
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
.tw-line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
.tw-max-h-\\[500px\\] {
  max-height: 500px;
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
.tw-w-14 {
  width: 3.5rem;
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
.tw-rotate-90 {
  --tw-rotate: 90deg;
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
.tw-cursor-help {
  cursor: help;
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
.tw-gap-0\\.5 {
  gap: 0.125rem;
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
.tw-space-y-0\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.125rem * var(--tw-space-y-reverse));
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
.tw-object-cover {
  object-fit: cover;
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
.tw-px-1\\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
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
.tw-ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-inset {
  --tw-ring-inset: inset;
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-ring {
  --tw-ring-color: hsl(var(--ring));
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
.focus\\:tw-ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
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
.focus-visible\\:tw-ring-inset:focus-visible {
  --tw-ring-inset: inset;
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
  cp as Alert,
  dp as AlertDescription,
  wp as AlertTitle,
  qa as Avatar,
  Ha as AvatarFallback,
  kw as AvatarImage,
  pu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  uu as BOOK_SELECTOR_STRING_KEYS,
  Se as Badge,
  du as BookChapterControl,
  fr as BookSelectionMode,
  mu as BookSelector,
  U as Button,
  hu as COMMENT_EDITOR_STRING_KEYS,
  gu as COMMENT_LIST_STRING_KEYS,
  Ua as Card,
  Ga as CardContent,
  yw as CardDescription,
  Nw as CardFooter,
  vw as CardHeader,
  xw as CardTitle,
  Xl as ChapterRangeSelector,
  Gr as Checkbox,
  rm as Checklist,
  mr as ComboBox,
  pe as Command,
  un as CommandEmpty,
  Jt as CommandGroup,
  Ye as CommandInput,
  te as CommandItem,
  ue as CommandList,
  fu as CommentEditor,
  bu as CommentList,
  sm as ContextMenu,
  hp as ContextMenuCheckboxItem,
  mp as ContextMenuContent,
  lm as ContextMenuGroup,
  fp as ContextMenuItem,
  bp as ContextMenuLabel,
  cm as ContextMenuPortal,
  dm as ContextMenuRadioGroup,
  gp as ContextMenuRadioItem,
  vp as ContextMenuSeparator,
  xp as ContextMenuShortcut,
  wm as ContextMenuSub,
  up as ContextMenuSubContent,
  pp as ContextMenuSubTrigger,
  im as ContextMenuTrigger,
  zw as DataTable,
  $l as Dialog,
  cu as DialogClose,
  wa as DialogContent,
  Fl as DialogDescription,
  jl as DialogFooter,
  da as DialogHeader,
  ca as DialogOverlay,
  Vl as DialogPortal,
  pa as DialogTitle,
  lu as DialogTrigger,
  yp as Drawer,
  um as DrawerClose,
  kp as DrawerContent,
  Tp as DrawerDescription,
  Cp as DrawerFooter,
  _p as DrawerHeader,
  Ds as DrawerOverlay,
  Np as DrawerPortal,
  Ep as DrawerTitle,
  pm as DrawerTrigger,
  de as DropdownMenu,
  le as DropdownMenuCheckboxItem,
  Qt as DropdownMenuContent,
  Ya as DropdownMenuGroup,
  In as DropdownMenuItem,
  Uw as DropdownMenuItemType,
  mn as DropdownMenuLabel,
  _w as DropdownMenuPortal,
  Ew as DropdownMenuRadioGroup,
  Ja as DropdownMenuRadioItem,
  We as DropdownMenuSeparator,
  Tw as DropdownMenuShortcut,
  Cw as DropdownMenuSub,
  Wa as DropdownMenuSubContent,
  Xa as DropdownMenuSubTrigger,
  be as DropdownMenuTrigger,
  Bw as ERROR_DUMP_STRING_KEYS,
  xu as ERROR_POPOVER_STRING_KEYS,
  Xw as EditorKeyboardShortcuts,
  Qu as ErDictionaryFilteredList,
  Zu as ErDictionaryList,
  tm as ErEncyclopediaList,
  em as ErMediaList,
  Kw as ErrorDump,
  yu as ErrorPopover,
  Tu as FOOTNOTE_EDITOR_STRING_KEYS,
  Cu as Filter,
  Nu as FilterDropdown,
  _u as Footer,
  Eu as FootnoteEditor,
  wd as FootnoteItem,
  Ru as FootnoteList,
  Pu as INVENTORY_STRING_KEYS,
  Je as Input,
  Lu as Inventory,
  yt as Label,
  nm as LexicalDictionaryList,
  ed as MARKER_MENU_STRING_KEYS,
  vu as MarkdownRenderer,
  rd as MarkerMenu,
  ku as MoreInfo,
  qw as MultiSelectComboBox,
  Hu as NavigationContentSearch,
  me as Popover,
  Bl as PopoverAnchor,
  ee as PopoverContent,
  xe as PopoverTrigger,
  Rp as Progress,
  Mr as RadioGroup,
  Cn as RadioGroupItem,
  Kl as RecentSearches,
  Es as ResizableHandle,
  On as ResizablePanel,
  Cs as ResizablePanelGroup,
  om as ResultsCard,
  ju as SCOPE_SELECTOR_STRING_KEYS,
  Ju as SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS,
  Fu as ScopeSelector,
  Vu as ScriptureResultsViewer,
  zu as ScrollGroupSelector,
  qr as SearchBar,
  Fe as Select,
  Ie as SelectContent,
  Dw as SelectGroup,
  Pt as SelectItem,
  Mw as SelectLabel,
  Qa as SelectScrollDownButton,
  Za as SelectScrollUpButton,
  Ow as SelectSeparator,
  De as SelectTrigger,
  ze as SelectValue,
  zt as Separator,
  Bu as SettingsList,
  Uu as SettingsListHeader,
  Ku as SettingsListItem,
  Ad as SettingsSidebar,
  $u as SettingsSidebarContentSearch,
  rs as Sidebar,
  as as SidebarContent,
  _d as SidebarFooter,
  vr as SidebarGroup,
  Ed as SidebarGroupAction,
  yr as SidebarGroupContent,
  xr as SidebarGroupLabel,
  kd as SidebarHeader,
  Nd as SidebarInput,
  os as SidebarInset,
  ss as SidebarMenu,
  Rd as SidebarMenuAction,
  Sd as SidebarMenuBadge,
  ls as SidebarMenuButton,
  is as SidebarMenuItem,
  Dd as SidebarMenuSkeleton,
  Id as SidebarMenuSub,
  Od as SidebarMenuSubButton,
  Md as SidebarMenuSubItem,
  ns as SidebarProvider,
  yd as SidebarRail,
  Cd as SidebarSeparator,
  xd as SidebarTrigger,
  dn as Skeleton,
  Sp as Slider,
  mm as Sonner,
  Yr as SourceLanguageIndexedList,
  ip as Spinner,
  Dp as Switch,
  Nr as TabDropdownMenu,
  qu as TabFloatingMenu,
  Gu as TabToolbar,
  Vn as Table,
  Fn as TableBody,
  Fw as TableCaption,
  Te as TableCell,
  Lw as TableFooter,
  wn as TableHead,
  jn as TableHeader,
  ae as TableRow,
  fm as Tabs,
  Op as TabsContent,
  Ip as TabsList,
  Mp as TabsTrigger,
  am as TextField,
  Ap as Textarea,
  jr as ToggleGroup,
  an as ToggleGroupItem,
  Xu as Toolbar,
  Nt as Tooltip,
  vt as TooltipContent,
  bt as TooltipProvider,
  kt as TooltipTrigger,
  Hw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Wu as UiLanguageSelector,
  Yw as UndoRedoButtons,
  ms as VerticalTabs,
  hs as VerticalTabsContent,
  fs as VerticalTabsList,
  Ud as VerticalTabsTrigger,
  He as Z_INDEX_ABOVE_DOCK,
  ia as Z_INDEX_FOOTNOTE_EDITOR,
  la as Z_INDEX_MODAL,
  Pl as Z_INDEX_MODAL_BACKDROP,
  Al as Z_INDEX_OVERLAY,
  bw as badgeVariants,
  ga as buttonVariants,
  g as cn,
  Au as getBookIdFromUSFM,
  zn as getInventoryHeader,
  Mu as getLinesFromUSFM,
  Ou as getNumberFromUSFM,
  fd as getStatusForItem,
  Yu as getToolbarOSReservedSpaceClassName,
  Du as inventoryCountColumn,
  Su as inventoryItemColumn,
  Iu as inventoryStatusColumn,
  Iw as selectTriggerVariants,
  ym as sonner,
  hm as useEvent,
  gm as useEventAsync,
  Br as useListbox,
  Lp as usePromise,
  wu as useRecentSearches,
  Bn as useSidebar,
  bm as useStylesheet
};
//# sourceMappingURL=index.js.map
