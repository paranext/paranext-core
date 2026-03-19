var ps = Object.defineProperty;
var us = (t, e, n) => e in t ? ps(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => us(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as d, Fragment as ct } from "react/jsx-runtime";
import b, { forwardRef as nn, useRef as Y, useMemo as F, useState as R, useCallback as K, useLayoutEffect as Zt, createContext as _n, useContext as fr, useEffect as q, Component as ms, createElement as Vr, Suspense as fs, Fragment as mo } from "react";
import { Command as kt } from "cmdk";
import { X as $e, Search as fo, Check as Vt, Clock as jr, ChevronsLeft as zr, ChevronsRight as Fr, ChevronLeft as Xn, ChevronRight as Se, ArrowLeft as hs, ArrowRight as gs, Circle as Cn, ChevronDown as Le, BoldIcon as bs, ItalicIcon as vs, AtSign as ho, Pencil as xs, Trash2 as ys, ArrowUp as go, MoreHorizontal as Ns, MailOpen as ks, Mail as _s, ChevronUp as bo, FilterIcon as Cs, ArrowLeftIcon as Es, ChevronLeftIcon as Ts, ChevronRightIcon as Rs, ArrowRightIcon as Ss, Copy as vo, Filter as Ds, User as Ms, Link as Is, CircleHelp as Os, ChevronsUpDown as xo, Star as As, SquareX as yo, FunctionSquare as No, SquareSigma as ko, Ban as Ps, AlertCircle as Wn, CircleCheckIcon as $s, CircleXIcon as Ls, CircleHelpIcon as Vs, ArrowUpIcon as js, ArrowDownIcon as zs, PanelLeft as Fs, PanelRight as Bs, ScrollText as Ks, MenuIcon as Gs, Menu as qs, EllipsisVertical as Us, MoreVertical as Br, LoaderCircle as Hs, GripVertical as Ys } from "lucide-react";
import { clsx as Xs } from "clsx";
import { extendTailwindMerge as Ws } from "tailwind-merge";
import * as Et from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as wn, Section as U, getChaptersForBook as Js, formatScrRef as ve, getSectionForBook as He, formatRelativeDate as Zs, formatReplacementString as be, sanitizeHtml as Qs, NumberFormat as ti, formatBytes as ei, getCurrentLocale as ni, usfmMarkers as mn, getFormatCallerFunction as ri, deepEqual as oi, isString as Kr, compareScrRefs as Jn, scrRefToBBBCCCVVV as Pn, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as Ve } from "@radix-ui/react-slot";
import { cva as pe } from "class-variance-authority";
import * as De from "@radix-ui/react-popover";
import * as _o from "@radix-ui/react-label";
import * as Ze from "@radix-ui/react-radio-group";
import { createEditor as Co, $getRoot as le, $createParagraphNode as En, $getSelection as Lt, HISTORY_MERGE_TAG as hr, ParagraphNode as Eo, TextNode as To, $isTokenOrSegmented as ai, $getCharacterOffsets as si, $cloneWithPropertiesEphemeral as ii, $findMatchingParent as Ro, $isElementNode as se, $isRangeSelection as Ne, CLEAR_EDITOR_COMMAND as So, COMMAND_PRIORITY_EDITOR as Do, mergeRegister as we, shallowMergeConfig as li, defineExtension as Gt, safeCast as rn, createState as wi, FORMAT_TEXT_COMMAND as Mo, $isNodeSelection as Io, COMMAND_PRIORITY_LOW as Oo, RootNode as ci, LineBreakNode as di, TabNode as pi, $isEditorState as ui, createCommand as mi, CLICK_COMMAND as fi, isDOMNode as hi, $getNodeFromDOMNode as gi, $createNodeSelection as bi, $setSelection as vi, DecoratorNode as Zn, $getState as xi, toggleTextFormatType as Gr, TEXT_TYPE_TO_FORMAT as yi, $setState as Ni, addClassNamesToElement as Ao, $create as ki, $getNodeByKey as _i, removeClassNamesFromElement as Ci, KEY_TAB_COMMAND as Ei, $isBlockElementNode as gn, $createRangeSelection as Ti, $normalizeSelection__EXPERIMENTAL as Ri, OUTDENT_CONTENT_COMMAND as Si, INDENT_CONTENT_COMMAND as qr, INSERT_TAB_COMMAND as Di, COMMAND_PRIORITY_CRITICAL as gr, $isDecoratorNode as Mi, $isParagraphNode as Ii, $isTextNode as bn, SELECTION_CHANGE_COMMAND as Po, getRegisteredNode as Oi, isHTMLElement as Ai, isDocumentFragment as Ur, isDOMDocumentNode as Pi, ArtificialNode__DO_NOT_USE as $o, $createLineBreakNode as Lo, $isRootOrShadowRoot as $i, isBlockDomNode as Hr, isInlineDomNode as Yr, $insertNodes as Li } from "lexical";
import * as je from "@radix-ui/react-tooltip";
import { TooltipTrigger as Vi } from "@radix-ui/react-tooltip";
import { HeadingNode as ji, QuoteNode as zi, registerRichText as Fi } from "@lexical/rich-text";
import { flushSync as Bi, createPortal as Ki } from "react-dom";
import { $isTableSelection as Gi } from "@lexical/table";
import * as Tn from "@radix-ui/react-toggle-group";
import * as Vo from "@radix-ui/react-toggle";
import { createHeadlessEditor as jo } from "@lexical/headless";
import * as zo from "@radix-ui/react-separator";
import * as ze from "@radix-ui/react-avatar";
import * as ot from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as qi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Fo, getFilteredRowModel as Ui, getSortedRowModel as Bo, getPaginationRowModel as Hi, getCoreRowModel as Ko, flexRender as Ye, getGroupedRowModel as Yi, getExpandedRowModel as Xi } from "@tanstack/react-table";
import * as lt from "@radix-ui/react-select";
import Wi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Qn, HIDDEN_NOTE_CALLER as tr, getDefaultViewOptions as Ji, isInsertEmbedOpOfType as cn, Editorial as Zi } from "@eten-tech-foundation/platform-editor";
import * as er from "@radix-ui/react-checkbox";
import * as _t from "@radix-ui/react-tabs";
import * as at from "@radix-ui/react-menubar";
import { useHotkeys as Qi } from "react-hotkeys-hook";
import * as st from "@radix-ui/react-context-menu";
import { Drawer as jt } from "vaul";
import * as nr from "@radix-ui/react-progress";
import * as br from "react-resizable-panels";
import { Toaster as tl } from "sonner";
import { toast as ku } from "sonner";
import * as Ue from "@radix-ui/react-slider";
import * as rr from "@radix-ui/react-switch";
const el = Ws({ prefix: "tw-" });
function m(...t) {
  return el(Xs(t));
}
const nl = "layoutDirection";
function dt() {
  const t = localStorage.getItem(nl);
  return t === "rtl" ? t : "ltr";
}
const rl = Et.Root, dp = Et.Trigger, ol = Et.Portal, pp = Et.Close, Go = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Overlay,
  {
    ref: n,
    className: m(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Go.displayName = Et.Overlay.displayName;
const qo = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = dt();
  return /* @__PURE__ */ d(ol, { children: [
    /* @__PURE__ */ r(Go, {}),
    /* @__PURE__ */ d(
      Et.Content,
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
            Et.Close,
            {
              className: m(
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
qo.displayName = Et.Content.displayName;
function Uo({ className: t, ...e }) {
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
Uo.displayName = "DialogHeader";
function al({ className: t, ...e }) {
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
al.displayName = "DialogFooter";
const Ho = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ho.displayName = Et.Title.displayName;
const sl = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
sl.displayName = Et.Description.displayName;
const ee = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
ee.displayName = kt.displayName;
const Fe = b.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(fo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
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
Fe.displayName = kt.Input.displayName;
const ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.List,
  {
    ref: n,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ne.displayName = kt.List.displayName;
const on = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
on.displayName = kt.Empty.displayName;
const Qt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Qt.displayName = kt.Group.displayName;
const Yo = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Yo.displayName = kt.Separator.displayName;
const qt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
qt.displayName = kt.Item.displayName;
function Xo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Xo.displayName = "CommandShortcut";
const Wo = (t, e, n, o, a) => {
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
}, il = (t, e, n, o, a) => {
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
function Re(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function vr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Jo = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), xe = Object.fromEntries(
  Jo.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function xr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = wt.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(wn(a.toLowerCase(), o) || wn(t.toLowerCase(), o) || (i ? wn(i.localizedName.toLowerCase(), o) || wn(i.localizedId.toLowerCase(), o) : !1));
}
const Zo = nn(
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
    const p = Y(!1), f = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (x) => {
      p.current = !0, o ? o(x) : n == null || n(t);
    }, u = F(
      () => Re(t, l),
      [t, l]
    ), g = F(
      () => vr(t, l),
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
          qt,
          {
            ref: w,
            value: c || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${wt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Vt,
                {
                  className: m(
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
), Qo = pe(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ve : "button", { className: m(Qo({ variant: e, size: n, className: t })), ref: i, ...a })
);
B.displayName = "Button";
const an = 250, ta = 300, ll = 400, up = 450, mp = 500, re = De.Root, ue = De.Trigger, wl = De.Anchor, Ut = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, i) => {
  const s = dt();
  return /* @__PURE__ */ r(De.Portal, { children: /* @__PURE__ */ r(
    De.Content,
    {
      ref: i,
      align: e,
      sideOffset: n,
      className: m(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: an, ...o },
      ...a,
      dir: s
    }
  ) });
});
Ut.displayName = De.Content.displayName;
function or(t, e, n) {
  return `${t} ${xe[t]}${e ? ` ${vr(t, e)} ${Re(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function cl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: c = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: w = "ghost"
}) {
  const [p, f] = R(!1);
  if (t.length === 0)
    return;
  const h = (u) => {
    e(u), f(!1);
  };
  return /* @__PURE__ */ d(re, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      B,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(jr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Ut, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(Qt, { heading: i, children: t.map((u) => /* @__PURE__ */ d(
      qt,
      {
        onSelect: () => h(u),
        className: m("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(jr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function fp(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const $n = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, dl = [
  $n.BOOK_ONLY,
  $n.BOOK_CHAPTER,
  $n.BOOK_CHAPTER_VERSE
];
function Xr(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Kt(t) {
  return Js(wt.bookIdToNumber(t));
}
function pl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = dl.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let p;
        const f = e.filter((h) => xr(h, l, n));
        if (f.length === 1 && ([p] = f), !p && c) {
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
        if (!p && c) {
          const u = ((g) => Object.keys(xe).find(
            (x) => xe[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > Kt(p) && (h = Math.max(Kt(p), 1));
          const u = w ? parseInt(w, 10) : void 0;
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
function ul(t, e, n, o) {
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
        const w = e[c - 1], p = Math.max(Kt(w), 1);
        o({
          book: w,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = K(() => {
    const c = Kt(t.book);
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
  return F(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? zr : Fr
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Xn : Se
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Se : Xn
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Kt(t.book) || Kt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Fr : zr
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
function Wr({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Kt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      qt,
      {
        value: `${t} ${xe[t] || ""} ${s}`,
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
function hp({
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
  const w = dt(), [p, f] = R(!1), [h, u] = R(""), [g, x] = R(""), [v, y] = R("books"), [N, _] = R(void 0), [k, z] = R(!1), j = Y(void 0), $ = Y(void 0), D = Y(void 0), C = Y(void 0), T = Y({}), L = K(
    (E) => {
      e(E), l && l(E);
    },
    [e, l]
  ), V = F(() => o ? o() : Jo, [o]), O = F(() => ({
    [U.OT]: V.filter((X) => wt.isBookOT(X)),
    [U.NT]: V.filter((X) => wt.isBookNT(X)),
    [U.DC]: V.filter((X) => wt.isBookDC(X)),
    [U.Extra]: V.filter((X) => wt.extraBooks().includes(X))
  }), [V]), A = F(() => Object.values(O).flat(), [O]), H = F(() => {
    if (!g.trim()) return O;
    const E = {
      [U.OT]: [],
      [U.NT]: [],
      [U.DC]: [],
      [U.Extra]: []
    };
    return [U.OT, U.NT, U.DC, U.Extra].forEach((nt) => {
      E[nt] = O[nt].filter((rt) => xr(rt, g, a));
    }), E;
  }, [O, g, a]), M = F(
    () => pl(g, A, a),
    [g, A, a]
  ), W = K(() => {
    M && (L({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), f(!1), x(""), u(""));
  }, [L, M]), Ct = K(
    (E) => {
      if (Kt(E) <= 1) {
        L({
          book: E,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), x("");
        return;
      }
      _(E), y("chapters");
    },
    [L]
  ), Mt = K(
    (E) => {
      const X = v === "chapters" ? N : M == null ? void 0 : M.book;
      X && (L({
        book: X,
        chapterNum: E,
        verseNum: 1
      }), f(!1), y("books"), _(void 0), x(""));
    },
    [L, v, N, M]
  ), It = K(
    (E) => {
      L(E), f(!1), x("");
    },
    [L]
  ), pt = ul(t, A, w, e), P = K(() => {
    y("books"), _(void 0), setTimeout(() => {
      $.current && $.current.focus();
    }, 0);
  }, []), S = K(
    (E) => {
      if (!E && v === "chapters") {
        P();
        return;
      }
      f(E), E && (y("books"), _(void 0), x(""));
    },
    [v, P]
  ), { otLong: G, ntLong: Z, dcLong: Q, extraLong: it } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, xt = K(
    (E) => Wo(E, G, Z, Q, it),
    [G, Z, Q, it]
  ), ut = K(
    (E) => M ? !!M.chapterNum && !E.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), yt = F(
    () => ve(
      t,
      a ? Re(t.book, a) : "English"
    ),
    [t, a]
  ), Ot = K((E) => (X) => {
    T.current[E] = X;
  }, []), ht = K((E) => {
    (E.key === "Home" || E.key === "End") && E.stopPropagation();
  }, []), gt = K(
    (E) => {
      if (E.ctrlKey) return;
      const { isLetter: X, isDigit: nt } = Xr(E.key);
      if (v === "chapters") {
        if (E.key === "Backspace") {
          E.preventDefault(), E.stopPropagation(), P();
          return;
        }
        if (X || nt) {
          if (E.preventDefault(), E.stopPropagation(), y("books"), _(void 0), nt && N) {
            const rt = xe[N];
            x(`${rt} ${E.key}`);
          } else
            x(E.key);
          setTimeout(() => {
            $.current && $.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(E.key)) {
        const rt = v === "chapters" ? N : M == null ? void 0 : M.book;
        if (!rt) return;
        const mt = (() => {
          if (!h) return 1;
          const me = h.match(/(\d+)$/);
          return me ? parseInt(me[1], 10) : 0;
        })(), Xt = Kt(rt);
        if (!Xt) return;
        let Nt = mt;
        const ln = 6;
        switch (E.key) {
          case "ArrowLeft":
            mt !== 0 && (Nt = mt > 1 ? mt - 1 : Xt);
            break;
          case "ArrowRight":
            mt !== 0 && (Nt = mt < Xt ? mt + 1 : 1);
            break;
          case "ArrowUp":
            Nt = mt === 0 ? Xt : Math.max(1, mt - ln);
            break;
          case "ArrowDown":
            Nt = mt === 0 ? 1 : Math.min(Xt, mt + ln);
            break;
          default:
            return;
        }
        Nt !== mt && (E.preventDefault(), E.stopPropagation(), u(or(rt, a, Nt)), setTimeout(() => {
          const me = T.current[Nt];
          me && me.scrollIntoView({ block: "nearest", behavior: "smooth" });
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
  ), Yt = K((E) => {
    if (E.shiftKey || E.key === "Tab" || E.key === " ") return;
    const { isLetter: X, isDigit: nt } = Xr(E.key);
    (X || nt) && (E.preventDefault(), x((rt) => rt + E.key), $.current.focus(), z(!1));
  }, []);
  return Zt(() => {
    const E = setTimeout(() => {
      if (p && v === "books" && D.current && C.current) {
        const X = D.current, nt = C.current, rt = nt.offsetTop, mt = X.clientHeight, Xt = nt.clientHeight, Nt = rt - mt / 2 + Xt / 2;
        X.scrollTo({
          top: Math.max(0, Nt),
          behavior: "smooth"
        }), u(or(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(E);
    };
  }, [p, v, g, M, t.book]), Zt(() => {
    if (v === "chapters" && N) {
      const E = N === t.book;
      setTimeout(() => {
        if (D.current)
          if (E) {
            const X = T.current[t.chapterNum];
            X && X.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            D.current.scrollTo({ top: 0 });
        j.current && j.current.focus();
      }, 0);
    }
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ d(re, { open: p, onOpenChange: S, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
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
    /* @__PURE__ */ r(Ut, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      ee,
      {
        ref: j,
        onKeyDown: gt,
        loop: !0,
        value: h,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Fe,
                {
                  ref: $,
                  value: g,
                  onValueChange: x,
                  onKeyDown: ht,
                  onFocus: () => z(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                cl,
                {
                  recentSearches: s,
                  onSearchItemSelect: It,
                  renderItem: (E) => ve(E, "English"),
                  getItemKey: (E) => `${E.book}-${E.chapterNum}-${E.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: pt.map(({ onClick: E, disabled: X, title: nt, icon: rt }) => /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  z(!0), E();
                },
                disabled: X,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: nt,
                onKeyDown: Yt,
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
                children: w === "ltr" ? /* @__PURE__ */ r(hs, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Re(N, a) })
          ] }),
          !k && /* @__PURE__ */ d(ne, { ref: D, children: [
            v === "books" && /* @__PURE__ */ d(ct, { children: [
              !M && Object.entries(H).map(([E, X]) => {
                if (X.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Qt, { heading: xt(E), children: X.map((nt) => /* @__PURE__ */ r(
                      Zo,
                      {
                        bookId: nt,
                        onSelect: (rt) => Ct(rt),
                        section: He(nt),
                        commandValue: `${nt} ${xe[nt]}`,
                        ref: nt === t.book ? C : void 0,
                        localizedBookNames: a
                      },
                      nt
                    )) }, E)
                  );
              }),
              M && /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r(
                qt,
                {
                  value: `${M.book} ${xe[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: W,
                  className: "tw-font-semibold tw-text-primary",
                  children: ve(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? vr(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && Kt(M.book) > 1 && /* @__PURE__ */ d(ct, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Re(M.book, a) }),
                /* @__PURE__ */ r(
                  Wr,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Mt,
                    setChapterRef: Ot,
                    isChapterDimmed: ut,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && N && /* @__PURE__ */ r(
              Wr,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: Mt,
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
const gp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), ml = pe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ft = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(_o.Root, { ref: n, className: m("pr-twp", ml(), t), ...e }));
ft.displayName = _o.Root.displayName;
const yr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
  return /* @__PURE__ */ r(
    Ze.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
yr.displayName = Ze.Root.displayName;
const vn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ze.Item,
  {
    ref: n,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Ze.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Cn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
vn.displayName = Ze.Item.displayName;
function fl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function ar({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = fl,
  getButtonLabel: w,
  icon: p = void 0,
  buttonPlaceholder: f = "",
  textPlaceholder: h = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: v = !1,
  ariaLabel: y,
  ...N
}) {
  const [_, k] = R(!1), z = w ?? c, j = (D) => D.length > 0 && typeof D[0] == "object" && "options" in D[0], $ = (D, C) => {
    const T = c(D), L = typeof D == "object" && "secondaryLabel" in D ? D.secondaryLabel : void 0, V = `${C ?? ""}${T}${L ?? ""}`;
    return /* @__PURE__ */ d(
      qt,
      {
        value: T,
        onSelect: () => {
          l(D), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Vt,
            {
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || c(s) !== T
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            T,
            L && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              L
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ d(re, { open: _, onOpenChange: k, ...N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
      B,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": y,
        id: t,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: p }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? z(s) : f
              }
            )
          ] }),
          /* @__PURE__ */ r(Le, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Ut,
      {
        align: x,
        className: m("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ d(ee, { children: [
          /* @__PURE__ */ r(Fe, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(on, { children: u }),
          /* @__PURE__ */ r(ne, { children: j(e) ? e.map((D) => /* @__PURE__ */ r(Qt, { heading: D.groupHeading, children: D.options.map((C) => $(C, D.groupHeading)) }, D.groupHeading)) : e.map((D) => $(D)) })
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
  chapterCount: i
}) {
  const s = F(
    () => Array.from({ length: i }, (w, p) => p + 1),
    [i]
  );
  return /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ r(ft, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      ar,
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
    /* @__PURE__ */ r(ft, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      ar,
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
var sr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(sr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(sr || (sr = {}));
const bp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ln = (t, e) => t[e] ?? e;
function vp({
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
  const p = Ln(w, "%webView_bookSelector_currentBook%"), f = Ln(w, "%webView_bookSelector_choose%"), h = Ln(w, "%webView_bookSelector_chooseBooks%"), [u, g] = R(
    "current book"
    /* CurrentBook */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    yr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(vn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            hl,
            {
              isDisabled: u === "choose books",
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
            /* @__PURE__ */ r(vn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: o.map((v) => wt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            B,
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
const ea = _n(null);
function gl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ht() {
  const t = fr(ea);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const na = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bl = na ? Zt : q, dn = { tag: hr };
function vl({ initialConfig: t, children: e }) {
  const n = F(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = gl(null, o), p = Co({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (f) => s(f, p), theme: o });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const u = le();
          if (u.isEmpty()) {
            const g = En();
            u.append(g);
            const x = na ? document.activeElement : null;
            (Lt() !== null || x !== null && x === f.getRootElement()) && g.select();
          }
        }, dn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = f.parseEditorState(h);
            f.setEditorState(u, dn);
            break;
          }
          case "object":
            f.setEditorState(h, dn);
            break;
          case "function":
            f.update(() => {
              le().isEmpty() && h(f);
            }, dn);
        }
      }
    }(p, l), [p, w];
  }, []);
  return bl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ea.Provider, { value: n, children: e });
}
const xl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function yl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Ht();
  return xl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(hr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const Nr = {
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
}, St = je.Provider, Pt = je.Root, $t = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  je.Trigger,
  {
    ref: o,
    className: e ? m(Qo({ variant: e }), t) : t,
    ...n
  }
));
$t.displayName = je.Trigger.displayName;
const Dt = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  je.Content,
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
Dt.displayName = je.Content.displayName;
const kr = [
  ji,
  Eo,
  To,
  zi
], Nl = _n(null), Vn = {
  didCatch: !1,
  error: null
};
class kl extends ms {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Vn;
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
      }), this.setState(Vn);
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
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Vn);
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
        l = Vr(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Vr(Nl.Provider, {
      value: {
        didCatch: i,
        error: s,
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
const El = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function Tl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Rl() {
  return function(t) {
    const [e] = Ht(), n = F(() => t(e), [e, t]), [o, a] = R(() => n.initialValueFn()), i = Y(o);
    return El(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(Tl);
}
function Sl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ai(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), p = e.is(c);
    if (w || p) {
      const [f, h] = si(t), u = l.is(c), g = e.is(s ? c : l), x = e.is(s ? l : c);
      let v, y = 0;
      u ? (y = f > h ? h : f, v = f > h ? f : h) : g ? (y = s ? h : f, v = void 0) : x && (y = 0, v = s ? f : h);
      const N = e.__text.slice(y, v);
      N !== e.__text && (n === "clone" && (e = ii(e)), e.__text = N);
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
function Il(t) {
  const e = Ro(t, (n) => se(n) && !n.isInline());
  return se(e) || Dl(4, t.__key), e;
}
function Ol(t) {
  const e = Lt();
  if (!Ne(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Ro(i, (w) => se(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !n.has(c) && (n.add(c), t(l));
  }
  return n.size > 0;
}
const Al = Symbol.for("preact-signals");
function Rn() {
  if (ie > 1) return void ie--;
  let t, e = !1;
  for (; Xe !== void 0; ) {
    let n = Xe;
    for (Xe = void 0, ir++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && oa(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (ir = 0, ie--, e) throw t;
}
function Pl(t) {
  if (ie > 0) return t();
  ie++;
  try {
    return t();
  } finally {
    Rn();
  }
}
let J, Xe;
function Jr(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let ie = 0, ir = 0, fn = 0;
function Zr(t) {
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
function he(t, e) {
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = fn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function $l(t, e) {
  return new he(t, e);
}
function sa(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    ie++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, _r(t), o;
    } finally {
      J = n, Rn();
    }
  }
}
function _r(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, sa(t);
}
function Ll(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  aa(this), J = t, this.f &= -2, 8 & this.f && _r(this), Rn();
}
function Te(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ce(t, e) {
  const n = new Te(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Sn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = Qe(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
vt.prototype.brand = Al, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Jr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Jr(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, vt.prototype.subscribe = function(t) {
  return ce(() => {
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
  const t = Zr(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ir > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, fn++, ie++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Rn();
    }
  }
} }), he.prototype = new vt(), he.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === fn)) return !0;
  if (this.g = fn, this.f |= 1, this.i > 0 && !oa(this)) return this.f &= -2, !0;
  const t = J;
  try {
    Qr(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, aa(this), this.f &= -2, !0;
}, he.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  vt.prototype.S.call(this, t);
}, he.prototype.U = function(t) {
  if (this.t !== void 0 && (vt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, he.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(he.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Zr(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Te.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Te.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, sa(this), Qr(this), ie++;
  const t = J;
  return J = this, Ll.bind(this, t);
}, Te.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Xe, Xe = this);
}, Te.prototype.d = function() {
  this.f |= 8, 1 & this.f || _r(this);
}, Te.prototype.dispose = function() {
  this.d();
};
Gt({ build: (t, e, n) => Sn(e), config: rn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return ce(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ia() {
  const t = le(), e = Lt(), n = En();
  t.clear(), t.append(n), e !== null && n.select(), Ne(e) && (e.format = 0);
}
function la(t, e = ia) {
  return t.registerCommand(So, (n) => (t.update(e), !0), Do);
}
Gt({ build: (t, e, n) => Sn(e), config: rn({ $onClear: ia }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return ce(() => la(t, o.value));
} });
function Vl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const jn = wi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class wa extends Zn {
  $config() {
    return this.config("decorator-text", { extends: Zn, stateConfigs: [{ flat: !0, stateConfig: jn }] });
  }
  getFormat() {
    return xi(this, jn);
  }
  getFormatFlags(e, n) {
    return Gr(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = yi[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Ni(this, jn, e);
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
Gt({ name: "@lexical/extension/DecoratorText", nodes: () => [wa], register: (t, e, n) => t.registerCommand(Mo, (o) => {
  const a = Lt();
  if (Io(a) || Ne(a)) for (const i of a.getNodes()) jl(i) && i.toggleFormat(o);
  return !1;
}, Oo) });
function ca(t, e) {
  let n;
  return Qe(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const lr = Gt({ build: (t) => ca(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
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
const Cr = 0, wr = 1, pa = 2, zn = 3, pn = 4, Ee = 5, Fn = 6, Ge = 7;
function Bn(t) {
  return t.id === Cr;
}
function ua(t) {
  return t.id === pa;
}
function zl(t) {
  return function(e) {
    return e.id === wr;
  }(t) || et(305, String(t.id), String(wr)), Object.assign(t, { id: pa });
}
const Fl = /* @__PURE__ */ new Set();
class Bl {
  constructor(e, n) {
    bt(this, "builder");
    bt(this, "configs");
    bt(this, "_dependency");
    bt(this, "_peerNameSet");
    bt(this, "extension");
    bt(this, "state");
    bt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Cr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : li;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    ua(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: zn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: pn, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== pn && et(307, String(n.id), String(Ee)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Ee, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Ee && et(308, String(o.id), String(Ee));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Fn });
    }(o), () => {
      const i = this.state;
      i.id !== Ge && et(309, String(o.id), String(Ge)), this.state = function(s) {
        return Object.assign(s, { id: Ee });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Fn && et(310, String(n.id), String(Fn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
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
      return n.id >= pn;
    }(e) || et(313, String(e.id), String(pn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= zn;
    }(e) || et(314, String(e.id), String(zn)), { config: e.config };
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
        return n.id >= Ee;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const to = { tag: hr };
function Kl() {
  const t = le();
  t.isEmpty() && t.append(En());
}
const Gl = Gt({ config: rn({ setOptions: to, updateOptions: to }), init: ({ $initialEditorState: t = Kl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (ui(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [ci, To, di, pi, Eo] }), eo = Symbol.for("@lexical/extension/LexicalBuilder");
function no() {
}
function ql(t) {
  throw t;
}
function un(t) {
  return Array.isArray(t) ? t : [t];
}
const Kn = "0.41.0+prod.esm";
class We {
  constructor(e) {
    bt(this, "roots");
    bt(this, "extensionNameMap");
    bt(this, "outgoingConfigEdges");
    bt(this, "incomingEdges");
    bt(this, "conflicts");
    bt(this, "_sortedExtensionReps");
    bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Kn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [un(Gl)];
    for (const o of e) n.push(un(o));
    return new We(n);
  }
  static maybeFromEditor(e) {
    const n = e[eo];
    return n && (n.PACKAGE_VERSION !== Kn && et(292, n.PACKAGE_VERSION, Kn), n instanceof We || et(293)), n;
  }
  static fromEditor(e) {
    const n = We.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Co({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [eo]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
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
    return e = we(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const n = un(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new Bl(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && et(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && et(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = un(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (ua(i)) return;
      const s = o.extension.name;
      var l;
      Bn(i) || et(300, s, a || "[unknown]"), Bn(l = i) || et(304, String(l.id), String(Cr)), i = Object.assign(l, { id: wr }), o.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, s);
      }
      i = zl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Bn(o.state) && n(o);
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
    return we(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: f } = p;
      if (f.onError !== void 0 && (e.onError = f.onError), f.disableEvents !== void 0 && (e.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (e.parentEditor = f.parentEditor), f.editable !== void 0 && (e.editable = f.editable), f.namespace !== void 0 && (e.namespace = f.namespace), f.$initialEditorState !== void 0 && (e.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of Vl(f)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && et(302, f.name, h.replace.name, u.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, u] of f.html.export.entries()) a.set(h, u);
        f.html.import && Object.assign(i, f.html.import);
      }
      f.theme && da(s, f.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = ql), e;
  }
}
const Ul = /* @__PURE__ */ new Set(), ro = Gt({ build(t, e, n) {
  const o = n.getDependency(lr).output, a = Qe({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ca(() => {
  }, () => ce(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Lt()) for (const [p, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(p);
          continue;
        }
        const h = _i(p), u = h && h.isSelected() || !1;
        w = w || u !== (!!s && s.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = $l(() => (i.value || Ul).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [lr], name: "@lexical/extension/NodeSelection" });
mi("INSERT_HORIZONTAL_RULE_COMMAND");
class Me extends Zn {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Me(e.__key);
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
    return Ao(n, e.theme.hr), n;
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
  return ki(Me);
}
function Yl(t) {
  return t instanceof Me;
}
Gt({ dependencies: [lr, ro], name: "@lexical/extension/HorizontalRule", nodes: () => [Me], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(ro).output, a = Qe({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return we(t.registerCommand(fi, (s) => {
    if (hi(s.target)) {
      const l = gi(s.target);
      if (Yl(l)) return function(c, w = !1) {
        const p = Lt(), f = c.isSelected(), h = c.getKey();
        let u;
        w && Io(p) ? u = p : (u = bi(), vi(u)), f ? u.delete(h) : u.add(h);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Oo), t.registerMutationListener(Me, (s, l) => {
    Pl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, f] of s.entries()) if (f === "destroyed") w.delete(p), c = !0;
      else {
        const h = w.get(p), u = t.getElementByKey(p);
        h ? h.domNode.value = u : (c = !0, w.set(p, { domNode: Qe(u), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), ce(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(ce(() => {
      const w = l.value;
      w && (c.value ? Ao(w, i) : Ci(w, i));
    }));
    return we(...s);
  }));
} });
function fa(t) {
  return t.canBeEmpty();
}
function Xl(t, e, n = fa) {
  return we(t.registerCommand(Ei, (o) => {
    const a = Lt();
    if (!Ne(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => gn(h) && h.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, p = w.getNode(), f = Il(p);
      if (f.canIndent()) {
        const h = f.getKey();
        let u = Ti();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = Ri(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Si : qr : Di;
    return t.dispatchCommand(i, void 0);
  }, Do), t.registerCommand(qr, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Lt();
    if (!Ne(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return Ol((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, gr));
}
Gt({ build: (t, e, n) => Sn(e), config: rn({ $canIndent: fa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return ce(() => {
    if (!o.value) return Xl(t, a, i);
  });
} });
const Wl = Gt({ name: "@lexical/react/ReactProvider" });
function Jl() {
  return le().getTextContent();
}
function Zl(t, e = !0) {
  if (t) return !1;
  let n = Jl();
  return e && (n = n.trim()), n === "";
}
function Ql(t) {
  if (!Zl(t, !1)) return !1;
  const e = le().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Mi(a)) return !1;
    if (se(a)) {
      if (!Ii(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!bn(c)) return !1;
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
            const [w, p, f, h, u] = c;
            t.update(() => {
              const g = Lt();
              if (Ne(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (bn(v) && w >= 0 && p >= 0 && (y = w, N = w + p, g.setTextNodeRange(v, y, v, N)), y === N && f === "" || (g.insertRawText(f), v = x.getNode()), bn(v)) {
                  y = h, N = h + u;
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
Gt({ build: (t, e, n) => Sn(e), config: rn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => ce(() => n.getOutput().disabled.value ? void 0 : ga(t)) });
function tw(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Er = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function ew({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = R(() => n.getDecorators());
    return Er(() => n.registerDecoratorListener((s) => {
      Bi(() => {
        i(s);
      });
    }), [n]), q(() => {
      i(n.getDecorators());
    }, [n]), F(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (h) => n._onError(h), children: r(fs, { fallback: null, children: a[w] }) }), f = n.getElementByKey(w);
        f !== null && s.push(Ki(p, f, w));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function nw({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = We.maybeFromEditor(n);
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
  const [o] = Ht();
  return function(a) {
    Er(() => we(Fi(a), ga(a)), [a]);
  }(o), d(ct, { children: [t, r(ow, { content: e }), r(nw, { editor: o, ErrorBoundary: n })] });
}
function ow({ content: t }) {
  const [e] = Ht(), n = function(a) {
    const [i, s] = R(() => oo(a));
    return Er(() => {
      function l() {
        const c = oo(a);
        s(c);
      }
      return l(), we(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = Rl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function aw({ defaultSelection: t }) {
  const [e] = Ht();
  return q(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const sw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function iw({ onClear: t }) {
  const [e] = Ht();
  return sw(() => la(e, t), [e, t]), null;
}
const ba = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function lw({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: f, ariaRequired: h, autoCapitalize: u, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...z }, j) {
  const [$, D] = R(t.isEditable()), C = K((L) => {
    L && L.ownerDocument && L.ownerDocument.defaultView ? t.setRootElement(L) : t.setRootElement(null);
  }, [t]), T = F(() => /* @__PURE__ */ function(...L) {
    return (V) => {
      for (const O of L) typeof O == "function" ? O(V) : O != null && (O.current = V);
    };
  }(j, C), [C, j]);
  return ba(() => (D(t.isEditable()), t.registerEditableListener((L) => {
    D(L);
  })), [t]), r("div", { "aria-activedescendant": $ ? e : void 0, "aria-autocomplete": $ ? n : "none", "aria-controls": $ ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": $ && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": $ ? f : void 0, "aria-readonly": !$ || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: $, "data-testid": k, id: x, ref: T, role: v, spellCheck: y, style: N, tabIndex: _, ...z });
}
const ww = nn(lw);
function ao(t) {
  return t.getEditorState().read(ha(t.isComposing()));
}
const cw = nn(dw);
function dw(t, e) {
  const { placeholder: n, ...o } = t, [a] = Ht();
  return d(ct, { children: [r(ww, { editor: a, ...o, ref: e }), n != null && r(pw, { editor: a, content: n })] });
}
function pw({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = R(() => ao(s));
    return ba(() => {
      function w() {
        const p = ao(s);
        c(p);
      }
      return w(), we(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, a] = R(e.isEditable());
  if (Zt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
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
const va = _n(void 0);
function mw({
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
  return /* @__PURE__ */ r(va.Provider, { value: s, children: i });
}
function xa() {
  const t = fr(va);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function fw() {
  const [t, e] = R(void 0), n = K(() => {
    e(void 0);
  }, []), o = F(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(rl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(qo, { children: [
      /* @__PURE__ */ r(Uo, { children: /* @__PURE__ */ r(Ho, { children: i }) }),
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
function hw({
  children: t
}) {
  const [e] = Ht(), [n, o] = R(e), [a, i] = R("paragraph"), [s, l] = fw(), c = () => {
  };
  return q(() => n.registerCommand(
    Po,
    (w, p) => (o(p), !1),
    gr
  ), [n]), /* @__PURE__ */ d(
    mw,
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
function gw(t) {
  const [e] = Ht(), { activeEditor: n } = xa();
  q(() => n.registerCommand(
    Po,
    () => {
      const o = Lt();
      return o && t(o), !1;
    },
    gr
  ), [e, t]), q(() => {
    n.getEditorState().read(() => {
      const o = Lt();
      o && t(o);
    });
  }, [n, t]);
}
const ya = pe(
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
  Vo.Root,
  {
    ref: a,
    className: m(ya({ variant: e, size: n, className: t })),
    ...o
  }
));
bw.displayName = Vo.Root.displayName;
const Na = b.createContext({
  size: "default",
  variant: "default"
}), Tr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = dt();
  return /* @__PURE__ */ r(
    Tn.Root,
    {
      ref: i,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
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
Tr.displayName = Tn.Root.displayName;
const Je = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = b.useContext(Na);
  return /* @__PURE__ */ r(
    Tn.Item,
    {
      ref: i,
      className: m(
        ya({
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
Je.displayName = Tn.Item.displayName;
const so = [
  { format: "bold", icon: bs, label: "Bold" },
  { format: "italic", icon: vs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function vw() {
  const { activeEditor: t } = xa(), [e, n] = R([]), o = K((a) => {
    if (Ne(a) || Gi(a)) {
      const i = [];
      so.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return gw(o), /* @__PURE__ */ r(
    Tr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: so.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        Je,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Mo, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function xw({ onClear: t }) {
  const [e] = Ht();
  q(() => {
    t && t(() => {
      e.dispatchCommand(So, void 0);
    });
  }, [e, t]);
}
function yw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = R(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(hw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(vw, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        rw,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
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
  theme: Nr,
  nodes: kr,
  onError: (t) => {
    console.error(t);
  }
};
function xn({
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
          vl,
          {
            initialConfig: {
              ...Nw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ d(St, { children: [
              /* @__PURE__ */ r(yw, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                yl,
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
function kw(t, e) {
  const n = Pi(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!_a.has(i.nodeName)) {
    const s = Ca(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof $o && s.insertAfter(Lo());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), o;
}
function _w(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = le().getChildren();
  for (let a = 0; a < o.length; a++)
    ka(t, o[a], n, e);
  return n.innerHTML;
}
function ka(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = se(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && bn(e) && (s = Sl(o, e, "clone"));
  const l = se(s) ? s.getChildren() : [], c = Oi(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: p, after: f } = w;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = ka(t, g, h, o);
    !a && se(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Ai(p) || Ur(p)) && p.append(h), n.append(p), f) {
      const u = f.call(s, p);
      u && (Ur(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const _a = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ca(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (_a.has(t.nodeName)) return s;
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
  const f = t.childNodes;
  let h = [];
  const u = (l == null || !$i(l)) && (l != null && gn(l) || o);
  for (let g = 0; g < f.length; g++) h.push(...Ca(f[g], e, n, u, new Map(a), l));
  return p != null && (h = p(h)), Hr(t) && (h = Cw(t, h, u ? () => {
    const g = new $o();
    return n.push(g), g;
  } : En)), l == null ? h.length > 0 ? s = s.concat(h) : Hr(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Yr(g.nextSibling) && Yr(g.previousSibling);
  }(t) && (s = s.concat(Lo())) : se(l) && l.append(...h), s;
}
function Cw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (gn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && gn(e[s + 1])) {
      const c = n();
      c.setFormat(o), c.append(...i), a.push(c), i = [];
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
function At(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ta(t.root.children) : !1;
}
function Ew(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = jo({
    namespace: "EditorUtils",
    theme: Nr,
    nodes: kr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = kw(e, a);
      le().clear(), Li(i);
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
function yn(t) {
  const e = jo({
    namespace: "EditorUtils",
    theme: Nr,
    nodes: kr,
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
function Rr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function hn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Sr(t) {
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
function Gn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function xp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = R(Tw), [s, l] = R(void 0), [c, w] = R(!1), p = Y(void 0), f = Y(null);
  q(() => {
    let y = !0;
    const N = f.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && Ea(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
  const h = K(() => {
    if (!At(a)) return;
    const y = yn(a);
    e(y, s);
  }, [a, e, s]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(B, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r($e, {}) }) }),
          /* @__PURE__ */ r(Dt, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
            B,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !At(a),
              children: /* @__PURE__ */ r(Vt, {})
            }
          ) }),
          /* @__PURE__ */ r(Dt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(re, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
        B,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(ho, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Gn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Ut,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(ne, { children: t.map((y) => /* @__PURE__ */ r(
            qt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Gn(y, o) })
            },
            y || "unassigned"
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
        onKeyDownCapture: (y) => {
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : Sr(y) && (y.preventDefault(), y.stopPropagation(), At(a) && h());
        },
        onKeyDown: (y) => {
          Rr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          xn,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => i(y),
            placeholder: u,
            onClear: (y) => {
              p.current = y;
            }
          }
        )
      }
    )
  ] });
}
const yp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Np = [
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
  const a = Y(null), [i, s] = R(void 0), [l, c] = R(void 0), w = K(
    (u) => {
      s(u);
      const g = t.find((v) => v.id === u);
      g && (e == null || e(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), p = K(
    (u) => {
      const g = t.find((x) => x.id === u);
      g && (c((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Rw.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && Sw.includes(x)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = K(
    (u) => {
      var $;
      const g = u.target, x = (D) => D ? document.getElementById(D) : void 0, v = x(l), y = x(i);
      if (!!(v && g && v.contains(g) && g !== v) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const D = t.find((C) => C.id === l);
            D && w(D.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!v) return;
          const D = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const C = D.findIndex((L) => L === g);
          if (C === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(C + 1, D.length - 1) : T = Math.max(C - 1, 0), T !== C && (u.preventDefault(), u.stopPropagation(), ($ = D[T]) == null || $.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((D) => D.id === i);
      let z = k;
      switch (u.key) {
        case "ArrowDown":
          z = Math.min(k + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(k - 1, 0), u.preventDefault();
          break;
        case "Home":
          z = 0, u.preventDefault();
          break;
        case "End":
          z = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && p(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const D = y;
          if (D) {
            const C = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), L = C ?? T;
            if (L) {
              u.preventDefault(), L.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const j = t[z];
      j && w(j.id);
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
}, Mw = pe(
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
), Ie = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", Mw({ variant: e }), t), ...n })
);
Ie.displayName = "Badge";
const Ra = b.forwardRef(
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
Ra.displayName = "Card";
const Iw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Iw.displayName = "CardHeader";
const Ow = b.forwardRef(
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
Ow.displayName = "CardTitle";
const Aw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Aw.displayName = "CardDescription";
const Sa = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Sa.displayName = "CardContent";
const Pw = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Pw.displayName = "CardFooter";
const Oe = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  zo.Root,
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
Oe.displayName = zo.Root.displayName;
const Da = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Root,
  {
    ref: n,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Da.displayName = ze.Root.displayName;
const $w = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Image,
  {
    ref: n,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
$w.displayName = ze.Image.displayName;
const Ma = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Fallback,
  {
    ref: n,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ma.displayName = ze.Fallback.displayName;
const Dr = _n(void 0);
function zt() {
  const t = fr(Dr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const oe = pe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ke = ot.Trigger, Ia = ot.Group, Lw = ot.Portal, Vw = ot.Sub, jw = ot.RadioGroup;
function de({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Dr.Provider, { value: n, children: /* @__PURE__ */ r(ot.Root, { ...e }) });
}
const Oa = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = zt();
  return /* @__PURE__ */ d(
    ot.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        oe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Oa.displayName = ot.SubTrigger.displayName;
const Aa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = dt();
  return /* @__PURE__ */ r(
    ot.SubContent,
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
Aa.displayName = ot.SubContent.displayName;
const te = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = dt();
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
te.displayName = ot.Content.displayName;
const Nn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = dt(), i = zt();
  return /* @__PURE__ */ r(
    ot.Item,
    {
      ref: o,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        oe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Nn.displayName = ot.Item.displayName;
const Jt = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = dt(), s = zt();
  return /* @__PURE__ */ d(
    ot.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        oe({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Jt.displayName = ot.CheckboxItem.displayName;
const Pa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = dt(), i = zt();
  return /* @__PURE__ */ d(
    ot.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        oe({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Pa.displayName = ot.RadioItem.displayName;
const sn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
sn.displayName = ot.Label.displayName;
const Be = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Be.displayName = ot.Separator.displayName;
function zw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
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
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = R(!1), [p, f] = R(), h = Y(null);
  q(() => {
    if (!c) return;
    let k = !0;
    const z = h.current;
    if (!z) return;
    const j = setTimeout(() => {
      k && Ea(z);
    }, 300);
    return () => {
      k = !1, clearTimeout(j);
    };
  }, [c]);
  const u = K(
    (k) => {
      k && k.stopPropagation(), w(!1), f(void 0), s == null || s(!1);
    },
    [s]
  ), g = K(
    async (k) => {
      if (k && k.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        yn(p)
      ) && (w(!1), f(void 0), s == null || s(!1));
    },
    [p, a, t.id, s]
  ), x = F(() => {
    const k = new Date(t.date), z = Zs(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), j = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return be(n["%comment_dateAtTime%"], {
      date: z,
      time: j
    });
  }, [t.date, n]), v = F(() => t.user, [t.user]), y = F(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = F(() => Qs(t.contents), [t.contents]), _ = F(() => {
    if (o && l)
      return /* @__PURE__ */ d(ct, { children: [
        /* @__PURE__ */ d(
          Nn,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), f(Ew(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(xs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          Nn,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
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
        /* @__PURE__ */ r(Da, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ma, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ d(Ie, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              hn(t.assignedUser, n)
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
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : Sr(k) && (k.preventDefault(), k.stopPropagation(), At(p) && g());
              },
              onKeyDown: (k) => {
                Rr(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  xn,
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
                    onSerializedChange: (k) => f(k)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r($e, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !At(p),
                      children: /* @__PURE__ */ r(go, {})
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
        _ && /* @__PURE__ */ d(de, { children: [
          /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ns, {}) }) }),
          /* @__PURE__ */ r(te, { align: "end", children: _ })
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
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: p,
  handleAddCommentToThread: f,
  handleUpdateComment: h,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: z = 5,
  onVerseRefClick: j
}) {
  const [$, D] = R(lo), [C, T] = R(
    void 0
  ), L = o, [V, O] = R(!1), [A, H] = R(!1), [M, W] = R(!1), [Ct, Mt] = R(!1), [It, pt] = R(!1), [P, S] = R(k), [G, Z] = R(!1), Q = Y(void 0), [it, xt] = R(/* @__PURE__ */ new Map());
  q(() => {
    let I = !0;
    return (async () => {
      const Tt = N ? await N(c) : !1;
      I && pt(Tt);
    })(), () => {
      I = !1;
    };
  }, [c, N]), q(() => {
    let I = !0;
    if (!o) {
      Mt(!1), xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Tt = y ? await y(c) : !1;
      I && Mt(Tt);
    })(), () => {
      I = !1;
    };
  }, [o, c, y]);
  const ut = F(() => e.filter((I) => !I.deleted), [e]);
  q(() => {
    let I = !0;
    if (!o || !_) {
      xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Tt = /* @__PURE__ */ new Map();
      await Promise.all(
        ut.map(async (Lr) => {
          const ds = await _(Lr.id);
          I && Tt.set(Lr.id, ds);
        })
      ), I && xt(Tt);
    })(), () => {
      I = !1;
    };
  }, [o, ut, _]);
  const yt = F(() => ut[0], [ut]), Ot = Y(null), ht = Y(void 0), gt = K(() => {
    var I;
    (I = ht.current) == null || I.call(ht), D(lo);
  }, []), Yt = K(() => {
    const I = !P;
    S(I), Z(!I), g == null || g(c, I);
  }, [P, g, c]);
  q(() => {
    O(!1);
  }, [o]), q(() => {
    if (o && !P && !G) {
      const I = setTimeout(() => {
        S(!0), g == null || g(c, !0);
      }, z * 1e3);
      return Q.current = I, () => clearTimeout(I);
    }
    Q.current && (clearTimeout(Q.current), Q.current = void 0);
  }, [o, P, G, z, c, g]);
  const E = F(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), X = F(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const I = hn(i, n);
    return be(n["%comment_assigned_to%"], {
      assignedUser: I
    });
  }, [i, n]), nt = F(() => ut.slice(1), [ut]), rt = F(() => nt.length ?? 0, [nt.length]), mt = F(() => rt > 0, [rt]), Xt = F(() => V || rt <= 2 ? nt : nt.slice(-2), [nt, rt, V]), Nt = F(() => V || rt <= 2 ? 0 : rt - 2, [rt, V]), ln = F(
    () => rt === 1 ? E.singleReply : be(E.multipleReplies, { count: rt }),
    [rt, E]
  ), me = F(
    () => Nt === 1 ? E.singleReply : be(E.multipleReplies, { count: Nt }),
    [Nt, E]
  );
  q(() => {
    !o && A && mt && H(!1);
  }, [o, A, mt]);
  const Pr = K(
    async (I) => {
      I && I.stopPropagation();
      const Ft = At($) ? yn($) : void 0;
      if (C !== void 0) {
        await f({
          threadId: c,
          contents: Ft,
          assignedUser: C
        }) && (T(void 0), Ft && gt());
        return;
      }
      Ft && await f({ threadId: c, contents: Ft }) && gt();
    },
    [
      gt,
      $,
      f,
      C,
      c
    ]
  ), $r = K(
    async (I) => {
      const Ft = At($) ? yn($) : void 0, Tt = await f({
        ...I,
        contents: Ft,
        assignedUser: C ?? I.assignedUser
      });
      return Tt && Ft && gt(), Tt && C !== void 0 && T(void 0), Tt;
    },
    [gt, $, f, C]
  );
  return /* @__PURE__ */ r(
    Ra,
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
          "tw-bg-accent": !P && !o && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(Sa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            X && /* @__PURE__ */ r(Ie, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
            /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: (I) => {
                  I.stopPropagation(), Yt();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": P ? "Mark as unread" : "Mark as read",
                children: P ? /* @__PURE__ */ r(ks, {}) : /* @__PURE__ */ r(_s, {})
              }
            ),
            It && p !== "Resolved" && /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: m(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (I) => {
                  I.stopPropagation(), $r({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" })
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
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": L
                },
                { "tw-whitespace-nowrap": !L }
              ),
              children: [
                a && j ? /* @__PURE__ */ r(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (I) => {
                      I.stopPropagation(), j(w);
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
            io,
            {
              comment: yt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: $r,
              handleUpdateComment: h,
              handleDeleteComment: u,
              onEditingChange: H,
              canEditOrDelete: (!A && it.get(yt.id)) ?? !1,
              canUserResolveThread: It
            }
          )
        ] }),
        /* @__PURE__ */ d(ct, { children: [
          mt && !o && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Oe, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: ln })
          ] }),
          !o && At($) && /* @__PURE__ */ r(
            xn,
            {
              editorSerializedState: $,
              onSerializedChange: (I) => D(I),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ d(ct, { children: [
            Nt > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (I) => {
                  I.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (I) => {
                  (I.key === "Enter" || I.key === " ") && (I.preventDefault(), I.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Oe, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: me }),
                    V ? /* @__PURE__ */ r(bo, {}) : /* @__PURE__ */ r(Le, {})
                  ] })
                ]
              }
            ),
            Xt.map((I) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              io,
              {
                comment: I,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: u,
                onEditingChange: H,
                canEditOrDelete: (!A && it.get(I.id)) ?? !1
              }
            ) }, I.id)),
            v !== !1 && (!A || At($)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (I) => I.stopPropagation(),
                onKeyDownCapture: (I) => {
                  Sr(I) && (I.preventDefault(), I.stopPropagation(), (At($) || C !== void 0) && Pr());
                },
                onKeyDown: (I) => {
                  Rr(I), (I.key === "Enter" || I.key === " ") && I.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    xn,
                    {
                      editorSerializedState: $,
                      onSerializedChange: (I) => D(I),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (I) => {
                        ht.current = I;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: be(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: hn(
                          C,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(re, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
                        B,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !x || x.length === 0 || !x.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(ho, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Ut,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (I) => {
                            I.key === "Escape" && (I.stopPropagation(), W(!1));
                          },
                          children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(ne, { children: x == null ? void 0 : x.map((I) => /* @__PURE__ */ r(
                            qt,
                            {
                              onSelect: () => {
                                T(I !== i ? I : void 0), W(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: hn(I, n) })
                            },
                            I || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      B,
                      {
                        size: "icon",
                        onClick: Pr,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !At($) && C === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(go, {})
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
function kp({
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
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: v
}) {
  const [y, N] = R(/* @__PURE__ */ new Set()), [_, k] = R();
  q(() => {
    g && (N((O) => new Set(O).add(g)), k(g));
  }, [g]);
  const z = n.filter(
    (O) => O.comments.some((A) => !A.deleted)
  ), j = z.map((O) => ({
    id: O.id
  })), $ = K(
    (O) => {
      N((A) => new Set(A).add(O.id)), k(O.id), x == null || x(O.id);
    },
    [x]
  ), D = K(
    (O) => {
      const A = y.has(O);
      N((H) => {
        const M = new Set(H);
        return M.has(O) ? M.delete(O) : M.add(O), M;
      }), k(O), x == null || x(A ? void 0 : O);
    },
    [y, x]
  ), { listboxRef: C, activeId: T, handleKeyDown: L } = Dw({
    options: j,
    onOptionSelect: $
  }), V = K(
    (O) => {
      O.key === "Escape" ? (_ && y.has(_) && (N((A) => {
        const H = new Set(A);
        return H.delete(_), H;
      }), k(void 0), x == null || x(void 0)), O.preventDefault(), O.stopPropagation()) : L(O);
    },
    [_, y, L, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": T ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: z.map((O) => /* @__PURE__ */ r(
        "div",
        {
          id: O.id,
          className: m({
            "tw-opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Fw,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: a,
              verseRef: O.verseRef,
              handleSelectThread: D,
              threadId: O.id,
              thread: O,
              isRead: O.isRead,
              isSelected: y.has(O.id),
              currentUser: o,
              assignedUser: O.assignedUser,
              threadStatus: O.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: v
            }
          )
        },
        O.id
      ))
    }
  );
}
function Bw({ table: t }) {
  return /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(qi, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Cs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(te, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(sn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Be, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Jt,
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
const Ae = lt.Root, Kw = lt.Group, Pe = lt.Value, Gw = pe(
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
), _e = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = dt();
  return /* @__PURE__ */ d(
    lt.Trigger,
    {
      className: m(Gw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(lt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
_e.displayName = lt.Trigger.displayName;
const $a = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.ScrollUpButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(bo, { className: "tw-h-4 tw-w-4" })
  }
));
$a.displayName = lt.ScrollUpButton.displayName;
const La = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.ScrollDownButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4" })
  }
));
La.displayName = lt.ScrollDownButton.displayName;
const Ce = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = dt();
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
        /* @__PURE__ */ r($a, {}),
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
        /* @__PURE__ */ r(La, {})
      ]
    }
  ) });
});
Ce.displayName = lt.Content.displayName;
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Label,
  {
    ref: n,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
qw.displayName = lt.Label.displayName;
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
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(lt.ItemIndicator, { children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(lt.ItemText, { children: e })
    ]
  }
));
Rt.displayName = lt.Item.displayName;
const Uw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Uw.displayName = lt.Separator.displayName;
function Hw({ table: t }) {
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
        Ae,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Pe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ce, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Rt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(Es, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Ts, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Rs, { className: "tw-h-4 tw-w-4" })
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
function tn(t, e) {
  const n = e ? `${wo}, ${e}` : wo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Yw(o)
  );
}
const Dn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
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
Dn.displayName = "Table";
const Mn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
Mn.displayName = "TableHeader";
const In = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", t), ...e }));
In.displayName = "TableBody";
const Xw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
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
function Jw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Zw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Wt = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = b.useRef(null);
  b.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), Ww(s);
  const l = b.useMemo(
    () => s.current ? tn(s.current) : [],
    [s]
  ), c = b.useCallback(
    (p) => {
      const { current: f } = s;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tn(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = u.indexOf(f), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), Zw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Jw(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = f.closest("table");
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
Wt.displayName = "TableRow";
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
const ye = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
ye.displayName = "TableCell";
const Qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Qw.displayName = "TableCaption";
function cr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
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
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var j;
  const [p, f] = R([]), [h, u] = R([]), [g, x] = R({}), [v, y] = R({}), N = F(() => e ?? [], [e]), _ = Fo({
    data: N,
    columns: t,
    getCoreRowModel: Ko(),
    ...n && { getPaginationRowModel: Hi() },
    onSortingChange: f,
    getSortedRowModel: Bo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ui(),
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
  return c ? z = Array.from({ length: 10 }).map((C, T) => `skeleton-row-${T}`).map((C) => /* @__PURE__ */ r(Wt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(ye, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(cr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((j = _.getRowModel().rows) == null ? void 0 : j.length) > 0 ? z = _.getRowModel().rows.map(($) => /* @__PURE__ */ r(
    Wt,
    {
      onClick: () => s($, _),
      "data-state": $.getIsSelected() && "selected",
      children: $.getVisibleCells().map((D) => /* @__PURE__ */ r(ye, { children: Ye(D.column.columnDef.cell, D.getContext()) }, D.id))
    },
    $.id
  )) : z = /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(ye, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Bw, { table: _ }),
    /* @__PURE__ */ d(Dn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Mn, { stickyHeader: i, children: _.getHeaderGroups().map(($) => /* @__PURE__ */ r(Wt, { children: $.headers.map((D) => /* @__PURE__ */ r(en, { className: "tw-p-0", children: D.isPlaceholder ? void 0 : Ye(D.column.columnDef.header, D.getContext()) }, D.id)) }, $.id)) }),
      /* @__PURE__ */ r(In, { children: z })
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
    n && o && /* @__PURE__ */ r(Hw, { table: _ })
  ] });
}
function _p({
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
      children: /* @__PURE__ */ r(Wi, { options: i, children: e })
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
  const a = co(n, "%webView_error_dump_header%"), i = co(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(vo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const Cp = Object.freeze([
  ...ec,
  "%webView_error_dump_copied_message%"
]);
function Ep({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = R(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ d(re, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: o }),
    /* @__PURE__ */ d(Ut, { id: i, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ft, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        nc,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var rc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(rc || {});
function Tp({ id: t, label: e, groups: n }) {
  const [o, a] = R(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = R({}), l = (w, p) => {
    const f = !o[w][p];
    a((u) => (u[w][p] = f, { ...u }));
    const h = n[w].items[p];
    h.onUpdate(h.id, f);
  }, c = (w, p) => {
    s((h) => (h[w] = p, { ...h }));
    const f = n[w].items.find((h) => h.id === p);
    f ? f.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "default", children: [
      /* @__PURE__ */ r(Ds, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Le, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(te, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(sn, { children: w.label }),
      /* @__PURE__ */ r(Ia, { children: w.itemType === 0 ? /* @__PURE__ */ r(ct, { children: w.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Jt,
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ r(
        jw,
        {
          value: i[p],
          onValueChange: (f) => c(p, f),
          children: w.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Pa, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ r(Be, {})
    ] }, w.label)) })
  ] }) });
}
function Rp({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new ti("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, f) => p + f, 0)), w = () => {
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
            /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" }),
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
                /* @__PURE__ */ r(Is, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function oc({ id: t, versionHistory: e }) {
  const [n, o] = R(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, f = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
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
function Sp({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = F(() => ei(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(ni(), { type: "language" });
    return w.map((f) => p.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(oc, { versionHistory: a }),
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
function ac({
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
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = R(!1), _ = K(
    (T) => {
      var V;
      const L = (V = t.find((O) => O.label === T)) == null ? void 0 : V.value;
      L && n(
        e.includes(L) ? e.filter((O) => O !== L) : [...e, L]
      );
    },
    [t, e, n]
  ), k = () => c || o, z = F(() => {
    if (!h) return t;
    const T = t.filter((V) => V.starred).sort((V, O) => V.label.localeCompare(O.label)), L = t.filter((V) => !V.starred).sort((V, O) => {
      const A = e.includes(V.value), H = e.includes(O.value);
      return A && !H ? -1 : !A && H ? 1 : V.label.localeCompare(O.label);
    });
    return [...T, ...L];
  }, [t, e, h]), j = () => {
    n(t.map((T) => T.value));
  }, $ = () => {
    n([]);
  }, D = w ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ d(re, { open: D, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
      B,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": D,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
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
          /* @__PURE__ */ r(xo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Ut, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(ee, { children: [
      /* @__PURE__ */ r(Fe, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: j, children: i }),
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: $, children: s })
      ] }),
      /* @__PURE__ */ d(ne, { children: [
        /* @__PURE__ */ r(on, { children: l }),
        /* @__PURE__ */ r(Qt, { children: z.map((T) => /* @__PURE__ */ d(
          qt,
          {
            value: T.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Vt,
                {
                  className: m(
                    "tw-h-4 tw-w-4",
                    e.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(As, { className: "tw-h-4 tw-w-4" }),
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
function Dp({
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
  id: f
}) {
  return /* @__PURE__ */ d("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      ac,
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
      var u;
      return /* @__PURE__ */ d(Ie, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r($e, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(ft, { children: p })
  ] });
}
function sc({ children: t, editorRef: e }) {
  const n = Y(null);
  return q(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var c, w;
      a && document.activeElement === a && (o ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (c = e.current) == null || c.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (w = e.current) == null || w.undo()));
    };
    return a == null || a.addEventListener("keydown", i), () => {
      a == null || a.removeEventListener("keydown", i);
    };
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Ke = b.forwardRef(
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
Ke.displayName = "Input";
const ic = (t, e, n) => t === "generated" ? /* @__PURE__ */ d(ct, { children: [
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
function lc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = Y(null), s = Y(null), l = Y(!1), [c, w] = R(t), [p, f] = R(n), [h, u] = R(!1);
  q(() => {
    w(t);
  }, [t]), q(() => {
    p !== n && f(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (c !== "custom" || p ? (e(c), o(p)) : (w(t), f(n)));
  }, x = (v) => {
    var y, N, _, k;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = i.current) == null || y.focus(), l.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), l.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ d(de, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: ic(t, a, n) }) }) }),
      /* @__PURE__ */ r(Dt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      te,
      {
        style: { zIndex: ta },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(sn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Be, {}),
          /* @__PURE__ */ r(
            Jt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Qn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Jt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: tr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Jt,
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
                  Ke,
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
const wc = (t, e) => t === "f" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(No, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(ko, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(yo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), cc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), be(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function dc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r(Vi, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: wc(t, n) }) }) }),
      /* @__PURE__ */ r(Dt, { children: /* @__PURE__ */ r("p", { children: cc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ d(te, { style: { zIndex: ta }, children: [
      /* @__PURE__ */ r(sn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Be, {}),
      /* @__PURE__ */ d(
        Jt,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(yo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Jt,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(No, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Jt,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ko, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const pc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function uc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ps, { className: e, size: 16 });
}
function mc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = R(""), i = F(() => {
    const s = o.trim().toLowerCase();
    return s ? e.filter(
      (l) => {
        var c;
        return ((c = l.marker) == null ? void 0 : c.toLowerCase().includes(s)) || l.title.toLowerCase().includes(s);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ d(ee, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Fe,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (s) => a(s),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(ne, { children: [
      /* @__PURE__ */ r(on, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Qt, { children: i.map((s) => {
        var l;
        return /* @__PURE__ */ d(
          qt,
          {
            className: "tw-flex tw-gap-2 hover:tw-bg-accent",
            disabled: s.isDisallowed || s.isDeprecated,
            onSelect: s.action,
            children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: s.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(uc, { icon: s.icon }) }) }),
              /* @__PURE__ */ d("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: s.title }),
                s.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
              ] }),
              (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ r(Xo, { className: "tw-font-sans", children: s.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${s.marker ?? ((l = s.icon) == null ? void 0 : l.displayName)}-${s.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function fc(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = mn[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[mn[l].description] ?? mn[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function hc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function gc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const bc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Mp({
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
  const w = Y(null), p = Y(null), f = Y(null), [h, u] = R("generated"), [g, x] = R("*"), [v, y] = R("f"), [N, _] = R(!1), [k, z] = R(!1), [j, $] = R(), [D, C] = R(), [T, L] = R(), [V, O] = R(), A = Y(null), H = F(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? Ji(), noteMode: "expanded" }
    }),
    [s, l]
  ), M = F(
    () => fc(
      w,
      () => z(!1),
      c,
      V
    ),
    [c, V]
  );
  q(() => {
    var P;
    k || (P = w.current) == null || P.focus();
  }, [v, k]), q(() => {
    var G, Z;
    let P;
    const S = e == null ? void 0 : e.at(0);
    if (S && cn("note", S)) {
      const Q = (G = S.insert.note) == null ? void 0 : G.caller;
      let it = "custom";
      Q === Qn ? it = "generated" : Q === tr ? it = "hidden" : Q && x(Q), u(it), y(((Z = S.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
        var xt;
        (xt = w.current) == null || xt.applyUpdate([S]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [e, i]);
  const W = K(() => {
    var S, G;
    const P = (G = (S = w.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : G.at(0);
    P && cn("note", P) && (P.insert.note && (h === "custom" ? P.insert.note.caller = g : P.insert.note.caller = h === "generated" ? Qn : tr), n([P]));
  }, [h, g, n]), Ct = () => {
    var S;
    const P = (S = p.current) == null ? void 0 : S.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
  }, Mt = (P) => {
    var G, Z, Q, it, xt;
    y(P);
    const S = (Z = (G = w.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (S && cn("note", S)) {
      S.insert.note && (S.insert.note.style = P);
      const ut = (it = (Q = S.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : it.ops;
      v !== "x" && P === "x" ? ut == null || ut.forEach((yt) => hc(yt)) : v === "x" && P !== "x" && (ut == null || ut.forEach((yt) => gc(yt))), (xt = w.current) == null || xt.applyUpdate([S, { delete: 1 }]);
    }
  }, It = (P) => {
    var G, Z, Q, it, xt, ut;
    (G = w.current) == null || G.focus();
    const S = (Q = (Z = w.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : Q.at(0);
    if (S && cn("note", S)) {
      P.content.length > 1 && setTimeout(() => {
        var ht;
        (ht = w.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const yt = (it = S.insert.note) == null ? void 0 : it.style, Ot = (ut = (xt = S.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : ut.ops;
      yt || _(!1), _(
        yt === "x" ? !!(Ot != null && Ot.every((ht) => {
          var Yt, E;
          if (!((Yt = ht.attributes) != null && Yt.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "xt" || gt === "xo" || gt === "xq";
        })) : !!(Ot != null && Ot.every((ht) => {
          var Yt, E;
          if (!((Yt = ht.attributes) != null && Yt.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "ft" || gt === "fr" || gt === "fq";
        }))
      );
    } else
      _(!1);
  }, pt = K(() => {
    const P = window.getSelection();
    if (f.current && M.length && P && P.rangeCount > 0) {
      const S = P.getRangeAt(0).getBoundingClientRect(), G = f.current.getBoundingClientRect();
      $(S.left - G.left), C(S.top - G.top), L(S.height), z(!0);
    }
  }, [M, f]);
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
    var G;
    const P = ((G = p.current) == null ? void 0 : G.querySelector(".editor-input")) ?? void 0, S = (Z) => {
      !k && P && document.activeElement === P && Z.key === l ? (Z.preventDefault(), pt()) : k && Z.key === "Escape" && (Z.preventDefault(), z(!1));
    };
    return document.addEventListener("keydown", S), () => {
      document.removeEventListener("keydown", S);
    };
  }, [k, pt, l]), /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            dc,
            {
              isTypeSwitchable: N,
              noteType: v,
              handleNoteTypeChange: Mt,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            lc,
            {
              callerType: h,
              updateCallerType: u,
              customCaller: g,
              updateCustomCaller: x,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: o,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ r($e, {})
              }
            ) }),
            /* @__PURE__ */ r(Dt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: W,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ r(Vt, {})
              }
            ) }),
            /* @__PURE__ */ r(Dt, { children: c["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ d(
        "div",
        {
          ref: p,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(sc, { editorRef: w, children: /* @__PURE__ */ r(
              Zi,
              {
                options: H,
                onStateChange: (P) => O(P.contextMarker),
                onUsjChange: It,
                defaultUsj: bc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: w
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
              /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
                B,
                {
                  onClick: Ct,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(vo, {})
                }
              ) }),
              /* @__PURE__ */ r(Dt, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ d(re, { open: k, children: [
      /* @__PURE__ */ r(
        wl,
        {
          className: "tw-absolute",
          style: {
            top: D,
            left: j,
            height: T,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Ut,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (P) => {
            P.preventDefault(), P.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            mc,
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
const Ip = Object.freeze([
  ...pc,
  ...Object.entries(mn).map(([, t]) => t.description).filter((t) => !!t),
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
function Va(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function vc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      Mr(t, l, n, !0, a),
      w && o
    ] }, Va(t, l));
  });
}
function Mr(t, e, n = !0, o = !0, a = []) {
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
              /* @__PURE__ */ r(Wn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(Wn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return xc(
        i,
        Va(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function xc(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Wn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Mr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function yc({
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
  ] }), f = s && /* @__PURE__ */ d(ct, { children: [
    Mr(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = m(h, u);
  return /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ d("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: f }),
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(ct, { children: vc(t.marker, l, o, w) })
      }
    )
  ] });
}
function Op({
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
  const p = c ?? ri(n, void 0), f = (N, _) => {
    w == null || w(N, _, a);
  }, h = i ? n.findIndex((N) => N === i) : -1, [u, g] = R(h), x = (N, _, k) => {
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
  }, y = Y([]);
  return q(() => {
    var N;
    u >= 0 && u < y.current.length && ((N = y.current[u]) == null || N.focus());
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
          children: n.map((N, _) => {
            const k = N === i, z = `${a}-${_}`;
            return /* @__PURE__ */ d(ct, { children: [
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
                  tabIndex: _ === u ? 0 : -1,
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
                  onClick: () => f(N, _),
                  onKeyDown: (j) => x(j, N, _),
                  children: /* @__PURE__ */ r(
                    yc,
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
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Oe, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Nc(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function kc({
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
  return /* @__PURE__ */ d(Dn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Mn, { stickyHeader: !0, children: /* @__PURE__ */ d(Wt, { children: [
      /* @__PURE__ */ r(en, { children: a }),
      /* @__PURE__ */ r(en, { children: i })
    ] }) }),
    /* @__PURE__ */ r(In, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ d(
      Wt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(ye, { children: ve(l.reference, "English") }),
          /* @__PURE__ */ r(ye, { className: o, children: Nc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Ir = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  er.Root,
  {
    ref: n,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      er.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ir.displayName = er.Root.displayName;
const _c = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(js, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(zs, { className: "tw-h-4 tw-w-4" });
}, On = (t, e, n) => /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Pt, { children: [
  /* @__PURE__ */ d(
    $t,
    {
      className: m("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        _c(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Dt, { side: "bottom", children: e })
] }) }), Ap = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => On(e, t)
}), Cc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => On(n, t)
}), Pp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => On(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), qn = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), o(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, $p = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => On(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ d(Tr, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        Je,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r($s, {})
        }
      ),
      /* @__PURE__ */ r(
        Je,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r(Ls, {})
        }
      ),
      /* @__PURE__ */ r(
        Je,
        {
          onClick: (c) => {
            c.stopPropagation(), qn(
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
          children: /* @__PURE__ */ r(Vs, {})
        }
      )
    ] });
  }
}), Lp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Vp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, jp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ec = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", zp = Object.freeze([
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
]), Tc = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Rc = (t, e, n) => t.map((o) => {
  const a = Kr(o.key) ? o.key : o.key[0];
  return {
    items: Kr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Ec(a, e, n),
    occurrences: o.occurrences || []
  };
}), Bt = (t, e) => t[e] ?? e;
function Fp({
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
  classNameForVerseText: f,
  onItemSelected: h
}) {
  const u = Bt(n, "%webView_inventory_all%"), g = Bt(n, "%webView_inventory_approved%"), x = Bt(n, "%webView_inventory_unapproved%"), v = Bt(n, "%webView_inventory_unknown%"), y = Bt(n, "%webView_inventory_scope_currentBook%"), N = Bt(n, "%webView_inventory_scope_chapter%"), _ = Bt(n, "%webView_inventory_scope_verse%"), k = Bt(n, "%webView_inventory_filter_text%"), z = Bt(
    n,
    "%webView_inventory_show_additional_items%"
  ), j = Bt(n, "%webView_inventory_no_results%"), [$, D] = R(!1), [C, T] = R("all"), [L, V] = R(""), [O, A] = R([]), H = F(() => {
    const S = t ?? [];
    return S.length === 0 ? [] : Rc(S, a, i);
  }, [t, a, i]), M = F(() => {
    if ($) return H;
    const S = [];
    return H.forEach((G) => {
      const Z = G.items[0], Q = S.find(
        (it) => it.items[0] === Z
      );
      Q ? (Q.count += G.count, Q.occurrences = Q.occurrences.concat(G.occurrences)) : S.push({
        items: [Z],
        count: G.count,
        occurrences: G.occurrences,
        status: G.status
      });
    }), S;
  }, [$, H]), W = F(() => M.length === 0 ? [] : Tc(M, C, L), [M, C, L]), Ct = F(() => {
    var Z, Q;
    if (!$) return c;
    const S = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
    if (!S) return c;
    const G = [];
    for (let it = 0; it < S; it++)
      G.push(
        Cc(
          ((Q = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Q[it]) || "Additional Item",
          it + 1
        )
      );
    return [...G, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, $]);
  q(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const Mt = (S, G) => {
    G.setRowSelection(() => {
      const Q = {};
      return Q[S.index] = !0, Q;
    });
    const Z = S.original.items;
    A(Z), h && Z.length > 0 && h(Z[0]);
  }, It = (S) => {
    if (S === "book" || S === "chapter" || S === "verse")
      l(S);
    else
      throw new Error(`Invalid scope value: ${S}`);
  }, pt = (S) => {
    if (S === "all" || S === "approved" || S === "unapproved" || S === "unknown")
      T(S);
    else
      throw new Error(`Invalid status filter value: ${S}`);
  }, P = F(() => {
    if (M.length === 0 || O.length === 0) return [];
    const S = M.filter((G) => oi(
      $ ? G.items : [G.items[0]],
      O
    ));
    if (S.length > 1) throw new Error("Selected item is not unique");
    return S.length === 0 ? [] : S[0].occurrences;
  }, [O, $, M]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Ae,
        {
          onValueChange: (S) => pt(S),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Ce, { children: [
              /* @__PURE__ */ r(Rt, { value: "all", children: u }),
              /* @__PURE__ */ r(Rt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Rt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Rt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Ae, { onValueChange: (S) => It(S), defaultValue: s, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Ce, { children: [
          /* @__PURE__ */ r(Rt, { value: "book", children: y }),
          /* @__PURE__ */ r(Rt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Rt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ke,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: L,
          onChange: (S) => {
            V(S.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Ir,
          {
            className: "tw-m-1",
            checked: $,
            onCheckedChange: (S) => {
              D(S);
            }
          }
        ),
        /* @__PURE__ */ r(ft, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? z })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      tc,
      {
        columns: Ct,
        data: W,
        onRowClickHandler: Mt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: j
      }
    ) }),
    P.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      kc,
      {
        classNameForText: f,
        occurrenceData: P,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const Sc = "16rem", Dc = "3rem", ja = b.createContext(void 0);
function An() {
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
    children: i,
    side: s = "primary",
    ...l
  }, c) => {
    const [w, p] = b.useState(t), f = e ?? w, h = b.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(f) : _;
        n ? n(k) : p(k);
      },
      [n, f]
    ), u = b.useCallback(() => h((_) => !_), [h]), g = f ? "expanded" : "collapsed", y = dt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = b.useMemo(
      () => ({
        state: g,
        open: f,
        setOpen: h,
        toggleSidebar: u,
        side: y
      }),
      [g, f, h, u, y]
    );
    return /* @__PURE__ */ r(ja.Provider, { value: N, children: /* @__PURE__ */ r(St, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Sc,
            "--sidebar-width-icon": Dc,
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
za.displayName = "SidebarProvider";
const Fa = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = An();
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
Fa.displayName = "Sidebar";
const Mc = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = An();
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
        a.side === "primary" ? /* @__PURE__ */ r(Fs, {}) : /* @__PURE__ */ r(Bs, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Mc.displayName = "SidebarTrigger";
const Ic = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = An();
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
Ic.displayName = "SidebarRail";
const Ba = b.forwardRef(
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
Ba.displayName = "SidebarInset";
const Oc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ke,
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
Oc.displayName = "SidebarInput";
const Ac = b.forwardRef(
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
Ac.displayName = "SidebarHeader";
const Pc = b.forwardRef(
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
Pc.displayName = "SidebarFooter";
const $c = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Oe,
  {
    ref: n,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
$c.displayName = "SidebarSeparator";
const Ka = b.forwardRef(
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
Ka.displayName = "SidebarContent";
const dr = b.forwardRef(
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
dr.displayName = "SidebarGroup";
const pr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ve : "div",
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
pr.displayName = "SidebarGroupLabel";
const Lc = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ve : "button",
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
Lc.displayName = "SidebarGroupAction";
const ur = b.forwardRef(
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
ur.displayName = "SidebarGroupContent";
const Ga = b.forwardRef(
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
Ga.displayName = "SidebarMenu";
const qa = b.forwardRef(
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
qa.displayName = "SidebarMenuItem";
const Vc = pe(
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
), Ua = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const c = t ? Ve : "button", { state: w } = An(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: m(Vc({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Dt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Ua.displayName = "SidebarMenuButton";
const jc = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ve : "button",
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
jc.displayName = "SidebarMenuAction";
const zc = b.forwardRef(
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
zc.displayName = "SidebarMenuBadge";
const Fc = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(cr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          cr,
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
Fc.displayName = "SidebarMenuSkeleton";
const Bc = b.forwardRef(
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
Bc.displayName = "SidebarMenuSub";
const Kc = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Kc.displayName = "SidebarMenuSubItem";
const Gc = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ve : "a",
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
Gc.displayName = "SidebarMenuSubButton";
function qc({
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
    (h, u) => {
      o(h, u);
    },
    [o]
  ), p = K(
    (h) => {
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), f = K(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Fa,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Ka, { children: [
        /* @__PURE__ */ d(dr, { children: [
          /* @__PURE__ */ r(pr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(ur, { children: /* @__PURE__ */ r(Ga, { children: Object.entries(e).map(([h, u]) => /* @__PURE__ */ r(qa, { children: /* @__PURE__ */ r(
            Ua,
            {
              onClick: () => w(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ d(dr, { children: [
          /* @__PURE__ */ r(pr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(ur, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            ar,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: ll },
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = p(h);
                w(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Ks, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Or = nn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = dt();
    return /* @__PURE__ */ d("div", { id: s, className: m("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        fo,
        {
          className: m(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ke,
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
            /* @__PURE__ */ r($e, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Or.displayName = "SearchBar";
function Bp({
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
      Or,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      za,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            qc,
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
          /* @__PURE__ */ r(Ba, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ae = "scrBook", Uc = "scrRef", ge = "source", Hc = "details", Yc = "Scripture Reference", Xc = "Scripture Book", Ha = "Type", Wc = "Details";
function Jc(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ae,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Yc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ae ? ve(a.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Jn(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ve(o.start),
      id: Uc,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ve(a.start);
      },
      sortingFn: (o, a) => Jn(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: ge,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Ha : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Hc,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Wc,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Zc = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Jn(t.start, t.end) === 0 ? `${Pn(t.start)}+${e}` : `${Pn(t.start)}+${e}-${Pn(t.end)}+${n}`;
}, po = (t) => `${Zc({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Kp({
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
  const [w, p] = R([]), [f, h] = R([{ id: ae, desc: !1 }]), [u, g] = R({}), x = F(
    () => t.flatMap((C) => C.data.map((T) => ({
      ...T,
      source: C.source
    }))),
    [t]
  ), v = F(
    () => Jc(
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
    w.includes(ge) ? h([
      { id: ge, desc: !1 },
      { id: ae, desc: !1 }
    ]) : h([{ id: ae, desc: !1 }]);
  }, [w]);
  const y = Fo({
    data: x,
    columns: v,
    state: {
      grouping: w,
      sorting: f,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: Xi(),
    getGroupedRowModel: Yi(),
    getCoreRowModel: Ko(),
    getSortedRowModel: Bo(),
    getRowId: po,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const C = y.getSelectedRowModel().rowsById, T = Object.keys(C);
      if (T.length === 1) {
        const L = x.find((V) => po(V) === T[0]) || void 0;
        L && l(L);
      }
    }
  }, [u, x, l, y]);
  const N = a ?? Xc, _ = i ?? Ha, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [ae] },
    { label: `Group by ${_}`, value: [ge] },
    {
      label: `Group by ${N} and ${_}`,
      value: [ae, ge]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [ge, ae]
    }
  ], z = (C) => {
    p(JSON.parse(C));
  }, j = (C, T) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(T);
  }, $ = (C, T) => C.getIsGrouped() ? "" : m("banded-row", T % 2 === 0 ? "even" : "odd"), D = (C, T, L) => {
    if (!((C == null ? void 0 : C.length) === 0 || T.depth < L.column.getGroupedIndex())) {
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
    !e && /* @__PURE__ */ d(
      Ae,
      {
        value: JSON.stringify(w),
        onValueChange: (C) => {
          z(C);
        },
        children: [
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(Kw, { children: k.map((C) => /* @__PURE__ */ r(Rt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Dn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Mn, { children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(Wt, { children: C.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(en, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            B,
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
      )) }, C.id)) }),
      /* @__PURE__ */ r(In, { children: y.getRowModel().rows.map((C, T) => {
        const L = dt();
        return /* @__PURE__ */ r(
          Wt,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: m($(C, T)),
            onClick: (V) => j(C, V),
            children: C.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== ge || !n)))
                return /* @__PURE__ */ r(
                  ye,
                  {
                    className: m(
                      V.column.columnDef.id,
                      "tw-p-[1px]",
                      D(w, C, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ d(
                      B,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r(Le, {}),
                          !C.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ r(Se, {}) : /* @__PURE__ */ r(Xn, {})),
                          " ",
                          Ye(V.column.columnDef.cell, V.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ye(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Ar = (t, e) => t.filter((n) => {
  try {
    return He(n) === e;
  } catch {
    return !1;
  }
}), Ya = (t, e, n) => Ar(t, e).every((o) => n.includes(o));
function Qc({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Ar(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Ya(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: il(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const uo = 5, Un = 6;
function td({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = R(!1), [N, _] = R(""), k = Y(void 0), z = Y(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const j = F(() => wt.allBookIds.filter(
    (A, H) => t[H] === "1" && !wt.isObsolete(wt.bookIdToNumber(A))
  ), [t]), $ = F(() => {
    if (!N.trim()) {
      const M = {
        [U.OT]: [],
        [U.NT]: [],
        [U.DC]: [],
        [U.Extra]: []
      };
      return j.forEach((W) => {
        const Ct = He(W);
        M[Ct].push(W);
      }), M;
    }
    const A = j.filter(
      (M) => xr(M, N, a)
    ), H = {
      [U.OT]: [],
      [U.NT]: [],
      [U.DC]: [],
      [U.Extra]: []
    };
    return A.forEach((M) => {
      const W = He(M);
      H[W].push(M);
    }), H;
  }, [j, N, a]), D = K(
    (A, H = !1) => {
      if (!H || !k.current) {
        n(
          e.includes(A) ? e.filter((pt) => pt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = j.findIndex((pt) => pt === k.current), W = j.findIndex((pt) => pt === A);
      if (M === -1 || W === -1) return;
      const [Ct, Mt] = [
        Math.min(M, W),
        Math.max(M, W)
      ], It = j.slice(Ct, Mt + 1).map((pt) => pt);
      n(
        e.includes(A) ? e.filter((pt) => !It.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...It])]
      );
    },
    [e, n, j]
  ), C = (A) => {
    D(A, z.current), z.current = !1;
  }, T = (A, H) => {
    A.preventDefault(), D(H, A.shiftKey);
  }, L = K(
    (A) => {
      const H = Ar(j, A).map((M) => M);
      n(
        Ya(j, A, e) ? e.filter((M) => !H.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, n, j]
  ), V = () => {
    n(j.map((A) => A));
  }, O = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(U).map((A) => /* @__PURE__ */ r(
      Qc,
      {
        section: A,
        availableBookIds: j,
        selectedBookIds: e,
        onToggle: L,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ d(
      re,
      {
        open: v,
        onOpenChange: (A) => {
          y(A), A || _("");
        },
        children: [
          /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
            B,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(xo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Ut, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            ee,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (z.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Fe,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: V, children: c }),
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: O, children: w })
                ] }),
                /* @__PURE__ */ d(ne, { children: [
                  /* @__PURE__ */ r(on, { children: p }),
                  Object.values(U).map((A, H) => {
                    const M = $[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ d(mo, { children: [
                        /* @__PURE__ */ r(
                          Qt,
                          {
                            heading: Wo(A, h, u, g, x),
                            children: M.map((W) => /* @__PURE__ */ r(
                              Zo,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => C(W),
                                onMouseDown: (Ct) => T(Ct, W),
                                section: He(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: or(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        H < Object.values(U).length - 1 && /* @__PURE__ */ r(Yo, {})
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
        e.length === Un ? Un : uo
      ).map((A) => /* @__PURE__ */ r(Ie, { className: "hover:tw-bg-secondary", variant: "secondary", children: Re(A, a) }, A)),
      e.length > Un && /* @__PURE__ */ r(
        Ie,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - uo} ${f}`
        }
      )
    ] })
  ] });
}
const Gp = Object.freeze([
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
]), fe = (t, e) => t[e] ?? e;
function qp({
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
  const w = fe(
    s,
    "%webView_scope_selector_selected_text%"
  ), p = fe(
    s,
    "%webView_scope_selector_current_verse%"
  ), f = fe(
    s,
    "%webView_scope_selector_current_chapter%"
  ), h = fe(s, "%webView_scope_selector_current_book%"), u = fe(s, "%webView_scope_selector_choose_books%"), g = fe(s, "%webView_scope_selector_scope%"), x = fe(s, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], y = e ? v.filter((N) => e.includes(N.value)) : v;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: g }),
      /* @__PURE__ */ r(
        yr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(vn, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(ft, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: x }),
      /* @__PURE__ */ r(
        td,
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
const Hn = {
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
function Up({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
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
  }, c = dt();
  return /* @__PURE__ */ d(
    Ae,
    {
      value: `${e}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(_e, { size: a, className: m("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Pe,
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ce,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: an },
            children: t.map((w) => /* @__PURE__ */ r(Rt, { value: `${w}`, children: l[tt(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Hp({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Yp({
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
function Xp({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Oe, {}) : ""
  ] });
}
function Xa(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function kn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Wa = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(Pt, { children: [
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
  ) : /* @__PURE__ */ d(Vw, { children: [
    /* @__PURE__ */ r(Oa, { children: l.label }),
    /* @__PURE__ */ r(Lw, { children: /* @__PURE__ */ r(Aa, { children: Wa(
      t,
      e,
      Xa(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Dt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function mr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(de, { variant: i, children: [
    /* @__PURE__ */ r(ke, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(B, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(Gs, {}) }) }),
    /* @__PURE__ */ r(te, { align: "start", style: { zIndex: an }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(mo, { children: [
      /* @__PURE__ */ r(Ia, { children: /* @__PURE__ */ r(St, { children: Wa(e.groups, e.items, c, t) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Be, {})
    ] }, c)) })
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
function Wp({
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
  return /* @__PURE__ */ d(Ja, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      mr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(qs, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        mr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Us, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Jp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Ja, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    mr,
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
  const o = dt();
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
Za.displayName = _t.List.displayName;
const Qa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Qa.displayName = _t.List.displayName;
const ed = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), ts = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
ts.displayName = _t.Content.displayName;
function Zp({
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
        Or,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ d(Za, { children: [
      /* @__PURE__ */ r(Qa, { children: t.map((l) => /* @__PURE__ */ r(ed, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(ts, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function nd({ ...t }) {
  return /* @__PURE__ */ r(at.Menu, { ...t });
}
function rd({ ...t }) {
  return /* @__PURE__ */ r(at.Sub, { "data-slot": "menubar-sub", ...t });
}
const es = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Dr.Provider, { value: a, children: /* @__PURE__ */ r(
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
es.displayName = at.Root.displayName;
const ns = b.forwardRef(({ className: t, ...e }, n) => {
  const o = zt();
  return /* @__PURE__ */ r(
    at.Trigger,
    {
      ref: n,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        oe({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ns.displayName = at.Trigger.displayName;
const rs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = zt();
  return /* @__PURE__ */ d(
    at.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        oe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
rs.displayName = at.SubTrigger.displayName;
const os = b.forwardRef(({ className: t, ...e }, n) => {
  const o = zt();
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
os.displayName = at.SubContent.displayName;
const as = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = zt();
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
as.displayName = at.Content.displayName;
const ss = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = zt();
  return /* @__PURE__ */ r(
    at.Item,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        oe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ss.displayName = at.Item.displayName;
const od = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = zt();
  return /* @__PURE__ */ d(
    at.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        oe({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
od.displayName = at.CheckboxItem.displayName;
const ad = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = zt();
  return /* @__PURE__ */ d(
    at.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        oe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
ad.displayName = at.RadioItem.displayName;
const sd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
sd.displayName = at.Label.displayName;
const is = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
is.displayName = at.Separator.displayName;
const qe = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ls = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(Pt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        ss,
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
      ) : /* @__PURE__ */ d(rd, { children: [
        /* @__PURE__ */ r(rs, { children: w.label }),
        /* @__PURE__ */ r(os, { children: ls(
          t,
          e,
          Xa(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(Dt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ r(is, {}, `separator-${i}`)), c;
  });
};
function id({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = Y(void 0), i = Y(void 0), s = Y(void 0), l = Y(void 0), c = Y(void 0), w = (p) => {
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
  if (Qi(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        qe(i, [h]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), qe(i, [h, u]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), qe(s, [h, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), qe(l, [h, u]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), qe(c, [h, u]);
        break;
    }
  }), q(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(es, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ d(nd, { children: [
      /* @__PURE__ */ r(ns, { ref: w(p), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ r(
        as,
        {
          style: { zIndex: an },
          children: /* @__PURE__ */ r(St, { children: ls(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Qp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function tu({
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
  const p = Y(void 0);
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
                    id,
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
const ld = (t, e) => t[e] ?? e;
function eu({
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
  const w = ld(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, f] = R(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), i && n.find((x) => x === g) && i([...n.filter((x) => x !== g)]), f(!1);
  }, u = (g, x) => {
    var y, N, _, k, z, j;
    const v = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return v ? `${(z = t[g]) == null ? void 0 : z.autonym} (${v})` : (j = t[g]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Ae,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(
            Ce,
            {
              style: { zIndex: an },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Rt, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ft, { className: "tw-font-normal tw-text-muted-foreground", children: be(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function wd({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ft, { children: e(t) }) : n ? /* @__PURE__ */ r(ft, { children: n(t) }) : /* @__PURE__ */ r(ft, { children: t });
}
function nu({
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
      Ir,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      wd,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function ru({
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
  additionalSelectedContent: p,
  accentColor: f,
  showDropdownOnHover: h = !1
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
      "aria-pressed": e,
      className: m(
        "tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: s }),
            e && l,
            !e && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: c }),
            !e && h && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ d(de, { children: [
              /* @__PURE__ */ r(ke, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Br, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ d(de, { children: [
              /* @__PURE__ */ r(ke, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Br, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] })
          ] }),
          e && p && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: p })
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
const cd = nn(({ className: t, ...e }, n) => /* @__PURE__ */ r(Hs, { size: 35, className: m("tw-animate-spin", t), ...e, ref: n }));
cd.displayName = "Spinner";
function ou({
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
  onChange: f,
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ft,
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
      Ke,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: m(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: f,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: m({ "tw-hidden": !a }), children: a })
  ] });
}
const dd = pe(
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
), pd = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: m(
      // CUSTOM
      "pr-twp",
      dd({ variant: e }),
      t
    ),
    ...n
  }
));
pd.displayName = "Alert";
const ud = b.forwardRef(
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
ud.displayName = "AlertTitle";
const md = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
md.displayName = "AlertDescription";
const au = st.Root, su = st.Trigger, iu = st.Group, lu = st.Portal, wu = st.Sub, cu = st.RadioGroup, fd = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ d(
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
      /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
fd.displayName = st.SubTrigger.displayName;
const hd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
hd.displayName = st.SubContent.displayName;
const gd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(st.Portal, { children: /* @__PURE__ */ r(
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
gd.displayName = st.Content.displayName;
const bd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
bd.displayName = st.Item.displayName;
const vd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ d(
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
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
vd.displayName = st.CheckboxItem.displayName;
const xd = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ d(
  st.RadioItem,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(Cn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
xd.displayName = st.RadioItem.displayName;
const yd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
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
yd.displayName = st.Label.displayName;
const Nd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Nd.displayName = st.Separator.displayName;
function kd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
kd.displayName = "ContextMenuShortcut";
const ws = b.createContext({
  direction: "bottom"
});
function _d({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(ws.Provider, { value: o, children: /* @__PURE__ */ r(
    jt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
_d.displayName = "Drawer";
const du = jt.Trigger, Cd = jt.Portal, pu = jt.Close, cs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Overlay,
  {
    ref: n,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
cs.displayName = jt.Overlay.displayName;
const Ed = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = b.useContext(ws), s = {
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
  return /* @__PURE__ */ d(Cd, { children: [
    /* @__PURE__ */ r(cs, {}),
    /* @__PURE__ */ d(
      jt.Content,
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
Ed.displayName = "DrawerContent";
function Td({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Td.displayName = "DrawerHeader";
function Rd({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Rd.displayName = "DrawerFooter";
const Sd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Sd.displayName = jt.Title.displayName;
const Dd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Dd.displayName = jt.Description.displayName;
const Md = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  nr.Root,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      nr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Md.displayName = nr.Root.displayName;
function uu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    br.PanelGroup,
    {
      className: m(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const mu = br.Panel;
function fu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    br.PanelResizeHandle,
    {
      className: m(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(Ys, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function hu({ ...t }) {
  return /* @__PURE__ */ r(
    tl,
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
const Id = b.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
  return /* @__PURE__ */ d(
    Ue.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Ue.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Ue.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Ue.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Id.displayName = Ue.Root.displayName;
const Od = b.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
  return /* @__PURE__ */ r(
    rr.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        rr.Thumb,
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
Od.displayName = rr.Root.displayName;
const gu = _t.Root, Ad = b.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
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
Ad.displayName = _t.List.displayName;
const Pd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Pd.displayName = _t.Trigger.displayName;
const $d = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
$d.displayName = _t.Content.displayName;
const Ld = b.forwardRef(
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
Ld.displayName = "Textarea";
const bu = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Vd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const jd = (t, e, n = {}) => {
  const o = Y(e);
  o.current = e;
  const a = Y(n);
  a.current = Vd(a.current);
  const [i, s] = R(() => o.current), [l, c] = R(!0);
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
}, Yn = () => !1, vu = (t, e) => {
  const [n] = jd(
    K(async () => {
      if (!t) return Yn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Yn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== Yn && n();
  }, [n]);
};
function xu(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function zd(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
zd(`*, ::before, ::after {
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
  pd as Alert,
  md as AlertDescription,
  ud as AlertTitle,
  Da as Avatar,
  Ma as AvatarFallback,
  $w as AvatarImage,
  gp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  bp as BOOK_SELECTOR_STRING_KEYS,
  Ie as Badge,
  hp as BookChapterControl,
  sr as BookSelectionMode,
  vp as BookSelector,
  B as Button,
  yp as COMMENT_EDITOR_STRING_KEYS,
  Np as COMMENT_LIST_STRING_KEYS,
  Ra as Card,
  Sa as CardContent,
  Aw as CardDescription,
  Pw as CardFooter,
  Iw as CardHeader,
  Ow as CardTitle,
  hl as ChapterRangeSelector,
  Ir as Checkbox,
  nu as Checklist,
  ar as ComboBox,
  ee as Command,
  on as CommandEmpty,
  Qt as CommandGroup,
  Fe as CommandInput,
  qt as CommandItem,
  ne as CommandList,
  xp as CommentEditor,
  kp as CommentList,
  au as ContextMenu,
  vd as ContextMenuCheckboxItem,
  gd as ContextMenuContent,
  iu as ContextMenuGroup,
  bd as ContextMenuItem,
  yd as ContextMenuLabel,
  lu as ContextMenuPortal,
  cu as ContextMenuRadioGroup,
  xd as ContextMenuRadioItem,
  Nd as ContextMenuSeparator,
  kd as ContextMenuShortcut,
  wu as ContextMenuSub,
  hd as ContextMenuSubContent,
  fd as ContextMenuSubTrigger,
  su as ContextMenuTrigger,
  tc as DataTable,
  rl as Dialog,
  pp as DialogClose,
  qo as DialogContent,
  sl as DialogDescription,
  al as DialogFooter,
  Uo as DialogHeader,
  Go as DialogOverlay,
  ol as DialogPortal,
  Ho as DialogTitle,
  dp as DialogTrigger,
  _d as Drawer,
  pu as DrawerClose,
  Ed as DrawerContent,
  Dd as DrawerDescription,
  Rd as DrawerFooter,
  Td as DrawerHeader,
  cs as DrawerOverlay,
  Cd as DrawerPortal,
  Sd as DrawerTitle,
  du as DrawerTrigger,
  de as DropdownMenu,
  Jt as DropdownMenuCheckboxItem,
  te as DropdownMenuContent,
  Ia as DropdownMenuGroup,
  Nn as DropdownMenuItem,
  rc as DropdownMenuItemType,
  sn as DropdownMenuLabel,
  Lw as DropdownMenuPortal,
  jw as DropdownMenuRadioGroup,
  Pa as DropdownMenuRadioItem,
  Be as DropdownMenuSeparator,
  zw as DropdownMenuShortcut,
  Vw as DropdownMenuSub,
  Aa as DropdownMenuSubContent,
  Oa as DropdownMenuSubTrigger,
  ke as DropdownMenuTrigger,
  ec as ERROR_DUMP_STRING_KEYS,
  Cp as ERROR_POPOVER_STRING_KEYS,
  sc as EditorKeyboardShortcuts,
  nc as ErrorDump,
  Ep as ErrorPopover,
  Ip as FOOTNOTE_EDITOR_STRING_KEYS,
  Dp as Filter,
  Tp as FilterDropdown,
  Sp as Footer,
  Mp as FootnoteEditor,
  yc as FootnoteItem,
  Op as FootnoteList,
  zp as INVENTORY_STRING_KEYS,
  Ke as Input,
  Fp as Inventory,
  ft as Label,
  pc as MARKER_MENU_STRING_KEYS,
  _p as MarkdownRenderer,
  mc as MarkerMenu,
  Rp as MoreInfo,
  ac as MultiSelectComboBox,
  Zp as NavigationContentSearch,
  re as Popover,
  wl as PopoverAnchor,
  Ut as PopoverContent,
  ue as PopoverTrigger,
  Md as Progress,
  yr as RadioGroup,
  vn as RadioGroupItem,
  cl as RecentSearches,
  fu as ResizableHandle,
  mu as ResizablePanel,
  uu as ResizablePanelGroup,
  ru as ResultsCard,
  Gp as SCOPE_SELECTOR_STRING_KEYS,
  qp as ScopeSelector,
  Kp as ScriptureResultsViewer,
  Up as ScrollGroupSelector,
  Or as SearchBar,
  Ae as Select,
  Ce as SelectContent,
  Kw as SelectGroup,
  Rt as SelectItem,
  qw as SelectLabel,
  La as SelectScrollDownButton,
  $a as SelectScrollUpButton,
  Uw as SelectSeparator,
  _e as SelectTrigger,
  Pe as SelectValue,
  Oe as Separator,
  Hp as SettingsList,
  Xp as SettingsListHeader,
  Yp as SettingsListItem,
  qc as SettingsSidebar,
  Bp as SettingsSidebarContentSearch,
  Fa as Sidebar,
  Ka as SidebarContent,
  Pc as SidebarFooter,
  dr as SidebarGroup,
  Lc as SidebarGroupAction,
  ur as SidebarGroupContent,
  pr as SidebarGroupLabel,
  Ac as SidebarHeader,
  Oc as SidebarInput,
  Ba as SidebarInset,
  Ga as SidebarMenu,
  jc as SidebarMenuAction,
  zc as SidebarMenuBadge,
  Ua as SidebarMenuButton,
  qa as SidebarMenuItem,
  Fc as SidebarMenuSkeleton,
  Bc as SidebarMenuSub,
  Gc as SidebarMenuSubButton,
  Kc as SidebarMenuSubItem,
  za as SidebarProvider,
  Ic as SidebarRail,
  $c as SidebarSeparator,
  Mc as SidebarTrigger,
  cr as Skeleton,
  Id as Slider,
  hu as Sonner,
  cd as Spinner,
  Od as Switch,
  mr as TabDropdownMenu,
  Jp as TabFloatingMenu,
  Wp as TabToolbar,
  Dn as Table,
  In as TableBody,
  Qw as TableCaption,
  ye as TableCell,
  Xw as TableFooter,
  en as TableHead,
  Mn as TableHeader,
  Wt as TableRow,
  gu as Tabs,
  $d as TabsContent,
  Ad as TabsList,
  Pd as TabsTrigger,
  ou as TextField,
  Ld as Textarea,
  Tr as ToggleGroup,
  Je as ToggleGroupItem,
  tu as Toolbar,
  Pt as Tooltip,
  Dt as TooltipContent,
  St as TooltipProvider,
  $t as TooltipTrigger,
  eu as UiLanguageSelector,
  Za as VerticalTabs,
  ts as VerticalTabsContent,
  Qa as VerticalTabsList,
  ed as VerticalTabsTrigger,
  an as Z_INDEX_ABOVE_DOCK,
  ta as Z_INDEX_FOOTNOTE_EDITOR,
  mp as Z_INDEX_MODAL,
  up as Z_INDEX_MODAL_BACKDROP,
  ll as Z_INDEX_OVERLAY,
  Mw as badgeVariants,
  Qo as buttonVariants,
  m as cn,
  jp as getBookIdFromUSFM,
  On as getInventoryHeader,
  Lp as getLinesFromUSFM,
  Vp as getNumberFromUSFM,
  Ec as getStatusForItem,
  Qp as getToolbarOSReservedSpaceClassName,
  Pp as inventoryCountColumn,
  Ap as inventoryItemColumn,
  $p as inventoryStatusColumn,
  Gw as selectTriggerVariants,
  ku as sonner,
  bu as useEvent,
  vu as useEventAsync,
  Dw as useListbox,
  jd as usePromise,
  fp as useRecentSearches,
  An as useSidebar,
  xu as useStylesheet
};
//# sourceMappingURL=index.js.map
