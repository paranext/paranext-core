var Es = Object.defineProperty;
var Ts = (t, e, n) => e in t ? Es(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => Ts(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as w, Fragment as et } from "react/jsx-runtime";
import b, { forwardRef as an, useRef as H, useMemo as K, useState as T, useCallback as $, useLayoutEffect as ne, createContext as Tn, useContext as gr, useEffect as G, Component as Rs, createElement as Xr, Suspense as Ss, Fragment as Co } from "react";
import { Command as kt } from "cmdk";
import { X as Ve, Search as Eo, Check as zt, Clock as Wr, ChevronsLeft as Jr, ChevronsRight as Zr, ChevronLeft as Zn, ChevronRight as Oe, ArrowLeft as Ds, ArrowRight as Ms, Circle as Rn, ChevronDown as je, BoldIcon as Os, ItalicIcon as Is, AtSign as To, Pencil as As, Trash2 as Ps, ArrowUp as Ro, MoreHorizontal as So, MailOpen as Ls, Mail as $s, ChevronUp as Do, FilterIcon as Vs, ArrowLeftIcon as js, ChevronLeftIcon as zs, ChevronRightIcon as Fs, ArrowRightIcon as Bs, Copy as Mo, Filter as Ks, User as Gs, Link as Us, CircleHelp as Hs, ChevronsUpDown as Oo, Star as qs, SquareX as Io, FunctionSquare as Ao, SquareSigma as Po, Ban as Ys, AlertCircle as Qn, CircleCheckIcon as Xs, CircleXIcon as Ws, CircleHelpIcon as Js, ArrowUpIcon as Zs, ArrowDownIcon as Qs, PanelLeft as ti, PanelRight as ei, ScrollText as ni, MenuIcon as ri, Menu as oi, EllipsisVertical as ai, LoaderCircle as si, GripVertical as ii } from "lucide-react";
import { clsx as li } from "clsx";
import { extendTailwindMerge as di } from "tailwind-merge";
import * as Dt from "@radix-ui/react-dialog";
import { Canon as ct } from "@sillsdev/scripture";
import { includes as pn, Section as q, getChaptersForBook as ci, formatScrRef as xe, getSectionForBook as Ye, formatRelativeDate as wi, formatReplacementString as ve, sanitizeHtml as pi, NumberFormat as ui, formatBytes as mi, getCurrentLocale as fi, usfmMarkers as gn, getFormatCallerFunction as hi, deepEqual as gi, isString as Qr, compareScrRefs as tr, scrRefToBBBCCCVVV as Vn, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as ze } from "@radix-ui/react-slot";
import { cva as pe } from "class-variance-authority";
import * as le from "@radix-ui/react-popover";
import * as Lo from "@radix-ui/react-label";
import * as Qe from "@radix-ui/react-radio-group";
import { createEditor as $o, $getRoot as de, $createParagraphNode as Sn, $getSelection as Vt, HISTORY_MERGE_TAG as br, ParagraphNode as Vo, TextNode as jo, $isTokenOrSegmented as bi, $getCharacterOffsets as vi, $cloneWithPropertiesEphemeral as xi, $findMatchingParent as zo, $isElementNode as se, $isRangeSelection as ke, CLEAR_EDITOR_COMMAND as Fo, COMMAND_PRIORITY_EDITOR as Bo, mergeRegister as ce, shallowMergeConfig as yi, defineExtension as Xt, safeCast as sn, createState as Ni, FORMAT_TEXT_COMMAND as Ko, $isNodeSelection as Go, COMMAND_PRIORITY_LOW as Uo, RootNode as ki, LineBreakNode as _i, TabNode as Ci, $isEditorState as Ei, createCommand as Ti, CLICK_COMMAND as Ri, isDOMNode as Si, $getNodeFromDOMNode as Di, $createNodeSelection as Mi, $setSelection as Oi, DecoratorNode as er, $getState as Ii, toggleTextFormatType as to, TEXT_TYPE_TO_FORMAT as Ai, $setState as Pi, addClassNamesToElement as Ho, $create as Li, $getNodeByKey as $i, removeClassNamesFromElement as Vi, KEY_TAB_COMMAND as ji, $isBlockElementNode as yn, $createRangeSelection as zi, $normalizeSelection__EXPERIMENTAL as Fi, OUTDENT_CONTENT_COMMAND as Bi, INDENT_CONTENT_COMMAND as eo, INSERT_TAB_COMMAND as Ki, COMMAND_PRIORITY_CRITICAL as vr, $isDecoratorNode as Gi, $isParagraphNode as Ui, $isTextNode as Nn, SELECTION_CHANGE_COMMAND as qo, getRegisteredNode as Hi, isHTMLElement as qi, isDocumentFragment as no, isDOMDocumentNode as Yi, ArtificialNode__DO_NOT_USE as Yo, $createLineBreakNode as Xo, $isRootOrShadowRoot as Xi, isBlockDomNode as ro, isInlineDomNode as oo, $insertNodes as Wi } from "lexical";
import * as Fe from "@radix-ui/react-tooltip";
import { TooltipTrigger as Ji } from "@radix-ui/react-tooltip";
import { HeadingNode as Zi, QuoteNode as Qi, registerRichText as tl } from "@lexical/rich-text";
import { flushSync as el, createPortal as nl } from "react-dom";
import { $isTableSelection as rl } from "@lexical/table";
import * as Dn from "@radix-ui/react-toggle-group";
import * as Wo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Jo } from "@lexical/headless";
import * as Zo from "@radix-ui/react-separator";
import * as Be from "@radix-ui/react-avatar";
import * as at from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ol } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Qo, getFilteredRowModel as al, getSortedRowModel as ta, getPaginationRowModel as sl, getCoreRowModel as ea, flexRender as Xe, getGroupedRowModel as il, getExpandedRowModel as ll } from "@tanstack/react-table";
import * as dt from "@radix-ui/react-select";
import dl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as nr, HIDDEN_NOTE_CALLER as rr, getDefaultViewOptions as cl, isInsertEmbedOpOfType as un, Editorial as wl } from "@eten-tech-foundation/platform-editor";
import * as or from "@radix-ui/react-checkbox";
import * as _t from "@radix-ui/react-tabs";
import * as st from "@radix-ui/react-menubar";
import { useHotkeys as pl } from "react-hotkeys-hook";
import * as it from "@radix-ui/react-context-menu";
import { Drawer as Ft } from "vaul";
import * as ar from "@radix-ui/react-progress";
import * as xr from "react-resizable-panels";
import { Toaster as ul } from "sonner";
import { toast as Qu } from "sonner";
import * as qe from "@radix-ui/react-slider";
import * as sr from "@radix-ui/react-switch";
const ml = di({ prefix: "tw-" });
function f(...t) {
  return ml(li(t));
}
const fl = "layoutDirection";
function wt() {
  const t = localStorage.getItem(fl);
  return t === "rtl" ? t : "ltr";
}
const na = Dt.Root, ra = Dt.Portal, yr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Overlay,
  {
    ref: n,
    className: f(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
yr.displayName = Dt.Overlay.displayName;
const oa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = wt();
  return /* @__PURE__ */ w(ra, { children: [
    /* @__PURE__ */ r(yr, {}),
    /* @__PURE__ */ w(
      Dt.Content,
      {
        ref: o,
        className: f(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ w(
            Dt.Close,
            {
              className: f(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ve, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
oa.displayName = Dt.Content.displayName;
function Nr({ className: t, ...e }) {
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
Nr.displayName = "DialogHeader";
function kr({ className: t, ...e }) {
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
kr.displayName = "DialogFooter";
const _r = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
_r.displayName = Dt.Title.displayName;
const Cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Cr.displayName = Dt.Description.displayName;
const Wt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt,
  {
    ref: n,
    className: f(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
Wt.displayName = kt.displayName;
const Ee = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Eo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      kt.Input,
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
Ee.displayName = kt.Input.displayName;
const Jt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.List,
  {
    ref: n,
    className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Jt.displayName = kt.List.displayName;
const Ke = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ke.displayName = kt.Empty.displayName;
const jt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Group,
  {
    ref: n,
    className: f(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
jt.displayName = kt.Group.displayName;
const aa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
aa.displayName = kt.Separator.displayName;
const Bt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Item,
  {
    ref: n,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Bt.displayName = kt.Item.displayName;
function sa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
sa.displayName = "CommandShortcut";
const ia = (t, e, n, o, a) => {
  switch (t) {
    case q.OT:
      return e ?? "Old Testament";
    case q.NT:
      return n ?? "New Testament";
    case q.DC:
      return o ?? "Deuterocanon";
    case q.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, hl = (t, e, n, o, a) => {
  switch (t) {
    case q.OT:
      return e ?? "OT";
    case q.NT:
      return n ?? "NT";
    case q.DC:
      return o ?? "DC";
    case q.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Me(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ct.bookIdToEnglishName(t);
}
function Er(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const la = ct.allBookIds.filter(
  (t) => !ct.isObsolete(ct.bookIdToNumber(t))
), ye = Object.fromEntries(
  la.map((t) => [t, ct.bookIdToEnglishName(t)])
);
function Tr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ct.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(pn(a.toLowerCase(), o) || pn(t.toLowerCase(), o) || (s ? pn(s.localizedName.toLowerCase(), o) || pn(s.localizedId.toLowerCase(), o) : !1));
}
const da = an(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: c
  }, d) => {
    const p = H(!1), u = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (x) => {
      p.current = !0, o ? o(x) : n == null || n(t);
    }, m = K(
      () => Me(t, l),
      [t, l]
    ), g = K(
      () => Er(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === q.OT,
            "tw-border-s-purple-200": a === q.NT,
            "tw-border-s-indigo-200": a === q.DC,
            "tw-border-s-amber-200": a === q.Extra
          }
        ),
        children: /* @__PURE__ */ w(
          Bt,
          {
            ref: d,
            value: c || `${t} ${ct.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ct.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
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
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: m }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), ca = pe(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? ze : "button", { className: f(ca({ variant: e, size: n, className: t })), ref: s, ...a })
);
F.displayName = "Button";
const ln = 250, wa = 300, tn = 400, gl = 450, bl = 500, Kt = le.Root, ue = le.Trigger, Rr = le.Anchor, Mt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = wt();
  return /* @__PURE__ */ r(le.Portal, { children: /* @__PURE__ */ r(
    le.Content,
    {
      ref: s,
      align: e,
      sideOffset: n,
      className: f(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: ln, ...o },
      ...a,
      dir: i
    }
  ) });
});
Mt.displayName = le.Content.displayName;
function ir(t, e, n) {
  return `${t} ${ye[t]}${e ? ` ${Er(t, e)} ${Me(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function vl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (c) => String(c),
  getItemKey: o = (c) => String(c),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l
}) {
  const [c, d] = T(!1);
  if (t.length === 0)
    return;
  const p = (u) => {
    e(u), d(!1);
  };
  return /* @__PURE__ */ w(Kt, { open: c, onOpenChange: d, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(Wr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Mt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(jt, { heading: s, children: t.map((u) => /* @__PURE__ */ w(
      Bt,
      {
        onSelect: () => p(u),
        className: f("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Wr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function Fp(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const jn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, xl = [
  jn.BOOK_ONLY,
  jn.BOOK_CHAPTER,
  jn.BOOK_CHAPTER_VERSE
];
function ao(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function qt(t) {
  return ci(ct.bookIdToNumber(t));
}
function yl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = xl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, c = void 0, d = void 0] = i.slice(1);
        let p;
        const u = e.filter((h) => Tr(h, l, n));
        if (u.length === 1 && ([p] = u), !p && c) {
          if (ct.isBookIdValid(l)) {
            const h = l.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, m]) => m.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && c) {
          const m = ((g) => Object.keys(ye).find(
            (x) => ye[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (m && e.includes(m) && (p = m), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > qt(p) && (h = Math.max(qt(p), 1));
          const m = d ? parseInt(d, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
            verseNum: m
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function Nl(t, e, n, o) {
  const a = $(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const d = e[c - 1], p = Math.max(qt(d), 1);
        o({
          book: d,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = $(() => {
    const c = qt(t.book);
    if (t.chapterNum < c)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d < e.length - 1) {
        const p = e[d + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = $(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = $(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return K(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Jr : Zr
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Zn : Oe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Oe : Zn
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === qt(t.book) || qt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Zr : Jr
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
function so({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: qt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      Bt,
      {
        value: `${t} ${ye[t] || ""} ${i}`,
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
function Bp({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: c
}) {
  const d = wt(), [p, u] = T(!1), [h, m] = T(""), [g, x] = T(""), [v, y] = T("books"), [N, _] = T(void 0), [k, B] = T(!1), V = H(void 0), R = H(void 0), L = H(void 0), C = H(void 0), S = H({}), j = $(
    (E) => {
      e(E), l && l(E);
    },
    [e, l]
  ), z = K(() => o ? o() : la, [o]), I = K(() => ({
    [q.OT]: z.filter((X) => ct.isBookOT(X)),
    [q.NT]: z.filter((X) => ct.isBookNT(X)),
    [q.DC]: z.filter((X) => ct.isBookDC(X)),
    [q.Extra]: z.filter((X) => ct.extraBooks().includes(X))
  }), [z]), A = K(() => Object.values(I).flat(), [I]), Y = K(() => {
    if (!g.trim()) return I;
    const E = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return [q.OT, q.NT, q.DC, q.Extra].forEach((rt) => {
      E[rt] = I[rt].filter((ot) => Tr(ot, g, a));
    }), E;
  }, [I, g, a]), M = K(
    () => yl(g, A, a),
    [g, A, a]
  ), W = $(() => {
    M && (j({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), u(!1), x(""), m(""));
  }, [j, M]), Ct = $(
    (E) => {
      if (qt(E) <= 1) {
        j({
          book: E,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), x("");
        return;
      }
      _(E), y("chapters");
    },
    [j]
  ), Ot = $(
    (E) => {
      const X = v === "chapters" ? N : M == null ? void 0 : M.book;
      X && (j({
        book: X,
        chapterNum: E,
        verseNum: 1
      }), u(!1), y("books"), _(void 0), x(""));
    },
    [j, v, N, M]
  ), It = $(
    (E) => {
      j(E), u(!1), x("");
    },
    [j]
  ), pt = Nl(t, A, d, e), P = $(() => {
    y("books"), _(void 0), setTimeout(() => {
      R.current && R.current.focus();
    }, 0);
  }, []), D = $(
    (E) => {
      if (!E && v === "chapters") {
        P();
        return;
      }
      u(E), E && (y("books"), _(void 0), x(""));
    },
    [v, P]
  ), { otLong: U, ntLong: Z, dcLong: Q, extraLong: lt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, xt = $(
    (E) => ia(E, U, Z, Q, lt),
    [U, Z, Q, lt]
  ), ut = $(
    (E) => M ? !!M.chapterNum && !E.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), yt = K(
    () => xe(
      t,
      a ? Me(t.book, a) : "English"
    ),
    [t, a]
  ), At = $((E) => (X) => {
    S.current[E] = X;
  }, []), ht = $((E) => {
    (E.key === "Home" || E.key === "End") && E.stopPropagation();
  }, []), gt = $(
    (E) => {
      if (E.ctrlKey) return;
      const { isLetter: X, isDigit: rt } = ao(E.key);
      if (v === "chapters") {
        if (E.key === "Backspace") {
          E.preventDefault(), E.stopPropagation(), P();
          return;
        }
        if (X || rt) {
          if (E.preventDefault(), E.stopPropagation(), y("books"), _(void 0), rt && N) {
            const ot = ye[N];
            x(`${ot} ${E.key}`);
          } else
            x(E.key);
          setTimeout(() => {
            R.current && R.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(E.key)) {
        const ot = v === "chapters" ? N : M == null ? void 0 : M.book;
        if (!ot) return;
        const mt = (() => {
          if (!h) return 1;
          const fe = h.match(/(\d+)$/);
          return fe ? parseInt(fe[1], 10) : 0;
        })(), te = qt(ot);
        if (!te) return;
        let Nt = mt;
        const wn = 6;
        switch (E.key) {
          case "ArrowLeft":
            mt !== 0 && (Nt = mt > 1 ? mt - 1 : te);
            break;
          case "ArrowRight":
            mt !== 0 && (Nt = mt < te ? mt + 1 : 1);
            break;
          case "ArrowUp":
            Nt = mt === 0 ? te : Math.max(1, mt - wn);
            break;
          case "ArrowDown":
            Nt = mt === 0 ? 1 : Math.min(te, mt + wn);
            break;
          default:
            return;
        }
        Nt !== mt && (E.preventDefault(), E.stopPropagation(), m(ir(ot, a, Nt)), setTimeout(() => {
          const fe = S.current[Nt];
          fe && fe.scrollIntoView({ block: "nearest", behavior: "smooth" });
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
  ), Qt = $((E) => {
    if (E.shiftKey || E.key === "Tab" || E.key === " ") return;
    const { isLetter: X, isDigit: rt } = ao(E.key);
    (X || rt) && (E.preventDefault(), x((ot) => ot + E.key), R.current.focus(), B(!1));
  }, []);
  return ne(() => {
    const E = setTimeout(() => {
      if (p && v === "books" && L.current && C.current) {
        const X = L.current, rt = C.current, ot = rt.offsetTop, mt = X.clientHeight, te = rt.clientHeight, Nt = ot - mt / 2 + te / 2;
        X.scrollTo({
          top: Math.max(0, Nt),
          behavior: "smooth"
        }), m(ir(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(E);
    };
  }, [p, v, g, M, t.book]), ne(() => {
    if (v === "chapters" && N) {
      const E = N === t.book;
      setTimeout(() => {
        if (L.current)
          if (E) {
            const X = S.current[t.chapterNum];
            X && X.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            L.current.scrollTo({ top: 0 });
        V.current && V.current.focus();
      }, 0);
    }
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ w(Kt, { open: p, onOpenChange: D, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: f(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: yt })
      }
    ) }),
    /* @__PURE__ */ r(Mt, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ w(
      Wt,
      {
        ref: V,
        onKeyDown: gt,
        loop: !0,
        value: h,
        onValueChange: m,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ w("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ w("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ee,
                {
                  ref: R,
                  value: g,
                  onValueChange: x,
                  onKeyDown: ht,
                  onFocus: () => B(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                vl,
                {
                  recentSearches: i,
                  onSearchItemSelect: It,
                  renderItem: (E) => xe(E, "English"),
                  getItemKey: (E) => `${E.book}-${E.chapterNum}-${E.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: pt.map(({ onClick: E, disabled: X, title: rt, icon: ot }) => /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  B(!0), E();
                },
                disabled: X,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: rt,
                onKeyDown: Qt,
                children: /* @__PURE__ */ r(ot, {})
              },
              rt
            )) })
          ] }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: P,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: d === "ltr" ? /* @__PURE__ */ r(Ds, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Me(N, a) })
          ] }),
          !k && /* @__PURE__ */ w(Jt, { ref: L, children: [
            v === "books" && /* @__PURE__ */ w(et, { children: [
              !M && Object.entries(Y).map(([E, X]) => {
                if (X.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(jt, { heading: xt(E), children: X.map((rt) => /* @__PURE__ */ r(
                      da,
                      {
                        bookId: rt,
                        onSelect: (ot) => Ct(ot),
                        section: Ye(rt),
                        commandValue: `${rt} ${ye[rt]}`,
                        ref: rt === t.book ? C : void 0,
                        localizedBookNames: a
                      },
                      rt
                    )) }, E)
                  );
              }),
              M && /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r(
                Bt,
                {
                  value: `${M.book} ${ye[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: W,
                  className: "tw-font-semibold tw-text-primary",
                  children: xe(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? Er(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && qt(M.book) > 1 && /* @__PURE__ */ w(et, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Me(M.book, a) }),
                /* @__PURE__ */ r(
                  so,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Ot,
                    setChapterRef: At,
                    isChapterDimmed: ut,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && N && /* @__PURE__ */ r(
              so,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: Ot,
                setChapterRef: At,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Kp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), kl = pe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ft = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Lo.Root, { ref: n, className: f("pr-twp", kl(), t), ...e }));
ft.displayName = Lo.Root.displayName;
const Sr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    Qe.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Sr.displayName = Qe.Root.displayName;
const kn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qe.Item,
  {
    ref: n,
    className: f(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Qe.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Rn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
kn.displayName = Qe.Item.displayName;
function _l(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function lr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = _l,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: u = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...y
}) {
  const [N, _] = T(!1), k = c ?? l, B = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], V = (R, L) => {
    const C = l(R), S = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, j = `${L ?? ""}${C}${S ?? ""}`;
    return /* @__PURE__ */ w(
      Bt,
      {
        value: C,
        onSelect: () => {
          i(R), _(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            zt,
            {
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== C
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            C,
            S && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      j
    );
  };
  return /* @__PURE__ */ w(Kt, { open: N, onOpenChange: _, ...y, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": v,
        id: t,
        className: f(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            d && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: d }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? k(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ r(je, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Mt,
      {
        align: g,
        className: f("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ w(Wt, { children: [
          /* @__PURE__ */ r(Ee, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ke, { children: h }),
          /* @__PURE__ */ r(Jt, { children: B(e) ? e.map((R) => /* @__PURE__ */ r(jt, { heading: R.groupHeading, children: R.options.map((L) => V(L, R.groupHeading)) }, R.groupHeading)) : e.map((R) => V(R)) })
        ] })
      }
    )
  ] });
}
function Cl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = K(
    () => Array.from({ length: s }, (d, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(ft, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (d) => {
          n(d), d > e && o(d);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(ft, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (d) => {
          o(d), d < t && n(d);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var El = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(El || {});
const Gp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zn = (t, e) => t[e] ?? e;
function Up({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const p = zn(d, "%webView_bookSelector_currentBook%"), u = zn(d, "%webView_bookSelector_choose%"), h = zn(d, "%webView_bookSelector_chooseBooks%"), [m, g] = T(
    "current book"
    /* CURRENT_BOOK */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    Sr,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(kn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Cl,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(kn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: o.map((v) => ct.bookIdToEnglishName(v)).join(", ") }),
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
const pa = Tn(null);
function Tl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Zt() {
  const t = gr(pa);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ua = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Rl = ua ? ne : G, mn = { tag: br };
function Sl({ initialConfig: t, children: e }) {
  const n = K(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: c } = t, d = Tl(null, o), p = $o({ editable: t.editable, html: c, namespace: a, nodes: s, onError: (u) => i(u, p), theme: o });
    return function(u, h) {
      if (h !== null) {
        if (h === void 0) u.update(() => {
          const m = de();
          if (m.isEmpty()) {
            const g = Sn();
            m.append(g);
            const x = ua ? document.activeElement : null;
            (Vt() !== null || x !== null && x === u.getRootElement()) && g.select();
          }
        }, mn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const m = u.parseEditorState(h);
            u.setEditorState(m, mn);
            break;
          }
          case "object":
            u.setEditorState(h, mn);
            break;
          case "function":
            u.update(() => {
              de().isEmpty() && h(u);
            }, mn);
        }
      }
    }(p, l), [p, d];
  }, []);
  return Rl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(pa.Provider, { value: n, children: e });
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function Ml({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Zt();
  return Dl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      e && s.size === 0 && i.size === 0 || t && c.has(br) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const Dr = {
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
}, Rt = Fe.Provider, Lt = Fe.Root, $t = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Fe.Trigger,
  {
    ref: o,
    className: e ? f(ca({ variant: e }), t) : t,
    ...n
  }
));
$t.displayName = Fe.Trigger.displayName;
const St = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  Fe.Content,
  {
    ref: o,
    sideOffset: e,
    className: f(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
St.displayName = Fe.Content.displayName;
const Mr = [
  Zi,
  Vo,
  jo,
  Qi
], Ol = Tn(null), Fn = {
  didCatch: !1,
  error: null
};
class Il extends Rs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Fn;
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
      }), this.setState(Fn);
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
      }), this.setState(Fn);
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
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(c);
      else if (o)
        l = Xr(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Xr(Ol.Provider, {
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
  return r(Il, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Ll = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function $l(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Vl() {
  return function(t) {
    const [e] = Zt(), n = K(() => t(e), [e, t]), [o, a] = T(() => n.initialValueFn()), s = H(o);
    return Ll(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((d) => {
        s.current = d, a(d);
      });
    }, [n, t]), o;
  }($l);
}
function jl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !bi(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), c = s.getNode(), d = e.is(l), p = e.is(c);
    if (d || p) {
      const [u, h] = vi(t), m = l.is(c), g = e.is(i ? c : l), x = e.is(i ? l : c);
      let v, y = 0;
      m ? (y = u > h ? h : u, v = u > h ? u : h) : g ? (y = i ? h : u, v = void 0) : x && (y = 0, v = i ? u : h);
      const N = e.__text.slice(y, v);
      N !== e.__text && (n === "clone" && (e = xi(e)), e.__text = N);
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
const ma = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fl = ma && "documentMode" in document ? document.documentMode : null;
!(!ma || !("InputEvent" in window) || Fl) && "getTargetRanges" in new window.InputEvent("input");
function Bl(t) {
  const e = zo(t, (n) => se(n) && !n.isInline());
  return se(e) || zl(4, t.__key), e;
}
function Kl(t) {
  const e = Vt();
  if (!ke(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
    const l = zo(s, (d) => se(d) && !d.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !n.has(c) && (n.add(c), t(l));
  }
  return n.size > 0;
}
const Gl = Symbol.for("preact-signals");
function Mn() {
  if (ie > 1) return void ie--;
  let t, e = !1;
  for (; We !== void 0; ) {
    let n = We;
    for (We = void 0, dr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && fa(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (dr = 0, ie--, e) throw t;
}
function Ul(t) {
  if (ie > 0) return t();
  ie++;
  try {
    return t();
  } finally {
    Mn();
  }
}
let J, We;
function io(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let ie = 0, dr = 0, bn = 0;
function lo(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function vt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function en(t, e) {
  return new vt(t, e);
}
function fa(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function co(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function ha(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ge(t, e) {
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = bn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Hl(t, e) {
  return new ge(t, e);
}
function ga(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    ie++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Or(t), o;
    } finally {
      J = n, Mn();
    }
  }
}
function Or(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ga(t);
}
function ql(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  ha(this), J = t, this.f &= -2, 8 & this.f && Or(this), Mn();
}
function De(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function we(t, e) {
  const n = new De(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function On(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], s = en(a === void 0 ? t[o] : a);
    n[o] = s;
  }
  return n;
}
vt.prototype.brand = Gl, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : io(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && io(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, vt.prototype.subscribe = function(t) {
  return we(() => {
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
  const t = lo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (dr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, bn++, ie++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Mn();
    }
  }
} }), ge.prototype = new vt(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === bn)) return !0;
  if (this.g = bn, this.f |= 1, this.i > 0 && !fa(this)) return this.f &= -2, !0;
  const t = J;
  try {
    co(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, ha(this), this.f &= -2, !0;
}, ge.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  vt.prototype.S.call(this, t);
}, ge.prototype.U = function(t) {
  if (this.t !== void 0 && (vt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = lo(this);
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
  this.f |= 1, this.f &= -9, ga(this), co(this), ie++;
  const t = J;
  return J = this, ql.bind(this, t);
}, De.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = We, We = this);
}, De.prototype.d = function() {
  this.f |= 8, 1 & this.f || Or(this);
}, De.prototype.dispose = function() {
  this.d();
};
Xt({ build: (t, e, n) => On(e), config: sn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return we(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ba() {
  const t = de(), e = Vt(), n = Sn();
  t.clear(), t.append(n), e !== null && n.select(), ke(e) && (e.format = 0);
}
function va(t, e = ba) {
  return t.registerCommand(Fo, (n) => (t.update(e), !0), Bo);
}
Xt({ build: (t, e, n) => On(e), config: sn({ $onClear: ba }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return we(() => va(t, o.value));
} });
function Yl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Bn = Ni("format", { parse: (t) => typeof t == "number" ? t : 0 });
class xa extends er {
  $config() {
    return this.config("decorator-text", { extends: er, stateConfigs: [{ flat: !0, stateConfig: Bn }] });
  }
  getFormat() {
    return Ii(this, Bn);
  }
  getFormatFlags(e, n) {
    return to(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Ai[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Pi(this, Bn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = to(n, e, null);
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
  return t instanceof xa;
}
Xt({ name: "@lexical/extension/DecoratorText", nodes: () => [xa], register: (t, e, n) => t.registerCommand(Ko, (o) => {
  const a = Vt();
  if (Go(a) || ke(a)) for (const s of a.getNodes()) Xl(s) && s.toggleFormat(o);
  return !1;
}, Uo) });
function ya(t, e) {
  let n;
  return en(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const cr = Xt({ build: (t) => ya(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Na(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Na(n[a], o[a]);
    return t;
  }
  return e;
}
const Ir = 0, wr = 1, ka = 2, Kn = 3, fn = 4, Se = 5, Gn = 6, Ue = 7;
function Un(t) {
  return t.id === Ir;
}
function _a(t) {
  return t.id === ka;
}
function Wl(t) {
  return function(e) {
    return e.id === wr;
  }(t) || nt(305, String(t.id), String(wr)), Object.assign(t, { id: ka });
}
const Jl = /* @__PURE__ */ new Set();
class Zl {
  constructor(e, n) {
    bt(this, "builder");
    bt(this, "configs");
    bt(this, "_dependency");
    bt(this, "_peerNameSet");
    bt(this, "extension");
    bt(this, "state");
    bt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ir };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : yi;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    _a(n) || nt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, d) {
      return Object.assign(l, { config: c, id: Kn, registerState: d });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, c, d) {
      return Object.assign(l, { id: fn, initResult: c, registerState: d });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== fn && nt(307, String(n.id), String(Se)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Se, output: i, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Se && nt(308, String(o.id), String(Se));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Gn });
    }(o), () => {
      const s = this.state;
      s.id !== Ue && nt(309, String(o.id), String(Ue)), this.state = function(i) {
        return Object.assign(i, { id: Se });
      }(s), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Gn && nt(310, String(n.id), String(Gn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ue });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && nt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && nt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= fn;
    }(e) || nt(313, String(e.id), String(fn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Kn;
    }(e) || nt(314, String(e.id), String(Kn)), { config: e.config };
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
      return n.id >= Ue;
    }(e) || nt(316, String(e.id), String(Ue)), e;
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
        return n.id >= Se;
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const wo = { tag: br };
function Ql() {
  const t = de();
  t.isEmpty() && t.append(Sn());
}
const td = Xt({ config: sn({ setOptions: wo, updateOptions: wo }), init: ({ $initialEditorState: t = Ql }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (Ei(s)) t.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [ki, jo, _i, Ci, Vo] }), po = Symbol.for("@lexical/extension/LexicalBuilder");
function uo() {
}
function ed(t) {
  throw t;
}
function hn(t) {
  return Array.isArray(t) ? t : [t];
}
const Hn = "0.41.0+prod.esm";
class Je {
  constructor(e) {
    bt(this, "roots");
    bt(this, "extensionNameMap");
    bt(this, "outgoingConfigEdges");
    bt(this, "incomingEdges");
    bt(this, "conflicts");
    bt(this, "_sortedExtensionReps");
    bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Hn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [hn(td)];
    for (const o of e) n.push(hn(o));
    return new Je(n);
  }
  static maybeFromEditor(e) {
    const n = e[po];
    return n && (n.PACKAGE_VERSION !== Hn && nt(292, n.PACKAGE_VERSION, Hn), n instanceof Je || nt(293)), n;
  }
  static fromEditor(e) {
    const n = Je.maybeFromEditor(e);
    return n === void 0 && nt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign($o({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [po]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let e = uo;
    function n() {
      try {
        e();
      } finally {
        e = uo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = ce(this.registerEditor(o), () => o.setRootElement(null)), o;
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
    const n = hn(e), [o] = n;
    typeof o.name != "string" && nt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && nt(298, o.name), !a) {
      a = new Zl(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && nt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && nt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = hn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (_a(s)) return;
      const i = o.extension.name;
      var l;
      Un(s) || nt(300, i, a || "[unknown]"), Un(l = s) || nt(304, String(l.id), String(Ir)), s = Object.assign(l, { id: wr }), o.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const d of c.keys()) {
        const p = this.extensionNameMap.get(d);
        p && n(p, i);
      }
      s = Wl(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Un(o.state) && n(o);
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
    return ce(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: u } = p;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const h of Yl(u)) {
        if (typeof h != "function") {
          const m = o.get(h.replace);
          m && nt(302, u.name, h.replace.name, m.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (u.html) {
        if (u.html.export) for (const [h, m] of u.html.export.entries()) a.set(h, m);
        u.html.import && Object.assign(s, u.html.import);
      }
      u.theme && Na(i, u.theme);
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const c = Object.keys(s).length > 0, d = a.size > 0;
    (c || d) && (e.html = {}, c && (e.html.import = s), d && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = ed), e;
  }
}
const nd = /* @__PURE__ */ new Set(), mo = Xt({ build(t, e, n) {
  const o = n.getDependency(cr).output, a = en({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ya(() => {
  }, () => we(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, d = !1;
    o.value.read(() => {
      if (Vt()) for (const [p, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(p);
          continue;
        }
        const h = $i(p), m = h && h.isSelected() || !1;
        d = d || m !== (!!i && i.has(p)), m && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !d && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = Hl(() => (s.value || nd).has(i)), { watchedNodeKeys: c } = a.peek();
    let d = c.get(i);
    const p = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(l), p || (c.set(i, d), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [cr], name: "@lexical/extension/NodeSelection" });
Ti("INSERT_HORIZONTAL_RULE_COMMAND");
class Ie extends er {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ie(e.__key);
  }
  static importJSON(e) {
    return Ca().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: rd, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Ho(n, e.theme.hr), n;
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
function rd() {
  return { node: Ca() };
}
function Ca() {
  return Li(Ie);
}
function od(t) {
  return t instanceof Ie;
}
Xt({ dependencies: [cr, mo], name: "@lexical/extension/HorizontalRule", nodes: () => [Ie], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(mo).output, a = en({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return ce(t.registerCommand(Ri, (i) => {
    if (Si(i.target)) {
      const l = Di(i.target);
      if (od(l)) return function(c, d = !1) {
        const p = Vt(), u = c.isSelected(), h = c.getKey();
        let m;
        d && Go(p) ? m = p : (m = Mi(), Oi(m)), u ? m.delete(h) : m.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Uo), t.registerMutationListener(Ie, (i, l) => {
    Ul(() => {
      let c = !1;
      const { nodeSelections: d } = a.peek();
      for (const [p, u] of i.entries()) if (u === "destroyed") d.delete(p), c = !0;
      else {
        const h = d.get(p), m = t.getElementByKey(p);
        h ? h.domNode.value = m : (c = !0, d.set(p, { domNode: en(m), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: d });
    });
  }), we(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(we(() => {
      const d = l.value;
      d && (c.value ? Ho(d, s) : Vi(d, s));
    }));
    return ce(...i);
  }));
} });
function Ea(t) {
  return t.canBeEmpty();
}
function ad(t, e, n = Ea) {
  return ce(t.registerCommand(ji, (o) => {
    const a = Vt();
    if (!ke(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => yn(h) && h.canIndent()).length > 0) return !0;
      const l = i.anchor, c = i.focus, d = c.isBefore(l) ? c : l, p = d.getNode(), u = Bl(p);
      if (u.canIndent()) {
        const h = u.getKey();
        let m = zi();
        if (m.anchor.set(h, 0, "element"), m.focus.set(h, 0, "element"), m = Fi(m), m.anchor.is(d)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Bi : eo : Ki;
    return t.dispatchCommand(s, void 0);
  }, Bo), t.registerCommand(eo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Vt();
    if (!ke(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return Kl((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
      }
    });
  }, vr));
}
Xt({ build: (t, e, n) => On(e), config: sn({ $canIndent: Ea, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return we(() => {
    if (!o.value) return ad(t, a, s);
  });
} });
const sd = Xt({ name: "@lexical/react/ReactProvider" });
function id() {
  return de().getTextContent();
}
function ld(t, e = !0) {
  if (t) return !1;
  let n = id();
  return e && (n = n.trim()), n === "";
}
function dd(t) {
  if (!ld(t, !1)) return !1;
  const e = de().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Gi(a)) return !1;
    if (se(a)) {
      if (!Ui(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[o];
        if (!Nn(c)) return !1;
      }
    }
  }
  return !0;
}
function Ta(t) {
  return () => dd(t);
}
function Ra(t) {
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
          const c = l.args;
          if (c) {
            const [d, p, u, h, m] = c;
            t.update(() => {
              const g = Vt();
              if (ke(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (Nn(v) && d >= 0 && p >= 0 && (y = d, N = d + p, g.setTextNodeRange(v, y, v, N)), y === N && u === "" || (g.insertRawText(u), v = x.getNode()), Nn(v)) {
                  y = h, N = h + m;
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
Xt({ build: (t, e, n) => On(e), config: sn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => we(() => n.getOutput().disabled.value ? void 0 : Ra(t)) });
function cd(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ar = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function wd({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, s] = T(() => n.getDecorators());
    return Ar(() => n.registerDecoratorListener((i) => {
      el(() => {
        s(i);
      });
    }), [n]), G(() => {
      s(n.getDecorators());
    }, [n]), K(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const d = l[c], p = r(o, { onError: (h) => n._onError(h), children: r(Ss, { fallback: null, children: a[d] }) }), u = n.getElementByKey(d);
        u !== null && i.push(nl(p, u, d));
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
function pd({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Je.maybeFromEditor(n);
    if (o && o.hasExtensionByName(sd.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && cd(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(wd, { editor: t, ErrorBoundary: e });
}
function fo(t) {
  return t.getEditorState().read(Ta(t.isComposing()));
}
function ud({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Zt();
  return function(a) {
    Ar(() => ce(tl(a), Ra(a)), [a]);
  }(o), w(et, { children: [t, r(md, { content: e }), r(pd, { editor: o, ErrorBoundary: n })] });
}
function md({ content: t }) {
  const [e] = Zt(), n = function(a) {
    const [s, i] = T(() => fo(a));
    return Ar(() => {
      function l() {
        const c = fo(a);
        i(c);
      }
      return l(), ce(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(e), o = Vl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function fd({ defaultSelection: t }) {
  const [e] = Zt();
  return G(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const hd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function gd({ onClear: t }) {
  const [e] = Zt();
  return hd(() => va(e, t), [e, t]), null;
}
const Sa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function bd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: d, ariaMultiline: p, ariaOwns: u, ariaRequired: h, autoCapitalize: m, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...B }, V) {
  const [R, L] = T(t.isEditable()), C = $((j) => {
    j && j.ownerDocument && j.ownerDocument.defaultView ? t.setRootElement(j) : t.setRootElement(null);
  }, [t]), S = K(() => /* @__PURE__ */ function(...j) {
    return (z) => {
      for (const I of j) typeof I == "function" ? I(z) : I != null && (I.current = z);
    };
  }(V, C), [C, V]);
  return Sa(() => (L(t.isEditable()), t.registerEditableListener((j) => {
    L(j);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": R && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": d, "aria-multiline": p, "aria-owns": R ? u : void 0, "aria-readonly": !R || void 0, "aria-required": h, autoCapitalize: m, className: g, contentEditable: R, "data-testid": k, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: _, ...B });
}
const vd = an(bd);
function ho(t) {
  return t.getEditorState().read(Ta(t.isComposing()));
}
const xd = an(yd);
function yd(t, e) {
  const { placeholder: n, ...o } = t, [a] = Zt();
  return w(et, { children: [r(vd, { editor: a, ...o, ref: e }), n != null && r(Nd, { editor: a, content: n })] });
}
function Nd({ content: t, editor: e }) {
  const n = function(i) {
    const [l, c] = T(() => ho(i));
    return Sa(() => {
      function d() {
        const p = ho(i);
        c(p);
      }
      return d(), ce(i.registerUpdateListener(() => {
        d();
      }), i.registerEditableListener(() => {
        d();
      }));
    }, [i]), l;
  }(e), [o, a] = T(e.isEditable());
  if (ne(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function kd({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    xd,
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
const Da = Tn(void 0);
function _d({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = K(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(Da.Provider, { value: i, children: s });
}
function Ma() {
  const t = gr(Da);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Cd() {
  const [t, e] = T(void 0), n = $(() => {
    e(void 0);
  }, []), o = K(() => {
    if (t === void 0)
      return;
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(na, { open: !0, onOpenChange: n, children: /* @__PURE__ */ w(oa, { children: [
      /* @__PURE__ */ r(Nr, { children: /* @__PURE__ */ r(_r, { children: s }) }),
      i
    ] }) });
  }, [t, n]), a = $(
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
function Ed({
  children: t
}) {
  const [e] = Zt(), [n, o] = T(e), [a, s] = T("paragraph"), [i, l] = Cd(), c = () => {
  };
  return G(() => n.registerCommand(
    qo,
    (d, p) => (o(p), !1),
    vr
  ), [n]), /* @__PURE__ */ w(
    _d,
    {
      activeEditor: n,
      $updateToolbar: c,
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
function Td(t) {
  const [e] = Zt(), { activeEditor: n } = Ma();
  G(() => n.registerCommand(
    qo,
    () => {
      const o = Vt();
      return o && t(o), !1;
    },
    vr
  ), [e, t]), G(() => {
    n.getEditorState().read(() => {
      const o = Vt();
      o && t(o);
    });
  }, [n, t]);
}
const Oa = pe(
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
), Rd = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Wo.Root,
  {
    ref: a,
    className: f(Oa({ variant: e, size: n, className: t })),
    ...o
  }
));
Rd.displayName = Wo.Root.displayName;
const Ia = b.createContext({
  size: "default",
  variant: "default"
}), Pr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = wt();
  return /* @__PURE__ */ r(
    Dn.Root,
    {
      ref: s,
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        Ia.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Pr.displayName = Dn.Root.displayName;
const Ze = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(Ia);
  return /* @__PURE__ */ r(
    Dn.Item,
    {
      ref: s,
      className: f(
        Oa({
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
Ze.displayName = Dn.Item.displayName;
const go = [
  { format: "bold", icon: Os, label: "Bold" },
  { format: "italic", icon: Is, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Sd() {
  const { activeEditor: t } = Ma(), [e, n] = T([]), o = $((a) => {
    if (ke(a) || rl(a)) {
      const s = [];
      go.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Td(o), /* @__PURE__ */ r(
    Pr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: go.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        Ze,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Ko, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Dd({ onClear: t }) {
  const [e] = Zt();
  G(() => {
    t && t(() => {
      e.dispatchCommand(Fo, void 0);
    });
  }, [e, t]);
}
function Md({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = T(void 0);
  return /* @__PURE__ */ w("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Ed, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Sd, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        ud,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(kd, { placeholder: t }) }),
          ErrorBoundary: Pl
        }
      ),
      e && /* @__PURE__ */ r(fd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Dd, { onClear: n }),
      /* @__PURE__ */ r(gd, {})
    ] })
  ] });
}
const Od = {
  namespace: "commentEditor",
  theme: Dr,
  nodes: Mr,
  onError: (t) => {
    console.error(t);
  }
};
function _n({
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
              ...Od,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(Rt, { children: [
              /* @__PURE__ */ r(Md, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                Ml,
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
function Id(t, e) {
  const n = Yi(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!Pa.has(s.nodeName)) {
    const i = La(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Yo && i.insertAfter(Xo());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), o;
}
function Ad(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = de().getChildren();
  for (let a = 0; a < o.length; a++)
    Aa(t, o[a], n, e);
  return n.innerHTML;
}
function Aa(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const s = se(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && Nn(e) && (i = jl(o, e, "clone"));
  const l = se(i) ? i.getChildren() : [], c = Hi(t, i.getType());
  let d;
  d = c && c.exportDOM !== void 0 ? c.exportDOM(t, i) : i.exportDOM(t);
  const { element: p, after: u } = d;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let m = 0; m < l.length; m++) {
    const g = l[m], x = Aa(t, g, h, o);
    !a && se(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((qi(p) || no(p)) && p.append(h), n.append(p), u) {
      const m = u.call(i, p);
      m && (no(p) ? p.replaceChildren(m) : p.replaceWith(m));
    }
  } else n.append(h);
  return a;
}
const Pa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function La(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Pa.has(t.nodeName)) return i;
  let l = null;
  const c = function(g, x) {
    const { nodeName: v } = g, y = x._htmlConversions.get(v.toLowerCase());
    let N = null;
    if (y !== void 0) for (const _ of y) {
      const k = _(g);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), d = c ? c(t) : null;
  let p = null;
  if (d !== null) {
    p = d.after;
    const g = d.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    d.forChild != null && a.set(t.nodeName, d.forChild);
  }
  const u = t.childNodes;
  let h = [];
  const m = (l == null || !Xi(l)) && (l != null && yn(l) || o);
  for (let g = 0; g < u.length; g++) h.push(...La(u[g], e, n, m, new Map(a), l));
  return p != null && (h = p(h)), ro(t) && (h = Pd(t, h, m ? () => {
    const g = new Yo();
    return n.push(g), g;
  } : Sn)), l == null ? h.length > 0 ? i = i.concat(h) : ro(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : oo(g.nextSibling) && oo(g.previousSibling);
  }(t) && (i = i.concat(Xo())) : se(l) && l.append(...h), i;
}
function Pd(t, e, n) {
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (yn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && yn(e[i + 1])) {
      const c = n();
      c.setFormat(o), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function $a(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Va(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Va(e.children)
  ) : !1;
}
function Pt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Va(t.root.children) : !1;
}
function Ld(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Jo({
    namespace: "EditorUtils",
    theme: Dr,
    nodes: Mr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), s = Id(e, a);
      de().clear(), Wi(s);
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
function Cn(t) {
  const e = Jo({
    namespace: "EditorUtils",
    theme: Dr,
    nodes: Mr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = Ad(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Lr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function vn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function $r(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const $d = {
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
function qn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Hp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = T($d), [i, l] = T(void 0), [c, d] = T(!1), p = H(void 0), u = H(null);
  G(() => {
    let y = !0;
    const N = u.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && $a(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
  const h = $(() => {
    if (!Pt(a)) return;
    const y = Cn(a);
    e(y, i);
  }, [a, e, i]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ve, {}) }) }),
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !Pt(a),
              children: /* @__PURE__ */ r(zt, {})
            }
          ) }),
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Kt, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(To, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: qn(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Mt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(Jt, { children: t.map((y) => /* @__PURE__ */ r(
            Bt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), d(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: qn(y, o) })
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
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : $r(y) && (y.preventDefault(), y.stopPropagation(), Pt(a) && h());
        },
        onKeyDown: (y) => {
          Lr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          _n,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => s(y),
            placeholder: m,
            onClear: (y) => {
              p.current = y;
            }
          }
        )
      }
    )
  ] });
}
const qp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Yp = [
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
], Vd = ["input", "select", "textarea", "button"], jd = ["button", "textbox"], zd = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [s, i] = T(void 0), [l, c] = T(void 0), d = $(
    (m) => {
      i(m);
      const g = t.find((v) => v.id === m);
      g && (e == null || e(g));
      const x = document.getElementById(m);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), p = $(
    (m) => {
      const g = t.find((x) => x.id === m);
      g && (c((x) => x === m ? void 0 : m), n == null || n(g));
    },
    [n, t]
  ), u = (m) => {
    if (!m) return !1;
    const g = m.tagName.toLowerCase();
    if (m.isContentEditable || Vd.includes(g)) return !0;
    const x = m.getAttribute("role");
    if (x && jd.includes(x)) return !0;
    const v = m.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = $(
    (m) => {
      var R;
      const g = m.target, x = (L) => L ? document.getElementById(L) : void 0, v = x(l), y = x(s);
      if (!!(v && g && v.contains(g) && g !== v) && u(g)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const L = t.find((C) => C.id === l);
            L && d(L.id);
          }
          return;
        }
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
          if (!v) return;
          const L = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (L.length === 0) return;
          const C = L.findIndex((j) => j === g);
          if (C === -1) return;
          let S;
          m.key === "ArrowDown" ? S = Math.min(C + 1, L.length - 1) : S = Math.max(C - 1, 0), S !== C && (m.preventDefault(), m.stopPropagation(), (R = L[S]) == null || R.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((L) => L.id === s);
      let B = k;
      switch (m.key) {
        case "ArrowDown":
          B = Math.min(k + 1, t.length - 1), m.preventDefault();
          break;
        case "ArrowUp":
          B = Math.max(k - 1, 0), m.preventDefault();
          break;
        case "Home":
          B = 0, m.preventDefault();
          break;
        case "End":
          B = t.length - 1, m.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), m.preventDefault(), m.stopPropagation();
          return;
        case "ArrowRight": {
          const L = y;
          if (L) {
            const C = L.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = L.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), j = C ?? S;
            if (j) {
              m.preventDefault(), j.focus();
              return;
            }
          }
          break;
        }
        default:
          m.key.length === 1 && !m.metaKey && !m.ctrlKey && !m.altKey && (u(g) || (o == null || o(m.key), m.preventDefault()));
          return;
      }
      const V = t[B];
      V && d(V.id);
    },
    [t, d, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Fd = pe(
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
), Ae = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: f("pr-twp", Fd({ variant: e }), t), ...n })
);
Ae.displayName = "Badge";
const ja = b.forwardRef(
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
ja.displayName = "Card";
const Bd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Bd.displayName = "CardHeader";
const Kd = b.forwardRef(
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
Kd.displayName = "CardTitle";
const Gd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: f("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Gd.displayName = "CardDescription";
const za = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
za.displayName = "CardContent";
const Ud = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Ud.displayName = "CardFooter";
const Pe = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Zo.Root,
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
Pe.displayName = Zo.Root.displayName;
const Fa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Root,
  {
    ref: n,
    className: f(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Fa.displayName = Be.Root.displayName;
const Hd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Image,
  {
    ref: n,
    className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Hd.displayName = Be.Image.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Fallback,
  {
    ref: n,
    className: f(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ba.displayName = Be.Fallback.displayName;
const Vr = Tn(void 0);
function Gt() {
  const t = gr(Vr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const re = pe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Te = at.Trigger, Ka = at.Group, Ga = at.Portal, Ua = at.Sub, Ha = at.RadioGroup;
function me({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Vr.Provider, { value: n, children: /* @__PURE__ */ r(at.Root, { ...e }) });
}
const jr = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Gt();
  return /* @__PURE__ */ w(
    at.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        re({ variant: s.variant })
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
jr.displayName = at.SubTrigger.displayName;
const zr = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = wt();
  return /* @__PURE__ */ r(
    at.SubContent,
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
zr.displayName = at.SubContent.displayName;
const oe = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
    at.Content,
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
oe.displayName = at.Content.displayName;
const nn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = wt(), s = Gt();
  return /* @__PURE__ */ r(
    at.Item,
    {
      ref: o,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        re({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
nn.displayName = at.Item.displayName;
const Yt = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = wt(), i = Gt();
  return /* @__PURE__ */ w(
    at.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: s,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Yt.displayName = at.CheckboxItem.displayName;
const Fr = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = wt(), s = Gt();
  return /* @__PURE__ */ w(
    at.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        re({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Rn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Fr.displayName = at.RadioItem.displayName;
const dn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
dn.displayName = at.Label.displayName;
const Re = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Re.displayName = at.Separator.displayName;
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
qa.displayName = "DropdownMenuShortcut";
function bo({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [c, d] = T(!1), [p, u] = T(), h = H(null);
  G(() => {
    if (!c) return;
    let k = !0;
    const B = h.current;
    if (!B) return;
    const V = setTimeout(() => {
      k && $a(B);
    }, 300);
    return () => {
      k = !1, clearTimeout(V);
    };
  }, [c]);
  const m = $(
    (k) => {
      k && k.stopPropagation(), d(!1), u(void 0), i == null || i(!1);
    },
    [i]
  ), g = $(
    async (k) => {
      if (k && k.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        Cn(p)
      ) && (d(!1), u(void 0), i == null || i(!1));
    },
    [p, a, t.id, i]
  ), x = K(() => {
    const k = new Date(t.date), B = wi(
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), V = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ve(n["%comment_dateAtTime%"], {
      date: B,
      time: V
    });
  }, [t.date, n]), v = K(() => t.user, [t.user]), y = K(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = K(() => pi(t.contents), [t.contents]), _ = K(() => {
    if (o && l)
      return /* @__PURE__ */ w(et, { children: [
        /* @__PURE__ */ w(
          nn,
          {
            onClick: (k) => {
              k.stopPropagation(), d(!0), u(Ld(t.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(As, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          nn,
          {
            onClick: async (k) => {
              k.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(Ps, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
        /* @__PURE__ */ r(Fa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ba, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ae, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              vn(t.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), m()) : $r(k) && (k.preventDefault(), k.stopPropagation(), Pt(p) && g());
              },
              onKeyDown: (k) => {
                Lr(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  _n,
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
                    onSerializedChange: (k) => u(k)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: m,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Ve, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Pt(p),
                      children: /* @__PURE__ */ r(Ro, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ w(et, { children: [
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
                dangerouslySetInnerHTML: { __html: N }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ w(me, { children: [
          /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(So, {}) }) }),
          /* @__PURE__ */ r(oe, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const vo = {
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
function qd({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: c,
  thread: d,
  threadStatus: p,
  handleAddCommentToThread: u,
  handleUpdateComment: h,
  handleDeleteComment: m,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: B = 5,
  onVerseRefClick: V
}) {
  const [R, L] = T(vo), [C, S] = T(
    void 0
  ), j = o, [z, I] = T(!1), [A, Y] = T(!1), [M, W] = T(!1), [Ct, Ot] = T(!1), [It, pt] = T(!1), [P, D] = T(k), [U, Z] = T(!1), Q = H(void 0), [lt, xt] = T(/* @__PURE__ */ new Map());
  G(() => {
    let O = !0;
    return (async () => {
      const Et = N ? await N(c) : !1;
      O && pt(Et);
    })(), () => {
      O = !1;
    };
  }, [c, N]), G(() => {
    let O = !0;
    if (!o) {
      Ot(!1), xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Et = y ? await y(c) : !1;
      O && Ot(Et);
    })(), () => {
      O = !1;
    };
  }, [o, c, y]);
  const ut = K(() => e.filter((O) => !O.deleted), [e]);
  G(() => {
    let O = !0;
    if (!o || !_) {
      xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Et = /* @__PURE__ */ new Map();
      await Promise.all(
        ut.map(async (Yr) => {
          const Cs = await _(Yr.id);
          O && Et.set(Yr.id, Cs);
        })
      ), O && xt(Et);
    })(), () => {
      O = !1;
    };
  }, [o, ut, _]);
  const yt = K(() => ut[0], [ut]), At = H(null), ht = H(void 0), gt = $(() => {
    var O;
    (O = ht.current) == null || O.call(ht), L(vo);
  }, []), Qt = $(() => {
    const O = !P;
    D(O), Z(!O), g == null || g(c, O);
  }, [P, g, c]);
  G(() => {
    I(!1);
  }, [o]), G(() => {
    if (o && !P && !U) {
      const O = setTimeout(() => {
        D(!0), g == null || g(c, !0);
      }, B * 1e3);
      return Q.current = O, () => clearTimeout(O);
    }
    Q.current && (clearTimeout(Q.current), Q.current = void 0);
  }, [o, P, U, B, c, g]);
  const E = K(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), X = K(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const O = vn(s, n);
    return ve(n["%comment_assigned_to%"], {
      assignedUser: O
    });
  }, [s, n]), rt = K(() => ut.slice(1), [ut]), ot = K(() => rt.length ?? 0, [rt.length]), mt = K(() => ot > 0, [ot]), te = K(() => z || ot <= 2 ? rt : rt.slice(-2), [rt, ot, z]), Nt = K(() => z || ot <= 2 ? 0 : ot - 2, [ot, z]), wn = K(
    () => ot === 1 ? E.singleReply : ve(E.multipleReplies, { count: ot }),
    [ot, E]
  ), fe = K(
    () => Nt === 1 ? E.singleReply : ve(E.multipleReplies, { count: Nt }),
    [Nt, E]
  );
  G(() => {
    !o && A && mt && Y(!1);
  }, [o, A, mt]);
  const Hr = $(
    async (O) => {
      O && O.stopPropagation();
      const Ut = Pt(R) ? Cn(R) : void 0;
      if (C !== void 0) {
        await u({
          threadId: c,
          contents: Ut,
          assignedUser: C
        }) && (S(void 0), Ut && gt());
        return;
      }
      Ut && await u({ threadId: c, contents: Ut }) && gt();
    },
    [
      gt,
      R,
      u,
      C,
      c
    ]
  ), qr = $(
    async (O) => {
      const Ut = Pt(R) ? Cn(R) : void 0, Et = await u({
        ...O,
        contents: Ut,
        assignedUser: C ?? O.assignedUser
      });
      return Et && Ut && gt(), Et && C !== void 0 && S(void 0), Et;
    },
    [gt, R, u, C]
  );
  return /* @__PURE__ */ r(
    ja,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: f(
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
      children: /* @__PURE__ */ w(za, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            X && /* @__PURE__ */ r(Ae, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                onClick: (O) => {
                  O.stopPropagation(), Qt();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": P ? "Mark as unread" : "Mark as read",
                children: P ? /* @__PURE__ */ r(Ls, {}) : /* @__PURE__ */ r($s, {})
              }
            ),
            It && p !== "Resolved" && /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                className: f(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (O) => {
                  O.stopPropagation(), qr({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ w(
            "p",
            {
              ref: At,
              className: f(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": j
                },
                { "tw-whitespace-nowrap": !j }
              ),
              children: [
                a && V ? /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (O) => {
                      O.stopPropagation(), V(d);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ w("span", { className: t, children: [
                  yt.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: yt.selectedText }),
                  yt.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            bo,
            {
              comment: yt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: qr,
              handleUpdateComment: h,
              handleDeleteComment: m,
              onEditingChange: Y,
              canEditOrDelete: (!A && lt.get(yt.id)) ?? !1,
              canUserResolveThread: It
            }
          )
        ] }),
        /* @__PURE__ */ w(et, { children: [
          mt && !o && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Pe, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: wn })
          ] }),
          !o && Pt(R) && /* @__PURE__ */ r(
            _n,
            {
              editorSerializedState: R,
              onSerializedChange: (O) => L(O),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ w(et, { children: [
            Nt > 0 && /* @__PURE__ */ w(
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
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Pe, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: fe }),
                    z ? /* @__PURE__ */ r(Do, {}) : /* @__PURE__ */ r(je, {})
                  ] })
                ]
              }
            ),
            te.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              bo,
              {
                comment: O,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: m,
                onEditingChange: Y,
                canEditOrDelete: (!A && lt.get(O.id)) ?? !1
              }
            ) }, O.id)),
            v !== !1 && (!A || Pt(R)) && /* @__PURE__ */ w(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (O) => O.stopPropagation(),
                onKeyDownCapture: (O) => {
                  $r(O) && (O.preventDefault(), O.stopPropagation(), (Pt(R) || C !== void 0) && Hr());
                },
                onKeyDown: (O) => {
                  Lr(O), (O.key === "Enter" || O.key === " ") && O.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    _n,
                    {
                      editorSerializedState: R,
                      onSerializedChange: (O) => L(O),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (O) => {
                        ht.current = O;
                      }
                    }
                  ),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ve(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: vn(
                          C,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ w(Kt, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !x || x.length === 0 || !x.includes(i),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(To, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Mt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (O) => {
                            O.key === "Escape" && (O.stopPropagation(), W(!1));
                          },
                          children: /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(Jt, { children: x == null ? void 0 : x.map((O) => /* @__PURE__ */ r(
                            Bt,
                            {
                              onSelect: () => {
                                S(O !== s ? O : void 0), W(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: vn(O, n) })
                            },
                            O || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      F,
                      {
                        size: "icon",
                        onClick: Hr,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Pt(R) && C === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(Ro, {})
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
function Xp({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: d,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: m,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: v
}) {
  const [y, N] = T(/* @__PURE__ */ new Set()), [_, k] = T();
  G(() => {
    g && (N((I) => new Set(I).add(g)), k(g));
  }, [g]);
  const B = n.filter(
    (I) => I.comments.some((A) => !A.deleted)
  ), V = B.map((I) => ({
    id: I.id
  })), R = $(
    (I) => {
      N((A) => new Set(A).add(I.id)), k(I.id), x == null || x(I.id);
    },
    [x]
  ), L = $(
    (I) => {
      const A = y.has(I);
      N((Y) => {
        const M = new Set(Y);
        return M.has(I) ? M.delete(I) : M.add(I), M;
      }), k(I), x == null || x(A ? void 0 : I);
    },
    [y, x]
  ), { listboxRef: C, activeId: S, handleKeyDown: j } = zd({
    options: V,
    onOptionSelect: R
  }), z = $(
    (I) => {
      I.key === "Escape" ? (_ && y.has(_) && (N((A) => {
        const Y = new Set(A);
        return Y.delete(_), Y;
      }), k(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : j(I);
    },
    [_, y, j, x]
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
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: z,
      children: B.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: f({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            qd,
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: L,
              threadId: I.id,
              thread: I,
              isRead: I.isRead,
              isSelected: y.has(I.id),
              currentUser: o,
              assignedUser: I.assignedUser,
              threadStatus: I.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: d,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: u,
              canUserResolveThreadCallback: h,
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
function Yd({ table: t }) {
  return /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(ol, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Vs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(oe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(dn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Re, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Yt,
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
const Le = dt.Root, Xd = dt.Group, $e = dt.Value, Wd = pe(
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
  const s = wt();
  return /* @__PURE__ */ w(
    dt.Trigger,
    {
      className: f(Wd({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(dt.Icon, { asChild: !0, children: /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
_e.displayName = dt.Trigger.displayName;
const Ya = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollUpButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Do, { className: "tw-h-4 tw-w-4" })
  }
));
Ya.displayName = dt.ScrollUpButton.displayName;
const Xa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollDownButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" })
  }
));
Xa.displayName = dt.ScrollDownButton.displayName;
const Ce = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(dt.Portal, { children: /* @__PURE__ */ w(
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
        /* @__PURE__ */ r(Ya, {}),
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
        /* @__PURE__ */ r(Xa, {})
      ]
    }
  ) });
});
Ce.displayName = dt.Content.displayName;
const Jd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Label,
  {
    ref: n,
    className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Jd.displayName = dt.Label.displayName;
const Tt = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
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
Tt.displayName = dt.Item.displayName;
const Zd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Zd.displayName = dt.Separator.displayName;
function Qd({ table: t }) {
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
        Le,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r($e, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ce, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Tt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(js, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(zs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Fs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Bs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const xo = `
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
function tc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function rn(t, e) {
  const n = e ? `${xo}, ${e}` : xo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && tc(o)
  );
}
const In = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
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
In.displayName = "Table";
const An = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
An.displayName = "TableHeader";
const Pn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: f("[&_tr:last-child]:tw-border-0", t), ...e }));
Pn.displayName = "TableBody";
const ec = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
ec.displayName = "TableFooter";
function nc(t) {
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
function rc(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function oc(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const ee = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), nc(i);
  const l = b.useMemo(
    () => i.current ? rn(i.current) : [],
    [i]
  ), c = b.useCallback(
    (p) => {
      const { current: u } = i;
      if (!u || !u.parentElement) return;
      const h = u.closest("table"), m = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rn(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = m.indexOf(u), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), oc(m, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), rc(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = u.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [i, l, e]
  ), d = b.useCallback(
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
      onFocus: d,
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
ee.displayName = "TableRow";
const on = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
on.displayName = "TableHead";
const Ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ne.displayName = "TableCell";
const ac = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ac.displayName = "TableCaption";
function pr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function sc({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: d
}) {
  var V;
  const [p, u] = T([]), [h, m] = T([]), [g, x] = T({}), [v, y] = T({}), N = K(() => e ?? [], [e]), _ = Qo({
    data: N,
    columns: t,
    getCoreRowModel: ea(),
    ...n && { getPaginationRowModel: sl() },
    onSortingChange: u,
    getSortedRowModel: ta(),
    onColumnFiltersChange: m,
    getFilteredRowModel: al(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: p,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: v
    }
  }), k = _.getVisibleFlatColumns();
  let B;
  return c ? B = Array.from({ length: 10 }).map((C, S) => `skeleton-row-${S}`).map((C) => /* @__PURE__ */ r(ee, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Ne, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(pr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((V = _.getRowModel().rows) == null ? void 0 : V.length) > 0 ? B = _.getRowModel().rows.map((R) => /* @__PURE__ */ r(
    ee,
    {
      onClick: () => i(R, _),
      "data-state": R.getIsSelected() && "selected",
      children: R.getVisibleCells().map((L) => /* @__PURE__ */ r(Ne, { children: Xe(L.column.columnDef.cell, L.getContext()) }, L.id))
    },
    R.id
  )) : B = /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(Ne, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: d }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Yd, { table: _ }),
    /* @__PURE__ */ w(In, { stickyHeader: s, children: [
      /* @__PURE__ */ r(An, { stickyHeader: s, children: _.getHeaderGroups().map((R) => /* @__PURE__ */ r(ee, { children: R.headers.map((L) => /* @__PURE__ */ r(on, { className: "tw-p-0", children: L.isPlaceholder ? void 0 : Xe(L.column.columnDef.header, L.getContext()) }, L.id)) }, R.id)) }),
      /* @__PURE__ */ r(Pn, { children: B })
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
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
    n && o && /* @__PURE__ */ r(Qd, { table: _ })
  ] });
}
function Wp({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = K(
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
      children: /* @__PURE__ */ r(dl, { options: s, children: e })
    }
  );
}
const ic = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), yo = (t, e) => t[e] ?? e;
function lc({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = yo(n, "%webView_error_dump_header%"), s = yo(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Mo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const Jp = Object.freeze([
  ...ic,
  "%webView_error_dump_copied_message%"
]);
function Zp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = T(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ w(Kt, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: o }),
    /* @__PURE__ */ w(Mt, { id: s, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ft, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        lc,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var dc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(dc || {});
function Qp({ id: t, label: e, groups: n }) {
  const [o, a] = T(
    Object.fromEntries(
      n.map(
        (d, p) => d.itemType === 0 ? [p, []] : void 0
      ).filter((d) => !!d)
    )
  ), [s, i] = T({}), l = (d, p) => {
    const u = !o[d][p];
    a((m) => (m[d][p] = u, { ...m }));
    const h = n[d].items[p];
    h.onUpdate(h.id, u);
  }, c = (d, p) => {
    i((h) => (h[d] = p, { ...h }));
    const u = n[d].items.find((h) => h.id === p);
    u ? u.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "default", children: [
      /* @__PURE__ */ r(Ks, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(je, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(oe, { children: n.map((d, p) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r(dn, { children: d.label }),
      /* @__PURE__ */ r(Ka, { children: d.itemType === 0 ? /* @__PURE__ */ r(et, { children: d.items.map((u, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Yt,
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ r(
        Ha,
        {
          value: s[p],
          onValueChange: (u) => c(p, u),
          children: d.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Fr, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ r(Re, {})
    ] }, d.label)) })
  ] }) });
}
function tu({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new ui("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, u) => p + u, 0)), d = () => {
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
            /* @__PURE__ */ r(Gs, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              onClick: () => d(),
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
                /* @__PURE__ */ r(Us, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function cc({ id: t, versionHistory: e }) {
  const [n, o] = T(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), d = new Date(a.getTime() - c.getTime()), p = d.getUTCFullYear() - 1970, u = d.getUTCMonth(), h = d.getUTCDate() - 1;
    let m = "";
    return p > 0 ? m = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? m = `${u.toString()} month${u === 1 ? "" : "s"} ago` : h === 0 ? m = "today" : m = `${h.toString()} day${h === 1 ? "" : "s"} ago`, m;
  }
  const i = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
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
function eu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = K(() => mi(n), [n]), c = ((d) => {
    const p = new Intl.DisplayNames(fi(), { type: "language" });
    return d.map((u) => p.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(cc, { versionHistory: a }),
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function wc({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: d = void 0,
  onOpenChange: p = void 0,
  isDisabled: u = !1,
  sortSelected: h = !1,
  icon: m = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = T(!1), _ = $(
    (S) => {
      var z;
      const j = (z = t.find((I) => I.label === S)) == null ? void 0 : z.value;
      j && n(
        e.includes(j) ? e.filter((I) => I !== j) : [...e, j]
      );
    },
    [t, e, n]
  ), k = () => c || o, B = K(() => {
    if (!h) return t;
    const S = t.filter((z) => z.starred).sort((z, I) => z.label.localeCompare(I.label)), j = t.filter((z) => !z.starred).sort((z, I) => {
      const A = e.includes(z.value), Y = e.includes(I.value);
      return A && !Y ? -1 : !A && Y ? 1 : z.label.localeCompare(I.label);
    });
    return [...S, ...j];
  }, [t, e, h]), V = () => {
    n(t.map((S) => S.value));
  }, R = () => {
    n([]);
  }, L = d ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ w(Kt, { open: L, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": L,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            m && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: m }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ r(Oo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Mt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(Wt, { children: [
      /* @__PURE__ */ r(Ee, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: V, children: s }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: R, children: i })
      ] }),
      /* @__PURE__ */ w(Jt, { children: [
        /* @__PURE__ */ r(Ke, { children: l }),
        /* @__PURE__ */ r(jt, { children: B.map((S) => /* @__PURE__ */ w(
          Bt,
          {
            value: S.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                zt,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    e.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(qs, { className: "tw-h-4 tw-w-4" }),
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
function nu({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: c,
  className: d,
  badgesPlaceholder: p,
  id: u
}) {
  return /* @__PURE__ */ w("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      wc,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: c,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var m;
      return /* @__PURE__ */ w(Ae, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Ve, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (m = t.find((g) => g.value === h)) == null ? void 0 : m.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(ft, { children: p })
  ] });
}
function pc({ children: t, editorRef: e }) {
  const n = H(null);
  return G(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var c, d;
      a && document.activeElement === a && (o ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (c = e.current) == null || c.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (d = e.current) == null || d.undo()));
    };
    return a == null || a.addEventListener("keydown", s), () => {
      a == null || a.removeEventListener("keydown", s);
    };
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Ge = b.forwardRef(
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
Ge.displayName = "Input";
const uc = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function mc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = H(null), i = H(null), l = H(!1), [c, d] = T(t), [p, u] = T(n), [h, m] = T(!1);
  G(() => {
    d(t);
  }, [t]), G(() => {
    p !== n && u(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, m(v), v || (c !== "custom" || p ? (e(c), o(p)) : (d(t), u(n)));
  }, x = (v) => {
    var y, N, _, k;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = s.current) == null || y.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((N = i.current) == null || N.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((_ = s.current) == null ? void 0 : _.selectionStart) === 0 && ((k = i.current) == null || k.focus(), l.current = !1), c === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ w(me, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: uc(t, a, n) }) }) }),
      /* @__PURE__ */ r(St, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      oe,
      {
        style: { zIndex: wa },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(dn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Re, {}),
          /* @__PURE__ */ r(
            Yt,
            {
              checked: c === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: nr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Yt,
            {
              checked: c === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: rr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Yt,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => d("custom"),
              onClick: (v) => {
                var y;
                v.stopPropagation(), l.current = !0, (y = s.current) == null || y.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Ge,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), d("custom"), l.current = !0;
                    },
                    ref: s,
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
const fc = (t, e) => t === "f" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Ao, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Po, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Io, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), hc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ve(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function gc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Ji, { asChild: !0, children: /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: fc(t, n) }) }) }),
      /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: hc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ w(oe, { style: { zIndex: wa }, children: [
      /* @__PURE__ */ r(dn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Re, {}),
      /* @__PURE__ */ w(
        Yt,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Io, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        Yt,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Ao, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        Yt,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Po, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const bc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function vc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ys, { className: e, size: 16 });
}
function xc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = T(""), s = K(() => {
    const i = o.trim().toLowerCase();
    return i ? e.filter(
      (l) => {
        var c;
        return l.marker && ((c = l.marker) == null ? void 0 : c.toLowerCase().includes(i)) || !l.marker && l.title.toLowerCase().includes(i);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ w(Wt, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Ee,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (i) => a(i),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(Jt, { children: [
      /* @__PURE__ */ r(Ke, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(jt, { children: s.map((i) => {
        var l;
        return /* @__PURE__ */ w(
          Bt,
          {
            className: "tw-flex tw-gap-2 hover:tw-bg-accent",
            disabled: i.isDisallowed || i.isDeprecated,
            onSelect: i.action,
            children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: i.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: i.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(vc, { icon: i.icon }) }) }),
              /* @__PURE__ */ w("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: i.title }),
                i.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: i.subtitle })
              ] }),
              (i.isDisallowed || i.isDeprecated) && /* @__PURE__ */ r(sa, { className: "tw-font-sans", children: i.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${i.marker ?? ((l = i.icon) == null ? void 0 : l.displayName)}-${i.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function yc(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = gn[o];
  if (!(a != null && a.children)) return [];
  const s = [];
  return Object.entries(a.children).forEach(([, i]) => {
    s.push(
      ...i.map((l) => ({
        marker: l,
        title: n[gn[l].description] ?? gn[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
function Nc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function kc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const _c = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function ru({
  classNameForEditor: t,
  noteOps: e,
  onSave: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c
}) {
  const d = H(null), p = H(null), u = H(null), [h, m] = T("generated"), [g, x] = T("*"), [v, y] = T("f"), [N, _] = T(!1), [k, B] = T(!1), [V, R] = T(), [L, C] = T(), [S, j] = T(), [z, I] = T(), A = H(null), Y = K(
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...i.view ?? cl(), noteMode: "expanded" }
    }),
    [i, l]
  ), M = K(
    () => yc(
      d,
      () => B(!1),
      c,
      z
    ),
    [c, z]
  );
  G(() => {
    var P;
    k || (P = d.current) == null || P.focus();
  }, [v, k]), G(() => {
    var U, Z;
    let P;
    const D = e == null ? void 0 : e.at(0);
    if (D && un("note", D)) {
      const Q = (U = D.insert.note) == null ? void 0 : U.caller;
      let lt = "custom";
      Q === nr ? lt = "generated" : Q === rr ? lt = "hidden" : Q && x(Q), m(lt), y(((Z = D.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
        var xt;
        (xt = d.current) == null || xt.applyUpdate([D]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [e, s]);
  const W = $(() => {
    var D, U;
    const P = (U = (D = d.current) == null ? void 0 : D.getNoteOps(0)) == null ? void 0 : U.at(0);
    P && un("note", P) && (P.insert.note && (h === "custom" ? P.insert.note.caller = g : P.insert.note.caller = h === "generated" ? nr : rr), n([P]));
  }, [h, g, n]), Ct = () => {
    var D;
    const P = (D = p.current) == null ? void 0 : D.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
  }, Ot = (P) => {
    var U, Z, Q, lt, xt;
    y(P);
    const D = (Z = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (D && un("note", D)) {
      D.insert.note && (D.insert.note.style = P);
      const ut = (lt = (Q = D.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : lt.ops;
      v !== "x" && P === "x" ? ut == null || ut.forEach((yt) => Nc(yt)) : v === "x" && P !== "x" && (ut == null || ut.forEach((yt) => kc(yt))), (xt = d.current) == null || xt.applyUpdate([D, { delete: 1 }]);
    }
  }, It = (P) => {
    var U, Z, Q, lt, xt, ut;
    (U = d.current) == null || U.focus();
    const D = (Q = (Z = d.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : Q.at(0);
    if (D && un("note", D)) {
      P.content.length > 1 && setTimeout(() => {
        var ht;
        (ht = d.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const yt = (lt = D.insert.note) == null ? void 0 : lt.style, At = (ut = (xt = D.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : ut.ops;
      yt || _(!1), _(
        yt === "x" ? !!(At != null && At.every((ht) => {
          var Qt, E;
          if (!((Qt = ht.attributes) != null && Qt.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "xt" || gt === "xo" || gt === "xq";
        })) : !!(At != null && At.every((ht) => {
          var Qt, E;
          if (!((Qt = ht.attributes) != null && Qt.char)) return !0;
          const gt = ((E = ht.attributes) == null ? void 0 : E.char).style;
          return gt === "ft" || gt === "fr" || gt === "fq";
        }))
      );
    } else
      _(!1);
  }, pt = $(() => {
    const P = window.getSelection();
    if (u.current && M.length && P && P.rangeCount > 0) {
      const D = P.getRangeAt(0).getBoundingClientRect(), U = u.current.getBoundingClientRect();
      R(D.left - U.left), C(D.top - U.top), j(D.height), B(!0);
    }
  }, [M, u]);
  return G(() => {
    const P = () => {
      k && B(!1);
    };
    return window.addEventListener("click", P), () => {
      window.removeEventListener("click", P);
    };
  }, [k]), G(() => {
    var P;
    k && ((P = A.current) == null || P.focus());
  }, [k]), G(() => {
    var U;
    const P = ((U = p.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0, D = (Z) => {
      !k && P && document.activeElement === P && Z.key === l ? (Z.preventDefault(), pt()) : k && Z.key === "Escape" && (Z.preventDefault(), B(!1));
    };
    return document.addEventListener("keydown", D), () => {
      document.removeEventListener("keydown", D);
    };
  }, [k, pt, l]), /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ w("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            gc,
            {
              isTypeSwitchable: N,
              noteType: v,
              handleNoteTypeChange: Ot,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            mc,
            {
              callerType: h,
              updateCallerType: m,
              customCaller: g,
              updateCustomCaller: x,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: o,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ r(Ve, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: W,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ r(zt, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: c["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: p,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(pc, { editorRef: d, children: /* @__PURE__ */ r(
              wl,
              {
                options: Y,
                onStateChange: (P) => I(P.contextMarker),
                onUsjChange: It,
                defaultUsj: _c,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
              /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: Ct,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Mo, {})
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
    /* @__PURE__ */ w(Kt, { open: k, children: [
      /* @__PURE__ */ r(
        Rr,
        {
          className: "tw-absolute",
          style: {
            top: L,
            left: V,
            height: S,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Mt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (P) => {
            P.preventDefault(), P.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            xc,
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
const ou = Object.freeze([
  ...bc,
  ...Object.entries(gn).map(([, t]) => t.description).filter((t) => !!t),
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
function Wa(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Cc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const d = c === s.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Br(t, l, n, !0, a),
      d && o
    ] }, Wa(t, l));
  });
}
function Br(t, e, n = !0, o = !0, a = []) {
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
              /* @__PURE__ */ r(Qn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Qn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return Ec(
        s,
        Wa(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Ec(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ w("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Qn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Br(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function Tc({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...l] = t.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, d = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ w("span", { className: f("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), u = i && /* @__PURE__ */ w(et, { children: [
    Br(t.marker, [i], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", m = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = f(h, m);
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ w("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: u }),
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(et, { children: Cc(t.marker, l, o, d) })
      }
    )
  ] });
}
function au({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: d
}) {
  const p = c ?? hi(n, void 0), u = (N, _) => {
    d == null || d(N, _, a);
  }, h = s ? n.findIndex((N) => N === s) : -1, [m, g] = T(h), x = (N, _, k) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), d == null || d(_, k, a);
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
  }, y = H([]);
  return G(() => {
    var N;
    m >= 0 && m < y.current.length && ((N = y.current[m]) == null || N.focus());
  }, [m]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: m < 0 ? 0 : -1,
      className: f("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: v,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: f(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((N, _) => {
            const k = N === s, B = `${a}-${_}`;
            return /* @__PURE__ */ w(et, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (V) => {
                    y.current[_] = V;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === m ? 0 : -1,
                  className: f(
                    "tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",
                    d && "hover:tw-bg-muted/50",
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
                  onKeyDown: (V) => x(V, N, _),
                  children: /* @__PURE__ */ r(
                    Tc,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => p(N.caller, _),
                      showMarkers: i
                    }
                  )
                },
                B
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Pe, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Rc(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function Sc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = K(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const p = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      c.has(p) || (c.add(p), l.push(d));
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(In, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(An, { stickyHeader: !0, children: /* @__PURE__ */ w(ee, { children: [
      /* @__PURE__ */ r(on, { children: a }),
      /* @__PURE__ */ r(on, { children: s })
    ] }) }),
    /* @__PURE__ */ r(Pn, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ w(
      ee,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Ne, { children: xe(l.reference, "English") }),
          /* @__PURE__ */ r(Ne, { className: o, children: Rc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Kr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  or.Root,
  {
    ref: n,
    className: f(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      or.Indicator,
      {
        className: f("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Kr.displayName = or.Root.displayName;
const Dc = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Zs, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Qs, { className: "tw-h-4 tw-w-4" });
}, Ln = (t, e, n) => /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
  /* @__PURE__ */ w(
    $t,
    {
      className: f("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        Dc(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(St, { side: "bottom", children: e })
] }) }), su = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ln(e, t)
}), Mc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Ln(n, t)
}), iu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Ln(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Yn = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((d) => d !== c);
  }), o(i);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), s(l);
}, lu = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => Ln(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(Pr, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
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
          children: /* @__PURE__ */ r(Xs, {})
        }
      ),
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
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
          children: /* @__PURE__ */ r(Ws, {})
        }
      ),
      /* @__PURE__ */ r(
        Ze,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
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
          children: /* @__PURE__ */ r(Js, {})
        }
      )
    ] });
  }
}), du = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), cu = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, wu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Oc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", pu = Object.freeze([
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
]), Ic = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Ac = (t, e, n) => t.map((o) => {
  const a = Qr(o.key) ? o.key : o.key[0];
  return {
    items: Qr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Oc(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ht = (t, e) => t[e] ?? e;
function uu({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c,
  id: d,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: u,
  onItemSelected: h
}) {
  const m = Ht(n, "%webView_inventory_all%"), g = Ht(n, "%webView_inventory_approved%"), x = Ht(n, "%webView_inventory_unapproved%"), v = Ht(n, "%webView_inventory_unknown%"), y = Ht(n, "%webView_inventory_scope_currentBook%"), N = Ht(n, "%webView_inventory_scope_chapter%"), _ = Ht(n, "%webView_inventory_scope_verse%"), k = Ht(n, "%webView_inventory_filter_text%"), B = Ht(
    n,
    "%webView_inventory_show_additional_items%"
  ), V = Ht(n, "%webView_inventory_no_results%"), [R, L] = T(!1), [C, S] = T("all"), [j, z] = T(""), [I, A] = T([]), Y = K(() => {
    const D = t ?? [];
    return D.length === 0 ? [] : Ac(D, a, s);
  }, [t, a, s]), M = K(() => {
    if (R) return Y;
    const D = [];
    return Y.forEach((U) => {
      const Z = U.items[0], Q = D.find(
        (lt) => lt.items[0] === Z
      );
      Q ? (Q.count += U.count, Q.occurrences = Q.occurrences.concat(U.occurrences)) : D.push({
        items: [Z],
        count: U.count,
        occurrences: U.occurrences,
        status: U.status
      });
    }), D;
  }, [R, Y]), W = K(() => M.length === 0 ? [] : Ic(M, C, j), [M, C, j]), Ct = K(() => {
    var Z, Q;
    if (!R) return c;
    const D = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
    if (!D) return c;
    const U = [];
    for (let lt = 0; lt < D; lt++)
      U.push(
        Mc(
          ((Q = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Q[lt]) || "Additional Item",
          lt + 1
        )
      );
    return [...U, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, R]);
  G(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const Ot = (D, U) => {
    U.setRowSelection(() => {
      const Q = {};
      return Q[D.index] = !0, Q;
    });
    const Z = D.original.items;
    A(Z), h && Z.length > 0 && h(Z[0]);
  }, It = (D) => {
    if (D === "book" || D === "chapter" || D === "verse")
      l(D);
    else
      throw new Error(`Invalid scope value: ${D}`);
  }, pt = (D) => {
    if (D === "all" || D === "approved" || D === "unapproved" || D === "unknown")
      S(D);
    else
      throw new Error(`Invalid status filter value: ${D}`);
  }, P = K(() => {
    if (M.length === 0 || I.length === 0) return [];
    const D = M.filter((U) => gi(
      R ? U.items : [U.items[0]],
      I
    ));
    if (D.length > 1) throw new Error("Selected item is not unique");
    return D.length === 0 ? [] : D[0].occurrences;
  }, [I, R, M]);
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ w(
        Le,
        {
          onValueChange: (D) => pt(D),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r($e, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Ce, { children: [
              /* @__PURE__ */ r(Tt, { value: "all", children: m }),
              /* @__PURE__ */ r(Tt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Tt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Tt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(Le, { onValueChange: (D) => It(D), defaultValue: i, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r($e, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(Ce, { children: [
          /* @__PURE__ */ r(Tt, { value: "book", children: y }),
          /* @__PURE__ */ r(Tt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Tt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ge,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: j,
          onChange: (D) => {
            z(D.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Kr,
          {
            className: "tw-m-1",
            checked: R,
            onCheckedChange: (D) => {
              L(D);
            }
          }
        ),
        /* @__PURE__ */ r(ft, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? B })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      sc,
      {
        columns: Ct,
        data: W,
        onRowClickHandler: Ot,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: V
      }
    ) }),
    P.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Sc,
      {
        classNameForText: u,
        occurrenceData: P,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const xn = "hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]", Pc = 150, Lc = 100;
function $c({
  label: t,
  items: e,
  onSelect: n
}) {
  const [o, a] = T(!1), s = H(), i = H(), l = $(() => {
    clearTimeout(i.current), s.current = setTimeout(() => a(!0), Pc);
  }, []), c = $(() => {
    clearTimeout(s.current), i.current = setTimeout(() => a(!1), Lc);
  }, []), d = $(() => {
    clearTimeout(i.current);
  }, []);
  return G(() => () => {
    clearTimeout(s.current), clearTimeout(i.current);
  }, []), /* @__PURE__ */ w(Ua, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ r(
      jr,
      {
        className: xn,
        onPointerEnter: l,
        onPointerLeave: c,
        children: t
      }
    ),
    /* @__PURE__ */ r(Ga, { children: /* @__PURE__ */ r(
      zr,
      {
        className: "overlay-context-menu-content",
        style: { zIndex: tn },
        onPointerEnter: d,
        onPointerLeave: c,
        children: Ja(e, n)
      }
    ) })
  ] });
}
function Ja(t, e) {
  var a;
  const n = [];
  let o = 0;
  for (; o < t.length; ) {
    const s = t[o];
    if (s.type === "separator")
      n.push(
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ r(Re, {}, `sep-${o}`)
      ), o += 1;
    else if (s.type === "item")
      n.push(
        /* @__PURE__ */ w(
          nn,
          {
            disabled: s.disabled,
            className: f(xn, s.destructive && "tw-text-destructive"),
            onSelect: () => e({ itemId: s.id }),
            children: [
              s.label,
              s.shortcut && /* @__PURE__ */ r(qa, { children: s.shortcut })
            ]
          },
          s.id
        )
      ), o += 1;
    else if (s.type === "checkbox")
      n.push(
        /* @__PURE__ */ r(
          Yt,
          {
            className: xn,
            checked: s.checked,
            onCheckedChange: (i) => e({ itemId: s.id, checked: i }),
            children: s.label
          },
          s.id
        )
      ), o += 1;
    else if (s.type === "radio") {
      const { group: i } = s, l = [];
      for (; o < t.length && t[o].type === "radio"; ) {
        const d = t[o];
        if (d.type === "radio" && d.group === i)
          l.push(d), o += 1;
        else
          break;
      }
      const c = ((a = l.find((d) => d.checked)) == null ? void 0 : a.value) ?? "";
      n.push(
        /* @__PURE__ */ r(
          Ha,
          {
            value: c,
            onValueChange: (d) => {
              const p = l.find((u) => u.value === d);
              p && e({ itemId: p.id, checked: !0 });
            },
            children: l.map((d) => /* @__PURE__ */ r(
              Fr,
              {
                className: xn,
                value: d.value,
                children: d.label
              },
              d.id
            ))
          },
          `radio-group-${i}`
        )
      );
    } else s.type === "submenu" && n.push(
      /* @__PURE__ */ r(
        $c,
        {
          label: typeof s.label == "string" ? s.label : String(s.label),
          items: s.items,
          onSelect: e
        },
        `submenu-${s.label}`
      )
    ), o += 1;
  }
  return n;
}
function mu({
  items: t,
  position: e,
  onSelect: n,
  onDismiss: o
}) {
  const a = H(null);
  return /* @__PURE__ */ w(
    me,
    {
      open: !0,
      modal: !1,
      onOpenChange: (s) => {
        s || o();
      },
      children: [
        /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(
          "button",
          {
            ref: a,
            type: "button",
            "data-overlay-context-menu": !0,
            style: {
              position: "fixed",
              left: e.x,
              top: e.y,
              width: 0,
              height: 0,
              padding: 0,
              margin: 0,
              border: "none",
              opacity: 0,
              pointerEvents: "none"
            },
            "aria-hidden": !0,
            tabIndex: -1
          }
        ) }),
        /* @__PURE__ */ r(
          oe,
          {
            className: "overlay-context-menu-content",
            style: { zIndex: tn },
            align: "start",
            side: "bottom",
            sideOffset: 0,
            children: Ja(t, n)
          }
        )
      ]
    }
  );
}
const Za = "OK", Vc = "Cancel", jc = "Alert", zc = "Confirm", Fc = "Dialog";
function Bc({
  options: t,
  onOk: e
}) {
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(Cr, { children: t.message }),
    /* @__PURE__ */ r(kr, { children: /* @__PURE__ */ r(F, { onClick: e, children: t.okLabel ?? Za }) })
  ] });
}
function Kc({
  options: t,
  onOk: e,
  onCancel: n
}) {
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(Cr, { children: t.message }),
    /* @__PURE__ */ w(kr, { children: [
      /* @__PURE__ */ r(F, { variant: "outline", onClick: n, children: t.cancelLabel ?? Vc }),
      /* @__PURE__ */ r(F, { variant: t.destructive ? "destructive" : "default", onClick: e, children: t.okLabel ?? Za })
    ] })
  ] });
}
function Gc(t) {
  return t === "alert" || t === "confirm" ? "alertdialog" : "dialog";
}
function Uc(t) {
  switch (t) {
    case "alert":
      return jc;
    case "confirm":
      return zc;
    default:
      return Fc;
  }
}
function Hc(t, e, n, o) {
  switch (t) {
    case "alert":
      return /* @__PURE__ */ r(
        Bc,
        {
          options: e,
          onOk: () => n(!0)
        }
      );
    case "confirm":
      return /* @__PURE__ */ r(
        Kc,
        {
          options: e,
          onOk: () => n(!0),
          onCancel: o
        }
      );
    default:
      return;
  }
}
function fu({
  dialogType: t,
  options: e,
  onResolve: n,
  onDismiss: o
}) {
  const a = H(!1), s = $(
    (p) => {
      a.current || (a.current = !0, n(p));
    },
    [n]
  ), i = $(() => {
    a.current || (a.current = !0, o());
  }, [o]), l = $(
    (p) => {
      p || i();
    },
    [i]
  ), c = Gc(t), d = ("title" in e && typeof e.title == "string" ? e.title : void 0) || Uc(t);
  return /* @__PURE__ */ r(na, { open: !0, onOpenChange: l, children: /* @__PURE__ */ w(ra, { children: [
    /* @__PURE__ */ r(
      yr,
      {
        className: "overlay-modal-backdrop tw-bg-black/40",
        style: { zIndex: gl }
      }
    ),
    /* @__PURE__ */ w(
      Dt.Content,
      {
        "data-overlay-modal-dialog": !0,
        role: c,
        "aria-modal": "true",
        className: "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        style: { zIndex: bl },
        onKeyDown: (p) => {
          p.key === "Enter" && t === "alert" && (p.preventDefault(), s(!0));
        },
        children: [
          /* @__PURE__ */ r(Nr, { children: /* @__PURE__ */ r(_r, { children: d }) }),
          Hc(t, e, s, i)
        ]
      }
    )
  ] }) });
}
const qc = 320, Yc = 400;
function cn({ title: t }) {
  if (t)
    return /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-font-bold", children: t });
}
function Xc({ content: t }) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(cn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("p", { className: "tw-m-0", children: t.body })
  ] });
}
function Wc({ content: t }) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(cn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("ul", { className: "tw-m-0 tw-pl-5 [&>li]:tw-mb-1", children: t.items.map((n, o) => (
      // List items are plain strings with no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r("li", { children: n }, o)
    )) })
  ] });
}
function Jc({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(cn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("dl", { className: "tw-m-0 [&>div:first-child>dt]:tw-mt-0 [&>div>dd]:tw-mb-1 [&>div>dd]:tw-ml-0 [&>div>dt]:tw-mt-2 [&>div>dt]:tw-font-semibold", children: t.entries.map((n, o) => (
      // Description entries have no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ r("dt", { children: n.term }),
        /* @__PURE__ */ r("dd", { children: n.detail })
      ] }, o)
    )) })
  ] });
}
function Zc({ run: t }) {
  let e = t.text;
  return t.bold && (e = /* @__PURE__ */ r("strong", { children: e })), t.italic && (e = /* @__PURE__ */ r("em", { children: e })), t.scriptureRef && (e = /* @__PURE__ */ r("span", { className: "tw-italic", children: e })), e;
}
function Qc({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(cn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("div", { children: t.body.map((n, o) => (
      // Rich text runs have no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r(Zc, { run: n }, o)
    )) })
  ] });
}
function tw({
  content: t,
  onAction: e
}) {
  var n;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(cn, { title: (n = t.title) == null ? void 0 : n.toString() }),
    /* @__PURE__ */ r("p", { className: "tw-m-0", children: t.body }),
    /* @__PURE__ */ r("div", { className: "tw-mt-3 tw-flex tw-justify-end tw-gap-2", children: t.actions.map((o) => /* @__PURE__ */ r(
      F,
      {
        variant: o.variant ?? "default",
        size: "sm",
        onClick: () => e(o.id),
        children: o.label
      },
      o.id
    )) })
  ] });
}
function ew({
  content: t,
  onAction: e
}) {
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ r(Xc, { content: t });
    case "list":
      return /* @__PURE__ */ r(Wc, { content: t });
    case "description":
      return /* @__PURE__ */ r(Jc, { content: t });
    case "richText":
      return /* @__PURE__ */ r(Qc, { content: t });
    case "card":
      return /* @__PURE__ */ r(tw, { content: t, onAction: e });
    default:
      return;
  }
}
function hu({
  content: t,
  position: e,
  anchor: n,
  side: o = "bottom",
  maxWidth: a = qc,
  showArrow: s = !0,
  onAction: i,
  onDismiss: l
}) {
  const c = $(
    (u) => {
      u || l();
    },
    [l]
  ), d = $(
    (u) => {
      u.key === "Escape" && (u.preventDefault(), l());
    },
    [l]
  ), p = $(
    (u) => {
      i && i(u);
    },
    [i]
  );
  return /* @__PURE__ */ w(Kt, { open: !0, onOpenChange: c, children: [
    /* @__PURE__ */ r(Rr, { asChild: !0, children: /* @__PURE__ */ r(
      "div",
      {
        "data-overlay-popover-anchor": !0,
        style: {
          position: "fixed",
          left: e.x,
          top: e.y,
          width: (n == null ? void 0 : n.width) ?? 0,
          height: (n == null ? void 0 : n.height) ?? 0,
          pointerEvents: "none"
        }
      }
    ) }),
    /* @__PURE__ */ w(
      Mt,
      {
        "data-overlay-popover": !0,
        className: "tw-overflow-y-auto",
        side: o,
        align: "start",
        sideOffset: s ? 8 : 4,
        style: {
          zIndex: tn,
          maxWidth: a,
          maxHeight: Yc
        },
        onKeyDown: d,
        onOpenAutoFocus: (u) => u.preventDefault(),
        onCloseAutoFocus: (u) => u.preventDefault(),
        children: [
          s && /* @__PURE__ */ r(le.Arrow, { className: "tw-fill-popover tw-stroke-border tw-stroke-1" }),
          /* @__PURE__ */ r(ew, { content: t, onAction: p })
        ]
      }
    )
  ] });
}
const nw = 500, rw = 400;
function No({
  item: t,
  onSelect: e
}) {
  const n = [t.label, t.description, t.badge].filter(Boolean).join(" ");
  return /* @__PURE__ */ w(
    Bt,
    {
      value: n,
      disabled: t.disabled,
      onSelect: () => e(t.id),
      className: "tw-flex tw-items-center tw-gap-2",
      children: [
        t.icon && /* @__PURE__ */ r("span", { className: "tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center tw-text-muted-foreground", children: t.icon }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden", children: [
          /* @__PURE__ */ r("span", { className: "tw-truncate", children: t.label }),
          t.description && /* @__PURE__ */ r("span", { className: "tw-truncate tw-text-xs tw-text-muted-foreground", children: t.description })
        ] }),
        t.badge && /* @__PURE__ */ r("span", { className: "tw-ml-auto tw-shrink-0 tw-rounded tw-bg-muted tw-px-1.5 tw-py-0.5 tw-text-xs tw-text-muted-foreground", children: t.badge })
      ]
    }
  );
}
function ow({
  items: t,
  onSelect: e
}) {
  const n = K(() => {
    const a = /* @__PURE__ */ new Map();
    return t.forEach((s) => {
      const i = s.group ?? "", l = a.get(i);
      l ? l.push(s) : a.set(i, [s]);
    }), a;
  }, [t]);
  return n.size > 1 || n.size === 1 && !n.has("") ? /* @__PURE__ */ r(et, { children: Array.from(n.entries()).map(([a, s]) => /* @__PURE__ */ r(jt, { heading: a || void 0, children: s.map((i) => /* @__PURE__ */ r(No, { item: i, onSelect: e }, i.id)) }, a)) }) : /* @__PURE__ */ r(jt, { children: t.map((a) => /* @__PURE__ */ r(No, { item: a, onSelect: e }, a.id)) });
}
function gu({
  items: t,
  position: e,
  anchor: n,
  side: o = "bottom",
  placeholder: a = "Search...",
  maxWidth: s = nw,
  maxHeight: i = rw,
  onSelect: l,
  onDismiss: c
}) {
  const d = H(null);
  G(() => {
    var m;
    (m = d.current) == null || m.focus();
  }, []);
  const p = $(
    (m) => {
      m.key === "Escape" && (m.preventDefault(), c());
    },
    [c]
  ), u = /* @__PURE__ */ w(
    Wt,
    {
      "data-overlay-command-palette": !0,
      className: "tw-rounded-lg tw-border tw-shadow-md",
      onKeyDown: p,
      children: [
        /* @__PURE__ */ r(Ee, { ref: d, placeholder: a }),
        /* @__PURE__ */ w(Jt, { style: { maxHeight: i - 44 }, children: [
          /* @__PURE__ */ r(Ke, { children: "No results found" }),
          /* @__PURE__ */ r(ow, { items: t, onSelect: l })
        ] })
      ]
    }
  );
  return e ? /* @__PURE__ */ w(Kt, { open: !0, onOpenChange: (m) => {
    m || c();
  }, children: [
    /* @__PURE__ */ r(Rr, { asChild: !0, children: /* @__PURE__ */ r(
      "div",
      {
        "data-overlay-command-palette-anchor": !0,
        style: {
          position: "fixed",
          left: e.x,
          top: e.y,
          width: (n == null ? void 0 : n.width) ?? 0,
          height: (n == null ? void 0 : n.height) ?? 0,
          pointerEvents: "none"
        }
      }
    ) }),
    /* @__PURE__ */ w(
      Mt,
      {
        "data-overlay-command-palette": !0,
        className: "tw-p-0",
        side: o,
        align: "start",
        sideOffset: 4,
        style: {
          zIndex: tn,
          width: s,
          maxWidth: s
        },
        onOpenAutoFocus: (m) => m.preventDefault(),
        onCloseAutoFocus: (m) => m.preventDefault(),
        children: [
          /* @__PURE__ */ r(le.Arrow, { className: "tw-fill-popover tw-stroke-border tw-stroke-1" }),
          u
        ]
      }
    )
  ] }) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ r(
      "div",
      {
        "data-overlay-command-palette-backdrop": !0,
        className: "tw-fixed tw-inset-0 tw-flex tw-items-start tw-justify-center tw-pt-[20vh]",
        style: { zIndex: tn },
        onClick: (m) => {
          m.target === m.currentTarget && c();
        },
        children: /* @__PURE__ */ r("div", { style: { width: s, maxWidth: s }, children: u })
      }
    )
  );
}
const aw = "16rem", sw = "3rem", Qa = b.createContext(void 0);
function $n() {
  const t = b.useContext(Qa);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ts = b.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [d, p] = b.useState(t), u = e ?? d, h = b.useCallback(
      (_) => {
        const k = typeof _ == "function" ? _(u) : _;
        n ? n(k) : p(k);
      },
      [n, u]
    ), m = b.useCallback(() => h((_) => !_), [h]), g = u ? "expanded" : "collapsed", y = wt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = b.useMemo(
      () => ({
        state: g,
        open: u,
        setOpen: h,
        toggleSidebar: m,
        side: y
      }),
      [g, u, h, m, y]
    );
    return /* @__PURE__ */ r(Qa.Provider, { value: N, children: /* @__PURE__ */ r(Rt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": aw,
            "--sidebar-width-icon": sw,
            ...a
          }
        ),
        className: f(
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
ts.displayName = "SidebarProvider";
const es = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = $n();
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
es.displayName = "Sidebar";
const iw = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = $n();
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
        a.side === "primary" ? /* @__PURE__ */ r(ti, {}) : /* @__PURE__ */ r(ei, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
iw.displayName = "SidebarTrigger";
const lw = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = $n();
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
lw.displayName = "SidebarRail";
const ns = b.forwardRef(
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
ns.displayName = "SidebarInset";
const dw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ge,
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
dw.displayName = "SidebarInput";
const cw = b.forwardRef(
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
cw.displayName = "SidebarHeader";
const ww = b.forwardRef(
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
ww.displayName = "SidebarFooter";
const pw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pe,
  {
    ref: n,
    "data-sidebar": "separator",
    className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
pw.displayName = "SidebarSeparator";
const rs = b.forwardRef(
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
rs.displayName = "SidebarContent";
const ur = b.forwardRef(
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
ur.displayName = "SidebarGroup";
const mr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? ze : "div",
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
mr.displayName = "SidebarGroupLabel";
const uw = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? ze : "button",
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
uw.displayName = "SidebarGroupAction";
const fr = b.forwardRef(
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
fr.displayName = "SidebarGroupContent";
const os = b.forwardRef(
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
os.displayName = "SidebarMenu";
const as = b.forwardRef(
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
as.displayName = "SidebarMenuItem";
const mw = pe(
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
), ss = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = t ? ze : "button", { state: d } = $n(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: f(mw({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: p }),
      /* @__PURE__ */ r(St, { side: "right", align: "center", hidden: d !== "collapsed", ...a })
    ] })) : p;
  }
);
ss.displayName = "SidebarMenuButton";
const fw = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? ze : "button",
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
fw.displayName = "SidebarMenuAction";
const hw = b.forwardRef(
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
hw.displayName = "SidebarMenuBadge";
const gw = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(pr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          pr,
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
gw.displayName = "SidebarMenuSkeleton";
const bw = b.forwardRef(
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
bw.displayName = "SidebarMenuSub";
const vw = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
vw.displayName = "SidebarMenuSubItem";
const xw = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? ze : "a",
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
xw.displayName = "SidebarMenuSubButton";
function yw({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const d = $(
    (h, m) => {
      o(h, m);
    },
    [o]
  ), p = $(
    (h) => {
      const m = n.find((g) => g.projectId === h);
      return m ? m.projectName : h;
    },
    [n]
  ), u = $(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    es,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ w(rs, { children: [
        /* @__PURE__ */ w(ur, { children: [
          /* @__PURE__ */ r(mr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(fr, { children: /* @__PURE__ */ r(os, { children: Object.entries(e).map(([h, m]) => /* @__PURE__ */ r(as, { children: /* @__PURE__ */ r(
            ss,
            {
              onClick: () => d(h),
              isActive: u(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ w(ur, { children: [
          /* @__PURE__ */ r(mr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(fr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            lr,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[400]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (h) => {
                const m = p(h);
                d(m, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ni, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Gr = an(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = wt();
    return /* @__PURE__ */ w("div", { id: i, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Eo,
        {
          className: f(
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
          value: t,
          onChange: (d) => e(d.target.value),
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
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Ve, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Gr.displayName = "SearchBar";
function bu({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Gr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      ts,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            yw,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(ns, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ae = "scrBook", Nw = "scrRef", be = "source", kw = "details", _w = "Scripture Reference", Cw = "Scripture Book", is = "Type", Ew = "Details";
function Tw(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ae,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? _w,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ct.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ae ? xe(a.start) : void 0;
      },
      getGroupingValue: (o) => ct.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => tr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => xe(o.start),
      id: Nw,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : xe(a.start);
      },
      sortingFn: (o, a) => tr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? is : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: kw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Ew,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Rw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || tr(t.start, t.end) === 0 ? `${Vn(t.start)}+${e}` : `${Vn(t.start)}+${e}-${Vn(t.end)}+${n}`;
}, ko = (t) => `${Rw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function vu({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: c
}) {
  const [d, p] = T([]), [u, h] = T([{ id: ae, desc: !1 }]), [m, g] = T({}), x = K(
    () => t.flatMap((C) => C.data.map((S) => ({
      ...S,
      source: C.source
    }))),
    [t]
  ), v = K(
    () => Tw(
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
    d.includes(be) ? h([
      { id: be, desc: !1 },
      { id: ae, desc: !1 }
    ]) : h([{ id: ae, desc: !1 }]);
  }, [d]);
  const y = Qo({
    data: x,
    columns: v,
    state: {
      grouping: d,
      sorting: u,
      rowSelection: m
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: ll(),
    getGroupedRowModel: il(),
    getCoreRowModel: ea(),
    getSortedRowModel: ta(),
    getRowId: ko,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  G(() => {
    if (l) {
      const C = y.getSelectedRowModel().rowsById, S = Object.keys(C);
      if (S.length === 1) {
        const j = x.find((z) => ko(z) === S[0]) || void 0;
        j && l(j);
      }
    }
  }, [m, x, l, y]);
  const N = a ?? Cw, _ = s ?? is, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [ae] },
    { label: `Group by ${_}`, value: [be] },
    {
      label: `Group by ${N} and ${_}`,
      value: [ae, be]
    },
    {
      label: `Group by ${_} and ${N}`,
      value: [be, ae]
    }
  ], B = (C) => {
    p(JSON.parse(C));
  }, V = (C, S) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(S);
  }, R = (C, S) => C.getIsGrouped() ? "" : f("banded-row", S % 2 === 0 ? "even" : "odd"), L = (C, S, j) => {
    if (!((C == null ? void 0 : C.length) === 0 || S.depth < j.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ w("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ w(
      Le,
      {
        value: JSON.stringify(d),
        onValueChange: (C) => {
          B(C);
        },
        children: [
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r($e, {}) }),
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(Xd, { children: k.map((C) => /* @__PURE__ */ r(Tt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(In, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(An, { children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(ee, { children: C.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(on, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Xe(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(Pn, { children: y.getRowModel().rows.map((C, S) => {
        const j = wt();
        return /* @__PURE__ */ r(
          ee,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: f(R(C, S)),
            onClick: (z) => V(C, z),
            children: C.getVisibleCells().map((z) => {
              if (!(z.getIsPlaceholder() || z.column.columnDef.enableGrouping && !z.getIsGrouped() && (z.column.columnDef.id !== be || !n)))
                return /* @__PURE__ */ r(
                  Ne,
                  {
                    className: f(
                      z.column.columnDef.id,
                      "tw-p-[1px]",
                      L(d, C, z)
                    ),
                    children: z.getIsGrouped() ? /* @__PURE__ */ w(
                      F,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r(je, {}),
                          !C.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Oe, {}) : /* @__PURE__ */ r(Zn, {})),
                          " ",
                          Xe(z.column.columnDef.cell, z.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : Xe(z.column.columnDef.cell, z.getContext())
                  },
                  z.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Ur = (t, e) => t.filter((n) => {
  try {
    return Ye(n) === e;
  } catch {
    return !1;
  }
}), ls = (t, e, n) => Ur(t, e).every((o) => n.includes(o));
function Sw({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Ur(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], d = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        ls(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: hl(
        t,
        i,
        l,
        c,
        d
      )
    }
  );
}
const _o = 5, Xn = 6;
function Dw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], d = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: h, ntLong: m, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = T(!1), [N, _] = T(""), k = H(void 0), B = H(!1);
  if (t.length !== ct.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const V = K(() => ct.allBookIds.filter(
    (A, Y) => t[Y] === "1" && !ct.isObsolete(ct.bookIdToNumber(A))
  ), [t]), R = K(() => {
    if (!N.trim()) {
      const M = {
        [q.OT]: [],
        [q.NT]: [],
        [q.DC]: [],
        [q.Extra]: []
      };
      return V.forEach((W) => {
        const Ct = Ye(W);
        M[Ct].push(W);
      }), M;
    }
    const A = V.filter(
      (M) => Tr(M, N, a)
    ), Y = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return A.forEach((M) => {
      const W = Ye(M);
      Y[W].push(M);
    }), Y;
  }, [V, N, a]), L = $(
    (A, Y = !1) => {
      if (!Y || !k.current) {
        n(
          e.includes(A) ? e.filter((pt) => pt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = V.findIndex((pt) => pt === k.current), W = V.findIndex((pt) => pt === A);
      if (M === -1 || W === -1) return;
      const [Ct, Ot] = [
        Math.min(M, W),
        Math.max(M, W)
      ], It = V.slice(Ct, Ot + 1).map((pt) => pt);
      n(
        e.includes(A) ? e.filter((pt) => !It.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...It])]
      );
    },
    [e, n, V]
  ), C = (A) => {
    L(A, B.current), B.current = !1;
  }, S = (A, Y) => {
    A.preventDefault(), L(Y, A.shiftKey);
  }, j = $(
    (A) => {
      const Y = Ur(V, A).map((M) => M);
      n(
        ls(V, A, e) ? e.filter((M) => !Y.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...Y])]
      );
    },
    [e, n, V]
  ), z = () => {
    n(V.map((A) => A));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(q).map((A) => /* @__PURE__ */ r(
      Sw,
      {
        section: A,
        availableBookIds: V,
        selectedBookIds: e,
        onToggle: j,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ w(
      Kt,
      {
        open: v,
        onOpenChange: (A) => {
          y(A), A || _("");
        },
        children: [
          /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(Oo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Mt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ w(
            Wt,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (B.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ee,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: z, children: c }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: I, children: d })
                ] }),
                /* @__PURE__ */ w(Jt, { children: [
                  /* @__PURE__ */ r(Ke, { children: p }),
                  Object.values(q).map((A, Y) => {
                    const M = R[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ w(Co, { children: [
                        /* @__PURE__ */ r(
                          jt,
                          {
                            heading: ia(A, h, m, g, x),
                            children: M.map((W) => /* @__PURE__ */ r(
                              da,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => C(W),
                                onMouseDown: (Ct) => S(Ct, W),
                                section: Ye(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ir(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        Y < Object.values(q).length - 1 && /* @__PURE__ */ r(aa, {})
                      ] }, A);
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
        e.length === Xn ? Xn : _o
      ).map((A) => /* @__PURE__ */ r(Ae, { className: "hover:tw-bg-secondary", variant: "secondary", children: Me(A, a) }, A)),
      e.length > Xn && /* @__PURE__ */ r(
        Ae,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - _o} ${u}`
        }
      )
    ] })
  ] });
}
const xu = Object.freeze([
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
function yu({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: c
}) {
  const d = he(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = he(
    i,
    "%webView_scope_selector_current_verse%"
  ), u = he(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = he(i, "%webView_scope_selector_current_book%"), m = he(i, "%webView_scope_selector_choose_books%"), g = he(i, "%webView_scope_selector_scope%"), x = he(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: d, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: m, id: "scope-selected" }
  ], y = e ? v.filter((N) => e.includes(N.value)) : v;
  return /* @__PURE__ */ w("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: g }),
      /* @__PURE__ */ r(
        Sr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: _, id: k }) => /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(kn, { className: "tw-me-2", value: N, id: k }),
            /* @__PURE__ */ r(ft, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: x }),
      /* @__PURE__ */ r(
        Dw,
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
const Wn = {
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
function Nu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Wn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([d, p]) => [
          d,
          d === p && d in Wn ? Wn[d] : p
        ]
      )
    )
  }, c = wt();
  return /* @__PURE__ */ w(
    Le,
    {
      value: `${e}`,
      onValueChange: (d) => n(
        d === "undefined" ? void 0 : parseInt(d, 10)
      ),
      children: [
        /* @__PURE__ */ r(_e, { size: a, className: f("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          $e,
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ce,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: ln },
            children: t.map((d) => /* @__PURE__ */ r(Tt, { value: `${d}`, children: l[tt(d)] }, `${d}`))
          }
        )
      ]
    }
  );
}
function ku({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function _u({
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
function Cu({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Pe, {}) : ""
  ] });
}
function ds(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function En({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: f("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const cs = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ w(Lt, { children: [
  /* @__PURE__ */ r($t, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    nn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(En, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(En, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(Ua, { children: [
    /* @__PURE__ */ r(jr, { children: l.label }),
    /* @__PURE__ */ r(Ga, { children: /* @__PURE__ */ r(zr, { children: cs(
      t,
      e,
      ds(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(St, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function hr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(me, { variant: s, children: [
    /* @__PURE__ */ r(Te, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(ri, {}) }) }),
    /* @__PURE__ */ r(oe, { align: "start", style: { zIndex: ln }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, d]) => typeof c == "boolean" || typeof d == "boolean" ? 0 : c.order - d.order).map(([c], d, p) => /* @__PURE__ */ w(Co, { children: [
      /* @__PURE__ */ r(Ka, { children: /* @__PURE__ */ r(Rt, { children: cs(e.groups, e.items, c, t) }) }),
      d < p.length - 1 && /* @__PURE__ */ r(Re, {})
    ] }, c)) })
  ] });
}
const ws = b.forwardRef(
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
function Eu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: d
}) {
  return /* @__PURE__ */ w(ws, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      hr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ r(oi, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        hr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ai, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Tu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(ws, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    hr,
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
const ps = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    _t.Root,
    {
      orientation: "vertical",
      ref: n,
      className: f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ps.displayName = _t.List.displayName;
const us = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.List,
  {
    ref: n,
    className: f(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
us.displayName = _t.List.displayName;
const Mw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), ms = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Content,
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
ms.displayName = _t.Content.displayName;
function Ru({
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
        Gr,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(ps, { children: [
      /* @__PURE__ */ r(us, { children: t.map((l) => /* @__PURE__ */ r(Mw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(ms, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Ow({ ...t }) {
  return /* @__PURE__ */ r(st.Menu, { ...t });
}
function Iw({ ...t }) {
  return /* @__PURE__ */ r(st.Sub, { "data-slot": "menubar-sub", ...t });
}
const fs = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Vr.Provider, { value: a, children: /* @__PURE__ */ r(
    st.Root,
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
fs.displayName = st.Root.displayName;
const hs = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    st.Trigger,
    {
      ref: n,
      className: f(
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
hs.displayName = st.Trigger.displayName;
const gs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Gt();
  return /* @__PURE__ */ w(
    st.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        re({ variant: s.variant, className: t }),
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
gs.displayName = st.SubTrigger.displayName;
const bs = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    st.SubContent,
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
bs.displayName = st.SubContent.displayName;
const vs = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Gt();
  return /* @__PURE__ */ r(st.Portal, { children: /* @__PURE__ */ r(
    st.Content,
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
vs.displayName = st.Content.displayName;
const xs = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ r(
    st.Item,
    {
      ref: o,
      className: f(
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
xs.displayName = st.Item.displayName;
const Aw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Gt();
  return /* @__PURE__ */ w(
    st.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        re({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Aw.displayName = st.CheckboxItem.displayName;
const Pw = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ w(
    st.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        re({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(st.ItemIndicator, { children: /* @__PURE__ */ r(Rn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Pw.displayName = st.RadioItem.displayName;
const Lw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Lw.displayName = st.Label.displayName;
const ys = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
ys.displayName = st.Separator.displayName;
const He = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Ns = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((d) => d.group === s).sort((d, p) => d.order - p.order).map((d) => /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: "command" in d ? /* @__PURE__ */ w(
        xs,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ r(En, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ r(En, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ w(Iw, { children: [
        /* @__PURE__ */ r(gs, { children: d.label }),
        /* @__PURE__ */ r(bs, { children: Ns(
          t,
          e,
          ds(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ r(St, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ r(ys, {}, `separator-${s}`)), c;
  });
};
function $w({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), s = H(void 0), i = H(void 0), l = H(void 0), c = H(void 0), d = (p) => {
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
  if (pl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        He(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), He(s, [h, m]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), He(i, [h, m]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), He(l, [h, m]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), He(c, [h, m]);
        break;
    }
  }), G(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((m) => {
      m.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((m) => {
      p.observe(m, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(fs, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ w(Ow, { children: [
      /* @__PURE__ */ r(hs, { ref: d(p), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ r(
        vs,
        {
          style: { zIndex: ln },
          children: /* @__PURE__ */ r(Rt, { children: Ns(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Su(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Du({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: d = "default"
}) {
  const p = H(void 0);
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
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    $w,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: d
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
const Vw = (t, e) => t[e] ?? e;
function Mu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: c
}) {
  const d = Vw(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, u] = T(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), u(!1);
  }, m = (g, x) => {
    var y, N, _, k, B, V;
    const v = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return v ? `${(B = t[g]) == null ? void 0 : B.autonym} (${v})` : (V = t[g]) == null ? void 0 : V.autonym;
  };
  return /* @__PURE__ */ w("div", { id: c, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      Le,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r($e, {}) }),
          /* @__PURE__ */ r(
            Ce,
            {
              style: { zIndex: ln },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Tt, { value: g, children: m(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ft, { className: "tw-font-normal tw-text-muted-foreground", children: ve(d, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => m(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function jw({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ft, { children: e(t) }) : n ? /* @__PURE__ */ r(ft, { children: n(t) }) : /* @__PURE__ */ r(ft, { children: t });
}
function Ou({
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
      Kr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      jw,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Iu({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: l,
  additionalSelectedContent: c,
  accentColor: d
}) {
  return /* @__PURE__ */ w(
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
      className: f(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && l && /* @__PURE__ */ w(me, { children: [
              /* @__PURE__ */ r(Te, { className: f(d && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(So, {}) }) }),
              /* @__PURE__ */ r(oe, { align: "end", children: l })
            ] })
          ] }),
          e && c && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: c })
        ] }),
        d && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`
          }
        )
      ]
    },
    t
  );
}
const zw = an(({ className: t, ...e }, n) => /* @__PURE__ */ r(si, { size: 35, className: f("tw-animate-spin", t), ...e, ref: n }));
zw.displayName = "Spinner";
function Au({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: p,
  onChange: u,
  onFocus: h,
  onBlur: m
}) {
  return /* @__PURE__ */ w("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ft,
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
      Ge,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: f(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: u,
        onFocus: h,
        onBlur: m
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
const Fw = pe(
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
), Bw = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: f(
      // CUSTOM
      "pr-twp",
      Fw({ variant: e }),
      t
    ),
    ...n
  }
));
Bw.displayName = "Alert";
const Kw = b.forwardRef(
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
Kw.displayName = "AlertTitle";
const Gw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Gw.displayName = "AlertDescription";
const Pu = it.Root, Lu = it.Trigger, $u = it.Group, Vu = it.Portal, ju = it.Sub, zu = it.RadioGroup, Uw = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
  it.SubTrigger,
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
      /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Uw.displayName = it.SubTrigger.displayName;
const Hw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.SubContent,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Hw.displayName = it.SubContent.displayName;
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(it.Portal, { children: /* @__PURE__ */ r(
  it.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
qw.displayName = it.Content.displayName;
const Yw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  it.Item,
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
Yw.displayName = it.Item.displayName;
const Xw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
  it.CheckboxItem,
  {
    ref: a,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(it.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Xw.displayName = it.CheckboxItem.displayName;
const Ww = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  it.RadioItem,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(it.ItemIndicator, { children: /* @__PURE__ */ r(Rn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ww.displayName = it.RadioItem.displayName;
const Jw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  it.Label,
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
Jw.displayName = it.Label.displayName;
const Zw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Zw.displayName = it.Separator.displayName;
function Qw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Qw.displayName = "ContextMenuShortcut";
const ks = b.createContext({
  direction: "bottom"
});
function tp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(ks.Provider, { value: o, children: /* @__PURE__ */ r(
    Ft.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
tp.displayName = "Drawer";
const Fu = Ft.Trigger, ep = Ft.Portal, Bu = Ft.Close, _s = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Overlay,
  {
    ref: n,
    className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
_s.displayName = Ft.Overlay.displayName;
const np = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(ks), i = {
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
  return /* @__PURE__ */ w(ep, { children: [
    /* @__PURE__ */ r(_s, {}),
    /* @__PURE__ */ w(
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
np.displayName = "DrawerContent";
function rp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
rp.displayName = "DrawerHeader";
function op({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
op.displayName = "DrawerFooter";
const ap = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ap.displayName = Ft.Title.displayName;
const sp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
sp.displayName = Ft.Description.displayName;
const ip = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  ar.Root,
  {
    ref: o,
    className: f(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      ar.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
ip.displayName = ar.Root.displayName;
function Ku({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    xr.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Gu = xr.Panel;
function Uu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    xr.PanelResizeHandle,
    {
      className: f(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(ii, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Hu({ ...t }) {
  return /* @__PURE__ */ r(
    ul,
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
const lp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w(
    qe.Root,
    {
      ref: n,
      className: f(
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
lp.displayName = qe.Root.displayName;
const dp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    sr.Root,
    {
      className: f(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        sr.Thumb,
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
dp.displayName = sr.Root.displayName;
const qu = _t.Root, cp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    _t.List,
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
cp.displayName = _t.List.displayName;
const wp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Trigger,
  {
    ref: n,
    className: f(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
wp.displayName = _t.Trigger.displayName;
const pp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _t.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
pp.displayName = _t.Content.displayName;
const up = b.forwardRef(
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
up.displayName = "Textarea";
const Yu = (t, e) => {
  G(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function mp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const fp = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = mp(a.current);
  const [s, i] = T(() => o.current), [l, c] = T(!0);
  return G(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const p = await t();
        d && (i(() => p), c(!1));
      }
    })(), () => {
      d = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, l];
}, Jn = () => !1, Xu = (t, e) => {
  const [n] = fp(
    $(async () => {
      if (!t) return Jn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Jn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  G(() => () => {
    n !== Jn && n();
  }, [n]);
};
function Wu(t) {
  G(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function hp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
hp(`*, ::before, ::after {
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
.tw-z-\\[400\\] {
  z-index: 400;
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
.tw-bg-black\\/40 {
  background-color: rgb(0 0 0 / 0.4);
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
.tw-fill-popover {
  fill: hsl(var(--popover));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-stroke-border {
  stroke: hsl(var(--border));
}
.tw-stroke-1 {
  stroke-width: 1;
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
.tw-pt-\\[20vh\\] {
  padding-top: 20vh;
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
.\\[transition-duration\\:0ms\\] {
  transition-duration: 0ms;
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
.\\[\\&\\>div\\:first-child\\>dt\\]\\:tw-mt-0>div:first-child>dt {
  margin-top: 0px;
}
.\\[\\&\\>div\\>dd\\]\\:tw-mb-1>div>dd {
  margin-bottom: 0.25rem;
}
.\\[\\&\\>div\\>dd\\]\\:tw-ml-0>div>dd {
  margin-left: 0px;
}
.\\[\\&\\>div\\>dt\\]\\:tw-mt-2>div>dt {
  margin-top: 0.5rem;
}
.\\[\\&\\>div\\>dt\\]\\:tw-font-semibold>div>dt {
  font-weight: 600;
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
.\\[\\&\\>li\\]\\:tw-mb-1>li {
  margin-bottom: 0.25rem;
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
  Bw as Alert,
  Gw as AlertDescription,
  Kw as AlertTitle,
  Fa as Avatar,
  Ba as AvatarFallback,
  Hd as AvatarImage,
  Kp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Gp as BOOK_SELECTOR_STRING_KEYS,
  Ae as Badge,
  Bp as BookChapterControl,
  El as BookSelectionMode,
  Up as BookSelector,
  F as Button,
  qp as COMMENT_EDITOR_STRING_KEYS,
  Yp as COMMENT_LIST_STRING_KEYS,
  ja as Card,
  za as CardContent,
  Gd as CardDescription,
  Ud as CardFooter,
  Bd as CardHeader,
  Kd as CardTitle,
  Cl as ChapterRangeSelector,
  Kr as Checkbox,
  Ou as Checklist,
  lr as ComboBox,
  Wt as Command,
  Ke as CommandEmpty,
  jt as CommandGroup,
  Ee as CommandInput,
  Bt as CommandItem,
  Jt as CommandList,
  Hp as CommentEditor,
  Xp as CommentList,
  Pu as ContextMenu,
  Xw as ContextMenuCheckboxItem,
  qw as ContextMenuContent,
  $u as ContextMenuGroup,
  Yw as ContextMenuItem,
  Jw as ContextMenuLabel,
  Vu as ContextMenuPortal,
  zu as ContextMenuRadioGroup,
  Ww as ContextMenuRadioItem,
  Zw as ContextMenuSeparator,
  Qw as ContextMenuShortcut,
  ju as ContextMenuSub,
  Hw as ContextMenuSubContent,
  Uw as ContextMenuSubTrigger,
  Lu as ContextMenuTrigger,
  sc as DataTable,
  tp as Drawer,
  Bu as DrawerClose,
  np as DrawerContent,
  sp as DrawerDescription,
  op as DrawerFooter,
  rp as DrawerHeader,
  _s as DrawerOverlay,
  ep as DrawerPortal,
  ap as DrawerTitle,
  Fu as DrawerTrigger,
  me as DropdownMenu,
  Yt as DropdownMenuCheckboxItem,
  oe as DropdownMenuContent,
  Ka as DropdownMenuGroup,
  nn as DropdownMenuItem,
  dc as DropdownMenuItemType,
  dn as DropdownMenuLabel,
  Ga as DropdownMenuPortal,
  Ha as DropdownMenuRadioGroup,
  Fr as DropdownMenuRadioItem,
  Re as DropdownMenuSeparator,
  qa as DropdownMenuShortcut,
  Ua as DropdownMenuSub,
  zr as DropdownMenuSubContent,
  jr as DropdownMenuSubTrigger,
  Te as DropdownMenuTrigger,
  ic as ERROR_DUMP_STRING_KEYS,
  Jp as ERROR_POPOVER_STRING_KEYS,
  pc as EditorKeyboardShortcuts,
  lc as ErrorDump,
  Zp as ErrorPopover,
  ou as FOOTNOTE_EDITOR_STRING_KEYS,
  nu as Filter,
  Qp as FilterDropdown,
  eu as Footer,
  ru as FootnoteEditor,
  Tc as FootnoteItem,
  au as FootnoteList,
  pu as INVENTORY_STRING_KEYS,
  Ge as Input,
  uu as Inventory,
  ft as Label,
  bc as MARKER_MENU_STRING_KEYS,
  Wp as MarkdownRenderer,
  xc as MarkerMenu,
  tu as MoreInfo,
  wc as MultiSelectComboBox,
  Ru as NavigationContentSearch,
  gu as OverlayCommandPalette,
  mu as OverlayContextMenu,
  fu as OverlayModalDialog,
  hu as OverlayPopover,
  Kt as Popover,
  Rr as PopoverAnchor,
  Mt as PopoverContent,
  ue as PopoverTrigger,
  ip as Progress,
  Sr as RadioGroup,
  kn as RadioGroupItem,
  vl as RecentSearches,
  Uu as ResizableHandle,
  Gu as ResizablePanel,
  Ku as ResizablePanelGroup,
  Iu as ResultsCard,
  xu as SCOPE_SELECTOR_STRING_KEYS,
  yu as ScopeSelector,
  vu as ScriptureResultsViewer,
  Nu as ScrollGroupSelector,
  Gr as SearchBar,
  Le as Select,
  Ce as SelectContent,
  Xd as SelectGroup,
  Tt as SelectItem,
  Jd as SelectLabel,
  Xa as SelectScrollDownButton,
  Ya as SelectScrollUpButton,
  Zd as SelectSeparator,
  _e as SelectTrigger,
  $e as SelectValue,
  Pe as Separator,
  ku as SettingsList,
  Cu as SettingsListHeader,
  _u as SettingsListItem,
  yw as SettingsSidebar,
  bu as SettingsSidebarContentSearch,
  es as Sidebar,
  rs as SidebarContent,
  ww as SidebarFooter,
  ur as SidebarGroup,
  uw as SidebarGroupAction,
  fr as SidebarGroupContent,
  mr as SidebarGroupLabel,
  cw as SidebarHeader,
  dw as SidebarInput,
  ns as SidebarInset,
  os as SidebarMenu,
  fw as SidebarMenuAction,
  hw as SidebarMenuBadge,
  ss as SidebarMenuButton,
  as as SidebarMenuItem,
  gw as SidebarMenuSkeleton,
  bw as SidebarMenuSub,
  xw as SidebarMenuSubButton,
  vw as SidebarMenuSubItem,
  ts as SidebarProvider,
  lw as SidebarRail,
  pw as SidebarSeparator,
  iw as SidebarTrigger,
  pr as Skeleton,
  lp as Slider,
  Hu as Sonner,
  zw as Spinner,
  dp as Switch,
  hr as TabDropdownMenu,
  Tu as TabFloatingMenu,
  Eu as TabToolbar,
  In as Table,
  Pn as TableBody,
  ac as TableCaption,
  Ne as TableCell,
  ec as TableFooter,
  on as TableHead,
  An as TableHeader,
  ee as TableRow,
  qu as Tabs,
  pp as TabsContent,
  cp as TabsList,
  wp as TabsTrigger,
  Au as TextField,
  up as Textarea,
  Pr as ToggleGroup,
  Ze as ToggleGroupItem,
  Du as Toolbar,
  Lt as Tooltip,
  St as TooltipContent,
  Rt as TooltipProvider,
  $t as TooltipTrigger,
  Mu as UiLanguageSelector,
  ps as VerticalTabs,
  ms as VerticalTabsContent,
  us as VerticalTabsList,
  Mw as VerticalTabsTrigger,
  ln as Z_INDEX_ABOVE_DOCK,
  wa as Z_INDEX_FOOTNOTE_EDITOR,
  bl as Z_INDEX_MODAL,
  gl as Z_INDEX_MODAL_BACKDROP,
  tn as Z_INDEX_OVERLAY,
  Fd as badgeVariants,
  ca as buttonVariants,
  f as cn,
  wu as getBookIdFromUSFM,
  Ln as getInventoryHeader,
  du as getLinesFromUSFM,
  cu as getNumberFromUSFM,
  Oc as getStatusForItem,
  Su as getToolbarOSReservedSpaceClassName,
  iu as inventoryCountColumn,
  su as inventoryItemColumn,
  lu as inventoryStatusColumn,
  Wd as selectTriggerVariants,
  Qu as sonner,
  Yu as useEvent,
  Xu as useEventAsync,
  zd as useListbox,
  fp as usePromise,
  Fp as useRecentSearches,
  $n as useSidebar,
  Wu as useStylesheet
};
//# sourceMappingURL=index.js.map
