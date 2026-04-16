var Ya = Object.defineProperty;
var Xa = (t, e, r) => e in t ? Ya(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var bt = (t, e, r) => Xa(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as p, jsx as o, Fragment as st } from "react/jsx-runtime";
import { Command as Te } from "cmdk";
import { X as Be, Search as En, Check as Ut, Clock as zo, ChevronsLeft as Fo, ChevronsRight as Bo, ChevronLeft as Xr, ChevronRight as Pe, ArrowLeft as Ja, ArrowRight as Za, Circle as fo, ChevronDown as Ke, BoldIcon as Qa, ItalicIcon as ti, AtSign as Tn, Pencil as ei, Trash2 as ri, ArrowUp as Sn, MoreHorizontal as oi, MailOpen as ni, Mail as ai, ChevronUp as Rn, FilterIcon as ii, ArrowLeftIcon as si, ChevronLeftIcon as li, ChevronRightIcon as ci, ArrowRightIcon as wi, Copy as Dn, Filter as di, User as pi, Link as ui, CircleHelp as hi, ChevronsUpDown as Mn, Star as fi, Undo as mi, Redo as gi, SquareX as On, FunctionSquare as In, SquareSigma as An, Ban as bi, AlertCircle as Jr, CircleCheckIcon as vi, CircleXIcon as xi, CircleHelpIcon as yi, ArrowUpIcon as ki, ArrowDownIcon as _i, PanelLeft as Ni, PanelRight as Ci, ScrollText as Ei, MenuIcon as Ti, Menu as Si, EllipsisVertical as Ri, MoreVertical as Ko, LoaderCircle as Di, GripVertical as Mi } from "lucide-react";
import { clsx as Oi } from "clsx";
import { twMerge as Ii } from "tailwind-merge";
import * as Jt from "@radix-ui/react-dialog";
import { Canon as lt } from "@sillsdev/scripture";
import { includes as cr, Section as W, getChaptersForBook as Ai, formatScrRef as Ne, getSectionForBook as Je, formatRelativeDate as $i, formatReplacementString as _e, sanitizeHtml as Pi, NumberFormat as Li, formatBytes as Vi, getCurrentLocale as ji, usfmMarkers as mr, getFormatCallerFunction as zi, deepEqual as Fi, isString as qo, compareScrRefs as Zr, scrRefToBBBCCCVVV as Pr, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import et, { forwardRef as ar, useRef as G, useMemo as j, useState as R, useCallback as F, useLayoutEffect as It, createContext as Rr, useContext as mo, useEffect as H, Component as Bi, createElement as Uo, Suspense as Ki, Fragment as $n } from "react";
import { Slot as qe } from "@radix-ui/react-slot";
import { cva as he } from "class-variance-authority";
import * as tr from "@radix-ui/react-popover";
import * as qi from "@radix-ui/react-label";
import * as Qr from "@radix-ui/react-radio-group";
import { createEditor as Pn, $getRoot as Zt, $createParagraphNode as Ue, $getSelection as Ct, HISTORY_MERGE_TAG as go, ParagraphNode as Ln, TextNode as Vn, $isTokenOrSegmented as Ui, $getCharacterOffsets as Gi, $cloneWithPropertiesEphemeral as Hi, $getPreviousSelection as Wi, $isRangeSelection as Bt, $caretFromPoint as Yi, $getSiblingCaret as jn, $getChildCaret as Xi, $getAdjacentChildCaret as Ji, $isChildCaret as Zi, $normalizeCaret as Qi, $setSelectionFromCaretRange as ts, $getCollapsedCaretRange as es, $getCaretInDirection as Go, $splitAtPointCaretNext as rs, $isTextPointCaret as os, $findMatchingParent as zn, $isElementNode as Yt, mergeRegister as Qt, getDOMTextNode as ns, isHTMLElement as Fn, CLEAR_EDITOR_COMMAND as Bn, COMMAND_PRIORITY_EDITOR as bo, shallowMergeConfig as as, defineExtension as At, safeCast as Se, createState as is, FORMAT_TEXT_COMMAND as Kn, $isNodeSelection as qn, COMMAND_PRIORITY_LOW as Un, RootNode as ss, LineBreakNode as ls, TabNode as cs, $isEditorState as ws, createCommand as ds, CLICK_COMMAND as ps, isDOMNode as us, $getNodeFromDOMNode as hs, $createNodeSelection as fs, $setSelection as ms, $getEditor as gs, DecoratorNode as to, $getState as bs, toggleTextFormatType as Ho, TEXT_TYPE_TO_FORMAT as vs, $setState as xs, addClassNamesToElement as Gn, $create as ys, $getNodeByKey as ks, removeClassNamesFromElement as _s, KEY_TAB_COMMAND as Ns, $isBlockElementNode as xr, $createRangeSelection as Cs, $normalizeSelection__EXPERIMENTAL as Es, OUTDENT_CONTENT_COMMAND as Ts, INDENT_CONTENT_COMMAND as Wo, INSERT_TAB_COMMAND as Ss, COMMAND_PRIORITY_CRITICAL as vo, $isDecoratorNode as Rs, $isParagraphNode as Ds, $isTextNode as yr, SELECTION_CHANGE_COMMAND as Hn, getRegisteredNode as Ms, isDocumentFragment as Yo, isDOMDocumentNode as Os, ArtificialNode__DO_NOT_USE as Wn, $createLineBreakNode as Yn, $isRootOrShadowRoot as Is, isBlockDomNode as Xo, isInlineDomNode as Jo, $insertNodes as As } from "lexical";
import * as Dr from "@radix-ui/react-tooltip";
import { TooltipTrigger as $s } from "@radix-ui/react-tooltip";
import { HeadingNode as Ps, QuoteNode as Ls, registerRichText as Vs } from "@lexical/rich-text";
import { flushSync as js, createPortal as zs } from "react-dom";
import { $isTableSelection as Fs } from "@lexical/table";
import * as Xn from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as Jn } from "@lexical/headless";
import * as Bs from "@radix-ui/react-separator";
import * as xo from "@radix-ui/react-avatar";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ks } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Zn, getFilteredRowModel as qs, getSortedRowModel as Qn, getPaginationRowModel as Us, getCoreRowModel as ta, flexRender as Ze, getGroupedRowModel as Gs, getExpandedRowModel as Hs } from "@tanstack/react-table";
import * as xt from "@radix-ui/react-select";
import Ws from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as eo, HIDDEN_NOTE_CALLER as ro, getDefaultViewOptions as Ys, isInsertEmbedOpOfType as wr, Editorial as Xs } from "@eten-tech-foundation/platform-editor";
import * as Zo from "@radix-ui/react-checkbox";
import * as Lt from "@radix-ui/react-tabs";
import * as Kt from "@radix-ui/react-menubar";
import { useHotkeys as Js } from "react-hotkeys-hook";
import * as ft from "@radix-ui/react-context-menu";
import { Drawer as fe } from "vaul";
import * as Qo from "@radix-ui/react-progress";
import * as yo from "react-resizable-panels";
import { Toaster as Zs } from "sonner";
import { toast as ih } from "sonner";
import * as dr from "@radix-ui/react-slider";
import * as tn from "@radix-ui/react-switch";
function oo(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? n += 1 : i === "]" && (n -= 1), i === ":" && n === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function Qs(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = oo(t), r = e.findIndex((i) => i.startsWith("-tw-"));
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
function tl(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = oo(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], i = oo(e), s = i.some((c) => c.startsWith("-tw-")), l = i.some((c) => c.startsWith("!tw-"));
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
  const e = Oi(t);
  if (!e) return e;
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((c) => {
    const w = Qs(c);
    n.set(w.normalized, w.original), a.push(w.normalized);
  }), Ii(a.join(" ")).split(" ").filter(Boolean).map((c) => {
    const w = n.get(c);
    return w ? tl(c, w) : c;
  }).join(" ");
}
const Ge = 250, ea = 300, el = 400, rl = 450, ol = 500, nl = "layoutDirection";
function ct() {
  const t = localStorage.getItem(nl);
  return t === "rtl" ? t : "ltr";
}
const al = Jt.Root, tp = Jt.Trigger, il = Jt.Portal, ep = Jt.Close;
function sl({
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
      style: { zIndex: rl, ...e },
      ...n
    }
  );
}
function ll({
  className: t,
  children: e,
  overlayClassName: r,
  style: n,
  ref: a,
  ...i
}) {
  const s = ct();
  return /* @__PURE__ */ p(il, { children: [
    /* @__PURE__ */ o(sl, { className: r }),
    /* @__PURE__ */ p(
      Jt.Content,
      {
        ref: a,
        className: m(
          // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        style: { zIndex: ol, ...n },
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
                /* @__PURE__ */ o(Be, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function cl({ className: t, ...e }) {
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
function rp({ className: t, ...e }) {
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
function wl({
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
function op({
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
function me({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Te,
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
function ir({
  className: t,
  ref: e,
  ...r
}) {
  const n = ct();
  return /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: n, children: [
    /* @__PURE__ */ o(En, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ o(
      Te.Input,
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
function ge({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Te.List,
    {
      ref: e,
      className: m("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...r
    }
  );
}
function Mr({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o(Te.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function te({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Te.Group,
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
function ra({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Te.Separator,
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
    Te.Item,
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
function dl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const oa = (t, e, r, n, a) => {
  switch (t) {
    case W.OT:
      return e ?? "Old Testament";
    case W.NT:
      return r ?? "New Testament";
    case W.DC:
      return n ?? "Deuterocanon";
    case W.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, pl = (t, e, r, n, a) => {
  switch (t) {
    case W.OT:
      return e ?? "OT";
    case W.NT:
      return r ?? "NT";
    case W.DC:
      return n ?? "DC";
    case W.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ie(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? lt.bookIdToEnglishName(t);
}
function ko(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const na = lt.allBookIds.filter(
  (t) => !lt.isObsolete(lt.bookIdToNumber(t))
), Ce = Object.fromEntries(
  na.map((t) => [t, lt.bookIdToEnglishName(t)])
);
function _o(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = lt.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(cr(a.toLowerCase(), n) || cr(t.toLowerCase(), n) || (i ? cr(i.localizedName.toLowerCase(), n) || cr(i.localizedId.toLowerCase(), n) : !1));
}
const aa = ar(
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
    }, f = (x) => {
      d.current = !0, n ? n(x) : r == null || r(t);
    }, u = j(
      () => Ie(t, l),
      [t, l]
    ), g = j(
      () => ko(t, l),
      [t, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": a === W.OT,
            "tw:border-s-purple-200": a === W.NT,
            "tw:border-s-indigo-200": a === W.DC,
            "tw:border-s-amber-200": a === W.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          ee,
          {
            ref: w,
            value: c || `${t} ${lt.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${lt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ o(
                Ut,
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
), ia = he(
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
function z({
  className: t,
  variant: e,
  size: r,
  asChild: n = !1,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(n ? qe : "button", { className: m(ia({ variant: e, size: r, className: t })), ref: a, ...i });
}
const re = tr.Root, be = tr.Trigger, ul = tr.Anchor;
function oe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  style: n,
  ref: a,
  ...i
}) {
  const s = ct();
  return /* @__PURE__ */ o(tr.Portal, { children: /* @__PURE__ */ o(
    tr.Content,
    {
      ref: a,
      align: e,
      sideOffset: r,
      className: m(
        // CUSTOM removed tw:z-50 to use const below
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-hidden tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Ge, ...n },
      ...i,
      dir: s
    }
  ) });
}
function no(t, e, r) {
  return `${t} ${Ce[t]}${e ? ` ${ko(t, e)} ${Ie(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
function hl({
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
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
      z,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ o(zo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ o(oe, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ o(me, { children: /* @__PURE__ */ o(ge, { children: /* @__PURE__ */ o(te, { heading: i, children: t.map((u) => /* @__PURE__ */ p(
      ee,
      {
        onSelect: () => f(u),
        className: m("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ o(zo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ o("span", { children: r(u) })
        ]
      },
      n(u)
    )) }) }) }) })
  ] });
}
function np(t, e, r = (a, i) => a === i, n = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !r(l, a)
    ), s = [a, ...i.slice(0, n - 1)];
    e(s);
  };
}
const Lr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, fl = [
  Lr.BOOK_ONLY,
  Lr.BOOK_CHAPTER,
  Lr.BOOK_CHAPTER_VERSE
];
function en(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function Ft(t) {
  return Ai(lt.bookIdToNumber(t));
}
function ml(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const n = fl.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let d;
        const h = e.filter((f) => _o(f, l, r));
        if (h.length === 1 && ([d] = h), !d && c) {
          if (lt.isBookIdValid(l)) {
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
          const u = ((g) => Object.keys(Ce).find(
            (x) => Ce[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && r) {
            const g = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = c ? parseInt(c, 10) : void 0;
          f && f > Ft(d) && (f = Math.max(Ft(d), 1));
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
function gl(t, e, r, n) {
  const a = F(() => {
    if (t.chapterNum > 1)
      n({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const w = e[c - 1], d = Math.max(Ft(w), 1);
        n({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, n]), i = F(() => {
    const c = Ft(t.book);
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
  }, [t, e, n]), s = F(() => {
    n({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, n]), l = F(() => {
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
      icon: r === "ltr" ? Fo : Bo
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Xr : Pe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? Pe : Xr
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Ft(t.book) || Ft(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? Bo : Fo
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
function rn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: n,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ o(te, { children: /* @__PURE__ */ o("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", i), children: Array.from({ length: Ft(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ o(
      ee,
      {
        value: `${t} ${Ce[t] || ""} ${s}`,
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
function ap({
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
  const w = ct(), [d, h] = R(!1), [f, u] = R(""), [g, x] = R(""), [b, N] = R("books"), [v, _] = R(void 0), [k, $] = R(!1), V = G(void 0), I = G(void 0), C = G(void 0), S = G(void 0), T = G({}), A = F(
    (M) => {
      e(M), l && l(M);
    },
    [e, l]
  ), O = j(() => n ? n() : na, [n]), U = j(() => ({
    [W.OT]: O.filter((E) => lt.isBookOT(E)),
    [W.NT]: O.filter((E) => lt.isBookNT(E)),
    [W.DC]: O.filter((E) => lt.isBookDC(E)),
    [W.Extra]: O.filter((E) => lt.extraBooks().includes(E))
  }), [O]), L = j(() => Object.values(U).flat(), [U]), Y = j(() => {
    if (!g.trim()) return U;
    const M = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return [W.OT, W.NT, W.DC, W.Extra].forEach((P) => {
      M[P] = U[P].filter((X) => _o(X, g, a));
    }), M;
  }, [U, g, a]), y = j(
    () => ml(g, L, a),
    [g, L, a]
  ), K = F(() => {
    y && (A({
      book: y.book,
      chapterNum: y.chapterNum ?? 1,
      verseNum: y.verseNum ?? 1
    }), h(!1), x(""), u(""));
  }, [A, y]), wt = F(
    (M) => {
      if (Ft(M) <= 1) {
        A({
          book: M,
          chapterNum: 1,
          verseNum: 1
        }), h(!1), x("");
        return;
      }
      _(M), N("chapters");
    },
    [A]
  ), mt = F(
    (M) => {
      const E = b === "chapters" ? v : y == null ? void 0 : y.book;
      E && (A({
        book: E,
        chapterNum: M,
        verseNum: 1
      }), h(!1), N("books"), _(void 0), x(""));
    },
    [A, b, v, y]
  ), Et = F(
    (M) => {
      A(M), h(!1), x("");
    },
    [A]
  ), pt = gl(t, L, w, e), kt = F(() => {
    N("books"), _(void 0), setTimeout(() => {
      I.current && I.current.focus();
    }, 0);
  }, []), B = F(
    (M) => {
      if (!M && b === "chapters") {
        kt();
        return;
      }
      h(M), M && (N("books"), _(void 0), x(""));
    },
    [b, kt]
  ), { otLong: it, ntLong: J, dcLong: dt, extraLong: gt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ae = F(
    (M) => oa(M, it, J, dt, gt),
    [it, J, dt, gt]
  ), ie = F(
    (M) => y ? !!y.chapterNum && !M.toString().includes(y.chapterNum.toString()) : !1,
    [y]
  ), De = j(
    () => Ne(
      t,
      a ? Ie(t.book, a) : "English"
    ),
    [t, a]
  ), se = F((M) => (E) => {
    T.current[M] = E;
  }, []), Tt = F((M) => {
    (M.key === "Home" || M.key === "End") && M.stopPropagation();
  }, []), $t = F(
    (M) => {
      if (M.ctrlKey) return;
      const { isLetter: E, isDigit: P } = en(M.key);
      if (b === "chapters") {
        if (M.key === "Backspace") {
          M.preventDefault(), M.stopPropagation(), kt();
          return;
        }
        if (E || P) {
          if (M.preventDefault(), M.stopPropagation(), N("books"), _(void 0), P && v) {
            const X = Ce[v];
            x(`${X} ${M.key}`);
          } else
            x(M.key);
          setTimeout(() => {
            I.current && I.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && y) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(M.key)) {
        const X = b === "chapters" ? v : y == null ? void 0 : y.book;
        if (!X) return;
        const q = (() => {
          if (!f) return 1;
          const at = f.match(/(\d+)$/);
          return at ? parseInt(at[1], 10) : 0;
        })(), nt = Ft(X);
        if (!nt) return;
        let tt = q;
        const ot = 6;
        switch (M.key) {
          case "ArrowLeft":
            q !== 0 && (tt = q > 1 ? q - 1 : nt);
            break;
          case "ArrowRight":
            q !== 0 && (tt = q < nt ? q + 1 : 1);
            break;
          case "ArrowUp":
            tt = q === 0 ? nt : Math.max(1, q - ot);
            break;
          case "ArrowDown":
            tt = q === 0 ? 1 : Math.min(nt, q + ot);
            break;
          default:
            return;
        }
        tt !== q && (M.preventDefault(), M.stopPropagation(), u(no(X, a, tt)), setTimeout(() => {
          const at = T.current[tt];
          at && at.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      y,
      kt,
      v,
      f,
      a
    ]
  ), Ht = F((M) => {
    if (M.shiftKey || M.key === "Tab" || M.key === " ") return;
    const { isLetter: E, isDigit: P } = en(M.key);
    (E || P) && (M.preventDefault(), x((X) => X + M.key), I.current.focus(), $(!1));
  }, []);
  return It(() => {
    const M = setTimeout(() => {
      if (d && b === "books" && C.current && S.current) {
        const E = C.current, P = S.current, X = P.offsetTop, q = E.clientHeight, nt = P.clientHeight, tt = X - q / 2 + nt / 2;
        E.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), u(no(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(M);
    };
  }, [d, b, g, y, t.book]), It(() => {
    if (b === "chapters" && v) {
      const M = v === t.book;
      setTimeout(() => {
        if (C.current)
          if (M) {
            const E = T.current[t.chapterNum];
            E && E.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            C.current.scrollTo({ top: 0 });
        V.current && V.current.focus();
      }, 0);
    }
  }, [b, v, y, t.book, t.chapterNum]), /* @__PURE__ */ p(re, { open: d, onOpenChange: B, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ o("span", { className: "tw:truncate", children: De })
      }
    ) }),
    /* @__PURE__ */ o(oe, { id: c, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ p(
      me,
      {
        ref: V,
        onKeyDown: $t,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ o(
                ir,
                {
                  ref: I,
                  value: g,
                  onValueChange: x,
                  onKeyDown: Tt,
                  onFocus: () => $(!1),
                  className: s && s.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ o(
                hl,
                {
                  recentSearches: s,
                  onSearchItemSelect: Et,
                  renderItem: (M) => Ne(M, "English"),
                  getItemKey: (M) => `${M.book}-${M.chapterNum}-${M.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: pt.map(({ onClick: M, disabled: E, title: P, icon: X }) => /* @__PURE__ */ o(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  $(!0), M();
                },
                disabled: E,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: P,
                onKeyDown: Ht,
                children: /* @__PURE__ */ o(X, {})
              },
              P
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ o(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: kt,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ o(Ja, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ o(Za, { className: "tw:h-4 tw:w-4" })
              }
            ),
            v && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ie(v, a) })
          ] }),
          !k && /* @__PURE__ */ p(ge, { ref: C, children: [
            b === "books" && /* @__PURE__ */ p(st, { children: [
              !y && Object.entries(Y).map(([M, E]) => {
                if (E.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(te, { heading: ae(M), children: E.map((P) => /* @__PURE__ */ o(
                      aa,
                      {
                        bookId: P,
                        onSelect: (X) => wt(X),
                        section: Je(P),
                        commandValue: `${P} ${Ce[P]}`,
                        ref: P === t.book ? S : void 0,
                        localizedBookNames: a
                      },
                      P
                    )) }, M)
                  );
              }),
              y && /* @__PURE__ */ o(te, { children: /* @__PURE__ */ o(
                ee,
                {
                  value: `${y.book} ${Ce[y.book]} ${y.chapterNum || ""}:${y.verseNum || ""})}`,
                  onSelect: K,
                  className: "tw:font-semibold tw:text-primary",
                  children: Ne(
                    {
                      book: y.book,
                      chapterNum: y.chapterNum ?? 1,
                      verseNum: y.verseNum ?? 1
                    },
                    a ? ko(y.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              y && Ft(y.book) > 1 && /* @__PURE__ */ p(st, { children: [
                /* @__PURE__ */ o("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: Ie(y.book, a) }),
                /* @__PURE__ */ o(
                  rn,
                  {
                    bookId: y.book,
                    scrRef: t,
                    onChapterSelect: mt,
                    setChapterRef: se,
                    isChapterDimmed: ie,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && v && /* @__PURE__ */ o(
              rn,
              {
                bookId: v,
                scrRef: t,
                onChapterSelect: mt,
                setChapterRef: se,
                className: "tw:p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const ip = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), bl = he(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function ut({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    qi.Root,
    {
      ref: e,
      className: m("pr-twp", bl(), t),
      ...r
    }
  );
}
function sa({
  className: t,
  ref: e,
  ...r
}) {
  const n = ct();
  return /* @__PURE__ */ o(
    Qr.Root,
    {
      className: m("pr-twp tw:grid tw:gap-2", t),
      ...r,
      ref: e,
      dir: n
    }
  );
}
function ao({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Qr.Item,
    {
      ref: e,
      className: m(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:ring-offset-background tw:focus:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Qr.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ o(fo, { className: "tw:h-2.5 tw:w-2.5 tw:fill-current tw:text-current" }) })
    }
  );
}
function vl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function io({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: n,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = vl,
  getButtonLabel: w,
  icon: d = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: b = !1,
  ariaLabel: N,
  ...v
}) {
  const [_, k] = R(!1), $ = w ?? c, V = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], I = (C, S) => {
    const T = c(C), A = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, O = `${S ?? ""}${T}${A ?? ""}`;
    return /* @__PURE__ */ p(
      ee,
      {
        value: T,
        onSelect: () => {
          l(C), k(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ o(
            Ut,
            {
              className: m("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || c(s) !== T
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            T,
            A && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              A
            ] })
          ] })
        ]
      },
      O
    );
  };
  return /* @__PURE__ */ p(re, { open: _, onOpenChange: k, ...v, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ p(
      z,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": N,
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
                children: s ? $(s) : h
              }
            )
          ] }),
          /* @__PURE__ */ o(Ke, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      oe,
      {
        align: x,
        className: m("tw:w-[200px] tw:p-0", a),
        style: i,
        children: /* @__PURE__ */ p(me, { children: [
          /* @__PURE__ */ o(ir, { placeholder: f, className: "tw:text-inherit" }),
          /* @__PURE__ */ o(Mr, { children: u }),
          /* @__PURE__ */ o(ge, { children: V(e) ? e.map((C) => /* @__PURE__ */ o(te, { heading: C.groupHeading, children: C.options.map((S) => I(S, C.groupHeading)) }, C.groupHeading)) : e.map((C) => I(C)) })
        ] })
      }
    )
  ] });
}
function xl({
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
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ o(ut, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      io,
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
      io,
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
var so = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(so || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(so || (so = {}));
const sp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Vr = (t, e) => t[e] ?? e;
function lp({
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
  const d = Vr(w, "%webView_bookSelector_currentBook%"), h = Vr(w, "%webView_bookSelector_choose%"), f = Vr(w, "%webView_bookSelector_chooseBooks%"), [u, g] = R(
    "current book"
    /* CurrentBook */
  ), x = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ o(
    sa,
    {
      className: "pr-twp tw:flex",
      value: u,
      onValueChange: (b) => x(b),
      children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(ao, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ o(ut, { className: "tw:ms-1", children: d })
          ] }),
          /* @__PURE__ */ o(ut, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ o(
            xl,
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
            /* @__PURE__ */ o(ao, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ o(ut, { className: "tw:ms-1", children: f })
          ] }),
          /* @__PURE__ */ o(ut, { className: "tw:flex tw:items-center", children: n.map((b) => lt.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ o(
            z,
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
const la = Rr(null);
function yl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Gt() {
  const t = mo(la);
  return t == null && function(e, ...r) {
    const n = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of r) a.append("v", i);
    throw n.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ca = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, kl = ca ? It : H, pr = { tag: go };
function _l({ initialConfig: t, children: e }) {
  const r = j(() => {
    const { theme: n, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = yl(null, n), d = Pn({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (h) => s(h, d), theme: n });
    return function(h, f) {
      if (f !== null) {
        if (f === void 0) h.update(() => {
          const u = Zt();
          if (u.isEmpty()) {
            const g = Ue();
            u.append(g);
            const x = ca ? document.activeElement : null;
            (Ct() !== null || x !== null && x === h.getRootElement()) && g.select();
          }
        }, pr);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = h.parseEditorState(f);
            h.setEditorState(u, pr);
            break;
          }
          case "object":
            h.setEditorState(f, pr);
            break;
          case "function":
            h.update(() => {
              Zt().isEmpty() && f(h);
            }, pr);
        }
      }
    }(d, l), [d, w];
  }, []);
  return kl(() => {
    const n = t.editable, [a] = r;
    a.setEditable(n === void 0 || n);
  }, []), o(la.Provider, { value: r, children: e });
}
const Nl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : H;
function Cl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [n] = Gt();
  return Nl(() => {
    if (r) return n.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(go) || l.isEmpty() || r(a, n, c);
    });
  }, [n, t, e, r]), null;
}
const No = {
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
}, yt = Dr.Provider, _t = Dr.Root;
function Rt({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    Dr.Trigger,
    {
      ref: r,
      className: e ? m(ia({ variant: e }), t) : t,
      ...n
    }
  );
}
function Nt({
  className: t,
  sideOffset: e = 4,
  style: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Dr.Content,
    {
      ref: n,
      sideOffset: e,
      style: { zIndex: Ge, ...r },
      className: m(
        "pr-twp tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:px-3 tw:py-1.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a
    }
  );
}
const Co = [
  Ps,
  Ln,
  Vn,
  Ls
], El = Rr(null), jr = {
  didCatch: !1,
  error: null
};
class Tl extends Bi {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = jr;
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
      }), this.setState(jr);
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
    if (n && r.error !== null && Sl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(jr);
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
        l = Uo(n, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Uo(El.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Sl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, n) => !Object.is(r, e[n]));
}
function Rl({ children: t, onError: e }) {
  return o(Tl, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : H;
function Ml(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Ol() {
  return function(t) {
    const [e] = Gt(), r = j(() => t(e), [e, t]), [n, a] = R(() => r.initialValueFn()), i = G(n);
    return Dl(() => {
      const { initialValueFn: s, subscribe: l } = r, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [r, t]), n;
  }(Ml);
}
function Il(t, e) {
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
function Al(t, e, r = "self") {
  const n = t.getStartEndPoints();
  if (e.isSelected(t) && !Ui(e) && n !== null) {
    const [a, i] = n, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), d = e.is(c);
    if (w || d) {
      const [h, f] = Gi(t), u = l.is(c), g = e.is(s ? c : l), x = e.is(s ? l : c);
      let b, N = 0;
      u ? (N = h > f ? f : h, b = h > f ? h : f) : g ? (N = s ? f : h, b = void 0) : x && (N = 0, b = s ? h : f);
      const v = e.__text.slice(N, b);
      v !== e.__text && (r === "clone" && (e = Hi(e)), e.__text = v);
    }
  }
  return e;
}
function kr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const wa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, $l = wa && "documentMode" in document ? document.documentMode : null;
!(!wa || !("InputEvent" in window) || $l) && "getTargetRanges" in new window.InputEvent("input");
function zt(t) {
  return `${t}px`;
}
const Pl = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Ll(t, e, r) {
  let n = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function c() {
    n === null && kr(182), a === null && kr(183);
    const { left: h, top: f } = a.getBoundingClientRect(), u = Il(t, e);
    var g, x;
    l.isConnected || (x = l, (g = a).insertBefore(x, g.firstChild));
    let b = !1;
    for (let N = 0; N < u.length; N++) {
      const v = u[N], _ = s[N] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const $ = zt(v.left - h);
      k.left !== $ && (k.left = $, b = !0);
      const V = zt(v.top - f);
      k.top !== V && (_.style.top = V, b = !0);
      const I = zt(v.width);
      k.width !== I && (_.style.width = I, b = !0);
      const C = zt(v.height);
      k.height !== C && (_.style.height = C, b = !0), _.parentNode !== l && (l.append(_), b = !0), s[N] = _;
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
    if (!Fn(u)) return w();
    w(), n = f, a = u, i = new MutationObserver((g) => {
      const x = t.getRootElement(), b = x && x.parentElement;
      if (x !== n || b !== a) return h();
      for (const N of g) if (!l.contains(N.target)) return c();
    }), i.observe(u, Pl), c();
  });
  return () => {
    d(), w();
  };
}
function on(t, e, r) {
  if (t.type !== "text" && Yt(e)) {
    const n = e.getDOMSlot(r);
    return [n.element, n.getFirstChildOffset() + t.offset];
  }
  return [ns(r) || r, t.offset];
}
function Vl(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== zt(-1.5) && (r.marginTop = zt(-1.5)), r.paddingTop !== zt(4) && (r.paddingTop = zt(4)), r.paddingBottom !== zt(0) && (r.paddingBottom = zt(0));
  }
}
function jl(t, e = Vl) {
  let r = null, n = null, a = null, i = null, s = null, l = null, c = () => {
  };
  function w(d) {
    d.read(() => {
      const h = Ct();
      if (!Bt(h)) return r = null, a = null, i = null, l = null, c(), void (c = () => {
      });
      const [f, u] = function(C) {
        const S = C.getStartEndPoints();
        return C.isBackward() ? [S[1], S[0]] : S;
      }(h), g = f.getNode(), x = g.getKey(), b = f.offset, N = u.getNode(), v = N.getKey(), _ = u.offset, k = t.getElementByKey(x), $ = t.getElementByKey(v), V = r === null || k !== n || b !== a || x !== r.getKey(), I = i === null || $ !== s || _ !== l || v !== i.getKey();
      if ((V || I) && k !== null && $ !== null) {
        const C = function(S, T, A, O, U, L, Y) {
          const y = (S._window ? S._window.document : document).createRange();
          return y.setStart(...on(T, A, O)), y.setEnd(...on(U, L, Y)), y;
        }(t, f, g, k, u, N, $);
        c(), c = Ll(t, C, e);
      }
      r = g, n = k, a = b, i = N, s = $, l = _;
    });
  }
  return w(t.getEditorState()), Qt(t.registerUpdateListener(({ editorState: d }) => w(d)), () => {
    c();
  });
}
function zl(t, e) {
  let r = null;
  const n = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = jl(t, e));
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
function Fl(t) {
  const e = zn(t, (r) => Yt(r) && !r.isInline());
  return Yt(e) || kr(4, t.__key), e;
}
function Bl(t) {
  const e = Ct() || Wi();
  let r;
  if (Bt(e)) r = Yi(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = jn(l, "next"));
    }
    r = r || Xi(Zt(), "previous").getFlipped().insert(Ue());
  }
  const n = Kl(t, r), a = Ji(n), i = Zi(a) ? Qi(a) : n;
  return ts(es(i)), t.getLatest();
}
function Kl(t, e, r) {
  let n = Go(e, "next");
  for (let a = n; a; a = rs(a, r)) n = a;
  return os(n) && kr(283), n.insert(t.isInline() ? Ue().append(t) : t), Go(jn(t.getLatest(), "next"), e.direction);
}
function ql(t) {
  const e = Ct();
  if (!Bt(e)) return !1;
  const r = /* @__PURE__ */ new Set(), n = e.getNodes();
  for (let a = 0; a < n.length; a++) {
    const i = n[a], s = i.getKey();
    if (r.has(s)) continue;
    const l = zn(i, (w) => Yt(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !r.has(c) && (r.add(c), t(l));
  }
  return r.size > 0;
}
const Ul = Symbol.for("preact-signals");
function Or() {
  if (Xt > 1) return void Xt--;
  let t, e = !1;
  for (!function() {
    let r = _r;
    for (_r = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Qe !== void 0; ) {
    let r = Qe;
    for (Qe = void 0, Nr++; r !== void 0; ) {
      const n = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && da(r)) try {
        r.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      r = n;
    }
  }
  if (Nr = 0, Xt--, e) throw t;
}
function Gl(t) {
  if (Xt > 0) return t();
  lo = ++Hl, Xt++;
  try {
    return t();
  } finally {
    Or();
  }
}
let Z, Qe;
function nn(t) {
  const e = Z;
  Z = void 0;
  try {
    return t();
  } finally {
    Z = e;
  }
}
let _r, Xt = 0, Nr = 0, Hl = 0, lo = 0, gr = 0;
function an(t) {
  if (Z === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Z ? (e = { i: 0, S: t, p: Z.s, n: void 0, t: Z, e: void 0, x: void 0, r: e }, Z.s !== void 0 && (Z.s.n = e), Z.s = e, t.n = e, 32 & Z.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Z.s, e.n = void 0, Z.s.n = e, Z.s = e), e) : void 0;
}
function vt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function er(t, e) {
  return new vt(t, e);
}
function da(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function sn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function pa(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const n = r.p;
    r.i === -1 ? (r.S.U(r), n !== void 0 && (n.n = r.n), r.n !== void 0 && (r.n.p = n)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = n;
  }
  t.s = e;
}
function ye(t, e) {
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = gr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Wl(t, e) {
  return new ye(t, e);
}
function ua(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Xt++;
    const r = Z;
    Z = void 0;
    try {
      e();
    } catch (n) {
      throw t.f &= -2, t.f |= 8, Eo(t), n;
    } finally {
      Z = r, Or();
    }
  }
}
function Eo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ua(t);
}
function Yl(t) {
  if (Z !== this) throw new Error("Out-of-order effect");
  pa(this), Z = t, this.f &= -2, 8 & this.f && Eo(this), Or();
}
function Oe(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function qt(t, e) {
  const r = new Oe(t, e);
  try {
    r.c();
  } catch (a) {
    throw r.d(), a;
  }
  const n = r.d.bind(r);
  return n[Symbol.dispose] = n, n;
}
function He(t, e = {}) {
  const r = {};
  for (const n in t) {
    const a = e[n], i = er(a === void 0 ? t[n] : a);
    r[n] = i;
  }
  return r;
}
vt.prototype.brand = Ul, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : nn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && nn(() => {
      var n;
      (n = this.Z) == null || n.call(this);
    }));
  }
}, vt.prototype.subscribe = function(t) {
  return qt(() => {
    const e = this.value, r = Z;
    Z = void 0;
    try {
      t(e);
    } finally {
      Z = r;
    }
  }, { name: "sub" });
}, vt.prototype.valueOf = function() {
  return this.value;
}, vt.prototype.toString = function() {
  return this.value + "";
}, vt.prototype.toJSON = function() {
  return this.value;
}, vt.prototype.peek = function() {
  const t = Z;
  Z = void 0;
  try {
    return this.value;
  } finally {
    Z = t;
  }
}, Object.defineProperty(vt.prototype, "value", { get() {
  const t = an(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Nr > 100) throw new Error("Cycle detected");
    (function(e) {
      Xt !== 0 && Nr === 0 && e.l !== lo && (e.l = lo, _r = { S: e, v: e.v, i: e.i, o: _r });
    })(this), this.v = t, this.i++, gr++, Xt++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Or();
    }
  }
} }), ye.prototype = new vt(), ye.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === gr)) return !0;
  if (this.g = gr, this.f |= 1, this.i > 0 && !da(this)) return this.f &= -2, !0;
  const t = Z;
  try {
    sn(this), Z = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Z = t, pa(this), this.f &= -2, !0;
}, ye.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  vt.prototype.S.call(this, t);
}, ye.prototype.U = function(t) {
  if (this.t !== void 0 && (vt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = an(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Oe.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Oe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ua(this), sn(this), Xt++;
  const t = Z;
  return Z = this, Yl.bind(this, t);
}, Oe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Qe, Qe = this);
}, Oe.prototype.d = function() {
  this.f |= 8, 1 & this.f || Eo(this);
}, Oe.prototype.dispose = function() {
  this.d();
};
At({ build: (t, e, r) => He(e), config: Se({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const n = r.getOutput();
  return qt(() => n.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: n.defaultSelection.peek() });
  }));
} });
function ha() {
  const t = Zt(), e = Ct(), r = Ue();
  t.clear(), t.append(r), e !== null && r.select(), Bt(e) && (e.format = 0);
}
function fa(t, e = ha) {
  return t.registerCommand(Bn, (r) => (t.update(e), !0), bo);
}
At({ build: (t, e, r) => He(e), config: Se({ $onClear: ha }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: n } = r.getOutput();
  return qt(() => fa(t, n.value));
} });
function Xl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const zr = is("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ma extends to {
  $config() {
    return this.config("decorator-text", { extends: to, stateConfigs: [{ flat: !0, stateConfig: zr }] });
  }
  getFormat() {
    return bs(this, zr);
  }
  getFormatFlags(e, r) {
    return Ho(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = vs[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return xs(this, zr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), n = Ho(r, e, null);
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
function Jl(t) {
  return t instanceof ma;
}
At({ name: "@lexical/extension/DecoratorText", nodes: () => [ma], register: (t, e, r) => t.registerCommand(Kn, (n) => {
  const a = Ct();
  if (qn(a) || Bt(a)) for (const i of a.getNodes()) Jl(i) && i.toggleFormat(n);
  return !1;
}, Un) });
function ga(t, e) {
  let r;
  return er(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const co = At({ build: (t) => ga(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function rt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ba(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, n = e;
    for (const a in n) r[a] = ba(r[a], n[a]);
    return t;
  }
  return e;
}
const To = 0, wo = 1, va = 2, Fr = 3, ur = 4, Me = 5, Br = 6, Ye = 7;
function Kr(t) {
  return t.id === To;
}
function xa(t) {
  return t.id === va;
}
function Zl(t) {
  return function(e) {
    return e.id === wo;
  }(t) || rt(305, String(t.id), String(wo)), Object.assign(t, { id: va });
}
const Ql = /* @__PURE__ */ new Set();
class tc {
  constructor(e, r) {
    bt(this, "builder");
    bt(this, "configs");
    bt(this, "_dependency");
    bt(this, "_peerNameSet");
    bt(this, "extension");
    bt(this, "state");
    bt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: To };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : as;
    for (const n of this.configs) e = r(e, n);
    return e;
  }
  init(e) {
    const r = this.state;
    xa(r) || rt(306, String(r.id));
    const n = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...n, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: Fr, registerState: w });
    }(r, this.mergeConfigs(), n);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, n)), this.state = function(l, c, w) {
      return Object.assign(l, { id: ur, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const r = this.state;
    let n;
    r.id !== ur && rt(307, String(r.id), String(Me)), this.extension.build && (n = this.extension.build(e, r.config, r.registerState));
    const a = { ...r.registerState, getOutput: () => n, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Me, output: s, registerState: l });
    }(r, n, a);
  }
  register(e, r) {
    this._signal = r;
    const n = this.state;
    n.id !== Me && rt(308, String(n.id), String(Me));
    const a = this.extension.register && this.extension.register(e, n.config, n.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Br });
    }(n), () => {
      const i = this.state;
      i.id !== Ye && rt(309, String(n.id), String(Ye)), this.state = function(s) {
        return Object.assign(s, { id: Me });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let n;
    return r.id !== Br && rt(310, String(r.id), String(Br)), this.extension.afterRegistration && (n = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ye });
    }(r), n;
  }
  getSignal() {
    return this._signal === void 0 && rt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && rt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= ur;
    }(e) || rt(313, String(e.id), String(ur)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Fr;
    }(e) || rt(314, String(e.id), String(Fr)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && rt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && rt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Ye;
    }(e) || rt(316, String(e.id), String(Ye)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Ql;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Me;
      })(e) || rt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ln = { tag: go };
function ec() {
  const t = Zt();
  t.isEmpty() && t.append(Ue());
}
const rc = At({ config: Se({ setOptions: ln, updateOptions: ln }), init: ({ $initialEditorState: t = ec }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, n) {
  const a = n.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (ws(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [ss, Vn, ls, cs, Ln] }), cn = Symbol.for("@lexical/extension/LexicalBuilder");
function wn() {
}
function oc(t) {
  throw t;
}
function hr(t) {
  return Array.isArray(t) ? t : [t];
}
const qr = "0.43.0+prod.esm";
class Ae {
  constructor(e) {
    bt(this, "roots");
    bt(this, "extensionNameMap");
    bt(this, "outgoingConfigEdges");
    bt(this, "incomingEdges");
    bt(this, "conflicts");
    bt(this, "_sortedExtensionReps");
    bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = qr, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [hr(rc)];
    for (const n of e) r.push(hr(n));
    return new Ae(r);
  }
  static maybeFromEditor(e) {
    const r = e[cn];
    return r && (r.PACKAGE_VERSION !== qr && rt(292, r.PACKAGE_VERSION, qr), r instanceof Ae || rt(293)), r;
  }
  static fromEditor(e) {
    const r = Ae.maybeFromEditor(e);
    return r === void 0 && rt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...n } = this.buildCreateEditorArgs(), a = Object.assign(Pn({ ...n, ...r ? { onError: (i) => {
      r(i, a);
    } } : {} }), { [cn]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = wn;
    function r() {
      try {
        e();
      } finally {
        e = wn;
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
    if (r) return r.extension !== e && rt(295, e.name), r;
  }
  addEdge(e, r, n) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(r, n) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, n]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && rt(296);
    const r = hr(e), [n] = r;
    typeof n.name != "string" && rt(297, typeof n.name);
    let a = this.extensionNameMap.get(n.name);
    if (a !== void 0 && a.extension !== n && rt(298, n.name), !a) {
      a = new tc(this, n), this.extensionNameMap.set(n.name, a);
      const i = this.conflicts.get(n.name);
      typeof i == "string" && rt(299, n.name, i);
      for (const s of n.conflictsWith || []) this.extensionNameMap.has(s) && rt(299, n.name, s), this.conflicts.set(s, n.name);
      for (const s of n.dependencies || []) {
        const l = hr(s);
        this.addEdge(n.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of n.peerDependencies || []) this.addEdge(n.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (n, a) => {
      let i = n.state;
      if (xa(i)) return;
      const s = n.extension.name;
      var l;
      Kr(i) || rt(300, s, a || "[unknown]"), Kr(l = i) || rt(304, String(l.id), String(To)), i = Object.assign(l, { id: wo }), n.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && r(d, s);
      }
      i = Zl(i), n.state = i, e.push(n);
    };
    for (const n of this.extensionNameMap.values()) Kr(n.state) && r(n);
    for (const n of e) for (const [a, i] of this.outgoingConfigEdges.get(n.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [n, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(n.name);
      i === void 0 && rt(301, n.name);
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
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const f of Xl(h)) {
        if (typeof f != "function") {
          const u = n.get(f.replace);
          u && rt(302, h.name, f.replace.name, u.extension.name), n.set(f.replace, d);
        }
        r.add(f);
      }
      if (h.html) {
        if (h.html.export) for (const [f, u] of h.html.export.entries()) a.set(f, u);
        h.html.import && Object.assign(i, h.html.import);
      }
      h.theme && ba(s, h.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = oc), e;
  }
}
const nc = /* @__PURE__ */ new Set(), dn = At({ build(t, e, r) {
  const n = r.getDependency(co).output, a = er({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = ga(() => {
  }, () => qt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    n.value.read(() => {
      if (Ct()) for (const [d, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(d);
          continue;
        }
        const f = ks(d), u = f && f.isSelected() || !1;
        w = w || u !== (!!s && s.has(d)), u && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = Wl(() => (i.value || nc).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [co], name: "@lexical/extension/NodeSelection" }), ac = ds("INSERT_HORIZONTAL_RULE_COMMAND");
class Le extends to {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Le(e.__key);
  }
  static importJSON(e) {
    return So().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: ic, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Gn(r, e.theme.hr), r;
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
function ic() {
  return { node: So() };
}
function So() {
  return ys(Le);
}
function sc(t) {
  return t instanceof Le;
}
At({ dependencies: [co, dn], name: "@lexical/extension/HorizontalRule", nodes: () => [Le], register(t, e, r) {
  const { watchNodeKey: n } = r.getDependency(dn).output, a = er({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Qt(t.registerCommand(ac, (s) => {
    const l = Ct();
    if (!Bt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const c = So();
      Bl(c);
    }
    return !0;
  }, bo), t.registerCommand(ps, (s) => {
    if (us(s.target)) {
      const l = hs(s.target);
      if (sc(l)) return function(c, w = !1) {
        const d = Ct(), h = c.isSelected(), f = c.getKey();
        let u;
        w && qn(d) ? u = d : (u = fs(), ms(u)), h ? u.delete(f) : u.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Un), t.registerMutationListener(Le, (s, l) => {
    Gl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, h] of s.entries()) if (h === "destroyed") w.delete(d), c = !0;
      else {
        const f = w.get(d), u = t.getElementByKey(d);
        f ? f.domNode.value = u : (c = !0, w.set(d, { domNode: er(u), selectedSignal: n(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), qt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(qt(() => {
      const w = l.value;
      w && (c.value ? Gn(w, i) : _s(w, i));
    }));
    return Qt(...s);
  }));
} });
At({ build: (t, e) => He({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Se({ $getParentEditor: function() {
  const t = gs();
  return Ae.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const n = e.$getParentEditor();
  t.parentEditor = n, t.theme = t.theme || n._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => qt(() => {
  const n = t._parentEditor;
  if (n && r.getOutput().inheritEditableFromParent.value) return t.setEditable(n.isEditable()), n.registerEditableListener(t.setEditable.bind(t));
}) });
At({ build: (t, e, r) => He(e), config: Se({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const n = r.getOutput();
  return qt(() => {
    if (!n.disabled.value) return zl(t, n.onReposition.value);
  });
} });
function ya(t) {
  return t.canBeEmpty();
}
function lc(t, e, r = ya) {
  return Qt(t.registerCommand(Ns, (n) => {
    const a = Ct();
    if (!Bt(a)) return !1;
    n.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => xr(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), h = Fl(d);
      if (h.canIndent()) {
        const f = h.getKey();
        let u = Cs();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = Es(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? n.shiftKey ? Ts : Wo : Ss;
    return t.dispatchCommand(i, void 0);
  }, bo), t.registerCommand(Wo, () => {
    const n = typeof e == "number" ? e : e ? e.peek() : null, a = Ct();
    if (!Bt(a)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return ql((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!n || l < n) && s.setIndent(l);
      }
    });
  }, vo));
}
At({ build: (t, e, r) => He(e), config: Se({ $canIndent: ya, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: n, maxIndent: a, $canIndent: i } = r.getOutput();
  return qt(() => {
    if (!n.value) return lc(t, a, i);
  });
} });
const cc = At({ name: "@lexical/react/ReactProvider" });
function wc() {
  return Zt().getTextContent();
}
function dc(t, e = !0) {
  if (t) return !1;
  let r = wc();
  return e && (r = r.trim()), r === "";
}
function pc(t) {
  if (!dc(t, !1)) return !1;
  const e = Zt().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let n = 0; n < r; n++) {
    const a = e[n];
    if (Rs(a)) return !1;
    if (Yt(a)) {
      if (!Ds(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[n];
        if (!yr(c)) return !1;
      }
    }
  }
  return !0;
}
function ka(t) {
  return () => pc(t);
}
function _a(t) {
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
              if (Bt(g)) {
                const x = g.anchor;
                let b = x.getNode(), N = 0, v = 0;
                if (yr(b) && w >= 0 && d >= 0 && (N = w, v = w + d, g.setTextNodeRange(b, N, b, v)), N === v && h === "" || (g.insertRawText(h), b = x.getNode()), yr(b)) {
                  N = f, v = f + u;
                  const _ = b.getTextContentSize();
                  N = N > _ ? _ : N, v = v > _ ? _ : v, g.setTextNodeRange(b, N, b, v);
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
At({ build: (t, e, r) => He(e), config: Se({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => qt(() => r.getOutput().disabled.value ? void 0 : _a(t)) });
function uc(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ro = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : H;
function hc({ editor: t, ErrorBoundary: e }) {
  return function(r, n) {
    const [a, i] = R(() => r.getDecorators());
    return Ro(() => r.registerDecoratorListener((s) => {
      js(() => {
        i(s);
      });
    }), [r]), H(() => {
      i(r.getDecorators());
    }, [r]), j(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = o(n, { onError: (f) => r._onError(f), children: o(Ki, { fallback: null, children: a[w] }) }), h = r.getElementByKey(w);
        h !== null && s.push(zs(d, h, w));
      }
      return s;
    }, [n, a, r]);
  }(t, e);
}
function fc({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const n = Ae.maybeFromEditor(r);
    if (n && n.hasExtensionByName(cc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) n.hasExtensionByName(a) && uc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : o(hc, { editor: t, ErrorBoundary: e });
}
function pn(t) {
  return t.getEditorState().read(ka(t.isComposing()));
}
function mc({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [n] = Gt();
  return function(a) {
    Ro(() => Qt(Vs(a), _a(a)), [a]);
  }(n), p(st, { children: [t, o(gc, { content: e }), o(fc, { editor: n, ErrorBoundary: r })] });
}
function gc({ content: t }) {
  const [e] = Gt(), r = function(a) {
    const [i, s] = R(() => pn(a));
    return Ro(() => {
      function l() {
        const c = pn(a);
        s(c);
      }
      return l(), Qt(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), n = Ol();
  return r ? typeof t == "function" ? t(n) : t : null;
}
function bc({ defaultSelection: t }) {
  const [e] = Gt();
  return H(() => {
    e.focus(() => {
      const r = document.activeElement, n = e.getRootElement();
      n === null || r !== null && n.contains(r) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const vc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : H;
function xc({ onClear: t }) {
  const [e] = Gt();
  return vc(() => fa(e, t), [e, t]), null;
}
const Na = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? It : H;
function yc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: n, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: h, ariaRequired: f, autoCapitalize: u, className: g, id: x, role: b = "textbox", spellCheck: N = !0, style: v, tabIndex: _, "data-testid": k, ...$ }, V) {
  const [I, C] = R(t.isEditable()), S = F((A) => {
    A && A.ownerDocument && A.ownerDocument.defaultView ? t.setRootElement(A) : t.setRootElement(null);
  }, [t]), T = j(() => /* @__PURE__ */ function(...A) {
    return (O) => {
      for (const U of A) typeof U == "function" ? U(O) : U != null && (U.current = O);
    };
  }(V, S), [S, V]);
  return Na(() => (C(t.isEditable()), t.registerEditableListener((A) => {
    C(A);
  })), [t]), o("div", { "aria-activedescendant": I ? e : void 0, "aria-autocomplete": I ? r : "none", "aria-controls": I ? n : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": I && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": I ? h : void 0, "aria-readonly": !I || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: I, "data-testid": k, id: x, ref: T, role: b, spellCheck: N, style: v, tabIndex: _, ...$ });
}
const kc = ar(yc);
function un(t) {
  return t.getEditorState().read(ka(t.isComposing()));
}
const _c = ar(Nc);
function Nc(t, e) {
  const { placeholder: r, ...n } = t, [a] = Gt();
  return p(st, { children: [o(kc, { editor: a, ...n, ref: e }), r != null && o(Cc, { editor: a, content: r })] });
}
function Cc({ content: t, editor: e }) {
  const r = function(s) {
    const [l, c] = R(() => un(s));
    return Na(() => {
      function w() {
        const d = un(s);
        c(d);
      }
      return w(), Qt(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [n, a] = R(e.isEditable());
  if (It(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(n) : t !== null && (i = t), i === null ? null : o("div", { "aria-hidden": !0, children: i });
}
function Ec({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ o(
    _c,
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
const Ca = Rr(void 0);
function Tc({
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
  return /* @__PURE__ */ o(Ca.Provider, { value: s, children: i });
}
function Ea() {
  const t = mo(Ca);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Sc() {
  const [t, e] = R(void 0), r = F(() => {
    e(void 0);
  }, []), n = j(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ o(al, { open: !0, onOpenChange: r, children: /* @__PURE__ */ p(ll, { children: [
      /* @__PURE__ */ o(cl, { children: /* @__PURE__ */ o(wl, { children: i }) }),
      s
    ] }) });
  }, [t, r]), a = F(
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
function Rc({
  children: t
}) {
  const [e] = Gt(), [r, n] = R(e), [a, i] = R("paragraph"), [s, l] = Sc(), c = () => {
  };
  return H(() => r.registerCommand(
    Hn,
    (w, d) => (n(d), !1),
    vo
  ), [r]), /* @__PURE__ */ p(
    Tc,
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
function Dc(t) {
  const [e] = Gt(), { activeEditor: r } = Ea();
  H(() => r.registerCommand(
    Hn,
    () => {
      const n = Ct();
      return n && t(n), !1;
    },
    vo
  ), [e, t]), H(() => {
    r.getEditorState().read(() => {
      const n = Ct();
      n && t(n);
    });
  }, [r, t]);
}
const Mc = he(
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
), Ta = et.createContext({
  size: "default",
  variant: "default"
});
function Sa({
  className: t,
  variant: e,
  size: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = ct();
  return /* @__PURE__ */ o(
    Xn.Root,
    {
      ref: a,
      className: m("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...i,
      dir: s,
      children: /* @__PURE__ */ o(
        Ta.Provider,
        {
          value: { variant: e, size: r },
          children: n
        }
      )
    }
  );
}
function br({
  className: t,
  children: e,
  variant: r,
  size: n,
  ref: a,
  ...i
}) {
  const s = et.useContext(Ta);
  return /* @__PURE__ */ o(
    Xn.Item,
    {
      ref: a,
      className: m(
        Mc({
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
const hn = [
  { format: "bold", icon: Qa, label: "Bold" },
  { format: "italic", icon: ti, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Oc() {
  const { activeEditor: t } = Ea(), [e, r] = R([]), n = F((a) => {
    if (Bt(a) || Fs(a)) {
      const i = [];
      hn.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Dc(n), /* @__PURE__ */ o(
    Sa,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: hn.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ o(
        br,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Kn, a);
          },
          children: /* @__PURE__ */ o(i, { className: "tw:h-4 tw:w-4" })
        },
        a
      ))
    }
  );
}
function Ic({ onClear: t }) {
  const [e] = Gt();
  H(() => {
    t && t(() => {
      e.dispatchCommand(Bn, void 0);
    });
  }, [e, t]);
}
function Ac({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, n] = R(void 0);
  return /* @__PURE__ */ p("div", { className: "tw:relative", children: [
    /* @__PURE__ */ o(Rc, { children: () => /* @__PURE__ */ o("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ o(Oc, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw:relative", children: [
      /* @__PURE__ */ o(
        mc,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (i) => {
            i !== void 0 && n(i);
          }, children: /* @__PURE__ */ o(Ec, { placeholder: t }) }),
          ErrorBoundary: Rl
        }
      ),
      e && /* @__PURE__ */ o(bc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(Ic, { onClear: r }),
      /* @__PURE__ */ o(xc, {})
    ] })
  ] });
}
const $c = {
  namespace: "commentEditor",
  theme: No,
  nodes: Co,
  onError: (t) => {
    console.error(t);
  }
};
function Cr({
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
          _l,
          {
            initialConfig: {
              ...$c,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(yt, { children: [
              /* @__PURE__ */ o(Ac, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ o(
                Cl,
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
function Pc(t, e) {
  const r = Os(e) ? e.body.childNodes : e.childNodes;
  let n = [];
  const a = [];
  for (const i of r) if (!Da.has(i.nodeName)) {
    const s = Ma(i, t, a, !1);
    s !== null && (n = n.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Wn && s.insertAfter(Yn());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), n;
}
function Lc(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), n = Zt().getChildren();
  for (let a = 0; a < n.length; a++)
    Ra(t, n[a], r, e);
  return r.innerHTML;
}
function Ra(t, e, r, n = null) {
  let a = n === null || e.isSelected(n);
  const i = Yt(e) && e.excludeFromCopy("html");
  let s = e;
  n !== null && yr(e) && (s = Al(n, e, "clone"));
  const l = Yt(s) ? s.getChildren() : [], c = Ms(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: h } = w;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = Ra(t, g, f, n);
    !a && Yt(e) && x && e.extractWithChild(g, n, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Fn(d) || Yo(d)) && d.append(f), r.append(d), h) {
      const u = h.call(s, d);
      u && (Yo(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else r.append(f);
  return a;
}
const Da = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ma(t, e, r, n, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Da.has(t.nodeName)) return s;
  let l = null;
  const c = function(g, x) {
    const { nodeName: b } = g, N = x._htmlConversions.get(b.toLowerCase());
    let v = null;
    if (N !== void 0) for (const _ of N) {
      const k = _(g);
      k !== null && (v === null || (v.priority || 0) <= (k.priority || 0)) && (v = k);
    }
    return v !== null ? v.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const h = t.childNodes;
  let f = [];
  const u = (l == null || !Is(l)) && (l != null && xr(l) || n);
  for (let g = 0; g < h.length; g++) f.push(...Ma(h[g], e, r, u, new Map(a), l));
  return d != null && (f = d(f)), Xo(t) && (f = Vc(t, f, u ? () => {
    const g = new Wn();
    return r.push(g), g;
  } : Ue)), l == null ? f.length > 0 ? s = s.concat(f) : Xo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Jo(g.nextSibling) && Jo(g.previousSibling);
  }(t) && (s = s.concat(Yn())) : Yt(l) && l.append(...f), s;
}
function Vc(t, e, r) {
  const n = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (xr(l)) n && !l.getFormat() && l.setFormat(n), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && xr(e[s + 1])) {
      const c = r();
      c.setFormat(n), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function Oa(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), n = document.createRange();
  return n.selectNodeContents(e), n.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(n), !0;
}
function Ia(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ia(e.children)
  ) : !1;
}
function Ot(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ia(t.root.children) : !1;
}
function jc(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Jn({
    namespace: "EditorUtils",
    theme: No,
    nodes: Co,
    onError: (n) => {
      console.error(n);
    }
  });
  let r;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = Pc(e, a);
      Zt().clear(), As(i);
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
function Er(t) {
  const e = Jn({
    namespace: "EditorUtils",
    theme: No,
    nodes: Co,
    onError: (a) => {
      console.error(a);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let n = "";
  return e.getEditorState().read(() => {
    n = Lc(e);
  }), n = n.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), n;
}
function Do(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function vr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Mo(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const zc = {
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
function Ur(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function cp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: n,
  initialAssignedUser: a
}) {
  const [i, s] = R(zc), [l, c] = R(a), [w, d] = R(!1), h = G(void 0), f = G(null);
  H(() => {
    let v = !0;
    const _ = f.current;
    if (!_) return;
    const k = setTimeout(() => {
      v && Oa(_);
    }, 300);
    return () => {
      v = !1, clearTimeout(k);
    };
  }, []);
  const u = F(() => {
    if (!Ot(i)) return;
    const v = Er(i);
    e(v, l);
  }, [i, e, l]), g = n["%commentEditor_placeholder%"] ?? "Type your comment here...", x = n["%commentEditor_saveButton_tooltip%"] ?? "Save comment", b = n["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", N = n["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ o("span", { className: "tw:text-sm tw:font-medium", children: N }),
      /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-2", children: [
        /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
          /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(z, { onClick: r, className: "tw:h-6 tw:w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(Be, {}) }) }),
          /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: b }) })
        ] }) }),
        /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
          /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(
            z,
            {
              onClick: u,
              className: "tw:h-6 tw:w-6",
              size: "icon",
              variant: "default",
              disabled: !Ot(i),
              children: /* @__PURE__ */ o(Ut, {})
            }
          ) }),
          /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: x }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ p(re, { open: w, onOpenChange: d, children: [
      /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ o(Tn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { children: Ur(l !== void 0 ? l : "", n) })
          ]
        }
      ) }),
      /* @__PURE__ */ o(
        oe,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ o(me, { children: /* @__PURE__ */ o(ge, { children: t.map((v) => /* @__PURE__ */ o(
            ee,
            {
              onSelect: () => {
                c(v || void 0), d(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ o("span", { children: Ur(v, n) })
            },
            v || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: f,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : Mo(v) && (v.preventDefault(), v.stopPropagation(), Ot(i) && u());
        },
        onKeyDown: (v) => {
          Do(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ o(
          Cr,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: g,
            onClear: (v) => {
              h.current = v;
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
]), dp = [
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
], Fc = ["input", "select", "textarea", "button"], Bc = ["button", "textbox"], Kc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = G(null), [i, s] = R(void 0), [l, c] = R(void 0), w = F(
    (u) => {
      s(u);
      const g = t.find((b) => b.id === u);
      g && (e == null || e(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = F(
    (u) => {
      const g = t.find((x) => x.id === u);
      g && (c((x) => x === u ? void 0 : u), r == null || r(g));
    },
    [r, t]
  ), h = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Fc.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && Bc.includes(x)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, f = F(
    (u) => {
      var I;
      const g = u.target, x = (C) => C ? document.getElementById(C) : void 0, b = x(l), N = x(i);
      if (!!(b && g && b.contains(g) && g !== b) && h(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const C = t.find((S) => S.id === l);
            C && w(C.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!b) return;
          const C = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const S = C.findIndex((A) => A === g);
          if (S === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(S + 1, C.length - 1) : T = Math.max(S - 1, 0), T !== S && (u.preventDefault(), u.stopPropagation(), (I = C[T]) == null || I.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((C) => C.id === i);
      let $ = k;
      switch (u.key) {
        case "ArrowDown":
          $ = Math.min(k + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          $ = Math.max(k - 1, 0), u.preventDefault();
          break;
        case "Home":
          $ = 0, u.preventDefault();
          break;
        case "End":
          $ = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const C = N;
          if (C) {
            const S = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), A = S ?? T;
            if (A) {
              u.preventDefault(), A.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (h(g) || (n == null || n(u.key), u.preventDefault()));
          return;
      }
      const V = t[$];
      V && w(V.id);
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
}, qc = he(
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
function rr({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o("div", { ref: r, className: m("pr-twp", qc({ variant: e }), t), ...n });
}
function Uc({
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
function pp({
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
function up({
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
function hp({
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
function Gc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: m("pr-twp tw:p-6 tw:pt-0", t), ...r });
}
function fp({
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
function or({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Bs.Root,
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
function Hc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xo.Root,
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
function mp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xo.Image,
    {
      ref: e,
      className: m("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...r
    }
  );
}
function Wc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xo.Fallback,
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
const Oo = Rr(void 0);
function ne() {
  const t = mo(Oo);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Re = he("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Ee = ht.Trigger, Aa = ht.Group, Yc = ht.Portal, Xc = ht.Sub, Jc = ht.RadioGroup;
function pe({ variant: t = "default", ...e }) {
  const r = et.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Oo.Provider, { value: r, children: /* @__PURE__ */ o(ht.Root, { ...e }) });
}
function Zc({
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
        Re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Pe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Qc({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = ct();
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
function ue({
  className: t,
  sideOffset: e = 4,
  children: r,
  ref: n,
  ...a
}) {
  const i = ct();
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
function po({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = ct(), i = ne();
  return /* @__PURE__ */ o(
    ht.Item,
    {
      ref: r,
      className: m(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t,
        Re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
}
function de({
  className: t,
  children: e,
  checked: r,
  ref: n,
  ...a
}) {
  const i = ct(), s = ne();
  return /* @__PURE__ */ p(
    ht.CheckboxItem,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Re({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      dir: i,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(ht.ItemIndicator, { children: /* @__PURE__ */ o(Ut, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function tw({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = ct(), i = ne();
  return /* @__PURE__ */ p(
    ht.RadioItem,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Re({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(ht.ItemIndicator, { children: /* @__PURE__ */ o(fo, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Ir({
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
function sr({
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
function gp({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function fn({
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
    const $ = f.current;
    if (!$) return;
    const V = setTimeout(() => {
      k && Oa($);
    }, 300);
    return () => {
      k = !1, clearTimeout(V);
    };
  }, [c]);
  const u = F(
    (k) => {
      k && k.stopPropagation(), w(!1), h(void 0), s == null || s(!1);
    },
    [s]
  ), g = F(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Er(d)
      ) && (w(!1), h(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), x = j(() => {
    const k = new Date(t.date), $ = $i(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), V = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return _e(r["%comment_dateAtTime%"], {
      date: $,
      time: V
    });
  }, [t.date, r]), b = j(() => t.user, [t.user]), N = j(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), v = j(() => Pi(t.contents), [t.contents]), _ = j(() => {
    if (n && l)
      return /* @__PURE__ */ p(st, { children: [
        /* @__PURE__ */ p(
          po,
          {
            onClick: (k) => {
              k.stopPropagation(), w(!0), h(jc(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ o(ei, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          po,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ o(ri, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
        /* @__PURE__ */ o(Hc, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ o(Wc, { className: "tw:text-xs tw:font-medium", children: N }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ o("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: x }),
            /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(rr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              vr(t.assignedUser, r)
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
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : Mo(k) && (k.preventDefault(), k.stopPropagation(), Ot(d) && g());
              },
              onKeyDown: (k) => {
                Do(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  Cr,
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
                    z,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ o(Be, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    z,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !Ot(d),
                      children: /* @__PURE__ */ o(Sn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ p(st, { children: [
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
                dangerouslySetInnerHTML: { __html: v }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ p(pe, { children: [
          /* @__PURE__ */ o(Ee, { asChild: !0, children: /* @__PURE__ */ o(z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(oi, {}) }) }),
          /* @__PURE__ */ o(ue, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const mn = {
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
function ew({
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
  assignableUsers: x,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: v,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: $ = 5,
  onVerseRefClick: V,
  initialAssignedUser: I
}) {
  const [C, S] = R(mn), [T, A] = R(), [O, U] = R(), L = n, [Y, y] = R(!1), [K, wt] = R(!1), [mt, Et] = R(!1), [pt, kt] = R(!1), [B, it] = R(!1), [J, dt] = R(k), [gt, ae] = R(!1), ie = G(void 0), [De, se] = R(/* @__PURE__ */ new Map());
  H(() => {
    let D = !0;
    return (async () => {
      const Mt = v ? await v(c) : !1;
      D && it(Mt);
    })(), () => {
      D = !1;
    };
  }, [c, v]), H(() => {
    let D = !0;
    if (!n) {
      kt(!1), se(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Mt = N ? await N(c) : !1;
      D && kt(Mt);
    })(), () => {
      D = !1;
    };
  }, [n, c, N]);
  const Tt = G("idle");
  H(() => {
    if (!n) {
      Tt.current !== "idle" && (A(void 0), U(void 0), Tt.current = "idle");
      return;
    }
    Tt.current === "idle" && (Tt.current = "pending"), pt ? Tt.current === "pending" && I !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    I !== i && (A(I), Tt.current = "auto-populated") : Tt.current === "auto-populated" && (A(void 0), Tt.current = "pending");
  }, [n, I, pt, i]);
  const $t = j(() => e.filter((D) => !D.deleted), [e]);
  H(() => {
    let D = !0;
    if (!n || !_) {
      se(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Mt = /* @__PURE__ */ new Map();
      await Promise.all(
        $t.map(async (We) => {
          const Wa = await _(We.id);
          D && Mt.set(We.id, Wa);
        })
      ), D && se(Mt);
    })(), () => {
      D = !1;
    };
  }, [n, $t, _]);
  const Ht = j(() => $t[0], [$t]), M = G(null), E = G(void 0), P = F(() => {
    var D;
    (D = E.current) == null || D.call(E), S(mn);
  }, []), X = F(() => {
    const D = !J;
    dt(D), ae(!D), g == null || g(c, D);
  }, [J, g, c]);
  H(() => {
    y(!1);
  }, [n]), H(() => {
    if (n && !J && !gt) {
      const D = setTimeout(() => {
        dt(!0), g == null || g(c, !0);
      }, $ * 1e3);
      return ie.current = D, () => clearTimeout(D);
    }
    ie.current && (clearTimeout(ie.current), ie.current = void 0);
  }, [n, J, gt, $, c, g]);
  const q = j(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), nt = j(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const D = vr(i, r);
    return _e(r["%comment_assigned_to%"], {
      assignedUser: D
    });
  }, [i, r]), tt = j(() => $t.slice(1), [$t]), ot = j(() => tt.length ?? 0, [tt.length]), at = j(() => ot > 0, [ot]), Dt = j(() => Y || ot <= 2 ? tt : tt.slice(-2), [tt, ot, Y]), St = j(() => Y || ot <= 2 ? 0 : ot - 2, [ot, Y]), Wt = j(
    () => ot === 1 ? q.singleReply : _e(q.multipleReplies, { count: ot }),
    [ot, q]
  ), ve = j(
    () => St === 1 ? q.singleReply : _e(q.multipleReplies, { count: St }),
    [St, q]
  );
  H(() => {
    !n && K && at && wt(!1);
  }, [n, K, at]);
  const le = F(
    async (D) => {
      D && D.stopPropagation();
      const Vt = Ot(C) ? Er(C) : void 0;
      if (T !== void 0) {
        await h({
          threadId: c,
          contents: Vt,
          assignedUser: T
        }) && (U(T), Vt && P());
        return;
      }
      Vt && await h({ threadId: c, contents: Vt }) && P();
    },
    [
      P,
      C,
      h,
      T,
      c
    ]
  ), jo = F(
    async (D) => {
      const Vt = Ot(C) ? Er(C) : void 0, Mt = D.status ? D.assignedUser : T ?? D.assignedUser, We = await h({
        ...D,
        contents: Vt,
        assignedUser: Mt
      });
      return We && (Mt !== void 0 && U(Mt), Vt && P()), We;
    },
    [P, C, h, T]
  );
  if ($t.length !== 0)
    return /* @__PURE__ */ o(
      Uc,
      {
        role: "option",
        "aria-selected": n,
        id: c,
        className: m(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !n },
          {
            "tw:bg-primary-foreground": !n && d !== "Resolved" && J,
            "tw:bg-background": n && d !== "Resolved" && J,
            "tw:bg-muted": d === "Resolved",
            "tw:bg-accent": !J && !n && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(c);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Gc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              nt && /* @__PURE__ */ o(rr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: nt }),
              /* @__PURE__ */ o(
                z,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (D) => {
                    D.stopPropagation(), X();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": J ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: J ? /* @__PURE__ */ o(ni, {}) : /* @__PURE__ */ o(ai, {})
                }
              ),
              B && d !== "Resolved" && /* @__PURE__ */ o(
                z,
                {
                  variant: "ghost",
                  size: "icon",
                  className: m(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (D) => {
                    D.stopPropagation(), jo({
                      threadId: c,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ o(Ut, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: M,
                className: m(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": L
                  },
                  { "tw:whitespace-nowrap": !L }
                ),
                children: [
                  a && V ? /* @__PURE__ */ o(
                    z,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (D) => {
                        D.stopPropagation(), V(w);
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
              fn,
              {
                comment: Ht,
                localizedStrings: r,
                isThreadExpanded: n,
                threadStatus: d,
                handleAddCommentToThread: jo,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: wt,
                canEditOrDelete: (!K && De.get(Ht.id)) ?? !1,
                canUserResolveThread: B
              }
            )
          ] }),
          /* @__PURE__ */ p(st, { children: [
            at && !n && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(or, {}) }),
              /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: Wt })
            ] }),
            !n && Ot(C) && /* @__PURE__ */ o(
              Cr,
              {
                editorSerializedState: C,
                onSerializedChange: (D) => S(D),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            n && /* @__PURE__ */ p(st, { children: [
              St > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (D) => {
                    D.stopPropagation(), y(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (D) => {
                    (D.key === "Enter" || D.key === " ") && (D.preventDefault(), D.stopPropagation(), y(!0));
                  },
                  children: [
                    /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(or, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: ve }),
                      Y ? /* @__PURE__ */ o(Rn, {}) : /* @__PURE__ */ o(Ke, {})
                    ] })
                  ]
                }
              ),
              Dt.map((D) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
                fn,
                {
                  comment: D,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: n,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: wt,
                  canEditOrDelete: (!K && De.get(D.id)) ?? !1
                }
              ) }, D.id)),
              b !== !1 && (!K || Ot(C)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (D) => D.stopPropagation(),
                  onKeyDownCapture: (D) => {
                    Mo(D) && (D.preventDefault(), D.stopPropagation(), (Ot(C) || T !== void 0 && T !== O) && le());
                  },
                  onKeyDown: (D) => {
                    Do(D), (D.key === "Enter" || D.key === " ") && D.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ o(
                      Cr,
                      {
                        editorSerializedState: C,
                        onSerializedChange: (D) => S(D),
                        placeholder: d === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (D) => {
                          E.current = D;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      T !== void 0 && (Ot(C) || T !== O) && /* @__PURE__ */ o("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: _e(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: vr(
                            T,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(re, { open: mt, onOpenChange: Et, children: [
                        /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
                          z,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !pt || !x || x.length === 0 || !x.includes(s),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ o(Tn, {})
                          }
                        ) }),
                        /* @__PURE__ */ o(
                          oe,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (D) => {
                              D.key === "Escape" && (D.stopPropagation(), Et(!1));
                            },
                            children: /* @__PURE__ */ o(me, { children: /* @__PURE__ */ o(ge, { children: x == null ? void 0 : x.map((D) => /* @__PURE__ */ o(
                              ee,
                              {
                                onSelect: () => {
                                  A(D !== i ? D : void 0), Tt.current = "user-selected", U(void 0), Et(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ o("span", { children: vr(D, r) })
                              },
                              D || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ o(
                        z,
                        {
                          size: "icon",
                          onClick: le,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !Ot(C) && (T === void 0 || T === O),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ o(Sn, {})
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
function bp({
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
  onSelectedThreadChange: x,
  onVerseRefClick: b
}) {
  const [N, v] = R(/* @__PURE__ */ new Set()), [_, k] = R(), [$, V] = R(), I = F(
    async (y) => {
      const K = await i(y);
      return K !== void 0 && y.assignedUser !== void 0 && y.assignedUser !== "" && V(y.assignedUser), K;
    },
    [i]
  );
  H(() => {
    g && (v((y) => new Set(y).add(g)), k(g));
  }, [g]);
  const C = r.filter(
    (y) => y.comments.some((K) => !K.deleted)
  ), S = C.map((y) => ({ id: y.id })), T = F(
    (y) => {
      v((K) => new Set(K).add(y.id)), k(y.id), x == null || x(y.id);
    },
    [x]
  ), A = F(
    (y) => {
      const K = N.has(y);
      v((wt) => {
        const mt = new Set(wt);
        return mt.has(y) ? mt.delete(y) : mt.add(y), mt;
      }), k(y), x == null || x(K ? void 0 : y);
    },
    [N, x]
  ), { listboxRef: O, activeId: U, handleKeyDown: L } = Kc({
    options: S,
    onOptionSelect: T
  }), Y = F(
    (y) => {
      y.key === "Escape" ? (_ && N.has(_) && (v((K) => {
        const wt = new Set(K);
        return wt.delete(_), wt;
      }), k(void 0), x == null || x(void 0)), y.preventDefault(), y.stopPropagation()) : L(y);
    },
    [_, N, L, x]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: O,
      "aria-activedescendant": U ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: Y,
      children: C.map((y) => /* @__PURE__ */ o(
        "div",
        {
          className: m({
            "tw:opacity-60": y.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            ew,
            {
              classNameForVerseText: e,
              comments: y.comments,
              localizedStrings: a,
              verseRef: y.verseRef,
              handleSelectThread: A,
              threadId: y.id,
              thread: y,
              isRead: y.isRead,
              isSelected: N.has(y.id),
              currentUser: n,
              assignedUser: y.assignedUser,
              threadStatus: y.status,
              handleAddCommentToThread: I,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: h,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: b,
              initialAssignedUser: $
            }
          )
        },
        y.id
      ))
    }
  );
}
function rw({ table: t }) {
  return /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(Ks, { asChild: !0, children: /* @__PURE__ */ p(z, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ o(ii, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(ue, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ o(Ir, { children: "Toggle columns" }),
      /* @__PURE__ */ o(sr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ o(
        de,
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
const Ve = xt.Root, ow = xt.Group, je = xt.Value, nw = he(
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
function ze({
  className: t,
  children: e,
  size: r,
  ref: n,
  ...a
}) {
  const i = ct();
  return /* @__PURE__ */ p(
    xt.Trigger,
    {
      className: m(nw({ size: r, className: t })),
      ref: n,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ o(xt.Icon, { asChild: !0, children: /* @__PURE__ */ o(Ke, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function aw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xt.ScrollUpButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Rn, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function iw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xt.ScrollDownButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Ke, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Fe({
  className: t,
  children: e,
  position: r = "popper",
  ref: n,
  ...a
}) {
  const i = ct();
  return /* @__PURE__ */ o(xt.Portal, { children: /* @__PURE__ */ p(
    xt.Content,
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
        /* @__PURE__ */ o(aw, {}),
        /* @__PURE__ */ o(
          xt.Viewport,
          {
            className: m(
              "tw:p-1",
              r === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ o(iw, {})
      ]
    }
  ) });
}
function vp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xt.Label,
    {
      ref: e,
      className: m("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...r
    }
  );
}
function Pt({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    xt.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(xt.ItemIndicator, { children: /* @__PURE__ */ o(Ut, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ o(xt.ItemText, { children: e })
      ]
    }
  );
}
function xp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    xt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function sw({ table: t }) {
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
        Ve,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ o(ze, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ o(je, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(Fe, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ o(Pt, { value: `${e}`, children: e }, e)) })
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
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(si, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(li, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(ci, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(wi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const gn = `
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
function lw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function nr(t, e) {
  const r = e ? `${gn}, ${e}` : gn;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && lw(n)
  );
}
function Io({
  className: t,
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = et.useRef(null);
  et.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), et.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        nr(s, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
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
        s.preventDefault(), nr(l)[0].focus();
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
function Ao({
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
function $o({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("tbody", { ref: e, className: m("tw:[&_tr:last-child]:border-0", t), ...r });
}
function yp({
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
function cw(t) {
  et.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? nr(t.current) : [], i = a.indexOf(document.activeElement), s = n.key === "ArrowRight" ? i + 1 : i - 1;
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
function ww(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function dw(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function we({
  className: t,
  onKeyDown: e,
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...i
}) {
  const s = et.useRef(null);
  et.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), cw(s);
  const l = et.useMemo(
    () => s.current ? nr(s.current) : [],
    [s]
  ), c = et.useCallback(
    (d) => {
      const { current: h } = s;
      if (!h || !h.parentElement) return;
      const f = h.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        nr(f).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = u.indexOf(h), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), dw(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), ww(l, x, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = h.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), w = et.useCallback(
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
function Tr({
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
function $e({
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
function kp({
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
function uo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function pw({
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
  var V;
  const [d, h] = R([]), [f, u] = R([]), [g, x] = R({}), [b, N] = R({}), v = j(() => e ?? [], [e]), _ = Zn({
    data: v,
    columns: t,
    getCoreRowModel: ta(),
    ...r && { getPaginationRowModel: Us() },
    onSortingChange: h,
    getSortedRowModel: Qn(),
    onColumnFiltersChange: u,
    getFilteredRowModel: qs(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: N,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let $;
  return c ? $ = Array.from({ length: 10 }).map((S, T) => `skeleton-row-${T}`).map((S) => /* @__PURE__ */ o(we, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ o($e, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ o("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ o(uo, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, S)) : ((V = _.getRowModel().rows) == null ? void 0 : V.length) > 0 ? $ = _.getRowModel().rows.map((I) => /* @__PURE__ */ o(
    we,
    {
      onClick: () => s(I, _),
      "data-state": I.getIsSelected() && "selected",
      children: I.getVisibleCells().map((C) => /* @__PURE__ */ o($e, { children: Ze(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    I.id
  )) : $ = /* @__PURE__ */ o(we, { children: /* @__PURE__ */ o($e, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(rw, { table: _ }),
    /* @__PURE__ */ p(Io, { stickyHeader: i, children: [
      /* @__PURE__ */ o(Ao, { stickyHeader: i, children: _.getHeaderGroups().map((I) => /* @__PURE__ */ o(we, { children: I.headers.map((C) => /* @__PURE__ */ o(Tr, { className: "tw:p-0", children: C.isPlaceholder ? void 0 : Ze(C.column.columnDef.header, C.getContext()) }, C.id)) }, I.id)) }),
      /* @__PURE__ */ o($o, { children: $ })
    ] }),
    r && /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ o(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ o(sw, { table: _ })
  ] });
}
function _p({
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
      children: /* @__PURE__ */ o(Ws, { options: i, children: e })
    }
  );
}
const uw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), bn = (t, e) => t[e] ?? e;
function hw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: n
}) {
  const a = bn(r, "%webView_error_dump_header%"), i = bn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ o(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ o(Dn, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ o("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Np = Object.freeze([
  ...uw,
  "%webView_error_dump_copied_message%"
]);
function Cp({
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
    /* @__PURE__ */ o(be, { asChild: !0, children: n }),
    /* @__PURE__ */ p(oe, { id: i, className: m("tw:min-w-80 tw:max-w-96", a), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(ut, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        hw,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var fw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(fw || {});
function Ep({ id: t, label: e, groups: r }) {
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
  return /* @__PURE__ */ o("div", { id: t, children: /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(Ee, { asChild: !0, children: /* @__PURE__ */ p(z, { variant: "default", children: [
      /* @__PURE__ */ o(di, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ o(Ke, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ o(ue, { children: r.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o(Ir, { children: w.label }),
      /* @__PURE__ */ o(Aa, { children: w.itemType === 0 ? /* @__PURE__ */ o(st, { children: w.items.map((h, f) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        de,
        {
          checked: n[d][f],
          onCheckedChange: () => l(d, f),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ o(
        Jc,
        {
          value: i[d],
          onValueChange: (h) => c(d, h),
          children: w.items.map((h) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(tw, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ o(sr, {})
    ] }, w.label)) })
  ] }) });
}
function Tp({
  id: t,
  category: e,
  downloads: r,
  languages: n,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new Li("en", {
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
            /* @__PURE__ */ o(pi, { className: "tw:h-4 tw:w-4" }),
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
            z,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(ui, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ p(
            z,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(hi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function mw({ id: t, versionHistory: e }) {
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
function Sp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: n,
  versionHistory: a,
  currentVersion: i
}) {
  const s = j(() => Vi(r), [r]), c = ((w) => {
    const d = new Intl.DisplayNames(ji(), { type: "language" });
    return w.map((h) => d.of(h));
  })(n);
  return /* @__PURE__ */ o("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(mw, { versionHistory: a }),
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
function gw({
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
  variant: x = "ghost",
  id: b
}) {
  const [N, v] = R(!1), _ = F(
    (T) => {
      var O;
      const A = (O = t.find((U) => U.label === T)) == null ? void 0 : O.value;
      A && r(
        e.includes(A) ? e.filter((U) => U !== A) : [...e, A]
      );
    },
    [t, e, r]
  ), k = () => c || n, $ = j(() => {
    if (!f) return t;
    const T = t.filter((O) => O.starred).sort((O, U) => O.label.localeCompare(U.label)), A = t.filter((O) => !O.starred).sort((O, U) => {
      const L = e.includes(O.value), Y = e.includes(U.value);
      return L && !Y ? -1 : !L && Y ? 1 : O.label.localeCompare(U.label);
    });
    return [...T, ...A];
  }, [t, e, f]), V = () => {
    r(t.map((T) => T.value));
  }, I = () => {
    r([]);
  }, C = w ?? N;
  return /* @__PURE__ */ o("div", { id: b, className: g, children: /* @__PURE__ */ p(re, { open: C, onOpenChange: d ?? v, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ p(
      z,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
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
          /* @__PURE__ */ o(Mn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(oe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(me, { children: [
      /* @__PURE__ */ o(ir, { placeholder: `Search ${n.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(z, { variant: "ghost", size: "sm", onClick: V, children: i }),
        /* @__PURE__ */ o(z, { variant: "ghost", size: "sm", onClick: I, children: s })
      ] }),
      /* @__PURE__ */ p(ge, { children: [
        /* @__PURE__ */ o(Mr, { children: l }),
        /* @__PURE__ */ o(te, { children: $.map((T) => /* @__PURE__ */ p(
          ee,
          {
            value: T.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ut,
                {
                  className: m(
                    "tw:h-4 tw:w-4",
                    e.includes(T.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ o(fi, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Rp({
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
      gw,
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
      return /* @__PURE__ */ p(rr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ o(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ o(Be, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (u = t.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ o(ut, { children: d })
  ] });
}
const bw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), vn = (t, e) => t[e] ?? e;
function vw({
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
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
      /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(
        z,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(mi, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ p("p", { children: [
        vn(a, "%undoButton_tooltip%"),
        i && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
      /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(
        z,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(gi, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ p("p", { children: [
        vn(a, "%redoButton_tooltip%"),
        i && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function xw({ children: t, editorRef: e }) {
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
function lr({
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
const yw = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function kw({
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
  }, x = (b) => {
    var N, v, _, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((N = i.current) == null || N.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((v = s.current) == null || v.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ p(pe, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
      /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(Ee, { asChild: !0, children: /* @__PURE__ */ o(z, { variant: "outline", className: "tw:h-6", children: yw(t, a, r) }) }) }),
      /* @__PURE__ */ o(Nt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ue,
      {
        style: { zIndex: ea },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ o(Ir, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(sr, {}),
          /* @__PURE__ */ o(
            de,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: eo })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            de,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: ro })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            de,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (b) => {
                var N;
                b.stopPropagation(), l.current = !0, (N = i.current) == null || N.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  lr,
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
const _w = (t, e) => t === "f" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o(In, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o(An, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ o(On, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Nw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), _e(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Cw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n
}) {
  return /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
      /* @__PURE__ */ o($s, { asChild: !0, children: /* @__PURE__ */ o(Ee, { asChild: !0, children: /* @__PURE__ */ o(z, { variant: "outline", className: "tw:h-6", children: _w(t, r) }) }) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: Nw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(ue, { style: { zIndex: ea }, children: [
      /* @__PURE__ */ o(Ir, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o(sr, {}),
      /* @__PURE__ */ p(
        de,
        {
          disabled: t !== "x" && !n,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(On, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        de,
        {
          disabled: t === "x" && !n,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(In, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        de,
        {
          disabled: t === "x" && !n,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(An, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Ew = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Tw({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? bi, { className: e, size: 16 });
}
function xn({
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
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ o("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Tw, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ o("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ o("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(dl, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Sw({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
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
  return /* @__PURE__ */ p(me, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      ir,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(ge, { children: [
      /* @__PURE__ */ o(Mr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(te, { children: i.map((l) => {
        var c;
        return /* @__PURE__ */ o(
          xn,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(st, { children: [
        i.length > 0 && /* @__PURE__ */ o(ra, { alwaysRender: !0 }),
        /* @__PURE__ */ o(te, { children: s.map((l) => {
          var c;
          return /* @__PURE__ */ o(
            xn,
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
function Rw(t, e, r, n) {
  if (!n || n === "p") return [];
  const a = mr[n];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[mr[l].description] ?? mr[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Dw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Mw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Ow = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Dp({
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
  It(() => {
    if (!u.current) return;
    const { width: E } = u.current.getBoundingClientRect();
    E > 0 && (u.current.style.width = `${E}px`);
  }, []);
  const [g, x] = R("generated"), [b, N] = R("*"), [v, _] = R("f"), [k, $] = R(!1), [V, I] = R(!0), [C, S] = R(!1), T = G(!1), A = G(""), [O, U] = R(!1), [L, Y] = R(), [y, K] = R(), [wt, mt] = R(), [Et, pt] = R(), kt = G(null), B = j(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? Ys(), noteMode: "expanded" }
    }),
    [s, l]
  ), it = j(
    () => Rw(
      d,
      () => U(!1),
      c,
      Et
    ),
    [c, Et]
  );
  H(() => {
    var E;
    O || (E = d.current) == null || E.focus();
  }, [v, O]), H(() => {
    var X, q;
    let E;
    T.current = !1, I(!0);
    const P = e == null ? void 0 : e.at(0);
    if (P && wr("note", P)) {
      const nt = (X = P.insert.note) == null ? void 0 : X.caller;
      let tt = "custom";
      nt === eo ? tt = "generated" : nt === ro ? tt = "hidden" : nt && N(nt), x(tt), _(((q = P.insert.note) == null ? void 0 : q.style) ?? "f"), E = setTimeout(() => {
        var ot;
        (ot = d.current) == null || ot.applyUpdate([P]);
      }, 0);
    }
    return () => {
      E && clearTimeout(E);
    };
  }, [e, i]);
  const J = F(
    (E, P, X = !1) => {
      var nt, tt, ot;
      const q = (tt = (nt = d.current) == null ? void 0 : nt.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (q && wr("note", q)) {
        if (q.insert.note) {
          let at;
          E === "custom" ? at = P : E === "generated" ? at = eo : at = ro, q.insert.note.caller = at;
        }
        r == null || r([q]), X && w && i && ((ot = w.current) == null || ot.replaceEmbedUpdate(i, [q]));
      }
    },
    [i, r, w]
  ), dt = F(() => {
    J(g, b, !0), n();
  }, [g, b, n, J]), gt = G(dt);
  It(() => {
    gt.current = dt;
  });
  const ae = G({ book: a.book, chapterNum: a.chapterNum });
  It(() => {
    (ae.current.book !== a.book || ae.current.chapterNum !== a.chapterNum) && (ae.current = { book: a.book, chapterNum: a.chapterNum }, gt.current());
  }, [a.book, a.chapterNum]);
  const ie = () => {
    var P;
    const E = (P = h.current) == null ? void 0 : P.getElementsByClassName("editor-input")[0];
    E != null && E.textContent && navigator.clipboard.writeText(E.textContent);
  }, De = F(
    (E) => {
      x(E), J(E, b);
    },
    [b, J]
  ), se = F(
    (E) => {
      N(E), J(g, E);
    },
    [g, J]
  ), Tt = (E) => {
    var X, q, nt, tt, ot;
    _(E);
    const P = (q = (X = d.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : q.at(0);
    if (P && wr("note", P)) {
      P.insert.note && (P.insert.note.style = E);
      const at = (tt = (nt = P.insert.note) == null ? void 0 : nt.contents) == null ? void 0 : tt.ops;
      v !== "x" && E === "x" ? at == null || at.forEach((Dt) => Dw(Dt)) : v === "x" && E !== "x" && (at == null || at.forEach((Dt) => Mw(Dt))), (ot = d.current) == null || ot.applyUpdate([P, { delete: 1 }]);
    }
  }, $t = (E) => {
    pt(E.contextMarker), S(E.canRedo);
  }, Ht = F(
    (E) => {
      var X, q, nt, tt, ot;
      const P = (q = (X = d.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (P && wr("note", P)) {
        E.content.length > 1 && setTimeout(() => {
          var St;
          (St = d.current) == null || St.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const at = (nt = P.insert.note) == null ? void 0 : nt.style, Dt = (ot = (tt = P.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : ot.ops;
        if (at || $(!1), $(
          at === "x" ? !!(Dt != null && Dt.every((St) => {
            var ve, le;
            if (!((ve = St.attributes) != null && ve.char)) return !0;
            const Wt = ((le = St.attributes) == null ? void 0 : le.char).style;
            return Wt === "xt" || Wt === "xo" || Wt === "xq";
          })) : !!(Dt != null && Dt.every((St) => {
            var ve, le;
            if (!((ve = St.attributes) != null && ve.char)) return !0;
            const Wt = ((le = St.attributes) == null ? void 0 : le.char).style;
            return Wt === "ft" || Wt === "fr" || Wt === "fq";
          }))
        ), !T.current) {
          T.current = !0, A.current = JSON.stringify(P), I(!0);
          return;
        }
        I(JSON.stringify(P) === A.current), J(g, b);
      } else
        $(!1), I(!0);
    },
    [g, b, J]
  ), M = F(() => {
    const E = window.getSelection();
    if (f.current && it.length && E && E.rangeCount > 0) {
      const P = E.getRangeAt(0).getBoundingClientRect(), X = f.current.getBoundingClientRect();
      Y(P.left - X.left), K(P.top - X.top), mt(P.height), U(!0);
    }
  }, [it, f]);
  return H(() => {
    const E = () => {
      O && U(!1);
    };
    return window.addEventListener("click", E), () => {
      window.removeEventListener("click", E);
    };
  }, [O]), H(() => {
    var E;
    O && ((E = kt.current) == null || E.focus());
  }, [O]), H(() => {
    var X;
    const E = ((X = h.current) == null ? void 0 : X.querySelector(".editor-input")) ?? void 0, P = (q) => {
      !O && E && document.activeElement === E && q.key === l ? (q.preventDefault(), M()) : O && q.key === "Escape" && (q.preventDefault(), U(!1));
    };
    return document.addEventListener("keydown", P), () => {
      document.removeEventListener("keydown", P);
    };
  }, [O, M, l]), /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw:flex", children: [
        /* @__PURE__ */ p("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ o(
            Cw,
            {
              isTypeSwitchable: k,
              noteType: v,
              handleNoteTypeChange: Tt,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ o(
            kw,
            {
              callerType: g,
              updateCallerType: De,
              customCaller: b,
              updateCustomCaller: se,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-end tw:gap-4", children: [
          /* @__PURE__ */ o(
            vw,
            {
              onUndoClick: () => {
                var E;
                return (E = d.current) == null ? void 0 : E.undo();
              },
              onRedoClick: () => {
                var E;
                return (E = d.current) == null ? void 0 : E.redo();
              },
              canUndo: !V,
              canRedo: C,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
            /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(
              z,
              {
                onClick: dt,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ o(Ut, {})
              }
            ) }),
            /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
            /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(z, { onClick: n, className: "tw:h-6 tw:w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ o(Be, {}) }) }),
            /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: h,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(xw, { editorRef: d, children: /* @__PURE__ */ o(
              Xs,
              {
                options: B,
                onStateChange: $t,
                onUsjChange: Ht,
                defaultUsj: Ow,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
              /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ o(
                z,
                {
                  onClick: ie,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ o(Dn, {})
                }
              ) }),
              /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
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
    /* @__PURE__ */ p(re, { open: O, children: [
      /* @__PURE__ */ o(
        ul,
        {
          className: "tw:absolute",
          style: {
            top: y,
            left: L,
            height: wt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ o(
        oe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (E) => {
            E.preventDefault(), E.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Sw,
            {
              markerMenuItems: it,
              localizedStrings: c,
              searchRef: kt
            }
          )
        }
      )
    ] })
  ] });
}
const Mp = Object.freeze([
  ...Ew,
  ...Object.entries(mr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...bw
]);
function $a(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((a) => typeof a == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const n = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${n}`;
}
function Iw(t, e, r = !0, n = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Po(t, l, r, !0, a),
      w && n
    ] }, $a(t, l));
  });
}
function Po(t, e, r = !0, n = !0, a = []) {
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
              /* @__PURE__ */ o(Jr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ o("span", { children: i }),
              /* @__PURE__ */ o(Jr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Aw(
        i,
        $a(`${t}\\${i.marker}`, [i]),
        r,
        [...a, t ?? "unknown"]
      );
    });
}
function Aw(t, e, r, n = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? r && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      Jr,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Po(a, t.content, r, !0, [
      ...n,
      a ?? "unknown"
    ])
  ] }, e);
}
function $w({
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
  ] }), h = s && /* @__PURE__ */ p(st, { children: [
    Po(t.marker, [s], n, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = n ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", x = m(f, u);
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: [
      c,
      d
    ] }),
    /* @__PURE__ */ o("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: h }),
    /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ o(st, { children: Iw(t.marker, l, n, w) })
      }
    )
  ] });
}
function Op({
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
  const d = c ?? zi(r, void 0), h = (v, _) => {
    w == null || w(v, _, a);
  }, f = i ? r.findIndex((v) => v === i) : -1, [u, g] = R(f), x = (v, _, k) => {
    if (r.length)
      switch (v.key) {
        case "Enter":
        case " ":
          v.preventDefault(), w == null || w(_, k, a);
          break;
      }
  }, b = (v) => {
    if (r.length)
      switch (v.key) {
        case "ArrowDown":
          v.preventDefault(), g((_) => Math.min(_ + 1, r.length - 1));
          break;
        case "ArrowUp":
          v.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, N = G([]);
  return H(() => {
    var v;
    u >= 0 && u < N.current.length && ((v = N.current[u]) == null || v.focus());
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
          children: r.map((v, _) => {
            const k = v === i, $ = `${a}-${_}`;
            return /* @__PURE__ */ p(st, { children: [
              /* @__PURE__ */ o(
                "li",
                {
                  ref: (V) => {
                    N.current[_] = V;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": v.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === u ? 0 : -1,
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
                  onClick: () => h(v, _),
                  onKeyDown: (V) => x(V, v, _),
                  children: /* @__PURE__ */ o(
                    $w,
                    {
                      footnote: v,
                      layout: n,
                      formatCaller: () => d(v.caller, _),
                      showMarkers: s
                    }
                  )
                },
                $
              ),
              _ < r.length - 1 && n === "vertical" && /* @__PURE__ */ o(or, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Pw(t) {
  const e = [];
  let r = 0;
  const n = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = n.exec(t)) !== null; )
    a.index > r && e.push(t.substring(r, a.index)), e.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), r = n.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Lw({
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
  return /* @__PURE__ */ p(Io, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(Ao, { stickyHeader: !0, children: /* @__PURE__ */ p(we, { children: [
      /* @__PURE__ */ o(Tr, { children: a }),
      /* @__PURE__ */ o(Tr, { children: i })
    ] }) }),
    /* @__PURE__ */ o($o, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      we,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ o($e, { children: Ne(l.reference, "English") }),
          /* @__PURE__ */ o($e, { className: n, children: Pw(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function Pa({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Zo.Root,
    {
      ref: e,
      className: m(
        "tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(
        Zo.Indicator,
        {
          className: m("tw:flex tw:items-center tw:justify-center tw:text-current"),
          children: /* @__PURE__ */ o(Ut, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const Vw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ o(ki, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ o(_i, { className: "tw:h-4 tw:w-4" });
}, Ar = (t, e, r) => /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
  /* @__PURE__ */ p(
    Rt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Vw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ o(Nt, { side: "bottom", children: e })
] }) }), Ip = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ar(e, t)
}), jw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Ar(r, t)
}), Ap = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Ar(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Gr = (t, e, r, n, a, i) => {
  let s = [...r];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), n(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, $p = (t, e, r, n, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => Ar(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p(Sa, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ o(
        br,
        {
          onClick: (c) => {
            c.stopPropagation(), Gr(
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
          children: /* @__PURE__ */ o(vi, {})
        }
      ),
      /* @__PURE__ */ o(
        br,
        {
          onClick: (c) => {
            c.stopPropagation(), Gr(
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
          children: /* @__PURE__ */ o(xi, {})
        }
      ),
      /* @__PURE__ */ o(
        br,
        {
          onClick: (c) => {
            c.stopPropagation(), Gr(
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
          children: /* @__PURE__ */ o(yi, {})
        }
      )
    ] });
  }
}), Pp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Lp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Vp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, zw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", jp = Object.freeze([
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
]), Fw = (t, e, r) => {
  let n = t;
  return e !== "all" && (n = n.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), r !== "" && (n = n.filter((a) => a.items[0].includes(r))), n;
}, Bw = (t, e, r) => t.map((n) => {
  const a = qo(n.key) ? n.key : n.key[0];
  return {
    items: qo(n.key) ? [n.key] : n.key,
    count: n.count,
    status: n.status || zw(a, e, r),
    occurrences: n.occurrences || []
  };
}), jt = (t, e) => t[e] ?? e;
function zp({
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
  const u = jt(r, "%webView_inventory_all%"), g = jt(r, "%webView_inventory_approved%"), x = jt(r, "%webView_inventory_unapproved%"), b = jt(r, "%webView_inventory_unknown%"), N = jt(r, "%webView_inventory_scope_currentBook%"), v = jt(r, "%webView_inventory_scope_chapter%"), _ = jt(r, "%webView_inventory_scope_verse%"), k = jt(r, "%webView_inventory_filter_text%"), $ = jt(
    r,
    "%webView_inventory_show_additional_items%"
  ), V = jt(r, "%webView_inventory_no_results%"), [I, C] = R(!1), [S, T] = R("all"), [A, O] = R(""), [U, L] = R([]), Y = j(() => {
    const B = t ?? [];
    return B.length === 0 ? [] : Bw(B, a, i);
  }, [t, a, i]), y = j(() => {
    if (I) return Y;
    const B = [];
    return Y.forEach((it) => {
      const J = it.items[0], dt = B.find(
        (gt) => gt.items[0] === J
      );
      dt ? (dt.count += it.count, dt.occurrences = dt.occurrences.concat(it.occurrences)) : B.push({
        items: [J],
        count: it.count,
        occurrences: it.occurrences,
        status: it.status
      });
    }), B;
  }, [I, Y]), K = j(() => y.length === 0 ? [] : Fw(y, S, A), [y, S, A]), wt = j(() => {
    var J, dt;
    if (!I) return c;
    const B = (J = n == null ? void 0 : n.tableHeaders) == null ? void 0 : J.length;
    if (!B) return c;
    const it = [];
    for (let gt = 0; gt < B; gt++)
      it.push(
        jw(
          ((dt = n == null ? void 0 : n.tableHeaders) == null ? void 0 : dt[gt]) || "Additional Item",
          gt + 1
        )
      );
    return [...it, ...c];
  }, [n == null ? void 0 : n.tableHeaders, c, I]);
  H(() => {
    K.length === 0 ? L([]) : K.length === 1 && L(K[0].items);
  }, [K]);
  const mt = (B, it) => {
    it.setRowSelection(() => {
      const dt = {};
      return dt[B.index] = !0, dt;
    });
    const J = B.original.items;
    L(J), f && J.length > 0 && f(J[0]);
  }, Et = (B) => {
    if (B === "book" || B === "chapter" || B === "verse")
      l(B);
    else
      throw new Error(`Invalid scope value: ${B}`);
  }, pt = (B) => {
    if (B === "all" || B === "approved" || B === "unapproved" || B === "unknown")
      T(B);
    else
      throw new Error(`Invalid status filter value: ${B}`);
  }, kt = j(() => {
    if (y.length === 0 || U.length === 0) return [];
    const B = y.filter((it) => Fi(
      I ? it.items : [it.items[0]],
      U
    ));
    if (B.length > 1) throw new Error("Selected item is not unique");
    return B.length === 0 ? [] : B[0].occurrences;
  }, [U, I, y]);
  return /* @__PURE__ */ o("div", { id: w, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Ve,
        {
          onValueChange: (B) => pt(B),
          defaultValue: S,
          children: [
            /* @__PURE__ */ o(ze, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o(je, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Fe, { children: [
              /* @__PURE__ */ o(Pt, { value: "all", children: u }),
              /* @__PURE__ */ o(Pt, { value: "approved", children: g }),
              /* @__PURE__ */ o(Pt, { value: "unapproved", children: x }),
              /* @__PURE__ */ o(Pt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Ve, { onValueChange: (B) => Et(B), defaultValue: s, children: [
        /* @__PURE__ */ o(ze, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ o(je, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Fe, { children: [
          /* @__PURE__ */ o(Pt, { value: "book", children: N }),
          /* @__PURE__ */ o(Pt, { value: "chapter", children: v }),
          /* @__PURE__ */ o(Pt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ o(
        lr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: k,
          value: A,
          onChange: (B) => {
            O(B.target.value);
          }
        }
      ),
      n && /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ p(_t, { children: [
        /* @__PURE__ */ o(Rt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ o(
            Pa,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: I,
              onCheckedChange: (B) => {
                C(B);
              }
            }
          ),
          /* @__PURE__ */ o(ut, { className: "tw:m-1 tw:truncate", children: (n == null ? void 0 : n.checkboxText) ?? $ })
        ] }) }),
        /* @__PURE__ */ o(Nt, { children: (n == null ? void 0 : n.checkboxText) ?? $ })
      ] }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      pw,
      {
        columns: wt,
        data: K,
        onRowClickHandler: mt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: V
      }
    ) }),
    kt.length > 0 && /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      Lw,
      {
        classNameForText: h,
        occurrenceData: kt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Kw = "16rem", qw = "3rem", La = et.createContext(void 0);
function $r() {
  const t = et.useContext(La);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Uw({
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
  const [w, d] = et.useState(t), h = e ?? w, f = et.useCallback(
    (_) => {
      const k = typeof _ == "function" ? _(h) : _;
      r ? r(k) : d(k);
    },
    [r, h]
  ), u = et.useCallback(() => f((_) => !_), [f]), g = h ? "expanded" : "collapsed", N = ct() === "ltr" ? s : s === "primary" ? "secondary" : "primary", v = et.useMemo(
    () => ({
      state: g,
      open: h,
      setOpen: f,
      toggleSidebar: u,
      side: N
    }),
    [g, h, f, u, N]
  );
  return /* @__PURE__ */ o(La.Provider, { value: v, children: /* @__PURE__ */ o(yt, { delayDuration: 0, children: /* @__PURE__ */ o(
    "div",
    {
      style: (
        // CSS custom properties are not in React.CSSProperties; cast is required to use them
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": Kw,
          "--sidebar-width-icon": qw,
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
function Gw({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = $r();
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
function Fp({
  className: t,
  onClick: e,
  ref: r,
  ...n
}) {
  const a = $r();
  return /* @__PURE__ */ p(
    z,
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
        a.side === "primary" ? /* @__PURE__ */ o(Ni, {}) : /* @__PURE__ */ o(Ci, {}),
        /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Bp({
  className: t,
  ref: e,
  ...r
}) {
  const { toggleSidebar: n } = $r();
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
function Hw({
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
function Kp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    lr,
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
function qp({
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
function Up({
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
function Gp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    or,
    {
      ref: e,
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...r
    }
  );
}
function Ww({
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
function yn({
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
function kn({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? qe : "div",
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
function Hp({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? qe : "button",
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
function _n({
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
function Yw({
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
function Xw({
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
const Jw = he(
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
function Zw({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: n = "default",
  tooltip: a,
  className: i,
  ref: s,
  ...l
}) {
  const c = t ? qe : "button", { state: w } = $r(), d = /* @__PURE__ */ o(
    c,
    {
      ref: s,
      "data-sidebar": "menu-button",
      "data-size": n,
      "data-active": e,
      className: m(Jw({ variant: r, size: n }), i),
      ...l
    }
  );
  return a ? (typeof a == "string" && (a = {
    children: a
  }), /* @__PURE__ */ p(_t, { children: [
    /* @__PURE__ */ o(Rt, { asChild: !0, children: d }),
    /* @__PURE__ */ o(Nt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
  ] })) : d;
}
function Wp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    e ? qe : "button",
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
function Yp({
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
function Xp({
  className: t,
  showIcon: e = !1,
  ref: r,
  ...n
}) {
  const a = et.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ o(uo, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          uo,
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
function Jp({
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
function Zp({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o("li", { ref: t, ...e });
}
function Qp({
  asChild: t = !1,
  size: e = "md",
  isActive: r,
  className: n,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(
    t ? qe : "a",
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
function Qw({
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
  const w = F(
    (f, u) => {
      n(f, u);
    },
    [n]
  ), d = F(
    (f) => {
      const u = r.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [r]
  ), h = F(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    Gw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", c),
      children: /* @__PURE__ */ p(Ww, { children: [
        /* @__PURE__ */ p(yn, { children: [
          /* @__PURE__ */ o(kn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ o(_n, { children: /* @__PURE__ */ o(Yw, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ o(Xw, { children: /* @__PURE__ */ o(
            Zw,
            {
              onClick: () => w(f),
              isActive: h(f),
              children: /* @__PURE__ */ o("span", { className: "tw:pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(yn, { children: [
          /* @__PURE__ */ o(kn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ o(_n, { className: "tw:pl-3", children: /* @__PURE__ */ o(
            io,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: el },
              options: r.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = d(f);
                w(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(Ei, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Lo = ar(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = ct();
    return /* @__PURE__ */ p("div", { id: s, className: m("tw:relative", { "tw:w-full": n }, a), children: [
      /* @__PURE__ */ o(
        En,
        {
          className: m(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": c === "rtl" },
            { "tw:left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        lr,
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
        z,
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
            /* @__PURE__ */ o(Be, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Lo.displayName = "SearchBar";
function tu({
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
      Lo,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Uw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ o(
            Qw,
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
          /* @__PURE__ */ o(Hw, { className: "tw:min-w-[215px]", children: n })
        ]
      }
    )
  ] });
}
const ce = "scrBook", td = "scrRef", ke = "source", ed = "details", rd = "Scripture Reference", od = "Scripture Book", Va = "Type", nd = "Details";
function ad(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (n) => `${n.start.book} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: ce,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? rd,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? lt.bookIdToEnglishName(a.start.book) : n.row.groupingColumnId === ce ? Ne(a.start) : void 0;
      },
      getGroupingValue: (n) => lt.bookIdToNumber(n.start.book),
      sortingFn: (n, a) => Zr(n.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => Ne(n.start),
      id: td,
      header: void 0,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? void 0 : Ne(a.start);
      },
      sortingFn: (n, a) => Zr(n.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: ke,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Va : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, a) => n.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: ed,
      header: (t == null ? void 0 : t.detailsColumnName) ?? nd,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const id = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Zr(t.start, t.end) === 0 ? `${Pr(t.start)}+${e}` : `${Pr(t.start)}+${e}-${Pr(t.end)}+${r}`;
}, Nn = (t) => `${id({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function eu({
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
  const [w, d] = R([]), [h, f] = R([{ id: ce, desc: !1 }]), [u, g] = R({}), x = j(
    () => t.flatMap((S) => S.data.map((T) => ({
      ...T,
      source: S.source
    }))),
    [t]
  ), b = j(
    () => ad(
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
    w.includes(ke) ? f([
      { id: ke, desc: !1 },
      { id: ce, desc: !1 }
    ]) : f([{ id: ce, desc: !1 }]);
  }, [w]);
  const N = Zn({
    data: x,
    columns: b,
    state: {
      grouping: w,
      sorting: h,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Hs(),
    getGroupedRowModel: Gs(),
    getCoreRowModel: ta(),
    getSortedRowModel: Qn(),
    getRowId: Nn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  H(() => {
    if (l) {
      const S = N.getSelectedRowModel().rowsById, T = Object.keys(S);
      if (T.length === 1) {
        const A = x.find((O) => Nn(O) === T[0]) || void 0;
        A && l(A);
      }
    }
  }, [u, x, l, N]);
  const v = a ?? od, _ = i ?? Va, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${v}`, value: [ce] },
    { label: `Group by ${_}`, value: [ke] },
    {
      label: `Group by ${v} and ${_}`,
      value: [ce, ke]
    },
    {
      label: `Group by ${_} and ${v}`,
      value: [ke, ce]
    }
  ], $ = (S) => {
    d(JSON.parse(S));
  }, V = (S, T) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(T);
  }, I = (S, T) => S.getIsGrouped() ? "" : m("banded-row", T % 2 === 0 ? "even" : "odd"), C = (S, T, A) => {
    if (!((S == null ? void 0 : S.length) === 0 || T.depth < A.column.getGroupedIndex())) {
      if (T.getIsGrouped())
        switch (T.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (T.depth) {
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
      Ve,
      {
        value: JSON.stringify(w),
        onValueChange: (S) => {
          $(S);
        },
        children: [
          /* @__PURE__ */ o(ze, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ o(je, {}) }),
          /* @__PURE__ */ o(Fe, { position: "item-aligned", children: /* @__PURE__ */ o(ow, { children: k.map((S) => /* @__PURE__ */ o(Pt, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Io, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ o(Ao, { children: N.getHeaderGroups().map((S) => /* @__PURE__ */ o(we, { children: S.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(Tr, { colSpan: T.colSpan, className: "tw:sticky top-0", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ o(
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
          Ze(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, S.id)) }),
      /* @__PURE__ */ o($o, { children: N.getRowModel().rows.map((S, T) => {
        const A = ct();
        return /* @__PURE__ */ o(
          we,
          {
            "data-state": S.getIsSelected() ? "selected" : "",
            className: m(I(S, T)),
            onClick: (O) => V(S, O),
            children: S.getVisibleCells().map((O) => {
              if (!(O.getIsPlaceholder() || O.column.columnDef.enableGrouping && !O.getIsGrouped() && (O.column.columnDef.id !== ke || !r)))
                return /* @__PURE__ */ o(
                  $e,
                  {
                    className: m(
                      O.column.columnDef.id,
                      "tw:p-[1px]",
                      C(w, S, O)
                    ),
                    children: O.getIsGrouped() ? /* @__PURE__ */ p(
                      z,
                      {
                        variant: "link",
                        onClick: S.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          S.getIsExpanded() && /* @__PURE__ */ o(Ke, {}),
                          !S.getIsExpanded() && (A === "ltr" ? /* @__PURE__ */ o(Pe, {}) : /* @__PURE__ */ o(Xr, {})),
                          " ",
                          Ze(O.column.columnDef.cell, O.getContext()),
                          " (",
                          S.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ze(O.column.columnDef.cell, O.getContext())
                  },
                  O.id
                );
            })
          },
          S.id
        );
      }) })
    ] })
  ] });
}
const Vo = (t, e) => t.filter((r) => {
  try {
    return Je(r) === e;
  } catch {
    return !1;
  }
}), ja = (t, e, r) => Vo(t, e).every((n) => r.includes(n));
function sd({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: n,
  localizedStrings: a
}) {
  const i = Vo(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => n(t),
      className: m(
        ja(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: pl(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const Cn = 5, Hr = 6;
function ld({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: n,
  localizedBookNames: a
}) {
  const i = n["%webView_book_selector_books_selected%"], s = n["%webView_book_selector_select_books%"], l = n["%webView_book_selector_search_books%"], c = n["%webView_book_selector_select_all%"], w = n["%webView_book_selector_clear_all%"], d = n["%webView_book_selector_no_book_found%"], h = n["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: n == null ? void 0 : n["%scripture_section_ot_long%"],
    ntLong: n == null ? void 0 : n["%scripture_section_nt_long%"],
    dcLong: n == null ? void 0 : n["%scripture_section_dc_long%"],
    extraLong: n == null ? void 0 : n["%scripture_section_extra_long%"]
  }, [b, N] = R(!1), [v, _] = R(""), k = G(void 0), $ = G(!1);
  if (t.length !== lt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const V = j(() => lt.allBookIds.filter(
    (L, Y) => t[Y] === "1" && !lt.isObsolete(lt.bookIdToNumber(L))
  ), [t]), I = j(() => {
    if (!v.trim()) {
      const y = {
        [W.OT]: [],
        [W.NT]: [],
        [W.DC]: [],
        [W.Extra]: []
      };
      return V.forEach((K) => {
        const wt = Je(K);
        y[wt].push(K);
      }), y;
    }
    const L = V.filter(
      (y) => _o(y, v, a)
    ), Y = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return L.forEach((y) => {
      const K = Je(y);
      Y[K].push(y);
    }), Y;
  }, [V, v, a]), C = F(
    (L, Y = !1) => {
      if (!Y || !k.current) {
        r(
          e.includes(L) ? e.filter((pt) => pt !== L) : [...e, L]
        ), k.current = L;
        return;
      }
      const y = V.findIndex((pt) => pt === k.current), K = V.findIndex((pt) => pt === L);
      if (y === -1 || K === -1) return;
      const [wt, mt] = [
        Math.min(y, K),
        Math.max(y, K)
      ], Et = V.slice(wt, mt + 1).map((pt) => pt);
      r(
        e.includes(L) ? e.filter((pt) => !Et.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...Et])]
      );
    },
    [e, r, V]
  ), S = (L) => {
    C(L, $.current), $.current = !1;
  }, T = (L, Y) => {
    L.preventDefault(), C(Y, L.shiftKey);
  }, A = F(
    (L) => {
      const Y = Vo(V, L).map((y) => y);
      r(
        ja(V, L, e) ? e.filter((y) => !Y.includes(y)) : [.../* @__PURE__ */ new Set([...e, ...Y])]
      );
    },
    [e, r, V]
  ), O = () => {
    r(V.map((L) => L));
  }, U = () => {
    r([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(W).map((L) => /* @__PURE__ */ o(
      sd,
      {
        section: L,
        availableBookIds: V,
        selectedBookIds: e,
        onToggle: A,
        localizedStrings: n
      },
      L
    )) }),
    /* @__PURE__ */ p(
      re,
      {
        open: b,
        onOpenChange: (L) => {
          N(L), L || _("");
        },
        children: [
          /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ p(
            z,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ o(Mn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(oe, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ p(
            me,
            {
              shouldFilter: !1,
              onKeyDown: (L) => {
                L.key === "Enter" && ($.current = L.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  ir,
                  {
                    placeholder: l,
                    value: v,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ o(z, { variant: "ghost", size: "sm", onClick: O, children: c }),
                  /* @__PURE__ */ o(z, { variant: "ghost", size: "sm", onClick: U, children: w })
                ] }),
                /* @__PURE__ */ p(ge, { children: [
                  /* @__PURE__ */ o(Mr, { children: d }),
                  Object.values(W).map((L, Y) => {
                    const y = I[L];
                    if (y.length !== 0)
                      return /* @__PURE__ */ p($n, { children: [
                        /* @__PURE__ */ o(
                          te,
                          {
                            heading: oa(L, f, u, g, x),
                            children: y.map((K) => /* @__PURE__ */ o(
                              aa,
                              {
                                bookId: K,
                                isSelected: e.includes(K),
                                onSelect: () => S(K),
                                onMouseDown: (wt) => T(wt, K),
                                section: Je(K),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: no(K, a),
                                className: "tw:flex tw:items-center"
                              },
                              K
                            ))
                          }
                        ),
                        Y < Object.values(W).length - 1 && /* @__PURE__ */ o(ra, {})
                      ] }, L);
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
        e.length === Hr ? Hr : Cn
      ).map((L) => /* @__PURE__ */ o(rr, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ie(L, a) }, L)),
      e.length > Hr && /* @__PURE__ */ o(
        rr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Cn} ${h}`
        }
      )
    ] })
  ] });
}
const ru = Object.freeze([
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
function ou({
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
  const w = xe(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = xe(
    s,
    "%webView_scope_selector_current_verse%"
  ), h = xe(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = xe(s, "%webView_scope_selector_current_book%"), u = xe(s, "%webView_scope_selector_choose_books%"), g = xe(s, "%webView_scope_selector_scope%"), x = xe(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: h, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], N = e ? b.filter((v) => e.includes(v.value)) : b;
  return /* @__PURE__ */ p("div", { id: c, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(ut, { children: g }),
      /* @__PURE__ */ o(
        sa,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: N.map(({ value: v, label: _, id: k }) => /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(ao, { className: "tw:me-2", value: v, id: k }),
            /* @__PURE__ */ o(ut, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(ut, { children: x }),
      /* @__PURE__ */ o(
        ld,
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
const Wr = {
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
function nu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: n = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Wr,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([w, d]) => [
          w,
          w === d && w in Wr ? Wr[w] : d
        ]
      )
    )
  }, c = ct();
  return /* @__PURE__ */ p(
    Ve,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ o(ze, { size: a, className: m("pr-twp tw:w-auto", i), children: /* @__PURE__ */ o(
          je,
          {
            placeholder: l[Q(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ o(
          Fe,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: Ge },
            children: t.map((w) => /* @__PURE__ */ o(Pt, { value: `${w}`, children: l[Q(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function au({ children: t }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw:grid", children: t });
}
function iu({
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
function su({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ o(or, {}) : ""
  ] });
}
function za(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, n]) => "menuItem" in n && n.menuItem === e
  )) == null ? void 0 : r[0];
}
function Sr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ o(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Fa = (t, e, r, n) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(_t, { children: [
  /* @__PURE__ */ o(Rt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    po,
    {
      onClick: () => {
        n(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(Sr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(Sr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Xc, { children: [
    /* @__PURE__ */ o(Zc, { children: l.label }),
    /* @__PURE__ */ o(Yc, { children: /* @__PURE__ */ o(Qc, { children: Fa(
      t,
      e,
      za(t, l.id),
      n
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(Nt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function ho({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(pe, { variant: i, children: [
    /* @__PURE__ */ o(Ee, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(z, { variant: s, size: "icon", children: n ?? /* @__PURE__ */ o(Ti, {}) }) }),
    /* @__PURE__ */ o(ue, { align: "start", style: { zIndex: Ge }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p($n, { children: [
      /* @__PURE__ */ o(Aa, { children: /* @__PURE__ */ o(yt, { children: Fa(e.groups, e.items, c, t) }) }),
      w < d.length - 1 && /* @__PURE__ */ o(sr, {})
    ] }, c)) })
  ] });
}
const Ba = et.forwardRef(
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
function lu({
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
  return /* @__PURE__ */ p(Ba, { className: `tw:w-full tw:border ${i}`, id: a, children: [
    r && /* @__PURE__ */ o(
      ho,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ o(Si, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      n && /* @__PURE__ */ o(
        ho,
        {
          onSelectMenuItem: e,
          menuData: n,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(Ri, {}),
          className: "tw:h-full"
        }
      ),
      c
    ] })
  ] });
}
function cu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: n,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(Ba, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ o(
    ho,
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
const Ka = et.forwardRef(({ className: t, ...e }, r) => {
  const n = ct();
  return /* @__PURE__ */ o(
    Lt.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: n
    }
  );
});
Ka.displayName = Lt.List.displayName;
const qa = et.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Lt.List,
  {
    ref: r,
    className: m(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
qa.displayName = Lt.List.displayName;
const cd = et.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Lt.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Ua = et.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  Lt.Content,
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
Ua.displayName = Lt.Content.displayName;
function wu({
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
        Lo,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ p(Ka, { children: [
      /* @__PURE__ */ o(qa, { children: t.map((l) => /* @__PURE__ */ o(cd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ o(Ua, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function wd({ ...t }) {
  return /* @__PURE__ */ o(Kt.Menu, { ...t });
}
function dd({ ...t }) {
  return /* @__PURE__ */ o(Kt.Sub, { "data-slot": "menubar-sub", ...t });
}
function pd({
  className: t,
  variant: e = "default",
  ref: r,
  ...n
}) {
  const a = et.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(Oo.Provider, { value: a, children: /* @__PURE__ */ o(
    Kt.Root,
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
function ud({
  className: t,
  ref: e,
  ...r
}) {
  const n = ne();
  return /* @__PURE__ */ o(
    Kt.Trigger,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Re({ variant: n.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...r
    }
  );
}
function hd({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  const i = ne();
  return /* @__PURE__ */ p(
    Kt.SubTrigger,
    {
      ref: n,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        Re({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Pe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function fd({
  className: t,
  ref: e,
  ...r
}) {
  const n = ne();
  return /* @__PURE__ */ o(
    Kt.SubContent,
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
function md({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: n = 8,
  ref: a,
  ...i
}) {
  const s = ne();
  return /* @__PURE__ */ o(Kt.Portal, { children: /* @__PURE__ */ o(
    Kt.Content,
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
function gd({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = ne();
  return /* @__PURE__ */ o(
    Kt.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        Re({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
}
function bd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Kt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
const Xe = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var n;
      (n = t.current) == null || n.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Ga = (t, e, r, n) => {
  if (!r) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(_t, { children: [
      /* @__PURE__ */ o(Rt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        gd,
        {
          onClick: () => {
            n(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ o(Sr, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ o(Sr, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(dd, { children: [
        /* @__PURE__ */ o(hd, { children: w.label }),
        /* @__PURE__ */ o(fd, { children: Ga(
          t,
          e,
          za(t, w.id),
          n
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ o(Nt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ o(bd, {}, `separator-${i}`)), c;
  });
};
function vd({
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
  if (Js(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, h) => {
    var g, x, b, N;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Xe(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Xe(i, [f, u]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), Xe(s, [f, u]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Xe(l, [f, u]);
        break;
      case "alt+h":
        (N = c.current) == null || N.focus(), Xe(c, [f, u]);
        break;
    }
  }), H(() => {
    if (!r || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ o(pd, { ref: a, className: "pr-twp tw:border-0 tw:bg-transparent", variant: n, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, h]) => typeof d == "boolean" || typeof h == "boolean" ? 0 : d.order - h.order).map(([d, h]) => /* @__PURE__ */ p(wd, { children: [
      /* @__PURE__ */ o(ud, { ref: w(d), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ o(
        md,
        {
          style: { zIndex: Ge },
          children: /* @__PURE__ */ o(yt, { children: Ga(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function du(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function pu({
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
                    vd,
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
const xd = (t, e) => t[e] ?? e;
function uu({
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
  const w = xd(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, h] = R(!1), f = (g) => {
    a && a(g), n && n([g, ...r.filter((x) => x !== g)]), i && r.find((x) => x === g) && i([...r.filter((x) => x !== g)]), h(!1);
  }, u = (g, x) => {
    var N, v, _, k, $, V;
    const b = x !== g ? ((v = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : v[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${($ = t[g]) == null ? void 0 : $.autonym} (${b})` : (V = t[g]) == null ? void 0 : V.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: m("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Ve,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => h(g),
        children: [
          /* @__PURE__ */ o(ze, { children: /* @__PURE__ */ o(je, {}) }),
          /* @__PURE__ */ o(
            Fe,
            {
              style: { zIndex: Ge },
              children: Object.keys(t).map((g) => /* @__PURE__ */ o(Pt, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ o("div", { className: "tw:pt-3", children: /* @__PURE__ */ o(ut, { className: "tw:font-normal tw:text-muted-foreground", children: _e(w, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function yd({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ o(ut, { children: e(t) }) : r ? /* @__PURE__ */ o(ut, { children: r(t) }) : /* @__PURE__ */ o(ut, { children: t });
}
function hu({
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
      Pa,
      {
        className: "tw:me-2 tw:align-middle",
        checked: n.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ o(
      yd,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function fu({
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
            !e && f && w && /* @__PURE__ */ o("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ p(pe, { children: [
              /* @__PURE__ */ o(Ee, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(z, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(Ko, {}) }) }),
              /* @__PURE__ */ o(ue, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ p(pe, { children: [
              /* @__PURE__ */ o(Ee, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(z, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(Ko, {}) }) }),
              /* @__PURE__ */ o(ue, { align: "end", children: w })
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
const kd = ar(({ className: t, ...e }, r) => /* @__PURE__ */ o(Di, { size: 35, className: m("tw:animate-spin", t), ...e, ref: r }));
kd.displayName = "Spinner";
function mu({
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
      lr,
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
const _d = he(
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
function gu({
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
        _d({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function bu({
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
function vu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: m("tw:text-sm tw:[&_p]:leading-relaxed", t), ...r });
}
const xu = ft.Root, yu = ft.Trigger, ku = ft.Group, _u = ft.Portal, Nu = ft.Sub, Cu = ft.RadioGroup;
function Eu({
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
        /* @__PURE__ */ o(Pe, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Tu({
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
function Su({
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
function Ru({
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
function Du({
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
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ft.ItemIndicator, { children: /* @__PURE__ */ o(Ut, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function Mu({
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
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ft.ItemIndicator, { children: /* @__PURE__ */ o(fo, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Ou({
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
function Iu({
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
function Au({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ha = et.createContext({
  direction: "bottom"
});
function $u({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const n = et.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ o(Ha.Provider, { value: n, children: /* @__PURE__ */ o(
    fe.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
const Pu = fe.Trigger, Nd = fe.Portal, Lu = fe.Close;
function Cd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    fe.Overlay,
    {
      ref: e,
      className: m("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...r
    }
  );
}
function Vu({
  className: t,
  children: e,
  hideDrawerHandle: r = !1,
  ref: n,
  ...a
}) {
  const { direction: i = "bottom" } = et.useContext(Ha), s = {
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
  return /* @__PURE__ */ p(Nd, { children: [
    /* @__PURE__ */ o(Cd, {}),
    /* @__PURE__ */ p(
      fe.Content,
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
function ju({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function zu({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { className: m("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function Fu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    fe.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function Bu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    fe.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function Ku({
  className: t,
  value: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    Qo.Root,
    {
      ref: r,
      className: m(
        "pr-twp tw:relative tw:h-4 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-secondary",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o(
        Qo.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function qu({
  className: t,
  direction: e,
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    yo.Group,
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
function fr(t) {
  if (t !== void 0)
    return typeof t == "number" ? String(t) : t;
}
function Uu({
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    yo.Panel,
    {
      defaultSize: fr(t),
      minSize: fr(e),
      maxSize: fr(r),
      collapsedSize: fr(n),
      ...a
    }
  );
}
function Gu({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yo.Separator,
    {
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-hidden tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 rtl:tw:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ o(Mi, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function Hu({ ...t }) {
  return /* @__PURE__ */ o(
    Zs,
    {
      className: "tw:toaster tw:group",
      toastOptions: {
        classNames: {
          toast: "tw:group tw:toast tw:group-[.tw\\:toaster]:bg-background tw:group-[.tw\\:toaster]:text-foreground tw:group-[.tw\\:toaster]:border-border tw:group-[.tw\\:toaster]:shadow-lg",
          description: "tw:group-[.tw\\:toast]:text-muted-foreground",
          actionButton: "tw:group-[.tw\\:toast]:bg-primary tw:group-[.tw\\:toast]:text-primary-foreground",
          cancelButton: "tw:group-[.tw\\:toast]:bg-muted tw:group-[.tw\\:toast]:text-muted-foreground"
        }
      },
      ...t
    }
  );
}
function Wu({
  className: t,
  ref: e,
  ...r
}) {
  const n = ct();
  return /* @__PURE__ */ p(
    dr.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...r,
      dir: n,
      children: [
        /* @__PURE__ */ o(dr.Track, { className: "tw:relative tw:h-2 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-secondary", children: /* @__PURE__ */ o(dr.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ o(dr.Thumb, { className: "tw:block tw:h-5 tw:w-5 tw:rounded-full tw:border-2 tw:border-primary tw:bg-background tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function Yu({
  className: t,
  ref: e,
  ...r
}) {
  const n = ct();
  return /* @__PURE__ */ o(
    tn.Root,
    {
      className: m(
        "tw:peer pr-twp tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...r,
      ref: e,
      children: /* @__PURE__ */ o(
        tn.Thumb,
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
const Xu = Lt.Root;
function Ju({
  className: t,
  ref: e,
  ...r
}) {
  const n = ct();
  return /* @__PURE__ */ o(
    Lt.List,
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
function Zu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Lt.Trigger,
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
function Qu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Lt.Content,
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
function th({
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
const eh = (t, e) => {
  H(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function Ed(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Td = (t, e, r = {}) => {
  const n = G(e);
  n.current = e;
  const a = G(r);
  a.current = Ed(a.current);
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
}, Yr = () => !1, rh = (t, e) => {
  const [r] = Td(
    F(async () => {
      if (!t) return Yr;
      const n = await Promise.resolve(t(e));
      return async () => n();
    }, [e, t]),
    Yr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  H(() => () => {
    r !== Yr && r();
  }, [r]);
};
function oh(t) {
  H(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Sd(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && n ? r.insertBefore(a, n) : r.appendChild(a);
}
Sd(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:.25rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(var(--tw-spacing) * 0)}.tw\\:inset-x-0{inset-inline:calc(var(--tw-spacing) * 0)}.tw\\:inset-y-0{inset-block:calc(var(--tw-spacing) * 0)}.tw\\:start-2{inset-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(var(--tw-spacing) * 0)}.tw\\:top-1\\.5{top:calc(var(--tw-spacing) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-2\\.5{top:calc(var(--tw-spacing) * 2.5)}.tw\\:top-3\\.5{top:calc(var(--tw-spacing) * 3.5)}.tw\\:top-4{top:calc(var(--tw-spacing) * 4)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-\\[50\\%\\]{top:50%}.tw\\:-right-1{right:calc(var(--tw-spacing) * -1)}.tw\\:right-0{right:calc(var(--tw-spacing) * 0)}.tw\\:right-1{right:calc(var(--tw-spacing) * 1)}.tw\\:right-3{right:calc(var(--tw-spacing) * 3)}.tw\\:right-4{right:calc(var(--tw-spacing) * 4)}.tw\\:bottom-0{bottom:calc(var(--tw-spacing) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(var(--tw-spacing) * 0)}.tw\\:left-2{left:calc(var(--tw-spacing) * 2)}.tw\\:left-3{left:calc(var(--tw-spacing) * 3)}.tw\\:left-4{left:calc(var(--tw-spacing) * 4)}.tw\\:left-\\[50\\%\\]{left:50%}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-2{grid-row-start:2}.tw\\:\\!m-0{margin:calc(var(--tw-spacing) * 0)!important}.tw\\:m-0{margin:calc(var(--tw-spacing) * 0)}.tw\\:m-1{margin:calc(var(--tw-spacing) * 1)}.tw\\:m-2{margin:calc(var(--tw-spacing) * 2)}.tw\\:-mx-1{margin-inline:calc(var(--tw-spacing) * -1)}.tw\\:mx-0{margin-inline:calc(var(--tw-spacing) * 0)}.tw\\:mx-1{margin-inline:calc(var(--tw-spacing) * 1)}.tw\\:mx-2{margin-inline:calc(var(--tw-spacing) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(var(--tw-spacing) * 3.5)}.tw\\:mx-8{margin-inline:calc(var(--tw-spacing) * 8)}.tw\\:mx-auto{margin-inline:auto}.tw\\:my-1{margin-block:calc(var(--tw-spacing) * 1)}.tw\\:my-2\\.5{margin-block:calc(var(--tw-spacing) * 2.5)}.tw\\:my-4{margin-block:calc(var(--tw-spacing) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(var(--tw-spacing) * 1)}.tw\\:ms-2{margin-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:ms-5{margin-inline-start:calc(var(--tw-spacing) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:me-2{margin-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:mt-1{margin-top:calc(var(--tw-spacing) * 1)}.tw\\:mt-2{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:mt-3{margin-top:calc(var(--tw-spacing) * 3)}.tw\\:mt-4{margin-top:calc(var(--tw-spacing) * 4)}.tw\\:mt-6{margin-top:calc(var(--tw-spacing) * 6)}.tw\\:mt-24{margin-top:calc(var(--tw-spacing) * 24)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(var(--tw-spacing) * 1)}.tw\\:mr-2{margin-right:calc(var(--tw-spacing) * 2)}.tw\\:mr-3{margin-right:calc(var(--tw-spacing) * 3)}.tw\\:mr-4{margin-right:calc(var(--tw-spacing) * 4)}.tw\\:mr-24{margin-right:calc(var(--tw-spacing) * 24)}.tw\\:mb-1{margin-bottom:calc(var(--tw-spacing) * 1)}.tw\\:mb-2{margin-bottom:calc(var(--tw-spacing) * 2)}.tw\\:mb-3{margin-bottom:calc(var(--tw-spacing) * 3)}.tw\\:mb-4{margin-bottom:calc(var(--tw-spacing) * 4)}.tw\\:mb-24{margin-bottom:calc(var(--tw-spacing) * 24)}.tw\\:ml-2{margin-left:calc(var(--tw-spacing) * 2)}.tw\\:ml-4{margin-left:calc(var(--tw-spacing) * 4)}.tw\\:ml-24{margin-left:calc(var(--tw-spacing) * 24)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-4{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:h-1{height:calc(var(--tw-spacing) * 1)}.tw\\:h-2{height:calc(var(--tw-spacing) * 2)}.tw\\:h-2\\.5{height:calc(var(--tw-spacing) * 2.5)}.tw\\:h-3{height:calc(var(--tw-spacing) * 3)}.tw\\:h-3\\.5{height:calc(var(--tw-spacing) * 3.5)}.tw\\:h-4{height:calc(var(--tw-spacing) * 4)}.tw\\:h-5{height:calc(var(--tw-spacing) * 5)}.tw\\:h-6{height:calc(var(--tw-spacing) * 6)}.tw\\:h-7{height:calc(var(--tw-spacing) * 7)}.tw\\:h-8{height:calc(var(--tw-spacing) * 8)}.tw\\:h-9{height:calc(var(--tw-spacing) * 9)}.tw\\:h-10{height:calc(var(--tw-spacing) * 10)}.tw\\:h-11{height:calc(var(--tw-spacing) * 11)}.tw\\:h-12{height:calc(var(--tw-spacing) * 12)}.tw\\:h-14{height:calc(var(--tw-spacing) * 14)}.tw\\:h-20{height:calc(var(--tw-spacing) * 20)}.tw\\:h-24{height:calc(var(--tw-spacing) * 24)}.tw\\:h-32{height:calc(var(--tw-spacing) * 32)}.tw\\:h-40{height:calc(var(--tw-spacing) * 40)}.tw\\:h-64{height:calc(var(--tw-spacing) * 64)}.tw\\:h-96{height:calc(var(--tw-spacing) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[1px\\]{height:1px}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[100px\\]{height:100px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-5{max-height:calc(var(--tw-spacing) * 5)}.tw\\:max-h-10{max-height:calc(var(--tw-spacing) * 10)}.tw\\:max-h-80{max-height:calc(var(--tw-spacing) * 80)}.tw\\:max-h-96{max-height:calc(var(--tw-spacing) * 96)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(var(--tw-spacing) * 0)}.tw\\:min-h-11{min-height:calc(var(--tw-spacing) * 11)}.tw\\:min-h-\\[80px\\]{min-height:80px}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(var(--tw-spacing) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(var(--tw-spacing) * 2)}.tw\\:w-2\\.5{width:calc(var(--tw-spacing) * 2.5)}.tw\\:w-3{width:calc(var(--tw-spacing) * 3)}.tw\\:w-3\\.5{width:calc(var(--tw-spacing) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(var(--tw-spacing) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(var(--tw-spacing) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(var(--tw-spacing) * 6)}.tw\\:w-7{width:calc(var(--tw-spacing) * 7)}.tw\\:w-8{width:calc(var(--tw-spacing) * 8)}.tw\\:w-9{width:calc(var(--tw-spacing) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(var(--tw-spacing) * 10)}.tw\\:w-11{width:calc(var(--tw-spacing) * 11)}.tw\\:w-12{width:calc(var(--tw-spacing) * 12)}.tw\\:w-20{width:calc(var(--tw-spacing) * 20)}.tw\\:w-24{width:calc(var(--tw-spacing) * 24)}.tw\\:w-32{width:calc(var(--tw-spacing) * 32)}.tw\\:w-48{width:calc(var(--tw-spacing) * 48)}.tw\\:w-56{width:calc(var(--tw-spacing) * 56)}.tw\\:w-60{width:calc(var(--tw-spacing) * 60)}.tw\\:w-64{width:calc(var(--tw-spacing) * 64)}.tw\\:w-72{width:calc(var(--tw-spacing) * 72)}.tw\\:w-80{width:calc(var(--tw-spacing) * 80)}.tw\\:w-96{width:calc(var(--tw-spacing) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(var(--tw-spacing) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-48{max-width:calc(var(--tw-spacing) * 48)}.tw\\:max-w-64{max-width:calc(var(--tw-spacing) * 64)}.tw\\:max-w-96{max-width:calc(var(--tw-spacing) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:min-w-0{min-width:calc(var(--tw-spacing) * 0)}.tw\\:min-w-5{min-width:calc(var(--tw-spacing) * 5)}.tw\\:min-w-8{min-width:calc(var(--tw-spacing) * 8)}.tw\\:min-w-16{min-width:calc(var(--tw-spacing) * 16)}.tw\\:min-w-36{min-width:calc(var(--tw-spacing) * 36)}.tw\\:min-w-80{min-width:calc(var(--tw-spacing) * 80)}.tw\\:min-w-\\[8rem\\]{min-width:8rem}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(var(--tw-spacing) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-in{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:scroll-m-20{scroll-margin:calc(var(--tw-spacing) * 20)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(var(--tw-spacing) * 0)}.tw\\:gap-1{gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-1\\.5{gap:calc(var(--tw-spacing) * 1.5)}.tw\\:gap-2{gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-2\\.5{gap:calc(var(--tw-spacing) * 2.5)}.tw\\:gap-3{gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-4{gap:calc(var(--tw-spacing) * 4)}.tw\\:gap-5{gap:calc(var(--tw-spacing) * 5)}.tw\\:gap-6{gap:calc(var(--tw-spacing) * 6)}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-x-2{column-gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-x-3{column-gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-x-4{column-gap:calc(var(--tw-spacing) * 4)}:where(.tw\\:space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-y-2{row-gap:calc(var(--tw-spacing) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-stretch{align-self:stretch}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-\\[10px\\]{border-top-left-radius:10px;border-top-right-radius:10px}.tw\\:rounded-l-\\[10px\\]{border-top-left-radius:10px;border-bottom-left-radius:10px}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-\\[10px\\]{border-top-right-radius:10px;border-bottom-right-radius:10px}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-\\[10px\\]{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive\\/50{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-destructive\\/50{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input{border-color:var(--input)}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/80{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/80{background-color:color-mix(in oklab, var(--tw-color-black) 80%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive{background-color:var(--destructive)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input{background-color:var(--input)}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:fill-current{fill:currentColor}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:\\!p-4{padding:calc(var(--tw-spacing) * 4)!important}.tw\\:p-0{padding:calc(var(--tw-spacing) * 0)}.tw\\:p-0\\.5{padding:calc(var(--tw-spacing) * .5)}.tw\\:p-1{padding:calc(var(--tw-spacing) * 1)}.tw\\:p-2{padding:calc(var(--tw-spacing) * 2)}.tw\\:p-3{padding:calc(var(--tw-spacing) * 3)}.tw\\:p-4{padding:calc(var(--tw-spacing) * 4)}.tw\\:p-6{padding:calc(var(--tw-spacing) * 6)}.tw\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(var(--tw-spacing) * 0)}.tw\\:px-1{padding-inline:calc(var(--tw-spacing) * 1)}.tw\\:px-2{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:px-2\\.5{padding-inline:calc(var(--tw-spacing) * 2.5)}.tw\\:px-3{padding-inline:calc(var(--tw-spacing) * 3)}.tw\\:px-4{padding-inline:calc(var(--tw-spacing) * 4)}.tw\\:px-5{padding-inline:calc(var(--tw-spacing) * 5)}.tw\\:px-6{padding-inline:calc(var(--tw-spacing) * 6)}.tw\\:px-8{padding-inline:calc(var(--tw-spacing) * 8)}.tw\\:py-0{padding-block:calc(var(--tw-spacing) * 0)}.tw\\:py-0\\.5{padding-block:calc(var(--tw-spacing) * .5)}.tw\\:py-1{padding-block:calc(var(--tw-spacing) * 1)}.tw\\:py-1\\.5{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:py-2{padding-block:calc(var(--tw-spacing) * 2)}.tw\\:py-3{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:py-4{padding-block:calc(var(--tw-spacing) * 4)}.tw\\:py-6{padding-block:calc(var(--tw-spacing) * 6)}.tw\\:py-8{padding-block:calc(var(--tw-spacing) * 8)}.tw\\:ps-4{padding-inline-start:calc(var(--tw-spacing) * 4)}.tw\\:ps-8{padding-inline-start:calc(var(--tw-spacing) * 8)}.tw\\:ps-9{padding-inline-start:calc(var(--tw-spacing) * 9)}.tw\\:ps-12{padding-inline-start:calc(var(--tw-spacing) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:pe-2{padding-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:pe-9{padding-inline-end:calc(var(--tw-spacing) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-0{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:pt-1{padding-top:calc(var(--tw-spacing) * 1)}.tw\\:pt-2{padding-top:calc(var(--tw-spacing) * 2)}.tw\\:pt-3{padding-top:calc(var(--tw-spacing) * 3)}.tw\\:pt-6{padding-top:calc(var(--tw-spacing) * 6)}.tw\\:\\!pr-10{padding-right:calc(var(--tw-spacing) * 10)!important}.tw\\:pr-0{padding-right:calc(var(--tw-spacing) * 0)}.tw\\:pr-2{padding-right:calc(var(--tw-spacing) * 2)}.tw\\:pr-3{padding-right:calc(var(--tw-spacing) * 3)}.tw\\:pr-4{padding-right:calc(var(--tw-spacing) * 4)}.tw\\:pb-0{padding-bottom:calc(var(--tw-spacing) * 0)}.tw\\:pb-2{padding-bottom:calc(var(--tw-spacing) * 2)}.tw\\:pb-3{padding-bottom:calc(var(--tw-spacing) * 3)}.tw\\:pb-4{padding-bottom:calc(var(--tw-spacing) * 4)}.tw\\:pb-8{padding-bottom:calc(var(--tw-spacing) * 8)}.tw\\:pb-16{padding-bottom:calc(var(--tw-spacing) * 16)}.tw\\:pb-24{padding-bottom:calc(var(--tw-spacing) * 24)}.tw\\:pl-2{padding-left:calc(var(--tw-spacing) * 2)}.tw\\:pl-3{padding-left:calc(var(--tw-spacing) * 3)}.tw\\:pl-4{padding-left:calc(var(--tw-spacing) * 4)}.tw\\:pl-5{padding-left:calc(var(--tw-spacing) * 5)}.tw\\:pl-6{padding-left:calc(var(--tw-spacing) * 6)}.tw\\:pl-8{padding-left:calc(var(--tw-spacing) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-70{opacity:.7}.tw\\:opacity-100{opacity:1}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opa\\]{transition-property:margin,opa;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:fade-in-0{--tw-enter-opacity:0}.tw\\:fade-in-80{--tw-enter-opacity:.8}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:zoom-in-95{--tw-enter-scale:.95}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--tw-spacing) * 8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(var(--tw-spacing) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!size-8:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--tw-spacing) * 8)!important;height:calc(var(--tw-spacing) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *),.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--tw-spacing) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-0:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-2:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(var(--tw-spacing) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-r:is(:where(.tw\\:group)[data-side=primary] *){border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-l:is(:where(.tw\\:group)[data-side=secondary] *){border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:border:is(:where(.tw\\:group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:border-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){border-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:bg-muted:is(:where(.tw\\:group).tw\\\\:toast *){background-color:var(--muted)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:bg-primary:is(:where(.tw\\:group).tw\\\\:toast *){background-color:var(--primary)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:text-muted-foreground:is(:where(.tw\\:group).tw\\\\:toast *){color:var(--muted-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:text-primary-foreground:is(:where(.tw\\:group).tw\\\\:toast *){color:var(--primary-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:border-border:is(:where(.tw\\:group).tw\\\\:toaster *){border-color:var(--border)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:bg-background:is(:where(.tw\\:group).tw\\\\:toaster *){background-color:var(--background)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:text-foreground:is(:where(.tw\\:group).tw\\\\:toaster *){color:var(--foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:shadow-lg:is(:where(.tw\\:group).tw\\\\:toaster *){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-70:is(:where(.tw\\:peer):disabled~*){opacity:.7}.tw\\:peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button)[data-active=true]~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(var(--tw-spacing) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(var(--tw-spacing) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(var(--tw-spacing) * 1)}.tw\\:peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:peer)[data-variant=inset]~*){min-height:calc(100svh - (calc(var(--tw-spacing) * 4)))}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(var(--tw-spacing) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(var(--tw-spacing) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(var(--tw-spacing) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--tw-spacing) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(var(--tw-spacing) * 0)}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(var(--tw-spacing) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(var(--tw-spacing) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.tw\\:first\\:mt-0:first-child{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/80:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/80:hover{background-color:color-mix(in oklab, var(--destructive) 80%, transparent)}}.tw\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/80:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/80:hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:bg-sidebar:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):hover{background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-ring:focus-visible{--tw-ring-color:var(--ring)}.tw\\:focus-visible\\:ring-sidebar-ring:focus-visible{--tw-ring-color:var(--sidebar-ring)}.tw\\:focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-background:focus-visible{--tw-ring-offset-color:var(--background)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}.tw\\:has-\\[\\[data-variant\\=inset\\]\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(var(--tw-spacing) * 2)}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(var(--tw-spacing) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true]{background-color:var(--sidebar-accent)}.tw\\:data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true]{color:var(--sidebar-accent-foreground)}.tw\\:data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.tw\\:data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[orientation\\=vertical\\]\\:h-auto[data-orientation=vertical]{height:auto}.tw\\:data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.tw\\:data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked]{--tw-translate-x:calc(var(--tw-spacing) * 5);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-\\[-20px\\][data-state=checked]{--tw-translate-x:-20px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.tw\\:data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.tw\\:data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity:0}.tw\\:data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale:.95}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed]{--tw-exit-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed]{--tw-exit-translate-y:calc(48%*-1)}.tw\\:data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.tw\\:data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.tw\\:data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.tw\\:data-\\[state\\=open\\]\\:fade-in-0[data-state=open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open]{--tw-enter-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open]{--tw-enter-translate-y:calc(48%*-1)}@media (hover:hover){.tw\\:data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent[data-state=open]:hover{background-color:var(--sidebar-accent)}.tw\\:data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground[data-state=open]:hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}:where(.tw\\:sm\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:sm\\:rounded-lg{border-radius:var(--radius)}.tw\\:sm\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:sm\\:text-left{text-align:left}.tw\\:sm\\:text-start{text-align:start}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(var(--tw-spacing) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2:is(:where(.tw\\:peer)[data-state=collapsed]~*):is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 2)}}.tw\\:after\\:md\\:hidden:after{content:var(--tw-content)}@media (min-width:48rem){.tw\\:after\\:md\\:hidden:after{display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(var(--tw-spacing) * 2)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(var(--tw-spacing) * 2)}.tw\\:dark\\:border-destructive:is(.dark *){border-color:var(--destructive)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.tw\\:\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--tw-spacing) * 12)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:relative>:focus-visible{position:relative}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:z-10>:focus-visible{z-index:10}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-l-none>:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-l-0>:not(:first-child){border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-r-none>:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-r-md:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-top-right-radius:calc(var(--radius) * .8);border-bottom-right-radius:calc(var(--radius) * .8)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>img\\]\\:absolute>img{position:absolute}.tw\\:\\[\\&\\>img\\]\\:top-4>img{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:left-4>img{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:text-destructive>img{color:var(--destructive)}.tw\\:\\[\\&\\>img\\]\\:text-foreground>img{color:var(--foreground)}.tw\\:\\[\\&\\>img\\+div\\]\\:translate-y-\\[-3px\\]>img+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>img\\~\\*\\]\\:pl-7>img~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&\\>span\\]\\:line-clamp-1>span{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:\\[\\&\\>span\\]\\:flex-1>span{flex:1}.tw\\:\\[\\&\\>span\\]\\:text-start>span{text-align:start}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:absolute>svg{position:absolute}.tw\\:\\[\\&\\>svg\\]\\:top-4>svg{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:left-4>svg{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-destructive>svg{color:var(--destructive)}.tw\\:\\[\\&\\>svg\\]\\:text-foreground>svg{color:var(--foreground)}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--tw-spacing) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize,[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--tw-spacing) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}.light,:root{--radius:.625rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(98.21% 0 0);--foreground:oklch(24.35% 0 0);--muted:oklch(95.21% 0 0);--muted-foreground:oklch(50.32% 0 0);--popover:oklch(99.11% 0 0);--popover-foreground:oklch(24.35% 0 0);--card:oklch(99.11% 0 0);--card-foreground:oklch(24.35% 0 0);--border:oklch(88.22% 0 0);--input:oklch(88.22% 0 0);--primary:oklch(35.48% .0611 180.17);--primary-foreground:oklch(100% 0 0);--secondary:oklch(92% .065 74.36);--secondary-foreground:oklch(34.99% .0685 40.82);--accent:oklch(93.1% 0 0);--accent-foreground:oklch(24.35% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(43.41% .0392 41.96);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.81% 0 0);--sidebar-foreground:oklch(26.45% 0 0);--sidebar-primary:oklch(32.5% 0 0);--sidebar-primary-foreground:oklch(98.81% 0 0);--sidebar-accent:oklch(95.21% 0 0);--sidebar-accent-foreground:oklch(32.5% 0 0);--sidebar-border:oklch(94.01% 0 0);--sidebar-ring:oklch(77.31% 0 0)}.paratext-dark{--background:oklch(17.76% 0 0);--foreground:oklch(94.91% 0 0);--muted:oklch(25.2% 0 0);--muted-foreground:oklch(76.99% 0 0);--popover:oklch(21.34% 0 0);--popover-foreground:oklch(94.91% 0 0);--card:oklch(21.34% 0 0);--card-foreground:oklch(94.91% 0 0);--border:oklch(23.51% .0115 91.77);--input:oklch(40.17% 0 0);--primary:oklch(98.6% .0113 84.59);--primary-foreground:oklch(20.29% .024 200.24);--secondary:oklch(31.63% .019 63.68);--secondary-foreground:oklch(92.47% .0523 66.15);--accent:oklch(28.5% 0 0);--accent-foreground:oklch(94.91% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(92.47% .0523 66.15);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(21.03% .0059 285.82);--sidebar-foreground:oklch(96.74% .0014 285.04);--sidebar-primary:oklch(48.82% .2172 264.38);--sidebar-primary-foreground:oklch(100% 0 0);--sidebar-accent:oklch(27.39% .0055 285.94);--sidebar-accent-foreground:oklch(96.74% .0014 285.04);--sidebar-border:oklch(27.39% .0055 285.94);--sidebar-ring:oklch(87.11% .0055 285.98)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  gu as Alert,
  vu as AlertDescription,
  bu as AlertTitle,
  Hc as Avatar,
  Wc as AvatarFallback,
  mp as AvatarImage,
  ip as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  sp as BOOK_SELECTOR_STRING_KEYS,
  rr as Badge,
  ap as BookChapterControl,
  so as BookSelectionMode,
  lp as BookSelector,
  z as Button,
  wp as COMMENT_EDITOR_STRING_KEYS,
  dp as COMMENT_LIST_STRING_KEYS,
  Uc as Card,
  Gc as CardContent,
  hp as CardDescription,
  fp as CardFooter,
  pp as CardHeader,
  up as CardTitle,
  xl as ChapterRangeSelector,
  Pa as Checkbox,
  hu as Checklist,
  io as ComboBox,
  me as Command,
  Mr as CommandEmpty,
  te as CommandGroup,
  ir as CommandInput,
  ee as CommandItem,
  ge as CommandList,
  cp as CommentEditor,
  bp as CommentList,
  xu as ContextMenu,
  Du as ContextMenuCheckboxItem,
  Su as ContextMenuContent,
  ku as ContextMenuGroup,
  Ru as ContextMenuItem,
  Ou as ContextMenuLabel,
  _u as ContextMenuPortal,
  Cu as ContextMenuRadioGroup,
  Mu as ContextMenuRadioItem,
  Iu as ContextMenuSeparator,
  Au as ContextMenuShortcut,
  Nu as ContextMenuSub,
  Tu as ContextMenuSubContent,
  Eu as ContextMenuSubTrigger,
  yu as ContextMenuTrigger,
  pw as DataTable,
  al as Dialog,
  ep as DialogClose,
  ll as DialogContent,
  op as DialogDescription,
  rp as DialogFooter,
  cl as DialogHeader,
  sl as DialogOverlay,
  il as DialogPortal,
  wl as DialogTitle,
  tp as DialogTrigger,
  $u as Drawer,
  Lu as DrawerClose,
  Vu as DrawerContent,
  Bu as DrawerDescription,
  zu as DrawerFooter,
  ju as DrawerHeader,
  Cd as DrawerOverlay,
  Nd as DrawerPortal,
  Fu as DrawerTitle,
  Pu as DrawerTrigger,
  pe as DropdownMenu,
  de as DropdownMenuCheckboxItem,
  ue as DropdownMenuContent,
  Aa as DropdownMenuGroup,
  po as DropdownMenuItem,
  fw as DropdownMenuItemType,
  Ir as DropdownMenuLabel,
  Yc as DropdownMenuPortal,
  Jc as DropdownMenuRadioGroup,
  tw as DropdownMenuRadioItem,
  sr as DropdownMenuSeparator,
  gp as DropdownMenuShortcut,
  Xc as DropdownMenuSub,
  Qc as DropdownMenuSubContent,
  Zc as DropdownMenuSubTrigger,
  Ee as DropdownMenuTrigger,
  uw as ERROR_DUMP_STRING_KEYS,
  Np as ERROR_POPOVER_STRING_KEYS,
  xw as EditorKeyboardShortcuts,
  hw as ErrorDump,
  Cp as ErrorPopover,
  Mp as FOOTNOTE_EDITOR_STRING_KEYS,
  Rp as Filter,
  Ep as FilterDropdown,
  Sp as Footer,
  Dp as FootnoteEditor,
  $w as FootnoteItem,
  Op as FootnoteList,
  jp as INVENTORY_STRING_KEYS,
  lr as Input,
  zp as Inventory,
  ut as Label,
  Ew as MARKER_MENU_STRING_KEYS,
  _p as MarkdownRenderer,
  Sw as MarkerMenu,
  Tp as MoreInfo,
  gw as MultiSelectComboBox,
  wu as NavigationContentSearch,
  re as Popover,
  ul as PopoverAnchor,
  oe as PopoverContent,
  be as PopoverTrigger,
  Ku as Progress,
  sa as RadioGroup,
  ao as RadioGroupItem,
  hl as RecentSearches,
  Gu as ResizableHandle,
  Uu as ResizablePanel,
  qu as ResizablePanelGroup,
  fu as ResultsCard,
  ru as SCOPE_SELECTOR_STRING_KEYS,
  ou as ScopeSelector,
  eu as ScriptureResultsViewer,
  nu as ScrollGroupSelector,
  Lo as SearchBar,
  Ve as Select,
  Fe as SelectContent,
  ow as SelectGroup,
  Pt as SelectItem,
  vp as SelectLabel,
  iw as SelectScrollDownButton,
  aw as SelectScrollUpButton,
  xp as SelectSeparator,
  ze as SelectTrigger,
  je as SelectValue,
  or as Separator,
  au as SettingsList,
  su as SettingsListHeader,
  iu as SettingsListItem,
  Qw as SettingsSidebar,
  tu as SettingsSidebarContentSearch,
  Gw as Sidebar,
  Ww as SidebarContent,
  Up as SidebarFooter,
  yn as SidebarGroup,
  Hp as SidebarGroupAction,
  _n as SidebarGroupContent,
  kn as SidebarGroupLabel,
  qp as SidebarHeader,
  Kp as SidebarInput,
  Hw as SidebarInset,
  Yw as SidebarMenu,
  Wp as SidebarMenuAction,
  Yp as SidebarMenuBadge,
  Zw as SidebarMenuButton,
  Xw as SidebarMenuItem,
  Xp as SidebarMenuSkeleton,
  Jp as SidebarMenuSub,
  Qp as SidebarMenuSubButton,
  Zp as SidebarMenuSubItem,
  Uw as SidebarProvider,
  Bp as SidebarRail,
  Gp as SidebarSeparator,
  Fp as SidebarTrigger,
  uo as Skeleton,
  Wu as Slider,
  Hu as Sonner,
  kd as Spinner,
  Yu as Switch,
  ho as TabDropdownMenu,
  cu as TabFloatingMenu,
  lu as TabToolbar,
  Io as Table,
  $o as TableBody,
  kp as TableCaption,
  $e as TableCell,
  yp as TableFooter,
  Tr as TableHead,
  Ao as TableHeader,
  we as TableRow,
  Xu as Tabs,
  Qu as TabsContent,
  Ju as TabsList,
  Zu as TabsTrigger,
  mu as TextField,
  th as Textarea,
  Sa as ToggleGroup,
  br as ToggleGroupItem,
  pu as Toolbar,
  _t as Tooltip,
  Nt as TooltipContent,
  yt as TooltipProvider,
  Rt as TooltipTrigger,
  bw as UNDO_REDO_BUTTONS_STRING_KEYS,
  uu as UiLanguageSelector,
  vw as UndoRedoButtons,
  Ka as VerticalTabs,
  Ua as VerticalTabsContent,
  qa as VerticalTabsList,
  cd as VerticalTabsTrigger,
  Ge as Z_INDEX_ABOVE_DOCK,
  ea as Z_INDEX_FOOTNOTE_EDITOR,
  ol as Z_INDEX_MODAL,
  rl as Z_INDEX_MODAL_BACKDROP,
  el as Z_INDEX_OVERLAY,
  qc as badgeVariants,
  ia as buttonVariants,
  m as cn,
  Vp as getBookIdFromUSFM,
  Ar as getInventoryHeader,
  Pp as getLinesFromUSFM,
  Lp as getNumberFromUSFM,
  zw as getStatusForItem,
  du as getToolbarOSReservedSpaceClassName,
  Ap as inventoryCountColumn,
  Ip as inventoryItemColumn,
  $p as inventoryStatusColumn,
  nw as selectTriggerVariants,
  ih as sonner,
  eh as useEvent,
  rh as useEventAsync,
  Kc as useListbox,
  Td as usePromise,
  np as useRecentSearches,
  $r as useSidebar,
  oh as useStylesheet
};
//# sourceMappingURL=index.js.map
