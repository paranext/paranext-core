var Ua = Object.defineProperty;
var Ga = (t, e, r) => e in t ? Ua(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var vt = (t, e, r) => Ga(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as p, jsx as o, Fragment as at } from "react/jsx-runtime";
import { Command as Ne } from "cmdk";
import { X as Ve, Search as kn, Check as qt, Clock as Po, ChevronsLeft as Lo, ChevronsRight as Vo, ChevronLeft as Gr, ChevronRight as Oe, ArrowLeft as Ha, ArrowRight as Wa, Circle as wo, ChevronDown as ze, BoldIcon as Ya, ItalicIcon as Xa, AtSign as Nn, Pencil as Ja, Trash2 as Za, ArrowUp as _n, MoreHorizontal as Qa, MailOpen as ti, Mail as ei, ChevronUp as Cn, FilterIcon as ri, ArrowLeftIcon as oi, ChevronLeftIcon as ni, ChevronRightIcon as ai, ArrowRightIcon as ii, Copy as En, Filter as si, User as li, Link as ci, CircleHelp as wi, ChevronsUpDown as Tn, Star as di, Undo as pi, Redo as ui, SquareX as Sn, FunctionSquare as Rn, SquareSigma as Dn, Ban as hi, AlertCircle as Hr, CircleCheckIcon as fi, CircleXIcon as mi, CircleHelpIcon as gi, ArrowUpIcon as bi, ArrowDownIcon as vi, PanelLeft as xi, PanelRight as yi, ScrollText as ki, MenuIcon as Ni, Menu as _i, EllipsisVertical as Ci, MoreVertical as zo, LoaderCircle as Ei, GripVertical as Ti } from "lucide-react";
import { clsx as Si } from "clsx";
import { twMerge as Ri } from "tailwind-merge";
import * as Jt from "@radix-ui/react-dialog";
import { Canon as ct } from "@sillsdev/scripture";
import { includes as ar, Section as Y, getChaptersForBook as Di, formatScrRef as xe, getSectionForBook as He, formatRelativeDate as Mi, formatReplacementString as ve, sanitizeHtml as Oi, NumberFormat as Ii, formatBytes as Ai, getCurrentLocale as $i, usfmMarkers as pr, getFormatCallerFunction as Pi, deepEqual as Li, isString as jo, compareScrRefs as Wr, scrRefToBBBCCCVVV as Or, getLocalizeKeyForScrollGroupId as Z } from "platform-bible-utils";
import Q, { forwardRef as er, useRef as G, useMemo as j, useState as R, useCallback as B, useLayoutEffect as Dt, createContext as Cr, useContext as po, useEffect as H, Component as Vi, createElement as Fo, Suspense as zi, Fragment as Mn } from "react";
import { Slot as je } from "@radix-ui/react-slot";
import { cva as de } from "class-variance-authority";
import * as Xe from "@radix-ui/react-popover";
import * as ji from "@radix-ui/react-label";
import * as Yr from "@radix-ui/react-radio-group";
import { createEditor as On, $getRoot as Zt, $createParagraphNode as Fe, $getSelection as Ct, HISTORY_MERGE_TAG as uo, ParagraphNode as In, TextNode as An, $isTokenOrSegmented as Fi, $getCharacterOffsets as Bi, $cloneWithPropertiesEphemeral as Ki, $getPreviousSelection as qi, $isRangeSelection as Ft, $caretFromPoint as Ui, $getSiblingCaret as $n, $getChildCaret as Gi, $getAdjacentChildCaret as Hi, $isChildCaret as Wi, $normalizeCaret as Yi, $setSelectionFromCaretRange as Xi, $getCollapsedCaretRange as Ji, $getCaretInDirection as Bo, $splitAtPointCaretNext as Zi, $isTextPointCaret as Qi, $findMatchingParent as Pn, $isElementNode as Yt, mergeRegister as Qt, getDOMTextNode as ts, isHTMLElement as Ln, CLEAR_EDITOR_COMMAND as Vn, COMMAND_PRIORITY_EDITOR as ho, shallowMergeConfig as es, defineExtension as Mt, safeCast as _e, createState as rs, FORMAT_TEXT_COMMAND as zn, $isNodeSelection as jn, COMMAND_PRIORITY_LOW as Fn, RootNode as os, LineBreakNode as ns, TabNode as as, $isEditorState as is, createCommand as ss, CLICK_COMMAND as ls, isDOMNode as cs, $getNodeFromDOMNode as ws, $createNodeSelection as ds, $setSelection as ps, $getEditor as us, DecoratorNode as Xr, $getState as hs, toggleTextFormatType as Ko, TEXT_TYPE_TO_FORMAT as fs, $setState as ms, addClassNamesToElement as Bn, $create as gs, $getNodeByKey as bs, removeClassNamesFromElement as vs, KEY_TAB_COMMAND as xs, $isBlockElementNode as mr, $createRangeSelection as ys, $normalizeSelection__EXPERIMENTAL as ks, OUTDENT_CONTENT_COMMAND as Ns, INDENT_CONTENT_COMMAND as qo, INSERT_TAB_COMMAND as _s, COMMAND_PRIORITY_CRITICAL as fo, $isDecoratorNode as Cs, $isParagraphNode as Es, $isTextNode as gr, SELECTION_CHANGE_COMMAND as Kn, getRegisteredNode as Ts, isDocumentFragment as Uo, isDOMDocumentNode as Ss, ArtificialNode__DO_NOT_USE as qn, $createLineBreakNode as Un, $isRootOrShadowRoot as Rs, isBlockDomNode as Go, isInlineDomNode as Ho, $insertNodes as Ds } from "lexical";
import * as Er from "@radix-ui/react-tooltip";
import { TooltipTrigger as Ms } from "@radix-ui/react-tooltip";
import { HeadingNode as Os, QuoteNode as Is, registerRichText as As } from "@lexical/rich-text";
import { flushSync as $s, createPortal as Ps } from "react-dom";
import { $isTableSelection as Ls } from "@lexical/table";
import * as Gn from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as Hn } from "@lexical/headless";
import * as Vs from "@radix-ui/react-separator";
import * as mo from "@radix-ui/react-avatar";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as zs } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Wn, getFilteredRowModel as js, getSortedRowModel as Yn, getPaginationRowModel as Fs, getCoreRowModel as Xn, flexRender as We, getGroupedRowModel as Bs, getExpandedRowModel as Ks } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import qs from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Jr, HIDDEN_NOTE_CALLER as Zr, getDefaultViewOptions as Us, isInsertEmbedOpOfType as ir, Editorial as Gs } from "@eten-tech-foundation/platform-editor";
import * as Wo from "@radix-ui/react-checkbox";
import * as Pt from "@radix-ui/react-tabs";
import * as Bt from "@radix-ui/react-menubar";
import { useHotkeys as Hs } from "react-hotkeys-hook";
import * as ft from "@radix-ui/react-context-menu";
import { Drawer as pe } from "vaul";
import * as Yo from "@radix-ui/react-progress";
import * as go from "react-resizable-panels";
import { Toaster as Ws } from "sonner";
import { toast as rh } from "sonner";
import * as sr from "@radix-ui/react-slider";
import * as Xo from "@radix-ui/react-switch";
function Qr(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? n += 1 : i === "]" && (n -= 1), i === ":" && n === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function Ys(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Qr(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, w) => w !== r), `-${i}`].join(":")}`, original: t };
  }
  const n = e.findIndex((i) => i.startsWith("!tw-"));
  if (n !== -1) {
    const i = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((c, w) => w !== n), `!${i}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const i = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Xs(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Qr(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], i = Qr(e), s = i.some((c) => c.startsWith("-tw-")), l = i.some((c) => c.startsWith("!tw-"));
  if (s && a.startsWith("-")) {
    const c = a.slice(1);
    return [...n, `-tw-${c}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const c = a.slice(1);
    return [...n, `!tw-${c}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function m(...t) {
  const e = Si(t);
  if (!e) return e;
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((c) => {
    const w = Ys(c);
    n.set(w.normalized, w.original), a.push(w.normalized);
  }), Ri(a.join(" ")).split(" ").filter(Boolean).map((c) => {
    const w = n.get(c);
    return w ? Xs(c, w) : c;
  }).join(" ");
}
const Be = 250, Jn = 300, Js = 400, Zs = 450, Qs = 500, tl = "layoutDirection";
function wt() {
  const t = localStorage.getItem(tl);
  return t === "rtl" ? t : "ltr";
}
const el = Jt.Root, Xd = Jt.Trigger, rl = Jt.Portal, Jd = Jt.Close;
function ol({
  className: t,
  style: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    Jt.Overlay,
    {
      ref: r,
      className: m(
        // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
        t
      ),
      style: { zIndex: Zs, ...e },
      ...n
    }
  );
}
function nl({
  className: t,
  children: e,
  overlayClassName: r,
  style: n,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ p(rl, { children: [
    /* @__PURE__ */ o(ol, { className: r }),
    /* @__PURE__ */ p(
      Jt.Content,
      {
        ref: a,
        className: m(
          // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        style: { zIndex: Qs, ...n },
        ...i,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ p(
            Jt.Close,
            {
              className: m(
                "tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground",
                { "tw:right-4": s === "ltr" },
                { "tw:left-4": s === "rtl" }
              ),
              children: [
                /* @__PURE__ */ o(Ve, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function al({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m(
        "tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Zd({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m(
        "tw:flex tw:flex-col-reverse tw:sm:flex-row tw:sm:justify-end tw:sm:space-x-2",
        t
      ),
      ...e
    }
  );
}
function il({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function Qd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function ue({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ne,
    {
      ref: e,
      className: m(
        "tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:rounded-md tw:bg-popover tw:text-popover-foreground",
        t
      ),
      ...r
    }
  );
}
function rr({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: n, children: [
    /* @__PURE__ */ o(kn, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ o(
      Ne.Input,
      {
        ref: e,
        className: m(
          "tw:flex tw:h-11 tw:w-full tw:rounded-md tw:bg-transparent tw:py-3 tw:text-sm tw:outline-hidden tw:placeholder:text-muted-foreground tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
          t
        ),
        ...r
      }
    )
  ] });
}
function he({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ne.List,
    {
      ref: e,
      className: m("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...r
    }
  );
}
function Tr({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o(Ne.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function te({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ne.Group,
    {
      ref: e,
      className: m(
        "tw:overflow-hidden tw:p-1 tw:text-foreground tw:[&_[cmdk-group-heading]]:px-2 tw:[&_[cmdk-group-heading]]:py-1.5 tw:[&_[cmdk-group-heading]]:text-xs tw:[&_[cmdk-group-heading]]:font-medium tw:[&_[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...r
    }
  );
}
function Zn({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ne.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function ee({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ne.Item,
    {
      ref: e,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:data-[disabled=true]:pointer-events-none tw:data-[selected=true]:bg-accent tw:data-[selected=true]:text-accent-foreground tw:data-[disabled=true]:opacity-50",
        t
      ),
      ...r
    }
  );
}
function sl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Qn = (t, e, r, n, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "Old Testament";
    case Y.NT:
      return r ?? "New Testament";
    case Y.DC:
      return n ?? "Deuterocanon";
    case Y.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ll = (t, e, r, n, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "OT";
    case Y.NT:
      return r ?? "NT";
    case Y.DC:
      return n ?? "DC";
    case Y.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Re(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ct.bookIdToEnglishName(t);
}
function bo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const ta = ct.allBookIds.filter(
  (t) => !ct.isObsolete(ct.bookIdToNumber(t))
), ye = Object.fromEntries(
  ta.map((t) => [t, ct.bookIdToEnglishName(t)])
);
function vo(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ct.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(ar(a.toLowerCase(), n) || ar(t.toLowerCase(), n) || (i ? ar(i.localizedName.toLowerCase(), n) || ar(i.localizedId.toLowerCase(), n) : !1));
}
const ea = er(
  ({
    bookId: t,
    isSelected: e,
    onSelect: r,
    onMouseDown: n,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const d = G(!1), h = () => {
      d.current || r == null || r(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (v) => {
      d.current = !0, n ? n(v) : r == null || r(t);
    }, u = j(
      () => Re(t, l),
      [t, l]
    ), g = j(
      () => bo(t, l),
      [t, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": a === Y.OT,
            "tw:border-s-purple-200": a === Y.NT,
            "tw:border-s-indigo-200": a === Y.DC,
            "tw:border-s-amber-200": a === Y.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          ee,
          {
            ref: w,
            value: c || `${t} ${ct.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ct.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ o(
                qt,
                {
                  className: m(
                    "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1", children: u }),
              /* @__PURE__ */ o("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), ra = de(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90",
        destructive: "tw:bg-destructive tw:text-destructive-foreground tw:hover:bg-destructive/90",
        outline: "tw:border tw:border-input tw:bg-background tw:hover:bg-accent tw:hover:text-accent-foreground",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline"
      },
      size: {
        default: "tw:h-10 tw:px-4 tw:py-2",
        sm: "tw:h-9 tw:rounded-md tw:px-3",
        lg: "tw:h-11 tw:rounded-md tw:px-8",
        icon: "tw:h-10 tw:w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function F({
  className: t,
  variant: e,
  size: r,
  asChild: n = !1,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(n ? je : "button", { className: m(ra({ variant: e, size: r, className: t })), ref: a, ...i });
}
const re = Xe.Root, fe = Xe.Trigger, cl = Xe.Anchor;
function oe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  style: n,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ o(Xe.Portal, { children: /* @__PURE__ */ o(
    Xe.Content,
    {
      ref: a,
      align: e,
      sideOffset: r,
      className: m(
        // CUSTOM removed tw:z-50 to use const below
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-hidden tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Be, ...n },
      ...i,
      dir: s
    }
  ) });
}
function to(t, e, r) {
  return `${t} ${ye[t]}${e ? ` ${bo(t, e)} ${Re(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
function wl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (d) => String(d),
  getItemKey: n = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: c = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: w = "ghost"
}) {
  const [d, h] = R(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), h(!1);
  };
  return /* @__PURE__ */ p(re, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ o(
      F,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ o(Po, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ o(oe, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ o(ue, { children: /* @__PURE__ */ o(he, { children: /* @__PURE__ */ o(te, { heading: i, children: t.map((u) => /* @__PURE__ */ p(
      ee,
      {
        onSelect: () => f(u),
        className: m("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ o(Po, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ o("span", { children: r(u) })
        ]
      },
      n(u)
    )) }) }) }) })
  ] });
}
function tp(t, e, r = (a, i) => a === i, n = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !r(l, a)
    ), s = [a, ...i.slice(0, n - 1)];
    e(s);
  };
}
const Ir = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, dl = [
  Ir.BOOK_ONLY,
  Ir.BOOK_CHAPTER,
  Ir.BOOK_CHAPTER_VERSE
];
function Jo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function jt(t) {
  return Di(ct.bookIdToNumber(t));
}
function pl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const n = dl.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let d;
        const h = e.filter((f) => vo(f, l, r));
        if (h.length === 1 && ([d] = h), !d && c) {
          if (ct.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (d = f);
          }
          if (!d && r) {
            const f = Array.from(r.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([d] = f);
          }
        }
        if (!d && c) {
          const u = ((g) => Object.keys(ye).find(
            (v) => ye[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && r) {
            const g = Array.from(r.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = c ? parseInt(c, 10) : void 0;
          f && f > jt(d) && (f = Math.max(jt(d), 1));
          const u = w ? parseInt(w, 10) : void 0;
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
  if (n) return n;
}
function ul(t, e, r, n) {
  const a = B(() => {
    if (t.chapterNum > 1)
      n({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const w = e[c - 1], d = Math.max(jt(w), 1);
        n({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, n]), i = B(() => {
    const c = jt(t.book);
    if (t.chapterNum < c)
      n({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w < e.length - 1) {
        const d = e[w + 1];
        n({
          book: d,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, n]), s = B(() => {
    n({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, n]), l = B(() => {
    n({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, n]);
  return j(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Lo : Vo
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Gr : Oe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? Oe : Gr
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === jt(t.book) || jt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? Vo : Lo
    }
  ], [
    t,
    e,
    r,
    a,
    s,
    l,
    i
  ]);
}
function Zo({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: n,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ o(te, { children: /* @__PURE__ */ o("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", i), children: Array.from({ length: jt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ o(
      ee,
      {
        value: `${t} ${ye[t] || ""} ${s}`,
        onSelect: () => r(s),
        ref: n(s),
        className: m(
          "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
          {
            "tw:bg-primary tw:text-primary-foreground": t === e.book && s === e.chapterNum
          },
          {
            "tw:bg-muted/50 tw:text-muted-foreground/50": (a == null ? void 0 : a(s)) ?? !1
          }
        ),
        children: s
      },
      s
    )) }) });
}
function ep({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: n,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: c
}) {
  const w = wt(), [d, h] = R(!1), [f, u] = R(""), [g, v] = R(""), [b, x] = R("books"), [y, N] = R(void 0), [k, P] = R(!1), z = G(void 0), I = G(void 0), E = G(void 0), _ = G(void 0), S = G({}), V = B(
    (D) => {
      e(D), l && l(D);
    },
    [e, l]
  ), $ = j(() => n ? n() : ta, [n]), O = j(() => ({
    [Y.OT]: $.filter((C) => ct.isBookOT(C)),
    [Y.NT]: $.filter((C) => ct.isBookNT(C)),
    [Y.DC]: $.filter((C) => ct.isBookDC(C)),
    [Y.Extra]: $.filter((C) => ct.extraBooks().includes(C))
  }), [$]), A = j(() => Object.values(O).flat(), [O]), W = j(() => {
    if (!g.trim()) return O;
    const D = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return [Y.OT, Y.NT, Y.DC, Y.Extra].forEach((L) => {
      D[L] = O[L].filter((q) => vo(q, g, a));
    }), D;
  }, [O, g, a]), M = j(
    () => pl(g, A, a),
    [g, A, a]
  ), X = B(() => {
    M && (V({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), h(!1), v(""), u(""));
  }, [V, M]), Et = B(
    (D) => {
      if (jt(D) <= 1) {
        V({
          book: D,
          chapterNum: 1,
          verseNum: 1
        }), h(!1), v("");
        return;
      }
      N(D), x("chapters");
    },
    [V]
  ), Ot = B(
    (D) => {
      const C = b === "chapters" ? y : M == null ? void 0 : M.book;
      C && (V({
        book: C,
        chapterNum: D,
        verseNum: 1
      }), h(!1), x("books"), N(void 0), v(""));
    },
    [V, b, y, M]
  ), Rt = B(
    (D) => {
      V(D), h(!1), v("");
    },
    [V]
  ), pt = ul(t, A, w, e), lt = B(() => {
    x("books"), N(void 0), setTimeout(() => {
      I.current && I.current.focus();
    }, 0);
  }, []), K = B(
    (D) => {
      if (!D && b === "chapters") {
        lt();
        return;
      }
      h(D), D && (x("books"), N(void 0), v(""));
    },
    [b, lt]
  ), { otLong: rt, ntLong: ot, dcLong: it, extraLong: bt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, Gt = B(
    (D) => Qn(D, rt, ot, it, bt),
    [rt, ot, it, bt]
  ), Lt = B(
    (D) => M ? !!M.chapterNum && !D.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), Ht = j(
    () => xe(
      t,
      a ? Re(t.book, a) : "English"
    ),
    [t, a]
  ), Ee = B((D) => (C) => {
    S.current[D] = C;
  }, []), ae = B((D) => {
    (D.key === "Home" || D.key === "End") && D.stopPropagation();
  }, []), Wt = B(
    (D) => {
      if (D.ctrlKey) return;
      const { isLetter: C, isDigit: L } = Jo(D.key);
      if (b === "chapters") {
        if (D.key === "Backspace") {
          D.preventDefault(), D.stopPropagation(), lt();
          return;
        }
        if (C || L) {
          if (D.preventDefault(), D.stopPropagation(), x("books"), N(void 0), L && y) {
            const q = ye[y];
            v(`${q} ${D.key}`);
          } else
            v(D.key);
          setTimeout(() => {
            I.current && I.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(D.key)) {
        const q = b === "chapters" ? y : M == null ? void 0 : M.book;
        if (!q) return;
        const U = (() => {
          if (!f) return 1;
          const st = f.match(/(\d+)$/);
          return st ? parseInt(st[1], 10) : 0;
        })(), nt = jt(q);
        if (!nt) return;
        let tt = U;
        const mt = 6;
        switch (D.key) {
          case "ArrowLeft":
            U !== 0 && (tt = U > 1 ? U - 1 : nt);
            break;
          case "ArrowRight":
            U !== 0 && (tt = U < nt ? U + 1 : 1);
            break;
          case "ArrowUp":
            tt = U === 0 ? nt : Math.max(1, U - mt);
            break;
          case "ArrowDown":
            tt = U === 0 ? 1 : Math.min(nt, U + mt);
            break;
          default:
            return;
        }
        tt !== U && (D.preventDefault(), D.stopPropagation(), u(to(q, a, tt)), setTimeout(() => {
          const st = S.current[tt];
          st && st.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      M,
      lt,
      y,
      f,
      a
    ]
  ), qe = B((D) => {
    if (D.shiftKey || D.key === "Tab" || D.key === " ") return;
    const { isLetter: C, isDigit: L } = Jo(D.key);
    (C || L) && (D.preventDefault(), v((q) => q + D.key), I.current.focus(), P(!1));
  }, []);
  return Dt(() => {
    const D = setTimeout(() => {
      if (d && b === "books" && E.current && _.current) {
        const C = E.current, L = _.current, q = L.offsetTop, U = C.clientHeight, nt = L.clientHeight, tt = q - U / 2 + nt / 2;
        C.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), u(to(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(D);
    };
  }, [d, b, g, M, t.book]), Dt(() => {
    if (b === "chapters" && y) {
      const D = y === t.book;
      setTimeout(() => {
        if (E.current)
          if (D) {
            const C = S.current[t.chapterNum];
            C && C.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            E.current.scrollTo({ top: 0 });
        z.current && z.current.focus();
      }, 0);
    }
  }, [b, y, M, t.book, t.chapterNum]), /* @__PURE__ */ p(re, { open: d, onOpenChange: K, children: [
    /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ o(
      F,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ o("span", { className: "tw:truncate", children: Ht })
      }
    ) }),
    /* @__PURE__ */ o(oe, { id: c, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ p(
      ue,
      {
        ref: z,
        onKeyDown: Wt,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ o(
                rr,
                {
                  ref: I,
                  value: g,
                  onValueChange: v,
                  onKeyDown: ae,
                  onFocus: () => P(!1),
                  className: s && s.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ o(
                wl,
                {
                  recentSearches: s,
                  onSearchItemSelect: Rt,
                  renderItem: (D) => xe(D, "English"),
                  getItemKey: (D) => `${D.book}-${D.chapterNum}-${D.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: pt.map(({ onClick: D, disabled: C, title: L, icon: q }) => /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  P(!0), D();
                },
                disabled: C,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: L,
                onKeyDown: qe,
                children: /* @__PURE__ */ o(q, {})
              },
              L
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: lt,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ o(Ha, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ o(Wa, { className: "tw:h-4 tw:w-4" })
              }
            ),
            y && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Re(y, a) })
          ] }),
          !k && /* @__PURE__ */ p(he, { ref: E, children: [
            b === "books" && /* @__PURE__ */ p(at, { children: [
              !M && Object.entries(W).map(([D, C]) => {
                if (C.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(te, { heading: Gt(D), children: C.map((L) => /* @__PURE__ */ o(
                      ea,
                      {
                        bookId: L,
                        onSelect: (q) => Et(q),
                        section: He(L),
                        commandValue: `${L} ${ye[L]}`,
                        ref: L === t.book ? _ : void 0,
                        localizedBookNames: a
                      },
                      L
                    )) }, D)
                  );
              }),
              M && /* @__PURE__ */ o(te, { children: /* @__PURE__ */ o(
                ee,
                {
                  value: `${M.book} ${ye[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: X,
                  className: "tw:font-semibold tw:text-primary",
                  children: xe(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? bo(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && jt(M.book) > 1 && /* @__PURE__ */ p(at, { children: [
                /* @__PURE__ */ o("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: Re(M.book, a) }),
                /* @__PURE__ */ o(
                  Zo,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Ot,
                    setChapterRef: Ee,
                    isChapterDimmed: Lt,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ o(
              Zo,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: Ot,
                setChapterRef: Ee,
                className: "tw:p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const rp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), hl = de(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function ut({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ji.Root,
    {
      ref: e,
      className: m("pr-twp", hl(), t),
      ...r
    }
  );
}
function oa({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    Yr.Root,
    {
      className: m("pr-twp tw:grid tw:gap-2", t),
      ...r,
      ref: e,
      dir: n
    }
  );
}
function eo({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Yr.Item,
    {
      ref: e,
      className: m(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:ring-offset-background tw:focus:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Yr.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ o(wo, { className: "tw:h-2.5 tw:w-2.5 tw:fill-current tw:text-current" }) })
    }
  );
}
function fl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function ro({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: n,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = fl,
  getButtonLabel: w,
  icon: d = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: v = "start",
  isDisabled: b = !1,
  ariaLabel: x,
  ...y
}) {
  const [N, k] = R(!1), P = w ?? c, z = (E) => E.length > 0 && typeof E[0] == "object" && "options" in E[0], I = (E, _) => {
    const S = c(E), V = typeof E == "object" && "secondaryLabel" in E ? E.secondaryLabel : void 0, $ = `${_ ?? ""}${S}${V ?? ""}`;
    return /* @__PURE__ */ p(
      ee,
      {
        value: S,
        onSelect: () => {
          l(E), k(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ o(
            qt,
            {
              className: m("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || c(s) !== S
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            S,
            V && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              V
            ] })
          ] })
        ]
      },
      $
    );
  };
  return /* @__PURE__ */ p(re, { open: N, onOpenChange: k, ...y, children: [
    /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": x,
        id: t,
        className: m(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          n ?? r
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            d && /* @__PURE__ */ o("div", { className: "tw:shrink-0 tw:pe-2", children: d }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? P(s) : h
              }
            )
          ] }),
          /* @__PURE__ */ o(ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      oe,
      {
        align: v,
        className: m("tw:w-[200px] tw:p-0", a),
        style: i,
        children: /* @__PURE__ */ p(ue, { children: [
          /* @__PURE__ */ o(rr, { placeholder: f, className: "tw:text-inherit" }),
          /* @__PURE__ */ o(Tr, { children: u }),
          /* @__PURE__ */ o(he, { children: z(e) ? e.map((E) => /* @__PURE__ */ o(te, { heading: E.groupHeading, children: E.options.map((_) => I(_, E.groupHeading)) }, E.groupHeading)) : e.map((E) => I(E)) })
        ] })
      }
    )
  ] });
}
function ml({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: n,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = j(
    () => Array.from({ length: i }, (w, d) => d + 1),
    [i]
  );
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ o(ut, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      ro,
      {
        isDisabled: a,
        onChange: (w) => {
          r(w), w > e && n(w);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (w) => w.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ o(ut, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      ro,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w < t && r(w);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var oo = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(oo || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(oo || (oo = {}));
const op = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ar = (t, e) => t[e] ?? e;
function np({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: n,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const d = Ar(w, "%webView_bookSelector_currentBook%"), h = Ar(w, "%webView_bookSelector_choose%"), f = Ar(w, "%webView_bookSelector_chooseBooks%"), [u, g] = R(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ o(
    oa,
    {
      className: "pr-twp tw:flex",
      value: u,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(eo, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ o(ut, { className: "tw:ms-1", children: d })
          ] }),
          /* @__PURE__ */ o(ut, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ o(
            ml,
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
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(eo, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ o(ut, { className: "tw:ms-1", children: f })
          ] }),
          /* @__PURE__ */ o(ut, { className: "tw:flex tw:items-center", children: n.map((b) => ct.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ o(
            F,
            {
              disabled: u === "current book",
              onClick: () => r(),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
const na = Cr(null);
function gl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ut() {
  const t = po(na);
  return t == null && function(e, ...r) {
    const n = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of r) a.append("v", i);
    throw n.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const aa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bl = aa ? Dt : H, lr = { tag: uo };
function vl({ initialConfig: t, children: e }) {
  const r = j(() => {
    const { theme: n, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = gl(null, n), d = On({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (h) => s(h, d), theme: n });
    return function(h, f) {
      if (f !== null) {
        if (f === void 0) h.update(() => {
          const u = Zt();
          if (u.isEmpty()) {
            const g = Fe();
            u.append(g);
            const v = aa ? document.activeElement : null;
            (Ct() !== null || v !== null && v === h.getRootElement()) && g.select();
          }
        }, lr);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = h.parseEditorState(f);
            h.setEditorState(u, lr);
            break;
          }
          case "object":
            h.setEditorState(f, lr);
            break;
          case "function":
            h.update(() => {
              Zt().isEmpty() && f(h);
            }, lr);
        }
      }
    }(d, l), [d, w];
  }, []);
  return bl(() => {
    const n = t.editable, [a] = r;
    a.setEditable(n === void 0 || n);
  }, []), o(na.Provider, { value: r, children: e });
}
const xl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : H;
function yl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [n] = Ut();
  return xl(() => {
    if (r) return n.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(uo) || l.isEmpty() || r(a, n, c);
    });
  }, [n, t, e, r]), null;
}
const xo = {
  ltr: "tw:text-left",
  rtl: "tw:text-right",
  heading: {
    h1: "tw:scroll-m-20 tw:text-4xl tw:font-extrabold tw:tracking-tight tw:lg:text-5xl",
    h2: "tw:scroll-m-20 tw:border-b tw:pb-2 tw:text-3xl tw:font-semibold tw:tracking-tight tw:first:mt-0",
    h3: "tw:scroll-m-20 tw:text-2xl tw:font-semibold tw:tracking-tight",
    h4: "tw:scroll-m-20 tw:text-xl tw:font-semibold tw:tracking-tight",
    h5: "tw:scroll-m-20 tw:text-lg tw:font-semibold tw:tracking-tight",
    h6: "tw:scroll-m-20 tw:text-base tw:font-semibold tw:tracking-tight"
  },
  paragraph: "tw:outline-hidden",
  quote: "tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic",
  link: "tw:text-blue-600 tw:hover:underline tw:hover:cursor-pointer",
  list: {
    checklist: "tw:relative",
    listitem: "tw:mx-8",
    listitemChecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:line-through tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded tw:before:bg-primary tw:before:bg-no-repeat tw:after:content-[""] tw:after:cursor-pointer tw:after:border-white tw:after:border-solid tw:after:absolute tw:after:block tw:after:top-[6px] tw:after:w-[3px] tw:after:left-[7px] tw:after:right-[7px] tw:after:h-[6px] tw:after:rotate-45 tw:after:border-r-2 tw:after:border-b-2 tw:after:border-l-0 tw:after:border-t-0',
    listitemUnchecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded',
    nested: {
      listitem: "tw:list-none tw:before:hidden tw:after:hidden"
    },
    ol: "tw:m-0 tw:p-0 tw:list-decimal tw:[&>li]:mt-2",
    olDepth: [
      "tw:list-outside tw:!list-decimal",
      "tw:list-outside tw:!list-[upper-roman]",
      "tw:list-outside tw:!list-[lower-roman]",
      "tw:list-outside tw:!list-[upper-alpha]",
      "tw:list-outside tw:!list-[lower-alpha]"
    ],
    ul: "tw:m-0 tw:p-0 tw:list-outside tw:[&>li]:mt-2",
    ulDepth: [
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc"
    ]
  },
  hashtag: "tw:text-blue-600 tw:bg-blue-100 tw:rounded-md tw:px-1",
  text: {
    bold: "tw:font-bold",
    code: "tw:bg-gray-100 tw:p-1 tw:rounded-md",
    italic: "tw:italic",
    strikethrough: "tw:line-through",
    subscript: "tw:sub",
    superscript: "tw:sup",
    underline: "tw:underline",
    underlineStrikethrough: "tw:underline tw:line-through"
  },
  image: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default editor-image",
  inlineImage: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default inline-editor-image",
  keyword: "tw:text-purple-900 tw:font-bold",
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
  characterLimit: "tw:!bg-destructive/50",
  table: "EditorTheme__table tw:w-fit tw:overflow-scroll tw:border-collapse",
  tableCell: "EditorTheme__tableCell tw:w-24 tw:relative tw:border tw:px-4 tw:py-2 tw:text-left tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellActionButton: "EditorTheme__tableCellActionButton tw:bg-background tw:block tw:border-0 tw:rounded-2xl tw:w-5 tw:h-5 tw:text-foreground tw:cursor-pointer",
  tableCellActionButtonContainer: "EditorTheme__tableCellActionButtonContainer tw:block tw:right-1 tw:top-1.5 tw:absolute tw:z-10 tw:w-5 tw:h-5",
  tableCellEditing: "EditorTheme__tableCellEditing tw:rounded-sm tw:shadow-sm",
  tableCellHeader: "EditorTheme__tableCellHeader tw:bg-muted tw:border tw:px-4 tw:py-2 tw:text-left tw:font-bold tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellPrimarySelected: "EditorTheme__tableCellPrimarySelected tw:border tw:border-primary tw:border-solid tw:block tw:h-[calc(100%-2px)] tw:w-[calc(100%-2px)] tw:absolute tw:-left-[1px] tw:-top-[1px] tw:z-10 ",
  tableCellResizer: "EditorTheme__tableCellResizer tw:absolute tw:-right-1 tw:h-full tw:w-2 tw:cursor-ew-resize tw:z-10 tw:top-0",
  tableCellSelected: "EditorTheme__tableCellSelected tw:bg-muted",
  tableCellSortedIndicator: "EditorTheme__tableCellSortedIndicator tw:block tw:opacity-50 tw:absolute tw:bottom-0 tw:left-0 tw:w-full tw:h-1 tw:bg-muted",
  tableResizeRuler: "EditorTheme__tableCellResizeRuler tw:block tw:absolute tw:w-[1px] tw:h-full tw:bg-primary tw:top-0",
  tableRowStriping: "EditorTheme__tableRowStriping tw:m-0 tw:border-t tw:p-0 tw:even:bg-muted",
  tableSelected: "EditorTheme__tableSelected tw:ring-2 tw:ring-primary tw:ring-offset-2",
  tableSelection: "EditorTheme__tableSelection tw:bg-transparent",
  layoutItem: "tw:border tw:border-dashed tw:px-4 tw:py-2",
  layoutContainer: "tw:grid tw:gap-2.5 tw:my-2.5 tw:mx-0",
  autocomplete: "tw:text-muted-foreground",
  blockCursor: "",
  embedBlock: {
    base: "tw:user-select-none",
    focus: "tw:ring-2 tw:ring-primary tw:ring-offset-2"
  },
  hr: 'tw:p-0.5 tw:border-none tw:my-1 tw:mx-0 tw:cursor-pointer tw:after:content-[""] tw:after:block tw:after:h-0.5 tw:after:bg-muted tw:selected:ring-2 tw:selected:ring-primary tw:selected:ring-offset-2 tw:selected:user-select-none',
  indent: "[--lexical-indent-base-value:40px]",
  mark: "",
  markOverlap: ""
}, kt = Er.Provider, Nt = Er.Root;
function St({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    Er.Trigger,
    {
      ref: r,
      className: e ? m(ra({ variant: e }), t) : t,
      ...n
    }
  );
}
function _t({
  className: t,
  sideOffset: e = 4,
  style: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Er.Content,
    {
      ref: n,
      sideOffset: e,
      style: { zIndex: Be, ...r },
      className: m(
        "pr-twp tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:px-3 tw:py-1.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a
    }
  );
}
const yo = [
  Os,
  In,
  An,
  Is
], kl = Cr(null), $r = {
  didCatch: !1,
  error: null
};
class Nl extends Vi {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = $r;
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
      for (var r, n, a = arguments.length, i = new Array(a), s = 0; s < a; s++)
        i[s] = arguments[s];
      (r = (n = this.props).onReset) === null || r === void 0 || r.call(n, {
        args: i,
        reason: "imperative-api"
      }), this.setState($r);
    }
  }
  componentDidCatch(e, r) {
    var n, a;
    (n = (a = this.props).onError) === null || n === void 0 || n.call(a, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: n
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (n && r.error !== null && _l(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState($r);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: n,
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
      if (typeof r == "function")
        l = r(c);
      else if (n)
        l = Fo(n, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Fo(kl.Provider, {
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
  return t.length !== e.length || t.some((r, n) => !Object.is(r, e[n]));
}
function Cl({ children: t, onError: e }) {
  return o(Nl, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const El = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : H;
function Tl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Sl() {
  return function(t) {
    const [e] = Ut(), r = j(() => t(e), [e, t]), [n, a] = R(() => r.initialValueFn()), i = G(n);
    return El(() => {
      const { initialValueFn: s, subscribe: l } = r, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [r, t]), n;
  }(Tl);
}
function Rl(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const n = r.getBoundingClientRect(), a = getComputedStyle(r), i = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = Array.from(e.getClientRects());
  let l, c = s.length;
  s.sort((w, d) => {
    const h = w.top - d.top;
    return Math.abs(h) <= 3 ? w.left - d.left : h;
  });
  for (let w = 0; w < c; w++) {
    const d = s[w], h = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, f = d.width + i === n.width;
    h || f ? (s.splice(w--, 1), c--) : l = d;
  }
  return s;
}
function Dl(t, e, r = "self") {
  const n = t.getStartEndPoints();
  if (e.isSelected(t) && !Fi(e) && n !== null) {
    const [a, i] = n, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), d = e.is(c);
    if (w || d) {
      const [h, f] = Bi(t), u = l.is(c), g = e.is(s ? c : l), v = e.is(s ? l : c);
      let b, x = 0;
      u ? (x = h > f ? f : h, b = h > f ? h : f) : g ? (x = s ? f : h, b = void 0) : v && (x = 0, b = s ? h : f);
      const y = e.__text.slice(x, b);
      y !== e.__text && (r === "clone" && (e = Ki(e)), e.__text = y);
    }
  }
  return e;
}
function br(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ia = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ml = ia && "documentMode" in document ? document.documentMode : null;
!(!ia || !("InputEvent" in window) || Ml) && "getTargetRanges" in new window.InputEvent("input");
function zt(t) {
  return `${t}px`;
}
const Ol = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Il(t, e, r) {
  let n = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function c() {
    n === null && br(182), a === null && br(183);
    const { left: h, top: f } = a.getBoundingClientRect(), u = Rl(t, e);
    var g, v;
    l.isConnected || (v = l, (g = a).insertBefore(v, g.firstChild));
    let b = !1;
    for (let x = 0; x < u.length; x++) {
      const y = u[x], N = s[x] || document.createElement("div"), k = N.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const P = zt(y.left - h);
      k.left !== P && (k.left = P, b = !0);
      const z = zt(y.top - f);
      k.top !== z && (N.style.top = z, b = !0);
      const I = zt(y.width);
      k.width !== I && (N.style.width = I, b = !0);
      const E = zt(y.height);
      k.height !== E && (N.style.height = E, b = !0), N.parentNode !== l && (l.append(N), b = !0), s[x] = N;
    }
    for (; s.length > u.length; ) s.pop();
    b && r(s);
  }
  function w() {
    a = null, n = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const h of s) h.remove();
    s = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function h() {
    const f = t.getRootElement();
    if (f === null) return w();
    const u = f.parentElement;
    if (!Ln(u)) return w();
    w(), n = f, a = u, i = new MutationObserver((g) => {
      const v = t.getRootElement(), b = v && v.parentElement;
      if (v !== n || b !== a) return h();
      for (const x of g) if (!l.contains(x.target)) return c();
    }), i.observe(u, Ol), c();
  });
  return () => {
    d(), w();
  };
}
function Qo(t, e, r) {
  if (t.type !== "text" && Yt(e)) {
    const n = e.getDOMSlot(r);
    return [n.element, n.getFirstChildOffset() + t.offset];
  }
  return [ts(r) || r, t.offset];
}
function Al(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== zt(-1.5) && (r.marginTop = zt(-1.5)), r.paddingTop !== zt(4) && (r.paddingTop = zt(4)), r.paddingBottom !== zt(0) && (r.paddingBottom = zt(0));
  }
}
function $l(t, e = Al) {
  let r = null, n = null, a = null, i = null, s = null, l = null, c = () => {
  };
  function w(d) {
    d.read(() => {
      const h = Ct();
      if (!Ft(h)) return r = null, a = null, i = null, l = null, c(), void (c = () => {
      });
      const [f, u] = function(E) {
        const _ = E.getStartEndPoints();
        return E.isBackward() ? [_[1], _[0]] : _;
      }(h), g = f.getNode(), v = g.getKey(), b = f.offset, x = u.getNode(), y = x.getKey(), N = u.offset, k = t.getElementByKey(v), P = t.getElementByKey(y), z = r === null || k !== n || b !== a || v !== r.getKey(), I = i === null || P !== s || N !== l || y !== i.getKey();
      if ((z || I) && k !== null && P !== null) {
        const E = function(_, S, V, $, O, A, W) {
          const M = (_._window ? _._window.document : document).createRange();
          return M.setStart(...Qo(S, V, $)), M.setEnd(...Qo(O, A, W)), M;
        }(t, f, g, k, u, x, P);
        c(), c = Il(t, E, e);
      }
      r = g, n = k, a = b, i = x, s = P, l = N;
    });
  }
  return w(t.getEditorState()), Qt(t.registerUpdateListener(({ editorState: d }) => w(d)), () => {
    c();
  });
}
function Pl(t, e) {
  let r = null;
  const n = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = $l(t, e));
  };
  return t.registerRootListener((a) => {
    if (a) {
      const i = a.ownerDocument;
      return i.addEventListener("selectionchange", n), n(), () => {
        r !== null && r(), i.removeEventListener("selectionchange", n);
      };
    }
  });
}
function Ll(t) {
  const e = Pn(t, (r) => Yt(r) && !r.isInline());
  return Yt(e) || br(4, t.__key), e;
}
function Vl(t) {
  const e = Ct() || qi();
  let r;
  if (Ft(e)) r = Ui(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = $n(l, "next"));
    }
    r = r || Gi(Zt(), "previous").getFlipped().insert(Fe());
  }
  const n = zl(t, r), a = Hi(n), i = Wi(a) ? Yi(a) : n;
  return Xi(Ji(i)), t.getLatest();
}
function zl(t, e, r) {
  let n = Bo(e, "next");
  for (let a = n; a; a = Zi(a, r)) n = a;
  return Qi(n) && br(283), n.insert(t.isInline() ? Fe().append(t) : t), Bo($n(t.getLatest(), "next"), e.direction);
}
function jl(t) {
  const e = Ct();
  if (!Ft(e)) return !1;
  const r = /* @__PURE__ */ new Set(), n = e.getNodes();
  for (let a = 0; a < n.length; a++) {
    const i = n[a], s = i.getKey();
    if (r.has(s)) continue;
    const l = Pn(i, (w) => Yt(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !r.has(c) && (r.add(c), t(l));
  }
  return r.size > 0;
}
const Fl = Symbol.for("preact-signals");
function Sr() {
  if (Xt > 1) return void Xt--;
  let t, e = !1;
  for (!function() {
    let r = vr;
    for (vr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Ye !== void 0; ) {
    let r = Ye;
    for (Ye = void 0, xr++; r !== void 0; ) {
      const n = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && sa(r)) try {
        r.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      r = n;
    }
  }
  if (xr = 0, Xt--, e) throw t;
}
function Bl(t) {
  if (Xt > 0) return t();
  no = ++Kl, Xt++;
  try {
    return t();
  } finally {
    Sr();
  }
}
let J, Ye;
function tn(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let vr, Xt = 0, xr = 0, Kl = 0, no = 0, ur = 0;
function en(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function xt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Je(t, e) {
  return new xt(t, e);
}
function sa(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function rn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function la(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const n = r.p;
    r.i === -1 ? (r.S.U(r), n !== void 0 && (n.n = r.n), r.n !== void 0 && (r.n.p = n)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = n;
  }
  t.s = e;
}
function ge(t, e) {
  xt.call(this, void 0), this.x = t, this.s = void 0, this.g = ur - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ql(t, e) {
  return new ge(t, e);
}
function ca(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Xt++;
    const r = J;
    J = void 0;
    try {
      e();
    } catch (n) {
      throw t.f &= -2, t.f |= 8, ko(t), n;
    } finally {
      J = r, Sr();
    }
  }
}
function ko(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ca(t);
}
function Ul(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  la(this), J = t, this.f &= -2, 8 & this.f && ko(this), Sr();
}
function Se(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Kt(t, e) {
  const r = new Se(t, e);
  try {
    r.c();
  } catch (a) {
    throw r.d(), a;
  }
  const n = r.d.bind(r);
  return n[Symbol.dispose] = n, n;
}
function Ke(t, e = {}) {
  const r = {};
  for (const n in t) {
    const a = e[n], i = Je(a === void 0 ? t[n] : a);
    r[n] = i;
  }
  return r;
}
xt.prototype.brand = Fl, xt.prototype.h = function() {
  return !0;
}, xt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : tn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, xt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && tn(() => {
      var n;
      (n = this.Z) == null || n.call(this);
    }));
  }
}, xt.prototype.subscribe = function(t) {
  return Kt(() => {
    const e = this.value, r = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = r;
    }
  }, { name: "sub" });
}, xt.prototype.valueOf = function() {
  return this.value;
}, xt.prototype.toString = function() {
  return this.value + "";
}, xt.prototype.toJSON = function() {
  return this.value;
}, xt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(xt.prototype, "value", { get() {
  const t = en(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (xr > 100) throw new Error("Cycle detected");
    (function(e) {
      Xt !== 0 && xr === 0 && e.l !== no && (e.l = no, vr = { S: e, v: e.v, i: e.i, o: vr });
    })(this), this.v = t, this.i++, ur++, Xt++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Sr();
    }
  }
} }), ge.prototype = new xt(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ur)) return !0;
  if (this.g = ur, this.f |= 1, this.i > 0 && !sa(this)) return this.f &= -2, !0;
  const t = J;
  try {
    rn(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, la(this), this.f &= -2, !0;
}, ge.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  xt.prototype.S.call(this, t);
}, ge.prototype.U = function(t) {
  if (this.t !== void 0 && (xt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = en(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Se.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Se.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ca(this), rn(this), Xt++;
  const t = J;
  return J = this, Ul.bind(this, t);
}, Se.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Ye, Ye = this);
}, Se.prototype.d = function() {
  this.f |= 8, 1 & this.f || ko(this);
}, Se.prototype.dispose = function() {
  this.d();
};
Mt({ build: (t, e, r) => Ke(e), config: _e({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const n = r.getOutput();
  return Kt(() => n.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: n.defaultSelection.peek() });
  }));
} });
function wa() {
  const t = Zt(), e = Ct(), r = Fe();
  t.clear(), t.append(r), e !== null && r.select(), Ft(e) && (e.format = 0);
}
function da(t, e = wa) {
  return t.registerCommand(Vn, (r) => (t.update(e), !0), ho);
}
Mt({ build: (t, e, r) => Ke(e), config: _e({ $onClear: wa }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: n } = r.getOutput();
  return Kt(() => da(t, n.value));
} });
function Gl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Pr = rs("format", { parse: (t) => typeof t == "number" ? t : 0 });
class pa extends Xr {
  $config() {
    return this.config("decorator-text", { extends: Xr, stateConfigs: [{ flat: !0, stateConfig: Pr }] });
  }
  getFormat() {
    return hs(this, Pr);
  }
  getFormatFlags(e, r) {
    return Ko(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = fs[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return ms(this, Pr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), n = Ko(r, e, null);
    return this.setFormat(n);
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
function Hl(t) {
  return t instanceof pa;
}
Mt({ name: "@lexical/extension/DecoratorText", nodes: () => [pa], register: (t, e, r) => t.registerCommand(zn, (n) => {
  const a = Ct();
  if (jn(a) || Ft(a)) for (const i of a.getNodes()) Hl(i) && i.toggleFormat(n);
  return !1;
}, Fn) });
function ua(t, e) {
  let r;
  return Je(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const ao = Mt({ build: (t) => ua(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ha(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, n = e;
    for (const a in n) r[a] = ha(r[a], n[a]);
    return t;
  }
  return e;
}
const No = 0, io = 1, fa = 2, Lr = 3, cr = 4, Te = 5, Vr = 6, Ue = 7;
function zr(t) {
  return t.id === No;
}
function ma(t) {
  return t.id === fa;
}
function Wl(t) {
  return function(e) {
    return e.id === io;
  }(t) || et(305, String(t.id), String(io)), Object.assign(t, { id: fa });
}
const Yl = /* @__PURE__ */ new Set();
class Xl {
  constructor(e, r) {
    vt(this, "builder");
    vt(this, "configs");
    vt(this, "_dependency");
    vt(this, "_peerNameSet");
    vt(this, "extension");
    vt(this, "state");
    vt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: No };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : es;
    for (const n of this.configs) e = r(e, n);
    return e;
  }
  init(e) {
    const r = this.state;
    ma(r) || et(306, String(r.id));
    const n = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...n, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: Lr, registerState: w });
    }(r, this.mergeConfigs(), n);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, n)), this.state = function(l, c, w) {
      return Object.assign(l, { id: cr, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const r = this.state;
    let n;
    r.id !== cr && et(307, String(r.id), String(Te)), this.extension.build && (n = this.extension.build(e, r.config, r.registerState));
    const a = { ...r.registerState, getOutput: () => n, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Te, output: s, registerState: l });
    }(r, n, a);
  }
  register(e, r) {
    this._signal = r;
    const n = this.state;
    n.id !== Te && et(308, String(n.id), String(Te));
    const a = this.extension.register && this.extension.register(e, n.config, n.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Vr });
    }(n), () => {
      const i = this.state;
      i.id !== Ue && et(309, String(n.id), String(Ue)), this.state = function(s) {
        return Object.assign(s, { id: Te });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let n;
    return r.id !== Vr && et(310, String(r.id), String(Vr)), this.extension.afterRegistration && (n = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ue });
    }(r), n;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= cr;
    }(e) || et(313, String(e.id), String(cr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Lr;
    }(e) || et(314, String(e.id), String(Lr)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && et(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && et(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Ue;
    }(e) || et(316, String(e.id), String(Ue)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Yl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Te;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const on = { tag: uo };
function Jl() {
  const t = Zt();
  t.isEmpty() && t.append(Fe());
}
const Zl = Mt({ config: _e({ setOptions: on, updateOptions: on }), init: ({ $initialEditorState: t = Jl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, n) {
  const a = n.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (is(i)) t.setEditorState(i, r);
    else if (typeof i == "function") t.update(() => {
      i(t);
    }, e);
    else if (i && (typeof i == "string" || typeof i == "object")) {
      const s = t.parseEditorState(i);
      t.setEditorState(s, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [os, An, ns, as, In] }), nn = Symbol.for("@lexical/extension/LexicalBuilder");
function an() {
}
function Ql(t) {
  throw t;
}
function wr(t) {
  return Array.isArray(t) ? t : [t];
}
const jr = "0.43.0+prod.esm";
class De {
  constructor(e) {
    vt(this, "roots");
    vt(this, "extensionNameMap");
    vt(this, "outgoingConfigEdges");
    vt(this, "incomingEdges");
    vt(this, "conflicts");
    vt(this, "_sortedExtensionReps");
    vt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = jr, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [wr(Zl)];
    for (const n of e) r.push(wr(n));
    return new De(r);
  }
  static maybeFromEditor(e) {
    const r = e[nn];
    return r && (r.PACKAGE_VERSION !== jr && et(292, r.PACKAGE_VERSION, jr), r instanceof De || et(293)), r;
  }
  static fromEditor(e) {
    const r = De.maybeFromEditor(e);
    return r === void 0 && et(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...n } = this.buildCreateEditorArgs(), a = Object.assign(On({ ...n, ...r ? { onError: (i) => {
      r(i, a);
    } } : {} }), { [nn]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = an;
    function r() {
      try {
        e();
      } finally {
        e = an;
      }
    }
    const n = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Qt(this.registerEditor(n), () => n.setRootElement(null)), n;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && et(295, e.name), r;
  }
  addEdge(e, r, n) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(r, n) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, n]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && et(296);
    const r = wr(e), [n] = r;
    typeof n.name != "string" && et(297, typeof n.name);
    let a = this.extensionNameMap.get(n.name);
    if (a !== void 0 && a.extension !== n && et(298, n.name), !a) {
      a = new Xl(this, n), this.extensionNameMap.set(n.name, a);
      const i = this.conflicts.get(n.name);
      typeof i == "string" && et(299, n.name, i);
      for (const s of n.conflictsWith || []) this.extensionNameMap.has(s) && et(299, n.name, s), this.conflicts.set(s, n.name);
      for (const s of n.dependencies || []) {
        const l = wr(s);
        this.addEdge(n.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of n.peerDependencies || []) this.addEdge(n.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (n, a) => {
      let i = n.state;
      if (ma(i)) return;
      const s = n.extension.name;
      var l;
      zr(i) || et(300, s, a || "[unknown]"), zr(l = i) || et(304, String(l.id), String(No)), i = Object.assign(l, { id: io }), n.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && r(d, s);
      }
      i = Wl(i), n.state = i, e.push(n);
    };
    for (const n of this.extensionNameMap.values()) zr(n.state) && r(n);
    for (const n of e) for (const [a, i] of this.outgoingConfigEdges.get(n.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [n, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(n.name);
      i === void 0 && et(301, n.name);
      for (const s of a) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), n = new AbortController(), a = [() => n.abort()], i = n.signal;
    for (const s of r) {
      const l = s.register(e, i);
      l && a.push(l);
    }
    for (const s of r) {
      const l = s.afterRegistration(e);
      l && a.push(l);
    }
    return Qt(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: h } = d;
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const f of Gl(h)) {
        if (typeof f != "function") {
          const u = n.get(f.replace);
          u && et(302, h.name, f.replace.name, u.extension.name), n.set(f.replace, d);
        }
        r.add(f);
      }
      if (h.html) {
        if (h.html.export) for (const [f, u] of h.html.export.entries()) a.set(f, u);
        h.html.import && Object.assign(i, h.html.import);
      }
      h.theme && ha(s, h.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Ql), e;
  }
}
const tc = /* @__PURE__ */ new Set(), sn = Mt({ build(t, e, r) {
  const n = r.getDependency(ao).output, a = Je({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ua(() => {
  }, () => Kt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    n.value.read(() => {
      if (Ct()) for (const [d, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(d);
          continue;
        }
        const f = bs(d), u = f && f.isSelected() || !1;
        w = w || u !== (!!s && s.has(d)), u && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = ql(() => (i.value || tc).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [ao], name: "@lexical/extension/NodeSelection" }), ec = ss("INSERT_HORIZONTAL_RULE_COMMAND");
class Ie extends Xr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Ie(e.__key);
  }
  static importJSON(e) {
    return _o().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: rc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Bn(r, e.theme.hr), r;
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
function rc() {
  return { node: _o() };
}
function _o() {
  return gs(Ie);
}
function oc(t) {
  return t instanceof Ie;
}
Mt({ dependencies: [ao, sn], name: "@lexical/extension/HorizontalRule", nodes: () => [Ie], register(t, e, r) {
  const { watchNodeKey: n } = r.getDependency(sn).output, a = Je({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Qt(t.registerCommand(ec, (s) => {
    const l = Ct();
    if (!Ft(l)) return !1;
    if (l.focus.getNode() !== null) {
      const c = _o();
      Vl(c);
    }
    return !0;
  }, ho), t.registerCommand(ls, (s) => {
    if (cs(s.target)) {
      const l = ws(s.target);
      if (oc(l)) return function(c, w = !1) {
        const d = Ct(), h = c.isSelected(), f = c.getKey();
        let u;
        w && jn(d) ? u = d : (u = ds(), ps(u)), h ? u.delete(f) : u.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Fn), t.registerMutationListener(Ie, (s, l) => {
    Bl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, h] of s.entries()) if (h === "destroyed") w.delete(d), c = !0;
      else {
        const f = w.get(d), u = t.getElementByKey(d);
        f ? f.domNode.value = u : (c = !0, w.set(d, { domNode: Je(u), selectedSignal: n(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), Kt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(Kt(() => {
      const w = l.value;
      w && (c.value ? Bn(w, i) : vs(w, i));
    }));
    return Qt(...s);
  }));
} });
Mt({ build: (t, e) => Ke({ inheritEditableFromParent: e.inheritEditableFromParent }), config: _e({ $getParentEditor: function() {
  const t = us();
  return De.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const n = e.$getParentEditor();
  t.parentEditor = n, t.theme = t.theme || n._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Kt(() => {
  const n = t._parentEditor;
  if (n && r.getOutput().inheritEditableFromParent.value) return t.setEditable(n.isEditable()), n.registerEditableListener(t.setEditable.bind(t));
}) });
Mt({ build: (t, e, r) => Ke(e), config: _e({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const n = r.getOutput();
  return Kt(() => {
    if (!n.disabled.value) return Pl(t, n.onReposition.value);
  });
} });
function ga(t) {
  return t.canBeEmpty();
}
function nc(t, e, r = ga) {
  return Qt(t.registerCommand(xs, (n) => {
    const a = Ct();
    if (!Ft(a)) return !1;
    n.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => mr(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), h = Ll(d);
      if (h.canIndent()) {
        const f = h.getKey();
        let u = ys();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = ks(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? n.shiftKey ? Ns : qo : _s;
    return t.dispatchCommand(i, void 0);
  }, ho), t.registerCommand(qo, () => {
    const n = typeof e == "number" ? e : e ? e.peek() : null, a = Ct();
    if (!Ft(a)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return jl((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!n || l < n) && s.setIndent(l);
      }
    });
  }, fo));
}
Mt({ build: (t, e, r) => Ke(e), config: _e({ $canIndent: ga, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: n, maxIndent: a, $canIndent: i } = r.getOutput();
  return Kt(() => {
    if (!n.value) return nc(t, a, i);
  });
} });
const ac = Mt({ name: "@lexical/react/ReactProvider" });
function ic() {
  return Zt().getTextContent();
}
function sc(t, e = !0) {
  if (t) return !1;
  let r = ic();
  return e && (r = r.trim()), r === "";
}
function lc(t) {
  if (!sc(t, !1)) return !1;
  const e = Zt().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let n = 0; n < r; n++) {
    const a = e[n];
    if (Cs(a)) return !1;
    if (Yt(a)) {
      if (!Es(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[n];
        if (!gr(c)) return !1;
      }
    }
  }
  return !0;
}
function ba(t) {
  return () => lc(t);
}
function va(t) {
  const e = window.location.origin, r = (n) => {
    if (n.origin !== e) return;
    const a = t.getRootElement();
    if (document.activeElement !== a) return;
    const i = n.data;
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
            const [w, d, h, f, u] = c;
            t.update(() => {
              const g = Ct();
              if (Ft(g)) {
                const v = g.anchor;
                let b = v.getNode(), x = 0, y = 0;
                if (gr(b) && w >= 0 && d >= 0 && (x = w, y = w + d, g.setTextNodeRange(b, x, b, y)), x === y && h === "" || (g.insertRawText(h), b = v.getNode()), gr(b)) {
                  x = f, y = f + u;
                  const N = b.getTextContentSize();
                  x = x > N ? N : x, y = y > N ? N : y, g.setTextNodeRange(b, x, b, y);
                }
                n.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  return window.addEventListener("message", r, !0), () => {
    window.removeEventListener("message", r, !0);
  };
}
Mt({ build: (t, e, r) => Ke(e), config: _e({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Kt(() => r.getOutput().disabled.value ? void 0 : va(t)) });
function cc(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Co = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : H;
function wc({ editor: t, ErrorBoundary: e }) {
  return function(r, n) {
    const [a, i] = R(() => r.getDecorators());
    return Co(() => r.registerDecoratorListener((s) => {
      $s(() => {
        i(s);
      });
    }), [r]), H(() => {
      i(r.getDecorators());
    }, [r]), j(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = o(n, { onError: (f) => r._onError(f), children: o(zi, { fallback: null, children: a[w] }) }), h = r.getElementByKey(w);
        h !== null && s.push(Ps(d, h, w));
      }
      return s;
    }, [n, a, r]);
  }(t, e);
}
function dc({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const n = De.maybeFromEditor(r);
    if (n && n.hasExtensionByName(ac.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) n.hasExtensionByName(a) && cc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : o(wc, { editor: t, ErrorBoundary: e });
}
function ln(t) {
  return t.getEditorState().read(ba(t.isComposing()));
}
function pc({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [n] = Ut();
  return function(a) {
    Co(() => Qt(As(a), va(a)), [a]);
  }(n), p(at, { children: [t, o(uc, { content: e }), o(dc, { editor: n, ErrorBoundary: r })] });
}
function uc({ content: t }) {
  const [e] = Ut(), r = function(a) {
    const [i, s] = R(() => ln(a));
    return Co(() => {
      function l() {
        const c = ln(a);
        s(c);
      }
      return l(), Qt(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), n = Sl();
  return r ? typeof t == "function" ? t(n) : t : null;
}
function hc({ defaultSelection: t }) {
  const [e] = Ut();
  return H(() => {
    e.focus(() => {
      const r = document.activeElement, n = e.getRootElement();
      n === null || r !== null && n.contains(r) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const fc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : H;
function mc({ onClear: t }) {
  const [e] = Ut();
  return fc(() => da(e, t), [e, t]), null;
}
const xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : H;
function gc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: n, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: h, ariaRequired: f, autoCapitalize: u, className: g, id: v, role: b = "textbox", spellCheck: x = !0, style: y, tabIndex: N, "data-testid": k, ...P }, z) {
  const [I, E] = R(t.isEditable()), _ = B((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), S = j(() => /* @__PURE__ */ function(...V) {
    return ($) => {
      for (const O of V) typeof O == "function" ? O($) : O != null && (O.current = $);
    };
  }(z, _), [_, z]);
  return xa(() => (E(t.isEditable()), t.registerEditableListener((V) => {
    E(V);
  })), [t]), o("div", { "aria-activedescendant": I ? e : void 0, "aria-autocomplete": I ? r : "none", "aria-controls": I ? n : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": I && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": I ? h : void 0, "aria-readonly": !I || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: I, "data-testid": k, id: v, ref: S, role: b, spellCheck: x, style: y, tabIndex: N, ...P });
}
const bc = er(gc);
function cn(t) {
  return t.getEditorState().read(ba(t.isComposing()));
}
const vc = er(xc);
function xc(t, e) {
  const { placeholder: r, ...n } = t, [a] = Ut();
  return p(at, { children: [o(bc, { editor: a, ...n, ref: e }), r != null && o(yc, { editor: a, content: r })] });
}
function yc({ content: t, editor: e }) {
  const r = function(s) {
    const [l, c] = R(() => cn(s));
    return xa(() => {
      function w() {
        const d = cn(s);
        c(d);
      }
      return w(), Qt(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [n, a] = R(e.isEditable());
  if (Dt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(n) : t !== null && (i = t), i === null ? null : o("div", { "aria-hidden": !0, children: i });
}
function kc({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ o(
    vc,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ o(
        "div",
        {
          className: r ?? "tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const ya = Cr(void 0);
function Nc({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: n,
  showModal: a,
  children: i
}) {
  const s = j(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: n,
      showModal: a
    }),
    [t, e, r, n, a]
  );
  return /* @__PURE__ */ o(ya.Provider, { value: s, children: i });
}
function ka() {
  const t = po(ya);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function _c() {
  const [t, e] = R(void 0), r = B(() => {
    e(void 0);
  }, []), n = j(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ o(el, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(nl, { children: [
      /* @__PURE__ */ o(al, { children: /* @__PURE__ */ o(il, { children: i }) }),
      s
    ] }) });
  }, [t, r]), a = B(
    (i, s, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: s(r),
        title: i
      });
    },
    [r]
  );
  return [n, a];
}
function Cc({
  children: t
}) {
  const [e] = Ut(), [r, n] = R(e), [a, i] = R("paragraph"), [s, l] = _c(), c = () => {
  };
  return H(() => r.registerCommand(
    Kn,
    (w, d) => (n(d), !1),
    fo
  ), [r]), /* @__PURE__ */ p(
    Nc,
    {
      activeEditor: r,
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
function Ec(t) {
  const [e] = Ut(), { activeEditor: r } = ka();
  H(() => r.registerCommand(
    Kn,
    () => {
      const n = Ct();
      return n && t(n), !1;
    },
    fo
  ), [e, t]), H(() => {
    r.getEditorState().read(() => {
      const n = Ct();
      n && t(n);
    });
  }, [r, t]);
}
const Tc = de(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:rounded-md tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-colors tw:hover:bg-muted tw:hover:text-muted-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=on]:bg-accent tw:data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:hover:bg-accent tw:hover:text-accent-foreground"
      },
      size: {
        default: "tw:h-10 tw:px-3",
        sm: "tw:h-9 tw:px-2.5",
        lg: "tw:h-11 tw:px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Na = Q.createContext({
  size: "default",
  variant: "default"
});
function _a({
  className: t,
  variant: e,
  size: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ o(
    Gn.Root,
    {
      ref: a,
      className: m("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...i,
      dir: s,
      children: /* @__PURE__ */ o(
        Na.Provider,
        {
          value: { variant: e, size: r },
          children: n
        }
      )
    }
  );
}
function hr({
  className: t,
  children: e,
  variant: r,
  size: n,
  ref: a,
  ...i
}) {
  const s = Q.useContext(Na);
  return /* @__PURE__ */ o(
    Gn.Item,
    {
      ref: a,
      className: m(
        Tc({
          variant: s.variant || r,
          size: s.size || n
        }),
        t
      ),
      ...i,
      children: e
    }
  );
}
const wn = [
  { format: "bold", icon: Ya, label: "Bold" },
  { format: "italic", icon: Xa, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Sc() {
  const { activeEditor: t } = ka(), [e, r] = R([]), n = B((a) => {
    if (Ft(a) || Ls(a)) {
      const i = [];
      wn.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Ec(n), /* @__PURE__ */ o(
    _a,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: wn.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ o(
        hr,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(zn, a);
          },
          children: /* @__PURE__ */ o(i, { className: "tw:h-4 tw:w-4" })
        },
        a
      ))
    }
  );
}
function Rc({ onClear: t }) {
  const [e] = Ut();
  H(() => {
    t && t(() => {
      e.dispatchCommand(Vn, void 0);
    });
  }, [e, t]);
}
function Dc({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, n] = R(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ o(Cc, { children: () => /* @__PURE__ */ o("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ o(Sc, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ o(
        pc,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (i) => {
            i !== void 0 && n(i);
          }, children: /* @__PURE__ */ o(kc, { placeholder: t }) }),
          ErrorBoundary: Cl
        }
      ),
      e && /* @__PURE__ */ o(hc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(Rc, { onClear: r }),
      /* @__PURE__ */ o(mc, {})
    ] })
  ] });
}
const Mc = {
  namespace: "commentEditor",
  theme: xo,
  nodes: yo,
  onError: (t) => {
    console.error(t);
  }
};
function yr({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: n,
  placeholder: a = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ o(
          vl,
          {
            initialConfig: {
              ...Mc,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(kt, { children: [
              /* @__PURE__ */ o(Dc, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ o(
                yl,
                {
                  ignoreSelectionChange: !0,
                  onChange: (c) => {
                    r == null || r(c), n == null || n(c.toJSON());
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
function Oc(t, e) {
  const r = Ss(e) ? e.body.childNodes : e.childNodes;
  let n = [];
  const a = [];
  for (const i of r) if (!Ea.has(i.nodeName)) {
    const s = Ta(i, t, a, !1);
    s !== null && (n = n.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof qn && s.insertAfter(Un());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), n;
}
function Ic(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), n = Zt().getChildren();
  for (let a = 0; a < n.length; a++)
    Ca(t, n[a], r, e);
  return r.innerHTML;
}
function Ca(t, e, r, n = null) {
  let a = n === null || e.isSelected(n);
  const i = Yt(e) && e.excludeFromCopy("html");
  let s = e;
  n !== null && gr(e) && (s = Dl(n, e, "clone"));
  const l = Yt(s) ? s.getChildren() : [], c = Ts(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: h } = w;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], v = Ca(t, g, f, n);
    !a && Yt(e) && v && e.extractWithChild(g, n, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Ln(d) || Uo(d)) && d.append(f), r.append(d), h) {
      const u = h.call(s, d);
      u && (Uo(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else r.append(f);
  return a;
}
const Ea = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ta(t, e, r, n, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Ea.has(t.nodeName)) return s;
  let l = null;
  const c = function(g, v) {
    const { nodeName: b } = g, x = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (x !== void 0) for (const N of x) {
      const k = N(g);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const h = t.childNodes;
  let f = [];
  const u = (l == null || !Rs(l)) && (l != null && mr(l) || n);
  for (let g = 0; g < h.length; g++) f.push(...Ta(h[g], e, r, u, new Map(a), l));
  return d != null && (f = d(f)), Go(t) && (f = Ac(t, f, u ? () => {
    const g = new qn();
    return r.push(g), g;
  } : Fe)), l == null ? f.length > 0 ? s = s.concat(f) : Go(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Ho(g.nextSibling) && Ho(g.previousSibling);
  }(t) && (s = s.concat(Un())) : Yt(l) && l.append(...f), s;
}
function Ac(t, e, r) {
  const n = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (mr(l)) n && !l.getFormat() && l.setFormat(n), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && mr(e[s + 1])) {
      const c = r();
      c.setFormat(n), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function Sa(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), n = document.createRange();
  return n.selectNodeContents(e), n.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(n), !0;
}
function Ra(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ra(e.children)
  ) : !1;
}
function $t(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ra(t.root.children) : !1;
}
function $c(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Hn({
    namespace: "EditorUtils",
    theme: xo,
    nodes: yo,
    onError: (n) => {
      console.error(n);
    }
  });
  let r;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = Oc(e, a);
      Zt().clear(), Ds(i);
    },
    {
      discrete: !0
    }
  ), e.getEditorState().read(() => {
    r = e.getEditorState().toJSON();
  }), !r)
    throw new Error("Failed to convert HTML to editor state");
  return r;
}
function kr(t) {
  const e = Hn({
    namespace: "EditorUtils",
    theme: xo,
    nodes: yo,
    onError: (a) => {
      console.error(a);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let n = "";
  return e.getEditorState().read(() => {
    n = Ic(e);
  }), n = n.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), n;
}
function Eo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function fr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function To(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Pc = {
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
function Fr(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function ap({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: n
}) {
  const [a, i] = R(Pc), [s, l] = R(void 0), [c, w] = R(!1), d = G(void 0), h = G(null);
  H(() => {
    let x = !0;
    const y = h.current;
    if (!y) return;
    const N = setTimeout(() => {
      x && Sa(y);
    }, 300);
    return () => {
      x = !1, clearTimeout(N);
    };
  }, []);
  const f = B(() => {
    if (!$t(a)) return;
    const x = kr(a);
    e(x, s);
  }, [a, e, s]), u = n["%commentEditor_placeholder%"] ?? "Type your comment here...", g = n["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = n["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = n["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ o("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-2", children: [
        /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(F, { onClick: r, className: "tw:h-6 tw:w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(Ve, {}) }) }),
          /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(
            F,
            {
              onClick: f,
              className: "tw:h-6 tw:w-6",
              size: "icon",
              variant: "default",
              disabled: !$t(a),
              children: /* @__PURE__ */ o(qt, {})
            }
          ) }),
          /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(re, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ o(Nn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { children: Fr(s !== void 0 ? s : "", n) })
          ]
        }
      ) }),
      /* @__PURE__ */ o(
        oe,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ o(ue, { children: /* @__PURE__ */ o(he, { children: t.map((x) => /* @__PURE__ */ o(
            ee,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ o("span", { children: Fr(x, n) })
            },
            x || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: h,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), r()) : To(x) && (x.preventDefault(), x.stopPropagation(), $t(a) && f());
        },
        onKeyDown: (x) => {
          Eo(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ o(
          yr,
          {
            editorSerializedState: a,
            onSerializedChange: (x) => i(x),
            placeholder: u,
            onClear: (x) => {
              d.current = x;
            }
          }
        )
      }
    )
  ] });
}
const ip = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), sp = [
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
], Lc = ["input", "select", "textarea", "button"], Vc = ["button", "textbox"], zc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = G(null), [i, s] = R(void 0), [l, c] = R(void 0), w = B(
    (u) => {
      s(u);
      const g = t.find((b) => b.id === u);
      g && (e == null || e(g));
      const v = document.getElementById(u);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = B(
    (u) => {
      const g = t.find((v) => v.id === u);
      g && (c((v) => v === u ? void 0 : u), r == null || r(g));
    },
    [r, t]
  ), h = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Lc.includes(g)) return !0;
    const v = u.getAttribute("role");
    if (v && Vc.includes(v)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, f = B(
    (u) => {
      var I;
      const g = u.target, v = (E) => E ? document.getElementById(E) : void 0, b = v(l), x = v(i);
      if (!!(b && g && b.contains(g) && g !== b) && h(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const E = t.find((_) => _.id === l);
            E && w(E.id);
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
          const _ = E.findIndex((V) => V === g);
          if (_ === -1) return;
          let S;
          u.key === "ArrowDown" ? S = Math.min(_ + 1, E.length - 1) : S = Math.max(_ - 1, 0), S !== _ && (u.preventDefault(), u.stopPropagation(), (I = E[S]) == null || I.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((E) => E.id === i);
      let P = k;
      switch (u.key) {
        case "ArrowDown":
          P = Math.min(k + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(k - 1, 0), u.preventDefault();
          break;
        case "Home":
          P = 0, u.preventDefault();
          break;
        case "End":
          P = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const E = x;
          if (E) {
            const _ = E.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = E.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = _ ?? S;
            if (V) {
              u.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (h(g) || (n == null || n(u.key), u.preventDefault()));
          return;
      }
      const z = t[P];
      z && w(z.id);
    },
    [t, w, i, l, d, n]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: w
  };
}, jc = de(
  "pr-twp tw:inline-flex tw:items-center tw:rounded-full tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw:border tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/80",
        secondary: "tw:border tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80",
        muted: "tw:border tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        destructive: "tw:border tw:border-transparent tw:bg-destructive tw:text-destructive-foreground tw:hover:bg-destructive/80",
        outline: "tw:border tw:text-foreground",
        blueIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",
        mutedIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground tw:text-mu"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Ze({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o("div", { ref: r, className: m("pr-twp", jc({ variant: e }), t), ...n });
}
function Fc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: m(
        "pr-twp tw:rounded-lg tw:border tw:bg-card tw:text-card-foreground tw:shadow-sm",
        t
      ),
      ...r
    }
  );
}
function lp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6", t),
      ...r
    }
  );
}
function cp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "h3",
    {
      ref: e,
      className: m(
        "pr-twp tw:text-2xl tw:font-semibold tw:leading-none tw:tracking-tight",
        t
      ),
      ...r,
      children: r.children
    }
  );
}
function wp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "p",
    {
      ref: e,
      className: m("pr-twp tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function Bc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: m("pr-twp tw:p-6 tw:pt-0", t), ...r });
}
function dp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0", t),
      ...r
    }
  );
}
function Qe({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Vs.Root,
    {
      ref: n,
      decorative: r,
      orientation: e,
      className: m(
        "pr-twp tw:shrink-0 tw:bg-border",
        e === "horizontal" ? "tw:h-[1px] tw:w-full" : "tw:h-full tw:w-[1px]",
        t
      ),
      ...a
    }
  );
}
function Kc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    mo.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:overflow-hidden tw:rounded-full",
        t
      ),
      ...r
    }
  );
}
function pp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    mo.Image,
    {
      ref: e,
      className: m("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...r
    }
  );
}
function qc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    mo.Fallback,
    {
      ref: e,
      className: m(
        "pr-twp tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted",
        t
      ),
      ...r
    }
  );
}
const So = Cr(void 0);
function ne() {
  const t = po(So);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ce = de("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ke = ht.Trigger, Da = ht.Group, Uc = ht.Portal, Gc = ht.Sub, Hc = ht.RadioGroup;
function ce({ variant: t = "default", ...e }) {
  const r = Q.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(So.Provider, { value: r, children: /* @__PURE__ */ o(ht.Root, { ...e }) });
}
function Wc({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  const i = ne();
  return /* @__PURE__ */ p(
    ht.SubTrigger,
    {
      ref: n,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:data-[state=open]:bg-accent",
        e && "tw:pl-8",
        t,
        Ce({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Oe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Yc({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = wt();
  return /* @__PURE__ */ o(
    ht.SubContent,
    {
      ref: r,
      className: m(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: e })
    }
  );
}
function we({
  className: t,
  sideOffset: e = 4,
  children: r,
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ o(ht.Portal, { children: /* @__PURE__ */ o(
    ht.Content,
    {
      ref: n,
      sideOffset: e,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ o("div", { dir: i, children: r })
    }
  ) });
}
function so({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = wt(), i = ne();
  return /* @__PURE__ */ o(
    ht.Item,
    {
      ref: r,
      className: m(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t,
        Ce({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
}
function le({
  className: t,
  children: e,
  checked: r,
  ref: n,
  ...a
}) {
  const i = wt(), s = ne();
  return /* @__PURE__ */ p(
    ht.CheckboxItem,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Ce({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      dir: i,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(ht.ItemIndicator, { children: /* @__PURE__ */ o(qt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function Xc({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = wt(), i = ne();
  return /* @__PURE__ */ p(
    ht.RadioItem,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Ce({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(ht.ItemIndicator, { children: /* @__PURE__ */ o(wo, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Rr({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ht.Label,
    {
      ref: r,
      className: m("tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold", e && "tw:pl-8", t),
      ...n
    }
  );
}
function or({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ht.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function up({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function dn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: n = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = R(!1), [d, h] = R(), f = G(null);
  H(() => {
    if (!c) return;
    let k = !0;
    const P = f.current;
    if (!P) return;
    const z = setTimeout(() => {
      k && Sa(P);
    }, 300);
    return () => {
      k = !1, clearTimeout(z);
    };
  }, [c]);
  const u = B(
    (k) => {
      k && k.stopPropagation(), w(!1), h(void 0), s == null || s(!1);
    },
    [s]
  ), g = B(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        kr(d)
      ) && (w(!1), h(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), v = j(() => {
    const k = new Date(t.date), P = Mi(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), z = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ve(r["%comment_dateAtTime%"], {
      date: P,
      time: z
    });
  }, [t.date, r]), b = j(() => t.user, [t.user]), x = j(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = j(() => Oi(t.contents), [t.contents]), N = j(() => {
    if (n && l)
      return /* @__PURE__ */ p(at, { children: [
        /* @__PURE__ */ p(
          so,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), h($c(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ o(Ja, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          so,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ o(Za, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    n,
    r,
    t.contents,
    t.id,
    i,
    s
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: m("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ o(Kc, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ o(qc, { className: "tw:text-xs tw:font-medium", children: x }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ o("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: v }),
            /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Ze, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              fr(t.assignedUser, r)
            ] })
          ] }),
          c && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: f,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : To(k) && (k.preventDefault(), k.stopPropagation(), $t(d) && g());
              },
              onKeyDown: (k) => {
                Eo(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  yr,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: d,
                    onSerializedChange: (k) => h(k)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ o(
                    F,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ o(Ve, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !$t(d),
                      children: /* @__PURE__ */ o(_n, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ p(at, { children: [
            t.status === "Resolved" && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ o(
              "div",
              {
                className: m(
                  "tw:prose tw:items-start tw:gap-2 tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
                  // tw:prose has a max width defined on it, that we choose to override
                  "tw:max-w-none",
                  // Don't render blockquote on the first child. All comments are wrapped in blockquote
                  // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                  // But we don't want it to look like there's a blockquote there. Apply styles to the
                  // blockquote directly inside this div.
                  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
                  // Don't render quotes on blockquotes
                  "tw:prose-quoteless",
                  {
                    "tw:line-clamp-3": !n
                  }
                ),
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        N && /* @__PURE__ */ p(ce, { children: [
          /* @__PURE__ */ o(ke, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(Qa, {}) }) }),
          /* @__PURE__ */ o(we, { align: "end", children: N })
        ] })
      ]
    }
  );
}
const pn = {
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
function Jc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: n = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: d,
  handleAddCommentToThread: h,
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: N,
  isRead: k = !1,
  autoReadDelay: P = 5,
  onVerseRefClick: z
}) {
  const [I, E] = R(pn), [_, S] = R(
    void 0
  ), V = n, [$, O] = R(!1), [A, W] = R(!1), [M, X] = R(!1), [Et, Ot] = R(!1), [Rt, pt] = R(!1), [lt, K] = R(k), [rt, ot] = R(!1), it = G(void 0), [bt, Gt] = R(/* @__PURE__ */ new Map());
  H(() => {
    let T = !0;
    return (async () => {
      const dt = y ? await y(c) : !1;
      T && pt(dt);
    })(), () => {
      T = !1;
    };
  }, [c, y]), H(() => {
    let T = !0;
    if (!n) {
      Ot(!1), Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = x ? await x(c) : !1;
      T && Ot(dt);
    })(), () => {
      T = !1;
    };
  }, [n, c, x]);
  const Lt = j(() => e.filter((T) => !T.deleted), [e]);
  H(() => {
    let T = !0;
    if (!n || !N) {
      Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = /* @__PURE__ */ new Map();
      await Promise.all(
        Lt.map(async ($o) => {
          const qa = await N($o.id);
          T && dt.set($o.id, qa);
        })
      ), T && Gt(dt);
    })(), () => {
      T = !1;
    };
  }, [n, Lt, N]);
  const Ht = j(() => Lt[0], [Lt]), Ee = G(null), ae = G(void 0), Wt = B(() => {
    var T;
    (T = ae.current) == null || T.call(ae), E(pn);
  }, []), qe = B(() => {
    const T = !lt;
    K(T), ot(!T), g == null || g(c, T);
  }, [lt, g, c]);
  H(() => {
    O(!1);
  }, [n]), H(() => {
    if (n && !lt && !rt) {
      const T = setTimeout(() => {
        K(!0), g == null || g(c, !0);
      }, P * 1e3);
      return it.current = T, () => clearTimeout(T);
    }
    it.current && (clearTimeout(it.current), it.current = void 0);
  }, [n, lt, rt, P, c, g]);
  const D = j(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), C = j(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = fr(i, r);
    return ve(r["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [i, r]), L = j(() => Lt.slice(1), [Lt]), q = j(() => L.length ?? 0, [L.length]), U = j(() => q > 0, [q]), nt = j(() => $ || q <= 2 ? L : L.slice(-2), [L, q, $]), tt = j(() => $ || q <= 2 ? 0 : q - 2, [q, $]), mt = j(
    () => q === 1 ? D.singleReply : ve(D.multipleReplies, { count: q }),
    [q, D]
  ), st = j(
    () => tt === 1 ? D.singleReply : ve(D.multipleReplies, { count: tt }),
    [tt, D]
  );
  H(() => {
    !n && A && U && W(!1);
  }, [n, A, U]);
  const Tt = B(
    async (T) => {
      T && T.stopPropagation();
      const gt = $t(I) ? kr(I) : void 0;
      if (_ !== void 0) {
        await h({
          threadId: c,
          contents: gt,
          assignedUser: _
        }) && (S(void 0), gt && Wt());
        return;
      }
      gt && await h({ threadId: c, contents: gt }) && Wt();
    },
    [
      Wt,
      I,
      h,
      _,
      c
    ]
  ), It = B(
    async (T) => {
      const gt = $t(I) ? kr(I) : void 0, dt = await h({
        ...T,
        contents: gt,
        assignedUser: _ ?? T.assignedUser
      });
      return dt && gt && Wt(), dt && _ !== void 0 && S(void 0), dt;
    },
    [Wt, I, h, _]
  );
  return /* @__PURE__ */ o(
    Fc,
    {
      role: "option",
      "aria-selected": n,
      id: c,
      className: m(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !n },
        {
          "tw:bg-primary-foreground": !n && d !== "Resolved" && lt,
          "tw:bg-background": n && d !== "Resolved" && lt,
          "tw:bg-muted": d === "Resolved",
          "tw:bg-accent": !lt && !n && d !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ p(Bc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            C && /* @__PURE__ */ o(Ze, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: C }),
            /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "icon",
                onClick: (T) => {
                  T.stopPropagation(), qe();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": lt ? "Mark as unread" : "Mark as read",
                children: lt ? /* @__PURE__ */ o(ti, {}) : /* @__PURE__ */ o(ei, {})
              }
            ),
            Rt && d !== "Resolved" && /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "icon",
                className: m(
                  "tw:ms-auto",
                  "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                  "tw:opacity-0 tw:group-hover:opacity-100"
                ),
                onClick: (T) => {
                  T.stopPropagation(), It({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ o(qt, { className: "tw:h-4 tw:w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: Ee,
              className: m(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": V
                },
                { "tw:whitespace-nowrap": !V }
              ),
              children: [
                a && z ? /* @__PURE__ */ o(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (T) => {
                      T.stopPropagation(), z(w);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ p("span", { className: t, children: [
                  Ht.contextBefore,
                  /* @__PURE__ */ o("span", { className: "tw:font-bold", children: Ht.selectedText }),
                  Ht.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ o(
            dn,
            {
              comment: Ht,
              localizedStrings: r,
              isThreadExpanded: n,
              threadStatus: d,
              handleAddCommentToThread: It,
              handleUpdateComment: f,
              handleDeleteComment: u,
              onEditingChange: W,
              canEditOrDelete: (!A && bt.get(Ht.id)) ?? !1,
              canUserResolveThread: Rt
            }
          )
        ] }),
        /* @__PURE__ */ p(at, { children: [
          U && !n && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Qe, {}) }),
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: mt })
          ] }),
          !n && $t(I) && /* @__PURE__ */ o(
            yr,
            {
              editorSerializedState: I,
              onSerializedChange: (T) => E(T),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ p(at, { children: [
            tt > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (T) => {
                  T.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (T) => {
                  (T.key === "Enter" || T.key === " ") && (T.preventDefault(), T.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Qe, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: st }),
                    $ ? /* @__PURE__ */ o(Cn, {}) : /* @__PURE__ */ o(ze, {})
                  ] })
                ]
              }
            ),
            nt.map((T) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
              dn,
              {
                comment: T,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: n,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: W,
                canEditOrDelete: (!A && bt.get(T.id)) ?? !1
              }
            ) }, T.id)),
            b !== !1 && (!A || $t(I)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (T) => T.stopPropagation(),
                onKeyDownCapture: (T) => {
                  To(T) && (T.preventDefault(), T.stopPropagation(), ($t(I) || _ !== void 0) && Tt());
                },
                onKeyDown: (T) => {
                  Eo(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ o(
                    yr,
                    {
                      editorSerializedState: I,
                      onSerializedChange: (T) => E(T),
                      placeholder: d === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (T) => {
                        ae.current = T;
                      }
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    _ !== void 0 && /* @__PURE__ */ o("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: ve(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: fr(
                          _,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ p(re, { open: M, onOpenChange: X, children: [
                      /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ o(
                        F,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !Et || !v || v.length === 0 || !v.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ o(Nn, {})
                        }
                      ) }),
                      /* @__PURE__ */ o(
                        oe,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (T) => {
                            T.key === "Escape" && (T.stopPropagation(), X(!1));
                          },
                          children: /* @__PURE__ */ o(ue, { children: /* @__PURE__ */ o(he, { children: v == null ? void 0 : v.map((T) => /* @__PURE__ */ o(
                            ee,
                            {
                              onSelect: () => {
                                S(T !== i ? T : void 0), X(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ o("span", { children: fr(T, r) })
                            },
                            T || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ o(
                      F,
                      {
                        size: "icon",
                        onClick: Tt,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !$t(I) && _ === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ o(_n, {})
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
function hp({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: n,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: w,
  canUserAddCommentToThread: d,
  canUserAssignThreadCallback: h,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [x, y] = R(/* @__PURE__ */ new Set()), [N, k] = R();
  H(() => {
    g && (y((O) => new Set(O).add(g)), k(g));
  }, [g]);
  const P = r.filter(
    (O) => O.comments.some((A) => !A.deleted)
  ), z = P.map((O) => ({
    id: O.id
  })), I = B(
    (O) => {
      y((A) => new Set(A).add(O.id)), k(O.id), v == null || v(O.id);
    },
    [v]
  ), E = B(
    (O) => {
      const A = x.has(O);
      y((W) => {
        const M = new Set(W);
        return M.has(O) ? M.delete(O) : M.add(O), M;
      }), k(O), v == null || v(A ? void 0 : O);
    },
    [x, v]
  ), { listboxRef: _, activeId: S, handleKeyDown: V } = zc({
    options: z,
    onOptionSelect: I
  }), $ = B(
    (O) => {
      O.key === "Escape" ? (N && x.has(N) && (y((A) => {
        const W = new Set(A);
        return W.delete(N), W;
      }), k(void 0), v == null || v(void 0)), O.preventDefault(), O.stopPropagation()) : V(O);
    },
    [N, x, V, v]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: _,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: $,
      children: P.map((O) => /* @__PURE__ */ o(
        "div",
        {
          id: O.id,
          className: m({
            "tw:opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            Jc,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: a,
              verseRef: O.verseRef,
              handleSelectThread: E,
              threadId: O.id,
              thread: O,
              isRead: O.isRead,
              isSelected: x.has(O.id),
              currentUser: n,
              assignedUser: O.assignedUser,
              threadStatus: O.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: h,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: b
            }
          )
        },
        O.id
      ))
    }
  );
}
function Zc({ table: t }) {
  return /* @__PURE__ */ p(ce, { children: [
    /* @__PURE__ */ o(zs, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ o(ri, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(we, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ o(Rr, { children: "Toggle columns" }),
      /* @__PURE__ */ o(or, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ o(
        le,
        {
          className: "tw:capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (r) => e.toggleVisibility(!!r),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Ae = yt.Root, Qc = yt.Group, $e = yt.Value, tw = de(
  // CUSTOM: Removed tw:justify-between. Added tw:gap-2, tw:[&>span]:flex-1, tw:[&>span]:text-start
  // to keep the chevron tight against the text instead of drifting to the far edge on resize.
  "tw:flex tw:h-10 tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:border tw:border-input tw:bg-background tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-background tw:placeholder:text-muted-foreground tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:[&>span]:flex-1 tw:[&>span]:line-clamp-1 tw:[&>span]:text-start",
  {
    variants: {
      size: {
        default: "tw:h-10 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3",
        lg: "tw:h-11 tw:rounded-md tw:px-8",
        icon: "tw:h-10 tw:w-10"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function Pe({
  className: t,
  children: e,
  size: r,
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ p(
    yt.Trigger,
    {
      className: m(tw({ size: r, className: t })),
      ref: n,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ o(yt.Icon, { asChild: !0, children: /* @__PURE__ */ o(ze, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function ew({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.ScrollUpButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Cn, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function rw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.ScrollDownButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(ze, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Le({
  className: t,
  children: e,
  position: r = "popper",
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ o(yt.Portal, { children: /* @__PURE__ */ p(
    yt.Content,
    {
      ref: n,
      className: m(
        "pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      ...a,
      children: [
        /* @__PURE__ */ o(ew, {}),
        /* @__PURE__ */ o(
          yt.Viewport,
          {
            className: m(
              "tw:p-1",
              r === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ o(rw, {})
      ]
    }
  ) });
}
function fp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.Label,
    {
      ref: e,
      className: m("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...r
    }
  );
}
function At({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    yt.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(yt.ItemIndicator, { children: /* @__PURE__ */ o(qt, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ o(yt.ItemText, { children: e })
      ]
    }
  );
}
function mp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function ow({ table: t }) {
  return /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ o("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ p(
        Ae,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ o(Pe, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ o($e, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(Le, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ o(At, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(oi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(ni, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(ai, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(ii, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const un = `
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
function nw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function tr(t, e) {
  const r = e ? `${un}, ${e}` : un;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && nw(n)
  );
}
function Ro({
  className: t,
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = Q.useRef(null);
  Q.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), Q.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        tr(s, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        s.preventDefault(), tr(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ o("div", { className: m("pr-twp tw:relative tw:w-full", { "tw:p-1": e }), children: /* @__PURE__ */ o(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: a,
      className: m(
        "tw:w-full tw:caption-bottom tw:text-sm tw:outline-hidden",
        // CUSTOM: Add outline-hidden to remove duplicate outline
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
}
function Do({
  className: t,
  stickyHeader: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: r,
      className: m(
        {
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...n
    }
  );
}
function Mo({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("tbody", { ref: e, className: m("tw:[&_tr:last-child]:border-0", t), ...r });
}
function gp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: e,
      className: m(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...r
    }
  );
}
function aw(t) {
  Q.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? tr(t.current) : [], i = a.indexOf(document.activeElement), s = n.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < a.length && a[s].focus();
        }
        n.key === "Escape" && (n.preventDefault(), e.focus()), (n.key === "ArrowDown" || n.key === "ArrowUp") && n.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function iw(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function sw(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function se({
  className: t,
  onKeyDown: e,
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...i
}) {
  const s = Q.useRef(null);
  Q.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), aw(s);
  const l = Q.useMemo(
    () => s.current ? tr(s.current) : [],
    [s]
  ), c = Q.useCallback(
    (d) => {
      const { current: h } = s;
      if (!h || !h.parentElement) return;
      const f = h.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tr(f).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = u.indexOf(h), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), sw(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), iw(l, v, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = h.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), w = Q.useCallback(
    (d) => {
      n && (r == null || r(d));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: m(
        // CUSTOM: Add focus styles and add tw:outline-hidden so there isn't a duplicate outline
        "tw:border-b tw:outline-hidden tw:transition-colors tw:hover:bg-muted/50",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        "tw:data-[state=selected]:bg-muted",
        t
      ),
      ...i
    }
  );
}
function Nr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "th",
    {
      ref: e,
      className: m(
        "tw:h-12 tw:px-4 tw:text-start tw:align-middle tw:font-medium tw:text-muted-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...r
    }
  );
}
function Me({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "td",
    {
      ref: e,
      className: m("tw:p-4 tw:align-middle tw:[&:has([role=checkbox])]:pe-0", t),
      ...r
    }
  );
}
function bp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "caption",
    {
      ref: e,
      className: m("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function lo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function lw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var z;
  const [d, h] = R([]), [f, u] = R([]), [g, v] = R({}), [b, x] = R({}), y = j(() => e ?? [], [e]), N = Wn({
    data: y,
    columns: t,
    getCoreRowModel: Xn(),
    ...r && { getPaginationRowModel: Fs() },
    onSortingChange: h,
    getSortedRowModel: Yn(),
    onColumnFiltersChange: u,
    getFilteredRowModel: js(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: x,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = N.getVisibleFlatColumns();
  let P;
  return c ? P = Array.from({ length: 10 }).map((_, S) => `skeleton-row-${S}`).map((_) => /* @__PURE__ */ o(se, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ o(Me, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ o("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ o(lo, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, _)) : ((z = N.getRowModel().rows) == null ? void 0 : z.length) > 0 ? P = N.getRowModel().rows.map((I) => /* @__PURE__ */ o(
    se,
    {
      onClick: () => s(I, N),
      "data-state": I.getIsSelected() && "selected",
      children: I.getVisibleCells().map((E) => /* @__PURE__ */ o(Me, { children: We(E.column.columnDef.cell, E.getContext()) }, E.id))
    },
    I.id
  )) : P = /* @__PURE__ */ o(se, { children: /* @__PURE__ */ o(Me, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(Zc, { table: N }),
    /* @__PURE__ */ p(Ro, { stickyHeader: i, children: [
      /* @__PURE__ */ o(Do, { stickyHeader: i, children: N.getHeaderGroups().map((I) => /* @__PURE__ */ o(se, { children: I.headers.map((E) => /* @__PURE__ */ o(Nr, { className: "tw:p-0", children: E.isPlaceholder ? void 0 : We(E.column.columnDef.header, E.getContext()) }, E.id)) }, I.id)) }),
      /* @__PURE__ */ o(Mo, { children: P })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ o(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.previousPage(),
          disabled: !N.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.nextPage(),
          disabled: !N.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ o(ow, { table: N })
  ] });
}
function vp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: n,
  truncate: a
}) {
  const i = j(
    () => ({
      overrides: {
        a: {
          props: {
            target: n
          }
        }
      }
    }),
    [n]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: t,
      className: m(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": a
        },
        r
      ),
      children: /* @__PURE__ */ o(qs, { options: i, children: e })
    }
  );
}
const cw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), hn = (t, e) => t[e] ?? e;
function ww({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: n
}) {
  const a = hn(r, "%webView_error_dump_header%"), i = hn(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ p(
    "div",
    {
      id: n,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ o("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: a }),
            /* @__PURE__ */ o("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ o(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ o(En, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ o("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const xp = Object.freeze([
  ...cw,
  "%webView_error_dump_copied_message%"
]);
function yp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: n,
  className: a,
  id: i
}) {
  const [s, l] = R(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(re, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ o(fe, { asChild: !0, children: n }),
    /* @__PURE__ */ p(oe, { id: i, className: m("tw:min-w-80 tw:max-w-96", a), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(ut, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        ww,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var dw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(dw || {});
function kp({ id: t, label: e, groups: r }) {
  const [n, a] = R(
    Object.fromEntries(
      r.map(
        (w, d) => w.itemType === 0 ? [d, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = R({}), l = (w, d) => {
    const h = !n[w][d];
    a((u) => (u[w][d] = h, { ...u }));
    const f = r[w].items[d];
    f.onUpdate(f.id, h);
  }, c = (w, d) => {
    s((f) => (f[w] = d, { ...f }));
    const h = r[w].items.find((f) => f.id === d);
    h ? h.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ o("div", { id: t, children: /* @__PURE__ */ p(ce, { children: [
    /* @__PURE__ */ o(ke, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ o(si, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ o(ze, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ o(we, { children: r.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o(Rr, { children: w.label }),
      /* @__PURE__ */ o(Da, { children: w.itemType === 0 ? /* @__PURE__ */ o(at, { children: w.items.map((h, f) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        le,
        {
          checked: n[d][f],
          onCheckedChange: () => l(d, f),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ o(
        Hc,
        {
          value: i[d],
          onValueChange: (h) => c(d, h),
          children: w.items.map((h) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Xc, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ o(or, {})
    ] }, w.label)) })
  ] }) });
}
function Np({
  id: t,
  category: e,
  downloads: r,
  languages: n,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new Ii("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((d, h) => d + h, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ o("div", { className: "tw:flex", children: /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ o(li, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: c })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-2", children: n.slice(0, 3).map((d) => /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d.toUpperCase() }, d)) }),
          n.length > 3 && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => w(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                n.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || s) && /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          a && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(ci, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(wi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function pw({ id: t, versionHistory: e }) {
  const [r, n] = R(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), d = w.getUTCFullYear() - 1970, h = w.getUTCMonth(), f = w.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : h > 0 ? u = `${h.toString()} month${h === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ o("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ o("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ o("div", { className: "tw:text-foreground", children: /* @__PURE__ */ o("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ o("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ p("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ o("div", { children: i(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => n(!r),
        className: "tw:text-xs tw:text-foreground tw:underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function _p({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: n,
  versionHistory: a,
  currentVersion: i
}) {
  const s = j(() => Ai(r), [r]), c = ((w) => {
    const d = new Intl.DisplayNames($i(), { type: "language" });
    return w.map((h) => d.of(h));
  })(n);
  return /* @__PURE__ */ o("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(pw, { versionHistory: a }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ o("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Publisher" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ o("span", { children: "Size" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ p("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Version" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ o("span", { children: "Languages" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function uw({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: d = void 0,
  isDisabled: h = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [x, y] = R(!1), N = B(
    (S) => {
      var $;
      const V = ($ = t.find((O) => O.label === S)) == null ? void 0 : $.value;
      V && r(
        e.includes(V) ? e.filter((O) => O !== V) : [...e, V]
      );
    },
    [t, e, r]
  ), k = () => c || n, P = j(() => {
    if (!f) return t;
    const S = t.filter(($) => $.starred).sort(($, O) => $.label.localeCompare(O.label)), V = t.filter(($) => !$.starred).sort(($, O) => {
      const A = e.includes($.value), W = e.includes(O.value);
      return A && !W ? -1 : !A && W ? 1 : $.label.localeCompare(O.label);
    });
    return [...S, ...V];
  }, [t, e, f]), z = () => {
    r(t.map((S) => S.value));
  }, I = () => {
    r([]);
  }, E = w ?? x;
  return /* @__PURE__ */ o("div", { id: b, className: g, children: /* @__PURE__ */ p(re, { open: E, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": E,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            u && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: u }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ o(Tn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(oe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(ue, { children: [
      /* @__PURE__ */ o(rr, { placeholder: `Search ${n.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: z, children: i }),
        /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: I, children: s })
      ] }),
      /* @__PURE__ */ p(he, { children: [
        /* @__PURE__ */ o(Tr, { children: l }),
        /* @__PURE__ */ o(te, { children: P.map((S) => /* @__PURE__ */ p(
          ee,
          {
            value: S.label,
            onSelect: N,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                qt,
                {
                  className: m(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ o(di, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Cp({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: d,
  id: h
}) {
  return /* @__PURE__ */ p("div", { id: h, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      uw,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: n,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    e.length > 0 ? /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((f) => {
      var u;
      return /* @__PURE__ */ p(Ze, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ o(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ o(Ve, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (u = t.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ o(ut, { children: d })
  ] });
}
const hw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), fn = (t, e) => t[e] ?? e;
function fw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const c = j(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(
        F,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(pi, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        fn(a, "%undoButton_tooltip%"),
        i && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(
        F,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(ui, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        fn(a, "%redoButton_tooltip%"),
        i && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function mw({ children: t, editorRef: e }) {
  const r = G(null);
  return H(() => {
    var s;
    const n = /Macintosh/i.test(navigator.userAgent), a = ((s = r.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var w, d, h, f;
      if (!a || document.activeElement !== a) return;
      const c = l.key.toLowerCase();
      if (n) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (w = e.current) == null || w.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (h = e.current) == null || h.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (f = e.current) == null || f.redo());
      }
    };
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [e]), /* @__PURE__ */ o("div", { ref: r, children: t });
}
function nr({
  className: t,
  type: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      className: m(
        "pr-twp tw:flex tw:h-10 tw:rounded-md tw:border tw:border-input tw:bg-background tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-background tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  );
}
const gw = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function bw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: n,
  localizedStrings: a
}) {
  const i = G(null), s = G(null), l = G(!1), [c, w] = R(t), [d, h] = R(r), [f, u] = R(!1);
  H(() => {
    w(t);
  }, [t]), H(() => {
    d !== r && h(r);
  }, [r]);
  const g = (b) => {
    l.current = !1, u(b), b || (c !== "custom" || d ? (e(c), n(d)) : (w(t), h(r)));
  }, v = (b) => {
    var x, y, N, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((x = i.current) == null || x.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((N = i.current) == null ? void 0 : N.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ p(ce, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(ke, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "outline", className: "tw:h-6", children: gw(t, a, r) }) }) }),
      /* @__PURE__ */ o(_t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      we,
      {
        style: { zIndex: Jn },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ o(Rr, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ o(
            le,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Jr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            le,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Zr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            le,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (b) => {
                var x;
                b.stopPropagation(), l.current = !0, (x = i.current) == null || x.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  nr,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: d,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => h(b.target.value)
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
const vw = (t, e) => t === "f" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(Rn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(Dn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(Sn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), xw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), ve(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function yw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n
}) {
  return /* @__PURE__ */ p(ce, { children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ o(Ms, { asChild: !0, children: /* @__PURE__ */ o(ke, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "outline", className: "tw:h-6", children: vw(t, r) }) }) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: xw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(we, { style: { zIndex: Jn }, children: [
      /* @__PURE__ */ o(Rr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o(or, {}),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t !== "x" && !n,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(Sn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t === "x" && !n,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(Rn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t === "x" && !n,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(Dn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const kw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Nw({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? hi, { className: e, size: 16 });
}
function mn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    ee,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ o("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Nw, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ o("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ o("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(sl, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function _w({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [n, a] = R(""), [i, s] = j(() => {
    const l = n.trim().toLowerCase();
    if (!l)
      return [e, []];
    const c = e.filter(
      (d) => {
        var h;
        return (h = d.marker) == null ? void 0 : h.toLowerCase().includes(l);
      }
    ), w = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !c.includes(d)
    );
    return [c, w];
  }, [n, e]);
  return /* @__PURE__ */ p(ue, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      rr,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(he, { children: [
      /* @__PURE__ */ o(Tr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(te, { children: i.map((l) => {
        var c;
        return /* @__PURE__ */ o(
          mn,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(at, { children: [
        i.length > 0 && /* @__PURE__ */ o(Zn, { alwaysRender: !0 }),
        /* @__PURE__ */ o(te, { children: s.map((l) => {
          var c;
          return /* @__PURE__ */ o(
            mn,
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
function Cw(t, e, r, n) {
  if (!n || n === "p") return [];
  const a = pr[n];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[pr[l].description] ?? pr[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Ew(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Tw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Sw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Ep({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: w
}) {
  const d = G(null), h = G(null), f = G(null), u = G(null);
  Dt(() => {
    if (!u.current) return;
    const { width: C } = u.current.getBoundingClientRect();
    C > 0 && (u.current.style.width = `${C}px`);
  }, []);
  const [g, v] = R("generated"), [b, x] = R("*"), [y, N] = R("f"), [k, P] = R(!1), [z, I] = R(!0), [E, _] = R(!1), S = G(!1), V = G(""), [$, O] = R(!1), [A, W] = R(), [M, X] = R(), [Et, Ot] = R(), [Rt, pt] = R(), lt = G(null), K = j(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? Us(), noteMode: "expanded" }
    }),
    [s, l]
  ), rt = j(
    () => Cw(
      d,
      () => O(!1),
      c,
      Rt
    ),
    [c, Rt]
  );
  H(() => {
    var C;
    $ || (C = d.current) == null || C.focus();
  }, [y, $]), H(() => {
    var q, U;
    let C;
    S.current = !1, I(!0);
    const L = e == null ? void 0 : e.at(0);
    if (L && ir("note", L)) {
      const nt = (q = L.insert.note) == null ? void 0 : q.caller;
      let tt = "custom";
      nt === Jr ? tt = "generated" : nt === Zr ? tt = "hidden" : nt && x(nt), v(tt), N(((U = L.insert.note) == null ? void 0 : U.style) ?? "f"), C = setTimeout(() => {
        var mt;
        (mt = d.current) == null || mt.applyUpdate([L]);
      }, 0);
    }
    return () => {
      C && clearTimeout(C);
    };
  }, [e, i]);
  const ot = B(
    (C, L, q = !1) => {
      var nt, tt, mt;
      const U = (tt = (nt = d.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (U && ir("note", U)) {
        if (U.insert.note) {
          let st;
          C === "custom" ? st = L : C === "generated" ? st = Jr : st = Zr, U.insert.note.caller = st;
        }
        r == null || r([U]), q && w && i && ((mt = w.current) == null || mt.replaceEmbedUpdate(i, [U]));
      }
    },
    [i, r, w]
  ), it = B(() => {
    ot(g, b, !0), n();
  }, [g, b, n, ot]), bt = G(it);
  Dt(() => {
    bt.current = it;
  });
  const Gt = G({ book: a.book, chapterNum: a.chapterNum });
  Dt(() => {
    (Gt.current.book !== a.book || Gt.current.chapterNum !== a.chapterNum) && (Gt.current = { book: a.book, chapterNum: a.chapterNum }, bt.current());
  }, [a.book, a.chapterNum]);
  const Lt = () => {
    var L;
    const C = (L = h.current) == null ? void 0 : L.getElementsByClassName("editor-input")[0];
    C != null && C.textContent && navigator.clipboard.writeText(C.textContent);
  }, Ht = B(
    (C) => {
      v(C), ot(C, b);
    },
    [b, ot]
  ), Ee = B(
    (C) => {
      x(C), ot(g, C);
    },
    [g, ot]
  ), ae = (C) => {
    var q, U, nt, tt, mt;
    N(C);
    const L = (U = (q = d.current) == null ? void 0 : q.getNoteOps(0)) == null ? void 0 : U.at(0);
    if (L && ir("note", L)) {
      L.insert.note && (L.insert.note.style = C);
      const st = (tt = (nt = L.insert.note) == null ? void 0 : nt.contents) == null ? void 0 : tt.ops;
      y !== "x" && C === "x" ? st == null || st.forEach((Tt) => Ew(Tt)) : y === "x" && C !== "x" && (st == null || st.forEach((Tt) => Tw(Tt))), (mt = d.current) == null || mt.applyUpdate([L, { delete: 1 }]);
    }
  }, Wt = (C) => {
    pt(C.contextMarker), _(C.canRedo);
  }, qe = B(
    (C) => {
      var q, U, nt, tt, mt;
      const L = (U = (q = d.current) == null ? void 0 : q.getNoteOps(0)) == null ? void 0 : U.at(0);
      if (L && ir("note", L)) {
        C.content.length > 1 && setTimeout(() => {
          var It;
          (It = d.current) == null || It.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const st = (nt = L.insert.note) == null ? void 0 : nt.style, Tt = (mt = (tt = L.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : mt.ops;
        if (st || P(!1), P(
          st === "x" ? !!(Tt != null && Tt.every((It) => {
            var gt, dt;
            if (!((gt = It.attributes) != null && gt.char)) return !0;
            const T = ((dt = It.attributes) == null ? void 0 : dt.char).style;
            return T === "xt" || T === "xo" || T === "xq";
          })) : !!(Tt != null && Tt.every((It) => {
            var gt, dt;
            if (!((gt = It.attributes) != null && gt.char)) return !0;
            const T = ((dt = It.attributes) == null ? void 0 : dt.char).style;
            return T === "ft" || T === "fr" || T === "fq";
          }))
        ), !S.current) {
          S.current = !0, V.current = JSON.stringify(L), I(!0);
          return;
        }
        I(JSON.stringify(L) === V.current), ot(g, b);
      } else
        P(!1), I(!0);
    },
    [g, b, ot]
  ), D = B(() => {
    const C = window.getSelection();
    if (f.current && rt.length && C && C.rangeCount > 0) {
      const L = C.getRangeAt(0).getBoundingClientRect(), q = f.current.getBoundingClientRect();
      W(L.left - q.left), X(L.top - q.top), Ot(L.height), O(!0);
    }
  }, [rt, f]);
  return H(() => {
    const C = () => {
      $ && O(!1);
    };
    return window.addEventListener("click", C), () => {
      window.removeEventListener("click", C);
    };
  }, [$]), H(() => {
    var C;
    $ && ((C = lt.current) == null || C.focus());
  }, [$]), H(() => {
    var q;
    const C = ((q = h.current) == null ? void 0 : q.querySelector(".editor-input")) ?? void 0, L = (U) => {
      !$ && C && document.activeElement === C && U.key === l ? (U.preventDefault(), D()) : $ && U.key === "Escape" && (U.preventDefault(), O(!1));
    };
    return document.addEventListener("keydown", L), () => {
      document.removeEventListener("keydown", L);
    };
  }, [$, D, l]), /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw:flex", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ o(
            yw,
            {
              isTypeSwitchable: k,
              noteType: y,
              handleNoteTypeChange: ae,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ o(
            bw,
            {
              callerType: g,
              updateCallerType: Ht,
              customCaller: b,
              updateCustomCaller: Ee,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-end tw:gap-4", children: [
          /* @__PURE__ */ o(
            fw,
            {
              onUndoClick: () => {
                var C;
                return (C = d.current) == null ? void 0 : C.undo();
              },
              onRedoClick: () => {
                var C;
                return (C = d.current) == null ? void 0 : C.redo();
              },
              canUndo: !z,
              canRedo: E,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(
              F,
              {
                onClick: it,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ o(qt, {})
              }
            ) }),
            /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(F, { onClick: n, className: "tw:h-6 tw:w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ o(Ve, {}) }) }),
            /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: h,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(mw, { editorRef: d, children: /* @__PURE__ */ o(
              Gs,
              {
                options: K,
                onStateChange: Wt,
                onUsjChange: qe,
                defaultUsj: Sw,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
              /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ o(
                F,
                {
                  onClick: Lt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ o(En, {})
                }
              ) }),
              /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "tw:absolute",
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(re, { open: $, children: [
      /* @__PURE__ */ o(
        cl,
        {
          className: "tw:absolute",
          style: {
            top: M,
            left: A,
            height: Et,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ o(
        oe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (C) => {
            C.preventDefault(), C.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            _w,
            {
              markerMenuItems: rt,
              localizedStrings: c,
              searchRef: lt
            }
          )
        }
      )
    ] })
  ] });
}
const Tp = Object.freeze([
  ...kw,
  ...Object.entries(pr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...hw
]);
function Ma(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((a) => typeof a == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const n = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${n}`;
}
function Rw(t, e, r = !0, n = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Oo(t, l, r, !0, a),
      w && n
    ] }, Ma(t, l));
  });
}
function Oo(t, e, r = !0, n = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (n) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ o("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ o(Hr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ o("span", { children: i }),
              /* @__PURE__ */ o(Hr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Dw(
        i,
        Ma(`${t}\\${i.marker}`, [i]),
        r,
        [...a, t ?? "unknown"]
      );
    });
}
function Dw(t, e, r, n = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? r && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      Hr,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Oo(a, t.content, r, !0, [
      ...n,
      a ?? "unknown"
    ])
  ] }, e);
}
function Mw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: n = !0
}) {
  const a = r ? r(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const c = n ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, w = n ? /* @__PURE__ */ o("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: m("note-caller tw:inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), h = s && /* @__PURE__ */ p(at, { children: [
    Oo(t.marker, [s], n, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = n ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = m(f, u);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      c,
      d
    ] }),
    /* @__PURE__ */ o("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: h }),
    /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ o(at, { children: Rw(t.marker, l, n, w) })
      }
    )
  ] });
}
function Sp({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: n = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w
}) {
  const d = c ?? Pi(r, void 0), h = (y, N) => {
    w == null || w(y, N, a);
  }, f = i ? r.findIndex((y) => y === i) : -1, [u, g] = R(f), v = (y, N, k) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), w == null || w(N, k, a);
          break;
      }
  }, b = (y) => {
    if (r.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((N) => Math.min(N + 1, r.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((N) => Math.max(N - 1, 0));
          break;
      }
  }, x = G([]);
  return H(() => {
    var y;
    u >= 0 && u < x.current.length && ((y = x.current[u]) == null || y.focus());
  }, [u]), /* @__PURE__ */ o(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ o(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            n === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((y, N) => {
            const k = y === i, P = `${a}-${N}`;
            return /* @__PURE__ */ p(at, { children: [
              /* @__PURE__ */ o(
                "li",
                {
                  ref: (z) => {
                    x.current[N] = z;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": y.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: N === u ? 0 : -1,
                  className: m(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    w && "tw:hover:bg-muted/50",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                    "tw:focus:outline-hidden tw:focus-visible:outline-hidden",
                    /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                       that looks great in Storybook. However, the left edge of the ring is clipped in
                       P.B app. These are similar, but not identical to, the customizations made in
                       our shadcn table component.
                    */
                    "tw:focus-visible:ring-offset-0.5 tw:focus-visible:relative tw:focus-visible:z-10 tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
                    "tw:grid tw:grid-flow-col tw:grid-cols-subgrid",
                    n === "horizontal" ? "tw:col-span-3" : "tw:col-span-2 tw:row-span-2",
                    e
                  ),
                  onClick: () => h(y, N),
                  onKeyDown: (z) => v(z, y, N),
                  children: /* @__PURE__ */ o(
                    Mw,
                    {
                      footnote: y,
                      layout: n,
                      formatCaller: () => d(y.caller, N),
                      showMarkers: s
                    }
                  )
                },
                P
              ),
              N < r.length - 1 && n === "vertical" && /* @__PURE__ */ o(Qe, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Ow(t) {
  const e = [];
  let r = 0;
  const n = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = n.exec(t)) !== null; )
    a.index > r && e.push(t.substring(r, a.index)), e.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), r = n.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Iw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: n
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = j(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const d = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(d) || (c.add(d), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(Ro, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(Do, { stickyHeader: !0, children: /* @__PURE__ */ p(se, { children: [
      /* @__PURE__ */ o(Nr, { children: a }),
      /* @__PURE__ */ o(Nr, { children: i })
    ] }) }),
    /* @__PURE__ */ o(Mo, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      se,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ o(Me, { children: xe(l.reference, "English") }),
          /* @__PURE__ */ o(Me, { className: n, children: Ow(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function Oa({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Wo.Root,
    {
      ref: e,
      className: m(
        "tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(
        Wo.Indicator,
        {
          className: m("tw:flex tw:items-center tw:justify-center tw:text-current"),
          children: /* @__PURE__ */ o(qt, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const Aw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ o(bi, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ o(vi, { className: "tw:h-4 tw:w-4" });
}, Dr = (t, e, r) => /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ p(
    St,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Aw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ o(_t, { side: "bottom", children: e })
] }) }), Rp = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Dr(e, t)
}), $w = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Dr(r, t)
}), Dp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Dr(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Br = (t, e, r, n, a, i) => {
  let s = [...r];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), n(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, Mp = (t, e, r, n, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => Dr(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p(_a, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ o(
        hr,
        {
          onClick: (c) => {
            c.stopPropagation(), Br(
              [l],
              "approved",
              e,
              r,
              n,
              a
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ o(fi, {})
        }
      ),
      /* @__PURE__ */ o(
        hr,
        {
          onClick: (c) => {
            c.stopPropagation(), Br(
              [l],
              "unapproved",
              e,
              r,
              n,
              a
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ o(mi, {})
        }
      ),
      /* @__PURE__ */ o(
        hr,
        {
          onClick: (c) => {
            c.stopPropagation(), Br(
              [l],
              "unknown",
              e,
              r,
              n,
              a
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ o(gi, {})
        }
      )
    ] });
  }
}), Op = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ip = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ap = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Pw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", $p = Object.freeze([
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
]), Lw = (t, e, r) => {
  let n = t;
  return e !== "all" && (n = n.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), r !== "" && (n = n.filter((a) => a.items[0].includes(r))), n;
}, Vw = (t, e, r) => t.map((n) => {
  const a = jo(n.key) ? n.key : n.key[0];
  return {
    items: jo(n.key) ? [n.key] : n.key,
    count: n.count,
    status: n.status || Pw(a, e, r),
    occurrences: n.occurrences || []
  };
}), Vt = (t, e) => t[e] ?? e;
function Pp({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: n,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: d = !1,
  classNameForVerseText: h,
  onItemSelected: f
}) {
  const u = Vt(r, "%webView_inventory_all%"), g = Vt(r, "%webView_inventory_approved%"), v = Vt(r, "%webView_inventory_unapproved%"), b = Vt(r, "%webView_inventory_unknown%"), x = Vt(r, "%webView_inventory_scope_currentBook%"), y = Vt(r, "%webView_inventory_scope_chapter%"), N = Vt(r, "%webView_inventory_scope_verse%"), k = Vt(r, "%webView_inventory_filter_text%"), P = Vt(
    r,
    "%webView_inventory_show_additional_items%"
  ), z = Vt(r, "%webView_inventory_no_results%"), [I, E] = R(!1), [_, S] = R("all"), [V, $] = R(""), [O, A] = R([]), W = j(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : Vw(K, a, i);
  }, [t, a, i]), M = j(() => {
    if (I) return W;
    const K = [];
    return W.forEach((rt) => {
      const ot = rt.items[0], it = K.find(
        (bt) => bt.items[0] === ot
      );
      it ? (it.count += rt.count, it.occurrences = it.occurrences.concat(rt.occurrences)) : K.push({
        items: [ot],
        count: rt.count,
        occurrences: rt.occurrences,
        status: rt.status
      });
    }), K;
  }, [I, W]), X = j(() => M.length === 0 ? [] : Lw(M, _, V), [M, _, V]), Et = j(() => {
    var ot, it;
    if (!I) return c;
    const K = (ot = n == null ? void 0 : n.tableHeaders) == null ? void 0 : ot.length;
    if (!K) return c;
    const rt = [];
    for (let bt = 0; bt < K; bt++)
      rt.push(
        $w(
          ((it = n == null ? void 0 : n.tableHeaders) == null ? void 0 : it[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...rt, ...c];
  }, [n == null ? void 0 : n.tableHeaders, c, I]);
  H(() => {
    X.length === 0 ? A([]) : X.length === 1 && A(X[0].items);
  }, [X]);
  const Ot = (K, rt) => {
    rt.setRowSelection(() => {
      const it = {};
      return it[K.index] = !0, it;
    });
    const ot = K.original.items;
    A(ot), f && ot.length > 0 && f(ot[0]);
  }, Rt = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, pt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      S(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, lt = j(() => {
    if (M.length === 0 || O.length === 0) return [];
    const K = M.filter((rt) => Li(
      I ? rt.items : [rt.items[0]],
      O
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [O, I, M]);
  return /* @__PURE__ */ o("div", { id: w, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Ae,
        {
          onValueChange: (K) => pt(K),
          defaultValue: _,
          children: [
            /* @__PURE__ */ o(Pe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o($e, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Le, { children: [
              /* @__PURE__ */ o(At, { value: "all", children: u }),
              /* @__PURE__ */ o(At, { value: "approved", children: g }),
              /* @__PURE__ */ o(At, { value: "unapproved", children: v }),
              /* @__PURE__ */ o(At, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Ae, { onValueChange: (K) => Rt(K), defaultValue: s, children: [
        /* @__PURE__ */ o(Pe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o($e, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Le, { children: [
          /* @__PURE__ */ o(At, { value: "book", children: x }),
          /* @__PURE__ */ o(At, { value: "chapter", children: y }),
          /* @__PURE__ */ o(At, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ o(
        nr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: k,
          value: V,
          onChange: (K) => {
            $(K.target.value);
          }
        }
      ),
      n && /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ p(Nt, { children: [
        /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ o(
            Oa,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: I,
              onCheckedChange: (K) => {
                E(K);
              }
            }
          ),
          /* @__PURE__ */ o(ut, { className: "tw:m-1 tw:truncate", children: (n == null ? void 0 : n.checkboxText) ?? P })
        ] }) }),
        /* @__PURE__ */ o(_t, { children: (n == null ? void 0 : n.checkboxText) ?? P })
      ] }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      lw,
      {
        columns: Et,
        data: X,
        onRowClickHandler: Ot,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: z
      }
    ) }),
    lt.length > 0 && /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      Iw,
      {
        classNameForText: h,
        occurrenceData: lt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const zw = "16rem", jw = "3rem", Ia = Q.createContext(void 0);
function Mr() {
  const t = Q.useContext(Ia);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Fw({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: n,
  style: a,
  children: i,
  side: s = "primary",
  ref: l,
  ...c
}) {
  const [w, d] = Q.useState(t), h = e ?? w, f = Q.useCallback(
    (N) => {
      const k = typeof N == "function" ? N(h) : N;
      r ? r(k) : d(k);
    },
    [r, h]
  ), u = Q.useCallback(() => f((N) => !N), [f]), g = h ? "expanded" : "collapsed", x = wt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = Q.useMemo(
    () => ({
      state: g,
      open: h,
      setOpen: f,
      toggleSidebar: u,
      side: x
    }),
    [g, h, f, u, x]
  );
  return /* @__PURE__ */ o(Ia.Provider, { value: y, children: /* @__PURE__ */ o(kt, { delayDuration: 0, children: /* @__PURE__ */ o(
    "div",
    {
      style: (
        // CSS custom properties are not in React.CSSProperties; cast is required to use them
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": zw,
          "--sidebar-width-icon": jw,
          ...a
        }
      ),
      className: m(
        // Removed tw:min-h-svh
        "tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar",
        n
      ),
      ref: l,
      ...c,
      children: i
    }
  ) }) });
}
function Bw({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = Mr();
  return e === "none" ? /* @__PURE__ */ o(
    "div",
    {
      className: m(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ref: a,
      ...i,
      children: n
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      ref: a,
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: m(
              "tw:relative tw:h-svh tw:w-(--sidebar-width) tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              "tw:group-data-[side=secondary]:rotate-180",
              t === "floating" || t === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: m(
              // CUSTOM: Switched tw:fixed to tw:absolute here to scope the sidebar inside of it's container
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              s.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))+2px)]" : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon) tw:group-data-[side=primary]:border-r tw:group-data-[side=secondary]:border-l",
              r
            ),
            ...i,
            children: /* @__PURE__ */ o(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:border tw:group-data-[variant=floating]:border-sidebar-border tw:group-data-[variant=floating]:shadow",
                children: n
              }
            )
          }
        )
      ]
    }
  );
}
function Lp({
  className: t,
  onClick: e,
  ref: r,
  ...n
}) {
  const a = Mr();
  return /* @__PURE__ */ p(
    F,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw:h-7 tw:w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ o(xi, {}) : /* @__PURE__ */ o(yi, {}),
        /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Vp({
  className: t,
  ref: e,
  ...r
}) {
  const { toggleSidebar: n } = Mr();
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ref: e,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: n,
      title: "Toggle Sidebar",
      className: m(
        "tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:-translate-x-1/2 tw:transition-all tw:ease-linear tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:sm:flex",
        "tw:[[data-side=secondary]_&]:cursor-e-resize tw:[[data-side=secondary]_&]:cursor-w-resize",
        "tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize",
        "tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:left-full tw:group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-right-2",
        "tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-left-2",
        t
      ),
      ...r
    }
  );
}
function Kw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "main",
    {
      ref: e,
      className: m(
        // CUSTOM: Removed tw:min-h-svh
        "tw:relative tw:flex tw:flex-1 tw:flex-col tw:bg-background",
        "tw:peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 tw:md:peer-data-[variant=inset]:ml-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow",
        t
      ),
      ...r
    }
  );
}
function zp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    nr,
    {
      ref: e,
      "data-sidebar": "input",
      className: m(
        "tw:h-8 tw:w-full tw:bg-background tw:shadow-none tw:focus-visible:ring-2 tw:focus-visible:ring-sidebar-ring",
        t
      ),
      ...r
    }
  );
}
function jp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function Fp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function Bp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Qe,
    {
      ref: e,
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...r
    }
  );
}
function qw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "content",
      className: m(
        "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...r
    }
  );
}
function gn({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "group",
      className: m("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...r
    }
  );
}
function bn({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? je : "div",
    {
      ref: r,
      "data-sidebar": "group-label",
      className: m(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-hidden tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        "tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...n
    }
  );
}
function Kp({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? je : "button",
    {
      ref: r,
      "data-sidebar": "group-action",
      className: m(
        "tw:absolute tw:right-3 tw:top-3.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-hidden tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...n
    }
  );
}
function vn({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: m("tw:w-full tw:text-sm", t),
      ...r
    }
  );
}
function Uw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: m("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1", t),
      ...r
    }
  );
}
function Gw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: m("tw:group/menu-item tw:relative", t),
      ...r
    }
  );
}
const Hw = de(
  "tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-hidden tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[active=true]:bg-sidebar-accent tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:!size-8 tw:group-data-[collapsible=icon]:!p-2 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        outline: "tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "tw:h-8 tw:text-sm",
        sm: "tw:h-7 tw:text-xs",
        lg: "tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Ww({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: n = "default",
  tooltip: a,
  className: i,
  ref: s,
  ...l
}) {
  const c = t ? je : "button", { state: w } = Mr(), d = /* @__PURE__ */ o(
    c,
    {
      ref: s,
      "data-sidebar": "menu-button",
      "data-size": n,
      "data-active": e,
      className: m(Hw({ variant: r, size: n }), i),
      ...l
    }
  );
  return a ? (typeof a == "string" && (a = {
    children: a
  }), /* @__PURE__ */ p(Nt, { children: [
    /* @__PURE__ */ o(St, { asChild: !0, children: d }),
    /* @__PURE__ */ o(_t, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
  ] })) : d;
}
function qp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    e ? je : "button",
    {
      ref: n,
      "data-sidebar": "menu-action",
      className: m(
        "tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:absolute tw:right-1 tw:top-1.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-hidden tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:peer-data-[size=sm]/menu-button:top-1",
        "tw:peer-data-[size=default]/menu-button:top-1.5",
        "tw:peer-data-[size=lg]/menu-button:top-2.5",
        "tw:group-data-[collapsible=icon]:hidden",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground tw:data-[state=open]:opacity-100 tw:md:opacity-0",
        t
      ),
      ...a
    }
  );
}
function Up({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "menu-badge",
      className: m(
        "tw:pointer-events-none tw:absolute tw:right-1 tw:flex tw:h-5 tw:min-w-5 tw:select-none tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:tabular-nums tw:text-sidebar-foreground",
        "tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw:peer-data-[size=sm]/menu-button:top-1",
        "tw:peer-data-[size=default]/menu-button:top-1.5",
        "tw:peer-data-[size=lg]/menu-button:top-2.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...r
    }
  );
}
function Gp({
  className: t,
  showIcon: e = !1,
  ref: r,
  ...n
}) {
  const a = Q.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ o(lo, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          lo,
          {
            className: "tw:h-4 tw:max-w-(--skeleton-width) tw:flex-1",
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
}
function Hp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu-sub",
      className: m(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:flex-col tw:gap-1 tw:border-l tw:border-sidebar-border tw:px-2.5 tw:py-0.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...r
    }
  );
}
function Wp({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o("li", { ref: t, ...e });
}
function Yp({
  asChild: t = !1,
  size: e = "md",
  isActive: r,
  className: n,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(
    t ? je : "a",
    {
      ref: a,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: m(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:outline-hidden tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        "tw:data-[active=true]:bg-sidebar-accent tw:data-[active=true]:text-sidebar-accent-foreground",
        e === "sm" && "tw:text-xs",
        e === "md" && "tw:text-sm",
        "tw:group-data-[collapsible=icon]:hidden",
        n
      ),
      ...i
    }
  );
}
function Yw({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: n,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = B(
    (f, u) => {
      n(f, u);
    },
    [n]
  ), d = B(
    (f) => {
      const u = r.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [r]
  ), h = B(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    Bw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", c),
      children: /* @__PURE__ */ p(qw, { children: [
        /* @__PURE__ */ p(gn, { children: [
          /* @__PURE__ */ o(bn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ o(vn, { children: /* @__PURE__ */ o(Uw, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ o(Gw, { children: /* @__PURE__ */ o(
            Ww,
            {
              onClick: () => w(f),
              isActive: h(f),
              children: /* @__PURE__ */ o("span", { className: "tw:pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(gn, { children: [
          /* @__PURE__ */ o(bn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ o(vn, { className: "tw:pl-3", children: /* @__PURE__ */ o(
            ro,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Js },
              options: r.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = d(f);
                w(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(ki, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Io = er(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = wt();
    return /* @__PURE__ */ p("div", { id: s, className: m("tw:relative", { "tw:w-full": n }, a), children: [
      /* @__PURE__ */ o(
        kn,
        {
          className: m(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": c === "rtl" },
            { "tw:left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        nr,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (w) => e(w.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ p(
        F,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": c === "rtl" },
            { "tw:right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ o(Ve, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Io.displayName = "SearchBar";
function Xp({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ p("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ o(
      Io,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Fw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ o(
            Yw,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ o(Kw, { className: "tw:min-w-[215px]", children: n })
        ]
      }
    )
  ] });
}
const ie = "scrBook", Xw = "scrRef", be = "source", Jw = "details", Zw = "Scripture Reference", Qw = "Scripture Book", Aa = "Type", td = "Details";
function ed(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (n) => `${n.start.book} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: ie,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Zw,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? ct.bookIdToEnglishName(a.start.book) : n.row.groupingColumnId === ie ? xe(a.start) : void 0;
      },
      getGroupingValue: (n) => ct.bookIdToNumber(n.start.book),
      sortingFn: (n, a) => Wr(n.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => xe(n.start),
      id: Xw,
      header: void 0,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? void 0 : xe(a.start);
      },
      sortingFn: (n, a) => Wr(n.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: be,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Aa : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, a) => n.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: Jw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? td,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const rd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Wr(t.start, t.end) === 0 ? `${Or(t.start)}+${e}` : `${Or(t.start)}+${e}-${Or(t.end)}+${r}`;
}, xn = (t) => `${rd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Jp({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: c
}) {
  const [w, d] = R([]), [h, f] = R([{ id: ie, desc: !1 }]), [u, g] = R({}), v = j(
    () => t.flatMap((_) => _.data.map((S) => ({
      ...S,
      source: _.source
    }))),
    [t]
  ), b = j(
    () => ed(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [n, i, s, r]
  );
  H(() => {
    w.includes(be) ? f([
      { id: be, desc: !1 },
      { id: ie, desc: !1 }
    ]) : f([{ id: ie, desc: !1 }]);
  }, [w]);
  const x = Wn({
    data: v,
    columns: b,
    state: {
      grouping: w,
      sorting: h,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Ks(),
    getGroupedRowModel: Bs(),
    getCoreRowModel: Xn(),
    getSortedRowModel: Yn(),
    getRowId: xn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  H(() => {
    if (l) {
      const _ = x.getSelectedRowModel().rowsById, S = Object.keys(_);
      if (S.length === 1) {
        const V = v.find(($) => xn($) === S[0]) || void 0;
        V && l(V);
      }
    }
  }, [u, v, l, x]);
  const y = a ?? Qw, N = i ?? Aa, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ie] },
    { label: `Group by ${N}`, value: [be] },
    {
      label: `Group by ${y} and ${N}`,
      value: [ie, be]
    },
    {
      label: `Group by ${N} and ${y}`,
      value: [be, ie]
    }
  ], P = (_) => {
    d(JSON.parse(_));
  }, z = (_, S) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()(S);
  }, I = (_, S) => _.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), E = (_, S, V) => {
    if (!((_ == null ? void 0 : _.length) === 0 || S.depth < V.column.getGroupedIndex())) {
      if (S.getIsGrouped())
        switch (S.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (S.depth) {
        case 1:
          return "tw:ps-8";
        case 2:
          return "tw:ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ p("div", { id: c, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ p(
      Ae,
      {
        value: JSON.stringify(w),
        onValueChange: (_) => {
          P(_);
        },
        children: [
          /* @__PURE__ */ o(Pe, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ o($e, {}) }),
          /* @__PURE__ */ o(Le, { position: "item-aligned", children: /* @__PURE__ */ o(Qc, { children: k.map((_) => /* @__PURE__ */ o(At, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Ro, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ o(Do, { children: x.getHeaderGroups().map((_) => /* @__PURE__ */ o(se, { children: _.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(Nr, { colSpan: S.colSpan, className: "tw:sticky top-0", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ o(
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
          We(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, _.id)) }),
      /* @__PURE__ */ o(Mo, { children: x.getRowModel().rows.map((_, S) => {
        const V = wt();
        return /* @__PURE__ */ o(
          se,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: m(I(_, S)),
            onClick: ($) => z(_, $),
            children: _.getVisibleCells().map(($) => {
              if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== be || !r)))
                return /* @__PURE__ */ o(
                  Me,
                  {
                    className: m(
                      $.column.columnDef.id,
                      "tw:p-[1px]",
                      E(w, _, $)
                    ),
                    children: $.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ o(ze, {}),
                          !_.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ o(Oe, {}) : /* @__PURE__ */ o(Gr, {})),
                          " ",
                          We($.column.columnDef.cell, $.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : We($.column.columnDef.cell, $.getContext())
                  },
                  $.id
                );
            })
          },
          _.id
        );
      }) })
    ] })
  ] });
}
const Ao = (t, e) => t.filter((r) => {
  try {
    return He(r) === e;
  } catch {
    return !1;
  }
}), $a = (t, e, r) => Ao(t, e).every((n) => r.includes(n));
function od({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: n,
  localizedStrings: a
}) {
  const i = Ao(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => n(t),
      className: m(
        $a(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: ll(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const yn = 5, Kr = 6;
function nd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: n,
  localizedBookNames: a
}) {
  const i = n["%webView_book_selector_books_selected%"], s = n["%webView_book_selector_select_books%"], l = n["%webView_book_selector_search_books%"], c = n["%webView_book_selector_select_all%"], w = n["%webView_book_selector_clear_all%"], d = n["%webView_book_selector_no_book_found%"], h = n["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: v } = {
    otLong: n == null ? void 0 : n["%scripture_section_ot_long%"],
    ntLong: n == null ? void 0 : n["%scripture_section_nt_long%"],
    dcLong: n == null ? void 0 : n["%scripture_section_dc_long%"],
    extraLong: n == null ? void 0 : n["%scripture_section_extra_long%"]
  }, [b, x] = R(!1), [y, N] = R(""), k = G(void 0), P = G(!1);
  if (t.length !== ct.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const z = j(() => ct.allBookIds.filter(
    (A, W) => t[W] === "1" && !ct.isObsolete(ct.bookIdToNumber(A))
  ), [t]), I = j(() => {
    if (!y.trim()) {
      const M = {
        [Y.OT]: [],
        [Y.NT]: [],
        [Y.DC]: [],
        [Y.Extra]: []
      };
      return z.forEach((X) => {
        const Et = He(X);
        M[Et].push(X);
      }), M;
    }
    const A = z.filter(
      (M) => vo(M, y, a)
    ), W = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return A.forEach((M) => {
      const X = He(M);
      W[X].push(M);
    }), W;
  }, [z, y, a]), E = B(
    (A, W = !1) => {
      if (!W || !k.current) {
        r(
          e.includes(A) ? e.filter((pt) => pt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = z.findIndex((pt) => pt === k.current), X = z.findIndex((pt) => pt === A);
      if (M === -1 || X === -1) return;
      const [Et, Ot] = [
        Math.min(M, X),
        Math.max(M, X)
      ], Rt = z.slice(Et, Ot + 1).map((pt) => pt);
      r(
        e.includes(A) ? e.filter((pt) => !Rt.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...Rt])]
      );
    },
    [e, r, z]
  ), _ = (A) => {
    E(A, P.current), P.current = !1;
  }, S = (A, W) => {
    A.preventDefault(), E(W, A.shiftKey);
  }, V = B(
    (A) => {
      const W = Ao(z, A).map((M) => M);
      r(
        $a(z, A, e) ? e.filter((M) => !W.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, r, z]
  ), $ = () => {
    r(z.map((A) => A));
  }, O = () => {
    r([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Y).map((A) => /* @__PURE__ */ o(
      od,
      {
        section: A,
        availableBookIds: z,
        selectedBookIds: e,
        onToggle: V,
        localizedStrings: n
      },
      A
    )) }),
    /* @__PURE__ */ p(
      re,
      {
        open: b,
        onOpenChange: (A) => {
          x(A), A || N("");
        },
        children: [
          /* @__PURE__ */ o(fe, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ o(Tn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(oe, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ p(
            ue,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (P.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  rr,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: N
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: $, children: c }),
                  /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: O, children: w })
                ] }),
                /* @__PURE__ */ p(he, { children: [
                  /* @__PURE__ */ o(Tr, { children: d }),
                  Object.values(Y).map((A, W) => {
                    const M = I[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ p(Mn, { children: [
                        /* @__PURE__ */ o(
                          te,
                          {
                            heading: Qn(A, f, u, g, v),
                            children: M.map((X) => /* @__PURE__ */ o(
                              ea,
                              {
                                bookId: X,
                                isSelected: e.includes(X),
                                onSelect: () => _(X),
                                onMouseDown: (Et) => S(Et, X),
                                section: He(X),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: to(X, a),
                                className: "tw:flex tw:items-center"
                              },
                              X
                            ))
                          }
                        ),
                        W < Object.values(Y).length - 1 && /* @__PURE__ */ o(Zn, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Kr ? Kr : yn
      ).map((A) => /* @__PURE__ */ o(Ze, { className: "tw:hover:bg-secondary", variant: "secondary", children: Re(A, a) }, A)),
      e.length > Kr && /* @__PURE__ */ o(
        Ze,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - yn} ${h}`
        }
      )
    ] })
  ] });
}
const Zp = Object.freeze([
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
]), me = (t, e) => t[e] ?? e;
function Qp({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: n,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: c
}) {
  const w = me(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = me(
    s,
    "%webView_scope_selector_current_verse%"
  ), h = me(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = me(s, "%webView_scope_selector_current_book%"), u = me(s, "%webView_scope_selector_choose_books%"), g = me(s, "%webView_scope_selector_scope%"), v = me(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: h, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], x = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ p("div", { id: c, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(ut, { children: g }),
      /* @__PURE__ */ o(
        oa,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: x.map(({ value: y, label: N, id: k }) => /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(eo, { className: "tw:me-2", value: y, id: k }),
            /* @__PURE__ */ o(ut, { htmlFor: k, children: N })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(ut, { children: v }),
      /* @__PURE__ */ o(
        nd,
        {
          availableBookInfo: n,
          selectedBookIds: a,
          onChangeSelectedBookIds: i,
          localizedStrings: s,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const qr = {
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
function tu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: n = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...qr,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([w, d]) => [
          w,
          w === d && w in qr ? qr[w] : d
        ]
      )
    )
  }, c = wt();
  return /* @__PURE__ */ p(
    Ae,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ o(Pe, { size: a, className: m("pr-twp tw:w-auto", i), children: /* @__PURE__ */ o(
          $e,
          {
            placeholder: l[Z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ o(
          Le,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: Be },
            children: t.map((w) => /* @__PURE__ */ o(At, { value: `${w}`, children: l[Z(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function eu({ children: t }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw:grid", children: t });
}
function ru({
  primary: t,
  secondary: e,
  children: r,
  isLoading: n = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: a }) : /* @__PURE__ */ o("div", { children: r })
  ] });
}
function ou({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ o(Qe, {}) : ""
  ] });
}
function Pa(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, n]) => "menuItem" in n && n.menuItem === e
  )) == null ? void 0 : r[0];
}
function _r({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ o(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const La = (t, e, r, n) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ o(St, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    so,
    {
      onClick: () => {
        n(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(_r, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(_r, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Gc, { children: [
    /* @__PURE__ */ o(Wc, { children: l.label }),
    /* @__PURE__ */ o(Uc, { children: /* @__PURE__ */ o(Yc, { children: La(
      t,
      e,
      Pa(t, l.id),
      n
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(_t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function co({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(ce, { variant: i, children: [
    /* @__PURE__ */ o(ke, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(F, { variant: s, size: "icon", children: n ?? /* @__PURE__ */ o(Ni, {}) }) }),
    /* @__PURE__ */ o(we, { align: "start", style: { zIndex: Be }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p(Mn, { children: [
      /* @__PURE__ */ o(Da, { children: /* @__PURE__ */ o(kt, { children: La(e.groups, e.items, c, t) }) }),
      w < d.length - 1 && /* @__PURE__ */ o(or, {})
    ] }, c)) })
  ] });
}
const Va = Q.forwardRef(
  ({ id: t, className: e, children: r }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
      id: t,
      children: r
    }
  )
);
function nu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: n,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ p(Va, { className: `tw:w-full tw:border ${i}`, id: a, children: [
    r && /* @__PURE__ */ o(
      co,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ o(_i, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      n && /* @__PURE__ */ o(
        co,
        {
          onSelectMenuItem: e,
          menuData: n,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(Ci, {}),
          className: "tw:h-full"
        }
      ),
      c
    ] })
  ] });
}
function au({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: n,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(Va, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ o(
    co,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: a,
      className: `tw:pointer-events-auto tw:shadow-lg ${n}`,
      buttonVariant: "outline"
    }
  ) });
}
const za = Q.forwardRef(({ className: t, ...e }, r) => {
  const n = wt();
  return /* @__PURE__ */ o(
    Pt.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: n
    }
  );
});
za.displayName = Pt.List.displayName;
const ja = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Pt.List,
  {
    ref: r,
    className: m(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ja.displayName = Pt.List.displayName;
const ad = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Pt.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Fa = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Pt.Content,
  {
    ref: r,
    className: m(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Fa.displayName = Pt.Content.displayName;
function iu({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: n,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ p("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      a ? /* @__PURE__ */ o("h1", { children: a }) : "",
      /* @__PURE__ */ o(
        Io,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ p(za, { children: [
      /* @__PURE__ */ o(ja, { children: t.map((l) => /* @__PURE__ */ o(ad, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ o(Fa, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function id({ ...t }) {
  return /* @__PURE__ */ o(Bt.Menu, { ...t });
}
function sd({ ...t }) {
  return /* @__PURE__ */ o(Bt.Sub, { "data-slot": "menubar-sub", ...t });
}
function ld({
  className: t,
  variant: e = "default",
  ref: r,
  ...n
}) {
  const a = Q.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(So.Provider, { value: a, children: /* @__PURE__ */ o(
    Bt.Root,
    {
      ref: r,
      className: m(
        "tw:flex tw:h-10 tw:items-center tw:space-x-1 tw:rounded-md tw:border tw:bg-background tw:p-1",
        t
      ),
      ...n
    }
  ) });
}
function cd({
  className: t,
  ref: e,
  ...r
}) {
  const n = ne();
  return /* @__PURE__ */ o(
    Bt.Trigger,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ce({ variant: n.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...r
    }
  );
}
function wd({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  const i = ne();
  return /* @__PURE__ */ p(
    Bt.SubTrigger,
    {
      ref: n,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        Ce({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Oe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function dd({
  className: t,
  ref: e,
  ...r
}) {
  const n = ne();
  return /* @__PURE__ */ o(
    Bt.SubContent,
    {
      ref: e,
      className: m(
        "tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": n.variant === "muted"
        },
        t
      ),
      ...r
    }
  );
}
function pd({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: n = 8,
  ref: a,
  ...i
}) {
  const s = ne();
  return /* @__PURE__ */ o(Bt.Portal, { children: /* @__PURE__ */ o(
    Bt.Content,
    {
      ref: a,
      align: e,
      alignOffset: r,
      sideOffset: n,
      className: m(
        "tw:z-50 tw:min-w-[12rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": s.variant === "muted"
        },
        t
      ),
      ...i
    }
  ) });
}
function ud({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = ne();
  return /* @__PURE__ */ o(
    Bt.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        Ce({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
}
function hd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Bt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
const Ge = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var n;
      (n = t.current) == null || n.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Ba = (t, e, r, n) => {
  if (!r) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ o(St, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        ud,
        {
          onClick: () => {
            n(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ o(_r, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ o(_r, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(sd, { children: [
        /* @__PURE__ */ o(wd, { children: w.label }),
        /* @__PURE__ */ o(dd, { children: Ba(
          t,
          e,
          Pa(t, w.id),
          n
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ o(_t, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ o(hd, {}, `separator-${i}`)), c;
  });
};
function fd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: n
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
  if (Hs(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, h) => {
    var g, v, b, x;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Ge(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Ge(i, [f, u]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), Ge(s, [f, u]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Ge(l, [f, u]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), Ge(c, [f, u]);
        break;
    }
  }), H(() => {
    if (!r || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          r(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ o(ld, { ref: a, className: "pr-twp tw:border-0 tw:bg-transparent", variant: n, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, h]) => typeof d == "boolean" || typeof h == "boolean" ? 0 : d.order - h.order).map(([d, h]) => /* @__PURE__ */ p(id, { children: [
      /* @__PURE__ */ o(cd, { ref: w(d), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ o(
        pd,
        {
          style: { zIndex: Be },
          children: /* @__PURE__ */ o(kt, { children: Ba(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function su(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function lu({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: n,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const d = G(void 0);
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("tw:border tw:px-4 tw:text-foreground", n),
      ref: d,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ o(
                    fd,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: w
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ o(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ o(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
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
const md = (t, e) => t[e] ?? e;
function cu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: n,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: c
}) {
  const w = md(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, h] = R(!1), f = (g) => {
    a && a(g), n && n([g, ...r.filter((v) => v !== g)]), i && r.find((v) => v === g) && i([...r.filter((v) => v !== g)]), h(!1);
  }, u = (g, v) => {
    var x, y, N, k, P, z;
    const b = v !== g ? ((y = (x = t[g]) == null ? void 0 : x.uiNames) == null ? void 0 : y[v]) ?? ((k = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(P = t[g]) == null ? void 0 : P.autonym} (${b})` : (z = t[g]) == null ? void 0 : z.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: m("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Ae,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => h(g),
        children: [
          /* @__PURE__ */ o(Pe, { children: /* @__PURE__ */ o($e, {}) }),
          /* @__PURE__ */ o(
            Le,
            {
              style: { zIndex: Be },
              children: Object.keys(t).map((g) => /* @__PURE__ */ o(At, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ o("div", { className: "tw:pt-3", children: /* @__PURE__ */ o(ut, { className: "tw:font-normal tw:text-muted-foreground", children: ve(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function gd({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ o(ut, { children: e(t) }) : r ? /* @__PURE__ */ o(ut, { children: r(t) }) : /* @__PURE__ */ o(ut, { children: t });
}
function wu({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: n,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ o("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ p("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ o(
      Oa,
      {
        className: "tw:me-2 tw:align-middle",
        checked: n.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ o(
      gd,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function du({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: n,
  isHidden: a = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: c,
  dropdownContent: w,
  additionalContent: d,
  accentColor: h,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: a,
      onClick: r,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), r());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: m(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": n && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ o("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l,
            !e && c && /* @__PURE__ */ o("div", { className: "tw:invisible tw:group-hover:visible", children: c }),
            !e && f && w && /* @__PURE__ */ o("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ p(ce, { children: [
              /* @__PURE__ */ o(ke, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(F, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(zo, {}) }) }),
              /* @__PURE__ */ o(we, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ p(ce, { children: [
              /* @__PURE__ */ o(ke, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(F, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(zo, {}) }) }),
              /* @__PURE__ */ o(we, { align: "end", children: w })
            ] })
          ] }),
          d && /* @__PURE__ */ o("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: d })
        ] }),
        h && /* @__PURE__ */ o(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${h}`
          }
        )
      ]
    },
    t
  );
}
const bd = er(({ className: t, ...e }, r) => /* @__PURE__ */ o(Ei, { size: 35, className: m("tw:animate-spin", t), ...e, ref: r }));
bd.displayName = "Spinner";
function pu({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: d,
  onChange: h,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": n }), children: [
    /* @__PURE__ */ o(
      ut,
      {
        htmlFor: t,
        className: m({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ o(
      nr,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: m(c, { "tw:border-red-600": r }),
        defaultValue: w,
        value: d,
        onChange: h,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ o("p", { className: m({ "tw:hidden": !a }), children: a })
  ] });
}
const vd = de(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw:relative tw:w-full tw:rounded-lg tw:border tw:p-4 tw:[&>svg~*]:pl-7 tw:[&>svg+div]:translate-y-[-3px] tw:[&>svg]:absolute tw:[&>svg]:left-4 tw:[&>svg]:top-4 tw:[&>svg]:text-foreground tw:[&>img~*]:pl-7 tw:[&>img+div]:translate-y-[-3px] tw:[&>img]:absolute tw:[&>img]:left-4 tw:[&>img]:top-4 tw:[&>img]:text-foreground",
  {
    variants: {
      variant: {
        default: "tw:bg-background tw:text-foreground",
        destructive: (
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          "tw:border-destructive/50 tw:text-destructive tw:dark:border-destructive tw:[&>svg]:text-destructive tw:[&>img]:text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function uu({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: "alert",
      className: m(
        // CUSTOM
        "pr-twp",
        vd({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function hu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    "h5",
    {
      ref: e,
      className: m("tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight", t),
      ...r,
      children: [
        r.children,
        " "
      ]
    }
  );
}
function fu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: m("tw:text-sm tw:[&_p]:leading-relaxed", t), ...r });
}
const mu = ft.Root, gu = ft.Trigger, bu = ft.Group, vu = ft.Portal, xu = ft.Sub, yu = ft.RadioGroup;
function ku({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ p(
    ft.SubTrigger,
    {
      ref: n,
      className: m(
        "pr-twp tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Oe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Nu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ft.SubContent,
    {
      ref: e,
      className: m(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  );
}
function _u({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(ft.Portal, { children: /* @__PURE__ */ o(
    ft.Content,
    {
      ref: e,
      className: m(
        "pr-twp tw:z-50 tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-[8rem] tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-y-auto tw:overflow-x-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  ) });
}
function Cu({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ft.Item,
    {
      ref: r,
      className: m(
        "pr-twp tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t
      ),
      ...n
    }
  );
}
function Eu({
  className: t,
  children: e,
  checked: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ p(
    ft.CheckboxItem,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ft.ItemIndicator, { children: /* @__PURE__ */ o(qt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function Tu({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    ft.RadioItem,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ft.ItemIndicator, { children: /* @__PURE__ */ o(wo, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Su({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ft.Label,
    {
      ref: r,
      className: m(
        "tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-foreground",
        e && "tw:pl-8",
        t
      ),
      ...n
    }
  );
}
function Ru({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ft.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function Du({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ka = Q.createContext({
  direction: "bottom"
});
function Mu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const n = Q.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ o(Ka.Provider, { value: n, children: /* @__PURE__ */ o(
    pe.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
const Ou = pe.Trigger, xd = pe.Portal, Iu = pe.Close;
function yd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    pe.Overlay,
    {
      ref: e,
      className: m("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...r
    }
  );
}
function Au({
  className: t,
  children: e,
  hideDrawerHandle: r = !1,
  ref: n,
  ...a
}) {
  const { direction: i = "bottom" } = Q.useContext(Ka), s = {
    bottom: "tw:inset-x-0 tw:bottom-0 tw:mt-24 tw:rounded-t-[10px]",
    top: "tw:inset-x-0 tw:top-0 tw:mb-24 tw:rounded-b-[10px]",
    left: "tw:inset-y-0 tw:left-0 tw:mr-24 tw:rounded-r-[10px] tw:w-auto tw:max-w-sm",
    right: "tw:inset-y-0 tw:right-0 tw:ml-24 tw:rounded-l-[10px] tw:w-auto tw:max-w-sm"
  }, l = {
    bottom: "tw:mx-auto tw:mt-4 tw:h-2 tw:w-[100px] tw:rounded-full tw:bg-muted",
    top: "tw:mx-auto tw:mb-4 tw:h-2 tw:w-[100px] tw:rounded-full tw:bg-muted",
    left: "tw:my-auto tw:mr-4 tw:w-2 tw:h-[100px] tw:rounded-full tw:bg-muted",
    right: "tw:my-auto tw:ml-4 tw:w-2 tw:h-[100px] tw:rounded-full tw:bg-muted"
  };
  return /* @__PURE__ */ p(xd, { children: [
    /* @__PURE__ */ o(yd, {}),
    /* @__PURE__ */ p(
      pe.Content,
      {
        ref: n,
        className: m(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw:inset-x-0 tw:bottom-0 tw:mt-24 tw:rounded-t-[10px] tw:flex-col
          "pr-twp tw:fixed tw:z-50 tw:flex tw:h-auto tw:border tw:bg-background",
          i === "bottom" || i === "top" ? "tw:flex-col" : "tw:flex-row",
          s[i],
          t
        ),
        ...a,
        children: [
          !r && (i === "bottom" || i === "right") && /* @__PURE__ */ o("div", { className: l[i] }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-col", children: e }),
          !r && (i === "top" || i === "left") && /* @__PURE__ */ o("div", { className: l[i] })
        ]
      }
    )
  ] });
}
function $u({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function Pu({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { className: m("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function Lu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    pe.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function Vu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    pe.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function zu({
  className: t,
  value: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    Yo.Root,
    {
      ref: r,
      className: m(
        "pr-twp tw:relative tw:h-4 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-secondary",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o(
        Yo.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function ju({
  className: t,
  direction: e,
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    go.Group,
    {
      className: m(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (i) => r(Object.values(i)) : void 0,
      ...a
    }
  );
}
function dr(t) {
  if (t !== void 0)
    return typeof t == "number" ? String(t) : t;
}
function Fu({
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    go.Panel,
    {
      defaultSize: dr(t),
      minSize: dr(e),
      maxSize: dr(r),
      collapsedSize: dr(n),
      ...a
    }
  );
}
function Bu({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    go.Separator,
    {
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-hidden tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 rtl:tw:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ o(Ti, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function Ku({ ...t }) {
  return /* @__PURE__ */ o(
    Ws,
    {
      className: "tw:toaster tw:group",
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
function qu({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ p(
    sr.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...r,
      dir: n,
      children: [
        /* @__PURE__ */ o(sr.Track, { className: "tw:relative tw:h-2 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-secondary", children: /* @__PURE__ */ o(sr.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ o(sr.Thumb, { className: "tw:block tw:h-5 tw:w-5 tw:rounded-full tw:border-2 tw:border-primary tw:bg-background tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function Uu({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    Xo.Root,
    {
      className: m(
        "tw:peer pr-twp tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...r,
      ref: e,
      children: /* @__PURE__ */ o(
        Xo.Thumb,
        {
          className: m(
            "pr-twp tw:pointer-events-none tw:block tw:h-5 tw:w-5 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform",
            {
              "tw:data-[state=checked]:translate-x-5 tw:data-[state=unchecked]:translate-x-0": n === "ltr"
            },
            {
              "tw:data-[state=checked]:translate-x-[-20px] tw:data-[state=unchecked]:translate-x-0": n === "rtl"
            }
          )
        }
      )
    }
  );
}
const Gu = Pt.Root;
function Hu({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    Pt.List,
    {
      ref: e,
      className: m(
        "pr-twp tw:inline-flex tw:h-10 tw:items-center tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
        t
      ),
      ...r,
      dir: n
    }
  );
}
function Wu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Pt.Trigger,
    {
      ref: e,
      className: m(
        "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:whitespace-nowrap tw:rounded-sm tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm",
        t
      ),
      ...r
    }
  );
}
function Yu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Pt.Content,
    {
      ref: e,
      className: m(
        "pr-twp tw:mt-2 tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
        t
      ),
      ...r
    }
  );
}
function Xu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "textarea",
    {
      className: m(
        "pr-twp tw:flex tw:min-h-[80px] tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-background tw:px-3 tw:py-2 tw:text-base tw:ring-offset-background tw:placeholder:text-muted-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: e,
      ...r
    }
  );
}
const Ju = (t, e) => {
  H(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function kd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Nd = (t, e, r = {}) => {
  const n = G(e);
  n.current = e;
  const a = G(r);
  a.current = kd(a.current);
  const [i, s] = R(() => n.current), [l, c] = R(!0);
  return H(() => {
    let w = !0;
    return c(!!t), (async () => {
      if (t) {
        const d = await t();
        w && (s(() => d), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || s(() => n.current);
    };
  }, [t]), [i, l];
}, Ur = () => !1, Zu = (t, e) => {
  const [r] = Nd(
    B(async () => {
      if (!t) return Ur;
      const n = await Promise.resolve(t(e));
      return async () => n();
    }, [e, t]),
    Ur,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  H(() => () => {
    r !== Ur && r();
  }, [r]);
};
function Qu(t) {
  H(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function _d(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && n ? r.insertBefore(a, n) : r.appendChild(a);
}
_d(`.banded-row:hover {
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
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:.25rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(var(--tw-spacing) * 0)}.tw\\:inset-x-0{inset-inline:calc(var(--tw-spacing) * 0)}.tw\\:inset-y-0{inset-block:calc(var(--tw-spacing) * 0)}.tw\\:start-2{inset-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(var(--tw-spacing) * 0)}.tw\\:top-1\\.5{top:calc(var(--tw-spacing) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-2\\.5{top:calc(var(--tw-spacing) * 2.5)}.tw\\:top-3\\.5{top:calc(var(--tw-spacing) * 3.5)}.tw\\:top-4{top:calc(var(--tw-spacing) * 4)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-\\[50\\%\\]{top:50%}.tw\\:-right-1{right:calc(var(--tw-spacing) * -1)}.tw\\:right-0{right:calc(var(--tw-spacing) * 0)}.tw\\:right-1{right:calc(var(--tw-spacing) * 1)}.tw\\:right-3{right:calc(var(--tw-spacing) * 3)}.tw\\:right-4{right:calc(var(--tw-spacing) * 4)}.tw\\:bottom-0{bottom:calc(var(--tw-spacing) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(var(--tw-spacing) * 0)}.tw\\:left-2{left:calc(var(--tw-spacing) * 2)}.tw\\:left-3{left:calc(var(--tw-spacing) * 3)}.tw\\:left-4{left:calc(var(--tw-spacing) * 4)}.tw\\:left-\\[50\\%\\]{left:50%}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-2{grid-row-start:2}.tw\\:\\!m-0{margin:calc(var(--tw-spacing) * 0)!important}.tw\\:m-0{margin:calc(var(--tw-spacing) * 0)}.tw\\:m-1{margin:calc(var(--tw-spacing) * 1)}.tw\\:m-2{margin:calc(var(--tw-spacing) * 2)}.tw\\:-mx-1{margin-inline:calc(var(--tw-spacing) * -1)}.tw\\:mx-0{margin-inline:calc(var(--tw-spacing) * 0)}.tw\\:mx-1{margin-inline:calc(var(--tw-spacing) * 1)}.tw\\:mx-2{margin-inline:calc(var(--tw-spacing) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(var(--tw-spacing) * 3.5)}.tw\\:mx-8{margin-inline:calc(var(--tw-spacing) * 8)}.tw\\:mx-auto{margin-inline:auto}.tw\\:my-1{margin-block:calc(var(--tw-spacing) * 1)}.tw\\:my-2\\.5{margin-block:calc(var(--tw-spacing) * 2.5)}.tw\\:my-4{margin-block:calc(var(--tw-spacing) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(var(--tw-spacing) * 1)}.tw\\:ms-2{margin-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:ms-5{margin-inline-start:calc(var(--tw-spacing) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:me-2{margin-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:mt-1{margin-top:calc(var(--tw-spacing) * 1)}.tw\\:mt-2{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:mt-3{margin-top:calc(var(--tw-spacing) * 3)}.tw\\:mt-4{margin-top:calc(var(--tw-spacing) * 4)}.tw\\:mt-6{margin-top:calc(var(--tw-spacing) * 6)}.tw\\:mt-24{margin-top:calc(var(--tw-spacing) * 24)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(var(--tw-spacing) * 1)}.tw\\:mr-2{margin-right:calc(var(--tw-spacing) * 2)}.tw\\:mr-3{margin-right:calc(var(--tw-spacing) * 3)}.tw\\:mr-4{margin-right:calc(var(--tw-spacing) * 4)}.tw\\:mr-24{margin-right:calc(var(--tw-spacing) * 24)}.tw\\:mb-1{margin-bottom:calc(var(--tw-spacing) * 1)}.tw\\:mb-2{margin-bottom:calc(var(--tw-spacing) * 2)}.tw\\:mb-3{margin-bottom:calc(var(--tw-spacing) * 3)}.tw\\:mb-4{margin-bottom:calc(var(--tw-spacing) * 4)}.tw\\:mb-24{margin-bottom:calc(var(--tw-spacing) * 24)}.tw\\:ml-2{margin-left:calc(var(--tw-spacing) * 2)}.tw\\:ml-4{margin-left:calc(var(--tw-spacing) * 4)}.tw\\:ml-24{margin-left:calc(var(--tw-spacing) * 24)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-4{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:h-1{height:calc(var(--tw-spacing) * 1)}.tw\\:h-2{height:calc(var(--tw-spacing) * 2)}.tw\\:h-2\\.5{height:calc(var(--tw-spacing) * 2.5)}.tw\\:h-3{height:calc(var(--tw-spacing) * 3)}.tw\\:h-3\\.5{height:calc(var(--tw-spacing) * 3.5)}.tw\\:h-4{height:calc(var(--tw-spacing) * 4)}.tw\\:h-5{height:calc(var(--tw-spacing) * 5)}.tw\\:h-6{height:calc(var(--tw-spacing) * 6)}.tw\\:h-7{height:calc(var(--tw-spacing) * 7)}.tw\\:h-8{height:calc(var(--tw-spacing) * 8)}.tw\\:h-9{height:calc(var(--tw-spacing) * 9)}.tw\\:h-10{height:calc(var(--tw-spacing) * 10)}.tw\\:h-11{height:calc(var(--tw-spacing) * 11)}.tw\\:h-12{height:calc(var(--tw-spacing) * 12)}.tw\\:h-14{height:calc(var(--tw-spacing) * 14)}.tw\\:h-20{height:calc(var(--tw-spacing) * 20)}.tw\\:h-24{height:calc(var(--tw-spacing) * 24)}.tw\\:h-32{height:calc(var(--tw-spacing) * 32)}.tw\\:h-40{height:calc(var(--tw-spacing) * 40)}.tw\\:h-64{height:calc(var(--tw-spacing) * 64)}.tw\\:h-96{height:calc(var(--tw-spacing) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[1px\\]{height:1px}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[100px\\]{height:100px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-5{max-height:calc(var(--tw-spacing) * 5)}.tw\\:max-h-10{max-height:calc(var(--tw-spacing) * 10)}.tw\\:max-h-80{max-height:calc(var(--tw-spacing) * 80)}.tw\\:max-h-96{max-height:calc(var(--tw-spacing) * 96)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(var(--tw-spacing) * 0)}.tw\\:min-h-11{min-height:calc(var(--tw-spacing) * 11)}.tw\\:min-h-\\[80px\\]{min-height:80px}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(var(--tw-spacing) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(var(--tw-spacing) * 2)}.tw\\:w-2\\.5{width:calc(var(--tw-spacing) * 2.5)}.tw\\:w-3{width:calc(var(--tw-spacing) * 3)}.tw\\:w-3\\.5{width:calc(var(--tw-spacing) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(var(--tw-spacing) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(var(--tw-spacing) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(var(--tw-spacing) * 6)}.tw\\:w-7{width:calc(var(--tw-spacing) * 7)}.tw\\:w-8{width:calc(var(--tw-spacing) * 8)}.tw\\:w-9{width:calc(var(--tw-spacing) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(var(--tw-spacing) * 10)}.tw\\:w-11{width:calc(var(--tw-spacing) * 11)}.tw\\:w-12{width:calc(var(--tw-spacing) * 12)}.tw\\:w-20{width:calc(var(--tw-spacing) * 20)}.tw\\:w-24{width:calc(var(--tw-spacing) * 24)}.tw\\:w-32{width:calc(var(--tw-spacing) * 32)}.tw\\:w-48{width:calc(var(--tw-spacing) * 48)}.tw\\:w-56{width:calc(var(--tw-spacing) * 56)}.tw\\:w-60{width:calc(var(--tw-spacing) * 60)}.tw\\:w-64{width:calc(var(--tw-spacing) * 64)}.tw\\:w-72{width:calc(var(--tw-spacing) * 72)}.tw\\:w-80{width:calc(var(--tw-spacing) * 80)}.tw\\:w-96{width:calc(var(--tw-spacing) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(var(--tw-spacing) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-48{max-width:calc(var(--tw-spacing) * 48)}.tw\\:max-w-64{max-width:calc(var(--tw-spacing) * 64)}.tw\\:max-w-96{max-width:calc(var(--tw-spacing) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:min-w-0{min-width:calc(var(--tw-spacing) * 0)}.tw\\:min-w-5{min-width:calc(var(--tw-spacing) * 5)}.tw\\:min-w-8{min-width:calc(var(--tw-spacing) * 8)}.tw\\:min-w-16{min-width:calc(var(--tw-spacing) * 16)}.tw\\:min-w-36{min-width:calc(var(--tw-spacing) * 36)}.tw\\:min-w-80{min-width:calc(var(--tw-spacing) * 80)}.tw\\:min-w-\\[8rem\\]{min-width:8rem}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(var(--tw-spacing) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-in{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:scroll-m-20{scroll-margin:calc(var(--tw-spacing) * 20)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(var(--tw-spacing) * 0)}.tw\\:gap-1{gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-1\\.5{gap:calc(var(--tw-spacing) * 1.5)}.tw\\:gap-2{gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-2\\.5{gap:calc(var(--tw-spacing) * 2.5)}.tw\\:gap-3{gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-4{gap:calc(var(--tw-spacing) * 4)}.tw\\:gap-5{gap:calc(var(--tw-spacing) * 5)}.tw\\:gap-6{gap:calc(var(--tw-spacing) * 6)}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-x-2{column-gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-x-3{column-gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-x-4{column-gap:calc(var(--tw-spacing) * 4)}:where(.tw\\:space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-y-2{row-gap:calc(var(--tw-spacing) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-stretch{align-self:stretch}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-\\[10px\\]{border-top-left-radius:10px;border-top-right-radius:10px}.tw\\:rounded-l-\\[10px\\]{border-top-left-radius:10px;border-bottom-left-radius:10px}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-\\[10px\\]{border-top-right-radius:10px;border-bottom-right-radius:10px}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-\\[10px\\]{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive\\/50{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-destructive\\/50{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input{border-color:var(--input)}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/80{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/80{background-color:color-mix(in oklab, var(--tw-color-black) 80%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive{background-color:var(--destructive)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input{background-color:var(--input)}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:fill-current{fill:currentColor}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:\\!p-4{padding:calc(var(--tw-spacing) * 4)!important}.tw\\:p-0{padding:calc(var(--tw-spacing) * 0)}.tw\\:p-0\\.5{padding:calc(var(--tw-spacing) * .5)}.tw\\:p-1{padding:calc(var(--tw-spacing) * 1)}.tw\\:p-2{padding:calc(var(--tw-spacing) * 2)}.tw\\:p-3{padding:calc(var(--tw-spacing) * 3)}.tw\\:p-4{padding:calc(var(--tw-spacing) * 4)}.tw\\:p-6{padding:calc(var(--tw-spacing) * 6)}.tw\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(var(--tw-spacing) * 0)}.tw\\:px-1{padding-inline:calc(var(--tw-spacing) * 1)}.tw\\:px-2{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:px-2\\.5{padding-inline:calc(var(--tw-spacing) * 2.5)}.tw\\:px-3{padding-inline:calc(var(--tw-spacing) * 3)}.tw\\:px-4{padding-inline:calc(var(--tw-spacing) * 4)}.tw\\:px-5{padding-inline:calc(var(--tw-spacing) * 5)}.tw\\:px-6{padding-inline:calc(var(--tw-spacing) * 6)}.tw\\:px-8{padding-inline:calc(var(--tw-spacing) * 8)}.tw\\:py-0{padding-block:calc(var(--tw-spacing) * 0)}.tw\\:py-0\\.5{padding-block:calc(var(--tw-spacing) * .5)}.tw\\:py-1{padding-block:calc(var(--tw-spacing) * 1)}.tw\\:py-1\\.5{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:py-2{padding-block:calc(var(--tw-spacing) * 2)}.tw\\:py-3{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:py-4{padding-block:calc(var(--tw-spacing) * 4)}.tw\\:py-6{padding-block:calc(var(--tw-spacing) * 6)}.tw\\:py-8{padding-block:calc(var(--tw-spacing) * 8)}.tw\\:ps-4{padding-inline-start:calc(var(--tw-spacing) * 4)}.tw\\:ps-8{padding-inline-start:calc(var(--tw-spacing) * 8)}.tw\\:ps-9{padding-inline-start:calc(var(--tw-spacing) * 9)}.tw\\:ps-12{padding-inline-start:calc(var(--tw-spacing) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:pe-2{padding-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:pe-9{padding-inline-end:calc(var(--tw-spacing) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-0{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:pt-1{padding-top:calc(var(--tw-spacing) * 1)}.tw\\:pt-2{padding-top:calc(var(--tw-spacing) * 2)}.tw\\:pt-3{padding-top:calc(var(--tw-spacing) * 3)}.tw\\:pt-6{padding-top:calc(var(--tw-spacing) * 6)}.tw\\:\\!pr-10{padding-right:calc(var(--tw-spacing) * 10)!important}.tw\\:pr-0{padding-right:calc(var(--tw-spacing) * 0)}.tw\\:pr-2{padding-right:calc(var(--tw-spacing) * 2)}.tw\\:pr-3{padding-right:calc(var(--tw-spacing) * 3)}.tw\\:pr-4{padding-right:calc(var(--tw-spacing) * 4)}.tw\\:pb-0{padding-bottom:calc(var(--tw-spacing) * 0)}.tw\\:pb-2{padding-bottom:calc(var(--tw-spacing) * 2)}.tw\\:pb-3{padding-bottom:calc(var(--tw-spacing) * 3)}.tw\\:pb-4{padding-bottom:calc(var(--tw-spacing) * 4)}.tw\\:pb-8{padding-bottom:calc(var(--tw-spacing) * 8)}.tw\\:pb-16{padding-bottom:calc(var(--tw-spacing) * 16)}.tw\\:pb-24{padding-bottom:calc(var(--tw-spacing) * 24)}.tw\\:pl-2{padding-left:calc(var(--tw-spacing) * 2)}.tw\\:pl-3{padding-left:calc(var(--tw-spacing) * 3)}.tw\\:pl-4{padding-left:calc(var(--tw-spacing) * 4)}.tw\\:pl-5{padding-left:calc(var(--tw-spacing) * 5)}.tw\\:pl-6{padding-left:calc(var(--tw-spacing) * 6)}.tw\\:pl-8{padding-left:calc(var(--tw-spacing) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-70{opacity:.7}.tw\\:opacity-100{opacity:1}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opa\\]{transition-property:margin,opa;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:fade-in-0{--tw-enter-opacity:0}.tw\\:fade-in-80{--tw-enter-opacity:.8}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:zoom-in-95{--tw-enter-scale:.95}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--tw-spacing) * 8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(var(--tw-spacing) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!size-8:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--tw-spacing) * 8)!important;height:calc(var(--tw-spacing) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *),.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--tw-spacing) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-0:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-2:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(var(--tw-spacing) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-r:is(:where(.tw\\:group)[data-side=primary] *){border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-l:is(:where(.tw\\:group)[data-side=secondary] *){border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:border:is(:where(.tw\\:group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:border-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){border-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-70:is(:where(.tw\\:peer):disabled~*){opacity:.7}.tw\\:peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button)[data-active=true]~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(var(--tw-spacing) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(var(--tw-spacing) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(var(--tw-spacing) * 1)}.tw\\:peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:peer)[data-variant=inset]~*){min-height:calc(100svh - (calc(var(--tw-spacing) * 4)))}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(var(--tw-spacing) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(var(--tw-spacing) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(var(--tw-spacing) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--tw-spacing) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(var(--tw-spacing) * 0)}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(var(--tw-spacing) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(var(--tw-spacing) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.tw\\:first\\:mt-0:first-child{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/80:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/80:hover{background-color:color-mix(in oklab, var(--destructive) 80%, transparent)}}.tw\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/80:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/80:hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:bg-sidebar:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):hover{background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-ring:focus-visible{--tw-ring-color:var(--ring)}.tw\\:focus-visible\\:ring-sidebar-ring:focus-visible{--tw-ring-color:var(--sidebar-ring)}.tw\\:focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-background:focus-visible{--tw-ring-offset-color:var(--background)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}.tw\\:has-\\[\\[data-variant\\=inset\\]\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(var(--tw-spacing) * 2)}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(var(--tw-spacing) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true]{background-color:var(--sidebar-accent)}.tw\\:data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true]{color:var(--sidebar-accent-foreground)}.tw\\:data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.tw\\:data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[orientation\\=vertical\\]\\:h-auto[data-orientation=vertical]{height:auto}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical]{height:1px}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical]{width:100%}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical]{flex-direction:column}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after{content:var(--tw-content);height:calc(var(--tw-spacing) * 1)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after{content:var(--tw-content);width:100%}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.tw\\:data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked]{--tw-translate-x:calc(var(--tw-spacing) * 5);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-\\[-20px\\][data-state=checked]{--tw-translate-x:-20px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.tw\\:data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.tw\\:data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity:0}.tw\\:data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale:.95}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed]{--tw-exit-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed]{--tw-exit-translate-y:calc(48%*-1)}.tw\\:data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.tw\\:data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.tw\\:data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.tw\\:data-\\[state\\=open\\]\\:fade-in-0[data-state=open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open]{--tw-enter-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open]{--tw-enter-translate-y:calc(48%*-1)}@media (hover:hover){.tw\\:data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent[data-state=open]:hover{background-color:var(--sidebar-accent)}.tw\\:data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground[data-state=open]:hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}:where(.tw\\:sm\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:sm\\:rounded-lg{border-radius:var(--radius)}.tw\\:sm\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:sm\\:text-left{text-align:left}.tw\\:sm\\:text-start{text-align:start}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(var(--tw-spacing) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2:is(:where(.tw\\:peer)[data-state=collapsed]~*):is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 2)}}.tw\\:after\\:md\\:hidden:after{content:var(--tw-content)}@media (min-width:48rem){.tw\\:after\\:md\\:hidden:after{display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(var(--tw-spacing) * 2)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(var(--tw-spacing) * 2)}.tw\\:dark\\:border-destructive:is(.dark *){border-color:var(--destructive)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.tw\\:\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--tw-spacing) * 12)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:relative>:focus-visible{position:relative}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:z-10>:focus-visible{z-index:10}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-l-none>:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-l-0>:not(:first-child){border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-r-none>:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-r-md:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-top-right-radius:calc(var(--radius) * .8);border-bottom-right-radius:calc(var(--radius) * .8)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>img\\]\\:absolute>img{position:absolute}.tw\\:\\[\\&\\>img\\]\\:top-4>img{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:left-4>img{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:text-destructive>img{color:var(--destructive)}.tw\\:\\[\\&\\>img\\]\\:text-foreground>img{color:var(--foreground)}.tw\\:\\[\\&\\>img\\+div\\]\\:translate-y-\\[-3px\\]>img+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>img\\~\\*\\]\\:pl-7>img~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&\\>span\\]\\:line-clamp-1>span{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:\\[\\&\\>span\\]\\:flex-1>span{flex:1}.tw\\:\\[\\&\\>span\\]\\:text-start>span{text-align:start}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:absolute>svg{position:absolute}.tw\\:\\[\\&\\>svg\\]\\:top-4>svg{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:left-4>svg{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-destructive>svg{color:var(--destructive)}.tw\\:\\[\\&\\>svg\\]\\:text-foreground>svg{color:var(--foreground)}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div,.tw\\:\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--tw-spacing) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize,[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--tw-spacing) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}.light,:root{--radius:.625rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(98.21% 0 0);--foreground:oklch(24.35% 0 0);--muted:oklch(95.21% 0 0);--muted-foreground:oklch(50.32% 0 0);--popover:oklch(99.11% 0 0);--popover-foreground:oklch(24.35% 0 0);--card:oklch(99.11% 0 0);--card-foreground:oklch(24.35% 0 0);--border:oklch(88.22% 0 0);--input:oklch(88.22% 0 0);--primary:oklch(35.48% .0611 180.17);--primary-foreground:oklch(100% 0 0);--secondary:oklch(92% .065 74.36);--secondary-foreground:oklch(34.99% .0685 40.82);--accent:oklch(93.1% 0 0);--accent-foreground:oklch(24.35% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(43.41% .0392 41.96);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.81% 0 0);--sidebar-foreground:oklch(26.45% 0 0);--sidebar-primary:oklch(32.5% 0 0);--sidebar-primary-foreground:oklch(98.81% 0 0);--sidebar-accent:oklch(95.21% 0 0);--sidebar-accent-foreground:oklch(32.5% 0 0);--sidebar-border:oklch(94.01% 0 0);--sidebar-ring:oklch(77.31% 0 0)}.paratext-dark{--background:oklch(17.76% 0 0);--foreground:oklch(94.91% 0 0);--muted:oklch(25.2% 0 0);--muted-foreground:oklch(76.99% 0 0);--popover:oklch(21.34% 0 0);--popover-foreground:oklch(94.91% 0 0);--card:oklch(21.34% 0 0);--card-foreground:oklch(94.91% 0 0);--border:oklch(23.51% .0115 91.77);--input:oklch(40.17% 0 0);--primary:oklch(98.6% .0113 84.59);--primary-foreground:oklch(20.29% .024 200.24);--secondary:oklch(31.63% .019 63.68);--secondary-foreground:oklch(92.47% .0523 66.15);--accent:oklch(28.5% 0 0);--accent-foreground:oklch(94.91% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(92.47% .0523 66.15);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(21.03% .0059 285.82);--sidebar-foreground:oklch(96.74% .0014 285.04);--sidebar-primary:oklch(48.82% .2172 264.38);--sidebar-primary-foreground:oklch(100% 0 0);--sidebar-accent:oklch(27.39% .0055 285.94);--sidebar-accent-foreground:oklch(96.74% .0014 285.04);--sidebar-border:oklch(27.39% .0055 285.94);--sidebar-ring:oklch(87.11% .0055 285.98)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  uu as Alert,
  fu as AlertDescription,
  hu as AlertTitle,
  Kc as Avatar,
  qc as AvatarFallback,
  pp as AvatarImage,
  rp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  op as BOOK_SELECTOR_STRING_KEYS,
  Ze as Badge,
  ep as BookChapterControl,
  oo as BookSelectionMode,
  np as BookSelector,
  F as Button,
  ip as COMMENT_EDITOR_STRING_KEYS,
  sp as COMMENT_LIST_STRING_KEYS,
  Fc as Card,
  Bc as CardContent,
  wp as CardDescription,
  dp as CardFooter,
  lp as CardHeader,
  cp as CardTitle,
  ml as ChapterRangeSelector,
  Oa as Checkbox,
  wu as Checklist,
  ro as ComboBox,
  ue as Command,
  Tr as CommandEmpty,
  te as CommandGroup,
  rr as CommandInput,
  ee as CommandItem,
  he as CommandList,
  ap as CommentEditor,
  hp as CommentList,
  mu as ContextMenu,
  Eu as ContextMenuCheckboxItem,
  _u as ContextMenuContent,
  bu as ContextMenuGroup,
  Cu as ContextMenuItem,
  Su as ContextMenuLabel,
  vu as ContextMenuPortal,
  yu as ContextMenuRadioGroup,
  Tu as ContextMenuRadioItem,
  Ru as ContextMenuSeparator,
  Du as ContextMenuShortcut,
  xu as ContextMenuSub,
  Nu as ContextMenuSubContent,
  ku as ContextMenuSubTrigger,
  gu as ContextMenuTrigger,
  lw as DataTable,
  el as Dialog,
  Jd as DialogClose,
  nl as DialogContent,
  Qd as DialogDescription,
  Zd as DialogFooter,
  al as DialogHeader,
  ol as DialogOverlay,
  rl as DialogPortal,
  il as DialogTitle,
  Xd as DialogTrigger,
  Mu as Drawer,
  Iu as DrawerClose,
  Au as DrawerContent,
  Vu as DrawerDescription,
  Pu as DrawerFooter,
  $u as DrawerHeader,
  yd as DrawerOverlay,
  xd as DrawerPortal,
  Lu as DrawerTitle,
  Ou as DrawerTrigger,
  ce as DropdownMenu,
  le as DropdownMenuCheckboxItem,
  we as DropdownMenuContent,
  Da as DropdownMenuGroup,
  so as DropdownMenuItem,
  dw as DropdownMenuItemType,
  Rr as DropdownMenuLabel,
  Uc as DropdownMenuPortal,
  Hc as DropdownMenuRadioGroup,
  Xc as DropdownMenuRadioItem,
  or as DropdownMenuSeparator,
  up as DropdownMenuShortcut,
  Gc as DropdownMenuSub,
  Yc as DropdownMenuSubContent,
  Wc as DropdownMenuSubTrigger,
  ke as DropdownMenuTrigger,
  cw as ERROR_DUMP_STRING_KEYS,
  xp as ERROR_POPOVER_STRING_KEYS,
  mw as EditorKeyboardShortcuts,
  ww as ErrorDump,
  yp as ErrorPopover,
  Tp as FOOTNOTE_EDITOR_STRING_KEYS,
  Cp as Filter,
  kp as FilterDropdown,
  _p as Footer,
  Ep as FootnoteEditor,
  Mw as FootnoteItem,
  Sp as FootnoteList,
  $p as INVENTORY_STRING_KEYS,
  nr as Input,
  Pp as Inventory,
  ut as Label,
  kw as MARKER_MENU_STRING_KEYS,
  vp as MarkdownRenderer,
  _w as MarkerMenu,
  Np as MoreInfo,
  uw as MultiSelectComboBox,
  iu as NavigationContentSearch,
  re as Popover,
  cl as PopoverAnchor,
  oe as PopoverContent,
  fe as PopoverTrigger,
  zu as Progress,
  oa as RadioGroup,
  eo as RadioGroupItem,
  wl as RecentSearches,
  Bu as ResizableHandle,
  Fu as ResizablePanel,
  ju as ResizablePanelGroup,
  du as ResultsCard,
  Zp as SCOPE_SELECTOR_STRING_KEYS,
  Qp as ScopeSelector,
  Jp as ScriptureResultsViewer,
  tu as ScrollGroupSelector,
  Io as SearchBar,
  Ae as Select,
  Le as SelectContent,
  Qc as SelectGroup,
  At as SelectItem,
  fp as SelectLabel,
  rw as SelectScrollDownButton,
  ew as SelectScrollUpButton,
  mp as SelectSeparator,
  Pe as SelectTrigger,
  $e as SelectValue,
  Qe as Separator,
  eu as SettingsList,
  ou as SettingsListHeader,
  ru as SettingsListItem,
  Yw as SettingsSidebar,
  Xp as SettingsSidebarContentSearch,
  Bw as Sidebar,
  qw as SidebarContent,
  Fp as SidebarFooter,
  gn as SidebarGroup,
  Kp as SidebarGroupAction,
  vn as SidebarGroupContent,
  bn as SidebarGroupLabel,
  jp as SidebarHeader,
  zp as SidebarInput,
  Kw as SidebarInset,
  Uw as SidebarMenu,
  qp as SidebarMenuAction,
  Up as SidebarMenuBadge,
  Ww as SidebarMenuButton,
  Gw as SidebarMenuItem,
  Gp as SidebarMenuSkeleton,
  Hp as SidebarMenuSub,
  Yp as SidebarMenuSubButton,
  Wp as SidebarMenuSubItem,
  Fw as SidebarProvider,
  Vp as SidebarRail,
  Bp as SidebarSeparator,
  Lp as SidebarTrigger,
  lo as Skeleton,
  qu as Slider,
  Ku as Sonner,
  bd as Spinner,
  Uu as Switch,
  co as TabDropdownMenu,
  au as TabFloatingMenu,
  nu as TabToolbar,
  Ro as Table,
  Mo as TableBody,
  bp as TableCaption,
  Me as TableCell,
  gp as TableFooter,
  Nr as TableHead,
  Do as TableHeader,
  se as TableRow,
  Gu as Tabs,
  Yu as TabsContent,
  Hu as TabsList,
  Wu as TabsTrigger,
  pu as TextField,
  Xu as Textarea,
  _a as ToggleGroup,
  hr as ToggleGroupItem,
  lu as Toolbar,
  Nt as Tooltip,
  _t as TooltipContent,
  kt as TooltipProvider,
  St as TooltipTrigger,
  hw as UNDO_REDO_BUTTONS_STRING_KEYS,
  cu as UiLanguageSelector,
  fw as UndoRedoButtons,
  za as VerticalTabs,
  Fa as VerticalTabsContent,
  ja as VerticalTabsList,
  ad as VerticalTabsTrigger,
  Be as Z_INDEX_ABOVE_DOCK,
  Jn as Z_INDEX_FOOTNOTE_EDITOR,
  Qs as Z_INDEX_MODAL,
  Zs as Z_INDEX_MODAL_BACKDROP,
  Js as Z_INDEX_OVERLAY,
  jc as badgeVariants,
  ra as buttonVariants,
  m as cn,
  Ap as getBookIdFromUSFM,
  Dr as getInventoryHeader,
  Op as getLinesFromUSFM,
  Ip as getNumberFromUSFM,
  Pw as getStatusForItem,
  su as getToolbarOSReservedSpaceClassName,
  Dp as inventoryCountColumn,
  Rp as inventoryItemColumn,
  Mp as inventoryStatusColumn,
  tw as selectTriggerVariants,
  rh as sonner,
  Ju as useEvent,
  Zu as useEventAsync,
  zc as useListbox,
  Nd as usePromise,
  tp as useRecentSearches,
  Mr as useSidebar,
  Qu as useStylesheet
};
//# sourceMappingURL=index.js.map
