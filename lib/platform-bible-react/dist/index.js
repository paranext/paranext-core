var Pi = Object.defineProperty;
var Vi = (t, e, r) => e in t ? Pi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var vt = (t, e, r) => Vi(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as u, jsx as n, Fragment as it } from "react/jsx-runtime";
import { Command as Ne } from "cmdk";
import { X as $e, Search as po, Check as Ft, Clock as Rn, ChevronsLeft as Dn, ChevronsRight as Mn, ChevronLeft as Br, ChevronRight as Re, ArrowLeft as Li, ArrowRight as ji, Circle as sn, ChevronDown as Pe, BoldIcon as Fi, ItalicIcon as Bi, AtSign as fo, Pencil as Ki, Trash2 as Gi, ArrowUp as mo, MoreHorizontal as zi, MailOpen as Ui, Mail as Hi, ChevronUp as ho, FilterIcon as qi, ArrowLeftIcon as Wi, ChevronLeftIcon as Yi, ChevronRightIcon as Ji, ArrowRightIcon as Xi, Copy as go, Filter as Zi, User as Qi, Link as ts, CircleHelp as es, ChevronsUpDown as bo, Star as rs, Undo as ns, Redo as os, SquareX as vo, FunctionSquare as xo, SquareSigma as yo, Ban as is, AlertCircle as Kr, CircleCheckIcon as ss, CircleXIcon as as, CircleHelpIcon as ls, ArrowUpIcon as cs, ArrowDownIcon as ds, PanelLeft as ws, PanelRight as us, ScrollText as ps, MenuIcon as fs, Menu as ms, EllipsisVertical as hs, MoreVertical as On, LoaderCircle as gs, GripVertical as bs } from "lucide-react";
import { clsx as vs } from "clsx";
import { twMerge as xs } from "tailwind-merge";
import * as Ht from "@radix-ui/react-dialog";
import { Canon as ct } from "@sillsdev/scripture";
import { includes as rr, Section as W, getChaptersForBook as ys, formatScrRef as be, getSectionForBook as Ke, formatRelativeDate as Ns, formatReplacementString as ge, sanitizeHtml as _s, NumberFormat as ks, formatBytes as Cs, getCurrentLocale as Es, usfmMarkers as lr, getFormatCallerFunction as Ts, deepEqual as Ss, isString as In, compareScrRefs as Gr, scrRefToBBBCCCVVV as Tr, getLocalizeKeyForScrollGroupId as Z } from "platform-bible-utils";
import Q, { forwardRef as Xe, useRef as H, useMemo as F, useState as S, useCallback as K, useLayoutEffect as Rt, createContext as br, useContext as an, useEffect as q, Component as Rs, createElement as An, Suspense as Ds, Fragment as No } from "react";
import { Slot as Ve } from "@radix-ui/react-slot";
import { cva as ce } from "class-variance-authority";
import * as He from "@radix-ui/react-popover";
import * as Ms from "@radix-ui/react-label";
import * as zr from "@radix-ui/react-radio-group";
import { createEditor as _o, $getRoot as oe, $createParagraphNode as vr, $getSelection as At, HISTORY_MERGE_TAG as ln, ParagraphNode as ko, TextNode as Co, $isTokenOrSegmented as Os, $getCharacterOffsets as Is, $cloneWithPropertiesEphemeral as As, $findMatchingParent as Eo, $isElementNode as ee, $isRangeSelection as xe, CLEAR_EDITOR_COMMAND as To, COMMAND_PRIORITY_EDITOR as So, mergeRegister as ie, shallowMergeConfig as $s, defineExtension as Bt, safeCast as Ze, createState as Ps, FORMAT_TEXT_COMMAND as Ro, $isNodeSelection as Do, COMMAND_PRIORITY_LOW as Mo, RootNode as Vs, LineBreakNode as Ls, TabNode as js, $isEditorState as Fs, createCommand as Bs, CLICK_COMMAND as Ks, isDOMNode as Gs, $getNodeFromDOMNode as zs, $createNodeSelection as Us, $setSelection as Hs, DecoratorNode as Ur, $getState as qs, toggleTextFormatType as $n, TEXT_TYPE_TO_FORMAT as Ws, $setState as Ys, addClassNamesToElement as Oo, $create as Js, $getNodeByKey as Xs, removeClassNamesFromElement as Zs, KEY_TAB_COMMAND as Qs, $isBlockElementNode as ur, $createRangeSelection as ta, $normalizeSelection__EXPERIMENTAL as ea, OUTDENT_CONTENT_COMMAND as ra, INDENT_CONTENT_COMMAND as Pn, INSERT_TAB_COMMAND as na, COMMAND_PRIORITY_CRITICAL as cn, $isDecoratorNode as oa, $isParagraphNode as ia, $isTextNode as pr, SELECTION_CHANGE_COMMAND as Io, getRegisteredNode as sa, isHTMLElement as aa, isDocumentFragment as Vn, isDOMDocumentNode as la, ArtificialNode__DO_NOT_USE as Ao, $createLineBreakNode as $o, $isRootOrShadowRoot as ca, isBlockDomNode as Ln, isInlineDomNode as jn, $insertNodes as da } from "lexical";
import * as xr from "@radix-ui/react-tooltip";
import { TooltipTrigger as wa } from "@radix-ui/react-tooltip";
import { HeadingNode as ua, QuoteNode as pa, registerRichText as fa } from "@lexical/rich-text";
import { flushSync as ma, createPortal as ha } from "react-dom";
import { $isTableSelection as ga } from "@lexical/table";
import * as Po from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as Vo } from "@lexical/headless";
import * as ba from "@radix-ui/react-separator";
import * as dn from "@radix-ui/react-avatar";
import * as ft from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as va } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Lo, getFilteredRowModel as xa, getSortedRowModel as jo, getPaginationRowModel as ya, getCoreRowModel as Fo, flexRender as Ge, getGroupedRowModel as Na, getExpandedRowModel as _a } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import ka from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Hr, HIDDEN_NOTE_CALLER as qr, getDefaultViewOptions as Ca, isInsertEmbedOpOfType as nr, Editorial as Ea } from "@eten-tech-foundation/platform-editor";
import * as Fn from "@radix-ui/react-checkbox";
import * as $t from "@radix-ui/react-tabs";
import * as jt from "@radix-ui/react-menubar";
import { useHotkeys as Ta } from "react-hotkeys-hook";
import * as mt from "@radix-ui/react-context-menu";
import { Drawer as de } from "vaul";
import * as Bn from "@radix-ui/react-progress";
import * as wn from "react-resizable-panels";
import { Toaster as Sa } from "sonner";
import { toast as Tp } from "sonner";
import * as or from "@radix-ui/react-slider";
import * as Kn from "@radix-ui/react-switch";
function Wr(t) {
  const e = [];
  let r = "", o = 0;
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Ra(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Wr(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, d) => d !== r), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((c, d) => d !== o), `!${s}`].join(":")}`, original: t };
  }
  const i = e[e.length - 1];
  if (i.startsWith("tw-")) {
    const s = i.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Da(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Wr(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), i = r[r.length - 1], s = Wr(e), a = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
  if (a && i.startsWith("-")) {
    const c = i.slice(1);
    return [...o, `-tw-${c}`].join(":");
  }
  if (l && i.startsWith("!")) {
    const c = i.slice(1);
    return [...o, `!tw-${c}`].join(":");
  }
  return [...o, `tw-${i}`].join(":");
}
function h(...t) {
  const e = vs(t);
  if (!e) return e;
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), i = [];
  return r.forEach((c) => {
    const d = Ra(c);
    o.set(d.normalized, d.original), i.push(d.normalized);
  }), xs(i.join(" ")).split(" ").filter(Boolean).map((c) => {
    const d = o.get(c);
    return d ? Da(c, d) : c;
  }).join(" ");
}
const Le = 250, Bo = 300, Ma = 400, Oa = 450, Ia = 500, Aa = "layoutDirection";
function dt() {
  const t = localStorage.getItem(Aa);
  return t === "rtl" ? t : "ltr";
}
const $a = Ht.Root, yw = Ht.Trigger, Pa = Ht.Portal, Nw = Ht.Close;
function Va({
  className: t,
  style: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    Ht.Overlay,
    {
      ref: r,
      className: h(
        // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
        t
      ),
      style: { zIndex: Oa, ...e },
      ...o
    }
  );
}
function La({
  className: t,
  children: e,
  overlayClassName: r,
  style: o,
  ref: i,
  ...s
}) {
  const a = dt();
  return /* @__PURE__ */ u(Pa, { children: [
    /* @__PURE__ */ n(Va, { className: r }),
    /* @__PURE__ */ u(
      Ht.Content,
      {
        ref: i,
        className: h(
          // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        style: { zIndex: Ia, ...o },
        ...s,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ u(
            Ht.Close,
            {
              className: h(
                "tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground",
                { "tw:right-4": a === "ltr" },
                { "tw:left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ n($e, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function ja({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: h(
        "tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function _w({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: h(
        "tw:flex tw:flex-col-reverse tw:sm:flex-row tw:sm:justify-end tw:sm:space-x-2",
        t
      ),
      ...e
    }
  );
}
function Fa({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ht.Title,
    {
      ref: e,
      className: h("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function kw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ht.Description,
    {
      ref: e,
      className: h("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function we({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ne,
    {
      ref: e,
      className: h(
        "tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:rounded-md tw:bg-popover tw:text-popover-foreground",
        t
      ),
      ...r
    }
  );
}
function Qe({
  className: t,
  ref: e,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: o, children: [
    /* @__PURE__ */ n(po, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ n(
      Ne.Input,
      {
        ref: e,
        className: h(
          "tw:flex tw:h-10 tw:w-full tw:rounded-md tw:bg-transparent tw:py-3 tw:text-sm tw:outline-none tw:placeholder:text-muted-foreground tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
          t
        ),
        ...r
      }
    )
  ] });
}
function ue({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ne.List,
    {
      ref: e,
      className: h("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...r
    }
  );
}
function yr({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ n(Ne.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function qt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ne.Group,
    {
      ref: e,
      className: h(
        "tw:overflow-hidden tw:p-1 tw:text-foreground tw:[&_[cmdk-group-heading]]:px-2 tw:[&_[cmdk-group-heading]]:py-1.5 tw:[&_[cmdk-group-heading]]:text-xs tw:[&_[cmdk-group-heading]]:font-medium tw:[&_[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...r
    }
  );
}
function Ko({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ne.Separator,
    {
      ref: e,
      className: h("tw:-mx-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function Wt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ne.Item,
    {
      ref: e,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:gap-2 tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:data-[disabled=true]:pointer-events-none tw:data-[selected=true]:bg-accent tw:data-[selected=true]:text-accent-foreground tw:data-[disabled=true]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: h("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Go = (t, e, r, o, i) => {
  switch (t) {
    case W.OT:
      return e ?? "Old Testament";
    case W.NT:
      return r ?? "New Testament";
    case W.DC:
      return o ?? "Deuterocanon";
    case W.Extra:
      return i ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Ka = (t, e, r, o, i) => {
  switch (t) {
    case W.OT:
      return e ?? "OT";
    case W.NT:
      return r ?? "NT";
    case W.DC:
      return o ?? "DC";
    case W.Extra:
      return i ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Te(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ct.bookIdToEnglishName(t);
}
function un(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const zo = ct.allBookIds.filter(
  (t) => !ct.isObsolete(ct.bookIdToNumber(t))
), ve = Object.fromEntries(
  zo.map((t) => [t, ct.bookIdToEnglishName(t)])
);
function pn(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const i = ct.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(rr(i.toLowerCase(), o) || rr(t.toLowerCase(), o) || (s ? rr(s.localizedName.toLowerCase(), o) || rr(s.localizedId.toLowerCase(), o) : !1));
}
const Uo = Xe(
  ({
    bookId: t,
    isSelected: e,
    onSelect: r,
    onMouseDown: o,
    section: i,
    className: s,
    showCheck: a = !1,
    localizedBookNames: l,
    commandValue: c
  }, d) => {
    const w = H(!1), f = () => {
      w.current || r == null || r(t), setTimeout(() => {
        w.current = !1;
      }, 100);
    }, m = (v) => {
      w.current = !0, o ? o(v) : r == null || r(t);
    }, p = F(
      () => Te(t, l),
      [t, l]
    ), g = F(
      () => un(t, l),
      [t, l]
    );
    return /* @__PURE__ */ n(
      "div",
      {
        className: h(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": i === W.OT,
            "tw:border-s-purple-200": i === W.NT,
            "tw:border-s-indigo-200": i === W.DC,
            "tw:border-s-amber-200": i === W.Extra
          }
        ),
        children: /* @__PURE__ */ u(
          Wt,
          {
            ref: d,
            value: c || `${t} ${ct.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: m,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ct.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              a && /* @__PURE__ */ n(
                Ft,
                {
                  className: h(
                    "tw:me-2 tw:h-4 tw:w-4 tw:flex-shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:flex-1", children: p }),
              /* @__PURE__ */ n("span", { className: "tw:ms-2 tw:flex-shrink-0 tw:text-xs tw:text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), Ho = ce(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/90",
        destructive: "tw:bg-destructive tw:text-destructive-foreground tw:shadow-sm tw:hover:bg-destructive/90",
        outline: "tw:border tw:border-input tw:bg-background tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:shadow-sm tw:hover:bg-secondary/80",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline"
      },
      size: {
        default: "tw:h-9 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3 tw:text-xs",
        lg: "tw:h-10 tw:rounded-md tw:px-8",
        icon: "tw:h-9 tw:w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function B({
  className: t,
  variant: e,
  size: r,
  asChild: o = !1,
  ref: i,
  ...s
}) {
  return /* @__PURE__ */ n(o ? Ve : "button", { className: h(Ho({ variant: e, size: r, className: t })), ref: i, ...s });
}
const Yt = He.Root, pe = He.Trigger, Ga = He.Anchor;
function Jt({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  style: o,
  ref: i,
  ...s
}) {
  const a = dt();
  return /* @__PURE__ */ n(He.Portal, { children: /* @__PURE__ */ n(
    He.Content,
    {
      ref: i,
      align: e,
      sideOffset: r,
      className: h(
        // CUSTOM removed tw:z-50 to use const below
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-none tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Le, ...o },
      ...s,
      dir: a
    }
  ) });
}
function Yr(t, e, r) {
  return `${t} ${ve[t]}${e ? ` ${un(t, e)} ${Te(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
function za({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: i = "Show recent searches",
  groupHeading: s = "Recent",
  id: a,
  classNameForItems: l,
  buttonClassName: c = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: d = "ghost"
}) {
  const [w, f] = S(!1);
  if (t.length === 0)
    return;
  const m = (p) => {
    e(p), f(!1);
  };
  return /* @__PURE__ */ u(Yt, { open: w, onOpenChange: f, children: [
    /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ n(
      B,
      {
        variant: d,
        size: "icon",
        className: c,
        "aria-label": i,
        children: /* @__PURE__ */ n(Rn, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ n(Jt, { id: a, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ n(we, { children: /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(qt, { heading: s, children: t.map((p) => /* @__PURE__ */ u(
      Wt,
      {
        onSelect: () => m(p),
        className: h("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ n(Rn, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ n("span", { children: r(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function Cw(t, e, r = (i, s) => i === s, o = 15) {
  return (i) => {
    const s = t.filter(
      (l) => !r(l, i)
    ), a = [i, ...s.slice(0, o - 1)];
    e(a);
  };
}
const Sr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ua = [
  Sr.BOOK_ONLY,
  Sr.BOOK_CHAPTER,
  Sr.BOOK_CHAPTER_VERSE
];
function Gn(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function Lt(t) {
  return ys(ct.bookIdToNumber(t));
}
function Ha(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Ua.reduce(
    (i, s) => {
      if (i) return i;
      const a = s.exec(t.trim());
      if (a) {
        const [l, c = void 0, d = void 0] = a.slice(1);
        let w;
        const f = e.filter((m) => pn(m, l, r));
        if (f.length === 1 && ([w] = f), !w && c) {
          if (ct.isBookIdValid(l)) {
            const m = l.toUpperCase();
            e.includes(m) && (w = m);
          }
          if (!w && r) {
            const m = Array.from(r.entries()).find(
              ([, p]) => p.localizedId.toLowerCase() === l.toLowerCase()
            );
            m && e.includes(m[0]) && ([w] = m);
          }
        }
        if (!w && c) {
          const p = ((g) => Object.keys(ve).find(
            (v) => ve[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (p && e.includes(p) && (w = p), !w && r) {
            const g = Array.from(r.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([w] = g);
          }
        }
        if (w) {
          let m = c ? parseInt(c, 10) : void 0;
          m && m > Lt(w) && (m = Math.max(Lt(w), 1));
          const p = d ? parseInt(d, 10) : void 0;
          return {
            book: w,
            chapterNum: m,
            verseNum: p
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function qa(t, e, r, o) {
  const i = K(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const d = e[c - 1], w = Math.max(Lt(d), 1);
        o({
          book: d,
          chapterNum: w,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = K(() => {
    const c = Lt(t.book);
    if (t.chapterNum < c)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d < e.length - 1) {
        const w = e[d + 1];
        o({
          book: w,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), a = K(() => {
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
      onClick: i,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Dn : Mn
    },
    {
      onClick: a,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Br : Re
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? Re : Br
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === Lt(t.book) || Lt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? Mn : Dn
    }
  ], [
    t,
    e,
    r,
    i,
    a,
    l,
    s
  ]);
}
function zn({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: i,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ n(qt, { children: /* @__PURE__ */ n("div", { className: h("tw:grid tw:grid-cols-6 tw:gap-1", s), children: Array.from({ length: Lt(t) }, (a, l) => l + 1).map((a) => /* @__PURE__ */ n(
      Wt,
      {
        value: `${t} ${ve[t] || ""} ${a}`,
        onSelect: () => r(a),
        ref: o(a),
        className: h(
          "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
          {
            "tw:bg-primary tw:text-primary-foreground": t === e.book && a === e.chapterNum
          },
          {
            "tw:bg-muted/50 tw:text-muted-foreground/50": (i == null ? void 0 : i(a)) ?? !1
          }
        ),
        children: a
      },
      a
    )) }) });
}
function Ew({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  localizedBookNames: i,
  localizedStrings: s,
  recentSearches: a,
  onAddRecentSearch: l,
  id: c
}) {
  const d = dt(), [w, f] = S(!1), [m, p] = S(""), [g, v] = S(""), [b, x] = S("books"), [y, N] = S(void 0), [k, L] = S(!1), j = H(void 0), I = H(void 0), D = H(void 0), C = H(void 0), T = H({}), V = K(
    (R) => {
      e(R), l && l(R);
    },
    [e, l]
  ), $ = F(() => o ? o() : zo, [o]), O = F(() => ({
    [W.OT]: $.filter((_) => ct.isBookOT(_)),
    [W.NT]: $.filter((_) => ct.isBookNT(_)),
    [W.DC]: $.filter((_) => ct.isBookDC(_)),
    [W.Extra]: $.filter((_) => ct.extraBooks().includes(_))
  }), [$]), A = F(() => Object.values(O).flat(), [O]), Y = F(() => {
    if (!g.trim()) return O;
    const R = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return [W.OT, W.NT, W.DC, W.Extra].forEach((P) => {
      R[P] = O[P].filter((z) => pn(z, g, i));
    }), R;
  }, [O, g, i]), M = F(
    () => Ha(g, A, i),
    [g, A, i]
  ), J = K(() => {
    M && (V({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), f(!1), v(""), p(""));
  }, [V, M]), Ct = K(
    (R) => {
      if (Lt(R) <= 1) {
        V({
          book: R,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), v("");
        return;
      }
      N(R), x("chapters");
    },
    [V]
  ), Dt = K(
    (R) => {
      const _ = b === "chapters" ? y : M == null ? void 0 : M.book;
      _ && (V({
        book: _,
        chapterNum: R,
        verseNum: 1
      }), f(!1), x("books"), N(void 0), v(""));
    },
    [V, b, y, M]
  ), St = K(
    (R) => {
      V(R), f(!1), v("");
    },
    [V]
  ), ut = qa(t, A, d, e), lt = K(() => {
    x("books"), N(void 0), setTimeout(() => {
      I.current && I.current.focus();
    }, 0);
  }, []), G = K(
    (R) => {
      if (!R && b === "chapters") {
        lt();
        return;
      }
      f(R), R && (x("books"), N(void 0), v(""));
    },
    [b, lt]
  ), { otLong: rt, ntLong: nt, dcLong: st, extraLong: bt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Gt = K(
    (R) => Go(R, rt, nt, st, bt),
    [rt, nt, st, bt]
  ), Pt = K(
    (R) => M ? !!M.chapterNum && !R.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), zt = F(
    () => be(
      t,
      i ? Te(t.book, i) : "English"
    ),
    [t, i]
  ), ke = K((R) => (_) => {
    T.current[R] = _;
  }, []), Zt = K((R) => {
    (R.key === "Home" || R.key === "End") && R.stopPropagation();
  }, []), Ut = K(
    (R) => {
      if (R.ctrlKey) return;
      const { isLetter: _, isDigit: P } = Gn(R.key);
      if (b === "chapters") {
        if (R.key === "Backspace") {
          R.preventDefault(), R.stopPropagation(), lt();
          return;
        }
        if (_ || P) {
          if (R.preventDefault(), R.stopPropagation(), x("books"), N(void 0), P && y) {
            const z = ve[y];
            v(`${z} ${R.key}`);
          } else
            v(R.key);
          setTimeout(() => {
            I.current && I.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(R.key)) {
        const z = b === "chapters" ? y : M == null ? void 0 : M.book;
        if (!z) return;
        const U = (() => {
          if (!m) return 1;
          const at = m.match(/(\d+)$/);
          return at ? parseInt(at[1], 10) : 0;
        })(), ot = Lt(z);
        if (!ot) return;
        let tt = U;
        const ht = 6;
        switch (R.key) {
          case "ArrowLeft":
            U !== 0 && (tt = U > 1 ? U - 1 : ot);
            break;
          case "ArrowRight":
            U !== 0 && (tt = U < ot ? U + 1 : 1);
            break;
          case "ArrowUp":
            tt = U === 0 ? ot : Math.max(1, U - ht);
            break;
          case "ArrowDown":
            tt = U === 0 ? 1 : Math.min(ot, U + ht);
            break;
          default:
            return;
        }
        tt !== U && (R.preventDefault(), R.stopPropagation(), p(Yr(z, i, tt)), setTimeout(() => {
          const at = T.current[tt];
          at && at.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      M,
      lt,
      y,
      m,
      i
    ]
  ), je = K((R) => {
    if (R.shiftKey || R.key === "Tab" || R.key === " ") return;
    const { isLetter: _, isDigit: P } = Gn(R.key);
    (_ || P) && (R.preventDefault(), v((z) => z + R.key), I.current.focus(), L(!1));
  }, []);
  return Rt(() => {
    const R = setTimeout(() => {
      if (w && b === "books" && D.current && C.current) {
        const _ = D.current, P = C.current, z = P.offsetTop, U = _.clientHeight, ot = P.clientHeight, tt = z - U / 2 + ot / 2;
        _.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), p(Yr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(R);
    };
  }, [w, b, g, M, t.book]), Rt(() => {
    if (b === "chapters" && y) {
      const R = y === t.book;
      setTimeout(() => {
        if (D.current)
          if (R) {
            const _ = T.current[t.chapterNum];
            _ && _.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            D.current.scrollTo({ top: 0 });
        j.current && j.current.focus();
      }, 0);
    }
  }, [b, y, M, t.book, t.chapterNum]), /* @__PURE__ */ u(Yt, { open: w, onOpenChange: G, children: [
    /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ n(
      B,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": w,
        className: h(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ n("span", { className: "tw:truncate", children: zt })
      }
    ) }),
    /* @__PURE__ */ n(Jt, { id: c, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ u(
      we,
      {
        ref: j,
        onKeyDown: Ut,
        loop: !0,
        value: m,
        onValueChange: p,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ n(
                Qe,
                {
                  ref: I,
                  value: g,
                  onValueChange: v,
                  onKeyDown: Zt,
                  onFocus: () => L(!1),
                  className: a && a.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              a && a.length > 0 && /* @__PURE__ */ n(
                za,
                {
                  recentSearches: a,
                  onSearchItemSelect: St,
                  renderItem: (R) => be(R, "English"),
                  getItemKey: (R) => `${R.book}-${R.chapterNum}-${R.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: ut.map(({ onClick: R, disabled: _, title: P, icon: z }) => /* @__PURE__ */ n(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  L(!0), R();
                },
                disabled: _,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: P,
                onKeyDown: je,
                children: /* @__PURE__ */ n(z, {})
              },
              P
            )) })
          ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ n(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: lt,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: d === "ltr" ? /* @__PURE__ */ n(Li, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ n(ji, { className: "tw:h-4 tw:w-4" })
              }
            ),
            y && /* @__PURE__ */ n("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Te(y, i) })
          ] }),
          !k && /* @__PURE__ */ u(ue, { ref: D, children: [
            b === "books" && /* @__PURE__ */ u(it, { children: [
              !M && Object.entries(Y).map(([R, _]) => {
                if (_.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ n(qt, { heading: Gt(R), children: _.map((P) => /* @__PURE__ */ n(
                      Uo,
                      {
                        bookId: P,
                        onSelect: (z) => Ct(z),
                        section: Ke(P),
                        commandValue: `${P} ${ve[P]}`,
                        ref: P === t.book ? C : void 0,
                        localizedBookNames: i
                      },
                      P
                    )) }, R)
                  );
              }),
              M && /* @__PURE__ */ n(qt, { children: /* @__PURE__ */ n(
                Wt,
                {
                  value: `${M.book} ${ve[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: J,
                  className: "tw:font-semibold tw:text-primary",
                  children: be(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    i ? un(M.book, i) : void 0
                  )
                },
                "top-match"
              ) }),
              M && Lt(M.book) > 1 && /* @__PURE__ */ u(it, { children: [
                /* @__PURE__ */ n("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: Te(M.book, i) }),
                /* @__PURE__ */ n(
                  zn,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Dt,
                    setChapterRef: ke,
                    isChapterDimmed: Pt,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ n(
              zn,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: Dt,
                setChapterRef: ke,
                className: "tw:p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Tw = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Wa = ce(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function pt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ms.Root,
    {
      ref: e,
      className: h("pr-twp", Wa(), t),
      ...r
    }
  );
}
function qo({
  className: t,
  ref: e,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ n(
    zr.Root,
    {
      className: h("pr-twp tw:grid tw:gap-2", t),
      ...r,
      ref: e,
      dir: o
    }
  );
}
function Jr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    zr.Item,
    {
      ref: e,
      className: h(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:shadow tw:focus:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(zr.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ n(sn, { className: "tw:h-3.5 tw:w-3.5 tw:fill-primary" }) })
    }
  );
}
function Ya(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Xr({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: i,
  popoverContentStyle: s,
  value: a,
  onChange: l = () => {
  },
  getOptionLabel: c = Ya,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: f = "",
  textPlaceholder: m = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: v = "start",
  isDisabled: b = !1,
  ariaLabel: x,
  ...y
}) {
  const [N, k] = S(!1), L = d ?? c, j = (D) => D.length > 0 && typeof D[0] == "object" && "options" in D[0], I = (D, C) => {
    const T = c(D), V = typeof D == "object" && "secondaryLabel" in D ? D.secondaryLabel : void 0, $ = `${C ?? ""}${T}${V ?? ""}`;
    return /* @__PURE__ */ u(
      Wt,
      {
        value: T,
        onSelect: () => {
          l(D), k(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ n(
            Ft,
            {
              className: h("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !a || c(a) !== T
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            T,
            V && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              V
            ] })
          ] })
        ]
      },
      $
    );
  };
  return /* @__PURE__ */ u(Yt, { open: N, onOpenChange: k, ...y, children: [
    /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ u(
      B,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": x,
        id: t,
        className: h(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ n("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ n(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: a ? L(a) : f
              }
            )
          ] }),
          /* @__PURE__ */ n(Pe, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(
      Jt,
      {
        align: v,
        className: h("tw:w-[200px] tw:p-0", i),
        style: s,
        children: /* @__PURE__ */ u(we, { children: [
          /* @__PURE__ */ n(Qe, { placeholder: m, className: "tw:text-inherit" }),
          /* @__PURE__ */ n(yr, { children: p }),
          /* @__PURE__ */ n(ue, { children: j(e) ? e.map((D) => /* @__PURE__ */ n(qt, { heading: D.groupHeading, children: D.options.map((C) => I(C, D.groupHeading)) }, D.groupHeading)) : e.map((D) => I(D)) })
        ] })
      }
    )
  ] });
}
function Ja({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: i = !1,
  chapterCount: s
}) {
  const a = F(
    () => Array.from({ length: s }, (d, w) => w + 1),
    [s]
  );
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ n(pt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ n(
      Xr,
      {
        isDisabled: i,
        onChange: (d) => {
          r(d), d > e && o(d);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: a,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ n(pt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ n(
      Xr,
      {
        isDisabled: i,
        onChange: (d) => {
          o(d), d < t && r(d);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: a,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Zr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Zr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Zr || (Zr = {}));
const Sw = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Rr = (t, e) => t[e] ?? e;
function Rw({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: i,
  endChapter: s,
  handleSelectEndChapter: a,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const w = Rr(d, "%webView_bookSelector_currentBook%"), f = Rr(d, "%webView_bookSelector_choose%"), m = Rr(d, "%webView_bookSelector_chooseBooks%"), [p, g] = S(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ n(
    qo,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(Jr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ n(pt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ n(pt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ n(
            Ja,
            {
              isDisabled: p === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: a,
              chapterCount: i,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(Jr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ n(pt, { className: "tw:ms-1", children: m })
          ] }),
          /* @__PURE__ */ n(pt, { className: "tw:flex tw:items-center", children: o.map((b) => ct.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ n(
            B,
            {
              disabled: p === "current book",
              onClick: () => r(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
const Wo = br(null);
function Xa(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Kt() {
  const t = an(Wo);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), i = new URLSearchParams();
    i.append("code", e);
    for (const s of r) i.append("v", s);
    throw o.search = i.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Za = Yo ? Rt : q, ir = { tag: ln };
function Qa({ initialConfig: t, children: e }) {
  const r = F(() => {
    const { theme: o, namespace: i, nodes: s, onError: a, editorState: l, html: c } = t, d = Xa(null, o), w = _o({ editable: t.editable, html: c, namespace: i, nodes: s, onError: (f) => a(f, w), theme: o });
    return function(f, m) {
      if (m !== null) {
        if (m === void 0) f.update(() => {
          const p = oe();
          if (p.isEmpty()) {
            const g = vr();
            p.append(g);
            const v = Yo ? document.activeElement : null;
            (At() !== null || v !== null && v === f.getRootElement()) && g.select();
          }
        }, ir);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const p = f.parseEditorState(m);
            f.setEditorState(p, ir);
            break;
          }
          case "object":
            f.setEditorState(m, ir);
            break;
          case "function":
            f.update(() => {
              oe().isEmpty() && m(f);
            }, ir);
        }
      }
    }(w, l), [w, d];
  }, []);
  return Za(() => {
    const o = t.editable, [i] = r;
    i.setEditable(o === void 0 || o);
  }, []), n(Wo.Provider, { value: r, children: e });
}
const tl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : q;
function el({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Kt();
  return tl(() => {
    if (r) return o.registerUpdateListener(({ editorState: i, dirtyElements: s, dirtyLeaves: a, prevEditorState: l, tags: c }) => {
      e && s.size === 0 && a.size === 0 || t && c.has(ln) || l.isEmpty() || r(i, o, c);
    });
  }, [o, t, e, r]), null;
}
const fn = {
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
  paragraph: "tw:outline-none",
  quote: "tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic",
  link: "tw:text-blue-600 tw:hover:underline tw:hover:cursor-pointer",
  list: {
    checklist: "tw:relative",
    listitem: "tw:mx-8",
    listitemChecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-none tw:line-through tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded tw:before:bg-primary tw:before:bg-no-repeat tw:after:content-[""] tw:after:cursor-pointer tw:after:border-white tw:after:border-solid tw:after:absolute tw:after:block tw:after:top-[6px] tw:after:w-[3px] tw:after:left-[7px] tw:after:right-[7px] tw:after:h-[6px] tw:after:rotate-45 tw:after:border-r-2 tw:after:border-b-2 tw:after:border-l-0 tw:after:border-t-0',
    listitemUnchecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-none tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded',
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
}, Nt = xr.Provider, _t = xr.Root;
function Tt({
  className: t,
  variant: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    xr.Trigger,
    {
      ref: r,
      className: e ? h(Ho({ variant: e }), t) : t,
      ...o
    }
  );
}
function kt({
  className: t,
  sideOffset: e = 4,
  style: r,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ n(
    xr.Content,
    {
      ref: o,
      sideOffset: e,
      style: { zIndex: Le, ...r },
      className: h(
        "pr-twp tw:overflow-hidden tw:rounded-md tw:bg-primary tw:px-3 tw:py-1.5 tw:text-xs tw:text-primary-foreground tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...i
    }
  );
}
const mn = [
  ua,
  ko,
  Co,
  pa
], rl = br(null), Dr = {
  didCatch: !1,
  error: null
};
class nl extends Rs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Dr;
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
      for (var r, o, i = arguments.length, s = new Array(i), a = 0; a < i; a++)
        s[a] = arguments[a];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Dr);
    }
  }
  componentDidCatch(e, r) {
    var o, i;
    (o = (i = this.props).onError) === null || o === void 0 || o.call(i, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: i
    } = this.props;
    if (o && r.error !== null && ol(e.resetKeys, i)) {
      var s, a;
      (s = (a = this.props).onReset) === null || s === void 0 || s.call(a, {
        next: i,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Dr);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: o,
      fallback: i
    } = this.props, {
      didCatch: s,
      error: a
    } = this.state;
    let l = e;
    if (s) {
      const c = {
        error: a,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        l = r(c);
      else if (o)
        l = An(o, c);
      else if (i !== void 0)
        l = i;
      else
        throw a;
    }
    return An(rl.Provider, {
      value: {
        didCatch: s,
        error: a,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function ol() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function il({ children: t, onError: e }) {
  return n(nl, { fallback: n("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const sl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : q;
function al(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function ll() {
  return function(t) {
    const [e] = Kt(), r = F(() => t(e), [e, t]), [o, i] = S(() => r.initialValueFn()), s = H(o);
    return sl(() => {
      const { initialValueFn: a, subscribe: l } = r, c = a();
      return s.current !== c && (s.current = c, i(c)), l((d) => {
        s.current = d, i(d);
      });
    }, [r, t]), o;
  }(al);
}
function cl(t, e, r = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Os(e) && o !== null) {
    const [i, s] = o, a = t.isBackward(), l = i.getNode(), c = s.getNode(), d = e.is(l), w = e.is(c);
    if (d || w) {
      const [f, m] = Is(t), p = l.is(c), g = e.is(a ? c : l), v = e.is(a ? l : c);
      let b, x = 0;
      p ? (x = f > m ? m : f, b = f > m ? f : m) : g ? (x = a ? m : f, b = void 0) : v && (x = 0, b = a ? f : m);
      const y = e.__text.slice(x, b);
      y !== e.__text && (r === "clone" && (e = As(e)), e.__text = y);
    }
  }
  return e;
}
function dl(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Jo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, wl = Jo && "documentMode" in document ? document.documentMode : null;
!(!Jo || !("InputEvent" in window) || wl) && "getTargetRanges" in new window.InputEvent("input");
function ul(t) {
  const e = Eo(t, (r) => ee(r) && !r.isInline());
  return ee(e) || dl(4, t.__key), e;
}
function pl(t) {
  const e = At();
  if (!xe(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let i = 0; i < o.length; i++) {
    const s = o[i], a = s.getKey();
    if (r.has(a)) continue;
    const l = Eo(s, (d) => ee(d) && !d.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !r.has(c) && (r.add(c), t(l));
  }
  return r.size > 0;
}
const fl = Symbol.for("preact-signals");
function Nr() {
  if (re > 1) return void re--;
  let t, e = !1;
  for (; ze !== void 0; ) {
    let r = ze;
    for (ze = void 0, Qr++; r !== void 0; ) {
      const o = r.o;
      if (r.o = void 0, r.f &= -3, !(8 & r.f) && Xo(r)) try {
        r.c();
      } catch (i) {
        e || (t = i, e = !0);
      }
      r = o;
    }
  }
  if (Qr = 0, re--, e) throw t;
}
function ml(t) {
  if (re > 0) return t();
  re++;
  try {
    return t();
  } finally {
    Nr();
  }
}
let X, ze;
function Un(t) {
  const e = X;
  X = void 0;
  try {
    return t();
  } finally {
    X = e;
  }
}
let re = 0, Qr = 0, cr = 0;
function Hn(t) {
  if (X === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== X ? (e = { i: 0, S: t, p: X.s, n: void 0, t: X, e: void 0, x: void 0, r: e }, X.s !== void 0 && (X.s.n = e), X.s = e, t.n = e, 32 & X.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = X.s, e.n = void 0, X.s.n = e, X.s = e), e) : void 0;
}
function xt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function qe(t, e) {
  return new xt(t, e);
}
function Xo(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function qn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Zo(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function me(t, e) {
  xt.call(this, void 0), this.x = t, this.s = void 0, this.g = cr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function hl(t, e) {
  return new me(t, e);
}
function Qo(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    re++;
    const r = X;
    X = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, hn(t), o;
    } finally {
      X = r, Nr();
    }
  }
}
function hn(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Qo(t);
}
function gl(t) {
  if (X !== this) throw new Error("Out-of-order effect");
  Zo(this), X = t, this.f &= -2, 8 & this.f && hn(this), Nr();
}
function Ee(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function se(t, e) {
  const r = new Ee(t, e);
  try {
    r.c();
  } catch (i) {
    throw r.d(), i;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function _r(t, e = {}) {
  const r = {};
  for (const o in t) {
    const i = e[o], s = qe(i === void 0 ? t[o] : i);
    r[o] = s;
  }
  return r;
}
xt.prototype.brand = fl, xt.prototype.h = function() {
  return !0;
}, xt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Un(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, xt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Un(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, xt.prototype.subscribe = function(t) {
  return se(() => {
    const e = this.value, r = X;
    X = void 0;
    try {
      t(e);
    } finally {
      X = r;
    }
  }, { name: "sub" });
}, xt.prototype.valueOf = function() {
  return this.value;
}, xt.prototype.toString = function() {
  return this.value + "";
}, xt.prototype.toJSON = function() {
  return this.value;
}, xt.prototype.peek = function() {
  const t = X;
  X = void 0;
  try {
    return this.value;
  } finally {
    X = t;
  }
}, Object.defineProperty(xt.prototype, "value", { get() {
  const t = Hn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Qr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, cr++, re++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Nr();
    }
  }
} }), me.prototype = new xt(), me.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === cr)) return !0;
  if (this.g = cr, this.f |= 1, this.i > 0 && !Xo(this)) return this.f &= -2, !0;
  const t = X;
  try {
    qn(this), X = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return X = t, Zo(this), this.f &= -2, !0;
}, me.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  xt.prototype.S.call(this, t);
}, me.prototype.U = function(t) {
  if (this.t !== void 0 && (xt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = Hn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ee.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ee.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Qo(this), qn(this), re++;
  const t = X;
  return X = this, gl.bind(this, t);
}, Ee.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = ze, ze = this);
}, Ee.prototype.d = function() {
  this.f |= 8, 1 & this.f || hn(this);
}, Ee.prototype.dispose = function() {
  this.d();
};
Bt({ build: (t, e, r) => _r(e), config: Ze({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return se(() => o.disabled.value ? void 0 : t.registerRootListener((i) => {
    t.focus(() => {
      const s = document.activeElement;
      i === null || s !== null && i.contains(s) || i.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ti() {
  const t = oe(), e = At(), r = vr();
  t.clear(), t.append(r), e !== null && r.select(), xe(e) && (e.format = 0);
}
function ei(t, e = ti) {
  return t.registerCommand(To, (r) => (t.update(e), !0), So);
}
Bt({ build: (t, e, r) => _r(e), config: Ze({ $onClear: ti }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return se(() => ei(t, o.value));
} });
function bl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Mr = Ps("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ri extends Ur {
  $config() {
    return this.config("decorator-text", { extends: Ur, stateConfigs: [{ flat: !0, stateConfig: Mr }] });
  }
  getFormat() {
    return qs(this, Mr);
  }
  getFormatFlags(e, r) {
    return $n(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Ws[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Ys(this, Mr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = $n(r, e, null);
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
function vl(t) {
  return t instanceof ri;
}
Bt({ name: "@lexical/extension/DecoratorText", nodes: () => [ri], register: (t, e, r) => t.registerCommand(Ro, (o) => {
  const i = At();
  if (Do(i) || xe(i)) for (const s of i.getNodes()) vl(s) && s.toggleFormat(o);
  return !1;
}, Mo) });
function ni(t, e) {
  let r;
  return qe(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const tn = Bt({ build: (t) => ni(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function oi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const i in o) r[i] = oi(r[i], o[i]);
    return t;
  }
  return e;
}
const gn = 0, en = 1, ii = 2, Or = 3, sr = 4, Ce = 5, Ir = 6, Fe = 7;
function Ar(t) {
  return t.id === gn;
}
function si(t) {
  return t.id === ii;
}
function xl(t) {
  return function(e) {
    return e.id === en;
  }(t) || et(305, String(t.id), String(en)), Object.assign(t, { id: ii });
}
const yl = /* @__PURE__ */ new Set();
class Nl {
  constructor(e, r) {
    vt(this, "builder");
    vt(this, "configs");
    vt(this, "_dependency");
    vt(this, "_peerNameSet");
    vt(this, "extension");
    vt(this, "state");
    vt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: gn };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : $s;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    si(r) || et(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, i = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, d) {
      return Object.assign(l, { config: c, id: Or, registerState: d });
    }(r, this.mergeConfigs(), o);
    let a;
    this.state = s, this.extension.init && (a = this.extension.init(e, s.config, o)), this.state = function(l, c, d) {
      return Object.assign(l, { id: sr, initResult: c, registerState: d });
    }(s, a, i);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== sr && et(307, String(r.id), String(Ce)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const i = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, a, l) {
      return Object.assign(s, { id: Ce, output: a, registerState: l });
    }(r, o, i);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Ce && et(308, String(o.id), String(Ce));
    const i = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Ir });
    }(o), () => {
      const s = this.state;
      s.id !== Fe && et(309, String(o.id), String(Fe)), this.state = function(a) {
        return Object.assign(a, { id: Ce });
      }(s), i && i();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Ir && et(310, String(r.id), String(Ir)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(i) {
      return Object.assign(i, { id: Fe });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= sr;
    }(e) || et(313, String(e.id), String(sr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Or;
    }(e) || et(314, String(e.id), String(Or)), { config: e.config };
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
      return r.id >= Fe;
    }(e) || et(316, String(e.id), String(Fe)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || yl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Ce;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Wn = { tag: ln };
function _l() {
  const t = oe();
  t.isEmpty() && t.append(vr());
}
const kl = Bt({ config: Ze({ setOptions: Wn, updateOptions: Wn }), init: ({ $initialEditorState: t = _l }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const i = o.getInitResult();
  if (!i.initialized) {
    i.initialized = !0;
    const { $initialEditorState: s } = i;
    if (Fs(s)) t.setEditorState(s, r);
    else if (typeof s == "function") t.update(() => {
      s(t);
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const a = t.parseEditorState(s);
      t.setEditorState(a, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [Vs, Co, Ls, js, ko] }), Yn = Symbol.for("@lexical/extension/LexicalBuilder");
function Jn() {
}
function Cl(t) {
  throw t;
}
function ar(t) {
  return Array.isArray(t) ? t : [t];
}
const $r = "0.41.0+prod.esm";
class Ue {
  constructor(e) {
    vt(this, "roots");
    vt(this, "extensionNameMap");
    vt(this, "outgoingConfigEdges");
    vt(this, "incomingEdges");
    vt(this, "conflicts");
    vt(this, "_sortedExtensionReps");
    vt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = $r, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [ar(kl)];
    for (const o of e) r.push(ar(o));
    return new Ue(r);
  }
  static maybeFromEditor(e) {
    const r = e[Yn];
    return r && (r.PACKAGE_VERSION !== $r && et(292, r.PACKAGE_VERSION, $r), r instanceof Ue || et(293)), r;
  }
  static fromEditor(e) {
    const r = Ue.maybeFromEditor(e);
    return r === void 0 && et(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), i = Object.assign(_o({ ...o, ...r ? { onError: (s) => {
      r(s, i);
    } } : {} }), { [Yn]: this });
    for (const s of this.sortedExtensionReps()) s.build(i);
    return i;
  }
  buildEditor() {
    let e = Jn;
    function r() {
      try {
        e();
      } finally {
        e = Jn;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = ie(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && et(295, e.name), r;
  }
  addEdge(e, r, o) {
    const i = this.outgoingConfigEdges.get(e);
    i ? i.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const s = this.incomingEdges.get(r);
    s ? s.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && et(296);
    const r = ar(e), [o] = r;
    typeof o.name != "string" && et(297, typeof o.name);
    let i = this.extensionNameMap.get(o.name);
    if (i !== void 0 && i.extension !== o && et(298, o.name), !i) {
      i = new Nl(this, o), this.extensionNameMap.set(o.name, i);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && et(299, o.name, s);
      for (const a of o.conflictsWith || []) this.extensionNameMap.has(a) && et(299, o.name, a), this.conflicts.set(a, o.name);
      for (const a of o.dependencies || []) {
        const l = ar(a);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [a, l] of o.peerDependencies || []) this.addEdge(o.name, a, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, i) => {
      let s = o.state;
      if (si(s)) return;
      const a = o.extension.name;
      var l;
      Ar(s) || et(300, a, i || "[unknown]"), Ar(l = s) || et(304, String(l.id), String(gn)), s = Object.assign(l, { id: en }), o.state = s;
      const c = this.outgoingConfigEdges.get(a);
      if (c) for (const d of c.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, a);
      }
      s = xl(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Ar(o.state) && r(o);
    for (const o of e) for (const [i, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const a = this.extensionNameMap.get(i);
      if (a) for (const l of s) a.configs.add(l);
    }
    for (const [o, ...i] of this.roots) if (i.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && et(301, o.name);
      for (const a of i) s.configs.add(a);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), i = [() => o.abort()], s = o.signal;
    for (const a of r) {
      const l = a.register(e, s);
      l && i.push(l);
    }
    for (const a of r) {
      const l = a.afterRegistration(e);
      l && i.push(l);
    }
    return ie(...i);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = {}, a = {}, l = this.sortedExtensionReps();
    for (const w of l) {
      const { extension: f } = w;
      if (f.onError !== void 0 && (e.onError = f.onError), f.disableEvents !== void 0 && (e.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (e.parentEditor = f.parentEditor), f.editable !== void 0 && (e.editable = f.editable), f.namespace !== void 0 && (e.namespace = f.namespace), f.$initialEditorState !== void 0 && (e.$initialEditorState = f.$initialEditorState), f.nodes) for (const m of bl(f)) {
        if (typeof m != "function") {
          const p = o.get(m.replace);
          p && et(302, f.name, m.replace.name, p.extension.name), o.set(m.replace, w);
        }
        r.add(m);
      }
      if (f.html) {
        if (f.html.export) for (const [m, p] of f.html.export.entries()) i.set(m, p);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && oi(a, f.theme);
    }
    Object.keys(a).length > 0 && (e.theme = a), r.size && (e.nodes = [...r]);
    const c = Object.keys(s).length > 0, d = i.size > 0;
    (c || d) && (e.html = {}, c && (e.html.import = s), d && (e.html.export = i));
    for (const w of l) w.init(e);
    return e.onError || (e.onError = Cl), e;
  }
}
const El = /* @__PURE__ */ new Set(), Xn = Bt({ build(t, e, r) {
  const o = r.getDependency(tn).output, i = qe({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ni(() => {
  }, () => se(() => {
    const a = s.peek(), { watchedNodeKeys: l } = i.value;
    let c, d = !1;
    o.value.read(() => {
      if (At()) for (const [w, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(w);
          continue;
        }
        const m = Xs(w), p = m && m.isSelected() || !1;
        d = d || p !== (!!a && a.has(w)), p && (c = c || /* @__PURE__ */ new Set(), c.add(w));
      }
    }), !d && c && a && c.size === a.size || (s.value = c);
  }));
  return { watchNodeKey: function(a) {
    const l = hl(() => (s.value || El).has(a)), { watchedNodeKeys: c } = i.peek();
    let d = c.get(a);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(l), w || (c.set(a, d), i.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [tn], name: "@lexical/extension/NodeSelection" });
Bs("INSERT_HORIZONTAL_RULE_COMMAND");
class De extends Ur {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new De(e.__key);
  }
  static importJSON(e) {
    return ai().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Tl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Oo(r, e.theme.hr), r;
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
function Tl() {
  return { node: ai() };
}
function ai() {
  return Js(De);
}
function Sl(t) {
  return t instanceof De;
}
Bt({ dependencies: [tn, Xn], name: "@lexical/extension/HorizontalRule", nodes: () => [De], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Xn).output, i = qe({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return ie(t.registerCommand(Ks, (a) => {
    if (Gs(a.target)) {
      const l = zs(a.target);
      if (Sl(l)) return function(c, d = !1) {
        const w = At(), f = c.isSelected(), m = c.getKey();
        let p;
        d && Do(w) ? p = w : (p = Us(), Hs(p)), f ? p.delete(m) : p.add(m);
      }(l, a.shiftKey), !0;
    }
    return !1;
  }, Mo), t.registerMutationListener(De, (a, l) => {
    ml(() => {
      let c = !1;
      const { nodeSelections: d } = i.peek();
      for (const [w, f] of a.entries()) if (f === "destroyed") d.delete(w), c = !0;
      else {
        const m = d.get(w), p = t.getElementByKey(w);
        m ? m.domNode.value = p : (c = !0, d.set(w, { domNode: qe(p), selectedSignal: o(w) }));
      }
      c && (i.value = { nodeSelections: d });
    });
  }), se(() => {
    const a = [];
    for (const { domNode: l, selectedSignal: c } of i.value.nodeSelections.values()) a.push(se(() => {
      const d = l.value;
      d && (c.value ? Oo(d, s) : Zs(d, s));
    }));
    return ie(...a);
  }));
} });
function li(t) {
  return t.canBeEmpty();
}
function Rl(t, e, r = li) {
  return ie(t.registerCommand(Qs, (o) => {
    const i = At();
    if (!xe(i)) return !1;
    o.preventDefault();
    const s = function(a) {
      if (a.getNodes().filter((m) => ur(m) && m.canIndent()).length > 0) return !0;
      const l = a.anchor, c = a.focus, d = c.isBefore(l) ? c : l, w = d.getNode(), f = ul(w);
      if (f.canIndent()) {
        const m = f.getKey();
        let p = ta();
        if (p.anchor.set(m, 0, "element"), p.focus.set(m, 0, "element"), p = ea(p), p.anchor.is(d)) return !0;
      }
      return !1;
    }(i) ? o.shiftKey ? ra : Pn : na;
    return t.dispatchCommand(s, void 0);
  }, So), t.registerCommand(Pn, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, i = At();
    if (!xe(i)) return !1;
    const s = typeof r == "function" ? r : r.peek();
    return pl((a) => {
      if (s(a)) {
        const l = a.getIndent() + 1;
        (!o || l < o) && a.setIndent(l);
      }
    });
  }, cn));
}
Bt({ build: (t, e, r) => _r(e), config: Ze({ $canIndent: li, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: i, $canIndent: s } = r.getOutput();
  return se(() => {
    if (!o.value) return Rl(t, i, s);
  });
} });
const Dl = Bt({ name: "@lexical/react/ReactProvider" });
function Ml() {
  return oe().getTextContent();
}
function Ol(t, e = !0) {
  if (t) return !1;
  let r = Ml();
  return e && (r = r.trim()), r === "";
}
function Il(t) {
  if (!Ol(t, !1)) return !1;
  const e = oe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const i = e[o];
    if (oa(i)) return !1;
    if (ee(i)) {
      if (!ia(i) || i.__indent !== 0) return !1;
      const s = i.getChildren(), a = s.length;
      for (let l = 0; l < a; l++) {
        const c = s[o];
        if (!pr(c)) return !1;
      }
    }
  }
  return !0;
}
function ci(t) {
  return () => Il(t);
}
function di(t) {
  const e = window.location.origin, r = (o) => {
    if (o.origin !== e) return;
    const i = t.getRootElement();
    if (document.activeElement !== i) return;
    const s = o.data;
    if (typeof s == "string") {
      let a;
      try {
        a = JSON.parse(s);
      } catch {
        return;
      }
      if (a && a.protocol === "nuanria_messaging" && a.type === "request") {
        const l = a.payload;
        if (l && l.functionId === "makeChanges") {
          const c = l.args;
          if (c) {
            const [d, w, f, m, p] = c;
            t.update(() => {
              const g = At();
              if (xe(g)) {
                const v = g.anchor;
                let b = v.getNode(), x = 0, y = 0;
                if (pr(b) && d >= 0 && w >= 0 && (x = d, y = d + w, g.setTextNodeRange(b, x, b, y)), x === y && f === "" || (g.insertRawText(f), b = v.getNode()), pr(b)) {
                  x = m, y = m + p;
                  const N = b.getTextContentSize();
                  x = x > N ? N : x, y = y > N ? N : y, g.setTextNodeRange(b, x, b, y);
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
Bt({ build: (t, e, r) => _r(e), config: Ze({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => se(() => r.getOutput().disabled.value ? void 0 : di(t)) });
function Al(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const bn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : q;
function $l({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [i, s] = S(() => r.getDecorators());
    return bn(() => r.registerDecoratorListener((a) => {
      ma(() => {
        s(a);
      });
    }), [r]), q(() => {
      s(r.getDecorators());
    }, [r]), F(() => {
      const a = [], l = Object.keys(i);
      for (let c = 0; c < l.length; c++) {
        const d = l[c], w = n(o, { onError: (m) => r._onError(m), children: n(Ds, { fallback: null, children: i[d] }) }), f = r.getElementByKey(d);
        f !== null && a.push(ha(w, f, d));
      }
      return a;
    }, [o, i, r]);
  }(t, e);
}
function Pl({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Ue.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Dl.name)) {
      for (const i of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(i) && Al(320, i);
      return !0;
    }
    return !1;
  }(t) ? null : n($l, { editor: t, ErrorBoundary: e });
}
function Zn(t) {
  return t.getEditorState().read(ci(t.isComposing()));
}
function Vl({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Kt();
  return function(i) {
    bn(() => ie(fa(i), di(i)), [i]);
  }(o), u(it, { children: [t, n(Ll, { content: e }), n(Pl, { editor: o, ErrorBoundary: r })] });
}
function Ll({ content: t }) {
  const [e] = Kt(), r = function(i) {
    const [s, a] = S(() => Zn(i));
    return bn(() => {
      function l() {
        const c = Zn(i);
        a(c);
      }
      return l(), ie(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), s;
  }(e), o = ll();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function jl({ defaultSelection: t }) {
  const [e] = Kt();
  return q(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Fl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : q;
function Bl({ onClear: t }) {
  const [e] = Kt();
  return Fl(() => ei(e, t), [e, t]), null;
}
const wi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : q;
function Kl({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: i, ariaErrorMessage: s, ariaExpanded: a, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: f, ariaRequired: m, autoCapitalize: p, className: g, id: v, role: b = "textbox", spellCheck: x = !0, style: y, tabIndex: N, "data-testid": k, ...L }, j) {
  const [I, D] = S(t.isEditable()), C = K((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), T = F(() => /* @__PURE__ */ function(...V) {
    return ($) => {
      for (const O of V) typeof O == "function" ? O($) : O != null && (O.current = $);
    };
  }(j, C), [C, j]);
  return wi(() => (D(t.isEditable()), t.registerEditableListener((V) => {
    D(V);
  })), [t]), n("div", { "aria-activedescendant": I ? e : void 0, "aria-autocomplete": I ? r : "none", "aria-controls": I ? o : void 0, "aria-describedby": i, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": I && b === "combobox" ? !!a : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": d, "aria-multiline": w, "aria-owns": I ? f : void 0, "aria-readonly": !I || void 0, "aria-required": m, autoCapitalize: p, className: g, contentEditable: I, "data-testid": k, id: v, ref: T, role: b, spellCheck: x, style: y, tabIndex: N, ...L });
}
const Gl = Xe(Kl);
function Qn(t) {
  return t.getEditorState().read(ci(t.isComposing()));
}
const zl = Xe(Ul);
function Ul(t, e) {
  const { placeholder: r, ...o } = t, [i] = Kt();
  return u(it, { children: [n(Gl, { editor: i, ...o, ref: e }), r != null && n(Hl, { editor: i, content: r })] });
}
function Hl({ content: t, editor: e }) {
  const r = function(a) {
    const [l, c] = S(() => Qn(a));
    return wi(() => {
      function d() {
        const w = Qn(a);
        c(w);
      }
      return d(), ie(a.registerUpdateListener(() => {
        d();
      }), a.registerEditableListener(() => {
        d();
      }));
    }, [a]), l;
  }(e), [o, i] = S(e.isEditable());
  if (Rt(() => (i(e.isEditable()), e.registerEditableListener((a) => {
    i(a);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : n("div", { "aria-hidden": !0, children: s });
}
function ql({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ n(
    zl,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-none",
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
const ui = br(void 0);
function Wl({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: i,
  children: s
}) {
  const a = F(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: i
    }),
    [t, e, r, o, i]
  );
  return /* @__PURE__ */ n(ui.Provider, { value: a, children: s });
}
function pi() {
  const t = an(ui);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Yl() {
  const [t, e] = S(void 0), r = K(() => {
    e(void 0);
  }, []), o = F(() => {
    if (t === void 0)
      return;
    const { title: s, content: a } = t;
    return /* @__PURE__ */ n($a, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(La, { children: [
      /* @__PURE__ */ n(ja, { children: /* @__PURE__ */ n(Fa, { children: s }) }),
      a
    ] }) });
  }, [t, r]), i = K(
    (s, a, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: a(r),
        title: s
      });
    },
    [r]
  );
  return [o, i];
}
function Jl({
  children: t
}) {
  const [e] = Kt(), [r, o] = S(e), [i, s] = S("paragraph"), [a, l] = Yl(), c = () => {
  };
  return q(() => r.registerCommand(
    Io,
    (d, w) => (o(w), !1),
    cn
  ), [r]), /* @__PURE__ */ u(
    Wl,
    {
      activeEditor: r,
      $updateToolbar: c,
      blockType: i,
      setBlockType: s,
      showModal: l,
      children: [
        a,
        t({ blockType: i })
      ]
    }
  );
}
function Xl(t) {
  const [e] = Kt(), { activeEditor: r } = pi();
  q(() => r.registerCommand(
    Io,
    () => {
      const o = At();
      return o && t(o), !1;
    },
    cn
  ), [e, t]), q(() => {
    r.getEditorState().read(() => {
      const o = At();
      o && t(o);
    });
  }, [r, t]);
}
const Zl = ce(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:hover:bg-muted tw:hover:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=on]:bg-accent tw:data-[state=on]:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground"
      },
      size: {
        default: "tw:h-9 tw:px-2 tw:min-w-9",
        sm: "tw:h-8 tw:px-1.5 tw:min-w-8",
        lg: "tw:h-10 tw:px-2.5 tw:min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), fi = Q.createContext({
  size: "default",
  variant: "default"
});
function mi({
  className: t,
  variant: e,
  size: r,
  children: o,
  ref: i,
  ...s
}) {
  const a = dt();
  return /* @__PURE__ */ n(
    Po.Root,
    {
      ref: i,
      className: h("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...s,
      dir: a,
      children: /* @__PURE__ */ n(
        fi.Provider,
        {
          value: { variant: e, size: r },
          children: o
        }
      )
    }
  );
}
function dr({
  className: t,
  children: e,
  variant: r,
  size: o,
  ref: i,
  ...s
}) {
  const a = Q.useContext(fi);
  return /* @__PURE__ */ n(
    Po.Item,
    {
      ref: i,
      className: h(
        Zl({
          variant: a.variant || r,
          size: a.size || o
        }),
        t
      ),
      ...s,
      children: e
    }
  );
}
const to = [
  { format: "bold", icon: Fi, label: "Bold" },
  { format: "italic", icon: Bi, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Ql() {
  const { activeEditor: t } = pi(), [e, r] = S([]), o = K((i) => {
    if (xe(i) || ga(i)) {
      const s = [];
      to.forEach(({ format: a }) => {
        i.hasFormat(a) && s.push(a);
      }), r((a) => a.length !== s.length || !s.every((l) => a.includes(l)) ? s : a);
    }
  }, []);
  return Xl(o), /* @__PURE__ */ n(
    mi,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: to.map(({ format: i, icon: s, label: a }) => /* @__PURE__ */ n(
        dr,
        {
          value: i,
          "aria-label": a,
          onClick: () => {
            t.dispatchCommand(Ro, i);
          },
          children: /* @__PURE__ */ n(s, { className: "tw:h-4 tw:w-4" })
        },
        i
      ))
    }
  );
}
function tc({ onClear: t }) {
  const [e] = Kt();
  q(() => {
    t && t(() => {
      e.dispatchCommand(To, void 0);
    });
  }, [e, t]);
}
function ec({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = S(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ n(Jl, { children: () => /* @__PURE__ */ n("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ n(Ql, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ n(
        Vl,
        {
          contentEditable: /* @__PURE__ */ n("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ n(ql, { placeholder: t }) }),
          ErrorBoundary: il
        }
      ),
      e && /* @__PURE__ */ n(jl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ n(tc, { onClear: r }),
      /* @__PURE__ */ n(Bl, {})
    ] })
  ] });
}
const rc = {
  namespace: "commentEditor",
  theme: fn,
  nodes: mn,
  onError: (t) => {
    console.error(t);
  }
};
function fr({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: i = "Start typing…",
  autoFocus: s = !1,
  onClear: a,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ n(
      "div",
      {
        className: h(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ n(
          Qa,
          {
            initialConfig: {
              ...rc,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(Nt, { children: [
              /* @__PURE__ */ n(ec, { placeholder: i, autoFocus: s, onClear: a }),
              /* @__PURE__ */ n(
                el,
                {
                  ignoreSelectionChange: !0,
                  onChange: (c) => {
                    r == null || r(c), o == null || o(c.toJSON());
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
function nc(t, e) {
  const r = la(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const i = [];
  for (const s of r) if (!gi.has(s.nodeName)) {
    const a = bi(s, t, i, !1);
    a !== null && (o = o.concat(a));
  }
  return function(s) {
    for (const a of s) a.getNextSibling() instanceof Ao && a.insertAfter($o());
    for (const a of s) {
      const l = a.getChildren();
      for (const c of l) a.insertBefore(c);
      a.remove();
    }
  }(i), o;
}
function oc(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), o = oe().getChildren();
  for (let i = 0; i < o.length; i++)
    hi(t, o[i], r, e);
  return r.innerHTML;
}
function hi(t, e, r, o = null) {
  let i = o === null || e.isSelected(o);
  const s = ee(e) && e.excludeFromCopy("html");
  let a = e;
  o !== null && pr(e) && (a = cl(o, e, "clone"));
  const l = ee(a) ? a.getChildren() : [], c = sa(t, a.getType());
  let d;
  d = c && c.exportDOM !== void 0 ? c.exportDOM(t, a) : a.exportDOM(t);
  const { element: w, after: f } = d;
  if (!w) return !1;
  const m = document.createDocumentFragment();
  for (let p = 0; p < l.length; p++) {
    const g = l[p], v = hi(t, g, m, o);
    !i && ee(e) && v && e.extractWithChild(g, o, "html") && (i = !0);
  }
  if (i && !s) {
    if ((aa(w) || Vn(w)) && w.append(m), r.append(w), f) {
      const p = f.call(a, w);
      p && (Vn(w) ? w.replaceChildren(p) : w.replaceWith(p));
    }
  } else r.append(m);
  return i;
}
const gi = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function bi(t, e, r, o, i = /* @__PURE__ */ new Map(), s) {
  let a = [];
  if (gi.has(t.nodeName)) return a;
  let l = null;
  const c = function(g, v) {
    const { nodeName: b } = g, x = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (x !== void 0) for (const N of x) {
      const k = N(g);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(t, e), d = c ? c(t) : null;
  let w = null;
  if (d !== null) {
    w = d.after;
    const g = d.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of i) if (l = v(l, s), !l) break;
      l && a.push(...Array.isArray(g) ? g : [l]);
    }
    d.forChild != null && i.set(t.nodeName, d.forChild);
  }
  const f = t.childNodes;
  let m = [];
  const p = (l == null || !ca(l)) && (l != null && ur(l) || o);
  for (let g = 0; g < f.length; g++) m.push(...bi(f[g], e, r, p, new Map(i), l));
  return w != null && (m = w(m)), Ln(t) && (m = ic(t, m, p ? () => {
    const g = new Ao();
    return r.push(g), g;
  } : vr)), l == null ? m.length > 0 ? a = a.concat(m) : Ln(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : jn(g.nextSibling) && jn(g.previousSibling);
  }(t) && (a = a.concat($o())) : ee(l) && l.append(...m), a;
}
function ic(t, e, r) {
  const o = t.style.textAlign, i = [];
  let s = [];
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (ur(l)) o && !l.getFormat() && l.setFormat(o), i.push(l);
    else if (s.push(l), a === e.length - 1 || a < e.length - 1 && ur(e[a + 1])) {
      const c = r();
      c.setFormat(o), c.append(...s), i.push(c), s = [];
    }
  }
  return i;
}
function vi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function xi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : xi(e.children)
  ) : !1;
}
function It(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? xi(t.root.children) : !1;
}
function sc(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Vo({
    namespace: "EditorUtils",
    theme: fn,
    nodes: mn,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const i = new DOMParser().parseFromString(t, "text/html"), s = nc(e, i);
      oe().clear(), da(s);
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
function mr(t) {
  const e = Vo({
    namespace: "EditorUtils",
    theme: fn,
    nodes: mn,
    onError: (i) => {
      console.error(i);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = oc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function vn(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function wr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function xn(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const ac = {
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
function Pr(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Dw({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o
}) {
  const [i, s] = S(ac), [a, l] = S(void 0), [c, d] = S(!1), w = H(void 0), f = H(null);
  q(() => {
    let x = !0;
    const y = f.current;
    if (!y) return;
    const N = setTimeout(() => {
      x && vi(y);
    }, 300);
    return () => {
      x = !1, clearTimeout(N);
    };
  }, []);
  const m = K(() => {
    if (!It(i)) return;
    const x = mr(i);
    e(x, a);
  }, [i, e, a]), p = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ n("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-2", children: [
        /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
          /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(B, { onClick: r, className: "tw:h-6 tw:w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ n($e, {}) }) }),
          /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
          /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(
            B,
            {
              onClick: m,
              className: "tw:h-6 tw:w-6",
              size: "icon",
              variant: "default",
              disabled: !It(i),
              children: /* @__PURE__ */ n(Ft, {})
            }
          ) }),
          /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(Yt, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ u(
        B,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ n(fo, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { children: Pr(a !== void 0 ? a : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ n(
        Jt,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), d(!1));
          },
          children: /* @__PURE__ */ n(we, { children: /* @__PURE__ */ n(ue, { children: t.map((x) => /* @__PURE__ */ n(
            Wt,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), d(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ n("span", { children: Pr(x, o) })
            },
            x || "unassigned"
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
        className: "tw:outline-none",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), r()) : xn(x) && (x.preventDefault(), x.stopPropagation(), It(i) && m());
        },
        onKeyDown: (x) => {
          vn(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ n(
          fr,
          {
            editorSerializedState: i,
            onSerializedChange: (x) => s(x),
            placeholder: p,
            onClear: (x) => {
              w.current = x;
            }
          }
        )
      }
    )
  ] });
}
const Mw = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Ow = [
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
], lc = ["input", "select", "textarea", "button"], cc = ["button", "textbox"], dc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const i = H(null), [s, a] = S(void 0), [l, c] = S(void 0), d = K(
    (p) => {
      a(p);
      const g = t.find((b) => b.id === p);
      g && (e == null || e(g));
      const v = document.getElementById(p);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), i.current && i.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), w = K(
    (p) => {
      const g = t.find((v) => v.id === p);
      g && (c((v) => v === p ? void 0 : p), r == null || r(g));
    },
    [r, t]
  ), f = (p) => {
    if (!p) return !1;
    const g = p.tagName.toLowerCase();
    if (p.isContentEditable || lc.includes(g)) return !0;
    const v = p.getAttribute("role");
    if (v && cc.includes(v)) return !0;
    const b = p.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, m = K(
    (p) => {
      var I;
      const g = p.target, v = (D) => D ? document.getElementById(D) : void 0, b = v(l), x = v(s);
      if (!!(b && g && b.contains(g) && g !== b) && f(g)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const D = t.find((C) => C.id === l);
            D && d(D.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!b) return;
          const D = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const C = D.findIndex((V) => V === g);
          if (C === -1) return;
          let T;
          p.key === "ArrowDown" ? T = Math.min(C + 1, D.length - 1) : T = Math.max(C - 1, 0), T !== C && (p.preventDefault(), p.stopPropagation(), (I = D[T]) == null || I.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((D) => D.id === s);
      let L = k;
      switch (p.key) {
        case "ArrowDown":
          L = Math.min(k + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(k - 1, 0), p.preventDefault();
          break;
        case "Home":
          L = 0, p.preventDefault();
          break;
        case "End":
          L = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const D = x;
          if (D) {
            const C = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = C ?? T;
            if (V) {
              p.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (f(g) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const j = t[L];
      j && d(j.id);
    },
    [t, d, s, l, w, o]
  );
  return {
    listboxRef: i,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: m,
    /** Focus an option by its ID */
    focusOption: d
  };
}, wc = ce(
  "pr-twp tw:inline-flex tw:items-center tw:rounded-md tw:border tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/80",
        secondary: "tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80",
        muted: "tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        destructive: "tw:border-transparent tw:bg-destructive tw:text-destructive-foreground tw:shadow tw:hover:bg-destructive/80",
        outline: "tw:text-foreground",
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
function We({
  className: t,
  variant: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n("div", { ref: r, className: h("pr-twp", wc({ variant: e }), t), ...o });
}
function uc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      className: h(
        "pr-twp tw:rounded-xl tw:border tw:bg-card tw:text-card-foreground tw:shadow",
        t
      ),
      ...r
    }
  );
}
function Iw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      className: h("pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6", t),
      ...r
    }
  );
}
function Aw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "h3",
    {
      ref: e,
      className: h("pr-twp tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r,
      children: r.children
    }
  );
}
function $w({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "p",
    {
      ref: e,
      className: h("pr-twp tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function pc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("div", { ref: e, className: h("pr-twp tw:p-6 tw:pt-0", t), ...r });
}
function Pw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      className: h("pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0", t),
      ...r
    }
  );
}
function Ye({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ n(
    ba.Root,
    {
      ref: o,
      decorative: r,
      orientation: e,
      className: h(
        "pr-twp tw:shrink-0 tw:bg-border",
        e === "horizontal" ? "tw:h-[1px] tw:w-full" : "tw:h-full tw:w-[1px]",
        t
      ),
      ...i
    }
  );
}
function fc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    dn.Root,
    {
      ref: e,
      className: h(
        "pr-twp tw:relative tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:overflow-hidden tw:rounded-full",
        t
      ),
      ...r
    }
  );
}
function Vw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    dn.Image,
    {
      ref: e,
      className: h("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...r
    }
  );
}
function mc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    dn.Fallback,
    {
      ref: e,
      className: h(
        "pr-twp tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted",
        t
      ),
      ...r
    }
  );
}
const yn = br(void 0);
function Xt() {
  const t = an(yn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const _e = ce("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ye = ft.Trigger, yi = ft.Group, hc = ft.Portal, gc = ft.Sub, bc = ft.RadioGroup;
function ae({ variant: t = "default", ...e }) {
  const r = Q.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(yn.Provider, { value: r, children: /* @__PURE__ */ n(ft.Root, { ...e }) });
}
function vc({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...i
}) {
  const s = Xt();
  return /* @__PURE__ */ u(
    ft.SubTrigger,
    {
      ref: o,
      className: h(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:data-[state=open]:bg-accent tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        _e({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...i,
      children: [
        r,
        /* @__PURE__ */ n(Re, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function xc({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  const i = dt();
  return /* @__PURE__ */ n(
    ft.SubContent,
    {
      ref: r,
      className: h(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: i, children: e })
    }
  );
}
function le({
  className: t,
  sideOffset: e = 4,
  children: r,
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ n(ft.Portal, { children: /* @__PURE__ */ n(
    ft.Content,
    {
      ref: o,
      sideOffset: e,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...i,
      children: /* @__PURE__ */ n("div", { dir: s, children: r })
    }
  ) });
}
function rn({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  const i = dt(), s = Xt();
  return /* @__PURE__ */ n(
    ft.Item,
    {
      ref: r,
      className: h(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        _e({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: i
    }
  );
}
function ne({
  className: t,
  children: e,
  checked: r,
  ref: o,
  ...i
}) {
  const s = dt(), a = Xt();
  return /* @__PURE__ */ u(
    ft.CheckboxItem,
    {
      ref: o,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        _e({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...i,
      dir: s,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ n(ft.ItemIndicator, { children: /* @__PURE__ */ n(Ft, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function yc({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  const i = dt(), s = Xt();
  return /* @__PURE__ */ u(
    ft.RadioItem,
    {
      ref: r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        _e({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ n(ft.ItemIndicator, { children: /* @__PURE__ */ n(sn, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function kr({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    ft.Label,
    {
      ref: r,
      className: h("tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold", e && "tw:pl-8", t),
      ...o
    }
  );
}
function tr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    ft.Separator,
    {
      ref: e,
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function Lw({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: h("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function eo({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: i,
  handleDeleteComment: s,
  onEditingChange: a,
  canEditOrDelete: l = !1
}) {
  const [c, d] = S(!1), [w, f] = S(), m = H(null);
  q(() => {
    if (!c) return;
    let k = !0;
    const L = m.current;
    if (!L) return;
    const j = setTimeout(() => {
      k && vi(L);
    }, 300);
    return () => {
      k = !1, clearTimeout(j);
    };
  }, [c]);
  const p = K(
    (k) => {
      k && k.stopPropagation(), d(!1), f(void 0), a == null || a(!1);
    },
    [a]
  ), g = K(
    async (k) => {
      if (k && k.stopPropagation(), !w || !i) return;
      await i(
        t.id,
        mr(w)
      ) && (d(!1), f(void 0), a == null || a(!1));
    },
    [w, i, t.id, a]
  ), v = F(() => {
    const k = new Date(t.date), L = Ns(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), j = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ge(r["%comment_dateAtTime%"], {
      date: L,
      time: j
    });
  }, [t.date, r]), b = F(() => t.user, [t.user]), x = F(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = F(() => _s(t.contents), [t.contents]), N = F(() => {
    if (o && l)
      return /* @__PURE__ */ u(it, { children: [
        /* @__PURE__ */ u(
          rn,
          {
            onClick: (k) => {
              k.stopPropagation(), d(!0), f(sc(t.contents)), a == null || a(!0);
            },
            children: [
              /* @__PURE__ */ n(Ki, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          rn,
          {
            onClick: async (k) => {
              k.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ n(Gi, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
    s,
    a
  ]);
  return /* @__PURE__ */ u(
    "div",
    {
      className: h("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ n(fc, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ n(mc, { className: "tw:text-xs tw:font-medium", children: x }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ n("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ n("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: v }),
            /* @__PURE__ */ n("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(We, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              wr(t.assignedUser, r)
            ] })
          ] }),
          c && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: m,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), p()) : xn(k) && (k.preventDefault(), k.stopPropagation(), It(w) && g());
              },
              onKeyDown: (k) => {
                vn(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ n(
                  fr,
                  {
                    className: h(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: w,
                    onSerializedChange: (k) => f(k)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ n(
                    B,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ n($e, {})
                    }
                  ),
                  /* @__PURE__ */ n(
                    B,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !It(w),
                      children: /* @__PURE__ */ n(mo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ u(it, { children: [
            t.status === "Resolved" && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ n(
              "div",
              {
                className: h(
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
        N && /* @__PURE__ */ u(ae, { children: [
          /* @__PURE__ */ n(ye, { asChild: !0, children: /* @__PURE__ */ n(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ n(zi, {}) }) }),
          /* @__PURE__ */ n(le, { align: "end", children: N })
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
function Nc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: i,
  assignedUser: s,
  currentUser: a,
  handleSelectThread: l,
  threadId: c,
  thread: d,
  threadStatus: w,
  handleAddCommentToThread: f,
  handleUpdateComment: m,
  handleDeleteComment: p,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: N,
  isRead: k = !1,
  autoReadDelay: L = 5,
  onVerseRefClick: j
}) {
  const [I, D] = S(ro), [C, T] = S(
    void 0
  ), V = o, [$, O] = S(!1), [A, Y] = S(!1), [M, J] = S(!1), [Ct, Dt] = S(!1), [St, ut] = S(!1), [lt, G] = S(k), [rt, nt] = S(!1), st = H(void 0), [bt, Gt] = S(/* @__PURE__ */ new Map());
  q(() => {
    let E = !0;
    return (async () => {
      const wt = y ? await y(c) : !1;
      E && ut(wt);
    })(), () => {
      E = !1;
    };
  }, [c, y]), q(() => {
    let E = !0;
    if (!o) {
      Dt(!1), Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const wt = x ? await x(c) : !1;
      E && Dt(wt);
    })(), () => {
      E = !1;
    };
  }, [o, c, x]);
  const Pt = F(() => e.filter((E) => !E.deleted), [e]);
  q(() => {
    let E = !0;
    if (!o || !N) {
      Gt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const wt = /* @__PURE__ */ new Map();
      await Promise.all(
        Pt.map(async (Sn) => {
          const $i = await N(Sn.id);
          E && wt.set(Sn.id, $i);
        })
      ), E && Gt(wt);
    })(), () => {
      E = !1;
    };
  }, [o, Pt, N]);
  const zt = F(() => Pt[0], [Pt]), ke = H(null), Zt = H(void 0), Ut = K(() => {
    var E;
    (E = Zt.current) == null || E.call(Zt), D(ro);
  }, []), je = K(() => {
    const E = !lt;
    G(E), nt(!E), g == null || g(c, E);
  }, [lt, g, c]);
  q(() => {
    O(!1);
  }, [o]), q(() => {
    if (o && !lt && !rt) {
      const E = setTimeout(() => {
        G(!0), g == null || g(c, !0);
      }, L * 1e3);
      return st.current = E, () => clearTimeout(E);
    }
    st.current && (clearTimeout(st.current), st.current = void 0);
  }, [o, lt, rt, L, c, g]);
  const R = F(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), _ = F(() => {
    if (s === void 0)
      return;
    if (s === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = wr(s, r);
    return ge(r["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [s, r]), P = F(() => Pt.slice(1), [Pt]), z = F(() => P.length ?? 0, [P.length]), U = F(() => z > 0, [z]), ot = F(() => $ || z <= 2 ? P : P.slice(-2), [P, z, $]), tt = F(() => $ || z <= 2 ? 0 : z - 2, [z, $]), ht = F(
    () => z === 1 ? R.singleReply : ge(R.multipleReplies, { count: z }),
    [z, R]
  ), at = F(
    () => tt === 1 ? R.singleReply : ge(R.multipleReplies, { count: tt }),
    [tt, R]
  );
  q(() => {
    !o && A && U && Y(!1);
  }, [o, A, U]);
  const Et = K(
    async (E) => {
      E && E.stopPropagation();
      const gt = It(I) ? mr(I) : void 0;
      if (C !== void 0) {
        await f({
          threadId: c,
          contents: gt,
          assignedUser: C
        }) && (T(void 0), gt && Ut());
        return;
      }
      gt && await f({ threadId: c, contents: gt }) && Ut();
    },
    [
      Ut,
      I,
      f,
      C,
      c
    ]
  ), Mt = K(
    async (E) => {
      const gt = It(I) ? mr(I) : void 0, wt = await f({
        ...E,
        contents: gt,
        assignedUser: C ?? E.assignedUser
      });
      return wt && gt && Ut(), wt && C !== void 0 && T(void 0), wt;
    },
    [Ut, I, f, C]
  );
  return /* @__PURE__ */ n(
    uc,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: h(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-none tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && lt,
          "tw:bg-background": o && w !== "Resolved" && lt,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !lt && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(pc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            _ && /* @__PURE__ */ n(We, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: _ }),
            /* @__PURE__ */ n(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: (E) => {
                  E.stopPropagation(), je();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": lt ? "Mark as unread" : "Mark as read",
                children: lt ? /* @__PURE__ */ n(Ui, {}) : /* @__PURE__ */ n(Hi, {})
              }
            ),
            St && w !== "Resolved" && /* @__PURE__ */ n(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: h(
                  "tw:ms-auto",
                  "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                  "tw:opacity-0 tw:group-hover:opacity-100"
                ),
                onClick: (E) => {
                  E.stopPropagation(), Mt({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ n(Ft, { className: "tw:h-4 tw:w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ n("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: ke,
              className: h(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": V
                },
                { "tw:whitespace-nowrap": !V }
              ),
              children: [
                i && j ? /* @__PURE__ */ n(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (E) => {
                      E.stopPropagation(), j(d);
                    },
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ u("span", { className: t, children: [
                  zt.contextBefore,
                  /* @__PURE__ */ n("span", { className: "tw:font-bold", children: zt.selectedText }),
                  zt.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ n(
            eo,
            {
              comment: zt,
              localizedStrings: r,
              isThreadExpanded: o,
              threadStatus: w,
              handleAddCommentToThread: Mt,
              handleUpdateComment: m,
              handleDeleteComment: p,
              onEditingChange: Y,
              canEditOrDelete: (!A && bt.get(zt.id)) ?? !1,
              canUserResolveThread: St
            }
          )
        ] }),
        /* @__PURE__ */ u(it, { children: [
          U && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ n("div", { className: "tw:w-8", children: /* @__PURE__ */ n(Ye, {}) }),
            /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: ht })
          ] }),
          !o && It(I) && /* @__PURE__ */ n(
            fr,
            {
              editorSerializedState: I,
              onSerializedChange: (E) => D(E),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(it, { children: [
            tt > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (E) => {
                  E.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ n("div", { className: "tw:w-8", children: /* @__PURE__ */ n(Ye, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: at }),
                    $ ? /* @__PURE__ */ n(ho, {}) : /* @__PURE__ */ n(Pe, {})
                  ] })
                ]
              }
            ),
            ot.map((E) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
              eo,
              {
                comment: E,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: m,
                handleDeleteComment: p,
                onEditingChange: Y,
                canEditOrDelete: (!A && bt.get(E.id)) ?? !1
              }
            ) }, E.id)),
            b !== !1 && (!A || It(I)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (E) => E.stopPropagation(),
                onKeyDownCapture: (E) => {
                  xn(E) && (E.preventDefault(), E.stopPropagation(), (It(I) || C !== void 0) && Et());
                },
                onKeyDown: (E) => {
                  vn(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ n(
                    fr,
                    {
                      editorSerializedState: I,
                      onSerializedChange: (E) => D(E),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (E) => {
                        Zt.current = E;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    C !== void 0 && /* @__PURE__ */ n("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: ge(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: wr(
                          C,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u(Yt, { open: M, onOpenChange: J, children: [
                      /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ n(
                        B,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !Ct || !v || v.length === 0 || !v.includes(a),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ n(fo, {})
                        }
                      ) }),
                      /* @__PURE__ */ n(
                        Jt,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (E) => {
                            E.key === "Escape" && (E.stopPropagation(), J(!1));
                          },
                          children: /* @__PURE__ */ n(we, { children: /* @__PURE__ */ n(ue, { children: v == null ? void 0 : v.map((E) => /* @__PURE__ */ n(
                            Wt,
                            {
                              onSelect: () => {
                                T(E !== s ? E : void 0), J(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ n("span", { children: wr(E, r) })
                            },
                            E || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ n(
                      B,
                      {
                        size: "icon",
                        onClick: Et,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !It(I) && C === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ n(mo, {})
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
function jw({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: i,
  handleAddCommentToThread: s,
  handleUpdateComment: a,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: d,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: m,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [x, y] = S(/* @__PURE__ */ new Set()), [N, k] = S();
  q(() => {
    g && (y((O) => new Set(O).add(g)), k(g));
  }, [g]);
  const L = r.filter(
    (O) => O.comments.some((A) => !A.deleted)
  ), j = L.map((O) => ({
    id: O.id
  })), I = K(
    (O) => {
      y((A) => new Set(A).add(O.id)), k(O.id), v == null || v(O.id);
    },
    [v]
  ), D = K(
    (O) => {
      const A = x.has(O);
      y((Y) => {
        const M = new Set(Y);
        return M.has(O) ? M.delete(O) : M.add(O), M;
      }), k(O), v == null || v(A ? void 0 : O);
    },
    [x, v]
  ), { listboxRef: C, activeId: T, handleKeyDown: V } = dc({
    options: j,
    onOptionSelect: I
  }), $ = K(
    (O) => {
      O.key === "Escape" ? (N && x.has(N) && (y((A) => {
        const Y = new Set(A);
        return Y.delete(N), Y;
      }), k(void 0), v == null || v(void 0)), O.preventDefault(), O.stopPropagation()) : V(O);
    },
    [N, x, V, v]
  );
  return /* @__PURE__ */ n(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": T ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: $,
      children: L.map((O) => /* @__PURE__ */ n(
        "div",
        {
          id: O.id,
          className: h({
            "tw:opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ n(
            Nc,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: i,
              verseRef: O.verseRef,
              handleSelectThread: D,
              threadId: O.id,
              thread: O,
              isRead: O.isRead,
              isSelected: x.has(O.id),
              currentUser: o,
              assignedUser: O.assignedUser,
              threadStatus: O.status,
              handleAddCommentToThread: s,
              handleUpdateComment: a,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: d,
              canUserAddCommentToThread: w,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: m,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: b
            }
          )
        },
        O.id
      ))
    }
  );
}
function _c({ table: t }) {
  return /* @__PURE__ */ u(ae, { children: [
    /* @__PURE__ */ n(va, { asChild: !0, children: /* @__PURE__ */ u(B, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ n(qi, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(le, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ n(kr, { children: "Toggle columns" }),
      /* @__PURE__ */ n(tr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ n(
        ne,
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
const Me = yt.Root, kc = yt.Group, Oe = yt.Value, Cc = ce(
  // CUSTOM: Removed tw:justify-between. Added tw:gap-2, tw:[&>span]:flex-1, tw:[&>span]:text-start
  // to keep the chevron tight against the text instead of drifting to the far edge on resize.
  "tw:flex tw:h-9 tw:w-full tw:items-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-sm tw:shadow-sm tw:ring-offset-background tw:data-[placeholder]:text-muted-foreground tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:[&>span]:flex-1 tw:[&>span]:line-clamp-1 tw:[&>span]:text-start",
  {
    variants: {
      size: {
        default: "tw:h-9 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3",
        lg: "tw:h-11 tw:rounded-md tw:px-8",
        icon: "tw:h-9 tw:w-9"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function Ie({
  className: t,
  children: e,
  size: r,
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ u(
    yt.Trigger,
    {
      className: h(Cc({ size: r, className: t })),
      ref: o,
      ...i,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ n(yt.Icon, { asChild: !0, children: /* @__PURE__ */ n(Pe, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function Ec({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.ScrollUpButton,
    {
      ref: e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(ho, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Tc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.ScrollDownButton,
    {
      ref: e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(Pe, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Ae({
  className: t,
  children: e,
  position: r = "popper",
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ n(yt.Portal, { children: /* @__PURE__ */ u(
    yt.Content,
    {
      ref: o,
      className: h(
        "pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      ...i,
      children: [
        /* @__PURE__ */ n(Ec, {}),
        /* @__PURE__ */ n(
          yt.Viewport,
          {
            className: h(
              "tw:p-1",
              r === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ n("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ n(Tc, {})
      ]
    }
  ) });
}
function Fw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.Label,
    {
      ref: e,
      className: h("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...r
    }
  );
}
function Ot({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    yt.Item,
    {
      ref: r,
      className: h(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(yt.ItemIndicator, { children: /* @__PURE__ */ n(Ft, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ n(yt.ItemText, { children: e })
      ]
    }
  );
}
function Bw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.Separator,
    {
      ref: e,
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function Sc({ table: t }) {
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
        Me,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ n(Ie, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ n(Oe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ n(Ae, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ n(Ot, { value: `${e}`, children: e }, e)) })
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
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ n(Wi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ n(Yi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ n(Ji, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ n(Xi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const no = `
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
function Rc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Je(t, e) {
  const r = e ? `${no}, ${e}` : no;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Rc(o)
  );
}
function Nn({
  className: t,
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const i = Q.useRef(null);
  Q.useEffect(() => {
    typeof r == "function" ? r(i.current) : r && "current" in r && (r.current = i.current);
  }, [r]), Q.useEffect(() => {
    const a = i.current;
    if (!a) return;
    const l = () => {
      requestAnimationFrame(() => {
        Je(a, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(a, {
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
  const s = (a) => {
    const { current: l } = i;
    if (l) {
      if (a.key === "ArrowDown") {
        a.preventDefault(), Je(l)[0].focus();
        return;
      }
      a.key === " " && document.activeElement === l && a.preventDefault();
    }
  };
  return /* @__PURE__ */ n("div", { className: h("pr-twp tw:relative tw:w-full", { "tw:p-1": e }), children: /* @__PURE__ */ n(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: i,
      className: h(
        "tw:w-full tw:caption-bottom tw:text-sm tw:outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
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
function _n({
  className: t,
  stickyHeader: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      ref: r,
      className: h(
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
function kn({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("tbody", { ref: e, className: h("tw:[&_tr:last-child]:border-0", t), ...r });
}
function Kw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      ref: e,
      className: h(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...r
    }
  );
}
function Dc(t) {
  Q.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const i = t.current ? Je(t.current) : [], s = i.indexOf(document.activeElement), a = o.key === "ArrowRight" ? s + 1 : s - 1;
          a >= 0 && a < i.length && i[a].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function Mc(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Oc(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function te({
  className: t,
  onKeyDown: e,
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: i,
  ...s
}) {
  const a = Q.useRef(null);
  Q.useEffect(() => {
    typeof i == "function" ? i(a.current) : i && "current" in i && (i.current = a.current);
  }, [i]), Dc(a);
  const l = Q.useMemo(
    () => a.current ? Je(a.current) : [],
    [a]
  ), c = Q.useCallback(
    (w) => {
      const { current: f } = a;
      if (!f || !f.parentElement) return;
      const m = f.closest("table"), p = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Je(m).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = p.indexOf(f), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Oc(p, g, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Mc(l, v, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const b = f.closest("table");
        b && b.focus();
      }
      e == null || e(w);
    },
    [a, l, e]
  ), d = Q.useCallback(
    (w) => {
      o && (r == null || r(w));
    },
    [o, r]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      ref: a,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: d,
      className: h(
        // CUSTOM: Add focus styles and add tw:outline-none so there isn't a duplicate outline
        "tw:border-b tw:outline-none tw:transition-colors tw:hover:bg-muted/50",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        "tw:data-[state=selected]:bg-muted",
        t
      ),
      ...s
    }
  );
}
function hr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "th",
    {
      ref: e,
      className: h(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:text-muted-foreground tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...r
    }
  );
}
function Se({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "td",
    {
      ref: e,
      className: h(
        "tw:p-2 tw:align-middle tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...r
    }
  );
}
function Gw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "caption",
    {
      ref: e,
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function nn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Ic({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: i = !1,
  stickyHeader: s = !1,
  onRowClickHandler: a = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: d
}) {
  var j;
  const [w, f] = S([]), [m, p] = S([]), [g, v] = S({}), [b, x] = S({}), y = F(() => e ?? [], [e]), N = Lo({
    data: y,
    columns: t,
    getCoreRowModel: Fo(),
    ...r && { getPaginationRowModel: ya() },
    onSortingChange: f,
    getSortedRowModel: jo(),
    onColumnFiltersChange: p,
    getFilteredRowModel: xa(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: x,
    state: {
      sorting: w,
      columnFilters: m,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = N.getVisibleFlatColumns();
  let L;
  return c ? L = Array.from({ length: 10 }).map((C, T) => `skeleton-row-${T}`).map((C) => /* @__PURE__ */ n(te, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ n(Se, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ n("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ n(nn, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, C)) : ((j = N.getRowModel().rows) == null ? void 0 : j.length) > 0 ? L = N.getRowModel().rows.map((I) => /* @__PURE__ */ n(
    te,
    {
      onClick: () => a(I, N),
      "data-state": I.getIsSelected() && "selected",
      children: I.getVisibleCells().map((D) => /* @__PURE__ */ n(Se, { children: Ge(D.column.columnDef.cell, D.getContext()) }, D.id))
    },
    I.id
  )) : L = /* @__PURE__ */ n(te, { children: /* @__PURE__ */ n(Se, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: l, children: [
    i && /* @__PURE__ */ n(_c, { table: N }),
    /* @__PURE__ */ u(Nn, { stickyHeader: s, children: [
      /* @__PURE__ */ n(_n, { stickyHeader: s, children: N.getHeaderGroups().map((I) => /* @__PURE__ */ n(te, { children: I.headers.map((D) => /* @__PURE__ */ n(hr, { className: "tw:p-0", children: D.isPlaceholder ? void 0 : Ge(D.column.columnDef.header, D.getContext()) }, D.id)) }, I.id)) }),
      /* @__PURE__ */ n(kn, { children: L })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ n(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.previousPage(),
          disabled: !N.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.nextPage(),
          disabled: !N.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ n(Sc, { table: N })
  ] });
}
function zw({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: i
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
  return /* @__PURE__ */ n(
    "div",
    {
      id: t,
      className: h(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": i
        },
        r
      ),
      children: /* @__PURE__ */ n(ka, { options: s, children: e })
    }
  );
}
const Ac = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), oo = (t, e) => t[e] ?? e;
function $c({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const i = oo(r, "%webView_error_dump_header%"), s = oo(r, "%webView_error_dump_info_message%");
  function a() {
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
            /* @__PURE__ */ n("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: i }),
            /* @__PURE__ */ n("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ n(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => a(), children: /* @__PURE__ */ n(go, {}) })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ n("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Uw = Object.freeze([
  ...Ac,
  "%webView_error_dump_copied_message%"
]);
function Hw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: i,
  id: s
}) {
  const [a, l] = S(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ u(Yt, { onOpenChange: (w) => {
    w || l(!1);
  }, children: [
    /* @__PURE__ */ n(pe, { asChild: !0, children: o }),
    /* @__PURE__ */ u(Jt, { id: s, className: h("tw:min-w-80 tw:max-w-96", i), children: [
      a && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ n(pt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ n(
        $c,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Pc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Pc || {});
function qw({ id: t, label: e, groups: r }) {
  const [o, i] = S(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [s, a] = S({}), l = (d, w) => {
    const f = !o[d][w];
    i((p) => (p[d][w] = f, { ...p }));
    const m = r[d].items[w];
    m.onUpdate(m.id, f);
  }, c = (d, w) => {
    a((m) => (m[d] = w, { ...m }));
    const f = r[d].items.find((m) => m.id === w);
    f ? f.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ n("div", { id: t, children: /* @__PURE__ */ u(ae, { children: [
    /* @__PURE__ */ n(ye, { asChild: !0, children: /* @__PURE__ */ u(B, { variant: "default", children: [
      /* @__PURE__ */ n(Zi, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ n(Pe, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ n(le, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n(kr, { children: d.label }),
      /* @__PURE__ */ n(yi, { children: d.itemType === 0 ? /* @__PURE__ */ n(it, { children: d.items.map((f, m) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
        ne,
        {
          checked: o[w][m],
          onCheckedChange: () => l(w, m),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ n(
        bc,
        {
          value: s[w],
          onValueChange: (f) => c(w, f),
          children: d.items.map((f) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(yc, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ n(tr, {})
    ] }, d.label)) })
  ] }) });
}
function Ww({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: i,
  handleMoreInfoLinkClick: s,
  supportUrl: a,
  handleSupportLinkClick: l
}) {
  const c = new ks("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, f) => w + f, 0)), d = () => {
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
            /* @__PURE__ */ n(Qi, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: c })
          ] }),
          /* @__PURE__ */ n("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ n("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
          o.length > 3 && /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => d(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (i || a) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          i && /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            B,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ n(ts, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          a && /* @__PURE__ */ n("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            B,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ n(es, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Vc({ id: t, versionHistory: e }) {
  const [r, o] = S(!1), i = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), d = new Date(i.getTime() - c.getTime()), w = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), m = d.getUTCDate() - 1;
    let p = "";
    return w > 0 ? p = `${w.toString()} year${w === 1 ? "" : "s"} ago` : f > 0 ? p = `${f.toString()} month${f === 1 ? "" : "s"} ago` : m === 0 ? p = "today" : p = `${m.toString()} day${m === 1 ? "" : "s"} ago`, p;
  }
  const a = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ n("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ n("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? a : a.slice(0, 5)).map((l) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ n("div", { className: "tw:text-foreground", children: /* @__PURE__ */ n("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ n("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ n("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    a.length > 5 && /* @__PURE__ */ n(
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
function Yw({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: i,
  currentVersion: s
}) {
  const a = F(() => Cs(r), [r]), c = ((d) => {
    const w = new Intl.DisplayNames(Es(), { type: "language" });
    return d.map((f) => w.of(f));
  })(o);
  return /* @__PURE__ */ n("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(i).length > 0 && /* @__PURE__ */ n(Vc, { versionHistory: i }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ n("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Publisher" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ n("span", { children: "Size" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: a })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Version" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: s }),
          /* @__PURE__ */ n("span", { children: "Languages" }),
          /* @__PURE__ */ n("span", { className: "tw:font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Lc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  hasToggleAllFeature: i = !1,
  selectAllText: s = "Select All",
  clearAllText: a = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: d = void 0,
  onOpenChange: w = void 0,
  isDisabled: f = !1,
  sortSelected: m = !1,
  icon: p = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [x, y] = S(!1), N = K(
    (T) => {
      var $;
      const V = ($ = t.find((O) => O.label === T)) == null ? void 0 : $.value;
      V && r(
        e.includes(V) ? e.filter((O) => O !== V) : [...e, V]
      );
    },
    [t, e, r]
  ), k = () => c || o, L = F(() => {
    if (!m) return t;
    const T = t.filter(($) => $.starred).sort(($, O) => $.label.localeCompare(O.label)), V = t.filter(($) => !$.starred).sort(($, O) => {
      const A = e.includes($.value), Y = e.includes(O.value);
      return A && !Y ? -1 : !A && Y ? 1 : $.label.localeCompare(O.label);
    });
    return [...T, ...V];
  }, [t, e, m]), j = () => {
    r(t.map((T) => T.value));
  }, I = () => {
    r([]);
  }, D = d ?? x;
  return /* @__PURE__ */ n("div", { id: b, className: g, children: /* @__PURE__ */ u(Yt, { open: D, onOpenChange: w ?? y, children: [
    /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ u(
      B,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": D,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ n(bo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Jt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ u(we, { children: [
      /* @__PURE__ */ n(Qe, { placeholder: `Search ${o.toLowerCase()}...` }),
      i && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: j, children: s }),
        /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: I, children: a })
      ] }),
      /* @__PURE__ */ u(ue, { children: [
        /* @__PURE__ */ n(yr, { children: l }),
        /* @__PURE__ */ n(qt, { children: L.map((T) => /* @__PURE__ */ u(
          Wt,
          {
            value: T.label,
            onSelect: N,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                Ft,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(T.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ n(rs, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Jw({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: a,
  sortSelected: l,
  icon: c,
  className: d,
  badgesPlaceholder: w,
  id: f
}) {
  return /* @__PURE__ */ u("div", { id: f, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Lc,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: a,
        sortSelected: l,
        icon: c,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((m) => {
      var p;
      return /* @__PURE__ */ u(We, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ n(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== m)),
            children: /* @__PURE__ */ n($e, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((g) => g.value === m)) == null ? void 0 : p.label
      ] }, m);
    }) }) : /* @__PURE__ */ n(pt, { children: w })
  ] });
}
const jc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), io = (t, e) => t[e] ?? e;
function Fc({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: i = {},
  showKeyboardShortcuts: s = !0,
  className: a = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const c = F(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(
        B,
        {
          "aria-label": "Undo",
          className: a,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ n(ns, {})
        }
      ) }),
      /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ u("p", { children: [
        io(i, "%undoButton_tooltip%"),
        s && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(
        B,
        {
          "aria-label": "Redo",
          className: a,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ n(os, {})
        }
      ) }),
      /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ u("p", { children: [
        io(i, "%redoButton_tooltip%"),
        s && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function Bc({ children: t, editorRef: e }) {
  const r = H(null);
  return q(() => {
    var a;
    const o = /Macintosh/i.test(navigator.userAgent), i = ((a = r.current) == null ? void 0 : a.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var d, w, f, m;
      if (!i || document.activeElement !== i) return;
      const c = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (d = e.current) == null || d.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (w = e.current) == null || w.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (f = e.current) == null || f.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (m = e.current) == null || m.redo());
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [e]), /* @__PURE__ */ n("div", { ref: r, children: t });
}
function er({
  className: t,
  type: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      className: h(
        "pr-twp tw:flex tw:h-9 tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-1 tw:text-base tw:shadow-sm tw:transition-colors tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: r,
      ...o
    }
  );
}
const Kc = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Gc({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: i
}) {
  const s = H(null), a = H(null), l = H(!1), [c, d] = S(t), [w, f] = S(r), [m, p] = S(!1);
  q(() => {
    d(t);
  }, [t]), q(() => {
    w !== r && f(r);
  }, [r]);
  const g = (b) => {
    l.current = !1, p(b), b || (c !== "custom" || w ? (e(c), o(w)) : (d(t), f(r)));
  }, v = (b) => {
    var x, y, N, k;
    b.stopPropagation(), document.activeElement === a.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((x = s.current) == null || x.focus(), l.current = !0) : document.activeElement === s.current && b.key === "ArrowUp" ? ((y = a.current) == null || y.focus(), l.current = !1) : document.activeElement === s.current && b.key === "ArrowLeft" && ((N = s.current) == null ? void 0 : N.selectionStart) === 0 && ((k = a.current) == null || k.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === a.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ u(ae, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(ye, { asChild: !0, children: /* @__PURE__ */ n(B, { variant: "outline", className: "tw:h-6", children: Kc(t, i, r) }) }) }),
      /* @__PURE__ */ n(kt, { children: i["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      le,
      {
        style: { zIndex: Bo },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = s.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ n(kr, { children: i["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ n(tr, {}),
          /* @__PURE__ */ n(
            ne,
            {
              checked: c === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: i["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: Hr })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            ne,
            {
              checked: c === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: i["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: qr })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            ne,
            {
              ref: a,
              checked: c === "custom",
              onCheckedChange: () => d("custom"),
              onClick: (b) => {
                var x;
                b.stopPropagation(), l.current = !0, (x = s.current) == null || x.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: i["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ n(
                  er,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), d("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => f(b.target.value)
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
const zc = (t, e) => t === "f" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n(xo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n(yo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(it, { children: [
  /* @__PURE__ */ n(vo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Uc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), ge(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Hc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(ae, { children: [
    /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ n(wa, { asChild: !0, children: /* @__PURE__ */ n(ye, { asChild: !0, children: /* @__PURE__ */ n(B, { variant: "outline", className: "tw:h-6", children: zc(t, r) }) }) }),
      /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: Uc(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(le, { style: { zIndex: Bo }, children: [
      /* @__PURE__ */ n(kr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ n(tr, {}),
      /* @__PURE__ */ u(
        ne,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n(vo, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ne,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n(xo, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ne,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ n(yo, {}),
            /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const qc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Wc({ icon: t, className: e }) {
  return /* @__PURE__ */ n(t ?? is, { className: e, size: 16 });
}
function so({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    Wt,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ n("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ n("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Wc, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ n("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ n("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ n(Ba, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Yc({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [o, i] = S(""), [s, a] = F(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const c = e.filter(
      (w) => {
        var f;
        return (f = w.marker) == null ? void 0 : f.toLowerCase().includes(l);
      }
    ), d = e.filter(
      (w) => w.title.toLowerCase().includes(l) && !c.includes(w)
    );
    return [c, d];
  }, [o, e]);
  return /* @__PURE__ */ u(we, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ n(
      Qe,
      {
        className: "marker-menu-search",
        ref: r,
        value: o,
        onValueChange: (l) => i(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(ue, { children: [
      /* @__PURE__ */ n(yr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ n(qt, { children: s.map((l) => {
        var c;
        return /* @__PURE__ */ n(
          so,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      a.length > 0 && /* @__PURE__ */ u(it, { children: [
        s.length > 0 && /* @__PURE__ */ n(Ko, { alwaysRender: !0 }),
        /* @__PURE__ */ n(qt, { children: a.map((l) => {
          var c;
          return /* @__PURE__ */ n(
            so,
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
function Jc(t, e, r, o) {
  if (!o || o === "p") return [];
  const i = lr[o];
  if (!(i != null && i.children)) return [];
  const s = [];
  return Object.entries(i.children).forEach(([, a]) => {
    s.push(
      ...a.map((l) => ({
        marker: l,
        title: r[lr[l].description] ?? lr[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((a, l) => (a.marker ?? a.title).localeCompare(l.marker ?? l.title));
}
function Xc(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Zc(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Qc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Xw({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: i,
  noteKey: s,
  editorOptions: a,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: d
}) {
  const w = H(null), f = H(null), m = H(null), p = H(null);
  Rt(() => {
    if (!p.current) return;
    const { width: _ } = p.current.getBoundingClientRect();
    _ > 0 && (p.current.style.width = `${_}px`);
  }, []);
  const [g, v] = S("generated"), [b, x] = S("*"), [y, N] = S("f"), [k, L] = S(!1), [j, I] = S(!0), [D, C] = S(!1), T = H(!1), V = H(""), [$, O] = S(!1), [A, Y] = S(), [M, J] = S(), [Ct, Dt] = S(), [St, ut] = S(), lt = H(null), G = F(
    () => ({
      ...a,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...a.view ?? Ca(), noteMode: "expanded" }
    }),
    [a, l]
  ), rt = F(
    () => Jc(
      w,
      () => O(!1),
      c,
      St
    ),
    [c, St]
  );
  q(() => {
    var _;
    $ || (_ = w.current) == null || _.focus();
  }, [y, $]), q(() => {
    var z, U;
    let _;
    T.current = !1, I(!0);
    const P = e == null ? void 0 : e.at(0);
    if (P && nr("note", P)) {
      const ot = (z = P.insert.note) == null ? void 0 : z.caller;
      let tt = "custom";
      ot === Hr ? tt = "generated" : ot === qr ? tt = "hidden" : ot && x(ot), v(tt), N(((U = P.insert.note) == null ? void 0 : U.style) ?? "f"), _ = setTimeout(() => {
        var ht;
        (ht = w.current) == null || ht.applyUpdate([P]);
      }, 0);
    }
    return () => {
      _ && clearTimeout(_);
    };
  }, [e, s]);
  const nt = K(
    (_, P, z = !1) => {
      var ot, tt, ht;
      const U = (tt = (ot = w.current) == null ? void 0 : ot.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (U && nr("note", U)) {
        if (U.insert.note) {
          let at;
          _ === "custom" ? at = P : _ === "generated" ? at = Hr : at = qr, U.insert.note.caller = at;
        }
        r == null || r([U]), z && d && s && ((ht = d.current) == null || ht.replaceEmbedUpdate(s, [U]));
      }
    },
    [s, r, d]
  ), st = K(() => {
    nt(g, b, !0), o();
  }, [g, b, o, nt]), bt = H(st);
  Rt(() => {
    bt.current = st;
  });
  const Gt = H({ book: i.book, chapterNum: i.chapterNum });
  Rt(() => {
    (Gt.current.book !== i.book || Gt.current.chapterNum !== i.chapterNum) && (Gt.current = { book: i.book, chapterNum: i.chapterNum }, bt.current());
  }, [i.book, i.chapterNum]);
  const Pt = () => {
    var P;
    const _ = (P = f.current) == null ? void 0 : P.getElementsByClassName("editor-input")[0];
    _ != null && _.textContent && navigator.clipboard.writeText(_.textContent);
  }, zt = K(
    (_) => {
      v(_), nt(_, b);
    },
    [b, nt]
  ), ke = K(
    (_) => {
      x(_), nt(g, _);
    },
    [g, nt]
  ), Zt = (_) => {
    var z, U, ot, tt, ht;
    N(_);
    const P = (U = (z = w.current) == null ? void 0 : z.getNoteOps(0)) == null ? void 0 : U.at(0);
    if (P && nr("note", P)) {
      P.insert.note && (P.insert.note.style = _);
      const at = (tt = (ot = P.insert.note) == null ? void 0 : ot.contents) == null ? void 0 : tt.ops;
      y !== "x" && _ === "x" ? at == null || at.forEach((Et) => Xc(Et)) : y === "x" && _ !== "x" && (at == null || at.forEach((Et) => Zc(Et))), (ht = w.current) == null || ht.applyUpdate([P, { delete: 1 }]);
    }
  }, Ut = (_) => {
    ut(_.contextMarker), C(_.canRedo);
  }, je = K(
    (_) => {
      var z, U, ot, tt, ht;
      const P = (U = (z = w.current) == null ? void 0 : z.getNoteOps(0)) == null ? void 0 : U.at(0);
      if (P && nr("note", P)) {
        _.content.length > 1 && setTimeout(() => {
          var Mt;
          (Mt = w.current) == null || Mt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const at = (ot = P.insert.note) == null ? void 0 : ot.style, Et = (ht = (tt = P.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : ht.ops;
        if (at || L(!1), L(
          at === "x" ? !!(Et != null && Et.every((Mt) => {
            var gt, wt;
            if (!((gt = Mt.attributes) != null && gt.char)) return !0;
            const E = ((wt = Mt.attributes) == null ? void 0 : wt.char).style;
            return E === "xt" || E === "xo" || E === "xq";
          })) : !!(Et != null && Et.every((Mt) => {
            var gt, wt;
            if (!((gt = Mt.attributes) != null && gt.char)) return !0;
            const E = ((wt = Mt.attributes) == null ? void 0 : wt.char).style;
            return E === "ft" || E === "fr" || E === "fq";
          }))
        ), !T.current) {
          T.current = !0, V.current = JSON.stringify(P), I(!0);
          return;
        }
        I(JSON.stringify(P) === V.current), nt(g, b);
      } else
        L(!1), I(!0);
    },
    [g, b, nt]
  ), R = K(() => {
    const _ = window.getSelection();
    if (m.current && rt.length && _ && _.rangeCount > 0) {
      const P = _.getRangeAt(0).getBoundingClientRect(), z = m.current.getBoundingClientRect();
      Y(P.left - z.left), J(P.top - z.top), Dt(P.height), O(!0);
    }
  }, [rt, m]);
  return q(() => {
    const _ = () => {
      $ && O(!1);
    };
    return window.addEventListener("click", _), () => {
      window.removeEventListener("click", _);
    };
  }, [$]), q(() => {
    var _;
    $ && ((_ = lt.current) == null || _.focus());
  }, [$]), q(() => {
    var z;
    const _ = ((z = f.current) == null ? void 0 : z.querySelector(".editor-input")) ?? void 0, P = (U) => {
      !$ && _ && document.activeElement === _ && U.key === l ? (U.preventDefault(), R()) : $ && U.key === "Escape" && (U.preventDefault(), O(!1));
    };
    return document.addEventListener("keydown", P), () => {
      document.removeEventListener("keydown", P);
    };
  }, [$, R, l]), /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ u("div", { ref: p, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ n(
            Hc,
            {
              isTypeSwitchable: k,
              noteType: y,
              handleNoteTypeChange: Zt,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ n(
            Gc,
            {
              callerType: g,
              updateCallerType: zt,
              customCaller: b,
              updateCustomCaller: ke,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-end tw:gap-4", children: [
          /* @__PURE__ */ n(
            Fc,
            {
              onUndoClick: () => {
                var _;
                return (_ = w.current) == null ? void 0 : _.undo();
              },
              onRedoClick: () => {
                var _;
                return (_ = w.current) == null ? void 0 : _.redo();
              },
              canUndo: !j,
              canRedo: D,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
            /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(
              B,
              {
                onClick: st,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ n(Ft, {})
              }
            ) }),
            /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
            /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(B, { onClick: o, className: "tw:h-6 tw:w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ n($e, {}) }) }),
            /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ u(
        "div",
        {
          ref: f,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ n("div", { className: t, children: /* @__PURE__ */ n(Bc, { editorRef: w, children: /* @__PURE__ */ n(
              Ea,
              {
                options: G,
                onStateChange: Ut,
                onUsjChange: je,
                defaultUsj: Qc,
                onScrRefChange: () => {
                },
                scrRef: i,
                ref: w
              }
            ) }) }),
            /* @__PURE__ */ n("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ n(
                B,
                {
                  onClick: Pt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ n(go, {})
                }
              ) }),
              /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n(
      "div",
      {
        className: "tw:absolute",
        ref: m,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ u(Yt, { open: $, children: [
      /* @__PURE__ */ n(
        Ga,
        {
          className: "tw:absolute",
          style: {
            top: M,
            left: A,
            height: Ct,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ n(
        Jt,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (_) => {
            _.preventDefault(), _.stopPropagation();
          },
          children: /* @__PURE__ */ n(
            Yc,
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
const Zw = Object.freeze([
  ...qc,
  ...Object.entries(lr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...jc
]);
function Ni(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((i) => typeof i == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function td(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const i = [], s = [];
  let a = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (a.length > 0 && s.push(a), a = [l]) : a.push(l);
  }), a.length > 0 && s.push(a), s.map((l, c) => {
    const d = c === s.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      Cn(t, l, r, !0, i),
      d && o
    ] }, Ni(t, l));
  });
}
function Cn(t, e, r = !0, o = !0, i = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const a = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ n("span", { className: l, children: s }, a);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ n(Kr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ n("span", { children: s }),
              /* @__PURE__ */ n(Kr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          a
        );
      }
      return ed(
        s,
        Ni(`${t}\\${s.marker}`, [s]),
        r,
        [...i, t ?? "unknown"]
      );
    });
}
function ed(t, e, r, o = []) {
  const { marker: i } = t;
  return /* @__PURE__ */ u("span", { children: [
    i ? r && /* @__PURE__ */ n("span", { className: "marker", children: `\\${i} ` }) : /* @__PURE__ */ n(
      Kr,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Cn(i, t.content, r, !0, [
      ...o,
      i ?? "unknown"
    ])
  ] }, e);
}
function rd({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const i = r ? r(t.caller) : t.caller, s = i !== t.caller;
  let a, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([a, ...l] = t.content);
  const c = o ? /* @__PURE__ */ n("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, d = o ? /* @__PURE__ */ n("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = i && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: h("note-caller tw:inline-block", { formatted: s }), children: [
    i,
    " "
  ] }), f = a && /* @__PURE__ */ u(it, { children: [
    Cn(t.marker, [a], o, !1),
    " "
  ] }), m = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = h(m, p);
  return /* @__PURE__ */ u(it, { children: [
    /* @__PURE__ */ u("div", { className: h("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      c,
      w
    ] }),
    /* @__PURE__ */ n("div", { className: h("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: f }),
    /* @__PURE__ */ n(
      "div",
      {
        className: h(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ n(it, { children: td(t.marker, l, o, d) })
      }
    )
  ] });
}
function Qw({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: i,
  selectedFootnote: s,
  showMarkers: a = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: d
}) {
  const w = c ?? Ts(r, void 0), f = (y, N) => {
    d == null || d(y, N, i);
  }, m = s ? r.findIndex((y) => y === s) : -1, [p, g] = S(m), v = (y, N, k) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), d == null || d(N, k, i);
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
  }, x = H([]);
  return q(() => {
    var y;
    p >= 0 && p < x.current.length && ((y = x.current[p]) == null || y.focus());
  }, [p]), /* @__PURE__ */ n(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: h("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ n(
        "ul",
        {
          className: h(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((y, N) => {
            const k = y === s, L = `${i}-${N}`;
            return /* @__PURE__ */ u(it, { children: [
              /* @__PURE__ */ n(
                "li",
                {
                  ref: (j) => {
                    x.current[N] = j;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": y.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: N === p ? 0 : -1,
                  className: h(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    d && "tw:hover:bg-muted/50",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                    "tw:focus:outline-none tw:focus-visible:outline-none",
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
                  onClick: () => f(y, N),
                  onKeyDown: (j) => v(j, y, N),
                  children: /* @__PURE__ */ n(
                    rd,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => w(y.caller, N),
                      showMarkers: a
                    }
                  )
                },
                L
              ),
              N < r.length - 1 && o === "vertical" && /* @__PURE__ */ n(Ye, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function nd(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let i;
  for (; (i = o.exec(t)) !== null; )
    i.index > r && e.push(t.substring(r, i.index)), e.push(/* @__PURE__ */ n("strong", { children: i[1] }, i.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function od({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const i = r["%webView_inventory_occurrences_table_header_reference%"], s = r["%webView_inventory_occurrences_table_header_occurrence%"], a = F(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      c.has(w) || (c.add(w), l.push(d));
    }), l;
  }, [t]);
  return /* @__PURE__ */ u(Nn, { stickyHeader: !0, children: [
    /* @__PURE__ */ n(_n, { stickyHeader: !0, children: /* @__PURE__ */ u(te, { children: [
      /* @__PURE__ */ n(hr, { children: i }),
      /* @__PURE__ */ n(hr, { children: s })
    ] }) }),
    /* @__PURE__ */ n(kn, { children: a.length > 0 && a.map((l) => /* @__PURE__ */ u(
      te,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ n(Se, { children: be(l.reference, "English") }),
          /* @__PURE__ */ n(Se, { className: o, children: nd(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function _i({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Fn.Root,
    {
      ref: e,
      className: h(
        "tw:grid tw:place-content-center tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:shadow tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...r,
      children: /* @__PURE__ */ n(
        Fn.Indicator,
        {
          className: h("tw:grid tw:place-content-center tw:text-current"),
          children: /* @__PURE__ */ n(Ft, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const id = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ n(cs, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ n(ds, { className: "tw:h-4 tw:w-4" });
}, Cr = (t, e, r) => /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ u(
    Tt,
    {
      className: h("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        id(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ n(kt, { side: "bottom", children: e })
] }) }), tu = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Cr(e, t)
}), sd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Cr(r, t)
}), eu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Cr(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Vr = (t, e, r, o, i, s) => {
  let a = [...r];
  t.forEach((c) => {
    e === "approved" ? a.includes(c) || a.push(c) : a = a.filter((d) => d !== c);
  }), o(a);
  let l = [...i];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), s(l);
}, ru = (t, e, r, o, i) => ({
  accessorKey: "status",
  header: ({ column: s }) => Cr(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const a = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ u(mi, { value: a, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ n(
        dr,
        {
          onClick: (c) => {
            c.stopPropagation(), Vr(
              [l],
              "approved",
              e,
              r,
              o,
              i
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ n(ss, {})
        }
      ),
      /* @__PURE__ */ n(
        dr,
        {
          onClick: (c) => {
            c.stopPropagation(), Vr(
              [l],
              "unapproved",
              e,
              r,
              o,
              i
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ n(as, {})
        }
      ),
      /* @__PURE__ */ n(
        dr,
        {
          onClick: (c) => {
            c.stopPropagation(), Vr(
              [l],
              "unknown",
              e,
              r,
              o,
              i
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ n(ls, {})
        }
      )
    ] });
  }
}), nu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ou = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, iu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, ad = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", su = Object.freeze([
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
]), ld = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (i) => e === "approved" && i.status === "approved" || e === "unapproved" && i.status === "unapproved" || e === "unknown" && i.status === "unknown"
  )), r !== "" && (o = o.filter((i) => i.items[0].includes(r))), o;
}, cd = (t, e, r) => t.map((o) => {
  const i = In(o.key) ? o.key : o.key[0];
  return {
    items: In(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || ad(i, e, r),
    occurrences: o.occurrences || []
  };
}), Vt = (t, e) => t[e] ?? e;
function au({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: s,
  scope: a,
  onScopeChange: l,
  columns: c,
  id: d,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: f,
  onItemSelected: m
}) {
  const p = Vt(r, "%webView_inventory_all%"), g = Vt(r, "%webView_inventory_approved%"), v = Vt(r, "%webView_inventory_unapproved%"), b = Vt(r, "%webView_inventory_unknown%"), x = Vt(r, "%webView_inventory_scope_currentBook%"), y = Vt(r, "%webView_inventory_scope_chapter%"), N = Vt(r, "%webView_inventory_scope_verse%"), k = Vt(r, "%webView_inventory_filter_text%"), L = Vt(
    r,
    "%webView_inventory_show_additional_items%"
  ), j = Vt(r, "%webView_inventory_no_results%"), [I, D] = S(!1), [C, T] = S("all"), [V, $] = S(""), [O, A] = S([]), Y = F(() => {
    const G = t ?? [];
    return G.length === 0 ? [] : cd(G, i, s);
  }, [t, i, s]), M = F(() => {
    if (I) return Y;
    const G = [];
    return Y.forEach((rt) => {
      const nt = rt.items[0], st = G.find(
        (bt) => bt.items[0] === nt
      );
      st ? (st.count += rt.count, st.occurrences = st.occurrences.concat(rt.occurrences)) : G.push({
        items: [nt],
        count: rt.count,
        occurrences: rt.occurrences,
        status: rt.status
      });
    }), G;
  }, [I, Y]), J = F(() => M.length === 0 ? [] : ld(M, C, V), [M, C, V]), Ct = F(() => {
    var nt, st;
    if (!I) return c;
    const G = (nt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : nt.length;
    if (!G) return c;
    const rt = [];
    for (let bt = 0; bt < G; bt++)
      rt.push(
        sd(
          ((st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...rt, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, I]);
  q(() => {
    J.length === 0 ? A([]) : J.length === 1 && A(J[0].items);
  }, [J]);
  const Dt = (G, rt) => {
    rt.setRowSelection(() => {
      const st = {};
      return st[G.index] = !0, st;
    });
    const nt = G.original.items;
    A(nt), m && nt.length > 0 && m(nt[0]);
  }, St = (G) => {
    if (G === "book" || G === "chapter" || G === "verse")
      l(G);
    else
      throw new Error(`Invalid scope value: ${G}`);
  }, ut = (G) => {
    if (G === "all" || G === "approved" || G === "unapproved" || G === "unknown")
      T(G);
    else
      throw new Error(`Invalid status filter value: ${G}`);
  }, lt = F(() => {
    if (M.length === 0 || O.length === 0) return [];
    const G = M.filter((rt) => Ss(
      I ? rt.items : [rt.items[0]],
      O
    ));
    if (G.length > 1) throw new Error("Selected item is not unique");
    return G.length === 0 ? [] : G[0].occurrences;
  }, [O, I, M]);
  return /* @__PURE__ */ n("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Me,
        {
          onValueChange: (G) => ut(G),
          defaultValue: C,
          children: [
            /* @__PURE__ */ n(Ie, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ n(Oe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Ae, { children: [
              /* @__PURE__ */ n(Ot, { value: "all", children: p }),
              /* @__PURE__ */ n(Ot, { value: "approved", children: g }),
              /* @__PURE__ */ n(Ot, { value: "unapproved", children: v }),
              /* @__PURE__ */ n(Ot, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Me, { onValueChange: (G) => St(G), defaultValue: a, children: [
        /* @__PURE__ */ n(Ie, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ n(Oe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Ae, { children: [
          /* @__PURE__ */ n(Ot, { value: "book", children: x }),
          /* @__PURE__ */ n(Ot, { value: "chapter", children: y }),
          /* @__PURE__ */ n(Ot, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ n(
        er,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: k,
          value: V,
          onChange: (G) => {
            $(G.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ u(_t, { children: [
        /* @__PURE__ */ n(Tt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ n(
            _i,
            {
              className: "tw:m-1 tw:flex-shrink-0",
              checked: I,
              onCheckedChange: (G) => {
                D(G);
              }
            }
          ),
          /* @__PURE__ */ n(pt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? L })
        ] }) }),
        /* @__PURE__ */ n(kt, { children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] }) })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ n(
      Ic,
      {
        columns: Ct,
        data: J,
        onRowClickHandler: Dt,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: j
      }
    ) }),
    lt.length > 0 && /* @__PURE__ */ n("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ n(
      od,
      {
        classNameForText: f,
        occurrenceData: lt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const dd = "16rem", wd = "3rem", ki = Q.createContext(void 0);
function Er() {
  const t = Q.useContext(ki);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function ud({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: i,
  children: s,
  side: a = "primary",
  ref: l,
  ...c
}) {
  const [d, w] = Q.useState(t), f = e ?? d, m = Q.useCallback(
    (N) => {
      const k = typeof N == "function" ? N(f) : N;
      r ? r(k) : w(k);
    },
    [r, f]
  ), p = Q.useCallback(() => m((N) => !N), [m]), g = f ? "expanded" : "collapsed", x = dt() === "ltr" ? a : a === "primary" ? "secondary" : "primary", y = Q.useMemo(
    () => ({
      state: g,
      open: f,
      setOpen: m,
      toggleSidebar: p,
      side: x
    }),
    [g, f, m, p, x]
  );
  return /* @__PURE__ */ n(ki.Provider, { value: y, children: /* @__PURE__ */ n(Nt, { delayDuration: 0, children: /* @__PURE__ */ n(
    "div",
    {
      style: (
        // CSS custom properties are not in React.CSSProperties; cast is required to use them
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": dd,
          "--sidebar-width-icon": wd,
          ...i
        }
      ),
      className: h(
        // Removed tw:min-h-svh
        "tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar",
        o
      ),
      ref: l,
      ...c,
      children: s
    }
  ) }) });
}
function pd({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ref: i,
  ...s
}) {
  const a = Er();
  return e === "none" ? /* @__PURE__ */ n(
    "div",
    {
      className: h(
        "tw:flex tw:h-full tw:w-[--sidebar-width] tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ref: i,
      ...s,
      children: o
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      ref: i,
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": a.state,
      "data-collapsible": a.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": a.side,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: h(
              "tw:relative tw:h-svh tw:w-[--sidebar-width] tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              "tw:group-data-[side=secondary]:rotate-180",
              t === "floating" || t === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ n(
          "div",
          {
            className: h(
              // CUSTOM: Switched tw:fixed to tw:absolute here to scope the sidebar inside of it's container
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-[--sidebar-width] tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              a.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon] tw:group-data-[side=primary]:border-r tw:group-data-[side=secondary]:border-l",
              r
            ),
            ...s,
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
function lu({
  className: t,
  onClick: e,
  ref: r,
  ...o
}) {
  const i = Er();
  return /* @__PURE__ */ u(
    B,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw:h-7 tw:w-7", t),
      onClick: (s) => {
        e == null || e(s), i.toggleSidebar();
      },
      ...o,
      children: [
        i.side === "primary" ? /* @__PURE__ */ n(ws, {}) : /* @__PURE__ */ n(us, {}),
        /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function cu({
  className: t,
  ref: e,
  ...r
}) {
  const { toggleSidebar: o } = Er();
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
      className: h(
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
function fd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "main",
    {
      ref: e,
      className: h(
        // CUSTOM: Removed tw:min-h-svh
        "tw:relative tw:flex tw:flex-1 tw:flex-col tw:bg-background",
        "tw:peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 tw:md:peer-data-[variant=inset]:ml-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow",
        t
      ),
      ...r
    }
  );
}
function du({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    er,
    {
      ref: e,
      "data-sidebar": "input",
      className: h(
        "tw:h-8 tw:w-full tw:bg-background tw:shadow-none tw:focus-visible:ring-2 tw:focus-visible:ring-sidebar-ring",
        t
      ),
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
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: h("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function uu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: h("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function pu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ye,
    {
      ref: e,
      "data-sidebar": "separator",
      className: h("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...r
    }
  );
}
function md({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "content",
      className: h(
        "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...r
    }
  );
}
function ao({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "group",
      className: h("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...r
    }
  );
}
function lo({
  className: t,
  asChild: e = !1,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    e ? Ve : "div",
    {
      ref: r,
      "data-sidebar": "group-label",
      className: h(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-none tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        "tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...o
    }
  );
}
function fu({
  className: t,
  asChild: e = !1,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    e ? Ve : "button",
    {
      ref: r,
      "data-sidebar": "group-action",
      className: h(
        "tw:absolute tw:right-3 tw:top-3.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...o
    }
  );
}
function co({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: h("tw:w-full tw:text-sm", t),
      ...r
    }
  );
}
function hd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: h("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1", t),
      ...r
    }
  );
}
function gd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: h("tw:group/menu-item tw:relative", t),
      ...r
    }
  );
}
const bd = ce(
  "tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-none tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[active=true]:bg-sidebar-accent tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:!size-8 tw:group-data-[collapsible=icon]:!p-2 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        outline: "tw:bg-background tw:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
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
function vd({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: i,
  className: s,
  ref: a,
  ...l
}) {
  const c = t ? Ve : "button", { state: d } = Er(), w = /* @__PURE__ */ n(
    c,
    {
      ref: a,
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: h(bd({ variant: r, size: o }), s),
      ...l
    }
  );
  return i ? (typeof i == "string" && (i = {
    children: i
  }), /* @__PURE__ */ u(_t, { children: [
    /* @__PURE__ */ n(Tt, { asChild: !0, children: w }),
    /* @__PURE__ */ n(kt, { side: "right", align: "center", hidden: d !== "collapsed", ...i })
  ] })) : w;
}
function mu({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ n(
    e ? Ve : "button",
    {
      ref: o,
      "data-sidebar": "menu-action",
      className: h(
        "tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:absolute tw:right-1 tw:top-1.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:peer-data-[size=sm]/menu-button:top-1",
        "tw:peer-data-[size=default]/menu-button:top-1.5",
        "tw:peer-data-[size=lg]/menu-button:top-2.5",
        "tw:group-data-[collapsible=icon]:hidden",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground tw:data-[state=open]:opacity-100 tw:md:opacity-0",
        t
      ),
      ...i
    }
  );
}
function hu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-sidebar": "menu-badge",
      className: h(
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
function gu({
  className: t,
  showIcon: e = !1,
  ref: r,
  ...o
}) {
  const i = Q.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ u(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: h("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...o,
      children: [
        e && /* @__PURE__ */ n(nn, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ n(
          nn,
          {
            className: "tw:h-4 tw:max-w-[--skeleton-width] tw:flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // CSS custom property '--skeleton-width' is not in React.CSSProperties; cast is required
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": i
              }
            )
          }
        )
      ]
    }
  );
}
function bu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu-sub",
      className: h(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:flex-col tw:gap-1 tw:border-l tw:border-sidebar-border tw:px-2.5 tw:py-0.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...r
    }
  );
}
function vu({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ n("li", { ref: t, ...e });
}
function xu({
  asChild: t = !1,
  size: e = "md",
  isActive: r,
  className: o,
  ref: i,
  ...s
}) {
  return /* @__PURE__ */ n(
    t ? Ve : "a",
    {
      ref: i,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: h(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        "tw:data-[active=true]:bg-sidebar-accent tw:data-[active=true]:text-sidebar-accent-foreground",
        e === "sm" && "tw:text-xs",
        e === "md" && "tw:text-sm",
        "tw:group-data-[collapsible=icon]:hidden",
        o
      ),
      ...s
    }
  );
}
function xd({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: a,
  buttonPlaceholderText: l,
  className: c
}) {
  const d = K(
    (m, p) => {
      o(m, p);
    },
    [o]
  ), w = K(
    (m) => {
      const p = r.find((g) => g.projectId === m);
      return p ? p.projectName : m;
    },
    [r]
  ), f = K(
    (m) => !i.projectId && m === i.label,
    [i]
  );
  return /* @__PURE__ */ n(
    pd,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw:w-96 tw:gap-2 tw:overflow-y-auto", c),
      children: /* @__PURE__ */ u(md, { children: [
        /* @__PURE__ */ u(ao, { children: [
          /* @__PURE__ */ n(lo, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ n(co, { children: /* @__PURE__ */ n(hd, { children: Object.entries(e).map(([m, p]) => /* @__PURE__ */ n(gd, { children: /* @__PURE__ */ n(
            vd,
            {
              onClick: () => d(m),
              isActive: f(m),
              children: /* @__PURE__ */ n("span", { className: "tw:pl-3", children: p })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ u(ao, { children: [
          /* @__PURE__ */ n(lo, { className: "tw:text-sm", children: a }),
          /* @__PURE__ */ n(co, { className: "tw:pl-3", children: /* @__PURE__ */ n(
            Xr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": i == null ? void 0 : i.projectId
              }),
              popoverContentStyle: { zIndex: Ma },
              options: r.flatMap((m) => m.projectId),
              getOptionLabel: w,
              buttonPlaceholder: l,
              onChange: (m) => {
                const p = w(m);
                d(p, m);
              },
              value: (i == null ? void 0 : i.projectId) ?? void 0,
              icon: /* @__PURE__ */ n(ps, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const En = Xe(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: i, isDisabled: s = !1, id: a }, l) => {
    const c = dt();
    return /* @__PURE__ */ u("div", { id: a, className: h("tw:relative", { "tw:w-full": o }, i), children: [
      /* @__PURE__ */ n(
        po,
        {
          className: h(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": c === "rtl" },
            { "tw:left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ n(
        er,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (d) => e(d.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ u(
        B,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": c === "rtl" },
            { "tw:right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ n($e, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
En.displayName = "SearchBar";
function yu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: i,
  selectedSidebarItem: s,
  searchValue: a,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ n("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ n(
      En,
      {
        className: "tw:w-9/12",
        value: a,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      ud,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ n(
            xd,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: i,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ n(fd, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Qt = "scrBook", yd = "scrRef", he = "source", Nd = "details", _d = "Scripture Reference", kd = "Scripture Book", Ci = "Type", Cd = "Details";
function Ed(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Qt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? _d,
      cell: (o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? ct.bookIdToEnglishName(i.start.book) : o.row.groupingColumnId === Qt ? be(i.start) : void 0;
      },
      getGroupingValue: (o) => ct.bookIdToNumber(o.start.book),
      sortingFn: (o, i) => Gr(o.original.start, i.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => be(o.start),
      id: yd,
      header: void 0,
      cell: (o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? void 0 : be(i.start);
      },
      sortingFn: (o, i) => Gr(o.original.start, i.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: he,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ci : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, i) => o.original.source.displayName.localeCompare(i.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Nd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Cd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Td = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Gr(t.start, t.end) === 0 ? `${Tr(t.start)}+${e}` : `${Tr(t.start)}+${e}-${Tr(t.end)}+${r}`;
}, wo = (t) => `${Td({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Nu({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: i,
  typeColumnName: s,
  detailsColumnName: a,
  onRowSelected: l,
  id: c
}) {
  const [d, w] = S([]), [f, m] = S([{ id: Qt, desc: !1 }]), [p, g] = S({}), v = F(
    () => t.flatMap((C) => C.data.map((T) => ({
      ...T,
      source: C.source
    }))),
    [t]
  ), b = F(
    () => Ed(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: a
      },
      r
    ),
    [o, s, a, r]
  );
  q(() => {
    d.includes(he) ? m([
      { id: he, desc: !1 },
      { id: Qt, desc: !1 }
    ]) : m([{ id: Qt, desc: !1 }]);
  }, [d]);
  const x = Lo({
    data: v,
    columns: b,
    state: {
      grouping: d,
      sorting: f,
      rowSelection: p
    },
    onGroupingChange: w,
    onSortingChange: m,
    onRowSelectionChange: g,
    getExpandedRowModel: _a(),
    getGroupedRowModel: Na(),
    getCoreRowModel: Fo(),
    getSortedRowModel: jo(),
    getRowId: wo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const C = x.getSelectedRowModel().rowsById, T = Object.keys(C);
      if (T.length === 1) {
        const V = v.find(($) => wo($) === T[0]) || void 0;
        V && l(V);
      }
    }
  }, [p, v, l, x]);
  const y = i ?? kd, N = s ?? Ci, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Qt] },
    { label: `Group by ${N}`, value: [he] },
    {
      label: `Group by ${y} and ${N}`,
      value: [Qt, he]
    },
    {
      label: `Group by ${N} and ${y}`,
      value: [he, Qt]
    }
  ], L = (C) => {
    w(JSON.parse(C));
  }, j = (C, T) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(T);
  }, I = (C, T) => C.getIsGrouped() ? "" : h("banded-row", T % 2 === 0 ? "even" : "odd"), D = (C, T, V) => {
    if (!((C == null ? void 0 : C.length) === 0 || T.depth < V.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ u("div", { id: c, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ u(
      Me,
      {
        value: JSON.stringify(d),
        onValueChange: (C) => {
          L(C);
        },
        children: [
          /* @__PURE__ */ n(Ie, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ n(Oe, {}) }),
          /* @__PURE__ */ n(Ae, { position: "item-aligned", children: /* @__PURE__ */ n(kc, { children: k.map((C) => /* @__PURE__ */ n(Ot, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Nn, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ n(_n, { children: x.getHeaderGroups().map((C) => /* @__PURE__ */ n(te, { children: C.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ n(hr, { colSpan: T.colSpan, className: "tw:sticky top-0", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ n(
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
          Ge(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, C.id)) }),
      /* @__PURE__ */ n(kn, { children: x.getRowModel().rows.map((C, T) => {
        const V = dt();
        return /* @__PURE__ */ n(
          te,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: h(I(C, T)),
            onClick: ($) => j(C, $),
            children: C.getVisibleCells().map(($) => {
              if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== he || !r)))
                return /* @__PURE__ */ n(
                  Se,
                  {
                    className: h(
                      $.column.columnDef.id,
                      "tw:p-[1px]",
                      D(d, C, $)
                    ),
                    children: $.getIsGrouped() ? /* @__PURE__ */ u(
                      B,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ n(Pe, {}),
                          !C.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ n(Re, {}) : /* @__PURE__ */ n(Br, {})),
                          " ",
                          Ge($.column.columnDef.cell, $.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ge($.column.columnDef.cell, $.getContext())
                  },
                  $.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Tn = (t, e) => t.filter((r) => {
  try {
    return Ke(r) === e;
  } catch {
    return !1;
  }
}), Ei = (t, e, r) => Tn(t, e).every((o) => r.includes(o));
function Sd({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: i
}) {
  const s = Tn(e, t).length === 0, a = i["%scripture_section_ot_short%"], l = i["%scripture_section_nt_short%"], c = i["%scripture_section_dc_short%"], d = i["%scripture_section_extra_short%"];
  return /* @__PURE__ */ n(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        Ei(e, t, r) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Ka(
        t,
        a,
        l,
        c,
        d
      )
    }
  );
}
const uo = 5, Lr = 6;
function Rd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: i
}) {
  const s = o["%webView_book_selector_books_selected%"], a = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], d = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: m, ntLong: p, dcLong: g, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, x] = S(!1), [y, N] = S(""), k = H(void 0), L = H(!1);
  if (t.length !== ct.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const j = F(() => ct.allBookIds.filter(
    (A, Y) => t[Y] === "1" && !ct.isObsolete(ct.bookIdToNumber(A))
  ), [t]), I = F(() => {
    if (!y.trim()) {
      const M = {
        [W.OT]: [],
        [W.NT]: [],
        [W.DC]: [],
        [W.Extra]: []
      };
      return j.forEach((J) => {
        const Ct = Ke(J);
        M[Ct].push(J);
      }), M;
    }
    const A = j.filter(
      (M) => pn(M, y, i)
    ), Y = {
      [W.OT]: [],
      [W.NT]: [],
      [W.DC]: [],
      [W.Extra]: []
    };
    return A.forEach((M) => {
      const J = Ke(M);
      Y[J].push(M);
    }), Y;
  }, [j, y, i]), D = K(
    (A, Y = !1) => {
      if (!Y || !k.current) {
        r(
          e.includes(A) ? e.filter((ut) => ut !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = j.findIndex((ut) => ut === k.current), J = j.findIndex((ut) => ut === A);
      if (M === -1 || J === -1) return;
      const [Ct, Dt] = [
        Math.min(M, J),
        Math.max(M, J)
      ], St = j.slice(Ct, Dt + 1).map((ut) => ut);
      r(
        e.includes(A) ? e.filter((ut) => !St.includes(ut)) : [.../* @__PURE__ */ new Set([...e, ...St])]
      );
    },
    [e, r, j]
  ), C = (A) => {
    D(A, L.current), L.current = !1;
  }, T = (A, Y) => {
    A.preventDefault(), D(Y, A.shiftKey);
  }, V = K(
    (A) => {
      const Y = Tn(j, A).map((M) => M);
      r(
        Ei(j, A, e) ? e.filter((M) => !Y.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...Y])]
      );
    },
    [e, r, j]
  ), $ = () => {
    r(j.map((A) => A));
  }, O = () => {
    r([]);
  };
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(W).map((A) => /* @__PURE__ */ n(
      Sd,
      {
        section: A,
        availableBookIds: j,
        selectedBookIds: e,
        onToggle: V,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ u(
      Yt,
      {
        open: b,
        onOpenChange: (A) => {
          x(A), A || N("");
        },
        children: [
          /* @__PURE__ */ n(pe, { asChild: !0, children: /* @__PURE__ */ u(
            B,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : a,
                /* @__PURE__ */ n(bo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ n(Jt, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ u(
            we,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (L.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ n(
                  Qe,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: N
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: $, children: c }),
                  /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: O, children: d })
                ] }),
                /* @__PURE__ */ u(ue, { children: [
                  /* @__PURE__ */ n(yr, { children: w }),
                  Object.values(W).map((A, Y) => {
                    const M = I[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ u(No, { children: [
                        /* @__PURE__ */ n(
                          qt,
                          {
                            heading: Go(A, m, p, g, v),
                            children: M.map((J) => /* @__PURE__ */ n(
                              Uo,
                              {
                                bookId: J,
                                isSelected: e.includes(J),
                                onSelect: () => C(J),
                                onMouseDown: (Ct) => T(Ct, J),
                                section: Ke(J),
                                showCheck: !0,
                                localizedBookNames: i,
                                commandValue: Yr(J, i),
                                className: "tw:flex tw:items-center"
                              },
                              J
                            ))
                          }
                        ),
                        Y < Object.values(W).length - 1 && /* @__PURE__ */ n(Ko, {})
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
        e.length === Lr ? Lr : uo
      ).map((A) => /* @__PURE__ */ n(We, { className: "tw:hover:bg-secondary", variant: "secondary", children: Te(A, i) }, A)),
      e.length > Lr && /* @__PURE__ */ n(
        We,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - uo} ${f}`
        }
      )
    ] })
  ] });
}
const _u = Object.freeze([
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
function ku({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: i,
  onSelectedBookIdsChange: s,
  localizedStrings: a,
  localizedBookNames: l,
  id: c
}) {
  const d = fe(
    a,
    "%webView_scope_selector_selected_text%"
  ), w = fe(
    a,
    "%webView_scope_selector_current_verse%"
  ), f = fe(
    a,
    "%webView_scope_selector_current_chapter%"
  ), m = fe(a, "%webView_scope_selector_current_book%"), p = fe(a, "%webView_scope_selector_choose_books%"), g = fe(a, "%webView_scope_selector_scope%"), v = fe(a, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: d, id: "scope-selected-text" },
    { value: "verse", label: w, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: m, id: "scope-book" },
    { value: "selectedBooks", label: p, id: "scope-selected" }
  ], x = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ u("div", { id: c, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ n(pt, { children: g }),
      /* @__PURE__ */ n(
        qo,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: x.map(({ value: y, label: N, id: k }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ n(Jr, { className: "tw:me-2", value: y, id: k }),
            /* @__PURE__ */ n(pt, { htmlFor: k, children: N })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ n(pt, { children: v }),
      /* @__PURE__ */ n(
        Rd,
        {
          availableBookInfo: o,
          selectedBookIds: i,
          onChangeSelectedBookIds: s,
          localizedStrings: a,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const jr = {
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
function Cu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: i = "sm",
  className: s,
  id: a
}) {
  const l = {
    ...jr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([d, w]) => [
          d,
          d === w && d in jr ? jr[d] : w
        ]
      )
    )
  }, c = dt();
  return /* @__PURE__ */ u(
    Me,
    {
      value: `${e}`,
      onValueChange: (d) => r(
        d === "undefined" ? void 0 : parseInt(d, 10)
      ),
      children: [
        /* @__PURE__ */ n(Ie, { size: i, className: h("pr-twp tw:w-auto", s), children: /* @__PURE__ */ n(
          Oe,
          {
            placeholder: l[Z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ n(
          Ae,
          {
            id: a,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: Le },
            children: t.map((d) => /* @__PURE__ */ n(Ot, { value: `${d}`, children: l[Z(d)] }, `${d}`))
          }
        )
      ]
    }
  );
}
function Eu({ children: t }) {
  return /* @__PURE__ */ n("div", { className: "pr-twp tw:grid", children: t });
}
function Tu({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: i
}) {
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ n("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: i }) : /* @__PURE__ */ n("div", { children: r })
  ] });
}
function Su({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ n("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ n("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ n(Ye, {}) : ""
  ] });
}
function Ti(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function gr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ n(
    "img",
    {
      className: h("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Si = (t, e, r, o) => r ? Object.entries(t).filter(
  ([s, a]) => "column" in a && a.column === r || s === r
).sort(([, s], [, a]) => s.order - a.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ u(_t, { children: [
  /* @__PURE__ */ n(Tt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
    rn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ n(gr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ n(gr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ u(gc, { children: [
    /* @__PURE__ */ n(vc, { children: l.label }),
    /* @__PURE__ */ n(hc, { children: /* @__PURE__ */ n(xc, { children: Si(
      t,
      e,
      Ti(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ n(kt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function on({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: i,
  variant: s,
  buttonVariant: a = "ghost",
  id: l
}) {
  return /* @__PURE__ */ u(ae, { variant: s, children: [
    /* @__PURE__ */ n(ye, { "aria-label": r, className: i, asChild: !0, id: l, children: /* @__PURE__ */ n(B, { variant: a, size: "icon", children: o ?? /* @__PURE__ */ n(fs, {}) }) }),
    /* @__PURE__ */ n(le, { align: "start", style: { zIndex: Le }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, d]) => typeof c == "boolean" || typeof d == "boolean" ? 0 : c.order - d.order).map(([c], d, w) => /* @__PURE__ */ u(No, { children: [
      /* @__PURE__ */ n(yi, { children: /* @__PURE__ */ n(Nt, { children: Si(e.groups, e.items, c, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ n(tr, {})
    ] }, c)) })
  ] });
}
const Ri = Q.forwardRef(
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
function Ru({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: i,
  className: s,
  startAreaChildren: a,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: d
}) {
  return /* @__PURE__ */ u(Ri, { className: `tw:w-full tw:border ${s}`, id: i, children: [
    r && /* @__PURE__ */ n(
      on,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ n(ms, {}),
        buttonVariant: "ghost"
      }
    ),
    a && /* @__PURE__ */ n("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: a }),
    l && /* @__PURE__ */ n("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ n(
        on,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ n(hs, {}),
          className: "tw:h-full"
        }
      ),
      c
    ] })
  ] });
}
function Du({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: i
}) {
  return /* @__PURE__ */ n(Ri, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ n(
    on,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: i,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Di = Q.forwardRef(({ className: t, ...e }, r) => {
  const o = dt();
  return /* @__PURE__ */ n(
    $t.Root,
    {
      orientation: "vertical",
      ref: r,
      className: h("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Di.displayName = $t.List.displayName;
const Mi = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  $t.List,
  {
    ref: r,
    className: h(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Mi.displayName = $t.List.displayName;
const Dd = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  $t.Trigger,
  {
    ref: r,
    ...e,
    className: h(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Oi = Q.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  $t.Content,
  {
    ref: r,
    className: h(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Oi.displayName = $t.Content.displayName;
function Mu({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: i,
  searchClassName: s,
  id: a
}) {
  return /* @__PURE__ */ u("div", { id: a, className: "pr-twp", children: [
    /* @__PURE__ */ u("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      i ? /* @__PURE__ */ n("h1", { children: i }) : "",
      /* @__PURE__ */ n(
        En,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Di, { children: [
      /* @__PURE__ */ n(Mi, { children: t.map((l) => /* @__PURE__ */ n(Dd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ n(Oi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Md({ ...t }) {
  return /* @__PURE__ */ n(jt.Menu, { ...t });
}
function Od({ ...t }) {
  return /* @__PURE__ */ n(jt.Sub, { "data-slot": "menubar-sub", ...t });
}
function Id({
  className: t,
  variant: e = "default",
  ref: r,
  ...o
}) {
  const i = Q.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ n(yn.Provider, { value: i, children: /* @__PURE__ */ n(
    jt.Root,
    {
      ref: r,
      className: h(
        "tw:flex tw:h-9 tw:items-center tw:space-x-1 tw:rounded-md tw:border tw:bg-background tw:p-1 tw:shadow-sm",
        t
      ),
      ...o
    }
  ) });
}
function Ad({
  className: t,
  ref: e,
  ...r
}) {
  const o = Xt();
  return /* @__PURE__ */ n(
    jt.Trigger,
    {
      ref: e,
      className: h(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        _e({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...r
    }
  );
}
function $d({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...i
}) {
  const s = Xt();
  return /* @__PURE__ */ u(
    jt.SubTrigger,
    {
      ref: o,
      className: h(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        _e({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...i,
      children: [
        r,
        /* @__PURE__ */ n(Re, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Pd({
  className: t,
  ref: e,
  ...r
}) {
  const o = Xt();
  return /* @__PURE__ */ n(
    jt.SubContent,
    {
      ref: e,
      className: h(
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
function Vd({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ref: i,
  ...s
}) {
  const a = Xt();
  return /* @__PURE__ */ n(jt.Portal, { children: /* @__PURE__ */ n(
    jt.Content,
    {
      ref: i,
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: h(
        "tw:z-50 tw:min-w-[12rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": a.variant === "muted"
        },
        t
      ),
      ...s
    }
  ) });
}
function Ld({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  const i = Xt();
  return /* @__PURE__ */ n(
    jt.Item,
    {
      ref: r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        _e({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o
    }
  );
}
function jd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    jt.Separator,
    {
      ref: e,
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
const Be = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Ii = (t, e, r, o) => {
  if (!r) return;
  const i = Object.entries(t).filter(
    ([s, a]) => "column" in a && a.column === r || s === r
  ).sort(([, s], [, a]) => s.order - a.order);
  return i.flatMap(([s], a) => {
    const l = e.filter((d) => d.group === s).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(_t, { children: [
      /* @__PURE__ */ n(Tt, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        Ld,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ n(gr, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ n(gr, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(Od, { children: [
        /* @__PURE__ */ n($d, { children: d.label }),
        /* @__PURE__ */ n(Pd, { children: Ii(
          t,
          e,
          Ti(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ n(kt, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), c = [...l];
    return l.length > 0 && a < i.length - 1 && c.push(/* @__PURE__ */ n(jd, {}, `separator-${s}`)), c;
  });
};
function Fd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const i = H(void 0), s = H(void 0), a = H(void 0), l = H(void 0), c = H(void 0), d = (w) => {
    switch (w) {
      case "platform.app":
        return s;
      case "platform.window":
        return a;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Ta(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, f) => {
    var g, v, b, x;
    w.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        Be(s, [m]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Be(s, [m, p]);
        break;
      case "alt+l":
        (v = a.current) == null || v.focus(), Be(a, [m, p]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Be(l, [m, p]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), Be(c, [m, p]);
        break;
    }
  }), q(() => {
    if (!r || !i.current) return;
    const w = new MutationObserver((p) => {
      p.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          r(v === "open");
        }
      });
    });
    return i.current.querySelectorAll("[data-state]").forEach((p) => {
      w.observe(p, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ n(Id, { ref: i, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, f]) => typeof w == "boolean" || typeof f == "boolean" ? 0 : w.order - f.order).map(([w, f]) => /* @__PURE__ */ u(Md, { children: [
      /* @__PURE__ */ n(Ad, { ref: d(w), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ n(
        Vd,
        {
          style: { zIndex: Le },
          children: /* @__PURE__ */ n(Nt, { children: Ii(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function Ou(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Iu({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: i,
  children: s,
  appMenuAreaChildren: a,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: d = "default"
}) {
  const w = H(void 0);
  return /* @__PURE__ */ n(
    "div",
    {
      className: h("tw:border tw:px-4 tw:text-foreground", o),
      ref: w,
      style: { position: "relative" },
      id: i,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ n("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  a,
                  t && /* @__PURE__ */ n(
                    Fd,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: d
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ n("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ n(
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
const Bd = (t, e) => t[e] ?? e;
function Au({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: i,
  onFallbackLanguagesChange: s,
  localizedStrings: a,
  className: l,
  id: c
}) {
  const d = Bd(
    a,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, f] = S(!1), m = (g) => {
    i && i(g), o && o([g, ...r.filter((v) => v !== g)]), s && r.find((v) => v === g) && s([...r.filter((v) => v !== g)]), f(!1);
  }, p = (g, v) => {
    var x, y, N, k, L, j;
    const b = v !== g ? ((y = (x = t[g]) == null ? void 0 : x.uiNames) == null ? void 0 : y[v]) ?? ((k = (N = t[g]) == null ? void 0 : N.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(L = t[g]) == null ? void 0 : L.autonym} (${b})` : (j = t[g]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ u("div", { id: c, className: h("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ u(
      Me,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: m,
        open: w,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ n(Ie, { children: /* @__PURE__ */ n(Oe, {}) }),
          /* @__PURE__ */ n(
            Ae,
            {
              style: { zIndex: Le },
              children: Object.keys(t).map((g) => /* @__PURE__ */ n(Ot, { value: g, children: p(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ n("div", { className: "tw:pt-3", children: /* @__PURE__ */ n(pt, { className: "tw:font-normal tw:text-muted-foreground", children: ge(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((g) => p(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Kd({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ n(pt, { children: e(t) }) : r ? /* @__PURE__ */ n(pt, { children: r(t) }) : /* @__PURE__ */ n(pt, { children: t });
}
function $u({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s,
  createComplexLabel: a
}) {
  return /* @__PURE__ */ n("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ n(
      _i,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => i(l, c)
      }
    ),
    /* @__PURE__ */ n(
      Kd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: a
      }
    )
  ] }, l)) });
}
function Pu({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: i = !1,
  className: s,
  children: a,
  selectedButtons: l,
  hoverButtons: c,
  dropdownContent: d,
  additionalContent: w,
  accentColor: f,
  showDropdownOnHover: m = !1
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: i,
      onClick: r,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), r());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: h(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ n("div", { className: "tw:min-w-0 tw:flex-1", children: a }),
            e && l,
            !e && c && /* @__PURE__ */ n("div", { className: "tw:invisible tw:group-hover:visible", children: c }),
            !e && m && d && /* @__PURE__ */ n("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(ae, { children: [
              /* @__PURE__ */ n(ye, { className: h(f && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ n(B, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ n(On, {}) }) }),
              /* @__PURE__ */ n(le, { align: "end", children: d })
            ] }) }),
            e && d && /* @__PURE__ */ u(ae, { children: [
              /* @__PURE__ */ n(ye, { className: h(f && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ n(B, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ n(On, {}) }) }),
              /* @__PURE__ */ n(le, { align: "end", children: d })
            ] })
          ] }),
          w && /* @__PURE__ */ n("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        f && /* @__PURE__ */ n(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${f}`
          }
        )
      ]
    },
    t
  );
}
const Gd = Xe(({ className: t, ...e }, r) => /* @__PURE__ */ n(gs, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
Gd.displayName = "Spinner";
function Vu({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: a,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: w,
  onChange: f,
  onFocus: m,
  onBlur: p
}) {
  return /* @__PURE__ */ u("div", { className: h("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ n(
      pt,
      {
        htmlFor: t,
        className: h({
          "tw:text-red-600": r,
          "tw:hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ n(
      er,
      {
        id: t,
        disabled: e,
        placeholder: a,
        required: l,
        className: h(c, { "tw:border-red-600": r }),
        defaultValue: d,
        value: w,
        onChange: f,
        onFocus: m,
        onBlur: p
      }
    ),
    /* @__PURE__ */ n("p", { className: h({ "tw:hidden": !i }), children: i })
  ] });
}
const zd = ce(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw:relative tw:w-full tw:rounded-lg tw:border tw:px-4 tw:py-3 tw:text-sm tw:[&>svg+div]:translate-y-[-3px] tw:[&>svg]:absolute tw:[&>svg]:left-4 tw:[&>svg]:top-4 tw:[&>svg]:text-foreground tw:[&>svg~*]:pl-7 tw:[&>img+div]:translate-y-[-3px] tw:[&>img]:absolute tw:[&>img]:left-4 tw:[&>img]:top-4 tw:[&>img]:text-foreground tw:[&>img~*]:pl-7",
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
function Lu({
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
      className: h(
        // CUSTOM
        "pr-twp",
        zd({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function ju({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    "h5",
    {
      ref: e,
      className: h("tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight", t),
      ...r,
      children: [
        r.children,
        " "
      ]
    }
  );
}
function Fu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n("div", { ref: e, className: h("tw:text-sm tw:[&_p]:leading-relaxed", t), ...r });
}
const Bu = mt.Root, Ku = mt.Trigger, Gu = mt.Group, zu = mt.Portal, Uu = mt.Sub, Hu = mt.RadioGroup;
function qu({
  className: t,
  inset: e,
  children: r,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ u(
    mt.SubTrigger,
    {
      ref: o,
      className: h(
        "pr-twp tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        t
      ),
      ...i,
      children: [
        r,
        /* @__PURE__ */ n(Re, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Wu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    mt.SubContent,
    {
      ref: e,
      className: h(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
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
  return /* @__PURE__ */ n(mt.Portal, { children: /* @__PURE__ */ n(
    mt.Content,
    {
      ref: e,
      className: h(
        "pr-twp tw:z-50 tw:max-h-[--radix-context-menu-content-available-height] tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-y-auto tw:overflow-x-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  ) });
}
function Ju({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    mt.Item,
    {
      ref: r,
      className: h(
        "pr-twp tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function Xu({
  className: t,
  children: e,
  checked: r,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ u(
    mt.CheckboxItem,
    {
      ref: o,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      checked: r,
      ...i,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(mt.ItemIndicator, { children: /* @__PURE__ */ n(Ft, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function Zu({
  className: t,
  children: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    mt.RadioItem,
    {
      ref: r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ n(mt.ItemIndicator, { children: /* @__PURE__ */ n(sn, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Qu({
  className: t,
  inset: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    mt.Label,
    {
      ref: r,
      className: h(
        "tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-foreground",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function tp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    mt.Separator,
    {
      ref: e,
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function ep({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: h("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ai = Q.createContext({
  direction: "bottom"
});
function rp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const o = Q.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ n(Ai.Provider, { value: o, children: /* @__PURE__ */ n(
    de.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
const np = de.Trigger, Ud = de.Portal, op = de.Close;
function Hd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    de.Overlay,
    {
      ref: e,
      className: h("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...r
    }
  );
}
function ip({
  className: t,
  children: e,
  hideDrawerHandle: r = !1,
  ref: o,
  ...i
}) {
  const { direction: s = "bottom" } = Q.useContext(Ai), a = {
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
  return /* @__PURE__ */ u(Ud, { children: [
    /* @__PURE__ */ n(Hd, {}),
    /* @__PURE__ */ u(
      de.Content,
      {
        ref: o,
        className: h(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw:inset-x-0 tw:bottom-0 tw:mt-24 tw:rounded-t-[10px] tw:flex-col
          "pr-twp tw:fixed tw:z-50 tw:flex tw:h-auto tw:border tw:bg-background",
          s === "bottom" || s === "top" ? "tw:flex-col" : "tw:flex-row",
          a[s],
          t
        ),
        ...i,
        children: [
          !r && (s === "bottom" || s === "right") && /* @__PURE__ */ n("div", { className: l[s] }),
          /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-col", children: e }),
          !r && (s === "top" || s === "left") && /* @__PURE__ */ n("div", { className: l[s] })
        ]
      }
    )
  ] });
}
function sp({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: h("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function ap({ className: t, ...e }) {
  return /* @__PURE__ */ n("div", { className: h("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function lp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    de.Title,
    {
      ref: e,
      className: h("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function cp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    de.Description,
    {
      ref: e,
      className: h("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function dp({
  className: t,
  value: e,
  ref: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    Bn.Root,
    {
      ref: r,
      className: h(
        "pr-twp tw:relative tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-primary/20",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n(
        Bn.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function wp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    wn.PanelGroup,
    {
      className: h(
        "tw:flex tw:h-full tw:w-full tw:data-[panel-group-direction=vertical]:flex-col",
        t
      ),
      ...e
    }
  );
}
const up = wn.Panel;
function pp({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    wn.PanelResizeHandle,
    {
      className: h(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:data-[panel-group-direction=vertical]:h-px tw:data-[panel-group-direction=vertical]:w-full tw:data-[panel-group-direction=vertical]:after:left-0 tw:data-[panel-group-direction=vertical]:after:h-1 tw:data-[panel-group-direction=vertical]:after:w-full tw:data-[panel-group-direction=vertical]:after:-translate-y-1/2 tw:data-[panel-group-direction=vertical]:after:translate-x-0 tw:[&[data-panel-group-direction=vertical]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ n(bs, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function fp({ ...t }) {
  return /* @__PURE__ */ n(
    Sa,
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
function mp({
  className: t,
  ref: e,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ u(
    or.Root,
    {
      ref: e,
      className: h(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...r,
      dir: o,
      children: [
        /* @__PURE__ */ n(or.Track, { className: "tw:relative tw:h-1.5 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-primary/20", children: /* @__PURE__ */ n(or.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ n(or.Thumb, { className: "tw:block tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary/50 tw:bg-background tw:shadow tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function hp({
  className: t,
  ref: e,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ n(
    Kn.Root,
    {
      className: h(
        "tw:peer pr-twp tw:inline-flex tw:h-5 tw:w-9 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:shadow-sm tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...r,
      ref: e,
      children: /* @__PURE__ */ n(
        Kn.Thumb,
        {
          className: h(
            "pr-twp tw:pointer-events-none tw:block tw:h-4 tw:w-4 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform",
            {
              "tw:data-[state=checked]:translate-x-4 tw:data-[state=unchecked]:translate-x-0": o === "ltr"
            },
            {
              "tw:data-[state=checked]:translate-x-[-16px] tw:data-[state=unchecked]:translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
}
const gp = $t.Root;
function bp({
  className: t,
  ref: e,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ n(
    $t.List,
    {
      ref: e,
      className: h(
        "pr-twp tw:inline-flex tw:h-9 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:p-1 tw:text-muted-foreground",
        t
      ),
      ...r,
      dir: o
    }
  );
}
function vp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    $t.Trigger,
    {
      ref: e,
      className: h(
        "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:whitespace-nowrap tw:rounded-md tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-all tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow",
        t
      ),
      ...r
    }
  );
}
function xp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    $t.Content,
    {
      ref: e,
      className: h(
        "pr-twp tw:mt-2 tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
        t
      ),
      ...r
    }
  );
}
function yp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "textarea",
    {
      className: h(
        "pr-twp tw:flex tw:min-h-[60px] tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-sm tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: e,
      ...r
    }
  );
}
const Np = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function qd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Wd = (t, e, r = {}) => {
  const o = H(e);
  o.current = e;
  const i = H(r);
  i.current = qd(i.current);
  const [s, a] = S(() => o.current), [l, c] = S(!0);
  return q(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const w = await t();
        d && (a(() => w), c(!1));
      }
    })(), () => {
      d = !1, i.current.preserveValue || a(() => o.current);
    };
  }, [t]), [s, l];
}, Fr = () => !1, _p = (t, e) => {
  const [r] = Wd(
    K(async () => {
      if (!t) return Fr;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Fr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    r !== Fr && r();
  }, [r]);
};
function kp(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Yd(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), i = document.createElement("style");
  i.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(i, o) : r.appendChild(i);
}
Yd(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--spacing:.25rem;--font-weight-medium:500;--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{.pr-twp *,.pr-twp :after,.pr-twp :before,.pr-twp ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}.pr-twp hr{height:0;color:inherit;border-top-width:1px}.pr-twp abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}.pr-twp h1,.pr-twp h2,.pr-twp h3,.pr-twp h4,.pr-twp h5,.pr-twp h6{font-size:inherit;font-weight:inherit}.pr-twp a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}.pr-twp b,.pr-twp strong{font-weight:bolder}.pr-twp code,.pr-twp kbd,.pr-twp samp,.pr-twp pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}.pr-twp small{font-size:80%}.pr-twp sub,.pr-twp sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}.pr-twp sub{bottom:-.25em}.pr-twp sup{top:-.5em}.pr-twp table{text-indent:0;border-color:inherit;border-collapse:collapse}.pr-twp :-moz-focusring{outline:auto}.pr-twp progress{vertical-align:baseline}.pr-twp summary{display:list-item}.pr-twp ol,.pr-twp ul,.pr-twp menu{list-style:none}.pr-twp img,.pr-twp svg,.pr-twp video,.pr-twp canvas,.pr-twp audio,.pr-twp iframe,.pr-twp embed,.pr-twp object{vertical-align:middle;display:block}.pr-twp img,.pr-twp video{max-width:100%;height:auto}.pr-twp button,.pr-twp input,.pr-twp select,.pr-twp optgroup,.pr-twp textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}.pr-twp ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}.pr-twp :where(select:is([multiple],[size])) optgroup{font-weight:bolder}.pr-twp :where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}.pr-twp ::file-selector-button{margin-inline-end:4px}.pr-twp ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){.pr-twp ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){.pr-twp ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}.pr-twp textarea{resize:vertical}.pr-twp ::-webkit-search-decoration{-webkit-appearance:none}.pr-twp ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}.pr-twp ::-webkit-datetime-edit{display:inline-flex}.pr-twp ::-webkit-datetime-edit-fields-wrapper{padding:0}.pr-twp ::-webkit-datetime-edit{padding-block:0}.pr-twp ::-webkit-datetime-edit-year-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-month-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-day-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-hour-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-minute-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-second-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-millisecond-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-meridiem-field{padding-block:0}.pr-twp ::-webkit-calendar-picker-indicator{line-height:1}.pr-twp :-moz-ui-invalid{box-shadow:none}.pr-twp button,.pr-twp input:where([type=button],[type=reset],[type=submit]){appearance:button}.pr-twp ::file-selector-button{appearance:button}.pr-twp ::-webkit-inner-spin-button{height:auto}.pr-twp ::-webkit-outer-spin-button{height:auto}.pr-twp [hidden]:where(:not([hidden=until-found])){display:none!important}@font-face{font-family:Inter;font-display:"swap";src:url(https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap)}:root{--background:0 0% 100%;--foreground:222.2 84% 4.9%;--card:0 0% 100%;--card-foreground:222.2 84% 4.9%;--popover:210 20% 98%;--popover-foreground:222.2 84% 4.9%;--primary:222.2 47.4% 11.2%;--primary-foreground:210 40% 98%;--secondary:210 50% 95%;--secondary-foreground:222.2 47.4% 11.2%;--muted:210 50% 95%;--muted-foreground:215.4 16.3% 46.9%;--accent:210 50% 95%;--accent-foreground:222.2 47.4% 11.2%;--destructive:0 84.2% 60.2%;--destructive-foreground:210 40% 98%;--border:214.3 31.8% 91.4%;--input:214.3 31.8% 91.4%;--ring:222.2 84% 4.9%;--sidebar-background:210 20% 98%;--sidebar-foreground:222.2 84% 4.9%;--sidebar-primary:222.2 47.4% 11.2%;--sidebar-primary-foreground:210 40% 98%;--sidebar-accent:210 50% 95%;--sidebar-accent-foreground:222.2 47.4% 11.2%;--sidebar-border:214.3 31.8% 91.4%;--sidebar-ring:222.2 84% 4.9%;--radius:.5rem}.dark{--background:222.2 84% 4.9%;--foreground:210 40% 98%;--card:222.2 84% 4.9%;--card-foreground:210 40% 98%;--popover:222.2 84% 4.9%;--popover-foreground:210 40% 98%;--primary:210 40% 98%;--primary-foreground:222.2 47.4% 11.2%;--secondary:217.2 32.6% 17.5%;--secondary-foreground:210 40% 98%;--muted:217.2 32.6% 17.5%;--muted-foreground:215 20.2% 65.1%;--accent:217.2 32.6% 17.5%;--accent-foreground:210 40% 98%;--destructive:0 62.8% 30.6%;--destructive-foreground:210 40% 98%;--border:215.3 19.3% 34.5%;--input:215.3 19.3% 34.5%;--ring:212.7 26.8% 83.9%;--sidebar-background:222.2 84% 4.9%;--sidebar-foreground:215 20.2% 65.1%;--sidebar-primary:210 40% 98%;--sidebar-primary-foreground:222.2 47.4% 11.2%;--sidebar-accent:217.2 32.6% 17.5%;--sidebar-accent-foreground:215 20.2% 65.1%;--sidebar-border:217.2 32.6% 17.5%;--sidebar-ring:212.7 26.8% 83.9%}.paratext-light{--background:0 0% 97.6471%;--foreground:0 0% 12.549%;--muted:0 0% 93.7255%;--muted-foreground:0 0% 39.2157%;--popover:0 0% 98.8235%;--popover-foreground:0 0% 12.549%;--card:0 0% 98.8235%;--card-foreground:0 0% 12.549%;--border:0 0% 84.7059%;--input:0 0% 84.7059%;--primary:171.429 81.8182% 15.098%;--primary-foreground:0 0% 100%;--secondary:34.0541 100% 85.4902%;--secondary-foreground:16.2712 50.4274% 22.9412%;--accent:0 0% 90.9804%;--accent-foreground:0 0% 12.549%;--destructive:10.1639 77.8723% 53.9216%;--destructive-foreground:0 0% 100%;--ring:16.6667 21.9512% 32.1569%;--sidebar-background:0 0% 98.4314%;--sidebar-foreground:0 0% 14.5098%;--sidebar-primary:0 0% 20.3922%;--sidebar-primary-foreground:0 0% 98.4314%;--sidebar-accent:0 0% 93.7255%;--sidebar-accent-foreground:0 0% 20.3922%;--sidebar-border:0 0% 92.1569%;--sidebar-ring:0 0% 70.9804%}.paratext-dark{--background:0 0% 6.6667%;--foreground:0 0% 93.3333%;--muted:0 0% 13.3333%;--muted-foreground:0 0% 70.5882%;--popover:0 0% 9.8039%;--popover-foreground:0 0% 93.3333%;--card:0 0% 9.8039%;--card-foreground:0 0% 93.3333%;--border:45 14.2857% 10.9804%;--input:0 0% 28.2353%;--primary:40 85.7143% 97.2549%;--primary-foreground:183.158 54.2857% 6.8627%;--secondary:28.2353 17.5258% 19.0196%;--secondary-foreground:29.5082 100% 88.0392%;--accent:0 0% 16.4706%;--accent-foreground:0 0% 93.3333%;--destructive:10.1639 77.8723% 53.9216%;--destructive-foreground:0 0% 100%;--ring:29.5082 100% 88.0392%;--sidebar-background:240 5.8824% 10%;--sidebar-foreground:240 4.7619% 95.8824%;--sidebar-primary:224.278 76.3265% 48.0392%;--sidebar-primary-foreground:0 0% 100%;--sidebar-accent:240 3.7037% 15.8824%;--sidebar-accent-foreground:240 4.7619% 95.8824%;--sidebar-border:240 3.7037% 15.8824%;--sidebar-ring:240 4.878% 83.9216%}.pr-twp,.pr-twp *{border-color:hsl(var(--border));outline-color:hsl(var(--ring) / .5)}body.pr-twp{background-color:hsl(var(--background));color:hsl(var(--foreground))}}@layer components;@layer utilities{.\\@container{container-type:inline-size}.collapse{visibility:collapse}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.top-0{top:calc(var(--spacing) * 0)}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.container{margin-inline:auto;padding-inline:2rem}@media (min-width:40rem){.container{max-width:none}}@media (min-width:1400px){.container{max-width:1400px}}.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"""""""'""'";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.prose{--tw-prose-body:hsl(var(--foreground));--tw-prose-headings:hsl(var(--foreground));--tw-prose-lead:hsl(var(--muted-foreground));--tw-prose-links:hsl(var(--primary));--tw-prose-bold:hsl(var(--foreground));--tw-prose-counters:hsl(var(--muted-foreground));--tw-prose-bullets:hsl(var(--muted-foreground));--tw-prose-hr:hsl(var(--border));--tw-prose-quotes:hsl(var(--foreground));--tw-prose-quote-borders:hsl(var(--border));--tw-prose-captions:hsl(var(--muted-foreground));--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:hsl(var(--foreground));--tw-prose-pre-code:hsl(var(--muted-foreground));--tw-prose-pre-bg:hsl(var(--muted));--tw-prose-th-borders:hsl(var(--border));--tw-prose-td-borders:hsl(var(--border));--tw-prose-invert-body:oklch(87.2% .01 258.338);--tw-prose-invert-headings:#fff;--tw-prose-invert-lead:oklch(70.7% .022 261.325);--tw-prose-invert-links:#fff;--tw-prose-invert-bold:#fff;--tw-prose-invert-counters:oklch(70.7% .022 261.325);--tw-prose-invert-bullets:oklch(44.6% .03 256.802);--tw-prose-invert-hr:oklch(37.3% .034 259.733);--tw-prose-invert-quotes:oklch(96.7% .003 264.542);--tw-prose-invert-quote-borders:oklch(37.3% .034 259.733);--tw-prose-invert-captions:oklch(70.7% .022 261.325);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:#fff;--tw-prose-invert-pre-code:oklch(87.2% .01 258.338);--tw-prose-invert-pre-bg:#00000080;--tw-prose-invert-th-borders:oklch(44.6% .03 256.802);--tw-prose-invert-td-borders:oklch(37.3% .034 259.733);font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.-mt-4{margin-top:calc(var(--spacing) * -4)}.mt-4{margin-top:calc(var(--spacing) * 4)}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.table{display:table}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.w-4{width:calc(var(--spacing) * 4)}.w-\\[100px\\]{width:100px}.flex-shrink,.shrink{flex-shrink:1}.flex-grow{flex-grow:1}.border-collapse{border-collapse:collapse}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.gap-2{gap:calc(var(--spacing) * 2)}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-clip{overflow:clip}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.bg-primary{background-color:hsl(var(--primary))}.bg-secondary{background-color:hsl(var(--secondary))}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-wrap{text-wrap:wrap}.\\[color\\:red\\]{color:red}.text-primary-foreground{color:hsl(var(--primary-foreground))}.text-secondary{color:hsl(var(--secondary))}.text-secondary-foreground{color:hsl(var(--secondary-foreground))}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.ordinal{--tw-ordinal:ordinal;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.line-through{text-decoration-line:line-through}.underline{text-decoration-line:underline}.accent-foreground{accent-color:hsl(var(--foreground))}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-input{--tw-ring-color:hsl(var(--input))}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.\\[--lexical-indent-base-value\\:40px\\]{--lexical-indent-base-value:40px}.group-\\[\\.toast\\]\\:bg-muted:is(:where(.group).toast *){background-color:hsl(var(--muted))}.group-\\[\\.toast\\]\\:bg-primary:is(:where(.group).toast *){background-color:hsl(var(--primary))}.group-\\[\\.toast\\]\\:text-muted-foreground:is(:where(.group).toast *){color:hsl(var(--muted-foreground))}.group-\\[\\.toast\\]\\:text-primary-foreground:is(:where(.group).toast *){color:hsl(var(--primary-foreground))}.group-\\[\\.toaster\\]\\:border-border:is(:where(.group).toaster *){border-color:hsl(var(--border))}.group-\\[\\.toaster\\]\\:bg-background:is(:where(.group).toaster *){background-color:hsl(var(--background))}.group-\\[\\.toaster\\]\\:text-foreground:is(:where(.group).toaster *){color:hsl(var(--foreground))}.group-\\[\\.toaster\\]\\:shadow-lg:is(:where(.group).toaster *){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}
`, "after-all");
export {
  Lu as Alert,
  Fu as AlertDescription,
  ju as AlertTitle,
  fc as Avatar,
  mc as AvatarFallback,
  Vw as AvatarImage,
  Tw as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Sw as BOOK_SELECTOR_STRING_KEYS,
  We as Badge,
  Ew as BookChapterControl,
  Zr as BookSelectionMode,
  Rw as BookSelector,
  B as Button,
  Mw as COMMENT_EDITOR_STRING_KEYS,
  Ow as COMMENT_LIST_STRING_KEYS,
  uc as Card,
  pc as CardContent,
  $w as CardDescription,
  Pw as CardFooter,
  Iw as CardHeader,
  Aw as CardTitle,
  Ja as ChapterRangeSelector,
  _i as Checkbox,
  $u as Checklist,
  Xr as ComboBox,
  we as Command,
  yr as CommandEmpty,
  qt as CommandGroup,
  Qe as CommandInput,
  Wt as CommandItem,
  ue as CommandList,
  Dw as CommentEditor,
  jw as CommentList,
  Bu as ContextMenu,
  Xu as ContextMenuCheckboxItem,
  Yu as ContextMenuContent,
  Gu as ContextMenuGroup,
  Ju as ContextMenuItem,
  Qu as ContextMenuLabel,
  zu as ContextMenuPortal,
  Hu as ContextMenuRadioGroup,
  Zu as ContextMenuRadioItem,
  tp as ContextMenuSeparator,
  ep as ContextMenuShortcut,
  Uu as ContextMenuSub,
  Wu as ContextMenuSubContent,
  qu as ContextMenuSubTrigger,
  Ku as ContextMenuTrigger,
  Ic as DataTable,
  $a as Dialog,
  Nw as DialogClose,
  La as DialogContent,
  kw as DialogDescription,
  _w as DialogFooter,
  ja as DialogHeader,
  Va as DialogOverlay,
  Pa as DialogPortal,
  Fa as DialogTitle,
  yw as DialogTrigger,
  rp as Drawer,
  op as DrawerClose,
  ip as DrawerContent,
  cp as DrawerDescription,
  ap as DrawerFooter,
  sp as DrawerHeader,
  Hd as DrawerOverlay,
  Ud as DrawerPortal,
  lp as DrawerTitle,
  np as DrawerTrigger,
  ae as DropdownMenu,
  ne as DropdownMenuCheckboxItem,
  le as DropdownMenuContent,
  yi as DropdownMenuGroup,
  rn as DropdownMenuItem,
  Pc as DropdownMenuItemType,
  kr as DropdownMenuLabel,
  hc as DropdownMenuPortal,
  bc as DropdownMenuRadioGroup,
  yc as DropdownMenuRadioItem,
  tr as DropdownMenuSeparator,
  Lw as DropdownMenuShortcut,
  gc as DropdownMenuSub,
  xc as DropdownMenuSubContent,
  vc as DropdownMenuSubTrigger,
  ye as DropdownMenuTrigger,
  Ac as ERROR_DUMP_STRING_KEYS,
  Uw as ERROR_POPOVER_STRING_KEYS,
  Bc as EditorKeyboardShortcuts,
  $c as ErrorDump,
  Hw as ErrorPopover,
  Zw as FOOTNOTE_EDITOR_STRING_KEYS,
  Jw as Filter,
  qw as FilterDropdown,
  Yw as Footer,
  Xw as FootnoteEditor,
  rd as FootnoteItem,
  Qw as FootnoteList,
  su as INVENTORY_STRING_KEYS,
  er as Input,
  au as Inventory,
  pt as Label,
  qc as MARKER_MENU_STRING_KEYS,
  zw as MarkdownRenderer,
  Yc as MarkerMenu,
  Ww as MoreInfo,
  Lc as MultiSelectComboBox,
  Mu as NavigationContentSearch,
  Yt as Popover,
  Ga as PopoverAnchor,
  Jt as PopoverContent,
  pe as PopoverTrigger,
  dp as Progress,
  qo as RadioGroup,
  Jr as RadioGroupItem,
  za as RecentSearches,
  pp as ResizableHandle,
  up as ResizablePanel,
  wp as ResizablePanelGroup,
  Pu as ResultsCard,
  _u as SCOPE_SELECTOR_STRING_KEYS,
  ku as ScopeSelector,
  Nu as ScriptureResultsViewer,
  Cu as ScrollGroupSelector,
  En as SearchBar,
  Me as Select,
  Ae as SelectContent,
  kc as SelectGroup,
  Ot as SelectItem,
  Fw as SelectLabel,
  Tc as SelectScrollDownButton,
  Ec as SelectScrollUpButton,
  Bw as SelectSeparator,
  Ie as SelectTrigger,
  Oe as SelectValue,
  Ye as Separator,
  Eu as SettingsList,
  Su as SettingsListHeader,
  Tu as SettingsListItem,
  xd as SettingsSidebar,
  yu as SettingsSidebarContentSearch,
  pd as Sidebar,
  md as SidebarContent,
  uu as SidebarFooter,
  ao as SidebarGroup,
  fu as SidebarGroupAction,
  co as SidebarGroupContent,
  lo as SidebarGroupLabel,
  wu as SidebarHeader,
  du as SidebarInput,
  fd as SidebarInset,
  hd as SidebarMenu,
  mu as SidebarMenuAction,
  hu as SidebarMenuBadge,
  vd as SidebarMenuButton,
  gd as SidebarMenuItem,
  gu as SidebarMenuSkeleton,
  bu as SidebarMenuSub,
  xu as SidebarMenuSubButton,
  vu as SidebarMenuSubItem,
  ud as SidebarProvider,
  cu as SidebarRail,
  pu as SidebarSeparator,
  lu as SidebarTrigger,
  nn as Skeleton,
  mp as Slider,
  fp as Sonner,
  Gd as Spinner,
  hp as Switch,
  on as TabDropdownMenu,
  Du as TabFloatingMenu,
  Ru as TabToolbar,
  Nn as Table,
  kn as TableBody,
  Gw as TableCaption,
  Se as TableCell,
  Kw as TableFooter,
  hr as TableHead,
  _n as TableHeader,
  te as TableRow,
  gp as Tabs,
  xp as TabsContent,
  bp as TabsList,
  vp as TabsTrigger,
  Vu as TextField,
  yp as Textarea,
  mi as ToggleGroup,
  dr as ToggleGroupItem,
  Iu as Toolbar,
  _t as Tooltip,
  kt as TooltipContent,
  Nt as TooltipProvider,
  Tt as TooltipTrigger,
  jc as UNDO_REDO_BUTTONS_STRING_KEYS,
  Au as UiLanguageSelector,
  Fc as UndoRedoButtons,
  Di as VerticalTabs,
  Oi as VerticalTabsContent,
  Mi as VerticalTabsList,
  Dd as VerticalTabsTrigger,
  Le as Z_INDEX_ABOVE_DOCK,
  Bo as Z_INDEX_FOOTNOTE_EDITOR,
  Ia as Z_INDEX_MODAL,
  Oa as Z_INDEX_MODAL_BACKDROP,
  Ma as Z_INDEX_OVERLAY,
  wc as badgeVariants,
  Ho as buttonVariants,
  h as cn,
  iu as getBookIdFromUSFM,
  Cr as getInventoryHeader,
  nu as getLinesFromUSFM,
  ou as getNumberFromUSFM,
  ad as getStatusForItem,
  Ou as getToolbarOSReservedSpaceClassName,
  eu as inventoryCountColumn,
  tu as inventoryItemColumn,
  ru as inventoryStatusColumn,
  Cc as selectTriggerVariants,
  Tp as sonner,
  Np as useEvent,
  _p as useEventAsync,
  dc as useListbox,
  Wd as usePromise,
  Cw as useRecentSearches,
  Er as useSidebar,
  kp as useStylesheet
};
//# sourceMappingURL=index.js.map
