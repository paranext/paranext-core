var Si = Object.defineProperty;
var Di = (t, e, n) => e in t ? Si(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yt = (t, e, n) => Di(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as w, Fragment as J } from "react/jsx-runtime";
import b, { forwardRef as cn, useRef as H, useMemo as K, useState as R, useCallback as V, useLayoutEffect as It, createContext as Sn, useContext as xr, useEffect as q, Component as Mi, createElement as Jr, Suspense as Oi, Fragment as Do } from "react";
import { Command as Tt } from "cmdk";
import { X as Be, Search as Mo, Check as Ft, Clock as Zr, ChevronsLeft as Qr, ChevronsRight as to, ChevronLeft as tr, ChevronRight as Pe, ArrowLeft as Ii, ArrowRight as Ai, Circle as Dn, ChevronDown as Ke, BoldIcon as Pi, ItalicIcon as Li, AtSign as Oo, Pencil as $i, Trash2 as Vi, ArrowUp as Io, MoreHorizontal as ji, MailOpen as zi, Mail as Fi, ChevronUp as Ao, FilterIcon as Bi, ArrowLeftIcon as Ki, ChevronLeftIcon as Ui, ChevronRightIcon as Gi, ArrowRightIcon as Hi, Copy as Po, Filter as qi, User as Yi, Link as Xi, CircleHelp as Wi, ChevronsUpDown as Lo, Star as Ji, Undo as Zi, Redo as Qi, SquareX as $o, FunctionSquare as Vo, SquareSigma as jo, Ban as ts, AlertCircle as er, CircleCheckIcon as es, CircleXIcon as ns, CircleHelpIcon as rs, ArrowUpIcon as os, ArrowDownIcon as as, PanelLeft as is, PanelRight as ss, ScrollText as ls, MenuIcon as cs, Menu as ds, EllipsisVertical as ws, MoreVertical as eo, LoaderCircle as ps, GripVertical as us } from "lucide-react";
import { clsx as ms } from "clsx";
import { extendTailwindMerge as fs } from "tailwind-merge";
import * as At from "@radix-ui/react-dialog";
import { Canon as ut } from "@sillsdev/scripture";
import { includes as mn, Section as X, getChaptersForBook as hs, formatScrRef as Ne, getSectionForBook as Ze, formatRelativeDate as gs, formatReplacementString as ye, sanitizeHtml as bs, NumberFormat as vs, formatBytes as xs, getCurrentLocale as ys, usfmMarkers as vn, getFormatCallerFunction as Ns, deepEqual as ks, isString as no, compareScrRefs as nr, scrRefToBBBCCCVVV as zn, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as Ue } from "@radix-ui/react-slot";
import { cva as he } from "class-variance-authority";
import * as we from "@radix-ui/react-popover";
import * as zo from "@radix-ui/react-label";
import * as rn from "@radix-ui/react-radio-group";
import { createEditor as Fo, $getRoot as pe, $createParagraphNode as Mn, $getSelection as zt, HISTORY_MERGE_TAG as yr, ParagraphNode as Bo, TextNode as Ko, $isTokenOrSegmented as _s, $getCharacterOffsets as Cs, $cloneWithPropertiesEphemeral as Es, $findMatchingParent as Uo, $isElementNode as ce, $isRangeSelection as Ce, CLEAR_EDITOR_COMMAND as Go, COMMAND_PRIORITY_EDITOR as Ho, mergeRegister as ue, shallowMergeConfig as Ts, defineExtension as Jt, safeCast as dn, createState as Rs, FORMAT_TEXT_COMMAND as qo, $isNodeSelection as Yo, COMMAND_PRIORITY_LOW as Xo, RootNode as Ss, LineBreakNode as Ds, TabNode as Ms, $isEditorState as Os, createCommand as Is, CLICK_COMMAND as As, isDOMNode as Ps, $getNodeFromDOMNode as Ls, $createNodeSelection as $s, $setSelection as Vs, DecoratorNode as rr, $getState as js, toggleTextFormatType as ro, TEXT_TYPE_TO_FORMAT as zs, $setState as Fs, addClassNamesToElement as Wo, $create as Bs, $getNodeByKey as Ks, removeClassNamesFromElement as Us, KEY_TAB_COMMAND as Gs, $isBlockElementNode as kn, $createRangeSelection as Hs, $normalizeSelection__EXPERIMENTAL as qs, OUTDENT_CONTENT_COMMAND as Ys, INDENT_CONTENT_COMMAND as oo, INSERT_TAB_COMMAND as Xs, COMMAND_PRIORITY_CRITICAL as Nr, $isDecoratorNode as Ws, $isParagraphNode as Js, $isTextNode as _n, SELECTION_CHANGE_COMMAND as Jo, getRegisteredNode as Zs, isHTMLElement as Qs, isDocumentFragment as ao, isDOMDocumentNode as tl, ArtificialNode__DO_NOT_USE as Zo, $createLineBreakNode as Qo, $isRootOrShadowRoot as el, isBlockDomNode as io, isInlineDomNode as so, $insertNodes as nl } from "lexical";
import * as Ee from "@radix-ui/react-tooltip";
import { TooltipTrigger as rl } from "@radix-ui/react-tooltip";
import { HeadingNode as ol, QuoteNode as al, registerRichText as il } from "@lexical/rich-text";
import { flushSync as sl, createPortal as ll } from "react-dom";
import { $isTableSelection as cl } from "@lexical/table";
import * as On from "@radix-ui/react-toggle-group";
import * as ta from "@radix-ui/react-toggle";
import { createHeadlessEditor as ea } from "@lexical/headless";
import * as na from "@radix-ui/react-separator";
import * as Ge from "@radix-ui/react-avatar";
import * as rt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as dl } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ra, getFilteredRowModel as wl, getSortedRowModel as oa, getPaginationRowModel as pl, getCoreRowModel as aa, flexRender as Qe, getGroupedRowModel as ul, getExpandedRowModel as ml } from "@tanstack/react-table";
import * as wt from "@radix-ui/react-select";
import fl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as or, HIDDEN_NOTE_CALLER as ar, getDefaultViewOptions as hl, isInsertEmbedOpOfType as fn, Editorial as gl } from "@eten-tech-foundation/platform-editor";
import * as ir from "@radix-ui/react-checkbox";
import * as Rt from "@radix-ui/react-tabs";
import * as ot from "@radix-ui/react-menubar";
import { useHotkeys as bl } from "react-hotkeys-hook";
import * as at from "@radix-ui/react-context-menu";
import { Drawer as Bt } from "vaul";
import * as sr from "@radix-ui/react-progress";
import * as kr from "react-resizable-panels";
import { Toaster as vl } from "sonner";
import { toast as im } from "sonner";
import * as Je from "@radix-ui/react-slider";
import * as lr from "@radix-ui/react-switch";
const xl = fs({ prefix: "tw-" });
function h(...t) {
  return xl(ms(t));
}
const yl = "layoutDirection";
function mt() {
  const t = localStorage.getItem(yl);
  return t === "rtl" ? t : "ltr";
}
const ia = At.Root, sa = At.Portal, _r = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  At.Overlay,
  {
    ref: n,
    className: h(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
_r.displayName = At.Overlay.displayName;
const la = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = mt();
  return /* @__PURE__ */ w(sa, { children: [
    /* @__PURE__ */ r(_r, {}),
    /* @__PURE__ */ w(
      At.Content,
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
          /* @__PURE__ */ w(
            At.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
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
la.displayName = At.Content.displayName;
function Cr({ className: t, ...e }) {
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
Cr.displayName = "DialogHeader";
function Er({ className: t, ...e }) {
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
Er.displayName = "DialogFooter";
const Tr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  At.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Tr.displayName = At.Title.displayName;
const Rr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  At.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Rr.displayName = At.Description.displayName;
const Zt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Zt.displayName = Tt.displayName;
const Se = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Mo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
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
Se.displayName = Tt.Input.displayName;
const Qt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Qt.displayName = Tt.List.displayName;
const He = b.forwardRef((t, e) => /* @__PURE__ */ r(Tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
He.displayName = Tt.Empty.displayName;
const Pt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Pt.displayName = Tt.Group.displayName;
const Sr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Sr.displayName = Tt.Separator.displayName;
const Kt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Kt.displayName = Tt.Item.displayName;
function ca({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ca.displayName = "CommandShortcut";
const da = (t, e, n, o, a) => {
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
}, Nl = (t, e, n, o, a) => {
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
function Ae(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ut.bookIdToEnglishName(t);
}
function Dr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const wa = ut.allBookIds.filter(
  (t) => !ut.isObsolete(ut.bookIdToNumber(t))
), ke = Object.fromEntries(
  wa.map((t) => [t, ut.bookIdToEnglishName(t)])
);
function Mr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ut.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(mn(a.toLowerCase(), o) || mn(t.toLowerCase(), o) || (i ? mn(i.localizedName.toLowerCase(), o) || mn(i.localizedId.toLowerCase(), o) : !1));
}
const pa = cn(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: d
  }, c) => {
    const p = H(!1), u = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, f = (x) => {
      p.current = !0, o ? o(x) : n == null || n(t);
    }, m = K(
      () => Ae(t, l),
      [t, l]
    ), g = K(
      () => Dr(t, l),
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
        children: /* @__PURE__ */ w(
          Kt,
          {
            ref: c,
            value: d || `${t} ${ut.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ut.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Ft,
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
), ua = he(
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
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ue : "button", { className: h(ua({ variant: e, size: n, className: t })), ref: i, ...a })
);
z.displayName = "Button";
const wn = 250, ma = 300, Le = 400, kl = 450, _l = 500, Ut = we.Root, ge = we.Trigger, Or = we.Anchor, Lt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, i) => {
  const s = mt();
  return /* @__PURE__ */ r(we.Portal, { children: /* @__PURE__ */ r(
    we.Content,
    {
      ref: i,
      align: e,
      sideOffset: n,
      className: h(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: wn, ...o },
      ...a,
      dir: s
    }
  ) });
});
Lt.displayName = we.Content.displayName;
function cr(t, e, n) {
  return `${t} ${ke[t]}${e ? ` ${Dr(t, e)} ${Ae(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Cl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: d = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost"
}) {
  const [p, u] = R(!1);
  if (t.length === 0)
    return;
  const f = (m) => {
    e(m), u(!1);
  };
  return /* @__PURE__ */ w(Ut, { open: p, onOpenChange: u, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": a,
        children: /* @__PURE__ */ r(Zr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Lt, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r(Pt, { heading: i, children: t.map((m) => /* @__PURE__ */ w(
      Kt,
      {
        onSelect: () => f(m),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Zr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(m) })
        ]
      },
      o(m)
    )) }) }) }) })
  ] });
}
function Yp(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Fn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, El = [
  Fn.BOOK_ONLY,
  Fn.BOOK_CHAPTER,
  Fn.BOOK_CHAPTER_VERSE
];
function lo(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Yt(t) {
  return hs(ut.bookIdToNumber(t));
}
function Tl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = El.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, d = void 0, c = void 0] = s.slice(1);
        let p;
        const u = e.filter((f) => Mr(f, l, n));
        if (u.length === 1 && ([p] = u), !p && d) {
          if (ut.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (p = f);
          }
          if (!p && n) {
            const f = Array.from(n.entries()).find(
              ([, m]) => m.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([p] = f);
          }
        }
        if (!p && d) {
          const m = ((g) => Object.keys(ke).find(
            (x) => ke[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (m && e.includes(m) && (p = m), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let f = d ? parseInt(d, 10) : void 0;
          f && f > Yt(p) && (f = Math.max(Yt(p), 1));
          const m = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
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
function Rl(t, e, n, o) {
  const a = V(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], p = Math.max(Yt(c), 1);
        o({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = V(() => {
    const d = Yt(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const p = e[c + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = V(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = V(() => {
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
      icon: n === "ltr" ? Qr : to
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? tr : Pe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Pe : tr
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Yt(t.book) || Yt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? to : Qr
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
    return /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Yt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      Kt,
      {
        value: `${t} ${ke[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: h(
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
function Xp({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: d
}) {
  const c = mt(), [p, u] = R(!1), [f, m] = R(""), [g, x] = R(""), [v, y] = R("books"), [N, k] = R(void 0), [C, F] = R(!1), B = H(void 0), A = H(void 0), M = H(void 0), E = H(void 0), S = H({}), j = V(
    (D) => {
      e(D), l && l(D);
    },
    [e, l]
  ), L = K(() => o ? o() : wa, [o]), I = K(() => ({
    [X.OT]: L.filter((_) => ut.isBookOT(_)),
    [X.NT]: L.filter((_) => ut.isBookNT(_)),
    [X.DC]: L.filter((_) => ut.isBookDC(_)),
    [X.Extra]: L.filter((_) => ut.extraBooks().includes(_))
  }), [L]), P = K(() => Object.values(I).flat(), [I]), W = K(() => {
    if (!g.trim()) return I;
    const D = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return [X.OT, X.NT, X.DC, X.Extra].forEach(($) => {
      D[$] = I[$].filter((G) => Mr(G, g, a));
    }), D;
  }, [I, g, a]), O = K(
    () => Tl(g, P, a),
    [g, P, a]
  ), Z = V(() => {
    O && (j({
      book: O.book,
      chapterNum: O.chapterNum ?? 1,
      verseNum: O.verseNum ?? 1
    }), u(!1), x(""), m(""));
  }, [j, O]), St = V(
    (D) => {
      if (Yt(D) <= 1) {
        j({
          book: D,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), x("");
        return;
      }
      k(D), y("chapters");
    },
    [j]
  ), $t = V(
    (D) => {
      const _ = v === "chapters" ? N : O == null ? void 0 : O.book;
      _ && (j({
        book: _,
        chapterNum: D,
        verseNum: 1
      }), u(!1), y("books"), k(void 0), x(""));
    },
    [j, v, N, O]
  ), Mt = V(
    (D) => {
      j(D), u(!1), x("");
    },
    [j]
  ), gt = Rl(t, P, c, e), pt = V(() => {
    y("books"), k(void 0), setTimeout(() => {
      A.current && A.current.focus();
    }, 0);
  }, []), U = V(
    (D) => {
      if (!D && v === "chapters") {
        pt();
        return;
      }
      u(D), D && (y("books"), k(void 0), x(""));
    },
    [v, pt]
  ), { otLong: it, ntLong: st, dcLong: ct, extraLong: xt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ee = V(
    (D) => da(D, it, st, ct, xt),
    [it, st, ct, xt]
  ), Ht = V(
    (D) => O ? !!O.chapterNum && !D.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), ne = K(
    () => Ne(
      t,
      a ? Ae(t.book, a) : "English"
    ),
    [t, a]
  ), Me = V((D) => (_) => {
    S.current[D] = _;
  }, []), se = V((D) => {
    (D.key === "Home" || D.key === "End") && D.stopPropagation();
  }, []), re = V(
    (D) => {
      if (D.ctrlKey) return;
      const { isLetter: _, isDigit: $ } = lo(D.key);
      if (v === "chapters") {
        if (D.key === "Backspace") {
          D.preventDefault(), D.stopPropagation(), pt();
          return;
        }
        if (_ || $) {
          if (D.preventDefault(), D.stopPropagation(), y("books"), k(void 0), $ && N) {
            const G = ke[N];
            x(`${G} ${D.key}`);
          } else
            x(D.key);
          setTimeout(() => {
            A.current && A.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && O) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(D.key)) {
        const G = v === "chapters" ? N : O == null ? void 0 : O.book;
        if (!G) return;
        const Y = (() => {
          if (!f) return 1;
          const dt = f.match(/(\d+)$/);
          return dt ? parseInt(dt[1], 10) : 0;
        })(), lt = Yt(G);
        if (!lt) return;
        let et = Y;
        const bt = 6;
        switch (D.key) {
          case "ArrowLeft":
            Y !== 0 && (et = Y > 1 ? Y - 1 : lt);
            break;
          case "ArrowRight":
            Y !== 0 && (et = Y < lt ? Y + 1 : 1);
            break;
          case "ArrowUp":
            et = Y === 0 ? lt : Math.max(1, Y - bt);
            break;
          case "ArrowDown":
            et = Y === 0 ? 1 : Math.min(lt, Y + bt);
            break;
          default:
            return;
        }
        et !== Y && (D.preventDefault(), D.stopPropagation(), m(cr(G, a, et)), setTimeout(() => {
          const dt = S.current[et];
          dt && dt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      O,
      pt,
      N,
      f,
      a
    ]
  ), Ye = V((D) => {
    if (D.shiftKey || D.key === "Tab" || D.key === " ") return;
    const { isLetter: _, isDigit: $ } = lo(D.key);
    (_ || $) && (D.preventDefault(), x((G) => G + D.key), A.current.focus(), F(!1));
  }, []);
  return It(() => {
    const D = setTimeout(() => {
      if (p && v === "books" && M.current && E.current) {
        const _ = M.current, $ = E.current, G = $.offsetTop, Y = _.clientHeight, lt = $.clientHeight, et = G - Y / 2 + lt / 2;
        _.scrollTo({
          top: Math.max(0, et),
          behavior: "smooth"
        }), m(cr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(D);
    };
  }, [p, v, g, O, t.book]), It(() => {
    if (v === "chapters" && N) {
      const D = N === t.book;
      setTimeout(() => {
        if (M.current)
          if (D) {
            const _ = S.current[t.chapterNum];
            _ && _.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            M.current.scrollTo({ top: 0 });
        B.current && B.current.focus();
      }, 0);
    }
  }, [v, N, O, t.book, t.chapterNum]), /* @__PURE__ */ w(Ut, { open: p, onOpenChange: U, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: ne })
      }
    ) }),
    /* @__PURE__ */ r(Lt, { id: d, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ w(
      Zt,
      {
        ref: B,
        onKeyDown: re,
        loop: !0,
        value: f,
        onValueChange: m,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ w("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ w("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Se,
                {
                  ref: A,
                  value: g,
                  onValueChange: x,
                  onKeyDown: se,
                  onFocus: () => F(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Cl,
                {
                  recentSearches: s,
                  onSearchItemSelect: Mt,
                  renderItem: (D) => Ne(D, "English"),
                  getItemKey: (D) => `${D.book}-${D.chapterNum}-${D.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: gt.map(({ onClick: D, disabled: _, title: $, icon: G }) => /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  F(!0), D();
                },
                disabled: _,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: $,
                onKeyDown: Ye,
                children: /* @__PURE__ */ r(G, {})
              },
              $
            )) })
          ] }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: pt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(Ii, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Ai, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Ae(N, a) })
          ] }),
          !C && /* @__PURE__ */ w(Qt, { ref: M, children: [
            v === "books" && /* @__PURE__ */ w(J, { children: [
              !O && Object.entries(W).map(([D, _]) => {
                if (_.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Pt, { heading: ee(D), children: _.map(($) => /* @__PURE__ */ r(
                      pa,
                      {
                        bookId: $,
                        onSelect: (G) => St(G),
                        section: Ze($),
                        commandValue: `${$} ${ke[$]}`,
                        ref: $ === t.book ? E : void 0,
                        localizedBookNames: a
                      },
                      $
                    )) }, D)
                  );
              }),
              O && /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r(
                Kt,
                {
                  value: `${O.book} ${ke[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                  onSelect: Z,
                  className: "tw-font-semibold tw-text-primary",
                  children: Ne(
                    {
                      book: O.book,
                      chapterNum: O.chapterNum ?? 1,
                      verseNum: O.verseNum ?? 1
                    },
                    a ? Dr(O.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              O && Yt(O.book) > 1 && /* @__PURE__ */ w(J, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Ae(O.book, a) }),
                /* @__PURE__ */ r(
                  co,
                  {
                    bookId: O.book,
                    scrRef: t,
                    onChapterSelect: $t,
                    setChapterRef: Me,
                    isChapterDimmed: Ht,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && N && /* @__PURE__ */ r(
              co,
              {
                bookId: N,
                scrRef: t,
                onChapterSelect: $t,
                setChapterRef: Me,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Wp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Sl = he(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ht = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(zo.Root, { ref: n, className: h("pr-twp", Sl(), t), ...e }));
ht.displayName = zo.Root.displayName;
const Ir = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    rn.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Ir.displayName = rn.Root.displayName;
const Cn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rn.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(rn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Dn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Cn.displayName = rn.Item.displayName;
function Dl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function dr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: d = Dl,
  getButtonLabel: c,
  icon: p = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: f = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: v = !1,
  ariaLabel: y,
  ...N
}) {
  const [k, C] = R(!1), F = c ?? d, B = (M) => M.length > 0 && typeof M[0] == "object" && "options" in M[0], A = (M, E) => {
    const S = d(M), j = typeof M == "object" && "secondaryLabel" in M ? M.secondaryLabel : void 0, L = `${E ?? ""}${S}${j ?? ""}`;
    return /* @__PURE__ */ w(
      Kt,
      {
        value: S,
        onSelect: () => {
          l(M), C(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Ft,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || d(s) !== S
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            S,
            j && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              j
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ w(Ut, { open: k, onOpenChange: C, ...N, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ w(
      z,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": y,
        id: t,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: p }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? F(s) : u
              }
            )
          ] }),
          /* @__PURE__ */ r(Ke, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Lt,
      {
        align: x,
        className: h("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ w(Zt, { children: [
          /* @__PURE__ */ r(Se, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(He, { children: m }),
          /* @__PURE__ */ r(Qt, { children: B(e) ? e.map((M) => /* @__PURE__ */ r(Pt, { heading: M.groupHeading, children: M.options.map((E) => A(E, M.groupHeading)) }, M.groupHeading)) : e.map((M) => A(M)) })
        ] })
      }
    )
  ] });
}
function Ml({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = K(
    () => Array.from({ length: i }, (c, p) => p + 1),
    [i]
  );
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(ht, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      dr,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(ht, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      dr,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var wr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(wr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(wr || (wr = {}));
const Jp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Bn = (t, e) => t[e] ?? e;
function Zp({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: c
}) {
  const p = Bn(c, "%webView_bookSelector_currentBook%"), u = Bn(c, "%webView_bookSelector_choose%"), f = Bn(c, "%webView_bookSelector_chooseBooks%"), [m, g] = R(
    "current book"
    /* CurrentBook */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    Ir,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ht, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(ht, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Ml,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ht, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(ht, { className: "tw-flex tw-items-center", children: o.map((v) => ut.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            z,
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
const fa = Sn(null);
function Ol(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function te() {
  const t = xr(fa);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ha = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Il = ha ? It : q, hn = { tag: yr };
function Al({ initialConfig: t, children: e }) {
  const n = K(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: d } = t, c = Ol(null, o), p = Fo({ editable: t.editable, html: d, namespace: a, nodes: i, onError: (u) => s(u, p), theme: o });
    return function(u, f) {
      if (f !== null) {
        if (f === void 0) u.update(() => {
          const m = pe();
          if (m.isEmpty()) {
            const g = Mn();
            m.append(g);
            const x = ha ? document.activeElement : null;
            (zt() !== null || x !== null && x === u.getRootElement()) && g.select();
          }
        }, hn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const m = u.parseEditorState(f);
            u.setEditorState(m, hn);
            break;
          }
          case "object":
            u.setEditorState(f, hn);
            break;
          case "function":
            u.update(() => {
              pe().isEmpty() && f(u);
            }, hn);
        }
      }
    }(p, l), [p, c];
  }, []);
  return Il(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(fa.Provider, { value: n, children: e });
}
const Pl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : q;
function Ll({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = te();
  return Pl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(yr) || l.isEmpty() || n(a, o, d);
    });
  }, [o, t, e, n]), null;
}
const Ar = {
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
}, kt = Ee.Provider, Ct = Ee.Root, Et = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Ee.Trigger,
  {
    ref: o,
    className: e ? h(ua({ variant: e }), t) : t,
    ...n
  }
));
Et.displayName = Ee.Trigger.displayName;
const _t = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(Ee.Portal, { children: /* @__PURE__ */ r(
  Ee.Content,
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
_t.displayName = Ee.Content.displayName;
const Pr = [
  ol,
  Bo,
  Ko,
  al
], $l = Sn(null), Kn = {
  didCatch: !1,
  error: null
};
class Vl extends Mi {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Kn;
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
      }), this.setState(Kn);
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
    if (o && n.error !== null && jl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Kn);
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
      const d = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(d);
      else if (o)
        l = Jr(o, d);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Jr($l.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function jl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function zl({ children: t, onError: e }) {
  return r(Vl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Fl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : q;
function Bl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Kl() {
  return function(t) {
    const [e] = te(), n = K(() => t(e), [e, t]), [o, a] = R(() => n.initialValueFn()), i = H(o);
    return Fl(() => {
      const { initialValueFn: s, subscribe: l } = n, d = s();
      return i.current !== d && (i.current = d, a(d)), l((c) => {
        i.current = c, a(c);
      });
    }, [n, t]), o;
  }(Bl);
}
function Ul(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !_s(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), d = i.getNode(), c = e.is(l), p = e.is(d);
    if (c || p) {
      const [u, f] = Cs(t), m = l.is(d), g = e.is(s ? d : l), x = e.is(s ? l : d);
      let v, y = 0;
      m ? (y = u > f ? f : u, v = u > f ? u : f) : g ? (y = s ? f : u, v = void 0) : x && (y = 0, v = s ? u : f);
      const N = e.__text.slice(y, v);
      N !== e.__text && (n === "clone" && (e = Es(e)), e.__text = N);
    }
  }
  return e;
}
function Gl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ga = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Hl = ga && "documentMode" in document ? document.documentMode : null;
!(!ga || !("InputEvent" in window) || Hl) && "getTargetRanges" in new window.InputEvent("input");
function ql(t) {
  const e = Uo(t, (n) => ce(n) && !n.isInline());
  return ce(e) || Gl(4, t.__key), e;
}
function Yl(t) {
  const e = zt();
  if (!Ce(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Uo(i, (c) => ce(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
const Xl = Symbol.for("preact-signals");
function In() {
  if (de > 1) return void de--;
  let t, e = !1;
  for (; tn !== void 0; ) {
    let n = tn;
    for (tn = void 0, pr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && ba(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (pr = 0, de--, e) throw t;
}
function Wl(t) {
  if (de > 0) return t();
  de++;
  try {
    return t();
  } finally {
    In();
  }
}
let Q, tn;
function wo(t) {
  const e = Q;
  Q = void 0;
  try {
    return t();
  } finally {
    Q = e;
  }
}
let de = 0, pr = 0, xn = 0;
function po(t) {
  if (Q === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Q ? (e = { i: 0, S: t, p: Q.s, n: void 0, t: Q, e: void 0, x: void 0, r: e }, Q.s !== void 0 && (Q.s.n = e), Q.s = e, t.n = e, 32 & Q.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Q.s, e.n = void 0, Q.s.n = e, Q.s = e), e) : void 0;
}
function Nt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function on(t, e) {
  return new Nt(t, e);
}
function ba(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function uo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function va(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ve(t, e) {
  Nt.call(this, void 0), this.x = t, this.s = void 0, this.g = xn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Jl(t, e) {
  return new ve(t, e);
}
function xa(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    de++;
    const n = Q;
    Q = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Lr(t), o;
    } finally {
      Q = n, In();
    }
  }
}
function Lr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, xa(t);
}
function Zl(t) {
  if (Q !== this) throw new Error("Out-of-order effect");
  va(this), Q = t, this.f &= -2, 8 & this.f && Lr(this), In();
}
function Ie(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function me(t, e) {
  const n = new Ie(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function An(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = on(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
Nt.prototype.brand = Xl, Nt.prototype.h = function() {
  return !0;
}, Nt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : wo(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, Nt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && wo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Nt.prototype.subscribe = function(t) {
  return me(() => {
    const e = this.value, n = Q;
    Q = void 0;
    try {
      t(e);
    } finally {
      Q = n;
    }
  }, { name: "sub" });
}, Nt.prototype.valueOf = function() {
  return this.value;
}, Nt.prototype.toString = function() {
  return this.value + "";
}, Nt.prototype.toJSON = function() {
  return this.value;
}, Nt.prototype.peek = function() {
  const t = Q;
  Q = void 0;
  try {
    return this.value;
  } finally {
    Q = t;
  }
}, Object.defineProperty(Nt.prototype, "value", { get() {
  const t = po(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (pr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, xn++, de++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      In();
    }
  }
} }), ve.prototype = new Nt(), ve.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === xn)) return !0;
  if (this.g = xn, this.f |= 1, this.i > 0 && !ba(this)) return this.f &= -2, !0;
  const t = Q;
  try {
    uo(this), Q = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Q = t, va(this), this.f &= -2, !0;
}, ve.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Nt.prototype.S.call(this, t);
}, ve.prototype.U = function(t) {
  if (this.t !== void 0 && (Nt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ve.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ve.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = po(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ie.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ie.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, xa(this), uo(this), de++;
  const t = Q;
  return Q = this, Zl.bind(this, t);
}, Ie.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = tn, tn = this);
}, Ie.prototype.d = function() {
  this.f |= 8, 1 & this.f || Lr(this);
}, Ie.prototype.dispose = function() {
  this.d();
};
Jt({ build: (t, e, n) => An(e), config: dn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return me(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ya() {
  const t = pe(), e = zt(), n = Mn();
  t.clear(), t.append(n), e !== null && n.select(), Ce(e) && (e.format = 0);
}
function Na(t, e = ya) {
  return t.registerCommand(Go, (n) => (t.update(e), !0), Ho);
}
Jt({ build: (t, e, n) => An(e), config: dn({ $onClear: ya }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return me(() => Na(t, o.value));
} });
function Ql(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Un = Rs("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ka extends rr {
  $config() {
    return this.config("decorator-text", { extends: rr, stateConfigs: [{ flat: !0, stateConfig: Un }] });
  }
  getFormat() {
    return js(this, Un);
  }
  getFormatFlags(e, n) {
    return ro(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = zs[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Fs(this, Un, e);
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
function tc(t) {
  return t instanceof ka;
}
Jt({ name: "@lexical/extension/DecoratorText", nodes: () => [ka], register: (t, e, n) => t.registerCommand(qo, (o) => {
  const a = zt();
  if (Yo(a) || Ce(a)) for (const i of a.getNodes()) tc(i) && i.toggleFormat(o);
  return !1;
}, Xo) });
function _a(t, e) {
  let n;
  return on(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const ur = Jt({ build: (t) => _a(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ca(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Ca(n[a], o[a]);
    return t;
  }
  return e;
}
const $r = 0, mr = 1, Ea = 2, Gn = 3, gn = 4, Oe = 5, Hn = 6, Xe = 7;
function qn(t) {
  return t.id === $r;
}
function Ta(t) {
  return t.id === Ea;
}
function ec(t) {
  return function(e) {
    return e.id === mr;
  }(t) || nt(305, String(t.id), String(mr)), Object.assign(t, { id: Ea });
}
const nc = /* @__PURE__ */ new Set();
class rc {
  constructor(e, n) {
    yt(this, "builder");
    yt(this, "configs");
    yt(this, "_dependency");
    yt(this, "_peerNameSet");
    yt(this, "extension");
    yt(this, "state");
    yt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: $r };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ts;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Ta(n) || nt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, d, c) {
      return Object.assign(l, { config: d, id: Gn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: gn, initResult: d, registerState: c });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== gn && nt(307, String(n.id), String(Oe)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Oe, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Oe && nt(308, String(o.id), String(Oe));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Hn });
    }(o), () => {
      const i = this.state;
      i.id !== Xe && nt(309, String(o.id), String(Xe)), this.state = function(s) {
        return Object.assign(s, { id: Oe });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Hn && nt(310, String(n.id), String(Hn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Xe });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && nt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && nt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= gn;
    }(e) || nt(313, String(e.id), String(gn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Gn;
    }(e) || nt(314, String(e.id), String(Gn)), { config: e.config };
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
      return n.id >= Xe;
    }(e) || nt(316, String(e.id), String(Xe)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || nc;
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
const mo = { tag: yr };
function oc() {
  const t = pe();
  t.isEmpty() && t.append(Mn());
}
const ac = Jt({ config: dn({ setOptions: mo, updateOptions: mo }), init: ({ $initialEditorState: t = oc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (Os(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Ss, Ko, Ds, Ms, Bo] }), fo = Symbol.for("@lexical/extension/LexicalBuilder");
function ho() {
}
function ic(t) {
  throw t;
}
function bn(t) {
  return Array.isArray(t) ? t : [t];
}
const Yn = "0.41.0+prod.esm";
class en {
  constructor(e) {
    yt(this, "roots");
    yt(this, "extensionNameMap");
    yt(this, "outgoingConfigEdges");
    yt(this, "incomingEdges");
    yt(this, "conflicts");
    yt(this, "_sortedExtensionReps");
    yt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Yn, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [bn(ac)];
    for (const o of e) n.push(bn(o));
    return new en(n);
  }
  static maybeFromEditor(e) {
    const n = e[fo];
    return n && (n.PACKAGE_VERSION !== Yn && nt(292, n.PACKAGE_VERSION, Yn), n instanceof en || nt(293)), n;
  }
  static fromEditor(e) {
    const n = en.maybeFromEditor(e);
    return n === void 0 && nt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Fo({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [fo]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = ho;
    function n() {
      try {
        e();
      } finally {
        e = ho;
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
    if (n) return n.extension !== e && nt(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const i = this.incomingEdges.get(n);
    i ? i.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && nt(296);
    const n = bn(e), [o] = n;
    typeof o.name != "string" && nt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && nt(298, o.name), !a) {
      a = new rc(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && nt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && nt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = bn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (Ta(i)) return;
      const s = o.extension.name;
      var l;
      qn(i) || nt(300, s, a || "[unknown]"), qn(l = i) || nt(304, String(l.id), String($r)), i = Object.assign(l, { id: mr }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const c of d.keys()) {
        const p = this.extensionNameMap.get(c);
        p && n(p, s);
      }
      i = ec(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) qn(o.state) && n(o);
    for (const o of e) for (const [a, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && nt(301, o.name);
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
    return ue(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: u } = p;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const f of Ql(u)) {
        if (typeof f != "function") {
          const m = o.get(f.replace);
          m && nt(302, u.name, f.replace.name, m.extension.name), o.set(f.replace, p);
        }
        n.add(f);
      }
      if (u.html) {
        if (u.html.export) for (const [f, m] of u.html.export.entries()) a.set(f, m);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && Ca(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const d = Object.keys(i).length > 0, c = a.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = i), c && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = ic), e;
  }
}
const sc = /* @__PURE__ */ new Set(), go = Jt({ build(t, e, n) {
  const o = n.getDependency(ur).output, a = on({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = _a(() => {
  }, () => me(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let d, c = !1;
    o.value.read(() => {
      if (zt()) for (const [p, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(p);
          continue;
        }
        const f = Ks(p), m = f && f.isSelected() || !1;
        c = c || m !== (!!s && s.has(p)), m && (d = d || /* @__PURE__ */ new Set(), d.add(p));
      }
    }), !c && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const l = Jl(() => (i.value || sc).has(s)), { watchedNodeKeys: d } = a.peek();
    let c = d.get(s);
    const p = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), p || (d.set(s, c), a.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [ur], name: "@lexical/extension/NodeSelection" });
Is("INSERT_HORIZONTAL_RULE_COMMAND");
class $e extends rr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new $e(e.__key);
  }
  static importJSON(e) {
    return Ra().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: lc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Wo(n, e.theme.hr), n;
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
function lc() {
  return { node: Ra() };
}
function Ra() {
  return Bs($e);
}
function cc(t) {
  return t instanceof $e;
}
Jt({ dependencies: [ur, go], name: "@lexical/extension/HorizontalRule", nodes: () => [$e], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(go).output, a = on({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ue(t.registerCommand(As, (s) => {
    if (Ps(s.target)) {
      const l = Ls(s.target);
      if (cc(l)) return function(d, c = !1) {
        const p = zt(), u = d.isSelected(), f = d.getKey();
        let m;
        c && Yo(p) ? m = p : (m = $s(), Vs(m)), u ? m.delete(f) : m.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Xo), t.registerMutationListener($e, (s, l) => {
    Wl(() => {
      let d = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, u] of s.entries()) if (u === "destroyed") c.delete(p), d = !0;
      else {
        const f = c.get(p), m = t.getElementByKey(p);
        f ? f.domNode.value = m : (d = !0, c.set(p, { domNode: on(m), selectedSignal: o(p) }));
      }
      d && (a.value = { nodeSelections: c });
    });
  }), me(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: d } of a.value.nodeSelections.values()) s.push(me(() => {
      const c = l.value;
      c && (d.value ? Wo(c, i) : Us(c, i));
    }));
    return ue(...s);
  }));
} });
function Sa(t) {
  return t.canBeEmpty();
}
function dc(t, e, n = Sa) {
  return ue(t.registerCommand(Gs, (o) => {
    const a = zt();
    if (!Ce(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => kn(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, d = s.focus, c = d.isBefore(l) ? d : l, p = c.getNode(), u = ql(p);
      if (u.canIndent()) {
        const f = u.getKey();
        let m = Hs();
        if (m.anchor.set(f, 0, "element"), m.focus.set(f, 0, "element"), m = qs(m), m.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Ys : oo : Xs;
    return t.dispatchCommand(i, void 0);
  }, Ho), t.registerCommand(oo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = zt();
    if (!Ce(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return Yl((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, Nr));
}
Jt({ build: (t, e, n) => An(e), config: dn({ $canIndent: Sa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return me(() => {
    if (!o.value) return dc(t, a, i);
  });
} });
const wc = Jt({ name: "@lexical/react/ReactProvider" });
function pc() {
  return pe().getTextContent();
}
function uc(t, e = !0) {
  if (t) return !1;
  let n = pc();
  return e && (n = n.trim()), n === "";
}
function mc(t) {
  if (!uc(t, !1)) return !1;
  const e = pe().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Ws(a)) return !1;
    if (ce(a)) {
      if (!Js(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const d = i[o];
        if (!_n(d)) return !1;
      }
    }
  }
  return !0;
}
function Da(t) {
  return () => mc(t);
}
function Ma(t) {
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
          const d = l.args;
          if (d) {
            const [c, p, u, f, m] = d;
            t.update(() => {
              const g = zt();
              if (Ce(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (_n(v) && c >= 0 && p >= 0 && (y = c, N = c + p, g.setTextNodeRange(v, y, v, N)), y === N && u === "" || (g.insertRawText(u), v = x.getNode()), _n(v)) {
                  y = f, N = f + m;
                  const k = v.getTextContentSize();
                  y = y > k ? k : y, N = N > k ? k : N, g.setTextNodeRange(v, y, v, N);
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
Jt({ build: (t, e, n) => An(e), config: dn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => me(() => n.getOutput().disabled.value ? void 0 : Ma(t)) });
function fc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Vr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : q;
function hc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = R(() => n.getDecorators());
    return Vr(() => n.registerDecoratorListener((s) => {
      sl(() => {
        i(s);
      });
    }), [n]), q(() => {
      i(n.getDecorators());
    }, [n]), K(() => {
      const s = [], l = Object.keys(a);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], p = r(o, { onError: (f) => n._onError(f), children: r(Oi, { fallback: null, children: a[c] }) }), u = n.getElementByKey(c);
        u !== null && s.push(ll(p, u, c));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function gc({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = en.maybeFromEditor(n);
    if (o && o.hasExtensionByName(wc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && fc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(hc, { editor: t, ErrorBoundary: e });
}
function bo(t) {
  return t.getEditorState().read(Da(t.isComposing()));
}
function bc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = te();
  return function(a) {
    Vr(() => ue(il(a), Ma(a)), [a]);
  }(o), w(J, { children: [t, r(vc, { content: e }), r(gc, { editor: o, ErrorBoundary: n })] });
}
function vc({ content: t }) {
  const [e] = te(), n = function(a) {
    const [i, s] = R(() => bo(a));
    return Vr(() => {
      function l() {
        const d = bo(a);
        s(d);
      }
      return l(), ue(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = Kl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function xc({ defaultSelection: t }) {
  const [e] = te();
  return q(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const yc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : q;
function Nc({ onClear: t }) {
  const [e] = te();
  return yc(() => Na(e, t), [e, t]), null;
}
const Oa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : q;
function kc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: u, ariaRequired: f, autoCapitalize: m, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: k, "data-testid": C, ...F }, B) {
  const [A, M] = R(t.isEditable()), E = V((j) => {
    j && j.ownerDocument && j.ownerDocument.defaultView ? t.setRootElement(j) : t.setRootElement(null);
  }, [t]), S = K(() => /* @__PURE__ */ function(...j) {
    return (L) => {
      for (const I of j) typeof I == "function" ? I(L) : I != null && (I.current = L);
    };
  }(B, E), [E, B]);
  return Oa(() => (M(t.isEditable()), t.registerEditableListener((j) => {
    M(j);
  })), [t]), r("div", { "aria-activedescendant": A ? e : void 0, "aria-autocomplete": A ? n : "none", "aria-controls": A ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": A && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": A ? u : void 0, "aria-readonly": !A || void 0, "aria-required": f, autoCapitalize: m, className: g, contentEditable: A, "data-testid": C, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: k, ...F });
}
const _c = cn(kc);
function vo(t) {
  return t.getEditorState().read(Da(t.isComposing()));
}
const Cc = cn(Ec);
function Ec(t, e) {
  const { placeholder: n, ...o } = t, [a] = te();
  return w(J, { children: [r(_c, { editor: a, ...o, ref: e }), n != null && r(Tc, { editor: a, content: n })] });
}
function Tc({ content: t, editor: e }) {
  const n = function(s) {
    const [l, d] = R(() => vo(s));
    return Oa(() => {
      function c() {
        const p = vo(s);
        d(p);
      }
      return c(), ue(s.registerUpdateListener(() => {
        c();
      }), s.registerEditableListener(() => {
        c();
      }));
    }, [s]), l;
  }(e), [o, a] = R(e.isEditable());
  if (It(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function Rc({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Cc,
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
const Ia = Sn(void 0);
function Sc({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: i
}) {
  const s = K(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(Ia.Provider, { value: s, children: i });
}
function Aa() {
  const t = xr(Ia);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Dc() {
  const [t, e] = R(void 0), n = V(() => {
    e(void 0);
  }, []), o = K(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(ia, { open: !0, onOpenChange: n, children: /* @__PURE__ */ w(la, { children: [
      /* @__PURE__ */ r(Cr, { children: /* @__PURE__ */ r(Tr, { children: i }) }),
      s
    ] }) });
  }, [t, n]), a = V(
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
function Mc({
  children: t
}) {
  const [e] = te(), [n, o] = R(e), [a, i] = R("paragraph"), [s, l] = Dc(), d = () => {
  };
  return q(() => n.registerCommand(
    Jo,
    (c, p) => (o(p), !1),
    Nr
  ), [n]), /* @__PURE__ */ w(
    Sc,
    {
      activeEditor: n,
      $updateToolbar: d,
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
function Oc(t) {
  const [e] = te(), { activeEditor: n } = Aa();
  q(() => n.registerCommand(
    Jo,
    () => {
      const o = zt();
      return o && t(o), !1;
    },
    Nr
  ), [e, t]), q(() => {
    n.getEditorState().read(() => {
      const o = zt();
      o && t(o);
    });
  }, [n, t]);
}
const Pa = he(
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
), Ic = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  ta.Root,
  {
    ref: a,
    className: h(Pa({ variant: e, size: n, className: t })),
    ...o
  }
));
Ic.displayName = ta.Root.displayName;
const La = b.createContext({
  size: "default",
  variant: "default"
}), jr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = mt();
  return /* @__PURE__ */ r(
    On.Root,
    {
      ref: i,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        La.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
jr.displayName = On.Root.displayName;
const nn = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = b.useContext(La);
  return /* @__PURE__ */ r(
    On.Item,
    {
      ref: i,
      className: h(
        Pa({
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
nn.displayName = On.Item.displayName;
const xo = [
  { format: "bold", icon: Pi, label: "Bold" },
  { format: "italic", icon: Li, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Ac() {
  const { activeEditor: t } = Aa(), [e, n] = R([]), o = V((a) => {
    if (Ce(a) || cl(a)) {
      const i = [];
      xo.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Oc(o), /* @__PURE__ */ r(
    jr,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: xo.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        nn,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(qo, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Pc({ onClear: t }) {
  const [e] = te();
  q(() => {
    t && t(() => {
      e.dispatchCommand(Go, void 0);
    });
  }, [e, t]);
}
function Lc({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = R(void 0);
  return /* @__PURE__ */ w("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Mc, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Ac, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        bc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(Rc, { placeholder: t }) }),
          ErrorBoundary: zl
        }
      ),
      e && /* @__PURE__ */ r(xc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Pc, { onClear: n }),
      /* @__PURE__ */ r(Nc, {})
    ] })
  ] });
}
const $c = {
  namespace: "commentEditor",
  theme: Ar,
  nodes: Pr,
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
  autoFocus: i = !1,
  onClear: s,
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
          Al,
          {
            initialConfig: {
              ...$c,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(kt, { children: [
              /* @__PURE__ */ r(Lc, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                Ll,
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
function Vc(t, e) {
  const n = tl(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!Va.has(i.nodeName)) {
    const s = ja(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Zo && s.insertAfter(Qo());
    for (const s of i) {
      const l = s.getChildren();
      for (const d of l) s.insertBefore(d);
      s.remove();
    }
  }(a), o;
}
function jc(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = pe().getChildren();
  for (let a = 0; a < o.length; a++)
    $a(t, o[a], n, e);
  return n.innerHTML;
}
function $a(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = ce(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && _n(e) && (s = Ul(o, e, "clone"));
  const l = ce(s) ? s.getChildren() : [], d = Zs(t, s.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, s) : s.exportDOM(t);
  const { element: p, after: u } = c;
  if (!p) return !1;
  const f = document.createDocumentFragment();
  for (let m = 0; m < l.length; m++) {
    const g = l[m], x = $a(t, g, f, o);
    !a && ce(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Qs(p) || ao(p)) && p.append(f), n.append(p), u) {
      const m = u.call(s, p);
      m && (ao(p) ? p.replaceChildren(m) : p.replaceWith(m));
    }
  } else n.append(f);
  return a;
}
const Va = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ja(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Va.has(t.nodeName)) return s;
  let l = null;
  const d = function(g, x) {
    const { nodeName: v } = g, y = x._htmlConversions.get(v.toLowerCase());
    let N = null;
    if (y !== void 0) for (const k of y) {
      const C = k(g);
      C !== null && (N === null || (N.priority || 0) <= (C.priority || 0)) && (N = C);
    }
    return N !== null ? N.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let p = null;
  if (c !== null) {
    p = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const u = t.childNodes;
  let f = [];
  const m = (l == null || !el(l)) && (l != null && kn(l) || o);
  for (let g = 0; g < u.length; g++) f.push(...ja(u[g], e, n, m, new Map(a), l));
  return p != null && (f = p(f)), io(t) && (f = zc(t, f, m ? () => {
    const g = new Zo();
    return n.push(g), g;
  } : Mn)), l == null ? f.length > 0 ? s = s.concat(f) : io(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : so(g.nextSibling) && so(g.previousSibling);
  }(t) && (s = s.concat(Qo())) : ce(l) && l.append(...f), s;
}
function zc(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (kn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && kn(e[s + 1])) {
      const d = n();
      d.setFormat(o), d.append(...i), a.push(d), i = [];
    }
  }
  return a;
}
function za(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Fa(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Fa(e.children)
  ) : !1;
}
function jt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Fa(t.root.children) : !1;
}
function Fc(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = ea({
    namespace: "EditorUtils",
    theme: Ar,
    nodes: Pr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = Vc(e, a);
      pe().clear(), nl(i);
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
  const e = ea({
    namespace: "EditorUtils",
    theme: Ar,
    nodes: Pr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = jc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function zr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function yn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Fr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Bc = {
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
function Xn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Qp({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = R(Bc), [s, l] = R(void 0), [d, c] = R(!1), p = H(void 0), u = H(null);
  q(() => {
    let y = !0;
    const N = u.current;
    if (!N) return;
    const k = setTimeout(() => {
      y && za(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(k);
    };
  }, []);
  const f = V(() => {
    if (!jt(a)) return;
    const y = Tn(a);
    e(y, s);
  }, [a, e, s]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Be, {}) }) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
          /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
            z,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !jt(a),
              children: /* @__PURE__ */ r(Ft, {})
            }
          ) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Ut, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ w(
        z,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Oo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Xn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Lt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(Qt, { children: t.map((y) => /* @__PURE__ */ r(
            Kt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Xn(y, o) })
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
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : Fr(y) && (y.preventDefault(), y.stopPropagation(), jt(a) && f());
        },
        onKeyDown: (y) => {
          zr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          En,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => i(y),
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
const tu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), eu = [
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
], Kc = ["input", "select", "textarea", "button"], Uc = ["button", "textbox"], Gc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = H(null), [i, s] = R(void 0), [l, d] = R(void 0), c = V(
    (m) => {
      s(m);
      const g = t.find((v) => v.id === m);
      g && (e == null || e(g));
      const x = document.getElementById(m);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), p = V(
    (m) => {
      const g = t.find((x) => x.id === m);
      g && (d((x) => x === m ? void 0 : m), n == null || n(g));
    },
    [n, t]
  ), u = (m) => {
    if (!m) return !1;
    const g = m.tagName.toLowerCase();
    if (m.isContentEditable || Kc.includes(g)) return !0;
    const x = m.getAttribute("role");
    if (x && Uc.includes(x)) return !0;
    const v = m.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, f = V(
    (m) => {
      var A;
      const g = m.target, x = (M) => M ? document.getElementById(M) : void 0, v = x(l), y = x(i);
      if (!!(v && g && v.contains(g) && g !== v) && u(g)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const M = t.find((E) => E.id === l);
            M && c(M.id);
          }
          return;
        }
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
          if (!v) return;
          const M = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const E = M.findIndex((j) => j === g);
          if (E === -1) return;
          let S;
          m.key === "ArrowDown" ? S = Math.min(E + 1, M.length - 1) : S = Math.max(E - 1, 0), S !== E && (m.preventDefault(), m.stopPropagation(), (A = M[S]) == null || A.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((M) => M.id === i);
      let F = C;
      switch (m.key) {
        case "ArrowDown":
          F = Math.min(C + 1, t.length - 1), m.preventDefault();
          break;
        case "ArrowUp":
          F = Math.max(C - 1, 0), m.preventDefault();
          break;
        case "Home":
          F = 0, m.preventDefault();
          break;
        case "End":
          F = t.length - 1, m.preventDefault();
          break;
        case " ":
        case "Enter":
          i && p(i), m.preventDefault(), m.stopPropagation();
          return;
        case "ArrowRight": {
          const M = y;
          if (M) {
            const E = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), j = E ?? S;
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
      const B = t[F];
      B && c(B.id);
    },
    [t, c, i, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: c
  };
}, Hc = he(
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
), Ve = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", Hc({ variant: e }), t), ...n })
);
Ve.displayName = "Badge";
const Ba = b.forwardRef(
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
Ba.displayName = "Card";
const qc = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
qc.displayName = "CardHeader";
const Yc = b.forwardRef(
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
Yc.displayName = "CardTitle";
const Xc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Xc.displayName = "CardDescription";
const Ka = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ka.displayName = "CardContent";
const Wc = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Wc.displayName = "CardFooter";
const je = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  na.Root,
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
je.displayName = na.Root.displayName;
const Ua = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ge.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Ua.displayName = Ge.Root.displayName;
const Jc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ge.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Jc.displayName = Ge.Image.displayName;
const Ga = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ge.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ga.displayName = Ge.Fallback.displayName;
const Br = Sn(void 0);
function Gt() {
  const t = xr(Br);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ie = he("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), fe = rt.Trigger, Ha = rt.Group, qa = rt.Portal, Ya = rt.Sub, Xa = rt.RadioGroup;
function ae({ variant: t = "default", ...e }) {
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Br.Provider, { value: n, children: /* @__PURE__ */ r(rt.Root, { ...e }) });
}
const Kr = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ w(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Kr.displayName = rt.SubTrigger.displayName;
const Ur = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = mt();
  return /* @__PURE__ */ r(
    rt.SubContent,
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
Ur.displayName = rt.SubContent.displayName;
const Wt = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = mt();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
    {
      ref: a,
      sideOffset: e,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
Wt.displayName = rt.Content.displayName;
const an = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = mt(), i = Gt();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
an.displayName = rt.Item.displayName;
const Xt = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = mt(), s = Gt();
  return /* @__PURE__ */ w(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ie({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Xt.displayName = rt.CheckboxItem.displayName;
const Gr = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = mt(), i = Gt();
  return /* @__PURE__ */ w(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Dn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Gr.displayName = rt.RadioItem.displayName;
const pn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
pn.displayName = rt.Label.displayName;
const De = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
De.displayName = rt.Separator.displayName;
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Wa.displayName = "DropdownMenuShortcut";
function yo({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [d, c] = R(!1), [p, u] = R(), f = H(null);
  q(() => {
    if (!d) return;
    let C = !0;
    const F = f.current;
    if (!F) return;
    const B = setTimeout(() => {
      C && za(F);
    }, 300);
    return () => {
      C = !1, clearTimeout(B);
    };
  }, [d]);
  const m = V(
    (C) => {
      C && C.stopPropagation(), c(!1), u(void 0), s == null || s(!1);
    },
    [s]
  ), g = V(
    async (C) => {
      if (C && C.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        Tn(p)
      ) && (c(!1), u(void 0), s == null || s(!1));
    },
    [p, a, t.id, s]
  ), x = K(() => {
    const C = new Date(t.date), F = gs(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), B = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ye(n["%comment_dateAtTime%"], {
      date: F,
      time: B
    });
  }, [t.date, n]), v = K(() => t.user, [t.user]), y = K(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), N = K(() => bs(t.contents), [t.contents]), k = K(() => {
    if (o && l)
      return /* @__PURE__ */ w(J, { children: [
        /* @__PURE__ */ w(
          an,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), u(Fc(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r($i, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          an,
          {
            onClick: async (C) => {
              C.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ r(Vi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
  return /* @__PURE__ */ w(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(Ua, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ga, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ve, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              yn(t.assignedUser, n)
            ] })
          ] }),
          d && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), m()) : Fr(C) && (C.preventDefault(), C.stopPropagation(), jt(p) && g());
              },
              onKeyDown: (C) => {
                zr(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  En,
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
                    onSerializedChange: (C) => u(C)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: m,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Be, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !jt(p),
                      children: /* @__PURE__ */ r(Io, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(J, { children: [
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
        k && /* @__PURE__ */ w(ae, { children: [
          /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(ji, {}) }) }),
          /* @__PURE__ */ r(Wt, { align: "end", children: k })
        ] })
      ]
    }
  );
}
const No = {
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
function Zc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: d,
  thread: c,
  threadStatus: p,
  handleAddCommentToThread: u,
  handleUpdateComment: f,
  handleDeleteComment: m,
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: k,
  isRead: C = !1,
  autoReadDelay: F = 5,
  onVerseRefClick: B
}) {
  const [A, M] = R(No), [E, S] = R(
    void 0
  ), j = o, [L, I] = R(!1), [P, W] = R(!1), [O, Z] = R(!1), [St, $t] = R(!1), [Mt, gt] = R(!1), [pt, U] = R(C), [it, st] = R(!1), ct = H(void 0), [xt, ee] = R(/* @__PURE__ */ new Map());
  q(() => {
    let T = !0;
    return (async () => {
      const ft = N ? await N(d) : !1;
      T && gt(ft);
    })(), () => {
      T = !1;
    };
  }, [d, N]), q(() => {
    let T = !0;
    if (!o) {
      $t(!1), ee(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = y ? await y(d) : !1;
      T && $t(ft);
    })(), () => {
      T = !1;
    };
  }, [o, d, y]);
  const Ht = K(() => e.filter((T) => !T.deleted), [e]);
  q(() => {
    let T = !0;
    if (!o || !k) {
      ee(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = /* @__PURE__ */ new Map();
      await Promise.all(
        Ht.map(async (Wr) => {
          const Ri = await k(Wr.id);
          T && ft.set(Wr.id, Ri);
        })
      ), T && ee(ft);
    })(), () => {
      T = !1;
    };
  }, [o, Ht, k]);
  const ne = K(() => Ht[0], [Ht]), Me = H(null), se = H(void 0), re = V(() => {
    var T;
    (T = se.current) == null || T.call(se), M(No);
  }, []), Ye = V(() => {
    const T = !pt;
    U(T), st(!T), g == null || g(d, T);
  }, [pt, g, d]);
  q(() => {
    I(!1);
  }, [o]), q(() => {
    if (o && !pt && !it) {
      const T = setTimeout(() => {
        U(!0), g == null || g(d, !0);
      }, F * 1e3);
      return ct.current = T, () => clearTimeout(T);
    }
    ct.current && (clearTimeout(ct.current), ct.current = void 0);
  }, [o, pt, it, F, d, g]);
  const D = K(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), _ = K(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = yn(i, n);
    return ye(n["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [i, n]), $ = K(() => Ht.slice(1), [Ht]), G = K(() => $.length ?? 0, [$.length]), Y = K(() => G > 0, [G]), lt = K(() => L || G <= 2 ? $ : $.slice(-2), [$, G, L]), et = K(() => L || G <= 2 ? 0 : G - 2, [G, L]), bt = K(
    () => G === 1 ? D.singleReply : ye(D.multipleReplies, { count: G }),
    [G, D]
  ), dt = K(
    () => et === 1 ? D.singleReply : ye(D.multipleReplies, { count: et }),
    [et, D]
  );
  q(() => {
    !o && P && Y && W(!1);
  }, [o, P, Y]);
  const Dt = V(
    async (T) => {
      T && T.stopPropagation();
      const vt = jt(A) ? Tn(A) : void 0;
      if (E !== void 0) {
        await u({
          threadId: d,
          contents: vt,
          assignedUser: E
        }) && (S(void 0), vt && re());
        return;
      }
      vt && await u({ threadId: d, contents: vt }) && re();
    },
    [
      re,
      A,
      u,
      E,
      d
    ]
  ), Vt = V(
    async (T) => {
      const vt = jt(A) ? Tn(A) : void 0, ft = await u({
        ...T,
        contents: vt,
        assignedUser: E ?? T.assignedUser
      });
      return ft && vt && re(), ft && E !== void 0 && S(void 0), ft;
    },
    [re, A, u, E]
  );
  return /* @__PURE__ */ r(
    Ba,
    {
      role: "option",
      "aria-selected": o,
      id: d,
      className: h(
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && p !== "Resolved" && pt,
          "tw-bg-background": o && p !== "Resolved" && pt,
          "tw-bg-muted": p === "Resolved",
          "tw-bg-accent": !pt && !o && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(d);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ w(Ka, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            _ && /* @__PURE__ */ r(Ve, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: _ }),
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                onClick: (T) => {
                  T.stopPropagation(), Ye();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": pt ? "Mark as unread" : "Mark as read",
                children: pt ? /* @__PURE__ */ r(zi, {}) : /* @__PURE__ */ r(Fi, {})
              }
            ),
            Mt && p !== "Resolved" && /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                className: h(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (T) => {
                  T.stopPropagation(), Vt({
                    threadId: d,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ w(
            "p",
            {
              ref: Me,
              className: h(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": j
                },
                { "tw-whitespace-nowrap": !j }
              ),
              children: [
                a && B ? /* @__PURE__ */ r(
                  z,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (T) => {
                      T.stopPropagation(), B(c);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ w("span", { className: t, children: [
                  ne.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: ne.selectedText }),
                  ne.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            yo,
            {
              comment: ne,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: Vt,
              handleUpdateComment: f,
              handleDeleteComment: m,
              onEditingChange: W,
              canEditOrDelete: (!P && xt.get(ne.id)) ?? !1,
              canUserResolveThread: Mt
            }
          )
        ] }),
        /* @__PURE__ */ w(J, { children: [
          Y && !o && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(je, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: bt })
          ] }),
          !o && jt(A) && /* @__PURE__ */ r(
            En,
            {
              editorSerializedState: A,
              onSerializedChange: (T) => M(T),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ w(J, { children: [
            et > 0 && /* @__PURE__ */ w(
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
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(je, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: dt }),
                    L ? /* @__PURE__ */ r(Ao, {}) : /* @__PURE__ */ r(Ke, {})
                  ] })
                ]
              }
            ),
            lt.map((T) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              yo,
              {
                comment: T,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: f,
                handleDeleteComment: m,
                onEditingChange: W,
                canEditOrDelete: (!P && xt.get(T.id)) ?? !1
              }
            ) }, T.id)),
            v !== !1 && (!P || jt(A)) && /* @__PURE__ */ w(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (T) => T.stopPropagation(),
                onKeyDownCapture: (T) => {
                  Fr(T) && (T.preventDefault(), T.stopPropagation(), (jt(A) || E !== void 0) && Dt());
                },
                onKeyDown: (T) => {
                  zr(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    En,
                    {
                      editorSerializedState: A,
                      onSerializedChange: (T) => M(T),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (T) => {
                        se.current = T;
                      }
                    }
                  ),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    E !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ye(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: yn(
                          E,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ w(Ut, { open: O, onOpenChange: Z, children: [
                      /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ r(
                        z,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !St || !x || x.length === 0 || !x.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(Oo, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Lt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (T) => {
                            T.key === "Escape" && (T.stopPropagation(), Z(!1));
                          },
                          children: /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(Qt, { children: x == null ? void 0 : x.map((T) => /* @__PURE__ */ r(
                            Kt,
                            {
                              onSelect: () => {
                                S(T !== i ? T : void 0), Z(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: yn(T, n) })
                            },
                            T || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      z,
                      {
                        size: "icon",
                        onClick: Dt,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !jt(A) && E === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(Io, {})
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
function nu({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: c,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: m,
  selectedThreadId: g,
  onSelectedThreadChange: x,
  onVerseRefClick: v
}) {
  const [y, N] = R(/* @__PURE__ */ new Set()), [k, C] = R();
  q(() => {
    g && (N((I) => new Set(I).add(g)), C(g));
  }, [g]);
  const F = n.filter(
    (I) => I.comments.some((P) => !P.deleted)
  ), B = F.map((I) => ({
    id: I.id
  })), A = V(
    (I) => {
      N((P) => new Set(P).add(I.id)), C(I.id), x == null || x(I.id);
    },
    [x]
  ), M = V(
    (I) => {
      const P = y.has(I);
      N((W) => {
        const O = new Set(W);
        return O.has(I) ? O.delete(I) : O.add(I), O;
      }), C(I), x == null || x(P ? void 0 : I);
    },
    [y, x]
  ), { listboxRef: E, activeId: S, handleKeyDown: j } = Gc({
    options: B,
    onOptionSelect: A
  }), L = V(
    (I) => {
      I.key === "Escape" ? (k && y.has(k) && (N((P) => {
        const W = new Set(P);
        return W.delete(k), W;
      }), C(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : j(I);
    },
    [k, y, j, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: E,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: L,
      children: F.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: h({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Zc,
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: M,
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
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: p,
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
function Qc({ table: t }) {
  return /* @__PURE__ */ w(ae, { children: [
    /* @__PURE__ */ r(dl, { asChild: !0, children: /* @__PURE__ */ w(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Bi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(Wt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(pn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(De, {}),
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
const ze = wt.Root, td = wt.Group, Fe = wt.Value, ed = he(
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
), Te = b.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = mt();
  return /* @__PURE__ */ w(
    wt.Trigger,
    {
      className: h(ed({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(wt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Te.displayName = wt.Trigger.displayName;
const Ja = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ao, { className: "tw-h-4 tw-w-4" })
  }
));
Ja.displayName = wt.ScrollUpButton.displayName;
const Za = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" })
  }
));
Za.displayName = wt.ScrollDownButton.displayName;
const Re = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = mt();
  return /* @__PURE__ */ r(wt.Portal, { children: /* @__PURE__ */ w(
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
        /* @__PURE__ */ r(Ja, {}),
        /* @__PURE__ */ r(
          wt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(Za, {})
      ]
    }
  ) });
});
Re.displayName = wt.Content.displayName;
const nd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
nd.displayName = wt.Label.displayName;
const Ot = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  wt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(wt.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(wt.ItemText, { children: e })
    ]
  }
));
Ot.displayName = wt.Item.displayName;
const rd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
rd.displayName = wt.Separator.displayName;
function od({ table: t }) {
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
        ze,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Te, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Fe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Re, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Ot, { value: `${e}`, children: e }, e)) })
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
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Ki, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Ui, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Gi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Hi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ko = `
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
function ad(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function sn(t, e) {
  const n = e ? `${ko}, ${e}` : ko;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && ad(o)
  );
}
const Pn = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        sn(s, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(s, {
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
  const i = (s) => {
    const { current: l } = a;
    if (l) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), sn(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: h("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
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
Pn.displayName = "Table";
const Ln = b.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
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
Ln.displayName = "TableHeader";
const $n = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
$n.displayName = "TableBody";
const id = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
id.displayName = "TableFooter";
function sd(t) {
  b.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? sn(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function ld(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function cd(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const oe = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = b.useRef(null);
  b.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), sd(s);
  const l = b.useMemo(
    () => s.current ? sn(s.current) : [],
    [s]
  ), d = b.useCallback(
    (p) => {
      const { current: u } = s;
      if (!u || !u.parentElement) return;
      const f = u.closest("table"), m = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        sn(f).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = m.indexOf(u), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), cd(m, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), ld(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = u.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [s, l, e]
  ), c = b.useCallback(
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
oe.displayName = "TableRow";
const ln = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
ln.displayName = "TableHead";
const _e = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
_e.displayName = "TableCell";
const dd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
dd.displayName = "TableCaption";
function fr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function wd({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: d = !1,
  noResultsMessage: c
}) {
  var B;
  const [p, u] = R([]), [f, m] = R([]), [g, x] = R({}), [v, y] = R({}), N = K(() => e ?? [], [e]), k = ra({
    data: N,
    columns: t,
    getCoreRowModel: aa(),
    ...n && { getPaginationRowModel: pl() },
    onSortingChange: u,
    getSortedRowModel: oa(),
    onColumnFiltersChange: m,
    getFilteredRowModel: wl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: p,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: v
    }
  }), C = k.getVisibleFlatColumns();
  let F;
  return d ? F = Array.from({ length: 10 }).map((E, S) => `skeleton-row-${S}`).map((E) => /* @__PURE__ */ r(oe, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(_e, { colSpan: C.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(fr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, E)) : ((B = k.getRowModel().rows) == null ? void 0 : B.length) > 0 ? F = k.getRowModel().rows.map((A) => /* @__PURE__ */ r(
    oe,
    {
      onClick: () => s(A, k),
      "data-state": A.getIsSelected() && "selected",
      children: A.getVisibleCells().map((M) => /* @__PURE__ */ r(_e, { children: Qe(M.column.columnDef.cell, M.getContext()) }, M.id))
    },
    A.id
  )) : F = /* @__PURE__ */ r(oe, { children: /* @__PURE__ */ r(_e, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Qc, { table: k }),
    /* @__PURE__ */ w(Pn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Ln, { stickyHeader: i, children: k.getHeaderGroups().map((A) => /* @__PURE__ */ r(oe, { children: A.headers.map((M) => /* @__PURE__ */ r(ln, { className: "tw-p-0", children: M.isPlaceholder ? void 0 : Qe(M.column.columnDef.header, M.getContext()) }, M.id)) }, A.id)) }),
      /* @__PURE__ */ r($n, { children: F })
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.previousPage(),
          disabled: !k.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.nextPage(),
          disabled: !k.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(od, { table: k })
  ] });
}
function ru({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const i = K(
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
      children: /* @__PURE__ */ r(fl, { options: i, children: e })
    }
  );
}
const pd = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), _o = (t, e) => t[e] ?? e;
function ud({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = _o(n, "%webView_error_dump_header%"), i = _o(n, "%webView_error_dump_info_message%");
  function s() {
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
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(Po, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const ou = Object.freeze([
  ...pd,
  "%webView_error_dump_copied_message%"
]);
function au({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = R(!1), d = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ w(Ut, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: o }),
    /* @__PURE__ */ w(Lt, { id: i, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ht, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        ud,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var md = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(md || {});
function iu({ id: t, label: e, groups: n }) {
  const [o, a] = R(
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = R({}), l = (c, p) => {
    const u = !o[c][p];
    a((m) => (m[c][p] = u, { ...m }));
    const f = n[c].items[p];
    f.onUpdate(f.id, u);
  }, d = (c, p) => {
    s((f) => (f[c] = p, { ...f }));
    const u = n[c].items.find((f) => f.id === p);
    u ? u.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(ae, { children: [
    /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ w(z, { variant: "default", children: [
      /* @__PURE__ */ r(qi, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Ke, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(Wt, { children: n.map((c, p) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r(pn, { children: c.label }),
      /* @__PURE__ */ r(Ha, { children: c.itemType === 0 ? /* @__PURE__ */ r(J, { children: c.items.map((u, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Xt,
        {
          checked: o[p][f],
          onCheckedChange: () => l(p, f),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ r(
        Xa,
        {
          value: i[p],
          onValueChange: (u) => d(p, u),
          children: c.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Gr, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ r(De, {})
    ] }, c.label)) })
  ] }) });
}
function su({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const d = new vs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, u) => p + u, 0)), c = () => {
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
            /* @__PURE__ */ r(Yi, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ w(
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
        (a || s) && /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            z,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Xi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            z,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Wi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function fd({ id: t, versionHistory: e }) {
  const [n, o] = R(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), p = c.getUTCFullYear() - 1970, u = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let m = "";
    return p > 0 ? m = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? m = `${u.toString()} month${u === 1 ? "" : "s"} ago` : f === 0 ? m = "today" : m = `${f.toString()} day${f === 1 ? "" : "s"} ago`, m;
  }
  const s = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ w("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ w("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ w("div", { children: [
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
function lu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = K(() => xs(n), [n]), d = ((c) => {
    const p = new Intl.DisplayNames(ys(), { type: "language" });
    return c.map((u) => p.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(fd, { versionHistory: a }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function hd({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: u = !1,
  sortSelected: f = !1,
  icon: m = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = R(!1), k = V(
    (S) => {
      var L;
      const j = (L = t.find((I) => I.label === S)) == null ? void 0 : L.value;
      j && n(
        e.includes(j) ? e.filter((I) => I !== j) : [...e, j]
      );
    },
    [t, e, n]
  ), C = () => d || o, F = K(() => {
    if (!f) return t;
    const S = t.filter((L) => L.starred).sort((L, I) => L.label.localeCompare(I.label)), j = t.filter((L) => !L.starred).sort((L, I) => {
      const P = e.includes(L.value), W = e.includes(I.value);
      return P && !W ? -1 : !P && W ? 1 : L.label.localeCompare(I.label);
    });
    return [...S, ...j];
  }, [t, e, f]), B = () => {
    n(t.map((S) => S.value));
  }, A = () => {
    n([]);
  }, M = c ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ w(Ut, { open: M, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ w(
      z,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": M,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
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
          /* @__PURE__ */ r(Lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Lt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(Zt, { children: [
      /* @__PURE__ */ r(Se, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: B, children: i }),
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: A, children: s })
      ] }),
      /* @__PURE__ */ w(Qt, { children: [
        /* @__PURE__ */ r(He, { children: l }),
        /* @__PURE__ */ r(Pt, { children: F.map((S) => /* @__PURE__ */ w(
          Kt,
          {
            value: S.label,
            onSelect: k,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Ft,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(Ji, { className: "tw-h-4 tw-w-4" }),
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
function cu({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: d,
  className: c,
  badgesPlaceholder: p,
  id: u
}) {
  return /* @__PURE__ */ w("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      hd,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: d,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((f) => {
      var m;
      return /* @__PURE__ */ w(Ve, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ r(Be, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (m = t.find((g) => g.value === f)) == null ? void 0 : m.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(ht, { children: p })
  ] });
}
const gd = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Co = (t, e) => t[e] ?? e;
function bd({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const d = K(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(Zi, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ w("p", { children: [
        Co(a, "%undoButton_tooltip%"),
        i && ` (${d ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
        z,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(Qi, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ w("p", { children: [
        Co(a, "%redoButton_tooltip%"),
        i && ` (${d ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function vd({ children: t, editorRef: e }) {
  const n = H(null);
  return q(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var c, p, u, f;
      if (!a || document.activeElement !== a) return;
      const d = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (c = e.current) == null || c.undo()) : l.shiftKey && d === "z" && (l.preventDefault(), (p = e.current) == null || p.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), (u = e.current) == null || u.undo()) : (d === "y" || l.shiftKey && d === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const qe = b.forwardRef(
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
qe.displayName = "Input";
const xd = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function yd({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = H(null), s = H(null), l = H(!1), [d, c] = R(t), [p, u] = R(n), [f, m] = R(!1);
  q(() => {
    c(t);
  }, [t]), q(() => {
    p !== n && u(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, m(v), v || (d !== "custom" || p ? (e(d), o(p)) : (c(t), u(n)));
  }, x = (v) => {
    var y, N, k, C;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = i.current) == null || y.focus(), l.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((N = s.current) == null || N.focus(), l.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((C = s.current) == null || C.focus(), l.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ w(ae, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: xd(t, a, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      Wt,
      {
        style: { zIndex: ma },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(pn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(De, {}),
          /* @__PURE__ */ r(
            Xt,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: or })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Xt,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: ar })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Xt,
            {
              ref: s,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var y;
                v.stopPropagation(), l.current = !0, (y = i.current) == null || y.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  qe,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
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
const Nd = (t, e) => t === "f" ? /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r(Vo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r(jo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(J, { children: [
  /* @__PURE__ */ r($o, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), kd = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ye(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function _d({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(ae, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(rl, { asChild: !0, children: /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: Nd(t, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: kd(t, n) }) })
    ] }) }),
    /* @__PURE__ */ w(Wt, { style: { zIndex: ma }, children: [
      /* @__PURE__ */ r(pn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(De, {}),
      /* @__PURE__ */ w(
        Xt,
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
      /* @__PURE__ */ w(
        Xt,
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
      /* @__PURE__ */ w(
        Xt,
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
const Cd = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Ed({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? ts, { className: e, size: 16 });
}
function Eo({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ w(
    Kt,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Ed, { icon: t.icon }) }) }),
        /* @__PURE__ */ w("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(ca, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Td({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = R(""), [i, s] = K(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const d = e.filter(
      (p) => {
        var u;
        return (u = p.marker) == null ? void 0 : u.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (p) => p.title.toLowerCase().includes(l) && !d.includes(p)
    );
    return [d, c];
  }, [o, e]);
  return /* @__PURE__ */ w(Zt, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Se,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(Qt, { children: [
      /* @__PURE__ */ r(He, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Pt, { children: i.map((l) => {
        var d;
        return /* @__PURE__ */ r(
          Eo,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ w(J, { children: [
        i.length > 0 && /* @__PURE__ */ r(Sr, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Pt, { children: s.map((l) => {
          var d;
          return /* @__PURE__ */ r(
            Eo,
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
function Rd(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = vn[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[vn[l].description] ?? vn[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Sd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Dd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Md = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function du({
  classNameForEditor: t,
  noteOps: e,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: c
}) {
  const p = H(null), u = H(null), f = H(null), m = H(null);
  It(() => {
    if (!m.current) return;
    const { width: _ } = m.current.getBoundingClientRect();
    _ > 0 && (m.current.style.width = `${_}px`);
  }, []);
  const [g, x] = R("generated"), [v, y] = R("*"), [N, k] = R("f"), [C, F] = R(!1), [B, A] = R(!0), [M, E] = R(!1), S = H(!1), j = H(""), [L, I] = R(!1), [P, W] = R(), [O, Z] = R(), [St, $t] = R(), [Mt, gt] = R(), pt = H(null), U = K(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? hl(), noteMode: "expanded" }
    }),
    [s, l]
  ), it = K(
    () => Rd(
      p,
      () => I(!1),
      d,
      Mt
    ),
    [d, Mt]
  );
  q(() => {
    var _;
    L || (_ = p.current) == null || _.focus();
  }, [N, L]), q(() => {
    var G, Y;
    let _;
    S.current = !1, A(!0);
    const $ = e == null ? void 0 : e.at(0);
    if ($ && fn("note", $)) {
      const lt = (G = $.insert.note) == null ? void 0 : G.caller;
      let et = "custom";
      lt === or ? et = "generated" : lt === ar ? et = "hidden" : lt && y(lt), x(et), k(((Y = $.insert.note) == null ? void 0 : Y.style) ?? "f"), _ = setTimeout(() => {
        var bt;
        (bt = p.current) == null || bt.applyUpdate([$]);
      }, 0);
    }
    return () => {
      _ && clearTimeout(_);
    };
  }, [e, i]);
  const st = V(
    (_, $, G = !1) => {
      var lt, et, bt;
      const Y = (et = (lt = p.current) == null ? void 0 : lt.getNoteOps(0)) == null ? void 0 : et.at(0);
      if (Y && fn("note", Y)) {
        if (Y.insert.note) {
          let dt;
          _ === "custom" ? dt = $ : _ === "generated" ? dt = or : dt = ar, Y.insert.note.caller = dt;
        }
        n == null || n([Y]), G && c && i && ((bt = c.current) == null || bt.replaceEmbedUpdate(i, [Y]));
      }
    },
    [i, n, c]
  ), ct = V(() => {
    st(g, v, !0), o();
  }, [g, v, o, st]), xt = H(ct);
  It(() => {
    xt.current = ct;
  });
  const ee = H({ book: a.book, chapterNum: a.chapterNum });
  It(() => {
    (ee.current.book !== a.book || ee.current.chapterNum !== a.chapterNum) && (ee.current = { book: a.book, chapterNum: a.chapterNum }, xt.current());
  }, [a.book, a.chapterNum]);
  const Ht = () => {
    var $;
    const _ = ($ = u.current) == null ? void 0 : $.getElementsByClassName("editor-input")[0];
    _ != null && _.textContent && navigator.clipboard.writeText(_.textContent);
  }, ne = V(
    (_) => {
      x(_), st(_, v);
    },
    [v, st]
  ), Me = V(
    (_) => {
      y(_), st(g, _);
    },
    [g, st]
  ), se = (_) => {
    var G, Y, lt, et, bt;
    k(_);
    const $ = (Y = (G = p.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : Y.at(0);
    if ($ && fn("note", $)) {
      $.insert.note && ($.insert.note.style = _);
      const dt = (et = (lt = $.insert.note) == null ? void 0 : lt.contents) == null ? void 0 : et.ops;
      N !== "x" && _ === "x" ? dt == null || dt.forEach((Dt) => Sd(Dt)) : N === "x" && _ !== "x" && (dt == null || dt.forEach((Dt) => Dd(Dt))), (bt = p.current) == null || bt.applyUpdate([$, { delete: 1 }]);
    }
  }, re = (_) => {
    gt(_.contextMarker), E(_.canRedo);
  }, Ye = V(
    (_) => {
      var G, Y, lt, et, bt;
      const $ = (Y = (G = p.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : Y.at(0);
      if ($ && fn("note", $)) {
        _.content.length > 1 && setTimeout(() => {
          var Vt;
          (Vt = p.current) == null || Vt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const dt = (lt = $.insert.note) == null ? void 0 : lt.style, Dt = (bt = (et = $.insert.note) == null ? void 0 : et.contents) == null ? void 0 : bt.ops;
        if (dt || F(!1), F(
          dt === "x" ? !!(Dt != null && Dt.every((Vt) => {
            var vt, ft;
            if (!((vt = Vt.attributes) != null && vt.char)) return !0;
            const T = ((ft = Vt.attributes) == null ? void 0 : ft.char).style;
            return T === "xt" || T === "xo" || T === "xq";
          })) : !!(Dt != null && Dt.every((Vt) => {
            var vt, ft;
            if (!((vt = Vt.attributes) != null && vt.char)) return !0;
            const T = ((ft = Vt.attributes) == null ? void 0 : ft.char).style;
            return T === "ft" || T === "fr" || T === "fq";
          }))
        ), !S.current) {
          S.current = !0, j.current = JSON.stringify($), A(!0);
          return;
        }
        A(JSON.stringify($) === j.current), st(g, v);
      } else
        F(!1), A(!0);
    },
    [g, v, st]
  ), D = V(() => {
    const _ = window.getSelection();
    if (f.current && it.length && _ && _.rangeCount > 0) {
      const $ = _.getRangeAt(0).getBoundingClientRect(), G = f.current.getBoundingClientRect();
      W($.left - G.left), Z($.top - G.top), $t($.height), I(!0);
    }
  }, [it, f]);
  return q(() => {
    const _ = () => {
      L && I(!1);
    };
    return window.addEventListener("click", _), () => {
      window.removeEventListener("click", _);
    };
  }, [L]), q(() => {
    var _;
    L && ((_ = pt.current) == null || _.focus());
  }, [L]), q(() => {
    var G;
    const _ = ((G = u.current) == null ? void 0 : G.querySelector(".editor-input")) ?? void 0, $ = (Y) => {
      !L && _ && document.activeElement === _ && Y.key === l ? (Y.preventDefault(), D()) : L && Y.key === "Escape" && (Y.preventDefault(), I(!1));
    };
    return document.addEventListener("keydown", $), () => {
      document.removeEventListener("keydown", $);
    };
  }, [L, D, l]), /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ w("div", { ref: m, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            _d,
            {
              isTypeSwitchable: C,
              noteType: N,
              handleNoteTypeChange: se,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
            yd,
            {
              callerType: g,
              updateCallerType: ne,
              customCaller: v,
              updateCustomCaller: Me,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            bd,
            {
              onUndoClick: () => {
                var _;
                return (_ = p.current) == null ? void 0 : _.undo();
              },
              onRedoClick: () => {
                var _;
                return (_ = p.current) == null ? void 0 : _.redo();
              },
              canUndo: !B,
              canRedo: M,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
              z,
              {
                onClick: ct,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(Ft, {})
              }
            ) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
            /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(Be, {}) }) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: u,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(vd, { editorRef: p, children: /* @__PURE__ */ r(
              gl,
              {
                options: U,
                onStateChange: re,
                onUsjChange: Ye,
                defaultUsj: Md,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: p
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
              /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ r(
                z,
                {
                  onClick: Ht,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Po, {})
                }
              ) }),
              /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ w(Ut, { open: L, children: [
      /* @__PURE__ */ r(
        Or,
        {
          className: "tw-absolute",
          style: {
            top: O,
            left: P,
            height: St,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Lt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (_) => {
            _.preventDefault(), _.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Td,
            {
              markerMenuItems: it,
              localizedStrings: d,
              searchRef: pt
            }
          )
        }
      )
    ] })
  ] });
}
const wu = Object.freeze([
  ...Cd,
  ...Object.entries(vn).map(([, t]) => t.description).filter((t) => !!t),
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
  ...gd
]);
function Qa(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Od(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, d) => {
    const c = d === i.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Hr(t, l, n, !0, a),
      c && o
    ] }, Qa(t, l));
  });
}
function Hr(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ w(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(er, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(er, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return Id(
        i,
        Qa(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Id(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ w("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      er,
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
function Ad({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const d = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ w("span", { className: h("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), u = s && /* @__PURE__ */ w(J, { children: [
    Hr(t.marker, [s], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", m = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = h(f, m);
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ w("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      d,
      p
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
        children: l && l.length > 0 && /* @__PURE__ */ r(J, { children: Od(t.marker, l, o, c) })
      }
    )
  ] });
}
function pu({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: c
}) {
  const p = d ?? Ns(n, void 0), u = (N, k) => {
    c == null || c(N, k, a);
  }, f = i ? n.findIndex((N) => N === i) : -1, [m, g] = R(f), x = (N, k, C) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), c == null || c(k, C, a);
          break;
      }
  }, v = (N) => {
    if (n.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), g((k) => Math.min(k + 1, n.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), g((k) => Math.max(k - 1, 0));
          break;
      }
  }, y = H([]);
  return q(() => {
    var N;
    m >= 0 && m < y.current.length && ((N = y.current[m]) == null || N.focus());
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
          children: n.map((N, k) => {
            const C = N === i, F = `${a}-${k}`;
            return /* @__PURE__ */ w(J, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (B) => {
                    y.current[k] = B;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": N.marker,
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
                  onClick: () => u(N, k),
                  onKeyDown: (B) => x(B, N, k),
                  children: /* @__PURE__ */ r(
                    Ad,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => p(N.caller, k),
                      showMarkers: s
                    }
                  )
                },
                F
              ),
              k < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(je, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Pd(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function Ld({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = K(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const p = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(p) || (d.add(p), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(Pn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Ln, { stickyHeader: !0, children: /* @__PURE__ */ w(oe, { children: [
      /* @__PURE__ */ r(ln, { children: a }),
      /* @__PURE__ */ r(ln, { children: i })
    ] }) }),
    /* @__PURE__ */ r($n, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ w(
      oe,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(_e, { children: Ne(l.reference, "English") }),
          /* @__PURE__ */ r(_e, { className: o, children: Pd(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const qr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ir.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      ir.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
qr.displayName = ir.Root.displayName;
const $d = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(os, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(as, { className: "tw-h-4 tw-w-4" });
}, Vn = (t, e, n) => /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
  /* @__PURE__ */ w(
    Et,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        $d(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(_t, { side: "bottom", children: e })
] }) }), uu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Vn(e, t)
}), Vd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Vn(n, t)
}), mu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Vn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Wn = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((c) => c !== d);
  }), o(s);
  let l = [...a];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), i(l);
}, fu = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => Vn(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ w(jr, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        nn,
        {
          onClick: (d) => {
            d.stopPropagation(), Wn(
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
          children: /* @__PURE__ */ r(es, {})
        }
      ),
      /* @__PURE__ */ r(
        nn,
        {
          onClick: (d) => {
            d.stopPropagation(), Wn(
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
          children: /* @__PURE__ */ r(ns, {})
        }
      ),
      /* @__PURE__ */ r(
        nn,
        {
          onClick: (d) => {
            d.stopPropagation(), Wn(
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
          children: /* @__PURE__ */ r(rs, {})
        }
      )
    ] });
  }
}), hu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), gu = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, bu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, jd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", vu = Object.freeze([
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
]), zd = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Fd = (t, e, n) => t.map((o) => {
  const a = no(o.key) ? o.key : o.key[0];
  return {
    items: no(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || jd(a, e, n),
    occurrences: o.occurrences || []
  };
}), qt = (t, e) => t[e] ?? e;
function xu({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: d,
  id: c,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: u,
  onItemSelected: f
}) {
  const m = qt(n, "%webView_inventory_all%"), g = qt(n, "%webView_inventory_approved%"), x = qt(n, "%webView_inventory_unapproved%"), v = qt(n, "%webView_inventory_unknown%"), y = qt(n, "%webView_inventory_scope_currentBook%"), N = qt(n, "%webView_inventory_scope_chapter%"), k = qt(n, "%webView_inventory_scope_verse%"), C = qt(n, "%webView_inventory_filter_text%"), F = qt(
    n,
    "%webView_inventory_show_additional_items%"
  ), B = qt(n, "%webView_inventory_no_results%"), [A, M] = R(!1), [E, S] = R("all"), [j, L] = R(""), [I, P] = R([]), W = K(() => {
    const U = t ?? [];
    return U.length === 0 ? [] : Fd(U, a, i);
  }, [t, a, i]), O = K(() => {
    if (A) return W;
    const U = [];
    return W.forEach((it) => {
      const st = it.items[0], ct = U.find(
        (xt) => xt.items[0] === st
      );
      ct ? (ct.count += it.count, ct.occurrences = ct.occurrences.concat(it.occurrences)) : U.push({
        items: [st],
        count: it.count,
        occurrences: it.occurrences,
        status: it.status
      });
    }), U;
  }, [A, W]), Z = K(() => O.length === 0 ? [] : zd(O, E, j), [O, E, j]), St = K(() => {
    var st, ct;
    if (!A) return d;
    const U = (st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st.length;
    if (!U) return d;
    const it = [];
    for (let xt = 0; xt < U; xt++)
      it.push(
        Vd(
          ((ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct[xt]) || "Additional Item",
          xt + 1
        )
      );
    return [...it, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, A]);
  q(() => {
    Z.length === 0 ? P([]) : Z.length === 1 && P(Z[0].items);
  }, [Z]);
  const $t = (U, it) => {
    it.setRowSelection(() => {
      const ct = {};
      return ct[U.index] = !0, ct;
    });
    const st = U.original.items;
    P(st), f && st.length > 0 && f(st[0]);
  }, Mt = (U) => {
    if (U === "book" || U === "chapter" || U === "verse")
      l(U);
    else
      throw new Error(`Invalid scope value: ${U}`);
  }, gt = (U) => {
    if (U === "all" || U === "approved" || U === "unapproved" || U === "unknown")
      S(U);
    else
      throw new Error(`Invalid status filter value: ${U}`);
  }, pt = K(() => {
    if (O.length === 0 || I.length === 0) return [];
    const U = O.filter((it) => ks(
      A ? it.items : [it.items[0]],
      I
    ));
    if (U.length > 1) throw new Error("Selected item is not unique");
    return U.length === 0 ? [] : U[0].occurrences;
  }, [I, A, O]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ w(
        ze,
        {
          onValueChange: (U) => gt(U),
          defaultValue: E,
          children: [
            /* @__PURE__ */ r(Te, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Fe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Re, { children: [
              /* @__PURE__ */ r(Ot, { value: "all", children: m }),
              /* @__PURE__ */ r(Ot, { value: "approved", children: g }),
              /* @__PURE__ */ r(Ot, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Ot, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(ze, { onValueChange: (U) => Mt(U), defaultValue: s, children: [
        /* @__PURE__ */ r(Te, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Fe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(Re, { children: [
          /* @__PURE__ */ r(Ot, { value: "book", children: y }),
          /* @__PURE__ */ r(Ot, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Ot, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ r(
        qe,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: C,
          value: j,
          onChange: (U) => {
            L(U.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Ct, { children: [
        /* @__PURE__ */ r(Et, { asChild: !0, children: /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            qr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: A,
              onCheckedChange: (U) => {
                M(U);
              }
            }
          ),
          /* @__PURE__ */ r(ht, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? F })
        ] }) }),
        /* @__PURE__ */ r(_t, { children: (o == null ? void 0 : o.checkboxText) ?? F })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      wd,
      {
        columns: St,
        data: Z,
        onRowClickHandler: $t,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: B
      }
    ) }),
    pt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ld,
      {
        classNameForText: u,
        occurrenceData: pt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const Nn = "hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]", Bd = 150, Kd = 100;
function Ud({
  label: t,
  items: e,
  onSelect: n
}) {
  const [o, a] = R(!1), i = H(), s = H(), l = V(() => {
    clearTimeout(s.current), i.current = setTimeout(() => a(!0), Bd);
  }, []), d = V(() => {
    clearTimeout(i.current), s.current = setTimeout(() => a(!1), Kd);
  }, []), c = V(() => {
    clearTimeout(s.current);
  }, []);
  return q(() => () => {
    clearTimeout(i.current), clearTimeout(s.current);
  }, []), /* @__PURE__ */ w(Ya, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ r(
      Kr,
      {
        className: Nn,
        onPointerEnter: l,
        onPointerLeave: d,
        children: t
      }
    ),
    /* @__PURE__ */ r(qa, { children: /* @__PURE__ */ r(
      Ur,
      {
        className: "overlay-context-menu-content",
        style: { zIndex: Le },
        onPointerEnter: c,
        onPointerLeave: d,
        children: ti(e, n)
      }
    ) })
  ] });
}
function ti(t, e) {
  var a;
  const n = [];
  let o = 0;
  for (; o < t.length; ) {
    const i = t[o];
    if (i.type === "separator")
      n.push(
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ r(De, {}, `sep-${o}`)
      ), o += 1;
    else if (i.type === "item")
      n.push(
        /* @__PURE__ */ w(
          an,
          {
            disabled: i.disabled,
            className: h(Nn, i.destructive && "tw-text-destructive"),
            onSelect: () => e({ itemId: i.id }),
            children: [
              i.label,
              i.shortcut && /* @__PURE__ */ r(Wa, { children: i.shortcut })
            ]
          },
          i.id
        )
      ), o += 1;
    else if (i.type === "checkbox")
      n.push(
        /* @__PURE__ */ r(
          Xt,
          {
            className: Nn,
            checked: i.checked,
            onCheckedChange: (s) => e({ itemId: i.id, checked: s }),
            children: i.label
          },
          i.id
        )
      ), o += 1;
    else if (i.type === "radio") {
      const { group: s } = i, l = [];
      for (; o < t.length && t[o].type === "radio"; ) {
        const c = t[o];
        if (c.type === "radio" && c.group === s)
          l.push(c), o += 1;
        else
          break;
      }
      const d = ((a = l.find((c) => c.checked)) == null ? void 0 : a.value) ?? "";
      n.push(
        /* @__PURE__ */ r(
          Xa,
          {
            value: d,
            onValueChange: (c) => {
              const p = l.find((u) => u.value === c);
              p && e({ itemId: p.id, checked: !0 });
            },
            children: l.map((c) => /* @__PURE__ */ r(
              Gr,
              {
                className: Nn,
                value: c.value,
                children: c.label
              },
              c.id
            ))
          },
          `radio-group-${s}`
        )
      );
    } else i.type === "submenu" && n.push(
      /* @__PURE__ */ r(
        Ud,
        {
          label: typeof i.label == "string" ? i.label : String(i.label),
          items: i.items,
          onSelect: e
        },
        `submenu-${o}`
      )
    ), o += 1;
  }
  return n;
}
function yu({
  items: t,
  position: e,
  onSelect: n,
  onDismiss: o
}) {
  const a = H(null);
  return /* @__PURE__ */ w(
    ae,
    {
      open: !0,
      modal: !1,
      onOpenChange: (i) => {
        i || o();
      },
      children: [
        /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
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
          Wt,
          {
            className: "overlay-context-menu-content",
            style: { zIndex: Le },
            align: "start",
            side: "bottom",
            sideOffset: 0,
            children: ti(t, n)
          }
        )
      ]
    }
  );
}
const ei = "OK", Gd = "Cancel", Hd = "Alert", qd = "Confirm", Yd = "Dialog";
function Xd({
  options: t,
  onOk: e
}) {
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(Rr, { children: t.message }),
    /* @__PURE__ */ r(Er, { children: /* @__PURE__ */ r(z, { onClick: e, children: t.okLabel ?? ei }) })
  ] });
}
function Wd({
  options: t,
  onOk: e,
  onCancel: n
}) {
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(Rr, { children: t.message }),
    /* @__PURE__ */ w(Er, { children: [
      /* @__PURE__ */ r(z, { variant: "outline", onClick: n, children: t.cancelLabel ?? Gd }),
      /* @__PURE__ */ r(z, { variant: t.destructive ? "destructive" : "default", onClick: e, children: t.okLabel ?? ei })
    ] })
  ] });
}
function Jd(t) {
  return t === "alert" || t === "confirm" ? "alertdialog" : "dialog";
}
function Zd(t) {
  switch (t) {
    case "alert":
      return Hd;
    case "confirm":
      return qd;
    default:
      return Yd;
  }
}
function Qd(t, e, n, o) {
  switch (t) {
    case "alert":
      return /* @__PURE__ */ r(
        Xd,
        {
          options: e,
          onOk: () => n(!0)
        }
      );
    case "confirm":
      return /* @__PURE__ */ r(
        Wd,
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
function Nu({
  dialogType: t,
  options: e,
  onResolve: n,
  onDismiss: o
}) {
  const a = H(!1), i = V(
    (p) => {
      a.current || (a.current = !0, n(p));
    },
    [n]
  ), s = V(() => {
    i(!1);
  }, [i]), l = V(
    (p) => {
      if (!p) {
        if (a.current) return;
        a.current = !0, o();
      }
    },
    [o]
  ), d = Jd(t), c = ("title" in e && typeof e.title == "string" ? e.title : void 0) || Zd(t);
  return /* @__PURE__ */ r(ia, { open: !0, onOpenChange: l, children: /* @__PURE__ */ w(sa, { children: [
    /* @__PURE__ */ r(
      _r,
      {
        className: "overlay-modal-backdrop tw-bg-black/40",
        style: { zIndex: kl }
      }
    ),
    /* @__PURE__ */ w(
      At.Content,
      {
        "data-overlay-modal-dialog": !0,
        role: d,
        "aria-modal": "true",
        className: "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        style: { zIndex: _l },
        onKeyDown: (p) => {
          p.key === "Enter" && t === "alert" && (p.preventDefault(), i(!0));
        },
        children: [
          /* @__PURE__ */ r(Cr, { children: /* @__PURE__ */ r(Tr, { children: c }) }),
          Qd(t, e, i, s)
        ]
      }
    )
  ] }) });
}
const tw = 320, ew = 400;
function un({ title: t }) {
  if (t)
    return /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-font-bold", children: t });
}
function nw({ content: t }) {
  var e;
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(un, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("p", { className: "tw-m-0", children: t.body })
  ] });
}
function rw({ content: t }) {
  var e;
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(un, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("ul", { className: "tw-m-0 tw-pl-5 [&>li]:tw-mb-1", children: t.items.map((n, o) => (
      // List items are plain strings with no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r("li", { children: n }, o)
    )) })
  ] });
}
function ow({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(un, { title: (e = t.title) == null ? void 0 : e.toString() }),
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
function aw({ run: t }) {
  let e = t.text;
  return t.bold && (e = /* @__PURE__ */ r("strong", { children: e })), t.italic && (e = /* @__PURE__ */ r("em", { children: e })), t.scriptureRef && (e = /* @__PURE__ */ r("span", { className: "tw-italic", children: e })), e;
}
function iw({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(un, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("div", { children: t.body.map((n, o) => (
      // Rich text runs have no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r(aw, { run: n }, o)
    )) })
  ] });
}
function sw({
  content: t,
  onAction: e
}) {
  var n;
  return /* @__PURE__ */ w(J, { children: [
    /* @__PURE__ */ r(un, { title: (n = t.title) == null ? void 0 : n.toString() }),
    /* @__PURE__ */ r("p", { className: "tw-m-0", children: t.body }),
    /* @__PURE__ */ r("div", { className: "tw-mt-3 tw-flex tw-justify-end tw-gap-2", children: t.actions.map((o) => /* @__PURE__ */ r(
      z,
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
function lw({
  content: t,
  onAction: e
}) {
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ r(nw, { content: t });
    case "list":
      return /* @__PURE__ */ r(rw, { content: t });
    case "description":
      return /* @__PURE__ */ r(ow, { content: t });
    case "richText":
      return /* @__PURE__ */ r(iw, { content: t });
    case "card":
      return /* @__PURE__ */ r(sw, { content: t, onAction: e });
    default:
      return;
  }
}
function ku({
  content: t,
  position: e,
  anchor: n,
  side: o = "bottom",
  maxWidth: a = tw,
  showArrow: i = !0,
  onAction: s,
  onDismiss: l
}) {
  const d = V(
    (u) => {
      u || l();
    },
    [l]
  ), c = V(
    (u) => {
      u.key === "Escape" && (u.preventDefault(), l());
    },
    [l]
  ), p = V(
    (u) => {
      s && s(u);
    },
    [s]
  );
  return /* @__PURE__ */ w(Ut, { open: !0, onOpenChange: d, children: [
    /* @__PURE__ */ r(Or, { asChild: !0, children: /* @__PURE__ */ r(
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
      Lt,
      {
        "data-overlay-popover": !0,
        className: "tw-overflow-y-auto",
        side: o,
        align: "start",
        sideOffset: i ? 8 : 4,
        style: {
          zIndex: Le,
          maxWidth: a,
          maxHeight: ew
        },
        onKeyDown: c,
        onOpenAutoFocus: (u) => u.preventDefault(),
        onCloseAutoFocus: (u) => u.preventDefault(),
        children: [
          i && /* @__PURE__ */ r(we.Arrow, { className: "tw-fill-popover tw-stroke-border tw-stroke-1" }),
          /* @__PURE__ */ r(lw, { content: t, onAction: p })
        ]
      }
    )
  ] });
}
const cw = 500, dw = 400;
function To({
  item: t,
  onSelect: e
}) {
  const n = [t.label, t.description, t.badge].filter(Boolean).join(" ");
  return /* @__PURE__ */ w(
    Kt,
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
function ww({
  items: t,
  onSelect: e
}) {
  const n = K(() => {
    const a = /* @__PURE__ */ new Map();
    return t.forEach((i) => {
      const s = i.group ?? "", l = a.get(s);
      l ? l.push(i) : a.set(s, [i]);
    }), a;
  }, [t]);
  return n.size > 1 || n.size === 1 && !n.has("") ? /* @__PURE__ */ r(J, { children: Array.from(n.entries()).map(([a, i]) => /* @__PURE__ */ r(Pt, { heading: a || void 0, children: i.map((s) => /* @__PURE__ */ r(To, { item: s, onSelect: e }, s.id)) }, a)) }) : /* @__PURE__ */ r(Pt, { children: t.map((a) => /* @__PURE__ */ r(To, { item: a, onSelect: e }, a.id)) });
}
function _u({
  items: t,
  position: e,
  anchor: n,
  side: o = "bottom",
  placeholder: a = "Search...",
  noResultsText: i = "No results found",
  maxWidth: s = cw,
  maxHeight: l = dw,
  onSelect: d,
  onDismiss: c
}) {
  const p = H(null);
  q(() => {
    var g;
    (g = p.current) == null || g.focus();
  }, []);
  const u = V(
    (g) => {
      g.key === "Escape" && (g.preventDefault(), c());
    },
    [c]
  ), f = /* @__PURE__ */ w(
    Zt,
    {
      "data-overlay-command-palette": !0,
      className: "tw-rounded-lg tw-border tw-shadow-md",
      onKeyDown: u,
      children: [
        /* @__PURE__ */ r(Se, { ref: p, placeholder: a }),
        /* @__PURE__ */ w(Qt, { style: { maxHeight: l - 44 }, children: [
          /* @__PURE__ */ r(He, { children: i }),
          /* @__PURE__ */ r(ww, { items: t, onSelect: d })
        ] })
      ]
    }
  );
  return e ? /* @__PURE__ */ w(Ut, { open: !0, onOpenChange: (g) => {
    g || c();
  }, children: [
    /* @__PURE__ */ r(Or, { asChild: !0, children: /* @__PURE__ */ r(
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
      Lt,
      {
        "data-overlay-command-palette": !0,
        className: "tw-p-0",
        side: o,
        align: "start",
        sideOffset: 4,
        style: {
          zIndex: Le,
          width: s,
          maxWidth: s
        },
        onOpenAutoFocus: (g) => g.preventDefault(),
        onCloseAutoFocus: (g) => g.preventDefault(),
        children: [
          /* @__PURE__ */ r(we.Arrow, { className: "tw-fill-popover tw-stroke-border tw-stroke-1" }),
          f
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
        style: { zIndex: Le },
        onClick: (g) => {
          g.target === g.currentTarget && c();
        },
        children: /* @__PURE__ */ r("div", { style: { width: s, maxWidth: s }, children: f })
      }
    )
  );
}
const pw = "16rem", uw = "3rem", ni = b.createContext(void 0);
function jn() {
  const t = b.useContext(ni);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ri = b.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: i,
    side: s = "primary",
    ...l
  }, d) => {
    const [c, p] = b.useState(t), u = e ?? c, f = b.useCallback(
      (k) => {
        const C = typeof k == "function" ? k(u) : k;
        n ? n(C) : p(C);
      },
      [n, u]
    ), m = b.useCallback(() => f((k) => !k), [f]), g = u ? "expanded" : "collapsed", y = mt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = b.useMemo(
      () => ({
        state: g,
        open: u,
        setOpen: f,
        toggleSidebar: m,
        side: y
      }),
      [g, u, f, m, y]
    );
    return /* @__PURE__ */ r(ni.Provider, { value: N, children: /* @__PURE__ */ r(kt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": pw,
            "--sidebar-width-icon": uw,
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
        children: i
      }
    ) }) });
  }
);
ri.displayName = "SidebarProvider";
const oi = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = jn();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: i,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ w(
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
oi.displayName = "Sidebar";
const mw = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = jn();
  return /* @__PURE__ */ w(
    z,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(is, {}) : /* @__PURE__ */ r(ss, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
mw.displayName = "SidebarTrigger";
const fw = b.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = jn();
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
fw.displayName = "SidebarRail";
const ai = b.forwardRef(
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
ai.displayName = "SidebarInset";
const hw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  qe,
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
hw.displayName = "SidebarInput";
const gw = b.forwardRef(
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
gw.displayName = "SidebarHeader";
const bw = b.forwardRef(
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
bw.displayName = "SidebarFooter";
const vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  je,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
vw.displayName = "SidebarSeparator";
const ii = b.forwardRef(
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
ii.displayName = "SidebarContent";
const hr = b.forwardRef(
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
hr.displayName = "SidebarGroup";
const gr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ue : "div",
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
gr.displayName = "SidebarGroupLabel";
const xw = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ue : "button",
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
xw.displayName = "SidebarGroupAction";
const br = b.forwardRef(
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
br.displayName = "SidebarGroupContent";
const si = b.forwardRef(
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
si.displayName = "SidebarMenu";
const li = b.forwardRef(
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
li.displayName = "SidebarMenuItem";
const yw = he(
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
), ci = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const d = t ? Ue : "button", { state: c } = jn(), p = /* @__PURE__ */ r(
      d,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(yw({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: p }),
      /* @__PURE__ */ r(_t, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
ci.displayName = "SidebarMenuButton";
const Nw = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ue : "button",
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
Nw.displayName = "SidebarMenuAction";
const kw = b.forwardRef(
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
kw.displayName = "SidebarMenuBadge";
const _w = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(fr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          fr,
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
_w.displayName = "SidebarMenuSkeleton";
const Cw = b.forwardRef(
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
Cw.displayName = "SidebarMenuSub";
const Ew = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Ew.displayName = "SidebarMenuSubItem";
const Tw = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ue : "a",
  {
    ref: i,
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
Tw.displayName = "SidebarMenuSubButton";
function Rw({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: d
}) {
  const c = V(
    (f, m) => {
      o(f, m);
    },
    [o]
  ), p = V(
    (f) => {
      const m = n.find((g) => g.projectId === f);
      return m ? m.projectName : f;
    },
    [n]
  ), u = V(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    oi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ w(ii, { children: [
        /* @__PURE__ */ w(hr, { children: [
          /* @__PURE__ */ r(gr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(br, { children: /* @__PURE__ */ r(si, { children: Object.entries(e).map(([f, m]) => /* @__PURE__ */ r(li, { children: /* @__PURE__ */ r(
            ci,
            {
              onClick: () => c(f),
              isActive: u(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ w(hr, { children: [
          /* @__PURE__ */ r(gr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(br, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            dr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Le },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (f) => {
                const m = p(f);
                c(m, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ls, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Yr = cn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const d = mt();
    return /* @__PURE__ */ w("div", { id: s, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Mo,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": d === "rtl" },
            { "tw-left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        qe,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ w(
        z,
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
            /* @__PURE__ */ r(Be, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Yr.displayName = "SearchBar";
function Cu({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Yr,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      ri,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Rw,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(ai, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const le = "scrBook", Sw = "scrRef", xe = "source", Dw = "details", Mw = "Scripture Reference", Ow = "Scripture Book", di = "Type", Iw = "Details";
function Aw(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: le,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Mw,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ut.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === le ? Ne(a.start) : void 0;
      },
      getGroupingValue: (o) => ut.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => nr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ne(o.start),
      id: Sw,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ne(a.start);
      },
      sortingFn: (o, a) => nr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: xe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? di : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Dw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Iw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Pw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || nr(t.start, t.end) === 0 ? `${zn(t.start)}+${e}` : `${zn(t.start)}+${e}-${zn(t.end)}+${n}`;
}, Ro = (t) => `${Pw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Eu({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: d
}) {
  const [c, p] = R([]), [u, f] = R([{ id: le, desc: !1 }]), [m, g] = R({}), x = K(
    () => t.flatMap((E) => E.data.map((S) => ({
      ...S,
      source: E.source
    }))),
    [t]
  ), v = K(
    () => Aw(
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
    c.includes(xe) ? f([
      { id: xe, desc: !1 },
      { id: le, desc: !1 }
    ]) : f([{ id: le, desc: !1 }]);
  }, [c]);
  const y = ra({
    data: x,
    columns: v,
    state: {
      grouping: c,
      sorting: u,
      rowSelection: m
    },
    onGroupingChange: p,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: ml(),
    getGroupedRowModel: ul(),
    getCoreRowModel: aa(),
    getSortedRowModel: oa(),
    getRowId: Ro,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const E = y.getSelectedRowModel().rowsById, S = Object.keys(E);
      if (S.length === 1) {
        const j = x.find((L) => Ro(L) === S[0]) || void 0;
        j && l(j);
      }
    }
  }, [m, x, l, y]);
  const N = a ?? Ow, k = i ?? di, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [le] },
    { label: `Group by ${k}`, value: [xe] },
    {
      label: `Group by ${N} and ${k}`,
      value: [le, xe]
    },
    {
      label: `Group by ${k} and ${N}`,
      value: [xe, le]
    }
  ], F = (E) => {
    p(JSON.parse(E));
  }, B = (E, S) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(S);
  }, A = (E, S) => E.getIsGrouped() ? "" : h("banded-row", S % 2 === 0 ? "even" : "odd"), M = (E, S, j) => {
    if (!((E == null ? void 0 : E.length) === 0 || S.depth < j.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ w(
      ze,
      {
        value: JSON.stringify(c),
        onValueChange: (E) => {
          F(E);
        },
        children: [
          /* @__PURE__ */ r(Te, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Fe, {}) }),
          /* @__PURE__ */ r(Re, { position: "item-aligned", children: /* @__PURE__ */ r(td, { children: C.map((E) => /* @__PURE__ */ r(Ot, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(Pn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Ln, { children: y.getHeaderGroups().map((E) => /* @__PURE__ */ r(oe, { children: E.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(ln, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Qe(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, E.id)) }),
      /* @__PURE__ */ r($n, { children: y.getRowModel().rows.map((E, S) => {
        const j = mt();
        return /* @__PURE__ */ r(
          oe,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: h(A(E, S)),
            onClick: (L) => B(E, L),
            children: E.getVisibleCells().map((L) => {
              if (!(L.getIsPlaceholder() || L.column.columnDef.enableGrouping && !L.getIsGrouped() && (L.column.columnDef.id !== xe || !n)))
                return /* @__PURE__ */ r(
                  _e,
                  {
                    className: h(
                      L.column.columnDef.id,
                      "tw-p-[1px]",
                      M(c, E, L)
                    ),
                    children: L.getIsGrouped() ? /* @__PURE__ */ w(
                      z,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ r(Ke, {}),
                          !E.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Pe, {}) : /* @__PURE__ */ r(tr, {})),
                          " ",
                          Qe(L.column.columnDef.cell, L.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : Qe(L.column.columnDef.cell, L.getContext())
                  },
                  L.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
const Xr = (t, e) => t.filter((n) => {
  try {
    return Ze(n) === e;
  } catch {
    return !1;
  }
}), wi = (t, e, n) => Xr(t, e).every((o) => n.includes(o));
function Lw({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Xr(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], d = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        wi(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Nl(
        t,
        s,
        l,
        d,
        c
      )
    }
  );
}
const So = 5, Jn = 6;
function $w({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: f, ntLong: m, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = R(!1), [N, k] = R(""), C = H(void 0), F = H(!1);
  if (t.length !== ut.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const B = K(() => ut.allBookIds.filter(
    (P, W) => t[W] === "1" && !ut.isObsolete(ut.bookIdToNumber(P))
  ), [t]), A = K(() => {
    if (!N.trim()) {
      const O = {
        [X.OT]: [],
        [X.NT]: [],
        [X.DC]: [],
        [X.Extra]: []
      };
      return B.forEach((Z) => {
        const St = Ze(Z);
        O[St].push(Z);
      }), O;
    }
    const P = B.filter(
      (O) => Mr(O, N, a)
    ), W = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return P.forEach((O) => {
      const Z = Ze(O);
      W[Z].push(O);
    }), W;
  }, [B, N, a]), M = V(
    (P, W = !1) => {
      if (!W || !C.current) {
        n(
          e.includes(P) ? e.filter((gt) => gt !== P) : [...e, P]
        ), C.current = P;
        return;
      }
      const O = B.findIndex((gt) => gt === C.current), Z = B.findIndex((gt) => gt === P);
      if (O === -1 || Z === -1) return;
      const [St, $t] = [
        Math.min(O, Z),
        Math.max(O, Z)
      ], Mt = B.slice(St, $t + 1).map((gt) => gt);
      n(
        e.includes(P) ? e.filter((gt) => !Mt.includes(gt)) : [.../* @__PURE__ */ new Set([...e, ...Mt])]
      );
    },
    [e, n, B]
  ), E = (P) => {
    M(P, F.current), F.current = !1;
  }, S = (P, W) => {
    P.preventDefault(), M(W, P.shiftKey);
  }, j = V(
    (P) => {
      const W = Xr(B, P).map((O) => O);
      n(
        wi(B, P, e) ? e.filter((O) => !W.includes(O)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, n, B]
  ), L = () => {
    n(B.map((P) => P));
  }, I = () => {
    n([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(X).map((P) => /* @__PURE__ */ r(
      Lw,
      {
        section: P,
        availableBookIds: B,
        selectedBookIds: e,
        onToggle: j,
        localizedStrings: o
      },
      P
    )) }),
    /* @__PURE__ */ w(
      Ut,
      {
        open: v,
        onOpenChange: (P) => {
          y(P), P || k("");
        },
        children: [
          /* @__PURE__ */ r(ge, { asChild: !0, children: /* @__PURE__ */ w(
            z,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(Lo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Lt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ w(
            Zt,
            {
              shouldFilter: !1,
              onKeyDown: (P) => {
                P.key === "Enter" && (F.current = P.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Se,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: k
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: L, children: d }),
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: I, children: c })
                ] }),
                /* @__PURE__ */ w(Qt, { children: [
                  /* @__PURE__ */ r(He, { children: p }),
                  Object.values(X).map((P, W) => {
                    const O = A[P];
                    if (O.length !== 0)
                      return /* @__PURE__ */ w(Do, { children: [
                        /* @__PURE__ */ r(
                          Pt,
                          {
                            heading: da(P, f, m, g, x),
                            children: O.map((Z) => /* @__PURE__ */ r(
                              pa,
                              {
                                bookId: Z,
                                isSelected: e.includes(Z),
                                onSelect: () => E(Z),
                                onMouseDown: (St) => S(St, Z),
                                section: Ze(Z),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: cr(Z, a),
                                className: "tw-flex tw-items-center"
                              },
                              Z
                            ))
                          }
                        ),
                        W < Object.values(X).length - 1 && /* @__PURE__ */ r(Sr, {})
                      ] }, P);
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
        e.length === Jn ? Jn : So
      ).map((P) => /* @__PURE__ */ r(Ve, { className: "hover:tw-bg-secondary", variant: "secondary", children: Ae(P, a) }, P)),
      e.length > Jn && /* @__PURE__ */ r(
        Ve,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - So} ${u}`
        }
      )
    ] })
  ] });
}
const Tu = Object.freeze([
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
]), be = (t, e) => t[e] ?? e;
function Ru({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: d
}) {
  const c = be(
    s,
    "%webView_scope_selector_selected_text%"
  ), p = be(
    s,
    "%webView_scope_selector_current_verse%"
  ), u = be(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = be(s, "%webView_scope_selector_current_book%"), m = be(s, "%webView_scope_selector_choose_books%"), g = be(s, "%webView_scope_selector_scope%"), x = be(s, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: m, id: "scope-selected" }
  ], y = e ? v.filter((N) => e.includes(N.value)) : v;
  return /* @__PURE__ */ w("div", { id: d, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ht, { children: g }),
      /* @__PURE__ */ r(
        Ir,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: k, id: C }) => /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Cn, { className: "tw-me-2", value: N, id: C }),
            /* @__PURE__ */ r(ht, { htmlFor: C, children: k })
          ] }, C))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ht, { children: x }),
      /* @__PURE__ */ r(
        $w,
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
const Zn = {
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
function Su({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Zn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, p]) => [
          c,
          c === p && c in Zn ? Zn[c] : p
        ]
      )
    )
  }, d = mt();
  return /* @__PURE__ */ w(
    ze,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Te, { size: a, className: h("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Fe,
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Re,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: wn },
            children: t.map((c) => /* @__PURE__ */ r(Ot, { value: `${c}`, children: l[tt(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Du({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Mu({
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
function Ou({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(je, {}) : ""
  ] });
}
function pi(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function Rn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ui = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Ct, { children: [
  /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    an,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(Rn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(Rn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(Ya, { children: [
    /* @__PURE__ */ r(Kr, { children: l.label }),
    /* @__PURE__ */ r(qa, { children: /* @__PURE__ */ r(Ur, { children: ui(
      t,
      e,
      pi(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(_t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function vr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(ae, { variant: i, children: [
    /* @__PURE__ */ r(fe, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(z, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(cs, {}) }) }),
    /* @__PURE__ */ r(Wt, { align: "start", style: { zIndex: wn }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, p) => /* @__PURE__ */ w(Do, { children: [
      /* @__PURE__ */ r(Ha, { children: /* @__PURE__ */ r(kt, { children: ui(e.groups, e.items, d, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(De, {})
    ] }, d)) })
  ] });
}
const mi = b.forwardRef(
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
function Iu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ w(mi, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      vr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(ds, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        vr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ws, {}),
          className: "tw-h-full"
        }
      ),
      d
    ] })
  ] });
}
function Au({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(mi, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    vr,
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
const fi = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
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
fi.displayName = Rt.List.displayName;
const hi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
hi.displayName = Rt.List.displayName;
const Vw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), gi = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
gi.displayName = Rt.Content.displayName;
function Pu({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ w("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Yr,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(fi, { children: [
      /* @__PURE__ */ r(hi, { children: t.map((l) => /* @__PURE__ */ r(Vw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(gi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function jw({ ...t }) {
  return /* @__PURE__ */ r(ot.Menu, { ...t });
}
function zw({ ...t }) {
  return /* @__PURE__ */ r(ot.Sub, { "data-slot": "menubar-sub", ...t });
}
const bi = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Br.Provider, { value: a, children: /* @__PURE__ */ r(
    ot.Root,
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
bi.displayName = ot.Root.displayName;
const vi = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    ot.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        ie({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
vi.displayName = ot.Trigger.displayName;
const xi = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ w(
    ot.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ie({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
xi.displayName = ot.SubTrigger.displayName;
const yi = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    ot.SubContent,
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
yi.displayName = ot.SubContent.displayName;
const Ni = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = Gt();
  return /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
    ot.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: h(
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
Ni.displayName = ot.Content.displayName;
const ki = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ r(
    ot.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ie({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ki.displayName = ot.Item.displayName;
const Fw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ w(
    ot.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ie({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Fw.displayName = ot.CheckboxItem.displayName;
const Bw = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ w(
    ot.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ie({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Dn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Bw.displayName = ot.RadioItem.displayName;
const Kw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Kw.displayName = ot.Label.displayName;
const _i = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
_i.displayName = ot.Separator.displayName;
const We = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Ci = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ w(Ct, { children: [
      /* @__PURE__ */ r(Et, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
        ki,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(Rn, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(Rn, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ w(zw, { children: [
        /* @__PURE__ */ r(xi, { children: c.label }),
        /* @__PURE__ */ r(yi, { children: Ci(
          t,
          e,
          pi(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(_t, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && s < a.length - 1 && d.push(/* @__PURE__ */ r(_i, {}, `separator-${i}`)), d;
  });
};
function Uw({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), i = H(void 0), s = H(void 0), l = H(void 0), d = H(void 0), c = (p) => {
    switch (p) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (bl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
    var g, x, v, y;
    p.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        We(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), We(i, [f, m]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), We(s, [f, m]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), We(l, [f, m]);
        break;
      case "alt+h":
        (y = d.current) == null || y.focus(), We(d, [f, m]);
        break;
    }
  }), q(() => {
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
    return /* @__PURE__ */ r(bi, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ w(jw, { children: [
      /* @__PURE__ */ r(vi, { ref: c(p), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ r(
        Ni,
        {
          style: { zIndex: wn },
          children: /* @__PURE__ */ r(kt, { children: Ci(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Lu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function $u({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: c = "default"
}) {
  const p = H(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ r(
                    Uw,
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
                children: i
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
const Gw = (t, e) => t[e] ?? e;
function Vu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: d
}) {
  const c = Gw(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, u] = R(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), i && n.find((x) => x === g) && i([...n.filter((x) => x !== g)]), u(!1);
  }, m = (g, x) => {
    var y, N, k, C, F, B;
    const v = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((C = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : C.en) : void 0;
    return v ? `${(F = t[g]) == null ? void 0 : F.autonym} (${v})` : (B = t[g]) == null ? void 0 : B.autonym;
  };
  return /* @__PURE__ */ w("div", { id: d, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      ze,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: p,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ r(Te, { children: /* @__PURE__ */ r(Fe, {}) }),
          /* @__PURE__ */ r(
            Re,
            {
              style: { zIndex: wn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Ot, { value: g, children: m(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ht, { className: "tw-font-normal tw-text-muted-foreground", children: ye(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => m(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Hw({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ht, { children: e(t) }) : n ? /* @__PURE__ */ r(ht, { children: n(t) }) : /* @__PURE__ */ r(ht, { children: t });
}
function ju({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ w("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      qr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => a(l, d)
      }
    ),
    /* @__PURE__ */ r(
      Hw,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function zu({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: d,
  dropdownContent: c,
  additionalSelectedContent: p,
  accentColor: u,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ w(
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
        i
      ),
      children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: s }),
            e && l,
            !e && d && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: d }),
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ w(ae, { children: [
              /* @__PURE__ */ r(fe, { className: h(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(Wt, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ w(ae, { children: [
              /* @__PURE__ */ r(fe, { className: h(u && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(Wt, { align: "end", children: c })
            ] })
          ] }),
          e && p && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: p })
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
const qw = cn(({ className: t, ...e }, n) => /* @__PURE__ */ r(ps, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
qw.displayName = "Spinner";
function Fu({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: d,
  defaultValue: c,
  value: p,
  onChange: u,
  onFocus: f,
  onBlur: m
}) {
  return /* @__PURE__ */ w("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ht,
      {
        htmlFor: t,
        className: h({
          "tw-text-red-600": n,
          "tw-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      qe,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: h(d, { "tw-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: u,
        onFocus: f,
        onBlur: m
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const Yw = he(
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
), Xw = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      Yw({ variant: e }),
      t
    ),
    ...n
  }
));
Xw.displayName = "Alert";
const Ww = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ w(
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
Ww.displayName = "AlertTitle";
const Jw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Jw.displayName = "AlertDescription";
const Bu = at.Root, Ku = at.Trigger, Uu = at.Group, Gu = at.Portal, Hu = at.Sub, qu = at.RadioGroup, Zw = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
  at.SubTrigger,
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
      /* @__PURE__ */ r(Pe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Zw.displayName = at.SubTrigger.displayName;
const Qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Qw.displayName = at.SubContent.displayName;
const tp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
  at.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
tp.displayName = at.Content.displayName;
const ep = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Item,
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
ep.displayName = at.Item.displayName;
const np = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
  at.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Ft, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
np.displayName = at.CheckboxItem.displayName;
const rp = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  at.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Dn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
rp.displayName = at.RadioItem.displayName;
const op = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
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
op.displayName = at.Label.displayName;
const ap = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
ap.displayName = at.Separator.displayName;
function ip({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ip.displayName = "ContextMenuShortcut";
const Ei = b.createContext({
  direction: "bottom"
});
function sp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Ei.Provider, { value: o, children: /* @__PURE__ */ r(
    Bt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
sp.displayName = "Drawer";
const Yu = Bt.Trigger, lp = Bt.Portal, Xu = Bt.Close, Ti = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Bt.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Ti.displayName = Bt.Overlay.displayName;
const cp = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = b.useContext(Ei), s = {
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
  return /* @__PURE__ */ w(lp, { children: [
    /* @__PURE__ */ r(Ti, {}),
    /* @__PURE__ */ w(
      Bt.Content,
      {
        ref: a,
        className: h(
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
cp.displayName = "DrawerContent";
function dp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
dp.displayName = "DrawerHeader";
function wp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
wp.displayName = "DrawerFooter";
const pp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Bt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
pp.displayName = Bt.Title.displayName;
const up = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Bt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
up.displayName = Bt.Description.displayName;
const mp = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  sr.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      sr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
mp.displayName = sr.Root.displayName;
function Wu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    kr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Ju = kr.Panel;
function Zu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    kr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(us, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Qu({ ...t }) {
  return /* @__PURE__ */ r(
    vl,
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
const fp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ w(
    Je.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Je.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Je.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Je.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
fp.displayName = Je.Root.displayName;
const hp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
  return /* @__PURE__ */ r(
    lr.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        lr.Thumb,
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
hp.displayName = lr.Root.displayName;
const tm = Rt.Root, gp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = mt();
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
gp.displayName = Rt.List.displayName;
const bp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
bp.displayName = Rt.Trigger.displayName;
const vp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
vp.displayName = Rt.Content.displayName;
const xp = b.forwardRef(
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
xp.displayName = "Textarea";
const em = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function yp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Np = (t, e, n = {}) => {
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = yp(a.current);
  const [i, s] = R(() => o.current), [l, d] = R(!0);
  return q(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const p = await t();
        c && (s(() => p), d(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, Qn = () => !1, nm = (t, e) => {
  const [n] = Np(
    V(async () => {
      if (!t) return Qn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Qn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== Qn && n();
  }, [n]);
};
function rm(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function kp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
kp(`*, ::before, ::after {
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
.tw-z-\\[250\\] {
  z-index: 250;
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
  Xw as Alert,
  Jw as AlertDescription,
  Ww as AlertTitle,
  Ua as Avatar,
  Ga as AvatarFallback,
  Jc as AvatarImage,
  Wp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Jp as BOOK_SELECTOR_STRING_KEYS,
  Ve as Badge,
  Xp as BookChapterControl,
  wr as BookSelectionMode,
  Zp as BookSelector,
  z as Button,
  tu as COMMENT_EDITOR_STRING_KEYS,
  eu as COMMENT_LIST_STRING_KEYS,
  Ba as Card,
  Ka as CardContent,
  Xc as CardDescription,
  Wc as CardFooter,
  qc as CardHeader,
  Yc as CardTitle,
  Ml as ChapterRangeSelector,
  qr as Checkbox,
  ju as Checklist,
  dr as ComboBox,
  Zt as Command,
  He as CommandEmpty,
  Pt as CommandGroup,
  Se as CommandInput,
  Kt as CommandItem,
  Qt as CommandList,
  Qp as CommentEditor,
  nu as CommentList,
  Bu as ContextMenu,
  np as ContextMenuCheckboxItem,
  tp as ContextMenuContent,
  Uu as ContextMenuGroup,
  ep as ContextMenuItem,
  op as ContextMenuLabel,
  Gu as ContextMenuPortal,
  qu as ContextMenuRadioGroup,
  rp as ContextMenuRadioItem,
  ap as ContextMenuSeparator,
  ip as ContextMenuShortcut,
  Hu as ContextMenuSub,
  Qw as ContextMenuSubContent,
  Zw as ContextMenuSubTrigger,
  Ku as ContextMenuTrigger,
  wd as DataTable,
  sp as Drawer,
  Xu as DrawerClose,
  cp as DrawerContent,
  up as DrawerDescription,
  wp as DrawerFooter,
  dp as DrawerHeader,
  Ti as DrawerOverlay,
  lp as DrawerPortal,
  pp as DrawerTitle,
  Yu as DrawerTrigger,
  ae as DropdownMenu,
  Xt as DropdownMenuCheckboxItem,
  Wt as DropdownMenuContent,
  Ha as DropdownMenuGroup,
  an as DropdownMenuItem,
  md as DropdownMenuItemType,
  pn as DropdownMenuLabel,
  qa as DropdownMenuPortal,
  Xa as DropdownMenuRadioGroup,
  Gr as DropdownMenuRadioItem,
  De as DropdownMenuSeparator,
  Wa as DropdownMenuShortcut,
  Ya as DropdownMenuSub,
  Ur as DropdownMenuSubContent,
  Kr as DropdownMenuSubTrigger,
  fe as DropdownMenuTrigger,
  pd as ERROR_DUMP_STRING_KEYS,
  ou as ERROR_POPOVER_STRING_KEYS,
  vd as EditorKeyboardShortcuts,
  ud as ErrorDump,
  au as ErrorPopover,
  wu as FOOTNOTE_EDITOR_STRING_KEYS,
  cu as Filter,
  iu as FilterDropdown,
  lu as Footer,
  du as FootnoteEditor,
  Ad as FootnoteItem,
  pu as FootnoteList,
  vu as INVENTORY_STRING_KEYS,
  qe as Input,
  xu as Inventory,
  ht as Label,
  Cd as MARKER_MENU_STRING_KEYS,
  ru as MarkdownRenderer,
  Td as MarkerMenu,
  su as MoreInfo,
  hd as MultiSelectComboBox,
  Pu as NavigationContentSearch,
  _u as OverlayCommandPalette,
  yu as OverlayContextMenu,
  Nu as OverlayModalDialog,
  ku as OverlayPopover,
  Ut as Popover,
  Or as PopoverAnchor,
  Lt as PopoverContent,
  ge as PopoverTrigger,
  mp as Progress,
  Ir as RadioGroup,
  Cn as RadioGroupItem,
  Cl as RecentSearches,
  Zu as ResizableHandle,
  Ju as ResizablePanel,
  Wu as ResizablePanelGroup,
  zu as ResultsCard,
  Tu as SCOPE_SELECTOR_STRING_KEYS,
  Ru as ScopeSelector,
  Eu as ScriptureResultsViewer,
  Su as ScrollGroupSelector,
  Yr as SearchBar,
  ze as Select,
  Re as SelectContent,
  td as SelectGroup,
  Ot as SelectItem,
  nd as SelectLabel,
  Za as SelectScrollDownButton,
  Ja as SelectScrollUpButton,
  rd as SelectSeparator,
  Te as SelectTrigger,
  Fe as SelectValue,
  je as Separator,
  Du as SettingsList,
  Ou as SettingsListHeader,
  Mu as SettingsListItem,
  Rw as SettingsSidebar,
  Cu as SettingsSidebarContentSearch,
  oi as Sidebar,
  ii as SidebarContent,
  bw as SidebarFooter,
  hr as SidebarGroup,
  xw as SidebarGroupAction,
  br as SidebarGroupContent,
  gr as SidebarGroupLabel,
  gw as SidebarHeader,
  hw as SidebarInput,
  ai as SidebarInset,
  si as SidebarMenu,
  Nw as SidebarMenuAction,
  kw as SidebarMenuBadge,
  ci as SidebarMenuButton,
  li as SidebarMenuItem,
  _w as SidebarMenuSkeleton,
  Cw as SidebarMenuSub,
  Tw as SidebarMenuSubButton,
  Ew as SidebarMenuSubItem,
  ri as SidebarProvider,
  fw as SidebarRail,
  vw as SidebarSeparator,
  mw as SidebarTrigger,
  fr as Skeleton,
  fp as Slider,
  Qu as Sonner,
  qw as Spinner,
  hp as Switch,
  vr as TabDropdownMenu,
  Au as TabFloatingMenu,
  Iu as TabToolbar,
  Pn as Table,
  $n as TableBody,
  dd as TableCaption,
  _e as TableCell,
  id as TableFooter,
  ln as TableHead,
  Ln as TableHeader,
  oe as TableRow,
  tm as Tabs,
  vp as TabsContent,
  gp as TabsList,
  bp as TabsTrigger,
  Fu as TextField,
  xp as Textarea,
  jr as ToggleGroup,
  nn as ToggleGroupItem,
  $u as Toolbar,
  Ct as Tooltip,
  _t as TooltipContent,
  kt as TooltipProvider,
  Et as TooltipTrigger,
  gd as UNDO_REDO_BUTTONS_STRING_KEYS,
  Vu as UiLanguageSelector,
  bd as UndoRedoButtons,
  fi as VerticalTabs,
  gi as VerticalTabsContent,
  hi as VerticalTabsList,
  Vw as VerticalTabsTrigger,
  wn as Z_INDEX_ABOVE_DOCK,
  ma as Z_INDEX_FOOTNOTE_EDITOR,
  _l as Z_INDEX_MODAL,
  kl as Z_INDEX_MODAL_BACKDROP,
  Le as Z_INDEX_OVERLAY,
  Hc as badgeVariants,
  ua as buttonVariants,
  h as cn,
  bu as getBookIdFromUSFM,
  Vn as getInventoryHeader,
  hu as getLinesFromUSFM,
  gu as getNumberFromUSFM,
  jd as getStatusForItem,
  Lu as getToolbarOSReservedSpaceClassName,
  mu as inventoryCountColumn,
  uu as inventoryItemColumn,
  fu as inventoryStatusColumn,
  ed as selectTriggerVariants,
  im as sonner,
  em as useEvent,
  nm as useEventAsync,
  Gc as useListbox,
  Np as usePromise,
  Yp as useRecentSearches,
  jn as useSidebar,
  rm as useStylesheet
};
//# sourceMappingURL=index.js.map
