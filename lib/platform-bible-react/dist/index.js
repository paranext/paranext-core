var Ma = Object.defineProperty;
var Oa = (t, e, r) => e in t ? Ma(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var mt = (t, e, r) => Oa(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as d, jsx as o, Fragment as it } from "react/jsx-runtime";
import { Command as ge } from "cmdk";
import { X as Oe, Search as cn, Check as jt, Clock as So, ChevronsLeft as Ro, ChevronsRight as Do, ChevronLeft as Vr, ChevronRight as Ce, ArrowLeft as Ia, ArrowRight as Aa, Circle as ro, ChevronDown as Ie, BoldIcon as Pa, ItalicIcon as $a, AtSign as wn, Pencil as La, Trash2 as Va, ArrowUp as dn, MoreHorizontal as pn, MailOpen as ja, Mail as za, ChevronUp as un, FilterIcon as Fa, ArrowLeftIcon as Ba, ChevronLeftIcon as Ka, ChevronRightIcon as qa, ArrowRightIcon as Ga, Copy as hn, Filter as Ua, User as Ha, Link as Wa, CircleHelp as Ya, ChevronsUpDown as fn, Star as Ja, SquareX as mn, FunctionSquare as gn, SquareSigma as bn, Ban as Xa, AlertCircle as jr, CircleCheckIcon as Za, CircleXIcon as Qa, CircleHelpIcon as ti, ArrowUpIcon as ei, ArrowDownIcon as ri, PanelLeft as oi, PanelRight as ni, ScrollText as ai, MenuIcon as ii, Menu as si, EllipsisVertical as li, LoaderCircle as ci, GripVertical as wi } from "lucide-react";
import { clsx as di } from "clsx";
import { twMerge as pi } from "tailwind-merge";
import * as Ee from "@radix-ui/react-dialog";
import { Canon as at } from "@sillsdev/scripture";
import { includes as Qe, Section as G, getChaptersForBook as ui, formatScrRef as he, getSectionForBook as Ve, formatRelativeDate as hi, formatReplacementString as ue, sanitizeHtml as fi, NumberFormat as mi, formatBytes as gi, getCurrentLocale as bi, usfmMarkers as ar, getFormatCallerFunction as vi, deepEqual as xi, isString as Mo, compareScrRefs as zr, scrRefToBBBCCCVVV as Nr, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import tt, { forwardRef as He, useRef as H, useMemo as z, useState as T, useCallback as B, useLayoutEffect as qt, createContext as fr, useContext as oo, useEffect as q, Component as yi, createElement as Oo, Suspense as ki, Fragment as vn } from "react";
import { Slot as Ae } from "@radix-ui/react-slot";
import { cva as ne } from "class-variance-authority";
import * as Be from "@radix-ui/react-popover";
import * as _i from "@radix-ui/react-label";
import * as Fr from "@radix-ui/react-radio-group";
import { createEditor as xn, $getRoot as te, $createParagraphNode as mr, $getSelection as Ot, HISTORY_MERGE_TAG as no, ParagraphNode as yn, TextNode as kn, $isTokenOrSegmented as Ni, $getCharacterOffsets as Ci, $cloneWithPropertiesEphemeral as Ei, $findMatchingParent as _n, $isElementNode as Xt, $isRangeSelection as me, CLEAR_EDITOR_COMMAND as Nn, COMMAND_PRIORITY_EDITOR as Cn, mergeRegister as ee, shallowMergeConfig as Ti, defineExtension as zt, safeCast as We, createState as Si, FORMAT_TEXT_COMMAND as En, $isNodeSelection as Tn, COMMAND_PRIORITY_LOW as Sn, RootNode as Ri, LineBreakNode as Di, TabNode as Mi, $isEditorState as Oi, createCommand as Ii, CLICK_COMMAND as Ai, isDOMNode as Pi, $getNodeFromDOMNode as $i, $createNodeSelection as Li, $setSelection as Vi, DecoratorNode as Br, $getState as ji, toggleTextFormatType as Io, TEXT_TYPE_TO_FORMAT as zi, $setState as Fi, addClassNamesToElement as Rn, $create as Bi, $getNodeByKey as Ki, removeClassNamesFromElement as qi, KEY_TAB_COMMAND as Gi, $isBlockElementNode as cr, $createRangeSelection as Ui, $normalizeSelection__EXPERIMENTAL as Hi, OUTDENT_CONTENT_COMMAND as Wi, INDENT_CONTENT_COMMAND as Ao, INSERT_TAB_COMMAND as Yi, COMMAND_PRIORITY_CRITICAL as ao, $isDecoratorNode as Ji, $isParagraphNode as Xi, $isTextNode as wr, SELECTION_CHANGE_COMMAND as Dn, getRegisteredNode as Zi, isHTMLElement as Qi, isDocumentFragment as Po, isDOMDocumentNode as ts, ArtificialNode__DO_NOT_USE as Mn, $createLineBreakNode as On, $isRootOrShadowRoot as es, isBlockDomNode as $o, isInlineDomNode as Lo, $insertNodes as rs } from "lexical";
import * as gr from "@radix-ui/react-tooltip";
import { TooltipTrigger as os } from "@radix-ui/react-tooltip";
import { HeadingNode as ns, QuoteNode as as, registerRichText as is } from "@lexical/rich-text";
import { flushSync as ss, createPortal as ls } from "react-dom";
import { $isTableSelection as cs } from "@lexical/table";
import * as In from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as An } from "@lexical/headless";
import * as ws from "@radix-ui/react-separator";
import * as io from "@radix-ui/react-avatar";
import * as pt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ds } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Pn, getFilteredRowModel as ps, getSortedRowModel as $n, getPaginationRowModel as us, getCoreRowModel as Ln, flexRender as je, getGroupedRowModel as hs, getExpandedRowModel as fs } from "@tanstack/react-table";
import * as bt from "@radix-ui/react-select";
import ms from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Kr, HIDDEN_NOTE_CALLER as qr, getDefaultViewOptions as gs, isInsertEmbedOpOfType as tr, Editorial as bs } from "@eten-tech-foundation/platform-editor";
import * as Vo from "@radix-ui/react-checkbox";
import * as It from "@radix-ui/react-tabs";
import * as Vt from "@radix-ui/react-menubar";
import { useHotkeys as vs } from "react-hotkeys-hook";
import * as ut from "@radix-ui/react-context-menu";
import { Drawer as ae } from "vaul";
import * as jo from "@radix-ui/react-progress";
import * as so from "react-resizable-panels";
import { Toaster as xs } from "sonner";
import { toast as du } from "sonner";
import * as er from "@radix-ui/react-slider";
import * as zo from "@radix-ui/react-switch";
function Gr(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? n += 1 : i === "]" && (n -= 1), i === ":" && n === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function ys(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Gr(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((w, c) => c !== r), `-${i}`].join(":")}`, original: t };
  }
  const n = e.findIndex((i) => i.startsWith("!tw-"));
  if (n !== -1) {
    const i = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((w, c) => c !== n), `!${i}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const i = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ks(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Gr(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], i = Gr(e), s = i.some((w) => w.startsWith("-tw-")), l = i.some((w) => w.startsWith("!tw-"));
  if (s && a.startsWith("-")) {
    const w = a.slice(1);
    return [...n, `-tw-${w}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const w = a.slice(1);
    return [...n, `!tw-${w}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function f(...t) {
  const e = di(t);
  if (!e) return e;
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((w) => {
    const c = ys(w);
    n.set(c.normalized, c.original), a.push(c.normalized);
  }), pi(a.join(" ")).split(" ").filter(Boolean).map((w) => {
    const c = n.get(w);
    return c ? ks(w, c) : w;
  }).join(" ");
}
const _s = "layoutDirection";
function wt() {
  const t = localStorage.getItem(_s);
  return t === "rtl" ? t : "ltr";
}
const Ns = Ee.Root, Cs = Ee.Portal;
function Es({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ee.Overlay,
    {
      ref: e,
      className: f(
        "tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
        t
      ),
      ...r
    }
  );
}
function Ts({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = wt();
  return /* @__PURE__ */ d(Cs, { children: [
    /* @__PURE__ */ o(Es, {}),
    /* @__PURE__ */ d(
      Ee.Content,
      {
        ref: r,
        className: f(
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:z-50 tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ d(
            Ee.Close,
            {
              className: f(
                "tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground",
                { "tw:right-4": a === "ltr" },
                { "tw:left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ o(Oe, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Ss({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: f(
        "tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Rs({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ee.Title,
    {
      ref: e,
      className: f("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function ie({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ge,
    {
      ref: e,
      className: f(
        "tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:rounded-md tw:bg-popover tw:text-popover-foreground",
        t
      ),
      ...r
    }
  );
}
function Ye({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: n, children: [
    /* @__PURE__ */ o(cn, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ o(
      ge.Input,
      {
        ref: e,
        className: f(
          "tw:flex tw:h-10 tw:w-full tw:rounded-md tw:bg-transparent tw:py-3 tw:text-sm tw:outline-none tw:placeholder:text-muted-foreground tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
          t
        ),
        ...r
      }
    )
  ] });
}
function se({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ge.List,
    {
      ref: e,
      className: f("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...r
    }
  );
}
function br({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o(ge.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function re({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ge.Group,
    {
      ref: e,
      className: f(
        "tw:overflow-hidden tw:p-1 tw:text-foreground tw:[&_[cmdk-group-heading]]:px-2 tw:[&_[cmdk-group-heading]]:py-1.5 tw:[&_[cmdk-group-heading]]:text-xs tw:[&_[cmdk-group-heading]]:font-medium tw:[&_[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...r
    }
  );
}
function Ds({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ge.Separator,
    {
      ref: e,
      className: f("tw:-mx-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function Gt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ge.Item,
    {
      ref: e,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:gap-2 tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:data-[disabled=true]:pointer-events-none tw:data-[selected=true]:bg-accent tw:data-[selected=true]:text-accent-foreground tw:data-[disabled=true]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Ms({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: f("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Vn = (t, e, r, n, a) => {
  switch (t) {
    case G.OT:
      return e ?? "Old Testament";
    case G.NT:
      return r ?? "New Testament";
    case G.DC:
      return n ?? "Deuterocanon";
    case G.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Os = (t, e, r, n, a) => {
  switch (t) {
    case G.OT:
      return e ?? "OT";
    case G.NT:
      return r ?? "NT";
    case G.DC:
      return n ?? "DC";
    case G.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function _e(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? at.bookIdToEnglishName(t);
}
function lo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const jn = at.allBookIds.filter(
  (t) => !at.isObsolete(at.bookIdToNumber(t))
), fe = Object.fromEntries(
  jn.map((t) => [t, at.bookIdToEnglishName(t)])
);
function co(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = at.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(Qe(a.toLowerCase(), n) || Qe(t.toLowerCase(), n) || (i ? Qe(i.localizedName.toLowerCase(), n) || Qe(i.localizedId.toLowerCase(), n) : !1));
}
const zn = He(
  ({
    bookId: t,
    isSelected: e,
    onSelect: r,
    onMouseDown: n,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: w
  }, c) => {
    const p = H(!1), u = () => {
      p.current || r == null || r(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, m = (v) => {
      p.current = !0, n ? n(v) : r == null || r(t);
    }, h = z(
      () => _e(t, l),
      [t, l]
    ), g = z(
      () => lo(t, l),
      [t, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: f(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": a === G.OT,
            "tw:border-s-purple-200": a === G.NT,
            "tw:border-s-indigo-200": a === G.DC,
            "tw:border-s-amber-200": a === G.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          Gt,
          {
            ref: c,
            value: w || `${t} ${at.bookIdToEnglishName(t)}`,
            onSelect: u,
            onMouseDown: m,
            role: "option",
            "aria-selected": e,
            "aria-label": `${at.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ o(
                jt,
                {
                  className: f(
                    "tw:me-2 tw:h-4 tw:w-4 tw:flex-shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1", children: h }),
              /* @__PURE__ */ o("span", { className: "tw:ms-2 tw:flex-shrink-0 tw:text-xs tw:text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), Fn = ne(
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
function F({
  className: t,
  variant: e,
  size: r,
  asChild: n = !1,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(n ? Ae : "button", { className: f(Fn({ variant: e, size: r, className: t })), ref: a, ...i });
}
const Ut = Be.Root, le = Be.Trigger, Is = Be.Anchor;
function Ht({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ o(Be.Portal, { children: /* @__PURE__ */ o(
    Be.Content,
    {
      ref: n,
      align: e,
      sideOffset: r,
      className: f(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw:z-[250]",
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-none tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: i
    }
  ) });
}
function Ur(t, e, r) {
  return `${t} ${fe[t]}${e ? ` ${lo(t, e)} ${_e(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
function As({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (w) => String(w),
  getItemKey: n = (w) => String(w),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l
}) {
  const [w, c] = T(!1);
  if (t.length === 0)
    return;
  const p = (u) => {
    e(u), c(!1);
  };
  return /* @__PURE__ */ d(Ut, { open: w, onOpenChange: c, children: [
    /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ o(
      F,
      {
        variant: "ghost",
        size: "icon",
        className: "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
        "aria-label": a,
        children: /* @__PURE__ */ o(So, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ o(Ht, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ o(ie, { children: /* @__PURE__ */ o(se, { children: /* @__PURE__ */ o(re, { heading: i, children: t.map((u) => /* @__PURE__ */ d(
      Gt,
      {
        onSelect: () => p(u),
        className: f("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ o(So, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ o("span", { children: r(u) })
        ]
      },
      n(u)
    )) }) }) }) })
  ] });
}
function cd(t, e, r = (a, i) => a === i, n = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !r(l, a)
    ), s = [a, ...i.slice(0, n - 1)];
    e(s);
  };
}
const Cr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ps = [
  Cr.BOOK_ONLY,
  Cr.BOOK_CHAPTER,
  Cr.BOOK_CHAPTER_VERSE
];
function Fo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function $t(t) {
  return ui(at.bookIdToNumber(t));
}
function $s(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const n = Ps.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, w = void 0, c = void 0] = s.slice(1);
        let p;
        const u = e.filter((m) => co(m, l, r));
        if (u.length === 1 && ([p] = u), !p && w) {
          if (at.isBookIdValid(l)) {
            const m = l.toUpperCase();
            e.includes(m) && (p = m);
          }
          if (!p && r) {
            const m = Array.from(r.entries()).find(
              ([, h]) => h.localizedId.toLowerCase() === l.toLowerCase()
            );
            m && e.includes(m[0]) && ([p] = m);
          }
        }
        if (!p && w) {
          const h = ((g) => Object.keys(fe).find(
            (v) => fe[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (h && e.includes(h) && (p = h), !p && r) {
            const g = Array.from(r.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let m = w ? parseInt(w, 10) : void 0;
          m && m > $t(p) && (m = Math.max($t(p), 1));
          const h = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
            chapterNum: m,
            verseNum: h
          };
        }
      }
    },
    void 0
  );
  if (n) return n;
}
function Ls(t, e, r, n) {
  const a = B(() => {
    if (t.chapterNum > 1)
      n({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w > 0) {
        const c = e[w - 1], p = Math.max($t(c), 1);
        n({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, n]), i = B(() => {
    const w = $t(t.book);
    if (t.chapterNum < w)
      n({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const p = e[c + 1];
        n({
          book: p,
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
  return z(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Ro : Do
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Vr : Ce
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? Ce : Vr
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === $t(t.book) || $t(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? Do : Ro
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
function Bo({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: n,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ o(re, { children: /* @__PURE__ */ o("div", { className: f("tw:grid tw:grid-cols-6 tw:gap-1", i), children: Array.from({ length: $t(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ o(
      Gt,
      {
        value: `${t} ${fe[t] || ""} ${s}`,
        onSelect: () => r(s),
        ref: n(s),
        className: f(
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
function wd({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: n,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: w
}) {
  const c = wt(), [p, u] = T(!1), [m, h] = T(""), [g, v] = T(""), [b, x] = T("books"), [y, _] = T(void 0), [k, j] = T(!1), $ = H(void 0), E = H(void 0), P = H(void 0), N = H(void 0), S = H({}), L = B(
    (C) => {
      e(C), l && l(C);
    },
    [e, l]
  ), V = z(() => n ? n() : jn, [n]), O = z(() => ({
    [G.OT]: V.filter((W) => at.isBookOT(W)),
    [G.NT]: V.filter((W) => at.isBookNT(W)),
    [G.DC]: V.filter((W) => at.isBookDC(W)),
    [G.Extra]: V.filter((W) => at.extraBooks().includes(W))
  }), [V]), I = z(() => Object.values(O).flat(), [O]), U = z(() => {
    if (!g.trim()) return O;
    const C = {
      [G.OT]: [],
      [G.NT]: [],
      [G.DC]: [],
      [G.Extra]: []
    };
    return [G.OT, G.NT, G.DC, G.Extra].forEach((rt) => {
      C[rt] = O[rt].filter((ot) => co(ot, g, a));
    }), C;
  }, [O, g, a]), D = z(
    () => $s(g, I, a),
    [g, I, a]
  ), Y = B(() => {
    D && (L({
      book: D.book,
      chapterNum: D.chapterNum ?? 1,
      verseNum: D.verseNum ?? 1
    }), u(!1), v(""), h(""));
  }, [L, D]), kt = B(
    (C) => {
      if ($t(C) <= 1) {
        L({
          book: C,
          chapterNum: 1,
          verseNum: 1
        }), u(!1), v("");
        return;
      }
      _(C), x("chapters");
    },
    [L]
  ), Ct = B(
    (C) => {
      const W = b === "chapters" ? y : D == null ? void 0 : D.book;
      W && (L({
        book: W,
        chapterNum: C,
        verseNum: 1
      }), u(!1), x("books"), _(void 0), v(""));
    },
    [L, b, y, D]
  ), Et = B(
    (C) => {
      L(C), u(!1), v("");
    },
    [L]
  ), st = Ls(t, I, c, e), A = B(() => {
    x("books"), _(void 0), setTimeout(() => {
      E.current && E.current.focus();
    }, 0);
  }, []), R = B(
    (C) => {
      if (!C && b === "chapters") {
        A();
        return;
      }
      u(C), C && (x("books"), _(void 0), v(""));
    },
    [b, A]
  ), { otLong: K, ntLong: X, dcLong: Z, extraLong: nt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, vt = B(
    (C) => Vn(C, K, X, Z, nt),
    [K, X, Z, nt]
  ), lt = B(
    (C) => D ? !!D.chapterNum && !C.toString().includes(D.chapterNum.toString()) : !1,
    [D]
  ), xt = z(
    () => he(
      t,
      a ? _e(t.book, a) : "English"
    ),
    [t, a]
  ), Tt = B((C) => (W) => {
    S.current[C] = W;
  }, []), ht = B((C) => {
    (C.key === "Home" || C.key === "End") && C.stopPropagation();
  }, []), ft = B(
    (C) => {
      if (C.ctrlKey) return;
      const { isLetter: W, isDigit: rt } = Fo(C.key);
      if (b === "chapters") {
        if (C.key === "Backspace") {
          C.preventDefault(), C.stopPropagation(), A();
          return;
        }
        if (W || rt) {
          if (C.preventDefault(), C.stopPropagation(), x("books"), _(void 0), rt && y) {
            const ot = fe[y];
            v(`${ot} ${C.key}`);
          } else
            v(C.key);
          setTimeout(() => {
            E.current && E.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && D) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(C.key)) {
        const ot = b === "chapters" ? y : D == null ? void 0 : D.book;
        if (!ot) return;
        const ct = (() => {
          if (!m) return 1;
          const ce = m.match(/(\d+)$/);
          return ce ? parseInt(ce[1], 10) : 0;
        })(), Kt = $t(ot);
        if (!Kt) return;
        let yt = ct;
        const Ze = 6;
        switch (C.key) {
          case "ArrowLeft":
            ct !== 0 && (yt = ct > 1 ? ct - 1 : Kt);
            break;
          case "ArrowRight":
            ct !== 0 && (yt = ct < Kt ? ct + 1 : 1);
            break;
          case "ArrowUp":
            yt = ct === 0 ? Kt : Math.max(1, ct - Ze);
            break;
          case "ArrowDown":
            yt = ct === 0 ? 1 : Math.min(Kt, ct + Ze);
            break;
          default:
            return;
        }
        yt !== ct && (C.preventDefault(), C.stopPropagation(), h(Ur(ot, a, yt)), setTimeout(() => {
          const ce = S.current[yt];
          ce && ce.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      D,
      A,
      y,
      m,
      a
    ]
  ), Bt = B((C) => {
    if (C.shiftKey || C.key === "Tab" || C.key === " ") return;
    const { isLetter: W, isDigit: rt } = Fo(C.key);
    (W || rt) && (C.preventDefault(), v((ot) => ot + C.key), E.current.focus(), j(!1));
  }, []);
  return qt(() => {
    const C = setTimeout(() => {
      if (p && b === "books" && P.current && N.current) {
        const W = P.current, rt = N.current, ot = rt.offsetTop, ct = W.clientHeight, Kt = rt.clientHeight, yt = ot - ct / 2 + Kt / 2;
        W.scrollTo({
          top: Math.max(0, yt),
          behavior: "smooth"
        }), h(Ur(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(C);
    };
  }, [p, b, g, D, t.book]), qt(() => {
    if (b === "chapters" && y) {
      const C = y === t.book;
      setTimeout(() => {
        if (P.current)
          if (C) {
            const W = S.current[t.chapterNum];
            W && W.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            P.current.scrollTo({ top: 0 });
        $.current && $.current.focus();
      }, 0);
    }
  }, [b, y, D, t.book, t.chapterNum]), /* @__PURE__ */ d(Ut, { open: p, onOpenChange: R, children: [
    /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ o(
      F,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: f(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ o("span", { className: "tw:truncate", children: xt })
      }
    ) }),
    /* @__PURE__ */ o(Ht, { id: w, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ d(
      ie,
      {
        ref: $,
        onKeyDown: ft,
        loop: !0,
        value: m,
        onValueChange: h,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ d("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ o(
                Ye,
                {
                  ref: E,
                  value: g,
                  onValueChange: v,
                  onKeyDown: ht,
                  onFocus: () => j(!1),
                  className: s && s.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ o(
                As,
                {
                  recentSearches: s,
                  onSearchItemSelect: Et,
                  renderItem: (C) => he(C, "English"),
                  getItemKey: (C) => `${C.book}-${C.chapterNum}-${C.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: st.map(({ onClick: C, disabled: W, title: rt, icon: ot }) => /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  j(!0), C();
                },
                disabled: W,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: rt,
                onKeyDown: Bt,
                children: /* @__PURE__ */ o(ot, {})
              },
              rt
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: A,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ o(Ia, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ o(Aa, { className: "tw:h-4 tw:w-4" })
              }
            ),
            y && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: _e(y, a) })
          ] }),
          !k && /* @__PURE__ */ d(se, { ref: P, children: [
            b === "books" && /* @__PURE__ */ d(it, { children: [
              !D && Object.entries(U).map(([C, W]) => {
                if (W.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(re, { heading: vt(C), children: W.map((rt) => /* @__PURE__ */ o(
                      zn,
                      {
                        bookId: rt,
                        onSelect: (ot) => kt(ot),
                        section: Ve(rt),
                        commandValue: `${rt} ${fe[rt]}`,
                        ref: rt === t.book ? N : void 0,
                        localizedBookNames: a
                      },
                      rt
                    )) }, C)
                  );
              }),
              D && /* @__PURE__ */ o(re, { children: /* @__PURE__ */ o(
                Gt,
                {
                  value: `${D.book} ${fe[D.book]} ${D.chapterNum || ""}:${D.verseNum || ""})}`,
                  onSelect: Y,
                  className: "tw:font-semibold tw:text-primary",
                  children: he(
                    {
                      book: D.book,
                      chapterNum: D.chapterNum ?? 1,
                      verseNum: D.verseNum ?? 1
                    },
                    a ? lo(D.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              D && $t(D.book) > 1 && /* @__PURE__ */ d(it, { children: [
                /* @__PURE__ */ o("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: _e(D.book, a) }),
                /* @__PURE__ */ o(
                  Bo,
                  {
                    bookId: D.book,
                    scrRef: t,
                    onChapterSelect: Ct,
                    setChapterRef: Tt,
                    isChapterDimmed: lt,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ o(
              Bo,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: Ct,
                setChapterRef: Tt,
                className: "tw:p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const dd = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Vs = ne(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function dt({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    _i.Root,
    {
      ref: e,
      className: f("pr-twp", Vs(), t),
      ...r
    }
  );
}
function Bn({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    Fr.Root,
    {
      className: f("pr-twp tw:grid tw:gap-2", t),
      ...r,
      ref: e,
      dir: n
    }
  );
}
function Hr({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Fr.Item,
    {
      ref: e,
      className: f(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:shadow tw:focus:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Fr.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ro, { className: "tw:h-3.5 tw:w-3.5 tw:fill-primary" }) })
    }
  );
}
function js(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Wr({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: n,
  popoverContentClassName: a,
  value: i,
  onChange: s = () => {
  },
  getOptionLabel: l = js,
  getButtonLabel: w,
  icon: c = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: u = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ariaLabel: b,
  ...x
}) {
  const [y, _] = T(!1), k = w ?? l, j = (E) => E.length > 0 && typeof E[0] == "object" && "options" in E[0], $ = (E, P) => {
    const N = l(E), S = typeof E == "object" && "secondaryLabel" in E ? E.secondaryLabel : void 0, L = `${P ?? ""}${N}${S ?? ""}`;
    return /* @__PURE__ */ d(
      Gt,
      {
        value: N,
        onSelect: () => {
          s(E), _(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ o(
            jt,
            {
              className: f("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !i || l(i) !== N
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            N,
            S && /* @__PURE__ */ d("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ d(Ut, { open: y, onOpenChange: _, ...x, children: [
    /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ d(
      F,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": y,
        "aria-label": b,
        id: t,
        className: f(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          n ?? r
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            c && /* @__PURE__ */ o("div", { className: "tw:shrink-0 tw:pe-2", children: c }),
            /* @__PURE__ */ o(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: i ? k(i) : p
              }
            )
          ] }),
          /* @__PURE__ */ o(Ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      Ht,
      {
        align: g,
        className: f("tw:w-[200px] tw:p-0", a),
        children: /* @__PURE__ */ d(ie, { children: [
          /* @__PURE__ */ o(Ye, { placeholder: u, className: "tw:text-inherit" }),
          /* @__PURE__ */ o(br, { children: m }),
          /* @__PURE__ */ o(se, { children: j(e) ? e.map((E) => /* @__PURE__ */ o(re, { heading: E.groupHeading, children: E.options.map((P) => $(P, E.groupHeading)) }, E.groupHeading)) : e.map((E) => $(E)) })
        ] })
      }
    )
  ] });
}
function zs({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: n,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = z(
    () => Array.from({ length: i }, (c, p) => p + 1),
    [i]
  );
  return /* @__PURE__ */ d(it, { children: [
    /* @__PURE__ */ o(dt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      Wr,
      {
        isDisabled: a,
        onChange: (c) => {
          r(c), c > e && n(c);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ o(dt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      Wr,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c < t && r(c);
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
var Yr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Yr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Yr || (Yr = {}));
const pd = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Er = (t, e) => t[e] ?? e;
function ud({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: n,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: w,
  localizedStrings: c
}) {
  const p = Er(c, "%webView_bookSelector_currentBook%"), u = Er(c, "%webView_bookSelector_choose%"), m = Er(c, "%webView_bookSelector_chooseBooks%"), [h, g] = T(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ o(
    Bn,
    {
      className: "pr-twp tw:flex",
      value: h,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw:grid tw:grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(Hr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ o(dt, { className: "tw:ms-1", children: p })
          ] }),
          /* @__PURE__ */ o(dt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ o(
            zs,
            {
              isDisabled: h === "choose books",
              handleSelectStartChapter: w,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw:grid tw:grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(Hr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ o(dt, { className: "tw:ms-1", children: m })
          ] }),
          /* @__PURE__ */ o(dt, { className: "tw:flex tw:items-center", children: n.map((b) => at.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ o(
            F,
            {
              disabled: h === "current book",
              onClick: () => r(),
              children: u
            }
          )
        ] })
      ] })
    }
  );
}
const Kn = fr(null);
function Fs(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ft() {
  const t = oo(Kn);
  return t == null && function(e, ...r) {
    const n = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of r) a.append("v", i);
    throw n.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const qn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Bs = qn ? qt : q, rr = { tag: no };
function Ks({ initialConfig: t, children: e }) {
  const r = z(() => {
    const { theme: n, namespace: a, nodes: i, onError: s, editorState: l, html: w } = t, c = Fs(null, n), p = xn({ editable: t.editable, html: w, namespace: a, nodes: i, onError: (u) => s(u, p), theme: n });
    return function(u, m) {
      if (m !== null) {
        if (m === void 0) u.update(() => {
          const h = te();
          if (h.isEmpty()) {
            const g = mr();
            h.append(g);
            const v = qn ? document.activeElement : null;
            (Ot() !== null || v !== null && v === u.getRootElement()) && g.select();
          }
        }, rr);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const h = u.parseEditorState(m);
            u.setEditorState(h, rr);
            break;
          }
          case "object":
            u.setEditorState(m, rr);
            break;
          case "function":
            u.update(() => {
              te().isEmpty() && m(u);
            }, rr);
        }
      }
    }(p, l), [p, c];
  }, []);
  return Bs(() => {
    const n = t.editable, [a] = r;
    a.setEditable(n === void 0 || n);
  }, []), o(Kn.Provider, { value: r, children: e });
}
const qs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : q;
function Gs({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [n] = Ft();
  return qs(() => {
    if (r) return n.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: w }) => {
      e && i.size === 0 && s.size === 0 || t && w.has(no) || l.isEmpty() || r(a, n, w);
    });
  }, [n, t, e, r]), null;
}
const wo = {
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
}, Nt = gr.Provider, Dt = gr.Root;
function Lt({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    gr.Trigger,
    {
      ref: r,
      className: e ? f(Fn({ variant: e }), t) : t,
      ...n
    }
  );
}
function Mt({
  className: t,
  sideOffset: e = 4,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    gr.Content,
    {
      ref: r,
      sideOffset: e,
      className: f(
        "pr-twp tw:z-50 tw:overflow-hidden tw:rounded-md tw:bg-primary tw:px-3 tw:py-1.5 tw:text-xs tw:text-primary-foreground tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  );
}
const po = [
  ns,
  yn,
  kn,
  as
], Us = fr(null), Tr = {
  didCatch: !1,
  error: null
};
class Hs extends yi {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Tr;
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
      }), this.setState(Tr);
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
    if (n && r.error !== null && Ws(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Tr);
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
      const w = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        l = r(w);
      else if (n)
        l = Oo(n, w);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Oo(Us.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Ws() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, n) => !Object.is(r, e[n]));
}
function Ys({ children: t, onError: e }) {
  return o(Hs, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Js = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : q;
function Xs(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Zs() {
  return function(t) {
    const [e] = Ft(), r = z(() => t(e), [e, t]), [n, a] = T(() => r.initialValueFn()), i = H(n);
    return Js(() => {
      const { initialValueFn: s, subscribe: l } = r, w = s();
      return i.current !== w && (i.current = w, a(w)), l((c) => {
        i.current = c, a(c);
      });
    }, [r, t]), n;
  }(Xs);
}
function Qs(t, e, r = "self") {
  const n = t.getStartEndPoints();
  if (e.isSelected(t) && !Ni(e) && n !== null) {
    const [a, i] = n, s = t.isBackward(), l = a.getNode(), w = i.getNode(), c = e.is(l), p = e.is(w);
    if (c || p) {
      const [u, m] = Ci(t), h = l.is(w), g = e.is(s ? w : l), v = e.is(s ? l : w);
      let b, x = 0;
      h ? (x = u > m ? m : u, b = u > m ? u : m) : g ? (x = s ? m : u, b = void 0) : v && (x = 0, b = s ? u : m);
      const y = e.__text.slice(x, b);
      y !== e.__text && (r === "clone" && (e = Ei(e)), e.__text = y);
    }
  }
  return e;
}
function tl(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Gn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, el = Gn && "documentMode" in document ? document.documentMode : null;
!(!Gn || !("InputEvent" in window) || el) && "getTargetRanges" in new window.InputEvent("input");
function rl(t) {
  const e = _n(t, (r) => Xt(r) && !r.isInline());
  return Xt(e) || tl(4, t.__key), e;
}
function ol(t) {
  const e = Ot();
  if (!me(e)) return !1;
  const r = /* @__PURE__ */ new Set(), n = e.getNodes();
  for (let a = 0; a < n.length; a++) {
    const i = n[a], s = i.getKey();
    if (r.has(s)) continue;
    const l = _n(i, (c) => Xt(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !r.has(w) && (r.add(w), t(l));
  }
  return r.size > 0;
}
const nl = Symbol.for("preact-signals");
function vr() {
  if (Zt > 1) return void Zt--;
  let t, e = !1;
  for (; ze !== void 0; ) {
    let r = ze;
    for (ze = void 0, Jr++; r !== void 0; ) {
      const n = r.o;
      if (r.o = void 0, r.f &= -3, !(8 & r.f) && Un(r)) try {
        r.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      r = n;
    }
  }
  if (Jr = 0, Zt--, e) throw t;
}
function al(t) {
  if (Zt > 0) return t();
  Zt++;
  try {
    return t();
  } finally {
    vr();
  }
}
let J, ze;
function Ko(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let Zt = 0, Jr = 0, ir = 0;
function qo(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function gt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ke(t, e) {
  return new gt(t, e);
}
function Un(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Go(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Hn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const n = r.p;
    r.i === -1 ? (r.S.U(r), n !== void 0 && (n.n = r.n), r.n !== void 0 && (r.n.p = n)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = n;
  }
  t.s = e;
}
function de(t, e) {
  gt.call(this, void 0), this.x = t, this.s = void 0, this.g = ir - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function il(t, e) {
  return new de(t, e);
}
function Wn(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    Zt++;
    const r = J;
    J = void 0;
    try {
      e();
    } catch (n) {
      throw t.f &= -2, t.f |= 8, uo(t), n;
    } finally {
      J = r, vr();
    }
  }
}
function uo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Wn(t);
}
function sl(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  Hn(this), J = t, this.f &= -2, 8 & this.f && uo(this), vr();
}
function ke(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function oe(t, e) {
  const r = new ke(t, e);
  try {
    r.c();
  } catch (a) {
    throw r.d(), a;
  }
  const n = r.d.bind(r);
  return n[Symbol.dispose] = n, n;
}
function xr(t, e = {}) {
  const r = {};
  for (const n in t) {
    const a = e[n], i = Ke(a === void 0 ? t[n] : a);
    r[n] = i;
  }
  return r;
}
gt.prototype.brand = nl, gt.prototype.h = function() {
  return !0;
}, gt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Ko(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, gt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Ko(() => {
      var n;
      (n = this.Z) == null || n.call(this);
    }));
  }
}, gt.prototype.subscribe = function(t) {
  return oe(() => {
    const e = this.value, r = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = r;
    }
  }, { name: "sub" });
}, gt.prototype.valueOf = function() {
  return this.value;
}, gt.prototype.toString = function() {
  return this.value + "";
}, gt.prototype.toJSON = function() {
  return this.value;
}, gt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(gt.prototype, "value", { get() {
  const t = qo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Jr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, ir++, Zt++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      vr();
    }
  }
} }), de.prototype = new gt(), de.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ir)) return !0;
  if (this.g = ir, this.f |= 1, this.i > 0 && !Un(this)) return this.f &= -2, !0;
  const t = J;
  try {
    Go(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, Hn(this), this.f &= -2, !0;
}, de.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  gt.prototype.S.call(this, t);
}, de.prototype.U = function(t) {
  if (this.t !== void 0 && (gt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, de.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(de.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = qo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), ke.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, ke.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Wn(this), Go(this), Zt++;
  const t = J;
  return J = this, sl.bind(this, t);
}, ke.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = ze, ze = this);
}, ke.prototype.d = function() {
  this.f |= 8, 1 & this.f || uo(this);
}, ke.prototype.dispose = function() {
  this.d();
};
zt({ build: (t, e, r) => xr(e), config: We({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const n = r.getOutput();
  return oe(() => n.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: n.defaultSelection.peek() });
  }));
} });
function Yn() {
  const t = te(), e = Ot(), r = mr();
  t.clear(), t.append(r), e !== null && r.select(), me(e) && (e.format = 0);
}
function Jn(t, e = Yn) {
  return t.registerCommand(Nn, (r) => (t.update(e), !0), Cn);
}
zt({ build: (t, e, r) => xr(e), config: We({ $onClear: Yn }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: n } = r.getOutput();
  return oe(() => Jn(t, n.value));
} });
function ll(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Sr = Si("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Xn extends Br {
  $config() {
    return this.config("decorator-text", { extends: Br, stateConfigs: [{ flat: !0, stateConfig: Sr }] });
  }
  getFormat() {
    return ji(this, Sr);
  }
  getFormatFlags(e, r) {
    return Io(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = zi[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Fi(this, Sr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), n = Io(r, e, null);
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
function cl(t) {
  return t instanceof Xn;
}
zt({ name: "@lexical/extension/DecoratorText", nodes: () => [Xn], register: (t, e, r) => t.registerCommand(En, (n) => {
  const a = Ot();
  if (Tn(a) || me(a)) for (const i of a.getNodes()) cl(i) && i.toggleFormat(n);
  return !1;
}, Sn) });
function Zn(t, e) {
  let r;
  return Ke(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Xr = zt({ build: (t) => Zn(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Qn(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, n = e;
    for (const a in n) r[a] = Qn(r[a], n[a]);
    return t;
  }
  return e;
}
const ho = 0, Zr = 1, ta = 2, Rr = 3, or = 4, ye = 5, Dr = 6, $e = 7;
function Mr(t) {
  return t.id === ho;
}
function ea(t) {
  return t.id === ta;
}
function wl(t) {
  return function(e) {
    return e.id === Zr;
  }(t) || et(305, String(t.id), String(Zr)), Object.assign(t, { id: ta });
}
const dl = /* @__PURE__ */ new Set();
class pl {
  constructor(e, r) {
    mt(this, "builder");
    mt(this, "configs");
    mt(this, "_dependency");
    mt(this, "_peerNameSet");
    mt(this, "extension");
    mt(this, "state");
    mt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: ho };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ti;
    for (const n of this.configs) e = r(e, n);
    return e;
  }
  init(e) {
    const r = this.state;
    ea(r) || et(306, String(r.id));
    const n = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...n, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, w, c) {
      return Object.assign(l, { config: w, id: Rr, registerState: c });
    }(r, this.mergeConfigs(), n);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, n)), this.state = function(l, w, c) {
      return Object.assign(l, { id: or, initResult: w, registerState: c });
    }(i, s, a);
  }
  build(e) {
    const r = this.state;
    let n;
    r.id !== or && et(307, String(r.id), String(ye)), this.extension.build && (n = this.extension.build(e, r.config, r.registerState));
    const a = { ...r.registerState, getOutput: () => n, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: ye, output: s, registerState: l });
    }(r, n, a);
  }
  register(e, r) {
    this._signal = r;
    const n = this.state;
    n.id !== ye && et(308, String(n.id), String(ye));
    const a = this.extension.register && this.extension.register(e, n.config, n.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Dr });
    }(n), () => {
      const i = this.state;
      i.id !== $e && et(309, String(n.id), String($e)), this.state = function(s) {
        return Object.assign(s, { id: ye });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let n;
    return r.id !== Dr && et(310, String(r.id), String(Dr)), this.extension.afterRegistration && (n = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(a) {
      return Object.assign(a, { id: $e });
    }(r), n;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= or;
    }(e) || et(313, String(e.id), String(or)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Rr;
    }(e) || et(314, String(e.id), String(Rr)), { config: e.config };
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
      return r.id >= $e;
    }(e) || et(316, String(e.id), String($e)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || dl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= ye;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Uo = { tag: no };
function ul() {
  const t = te();
  t.isEmpty() && t.append(mr());
}
const hl = zt({ config: We({ setOptions: Uo, updateOptions: Uo }), init: ({ $initialEditorState: t = ul }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, n) {
  const a = n.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (Oi(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Ri, kn, Di, Mi, yn] }), Ho = Symbol.for("@lexical/extension/LexicalBuilder");
function Wo() {
}
function fl(t) {
  throw t;
}
function nr(t) {
  return Array.isArray(t) ? t : [t];
}
const Or = "0.41.0+prod.esm";
class Fe {
  constructor(e) {
    mt(this, "roots");
    mt(this, "extensionNameMap");
    mt(this, "outgoingConfigEdges");
    mt(this, "incomingEdges");
    mt(this, "conflicts");
    mt(this, "_sortedExtensionReps");
    mt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Or, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [nr(hl)];
    for (const n of e) r.push(nr(n));
    return new Fe(r);
  }
  static maybeFromEditor(e) {
    const r = e[Ho];
    return r && (r.PACKAGE_VERSION !== Or && et(292, r.PACKAGE_VERSION, Or), r instanceof Fe || et(293)), r;
  }
  static fromEditor(e) {
    const r = Fe.maybeFromEditor(e);
    return r === void 0 && et(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...n } = this.buildCreateEditorArgs(), a = Object.assign(xn({ ...n, ...r ? { onError: (i) => {
      r(i, a);
    } } : {} }), { [Ho]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = Wo;
    function r() {
      try {
        e();
      } finally {
        e = Wo;
      }
    }
    const n = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = ee(this.registerEditor(n), () => n.setRootElement(null)), n;
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
    const r = nr(e), [n] = r;
    typeof n.name != "string" && et(297, typeof n.name);
    let a = this.extensionNameMap.get(n.name);
    if (a !== void 0 && a.extension !== n && et(298, n.name), !a) {
      a = new pl(this, n), this.extensionNameMap.set(n.name, a);
      const i = this.conflicts.get(n.name);
      typeof i == "string" && et(299, n.name, i);
      for (const s of n.conflictsWith || []) this.extensionNameMap.has(s) && et(299, n.name, s), this.conflicts.set(s, n.name);
      for (const s of n.dependencies || []) {
        const l = nr(s);
        this.addEdge(n.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of n.peerDependencies || []) this.addEdge(n.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (n, a) => {
      let i = n.state;
      if (ea(i)) return;
      const s = n.extension.name;
      var l;
      Mr(i) || et(300, s, a || "[unknown]"), Mr(l = i) || et(304, String(l.id), String(ho)), i = Object.assign(l, { id: Zr }), n.state = i;
      const w = this.outgoingConfigEdges.get(s);
      if (w) for (const c of w.keys()) {
        const p = this.extensionNameMap.get(c);
        p && r(p, s);
      }
      i = wl(i), n.state = i, e.push(n);
    };
    for (const n of this.extensionNameMap.values()) Mr(n.state) && r(n);
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
    return ee(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: u } = p;
      if (u.onError !== void 0 && (e.onError = u.onError), u.disableEvents !== void 0 && (e.disableEvents = u.disableEvents), u.parentEditor !== void 0 && (e.parentEditor = u.parentEditor), u.editable !== void 0 && (e.editable = u.editable), u.namespace !== void 0 && (e.namespace = u.namespace), u.$initialEditorState !== void 0 && (e.$initialEditorState = u.$initialEditorState), u.nodes) for (const m of ll(u)) {
        if (typeof m != "function") {
          const h = n.get(m.replace);
          h && et(302, u.name, m.replace.name, h.extension.name), n.set(m.replace, p);
        }
        r.add(m);
      }
      if (u.html) {
        if (u.html.export) for (const [m, h] of u.html.export.entries()) a.set(m, h);
        u.html.import && Object.assign(i, u.html.import);
      }
      u.theme && Qn(s, u.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const w = Object.keys(i).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = i), c && (e.html.export = a));
    for (const p of l) p.init(e);
    return e.onError || (e.onError = fl), e;
  }
}
const ml = /* @__PURE__ */ new Set(), Yo = zt({ build(t, e, r) {
  const n = r.getDependency(Xr).output, a = Ke({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Zn(() => {
  }, () => oe(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    n.value.read(() => {
      if (Ot()) for (const [p, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(p);
          continue;
        }
        const m = Ki(p), h = m && m.isSelected() || !1;
        c = c || h !== (!!s && s.has(p)), h && (w = w || /* @__PURE__ */ new Set(), w.add(p));
      }
    }), !c && w && s && w.size === s.size || (i.value = w);
  }));
  return { watchNodeKey: function(s) {
    const l = il(() => (i.value || ml).has(s)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(s);
    const p = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), p || (w.set(s, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [Xr], name: "@lexical/extension/NodeSelection" });
Ii("INSERT_HORIZONTAL_RULE_COMMAND");
class Te extends Br {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Te(e.__key);
  }
  static importJSON(e) {
    return ra().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: gl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Rn(r, e.theme.hr), r;
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
function gl() {
  return { node: ra() };
}
function ra() {
  return Bi(Te);
}
function bl(t) {
  return t instanceof Te;
}
zt({ dependencies: [Xr, Yo], name: "@lexical/extension/HorizontalRule", nodes: () => [Te], register(t, e, r) {
  const { watchNodeKey: n } = r.getDependency(Yo).output, a = Ke({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ee(t.registerCommand(Ai, (s) => {
    if (Pi(s.target)) {
      const l = $i(s.target);
      if (bl(l)) return function(w, c = !1) {
        const p = Ot(), u = w.isSelected(), m = w.getKey();
        let h;
        c && Tn(p) ? h = p : (h = Li(), Vi(h)), u ? h.delete(m) : h.add(m);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Sn), t.registerMutationListener(Te, (s, l) => {
    al(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, u] of s.entries()) if (u === "destroyed") c.delete(p), w = !0;
      else {
        const m = c.get(p), h = t.getElementByKey(p);
        m ? m.domNode.value = h : (w = !0, c.set(p, { domNode: Ke(h), selectedSignal: n(p) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), oe(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) s.push(oe(() => {
      const c = l.value;
      c && (w.value ? Rn(c, i) : qi(c, i));
    }));
    return ee(...s);
  }));
} });
function oa(t) {
  return t.canBeEmpty();
}
function vl(t, e, r = oa) {
  return ee(t.registerCommand(Gi, (n) => {
    const a = Ot();
    if (!me(a)) return !1;
    n.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((m) => cr(m) && m.canIndent()).length > 0) return !0;
      const l = s.anchor, w = s.focus, c = w.isBefore(l) ? w : l, p = c.getNode(), u = rl(p);
      if (u.canIndent()) {
        const m = u.getKey();
        let h = Ui();
        if (h.anchor.set(m, 0, "element"), h.focus.set(m, 0, "element"), h = Hi(h), h.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? n.shiftKey ? Wi : Ao : Yi;
    return t.dispatchCommand(i, void 0);
  }, Cn), t.registerCommand(Ao, () => {
    const n = typeof e == "number" ? e : e ? e.peek() : null, a = Ot();
    if (!me(a)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return ol((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!n || l < n) && s.setIndent(l);
      }
    });
  }, ao));
}
zt({ build: (t, e, r) => xr(e), config: We({ $canIndent: oa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: n, maxIndent: a, $canIndent: i } = r.getOutput();
  return oe(() => {
    if (!n.value) return vl(t, a, i);
  });
} });
const xl = zt({ name: "@lexical/react/ReactProvider" });
function yl() {
  return te().getTextContent();
}
function kl(t, e = !0) {
  if (t) return !1;
  let r = yl();
  return e && (r = r.trim()), r === "";
}
function _l(t) {
  if (!kl(t, !1)) return !1;
  const e = te().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let n = 0; n < r; n++) {
    const a = e[n];
    if (Ji(a)) return !1;
    if (Xt(a)) {
      if (!Xi(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const w = i[n];
        if (!wr(w)) return !1;
      }
    }
  }
  return !0;
}
function na(t) {
  return () => _l(t);
}
function aa(t) {
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
          const w = l.args;
          if (w) {
            const [c, p, u, m, h] = w;
            t.update(() => {
              const g = Ot();
              if (me(g)) {
                const v = g.anchor;
                let b = v.getNode(), x = 0, y = 0;
                if (wr(b) && c >= 0 && p >= 0 && (x = c, y = c + p, g.setTextNodeRange(b, x, b, y)), x === y && u === "" || (g.insertRawText(u), b = v.getNode()), wr(b)) {
                  x = m, y = m + h;
                  const _ = b.getTextContentSize();
                  x = x > _ ? _ : x, y = y > _ ? _ : y, g.setTextNodeRange(b, x, b, y);
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
zt({ build: (t, e, r) => xr(e), config: We({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => oe(() => r.getOutput().disabled.value ? void 0 : aa(t)) });
function Nl(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const a of e) n.append("v", a);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const fo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : q;
function Cl({ editor: t, ErrorBoundary: e }) {
  return function(r, n) {
    const [a, i] = T(() => r.getDecorators());
    return fo(() => r.registerDecoratorListener((s) => {
      ss(() => {
        i(s);
      });
    }), [r]), q(() => {
      i(r.getDecorators());
    }, [r]), z(() => {
      const s = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], p = o(n, { onError: (m) => r._onError(m), children: o(ki, { fallback: null, children: a[c] }) }), u = r.getElementByKey(c);
        u !== null && s.push(ls(p, u, c));
      }
      return s;
    }, [n, a, r]);
  }(t, e);
}
function El({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const n = Fe.maybeFromEditor(r);
    if (n && n.hasExtensionByName(xl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) n.hasExtensionByName(a) && Nl(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : o(Cl, { editor: t, ErrorBoundary: e });
}
function Jo(t) {
  return t.getEditorState().read(na(t.isComposing()));
}
function Tl({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [n] = Ft();
  return function(a) {
    fo(() => ee(is(a), aa(a)), [a]);
  }(n), d(it, { children: [t, o(Sl, { content: e }), o(El, { editor: n, ErrorBoundary: r })] });
}
function Sl({ content: t }) {
  const [e] = Ft(), r = function(a) {
    const [i, s] = T(() => Jo(a));
    return fo(() => {
      function l() {
        const w = Jo(a);
        s(w);
      }
      return l(), ee(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), n = Zs();
  return r ? typeof t == "function" ? t(n) : t : null;
}
function Rl({ defaultSelection: t }) {
  const [e] = Ft();
  return q(() => {
    e.focus(() => {
      const r = document.activeElement, n = e.getRootElement();
      n === null || r !== null && n.contains(r) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : q;
function Ml({ onClear: t }) {
  const [e] = Ft();
  return Dl(() => Jn(e, t), [e, t]), null;
}
const ia = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? qt : q;
function Ol({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: n, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: u, ariaRequired: m, autoCapitalize: h, className: g, id: v, role: b = "textbox", spellCheck: x = !0, style: y, tabIndex: _, "data-testid": k, ...j }, $) {
  const [E, P] = T(t.isEditable()), N = B((L) => {
    L && L.ownerDocument && L.ownerDocument.defaultView ? t.setRootElement(L) : t.setRootElement(null);
  }, [t]), S = z(() => /* @__PURE__ */ function(...L) {
    return (V) => {
      for (const O of L) typeof O == "function" ? O(V) : O != null && (O.current = V);
    };
  }($, N), [N, $]);
  return ia(() => (P(t.isEditable()), t.registerEditableListener((L) => {
    P(L);
  })), [t]), o("div", { "aria-activedescendant": E ? e : void 0, "aria-autocomplete": E ? r : "none", "aria-controls": E ? n : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": E && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": p, "aria-owns": E ? u : void 0, "aria-readonly": !E || void 0, "aria-required": m, autoCapitalize: h, className: g, contentEditable: E, "data-testid": k, id: v, ref: S, role: b, spellCheck: x, style: y, tabIndex: _, ...j });
}
const Il = He(Ol);
function Xo(t) {
  return t.getEditorState().read(na(t.isComposing()));
}
const Al = He(Pl);
function Pl(t, e) {
  const { placeholder: r, ...n } = t, [a] = Ft();
  return d(it, { children: [o(Il, { editor: a, ...n, ref: e }), r != null && o($l, { editor: a, content: r })] });
}
function $l({ content: t, editor: e }) {
  const r = function(s) {
    const [l, w] = T(() => Xo(s));
    return ia(() => {
      function c() {
        const p = Xo(s);
        w(p);
      }
      return c(), ee(s.registerUpdateListener(() => {
        c();
      }), s.registerEditableListener(() => {
        c();
      }));
    }, [s]), l;
  }(e), [n, a] = T(e.isEditable());
  if (qt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(n) : t !== null && (i = t), i === null ? null : o("div", { "aria-hidden": !0, children: i });
}
function Ll({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ o(
    Al,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-none",
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
const sa = fr(void 0);
function Vl({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: n,
  showModal: a,
  children: i
}) {
  const s = z(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: n,
      showModal: a
    }),
    [t, e, r, n, a]
  );
  return /* @__PURE__ */ o(sa.Provider, { value: s, children: i });
}
function la() {
  const t = oo(sa);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function jl() {
  const [t, e] = T(void 0), r = B(() => {
    e(void 0);
  }, []), n = z(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ o(Ns, { open: !0, onOpenChange: r, children: /* @__PURE__ */ d(Ts, { children: [
      /* @__PURE__ */ o(Ss, { children: /* @__PURE__ */ o(Rs, { children: i }) }),
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
function zl({
  children: t
}) {
  const [e] = Ft(), [r, n] = T(e), [a, i] = T("paragraph"), [s, l] = jl(), w = () => {
  };
  return q(() => r.registerCommand(
    Dn,
    (c, p) => (n(p), !1),
    ao
  ), [r]), /* @__PURE__ */ d(
    Vl,
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
function Fl(t) {
  const [e] = Ft(), { activeEditor: r } = la();
  q(() => r.registerCommand(
    Dn,
    () => {
      const n = Ot();
      return n && t(n), !1;
    },
    ao
  ), [e, t]), q(() => {
    r.getEditorState().read(() => {
      const n = Ot();
      n && t(n);
    });
  }, [r, t]);
}
const Bl = ne(
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
), ca = tt.createContext({
  size: "default",
  variant: "default"
});
function wa({
  className: t,
  variant: e,
  size: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ o(
    In.Root,
    {
      ref: a,
      className: f("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...i,
      dir: s,
      children: /* @__PURE__ */ o(
        ca.Provider,
        {
          value: { variant: e, size: r },
          children: n
        }
      )
    }
  );
}
function sr({
  className: t,
  children: e,
  variant: r,
  size: n,
  ref: a,
  ...i
}) {
  const s = tt.useContext(ca);
  return /* @__PURE__ */ o(
    In.Item,
    {
      ref: a,
      className: f(
        Bl({
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
const Zo = [
  { format: "bold", icon: Pa, label: "Bold" },
  { format: "italic", icon: $a, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Kl() {
  const { activeEditor: t } = la(), [e, r] = T([]), n = B((a) => {
    if (me(a) || cs(a)) {
      const i = [];
      Zo.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Fl(n), /* @__PURE__ */ o(
    wa,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Zo.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ o(
        sr,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(En, a);
          },
          children: /* @__PURE__ */ o(i, { className: "tw:h-4 tw:w-4" })
        },
        a
      ))
    }
  );
}
function ql({ onClear: t }) {
  const [e] = Ft();
  q(() => {
    t && t(() => {
      e.dispatchCommand(Nn, void 0);
    });
  }, [e, t]);
}
function Gl({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, n] = T(void 0);
  return /* @__PURE__ */ d("div", { className: "tw:relative", children: [
    /* @__PURE__ */ o(zl, { children: () => /* @__PURE__ */ o("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ o(Kl, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw:relative", children: [
      /* @__PURE__ */ o(
        Tl,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (i) => {
            i !== void 0 && n(i);
          }, children: /* @__PURE__ */ o(Ll, { placeholder: t }) }),
          ErrorBoundary: Ys
        }
      ),
      e && /* @__PURE__ */ o(Rl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(ql, { onClear: r }),
      /* @__PURE__ */ o(Ml, {})
    ] })
  ] });
}
const Ul = {
  namespace: "commentEditor",
  theme: wo,
  nodes: po,
  onError: (t) => {
    console.error(t);
  }
};
function dr({
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
        className: f(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ o(
          Ks,
          {
            initialConfig: {
              ...Ul,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ d(Nt, { children: [
              /* @__PURE__ */ o(Gl, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ o(
                Gs,
                {
                  ignoreSelectionChange: !0,
                  onChange: (w) => {
                    r == null || r(w), n == null || n(w.toJSON());
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
function Hl(t, e) {
  const r = ts(e) ? e.body.childNodes : e.childNodes;
  let n = [];
  const a = [];
  for (const i of r) if (!pa.has(i.nodeName)) {
    const s = ua(i, t, a, !1);
    s !== null && (n = n.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Mn && s.insertAfter(On());
    for (const s of i) {
      const l = s.getChildren();
      for (const w of l) s.insertBefore(w);
      s.remove();
    }
  }(a), n;
}
function Wl(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), n = te().getChildren();
  for (let a = 0; a < n.length; a++)
    da(t, n[a], r, e);
  return r.innerHTML;
}
function da(t, e, r, n = null) {
  let a = n === null || e.isSelected(n);
  const i = Xt(e) && e.excludeFromCopy("html");
  let s = e;
  n !== null && wr(e) && (s = Qs(n, e, "clone"));
  const l = Xt(s) ? s.getChildren() : [], w = Zi(t, s.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, s) : s.exportDOM(t);
  const { element: p, after: u } = c;
  if (!p) return !1;
  const m = document.createDocumentFragment();
  for (let h = 0; h < l.length; h++) {
    const g = l[h], v = da(t, g, m, n);
    !a && Xt(e) && v && e.extractWithChild(g, n, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Qi(p) || Po(p)) && p.append(m), r.append(p), u) {
      const h = u.call(s, p);
      h && (Po(p) ? p.replaceChildren(h) : p.replaceWith(h));
    }
  } else r.append(m);
  return a;
}
const pa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ua(t, e, r, n, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (pa.has(t.nodeName)) return s;
  let l = null;
  const w = function(g, v) {
    const { nodeName: b } = g, x = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (x !== void 0) for (const _ of x) {
      const k = _(g);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let p = null;
  if (c !== null) {
    p = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const u = t.childNodes;
  let m = [];
  const h = (l == null || !es(l)) && (l != null && cr(l) || n);
  for (let g = 0; g < u.length; g++) m.push(...ua(u[g], e, r, h, new Map(a), l));
  return p != null && (m = p(m)), $o(t) && (m = Yl(t, m, h ? () => {
    const g = new Mn();
    return r.push(g), g;
  } : mr)), l == null ? m.length > 0 ? s = s.concat(m) : $o(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Lo(g.nextSibling) && Lo(g.previousSibling);
  }(t) && (s = s.concat(On())) : Xt(l) && l.append(...m), s;
}
function Yl(t, e, r) {
  const n = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (cr(l)) n && !l.getFormat() && l.setFormat(n), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && cr(e[s + 1])) {
      const w = r();
      w.setFormat(n), w.append(...i), a.push(w), i = [];
    }
  }
  return a;
}
function ha(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), n = document.createRange();
  return n.selectNodeContents(e), n.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(n), !0;
}
function fa(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : fa(e.children)
  ) : !1;
}
function Rt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? fa(t.root.children) : !1;
}
function Jl(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = An({
    namespace: "EditorUtils",
    theme: wo,
    nodes: po,
    onError: (n) => {
      console.error(n);
    }
  });
  let r;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = Hl(e, a);
      te().clear(), rs(i);
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
function pr(t) {
  const e = An({
    namespace: "EditorUtils",
    theme: wo,
    nodes: po,
    onError: (a) => {
      console.error(a);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let n = "";
  return e.getEditorState().read(() => {
    n = Wl(e);
  }), n = n.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), n;
}
function mo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function lr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function go(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Xl = {
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
function Ir(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function hd({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: n
}) {
  const [a, i] = T(Xl), [s, l] = T(void 0), [w, c] = T(!1), p = H(void 0), u = H(null);
  q(() => {
    let x = !0;
    const y = u.current;
    if (!y) return;
    const _ = setTimeout(() => {
      x && ha(y);
    }, 300);
    return () => {
      x = !1, clearTimeout(_);
    };
  }, []);
  const m = B(() => {
    if (!Rt(a)) return;
    const x = pr(a);
    e(x, s);
  }, [a, e, s]), h = n["%commentEditor_placeholder%"] ?? "Type your comment here...", g = n["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = n["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = n["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ o("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ d("div", { className: "tw:flex tw:gap-2", children: [
        /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
          /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(F, { onClick: r, className: "tw:h-6 tw:w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(Oe, {}) }) }),
          /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ o("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
          /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(
            F,
            {
              onClick: m,
              className: "tw:h-6 tw:w-6",
              size: "icon",
              variant: "default",
              disabled: !Rt(a),
              children: /* @__PURE__ */ o(jt, {})
            }
          ) }),
          /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ o("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ d(Ut, { open: w, onOpenChange: c, children: [
      /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ d(
        F,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ o(wn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { children: Ir(s !== void 0 ? s : "", n) })
          ]
        }
      ) }),
      /* @__PURE__ */ o(
        Ht,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ o(ie, { children: /* @__PURE__ */ o(se, { children: t.map((x) => /* @__PURE__ */ o(
            Gt,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), c(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ o("span", { children: Ir(x, n) })
            },
            x || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: u,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-none",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), r()) : go(x) && (x.preventDefault(), x.stopPropagation(), Rt(a) && m());
        },
        onKeyDown: (x) => {
          mo(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ o(
          dr,
          {
            editorSerializedState: a,
            onSerializedChange: (x) => i(x),
            placeholder: h,
            onClear: (x) => {
              p.current = x;
            }
          }
        )
      }
    )
  ] });
}
const fd = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), md = [
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
], Zl = ["input", "select", "textarea", "button"], Ql = ["button", "textbox"], tc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = H(null), [i, s] = T(void 0), [l, w] = T(void 0), c = B(
    (h) => {
      s(h);
      const g = t.find((b) => b.id === h);
      g && (e == null || e(g));
      const v = document.getElementById(h);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), p = B(
    (h) => {
      const g = t.find((v) => v.id === h);
      g && (w((v) => v === h ? void 0 : h), r == null || r(g));
    },
    [r, t]
  ), u = (h) => {
    if (!h) return !1;
    const g = h.tagName.toLowerCase();
    if (h.isContentEditable || Zl.includes(g)) return !0;
    const v = h.getAttribute("role");
    if (v && Ql.includes(v)) return !0;
    const b = h.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, m = B(
    (h) => {
      var E;
      const g = h.target, v = (P) => P ? document.getElementById(P) : void 0, b = v(l), x = v(i);
      if (!!(b && g && b.contains(g) && g !== b) && u(g)) {
        if (h.key === "Escape" || h.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            h.preventDefault(), h.stopPropagation();
            const P = t.find((N) => N.id === l);
            P && c(P.id);
          }
          return;
        }
        if (h.key === "ArrowDown" || h.key === "ArrowUp") {
          if (!b) return;
          const P = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (P.length === 0) return;
          const N = P.findIndex((L) => L === g);
          if (N === -1) return;
          let S;
          h.key === "ArrowDown" ? S = Math.min(N + 1, P.length - 1) : S = Math.max(N - 1, 0), S !== N && (h.preventDefault(), h.stopPropagation(), (E = P[S]) == null || E.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((P) => P.id === i);
      let j = k;
      switch (h.key) {
        case "ArrowDown":
          j = Math.min(k + 1, t.length - 1), h.preventDefault();
          break;
        case "ArrowUp":
          j = Math.max(k - 1, 0), h.preventDefault();
          break;
        case "Home":
          j = 0, h.preventDefault();
          break;
        case "End":
          j = t.length - 1, h.preventDefault();
          break;
        case " ":
        case "Enter":
          i && p(i), h.preventDefault(), h.stopPropagation();
          return;
        case "ArrowRight": {
          const P = x;
          if (P) {
            const N = P.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = P.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), L = N ?? S;
            if (L) {
              h.preventDefault(), L.focus();
              return;
            }
          }
          break;
        }
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (u(g) || (n == null || n(h.key), h.preventDefault()));
          return;
      }
      const $ = t[j];
      $ && c($.id);
    },
    [t, c, i, l, p, n]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: m,
    /** Focus an option by its ID */
    focusOption: c
  };
}, ec = ne(
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
function qe({
  className: t,
  variant: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o("div", { ref: r, className: f("pr-twp", ec({ variant: e }), t), ...n });
}
function rc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: f(
        "pr-twp tw:rounded-xl tw:border tw:bg-card tw:text-card-foreground tw:shadow",
        t
      ),
      ...r
    }
  );
}
function gd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: f("pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6", t),
      ...r
    }
  );
}
function bd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "h3",
    {
      ref: e,
      className: f("pr-twp tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r,
      children: r.children
    }
  );
}
function vd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "p",
    {
      ref: e,
      className: f("pr-twp tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function oc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: f("pr-twp tw:p-6 tw:pt-0", t), ...r });
}
function xd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      className: f("pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0", t),
      ...r
    }
  );
}
function Ge({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    ws.Root,
    {
      ref: n,
      decorative: r,
      orientation: e,
      className: f(
        "pr-twp tw:shrink-0 tw:bg-border",
        e === "horizontal" ? "tw:h-[1px] tw:w-full" : "tw:h-full tw:w-[1px]",
        t
      ),
      ...a
    }
  );
}
function nc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    io.Root,
    {
      ref: e,
      className: f(
        "pr-twp tw:relative tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:overflow-hidden tw:rounded-full",
        t
      ),
      ...r
    }
  );
}
function yd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    io.Image,
    {
      ref: e,
      className: f("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...r
    }
  );
}
function ac({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    io.Fallback,
    {
      ref: e,
      className: f(
        "pr-twp tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted",
        t
      ),
      ...r
    }
  );
}
const bo = fr(void 0);
function Wt() {
  const t = oo(bo);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const be = ne("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Pe = pt.Trigger, ma = pt.Group, ic = pt.Portal, sc = pt.Sub, lc = pt.RadioGroup;
function ve({ variant: t = "default", ...e }) {
  const r = tt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(bo.Provider, { value: r, children: /* @__PURE__ */ o(pt.Root, { ...e }) });
}
function cc({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  const i = Wt();
  return /* @__PURE__ */ d(
    pt.SubTrigger,
    {
      ref: n,
      className: f(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:data-[state=open]:bg-accent tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        be({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function wc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    pt.SubContent,
    {
      ref: e,
      className: f(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  );
}
function xe({
  className: t,
  sideOffset: e = 4,
  children: r,
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ o(pt.Portal, { children: /* @__PURE__ */ o(
    pt.Content,
    {
      ref: n,
      sideOffset: e,
      className: f(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ o("div", { dir: i, children: r })
    }
  ) });
}
function Qr({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = wt(), i = Wt();
  return /* @__PURE__ */ o(
    pt.Item,
    {
      ref: r,
      className: f(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        be({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
}
function Qt({
  className: t,
  children: e,
  checked: r,
  ref: n,
  ...a
}) {
  const i = Wt();
  return /* @__PURE__ */ d(
    pt.CheckboxItem,
    {
      ref: n,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        be({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(pt.ItemIndicator, { children: /* @__PURE__ */ o(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function dc({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  const a = Wt();
  return /* @__PURE__ */ d(
    pt.RadioItem,
    {
      ref: r,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        be({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ o(pt.ItemIndicator, { children: /* @__PURE__ */ o(ro, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function yr({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    pt.Label,
    {
      ref: r,
      className: f("tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold", e && "tw:pl-8", t),
      ...n
    }
  );
}
function Je({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    pt.Separator,
    {
      ref: e,
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function kd({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: f("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function Qo({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: n = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [w, c] = T(!1), [p, u] = T(), m = H(null);
  q(() => {
    if (!w) return;
    let k = !0;
    const j = m.current;
    if (!j) return;
    const $ = setTimeout(() => {
      k && ha(j);
    }, 300);
    return () => {
      k = !1, clearTimeout($);
    };
  }, [w]);
  const h = B(
    (k) => {
      k && k.stopPropagation(), c(!1), u(void 0), s == null || s(!1);
    },
    [s]
  ), g = B(
    async (k) => {
      if (k && k.stopPropagation(), !p || !a) return;
      await a(
        t.id,
        pr(p)
      ) && (c(!1), u(void 0), s == null || s(!1));
    },
    [p, a, t.id, s]
  ), v = z(() => {
    const k = new Date(t.date), j = hi(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), $ = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ue(r["%comment_dateAtTime%"], {
      date: j,
      time: $
    });
  }, [t.date, r]), b = z(() => t.user, [t.user]), x = z(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = z(() => fi(t.contents), [t.contents]), _ = z(() => {
    if (n && l)
      return /* @__PURE__ */ d(it, { children: [
        /* @__PURE__ */ d(
          Qr,
          {
            onClick: (k) => {
              k.stopPropagation(), c(!0), u(Jl(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ o(La, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          Qr,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ o(Va, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
  return /* @__PURE__ */ d(
    "div",
    {
      className: f("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ o(nc, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ o(ac, { className: "tw:text-xs tw:font-medium", children: x }) }),
        /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ o("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: v }),
            /* @__PURE__ */ o("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ d(qe, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              lr(t.assignedUser, r)
            ] })
          ] }),
          w && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: m,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), h()) : go(k) && (k.preventDefault(), k.stopPropagation(), Rt(p) && g());
              },
              onKeyDown: (k) => {
                mo(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  dr,
                  {
                    className: f(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: p,
                    onSerializedChange: (k) => u(k)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ o(
                    F,
                    {
                      size: "icon",
                      onClick: h,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ o(Oe, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !Rt(p),
                      children: /* @__PURE__ */ o(dn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ d(it, { children: [
            t.status === "Resolved" && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ o(
              "div",
              {
                className: f(
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
        _ && /* @__PURE__ */ d(ve, { children: [
          /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(pn, {}) }) }),
          /* @__PURE__ */ o(xe, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const tn = {
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
function pc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: n = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: w,
  thread: c,
  threadStatus: p,
  handleAddCommentToThread: u,
  handleUpdateComment: m,
  handleDeleteComment: h,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: j = 5,
  onVerseRefClick: $
}) {
  const [E, P] = T(tn), [N, S] = T(
    void 0
  ), L = n, [V, O] = T(!1), [I, U] = T(!1), [D, Y] = T(!1), [kt, Ct] = T(!1), [Et, st] = T(!1), [A, R] = T(k), [K, X] = T(!1), Z = H(void 0), [nt, vt] = T(/* @__PURE__ */ new Map());
  q(() => {
    let M = !0;
    return (async () => {
      const _t = y ? await y(w) : !1;
      M && st(_t);
    })(), () => {
      M = !1;
    };
  }, [w, y]), q(() => {
    let M = !0;
    if (!n) {
      Ct(!1), vt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = x ? await x(w) : !1;
      M && Ct(_t);
    })(), () => {
      M = !1;
    };
  }, [n, w, x]);
  const lt = z(() => e.filter((M) => !M.deleted), [e]);
  q(() => {
    let M = !0;
    if (!n || !_) {
      vt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = /* @__PURE__ */ new Map();
      await Promise.all(
        lt.map(async (To) => {
          const Da = await _(To.id);
          M && _t.set(To.id, Da);
        })
      ), M && vt(_t);
    })(), () => {
      M = !1;
    };
  }, [n, lt, _]);
  const xt = z(() => lt[0], [lt]), Tt = H(null), ht = H(void 0), ft = B(() => {
    var M;
    (M = ht.current) == null || M.call(ht), P(tn);
  }, []), Bt = B(() => {
    const M = !A;
    R(M), X(!M), g == null || g(w, M);
  }, [A, g, w]);
  q(() => {
    O(!1);
  }, [n]), q(() => {
    if (n && !A && !K) {
      const M = setTimeout(() => {
        R(!0), g == null || g(w, !0);
      }, j * 1e3);
      return Z.current = M, () => clearTimeout(M);
    }
    Z.current && (clearTimeout(Z.current), Z.current = void 0);
  }, [n, A, K, j, w, g]);
  const C = z(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), W = z(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const M = lr(i, r);
    return ue(r["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [i, r]), rt = z(() => lt.slice(1), [lt]), ot = z(() => rt.length ?? 0, [rt.length]), ct = z(() => ot > 0, [ot]), Kt = z(() => V || ot <= 2 ? rt : rt.slice(-2), [rt, ot, V]), yt = z(() => V || ot <= 2 ? 0 : ot - 2, [ot, V]), Ze = z(
    () => ot === 1 ? C.singleReply : ue(C.multipleReplies, { count: ot }),
    [ot, C]
  ), ce = z(
    () => yt === 1 ? C.singleReply : ue(C.multipleReplies, { count: yt }),
    [yt, C]
  );
  q(() => {
    !n && I && ct && U(!1);
  }, [n, I, ct]);
  const Co = B(
    async (M) => {
      M && M.stopPropagation();
      const At = Rt(E) ? pr(E) : void 0;
      if (N !== void 0) {
        await u({
          threadId: w,
          contents: At,
          assignedUser: N
        }) && (S(void 0), At && ft());
        return;
      }
      At && await u({ threadId: w, contents: At }) && ft();
    },
    [
      ft,
      E,
      u,
      N,
      w
    ]
  ), Eo = B(
    async (M) => {
      const At = Rt(E) ? pr(E) : void 0, _t = await u({
        ...M,
        contents: At,
        assignedUser: N ?? M.assignedUser
      });
      return _t && At && ft(), _t && N !== void 0 && S(void 0), _t;
    },
    [ft, E, u, N]
  );
  return /* @__PURE__ */ o(
    rc,
    {
      role: "option",
      "aria-selected": n,
      id: w,
      className: f(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-none tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !n },
        {
          "tw:bg-primary-foreground": !n && p !== "Resolved" && A,
          "tw:bg-background": n && p !== "Resolved" && A,
          "tw:bg-muted": p === "Resolved",
          "tw:bg-accent": !A && !n && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(w);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(oc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            W && /* @__PURE__ */ o(qe, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: W }),
            /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "icon",
                onClick: (M) => {
                  M.stopPropagation(), Bt();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": A ? "Mark as unread" : "Mark as read",
                children: A ? /* @__PURE__ */ o(ja, {}) : /* @__PURE__ */ o(za, {})
              }
            ),
            Et && p !== "Resolved" && /* @__PURE__ */ o(
              F,
              {
                variant: "ghost",
                size: "icon",
                className: f(
                  "tw:ms-auto",
                  "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                  "tw:opacity-0 tw:group-hover:opacity-100"
                ),
                onClick: (M) => {
                  M.stopPropagation(), Eo({
                    threadId: w,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ o(jt, { className: "tw:h-4 tw:w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ d(
            "p",
            {
              ref: Tt,
              className: f(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": L
                },
                { "tw:whitespace-nowrap": !L }
              ),
              children: [
                a && $ ? /* @__PURE__ */ o(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (M) => {
                      M.stopPropagation(), $(c);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ d("span", { className: t, children: [
                  xt.contextBefore,
                  /* @__PURE__ */ o("span", { className: "tw:font-bold", children: xt.selectedText }),
                  xt.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ o(
            Qo,
            {
              comment: xt,
              localizedStrings: r,
              isThreadExpanded: n,
              threadStatus: p,
              handleAddCommentToThread: Eo,
              handleUpdateComment: m,
              handleDeleteComment: h,
              onEditingChange: U,
              canEditOrDelete: (!I && nt.get(xt.id)) ?? !1,
              canUserResolveThread: Et
            }
          )
        ] }),
        /* @__PURE__ */ d(it, { children: [
          ct && !n && /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Ge, {}) }),
            /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ze })
          ] }),
          !n && Rt(E) && /* @__PURE__ */ o(
            dr,
            {
              editorSerializedState: E,
              onSerializedChange: (M) => P(M),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ d(it, { children: [
            yt > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (M) => {
                  M.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (M) => {
                  (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw:w-8", children: /* @__PURE__ */ o(Ge, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: ce }),
                    V ? /* @__PURE__ */ o(un, {}) : /* @__PURE__ */ o(Ie, {})
                  ] })
                ]
              }
            ),
            Kt.map((M) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
              Qo,
              {
                comment: M,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: n,
                handleUpdateComment: m,
                handleDeleteComment: h,
                onEditingChange: U,
                canEditOrDelete: (!I && nt.get(M.id)) ?? !1
              }
            ) }, M.id)),
            b !== !1 && (!I || Rt(E)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (M) => M.stopPropagation(),
                onKeyDownCapture: (M) => {
                  go(M) && (M.preventDefault(), M.stopPropagation(), (Rt(E) || N !== void 0) && Co());
                },
                onKeyDown: (M) => {
                  mo(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ o(
                    dr,
                    {
                      editorSerializedState: E,
                      onSerializedChange: (M) => P(M),
                      placeholder: p === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (M) => {
                        ht.current = M;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    N !== void 0 && /* @__PURE__ */ o("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: ue(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: lr(
                          N,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(Ut, { open: D, onOpenChange: Y, children: [
                      /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ o(
                        F,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !kt || !v || v.length === 0 || !v.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ o(wn, {})
                        }
                      ) }),
                      /* @__PURE__ */ o(
                        Ht,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (M) => {
                            M.key === "Escape" && (M.stopPropagation(), Y(!1));
                          },
                          children: /* @__PURE__ */ o(ie, { children: /* @__PURE__ */ o(se, { children: v == null ? void 0 : v.map((M) => /* @__PURE__ */ o(
                            Gt,
                            {
                              onSelect: () => {
                                S(M !== i ? M : void 0), Y(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ o("span", { children: lr(M, r) })
                            },
                            M || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ o(
                      F,
                      {
                        size: "icon",
                        onClick: Co,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !Rt(E) && N === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ o(dn, {})
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
function _d({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: n,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: w,
  assignableUsers: c,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: u,
  canUserResolveThreadCallback: m,
  canUserEditOrDeleteCommentCallback: h,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [x, y] = T(/* @__PURE__ */ new Set()), [_, k] = T();
  q(() => {
    g && (y((O) => new Set(O).add(g)), k(g));
  }, [g]);
  const j = r.filter(
    (O) => O.comments.some((I) => !I.deleted)
  ), $ = j.map((O) => ({
    id: O.id
  })), E = B(
    (O) => {
      y((I) => new Set(I).add(O.id)), k(O.id), v == null || v(O.id);
    },
    [v]
  ), P = B(
    (O) => {
      const I = x.has(O);
      y((U) => {
        const D = new Set(U);
        return D.has(O) ? D.delete(O) : D.add(O), D;
      }), k(O), v == null || v(I ? void 0 : O);
    },
    [x, v]
  ), { listboxRef: N, activeId: S, handleKeyDown: L } = tc({
    options: $,
    onOptionSelect: E
  }), V = B(
    (O) => {
      O.key === "Escape" ? (_ && x.has(_) && (y((I) => {
        const U = new Set(I);
        return U.delete(_), U;
      }), k(void 0), v == null || v(void 0)), O.preventDefault(), O.stopPropagation()) : L(O);
    },
    [_, x, L, v]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: N,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: j.map((O) => /* @__PURE__ */ o(
        "div",
        {
          id: O.id,
          className: f({
            "tw:opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            pc,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: a,
              verseRef: O.verseRef,
              handleSelectThread: P,
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
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: u,
              canUserResolveThreadCallback: m,
              canUserEditOrDeleteCommentCallback: h,
              onVerseRefClick: b
            }
          )
        },
        O.id
      ))
    }
  );
}
function uc({ table: t }) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(ds, { asChild: !0, children: /* @__PURE__ */ d(F, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ o(Fa, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(xe, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ o(yr, { children: "Toggle columns" }),
      /* @__PURE__ */ o(Je, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ o(
        Qt,
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
const Se = bt.Root, hc = bt.Group, Re = bt.Value, fc = ne(
  "tw:flex tw:h-9 tw:w-full tw:items-center tw:justify-between tw:whitespace-nowrap tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-sm tw:shadow-sm tw:ring-offset-background tw:data-[placeholder]:text-muted-foreground tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:[&>span]:line-clamp-1",
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
function De({
  className: t,
  children: e,
  size: r,
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ d(
    bt.Trigger,
    {
      className: f(fc({ size: r, className: t })),
      ref: n,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ o(bt.Icon, { asChild: !0, children: /* @__PURE__ */ o(Ie, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function mc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    bt.ScrollUpButton,
    {
      ref: e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(un, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function gc({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    bt.ScrollDownButton,
    {
      ref: e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(Ie, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Me({
  className: t,
  children: e,
  position: r = "popper",
  ref: n,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ o(bt.Portal, { children: /* @__PURE__ */ d(
    bt.Content,
    {
      ref: n,
      className: f(
        "pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      ...a,
      children: [
        /* @__PURE__ */ o(mc, {}),
        /* @__PURE__ */ o(
          bt.Viewport,
          {
            className: f(
              "tw:p-1",
              r === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ o(gc, {})
      ]
    }
  ) });
}
function Nd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    bt.Label,
    {
      ref: e,
      className: f("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...r
    }
  );
}
function St({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    bt.Item,
    {
      ref: r,
      className: f(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(bt.ItemIndicator, { children: /* @__PURE__ */ o(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ o(bt.ItemText, { children: e })
      ]
    }
  );
}
function Cd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    bt.Separator,
    {
      ref: e,
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
function bc({ table: t }) {
  return /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ o("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        Se,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ o(De, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ o(Re, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(Me, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ o(St, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ d(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(Ba, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(Ka, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(qa, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(Ga, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const en = `
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
function vc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Ue(t, e) {
  const r = e ? `${en}, ${e}` : en;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && vc(n)
  );
}
function vo({
  className: t,
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = tt.useRef(null);
  tt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), tt.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        Ue(s, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
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
        s.preventDefault(), Ue(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ o("div", { className: f("pr-twp tw:relative tw:w-full", { "tw:p-1": e }), children: /* @__PURE__ */ o(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: a,
      className: f(
        "tw:w-full tw:caption-bottom tw:text-sm tw:outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
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
function xo({
  className: t,
  stickyHeader: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: r,
      className: f(
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
function yo({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("tbody", { ref: e, className: f("tw:[&_tr:last-child]:border-0", t), ...r });
}
function Ed({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: e,
      className: f(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...r
    }
  );
}
function xc(t) {
  tt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Ue(t.current) : [], i = a.indexOf(document.activeElement), s = n.key === "ArrowRight" ? i + 1 : i - 1;
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
function yc(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function kc(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Jt({
  className: t,
  onKeyDown: e,
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...i
}) {
  const s = tt.useRef(null);
  tt.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), xc(s);
  const l = tt.useMemo(
    () => s.current ? Ue(s.current) : [],
    [s]
  ), w = tt.useCallback(
    (p) => {
      const { current: u } = s;
      if (!u || !u.parentElement) return;
      const m = u.closest("table"), h = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Ue(m).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = h.indexOf(u), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), kc(h, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), yc(l, v, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const b = u.closest("table");
        b && b.focus();
      }
      e == null || e(p);
    },
    [s, l, e]
  ), c = tt.useCallback(
    (p) => {
      n && (r == null || r(p));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: w,
      onFocus: c,
      className: f(
        // CUSTOM: Add focus styles and add tw:outline-none so there isn't a duplicate outline
        "tw:border-b tw:outline-none tw:transition-colors tw:hover:bg-muted/50",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        "tw:data-[state=selected]:bg-muted",
        t
      ),
      ...i
    }
  );
}
function ur({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "th",
    {
      ref: e,
      className: f(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:text-muted-foreground tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...r
    }
  );
}
function Ne({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "td",
    {
      ref: e,
      className: f(
        "tw:p-2 tw:align-middle tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...r
    }
  );
}
function Td({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "caption",
    {
      ref: e,
      className: f("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function to({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: f("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function _c({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: w = !1,
  noResultsMessage: c
}) {
  var $;
  const [p, u] = T([]), [m, h] = T([]), [g, v] = T({}), [b, x] = T({}), y = z(() => e ?? [], [e]), _ = Pn({
    data: y,
    columns: t,
    getCoreRowModel: Ln(),
    ...r && { getPaginationRowModel: us() },
    onSortingChange: u,
    getSortedRowModel: $n(),
    onColumnFiltersChange: h,
    getFilteredRowModel: ps(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: x,
    state: {
      sorting: p,
      columnFilters: m,
      columnVisibility: g,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let j;
  return w ? j = Array.from({ length: 10 }).map((N, S) => `skeleton-row-${S}`).map((N) => /* @__PURE__ */ o(Jt, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ o(Ne, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ o("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ o(to, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, N)) : (($ = _.getRowModel().rows) == null ? void 0 : $.length) > 0 ? j = _.getRowModel().rows.map((E) => /* @__PURE__ */ o(
    Jt,
    {
      onClick: () => s(E, _),
      "data-state": E.getIsSelected() && "selected",
      children: E.getVisibleCells().map((P) => /* @__PURE__ */ o(Ne, { children: je(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    E.id
  )) : j = /* @__PURE__ */ o(Jt, { children: /* @__PURE__ */ o(Ne, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: c }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(uc, { table: _ }),
    /* @__PURE__ */ d(vo, { stickyHeader: i, children: [
      /* @__PURE__ */ o(xo, { stickyHeader: i, children: _.getHeaderGroups().map((E) => /* @__PURE__ */ o(Jt, { children: E.headers.map((P) => /* @__PURE__ */ o(ur, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : je(P.column.columnDef.header, P.getContext()) }, P.id)) }, E.id)) }),
      /* @__PURE__ */ o(yo, { children: j })
    ] }),
    r && /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ o(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
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
    r && n && /* @__PURE__ */ o(bc, { table: _ })
  ] });
}
function Sd({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: n,
  truncate: a
}) {
  const i = z(
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
      className: f(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": a
        },
        r
      ),
      children: /* @__PURE__ */ o(ms, { options: i, children: e })
    }
  );
}
const Nc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), rn = (t, e) => t[e] ?? e;
function Cc({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: n
}) {
  const a = rn(r, "%webView_error_dump_header%"), i = rn(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ d(
    "div",
    {
      id: n,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ d("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ o("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: a }),
            /* @__PURE__ */ o("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ o(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ o(hn, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ o("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Rd = Object.freeze([
  ...Nc,
  "%webView_error_dump_copied_message%"
]);
function Dd({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: n,
  className: a,
  id: i
}) {
  const [s, l] = T(!1), w = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ d(Ut, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ o(le, { asChild: !0, children: n }),
    /* @__PURE__ */ d(Ht, { id: i, className: f("tw:min-w-80 tw:max-w-96", a), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(dt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        Cc,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Ec = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Ec || {});
function Md({ id: t, label: e, groups: r }) {
  const [n, a] = T(
    Object.fromEntries(
      r.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = T({}), l = (c, p) => {
    const u = !n[c][p];
    a((h) => (h[c][p] = u, { ...h }));
    const m = r[c].items[p];
    m.onUpdate(m.id, u);
  }, w = (c, p) => {
    s((m) => (m[c] = p, { ...m }));
    const u = r[c].items.find((m) => m.id === p);
    u ? u.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ o("div", { id: t, children: /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ d(F, { variant: "default", children: [
      /* @__PURE__ */ o(Ua, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ o(Ie, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ o(xe, { children: r.map((c, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o(yr, { children: c.label }),
      /* @__PURE__ */ o(ma, { children: c.itemType === 0 ? /* @__PURE__ */ o(it, { children: c.items.map((u, m) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        Qt,
        {
          checked: n[p][m],
          onCheckedChange: () => l(p, m),
          children: u.label
        }
      ) }, u.id)) }) : /* @__PURE__ */ o(
        lc,
        {
          value: i[p],
          onValueChange: (u) => w(p, u),
          children: c.items.map((u) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(dc, { value: u.id, children: u.label }) }, u.id))
        }
      ) }),
      /* @__PURE__ */ o(Je, {})
    ] }, c.label)) })
  ] }) });
}
function Od({
  id: t,
  category: e,
  downloads: r,
  languages: n,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const w = new mi("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((p, u) => p + u, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ o("div", { className: "tw:flex", children: /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ o(Ha, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-2", children: n.slice(0, 3).map((p) => /* @__PURE__ */ o("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: p.toUpperCase() }, p)) }),
          n.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => c(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                n.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || s) && /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          a && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ d(
            F,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(Wa, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ o("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ d(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(Ya, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Tc({ id: t, versionHistory: e }) {
  const [r, n] = T(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), p = c.getUTCFullYear() - 1970, u = c.getUTCMonth(), m = c.getUTCDate() - 1;
    let h = "";
    return p > 0 ? h = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? h = `${u.toString()} month${u === 1 ? "" : "s"} ago` : m === 0 ? h = "today" : h = `${m.toString()} day${m === 1 ? "" : "s"} ago`, h;
  }
  const s = Object.entries(e).sort((l, w) => w[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ o("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ o("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ o("div", { className: "tw:text-foreground", children: /* @__PURE__ */ o("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ o("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ d("div", { children: [
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
function Id({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: n,
  versionHistory: a,
  currentVersion: i
}) {
  const s = z(() => gi(r), [r]), w = ((c) => {
    const p = new Intl.DisplayNames(bi(), { type: "language" });
    return c.map((u) => p.of(u));
  })(n);
  return /* @__PURE__ */ o("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(Tc, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ o("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Publisher" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ o("span", { children: "Size" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ d("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Version" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ o("span", { children: "Languages" }),
          /* @__PURE__ */ o("span", { className: "tw:font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Sc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: u = !1,
  sortSelected: m = !1,
  icon: h = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [x, y] = T(!1), _ = B(
    (S) => {
      var V;
      const L = (V = t.find((O) => O.label === S)) == null ? void 0 : V.value;
      L && r(
        e.includes(L) ? e.filter((O) => O !== L) : [...e, L]
      );
    },
    [t, e, r]
  ), k = () => w || n, j = z(() => {
    if (!m) return t;
    const S = t.filter((V) => V.starred).sort((V, O) => V.label.localeCompare(O.label)), L = t.filter((V) => !V.starred).sort((V, O) => {
      const I = e.includes(V.value), U = e.includes(O.value);
      return I && !U ? -1 : !I && U ? 1 : V.label.localeCompare(O.label);
    });
    return [...S, ...L];
  }, [t, e, m]), $ = () => {
    r(t.map((S) => S.value));
  }, E = () => {
    r([]);
  }, P = c ?? x;
  return /* @__PURE__ */ o("div", { id: b, className: g, children: /* @__PURE__ */ d(Ut, { open: P, onOpenChange: p ?? y, children: [
    /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ d(
      F,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": P,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: u,
        children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            h && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: h }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ o(fn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Ht, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ d(ie, { children: [
      /* @__PURE__ */ o(Ye, { placeholder: `Search ${n.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: $, children: i }),
        /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: E, children: s })
      ] }),
      /* @__PURE__ */ d(se, { children: [
        /* @__PURE__ */ o(br, { children: l }),
        /* @__PURE__ */ o(re, { children: j.map((S) => /* @__PURE__ */ d(
          Gt,
          {
            value: S.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                jt,
                {
                  className: f(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ o(Ja, { className: "tw:h-4 tw:w-4" }),
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
function Ad({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: w,
  className: c,
  badgesPlaceholder: p,
  id: u
}) {
  return /* @__PURE__ */ d("div", { id: u, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Sc,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: n,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: w,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((m) => {
      var h;
      return /* @__PURE__ */ d(qe, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ o(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((g) => g !== m)),
            children: /* @__PURE__ */ o(Oe, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (h = t.find((g) => g.value === m)) == null ? void 0 : h.label
      ] }, m);
    }) }) : /* @__PURE__ */ o(dt, { children: p })
  ] });
}
function Rc({ children: t, editorRef: e }) {
  const r = H(null);
  return q(() => {
    var s;
    const n = /Macintosh/i.test(navigator.userAgent), a = ((s = r.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var w, c;
      a && document.activeElement === a && (n ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (w = e.current) == null || w.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (c = e.current) == null || c.undo()));
    };
    return a == null || a.addEventListener("keydown", i), () => {
      a == null || a.removeEventListener("keydown", i);
    };
  }, [e]), /* @__PURE__ */ o("div", { ref: r, children: t });
}
function Xe({
  className: t,
  type: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      className: f(
        "pr-twp tw:flex tw:h-9 tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-1 tw:text-base tw:shadow-sm tw:transition-colors tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: r,
      ...n
    }
  );
}
const Dc = (t, e, r) => t === "generated" ? /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Mc({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: n,
  localizedStrings: a
}) {
  const i = H(null), s = H(null), l = H(!1), [w, c] = T(t), [p, u] = T(r), [m, h] = T(!1);
  q(() => {
    c(t);
  }, [t]), q(() => {
    p !== r && u(r);
  }, [r]);
  const g = (b) => {
    l.current = !1, h(b), b || (w !== "custom" || p ? (e(w), n(p)) : (c(t), u(r)));
  }, v = (b) => {
    var x, y, _, k;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((x = i.current) == null || x.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = s.current) == null || k.focus(), l.current = !1), w === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ d(ve, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
      /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "outline", className: "tw:h-6", children: Dc(t, a, r) }) }) }),
      /* @__PURE__ */ o(Mt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      xe,
      {
        className: "tw:z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ o(yr, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(Je, {}),
          /* @__PURE__ */ o(
            Qt,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Kr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Qt,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: qr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Qt,
            {
              ref: s,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (b) => {
                var x;
                b.stopPropagation(), l.current = !0, (x = i.current) == null || x.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Xe,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: p,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => u(b.target.value)
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
const Oc = (t, e) => t === "f" ? /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o(gn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o(bn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(it, { children: [
  /* @__PURE__ */ o(mn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ic = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), ue(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Ac({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n
}) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
      /* @__PURE__ */ o(os, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(F, { variant: "outline", className: "tw:h-6", children: Oc(t, r) }) }) }),
      /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ o("p", { children: Ic(t, r) }) })
    ] }) }),
    /* @__PURE__ */ d(xe, { className: "tw:z-[300]", children: [
      /* @__PURE__ */ o(yr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o(Je, {}),
      /* @__PURE__ */ d(
        Qt,
        {
          disabled: t !== "x" && !n,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(mn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Qt,
        {
          disabled: t === "x" && !n,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(gn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Qt,
        {
          disabled: t === "x" && !n,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ o(bn, {}),
            /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Pc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function $c({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Xa, { className: e, size: 16 });
}
function Lc({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [n, a] = T(""), i = z(() => {
    const s = n.trim().toLowerCase();
    return s ? e.filter(
      (l) => {
        var w;
        return ((w = l.marker) == null ? void 0 : w.toLowerCase().includes(s)) || l.title.toLowerCase().includes(s);
      }
    ) : e;
  }, [n, e]);
  return /* @__PURE__ */ d(ie, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      Ye,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (s) => a(s),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(se, { children: [
      /* @__PURE__ */ o(br, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(re, { children: i.map((s) => {
        var l;
        return /* @__PURE__ */ d(
          Gt,
          {
            className: "tw:flex tw:gap-2 tw:hover:bg-accent",
            disabled: s.isDisallowed || s.isDeprecated,
            onSelect: s.action,
            children: [
              /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: s.marker ? /* @__PURE__ */ o("span", { className: "tw:text-xs", children: s.marker }) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o($c, { icon: s.icon }) }) }),
              /* @__PURE__ */ d("div", { children: [
                /* @__PURE__ */ o("p", { className: "tw:text-sm", children: s.title }),
                s.subtitle && /* @__PURE__ */ o("p", { className: "tw:text-xs tw:text-muted-foreground", children: s.subtitle })
              ] }),
              (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ o(Ms, { className: "tw:font-sans", children: s.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${s.marker ?? ((l = s.icon) == null ? void 0 : l.displayName)}-${s.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function Vc(t, e, r, n) {
  if (!n || n === "p") return [];
  const a = ar[n];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[ar[l].description] ?? ar[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function jc(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function zc(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Fc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Pd({
  classNameForEditor: t,
  noteOps: e,
  onSave: r,
  onClose: n,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: w
}) {
  const c = H(null), p = H(null), u = H(null), [m, h] = T("generated"), [g, v] = T("*"), [b, x] = T("f"), [y, _] = T(!1), [k, j] = T(!1), [$, E] = T(), [P, N] = T(), [S, L] = T(), [V, O] = T(), I = H(null), U = z(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? gs(), noteMode: "expanded" }
    }),
    [s, l]
  ), D = z(
    () => Vc(
      c,
      () => j(!1),
      w,
      V
    ),
    [w, V]
  );
  q(() => {
    var A;
    k || (A = c.current) == null || A.focus();
  }, [b, k]), q(() => {
    var K, X;
    let A;
    const R = e == null ? void 0 : e.at(0);
    if (R && tr("note", R)) {
      const Z = (K = R.insert.note) == null ? void 0 : K.caller;
      let nt = "custom";
      Z === Kr ? nt = "generated" : Z === qr ? nt = "hidden" : Z && v(Z), h(nt), x(((X = R.insert.note) == null ? void 0 : X.style) ?? "f"), A = setTimeout(() => {
        var vt;
        (vt = c.current) == null || vt.applyUpdate([R]);
      }, 0);
    }
    return () => {
      A && clearTimeout(A);
    };
  }, [e, i]);
  const Y = B(() => {
    var R, K;
    const A = (K = (R = c.current) == null ? void 0 : R.getNoteOps(0)) == null ? void 0 : K.at(0);
    A && tr("note", A) && (A.insert.note && (m === "custom" ? A.insert.note.caller = g : A.insert.note.caller = m === "generated" ? Kr : qr), r([A]));
  }, [m, g, r]), kt = () => {
    var R;
    const A = (R = p.current) == null ? void 0 : R.getElementsByClassName("editor-input")[0];
    A != null && A.textContent && navigator.clipboard.writeText(A.textContent);
  }, Ct = (A) => {
    var K, X, Z, nt, vt;
    x(A);
    const R = (X = (K = c.current) == null ? void 0 : K.getNoteOps(0)) == null ? void 0 : X.at(0);
    if (R && tr("note", R)) {
      R.insert.note && (R.insert.note.style = A);
      const lt = (nt = (Z = R.insert.note) == null ? void 0 : Z.contents) == null ? void 0 : nt.ops;
      b !== "x" && A === "x" ? lt == null || lt.forEach((xt) => jc(xt)) : b === "x" && A !== "x" && (lt == null || lt.forEach((xt) => zc(xt))), (vt = c.current) == null || vt.applyUpdate([R, { delete: 1 }]);
    }
  }, Et = (A) => {
    var K, X, Z, nt, vt, lt;
    (K = c.current) == null || K.focus();
    const R = (Z = (X = c.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (R && tr("note", R)) {
      A.content.length > 1 && setTimeout(() => {
        var ht;
        (ht = c.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const xt = (nt = R.insert.note) == null ? void 0 : nt.style, Tt = (lt = (vt = R.insert.note) == null ? void 0 : vt.contents) == null ? void 0 : lt.ops;
      xt || _(!1), _(
        xt === "x" ? !!(Tt != null && Tt.every((ht) => {
          var Bt, C;
          if (!((Bt = ht.attributes) != null && Bt.char)) return !0;
          const ft = ((C = ht.attributes) == null ? void 0 : C.char).style;
          return ft === "xt" || ft === "xo" || ft === "xq";
        })) : !!(Tt != null && Tt.every((ht) => {
          var Bt, C;
          if (!((Bt = ht.attributes) != null && Bt.char)) return !0;
          const ft = ((C = ht.attributes) == null ? void 0 : C.char).style;
          return ft === "ft" || ft === "fr" || ft === "fq";
        }))
      );
    } else
      _(!1);
  }, st = B(() => {
    const A = window.getSelection();
    if (u.current && D.length && A && A.rangeCount > 0) {
      const R = A.getRangeAt(0).getBoundingClientRect(), K = u.current.getBoundingClientRect();
      E(R.left - K.left), N(R.top - K.top), L(R.height), j(!0);
    }
  }, [D, u]);
  return q(() => {
    const A = () => {
      k && j(!1);
    };
    return window.addEventListener("click", A), () => {
      window.removeEventListener("click", A);
    };
  }, [k]), q(() => {
    var A;
    k && ((A = I.current) == null || A.focus());
  }, [k]), q(() => {
    var K;
    const A = ((K = p.current) == null ? void 0 : K.querySelector(".editor-input")) ?? void 0, R = (X) => {
      !k && A && document.activeElement === A && X.key === l ? (X.preventDefault(), st()) : k && X.key === "Escape" && (X.preventDefault(), j(!1));
    };
    return document.addEventListener("keydown", R), () => {
      document.removeEventListener("keydown", R);
    };
  }, [k, st, l]), /* @__PURE__ */ d(it, { children: [
    /* @__PURE__ */ d("div", { className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ d("div", { className: "tw:flex", children: [
        /* @__PURE__ */ d("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ o(
            Ac,
            {
              isTypeSwitchable: y,
              noteType: b,
              handleNoteTypeChange: Ct,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ o(
            Mc,
            {
              callerType: m,
              updateCallerType: h,
              customCaller: g,
              updateCustomCaller: v,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "tw:flex tw:w-full tw:justify-end tw:gap-4", children: [
          /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
            /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(
              F,
              {
                onClick: n,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ o(Oe, {})
              }
            ) }),
            /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ o("p", { children: w["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
            /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(
              F,
              {
                onClick: Y,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ o(jt, {})
              }
            ) }),
            /* @__PURE__ */ o(Mt, { children: w["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ d(
        "div",
        {
          ref: p,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(Rc, { editorRef: c, children: /* @__PURE__ */ o(
              bs,
              {
                options: U,
                onStateChange: (A) => O(A.contextMarker),
                onUsjChange: Et,
                defaultUsj: Fc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: c
              }
            ) }) }),
            /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
              /* @__PURE__ */ o(Lt, { asChild: !0, children: /* @__PURE__ */ o(
                F,
                {
                  onClick: kt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ o(hn, {})
                }
              ) }),
              /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ o("p", { children: w["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "tw:absolute",
        ref: u,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ d(Ut, { open: k, children: [
      /* @__PURE__ */ o(
        Is,
        {
          className: "tw:absolute",
          style: {
            top: P,
            left: $,
            height: S,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ o(
        Ht,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (A) => {
            A.preventDefault(), A.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Lc,
            {
              markerMenuItems: D,
              localizedStrings: w,
              searchRef: I
            }
          )
        }
      )
    ] })
  ] });
}
const $d = Object.freeze([
  ...Pc,
  ...Object.entries(ar).map(([, t]) => t.description).filter((t) => !!t),
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
function ga(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((a) => typeof a == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const n = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${n}`;
}
function Bc(t, e, r = !0, n = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, w) => {
    const c = w === i.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      ko(t, l, r, !0, a),
      c && n
    ] }, ga(t, l));
  });
}
function ko(t, e, r = !0, n = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (n) {
          const l = f(`usfm_${t}`);
          return /* @__PURE__ */ o("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ o(jr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ o("span", { children: i }),
              /* @__PURE__ */ o(jr, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Kc(
        i,
        ga(`${t}\\${i.marker}`, [i]),
        r,
        [...a, t ?? "unknown"]
      );
    });
}
function Kc(t, e, r, n = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ d("span", { children: [
    a ? r && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      jr,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    ko(a, t.content, r, !0, [
      ...n,
      a ?? "unknown"
    ])
  ] }, e);
}
function qc({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: n = !0
}) {
  const a = r ? r(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const w = n ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = n ? /* @__PURE__ */ o("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: f("note-caller tw:inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), u = s && /* @__PURE__ */ d(it, { children: [
    ko(t.marker, [s], n, !1),
    " "
  ] }), m = e === "horizontal" ? "horizontal" : "vertical", h = n ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = f(m, h);
  return /* @__PURE__ */ d(it, { children: [
    /* @__PURE__ */ d("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      w,
      p
    ] }),
    /* @__PURE__ */ o("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: u }),
    /* @__PURE__ */ o(
      "div",
      {
        className: f(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ o(it, { children: Bc(t.marker, l, n, c) })
      }
    )
  ] });
}
function Ld({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: n = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: c
}) {
  const p = w ?? vi(r, void 0), u = (y, _) => {
    c == null || c(y, _, a);
  }, m = i ? r.findIndex((y) => y === i) : -1, [h, g] = T(m), v = (y, _, k) => {
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
  }, x = H([]);
  return q(() => {
    var y;
    h >= 0 && h < x.current.length && ((y = x.current[h]) == null || y.focus());
  }, [h]), /* @__PURE__ */ o(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: h < 0 ? 0 : -1,
      className: f("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ o(
        "ul",
        {
          className: f(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            n === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((y, _) => {
            const k = y === i, j = `${a}-${_}`;
            return /* @__PURE__ */ d(it, { children: [
              /* @__PURE__ */ o(
                "li",
                {
                  ref: ($) => {
                    x.current[_] = $;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": y.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === h ? 0 : -1,
                  className: f(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    c && "tw:hover:bg-muted/50",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                    "tw:focus:outline-none tw:focus-visible:outline-none",
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
                  onClick: () => u(y, _),
                  onKeyDown: ($) => v($, y, _),
                  children: /* @__PURE__ */ o(
                    qc,
                    {
                      footnote: y,
                      layout: n,
                      formatCaller: () => p(y.caller, _),
                      showMarkers: s
                    }
                  )
                },
                j
              ),
              _ < r.length - 1 && n === "vertical" && /* @__PURE__ */ o(Ge, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Gc(t) {
  const e = [];
  let r = 0;
  const n = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = n.exec(t)) !== null; )
    a.index > r && e.push(t.substring(r, a.index)), e.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), r = n.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Uc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: n
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = z(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const p = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(p) || (w.add(p), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ d(vo, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(xo, { stickyHeader: !0, children: /* @__PURE__ */ d(Jt, { children: [
      /* @__PURE__ */ o(ur, { children: a }),
      /* @__PURE__ */ o(ur, { children: i })
    ] }) }),
    /* @__PURE__ */ o(yo, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ d(
      Jt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ o(Ne, { children: he(l.reference, "English") }),
          /* @__PURE__ */ o(Ne, { className: n, children: Gc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function ba({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vo.Root,
    {
      ref: e,
      className: f(
        "tw:grid tw:place-content-center tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:shadow tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...r,
      children: /* @__PURE__ */ o(
        Vo.Indicator,
        {
          className: f("tw:grid tw:place-content-center tw:text-current"),
          children: /* @__PURE__ */ o(jt, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const Hc = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ o(ei, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ o(ri, { className: "tw:h-4 tw:w-4" });
}, kr = (t, e, r) => /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ d(Dt, { children: [
  /* @__PURE__ */ d(
    Lt,
    {
      className: f("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Hc(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ o(Mt, { side: "bottom", children: e })
] }) }), Vd = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => kr(e, t)
}), Wc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => kr(r, t)
}), jd = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => kr(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Ar = (t, e, r, n, a, i) => {
  let s = [...r];
  t.forEach((w) => {
    e === "approved" ? s.includes(w) || s.push(w) : s = s.filter((c) => c !== w);
  }), n(s);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), i(l);
}, zd = (t, e, r, n, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => kr(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ d(wa, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ o(
        sr,
        {
          onClick: (w) => {
            w.stopPropagation(), Ar(
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
          children: /* @__PURE__ */ o(Za, {})
        }
      ),
      /* @__PURE__ */ o(
        sr,
        {
          onClick: (w) => {
            w.stopPropagation(), Ar(
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
          children: /* @__PURE__ */ o(Qa, {})
        }
      ),
      /* @__PURE__ */ o(
        sr,
        {
          onClick: (w) => {
            w.stopPropagation(), Ar(
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
          children: /* @__PURE__ */ o(ti, {})
        }
      )
    ] });
  }
}), Fd = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Bd = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Kd = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Yc = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", qd = Object.freeze([
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
]), Jc = (t, e, r) => {
  let n = t;
  return e !== "all" && (n = n.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), r !== "" && (n = n.filter((a) => a.items[0].includes(r))), n;
}, Xc = (t, e, r) => t.map((n) => {
  const a = Mo(n.key) ? n.key : n.key[0];
  return {
    items: Mo(n.key) ? [n.key] : n.key,
    count: n.count,
    status: n.status || Yc(a, e, r),
    occurrences: n.occurrences || []
  };
}), Pt = (t, e) => t[e] ?? e;
function Gd({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: n,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: w,
  id: c,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: u,
  onItemSelected: m
}) {
  const h = Pt(r, "%webView_inventory_all%"), g = Pt(r, "%webView_inventory_approved%"), v = Pt(r, "%webView_inventory_unapproved%"), b = Pt(r, "%webView_inventory_unknown%"), x = Pt(r, "%webView_inventory_scope_currentBook%"), y = Pt(r, "%webView_inventory_scope_chapter%"), _ = Pt(r, "%webView_inventory_scope_verse%"), k = Pt(r, "%webView_inventory_filter_text%"), j = Pt(
    r,
    "%webView_inventory_show_additional_items%"
  ), $ = Pt(r, "%webView_inventory_no_results%"), [E, P] = T(!1), [N, S] = T("all"), [L, V] = T(""), [O, I] = T([]), U = z(() => {
    const R = t ?? [];
    return R.length === 0 ? [] : Xc(R, a, i);
  }, [t, a, i]), D = z(() => {
    if (E) return U;
    const R = [];
    return U.forEach((K) => {
      const X = K.items[0], Z = R.find(
        (nt) => nt.items[0] === X
      );
      Z ? (Z.count += K.count, Z.occurrences = Z.occurrences.concat(K.occurrences)) : R.push({
        items: [X],
        count: K.count,
        occurrences: K.occurrences,
        status: K.status
      });
    }), R;
  }, [E, U]), Y = z(() => D.length === 0 ? [] : Jc(D, N, L), [D, N, L]), kt = z(() => {
    var X, Z;
    if (!E) return w;
    const R = (X = n == null ? void 0 : n.tableHeaders) == null ? void 0 : X.length;
    if (!R) return w;
    const K = [];
    for (let nt = 0; nt < R; nt++)
      K.push(
        Wc(
          ((Z = n == null ? void 0 : n.tableHeaders) == null ? void 0 : Z[nt]) || "Additional Item",
          nt + 1
        )
      );
    return [...K, ...w];
  }, [n == null ? void 0 : n.tableHeaders, w, E]);
  q(() => {
    Y.length === 0 ? I([]) : Y.length === 1 && I(Y[0].items);
  }, [Y]);
  const Ct = (R, K) => {
    K.setRowSelection(() => {
      const Z = {};
      return Z[R.index] = !0, Z;
    });
    const X = R.original.items;
    I(X), m && X.length > 0 && m(X[0]);
  }, Et = (R) => {
    if (R === "book" || R === "chapter" || R === "verse")
      l(R);
    else
      throw new Error(`Invalid scope value: ${R}`);
  }, st = (R) => {
    if (R === "all" || R === "approved" || R === "unapproved" || R === "unknown")
      S(R);
    else
      throw new Error(`Invalid status filter value: ${R}`);
  }, A = z(() => {
    if (D.length === 0 || O.length === 0) return [];
    const R = D.filter((K) => xi(
      E ? K.items : [K.items[0]],
      O
    ));
    if (R.length > 1) throw new Error("Selected item is not unique");
    return R.length === 0 ? [] : R[0].occurrences;
  }, [O, E, D]);
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw:flex tw:items-stretch", children: [
      /* @__PURE__ */ d(
        Se,
        {
          onValueChange: (R) => st(R),
          defaultValue: N,
          children: [
            /* @__PURE__ */ o(De, { className: "tw:m-1", children: /* @__PURE__ */ o(Re, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Me, { children: [
              /* @__PURE__ */ o(St, { value: "all", children: h }),
              /* @__PURE__ */ o(St, { value: "approved", children: g }),
              /* @__PURE__ */ o(St, { value: "unapproved", children: v }),
              /* @__PURE__ */ o(St, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Se, { onValueChange: (R) => Et(R), defaultValue: s, children: [
        /* @__PURE__ */ o(De, { className: "tw:m-1", children: /* @__PURE__ */ o(Re, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Me, { children: [
          /* @__PURE__ */ o(St, { value: "book", children: x }),
          /* @__PURE__ */ o(St, { value: "chapter", children: y }),
          /* @__PURE__ */ o(St, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ o(
        Xe,
        {
          className: "tw:m-1 tw:rounded-md tw:border",
          placeholder: k,
          value: L,
          onChange: (R) => {
            V(R.target.value);
          }
        }
      ),
      n && /* @__PURE__ */ d("div", { className: "tw:m-1 tw:flex tw:items-center tw:rounded-md tw:border", children: [
        /* @__PURE__ */ o(
          ba,
          {
            className: "tw:m-1",
            checked: E,
            onCheckedChange: (R) => {
              P(R);
            }
          }
        ),
        /* @__PURE__ */ o(dt, { className: "tw:m-1 tw:flex-shrink-0 tw:whitespace-nowrap", children: (n == null ? void 0 : n.checkboxText) ?? j })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      _c,
      {
        columns: kt,
        data: Y,
        onRowClickHandler: Ct,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: $
      }
    ) }),
    A.length > 0 && /* @__PURE__ */ o("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ o(
      Uc,
      {
        classNameForText: u,
        occurrenceData: A,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] });
}
const Zc = "16rem", Qc = "3rem", va = tt.createContext(void 0);
function _r() {
  const t = tt.useContext(va);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function tw({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: n,
  style: a,
  children: i,
  side: s = "primary",
  ref: l,
  ...w
}) {
  const [c, p] = tt.useState(t), u = e ?? c, m = tt.useCallback(
    (_) => {
      const k = typeof _ == "function" ? _(u) : _;
      r ? r(k) : p(k);
    },
    [r, u]
  ), h = tt.useCallback(() => m((_) => !_), [m]), g = u ? "expanded" : "collapsed", x = wt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = tt.useMemo(
    () => ({
      state: g,
      open: u,
      setOpen: m,
      toggleSidebar: h,
      side: x
    }),
    [g, u, m, h, x]
  );
  return /* @__PURE__ */ o(va.Provider, { value: y, children: /* @__PURE__ */ o(Nt, { delayDuration: 0, children: /* @__PURE__ */ o(
    "div",
    {
      style: (
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": Zc,
          "--sidebar-width-icon": Qc,
          ...a
        }
      ),
      className: f(
        // Removed tw:min-h-svh
        "tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar",
        n
      ),
      ref: l,
      ...w,
      children: i
    }
  ) }) });
}
function ew({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: n,
  ref: a,
  ...i
}) {
  const s = _r();
  return e === "none" ? /* @__PURE__ */ o(
    "div",
    {
      className: f(
        "tw:flex tw:h-full tw:w-[--sidebar-width] tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ref: a,
      ...i,
      children: n
    }
  ) : /* @__PURE__ */ d(
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
            className: f(
              "tw:relative tw:h-svh tw:w-[--sidebar-width] tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              "tw:group-data-[side=secondary]:rotate-180",
              t === "floating" || t === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: f(
              // CUSTOM: Switched tw:fixed to tw:absolute here to scope the sidebar inside of it's container
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-[--sidebar-width] tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              s.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon] tw:group-data-[side=primary]:border-r tw:group-data-[side=secondary]:border-l",
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
function Ud({
  className: t,
  onClick: e,
  ref: r,
  ...n
}) {
  const a = _r();
  return /* @__PURE__ */ d(
    F,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: f("tw:h-7 tw:w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ o(oi, {}) : /* @__PURE__ */ o(ni, {}),
        /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Hd({
  className: t,
  ref: e,
  ...r
}) {
  const { toggleSidebar: n } = _r();
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
      className: f(
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
function rw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "main",
    {
      ref: e,
      className: f(
        // CUSTOM: Removed tw:min-h-svh
        "tw:relative tw:flex tw:flex-1 tw:flex-col tw:bg-background",
        "tw:peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 tw:md:peer-data-[variant=inset]:ml-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow",
        t
      ),
      ...r
    }
  );
}
function Wd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Xe,
    {
      ref: e,
      "data-sidebar": "input",
      className: f(
        "tw:h-8 tw:w-full tw:bg-background tw:shadow-none tw:focus-visible:ring-2 tw:focus-visible:ring-sidebar-ring",
        t
      ),
      ...r
    }
  );
}
function Yd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function Jd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...r
    }
  );
}
function Xd({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ge,
    {
      ref: e,
      "data-sidebar": "separator",
      className: f("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...r
    }
  );
}
function ow({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "content",
      className: f(
        "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...r
    }
  );
}
function on({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "group",
      className: f("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...r
    }
  );
}
function nn({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? Ae : "div",
    {
      ref: r,
      "data-sidebar": "group-label",
      className: f(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-none tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        "tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...n
    }
  );
}
function Zd({
  className: t,
  asChild: e = !1,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    e ? Ae : "button",
    {
      ref: r,
      "data-sidebar": "group-action",
      className: f(
        "tw:absolute tw:right-3 tw:top-3.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...n
    }
  );
}
function an({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: f("tw:w-full tw:text-sm", t),
      ...r
    }
  );
}
function nw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: f("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1", t),
      ...r
    }
  );
}
function aw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: f("tw:group/menu-item tw:relative", t),
      ...r
    }
  );
}
const iw = ne(
  "tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-none tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[active=true]:bg-sidebar-accent tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:!size-8 tw:group-data-[collapsible=icon]:!p-2 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
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
function sw({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: n = "default",
  tooltip: a,
  className: i,
  ref: s,
  ...l
}) {
  const w = t ? Ae : "button", { state: c } = _r(), p = /* @__PURE__ */ o(
    w,
    {
      ref: s,
      "data-sidebar": "menu-button",
      "data-size": n,
      "data-active": e,
      className: f(iw({ variant: r, size: n }), i),
      ...l
    }
  );
  return a ? (typeof a == "string" && (a = {
    children: a
  }), /* @__PURE__ */ d(Dt, { children: [
    /* @__PURE__ */ o(Lt, { asChild: !0, children: p }),
    /* @__PURE__ */ o(Mt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
  ] })) : p;
}
function Qd({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    e ? Ae : "button",
    {
      ref: n,
      "data-sidebar": "menu-action",
      className: f(
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
      ...a
    }
  );
}
function tp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: e,
      "data-sidebar": "menu-badge",
      className: f(
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
function ep({
  className: t,
  showIcon: e = !1,
  ref: r,
  ...n
}) {
  const a = tt.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: f("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ o(to, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          to,
          {
            className: "tw:h-4 tw:max-w-[--skeleton-width] tw:flex-1",
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
}
function rp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu-sub",
      className: f(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:flex-col tw:gap-1 tw:border-l tw:border-sidebar-border tw:px-2.5 tw:py-0.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...r
    }
  );
}
function op({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ o("li", { ref: t, ...e });
}
function np({
  asChild: t = !1,
  size: e = "md",
  isActive: r,
  className: n,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ o(
    t ? Ae : "a",
    {
      ref: a,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: f(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
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
function lw({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: n,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: w
}) {
  const c = B(
    (m, h) => {
      n(m, h);
    },
    [n]
  ), p = B(
    (m) => {
      const h = r.find((g) => g.projectId === m);
      return h ? h.projectName : m;
    },
    [r]
  ), u = B(
    (m) => !a.projectId && m === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    ew,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw:w-96 tw:gap-2 tw:overflow-y-auto", w),
      children: /* @__PURE__ */ d(ow, { children: [
        /* @__PURE__ */ d(on, { children: [
          /* @__PURE__ */ o(nn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ o(an, { children: /* @__PURE__ */ o(nw, { children: Object.entries(e).map(([m, h]) => /* @__PURE__ */ o(aw, { children: /* @__PURE__ */ o(
            sw,
            {
              onClick: () => c(m),
              isActive: u(m),
              children: /* @__PURE__ */ o("span", { className: "tw:pl-3", children: h })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ d(on, { children: [
          /* @__PURE__ */ o(nn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ o(an, { className: "tw:pl-3", children: /* @__PURE__ */ o(
            Wr,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw:z-[1000]",
              options: r.flatMap((m) => m.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (m) => {
                const h = p(m);
                c(h, m);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(ai, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const _o = He(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: i = !1, id: s }, l) => {
    const w = wt();
    return /* @__PURE__ */ d("div", { id: s, className: f("tw:relative", { "tw:w-full": n }, a), children: [
      /* @__PURE__ */ o(
        cn,
        {
          className: f(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": w === "rtl" },
            { "tw:left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        Xe,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ d(
        F,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": w === "rtl" },
            { "tw:right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ o(Oe, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
_o.displayName = "SearchBar";
function ap({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: w,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ o(
      _o,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      tw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ o(
            lw,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: w,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ o(rw, { className: "tw:min-w-[215px]", children: n })
        ]
      }
    )
  ] });
}
const Yt = "scrBook", cw = "scrRef", pe = "source", ww = "details", dw = "Scripture Reference", pw = "Scripture Book", xa = "Type", uw = "Details";
function hw(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (n) => `${n.start.book} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: Yt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? dw,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? at.bookIdToEnglishName(a.start.book) : n.row.groupingColumnId === Yt ? he(a.start) : void 0;
      },
      getGroupingValue: (n) => at.bookIdToNumber(n.start.book),
      sortingFn: (n, a) => zr(n.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => he(n.start),
      id: cw,
      header: void 0,
      cell: (n) => {
        const a = n.row.original;
        return n.row.getIsGrouped() ? void 0 : he(a.start);
      },
      sortingFn: (n, a) => zr(n.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: pe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? xa : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, a) => n.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: ww,
      header: (t == null ? void 0 : t.detailsColumnName) ?? uw,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const fw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || zr(t.start, t.end) === 0 ? `${Nr(t.start)}+${e}` : `${Nr(t.start)}+${e}-${Nr(t.end)}+${r}`;
}, sn = (t) => `${fw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function ip({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: w
}) {
  const [c, p] = T([]), [u, m] = T([{ id: Yt, desc: !1 }]), [h, g] = T({}), v = z(
    () => t.flatMap((N) => N.data.map((S) => ({
      ...S,
      source: N.source
    }))),
    [t]
  ), b = z(
    () => hw(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [n, i, s, r]
  );
  q(() => {
    c.includes(pe) ? m([
      { id: pe, desc: !1 },
      { id: Yt, desc: !1 }
    ]) : m([{ id: Yt, desc: !1 }]);
  }, [c]);
  const x = Pn({
    data: v,
    columns: b,
    state: {
      grouping: c,
      sorting: u,
      rowSelection: h
    },
    onGroupingChange: p,
    onSortingChange: m,
    onRowSelectionChange: g,
    getExpandedRowModel: fs(),
    getGroupedRowModel: hs(),
    getCoreRowModel: Ln(),
    getSortedRowModel: $n(),
    getRowId: sn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const N = x.getSelectedRowModel().rowsById, S = Object.keys(N);
      if (S.length === 1) {
        const L = v.find((V) => sn(V) === S[0]) || void 0;
        L && l(L);
      }
    }
  }, [h, v, l, x]);
  const y = a ?? pw, _ = i ?? xa, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Yt] },
    { label: `Group by ${_}`, value: [pe] },
    {
      label: `Group by ${y} and ${_}`,
      value: [Yt, pe]
    },
    {
      label: `Group by ${_} and ${y}`,
      value: [pe, Yt]
    }
  ], j = (N) => {
    p(JSON.parse(N));
  }, $ = (N, S) => {
    !N.getIsGrouped() && !N.getIsSelected() && N.getToggleSelectedHandler()(S);
  }, E = (N, S) => N.getIsGrouped() ? "" : f("banded-row", S % 2 === 0 ? "even" : "odd"), P = (N, S, L) => {
    if (!((N == null ? void 0 : N.length) === 0 || S.depth < L.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ d(
      Se,
      {
        value: JSON.stringify(c),
        onValueChange: (N) => {
          j(N);
        },
        children: [
          /* @__PURE__ */ o(De, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ o(Re, {}) }),
          /* @__PURE__ */ o(Me, { position: "item-aligned", children: /* @__PURE__ */ o(hc, { children: k.map((N) => /* @__PURE__ */ o(St, { value: JSON.stringify(N.value), children: N.label }, N.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(vo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ o(xo, { children: x.getHeaderGroups().map((N) => /* @__PURE__ */ o(Jt, { children: N.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(ur, { colSpan: S.colSpan, className: "tw:sticky top-0", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
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
          je(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, N.id)) }),
      /* @__PURE__ */ o(yo, { children: x.getRowModel().rows.map((N, S) => {
        const L = wt();
        return /* @__PURE__ */ o(
          Jt,
          {
            "data-state": N.getIsSelected() ? "selected" : "",
            className: f(E(N, S)),
            onClick: (V) => $(N, V),
            children: N.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== pe || !r)))
                return /* @__PURE__ */ o(
                  Ne,
                  {
                    className: f(
                      V.column.columnDef.id,
                      "tw:p-[1px]",
                      P(c, N, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ d(
                      F,
                      {
                        variant: "link",
                        onClick: N.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          N.getIsExpanded() && /* @__PURE__ */ o(Ie, {}),
                          !N.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ o(Ce, {}) : /* @__PURE__ */ o(Vr, {})),
                          " ",
                          je(V.column.columnDef.cell, V.getContext()),
                          " (",
                          N.subRows.length,
                          ")"
                        ]
                      }
                    ) : je(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          N.id
        );
      }) })
    ] })
  ] });
}
const No = (t, e) => t.filter((r) => {
  try {
    return Ve(r) === e;
  } catch {
    return !1;
  }
}), ya = (t, e, r) => No(t, e).every((n) => r.includes(n));
function mw({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: n,
  localizedStrings: a
}) {
  const i = No(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => n(t),
      className: f(
        ya(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Os(
        t,
        s,
        l,
        w,
        c
      )
    }
  );
}
const ln = 5, Pr = 6;
function gw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: n,
  localizedBookNames: a
}) {
  const i = n["%webView_book_selector_books_selected%"], s = n["%webView_book_selector_select_books%"], l = n["%webView_book_selector_search_books%"], w = n["%webView_book_selector_select_all%"], c = n["%webView_book_selector_clear_all%"], p = n["%webView_book_selector_no_book_found%"], u = n["%webView_book_selector_more%"], { otLong: m, ntLong: h, dcLong: g, extraLong: v } = {
    otLong: n == null ? void 0 : n["%scripture_section_ot_long%"],
    ntLong: n == null ? void 0 : n["%scripture_section_nt_long%"],
    dcLong: n == null ? void 0 : n["%scripture_section_dc_long%"],
    extraLong: n == null ? void 0 : n["%scripture_section_extra_long%"]
  }, [b, x] = T(!1), [y, _] = T(""), k = H(void 0), j = H(!1);
  if (t.length !== at.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const $ = z(() => at.allBookIds.filter(
    (I, U) => t[U] === "1" && !at.isObsolete(at.bookIdToNumber(I))
  ), [t]), E = z(() => {
    if (!y.trim()) {
      const D = {
        [G.OT]: [],
        [G.NT]: [],
        [G.DC]: [],
        [G.Extra]: []
      };
      return $.forEach((Y) => {
        const kt = Ve(Y);
        D[kt].push(Y);
      }), D;
    }
    const I = $.filter(
      (D) => co(D, y, a)
    ), U = {
      [G.OT]: [],
      [G.NT]: [],
      [G.DC]: [],
      [G.Extra]: []
    };
    return I.forEach((D) => {
      const Y = Ve(D);
      U[Y].push(D);
    }), U;
  }, [$, y, a]), P = B(
    (I, U = !1) => {
      if (!U || !k.current) {
        r(
          e.includes(I) ? e.filter((st) => st !== I) : [...e, I]
        ), k.current = I;
        return;
      }
      const D = $.findIndex((st) => st === k.current), Y = $.findIndex((st) => st === I);
      if (D === -1 || Y === -1) return;
      const [kt, Ct] = [
        Math.min(D, Y),
        Math.max(D, Y)
      ], Et = $.slice(kt, Ct + 1).map((st) => st);
      r(
        e.includes(I) ? e.filter((st) => !Et.includes(st)) : [.../* @__PURE__ */ new Set([...e, ...Et])]
      );
    },
    [e, r, $]
  ), N = (I) => {
    P(I, j.current), j.current = !1;
  }, S = (I, U) => {
    I.preventDefault(), P(U, I.shiftKey);
  }, L = B(
    (I) => {
      const U = No($, I).map((D) => D);
      r(
        ya($, I, e) ? e.filter((D) => !U.includes(D)) : [.../* @__PURE__ */ new Set([...e, ...U])]
      );
    },
    [e, r, $]
  ), V = () => {
    r($.map((I) => I));
  }, O = () => {
    r([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(G).map((I) => /* @__PURE__ */ o(
      mw,
      {
        section: I,
        availableBookIds: $,
        selectedBookIds: e,
        onToggle: L,
        localizedStrings: n
      },
      I
    )) }),
    /* @__PURE__ */ d(
      Ut,
      {
        open: b,
        onOpenChange: (I) => {
          x(I), I || _("");
        },
        children: [
          /* @__PURE__ */ o(le, { asChild: !0, children: /* @__PURE__ */ d(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ o(fn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(Ht, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ d(
            ie,
            {
              shouldFilter: !1,
              onKeyDown: (I) => {
                I.key === "Enter" && (j.current = I.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  Ye,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: V, children: w }),
                  /* @__PURE__ */ o(F, { variant: "ghost", size: "sm", onClick: O, children: c })
                ] }),
                /* @__PURE__ */ d(se, { children: [
                  /* @__PURE__ */ o(br, { children: p }),
                  Object.values(G).map((I, U) => {
                    const D = E[I];
                    if (D.length !== 0)
                      return /* @__PURE__ */ d(vn, { children: [
                        /* @__PURE__ */ o(
                          re,
                          {
                            heading: Vn(I, m, h, g, v),
                            children: D.map((Y) => /* @__PURE__ */ o(
                              zn,
                              {
                                bookId: Y,
                                isSelected: e.includes(Y),
                                onSelect: () => N(Y),
                                onMouseDown: (kt) => S(kt, Y),
                                section: Ve(Y),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Ur(Y, a),
                                className: "tw:flex tw:items-center"
                              },
                              Y
                            ))
                          }
                        ),
                        U < Object.values(G).length - 1 && /* @__PURE__ */ o(Ds, {})
                      ] }, I);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ d("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Pr ? Pr : ln
      ).map((I) => /* @__PURE__ */ o(qe, { className: "tw:hover:bg-secondary", variant: "secondary", children: _e(I, a) }, I)),
      e.length > Pr && /* @__PURE__ */ o(
        qe,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - ln} ${u}`
        }
      )
    ] })
  ] });
}
const sp = Object.freeze([
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
]), we = (t, e) => t[e] ?? e;
function lp({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: n,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: w
}) {
  const c = we(
    s,
    "%webView_scope_selector_selected_text%"
  ), p = we(
    s,
    "%webView_scope_selector_current_verse%"
  ), u = we(
    s,
    "%webView_scope_selector_current_chapter%"
  ), m = we(s, "%webView_scope_selector_current_book%"), h = we(s, "%webView_scope_selector_choose_books%"), g = we(s, "%webView_scope_selector_scope%"), v = we(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: m, id: "scope-book" },
    { value: "selectedBooks", label: h, id: "scope-selected" }
  ], x = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ d("div", { id: w, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(dt, { children: g }),
      /* @__PURE__ */ o(
        Bn,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: x.map(({ value: y, label: _, id: k }) => /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ o(Hr, { className: "tw:me-2", value: y, id: k }),
            /* @__PURE__ */ o(dt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ o(dt, { children: v }),
      /* @__PURE__ */ o(
        gw,
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
const $r = {
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
function cp({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: n = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...$r,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([c, p]) => [
          c,
          c === p && c in $r ? $r[c] : p
        ]
      )
    )
  }, w = wt();
  return /* @__PURE__ */ d(
    Se,
    {
      value: `${e}`,
      onValueChange: (c) => r(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ o(De, { size: a, className: f("pr-twp tw:w-auto", i), children: /* @__PURE__ */ o(
          Re,
          {
            placeholder: l[Q(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ o(
          Me,
          {
            id: s,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ o(St, { value: `${c}`, children: l[Q(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function wp({ children: t }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw:grid", children: t });
}
function dp({
  primary: t,
  secondary: e,
  children: r,
  isLoading: n = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: a }) : /* @__PURE__ */ o("div", { children: r })
  ] });
}
function pp({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ o("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ o(Ge, {}) : ""
  ] });
}
function ka(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, n]) => "menuItem" in n && n.menuItem === e
  )) == null ? void 0 : r[0];
}
function hr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ o(
    "img",
    {
      className: f("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const _a = (t, e, r, n) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ d(Dt, { children: [
  /* @__PURE__ */ o(Lt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    Qr,
    {
      onClick: () => {
        n(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(hr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(hr, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(sc, { children: [
    /* @__PURE__ */ o(cc, { children: l.label }),
    /* @__PURE__ */ o(ic, { children: /* @__PURE__ */ o(wc, { children: _a(
      t,
      e,
      ka(t, l.id),
      n
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(Mt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function eo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(ve, { variant: i, children: [
    /* @__PURE__ */ o(Pe, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(F, { variant: s, size: "icon", children: n ?? /* @__PURE__ */ o(ii, {}) }) }),
    /* @__PURE__ */ o(xe, { align: "start", className: "tw:z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, p) => /* @__PURE__ */ d(vn, { children: [
      /* @__PURE__ */ o(ma, { children: /* @__PURE__ */ o(Nt, { children: _a(e.groups, e.items, w, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ o(Je, {})
    ] }, w)) })
  ] });
}
const Na = tt.forwardRef(
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
function up({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: n,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: w,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ d(Na, { className: `tw:w-full tw:border ${i}`, id: a, children: [
    r && /* @__PURE__ */ o(
      eo,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ o(si, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ o("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      n && /* @__PURE__ */ o(
        eo,
        {
          onSelectMenuItem: e,
          menuData: n,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(li, {}),
          className: "tw:h-full"
        }
      ),
      w
    ] })
  ] });
}
function hp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: n,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(Na, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ o(
    eo,
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
const Ca = tt.forwardRef(({ className: t, ...e }, r) => {
  const n = wt();
  return /* @__PURE__ */ o(
    It.Root,
    {
      orientation: "vertical",
      ref: r,
      className: f("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: n
    }
  );
});
Ca.displayName = It.List.displayName;
const Ea = tt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  It.List,
  {
    ref: r,
    className: f(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Ea.displayName = It.List.displayName;
const bw = tt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  It.Trigger,
  {
    ref: r,
    ...e,
    className: f(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Ta = tt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ o(
  It.Content,
  {
    ref: r,
    className: f(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Ta.displayName = It.Content.displayName;
function fp({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: n,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ d("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      a ? /* @__PURE__ */ o("h1", { children: a }) : "",
      /* @__PURE__ */ o(
        _o,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ d(Ca, { children: [
      /* @__PURE__ */ o(Ea, { children: t.map((l) => /* @__PURE__ */ o(bw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ o(Ta, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function vw({ ...t }) {
  return /* @__PURE__ */ o(Vt.Menu, { ...t });
}
function xw({ ...t }) {
  return /* @__PURE__ */ o(Vt.Sub, { "data-slot": "menubar-sub", ...t });
}
function yw({
  className: t,
  variant: e = "default",
  ref: r,
  ...n
}) {
  const a = tt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(bo.Provider, { value: a, children: /* @__PURE__ */ o(
    Vt.Root,
    {
      ref: r,
      className: f(
        "tw:flex tw:h-9 tw:items-center tw:space-x-1 tw:rounded-md tw:border tw:bg-background tw:p-1 tw:shadow-sm",
        t
      ),
      ...n
    }
  ) });
}
function kw({
  className: t,
  ref: e,
  ...r
}) {
  const n = Wt();
  return /* @__PURE__ */ o(
    Vt.Trigger,
    {
      ref: e,
      className: f(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        be({ variant: n.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...r
    }
  );
}
function _w({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  const i = Wt();
  return /* @__PURE__ */ d(
    Vt.SubTrigger,
    {
      ref: n,
      className: f(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        be({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Nw({
  className: t,
  ref: e,
  ...r
}) {
  const n = Wt();
  return /* @__PURE__ */ o(
    Vt.SubContent,
    {
      ref: e,
      className: f(
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
function Cw({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: n = 8,
  ref: a,
  ...i
}) {
  const s = Wt();
  return /* @__PURE__ */ o(Vt.Portal, { children: /* @__PURE__ */ o(
    Vt.Content,
    {
      ref: a,
      align: e,
      alignOffset: r,
      sideOffset: n,
      className: f(
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
function Ew({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  const a = Wt();
  return /* @__PURE__ */ o(
    Vt.Item,
    {
      ref: r,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        be({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
}
function Tw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vt.Separator,
    {
      ref: e,
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...r
    }
  );
}
const Le = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var n;
      (n = t.current) == null || n.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Sa = (t, e, r, n) => {
  if (!r) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ d(Dt, { children: [
      /* @__PURE__ */ o(Lt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ d(
        Ew,
        {
          onClick: () => {
            n(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ o(hr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ o(hr, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ d(xw, { children: [
        /* @__PURE__ */ o(_w, { children: c.label }),
        /* @__PURE__ */ o(Nw, { children: Sa(
          t,
          e,
          ka(t, c.id),
          n
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ o(Mt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && s < a.length - 1 && w.push(/* @__PURE__ */ o(Tw, {}, `separator-${i}`)), w;
  });
};
function Sw({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: n
}) {
  const a = H(void 0), i = H(void 0), s = H(void 0), l = H(void 0), w = H(void 0), c = (p) => {
    switch (p) {
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
  if (vs(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
    var g, v, b, x;
    p.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
      case "alt":
        Le(i, [m]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Le(i, [m, h]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), Le(s, [m, h]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Le(l, [m, h]);
        break;
      case "alt+h":
        (x = w.current) == null || x.focus(), Le(w, [m, h]);
        break;
    }
  }), q(() => {
    if (!r || !a.current) return;
    const p = new MutationObserver((h) => {
      h.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          r(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((h) => {
      p.observe(h, { attributes: !0 });
    }), () => p.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ o(yw, { ref: a, className: "pr-twp tw:border-0 tw:bg-transparent", variant: n, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ d(vw, { children: [
      /* @__PURE__ */ o(kw, { ref: c(p), children: typeof u == "object" && "label" in u && u.label }),
      /* @__PURE__ */ o(
        Cw,
        {
          className: "tw:z-[250]",
          children: /* @__PURE__ */ o(Nt, { children: Sa(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function mp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function gp({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: n,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: w,
  menubarVariant: c = "default"
}) {
  const p = H(void 0);
  return /* @__PURE__ */ o(
    "div",
    {
      className: f("tw:border tw:px-4 tw:text-foreground", n),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: w ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ o(
                    Sw,
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
            /* @__PURE__ */ o(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ o("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ o(
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
const Rw = (t, e) => t[e] ?? e;
function bp({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: n,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: w
}) {
  const c = Rw(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, u] = T(!1), m = (g) => {
    a && a(g), n && n([g, ...r.filter((v) => v !== g)]), i && r.find((v) => v === g) && i([...r.filter((v) => v !== g)]), u(!1);
  }, h = (g, v) => {
    var x, y, _, k, j, $;
    const b = v !== g ? ((y = (x = t[g]) == null ? void 0 : x.uiNames) == null ? void 0 : y[v]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(j = t[g]) == null ? void 0 : j.autonym} (${b})` : ($ = t[g]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ d("div", { id: w, className: f("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Se,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: m,
        open: p,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ o(De, { children: /* @__PURE__ */ o(Re, {}) }),
          /* @__PURE__ */ o(
            Me,
            {
              className: "tw:z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ o(St, { value: g, children: h(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ o("div", { className: "tw:pt-3", children: /* @__PURE__ */ o(dt, { className: "tw:font-normal tw:text-muted-foreground", children: ue(c, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((g) => h(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Dw({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ o(dt, { children: e(t) }) : r ? /* @__PURE__ */ o(dt, { children: r(t) }) : /* @__PURE__ */ o(dt, { children: t });
}
function vp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: n,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ o("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ d("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ o(
      ba,
      {
        className: "tw:me-2 tw:align-middle",
        checked: n.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ o(
      Dw,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function xp({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: n,
  isHidden: a = !1,
  className: i,
  children: s,
  dropdownContent: l,
  additionalSelectedContent: w,
  accentColor: c
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: r,
      onKeyDown: (u) => {
        (u.key === "Enter" || u.key === " ") && (u.preventDefault(), r());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: f(
        "tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": n && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ o("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l && /* @__PURE__ */ d(ve, { children: [
              /* @__PURE__ */ o(Pe, { className: f(c && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ o(F, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(pn, {}) }) }),
              /* @__PURE__ */ o(xe, { align: "end", children: l })
            ] })
          ] }),
          e && w && /* @__PURE__ */ o("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        c && /* @__PURE__ */ o(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${c}`
          }
        )
      ]
    },
    t
  );
}
const Mw = He(({ className: t, ...e }, r) => /* @__PURE__ */ o(ci, { size: 35, className: f("tw:animate-spin", t), ...e, ref: r }));
Mw.displayName = "Spinner";
function yp({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: w,
  defaultValue: c,
  value: p,
  onChange: u,
  onFocus: m,
  onBlur: h
}) {
  return /* @__PURE__ */ d("div", { className: f("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": n }), children: [
    /* @__PURE__ */ o(
      dt,
      {
        htmlFor: t,
        className: f({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ o(
      Xe,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: f(w, { "tw:border-red-600": r }),
        defaultValue: c,
        value: p,
        onChange: u,
        onFocus: m,
        onBlur: h
      }
    ),
    /* @__PURE__ */ o("p", { className: f({ "tw:hidden": !a }), children: a })
  ] });
}
const Ow = ne(
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
function kp({
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
      className: f(
        // CUSTOM
        "pr-twp",
        Ow({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function _p({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ d(
    "h5",
    {
      ref: e,
      className: f("tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight", t),
      ...r,
      children: [
        r.children,
        " "
      ]
    }
  );
}
function Np({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o("div", { ref: e, className: f("tw:text-sm tw:[&_p]:leading-relaxed", t), ...r });
}
const Cp = ut.Root, Ep = ut.Trigger, Tp = ut.Group, Sp = ut.Portal, Rp = ut.Sub, Dp = ut.RadioGroup;
function Mp({
  className: t,
  inset: e,
  children: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ d(
    ut.SubTrigger,
    {
      ref: n,
      className: f(
        "pr-twp tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ o(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Op({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ut.SubContent,
    {
      ref: e,
      className: f(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  );
}
function Ip({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(ut.Portal, { children: /* @__PURE__ */ o(
    ut.Content,
    {
      ref: e,
      className: f(
        "pr-twp tw:z-50 tw:max-h-[--radix-context-menu-content-available-height] tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-y-auto tw:overflow-x-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...r
    }
  ) });
}
function Ap({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ut.Item,
    {
      ref: r,
      className: f(
        "pr-twp tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t
      ),
      ...n
    }
  );
}
function Pp({
  className: t,
  children: e,
  checked: r,
  ref: n,
  ...a
}) {
  return /* @__PURE__ */ d(
    ut.CheckboxItem,
    {
      ref: n,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ut.ItemIndicator, { children: /* @__PURE__ */ o(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function $p({
  className: t,
  children: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    ut.RadioItem,
    {
      ref: r,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ o(ut.ItemIndicator, { children: /* @__PURE__ */ o(ro, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Lp({
  className: t,
  inset: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ut.Label,
    {
      ref: r,
      className: f(
        "tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-foreground",
        e && "tw:pl-8",
        t
      ),
      ...n
    }
  );
}
function Vp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ut.Separator,
    {
      ref: e,
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...r
    }
  );
}
function jp({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: f("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ra = tt.createContext({
  direction: "bottom"
});
function zp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const n = tt.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ o(Ra.Provider, { value: n, children: /* @__PURE__ */ o(
    ae.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
const Fp = ae.Trigger, Iw = ae.Portal, Bp = ae.Close;
function Aw({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ae.Overlay,
    {
      ref: e,
      className: f("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...r
    }
  );
}
function Kp({
  className: t,
  children: e,
  hideDrawerHandle: r = !1,
  ref: n,
  ...a
}) {
  const { direction: i = "bottom" } = tt.useContext(Ra), s = {
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
  return /* @__PURE__ */ d(Iw, { children: [
    /* @__PURE__ */ o(Aw, {}),
    /* @__PURE__ */ d(
      ae.Content,
      {
        ref: n,
        className: f(
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
function qp({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: f("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function Gp({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { className: f("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function Up({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ae.Title,
    {
      ref: e,
      className: f("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...r
    }
  );
}
function Hp({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    ae.Description,
    {
      ref: e,
      className: f("tw:text-sm tw:text-muted-foreground", t),
      ...r
    }
  );
}
function Wp({
  className: t,
  value: e,
  ref: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    jo.Root,
    {
      ref: r,
      className: f(
        "pr-twp tw:relative tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-primary/20",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o(
        jo.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Yp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    so.PanelGroup,
    {
      className: f(
        "tw:flex tw:h-full tw:w-full tw:data-[panel-group-direction=vertical]:flex-col",
        t
      ),
      ...e
    }
  );
}
const Jp = so.Panel;
function Xp({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    so.PanelResizeHandle,
    {
      className: f(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:data-[panel-group-direction=vertical]:h-px tw:data-[panel-group-direction=vertical]:w-full tw:data-[panel-group-direction=vertical]:after:left-0 tw:data-[panel-group-direction=vertical]:after:h-1 tw:data-[panel-group-direction=vertical]:after:w-full tw:data-[panel-group-direction=vertical]:after:-translate-y-1/2 tw:data-[panel-group-direction=vertical]:after:translate-x-0 tw:[&[data-panel-group-direction=vertical]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ o(wi, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function Zp({ ...t }) {
  return /* @__PURE__ */ o(
    xs,
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
function Qp({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ d(
    er.Root,
    {
      ref: e,
      className: f(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...r,
      dir: n,
      children: [
        /* @__PURE__ */ o(er.Track, { className: "tw:relative tw:h-1.5 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-primary/20", children: /* @__PURE__ */ o(er.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ o(er.Thumb, { className: "tw:block tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary/50 tw:bg-background tw:shadow tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function tu({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    zo.Root,
    {
      className: f(
        "tw:peer pr-twp tw:inline-flex tw:h-5 tw:w-9 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:shadow-sm tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...r,
      ref: e,
      children: /* @__PURE__ */ o(
        zo.Thumb,
        {
          className: f(
            "pr-twp tw:pointer-events-none tw:block tw:h-4 tw:w-4 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform",
            {
              "tw:data-[state=checked]:translate-x-4 tw:data-[state=unchecked]:translate-x-0": n === "ltr"
            },
            {
              "tw:data-[state=checked]:translate-x-[-16px] tw:data-[state=unchecked]:translate-x-0": n === "rtl"
            }
          )
        }
      )
    }
  );
}
const eu = It.Root;
function ru({
  className: t,
  ref: e,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ o(
    It.List,
    {
      ref: e,
      className: f(
        "pr-twp tw:inline-flex tw:h-9 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:p-1 tw:text-muted-foreground",
        t
      ),
      ...r,
      dir: n
    }
  );
}
function ou({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    It.Trigger,
    {
      ref: e,
      className: f(
        "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:whitespace-nowrap tw:rounded-md tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-all tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow",
        t
      ),
      ...r
    }
  );
}
function nu({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    It.Content,
    {
      ref: e,
      className: f(
        "pr-twp tw:mt-2 tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
        t
      ),
      ...r
    }
  );
}
function au({
  className: t,
  ref: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "textarea",
    {
      className: f(
        "pr-twp tw:flex tw:min-h-[60px] tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-sm tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: e,
      ...r
    }
  );
}
const iu = (t, e) => {
  q(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function Pw(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const $w = (t, e, r = {}) => {
  const n = H(e);
  n.current = e;
  const a = H(r);
  a.current = Pw(a.current);
  const [i, s] = T(() => n.current), [l, w] = T(!0);
  return q(() => {
    let c = !0;
    return w(!!t), (async () => {
      if (t) {
        const p = await t();
        c && (s(() => p), w(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || s(() => n.current);
    };
  }, [t]), [i, l];
}, Lr = () => !1, su = (t, e) => {
  const [r] = $w(
    B(async () => {
      if (!t) return Lr;
      const n = await Promise.resolve(t(e));
      return async () => n();
    }, [e, t]),
    Lr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    r !== Lr && r();
  }, [r]);
};
function lu(t) {
  q(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Lw(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && n ? r.insertBefore(a, n) : r.appendChild(a);
}
Lw(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:""}}}@layer theme{:root,:host{--tw-font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:.25rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:var(--tw-font-sans);--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp{font-family:var(--tw-font-sans)}@font-face{font-family:Inter;font-display:"swap";src:url(https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap)}.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(var(--tw-spacing) * 0)}.tw\\:inset-x-0{inset-inline:calc(var(--tw-spacing) * 0)}.tw\\:inset-y-0{inset-block:calc(var(--tw-spacing) * 0)}.tw\\:start-2{inset-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(var(--tw-spacing) * 0)}.tw\\:top-1\\.5{top:calc(var(--tw-spacing) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-2\\.5{top:calc(var(--tw-spacing) * 2.5)}.tw\\:top-3\\.5{top:calc(var(--tw-spacing) * 3.5)}.tw\\:top-4{top:calc(var(--tw-spacing) * 4)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-\\[50\\%\\]{top:50%}.tw\\:-right-1{right:calc(var(--tw-spacing) * -1)}.tw\\:right-0{right:calc(var(--tw-spacing) * 0)}.tw\\:right-1{right:calc(var(--tw-spacing) * 1)}.tw\\:right-3{right:calc(var(--tw-spacing) * 3)}.tw\\:right-4{right:calc(var(--tw-spacing) * 4)}.tw\\:bottom-0{bottom:calc(var(--tw-spacing) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(var(--tw-spacing) * 0)}.tw\\:left-2{left:calc(var(--tw-spacing) * 2)}.tw\\:left-3{left:calc(var(--tw-spacing) * 3)}.tw\\:left-4{left:calc(var(--tw-spacing) * 4)}.tw\\:left-\\[50\\%\\]{left:50%}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:z-\\[250\\]{z-index:250}.tw\\:z-\\[300\\]{z-index:300}.tw\\:z-\\[1000\\]{z-index:1000}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-2{grid-row-start:2}.tw\\:\\!m-0{margin:calc(var(--tw-spacing) * 0)!important}.tw\\:m-0{margin:calc(var(--tw-spacing) * 0)}.tw\\:m-1{margin:calc(var(--tw-spacing) * 1)}.tw\\:m-2{margin:calc(var(--tw-spacing) * 2)}.tw\\:-mx-1{margin-inline:calc(var(--tw-spacing) * -1)}.tw\\:mx-0{margin-inline:calc(var(--tw-spacing) * 0)}.tw\\:mx-1{margin-inline:calc(var(--tw-spacing) * 1)}.tw\\:mx-2{margin-inline:calc(var(--tw-spacing) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(var(--tw-spacing) * 3.5)}.tw\\:mx-8{margin-inline:calc(var(--tw-spacing) * 8)}.tw\\:mx-auto{margin-inline:auto}.tw\\:my-1{margin-block:calc(var(--tw-spacing) * 1)}.tw\\:my-2\\.5{margin-block:calc(var(--tw-spacing) * 2.5)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(var(--tw-spacing) * 1)}.tw\\:ms-2{margin-inline-start:calc(var(--tw-spacing) * 2)}.tw\\:ms-5{margin-inline-start:calc(var(--tw-spacing) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:me-2{margin-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"""""""'""'";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:hsl(var(--foreground));--tw-prose-headings:hsl(var(--foreground));--tw-prose-lead:hsl(var(--muted-foreground));--tw-prose-links:hsl(var(--primary));--tw-prose-bold:hsl(var(--foreground));--tw-prose-counters:hsl(var(--muted-foreground));--tw-prose-bullets:hsl(var(--muted-foreground));--tw-prose-hr:hsl(var(--border));--tw-prose-quotes:hsl(var(--foreground));--tw-prose-quote-borders:hsl(var(--border));--tw-prose-captions:hsl(var(--muted-foreground));--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:hsl(var(--foreground));--tw-prose-pre-code:hsl(var(--muted-foreground));--tw-prose-pre-bg:hsl(var(--muted));--tw-prose-th-borders:hsl(var(--border));--tw-prose-td-borders:hsl(var(--border));--tw-prose-invert-body:oklch(87.2% .01 258.338);--tw-prose-invert-headings:#fff;--tw-prose-invert-lead:oklch(70.7% .022 261.325);--tw-prose-invert-links:#fff;--tw-prose-invert-bold:#fff;--tw-prose-invert-counters:oklch(70.7% .022 261.325);--tw-prose-invert-bullets:oklch(44.6% .03 256.802);--tw-prose-invert-hr:oklch(37.3% .034 259.733);--tw-prose-invert-quotes:oklch(96.7% .003 264.542);--tw-prose-invert-quote-borders:oklch(37.3% .034 259.733);--tw-prose-invert-captions:oklch(70.7% .022 261.325);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:#fff;--tw-prose-invert-pre-code:oklch(87.2% .01 258.338);--tw-prose-invert-pre-bg:#00000080;--tw-prose-invert-th-borders:oklch(44.6% .03 256.802);--tw-prose-invert-td-borders:oklch(37.3% .034 259.733);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:mt-1{margin-top:calc(var(--tw-spacing) * 1)}.tw\\:mt-2{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:mt-3{margin-top:calc(var(--tw-spacing) * 3)}.tw\\:mt-4{margin-top:calc(var(--tw-spacing) * 4)}.tw\\:mt-6{margin-top:calc(var(--tw-spacing) * 6)}.tw\\:mt-24{margin-top:calc(var(--tw-spacing) * 24)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(var(--tw-spacing) * 1)}.tw\\:mr-2{margin-right:calc(var(--tw-spacing) * 2)}.tw\\:mr-4{margin-right:calc(var(--tw-spacing) * 4)}.tw\\:mr-24{margin-right:calc(var(--tw-spacing) * 24)}.tw\\:mb-1{margin-bottom:calc(var(--tw-spacing) * 1)}.tw\\:mb-2{margin-bottom:calc(var(--tw-spacing) * 2)}.tw\\:mb-4{margin-bottom:calc(var(--tw-spacing) * 4)}.tw\\:mb-24{margin-bottom:calc(var(--tw-spacing) * 24)}.tw\\:ml-2{margin-left:calc(var(--tw-spacing) * 2)}.tw\\:ml-4{margin-left:calc(var(--tw-spacing) * 4)}.tw\\:ml-24{margin-left:calc(var(--tw-spacing) * 24)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-4{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:h-1{height:calc(var(--tw-spacing) * 1)}.tw\\:h-1\\.5{height:calc(var(--tw-spacing) * 1.5)}.tw\\:h-2{height:calc(var(--tw-spacing) * 2)}.tw\\:h-2\\.5{height:calc(var(--tw-spacing) * 2.5)}.tw\\:h-3{height:calc(var(--tw-spacing) * 3)}.tw\\:h-3\\.5{height:calc(var(--tw-spacing) * 3.5)}.tw\\:h-4{height:calc(var(--tw-spacing) * 4)}.tw\\:h-5{height:calc(var(--tw-spacing) * 5)}.tw\\:h-6{height:calc(var(--tw-spacing) * 6)}.tw\\:h-7{height:calc(var(--tw-spacing) * 7)}.tw\\:h-8{height:calc(var(--tw-spacing) * 8)}.tw\\:h-9{height:calc(var(--tw-spacing) * 9)}.tw\\:h-10{height:calc(var(--tw-spacing) * 10)}.tw\\:h-11{height:calc(var(--tw-spacing) * 11)}.tw\\:h-12{height:calc(var(--tw-spacing) * 12)}.tw\\:h-14{height:calc(var(--tw-spacing) * 14)}.tw\\:h-20{height:calc(var(--tw-spacing) * 20)}.tw\\:h-24{height:calc(var(--tw-spacing) * 24)}.tw\\:h-32{height:calc(var(--tw-spacing) * 32)}.tw\\:h-40{height:calc(var(--tw-spacing) * 40)}.tw\\:h-64{height:calc(var(--tw-spacing) * 64)}.tw\\:h-96{height:calc(var(--tw-spacing) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[1px\\]{height:1px}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[100px\\]{height:100px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-5{max-height:calc(var(--tw-spacing) * 5)}.tw\\:max-h-10{max-height:calc(var(--tw-spacing) * 10)}.tw\\:max-h-80{max-height:calc(var(--tw-spacing) * 80)}.tw\\:max-h-96{max-height:calc(var(--tw-spacing) * 96)}.tw\\:max-h-\\[--radix-context-menu-content-available-height\\]{max-height:--radix-context-menu-content-available-height}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(var(--tw-spacing) * 0)}.tw\\:min-h-11{min-height:calc(var(--tw-spacing) * 11)}.tw\\:min-h-\\[60px\\]{min-height:60px}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(var(--tw-spacing) * 2)}.tw\\:w-2\\.5{width:calc(var(--tw-spacing) * 2.5)}.tw\\:w-3{width:calc(var(--tw-spacing) * 3)}.tw\\:w-3\\.5{width:calc(var(--tw-spacing) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(var(--tw-spacing) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(var(--tw-spacing) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(var(--tw-spacing) * 6)}.tw\\:w-7{width:calc(var(--tw-spacing) * 7)}.tw\\:w-8{width:calc(var(--tw-spacing) * 8)}.tw\\:w-9{width:calc(var(--tw-spacing) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(var(--tw-spacing) * 10)}.tw\\:w-12{width:calc(var(--tw-spacing) * 12)}.tw\\:w-20{width:calc(var(--tw-spacing) * 20)}.tw\\:w-24{width:calc(var(--tw-spacing) * 24)}.tw\\:w-32{width:calc(var(--tw-spacing) * 32)}.tw\\:w-48{width:calc(var(--tw-spacing) * 48)}.tw\\:w-56{width:calc(var(--tw-spacing) * 56)}.tw\\:w-60{width:calc(var(--tw-spacing) * 60)}.tw\\:w-64{width:calc(var(--tw-spacing) * 64)}.tw\\:w-72{width:calc(var(--tw-spacing) * 72)}.tw\\:w-80{width:calc(var(--tw-spacing) * 80)}.tw\\:w-96{width:calc(var(--tw-spacing) * 96)}.tw\\:w-\\[--sidebar-width\\]{width:--sidebar-width}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-px{width:1px}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(var(--tw-spacing) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-48{max-width:calc(var(--tw-spacing) * 48)}.tw\\:max-w-64{max-width:calc(var(--tw-spacing) * 64)}.tw\\:max-w-96{max-width:calc(var(--tw-spacing) * 96)}.tw\\:max-w-\\[--skeleton-width\\]{max-width:--skeleton-width}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:min-w-0{min-width:calc(var(--tw-spacing) * 0)}.tw\\:min-w-5{min-width:calc(var(--tw-spacing) * 5)}.tw\\:min-w-8{min-width:calc(var(--tw-spacing) * 8)}.tw\\:min-w-9{min-width:calc(var(--tw-spacing) * 9)}.tw\\:min-w-10{min-width:calc(var(--tw-spacing) * 10)}.tw\\:min-w-16{min-width:calc(var(--tw-spacing) * 16)}.tw\\:min-w-36{min-width:calc(var(--tw-spacing) * 36)}.tw\\:min-w-80{min-width:calc(var(--tw-spacing) * 80)}.tw\\:min-w-\\[8rem\\]{min-width:8rem}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.tw\\:flex-1{flex:1}.tw\\:flex-shrink-0{flex-shrink:0}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(var(--tw-spacing) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\[--radix-context-menu-content-transform-origin\\]{transform-origin:--radix-context-menu-content-transform-origin}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:scroll-m-20{scroll-margin:calc(var(--tw-spacing) * 20)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%\\,25\\%\\,50\\%\\]{grid-template-columns:25%,25%,50%}.tw\\:grid-cols-\\[25\\%\\,50\\%\\,25\\%\\]{grid-template-columns:25%,50%,25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(var(--tw-spacing) * 0)}.tw\\:gap-1{gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-1\\.5{gap:calc(var(--tw-spacing) * 1.5)}.tw\\:gap-2{gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-2\\.5{gap:calc(var(--tw-spacing) * 2.5)}.tw\\:gap-3{gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-4{gap:calc(var(--tw-spacing) * 4)}.tw\\:gap-5{gap:calc(var(--tw-spacing) * 5)}.tw\\:gap-6{gap:calc(var(--tw-spacing) * 6)}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-x-2{column-gap:calc(var(--tw-spacing) * 2)}.tw\\:gap-x-3{column-gap:calc(var(--tw-spacing) * 3)}.tw\\:gap-x-4{column-gap:calc(var(--tw-spacing) * 4)}:where(.tw\\:space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 1) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 1) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(var(--tw-spacing) * 1)}.tw\\:gap-y-2{row-gap:calc(var(--tw-spacing) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-stretch{align-self:stretch}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-\\[10px\\]{border-top-left-radius:10px;border-top-right-radius:10px}.tw\\:rounded-l-\\[10px\\]{border-top-left-radius:10px;border-bottom-left-radius:10px}.tw\\:rounded-r-\\[10px\\]{border-top-right-radius:10px;border-bottom-right-radius:10px}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-\\[10px\\]{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border{border-color:var(--border)}.tw\\:border-destructive\\/50{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-destructive\\/50{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input{border-color:var(--input)}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary,.tw\\:border-primary\\/50{border-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-primary\\/50{border-color:color-mix(in oklab, var(--primary) 50%, transparent)}}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-background{background-color:var(--background)}.tw\\:bg-black\\/80{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/80{background-color:color-mix(in oklab, var(--tw-color-black) 80%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive{background-color:var(--destructive)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input{background-color:var(--input)}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/20{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/20{background-color:color-mix(in oklab, var(--primary) 20%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:fill-current{fill:currentColor}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-primary{fill:var(--primary)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:\\!p-4{padding:calc(var(--tw-spacing) * 4)!important}.tw\\:p-0{padding:calc(var(--tw-spacing) * 0)}.tw\\:p-0\\.5{padding:calc(var(--tw-spacing) * .5)}.tw\\:p-1{padding:calc(var(--tw-spacing) * 1)}.tw\\:p-2{padding:calc(var(--tw-spacing) * 2)}.tw\\:p-3{padding:calc(var(--tw-spacing) * 3)}.tw\\:p-4{padding:calc(var(--tw-spacing) * 4)}.tw\\:p-6{padding:calc(var(--tw-spacing) * 6)}.tw\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(var(--tw-spacing) * 0)}.tw\\:px-1{padding-inline:calc(var(--tw-spacing) * 1)}.tw\\:px-1\\.5{padding-inline:calc(var(--tw-spacing) * 1.5)}.tw\\:px-2{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:px-2\\.5{padding-inline:calc(var(--tw-spacing) * 2.5)}.tw\\:px-3{padding-inline:calc(var(--tw-spacing) * 3)}.tw\\:px-4{padding-inline:calc(var(--tw-spacing) * 4)}.tw\\:px-6{padding-inline:calc(var(--tw-spacing) * 6)}.tw\\:px-8{padding-inline:calc(var(--tw-spacing) * 8)}.tw\\:py-0{padding-block:calc(var(--tw-spacing) * 0)}.tw\\:py-0\\.5{padding-block:calc(var(--tw-spacing) * .5)}.tw\\:py-1{padding-block:calc(var(--tw-spacing) * 1)}.tw\\:py-1\\.5{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:py-2{padding-block:calc(var(--tw-spacing) * 2)}.tw\\:py-3{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:py-4{padding-block:calc(var(--tw-spacing) * 4)}.tw\\:py-6{padding-block:calc(var(--tw-spacing) * 6)}.tw\\:py-8{padding-block:calc(var(--tw-spacing) * 8)}.tw\\:ps-4{padding-inline-start:calc(var(--tw-spacing) * 4)}.tw\\:ps-8{padding-inline-start:calc(var(--tw-spacing) * 8)}.tw\\:ps-9{padding-inline-start:calc(var(--tw-spacing) * 9)}.tw\\:ps-12{padding-inline-start:calc(var(--tw-spacing) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(var(--tw-spacing) * 1)}.tw\\:pe-2{padding-inline-end:calc(var(--tw-spacing) * 2)}.tw\\:pe-9{padding-inline-end:calc(var(--tw-spacing) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-0{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:pt-1{padding-top:calc(var(--tw-spacing) * 1)}.tw\\:pt-2{padding-top:calc(var(--tw-spacing) * 2)}.tw\\:pt-3{padding-top:calc(var(--tw-spacing) * 3)}.tw\\:pt-6{padding-top:calc(var(--tw-spacing) * 6)}.tw\\:\\!pr-10{padding-right:calc(var(--tw-spacing) * 10)!important}.tw\\:pr-0{padding-right:calc(var(--tw-spacing) * 0)}.tw\\:pr-2{padding-right:calc(var(--tw-spacing) * 2)}.tw\\:pr-3{padding-right:calc(var(--tw-spacing) * 3)}.tw\\:pr-4{padding-right:calc(var(--tw-spacing) * 4)}.tw\\:pb-0{padding-bottom:calc(var(--tw-spacing) * 0)}.tw\\:pb-2{padding-bottom:calc(var(--tw-spacing) * 2)}.tw\\:pb-3{padding-bottom:calc(var(--tw-spacing) * 3)}.tw\\:pb-4{padding-bottom:calc(var(--tw-spacing) * 4)}.tw\\:pl-2{padding-left:calc(var(--tw-spacing) * 2)}.tw\\:pl-3{padding-left:calc(var(--tw-spacing) * 3)}.tw\\:pl-4{padding-left:calc(var(--tw-spacing) * 4)}.tw\\:pl-5{padding-left:calc(var(--tw-spacing) * 5)}.tw\\:pl-6{padding-left:calc(var(--tw-spacing) * 6)}.tw\\:pl-8{padding-left:calc(var(--tw-spacing) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-sans{font-family:var(--tw-font-sans)}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-70{opacity:.7}.tw\\:opacity-100{opacity:1}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opa\\]{transition-property:margin,opa;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--tw-spacing) * 8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(var(--tw-spacing) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!size-8:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--tw-spacing) * 8)!important;height:calc(var(--tw-spacing) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[--sidebar-width-icon\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:--sidebar-width-icon}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + 1rem)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + 1rem + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-0:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:\\!p-2:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(var(--tw-spacing) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(var(--tw-spacing) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-r:is(:where(.tw\\:group)[data-side=primary] *){border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(var(--tw-spacing) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-l:is(:where(.tw\\:group)[data-side=secondary] *){border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:border:is(:where(.tw\\:group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.tw\\:group-data-\\[variant\\=floating\\]\\:border-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){border-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-70:is(:where(.tw\\:peer):disabled~*){opacity:.7}.tw\\:peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button)[data-active=true]~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(var(--tw-spacing) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(var(--tw-spacing) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(var(--tw-spacing) * 1)}.tw\\:peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\]:is(:where(.tw\\:peer)[data-variant=inset]~*){min-height:calc(100svh - 1rem)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(var(--tw-spacing) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(var(--tw-spacing) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(var(--tw-spacing) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--tw-spacing) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(var(--tw-spacing) * 0)}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(var(--tw-spacing) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(var(--tw-spacing) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.tw\\:first\\:mt-0:first-child{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(var(--tw-spacing) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/80:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/80:hover{background-color:color-mix(in oklab, var(--destructive) 80%, transparent)}}.tw\\:hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab, var(--destructive) 90%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-primary\\/80:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/80:hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab, var(--primary) 90%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:bg-sidebar:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):hover{background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-ring:focus-visible{--tw-ring-color:var(--ring)}.tw\\:focus-visible\\:ring-sidebar-ring:focus-visible{--tw-ring-color:var(--sidebar-ring)}.tw\\:focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:ring-offset-background:focus-visible{--tw-ring-offset-color:var(--background)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}.tw\\:has-\\[\\[data-variant\\=inset\\]\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(var(--tw-spacing) * 2)}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true]{background-color:var(--sidebar-accent)}.tw\\:data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true]{color:var(--sidebar-accent-foreground)}.tw\\:data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.tw\\:data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[orientation\\=vertical\\]\\:h-auto[data-orientation=vertical]{height:auto}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical]{height:1px}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical]{width:100%}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical]{flex-direction:column}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);left:calc(var(--tw-spacing) * 0)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after{content:var(--tw-content);height:calc(var(--tw-spacing) * 1)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after{content:var(--tw-content);width:100%}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[placeholder\\]\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[selected\\=true\\]\\:bg-accent[data-selected=true]{background-color:var(--accent)}.tw\\:data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:var(--accent-foreground)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(var(--tw-spacing) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--tw-spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow[data-state=active],.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-4[data-state=checked]{--tw-translate-x:calc(var(--tw-spacing) * 4);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:translate-x-\\[-16px\\][data-state=checked]{--tw-translate-x:-16px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.tw\\:data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.tw\\:data-\\[state\\=on\\]\\:bg-accent[data-state=on]{background-color:var(--accent)}.tw\\:data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:var(--accent-foreground)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.tw\\:data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}@media (hover:hover){.tw\\:data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent[data-state=open]:hover{background-color:var(--sidebar-accent)}.tw\\:data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground[data-state=open]:hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:calc(var(--tw-spacing) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:var(--input)}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}:where(.tw\\:sm\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:sm\\:rounded-lg{border-radius:var(--radius)}.tw\\:sm\\:p-8{padding:calc(var(--tw-spacing) * 8)}.tw\\:sm\\:text-left{text-align:left}.tw\\:sm\\:text-start{text-align:start}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(var(--tw-spacing) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2:is(:where(.tw\\:peer)[data-state=collapsed]~*):is(:where(.tw\\:peer)[data-variant=inset]~*){margin-left:calc(var(--tw-spacing) * 2)}}.tw\\:after\\:md\\:hidden:after{content:var(--tw-content)}@media (min-width:48rem){.tw\\:after\\:md\\:hidden:after{display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--tw-spacing) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--tw-spacing) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(var(--tw-spacing) * 2)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(var(--tw-spacing) * 2)}@media (prefers-color-scheme:dark){.tw\\:dark\\:border-destructive{border-color:var(--destructive)}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:hover{background-color:var(--tw-color-blue-500)}}}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--tw-spacing) * 1.5)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:var(--muted-foreground)}.tw\\:\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--tw-spacing) * 12)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--tw-spacing) * 3)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--tw-spacing) * 5)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:relative>:focus-visible{position:relative}.tw\\:\\[\\&\\>\\*\\]\\:focus-visible\\:z-10>:focus-visible{z-index:10}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-l-none>:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-l-0>:not(:first-child){border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-r-none>:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-r-md:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-top-right-radius:calc(var(--radius) * .8);border-bottom-right-radius:calc(var(--radius) * .8)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[role\\=checkbox\\]\\]\\:translate-y-\\[2px\\]>[role=checkbox]{--tw-translate-y:2px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(var(--tw-spacing) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>img\\]\\:absolute>img{position:absolute}.tw\\:\\[\\&\\>img\\]\\:top-4>img{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:left-4>img{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>img\\]\\:text-destructive>img{color:var(--destructive)}.tw\\:\\[\\&\\>img\\]\\:text-foreground>img{color:var(--foreground)}.tw\\:\\[\\&\\>img\\+div\\]\\:translate-y-\\[-3px\\]>img+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>img\\~\\*\\]\\:pl-7>img~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(var(--tw-spacing) * 2)}.tw\\:\\[\\&\\>span\\]\\:line-clamp-1>span{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:absolute>svg{position:absolute}.tw\\:\\[\\&\\>svg\\]\\:top-4>svg{top:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:left-4>svg{left:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--tw-spacing) * 4);height:calc(var(--tw-spacing) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-destructive>svg{color:var(--destructive)}.tw\\:\\[\\&\\>svg\\]\\:text-foreground>svg{color:var(--foreground)}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{--tw-translate-y:-3px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{padding-left:calc(var(--tw-spacing) * 7)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--tw-spacing) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize,[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=secondary] .tw\\:\\[\\[data-side\\=secondary\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--tw-spacing) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}}:root{--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--sidebar-background:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53);--radius:.5rem}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--sidebar-background:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(98.21% 0 0);--foreground:oklch(24.35% 0 0);--muted:oklch(95.21% 0 0);--muted-foreground:oklch(50.32% 0 0);--popover:oklch(99.11% 0 0);--popover-foreground:oklch(24.35% 0 0);--card:oklch(99.11% 0 0);--card-foreground:oklch(24.35% 0 0);--border:oklch(88.22% 0 0);--input:oklch(88.22% 0 0);--primary:oklch(35.48% .0611 180.17);--primary-foreground:oklch(100% 0 0);--secondary:oklch(92% .065 74.36);--secondary-foreground:oklch(34.99% .0685 40.82);--accent:oklch(93.1% 0 0);--accent-foreground:oklch(24.35% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(43.41% .0392 41.96);--sidebar-background:oklch(98.81% 0 0);--sidebar-foreground:oklch(26.45% 0 0);--sidebar-primary:oklch(32.5% 0 0);--sidebar-primary-foreground:oklch(98.81% 0 0);--sidebar-accent:oklch(95.21% 0 0);--sidebar-accent-foreground:oklch(32.5% 0 0);--sidebar-border:oklch(94.01% 0 0);--sidebar-ring:oklch(77.31% 0 0)}.paratext-dark{--background:oklch(17.76% 0 0);--foreground:oklch(94.91% 0 0);--muted:oklch(25.2% 0 0);--muted-foreground:oklch(76.99% 0 0);--popover:oklch(21.34% 0 0);--popover-foreground:oklch(94.91% 0 0);--card:oklch(21.34% 0 0);--card-foreground:oklch(94.91% 0 0);--border:oklch(23.51% .0115 91.77);--input:oklch(40.17% 0 0);--primary:oklch(98.6% .0113 84.59);--primary-foreground:oklch(20.29% .024 200.24);--secondary:oklch(31.63% .019 63.68);--secondary-foreground:oklch(92.47% .0523 66.15);--accent:oklch(28.5% 0 0);--accent-foreground:oklch(94.91% 0 0);--destructive:oklch(62.71% .1935 33.33);--destructive-foreground:oklch(100% 0 0);--ring:oklch(92.47% .0523 66.15);--sidebar-background:oklch(21.03% .0059 285.82);--sidebar-foreground:oklch(96.74% .0014 285.04);--sidebar-primary:oklch(48.82% .2172 264.38);--sidebar-primary-foreground:oklch(100% 0 0);--sidebar-accent:oklch(27.39% .0055 285.94);--sidebar-accent-foreground:oklch(96.74% .0014 285.04);--sidebar-border:oklch(27.39% .0055 285.94);--sidebar-ring:oklch(87.11% .0055 285.98)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}
`, "after-all");
export {
  kp as Alert,
  Np as AlertDescription,
  _p as AlertTitle,
  nc as Avatar,
  ac as AvatarFallback,
  yd as AvatarImage,
  dd as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  pd as BOOK_SELECTOR_STRING_KEYS,
  qe as Badge,
  wd as BookChapterControl,
  Yr as BookSelectionMode,
  ud as BookSelector,
  F as Button,
  fd as COMMENT_EDITOR_STRING_KEYS,
  md as COMMENT_LIST_STRING_KEYS,
  rc as Card,
  oc as CardContent,
  vd as CardDescription,
  xd as CardFooter,
  gd as CardHeader,
  bd as CardTitle,
  zs as ChapterRangeSelector,
  ba as Checkbox,
  vp as Checklist,
  Wr as ComboBox,
  ie as Command,
  br as CommandEmpty,
  re as CommandGroup,
  Ye as CommandInput,
  Gt as CommandItem,
  se as CommandList,
  hd as CommentEditor,
  _d as CommentList,
  Cp as ContextMenu,
  Pp as ContextMenuCheckboxItem,
  Ip as ContextMenuContent,
  Tp as ContextMenuGroup,
  Ap as ContextMenuItem,
  Lp as ContextMenuLabel,
  Sp as ContextMenuPortal,
  Dp as ContextMenuRadioGroup,
  $p as ContextMenuRadioItem,
  Vp as ContextMenuSeparator,
  jp as ContextMenuShortcut,
  Rp as ContextMenuSub,
  Op as ContextMenuSubContent,
  Mp as ContextMenuSubTrigger,
  Ep as ContextMenuTrigger,
  _c as DataTable,
  zp as Drawer,
  Bp as DrawerClose,
  Kp as DrawerContent,
  Hp as DrawerDescription,
  Gp as DrawerFooter,
  qp as DrawerHeader,
  Aw as DrawerOverlay,
  Iw as DrawerPortal,
  Up as DrawerTitle,
  Fp as DrawerTrigger,
  ve as DropdownMenu,
  Qt as DropdownMenuCheckboxItem,
  xe as DropdownMenuContent,
  ma as DropdownMenuGroup,
  Qr as DropdownMenuItem,
  Ec as DropdownMenuItemType,
  yr as DropdownMenuLabel,
  ic as DropdownMenuPortal,
  lc as DropdownMenuRadioGroup,
  dc as DropdownMenuRadioItem,
  Je as DropdownMenuSeparator,
  kd as DropdownMenuShortcut,
  sc as DropdownMenuSub,
  wc as DropdownMenuSubContent,
  cc as DropdownMenuSubTrigger,
  Pe as DropdownMenuTrigger,
  Nc as ERROR_DUMP_STRING_KEYS,
  Rd as ERROR_POPOVER_STRING_KEYS,
  Rc as EditorKeyboardShortcuts,
  Cc as ErrorDump,
  Dd as ErrorPopover,
  $d as FOOTNOTE_EDITOR_STRING_KEYS,
  Ad as Filter,
  Md as FilterDropdown,
  Id as Footer,
  Pd as FootnoteEditor,
  qc as FootnoteItem,
  Ld as FootnoteList,
  qd as INVENTORY_STRING_KEYS,
  Xe as Input,
  Gd as Inventory,
  dt as Label,
  Pc as MARKER_MENU_STRING_KEYS,
  Sd as MarkdownRenderer,
  Lc as MarkerMenu,
  Od as MoreInfo,
  Sc as MultiSelectComboBox,
  fp as NavigationContentSearch,
  Ut as Popover,
  Is as PopoverAnchor,
  Ht as PopoverContent,
  le as PopoverTrigger,
  Wp as Progress,
  Bn as RadioGroup,
  Hr as RadioGroupItem,
  As as RecentSearches,
  Xp as ResizableHandle,
  Jp as ResizablePanel,
  Yp as ResizablePanelGroup,
  xp as ResultsCard,
  sp as SCOPE_SELECTOR_STRING_KEYS,
  lp as ScopeSelector,
  ip as ScriptureResultsViewer,
  cp as ScrollGroupSelector,
  _o as SearchBar,
  Se as Select,
  Me as SelectContent,
  hc as SelectGroup,
  St as SelectItem,
  Nd as SelectLabel,
  gc as SelectScrollDownButton,
  mc as SelectScrollUpButton,
  Cd as SelectSeparator,
  De as SelectTrigger,
  Re as SelectValue,
  Ge as Separator,
  wp as SettingsList,
  pp as SettingsListHeader,
  dp as SettingsListItem,
  lw as SettingsSidebar,
  ap as SettingsSidebarContentSearch,
  ew as Sidebar,
  ow as SidebarContent,
  Jd as SidebarFooter,
  on as SidebarGroup,
  Zd as SidebarGroupAction,
  an as SidebarGroupContent,
  nn as SidebarGroupLabel,
  Yd as SidebarHeader,
  Wd as SidebarInput,
  rw as SidebarInset,
  nw as SidebarMenu,
  Qd as SidebarMenuAction,
  tp as SidebarMenuBadge,
  sw as SidebarMenuButton,
  aw as SidebarMenuItem,
  ep as SidebarMenuSkeleton,
  rp as SidebarMenuSub,
  np as SidebarMenuSubButton,
  op as SidebarMenuSubItem,
  tw as SidebarProvider,
  Hd as SidebarRail,
  Xd as SidebarSeparator,
  Ud as SidebarTrigger,
  to as Skeleton,
  Qp as Slider,
  Zp as Sonner,
  Mw as Spinner,
  tu as Switch,
  eo as TabDropdownMenu,
  hp as TabFloatingMenu,
  up as TabToolbar,
  vo as Table,
  yo as TableBody,
  Td as TableCaption,
  Ne as TableCell,
  Ed as TableFooter,
  ur as TableHead,
  xo as TableHeader,
  Jt as TableRow,
  eu as Tabs,
  nu as TabsContent,
  ru as TabsList,
  ou as TabsTrigger,
  yp as TextField,
  au as Textarea,
  wa as ToggleGroup,
  sr as ToggleGroupItem,
  gp as Toolbar,
  Dt as Tooltip,
  Mt as TooltipContent,
  Nt as TooltipProvider,
  Lt as TooltipTrigger,
  bp as UiLanguageSelector,
  Ca as VerticalTabs,
  Ta as VerticalTabsContent,
  Ea as VerticalTabsList,
  bw as VerticalTabsTrigger,
  ec as badgeVariants,
  Fn as buttonVariants,
  f as cn,
  Kd as getBookIdFromUSFM,
  kr as getInventoryHeader,
  Fd as getLinesFromUSFM,
  Bd as getNumberFromUSFM,
  Yc as getStatusForItem,
  mp as getToolbarOSReservedSpaceClassName,
  jd as inventoryCountColumn,
  Vd as inventoryItemColumn,
  zd as inventoryStatusColumn,
  fc as selectTriggerVariants,
  du as sonner,
  iu as useEvent,
  su as useEventAsync,
  tc as useListbox,
  $w as usePromise,
  cd as useRecentSearches,
  _r as useSidebar,
  lu as useStylesheet
};
//# sourceMappingURL=index.js.map
