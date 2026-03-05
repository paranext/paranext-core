var es = Object.defineProperty;
var ns = (t, e, n) => e in t ? es(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => ns(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as d, Fragment as ct } from "react/jsx-runtime";
import b, { forwardRef as nn, useRef as X, useMemo as F, useState as T, useCallback as G, useLayoutEffect as Wt, createContext as kn, useContext as dr, useEffect as q, Component as rs, createElement as Ar, Suspense as os, Fragment as lo } from "react";
import { Command as kt } from "cmdk";
import { X as Ae, Search as wo, Check as Lt, Clock as Pr, ChevronsLeft as $r, ChevronsRight as Lr, ChevronLeft as Hn, ChevronRight as Re, ArrowLeft as as, ArrowRight as ss, Circle as _n, ChevronDown as Pe, BoldIcon as is, ItalicIcon as ls, AtSign as co, Pencil as ws, Trash2 as cs, ArrowUp as po, MoreHorizontal as uo, MailOpen as ds, Mail as ps, ChevronUp as mo, FilterIcon as us, ArrowLeftIcon as ms, ChevronLeftIcon as fs, ChevronRightIcon as hs, ArrowRightIcon as gs, Copy as fo, Filter as bs, User as vs, Link as xs, CircleHelp as ys, ChevronsUpDown as ho, Star as Ns, SquareX as go, FunctionSquare as bo, SquareSigma as vo, Ban as ks, AlertCircle as Yn, CircleCheckIcon as _s, CircleXIcon as Cs, CircleHelpIcon as Es, ArrowUpIcon as Rs, ArrowDownIcon as Ts, PanelLeft as Ss, PanelRight as Ds, ScrollText as Ms, MenuIcon as Os, Menu as Is, EllipsisVertical as As, LoaderCircle as Ps, GripVertical as $s } from "lucide-react";
import { clsx as Ls } from "clsx";
import { extendTailwindMerge as Vs } from "tailwind-merge";
import * as $t from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as ln, Section as U, getChaptersForBook as js, formatScrRef as ge, getSectionForBook as Ue, formatRelativeDate as zs, formatReplacementString as he, sanitizeHtml as Fs, NumberFormat as Bs, formatBytes as Gs, getCurrentLocale as Ks, usfmMarkers as un, getFormatCallerFunction as qs, deepEqual as Us, isString as Vr, compareScrRefs as Xn, scrRefToBBBCCCVVV as An, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as $e } from "@radix-ui/react-slot";
import { cva as we } from "class-variance-authority";
import * as Te from "@radix-ui/react-popover";
import * as xo from "@radix-ui/react-label";
import * as Je from "@radix-ui/react-radio-group";
import { createEditor as yo, $getRoot as se, $createParagraphNode as Cn, $getSelection as Jt, HISTORY_MERGE_TAG as pr, ParagraphNode as No, TextNode as ko, $isTokenOrSegmented as Hs, $getCharacterOffsets as Ys, $cloneWithPropertiesEphemeral as Xs, $findMatchingParent as Ws, $isElementNode as be, CLEAR_EDITOR_COMMAND as _o, COMMAND_PRIORITY_EDITOR as Co, $isRangeSelection as Ze, mergeRegister as ie, shallowMergeConfig as Js, defineExtension as Qt, safeCast as rn, RootNode as Zs, LineBreakNode as Qs, TabNode as ti, $isEditorState as ei, createCommand as ni, CLICK_COMMAND as ri, isDOMNode as oi, $getNodeFromDOMNode as ai, $isNodeSelection as si, $createNodeSelection as ii, $setSelection as li, COMMAND_PRIORITY_LOW as wi, DecoratorNode as ci, addClassNamesToElement as Eo, $create as di, $getNodeByKey as pi, removeClassNamesFromElement as ui, KEY_TAB_COMMAND as mi, $isBlockElementNode as hn, $createRangeSelection as fi, $normalizeSelection__EXPERIMENTAL as hi, OUTDENT_CONTENT_COMMAND as gi, INDENT_CONTENT_COMMAND as jr, INSERT_TAB_COMMAND as bi, COMMAND_PRIORITY_CRITICAL as ur, $isDecoratorNode as vi, $isParagraphNode as xi, $isTextNode as gn, SELECTION_CHANGE_COMMAND as Ro, FORMAT_TEXT_COMMAND as yi, getRegisteredNode as Ni, isHTMLElement as ki, isDocumentFragment as zr, isDOMDocumentNode as _i, ArtificialNode__DO_NOT_USE as To, $createLineBreakNode as So, $isRootOrShadowRoot as Ci, isBlockDomNode as Fr, isInlineDomNode as Br, $insertNodes as Ei } from "lexical";
import * as Le from "@radix-ui/react-tooltip";
import { TooltipTrigger as Ri } from "@radix-ui/react-tooltip";
import { HeadingNode as Ti, QuoteNode as Si, registerRichText as Di } from "@lexical/rich-text";
import { flushSync as Mi, createPortal as Oi } from "react-dom";
import { $isTableSelection as Ii } from "@lexical/table";
import * as En from "@radix-ui/react-toggle-group";
import * as Do from "@radix-ui/react-toggle";
import { createHeadlessEditor as Mo } from "@lexical/headless";
import * as Oo from "@radix-ui/react-separator";
import * as Ve from "@radix-ui/react-avatar";
import * as ot from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ai } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Io, getFilteredRowModel as Pi, getSortedRowModel as Ao, getPaginationRowModel as $i, getCoreRowModel as Po, flexRender as He, getGroupedRowModel as Li, getExpandedRowModel as Vi } from "@tanstack/react-table";
import * as lt from "@radix-ui/react-select";
import ji from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Wn, HIDDEN_NOTE_CALLER as Jn, getDefaultViewOptions as zi, isInsertEmbedOpOfType as wn, Editorial as Fi } from "@eten-tech-foundation/platform-editor";
import * as Zn from "@radix-ui/react-checkbox";
import * as _t from "@radix-ui/react-tabs";
import * as at from "@radix-ui/react-menubar";
import { useHotkeys as Bi } from "react-hotkeys-hook";
import * as st from "@radix-ui/react-context-menu";
import { Drawer as Vt } from "vaul";
import * as Qn from "@radix-ui/react-progress";
import * as mr from "react-resizable-panels";
import { Toaster as Gi } from "sonner";
import { toast as ru } from "sonner";
import * as qe from "@radix-ui/react-slider";
import * as tr from "@radix-ui/react-switch";
const Ki = Vs({ prefix: "tw-" });
function m(...t) {
  return Ki(Ls(t));
}
const qi = "layoutDirection";
function ft() {
  const t = localStorage.getItem(qi);
  return t === "rtl" ? t : "ltr";
}
const Ui = $t.Root, Hi = $t.Portal, $o = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Overlay,
  {
    ref: n,
    className: m(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
$o.displayName = $t.Overlay.displayName;
const Lo = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ft();
  return /* @__PURE__ */ d(Hi, { children: [
    /* @__PURE__ */ r($o, {}),
    /* @__PURE__ */ d(
      $t.Content,
      {
        ref: o,
        className: m(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ d(
            $t.Close,
            {
              className: m(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ae, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Lo.displayName = $t.Content.displayName;
function Vo({ className: t, ...e }) {
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
Vo.displayName = "DialogHeader";
const jo = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
jo.displayName = $t.Title.displayName;
const Yi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Yi.displayName = $t.Description.displayName;
const te = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt,
  {
    ref: n,
    className: m(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
te.displayName = kt.displayName;
const je = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(wo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      kt.Input,
      {
        ref: n,
        className: m(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
je.displayName = kt.Input.displayName;
const ee = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.List,
  {
    ref: n,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ee.displayName = kt.List.displayName;
const on = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
on.displayName = kt.Empty.displayName;
const Zt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Group,
  {
    ref: n,
    className: m(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Zt.displayName = kt.Group.displayName;
const zo = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
zo.displayName = kt.Separator.displayName;
const Gt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Item,
  {
    ref: n,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Gt.displayName = kt.Item.displayName;
function Fo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Fo.displayName = "CommandShortcut";
const Bo = (t, e, n, o, a) => {
  switch (t) {
    case U.OT:
      return e ?? "Old Testament";
    case U.NT:
      return n ?? "New Testament";
    case U.DC:
      return o ?? "Deuterocanon";
    case U.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Xi = (t, e, n, o, a) => {
  switch (t) {
    case U.OT:
      return e ?? "OT";
    case U.NT:
      return n ?? "NT";
    case U.DC:
      return o ?? "DC";
    case U.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ee(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function fr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Go = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), ve = Object.fromEntries(
  Go.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function hr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = wt.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(ln(a.toLowerCase(), o) || ln(t.toLowerCase(), o) || (i ? ln(i.localizedName.toLowerCase(), o) || ln(i.localizedId.toLowerCase(), o) : !1));
}
const Ko = nn(
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
    const p = X(!1), u = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (x) => {
      p.current = !0, o ? o(x) : n == null || n(t);
    }, f = F(
      () => Ee(t, l),
      [t, l]
    ), g = F(
      () => fr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === U.OT,
            "tw-border-s-purple-200": a === U.NT,
            "tw-border-s-indigo-200": a === U.DC,
            "tw-border-s-amber-200": a === U.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          Gt,
          {
            ref: w,
            value: c || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${wt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Lt,
                {
                  className: m(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: f }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), qo = we(
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
), B = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? $e : "button", { className: m(qo({ variant: e, size: n, className: t })), ref: i, ...a })
);
B.displayName = "Button";
const ne = Te.Root, ce = Te.Trigger, Wi = Te.Anchor, Kt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(Te.Portal, { children: /* @__PURE__ */ r(
    Te.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: m(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      dir: i
    }
  ) });
});
Kt.displayName = Te.Content.displayName;
function er(t, e, n) {
  return `${t} ${ve[t]}${e ? ` ${fr(t, e)} ${Ee(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Ji({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (c) => String(c),
  getItemKey: o = (c) => String(c),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l
}) {
  const [c, w] = T(!1);
  if (t.length === 0)
    return;
  const p = (u) => {
    e(u), w(!1);
  };
  return /* @__PURE__ */ d(ne, { open: c, onOpenChange: w, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ r(
      B,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(Pr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Kt, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(Zt, { heading: i, children: t.map((u) => /* @__PURE__ */ d(
      Gt,
      {
        onSelect: () => p(u),
        className: m("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Pr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function Xd(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Pn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Zi = [
  Pn.BOOK_ONLY,
  Pn.BOOK_CHAPTER,
  Pn.BOOK_CHAPTER_VERSE
];
function Gr(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Bt(t) {
  return js(wt.bookIdToNumber(t));
}
function Qi(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Zi.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let p;
        const u = e.filter((h) => hr(h, l, n));
        if (u.length === 1 && ([p] = u), !p && c) {
          if (wt.isBookIdValid(l)) {
            const h = l.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && c) {
          const f = ((g) => Object.keys(ve).find(
            (x) => ve[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (f && e.includes(f) && (p = f), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > Bt(p) && (h = Math.max(Bt(p), 1));
          const f = w ? parseInt(w, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function tl(t, e, n, o) {
  const a = G(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const w = e[c - 1], p = Math.max(Bt(w), 1);
        o({
          book: w,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = G(() => {
    const c = Bt(t.book);
    if (t.chapterNum < c)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w < e.length - 1) {
        const p = e[w + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = G(() => {
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
  return F(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? $r : Lr
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Hn : Re
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Re : Hn
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Bt(t.book) || Bt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Lr : $r
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
function Kr({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Bt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      Gt,
      {
        value: `${t} ${ve[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: m(
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
function Wd({
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
  const w = ft(), [p, u] = T(!1), [h, f] = T(""), [g, x] = T(""), [v, y] = T("books"), [N, _] = T(void 0), [k, z] = T(!1), L = X(void 0), R = X(void 0), $ = X(void 0), C = X(void 0), S = X({}), V = G(
    (E) => {
      e(E), l && l(E);
    },
    [e, l]
  ), j = F(() => o ? o() : Go, [o]), I = F(() => ({
    [U.OT]: j.filter((Y) => wt.isBookOT(Y)),
    [U.NT]: j.filter((Y) => wt.isBookNT(Y)),
    [U.DC]: j.filter((Y) => wt.isBookDC(Y)),
    [U.Extra]: j.filter((Y) => wt.extraBooks().includes(Y))
  }), [j]), A = F(() => Object.values(I).flat(), [I]), H = F(() => {
    if (!g.trim()) return I;
    const E = {
      [U.OT]: [],
      [U.NT]: [],
      [U.DC]: [],
      [U.Extra]: []
    };
    return [U.OT, U.NT, U.DC, U.Extra].forEach((nt) => {
      E[nt] = I[nt].filter((rt) => hr(rt, g, a));
    }), E;
  }, [I, g, a]), M = F(
    () => Qi(g, A, a),
    [g, A, a]
  ), W = G(() => {
    M && (V({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), u(!1), x(""), f(""));
  }, [V, M]), Ct = G(
    (E) => {
      if (Bt(E) <= 1) {
        V({
          book: E,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), x("");
        return;
      }
      _(E), y("chapters");
    },
    [V]
  ), Dt = G(
    (E) => {
      const Y = v === "chapters" ? N : M == null ? void 0 : M.book;
      Y && (V({
        book: Y,
        chapterNum: E,
        verseNum: 1
      }), u(!1), y("books"), _(void 0), x(""));
    },
    [V, v, N, M]
  ), Mt = G(
    (E) => {
      V(E), u(!1), x("");
    },
    [V]
  ), dt = tl(t, A, w, e), P = G(() => {
    y("books"), _(void 0), setTimeout(() => {
      R.current && R.current.focus();
    }, 0);
  }, []), D = G(
    (E) => {
      if (!E && v === "chapters") {
        P();
        return;
      }
      u(E), E && (y("books"), _(void 0), x(""));
    },
    [v, P]
  ), { otLong: K, ntLong: Z, dcLong: Q, extraLong: it } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, xt = G(
    (E) => Bo(E, K, Z, Q, it),
    [K, Z, Q, it]
  ), pt = G(
    (E) => M ? !!M.chapterNum && !E.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), yt = F(
    () => ge(
      t,
      a ? Ee(t.book, a) : "English"
    ),
    [t, a]
  ), Ot = G((E) => (Y) => {
    S.current[E] = Y;
  }, []), ht = G((E) => {
    (E.key === "Home" || E.key === "End") && E.stopPropagation();
  }, []), gt = G(
    (E) => {
      if (E.ctrlKey) return;
      const { isLetter: Y, isDigit: nt } = Gr(E.key);
      if (v === "chapters") {
        if (E.key === "Backspace") {
          E.preventDefault(), E.stopPropagation(), P();
          return;
        }
        if (Y || nt) {
          if (E.preventDefault(), E.stopPropagation(), y("books"), _(void 0), nt && N) {
            const rt = ve[N];
            x(`${rt} ${E.key}`);
          } else
            x(E.key);
          setTimeout(() => {
            R.current && R.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(E.key)) {
        const rt = v === "chapters" ? N : M == null ? void 0 : M.book;
        if (!rt) return;
        const ut = (() => {
          if (!h) return 1;
          const pe = h.match(/(\d+)$/);
          return pe ? parseInt(pe[1], 10) : 0;
        })(), Ht = Bt(rt);
        if (!Ht) return;
        let Nt = ut;
        const sn = 6;
        switch (E.key) {
          case "ArrowLeft":
            ut !== 0 && (Nt = ut > 1 ? ut - 1 : Ht);
            break;
          case "ArrowRight":
            ut !== 0 && (Nt = ut < Ht ? ut + 1 : 1);
            break;
          case "ArrowUp":
            Nt = ut === 0 ? Ht : Math.max(1, ut - sn);
            break;
          case "ArrowDown":
            Nt = ut === 0 ? 1 : Math.min(Ht, ut + sn);
            break;
          default:
            return;
        }
        Nt !== ut && (E.preventDefault(), E.stopPropagation(), f(er(rt, a, Nt)), setTimeout(() => {
          const pe = S.current[Nt];
          pe && pe.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      M,
      P,
      N,
      h,
      a
    ]
  ), Ut = G((E) => {
    if (E.shiftKey || E.key === "Tab" || E.key === " ") return;
    const { isLetter: Y, isDigit: nt } = Gr(E.key);
    (Y || nt) && (E.preventDefault(), x((rt) => rt + E.key), R.current.focus(), z(!1));
  }, []);
  return Wt(() => {
    const E = setTimeout(() => {
      if (p && v === "books" && $.current && C.current) {
        const Y = $.current, nt = C.current, rt = nt.offsetTop, ut = Y.clientHeight, Ht = nt.clientHeight, Nt = rt - ut / 2 + Ht / 2;
        Y.scrollTo({
          top: Math.max(0, Nt),
          behavior: "smooth"
        }), f(er(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(E);
    };
  }, [p, v, g, M, t.book]), Wt(() => {
    if (v === "chapters" && N) {
      const E = N === t.book;
      setTimeout(() => {
        if ($.current)
          if (E) {
            const Y = S.current[t.chapterNum];
            Y && Y.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            $.current.scrollTo({ top: 0 });
        L.current && L.current.focus();
      }, 0);
    }
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ d(ne, { open: p, onOpenChange: D, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ r(
      B,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: m(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: yt })
      }
    ) }),
    /* @__PURE__ */ r(Kt, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      te,
      {
        ref: L,
        onKeyDown: gt,
        loop: !0,
        value: h,
        onValueChange: f,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                je,
                {
                  ref: R,
                  value: g,
                  onValueChange: x,
                  onKeyDown: ht,
                  onFocus: () => z(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Ji,
                {
                  recentSearches: s,
                  onSearchItemSelect: Mt,
                  renderItem: (E) => ge(E, "English"),
                  getItemKey: (E) => `${E.book}-${E.chapterNum}-${E.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: dt.map(({ onClick: E, disabled: Y, title: nt, icon: rt }) => /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  z(!0), E();
                },
                disabled: Y,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: nt,
                onKeyDown: Ut,
                children: /* @__PURE__ */ r(rt, {})
              },
              nt
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: P,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(as, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(ss, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Ee(N, a) })
          ] }),
          !k && /* @__PURE__ */ d(ee, { ref: $, children: [
            v === "books" && /* @__PURE__ */ d(ct, { children: [
              !M && Object.entries(H).map(([E, Y]) => {
                if (Y.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Zt, { heading: xt(E), children: Y.map((nt) => /* @__PURE__ */ r(
                      Ko,
                      {
                        bookId: nt,
                        onSelect: (rt) => Ct(rt),
                        section: Ue(nt),
                        commandValue: `${nt} ${ve[nt]}`,
                        ref: nt === t.book ? C : void 0,
                        localizedBookNames: a
                      },
                      nt
                    )) }, E)
                  );
              }),
              M && /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(
                Gt,
                {
                  value: `${M.book} ${ve[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: W,
                  className: "tw-font-semibold tw-text-primary",
                  children: ge(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? fr(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && Bt(M.book) > 1 && /* @__PURE__ */ d(ct, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Ee(M.book, a) }),
                /* @__PURE__ */ r(
                  Kr,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Dt,
                    setChapterRef: Ot,
                    isChapterDimmed: pt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && N && /* @__PURE__ */ r(
              Kr,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: Dt,
                setChapterRef: Ot,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Jd = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), el = we(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), mt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(xo.Root, { ref: n, className: m("pr-twp", el(), t), ...e }));
mt.displayName = xo.Root.displayName;
const gr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    Je.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
gr.displayName = Je.Root.displayName;
const bn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je.Item,
  {
    ref: n,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Je.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(_n, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
bn.displayName = Je.Item.displayName;
function nl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function nr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: i,
  onChange: s = () => {
  },
  getOptionLabel: l = nl,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: u = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...y
}) {
  const [N, _] = T(!1), k = c ?? l, z = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], L = (R, $) => {
    const C = l(R), S = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, V = `${$ ?? ""}${C}${S ?? ""}`;
    return /* @__PURE__ */ d(
      Gt,
      {
        value: C,
        onSelect: () => {
          s(R), _(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Lt,
            {
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !i || l(i) !== C
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            C,
            S && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ d(ne, { open: N, onOpenChange: _, ...y, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ d(
      B,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": v,
        id: t,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? k(i) : p
              }
            )
          ] }),
          /* @__PURE__ */ r(Pe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Kt,
      {
        align: g,
        className: m("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(te, { children: [
          /* @__PURE__ */ r(je, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(on, { children: h }),
          /* @__PURE__ */ r(ee, { children: z(e) ? e.map((R) => /* @__PURE__ */ r(Zt, { heading: R.groupHeading, children: R.options.map(($) => L($, R.groupHeading)) }, R.groupHeading)) : e.map((R) => L(R)) })
        ] })
      }
    )
  ] });
}
function rl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = F(
    () => Array.from({ length: i }, (w, p) => p + 1),
    [i]
  );
  return /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ r(mt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      nr,
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
    /* @__PURE__ */ r(mt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      nr,
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
var ol = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(ol || {});
const Zd = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), $n = (t, e) => t[e] ?? e;
function Qd({
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
  const p = $n(w, "%webView_bookSelector_currentBook%"), u = $n(w, "%webView_bookSelector_choose%"), h = $n(w, "%webView_bookSelector_chooseBooks%"), [f, g] = T(
    "current book"
    /* CURRENT_BOOK */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    gr,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(bn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(mt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(mt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            rl,
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
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(bn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(mt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(mt, { className: "tw-flex tw-items-center", children: o.map((v) => wt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            B,
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
const Uo = kn(null);
function al(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function qt() {
  const t = dr(Uo);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Ho = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, sl = Ho ? Wt : q, cn = { tag: pr };
function il({ initialConfig: t, children: e }) {
  const n = F(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = al(null, o), p = yo({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (u) => s(u, p), theme: o });
    return function(u, h) {
      if (h !== null) {
        if (h === void 0) u.update(() => {
          const f = se();
          if (f.isEmpty()) {
            const g = Cn();
            f.append(g);
            const x = Ho ? document.activeElement : null;
            (Jt() !== null || x !== null && x === u.getRootElement()) && g.select();
          }
        }, cn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const f = u.parseEditorState(h);
            u.setEditorState(f, cn);
            break;
          }
          case "object":
            u.setEditorState(h, cn);
            break;
          case "function":
            u.update(() => {
              se().isEmpty() && h(u);
            }, cn);
        }
      }
    }(p, l), [p, w];
  }, []);
  return sl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(Uo.Provider, { value: n, children: e });
}
const ll = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : q;
function wl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = qt();
  return ll(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(pr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const br = {
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
}, Tt = Le.Provider, At = Le.Root, Pt = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Le.Trigger,
  {
    ref: o,
    className: e ? m(qo({ variant: e }), t) : t,
    ...n
  }
));
Pt.displayName = Le.Trigger.displayName;
const St = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  Le.Content,
  {
    ref: o,
    sideOffset: e,
    className: m(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
St.displayName = Le.Content.displayName;
const vr = [
  Ti,
  No,
  ko,
  Si
], cl = kn(null), Ln = {
  didCatch: !1,
  error: null
};
class dl extends rs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Ln;
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
      }), this.setState(Ln);
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
    if (o && n.error !== null && pl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Ln);
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
        l = Ar(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Ar(cl.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function pl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function ul({ children: t, onError: e }) {
  return r(dl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ml = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : q;
function fl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function hl() {
  return function(t) {
    const [e] = qt(), n = F(() => t(e), [e, t]), [o, a] = T(() => n.initialValueFn()), i = X(o);
    return ml(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(fl);
}
function gl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Hs(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), p = e.is(c);
    if (w || p) {
      const [u, h] = Ys(t), f = l.is(c), g = e.is(s ? c : l), x = e.is(s ? l : c);
      let v, y = 0;
      f ? (y = u > h ? h : u, v = u > h ? u : h) : g ? (y = s ? h : u, v = void 0) : x && (y = 0, v = s ? u : h);
      const N = e.__text.slice(y, v);
      N !== e.__text && (n === "clone" && (e = Xs(e)), e.__text = N);
    }
  }
  return e;
}
function bl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, vl = Yo && "documentMode" in document ? document.documentMode : null;
!(!Yo || !("InputEvent" in window) || vl) && "getTargetRanges" in new window.InputEvent("input");
function qr(t) {
  const e = Ws(t, (n) => be(n) && !n.isInline());
  return be(e) || bl(4, t.__key), e;
}
const xl = Symbol.for("preact-signals");
function Rn() {
  if (ae > 1) return void ae--;
  let t, e = !1;
  for (; Ye !== void 0; ) {
    let n = Ye;
    for (Ye = void 0, rr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && Xo(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (rr = 0, ae--, e) throw t;
}
function yl(t) {
  if (ae > 0) return t();
  ae++;
  try {
    return t();
  } finally {
    Rn();
  }
}
let J, Ye;
function Ur(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let ae = 0, rr = 0, mn = 0;
function Hr(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function vt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Qe(t, e) {
  return new vt(t, e);
}
function Xo(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Yr(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Wo(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function me(t, e) {
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = mn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Nl(t, e) {
  return new me(t, e);
}
function Jo(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    ae++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, xr(t), o;
    } finally {
      J = n, Rn();
    }
  }
}
function xr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Jo(t);
}
function kl(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  Wo(this), J = t, this.f &= -2, 8 & this.f && xr(this), Rn();
}
function Ce(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function le(t, e) {
  const n = new Ce(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Tn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = Qe(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
vt.prototype.brand = xl, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Ur(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Ur(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, vt.prototype.subscribe = function(t) {
  return le(() => {
    const e = this.value, n = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, vt.prototype.valueOf = function() {
  return this.value;
}, vt.prototype.toString = function() {
  return this.value + "";
}, vt.prototype.toJSON = function() {
  return this.value;
}, vt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(vt.prototype, "value", { get() {
  const t = Hr(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (rr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, mn++, ae++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Rn();
    }
  }
} }), me.prototype = new vt(), me.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === mn)) return !0;
  if (this.g = mn, this.f |= 1, this.i > 0 && !Xo(this)) return this.f &= -2, !0;
  const t = J;
  try {
    Yr(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, Wo(this), this.f &= -2, !0;
}, me.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  vt.prototype.S.call(this, t);
}, me.prototype.U = function(t) {
  if (this.t !== void 0 && (vt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, me.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(me.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Hr(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ce.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ce.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Jo(this), Yr(this), ae++;
  const t = J;
  return J = this, kl.bind(this, t);
}, Ce.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Ye, Ye = this);
}, Ce.prototype.d = function() {
  this.f |= 8, 1 & this.f || xr(this);
}, Ce.prototype.dispose = function() {
  this.d();
};
Qt({ build: (t, e, n) => Tn(e), config: rn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return le(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Zo() {
  const t = se(), e = Jt(), n = Cn();
  t.clear(), t.append(n), e !== null && n.select(), Ze(e) && (e.format = 0);
}
function Qo(t, e = Zo) {
  return t.registerCommand(_o, (n) => (t.update(e), !0), Co);
}
Qt({ build: (t, e, n) => Tn(e), config: rn({ $onClear: Zo }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return le(() => Qo(t, o.value));
} });
function _l(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
function ta(t, e) {
  let n;
  return Qe(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const or = Qt({ build: (t) => ta(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ea(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ea(n[a], o[a]);
    return t;
  }
  return e;
}
const yr = 0, ar = 1, na = 2, Vn = 3, dn = 4, _e = 5, jn = 6, Ge = 7;
function zn(t) {
  return t.id === yr;
}
function ra(t) {
  return t.id === na;
}
function Cl(t) {
  return function(e) {
    return e.id === ar;
  }(t) || et(305, String(t.id), String(ar)), Object.assign(t, { id: na });
}
const El = /* @__PURE__ */ new Set();
class Rl {
  constructor(e, n) {
    bt(this, "builder");
    bt(this, "configs");
    bt(this, "_dependency");
    bt(this, "_peerNameSet");
    bt(this, "extension");
    bt(this, "state");
    bt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: yr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Js;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    ra(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: Vn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: dn, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== dn && et(307, String(n.id), String(_e)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: _e, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== _e && et(308, String(o.id), String(_e));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: jn });
    }(o), () => {
      const i = this.state;
      i.id !== Ge && et(309, String(o.id), String(Ge)), this.state = function(s) {
        return Object.assign(s, { id: _e });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== jn && et(310, String(n.id), String(jn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ge });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= dn;
    }(e) || et(313, String(e.id), String(dn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Vn;
    }(e) || et(314, String(e.id), String(Vn)), { config: e.config };
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
      return n.id >= Ge;
    }(e) || et(316, String(e.id), String(Ge)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || El;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= _e;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Xr = { tag: pr };
function Tl() {
  const t = se();
  t.isEmpty() && t.append(Cn());
}
const Sl = Qt({ config: rn({ setOptions: Xr, updateOptions: Xr }), init: ({ $initialEditorState: t = Tl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (ei(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Zs, ko, Qs, ti, No] }), Wr = Symbol.for("@lexical/extension/LexicalBuilder");
function Jr() {
}
function Dl(t) {
  throw t;
}
function pn(t) {
  return Array.isArray(t) ? t : [t];
}
const Fn = "0.40.0+prod.esm";
class Xe {
  constructor(e) {
    bt(this, "roots");
    bt(this, "extensionNameMap");
    bt(this, "outgoingConfigEdges");
    bt(this, "incomingEdges");
    bt(this, "conflicts");
    bt(this, "_sortedExtensionReps");
    bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Fn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [pn(Sl)];
    for (const o of e) n.push(pn(o));
    return new Xe(n);
  }
  static maybeFromEditor(e) {
    const n = e[Wr];
    return n && (n.PACKAGE_VERSION !== Fn && et(292, n.PACKAGE_VERSION, Fn), n instanceof Xe || et(293)), n;
  }
  static fromEditor(e) {
    const n = Xe.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(yo({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [Wr]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = Jr;
    function n() {
      try {
        e();
      } finally {
        e = Jr;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = ie(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const n = pn(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new Rl(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && et(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && et(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = pn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (ra(i)) return;
      const s = o.extension.name;
      var l;
      zn(i) || et(300, s, a || "[unknown]"), zn(l = i) || et(304, String(l.id), String(yr)), i = Object.assign(l, { id: ar }), o.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, s);
      }
      i = Cl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) zn(o.state) && n(o);
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
    return ie(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: u } = p;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const h of _l(u)) {
        if (typeof h != "function") {
          const f = o.get(h.replace);
          f && et(302, u.name, h.replace.name, f.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (u.html) {
        if (u.html.export) for (const [h, f] of u.html.export.entries()) a.set(h, f);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && ea(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = Dl), e;
  }
}
const Ml = /* @__PURE__ */ new Set(), Zr = Qt({ build(t, e, n) {
  const o = n.getDependency(or).output, a = Qe({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ta(() => {
  }, () => le(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Jt()) for (const [p, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(p);
          continue;
        }
        const h = pi(p), f = h && h.isSelected() || !1;
        w = w || f !== (!!s && s.has(p)), f && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = Nl(() => (i.value || Ml).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [or], name: "@lexical/extension/NodeSelection" });
ni("INSERT_HORIZONTAL_RULE_COMMAND");
class Se extends ci {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Se(e.__key);
  }
  static importJSON(e) {
    return oa().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Ol, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Eo(n, e.theme.hr), n;
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
function Ol() {
  return { node: oa() };
}
function oa() {
  return di(Se);
}
function Il(t) {
  return t instanceof Se;
}
Qt({ dependencies: [or, Zr], name: "@lexical/extension/HorizontalRule", nodes: () => [Se], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(Zr).output, a = Qe({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ie(t.registerCommand(ri, (s) => {
    if (oi(s.target)) {
      const l = ai(s.target);
      if (Il(l)) return function(c, w = !1) {
        const p = Jt(), u = c.isSelected(), h = c.getKey();
        let f;
        w && si(p) ? f = p : (f = ii(), li(f)), u ? f.delete(h) : f.add(h);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, wi), t.registerMutationListener(Se, (s, l) => {
    yl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, u] of s.entries()) if (u === "destroyed") w.delete(p), c = !0;
      else {
        const h = w.get(p), f = t.getElementByKey(p);
        h ? h.domNode.value = f : (c = !0, w.set(p, { domNode: Qe(f), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), le(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(le(() => {
      const w = l.value;
      w && (c.value ? Eo(w, i) : ui(w, i));
    }));
    return ie(...s);
  }));
} });
function Al(t, e) {
  return ie(t.registerCommand(mi, (n) => {
    const o = Jt();
    if (!Ze(o)) return !1;
    n.preventDefault();
    const a = function(i) {
      if (i.getNodes().filter((u) => hn(u) && u.canIndent()).length > 0) return !0;
      const s = i.anchor, l = i.focus, c = l.isBefore(s) ? l : s, w = c.getNode(), p = qr(w);
      if (p.canIndent()) {
        const u = p.getKey();
        let h = fi();
        if (h.anchor.set(u, 0, "element"), h.focus.set(u, 0, "element"), h = hi(h), h.anchor.is(c)) return !0;
      }
      return !1;
    }(o) ? n.shiftKey ? gi : jr : bi;
    return t.dispatchCommand(a, void 0);
  }, Co), t.registerCommand(jr, () => {
    const n = typeof e == "number" ? e : e ? e.peek() : null;
    if (n == null) return !1;
    const o = Jt();
    if (!Ze(o)) return !1;
    const a = o.getNodes().map((i) => qr(i).getIndent());
    return Math.max(...a) + 1 >= n;
  }, ur));
}
Qt({ build: (t, e, n) => Tn(e), config: rn({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a } = n.getOutput();
  return le(() => {
    if (!o.value) return Al(t, a);
  });
} });
const Pl = Qt({ name: "@lexical/react/ReactProvider" });
function $l() {
  return se().getTextContent();
}
function Ll(t, e = !0) {
  if (t) return !1;
  let n = $l();
  return e && (n = n.trim()), n === "";
}
function Vl(t) {
  if (!Ll(t, !1)) return !1;
  const e = se().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (vi(a)) return !1;
    if (be(a)) {
      if (!xi(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!gn(c)) return !1;
      }
    }
  }
  return !0;
}
function aa(t) {
  return () => Vl(t);
}
function sa(t) {
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
            const [w, p, u, h, f] = c;
            t.update(() => {
              const g = Jt();
              if (Ze(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (gn(v) && w >= 0 && p >= 0 && (y = w, N = w + p, g.setTextNodeRange(v, y, v, N)), y === N && u === "" || (g.insertRawText(u), v = x.getNode()), gn(v)) {
                  y = h, N = h + f;
                  const _ = v.getTextContentSize();
                  y = y > _ ? _ : y, N = N > _ ? _ : N, g.setTextNodeRange(v, y, v, N);
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
Qt({ build: (t, e, n) => Tn(e), config: rn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => le(() => n.getOutput().disabled.value ? void 0 : sa(t)) });
function jl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Nr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : q;
function zl({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = T(() => n.getDecorators());
    return Nr(() => n.registerDecoratorListener((s) => {
      Mi(() => {
        i(s);
      });
    }), [n]), q(() => {
      i(n.getDecorators());
    }, [n]), F(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (h) => n._onError(h), children: r(os, { fallback: null, children: a[w] }) }), u = n.getElementByKey(w);
        u !== null && s.push(Oi(p, u, w));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function Fl({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Xe.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Pl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && jl(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(zl, { editor: t, ErrorBoundary: e });
}
function Qr(t) {
  return t.getEditorState().read(aa(t.isComposing()));
}
function Bl({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = qt();
  return function(a) {
    Nr(() => ie(Di(a), sa(a)), [a]);
  }(o), d(ct, { children: [t, r(Gl, { content: e }), r(Fl, { editor: o, ErrorBoundary: n })] });
}
function Gl({ content: t }) {
  const [e] = qt(), n = function(a) {
    const [i, s] = T(() => Qr(a));
    return Nr(() => {
      function l() {
        const c = Qr(a);
        s(c);
      }
      return l(), ie(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = hl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Kl({ defaultSelection: t }) {
  const [e] = qt();
  return q(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const ql = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : q;
function Ul({ onClear: t }) {
  const [e] = qt();
  return ql(() => Qo(e, t), [e, t]), null;
}
const ia = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Wt : q;
function Hl({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: u, ariaRequired: h, autoCapitalize: f, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...z }, L) {
  const [R, $] = T(t.isEditable()), C = G((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), S = F(() => /* @__PURE__ */ function(...V) {
    return (j) => {
      for (const I of V) typeof I == "function" ? I(j) : I != null && (I.current = j);
    };
  }(L, C), [C, L]);
  return ia(() => ($(t.isEditable()), t.registerEditableListener((V) => {
    $(V);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": R && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": R ? u : void 0, "aria-readonly": !R || void 0, "aria-required": h, autoCapitalize: f, className: g, contentEditable: R, "data-testid": k, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: _, ...z });
}
const Yl = nn(Hl);
function to(t) {
  return t.getEditorState().read(aa(t.isComposing()));
}
const Xl = nn(Wl);
function Wl(t, e) {
  const { placeholder: n, ...o } = t, [a] = qt();
  return d(ct, { children: [r(Yl, { editor: a, ...o, ref: e }), n != null && r(Jl, { editor: a, content: n })] });
}
function Jl({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = T(() => to(s));
    return ia(() => {
      function w() {
        const p = to(s);
        c(p);
      }
      return w(), ie(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, a] = T(e.isEditable());
  if (Wt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function Zl({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Xl,
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
const la = kn(void 0);
function Ql({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: i
}) {
  const s = F(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(la.Provider, { value: s, children: i });
}
function wa() {
  const t = dr(la);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function tw() {
  const [t, e] = T(void 0), n = G(() => {
    e(void 0);
  }, []), o = F(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(Ui, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(Lo, { children: [
      /* @__PURE__ */ r(Vo, { children: /* @__PURE__ */ r(jo, { children: i }) }),
      s
    ] }) });
  }, [t, n]), a = G(
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
function ew({
  children: t
}) {
  const [e] = qt(), [n, o] = T(e), [a, i] = T("paragraph"), [s, l] = tw(), c = () => {
  };
  return q(() => n.registerCommand(
    Ro,
    (w, p) => (o(p), !1),
    ur
  ), [n]), /* @__PURE__ */ d(
    Ql,
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
function nw(t) {
  const [e] = qt(), { activeEditor: n } = wa();
  q(() => n.registerCommand(
    Ro,
    () => {
      const o = Jt();
      return o && t(o), !1;
    },
    ur
  ), [e, t]), q(() => {
    n.getEditorState().read(() => {
      const o = Jt();
      o && t(o);
    });
  }, [n, t]);
}
const ca = we(
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
  Do.Root,
  {
    ref: a,
    className: m(ca({ variant: e, size: n, className: t })),
    ...o
  }
));
rw.displayName = Do.Root.displayName;
const da = b.createContext({
  size: "default",
  variant: "default"
}), kr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = ft();
  return /* @__PURE__ */ r(
    En.Root,
    {
      ref: i,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        da.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
kr.displayName = En.Root.displayName;
const We = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = b.useContext(da);
  return /* @__PURE__ */ r(
    En.Item,
    {
      ref: i,
      className: m(
        ca({
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
We.displayName = En.Item.displayName;
const eo = [
  { format: "bold", icon: is, label: "Bold" },
  { format: "italic", icon: ls, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function ow() {
  const { activeEditor: t } = wa(), [e, n] = T([]), o = G((a) => {
    if (Ze(a) || Ii(a)) {
      const i = [];
      eo.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return nw(o), /* @__PURE__ */ r(
    kr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: eo.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        We,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(yi, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function aw({ onClear: t }) {
  const [e] = qt();
  q(() => {
    t && t(() => {
      e.dispatchCommand(_o, void 0);
    });
  }, [e, t]);
}
function sw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = T(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(ew, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(ow, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Bl,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(Zl, { placeholder: t }) }),
          ErrorBoundary: ul
        }
      ),
      e && /* @__PURE__ */ r(Kl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(aw, { onClear: n }),
      /* @__PURE__ */ r(Ul, {})
    ] })
  ] });
}
const iw = {
  namespace: "commentEditor",
  theme: br,
  nodes: vr,
  onError: (t) => {
    console.error(t);
  }
};
function vn({
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
        className: m(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          il,
          {
            initialConfig: {
              ...iw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ d(Tt, { children: [
              /* @__PURE__ */ r(sw, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                wl,
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
function lw(t, e) {
  const n = _i(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!ua.has(i.nodeName)) {
    const s = ma(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof To && s.insertAfter(So());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), o;
}
function ww(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = se().getChildren();
  for (let a = 0; a < o.length; a++)
    pa(t, o[a], n, e);
  return n.innerHTML;
}
function pa(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = be(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && gn(e) && (s = gl(o, e, "clone"));
  const l = be(s) ? s.getChildren() : [], c = Ni(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: p, after: u } = w;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let f = 0; f < l.length; f++) {
    const g = l[f], x = pa(t, g, h, o);
    !a && be(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((ki(p) || zr(p)) && p.append(h), n.append(p), u) {
      const f = u.call(s, p);
      f && (zr(p) ? p.replaceChildren(f) : p.replaceWith(f));
    }
  } else n.append(h);
  return a;
}
const ua = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ma(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (ua.has(t.nodeName)) return s;
  let l = null;
  const c = function(g, x) {
    const { nodeName: v } = g, y = x._htmlConversions.get(v.toLowerCase());
    let N = null;
    if (y !== void 0) for (const _ of y) {
      const k = _(g);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let p = null;
  if (w !== null) {
    p = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const u = t.childNodes;
  let h = [];
  const f = (l == null || !Ci(l)) && (l != null && hn(l) || o);
  for (let g = 0; g < u.length; g++) h.push(...ma(u[g], e, n, f, new Map(a), l));
  return p != null && (h = p(h)), Fr(t) && (h = cw(t, h, f ? () => {
    const g = new To();
    return n.push(g), g;
  } : Cn)), l == null ? h.length > 0 ? s = s.concat(h) : Fr(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Br(g.nextSibling) && Br(g.previousSibling);
  }(t) && (s = s.concat(So())) : be(l) && l.append(...h), s;
}
function cw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (hn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && hn(e[s + 1])) {
      const c = n();
      c.setFormat(o), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function fa(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function ha(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ha(e.children)
  ) : !1;
}
function It(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ha(t.root.children) : !1;
}
function dw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Mo({
    namespace: "EditorUtils",
    theme: br,
    nodes: vr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = lw(e, a);
      se().clear(), Ei(i);
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
function xn(t) {
  const e = Mo({
    namespace: "EditorUtils",
    theme: br,
    nodes: vr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = ww(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function _r(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function fn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Cr(t) {
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
function Bn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function tp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = T(pw), [s, l] = T(void 0), [c, w] = T(!1), p = X(void 0), u = X(null);
  q(() => {
    let y = !0;
    const N = u.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && fa(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
  const h = G(() => {
    if (!It(a)) return;
    const y = xn(a);
    e(y, s);
  }, [a, e, s]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(B, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ae, {}) }) }),
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(
            B,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !It(a),
              children: /* @__PURE__ */ r(Lt, {})
            }
          ) }),
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(ne, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(co, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Bn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Kt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(ee, { children: t.map((y) => /* @__PURE__ */ r(
            Gt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Bn(y, o) })
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
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : Cr(y) && (y.preventDefault(), y.stopPropagation(), It(a) && h());
        },
        onKeyDown: (y) => {
          _r(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          vn,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => i(y),
            placeholder: f,
            onClear: (y) => {
              p.current = y;
            }
          }
        )
      }
    )
  ] });
}
const ep = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), np = [
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
  const a = X(null), [i, s] = T(void 0), [l, c] = T(void 0), w = G(
    (f) => {
      s(f);
      const g = t.find((v) => v.id === f);
      g && (e == null || e(g));
      const x = document.getElementById(f);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), p = G(
    (f) => {
      const g = t.find((x) => x.id === f);
      g && (c((x) => x === f ? void 0 : f), n == null || n(g));
    },
    [n, t]
  ), u = (f) => {
    if (!f) return !1;
    const g = f.tagName.toLowerCase();
    if (f.isContentEditable || uw.includes(g)) return !0;
    const x = f.getAttribute("role");
    if (x && mw.includes(x)) return !0;
    const v = f.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = G(
    (f) => {
      var R;
      const g = f.target, x = ($) => $ ? document.getElementById($) : void 0, v = x(l), y = x(i);
      if (!!(v && g && v.contains(g) && g !== v) && u(g)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const $ = t.find((C) => C.id === l);
            $ && w($.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!v) return;
          const $ = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if ($.length === 0) return;
          const C = $.findIndex((V) => V === g);
          if (C === -1) return;
          let S;
          f.key === "ArrowDown" ? S = Math.min(C + 1, $.length - 1) : S = Math.max(C - 1, 0), S !== C && (f.preventDefault(), f.stopPropagation(), (R = $[S]) == null || R.focus());
          return;
        }
        return;
      }
      const k = t.findIndex(($) => $.id === i);
      let z = k;
      switch (f.key) {
        case "ArrowDown":
          z = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          z = 0, f.preventDefault();
          break;
        case "End":
          z = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          i && p(i), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const $ = y;
          if ($) {
            const C = $.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = $.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = C ?? S;
            if (V) {
              f.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (u(g) || (o == null || o(f.key), f.preventDefault()));
          return;
      }
      const L = t[z];
      L && w(L.id);
    },
    [t, w, i, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: w
  };
}, hw = we(
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
), De = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", hw({ variant: e }), t), ...n })
);
De.displayName = "Badge";
const ga = b.forwardRef(
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
ga.displayName = "Card";
const gw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
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
      className: m(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
bw.displayName = "CardTitle";
const vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
vw.displayName = "CardDescription";
const ba = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ba.displayName = "CardContent";
const xw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
xw.displayName = "CardFooter";
const Me = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Oo.Root,
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
Me.displayName = Oo.Root.displayName;
const va = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ve.Root,
  {
    ref: n,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
va.displayName = Ve.Root.displayName;
const yw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ve.Image,
  {
    ref: n,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
yw.displayName = Ve.Image.displayName;
const xa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ve.Fallback,
  {
    ref: n,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
xa.displayName = Ve.Fallback.displayName;
const Er = kn(void 0);
function jt() {
  const t = dr(Er);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const re = we("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ze = ot.Trigger, ya = ot.Group, Nw = ot.Portal, kw = ot.Sub, _w = ot.RadioGroup;
function ke({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Er.Provider, { value: n, children: /* @__PURE__ */ r(ot.Root, { ...e }) });
}
const Na = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = jt();
  return /* @__PURE__ */ d(
    ot.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Na.displayName = ot.SubTrigger.displayName;
const ka = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
ka.displayName = ot.SubContent.displayName;
const de = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
    ot.Content,
    {
      ref: a,
      sideOffset: e,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
de.displayName = ot.Content.displayName;
const yn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ft(), i = jt();
  return /* @__PURE__ */ r(
    ot.Item,
    {
      ref: o,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
yn.displayName = ot.Item.displayName;
const Xt = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = jt();
  return /* @__PURE__ */ d(
    ot.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Xt.displayName = ot.CheckboxItem.displayName;
const _a = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = jt();
  return /* @__PURE__ */ d(
    ot.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        re({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
_a.displayName = ot.RadioItem.displayName;
const an = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
an.displayName = ot.Label.displayName;
const Fe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Fe.displayName = ot.Separator.displayName;
function Cw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Cw.displayName = "DropdownMenuShortcut";
function no({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = T(!1), [p, u] = T(), h = X(null);
  q(() => {
    if (!c) return;
    let k = !0;
    const z = h.current;
    if (!z) return;
    const L = setTimeout(() => {
      k && fa(z);
    }, 300);
    return () => {
      k = !1, clearTimeout(L);
    };
  }, [c]);
  const f = G(
    (k) => {
      k && k.stopPropagation(), w(!1), u(void 0), s == null || s(!1);
    },
    [s]
  ), g = G(
    async (k) => {
      if (k && k.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        xn(p)
      ) && (w(!1), u(void 0), s == null || s(!1));
    },
    [p, a, t.id, s]
  ), x = F(() => {
    const k = new Date(t.date), z = zs(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), L = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return he(n["%comment_dateAtTime%"], {
      date: z,
      time: L
    });
  }, [t.date, n]), v = F(() => t.user, [t.user]), y = F(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = F(() => Fs(t.contents), [t.contents]), _ = F(() => {
    if (o && l)
      return /* @__PURE__ */ d(ct, { children: [
        /* @__PURE__ */ d(
          yn,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), u(dw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(ws, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          yn,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
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
    t.contents,
    t.id,
    i,
    s
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(va, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(xa, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ d(De, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              fn(t.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), f()) : Cr(k) && (k.preventDefault(), k.stopPropagation(), It(p) && g());
              },
              onKeyDown: (k) => {
                _r(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  vn,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: p,
                    onSerializedChange: (k) => u(k)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: f,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Ae, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !It(p),
                      children: /* @__PURE__ */ r(po, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ d(ct, { children: [
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
                dangerouslySetInnerHTML: { __html: N }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ d(ke, { children: [
          /* @__PURE__ */ r(ze, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(uo, {}) }) }),
          /* @__PURE__ */ r(de, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const ro = {
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
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: p,
  handleAddCommentToThread: u,
  handleUpdateComment: h,
  handleDeleteComment: f,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: L
}) {
  const [R, $] = T(ro), [C, S] = T(
    void 0
  ), V = o, [j, I] = T(!1), [A, H] = T(!1), [M, W] = T(!1), [Ct, Dt] = T(!1), [Mt, dt] = T(!1), [P, D] = T(k), [K, Z] = T(!1), Q = X(void 0), [it, xt] = T(/* @__PURE__ */ new Map());
  q(() => {
    let O = !0;
    return (async () => {
      const Et = N ? await N(c) : !1;
      O && dt(Et);
    })(), () => {
      O = !1;
    };
  }, [c, N]), q(() => {
    let O = !0;
    if (!o) {
      Dt(!1), xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Et = y ? await y(c) : !1;
      O && Dt(Et);
    })(), () => {
      O = !1;
    };
  }, [o, c, y]);
  const pt = F(() => e.filter((O) => !O.deleted), [e]);
  q(() => {
    let O = !0;
    if (!o || !_) {
      xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Et = /* @__PURE__ */ new Map();
      await Promise.all(
        pt.map(async (Ir) => {
          const ts = await _(Ir.id);
          O && Et.set(Ir.id, ts);
        })
      ), O && xt(Et);
    })(), () => {
      O = !1;
    };
  }, [o, pt, _]);
  const yt = F(() => pt[0], [pt]), Ot = X(null), ht = X(void 0), gt = G(() => {
    var O;
    (O = ht.current) == null || O.call(ht), $(ro);
  }, []), Ut = G(() => {
    const O = !P;
    D(O), Z(!O), g == null || g(c, O);
  }, [P, g, c]);
  q(() => {
    I(!1);
  }, [o]), q(() => {
    if (o && !P && !K) {
      const O = setTimeout(() => {
        D(!0), g == null || g(c, !0);
      }, z * 1e3);
      return Q.current = O, () => clearTimeout(O);
    }
    Q.current && (clearTimeout(Q.current), Q.current = void 0);
  }, [o, P, K, z, c, g]);
  const E = F(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), Y = F(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const O = fn(i, n);
    return he(n["%comment_assigned_to%"], {
      assignedUser: O
    });
  }, [i, n]), nt = F(() => pt.slice(1), [pt]), rt = F(() => nt.length ?? 0, [nt.length]), ut = F(() => rt > 0, [rt]), Ht = F(() => j || rt <= 2 ? nt : nt.slice(-2), [nt, rt, j]), Nt = F(() => j || rt <= 2 ? 0 : rt - 2, [rt, j]), sn = F(
    () => rt === 1 ? E.singleReply : he(E.multipleReplies, { count: rt }),
    [rt, E]
  ), pe = F(
    () => Nt === 1 ? E.singleReply : he(E.multipleReplies, { count: Nt }),
    [Nt, E]
  );
  q(() => {
    !o && A && ut && H(!1);
  }, [o, A, ut]);
  const Mr = G(
    async (O) => {
      O && O.stopPropagation();
      const zt = It(R) ? xn(R) : void 0;
      if (C !== void 0) {
        await u({
          threadId: c,
          contents: zt,
          assignedUser: C
        }) && (S(void 0), zt && gt());
        return;
      }
      zt && await u({ threadId: c, contents: zt }) && gt();
    },
    [
      gt,
      R,
      u,
      C,
      c
    ]
  ), Or = G(
    async (O) => {
      const zt = It(R) ? xn(R) : void 0, Et = await u({
        ...O,
        contents: zt,
        assignedUser: C ?? O.assignedUser
      });
      return Et && zt && gt(), Et && C !== void 0 && S(void 0), Et;
    },
    [gt, R, u, C]
  );
  return /* @__PURE__ */ r(
    ga,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: m(
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && p !== "Resolved" && P,
          "tw-bg-background": o && p !== "Resolved" && P,
          "tw-bg-muted": p === "Resolved",
          "tw-bg-blue-50": !P && !o && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(ba, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            Y && /* @__PURE__ */ r(De, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: Y }),
            /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: (O) => {
                  O.stopPropagation(), Ut();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": P ? "Mark as unread" : "Mark as read",
                children: P ? /* @__PURE__ */ r(ds, {}) : /* @__PURE__ */ r(ps, {})
              }
            ),
            Mt && p !== "Resolved" && /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: m(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (O) => {
                  O.stopPropagation(), Or({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ d(
            "p",
            {
              ref: Ot,
              className: m(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": V
                },
                { "tw-whitespace-nowrap": !V }
              ),
              children: [
                a && L ? /* @__PURE__ */ r(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (O) => {
                      O.stopPropagation(), L(w);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ d("span", { className: t, children: [
                  yt.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: yt.selectedText }),
                  yt.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            no,
            {
              comment: yt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: Or,
              handleUpdateComment: h,
              handleDeleteComment: f,
              onEditingChange: H,
              canEditOrDelete: (!A && it.get(yt.id)) ?? !1,
              canUserResolveThread: Mt
            }
          )
        ] }),
        /* @__PURE__ */ d(ct, { children: [
          ut && !o && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Me, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: sn })
          ] }),
          !o && It(R) && /* @__PURE__ */ r(
            vn,
            {
              editorSerializedState: R,
              onSerializedChange: (O) => $(O),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ d(ct, { children: [
            Nt > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (O) => {
                  O.stopPropagation(), I(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (O) => {
                  (O.key === "Enter" || O.key === " ") && (O.preventDefault(), O.stopPropagation(), I(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Me, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: pe }),
                    j ? /* @__PURE__ */ r(mo, {}) : /* @__PURE__ */ r(Pe, {})
                  ] })
                ]
              }
            ),
            Ht.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              no,
              {
                comment: O,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: f,
                onEditingChange: H,
                canEditOrDelete: (!A && it.get(O.id)) ?? !1
              }
            ) }, O.id)),
            v !== !1 && (!A || It(R)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (O) => O.stopPropagation(),
                onKeyDownCapture: (O) => {
                  Cr(O) && (O.preventDefault(), O.stopPropagation(), (It(R) || C !== void 0) && Mr());
                },
                onKeyDown: (O) => {
                  _r(O), (O.key === "Enter" || O.key === " ") && O.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    vn,
                    {
                      editorSerializedState: R,
                      onSerializedChange: (O) => $(O),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (O) => {
                        ht.current = O;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: he(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: fn(
                          C,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(ne, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ r(
                        B,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !x || x.length === 0 || !x.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(co, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Kt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (O) => {
                            O.key === "Escape" && (O.stopPropagation(), W(!1));
                          },
                          children: /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(ee, { children: x == null ? void 0 : x.map((O) => /* @__PURE__ */ r(
                            Gt,
                            {
                              onSelect: () => {
                                S(O !== i ? O : void 0), W(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: fn(O, n) })
                            },
                            O || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      B,
                      {
                        size: "icon",
                        onClick: Mr,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !It(R) && C === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(po, {})
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
function rp({
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
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: f,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: v
}) {
  const [y, N] = T(/* @__PURE__ */ new Set()), [_, k] = T();
  q(() => {
    g && (N((I) => new Set(I).add(g)), k(g));
  }, [g]);
  const z = n.filter(
    (I) => I.comments.some((A) => !A.deleted)
  ), L = z.map((I) => ({
    id: I.id
  })), R = G(
    (I) => {
      N((A) => new Set(A).add(I.id)), k(I.id), x == null || x(I.id);
    },
    [x]
  ), $ = G(
    (I) => {
      const A = y.has(I);
      N((H) => {
        const M = new Set(H);
        return M.has(I) ? M.delete(I) : M.add(I), M;
      }), k(I), x == null || x(A ? void 0 : I);
    },
    [y, x]
  ), { listboxRef: C, activeId: S, handleKeyDown: V } = fw({
    options: L,
    onOptionSelect: R
  }), j = G(
    (I) => {
      I.key === "Escape" ? (_ && y.has(_) && (N((A) => {
        const H = new Set(A);
        return H.delete(_), H;
      }), k(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : V(I);
    },
    [_, y, V, x]
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
      className: m(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: j,
      children: z.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: m({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Ew,
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: $,
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
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: u,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: f,
              onVerseRefClick: v
            }
          )
        },
        I.id
      ))
    }
  );
}
function Rw({ table: t }) {
  return /* @__PURE__ */ d(ke, { children: [
    /* @__PURE__ */ r(Ai, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(us, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(de, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(an, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Fe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Xt,
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
const Oe = lt.Root, Tw = lt.Group, Ie = lt.Value, Sw = we(
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
), ye = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ d(
    lt.Trigger,
    {
      className: m(Sw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(lt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Pe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
ye.displayName = lt.Trigger.displayName;
const Ca = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.ScrollUpButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(mo, { className: "tw-h-4 tw-w-4" })
  }
));
Ca.displayName = lt.ScrollUpButton.displayName;
const Ea = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.ScrollDownButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Pe, { className: "tw-h-4 tw-w-4" })
  }
));
Ea.displayName = lt.ScrollDownButton.displayName;
const Ne = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(lt.Portal, { children: /* @__PURE__ */ d(
    lt.Content,
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
        /* @__PURE__ */ r(Ca, {}),
        /* @__PURE__ */ r(
          lt.Viewport,
          {
            className: m(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(Ea, {})
      ]
    }
  ) });
});
Ne.displayName = lt.Content.displayName;
const Dw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Label,
  {
    ref: n,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Dw.displayName = lt.Label.displayName;
const Rt = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ d(
  lt.Item,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(lt.ItemIndicator, { children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(lt.ItemText, { children: e })
    ]
  }
));
Rt.displayName = lt.Item.displayName;
const Mw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Mw.displayName = lt.Separator.displayName;
function Ow({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        Oe,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(ye, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ie, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ne, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Rt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(ms, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(fs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(hs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const oo = `
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
function Iw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function tn(t, e) {
  const n = e ? `${oo}, ${e}` : oo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Iw(o)
  );
}
const Sn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        tn(s, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
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
        s.preventDefault(), tn(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: m("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
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
Sn.displayName = "Table";
const Dn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
Dn.displayName = "TableHeader";
const Mn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", t), ...e }));
Mn.displayName = "TableBody";
const Aw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
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
          const a = t.current ? tn(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function $w(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Lw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Yt = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = b.useRef(null);
  b.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), Pw(s);
  const l = b.useMemo(
    () => s.current ? tn(s.current) : [],
    [s]
  ), c = b.useCallback(
    (p) => {
      const { current: u } = s;
      if (!u || !u.parentElement) return;
      const h = u.closest("table"), f = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tn(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = f.indexOf(u), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), Lw(f, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), $w(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = u.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [s, l, e]
  ), w = b.useCallback(
    (p) => {
      o && (n == null || n(p));
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
Yt.displayName = "TableRow";
const en = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
en.displayName = "TableHead";
const xe = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
xe.displayName = "TableCell";
const Vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Vw.displayName = "TableCaption";
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function jw({
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
  var L;
  const [p, u] = T([]), [h, f] = T([]), [g, x] = T({}), [v, y] = T({}), N = F(() => e ?? [], [e]), _ = Io({
    data: N,
    columns: t,
    getCoreRowModel: Po(),
    ...n && { getPaginationRowModel: $i() },
    onSortingChange: u,
    getSortedRowModel: Ao(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Pi(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: p,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: v
    }
  }), k = _.getVisibleFlatColumns();
  let z;
  return c ? z = Array.from({ length: 10 }).map((C, S) => `skeleton-row-${S}`).map((C) => /* @__PURE__ */ r(Yt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(xe, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(sr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((L = _.getRowModel().rows) == null ? void 0 : L.length) > 0 ? z = _.getRowModel().rows.map((R) => /* @__PURE__ */ r(
    Yt,
    {
      onClick: () => s(R, _),
      "data-state": R.getIsSelected() && "selected",
      children: R.getVisibleCells().map(($) => /* @__PURE__ */ r(xe, { children: He($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    R.id
  )) : z = /* @__PURE__ */ r(Yt, { children: /* @__PURE__ */ r(xe, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Rw, { table: _ }),
    /* @__PURE__ */ d(Sn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Dn, { stickyHeader: i, children: _.getHeaderGroups().map((R) => /* @__PURE__ */ r(Yt, { children: R.headers.map(($) => /* @__PURE__ */ r(en, { className: "tw-p-0", children: $.isPlaceholder ? void 0 : He($.column.columnDef.header, $.getContext()) }, $.id)) }, R.id)) }),
      /* @__PURE__ */ r(Mn, { children: z })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Ow, { table: _ })
  ] });
}
function op({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const i = F(
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
      children: /* @__PURE__ */ r(ji, { options: i, children: e })
    }
  );
}
const zw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ao = (t, e) => t[e] ?? e;
function Fw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = ao(n, "%webView_error_dump_header%"), i = ao(n, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
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
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ r(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(fo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const ap = Object.freeze([
  ...zw,
  "%webView_error_dump_copied_message%"
]);
function sp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = T(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ d(ne, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: o }),
    /* @__PURE__ */ d(Kt, { id: i, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(mt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Fw,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Bw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Bw || {});
function ip({ id: t, label: e, groups: n }) {
  const [o, a] = T(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = T({}), l = (w, p) => {
    const u = !o[w][p];
    a((f) => (f[w][p] = u, { ...f }));
    const h = n[w].items[p];
    h.onUpdate(h.id, u);
  }, c = (w, p) => {
    s((h) => (h[w] = p, { ...h }));
    const u = n[w].items.find((h) => h.id === p);
    u ? u.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(ke, { children: [
    /* @__PURE__ */ r(ze, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "default", children: [
      /* @__PURE__ */ r(bs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Pe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(de, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(an, { children: w.label }),
      /* @__PURE__ */ r(ya, { children: w.itemType === 0 ? /* @__PURE__ */ r(ct, { children: w.items.map((u, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Xt,
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ r(
        _w,
        {
          value: i[p],
          onValueChange: (u) => c(p, u),
          children: w.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(_a, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ r(Fe, {})
    ] }, w.label)) })
  ] }) });
}
function lp({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new Bs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, u) => p + u, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        e && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(vs, { className: "tw-h-4 tw-w-4" }),
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
        (a || s) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            B,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(xs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            B,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(ys, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Gw({ id: t, versionHistory: e }) {
  const [n, o] = T(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, u = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let f = "";
    return p > 0 ? f = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? f = `${u.toString()} month${u === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
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
function wp({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = F(() => Gs(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(Ks(), { type: "language" });
    return w.map((u) => p.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Gw, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
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
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: p = void 0,
  isDisabled: u = !1,
  sortSelected: h = !1,
  icon: f = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = T(!1), _ = G(
    (S) => {
      var j;
      const V = (j = t.find((I) => I.label === S)) == null ? void 0 : j.value;
      V && n(
        e.includes(V) ? e.filter((I) => I !== V) : [...e, V]
      );
    },
    [t, e, n]
  ), k = () => c || o, z = F(() => {
    if (!h) return t;
    const S = t.filter((j) => j.starred).sort((j, I) => j.label.localeCompare(I.label)), V = t.filter((j) => !j.starred).sort((j, I) => {
      const A = e.includes(j.value), H = e.includes(I.value);
      return A && !H ? -1 : !A && H ? 1 : j.label.localeCompare(I.label);
    });
    return [...S, ...V];
  }, [t, e, h]), L = () => {
    n(t.map((S) => S.value));
  }, R = () => {
    n([]);
  }, $ = w ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ d(ne, { open: $, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ d(
      B,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": $,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            f && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: f }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ r(ho, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Kt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(te, { children: [
      /* @__PURE__ */ r(je, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: L, children: i }),
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: R, children: s })
      ] }),
      /* @__PURE__ */ d(ee, { children: [
        /* @__PURE__ */ r(on, { children: l }),
        /* @__PURE__ */ r(Zt, { children: z.map((S) => /* @__PURE__ */ d(
          Gt,
          {
            value: S.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Lt,
                {
                  className: m(
                    "tw-h-4 tw-w-4",
                    e.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(Ns, { className: "tw-h-4 tw-w-4" }),
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
function cp({
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
  badgesPlaceholder: p,
  id: u
}) {
  return /* @__PURE__ */ d("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Kw,
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
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var f;
      return /* @__PURE__ */ d(De, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Ae, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((g) => g.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(mt, { children: p })
  ] });
}
const Be = b.forwardRef(
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
Be.displayName = "Input";
const qw = (t, e, n) => t === "generated" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Uw({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = X(null), s = X(null), l = X(!1), [c, w] = T(t), [p, u] = T(n), [h, f] = T(!1);
  q(() => {
    w(t);
  }, [t]), q(() => {
    p !== n && u(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, f(v), v || (c !== "custom" || p ? (e(c), o(p)) : (w(t), u(n)));
  }, x = (v) => {
    var y, N, _, k;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = i.current) == null || y.focus(), l.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), l.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ d(ke, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(ze, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: qw(t, a, n) }) }) }),
      /* @__PURE__ */ r(St, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      de,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(an, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Fe, {}),
          /* @__PURE__ */ r(
            Xt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Wn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Xt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Jn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Xt,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (v) => {
                var y;
                v.stopPropagation(), l.current = !0, (y = i.current) == null || y.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Be,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
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
const Hw = (t, e) => t === "f" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(bo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(vo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(go, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Yw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), he(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Xw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ d(ke, { children: [
    /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Ri, { asChild: !0, children: /* @__PURE__ */ r(ze, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: Hw(t, n) }) }) }),
      /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: Yw(t, n) }) })
    ] }) }),
    /* @__PURE__ */ d(de, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(an, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Fe, {}),
      /* @__PURE__ */ d(
        Xt,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(go, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Xt,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(bo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Xt,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(vo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Ww = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Jw({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? ks, { className: e, size: 16 });
}
function Zw({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = T(""), i = F(() => {
    const s = o.trim().toLowerCase();
    return s ? e.filter(
      (l) => {
        var c;
        return l.marker && ((c = l.marker) == null ? void 0 : c.toLowerCase().includes(s)) || !l.marker && l.title.toLowerCase().includes(s);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ d(te, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      je,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (s) => a(s),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(ee, { children: [
      /* @__PURE__ */ r(on, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Zt, { children: i.map((s) => {
        var l;
        return /* @__PURE__ */ d(
          Gt,
          {
            className: "tw-flex tw-gap-2 hover:tw-bg-accent",
            disabled: s.isDisallowed || s.isDeprecated,
            onSelect: s.action,
            children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: s.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Jw, { icon: s.icon }) }) }),
              /* @__PURE__ */ d("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: s.title }),
                s.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
              ] }),
              (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ r(Fo, { className: "tw-font-sans", children: s.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${s.marker ?? ((l = s.icon) == null ? void 0 : l.displayName)}-${s.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function Qw(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = un[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[un[l].description] ?? un[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function tc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ec(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const nc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function dp({
  classNameForEditor: t,
  noteOps: e,
  onSave: n,
  onClose: o,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c
}) {
  const w = X(null), p = X(null), u = X(null), [h, f] = T("generated"), [g, x] = T("*"), [v, y] = T("f"), [N, _] = T(!1), [k, z] = T(!1), [L, R] = T(), [$, C] = T(), [S, V] = T(), [j, I] = T(), A = X(null), H = F(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? zi(), noteMode: "expanded" }
    }),
    [s, l]
  ), M = F(
    () => Qw(
      w,
      () => z(!1),
      c,
      j
    ),
    [c, j]
  );
  q(() => {
    var P;
    k || (P = w.current) == null || P.focus();
  }, [v, k]), q(() => {
    var K, Z;
    let P;
    const D = e == null ? void 0 : e.at(0);
    if (D && wn("note", D)) {
      const Q = (K = D.insert.note) == null ? void 0 : K.caller;
      let it = "custom";
      Q === Wn ? it = "generated" : Q === Jn ? it = "hidden" : Q && x(Q), f(it), y(((Z = D.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
        var xt;
        (xt = w.current) == null || xt.applyUpdate([D]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [e, i]);
  const W = G(() => {
    var D, K;
    const P = (K = (D = w.current) == null ? void 0 : D.getNoteOps(0)) == null ? void 0 : K.at(0);
    P && wn("note", P) && (P.insert.note && (h === "custom" ? P.insert.note.caller = g : P.insert.note.caller = h === "generated" ? Wn : Jn), n([P]));
  }, [h, g, n]), Ct = () => {
    var D;
    const P = (D = p.current) == null ? void 0 : D.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
  }, Dt = (P) => {
    var K, Z, Q, it, xt;
    y(P);
    const D = (Z = (K = w.current) == null ? void 0 : K.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (D && wn("note", D)) {
      D.insert.note && (D.insert.note.style = P);
      const pt = (it = (Q = D.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : it.ops;
      v !== "x" && P === "x" ? pt == null || pt.forEach((yt) => tc(yt)) : v === "x" && P !== "x" && (pt == null || pt.forEach((yt) => ec(yt))), (xt = w.current) == null || xt.applyUpdate([D, { delete: 1 }]);
    }
  }, Mt = (P) => {
    var K, Z, Q, it, xt, pt;
    (K = w.current) == null || K.focus();
    const D = (Q = (Z = w.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : Q.at(0);
    if (D && wn("note", D)) {
      P.content.length > 1 && setTimeout(() => {
        var ht;
        (ht = w.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const yt = (it = D.insert.note) == null ? void 0 : it.style, Ot = (pt = (xt = D.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : pt.ops;
      yt || _(!1), _(
        yt === "x" ? !!(Ot != null && Ot.every((ht) => {
          var Ut, E;
          if (!((Ut = ht.attributes) != null && Ut.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "xt" || gt === "xo" || gt === "xq";
        })) : !!(Ot != null && Ot.every((ht) => {
          var Ut, E;
          if (!((Ut = ht.attributes) != null && Ut.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "ft" || gt === "fr" || gt === "fq";
        }))
      );
    } else
      _(!1);
  }, dt = G(() => {
    const P = window.getSelection();
    if (u.current && M.length && P && P.rangeCount > 0) {
      const D = P.getRangeAt(0).getBoundingClientRect(), K = u.current.getBoundingClientRect();
      R(D.left - K.left), C(D.top - K.top), V(D.height), z(!0);
    }
  }, [M, u]);
  return q(() => {
    const P = () => {
      k && z(!1);
    };
    return window.addEventListener("click", P), () => {
      window.removeEventListener("click", P);
    };
  }, [k]), q(() => {
    var P;
    k && ((P = A.current) == null || P.focus());
  }, [k]), q(() => {
    var K;
    const P = ((K = p.current) == null ? void 0 : K.querySelector(".editor-input")) ?? void 0, D = (Z) => {
      !k && P && document.activeElement === P && Z.key === l ? (Z.preventDefault(), dt()) : k && Z.key === "Escape" && (Z.preventDefault(), z(!1));
    };
    return document.addEventListener("keydown", D), () => {
      document.removeEventListener("keydown", D);
    };
  }, [k, dt, l]), /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            Xw,
            {
              isTypeSwitchable: N,
              noteType: v,
              handleNoteTypeChange: Dt,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            Uw,
            {
              callerType: h,
              updateCallerType: f,
              customCaller: g,
              updateCustomCaller: x,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
            /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: o,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ r(Ae, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
            /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: W,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ r(Lt, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: c["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ d(
        "div",
        {
          ref: p,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(
              Fi,
              {
                options: H,
                onStateChange: (P) => I(P.contextMarker),
                onUsjChange: Mt,
                defaultUsj: nc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: w
              }
            ) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
              /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(
                B,
                {
                  onClick: Ct,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(fo, {})
                }
              ) }),
              /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: "tw-absolute",
        ref: u,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ d(ne, { open: k, children: [
      /* @__PURE__ */ r(
        Wi,
        {
          className: "tw-absolute",
          style: {
            top: $,
            left: L,
            height: S,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Kt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (P) => {
            P.preventDefault(), P.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Zw,
            {
              markerMenuItems: M,
              localizedStrings: c,
              searchRef: A
            }
          )
        }
      )
    ] })
  ] });
}
const pp = Object.freeze([
  ...Ww,
  ...Object.entries(un).map((t) => t[1].description).filter((t) => !!t),
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_cancelButton_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%"
]);
function Ra(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function rc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      Rr(t, l, n, !0, a),
      w && o
    ] }, Ra(t, l));
  });
}
function Rr(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Yn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(Yn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return oc(
        i,
        Ra(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function oc(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Yn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Rr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function ac({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: m("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), u = s && /* @__PURE__ */ d(ct, { children: [
    Rr(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", f = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = m(h, f);
  return /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ d("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: u }),
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(ct, { children: rc(t.marker, l, o, w) })
      }
    )
  ] });
}
function up({
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
  const p = c ?? qs(n, void 0), u = (N, _) => {
    w == null || w(N, _, a);
  }, h = i ? n.findIndex((N) => N === i) : -1, [f, g] = T(h), x = (N, _, k) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), w == null || w(_, k, a);
          break;
      }
  }, v = (N) => {
    if (n.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), g((_) => Math.min(_ + 1, n.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, y = X([]);
  return q(() => {
    var N;
    f >= 0 && f < y.current.length && ((N = y.current[f]) == null || N.focus());
  }, [f]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: f < 0 ? 0 : -1,
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
          children: n.map((N, _) => {
            const k = N === i, z = `${a}-${_}`;
            return /* @__PURE__ */ d(ct, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (L) => {
                    y.current[_] = L;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === f ? 0 : -1,
                  className: m(
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
                  onKeyDown: (L) => x(L, N, _),
                  children: /* @__PURE__ */ r(
                    ac,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => p(N.caller, _),
                      showMarkers: s
                    }
                  )
                },
                z
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Me, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function sc(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function ic({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = F(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const p = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(p) || (c.add(p), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ d(Sn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Dn, { stickyHeader: !0, children: /* @__PURE__ */ d(Yt, { children: [
      /* @__PURE__ */ r(en, { children: a }),
      /* @__PURE__ */ r(en, { children: i })
    ] }) }),
    /* @__PURE__ */ r(Mn, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ d(
      Yt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(xe, { children: ge(l.reference, "English") }),
          /* @__PURE__ */ r(xe, { className: o, children: sc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Tr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Zn.Root,
  {
    ref: n,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Zn.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Tr.displayName = Zn.Root.displayName;
const lc = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Rs, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Ts, { className: "tw-h-4 tw-w-4" });
}, On = (t, e, n) => /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ d(At, { children: [
  /* @__PURE__ */ d(
    Pt,
    {
      className: m("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        lc(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(St, { side: "bottom", children: e })
] }) }), mp = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => On(e, t)
}), wc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => On(n, t)
}), fp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => On(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Gn = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), o(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, hp = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => On(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ d(kr, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Gn(
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
          children: /* @__PURE__ */ r(_s, {})
        }
      ),
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Gn(
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
          children: /* @__PURE__ */ r(Cs, {})
        }
      ),
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Gn(
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
          children: /* @__PURE__ */ r(Es, {})
        }
      )
    ] });
  }
}), gp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), bp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, vp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, cc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", xp = Object.freeze([
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
]), dc = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, pc = (t, e, n) => t.map((o) => {
  const a = Vr(o.key) ? o.key : o.key[0];
  return {
    items: Vr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || cc(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ft = (t, e) => t[e] ?? e;
function yp({
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
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: u,
  onItemSelected: h
}) {
  const f = Ft(n, "%webView_inventory_all%"), g = Ft(n, "%webView_inventory_approved%"), x = Ft(n, "%webView_inventory_unapproved%"), v = Ft(n, "%webView_inventory_unknown%"), y = Ft(n, "%webView_inventory_scope_currentBook%"), N = Ft(n, "%webView_inventory_scope_chapter%"), _ = Ft(n, "%webView_inventory_scope_verse%"), k = Ft(n, "%webView_inventory_filter_text%"), z = Ft(
    n,
    "%webView_inventory_show_additional_items%"
  ), L = Ft(n, "%webView_inventory_no_results%"), [R, $] = T(!1), [C, S] = T("all"), [V, j] = T(""), [I, A] = T([]), H = F(() => {
    const D = t ?? [];
    return D.length === 0 ? [] : pc(D, a, i);
  }, [t, a, i]), M = F(() => {
    if (R) return H;
    const D = [];
    return H.forEach((K) => {
      const Z = K.items[0], Q = D.find(
        (it) => it.items[0] === Z
      );
      Q ? (Q.count += K.count, Q.occurrences = Q.occurrences.concat(K.occurrences)) : D.push({
        items: [Z],
        count: K.count,
        occurrences: K.occurrences,
        status: K.status
      });
    }), D;
  }, [R, H]), W = F(() => M.length === 0 ? [] : dc(M, C, V), [M, C, V]), Ct = F(() => {
    var Z, Q;
    if (!R) return c;
    const D = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
    if (!D) return c;
    const K = [];
    for (let it = 0; it < D; it++)
      K.push(
        wc(
          ((Q = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Q[it]) || "Additional Item",
          it + 1
        )
      );
    return [...K, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, R]);
  q(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const Dt = (D, K) => {
    K.setRowSelection(() => {
      const Q = {};
      return Q[D.index] = !0, Q;
    });
    const Z = D.original.items;
    A(Z), h && Z.length > 0 && h(Z[0]);
  }, Mt = (D) => {
    if (D === "book" || D === "chapter" || D === "verse")
      l(D);
    else
      throw new Error(`Invalid scope value: ${D}`);
  }, dt = (D) => {
    if (D === "all" || D === "approved" || D === "unapproved" || D === "unknown")
      S(D);
    else
      throw new Error(`Invalid status filter value: ${D}`);
  }, P = F(() => {
    if (M.length === 0 || I.length === 0) return [];
    const D = M.filter((K) => Us(
      R ? K.items : [K.items[0]],
      I
    ));
    if (D.length > 1) throw new Error("Selected item is not unique");
    return D.length === 0 ? [] : D[0].occurrences;
  }, [I, R, M]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Oe,
        {
          onValueChange: (D) => dt(D),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(ye, { className: "tw-m-1", children: /* @__PURE__ */ r(Ie, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Ne, { children: [
              /* @__PURE__ */ r(Rt, { value: "all", children: f }),
              /* @__PURE__ */ r(Rt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Rt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Rt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Oe, { onValueChange: (D) => Mt(D), defaultValue: s, children: [
        /* @__PURE__ */ r(ye, { className: "tw-m-1", children: /* @__PURE__ */ r(Ie, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Ne, { children: [
          /* @__PURE__ */ r(Rt, { value: "book", children: y }),
          /* @__PURE__ */ r(Rt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Rt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Be,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: V,
          onChange: (D) => {
            j(D.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Tr,
          {
            className: "tw-m-1",
            checked: R,
            onCheckedChange: (D) => {
              $(D);
            }
          }
        ),
        /* @__PURE__ */ r(mt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? z })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      jw,
      {
        columns: Ct,
        data: W,
        onRowClickHandler: Dt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: L
      }
    ) }),
    P.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      ic,
      {
        classNameForText: u,
        occurrenceData: P,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const uc = "16rem", mc = "3rem", Ta = b.createContext(void 0);
function In() {
  const t = b.useContext(Ta);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Sa = b.forwardRef(
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
    const [w, p] = b.useState(t), u = e ?? w, h = b.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(u) : _;
        n ? n(k) : p(k);
      },
      [n, u]
    ), f = b.useCallback(() => h((_) => !_), [h]), g = u ? "expanded" : "collapsed", y = ft() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = b.useMemo(
      () => ({
        state: g,
        open: u,
        setOpen: h,
        toggleSidebar: f,
        side: y
      }),
      [g, u, h, f, y]
    );
    return /* @__PURE__ */ r(Ta.Provider, { value: N, children: /* @__PURE__ */ r(Tt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": uc,
            "--sidebar-width-icon": mc,
            ...a
          }
        ),
        className: m(
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
Sa.displayName = "SidebarProvider";
const Da = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = In();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: i,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ d(
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
Da.displayName = "Sidebar";
const fc = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = In();
  return /* @__PURE__ */ d(
    B,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(Ss, {}) : /* @__PURE__ */ r(Ds, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
fc.displayName = "SidebarTrigger";
const hc = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = In();
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
hc.displayName = "SidebarRail";
const Ma = b.forwardRef(
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
Ma.displayName = "SidebarInset";
const gc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be,
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
gc.displayName = "SidebarInput";
const bc = b.forwardRef(
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
bc.displayName = "SidebarHeader";
const vc = b.forwardRef(
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
vc.displayName = "SidebarFooter";
const xc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Me,
  {
    ref: n,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
xc.displayName = "SidebarSeparator";
const Oa = b.forwardRef(
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
Oa.displayName = "SidebarContent";
const ir = b.forwardRef(
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
ir.displayName = "SidebarGroup";
const lr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? $e : "div",
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
lr.displayName = "SidebarGroupLabel";
const yc = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? $e : "button",
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
yc.displayName = "SidebarGroupAction";
const wr = b.forwardRef(
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
wr.displayName = "SidebarGroupContent";
const Ia = b.forwardRef(
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
Ia.displayName = "SidebarMenu";
const Aa = b.forwardRef(
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
Aa.displayName = "SidebarMenuItem";
const Nc = we(
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
), Pa = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const c = t ? $e : "button", { state: w } = In(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: m(Nc({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Pt, { asChild: !0, children: p }),
      /* @__PURE__ */ r(St, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Pa.displayName = "SidebarMenuButton";
const kc = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? $e : "button",
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
kc.displayName = "SidebarMenuAction";
const _c = b.forwardRef(
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
_c.displayName = "SidebarMenuBadge";
const Cc = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(sr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          sr,
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
Cc.displayName = "SidebarMenuSkeleton";
const Ec = b.forwardRef(
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
Ec.displayName = "SidebarMenuSub";
const Rc = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Rc.displayName = "SidebarMenuSubItem";
const Tc = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? $e : "a",
  {
    ref: i,
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
Tc.displayName = "SidebarMenuSubButton";
function Sc({
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
  const w = G(
    (h, f) => {
      o(h, f);
    },
    [o]
  ), p = G(
    (h) => {
      const f = n.find((g) => g.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), u = G(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Da,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Oa, { children: [
        /* @__PURE__ */ d(ir, { children: [
          /* @__PURE__ */ r(lr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(wr, { children: /* @__PURE__ */ r(Ia, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(Aa, { children: /* @__PURE__ */ r(
            Pa,
            {
              onClick: () => w(h),
              isActive: u(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ d(ir, { children: [
          /* @__PURE__ */ r(lr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(wr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            nr,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (h) => {
                const f = p(h);
                w(f, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Ms, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Sr = nn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = ft();
    return /* @__PURE__ */ d("div", { id: s, className: m("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        wo,
        {
          className: m(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Be,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (w) => e(w.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ d(
        B,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Ae, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Sr.displayName = "SearchBar";
function Np({
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
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Sr,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Sa,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Sc,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(Ma, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const oe = "scrBook", Dc = "scrRef", fe = "source", Mc = "details", Oc = "Scripture Reference", Ic = "Scripture Book", $a = "Type", Ac = "Details";
function Pc(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: oe,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Oc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === oe ? ge(a.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Xn(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ge(o.start),
      id: Dc,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ge(a.start);
      },
      sortingFn: (o, a) => Xn(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: fe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? $a : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Mc,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Ac,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const $c = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Xn(t.start, t.end) === 0 ? `${An(t.start)}+${e}` : `${An(t.start)}+${e}-${An(t.end)}+${n}`;
}, so = (t) => `${$c({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function kp({
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
  const [w, p] = T([]), [u, h] = T([{ id: oe, desc: !1 }]), [f, g] = T({}), x = F(
    () => t.flatMap((C) => C.data.map((S) => ({
      ...S,
      source: C.source
    }))),
    [t]
  ), v = F(
    () => Pc(
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
    w.includes(fe) ? h([
      { id: fe, desc: !1 },
      { id: oe, desc: !1 }
    ]) : h([{ id: oe, desc: !1 }]);
  }, [w]);
  const y = Io({
    data: x,
    columns: v,
    state: {
      grouping: w,
      sorting: u,
      rowSelection: f
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: Vi(),
    getGroupedRowModel: Li(),
    getCoreRowModel: Po(),
    getSortedRowModel: Ao(),
    getRowId: so,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const C = y.getSelectedRowModel().rowsById, S = Object.keys(C);
      if (S.length === 1) {
        const V = x.find((j) => so(j) === S[0]) || void 0;
        V && l(V);
      }
    }
  }, [f, x, l, y]);
  const N = a ?? Ic, _ = i ?? $a, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [oe] },
    { label: `Group by ${_}`, value: [fe] },
    {
      label: `Group by ${N} and ${_}`,
      value: [oe, fe]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [fe, oe]
    }
  ], z = (C) => {
    p(JSON.parse(C));
  }, L = (C, S) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(S);
  }, R = (C, S) => C.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), $ = (C, S, V) => {
    if (!((C == null ? void 0 : C.length) === 0 || S.depth < V.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ d(
      Oe,
      {
        value: JSON.stringify(w),
        onValueChange: (C) => {
          z(C);
        },
        children: [
          /* @__PURE__ */ r(ye, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ie, {}) }),
          /* @__PURE__ */ r(Ne, { position: "item-aligned", children: /* @__PURE__ */ r(Tw, { children: k.map((C) => /* @__PURE__ */ r(Rt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Sn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Dn, { children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(Yt, { children: C.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(en, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            B,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          He(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(Mn, { children: y.getRowModel().rows.map((C, S) => {
        const V = ft();
        return /* @__PURE__ */ r(
          Yt,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: m(R(C, S)),
            onClick: (j) => L(C, j),
            children: C.getVisibleCells().map((j) => {
              if (!(j.getIsPlaceholder() || j.column.columnDef.enableGrouping && !j.getIsGrouped() && (j.column.columnDef.id !== fe || !n)))
                return /* @__PURE__ */ r(
                  xe,
                  {
                    className: m(
                      j.column.columnDef.id,
                      "tw-p-[1px]",
                      $(w, C, j)
                    ),
                    children: j.getIsGrouped() ? /* @__PURE__ */ d(
                      B,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r(Pe, {}),
                          !C.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ r(Re, {}) : /* @__PURE__ */ r(Hn, {})),
                          " ",
                          He(j.column.columnDef.cell, j.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : He(j.column.columnDef.cell, j.getContext())
                  },
                  j.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Dr = (t, e) => t.filter((n) => {
  try {
    return Ue(n) === e;
  } catch {
    return !1;
  }
}), La = (t, e, n) => Dr(t, e).every((o) => n.includes(o));
function Lc({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Dr(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        La(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Xi(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const io = 5, Kn = 6;
function Vc({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: h, ntLong: f, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = T(!1), [N, _] = T(""), k = X(void 0), z = X(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const L = F(() => wt.allBookIds.filter(
    (A, H) => t[H] === "1" && !wt.isObsolete(wt.bookIdToNumber(A))
  ), [t]), R = F(() => {
    if (!N.trim()) {
      const M = {
        [U.OT]: [],
        [U.NT]: [],
        [U.DC]: [],
        [U.Extra]: []
      };
      return L.forEach((W) => {
        const Ct = Ue(W);
        M[Ct].push(W);
      }), M;
    }
    const A = L.filter(
      (M) => hr(M, N, a)
    ), H = {
      [U.OT]: [],
      [U.NT]: [],
      [U.DC]: [],
      [U.Extra]: []
    };
    return A.forEach((M) => {
      const W = Ue(M);
      H[W].push(M);
    }), H;
  }, [L, N, a]), $ = G(
    (A, H = !1) => {
      if (!H || !k.current) {
        n(
          e.includes(A) ? e.filter((dt) => dt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = L.findIndex((dt) => dt === k.current), W = L.findIndex((dt) => dt === A);
      if (M === -1 || W === -1) return;
      const [Ct, Dt] = [
        Math.min(M, W),
        Math.max(M, W)
      ], Mt = L.slice(Ct, Dt + 1).map((dt) => dt);
      n(
        e.includes(A) ? e.filter((dt) => !Mt.includes(dt)) : [.../* @__PURE__ */ new Set([...e, ...Mt])]
      );
    },
    [e, n, L]
  ), C = (A) => {
    $(A, z.current), z.current = !1;
  }, S = (A, H) => {
    A.preventDefault(), $(H, A.shiftKey);
  }, V = G(
    (A) => {
      const H = Dr(L, A).map((M) => M);
      n(
        La(L, A, e) ? e.filter((M) => !H.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, n, L]
  ), j = () => {
    n(L.map((A) => A));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(U).map((A) => /* @__PURE__ */ r(
      Lc,
      {
        section: A,
        availableBookIds: L,
        selectedBookIds: e,
        onToggle: V,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ d(
      ne,
      {
        open: v,
        onOpenChange: (A) => {
          y(A), A || _("");
        },
        children: [
          /* @__PURE__ */ r(ce, { asChild: !0, children: /* @__PURE__ */ d(
            B,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(ho, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Kt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            te,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (z.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  je,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: j, children: c }),
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: I, children: w })
                ] }),
                /* @__PURE__ */ d(ee, { children: [
                  /* @__PURE__ */ r(on, { children: p }),
                  Object.values(U).map((A, H) => {
                    const M = R[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ d(lo, { children: [
                        /* @__PURE__ */ r(
                          Zt,
                          {
                            heading: Bo(A, h, f, g, x),
                            children: M.map((W) => /* @__PURE__ */ r(
                              Ko,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => C(W),
                                onMouseDown: (Ct) => S(Ct, W),
                                section: Ue(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: er(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        H < Object.values(U).length - 1 && /* @__PURE__ */ r(zo, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === Kn ? Kn : io
      ).map((A) => /* @__PURE__ */ r(De, { className: "hover:tw-bg-secondary", variant: "secondary", children: Ee(A, a) }, A)),
      e.length > Kn && /* @__PURE__ */ r(
        De,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - io} ${u}`
        }
      )
    ] })
  ] });
}
const _p = Object.freeze([
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
]), ue = (t, e) => t[e] ?? e;
function Cp({
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
  const w = ue(
    s,
    "%webView_scope_selector_selected_text%"
  ), p = ue(
    s,
    "%webView_scope_selector_current_verse%"
  ), u = ue(
    s,
    "%webView_scope_selector_current_chapter%"
  ), h = ue(s, "%webView_scope_selector_current_book%"), f = ue(s, "%webView_scope_selector_choose_books%"), g = ue(s, "%webView_scope_selector_scope%"), x = ue(s, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: f, id: "scope-selected" }
  ], y = e ? v.filter((N) => e.includes(N.value)) : v;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(mt, { children: g }),
      /* @__PURE__ */ r(
        gr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(bn, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(mt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(mt, { children: x }),
      /* @__PURE__ */ r(
        Vc,
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
const qn = {
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
function Ep({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...qn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in qn ? qn[w] : p
        ]
      )
    )
  }, c = ft();
  return /* @__PURE__ */ d(
    Oe,
    {
      value: `${e}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(ye, { size: a, className: m("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Ie,
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ne,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((w) => /* @__PURE__ */ r(Rt, { value: `${w}`, children: l[tt(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Rp({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Tp({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Sp({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Me, {}) : ""
  ] });
}
function Va(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function Nn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ja = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(At, { children: [
  /* @__PURE__ */ r(Pt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    yn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(Nn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(Nn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(kw, { children: [
    /* @__PURE__ */ r(Na, { children: l.label }),
    /* @__PURE__ */ r(Nw, { children: /* @__PURE__ */ r(ka, { children: ja(
      t,
      e,
      Va(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(St, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function cr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(ke, { variant: i, children: [
    /* @__PURE__ */ r(ze, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(B, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(Os, {}) }) }),
    /* @__PURE__ */ r(de, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(lo, { children: [
      /* @__PURE__ */ r(ya, { children: /* @__PURE__ */ r(Tt, { children: ja(e.groups, e.items, c, t) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Fe, {})
    ] }, c)) })
  ] });
}
const za = b.forwardRef(
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
function Dp({
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
  return /* @__PURE__ */ d(za, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      cr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(Is, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        cr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(As, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Mp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(za, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    cr,
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
const Fa = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    _t.Root,
    {
      orientation: "vertical",
      ref: n,
      className: m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Fa.displayName = _t.List.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.List,
  {
    ref: n,
    className: m(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ba.displayName = _t.List.displayName;
const jc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Ga = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Content,
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
Ga.displayName = _t.Content.displayName;
function Op({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ d("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Sr,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ d(Fa, { children: [
      /* @__PURE__ */ r(Ba, { children: t.map((l) => /* @__PURE__ */ r(jc, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Ga, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function zc({ ...t }) {
  return /* @__PURE__ */ r(at.Menu, { ...t });
}
function Fc({ ...t }) {
  return /* @__PURE__ */ r(at.Sub, { "data-slot": "menubar-sub", ...t });
}
const Ka = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Er.Provider, { value: a, children: /* @__PURE__ */ r(
    at.Root,
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
Ka.displayName = at.Root.displayName;
const qa = b.forwardRef(({ className: t, ...e }, n) => {
  const o = jt();
  return /* @__PURE__ */ r(
    at.Trigger,
    {
      ref: n,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        re({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
qa.displayName = at.Trigger.displayName;
const Ua = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = jt();
  return /* @__PURE__ */ d(
    at.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        re({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ua.displayName = at.SubTrigger.displayName;
const Ha = b.forwardRef(({ className: t, ...e }, n) => {
  const o = jt();
  return /* @__PURE__ */ r(
    at.SubContent,
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
Ha.displayName = at.SubContent.displayName;
const Ya = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = jt();
  return /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
    at.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: m(
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
Ya.displayName = at.Content.displayName;
const Xa = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = jt();
  return /* @__PURE__ */ r(
    at.Item,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        re({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Xa.displayName = at.Item.displayName;
const Bc = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = jt();
  return /* @__PURE__ */ d(
    at.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        re({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Bc.displayName = at.CheckboxItem.displayName;
const Gc = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = jt();
  return /* @__PURE__ */ d(
    at.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        re({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Gc.displayName = at.RadioItem.displayName;
const Kc = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Kc.displayName = at.Label.displayName;
const Wa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Wa.displayName = at.Separator.displayName;
const Ke = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Ja = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Pt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        Xa,
        {
          onClick: () => {
            o(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ r(Nn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ r(Nn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ d(Fc, { children: [
        /* @__PURE__ */ r(Ua, { children: w.label }),
        /* @__PURE__ */ r(Ha, { children: Ja(
          t,
          e,
          Va(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(St, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ r(Wa, {}, `separator-${i}`)), c;
  });
};
function qc({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = X(void 0), i = X(void 0), s = X(void 0), l = X(void 0), c = X(void 0), w = (p) => {
    switch (p) {
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
  if (Bi(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        Ke(i, [h]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Ke(i, [h, f]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), Ke(s, [h, f]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), Ke(l, [h, f]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), Ke(c, [h, f]);
        break;
    }
  }), q(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((f) => {
      f.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((f) => {
      p.observe(f, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Ka, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ d(zc, { children: [
      /* @__PURE__ */ r(qa, { ref: w(p), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ r(
        Ya,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(Tt, { children: Ja(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Ip(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Ap({
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
  const p = X(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-border tw-px-4 tw-text-foreground", o),
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
                  s,
                  t && /* @__PURE__ */ r(
                    qc,
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
const Uc = (t, e) => t[e] ?? e;
function Pp({
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
  const w = Uc(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, u] = T(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), i && n.find((x) => x === g) && i([...n.filter((x) => x !== g)]), u(!1);
  }, f = (g, x) => {
    var y, N, _, k, z, L;
    const v = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return v ? `${(z = t[g]) == null ? void 0 : z.autonym} (${v})` : (L = t[g]) == null ? void 0 : L.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Oe,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ r(ye, { children: /* @__PURE__ */ r(Ie, {}) }),
          /* @__PURE__ */ r(
            Ne,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Rt, { value: g, children: f(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(mt, { className: "tw-font-normal tw-text-muted-foreground", children: he(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => f(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Hc({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(mt, { children: e(t) }) : n ? /* @__PURE__ */ r(mt, { children: n(t) }) : /* @__PURE__ */ r(mt, { children: t });
}
function $p({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Tr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      Hc,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function Lp({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: i,
  children: s,
  dropdownContent: l,
  additionalSelectedContent: c,
  accentColor: w
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (u) => {
        (u.key === "Enter" || u.key === " ") && (u.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: m(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: s }),
            e && l && /* @__PURE__ */ d(ke, { children: [
              /* @__PURE__ */ r(ze, { className: m(w && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(uo, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: l })
            ] })
          ] }),
          e && c && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: c })
        ] }),
        w && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`
          }
        )
      ]
    },
    t
  );
}
const Yc = nn(({ className: t, ...e }, n) => /* @__PURE__ */ r(Ps, { size: 35, className: m("tw-animate-spin", t), ...e, ref: n }));
Yc.displayName = "Spinner";
function Vp({
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
  value: p,
  onChange: u,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ d("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      mt,
      {
        htmlFor: t,
        className: m({
          "tw-text-red-600": n,
          "tw-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Be,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: m(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: u,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: m({ "tw-hidden": !a }), children: a })
  ] });
}
const Xc = we(
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
), Wc = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: m(
      // CUSTOM
      "pr-twp",
      Xc({ variant: e }),
      t
    ),
    ...n
  }
));
Wc.displayName = "Alert";
const Jc = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ d(
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
Jc.displayName = "AlertTitle";
const Zc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Zc.displayName = "AlertDescription";
const jp = st.Root, zp = st.Trigger, Fp = st.Group, Bp = st.Portal, Gp = st.Sub, Kp = st.RadioGroup, Qc = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ d(
  st.SubTrigger,
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
      /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Qc.displayName = st.SubTrigger.displayName;
const td = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
td.displayName = st.SubContent.displayName;
const ed = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(st.Portal, { children: /* @__PURE__ */ r(
  st.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
ed.displayName = st.Content.displayName;
const nd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Item,
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
nd.displayName = st.Item.displayName;
const rd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ d(
  st.CheckboxItem,
  {
    ref: a,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
rd.displayName = st.CheckboxItem.displayName;
const od = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ d(
  st.RadioItem,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
od.displayName = st.RadioItem.displayName;
const ad = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Label,
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
ad.displayName = st.Label.displayName;
const sd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
sd.displayName = st.Separator.displayName;
function id({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
id.displayName = "ContextMenuShortcut";
const Za = b.createContext({
  direction: "bottom"
});
function ld({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Za.Provider, { value: o, children: /* @__PURE__ */ r(
    Vt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
ld.displayName = "Drawer";
const qp = Vt.Trigger, wd = Vt.Portal, Up = Vt.Close, Qa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Vt.Overlay,
  {
    ref: n,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Qa.displayName = Vt.Overlay.displayName;
const cd = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = b.useContext(Za), s = {
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
  return /* @__PURE__ */ d(wd, { children: [
    /* @__PURE__ */ r(Qa, {}),
    /* @__PURE__ */ d(
      Vt.Content,
      {
        ref: a,
        className: m(
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
cd.displayName = "DrawerContent";
function dd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
dd.displayName = "DrawerHeader";
function pd({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
pd.displayName = "DrawerFooter";
const ud = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Vt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ud.displayName = Vt.Title.displayName;
const md = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Vt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
md.displayName = Vt.Description.displayName;
const fd = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Qn.Root,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Qn.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
fd.displayName = Qn.Root.displayName;
function Hp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    mr.PanelGroup,
    {
      className: m(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Yp = mr.Panel;
function Xp({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    mr.PanelResizeHandle,
    {
      className: m(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r($s, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Wp({ ...t }) {
  return /* @__PURE__ */ r(
    Gi,
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
const hd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ d(
    qe.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(qe.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(qe.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(qe.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
hd.displayName = qe.Root.displayName;
const gd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    tr.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        tr.Thumb,
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
gd.displayName = tr.Root.displayName;
const Jp = _t.Root, bd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    _t.List,
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
bd.displayName = _t.List.displayName;
const vd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Trigger,
  {
    ref: n,
    className: m(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
vd.displayName = _t.Trigger.displayName;
const xd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
xd.displayName = _t.Content.displayName;
const yd = b.forwardRef(
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
yd.displayName = "Textarea";
const Zp = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Nd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const kd = (t, e, n = {}) => {
  const o = X(e);
  o.current = e;
  const a = X(n);
  a.current = Nd(a.current);
  const [i, s] = T(() => o.current), [l, c] = T(!0);
  return q(() => {
    let w = !0;
    return c(!!t), (async () => {
      if (t) {
        const p = await t();
        w && (s(() => p), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, Un = () => !1, Qp = (t, e) => {
  const [n] = kd(
    G(async () => {
      if (!t) return Un;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Un,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== Un && n();
  }, [n]);
};
function tu(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function _d(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
_d(`*, ::before, ::after {
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
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
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
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

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

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
  Wc as Alert,
  Zc as AlertDescription,
  Jc as AlertTitle,
  va as Avatar,
  xa as AvatarFallback,
  yw as AvatarImage,
  Jd as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Zd as BOOK_SELECTOR_STRING_KEYS,
  De as Badge,
  Wd as BookChapterControl,
  ol as BookSelectionMode,
  Qd as BookSelector,
  B as Button,
  ep as COMMENT_EDITOR_STRING_KEYS,
  np as COMMENT_LIST_STRING_KEYS,
  ga as Card,
  ba as CardContent,
  vw as CardDescription,
  xw as CardFooter,
  gw as CardHeader,
  bw as CardTitle,
  rl as ChapterRangeSelector,
  Tr as Checkbox,
  $p as Checklist,
  nr as ComboBox,
  te as Command,
  on as CommandEmpty,
  Zt as CommandGroup,
  je as CommandInput,
  Gt as CommandItem,
  ee as CommandList,
  tp as CommentEditor,
  rp as CommentList,
  jp as ContextMenu,
  rd as ContextMenuCheckboxItem,
  ed as ContextMenuContent,
  Fp as ContextMenuGroup,
  nd as ContextMenuItem,
  ad as ContextMenuLabel,
  Bp as ContextMenuPortal,
  Kp as ContextMenuRadioGroup,
  od as ContextMenuRadioItem,
  sd as ContextMenuSeparator,
  id as ContextMenuShortcut,
  Gp as ContextMenuSub,
  td as ContextMenuSubContent,
  Qc as ContextMenuSubTrigger,
  zp as ContextMenuTrigger,
  jw as DataTable,
  ld as Drawer,
  Up as DrawerClose,
  cd as DrawerContent,
  md as DrawerDescription,
  pd as DrawerFooter,
  dd as DrawerHeader,
  Qa as DrawerOverlay,
  wd as DrawerPortal,
  ud as DrawerTitle,
  qp as DrawerTrigger,
  ke as DropdownMenu,
  Xt as DropdownMenuCheckboxItem,
  de as DropdownMenuContent,
  ya as DropdownMenuGroup,
  yn as DropdownMenuItem,
  Bw as DropdownMenuItemType,
  an as DropdownMenuLabel,
  Nw as DropdownMenuPortal,
  _w as DropdownMenuRadioGroup,
  _a as DropdownMenuRadioItem,
  Fe as DropdownMenuSeparator,
  Cw as DropdownMenuShortcut,
  kw as DropdownMenuSub,
  ka as DropdownMenuSubContent,
  Na as DropdownMenuSubTrigger,
  ze as DropdownMenuTrigger,
  zw as ERROR_DUMP_STRING_KEYS,
  ap as ERROR_POPOVER_STRING_KEYS,
  Fw as ErrorDump,
  sp as ErrorPopover,
  pp as FOOTNOTE_EDITOR_STRING_KEYS,
  cp as Filter,
  ip as FilterDropdown,
  wp as Footer,
  dp as FootnoteEditor,
  ac as FootnoteItem,
  up as FootnoteList,
  xp as INVENTORY_STRING_KEYS,
  Be as Input,
  yp as Inventory,
  mt as Label,
  Ww as MARKER_MENU_STRING_KEYS,
  op as MarkdownRenderer,
  Zw as MarkerMenu,
  lp as MoreInfo,
  Kw as MultiSelectComboBox,
  Op as NavigationContentSearch,
  ne as Popover,
  Wi as PopoverAnchor,
  Kt as PopoverContent,
  ce as PopoverTrigger,
  fd as Progress,
  gr as RadioGroup,
  bn as RadioGroupItem,
  Ji as RecentSearches,
  Xp as ResizableHandle,
  Yp as ResizablePanel,
  Hp as ResizablePanelGroup,
  Lp as ResultsCard,
  _p as SCOPE_SELECTOR_STRING_KEYS,
  Cp as ScopeSelector,
  kp as ScriptureResultsViewer,
  Ep as ScrollGroupSelector,
  Sr as SearchBar,
  Oe as Select,
  Ne as SelectContent,
  Tw as SelectGroup,
  Rt as SelectItem,
  Dw as SelectLabel,
  Ea as SelectScrollDownButton,
  Ca as SelectScrollUpButton,
  Mw as SelectSeparator,
  ye as SelectTrigger,
  Ie as SelectValue,
  Me as Separator,
  Rp as SettingsList,
  Sp as SettingsListHeader,
  Tp as SettingsListItem,
  Sc as SettingsSidebar,
  Np as SettingsSidebarContentSearch,
  Da as Sidebar,
  Oa as SidebarContent,
  vc as SidebarFooter,
  ir as SidebarGroup,
  yc as SidebarGroupAction,
  wr as SidebarGroupContent,
  lr as SidebarGroupLabel,
  bc as SidebarHeader,
  gc as SidebarInput,
  Ma as SidebarInset,
  Ia as SidebarMenu,
  kc as SidebarMenuAction,
  _c as SidebarMenuBadge,
  Pa as SidebarMenuButton,
  Aa as SidebarMenuItem,
  Cc as SidebarMenuSkeleton,
  Ec as SidebarMenuSub,
  Tc as SidebarMenuSubButton,
  Rc as SidebarMenuSubItem,
  Sa as SidebarProvider,
  hc as SidebarRail,
  xc as SidebarSeparator,
  fc as SidebarTrigger,
  sr as Skeleton,
  hd as Slider,
  Wp as Sonner,
  Yc as Spinner,
  gd as Switch,
  cr as TabDropdownMenu,
  Mp as TabFloatingMenu,
  Dp as TabToolbar,
  Sn as Table,
  Mn as TableBody,
  Vw as TableCaption,
  xe as TableCell,
  Aw as TableFooter,
  en as TableHead,
  Dn as TableHeader,
  Yt as TableRow,
  Jp as Tabs,
  xd as TabsContent,
  bd as TabsList,
  vd as TabsTrigger,
  Vp as TextField,
  yd as Textarea,
  kr as ToggleGroup,
  We as ToggleGroupItem,
  Ap as Toolbar,
  At as Tooltip,
  St as TooltipContent,
  Tt as TooltipProvider,
  Pt as TooltipTrigger,
  Pp as UiLanguageSelector,
  Fa as VerticalTabs,
  Ga as VerticalTabsContent,
  Ba as VerticalTabsList,
  jc as VerticalTabsTrigger,
  hw as badgeVariants,
  qo as buttonVariants,
  m as cn,
  vp as getBookIdFromUSFM,
  On as getInventoryHeader,
  gp as getLinesFromUSFM,
  bp as getNumberFromUSFM,
  cc as getStatusForItem,
  Ip as getToolbarOSReservedSpaceClassName,
  fp as inventoryCountColumn,
  mp as inventoryItemColumn,
  hp as inventoryStatusColumn,
  Sw as selectTriggerVariants,
  ru as sonner,
  Zp as useEvent,
  Qp as useEventAsync,
  fw as useListbox,
  kd as usePromise,
  Xd as useRecentSearches,
  In as useSidebar,
  tu as useStylesheet
};
//# sourceMappingURL=index.js.map
