var Qa = Object.defineProperty;
var ts = (e, t, n) => t in e ? Qa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var kt = (e, t, n) => ts(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as r, jsxs as d, Fragment as pt } from "react/jsx-runtime";
import b, { forwardRef as an, useRef as Y, useMemo as j, useState as M, useCallback as U, useEffect as G, createContext as _n, useContext as pr, useLayoutEffect as Xt, Component as es, createElement as Ir, Suspense as ns, Fragment as so } from "react";
import { Command as St } from "cmdk";
import { X as $e, Search as io, Check as Gt, ArrowLeft as rs, CornerDownLeftIcon as Ar, ClockIcon as os, BookOpenIcon as as, HashIcon as ss, Circle as Cn, ChevronDown as Le, Clock as Pr, BoldIcon as is, ItalicIcon as ls, AtSign as lo, ChevronRight as En, Pencil as ws, Trash2 as cs, ArrowUp as wo, MoreHorizontal as ds, MailOpen as ps, Mail as us, ChevronUp as co, FilterIcon as ms, ArrowLeftIcon as fs, ChevronLeftIcon as hs, ChevronRightIcon as gs, ArrowRightIcon as bs, Copy as po, Filter as vs, User as xs, Link as ys, CircleHelp as Ns, ChevronsUpDown as uo, Star as ks, Undo as _s, Redo as Cs, SquareX as mo, FunctionSquare as fo, SquareSigma as ho, Ban as Es, AlertCircle as Xn, CircleCheckIcon as Rs, CircleXIcon as Ts, CircleHelpIcon as Ss, ArrowUpIcon as Ds, ArrowDownIcon as Ms, PanelLeft as Os, PanelRight as Is, ScrollText as As, ChevronLeft as Ps, MenuIcon as $s, Menu as Ls, EllipsisVertical as js, MoreVertical as $r, LoaderCircle as Vs, GripVertical as zs } from "lucide-react";
import { clsx as Bs } from "clsx";
import { extendTailwindMerge as Fs } from "tailwind-merge";
import * as Ft from "@radix-ui/react-dialog";
import { Canon as dt } from "@sillsdev/scripture";
import { includes as wn, Section as W, getChaptersForBook as Gs, formatScrRef as De, getSectionForBook as He, formatRelativeDate as Us, formatReplacementString as ve, sanitizeHtml as qs, NumberFormat as Ks, formatBytes as Hs, getCurrentLocale as Ys, usfmMarkers as mn, getFormatCallerFunction as Xs, deepEqual as Ws, isString as Lr, compareScrRefs as Wn, scrRefToBBBCCCVVV as $n, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import { cva as ue } from "class-variance-authority";
import { Slot as je } from "@radix-ui/react-slot";
import * as go from "@radix-ui/react-label";
import * as Qe from "@radix-ui/react-radio-group";
import * as Me from "@radix-ui/react-popover";
import { createEditor as bo, $getRoot as le, $createParagraphNode as Rn, $getSelection as Qt, HISTORY_MERGE_TAG as ur, ParagraphNode as vo, TextNode as xo, $isTokenOrSegmented as Js, $getCharacterOffsets as Zs, $cloneWithPropertiesEphemeral as Qs, $findMatchingParent as ti, $isElementNode as xe, CLEAR_EDITOR_COMMAND as yo, COMMAND_PRIORITY_EDITOR as No, $isRangeSelection as tn, mergeRegister as we, shallowMergeConfig as ei, defineExtension as ee, safeCast as sn, RootNode as ni, LineBreakNode as ri, TabNode as oi, $isEditorState as ai, createCommand as si, CLICK_COMMAND as ii, isDOMNode as li, $getNodeFromDOMNode as wi, $isNodeSelection as ci, $createNodeSelection as di, $setSelection as pi, COMMAND_PRIORITY_LOW as ui, DecoratorNode as mi, addClassNamesToElement as ko, $create as fi, $getNodeByKey as hi, removeClassNamesFromElement as gi, KEY_TAB_COMMAND as bi, $isBlockElementNode as gn, $createRangeSelection as vi, $normalizeSelection__EXPERIMENTAL as xi, OUTDENT_CONTENT_COMMAND as yi, INDENT_CONTENT_COMMAND as jr, INSERT_TAB_COMMAND as Ni, COMMAND_PRIORITY_CRITICAL as mr, $isDecoratorNode as ki, $isParagraphNode as _i, $isTextNode as bn, SELECTION_CHANGE_COMMAND as _o, FORMAT_TEXT_COMMAND as Ci, getRegisteredNode as Ei, isHTMLElement as Ri, isDocumentFragment as Vr, isDOMDocumentNode as Ti, ArtificialNode__DO_NOT_USE as Co, $createLineBreakNode as Eo, $isRootOrShadowRoot as Si, isBlockDomNode as zr, isInlineDomNode as Br, $insertNodes as Di } from "lexical";
import * as Ne from "@radix-ui/react-tooltip";
import { TooltipTrigger as Mi } from "@radix-ui/react-tooltip";
import { HeadingNode as Oi, QuoteNode as Ii, registerRichText as Ai } from "@lexical/rich-text";
import { flushSync as Pi, createPortal as $i } from "react-dom";
import { $isTableSelection as Li } from "@lexical/table";
import * as Tn from "@radix-ui/react-toggle-group";
import * as Ro from "@radix-ui/react-toggle";
import { createHeadlessEditor as To } from "@lexical/headless";
import * as So from "@radix-ui/react-separator";
import * as Ve from "@radix-ui/react-avatar";
import * as nt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ji } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Do, getFilteredRowModel as Vi, getSortedRowModel as Mo, getPaginationRowModel as zi, getCoreRowModel as Oo, flexRender as Ye, getGroupedRowModel as Bi, getExpandedRowModel as Fi } from "@tanstack/react-table";
import * as wt from "@radix-ui/react-select";
import Gi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Jn, HIDDEN_NOTE_CALLER as Zn, getDefaultViewOptions as Ui, isInsertEmbedOpOfType as cn, Editorial as qi } from "@eten-tech-foundation/platform-editor";
import * as Qn from "@radix-ui/react-checkbox";
import * as Dt from "@radix-ui/react-tabs";
import * as rt from "@radix-ui/react-menubar";
import { useHotkeys as Ki } from "react-hotkeys-hook";
import * as ot from "@radix-ui/react-context-menu";
import { Drawer as Ut } from "vaul";
import * as tr from "@radix-ui/react-progress";
import * as fr from "react-resizable-panels";
import { Toaster as Hi } from "sonner";
import { toast as du } from "sonner";
import * as Ke from "@radix-ui/react-slider";
import * as er from "@radix-ui/react-switch";
const Yi = Fs({ prefix: "tw-" });
function h(...e) {
  return Yi(Bs(e));
}
const Xi = "layoutDirection";
function bt() {
  const e = localStorage.getItem(Xi);
  return e === "rtl" ? e : "ltr";
}
const Io = Ft.Root, Wi = Ft.Portal, Ao = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ft.Overlay,
  {
    ref: n,
    className: h(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Ao.displayName = Ft.Overlay.displayName;
const hr = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = bt();
  return /* @__PURE__ */ d(Wi, { children: [
    /* @__PURE__ */ r(Ao, {}),
    /* @__PURE__ */ d(
      Ft.Content,
      {
        ref: o,
        className: h(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...n,
        dir: a,
        children: [
          t,
          /* @__PURE__ */ d(
            Ft.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r($e, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
hr.displayName = Ft.Content.displayName;
function Po({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        e
      ),
      ...t
    }
  );
}
Po.displayName = "DialogHeader";
const $o = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ft.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
$o.displayName = Ft.Title.displayName;
const Ji = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ft.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Ji.displayName = Ft.Description.displayName;
const ne = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
ne.displayName = St.displayName;
function Zi({ children: e, shouldFilter: t, ...n }) {
  return /* @__PURE__ */ r(Io, { ...n, children: /* @__PURE__ */ r(hr, { className: "tw-overflow-hidden tw-p-0 tw-shadow-lg", children: /* @__PURE__ */ r(
    ne,
    {
      shouldFilter: t,
      className: "[&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:tw-pt-0 [&_[cmdk-group]]:tw-px-2 [&_[cmdk-input-wrapper]_svg]:tw-h-5 [&_[cmdk-input-wrapper]_svg]:tw-w-5 [&_[cmdk-input]]:tw-h-12 [&_[cmdk-item]]:tw-px-2 [&_[cmdk-item]]:tw-py-3 [&_[cmdk-item]_svg]:tw-h-5 [&_[cmdk-item]_svg]:tw-w-5",
      children: e
    }
  ) }) });
}
const ze = b.forwardRef(({ className: e, icon: t, ...n }, o) => {
  const a = bt();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    t ?? /* @__PURE__ */ r(io, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      St.Input,
      {
        ref: o,
        className: h(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...n
      }
    )
  ] });
});
ze.displayName = St.Input.displayName;
const re = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
re.displayName = St.List.displayName;
const Be = b.forwardRef((e, t) => /* @__PURE__ */ r(St.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
Be.displayName = St.Empty.displayName;
const Ee = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ee.displayName = St.Group.displayName;
const Lo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
Lo.displayName = St.Separator.displayName;
const me = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
me.displayName = St.Item.displayName;
function jo({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
jo.displayName = "CommandShortcut";
const Vo = (e, t, n, o, a) => {
  switch (e) {
    case W.OT:
      return t ?? "Old Testament";
    case W.NT:
      return n ?? "New Testament";
    case W.DC:
      return o ?? "Deuterocanon";
    case W.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, Qi = (e, t, n, o, a) => {
  switch (e) {
    case W.OT:
      return t ?? "OT";
    case W.NT:
      return n ?? "NT";
    case W.DC:
      return o ?? "DC";
    case W.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function jt(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedName) ?? dt.bookIdToEnglishName(e);
}
function zo(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedId) ?? e.toUpperCase();
}
const Bo = dt.allBookIds.filter(
  (e) => !dt.isObsolete(dt.bookIdToNumber(e))
), en = Object.fromEntries(
  Bo.map((e) => [e, dt.bookIdToEnglishName(e)])
);
function gr(e, t, n) {
  const o = t.trim().toLowerCase();
  if (!o) return !1;
  const a = dt.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(wn(a.toLowerCase(), o) || wn(e.toLowerCase(), o) || (s ? wn(s.localizedName.toLowerCase(), o) || wn(s.localizedId.toLowerCase(), o) : !1));
}
const Fo = an(
  ({
    bookId: e,
    isSelected: t,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const p = Y(!1), m = () => {
      p.current || n == null || n(e), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, f = (v) => {
      p.current = !0, o ? o(v) : n == null || n(e);
    }, u = j(
      () => jt(e, l),
      [e, l]
    ), g = j(
      () => zo(e, l),
      [e, l]
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
        children: /* @__PURE__ */ d(
          me,
          {
            ref: w,
            value: c || `${e} ${dt.bookIdToEnglishName(e)}`,
            onSelect: m,
            onMouseDown: f,
            role: "option",
            "aria-selected": t,
            "aria-label": `${dt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                Gt,
                {
                  className: h(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    t ? "tw-opacity-100" : "tw-opacity-0"
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
), tl = ue(
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
), ce = b.forwardRef(
  ({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", tl({ variant: t }), e), ...n })
);
ce.displayName = "Badge";
const Go = ue(
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
), z = b.forwardRef(
  ({ className: e, variant: t, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? je : "button", { className: h(Go({ variant: t, size: n, className: e })), ref: s, ...a })
);
z.displayName = "Button";
const Ln = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, el = [
  Ln.BOOK_ONLY,
  Ln.BOOK_CHAPTER,
  Ln.BOOK_CHAPTER_VERSE
];
function nl(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function Xe(e) {
  return Gs(dt.bookIdToNumber(e));
}
function rl(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const o = el.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, c = void 0, w = void 0] = i.slice(1);
        let p;
        const m = t.filter((f) => gr(f, l, n));
        if (m.length === 1 && ([p] = m), !p && c) {
          if (dt.isBookIdValid(l)) {
            const f = l.toUpperCase();
            t.includes(f) && (p = f);
          }
          if (!p && n) {
            const f = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && t.includes(f[0]) && ([p] = f);
          }
        }
        if (!p && c) {
          const u = ((g) => Object.keys(en).find(
            (v) => en[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let f = c ? parseInt(c, 10) : void 0;
          f && f > Xe(p) && (f = Math.max(Xe(p), 1));
          const u = w ? parseInt(w, 10) : void 0;
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
function ol({
  scrRef: e,
  handleSubmit: t,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: c
}) {
  const [w, p] = M(!1), [m, f] = M(""), [u, g] = M(-1), [v, x] = M(-1), N = Y(null), _ = Y(null), E = Y(null), C = j(() => o ? o() : Bo, [o]), L = j(() => ({
    [W.OT]: C.filter((K) => dt.isBookOT(K)),
    [W.NT]: C.filter((K) => dt.isBookNT(K)),
    [W.DC]: C.filter((K) => dt.isBookDC(K)),
    [W.Extra]: C.filter((K) => dt.extraBooks().includes(K))
  }), [C]), V = j(() => Object.values(L).flat(), [L]), S = j(() => {
    if (!m.trim()) return L;
    const k = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return [W.OT, W.NT, W.DC, W.Extra].forEach((H) => {
      k[H] = L[H].filter((lt) => gr(lt, m, a));
    }), k;
  }, [L, m, a]), D = j(() => Object.values(S).flat(), [S]), y = j(
    () => rl(m, V, a),
    [m, V, a]
  ), T = j(() => {
    if (m.trim() && (y == null ? void 0 : y.chapterNum) === void 0) {
      if (y) return y.book;
      if (D.length === 1) return D[0];
    }
  }, [m, y, D]), O = (y == null ? void 0 : y.book) ?? T ?? void 0, $ = U(
    (k) => {
      t(k), l && l(k);
    },
    [t, l]
  ), I = U(
    (k, K) => {
      $({
        book: k,
        chapterNum: K,
        verseNum: 1
      }), p(!1);
    },
    [$]
  ), A = U(
    (k) => {
      var lt;
      if (Xe(k) <= 1) {
        I(k, 1);
        return;
      }
      const H = a ? jt(k, a) : en[k];
      f(`${H} `), g(-1), x(-1), (lt = N.current) == null || lt.focus();
    },
    [I, a]
  ), X = U(
    (k) => {
      O && I(O, k);
    },
    [O, I]
  ), q = U(() => {
    y && I(y.book, y.chapterNum ?? 1);
  }, [y, I]), J = U((k) => {
    p(k), k && (f(""), g(-1), x(-1), setTimeout(() => {
      var K;
      return (K = N.current) == null ? void 0 : K.focus();
    }, 100));
  }, []);
  G(() => {
    if (!w) return;
    const k = setTimeout(() => {
      if (!_.current || m) return;
      const K = _.current.querySelector(
        `[data-book-id="${e.book}"]`
      );
      K && K.scrollIntoView({ block: "center", behavior: "instant" });
    }, 150);
    return () => clearTimeout(k);
  }, [w, e.book, m]);
  const Ct = U(() => {
    if (!E.current) return 10;
    const k = E.current.querySelectorAll("[data-chapter-btn]");
    if (k.length < 2) return 1;
    const K = k[0].offsetTop;
    let H = 0;
    for (let lt = 0; lt < k.length && k[lt].offsetTop === K; lt++)
      H++;
    return H || 1;
  }, []), Mt = U(() => {
    var k;
    g(-1), x(-1), (k = N.current) == null || k.focus();
  }, []), Lt = U(
    (k) => {
      var K;
      if (k.key === "Escape") {
        O && m ? (f(""), x(-1), k.stopPropagation(), k.preventDefault()) : p(!1);
        return;
      }
      if (k.key === "Tab") {
        k.preventDefault(), k.stopPropagation(), k.shiftKey ? Mt() : O ? x(0) : D.length > 0 && g(0);
        return;
      }
      if (O && v >= 0) {
        const H = Xe(O), lt = Ct(), Ot = (B) => {
          x(B);
        };
        if (k.key === "ArrowRight") {
          k.preventDefault(), v < H - 1 && Ot(v + 1);
          return;
        }
        if (k.key === "ArrowLeft") {
          k.preventDefault(), v > 0 && Ot(v - 1);
          return;
        }
        if (k.key === "ArrowDown") {
          k.preventDefault();
          const B = v + lt;
          B < H && Ot(B);
          return;
        }
        if (k.key === "ArrowUp") {
          k.preventDefault();
          const B = v - lt;
          B < 0 ? Mt() : Ot(B);
          return;
        }
        if (k.key === "Enter" || k.key === " ") {
          k.preventDefault(), X(v + 1);
          return;
        }
        const { isLetter: vt, isDigit: P } = nl(k.key);
        (vt || P) && (k.preventDefault(), f((B) => B + k.key), x(-1), (K = N.current) == null || K.focus());
        return;
      }
      if (!O && D.length > 0) {
        if (k.key === "ArrowDown") {
          k.preventDefault(), k.stopPropagation(), u < 0 ? g(0) : u + 1 < D.length && g(u + 1);
          return;
        }
        if (k.key === "ArrowUp") {
          if (k.preventDefault(), k.stopPropagation(), u < 0) return;
          u - 1 < 0 ? Mt() : g(u - 1);
          return;
        }
      }
      if (O && v < 0 && k.key === "ArrowDown") {
        k.preventDefault();
        const H = y != null && y.chapterNum ? y.chapterNum - 1 : 0;
        x(H);
        return;
      }
      if (k.key === "Enter") {
        if (y != null && y.chapterNum) {
          q();
          return;
        }
        if (!O && u >= 0 && u < D.length) {
          k.preventDefault(), A(D[u]);
          return;
        }
        if (!O && D.length === 1) {
          A(D[0]);
          return;
        }
      }
      k.key === " " && !O && u >= 0 && (k.preventDefault(), A(D[u]));
    },
    [
      O,
      m,
      v,
      u,
      D,
      y,
      Mt,
      Ct,
      X,
      q,
      A
    ]
  );
  G(() => {
    g(-1);
  }, [D.length]), G(() => {
    x(-1);
  }, [O]), G(() => {
    if (!E.current) return;
    const k = v >= 0 ? v : void 0;
    if (k === void 0) return;
    const H = E.current.querySelectorAll("[data-chapter-btn]")[k];
    H && H.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [v]);
  const ht = j(
    () => De(
      e,
      a ? jt(e.book, a) : "English"
    ),
    [e, a]
  ), { otLong: ut, ntLong: F, dcLong: at, extraLong: st } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, ct = U(
    (k) => Vo(k, ut, F, at, st),
    [ut, F, at, st]
  ), Et = !m && !O && i && i.length > 0, Kt = O ? Xe(O) : 0, Ht = j(() => v >= 0 && O ? `Enter to go to ${jt(O, a)} ${v + 1}` : y != null && y.chapterNum ? `Press Enter to go to ${jt(y.book, a)} ${y.chapterNum}` : T ? "Type a chapter number or click to select" : D.length === 1 && m ? `↓ Enter to select ${jt(D[0], a)}` : u >= 0 && u < D.length ? `Enter to select ${jt(D[u], a)}` : `${D.length} books available · Search books… e.g. "GEN 5" or "Genesis 5"`, [
    v,
    O,
    y,
    T,
    D,
    m,
    u,
    a
  ]);
  return /* @__PURE__ */ d(pt, { children: [
    /* @__PURE__ */ r(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": w,
        onClick: () => J(!0),
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: ht })
      }
    ),
    /* @__PURE__ */ d(
      Zi,
      {
        open: w,
        onOpenChange: J,
        shouldFilter: !1,
        children: [
          /* @__PURE__ */ r(
            ze,
            {
              ref: N,
              icon: O ? /* @__PURE__ */ r(
                z,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "tw-me-2 tw-h-8 tw-w-8 tw-shrink-0",
                  onClick: () => {
                    var k;
                    f(""), x(-1), (k = N.current) == null || k.focus();
                  },
                  children: /* @__PURE__ */ r(rs, { className: "tw-h-4 tw-w-4" })
                }
              ) : void 0,
              value: m,
              onValueChange: (k) => {
                f(k), x(-1), g(-1);
              },
              onKeyDown: Lt,
              onFocus: () => {
                x(-1), g(-1);
              },
              placeholder: 'Search books… e.g. "GEN 5" or "Genesis 5"',
              autoFocus: !0
            }
          ),
          (y == null ? void 0 : y.chapterNum) && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2", children: [
            /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              /* @__PURE__ */ r(Ar, { className: "tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" }),
              /* @__PURE__ */ d("span", { className: "tw-text-sm tw-text-foreground", children: [
                "Go to",
                " ",
                /* @__PURE__ */ d("span", { className: "tw-font-semibold", children: [
                  jt(y.book, a),
                  " ",
                  y.chapterNum,
                  y.verseNum ? `:${y.verseNum}` : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r(ce, { variant: "secondary", children: "ENTER" })
          ] }),
          !(y != null && y.chapterNum) && T && /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r(Ar, { className: "tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" }),
            /* @__PURE__ */ d("span", { className: "tw-text-sm tw-text-foreground", children: [
              "Select chapter in",
              " ",
              /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: jt(T, a) })
            ] })
          ] }) }),
          O && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-baseline tw-justify-between tw-border-b tw-px-4 tw-py-3", children: [
            /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-bold", children: jt(O, a) }),
            /* @__PURE__ */ d("span", { className: "tw-text-xs tw-uppercase tw-tracking-wider tw-text-muted-foreground", children: [
              Kt,
              " Chapters"
            ] })
          ] }),
          Et && /* @__PURE__ */ d("div", { className: "tw-border-b tw-px-2 tw-py-2", children: [
            /* @__PURE__ */ d("div", { className: "tw-mb-2 tw-flex tw-items-center tw-gap-1.5 tw-px-2", children: [
              /* @__PURE__ */ r(os, { className: "tw-h-3 tw-w-3 tw-text-muted-foreground" }),
              /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-medium tw-text-muted-foreground", children: (s == null ? void 0 : s["%history_recent%"]) ?? "Recent" })
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col tw-gap-1", children: i.map((k) => {
              const K = k.book === e.book && k.chapterNum === e.chapterNum;
              return /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  onClick: () => {
                    $(k), p(!1);
                  },
                  className: h(
                    "tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors",
                    K ? "tw-bg-accent tw-text-accent-foreground" : "hover:tw-bg-accent hover:tw-text-accent-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ r("span", { children: De(k, "English") }),
                    K && /* @__PURE__ */ r(ce, { variant: "secondary", className: "tw-text-[10px]", children: "Current" })
                  ]
                },
                `${k.book}-${k.chapterNum}-${k.verseNum}`
              );
            }) })
          ] }),
          O ? /* @__PURE__ */ r("div", { className: "tw-max-h-[300px] tw-overflow-x-hidden tw-overflow-y-auto tw-p-4", children: /* @__PURE__ */ r(
            "div",
            {
              ref: E,
              className: "tw-grid tw-grid-cols-5 sm:tw-grid-cols-8 md:tw-grid-cols-10 tw-gap-2",
              children: Array.from({ length: Kt }).map((k, K) => {
                const H = K + 1, lt = (y == null ? void 0 : y.chapterNum) === H, Ot = O === e.book && H === e.chapterNum, vt = v === K;
                return /* @__PURE__ */ r(
                  z,
                  {
                    "data-chapter-btn": !0,
                    tabIndex: -1,
                    variant: vt || lt ? "default" : Ot ? "secondary" : "outline",
                    onClick: () => X(H),
                    className: h(
                      "tw-aspect-square tw-h-auto tw-p-0 tw-font-mono",
                      vt && "tw-ring-2 tw-ring-ring tw-ring-offset-2"
                    ),
                    children: H
                  },
                  H
                );
              })
            }
          ) }) : /* @__PURE__ */ d(re, { ref: _, id: c, children: [
            Object.entries(S).map(([k, K]) => {
              if (K.length !== 0)
                return (
                  // eslint-disable-next-line no-type-assertion/no-type-assertion
                  /* @__PURE__ */ r(Ee, { heading: ct(k), children: K.map((H) => {
                    const lt = D.indexOf(H), Ot = u === lt;
                    return /* @__PURE__ */ r(
                      Fo,
                      {
                        bookId: H,
                        onSelect: (vt) => A(vt),
                        section: He(H),
                        commandValue: `${H} ${en[H]}`,
                        localizedBookNames: a,
                        className: h(
                          e.book === H && !Ot && "tw-bg-accent/50",
                          Ot && "tw-bg-accent tw-text-accent-foreground"
                        )
                      },
                      H
                    );
                  }) }, k)
                );
            }),
            D.length === 0 && /* @__PURE__ */ d(Be, { children: [
              "No books found matching “",
              m,
              "”"
            ] })
          ] }),
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-border-t tw-px-4 tw-py-2 tw-text-xs tw-text-muted-foreground", children: [
            /* @__PURE__ */ r("span", { children: Ht }),
            /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-3", children: [
              /* @__PURE__ */ d("span", { className: "tw-flex tw-items-center tw-gap-1", children: [
                /* @__PURE__ */ r(as, { className: "tw-h-3 tw-w-3" }),
                /* @__PURE__ */ r("span", { children: "Book" })
              ] }),
              /* @__PURE__ */ d("span", { className: "tw-flex tw-items-center tw-gap-1", children: [
                /* @__PURE__ */ r(ss, { className: "tw-h-3 tw-w-3" }),
                /* @__PURE__ */ r("span", { children: "Chapter" })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function np(e) {
  return /* @__PURE__ */ r(ol, { ...e });
}
const rp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), al = ue(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ft = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(go.Root, { ref: n, className: h("pr-twp", al(), e), ...t }));
ft.displayName = go.Root.displayName;
const br = b.forwardRef(({ className: e, ...t }, n) => {
  const o = bt();
  return /* @__PURE__ */ r(
    Qe.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: o
    }
  );
});
br.displayName = Qe.Root.displayName;
const vn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Qe.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(Qe.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Cn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
vn.displayName = Qe.Item.displayName;
const fe = Me.Root, Re = Me.Trigger, sl = Me.Anchor, oe = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...o }, a) => {
  const s = bt();
  return /* @__PURE__ */ r(Me.Portal, { children: /* @__PURE__ */ r(
    Me.Content,
    {
      ref: a,
      align: t,
      sideOffset: n,
      className: h(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      dir: s
    }
  ) });
});
oe.displayName = Me.Content.displayName;
function il(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function nr({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = il,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: m = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ariaLabel: x,
  ...N
}) {
  const [_, E] = M(!1), C = c ?? l, L = (S) => S.length > 0 && typeof S[0] == "object" && "options" in S[0], V = (S, D) => {
    const y = l(S), T = typeof S == "object" && "secondaryLabel" in S ? S.secondaryLabel : void 0, O = `${D ?? ""}${y}${T ?? ""}`;
    return /* @__PURE__ */ d(
      me,
      {
        value: y,
        onSelect: () => {
          i(S), E(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Gt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== y
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            y,
            T && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              T
            ] })
          ] })
        ]
      },
      O
    );
  };
  return /* @__PURE__ */ d(fe, { open: _, onOpenChange: E, ...N, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ d(
      z,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": x,
        id: e,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? C(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ r(Le, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      oe,
      {
        align: g,
        className: h("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(ne, { children: [
          /* @__PURE__ */ r(ze, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Be, { children: f }),
          /* @__PURE__ */ r(re, { children: L(t) ? t.map((S) => /* @__PURE__ */ r(Ee, { heading: S.groupHeading, children: S.options.map((D) => V(D, S.groupHeading)) }, S.groupHeading)) : t.map((S) => V(S)) })
        ] })
      }
    )
  ] });
}
function ll({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = j(
    () => Array.from({ length: s }, (w, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ d(pt, { children: [
    /* @__PURE__ */ r(ft, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      nr,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w > t && o(w);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(ft, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      nr,
      {
        isDisabled: a,
        onChange: (w) => {
          o(w), w < e && n(w);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var rr = /* @__PURE__ */ ((e) => (e.CurrentBook = "current book", e.ChooseBooks = "choose books", e))(rr || {});
((e) => {
  e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books";
})(rr || (rr = {}));
const op = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), jn = (e, t) => e[t] ?? t;
function ap({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const p = jn(w, "%webView_bookSelector_currentBook%"), m = jn(w, "%webView_bookSelector_choose%"), f = jn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = M(
    "current book"
    /* CurrentBook */
  ), v = (x) => {
    g(x), e(x);
  };
  return /* @__PURE__ */ r(
    br,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => v(x),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(vn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            ll,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(vn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: o.map((x) => dt.bookIdToEnglishName(x)).join(", ") }),
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
function sp({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l,
  buttonClassName: c = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: w = "ghost"
}) {
  const [p, m] = M(!1);
  if (e.length === 0)
    return;
  const f = (u) => {
    t(u), m(!1);
  };
  return /* @__PURE__ */ d(fe, { open: p, onOpenChange: m, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(Pr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(oe, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r(Ee, { heading: s, children: e.map((u) => /* @__PURE__ */ d(
      me,
      {
        onSelect: () => f(u),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Pr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function ip(e, t, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    t(i);
  };
}
const Uo = _n(null);
function wl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function Wt() {
  const e = pr(Uo);
  return e == null && function(t, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const qo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, cl = qo ? Xt : G, dn = { tag: ur };
function dl({ initialConfig: e, children: t }) {
  const n = j(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: c } = e, w = wl(null, o), p = bo({ editable: e.editable, html: c, namespace: a, nodes: s, onError: (m) => i(m, p), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = le();
          if (u.isEmpty()) {
            const g = Rn();
            u.append(g);
            const v = qo ? document.activeElement : null;
            (Qt() !== null || v !== null && v === m.getRootElement()) && g.select();
          }
        }, dn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, dn);
            break;
          }
          case "object":
            m.setEditorState(f, dn);
            break;
          case "function":
            m.update(() => {
              le().isEmpty() && f(m);
            }, dn);
        }
      }
    }(p, l), [p, w];
  }, []);
  return cl(() => {
    const o = e.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(Uo.Provider, { value: n, children: t });
}
const pl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : G;
function ul({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [o] = Wt();
  return pl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      t && s.size === 0 && i.size === 0 || e && c.has(ur) || l.isEmpty() || n(a, o, c);
    });
  }, [o, e, t, n]), null;
}
const vr = {
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
}, Rt = Ne.Provider, Pt = Ne.Root, $t = b.forwardRef(({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r(
  Ne.Trigger,
  {
    ref: o,
    className: t ? h(Go({ variant: t }), e) : e,
    ...n
  }
));
$t.displayName = Ne.Trigger.displayName;
const Tt = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ r(Ne.Portal, { children: /* @__PURE__ */ r(
  Ne.Content,
  {
    ref: o,
    sideOffset: t,
    className: h(
      // CUSTOM: Match other portal-based components which use a higher z-index than the default
      // `tw-z-50`. This prevents other high-z-index elements from obscuring a tooltip.
      // Implemented by Tom Bogle
      // Approved by ???
      // 23 March 2026
      "pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Tt.displayName = Ne.Content.displayName;
const xr = [
  Oi,
  vo,
  xo,
  Ii
], ml = _n(null), Vn = {
  didCatch: !1,
  error: null
};
class fl extends es {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Vn;
  }
  static getDerivedStateFromError(t) {
    return {
      didCatch: !0,
      error: t
    };
  }
  resetErrorBoundary() {
    const {
      error: t
    } = this.state;
    if (t !== null) {
      for (var n, o, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Vn);
    }
  }
  componentDidCatch(t, n) {
    var o, a;
    (o = (a = this.props).onError) === null || o === void 0 || o.call(a, t, n);
  }
  componentDidUpdate(t, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (o && n.error !== null && hl(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(Vn);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: a
    } = this.props, {
      didCatch: s,
      error: i
    } = this.state;
    let l = t;
    if (s) {
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(c);
      else if (o)
        l = Ir(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Ir(ml.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function hl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, o) => !Object.is(n, t[o]));
}
function gl({ children: e, onError: t }) {
  return r(fl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const bl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : G;
function vl(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function xl() {
  return function(e) {
    const [t] = Wt(), n = j(() => e(t), [t, e]), [o, a] = M(() => n.initialValueFn()), s = Y(o);
    return bl(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((w) => {
        s.current = w, a(w);
      });
    }, [n, e]), o;
  }(vl);
}
function yl(e, t, n = "self") {
  const o = e.getStartEndPoints();
  if (t.isSelected(e) && !Js(t) && o !== null) {
    const [a, s] = o, i = e.isBackward(), l = a.getNode(), c = s.getNode(), w = t.is(l), p = t.is(c);
    if (w || p) {
      const [m, f] = Zs(e), u = l.is(c), g = t.is(i ? c : l), v = t.is(i ? l : c);
      let x, N = 0;
      u ? (N = m > f ? f : m, x = m > f ? m : f) : g ? (N = i ? f : m, x = void 0) : v && (N = 0, x = i ? m : f);
      const _ = t.__text.slice(N, x);
      _ !== t.__text && (n === "clone" && (t = Qs(t)), t.__text = _);
    }
  }
  return t;
}
function Nl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ko = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, kl = Ko && "documentMode" in document ? document.documentMode : null;
!(!Ko || !("InputEvent" in window) || kl) && "getTargetRanges" in new window.InputEvent("input");
function Fr(e) {
  const t = ti(e, (n) => xe(n) && !n.isInline());
  return xe(t) || Nl(4, e.__key), t;
}
const _l = Symbol.for("preact-signals");
function Sn() {
  if (ie > 1) return void ie--;
  let e, t = !1;
  for (; We !== void 0; ) {
    let n = We;
    for (We = void 0, or++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && Ho(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = o;
    }
  }
  if (or = 0, ie--, t) throw e;
}
function Cl(e) {
  if (ie > 0) return e();
  ie++;
  try {
    return e();
  } finally {
    Sn();
  }
}
let Z, We;
function Gr(e) {
  const t = Z;
  Z = void 0;
  try {
    return e();
  } finally {
    Z = t;
  }
}
let ie = 0, or = 0, fn = 0;
function Ur(e) {
  if (Z === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== Z ? (t = { i: 0, S: e, p: Z.s, n: void 0, t: Z, e: void 0, x: void 0, r: t }, Z.s !== void 0 && (Z.s.n = t), Z.s = t, e.n = t, 32 & Z.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = Z.s, t.n = void 0, Z.s.n = t, Z.s = t), t) : void 0;
}
function _t(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function nn(e, t) {
  return new _t(e, t);
}
function Ho(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function qr(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function Yo(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  e.s = t;
}
function ge(e, t) {
  _t.call(this, void 0), this.x = e, this.s = void 0, this.g = fn - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function El(e, t) {
  return new ge(e, t);
}
function Xo(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    ie++;
    const n = Z;
    Z = void 0;
    try {
      t();
    } catch (o) {
      throw e.f &= -2, e.f |= 8, yr(e), o;
    } finally {
      Z = n, Sn();
    }
  }
}
function yr(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, Xo(e);
}
function Rl(e) {
  if (Z !== this) throw new Error("Out-of-order effect");
  Yo(this), Z = e, this.f &= -2, 8 & this.f && yr(this), Sn();
}
function Se(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function de(e, t) {
  const n = new Se(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Dn(e, t = {}) {
  const n = {};
  for (const o in e) {
    const a = t[o], s = nn(a === void 0 ? e[o] : a);
    n[o] = s;
  }
  return n;
}
_t.prototype.brand = _l, _t.prototype.h = function() {
  return !0;
}, _t.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : Gr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, _t.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && Gr(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, _t.prototype.subscribe = function(e) {
  return de(() => {
    const t = this.value, n = Z;
    Z = void 0;
    try {
      e(t);
    } finally {
      Z = n;
    }
  }, { name: "sub" });
}, _t.prototype.valueOf = function() {
  return this.value;
}, _t.prototype.toString = function() {
  return this.value + "";
}, _t.prototype.toJSON = function() {
  return this.value;
}, _t.prototype.peek = function() {
  const e = Z;
  Z = void 0;
  try {
    return this.value;
  } finally {
    Z = e;
  }
}, Object.defineProperty(_t.prototype, "value", { get() {
  const e = Ur(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (or > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, fn++, ie++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      Sn();
    }
  }
} }), ge.prototype = new _t(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === fn)) return !0;
  if (this.g = fn, this.f |= 1, this.i > 0 && !Ho(this)) return this.f &= -2, !0;
  const e = Z;
  try {
    qr(this), Z = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return Z = e, Yo(this), this.f &= -2, !0;
}, ge.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  _t.prototype.S.call(this, e);
}, ge.prototype.U = function(e) {
  if (this.t !== void 0 && (_t.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, ge.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(ge.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = Ur(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Se.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, Se.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Xo(this), qr(this), ie++;
  const e = Z;
  return Z = this, Rl.bind(this, e);
}, Se.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = We, We = this);
}, Se.prototype.d = function() {
  this.f |= 8, 1 & this.f || yr(this);
}, Se.prototype.dispose = function() {
  this.d();
};
ee({ build: (e, t, n) => Dn(t), config: sn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const o = n.getOutput();
  return de(() => o.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Wo() {
  const e = le(), t = Qt(), n = Rn();
  e.clear(), e.append(n), t !== null && n.select(), tn(t) && (t.format = 0);
}
function Jo(e, t = Wo) {
  return e.registerCommand(yo, (n) => (e.update(t), !0), No);
}
ee({ build: (e, t, n) => Dn(t), config: sn({ $onClear: Wo }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: o } = n.getOutput();
  return de(() => Jo(e, o.value));
} });
function Tl(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function Zo(e, t) {
  let n;
  return nn(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const ar = ee({ build: (e) => Zo(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Qo(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, o = t;
    for (const a in o) n[a] = Qo(n[a], o[a]);
    return e;
  }
  return t;
}
const Nr = 0, sr = 1, ta = 2, zn = 3, pn = 4, Te = 5, Bn = 6, Ue = 7;
function Fn(e) {
  return e.id === Nr;
}
function ea(e) {
  return e.id === ta;
}
function Sl(e) {
  return function(t) {
    return t.id === sr;
  }(e) || et(305, String(e.id), String(sr)), Object.assign(e, { id: ta });
}
const Dl = /* @__PURE__ */ new Set();
class Ml {
  constructor(t, n) {
    kt(this, "builder");
    kt(this, "configs");
    kt(this, "_dependency");
    kt(this, "_peerNameSet");
    kt(this, "extension");
    kt(this, "state");
    kt(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Nr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : ei;
    for (const o of this.configs) t = n(t, o);
    return t;
  }
  init(t) {
    const n = this.state;
    ea(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, w) {
      return Object.assign(l, { config: c, id: zn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: pn, initResult: c, registerState: w });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let o;
    n.id !== pn && et(307, String(n.id), String(Te)), this.extension.build && (o = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Te, output: i, registerState: l });
    }(n, o, a);
  }
  register(t, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Te && et(308, String(o.id), String(Te));
    const a = this.extension.register && this.extension.register(t, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Bn });
    }(o), () => {
      const s = this.state;
      s.id !== Ue && et(309, String(o.id), String(Ue)), this.state = function(i) {
        return Object.assign(i, { id: Te });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let o;
    return n.id !== Bn && et(310, String(n.id), String(Bn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ue });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= pn;
    }(t) || et(313, String(t.id), String(pn)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= zn;
    }(t) || et(314, String(t.id), String(zn)), { config: t.config };
  }
  getPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && et(315, this.extension.name, t.name), n.getExtensionInitDependency();
  }
  getDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && et(315, this.extension.name, t.name), n.getExtensionDependency();
  }
  getState() {
    const t = this.state;
    return function(n) {
      return n.id >= Ue;
    }(t) || et(316, String(t.id), String(Ue)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Dl;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= Te;
      })(t) || et(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const Kr = { tag: ur };
function Ol() {
  const e = le();
  e.isEmpty() && e.append(Rn());
}
const Il = ee({ config: sn({ setOptions: Kr, updateOptions: Kr }), init: ({ $initialEditorState: e = Ol }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (ai(s)) e.setEditorState(s, n);
    else if (typeof s == "function") e.update(() => {
      s(e);
    }, t);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = e.parseEditorState(s);
      e.setEditorState(i, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [ni, xo, ri, oi, vo] }), Hr = Symbol.for("@lexical/extension/LexicalBuilder");
function Yr() {
}
function Al(e) {
  throw e;
}
function un(e) {
  return Array.isArray(e) ? e : [e];
}
const Gn = "0.40.0+prod.esm";
class Je {
  constructor(t) {
    kt(this, "roots");
    kt(this, "extensionNameMap");
    kt(this, "outgoingConfigEdges");
    kt(this, "incomingEdges");
    kt(this, "conflicts");
    kt(this, "_sortedExtensionReps");
    kt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Gn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [un(Il)];
    for (const o of t) n.push(un(o));
    return new Je(n);
  }
  static maybeFromEditor(t) {
    const n = t[Hr];
    return n && (n.PACKAGE_VERSION !== Gn && et(292, n.PACKAGE_VERSION, Gn), n instanceof Je || et(293)), n;
  }
  static fromEditor(t) {
    const n = Je.maybeFromEditor(t);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(bo({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [Hr]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = Yr;
    function n() {
      try {
        t();
      } finally {
        t = Yr;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = we(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(t) {
    return this.extensionNameMap.has(t);
  }
  getExtensionRep(t) {
    const n = this.extensionNameMap.get(t.name);
    if (n) return n.extension !== t && et(295, t.name), n;
  }
  addEdge(t, n, o) {
    const a = this.outgoingConfigEdges.get(t);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(t, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(t) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([t]));
  }
  addExtension(t) {
    this._sortedExtensionReps !== void 0 && et(296);
    const n = un(t), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new Ml(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && et(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && et(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = un(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (o, a) => {
      let s = o.state;
      if (ea(s)) return;
      const i = o.extension.name;
      var l;
      Fn(s) || et(300, i, a || "[unknown]"), Fn(l = s) || et(304, String(l.id), String(Nr)), s = Object.assign(l, { id: sr }), o.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, i);
      }
      s = Sl(s), o.state = s, t.push(o);
    };
    for (const o of this.extensionNameMap.values()) Fn(o.state) && n(o);
    for (const o of t) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && et(301, o.name);
      for (const i of a) s.configs.add(i);
    }
    return this._sortedExtensionReps = t, this._sortedExtensionReps;
  }
  registerEditor(t) {
    const n = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], s = o.signal;
    for (const i of n) {
      const l = i.register(t, s);
      l && a.push(l);
    }
    for (const i of n) {
      const l = i.afterRegistration(t);
      l && a.push(l);
    }
    return we(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: m } = p;
      if (m.onError !== void 0 && (t.onError = m.onError), m.disableEvents !== void 0 && (t.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (t.parentEditor = m.parentEditor), m.editable !== void 0 && (t.editable = m.editable), m.namespace !== void 0 && (t.namespace = m.namespace), m.$initialEditorState !== void 0 && (t.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of Tl(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && et(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, p);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && Qo(i, m.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const c = Object.keys(s).length > 0, w = a.size > 0;
    (c || w) && (t.html = {}, c && (t.html.import = s), w && (t.html.export = a));
    for (const p of l) p.init(t);
    return t.onError || (t.onError = Al), t;
  }
}
const Pl = /* @__PURE__ */ new Set(), Xr = ee({ build(e, t, n) {
  const o = n.getDependency(ar).output, a = nn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Zo(() => {
  }, () => de(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Qt()) for (const [p, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(p);
          continue;
        }
        const f = hi(p), u = f && f.isSelected() || !1;
        w = w || u !== (!!i && i.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = El(() => (s.value || Pl).has(i)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(i);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(i, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [ar], name: "@lexical/extension/NodeSelection" });
si("INSERT_HORIZONTAL_RULE_COMMAND");
class Oe extends mi {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new Oe(t.__key);
  }
  static importJSON(t) {
    return na().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: $l, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return ko(n, t.theme.hr), n;
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
function $l() {
  return { node: na() };
}
function na() {
  return fi(Oe);
}
function Ll(e) {
  return e instanceof Oe;
}
ee({ dependencies: [ar, Xr], name: "@lexical/extension/HorizontalRule", nodes: () => [Oe], register(e, t, n) {
  const { watchNodeKey: o } = n.getDependency(Xr).output, a = nn({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return we(e.registerCommand(ii, (i) => {
    if (li(i.target)) {
      const l = wi(i.target);
      if (Ll(l)) return function(c, w = !1) {
        const p = Qt(), m = c.isSelected(), f = c.getKey();
        let u;
        w && ci(p) ? u = p : (u = di(), pi(u)), m ? u.delete(f) : u.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, ui), e.registerMutationListener(Oe, (i, l) => {
    Cl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, m] of i.entries()) if (m === "destroyed") w.delete(p), c = !0;
      else {
        const f = w.get(p), u = e.getElementByKey(p);
        f ? f.domNode.value = u : (c = !0, w.set(p, { domNode: nn(u), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), de(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(de(() => {
      const w = l.value;
      w && (c.value ? ko(w, s) : gi(w, s));
    }));
    return we(...i);
  }));
} });
function jl(e, t) {
  return we(e.registerCommand(bi, (n) => {
    const o = Qt();
    if (!tn(o)) return !1;
    n.preventDefault();
    const a = function(s) {
      if (s.getNodes().filter((m) => gn(m) && m.canIndent()).length > 0) return !0;
      const i = s.anchor, l = s.focus, c = l.isBefore(i) ? l : i, w = c.getNode(), p = Fr(w);
      if (p.canIndent()) {
        const m = p.getKey();
        let f = vi();
        if (f.anchor.set(m, 0, "element"), f.focus.set(m, 0, "element"), f = xi(f), f.anchor.is(c)) return !0;
      }
      return !1;
    }(o) ? n.shiftKey ? yi : jr : Ni;
    return e.dispatchCommand(a, void 0);
  }, No), e.registerCommand(jr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const o = Qt();
    if (!tn(o)) return !1;
    const a = o.getNodes().map((s) => Fr(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, mr));
}
ee({ build: (e, t, n) => Dn(t), config: sn({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: o, maxIndent: a } = n.getOutput();
  return de(() => {
    if (!o.value) return jl(e, a);
  });
} });
const Vl = ee({ name: "@lexical/react/ReactProvider" });
function zl() {
  return le().getTextContent();
}
function Bl(e, t = !0) {
  if (e) return !1;
  let n = zl();
  return t && (n = n.trim()), n === "";
}
function Fl(e) {
  if (!Bl(e, !1)) return !1;
  const t = le().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = t[o];
    if (ki(a)) return !1;
    if (xe(a)) {
      if (!_i(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[o];
        if (!bn(c)) return !1;
      }
    }
  }
  return !0;
}
function ra(e) {
  return () => Fl(e);
}
function oa(e) {
  const t = window.location.origin, n = (o) => {
    if (o.origin !== t) return;
    const a = e.getRootElement();
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
          const c = l.args;
          if (c) {
            const [w, p, m, f, u] = c;
            e.update(() => {
              const g = Qt();
              if (tn(g)) {
                const v = g.anchor;
                let x = v.getNode(), N = 0, _ = 0;
                if (bn(x) && w >= 0 && p >= 0 && (N = w, _ = w + p, g.setTextNodeRange(x, N, x, _)), N === _ && m === "" || (g.insertRawText(m), x = v.getNode()), bn(x)) {
                  N = f, _ = f + u;
                  const E = x.getTextContentSize();
                  N = N > E ? E : N, _ = _ > E ? E : _, g.setTextNodeRange(x, N, x, _);
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
ee({ build: (e, t, n) => Dn(t), config: sn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => de(() => n.getOutput().disabled.value ? void 0 : oa(e)) });
function Gl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const kr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : G;
function Ul({ editor: e, ErrorBoundary: t }) {
  return function(n, o) {
    const [a, s] = M(() => n.getDecorators());
    return kr(() => n.registerDecoratorListener((i) => {
      Pi(() => {
        s(i);
      });
    }), [n]), G(() => {
      s(n.getDecorators());
    }, [n]), j(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (f) => n._onError(f), children: r(ns, { fallback: null, children: a[w] }) }), m = n.getElementByKey(w);
        m !== null && i.push($i(p, m, w));
      }
      return i;
    }, [o, a, n]);
  }(e, t);
}
function ql({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const o = Je.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Vl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Gl(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : r(Ul, { editor: e, ErrorBoundary: t });
}
function Wr(e) {
  return e.getEditorState().read(ra(e.isComposing()));
}
function Kl({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [o] = Wt();
  return function(a) {
    kr(() => we(Ai(a), oa(a)), [a]);
  }(o), d(pt, { children: [e, r(Hl, { content: t }), r(ql, { editor: o, ErrorBoundary: n })] });
}
function Hl({ content: e }) {
  const [t] = Wt(), n = function(a) {
    const [s, i] = M(() => Wr(a));
    return kr(() => {
      function l() {
        const c = Wr(a);
        i(c);
      }
      return l(), we(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), o = xl();
  return n ? typeof e == "function" ? e(o) : e : null;
}
function Yl({ defaultSelection: e }) {
  const [t] = Wt();
  return G(() => {
    t.focus(() => {
      const n = document.activeElement, o = t.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const Xl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : G;
function Wl({ onClear: e }) {
  const [t] = Wt();
  return Xl(() => Jo(t, e), [t, e]), null;
}
const aa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : G;
function Jl({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: v, role: x = "textbox", spellCheck: N = !0, style: _, tabIndex: E, "data-testid": C, ...L }, V) {
  const [S, D] = M(e.isEditable()), y = U((O) => {
    O && O.ownerDocument && O.ownerDocument.defaultView ? e.setRootElement(O) : e.setRootElement(null);
  }, [e]), T = j(() => /* @__PURE__ */ function(...O) {
    return ($) => {
      for (const I of O) typeof I == "function" ? I($) : I != null && (I.current = $);
    };
  }(V, y), [y, V]);
  return aa(() => (D(e.isEditable()), e.registerEditableListener((O) => {
    D(O);
  })), [e]), r("div", { "aria-activedescendant": S ? t : void 0, "aria-autocomplete": S ? n : "none", "aria-controls": S ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": S && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": S ? m : void 0, "aria-readonly": !S || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: S, "data-testid": C, id: v, ref: T, role: x, spellCheck: N, style: _, tabIndex: E, ...L });
}
const Zl = an(Jl);
function Jr(e) {
  return e.getEditorState().read(ra(e.isComposing()));
}
const Ql = an(tw);
function tw(e, t) {
  const { placeholder: n, ...o } = e, [a] = Wt();
  return d(pt, { children: [r(Zl, { editor: a, ...o, ref: t }), n != null && r(ew, { editor: a, content: n })] });
}
function ew({ content: e, editor: t }) {
  const n = function(i) {
    const [l, c] = M(() => Jr(i));
    return aa(() => {
      function w() {
        const p = Jr(i);
        c(p);
      }
      return w(), we(i.registerUpdateListener(() => {
        w();
      }), i.registerEditableListener(() => {
        w();
      }));
    }, [i]), l;
  }(t), [o, a] = M(t.isEditable());
  if (Xt(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(o) : e !== null && (s = e), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function nw({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Ql,
    {
      className: t ?? "ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none",
      "aria-placeholder": e,
      placeholder: /* @__PURE__ */ r(
        "div",
        {
          className: n ?? "tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",
          children: e
        }
      )
    }
  );
}
const sa = _n(void 0);
function rw({
  activeEditor: e,
  $updateToolbar: t,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = j(
    () => ({
      activeEditor: e,
      $updateToolbar: t,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [e, t, n, o, a]
  );
  return /* @__PURE__ */ r(sa.Provider, { value: i, children: s });
}
function ia() {
  const e = pr(sa);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function ow() {
  const [e, t] = M(void 0), n = U(() => {
    t(void 0);
  }, []), o = j(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ r(Io, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(hr, { children: [
      /* @__PURE__ */ r(Po, { children: /* @__PURE__ */ r($o, { children: s }) }),
      i
    ] }) });
  }, [e, n]), a = U(
    (s, i, l = !1) => {
      t({
        closeOnClickOutside: l,
        content: i(n),
        title: s
      });
    },
    [n]
  );
  return [o, a];
}
function aw({
  children: e
}) {
  const [t] = Wt(), [n, o] = M(t), [a, s] = M("paragraph"), [i, l] = ow(), c = () => {
  };
  return G(() => n.registerCommand(
    _o,
    (w, p) => (o(p), !1),
    mr
  ), [n]), /* @__PURE__ */ d(
    rw,
    {
      activeEditor: n,
      $updateToolbar: c,
      blockType: a,
      setBlockType: s,
      showModal: l,
      children: [
        i,
        e({ blockType: a })
      ]
    }
  );
}
function sw(e) {
  const [t] = Wt(), { activeEditor: n } = ia();
  G(() => n.registerCommand(
    _o,
    () => {
      const o = Qt();
      return o && e(o), !1;
    },
    mr
  ), [t, e]), G(() => {
    n.getEditorState().read(() => {
      const o = Qt();
      o && e(o);
    });
  }, [n, e]);
}
const la = ue(
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
), iw = b.forwardRef(({ className: e, variant: t, size: n, ...o }, a) => /* @__PURE__ */ r(
  Ro.Root,
  {
    ref: a,
    className: h(la({ variant: t, size: n, className: e })),
    ...o
  }
));
iw.displayName = Ro.Root.displayName;
const wa = b.createContext({
  size: "default",
  variant: "default"
}), _r = b.forwardRef(({ className: e, variant: t, size: n, children: o, ...a }, s) => {
  const i = bt();
  return /* @__PURE__ */ r(
    Tn.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        wa.Provider,
        {
          value: { variant: t, size: n },
          children: o
        }
      )
    }
  );
});
_r.displayName = Tn.Root.displayName;
const Ze = b.forwardRef(({ className: e, children: t, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(wa);
  return /* @__PURE__ */ r(
    Tn.Item,
    {
      ref: s,
      className: h(
        la({
          variant: i.variant || n,
          size: i.size || o
        }),
        e
      ),
      ...a,
      children: t
    }
  );
});
Ze.displayName = Tn.Item.displayName;
const Zr = [
  { format: "bold", icon: is, label: "Bold" },
  { format: "italic", icon: ls, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function lw() {
  const { activeEditor: e } = ia(), [t, n] = M([]), o = U((a) => {
    if (tn(a) || Li(a)) {
      const s = [];
      Zr.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return sw(o), /* @__PURE__ */ r(
    _r,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: Zr.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        Ze,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Ci, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function ww({ onClear: e }) {
  const [t] = Wt();
  G(() => {
    e && e(() => {
      t.dispatchCommand(yo, void 0);
    });
  }, [t, e]);
}
function cw({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, o] = M(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(aw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(lw, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Kl,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(nw, { placeholder: e }) }),
          ErrorBoundary: gl
        }
      ),
      t && /* @__PURE__ */ r(Yl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(ww, { onClear: n }),
      /* @__PURE__ */ r(Wl, {})
    ] })
  ] });
}
const dw = {
  namespace: "commentEditor",
  theme: vr,
  nodes: xr,
  onError: (e) => {
    console.error(e);
  }
};
function xn({
  editorState: e,
  editorSerializedState: t,
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
          dl,
          {
            initialConfig: {
              ...dw,
              ...e ? { editorState: e } : {},
              ...t ? { editorState: JSON.stringify(t) } : {}
            },
            children: /* @__PURE__ */ d(Rt, { children: [
              /* @__PURE__ */ r(cw, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                ul,
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
function pw(e, t) {
  const n = Ti(t) ? t.body.childNodes : t.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!da.has(s.nodeName)) {
    const i = pa(s, e, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Co && i.insertAfter(Eo());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), o;
}
function uw(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = le().getChildren();
  for (let a = 0; a < o.length; a++)
    ca(e, o[a], n, t);
  return n.innerHTML;
}
function ca(e, t, n, o = null) {
  let a = o === null || t.isSelected(o);
  const s = xe(t) && t.excludeFromCopy("html");
  let i = t;
  o !== null && bn(t) && (i = yl(o, t, "clone"));
  const l = xe(i) ? i.getChildren() : [], c = Ei(e, i.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(e, i) : i.exportDOM(e);
  const { element: p, after: m } = w;
  if (!p) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], v = ca(e, g, f, o);
    !a && xe(t) && v && t.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Ri(p) || Vr(p)) && p.append(f), n.append(p), m) {
      const u = m.call(i, p);
      u && (Vr(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const da = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function pa(e, t, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (da.has(e.nodeName)) return i;
  let l = null;
  const c = function(g, v) {
    const { nodeName: x } = g, N = v._htmlConversions.get(x.toLowerCase());
    let _ = null;
    if (N !== void 0) for (const E of N) {
      const C = E(g);
      C !== null && (_ === null || (_.priority || 0) <= (C.priority || 0)) && (_ = C);
    }
    return _ !== null ? _.conversion : null;
  }(e, t), w = c ? c(e) : null;
  let p = null;
  if (w !== null) {
    p = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(e.nodeName, w.forChild);
  }
  const m = e.childNodes;
  let f = [];
  const u = (l == null || !Si(l)) && (l != null && gn(l) || o);
  for (let g = 0; g < m.length; g++) f.push(...pa(m[g], t, n, u, new Map(a), l));
  return p != null && (f = p(f)), zr(e) && (f = mw(e, f, u ? () => {
    const g = new Co();
    return n.push(g), g;
  } : Rn)), l == null ? f.length > 0 ? i = i.concat(f) : zr(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Br(g.nextSibling) && Br(g.previousSibling);
  }(e) && (i = i.concat(Eo())) : xe(l) && l.append(...f), i;
}
function mw(e, t, n) {
  const o = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (gn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && gn(t[i + 1])) {
      const c = n();
      c.setFormat(o), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function ua(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(t), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function ma(e) {
  return e ? e.some(
    (t) => t && "text" in t && t.text.trim().length > 0 ? !0 : !t || !("children" in t) ? !1 : ma(t.children)
  ) : !1;
}
function Bt(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? ma(e.root.children) : !1;
}
function fw(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = To({
    namespace: "EditorUtils",
    theme: vr,
    nodes: xr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (t.update(
    () => {
      const a = new DOMParser().parseFromString(e, "text/html"), s = pw(t, a);
      le().clear(), Di(s);
    },
    {
      discrete: !0
    }
  ), t.getEditorState().read(() => {
    n = t.getEditorState().toJSON();
  }), !n)
    throw new Error("Failed to convert HTML to editor state");
  return n;
}
function yn(e) {
  const t = To({
    namespace: "EditorUtils",
    theme: vr,
    nodes: xr,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let o = "";
  return t.getEditorState().read(() => {
    o = uw(t);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Cr(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
function hn(e, t) {
  return e === "" ? t["%comment_assign_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%comment_assign_team%"] ?? "Team" : e;
}
function Er(e) {
  const t = /Macintosh/i.test(navigator.userAgent);
  return e.key === "Enter" && (t && e.metaKey || !t && e.ctrlKey);
}
const hw = {
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
function Un(e, t) {
  return e === "" ? t["%commentEditor_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%commentEditor_team%"] ?? "Team" : e;
}
function lp({
  assignableUsers: e,
  onSave: t,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = M(hw), [i, l] = M(void 0), [c, w] = M(!1), p = Y(void 0), m = Y(null);
  G(() => {
    let N = !0;
    const _ = m.current;
    if (!_) return;
    const E = setTimeout(() => {
      N && ua(_);
    }, 300);
    return () => {
      N = !1, clearTimeout(E);
    };
  }, []);
  const f = U(() => {
    if (!Bt(a)) return;
    const N = yn(a);
    t(N, i);
  }, [a, t, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: x }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r($e, {}) }) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
            z,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !Bt(a),
              children: /* @__PURE__ */ r(Gt, {})
            }
          ) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(fe, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: e.length === 0,
          children: [
            /* @__PURE__ */ r(lo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Un(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        oe,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: e.map((N) => /* @__PURE__ */ r(
            me,
            {
              onSelect: () => {
                l(N === "" ? void 0 : N), w(!1);
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
        ref: m,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (N) => {
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : Er(N) && (N.preventDefault(), N.stopPropagation(), Bt(a) && f());
        },
        onKeyDown: (N) => {
          Cr(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          xn,
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
const wp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), cp = [
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
], gw = ["input", "select", "textarea", "button"], bw = ["button", "textbox"], vw = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = Y(null), [s, i] = M(void 0), [l, c] = M(void 0), w = U(
    (u) => {
      i(u);
      const g = e.find((x) => x.id === u);
      g && (t == null || t(g));
      const v = document.getElementById(u);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), p = U(
    (u) => {
      const g = e.find((v) => v.id === u);
      g && (c((v) => v === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || gw.includes(g)) return !0;
    const v = u.getAttribute("role");
    if (v && bw.includes(v)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, f = U(
    (u) => {
      var S;
      const g = u.target, v = (D) => D ? document.getElementById(D) : void 0, x = v(l), N = v(s);
      if (!!(x && g && x.contains(g) && g !== x) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const D = e.find((y) => y.id === l);
            D && w(D.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const D = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const y = D.findIndex((O) => O === g);
          if (y === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(y + 1, D.length - 1) : T = Math.max(y - 1, 0), T !== y && (u.preventDefault(), u.stopPropagation(), (S = D[T]) == null || S.focus());
          return;
        }
        return;
      }
      const C = e.findIndex((D) => D.id === s);
      let L = C;
      switch (u.key) {
        case "ArrowDown":
          L = Math.min(C + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          L = 0, u.preventDefault();
          break;
        case "End":
          L = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const D = N;
          if (D) {
            const y = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), O = y ?? T;
            if (O) {
              u.preventDefault(), O.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const V = e[L];
      V && w(V.id);
    },
    [e, w, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: w
  };
}, fa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
fa.displayName = "Card";
const xw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
xw.displayName = "CardHeader";
const yw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: h(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
yw.displayName = "CardTitle";
const Nw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Nw.displayName = "CardDescription";
const ha = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
ha.displayName = "CardContent";
const kw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
kw.displayName = "CardFooter";
const Ie = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  So.Root,
  {
    ref: a,
    decorative: n,
    orientation: t,
    className: h(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...o
  }
));
Ie.displayName = So.Root.displayName;
const ga = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ve.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
ga.displayName = Ve.Root.displayName;
const _w = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ve.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
_w.displayName = Ve.Image.displayName;
const ba = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ve.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
ba.displayName = Ve.Fallback.displayName;
const Rr = _n(void 0);
function qt() {
  const e = pr(Rr);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const ae = ue("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ke = nt.Trigger, va = nt.Group, Cw = nt.Portal, Ew = nt.Sub, Rw = nt.RadioGroup;
function pe({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Rr.Provider, { value: n, children: /* @__PURE__ */ r(nt.Root, { ...t }) });
}
const xa = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = qt();
  return /* @__PURE__ */ d(
    nt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(En, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
xa.displayName = nt.SubTrigger.displayName;
const ya = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  nt.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
ya.displayName = nt.SubContent.displayName;
const te = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...o }, a) => {
  const s = bt();
  return /* @__PURE__ */ r(nt.Portal, { children: /* @__PURE__ */ r(
    nt.Content,
    {
      ref: a,
      sideOffset: t,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
te.displayName = nt.Content.displayName;
const Nn = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = bt(), s = qt();
  return /* @__PURE__ */ r(
    nt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Nn.displayName = nt.Item.displayName;
const Zt = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = qt();
  return /* @__PURE__ */ d(
    nt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        ae({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Zt.displayName = nt.CheckboxItem.displayName;
const Na = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = qt();
  return /* @__PURE__ */ d(
    nt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        ae({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Na.displayName = nt.RadioItem.displayName;
const ln = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  nt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
ln.displayName = nt.Label.displayName;
const Fe = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Fe.displayName = nt.Separator.displayName;
function Tw({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Tw.displayName = "DropdownMenuShortcut";
function Qr({
  comment: e,
  isReply: t = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [c, w] = M(!1), [p, m] = M(), f = Y(null);
  G(() => {
    if (!c) return;
    let C = !0;
    const L = f.current;
    if (!L) return;
    const V = setTimeout(() => {
      C && ua(L);
    }, 300);
    return () => {
      C = !1, clearTimeout(V);
    };
  }, [c]);
  const u = U(
    (C) => {
      C && C.stopPropagation(), w(!1), m(void 0), i == null || i(!1);
    },
    [i]
  ), g = U(
    async (C) => {
      if (C && C.stopPropagation(), !p || !a) return;
      await a(
        e.id,
        yn(p)
      ) && (w(!1), m(void 0), i == null || i(!1));
    },
    [p, a, e.id, i]
  ), v = j(() => {
    const C = new Date(e.date), L = Us(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), V = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ve(n["%comment_dateAtTime%"], {
      date: L,
      time: V
    });
  }, [e.date, n]), x = j(() => e.user, [e.user]), N = j(
    () => e.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), _ = j(() => qs(e.contents), [e.contents]), E = j(() => {
    if (o && l)
      return /* @__PURE__ */ d(pt, { children: [
        /* @__PURE__ */ d(
          Nn,
          {
            onClick: (C) => {
              C.stopPropagation(), w(!0), m(fw(e.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(ws, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          Nn,
          {
            onClick: async (C) => {
              C.stopPropagation(), s && await s(e.id);
            },
            children: [
              /* @__PURE__ */ r(cs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    o,
    n,
    e.contents,
    e.id,
    s,
    i
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ r(ga, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(ba, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: v }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            t && e.assignedUser !== void 0 && /* @__PURE__ */ d(ce, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              hn(e.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), u()) : Er(C) && (C.preventDefault(), C.stopPropagation(), Bt(p) && g());
              },
              onKeyDown: (C) => {
                Cr(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  xn,
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
                    onSerializedChange: (C) => m(C)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r($e, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Bt(p),
                      children: /* @__PURE__ */ r(wo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ d(pt, { children: [
            e.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            e.status === "Todo" && t && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
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
                dangerouslySetInnerHTML: { __html: _ }
              }
            )
          ] })
        ] }),
        E && /* @__PURE__ */ d(pe, { children: [
          /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(ds, {}) }) }),
          /* @__PURE__ */ r(te, { align: "end", children: E })
        ] })
      ]
    }
  );
}
const to = {
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
function Sw({
  classNameForVerseText: e,
  comments: t,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: p,
  handleAddCommentToThread: m,
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: _,
  canUserEditOrDeleteCommentCallback: E,
  isRead: C = !1,
  autoReadDelay: L = 5,
  onVerseRefClick: V
}) {
  const [S, D] = M(to), [y, T] = M(
    void 0
  ), O = o, [$, I] = M(!1), [A, X] = M(!1), [q, J] = M(!1), [Ct, Mt] = M(!1), [Lt, ht] = M(!1), [ut, F] = M(C), [at, st] = M(!1), ct = Y(void 0), [Et, Kt] = M(/* @__PURE__ */ new Map());
  G(() => {
    let R = !0;
    return (async () => {
      const mt = _ ? await _(c) : !1;
      R && ht(mt);
    })(), () => {
      R = !1;
    };
  }, [c, _]), G(() => {
    let R = !0;
    if (!o) {
      Mt(!1), Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = N ? await N(c) : !1;
      R && Mt(mt);
    })(), () => {
      R = !1;
    };
  }, [o, c, N]);
  const Ht = j(() => t.filter((R) => !R.deleted), [t]);
  G(() => {
    let R = !0;
    if (!o || !E) {
      Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = /* @__PURE__ */ new Map();
      await Promise.all(
        Ht.map(async (Or) => {
          const Za = await E(Or.id);
          R && mt.set(Or.id, Za);
        })
      ), R && Kt(mt);
    })(), () => {
      R = !1;
    };
  }, [o, Ht, E]);
  const k = j(() => Ht[0], [Ht]), K = Y(null), H = Y(void 0), lt = U(() => {
    var R;
    (R = H.current) == null || R.call(H), D(to);
  }, []), Ot = U(() => {
    const R = !ut;
    F(R), st(!R), g == null || g(c, R);
  }, [ut, g, c]);
  G(() => {
    I(!1);
  }, [o]), G(() => {
    if (o && !ut && !at) {
      const R = setTimeout(() => {
        F(!0), g == null || g(c, !0);
      }, L * 1e3);
      return ct.current = R, () => clearTimeout(R);
    }
    ct.current && (clearTimeout(ct.current), ct.current = void 0);
  }, [o, ut, at, L, c, g]);
  const vt = j(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), P = j(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const R = hn(s, n);
    return ve(n["%comment_assigned_to%"], {
      assignedUser: R
    });
  }, [s, n]), B = j(() => Ht.slice(1), [Ht]), tt = j(() => B.length ?? 0, [B.length]), it = j(() => tt > 0, [tt]), Nt = j(() => $ || tt <= 2 ? B : B.slice(-2), [B, tt, $]), gt = j(() => $ || tt <= 2 ? 0 : tt - 2, [tt, $]), It = j(
    () => tt === 1 ? vt.singleReply : ve(vt.multipleReplies, { count: tt }),
    [tt, vt]
  ), xt = j(
    () => gt === 1 ? vt.singleReply : ve(vt.multipleReplies, { count: gt }),
    [gt, vt]
  );
  G(() => {
    !o && A && it && X(!1);
  }, [o, A, it]);
  const At = U(
    async (R) => {
      R && R.stopPropagation();
      const yt = Bt(S) ? yn(S) : void 0;
      if (y !== void 0) {
        await m({
          threadId: c,
          contents: yt,
          assignedUser: y
        }) && (T(void 0), yt && lt());
        return;
      }
      yt && await m({ threadId: c, contents: yt }) && lt();
    },
    [
      lt,
      S,
      m,
      y,
      c
    ]
  ), zt = U(
    async (R) => {
      const yt = Bt(S) ? yn(S) : void 0, mt = await m({
        ...R,
        contents: yt,
        assignedUser: y ?? R.assignedUser
      });
      return mt && yt && lt(), mt && y !== void 0 && T(void 0), mt;
    },
    [lt, S, m, y]
  );
  return /* @__PURE__ */ r(
    fa,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: h(
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && p !== "Resolved" && ut,
          "tw-bg-background": o && p !== "Resolved" && ut,
          "tw-bg-muted": p === "Resolved",
          "tw-bg-accent": !ut && !o && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(ha, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            P && /* @__PURE__ */ r(ce, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: P }),
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                onClick: (R) => {
                  R.stopPropagation(), Ot();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": ut ? "Mark as unread" : "Mark as read",
                children: ut ? /* @__PURE__ */ r(ps, {}) : /* @__PURE__ */ r(us, {})
              }
            ),
            Lt && p !== "Resolved" && /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                className: h(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (R) => {
                  R.stopPropagation(), zt({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ d(
            "p",
            {
              ref: K,
              className: h(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": O
                },
                { "tw-whitespace-nowrap": !O }
              ),
              children: [
                a && V ? /* @__PURE__ */ r(
                  z,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (R) => {
                      R.stopPropagation(), V(w);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ d("span", { className: e, children: [
                  k.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: k.selectedText }),
                  k.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            Qr,
            {
              comment: k,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: zt,
              handleUpdateComment: f,
              handleDeleteComment: u,
              onEditingChange: X,
              canEditOrDelete: (!A && Et.get(k.id)) ?? !1,
              canUserResolveThread: Lt
            }
          )
        ] }),
        /* @__PURE__ */ d(pt, { children: [
          it && !o && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: It })
          ] }),
          !o && Bt(S) && /* @__PURE__ */ r(
            xn,
            {
              editorSerializedState: S,
              onSerializedChange: (R) => D(R),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ d(pt, { children: [
            gt > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (R) => {
                  R.stopPropagation(), I(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (R) => {
                  (R.key === "Enter" || R.key === " ") && (R.preventDefault(), R.stopPropagation(), I(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: xt }),
                    $ ? /* @__PURE__ */ r(co, {}) : /* @__PURE__ */ r(Le, {})
                  ] })
                ]
              }
            ),
            Nt.map((R) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Qr,
              {
                comment: R,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: X,
                canEditOrDelete: (!A && Et.get(R.id)) ?? !1
              }
            ) }, R.id)),
            x !== !1 && (!A || Bt(S)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (R) => R.stopPropagation(),
                onKeyDownCapture: (R) => {
                  Er(R) && (R.preventDefault(), R.stopPropagation(), (Bt(S) || y !== void 0) && At());
                },
                onKeyDown: (R) => {
                  Cr(R), (R.key === "Enter" || R.key === " ") && R.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    xn,
                    {
                      editorSerializedState: S,
                      onSerializedChange: (R) => D(R),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (R) => {
                        H.current = R;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    y !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ve(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: hn(
                          y,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(fe, { open: q, onOpenChange: J, children: [
                      /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
                        z,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !v || v.length === 0 || !v.includes(i),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(lo, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        oe,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (R) => {
                            R.key === "Escape" && (R.stopPropagation(), J(!1));
                          },
                          children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(re, { children: v == null ? void 0 : v.map((R) => /* @__PURE__ */ r(
                            me,
                            {
                              onSelect: () => {
                                T(R !== s ? R : void 0), J(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: hn(R, n) })
                            },
                            R || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      z,
                      {
                        size: "icon",
                        onClick: At,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Bt(S) && y === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(wo, {})
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
function dp({
  className: e = "",
  classNameForVerseText: t,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: w,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: x
}) {
  const [N, _] = M(/* @__PURE__ */ new Set()), [E, C] = M();
  G(() => {
    g && (_((I) => new Set(I).add(g)), C(g));
  }, [g]);
  const L = n.filter(
    (I) => I.comments.some((A) => !A.deleted)
  ), V = L.map((I) => ({
    id: I.id
  })), S = U(
    (I) => {
      _((A) => new Set(A).add(I.id)), C(I.id), v == null || v(I.id);
    },
    [v]
  ), D = U(
    (I) => {
      const A = N.has(I);
      _((X) => {
        const q = new Set(X);
        return q.has(I) ? q.delete(I) : q.add(I), q;
      }), C(I), v == null || v(A ? void 0 : I);
    },
    [N, v]
  ), { listboxRef: y, activeId: T, handleKeyDown: O } = vw({
    options: V,
    onOptionSelect: S
  }), $ = U(
    (I) => {
      I.key === "Escape" ? (E && N.has(E) && (_((A) => {
        const X = new Set(A);
        return X.delete(E), X;
      }), C(void 0), v == null || v(void 0)), I.preventDefault(), I.stopPropagation()) : O(I);
    },
    [E, N, O, v]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: y,
      "aria-activedescendant": T ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: $,
      children: L.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: h({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Sw,
            {
              classNameForVerseText: t,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: D,
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
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: x
            }
          )
        },
        I.id
      ))
    }
  );
}
function Dw({ table: e }) {
  return /* @__PURE__ */ d(pe, { children: [
    /* @__PURE__ */ r(ji, { asChild: !0, children: /* @__PURE__ */ d(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(ms, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(te, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ln, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Fe, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ r(
        Zt,
        {
          className: "tw-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const Ae = wt.Root, Mw = wt.Group, Pe = wt.Value, Ow = ue(
  "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
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
), _e = b.forwardRef(({ className: e, children: t, size: n, ...o }, a) => {
  const s = bt();
  return /* @__PURE__ */ d(
    wt.Trigger,
    {
      className: h(Ow({ size: n, className: e })),
      ref: a,
      ...o,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ r(wt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
_e.displayName = wt.Trigger.displayName;
const ka = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  wt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(co, { className: "tw-h-4 tw-w-4" })
  }
));
ka.displayName = wt.ScrollUpButton.displayName;
const _a = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  wt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4" })
  }
));
_a.displayName = wt.ScrollDownButton.displayName;
const Ce = b.forwardRef(({ className: e, children: t, position: n = "popper", ...o }, a) => {
  const s = bt();
  return /* @__PURE__ */ r(wt.Portal, { children: /* @__PURE__ */ d(
    wt.Content,
    {
      ref: a,
      className: h(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(ka, {}),
        /* @__PURE__ */ r(
          wt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ r(_a, {})
      ]
    }
  ) });
});
Ce.displayName = wt.Content.displayName;
const Iw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  wt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
Iw.displayName = wt.Label.displayName;
const Vt = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  wt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(wt.ItemIndicator, { children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(wt.ItemText, { children: t })
    ]
  }
));
Vt.displayName = wt.Item.displayName;
const Aw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  wt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Aw.displayName = wt.Separator.displayName;
function Pw({ table: e }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        Ae,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Pe, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ce, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ r(Vt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(fs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(hs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(bs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const eo = `
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
function $w(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function rn(e, t) {
  const n = t ? `${eo}, ${t}` : eo;
  return Array.from(e.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && $w(o)
  );
}
const Mn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        rn(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(i, {
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
  return /* @__PURE__ */ r("div", { className: h("pr-twp tw-relative tw-w-full", { "tw-p-1": t }), children: /* @__PURE__ */ r(
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
        e
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
Mn.displayName = "Table";
const On = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: h(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": t
      },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
On.displayName = "TableHeader";
const In = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", e), ...t }));
In.displayName = "TableBody";
const Lw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
Lw.displayName = "TableFooter";
function jw(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (o) => {
      if (t.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = e.current ? rn(e.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), t.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return t.addEventListener("keydown", n), () => {
      t.removeEventListener("keydown", n);
    };
  }, [e]);
}
function Vw(e, t, n) {
  let o;
  return n === "ArrowLeft" && t > 0 ? o = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (o = e[t + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function zw(e, t, n) {
  let o;
  return n === "ArrowDown" && t < e.length - 1 ? o = e[t + 1] : n === "ArrowUp" && t > 0 && (o = e[t - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Jt = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), jw(i);
  const l = b.useMemo(
    () => i.current ? rn(i.current) : [],
    [i]
  ), c = b.useCallback(
    (p) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rn(f).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), zw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Vw(l, v, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const x = m.closest("table");
        x && x.focus();
      }
      t == null || t(p);
    },
    [i, l, t]
  ), w = b.useCallback(
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
      onKeyDown: c,
      onFocus: w,
      className: h(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        e
      ),
      ...a
    }
  );
});
Jt.displayName = "TableRow";
const on = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: h(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
on.displayName = "TableHead";
const ye = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
ye.displayName = "TableCell";
const Bw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Bw.displayName = "TableCaption";
function ir({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function Fw({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var V;
  const [p, m] = M([]), [f, u] = M([]), [g, v] = M({}), [x, N] = M({}), _ = j(() => t ?? [], [t]), E = Do({
    data: _,
    columns: e,
    getCoreRowModel: Oo(),
    ...n && { getPaginationRowModel: zi() },
    onSortingChange: m,
    getSortedRowModel: Mo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Vi(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: N,
    state: {
      sorting: p,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: x
    }
  }), C = E.getVisibleFlatColumns();
  let L;
  return c ? L = Array.from({ length: 10 }).map((y, T) => `skeleton-row-${T}`).map((y) => /* @__PURE__ */ r(Jt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(ye, { colSpan: C.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(ir, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, y)) : ((V = E.getRowModel().rows) == null ? void 0 : V.length) > 0 ? L = E.getRowModel().rows.map((S) => /* @__PURE__ */ r(
    Jt,
    {
      onClick: () => i(S, E),
      "data-state": S.getIsSelected() && "selected",
      children: S.getVisibleCells().map((D) => /* @__PURE__ */ r(ye, { children: Ye(D.column.columnDef.cell, D.getContext()) }, D.id))
    },
    S.id
  )) : L = /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(ye, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Dw, { table: E }),
    /* @__PURE__ */ d(Mn, { stickyHeader: s, children: [
      /* @__PURE__ */ r(On, { stickyHeader: s, children: E.getHeaderGroups().map((S) => /* @__PURE__ */ r(Jt, { children: S.headers.map((D) => /* @__PURE__ */ r(on, { className: "tw-p-0", children: D.isPlaceholder ? void 0 : Ye(D.column.columnDef.header, D.getContext()) }, D.id)) }, S.id)) }),
      /* @__PURE__ */ r(In, { children: L })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Pw, { table: E })
  ] });
}
function pp({
  id: e,
  markdown: t,
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
      id: e,
      className: h(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Gi, { options: s, children: t })
    }
  );
}
const Gw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), no = (e, t) => e[t] ?? t;
function Uw({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: o
}) {
  const a = no(n, "%webView_error_dump_header%"), s = no(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(e), t && t();
  }
  return /* @__PURE__ */ d(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(po, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const up = Object.freeze([
  ...Gw,
  "%webView_error_dump_copied_message%"
]);
function mp({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = M(!1), c = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ d(fe, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: o }),
    /* @__PURE__ */ d(oe, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ft, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Uw,
        {
          errorDetails: e,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var qw = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(qw || {});
function fp({ id: e, label: t, groups: n }) {
  const [o, a] = M(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, i] = M({}), l = (w, p) => {
    const m = !o[w][p];
    a((u) => (u[w][p] = m, { ...u }));
    const f = n[w].items[p];
    f.onUpdate(f.id, m);
  }, c = (w, p) => {
    i((f) => (f[w] = p, { ...f }));
    const m = n[w].items.find((f) => f.id === p);
    m ? m.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: e, children: /* @__PURE__ */ d(pe, { children: [
    /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ d(z, { variant: "default", children: [
      /* @__PURE__ */ r(vs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ r(Le, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(te, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(ln, { children: w.label }),
      /* @__PURE__ */ r(va, { children: w.itemType === 0 ? /* @__PURE__ */ r(pt, { children: w.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Zt,
        {
          checked: o[p][f],
          onCheckedChange: () => l(p, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        Rw,
        {
          value: s[p],
          onValueChange: (m) => c(p, m),
          children: w.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Na, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(Fe, {})
    ] }, w.label)) })
  ] }) });
}
function hp({
  id: e,
  category: t,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new Ks("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, m) => p + m, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: e,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        t && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: t }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(xs, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ d(
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
        (a || i) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            z,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(ys, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            z,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Ns, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Kw({ id: e, versionHistory: t }) {
  const [n, o] = M(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, m = w.getUTCMonth(), f = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: e, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
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
function gp({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = j(() => Hs(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(Ys(), { type: "language" });
    return w.map((m) => p.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Kw, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Hw({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: p = void 0,
  isDisabled: m = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: x
}) {
  const [N, _] = M(!1), E = U(
    (T) => {
      var $;
      const O = ($ = e.find((I) => I.label === T)) == null ? void 0 : $.value;
      O && n(
        t.includes(O) ? t.filter((I) => I !== O) : [...t, O]
      );
    },
    [e, t, n]
  ), C = () => c || o, L = j(() => {
    if (!f) return e;
    const T = e.filter(($) => $.starred).sort(($, I) => $.label.localeCompare(I.label)), O = e.filter(($) => !$.starred).sort(($, I) => {
      const A = t.includes($.value), X = t.includes(I.value);
      return A && !X ? -1 : !A && X ? 1 : $.label.localeCompare(I.label);
    });
    return [...T, ...O];
  }, [e, t, f]), V = () => {
    n(e.map((T) => T.value));
  }, S = () => {
    n([]);
  }, D = w ?? N;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ d(fe, { open: D, onOpenChange: p ?? _, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ d(
      z,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": D,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
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
          /* @__PURE__ */ r(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(oe, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(ne, { children: [
      /* @__PURE__ */ r(ze, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: V, children: s }),
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: S, children: i })
      ] }),
      /* @__PURE__ */ d(re, { children: [
        /* @__PURE__ */ r(Be, { children: l }),
        /* @__PURE__ */ r(Ee, { children: L.map((T) => /* @__PURE__ */ d(
          me,
          {
            value: T.label,
            onSelect: E,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Gt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    t.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(ks, { className: "tw-h-4 tw-w-4" }),
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
function bp({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: p,
  id: m
}) {
  return /* @__PURE__ */ d("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Hw,
      {
        entries: e,
        selected: t,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    t.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((f) => {
      var u;
      return /* @__PURE__ */ d(ce, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== f)),
            children: /* @__PURE__ */ r($e, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(ft, { children: p })
  ] });
}
const Yw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), ro = (e, t) => e[t] ?? t;
function Xw({
  onUndoClick: e,
  onRedoClick: t,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const c = j(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ d(pt, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Undo",
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(_s, {})
        }
      ) }),
      /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d("p", { children: [
        ro(a, "%undoButton_tooltip%"),
        s && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    t && /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Redo",
          className: i,
          size: "icon",
          onClick: t,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(Cs, {})
        }
      ) }),
      /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d("p", { children: [
        ro(a, "%redoButton_tooltip%"),
        s && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Ww({ children: e, editorRef: t }) {
  const n = Y(null);
  return G(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var w, p, m, f;
      if (!a || document.activeElement !== a) return;
      const c = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (w = t.current) == null || w.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (p = t.current) == null || p.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (m = t.current) == null || m.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (f = t.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [t]), /* @__PURE__ */ r("div", { ref: n, children: e });
}
const Ge = b.forwardRef(
  ({ className: e, type: t, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: t,
      className: h(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: o,
      ...n
    }
  )
);
Ge.displayName = "Input";
const Jw = (e, t, n) => e === "generated" ? /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Zw({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = Y(null), i = Y(null), l = Y(!1), [c, w] = M(e), [p, m] = M(n), [f, u] = M(!1);
  G(() => {
    w(e);
  }, [e]), G(() => {
    p !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (c !== "custom" || p ? (t(c), o(p)) : (w(e), m(n)));
  }, v = (x) => {
    var N, _, E, C;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((_ = i.current) == null || _.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((E = s.current) == null ? void 0 : E.selectionStart) === 0 && ((C = i.current) == null || C.focus(), l.current = !1), c === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ d(pe, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: Jw(e, a, n) }) }) }),
      /* @__PURE__ */ r(Tt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      te,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var x;
          l.current && ((x = s.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ r(ln, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Fe, {}),
          /* @__PURE__ */ r(
            Zt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Jn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Zt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Zn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Zt,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (x) => {
                var N;
                x.stopPropagation(), l.current = !0, (N = s.current) == null || N.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Ge,
                  {
                    tabIndex: 0,
                    onMouseDown: (x) => {
                      x.stopPropagation(), w("custom"), l.current = !0;
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
const Qw = (e, t) => e === "f" ? /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r(fo, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r(ho, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(pt, { children: [
  /* @__PURE__ */ r(mo, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), tc = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), ve(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function ec({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ d(pe, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r(Mi, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: Qw(e, n) }) }) }),
      /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: tc(e, n) }) })
    ] }) }),
    /* @__PURE__ */ d(te, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(ln, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Fe, {}),
      /* @__PURE__ */ d(
        Zt,
        {
          disabled: e !== "x" && !o,
          checked: e === "x",
          onCheckedChange: () => t("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(mo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Zt,
        {
          disabled: e === "x" && !o,
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(fo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Zt,
        {
          disabled: e === "x" && !o,
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ho, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const nc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function rc({ icon: e, className: t }) {
  return /* @__PURE__ */ r(e ?? Es, { className: t, size: 16 });
}
function oc({ localizedStrings: e, markerMenuItems: t, searchRef: n }) {
  const [o, a] = M(""), s = j(() => {
    const i = o.trim().toLowerCase();
    if (!i)
      return t;
    const l = t.filter(
      (c) => {
        var w;
        return (w = c.marker) == null ? void 0 : w.toLowerCase().includes(i);
      }
    );
    return l.push(
      ...t.filter(
        (c) => c.title.toLowerCase().includes(i) && !l.includes(c)
      )
    ), l;
  }, [o, t]);
  return /* @__PURE__ */ d(ne, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      ze,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (i) => a(i),
        placeholder: e["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(re, { children: [
      /* @__PURE__ */ r(Be, { children: e["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Ee, { children: s.map((i) => {
        var l;
        return /* @__PURE__ */ d(
          me,
          {
            className: "tw-flex tw-gap-2 hover:tw-bg-accent",
            disabled: i.isDisallowed || i.isDeprecated,
            onSelect: i.action,
            children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: i.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: i.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(rc, { icon: i.icon }) }) }),
              /* @__PURE__ */ d("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: i.title }),
                i.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: i.subtitle })
              ] }),
              (i.isDisallowed || i.isDeprecated) && /* @__PURE__ */ r(jo, { className: "tw-font-sans", children: i.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${i.marker ?? ((l = i.icon) == null ? void 0 : l.displayName)}-${i.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function ac(e, t, n, o) {
  if (!o || o === "p") return [];
  const a = mn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[mn[l].description] ?? mn[l].description,
        action: () => {
          var c;
          (c = e.current) == null || c.insertMarker(l), t();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function sc(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "ft" && (t.style = "xt"), t.style === "fr" && (t.style = "xo"), t.style === "fq" && (t.style = "xq"));
}
function ic(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "xt" && (t.style = "ft"), t.style === "xo" && (t.style = "fr"), t.style === "xq" && (t.style = "fq"));
}
const lc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function vp({
  classNameForEditor: e,
  noteOps: t,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: w
}) {
  const p = Y(null), m = Y(null), f = Y(null), u = Y(null);
  Xt(() => {
    if (!u.current) return;
    const { width: P } = u.current.getBoundingClientRect();
    P > 0 && (u.current.style.width = `${P}px`);
  }, []);
  const [g, v] = M("generated"), [x, N] = M("*"), [_, E] = M("f"), [C, L] = M(!1), [V, S] = M(!0), [D, y] = M(!1), T = Y(!1), O = Y(""), [$, I] = M(!1), [A, X] = M(), [q, J] = M(), [Ct, Mt] = M(), [Lt, ht] = M(), ut = Y(null), F = j(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? Ui(), noteMode: "expanded" }
    }),
    [i, l]
  ), at = j(
    () => ac(
      p,
      () => I(!1),
      c,
      Lt
    ),
    [c, Lt]
  );
  G(() => {
    var P;
    $ || (P = p.current) == null || P.focus();
  }, [_, $]), G(() => {
    var tt, it;
    let P;
    T.current = !1, S(!0);
    const B = t == null ? void 0 : t.at(0);
    if (B && cn("note", B)) {
      const Nt = (tt = B.insert.note) == null ? void 0 : tt.caller;
      let gt = "custom";
      Nt === Jn ? gt = "generated" : Nt === Zn ? gt = "hidden" : Nt && N(Nt), v(gt), E(((it = B.insert.note) == null ? void 0 : it.style) ?? "f"), P = setTimeout(() => {
        var It;
        (It = p.current) == null || It.applyUpdate([B]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [t, s]);
  const st = U(
    (P, B, tt = !1) => {
      var Nt, gt, It;
      const it = (gt = (Nt = p.current) == null ? void 0 : Nt.getNoteOps(0)) == null ? void 0 : gt.at(0);
      if (it && cn("note", it)) {
        if (it.insert.note) {
          let xt;
          P === "custom" ? xt = B : P === "generated" ? xt = Jn : xt = Zn, it.insert.note.caller = xt;
        }
        n == null || n([it]), tt && w && s && ((It = w.current) == null || It.replaceEmbedUpdate(s, [it]));
      }
    },
    [s, n, w]
  ), ct = U(() => {
    st(g, x, !0), o();
  }, [g, x, o, st]), Et = Y(ct);
  Xt(() => {
    Et.current = ct;
  });
  const Kt = Y({ book: a.book, chapterNum: a.chapterNum });
  Xt(() => {
    (Kt.current.book !== a.book || Kt.current.chapterNum !== a.chapterNum) && (Kt.current = { book: a.book, chapterNum: a.chapterNum }, Et.current());
  }, [a.book, a.chapterNum]);
  const Ht = () => {
    var B;
    const P = (B = m.current) == null ? void 0 : B.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
  }, k = U(
    (P) => {
      v(P), st(P, x);
    },
    [x, st]
  ), K = U(
    (P) => {
      N(P), st(g, P);
    },
    [g, st]
  ), H = (P) => {
    var tt, it, Nt, gt, It;
    E(P);
    const B = (it = (tt = p.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : it.at(0);
    if (B && cn("note", B)) {
      B.insert.note && (B.insert.note.style = P);
      const xt = (gt = (Nt = B.insert.note) == null ? void 0 : Nt.contents) == null ? void 0 : gt.ops;
      _ !== "x" && P === "x" ? xt == null || xt.forEach((At) => sc(At)) : _ === "x" && P !== "x" && (xt == null || xt.forEach((At) => ic(At))), (It = p.current) == null || It.applyUpdate([B, { delete: 1 }]);
    }
  }, lt = (P) => {
    ht(P.contextMarker), y(P.canRedo);
  }, Ot = U(
    (P) => {
      var tt, it, Nt, gt, It;
      const B = (it = (tt = p.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : it.at(0);
      if (B && cn("note", B)) {
        P.content.length > 1 && setTimeout(() => {
          var zt;
          (zt = p.current) == null || zt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const xt = (Nt = B.insert.note) == null ? void 0 : Nt.style, At = (It = (gt = B.insert.note) == null ? void 0 : gt.contents) == null ? void 0 : It.ops;
        if (xt || L(!1), L(
          xt === "x" ? !!(At != null && At.every((zt) => {
            var yt, mt;
            if (!((yt = zt.attributes) != null && yt.char)) return !0;
            const R = ((mt = zt.attributes) == null ? void 0 : mt.char).style;
            return R === "xt" || R === "xo" || R === "xq";
          })) : !!(At != null && At.every((zt) => {
            var yt, mt;
            if (!((yt = zt.attributes) != null && yt.char)) return !0;
            const R = ((mt = zt.attributes) == null ? void 0 : mt.char).style;
            return R === "ft" || R === "fr" || R === "fq";
          }))
        ), !T.current) {
          T.current = !0, O.current = JSON.stringify(B), S(!0);
          return;
        }
        S(JSON.stringify(B) === O.current), st(g, x);
      } else
        L(!1), S(!0);
    },
    [g, x, st]
  ), vt = U(() => {
    const P = window.getSelection();
    if (f.current && at.length && P && P.rangeCount > 0) {
      const B = P.getRangeAt(0).getBoundingClientRect(), tt = f.current.getBoundingClientRect();
      X(B.left - tt.left), J(B.top - tt.top), Mt(B.height), I(!0);
    }
  }, [at, f]);
  return G(() => {
    const P = () => {
      $ && I(!1);
    };
    return window.addEventListener("click", P), () => {
      window.removeEventListener("click", P);
    };
  }, [$]), G(() => {
    var P;
    $ && ((P = ut.current) == null || P.focus());
  }, [$]), G(() => {
    var tt;
    const P = ((tt = m.current) == null ? void 0 : tt.querySelector(".editor-input")) ?? void 0, B = (it) => {
      !$ && P && document.activeElement === P && it.key === l ? (it.preventDefault(), vt()) : $ && it.key === "Escape" && (it.preventDefault(), I(!1));
    };
    return document.addEventListener("keydown", B), () => {
      document.removeEventListener("keydown", B);
    };
  }, [$, vt, l]), /* @__PURE__ */ d(pt, { children: [
    /* @__PURE__ */ d("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            ec,
            {
              isTypeSwitchable: C,
              noteType: _,
              handleNoteTypeChange: H,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            Zw,
            {
              callerType: g,
              updateCallerType: k,
              customCaller: x,
              updateCustomCaller: K,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Xw,
            {
              onUndoClick: () => {
                var P;
                return (P = p.current) == null ? void 0 : P.undo();
              },
              onRedoClick: () => {
                var P;
                return (P = p.current) == null ? void 0 : P.redo();
              },
              canUndo: !V,
              canRedo: D,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              z,
              {
                onClick: ct,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Gt, {})
              }
            ) }),
            /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r($e, {}) }) }),
            /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ d(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: e, children: /* @__PURE__ */ r(Ww, { editorRef: p, children: /* @__PURE__ */ r(
              qi,
              {
                options: F,
                onStateChange: lt,
                onUsjChange: Ot,
                defaultUsj: lc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: p
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
              /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
                z,
                {
                  onClick: Ht,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(po, {})
                }
              ) }),
              /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ d(fe, { open: $, children: [
      /* @__PURE__ */ r(
        sl,
        {
          className: "tw-absolute",
          style: {
            top: q,
            left: A,
            height: Ct,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        oe,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (P) => {
            P.preventDefault(), P.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            oc,
            {
              markerMenuItems: at,
              localizedStrings: c,
              searchRef: ut
            }
          )
        }
      )
    ] })
  ] });
}
const xp = Object.freeze([
  ...nc,
  ...Object.entries(mn).map(([, e]) => e.description).filter((e) => !!e),
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
  ...Yw
]);
function Ca(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${o}`;
}
function wc(e, t, n = !0, o = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const w = c === s.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      Tr(e, l, n, !0, a),
      w && o
    ] }, Ca(e, l));
  });
}
function Tr(e, t, n = !0, o = !0, a = []) {
  if (!(!t || t.length === 0))
    return t.map((s) => {
      if (typeof s == "string") {
        const i = `${e}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${e}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Xn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Xn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return cc(
        s,
        Ca(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function cc(e, t, n, o = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Xn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Tr(a, e.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, t);
}
function dc({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: h("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ d(pt, { children: [
    Tr(e.marker, [i], o, !1),
    " "
  ] }), f = t === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = t === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", v = h(f, u);
  return /* @__PURE__ */ d(pt, { children: [
    /* @__PURE__ */ d("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(pt, { children: wc(e.marker, l, o, w) })
      }
    )
  ] });
}
function yp({
  className: e,
  classNameForItems: t,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w
}) {
  const p = c ?? Xs(n, void 0), m = (_, E) => {
    w == null || w(_, E, a);
  }, f = s ? n.findIndex((_) => _ === s) : -1, [u, g] = M(f), v = (_, E, C) => {
    if (n.length)
      switch (_.key) {
        case "Enter":
        case " ":
          _.preventDefault(), w == null || w(E, C, a);
          break;
      }
  }, x = (_) => {
    if (n.length)
      switch (_.key) {
        case "ArrowDown":
          _.preventDefault(), g((E) => Math.min(E + 1, n.length - 1));
          break;
        case "ArrowUp":
          _.preventDefault(), g((E) => Math.max(E - 1, 0));
          break;
      }
  }, N = Y([]);
  return G(() => {
    var _;
    u >= 0 && u < N.current.length && ((_ = N.current[u]) == null || _.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: h("tw-h-full tw-overflow-y-auto", e),
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
          children: n.map((_, E) => {
            const C = _ === s, L = `${a}-${E}`;
            return /* @__PURE__ */ d(pt, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (V) => {
                    N.current[E] = V;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": _.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: E === u ? 0 : -1,
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
                    t
                  ),
                  onClick: () => m(_, E),
                  onKeyDown: (V) => v(V, _, E),
                  children: /* @__PURE__ */ r(
                    dc,
                    {
                      footnote: _,
                      layout: o,
                      formatCaller: () => p(_.caller, E),
                      showMarkers: i
                    }
                  )
                },
                L
              ),
              E < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Ie, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function pc(e) {
  const t = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function uc({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = j(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return e.forEach((w) => {
      const p = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(p) || (c.add(p), l.push(w));
    }), l;
  }, [e]);
  return /* @__PURE__ */ d(Mn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(On, { stickyHeader: !0, children: /* @__PURE__ */ d(Jt, { children: [
      /* @__PURE__ */ r(on, { children: a }),
      /* @__PURE__ */ r(on, { children: s })
    ] }) }),
    /* @__PURE__ */ r(In, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ d(
      Jt,
      {
        onClick: () => {
          t(l.reference);
        },
        children: [
          /* @__PURE__ */ r(ye, { children: De(l.reference, "English") }),
          /* @__PURE__ */ r(ye, { className: o, children: pc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Sr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Qn.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(
      Qn.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Sr.displayName = Qn.Root.displayName;
const mc = (e) => {
  if (e === "asc")
    return /* @__PURE__ */ r(Ds, { className: "tw-h-4 tw-w-4" });
  if (e === "desc")
    return /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" });
}, An = (e, t, n) => /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(Pt, { children: [
  /* @__PURE__ */ d(
    $t,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => e.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: t }),
        mc(e.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Tt, { side: "bottom", children: t })
] }) }), Np = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => An(t, e)
}), fc = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => An(n, e)
}), kp = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => An(t, e, "tw-justify-end"),
  cell: ({ row: t }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: t.getValue("count") })
}), qn = (e, t, n, o, a, s) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((w) => w !== c);
  }), o(i);
  let l = [...a];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), s(l);
}, _p = (e, t, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => An(s, e, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ d(_r, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
              [l],
              "approved",
              t,
              n,
              o,
              a
            );
          },
          value: "approved",
          className: "tw-rounded-e-none tw-border-e-0",
          children: /* @__PURE__ */ r(Rs, {})
        }
      ),
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
              [l],
              "unapproved",
              t,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          className: "tw-rounded-none",
          children: /* @__PURE__ */ r(Ts, {})
        }
      ),
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
              [l],
              "unknown",
              t,
              n,
              o,
              a
            );
          },
          value: "unknown",
          className: "tw-rounded-s-none tw-border-s-0",
          children: /* @__PURE__ */ r(Ss, {})
        }
      )
    ] });
  }
}), Cp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ep = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Rp = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, hc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", Tp = Object.freeze([
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
]), gc = (e, t, n) => {
  let o = e;
  return t !== "all" && (o = o.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, bc = (e, t, n) => e.map((o) => {
  const a = Lr(o.key) ? o.key : o.key[0];
  return {
    items: Lr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || hc(a, t, n),
    occurrences: o.occurrences || []
  };
}), Yt = (e, t) => e[t] ?? t;
function Sp({
  inventoryItems: e,
  setVerseRef: t,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: m,
  onItemSelected: f
}) {
  const u = Yt(n, "%webView_inventory_all%"), g = Yt(n, "%webView_inventory_approved%"), v = Yt(n, "%webView_inventory_unapproved%"), x = Yt(n, "%webView_inventory_unknown%"), N = Yt(n, "%webView_inventory_scope_currentBook%"), _ = Yt(n, "%webView_inventory_scope_chapter%"), E = Yt(n, "%webView_inventory_scope_verse%"), C = Yt(n, "%webView_inventory_filter_text%"), L = Yt(
    n,
    "%webView_inventory_show_additional_items%"
  ), V = Yt(n, "%webView_inventory_no_results%"), [S, D] = M(!1), [y, T] = M("all"), [O, $] = M(""), [I, A] = M([]), X = j(() => {
    const F = e ?? [];
    return F.length === 0 ? [] : bc(F, a, s);
  }, [e, a, s]), q = j(() => {
    if (S) return X;
    const F = [];
    return X.forEach((at) => {
      const st = at.items[0], ct = F.find(
        (Et) => Et.items[0] === st
      );
      ct ? (ct.count += at.count, ct.occurrences = ct.occurrences.concat(at.occurrences)) : F.push({
        items: [st],
        count: at.count,
        occurrences: at.occurrences,
        status: at.status
      });
    }), F;
  }, [S, X]), J = j(() => q.length === 0 ? [] : gc(q, y, O), [q, y, O]), Ct = j(() => {
    var st, ct;
    if (!S) return c;
    const F = (st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st.length;
    if (!F) return c;
    const at = [];
    for (let Et = 0; Et < F; Et++)
      at.push(
        fc(
          ((ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct[Et]) || "Additional Item",
          Et + 1
        )
      );
    return [...at, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, S]);
  G(() => {
    J.length === 0 ? A([]) : J.length === 1 && A(J[0].items);
  }, [J]);
  const Mt = (F, at) => {
    at.setRowSelection(() => {
      const ct = {};
      return ct[F.index] = !0, ct;
    });
    const st = F.original.items;
    A(st), f && st.length > 0 && f(st[0]);
  }, Lt = (F) => {
    if (F === "book" || F === "chapter" || F === "verse")
      l(F);
    else
      throw new Error(`Invalid scope value: ${F}`);
  }, ht = (F) => {
    if (F === "all" || F === "approved" || F === "unapproved" || F === "unknown")
      T(F);
    else
      throw new Error(`Invalid status filter value: ${F}`);
  }, ut = j(() => {
    if (q.length === 0 || I.length === 0) return [];
    const F = q.filter((at) => Ws(
      S ? at.items : [at.items[0]],
      I
    ));
    if (F.length > 1) throw new Error("Selected item is not unique");
    return F.length === 0 ? [] : F[0].occurrences;
  }, [I, S, q]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Ae,
        {
          onValueChange: (F) => ht(F),
          defaultValue: y,
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Ce, { children: [
              /* @__PURE__ */ r(Vt, { value: "all", children: u }),
              /* @__PURE__ */ r(Vt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Vt, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(Vt, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Ae, { onValueChange: (F) => Lt(F), defaultValue: i, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Ce, { children: [
          /* @__PURE__ */ r(Vt, { value: "book", children: N }),
          /* @__PURE__ */ r(Vt, { value: "chapter", children: _ }),
          /* @__PURE__ */ r(Vt, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ge,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: C,
          value: O,
          onChange: (F) => {
            $(F.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Sr,
          {
            className: "tw-m-1",
            checked: S,
            onCheckedChange: (F) => {
              D(F);
            }
          }
        ),
        /* @__PURE__ */ r(ft, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Fw,
      {
        columns: Ct,
        data: J,
        onRowClickHandler: Mt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: V
      }
    ) }),
    ut.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      uc,
      {
        classNameForText: m,
        occurrenceData: ut,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const vc = "16rem", xc = "3rem", Ea = b.createContext(void 0);
function Pn() {
  const e = b.useContext(Ea);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const Ra = b.forwardRef(
  ({
    defaultOpen: e = !0,
    open: t,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [w, p] = b.useState(e), m = t ?? w, f = b.useCallback(
      (E) => {
        const C = typeof E == "function" ? E(m) : E;
        n ? n(C) : p(C);
      },
      [n, m]
    ), u = b.useCallback(() => f((E) => !E), [f]), g = m ? "expanded" : "collapsed", N = bt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", _ = b.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: N
      }),
      [g, m, f, u, N]
    );
    return /* @__PURE__ */ r(Ea.Provider, { value: _, children: /* @__PURE__ */ r(Rt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": vc,
            "--sidebar-width-icon": xc,
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
        children: s
      }
    ) }) });
  }
);
Ra.displayName = "SidebarProvider";
const Ta = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Pn();
  return t === "none" ? /* @__PURE__ */ r(
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
  ) : /* @__PURE__ */ d(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? t : "",
      "data-variant": e,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: h(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
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
              e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
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
Ta.displayName = "Sidebar";
const yc = b.forwardRef(({ className: e, onClick: t, ...n }, o) => {
  const a = Pn();
  return /* @__PURE__ */ d(
    z,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw-h-7 tw-w-7", e),
      onClick: (s) => {
        t == null || t(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(Os, {}) : /* @__PURE__ */ r(Is, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
yc.displayName = "SidebarTrigger";
const Nc = b.forwardRef(
  ({ className: e, ...t }, n) => {
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
          e
        ),
        ...t
      }
    );
  }
);
Nc.displayName = "SidebarRail";
const Sa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: h(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...t
    }
  )
);
Sa.displayName = "SidebarInset";
const kc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ge,
  {
    ref: n,
    "data-sidebar": "input",
    className: h(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...t
  }
));
kc.displayName = "SidebarInput";
const _c = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
_c.displayName = "SidebarHeader";
const Cc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Cc.displayName = "SidebarFooter";
const Ec = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ie,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
Ec.displayName = "SidebarSeparator";
const Da = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: h(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...t
    }
  )
);
Da.displayName = "SidebarContent";
const lr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...t
    }
  )
);
lr.displayName = "SidebarGroup";
const wr = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? je : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: h(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      e
    ),
    ...n
  }
));
wr.displayName = "SidebarGroupLabel";
const Rc = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? je : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: h(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      e
    ),
    ...n
  }
));
Rc.displayName = "SidebarGroupAction";
const cr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: h("tw-w-full tw-text-sm", e),
      ...t
    }
  )
);
cr.displayName = "SidebarGroupContent";
const Ma = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...t
    }
  )
);
Ma.displayName = "SidebarMenu";
const Oa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: h("tw-group/menu-item tw-relative", e),
      ...t
    }
  )
);
Oa.displayName = "SidebarMenuItem";
const Tc = ue(
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
), Ia = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = e ? je : "button", { state: w } = Pn(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": t,
        className: h(Tc({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Tt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Ia.displayName = "SidebarMenuButton";
const Sc = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  t ? je : "button",
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
      e
    ),
    ...o
  }
));
Sc.displayName = "SidebarMenuAction";
const Dc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
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
        e
      ),
      ...t
    }
  )
);
Dc.displayName = "SidebarMenuBadge";
const Mc = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ r(ir, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          ir,
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
Mc.displayName = "SidebarMenuSkeleton";
const Oc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: h(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
Oc.displayName = "SidebarMenuSub";
const Ic = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ r("li", { ref: t, ...e })
);
Ic.displayName = "SidebarMenuSubItem";
const Ac = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  e ? je : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": t,
    "data-active": n,
    className: h(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      t === "sm" && "tw-text-xs",
      t === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      o
    ),
    ...a
  }
));
Ac.displayName = "SidebarMenuSubButton";
function Pc({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = U(
    (f, u) => {
      o(f, u);
    },
    [o]
  ), p = U(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = U(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Ta,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Da, { children: [
        /* @__PURE__ */ d(lr, { children: [
          /* @__PURE__ */ r(wr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(cr, { children: /* @__PURE__ */ r(Ma, { children: Object.entries(t).map(([f, u]) => /* @__PURE__ */ r(Oa, { children: /* @__PURE__ */ r(
            Ia,
            {
              onClick: () => w(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ d(lr, { children: [
          /* @__PURE__ */ r(wr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(cr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            nr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = p(f);
                w(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(As, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Dr = an(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = bt();
    return /* @__PURE__ */ d("div", { id: i, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        io,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ge,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: e,
          onChange: (w) => t(w.target.value),
          disabled: s
        }
      ),
      e && /* @__PURE__ */ d(
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
            t("");
          },
          children: [
            /* @__PURE__ */ r($e, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Dr.displayName = "SearchBar";
function Dp({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Dr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Ra,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Pc,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: t,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(Sa, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const se = "scrBook", $c = "scrRef", be = "source", Lc = "details", jc = "Scripture Reference", Vc = "Scripture Book", Aa = "Type", zc = "Details";
function Bc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: se,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? jc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? dt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === se ? De(a.start) : void 0;
      },
      getGroupingValue: (o) => dt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Wn(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => De(o.start),
      id: $c,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : De(a.start);
      },
      sortingFn: (o, a) => Wn(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: be,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Aa : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Lc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? zc,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Fc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Wn(e.start, e.end) === 0 ? `${$n(e.start)}+${t}` : `${$n(e.start)}+${t}-${$n(e.end)}+${n}`;
}, oo = (e) => `${Fc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Mp({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: c
}) {
  const [w, p] = M([]), [m, f] = M([{ id: se, desc: !1 }]), [u, g] = M({}), v = j(
    () => e.flatMap((y) => y.data.map((T) => ({
      ...T,
      source: y.source
    }))),
    [e]
  ), x = j(
    () => Bc(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  G(() => {
    w.includes(be) ? f([
      { id: be, desc: !1 },
      { id: se, desc: !1 }
    ]) : f([{ id: se, desc: !1 }]);
  }, [w]);
  const N = Do({
    data: v,
    columns: x,
    state: {
      grouping: w,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Fi(),
    getGroupedRowModel: Bi(),
    getCoreRowModel: Oo(),
    getSortedRowModel: Mo(),
    getRowId: oo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  G(() => {
    if (l) {
      const y = N.getSelectedRowModel().rowsById, T = Object.keys(y);
      if (T.length === 1) {
        const O = v.find(($) => oo($) === T[0]) || void 0;
        O && l(O);
      }
    }
  }, [u, v, l, N]);
  const _ = a ?? Vc, E = s ?? Aa, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [se] },
    { label: `Group by ${E}`, value: [be] },
    {
      label: `Group by ${_} and ${E}`,
      value: [se, be]
    },
    {
      label: `Group by ${E} and ${_}`,
      value: [be, se]
    }
  ], L = (y) => {
    p(JSON.parse(y));
  }, V = (y, T) => {
    !y.getIsGrouped() && !y.getIsSelected() && y.getToggleSelectedHandler()(T);
  }, S = (y, T) => y.getIsGrouped() ? "" : h("banded-row", T % 2 === 0 ? "even" : "odd"), D = (y, T, O) => {
    if (!((y == null ? void 0 : y.length) === 0 || T.depth < O.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ d(
      Ae,
      {
        value: JSON.stringify(w),
        onValueChange: (y) => {
          L(y);
        },
        children: [
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(Mw, { children: C.map((y) => /* @__PURE__ */ r(Vt, { value: JSON.stringify(y.value), children: y.label }, y.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Mn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ r(On, { children: N.getHeaderGroups().map((y) => /* @__PURE__ */ r(Jt, { children: y.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(on, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ye(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, y.id)) }),
      /* @__PURE__ */ r(In, { children: N.getRowModel().rows.map((y, T) => {
        const O = bt();
        return /* @__PURE__ */ r(
          Jt,
          {
            "data-state": y.getIsSelected() ? "selected" : "",
            className: h(S(y, T)),
            onClick: ($) => V(y, $),
            children: y.getVisibleCells().map(($) => {
              if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== be || !n)))
                return /* @__PURE__ */ r(
                  ye,
                  {
                    className: h(
                      $.column.columnDef.id,
                      "tw-p-[1px]",
                      D(w, y, $)
                    ),
                    children: $.getIsGrouped() ? /* @__PURE__ */ d(
                      z,
                      {
                        variant: "link",
                        onClick: y.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          y.getIsExpanded() && /* @__PURE__ */ r(Le, {}),
                          !y.getIsExpanded() && (O === "ltr" ? /* @__PURE__ */ r(En, {}) : /* @__PURE__ */ r(Ps, {})),
                          " ",
                          Ye($.column.columnDef.cell, $.getContext()),
                          " (",
                          y.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ye($.column.columnDef.cell, $.getContext())
                  },
                  $.id
                );
            })
          },
          y.id
        );
      }) })
    ] })
  ] });
}
function Gc(e, t, n) {
  return `${e} ${en[e]}${t ? ` ${zo(e, t)} ${jt(e, t)}` : ""}`;
}
const Mr = (e, t) => e.filter((n) => {
  try {
    return He(n) === t;
  } catch {
    return !1;
  }
}), Pa = (e, t, n) => Mr(e, t).every((o) => n.includes(o));
function Uc({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Mr(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(e),
      className: h(
        Pa(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Qi(
        e,
        i,
        l,
        c,
        w
      )
    }
  );
}
const ao = 5, Kn = 6;
function qc({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, N] = M(!1), [_, E] = M(""), C = Y(void 0), L = Y(!1);
  if (e.length !== dt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const V = j(() => dt.allBookIds.filter(
    (A, X) => e[X] === "1" && !dt.isObsolete(dt.bookIdToNumber(A))
  ), [e]), S = j(() => {
    if (!_.trim()) {
      const q = {
        [W.OT]: [],
        [W.NT]: [],
        [W.DC]: [],
        [W.Extra]: []
      };
      return V.forEach((J) => {
        const Ct = He(J);
        q[Ct].push(J);
      }), q;
    }
    const A = V.filter(
      (q) => gr(q, _, a)
    ), X = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return A.forEach((q) => {
      const J = He(q);
      X[J].push(q);
    }), X;
  }, [V, _, a]), D = U(
    (A, X = !1) => {
      if (!X || !C.current) {
        n(
          t.includes(A) ? t.filter((ht) => ht !== A) : [...t, A]
        ), C.current = A;
        return;
      }
      const q = V.findIndex((ht) => ht === C.current), J = V.findIndex((ht) => ht === A);
      if (q === -1 || J === -1) return;
      const [Ct, Mt] = [
        Math.min(q, J),
        Math.max(q, J)
      ], Lt = V.slice(Ct, Mt + 1).map((ht) => ht);
      n(
        t.includes(A) ? t.filter((ht) => !Lt.includes(ht)) : [.../* @__PURE__ */ new Set([...t, ...Lt])]
      );
    },
    [t, n, V]
  ), y = (A) => {
    D(A, L.current), L.current = !1;
  }, T = (A, X) => {
    A.preventDefault(), D(X, A.shiftKey);
  }, O = U(
    (A) => {
      const X = Mr(V, A).map((q) => q);
      n(
        Pa(V, A, t) ? t.filter((q) => !X.includes(q)) : [.../* @__PURE__ */ new Set([...t, ...X])]
      );
    },
    [t, n, V]
  ), $ = () => {
    n(V.map((A) => A));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(W).map((A) => /* @__PURE__ */ r(
      Uc,
      {
        section: A,
        availableBookIds: V,
        selectedBookIds: t,
        onToggle: O,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ d(
      fe,
      {
        open: x,
        onOpenChange: (A) => {
          N(A), A || E("");
        },
        children: [
          /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ d(
            z,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ r(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(oe, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            ne,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (L.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  ze,
                  {
                    placeholder: l,
                    value: _,
                    onValueChange: E
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: $, children: c }),
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: I, children: w })
                ] }),
                /* @__PURE__ */ d(re, { children: [
                  /* @__PURE__ */ r(Be, { children: p }),
                  Object.values(W).map((A, X) => {
                    const q = S[A];
                    if (q.length !== 0)
                      return /* @__PURE__ */ d(so, { children: [
                        /* @__PURE__ */ r(
                          Ee,
                          {
                            heading: Vo(A, f, u, g, v),
                            children: q.map((J) => /* @__PURE__ */ r(
                              Fo,
                              {
                                bookId: J,
                                isSelected: t.includes(J),
                                onSelect: () => y(J),
                                onMouseDown: (Ct) => T(Ct, J),
                                section: He(J),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Gc(J, a),
                                className: "tw-flex tw-items-center"
                              },
                              J
                            ))
                          }
                        ),
                        X < Object.values(W).length - 1 && /* @__PURE__ */ r(Lo, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    t.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      t.slice(
        0,
        t.length === Kn ? Kn : ao
      ).map((A) => /* @__PURE__ */ r(ce, { className: "hover:tw-bg-secondary", variant: "secondary", children: jt(A, a) }, A)),
      t.length > Kn && /* @__PURE__ */ r(
        ce,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - ao} ${m}`
        }
      )
    ] })
  ] });
}
const Op = Object.freeze([
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
]), he = (e, t) => e[t] ?? t;
function Ip({
  scope: e,
  availableScopes: t,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: c
}) {
  const w = he(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = he(
    i,
    "%webView_scope_selector_current_verse%"
  ), m = he(
    i,
    "%webView_scope_selector_current_chapter%"
  ), f = he(i, "%webView_scope_selector_current_book%"), u = he(i, "%webView_scope_selector_choose_books%"), g = he(i, "%webView_scope_selector_scope%"), v = he(i, "%webView_scope_selector_select_books%"), x = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], N = t ? x.filter((_) => t.includes(_.value)) : x;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: g }),
      /* @__PURE__ */ r(
        br,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: _, label: E, id: C }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(vn, { className: "tw-me-2", value: _, id: C }),
            /* @__PURE__ */ r(ft, { htmlFor: C, children: E })
          ] }, C))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: v }),
      /* @__PURE__ */ r(
        qc,
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
const Hn = {
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
function Ap({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Hn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Hn ? Hn[w] : p
        ]
      )
    )
  }, c = bt();
  return /* @__PURE__ */ d(
    Ae,
    {
      value: `${t}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(_e, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Pe,
          {
            placeholder: l[Q(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ r(
          Ce,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((w) => /* @__PURE__ */ r(Vt, { value: `${w}`, children: l[Q(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Pp({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: e });
}
function $p({
  primary: e,
  secondary: t,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Lp({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ r(Ie, {}) : ""
  ] });
}
function $a(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, o]) => "menuItem" in o && o.menuItem === t
  )) == null ? void 0 : n[0];
}
function kn({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const La = (e, t, n, o) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(Pt, { children: [
  /* @__PURE__ */ r($t, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    Nn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(kn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(kn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(Ew, { children: [
    /* @__PURE__ */ r(xa, { children: l.label }),
    /* @__PURE__ */ r(Cw, { children: /* @__PURE__ */ r(ya, { children: La(
      e,
      t,
      $a(e, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Tt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function dr({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(pe, { variant: s, children: [
    /* @__PURE__ */ r(ke, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(z, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r($s, {}) }) }),
    /* @__PURE__ */ r(te, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(so, { children: [
      /* @__PURE__ */ r(va, { children: /* @__PURE__ */ r(Rt, { children: La(t.groups, t.items, c, e) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Fe, {})
    ] }, c)) })
  ] });
}
const ja = b.forwardRef(
  ({ id: e, className: t, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,
      id: e,
      children: n
    }
  )
);
function jp({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: t,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ d(ja, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      dr,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(Ls, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        dr,
        {
          onSelectMenuItem: t,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(js, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Vp({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(ja, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ r(
    dr,
    {
      onSelectMenuItem: e,
      menuData: t,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Va = b.forwardRef(({ className: e, ...t }, n) => {
  const o = bt();
  return /* @__PURE__ */ r(
    Dt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: o
    }
  );
});
Va.displayName = Dt.List.displayName;
const za = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Dt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
za.displayName = Dt.List.displayName;
const Kc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Dt.Trigger,
  {
    ref: n,
    ...t,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Ba = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Dt.Content,
  {
    ref: n,
    className: h(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Ba.displayName = Dt.Content.displayName;
function zp({
  tabList: e,
  searchValue: t,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ d("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Dr,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ d(Va, { children: [
      /* @__PURE__ */ r(za, { children: e.map((l) => /* @__PURE__ */ r(Kc, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ r(Ba, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Hc({ ...e }) {
  return /* @__PURE__ */ r(rt.Menu, { ...e });
}
function Yc({ ...e }) {
  return /* @__PURE__ */ r(rt.Sub, { "data-slot": "menubar-sub", ...e });
}
const Fa = b.forwardRef(({ className: e, variant: t = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Rr.Provider, { value: a, children: /* @__PURE__ */ r(
    rt.Root,
    {
      ref: o,
      className: h(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...n
    }
  ) });
});
Fa.displayName = rt.Root.displayName;
const Ga = b.forwardRef(({ className: e, ...t }, n) => {
  const o = qt();
  return /* @__PURE__ */ r(
    rt.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        ae({ variant: o.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
Ga.displayName = rt.Trigger.displayName;
const Ua = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = qt();
  return /* @__PURE__ */ d(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        ae({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(En, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ua.displayName = rt.SubTrigger.displayName;
const qa = b.forwardRef(({ className: e, ...t }, n) => {
  const o = qt();
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
        e
      ),
      ...t
    }
  );
});
qa.displayName = rt.SubContent.displayName;
const Ka = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = qt();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
    {
      ref: s,
      align: t,
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
        e
      ),
      ...a
    }
  ) });
});
Ka.displayName = rt.Content.displayName;
const Ha = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = qt();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        ae({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
Ha.displayName = rt.Item.displayName;
const Xc = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = qt();
  return /* @__PURE__ */ d(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Xc.displayName = rt.CheckboxItem.displayName;
const Wc = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = qt();
  return /* @__PURE__ */ d(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ae({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Wc.displayName = rt.RadioItem.displayName;
const Jc = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
Jc.displayName = rt.Label.displayName;
const Ya = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Ya.displayName = rt.Separator.displayName;
const qe = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var o;
      (o = e.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Xa = (e, t, n, o) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((w) => w.group === s).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        Ha,
        {
          onClick: () => {
            o(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ r(kn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ r(kn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ d(Yc, { children: [
        /* @__PURE__ */ r(Ua, { children: w.label }),
        /* @__PURE__ */ r(qa, { children: Xa(
          e,
          t,
          $a(e, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(Tt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ r(Ya, {}, `separator-${s}`)), c;
  });
};
function Zc({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: o
}) {
  const a = Y(void 0), s = Y(void 0), i = Y(void 0), l = Y(void 0), c = Y(void 0), w = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Ki(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, m) => {
    var g, v, x, N;
    p.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        qe(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), qe(s, [f, u]);
        break;
      case "alt+l":
        (v = i.current) == null || v.focus(), qe(i, [f, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), qe(l, [f, u]);
        break;
      case "alt+h":
        (N = c.current) == null || N.focus(), qe(c, [f, u]);
        break;
    }
  }), G(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ r(Fa, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(e.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, m]) => typeof p == "boolean" || typeof m == "boolean" ? 0 : p.order - m.order).map(([p, m]) => /* @__PURE__ */ d(Hc, { children: [
      /* @__PURE__ */ r(Ga, { ref: w(p), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        Ka,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(Rt, { children: Xa(e.groups, e.items, p, t) })
        }
      )
    ] }, p)) });
}
function Bp(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Fp({
  menuData: e,
  onOpenChange: t,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const p = Y(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ r(
                    Zc,
                    {
                      menuData: e,
                      onOpenChange: t,
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
                children: s
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
const Qc = (e, t) => e[t] ?? t;
function Gp({
  knownUiLanguages: e,
  primaryLanguage: t = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: c
}) {
  const w = Qc(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, m] = M(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((v) => v !== g)]), s && n.find((v) => v === g) && s([...n.filter((v) => v !== g)]), m(!1);
  }, u = (g, v) => {
    var N, _, E, C, L, V;
    const x = v !== g ? ((_ = (N = e[g]) == null ? void 0 : N.uiNames) == null ? void 0 : _[v]) ?? ((C = (E = e[g]) == null ? void 0 : E.uiNames) == null ? void 0 : C.en) : void 0;
    return x ? `${(L = e[g]) == null ? void 0 : L.autonym} (${x})` : (V = e[g]) == null ? void 0 : V.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Ae,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: f,
        open: p,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(
            Ce,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ r(Vt, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ft, { className: "tw-font-normal tw-text-muted-foreground", children: ve(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function td({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ r(ft, { children: t(e) }) : n ? /* @__PURE__ */ r(ft, { children: n(e) }) : /* @__PURE__ */ r(ft, { children: e });
}
function Up({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: e, className: t, children: n.map((l) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Sr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      td,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function qp({
  cardKey: e,
  isSelected: t,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  selectedButtons: l,
  hoverButtons: c,
  dropdownContent: w,
  additionalSelectedContent: p,
  accentColor: m,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": t,
      className: h(
        "tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !t },
        { "tw-bg-accent": t },
        { "tw-bg-transparent": !t },
        s
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            t && l,
            !t && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: c }),
            !t && f && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ d(pe, { children: [
              /* @__PURE__ */ r(ke, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r($r, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] }) }),
            t && w && /* @__PURE__ */ d(pe, { children: [
              /* @__PURE__ */ r(ke, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r($r, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] })
          ] }),
          t && p && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: p })
        ] }),
        m && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`
          }
        )
      ]
    },
    e
  );
}
const ed = an(({ className: e, ...t }, n) => /* @__PURE__ */ r(Vs, { size: 35, className: h("tw-animate-spin", e), ...t, ref: n }));
ed.displayName = "Spinner";
function Kp({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: p,
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ft,
      {
        htmlFor: e,
        className: h({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Ge,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: h(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const nd = ue(
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
), rd = b.forwardRef(({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      nd({ variant: t }),
      e
    ),
    ...n
  }
));
rd.displayName = "Alert";
const od = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "h5",
    {
      ref: n,
      className: h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
od.displayName = "AlertTitle";
const ad = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
ad.displayName = "AlertDescription";
const Hp = ot.Root, Yp = ot.Trigger, Xp = ot.Group, Wp = ot.Portal, Jp = ot.Sub, Zp = ot.RadioGroup, sd = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => /* @__PURE__ */ d(
  ot.SubTrigger,
  {
    ref: a,
    className: h(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      t && "tw-pl-8",
      e
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(En, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
sd.displayName = ot.SubTrigger.displayName;
const id = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ot.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
id.displayName = ot.SubContent.displayName;
const ld = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
  ot.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
ld.displayName = ot.Content.displayName;
const wd = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  ot.Item,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
wd.displayName = ot.Item.displayName;
const cd = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => /* @__PURE__ */ d(
  ot.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Gt, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
cd.displayName = ot.CheckboxItem.displayName;
const dd = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  ot.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
dd.displayName = ot.RadioItem.displayName;
const pd = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: h(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
pd.displayName = ot.Label.displayName;
const ud = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
ud.displayName = ot.Separator.displayName;
function md({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
md.displayName = "ContextMenuShortcut";
const Wa = b.createContext({
  direction: "bottom"
});
function fd({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ r(Wa.Provider, { value: o, children: /* @__PURE__ */ r(
    Ut.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
fd.displayName = "Drawer";
const Qp = Ut.Trigger, hd = Ut.Portal, tu = Ut.Close, Ja = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ut.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
Ja.displayName = Ut.Overlay.displayName;
const gd = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(Wa), i = {
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
  return /* @__PURE__ */ d(hd, { children: [
    /* @__PURE__ */ r(Ja, {}),
    /* @__PURE__ */ d(
      Ut.Content,
      {
        ref: a,
        className: h(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          e
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: l[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: t }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: l[s] })
        ]
      }
    )
  ] });
});
gd.displayName = "DrawerContent";
function bd({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
bd.displayName = "DrawerHeader";
function vd({ className: e, ...t }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
vd.displayName = "DrawerFooter";
const xd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ut.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
xd.displayName = Ut.Title.displayName;
const yd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ut.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
yd.displayName = Ut.Description.displayName;
const Nd = b.forwardRef(({ className: e, value: t, ...n }, o) => /* @__PURE__ */ r(
  tr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ r(
      tr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
Nd.displayName = tr.Root.displayName;
function eu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    fr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const nu = fr.Panel;
function ru({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ r(
    fr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(zs, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function ou({ ...e }) {
  return /* @__PURE__ */ r(
    Hi,
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
      ...e
    }
  );
}
const kd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = bt();
  return /* @__PURE__ */ d(
    Ke.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: o,
      children: [
        /* @__PURE__ */ r(Ke.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Ke.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Ke.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
kd.displayName = Ke.Root.displayName;
const _d = b.forwardRef(({ className: e, ...t }, n) => {
  const o = bt();
  return /* @__PURE__ */ r(
    er.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ r(
        er.Thumb,
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
_d.displayName = er.Root.displayName;
const au = Dt.Root, Cd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = bt();
  return /* @__PURE__ */ r(
    Dt.List,
    {
      ref: n,
      className: h(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...t,
      dir: o
    }
  );
});
Cd.displayName = Dt.List.displayName;
const Ed = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Dt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Ed.displayName = Dt.Trigger.displayName;
const Rd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Dt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Rd.displayName = Dt.Content.displayName;
const Td = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: h(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        e
      ),
      ref: n,
      ...t
    }
  )
);
Td.displayName = "Textarea";
const su = (e, t) => {
  G(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function Sd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Dd = (e, t, n = {}) => {
  const o = Y(t);
  o.current = t;
  const a = Y(n);
  a.current = Sd(a.current);
  const [s, i] = M(() => o.current), [l, c] = M(!0);
  return G(() => {
    let w = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        w && (i(() => p), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [e]), [s, l];
}, Yn = () => !1, iu = (e, t) => {
  const [n] = Dd(
    U(async () => {
      if (!e) return Yn;
      const o = await Promise.resolve(e(t));
      return async () => o();
    }, [t, e]),
    Yn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  G(() => () => {
    n !== Yn && n();
  }, [n]);
};
function lu(e) {
  G(() => {
    let t;
    return e && (t = document.createElement("style"), t.appendChild(document.createTextNode(e)), document.head.appendChild(t)), () => {
      t && document.head.removeChild(t);
    };
  }, [e]);
}
function Md(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Md(`*, ::before, ::after {
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
.tw-min-w-\\[500px\\] {
  min-width: 500px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.tw-grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
.tw-bg-accent\\/50 {
  background-color: hsl(var(--accent) / 0.5);
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
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
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
.tw-text-\\[10px\\] {
  font-size: 10px;
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
.tw-tracking-wider {
  letter-spacing: 0.05em;
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

  .sm\\:tw-grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
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

  .md\\:tw-grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
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
  rd as Alert,
  ad as AlertDescription,
  od as AlertTitle,
  ga as Avatar,
  ba as AvatarFallback,
  _w as AvatarImage,
  rp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  op as BOOK_SELECTOR_STRING_KEYS,
  ce as Badge,
  np as BookChapterControl,
  rr as BookSelectionMode,
  ap as BookSelector,
  z as Button,
  wp as COMMENT_EDITOR_STRING_KEYS,
  cp as COMMENT_LIST_STRING_KEYS,
  fa as Card,
  ha as CardContent,
  Nw as CardDescription,
  kw as CardFooter,
  xw as CardHeader,
  yw as CardTitle,
  ll as ChapterRangeSelector,
  Sr as Checkbox,
  Up as Checklist,
  nr as ComboBox,
  ne as Command,
  Zi as CommandDialog,
  Be as CommandEmpty,
  Ee as CommandGroup,
  ze as CommandInput,
  me as CommandItem,
  re as CommandList,
  ol as CommandNavigator,
  lp as CommentEditor,
  dp as CommentList,
  Hp as ContextMenu,
  cd as ContextMenuCheckboxItem,
  ld as ContextMenuContent,
  Xp as ContextMenuGroup,
  wd as ContextMenuItem,
  pd as ContextMenuLabel,
  Wp as ContextMenuPortal,
  Zp as ContextMenuRadioGroup,
  dd as ContextMenuRadioItem,
  ud as ContextMenuSeparator,
  md as ContextMenuShortcut,
  Jp as ContextMenuSub,
  id as ContextMenuSubContent,
  sd as ContextMenuSubTrigger,
  Yp as ContextMenuTrigger,
  Fw as DataTable,
  fd as Drawer,
  tu as DrawerClose,
  gd as DrawerContent,
  yd as DrawerDescription,
  vd as DrawerFooter,
  bd as DrawerHeader,
  Ja as DrawerOverlay,
  hd as DrawerPortal,
  xd as DrawerTitle,
  Qp as DrawerTrigger,
  pe as DropdownMenu,
  Zt as DropdownMenuCheckboxItem,
  te as DropdownMenuContent,
  va as DropdownMenuGroup,
  Nn as DropdownMenuItem,
  qw as DropdownMenuItemType,
  ln as DropdownMenuLabel,
  Cw as DropdownMenuPortal,
  Rw as DropdownMenuRadioGroup,
  Na as DropdownMenuRadioItem,
  Fe as DropdownMenuSeparator,
  Tw as DropdownMenuShortcut,
  Ew as DropdownMenuSub,
  ya as DropdownMenuSubContent,
  xa as DropdownMenuSubTrigger,
  ke as DropdownMenuTrigger,
  Gw as ERROR_DUMP_STRING_KEYS,
  up as ERROR_POPOVER_STRING_KEYS,
  Ww as EditorKeyboardShortcuts,
  Uw as ErrorDump,
  mp as ErrorPopover,
  xp as FOOTNOTE_EDITOR_STRING_KEYS,
  bp as Filter,
  fp as FilterDropdown,
  gp as Footer,
  vp as FootnoteEditor,
  dc as FootnoteItem,
  yp as FootnoteList,
  Tp as INVENTORY_STRING_KEYS,
  Ge as Input,
  Sp as Inventory,
  ft as Label,
  nc as MARKER_MENU_STRING_KEYS,
  pp as MarkdownRenderer,
  oc as MarkerMenu,
  hp as MoreInfo,
  Hw as MultiSelectComboBox,
  zp as NavigationContentSearch,
  fe as Popover,
  sl as PopoverAnchor,
  oe as PopoverContent,
  Re as PopoverTrigger,
  Nd as Progress,
  br as RadioGroup,
  vn as RadioGroupItem,
  sp as RecentSearches,
  ru as ResizableHandle,
  nu as ResizablePanel,
  eu as ResizablePanelGroup,
  qp as ResultsCard,
  Op as SCOPE_SELECTOR_STRING_KEYS,
  Ip as ScopeSelector,
  Mp as ScriptureResultsViewer,
  Ap as ScrollGroupSelector,
  Dr as SearchBar,
  Ae as Select,
  Ce as SelectContent,
  Mw as SelectGroup,
  Vt as SelectItem,
  Iw as SelectLabel,
  _a as SelectScrollDownButton,
  ka as SelectScrollUpButton,
  Aw as SelectSeparator,
  _e as SelectTrigger,
  Pe as SelectValue,
  Ie as Separator,
  Pp as SettingsList,
  Lp as SettingsListHeader,
  $p as SettingsListItem,
  Pc as SettingsSidebar,
  Dp as SettingsSidebarContentSearch,
  Ta as Sidebar,
  Da as SidebarContent,
  Cc as SidebarFooter,
  lr as SidebarGroup,
  Rc as SidebarGroupAction,
  cr as SidebarGroupContent,
  wr as SidebarGroupLabel,
  _c as SidebarHeader,
  kc as SidebarInput,
  Sa as SidebarInset,
  Ma as SidebarMenu,
  Sc as SidebarMenuAction,
  Dc as SidebarMenuBadge,
  Ia as SidebarMenuButton,
  Oa as SidebarMenuItem,
  Mc as SidebarMenuSkeleton,
  Oc as SidebarMenuSub,
  Ac as SidebarMenuSubButton,
  Ic as SidebarMenuSubItem,
  Ra as SidebarProvider,
  Nc as SidebarRail,
  Ec as SidebarSeparator,
  yc as SidebarTrigger,
  ir as Skeleton,
  kd as Slider,
  ou as Sonner,
  ed as Spinner,
  _d as Switch,
  dr as TabDropdownMenu,
  Vp as TabFloatingMenu,
  jp as TabToolbar,
  Mn as Table,
  In as TableBody,
  Bw as TableCaption,
  ye as TableCell,
  Lw as TableFooter,
  on as TableHead,
  On as TableHeader,
  Jt as TableRow,
  au as Tabs,
  Rd as TabsContent,
  Cd as TabsList,
  Ed as TabsTrigger,
  Kp as TextField,
  Td as Textarea,
  _r as ToggleGroup,
  Ze as ToggleGroupItem,
  Fp as Toolbar,
  Pt as Tooltip,
  Tt as TooltipContent,
  Rt as TooltipProvider,
  $t as TooltipTrigger,
  Yw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Gp as UiLanguageSelector,
  Xw as UndoRedoButtons,
  Va as VerticalTabs,
  Ba as VerticalTabsContent,
  za as VerticalTabsList,
  Kc as VerticalTabsTrigger,
  tl as badgeVariants,
  Go as buttonVariants,
  h as cn,
  Rp as getBookIdFromUSFM,
  An as getInventoryHeader,
  Cp as getLinesFromUSFM,
  Ep as getNumberFromUSFM,
  hc as getStatusForItem,
  Bp as getToolbarOSReservedSpaceClassName,
  kp as inventoryCountColumn,
  Np as inventoryItemColumn,
  _p as inventoryStatusColumn,
  Ow as selectTriggerVariants,
  du as sonner,
  su as useEvent,
  iu as useEventAsync,
  vw as useListbox,
  Dd as usePromise,
  ip as useRecentSearches,
  Pn as useSidebar,
  lu as useStylesheet
};
//# sourceMappingURL=index.js.map
