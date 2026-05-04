var bs = Object.defineProperty;
var vs = (t, e, n) => e in t ? bs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var xt = (t, e, n) => vs(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as ct } from "react/jsx-runtime";
import b, { forwardRef as dn, useRef as q, useMemo as F, useState as S, useCallback as B, useLayoutEffect as Lt, createContext as Dn, useContext as yr, useEffect as H, Component as xs, createElement as Kr, Suspense as ys, Fragment as yo } from "react";
import { Command as Tt } from "cmdk";
import { X as Ke, Search as No, Check as zt, Clock as Ur, ChevronsLeft as Gr, ChevronsRight as qr, ChevronLeft as er, ChevronRight as $e, ArrowLeft as Ns, ArrowRight as ks, Circle as Mn, ChevronDown as Ue, BoldIcon as _s, ItalicIcon as Cs, AtSign as ko, Pencil as Es, Trash2 as Ts, ArrowUp as _o, MoreHorizontal as Rs, MailOpen as Ss, Mail as Ds, ChevronUp as Co, FilterIcon as Ms, ArrowLeftIcon as Is, ChevronLeftIcon as Os, ChevronRightIcon as As, ArrowRightIcon as Ps, Copy as Eo, Filter as $s, User as Ls, Link as Vs, CircleHelp as js, ChevronsUpDown as To, Star as zs, Undo as Fs, Redo as Bs, SquareX as Ro, FunctionSquare as So, SquareSigma as Do, Ban as Ks, AlertCircle as nr, CircleCheckIcon as Us, CircleXIcon as Gs, CircleHelpIcon as qs, ArrowUpIcon as Hs, ArrowDownIcon as Ys, PanelLeft as Xs, PanelRight as Ws, ScrollText as Js, MenuIcon as Zs, Menu as Qs, EllipsisVertical as ti, MoreVertical as Hr, LoaderCircle as ei, GripVertical as ni } from "lucide-react";
import { clsx as ri } from "clsx";
import { extendTailwindMerge as oi } from "tailwind-merge";
import * as It from "@radix-ui/react-dialog";
import { Canon as pt } from "@sillsdev/scripture";
import { includes as fn, Section as X, getChaptersForBook as ai, formatScrRef as _e, getSectionForBook as en, formatRelativeDate as si, formatReplacementString as ke, sanitizeHtml as ii, NumberFormat as li, formatBytes as wi, getCurrentLocale as ci, usfmMarkers as xn, getFormatCallerFunction as di, deepEqual as pi, isString as Yr, compareScrRefs as rr, scrRefToBBBCCCVVV as Fn, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as Ge } from "@radix-ui/react-slot";
import { cva as ge } from "class-variance-authority";
import * as Le from "@radix-ui/react-popover";
import * as Mo from "@radix-ui/react-label";
import * as sn from "@radix-ui/react-radio-group";
import { createEditor as Io, $getRoot as ue, $createParagraphNode as In, $getSelection as jt, HISTORY_MERGE_TAG as Nr, ParagraphNode as Oo, TextNode as Ao, $isTokenOrSegmented as ui, $getCharacterOffsets as mi, $cloneWithPropertiesEphemeral as fi, $findMatchingParent as Po, $isElementNode as de, $isRangeSelection as Te, CLEAR_EDITOR_COMMAND as $o, COMMAND_PRIORITY_EDITOR as Lo, mergeRegister as me, shallowMergeConfig as hi, defineExtension as Ht, safeCast as pn, createState as gi, FORMAT_TEXT_COMMAND as Vo, $isNodeSelection as jo, COMMAND_PRIORITY_LOW as zo, RootNode as bi, LineBreakNode as vi, TabNode as xi, $isEditorState as yi, createCommand as Ni, CLICK_COMMAND as ki, isDOMNode as _i, $getNodeFromDOMNode as Ci, $createNodeSelection as Ei, $setSelection as Ti, DecoratorNode as or, $getState as Ri, toggleTextFormatType as Xr, TEXT_TYPE_TO_FORMAT as Si, $setState as Di, addClassNamesToElement as Fo, $create as Mi, $getNodeByKey as Ii, removeClassNamesFromElement as Oi, KEY_TAB_COMMAND as Ai, $isBlockElementNode as kn, $createRangeSelection as Pi, $normalizeSelection__EXPERIMENTAL as $i, OUTDENT_CONTENT_COMMAND as Li, INDENT_CONTENT_COMMAND as Wr, INSERT_TAB_COMMAND as Vi, COMMAND_PRIORITY_CRITICAL as kr, $isDecoratorNode as ji, $isParagraphNode as zi, $isTextNode as _n, SELECTION_CHANGE_COMMAND as Bo, getRegisteredNode as Fi, isHTMLElement as Bi, isDocumentFragment as Jr, isDOMDocumentNode as Ki, ArtificialNode__DO_NOT_USE as Ko, $createLineBreakNode as Uo, $isRootOrShadowRoot as Ui, isBlockDomNode as Zr, isInlineDomNode as Qr, $insertNodes as Gi } from "lexical";
import * as Re from "@radix-ui/react-tooltip";
import { TooltipTrigger as qi } from "@radix-ui/react-tooltip";
import { HeadingNode as Hi, QuoteNode as Yi, registerRichText as Xi } from "@lexical/rich-text";
import { flushSync as Wi, createPortal as Ji } from "react-dom";
import { $isTableSelection as Zi } from "@lexical/table";
import * as On from "@radix-ui/react-toggle-group";
import * as Go from "@radix-ui/react-toggle";
import { createHeadlessEditor as qo } from "@lexical/headless";
import * as Ho from "@radix-ui/react-separator";
import * as qe from "@radix-ui/react-avatar";
import * as ot from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Qi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Yo, getFilteredRowModel as tl, getSortedRowModel as Xo, getPaginationRowModel as el, getCoreRowModel as Wo, flexRender as nn, getGroupedRowModel as nl, getExpandedRowModel as rl } from "@tanstack/react-table";
import * as dt from "@radix-ui/react-select";
import ol from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as ar, HIDDEN_NOTE_CALLER as sr, getDefaultViewOptions as al, isInsertEmbedOpOfType as hn, Editorial as sl } from "@eten-tech-foundation/platform-editor";
import * as ir from "@radix-ui/react-checkbox";
import * as Rt from "@radix-ui/react-tabs";
import * as at from "@radix-ui/react-menubar";
import { useHotkeys as il } from "react-hotkeys-hook";
import * as st from "@radix-ui/react-context-menu";
import { Drawer as Ft } from "vaul";
import * as lr from "@radix-ui/react-progress";
import * as _r from "react-resizable-panels";
import { Toaster as ll } from "sonner";
import { toast as Ou } from "sonner";
import * as tn from "@radix-ui/react-slider";
import * as wr from "@radix-ui/react-switch";
const wl = oi({ prefix: "tw-" });
function f(...t) {
  return wl(ri(t));
}
const He = 250, Jo = 300, cl = 400, dl = 450, pl = 500, ul = "layoutDirection";
function ut() {
  const t = localStorage.getItem(ul);
  return t === "rtl" ? t : "ltr";
}
const ml = It.Root, kp = It.Trigger, fl = It.Portal, _p = It.Close, Zo = b.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  It.Overlay,
  {
    ref: o,
    className: f(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: dl, ...e },
    ...n
  }
));
Zo.displayName = It.Overlay.displayName;
const Qo = b.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, s) => {
  const i = ut();
  return /* @__PURE__ */ p(fl, { children: [
    /* @__PURE__ */ r(Zo, { className: n }),
    /* @__PURE__ */ p(
      It.Content,
      {
        ref: s,
        className: f(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: pl, ...o },
        ...a,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ p(
            It.Close,
            {
              className: f(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": i === "ltr" },
                { "tw-left-4": i === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Qo.displayName = It.Content.displayName;
function ta({ className: t, ...e }) {
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
ta.displayName = "DialogHeader";
function hl({ className: t, ...e }) {
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
hl.displayName = "DialogFooter";
const ea = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ea.displayName = It.Title.displayName;
const gl = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
gl.displayName = It.Description.displayName;
const ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt,
  {
    ref: n,
    className: f(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ne.displayName = Tt.displayName;
const Ye = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(No, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Tt.Input,
      {
        ref: n,
        className: f(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
Ye.displayName = Tt.Input.displayName;
const re = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.List,
  {
    ref: n,
    className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
re.displayName = Tt.List.displayName;
const un = b.forwardRef((t, e) => /* @__PURE__ */ r(Tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
un.displayName = Tt.Empty.displayName;
const qt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Group,
  {
    ref: n,
    className: f(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
qt.displayName = Tt.Group.displayName;
const Cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Cr.displayName = Tt.Separator.displayName;
const Yt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Item,
  {
    ref: n,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Yt.displayName = Tt.Item.displayName;
function na({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
na.displayName = "CommandShortcut";
const ra = (t, e, n, o, a) => {
  switch (t) {
    case X.OT:
      return e ?? "Old Testament";
    case X.NT:
      return n ?? "New Testament";
    case X.DC:
      return o ?? "Deuterocanon";
    case X.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, bl = (t, e, n, o, a) => {
  switch (t) {
    case X.OT:
      return e ?? "OT";
    case X.NT:
      return n ?? "NT";
    case X.DC:
      return o ?? "DC";
    case X.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Pe(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? pt.bookIdToEnglishName(t);
}
function Er(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const oa = pt.allBookIds.filter(
  (t) => !pt.isObsolete(pt.bookIdToNumber(t))
), Ce = Object.fromEntries(
  oa.map((t) => [t, pt.bookIdToEnglishName(t)])
);
function Tr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = pt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(fn(a.toLowerCase(), o) || fn(t.toLowerCase(), o) || (s ? fn(s.localizedName.toLowerCase(), o) || fn(s.localizedId.toLowerCase(), o) : !1));
}
const aa = dn(
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
    const d = q(!1), m = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, h = (y) => {
      d.current = !0, o ? o(y) : n == null || n(t);
    }, u = F(
      () => Pe(t, l),
      [t, l]
    ), g = F(
      () => Er(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === X.OT,
            "tw-border-s-purple-200": a === X.NT,
            "tw-border-s-indigo-200": a === X.DC,
            "tw-border-s-amber-200": a === X.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          Yt,
          {
            ref: c,
            value: w || `${t} ${pt.bookIdToEnglishName(t)}`,
            onSelect: m,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${pt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
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
), sa = ge(
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
), j = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Ge : "button", { className: f(sa({ variant: e, size: n, className: t })), ref: s, ...a })
);
j.displayName = "Button";
const oe = Le.Root, be = Le.Trigger, vl = Le.Anchor, Xt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = ut();
  return /* @__PURE__ */ r(Le.Portal, { children: /* @__PURE__ */ r(
    Le.Content,
    {
      ref: s,
      align: e,
      sideOffset: n,
      className: f(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: He, ...o },
      ...a,
      dir: i
    }
  ) });
});
Xt.displayName = Le.Content.displayName;
function cr(t, e, n) {
  return `${t} ${Ce[t]}${e ? ` ${Er(t, e)} ${Pe(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function xl({
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
  const [d, m] = S(!1);
  if (t.length === 0)
    return;
  const h = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(oe, { open: d, onOpenChange: m, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(
      j,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ r(Ur, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Xt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r(qt, { heading: s, children: t.map((u) => /* @__PURE__ */ p(
      Yt,
      {
        onSelect: () => h(u),
        className: f("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Ur, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function Cp(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Bn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, yl = [
  Bn.BOOK_ONLY,
  Bn.BOOK_CHAPTER,
  Bn.BOOK_CHAPTER_VERSE
];
function to(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Gt(t) {
  return ai(pt.bookIdToNumber(t));
}
function Nl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = yl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, w = void 0, c = void 0] = i.slice(1);
        let d;
        const m = e.filter((h) => Tr(h, l, n));
        if (m.length === 1 && ([d] = m), !d && w) {
          if (pt.isBookIdValid(l)) {
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
          const u = ((g) => Object.keys(Ce).find(
            (y) => Ce[y].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let h = w ? parseInt(w, 10) : void 0;
          h && h > Gt(d) && (h = Math.max(Gt(d), 1));
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
function kl(t, e, n, o) {
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
        const c = e[w - 1], d = Math.max(Gt(c), 1);
        o({
          book: c,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = B(() => {
    const w = Gt(t.book);
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
  }, [t, e, o]), i = B(() => {
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
  return F(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Gr : qr
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? er : $e
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? $e : er
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === Gt(t.book) || Gt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? qr : Gr
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
function eo({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(qt, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Gt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      Yt,
      {
        value: `${t} ${Ce[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: f(
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
function Ep({
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
  const c = ut(), [d, m] = S(!1), [h, u] = S(""), [g, y] = S(""), [x, R] = S("books"), [v, _] = S(void 0), [C, z] = S(!1), V = q(void 0), $ = q(void 0), T = q(void 0), D = q(void 0), E = q({}), P = B(
    (I) => {
      e(I), l && l(I);
    },
    [e, l]
  ), O = F(() => o ? o() : oa, [o]), Y = F(() => ({
    [X.OT]: O.filter((k) => pt.isBookOT(k)),
    [X.NT]: O.filter((k) => pt.isBookNT(k)),
    [X.DC]: O.filter((k) => pt.isBookDC(k)),
    [X.Extra]: O.filter((k) => pt.extraBooks().includes(k))
  }), [O]), L = F(() => Object.values(Y).flat(), [Y]), J = F(() => {
    if (!g.trim()) return Y;
    const I = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return [X.OT, X.NT, X.DC, X.Extra].forEach((A) => {
      I[A] = Y[A].filter((W) => Tr(W, g, a));
    }), I;
  }, [Y, g, a]), N = F(
    () => Nl(g, L, a),
    [g, L, a]
  ), U = B(() => {
    N && (P({
      book: N.book,
      chapterNum: N.chapterNum ?? 1,
      verseNum: N.verseNum ?? 1
    }), m(!1), y(""), u(""));
  }, [P, N]), mt = B(
    (I) => {
      if (Gt(I) <= 1) {
        P({
          book: I,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), y("");
        return;
      }
      _(I), R("chapters");
    },
    [P]
  ), bt = B(
    (I) => {
      const k = x === "chapters" ? v : N == null ? void 0 : N.book;
      k && (P({
        book: k,
        chapterNum: I,
        verseNum: 1
      }), m(!1), R("books"), _(void 0), y(""));
    },
    [P, x, v, N]
  ), St = B(
    (I) => {
      P(I), m(!1), y("");
    },
    [P]
  ), ht = kl(t, L, c, e), _t = B(() => {
    R("books"), _(void 0), setTimeout(() => {
      $.current && $.current.focus();
    }, 0);
  }, []), K = B(
    (I) => {
      if (!I && x === "chapters") {
        _t();
        return;
      }
      m(I), I && (R("books"), _(void 0), y(""));
    },
    [x, _t]
  ), { otLong: wt, ntLong: Z, dcLong: ft, extraLong: vt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, se = B(
    (I) => ra(I, wt, Z, ft, vt),
    [wt, Z, ft, vt]
  ), ie = B(
    (I) => N ? !!N.chapterNum && !I.toString().includes(N.chapterNum.toString()) : !1,
    [N]
  ), Ie = F(
    () => _e(
      t,
      a ? Pe(t.book, a) : "English"
    ),
    [t, a]
  ), le = B((I) => (k) => {
    E.current[I] = k;
  }, []), Dt = B((I) => {
    (I.key === "Home" || I.key === "End") && I.stopPropagation();
  }, []), Vt = B(
    (I) => {
      if (I.ctrlKey) return;
      const { isLetter: k, isDigit: A } = to(I.key);
      if (x === "chapters") {
        if (I.key === "Backspace") {
          I.preventDefault(), I.stopPropagation(), _t();
          return;
        }
        if (k || A) {
          if (I.preventDefault(), I.stopPropagation(), R("books"), _(void 0), A && v) {
            const W = Ce[v];
            y(`${W} ${I.key}`);
          } else
            y(I.key);
          setTimeout(() => {
            $.current && $.current.focus();
          }, 0);
          return;
        }
      }
      if ((x === "chapters" || x === "books" && N) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(I.key)) {
        const W = x === "chapters" ? v : N == null ? void 0 : N.book;
        if (!W) return;
        const G = (() => {
          if (!h) return 1;
          const lt = h.match(/(\d+)$/);
          return lt ? parseInt(lt[1], 10) : 0;
        })(), it = Gt(W);
        if (!it) return;
        let et = G;
        const rt = 6;
        switch (I.key) {
          case "ArrowLeft":
            G !== 0 && (et = G > 1 ? G - 1 : it);
            break;
          case "ArrowRight":
            G !== 0 && (et = G < it ? G + 1 : 1);
            break;
          case "ArrowUp":
            et = G === 0 ? it : Math.max(1, G - rt);
            break;
          case "ArrowDown":
            et = G === 0 ? 1 : Math.min(it, G + rt);
            break;
          default:
            return;
        }
        et !== G && (I.preventDefault(), I.stopPropagation(), u(cr(W, a, et)), setTimeout(() => {
          const lt = E.current[et];
          lt && lt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      N,
      _t,
      v,
      h,
      a
    ]
  ), Jt = B((I) => {
    if (I.shiftKey || I.key === "Tab" || I.key === " ") return;
    const { isLetter: k, isDigit: A } = to(I.key);
    (k || A) && (I.preventDefault(), y((W) => W + I.key), $.current.focus(), z(!1));
  }, []);
  return Lt(() => {
    const I = setTimeout(() => {
      if (d && x === "books" && T.current && D.current) {
        const k = T.current, A = D.current, W = A.offsetTop, G = k.clientHeight, it = A.clientHeight, et = W - G / 2 + it / 2;
        k.scrollTo({
          top: Math.max(0, et),
          behavior: "smooth"
        }), u(cr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(I);
    };
  }, [d, x, g, N, t.book]), Lt(() => {
    if (x === "chapters" && v) {
      const I = v === t.book;
      setTimeout(() => {
        if (T.current)
          if (I) {
            const k = E.current[t.chapterNum];
            k && k.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            T.current.scrollTo({ top: 0 });
        V.current && V.current.focus();
      }, 0);
    }
  }, [x, v, N, t.book, t.chapterNum]), /* @__PURE__ */ p(oe, { open: d, onOpenChange: K, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(
      j,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: f(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Ie })
      }
    ) }),
    /* @__PURE__ */ r(Xt, { id: w, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      ne,
      {
        ref: V,
        onKeyDown: Vt,
        loop: !0,
        value: h,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          x === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ye,
                {
                  ref: $,
                  value: g,
                  onValueChange: y,
                  onKeyDown: Dt,
                  onFocus: () => z(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                xl,
                {
                  recentSearches: i,
                  onSearchItemSelect: St,
                  renderItem: (I) => _e(I, "English"),
                  getItemKey: (I) => `${I.book}-${I.chapterNum}-${I.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: ht.map(({ onClick: I, disabled: k, title: A, icon: W }) => /* @__PURE__ */ r(
              j,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  z(!0), I();
                },
                disabled: k,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: A,
                onKeyDown: Jt,
                children: /* @__PURE__ */ r(W, {})
              },
              A
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              j,
              {
                variant: "ghost",
                size: "sm",
                onClick: _t,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(Ns, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(ks, { className: "tw-h-4 tw-w-4" })
              }
            ),
            v && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Pe(v, a) })
          ] }),
          !C && /* @__PURE__ */ p(re, { ref: T, children: [
            x === "books" && /* @__PURE__ */ p(ct, { children: [
              !N && Object.entries(J).map(([I, k]) => {
                if (k.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(qt, { heading: se(I), children: k.map((A) => /* @__PURE__ */ r(
                      aa,
                      {
                        bookId: A,
                        onSelect: (W) => mt(W),
                        section: en(A),
                        commandValue: `${A} ${Ce[A]}`,
                        ref: A === t.book ? D : void 0,
                        localizedBookNames: a
                      },
                      A
                    )) }, I)
                  );
              }),
              N && /* @__PURE__ */ r(qt, { children: /* @__PURE__ */ r(
                Yt,
                {
                  value: `${N.book} ${Ce[N.book]} ${N.chapterNum || ""}:${N.verseNum || ""})}`,
                  onSelect: U,
                  className: "tw-font-semibold tw-text-primary",
                  children: _e(
                    {
                      book: N.book,
                      chapterNum: N.chapterNum ?? 1,
                      verseNum: N.verseNum ?? 1
                    },
                    a ? Er(N.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              N && Gt(N.book) > 1 && /* @__PURE__ */ p(ct, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Pe(N.book, a) }),
                /* @__PURE__ */ r(
                  eo,
                  {
                    bookId: N.book,
                    scrRef: t,
                    onChapterSelect: bt,
                    setChapterRef: le,
                    isChapterDimmed: ie,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            x === "chapters" && v && /* @__PURE__ */ r(
              eo,
              {
                bookId: v,
                scrRef: t,
                onChapterSelect: bt,
                setChapterRef: le,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Tp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), _l = ge(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), gt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Mo.Root, { ref: n, className: f("pr-twp", _l(), t), ...e }));
gt.displayName = Mo.Root.displayName;
const Rr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ r(
    sn.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Rr.displayName = sn.Root.displayName;
const Cn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  sn.Item,
  {
    ref: n,
    className: f(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(sn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Mn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Cn.displayName = sn.Item.displayName;
function Cl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function dr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: w = Cl,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: h = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: y = "start",
  isDisabled: x = !1,
  ariaLabel: R,
  ...v
}) {
  const [_, C] = S(!1), z = c ?? w, V = (T) => T.length > 0 && typeof T[0] == "object" && "options" in T[0], $ = (T, D) => {
    const E = w(T), P = typeof T == "object" && "secondaryLabel" in T ? T.secondaryLabel : void 0, O = `${D ?? ""}${E}${P ?? ""}`;
    return /* @__PURE__ */ p(
      Yt,
      {
        value: E,
        onSelect: () => {
          l(T), C(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            zt,
            {
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || w(i) !== E
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            P && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              P
            ] })
          ] })
        ]
      },
      O
    );
  };
  return /* @__PURE__ */ p(oe, { open: _, onOpenChange: C, ...v, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ p(
      j,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": R,
        id: t,
        className: f(
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
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? z(i) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(Ue, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Xt,
      {
        align: y,
        className: f("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ p(ne, { children: [
          /* @__PURE__ */ r(Ye, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(un, { children: u }),
          /* @__PURE__ */ r(re, { children: V(e) ? e.map((T) => /* @__PURE__ */ r(qt, { heading: T.groupHeading, children: T.options.map((D) => $(D, T.groupHeading)) }, T.groupHeading)) : e.map((T) => $(T)) })
        ] })
      }
    )
  ] });
}
function El({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = F(
    () => Array.from({ length: s }, (c, d) => d + 1),
    [s]
  );
  return /* @__PURE__ */ p(ct, { children: [
    /* @__PURE__ */ r(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      dr,
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
    /* @__PURE__ */ r(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      dr,
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
var pr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(pr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(pr || (pr = {}));
const Rp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Kn = (t, e) => t[e] ?? e;
function Sp({
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
  const d = Kn(c, "%webView_bookSelector_currentBook%"), m = Kn(c, "%webView_bookSelector_choose%"), h = Kn(c, "%webView_bookSelector_chooseBooks%"), [u, g] = S(
    "current book"
    /* CurrentBook */
  ), y = (x) => {
    g(x), t(x);
  };
  return /* @__PURE__ */ r(
    Rr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => y(x),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(gt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(gt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            El,
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
            /* @__PURE__ */ r(Cn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(gt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(gt, { className: "tw-flex tw-items-center", children: o.map((x) => pt.bookIdToEnglishName(x)).join(", ") }),
          /* @__PURE__ */ r(
            j,
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
const ia = Dn(null);
function Tl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Wt() {
  const t = yr(ia);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const la = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Rl = la ? Lt : H, gn = { tag: Nr };
function Sl({ initialConfig: t, children: e }) {
  const n = F(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: w } = t, c = Tl(null, o), d = Io({ editable: t.editable, html: w, namespace: a, nodes: s, onError: (m) => i(m, d), theme: o });
    return function(m, h) {
      if (h !== null) {
        if (h === void 0) m.update(() => {
          const u = ue();
          if (u.isEmpty()) {
            const g = In();
            u.append(g);
            const y = la ? document.activeElement : null;
            (jt() !== null || y !== null && y === m.getRootElement()) && g.select();
          }
        }, gn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = m.parseEditorState(h);
            m.setEditorState(u, gn);
            break;
          }
          case "object":
            m.setEditorState(h, gn);
            break;
          case "function":
            m.update(() => {
              ue().isEmpty() && h(m);
            }, gn);
        }
      }
    }(d, l), [d, c];
  }, []);
  return Rl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ia.Provider, { value: n, children: e });
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : H;
function Ml({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Wt();
  return Dl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: w }) => {
      e && s.size === 0 && i.size === 0 || t && w.has(Nr) || l.isEmpty() || n(a, o, w);
    });
  }, [o, t, e, n]), null;
}
const Sr = {
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
}, Nt = Re.Provider, Ct = Re.Root, Et = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Re.Trigger,
  {
    ref: o,
    className: e ? f(sa({ variant: e }), t) : t,
    ...n
  }
));
Et.displayName = Re.Trigger.displayName;
const kt = b.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Re.Portal, { children: /* @__PURE__ */ r(
  Re.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: He, ...n },
    className: f(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
kt.displayName = Re.Content.displayName;
const Dr = [
  Hi,
  Oo,
  Ao,
  Yi
], Il = Dn(null), Un = {
  didCatch: !1,
  error: null
};
class Ol extends xs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Un;
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
      }), this.setState(Un);
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
    if (o && n.error !== null && Al(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Un);
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
        l = Kr(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Kr(Il.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Al() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function Pl({ children: t, onError: e }) {
  return r(Ol, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const $l = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : H;
function Ll(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Vl() {
  return function(t) {
    const [e] = Wt(), n = F(() => t(e), [e, t]), [o, a] = S(() => n.initialValueFn()), s = q(o);
    return $l(() => {
      const { initialValueFn: i, subscribe: l } = n, w = i();
      return s.current !== w && (s.current = w, a(w)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(Ll);
}
function jl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ui(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), w = s.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [m, h] = mi(t), u = l.is(w), g = e.is(i ? w : l), y = e.is(i ? l : w);
      let x, R = 0;
      u ? (R = m > h ? h : m, x = m > h ? m : h) : g ? (R = i ? h : m, x = void 0) : y && (R = 0, x = i ? m : h);
      const v = e.__text.slice(R, x);
      v !== e.__text && (n === "clone" && (e = fi(e)), e.__text = v);
    }
  }
  return e;
}
function zl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const wa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fl = wa && "documentMode" in document ? document.documentMode : null;
!(!wa || !("InputEvent" in window) || Fl) && "getTargetRanges" in new window.InputEvent("input");
function Bl(t) {
  const e = Po(t, (n) => de(n) && !n.isInline());
  return de(e) || zl(4, t.__key), e;
}
function Kl(t) {
  const e = jt();
  if (!Te(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Po(s, (c) => de(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !n.has(w) && (n.add(w), t(l));
  }
  return n.size > 0;
}
const Ul = Symbol.for("preact-signals");
function An() {
  if (pe > 1) return void pe--;
  let t, e = !1;
  for (; rn !== void 0; ) {
    let n = rn;
    for (rn = void 0, ur++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && ca(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (ur = 0, pe--, e) throw t;
}
function Gl(t) {
  if (pe > 0) return t();
  pe++;
  try {
    return t();
  } finally {
    An();
  }
}
let Q, rn;
function no(t) {
  const e = Q;
  Q = void 0;
  try {
    return t();
  } finally {
    Q = e;
  }
}
let pe = 0, ur = 0, yn = 0;
function ro(t) {
  if (Q === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Q ? (e = { i: 0, S: t, p: Q.s, n: void 0, t: Q, e: void 0, x: void 0, r: e }, Q.s !== void 0 && (Q.s.n = e), Q.s = e, t.n = e, 32 & Q.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Q.s, e.n = void 0, Q.s.n = e, Q.s = e), e) : void 0;
}
function yt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ln(t, e) {
  return new yt(t, e);
}
function ca(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function oo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function da(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ye(t, e) {
  yt.call(this, void 0), this.x = t, this.s = void 0, this.g = yn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ql(t, e) {
  return new ye(t, e);
}
function pa(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    pe++;
    const n = Q;
    Q = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Mr(t), o;
    } finally {
      Q = n, An();
    }
  }
}
function Mr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, pa(t);
}
function Hl(t) {
  if (Q !== this) throw new Error("Out-of-order effect");
  da(this), Q = t, this.f &= -2, 8 & this.f && Mr(this), An();
}
function Ae(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function fe(t, e) {
  const n = new Ae(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Pn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = ln(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
yt.prototype.brand = Ul, yt.prototype.h = function() {
  return !0;
}, yt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : no(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, yt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && no(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, yt.prototype.subscribe = function(t) {
  return fe(() => {
    const e = this.value, n = Q;
    Q = void 0;
    try {
      t(e);
    } finally {
      Q = n;
    }
  }, { name: "sub" });
}, yt.prototype.valueOf = function() {
  return this.value;
}, yt.prototype.toString = function() {
  return this.value + "";
}, yt.prototype.toJSON = function() {
  return this.value;
}, yt.prototype.peek = function() {
  const t = Q;
  Q = void 0;
  try {
    return this.value;
  } finally {
    Q = t;
  }
}, Object.defineProperty(yt.prototype, "value", { get() {
  const t = ro(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ur > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, yn++, pe++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      An();
    }
  }
} }), ye.prototype = new yt(), ye.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === yn)) return !0;
  if (this.g = yn, this.f |= 1, this.i > 0 && !ca(this)) return this.f &= -2, !0;
  const t = Q;
  try {
    oo(this), Q = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Q = t, da(this), this.f &= -2, !0;
}, ye.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  yt.prototype.S.call(this, t);
}, ye.prototype.U = function(t) {
  if (this.t !== void 0 && (yt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ye.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ye.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = ro(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ae.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ae.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, pa(this), oo(this), pe++;
  const t = Q;
  return Q = this, Hl.bind(this, t);
}, Ae.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = rn, rn = this);
}, Ae.prototype.d = function() {
  this.f |= 8, 1 & this.f || Mr(this);
}, Ae.prototype.dispose = function() {
  this.d();
};
Ht({ build: (t, e, n) => Pn(e), config: pn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return fe(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ua() {
  const t = ue(), e = jt(), n = In();
  t.clear(), t.append(n), e !== null && n.select(), Te(e) && (e.format = 0);
}
function ma(t, e = ua) {
  return t.registerCommand($o, (n) => (t.update(e), !0), Lo);
}
Ht({ build: (t, e, n) => Pn(e), config: pn({ $onClear: ua }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return fe(() => ma(t, o.value));
} });
function Yl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Gn = gi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class fa extends or {
  $config() {
    return this.config("decorator-text", { extends: or, stateConfigs: [{ flat: !0, stateConfig: Gn }] });
  }
  getFormat() {
    return Ri(this, Gn);
  }
  getFormatFlags(e, n) {
    return Xr(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Si[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Di(this, Gn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Xr(n, e, null);
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
function Xl(t) {
  return t instanceof fa;
}
Ht({ name: "@lexical/extension/DecoratorText", nodes: () => [fa], register: (t, e, n) => t.registerCommand(Vo, (o) => {
  const a = jt();
  if (jo(a) || Te(a)) for (const s of a.getNodes()) Xl(s) && s.toggleFormat(o);
  return !1;
}, zo) });
function ha(t, e) {
  let n;
  return ln(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const mr = Ht({ build: (t) => ha(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ga(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ga(n[a], o[a]);
    return t;
  }
  return e;
}
const Ir = 0, fr = 1, ba = 2, qn = 3, bn = 4, Oe = 5, Hn = 6, Ze = 7;
function Yn(t) {
  return t.id === Ir;
}
function va(t) {
  return t.id === ba;
}
function Wl(t) {
  return function(e) {
    return e.id === fr;
  }(t) || nt(305, String(t.id), String(fr)), Object.assign(t, { id: ba });
}
const Jl = /* @__PURE__ */ new Set();
class Zl {
  constructor(e, n) {
    xt(this, "builder");
    xt(this, "configs");
    xt(this, "_dependency");
    xt(this, "_peerNameSet");
    xt(this, "extension");
    xt(this, "state");
    xt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ir };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : hi;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    va(n) || nt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, w, c) {
      return Object.assign(l, { config: w, id: qn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: bn, initResult: w, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== bn && nt(307, String(n.id), String(Oe)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Oe, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Oe && nt(308, String(o.id), String(Oe));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Hn });
    }(o), () => {
      const s = this.state;
      s.id !== Ze && nt(309, String(o.id), String(Ze)), this.state = function(i) {
        return Object.assign(i, { id: Oe });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Hn && nt(310, String(n.id), String(Hn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ze });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && nt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && nt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= bn;
    }(e) || nt(313, String(e.id), String(bn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= qn;
    }(e) || nt(314, String(e.id), String(qn)), { config: e.config };
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
      return n.id >= Ze;
    }(e) || nt(316, String(e.id), String(Ze)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Jl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= Oe;
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ao = { tag: Nr };
function Ql() {
  const t = ue();
  t.isEmpty() && t.append(In());
}
const tw = Ht({ config: pn({ setOptions: ao, updateOptions: ao }), init: ({ $initialEditorState: t = Ql }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (yi(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [bi, Ao, vi, xi, Oo] }), so = Symbol.for("@lexical/extension/LexicalBuilder");
function io() {
}
function ew(t) {
  throw t;
}
function vn(t) {
  return Array.isArray(t) ? t : [t];
}
const Xn = "0.41.0+prod.esm";
class on {
  constructor(e) {
    xt(this, "roots");
    xt(this, "extensionNameMap");
    xt(this, "outgoingConfigEdges");
    xt(this, "incomingEdges");
    xt(this, "conflicts");
    xt(this, "_sortedExtensionReps");
    xt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Xn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [vn(tw)];
    for (const o of e) n.push(vn(o));
    return new on(n);
  }
  static maybeFromEditor(e) {
    const n = e[so];
    return n && (n.PACKAGE_VERSION !== Xn && nt(292, n.PACKAGE_VERSION, Xn), n instanceof on || nt(293)), n;
  }
  static fromEditor(e) {
    const n = on.maybeFromEditor(e);
    return n === void 0 && nt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Io({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [so]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = io;
    function n() {
      try {
        e();
      } finally {
        e = io;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = me(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && nt(296);
    const n = vn(e), [o] = n;
    typeof o.name != "string" && nt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && nt(298, o.name), !a) {
      a = new Zl(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && nt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && nt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = vn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (va(s)) return;
      const i = o.extension.name;
      var l;
      Yn(s) || nt(300, i, a || "[unknown]"), Yn(l = s) || nt(304, String(l.id), String(Ir)), s = Object.assign(l, { id: fr }), o.state = s;
      const w = this.outgoingConfigEdges.get(i);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && n(d, i);
      }
      s = Wl(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Yn(o.state) && n(o);
    for (const o of e) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && nt(301, o.name);
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
    return me(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: m } = d;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const h of Yl(m)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && nt(302, m.name, h.replace.name, u.extension.name), o.set(h.replace, d);
        }
        n.add(h);
      }
      if (m.html) {
        if (m.html.export) for (const [h, u] of m.html.export.entries()) a.set(h, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && ga(i, m.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const w = Object.keys(s).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = s), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = ew), e;
  }
}
const nw = /* @__PURE__ */ new Set(), lo = Ht({ build(t, e, n) {
  const o = n.getDependency(mr).output, a = ln({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ha(() => {
  }, () => fe(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (jt()) for (const [d, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(d);
          continue;
        }
        const h = Ii(d), u = h && h.isSelected() || !1;
        c = c || u !== (!!i && i.has(d)), u && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && i && w.size === i.size || (s.value = w);
  }));
  return { watchNodeKey: function(i) {
    const l = ql(() => (s.value || nw).has(i)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(i);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(i, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [mr], name: "@lexical/extension/NodeSelection" });
Ni("INSERT_HORIZONTAL_RULE_COMMAND");
class Ve extends or {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ve(e.__key);
  }
  static importJSON(e) {
    return xa().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: rw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Fo(n, e.theme.hr), n;
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
function rw() {
  return { node: xa() };
}
function xa() {
  return Mi(Ve);
}
function ow(t) {
  return t instanceof Ve;
}
Ht({ dependencies: [mr, lo], name: "@lexical/extension/HorizontalRule", nodes: () => [Ve], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(lo).output, a = ln({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return me(t.registerCommand(ki, (i) => {
    if (_i(i.target)) {
      const l = Ci(i.target);
      if (ow(l)) return function(w, c = !1) {
        const d = jt(), m = w.isSelected(), h = w.getKey();
        let u;
        c && jo(d) ? u = d : (u = Ei(), Ti(u)), m ? u.delete(h) : u.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, zo), t.registerMutationListener(Ve, (i, l) => {
    Gl(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, m] of i.entries()) if (m === "destroyed") c.delete(d), w = !0;
      else {
        const h = c.get(d), u = t.getElementByKey(d);
        h ? h.domNode.value = u : (w = !0, c.set(d, { domNode: ln(u), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), fe(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) i.push(fe(() => {
      const c = l.value;
      c && (w.value ? Fo(c, s) : Oi(c, s));
    }));
    return me(...i);
  }));
} });
function ya(t) {
  return t.canBeEmpty();
}
function aw(t, e, n = ya) {
  return me(t.registerCommand(Ai, (o) => {
    const a = jt();
    if (!Te(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => kn(h) && h.canIndent()).length > 0) return !0;
      const l = i.anchor, w = i.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), m = Bl(d);
      if (m.canIndent()) {
        const h = m.getKey();
        let u = Pi();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = $i(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Li : Wr : Vi;
    return t.dispatchCommand(s, void 0);
  }, Lo), t.registerCommand(Wr, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = jt();
    if (!Te(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return Kl((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, kr));
}
Ht({ build: (t, e, n) => Pn(e), config: pn({ $canIndent: ya, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return fe(() => {
    if (!o.value) return aw(t, a, s);
  });
} });
const sw = Ht({ name: "@lexical/react/ReactProvider" });
function iw() {
  return ue().getTextContent();
}
function lw(t, e = !0) {
  if (t) return !1;
  let n = iw();
  return e && (n = n.trim()), n === "";
}
function ww(t) {
  if (!lw(t, !1)) return !1;
  const e = ue().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (ji(a)) return !1;
    if (de(a)) {
      if (!zi(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const w = s[o];
        if (!_n(w)) return !1;
      }
    }
  }
  return !0;
}
function Na(t) {
  return () => ww(t);
}
function ka(t) {
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
            const [c, d, m, h, u] = w;
            t.update(() => {
              const g = jt();
              if (Te(g)) {
                const y = g.anchor;
                let x = y.getNode(), R = 0, v = 0;
                if (_n(x) && c >= 0 && d >= 0 && (R = c, v = c + d, g.setTextNodeRange(x, R, x, v)), R === v && m === "" || (g.insertRawText(m), x = y.getNode()), _n(x)) {
                  R = h, v = h + u;
                  const _ = x.getTextContentSize();
                  R = R > _ ? _ : R, v = v > _ ? _ : v, g.setTextNodeRange(x, R, x, v);
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
Ht({ build: (t, e, n) => Pn(e), config: pn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => fe(() => n.getOutput().disabled.value ? void 0 : ka(t)) });
function cw(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Or = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : H;
function dw({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = S(() => n.getDecorators());
    return Or(() => n.registerDecoratorListener((i) => {
      Wi(() => {
        s(i);
      });
    }), [n]), H(() => {
      s(n.getDecorators());
    }, [n]), F(() => {
      const i = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = r(o, { onError: (h) => n._onError(h), children: r(ys, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(Ji(d, m, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function pw({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = on.maybeFromEditor(n);
    if (o && o.hasExtensionByName(sw.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && cw(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(dw, { editor: t, ErrorBoundary: e });
}
function wo(t) {
  return t.getEditorState().read(Na(t.isComposing()));
}
function uw({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Wt();
  return function(a) {
    Or(() => me(Xi(a), ka(a)), [a]);
  }(o), p(ct, { children: [t, r(mw, { content: e }), r(pw, { editor: o, ErrorBoundary: n })] });
}
function mw({ content: t }) {
  const [e] = Wt(), n = function(a) {
    const [s, i] = S(() => wo(a));
    return Or(() => {
      function l() {
        const w = wo(a);
        i(w);
      }
      return l(), me(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = Vl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function fw({ defaultSelection: t }) {
  const [e] = Wt();
  return H(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const hw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : H;
function gw({ onClear: t }) {
  const [e] = Wt();
  return hw(() => ma(e, t), [e, t]), null;
}
const _a = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Lt : H;
function bw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: m, ariaRequired: h, autoCapitalize: u, className: g, id: y, role: x = "textbox", spellCheck: R = !0, style: v, tabIndex: _, "data-testid": C, ...z }, V) {
  const [$, T] = S(t.isEditable()), D = B((P) => {
    P && P.ownerDocument && P.ownerDocument.defaultView ? t.setRootElement(P) : t.setRootElement(null);
  }, [t]), E = F(() => /* @__PURE__ */ function(...P) {
    return (O) => {
      for (const Y of P) typeof Y == "function" ? Y(O) : Y != null && (Y.current = O);
    };
  }(V, D), [D, V]);
  return _a(() => (T(t.isEditable()), t.registerEditableListener((P) => {
    T(P);
  })), [t]), r("div", { "aria-activedescendant": $ ? e : void 0, "aria-autocomplete": $ ? n : "none", "aria-controls": $ ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": $ && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": $ ? m : void 0, "aria-readonly": !$ || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: $, "data-testid": C, id: y, ref: E, role: x, spellCheck: R, style: v, tabIndex: _, ...z });
}
const vw = dn(bw);
function co(t) {
  return t.getEditorState().read(Na(t.isComposing()));
}
const xw = dn(yw);
function yw(t, e) {
  const { placeholder: n, ...o } = t, [a] = Wt();
  return p(ct, { children: [r(vw, { editor: a, ...o, ref: e }), n != null && r(Nw, { editor: a, content: n })] });
}
function Nw({ content: t, editor: e }) {
  const n = function(i) {
    const [l, w] = S(() => co(i));
    return _a(() => {
      function c() {
        const d = co(i);
        w(d);
      }
      return c(), me(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = S(e.isEditable());
  if (Lt(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function kw({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    xw,
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
const Ca = Dn(void 0);
function _w({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = F(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(Ca.Provider, { value: i, children: s });
}
function Ea() {
  const t = yr(Ca);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Cw() {
  const [t, e] = S(void 0), n = B(() => {
    e(void 0);
  }, []), o = F(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(ml, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(Qo, { children: [
      /* @__PURE__ */ r(ta, { children: /* @__PURE__ */ r(ea, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = B(
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
function Ew({
  children: t
}) {
  const [e] = Wt(), [n, o] = S(e), [a, s] = S("paragraph"), [i, l] = Cw(), w = () => {
  };
  return H(() => n.registerCommand(
    Bo,
    (c, d) => (o(d), !1),
    kr
  ), [n]), /* @__PURE__ */ p(
    _w,
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
function Tw(t) {
  const [e] = Wt(), { activeEditor: n } = Ea();
  H(() => n.registerCommand(
    Bo,
    () => {
      const o = jt();
      return o && t(o), !1;
    },
    kr
  ), [e, t]), H(() => {
    n.getEditorState().read(() => {
      const o = jt();
      o && t(o);
    });
  }, [n, t]);
}
const Ta = ge(
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
), Rw = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Go.Root,
  {
    ref: a,
    className: f(Ta({ variant: e, size: n, className: t })),
    ...o
  }
));
Rw.displayName = Go.Root.displayName;
const Ra = b.createContext({
  size: "default",
  variant: "default"
}), Ar = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = ut();
  return /* @__PURE__ */ r(
    On.Root,
    {
      ref: s,
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        Ra.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Ar.displayName = On.Root.displayName;
const an = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(Ra);
  return /* @__PURE__ */ r(
    On.Item,
    {
      ref: s,
      className: f(
        Ta({
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
an.displayName = On.Item.displayName;
const po = [
  { format: "bold", icon: _s, label: "Bold" },
  { format: "italic", icon: Cs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Sw() {
  const { activeEditor: t } = Ea(), [e, n] = S([]), o = B((a) => {
    if (Te(a) || Zi(a)) {
      const s = [];
      po.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Tw(o), /* @__PURE__ */ r(
    Ar,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: po.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        an,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Vo, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Dw({ onClear: t }) {
  const [e] = Wt();
  H(() => {
    t && t(() => {
      e.dispatchCommand($o, void 0);
    });
  }, [e, t]);
}
function Mw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = S(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Ew, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Sw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        uw,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(kw, { placeholder: t }) }),
          ErrorBoundary: Pl
        }
      ),
      e && /* @__PURE__ */ r(fw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Dw, { onClear: n }),
      /* @__PURE__ */ r(gw, {})
    ] })
  ] });
}
const Iw = {
  namespace: "commentEditor",
  theme: Sr,
  nodes: Dr,
  onError: (t) => {
    console.error(t);
  }
};
function En({
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
          Sl,
          {
            initialConfig: {
              ...Iw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(Nt, { children: [
              /* @__PURE__ */ r(Mw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                Ml,
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
function Ow(t, e) {
  const n = Ki(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!Da.has(s.nodeName)) {
    const i = Ma(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Ko && i.insertAfter(Uo());
    for (const i of s) {
      const l = i.getChildren();
      for (const w of l) i.insertBefore(w);
      i.remove();
    }
  }(a), o;
}
function Aw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ue().getChildren();
  for (let a = 0; a < o.length; a++)
    Sa(t, o[a], n, e);
  return n.innerHTML;
}
function Sa(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = de(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && _n(e) && (i = jl(o, e, "clone"));
  const l = de(i) ? i.getChildren() : [], w = Fi(t, i.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, i) : i.exportDOM(t);
  const { element: d, after: m } = c;
  if (!d) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], y = Sa(t, g, h, o);
    !a && de(e) && y && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Bi(d) || Jr(d)) && d.append(h), n.append(d), m) {
      const u = m.call(i, d);
      u && (Jr(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const Da = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ma(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Da.has(t.nodeName)) return i;
  let l = null;
  const w = function(g, y) {
    const { nodeName: x } = g, R = y._htmlConversions.get(x.toLowerCase());
    let v = null;
    if (R !== void 0) for (const _ of R) {
      const C = _(g);
      C !== null && (v === null || (v.priority || 0) <= (C.priority || 0)) && (v = C);
    }
    return v !== null ? v.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let d = null;
  if (c !== null) {
    d = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, y] of a) if (l = y(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const m = t.childNodes;
  let h = [];
  const u = (l == null || !Ui(l)) && (l != null && kn(l) || o);
  for (let g = 0; g < m.length; g++) h.push(...Ma(m[g], e, n, u, new Map(a), l));
  return d != null && (h = d(h)), Zr(t) && (h = Pw(t, h, u ? () => {
    const g = new Ko();
    return n.push(g), g;
  } : In)), l == null ? h.length > 0 ? i = i.concat(h) : Zr(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Qr(g.nextSibling) && Qr(g.previousSibling);
  }(t) && (i = i.concat(Uo())) : de(l) && l.append(...h), i;
}
function Pw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (kn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && kn(e[i + 1])) {
      const w = n();
      w.setFormat(o), w.append(...s), a.push(w), s = [];
    }
  }
  return a;
}
function Ia(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Oa(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Oa(e.children)
  ) : !1;
}
function Pt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Oa(t.root.children) : !1;
}
function $w(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = qo({
    namespace: "EditorUtils",
    theme: Sr,
    nodes: Dr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = Ow(e, a);
      ue().clear(), Gi(s);
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
function Tn(t) {
  const e = qo({
    namespace: "EditorUtils",
    theme: Sr,
    nodes: Dr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = Aw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Pr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function Nn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function $r(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Lw = {
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
function Dp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o,
  initialAssignedUser: a
}) {
  const [s, i] = S(Lw), [l, w] = S(a), [c, d] = S(!1), m = q(void 0), h = q(null);
  H(() => {
    let v = !0;
    const _ = h.current;
    if (!_) return;
    const C = setTimeout(() => {
      v && Ia(_);
    }, 300);
    return () => {
      v = !1, clearTimeout(C);
    };
  }, []);
  const u = B(() => {
    if (!Pt(s)) return;
    const v = Tn(s);
    e(v, l);
  }, [s, e, l]), g = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", R = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: R }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(j, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ke, {}) }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
            j,
            {
              onClick: u,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !Pt(s),
              children: /* @__PURE__ */ r(zt, {})
            }
          ) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: y }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(oe, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ p(
        j,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(ko, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Wn(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Xt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: t.map((v) => /* @__PURE__ */ r(
            Yt,
            {
              onSelect: () => {
                w(v || void 0), d(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Wn(v, o) })
            },
            v || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: h,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), n()) : $r(v) && (v.preventDefault(), v.stopPropagation(), Pt(s) && u());
        },
        onKeyDown: (v) => {
          Pr(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          En,
          {
            editorSerializedState: s,
            onSerializedChange: (v) => i(v),
            placeholder: g,
            onClear: (v) => {
              m.current = v;
            }
          }
        )
      }
    )
  ] });
}
const Mp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Ip = [
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
], Vw = ["input", "select", "textarea", "button"], jw = ["button", "textbox"], zw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = q(null), [s, i] = S(void 0), [l, w] = S(void 0), c = B(
    (u) => {
      i(u);
      const g = t.find((x) => x.id === u);
      g && (e == null || e(g));
      const y = document.getElementById(u);
      y && (y.scrollIntoView({ block: "center" }), y.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = B(
    (u) => {
      const g = t.find((y) => y.id === u);
      g && (w((y) => y === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Vw.includes(g)) return !0;
    const y = u.getAttribute("role");
    if (y && jw.includes(y)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, h = B(
    (u) => {
      var $;
      const g = u.target, y = (T) => T ? document.getElementById(T) : void 0, x = y(l), R = y(s);
      if (!!(x && g && x.contains(g) && g !== x) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const T = t.find((D) => D.id === l);
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
          const D = T.findIndex((P) => P === g);
          if (D === -1) return;
          let E;
          u.key === "ArrowDown" ? E = Math.min(D + 1, T.length - 1) : E = Math.max(D - 1, 0), E !== D && (u.preventDefault(), u.stopPropagation(), ($ = T[E]) == null || $.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((T) => T.id === s);
      let z = C;
      switch (u.key) {
        case "ArrowDown":
          z = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          z = 0, u.preventDefault();
          break;
        case "End":
          z = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && d(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const T = R;
          if (T) {
            const D = T.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), E = T.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), P = D ?? E;
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
      const V = t[z];
      V && c(V.id);
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
}, Fw = ge(
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
), je = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: f("pr-twp", Fw({ variant: e }), t), ...n })
);
je.displayName = "Badge";
const Aa = b.forwardRef(
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
Aa.displayName = "Card";
const Bw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Bw.displayName = "CardHeader";
const Kw = b.forwardRef(
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
Kw.displayName = "CardTitle";
const Uw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: f("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Uw.displayName = "CardDescription";
const Pa = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Pa.displayName = "CardContent";
const Gw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Gw.displayName = "CardFooter";
const ze = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Ho.Root,
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
ze.displayName = Ho.Root.displayName;
const $a = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Root,
  {
    ref: n,
    className: f(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
$a.displayName = qe.Root.displayName;
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Image,
  {
    ref: n,
    className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
qw.displayName = qe.Image.displayName;
const La = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe.Fallback,
  {
    ref: n,
    className: f(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
La.displayName = qe.Fallback.displayName;
const Lr = Dn(void 0);
function Bt() {
  const t = yr(Lr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ae = ge("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Se = ot.Trigger, Va = ot.Group, Hw = ot.Portal, Yw = ot.Sub, Xw = ot.RadioGroup;
function he({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Lr.Provider, { value: n, children: /* @__PURE__ */ r(ot.Root, { ...e }) });
}
const ja = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Bt();
  return /* @__PURE__ */ p(
    ot.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r($e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ja.displayName = ot.SubTrigger.displayName;
const za = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ut();
  return /* @__PURE__ */ r(
    ot.SubContent,
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
za.displayName = ot.SubContent.displayName;
const ee = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = ut();
  return /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
    ot.Content,
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
ee.displayName = ot.Content.displayName;
const Rn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ut(), s = Bt();
  return /* @__PURE__ */ r(
    ot.Item,
    {
      ref: o,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Rn.displayName = ot.Item.displayName;
const te = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = ut(), i = Bt();
  return /* @__PURE__ */ p(
    ot.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ae({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
te.displayName = ot.CheckboxItem.displayName;
const Fa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ut(), s = Bt();
  return /* @__PURE__ */ p(
    ot.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Mn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Fa.displayName = ot.RadioItem.displayName;
const mn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
mn.displayName = ot.Label.displayName;
const Xe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Xe.displayName = ot.Separator.displayName;
function Ww({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Ww.displayName = "DropdownMenuShortcut";
function uo({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [w, c] = S(!1), [d, m] = S(), h = q(null);
  H(() => {
    if (!w) return;
    let C = !0;
    const z = h.current;
    if (!z) return;
    const V = setTimeout(() => {
      C && Ia(z);
    }, 300);
    return () => {
      C = !1, clearTimeout(V);
    };
  }, [w]);
  const u = B(
    (C) => {
      C && C.stopPropagation(), c(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = B(
    async (C) => {
      if (C && C.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Tn(d)
      ) && (c(!1), m(void 0), i == null || i(!1));
    },
    [d, a, t.id, i]
  ), y = F(() => {
    const C = new Date(t.date), z = si(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), V = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ke(n["%comment_dateAtTime%"], {
      date: z,
      time: V
    });
  }, [t.date, n]), x = F(() => t.user, [t.user]), R = F(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), v = F(() => ii(t.contents), [t.contents]), _ = F(() => {
    if (o && l)
      return /* @__PURE__ */ p(ct, { children: [
        /* @__PURE__ */ p(
          Rn,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), m($w(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(Es, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Rn,
          {
            onClick: async (C) => {
              C.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(Ts, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
      className: f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r($a, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(La, { className: "tw-text-xs tw-font-medium", children: R }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: y }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(je, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              Nn(t.assignedUser, n)
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
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), u()) : $r(C) && (C.preventDefault(), C.stopPropagation(), Pt(d) && g());
              },
              onKeyDown: (C) => {
                Pr(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  En,
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
                    onSerializedChange: (C) => m(C)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    j,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Ke, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    j,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Pt(d),
                      children: /* @__PURE__ */ r(_o, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ p(ct, { children: [
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
                dangerouslySetInnerHTML: { __html: v }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ p(he, { children: [
          /* @__PURE__ */ r(Se, { asChild: !0, children: /* @__PURE__ */ r(j, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Rs, {}) }) }),
          /* @__PURE__ */ r(ee, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const mo = {
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
function Jw({
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
  handleUpdateComment: h,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: y,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: R,
  canUserResolveThreadCallback: v,
  canUserEditOrDeleteCommentCallback: _,
  isRead: C = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: V,
  initialAssignedUser: $
}) {
  const [T, D] = S(mo), [E, P] = S(), [O, Y] = S(), L = o, [J, N] = S(!1), [U, mt] = S(!1), [bt, St] = S(!1), [ht, _t] = S(!1), [K, wt] = S(!1), [Z, ft] = S(C), [vt, se] = S(!1), ie = q(void 0), [Ie, le] = S(/* @__PURE__ */ new Map());
  H(() => {
    let M = !0;
    return (async () => {
      const At = v ? await v(w) : !1;
      M && wt(At);
    })(), () => {
      M = !1;
    };
  }, [w, v]), H(() => {
    let M = !0;
    if (!o) {
      _t(!1), le(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const At = R ? await R(w) : !1;
      M && _t(At);
    })(), () => {
      M = !1;
    };
  }, [o, w, R]);
  const Dt = q("idle");
  H(() => {
    if (!o) {
      Dt.current !== "idle" && (P(void 0), Y(void 0), Dt.current = "idle");
      return;
    }
    Dt.current === "idle" && (Dt.current = "pending"), ht ? Dt.current === "pending" && $ !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    $ !== s && (P($), Dt.current = "auto-populated") : Dt.current === "auto-populated" && (P(void 0), Dt.current = "pending");
  }, [o, $, ht, s]);
  const Vt = F(() => e.filter((M) => !M.deleted), [e]);
  H(() => {
    let M = !0;
    if (!o || !_) {
      le(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const At = /* @__PURE__ */ new Map();
      await Promise.all(
        Vt.map(async (Je) => {
          const gs = await _(Je.id);
          M && At.set(Je.id, gs);
        })
      ), M && le(At);
    })(), () => {
      M = !1;
    };
  }, [o, Vt, _]);
  const Jt = F(() => Vt[0], [Vt]), I = q(null), k = q(void 0), A = B(() => {
    var M;
    (M = k.current) == null || M.call(k), D(mo);
  }, []), W = B(() => {
    const M = !Z;
    ft(M), se(!M), g == null || g(w, M);
  }, [Z, g, w]);
  H(() => {
    N(!1);
  }, [o]), H(() => {
    if (o && !Z && !vt) {
      const M = setTimeout(() => {
        ft(!0), g == null || g(w, !0);
      }, z * 1e3);
      return ie.current = M, () => clearTimeout(M);
    }
    ie.current && (clearTimeout(ie.current), ie.current = void 0);
  }, [o, Z, vt, z, w, g]);
  const G = F(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), it = F(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const M = Nn(s, n);
    return ke(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [s, n]), et = F(() => Vt.slice(1), [Vt]), rt = F(() => et.length ?? 0, [et.length]), lt = F(() => rt > 0, [rt]), Ot = F(() => J || rt <= 2 ? et : et.slice(-2), [et, rt, J]), Mt = F(() => J || rt <= 2 ? 0 : rt - 2, [rt, J]), Zt = F(
    () => rt === 1 ? G.singleReply : ke(G.multipleReplies, { count: rt }),
    [rt, G]
  ), ve = F(
    () => Mt === 1 ? G.singleReply : ke(G.multipleReplies, { count: Mt }),
    [Mt, G]
  );
  H(() => {
    !o && U && lt && mt(!1);
  }, [o, U, lt]);
  const we = B(
    async (M) => {
      M && M.stopPropagation();
      const Kt = Pt(T) ? Tn(T) : void 0;
      if (E !== void 0) {
        await m({
          threadId: w,
          contents: Kt,
          assignedUser: E
        }) && (Y(E), Kt && A());
        return;
      }
      Kt && await m({ threadId: w, contents: Kt }) && A();
    },
    [
      A,
      T,
      m,
      E,
      w
    ]
  ), Br = B(
    async (M) => {
      const Kt = Pt(T) ? Tn(T) : void 0, At = M.status ? M.assignedUser : E ?? M.assignedUser, Je = await m({
        ...M,
        contents: Kt,
        assignedUser: At
      });
      return Je && (At !== void 0 && Y(At), Kt && A()), Je;
    },
    [A, T, m, E]
  );
  if (Vt.length !== 0)
    return /* @__PURE__ */ r(
      Aa,
      {
        role: "option",
        "aria-selected": o,
        id: w,
        className: f(
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
          l(w);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Pa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              it && /* @__PURE__ */ r(je, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: it }),
              /* @__PURE__ */ r(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (M) => {
                    M.stopPropagation(), W();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": Z ? n["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : n["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: Z ? /* @__PURE__ */ r(Ss, {}) : /* @__PURE__ */ r(Ds, {})
                }
              ),
              K && d !== "Resolved" && /* @__PURE__ */ r(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  className: f(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (M) => {
                    M.stopPropagation(), Br({
                      threadId: w,
                      status: "Resolved"
                    });
                  },
                  "aria-label": n["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: I,
                className: f(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": L
                  },
                  { "tw-whitespace-nowrap": !L }
                ),
                children: [
                  a && V ? /* @__PURE__ */ r(
                    j,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (M) => {
                        M.stopPropagation(), V(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    Jt.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: Jt.selectedText }),
                    Jt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              uo,
              {
                comment: Jt,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Br,
                handleUpdateComment: h,
                handleDeleteComment: u,
                onEditingChange: mt,
                canEditOrDelete: (!U && Ie.get(Jt.id)) ?? !1,
                canUserResolveThread: K
              }
            )
          ] }),
          /* @__PURE__ */ p(ct, { children: [
            lt && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(ze, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Zt })
            ] }),
            !o && Pt(T) && /* @__PURE__ */ r(
              En,
              {
                editorSerializedState: T,
                onSerializedChange: (M) => D(M),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(ct, { children: [
              Mt > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (M) => {
                    M.stopPropagation(), N(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (M) => {
                    (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), N(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(ze, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: ve }),
                      J ? /* @__PURE__ */ r(Co, {}) : /* @__PURE__ */ r(Ue, {})
                    ] })
                  ]
                }
              ),
              Ot.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                uo,
                {
                  comment: M,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: h,
                  handleDeleteComment: u,
                  onEditingChange: mt,
                  canEditOrDelete: (!U && Ie.get(M.id)) ?? !1
                }
              ) }, M.id)),
              x !== !1 && (!U || Pt(T)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (M) => M.stopPropagation(),
                  onKeyDownCapture: (M) => {
                    $r(M) && (M.preventDefault(), M.stopPropagation(), (Pt(T) || E !== void 0 && E !== O) && we());
                  },
                  onKeyDown: (M) => {
                    Pr(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      En,
                      {
                        editorSerializedState: T,
                        onSerializedChange: (M) => D(M),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (M) => {
                          k.current = M;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      E !== void 0 && (Pt(T) || E !== O) && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ke(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: Nn(
                            E,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(oe, { open: bt, onOpenChange: St, children: [
                        /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ r(
                          j,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !ht || !y || y.length === 0 || !y.includes(i),
                            "aria-label": n["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ r(ko, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          Xt,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (M) => {
                              M.key === "Escape" && (M.stopPropagation(), St(!1));
                            },
                            children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: y == null ? void 0 : y.map((M) => /* @__PURE__ */ r(
                              Yt,
                              {
                                onSelect: () => {
                                  P(M !== s ? M : void 0), Dt.current = "user-selected", Y(void 0), St(!1);
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
                        j,
                        {
                          size: "icon",
                          onClick: we,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Pt(T) && (E === void 0 || E === O),
                          "aria-label": n["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ r(_o, {})
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
function Op({
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
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: y,
  onVerseRefClick: x
}) {
  const [R, v] = S(/* @__PURE__ */ new Set()), [_, C] = S(), [z, V] = S(), $ = B(
    async (N) => {
      const U = await s(N);
      return U !== void 0 && N.assignedUser !== void 0 && N.assignedUser !== "" && V(N.assignedUser), U;
    },
    [s]
  );
  H(() => {
    g && (v((N) => new Set(N).add(g)), C(g));
  }, [g]);
  const T = n.filter(
    (N) => N.comments.some((U) => !U.deleted)
  ), D = T.map((N) => ({ id: N.id })), E = B(
    (N) => {
      v((U) => new Set(U).add(N.id)), C(N.id), y == null || y(N.id);
    },
    [y]
  ), P = B(
    (N) => {
      const U = R.has(N);
      v((mt) => {
        const bt = new Set(mt);
        return bt.has(N) ? bt.delete(N) : bt.add(N), bt;
      }), C(N), y == null || y(U ? void 0 : N);
    },
    [R, y]
  ), { listboxRef: O, activeId: Y, handleKeyDown: L } = zw({
    options: D,
    onOptionSelect: E
  }), J = B(
    (N) => {
      N.key === "Escape" ? (_ && R.has(_) && (v((U) => {
        const mt = new Set(U);
        return mt.delete(_), mt;
      }), C(void 0), y == null || y(void 0)), N.preventDefault(), N.stopPropagation()) : L(N);
    },
    [_, R, L, y]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: O,
      "aria-activedescendant": Y ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: J,
      children: T.map((N) => /* @__PURE__ */ r(
        "div",
        {
          className: f({
            "tw-opacity-60": N.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Jw,
            {
              classNameForVerseText: e,
              comments: N.comments,
              localizedStrings: a,
              verseRef: N.verseRef,
              handleSelectThread: P,
              threadId: N.id,
              thread: N,
              isRead: N.isRead,
              isSelected: R.has(N.id),
              currentUser: o,
              assignedUser: N.assignedUser,
              threadStatus: N.status,
              handleAddCommentToThread: $,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: x,
              initialAssignedUser: z
            }
          )
        },
        N.id
      ))
    }
  );
}
function Zw({ table: t }) {
  return /* @__PURE__ */ p(he, { children: [
    /* @__PURE__ */ r(Qi, { asChild: !0, children: /* @__PURE__ */ p(j, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Ms, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(ee, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(mn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Xe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        te,
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
const Fe = dt.Root, Qw = dt.Group, Be = dt.Value, tc = ge(
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
), De = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = ut();
  return /* @__PURE__ */ p(
    dt.Trigger,
    {
      className: f(tc({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(dt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
De.displayName = dt.Trigger.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollUpButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Co, { className: "tw-h-4 tw-w-4" })
  }
));
Ba.displayName = dt.ScrollUpButton.displayName;
const Ka = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollDownButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4" })
  }
));
Ka.displayName = dt.ScrollDownButton.displayName;
const Me = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = ut();
  return /* @__PURE__ */ r(dt.Portal, { children: /* @__PURE__ */ p(
    dt.Content,
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
        /* @__PURE__ */ r(Ba, {}),
        /* @__PURE__ */ r(
          dt.Viewport,
          {
            className: f(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Ka, {})
      ]
    }
  ) });
});
Me.displayName = dt.Content.displayName;
const ec = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Label,
  {
    ref: n,
    className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
ec.displayName = dt.Label.displayName;
const $t = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  dt.Item,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(dt.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(dt.ItemText, { children: e })
    ]
  }
));
$t.displayName = dt.Item.displayName;
const nc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
nc.displayName = dt.Separator.displayName;
function rc({ table: t }) {
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
            /* @__PURE__ */ r(De, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Be, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Me, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r($t, { value: `${e}`, children: e }, e)) })
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
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Is, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(As, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Ps, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const fo = `
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
function oc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function wn(t, e) {
  const n = e ? `${fo}, ${e}` : fo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && oc(o)
  );
}
const $n = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        wn(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        i.preventDefault(), wn(l)[0].focus();
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
$n.displayName = "Table";
const Ln = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
Ln.displayName = "TableHeader";
const Vn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: f("[&_tr:last-child]:tw-border-0", t), ...e }));
Vn.displayName = "TableBody";
const ac = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
ac.displayName = "TableFooter";
function sc(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? wn(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function ic(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function lc(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Qt = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), sc(i);
  const l = b.useMemo(
    () => i.current ? wn(i.current) : [],
    [i]
  ), w = b.useCallback(
    (d) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const h = m.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        wn(h).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), y = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), lc(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), ic(l, y, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const x = m.closest("table");
        x && x.focus();
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
Qt.displayName = "TableRow";
const cn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
cn.displayName = "TableHead";
const Ee = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ee.displayName = "TableCell";
const wc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
wc.displayName = "TableCaption";
function hr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function cc({
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
  var V;
  const [d, m] = S([]), [h, u] = S([]), [g, y] = S({}), [x, R] = S({}), v = F(() => e ?? [], [e]), _ = Yo({
    data: v,
    columns: t,
    getCoreRowModel: Wo(),
    ...n && { getPaginationRowModel: el() },
    onSortingChange: m,
    getSortedRowModel: Xo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: tl(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: R,
    state: {
      sorting: d,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: x
    }
  }), C = _.getVisibleFlatColumns();
  let z;
  return w ? z = Array.from({ length: 10 }).map((D, E) => `skeleton-row-${E}`).map((D) => /* @__PURE__ */ r(Qt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Ee, { colSpan: C.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(hr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, D)) : ((V = _.getRowModel().rows) == null ? void 0 : V.length) > 0 ? z = _.getRowModel().rows.map(($) => /* @__PURE__ */ r(
    Qt,
    {
      onClick: () => i($, _),
      "data-state": $.getIsSelected() && "selected",
      children: $.getVisibleCells().map((T) => /* @__PURE__ */ r(Ee, { children: nn(T.column.columnDef.cell, T.getContext()) }, T.id))
    },
    $.id
  )) : z = /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r(Ee, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Zw, { table: _ }),
    /* @__PURE__ */ p($n, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Ln, { stickyHeader: s, children: _.getHeaderGroups().map(($) => /* @__PURE__ */ r(Qt, { children: $.headers.map((T) => /* @__PURE__ */ r(cn, { className: "tw-p-0", children: T.isPlaceholder ? void 0 : nn(T.column.columnDef.header, T.getContext()) }, T.id)) }, $.id)) }),
      /* @__PURE__ */ r(Vn, { children: z })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        j,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        j,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(rc, { table: _ })
  ] });
}
function Ap({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = F(
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
      children: /* @__PURE__ */ r(ol, { options: s, children: e })
    }
  );
}
const dc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ho = (t, e) => t[e] ?? e;
function pc({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = ho(n, "%webView_error_dump_header%"), s = ho(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(j, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Eo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const Pp = Object.freeze([
  ...dc,
  "%webView_error_dump_copied_message%"
]);
function $p({
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
  return /* @__PURE__ */ p(oe, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: o }),
    /* @__PURE__ */ p(Xt, { id: s, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(gt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        pc,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var uc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(uc || {});
function Lp({ id: t, label: e, groups: n }) {
  const [o, a] = S(
    Object.fromEntries(
      n.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = S({}), l = (c, d) => {
    const m = !o[c][d];
    a((u) => (u[c][d] = m, { ...u }));
    const h = n[c].items[d];
    h.onUpdate(h.id, m);
  }, w = (c, d) => {
    i((h) => (h[c] = d, { ...h }));
    const m = n[c].items.find((h) => h.id === d);
    m ? m.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(he, { children: [
    /* @__PURE__ */ r(Se, { asChild: !0, children: /* @__PURE__ */ p(j, { variant: "default", children: [
      /* @__PURE__ */ r($s, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Ue, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ee, { children: n.map((c, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(mn, { children: c.label }),
      /* @__PURE__ */ r(Va, { children: c.itemType === 0 ? /* @__PURE__ */ r(ct, { children: c.items.map((m, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        te,
        {
          checked: o[d][h],
          onCheckedChange: () => l(d, h),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        Xw,
        {
          value: s[d],
          onValueChange: (m) => w(d, m),
          children: c.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Fa, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(Xe, {})
    ] }, c.label)) })
  ] }) });
}
function Vp({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const w = new li("en", {
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
            /* @__PURE__ */ r(Ls, { className: "tw-h-4 tw-w-4" }),
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
            j,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Vs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            j,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(js, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function mc({ id: t, versionHistory: e }) {
  const [n, o] = S(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
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
function jp({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = F(() => wi(n), [n]), w = ((c) => {
    const d = new Intl.DisplayNames(ci(), { type: "language" });
    return c.map((m) => d.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(mc, { versionHistory: a }),
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
function fc({
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
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: y = "ghost",
  id: x
}) {
  const [R, v] = S(!1), _ = B(
    (E) => {
      var O;
      const P = (O = t.find((Y) => Y.label === E)) == null ? void 0 : O.value;
      P && n(
        e.includes(P) ? e.filter((Y) => Y !== P) : [...e, P]
      );
    },
    [t, e, n]
  ), C = () => w || o, z = F(() => {
    if (!h) return t;
    const E = t.filter((O) => O.starred).sort((O, Y) => O.label.localeCompare(Y.label)), P = t.filter((O) => !O.starred).sort((O, Y) => {
      const L = e.includes(O.value), J = e.includes(Y.value);
      return L && !J ? -1 : !L && J ? 1 : O.label.localeCompare(Y.label);
    });
    return [...E, ...P];
  }, [t, e, h]), V = () => {
    n(t.map((E) => E.value));
  }, $ = () => {
    n([]);
  }, T = c ?? R;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ p(oe, { open: T, onOpenChange: d ?? v, children: [
    /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ p(
      j,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": T,
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
                children: C()
              }
            )
          ] }),
          /* @__PURE__ */ r(To, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Xt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ne, { children: [
      /* @__PURE__ */ r(Ye, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(j, { variant: "ghost", size: "sm", onClick: V, children: s }),
        /* @__PURE__ */ r(j, { variant: "ghost", size: "sm", onClick: $, children: i })
      ] }),
      /* @__PURE__ */ p(re, { children: [
        /* @__PURE__ */ r(un, { children: l }),
        /* @__PURE__ */ r(qt, { children: z.map((E) => /* @__PURE__ */ p(
          Yt,
          {
            value: E.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                zt,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    e.includes(E.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              E.starred && /* @__PURE__ */ r(zs, { className: "tw-h-4 tw-w-4" }),
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
function zp({
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
      fc,
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
      return /* @__PURE__ */ p(je, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          j,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Ke, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(gt, { children: d })
  ] });
}
const hc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), go = (t, e) => t[e] ?? e;
function gc({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const w = F(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(ct, { children: [
    /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        j,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Fs, {})
        }
      ) }),
      /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p("p", { children: [
        go(a, "%undoButton_tooltip%"),
        s && ` (${w ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        j,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(Bs, {})
        }
      ) }),
      /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p("p", { children: [
        go(a, "%redoButton_tooltip%"),
        s && ` (${w ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function bc({ children: t, editorRef: e }) {
  const n = q(null);
  return H(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, d, m, h;
      if (!a || document.activeElement !== a) return;
      const w = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && w === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), (h = e.current) == null || h.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const We = b.forwardRef(
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
We.displayName = "Input";
const vc = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function xc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = q(null), i = q(null), l = q(!1), [w, c] = S(t), [d, m] = S(n), [h, u] = S(!1);
  H(() => {
    c(t);
  }, [t]), H(() => {
    d !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (w !== "custom" || d ? (e(w), o(d)) : (c(t), m(n)));
  }, y = (x) => {
    var R, v, _, C;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((R = s.current) == null || R.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((v = i.current) == null || v.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((_ = s.current) == null ? void 0 : _.selectionStart) === 0 && ((C = i.current) == null || C.focus(), l.current = !1), w === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ p(he, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(Se, { asChild: !0, children: /* @__PURE__ */ r(j, { variant: "outline", className: "tw-h-6", children: vc(t, a, n) }) }) }),
      /* @__PURE__ */ r(kt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ee,
      {
        style: { zIndex: Jo },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: y,
        onMouseMove: () => {
          var x;
          l.current && ((x = s.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ r(mn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Xe, {}),
          /* @__PURE__ */ r(
            te,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: ar })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            te,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: sr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            te,
            {
              ref: i,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (x) => {
                var R;
                x.stopPropagation(), l.current = !0, (R = s.current) == null || R.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  We,
                  {
                    tabIndex: 0,
                    onMouseDown: (x) => {
                      x.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
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
const yc = (t, e) => t === "f" ? /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r(So, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r(Do, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(ct, { children: [
  /* @__PURE__ */ r(Ro, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Nc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ke(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function kc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(he, { children: [
    /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(qi, { asChild: !0, children: /* @__PURE__ */ r(Se, { asChild: !0, children: /* @__PURE__ */ r(j, { variant: "outline", className: "tw-h-6", children: yc(t, n) }) }) }),
      /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: Nc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(ee, { style: { zIndex: Jo }, children: [
      /* @__PURE__ */ r(mn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Xe, {}),
      /* @__PURE__ */ p(
        te,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Ro, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        te,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(So, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        te,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Do, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const _c = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Cc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ks, { className: e, size: 16 });
}
function bo({
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
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Cc, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(na, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Ec({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = S(""), [s, i] = F(() => {
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
  return /* @__PURE__ */ p(ne, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
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
    /* @__PURE__ */ p(re, { children: [
      /* @__PURE__ */ r(un, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(qt, { children: s.map((l) => {
        var w;
        return /* @__PURE__ */ r(
          bo,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ p(ct, { children: [
        s.length > 0 && /* @__PURE__ */ r(Cr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(qt, { children: i.map((l) => {
          var w;
          return /* @__PURE__ */ r(
            bo,
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
function Tc(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = xn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[xn[l].description] ?? xn[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function Rc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Sc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Dc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Fp({
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
  const d = q(null), m = q(null), h = q(null), u = q(null);
  Lt(() => {
    if (!u.current) return;
    const { width: k } = u.current.getBoundingClientRect();
    k > 0 && (u.current.style.width = `${k}px`);
  }, []);
  const [g, y] = S("generated"), [x, R] = S("*"), [v, _] = S("f"), [C, z] = S(!1), [V, $] = S(!0), [T, D] = S(!1), E = q(!1), P = q(""), [O, Y] = S(!1), [L, J] = S(), [N, U] = S(), [mt, bt] = S(), [St, ht] = S(), _t = q(null), K = F(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? al(), noteMode: "expanded" }
    }),
    [i, l]
  ), wt = F(
    () => Tc(
      d,
      () => Y(!1),
      w,
      St
    ),
    [w, St]
  );
  H(() => {
    var k;
    O || (k = d.current) == null || k.focus();
  }, [v, O]), H(() => {
    var W, G;
    let k;
    E.current = !1, $(!0);
    const A = e == null ? void 0 : e.at(0);
    if (A && hn("note", A)) {
      const it = (W = A.insert.note) == null ? void 0 : W.caller;
      let et = "custom";
      it === ar ? et = "generated" : it === sr ? et = "hidden" : it && R(it), y(et), _(((G = A.insert.note) == null ? void 0 : G.style) ?? "f"), k = setTimeout(() => {
        var rt;
        (rt = d.current) == null || rt.applyUpdate([A]);
      }, 0);
    }
    return () => {
      k && clearTimeout(k);
    };
  }, [e, s]);
  const Z = B(
    (k, A, W = !1) => {
      var it, et, rt;
      const G = (et = (it = d.current) == null ? void 0 : it.getNoteOps(0)) == null ? void 0 : et.at(0);
      if (G && hn("note", G)) {
        if (G.insert.note) {
          let lt;
          k === "custom" ? lt = A : k === "generated" ? lt = ar : lt = sr, G.insert.note.caller = lt;
        }
        n == null || n([G]), W && c && s && ((rt = c.current) == null || rt.replaceEmbedUpdate(s, [G]));
      }
    },
    [s, n, c]
  ), ft = B(() => {
    Z(g, x, !0), o();
  }, [g, x, o, Z]), vt = q(ft);
  Lt(() => {
    vt.current = ft;
  });
  const se = q({ book: a.book, chapterNum: a.chapterNum });
  Lt(() => {
    (se.current.book !== a.book || se.current.chapterNum !== a.chapterNum) && (se.current = { book: a.book, chapterNum: a.chapterNum }, vt.current());
  }, [a.book, a.chapterNum]);
  const ie = () => {
    var A;
    const k = (A = m.current) == null ? void 0 : A.getElementsByClassName("editor-input")[0];
    k != null && k.textContent && navigator.clipboard.writeText(k.textContent);
  }, Ie = B(
    (k) => {
      y(k), Z(k, x);
    },
    [x, Z]
  ), le = B(
    (k) => {
      R(k), Z(g, k);
    },
    [g, Z]
  ), Dt = (k) => {
    var W, G, it, et, rt;
    _(k);
    const A = (G = (W = d.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : G.at(0);
    if (A && hn("note", A)) {
      A.insert.note && (A.insert.note.style = k);
      const lt = (et = (it = A.insert.note) == null ? void 0 : it.contents) == null ? void 0 : et.ops;
      v !== "x" && k === "x" ? lt == null || lt.forEach((Ot) => Rc(Ot)) : v === "x" && k !== "x" && (lt == null || lt.forEach((Ot) => Sc(Ot))), (rt = d.current) == null || rt.applyUpdate([A, { delete: 1 }]);
    }
  }, Vt = (k) => {
    ht(k.contextMarker), D(k.canRedo);
  }, Jt = B(
    (k) => {
      var W, G, it, et, rt;
      const A = (G = (W = d.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : G.at(0);
      if (A && hn("note", A)) {
        k.content.length > 1 && setTimeout(() => {
          var Mt;
          (Mt = d.current) == null || Mt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const lt = (it = A.insert.note) == null ? void 0 : it.style, Ot = (rt = (et = A.insert.note) == null ? void 0 : et.contents) == null ? void 0 : rt.ops;
        if (lt || z(!1), z(
          lt === "x" ? !!(Ot != null && Ot.every((Mt) => {
            var ve, we;
            if (!((ve = Mt.attributes) != null && ve.char)) return !0;
            const Zt = ((we = Mt.attributes) == null ? void 0 : we.char).style;
            return Zt === "xt" || Zt === "xo" || Zt === "xq";
          })) : !!(Ot != null && Ot.every((Mt) => {
            var ve, we;
            if (!((ve = Mt.attributes) != null && ve.char)) return !0;
            const Zt = ((we = Mt.attributes) == null ? void 0 : we.char).style;
            return Zt === "ft" || Zt === "fr" || Zt === "fq";
          }))
        ), !E.current) {
          E.current = !0, P.current = JSON.stringify(A), $(!0);
          return;
        }
        $(JSON.stringify(A) === P.current), Z(g, x);
      } else
        z(!1), $(!0);
    },
    [g, x, Z]
  ), I = B(() => {
    const k = window.getSelection();
    if (h.current && wt.length && k && k.rangeCount > 0) {
      const A = k.getRangeAt(0).getBoundingClientRect(), W = h.current.getBoundingClientRect();
      J(A.left - W.left), U(A.top - W.top), bt(A.height), Y(!0);
    }
  }, [wt, h]);
  return H(() => {
    const k = () => {
      O && Y(!1);
    };
    return window.addEventListener("click", k), () => {
      window.removeEventListener("click", k);
    };
  }, [O]), H(() => {
    var k;
    O && ((k = _t.current) == null || k.focus());
  }, [O]), H(() => {
    var W;
    const k = ((W = m.current) == null ? void 0 : W.querySelector(".editor-input")) ?? void 0, A = (G) => {
      !O && k && document.activeElement === k && G.key === l ? (G.preventDefault(), I()) : O && G.key === "Escape" && (G.preventDefault(), Y(!1));
    };
    return document.addEventListener("keydown", A), () => {
      document.removeEventListener("keydown", A);
    };
  }, [O, I, l]), /* @__PURE__ */ p(ct, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            kc,
            {
              isTypeSwitchable: C,
              noteType: v,
              handleNoteTypeChange: Dt,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            xc,
            {
              callerType: g,
              updateCallerType: Ie,
              customCaller: x,
              updateCustomCaller: le,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            gc,
            {
              onUndoClick: () => {
                var k;
                return (k = d.current) == null ? void 0 : k.undo();
              },
              onRedoClick: () => {
                var k;
                return (k = d.current) == null ? void 0 : k.redo();
              },
              canUndo: !V,
              canRedo: T,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
              j,
              {
                onClick: ft,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(zt, {})
              }
            ) }),
            /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(j, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(Ke, {}) }) }),
            /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(bc, { editorRef: d, children: /* @__PURE__ */ r(
              sl,
              {
                options: K,
                onStateChange: Vt,
                onUsjChange: Jt,
                defaultUsj: Dc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
              /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
                j,
                {
                  onClick: ie,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Eo, {})
                }
              ) }),
              /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ p(oe, { open: O, children: [
      /* @__PURE__ */ r(
        vl,
        {
          className: "tw-absolute",
          style: {
            top: N,
            left: L,
            height: mt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Xt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (k) => {
            k.preventDefault(), k.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Ec,
            {
              markerMenuItems: wt,
              localizedStrings: w,
              searchRef: _t
            }
          )
        }
      )
    ] })
  ] });
}
const Bp = Object.freeze([
  ..._c,
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
  ...hc
]);
function Ua(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Mc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, w) => {
    const c = w === s.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Vr(t, l, n, !0, a),
      c && o
    ] }, Ua(t, l));
  });
}
function Vr(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = f(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(nr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(nr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return Ic(
        s,
        Ua(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Ic(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      nr,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Vr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function Oc({
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
  /* @__PURE__ */ p("span", { className: f("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ p(ct, { children: [
    Vr(t.marker, [i], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", y = f(h, u);
  return /* @__PURE__ */ p(ct, { children: [
    /* @__PURE__ */ p("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", y), children: [
      w,
      d
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
        children: l && l.length > 0 && /* @__PURE__ */ r(ct, { children: Mc(t.marker, l, o, c) })
      }
    )
  ] });
}
function Kp({
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
  const d = w ?? di(n, void 0), m = (v, _) => {
    c == null || c(v, _, a);
  }, h = s ? n.findIndex((v) => v === s) : -1, [u, g] = S(h), y = (v, _, C) => {
    if (n.length)
      switch (v.key) {
        case "Enter":
        case " ":
          v.preventDefault(), c == null || c(_, C, a);
          break;
      }
  }, x = (v) => {
    if (n.length)
      switch (v.key) {
        case "ArrowDown":
          v.preventDefault(), g((_) => Math.min(_ + 1, n.length - 1));
          break;
        case "ArrowUp":
          v.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, R = q([]);
  return H(() => {
    var v;
    u >= 0 && u < R.current.length && ((v = R.current[u]) == null || v.focus());
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
          children: n.map((v, _) => {
            const C = v === s, z = `${a}-${_}`;
            return /* @__PURE__ */ p(ct, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (V) => {
                    R.current[_] = V;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": v.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: _ === u ? 0 : -1,
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
                  onClick: () => m(v, _),
                  onKeyDown: (V) => y(V, v, _),
                  children: /* @__PURE__ */ r(
                    Oc,
                    {
                      footnote: v,
                      layout: o,
                      formatCaller: () => d(v.caller, _),
                      showMarkers: i
                    }
                  )
                },
                z
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(ze, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Ac(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function Pc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = F(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p($n, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Ln, { stickyHeader: !0, children: /* @__PURE__ */ p(Qt, { children: [
      /* @__PURE__ */ r(cn, { children: a }),
      /* @__PURE__ */ r(cn, { children: s })
    ] }) }),
    /* @__PURE__ */ r(Vn, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ p(
      Qt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Ee, { children: _e(l.reference, "English") }),
          /* @__PURE__ */ r(Ee, { className: o, children: Ac(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const jr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ir.Root,
  {
    ref: n,
    className: f(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      ir.Indicator,
      {
        className: f("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
jr.displayName = ir.Root.displayName;
const $c = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Ys, { className: "tw-h-4 tw-w-4" });
}, jn = (t, e, n) => /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ p(
    Et,
    {
      className: f("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        $c(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(kt, { side: "bottom", children: e })
] }) }), Up = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => jn(e, t)
}), Lc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => jn(n, t)
}), Gp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => jn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Jn = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((w) => {
    e === "approved" ? i.includes(w) || i.push(w) : i = i.filter((c) => c !== w);
  }), o(i);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), s(l);
}, qp = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => jn(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(Ar, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        an,
        {
          onClick: (w) => {
            w.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(Us, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (w) => {
            w.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(Gs, {})
        }
      ),
      /* @__PURE__ */ r(
        an,
        {
          onClick: (w) => {
            w.stopPropagation(), Jn(
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
          children: /* @__PURE__ */ r(qs, {})
        }
      )
    ] });
  }
}), Hp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Yp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Xp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Vc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Wp = Object.freeze([
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
]), jc = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, zc = (t, e, n) => t.map((o) => {
  const a = Yr(o.key) ? o.key : o.key[0];
  return {
    items: Yr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Vc(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ut = (t, e) => t[e] ?? e;
function Jp({
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
  onItemSelected: h
}) {
  const u = Ut(n, "%webView_inventory_all%"), g = Ut(n, "%webView_inventory_approved%"), y = Ut(n, "%webView_inventory_unapproved%"), x = Ut(n, "%webView_inventory_unknown%"), R = Ut(n, "%webView_inventory_scope_currentBook%"), v = Ut(n, "%webView_inventory_scope_chapter%"), _ = Ut(n, "%webView_inventory_scope_verse%"), C = Ut(n, "%webView_inventory_filter_text%"), z = Ut(
    n,
    "%webView_inventory_show_additional_items%"
  ), V = Ut(n, "%webView_inventory_no_results%"), [$, T] = S(!1), [D, E] = S("all"), [P, O] = S(""), [Y, L] = S([]), J = F(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : zc(K, a, s);
  }, [t, a, s]), N = F(() => {
    if ($) return J;
    const K = [];
    return J.forEach((wt) => {
      const Z = wt.items[0], ft = K.find(
        (vt) => vt.items[0] === Z
      );
      ft ? (ft.count += wt.count, ft.occurrences = ft.occurrences.concat(wt.occurrences)) : K.push({
        items: [Z],
        count: wt.count,
        occurrences: wt.occurrences,
        status: wt.status
      });
    }), K;
  }, [$, J]), U = F(() => N.length === 0 ? [] : jc(N, D, P), [N, D, P]), mt = F(() => {
    var Z, ft;
    if (!$) return w;
    const K = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
    if (!K) return w;
    const wt = [];
    for (let vt = 0; vt < K; vt++)
      wt.push(
        Lc(
          ((ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft[vt]) || "Additional Item",
          vt + 1
        )
      );
    return [...wt, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, $]);
  H(() => {
    U.length === 0 ? L([]) : U.length === 1 && L(U[0].items);
  }, [U]);
  const bt = (K, wt) => {
    wt.setRowSelection(() => {
      const ft = {};
      return ft[K.index] = !0, ft;
    });
    const Z = K.original.items;
    L(Z), h && Z.length > 0 && h(Z[0]);
  }, St = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, ht = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      E(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, _t = F(() => {
    if (N.length === 0 || Y.length === 0) return [];
    const K = N.filter((wt) => pi(
      $ ? wt.items : [wt.items[0]],
      Y
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [Y, $, N]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Fe,
        {
          onValueChange: (K) => ht(K),
          defaultValue: D,
          children: [
            /* @__PURE__ */ r(De, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Be, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Me, { children: [
              /* @__PURE__ */ r($t, { value: "all", children: u }),
              /* @__PURE__ */ r($t, { value: "approved", children: g }),
              /* @__PURE__ */ r($t, { value: "unapproved", children: y }),
              /* @__PURE__ */ r($t, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Fe, { onValueChange: (K) => St(K), defaultValue: i, children: [
        /* @__PURE__ */ r(De, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Be, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Me, { children: [
          /* @__PURE__ */ r($t, { value: "book", children: R }),
          /* @__PURE__ */ r($t, { value: "chapter", children: v }),
          /* @__PURE__ */ r($t, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        We,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: C,
          value: P,
          onChange: (K) => {
            O(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ p(Ct, { children: [
        /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            jr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: $,
              onCheckedChange: (K) => {
                T(K);
              }
            }
          ),
          /* @__PURE__ */ r(gt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? z })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: (o == null ? void 0 : o.checkboxText) ?? z })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      cc,
      {
        columns: mt,
        data: U,
        onRowClickHandler: bt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: V
      }
    ) }),
    _t.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Pc,
      {
        classNameForText: m,
        occurrenceData: _t,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const Fc = "16rem", Bc = "3rem", Ga = b.createContext(void 0);
function zn() {
  const t = b.useContext(Ga);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const qa = b.forwardRef(
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
    const [c, d] = b.useState(t), m = e ?? c, h = b.useCallback(
      (_) => {
        const C = typeof _ == "function" ? _(m) : _;
        n ? n(C) : d(C);
      },
      [n, m]
    ), u = b.useCallback(() => h((_) => !_), [h]), g = m ? "expanded" : "collapsed", R = ut() === "ltr" ? i : i === "primary" ? "secondary" : "primary", v = b.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: h,
        toggleSidebar: u,
        side: R
      }),
      [g, m, h, u, R]
    );
    return /* @__PURE__ */ r(Ga.Provider, { value: v, children: /* @__PURE__ */ r(Nt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Fc,
            "--sidebar-width-icon": Bc,
            ...a
          }
        ),
        className: f(
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
qa.displayName = "SidebarProvider";
const Ha = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = zn();
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
Ha.displayName = "Sidebar";
const Kc = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = zn();
  return /* @__PURE__ */ p(
    j,
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
        a.side === "primary" ? /* @__PURE__ */ r(Xs, {}) : /* @__PURE__ */ r(Ws, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Kc.displayName = "SidebarTrigger";
const Uc = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = zn();
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
Uc.displayName = "SidebarRail";
const Ya = b.forwardRef(
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
Ya.displayName = "SidebarInset";
const Gc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  We,
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
Gc.displayName = "SidebarInput";
const qc = b.forwardRef(
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
qc.displayName = "SidebarHeader";
const Hc = b.forwardRef(
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
Hc.displayName = "SidebarFooter";
const Yc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze,
  {
    ref: n,
    "data-sidebar": "separator",
    className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Yc.displayName = "SidebarSeparator";
const Xa = b.forwardRef(
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
Xa.displayName = "SidebarContent";
const gr = b.forwardRef(
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
gr.displayName = "SidebarGroup";
const br = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ge : "div",
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
br.displayName = "SidebarGroupLabel";
const Xc = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ge : "button",
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
Xc.displayName = "SidebarGroupAction";
const vr = b.forwardRef(
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
vr.displayName = "SidebarGroupContent";
const Wa = b.forwardRef(
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
Wa.displayName = "SidebarMenu";
const Ja = b.forwardRef(
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
Ja.displayName = "SidebarMenuItem";
const Wc = ge(
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
), Za = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const w = t ? Ge : "button", { state: c } = zn(), d = /* @__PURE__ */ r(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: f(Wc({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: d }),
      /* @__PURE__ */ r(kt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : d;
  }
);
Za.displayName = "SidebarMenuButton";
const Jc = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ge : "button",
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
Jc.displayName = "SidebarMenuAction";
const Zc = b.forwardRef(
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
Zc.displayName = "SidebarMenuBadge";
const Qc = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
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
Qc.displayName = "SidebarMenuSkeleton";
const td = b.forwardRef(
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
td.displayName = "SidebarMenuSub";
const ed = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
ed.displayName = "SidebarMenuSubItem";
const nd = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? Ge : "a",
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
nd.displayName = "SidebarMenuSubButton";
function rd({
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
  const c = B(
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
    Ha,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ p(Xa, { children: [
        /* @__PURE__ */ p(gr, { children: [
          /* @__PURE__ */ r(br, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(vr, { children: /* @__PURE__ */ r(Wa, { children: Object.entries(e).map(([h, u]) => /* @__PURE__ */ r(Ja, { children: /* @__PURE__ */ r(
            Za,
            {
              onClick: () => c(h),
              isActive: m(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ p(gr, { children: [
          /* @__PURE__ */ r(br, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(vr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            dr,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: cl },
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = d(h);
                c(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Js, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const zr = dn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const w = ut();
    return /* @__PURE__ */ p("div", { id: i, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        No,
        {
          className: f(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        We,
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
        j,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": w === "rtl" },
            { "tw-right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
zr.displayName = "SearchBar";
function Zp({
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
      zr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      qa,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            rd,
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
          /* @__PURE__ */ r(Ya, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ce = "scrBook", od = "scrRef", Ne = "source", ad = "details", sd = "Scripture Reference", id = "Scripture Book", Qa = "Type", ld = "Details";
function wd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ce,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? sd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? pt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ce ? _e(a.start) : void 0;
      },
      getGroupingValue: (o) => pt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => rr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => _e(o.start),
      id: od,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : _e(a.start);
      },
      sortingFn: (o, a) => rr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ne,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Qa : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: ad,
      header: (t == null ? void 0 : t.detailsColumnName) ?? ld,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const cd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || rr(t.start, t.end) === 0 ? `${Fn(t.start)}+${e}` : `${Fn(t.start)}+${e}-${Fn(t.end)}+${n}`;
}, vo = (t) => `${cd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Qp({
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
  const [c, d] = S([]), [m, h] = S([{ id: ce, desc: !1 }]), [u, g] = S({}), y = F(
    () => t.flatMap((D) => D.data.map((E) => ({
      ...E,
      source: D.source
    }))),
    [t]
  ), x = F(
    () => wd(
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
    c.includes(Ne) ? h([
      { id: Ne, desc: !1 },
      { id: ce, desc: !1 }
    ]) : h([{ id: ce, desc: !1 }]);
  }, [c]);
  const R = Yo({
    data: y,
    columns: x,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: rl(),
    getGroupedRowModel: nl(),
    getCoreRowModel: Wo(),
    getSortedRowModel: Xo(),
    getRowId: vo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  H(() => {
    if (l) {
      const D = R.getSelectedRowModel().rowsById, E = Object.keys(D);
      if (E.length === 1) {
        const P = y.find((O) => vo(O) === E[0]) || void 0;
        P && l(P);
      }
    }
  }, [u, y, l, R]);
  const v = a ?? id, _ = s ?? Qa, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${v}`, value: [ce] },
    { label: `Group by ${_}`, value: [Ne] },
    {
      label: `Group by ${v} and ${_}`,
      value: [ce, Ne]
    },
    {
      label: `Group by ${_} and ${v}`,
      value: [Ne, ce]
    }
  ], z = (D) => {
    d(JSON.parse(D));
  }, V = (D, E) => {
    !D.getIsGrouped() && !D.getIsSelected() && D.getToggleSelectedHandler()(E);
  }, $ = (D, E) => D.getIsGrouped() ? "" : f("banded-row", E % 2 === 0 ? "even" : "odd"), T = (D, E, P) => {
    if (!((D == null ? void 0 : D.length) === 0 || E.depth < P.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ p("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      Fe,
      {
        value: JSON.stringify(c),
        onValueChange: (D) => {
          z(D);
        },
        children: [
          /* @__PURE__ */ r(De, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Be, {}) }),
          /* @__PURE__ */ r(Me, { position: "item-aligned", children: /* @__PURE__ */ r(Qw, { children: C.map((D) => /* @__PURE__ */ r($t, { value: JSON.stringify(D.value), children: D.label }, D.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p($n, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Ln, { children: R.getHeaderGroups().map((D) => /* @__PURE__ */ r(Qt, { children: D.headers.filter((E) => E.column.columnDef.header).map((E) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(cn, { colSpan: E.colSpan, className: "top-0 tw-sticky", children: E.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          E.column.getCanGroup() ? /* @__PURE__ */ r(
            j,
            {
              variant: "ghost",
              title: `Toggle grouping by ${E.column.columnDef.header}`,
              onClick: E.column.getToggleGroupingHandler(),
              type: "button",
              children: E.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          nn(E.column.columnDef.header, E.getContext())
        ] }) }, E.id)
      )) }, D.id)) }),
      /* @__PURE__ */ r(Vn, { children: R.getRowModel().rows.map((D, E) => {
        const P = ut();
        return /* @__PURE__ */ r(
          Qt,
          {
            "data-state": D.getIsSelected() ? "selected" : "",
            className: f($(D, E)),
            onClick: (O) => V(D, O),
            children: D.getVisibleCells().map((O) => {
              if (!(O.getIsPlaceholder() || O.column.columnDef.enableGrouping && !O.getIsGrouped() && (O.column.columnDef.id !== Ne || !n)))
                return /* @__PURE__ */ r(
                  Ee,
                  {
                    className: f(
                      O.column.columnDef.id,
                      "tw-p-[1px]",
                      T(c, D, O)
                    ),
                    children: O.getIsGrouped() ? /* @__PURE__ */ p(
                      j,
                      {
                        variant: "link",
                        onClick: D.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          D.getIsExpanded() && /* @__PURE__ */ r(Ue, {}),
                          !D.getIsExpanded() && (P === "ltr" ? /* @__PURE__ */ r($e, {}) : /* @__PURE__ */ r(er, {})),
                          " ",
                          nn(O.column.columnDef.cell, O.getContext()),
                          " (",
                          D.subRows.length,
                          ")"
                        ]
                      }
                    ) : nn(O.column.columnDef.cell, O.getContext())
                  },
                  O.id
                );
            })
          },
          D.id
        );
      }) })
    ] })
  ] });
}
const Fr = (t, e) => t.filter((n) => {
  try {
    return en(n) === e;
  } catch {
    return !1;
  }
}), ts = (t, e, n) => Fr(t, e).every((o) => n.includes(o));
function dd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Fr(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    j,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        ts(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: bl(
        t,
        i,
        l,
        w,
        c
      )
    }
  );
}
const xo = 5, Zn = 6;
function pd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, R] = S(!1), [v, _] = S(""), C = q(void 0), z = q(!1);
  if (t.length !== pt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const V = F(() => pt.allBookIds.filter(
    (L, J) => t[J] === "1" && !pt.isObsolete(pt.bookIdToNumber(L))
  ), [t]), $ = F(() => {
    if (!v.trim()) {
      const N = {
        [X.OT]: [],
        [X.NT]: [],
        [X.DC]: [],
        [X.Extra]: []
      };
      return V.forEach((U) => {
        const mt = en(U);
        N[mt].push(U);
      }), N;
    }
    const L = V.filter(
      (N) => Tr(N, v, a)
    ), J = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return L.forEach((N) => {
      const U = en(N);
      J[U].push(N);
    }), J;
  }, [V, v, a]), T = B(
    (L, J = !1) => {
      if (!J || !C.current) {
        n(
          e.includes(L) ? e.filter((ht) => ht !== L) : [...e, L]
        ), C.current = L;
        return;
      }
      const N = V.findIndex((ht) => ht === C.current), U = V.findIndex((ht) => ht === L);
      if (N === -1 || U === -1) return;
      const [mt, bt] = [
        Math.min(N, U),
        Math.max(N, U)
      ], St = V.slice(mt, bt + 1).map((ht) => ht);
      n(
        e.includes(L) ? e.filter((ht) => !St.includes(ht)) : [.../* @__PURE__ */ new Set([...e, ...St])]
      );
    },
    [e, n, V]
  ), D = (L) => {
    T(L, z.current), z.current = !1;
  }, E = (L, J) => {
    L.preventDefault(), T(J, L.shiftKey);
  }, P = B(
    (L) => {
      const J = Fr(V, L).map((N) => N);
      n(
        ts(V, L, e) ? e.filter((N) => !J.includes(N)) : [.../* @__PURE__ */ new Set([...e, ...J])]
      );
    },
    [e, n, V]
  ), O = () => {
    n(V.map((L) => L));
  }, Y = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(X).map((L) => /* @__PURE__ */ r(
      dd,
      {
        section: L,
        availableBookIds: V,
        selectedBookIds: e,
        onToggle: P,
        localizedStrings: o
      },
      L
    )) }),
    /* @__PURE__ */ p(
      oe,
      {
        open: x,
        onOpenChange: (L) => {
          R(L), L || _("");
        },
        children: [
          /* @__PURE__ */ r(be, { asChild: !0, children: /* @__PURE__ */ p(
            j,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(To, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Xt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ne,
            {
              shouldFilter: !1,
              onKeyDown: (L) => {
                L.key === "Enter" && (z.current = L.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ye,
                  {
                    placeholder: l,
                    value: v,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(j, { variant: "ghost", size: "sm", onClick: O, children: w }),
                  /* @__PURE__ */ r(j, { variant: "ghost", size: "sm", onClick: Y, children: c })
                ] }),
                /* @__PURE__ */ p(re, { children: [
                  /* @__PURE__ */ r(un, { children: d }),
                  Object.values(X).map((L, J) => {
                    const N = $[L];
                    if (N.length !== 0)
                      return /* @__PURE__ */ p(yo, { children: [
                        /* @__PURE__ */ r(
                          qt,
                          {
                            heading: ra(L, h, u, g, y),
                            children: N.map((U) => /* @__PURE__ */ r(
                              aa,
                              {
                                bookId: U,
                                isSelected: e.includes(U),
                                onSelect: () => D(U),
                                onMouseDown: (mt) => E(mt, U),
                                section: en(U),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: cr(U, a),
                                className: "tw-flex tw-items-center"
                              },
                              U
                            ))
                          }
                        ),
                        J < Object.values(X).length - 1 && /* @__PURE__ */ r(Cr, {})
                      ] }, L);
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
        e.length === Zn ? Zn : xo
      ).map((L) => /* @__PURE__ */ r(je, { className: "hover:tw-bg-secondary", variant: "secondary", children: Pe(L, a) }, L)),
      e.length > Zn && /* @__PURE__ */ r(
        je,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - xo} ${m}`
        }
      )
    ] })
  ] });
}
const tu = Object.freeze([
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
]), xe = (t, e) => t[e] ?? e;
function eu({
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
  const c = xe(
    i,
    "%webView_scope_selector_selected_text%"
  ), d = xe(
    i,
    "%webView_scope_selector_current_verse%"
  ), m = xe(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = xe(i, "%webView_scope_selector_current_book%"), u = xe(i, "%webView_scope_selector_choose_books%"), g = xe(i, "%webView_scope_selector_scope%"), y = xe(i, "%webView_scope_selector_select_books%"), x = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], R = e ? x.filter((v) => e.includes(v.value)) : x;
  return /* @__PURE__ */ p("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(gt, { children: g }),
      /* @__PURE__ */ r(
        Rr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: R.map(({ value: v, label: _, id: C }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, { className: "tw-me-2", value: v, id: C }),
            /* @__PURE__ */ r(gt, { htmlFor: C, children: _ })
          ] }, C))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(gt, { children: y }),
      /* @__PURE__ */ r(
        pd,
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
const Qn = {
  [tt("undefined")]: "Ø",
  [tt(0)]: "A",
  [tt(1)]: "B",
  [tt(2)]: "C",
  [tt(3)]: "D",
  [tt(4)]: "E",
  [tt(5)]: "F",
  [tt(6)]: "G",
  [tt(7)]: "H",
  [tt(8)]: "I",
  [tt(9)]: "J",
  [tt(10)]: "K",
  [tt(11)]: "L",
  [tt(12)]: "M",
  [tt(13)]: "N",
  [tt(14)]: "O",
  [tt(15)]: "P",
  [tt(16)]: "Q",
  [tt(17)]: "R",
  [tt(18)]: "S",
  [tt(19)]: "T",
  [tt(20)]: "U",
  [tt(21)]: "V",
  [tt(22)]: "W",
  [tt(23)]: "X",
  [tt(24)]: "Y",
  [tt(25)]: "Z"
};
function nu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Qn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, d]) => [
          c,
          c === d && c in Qn ? Qn[c] : d
        ]
      )
    )
  }, w = ut();
  return /* @__PURE__ */ p(
    Fe,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(De, { size: a, className: f("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Be,
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Me,
          {
            id: i,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: He },
            children: t.map((c) => /* @__PURE__ */ r($t, { value: `${c}`, children: l[tt(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function ru({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function ou({
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
function au({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(ze, {}) : ""
  ] });
}
function es(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function Sn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: f("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ns = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    Rn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(Sn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(Sn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Yw, { children: [
    /* @__PURE__ */ r(ja, { children: l.label }),
    /* @__PURE__ */ r(Hw, { children: /* @__PURE__ */ r(za, { children: ns(
      t,
      e,
      es(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(kt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function xr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(he, { variant: s, children: [
    /* @__PURE__ */ r(Se, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(j, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Zs, {}) }) }),
    /* @__PURE__ */ r(ee, { align: "start", style: { zIndex: He }, children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ p(yo, { children: [
      /* @__PURE__ */ r(Va, { children: /* @__PURE__ */ r(Nt, { children: ns(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ r(Xe, {})
    ] }, w)) })
  ] });
}
const rs = b.forwardRef(
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
function su({
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
  return /* @__PURE__ */ p(rs, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      xr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(Qs, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        xr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ti, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function iu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(rs, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
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
const os = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ r(
    Rt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
os.displayName = Rt.List.displayName;
const as = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.List,
  {
    ref: n,
    className: f(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
as.displayName = Rt.List.displayName;
const ud = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Trigger,
  {
    ref: n,
    ...e,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), ss = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Content,
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
ss.displayName = Rt.Content.displayName;
function lu({
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
        zr,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(os, { children: [
      /* @__PURE__ */ r(as, { children: t.map((l) => /* @__PURE__ */ r(ud, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(ss, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function md({ ...t }) {
  return /* @__PURE__ */ r(at.Menu, { ...t });
}
function fd({ ...t }) {
  return /* @__PURE__ */ r(at.Sub, { "data-slot": "menubar-sub", ...t });
}
const is = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Lr.Provider, { value: a, children: /* @__PURE__ */ r(
    at.Root,
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
is.displayName = at.Root.displayName;
const ls = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Bt();
  return /* @__PURE__ */ r(
    at.Trigger,
    {
      ref: n,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        ae({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ls.displayName = at.Trigger.displayName;
const ws = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Bt();
  return /* @__PURE__ */ p(
    at.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r($e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ws.displayName = at.SubTrigger.displayName;
const cs = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Bt();
  return /* @__PURE__ */ r(
    at.SubContent,
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
cs.displayName = at.SubContent.displayName;
const ds = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Bt();
  return /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
    at.Content,
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
ds.displayName = at.Content.displayName;
const ps = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Bt();
  return /* @__PURE__ */ r(
    at.Item,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ae({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ps.displayName = at.Item.displayName;
const hd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Bt();
  return /* @__PURE__ */ p(
    at.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
hd.displayName = at.CheckboxItem.displayName;
const gd = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Bt();
  return /* @__PURE__ */ p(
    at.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Mn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
gd.displayName = at.RadioItem.displayName;
const bd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
bd.displayName = at.Label.displayName;
const us = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
us.displayName = at.Separator.displayName;
const Qe = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ms = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        ps,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(Sn, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(Sn, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ p(fd, { children: [
        /* @__PURE__ */ r(ws, { children: c.label }),
        /* @__PURE__ */ r(cs, { children: ms(
          t,
          e,
          es(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(kt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && i < a.length - 1 && w.push(/* @__PURE__ */ r(us, {}, `separator-${s}`)), w;
  });
};
function vd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = q(void 0), s = q(void 0), i = q(void 0), l = q(void 0), w = q(void 0), c = (d) => {
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
  if (il(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, m) => {
    var g, y, x, R;
    d.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        Qe(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Qe(s, [h, u]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), Qe(i, [h, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), Qe(l, [h, u]);
        break;
      case "alt+h":
        (R = w.current) == null || R.focus(), Qe(w, [h, u]);
        break;
    }
  }), H(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const y = g.target.getAttribute("data-state");
          n(y === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(is, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, m]) => typeof d == "boolean" || typeof m == "boolean" ? 0 : d.order - m.order).map(([d, m]) => /* @__PURE__ */ p(md, { children: [
      /* @__PURE__ */ r(ls, { ref: c(d), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        ds,
        {
          style: { zIndex: He },
          children: /* @__PURE__ */ r(Nt, { children: ms(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function wu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function cu({
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
                    vd,
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
const xd = (t, e) => t[e] ?? e;
function du({
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
  const c = xd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, m] = S(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((y) => y !== g)]), s && n.find((y) => y === g) && s([...n.filter((y) => y !== g)]), m(!1);
  }, u = (g, y) => {
    var R, v, _, C, z, V;
    const x = y !== g ? ((v = (R = t[g]) == null ? void 0 : R.uiNames) == null ? void 0 : v[y]) ?? ((C = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : C.en) : void 0;
    return x ? `${(z = t[g]) == null ? void 0 : z.autonym} (${x})` : (V = t[g]) == null ? void 0 : V.autonym;
  };
  return /* @__PURE__ */ p("div", { id: w, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Fe,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: d,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(De, { children: /* @__PURE__ */ r(Be, {}) }),
          /* @__PURE__ */ r(
            Me,
            {
              style: { zIndex: He },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r($t, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(gt, { className: "tw-font-normal tw-text-muted-foreground", children: ke(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function yd({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(gt, { children: e(t) }) : n ? /* @__PURE__ */ r(gt, { children: n(t) }) : /* @__PURE__ */ r(gt, { children: t });
}
function pu({
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
      jr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ r(
      yd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function uu({
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
        s
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && l,
            !e && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: w }),
            !e && h && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(he, { children: [
              /* @__PURE__ */ r(Se, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(j, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Hr, {}) }) }),
              /* @__PURE__ */ r(ee, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(he, { children: [
              /* @__PURE__ */ r(Se, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(j, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Hr, {}) }) }),
              /* @__PURE__ */ r(ee, { align: "end", children: c })
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
const Nd = dn(({ className: t, ...e }, n) => /* @__PURE__ */ r(ei, { size: 35, className: f("tw-animate-spin", t), ...e, ref: n }));
Nd.displayName = "Spinner";
function mu({
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
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      gt,
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
      We,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: f(w, { "tw-border-red-600": n }),
        defaultValue: c,
        value: d,
        onChange: m,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
const kd = ge(
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
), _d = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: f(
      // CUSTOM
      "pr-twp",
      kd({ variant: e }),
      t
    ),
    ...n
  }
));
_d.displayName = "Alert";
const Cd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ p(
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
Cd.displayName = "AlertTitle";
const Ed = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Ed.displayName = "AlertDescription";
const fu = st.Root, hu = st.Trigger, gu = st.Group, bu = st.Portal, vu = st.Sub, xu = st.RadioGroup, Td = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  st.SubTrigger,
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
      /* @__PURE__ */ r($e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Td.displayName = st.SubTrigger.displayName;
const Rd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.SubContent,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Rd.displayName = st.SubContent.displayName;
const Sd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(st.Portal, { children: /* @__PURE__ */ r(
  st.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
Sd.displayName = st.Content.displayName;
const Dd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Item,
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
Dd.displayName = st.Item.displayName;
const Md = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  st.CheckboxItem,
  {
    ref: a,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Md.displayName = st.CheckboxItem.displayName;
const Id = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  st.RadioItem,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(Mn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Id.displayName = st.RadioItem.displayName;
const Od = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Label,
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
Od.displayName = st.Label.displayName;
const Ad = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Ad.displayName = st.Separator.displayName;
function Pd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Pd.displayName = "ContextMenuShortcut";
const fs = b.createContext({
  direction: "bottom"
});
function $d({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(fs.Provider, { value: o, children: /* @__PURE__ */ r(
    Ft.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
$d.displayName = "Drawer";
const yu = Ft.Trigger, Ld = Ft.Portal, Nu = Ft.Close, hs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Overlay,
  {
    ref: n,
    className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
hs.displayName = Ft.Overlay.displayName;
const Vd = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(fs), i = {
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
  return /* @__PURE__ */ p(Ld, { children: [
    /* @__PURE__ */ r(hs, {}),
    /* @__PURE__ */ p(
      Ft.Content,
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
Vd.displayName = "DrawerContent";
function jd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
jd.displayName = "DrawerHeader";
function zd({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
zd.displayName = "DrawerFooter";
const Fd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Fd.displayName = Ft.Title.displayName;
const Bd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Bd.displayName = Ft.Description.displayName;
const Kd = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  lr.Root,
  {
    ref: o,
    className: f(
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
Kd.displayName = lr.Root.displayName;
function ku({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    _r.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const _u = _r.Panel;
function Cu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    _r.PanelResizeHandle,
    {
      className: f(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(ni, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Eu({ ...t }) {
  return /* @__PURE__ */ r(
    ll,
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
const Ud = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ p(
    tn.Root,
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(tn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(tn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(tn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Ud.displayName = tn.Root.displayName;
const Gd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ r(
    wr.Root,
    {
      className: f(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        wr.Thumb,
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
Gd.displayName = wr.Root.displayName;
const Tu = Rt.Root, qd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ut();
  return /* @__PURE__ */ r(
    Rt.List,
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
qd.displayName = Rt.List.displayName;
const Hd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Trigger,
  {
    ref: n,
    className: f(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Hd.displayName = Rt.Trigger.displayName;
const Yd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Yd.displayName = Rt.Content.displayName;
const Xd = b.forwardRef(
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
Xd.displayName = "Textarea";
const Ru = (t, e) => {
  H(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Wd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Jd = (t, e, n = {}) => {
  const o = q(e);
  o.current = e;
  const a = q(n);
  a.current = Wd(a.current);
  const [s, i] = S(() => o.current), [l, w] = S(!0);
  return H(() => {
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
}, tr = () => !1, Su = (t, e) => {
  const [n] = Jd(
    B(async () => {
      if (!t) return tr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    tr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  H(() => () => {
    n !== tr && n();
  }, [n]);
};
function Du(t) {
  H(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Zd(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Zd(`*, ::before, ::after {
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
  _d as Alert,
  Ed as AlertDescription,
  Cd as AlertTitle,
  $a as Avatar,
  La as AvatarFallback,
  qw as AvatarImage,
  Tp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Rp as BOOK_SELECTOR_STRING_KEYS,
  je as Badge,
  Ep as BookChapterControl,
  pr as BookSelectionMode,
  Sp as BookSelector,
  j as Button,
  Mp as COMMENT_EDITOR_STRING_KEYS,
  Ip as COMMENT_LIST_STRING_KEYS,
  Aa as Card,
  Pa as CardContent,
  Uw as CardDescription,
  Gw as CardFooter,
  Bw as CardHeader,
  Kw as CardTitle,
  El as ChapterRangeSelector,
  jr as Checkbox,
  pu as Checklist,
  dr as ComboBox,
  ne as Command,
  un as CommandEmpty,
  qt as CommandGroup,
  Ye as CommandInput,
  Yt as CommandItem,
  re as CommandList,
  Dp as CommentEditor,
  Op as CommentList,
  fu as ContextMenu,
  Md as ContextMenuCheckboxItem,
  Sd as ContextMenuContent,
  gu as ContextMenuGroup,
  Dd as ContextMenuItem,
  Od as ContextMenuLabel,
  bu as ContextMenuPortal,
  xu as ContextMenuRadioGroup,
  Id as ContextMenuRadioItem,
  Ad as ContextMenuSeparator,
  Pd as ContextMenuShortcut,
  vu as ContextMenuSub,
  Rd as ContextMenuSubContent,
  Td as ContextMenuSubTrigger,
  hu as ContextMenuTrigger,
  cc as DataTable,
  ml as Dialog,
  _p as DialogClose,
  Qo as DialogContent,
  gl as DialogDescription,
  hl as DialogFooter,
  ta as DialogHeader,
  Zo as DialogOverlay,
  fl as DialogPortal,
  ea as DialogTitle,
  kp as DialogTrigger,
  $d as Drawer,
  Nu as DrawerClose,
  Vd as DrawerContent,
  Bd as DrawerDescription,
  zd as DrawerFooter,
  jd as DrawerHeader,
  hs as DrawerOverlay,
  Ld as DrawerPortal,
  Fd as DrawerTitle,
  yu as DrawerTrigger,
  he as DropdownMenu,
  te as DropdownMenuCheckboxItem,
  ee as DropdownMenuContent,
  Va as DropdownMenuGroup,
  Rn as DropdownMenuItem,
  uc as DropdownMenuItemType,
  mn as DropdownMenuLabel,
  Hw as DropdownMenuPortal,
  Xw as DropdownMenuRadioGroup,
  Fa as DropdownMenuRadioItem,
  Xe as DropdownMenuSeparator,
  Ww as DropdownMenuShortcut,
  Yw as DropdownMenuSub,
  za as DropdownMenuSubContent,
  ja as DropdownMenuSubTrigger,
  Se as DropdownMenuTrigger,
  dc as ERROR_DUMP_STRING_KEYS,
  Pp as ERROR_POPOVER_STRING_KEYS,
  bc as EditorKeyboardShortcuts,
  pc as ErrorDump,
  $p as ErrorPopover,
  Bp as FOOTNOTE_EDITOR_STRING_KEYS,
  zp as Filter,
  Lp as FilterDropdown,
  jp as Footer,
  Fp as FootnoteEditor,
  Oc as FootnoteItem,
  Kp as FootnoteList,
  Wp as INVENTORY_STRING_KEYS,
  We as Input,
  Jp as Inventory,
  gt as Label,
  _c as MARKER_MENU_STRING_KEYS,
  Ap as MarkdownRenderer,
  Ec as MarkerMenu,
  Vp as MoreInfo,
  fc as MultiSelectComboBox,
  lu as NavigationContentSearch,
  oe as Popover,
  vl as PopoverAnchor,
  Xt as PopoverContent,
  be as PopoverTrigger,
  Kd as Progress,
  Rr as RadioGroup,
  Cn as RadioGroupItem,
  xl as RecentSearches,
  Cu as ResizableHandle,
  _u as ResizablePanel,
  ku as ResizablePanelGroup,
  uu as ResultsCard,
  tu as SCOPE_SELECTOR_STRING_KEYS,
  eu as ScopeSelector,
  Qp as ScriptureResultsViewer,
  nu as ScrollGroupSelector,
  zr as SearchBar,
  Fe as Select,
  Me as SelectContent,
  Qw as SelectGroup,
  $t as SelectItem,
  ec as SelectLabel,
  Ka as SelectScrollDownButton,
  Ba as SelectScrollUpButton,
  nc as SelectSeparator,
  De as SelectTrigger,
  Be as SelectValue,
  ze as Separator,
  ru as SettingsList,
  au as SettingsListHeader,
  ou as SettingsListItem,
  rd as SettingsSidebar,
  Zp as SettingsSidebarContentSearch,
  Ha as Sidebar,
  Xa as SidebarContent,
  Hc as SidebarFooter,
  gr as SidebarGroup,
  Xc as SidebarGroupAction,
  vr as SidebarGroupContent,
  br as SidebarGroupLabel,
  qc as SidebarHeader,
  Gc as SidebarInput,
  Ya as SidebarInset,
  Wa as SidebarMenu,
  Jc as SidebarMenuAction,
  Zc as SidebarMenuBadge,
  Za as SidebarMenuButton,
  Ja as SidebarMenuItem,
  Qc as SidebarMenuSkeleton,
  td as SidebarMenuSub,
  nd as SidebarMenuSubButton,
  ed as SidebarMenuSubItem,
  qa as SidebarProvider,
  Uc as SidebarRail,
  Yc as SidebarSeparator,
  Kc as SidebarTrigger,
  hr as Skeleton,
  Ud as Slider,
  Eu as Sonner,
  Nd as Spinner,
  Gd as Switch,
  xr as TabDropdownMenu,
  iu as TabFloatingMenu,
  su as TabToolbar,
  $n as Table,
  Vn as TableBody,
  wc as TableCaption,
  Ee as TableCell,
  ac as TableFooter,
  cn as TableHead,
  Ln as TableHeader,
  Qt as TableRow,
  Tu as Tabs,
  Yd as TabsContent,
  qd as TabsList,
  Hd as TabsTrigger,
  mu as TextField,
  Xd as Textarea,
  Ar as ToggleGroup,
  an as ToggleGroupItem,
  cu as Toolbar,
  Ct as Tooltip,
  kt as TooltipContent,
  Nt as TooltipProvider,
  Et as TooltipTrigger,
  hc as UNDO_REDO_BUTTONS_STRING_KEYS,
  du as UiLanguageSelector,
  gc as UndoRedoButtons,
  os as VerticalTabs,
  ss as VerticalTabsContent,
  as as VerticalTabsList,
  ud as VerticalTabsTrigger,
  He as Z_INDEX_ABOVE_DOCK,
  Jo as Z_INDEX_FOOTNOTE_EDITOR,
  pl as Z_INDEX_MODAL,
  dl as Z_INDEX_MODAL_BACKDROP,
  cl as Z_INDEX_OVERLAY,
  Fw as badgeVariants,
  sa as buttonVariants,
  f as cn,
  Xp as getBookIdFromUSFM,
  jn as getInventoryHeader,
  Hp as getLinesFromUSFM,
  Yp as getNumberFromUSFM,
  Vc as getStatusForItem,
  wu as getToolbarOSReservedSpaceClassName,
  Gp as inventoryCountColumn,
  Up as inventoryItemColumn,
  qp as inventoryStatusColumn,
  tc as selectTriggerVariants,
  Ou as sonner,
  Ru as useEvent,
  Su as useEventAsync,
  zw as useListbox,
  Jd as usePromise,
  Cp as useRecentSearches,
  zn as useSidebar,
  Du as useStylesheet
};
//# sourceMappingURL=index.js.map
