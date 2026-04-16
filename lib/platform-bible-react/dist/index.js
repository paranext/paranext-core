var ei = Object.defineProperty;
var ri = (t, e, r) => e in t ? ei(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Nt = (t, e, r) => ri(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as u, jsx as n, Fragment as nt } from "react/jsx-runtime";
import { Command as De } from "cmdk";
import { X as ar, Search as Rn, Check as ie, Clock as Bo, ChevronsLeft as Ko, ChevronsRight as qo, ChevronLeft as Jr, ChevronRight as ze, ArrowLeft as oi, ArrowRight as ni, Circle as go, ChevronDown as Ue, BoldIcon as ai, ItalicIcon as ii, AtSign as Dn, Pencil as si, Trash2 as li, ArrowUp as Mn, MoreHorizontal as ci, MailOpen as wi, Mail as di, ChevronUp as On, FilterIcon as ui, ArrowLeftIcon as pi, ChevronLeftIcon as hi, ChevronRightIcon as fi, ArrowRightIcon as mi, Copy as In, Filter as gi, User as bi, Link as vi, CircleHelp as xi, ChevronsUpDown as An, Star as yi, Undo as ki, Redo as _i, SquareX as $n, FunctionSquare as Pn, SquareSigma as Ln, Ban as Ni, AlertCircle as Zr, CircleCheckIcon as Ci, CircleXIcon as Ei, CircleHelpIcon as Ti, ArrowUpIcon as Si, ArrowDownIcon as Ri, PanelLeft as Di, PanelRight as Mi, ScrollText as Oi, MenuIcon as Ii, Menu as Ai, EllipsisVertical as $i, MoreVertical as Go, LoaderCircle as Pi, GripVertical as Li } from "lucide-react";
import { clsx as Vi } from "clsx";
import { twMerge as zi } from "tailwind-merge";
import * as re from "@radix-ui/react-dialog";
import { Canon as st } from "@sillsdev/scripture";
import { includes as wr, Section as Y, getChaptersForBook as ji, formatScrRef as Te, getSectionForBook as Ze, formatRelativeDate as Fi, formatReplacementString as Ee, sanitizeHtml as Bi, NumberFormat as Ki, formatBytes as qi, getCurrentLocale as Gi, usfmMarkers as gr, getFormatCallerFunction as Ui, deepEqual as Hi, isString as Uo, compareScrRefs as Qr, scrRefToBBBCCCVVV as Lr, getLocalizeKeyForScrollGroupId as J } from "platform-bible-utils";
import Z, { forwardRef as ir, useRef as q, useMemo as V, useState as R, useCallback as z, useLayoutEffect as Pt, createContext as Dr, useContext as bo, useEffect as G, Component as Wi, createElement as Ho, Suspense as Yi, Fragment as Vn } from "react";
import { Slot as Me } from "@radix-ui/react-slot";
import { cva as se } from "class-variance-authority";
import * as er from "@radix-ui/react-popover";
import * as Xi from "@radix-ui/react-label";
import * as to from "@radix-ui/react-radio-group";
import { createEditor as zn, $getRoot as oe, $createParagraphNode as He, $getSelection as St, HISTORY_MERGE_TAG as vo, ParagraphNode as jn, TextNode as Fn, $isTokenOrSegmented as Ji, $getCharacterOffsets as Zi, $cloneWithPropertiesEphemeral as Qi, $getPreviousSelection as ts, $isRangeSelection as Wt, $caretFromPoint as es, $getSiblingCaret as Bn, $getChildCaret as rs, $getAdjacentChildCaret as os, $isChildCaret as ns, $normalizeCaret as as, $setSelectionFromCaretRange as is, $getCollapsedCaretRange as ss, $getCaretInDirection as Wo, $splitAtPointCaretNext as ls, $isTextPointCaret as cs, $findMatchingParent as Kn, $isElementNode as te, mergeRegister as ne, getDOMTextNode as ws, isHTMLElement as qn, CLEAR_EDITOR_COMMAND as Gn, COMMAND_PRIORITY_EDITOR as xo, shallowMergeConfig as ds, defineExtension as zt, safeCast as Oe, createState as us, FORMAT_TEXT_COMMAND as Un, $isNodeSelection as Hn, COMMAND_PRIORITY_LOW as Wn, RootNode as ps, LineBreakNode as hs, TabNode as fs, $isEditorState as ms, createCommand as gs, CLICK_COMMAND as bs, isDOMNode as vs, $getNodeFromDOMNode as xs, $createNodeSelection as ys, $setSelection as ks, $getEditor as _s, DecoratorNode as eo, $getState as Ns, toggleTextFormatType as Yo, TEXT_TYPE_TO_FORMAT as Cs, $setState as Es, addClassNamesToElement as Yn, $create as Ts, $getNodeByKey as Ss, removeClassNamesFromElement as Rs, KEY_TAB_COMMAND as Ds, $isBlockElementNode as yr, $createRangeSelection as Ms, $normalizeSelection__EXPERIMENTAL as Os, OUTDENT_CONTENT_COMMAND as Is, INDENT_CONTENT_COMMAND as Xo, INSERT_TAB_COMMAND as As, COMMAND_PRIORITY_CRITICAL as yo, $isDecoratorNode as $s, $isParagraphNode as Ps, $isTextNode as kr, SELECTION_CHANGE_COMMAND as Xn, getRegisteredNode as Ls, isDocumentFragment as Jo, isDOMDocumentNode as Vs, ArtificialNode__DO_NOT_USE as Jn, $createLineBreakNode as Zn, $isRootOrShadowRoot as zs, isBlockDomNode as Zo, isInlineDomNode as Qo, $insertNodes as js } from "lexical";
import * as Mr from "@radix-ui/react-tooltip";
import { TooltipTrigger as Fs } from "@radix-ui/react-tooltip";
import { HeadingNode as Bs, QuoteNode as Ks, registerRichText as qs } from "@lexical/rich-text";
import { flushSync as Gs, createPortal as Us } from "react-dom";
import { $isTableSelection as Hs } from "@lexical/table";
import * as Qn from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as ta } from "@lexical/headless";
import * as Ws from "@radix-ui/react-separator";
import * as ko from "@radix-ui/react-avatar";
import * as bt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ys } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ea, getFilteredRowModel as Xs, getSortedRowModel as ra, getPaginationRowModel as Js, getCoreRowModel as oa, flexRender as Qe, getGroupedRowModel as Zs, getExpandedRowModel as Qs } from "@tanstack/react-table";
import * as Et from "@radix-ui/react-select";
import tl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as ro, HIDDEN_NOTE_CALLER as oo, getDefaultViewOptions as el, isInsertEmbedOpOfType as dr, Editorial as rl } from "@eten-tech-foundation/platform-editor";
import * as tn from "@radix-ui/react-checkbox";
import * as qt from "@radix-ui/react-tabs";
import * as Yt from "@radix-ui/react-menubar";
import { useHotkeys as ol } from "react-hotkeys-hook";
import * as vt from "@radix-ui/react-context-menu";
import { Drawer as ve } from "vaul";
import * as en from "@radix-ui/react-progress";
import * as _o from "react-resizable-panels";
import { Toaster as nl } from "sonner";
import { toast as hh } from "sonner";
import * as ur from "@radix-ui/react-slider";
import * as rn from "@radix-ui/react-switch";
function no(t) {
  const e = [];
  let r = "", o = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? o += 1 : i === "]" && (o -= 1), i === ":" && o === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function al(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = no(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((w, c) => c !== r), `-${i}`].join(":")}`, original: t };
  }
  const o = e.findIndex((i) => i.startsWith("!tw-"));
  if (o !== -1) {
    const i = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((w, c) => c !== o), `!${i}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const i = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function il(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = no(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), a = r[r.length - 1], i = no(e), s = i.some((w) => w.startsWith("-tw-")), l = i.some((w) => w.startsWith("!tw-"));
  if (s && a.startsWith("-")) {
    const w = a.slice(1);
    return [...o, `-tw-${w}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const w = a.slice(1);
    return [...o, `!tw-${w}`].join(":");
  }
  return [...o, `tw-${a}`].join(":");
}
function m(...t) {
  const e = Vi(t);
  if (!e) return e;
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((w) => {
    const c = al(w);
    o.set(c.normalized, c.original), a.push(c.normalized);
  }), zi(a.join(" ")).split(" ").filter(Boolean).map((w) => {
    const c = o.get(w);
    return c ? il(w, c) : w;
  }).join(" ");
}
const We = 250, na = 300, sl = 400, ll = 450, cl = 500, wl = "layoutDirection";
function lt() {
  const t = localStorage.getItem(wl);
  return t === "rtl" ? t : "ltr";
}
const dl = re.Root, su = re.Trigger, ul = re.Portal, lu = re.Close;
function pl({
  className: t,
  style: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    re.Overlay,
    {
      ref: r,
      className: m(
        // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
        t
      ),
      style: { zIndex: ll, ...e },
      ...o
    }
  );
}
function hl({
  className: t,
  children: e,
  overlayClassName: r,
  style: o,
  ref: a,
  ...i
}) {
  const s = lt();
  return /* @__PURE__ */ u(ul, { children: [
    /* @__PURE__ */ n(pl, { className: r }),
    /* @__PURE__ */ u(
      re.Content,
      {
        ref: a,
        className: m(
          // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        style: { zIndex: cl, ...o },
        ...i,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ u(
            re.Close,
            {
              className: m(
                "tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground",
                { "tw:right-4": s === "ltr" },
                { "tw:left-4": s === "rtl" }
              ),
              children: [
                /* @__PURE__ */ n(ar, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function fl({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function cu({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ml({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    re.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function wu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    re.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function xe({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    De,
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
function sr({
  className: t,
  ref: e,
  ...r
}) {
  const o = lt();
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: o, children: [
    /* @__PURE__ */ n(Rn, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ n(
      De.Input,
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
function ye({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    De.List,
    {
      ref: e,
      className: m("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...r
    }
  );
}
function Or({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ n(De.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function ae({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    De.Group,
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
function aa({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    De.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function le({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    De.Item,
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
function gl({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const ia = (t, e, r, o, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "Old Testament";
    case Y.NT:
      return r ?? "New Testament";
    case Y.DC:
      return o ?? "Deuterocanon";
    case Y.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, bl = (t, e, r, o, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "OT";
    case Y.NT:
      return r ?? "NT";
    case Y.DC:
      return o ?? "DC";
    case Y.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Pe(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? st.bookIdToEnglishName(t);
}
function No(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const sa = st.allBookIds.filter(
  (t) => !st.isObsolete(st.bookIdToNumber(t))
), Se = Object.fromEntries(
  sa.map((t) => [t, st.bookIdToEnglishName(t)])
);
function Co(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = st.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(wr(a.toLowerCase(), o) || wr(t.toLowerCase(), o) || (i ? wr(i.localizedName.toLowerCase(), o) || wr(i.localizedId.toLowerCase(), o) : !1));
}
const la = ir(
  ({
    bookId: t,
    isSelected: e,
    onSelect: r,
    onMouseDown: o,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: w
  }, c) => {
    const d = q(!1), h = () => {
      d.current || r == null || r(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (v) => {
      d.current = !0, o ? o(v) : r == null || r(t);
    }, p = V(
      () => Pe(t, l),
      [t, l]
    ), g = V(
      () => No(t, l),
      [t, l]
    );
    return /* @__PURE__ */ n(
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
        children: /* @__PURE__ */ u(
          le,
          {
            ref: c,
            value: w || `${t} ${st.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${st.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ n(
                ie,
                {
                  className: m(
                    "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:flex-1", children: p }),
              /* @__PURE__ */ n("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), ca = se(
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
function j({
  className: t,
  variant: e,
  size: r,
  asChild: o = !1,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ n(o ? Me : "button", { className: m(ca({ variant: e, size: r, className: t })), ref: a, ...i });
}
const ce = er.Root, ke = er.Trigger, vl = er.Anchor;
function we({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  style: o,
  ref: a,
  ...i
}) {
  const s = lt();
  return /* @__PURE__ */ n(er.Portal, { children: /* @__PURE__ */ n(
    er.Content,
    {
      ref: a,
      align: e,
      sideOffset: r,
      className: m(
        // CUSTOM removed tw:z-50 to use const below
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-hidden tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: We, ...o },
      ...i,
      dir: s
    }
  ) });
}
function ao(t, e, r) {
  return `${t} ${Se[t]}${e ? ` ${No(t, e)} ${Pe(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
function xl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: w = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: c = "ghost"
}) {
  const [d, h] = R(!1);
  if (t.length === 0)
    return;
  const f = (p) => {
    e(p), h(!1);
  };
  return /* @__PURE__ */ u(ce, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ n(
      j,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ n(Bo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ n(we, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ n(xe, { children: /* @__PURE__ */ n(ye, { children: /* @__PURE__ */ n(ae, { heading: i, children: t.map((p) => /* @__PURE__ */ u(
      le,
      {
        onSelect: () => f(p),
        className: m("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ n(Bo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ n("span", { children: r(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function du(t, e, r = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !r(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Vr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, yl = [
  Vr.BOOK_ONLY,
  Vr.BOOK_CHAPTER,
  Vr.BOOK_CHAPTER_VERSE
];
function on(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function Ht(t) {
  return ji(st.bookIdToNumber(t));
}
function kl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = yl.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, w = void 0, c = void 0] = s.slice(1);
        let d;
        const h = e.filter((f) => Co(f, l, r));
        if (h.length === 1 && ([d] = h), !d && w) {
          if (st.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (d = f);
          }
          if (!d && r) {
            const f = Array.from(r.entries()).find(
              ([, p]) => p.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([d] = f);
          }
        }
        if (!d && w) {
          const p = ((g) => Object.keys(Se).find(
            (v) => Se[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (p && e.includes(p) && (d = p), !d && r) {
            const g = Array.from(r.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = w ? parseInt(w, 10) : void 0;
          f && f > Ht(d) && (f = Math.max(Ht(d), 1));
          const p = c ? parseInt(c, 10) : void 0;
          return {
            book: d,
            chapterNum: f,
            verseNum: p
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function _l(t, e, r, o) {
  const a = z(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w > 0) {
        const c = e[w - 1], d = Math.max(Ht(c), 1);
        o({
          book: c,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = z(() => {
    const w = Ht(t.book);
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
  }, [t, e, o]), s = z(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = z(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return V(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Ko : qo
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Jr : ze
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? ze : Jr
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Ht(t.book) || Ht(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? qo : Ko
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
function nn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ n(ae, { children: /* @__PURE__ */ n("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", i), children: Array.from({ length: Ht(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ n(
      le,
      {
        value: `${t} ${Se[t] || ""} ${s}`,
        onSelect: () => r(s),
        ref: o(s),
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
function uu({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: w
}) {
  const c = lt(), [d, h] = R(!1), [f, p] = R(""), [g, v] = R(""), [b, N] = R("books"), [y, _] = R(void 0), [k, P] = R(!1), I = q(void 0), $ = q(void 0), C = q(void 0), T = q(void 0), E = q({}), O = z(
    (M) => {
      e(M), l && l(M);
    },
    [e, l]
  ), L = V(() => o ? o() : sa, [o]), U = V(() => ({
    [Y.OT]: L.filter((H) => st.isBookOT(H)),
    [Y.NT]: L.filter((H) => st.isBookNT(H)),
    [Y.DC]: L.filter((H) => st.isBookDC(H)),
    [Y.Extra]: L.filter((H) => st.extraBooks().includes(H))
  }), [L]), A = V(() => Object.values(U).flat(), [U]), W = V(() => {
    if (!g.trim()) return U;
    const M = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return [Y.OT, Y.NT, Y.DC, Y.Extra].forEach((Q) => {
      M[Q] = U[Q].filter((ut) => Co(ut, g, a));
    }), M;
  }, [U, g, a]), x = V(
    () => kl(g, A, a),
    [g, A, a]
  ), F = z(() => {
    x && (O({
      book: x.book,
      chapterNum: x.chapterNum ?? 1,
      verseNum: x.verseNum ?? 1
    }), h(!1), v(""), p(""));
  }, [O, x]), ct = z(
    (M) => {
      if (Ht(M) <= 1) {
        O({
          book: M,
          chapterNum: 1,
          verseNum: 1
        }), h(!1), v("");
        return;
      }
      _(M), N("chapters");
    },
    [O]
  ), xt = z(
    (M) => {
      const H = b === "chapters" ? y : x == null ? void 0 : x.book;
      H && (O({
        book: H,
        chapterNum: M,
        verseNum: 1
      }), h(!1), N("books"), _(void 0), v(""));
    },
    [O, b, y, x]
  ), At = z(
    (M) => {
      O(M), h(!1), v("");
    },
    [O]
  ), wt = _l(t, A, c, e), Rt = z(() => {
    N("books"), _(void 0), setTimeout(() => {
      $.current && $.current.focus();
    }, 0);
  }, []), K = z(
    (M) => {
      if (!M && b === "chapters") {
        Rt();
        return;
      }
      h(M), M && (N("books"), _(void 0), v(""));
    },
    [b, Rt]
  ), { otLong: at, ntLong: rt, dcLong: dt, extraLong: Tt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, ue = z(
    (M) => ia(M, at, rt, dt, Tt),
    [at, rt, dt, Tt]
  ), yt = z(
    (M) => x ? !!x.chapterNum && !M.toString().includes(x.chapterNum.toString()) : !1,
    [x]
  ), pe = V(
    () => Te(
      t,
      a ? Pe(t.book, a) : "English"
    ),
    [t, a]
  ), Zt = z((M) => (H) => {
    E.current[M] = H;
  }, []), kt = z((M) => {
    (M.key === "Home" || M.key === "End") && M.stopPropagation();
  }, []), jt = z(
    (M) => {
      if (M.ctrlKey) return;
      const { isLetter: H, isDigit: Q } = on(M.key);
      if (b === "chapters") {
        if (M.key === "Backspace") {
          M.preventDefault(), M.stopPropagation(), Rt();
          return;
        }
        if (H || Q) {
          if (M.preventDefault(), M.stopPropagation(), N("books"), _(void 0), Q && y) {
            const ut = Se[y];
            v(`${ut} ${M.key}`);
          } else
            v(M.key);
          setTimeout(() => {
            $.current && $.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && x) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(M.key)) {
        const ut = b === "chapters" ? y : x == null ? void 0 : x.book;
        if (!ut) return;
        const ot = (() => {
          if (!f) return 1;
          const et = f.match(/(\d+)$/);
          return et ? parseInt(et[1], 10) : 0;
        })(), Dt = Ht(ut);
        if (!Dt) return;
        let D = ot;
        const B = 6;
        switch (M.key) {
          case "ArrowLeft":
            ot !== 0 && (D = ot > 1 ? ot - 1 : Dt);
            break;
          case "ArrowRight":
            ot !== 0 && (D = ot < Dt ? ot + 1 : 1);
            break;
          case "ArrowUp":
            D = ot === 0 ? Dt : Math.max(1, ot - B);
            break;
          case "ArrowDown":
            D = ot === 0 ? 1 : Math.min(Dt, ot + B);
            break;
          default:
            return;
        }
        D !== ot && (M.preventDefault(), M.stopPropagation(), p(ao(ut, a, D)), setTimeout(() => {
          const et = E.current[D];
          et && et.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      x,
      Rt,
      y,
      f,
      a
    ]
  ), Qt = z((M) => {
    if (M.shiftKey || M.key === "Tab" || M.key === " ") return;
    const { isLetter: H, isDigit: Q } = on(M.key);
    (H || Q) && (M.preventDefault(), v((ut) => ut + M.key), $.current.focus(), P(!1));
  }, []);
  return Pt(() => {
    const M = setTimeout(() => {
      if (d && b === "books" && C.current && T.current) {
        const H = C.current, Q = T.current, ut = Q.offsetTop, ot = H.clientHeight, Dt = Q.clientHeight, D = ut - ot / 2 + Dt / 2;
        H.scrollTo({
          top: Math.max(0, D),
          behavior: "smooth"
        }), p(ao(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(M);
    };
  }, [d, b, g, x, t.book]), Pt(() => {
    if (b === "chapters" && y) {
      const M = y === t.book;
      setTimeout(() => {
        if (C.current)
          if (M) {
            const H = E.current[t.chapterNum];
            H && H.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            C.current.scrollTo({ top: 0 });
        I.current && I.current.focus();
      }, 0);
    }
  }, [b, y, x, t.book, t.chapterNum]), /* @__PURE__ */ u(ce, { open: d, onOpenChange: K, children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ n(
      j,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ n("span", { className: "tw:truncate", children: pe })
      }
    ) }),
    /* @__PURE__ */ n(we, { id: w, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ u(
      xe,
      {
        ref: I,
        onKeyDown: jt,
        loop: !0,
        value: f,
        onValueChange: p,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ n(
                sr,
                {
                  ref: $,
                  value: g,
                  onValueChange: v,
                  onKeyDown: kt,
                  onFocus: () => P(!1),
                  className: s && s.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ n(
                xl,
                {
                  recentSearches: s,
                  onSearchItemSelect: At,
                  renderItem: (M) => Te(M, "English"),
                  getItemKey: (M) => `${M.book}-${M.chapterNum}-${M.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: wt.map(({ onClick: M, disabled: H, title: Q, icon: ut }) => /* @__PURE__ */ n(
              j,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  P(!0), M();
                },
                disabled: H,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: Q,
                onKeyDown: Qt,
                children: /* @__PURE__ */ n(ut, {})
              },
              Q
            )) })
          ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ n(
              j,
              {
                variant: "ghost",
                size: "sm",
                onClick: Rt,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ n(oi, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ n(ni, { className: "tw:h-4 tw:w-4" })
              }
            ),
            y && /* @__PURE__ */ n("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Pe(y, a) })
          ] }),
          !k && /* @__PURE__ */ u(ye, { ref: C, children: [
            b === "books" && /* @__PURE__ */ u(nt, { children: [
              !x && Object.entries(W).map(([M, H]) => {
                if (H.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ n(ae, { heading: ue(M), children: H.map((Q) => /* @__PURE__ */ n(
                      la,
                      {
                        bookId: Q,
                        onSelect: (ut) => ct(ut),
                        section: Ze(Q),
                        commandValue: `${Q} ${Se[Q]}`,
                        ref: Q === t.book ? T : void 0,
                        localizedBookNames: a
                      },
                      Q
                    )) }, M)
                  );
              }),
              x && /* @__PURE__ */ n(ae, { children: /* @__PURE__ */ n(
                le,
                {
                  value: `${x.book} ${Se[x.book]} ${x.chapterNum || ""}:${x.verseNum || ""})}`,
                  onSelect: F,
                  className: "tw:font-semibold tw:text-primary",
                  children: Te(
                    {
                      book: x.book,
                      chapterNum: x.chapterNum ?? 1,
                      verseNum: x.verseNum ?? 1
                    },
                    a ? No(x.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              x && Ht(x.book) > 1 && /* @__PURE__ */ u(nt, { children: [
                /* @__PURE__ */ n("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: Pe(x.book, a) }),
                /* @__PURE__ */ n(
                  nn,
                  {
                    bookId: x.book,
                    scrRef: t,
                    onChapterSelect: xt,
                    setChapterRef: Zt,
                    isChapterDimmed: yt,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ n(
              nn,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: xt,
                setChapterRef: Zt,
                className: "tw:p-4"
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
]), Nl = se(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function gt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Xi.Root,
    {
      ref: e,
      className: m("pr-twp", Nl(), t),
      ...r
    }
  );
}
function wa({
  className: t,
  ref: e,
  ...r
}) {
  const o = lt();
  return /* @__PURE__ */ n(
    to.Root,
    {
      className: m("pr-twp tw:grid tw:gap-2", t),
      ...r,
      ref: e,
      dir: o
    }
  );
}
function io({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    to.Item,
    {
      ref: e,
      className: m(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:ring-offset-background tw:focus:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(to.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ n(go, { className: "tw:h-2.5 tw:w-2.5 tw:fill-current tw:text-current" }) })
    }
  );
}
function Cl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function so({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: w = Cl,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: h = "",
  textPlaceholder: f = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: v = "start",
  isDisabled: b = !1,
  ariaLabel: N,
  ...y
}) {
  const [_, k] = R(!1), P = c ?? w, I = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], $ = (C, T) => {
    const E = w(C), O = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, L = `${T ?? ""}${E}${O ?? ""}`;
    return /* @__PURE__ */ u(
      le,
      {
        value: E,
        onSelect: () => {
          l(C), k(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ n(
            ie,
            {
              className: m("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || w(s) !== E
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            E,
            O && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              O
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ u(ce, { open: _, onOpenChange: k, ...y, children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ u(
      j,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": N,
        id: t,
        className: m(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            d && /* @__PURE__ */ n("div", { className: "tw:shrink-0 tw:pe-2", children: d }),
            /* @__PURE__ */ n(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? P(s) : h
              }
            )
          ] }),
          /* @__PURE__ */ n(Ue, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(
      we,
      {
        align: v,
        className: m("tw:w-[200px] tw:p-0", a),
        style: i,
        children: /* @__PURE__ */ u(xe, { children: [
          /* @__PURE__ */ n(sr, { placeholder: f, className: "tw:text-inherit" }),
          /* @__PURE__ */ n(Or, { children: p }),
          /* @__PURE__ */ n(ye, { children: I(e) ? e.map((C) => /* @__PURE__ */ n(ae, { heading: C.groupHeading, children: C.options.map((T) => $(T, C.groupHeading)) }, C.groupHeading)) : e.map((C) => $(C)) })
        ] })
      }
    )
  ] });
}
function El({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = V(
    () => Array.from({ length: i }, (c, d) => d + 1),
    [i]
  );
  return /* @__PURE__ */ u(nt, { children: [
    /* @__PURE__ */ n(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ n(
      so,
      {
        isDisabled: a,
        onChange: (c) => {
          r(c), c > e && o(c);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ n(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ n(
      so,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && r(c);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var lo = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(lo || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(lo || (lo = {}));
const hu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zr = (t, e) => t[e] ?? e;
function fu({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: w,
  localizedStrings: c
}) {
  const d = zr(c, "%webView_bookSelector_currentBook%"), h = zr(c, "%webView_bookSelector_choose%"), f = zr(c, "%webView_bookSelector_chooseBooks%"), [p, g] = R(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ n(
    wa,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(io, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ n(gt, { className: "tw:ms-1", children: d })
          ] }),
          /* @__PURE__ */ n(gt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ n(
            El,
            {
              isDisabled: p === "choose books",
              handleSelectStartChapter: w,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(io, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ n(gt, { className: "tw:ms-1", children: f })
          ] }),
          /* @__PURE__ */ n(gt, { className: "tw:flex tw:items-center", children: o.map((b) => st.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ n(
            j,
            {
              disabled: p === "current book",
              onClick: () => r(),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
const da = Dr(null);
function Tl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Jt() {
  const t = bo(da);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of r) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ua = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Sl = ua ? Pt : G, pr = { tag: vo };
function Rl({ initialConfig: t, children: e }) {
  const r = V(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: w } = t, c = Tl(null, o), d = zn({ editable: t.editable, html: w, namespace: a, nodes: i, onError: (h) => s(h, d), theme: o });
    return function(h, f) {
      if (f !== null) {
        if (f === void 0) h.update(() => {
          const p = oe();
          if (p.isEmpty()) {
            const g = He();
            p.append(g);
            const v = ua ? document.activeElement : null;
            (St() !== null || v !== null && v === h.getRootElement()) && g.select();
          }
        }, pr);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const p = h.parseEditorState(f);
            h.setEditorState(p, pr);
            break;
          }
          case "object":
            h.setEditorState(f, pr);
            break;
          case "function":
            h.update(() => {
              oe().isEmpty() && f(h);
            }, pr);
        }
      }
    }(d, l), [d, c];
  }, []);
  return Sl(() => {
    const o = t.editable, [a] = r;
    a.setEditable(o === void 0 || o);
  }, []), n(da.Provider, { value: r, children: e });
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : G;
function Ml({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Jt();
  return Dl(() => {
    if (r) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: w }) => {
      e && i.size === 0 && s.size === 0 || t && w.has(vo) || l.isEmpty() || r(a, o, w);
    });
  }, [o, t, e, r]), null;
}
const Eo = {
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
}, It = Mr.Provider, Lt = Mr.Root;
function Kt({
  className: t,
  variant: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    Mr.Trigger,
    {
      ref: r,
      className: e ? m(ca({ variant: e }), t) : t,
      ...o
    }
  );
}
function Vt({
  className: t,
  sideOffset: e = 4,
  style: r,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    Mr.Content,
    {
      ref: o,
      sideOffset: e,
      style: { zIndex: We, ...r },
      className: m(
        "pr-twp tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:px-3 tw:py-1.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a
    }
  );
}
const To = [
  Bs,
  jn,
  Fn,
  Ks
], Ol = Dr(null), jr = {
  didCatch: !1,
  error: null
};
class Il extends Wi {
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
      for (var r, o, a = arguments.length, i = new Array(a), s = 0; s < a; s++)
        i[s] = arguments[s];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: i,
        reason: "imperative-api"
      }), this.setState(jr);
    }
  }
  componentDidCatch(e, r) {
    var o, a;
    (o = (a = this.props).onError) === null || o === void 0 || o.call(a, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (o && r.error !== null && Al(e.resetKeys, a)) {
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
      FallbackComponent: o,
      fallback: a
    } = this.props, {
      didCatch: i,
      error: s
    } = this.state;
    let l = e;
    if (i) {
      const w = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        l = r(w);
      else if (o)
        l = Ho(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Ho(Ol.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Al() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function $l({ children: t, onError: e }) {
  return n(Il, { fallback: n("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Pl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : G;
function Ll(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Vl() {
  return function(t) {
    const [e] = Jt(), r = V(() => t(e), [e, t]), [o, a] = R(() => r.initialValueFn()), i = q(o);
    return Pl(() => {
      const { initialValueFn: s, subscribe: l } = r, w = s();
      return i.current !== w && (i.current = w, a(w)), l((c) => {
        i.current = c, a(c);
      });
    }, [r, t]), o;
  }(Ll);
}
function zl(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), a = getComputedStyle(r), i = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = Array.from(e.getClientRects());
  let l, w = s.length;
  s.sort((c, d) => {
    const h = c.top - d.top;
    return Math.abs(h) <= 3 ? c.left - d.left : h;
  });
  for (let c = 0; c < w; c++) {
    const d = s[c], h = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, f = d.width + i === o.width;
    h || f ? (s.splice(c--, 1), w--) : l = d;
  }
  return s;
}
function jl(t, e, r = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Ji(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), w = i.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [h, f] = Zi(t), p = l.is(w), g = e.is(s ? w : l), v = e.is(s ? l : w);
      let b, N = 0;
      p ? (N = h > f ? f : h, b = h > f ? h : f) : g ? (N = s ? f : h, b = void 0) : v && (N = 0, b = s ? h : f);
      const y = e.__text.slice(N, b);
      y !== e.__text && (r === "clone" && (e = Qi(e)), e.__text = y);
    }
  }
  return e;
}
function _r(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const pa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fl = pa && "documentMode" in document ? document.documentMode : null;
!(!pa || !("InputEvent" in window) || Fl) && "getTargetRanges" in new window.InputEvent("input");
function Ut(t) {
  return `${t}px`;
}
const Bl = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Kl(t, e, r) {
  let o = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function w() {
    o === null && _r(182), a === null && _r(183);
    const { left: h, top: f } = a.getBoundingClientRect(), p = zl(t, e);
    var g, v;
    l.isConnected || (v = l, (g = a).insertBefore(v, g.firstChild));
    let b = !1;
    for (let N = 0; N < p.length; N++) {
      const y = p[N], _ = s[N] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const P = Ut(y.left - h);
      k.left !== P && (k.left = P, b = !0);
      const I = Ut(y.top - f);
      k.top !== I && (_.style.top = I, b = !0);
      const $ = Ut(y.width);
      k.width !== $ && (_.style.width = $, b = !0);
      const C = Ut(y.height);
      k.height !== C && (_.style.height = C, b = !0), _.parentNode !== l && (l.append(_), b = !0), s[N] = _;
    }
    for (; s.length > p.length; ) s.pop();
    b && r(s);
  }
  function c() {
    a = null, o = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const h of s) h.remove();
    s = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function h() {
    const f = t.getRootElement();
    if (f === null) return c();
    const p = f.parentElement;
    if (!qn(p)) return c();
    c(), o = f, a = p, i = new MutationObserver((g) => {
      const v = t.getRootElement(), b = v && v.parentElement;
      if (v !== o || b !== a) return h();
      for (const N of g) if (!l.contains(N.target)) return w();
    }), i.observe(p, Bl), w();
  });
  return () => {
    d(), c();
  };
}
function an(t, e, r) {
  if (t.type !== "text" && te(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [ws(r) || r, t.offset];
}
function ql(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Ut(-1.5) && (r.marginTop = Ut(-1.5)), r.paddingTop !== Ut(4) && (r.paddingTop = Ut(4)), r.paddingBottom !== Ut(0) && (r.paddingBottom = Ut(0));
  }
}
function Gl(t, e = ql) {
  let r = null, o = null, a = null, i = null, s = null, l = null, w = () => {
  };
  function c(d) {
    d.read(() => {
      const h = St();
      if (!Wt(h)) return r = null, a = null, i = null, l = null, w(), void (w = () => {
      });
      const [f, p] = function(C) {
        const T = C.getStartEndPoints();
        return C.isBackward() ? [T[1], T[0]] : T;
      }(h), g = f.getNode(), v = g.getKey(), b = f.offset, N = p.getNode(), y = N.getKey(), _ = p.offset, k = t.getElementByKey(v), P = t.getElementByKey(y), I = r === null || k !== o || b !== a || v !== r.getKey(), $ = i === null || P !== s || _ !== l || y !== i.getKey();
      if ((I || $) && k !== null && P !== null) {
        const C = function(T, E, O, L, U, A, W) {
          const x = (T._window ? T._window.document : document).createRange();
          return x.setStart(...an(E, O, L)), x.setEnd(...an(U, A, W)), x;
        }(t, f, g, k, p, N, P);
        w(), w = Kl(t, C, e);
      }
      r = g, o = k, a = b, i = N, s = P, l = _;
    });
  }
  return c(t.getEditorState()), ne(t.registerUpdateListener(({ editorState: d }) => c(d)), () => {
    w();
  });
}
function Ul(t, e) {
  let r = null;
  const o = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Gl(t, e));
  };
  return t.registerRootListener((a) => {
    if (a) {
      const i = a.ownerDocument;
      return i.addEventListener("selectionchange", o), o(), () => {
        r !== null && r(), i.removeEventListener("selectionchange", o);
      };
    }
  });
}
function Hl(t) {
  const e = Kn(t, (r) => te(r) && !r.isInline());
  return te(e) || _r(4, t.__key), e;
}
function Wl(t) {
  const e = St() || ts();
  let r;
  if (Wt(e)) r = es(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = Bn(l, "next"));
    }
    r = r || rs(oe(), "previous").getFlipped().insert(He());
  }
  const o = Yl(t, r), a = os(o), i = ns(a) ? as(a) : o;
  return is(ss(i)), t.getLatest();
}
function Yl(t, e, r) {
  let o = Wo(e, "next");
  for (let a = o; a; a = ls(a, r)) o = a;
  return cs(o) && _r(283), o.insert(t.isInline() ? He().append(t) : t), Wo(Bn(t.getLatest(), "next"), e.direction);
}
function Xl(t) {
  const e = St();
  if (!Wt(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (r.has(s)) continue;
    const l = Kn(i, (c) => te(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !r.has(w) && (r.add(w), t(l));
  }
  return r.size > 0;
}
const Jl = Symbol.for("preact-signals");
function Ir() {
  if (ee > 1) return void ee--;
  let t, e = !1;
  for (!function() {
    let r = Nr;
    for (Nr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); tr !== void 0; ) {
    let r = tr;
    for (tr = void 0, Cr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && ha(r)) try {
        r.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      r = o;
    }
  }
  if (Cr = 0, ee--, e) throw t;
}
function Zl(t) {
  if (ee > 0) return t();
  co = ++Ql, ee++;
  try {
    return t();
  } finally {
    Ir();
  }
}
let X, tr;
function sn(t) {
  const e = X;
  X = void 0;
  try {
    return t();
  } finally {
    X = e;
  }
}
let Nr, ee = 0, Cr = 0, Ql = 0, co = 0, br = 0;
function ln(t) {
  if (X === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== X ? (e = { i: 0, S: t, p: X.s, n: void 0, t: X, e: void 0, x: void 0, r: e }, X.s !== void 0 && (X.s.n = e), X.s = e, t.n = e, 32 & X.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = X.s, e.n = void 0, X.s.n = e, X.s = e), e) : void 0;
}
function Ct(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function rr(t, e) {
  return new Ct(t, e);
}
function ha(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function cn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function fa(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Ne(t, e) {
  Ct.call(this, void 0), this.x = t, this.s = void 0, this.g = br - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function tc(t, e) {
  return new Ne(t, e);
}
function ma(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    ee++;
    const r = X;
    X = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, So(t), o;
    } finally {
      X = r, Ir();
    }
  }
}
function So(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ma(t);
}
function ec(t) {
  if (X !== this) throw new Error("Out-of-order effect");
  fa(this), X = t, this.f &= -2, 8 & this.f && So(this), Ir();
}
function $e(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Xt(t, e) {
  const r = new $e(t, e);
  try {
    r.c();
  } catch (a) {
    throw r.d(), a;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Ye(t, e = {}) {
  const r = {};
  for (const o in t) {
    const a = e[o], i = rr(a === void 0 ? t[o] : a);
    r[o] = i;
  }
  return r;
}
Ct.prototype.brand = Jl, Ct.prototype.h = function() {
  return !0;
}, Ct.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : sn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Ct.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && sn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Ct.prototype.subscribe = function(t) {
  return Xt(() => {
    const e = this.value, r = X;
    X = void 0;
    try {
      t(e);
    } finally {
      X = r;
    }
  }, { name: "sub" });
}, Ct.prototype.valueOf = function() {
  return this.value;
}, Ct.prototype.toString = function() {
  return this.value + "";
}, Ct.prototype.toJSON = function() {
  return this.value;
}, Ct.prototype.peek = function() {
  const t = X;
  X = void 0;
  try {
    return this.value;
  } finally {
    X = t;
  }
}, Object.defineProperty(Ct.prototype, "value", { get() {
  const t = ln(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Cr > 100) throw new Error("Cycle detected");
    (function(e) {
      ee !== 0 && Cr === 0 && e.l !== co && (e.l = co, Nr = { S: e, v: e.v, i: e.i, o: Nr });
    })(this), this.v = t, this.i++, br++, ee++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Ir();
    }
  }
} }), Ne.prototype = new Ct(), Ne.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === br)) return !0;
  if (this.g = br, this.f |= 1, this.i > 0 && !ha(this)) return this.f &= -2, !0;
  const t = X;
  try {
    cn(this), X = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return X = t, fa(this), this.f &= -2, !0;
}, Ne.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Ct.prototype.S.call(this, t);
}, Ne.prototype.U = function(t) {
  if (this.t !== void 0 && (Ct.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = ln(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), $e.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, $e.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ma(this), cn(this), ee++;
  const t = X;
  return X = this, ec.bind(this, t);
}, $e.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = tr, tr = this);
}, $e.prototype.d = function() {
  this.f |= 8, 1 & this.f || So(this);
}, $e.prototype.dispose = function() {
  this.d();
};
zt({ build: (t, e, r) => Ye(e), config: Oe({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Xt(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ga() {
  const t = oe(), e = St(), r = He();
  t.clear(), t.append(r), e !== null && r.select(), Wt(e) && (e.format = 0);
}
function ba(t, e = ga) {
  return t.registerCommand(Gn, (r) => (t.update(e), !0), xo);
}
zt({ build: (t, e, r) => Ye(e), config: Oe({ $onClear: ga }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Xt(() => ba(t, o.value));
} });
function rc(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Fr = us("format", { parse: (t) => typeof t == "number" ? t : 0 });
class va extends eo {
  $config() {
    return this.config("decorator-text", { extends: eo, stateConfigs: [{ flat: !0, stateConfig: Fr }] });
  }
  getFormat() {
    return Ns(this, Fr);
  }
  getFormatFlags(e, r) {
    return Yo(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Cs[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Es(this, Fr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = Yo(r, e, null);
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
function oc(t) {
  return t instanceof va;
}
zt({ name: "@lexical/extension/DecoratorText", nodes: () => [va], register: (t, e, r) => t.registerCommand(Un, (o) => {
  const a = St();
  if (Hn(a) || Wt(a)) for (const i of a.getNodes()) oc(i) && i.toggleFormat(o);
  return !1;
}, Wn) });
function xa(t, e) {
  let r;
  return rr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const wo = zt({ build: (t) => xa(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function tt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ya(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const a in o) r[a] = ya(r[a], o[a]);
    return t;
  }
  return e;
}
const Ro = 0, uo = 1, ka = 2, Br = 3, hr = 4, Ae = 5, Kr = 6, Xe = 7;
function qr(t) {
  return t.id === Ro;
}
function _a(t) {
  return t.id === ka;
}
function nc(t) {
  return function(e) {
    return e.id === uo;
  }(t) || tt(305, String(t.id), String(uo)), Object.assign(t, { id: ka });
}
const ac = /* @__PURE__ */ new Set();
class ic {
  constructor(e, r) {
    Nt(this, "builder");
    Nt(this, "configs");
    Nt(this, "_dependency");
    Nt(this, "_peerNameSet");
    Nt(this, "extension");
    Nt(this, "state");
    Nt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ro };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : ds;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    _a(r) || tt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, w, c) {
      return Object.assign(l, { config: w, id: Br, registerState: c });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: hr, initResult: w, registerState: c });
    }(i, s, a);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== hr && tt(307, String(r.id), String(Ae)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const a = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Ae, output: s, registerState: l });
    }(r, o, a);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Ae && tt(308, String(o.id), String(Ae));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Kr });
    }(o), () => {
      const i = this.state;
      i.id !== Xe && tt(309, String(o.id), String(Xe)), this.state = function(s) {
        return Object.assign(s, { id: Ae });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Kr && tt(310, String(r.id), String(Kr)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Xe });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && tt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && tt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= hr;
    }(e) || tt(313, String(e.id), String(hr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Br;
    }(e) || tt(314, String(e.id), String(Br)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && tt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && tt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Xe;
    }(e) || tt(316, String(e.id), String(Xe)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || ac;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Ae;
      })(e) || tt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const wn = { tag: vo };
function sc() {
  const t = oe();
  t.isEmpty() && t.append(He());
}
const lc = zt({ config: Oe({ setOptions: wn, updateOptions: wn }), init: ({ $initialEditorState: t = sc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (ms(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [ps, Fn, hs, fs, jn] }), dn = Symbol.for("@lexical/extension/LexicalBuilder");
function un() {
}
function cc(t) {
  throw t;
}
function fr(t) {
  return Array.isArray(t) ? t : [t];
}
const Gr = "0.43.0+prod.esm";
class Le {
  constructor(e) {
    Nt(this, "roots");
    Nt(this, "extensionNameMap");
    Nt(this, "outgoingConfigEdges");
    Nt(this, "incomingEdges");
    Nt(this, "conflicts");
    Nt(this, "_sortedExtensionReps");
    Nt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Gr, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [fr(lc)];
    for (const o of e) r.push(fr(o));
    return new Le(r);
  }
  static maybeFromEditor(e) {
    const r = e[dn];
    return r && (r.PACKAGE_VERSION !== Gr && tt(292, r.PACKAGE_VERSION, Gr), r instanceof Le || tt(293)), r;
  }
  static fromEditor(e) {
    const r = Le.maybeFromEditor(e);
    return r === void 0 && tt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), a = Object.assign(zn({ ...o, ...r ? { onError: (i) => {
      r(i, a);
    } } : {} }), { [dn]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = un;
    function r() {
      try {
        e();
      } finally {
        e = un;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = ne(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && tt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && tt(296);
    const r = fr(e), [o] = r;
    typeof o.name != "string" && tt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && tt(298, o.name), !a) {
      a = new ic(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && tt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && tt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = fr(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, a) => {
      let i = o.state;
      if (_a(i)) return;
      const s = o.extension.name;
      var l;
      qr(i) || tt(300, s, a || "[unknown]"), qr(l = i) || tt(304, String(l.id), String(Ro)), i = Object.assign(l, { id: uo }), o.state = i;
      const w = this.outgoingConfigEdges.get(s);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && r(d, s);
      }
      i = nc(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) qr(o.state) && r(o);
    for (const o of e) for (const [a, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && tt(301, o.name);
      for (const s of a) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], i = o.signal;
    for (const s of r) {
      const l = s.register(e, i);
      l && a.push(l);
    }
    for (const s of r) {
      const l = s.afterRegistration(e);
      l && a.push(l);
    }
    return ne(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: h } = d;
      if (h.onError !== void 0 && (e.onError = h.onError), h.disableEvents !== void 0 && (e.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (e.parentEditor = h.parentEditor), h.editable !== void 0 && (e.editable = h.editable), h.namespace !== void 0 && (e.namespace = h.namespace), h.$initialEditorState !== void 0 && (e.$initialEditorState = h.$initialEditorState), h.nodes) for (const f of rc(h)) {
        if (typeof f != "function") {
          const p = o.get(f.replace);
          p && tt(302, h.name, f.replace.name, p.extension.name), o.set(f.replace, d);
        }
        r.add(f);
      }
      if (h.html) {
        if (h.html.export) for (const [f, p] of h.html.export.entries()) a.set(f, p);
        h.html.import && Object.assign(i, h.html.import);
      }
      h.theme && ya(s, h.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const w = Object.keys(i).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = i), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = cc), e;
  }
}
const wc = /* @__PURE__ */ new Set(), pn = zt({ build(t, e, r) {
  const o = r.getDependency(wo).output, a = rr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = xa(() => {
  }, () => Xt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (St()) for (const [d, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(d);
          continue;
        }
        const f = Ss(d), p = f && f.isSelected() || !1;
        c = c || p !== (!!s && s.has(d)), p && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && s && w.size === s.size || (i.value = w);
  }));
  return { watchNodeKey: function(s) {
    const l = tc(() => (i.value || wc).has(s)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(s);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(s, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [wo], name: "@lexical/extension/NodeSelection" }), dc = gs("INSERT_HORIZONTAL_RULE_COMMAND");
class je extends eo {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new je(e.__key);
  }
  static importJSON(e) {
    return Do().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: uc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Yn(r, e.theme.hr), r;
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
function uc() {
  return { node: Do() };
}
function Do() {
  return Ts(je);
}
function pc(t) {
  return t instanceof je;
}
zt({ dependencies: [wo, pn], name: "@lexical/extension/HorizontalRule", nodes: () => [je], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(pn).output, a = rr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ne(t.registerCommand(dc, (s) => {
    const l = St();
    if (!Wt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const w = Do();
      Wl(w);
    }
    return !0;
  }, xo), t.registerCommand(bs, (s) => {
    if (vs(s.target)) {
      const l = xs(s.target);
      if (pc(l)) return function(w, c = !1) {
        const d = St(), h = w.isSelected(), f = w.getKey();
        let p;
        c && Hn(d) ? p = d : (p = ys(), ks(p)), h ? p.delete(f) : p.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Wn), t.registerMutationListener(je, (s, l) => {
    Zl(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, h] of s.entries()) if (h === "destroyed") c.delete(d), w = !0;
      else {
        const f = c.get(d), p = t.getElementByKey(d);
        f ? f.domNode.value = p : (w = !0, c.set(d, { domNode: rr(p), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), Xt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) s.push(Xt(() => {
      const c = l.value;
      c && (w.value ? Yn(c, i) : Rs(c, i));
    }));
    return ne(...s);
  }));
} });
zt({ build: (t, e) => Ye({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Oe({ $getParentEditor: function() {
  const t = _s();
  return Le.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Xt(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
zt({ build: (t, e, r) => Ye(e), config: Oe({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return Xt(() => {
    if (!o.disabled.value) return Ul(t, o.onReposition.value);
  });
} });
function Na(t) {
  return t.canBeEmpty();
}
function hc(t, e, r = Na) {
  return ne(t.registerCommand(Ds, (o) => {
    const a = St();
    if (!Wt(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => yr(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, w = s.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), h = Hl(d);
      if (h.canIndent()) {
        const f = h.getKey();
        let p = Ms();
        if (p.anchor.set(f, 0, "element"), p.focus.set(f, 0, "element"), p = Os(p), p.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Is : Xo : As;
    return t.dispatchCommand(i, void 0);
  }, xo), t.registerCommand(Xo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = St();
    if (!Wt(a)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return Xl((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, yo));
}
zt({ build: (t, e, r) => Ye(e), config: Oe({ $canIndent: Na, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: a, $canIndent: i } = r.getOutput();
  return Xt(() => {
    if (!o.value) return hc(t, a, i);
  });
} });
const fc = zt({ name: "@lexical/react/ReactProvider" });
function mc() {
  return oe().getTextContent();
}
function gc(t, e = !0) {
  if (t) return !1;
  let r = mc();
  return e && (r = r.trim()), r === "";
}
function bc(t) {
  if (!gc(t, !1)) return !1;
  const e = oe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const a = e[o];
    if ($s(a)) return !1;
    if (te(a)) {
      if (!Ps(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const w = i[o];
        if (!kr(w)) return !1;
      }
    }
  }
  return !0;
}
function Ca(t) {
  return () => bc(t);
}
function Ea(t) {
  const e = window.location.origin, r = (o) => {
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
          const w = l.args;
          if (w) {
            const [c, d, h, f, p] = w;
            t.update(() => {
              const g = St();
              if (Wt(g)) {
                const v = g.anchor;
                let b = v.getNode(), N = 0, y = 0;
                if (kr(b) && c >= 0 && d >= 0 && (N = c, y = c + d, g.setTextNodeRange(b, N, b, y)), N === y && h === "" || (g.insertRawText(h), b = v.getNode()), kr(b)) {
                  N = f, y = f + p;
                  const _ = b.getTextContentSize();
                  N = N > _ ? _ : N, y = y > _ ? _ : y, g.setTextNodeRange(b, N, b, y);
                }
                o.stopImmediatePropagation();
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
zt({ build: (t, e, r) => Ye(e), config: Oe({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Xt(() => r.getOutput().disabled.value ? void 0 : Ea(t)) });
function vc(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Mo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : G;
function xc({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [a, i] = R(() => r.getDecorators());
    return Mo(() => r.registerDecoratorListener((s) => {
      Gs(() => {
        i(s);
      });
    }), [r]), G(() => {
      i(r.getDecorators());
    }, [r]), V(() => {
      const s = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = n(o, { onError: (f) => r._onError(f), children: n(Yi, { fallback: null, children: a[c] }) }), h = r.getElementByKey(c);
        h !== null && s.push(Us(d, h, c));
      }
      return s;
    }, [o, a, r]);
  }(t, e);
}
function yc({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Le.maybeFromEditor(r);
    if (o && o.hasExtensionByName(fc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && vc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : n(xc, { editor: t, ErrorBoundary: e });
}
function hn(t) {
  return t.getEditorState().read(Ca(t.isComposing()));
}
function kc({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Jt();
  return function(a) {
    Mo(() => ne(qs(a), Ea(a)), [a]);
  }(o), u(nt, { children: [t, n(_c, { content: e }), n(yc, { editor: o, ErrorBoundary: r })] });
}
function _c({ content: t }) {
  const [e] = Jt(), r = function(a) {
    const [i, s] = R(() => hn(a));
    return Mo(() => {
      function l() {
        const w = hn(a);
        s(w);
      }
      return l(), ne(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = Vl();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Nc({ defaultSelection: t }) {
  const [e] = Jt();
  return G(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Cc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : G;
function Ec({ onClear: t }) {
  const [e] = Jt();
  return Cc(() => ba(e, t), [e, t]), null;
}
const Ta = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Pt : G;
function Tc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: h, ariaRequired: f, autoCapitalize: p, className: g, id: v, role: b = "textbox", spellCheck: N = !0, style: y, tabIndex: _, "data-testid": k, ...P }, I) {
  const [$, C] = R(t.isEditable()), T = z((O) => {
    O && O.ownerDocument && O.ownerDocument.defaultView ? t.setRootElement(O) : t.setRootElement(null);
  }, [t]), E = V(() => /* @__PURE__ */ function(...O) {
    return (L) => {
      for (const U of O) typeof U == "function" ? U(L) : U != null && (U.current = L);
    };
  }(I, T), [T, I]);
  return Ta(() => (C(t.isEditable()), t.registerEditableListener((O) => {
    C(O);
  })), [t]), n("div", { "aria-activedescendant": $ ? e : void 0, "aria-autocomplete": $ ? r : "none", "aria-controls": $ ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": $ && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": $ ? h : void 0, "aria-readonly": !$ || void 0, "aria-required": f, autoCapitalize: p, className: g, contentEditable: $, "data-testid": k, id: v, ref: E, role: b, spellCheck: N, style: y, tabIndex: _, ...P });
}
const Sc = ir(Tc);
function fn(t) {
  return t.getEditorState().read(Ca(t.isComposing()));
}
const Rc = ir(Dc);
function Dc(t, e) {
  const { placeholder: r, ...o } = t, [a] = Jt();
  return u(nt, { children: [n(Sc, { editor: a, ...o, ref: e }), r != null && n(Mc, { editor: a, content: r })] });
}
function Mc({ content: t, editor: e }) {
  const r = function(s) {
    const [l, w] = R(() => fn(s));
    return Ta(() => {
      function c() {
        const d = fn(s);
        w(d);
      }
      return c(), ne(s.registerUpdateListener(() => {
        c();
      }), s.registerEditableListener(() => {
        c();
      }));
    }, [s]), l;
  }(e), [o, a] = R(e.isEditable());
  if (Pt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : n("div", { "aria-hidden": !0, children: i });
}
function Oc({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ n(
    Rc,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ n(
        "div",
        {
          className: r ?? "tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const Sa = Dr(void 0);
function Ic({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: a,
  children: i
}) {
  const s = V(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: a
    }),
    [t, e, r, o, a]
  );
  return /* @__PURE__ */ n(Sa.Provider, { value: s, children: i });
}
function Ra() {
  const t = bo(Sa);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Ac() {
  const [t, e] = R(void 0), r = z(() => {
    e(void 0);
  }, []), o = V(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ n(dl, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(hl, { children: [
      /* @__PURE__ */ n(fl, { children: /* @__PURE__ */ n(ml, { children: i }) }),
      s
    ] }) });
  }, [t, r]), a = z(
    (i, s, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: s(r),
        title: i
      });
    },
    [r]
  );
  return [o, a];
}
function $c({
  children: t
}) {
  const [e] = Jt(), [r, o] = R(e), [a, i] = R("paragraph"), [s, l] = Ac(), w = () => {
  };
  return G(() => r.registerCommand(
    Xn,
    (c, d) => (o(d), !1),
    yo
  ), [r]), /* @__PURE__ */ u(
    Ic,
    {
      activeEditor: r,
      $updateToolbar: w,
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
function Pc(t) {
  const [e] = Jt(), { activeEditor: r } = Ra();
  G(() => r.registerCommand(
    Xn,
    () => {
      const o = St();
      return o && t(o), !1;
    },
    yo
  ), [e, t]), G(() => {
    r.getEditorState().read(() => {
      const o = St();
      o && t(o);
    });
  }, [r, t]);
}
const Lc = se(
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
), Da = Z.createContext({
  size: "default",
  variant: "default"
});
function Ma({
  className: t,
  variant: e,
  size: r,
  children: o,
  ref: a,
  ...i
}) {
  const s = lt();
  return /* @__PURE__ */ n(
    Qn.Root,
    {
      ref: a,
      className: m("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...i,
      dir: s,
      children: /* @__PURE__ */ n(
        Da.Provider,
        {
          value: { variant: e, size: r },
          children: o
        }
      )
    }
  );
}
function vr({
  className: t,
  children: e,
  variant: r,
  size: o,
  ref: a,
  ...i
}) {
  const s = Z.useContext(Da);
  return /* @__PURE__ */ n(
    Qn.Item,
    {
      ref: a,
      className: m(
        Lc({
          variant: s.variant || r,
          size: s.size || o
        }),
        t
      ),
      ...i,
      children: e
    }
  );
}
const mn = [
  { format: "bold", icon: ai, label: "Bold" },
  { format: "italic", icon: ii, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Vc() {
  const { activeEditor: t } = Ra(), [e, r] = R([]), o = z((a) => {
    if (Wt(a) || Hs(a)) {
      const i = [];
      mn.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Pc(o), /* @__PURE__ */ n(
    Ma,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: mn.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ n(
        vr,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Un, a);
          },
          children: /* @__PURE__ */ n(i, { className: "tw:h-4 tw:w-4" })
        },
        a
      ))
    }
  );
}
function zc({ onClear: t }) {
  const [e] = Jt();
  G(() => {
    t && t(() => {
      e.dispatchCommand(Gn, void 0);
    });
  }, [e, t]);
}
function jc({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = R(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ n($c, { children: () => /* @__PURE__ */ n("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ n(Vc, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ n(
        kc,
        {
          contentEditable: /* @__PURE__ */ n("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ n(Oc, { placeholder: t }) }),
          ErrorBoundary: $l
        }
      ),
      e && /* @__PURE__ */ n(Nc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ n(zc, { onClear: r }),
      /* @__PURE__ */ n(Ec, {})
    ] })
  ] });
}
const Fc = {
  namespace: "commentEditor",
  theme: Eo,
  nodes: To,
  onError: (t) => {
    console.error(t);
  }
};
function Er({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: a = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ n(
      "div",
      {
        className: m(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ n(
          Rl,
          {
            initialConfig: {
              ...Fc,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(It, { children: [
              /* @__PURE__ */ n(jc, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ n(
                Ml,
                {
                  ignoreSelectionChange: !0,
                  onChange: (w) => {
                    r == null || r(w), o == null || o(w.toJSON());
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
function Bc(t, e) {
  const r = Vs(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of r) if (!Ia.has(i.nodeName)) {
    const s = Aa(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Jn && s.insertAfter(Zn());
    for (const s of i) {
      const l = s.getChildren();
      for (const w of l) s.insertBefore(w);
      s.remove();
    }
  }(a), o;
}
function Kc(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), o = oe().getChildren();
  for (let a = 0; a < o.length; a++)
    Oa(t, o[a], r, e);
  return r.innerHTML;
}
function Oa(t, e, r, o = null) {
  let a = o === null || e.isSelected(o);
  const i = te(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && kr(e) && (s = jl(o, e, "clone"));
  const l = te(s) ? s.getChildren() : [], w = Ls(t, s.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: h } = c;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let p = 0; p < l.length; p++) {
    const g = l[p], v = Oa(t, g, f, o);
    !a && te(e) && v && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((qn(d) || Jo(d)) && d.append(f), r.append(d), h) {
      const p = h.call(s, d);
      p && (Jo(d) ? d.replaceChildren(p) : d.replaceWith(p));
    }
  } else r.append(f);
  return a;
}
const Ia = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Aa(t, e, r, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Ia.has(t.nodeName)) return s;
  let l = null;
  const w = function(g, v) {
    const { nodeName: b } = g, N = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (N !== void 0) for (const _ of N) {
      const k = _(g);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let d = null;
  if (c !== null) {
    d = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const h = t.childNodes;
  let f = [];
  const p = (l == null || !zs(l)) && (l != null && yr(l) || o);
  for (let g = 0; g < h.length; g++) f.push(...Aa(h[g], e, r, p, new Map(a), l));
  return d != null && (f = d(f)), Zo(t) && (f = qc(t, f, p ? () => {
    const g = new Jn();
    return r.push(g), g;
  } : He)), l == null ? f.length > 0 ? s = s.concat(f) : Zo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Qo(g.nextSibling) && Qo(g.previousSibling);
  }(t) && (s = s.concat(Zn())) : te(l) && l.append(...f), s;
}
function qc(t, e, r) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (yr(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && yr(e[s + 1])) {
      const w = r();
      w.setFormat(o), w.append(...i), a.push(w), i = [];
    }
  }
  return a;
}
function $a(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Pa(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Pa(e.children)
  ) : !1;
}
function $t(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Pa(t.root.children) : !1;
}
function Gc(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = ta({
    namespace: "EditorUtils",
    theme: Eo,
    nodes: To,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = Bc(e, a);
      oe().clear(), js(i);
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
function Tr(t) {
  const e = ta({
    namespace: "EditorUtils",
    theme: Eo,
    nodes: To,
    onError: (a) => {
      console.error(a);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Kc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Oo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function Fe({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ws.Root,
    {
      ref: o,
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
const Uc = se(
  "tw:flex tw:w-fit tw:items-stretch tw:has-[>[data-slot=button-group]]:gap-2 tw:[&>*]:focus-visible:relative tw:[&>*]:focus-visible:z-10 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "tw:[&>*:not(:first-child)]:rounded-l-none tw:[&>*:not(:first-child)]:border-l-0 tw:[&>*:not(:last-child)]:rounded-r-none",
        vertical: "tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function Io({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: m("pr-twp", Uc({ orientation: e }), t),
      ...r
    }
  );
}
function mu({
  className: t,
  asChild: e = !1,
  ...r
}) {
  return /* @__PURE__ */ n(
    e ? Me : "div",
    {
      className: m(
        "tw:shadow-xs tw:flex tw:items-center tw:gap-2 tw:rounded-md tw:border tw:bg-muted tw:px-4 tw:text-sm tw:font-medium tw:[&_svg:not([class*=size-])]:size-4 tw:[&_svg]:pointer-events-none",
        t
      ),
      ...r
    }
  );
}
function La({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ n(
    Fe,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: m(
        "tw:!m-0 tw:relative tw:self-stretch tw:bg-input tw:data-[orientation=vertical]:h-auto",
        t
      ),
      ...r
    }
  );
}
const Va = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), gn = (t, e) => t[e] ?? e;
function za({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = gn(o, "%cancelButton_tooltip%"), l = i ?? gn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Io, { children: [
    /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(
        j,
        {
          "aria-label": s,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ n(ar, {})
        }
      ) }),
      /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ n("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ n(La, {}),
    /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(
        j,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ n(ie, {})
        }
      ) }),
      /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ n("p", { children: l }) })
    ] }) })
  ] });
}
function xr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Ao(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Hc = {
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
function gu({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: a
}) {
  const [i, s] = R(Hc), [l, w] = R(a), [c, d] = R(!1), h = q(void 0), f = q(null);
  G(() => {
    let b = !0;
    const N = f.current;
    if (!N) return;
    const y = setTimeout(() => {
      b && $a(N);
    }, 300);
    return () => {
      b = !1, clearTimeout(y);
    };
  }, []);
  const p = z(() => {
    if (!$t(i)) return;
    const b = Tr(i);
    e(b, l);
  }, [i, e, l]), g = o["%commentEditor_placeholder%"] ?? "Type your comment here...", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ n("span", { className: "tw:text-sm tw:font-medium", children: v }),
      /* @__PURE__ */ n(
        za,
        {
          onCancelClick: r,
          onAcceptClick: p,
          canAccept: $t(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(ce, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ n(Dn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { children: Ur(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ n(
        we,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (b) => {
            b.key === "Escape" && (b.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ n(xe, { children: /* @__PURE__ */ n(ye, { children: t.map((b) => /* @__PURE__ */ n(
            le,
            {
              onSelect: () => {
                w(b || void 0), d(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ n("span", { children: Ur(b, o) })
            },
            b || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ n(
      "div",
      {
        ref: f,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (b) => {
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), r()) : Ao(b) && (b.preventDefault(), b.stopPropagation(), $t(i) && p());
        },
        onKeyDown: (b) => {
          Oo(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        },
        children: /* @__PURE__ */ n(
          Er,
          {
            editorSerializedState: i,
            onSerializedChange: (b) => s(b),
            placeholder: g,
            onClear: (b) => {
              h.current = b;
            }
          }
        )
      }
    )
  ] });
}
const bu = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Va
]), vu = [
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
], Wc = ["input", "select", "textarea", "button"], Yc = ["button", "textbox"], Xc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const a = q(null), [i, s] = R(void 0), [l, w] = R(void 0), c = z(
    (p) => {
      s(p);
      const g = t.find((b) => b.id === p);
      g && (e == null || e(g));
      const v = document.getElementById(p);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), d = z(
    (p) => {
      const g = t.find((v) => v.id === p);
      g && (w((v) => v === p ? void 0 : p), r == null || r(g));
    },
    [r, t]
  ), h = (p) => {
    if (!p) return !1;
    const g = p.tagName.toLowerCase();
    if (p.isContentEditable || Wc.includes(g)) return !0;
    const v = p.getAttribute("role");
    if (v && Yc.includes(v)) return !0;
    const b = p.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, f = z(
    (p) => {
      var $;
      const g = p.target, v = (C) => C ? document.getElementById(C) : void 0, b = v(l), N = v(i);
      if (!!(b && g && b.contains(g) && g !== b) && h(g)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const C = t.find((T) => T.id === l);
            C && c(C.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!b) return;
          const C = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const T = C.findIndex((O) => O === g);
          if (T === -1) return;
          let E;
          p.key === "ArrowDown" ? E = Math.min(T + 1, C.length - 1) : E = Math.max(T - 1, 0), E !== T && (p.preventDefault(), p.stopPropagation(), ($ = C[E]) == null || $.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((C) => C.id === i);
      let P = k;
      switch (p.key) {
        case "ArrowDown":
          P = Math.min(k + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(k - 1, 0), p.preventDefault();
          break;
        case "Home":
          P = 0, p.preventDefault();
          break;
        case "End":
          P = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const C = N;
          if (C) {
            const T = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), E = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), O = T ?? E;
            if (O) {
              p.preventDefault(), O.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (h(g) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const I = t[P];
      I && c(I.id);
    },
    [t, c, i, l, d, o]
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
}, Jc = se(
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
function or({
  className: t,
  variant: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n("div", { ref: r, className: m("pr-twp", Jc({ variant: e }), t), ...o });
}
function Zc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function xu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6", t),
      ...r
    }
  );
}
function yu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function ku({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "p",
    {
      ref: e,
      className: m("pr-twp tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function Qc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("div", { ref: e, className: m("pr-twp tw:p-6 tw:pt-0", t), ...r });
}
function _u({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0", t),
      ...r
    }
  );
}
function tw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ko.Root,
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
function Nu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ko.Image,
    {
      ref: e,
      className: m("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...r
    }
  );
}
function ew({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ko.Fallback,
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
const $o = Dr(void 0);
function de() {
  const t = bo($o);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ie = se("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Re = bt.Trigger, ja = bt.Group, rw = bt.Portal, ow = bt.Sub, nw = bt.RadioGroup;
function ge({ variant: t = "default", ...e }) {
  const r = Z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n($o.Provider, { value: r, children: /* @__PURE__ */ n(bt.Root, { ...e }) });
}
function aw({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...a
}) {
  const i = de();
  return /* @__PURE__ */ u(
    bt.SubTrigger,
    {
      ref: o,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:data-[state=open]:bg-accent",
        e && "tw:pl-8",
        t,
        Ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(ze, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function iw({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  const a = lt();
  return /* @__PURE__ */ n(
    bt.SubContent,
    {
      ref: r,
      className: m(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: a, children: e })
    }
  );
}
function be({
  className: t,
  sideOffset: e = 4,
  children: r,
  ref: o,
  ...a
}) {
  const i = lt();
  return /* @__PURE__ */ n(bt.Portal, { children: /* @__PURE__ */ n(
    bt.Content,
    {
      ref: o,
      sideOffset: e,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ n("div", { dir: i, children: r })
    }
  ) });
}
function po({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  const a = lt(), i = de();
  return /* @__PURE__ */ n(
    bt.Item,
    {
      ref: r,
      className: m(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t,
        Ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: a
    }
  );
}
function me({
  className: t,
  children: e,
  checked: r,
  ref: o,
  ...a
}) {
  const i = lt(), s = de();
  return /* @__PURE__ */ u(
    bt.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Ie({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      dir: i,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ n(bt.ItemIndicator, { children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function sw({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  const a = lt(), i = de();
  return /* @__PURE__ */ u(
    bt.RadioItem,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        Ie({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ n(bt.ItemIndicator, { children: /* @__PURE__ */ n(go, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Ar({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    bt.Label,
    {
      ref: r,
      className: m("tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold", e && "tw:pl-8", t),
      ...o
    }
  );
}
function lr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    bt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function Cu({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function bn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [w, c] = R(!1), [d, h] = R(), f = q(null);
  G(() => {
    if (!w) return;
    let k = !0;
    const P = f.current;
    if (!P) return;
    const I = setTimeout(() => {
      k && $a(P);
    }, 300);
    return () => {
      k = !1, clearTimeout(I);
    };
  }, [w]);
  const p = z(
    (k) => {
      k && k.stopPropagation(), c(!1), h(void 0), s == null || s(!1);
    },
    [s]
  ), g = z(
    async (k) => {
      if (k && k.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        Tr(d)
      ) && (c(!1), h(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), v = V(() => {
    const k = new Date(t.date), P = Fi(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), I = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ee(r["%comment_dateAtTime%"], {
      date: P,
      time: I
    });
  }, [t.date, r]), b = V(() => t.user, [t.user]), N = V(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = V(() => Bi(t.contents), [t.contents]), _ = V(() => {
    if (o && l)
      return /* @__PURE__ */ u(nt, { children: [
        /* @__PURE__ */ u(
          po,
          {
            onClick: (k) => {
              k.stopPropagation(), c(!0), h(Gc(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ n(si, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          po,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ n(li, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    o,
    r,
    t.contents,
    t.id,
    i,
    s
  ]);
  return /* @__PURE__ */ u(
    "div",
    {
      className: m("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ n(tw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ n(ew, { className: "tw:text-xs tw:font-medium", children: N }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ n("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ n("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: v }),
            /* @__PURE__ */ n("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(or, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              xr(t.assignedUser, r)
            ] })
          ] }),
          w && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: f,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), p()) : Ao(k) && (k.preventDefault(), k.stopPropagation(), $t(d) && g());
              },
              onKeyDown: (k) => {
                Oo(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ n(
                  Er,
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
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ n(
                    j,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ n(ar, {})
                    }
                  ),
                  /* @__PURE__ */ n(
                    j,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !$t(d),
                      children: /* @__PURE__ */ n(Mn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ u(nt, { children: [
            t.status === "Resolved" && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ n(
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
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ u(ge, { children: [
          /* @__PURE__ */ n(Re, { asChild: !0, children: /* @__PURE__ */ n(j, { variant: "ghost", size: "icon", children: /* @__PURE__ */ n(ci, {}) }) }),
          /* @__PURE__ */ n(be, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const vn = {
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
function lw({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: w,
  thread: c,
  threadStatus: d,
  handleAddCommentToThread: h,
  handleUpdateComment: f,
  handleDeleteComment: p,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: P = 5,
  onVerseRefClick: I,
  initialAssignedUser: $
}) {
  const [C, T] = R(vn), [E, O] = R(), [L, U] = R(), A = o, [W, x] = R(!1), [F, ct] = R(!1), [xt, At] = R(!1), [wt, Rt] = R(!1), [K, at] = R(!1), [rt, dt] = R(k), [Tt, ue] = R(!1), yt = q(void 0), [pe, Zt] = R(/* @__PURE__ */ new Map());
  G(() => {
    let S = !0;
    return (async () => {
      const ft = y ? await y(w) : !1;
      S && at(ft);
    })(), () => {
      S = !1;
    };
  }, [w, y]), G(() => {
    let S = !0;
    if (!o) {
      Rt(!1), Zt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = N ? await N(w) : !1;
      S && Rt(ft);
    })(), () => {
      S = !1;
    };
  }, [o, w, N]);
  const kt = q("idle");
  G(() => {
    if (!o) {
      kt.current !== "idle" && (O(void 0), U(void 0), kt.current = "idle");
      return;
    }
    kt.current === "idle" && (kt.current = "pending"), wt ? kt.current === "pending" && $ !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    $ !== i && (O($), kt.current = "auto-populated") : kt.current === "auto-populated" && (O(void 0), kt.current = "pending");
  }, [o, $, wt, i]);
  const jt = V(() => e.filter((S) => !S.deleted), [e]);
  G(() => {
    let S = !0;
    if (!o || !_) {
      Zt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ft = /* @__PURE__ */ new Map();
      await Promise.all(
        jt.map(async (Ft) => {
          const ti = await _(Ft.id);
          S && ft.set(Ft.id, ti);
        })
      ), S && Zt(ft);
    })(), () => {
      S = !1;
    };
  }, [o, jt, _]);
  const Qt = V(() => jt[0], [jt]), M = q(null), H = q(void 0), Q = z(() => {
    var S;
    (S = H.current) == null || S.call(H), T(vn);
  }, []), ut = z(() => {
    const S = !rt;
    dt(S), ue(!S), g == null || g(w, S);
  }, [rt, g, w]);
  G(() => {
    x(!1);
  }, [o]), G(() => {
    if (o && !rt && !Tt) {
      const S = setTimeout(() => {
        dt(!0), g == null || g(w, !0);
      }, P * 1e3);
      return yt.current = S, () => clearTimeout(S);
    }
    yt.current && (clearTimeout(yt.current), yt.current = void 0);
  }, [o, rt, Tt, P, w, g]);
  const ot = V(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Dt = V(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const S = xr(i, r);
    return Ee(r["%comment_assigned_to%"], {
      assignedUser: S
    });
  }, [i, r]), D = V(() => jt.slice(1), [jt]), B = V(() => D.length ?? 0, [D.length]), et = V(() => B > 0, [B]), it = V(() => W || B <= 2 ? D : D.slice(-2), [D, B, W]), pt = V(() => W || B <= 2 ? 0 : B - 2, [B, W]), _t = V(
    () => B === 1 ? ot.singleReply : Ee(ot.multipleReplies, { count: B }),
    [B, ot]
  ), Mt = V(
    () => pt === 1 ? ot.singleReply : Ee(ot.multipleReplies, { count: pt }),
    [pt, ot]
  );
  G(() => {
    !o && F && et && ct(!1);
  }, [o, F, et]);
  const mt = z(
    async (S) => {
      S && S.stopPropagation();
      const ht = $t(C) ? Tr(C) : void 0;
      if (E !== void 0) {
        await h({
          threadId: w,
          contents: ht,
          assignedUser: E
        }) && (U(E), ht && Q());
        return;
      }
      ht && await h({ threadId: w, contents: ht }) && Q();
    },
    [
      Q,
      C,
      h,
      E,
      w
    ]
  ), Ot = z(
    async (S) => {
      const ht = $t(C) ? Tr(C) : void 0, ft = S.status ? S.assignedUser : E ?? S.assignedUser, Ft = await h({
        ...S,
        contents: ht,
        assignedUser: ft
      });
      return Ft && (ft !== void 0 && U(ft), ht && Q()), Ft;
    },
    [Q, C, h, E]
  );
  if (jt.length !== 0)
    return /* @__PURE__ */ n(
      Zc,
      {
        role: "option",
        "aria-selected": o,
        id: w,
        className: m(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !o },
          {
            "tw:bg-primary-foreground": !o && d !== "Resolved" && rt,
            "tw:bg-background": o && d !== "Resolved" && rt,
            "tw:bg-muted": d === "Resolved",
            "tw:bg-accent": !rt && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(w);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ u(Qc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              Dt && /* @__PURE__ */ n(or, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Dt }),
              /* @__PURE__ */ n(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (S) => {
                    S.stopPropagation(), ut();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": rt ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: rt ? /* @__PURE__ */ n(wi, {}) : /* @__PURE__ */ n(di, {})
                }
              ),
              K && d !== "Resolved" && /* @__PURE__ */ n(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  className: m(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (S) => {
                    S.stopPropagation(), Ot({
                      threadId: w,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
              "p",
              {
                ref: M,
                className: m(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": A
                  },
                  { "tw:whitespace-nowrap": !A }
                ),
                children: [
                  a && I ? /* @__PURE__ */ n(
                    j,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (S) => {
                        S.stopPropagation(), I(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ u("span", { className: t, children: [
                    Qt.contextBefore,
                    /* @__PURE__ */ n("span", { className: "tw:font-bold", children: Qt.selectedText }),
                    Qt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ n(
              bn,
              {
                comment: Qt,
                localizedStrings: r,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: Ot,
                handleUpdateComment: f,
                handleDeleteComment: p,
                onEditingChange: ct,
                canEditOrDelete: (!F && pe.get(Qt.id)) ?? !1,
                canUserResolveThread: K
              }
            )
          ] }),
          /* @__PURE__ */ u(nt, { children: [
            et && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ n("div", { className: "tw:w-8", children: /* @__PURE__ */ n(Fe, {}) }),
              /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: _t })
            ] }),
            !o && $t(C) && /* @__PURE__ */ n(
              Er,
              {
                editorSerializedState: C,
                onSerializedChange: (S) => T(S),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ u(nt, { children: [
              pt > 0 && /* @__PURE__ */ u(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (S) => {
                    S.stopPropagation(), x(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (S) => {
                    (S.key === "Enter" || S.key === " ") && (S.preventDefault(), S.stopPropagation(), x(!0));
                  },
                  children: [
                    /* @__PURE__ */ n("div", { className: "tw:w-8", children: /* @__PURE__ */ n(Fe, {}) }),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: Mt }),
                      W ? /* @__PURE__ */ n(On, {}) : /* @__PURE__ */ n(Ue, {})
                    ] })
                  ]
                }
              ),
              it.map((S) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
                bn,
                {
                  comment: S,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: p,
                  onEditingChange: ct,
                  canEditOrDelete: (!F && pe.get(S.id)) ?? !1
                }
              ) }, S.id)),
              b !== !1 && (!F || $t(C)) && /* @__PURE__ */ u(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (S) => S.stopPropagation(),
                  onKeyDownCapture: (S) => {
                    Ao(S) && (S.preventDefault(), S.stopPropagation(), ($t(C) || E !== void 0 && E !== L) && mt());
                  },
                  onKeyDown: (S) => {
                    Oo(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ n(
                      Er,
                      {
                        editorSerializedState: C,
                        onSerializedChange: (S) => T(S),
                        placeholder: d === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (S) => {
                          H.current = S;
                        }
                      }
                    ),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      E !== void 0 && ($t(C) || E !== L) && /* @__PURE__ */ n("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ee(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: xr(
                            E,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ u(ce, { open: xt, onOpenChange: At, children: [
                        /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ n(
                          j,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !wt || !v || v.length === 0 || !v.includes(s),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ n(Dn, {})
                          }
                        ) }),
                        /* @__PURE__ */ n(
                          we,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (S) => {
                              S.key === "Escape" && (S.stopPropagation(), At(!1));
                            },
                            children: /* @__PURE__ */ n(xe, { children: /* @__PURE__ */ n(ye, { children: v == null ? void 0 : v.map((S) => /* @__PURE__ */ n(
                              le,
                              {
                                onSelect: () => {
                                  O(S !== i ? S : void 0), kt.current = "user-selected", U(void 0), At(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ n("span", { children: xr(S, r) })
                              },
                              S || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ n(
                        j,
                        {
                          size: "icon",
                          onClick: mt,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !$t(C) && (E === void 0 || E === L),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ n(Mn, {})
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
function Eu({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: w,
  assignableUsers: c,
  canUserAddCommentToThread: d,
  canUserAssignThreadCallback: h,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [N, y] = R(/* @__PURE__ */ new Set()), [_, k] = R(), [P, I] = R(), $ = z(
    async (x) => {
      const F = await i(x);
      return F !== void 0 && x.assignedUser !== void 0 && x.assignedUser !== "" && I(x.assignedUser), F;
    },
    [i]
  );
  G(() => {
    g && (y((x) => new Set(x).add(g)), k(g));
  }, [g]);
  const C = r.filter(
    (x) => x.comments.some((F) => !F.deleted)
  ), T = C.map((x) => ({ id: x.id })), E = z(
    (x) => {
      y((F) => new Set(F).add(x.id)), k(x.id), v == null || v(x.id);
    },
    [v]
  ), O = z(
    (x) => {
      const F = N.has(x);
      y((ct) => {
        const xt = new Set(ct);
        return xt.has(x) ? xt.delete(x) : xt.add(x), xt;
      }), k(x), v == null || v(F ? void 0 : x);
    },
    [N, v]
  ), { listboxRef: L, activeId: U, handleKeyDown: A } = Xc({
    options: T,
    onOptionSelect: E
  }), W = z(
    (x) => {
      x.key === "Escape" ? (_ && N.has(_) && (y((F) => {
        const ct = new Set(F);
        return ct.delete(_), ct;
      }), k(void 0), v == null || v(void 0)), x.preventDefault(), x.stopPropagation()) : A(x);
    },
    [_, N, A, v]
  );
  return /* @__PURE__ */ n(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: L,
      "aria-activedescendant": U ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: W,
      children: C.map((x) => /* @__PURE__ */ n(
        "div",
        {
          className: m({
            "tw:opacity-60": x.status === "Resolved"
          }),
          children: /* @__PURE__ */ n(
            lw,
            {
              classNameForVerseText: e,
              comments: x.comments,
              localizedStrings: a,
              verseRef: x.verseRef,
              handleSelectThread: O,
              threadId: x.id,
              thread: x,
              isRead: x.isRead,
              isSelected: N.has(x.id),
              currentUser: o,
              assignedUser: x.assignedUser,
              threadStatus: x.status,
              handleAddCommentToThread: $,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: h,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: b,
              initialAssignedUser: P
            }
          )
        },
        x.id
      ))
    }
  );
}
function cw({ table: t }) {
  return /* @__PURE__ */ u(ge, { children: [
    /* @__PURE__ */ n(Ys, { asChild: !0, children: /* @__PURE__ */ u(j, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ n(ui, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(be, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ n(Ar, { children: "Toggle columns" }),
      /* @__PURE__ */ n(lr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ n(
        me,
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
const Be = Et.Root, ww = Et.Group, Ke = Et.Value, dw = se(
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
function qe({
  className: t,
  children: e,
  size: r,
  ref: o,
  ...a
}) {
  const i = lt();
  return /* @__PURE__ */ u(
    Et.Trigger,
    {
      className: m(dw({ size: r, className: t })),
      ref: o,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ n(Et.Icon, { asChild: !0, children: /* @__PURE__ */ n(Ue, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function uw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Et.ScrollUpButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(On, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function pw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Et.ScrollDownButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(Ue, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Ge({
  className: t,
  children: e,
  position: r = "popper",
  ref: o,
  ...a
}) {
  const i = lt();
  return /* @__PURE__ */ n(Et.Portal, { children: /* @__PURE__ */ u(
    Et.Content,
    {
      ref: o,
      className: m(
        "pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      ...a,
      children: [
        /* @__PURE__ */ n(uw, {}),
        /* @__PURE__ */ n(
          Et.Viewport,
          {
            className: m(
              "tw:p-1",
              r === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ n("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ n(pw, {})
      ]
    }
  ) });
}
function Tu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Et.Label,
    {
      ref: e,
      className: m("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...r
    }
  );
}
function Bt({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Et.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(Et.ItemIndicator, { children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ n(Et.ItemText, { children: e })
      ]
    }
  );
}
function Su({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Et.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function hw({ table: t }) {
  return /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ n("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ u(
        Be,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ n(qe, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ n(Ke, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ n(Ge, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ n(Bt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ n(pi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ n(hi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ n(fi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ n(mi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const xn = `
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
function fw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function nr(t, e) {
  const r = e ? `${xn}, ${e}` : xn;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && fw(o)
  );
}
function Po({
  className: t,
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const a = Z.useRef(null);
  Z.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), Z.useEffect(() => {
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
    const w = new MutationObserver(() => {
      l();
    });
    return w.observe(s, {
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
  return /* @__PURE__ */ n("div", { className: m("pr-twp tw:relative tw:w-full", { "tw:p-1": e }), children: /* @__PURE__ */ n(
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
      ...o
    }
  ) });
}
function Lo({
  className: t,
  stickyHeader: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
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
      ...o
    }
  );
}
function Vo({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("tbody", { ref: e, className: m("tw:[&_tr:last-child]:border-0", t), ...r });
}
function Ru({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function mw(t) {
  Z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? nr(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < a.length && a[s].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function gw(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function bw(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function fe({
  className: t,
  onKeyDown: e,
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: a,
  ...i
}) {
  const s = Z.useRef(null);
  Z.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), mw(s);
  const l = Z.useMemo(
    () => s.current ? nr(s.current) : [],
    [s]
  ), w = Z.useCallback(
    (d) => {
      const { current: h } = s;
      if (!h || !h.parentElement) return;
      const f = h.closest("table"), p = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        nr(f).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = p.indexOf(h), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), bw(p, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), gw(l, v, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = h.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), c = Z.useCallback(
    (d) => {
      o && (r == null || r(d));
    },
    [o, r]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: w,
      onFocus: c,
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
function Sr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function Ve({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "td",
    {
      ref: e,
      className: m("tw:p-4 tw:align-middle tw:[&:has([role=checkbox])]:pe-0", t),
      ...r
    }
  );
}
function Du({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "caption",
    {
      ref: e,
      className: m("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function ho({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function vw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: w = !1,
  noResultsMessage: c
}) {
  var I;
  const [d, h] = R([]), [f, p] = R([]), [g, v] = R({}), [b, N] = R({}), y = V(() => e ?? [], [e]), _ = ea({
    data: y,
    columns: t,
    getCoreRowModel: oa(),
    ...r && { getPaginationRowModel: Js() },
    onSortingChange: h,
    getSortedRowModel: ra(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Xs(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: N,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let P;
  return w ? P = Array.from({ length: 10 }).map((T, E) => `skeleton-row-${E}`).map((T) => /* @__PURE__ */ n(fe, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ n(Ve, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ n("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ n(ho, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, T)) : ((I = _.getRowModel().rows) == null ? void 0 : I.length) > 0 ? P = _.getRowModel().rows.map(($) => /* @__PURE__ */ n(
    fe,
    {
      onClick: () => s($, _),
      "data-state": $.getIsSelected() && "selected",
      children: $.getVisibleCells().map((C) => /* @__PURE__ */ n(Ve, { children: Qe(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    $.id
  )) : P = /* @__PURE__ */ n(fe, { children: /* @__PURE__ */ n(Ve, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: c }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ n(cw, { table: _ }),
    /* @__PURE__ */ u(Po, { stickyHeader: i, children: [
      /* @__PURE__ */ n(Lo, { stickyHeader: i, children: _.getHeaderGroups().map(($) => /* @__PURE__ */ n(fe, { children: $.headers.map((C) => /* @__PURE__ */ n(Sr, { className: "tw:p-0", children: C.isPlaceholder ? void 0 : Qe(C.column.columnDef.header, C.getContext()) }, C.id)) }, $.id)) }),
      /* @__PURE__ */ n(Vo, { children: P })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ n(
        j,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n(
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
    r && o && /* @__PURE__ */ n(hw, { table: _ })
  ] });
}
function Mu({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: a
}) {
  const i = V(
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
  return /* @__PURE__ */ n(
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
      children: /* @__PURE__ */ n(tl, { options: i, children: e })
    }
  );
}
const xw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), yn = (t, e) => t[e] ?? e;
function yw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const a = yn(r, "%webView_error_dump_header%"), i = yn(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ u(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ u("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ u("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ n("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: a }),
            /* @__PURE__ */ n("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ n(j, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ n(In, {}) })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ n("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Ou = Object.freeze([
  ...xw,
  "%webView_error_dump_copied_message%"
]);
function Iu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = R(!1), w = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ u(ce, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: o }),
    /* @__PURE__ */ u(we, { id: i, className: m("tw:min-w-80 tw:max-w-96", a), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ n(gt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ n(
        yw,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var kw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(kw || {});
function Au({ id: t, label: e, groups: r }) {
  const [o, a] = R(
    Object.fromEntries(
      r.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = R({}), l = (c, d) => {
    const h = !o[c][d];
    a((p) => (p[c][d] = h, { ...p }));
    const f = r[c].items[d];
    f.onUpdate(f.id, h);
  }, w = (c, d) => {
    s((f) => (f[c] = d, { ...f }));
    const h = r[c].items.find((f) => f.id === d);
    h ? h.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ n("div", { id: t, children: /* @__PURE__ */ u(ge, { children: [
    /* @__PURE__ */ n(Re, { asChild: !0, children: /* @__PURE__ */ u(j, { variant: "default", children: [
      /* @__PURE__ */ n(gi, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ n(Ue, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ n(be, { children: r.map((c, d) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n(Ar, { children: c.label }),
      /* @__PURE__ */ n(ja, { children: c.itemType === 0 ? /* @__PURE__ */ n(nt, { children: c.items.map((h, f) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
        me,
        {
          checked: o[d][f],
          onCheckedChange: () => l(d, f),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ n(
        nw,
        {
          value: i[d],
          onValueChange: (h) => w(d, h),
          children: c.items.map((h) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(sw, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ n(lr, {})
    ] }, c.label)) })
  ] }) });
}
function $u({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const w = new Ki("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((d, h) => d + h, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ u(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ n("div", { className: "tw:flex", children: /* @__PURE__ */ n("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ n("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ n(bi, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w })
          ] }),
          /* @__PURE__ */ n("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((d) => /* @__PURE__ */ n("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d.toUpperCase() }, d)) }),
          o.length > 3 && /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => c(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || s) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          a && /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            j,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ n(vi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            j,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ n(xi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function _w({ id: t, versionHistory: e }) {
  const [r, o] = R(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, h = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let p = "";
    return d > 0 ? p = `${d.toString()} year${d === 1 ? "" : "s"} ago` : h > 0 ? p = `${h.toString()} month${h === 1 ? "" : "s"} ago` : f === 0 ? p = "today" : p = `${f.toString()} day${f === 1 ? "" : "s"} ago`, p;
  }
  const s = Object.entries(e).sort((l, w) => w[0].localeCompare(l[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ n("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ n("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ n("div", { className: "tw:text-foreground", children: /* @__PURE__ */ n("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ n("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ n("div", { children: i(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: () => o(!r),
        className: "tw:text-xs tw:text-foreground tw:underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Pu({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = V(() => qi(r), [r]), w = ((c) => {
    const d = new Intl.DisplayNames(Gi(), { type: "language" });
    return c.map((h) => d.of(h));
  })(o);
  return /* @__PURE__ */ n("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ n(_w, { versionHistory: a }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ n("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Publisher" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ n("span", { children: "Size" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Version" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ n("span", { children: "Languages" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Nw({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: c = void 0,
  onOpenChange: d = void 0,
  isDisabled: h = !1,
  sortSelected: f = !1,
  icon: p = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [N, y] = R(!1), _ = z(
    (E) => {
      var L;
      const O = (L = t.find((U) => U.label === E)) == null ? void 0 : L.value;
      O && r(
        e.includes(O) ? e.filter((U) => U !== O) : [...e, O]
      );
    },
    [t, e, r]
  ), k = () => w || o, P = V(() => {
    if (!f) return t;
    const E = t.filter((L) => L.starred).sort((L, U) => L.label.localeCompare(U.label)), O = t.filter((L) => !L.starred).sort((L, U) => {
      const A = e.includes(L.value), W = e.includes(U.value);
      return A && !W ? -1 : !A && W ? 1 : L.label.localeCompare(U.label);
    });
    return [...E, ...O];
  }, [t, e, f]), I = () => {
    r(t.map((E) => E.value));
  }, $ = () => {
    r([]);
  }, C = c ?? N;
  return /* @__PURE__ */ n("div", { id: b, className: g, children: /* @__PURE__ */ u(ce, { open: C, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ u(
      j,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ n(An, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(we, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ u(xe, { children: [
      /* @__PURE__ */ n(sr, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(j, { variant: "ghost", size: "sm", onClick: I, children: i }),
        /* @__PURE__ */ n(j, { variant: "ghost", size: "sm", onClick: $, children: s })
      ] }),
      /* @__PURE__ */ u(ye, { children: [
        /* @__PURE__ */ n(Or, { children: l }),
        /* @__PURE__ */ n(ae, { children: P.map((E) => /* @__PURE__ */ u(
          le,
          {
            value: E.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                ie,
                {
                  className: m(
                    "tw:h-4 tw:w-4",
                    e.includes(E.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              E.starred && /* @__PURE__ */ n(yi, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: E.label }),
              E.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: E.secondaryLabel })
            ]
          },
          E.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Lu({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: w,
  className: c,
  badgesPlaceholder: d,
  id: h
}) {
  return /* @__PURE__ */ u("div", { id: h, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Nw,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: w,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((f) => {
      var p;
      return /* @__PURE__ */ u(or, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ n(
          j,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ n(ar, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((g) => g.value === f)) == null ? void 0 : p.label
      ] }, f);
    }) }) : /* @__PURE__ */ n(gt, { children: d })
  ] });
}
const fo = Z.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "kbd",
  {
    ref: r,
    className: m(
      "pr-twp tw:rounded tw:border tw:border-border tw:bg-muted tw:px-1 tw:py-0.5 tw:font-mono tw:text-xs",
      t
    ),
    ...e
  }
));
fo.displayName = "Kbd";
const Cw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), kn = (t, e) => t[e] ?? e;
function Ew({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const w = V(() => /Macintosh/i.test(navigator.userAgent), []), c = kn(a, "%undoButton_tooltip%"), d = kn(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Io, { children: [
    /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(
        j,
        {
          "aria-label": c,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ n(ki, {})
        }
      ) }),
      /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ u("p", { children: [
        c,
        i && /* @__PURE__ */ u(nt, { children: [
          " ",
          /* @__PURE__ */ n(fo, { children: w ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ n(La, {}),
    e && /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(
        j,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ n(_i, {})
        }
      ) }),
      /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ u("p", { children: [
        d,
        i && /* @__PURE__ */ u(nt, { children: [
          " ",
          /* @__PURE__ */ n(fo, { children: w ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Tw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const a = q(null);
  return G(() => {
    var w;
    const i = /Macintosh/i.test(navigator.userAgent), s = ((w = a.current) == null ? void 0 : w.querySelector(".editor-input")) ?? void 0, l = (c) => {
      var h, f, p, g;
      if (!s || document.activeElement !== s) return;
      const d = c.key.toLowerCase();
      if (i) {
        if (!c.metaKey) return;
        !c.shiftKey && d === "z" ? (c.preventDefault(), r && ((h = e.current) == null || h.undo())) : c.shiftKey && d === "z" && (c.preventDefault(), o && ((f = e.current) == null || f.redo()));
      } else {
        if (!c.ctrlKey) return;
        !c.shiftKey && d === "z" ? (c.preventDefault(), r && ((p = e.current) == null || p.undo())) : (d === "y" || c.shiftKey && d === "z") && (c.preventDefault(), o && ((g = e.current) == null || g.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ n("div", { ref: a, children: t });
}
function cr({
  className: t,
  type: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      className: m(
        "pr-twp tw:flex tw:h-10 tw:rounded-md tw:border tw:border-input tw:bg-background tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-background tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ref: r,
      ...o
    }
  );
}
const Sw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Rw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = q(null), s = q(null), l = q(!1), [w, c] = R(t), [d, h] = R(r), [f, p] = R(!1);
  G(() => {
    c(t);
  }, [t]), G(() => {
    d !== r && h(r);
  }, [r]);
  const g = (b) => {
    l.current = !1, p(b), b || (w !== "custom" || d ? (e(w), o(d)) : (c(t), h(r)));
  }, v = (b) => {
    var N, y, _, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((N = i.current) == null || N.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), w === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ u(ge, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(Re, { asChild: !0, children: /* @__PURE__ */ n(j, { variant: "outline", className: "tw:h-6", children: Sw(t, a, r) }) }) }),
      /* @__PURE__ */ n(Vt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      be,
      {
        style: { zIndex: na },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ n(Ar, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ n(lr, {}),
          /* @__PURE__ */ n(
            me,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: ro })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            me,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: oo })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            me,
            {
              ref: s,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (b) => {
                var N;
                b.stopPropagation(), l.current = !0, (N = i.current) == null || N.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ n(
                  cr,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), c("custom"), l.current = !0;
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
const Dw = (t, e) => t === "f" ? /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n(Pn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n(Ln, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(nt, { children: [
  /* @__PURE__ */ n($n, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Mw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ee(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Ow({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(ge, { children: [
    /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Fs, { asChild: !0, children: /* @__PURE__ */ n(Re, { asChild: !0, children: /* @__PURE__ */ n(j, { variant: "outline", className: "tw:h-6", children: Dw(t, r) }) }) }),
      /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ n("p", { children: Mw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(be, { style: { zIndex: na }, children: [
      /* @__PURE__ */ n(Ar, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ n(lr, {}),
      /* @__PURE__ */ u(
        me,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n($n, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        me,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n(Pn, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        me,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n(Ln, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Iw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Aw({ icon: t, className: e }) {
  return /* @__PURE__ */ n(t ?? Ni, { className: e, size: 16 });
}
function _n({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    le,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ n("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ n("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Aw, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ n("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ n("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ n(gl, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function $w({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [o, a] = R(""), [i, s] = V(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const w = e.filter(
      (d) => {
        var h;
        return (h = d.marker) == null ? void 0 : h.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !w.includes(d)
    );
    return [w, c];
  }, [o, e]);
  return /* @__PURE__ */ u(xe, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ n(
      sr,
      {
        className: "marker-menu-search",
        ref: r,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(ye, { children: [
      /* @__PURE__ */ n(Or, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ n(ae, { children: i.map((l) => {
        var w;
        return /* @__PURE__ */ n(
          _n,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ u(nt, { children: [
        i.length > 0 && /* @__PURE__ */ n(aa, { alwaysRender: !0 }),
        /* @__PURE__ */ n(ae, { children: s.map((l) => {
          var w;
          return /* @__PURE__ */ n(
            _n,
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
function Pw(t, e, r, o) {
  if (!o || o === "p") return [];
  const a = gr[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[gr[l].description] ?? gr[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Lw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Vw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const zw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Vu({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: w,
  parentEditorRef: c
}) {
  const d = q(null), h = q(null), f = q(null), p = q(null);
  Pt(() => {
    if (!p.current) return;
    const { width: D } = p.current.getBoundingClientRect();
    D > 0 && (p.current.style.width = `${D}px`);
  }, []);
  const [g, v] = R("generated"), [b, N] = R("generated"), [y, _] = R("*"), [k, P] = R("*"), [I, $] = R("f"), [C, T] = R(!1), [E, O] = R(!0), [L, U] = R(!1), A = q(!1), W = q(""), [x, F] = R(!1), [ct, xt] = R(), [At, wt] = R(), [Rt, K] = R(), [at, rt] = R(), dt = q(null), Tt = V(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? el(), noteMode: "expanded" }
    }),
    [s, l]
  ), ue = V(
    () => Pw(
      d,
      () => F(!1),
      w,
      at
    ),
    [w, at]
  );
  G(() => {
    var D;
    x || (D = d.current) == null || D.focus();
  }, [I, x]), G(() => {
    var et, it;
    let D;
    A.current = !1, O(!0);
    const B = e == null ? void 0 : e.at(0);
    if (B && dr("note", B)) {
      const pt = (et = B.insert.note) == null ? void 0 : et.caller;
      let _t = "custom";
      pt === ro ? _t = "generated" : pt === oo ? _t = "hidden" : pt && (_(pt), P(pt)), v(_t), N(_t), $(((it = B.insert.note) == null ? void 0 : it.style) ?? "f"), D = setTimeout(() => {
        var Mt;
        (Mt = d.current) == null || Mt.applyUpdate([B]);
      }, 0);
    }
    return () => {
      D && clearTimeout(D);
    };
  }, [e, i]);
  const yt = z(
    (D, B, et = !1) => {
      var pt, _t, Mt;
      const it = (_t = (pt = d.current) == null ? void 0 : pt.getNoteOps(0)) == null ? void 0 : _t.at(0);
      if (it && dr("note", it)) {
        if (it.insert.note) {
          let mt;
          D === "custom" ? mt = B : D === "generated" ? mt = ro : mt = oo, it.insert.note.caller = mt;
        }
        r == null || r([it]), et && c && i && ((Mt = c.current) == null || Mt.replaceEmbedUpdate(i, [it]));
      }
    },
    [i, r, c]
  ), pe = z(() => {
    yt(g, y, !0), o();
  }, [g, y, o, yt]), Zt = q(pe);
  Pt(() => {
    Zt.current = pe;
  });
  const kt = q({ book: a.book, chapterNum: a.chapterNum });
  Pt(() => {
    (kt.current.book !== a.book || kt.current.chapterNum !== a.chapterNum) && (kt.current = { book: a.book, chapterNum: a.chapterNum }, Zt.current());
  }, [a.book, a.chapterNum]);
  const jt = () => {
    var B;
    const D = (B = h.current) == null ? void 0 : B.getElementsByClassName("editor-input")[0];
    D != null && D.textContent && navigator.clipboard.writeText(D.textContent);
  }, Qt = z(
    (D) => {
      v(D), yt(D, y);
    },
    [y, yt]
  ), M = z(
    (D) => {
      _(D), yt(g, D);
    },
    [g, yt]
  ), H = (D) => {
    var et, it, pt, _t, Mt;
    $(D);
    const B = (it = (et = d.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : it.at(0);
    if (B && dr("note", B)) {
      B.insert.note && (B.insert.note.style = D);
      const mt = (_t = (pt = B.insert.note) == null ? void 0 : pt.contents) == null ? void 0 : _t.ops;
      I !== "x" && D === "x" ? mt == null || mt.forEach((Ot) => Lw(Ot)) : I === "x" && D !== "x" && (mt == null || mt.forEach((Ot) => Vw(Ot))), (Mt = d.current) == null || Mt.applyUpdate([B, { delete: 1 }]);
    }
  }, Q = (D) => {
    rt(D.contextMarker), U(D.canRedo);
  }, ut = z(
    (D) => {
      var et, it, pt, _t, Mt;
      const B = (it = (et = d.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : it.at(0);
      if (B && dr("note", B)) {
        D.content.length > 1 && setTimeout(() => {
          var S;
          (S = d.current) == null || S.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (pt = B.insert.note) == null ? void 0 : pt.style, Ot = (Mt = (_t = B.insert.note) == null ? void 0 : _t.contents) == null ? void 0 : Mt.ops;
        if (mt || T(!1), T(
          mt === "x" ? !!(Ot != null && Ot.every((S) => {
            var ft, Ft;
            if (!((ft = S.attributes) != null && ft.char)) return !0;
            const ht = ((Ft = S.attributes) == null ? void 0 : Ft.char).style;
            return ht === "xt" || ht === "xo" || ht === "xq";
          })) : !!(Ot != null && Ot.every((S) => {
            var ft, Ft;
            if (!((ft = S.attributes) != null && ft.char)) return !0;
            const ht = ((Ft = S.attributes) == null ? void 0 : Ft.char).style;
            return ht === "ft" || ht === "fr" || ht === "fq";
          }))
        ), !A.current) {
          A.current = !0, W.current = JSON.stringify(B), O(!0);
          return;
        }
        O(JSON.stringify(B) === W.current), yt(g, y);
      } else
        T(!1), O(!0);
    },
    [g, y, yt]
  ), ot = z(() => {
    const D = window.getSelection();
    if (f.current && ue.length && D && D.rangeCount > 0) {
      const B = D.getRangeAt(0).getBoundingClientRect(), et = f.current.getBoundingClientRect();
      xt(B.left - et.left), wt(B.top - et.top), K(B.height), F(!0);
    }
  }, [ue, f]);
  G(() => {
    const D = () => {
      x && F(!1);
    };
    return window.addEventListener("click", D), () => {
      window.removeEventListener("click", D);
    };
  }, [x]), G(() => {
    var D;
    x && ((D = dt.current) == null || D.focus());
  }, [x]), G(() => {
    var et;
    const D = ((et = h.current) == null ? void 0 : et.querySelector(".editor-input")) ?? void 0, B = (it) => {
      !x && D && document.activeElement === D && it.key === l ? (it.preventDefault(), ot()) : x && it.key === "Escape" && (it.preventDefault(), F(!1));
    };
    return document.addEventListener("keydown", B), () => {
      document.removeEventListener("keydown", B);
    };
  }, [x, ot, l]);
  const Dt = w["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(nt, { children: [
    /* @__PURE__ */ u("div", { ref: p, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ n(
            Ow,
            {
              isTypeSwitchable: C,
              noteType: I,
              handleNoteTypeChange: H,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ n(
            Rw,
            {
              callerType: g,
              updateCallerType: Qt,
              customCaller: y,
              updateCustomCaller: M,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ n("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Io, { children: [
          /* @__PURE__ */ n(
            Ew,
            {
              onUndoClick: () => {
                var D;
                return (D = d.current) == null ? void 0 : D.undo();
              },
              onRedoClick: () => {
                var D;
                return (D = d.current) == null ? void 0 : D.redo();
              },
              canUndo: !E,
              canRedo: L,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ n(
            za,
            {
              onCancelClick: o,
              onAcceptClick: pe,
              canAccept: !E || b !== g || g === "custom" && y !== k,
              localizedStrings: w,
              acceptLabel: w["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u(
        "div",
        {
          ref: h,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ n("div", { className: t, children: /* @__PURE__ */ n(
              Tw,
              {
                editorRef: d,
                canUndo: !E,
                canRedo: L,
                children: /* @__PURE__ */ n(
                  rl,
                  {
                    options: Tt,
                    onStateChange: Q,
                    onUsjChange: ut,
                    defaultUsj: zw,
                    onScrRefChange: () => {
                    },
                    scrRef: a,
                    ref: d
                  }
                )
              }
            ) }),
            /* @__PURE__ */ n("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
              /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ n(
                j,
                {
                  "aria-label": Dt,
                  onClick: jt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ n(In, {})
                }
              ) }),
              /* @__PURE__ */ n(Vt, { children: /* @__PURE__ */ n("p", { children: Dt }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n(
      "div",
      {
        className: "tw:absolute",
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ u(ce, { open: x, children: [
      /* @__PURE__ */ n(
        vl,
        {
          className: "tw:absolute",
          style: {
            top: At,
            left: ct,
            height: Rt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ n(
        we,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (D) => {
            D.preventDefault(), D.stopPropagation();
          },
          children: /* @__PURE__ */ n(
            $w,
            {
              markerMenuItems: ue,
              localizedStrings: w,
              searchRef: dt
            }
          )
        }
      )
    ] })
  ] });
}
const zu = Object.freeze([
  ...Iw,
  ...Object.entries(gr).map(([, t]) => t.description).filter((t) => !!t),
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%",
  ...Cw,
  ...Va
]);
function Fa(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((a) => typeof a == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function jw(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, w) => {
    const c = w === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      zo(t, l, r, !0, a),
      c && o
    ] }, Fa(t, l));
  });
}
function zo(t, e, r = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ n("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ n(Zr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ n("span", { children: i }),
              /* @__PURE__ */ n(Zr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Fw(
        i,
        Fa(`${t}\\${i.marker}`, [i]),
        r,
        [...a, t ?? "unknown"]
      );
    });
}
function Fw(t, e, r, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ u("span", { children: [
    a ? r && /* @__PURE__ */ n("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ n(
      Zr,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    zo(a, t.content, r, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function Bw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const a = r ? r(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const w = o ? /* @__PURE__ */ n("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ n("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: m("note-caller tw:inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), h = s && /* @__PURE__ */ u(nt, { children: [
    zo(t.marker, [s], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = m(f, p);
  return /* @__PURE__ */ u(nt, { children: [
    /* @__PURE__ */ u("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      w,
      d
    ] }),
    /* @__PURE__ */ n("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: h }),
    /* @__PURE__ */ n(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ n(nt, { children: jw(t.marker, l, o, c) })
      }
    )
  ] });
}
function ju({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: c
}) {
  const d = w ?? Ui(r, void 0), h = (y, _) => {
    c == null || c(y, _, a);
  }, f = i ? r.findIndex((y) => y === i) : -1, [p, g] = R(f), v = (y, _, k) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), c == null || c(_, k, a);
          break;
      }
  }, b = (y) => {
    if (r.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((_) => Math.min(_ + 1, r.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, N = q([]);
  return G(() => {
    var y;
    p >= 0 && p < N.current.length && ((y = N.current[p]) == null || y.focus());
  }, [p]), /* @__PURE__ */ n(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ n(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((y, _) => {
            const k = y === i, P = `${a}-${_}`;
            return /* @__PURE__ */ u(nt, { children: [
              /* @__PURE__ */ n(
                "li",
                {
                  ref: (I) => {
                    N.current[_] = I;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": y.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === p ? 0 : -1,
                  className: m(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    c && "tw:hover:bg-muted/50",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                    "tw:focus:outline-hidden tw:focus-visible:outline-hidden",
                    /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                       that looks great in Storybook. However, the left edge of the ring is clipped in
                       P.B app. These are similar, but not identical to, the customizations made in
                       our shadcn table component.
                    */
                    "tw:focus-visible:ring-offset-0.5 tw:focus-visible:relative tw:focus-visible:z-10 tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
                    "tw:grid tw:grid-flow-col tw:grid-cols-subgrid",
                    o === "horizontal" ? "tw:col-span-3" : "tw:col-span-2 tw:row-span-2",
                    e
                  ),
                  onClick: () => h(y, _),
                  onKeyDown: (I) => v(I, y, _),
                  children: /* @__PURE__ */ n(
                    Bw,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => d(y.caller, _),
                      showMarkers: s
                    }
                  )
                },
                P
              ),
              _ < r.length - 1 && o === "vertical" && /* @__PURE__ */ n(Fe, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Kw(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > r && e.push(t.substring(r, a.index)), e.push(/* @__PURE__ */ n("strong", { children: a[1] }, a.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function qw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = V(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ u(Po, { stickyHeader: !0, children: [
    /* @__PURE__ */ n(Lo, { stickyHeader: !0, children: /* @__PURE__ */ u(fe, { children: [
      /* @__PURE__ */ n(Sr, { children: a }),
      /* @__PURE__ */ n(Sr, { children: i })
    ] }) }),
    /* @__PURE__ */ n(Vo, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ u(
      fe,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ n(Ve, { children: Te(l.reference, "English") }),
          /* @__PURE__ */ n(Ve, { className: o, children: Kw(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function Ba({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    tn.Root,
    {
      ref: e,
      className: m(
        "tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(
        tn.Indicator,
        {
          className: m("tw:flex tw:items-center tw:justify-center tw:text-current"),
          children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const Gw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ n(Si, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ n(Ri, { className: "tw:h-4 tw:w-4" });
}, $r = (t, e, r) => /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
  /* @__PURE__ */ u(
    Kt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Gw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ n(Vt, { side: "bottom", children: e })
] }) }), Fu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => $r(e, t)
}), Uw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => $r(r, t)
}), Bu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => $r(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Hr = (t, e, r, o, a, i) => {
  let s = [...r];
  t.forEach((w) => {
    e === "approved" ? s.includes(w) || s.push(w) : s = s.filter((c) => c !== w);
  }), o(s);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), i(l);
}, Ku = (t, e, r, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => $r(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ u(Ma, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ n(
        vr,
        {
          onClick: (w) => {
            w.stopPropagation(), Hr(
              [l],
              "approved",
              e,
              r,
              o,
              a
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ n(Ci, {})
        }
      ),
      /* @__PURE__ */ n(
        vr,
        {
          onClick: (w) => {
            w.stopPropagation(), Hr(
              [l],
              "unapproved",
              e,
              r,
              o,
              a
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ n(Ei, {})
        }
      ),
      /* @__PURE__ */ n(
        vr,
        {
          onClick: (w) => {
            w.stopPropagation(), Hr(
              [l],
              "unknown",
              e,
              r,
              o,
              a
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ n(Ti, {})
        }
      )
    ] });
  }
}), qu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Gu = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Uu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Hw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Hu = Object.freeze([
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
]), Ww = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), r !== "" && (o = o.filter((a) => a.items[0].includes(r))), o;
}, Yw = (t, e, r) => t.map((o) => {
  const a = Uo(o.key) ? o.key : o.key[0];
  return {
    items: Uo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Hw(a, e, r),
    occurrences: o.occurrences || []
  };
}), Gt = (t, e) => t[e] ?? e;
function Wu({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: w,
  id: c,
  areInventoryItemsLoading: d = !1,
  classNameForVerseText: h,
  onItemSelected: f
}) {
  const p = Gt(r, "%webView_inventory_all%"), g = Gt(r, "%webView_inventory_approved%"), v = Gt(r, "%webView_inventory_unapproved%"), b = Gt(r, "%webView_inventory_unknown%"), N = Gt(r, "%webView_inventory_scope_currentBook%"), y = Gt(r, "%webView_inventory_scope_chapter%"), _ = Gt(r, "%webView_inventory_scope_verse%"), k = Gt(r, "%webView_inventory_filter_text%"), P = Gt(
    r,
    "%webView_inventory_show_additional_items%"
  ), I = Gt(r, "%webView_inventory_no_results%"), [$, C] = R(!1), [T, E] = R("all"), [O, L] = R(""), [U, A] = R([]), W = V(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : Yw(K, a, i);
  }, [t, a, i]), x = V(() => {
    if ($) return W;
    const K = [];
    return W.forEach((at) => {
      const rt = at.items[0], dt = K.find(
        (Tt) => Tt.items[0] === rt
      );
      dt ? (dt.count += at.count, dt.occurrences = dt.occurrences.concat(at.occurrences)) : K.push({
        items: [rt],
        count: at.count,
        occurrences: at.occurrences,
        status: at.status
      });
    }), K;
  }, [$, W]), F = V(() => x.length === 0 ? [] : Ww(x, T, O), [x, T, O]), ct = V(() => {
    var rt, dt;
    if (!$) return w;
    const K = (rt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : rt.length;
    if (!K) return w;
    const at = [];
    for (let Tt = 0; Tt < K; Tt++)
      at.push(
        Uw(
          ((dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt[Tt]) || "Additional Item",
          Tt + 1
        )
      );
    return [...at, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, $]);
  G(() => {
    F.length === 0 ? A([]) : F.length === 1 && A(F[0].items);
  }, [F]);
  const xt = (K, at) => {
    at.setRowSelection(() => {
      const dt = {};
      return dt[K.index] = !0, dt;
    });
    const rt = K.original.items;
    A(rt), f && rt.length > 0 && f(rt[0]);
  }, At = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, wt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      E(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, Rt = V(() => {
    if (x.length === 0 || U.length === 0) return [];
    const K = x.filter((at) => Hi(
      $ ? at.items : [at.items[0]],
      U
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [U, $, x]);
  return /* @__PURE__ */ n("div", { id: c, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Be,
        {
          onValueChange: (K) => wt(K),
          defaultValue: T,
          children: [
            /* @__PURE__ */ n(qe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ n(Ke, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Ge, { children: [
              /* @__PURE__ */ n(Bt, { value: "all", children: p }),
              /* @__PURE__ */ n(Bt, { value: "approved", children: g }),
              /* @__PURE__ */ n(Bt, { value: "unapproved", children: v }),
              /* @__PURE__ */ n(Bt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Be, { onValueChange: (K) => At(K), defaultValue: s, children: [
        /* @__PURE__ */ n(qe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ n(Ke, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Ge, { children: [
          /* @__PURE__ */ n(Bt, { value: "book", children: N }),
          /* @__PURE__ */ n(Bt, { value: "chapter", children: y }),
          /* @__PURE__ */ n(Bt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ n(
        cr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: k,
          value: O,
          onChange: (K) => {
            L(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ n(It, { children: /* @__PURE__ */ u(Lt, { children: [
        /* @__PURE__ */ n(Kt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ n(
            Ba,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: $,
              onCheckedChange: (K) => {
                C(K);
              }
            }
          ),
          /* @__PURE__ */ n(gt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? P })
        ] }) }),
        /* @__PURE__ */ n(Vt, { children: (o == null ? void 0 : o.checkboxText) ?? P })
      ] }) })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ n(
      vw,
      {
        columns: ct,
        data: F,
        onRowClickHandler: xt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: I
      }
    ) }),
    Rt.length > 0 && /* @__PURE__ */ n("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ n(
      qw,
      {
        classNameForText: h,
        occurrenceData: Rt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Xw = "16rem", Jw = "3rem", Ka = Z.createContext(void 0);
function Pr() {
  const t = Z.useContext(Ka);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Zw({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: a,
  children: i,
  side: s = "primary",
  ref: l,
  ...w
}) {
  const [c, d] = Z.useState(t), h = e ?? c, f = Z.useCallback(
    (_) => {
      const k = typeof _ == "function" ? _(h) : _;
      r ? r(k) : d(k);
    },
    [r, h]
  ), p = Z.useCallback(() => f((_) => !_), [f]), g = h ? "expanded" : "collapsed", N = lt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = Z.useMemo(
    () => ({
      state: g,
      open: h,
      setOpen: f,
      toggleSidebar: p,
      side: N
    }),
    [g, h, f, p, N]
  );
  return /* @__PURE__ */ n(Ka.Provider, { value: y, children: /* @__PURE__ */ n(It, { delayDuration: 0, children: /* @__PURE__ */ n(
    "div",
    {
      style: (
        // CSS custom properties are not in React.CSSProperties; cast is required to use them
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": Xw,
          "--sidebar-width-icon": Jw,
          ...a
        }
      ),
      className: m(
        // Removed tw:min-h-svh
        "tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar",
        o
      ),
      ref: l,
      ...w,
      children: i
    }
  ) }) });
}
function Qw({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ref: a,
  ...i
}) {
  const s = Pr();
  return e === "none" ? /* @__PURE__ */ n(
    "div",
    {
      className: m(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ref: a,
      ...i,
      children: o
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      ref: a,
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ n(
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
        /* @__PURE__ */ n(
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
            children: /* @__PURE__ */ n(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:border tw:group-data-[variant=floating]:border-sidebar-border tw:group-data-[variant=floating]:shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
}
function Yu({
  className: t,
  onClick: e,
  ref: r,
  ...o
}) {
  const a = Pr();
  return /* @__PURE__ */ u(
    j,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw:h-7 tw:w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...o,
      children: [
        a.side === "primary" ? /* @__PURE__ */ n(Di, {}) : /* @__PURE__ */ n(Mi, {}),
        /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Xu({
  className: t,
  ref: e,
  ...r
}) {
  const { toggleSidebar: o } = Pr();
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      ref: e,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: o,
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
function td({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function Ju({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    cr,
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
function Zu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function Qu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function tp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Fe,
    {
      ref: e,
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...r
    }
  );
}
function ed({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function Nn({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "group",
      className: m("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...r
    }
  );
}
function Cn({
  className: t,
  asChild: e = !1,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    e ? Me : "div",
    {
      ref: r,
      "data-sidebar": "group-label",
      className: m(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-hidden tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        "tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...o
    }
  );
}
function ep({
  className: t,
  asChild: e = !1,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    e ? Me : "button",
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
      ...o
    }
  );
}
function En({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: m("tw:w-full tw:text-sm", t),
      ...r
    }
  );
}
function rd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: m("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1", t),
      ...r
    }
  );
}
function od({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: m("tw:group/menu-item tw:relative", t),
      ...r
    }
  );
}
const nd = se(
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
function ad({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: a,
  className: i,
  ref: s,
  ...l
}) {
  const w = t ? Me : "button", { state: c } = Pr(), d = /* @__PURE__ */ n(
    w,
    {
      ref: s,
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: m(nd({ variant: r, size: o }), i),
      ...l
    }
  );
  return a ? (typeof a == "string" && (a = {
    children: a
  }), /* @__PURE__ */ u(Lt, { children: [
    /* @__PURE__ */ n(Kt, { asChild: !0, children: d }),
    /* @__PURE__ */ n(Vt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
  ] })) : d;
}
function rp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    e ? Me : "button",
    {
      ref: o,
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
function op({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function np({
  className: t,
  showIcon: e = !1,
  ref: r,
  ...o
}) {
  const a = Z.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ u(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...o,
      children: [
        e && /* @__PURE__ */ n(ho, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ n(
          ho,
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
function ap({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function ip({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ n("li", { ref: t, ...e });
}
function sp({
  asChild: t = !1,
  size: e = "md",
  isActive: r,
  className: o,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ n(
    t ? Me : "a",
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
        o
      ),
      ...i
    }
  );
}
function id({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: w
}) {
  const c = z(
    (f, p) => {
      o(f, p);
    },
    [o]
  ), d = z(
    (f) => {
      const p = r.find((g) => g.projectId === f);
      return p ? p.projectName : f;
    },
    [r]
  ), h = z(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ n(
    Qw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ u(ed, { children: [
        /* @__PURE__ */ u(Nn, { children: [
          /* @__PURE__ */ n(Cn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ n(En, { children: /* @__PURE__ */ n(rd, { children: Object.entries(e).map(([f, p]) => /* @__PURE__ */ n(od, { children: /* @__PURE__ */ n(
            ad,
            {
              onClick: () => c(f),
              isActive: h(f),
              children: /* @__PURE__ */ n("span", { className: "tw:pl-3", children: p })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ u(Nn, { children: [
          /* @__PURE__ */ n(Cn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ n(En, { className: "tw:pl-3", children: /* @__PURE__ */ n(
            so,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: sl },
              options: r.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const p = d(f);
                c(p, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ n(Oi, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const jo = ir(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const w = lt();
    return /* @__PURE__ */ u("div", { id: s, className: m("tw:relative", { "tw:w-full": o }, a), children: [
      /* @__PURE__ */ n(
        Rn,
        {
          className: m(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": w === "rtl" },
            { "tw:left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ n(
        cr,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ u(
        j,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": w === "rtl" },
            { "tw:right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ n(ar, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
jo.displayName = "SearchBar";
function lp({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: w,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ n("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ n(
      jo,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Zw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ n(
            id,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: w,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ n(td, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const he = "scrBook", sd = "scrRef", Ce = "source", ld = "details", cd = "Scripture Reference", wd = "Scripture Book", qa = "Type", dd = "Details";
function ud(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: he,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? cd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? st.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === he ? Te(a.start) : void 0;
      },
      getGroupingValue: (o) => st.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Qr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Te(o.start),
      id: sd,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Te(a.start);
      },
      sortingFn: (o, a) => Qr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ce,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? qa : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: ld,
      header: (t == null ? void 0 : t.detailsColumnName) ?? dd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const pd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Qr(t.start, t.end) === 0 ? `${Lr(t.start)}+${e}` : `${Lr(t.start)}+${e}-${Lr(t.end)}+${r}`;
}, Tn = (t) => `${pd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function cp({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: w
}) {
  const [c, d] = R([]), [h, f] = R([{ id: he, desc: !1 }]), [p, g] = R({}), v = V(
    () => t.flatMap((T) => T.data.map((E) => ({
      ...E,
      source: T.source
    }))),
    [t]
  ), b = V(
    () => ud(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  G(() => {
    c.includes(Ce) ? f([
      { id: Ce, desc: !1 },
      { id: he, desc: !1 }
    ]) : f([{ id: he, desc: !1 }]);
  }, [c]);
  const N = ea({
    data: v,
    columns: b,
    state: {
      grouping: c,
      sorting: h,
      rowSelection: p
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Qs(),
    getGroupedRowModel: Zs(),
    getCoreRowModel: oa(),
    getSortedRowModel: ra(),
    getRowId: Tn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  G(() => {
    if (l) {
      const T = N.getSelectedRowModel().rowsById, E = Object.keys(T);
      if (E.length === 1) {
        const O = v.find((L) => Tn(L) === E[0]) || void 0;
        O && l(O);
      }
    }
  }, [p, v, l, N]);
  const y = a ?? wd, _ = i ?? qa, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [he] },
    { label: `Group by ${_}`, value: [Ce] },
    {
      label: `Group by ${y} and ${_}`,
      value: [he, Ce]
    },
    {
      label: `Group by ${_} and ${y}`,
      value: [Ce, he]
    }
  ], P = (T) => {
    d(JSON.parse(T));
  }, I = (T, E) => {
    !T.getIsGrouped() && !T.getIsSelected() && T.getToggleSelectedHandler()(E);
  }, $ = (T, E) => T.getIsGrouped() ? "" : m("banded-row", E % 2 === 0 ? "even" : "odd"), C = (T, E, O) => {
    if (!((T == null ? void 0 : T.length) === 0 || E.depth < O.column.getGroupedIndex())) {
      if (E.getIsGrouped())
        switch (E.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (E.depth) {
        case 1:
          return "tw:ps-8";
        case 2:
          return "tw:ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ u("div", { id: w, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ u(
      Be,
      {
        value: JSON.stringify(c),
        onValueChange: (T) => {
          P(T);
        },
        children: [
          /* @__PURE__ */ n(qe, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ n(Ke, {}) }),
          /* @__PURE__ */ n(Ge, { position: "item-aligned", children: /* @__PURE__ */ n(ww, { children: k.map((T) => /* @__PURE__ */ n(Bt, { value: JSON.stringify(T.value), children: T.label }, T.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Po, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ n(Lo, { children: N.getHeaderGroups().map((T) => /* @__PURE__ */ n(fe, { children: T.headers.filter((E) => E.column.columnDef.header).map((E) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ n(Sr, { colSpan: E.colSpan, className: "tw:sticky top-0", children: E.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          E.column.getCanGroup() ? /* @__PURE__ */ n(
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
          Qe(E.column.columnDef.header, E.getContext())
        ] }) }, E.id)
      )) }, T.id)) }),
      /* @__PURE__ */ n(Vo, { children: N.getRowModel().rows.map((T, E) => {
        const O = lt();
        return /* @__PURE__ */ n(
          fe,
          {
            "data-state": T.getIsSelected() ? "selected" : "",
            className: m($(T, E)),
            onClick: (L) => I(T, L),
            children: T.getVisibleCells().map((L) => {
              if (!(L.getIsPlaceholder() || L.column.columnDef.enableGrouping && !L.getIsGrouped() && (L.column.columnDef.id !== Ce || !r)))
                return /* @__PURE__ */ n(
                  Ve,
                  {
                    className: m(
                      L.column.columnDef.id,
                      "tw:p-[1px]",
                      C(c, T, L)
                    ),
                    children: L.getIsGrouped() ? /* @__PURE__ */ u(
                      j,
                      {
                        variant: "link",
                        onClick: T.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          T.getIsExpanded() && /* @__PURE__ */ n(Ue, {}),
                          !T.getIsExpanded() && (O === "ltr" ? /* @__PURE__ */ n(ze, {}) : /* @__PURE__ */ n(Jr, {})),
                          " ",
                          Qe(L.column.columnDef.cell, L.getContext()),
                          " (",
                          T.subRows.length,
                          ")"
                        ]
                      }
                    ) : Qe(L.column.columnDef.cell, L.getContext())
                  },
                  L.id
                );
            })
          },
          T.id
        );
      }) })
    ] })
  ] });
}
const Fo = (t, e) => t.filter((r) => {
  try {
    return Ze(r) === e;
  } catch {
    return !1;
  }
}), Ga = (t, e, r) => Fo(t, e).every((o) => r.includes(o));
function hd({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Fo(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ n(
    j,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        Ga(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: bl(
        t,
        s,
        l,
        w,
        c
      )
    }
  );
}
const Sn = 5, Wr = 6;
function fd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], h = o["%webView_book_selector_more%"], { otLong: f, ntLong: p, dcLong: g, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, N] = R(!1), [y, _] = R(""), k = q(void 0), P = q(!1);
  if (t.length !== st.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const I = V(() => st.allBookIds.filter(
    (A, W) => t[W] === "1" && !st.isObsolete(st.bookIdToNumber(A))
  ), [t]), $ = V(() => {
    if (!y.trim()) {
      const x = {
        [Y.OT]: [],
        [Y.NT]: [],
        [Y.DC]: [],
        [Y.Extra]: []
      };
      return I.forEach((F) => {
        const ct = Ze(F);
        x[ct].push(F);
      }), x;
    }
    const A = I.filter(
      (x) => Co(x, y, a)
    ), W = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return A.forEach((x) => {
      const F = Ze(x);
      W[F].push(x);
    }), W;
  }, [I, y, a]), C = z(
    (A, W = !1) => {
      if (!W || !k.current) {
        r(
          e.includes(A) ? e.filter((wt) => wt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const x = I.findIndex((wt) => wt === k.current), F = I.findIndex((wt) => wt === A);
      if (x === -1 || F === -1) return;
      const [ct, xt] = [
        Math.min(x, F),
        Math.max(x, F)
      ], At = I.slice(ct, xt + 1).map((wt) => wt);
      r(
        e.includes(A) ? e.filter((wt) => !At.includes(wt)) : [.../* @__PURE__ */ new Set([...e, ...At])]
      );
    },
    [e, r, I]
  ), T = (A) => {
    C(A, P.current), P.current = !1;
  }, E = (A, W) => {
    A.preventDefault(), C(W, A.shiftKey);
  }, O = z(
    (A) => {
      const W = Fo(I, A).map((x) => x);
      r(
        Ga(I, A, e) ? e.filter((x) => !W.includes(x)) : [.../* @__PURE__ */ new Set([...e, ...W])]
      );
    },
    [e, r, I]
  ), L = () => {
    r(I.map((A) => A));
  }, U = () => {
    r([]);
  };
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Y).map((A) => /* @__PURE__ */ n(
      hd,
      {
        section: A,
        availableBookIds: I,
        selectedBookIds: e,
        onToggle: O,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ u(
      ce,
      {
        open: b,
        onOpenChange: (A) => {
          N(A), A || _("");
        },
        children: [
          /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ u(
            j,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ n(An, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ n(we, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ u(
            xe,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (P.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ n(
                  sr,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ n(j, { variant: "ghost", size: "sm", onClick: L, children: w }),
                  /* @__PURE__ */ n(j, { variant: "ghost", size: "sm", onClick: U, children: c })
                ] }),
                /* @__PURE__ */ u(ye, { children: [
                  /* @__PURE__ */ n(Or, { children: d }),
                  Object.values(Y).map((A, W) => {
                    const x = $[A];
                    if (x.length !== 0)
                      return /* @__PURE__ */ u(Vn, { children: [
                        /* @__PURE__ */ n(
                          ae,
                          {
                            heading: ia(A, f, p, g, v),
                            children: x.map((F) => /* @__PURE__ */ n(
                              la,
                              {
                                bookId: F,
                                isSelected: e.includes(F),
                                onSelect: () => T(F),
                                onMouseDown: (ct) => E(ct, F),
                                section: Ze(F),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ao(F, a),
                                className: "tw:flex tw:items-center"
                              },
                              F
                            ))
                          }
                        ),
                        W < Object.values(Y).length - 1 && /* @__PURE__ */ n(aa, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ u("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Wr ? Wr : Sn
      ).map((A) => /* @__PURE__ */ n(or, { className: "tw:hover:bg-secondary", variant: "secondary", children: Pe(A, a) }, A)),
      e.length > Wr && /* @__PURE__ */ n(
        or,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Sn} ${h}`
        }
      )
    ] })
  ] });
}
const wp = Object.freeze([
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
]), _e = (t, e) => t[e] ?? e;
function dp({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: w
}) {
  const c = _e(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = _e(
    s,
    "%webView_scope_selector_current_verse%"
  ), h = _e(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = _e(s, "%webView_scope_selector_current_book%"), p = _e(s, "%webView_scope_selector_choose_books%"), g = _e(s, "%webView_scope_selector_scope%"), v = _e(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: h, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: p, id: "scope-selected" }
  ], N = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ u("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ n(gt, { children: g }),
      /* @__PURE__ */ n(
        wa,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: N.map(({ value: y, label: _, id: k }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(io, { className: "tw:me-2", value: y, id: k }),
            /* @__PURE__ */ n(gt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ n(gt, { children: v }),
      /* @__PURE__ */ n(
        fd,
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
const Yr = {
  [J("undefined")]: "Ø",
  [J(0)]: "A",
  [J(1)]: "B",
  [J(2)]: "C",
  [J(3)]: "D",
  [J(4)]: "E",
  [J(5)]: "F",
  [J(6)]: "G",
  [J(7)]: "H",
  [J(8)]: "I",
  [J(9)]: "J",
  [J(10)]: "K",
  [J(11)]: "L",
  [J(12)]: "M",
  [J(13)]: "N",
  [J(14)]: "O",
  [J(15)]: "P",
  [J(16)]: "Q",
  [J(17)]: "R",
  [J(18)]: "S",
  [J(19)]: "T",
  [J(20)]: "U",
  [J(21)]: "V",
  [J(22)]: "W",
  [J(23)]: "X",
  [J(24)]: "Y",
  [J(25)]: "Z"
};
function up({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Yr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, d]) => [
          c,
          c === d && c in Yr ? Yr[c] : d
        ]
      )
    )
  }, w = lt();
  return /* @__PURE__ */ u(
    Be,
    {
      value: `${e}`,
      onValueChange: (c) => r(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ n(qe, { size: a, className: m("pr-twp tw:w-auto", i), children: /* @__PURE__ */ n(
          Ke,
          {
            placeholder: l[J(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ n(
          Ge,
          {
            id: s,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: We },
            children: t.map((c) => /* @__PURE__ */ n(Bt, { value: `${c}`, children: l[J(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function pp({ children: t }) {
  return /* @__PURE__ */ n("div", { className: "pr-twp tw:grid", children: t });
}
function hp({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ n("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: a }) : /* @__PURE__ */ n("div", { children: r })
  ] });
}
function fp({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ n(Fe, {}) : ""
  ] });
}
function Ua(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Rr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ n(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ha = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(Lt, { children: [
  /* @__PURE__ */ n(Kt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
    po,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ n(Rr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ n(Rr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ u(ow, { children: [
    /* @__PURE__ */ n(aw, { children: l.label }),
    /* @__PURE__ */ n(rw, { children: /* @__PURE__ */ n(iw, { children: Ha(
      t,
      e,
      Ua(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ n(Vt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function mo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ u(ge, { variant: i, children: [
    /* @__PURE__ */ n(Re, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ n(j, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ n(Ii, {}) }) }),
    /* @__PURE__ */ n(be, { align: "start", style: { zIndex: We }, children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ u(Vn, { children: [
      /* @__PURE__ */ n(ja, { children: /* @__PURE__ */ n(It, { children: Ha(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ n(lr, {})
    ] }, w)) })
  ] });
}
const Wa = Z.forwardRef(
  ({ id: t, className: e, children: r }, o) => /* @__PURE__ */ n(
    "div",
    {
      ref: o,
      className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
      id: t,
      children: r
    }
  )
);
function mp({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: w,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ u(Wa, { className: `tw:w-full tw:border ${i}`, id: a, children: [
    r && /* @__PURE__ */ n(
      mo,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ n(Ai, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ n("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ n("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ n(
        mo,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ n($i, {}),
          className: "tw:h-full"
        }
      ),
      w
    ] })
  ] });
}
function gp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ n(Wa, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ n(
    mo,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: a,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Ya = Z.forwardRef(({ className: t, ...e }, r) => {
  const o = lt();
  return /* @__PURE__ */ n(
    qt.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ya.displayName = qt.List.displayName;
const Xa = Z.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  qt.List,
  {
    ref: r,
    className: m(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Xa.displayName = qt.List.displayName;
const md = Z.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  qt.Trigger,
  {
    ref: r,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Ja = Z.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  qt.Content,
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
Ja.displayName = qt.Content.displayName;
function bp({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ u("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ u("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      a ? /* @__PURE__ */ n("h1", { children: a }) : "",
      /* @__PURE__ */ n(
        jo,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Ya, { children: [
      /* @__PURE__ */ n(Xa, { children: t.map((l) => /* @__PURE__ */ n(md, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ n(Ja, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function gd({ ...t }) {
  return /* @__PURE__ */ n(Yt.Menu, { ...t });
}
function bd({ ...t }) {
  return /* @__PURE__ */ n(Yt.Sub, { "data-slot": "menubar-sub", ...t });
}
function vd({
  className: t,
  variant: e = "default",
  ref: r,
  ...o
}) {
  const a = Z.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ n($o.Provider, { value: a, children: /* @__PURE__ */ n(
    Yt.Root,
    {
      ref: r,
      className: m(
        "tw:flex tw:h-10 tw:items-center tw:space-x-1 tw:rounded-md tw:border tw:bg-background tw:p-1",
        t
      ),
      ...o
    }
  ) });
}
function xd({
  className: t,
  ref: e,
  ...r
}) {
  const o = de();
  return /* @__PURE__ */ n(
    Yt.Trigger,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ie({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...r
    }
  );
}
function yd({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...a
}) {
  const i = de();
  return /* @__PURE__ */ u(
    Yt.SubTrigger,
    {
      ref: o,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        Ie({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(ze, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function kd({
  className: t,
  ref: e,
  ...r
}) {
  const o = de();
  return /* @__PURE__ */ n(
    Yt.SubContent,
    {
      ref: e,
      className: m(
        "tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": o.variant === "muted"
        },
        t
      ),
      ...r
    }
  );
}
function _d({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ref: a,
  ...i
}) {
  const s = de();
  return /* @__PURE__ */ n(Yt.Portal, { children: /* @__PURE__ */ n(
    Yt.Content,
    {
      ref: a,
      align: e,
      alignOffset: r,
      sideOffset: o,
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
function Nd({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  const a = de();
  return /* @__PURE__ */ n(
    Yt.Item,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        Ie({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o
    }
  );
}
function Cd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Yt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
const Je = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Za = (t, e, r, o) => {
  if (!r) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(Lt, { children: [
      /* @__PURE__ */ n(Kt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
        Nd,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ n(Rr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ n(Rr, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ u(bd, { children: [
        /* @__PURE__ */ n(yd, { children: c.label }),
        /* @__PURE__ */ n(kd, { children: Za(
          t,
          e,
          Ua(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ n(Vt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && s < a.length - 1 && w.push(/* @__PURE__ */ n(Cd, {}, `separator-${i}`)), w;
  });
};
function Ed({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const a = q(void 0), i = q(void 0), s = q(void 0), l = q(void 0), w = q(void 0), c = (d) => {
    switch (d) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return w;
      default:
        return;
    }
  };
  if (ol(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, h) => {
    var g, v, b, N;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        Je(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Je(i, [f, p]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), Je(s, [f, p]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Je(l, [f, p]);
        break;
      case "alt+h":
        (N = w.current) == null || N.focus(), Je(w, [f, p]);
        break;
    }
  }), G(() => {
    if (!r || !a.current) return;
    const d = new MutationObserver((p) => {
      p.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          r(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((p) => {
      d.observe(p, { attributes: !0 });
    }), () => d.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ n(vd, { ref: a, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, h]) => typeof d == "boolean" || typeof h == "boolean" ? 0 : d.order - h.order).map(([d, h]) => /* @__PURE__ */ u(gd, { children: [
      /* @__PURE__ */ n(xd, { ref: c(d), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ n(
        _d,
        {
          style: { zIndex: We },
          children: /* @__PURE__ */ n(It, { children: Za(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function vp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function xp({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: w,
  menubarVariant: c = "default"
}) {
  const d = q(void 0);
  return /* @__PURE__ */ n(
    "div",
    {
      className: m("tw:border tw:px-4 tw:text-foreground", o),
      ref: d,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: w ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ n("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ n(
                    Ed,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: c
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ n("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ n(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
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
const Td = (t, e) => t[e] ?? e;
function yp({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: w
}) {
  const c = Td(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, h] = R(!1), f = (g) => {
    a && a(g), o && o([g, ...r.filter((v) => v !== g)]), i && r.find((v) => v === g) && i([...r.filter((v) => v !== g)]), h(!1);
  }, p = (g, v) => {
    var N, y, _, k, P, I;
    const b = v !== g ? ((y = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : y[v]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(P = t[g]) == null ? void 0 : P.autonym} (${b})` : (I = t[g]) == null ? void 0 : I.autonym;
  };
  return /* @__PURE__ */ u("div", { id: w, className: m("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ u(
      Be,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => h(g),
        children: [
          /* @__PURE__ */ n(qe, { children: /* @__PURE__ */ n(Ke, {}) }),
          /* @__PURE__ */ n(
            Ge,
            {
              style: { zIndex: We },
              children: Object.keys(t).map((g) => /* @__PURE__ */ n(Bt, { value: g, children: p(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ n("div", { className: "tw:pt-3", children: /* @__PURE__ */ n(gt, { className: "tw:font-normal tw:text-muted-foreground", children: Ee(c, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((g) => p(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Sd({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ n(gt, { children: e(t) }) : r ? /* @__PURE__ */ n(gt, { children: r(t) }) : /* @__PURE__ */ n(gt, { children: t });
}
function kp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ n("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ n(
      Ba,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ n(
      Sd,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function _p({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: a = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: w,
  dropdownContent: c,
  additionalContent: d,
  accentColor: h,
  showDropdownOnHover: f = !1
}) {
  return /* @__PURE__ */ u(
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
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ n("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l,
            !e && w && /* @__PURE__ */ n("div", { className: "tw:invisible tw:group-hover:visible", children: w }),
            !e && f && c && /* @__PURE__ */ n("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(ge, { children: [
              /* @__PURE__ */ n(Re, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ n(j, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ n(Go, {}) }) }),
              /* @__PURE__ */ n(be, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ u(ge, { children: [
              /* @__PURE__ */ n(Re, { className: m(h && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ n(j, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ n(Go, {}) }) }),
              /* @__PURE__ */ n(be, { align: "end", children: c })
            ] })
          ] }),
          d && /* @__PURE__ */ n("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: d })
        ] }),
        h && /* @__PURE__ */ n(
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
const Rd = ir(({ className: t, ...e }, r) => /* @__PURE__ */ n(Pi, { size: 35, className: m("tw:animate-spin", t), ...e, ref: r }));
Rd.displayName = "Spinner";
function Np({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: w,
  defaultValue: c,
  value: d,
  onChange: h,
  onFocus: f,
  onBlur: p
}) {
  return /* @__PURE__ */ u("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ n(
      gt,
      {
        htmlFor: t,
        className: m({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ n(
      cr,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: m(w, { "tw:border-red-600": r }),
        defaultValue: c,
        value: d,
        onChange: h,
        onFocus: f,
        onBlur: p
      }
    ),
    /* @__PURE__ */ n("p", { className: m({ "tw:hidden": !a }), children: a })
  ] });
}
const Dd = se(
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
function Cp({
  className: t,
  variant: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      role: "alert",
      className: m(
        // CUSTOM
        "pr-twp",
        Dd({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Ep({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ u(
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
function Tp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("div", { ref: e, className: m("tw:text-sm tw:[&_p]:leading-relaxed", t), ...r });
}
const Sp = vt.Root, Rp = vt.Trigger, Dp = vt.Group, Mp = vt.Portal, Op = vt.Sub, Ip = vt.RadioGroup;
function Ap({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ u(
    vt.SubTrigger,
    {
      ref: o,
      className: m(
        "pr-twp tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(ze, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function $p({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    vt.SubContent,
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
function Pp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(vt.Portal, { children: /* @__PURE__ */ n(
    vt.Content,
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
function Lp({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    vt.Item,
    {
      ref: r,
      className: m(
        "pr-twp tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function Vp({
  className: t,
  children: e,
  checked: r,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ u(
    vt.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(vt.ItemIndicator, { children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function zp({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    vt.RadioItem,
    {
      ref: r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(vt.ItemIndicator, { children: /* @__PURE__ */ n(go, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function jp({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    vt.Label,
    {
      ref: r,
      className: m(
        "tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-foreground",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function Fp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    vt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function Bp({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: m("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Qa = Z.createContext({
  direction: "bottom"
});
function Kp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const o = Z.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ n(Qa.Provider, { value: o, children: /* @__PURE__ */ n(
    ve.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
const qp = ve.Trigger, Md = ve.Portal, Gp = ve.Close;
function Od({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ve.Overlay,
    {
      ref: e,
      className: m("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...r
    }
  );
}
function Up({
  className: t,
  children: e,
  hideDrawerHandle: r = !1,
  ref: o,
  ...a
}) {
  const { direction: i = "bottom" } = Z.useContext(Qa), s = {
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
  return /* @__PURE__ */ u(Md, { children: [
    /* @__PURE__ */ n(Od, {}),
    /* @__PURE__ */ u(
      ve.Content,
      {
        ref: o,
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
          !r && (i === "bottom" || i === "right") && /* @__PURE__ */ n("div", { className: l[i] }),
          /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-col", children: e }),
          !r && (i === "top" || i === "left") && /* @__PURE__ */ n("div", { className: l[i] })
        ]
      }
    )
  ] });
}
function Hp({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: m("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function Wp({ className: t, ...e }) {
  return /* @__PURE__ */ n("div", { className: m("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function Yp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ve.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function Xp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ve.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function Jp({
  className: t,
  value: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    en.Root,
    {
      ref: r,
      className: m(
        "pr-twp tw:relative tw:h-4 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-secondary",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n(
        en.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Zp({
  className: t,
  direction: e,
  onLayout: r,
  orientation: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    _o.Group,
    {
      className: m(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (i) => r(Object.values(i)) : void 0,
      ...a
    }
  );
}
function mr(t) {
  if (t !== void 0)
    return typeof t == "number" ? String(t) : t;
}
function Qp({
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    _o.Panel,
    {
      defaultSize: mr(t),
      minSize: mr(e),
      maxSize: mr(r),
      collapsedSize: mr(o),
      ...a
    }
  );
}
function th({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    _o.Separator,
    {
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-hidden tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 rtl:tw:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ n(Li, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function eh({ ...t }) {
  return /* @__PURE__ */ n(
    nl,
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
function rh({
  className: t,
  ref: e,
  ...r
}) {
  const o = lt();
  return /* @__PURE__ */ u(
    ur.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...r,
      dir: o,
      children: [
        /* @__PURE__ */ n(ur.Track, { className: "tw:relative tw:h-2 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-secondary", children: /* @__PURE__ */ n(ur.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ n(ur.Thumb, { className: "tw:block tw:h-5 tw:w-5 tw:rounded-full tw:border-2 tw:border-primary tw:bg-background tw:ring-offset-background tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function oh({
  className: t,
  ref: e,
  ...r
}) {
  const o = lt();
  return /* @__PURE__ */ n(
    rn.Root,
    {
      className: m(
        "tw:peer pr-twp tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...r,
      ref: e,
      children: /* @__PURE__ */ n(
        rn.Thumb,
        {
          className: m(
            "pr-twp tw:pointer-events-none tw:block tw:h-5 tw:w-5 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform",
            {
              "tw:data-[state=checked]:translate-x-5 tw:data-[state=unchecked]:translate-x-0": o === "ltr"
            },
            {
              "tw:data-[state=checked]:translate-x-[-20px] tw:data-[state=unchecked]:translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
}
const nh = qt.Root;
function ah({
  className: t,
  ref: e,
  ...r
}) {
  const o = lt();
  return /* @__PURE__ */ n(
    qt.List,
    {
      ref: e,
      className: m(
        "pr-twp tw:inline-flex tw:h-10 tw:items-center tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
        t
      ),
      ...r,
      dir: o
    }
  );
}
function ih({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    qt.Trigger,
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
function sh({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    qt.Content,
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
function lh({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
const ch = (t, e) => {
  G(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function Id(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ad = (t, e, r = {}) => {
  const o = q(e);
  o.current = e;
  const a = q(r);
  a.current = Id(a.current);
  const [i, s] = R(() => o.current), [l, w] = R(!0);
  return G(() => {
    let c = !0;
    return w(!!t), (async () => {
      if (t) {
        const d = await t();
        c && (s(() => d), w(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, Xr = () => !1, wh = (t, e) => {
  const [r] = Ad(
    z(async () => {
      if (!t) return Xr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Xr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  G(() => () => {
    r !== Xr && r();
  }, [r]);
};
function dh(t) {
  G(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function $d(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(a, o) : r.appendChild(a);
}
$d(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:.25rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(var(--tw-spacing) * 0)}.tw\\:inset-x-0{inset-inline:calc(var(--tw-spacing) * 0)}.tw\\:inset-y-0{inset-block:calc(var(--tw-spacing) * 0)}.tw\\:start-2{inset-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(var(--tw-spacing) * 0)}.tw\\:top-1\\.5{top:calc(var(--tw-spacing) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-2\\.5{top:calc(var(--tw-spacing) * 2.5)}.tw\\:top-3\\.5{top:calc(var(--tw-spacing) * 3.5)}.tw\\:top-4{top:calc(var(--tw-spacing) * 4)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-\\[50\\%\\]{top:50%}.tw\\:-right-1{right:calc(var(--tw-spacing) * -1)}.tw\\:right-0{right:calc(var(--tw-spacing) * 0)}.tw\\:right-1{right:calc(var(--tw-spacing) * 1)}.tw\\:right-3{right:calc(var(--tw-spacing) * 3)}.tw\\:right-4{right:calc(var(--tw-spacing) * 4)}.tw\\:bottom-0{bottom:calc(var(--tw-spacing) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(var(--tw-spacing) * 0)}.tw\\:left-2{left:calc(var(--tw-spacing) * 2)}.tw\\:left-3{left:calc(var(--tw-spacing) * 3)}.tw\\:left-4{left:calc(var(--tw-spacing) * 4)}.tw\\:left-\\[50\\%\\]{left:50%}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-2{grid-row-start:2}.tw\\:\\!m-0{margin:calc(var(--tw-spacing) * 0)!important}.tw\\:m-0{margin:calc(var(--tw-spacing) * 0)}.tw\\:m-1{margin:calc(var(--tw-spacing) * 1)}.tw\\:m-2{margin:calc(var(--tw-spacing) * 2)}.tw\\:-mx-1{margin-inline:calc(var(--tw-spacing) * -1)}.tw\\:mx-0{margin-inline:calc(var(--tw-spacing) * 0)}.tw\\:mx-1{margin-inline:calc(var(--tw-spacing) * 1)}.tw\\:mx-2{margin-inline:calc(var(--tw-spacing) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(var(--tw-spacing) * 3.5)}.tw\\:mx-8{margin-inline:calc(var(--tw-spacing) * 8)}.tw\\:mx-auto{margin-inline:auto}.tw\\:my-1{margin-block:calc(var(--tw-spacing) * 1)}.tw\\:my-2\\.5{margin-block:calc(var(--tw-spacing) * 2.5)}.tw\\:my-4{margin-block:calc(var(--tw-spacing) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(var(--tw-spacing) * 1)}.tw\\:ms-2{margin-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:ms-5{margin-inline-start:calc(var(--tw-spacing) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:me-2{margin-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:mt-1{margin-top:calc(var(--tw-spacing) * 1)}.tw\\:mt-2{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:mt-3{margin-top:calc(var(--tw-spacing) * 3)}.tw\\:mt-4{margin-top:calc(var(--tw-spacing) * 4)}.tw\\:mt-6{margin-top:calc(var(--tw-spacing) * 6)}.tw\\:mt-24{margin-top:calc(var(--tw-spacing) * 24)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(var(--tw-spacing) * 1)}.tw\\:mr-2{margin-right:calc(var(--tw-spacing) * 2)}.tw\\:mr-3{margin-right:calc(var(--tw-spacing) * 3)}.tw\\:mr-4{margin-right:calc(var(--tw-spacing) * 4)}.tw\\:mr-24{margin-right:calc(var(--tw-spacing) * 24)}.tw\\:mb-1{margin-bottom:calc(var(--tw-spacing) * 1)}.tw\\:mb-2{margin-bottom:calc(var(--tw-spacing) * 2)}.tw\\:mb-3{margin-bottom:calc(var(--tw-spacing) * 3)}.tw\\:mb-4{margin-bottom:calc(var(--tw-spacing) * 4)}.tw\\:mb-24{margin-bottom:calc(var(--tw-spacing) * 24)}.tw\\:ml-2{margin-left:calc(var(--tw-spacing) * 2)}.tw\\:ml-4{margin-left:calc(var(--tw-spacing) * 4)}.tw\\:ml-24{margin-left:calc(var(--tw-spacing) * 24)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-4{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:h-1{height:calc(var(--tw-spacing) * 1)}.tw\\:h-2{height:calc(var(--tw-spacing) * 2)}.tw\\:h-2\\.5{height:calc(var(--tw-spacing) * 2.5)}.tw\\:h-3{height:calc(var(--tw-spacing) * 3)}.tw\\:h-3\\.5{height:calc(var(--tw-spacing) * 3.5)}.tw\\:h-4{height:calc(var(--tw-spacing) * 4)}.tw\\:h-5{height:calc(var(--tw-spacing) * 5)}.tw\\:h-6{height:calc(var(--tw-spacing) * 6)}.tw\\:h-7{height:calc(var(--tw-spacing) * 7)}.tw\\:h-8{height:calc(var(--tw-spacing) * 8)}.tw\\:h-9{height:calc(var(--tw-spacing) * 9)}.tw\\:h-10{height:calc(var(--tw-spacing) * 10)}.tw\\:h-11{height:calc(var(--tw-spacing) * 11)}.tw\\:h-12{height:calc(var(--tw-spacing) * 12)}.tw\\:h-14{height:calc(var(--tw-spacing) * 14)}.tw\\:h-20{height:calc(var(--tw-spacing) * 20)}.tw\\:h-24{height:calc(var(--tw-spacing) * 24)}.tw\\:h-32{height:calc(var(--tw-spacing) * 32)}.tw\\:h-40{height:calc(var(--tw-spacing) * 40)}.tw\\:h-64{height:calc(var(--tw-spacing) * 64)}.tw\\:h-96{height:calc(var(--tw-spacing) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[1px\\]{height:1px}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[100px\\]{height:100px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-5{max-height:calc(var(--tw-spacing) * 5)}.tw\\:max-h-10{max-height:calc(var(--tw-spacing) * 10)}.tw\\:max-h-80{max-height:calc(var(--tw-spacing) * 80)}.tw\\:max-h-96{max-height:calc(var(--tw-spacing) * 96)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(var(--tw-spacing) * 0)}.tw\\:min-h-11{min-height:calc(var(--tw-spacing) * 11)}.tw\\:min-h-\\[80px\\]{min-height:80px}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(var(--tw-spacing) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(var(--tw-spacing) * 2)}.tw\\:w-2\\.5{width:calc(var(--tw-spacing) * 2.5)}.tw\\:w-3{width:calc(var(--tw-spacing) * 3)}.tw\\:w-3\\.5{width:calc(var(--tw-spacing) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(var(--tw-spacing) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(var(--tw-spacing) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(var(--tw-spacing) * 6)}.tw\\:w-7{width:calc(var(--tw-spacing) * 7)}.tw\\:w-8{width:calc(var(--tw-spacing) * 8)}.tw\\:w-9{width:calc(var(--tw-spacing) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(var(--tw-spacing) * 10)}.tw\\:w-11{width:calc(var(--tw-spacing) * 11)}.tw\\:w-12{width:calc(var(--tw-spacing) * 12)}.tw\\:w-20{width:calc(var(--tw-spacing) * 20)}.tw\\:w-24{width:calc(var(--tw-spacing) * 24)}.tw\\:w-32{width:calc(var(--tw-spacing) * 32)}.tw\\:w-48{width:calc(var(--tw-spacing) * 48)}.tw\\:w-56{width:calc(var(--tw-spacing) * 56)}.tw\\:w-60{width:calc(var(--tw-spacing) * 60)}.tw\\:w-64{width:calc(var(--tw-spacing) * 64)}.tw\\:w-72{width:calc(var(--tw-spacing) * 72)}.tw\\:w-80{width:calc(var(--tw-spacing) * 80)}.tw\\:w-96{width:calc(var(--tw-spacing) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(var(--tw-spacing) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-48{max-width:calc(var(--tw-spacing) * 48)}.tw\\:max-w-64{max-width:calc(var(--tw-spacing) * 64)}.tw\\:max-w-96{max-width:calc(var(--tw-spacing) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:min-w-0{min-width:calc(var(--tw-spacing) * 0)}.tw\\:min-w-5{min-width:calc(var(--tw-spacing) * 5)}.tw\\:min-w-8{min-width:calc(var(--tw-spacing) * 8)}.tw\\:min-w-16{min-width:calc(var(--tw-spacing) * 16)}.tw\\:min-w-36{min-width:calc(var(--tw-spacing) * 36)}.tw\\:min-w-80{min-width:calc(var(--tw-spacing) * 80)}.tw\\:min-w-\\[8rem\\]{min-width:8rem}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(var(--tw-spacing) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-in{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:scroll-m-20{scroll-margin:calc(var(--tw-spacing) * 20)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(var(--tw-spacing) * 0)}.tw\\:gap-1{gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-1\\.5{gap:calc(var(--tw-spacing) * 1.5)}.tw\\:gap-2{gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-2\\.5{gap:calc(var(--tw-spacing) * 2.5)}.tw\\:gap-3{gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-4{gap:calc(var(--tw-spacing) * 4)}.tw\\:gap-5{gap:calc(var(--tw-spacing) * 5)}.tw\\:gap-6{gap:calc(var(--tw-spacing) * 6)}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-x-2{column-gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-x-3{column-gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-x-4{column-gap:calc(var(--tw-spacing) * 4)}:where(.tw\\:space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-y-2{row-gap:calc(var(--tw-spacing) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-stretch{align-self:stretch}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-\\[10px\\]{border-top-left-radius:10px;border-top-right-radius:10px}.tw\\:rounded-l-\\[10px\\]{border-top-left-radius:10px;border-bottom-left-radius:10px}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-\\[10px\\]{border-top-right-radius:10px;border-bottom-right-radius:10px}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-\\[10px\\]{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive\\/50{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-destructive\\/50{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input{border-color:var(--input)}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/80{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/80{background-color:color-mix(in oklab, var(--tw-color-black) 80%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive{background-color:var(--destructive)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input{background-color:var(--input)}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:fill-current{fill:currentColor}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:\\!p-4{padding:calc(var(--tw-spacing) * 4)!important}.tw\\:p-0{padding:calc(var(--tw-spacing) * 0)}.tw\\:p-0\\.5{padding:calc(var(--tw-spacing) * .5)}.tw\\:p-1{padding:calc(var(--tw-spacing) * 1)}.tw\\:p-2{padding:calc(var(--tw-spacing) * 2)}.tw\\:p-3{padding:calc(var(--tw-spacing) * 3)}.tw\\:p-4{padding:calc(var(--tw-spacing) * 4)}.tw\\:p-6{padding:calc(var(--tw-spacing) * 6)}.tw\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(var(--tw-spacing) * 0)}.tw\\:px-1{padding-inline:calc(var(--tw-spacing) * 1)}.tw\\:px-2{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:px-2\\.5{padding-inline:calc(var(--tw-spacing) * 2.5)}.tw\\:px-3{padding-inline:calc(var(--tw-spacing) * 3)}.tw\\:px-4{padding-inline:calc(var(--tw-spacing) * 4)}.tw\\:px-5{padding-inline:calc(var(--tw-spacing) * 5)}.tw\\:px-6{padding-inline:calc(var(--tw-spacing) * 6)}.tw\\:px-8{padding-inline:calc(var(--tw-spacing) * 8)}.tw\\:py-0{padding-block:calc(var(--tw-spacing) * 0)}.tw\\:py-0\\.5{padding-block:calc(var(--tw-spacing) * .5)}.tw\\:py-1{padding-block:calc(var(--tw-spacing) * 1)}.tw\\:py-1\\.5{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:py-2{padding-block:calc(var(--tw-spacing) * 2)}.tw\\:py-3{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:py-4{padding-block:calc(var(--tw-spacing) * 4)}.tw\\:py-6{padding-block:calc(var(--tw-spacing) * 6)}.tw\\:py-8{padding-block:calc(var(--tw-spacing) * 8)}.tw\\:ps-4{padding-inline-start:calc(var(--tw-spacing) * 4)}.tw\\:ps-8{padding-inline-start:calc(var(--tw-spacing) * 8)}.tw\\:ps-9{padding-inline-start:calc(var(--tw-spacing) * 9)}.tw\\:ps-12{padding-inline-start:calc(var(--tw-spacing) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:pe-2{padding-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:pe-9{padding-inline-end:calc(var(--tw-spacing) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-0{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:pt-1{padding-top:calc(var(--tw-spacing) * 1)}.tw\\:pt-2{padding-top:calc(var(--tw-spacing) * 2)}.tw\\:pt-3{padding-top:calc(var(--tw-spacing) * 3)}.tw\\:pt-6{padding-top:calc(var(--tw-spacing) * 6)}.tw\\:\\!pr-10{padding-right:calc(var(--tw-spacing) * 10)!important}.tw\\:pr-0{padding-right:calc(var(--tw-spacing) * 0)}.tw\\:pr-2{padding-right:calc(var(--tw-spacing) * 2)}.tw\\:pr-3{padding-right:calc(var(--tw-spacing) * 3)}.tw\\:pr-4{padding-right:calc(var(--tw-spacing) * 4)}.tw\\:pb-0{padding-bottom:calc(var(--tw-spacing) * 0)}.tw\\:pb-2{padding-bottom:calc(var(--tw-spacing) * 2)}.tw\\:pb-3{padding-bottom:calc(var(--tw-spacing) * 3)}.tw\\:pb-4{padding-bottom:calc(var(--tw-spacing) * 4)}.tw\\:pb-8{padding-bottom:calc(var(--tw-spacing) * 8)}.tw\\:pb-16{padding-bottom:calc(var(--tw-spacing) * 16)}.tw\\:pb-24{padding-bottom:calc(var(--tw-spacing) * 24)}.tw\\:pl-2{padding-left:calc(var(--tw-spacing) * 2)}.tw\\:pl-3{padding-left:calc(var(--tw-spacing) * 3)}.tw\\:pl-4{padding-left:calc(var(--tw-spacing) * 4)}.tw\\:pl-5{padding-left:calc(var(--tw-spacing) * 5)}.tw\\:pl-6{padding-left:calc(var(--tw-spacing) * 6)}.tw\\:pl-8{padding-left:calc(var(--tw-spacing) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-70{opacity:.7}.tw\\:opacity-100{opacity:1}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opa\\]{transition-property:margin,opa;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:fade-in-0{--tw-enter-opacity:0}.tw\\:fade-in-80{--tw-enter-opacity:.8}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:zoom-in-95{--tw-enter-scale:.95}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--tw-spacing) * 8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(var(--tw-spacing) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!size-8:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--tw-spacing) * 8)!important;height:calc(var(--tw-spacing) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *),.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--tw-spacing) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-0:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-2:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(var(--tw-spacing) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-r:is(:where(.tw\\:group)[data-side=primary] *){border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-l:is(:where(.tw\\:group)[data-side=secondary] *){border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:border:is(:where(.tw\\:group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:border-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){border-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:bg-muted:is(:where(.tw\\:group).tw\\\\:toast *){background-color:var(--muted)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:bg-primary:is(:where(.tw\\:group).tw\\\\:toast *){background-color:var(--primary)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:text-muted-foreground:is(:where(.tw\\:group).tw\\\\:toast *){color:var(--muted-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toast\\]\\:text-primary-foreground:is(:where(.tw\\:group).tw\\\\:toast *){color:var(--primary-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:border-border:is(:where(.tw\\:group).tw\\\\:toaster *){border-color:var(--border)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:bg-background:is(:where(.tw\\:group).tw\\\\:toaster *){background-color:var(--background)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:text-foreground:is(:where(.tw\\:group).tw\\\\:toaster *){color:var(--foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\:toaster\\]\\:shadow-lg:is(:where(.tw\\:group).tw\\\\:toaster *){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toast\\]\\:bg-muted:is(:where(.tw\\:group).tw\\\\\\\\:toast *){background-color:var(--muted)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toast\\]\\:bg-primary:is(:where(.tw\\:group).tw\\\\\\\\:toast *){background-color:var(--primary)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toast\\]\\:text-muted-foreground:is(:where(.tw\\:group).tw\\\\\\\\:toast *){color:var(--muted-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toast\\]\\:text-primary-foreground:is(:where(.tw\\:group).tw\\\\\\\\:toast *){color:var(--primary-foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toaster\\]\\:border-border:is(:where(.tw\\:group).tw\\\\\\\\:toaster *){border-color:var(--border)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toaster\\]\\:bg-background:is(:where(.tw\\:group).tw\\\\\\\\:toaster *){background-color:var(--background)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toaster\\]\\:text-foreground:is(:where(.tw\\:group).tw\\\\\\\\:toaster *){color:var(--foreground)}.tw\\:group-\\[\\.tw\\\\\\\\\\\\\\\\\\:toaster\\]\\:shadow-lg:is(:where(.tw\\:group).tw\\\\\\\\:toaster *){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-70:is(:where(.tw\\:peer):disabled~*){opacity:.7}.tw\\:peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button)[data-active=true]~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(var(--tw-spacing) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(var(--tw-spacing) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(var(--tw-spacing) * 1)}.tw\\:peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:peer)[data-variant=inset]~*){min-height:calc(100svh - (calc(var(--tw-spacing) * 4)))}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(var(--tw-spacing) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(var(--tw-spacing) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(var(--tw-spacing) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--tw-spacing) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(var(--tw-spacing) * 0)}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(var(--tw-spacing) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(var(--tw-spacing) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.tw\\:first\\:mt-0:first-child{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/80:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/80:hover{background-color:color-mix(in oklab, var(--destructive) 80%, transparent)}}.tw\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/80:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/80:hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:bg-sidebar:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):hover{background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-ring:focus-visible{--tw-ring-color:var(--ring)}.tw\\:focus-visible\\:ring-sidebar-ring:focus-visible{--tw-ring-color:var(--sidebar-ring)}.tw\\:focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-background:focus-visible{--tw-ring-offset-color:var(--background)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}.tw\\:has-\\[\\[data-variant\\=inset\\]\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(var(--tw-spacing) * 2)}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(var(--tw-spacing) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true]{background-color:var(--sidebar-accent)}.tw\\:data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true]{color:var(--sidebar-accent-foreground)}.tw\\:data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.tw\\:data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[orientation\\=vertical\\]\\:h-auto[data-orientation=vertical]{height:auto}.tw\\:data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.tw\\:data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked]{--tw-translate-x:calc(var(--tw-spacing) * 5);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-\\[-20px\\][data-state=checked]{--tw-translate-x:-20px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.tw\\:data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.tw\\:data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity:0}.tw\\:data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale:.95}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed]{--tw-exit-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed]{--tw-exit-translate-y:calc(48%*-1)}.tw\\:data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.tw\\:data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.tw\\:data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.tw\\:data-\\[state\\=open\\]\\:fade-in-0[data-state=open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open]{--tw-enter-translate-x:calc(1 / 2*-100%)}.tw\\:data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open]{--tw-enter-translate-y:calc(48%*-1)}@media (hover:hover){.tw\\:data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent[data-state=open]:hover{background-color:var(--sidebar-accent)}.tw\\:data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground[data-state=open]:hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}:where(.tw\\:sm\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:sm\\:rounded-lg{border-radius:var(--radius)}.tw\\:sm\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:sm\\:text-left{text-align:left}.tw\\:sm\\:text-start{text-align:start}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(var(--tw-spacing) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2:is(:where(.tw\\:peer)[data-state=collapsed]~*):is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 2)}}.tw\\:after\\:md\\:hidden:after{content:var(--tw-content)}@media (min-width:48rem){.tw\\:after\\:md\\:hidden:after{display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(var(--tw-spacing) * 2)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(var(--tw-spacing) * 2)}.tw\\:dark\\:border-destructive:is(.dark *){border-color:var(--destructive)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.tw\\:\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--tw-spacing) * 12)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:relative>:focus-visible{position:relative}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:z-10>:focus-visible{z-index:10}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-l-none>:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-l-0>:not(:first-child){border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-r-none>:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-r-md:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-top-right-radius:calc(var(--radius) * .8);border-bottom-right-radius:calc(var(--radius) * .8)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>img\\]\\:absolute>img{position:absolute}.tw\\:\\[\\&\\>img\\]\\:top-4>img{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:left-4>img{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:text-destructive>img{color:var(--destructive)}.tw\\:\\[\\&\\>img\\]\\:text-foreground>img{color:var(--foreground)}.tw\\:\\[\\&\\>img\\+div\\]\\:translate-y-\\[-3px\\]>img+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>img\\~\\*\\]\\:pl-7>img~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&\\>span\\]\\:line-clamp-1>span{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:\\[\\&\\>span\\]\\:flex-1>span{flex:1}.tw\\:\\[\\&\\>span\\]\\:text-start>span{text-align:start}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:absolute>svg{position:absolute}.tw\\:\\[\\&\\>svg\\]\\:top-4>svg{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:left-4>svg{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-destructive>svg{color:var(--destructive)}.tw\\:\\[\\&\\>svg\\]\\:text-foreground>svg{color:var(--foreground)}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--tw-spacing) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize,[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--tw-spacing) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}.light,:root{--radius:.625rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success:oklch(62.7% .194 149.214);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success:oklch(79.2% .209 151.711);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(98.21% 0 0);--foreground:oklch(24.35% 0 0);--muted:oklch(95.21% 0 0);--muted-foreground:oklch(50.32% 0 0);--popover:oklch(99.11% 0 0);--popover-foreground:oklch(24.35% 0 0);--card:oklch(99.11% 0 0);--card-foreground:oklch(24.35% 0 0);--border:oklch(88.22% 0 0);--input:oklch(88.22% 0 0);--primary:oklch(35.48% .0611 180.17);--primary-foreground:oklch(100% 0 0);--secondary:oklch(92% .065 74.36);--secondary-foreground:oklch(34.99% .0685 40.82);--accent:oklch(93.1% 0 0);--accent-foreground:oklch(24.35% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--success:oklch(62.7% .194 149.214);--ring:oklch(43.41% .0392 41.96);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.81% 0 0);--sidebar-foreground:oklch(26.45% 0 0);--sidebar-primary:oklch(32.5% 0 0);--sidebar-primary-foreground:oklch(98.81% 0 0);--sidebar-accent:oklch(95.21% 0 0);--sidebar-accent-foreground:oklch(32.5% 0 0);--sidebar-border:oklch(94.01% 0 0);--sidebar-ring:oklch(77.31% 0 0)}.paratext-dark{--background:oklch(17.76% 0 0);--foreground:oklch(94.91% 0 0);--muted:oklch(25.2% 0 0);--muted-foreground:oklch(76.99% 0 0);--popover:oklch(21.34% 0 0);--popover-foreground:oklch(94.91% 0 0);--card:oklch(21.34% 0 0);--card-foreground:oklch(94.91% 0 0);--border:oklch(23.51% .0115 91.77);--input:oklch(40.17% 0 0);--primary:oklch(98.6% .0113 84.59);--primary-foreground:oklch(20.29% .024 200.24);--secondary:oklch(31.63% .019 63.68);--secondary-foreground:oklch(92.47% .0523 66.15);--accent:oklch(28.5% 0 0);--accent-foreground:oklch(94.91% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--success:oklch(79.2% .209 151.711);--ring:oklch(92.47% .0523 66.15);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(21.03% .0059 285.82);--sidebar-foreground:oklch(96.74% .0014 285.04);--sidebar-primary:oklch(48.82% .2172 264.38);--sidebar-primary-foreground:oklch(100% 0 0);--sidebar-accent:oklch(27.39% .0055 285.94);--sidebar-accent-foreground:oklch(96.74% .0014 285.04);--sidebar-border:oklch(27.39% .0055 285.94);--sidebar-ring:oklch(87.11% .0055 285.98)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Cp as Alert,
  Tp as AlertDescription,
  Ep as AlertTitle,
  tw as Avatar,
  ew as AvatarFallback,
  Nu as AvatarImage,
  pu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  hu as BOOK_SELECTOR_STRING_KEYS,
  or as Badge,
  uu as BookChapterControl,
  lo as BookSelectionMode,
  fu as BookSelector,
  j as Button,
  Io as ButtonGroup,
  La as ButtonGroupSeparator,
  mu as ButtonGroupText,
  Va as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  bu as COMMENT_EDITOR_STRING_KEYS,
  vu as COMMENT_LIST_STRING_KEYS,
  za as CancelAcceptButtons,
  Zc as Card,
  Qc as CardContent,
  ku as CardDescription,
  _u as CardFooter,
  xu as CardHeader,
  yu as CardTitle,
  El as ChapterRangeSelector,
  Ba as Checkbox,
  kp as Checklist,
  so as ComboBox,
  xe as Command,
  Or as CommandEmpty,
  ae as CommandGroup,
  sr as CommandInput,
  le as CommandItem,
  ye as CommandList,
  gu as CommentEditor,
  Eu as CommentList,
  Sp as ContextMenu,
  Vp as ContextMenuCheckboxItem,
  Pp as ContextMenuContent,
  Dp as ContextMenuGroup,
  Lp as ContextMenuItem,
  jp as ContextMenuLabel,
  Mp as ContextMenuPortal,
  Ip as ContextMenuRadioGroup,
  zp as ContextMenuRadioItem,
  Fp as ContextMenuSeparator,
  Bp as ContextMenuShortcut,
  Op as ContextMenuSub,
  $p as ContextMenuSubContent,
  Ap as ContextMenuSubTrigger,
  Rp as ContextMenuTrigger,
  vw as DataTable,
  dl as Dialog,
  lu as DialogClose,
  hl as DialogContent,
  wu as DialogDescription,
  cu as DialogFooter,
  fl as DialogHeader,
  pl as DialogOverlay,
  ul as DialogPortal,
  ml as DialogTitle,
  su as DialogTrigger,
  Kp as Drawer,
  Gp as DrawerClose,
  Up as DrawerContent,
  Xp as DrawerDescription,
  Wp as DrawerFooter,
  Hp as DrawerHeader,
  Od as DrawerOverlay,
  Md as DrawerPortal,
  Yp as DrawerTitle,
  qp as DrawerTrigger,
  ge as DropdownMenu,
  me as DropdownMenuCheckboxItem,
  be as DropdownMenuContent,
  ja as DropdownMenuGroup,
  po as DropdownMenuItem,
  kw as DropdownMenuItemType,
  Ar as DropdownMenuLabel,
  rw as DropdownMenuPortal,
  nw as DropdownMenuRadioGroup,
  sw as DropdownMenuRadioItem,
  lr as DropdownMenuSeparator,
  Cu as DropdownMenuShortcut,
  ow as DropdownMenuSub,
  iw as DropdownMenuSubContent,
  aw as DropdownMenuSubTrigger,
  Re as DropdownMenuTrigger,
  xw as ERROR_DUMP_STRING_KEYS,
  Ou as ERROR_POPOVER_STRING_KEYS,
  Tw as EditorKeyboardShortcuts,
  yw as ErrorDump,
  Iu as ErrorPopover,
  zu as FOOTNOTE_EDITOR_STRING_KEYS,
  Lu as Filter,
  Au as FilterDropdown,
  Pu as Footer,
  Vu as FootnoteEditor,
  Bw as FootnoteItem,
  ju as FootnoteList,
  Hu as INVENTORY_STRING_KEYS,
  cr as Input,
  Wu as Inventory,
  fo as Kbd,
  gt as Label,
  Iw as MARKER_MENU_STRING_KEYS,
  Mu as MarkdownRenderer,
  $w as MarkerMenu,
  $u as MoreInfo,
  Nw as MultiSelectComboBox,
  bp as NavigationContentSearch,
  ce as Popover,
  vl as PopoverAnchor,
  we as PopoverContent,
  ke as PopoverTrigger,
  Jp as Progress,
  wa as RadioGroup,
  io as RadioGroupItem,
  xl as RecentSearches,
  th as ResizableHandle,
  Qp as ResizablePanel,
  Zp as ResizablePanelGroup,
  _p as ResultsCard,
  wp as SCOPE_SELECTOR_STRING_KEYS,
  dp as ScopeSelector,
  cp as ScriptureResultsViewer,
  up as ScrollGroupSelector,
  jo as SearchBar,
  Be as Select,
  Ge as SelectContent,
  ww as SelectGroup,
  Bt as SelectItem,
  Tu as SelectLabel,
  pw as SelectScrollDownButton,
  uw as SelectScrollUpButton,
  Su as SelectSeparator,
  qe as SelectTrigger,
  Ke as SelectValue,
  Fe as Separator,
  pp as SettingsList,
  fp as SettingsListHeader,
  hp as SettingsListItem,
  id as SettingsSidebar,
  lp as SettingsSidebarContentSearch,
  Qw as Sidebar,
  ed as SidebarContent,
  Qu as SidebarFooter,
  Nn as SidebarGroup,
  ep as SidebarGroupAction,
  En as SidebarGroupContent,
  Cn as SidebarGroupLabel,
  Zu as SidebarHeader,
  Ju as SidebarInput,
  td as SidebarInset,
  rd as SidebarMenu,
  rp as SidebarMenuAction,
  op as SidebarMenuBadge,
  ad as SidebarMenuButton,
  od as SidebarMenuItem,
  np as SidebarMenuSkeleton,
  ap as SidebarMenuSub,
  sp as SidebarMenuSubButton,
  ip as SidebarMenuSubItem,
  Zw as SidebarProvider,
  Xu as SidebarRail,
  tp as SidebarSeparator,
  Yu as SidebarTrigger,
  ho as Skeleton,
  rh as Slider,
  eh as Sonner,
  Rd as Spinner,
  oh as Switch,
  mo as TabDropdownMenu,
  gp as TabFloatingMenu,
  mp as TabToolbar,
  Po as Table,
  Vo as TableBody,
  Du as TableCaption,
  Ve as TableCell,
  Ru as TableFooter,
  Sr as TableHead,
  Lo as TableHeader,
  fe as TableRow,
  nh as Tabs,
  sh as TabsContent,
  ah as TabsList,
  ih as TabsTrigger,
  Np as TextField,
  lh as Textarea,
  Ma as ToggleGroup,
  vr as ToggleGroupItem,
  xp as Toolbar,
  Lt as Tooltip,
  Vt as TooltipContent,
  It as TooltipProvider,
  Kt as TooltipTrigger,
  Cw as UNDO_REDO_BUTTONS_STRING_KEYS,
  yp as UiLanguageSelector,
  Ew as UndoRedoButtons,
  Ya as VerticalTabs,
  Ja as VerticalTabsContent,
  Xa as VerticalTabsList,
  md as VerticalTabsTrigger,
  We as Z_INDEX_ABOVE_DOCK,
  na as Z_INDEX_FOOTNOTE_EDITOR,
  cl as Z_INDEX_MODAL,
  ll as Z_INDEX_MODAL_BACKDROP,
  sl as Z_INDEX_OVERLAY,
  Jc as badgeVariants,
  Uc as buttonGroupVariants,
  ca as buttonVariants,
  m as cn,
  Uu as getBookIdFromUSFM,
  $r as getInventoryHeader,
  qu as getLinesFromUSFM,
  Gu as getNumberFromUSFM,
  Hw as getStatusForItem,
  vp as getToolbarOSReservedSpaceClassName,
  Bu as inventoryCountColumn,
  Fu as inventoryItemColumn,
  Ku as inventoryStatusColumn,
  dw as selectTriggerVariants,
  hh as sonner,
  ch as useEvent,
  wh as useEventAsync,
  Xc as useListbox,
  Ad as usePromise,
  du as useRecentSearches,
  Pr as useSidebar,
  dh as useStylesheet
};
//# sourceMappingURL=index.js.map
