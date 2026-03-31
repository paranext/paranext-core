var ps = Object.defineProperty;
var us = (t, e, n) => e in t ? ps(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yt = (t, e, n) => us(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as lt } from "react/jsx-runtime";
import b, { forwardRef as an, useRef as H, useMemo as B, useState as S, useCallback as K, useLayoutEffect as It, createContext as Cn, useContext as hr, useEffect as Y, Component as ms, createElement as Vr, Suspense as fs, Fragment as ho } from "react";
import { Command as Tt } from "cmdk";
import { X as je, Search as go, Check as jt, Clock as jr, ChevronsLeft as zr, ChevronsRight as Fr, ChevronLeft as Wn, ChevronRight as Oe, ArrowLeft as hs, ArrowRight as gs, Circle as En, ChevronDown as ze, BoldIcon as bs, ItalicIcon as vs, AtSign as bo, Pencil as xs, Trash2 as ys, ArrowUp as vo, MoreHorizontal as Ns, MailOpen as ks, Mail as _s, ChevronUp as xo, FilterIcon as Cs, ArrowLeftIcon as Es, ChevronLeftIcon as Ts, ChevronRightIcon as Rs, ArrowRightIcon as Ss, Copy as yo, Filter as Ds, User as Ms, Link as Os, CircleHelp as Is, ChevronsUpDown as No, Star as As, Undo as Ps, Redo as $s, SquareX as ko, FunctionSquare as _o, SquareSigma as Co, Ban as Ls, AlertCircle as Jn, CircleCheckIcon as Vs, CircleXIcon as js, CircleHelpIcon as zs, ArrowUpIcon as Fs, ArrowDownIcon as Bs, PanelLeft as Ks, PanelRight as Gs, ScrollText as Us, MenuIcon as qs, Menu as Hs, EllipsisVertical as Ys, MoreVertical as Br, LoaderCircle as Xs, GripVertical as Ws } from "lucide-react";
import { clsx as Js } from "clsx";
import { extendTailwindMerge as Zs } from "tailwind-merge";
import * as Lt from "@radix-ui/react-dialog";
import { Canon as ut } from "@sillsdev/scripture";
import { includes as cn, Section as X, getChaptersForBook as Qs, formatScrRef as xe, getSectionForBook as We, formatRelativeDate as ti, formatReplacementString as ve, sanitizeHtml as ei, NumberFormat as ni, formatBytes as ri, getCurrentLocale as oi, usfmMarkers as fn, getFormatCallerFunction as ai, deepEqual as si, isString as Kr, compareScrRefs as Zn, scrRefToBBBCCCVVV as $n, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import { Slot as Fe } from "@radix-ui/react-slot";
import { cva as me } from "class-variance-authority";
import * as Ie from "@radix-ui/react-popover";
import * as Eo from "@radix-ui/react-label";
import * as en from "@radix-ui/react-radio-group";
import { createEditor as To, $getRoot as ce, $createParagraphNode as Tn, $getSelection as Vt, HISTORY_MERGE_TAG as gr, ParagraphNode as Ro, TextNode as So, $isTokenOrSegmented as ii, $getCharacterOffsets as li, $cloneWithPropertiesEphemeral as wi, $findMatchingParent as Do, $isElementNode as le, $isRangeSelection as ke, CLEAR_EDITOR_COMMAND as Mo, COMMAND_PRIORITY_EDITOR as Oo, mergeRegister as de, shallowMergeConfig as ci, defineExtension as qt, safeCast as sn, createState as di, FORMAT_TEXT_COMMAND as Io, $isNodeSelection as Ao, COMMAND_PRIORITY_LOW as Po, RootNode as pi, LineBreakNode as ui, TabNode as mi, $isEditorState as fi, createCommand as hi, CLICK_COMMAND as gi, isDOMNode as bi, $getNodeFromDOMNode as vi, $createNodeSelection as xi, $setSelection as yi, DecoratorNode as Qn, $getState as Ni, toggleTextFormatType as Gr, TEXT_TYPE_TO_FORMAT as ki, $setState as _i, addClassNamesToElement as $o, $create as Ci, $getNodeByKey as Ei, removeClassNamesFromElement as Ti, KEY_TAB_COMMAND as Ri, $isBlockElementNode as bn, $createRangeSelection as Si, $normalizeSelection__EXPERIMENTAL as Di, OUTDENT_CONTENT_COMMAND as Mi, INDENT_CONTENT_COMMAND as Ur, INSERT_TAB_COMMAND as Oi, COMMAND_PRIORITY_CRITICAL as br, $isDecoratorNode as Ii, $isParagraphNode as Ai, $isTextNode as vn, SELECTION_CHANGE_COMMAND as Lo, getRegisteredNode as Pi, isHTMLElement as $i, isDocumentFragment as qr, isDOMDocumentNode as Li, ArtificialNode__DO_NOT_USE as Vo, $createLineBreakNode as jo, $isRootOrShadowRoot as Vi, isBlockDomNode as Hr, isInlineDomNode as Yr, $insertNodes as ji } from "lexical";
import * as _e from "@radix-ui/react-tooltip";
import { TooltipTrigger as zi } from "@radix-ui/react-tooltip";
import { HeadingNode as Fi, QuoteNode as Bi, registerRichText as Ki } from "@lexical/rich-text";
import { flushSync as Gi, createPortal as Ui } from "react-dom";
import { $isTableSelection as qi } from "@lexical/table";
import * as Rn from "@radix-ui/react-toggle-group";
import * as zo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Fo } from "@lexical/headless";
import * as Bo from "@radix-ui/react-separator";
import * as Be from "@radix-ui/react-avatar";
import * as nt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Hi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Ko, getFilteredRowModel as Yi, getSortedRowModel as Go, getPaginationRowModel as Xi, getCoreRowModel as Uo, flexRender as Je, getGroupedRowModel as Wi, getExpandedRowModel as Ji } from "@tanstack/react-table";
import * as dt from "@radix-ui/react-select";
import Zi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as tr, HIDDEN_NOTE_CALLER as er, getDefaultViewOptions as Qi, isInsertEmbedOpOfType as dn, Editorial as tl } from "@eten-tech-foundation/platform-editor";
import * as nr from "@radix-ui/react-checkbox";
import * as Rt from "@radix-ui/react-tabs";
import * as rt from "@radix-ui/react-menubar";
import { useHotkeys as el } from "react-hotkeys-hook";
import * as ot from "@radix-ui/react-context-menu";
import { Drawer as zt } from "vaul";
import * as rr from "@radix-ui/react-progress";
import * as vr from "react-resizable-panels";
import { Toaster as nl } from "sonner";
import { toast as yu } from "sonner";
import * as Xe from "@radix-ui/react-slider";
import * as or from "@radix-ui/react-switch";
const rl = Zs({ prefix: "tw-" });
function h(...t) {
  return rl(Js(t));
}
const ol = "layoutDirection";
function ft() {
  const t = localStorage.getItem(ol);
  return t === "rtl" ? t : "ltr";
}
const al = Lt.Root, sl = Lt.Portal, qo = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Overlay,
  {
    ref: n,
    className: h(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
qo.displayName = Lt.Overlay.displayName;
const Ho = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ft();
  return /* @__PURE__ */ p(sl, { children: [
    /* @__PURE__ */ r(qo, {}),
    /* @__PURE__ */ p(
      Lt.Content,
      {
        ref: o,
        className: h(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ p(
            Lt.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Ho.displayName = Lt.Content.displayName;
function Yo({ className: t, ...e }) {
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
Yo.displayName = "DialogHeader";
const Xo = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Xo.displayName = Lt.Title.displayName;
const il = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
il.displayName = Lt.Description.displayName;
const ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
ne.displayName = Tt.displayName;
const Ke = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(go, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
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
Ke.displayName = Tt.Input.displayName;
const re = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
re.displayName = Tt.List.displayName;
const ln = b.forwardRef((t, e) => /* @__PURE__ */ r(Tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
ln.displayName = Tt.Empty.displayName;
const Ut = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Ut.displayName = Tt.Group.displayName;
const xr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
xr.displayName = Tt.Separator.displayName;
const Ht = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Ht.displayName = Tt.Item.displayName;
function Wo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Wo.displayName = "CommandShortcut";
const Jo = (t, e, n, o, a) => {
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
}, ll = (t, e, n, o, a) => {
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
function Me(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ut.bookIdToEnglishName(t);
}
function yr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Zo = ut.allBookIds.filter(
  (t) => !ut.isObsolete(ut.bookIdToNumber(t))
), ye = Object.fromEntries(
  Zo.map((t) => [t, ut.bookIdToEnglishName(t)])
);
function Nr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ut.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(cn(a.toLowerCase(), o) || cn(t.toLowerCase(), o) || (s ? cn(s.localizedName.toLowerCase(), o) || cn(s.localizedId.toLowerCase(), o) : !1));
}
const Qo = an(
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
    const d = H(!1), u = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (x) => {
      d.current = !0, o ? o(x) : n == null || n(t);
    }, m = B(
      () => Me(t, l),
      [t, l]
    ), g = B(
      () => yr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === X.OT,
            "tw-border-s-purple-200": a === X.NT,
            "tw-border-s-indigo-200": a === X.DC,
            "tw-border-s-amber-200": a === X.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          Ht,
          {
            ref: c,
            value: w || `${t} ${ut.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ut.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                jt,
                {
                  className: h(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: m }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), ta = me(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline",
        // For the most subtle buttons in the UI — no background, muted icon/text color at rest,
        // foreground color on hover. Use when a button should recede into the layout by default.
        subtle: "tw-text-muted-foreground hover:tw-text-foreground"
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Fe : "button", { className: h(ta({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const oe = Ie.Root, fe = Ie.Trigger, wl = Ie.Anchor, Yt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const s = ft();
  return /* @__PURE__ */ r(Ie.Portal, { children: /* @__PURE__ */ r(
    Ie.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: h(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      dir: s
    }
  ) });
});
Yt.displayName = Ie.Content.displayName;
function ar(t, e, n) {
  return `${t} ${ye[t]}${e ? ` ${yr(t, e)} ${Me(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function cl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (f) => String(f),
  getItemKey: o = (f) => String(f),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l,
  buttonClassName: w = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost",
  open: d,
  onOpenChange: u
}) {
  const [f, m] = S(!1), g = d !== void 0, x = g ? d : f, v = (y) => {
    g || m(y), u == null || u(y);
  };
  if (t.length === 0)
    return;
  const N = (y) => {
    e(y), v(!1);
  };
  return /* @__PURE__ */ p(oe, { open: x, onOpenChange: v, children: [
    /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ r(jr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Yt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r(Ut, { heading: s, children: t.map((y) => /* @__PURE__ */ p(
      Ht,
      {
        onSelect: () => N(y),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(jr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(y) })
        ]
      },
      o(y)
    )) }) }) }) })
  ] });
}
function up(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Ln = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, dl = [
  Ln.BOOK_ONLY,
  Ln.BOOK_CHAPTER,
  Ln.BOOK_CHAPTER_VERSE
];
function Xr(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Gt(t) {
  return Qs(ut.bookIdToNumber(t));
}
function pl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = dl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, w = void 0, c = void 0] = i.slice(1);
        let d;
        const u = e.filter((f) => Nr(f, l, n));
        if (u.length === 1 && ([d] = u), !d && w) {
          if (ut.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (d = f);
          }
          if (!d && n) {
            const f = Array.from(n.entries()).find(
              ([, m]) => m.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([d] = f);
          }
        }
        if (!d && w) {
          const m = ((g) => Object.keys(ye).find(
            (x) => ye[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (m && e.includes(m) && (d = m), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = w ? parseInt(w, 10) : void 0;
          f && f > Gt(d) && (f = Math.max(Gt(d), 1));
          const m = c ? parseInt(c, 10) : void 0;
          return {
            book: d,
            chapterNum: f,
            verseNum: m
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function ul(t, e, n, o) {
  const a = K(() => {
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
  }, [t, e, o]), s = K(() => {
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
  }, [t, e, o]), i = K(() => {
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
      icon: n === "ltr" ? zr : Fr
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Wn : Oe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Oe : Wn
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === Gt(t.book) || Gt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Fr : zr
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
function Wr({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Gt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      Ht,
      {
        value: `${t} ${ye[t] || ""} ${i}`,
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
function mp({
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
  const c = ft(), [d, u] = S(!1), [f, m] = S(""), [g, x] = S(""), [v, N] = S("books"), [y, k] = S(void 0), [C, z] = S(!1), j = H(void 0), R = H(void 0), $ = H(void 0), E = H(void 0), D = H({}), V = K(
    (M) => {
      e(M), l && l(M);
    },
    [e, l]
  ), P = B(() => o ? o() : Zo, [o]), I = B(() => ({
    [X.OT]: P.filter((_) => ut.isBookOT(_)),
    [X.NT]: P.filter((_) => ut.isBookNT(_)),
    [X.DC]: P.filter((_) => ut.isBookDC(_)),
    [X.Extra]: P.filter((_) => ut.extraBooks().includes(_))
  }), [P]), A = B(() => Object.values(I).flat(), [I]), W = B(() => {
    if (!g.trim()) return I;
    const M = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return [X.OT, X.NT, X.DC, X.Extra].forEach((L) => {
      M[L] = I[L].filter((U) => Nr(U, g, a));
    }), M;
  }, [I, g, a]), O = B(
    () => pl(g, A, a),
    [g, A, a]
  ), J = K(() => {
    O && (V({
      book: O.book,
      chapterNum: O.chapterNum ?? 1,
      verseNum: O.verseNum ?? 1
    }), u(!1), x(""), m(""));
  }, [V, O]), St = K(
    (M) => {
      if (Gt(M) <= 1) {
        V({
          book: M,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), x("");
        return;
      }
      k(M), N("chapters");
    },
    [V]
  ), At = K(
    (M) => {
      const _ = v === "chapters" ? y : O == null ? void 0 : O.book;
      _ && (V({
        book: _,
        chapterNum: M,
        verseNum: 1
      }), u(!1), N("books"), k(void 0), x(""));
    },
    [V, v, y, O]
  ), Mt = K(
    (M) => {
      V(M), u(!1), x("");
    },
    [V]
  ), ht = ul(t, A, c, e), pt = K(() => {
    N("books"), k(void 0), setTimeout(() => {
      R.current && R.current.focus();
    }, 0);
  }, []), G = K(
    (M) => {
      if (!M && v === "chapters") {
        pt();
        return;
      }
      u(M), M && (N("books"), k(void 0), x(""));
    },
    [v, pt]
  ), { otLong: at, ntLong: st, dcLong: wt, extraLong: xt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Wt = K(
    (M) => Jo(M, at, st, wt, xt),
    [at, st, wt, xt]
  ), Bt = K(
    (M) => O ? !!O.chapterNum && !M.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), Jt = B(
    () => xe(
      t,
      a ? Me(t.book, a) : "English"
    ),
    [t, a]
  ), Re = K((M) => (_) => {
    D.current[M] = _;
  }, []), se = K((M) => {
    (M.key === "Home" || M.key === "End") && M.stopPropagation();
  }, []), Zt = K(
    (M) => {
      if (M.ctrlKey) return;
      const { isLetter: _, isDigit: L } = Xr(M.key);
      if (v === "chapters") {
        if (M.key === "Backspace") {
          M.preventDefault(), M.stopPropagation(), pt();
          return;
        }
        if (_ || L) {
          if (M.preventDefault(), M.stopPropagation(), N("books"), k(void 0), L && y) {
            const U = ye[y];
            x(`${U} ${M.key}`);
          } else
            x(M.key);
          setTimeout(() => {
            R.current && R.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && O) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(M.key)) {
        const U = v === "chapters" ? y : O == null ? void 0 : O.book;
        if (!U) return;
        const q = (() => {
          if (!f) return 1;
          const ct = f.match(/(\d+)$/);
          return ct ? parseInt(ct[1], 10) : 0;
        })(), it = Gt(U);
        if (!it) return;
        let tt = q;
        const gt = 6;
        switch (M.key) {
          case "ArrowLeft":
            q !== 0 && (tt = q > 1 ? q - 1 : it);
            break;
          case "ArrowRight":
            q !== 0 && (tt = q < it ? q + 1 : 1);
            break;
          case "ArrowUp":
            tt = q === 0 ? it : Math.max(1, q - gt);
            break;
          case "ArrowDown":
            tt = q === 0 ? 1 : Math.min(it, q + gt);
            break;
          default:
            return;
        }
        tt !== q && (M.preventDefault(), M.stopPropagation(), m(ar(U, a, tt)), setTimeout(() => {
          const ct = D.current[tt];
          ct && ct.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      O,
      pt,
      y,
      f,
      a
    ]
  ), qe = K((M) => {
    if (M.shiftKey || M.key === "Tab" || M.key === " ") return;
    const { isLetter: _, isDigit: L } = Xr(M.key);
    (_ || L) && (M.preventDefault(), x((U) => U + M.key), R.current.focus(), z(!1));
  }, []);
  return It(() => {
    const M = setTimeout(() => {
      if (d && v === "books" && $.current && E.current) {
        const _ = $.current, L = E.current, U = L.offsetTop, q = _.clientHeight, it = L.clientHeight, tt = U - q / 2 + it / 2;
        _.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), m(ar(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(M);
    };
  }, [d, v, g, O, t.book]), It(() => {
    if (v === "chapters" && y) {
      const M = y === t.book;
      setTimeout(() => {
        if ($.current)
          if (M) {
            const _ = D.current[t.chapterNum];
            _ && _.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            $.current.scrollTo({ top: 0 });
        j.current && j.current.focus();
      }, 0);
    }
  }, [v, y, O, t.book, t.chapterNum]), /* @__PURE__ */ p(oe, { open: d, onOpenChange: G, children: [
    /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
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
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Jt })
      }
    ) }),
    /* @__PURE__ */ r(Yt, { id: w, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      ne,
      {
        ref: j,
        onKeyDown: Zt,
        loop: !0,
        value: f,
        onValueChange: m,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ke,
                {
                  ref: R,
                  value: g,
                  onValueChange: x,
                  onKeyDown: se,
                  onFocus: () => z(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                cl,
                {
                  recentSearches: i,
                  onSearchItemSelect: Mt,
                  renderItem: (M) => xe(M, "English"),
                  getItemKey: (M) => `${M.book}-${M.chapterNum}-${M.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: ht.map(({ onClick: M, disabled: _, title: L, icon: U }) => /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  z(!0), M();
                },
                disabled: _,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: L,
                onKeyDown: qe,
                children: /* @__PURE__ */ r(U, {})
              },
              L
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: pt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(hs, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" })
              }
            ),
            y && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Me(y, a) })
          ] }),
          !C && /* @__PURE__ */ p(re, { ref: $, children: [
            v === "books" && /* @__PURE__ */ p(lt, { children: [
              !O && Object.entries(W).map(([M, _]) => {
                if (_.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Ut, { heading: Wt(M), children: _.map((L) => /* @__PURE__ */ r(
                      Qo,
                      {
                        bookId: L,
                        onSelect: (U) => St(U),
                        section: We(L),
                        commandValue: `${L} ${ye[L]}`,
                        ref: L === t.book ? E : void 0,
                        localizedBookNames: a
                      },
                      L
                    )) }, M)
                  );
              }),
              O && /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(
                Ht,
                {
                  value: `${O.book} ${ye[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                  onSelect: J,
                  className: "tw-font-semibold tw-text-primary",
                  children: xe(
                    {
                      book: O.book,
                      chapterNum: O.chapterNum ?? 1,
                      verseNum: O.verseNum ?? 1
                    },
                    a ? yr(O.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              O && Gt(O.book) > 1 && /* @__PURE__ */ p(lt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Me(O.book, a) }),
                /* @__PURE__ */ r(
                  Wr,
                  {
                    bookId: O.book,
                    scrRef: t,
                    onChapterSelect: At,
                    setChapterRef: Re,
                    isChapterDimmed: Bt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && y && /* @__PURE__ */ r(
              Wr,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: At,
                setChapterRef: Re,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const fp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), ml = me(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), vt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Eo.Root, { ref: n, className: h("pr-twp", ml(), t), ...e }));
vt.displayName = Eo.Root.displayName;
const kr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    en.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
kr.displayName = en.Root.displayName;
const xn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  en.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(en.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(En, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
xn.displayName = en.Item.displayName;
function fl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function sr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = fl,
  getButtonLabel: w,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: u = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...N
}) {
  const [y, k] = S(!1), C = w ?? l, z = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], j = (R, $) => {
    const E = l(R), D = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, V = `${$ ?? ""}${E}${D ?? ""}`;
    return /* @__PURE__ */ p(
      Ht,
      {
        value: E,
        onSelect: () => {
          i(R), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            jt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== E
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            D && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              D
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ p(oe, { open: y, onOpenChange: k, ...N, children: [
    /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": y,
        "aria-label": v,
        id: t,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: c }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? C(s) : d
              }
            )
          ] }),
          /* @__PURE__ */ r(ze, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Yt,
      {
        align: g,
        className: h("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ p(ne, { children: [
          /* @__PURE__ */ r(Ke, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(ln, { children: f }),
          /* @__PURE__ */ r(re, { children: z(e) ? e.map((R) => /* @__PURE__ */ r(Ut, { heading: R.groupHeading, children: R.options.map(($) => j($, R.groupHeading)) }, R.groupHeading)) : e.map((R) => j(R)) })
        ] })
      }
    )
  ] });
}
function hl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = B(
    () => Array.from({ length: s }, (c, d) => d + 1),
    [s]
  );
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ r(vt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      sr,
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
    /* @__PURE__ */ r(vt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      sr,
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
var ir = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ir || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ir || (ir = {}));
const hp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Vn = (t, e) => t[e] ?? e;
function gp({
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
  const d = Vn(c, "%webView_bookSelector_currentBook%"), u = Vn(c, "%webView_bookSelector_choose%"), f = Vn(c, "%webView_bookSelector_chooseBooks%"), [m, g] = S(
    "current book"
    /* CurrentBook */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    kr,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(xn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(vt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(vt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            hl,
            {
              isDisabled: m === "choose books",
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
            /* @__PURE__ */ r(xn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(vt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(vt, { className: "tw-flex tw-items-center", children: o.map((v) => ut.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            F,
            {
              disabled: m === "current book",
              onClick: () => n(),
              children: u
            }
          )
        ] })
      ] })
    }
  );
}
const ea = Cn(null);
function gl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Xt() {
  const t = hr(ea);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const na = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bl = na ? It : Y, pn = { tag: gr };
function vl({ initialConfig: t, children: e }) {
  const n = B(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: w } = t, c = gl(null, o), d = To({ editable: t.editable, html: w, namespace: a, nodes: s, onError: (u) => i(u, d), theme: o });
    return function(u, f) {
      if (f !== null) {
        if (f === void 0) u.update(() => {
          const m = ce();
          if (m.isEmpty()) {
            const g = Tn();
            m.append(g);
            const x = na ? document.activeElement : null;
            (Vt() !== null || x !== null && x === u.getRootElement()) && g.select();
          }
        }, pn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const m = u.parseEditorState(f);
            u.setEditorState(m, pn);
            break;
          }
          case "object":
            u.setEditorState(f, pn);
            break;
          case "function":
            u.update(() => {
              ce().isEmpty() && f(u);
            }, pn);
        }
      }
    }(d, l), [d, c];
  }, []);
  return bl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ea.Provider, { value: n, children: e });
}
const xl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : Y;
function yl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Xt();
  return xl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: w }) => {
      e && s.size === 0 && i.size === 0 || t && w.has(gr) || l.isEmpty() || n(a, o, w);
    });
  }, [o, t, e, n]), null;
}
const _r = {
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
}, kt = _e.Provider, Ct = _e.Root, Et = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  _e.Trigger,
  {
    ref: o,
    className: e ? h(ta({ variant: e }), t) : t,
    ...n
  }
));
Et.displayName = _e.Trigger.displayName;
const _t = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(_e.Portal, { children: /* @__PURE__ */ r(
  _e.Content,
  {
    ref: o,
    sideOffset: e,
    className: h(
      // CUSTOM: Match other portal-based components which use a higher z-index than the default
      // `tw-z-50`. This prevents other high-z-index elements from obscuring a tooltip.
      // Implemented by Tom Bogle
      // Approved by ???
      // 23 March 2026
      "pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
) }));
_t.displayName = _e.Content.displayName;
const Cr = [
  Fi,
  Ro,
  So,
  Bi
], Nl = Cn(null), jn = {
  didCatch: !1,
  error: null
};
class kl extends ms {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = jn;
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
      }), this.setState(jn);
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
    if (o && n.error !== null && _l(e.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(jn);
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
        l = Vr(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Vr(Nl.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function _l() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function Cl({ children: t, onError: e }) {
  return r(kl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const El = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : Y;
function Tl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Rl() {
  return function(t) {
    const [e] = Xt(), n = B(() => t(e), [e, t]), [o, a] = S(() => n.initialValueFn()), s = H(o);
    return El(() => {
      const { initialValueFn: i, subscribe: l } = n, w = i();
      return s.current !== w && (s.current = w, a(w)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }(Tl);
}
function Sl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ii(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), w = s.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [u, f] = li(t), m = l.is(w), g = e.is(i ? w : l), x = e.is(i ? l : w);
      let v, N = 0;
      m ? (N = u > f ? f : u, v = u > f ? u : f) : g ? (N = i ? f : u, v = void 0) : x && (N = 0, v = i ? u : f);
      const y = e.__text.slice(N, v);
      y !== e.__text && (n === "clone" && (e = wi(e)), e.__text = y);
    }
  }
  return e;
}
function Dl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ra = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ml = ra && "documentMode" in document ? document.documentMode : null;
!(!ra || !("InputEvent" in window) || Ml) && "getTargetRanges" in new window.InputEvent("input");
function Ol(t) {
  const e = Do(t, (n) => le(n) && !n.isInline());
  return le(e) || Dl(4, t.__key), e;
}
function Il(t) {
  const e = Vt();
  if (!ke(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = Do(s, (c) => le(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !n.has(w) && (n.add(w), t(l));
  }
  return n.size > 0;
}
const Al = Symbol.for("preact-signals");
function Sn() {
  if (we > 1) return void we--;
  let t, e = !1;
  for (; Ze !== void 0; ) {
    let n = Ze;
    for (Ze = void 0, lr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && oa(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (lr = 0, we--, e) throw t;
}
function Pl(t) {
  if (we > 0) return t();
  we++;
  try {
    return t();
  } finally {
    Sn();
  }
}
let Z, Ze;
function Jr(t) {
  const e = Z;
  Z = void 0;
  try {
    return t();
  } finally {
    Z = e;
  }
}
let we = 0, lr = 0, hn = 0;
function Zr(t) {
  if (Z === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Z ? (e = { i: 0, S: t, p: Z.s, n: void 0, t: Z, e: void 0, x: void 0, r: e }, Z.s !== void 0 && (Z.s.n = e), Z.s = e, t.n = e, 32 & Z.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Z.s, e.n = void 0, Z.s.n = e, Z.s = e), e) : void 0;
}
function Nt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function nn(t, e) {
  return new Nt(t, e);
}
function oa(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Qr(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function aa(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ge(t, e) {
  Nt.call(this, void 0), this.x = t, this.s = void 0, this.g = hn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function $l(t, e) {
  return new ge(t, e);
}
function sa(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    we++;
    const n = Z;
    Z = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Er(t), o;
    } finally {
      Z = n, Sn();
    }
  }
}
function Er(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, sa(t);
}
function Ll(t) {
  if (Z !== this) throw new Error("Out-of-order effect");
  aa(this), Z = t, this.f &= -2, 8 & this.f && Er(this), Sn();
}
function De(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function pe(t, e) {
  const n = new De(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Dn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = nn(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
Nt.prototype.brand = Al, Nt.prototype.h = function() {
  return !0;
}, Nt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Jr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Nt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Jr(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Nt.prototype.subscribe = function(t) {
  return pe(() => {
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
  const t = Zr(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (lr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, hn++, we++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Sn();
    }
  }
} }), ge.prototype = new Nt(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === hn)) return !0;
  if (this.g = hn, this.f |= 1, this.i > 0 && !oa(this)) return this.f &= -2, !0;
  const t = Z;
  try {
    Qr(this), Z = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Z = t, aa(this), this.f &= -2, !0;
}, ge.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Nt.prototype.S.call(this, t);
}, ge.prototype.U = function(t) {
  if (this.t !== void 0 && (Nt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ge.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ge.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Zr(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), De.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, De.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, sa(this), Qr(this), we++;
  const t = Z;
  return Z = this, Ll.bind(this, t);
}, De.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Ze, Ze = this);
}, De.prototype.d = function() {
  this.f |= 8, 1 & this.f || Er(this);
}, De.prototype.dispose = function() {
  this.d();
};
qt({ build: (t, e, n) => Dn(e), config: sn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return pe(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ia() {
  const t = ce(), e = Vt(), n = Tn();
  t.clear(), t.append(n), e !== null && n.select(), ke(e) && (e.format = 0);
}
function la(t, e = ia) {
  return t.registerCommand(Mo, (n) => (t.update(e), !0), Oo);
}
qt({ build: (t, e, n) => Dn(e), config: sn({ $onClear: ia }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return pe(() => la(t, o.value));
} });
function Vl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const zn = di("format", { parse: (t) => typeof t == "number" ? t : 0 });
class wa extends Qn {
  $config() {
    return this.config("decorator-text", { extends: Qn, stateConfigs: [{ flat: !0, stateConfig: zn }] });
  }
  getFormat() {
    return Ni(this, zn);
  }
  getFormatFlags(e, n) {
    return Gr(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = ki[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return _i(this, zn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Gr(n, e, null);
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
function jl(t) {
  return t instanceof wa;
}
qt({ name: "@lexical/extension/DecoratorText", nodes: () => [wa], register: (t, e, n) => t.registerCommand(Io, (o) => {
  const a = Vt();
  if (Ao(a) || ke(a)) for (const s of a.getNodes()) jl(s) && s.toggleFormat(o);
  return !1;
}, Po) });
function ca(t, e) {
  let n;
  return nn(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const wr = qt({ build: (t) => ca(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function da(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = da(n[a], o[a]);
    return t;
  }
  return e;
}
const Tr = 0, cr = 1, pa = 2, Fn = 3, un = 4, Se = 5, Bn = 6, He = 7;
function Kn(t) {
  return t.id === Tr;
}
function ua(t) {
  return t.id === pa;
}
function zl(t) {
  return function(e) {
    return e.id === cr;
  }(t) || et(305, String(t.id), String(cr)), Object.assign(t, { id: pa });
}
const Fl = /* @__PURE__ */ new Set();
class Bl {
  constructor(e, n) {
    yt(this, "builder");
    yt(this, "configs");
    yt(this, "_dependency");
    yt(this, "_peerNameSet");
    yt(this, "extension");
    yt(this, "state");
    yt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Tr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : ci;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    ua(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, w, c) {
      return Object.assign(l, { config: w, id: Fn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: un, initResult: w, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== un && et(307, String(n.id), String(Se)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Se, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Se && et(308, String(o.id), String(Se));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Bn });
    }(o), () => {
      const s = this.state;
      s.id !== He && et(309, String(o.id), String(He)), this.state = function(i) {
        return Object.assign(i, { id: Se });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Bn && et(310, String(n.id), String(Bn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: He });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= un;
    }(e) || et(313, String(e.id), String(un)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Fn;
    }(e) || et(314, String(e.id), String(Fn)), { config: e.config };
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
      return n.id >= He;
    }(e) || et(316, String(e.id), String(He)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Fl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= Se;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const to = { tag: gr };
function Kl() {
  const t = ce();
  t.isEmpty() && t.append(Tn());
}
const Gl = qt({ config: sn({ setOptions: to, updateOptions: to }), init: ({ $initialEditorState: t = Kl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (fi(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [pi, So, ui, mi, Ro] }), eo = Symbol.for("@lexical/extension/LexicalBuilder");
function no() {
}
function Ul(t) {
  throw t;
}
function mn(t) {
  return Array.isArray(t) ? t : [t];
}
const Gn = "0.41.0+prod.esm";
class Qe {
  constructor(e) {
    yt(this, "roots");
    yt(this, "extensionNameMap");
    yt(this, "outgoingConfigEdges");
    yt(this, "incomingEdges");
    yt(this, "conflicts");
    yt(this, "_sortedExtensionReps");
    yt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Gn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [mn(Gl)];
    for (const o of e) n.push(mn(o));
    return new Qe(n);
  }
  static maybeFromEditor(e) {
    const n = e[eo];
    return n && (n.PACKAGE_VERSION !== Gn && et(292, n.PACKAGE_VERSION, Gn), n instanceof Qe || et(293)), n;
  }
  static fromEditor(e) {
    const n = Qe.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(To({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [eo]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = no;
    function n() {
      try {
        e();
      } finally {
        e = no;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = de(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && et(296);
    const n = mn(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new Bl(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && et(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && et(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = mn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (ua(s)) return;
      const i = o.extension.name;
      var l;
      Kn(s) || et(300, i, a || "[unknown]"), Kn(l = s) || et(304, String(l.id), String(Tr)), s = Object.assign(l, { id: cr }), o.state = s;
      const w = this.outgoingConfigEdges.get(i);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && n(d, i);
      }
      s = zl(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Kn(o.state) && n(o);
    for (const o of e) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && et(301, o.name);
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
    return de(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: u } = d;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const f of Vl(u)) {
        if (typeof f != "function") {
          const m = o.get(f.replace);
          m && et(302, u.name, f.replace.name, m.extension.name), o.set(f.replace, d);
        }
        n.add(f);
      }
      if (u.html) {
        if (u.html.export) for (const [f, m] of u.html.export.entries()) a.set(f, m);
        u.html.import && Object.assign(s, u.html.import);
      }
      u.theme && da(i, u.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const w = Object.keys(s).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = s), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Ul), e;
  }
}
const ql = /* @__PURE__ */ new Set(), ro = qt({ build(t, e, n) {
  const o = n.getDependency(wr).output, a = nn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ca(() => {
  }, () => pe(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (Vt()) for (const [d, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(d);
          continue;
        }
        const f = Ei(d), m = f && f.isSelected() || !1;
        c = c || m !== (!!i && i.has(d)), m && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && i && w.size === i.size || (s.value = w);
  }));
  return { watchNodeKey: function(i) {
    const l = $l(() => (s.value || ql).has(i)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(i);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(i, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [wr], name: "@lexical/extension/NodeSelection" });
hi("INSERT_HORIZONTAL_RULE_COMMAND");
class Ae extends Qn {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ae(e.__key);
  }
  static importJSON(e) {
    return ma().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Hl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return $o(n, e.theme.hr), n;
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
function Hl() {
  return { node: ma() };
}
function ma() {
  return Ci(Ae);
}
function Yl(t) {
  return t instanceof Ae;
}
qt({ dependencies: [wr, ro], name: "@lexical/extension/HorizontalRule", nodes: () => [Ae], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(ro).output, a = nn({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return de(t.registerCommand(gi, (i) => {
    if (bi(i.target)) {
      const l = vi(i.target);
      if (Yl(l)) return function(w, c = !1) {
        const d = Vt(), u = w.isSelected(), f = w.getKey();
        let m;
        c && Ao(d) ? m = d : (m = xi(), yi(m)), u ? m.delete(f) : m.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Po), t.registerMutationListener(Ae, (i, l) => {
    Pl(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, u] of i.entries()) if (u === "destroyed") c.delete(d), w = !0;
      else {
        const f = c.get(d), m = t.getElementByKey(d);
        f ? f.domNode.value = m : (w = !0, c.set(d, { domNode: nn(m), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), pe(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) i.push(pe(() => {
      const c = l.value;
      c && (w.value ? $o(c, s) : Ti(c, s));
    }));
    return de(...i);
  }));
} });
function fa(t) {
  return t.canBeEmpty();
}
function Xl(t, e, n = fa) {
  return de(t.registerCommand(Ri, (o) => {
    const a = Vt();
    if (!ke(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((f) => bn(f) && f.canIndent()).length > 0) return !0;
      const l = i.anchor, w = i.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), u = Ol(d);
      if (u.canIndent()) {
        const f = u.getKey();
        let m = Si();
        if (m.anchor.set(f, 0, "element"), m.focus.set(f, 0, "element"), m = Di(m), m.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Mi : Ur : Oi;
    return t.dispatchCommand(s, void 0);
  }, Oo), t.registerCommand(Ur, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Vt();
    if (!ke(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return Il((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, br));
}
qt({ build: (t, e, n) => Dn(e), config: sn({ $canIndent: fa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return pe(() => {
    if (!o.value) return Xl(t, a, s);
  });
} });
const Wl = qt({ name: "@lexical/react/ReactProvider" });
function Jl() {
  return ce().getTextContent();
}
function Zl(t, e = !0) {
  if (t) return !1;
  let n = Jl();
  return e && (n = n.trim()), n === "";
}
function Ql(t) {
  if (!Zl(t, !1)) return !1;
  const e = ce().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Ii(a)) return !1;
    if (le(a)) {
      if (!Ai(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const w = s[o];
        if (!vn(w)) return !1;
      }
    }
  }
  return !0;
}
function ha(t) {
  return () => Ql(t);
}
function ga(t) {
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
            const [c, d, u, f, m] = w;
            t.update(() => {
              const g = Vt();
              if (ke(g)) {
                const x = g.anchor;
                let v = x.getNode(), N = 0, y = 0;
                if (vn(v) && c >= 0 && d >= 0 && (N = c, y = c + d, g.setTextNodeRange(v, N, v, y)), N === y && u === "" || (g.insertRawText(u), v = x.getNode()), vn(v)) {
                  N = f, y = f + m;
                  const k = v.getTextContentSize();
                  N = N > k ? k : N, y = y > k ? k : y, g.setTextNodeRange(v, N, v, y);
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
qt({ build: (t, e, n) => Dn(e), config: sn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => pe(() => n.getOutput().disabled.value ? void 0 : ga(t)) });
function tw(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Rr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : Y;
function ew({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = S(() => n.getDecorators());
    return Rr(() => n.registerDecoratorListener((i) => {
      Gi(() => {
        s(i);
      });
    }), [n]), Y(() => {
      s(n.getDecorators());
    }, [n]), B(() => {
      const i = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = r(o, { onError: (f) => n._onError(f), children: r(fs, { fallback: null, children: a[c] }) }), u = n.getElementByKey(c);
        u !== null && i.push(Ui(d, u, c));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function nw({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Qe.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Wl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && tw(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(ew, { editor: t, ErrorBoundary: e });
}
function oo(t) {
  return t.getEditorState().read(ha(t.isComposing()));
}
function rw({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Xt();
  return function(a) {
    Rr(() => de(Ki(a), ga(a)), [a]);
  }(o), p(lt, { children: [t, r(ow, { content: e }), r(nw, { editor: o, ErrorBoundary: n })] });
}
function ow({ content: t }) {
  const [e] = Xt(), n = function(a) {
    const [s, i] = S(() => oo(a));
    return Rr(() => {
      function l() {
        const w = oo(a);
        i(w);
      }
      return l(), de(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = Rl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function aw({ defaultSelection: t }) {
  const [e] = Xt();
  return Y(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const sw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : Y;
function iw({ onClear: t }) {
  const [e] = Xt();
  return sw(() => la(e, t), [e, t]), null;
}
const ba = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : Y;
function lw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: u, ariaRequired: f, autoCapitalize: m, className: g, id: x, role: v = "textbox", spellCheck: N = !0, style: y, tabIndex: k, "data-testid": C, ...z }, j) {
  const [R, $] = S(t.isEditable()), E = K((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), D = B(() => /* @__PURE__ */ function(...V) {
    return (P) => {
      for (const I of V) typeof I == "function" ? I(P) : I != null && (I.current = P);
    };
  }(j, E), [E, j]);
  return ba(() => ($(t.isEditable()), t.registerEditableListener((V) => {
    $(V);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": R && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": R ? u : void 0, "aria-readonly": !R || void 0, "aria-required": f, autoCapitalize: m, className: g, contentEditable: R, "data-testid": C, id: x, ref: D, role: v, spellCheck: N, style: y, tabIndex: k, ...z });
}
const ww = an(lw);
function ao(t) {
  return t.getEditorState().read(ha(t.isComposing()));
}
const cw = an(dw);
function dw(t, e) {
  const { placeholder: n, ...o } = t, [a] = Xt();
  return p(lt, { children: [r(ww, { editor: a, ...o, ref: e }), n != null && r(pw, { editor: a, content: n })] });
}
function pw({ content: t, editor: e }) {
  const n = function(i) {
    const [l, w] = S(() => ao(i));
    return ba(() => {
      function c() {
        const d = ao(i);
        w(d);
      }
      return c(), de(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(e), [o, a] = S(e.isEditable());
  if (It(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function uw({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    cw,
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
const va = Cn(void 0);
function mw({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = B(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(va.Provider, { value: i, children: s });
}
function xa() {
  const t = hr(va);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function fw() {
  const [t, e] = S(void 0), n = K(() => {
    e(void 0);
  }, []), o = B(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(al, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(Ho, { children: [
      /* @__PURE__ */ r(Yo, { children: /* @__PURE__ */ r(Xo, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = K(
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
function hw({
  children: t
}) {
  const [e] = Xt(), [n, o] = S(e), [a, s] = S("paragraph"), [i, l] = fw(), w = () => {
  };
  return Y(() => n.registerCommand(
    Lo,
    (c, d) => (o(d), !1),
    br
  ), [n]), /* @__PURE__ */ p(
    mw,
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
function gw(t) {
  const [e] = Xt(), { activeEditor: n } = xa();
  Y(() => n.registerCommand(
    Lo,
    () => {
      const o = Vt();
      return o && t(o), !1;
    },
    br
  ), [e, t]), Y(() => {
    n.getEditorState().read(() => {
      const o = Vt();
      o && t(o);
    });
  }, [n, t]);
}
const ya = me(
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
), bw = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  zo.Root,
  {
    ref: a,
    className: h(ya({ variant: e, size: n, className: t })),
    ...o
  }
));
bw.displayName = zo.Root.displayName;
const Na = b.createContext({
  size: "default",
  variant: "default"
}), Sr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = ft();
  return /* @__PURE__ */ r(
    Rn.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        Na.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Sr.displayName = Rn.Root.displayName;
const tn = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(Na);
  return /* @__PURE__ */ r(
    Rn.Item,
    {
      ref: s,
      className: h(
        ya({
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
tn.displayName = Rn.Item.displayName;
const so = [
  { format: "bold", icon: bs, label: "Bold" },
  { format: "italic", icon: vs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function vw() {
  const { activeEditor: t } = xa(), [e, n] = S([]), o = K((a) => {
    if (ke(a) || qi(a)) {
      const s = [];
      so.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return gw(o), /* @__PURE__ */ r(
    Sr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: so.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        tn,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Io, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function xw({ onClear: t }) {
  const [e] = Xt();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(Mo, void 0);
    });
  }, [e, t]);
}
function yw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = S(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(hw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(vw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        rw,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(uw, { placeholder: t }) }),
          ErrorBoundary: Cl
        }
      ),
      e && /* @__PURE__ */ r(aw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(xw, { onClear: n }),
      /* @__PURE__ */ r(iw, {})
    ] })
  ] });
}
const Nw = {
  namespace: "commentEditor",
  theme: _r,
  nodes: Cr,
  onError: (t) => {
    console.error(t);
  }
};
function yn({
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
          vl,
          {
            initialConfig: {
              ...Nw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(kt, { children: [
              /* @__PURE__ */ r(yw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                yl,
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
function kw(t, e) {
  const n = Li(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!_a.has(s.nodeName)) {
    const i = Ca(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Vo && i.insertAfter(jo());
    for (const i of s) {
      const l = i.getChildren();
      for (const w of l) i.insertBefore(w);
      i.remove();
    }
  }(a), o;
}
function _w(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ce().getChildren();
  for (let a = 0; a < o.length; a++)
    ka(t, o[a], n, e);
  return n.innerHTML;
}
function ka(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = le(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && vn(e) && (i = Sl(o, e, "clone"));
  const l = le(i) ? i.getChildren() : [], w = Pi(t, i.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, i) : i.exportDOM(t);
  const { element: d, after: u } = c;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let m = 0; m < l.length; m++) {
    const g = l[m], x = ka(t, g, f, o);
    !a && le(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if (($i(d) || qr(d)) && d.append(f), n.append(d), u) {
      const m = u.call(i, d);
      m && (qr(d) ? d.replaceChildren(m) : d.replaceWith(m));
    }
  } else n.append(f);
  return a;
}
const _a = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ca(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (_a.has(t.nodeName)) return i;
  let l = null;
  const w = function(g, x) {
    const { nodeName: v } = g, N = x._htmlConversions.get(v.toLowerCase());
    let y = null;
    if (N !== void 0) for (const k of N) {
      const C = k(g);
      C !== null && (y === null || (y.priority || 0) <= (C.priority || 0)) && (y = C);
    }
    return y !== null ? y.conversion : null;
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
  const u = t.childNodes;
  let f = [];
  const m = (l == null || !Vi(l)) && (l != null && bn(l) || o);
  for (let g = 0; g < u.length; g++) f.push(...Ca(u[g], e, n, m, new Map(a), l));
  return d != null && (f = d(f)), Hr(t) && (f = Cw(t, f, m ? () => {
    const g = new Vo();
    return n.push(g), g;
  } : Tn)), l == null ? f.length > 0 ? i = i.concat(f) : Hr(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Yr(g.nextSibling) && Yr(g.previousSibling);
  }(t) && (i = i.concat(jo())) : le(l) && l.append(...f), i;
}
function Cw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (bn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && bn(e[i + 1])) {
      const w = n();
      w.setFormat(o), w.append(...s), a.push(w), s = [];
    }
  }
  return a;
}
function Ea(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Ta(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ta(e.children)
  ) : !1;
}
function $t(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ta(t.root.children) : !1;
}
function Ew(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Fo({
    namespace: "EditorUtils",
    theme: _r,
    nodes: Cr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = kw(e, a);
      ce().clear(), ji(s);
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
function Nn(t) {
  const e = Fo({
    namespace: "EditorUtils",
    theme: _r,
    nodes: Cr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = _w(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Dr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function gn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Mr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Tw = {
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
function Un(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function bp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = S(Tw), [i, l] = S(void 0), [w, c] = S(!1), d = H(void 0), u = H(null);
  Y(() => {
    let N = !0;
    const y = u.current;
    if (!y) return;
    const k = setTimeout(() => {
      N && Ea(y);
    }, 300);
    return () => {
      N = !1, clearTimeout(k);
    };
  }, []);
  const f = K(() => {
    if (!$t(a)) return;
    const N = Nn(a);
    e(N, i);
  }, [a, e, i]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(je, {}) }) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !$t(a),
              children: /* @__PURE__ */ r(jt, {})
            }
          ) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(oe, { open: w, onOpenChange: c, children: [
      /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(bo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Un(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Yt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: t.map((N) => /* @__PURE__ */ r(
            Ht,
            {
              onSelect: () => {
                l(N === "" ? void 0 : N), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Un(N, o) })
            },
            N || "unassigned"
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
        onKeyDownCapture: (N) => {
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : Mr(N) && (N.preventDefault(), N.stopPropagation(), $t(a) && f());
        },
        onKeyDown: (N) => {
          Dr(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          yn,
          {
            editorSerializedState: a,
            onSerializedChange: (N) => s(N),
            placeholder: m,
            onClear: (N) => {
              d.current = N;
            }
          }
        )
      }
    )
  ] });
}
const vp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), xp = [
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
], Rw = ["input", "select", "textarea", "button"], Sw = ["button", "textbox"], Dw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [s, i] = S(void 0), [l, w] = S(void 0), c = K(
    (m) => {
      i(m);
      const g = t.find((v) => v.id === m);
      g && (e == null || e(g));
      const x = document.getElementById(m);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), d = K(
    (m) => {
      const g = t.find((x) => x.id === m);
      g && (w((x) => x === m ? void 0 : m), n == null || n(g));
    },
    [n, t]
  ), u = (m) => {
    if (!m) return !1;
    const g = m.tagName.toLowerCase();
    if (m.isContentEditable || Rw.includes(g)) return !0;
    const x = m.getAttribute("role");
    if (x && Sw.includes(x)) return !0;
    const v = m.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, f = K(
    (m) => {
      var R;
      const g = m.target, x = ($) => $ ? document.getElementById($) : void 0, v = x(l), N = x(s);
      if (!!(v && g && v.contains(g) && g !== v) && u(g)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const $ = t.find((E) => E.id === l);
            $ && c($.id);
          }
          return;
        }
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
          if (!v) return;
          const $ = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if ($.length === 0) return;
          const E = $.findIndex((V) => V === g);
          if (E === -1) return;
          let D;
          m.key === "ArrowDown" ? D = Math.min(E + 1, $.length - 1) : D = Math.max(E - 1, 0), D !== E && (m.preventDefault(), m.stopPropagation(), (R = $[D]) == null || R.focus());
          return;
        }
        return;
      }
      const C = t.findIndex(($) => $.id === s);
      let z = C;
      switch (m.key) {
        case "ArrowDown":
          z = Math.min(C + 1, t.length - 1), m.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(C - 1, 0), m.preventDefault();
          break;
        case "Home":
          z = 0, m.preventDefault();
          break;
        case "End":
          z = t.length - 1, m.preventDefault();
          break;
        case " ":
        case "Enter":
          s && d(s), m.preventDefault(), m.stopPropagation();
          return;
        case "ArrowRight": {
          const $ = N;
          if ($) {
            const E = $.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), D = $.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = E ?? D;
            if (V) {
              m.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          m.key.length === 1 && !m.metaKey && !m.ctrlKey && !m.altKey && (u(g) || (o == null || o(m.key), m.preventDefault()));
          return;
      }
      const j = t[z];
      j && c(j.id);
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
}, Mw = me(
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
), Pe = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", Mw({ variant: e }), t), ...n })
);
Pe.displayName = "Badge";
const Ra = b.forwardRef(
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
Ra.displayName = "Card";
const Ow = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Ow.displayName = "CardHeader";
const Iw = b.forwardRef(
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
Iw.displayName = "CardTitle";
const Aw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Aw.displayName = "CardDescription";
const Sa = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Sa.displayName = "CardContent";
const Pw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Pw.displayName = "CardFooter";
const $e = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Bo.Root,
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
$e.displayName = Bo.Root.displayName;
const Da = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Da.displayName = Be.Root.displayName;
const $w = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
$w.displayName = Be.Image.displayName;
const Ma = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ma.displayName = Be.Fallback.displayName;
const Or = Cn(void 0);
function Ft() {
  const t = hr(Or);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ae = me("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ce = nt.Trigger, Oa = nt.Group, Lw = nt.Portal, Vw = nt.Sub, jw = nt.RadioGroup;
function ue({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Or.Provider, { value: n, children: /* @__PURE__ */ r(nt.Root, { ...e }) });
}
const Ia = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Ft();
  return /* @__PURE__ */ p(
    nt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ia.displayName = nt.SubTrigger.displayName;
const Aa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Aa.displayName = nt.SubContent.displayName;
const ee = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = ft();
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
ee.displayName = nt.Content.displayName;
const kn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ft(), s = Ft();
  return /* @__PURE__ */ r(
    nt.Item,
    {
      ref: o,
      className: h(
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
kn.displayName = nt.Item.displayName;
const te = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Ft();
  return /* @__PURE__ */ p(
    nt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
te.displayName = nt.CheckboxItem.displayName;
const Pa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ft();
  return /* @__PURE__ */ p(
    nt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ae({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(En, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Pa.displayName = nt.RadioItem.displayName;
const wn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  nt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
wn.displayName = nt.Label.displayName;
const Ge = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ge.displayName = nt.Separator.displayName;
function zw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
zw.displayName = "DropdownMenuShortcut";
function io({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [w, c] = S(!1), [d, u] = S(), f = H(null);
  Y(() => {
    if (!w) return;
    let C = !0;
    const z = f.current;
    if (!z) return;
    const j = setTimeout(() => {
      C && Ea(z);
    }, 300);
    return () => {
      C = !1, clearTimeout(j);
    };
  }, [w]);
  const m = K(
    (C) => {
      C && C.stopPropagation(), c(!1), u(void 0), i == null || i(!1);
    },
    [i]
  ), g = K(
    async (C) => {
      if (C && C.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Nn(d)
      ) && (c(!1), u(void 0), i == null || i(!1));
    },
    [d, a, t.id, i]
  ), x = B(() => {
    const C = new Date(t.date), z = ti(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), j = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ve(n["%comment_dateAtTime%"], {
      date: z,
      time: j
    });
  }, [t.date, n]), v = B(() => t.user, [t.user]), N = B(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = B(() => ei(t.contents), [t.contents]), k = B(() => {
    if (o && l)
      return /* @__PURE__ */ p(lt, { children: [
        /* @__PURE__ */ p(
          kn,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), u(Ew(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(xs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          kn,
          {
            onClick: async (C) => {
              C.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(ys, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
        /* @__PURE__ */ r(Da, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ma, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Pe, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              gn(t.assignedUser, n)
            ] })
          ] }),
          w && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), m()) : Mr(C) && (C.preventDefault(), C.stopPropagation(), $t(d) && g());
              },
              onKeyDown: (C) => {
                Dr(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  yn,
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
                    onSerializedChange: (C) => u(C)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: m,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(je, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !$t(d),
                      children: /* @__PURE__ */ r(vo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ p(lt, { children: [
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
        k && /* @__PURE__ */ p(ue, { children: [
          /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ns, {}) }) }),
          /* @__PURE__ */ r(ee, { align: "end", children: k })
        ] })
      ]
    }
  );
}
const lo = {
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
function Fw({
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
  handleAddCommentToThread: u,
  handleUpdateComment: f,
  handleDeleteComment: m,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: k,
  isRead: C = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: j
}) {
  const [R, $] = S(lo), [E, D] = S(
    void 0
  ), V = o, [P, I] = S(!1), [A, W] = S(!1), [O, J] = S(!1), [St, At] = S(!1), [Mt, ht] = S(!1), [pt, G] = S(C), [at, st] = S(!1), wt = H(void 0), [xt, Wt] = S(/* @__PURE__ */ new Map());
  Y(() => {
    let T = !0;
    return (async () => {
      const mt = y ? await y(w) : !1;
      T && ht(mt);
    })(), () => {
      T = !1;
    };
  }, [w, y]), Y(() => {
    let T = !0;
    if (!o) {
      At(!1), Wt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = N ? await N(w) : !1;
      T && At(mt);
    })(), () => {
      T = !1;
    };
  }, [o, w, N]);
  const Bt = B(() => e.filter((T) => !T.deleted), [e]);
  Y(() => {
    let T = !0;
    if (!o || !k) {
      Wt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = /* @__PURE__ */ new Map();
      await Promise.all(
        Bt.map(async (Lr) => {
          const ds = await k(Lr.id);
          T && mt.set(Lr.id, ds);
        })
      ), T && Wt(mt);
    })(), () => {
      T = !1;
    };
  }, [o, Bt, k]);
  const Jt = B(() => Bt[0], [Bt]), Re = H(null), se = H(void 0), Zt = K(() => {
    var T;
    (T = se.current) == null || T.call(se), $(lo);
  }, []), qe = K(() => {
    const T = !pt;
    G(T), st(!T), g == null || g(w, T);
  }, [pt, g, w]);
  Y(() => {
    I(!1);
  }, [o]), Y(() => {
    if (o && !pt && !at) {
      const T = setTimeout(() => {
        G(!0), g == null || g(w, !0);
      }, z * 1e3);
      return wt.current = T, () => clearTimeout(T);
    }
    wt.current && (clearTimeout(wt.current), wt.current = void 0);
  }, [o, pt, at, z, w, g]);
  const M = B(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), _ = B(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = gn(s, n);
    return ve(n["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [s, n]), L = B(() => Bt.slice(1), [Bt]), U = B(() => L.length ?? 0, [L.length]), q = B(() => U > 0, [U]), it = B(() => P || U <= 2 ? L : L.slice(-2), [L, U, P]), tt = B(() => P || U <= 2 ? 0 : U - 2, [U, P]), gt = B(
    () => U === 1 ? M.singleReply : ve(M.multipleReplies, { count: U }),
    [U, M]
  ), ct = B(
    () => tt === 1 ? M.singleReply : ve(M.multipleReplies, { count: tt }),
    [tt, M]
  );
  Y(() => {
    !o && A && q && W(!1);
  }, [o, A, q]);
  const Dt = K(
    async (T) => {
      T && T.stopPropagation();
      const bt = $t(R) ? Nn(R) : void 0;
      if (E !== void 0) {
        await u({
          threadId: w,
          contents: bt,
          assignedUser: E
        }) && (D(void 0), bt && Zt());
        return;
      }
      bt && await u({ threadId: w, contents: bt }) && Zt();
    },
    [
      Zt,
      R,
      u,
      E,
      w
    ]
  ), Pt = K(
    async (T) => {
      const bt = $t(R) ? Nn(R) : void 0, mt = await u({
        ...T,
        contents: bt,
        assignedUser: E ?? T.assignedUser
      });
      return mt && bt && Zt(), mt && E !== void 0 && D(void 0), mt;
    },
    [Zt, R, u, E]
  );
  return /* @__PURE__ */ r(
    Ra,
    {
      role: "option",
      "aria-selected": o,
      id: w,
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
        l(w);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ p(Sa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            _ && /* @__PURE__ */ r(Pe, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: _ }),
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                onClick: (T) => {
                  T.stopPropagation(), qe();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": pt ? "Mark as unread" : "Mark as read",
                children: pt ? /* @__PURE__ */ r(ks, {}) : /* @__PURE__ */ r(_s, {})
              }
            ),
            Mt && d !== "Resolved" && /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                className: h(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (T) => {
                  T.stopPropagation(), Pt({
                    threadId: w,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: Re,
              className: h(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": V
                },
                { "tw-whitespace-nowrap": !V }
              ),
              children: [
                a && j ? /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (T) => {
                      T.stopPropagation(), j(c);
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
            io,
            {
              comment: Jt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: d,
              handleAddCommentToThread: Pt,
              handleUpdateComment: f,
              handleDeleteComment: m,
              onEditingChange: W,
              canEditOrDelete: (!A && xt.get(Jt.id)) ?? !1,
              canUserResolveThread: Mt
            }
          )
        ] }),
        /* @__PURE__ */ p(lt, { children: [
          q && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r($e, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: gt })
          ] }),
          !o && $t(R) && /* @__PURE__ */ r(
            yn,
            {
              editorSerializedState: R,
              onSerializedChange: (T) => $(T),
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
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r($e, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: ct }),
                    P ? /* @__PURE__ */ r(xo, {}) : /* @__PURE__ */ r(ze, {})
                  ] })
                ]
              }
            ),
            it.map((T) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              io,
              {
                comment: T,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: f,
                handleDeleteComment: m,
                onEditingChange: W,
                canEditOrDelete: (!A && xt.get(T.id)) ?? !1
              }
            ) }, T.id)),
            v !== !1 && (!A || $t(R)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (T) => T.stopPropagation(),
                onKeyDownCapture: (T) => {
                  Mr(T) && (T.preventDefault(), T.stopPropagation(), ($t(R) || E !== void 0) && Dt());
                },
                onKeyDown: (T) => {
                  Dr(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    yn,
                    {
                      editorSerializedState: R,
                      onSerializedChange: (T) => $(T),
                      placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (T) => {
                        se.current = T;
                      }
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    E !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ve(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: gn(
                          E,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ p(oe, { open: O, onOpenChange: J, children: [
                      /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !St || !x || x.length === 0 || !x.includes(i),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(bo, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Yt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (T) => {
                            T.key === "Escape" && (T.stopPropagation(), J(!1));
                          },
                          children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: x == null ? void 0 : x.map((T) => /* @__PURE__ */ r(
                            Ht,
                            {
                              onSelect: () => {
                                D(T !== s ? T : void 0), J(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: gn(T, n) })
                            },
                            T || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      F,
                      {
                        size: "icon",
                        onClick: Dt,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !$t(R) && E === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(vo, {})
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
function yp({
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
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: m,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: v
}) {
  const [N, y] = S(/* @__PURE__ */ new Set()), [k, C] = S();
  Y(() => {
    g && (y((I) => new Set(I).add(g)), C(g));
  }, [g]);
  const z = n.filter(
    (I) => I.comments.some((A) => !A.deleted)
  ), j = z.map((I) => ({
    id: I.id
  })), R = K(
    (I) => {
      y((A) => new Set(A).add(I.id)), C(I.id), x == null || x(I.id);
    },
    [x]
  ), $ = K(
    (I) => {
      const A = N.has(I);
      y((W) => {
        const O = new Set(W);
        return O.has(I) ? O.delete(I) : O.add(I), O;
      }), C(I), x == null || x(A ? void 0 : I);
    },
    [N, x]
  ), { listboxRef: E, activeId: D, handleKeyDown: V } = Dw({
    options: j,
    onOptionSelect: R
  }), P = K(
    (I) => {
      I.key === "Escape" ? (k && N.has(k) && (y((A) => {
        const W = new Set(A);
        return W.delete(k), W;
      }), C(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : V(I);
    },
    [k, N, V, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: E,
      "aria-activedescendant": D ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: P,
      children: z.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: h({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Fw,
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: $,
              threadId: I.id,
              thread: I,
              isRead: I.isRead,
              isSelected: N.has(I.id),
              currentUser: o,
              assignedUser: I.assignedUser,
              threadStatus: I.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: u,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: m,
              onVerseRefClick: v
            }
          )
        },
        I.id
      ))
    }
  );
}
function Bw({ table: t }) {
  return /* @__PURE__ */ p(ue, { children: [
    /* @__PURE__ */ r(Hi, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Cs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(ee, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(wn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ge, {}),
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
const Le = dt.Root, Kw = dt.Group, Ve = dt.Value, Gw = me(
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
), Ee = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = ft();
  return /* @__PURE__ */ p(
    dt.Trigger,
    {
      className: h(Gw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(dt.Icon, { asChild: !0, children: /* @__PURE__ */ r(ze, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Ee.displayName = dt.Trigger.displayName;
const $a = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(xo, { className: "tw-h-4 tw-w-4" })
  }
));
$a.displayName = dt.ScrollUpButton.displayName;
const La = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ze, { className: "tw-h-4 tw-w-4" })
  }
));
La.displayName = dt.ScrollDownButton.displayName;
const Te = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = ft();
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
        /* @__PURE__ */ r($a, {}),
        /* @__PURE__ */ r(
          dt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(La, {})
      ]
    }
  ) });
});
Te.displayName = dt.Content.displayName;
const Uw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Uw.displayName = dt.Label.displayName;
const Ot = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  dt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(dt.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(dt.ItemText, { children: e })
    ]
  }
));
Ot.displayName = dt.Item.displayName;
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
qw.displayName = dt.Separator.displayName;
function Hw({ table: t }) {
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
        Le,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Ee, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ve, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Te, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Ot, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(Es, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ts, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Rs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ss, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const wo = `
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
function Yw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function rn(t, e) {
  const n = e ? `${wo}, ${e}` : wo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Yw(o)
  );
}
const Mn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        rn(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        i.preventDefault(), rn(l)[0].focus();
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
Mn.displayName = "Table";
const On = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
On.displayName = "TableHeader";
const In = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
In.displayName = "TableBody";
const Xw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Xw.displayName = "TableFooter";
function Ww(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? rn(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function Jw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Zw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Qt = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Ww(i);
  const l = b.useMemo(
    () => i.current ? rn(i.current) : [],
    [i]
  ), w = b.useCallback(
    (d) => {
      const { current: u } = i;
      if (!u || !u.parentElement) return;
      const f = u.closest("table"), m = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rn(f).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = m.indexOf(u), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Zw(m, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Jw(l, x, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const v = u.closest("table");
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
Qt.displayName = "TableRow";
const on = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
on.displayName = "TableHead";
const Ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ne.displayName = "TableCell";
const Qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Qw.displayName = "TableCaption";
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function tc({
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
  var j;
  const [d, u] = S([]), [f, m] = S([]), [g, x] = S({}), [v, N] = S({}), y = B(() => e ?? [], [e]), k = Ko({
    data: y,
    columns: t,
    getCoreRowModel: Uo(),
    ...n && { getPaginationRowModel: Xi() },
    onSortingChange: u,
    getSortedRowModel: Go(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Yi(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: N,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: v
    }
  }), C = k.getVisibleFlatColumns();
  let z;
  return w ? z = Array.from({ length: 10 }).map((E, D) => `skeleton-row-${D}`).map((E) => /* @__PURE__ */ r(Qt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Ne, { colSpan: C.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(dr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, E)) : ((j = k.getRowModel().rows) == null ? void 0 : j.length) > 0 ? z = k.getRowModel().rows.map((R) => /* @__PURE__ */ r(
    Qt,
    {
      onClick: () => i(R, k),
      "data-state": R.getIsSelected() && "selected",
      children: R.getVisibleCells().map(($) => /* @__PURE__ */ r(Ne, { children: Je($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    R.id
  )) : z = /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r(Ne, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Bw, { table: k }),
    /* @__PURE__ */ p(Mn, { stickyHeader: s, children: [
      /* @__PURE__ */ r(On, { stickyHeader: s, children: k.getHeaderGroups().map((R) => /* @__PURE__ */ r(Qt, { children: R.headers.map(($) => /* @__PURE__ */ r(on, { className: "tw-p-0", children: $.isPlaceholder ? void 0 : Je($.column.columnDef.header, $.getContext()) }, $.id)) }, R.id)) }),
      /* @__PURE__ */ r(In, { children: z })
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
    n && o && /* @__PURE__ */ r(Hw, { table: k })
  ] });
}
function Np({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = B(
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
      children: /* @__PURE__ */ r(Zi, { options: s, children: e })
    }
  );
}
const ec = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), co = (t, e) => t[e] ?? e;
function nc({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = co(n, "%webView_error_dump_header%"), s = co(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(yo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const kp = Object.freeze([
  ...ec,
  "%webView_error_dump_copied_message%"
]);
function _p({
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
    /* @__PURE__ */ r(fe, { asChild: !0, children: o }),
    /* @__PURE__ */ p(Yt, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(vt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        nc,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var rc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(rc || {});
function Cp({ id: t, label: e, groups: n }) {
  const [o, a] = S(
    Object.fromEntries(
      n.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = S({}), l = (c, d) => {
    const u = !o[c][d];
    a((m) => (m[c][d] = u, { ...m }));
    const f = n[c].items[d];
    f.onUpdate(f.id, u);
  }, w = (c, d) => {
    i((f) => (f[c] = d, { ...f }));
    const u = n[c].items.find((f) => f.id === d);
    u ? u.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(ue, { children: [
    /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ r(Ds, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(ze, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ee, { children: n.map((c, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(wn, { children: c.label }),
      /* @__PURE__ */ r(Oa, { children: c.itemType === 0 ? /* @__PURE__ */ r(lt, { children: c.items.map((u, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        te,
        {
          checked: o[d][f],
          onCheckedChange: () => l(d, f),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ r(
        jw,
        {
          value: s[d],
          onValueChange: (u) => w(d, u),
          children: c.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Pa, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ r(Ge, {})
    ] }, c.label)) })
  ] }) });
}
function Ep({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const w = new ni("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, u) => d + u, 0)), c = () => {
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
            /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" }),
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
                /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(Is, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function oc({ id: t, versionHistory: e }) {
  const [n, o] = S(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, u = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let m = "";
    return d > 0 ? m = `${d.toString()} year${d === 1 ? "" : "s"} ago` : u > 0 ? m = `${u.toString()} month${u === 1 ? "" : "s"} ago` : f === 0 ? m = "today" : m = `${f.toString()} day${f === 1 ? "" : "s"} ago`, m;
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
function Tp({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = B(() => ri(n), [n]), w = ((c) => {
    const d = new Intl.DisplayNames(oi(), { type: "language" });
    return c.map((u) => d.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(oc, { versionHistory: a }),
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
function ac({
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
  isDisabled: u = !1,
  sortSelected: f = !1,
  icon: m = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [N, y] = S(!1), k = K(
    (D) => {
      var P;
      const V = (P = t.find((I) => I.label === D)) == null ? void 0 : P.value;
      V && n(
        e.includes(V) ? e.filter((I) => I !== V) : [...e, V]
      );
    },
    [t, e, n]
  ), C = () => w || o, z = B(() => {
    if (!f) return t;
    const D = t.filter((P) => P.starred).sort((P, I) => P.label.localeCompare(I.label)), V = t.filter((P) => !P.starred).sort((P, I) => {
      const A = e.includes(P.value), W = e.includes(I.value);
      return A && !W ? -1 : !A && W ? 1 : P.label.localeCompare(I.label);
    });
    return [...D, ...V];
  }, [t, e, f]), j = () => {
    n(t.map((D) => D.value));
  }, R = () => {
    n([]);
  }, $ = c ?? N;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ p(oe, { open: $, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": $,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            m && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: m }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: C()
              }
            )
          ] }),
          /* @__PURE__ */ r(No, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Yt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ne, { children: [
      /* @__PURE__ */ r(Ke, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: j, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: R, children: i })
      ] }),
      /* @__PURE__ */ p(re, { children: [
        /* @__PURE__ */ r(ln, { children: l }),
        /* @__PURE__ */ r(Ut, { children: z.map((D) => /* @__PURE__ */ p(
          Ht,
          {
            value: D.label,
            onSelect: k,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                jt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(D.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              D.starred && /* @__PURE__ */ r(As, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: D.label }),
              D.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: D.secondaryLabel })
            ]
          },
          D.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Rp({
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
  id: u
}) {
  return /* @__PURE__ */ p("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      ac,
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
      var m;
      return /* @__PURE__ */ p(Pe, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ r(je, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (m = t.find((g) => g.value === f)) == null ? void 0 : m.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(vt, { children: d })
  ] });
}
const sc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), po = (t, e) => t[e] ?? e;
function ic({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const w = B(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Ps, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        po(a, "%undoButton_tooltip%"),
        s && ` (${w ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r($s, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        po(a, "%redoButton_tooltip%"),
        s && ` (${w ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function lc({ children: t, editorRef: e }) {
  const n = H(null);
  return Y(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, d, u, f;
      if (!a || document.activeElement !== a) return;
      const w = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && w === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), (u = e.current) == null || u.undo()) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Ue = b.forwardRef(
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
Ue.displayName = "Input";
const wc = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(lt, { children: [
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
function cc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = H(null), i = H(null), l = H(!1), [w, c] = S(t), [d, u] = S(n), [f, m] = S(!1);
  Y(() => {
    c(t);
  }, [t]), Y(() => {
    d !== n && u(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, m(v), v || (w !== "custom" || d ? (e(w), o(d)) : (c(t), u(n)));
  }, x = (v) => {
    var N, y, k, C;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((y = i.current) == null || y.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((k = s.current) == null ? void 0 : k.selectionStart) === 0 && ((C = i.current) == null || C.focus(), l.current = !1), w === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ p(ue, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: wc(t, a, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ee,
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
          /* @__PURE__ */ r(wn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Ge, {}),
          /* @__PURE__ */ r(
            te,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: tr })
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
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: er })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            te,
            {
              ref: i,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var N;
                v.stopPropagation(), l.current = !0, (N = s.current) == null || N.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Ue,
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
                    onChange: (v) => u(v.target.value)
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
const dc = (t, e) => t === "f" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(_o, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(Co, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(lt, { children: [
  /* @__PURE__ */ r(ko, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), pc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ve(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function uc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(ue, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(zi, { asChild: !0, children: /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: dc(t, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: pc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(ee, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(wn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Ge, {}),
      /* @__PURE__ */ p(
        te,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ko, {}),
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
            /* @__PURE__ */ r(_o, {}),
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
            /* @__PURE__ */ r(Co, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const mc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function fc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ls, { className: e, size: 16 });
}
function uo({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    Ht,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(fc, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(Wo, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function hc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = S(""), [s, i] = B(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const w = e.filter(
      (d) => {
        var u;
        return (u = d.marker) == null ? void 0 : u.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !w.includes(d)
    );
    return [w, c];
  }, [o, e]);
  return /* @__PURE__ */ p(ne, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Ke,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(re, { children: [
      /* @__PURE__ */ r(ln, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Ut, { children: s.map((l) => {
        var w;
        return /* @__PURE__ */ r(
          uo,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      i.length > 0 && /* @__PURE__ */ p(lt, { children: [
        s.length > 0 && /* @__PURE__ */ r(xr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Ut, { children: i.map((l) => {
          var w;
          return /* @__PURE__ */ r(
            uo,
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
function gc(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = fn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[fn[l].description] ?? fn[l].description,
        action: () => {
          var c;
          const w = t.current;
          (c = w == null ? void 0 : w.insertMarker) == null || c.call(w, l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function bc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function vc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const xc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Sp({
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
  const d = H(null), u = H(null), f = H(null), m = H(null);
  It(() => {
    if (!m.current) return;
    const { width: _ } = m.current.getBoundingClientRect();
    _ > 0 && (m.current.style.width = `${_}px`);
  }, []);
  const [g, x] = S("generated"), [v, N] = S("*"), [y, k] = S("f"), [C, z] = S(!1), [j, R] = S(!0), [$, E] = S(!1), D = H(!1), V = H(""), [P, I] = S(!1), [A, W] = S(), [O, J] = S(), [St, At] = S(), [Mt, ht] = S(), pt = H(null), G = B(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? Qi(), noteMode: "expanded" }
    }),
    [i, l]
  ), at = B(
    () => gc(
      d,
      () => I(!1),
      w,
      Mt
    ),
    [w, Mt]
  );
  Y(() => {
    var _;
    P || (_ = d.current) == null || _.focus();
  }, [y, P]), Y(() => {
    var U, q;
    let _;
    D.current = !1, R(!0);
    const L = e == null ? void 0 : e.at(0);
    if (L && dn("note", L)) {
      const it = (U = L.insert.note) == null ? void 0 : U.caller;
      let tt = "custom";
      it === tr ? tt = "generated" : it === er ? tt = "hidden" : it && N(it), x(tt), k(((q = L.insert.note) == null ? void 0 : q.style) ?? "f"), _ = setTimeout(() => {
        var gt;
        (gt = d.current) == null || gt.applyUpdate([L]);
      }, 0);
    }
    return () => {
      _ && clearTimeout(_);
    };
  }, [e, s]);
  const st = K(
    (_, L, U = !1) => {
      var it, tt, gt;
      const q = (tt = (it = d.current) == null ? void 0 : it.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (q && dn("note", q)) {
        if (q.insert.note) {
          let ct;
          _ === "custom" ? ct = L : _ === "generated" ? ct = tr : ct = er, q.insert.note.caller = ct;
        }
        n == null || n([q]), U && c && s && ((gt = c.current) == null || gt.replaceEmbedUpdate(s, [q]));
      }
    },
    [s, n, c]
  ), wt = K(() => {
    st(g, v, !0), o();
  }, [g, v, o, st]), xt = H(wt);
  It(() => {
    xt.current = wt;
  });
  const Wt = H({ book: a.book, chapterNum: a.chapterNum });
  It(() => {
    (Wt.current.book !== a.book || Wt.current.chapterNum !== a.chapterNum) && (Wt.current = { book: a.book, chapterNum: a.chapterNum }, xt.current());
  }, [a.book, a.chapterNum]);
  const Bt = () => {
    var L;
    const _ = (L = u.current) == null ? void 0 : L.getElementsByClassName("editor-input")[0];
    _ != null && _.textContent && navigator.clipboard.writeText(_.textContent);
  }, Jt = K(
    (_) => {
      x(_), st(_, v);
    },
    [v, st]
  ), Re = K(
    (_) => {
      N(_), st(g, _);
    },
    [g, st]
  ), se = (_) => {
    var U, q, it, tt, gt;
    k(_);
    const L = (q = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : q.at(0);
    if (L && dn("note", L)) {
      L.insert.note && (L.insert.note.style = _);
      const ct = (tt = (it = L.insert.note) == null ? void 0 : it.contents) == null ? void 0 : tt.ops;
      y !== "x" && _ === "x" ? ct == null || ct.forEach((Dt) => bc(Dt)) : y === "x" && _ !== "x" && (ct == null || ct.forEach((Dt) => vc(Dt))), (gt = d.current) == null || gt.applyUpdate([L, { delete: 1 }]);
    }
  }, Zt = (_) => {
    ht(_.contextMarker), E(_.canRedo);
  }, qe = K(
    (_) => {
      var U, q, it, tt, gt;
      const L = (q = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (L && dn("note", L)) {
        _.content.length > 1 && setTimeout(() => {
          var Pt;
          (Pt = d.current) == null || Pt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const ct = (it = L.insert.note) == null ? void 0 : it.style, Dt = (gt = (tt = L.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : gt.ops;
        if (ct || z(!1), z(
          ct === "x" ? !!(Dt != null && Dt.every((Pt) => {
            var bt, mt;
            if (!((bt = Pt.attributes) != null && bt.char)) return !0;
            const T = ((mt = Pt.attributes) == null ? void 0 : mt.char).style;
            return T === "xt" || T === "xo" || T === "xq";
          })) : !!(Dt != null && Dt.every((Pt) => {
            var bt, mt;
            if (!((bt = Pt.attributes) != null && bt.char)) return !0;
            const T = ((mt = Pt.attributes) == null ? void 0 : mt.char).style;
            return T === "ft" || T === "fr" || T === "fq";
          }))
        ), !D.current) {
          D.current = !0, V.current = JSON.stringify(L), R(!0);
          return;
        }
        R(JSON.stringify(L) === V.current), st(g, v);
      } else
        z(!1), R(!0);
    },
    [g, v, st]
  ), M = K(() => {
    const _ = window.getSelection();
    if (f.current && at.length && _ && _.rangeCount > 0) {
      const L = _.getRangeAt(0).getBoundingClientRect(), U = f.current.getBoundingClientRect();
      W(L.left - U.left), J(L.top - U.top), At(L.height), I(!0);
    }
  }, [at, f]);
  return Y(() => {
    const _ = () => {
      P && I(!1);
    };
    return window.addEventListener("click", _), () => {
      window.removeEventListener("click", _);
    };
  }, [P]), Y(() => {
    var _;
    P && ((_ = pt.current) == null || _.focus());
  }, [P]), Y(() => {
    var U;
    const _ = ((U = u.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0, L = (q) => {
      !P && _ && document.activeElement === _ && q.key === l ? (q.preventDefault(), M()) : P && q.key === "Escape" && (q.preventDefault(), I(!1));
    };
    return document.addEventListener("keydown", L), () => {
      document.removeEventListener("keydown", L);
    };
  }, [P, M, l]), /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ p("div", { ref: m, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            uc,
            {
              isTypeSwitchable: C,
              noteType: y,
              handleNoteTypeChange: se,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            cc,
            {
              callerType: g,
              updateCallerType: Jt,
              customCaller: v,
              updateCustomCaller: Re,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            ic,
            {
              onUndoClick: () => {
                var _;
                return (_ = d.current) == null ? void 0 : _.undo();
              },
              onRedoClick: () => {
                var _;
                return (_ = d.current) == null ? void 0 : _.redo();
              },
              canUndo: !j,
              canRedo: $,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: wt,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(jt, {})
              }
            ) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(je, {}) }) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: u,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(lc, { editorRef: d, children: /* @__PURE__ */ r(
              tl,
              {
                options: G,
                onStateChange: Zt,
                onUsjChange: qe,
                defaultUsj: xc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
              /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: Bt,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(yo, {})
                }
              ) }),
              /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: w["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ p(oe, { open: P, children: [
      /* @__PURE__ */ r(
        wl,
        {
          className: "tw-absolute",
          style: {
            top: O,
            left: A,
            height: St,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Yt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (_) => {
            _.preventDefault(), _.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            hc,
            {
              markerMenuItems: at,
              localizedStrings: w,
              searchRef: pt
            }
          )
        }
      )
    ] })
  ] });
}
const Dp = Object.freeze([
  ...mc,
  ...Object.entries(fn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...sc
]);
function Va(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function yc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, w) => {
    const c = w === s.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Ir(t, l, n, !0, a),
      c && o
    ] }, Va(t, l));
  });
}
function Ir(t, e, n = !0, o = !0, a = []) {
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
              /* @__PURE__ */ r(Jn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Jn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return Nc(
        s,
        Va(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Nc(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Jn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ir(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function kc({
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
  ] }), u = i && /* @__PURE__ */ p(lt, { children: [
    Ir(t.marker, [i], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", m = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = h(f, m);
  return /* @__PURE__ */ p(lt, { children: [
    /* @__PURE__ */ p("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      w,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: u }),
    /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(lt, { children: yc(t.marker, l, o, c) })
      }
    )
  ] });
}
function Mp({
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
  const d = w ?? ai(n, void 0), u = (y, k) => {
    c == null || c(y, k, a);
  }, f = s ? n.findIndex((y) => y === s) : -1, [m, g] = S(f), x = (y, k, C) => {
    if (n.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), c == null || c(k, C, a);
          break;
      }
  }, v = (y) => {
    if (n.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((k) => Math.min(k + 1, n.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((k) => Math.max(k - 1, 0));
          break;
      }
  }, N = H([]);
  return Y(() => {
    var y;
    m >= 0 && m < N.current.length && ((y = N.current[m]) == null || y.focus());
  }, [m]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: m < 0 ? 0 : -1,
      className: h("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: v,
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
            const C = y === s, z = `${a}-${k}`;
            return /* @__PURE__ */ p(lt, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (j) => {
                    N.current[k] = j;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": y.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: k === m ? 0 : -1,
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
                  onClick: () => u(y, k),
                  onKeyDown: (j) => x(j, y, k),
                  children: /* @__PURE__ */ r(
                    kc,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => d(y.caller, k),
                      showMarkers: i
                    }
                  )
                },
                z
              ),
              k < n.length - 1 && o === "vertical" && /* @__PURE__ */ r($e, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function _c(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function Cc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = B(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(Mn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(On, { stickyHeader: !0, children: /* @__PURE__ */ p(Qt, { children: [
      /* @__PURE__ */ r(on, { children: a }),
      /* @__PURE__ */ r(on, { children: s })
    ] }) }),
    /* @__PURE__ */ r(In, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ p(
      Qt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Ne, { children: xe(l.reference, "English") }),
          /* @__PURE__ */ r(Ne, { className: o, children: _c(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Ar = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      nr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ar.displayName = nr.Root.displayName;
const Ec = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Fs, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Bs, { className: "tw-h-4 tw-w-4" });
}, An = (t, e, n) => /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ p(
    Et,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        Ec(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(_t, { side: "bottom", children: e })
] }) }), Op = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => An(e, t)
}), Tc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => An(n, t)
}), Ip = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => An(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), qn = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((w) => {
    e === "approved" ? i.includes(w) || i.push(w) : i = i.filter((c) => c !== w);
  }), o(i);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), s(l);
}, Ap = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => An(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(Sr, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        tn,
        {
          onClick: (w) => {
            w.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r(Vs, {})
        }
      ),
      /* @__PURE__ */ r(
        tn,
        {
          onClick: (w) => {
            w.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r(js, {})
        }
      ),
      /* @__PURE__ */ r(
        tn,
        {
          onClick: (w) => {
            w.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r(zs, {})
        }
      )
    ] });
  }
}), Pp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), $p = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Lp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Rc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Vp = Object.freeze([
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
]), Sc = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Dc = (t, e, n) => t.map((o) => {
  const a = Kr(o.key) ? o.key : o.key[0];
  return {
    items: Kr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Rc(a, e, n),
    occurrences: o.occurrences || []
  };
}), Kt = (t, e) => t[e] ?? e;
function jp({
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
  classNameForVerseText: u,
  onItemSelected: f
}) {
  const m = Kt(n, "%webView_inventory_all%"), g = Kt(n, "%webView_inventory_approved%"), x = Kt(n, "%webView_inventory_unapproved%"), v = Kt(n, "%webView_inventory_unknown%"), N = Kt(n, "%webView_inventory_scope_currentBook%"), y = Kt(n, "%webView_inventory_scope_chapter%"), k = Kt(n, "%webView_inventory_scope_verse%"), C = Kt(n, "%webView_inventory_filter_text%"), z = Kt(
    n,
    "%webView_inventory_show_additional_items%"
  ), j = Kt(n, "%webView_inventory_no_results%"), [R, $] = S(!1), [E, D] = S("all"), [V, P] = S(""), [I, A] = S([]), W = B(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : Dc(G, a, s);
  }, [t, a, s]), O = B(() => {
    if (R) return W;
    const G = [];
    return W.forEach((at) => {
      const st = at.items[0], wt = G.find(
        (xt) => xt.items[0] === st
      );
      wt ? (wt.count += at.count, wt.occurrences = wt.occurrences.concat(at.occurrences)) : G.push({
        items: [st],
        count: at.count,
        occurrences: at.occurrences,
        status: at.status
      });
    }), G;
  }, [R, W]), J = B(() => O.length === 0 ? [] : Sc(O, E, V), [O, E, V]), St = B(() => {
    var st, wt;
    if (!R) return w;
    const G = (st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st.length;
    if (!G) return w;
    const at = [];
    for (let xt = 0; xt < G; xt++)
      at.push(
        Tc(
          ((wt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : wt[xt]) || "Additional Item",
          xt + 1
        )
      );
    return [...at, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, R]);
  Y(() => {
    J.length === 0 ? A([]) : J.length === 1 && A(J[0].items);
  }, [J]);
  const At = (G, at) => {
    at.setRowSelection(() => {
      const wt = {};
      return wt[G.index] = !0, wt;
    });
    const st = G.original.items;
    A(st), f && st.length > 0 && f(st[0]);
  }, Mt = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      l(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, ht = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      D(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, pt = B(() => {
    if (O.length === 0 || I.length === 0) return [];
    const G = O.filter((at) => si(
      R ? at.items : [at.items[0]],
      I
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [I, R, O]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Le,
        {
          onValueChange: (G) => ht(G),
          defaultValue: E,
          children: [
            /* @__PURE__ */ r(Ee, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ve, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Te, { children: [
              /* @__PURE__ */ r(Ot, { value: "all", children: m }),
              /* @__PURE__ */ r(Ot, { value: "approved", children: g }),
              /* @__PURE__ */ r(Ot, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Ot, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Le, { onValueChange: (G) => Mt(G), defaultValue: i, children: [
        /* @__PURE__ */ r(Ee, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ve, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Te, { children: [
          /* @__PURE__ */ r(Ot, { value: "book", children: N }),
          /* @__PURE__ */ r(Ot, { value: "chapter", children: y }),
          /* @__PURE__ */ r(Ot, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ue,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: C,
          value: V,
          onChange: (G) => {
            P(G.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Ct, { children: [
        /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Ar,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: R,
              onCheckedChange: (G) => {
                $(G);
              }
            }
          ),
          /* @__PURE__ */ r(vt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? z })
        ] }) }),
        /* @__PURE__ */ r(_t, { children: (o == null ? void 0 : o.checkboxText) ?? z })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      tc,
      {
        columns: St,
        data: J,
        onRowClickHandler: At,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: j
      }
    ) }),
    pt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Cc,
      {
        classNameForText: u,
        occurrenceData: pt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const Mc = "16rem", Oc = "3rem", ja = b.createContext(void 0);
function Pn() {
  const t = b.useContext(ja);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const za = b.forwardRef(
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
    const [c, d] = b.useState(t), u = e ?? c, f = b.useCallback(
      (k) => {
        const C = typeof k == "function" ? k(u) : k;
        n ? n(C) : d(C);
      },
      [n, u]
    ), m = b.useCallback(() => f((k) => !k), [f]), g = u ? "expanded" : "collapsed", N = ft() === "ltr" ? i : i === "primary" ? "secondary" : "primary", y = b.useMemo(
      () => ({
        state: g,
        open: u,
        setOpen: f,
        toggleSidebar: m,
        side: N
      }),
      [g, u, f, m, N]
    );
    return /* @__PURE__ */ r(ja.Provider, { value: y, children: /* @__PURE__ */ r(kt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Mc,
            "--sidebar-width-icon": Oc,
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
za.displayName = "SidebarProvider";
const Fa = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Pn();
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
Fa.displayName = "Sidebar";
const Ic = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Pn();
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
        a.side === "primary" ? /* @__PURE__ */ r(Ks, {}) : /* @__PURE__ */ r(Gs, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Ic.displayName = "SidebarTrigger";
const Ac = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Pn();
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
Ac.displayName = "SidebarRail";
const Ba = b.forwardRef(
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
Ba.displayName = "SidebarInset";
const Pc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ue,
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
Pc.displayName = "SidebarInput";
const $c = b.forwardRef(
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
$c.displayName = "SidebarHeader";
const Lc = b.forwardRef(
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
Lc.displayName = "SidebarFooter";
const Vc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $e,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Vc.displayName = "SidebarSeparator";
const Ka = b.forwardRef(
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
Ka.displayName = "SidebarContent";
const pr = b.forwardRef(
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
pr.displayName = "SidebarGroup";
const ur = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Fe : "div",
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
ur.displayName = "SidebarGroupLabel";
const jc = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Fe : "button",
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
jc.displayName = "SidebarGroupAction";
const mr = b.forwardRef(
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
mr.displayName = "SidebarGroupContent";
const Ga = b.forwardRef(
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
Ga.displayName = "SidebarMenu";
const Ua = b.forwardRef(
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
Ua.displayName = "SidebarMenuItem";
const zc = me(
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
), qa = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const w = t ? Fe : "button", { state: c } = Pn(), d = /* @__PURE__ */ r(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(zc({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: d }),
      /* @__PURE__ */ r(_t, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : d;
  }
);
qa.displayName = "SidebarMenuButton";
const Fc = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Fe : "button",
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
Fc.displayName = "SidebarMenuAction";
const Bc = b.forwardRef(
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
Bc.displayName = "SidebarMenuBadge";
const Kc = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(dr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          dr,
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
Kc.displayName = "SidebarMenuSkeleton";
const Gc = b.forwardRef(
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
Gc.displayName = "SidebarMenuSub";
const Uc = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Uc.displayName = "SidebarMenuSubItem";
const qc = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? Fe : "a",
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
qc.displayName = "SidebarMenuSubButton";
function Hc({
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
  const c = K(
    (f, m) => {
      o(f, m);
    },
    [o]
  ), d = K(
    (f) => {
      const m = n.find((g) => g.projectId === f);
      return m ? m.projectName : f;
    },
    [n]
  ), u = K(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Fa,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ p(Ka, { children: [
        /* @__PURE__ */ p(pr, { children: [
          /* @__PURE__ */ r(ur, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(mr, { children: /* @__PURE__ */ r(Ga, { children: Object.entries(e).map(([f, m]) => /* @__PURE__ */ r(Ua, { children: /* @__PURE__ */ r(
            qa,
            {
              onClick: () => c(f),
              isActive: u(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(pr, { children: [
          /* @__PURE__ */ r(ur, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(mr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            sr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const m = d(f);
                c(m, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Us, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Pr = an(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const w = ft();
    return /* @__PURE__ */ p("div", { id: i, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        go,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ue,
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
            /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Pr.displayName = "SearchBar";
function zp({
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
      Pr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      za,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Hc,
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
          /* @__PURE__ */ r(Ba, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ie = "scrBook", Yc = "scrRef", be = "source", Xc = "details", Wc = "Scripture Reference", Jc = "Scripture Book", Ha = "Type", Zc = "Details";
function Qc(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ie,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Wc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ut.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ie ? xe(a.start) : void 0;
      },
      getGroupingValue: (o) => ut.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Zn(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => xe(o.start),
      id: Yc,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : xe(a.start);
      },
      sortingFn: (o, a) => Zn(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Ha : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Xc,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Zc,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const td = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Zn(t.start, t.end) === 0 ? `${$n(t.start)}+${e}` : `${$n(t.start)}+${e}-${$n(t.end)}+${n}`;
}, mo = (t) => `${td({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Fp({
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
  const [c, d] = S([]), [u, f] = S([{ id: ie, desc: !1 }]), [m, g] = S({}), x = B(
    () => t.flatMap((E) => E.data.map((D) => ({
      ...D,
      source: E.source
    }))),
    [t]
  ), v = B(
    () => Qc(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  Y(() => {
    c.includes(be) ? f([
      { id: be, desc: !1 },
      { id: ie, desc: !1 }
    ]) : f([{ id: ie, desc: !1 }]);
  }, [c]);
  const N = Ko({
    data: x,
    columns: v,
    state: {
      grouping: c,
      sorting: u,
      rowSelection: m
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Ji(),
    getGroupedRowModel: Wi(),
    getCoreRowModel: Uo(),
    getSortedRowModel: Go(),
    getRowId: mo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (l) {
      const E = N.getSelectedRowModel().rowsById, D = Object.keys(E);
      if (D.length === 1) {
        const V = x.find((P) => mo(P) === D[0]) || void 0;
        V && l(V);
      }
    }
  }, [m, x, l, N]);
  const y = a ?? Jc, k = s ?? Ha, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ie] },
    { label: `Group by ${k}`, value: [be] },
    {
      label: `Group by ${y} and ${k}`,
      value: [ie, be]
    },
    {
      label: `Group by ${k} and ${y}`,
      value: [be, ie]
    }
  ], z = (E) => {
    d(JSON.parse(E));
  }, j = (E, D) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(D);
  }, R = (E, D) => E.getIsGrouped() ? "" : h("banded-row", D % 2 === 0 ? "even" : "odd"), $ = (E, D, V) => {
    if (!((E == null ? void 0 : E.length) === 0 || D.depth < V.column.getGroupedIndex())) {
      if (D.getIsGrouped())
        switch (D.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (D.depth) {
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
      Le,
      {
        value: JSON.stringify(c),
        onValueChange: (E) => {
          z(E);
        },
        children: [
          /* @__PURE__ */ r(Ee, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ve, {}) }),
          /* @__PURE__ */ r(Te, { position: "item-aligned", children: /* @__PURE__ */ r(Kw, { children: C.map((E) => /* @__PURE__ */ r(Ot, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Mn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(On, { children: N.getHeaderGroups().map((E) => /* @__PURE__ */ r(Qt, { children: E.headers.filter((D) => D.column.columnDef.header).map((D) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(on, { colSpan: D.colSpan, className: "top-0 tw-sticky", children: D.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          D.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${D.column.columnDef.header}`,
              onClick: D.column.getToggleGroupingHandler(),
              type: "button",
              children: D.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Je(D.column.columnDef.header, D.getContext())
        ] }) }, D.id)
      )) }, E.id)) }),
      /* @__PURE__ */ r(In, { children: N.getRowModel().rows.map((E, D) => {
        const V = ft();
        return /* @__PURE__ */ r(
          Qt,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: h(R(E, D)),
            onClick: (P) => j(E, P),
            children: E.getVisibleCells().map((P) => {
              if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== be || !n)))
                return /* @__PURE__ */ r(
                  Ne,
                  {
                    className: h(
                      P.column.columnDef.id,
                      "tw-p-[1px]",
                      $(c, E, P)
                    ),
                    children: P.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ r(ze, {}),
                          !E.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ r(Oe, {}) : /* @__PURE__ */ r(Wn, {})),
                          " ",
                          Je(P.column.columnDef.cell, P.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : Je(P.column.columnDef.cell, P.getContext())
                  },
                  P.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
const $r = (t, e) => t.filter((n) => {
  try {
    return We(n) === e;
  } catch {
    return !1;
  }
}), Ya = (t, e, n) => $r(t, e).every((o) => n.includes(o));
function ed({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = $r(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        Ya(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: ll(
        t,
        i,
        l,
        w,
        c
      )
    }
  );
}
const fo = 5, Hn = 6;
function nd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: f, ntLong: m, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, N] = S(!1), [y, k] = S(""), C = H(void 0), z = H(!1);
  if (t.length !== ut.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const j = B(() => ut.allBookIds.filter(
    (A, W) => t[W] === "1" && !ut.isObsolete(ut.bookIdToNumber(A))
  ), [t]), R = B(() => {
    if (!y.trim()) {
      const O = {
        [X.OT]: [],
        [X.NT]: [],
        [X.DC]: [],
        [X.Extra]: []
      };
      return j.forEach((J) => {
        const St = We(J);
        O[St].push(J);
      }), O;
    }
    const A = j.filter(
      (O) => Nr(O, y, a)
    ), W = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return A.forEach((O) => {
      const J = We(O);
      W[J].push(O);
    }), W;
  }, [j, y, a]), $ = K(
    (A, W = !1) => {
      if (!W || !C.current) {
        n(
          e.includes(A) ? e.filter((ht) => ht !== A) : [...e, A]
        ), C.current = A;
        return;
      }
      const O = j.findIndex((ht) => ht === C.current), J = j.findIndex((ht) => ht === A);
      if (O === -1 || J === -1) return;
      const [St, At] = [
        Math.min(O, J),
        Math.max(O, J)
      ], Mt = j.slice(St, At + 1).map((ht) => ht);
      n(
        e.includes(A) ? e.filter((ht) => !Mt.includes(ht)) : [.../* @__PURE__ */ new Set([...e, ...Mt])]
      );
    },
    [e, n, j]
  ), E = (A) => {
    $(A, z.current), z.current = !1;
  }, D = (A, W) => {
    A.preventDefault(), $(W, A.shiftKey);
  }, V = K(
    (A) => {
      const W = $r(j, A).map((O) => O);
      n(
        Ya(j, A, e) ? e.filter((O) => !W.includes(O)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, n, j]
  ), P = () => {
    n(j.map((A) => A));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(X).map((A) => /* @__PURE__ */ r(
      ed,
      {
        section: A,
        availableBookIds: j,
        selectedBookIds: e,
        onToggle: V,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ p(
      oe,
      {
        open: v,
        onOpenChange: (A) => {
          N(A), A || k("");
        },
        children: [
          /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(No, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Yt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ne,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (z.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ke,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: k
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: P, children: w }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: I, children: c })
                ] }),
                /* @__PURE__ */ p(re, { children: [
                  /* @__PURE__ */ r(ln, { children: d }),
                  Object.values(X).map((A, W) => {
                    const O = R[A];
                    if (O.length !== 0)
                      return /* @__PURE__ */ p(ho, { children: [
                        /* @__PURE__ */ r(
                          Ut,
                          {
                            heading: Jo(A, f, m, g, x),
                            children: O.map((J) => /* @__PURE__ */ r(
                              Qo,
                              {
                                bookId: J,
                                isSelected: e.includes(J),
                                onSelect: () => E(J),
                                onMouseDown: (St) => D(St, J),
                                section: We(J),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ar(J, a),
                                className: "tw-flex tw-items-center"
                              },
                              J
                            ))
                          }
                        ),
                        W < Object.values(X).length - 1 && /* @__PURE__ */ r(xr, {})
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
        e.length === Hn ? Hn : fo
      ).map((A) => /* @__PURE__ */ r(Pe, { className: "hover:tw-bg-secondary", variant: "secondary", children: Me(A, a) }, A)),
      e.length > Hn && /* @__PURE__ */ r(
        Pe,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - fo} ${u}`
        }
      )
    ] })
  ] });
}
const Bp = Object.freeze([
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
]), he = (t, e) => t[e] ?? e;
function Kp({
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
  const c = he(
    i,
    "%webView_scope_selector_selected_text%"
  ), d = he(
    i,
    "%webView_scope_selector_current_verse%"
  ), u = he(
    i,
    "%webView_scope_selector_current_chapter%"
  ), f = he(i, "%webView_scope_selector_current_book%"), m = he(i, "%webView_scope_selector_choose_books%"), g = he(i, "%webView_scope_selector_scope%"), x = he(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: m, id: "scope-selected" }
  ], N = e ? v.filter((y) => e.includes(y.value)) : v;
  return /* @__PURE__ */ p("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r("div", { className: "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", children: g }),
      /* @__PURE__ */ r(
        kr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: y, label: k, id: C }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(xn, { className: "tw-me-2", value: y, id: C }),
            /* @__PURE__ */ r(vt, { htmlFor: C, children: k })
          ] }, C))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r("div", { className: "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", children: x }),
      /* @__PURE__ */ r(
        nd,
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
const Yn = {
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
function Gp({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Yn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, d]) => [
          c,
          c === d && c in Yn ? Yn[c] : d
        ]
      )
    )
  }, w = ft();
  return /* @__PURE__ */ p(
    Le,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Ee, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Ve,
          {
            placeholder: l[Q(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Te,
          {
            id: i,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(Ot, { value: `${c}`, children: l[Q(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Up({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function qp({
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
function Hp({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r($e, {}) : ""
  ] });
}
function Xa(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function _n({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Wa = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ p(Ct, { children: [
  /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    kn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(_n, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(_n, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Vw, { children: [
    /* @__PURE__ */ r(Ia, { children: l.label }),
    /* @__PURE__ */ r(Lw, { children: /* @__PURE__ */ r(Aa, { children: Wa(
      t,
      e,
      Xa(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(_t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function fr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(ue, { variant: s, children: [
    /* @__PURE__ */ r(Ce, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(qs, {}) }) }),
    /* @__PURE__ */ r(ee, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ p(ho, { children: [
      /* @__PURE__ */ r(Oa, { children: /* @__PURE__ */ r(kt, { children: Wa(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ r(Ge, {})
    ] }, w)) })
  ] });
}
const Ja = b.forwardRef(
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
function Yp({
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
  return /* @__PURE__ */ p(Ja, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      fr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(Hs, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        fr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Ys, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function Xp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Ja, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    fr,
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
const Za = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    Rt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Za.displayName = Rt.List.displayName;
const Qa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Qa.displayName = Rt.List.displayName;
const rd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), ts = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Content,
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
ts.displayName = Rt.Content.displayName;
function Wp({
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
        Pr,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(Za, { children: [
      /* @__PURE__ */ r(Qa, { children: t.map((l) => /* @__PURE__ */ r(rd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(ts, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function od({ ...t }) {
  return /* @__PURE__ */ r(rt.Menu, { ...t });
}
function ad({ ...t }) {
  return /* @__PURE__ */ r(rt.Sub, { "data-slot": "menubar-sub", ...t });
}
const es = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Or.Provider, { value: a, children: /* @__PURE__ */ r(
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
es.displayName = rt.Root.displayName;
const ns = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ft();
  return /* @__PURE__ */ r(
    rt.Trigger,
    {
      ref: n,
      className: h(
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
ns.displayName = rt.Trigger.displayName;
const rs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Ft();
  return /* @__PURE__ */ p(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
rs.displayName = rt.SubTrigger.displayName;
const os = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Ft();
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
os.displayName = rt.SubContent.displayName;
const as = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Ft();
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
as.displayName = rt.Content.displayName;
const ss = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Ft();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
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
ss.displayName = rt.Item.displayName;
const sd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Ft();
  return /* @__PURE__ */ p(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
sd.displayName = rt.CheckboxItem.displayName;
const id = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ft();
  return /* @__PURE__ */ p(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(En, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
id.displayName = rt.RadioItem.displayName;
const ld = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
ld.displayName = rt.Label.displayName;
const is = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
is.displayName = rt.Separator.displayName;
const Ye = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ls = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ p(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        ss,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(_n, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(_n, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ p(ad, { children: [
        /* @__PURE__ */ r(rs, { children: c.label }),
        /* @__PURE__ */ r(os, { children: ls(
          t,
          e,
          Xa(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(_t, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && i < a.length - 1 && w.push(/* @__PURE__ */ r(is, {}, `separator-${s}`)), w;
  });
};
function wd({
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
  if (el(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, u) => {
    var g, x, v, N;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        Ye(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Ye(s, [f, m]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), Ye(i, [f, m]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), Ye(l, [f, m]);
        break;
      case "alt+h":
        (N = w.current) == null || N.focus(), Ye(w, [f, m]);
        break;
    }
  }), Y(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((m) => {
      m.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((m) => {
      d.observe(m, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(es, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, u]) => typeof d == "boolean" || typeof u == "boolean" ? 0 : d.order - u.order).map(([d, u]) => /* @__PURE__ */ p(od, { children: [
      /* @__PURE__ */ r(ns, { ref: c(d), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ r(
        as,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(kt, { children: ls(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Jp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Zp({
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
                    wd,
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
const cd = (t, e) => t[e] ?? e;
function Qp({
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
  const c = cd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, u] = S(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), u(!1);
  }, m = (g, x) => {
    var N, y, k, C, z, j;
    const v = x !== g ? ((y = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : y[x]) ?? ((C = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : C.en) : void 0;
    return v ? `${(z = t[g]) == null ? void 0 : z.autonym} (${v})` : (j = t[g]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ p("div", { id: w, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Le,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ r(Ee, { children: /* @__PURE__ */ r(Ve, {}) }),
          /* @__PURE__ */ r(
            Te,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Ot, { value: g, children: m(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(vt, { className: "tw-font-normal tw-text-muted-foreground", children: ve(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => m(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function dd({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(vt, { children: e(t) }) : n ? /* @__PURE__ */ r(vt, { children: n(t) }) : /* @__PURE__ */ r(vt, { children: t });
}
function tu({
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
      Ar,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ r(
      dd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function eu({
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
  additionalSelectedContent: d,
  accentColor: u,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (g) => {
        if (g.key === "Enter" || g.key === " ") {
          if (g.target !== g.currentTarget) return;
          g.preventDefault(), n();
        }
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
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(ue, { children: [
              /* @__PURE__ */ r(Ce, { className: h(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Br, {}) }) }),
              /* @__PURE__ */ r(ee, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(ue, { children: [
              /* @__PURE__ */ r(Ce, { className: h(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Br, {}) }) }),
              /* @__PURE__ */ r(ee, { align: "end", children: c })
            ] })
          ] }),
          e && d && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: d })
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
const pd = an(({ className: t, ...e }, n) => /* @__PURE__ */ r(Xs, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
pd.displayName = "Spinner";
function nu({
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
  onChange: u,
  onFocus: f,
  onBlur: m
}) {
  return /* @__PURE__ */ p("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      vt,
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
      Ue,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: h(w, { "tw-border-red-600": n }),
        defaultValue: c,
        value: d,
        onChange: u,
        onFocus: f,
        onBlur: m
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const ud = me(
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
), md = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      ud({ variant: e }),
      t
    ),
    ...n
  }
));
md.displayName = "Alert";
const fd = b.forwardRef(
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
fd.displayName = "AlertTitle";
const hd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
hd.displayName = "AlertDescription";
const ru = ot.Root, ou = ot.Trigger, au = ot.Group, su = ot.Portal, iu = ot.Sub, lu = ot.RadioGroup, gd = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
gd.displayName = ot.SubTrigger.displayName;
const bd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
bd.displayName = ot.SubContent.displayName;
const vd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
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
vd.displayName = ot.Content.displayName;
const xd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
xd.displayName = ot.Item.displayName;
const yd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
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
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
yd.displayName = ot.CheckboxItem.displayName;
const Nd = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  ot.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(En, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Nd.displayName = ot.RadioItem.displayName;
const kd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
kd.displayName = ot.Label.displayName;
const _d = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
_d.displayName = ot.Separator.displayName;
function Cd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Cd.displayName = "ContextMenuShortcut";
const ws = b.createContext({
  direction: "bottom"
});
function Ed({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(ws.Provider, { value: o, children: /* @__PURE__ */ r(
    zt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
Ed.displayName = "Drawer";
const wu = zt.Trigger, Td = zt.Portal, cu = zt.Close, cs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
cs.displayName = zt.Overlay.displayName;
const Rd = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(ws), i = {
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
  return /* @__PURE__ */ p(Td, { children: [
    /* @__PURE__ */ r(cs, {}),
    /* @__PURE__ */ p(
      zt.Content,
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
Rd.displayName = "DrawerContent";
function Sd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Sd.displayName = "DrawerHeader";
function Dd({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Dd.displayName = "DrawerFooter";
const Md = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Md.displayName = zt.Title.displayName;
const Od = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Od.displayName = zt.Description.displayName;
const Id = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  rr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      rr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Id.displayName = rr.Root.displayName;
function du({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    vr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const pu = vr.Panel;
function uu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    vr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(Ws, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function mu({ ...t }) {
  return /* @__PURE__ */ r(
    nl,
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
const Ad = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ p(
    Xe.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Xe.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Xe.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Xe.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Ad.displayName = Xe.Root.displayName;
const Pd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    or.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        or.Thumb,
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
Pd.displayName = or.Root.displayName;
const fu = Rt.Root, $d = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    Rt.List,
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
$d.displayName = Rt.List.displayName;
const Ld = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Ld.displayName = Rt.Trigger.displayName;
const Vd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Vd.displayName = Rt.Content.displayName;
const jd = b.forwardRef(
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
jd.displayName = "Textarea";
const hu = (t, e) => {
  Y(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function zd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Fd = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = zd(a.current);
  const [s, i] = S(() => o.current), [l, w] = S(!0);
  return Y(() => {
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
}, Xn = () => !1, gu = (t, e) => {
  const [n] = Fd(
    K(async () => {
      if (!t) return Xn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Xn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Y(() => () => {
    n !== Xn && n();
  }, [n]);
};
function bu(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Bd(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Bd(`*, ::before, ::after {
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
  md as Alert,
  hd as AlertDescription,
  fd as AlertTitle,
  Da as Avatar,
  Ma as AvatarFallback,
  $w as AvatarImage,
  fp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  hp as BOOK_SELECTOR_STRING_KEYS,
  Pe as Badge,
  mp as BookChapterControl,
  ir as BookSelectionMode,
  gp as BookSelector,
  F as Button,
  vp as COMMENT_EDITOR_STRING_KEYS,
  xp as COMMENT_LIST_STRING_KEYS,
  Ra as Card,
  Sa as CardContent,
  Aw as CardDescription,
  Pw as CardFooter,
  Ow as CardHeader,
  Iw as CardTitle,
  hl as ChapterRangeSelector,
  Ar as Checkbox,
  tu as Checklist,
  sr as ComboBox,
  ne as Command,
  ln as CommandEmpty,
  Ut as CommandGroup,
  Ke as CommandInput,
  Ht as CommandItem,
  re as CommandList,
  bp as CommentEditor,
  yp as CommentList,
  ru as ContextMenu,
  yd as ContextMenuCheckboxItem,
  vd as ContextMenuContent,
  au as ContextMenuGroup,
  xd as ContextMenuItem,
  kd as ContextMenuLabel,
  su as ContextMenuPortal,
  lu as ContextMenuRadioGroup,
  Nd as ContextMenuRadioItem,
  _d as ContextMenuSeparator,
  Cd as ContextMenuShortcut,
  iu as ContextMenuSub,
  bd as ContextMenuSubContent,
  gd as ContextMenuSubTrigger,
  ou as ContextMenuTrigger,
  tc as DataTable,
  Ed as Drawer,
  cu as DrawerClose,
  Rd as DrawerContent,
  Od as DrawerDescription,
  Dd as DrawerFooter,
  Sd as DrawerHeader,
  cs as DrawerOverlay,
  Td as DrawerPortal,
  Md as DrawerTitle,
  wu as DrawerTrigger,
  ue as DropdownMenu,
  te as DropdownMenuCheckboxItem,
  ee as DropdownMenuContent,
  Oa as DropdownMenuGroup,
  kn as DropdownMenuItem,
  rc as DropdownMenuItemType,
  wn as DropdownMenuLabel,
  Lw as DropdownMenuPortal,
  jw as DropdownMenuRadioGroup,
  Pa as DropdownMenuRadioItem,
  Ge as DropdownMenuSeparator,
  zw as DropdownMenuShortcut,
  Vw as DropdownMenuSub,
  Aa as DropdownMenuSubContent,
  Ia as DropdownMenuSubTrigger,
  Ce as DropdownMenuTrigger,
  ec as ERROR_DUMP_STRING_KEYS,
  kp as ERROR_POPOVER_STRING_KEYS,
  lc as EditorKeyboardShortcuts,
  nc as ErrorDump,
  _p as ErrorPopover,
  Dp as FOOTNOTE_EDITOR_STRING_KEYS,
  Rp as Filter,
  Cp as FilterDropdown,
  Tp as Footer,
  Sp as FootnoteEditor,
  kc as FootnoteItem,
  Mp as FootnoteList,
  Vp as INVENTORY_STRING_KEYS,
  Ue as Input,
  jp as Inventory,
  vt as Label,
  mc as MARKER_MENU_STRING_KEYS,
  Np as MarkdownRenderer,
  hc as MarkerMenu,
  Ep as MoreInfo,
  ac as MultiSelectComboBox,
  Wp as NavigationContentSearch,
  oe as Popover,
  wl as PopoverAnchor,
  Yt as PopoverContent,
  fe as PopoverTrigger,
  Id as Progress,
  kr as RadioGroup,
  xn as RadioGroupItem,
  cl as RecentSearches,
  uu as ResizableHandle,
  pu as ResizablePanel,
  du as ResizablePanelGroup,
  eu as ResultsCard,
  Bp as SCOPE_SELECTOR_STRING_KEYS,
  Kp as ScopeSelector,
  Fp as ScriptureResultsViewer,
  Gp as ScrollGroupSelector,
  Pr as SearchBar,
  Le as Select,
  Te as SelectContent,
  Kw as SelectGroup,
  Ot as SelectItem,
  Uw as SelectLabel,
  La as SelectScrollDownButton,
  $a as SelectScrollUpButton,
  qw as SelectSeparator,
  Ee as SelectTrigger,
  Ve as SelectValue,
  $e as Separator,
  Up as SettingsList,
  Hp as SettingsListHeader,
  qp as SettingsListItem,
  Hc as SettingsSidebar,
  zp as SettingsSidebarContentSearch,
  Fa as Sidebar,
  Ka as SidebarContent,
  Lc as SidebarFooter,
  pr as SidebarGroup,
  jc as SidebarGroupAction,
  mr as SidebarGroupContent,
  ur as SidebarGroupLabel,
  $c as SidebarHeader,
  Pc as SidebarInput,
  Ba as SidebarInset,
  Ga as SidebarMenu,
  Fc as SidebarMenuAction,
  Bc as SidebarMenuBadge,
  qa as SidebarMenuButton,
  Ua as SidebarMenuItem,
  Kc as SidebarMenuSkeleton,
  Gc as SidebarMenuSub,
  qc as SidebarMenuSubButton,
  Uc as SidebarMenuSubItem,
  za as SidebarProvider,
  Ac as SidebarRail,
  Vc as SidebarSeparator,
  Ic as SidebarTrigger,
  dr as Skeleton,
  Ad as Slider,
  mu as Sonner,
  pd as Spinner,
  Pd as Switch,
  fr as TabDropdownMenu,
  Xp as TabFloatingMenu,
  Yp as TabToolbar,
  Mn as Table,
  In as TableBody,
  Qw as TableCaption,
  Ne as TableCell,
  Xw as TableFooter,
  on as TableHead,
  On as TableHeader,
  Qt as TableRow,
  fu as Tabs,
  Vd as TabsContent,
  $d as TabsList,
  Ld as TabsTrigger,
  nu as TextField,
  jd as Textarea,
  Sr as ToggleGroup,
  tn as ToggleGroupItem,
  Zp as Toolbar,
  Ct as Tooltip,
  _t as TooltipContent,
  kt as TooltipProvider,
  Et as TooltipTrigger,
  sc as UNDO_REDO_BUTTONS_STRING_KEYS,
  Qp as UiLanguageSelector,
  ic as UndoRedoButtons,
  Za as VerticalTabs,
  ts as VerticalTabsContent,
  Qa as VerticalTabsList,
  rd as VerticalTabsTrigger,
  Mw as badgeVariants,
  ta as buttonVariants,
  h as cn,
  Lp as getBookIdFromUSFM,
  An as getInventoryHeader,
  Pp as getLinesFromUSFM,
  $p as getNumberFromUSFM,
  Rc as getStatusForItem,
  Jp as getToolbarOSReservedSpaceClassName,
  Ip as inventoryCountColumn,
  Op as inventoryItemColumn,
  Ap as inventoryStatusColumn,
  Gw as selectTriggerVariants,
  yu as sonner,
  hu as useEvent,
  gu as useEventAsync,
  Dw as useListbox,
  Fd as usePromise,
  up as useRecentSearches,
  Pn as useSidebar,
  bu as useStylesheet
};
//# sourceMappingURL=index.js.map
