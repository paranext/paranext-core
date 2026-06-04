var hs = Object.defineProperty;
var gs = (t, e, r) => e in t ? hs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Bt = (t, e, r) => gs(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx as a, jsxs as w, Fragment as rt } from "react/jsx-runtime";
import nt, { useRef as F, useMemo as U, useState as I, useCallback as P, useEffect as W, useLayoutEffect as ee, createContext as ua, useContext as ro, Component as fs, createElement as jo, Suspense as ms, forwardRef as pa, Fragment as ao } from "react";
import { Command as rr } from "cmdk";
import { clsx as vs } from "clsx";
import { extendTailwindMerge as bs, twMerge as xs } from "tailwind-merge";
import { Slot as Ke, Dialog as me, Popover as Ir, Label as ys, RadioGroup as La, Tooltip as cr, ToggleGroup as $n, Separator as ks, Avatar as oo, DropdownMenu as Mt, Select as Gt, Checkbox as Vo, Tabs as ue, Menubar as ke, ContextMenu as Lt, Progress as Bo, Slider as Gr, Switch as Fo } from "radix-ui";
import { cva as Ne } from "class-variance-authority";
import { IconX as Ns, IconSearch as _s, IconCheck as ar, IconChevronRight as no, IconChevronDown as Cs, IconChevronUp as Es, IconSelector as Ts, IconLayoutSidebar as zs, IconLayoutSidebarRight as Ss, IconLoader as Is, IconAlertOctagon as Ds, IconAlertTriangle as Rs, IconInfoCircle as $s, IconCircleCheck as Os } from "@tabler/icons-react";
import { Canon as gt } from "@sillsdev/scripture";
import { includes as Ur, Section as et, getChaptersForBook as As, formatScrRef as ze, getSectionForBook as Tr, formatRelativeDate as Ms, formatReplacementString as Ze, sanitizeHtml as Ls, DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS as Xr, getLocalizeKeyForScrollGroupId as Pa, NumberFormat as Ps, formatBytes as js, getCurrentLocale as Vs, usfmMarkers as Jr, getFormatCallerFunction as Bs, deepEqual as Fs, isString as Go, compareScrRefs as ja, scrRefToBBBCCCVVV as va, defaultScrRef as ba, formatScrRefRange as Gs } from "platform-bible-utils";
import { Check as Ge, Clock as Uo, ChevronsLeft as Ko, ChevronsRight as qo, ChevronLeft as Va, ChevronRight as Fe, ArrowLeft as Us, ArrowRight as On, ChevronDown as tr, BoldIcon as Ks, ItalicIcon as qs, X as ha, AtSign as An, Pencil as Hs, Trash2 as Ws, ArrowUp as io, MoreHorizontal as Mn, MailOpen as Ys, Mail as Xs, ChevronUp as Js, FilterIcon as Zs, ArrowLeftIcon as Qs, ChevronLeftIcon as tl, ChevronRightIcon as el, ArrowRightIcon as rl, ChevronsUpDown as so, Filter as Ln, Copy as Pn, User as al, Link as ol, CircleHelp as nl, Star as il, Undo as sl, Redo as ll, SquareX as jn, FunctionSquare as Vn, SquareSigma as Bn, Ban as cl, AlertCircle as Ba, CircleCheckIcon as dl, CircleXIcon as wl, CircleHelpIcon as ul, ArrowUpIcon as pl, ArrowDownIcon as hl, ScrollText as gl, Search as fl, MenuIcon as ml, Menu as vl, EllipsisVertical as bl, MoreVertical as Ho, LoaderCircle as xl } from "lucide-react";
import { createEditor as Fn, $getRoot as De, $createParagraphNode as mr, $getSelection as Ht, HISTORY_MERGE_TAG as lo, ParagraphNode as Gn, TextNode as Un, $isTokenOrSegmented as yl, $getCharacterOffsets as kl, $cloneWithPropertiesEphemeral as Nl, $getPreviousSelection as _l, $isRangeSelection as ve, $caretFromPoint as Cl, $getSiblingCaret as Kn, $getChildCaret as El, $getAdjacentChildCaret as Tl, $isChildCaret as zl, $normalizeCaret as Sl, $setSelectionFromCaretRange as Il, $getCollapsedCaretRange as Dl, $getCaretInDirection as Wo, $splitAtPointCaretNext as Rl, $isTextPointCaret as $l, $findMatchingParent as qn, $isElementNode as Se, mergeRegister as Re, getDOMTextNode as Ol, isHTMLElement as Hn, CLEAR_EDITOR_COMMAND as Wn, COMMAND_PRIORITY_EDITOR as co, shallowMergeConfig as Al, defineExtension as oe, safeCast as or, createState as Ml, FORMAT_TEXT_COMMAND as Yn, $isNodeSelection as Xn, COMMAND_PRIORITY_LOW as Jn, RootNode as Ll, LineBreakNode as Pl, TabNode as jl, $isEditorState as Vl, createCommand as Bl, CLICK_COMMAND as Fl, isDOMNode as Gl, $getNodeFromDOMNode as Ul, $createNodeSelection as Kl, $setSelection as ql, $getEditor as Hl, DecoratorNode as Fa, $getState as Wl, toggleTextFormatType as Yo, TEXT_TYPE_TO_FORMAT as Yl, $setState as Xl, addClassNamesToElement as Zn, $create as Jl, $getNodeByKey as Zl, removeClassNamesFromElement as Ql, KEY_TAB_COMMAND as tc, $isBlockElementNode as ra, $createRangeSelection as ec, $normalizeSelection__EXPERIMENTAL as rc, OUTDENT_CONTENT_COMMAND as ac, INDENT_CONTENT_COMMAND as Xo, INSERT_TAB_COMMAND as oc, COMMAND_PRIORITY_CRITICAL as wo, $isDecoratorNode as nc, $isParagraphNode as ic, $isTextNode as aa, SELECTION_CHANGE_COMMAND as Qn, getRegisteredNode as sc, isDocumentFragment as Jo, isDOMDocumentNode as lc, ArtificialNode__DO_NOT_USE as ti, $createLineBreakNode as ei, $isRootOrShadowRoot as cc, isBlockDomNode as Zo, isInlineDomNode as Qo, $insertNodes as dc } from "lexical";
import { HeadingNode as wc, QuoteNode as uc, registerRichText as pc } from "@lexical/rich-text";
import { flushSync as hc, createPortal as gc } from "react-dom";
import { $isTableSelection as fc } from "@lexical/table";
import { createHeadlessEditor as ri } from "@lexical/headless";
import { useReactTable as ai, getFilteredRowModel as mc, getSortedRowModel as oi, getPaginationRowModel as vc, getCoreRowModel as ni, flexRender as zr, getGroupedRowModel as bc, getExpandedRowModel as xc } from "@tanstack/react-table";
import yc from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Ga, HIDDEN_NOTE_CALLER as Ua, getDefaultViewOptions as kc, isInsertEmbedOpOfType as Kr, Editorial as Nc } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as _c } from "react-hotkeys-hook";
import * as uo from "react-resizable-panels";
import { Drawer as qe } from "vaul";
import { useTheme as Cc } from "next-themes";
import { Toaster as Ec } from "sonner";
import { toast as nf } from "sonner";
const Tc = bs({ prefix: "tw" });
function Ka(t) {
  const e = [];
  let r = "", o = 0;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    i === "[" ? o += 1 : i === "]" && (o -= 1), i === ":" && o === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function zc(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Ka(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, c) => c !== r), `-${i}`].join(":")}`, original: t };
  }
  const o = e.findIndex((i) => i.startsWith("!tw-"));
  if (o !== -1) {
    const i = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((d, c) => c !== o), `!${i}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const i = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Sc(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Ka(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), n = r[r.length - 1], i = Ka(e), s = i.some((d) => d.startsWith("-tw-")), l = i.some((d) => d.startsWith("!tw-"));
  if (s && n.startsWith("-")) {
    const d = n.slice(1);
    return [...o, `-tw-${d}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const d = n.slice(1);
    return [...o, `!tw-${d}`].join(":");
  }
  return [...o, `tw-${n}`].join(":");
}
function f(...t) {
  const e = vs(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Tc(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), n = [];
  return r.forEach((d) => {
    const c = zc(d);
    o.set(c.normalized, c.original), n.push(c.normalized);
  }), xs(n.join(" ")).split(" ").filter(Boolean).map((d) => {
    const c = o.get(d);
    return c ? Sc(d, c) : d;
  }).join(" ");
}
const Ar = 250, ii = 300, po = 400, Ic = 450, si = 500, Dc = 550, li = Ne(
  // CUSTOM: Added 'pr-twp' at the front of the base class string to apply Platform.Bible's
  // Tailwind CSS scope isolation. All Button instances inherit this via buttonVariants.
  "pr-twp tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:active:not-aria-[haspopup]:translate-y-px tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        outline: "tw:border-border tw:bg-background tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:border-input tw:dark:bg-input/30 tw:dark:hover:bg-input/50",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:aria-expanded:bg-secondary tw:aria-expanded:text-secondary-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:hover:bg-muted/50",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:hover:bg-destructive/20 tw:focus-visible:border-destructive/40 tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:hover:bg-destructive/30 tw:dark:focus-visible:ring-destructive/40",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline"
      },
      size: {
        default: "tw:h-8 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        xs: "tw:h-6 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),10px)] tw:px-2 tw:text-xs tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3",
        sm: "tw:h-7 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        icon: "tw:size-8",
        "icon-xs": "tw:size-6 tw:rounded-[min(var(--tw-radius-md),10px)] tw:in-data-[slot=button-group]:rounded-lg tw:[&_svg:not([class*=size-])]:size-3",
        "icon-sm": "tw:size-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "tw:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function G({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...n
}) {
  const i = o ? Ke.Root : "button";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: f(li({ variant: e, size: r, className: t })),
      ...n
    }
  );
}
const Rc = "layoutDirection";
function kt() {
  const t = localStorage.getItem(Rc);
  return t === "rtl" ? t : "ltr";
}
function qa({ ...t }) {
  return /* @__PURE__ */ a(me.Root, { "data-slot": "dialog", ...t });
}
function Hp({ ...t }) {
  return /* @__PURE__ */ a(me.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function $c({ ...t }) {
  return /* @__PURE__ */ a(me.Portal, { "data-slot": "dialog-portal", ...t });
}
function Wp({ ...t }) {
  return /* @__PURE__ */ a(me.Close, { "data-slot": "dialog-close", ...t });
}
function Oc({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    me.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: f(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Ic, ...e },
      ...r
    }
  );
}
function Ha({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...i
}) {
  const s = kt();
  return /* @__PURE__ */ w($c, { children: [
    /* @__PURE__ */ a(Oc, { className: o }),
    /* @__PURE__ */ w(
      me.Content,
      {
        "data-slot": "dialog-content",
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: si, ...n },
        dir: s,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ a(me.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ w(G, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ a(Ns, {}),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "dialog-header",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function tn({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ w(
    "div",
    {
      "data-slot": "dialog-footer",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        r,
        e && /* @__PURE__ */ a(me.Close, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ya({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    me.Title,
    {
      "data-slot": "dialog-title",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function Yp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    me.Description,
    {
      "data-slot": "dialog-description",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Mr({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ a(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:w-full to give callers control over width
        // CUSTOM: Added tw:file:text-foreground so the file-picker button text matches the foreground design token
        "pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...r
    }
  );
}
function Xp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function Ac({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Mc = Ne(
  "tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-5px)] tw:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "tw:order-first tw:ps-2 tw:has-[>button]:ms-[-0.3rem] tw:has-[>kbd]:ms-[-0.15rem]",
        "inline-end": "tw:order-last tw:pe-2 tw:has-[>button]:me-[-0.3rem] tw:has-[>kbd]:me-[-0.15rem]",
        "block-start": "tw:order-first tw:w-full tw:justify-start tw:px-2.5 tw:pt-2 tw:group-has-[>input]/input-group:pt-2 tw:[.border-b]:pb-2",
        "block-end": "tw:order-last tw:w-full tw:justify-start tw:px-2.5 tw:pb-2 tw:group-has-[>input]/input-group:pb-2 tw:[.border-t]:pt-2"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function Lc({
  className: t,
  align: e = "inline-start",
  ...r
}) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ a(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: f(Mc({ align: e }), t),
        onClick: (o) => {
          var n, i;
          o.target instanceof HTMLElement && o.target.closest("button") || (i = (n = o.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || i.focus();
        },
        ...r
      }
    )
  );
}
Ne("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
  variants: {
    size: {
      xs: "tw:h-6 tw:gap-1 tw:rounded-[calc(var(--radius)-3px)] tw:px-1.5 tw:[&>svg:not([class*=size-])]:size-3.5",
      sm: "tw:",
      "icon-xs": "tw:size-6 tw:rounded-[calc(var(--radius)-3px)] tw:p-0 tw:has-[>svg]:p-0",
      "icon-sm": "tw:size-8 tw:p-0 tw:has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function $e({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    rr,
    {
      "data-slot": "command",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function vr({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...r
}) {
  const o = kt(), n = nt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || i.key !== " " || i.currentTarget.value !== "") return;
      const s = i.currentTarget.closest("[cmdk-root]"), l = s == null ? void 0 : s.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      l && (i.preventDefault(), i.stopPropagation(), l.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ w(Ac, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        rr.Input,
        {
          "data-slot": "command-input",
          className: f(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: n,
          ...r
        }
      ),
      /* @__PURE__ */ a(Lc, { children: /* @__PURE__ */ a(_s, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Oe({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    rr.List,
    {
      "data-slot": "command-list",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function Lr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    rr.Empty,
    {
      "data-slot": "command-empty",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function be({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    rr.Group,
    {
      "data-slot": "command-group",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function ho({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    rr.Separator,
    {
      "data-slot": "command-separator",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function _e({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ w(
    rr.Item,
    {
      "data-slot": "command-item",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ a(ar, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Pc({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "command-shortcut",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const ci = (t, e, r, o, n) => {
  switch (t) {
    case et.OT:
      return e ?? "Old Testament";
    case et.NT:
      return r ?? "New Testament";
    case et.DC:
      return o ?? "Deuterocanon";
    case et.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, jc = (t, e, r, o, n) => {
  switch (t) {
    case et.OT:
      return e ?? "OT";
    case et.NT:
      return r ?? "NT";
    case et.DC:
      return o ?? "DC";
    case et.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ve(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? gt.bookIdToEnglishName(t);
}
function go(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const di = gt.allBookIds.filter(
  (t) => !gt.isObsolete(gt.bookIdToNumber(t))
), se = Object.fromEntries(
  di.map((t) => [t, gt.bookIdToEnglishName(t)])
);
function fo(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const n = gt.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(Ur(n.toLowerCase(), o) || Ur(t.toLowerCase(), o) || (i ? Ur(i.localizedName.toLowerCase(), o) || Ur(i.localizedId.toLowerCase(), o) : !1));
}
function wi({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: n,
  section: i,
  className: s,
  showCheck: l = !1,
  localizedBookNames: d,
  commandValue: c,
  disabled: u = !1
}) {
  const g = F(!1), m = () => {
    u || (g.current || o == null || o(e), setTimeout(() => {
      g.current = !1;
    }, 100));
  }, p = (v) => {
    if (u) {
      v.preventDefault();
      return;
    }
    g.current = !0, n ? n(v) : o == null || o(e);
  }, h = U(
    () => Ve(e, d),
    [e, d]
  ), k = U(
    () => go(e, d),
    [e, d]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: f(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === et.OT,
          "tw:border-s-purple-200": i === et.NT,
          "tw:border-s-indigo-200": i === et.DC,
          "tw:border-s-amber-200": i === et.Extra
        }
      ),
      children: /* @__PURE__ */ w(
        _e,
        {
          ref: t,
          value: c || `${e} ${gt.bookIdToEnglishName(e)}`,
          onSelect: m,
          onMouseDown: p,
          role: "option",
          "aria-selected": r,
          "aria-disabled": u || void 0,
          "aria-label": `${gt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: u,
          className: f(s, u && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            l && /* @__PURE__ */ a(
              Ge,
              {
                className: f(
                  "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                  r ? "tw:opacity-100" : "tw:opacity-0"
                )
              }
            ),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: h }),
            /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: k })
          ]
        }
      )
    }
  );
}
function Ce({ ...t }) {
  return /* @__PURE__ */ a(Ir.Root, { "data-slot": "popover", ...t });
}
function Ae({ ...t }) {
  return /* @__PURE__ */ a(Ir.Trigger, { "data-slot": "popover-trigger", ...t });
}
const ui = nt.createContext(null);
function xa({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ a(ui.Provider, { value: t, children: e });
}
function Ee({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...n
}) {
  const i = kt(), s = nt.useContext(ui);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ a(Ir.Portal, { container: s ?? void 0, children: /* @__PURE__ */ a(
      Ir.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ar, ...o },
        dir: i,
        ...n
      }
    ) })
  );
}
function Vc({ ...t }) {
  return /* @__PURE__ */ a(Ir.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Jp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-header",
      className: f("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Zp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-title",
      className: f("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Qp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "popover-description",
      className: f("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function pi(t, e, r) {
  return `${t} ${se[t]}${e ? ` ${go(t, e)} ${Ve(t, e)}` : ""}`;
}
function Bc({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (u) => String(u),
  getItemKey: o = (u) => String(u),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: d = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: c = "ghost"
}) {
  const [u, g] = I(!1);
  if (t.length === 0)
    return;
  const m = (p) => {
    e(p), g(!1);
  };
  return /* @__PURE__ */ w(Ce, { open: u, onOpenChange: g, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ a(
      G,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": n,
        children: /* @__PURE__ */ a(Uo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(Ee, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a($e, { children: /* @__PURE__ */ a(Oe, { children: /* @__PURE__ */ a(be, { heading: i, children: t.map((p) => /* @__PURE__ */ w(
      _e,
      {
        onSelect: () => m(p),
        className: f("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ a(Uo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function th(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (l) => !r(l, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Zr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Fc = [
  Zr.BOOK_ONLY,
  Zr.BOOK_CHAPTER,
  Zr.BOOK_CHAPTER_VERSE
];
function Gc(t) {
  return Zr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function en(t, e) {
  return gt.bookIdToNumber(t) < gt.bookIdToNumber(e.book);
}
function Uc(t, e, r) {
  const o = gt.bookIdToNumber(t) - gt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function ya(t, e, r, o) {
  const n = gt.bookIdToNumber(t) - gt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function rn(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function ge(t) {
  return As(gt.bookIdToNumber(t));
}
function Kc(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Fc.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [l, d = void 0, c = void 0] = s.slice(1);
        let u;
        const g = e.filter((m) => fo(m, l, r));
        if (g.length === 1 && ([u] = g), !u && d) {
          if (gt.isBookIdValid(l)) {
            const m = l.toUpperCase();
            e.includes(m) && (u = m);
          }
          if (!u && r) {
            const m = Array.from(r.entries()).find(
              ([, p]) => p.localizedId.toLowerCase() === l.toLowerCase()
            );
            m && e.includes(m[0]) && ([u] = m);
          }
        }
        if (!u && d) {
          const p = ((h) => Object.keys(se).find(
            (k) => se[k].toLowerCase() === h.toLowerCase()
          ))(l);
          if (p && e.includes(p) && (u = p), !u && r) {
            const h = Array.from(r.entries()).find(
              ([, k]) => k.localizedName.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([u] = h);
          }
        }
        if (u) {
          let m = d ? parseInt(d, 10) : void 0;
          m && m > ge(u) && (m = Math.max(ge(u), 1));
          const p = c ? parseInt(c, 10) : void 0;
          return {
            book: u,
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
function qc(t, e, r, o) {
  const n = P(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], u = Math.max(ge(c), 1);
        o({
          book: c,
          chapterNum: u,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = P(() => {
    const d = ge(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const u = e[c + 1];
        o({
          book: u,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = P(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = P(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return U(() => [
    {
      onClick: n,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Ko : qo
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Va : Fe
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? Fe : Va
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === ge(t.book) || ge(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? qo : Ko
    }
  ], [
    t,
    e,
    r,
    n,
    s,
    l,
    i
  ]);
}
function hi({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: n,
  isDimmed: i,
  isSelected: s,
  className: l
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(be, { children: /* @__PURE__ */ a("div", { className: f("tw:grid tw:grid-cols-6 tw:gap-1", l), children: Array.from({ length: t }, (d, c) => c + 1).map((d) => {
      const c = (n == null ? void 0 : n(d)) ?? !1;
      return /* @__PURE__ */ a(
        _e,
        {
          value: e(d),
          onSelect: () => {
            c || r(d);
          },
          ref: o(d),
          disabled: c,
          "aria-disabled": c || void 0,
          className: f(
            // No fixed width (previously `tw:w-8`) so cells fill their grid
            // column (1fr) and adapt when the popover is narrower than the
            // default 280px. `tw:min-w-0` lets cells shrink below their
            // intrinsic content width; `tw:px-0` overrides CommandItem's
            // default horizontal padding so multi-digit numbers still fit
            // in tight cells. Keep `tw:h-8` for a consistent row height.
            "tw:h-8 tw:min-w-0 tw:cursor-pointer tw:justify-center tw:rounded-md tw:px-0 tw:text-center tw:text-sm",
            {
              "tw:bg-primary tw:text-primary-foreground": (s == null ? void 0 : s(d)) ?? !1
            },
            {
              "tw:bg-muted/50 tw:text-muted-foreground/50": ((i == null ? void 0 : i(d)) ?? !1) && !c
            },
            c && "tw:cursor-not-allowed tw:opacity-40"
          ),
          children: d
        },
        d
      );
    }) }) });
}
function an({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: n,
  isChapterDisabled: i,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ a(
      hi,
      {
        count: ge(t),
        valueBuilder: (l) => `${t} ${se[t] || ""} ${l}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (l) => t === e.book && l === e.chapterNum,
        className: s
      }
    );
}
function on({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: i,
  isVerseDimmed: s,
  isVerseDisabled: l,
  className: d
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      hi,
      {
        count: r,
        valueBuilder: (c) => `${t} ${se[t] || ""} ${e}:${c}`,
        onSelect: n,
        itemRef: i,
        isDisabled: l,
        isDimmed: s,
        isSelected: (c) => t === o.book && e === o.chapterNum && c === o.verseNum,
        className: d
      }
    );
}
function ka({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  localizedBookNames: n,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: d,
  getEndVerse: c,
  disableReferencesUpTo: u,
  submitKeys: g,
  triggerContent: m,
  triggerVariant: p = "outline",
  onOpenChange: h,
  onCloseAutoFocus: k,
  modal: v = !1,
  align: x = "center"
}) {
  const b = kt(), [N, E] = I(!1), [C, S] = I(""), [D, _] = I(""), [y, T] = I("books"), [A, $] = I(void 0), [V, L] = I(
    void 0
  ), [H, R] = I(void 0), [X, pt] = I(!1), K = F(null), it = F(!1), J = F(void 0), at = F(void 0), q = F(void 0), st = F(void 0), ct = F({}), dt = F({}), wt = P(
    (z) => {
      e(z), l && l(z);
    },
    [e, l]
  ), Ut = U(() => o ? o() : di, [o]), yt = U(() => ({
    [et.OT]: Ut.filter((Y) => gt.isBookOT(Y)),
    [et.NT]: Ut.filter((Y) => gt.isBookNT(Y)),
    [et.DC]: Ut.filter((Y) => gt.isBookDC(Y)),
    [et.Extra]: Ut.filter((Y) => gt.extraBooks().includes(Y))
  }), [Ut]), Wt = U(() => Object.values(yt).flat(), [yt]), Yt = U(() => {
    if (!D.trim()) return yt;
    const z = {
      [et.OT]: [],
      [et.NT]: [],
      [et.DC]: [],
      [et.Extra]: []
    };
    return [et.OT, et.NT, et.DC, et.Extra].forEach((tt) => {
      z[tt] = yt[tt].filter((St) => fo(St, D, n));
    }), z;
  }, [yt, D, n]), M = U(
    () => Kc(D, Wt, n),
    [D, Wt, n]
  ), Pt = F(!1);
  W(() => {
    if (!Pt.current) {
      Pt.current = !0;
      return;
    }
    h == null || h(N);
  }, [N, h]);
  const Kt = P(() => {
    if (M) {
      const z = M.chapterNum ?? 1, Y = M.verseNum ?? 1;
      if (u && ya(M.book, z, Y, u))
        return;
      wt({
        book: M.book,
        chapterNum: z,
        verseNum: Y
      }), E(!1), _(""), S("");
    }
  }, [wt, M, u]), ne = P(
    (z) => {
      const Y = V ?? (M == null ? void 0 : M.book), tt = H ?? (M == null ? void 0 : M.chapterNum);
      !Y || !tt || (wt({
        book: Y,
        chapterNum: tt,
        verseNum: z
      }), E(!1));
    },
    [wt, V, H, M]
  ), Xt = P(
    (z) => {
      if (u && en(z, u)) return;
      if (ge(z) <= 1) {
        wt({
          book: z,
          chapterNum: 1,
          verseNum: 1
        }), E(!1), _("");
        return;
      }
      $(z), T("chapters");
    },
    [wt, u]
  ), jt = P(
    (z) => {
      const Y = y === "chapters" ? A : M == null ? void 0 : M.book;
      if (Y) {
        if (c && c(Y, z) > 1) {
          L(Y), R(z), T("verses"), S("");
          return;
        }
        wt({
          book: Y,
          chapterNum: z,
          verseNum: 1
        }), E(!1);
      }
    },
    [wt, y, A, M, c]
  ), Le = P(
    (z) => {
      wt(z), E(!1), _("");
    },
    [wt]
  ), Jt = qc(t, Wt, b, e), Zt = P(() => {
    T("books"), $(void 0), L(void 0), R(void 0), setTimeout(() => {
      at.current && at.current.focus();
    }, 0);
  }, []), B = P(() => {
    const z = V;
    L(void 0), R(void 0), z ? ($(z), T("chapters"), S("")) : Zt();
  }, [V, Zt]), Z = P((z) => {
    E(z), z && (T("books"), $(void 0), L(void 0), R(void 0), _(""));
  }, []), { otLong: ut, ntLong: lt, dcLong: vt, extraLong: Nt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, _t = P(
    (z) => ci(z, ut, lt, vt, Nt),
    [ut, lt, vt, Nt]
  ), bt = P(
    (z) => M ? !!M.chapterNum && !z.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), Tt = U(
    () => ze(
      t,
      n ? Ve(t.book, n) : "English"
    ),
    [t, n]
  ), O = P((z) => (Y) => {
    ct.current[z] = Y;
  }, []), ft = P((z) => (Y) => {
    dt.current[z] = Y;
  }, []), mt = U(
    () => Gc(D),
    [D]
  ), Ct = U(() => !c || !M || !M.chapterNum || !mt ? !1 : c(M.book, M.chapterNum) > 0, [c, M, mt]), He = P(
    (z) => u ? en(z, u) : !1,
    [u]
  ), Pe = P(
    (z) => (Y) => u ? Uc(z, Y, u) : !1,
    [u]
  ), xr = P(
    (z, Y) => (tt) => u ? ya(z, Y, tt, u) : !1,
    [u]
  ), We = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", yr = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", kr = P(
    (z) => {
      (z.key === "Home" || z.key === "End") && z.stopPropagation(), g && g.includes(z.key) && M && M.chapterNum !== void 0 && M.verseNum !== void 0 && (z.preventDefault(), z.stopPropagation(), Kt());
    },
    [g, M, Kt]
  ), Pr = P(
    (z) => {
      var re, ir, Nr;
      if (z.ctrlKey) return;
      const { isLetter: Y, isDigit: tt } = rn(z.key);
      if ((y === "chapters" || y === "verses") && (z.key === " " || z.key === "Enter")) {
        const Vt = z.target instanceof HTMLElement ? z.target : void 0;
        if (!!(Vt != null && Vt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          z.stopPropagation();
          return;
        }
        const Ot = (re = J.current) == null ? void 0 : re.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Ot) {
          z.preventDefault(), z.stopPropagation(), Ot.click();
          return;
        }
      }
      if ((y === "chapters" || y === "verses") && (Y || tt)) {
        z.preventDefault(), z.stopPropagation();
        return;
      }
      if (y === "chapters" && z.key === "Backspace") {
        z.preventDefault(), z.stopPropagation(), Zt();
        return;
      }
      if (y === "verses" && z.key === "Backspace") {
        z.preventDefault(), z.stopPropagation(), B();
        return;
      }
      const St = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(z.key);
      if (y === "verses" && St) {
        const Vt = V, Et = H;
        if (!Vt || !Et || !c) return;
        const Ot = c(Vt, Et);
        if (!Ot) return;
        (ir = J.current) == null || ir.focus();
        const xt = (() => {
          if (!C) return 1;
          const Ye = C.match(/:(\d+)$/);
          return Ye ? parseInt(Ye[1], 10) : 0;
        })();
        let Qt = xt;
        const te = 6;
        switch (z.key) {
          case "ArrowLeft":
            xt !== 0 && (Qt = xt > 1 ? xt - 1 : Ot);
            break;
          case "ArrowRight":
            xt !== 0 && (Qt = xt < Ot ? xt + 1 : 1);
            break;
          case "ArrowUp":
            Qt = xt === 0 ? Ot : Math.max(1, xt - te);
            break;
          case "ArrowDown":
            Qt = xt === 0 ? 1 : Math.min(Ot, xt + te);
            break;
          default:
            return;
        }
        Qt !== xt && (z.preventDefault(), z.stopPropagation(), S(
          `${Vt} ${se[Vt] || ""} ${Et}:${Qt}`
        ), setTimeout(() => {
          const Ye = dt.current[Qt];
          Ye && Ye.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((y === "chapters" || y === "books" && M) && St) {
        const Vt = y === "chapters" ? A : M == null ? void 0 : M.book;
        if (!Vt) return;
        y === "chapters" && ((Nr = J.current) == null || Nr.focus());
        const Et = (() => {
          if (!C) return 1;
          const te = C.match(/(\d+)$/);
          return te ? parseInt(te[1], 10) : 0;
        })(), Ot = ge(Vt);
        if (!Ot) return;
        let xt = Et;
        const Qt = 6;
        switch (z.key) {
          case "ArrowLeft":
            Et !== 0 && (xt = Et > 1 ? Et - 1 : Ot);
            break;
          case "ArrowRight":
            Et !== 0 && (xt = Et < Ot ? Et + 1 : 1);
            break;
          case "ArrowUp":
            xt = Et === 0 ? Ot : Math.max(1, Et - Qt);
            break;
          case "ArrowDown":
            xt = Et === 0 ? 1 : Math.min(Ot, Et + Qt);
            break;
          default:
            return;
        }
        xt !== Et && (z.preventDefault(), z.stopPropagation(), S(
          `${Vt} ${se[Vt] || ""} ${xt}`
        ), setTimeout(() => {
          const te = ct.current[xt];
          te && te.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      y,
      M,
      Zt,
      B,
      A,
      V,
      H,
      c,
      C
    ]
  ), jr = P((z) => {
    var St;
    if (z.shiftKey || z.key === "Tab" || z.key === " ") return;
    if (z.key === "Enter") {
      z.stopPropagation();
      return;
    }
    if (z.key === "ArrowUp" || z.key === "ArrowDown") {
      (St = at.current) == null || St.focus();
      return;
    }
    const { isLetter: Y, isDigit: tt } = rn(z.key);
    (Y || tt) && (z.preventDefault(), _((re) => re + z.key), at.current.focus(), pt(!1));
  }, []);
  return ee(() => {
    const z = setTimeout(() => {
      if (N && y === "books" && q.current && st.current) {
        const Y = q.current, tt = st.current, St = tt.offsetTop, re = Y.clientHeight, ir = tt.clientHeight, Nr = St - re / 2 + ir / 2;
        Y.scrollTo({
          top: Math.max(0, Nr),
          behavior: "smooth"
        }), S(pi(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(z);
    };
  }, [N, y, D, M, t.book]), ee(() => {
    if (y === "chapters" && A) {
      const z = A === t.book, Y = z ? t.chapterNum : 1;
      S(
        `${A} ${se[A] || ""} ${Y}`
      ), setTimeout(() => {
        if (q.current)
          if (z) {
            const tt = ct.current[t.chapterNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        J.current && J.current.focus();
      }, 0);
    }
  }, [y, A, M, t.book, t.chapterNum]), ee(() => {
    if (y === "verses" && V && H !== void 0) {
      const z = V === t.book && H === t.chapterNum, Y = z ? t.verseNum : 1;
      S(
        `${V} ${se[V] || ""} ${H}:${Y}`
      ), setTimeout(() => {
        if (q.current)
          if (z) {
            const tt = dt.current[t.verseNum];
            tt && tt.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        J.current && J.current.focus();
      }, 0);
    }
  }, [
    y,
    V,
    H,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ w(Ce, { open: N, onOpenChange: Z, modal: v, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ a(
      G,
      {
        ref: K,
        "aria-label": "book-chapter-trigger",
        variant: p,
        role: "combobox",
        "aria-expanded": N,
        className: f(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (z) => {
          it.current && (it.current = !1, z.preventDefault());
        },
        children: m ?? /* @__PURE__ */ a("span", { className: "tw:truncate", children: Tt })
      }
    ) }),
    /* @__PURE__ */ a(
      Ee,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[var(--radix-popper-anchor-width,280px)] tw:min-w-[200px] tw:max-w-[280px] tw:p-0",
        align: x,
        onKeyDownCapture: Pr,
        onKeyDown: (z) => z.stopPropagation(),
        onPointerDownOutside: (z) => {
          const { target: Y } = z;
          N && K.current && Y instanceof Node && K.current.contains(Y) && (it.current = !0, Z(!1));
        },
        onCloseAutoFocus: k,
        children: /* @__PURE__ */ w(
          $e,
          {
            ref: J,
            loop: !0,
            value: C,
            onValueChange: S,
            shouldFilter: !1,
            children: [
              y === "books" ? /* @__PURE__ */ w("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ w("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    vr,
                    {
                      ref: at,
                      value: D,
                      onValueChange: _,
                      onKeyDown: kr,
                      onFocus: () => pt(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : ""
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    Bc,
                    {
                      recentSearches: s,
                      onSearchItemSelect: Le,
                      renderItem: (z) => ze(z, "English"),
                      getItemKey: (z) => `${z.book}-${z.chapterNum}-${z.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: Jt.map(({ onClick: z, disabled: Y, title: tt, icon: St }) => /* @__PURE__ */ a(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      pt(!0), z();
                    },
                    disabled: Y,
                    className: "tw:h-10 tw:w-4 tw:p-0",
                    title: tt,
                    onKeyDown: jr,
                    children: /* @__PURE__ */ a(St, {})
                  },
                  tt
                )) })
              ] }) : /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: y === "verses" ? B : Zt,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: b === "ltr" ? /* @__PURE__ */ a(Us, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(On, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                y === "chapters" && A && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Ve(A, n) }),
                y === "verses" && V && H !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Ve(V, n)} ${H}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: y === "verses" ? yr : We
                  }
                )
              ] }),
              !X && /* @__PURE__ */ w(Oe, { ref: q, children: [
                y === "books" && /* @__PURE__ */ w(rt, { children: [
                  !M && Object.entries(Yt).map(([z, Y]) => {
                    if (Y.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(be, { heading: _t(z), children: Y.map((tt) => /* @__PURE__ */ a(
                          wi,
                          {
                            bookId: tt,
                            onSelect: (St) => Xt(St),
                            section: Tr(tt),
                            commandValue: `${tt} ${se[tt]}`,
                            ref: tt === t.book ? st : void 0,
                            localizedBookNames: n,
                            disabled: He(tt)
                          },
                          tt
                        )) }, z)
                      );
                  }),
                  M && /* @__PURE__ */ a(be, { children: /* @__PURE__ */ a(
                    _e,
                    {
                      value: `${M.book} ${se[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                      onSelect: Kt,
                      disabled: !!u && ya(
                        M.book,
                        M.chapterNum ?? 1,
                        M.verseNum ?? 1,
                        u
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: ze(
                        {
                          book: M.book,
                          chapterNum: M.chapterNum ?? 1,
                          verseNum: M.verseNum ?? 1
                        },
                        n ? go(M.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  M && Ct && M.chapterNum && c && /* @__PURE__ */ w(rt, { children: [
                    /* @__PURE__ */ w("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${Ve(M.book, n)} ${M.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: yr })
                    ] }),
                    /* @__PURE__ */ a(
                      on,
                      {
                        bookId: M.book,
                        chapterNum: M.chapterNum,
                        endVerse: c(M.book, M.chapterNum),
                        scrRef: t,
                        onVerseSelect: ne,
                        setVerseRef: ft,
                        isVerseDisabled: xr(M.book, M.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  M && !Ct && ge(M.book) > 1 && /* @__PURE__ */ w(rt, { children: [
                    /* @__PURE__ */ w("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: Ve(M.book, n) }),
                      /* @__PURE__ */ a("span", { children: We })
                    ] }),
                    /* @__PURE__ */ a(
                      an,
                      {
                        bookId: M.book,
                        scrRef: t,
                        onChapterSelect: jt,
                        setChapterRef: O,
                        isChapterDimmed: bt,
                        isChapterDisabled: Pe(M.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                y === "chapters" && A && /* @__PURE__ */ a(
                  an,
                  {
                    bookId: A,
                    scrRef: t,
                    onChapterSelect: jt,
                    setChapterRef: O,
                    isChapterDisabled: Pe(A),
                    className: "tw:p-4"
                  }
                ),
                y === "verses" && V && H !== void 0 && c && /* @__PURE__ */ a(
                  on,
                  {
                    bookId: V,
                    chapterNum: H,
                    endVerse: c(V, H),
                    scrRef: t,
                    onVerseSelect: ne,
                    setVerseRef: ft,
                    isVerseDisabled: xr(
                      V,
                      H
                    ),
                    className: "tw:p-4"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const eh = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function zt({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ys.Root,
    {
      "data-slot": "label",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function gi({
  className: t,
  ...e
}) {
  const r = kt();
  return /* @__PURE__ */ a(
    La.Root,
    {
      "data-slot": "radio-group",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Xa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    La.Item,
    {
      "data-slot": "radio-group-item",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        La.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ a("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function Hc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function nn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: d = Hc,
  getButtonLabel: c,
  icon: u = void 0,
  buttonPlaceholder: g = "",
  textPlaceholder: m = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: k = "start",
  isDisabled: v = !1,
  ariaLabel: x,
  ...b
}) {
  const [N, E] = I(!1), C = c ?? d, S = (_) => _.length > 0 && typeof _[0] == "object" && "options" in _[0], D = (_, y) => {
    const T = d(_), A = typeof _ == "object" && "secondaryLabel" in _ ? _.secondaryLabel : void 0, $ = `${y ?? ""}${T}${A ?? ""}`;
    return /* @__PURE__ */ w(
      _e,
      {
        value: T,
        onSelect: () => {
          l(_), E(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ a(
            Ge,
            {
              className: f("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== T
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            T,
            A && /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              A
            ] })
          ] })
        ]
      },
      $
    );
  };
  return /* @__PURE__ */ w(Ce, { open: N, onOpenChange: E, ...b, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ w(
      G,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": x,
        id: t,
        className: f(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            u && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: u }),
            /* @__PURE__ */ a(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? C(s) : g
              }
            )
          ] }),
          /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ee,
      {
        align: k,
        className: f("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ w($e, { children: [
          /* @__PURE__ */ a(vr, { placeholder: m, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(Lr, { children: p }),
          /* @__PURE__ */ a(Oe, { children: S(e) ? e.map((_) => /* @__PURE__ */ a(be, { heading: _.groupHeading, children: _.options.map((y) => D(y, _.groupHeading)) }, _.groupHeading)) : e.map((_) => D(_)) })
        ] })
      }
    )
  ] });
}
function Wc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = U(
    () => Array.from({ length: i }, (c, u) => u + 1),
    [i]
  );
  return /* @__PURE__ */ w(rt, { children: [
    /* @__PURE__ */ a(zt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      nn,
      {
        isDisabled: n,
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
    /* @__PURE__ */ a(zt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      nn,
      {
        isDisabled: n,
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
var Ja = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Ja || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Ja || (Ja = {}));
const rh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Na = (t, e) => t[e] ?? e;
function ah({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: c
}) {
  const u = Na(c, "%webView_bookSelector_currentBook%"), g = Na(c, "%webView_bookSelector_choose%"), m = Na(c, "%webView_bookSelector_chooseBooks%"), [p, h] = I(
    "current book"
    /* CurrentBook */
  ), k = (v) => {
    h(v), t(v);
  };
  return /* @__PURE__ */ a(
    gi,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (v) => k(v),
      children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Xa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(zt, { className: "tw:ms-1", children: u })
          ] }),
          /* @__PURE__ */ a(zt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Wc,
            {
              isDisabled: p === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: s,
              chapterCount: n,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Xa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(zt, { className: "tw:ms-1", children: m })
          ] }),
          /* @__PURE__ */ a(zt, { className: "tw:flex tw:items-center", children: o.map((v) => gt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ a(
            G,
            {
              disabled: p === "current book",
              onClick: () => r(),
              children: g
            }
          )
        ] })
      ] })
    }
  );
}
const fi = ua(null);
function Yc(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Te() {
  const t = ro(fi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const mi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Xc = mi ? ee : W, qr = { tag: lo };
function Jc({ initialConfig: t, children: e }) {
  const r = U(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: l, html: d } = t, c = Yc(null, o), u = Fn({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (g) => s(g, u), theme: o });
    return function(g, m) {
      if (m !== null) {
        if (m === void 0) g.update(() => {
          const p = De();
          if (p.isEmpty()) {
            const h = mr();
            p.append(h);
            const k = mi ? document.activeElement : null;
            (Ht() !== null || k !== null && k === g.getRootElement()) && h.select();
          }
        }, qr);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const p = g.parseEditorState(m);
            g.setEditorState(p, qr);
            break;
          }
          case "object":
            g.setEditorState(m, qr);
            break;
          case "function":
            g.update(() => {
              De().isEmpty() && m(g);
            }, qr);
        }
      }
    }(u, l), [u, c];
  }, []);
  return Xc(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(fi.Provider, { value: r, children: e });
}
const Zc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : W;
function Qc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Te();
  return Zc(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(lo) || l.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const mo = {
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
};
function It({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ a(
    cr.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Dt({ ...t }) {
  return /* @__PURE__ */ a(cr.Root, { "data-slot": "tooltip", ...t });
}
function Rt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    cr.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? f(li({ variant: e }), t) : t,
      ...r
    }
  );
}
function $t({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ a(cr.Portal, { children: /* @__PURE__ */ w(
    cr.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Dc, ...r },
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ a(cr.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
const vo = [
  wc,
  Gn,
  Un,
  uc
], td = ua(null), _a = {
  didCatch: !1,
  error: null
};
class ed extends fs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = _a;
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
      for (var r, o, n = arguments.length, i = new Array(n), s = 0; s < n; s++)
        i[s] = arguments[s];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: i,
        reason: "imperative-api"
      }), this.setState(_a);
    }
  }
  componentDidCatch(e, r) {
    var o, n;
    (o = (n = this.props).onError) === null || o === void 0 || o.call(n, e, r);
  }
  componentDidUpdate(e, r) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: n
    } = this.props;
    if (o && r.error !== null && rd(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(_a);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: r,
      FallbackComponent: o,
      fallback: n
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
      if (typeof r == "function")
        l = r(d);
      else if (o)
        l = jo(o, d);
      else if (n !== void 0)
        l = n;
      else
        throw s;
    }
    return jo(td.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function rd() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function ad({ children: t, onError: e }) {
  return a(ed, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const od = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : W;
function nd(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function id() {
  return function(t) {
    const [e] = Te(), r = U(() => t(e), [e, t]), [o, n] = I(() => r.initialValueFn()), i = F(o);
    return od(() => {
      const { initialValueFn: s, subscribe: l } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), l((c) => {
        i.current = c, n(c);
      });
    }, [r, t]), o;
  }(nd);
}
function sd(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let l, d = s.length;
  s.sort((c, u) => {
    const g = c.top - u.top;
    return Math.abs(g) <= 3 ? c.left - u.left : g;
  });
  for (let c = 0; c < d; c++) {
    const u = s[c], g = l && l.top <= u.top && l.top + l.height > u.top && l.left + l.width > u.left, m = u.width + i === o.width;
    g || m ? (s.splice(c--, 1), d--) : l = u;
  }
  return s;
}
function ld(t, e, r = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !yl(e) && o !== null) {
    const [n, i] = o, s = t.isBackward(), l = n.getNode(), d = i.getNode(), c = e.is(l), u = e.is(d);
    if (c || u) {
      const [g, m] = kl(t), p = l.is(d), h = e.is(s ? d : l), k = e.is(s ? l : d);
      let v, x = 0;
      p ? (x = g > m ? m : g, v = g > m ? g : m) : h ? (x = s ? m : g, v = void 0) : k && (x = 0, v = s ? g : m);
      const b = e.__text.slice(x, v);
      b !== e.__text && (r === "clone" && (e = Nl(e)), e.__text = b);
    }
  }
  return e;
}
function oa(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const vi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, cd = vi && "documentMode" in document ? document.documentMode : null;
!(!vi || !("InputEvent" in window) || cd) && "getTargetRanges" in new window.InputEvent("input");
function he(t) {
  return `${t}px`;
}
const dd = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function wd(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const l = document.createElement("div");
  function d() {
    o === null && oa(182), n === null && oa(183);
    const { left: g, top: m } = n.getBoundingClientRect(), p = sd(t, e);
    var h, k;
    l.isConnected || (k = l, (h = n).insertBefore(k, h.firstChild));
    let v = !1;
    for (let x = 0; x < p.length; x++) {
      const b = p[x], N = s[x] || document.createElement("div"), E = N.style;
      E.position !== "absolute" && (E.position = "absolute", v = !0);
      const C = he(b.left - g);
      E.left !== C && (E.left = C, v = !0);
      const S = he(b.top - m);
      E.top !== S && (N.style.top = S, v = !0);
      const D = he(b.width);
      E.width !== D && (N.style.width = D, v = !0);
      const _ = he(b.height);
      E.height !== _ && (N.style.height = _, v = !0), N.parentNode !== l && (l.append(N), v = !0), s[x] = N;
    }
    for (; s.length > p.length; ) s.pop();
    v && r(s);
  }
  function c() {
    n = null, o = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const g of s) g.remove();
    s = [];
  }
  l.style.position = "relative";
  const u = t.registerRootListener(function g() {
    const m = t.getRootElement();
    if (m === null) return c();
    const p = m.parentElement;
    if (!Hn(p)) return c();
    c(), o = m, n = p, i = new MutationObserver((h) => {
      const k = t.getRootElement(), v = k && k.parentElement;
      if (k !== o || v !== n) return g();
      for (const x of h) if (!l.contains(x.target)) return d();
    }), i.observe(p, dd), d();
  });
  return () => {
    u(), c();
  };
}
function sn(t, e, r) {
  if (t.type !== "text" && Se(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Ol(r) || r, t.offset];
}
function ud(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== he(-1.5) && (r.marginTop = he(-1.5)), r.paddingTop !== he(4) && (r.paddingTop = he(4)), r.paddingBottom !== he(0) && (r.paddingBottom = he(0));
  }
}
function pd(t, e = ud) {
  let r = null, o = null, n = null, i = null, s = null, l = null, d = () => {
  };
  function c(u) {
    u.read(() => {
      const g = Ht();
      if (!ve(g)) return r = null, n = null, i = null, l = null, d(), void (d = () => {
      });
      const [m, p] = function(_) {
        const y = _.getStartEndPoints();
        return _.isBackward() ? [y[1], y[0]] : y;
      }(g), h = m.getNode(), k = h.getKey(), v = m.offset, x = p.getNode(), b = x.getKey(), N = p.offset, E = t.getElementByKey(k), C = t.getElementByKey(b), S = r === null || E !== o || v !== n || k !== r.getKey(), D = i === null || C !== s || N !== l || b !== i.getKey();
      if ((S || D) && E !== null && C !== null) {
        const _ = function(y, T, A, $, V, L, H) {
          const R = (y._window ? y._window.document : document).createRange();
          return R.setStart(...sn(T, A, $)), R.setEnd(...sn(V, L, H)), R;
        }(t, m, h, E, p, x, C);
        d(), d = wd(t, _, e);
      }
      r = h, o = E, n = v, i = x, s = C, l = N;
    });
  }
  return c(t.getEditorState()), Re(t.registerUpdateListener(({ editorState: u }) => c(u)), () => {
    d();
  });
}
function hd(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = pd(t, e));
  };
  return t.registerRootListener((n) => {
    if (n) {
      const i = n.ownerDocument;
      return i.addEventListener("selectionchange", o), o(), () => {
        r !== null && r(), i.removeEventListener("selectionchange", o);
      };
    }
  });
}
function gd(t) {
  const e = qn(t, (r) => Se(r) && !r.isInline());
  return Se(e) || oa(4, t.__key), e;
}
function fd(t) {
  const e = Ht() || _l();
  let r;
  if (ve(e)) r = Cl(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = Kn(l, "next"));
    }
    r = r || El(De(), "previous").getFlipped().insert(mr());
  }
  const o = md(t, r), n = Tl(o), i = zl(n) ? Sl(n) : o;
  return Il(Dl(i)), t.getLatest();
}
function md(t, e, r) {
  let o = Wo(e, "next");
  for (let n = o; n; n = Rl(n, r)) o = n;
  return $l(o) && oa(283), o.insert(t.isInline() ? mr().append(t) : t), Wo(Kn(t.getLatest(), "next"), e.direction);
}
function vd(t) {
  const e = Ht();
  if (!ve(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const l = qn(i, (c) => Se(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !r.has(d) && (r.add(d), t(l));
  }
  return r.size > 0;
}
const bd = Symbol.for("preact-signals");
function ga() {
  if (Ie > 1) return void Ie--;
  let t, e = !1;
  for (!function() {
    let r = na;
    for (na = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Sr !== void 0; ) {
    let r = Sr;
    for (Sr = void 0, ia++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && bi(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (ia = 0, Ie--, e) throw t;
}
function xd(t) {
  if (Ie > 0) return t();
  Za = ++yd, Ie++;
  try {
    return t();
  } finally {
    ga();
  }
}
let ot, Sr;
function ln(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let na, Ie = 0, ia = 0, yd = 0, Za = 0, Qr = 0;
function cn(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function Ft(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Dr(t, e) {
  return new Ft(t, e);
}
function bi(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function dn(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function xi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Xe(t, e) {
  Ft.call(this, void 0), this.x = t, this.s = void 0, this.g = Qr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function kd(t, e) {
  return new Xe(t, e);
}
function yi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ie++;
    const r = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, bo(t), o;
    } finally {
      ot = r, ga();
    }
  }
}
function bo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, yi(t);
}
function Nd(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  xi(this), ot = t, this.f &= -2, 8 & this.f && bo(this), ga();
}
function lr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function xe(t, e) {
  const r = new lr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function br(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Dr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Ft.prototype.brand = bd, Ft.prototype.h = function() {
  return !0;
}, Ft.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : ln(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Ft.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && ln(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Ft.prototype.subscribe = function(t) {
  return xe(() => {
    const e = this.value, r = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = r;
    }
  }, { name: "sub" });
}, Ft.prototype.valueOf = function() {
  return this.value;
}, Ft.prototype.toString = function() {
  return this.value + "";
}, Ft.prototype.toJSON = function() {
  return this.value;
}, Ft.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(Ft.prototype, "value", { get() {
  const t = cn(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (ia > 100) throw new Error("Cycle detected");
    (function(e) {
      Ie !== 0 && ia === 0 && e.l !== Za && (e.l = Za, na = { S: e, v: e.v, i: e.i, o: na });
    })(this), this.v = t, this.i++, Qr++, Ie++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      ga();
    }
  }
} }), Xe.prototype = new Ft(), Xe.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Qr)) return !0;
  if (this.g = Qr, this.f |= 1, this.i > 0 && !bi(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    dn(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, xi(this), this.f &= -2, !0;
}, Xe.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Ft.prototype.S.call(this, t);
}, Xe.prototype.U = function(t) {
  if (this.t !== void 0 && (Ft.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Xe.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Xe.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = cn(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), lr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, lr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, yi(this), dn(this), Ie++;
  const t = ot;
  return ot = this, Nd.bind(this, t);
}, lr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Sr, Sr = this);
}, lr.prototype.d = function() {
  this.f |= 8, 1 & this.f || bo(this);
}, lr.prototype.dispose = function() {
  this.d();
};
oe({ build: (t, e, r) => br(e), config: or({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return xe(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ki() {
  const t = De(), e = Ht(), r = mr();
  t.clear(), t.append(r), e !== null && r.select(), ve(e) && (e.format = 0);
}
function Ni(t, e = ki) {
  return t.registerCommand(Wn, (r) => (t.update(e), !0), co);
}
oe({ build: (t, e, r) => br(e), config: or({ $onClear: ki }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return xe(() => Ni(t, o.value));
} });
function _d(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Ca = Ml("format", { parse: (t) => typeof t == "number" ? t : 0 });
class _i extends Fa {
  $config() {
    return this.config("decorator-text", { extends: Fa, stateConfigs: [{ flat: !0, stateConfig: Ca }] });
  }
  getFormat() {
    return Wl(this, Ca);
  }
  getFormatFlags(e, r) {
    return Yo(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Yl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Xl(this, Ca, e);
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
function Cd(t) {
  return t instanceof _i;
}
oe({ name: "@lexical/extension/DecoratorText", nodes: () => [_i], register: (t, e, r) => t.registerCommand(Yn, (o) => {
  const n = Ht();
  if (Xn(n) || ve(n)) for (const i of n.getNodes()) Cd(i) && i.toggleFormat(o);
  return !1;
}, Jn) });
function Ci(t, e) {
  let r;
  return Dr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Qa = oe({ build: (t) => Ci(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function ht(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Ei(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = Ei(r[n], o[n]);
    return t;
  }
  return e;
}
const xo = 0, to = 1, Ti = 2, Ea = 3, Hr = 4, sr = 5, Ta = 6, Cr = 7;
function za(t) {
  return t.id === xo;
}
function zi(t) {
  return t.id === Ti;
}
function Ed(t) {
  return function(e) {
    return e.id === to;
  }(t) || ht(305, String(t.id), String(to)), Object.assign(t, { id: Ti });
}
const Td = /* @__PURE__ */ new Set();
class zd {
  constructor(e, r) {
    Bt(this, "builder");
    Bt(this, "configs");
    Bt(this, "_dependency");
    Bt(this, "_peerNameSet");
    Bt(this, "extension");
    Bt(this, "state");
    Bt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: xo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Al;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    zi(r) || ht(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, d, c) {
      return Object.assign(l, { config: d, id: Ea, registerState: c });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: Hr, initResult: d, registerState: c });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Hr && ht(307, String(r.id), String(sr)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: sr, output: s, registerState: l });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== sr && ht(308, String(o.id), String(sr));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Ta });
    }(o), () => {
      const i = this.state;
      i.id !== Cr && ht(309, String(o.id), String(Cr)), this.state = function(s) {
        return Object.assign(s, { id: sr });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Ta && ht(310, String(r.id), String(Ta)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Cr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && ht(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && ht(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Hr;
    }(e) || ht(313, String(e.id), String(Hr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Ea;
    }(e) || ht(314, String(e.id), String(Ea)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ht(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && ht(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= Cr;
    }(e) || ht(316, String(e.id), String(Cr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Td;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= sr;
      })(e) || ht(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const wn = { tag: lo };
function Sd() {
  const t = De();
  t.isEmpty() && t.append(mr());
}
const Id = oe({ config: or({ setOptions: wn, updateOptions: wn }), init: ({ $initialEditorState: t = Sd }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Vl(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Ll, Un, Pl, jl, Gn] }), un = Symbol.for("@lexical/extension/LexicalBuilder");
function pn() {
}
function Dd(t) {
  throw t;
}
function Wr(t) {
  return Array.isArray(t) ? t : [t];
}
const Sa = "0.43.0+prod.esm";
class dr {
  constructor(e) {
    Bt(this, "roots");
    Bt(this, "extensionNameMap");
    Bt(this, "outgoingConfigEdges");
    Bt(this, "incomingEdges");
    Bt(this, "conflicts");
    Bt(this, "_sortedExtensionReps");
    Bt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Sa, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Wr(Id)];
    for (const o of e) r.push(Wr(o));
    return new dr(r);
  }
  static maybeFromEditor(e) {
    const r = e[un];
    return r && (r.PACKAGE_VERSION !== Sa && ht(292, r.PACKAGE_VERSION, Sa), r instanceof dr || ht(293)), r;
  }
  static fromEditor(e) {
    const r = dr.maybeFromEditor(e);
    return r === void 0 && ht(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(Fn({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [un]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = pn;
    function r() {
      try {
        e();
      } finally {
        e = pn;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Re(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && ht(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && ht(296);
    const r = Wr(e), [o] = r;
    typeof o.name != "string" && ht(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && ht(298, o.name), !n) {
      n = new zd(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && ht(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && ht(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = Wr(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (zi(i)) return;
      const s = o.extension.name;
      var l;
      za(i) || ht(300, s, n || "[unknown]"), za(l = i) || ht(304, String(l.id), String(xo)), i = Object.assign(l, { id: to }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const c of d.keys()) {
        const u = this.extensionNameMap.get(c);
        u && r(u, s);
      }
      i = Ed(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) za(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && ht(301, o.name);
      for (const s of n) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), n = [() => o.abort()], i = o.signal;
    for (const s of r) {
      const l = s.register(e, i);
      l && n.push(l);
    }
    for (const s of r) {
      const l = s.afterRegistration(e);
      l && n.push(l);
    }
    return Re(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const u of l) {
      const { extension: g } = u;
      if (g.onError !== void 0 && (e.onError = g.onError), g.disableEvents !== void 0 && (e.disableEvents = g.disableEvents), g.parentEditor !== void 0 && (e.parentEditor = g.parentEditor), g.editable !== void 0 && (e.editable = g.editable), g.namespace !== void 0 && (e.namespace = g.namespace), g.$initialEditorState !== void 0 && (e.$initialEditorState = g.$initialEditorState), g.nodes) for (const m of _d(g)) {
        if (typeof m != "function") {
          const p = o.get(m.replace);
          p && ht(302, g.name, m.replace.name, p.extension.name), o.set(m.replace, u);
        }
        r.add(m);
      }
      if (g.html) {
        if (g.html.export) for (const [m, p] of g.html.export.entries()) n.set(m, p);
        g.html.import && Object.assign(i, g.html.import);
      }
      g.theme && Ei(s, g.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, c = n.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = i), c && (e.html.export = n));
    for (const u of l) u.init(e);
    return e.onError || (e.onError = Dd), e;
  }
}
const Rd = /* @__PURE__ */ new Set(), hn = oe({ build(t, e, r) {
  const o = r.getDependency(Qa).output, n = Dr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Ci(() => {
  }, () => xe(() => {
    const s = i.peek(), { watchedNodeKeys: l } = n.value;
    let d, c = !1;
    o.value.read(() => {
      if (Ht()) for (const [u, g] of l.entries()) {
        if (g.size === 0) {
          l.delete(u);
          continue;
        }
        const m = Zl(u), p = m && m.isSelected() || !1;
        c = c || p !== (!!s && s.has(u)), p && (d = d || /* @__PURE__ */ new Set(), d.add(u));
      }
    }), !c && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const l = kd(() => (i.value || Rd).has(s)), { watchedNodeKeys: d } = n.peek();
    let c = d.get(s);
    const u = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), u || (d.set(s, c), n.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [Qa], name: "@lexical/extension/NodeSelection" }), $d = Bl("INSERT_HORIZONTAL_RULE_COMMAND");
class ur extends Fa {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new ur(e.__key);
  }
  static importJSON(e) {
    return yo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Od, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Zn(r, e.theme.hr), r;
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
function Od() {
  return { node: yo() };
}
function yo() {
  return Jl(ur);
}
function Ad(t) {
  return t instanceof ur;
}
oe({ dependencies: [Qa, hn], name: "@lexical/extension/HorizontalRule", nodes: () => [ur], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(hn).output, n = Dr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Re(t.registerCommand($d, (s) => {
    const l = Ht();
    if (!ve(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = yo();
      fd(d);
    }
    return !0;
  }, co), t.registerCommand(Fl, (s) => {
    if (Gl(s.target)) {
      const l = Ul(s.target);
      if (Ad(l)) return function(d, c = !1) {
        const u = Ht(), g = d.isSelected(), m = d.getKey();
        let p;
        c && Xn(u) ? p = u : (p = Kl(), ql(p)), g ? p.delete(m) : p.add(m);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Jn), t.registerMutationListener(ur, (s, l) => {
    xd(() => {
      let d = !1;
      const { nodeSelections: c } = n.peek();
      for (const [u, g] of s.entries()) if (g === "destroyed") c.delete(u), d = !0;
      else {
        const m = c.get(u), p = t.getElementByKey(u);
        m ? m.domNode.value = p : (d = !0, c.set(u, { domNode: Dr(p), selectedSignal: o(u) }));
      }
      d && (n.value = { nodeSelections: c });
    });
  }), xe(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: d } of n.value.nodeSelections.values()) s.push(xe(() => {
      const c = l.value;
      c && (d.value ? Zn(c, i) : Ql(c, i));
    }));
    return Re(...s);
  }));
} });
oe({ build: (t, e) => br({ inheritEditableFromParent: e.inheritEditableFromParent }), config: or({ $getParentEditor: function() {
  const t = Hl();
  return dr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => xe(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
oe({ build: (t, e, r) => br(e), config: or({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return xe(() => {
    if (!o.disabled.value) return hd(t, o.onReposition.value);
  });
} });
function Si(t) {
  return t.canBeEmpty();
}
function Md(t, e, r = Si) {
  return Re(t.registerCommand(tc, (o) => {
    const n = Ht();
    if (!ve(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((m) => ra(m) && m.canIndent()).length > 0) return !0;
      const l = s.anchor, d = s.focus, c = d.isBefore(l) ? d : l, u = c.getNode(), g = gd(u);
      if (g.canIndent()) {
        const m = g.getKey();
        let p = ec();
        if (p.anchor.set(m, 0, "element"), p.focus.set(m, 0, "element"), p = rc(p), p.anchor.is(c)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? ac : Xo : oc;
    return t.dispatchCommand(i, void 0);
  }, co), t.registerCommand(Xo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = Ht();
    if (!ve(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return vd((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, wo));
}
oe({ build: (t, e, r) => br(e), config: or({ $canIndent: Si, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return xe(() => {
    if (!o.value) return Md(t, n, i);
  });
} });
const Ld = oe({ name: "@lexical/react/ReactProvider" });
function Pd() {
  return De().getTextContent();
}
function jd(t, e = !0) {
  if (t) return !1;
  let r = Pd();
  return e && (r = r.trim()), r === "";
}
function Vd(t) {
  if (!jd(t, !1)) return !1;
  const e = De().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (nc(n)) return !1;
    if (Se(n)) {
      if (!ic(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const d = i[o];
        if (!aa(d)) return !1;
      }
    }
  }
  return !0;
}
function Ii(t) {
  return () => Vd(t);
}
function Di(t) {
  const e = window.location.origin, r = (o) => {
    if (o.origin !== e) return;
    const n = t.getRootElement();
    if (document.activeElement !== n) return;
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
            const [c, u, g, m, p] = d;
            t.update(() => {
              const h = Ht();
              if (ve(h)) {
                const k = h.anchor;
                let v = k.getNode(), x = 0, b = 0;
                if (aa(v) && c >= 0 && u >= 0 && (x = c, b = c + u, h.setTextNodeRange(v, x, v, b)), x === b && g === "" || (h.insertRawText(g), v = k.getNode()), aa(v)) {
                  x = m, b = m + p;
                  const N = v.getTextContentSize();
                  x = x > N ? N : x, b = b > N ? N : b, h.setTextNodeRange(v, x, v, b);
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
oe({ build: (t, e, r) => br(e), config: or({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => xe(() => r.getOutput().disabled.value ? void 0 : Di(t)) });
function Bd(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ko = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : W;
function Fd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = I(() => r.getDecorators());
    return ko(() => r.registerDecoratorListener((s) => {
      hc(() => {
        i(s);
      });
    }), [r]), W(() => {
      i(r.getDecorators());
    }, [r]), U(() => {
      const s = [], l = Object.keys(n);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], u = a(o, { onError: (m) => r._onError(m), children: a(ms, { fallback: null, children: n[c] }) }), g = r.getElementByKey(c);
        g !== null && s.push(gc(u, g, c));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function Gd({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = dr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Ld.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Bd(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Fd, { editor: t, ErrorBoundary: e });
}
function gn(t) {
  return t.getEditorState().read(Ii(t.isComposing()));
}
function Ud({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Te();
  return function(n) {
    ko(() => Re(pc(n), Di(n)), [n]);
  }(o), w(rt, { children: [t, a(Kd, { content: e }), a(Gd, { editor: o, ErrorBoundary: r })] });
}
function Kd({ content: t }) {
  const [e] = Te(), r = function(n) {
    const [i, s] = I(() => gn(n));
    return ko(() => {
      function l() {
        const d = gn(n);
        s(d);
      }
      return l(), Re(n.registerUpdateListener(() => {
        l();
      }), n.registerEditableListener(() => {
        l();
      }));
    }, [n]), i;
  }(e), o = id();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function qd({ defaultSelection: t }) {
  const [e] = Te();
  return W(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Hd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : W;
function Wd({ onClear: t }) {
  const [e] = Te();
  return Hd(() => Ni(e, t), [e, t]), null;
}
const Ri = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : W;
function Yd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: u, ariaOwns: g, ariaRequired: m, autoCapitalize: p, className: h, id: k, role: v = "textbox", spellCheck: x = !0, style: b, tabIndex: N, "data-testid": E, ...C }, S) {
  const [D, _] = I(t.isEditable()), y = P((A) => {
    A && A.ownerDocument && A.ownerDocument.defaultView ? t.setRootElement(A) : t.setRootElement(null);
  }, [t]), T = U(() => /* @__PURE__ */ function(...A) {
    return ($) => {
      for (const V of A) typeof V == "function" ? V($) : V != null && (V.current = $);
    };
  }(S, y), [y, S]);
  return Ri(() => (_(t.isEditable()), t.registerEditableListener((A) => {
    _(A);
  })), [t]), a("div", { "aria-activedescendant": D ? e : void 0, "aria-autocomplete": D ? r : "none", "aria-controls": D ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": D && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": u, "aria-owns": D ? g : void 0, "aria-readonly": !D || void 0, "aria-required": m, autoCapitalize: p, className: h, contentEditable: D, "data-testid": E, id: k, ref: T, role: v, spellCheck: x, style: b, tabIndex: N, ...C });
}
const Xd = pa(Yd);
function fn(t) {
  return t.getEditorState().read(Ii(t.isComposing()));
}
const Jd = pa(Zd);
function Zd(t, e) {
  const { placeholder: r, ...o } = t, [n] = Te();
  return w(rt, { children: [a(Xd, { editor: n, ...o, ref: e }), r != null && a(Qd, { editor: n, content: r })] });
}
function Qd({ content: t, editor: e }) {
  const r = function(s) {
    const [l, d] = I(() => fn(s));
    return Ri(() => {
      function c() {
        const u = fn(s);
        d(u);
      }
      return c(), Re(s.registerUpdateListener(() => {
        c();
      }), s.registerEditableListener(() => {
        c();
      }));
    }, [s]), l;
  }(e), [o, n] = I(e.isEditable());
  if (ee(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function tw({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Jd,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ a(
        "div",
        {
          className: r ?? "tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const $i = ua(void 0);
function ew({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = U(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a($i.Provider, { value: s, children: i });
}
function Oi() {
  const t = ro($i);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function rw() {
  const [t, e] = I(void 0), r = P(() => {
    e(void 0);
  }, []), o = U(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(qa, { open: !0, onOpenChange: r, children: /* @__PURE__ */ w(Ha, { children: [
      /* @__PURE__ */ a(Wa, { children: /* @__PURE__ */ a(Ya, { children: i }) }),
      s
    ] }) });
  }, [t, r]), n = P(
    (i, s, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: s(r),
        title: i
      });
    },
    [r]
  );
  return [o, n];
}
function aw({
  children: t
}) {
  const [e] = Te(), [r, o] = I(e), [n, i] = I("paragraph"), [s, l] = rw(), d = () => {
  };
  return W(() => r.registerCommand(
    Qn,
    (c, u) => (o(u), !1),
    wo
  ), [r]), /* @__PURE__ */ w(
    ew,
    {
      activeEditor: r,
      $updateToolbar: d,
      blockType: n,
      setBlockType: i,
      showModal: l,
      children: [
        s,
        t({ blockType: n })
      ]
    }
  );
}
function ow(t) {
  const [e] = Te(), { activeEditor: r } = Oi();
  W(() => r.registerCommand(
    Qn,
    () => {
      const o = Ht();
      return o && t(o), !1;
    },
    wo
  ), [e, t]), W(() => {
    r.getEditorState().read(() => {
      const o = Ht();
      o && t(o);
    });
  }, [r, t]);
}
const nw = Ne(
  // CUSTOM: Added pr-twp at the front of the base class string to apply Platform.Bible's Tailwind
  // CSS scope isolation; all Toggle and ToggleGroupItem components inherit this via toggleVariants
  "pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted"
      },
      size: {
        default: "tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        sm: "tw:h-7 tw:min-w-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Ai = nt.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Mi({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const l = kt();
  return /* @__PURE__ */ a(
    $n.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: f(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...s,
      children: /* @__PURE__ */ a(
        Ai.Provider,
        {
          value: nt.useMemo(
            () => ({ variant: e, size: r, spacing: o, orientation: n }),
            [e, r, o, n]
          ),
          children: i
        }
      )
    }
  );
}
function ta({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = nt.useContext(Ai);
  return /* @__PURE__ */ a(
    $n.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: f(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        nw({
          variant: i.variant || r,
          size: i.size || o
        }),
        t
      ),
      ...n,
      children: e
    }
  );
}
const mn = [
  { format: "bold", icon: Ks, label: "Bold" },
  { format: "italic", icon: qs, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function iw() {
  const { activeEditor: t } = Oi(), [e, r] = I([]), o = P((n) => {
    if (ve(n) || fc(n)) {
      const i = [];
      mn.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return ow(o), /* @__PURE__ */ a(
    Mi,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: mn.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        ta,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Yn, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function sw({ onClear: t }) {
  const [e] = Te();
  W(() => {
    t && t(() => {
      e.dispatchCommand(Wn, void 0);
    });
  }, [e, t]);
}
function lw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = I(void 0);
  return /* @__PURE__ */ w("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(aw, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(iw, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Ud,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(tw, { placeholder: t }) }),
          ErrorBoundary: ad
        }
      ),
      e && /* @__PURE__ */ a(qd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(sw, { onClear: r }),
      /* @__PURE__ */ a(Wd, {})
    ] })
  ] });
}
const cw = {
  namespace: "commentEditor",
  theme: mo,
  nodes: vo,
  onError: (t) => {
    console.error(t);
  }
};
function sa({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ a(
          Jc,
          {
            initialConfig: {
              ...cw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(It, { children: [
              /* @__PURE__ */ a(lw, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                Qc,
                {
                  ignoreSelectionChange: !0,
                  onChange: (d) => {
                    r == null || r(d), o == null || o(d.toJSON());
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
function dw(t, e) {
  const r = lc(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const n = [];
  for (const i of r) if (!Pi.has(i.nodeName)) {
    const s = ji(i, t, n, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof ti && s.insertAfter(ei());
    for (const s of i) {
      const l = s.getChildren();
      for (const d of l) s.insertBefore(d);
      s.remove();
    }
  }(n), o;
}
function ww(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), o = De().getChildren();
  for (let n = 0; n < o.length; n++)
    Li(t, o[n], r, e);
  return r.innerHTML;
}
function Li(t, e, r, o = null) {
  let n = o === null || e.isSelected(o);
  const i = Se(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && aa(e) && (s = ld(o, e, "clone"));
  const l = Se(s) ? s.getChildren() : [], d = sc(t, s.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, s) : s.exportDOM(t);
  const { element: u, after: g } = c;
  if (!u) return !1;
  const m = document.createDocumentFragment();
  for (let p = 0; p < l.length; p++) {
    const h = l[p], k = Li(t, h, m, o);
    !n && Se(e) && k && e.extractWithChild(h, o, "html") && (n = !0);
  }
  if (n && !i) {
    if ((Hn(u) || Jo(u)) && u.append(m), r.append(u), g) {
      const p = g.call(s, u);
      p && (Jo(u) ? u.replaceChildren(p) : u.replaceWith(p));
    }
  } else r.append(m);
  return n;
}
const Pi = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ji(t, e, r, o, n = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Pi.has(t.nodeName)) return s;
  let l = null;
  const d = function(h, k) {
    const { nodeName: v } = h, x = k._htmlConversions.get(v.toLowerCase());
    let b = null;
    if (x !== void 0) for (const N of x) {
      const E = N(h);
      E !== null && (b === null || (b.priority || 0) <= (E.priority || 0)) && (b = E);
    }
    return b !== null ? b.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let u = null;
  if (c !== null) {
    u = c.after;
    const h = c.node;
    if (l = Array.isArray(h) ? h[h.length - 1] : h, l !== null) {
      for (const [, k] of n) if (l = k(l, i), !l) break;
      l && s.push(...Array.isArray(h) ? h : [l]);
    }
    c.forChild != null && n.set(t.nodeName, c.forChild);
  }
  const g = t.childNodes;
  let m = [];
  const p = (l == null || !cc(l)) && (l != null && ra(l) || o);
  for (let h = 0; h < g.length; h++) m.push(...ji(g[h], e, r, p, new Map(n), l));
  return u != null && (m = u(m)), Zo(t) && (m = uw(t, m, p ? () => {
    const h = new ti();
    return r.push(h), h;
  } : mr)), l == null ? m.length > 0 ? s = s.concat(m) : Zo(t) && function(h) {
    return h.nextSibling == null || h.previousSibling == null ? !1 : Qo(h.nextSibling) && Qo(h.previousSibling);
  }(t) && (s = s.concat(ei())) : Se(l) && l.append(...m), s;
}
function uw(t, e, r) {
  const o = t.style.textAlign, n = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (ra(l)) o && !l.getFormat() && l.setFormat(o), n.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && ra(e[s + 1])) {
      const d = r();
      d.setFormat(o), d.append(...i), n.push(d), i = [];
    }
  }
  return n;
}
function Vi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Bi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Bi(e.children)
  ) : !1;
}
function ae(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Bi(t.root.children) : !1;
}
function pw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = ri({
    namespace: "EditorUtils",
    theme: mo,
    nodes: vo,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = dw(e, n);
      De().clear(), dc(i);
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
function la(t) {
  const e = ri({
    namespace: "EditorUtils",
    theme: mo,
    nodes: vo,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = ww(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function No(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function le({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ a(
    ks.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const hw = Ne(
  "tw:group/button-group tw:flex tw:w-fit tw:items-stretch tw:*:focus-visible:relative tw:*:focus-visible:z-10 tw:has-[>[data-slot=button-group]]:gap-2 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "tw:[&>*:not(:first-child)]:rounded-s-none tw:[&>*:not(:first-child)]:border-s-0 tw:[&>*:not(:last-child)]:rounded-e-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!",
        vertical: "tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function _o({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        hw({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function oh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ke.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function Fi({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ a(
    le,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
const Gi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), vn = (t, e) => t[e] ?? e;
function Ui({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = vn(o, "%cancelButton_tooltip%"), l = i ?? vn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ w(_o, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ha, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(Fi, {}),
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": l,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Ge, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: l }) })
    ] }) })
  ] });
}
function ea(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Co(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const gw = {
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
function Ia(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function nh({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = I(gw), [l, d] = I(n), [c, u] = I(!1), g = F(void 0), m = F(null);
  W(() => {
    let v = !0;
    const x = m.current;
    if (!x) return;
    const b = setTimeout(() => {
      v && Vi(x);
    }, 300);
    return () => {
      v = !1, clearTimeout(b);
    };
  }, []);
  const p = P(() => {
    if (!ae(i)) return;
    const v = la(i);
    e(v, l);
  }, [i, e, l]), h = o["%commentEditor_placeholder%"] ?? "Type your comment here...", k = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: k }),
      /* @__PURE__ */ a(
        Ui,
        {
          onCancelClick: r,
          onAcceptClick: p,
          canAccept: ae(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ w(Ce, { open: c, onOpenChange: u, children: [
      /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ w(
        G,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(An, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Ia(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Ee,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), u(!1));
          },
          children: /* @__PURE__ */ a($e, { children: /* @__PURE__ */ a(Oe, { children: t.map((v) => /* @__PURE__ */ a(
            _e,
            {
              onSelect: () => {
                d(v || void 0), u(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Ia(v, o) })
            },
            v || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ a(
      "div",
      {
        ref: m,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : Co(v) && (v.preventDefault(), v.stopPropagation(), ae(i) && p());
        },
        onKeyDown: (v) => {
          No(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          sa,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: h,
            onClear: (v) => {
              g.current = v;
            }
          }
        )
      }
    )
  ] });
}
const ih = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Gi
]), sh = [
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
], fw = ["input", "select", "textarea", "button"], mw = ["button", "textbox"], Eo = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const n = F(null), [i, s] = I(void 0), [l, d] = I(void 0), c = P(
    (p) => {
      s(p);
      const h = t.find((v) => v.id === p);
      h && (e == null || e(h));
      const k = document.getElementById(p);
      k && (k.scrollIntoView({ block: "center" }), k.focus()), n.current && n.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), u = P(
    (p) => {
      const h = t.find((k) => k.id === p);
      h && (d((k) => k === p ? void 0 : p), r == null || r(h));
    },
    [r, t]
  ), g = (p) => {
    if (!p) return !1;
    const h = p.tagName.toLowerCase();
    if (p.isContentEditable || fw.includes(h)) return !0;
    const k = p.getAttribute("role");
    if (k && mw.includes(k)) return !0;
    const v = p.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, m = P(
    (p) => {
      var D;
      const h = p.target, k = (_) => _ ? document.getElementById(_) : void 0, v = k(l), x = k(i);
      if (!!(v && h && v.contains(h) && h !== v) && g(h)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !h.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const _ = t.find((y) => y.id === l);
            _ && c(_.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!v) return;
          const _ = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (_.length === 0) return;
          const y = _.findIndex((A) => A === h);
          if (y === -1) return;
          let T;
          p.key === "ArrowDown" ? T = Math.min(y + 1, _.length - 1) : T = Math.max(y - 1, 0), T !== y && (p.preventDefault(), p.stopPropagation(), (D = _[T]) == null || D.focus());
          return;
        }
        return;
      }
      const E = t.findIndex((_) => _.id === i);
      let C = E;
      switch (p.key) {
        case "ArrowDown":
          C = Math.min(E + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          C = Math.max(E - 1, 0), p.preventDefault();
          break;
        case "Home":
          C = 0, p.preventDefault();
          break;
        case "End":
          C = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          i && u(i), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const _ = x;
          if (_) {
            const y = _.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = _.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), A = y ?? T;
            if (A) {
              p.preventDefault(), A.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (g(h) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const S = t[C];
      S && c(S.id);
    },
    [t, c, i, l, u, o]
  );
  return {
    listboxRef: n,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: m,
    /** Focus an option by its ID */
    focusOption: c
  };
}, vw = Ne(
  "tw:group/badge tw:inline-flex tw:h-5 tw:w-fit tw:shrink-0 tw:items-center tw:justify-center tw:gap-1 tw:overflow-hidden tw:rounded-4xl tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-all tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:[&>svg]:pointer-events-none tw:[&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:[a]:hover:bg-secondary/80",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:[a]:hover:bg-destructive/20",
        outline: "tw:border-border tw:text-foreground tw:[a]:hover:bg-muted tw:[a]:hover:text-muted-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-muted-foreground tw:dark:hover:bg-muted/50",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        // CUSTOM: Added 'muted' variant — a muted-background badge without a visible border, for
        // low-emphasis status indicators.
        muted: "tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        // CUSTOM: Added 'blueIndicator' variant — a small solid blue dot for status indication,
        // without padding. Used as a notification or presence indicator.
        blueIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",
        // CUSTOM: Added 'mutedIndicator' variant — a small solid muted dot for status indication,
        // without padding. Used as a lower-emphasis presence or state indicator.
        mutedIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ye({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const n = r ? Ke.Root : "span";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        vw({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function bw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function lh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function ch({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        t
      ),
      ...e
    }
  );
}
function dh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-description",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function xw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
        t
      ),
      ...e
    }
  );
}
function wh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        t
      ),
      ...e
    }
  );
}
function yw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    oo.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function uh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    oo.Image,
    {
      "data-slot": "avatar-image",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        t
      ),
      ...e
    }
  );
}
function kw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    oo.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
const To = ua(void 0);
function Me() {
  const t = ro(To);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const nr = Ne("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function ce({ variant: t = "default", ...e }) {
  const r = kt(), o = nt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ a(To.Provider, { value: o, children: /* @__PURE__ */ a(Mt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Nw({
  ...t
}) {
  return /* @__PURE__ */ a(Mt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function de({
  ...t
}) {
  return /* @__PURE__ */ a(Mt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function we({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  children: o,
  ...n
}) {
  const i = kt();
  return /* @__PURE__ */ a(Mt.Portal, { children: /* @__PURE__ */ a(
    Mt.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
      align: e,
      className: f(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ a("div", { dir: i, children: o })
    }
  ) });
}
function Ki({ ...t }) {
  return /* @__PURE__ */ a(Mt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Qe({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = kt(), i = Me();
  return /* @__PURE__ */ a(
    Mt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: i.variant })
      ),
      dir: n,
      ...o
    }
  );
}
function fe({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  const i = kt(), s = Me();
  return /* @__PURE__ */ w(
    Mt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: s.variant })
      ),
      checked: r,
      dir: i,
      ...n,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ a(Mt.ItemIndicator, { children: /* @__PURE__ */ a(ar, {}) })
          }
        ),
        e
      ]
    }
  );
}
function _w({
  ...t
}) {
  return /* @__PURE__ */ a(Mt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Cw({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const n = kt(), i = Me();
  return /* @__PURE__ */ w(
    Mt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: i.variant })
      ),
      dir: n,
      ...o,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ a(Mt.ItemIndicator, { children: /* @__PURE__ */ a(ar, {}) })
          }
        ),
        e
      ]
    }
  );
}
function er({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ a(
    Mt.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: f(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Mt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: f(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Ew({ ...t }) {
  return /* @__PURE__ */ a(Mt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Tw({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Me();
  return /* @__PURE__ */ w(
    Mt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: n.variant })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(no, { className: "tw:ms-auto" })
      ]
    }
  );
}
function zw({ className: t, children: e, ...r }) {
  const o = kt();
  return /* @__PURE__ */ a(
    Mt.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a("div", { dir: o, children: e })
    }
  );
}
function bn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [d, c] = I(!1), [u, g] = I(), m = F(null);
  W(() => {
    if (!d) return;
    let E = !0;
    const C = m.current;
    if (!C) return;
    const S = setTimeout(() => {
      E && Vi(C);
    }, 300);
    return () => {
      E = !1, clearTimeout(S);
    };
  }, [d]);
  const p = P(
    (E) => {
      E && E.stopPropagation(), c(!1), g(void 0), s == null || s(!1);
    },
    [s]
  ), h = P(
    async (E) => {
      if (E && E.stopPropagation(), !u || !n) return;
      await n(
        t.id,
        la(u)
      ) && (c(!1), g(void 0), s == null || s(!1));
    },
    [u, n, t.id, s]
  ), k = U(() => {
    const E = new Date(t.date), C = Ms(
      E,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), S = E.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ze(r["%comment_dateAtTime%"], {
      date: C,
      time: S
    });
  }, [t.date, r]), v = U(() => t.user, [t.user]), x = U(
    () => t.user.split(" ").map((E) => E[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), b = U(() => Ls(t.contents), [t.contents]), N = U(() => {
    if (o && l)
      return /* @__PURE__ */ w(rt, { children: [
        /* @__PURE__ */ w(
          Qe,
          {
            onClick: (E) => {
              E.stopPropagation(), c(!0), g(pw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(Hs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          Qe,
          {
            onClick: async (E) => {
              E.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(Ws, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
  return /* @__PURE__ */ w(
    "div",
    {
      className: f("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(yw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(kw, { className: "tw:text-xs tw:font-medium", children: x }) }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: v }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: k }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(ye, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              ea(t.assignedUser, r)
            ] })
          ] }),
          d && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: m,
              onKeyDownCapture: (E) => {
                E.key === "Escape" ? (E.preventDefault(), E.stopPropagation(), p()) : Co(E) && (E.preventDefault(), E.stopPropagation(), ae(u) && h());
              },
              onKeyDown: (E) => {
                No(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
              },
              onClick: (E) => {
                E.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  sa,
                  {
                    className: f(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: u,
                    onSerializedChange: (E) => g(E)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    G,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(ha, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    G,
                    {
                      size: "icon",
                      onClick: h,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ae(u),
                      children: /* @__PURE__ */ a(io, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(rt, { children: [
            t.status === "Resolved" && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ a(
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
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: b }
              }
            )
          ] })
        ] }),
        N && /* @__PURE__ */ w(ce, { children: [
          /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Mn, {}) }) }),
          /* @__PURE__ */ a(we, { align: "end", children: N })
        ] })
      ]
    }
  );
}
const xn = {
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
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: n,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: d,
  thread: c,
  threadStatus: u,
  handleAddCommentToThread: g,
  handleUpdateComment: m,
  handleDeleteComment: p,
  handleReadStatusChange: h,
  assignableUsers: k,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: b,
  canUserEditOrDeleteCommentCallback: N,
  isRead: E = !1,
  autoReadDelay: C = 5,
  onVerseRefClick: S,
  initialAssignedUser: D
}) {
  const [_, y] = I(xn), [T, A] = I(), [$, V] = I(), L = o, [H, R] = I(!1), [X, pt] = I(!1), [K, it] = I(!1), [J, at] = I(!1), [q, st] = I(!1), [ct, dt] = I(E), [wt, Ut] = I(!1), yt = F(void 0), [Wt, Yt] = I(/* @__PURE__ */ new Map());
  W(() => {
    let O = !0;
    return (async () => {
      const mt = b ? await b(d) : !1;
      O && st(mt);
    })(), () => {
      O = !1;
    };
  }, [d, b]), W(() => {
    let O = !0;
    if (!o) {
      at(!1), Yt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = x ? await x(d) : !1;
      O && at(mt);
    })(), () => {
      O = !1;
    };
  }, [o, d, x]);
  const M = F("idle");
  W(() => {
    if (!o) {
      M.current !== "idle" && (A(void 0), V(void 0), M.current = "idle");
      return;
    }
    M.current === "idle" && (M.current = "pending"), J ? M.current === "pending" && D !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    D !== i && (A(D), M.current = "auto-populated") : M.current === "auto-populated" && (A(void 0), M.current = "pending");
  }, [o, D, J, i]);
  const Pt = U(() => e.filter((O) => !O.deleted), [e]);
  W(() => {
    let O = !0;
    if (!o || !N) {
      Yt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const mt = /* @__PURE__ */ new Map();
      await Promise.all(
        Pt.map(async (Ct) => {
          const He = await N(Ct.id);
          O && mt.set(Ct.id, He);
        })
      ), O && Yt(mt);
    })(), () => {
      O = !1;
    };
  }, [o, Pt, N]);
  const Kt = U(() => Pt[0], [Pt]), ne = F(null), Xt = F(void 0), jt = P(() => {
    var O;
    (O = Xt.current) == null || O.call(Xt), y(xn);
  }, []), Le = P(() => {
    const O = !ct;
    dt(O), Ut(!O), h == null || h(d, O);
  }, [ct, h, d]);
  W(() => {
    R(!1);
  }, [o]), W(() => {
    if (o && !ct && !wt) {
      const O = setTimeout(() => {
        dt(!0), h == null || h(d, !0);
      }, C * 1e3);
      return yt.current = O, () => clearTimeout(O);
    }
    yt.current && (clearTimeout(yt.current), yt.current = void 0);
  }, [o, ct, wt, C, d, h]);
  const Jt = U(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Zt = U(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const O = ea(i, r);
    return Ze(r["%comment_assigned_to%"], {
      assignedUser: O
    });
  }, [i, r]), B = U(() => Pt.slice(1), [Pt]), Z = U(() => B.length ?? 0, [B.length]), ut = U(() => Z > 0, [Z]), lt = U(() => H || Z <= 2 ? B : B.slice(-2), [B, Z, H]), vt = U(() => H || Z <= 2 ? 0 : Z - 2, [Z, H]), Nt = U(
    () => Z === 1 ? Jt.singleReply : Ze(Jt.multipleReplies, { count: Z }),
    [Z, Jt]
  ), _t = U(
    () => vt === 1 ? Jt.singleReply : Ze(Jt.multipleReplies, { count: vt }),
    [vt, Jt]
  );
  W(() => {
    !o && X && ut && pt(!1);
  }, [o, X, ut]);
  const bt = P(
    async (O) => {
      O && O.stopPropagation();
      const ft = ae(_) ? la(_) : void 0;
      if (T !== void 0) {
        await g({
          threadId: d,
          contents: ft,
          assignedUser: T
        }) && (V(T), ft && jt());
        return;
      }
      ft && await g({ threadId: d, contents: ft }) && jt();
    },
    [
      jt,
      _,
      g,
      T,
      d
    ]
  ), Tt = P(
    async (O) => {
      const ft = ae(_) ? la(_) : void 0, mt = O.status ? O.assignedUser : T ?? O.assignedUser, Ct = await g({
        ...O,
        contents: ft,
        assignedUser: mt
      });
      return Ct && (mt !== void 0 && V(mt), ft && jt()), Ct;
    },
    [jt, _, g, T]
  );
  if (Pt.length !== 0)
    return /* @__PURE__ */ a(
      bw,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: f(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !o },
          {
            "tw:bg-primary-foreground": !o && u !== "Resolved" && ct,
            "tw:bg-background": o && u !== "Resolved" && ct,
            "tw:bg-muted": u === "Resolved",
            "tw:bg-accent": !ct && !o && u !== "Resolved"
          }
        ),
        onClick: () => {
          l(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ w(xw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              Zt && /* @__PURE__ */ a(ye, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Zt }),
              /* @__PURE__ */ a(
                G,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (O) => {
                    O.stopPropagation(), Le();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": ct ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: ct ? /* @__PURE__ */ a(Ys, {}) : /* @__PURE__ */ a(Xs, {})
                }
              ),
              q && u !== "Resolved" && /* @__PURE__ */ a(
                G,
                {
                  variant: "ghost",
                  size: "icon",
                  className: f(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (O) => {
                    O.stopPropagation(), Tt({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ a(Ge, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ w(
              "p",
              {
                ref: ne,
                className: f(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": L
                  },
                  { "tw:whitespace-nowrap": !L }
                ),
                children: [
                  n && S ? /* @__PURE__ */ a(
                    G,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (O) => {
                        O.stopPropagation(), S(c);
                      },
                      children: n
                    }
                  ) : n,
                  /* @__PURE__ */ w("span", { className: t, children: [
                    Kt.contextBefore,
                    /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Kt.selectedText }),
                    Kt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ a(
              bn,
              {
                comment: Kt,
                localizedStrings: r,
                isThreadExpanded: o,
                threadStatus: u,
                handleAddCommentToThread: Tt,
                handleUpdateComment: m,
                handleDeleteComment: p,
                onEditingChange: pt,
                canEditOrDelete: (!X && Wt.get(Kt.id)) ?? !1,
                canUserResolveThread: q
              }
            )
          ] }),
          /* @__PURE__ */ w(rt, { children: [
            ut && !o && /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(le, {}) }),
              /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Nt })
            ] }),
            !o && ae(_) && /* @__PURE__ */ a(
              sa,
              {
                editorSerializedState: _,
                onSerializedChange: (O) => y(O),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ w(rt, { children: [
              vt > 0 && /* @__PURE__ */ w(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (O) => {
                    O.stopPropagation(), R(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (O) => {
                    (O.key === "Enter" || O.key === " ") && (O.preventDefault(), O.stopPropagation(), R(!0));
                  },
                  children: [
                    /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(le, {}) }),
                    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: _t }),
                      H ? /* @__PURE__ */ a(Js, {}) : /* @__PURE__ */ a(tr, {})
                    ] })
                  ]
                }
              ),
              lt.map((O) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                bn,
                {
                  comment: O,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: m,
                  handleDeleteComment: p,
                  onEditingChange: pt,
                  canEditOrDelete: (!X && Wt.get(O.id)) ?? !1
                }
              ) }, O.id)),
              v !== !1 && (!X || ae(_)) && /* @__PURE__ */ w(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (O) => O.stopPropagation(),
                  onKeyDownCapture: (O) => {
                    Co(O) && (O.preventDefault(), O.stopPropagation(), (ae(_) || T !== void 0 && T !== $) && bt());
                  },
                  onKeyDown: (O) => {
                    No(O), (O.key === "Enter" || O.key === " ") && O.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ a(
                      sa,
                      {
                        editorSerializedState: _,
                        onSerializedChange: (O) => y(O),
                        placeholder: u === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (O) => {
                          Xt.current = O;
                        }
                      }
                    ),
                    /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      T !== void 0 && (ae(_) || T !== $) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ze(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: ea(
                            T,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ w(Ce, { open: K, onOpenChange: it, children: [
                        /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ a(
                          G,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !J || !k || k.length === 0 || !k.includes(s),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ a(An, {})
                          }
                        ) }),
                        /* @__PURE__ */ a(
                          Ee,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (O) => {
                              O.key === "Escape" && (O.stopPropagation(), it(!1));
                            },
                            children: /* @__PURE__ */ a($e, { children: /* @__PURE__ */ a(Oe, { children: k == null ? void 0 : k.map((O) => /* @__PURE__ */ a(
                              _e,
                              {
                                onSelect: () => {
                                  A(O !== i ? O : void 0), M.current = "user-selected", V(void 0), it(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: ea(O, r) })
                              },
                              O || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        G,
                        {
                          size: "icon",
                          onClick: bt,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !ae(_) && (T === void 0 || T === $),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ a(io, {})
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
function hh({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: c,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: g,
  canUserResolveThreadCallback: m,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: h,
  onSelectedThreadChange: k,
  onVerseRefClick: v
}) {
  const [x, b] = I(/* @__PURE__ */ new Set()), [N, E] = I(), [C, S] = I(), D = P(
    async (R) => {
      const X = await i(R);
      return X !== void 0 && R.assignedUser !== void 0 && R.assignedUser !== "" && S(R.assignedUser), X;
    },
    [i]
  );
  W(() => {
    h && (b((R) => new Set(R).add(h)), E(h));
  }, [h]);
  const _ = r.filter(
    (R) => R.comments.some((X) => !X.deleted)
  ), y = _.map((R) => ({ id: R.id })), T = P(
    (R) => {
      b((X) => new Set(X).add(R.id)), E(R.id), k == null || k(R.id);
    },
    [k]
  ), A = P(
    (R) => {
      const X = x.has(R);
      b((pt) => {
        const K = new Set(pt);
        return K.has(R) ? K.delete(R) : K.add(R), K;
      }), E(R), k == null || k(X ? void 0 : R);
    },
    [x, k]
  ), { listboxRef: $, activeId: V, handleKeyDown: L } = Eo({
    options: y,
    onOptionSelect: T
  }), H = P(
    (R) => {
      R.key === "Escape" ? (N && x.has(N) && (b((X) => {
        const pt = new Set(X);
        return pt.delete(N), pt;
      }), E(void 0), k == null || k(void 0)), R.preventDefault(), R.stopPropagation()) : L(R);
    },
    [N, x, L, k]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: $,
      "aria-activedescendant": V ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: H,
      children: _.map((R) => /* @__PURE__ */ a(
        "div",
        {
          className: f({
            "tw:opacity-60": R.status === "Resolved"
          }),
          children: /* @__PURE__ */ a(
            Sw,
            {
              classNameForVerseText: e,
              comments: R.comments,
              localizedStrings: n,
              verseRef: R.verseRef,
              handleSelectThread: A,
              threadId: R.id,
              thread: R,
              isRead: R.isRead,
              isSelected: x.has(R.id),
              currentUser: o,
              assignedUser: R.assignedUser,
              threadStatus: R.status,
              handleAddCommentToThread: D,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: u,
              canUserAssignThreadCallback: g,
              canUserResolveThreadCallback: m,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: v,
              initialAssignedUser: C
            }
          )
        },
        R.id
      ))
    }
  );
}
function Iw({ table: t }) {
  return /* @__PURE__ */ w(ce, { children: [
    /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ w(G, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Zs, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(we, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(er, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Ue, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        fe,
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
function pr({ ...t }) {
  return /* @__PURE__ */ a(Gt.Root, { "data-slot": "select", ...t });
}
function Dw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Gt.Group,
    {
      "data-slot": "select-group",
      className: f("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function hr({ ...t }) {
  return /* @__PURE__ */ a(Gt.Value, { "data-slot": "select-value", ...t });
}
function gr({ className: t, size: e = "default", children: r, ...o }) {
  const n = kt();
  return /* @__PURE__ */ w(
    Gt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: f(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Gt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Ts, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function fr({
  className: t,
  children: e,
  // CUSTOM: Restored 'popper' as the default position (was changed to 'item-aligned' by the shadcn
  // upgrade). In 'popper' mode Radix exposes --radix-select-trigger-width, which is required for
  // min-w-(--radix-select-trigger-width) to work. In 'item-aligned' mode that variable is not set,
  // making the popup width unconstrained. Existing callers all expected popper (dropdown) behavior.
  position: r = "popper",
  align: o = "center",
  ...n
}) {
  const i = kt();
  return /* @__PURE__ */ a(Gt.Portal, { children: /* @__PURE__ */ w(
    Gt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: f(
        "pr-twp tw:relative tw:z-50 tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      align: o,
      ...n,
      children: [
        /* @__PURE__ */ a(Rw, {}),
        /* @__PURE__ */ a(
          Gt.Viewport,
          {
            "data-position": r,
            className: f(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a($w, {})
      ]
    }
  ) });
}
function gh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Gt.Label,
    {
      "data-slot": "select-label",
      className: f("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ie({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ w(
    Gt.Item,
    {
      "data-slot": "select-item",
      className: f(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Gt.ItemIndicator, { children: /* @__PURE__ */ a(ar, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Gt.ItemText, { children: e })
      ]
    }
  );
}
function fh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Gt.Separator,
    {
      "data-slot": "select-separator",
      className: f(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Rw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Gt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Es, {})
    }
  );
}
function $w({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Gt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Cs, {})
    }
  );
}
function Ow({ table: t }) {
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ a("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ w(
        pr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(hr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(fr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ie, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ w(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(Qs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(tl, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(el, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(rl, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const yn = `
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
function Aw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Rr(t, e) {
  const r = e ? `${yn}, ${e}` : yn;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Aw(o)
  );
}
function zo({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const n = nt.useRef(null);
  nt.useEffect(() => {
    typeof r == "function" ? r(n.current) : r && "current" in r && (r.current = n.current);
  }, [r]), nt.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        Rr(s, '[tabindex]:not([tabindex="-1"])').forEach((u) => {
          u.setAttribute("tabindex", "-1");
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
    const { current: l } = n;
    if (l) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), Rr(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ a(
      "div",
      {
        "data-slot": "table-container",
        className: f("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ a(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
            onKeyDown: i,
            className: f(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...o
          }
        )
      }
    )
  );
}
function So({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: f(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...r
    }
  );
}
function Io({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: f("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function mh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: f(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function Mw(t) {
  nt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const n = t.current ? Rr(t.current) : [], i = n.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < n.length && n[s].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function Lw(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Pw(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Be({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: n,
  ...i
}) {
  const s = nt.useRef(null);
  nt.useEffect(() => {
    typeof n == "function" ? n(s.current) : n && "current" in n && (n.current = s.current);
  }, [n]), Mw(s);
  const l = nt.useMemo(
    () => s.current ? Rr(s.current) : [],
    [s]
  ), d = nt.useCallback(
    (u) => {
      const { current: g } = s;
      if (!g || !g.parentElement) return;
      const m = g.closest("table"), p = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Rr(m).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], h = p.indexOf(g), k = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (u.key === "ArrowDown" || u.key === "ArrowUp")
        u.preventDefault(), Pw(p, h, u.key);
      else if (u.key === "ArrowLeft" || u.key === "ArrowRight")
        u.preventDefault(), Lw(l, k, u.key);
      else if (u.key === "Escape") {
        u.preventDefault();
        const v = g.closest("table");
        v && v.focus();
      }
      e == null || e(u);
    },
    [s, l, e]
  ), c = nt.useCallback(
    (u) => {
      o && (r == null || r(u));
    },
    [o, r]
  );
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      ref: s,
      tabIndex: -1,
      onKeyDown: d,
      onFocus: c,
      className: f(
        "tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted",
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        "tw:outline-hidden",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      ...i
    }
  );
}
function ca({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: f(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function wr({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: f(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function vh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: f("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function $r({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "skeleton",
      className: f("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function jw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: d = !1,
  noResultsMessage: c
}) {
  var S;
  const [u, g] = I([]), [m, p] = I([]), [h, k] = I({}), [v, x] = I({}), b = U(() => e ?? [], [e]), N = ai({
    data: b,
    columns: t,
    getCoreRowModel: ni(),
    ...r && { getPaginationRowModel: vc() },
    onSortingChange: g,
    getSortedRowModel: oi(),
    onColumnFiltersChange: p,
    getFilteredRowModel: mc(),
    onColumnVisibilityChange: k,
    onRowSelectionChange: x,
    state: {
      sorting: u,
      columnFilters: m,
      columnVisibility: h,
      rowSelection: v
    }
  }), E = N.getVisibleFlatColumns();
  let C;
  return d ? C = Array.from({ length: 10 }).map((y, T) => `skeleton-row-${T}`).map((y) => /* @__PURE__ */ a(Be, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(wr, { colSpan: E.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a($r, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, y)) : ((S = N.getRowModel().rows) == null ? void 0 : S.length) > 0 ? C = N.getRowModel().rows.map((D) => /* @__PURE__ */ a(
    Be,
    {
      onClick: () => s(D, N),
      "data-state": D.getIsSelected() && "selected",
      children: D.getVisibleCells().map((_) => /* @__PURE__ */ a(wr, { children: zr(_.column.columnDef.cell, _.getContext()) }, _.id))
    },
    D.id
  )) : C = /* @__PURE__ */ a(Be, { children: /* @__PURE__ */ a(wr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    n && /* @__PURE__ */ a(Iw, { table: N }),
    /* @__PURE__ */ w(zo, { stickyHeader: i, children: [
      /* @__PURE__ */ a(So, { stickyHeader: i, children: N.getHeaderGroups().map((D) => /* @__PURE__ */ a(Be, { children: D.headers.map((_) => /* @__PURE__ */ a(ca, { className: "tw:p-0", children: _.isPlaceholder ? void 0 : zr(_.column.columnDef.header, _.getContext()) }, _.id)) }, D.id)) }),
      /* @__PURE__ */ a(Io, { children: C })
    ] }),
    r && /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.previousPage(),
          disabled: !N.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.nextPage(),
          disabled: !N.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Ow, { table: N })
  ] });
}
function Vw(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = e.get(r.projectId), n = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === r.scrollGroupId) || o.push(n) : e.set(r.projectId, [n]);
  }), e.forEach((r) => r.sort((o, n) => o.scrollGroupId - n.scrollGroupId)), e;
}
function kn(t, e, r) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === r);
}
function Da(t) {
  const e = Vw(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((i) => {
      const s = e.get(i.id) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        language: i.language,
        languageCode: i.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: s.map((l) => l.scrollGroupId),
        isSelected: n === i.id,
        isMuted: s.length === 0,
        isBoundButClosed: !1,
        isDisabled: i.isDisabled === !0,
        disabledReason: i.disabledReason
      };
    });
  }
  let r = [];
  t.mode === "project-multi" ? r = t.selection.pairs : t.selection.projectId !== void 0 && (r = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const o = [];
  return t.projects.forEach((n) => {
    const i = e.get(n.id);
    if (!i || i.length === 0) {
      o.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: kn(r, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason
      });
      return;
    }
    i.forEach((s) => {
      o.push({
        rowKey: `tab:${n.id}:${s.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: s.scrollGroupId,
        scrollGroupScrRefLabel: s.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: kn(r, n.id, s.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason
      });
    });
  }), r.forEach((n) => {
    if (n.scrollGroupId === void 0 || o.some((s) => s.projectId === n.projectId && s.scrollGroupId === n.scrollGroupId))
      return;
    const i = t.projects.find((s) => s.id === n.projectId);
    i && o.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      language: i.language,
      languageCode: i.languageCode,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason
    });
  }), o;
}
function Nn(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Ra(t, e) {
  if (t.isSelected !== e.isSelected) return t.isSelected ? -1 : 1;
  const r = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - n;
}
function Bw(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Ra) }];
  const r = t.filter(Nn).sort(Ra), o = t.filter((i) => !Nn(i)).sort(Ra);
  if (r.length === 0)
    return [{ kind: "flat", rows: o }];
  const n = [{ kind: "openTabs", rows: r }];
  return o.length > 0 && n.push({ kind: "other", rows: o }), n;
}
const Fw = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group",
  filterSectionLabel: "Filter",
  filterGroupByOpenTabs: "By open tabs",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function Gw(t) {
  return { ...Fw, ...t };
}
function Or(t) {
  return Xr[Pa(t)] ?? String(t);
}
const Uw = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Kw({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Or(t);
  return e ? /* @__PURE__ */ a(
    ye,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Uw,
      children: r
    }
  ) : /* @__PURE__ */ a(ye, { variant: "secondary", children: r });
}
function qw({ row: t, mode: e, strings: r, onClick: o, onOpen: n }) {
  const [i, s] = I(!1), l = F(null), d = !!(t.language || t.languageCode), c = d || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, u = P(() => {
    if (c) {
      s(!0);
      return;
    }
    const v = l.current;
    v && v.scrollWidth > v.clientWidth && s(!0);
  }, [c]), g = /* @__PURE__ */ a(Ge, { className: f("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let m;
  e === "project" ? t.openGroups.length > 0 && (m = /* @__PURE__ */ a("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((v) => /* @__PURE__ */ a(ye, { variant: "secondary", children: Or(v) }, v)) })) : t.scrollGroupId !== void 0 && (m = /* @__PURE__ */ w("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Kw,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ w(
      G,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (v) => {
          v.stopPropagation(), n(t);
        },
        onMouseDown: (v) => v.stopPropagation(),
        "aria-label": r.openButtonLabel,
        title: r.openButtonLabel,
        children: [
          /* @__PURE__ */ a(On, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const p = /* @__PURE__ */ w(
    _e,
    {
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: u,
      onPointerLeave: () => s(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: g }),
        /* @__PURE__ */ w("span", { ref: l, className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: [
          /* @__PURE__ */ a("span", { children: t.shortName }),
          /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
            " • ",
            t.fullName
          ] })
        ] }),
        m
      ]
    }
  ), h = t.scrollGroupId !== void 0 ? Or(t.scrollGroupId) : void 0, k = t.isBoundButClosed && h ? r.boundButClosedTooltip.replace("{group}", h) : void 0;
  return /* @__PURE__ */ w(Dt, { open: i, delayDuration: 400, children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: p }),
    /* @__PURE__ */ w(
      $t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: po },
        children: [
          /* @__PURE__ */ a("div", { className: "tw:font-semibold", children: t.fullName }),
          d && /* @__PURE__ */ w("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && h && /* @__PURE__ */ w("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
              " (",
              h,
              ")"
            ] })
          ] }),
          k && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: k }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Hw({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: o,
  strings: n
}) {
  const i = !!r;
  return /* @__PURE__ */ w(ce, { children: [
    /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ a(
      G,
      {
        variant: "ghost",
        size: "sm",
        className: f(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": n.filterAriaLabel,
        "aria-pressed": i,
        title: n.filterAriaLabel,
        onMouseDown: (s) => s.preventDefault(),
        children: /* @__PURE__ */ a(Ln, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ w(we, { align: "end", className: "tw:w-56", style: { zIndex: po }, children: [
      /* @__PURE__ */ a(er, { children: n.groupSectionLabel }),
      /* @__PURE__ */ a(
        fe,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (s) => s.preventDefault(),
          children: n.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ w(rt, { children: [
        /* @__PURE__ */ a(Ue, {}),
        /* @__PURE__ */ a(er, { children: n.filterSectionLabel }),
        /* @__PURE__ */ a(
          fe,
          {
            checked: !!r,
            onCheckedChange: o,
            onSelect: (s) => s.preventDefault(),
            children: n.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Ww(t) {
  const [e, r] = I(!1), [o, n] = I(""), [i, s] = I(t.defaultGroupByOpenTabs ?? !0), [l, d] = I(!1), c = Gw(t.localizedStrings), u = U(() => t.mode === "project" ? Da({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Da({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Da({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), g = U(() => {
    const C = o.trim().toLowerCase();
    let S = u;
    return C && (S = S.filter(
      (D) => D.shortName.toLowerCase().includes(C) || D.fullName.toLowerCase().includes(C) || (D.language ?? "").toLowerCase().includes(C) || (D.languageCode ?? "").toLowerCase().includes(C)
    )), t.mode === "project-multi" && l && (S = S.filter((D) => D.isSelected)), S;
  }, [u, o, t.mode, l]), m = U(
    () => Bw(g, i),
    [g, i]
  ), p = U(() => {
    if (t.mode !== "project-multi") return [];
    const C = [];
    return t.projects.forEach((S) => {
      const D = t.openTabs.filter((y) => y.projectId === S.id);
      if (D.length === 0) {
        C.push({ projectId: S.id });
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      D.forEach((y) => {
        _.has(y.scrollGroupId) || (_.add(y.scrollGroupId), C.push({ projectId: S.id, scrollGroupId: y.scrollGroupId }));
      });
    }), C;
  }, [t.mode, t.projects, t.openTabs]), h = (C) => {
    if (C.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(C.projectId, C.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(C.projectId, C.scrollGroupId);
    }
  }, k = (C) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: C.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const S = t.selection.pairs, D = (y) => y.projectId === C.projectId && y.scrollGroupId === C.scrollGroupId, _ = S.some(D) ? S.filter((y) => !D(y)) : [...S, { projectId: C.projectId, scrollGroupId: C.scrollGroupId }];
        t.onChangeSelection({ pairs: _ }), _.length === 0 && l && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (C.isBoundButClosed && C.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(C.projectId, C.scrollGroupId), r(!1);
          return;
        }
        if (C.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: C.projectId,
            scrollGroupId: C.scrollGroupId
          }), r(!1);
          return;
        }
        const S = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: C.projectId, scrollGroupId: S }), t.onOpenProjectInGroup(C.projectId, S), r(!1);
      }
    }
  }, v = () => {
    if (t.mode !== "project-multi") return;
    const C = t.selection.pairs, S = new Set(C.map((_) => `${_.projectId}:${_.scrollGroupId ?? ""}`)), D = [...C];
    p.forEach((_) => {
      const y = `${_.projectId}:${_.scrollGroupId ?? ""}`;
      S.has(y) || (S.add(y), D.push(_));
    }), t.onChangeSelection({ pairs: D });
  }, x = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, b = U(() => {
    switch (t.mode) {
      case "project": {
        const C = t.projects.find((D) => D.id === t.selection.projectId), S = C ? C.shortName : t.buttonPlaceholder ?? "";
        return { node: S, title: S };
      }
      case "project-multi": {
        const { pairs: C } = t.selection;
        if (C.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const S = [];
        if (C.forEach((y) => {
          const T = t.projects.find((A) => A.id === y.projectId);
          T && S.push({ project: T, scrollGroupId: y.scrollGroupId });
        }), S.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        if (t.getSelectedText) {
          const y = t.getSelectedText(S);
          return { node: y, title: y };
        }
        const D = S.map(
          ({ project: y, scrollGroupId: T }) => T === void 0 ? y.shortName : `${y.shortName} (${Or(T)})`
        ).join(", ");
        if (S.length === 1) return { node: D, title: D };
        const _ = S.length.toString();
        return {
          node: /* @__PURE__ */ w(rt, { children: [
            /* @__PURE__ */ a(ye, { variant: "muted", className: "tw:shrink-0", children: _ }),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: D })
          ] }),
          title: `${_} ${D}`
        };
      }
      case "projectScrollGroup": {
        const C = t.projects.find((_) => _.id === t.selection.projectId);
        if (!C) {
          const _ = t.buttonPlaceholder ?? "";
          return { node: _, title: _ };
        }
        const S = t.selection.scrollGroupId;
        if (S === void 0)
          return { node: C.shortName, title: C.shortName };
        const D = `${C.shortName} · ${Or(S)}`;
        return { node: D, title: D };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), N = t.mode === "project-multi" ? /* @__PURE__ */ a(so, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }), E = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? h : void 0;
  return /* @__PURE__ */ w(Ce, { open: e, onOpenChange: r, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ w(
      G,
      {
        variant: t.buttonVariant ?? "outline",
        role: "combobox",
        "aria-expanded": e,
        "aria-label": t.ariaLabel,
        disabled: t.isDisabled ?? !1,
        className: f(
          "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
          t.buttonClassName
        ),
        children: [
          /* @__PURE__ */ a("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof b.node == "string" ? /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: b.node }) : b.node }),
          N
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ee,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: f("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ a(It, { delayDuration: 400, children: /* @__PURE__ */ w($e, { shouldFilter: !1, children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ a("div", { className: "tw:flex-1", children: /* @__PURE__ */ a(
              vr,
              {
                value: o,
                onValueChange: n,
                placeholder: c.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            /* @__PURE__ */ a(
              Hw,
              {
                groupByOpenTabs: i,
                onChangeGroupByOpenTabs: s,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: c
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: v, children: `${c.selectAll} (${p.length.toString()})` }),
            /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: x, children: `${c.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ w(Oe, { children: [
            /* @__PURE__ */ a(Lr, { children: t.commandEmptyMessage ?? "No projects found" }),
            m.map((C, S) => /* @__PURE__ */ w(ao, { children: [
              /* @__PURE__ */ a(be, { heading: Yw(C, c), children: C.rows.map((D) => /* @__PURE__ */ a(
                qw,
                {
                  row: D,
                  mode: t.mode,
                  strings: c,
                  onClick: k,
                  onOpen: E
                },
                D.rowKey
              )) }),
              S < m.length - 1 && /* @__PURE__ */ a(ho, {})
            ] }, C.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function Yw(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "flat":
    default:
      return;
  }
}
function bh({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = U(
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
  return /* @__PURE__ */ a(
    "div",
    {
      id: t,
      className: f(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(yc, { options: i, children: e })
    }
  );
}
const Xw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), _n = (t, e) => t[e] ?? e;
function Jw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = _n(r, "%webView_error_dump_header%"), i = _n(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ w(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ w("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ w("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ a("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: n }),
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ a(G, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(Pn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const xh = Object.freeze([
  ...Xw,
  "%webView_error_dump_copied_message%"
]);
function yh({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, l] = I(!1), d = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ w(Ce, { onOpenChange: (u) => {
    u || l(!1);
  }, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: o }),
    /* @__PURE__ */ w(Ee, { id: i, className: f("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(zt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        Jw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Zw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Zw || {});
function kh({ id: t, label: e, groups: r }) {
  const [o, n] = I(
    Object.fromEntries(
      r.map(
        (c, u) => c.itemType === 0 ? [u, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = I({}), l = (c, u) => {
    const g = !o[c][u];
    n((p) => (p[c][u] = g, { ...p }));
    const m = r[c].items[u];
    m.onUpdate(m.id, g);
  }, d = (c, u) => {
    s((m) => (m[c] = u, { ...m }));
    const g = r[c].items.find((m) => m.id === u);
    g ? g.onUpdate(u) : console.error(`Could not find dropdown radio item with id '${u}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ w(ce, { children: [
    /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ w(G, { variant: "default", children: [
      /* @__PURE__ */ a(Ln, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(tr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(we, { children: r.map((c, u) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ a(er, { children: c.label }),
      /* @__PURE__ */ a(Ki, { children: c.itemType === 0 ? /* @__PURE__ */ a(rt, { children: c.items.map((g, m) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        fe,
        {
          checked: o[u][m],
          onCheckedChange: () => l(u, m),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ a(
        _w,
        {
          value: i[u],
          onValueChange: (g) => d(u, g),
          children: c.items.map((g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Cw, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ a(Ue, {})
    ] }, c.label)) })
  ] }) });
}
function Nh({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const d = new Ps("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((u, g) => u + g, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex", children: /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ a(al, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((u) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: u.toUpperCase() }, u)) }),
          o.length > 3 && /* @__PURE__ */ w(
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
        (n || s) && /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ w(
            G,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(ol, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ w(
            G,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(nl, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Qw({ id: t, versionHistory: e }) {
  const [r, o] = I(!1), n = /* @__PURE__ */ new Date();
  function i(l) {
    const d = new Date(l), c = new Date(n.getTime() - d.getTime()), u = c.getUTCFullYear() - 1970, g = c.getUTCMonth(), m = c.getUTCDate() - 1;
    let p = "";
    return u > 0 ? p = `${u.toString()} year${u === 1 ? "" : "s"} ago` : g > 0 ? p = `${g.toString()} month${g === 1 ? "" : "s"} ago` : m === 0 ? p = "today" : p = `${m.toString()} day${m === 1 ? "" : "s"} ago`, p;
  }
  const s = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ w("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ w("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ w("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ a("div", { children: i(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ a(
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
function _h({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = U(() => js(r), [r]), d = ((c) => {
    const u = new Intl.DisplayNames(Vs(), { type: "language" });
    return c.map((g) => u.of(g));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Qw, { versionHistory: n }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ w("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ w("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function tu({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  hasToggleAllFeature: n = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: c = void 0,
  onOpenChange: u = void 0,
  isDisabled: g = !1,
  sortSelected: m = !1,
  icon: p = void 0,
  className: h = void 0,
  variant: k = "ghost",
  id: v
}) {
  const [x, b] = I(!1), N = P(
    (T) => {
      var $;
      const A = ($ = t.find((V) => V.label === T)) == null ? void 0 : $.value;
      A && r(
        e.includes(A) ? e.filter((V) => V !== A) : [...e, A]
      );
    },
    [t, e, r]
  ), E = () => d || o, C = U(() => {
    if (!m) return t;
    const T = t.filter(($) => $.starred).sort(($, V) => $.label.localeCompare(V.label)), A = t.filter(($) => !$.starred).sort(($, V) => {
      const L = e.includes($.value), H = e.includes(V.value);
      return L && !H ? -1 : !L && H ? 1 : $.label.localeCompare(V.label);
    });
    return [...T, ...A];
  }, [t, e, m]), S = () => {
    r(t.map((T) => T.value));
  }, D = () => {
    r([]);
  }, _ = c ?? x;
  return /* @__PURE__ */ a("div", { id: v, className: h, children: /* @__PURE__ */ w(Ce, { open: _, onOpenChange: u ?? b, children: [
    /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ w(
      G,
      {
        variant: k,
        role: "combobox",
        "aria-expanded": _,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: g,
        children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ a("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ a("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ a(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: E()
              }
            )
          ] }),
          /* @__PURE__ */ a(so, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(Ee, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ w($e, { children: [
      /* @__PURE__ */ a(vr, { placeholder: `Search ${o.toLowerCase()}...` }),
      n && /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: S, children: i }),
        /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: D, children: s })
      ] }),
      /* @__PURE__ */ w(Oe, { children: [
        /* @__PURE__ */ a(Lr, { children: l }),
        /* @__PURE__ */ a(be, { children: C.map((T) => /* @__PURE__ */ w(
          _e,
          {
            value: T.label,
            onSelect: N,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ a("div", { className: "w-4", children: /* @__PURE__ */ a(
                Ge,
                {
                  className: f(
                    "tw:h-4 tw:w-4",
                    e.includes(T.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ a(il, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ a("div", { className: "tw:flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ a("div", { className: "tw:text-end tw:text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Ch({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: d,
  className: c,
  badgesPlaceholder: u,
  id: g
}) {
  return /* @__PURE__ */ w("div", { id: g, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      tu,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: d,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((m) => {
      var p;
      return /* @__PURE__ */ w(ye, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          G,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((h) => h !== m)),
            children: /* @__PURE__ */ a(ha, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((h) => h.value === m)) == null ? void 0 : p.label
      ] }, m);
    }) }) : /* @__PURE__ */ a(zt, { children: u })
  ] });
}
function Cn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "kbd",
    {
      "data-slot": "kbd",
      className: f(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
const eu = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), En = (t, e) => t[e] ?? e;
function ru({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = U(() => /Macintosh/i.test(navigator.userAgent), []), c = En(n, "%undoButton_tooltip%"), u = En(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ w(_o, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": c,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ a(sl, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ w("p", { children: [
        c,
        i && /* @__PURE__ */ w(rt, { children: [
          " ",
          /* @__PURE__ */ a(Cn, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ a(Fi, {}),
    e && /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": u,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ a(ll, {})
        }
      ) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ w("p", { children: [
        u,
        i && /* @__PURE__ */ w(rt, { children: [
          " ",
          /* @__PURE__ */ a(Cn, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function au({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = F(null);
  return W(() => {
    var d;
    const i = /Macintosh/i.test(navigator.userAgent), s = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (c) => {
      var g, m, p, h;
      if (!s || document.activeElement !== s) return;
      const u = c.key.toLowerCase();
      if (i) {
        if (!c.metaKey) return;
        !c.shiftKey && u === "z" ? (c.preventDefault(), r && ((g = e.current) == null || g.undo())) : c.shiftKey && u === "z" && (c.preventDefault(), o && ((m = e.current) == null || m.redo()));
      } else {
        if (!c.ctrlKey) return;
        !c.shiftKey && u === "z" ? (c.preventDefault(), r && ((p = e.current) == null || p.undo())) : (u === "y" || c.shiftKey && u === "z") && (c.preventDefault(), o && ((h = e.current) == null || h.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const ou = (t, e, r) => t === "generated" ? /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function nu({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = F(null), s = F(null), l = F(!1), [d, c] = I(t), [u, g] = I(r), [m, p] = I(!1);
  W(() => {
    c(t);
  }, [t]), W(() => {
    u !== r && g(r);
  }, [r]);
  const h = (v) => {
    l.current = !1, p(v), v || (d !== "custom" || u ? (e(d), o(u)) : (c(t), g(r)));
  }, k = (v) => {
    var x, b, N, E;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((x = i.current) == null || x.focus(), l.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((b = s.current) == null || b.focus(), l.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((N = i.current) == null ? void 0 : N.selectionStart) === 0 && ((E = s.current) == null || E.focus(), l.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && h(!1);
  };
  return /* @__PURE__ */ w(ce, { open: m, onOpenChange: h, children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "outline", className: "tw:h-6", children: ou(t, n, r) }) }) }),
      /* @__PURE__ */ a($t, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      we,
      {
        style: { zIndex: ii },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: k,
        onMouseMove: () => {
          var v;
          l.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ a(er, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Ue, {}),
          /* @__PURE__ */ a(
            fe,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ga })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            fe,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ua })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            fe,
            {
              ref: s,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var x;
                v.stopPropagation(), l.current = !0, (x = i.current) == null || x.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Mr,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: u,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => g(v.target.value)
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
const iu = (t, e) => t === "f" ? /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a(Vn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a(Bn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(rt, { children: [
  /* @__PURE__ */ a(jn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), su = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ze(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function lu({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(ce, { children: [
    /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "outline", className: "tw:h-6", children: iu(t, r) }) }) }),
      /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: su(t, r) }) })
    ] }) }),
    /* @__PURE__ */ w(we, { style: { zIndex: ii }, children: [
      /* @__PURE__ */ a(er, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Ue, {}),
      /* @__PURE__ */ w(
        fe,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(jn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        fe,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Vn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        fe,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Bn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const cu = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function du({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? cl, { className: e, size: 16 });
}
function Tn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ w(
    _e,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(du, { icon: t.icon }) }) }),
        /* @__PURE__ */ w("div", { children: [
          /* @__PURE__ */ a("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Pc, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function wu({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [o, n] = I(""), [i, s] = U(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const d = e.filter(
      (u) => {
        var g;
        return (g = u.marker) == null ? void 0 : g.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (u) => u.title.toLowerCase().includes(l) && !d.includes(u)
    );
    return [d, c];
  }, [o, e]);
  return /* @__PURE__ */ w($e, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      vr,
      {
        className: "marker-menu-search",
        ref: r,
        value: o,
        onValueChange: (l) => n(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(Oe, { children: [
      /* @__PURE__ */ a(Lr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(be, { children: i.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          Tn,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ w(rt, { children: [
        i.length > 0 && /* @__PURE__ */ a(ho, { alwaysRender: !0 }),
        /* @__PURE__ */ a(be, { children: s.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            Tn,
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
function uu(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = Jr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[Jr[l].description] ?? Jr[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function pu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function hu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const gu = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Eh({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: c
}) {
  const u = F(null), g = F(null), m = F(null), p = F(null);
  ee(() => {
    if (!p.current) return;
    const { width: B } = p.current.getBoundingClientRect();
    B > 0 && (p.current.style.width = `${B}px`);
  }, []);
  const [h, k] = I("generated"), [v, x] = I("generated"), [b, N] = I("*"), [E, C] = I("*"), [S, D] = I("f"), [_, y] = I(!1), [T, A] = I(!0), [$, V] = I(!1), L = F(!1), H = F(""), [R, X] = I(!1), [pt, K] = I(), [it, J] = I(), [at, q] = I(), [st, ct] = I(), dt = F(null), wt = U(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? kc(), noteMode: "expanded" }
    }),
    [s, l]
  ), Ut = U(
    () => uu(
      u,
      () => X(!1),
      d,
      st
    ),
    [d, st]
  );
  W(() => {
    var B;
    R || (B = u.current) == null || B.focus();
  }, [S, R]), W(() => {
    var ut, lt;
    let B;
    L.current = !1, A(!0);
    const Z = e == null ? void 0 : e.at(0);
    if (Z && Kr("note", Z)) {
      const vt = (ut = Z.insert.note) == null ? void 0 : ut.caller;
      let Nt = "custom";
      vt === Ga ? Nt = "generated" : vt === Ua ? Nt = "hidden" : vt && (N(vt), C(vt)), k(Nt), x(Nt), D(((lt = Z.insert.note) == null ? void 0 : lt.style) ?? "f"), B = setTimeout(() => {
        var _t;
        (_t = u.current) == null || _t.applyUpdate([Z]);
      }, 0);
    }
    return () => {
      B && clearTimeout(B);
    };
  }, [e, i]);
  const yt = P(
    (B, Z, ut = !1) => {
      var vt, Nt, _t;
      const lt = (Nt = (vt = u.current) == null ? void 0 : vt.getNoteOps(0)) == null ? void 0 : Nt.at(0);
      if (lt && Kr("note", lt)) {
        if (lt.insert.note) {
          let bt;
          B === "custom" ? bt = Z : B === "generated" ? bt = Ga : bt = Ua, lt.insert.note.caller = bt;
        }
        r == null || r([lt]), ut && c && i && ((_t = c.current) == null || _t.replaceEmbedUpdate(i, [lt]));
      }
    },
    [i, r, c]
  ), Wt = P(() => {
    yt(h, b, !0), o();
  }, [h, b, o, yt]), Yt = F(Wt);
  ee(() => {
    Yt.current = Wt;
  });
  const M = F({ book: n.book, chapterNum: n.chapterNum });
  ee(() => {
    (M.current.book !== n.book || M.current.chapterNum !== n.chapterNum) && (M.current = { book: n.book, chapterNum: n.chapterNum }, Yt.current());
  }, [n.book, n.chapterNum]);
  const Pt = () => {
    var Z;
    const B = (Z = g.current) == null ? void 0 : Z.getElementsByClassName("editor-input")[0];
    B != null && B.textContent && navigator.clipboard.writeText(B.textContent);
  }, Kt = P(
    (B) => {
      k(B), yt(B, b);
    },
    [b, yt]
  ), ne = P(
    (B) => {
      N(B), yt(h, B);
    },
    [h, yt]
  ), Xt = (B) => {
    var ut, lt, vt, Nt, _t;
    D(B);
    const Z = (lt = (ut = u.current) == null ? void 0 : ut.getNoteOps(0)) == null ? void 0 : lt.at(0);
    if (Z && Kr("note", Z)) {
      Z.insert.note && (Z.insert.note.style = B);
      const bt = (Nt = (vt = Z.insert.note) == null ? void 0 : vt.contents) == null ? void 0 : Nt.ops;
      S !== "x" && B === "x" ? bt == null || bt.forEach((Tt) => pu(Tt)) : S === "x" && B !== "x" && (bt == null || bt.forEach((Tt) => hu(Tt))), (_t = u.current) == null || _t.applyUpdate([Z, { delete: 1 }]);
    }
  }, jt = (B) => {
    ct(B.contextMarker), V(B.canRedo);
  }, Le = P(
    (B) => {
      var ut, lt, vt, Nt, _t;
      const Z = (lt = (ut = u.current) == null ? void 0 : ut.getNoteOps(0)) == null ? void 0 : lt.at(0);
      if (Z && Kr("note", Z)) {
        B.content.length > 1 && setTimeout(() => {
          var O;
          (O = u.current) == null || O.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const bt = (vt = Z.insert.note) == null ? void 0 : vt.style, Tt = (_t = (Nt = Z.insert.note) == null ? void 0 : Nt.contents) == null ? void 0 : _t.ops;
        if (bt || y(!1), y(
          bt === "x" ? !!(Tt != null && Tt.every((O) => {
            var mt, Ct;
            if (!((mt = O.attributes) != null && mt.char)) return !0;
            const ft = ((Ct = O.attributes) == null ? void 0 : Ct.char).style;
            return ft === "xt" || ft === "xo" || ft === "xq";
          })) : !!(Tt != null && Tt.every((O) => {
            var mt, Ct;
            if (!((mt = O.attributes) != null && mt.char)) return !0;
            const ft = ((Ct = O.attributes) == null ? void 0 : Ct.char).style;
            return ft === "ft" || ft === "fr" || ft === "fq";
          }))
        ), !L.current) {
          L.current = !0, H.current = JSON.stringify(Z), A(!0);
          return;
        }
        A(JSON.stringify(Z) === H.current), yt(h, b);
      } else
        y(!1), A(!0);
    },
    [h, b, yt]
  ), Jt = P(() => {
    const B = window.getSelection();
    if (m.current && Ut.length && B && B.rangeCount > 0) {
      const Z = B.getRangeAt(0).getBoundingClientRect(), ut = m.current.getBoundingClientRect();
      K(Z.left - ut.left), J(Z.top - ut.top), q(Z.height), X(!0);
    }
  }, [Ut, m]);
  W(() => {
    const B = () => {
      R && X(!1);
    };
    return window.addEventListener("click", B), () => {
      window.removeEventListener("click", B);
    };
  }, [R]), W(() => {
    var B;
    R && ((B = dt.current) == null || B.focus());
  }, [R]), W(() => {
    var ut;
    const B = ((ut = g.current) == null ? void 0 : ut.querySelector(".editor-input")) ?? void 0, Z = (lt) => {
      !R && B && document.activeElement === B && lt.key === l ? (lt.preventDefault(), Jt()) : R && lt.key === "Escape" && (lt.preventDefault(), X(!1));
    };
    return document.addEventListener("keydown", Z), () => {
      document.removeEventListener("keydown", Z);
    };
  }, [R, Jt, l]);
  const Zt = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ w(rt, { children: [
    /* @__PURE__ */ w("div", { ref: p, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw:flex", children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            lu,
            {
              isTypeSwitchable: _,
              noteType: S,
              handleNoteTypeChange: Xt,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            nu,
            {
              callerType: h,
              updateCallerType: Kt,
              customCaller: b,
              updateCustomCaller: ne,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ w(_o, { children: [
          /* @__PURE__ */ a(
            ru,
            {
              onUndoClick: () => {
                var B;
                return (B = u.current) == null ? void 0 : B.undo();
              },
              onRedoClick: () => {
                var B;
                return (B = u.current) == null ? void 0 : B.redo();
              },
              canUndo: !T,
              canRedo: $,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            Ui,
            {
              onCancelClick: o,
              onAcceptClick: Wt,
              canAccept: !T || v !== h || h === "custom" && b !== E,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: g,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              au,
              {
                editorRef: u,
                canUndo: !T,
                canRedo: $,
                children: /* @__PURE__ */ a(
                  Nc,
                  {
                    options: wt,
                    onStateChange: jt,
                    onUsjChange: Le,
                    defaultUsj: gu,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: u
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
              /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a(
                G,
                {
                  "aria-label": Zt,
                  onClick: Pt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(Pn, {})
                }
              ) }),
              /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: Zt }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "tw:absolute",
        ref: m,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ w(Ce, { open: R, children: [
      /* @__PURE__ */ a(
        Vc,
        {
          className: "tw:absolute",
          style: {
            top: it,
            left: pt,
            height: at,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        Ee,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (B) => {
            B.preventDefault(), B.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            wu,
            {
              markerMenuItems: Ut,
              localizedStrings: d,
              searchRef: dt
            }
          )
        }
      )
    ] })
  ] });
}
const Th = Object.freeze([
  ...cu,
  ...Object.entries(Jr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...eu,
  ...Gi
]);
function qi(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((n) => typeof n == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function fu(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, d) => {
    const c = d === i.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Do(t, l, r, !0, n),
      c && o
    ] }, qi(t, l));
  });
}
function Do(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = f(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ w(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(Ba, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(Ba, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return mu(
        i,
        qi(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function mu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ w("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      Ba,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Do(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function vu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, u = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ w("span", { className: f("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), g = s && /* @__PURE__ */ w(rt, { children: [
    Do(t.marker, [s], o, !1),
    " "
  ] }), m = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", h = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", k = f(m, p);
  return /* @__PURE__ */ w(rt, { children: [
    /* @__PURE__ */ w("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", k), children: [
      d,
      u
    ] }),
    /* @__PURE__ */ a("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", k), children: g }),
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          h,
          k
        ),
        children: l && l.length > 0 && /* @__PURE__ */ a(rt, { children: fu(t.marker, l, o, c) })
      }
    )
  ] });
}
function zh({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: c
}) {
  const u = d ?? Bs(r, void 0), g = (b, N) => {
    c == null || c(b, N, n);
  }, m = i ? r.findIndex((b) => b === i) : -1, [p, h] = I(m), k = (b, N, E) => {
    if (r.length)
      switch (b.key) {
        case "Enter":
        case " ":
          b.preventDefault(), c == null || c(N, E, n);
          break;
      }
  }, v = (b) => {
    if (r.length)
      switch (b.key) {
        case "ArrowDown":
          b.preventDefault(), h((N) => Math.min(N + 1, r.length - 1));
          break;
        case "ArrowUp":
          b.preventDefault(), h((N) => Math.max(N - 1, 0));
          break;
      }
  }, x = F([]);
  return W(() => {
    var b;
    p >= 0 && p < x.current.length && ((b = x.current[p]) == null || b.focus());
  }, [p]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: f("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: v,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: f(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((b, N) => {
            const E = b === i, C = `${n}-${N}`;
            return /* @__PURE__ */ w(rt, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: (S) => {
                    x.current[N] = S;
                  },
                  role: "option",
                  "aria-selected": E,
                  "data-marker": b.marker,
                  "data-state": E ? "selected" : void 0,
                  tabIndex: N === p ? 0 : -1,
                  className: f(
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
                  onClick: () => g(b, N),
                  onKeyDown: (S) => k(S, b, N),
                  children: /* @__PURE__ */ a(
                    vu,
                    {
                      footnote: b,
                      layout: o,
                      formatCaller: () => u(b.caller, N),
                      showMarkers: s
                    }
                  )
                },
                C
              ),
              N < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(le, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function bu(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function xu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = U(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const u = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(u) || (d.add(u), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(zo, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(So, { stickyHeader: !0, children: /* @__PURE__ */ w(Be, { children: [
      /* @__PURE__ */ a(ca, { children: n }),
      /* @__PURE__ */ a(ca, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Io, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ w(
      Be,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ a(wr, { children: ze(l.reference, "English") }),
          /* @__PURE__ */ a(wr, { className: o, children: bu(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function Hi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Vo.Root,
    {
      "data-slot": "checkbox",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Vo.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(ar, {})
        }
      )
    }
  );
}
const yu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(pl, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(hl, { className: "tw:h-4 tw:w-4" });
}, fa = (t, e, r) => /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
  /* @__PURE__ */ w(
    Rt,
    {
      className: f("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        yu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a($t, { side: "bottom", children: e })
] }) }), Sh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => fa(e, t)
}), ku = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => fa(r, t)
}), Ih = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => fa(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), $a = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((c) => c !== d);
  }), o(s);
  let l = [...n];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), i(l);
}, Dh = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => fa(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ w(Mi, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ a(
        ta,
        {
          onClick: (d) => {
            d.stopPropagation(), $a(
              [l],
              "approved",
              e,
              r,
              o,
              n
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ a(dl, {})
        }
      ),
      /* @__PURE__ */ a(
        ta,
        {
          onClick: (d) => {
            d.stopPropagation(), $a(
              [l],
              "unapproved",
              e,
              r,
              o,
              n
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ a(wl, {})
        }
      ),
      /* @__PURE__ */ a(
        ta,
        {
          onClick: (d) => {
            d.stopPropagation(), $a(
              [l],
              "unknown",
              e,
              r,
              o,
              n
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ a(ul, {})
        }
      )
    ] });
  }
}), Rh = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), $h = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Oh = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Nu = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ah = Object.freeze([
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
]), _u = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Cu = (t, e, r) => t.map((o) => {
  const n = Go(o.key) ? o.key : o.key[0];
  return {
    items: Go(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Nu(n, e, r),
    occurrences: o.occurrences || []
  };
}), pe = (t, e) => t[e] ?? e;
function Mh({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: d,
  id: c,
  areInventoryItemsLoading: u = !1,
  classNameForVerseText: g,
  onItemSelected: m
}) {
  const p = pe(r, "%webView_inventory_all%"), h = pe(r, "%webView_inventory_approved%"), k = pe(r, "%webView_inventory_unapproved%"), v = pe(r, "%webView_inventory_unknown%"), x = pe(r, "%webView_inventory_scope_currentBook%"), b = pe(r, "%webView_inventory_scope_chapter%"), N = pe(r, "%webView_inventory_scope_verse%"), E = pe(r, "%webView_inventory_filter_text%"), C = pe(
    r,
    "%webView_inventory_show_additional_items%"
  ), S = pe(r, "%webView_inventory_no_results%"), [D, _] = I(!1), [y, T] = I("all"), [A, $] = I(""), [V, L] = I([]), H = U(() => {
    const q = t ?? [];
    return q.length === 0 ? [] : Cu(q, n, i);
  }, [t, n, i]), R = U(() => {
    if (D) return H;
    const q = [];
    return H.forEach((st) => {
      const ct = st.items[0], dt = q.find(
        (wt) => wt.items[0] === ct
      );
      dt ? (dt.count += st.count, dt.occurrences = dt.occurrences.concat(st.occurrences)) : q.push({
        items: [ct],
        count: st.count,
        occurrences: st.occurrences,
        status: st.status
      });
    }), q;
  }, [D, H]), X = U(() => R.length === 0 ? [] : _u(R, y, A), [R, y, A]), pt = U(() => {
    var ct, dt;
    if (!D) return d;
    const q = (ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct.length;
    if (!q) return d;
    const st = [];
    for (let wt = 0; wt < q; wt++)
      st.push(
        ku(
          ((dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt[wt]) || "Additional Item",
          wt + 1
        )
      );
    return [...st, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, D]);
  W(() => {
    X.length === 0 ? L([]) : X.length === 1 && L(X[0].items);
  }, [X]);
  const K = (q, st) => {
    st.setRowSelection(() => {
      const dt = {};
      return dt[q.index] = !0, dt;
    });
    const ct = q.original.items;
    L(ct), m && ct.length > 0 && m(ct[0]);
  }, it = (q) => {
    if (q === "book" || q === "chapter" || q === "verse")
      l(q);
    else
      throw new Error(`Invalid scope value: ${q}`);
  }, J = (q) => {
    if (q === "all" || q === "approved" || q === "unapproved" || q === "unknown")
      T(q);
    else
      throw new Error(`Invalid status filter value: ${q}`);
  }, at = U(() => {
    if (R.length === 0 || V.length === 0) return [];
    const q = R.filter((st) => Fs(
      D ? st.items : [st.items[0]],
      V
    ));
    if (q.length > 1) throw new Error("Selected item is not unique");
    return q.length === 0 ? [] : q[0].occurrences;
  }, [V, D, R]);
  return /* @__PURE__ */ a("div", { id: c, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ w("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ w(
        pr,
        {
          onValueChange: (q) => J(q),
          defaultValue: y,
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(hr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(fr, { children: [
              /* @__PURE__ */ a(ie, { value: "all", children: p }),
              /* @__PURE__ */ a(ie, { value: "approved", children: h }),
              /* @__PURE__ */ a(ie, { value: "unapproved", children: k }),
              /* @__PURE__ */ a(ie, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(pr, { onValueChange: (q) => it(q), defaultValue: s, children: [
        /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(hr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(fr, { children: [
          /* @__PURE__ */ a(ie, { value: "book", children: x }),
          /* @__PURE__ */ a(ie, { value: "chapter", children: b }),
          /* @__PURE__ */ a(ie, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Mr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: E,
          value: A,
          onChange: (q) => {
            $(q.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
        /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ w("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Hi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: D,
              onCheckedChange: (q) => {
                _(q);
              }
            }
          ),
          /* @__PURE__ */ a(zt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? C })
        ] }) }),
        /* @__PURE__ */ a($t, { children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      jw,
      {
        columns: pt,
        data: X,
        onRowClickHandler: K,
        stickyHeader: !0,
        isLoading: u,
        noResultsMessage: S
      }
    ) }),
    at.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      xu,
      {
        classNameForText: g,
        occurrenceData: at,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Eu = "16rem", Tu = "3rem", Wi = nt.createContext(void 0);
function ma() {
  const t = nt.useContext(Wi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function zu({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: n,
  children: i,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: s = "primary",
  ...l
}) {
  const [d, c] = nt.useState(t), u = e ?? d, g = nt.useCallback(
    (N) => {
      const E = typeof N == "function" ? N(u) : N;
      r ? r(E) : c(E);
    },
    [r, u]
  ), m = nt.useCallback(() => g((N) => !N), [g]), p = u ? "expanded" : "collapsed", v = kt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", x = nt.useMemo(
    () => ({
      state: p,
      open: u,
      setOpen: g,
      toggleSidebar: m,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: v
    }),
    [p, u, g, m, v]
  ), b = {
    "--sidebar-width": Eu,
    "--sidebar-width-icon": Tu,
    ...n
  };
  return /* @__PURE__ */ a(Wi.Provider, { value: x, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: b,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...l,
      children: i
    }
  ) });
}
function Su({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = ma();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: f(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ...n,
      children: o
    }
  ) : /* @__PURE__ */ w(
    "div",
    {
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": i.side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: f(
              "tw:relative tw:w-(--sidebar-width) tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              // CUSTOM: Updated selector from data-[side=right] to data-[side=secondary]
              "tw:group-data-[side=secondary]:rotate-180",
              t === "floating" || t === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ a(
          "div",
          {
            "data-slot": "sidebar-container",
            "data-side": i.side,
            className: f(
              // CUSTOM: Switched tw:fixed to tw:absolute to scope the sidebar inside its container
              // rather than the viewport, matching Platform.Bible's layout model
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              // CUSTOM: Use positional side values (primary/secondary) for left/right offset selectors
              i.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : (
                // CUSTOM: Updated border selectors from data-[side=left/right] to data-[side=primary/secondary]
                "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon) tw:group-data-[side=primary]:border-e tw:group-data-[side=secondary]:border-s"
              ),
              r
            ),
            ...n,
            children: /* @__PURE__ */ a(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "tw:flex tw:size-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:shadow-sm tw:group-data-[variant=floating]:ring-1 tw:group-data-[variant=floating]:ring-sidebar-border",
                children: o
              }
            )
          }
        )
      ]
    }
  );
}
function Lh({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = ma();
  return /* @__PURE__ */ w(
    G,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: f(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(zs, {}) : /* @__PURE__ */ a(Ss, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Ph({ className: t, ...e }) {
  const { toggleSidebar: r } = ma();
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: r,
      title: "Toggle Sidebar",
      className: f(
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        "tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:transition-all tw:ease-linear tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:sm:flex tw:ltr:-translate-x-1/2 tw:rtl:translate-x-1/2",
        "tw:in-data-[side=primary]:cursor-w-resize tw:rtl:in-data-[side=primary]:cursor-e-resize tw:in-data-[side=secondary]:cursor-e-resize tw:rtl:in-data-[side=secondary]:cursor-w-resize",
        "tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:rtl:[[data-side=primary][data-state=collapsed]_&]:cursor-w-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize tw:rtl:[[data-side=secondary][data-state=collapsed]_&]:cursor-e-resize",
        "tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:start-full tw:hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        "tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-end-2",
        "tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-start-2",
        t
      ),
      ...e
    }
  );
}
function Iu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: f(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function jh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Mr,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: f("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Vh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Bh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Fh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: f("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Du({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: f(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function zn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: f("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function Sn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ke.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: f(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Gh({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ke.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: f(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function In({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: f("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function Ru({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: f("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function $u({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: f("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Ou = Ne(
  "tw:peer/menu-button tw:group/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-start tw:text-sm tw:ring-sidebar-ring tw:outline-hidden tw:transition-[width,height,padding] tw:group-has-data-[sidebar=menu-action]/menu-item:pe-8 tw:group-data-[collapsible=icon]:size-8! tw:group-data-[collapsible=icon]:p-2! tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-open:hover:bg-sidebar-accent tw:data-open:hover:text-sidebar-accent-foreground tw:data-active:bg-sidebar-accent tw:data-active:font-medium tw:data-active:text-sidebar-accent-foreground tw:[&_svg]:size-4 tw:[&_svg]:shrink-0 tw:[&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        // CUSTOM: Updated shadow color values from hsl(var(--...)) to var(--...) to use the
        // updated CSS variable format that includes the color space directly in the variable value
        outline: "tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "tw:h-8 tw:text-sm",
        sm: "tw:h-7 tw:text-xs",
        lg: "tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Au({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const l = t ? Ke.Root : "button", { state: d } = ma(), c = /* @__PURE__ */ a(
    l,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: f(Ou({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ w(Dt, { children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: c }),
    /* @__PURE__ */ a(
      $t,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : c;
}
function Uh({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Ke.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: f(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: f(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function qh({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = nt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ w(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: f("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a($r, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          $r,
          {
            className: "tw:h-4 tw:max-w-(--skeleton-width) tw:flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: n
          }
        )
      ]
    }
  );
}
function Hh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: f(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function Wh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: f("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function Yh({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? Ke.Root : "a";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: f(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...n
    }
  );
}
function Mu({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: d
}) {
  const c = P(
    (p, h) => {
      o(p, h);
    },
    [o]
  ), u = P(
    (p) => {
      const h = r.find((k) => k.projectId === p);
      return h ? h.projectName : p;
    },
    [r]
  ), g = U(
    () => r.map((p) => ({
      id: p.projectId,
      shortName: p.projectName,
      fullName: p.projectName
    })),
    [r]
  ), m = P(
    (p) => !n.projectId && p === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Su,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ w(Du, { children: [
        /* @__PURE__ */ w(zn, { children: [
          /* @__PURE__ */ a(Sn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(In, { children: /* @__PURE__ */ a(Ru, { children: Object.entries(e).map(([p, h]) => /* @__PURE__ */ a($u, { children: /* @__PURE__ */ a(
            Au,
            {
              onClick: () => c(p),
              isActive: m(p),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: h })
            }
          ) }, p)) }) })
        ] }),
        /* @__PURE__ */ w(zn, { children: [
          /* @__PURE__ */ a(Sn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(In, { className: "tw:pl-3", children: /* @__PURE__ */ w(
            "div",
            {
              className: f(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(gl, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Ww,
                  {
                    mode: "project",
                    projects: g,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: p }) => {
                      if (!p) return;
                      const h = u(p);
                      c(h, p);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    buttonPlaceholder: l,
                    ariaLabel: s,
                    popoverContentStyle: { zIndex: po }
                  }
                )
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
const Ro = pa(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: n, isDisabled: i = !1, id: s }, l) => {
    const d = kt();
    return /* @__PURE__ */ w("div", { id: s, className: f("tw:relative", { "tw:w-full": o }, n), children: [
      /* @__PURE__ */ a(
        fl,
        {
          className: f(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": d === "rtl" },
            { "tw:left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ a(
        Mr,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ w(
        G,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": d === "rtl" },
            { "tw:right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ a(ha, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Ro.displayName = "SearchBar";
function Xh({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: n,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: u
}) {
  return /* @__PURE__ */ w("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      Ro,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      zu,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Mu,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: n,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: u
            }
          ),
          /* @__PURE__ */ a(Iu, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const je = "scrBook", Lu = "scrRef", Je = "source", Pu = "details", ju = "Scripture Reference", Vu = "Scripture Book", Yi = "Type", Bu = "Details";
function Fu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: je,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? ju,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? gt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === je ? ze(n.start) : void 0;
      },
      getGroupingValue: (o) => gt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => ja(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ze(o.start),
      id: Lu,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ze(n.start);
      },
      sortingFn: (o, n) => ja(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Je,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Yi : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Pu,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Bu,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Gu = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || ja(t.start, t.end) === 0 ? `${va(t.start)}+${e}` : `${va(t.start)}+${e}-${va(t.end)}+${r}`;
}, Dn = (t) => `${Gu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Jh({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: d
}) {
  const [c, u] = I([]), [g, m] = I([{ id: je, desc: !1 }]), [p, h] = I({}), k = U(
    () => t.flatMap((y) => y.data.map((T) => ({
      ...T,
      source: y.source
    }))),
    [t]
  ), v = U(
    () => Fu(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  W(() => {
    c.includes(Je) ? m([
      { id: Je, desc: !1 },
      { id: je, desc: !1 }
    ]) : m([{ id: je, desc: !1 }]);
  }, [c]);
  const x = ai({
    data: k,
    columns: v,
    state: {
      grouping: c,
      sorting: g,
      rowSelection: p
    },
    onGroupingChange: u,
    onSortingChange: m,
    onRowSelectionChange: h,
    getExpandedRowModel: xc(),
    getGroupedRowModel: bc(),
    getCoreRowModel: ni(),
    getSortedRowModel: oi(),
    getRowId: Dn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  W(() => {
    if (l) {
      const y = x.getSelectedRowModel().rowsById, T = Object.keys(y);
      if (T.length === 1) {
        const A = k.find(($) => Dn($) === T[0]) || void 0;
        A && l(A);
      }
    }
  }, [p, k, l, x]);
  const b = n ?? Vu, N = i ?? Yi, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${b}`, value: [je] },
    { label: `Group by ${N}`, value: [Je] },
    {
      label: `Group by ${b} and ${N}`,
      value: [je, Je]
    },
    {
      label: `Group by ${N} and ${b}`,
      value: [Je, je]
    }
  ], C = (y) => {
    u(JSON.parse(y));
  }, S = (y, T) => {
    !y.getIsGrouped() && !y.getIsSelected() && y.getToggleSelectedHandler()(T);
  }, D = (y, T) => y.getIsGrouped() ? "" : f("banded-row", T % 2 === 0 ? "even" : "odd"), _ = (y, T, A) => {
    if (!((y == null ? void 0 : y.length) === 0 || T.depth < A.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ w(
      pr,
      {
        value: JSON.stringify(c),
        onValueChange: (y) => {
          C(y);
        },
        children: [
          /* @__PURE__ */ a(gr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(hr, {}) }),
          /* @__PURE__ */ a(fr, { position: "item-aligned", children: /* @__PURE__ */ a(Dw, { children: E.map((y) => /* @__PURE__ */ a(ie, { value: JSON.stringify(y.value), children: y.label }, y.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(zo, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(So, { children: x.getHeaderGroups().map((y) => /* @__PURE__ */ a(Be, { children: y.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(ca, { colSpan: T.colSpan, className: "tw:sticky top-0", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ a(
            G,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          zr(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, y.id)) }),
      /* @__PURE__ */ a(Io, { children: x.getRowModel().rows.map((y, T) => {
        const A = kt();
        return /* @__PURE__ */ a(
          Be,
          {
            "data-state": y.getIsSelected() ? "selected" : "",
            className: f(D(y, T)),
            onClick: ($) => S(y, $),
            children: y.getVisibleCells().map(($) => {
              if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== Je || !r)))
                return /* @__PURE__ */ a(
                  wr,
                  {
                    className: f(
                      $.column.columnDef.id,
                      "tw:p-[1px]",
                      _(c, y, $)
                    ),
                    children: $.getIsGrouped() ? /* @__PURE__ */ w(
                      G,
                      {
                        variant: "link",
                        onClick: y.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          y.getIsExpanded() && /* @__PURE__ */ a(tr, {}),
                          !y.getIsExpanded() && (A === "ltr" ? /* @__PURE__ */ a(Fe, {}) : /* @__PURE__ */ a(Va, {})),
                          " ",
                          zr($.column.columnDef.cell, $.getContext()),
                          " (",
                          y.subRows.length,
                          ")"
                        ]
                      }
                    ) : zr($.column.columnDef.cell, $.getContext())
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
const $o = (t, e) => t.filter((r) => {
  try {
    return Tr(r) === e;
  } catch {
    return !1;
  }
}), Xi = (t, e, r) => $o(t, e).every((o) => r.includes(o));
function Uu({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = $o(e, t).length === 0, s = n["%scripture_section_ot_short%"], l = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], c = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    G,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        Xi(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: jc(
        t,
        s,
        l,
        d,
        c
      )
    }
  );
}
const Rn = 5, Oa = 6;
function Ku({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], u = o["%webView_book_selector_no_book_found%"], g = o["%webView_book_selector_more%"], { otLong: m, ntLong: p, dcLong: h, extraLong: k } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, x] = I(!1), [b, N] = I(""), E = F(void 0), C = F(!1);
  if (t.length !== gt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const S = U(() => gt.allBookIds.filter(
    (L, H) => t[H] === "1" && !gt.isObsolete(gt.bookIdToNumber(L))
  ), [t]), D = U(() => {
    if (!b.trim()) {
      const R = {
        [et.OT]: [],
        [et.NT]: [],
        [et.DC]: [],
        [et.Extra]: []
      };
      return S.forEach((X) => {
        const pt = Tr(X);
        R[pt].push(X);
      }), R;
    }
    const L = S.filter(
      (R) => fo(R, b, n)
    ), H = {
      [et.OT]: [],
      [et.NT]: [],
      [et.DC]: [],
      [et.Extra]: []
    };
    return L.forEach((R) => {
      const X = Tr(R);
      H[X].push(R);
    }), H;
  }, [S, b, n]), _ = P(
    (L, H = !1) => {
      if (!H || !E.current) {
        r(
          e.includes(L) ? e.filter((J) => J !== L) : [...e, L]
        ), E.current = L;
        return;
      }
      const R = S.findIndex((J) => J === E.current), X = S.findIndex((J) => J === L);
      if (R === -1 || X === -1) return;
      const [pt, K] = [
        Math.min(R, X),
        Math.max(R, X)
      ], it = S.slice(pt, K + 1).map((J) => J);
      r(
        e.includes(L) ? e.filter((J) => !it.includes(J)) : [.../* @__PURE__ */ new Set([...e, ...it])]
      );
    },
    [e, r, S]
  ), y = (L) => {
    _(L, C.current), C.current = !1;
  }, T = (L, H) => {
    L.preventDefault(), _(H, L.shiftKey);
  }, A = P(
    (L) => {
      const H = $o(S, L).map((R) => R);
      r(
        Xi(S, L, e) ? e.filter((R) => !H.includes(R)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, r, S]
  ), $ = () => {
    r(S.map((L) => L));
  }, V = () => {
    r([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(et).map((L) => /* @__PURE__ */ a(
      Uu,
      {
        section: L,
        availableBookIds: S,
        selectedBookIds: e,
        onToggle: A,
        localizedStrings: o
      },
      L
    )) }),
    /* @__PURE__ */ w(
      Ce,
      {
        open: v,
        onOpenChange: (L) => {
          x(L), L || N("");
        },
        children: [
          /* @__PURE__ */ a(Ae, { asChild: !0, children: /* @__PURE__ */ w(
            G,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ a(so, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ a(Ee, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ w(
            $e,
            {
              shouldFilter: !1,
              onKeyDown: (L) => {
                L.key === "Enter" && (C.current = L.shiftKey);
              },
              children: [
                /* @__PURE__ */ a(
                  vr,
                  {
                    placeholder: l,
                    value: b,
                    onValueChange: N
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: $, children: d }),
                  /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: V, children: c })
                ] }),
                /* @__PURE__ */ w(Oe, { children: [
                  /* @__PURE__ */ a(Lr, { children: u }),
                  Object.values(et).map((L, H) => {
                    const R = D[L];
                    if (R.length !== 0)
                      return /* @__PURE__ */ w(ao, { children: [
                        /* @__PURE__ */ a(
                          be,
                          {
                            heading: ci(L, m, p, h, k),
                            children: R.map((X) => /* @__PURE__ */ a(
                              wi,
                              {
                                bookId: X,
                                isSelected: e.includes(X),
                                onSelect: () => y(X),
                                onMouseDown: (pt) => T(pt, X),
                                section: Tr(X),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: pi(X, n),
                                className: "tw:flex tw:items-center"
                              },
                              X
                            ))
                          }
                        ),
                        H < Object.values(et).length - 1 && /* @__PURE__ */ a(ho, {})
                      ] }, L);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ w("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Oa ? Oa : Rn
      ).map((L) => /* @__PURE__ */ a(ye, { className: "tw:hover:bg-secondary", variant: "secondary", children: Ve(L, n) }, L)),
      e.length > Oa && /* @__PURE__ */ a(
        ye,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Rn} ${g}`
        }
      )
    ] })
  ] });
}
const Zh = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_verse%",
  "%webView_scope_selector_chapter%",
  "%webView_scope_selector_book%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
  "%webView_scope_selector_range%",
  "%webView_scope_selector_select_range%",
  "%webView_scope_selector_range_start%",
  "%webView_scope_selector_range_end%",
  "%webView_scope_selector_ok%",
  "%webView_scope_selector_cancel%",
  "%webView_scope_selector_navigate%",
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
]), At = (t, e) => t[e] ?? e, qu = Object.freeze([" ", "-"]);
function Qh({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: d,
  variant: c = "radio",
  rangeStart: u,
  rangeEnd: g,
  onRangeStartChange: m,
  onRangeEndChange: p,
  currentScrRef: h,
  onCurrentScrRefChange: k,
  bookChapterControlLocalizedStrings: v,
  getEndVerse: x,
  hideLabel: b = !1,
  buttonClassName: N
}) {
  const E = At(
    s,
    "%webView_scope_selector_selected_text%"
  ), C = At(s, "%webView_scope_selector_verse%"), S = At(s, "%webView_scope_selector_chapter%"), D = At(s, "%webView_scope_selector_book%"), _ = At(
    s,
    "%webView_scope_selector_current_verse%"
  ), y = At(
    s,
    "%webView_scope_selector_current_chapter%"
  ), T = At(s, "%webView_scope_selector_current_book%"), A = At(s, "%webView_scope_selector_choose_books%"), $ = At(s, "%webView_scope_selector_scope%"), V = At(s, "%webView_scope_selector_select_books%"), L = At(s, "%webView_scope_selector_range%"), H = At(s, "%webView_scope_selector_select_range%"), R = At(s, "%webView_scope_selector_range_start%"), X = At(s, "%webView_scope_selector_range_end%"), pt = At(s, "%webView_scope_selector_ok%"), K = At(s, "%webView_scope_selector_cancel%"), it = At(s, "%webView_scope_selector_navigate%"), J = (j) => {
    if (!h) return;
    const Q = h.book.toUpperCase();
    switch (j) {
      case "verse":
        return ze(h, "id");
      case "chapter":
        return `${Q} ${h.chapterNum}`;
      case "book":
        return Q;
      default:
        return;
    }
  }, at = [
    { value: "selectedText", label: E, id: "scope-selected-text" },
    {
      value: "verse",
      label: C,
      dropdownLabel: _,
      scrRefSuffix: J("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: S,
      dropdownLabel: y,
      scrRefSuffix: J("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: D,
      dropdownLabel: T,
      scrRefSuffix: J("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: A, id: "scope-selected" },
    { value: "range", label: L, id: "scope-range" }
  ], q = (j, Q, qt = !1) => /* @__PURE__ */ w(rt, { children: [
    j,
    Q && !qt && /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      Q
    ] })
  ] }), st = e ? at.filter((j) => e.includes(j.value)) : at, ct = h ?? ba, dt = u ?? ct, wt = g ?? ct, Ut = () => {
  }, yt = F(null), Wt = F(null), Yt = F(!1), M = F(null), Pt = F(!1), [Kt, ne] = I(void 0), Xt = F(!1), jt = F(!1), Le = F(null), Jt = P((j) => {
    if (j) {
      ne("start"), Xt.current = !1;
      return;
    }
    ne((Q) => Q === "start" ? void 0 : Q), Xt.current && (Xt.current = !1, requestAnimationFrame(() => {
      var qt;
      const Q = (qt = yt.current) == null ? void 0 : qt.querySelector("button");
      Q == null || Q.click();
    }));
  }, []), Zt = P((j) => {
    if (j) {
      ne("end"), jt.current = !1;
      return;
    }
    ne((Q) => Q === "end" ? void 0 : Q);
  }, []), B = P(
    (j) => {
      m == null || m(j), p == null || p(j), Xt.current = !0;
    },
    [m, p]
  ), Z = P(
    (j) => {
      p == null || p(j), jt.current = !0;
    },
    [p]
  ), ut = P(
    (j) => {
      r(j), j === "selectedBooks" && n.length === 0 && (h != null && h.book) && i([h.book]);
    },
    [r, n, h, i]
  ), lt = st.find((j) => j.value === t), vt = () => t === "selectedBooks" && n.length > 0 ? n.map((j) => j.toUpperCase()).join(", ") : t === "range" ? Gs(dt, wt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : lt ? q(lt.label, lt.scrRefSuffix) : t, Nt = st.filter(
    (j) => j.value !== "selectedBooks" && j.value !== "range"
  ), _t = st.find((j) => j.value === "selectedBooks"), bt = st.find((j) => j.value === "range"), [Tt, O] = I(!1), [ft, mt] = I(void 0), [Ct, He] = I(void 0), [Pe, xr] = I(void 0), [We, yr] = I(void 0), [kr, Pr] = I([]), jr = c === "dropdown" && ft === "selectedBooks", z = /* @__PURE__ */ a(
    Ku,
    {
      availableBookInfo: o,
      selectedBookIds: jr ? kr : n,
      onChangeSelectedBookIds: jr ? Pr : i,
      localizedStrings: s,
      localizedBookNames: l
    }
  ), Y = Kt === "end", tt = Kt === "start", St = "tw:text-muted-foreground", re = c === "dropdown" && ft === "range", ir = re ? xr : B, Vt = re ? yr : p ? Z : Ut, Et = /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { htmlFor: "scope-range-start", className: f(Y && St), children: R }),
      /* @__PURE__ */ a(
        ka,
        {
          id: "scope-range-start",
          scrRef: re ? Pe ?? dt : dt,
          handleSubmit: ir,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: x,
          submitKeys: qu,
          onOpenChange: Jt,
          className: f(Y && St),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { ref: yt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { htmlFor: "scope-range-end", className: f(tt && St), children: X }),
      /* @__PURE__ */ a(
        ka,
        {
          id: "scope-range-end",
          scrRef: re ? We ?? wt : wt,
          handleSubmit: Vt,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: x,
          disableReferencesUpTo: re ? Pe ?? dt : dt,
          onOpenChange: Zt,
          onCloseAutoFocus: (j) => {
            var Q;
            jt.current && (jt.current = !1, j.preventDefault(), (Q = Le.current) == null || Q.focus());
          },
          className: f(tt && St),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Ot = F({}), xt = P(
    (j) => (Q) => {
      Ot.current[j] = Q;
    },
    []
  ), Qt = F(null);
  W(() => {
    if (!Tt) return;
    let j = 0;
    const Q = requestAnimationFrame(() => {
      j = requestAnimationFrame(() => {
        var qt;
        (qt = Ot.current[t]) == null || qt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(Q), j && cancelAnimationFrame(j);
    };
  }, [Tt, t]);
  const [te, Ye] = I(null), [Vr, ls] = I(null), [Br, cs] = I(null), ds = 200, [ws, us] = I(!1);
  W(() => {
    if (!Br || typeof ResizeObserver > "u") return;
    const j = new ResizeObserver(([Q]) => {
      us(Q.contentRect.width < ds);
    });
    return j.observe(Br), () => j.disconnect();
  }, [Br]);
  const Ao = P(
    (j) => {
      He(j), xr(dt), yr(wt), Pr(n), O(!1), mt(j);
    },
    [dt, wt, n]
  ), Mo = P(() => {
    Ct !== void 0 && (Ct === "range" ? (Pe && (m == null || m(Pe)), We && (p == null || p(We))) : Ct === "selectedBooks" && i(kr), ut(Ct), mt(void 0), He(void 0));
  }, [
    Ct,
    Pe,
    We,
    kr,
    m,
    p,
    i,
    ut
  ]), Fr = P((j) => {
    j || (mt(void 0), He(void 0));
  }, []), Lo = P((j) => {
    var Q;
    j.preventDefault(), (Q = Qt.current) == null || Q.focus();
  }, []), Po = (j) => t === j ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ge, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ w("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw:grid tw:gap-2", children: [
      !b && /* @__PURE__ */ a(zt, { children: $ }),
      c === "dropdown" ? /* @__PURE__ */ w(ce, { open: Tt, onOpenChange: O, children: [
        /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ w(
          G,
          {
            ref: Qt,
            variant: "outline",
            role: "combobox",
            className: f(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              N
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: vt() }),
              /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          we,
          {
            ref: cs,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ w(xa, { container: Br, children: [
              Nt.map(({ value: j, label: Q, dropdownLabel: qt, scrRefSuffix: _r, id: ps }) => /* @__PURE__ */ w(
                Qe,
                {
                  ref: xt(j),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => ut(j),
                  "data-selected": t === j ? "true" : void 0,
                  children: [
                    t === j && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ge, { className: "tw:h-4 tw:w-4" }) }),
                    q(qt ?? Q, _r, ws)
                  ]
                },
                ps
              )),
              (_t || bt) && /* @__PURE__ */ a(Ue, {}),
              _t && /* @__PURE__ */ w(
                Qe,
                {
                  ref: xt("selectedBooks"),
                  className: f(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Ao("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    Po("selectedBooks"),
                    `${_t.label}…`
                  ]
                }
              ),
              bt && /* @__PURE__ */ w(
                Qe,
                {
                  ref: xt("range"),
                  className: f(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Ao("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    Po("range"),
                    `${bt.label}…`
                  ]
                }
              ),
              k && /* @__PURE__ */ w(rt, { children: [
                /* @__PURE__ */ a(Ue, {}),
                /* @__PURE__ */ a(er, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: it }),
                /* @__PURE__ */ a(
                  Qe,
                  {
                    ref: M,
                    className: "tw:p-0",
                    onSelect: (j) => {
                      var Q, qt;
                      if (j.preventDefault(), Yt.current) {
                        Yt.current = !1;
                        return;
                      }
                      Pt.current || (qt = (Q = Wt.current) == null ? void 0 : Q.querySelector("button")) == null || qt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Wt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (j) => {
                          const Q = j.target instanceof HTMLElement ? j.target : void 0;
                          Q != null && Q.closest("button") && (Yt.current = !0, requestAnimationFrame(() => {
                            Yt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          ka,
                          {
                            id: "scope-navigate",
                            scrRef: h ?? ba,
                            handleSubmit: k,
                            localizedBookNames: l,
                            localizedStrings: v,
                            getEndVerse: x,
                            triggerVariant: "ghost",
                            onOpenChange: (j) => {
                              Pt.current = j;
                            },
                            onCloseAutoFocus: (j) => {
                              var Q;
                              j.preventDefault(), (Q = M.current) == null || Q.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ w(rt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ze(h ?? ba, "id") }),
                              /* @__PURE__ */ a(tr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
                            ] })
                          }
                        )
                      }
                    )
                  }
                )
              ] })
            ] })
          }
        )
      ] }) : /* @__PURE__ */ a(
        gi,
        {
          value: t,
          onValueChange: ut,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: st.map(({ value: j, label: Q, scrRefSuffix: qt, id: _r }) => /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Xa, { className: "tw:me-2", value: j, id: _r }),
            /* @__PURE__ */ a(zt, { htmlFor: _r, children: q(Q, qt) })
          ] }, _r))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(zt, { children: V }),
      z
    ] }),
    c === "radio" && t === "range" && Et,
    c === "dropdown" && _t && /* @__PURE__ */ a(qa, { open: ft === "selectedBooks", onOpenChange: Fr, children: /* @__PURE__ */ a(
      Ha,
      {
        ref: ls,
        onCloseAutoFocus: Lo,
        onEscapeKeyDown: (j) => {
          Vr != null && Vr.querySelector('[data-state="open"]') && j.preventDefault();
        },
        children: /* @__PURE__ */ w(xa, { container: Vr, children: [
          /* @__PURE__ */ a(Wa, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ya, { children: A }) }),
          z,
          /* @__PURE__ */ w(tn, { children: [
            /* @__PURE__ */ a(G, { variant: "outline", onClick: () => Fr(!1), children: K }),
            /* @__PURE__ */ a(G, { onClick: Mo, children: pt })
          ] })
        ] })
      }
    ) }),
    c === "dropdown" && bt && /* @__PURE__ */ a(qa, { open: ft === "range", onOpenChange: Fr, children: /* @__PURE__ */ a(
      Ha,
      {
        ref: Ye,
        onCloseAutoFocus: Lo,
        onEscapeKeyDown: (j) => {
          te != null && te.querySelector('[data-state="open"]') && j.preventDefault();
        },
        children: /* @__PURE__ */ w(xa, { container: te, children: [
          /* @__PURE__ */ a(Wa, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ya, { children: H }) }),
          Et,
          /* @__PURE__ */ w(tn, { children: [
            /* @__PURE__ */ a(G, { variant: "outline", onClick: () => Fr(!1), children: K }),
            /* @__PURE__ */ a(G, { ref: Le, onClick: Mo, children: pt })
          ] })
        ] })
      }
    ) })
  ] });
}
function tg({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Xr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, u]) => [
          c,
          c === u && c in Xr ? Xr[c] : u
        ]
      )
    )
  }, d = kt();
  return /* @__PURE__ */ w(
    pr,
    {
      value: `${e}`,
      onValueChange: (c) => r(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ a(gr, { size: n, className: f("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          hr,
          {
            placeholder: l[Pa(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          fr,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: Ar },
            children: t.map((c) => /* @__PURE__ */ a(ie, { value: `${c}`, children: l[Pa(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function eg({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function rg({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: n
}) {
  return /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: n }) : /* @__PURE__ */ a("div", { children: r })
  ] });
}
function ag({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(le, {}) : ""
  ] });
}
function Ji(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function da({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: f("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Zi = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Dt, { children: [
  /* @__PURE__ */ a(Rt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    Qe,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ a(da, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ a(da, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(Ew, { children: [
    /* @__PURE__ */ a(Tw, { children: l.label }),
    /* @__PURE__ */ a(Nw, { children: /* @__PURE__ */ a(zw, { children: Zi(
      t,
      e,
      Ji(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ a($t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function eo({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(ce, { variant: i, children: [
    /* @__PURE__ */ a(de, { "aria-label": r, className: n, asChild: !0, id: l, children: /* @__PURE__ */ a(G, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(ml, {}) }) }),
    /* @__PURE__ */ a(we, { align: "start", style: { zIndex: Ar }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, u) => /* @__PURE__ */ w(ao, { children: [
      /* @__PURE__ */ a(Ki, { children: /* @__PURE__ */ a(It, { children: Zi(e.groups, e.items, d, t) }) }),
      c < u.length - 1 && /* @__PURE__ */ a(Ue, {})
    ] }, d)) })
  ] });
}
const Qi = nt.forwardRef(
  ({ id: t, className: e, children: r }, o) => /* @__PURE__ */ a(
    "div",
    {
      ref: o,
      className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
      id: t,
      children: r
    }
  )
);
function og({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ w(Qi, { className: `tw:w-full tw:border ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      eo,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ a(vl, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        eo,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(bl, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
function ng({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Qi, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    eo,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: n,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const ts = nt.forwardRef(({ className: t, ...e }, r) => {
  const o = kt();
  return /* @__PURE__ */ a(
    ue.Root,
    {
      orientation: "vertical",
      ref: r,
      className: f("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ts.displayName = ue.List.displayName;
const es = nt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.List,
  {
    ref: r,
    className: f(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
es.displayName = ue.List.displayName;
const Hu = nt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Trigger,
  {
    ref: r,
    ...e,
    className: f(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), rs = nt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  ue.Content,
  {
    ref: r,
    className: f(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
rs.displayName = ue.Content.displayName;
function ig({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: n,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ w("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ a("h1", { children: n }) : "",
      /* @__PURE__ */ a(
        Ro,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(ts, { children: [
      /* @__PURE__ */ a(es, { children: t.map((l) => /* @__PURE__ */ a(Hu, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ a(rs, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Wu({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = nt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(To.Provider, { value: o, children: /* @__PURE__ */ a(
    ke.Root,
    {
      "data-slot": "menubar",
      className: f(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function Yu({ ...t }) {
  return /* @__PURE__ */ a(ke.Menu, { "data-slot": "menubar-menu", ...t });
}
function Xu({ ...t }) {
  return /* @__PURE__ */ a(ke.Portal, { "data-slot": "menubar-portal", ...t });
}
function Ju({
  className: t,
  ...e
}) {
  const r = Me();
  return /* @__PURE__ */ a(
    ke.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: f(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function Zu({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Me();
  return /* @__PURE__ */ a(Xu, { children: /* @__PURE__ */ a(
    ke.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: f(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "tw:z-50 tw:min-w-36 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Added pr-twp to reset styles so that only shadcn styles are applied (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": i.variant === "muted"
        },
        t
      ),
      ...n
    }
  ) });
}
function Qu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Me();
  return /* @__PURE__ */ a(
    ke.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function tp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ke.Separator,
    {
      "data-slot": "menubar-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function ep({ ...t }) {
  return /* @__PURE__ */ a(ke.Sub, { "data-slot": "menubar-sub", ...t });
}
function rp({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Me();
  return /* @__PURE__ */ w(
    ke.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        nr({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(no, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function ap({
  className: t,
  ...e
}) {
  const r = Me();
  return /* @__PURE__ */ a(
    ke.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: f(
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "tw:z-50 tw:min-w-32 tw:origin-(--radix-menubar-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        // CUSTOM: Apply muted background when variant is muted
        {
          "tw:bg-popover": r.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
}
const Er = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, as = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, u) => c.order - u.order).map((c) => /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ a(Rt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
        Qu,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ a(da, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ a(da, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ w(ep, { children: [
        /* @__PURE__ */ a(rp, { children: c.label }),
        /* @__PURE__ */ a(ap, { children: as(
          t,
          e,
          Ji(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ a($t, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && s < n.length - 1 && d.push(/* @__PURE__ */ a(tp, {}, `separator-${i}`)), d;
  });
};
function op({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = F(void 0), i = F(void 0), s = F(void 0), l = F(void 0), d = F(void 0), c = (u) => {
    switch (u) {
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
  if (_c(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, g) => {
    var h, k, v, x;
    u.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        Er(i, [m]);
        break;
      case "alt+p":
        (h = i.current) == null || h.focus(), Er(i, [m, p]);
        break;
      case "alt+l":
        (k = s.current) == null || k.focus(), Er(s, [m, p]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), Er(l, [m, p]);
        break;
      case "alt+h":
        (x = d.current) == null || x.focus(), Er(d, [m, p]);
        break;
    }
  }), W(() => {
    if (!r || !n.current) return;
    const u = new MutationObserver((p) => {
      p.forEach((h) => {
        if (h.attributeName === "data-state" && h.target instanceof HTMLElement) {
          const k = h.target.getAttribute("data-state");
          r(k === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((p) => {
      u.observe(p, { attributes: !0 });
    }), () => u.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(Wu, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, g]) => typeof u == "boolean" || typeof g == "boolean" ? 0 : u.order - g.order).map(([u, g]) => /* @__PURE__ */ w(Yu, { children: [
      /* @__PURE__ */ a(Ju, { ref: c(u), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ a(
        Zu,
        {
          style: { zIndex: Ar },
          children: /* @__PURE__ */ a(It, { children: as(t.groups, t.items, u, e) })
        }
      )
    ] }, u)) });
}
function sg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function lg({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: c = "default"
}) {
  const u = F(void 0);
  return /* @__PURE__ */ a(
    "div",
    {
      className: f("tw:border tw:px-4 tw:text-foreground", o),
      ref: u,
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ a(
                    op,
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
            /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
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
const np = (t, e) => t[e] ?? e;
function cg({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: d
}) {
  const c = np(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, g] = I(!1), m = (h) => {
    n && n(h), o && o([h, ...r.filter((k) => k !== h)]), i && r.find((k) => k === h) && i([...r.filter((k) => k !== h)]), g(!1);
  }, p = (h, k) => {
    var x, b, N, E, C, S;
    const v = k !== h ? ((b = (x = t[h]) == null ? void 0 : x.uiNames) == null ? void 0 : b[k]) ?? ((E = (N = t[h]) == null ? void 0 : N.uiNames) == null ? void 0 : E.en) : void 0;
    return v ? `${(C = t[h]) == null ? void 0 : C.autonym} (${v})` : (S = t[h]) == null ? void 0 : S.autonym;
  };
  return /* @__PURE__ */ w("div", { id: d, className: f("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ w(
      pr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: m,
        open: u,
        onOpenChange: (h) => g(h),
        children: [
          /* @__PURE__ */ a(gr, { children: /* @__PURE__ */ a(hr, {}) }),
          /* @__PURE__ */ a(
            fr,
            {
              style: { zIndex: Ar },
              children: Object.keys(t).map((h) => /* @__PURE__ */ a(ie, { value: h, children: p(h, e) }, h))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(zt, { className: "tw:font-normal tw:text-muted-foreground", children: Ze(c, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((h) => p(h, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function os({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    uo.Group,
    {
      "data-slot": "resizable-panel-group",
      className: f(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (i) => r(Object.values(i)) : void 0,
      ...n
    }
  );
}
function Yr(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function wa({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    uo.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Yr(t),
      minSize: Yr(e),
      maxSize: Yr(r),
      collapsedSize: Yr(o),
      ...n
    }
  );
}
function ns({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    uo.Separator,
    {
      "data-slot": "resizable-handle",
      className: f(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ a("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
function Oo({
  items: t,
  renderItem: e,
  renderDetailContent: r,
  onItemClick: o,
  selectedItemId: n,
  emptyStateMessage: i = "No items found",
  isLoading: s = !1,
  variant: l = "text",
  showSourceLanguage: d = !1,
  showTransliteration: c = !1,
  onCharacterPress: u,
  className: g
}) {
  const [m, p] = I(), h = F(null), k = n ?? m, v = U(
    () => m ? t.find(($) => $.id === m) : void 0,
    [m, t]
  ), x = U(() => t.map(($) => ({ id: $.id })), [t]), b = ($) => {
    o == null || o($), r && p($.id === m ? void 0 : $.id);
  }, N = ($) => {
    const V = t.find((L) => L.id === $.id);
    V && b(V);
  }, { listboxRef: E, activeId: C, handleKeyDown: S, focusOption: D } = Eo({
    options: x,
    onOptionSelect: N,
    onCharacterPress: u
  }), _ = () => {
    const $ = m;
    p(void 0), $ && requestAnimationFrame(() => {
      var V;
      D($), (V = E.current) == null || V.focus();
    });
  }, y = F(null);
  if (W(() => {
    if (!v) return;
    const $ = y.current;
    if (!$) return;
    const V = (L) => {
      L.key === "Escape" && (L.preventDefault(), _());
    };
    return $.addEventListener("keydown", V), () => $.removeEventListener("keydown", V);
  }, [v]), s)
    return /* @__PURE__ */ a("div", { className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", g), children: Array.from({ length: 6 }, ($, V) => /* @__PURE__ */ a(
      $r,
      {
        className: f("tw:h-12 tw:w-full tw:rounded", {
          "tw:h-20": l === "thumbnail"
        })
      },
      V
    )) });
  if (t.length === 0)
    return /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "tw:flex tw:items-center tw:justify-center tw:p-8 tw:text-sm tw:text-muted-foreground",
          g
        ),
        children: i
      }
    );
  const T = /* @__PURE__ */ a(
    "ul",
    {
      role: "listbox",
      tabIndex: 0,
      ref: E,
      "aria-activedescendant": C ?? void 0,
      className: "tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
      onKeyDown: S,
      children: t.map(($) => {
        const V = k === $.id;
        return /* @__PURE__ */ a(
          "li",
          {
            id: $.id,
            role: "option",
            "aria-selected": V,
            tabIndex: -1,
            onClick: () => b($),
            onKeyDown: (L) => {
              (L.key === "Enter" || L.key === " ") && (L.preventDefault(), b($));
            },
            className: f(
              "tw:flex tw:cursor-pointer tw:items-center tw:gap-3 tw:p-2 tw:outline-none",
              {
                "tw:bg-muted": V,
                "tw:hover:bg-muted": !V
              }
            ),
            children: e ? e($) : /* @__PURE__ */ a(
              ip,
              {
                item: $,
                variant: l,
                showSourceLanguage: d,
                showTransliteration: c
              }
            )
          },
          $.id
        );
      })
    }
  ), A = r && v ? r(v, _) : void 0;
  return /* @__PURE__ */ a("div", { ref: h, className: f("tw:relative tw:flex tw:h-full tw:overflow-hidden", g), children: A ? (
    // Side-by-side ResizablePanelGroup split per PR #2209 stories pattern: list at ~33% with
    // a draggable handle, detail at ~67%. The detail is a sibling of the list (not an overlay)
    // so all controls outside the SLI remain interactive while the detail is open.
    /* @__PURE__ */ w(os, { direction: "horizontal", className: "tw:h-full tw:w-full", children: [
      /* @__PURE__ */ a(wa, { defaultSize: 33.3333, minSize: 20, children: /* @__PURE__ */ a("div", { className: "tw:h-full tw:overflow-y-auto", children: T }) }),
      /* @__PURE__ */ a(ns, {}),
      /* @__PURE__ */ a(wa, { defaultSize: 66.6667, minSize: 30, children: /* @__PURE__ */ a(
        "div",
        {
          ref: y,
          role: "region",
          "aria-label": "Selected item details",
          className: "tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4",
          children: A
        }
      ) })
    ] })
  ) : /* @__PURE__ */ a("div", { className: "tw:h-full tw:w-full tw:overflow-y-auto", children: T }) });
}
function ip({
  item: t,
  variant: e,
  showSourceLanguage: r,
  showTransliteration: o
}) {
  return /* @__PURE__ */ w(rt, { children: [
    e === "thumbnail" && t.thumbnailUrl && /* @__PURE__ */ a(
      "img",
      {
        src: t.thumbnailUrl,
        alt: t.thumbnailAlt ?? t.primaryText,
        className: "tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"
      }
    ),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-1 tw:items-baseline tw:gap-4 tw:overflow-hidden", children: [
      /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:truncate tw:text-sm", children: t.primaryText }),
      r && t.sourceLanguageText && /* @__PURE__ */ w("span", { className: "tw:truncate tw:text-sm tw:text-muted-foreground", children: [
        t.sourceLanguageText,
        o && t.transliteration && /* @__PURE__ */ w("span", { className: "tw:ml-1", children: [
          "(",
          t.transliteration,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a(le, { className: "tw:absolute tw:bottom-0 tw:left-0 tw:right-0" })
  ] });
}
const dg = [
  "%sourceLanguageIndexedList_emptyState%",
  "%sourceLanguageIndexedList_loading%",
  "%sourceLanguageIndexedList_occurrenceCount%",
  "%sourceLanguageIndexedList_strongsCode%",
  "%sourceLanguageIndexedList_filterByDomain%",
  "%sourceLanguageIndexedList_navigationModeTree%",
  "%sourceLanguageIndexedList_navigationModeDropdown%",
  "%sourceLanguageIndexedList_backToList%"
];
function wg({
  getDescription: t,
  getBadges: e,
  getOccurrenceCount: r,
  showSourceLanguage: o = !0,
  showTransliteration: n = !0,
  ...i
}) {
  return /* @__PURE__ */ a(
    Oo,
    {
      ...i,
      showSourceLanguage: o,
      showTransliteration: n,
      renderItem: (s) => /* @__PURE__ */ a(
        sp,
        {
          item: s,
          showSourceLanguage: o,
          showTransliteration: n,
          description: t == null ? void 0 : t(s),
          badges: e == null ? void 0 : e(s),
          occurrenceCount: r == null ? void 0 : r(s)
        }
      )
    }
  );
}
function sp({
  item: t,
  showSourceLanguage: e,
  showTransliteration: r,
  description: o,
  badges: n,
  occurrenceCount: i
}) {
  return /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-0.5", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-baseline tw:gap-2", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: t.primaryText }),
      e && t.sourceLanguageText && /* @__PURE__ */ w("span", { className: "tw:text-sm tw:text-muted-foreground", children: [
        t.sourceLanguageText,
        r && t.transliteration && /* @__PURE__ */ w("span", { className: "tw:ml-1", children: [
          "(",
          t.transliteration,
          ")"
        ] })
      ] }),
      i !== void 0 && /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
        /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:ml-1 tw:cursor-help tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs", children: i }) }),
        /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: "Occurrences" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-2 tw:overflow-hidden", children: [
      o && /* @__PURE__ */ a("p", { className: "tw:truncate tw:text-sm tw:text-muted-foreground", children: o }),
      n == null ? void 0 : n.map((s) => /* @__PURE__ */ a(
        "span",
        {
          className: f("tw:shrink-0 tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs"),
          children: s
        },
        s
      ))
    ] }),
    /* @__PURE__ */ a(le, { className: "tw:mt-1" })
  ] });
}
const lp = 100, cp = 150;
function ug({
  items: t,
  renderItem: e,
  renderDetailContent: r,
  onItemClick: o,
  selectedItemId: n,
  emptyStateMessage: i,
  isLoading: s,
  domainPath: l,
  allDomains: d,
  onDomainChange: c,
  onClose: u,
  className: g
}) {
  const [m, p] = I(n), [h, k] = I(-1), v = F(null), x = F(null), [b, N] = I(!1), [E, C] = I(0);
  W(() => {
    const K = v.current;
    if (!K) return;
    const it = new ResizeObserver(([J]) => {
      const at = (J == null ? void 0 : J.contentRect.width) ?? 0;
      C(at), N(at < 350);
    });
    return it.observe(K), () => it.disconnect();
  }, []);
  const S = E > 0 ? lp / E * 100 : 20, D = E > 0 ? cp / E * 100 : 30;
  W(() => {
    var K;
    (K = x.current) == null || K.focus();
  }, []);
  const _ = P(
    (K) => {
      c(K), p(void 0);
    },
    [c]
  ), y = t.find((K) => K.id === m), T = y && !b, A = y && b, $ = P(
    (K) => {
      o == null || o(K), p(K.id === m ? void 0 : K.id);
    },
    [o, m]
  ), V = P(
    (K) => {
      if (t.length === 0) return;
      const it = m ? t.findIndex((at) => at.id === m) : -1, J = h >= 0 ? h : it;
      if (K.key === "ArrowDown") {
        K.preventDefault();
        const at = J < 0 ? 0 : Math.min(J + 1, t.length - 1);
        if (at === h) return;
        k(at), b || $(t[at]);
      } else if (K.key === "ArrowUp") {
        K.preventDefault();
        const at = J < 0 ? t.length - 1 : Math.max(J - 1, 0);
        if (at === h) return;
        k(at), b || $(t[at]);
      } else (K.key === "Enter" || K.key === " ") && b && h >= 0 && (K.preventDefault(), $(t[h]));
    },
    [t, h, b, $, m]
  ), L = P(() => {
    const K = m;
    if (p(void 0), K) {
      const it = t.findIndex((J) => J.id === K);
      it >= 0 && k(it), requestAnimationFrame(() => {
        var J;
        (J = x.current) == null || J.focus();
      });
    }
  }, [t, m]);
  W(() => {
    if (h < 0 || !x.current) return;
    const K = x.current.children[h];
    K instanceof HTMLElement && K.scrollIntoView({ block: "nearest" });
  }, [h]);
  const H = F(null);
  W(() => {
    var it;
    if (!b || !m) return;
    const K = (it = H.current) == null ? void 0 : it.querySelector("[data-back-to-list]");
    K == null || K.focus();
  }, [b, m]);
  const R = !!T;
  W(() => {
    var K;
    R && ((K = x.current) == null || K.focus());
  }, [R]);
  const pt = s ? /* @__PURE__ */ a("div", { className: "tw:p-4 tw:text-sm tw:text-muted-foreground", children: "Loading..." }) : t.length === 0 ? /* @__PURE__ */ a("div", { className: "tw:p-4 tw:text-sm tw:text-muted-foreground", children: i ?? "No items found" }) : /* @__PURE__ */ a(
    "ul",
    {
      ref: x,
      role: "listbox",
      tabIndex: 0,
      className: "tw:p-0.5 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-inset tw:focus-visible:ring-ring",
      onKeyDown: V,
      children: t.map((K, it) => {
        const J = m === K.id;
        return (
          // Keyboard activation is handled at the parent <ul role="listbox">
          // via handleListKeyDown (Arrow/Enter/Space). Each <li role="option">
          // is selected by listbox semantics, not its own keydown handler.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          /* @__PURE__ */ a(
            "li",
            {
              role: "option",
              "aria-selected": J,
              onClick: () => {
                k(-1), $(K);
              },
              className: f("tw:cursor-pointer tw:border-b tw:p-2", {
                "tw:bg-muted": J,
                "tw:hover:bg-muted": !J,
                "tw:ring-1 tw:ring-inset tw:ring-ring": h === it && !J
              }),
              children: e ? e(K) : /* @__PURE__ */ a("span", { className: "tw:text-sm", children: K.primaryText })
            },
            K.id
          )
        );
      })
    }
  );
  return /* @__PURE__ */ w("div", { className: f("tw:flex tw:h-full tw:flex-col tw:overflow-hidden", g), children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:px-2 tw:py-1.5", children: [
      /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: /* @__PURE__ */ a(
        wp,
        {
          path: l,
          allDomains: d,
          onDomainSelect: _
        }
      ) }),
      u && /* @__PURE__ */ w(G, { variant: "ghost", size: "sm", className: "tw:shrink-0 tw:gap-1", onClick: u, children: [
        /* @__PURE__ */ a(io, { className: "tw:h-4 tw:w-4" }),
        "Back"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { ref: v, className: "tw:relative tw:flex tw:flex-1 tw:overflow-hidden", children: dp({
      showSideBySide: !!T,
      showFullDetail: !!A,
      listElement: pt,
      detailElement: y && r ? r(y, L) : void 0,
      listMinPct: S,
      detailMinPct: D,
      detailPanelRef: H
    }) })
  ] });
}
function dp({
  showSideBySide: t,
  showFullDetail: e,
  listElement: r,
  detailElement: o,
  listMinPct: n,
  detailMinPct: i,
  detailPanelRef: s
}) {
  return t && o !== void 0 ? /* @__PURE__ */ w(os, { direction: "horizontal", children: [
    /* @__PURE__ */ a(wa, { defaultSize: 33.3333, minSize: n, children: /* @__PURE__ */ a("div", { className: "tw:h-full tw:overflow-y-auto", children: r }) }),
    /* @__PURE__ */ a(ns, {}),
    /* @__PURE__ */ a(wa, { defaultSize: 66.6667, minSize: i, children: /* @__PURE__ */ a("div", { className: "tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4", children: o }) })
  ] }) : e && o !== void 0 ? /* @__PURE__ */ a(
    "div",
    {
      ref: s,
      className: "tw:h-full tw:w-full tw:overflow-y-auto tw:bg-background tw:p-4",
      children: o
    }
  ) : /* @__PURE__ */ a("div", { className: "tw:h-full tw:w-full tw:overflow-y-auto", children: r });
}
function wp({
  path: t,
  allDomains: e,
  onDomainSelect: r
}) {
  var p, h, k;
  const o = F(null), n = F(null), [i, s] = I(0);
  W(() => {
    const v = o.current, x = n.current;
    if (!v || !x) return;
    const b = () => {
      const E = v.clientWidth, C = Array.from(x.children).filter(
        (T) => T instanceof HTMLElement
      );
      if (C.length === 0) return;
      if (C.reduce((T, A) => T + A.offsetWidth, 0) <= E - 4) {
        s(0);
        return;
      }
      const D = C.map((T) => T.offsetWidth), _ = t.length, y = 44;
      for (let T = 1; T < _; T += 1) {
        let A = y;
        if (T < _ - 1) {
          A += D[0] ?? 0;
          for (let $ = T + 1; $ < _; $ += 1) A += D[$] ?? 0;
        } else
          A += D[_ - 1] ?? 0;
        if (A <= E - 4) {
          s(T);
          return;
        }
      }
      s(_ - 1);
    }, N = new ResizeObserver(b);
    return N.observe(v), b(), () => N.disconnect();
  }, [t]);
  const l = i > 0, d = i >= t.length - 1, u = l ? d ? t.slice(0, -1) : t.slice(1, i + 1) : [], g = u.map((v) => v.label).join(" > "), m = ((p = u[0]) == null ? void 0 : p.id) ?? ((h = t[0]) == null ? void 0 : h.id);
  return /* @__PURE__ */ w("div", { ref: o, className: "tw:overflow-hidden", children: [
    /* @__PURE__ */ a(
      "div",
      {
        ref: n,
        className: "tw:pointer-events-none tw:invisible tw:absolute tw:flex tw:items-center tw:gap-0.5 tw:whitespace-nowrap",
        "aria-hidden": !0,
        children: t.map((v, x) => /* @__PURE__ */ w("span", { className: "tw:flex tw:shrink-0 tw:items-center tw:gap-0.5", children: [
          x > 0 && /* @__PURE__ */ a(Fe, { className: "tw:h-3 tw:w-3" }),
          /* @__PURE__ */ a("span", { className: "tw:px-1.5 tw:py-1 tw:text-sm", children: v.label })
        ] }, v.id))
      }
    ),
    /* @__PURE__ */ w("div", { className: "tw:inline-flex tw:items-center tw:gap-0.5", children: [
      !d && t[0] && /* @__PURE__ */ a(
        Aa,
        {
          label: t[0].label,
          isLast: t.length === 1,
          allDomains: e,
          currentPath: t,
          expandToId: t[0].id,
          onDomainSelect: r
        }
      ),
      l && /* @__PURE__ */ w(rt, { children: [
        !d && /* @__PURE__ */ a(Fe, { className: "tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" }),
        /* @__PURE__ */ a(It, { delayDuration: 0, children: /* @__PURE__ */ w(Dt, { children: [
          /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a("span", { children: /* @__PURE__ */ a(
            Aa,
            {
              label: /* @__PURE__ */ a(Mn, { className: "tw:h-3 tw:w-3" }),
              isLast: !1,
              allDomains: e,
              currentPath: t,
              expandToId: m ?? ((k = t[0]) == null ? void 0 : k.id) ?? "",
              onDomainSelect: r,
              isEllipsis: !0
            }
          ) }) }),
          /* @__PURE__ */ a($t, { side: "bottom", children: /* @__PURE__ */ a("p", { className: "tw:text-xs", children: g }) })
        ] }) })
      ] }),
      t.map((v, x) => {
        if (x === 0) return;
        const b = x === t.length - 1;
        if (!(x <= i && !b))
          return /* @__PURE__ */ w("span", { className: "tw:flex tw:shrink-0 tw:items-center tw:gap-0.5", children: [
            /* @__PURE__ */ a(Fe, { className: "tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" }),
            /* @__PURE__ */ a(
              Aa,
              {
                label: v.label,
                isLast: b,
                allDomains: e,
                currentPath: t,
                expandToId: v.id,
                onDomainSelect: r
              }
            )
          ] }, v.id);
      })
    ] })
  ] });
}
function Aa({
  label: t,
  isLast: e,
  allDomains: r,
  currentPath: o,
  expandToId: n,
  onDomainSelect: i,
  isEllipsis: s = !1
}) {
  const [l, d] = I(!1), c = P(
    (u) => {
      i(u), d(!1);
    },
    [i]
  );
  return /* @__PURE__ */ w(ce, { open: l, onOpenChange: d, modal: !0, children: [
    /* @__PURE__ */ a(de, { asChild: !0, children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: f(
          "tw:shrink-0 tw:cursor-pointer tw:rounded tw:text-sm tw:hover:bg-muted",
          s ? "tw:flex tw:items-center tw:px-1 tw:py-1" : "tw:px-1.5 tw:py-1",
          e && !s && "tw:font-bold"
        ),
        children: t
      }
    ) }),
    /* @__PURE__ */ a(
      we,
      {
        align: "start",
        className: "tw:max-h-[500px] tw:w-[300px] tw:overflow-y-auto tw:p-1",
        style: { zIndex: si + 10 },
        onEscapeKeyDown: (u) => {
          u.stopPropagation(), u.preventDefault(), d(!1);
        },
        onKeyDown: (u) => {
          u.key === "Escape" && u.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          up,
          {
            domains: r,
            currentPath: o,
            expandToId: n,
            onSelect: c,
            onClose: () => d(!1)
          }
        )
      }
    )
  ] });
}
function up({
  domains: t,
  currentPath: e,
  expandToId: r,
  onSelect: o,
  onClose: n
}) {
  const i = F(null), s = F(null);
  W(() => {
    const x = requestAnimationFrame(() => {
      var b;
      (b = s.current) == null || b.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(x);
  }, [r]);
  const l = () => i.current ? Array.from(i.current.querySelectorAll("button")) : [], d = (x) => {
    const b = l();
    if (b.length === 0) return;
    const N = document.activeElement;
    let C = (N instanceof HTMLButtonElement ? b.indexOf(N) : -1) + x;
    C < 0 && (C = b.length - 1), C >= b.length && (C = 0), b[C].focus();
  }, c = (x) => {
    const b = l();
    b.length !== 0 && b[x === "first" ? 0 : b.length - 1].focus();
  }, u = (x) => {
    let b = x;
    for (; b && b !== i.current; ) {
      if (b instanceof HTMLLIElement && b.getAttribute("role") === "treeitem") return b;
      b = b.parentElement;
    }
  }, g = (x) => {
    if (!x) return;
    const b = x.querySelector(":scope > div > button");
    b == null || b.focus();
  }, m = (x) => {
    const b = x.querySelector(':scope > ul[role="group"]');
    return b ? Array.from(b.children).filter(
      (N) => N instanceof HTMLLIElement && N.getAttribute("role") === "treeitem"
    ) : [];
  }, p = (x) => {
    const b = x.parentElement;
    if (!(b instanceof HTMLUListElement) || b.getAttribute("role") !== "group") return;
    const N = b.parentElement;
    return N instanceof HTMLLIElement && N.getAttribute("role") === "treeitem" ? N : void 0;
  }, h = (x) => {
    const b = x.getAttribute("aria-expanded");
    if (b === "false") {
      const N = x.querySelector(":scope > div > button");
      N == null || N.click();
    } else if (b === "true") {
      const [N] = m(x);
      g(N);
    }
  }, k = (x) => {
    if (x.getAttribute("aria-expanded") === "true") {
      const N = x.querySelector(":scope > div > button");
      N == null || N.click();
    } else
      g(p(x));
  };
  return (
    // Custom keyboard nav handler attached for arrow/Tab/Escape; element wraps
    // a tree of buttons that retain individual focusability.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ a("div", { ref: i, onKeyDown: (x) => {
      switch (x.key) {
        case "ArrowDown":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), d(1);
          break;
        case "ArrowUp":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), d(-1);
          break;
        case "ArrowRight": {
          const b = u(document.activeElement);
          if (!b) break;
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), h(b);
          break;
        }
        case "ArrowLeft": {
          const b = u(document.activeElement);
          if (!b) break;
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), k(b);
          break;
        }
        case "Home":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), c("first");
          break;
        case "End":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), c("last");
          break;
        case "Tab":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), d(x.shiftKey ? -1 : 1);
          break;
        case "Escape":
          x.preventDefault(), x.stopPropagation(), x.nativeEvent.stopImmediatePropagation(), n();
          break;
      }
    }, children: /* @__PURE__ */ a(
      ss,
      {
        domains: t,
        currentPath: e,
        expandToId: r,
        onSelect: o,
        parentPath: [],
        scrollRef: s,
        isRoot: !0
      }
    ) })
  );
}
function is(t, e) {
  var r;
  return t.id === e ? !0 : ((r = t.children) == null ? void 0 : r.some((o) => is(o, e))) ?? !1;
}
function ss({
  domains: t,
  currentPath: e,
  expandToId: r,
  onSelect: o,
  parentPath: n,
  scrollRef: i,
  isRoot: s = !1
}) {
  const l = n.length;
  return /* @__PURE__ */ a(
    "ul",
    {
      role: s ? "tree" : "group",
      "aria-label": s ? "Semantic domain tree" : void 0,
      className: f("tw:space-y-0.5", { "tw:ml-3": n.length > 0 }),
      children: t.map((d) => {
        const c = [...n, d], u = d.id === r, g = d.children && d.children.length > 0, p = is(d, r) && d.id !== r, h = d.id === r;
        return /* @__PURE__ */ a(
          pp,
          {
            domain: d,
            thisPath: c,
            depth: l,
            isSelected: u,
            hasChildren: g ?? !1,
            defaultExpanded: p,
            currentPath: e,
            expandToId: r,
            onSelect: o,
            scrollRef: i,
            isScrollTarget: h
          },
          d.id
        );
      })
    }
  );
}
function pp({
  domain: t,
  thisPath: e,
  depth: r,
  isSelected: o,
  hasChildren: n,
  defaultExpanded: i,
  currentPath: s,
  expandToId: l,
  onSelect: d,
  scrollRef: c,
  isScrollTarget: u
}) {
  const [g, m] = I(i);
  W(() => {
    i && m(!0);
  }, [i]);
  const p = r === 0 && n, h = n ? g : void 0;
  return /* @__PURE__ */ w(
    "li",
    {
      role: "treeitem",
      "aria-level": r + 1,
      "aria-selected": o,
      "aria-expanded": h,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-0.5", children: p ? (
          // Combined chevron + label button. Clicking ONLY expands/collapses; it does not
          // call onSelect. This avoids the bug where clicking a top-level domain selected
          // it (and the parent path collapsed because the new path was rooted elsewhere).
          /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              ref: u ? c : void 0,
              className: f(
                "tw:flex tw:flex-1 tw:items-center tw:gap-0.5 tw:rounded tw:px-1.5 tw:py-0.5 tw:text-left tw:text-sm tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring",
                o ? "tw:bg-accent tw:font-medium" : "tw:hover:bg-muted"
              ),
              "aria-expanded": g,
              onClick: () => m(!g),
              children: [
                /* @__PURE__ */ a(
                  Fe,
                  {
                    className: f("tw:h-3 tw:w-3 tw:shrink-0 tw:transition-transform", {
                      "tw:rotate-90": g
                    })
                  }
                ),
                /* @__PURE__ */ a("span", { children: t.label })
              ]
            }
          )
        ) : /* @__PURE__ */ w(rt, { children: [
          n ? /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "tw:flex tw:h-5 tw:w-5 tw:shrink-0 tw:items-center tw:justify-center tw:rounded tw:hover:bg-muted tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring",
              "aria-expanded": g,
              "aria-label": g ? "Collapse" : "Expand",
              onClick: () => m(!g),
              children: /* @__PURE__ */ a(
                Fe,
                {
                  className: f("tw:h-3 tw:w-3 tw:transition-transform", {
                    "tw:rotate-90": g
                  })
                }
              )
            }
          ) : /* @__PURE__ */ a("span", { className: "tw:w-5 tw:shrink-0" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              ref: u ? c : void 0,
              className: f(
                "tw:flex-1 tw:rounded tw:px-1.5 tw:py-0.5 tw:text-left tw:text-sm tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring",
                o ? "tw:bg-accent tw:font-medium" : "tw:hover:bg-muted tw:hover:underline"
              ),
              onClick: () => d(e),
              children: t.label
            }
          )
        ] }) }),
        g && t.children && t.children.length > 0 && /* @__PURE__ */ a(
          ss,
          {
            domains: t.children,
            currentPath: s,
            expandToId: l,
            onSelect: d,
            parentPath: e,
            scrollRef: c
          }
        )
      ]
    }
  );
}
function pg({
  showSourceLanguage: t = !0,
  showTransliteration: e = !0,
  ...r
}) {
  return /* @__PURE__ */ a(
    Oo,
    {
      ...r,
      showSourceLanguage: t,
      showTransliteration: e,
      renderItem: (o) => /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-0.5", children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: o.primaryText }),
          t && o.sourceLanguageText && /* @__PURE__ */ w("span", { className: "tw:text-sm tw:text-muted-foreground", children: [
            o.sourceLanguageText,
            e && o.transliteration && /* @__PURE__ */ w("span", { className: "tw:ml-1", children: [
              "(",
              o.transliteration,
              ")"
            ] })
          ] })
        ] }),
        o.teaserText && /* @__PURE__ */ a("p", { className: "tw:line-clamp-2 tw:text-xs tw:text-muted-foreground", children: o.teaserText }),
        /* @__PURE__ */ a(le, { className: "tw:mt-1" })
      ] })
    }
  );
}
function hg({
  showSourceLanguage: t = !0,
  showTransliteration: e = !1,
  ...r
}) {
  return /* @__PURE__ */ a(
    Oo,
    {
      ...r,
      variant: "thumbnail",
      showSourceLanguage: t,
      showTransliteration: e,
      renderItem: (o) => /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:items-center tw:gap-3", children: [
        o.thumbnailUrl && /* @__PURE__ */ a(
          "img",
          {
            src: o.thumbnailUrl,
            alt: o.thumbnailAlt ?? o.primaryText,
            className: "tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"
          }
        ),
        !o.thumbnailUrl && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-14 tw:w-14 tw:shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-muted", children: /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-muted-foreground", children: o.mediaType === "map" ? "Map" : "Img" }) }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-hidden", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-baseline tw:gap-2", children: [
            /* @__PURE__ */ a("span", { className: "tw:truncate tw:text-sm tw:font-medium", children: o.primaryText }),
            /* @__PURE__ */ a(ye, { variant: "outline", className: "tw:shrink-0 tw:text-xs", children: o.mediaType })
          ] }),
          t && o.sourceLanguageText && /* @__PURE__ */ w("span", { className: "tw:truncate tw:text-xs tw:text-muted-foreground", children: [
            o.sourceLanguageText,
            e && o.transliteration && /* @__PURE__ */ w("span", { className: "tw:ml-1", children: [
              "(",
              o.transliteration,
              ")"
            ] })
          ] }),
          o.caption && /* @__PURE__ */ a("p", { className: "tw:truncate tw:text-xs tw:text-muted-foreground", children: o.caption })
        ] }),
        /* @__PURE__ */ a(le, { className: "tw:absolute tw:bottom-0 tw:left-0 tw:right-0" })
      ] })
    }
  );
}
function gg({
  items: t,
  onItemClick: e,
  selectedItemId: r,
  emptyStateMessage: o = "No entries found",
  isLoading: n = !1,
  onCharacterPress: i,
  className: s,
  occurrenceCountLabel: l = "Occurrences",
  strongsCodeLabel: d = "Strong's code"
}) {
  const c = U(() => t.map((h) => ({ id: h.id })), [t]), u = (h) => {
    const k = t.find((v) => v.id === h.id);
    k && (e == null || e(k));
  }, { listboxRef: g, activeId: m, handleKeyDown: p } = Eo({
    options: c,
    onOptionSelect: u,
    onCharacterPress: i
  });
  return n ? /* @__PURE__ */ a("div", { className: f("tw:flex tw:flex-col tw:gap-2 tw:p-2", s), children: Array.from({ length: 6 }, (h, k) => /* @__PURE__ */ a(
    $r,
    {
      className: "tw:h-12 tw:w-full tw:rounded"
    },
    k
  )) }) : t.length === 0 ? /* @__PURE__ */ a(
    "div",
    {
      className: f(
        "tw:flex tw:items-center tw:justify-center tw:p-8 tw:text-sm tw:text-muted-foreground",
        s
      ),
      children: o
    }
  ) : /* @__PURE__ */ a("div", { className: f("tw:overflow-y-auto tw:px-2 tw:py-2", s), children: /* @__PURE__ */ a(
    "ul",
    {
      role: "listbox",
      tabIndex: 0,
      ref: g,
      "aria-activedescendant": m ?? void 0,
      className: "tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
      onKeyDown: p,
      children: t.map((h) => {
        const k = r === h.id;
        return /* @__PURE__ */ w("div", { children: [
          /* @__PURE__ */ w(
            "li",
            {
              role: "option",
              "aria-selected": k,
              id: h.id,
              onClick: () => e == null ? void 0 : e(h),
              className: f(
                "tw:flex tw:flex-col tw:p-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
                {
                  "tw:bg-muted": k,
                  "tw:hover:bg-muted": !k
                }
              ),
              tabIndex: -1,
              children: [
                /* @__PURE__ */ w("div", { className: "tw:flex tw:items-baseline tw:gap-2", children: [
                  /* @__PURE__ */ a("span", { className: "scripture-font tw:text-sm", children: h.primaryText }),
                  /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
                    /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:ml-1 tw:cursor-help tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs", children: h.occurrenceCount }) }),
                    /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: l }) })
                  ] }) })
                ] }),
                /* @__PURE__ */ w("div", { className: "tw:mt-0.5 tw:flex tw:items-center tw:gap-2 tw:overflow-hidden", children: [
                  /* @__PURE__ */ a("p", { className: "tw:truncate tw:text-sm tw:text-muted-foreground", children: h.glosses }),
                  h.strongsCodes.map((v) => /* @__PURE__ */ a(It, { children: /* @__PURE__ */ w(Dt, { children: [
                    /* @__PURE__ */ a(Rt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:ml-1 tw:shrink-0 tw:cursor-help tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs", children: v }) }),
                    /* @__PURE__ */ a($t, { children: /* @__PURE__ */ a("p", { children: d }) })
                  ] }) }, v))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ a(le, {})
        ] }, h.id);
      })
    }
  ) });
}
function hp({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(zt, { children: e(t) }) : r ? /* @__PURE__ */ a(zt, { children: r(t) }) : /* @__PURE__ */ a(zt, { children: t });
}
function fg({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ w("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      Hi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => n(l, d)
      }
    ),
    /* @__PURE__ */ a(
      hp,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function mg({
  scrRef: t,
  onClick: e,
  tooltipContent: r,
  ariaLabel: o,
  className: n,
  testId: i = "linked-scr-ref-button"
}) {
  if (t === "") return;
  const s = /* @__PURE__ */ a(
    G,
    {
      type: "button",
      variant: "link",
      onClick: e,
      disabled: !e,
      "aria-label": o,
      className: f(
        // Tight, inline link-button styling — no extra padding / height. Consumers can override
        // typography (font, size) via the `className` prop.
        "tw:h-auto tw:p-0 tw:text-start tw:font-mono tw:text-sm",
        n
      ),
      "data-testid": i,
      children: t
    }
  );
  return r ? /* @__PURE__ */ a(It, { delayDuration: 0, children: /* @__PURE__ */ w(Dt, { children: [
    /* @__PURE__ */ a(Rt, { asChild: !0, children: s }),
    /* @__PURE__ */ a($t, { children: r })
  ] }) }) : s;
}
function vg({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: d,
  dropdownContent: c,
  additionalContent: u,
  accentColor: g,
  showDropdownOnHover: m = !1
}) {
  return /* @__PURE__ */ w(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), r());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: f(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            !e && m && c && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ w(ce, { children: [
              /* @__PURE__ */ a(de, { className: f(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(G, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ho, {}) }) }),
              /* @__PURE__ */ a(we, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ w(ce, { children: [
              /* @__PURE__ */ a(de, { className: f(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(G, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ho, {}) }) }),
              /* @__PURE__ */ a(we, { align: "end", children: c })
            ] })
          ] }),
          u && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: u })
        ] }),
        g && /* @__PURE__ */ a(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${g}`
          }
        )
      ]
    },
    t
  );
}
const gp = pa(({ className: t, ...e }, r) => /* @__PURE__ */ a(xl, { size: 35, className: f("tw:animate-spin", t), ...e, ref: r }));
gp.displayName = "Spinner";
function bg({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: d,
  defaultValue: c,
  value: u,
  onChange: g,
  onFocus: m,
  onBlur: p
}) {
  return /* @__PURE__ */ w("div", { className: f("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      zt,
      {
        htmlFor: t,
        className: f({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Mr,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: f(d, { "tw:border-red-600": r }),
        defaultValue: c,
        value: u,
        onChange: g,
        onFocus: m,
        onBlur: p
      }
    ),
    /* @__PURE__ */ a("p", { className: f({ "tw:hidden": !n }), children: n })
  ] });
}
const fp = Ne(
  // CUSTOM: Added img arbitrary selectors alongside existing svg selectors so that <img> elements
  // (or SVGs loaded from file) can be used as icons in the same position as inline <svg> icons.
  // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
  // Note: the new shadcn baseline changed the layout model significantly (grid + data-slot).
  // The svg selectors are now *:[svg]:... style. We add equivalent *:[img]:... selectors.
  "tw:group/alert tw:relative tw:grid tw:w-full tw:gap-0.5 tw:rounded-lg tw:border tw:px-2.5 tw:py-2 tw:text-start tw:text-sm tw:has-data-[slot=alert-action]:relative tw:has-data-[slot=alert-action]:pe-18 tw:has-[>svg]:grid-cols-[auto_1fr] tw:has-[>svg]:gap-x-2 tw:*:[svg]:row-span-2 tw:*:[svg]:translate-y-0.5 tw:*:[svg]:text-current tw:*:[svg:not([class*=size-])]:size-4 tw:has-[>img]:grid-cols-[auto_1fr] tw:has-[>img]:gap-x-2 tw:*:[img]:row-span-2 tw:*:[img]:translate-y-0.5 tw:*:[img]:text-current tw:*:[img:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-card tw:text-card-foreground",
        destructive: (
          // CUSTOM: Added tw:*:[img]:text-current alongside existing svg selector so that <img>
          // elements (or SVGs from file) display destructive color in the destructive variant.
          // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
          "tw:bg-card tw:text-destructive tw:*:data-[slot=alert-description]:text-destructive/90 tw:*:[svg]:text-current tw:*:[img]:text-current"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function xg({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        fp({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function yg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-title",
      className: f(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function kg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-description",
      className: f(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function Ng({ ...t }) {
  return /* @__PURE__ */ a(Lt.Root, { "data-slot": "context-menu", ...t });
}
function _g({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: f("tw:select-none", t),
      ...e
    }
  );
}
function Cg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Group, { "data-slot": "context-menu-group", ...t });
}
function Eg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Tg({ ...t }) {
  return /* @__PURE__ */ a(Lt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function zg({
  ...t
}) {
  return /* @__PURE__ */ a(Lt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function Sg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(Lt.Portal, { children: /* @__PURE__ */ a(
    Lt.Content,
    {
      "data-slot": "context-menu-content",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...e
    }
  ) });
}
function Ig({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Lt.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function Dg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ w(
    Lt.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(no, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Rg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...e
    }
  );
}
function $g({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ w(
    Lt.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Lt.ItemIndicator, { children: /* @__PURE__ */ a(ar, {}) }) }),
        e
      ]
    }
  );
}
function Og({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ w(
    Lt.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Lt.ItemIndicator, { children: /* @__PURE__ */ a(ar, {}) }) }),
        e
      ]
    }
  );
}
function Ag({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Lt.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Mg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Lt.Separator,
    {
      "data-slot": "context-menu-separator",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Lg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Pg({ ...t }) {
  return /* @__PURE__ */ a(qe.Root, { "data-slot": "drawer", ...t });
}
function jg({ ...t }) {
  return /* @__PURE__ */ a(qe.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function mp({ ...t }) {
  return /* @__PURE__ */ a(qe.Portal, { "data-slot": "drawer-portal", ...t });
}
function Vg({ ...t }) {
  return /* @__PURE__ */ a(qe.Close, { "data-slot": "drawer-close", ...t });
}
function vp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qe.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      ...e
    }
  );
}
function Bg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = kt();
  return /* @__PURE__ */ w(mp, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(vp, {}),
    /* @__PURE__ */ w(
      qe.Content,
      {
        "data-slot": "drawer-content",
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          // CUSTOM: Changed left/right drawer positioning from logical (start-0/end-0,
          // rounded-e/s-xl, border-e/s) to physical (left-0/right-0, rounded-r/l-xl, border-r/l).
          // Vaul's slide animation is physical, so logical properties in RTL caused the drawer to
          // appear on the wrong side and cover most of the screen.
          // CUSTOM: Added tw:data-[vaul-drawer-direction=left/right]:flex-row so the drag handle
          // sits on the open edge of left/right drawers instead of at the top.
          "pr-twp tw:group/drawer-content tw:fixed tw:z-50 tw:flex tw:h-auto tw:flex-col tw:bg-popover tw:text-sm tw:text-popover-foreground tw:data-[vaul-drawer-direction=bottom]:inset-x-0 tw:data-[vaul-drawer-direction=bottom]:bottom-0 tw:data-[vaul-drawer-direction=bottom]:mt-24 tw:data-[vaul-drawer-direction=bottom]:max-h-[80vh] tw:data-[vaul-drawer-direction=bottom]:rounded-t-xl tw:data-[vaul-drawer-direction=bottom]:border-t tw:data-[vaul-drawer-direction=left]:inset-y-0 tw:data-[vaul-drawer-direction=left]:left-0 tw:data-[vaul-drawer-direction=left]:w-3/4 tw:data-[vaul-drawer-direction=left]:rounded-r-xl tw:data-[vaul-drawer-direction=left]:border-r tw:data-[vaul-drawer-direction=left]:flex-row tw:data-[vaul-drawer-direction=right]:inset-y-0 tw:data-[vaul-drawer-direction=right]:right-0 tw:data-[vaul-drawer-direction=right]:w-3/4 tw:data-[vaul-drawer-direction=right]:rounded-l-xl tw:data-[vaul-drawer-direction=right]:border-l tw:data-[vaul-drawer-direction=right]:flex-row tw:data-[vaul-drawer-direction=top]:inset-x-0 tw:data-[vaul-drawer-direction=top]:top-0 tw:data-[vaul-drawer-direction=top]:mb-24 tw:data-[vaul-drawer-direction=top]:max-h-[80vh] tw:data-[vaul-drawer-direction=top]:rounded-b-xl tw:data-[vaul-drawer-direction=top]:border-b tw:data-[vaul-drawer-direction=left]:sm:max-w-sm tw:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          t
        ),
        dir: "ltr",
        ...o,
        children: [
          !r && /* @__PURE__ */ a("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mt-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:block tw:group-data-[vaul-drawer-direction=right]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=right]/drawer-content:ms-4 tw:group-data-[vaul-drawer-direction=right]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=right]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=right]/drawer-content:block" }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col", dir: n, children: e }),
          !r && /* @__PURE__ */ a("div", { className: "tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" })
        ]
      }
    )
  ] });
}
function Fg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function Gg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        t
      ),
      ...e
    }
  );
}
function Ug({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    qe.Title,
    {
      "data-slot": "drawer-title",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Kg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qe.Description,
    {
      "data-slot": "drawer-description",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function qg({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Bo.Root,
    {
      "data-slot": "progress",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Bo.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Hg({ ...t }) {
  const { theme: e = "system" } = Cc();
  return /* @__PURE__ */ a(
    Ec,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Os, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a($s, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Rs, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Ds, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Is, { className: "tw:size-4 tw:animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
        classNames: {
          toast: "cn-toast"
        }
      },
      ...t
    }
  );
}
function Wg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = kt(), l = nt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ w(
    Gr.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: f(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          Gr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Gr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: l.length }, (d, c) => /* @__PURE__ */ a(
          Gr.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
          },
          c
        ))
      ]
    }
  );
}
function Yg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Fo.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Fo.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Xg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    ue.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: f("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const bp = Ne(
  "tw:group/tabs-list tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:rounded-lg tw:p-[3px] tw:text-muted-foreground tw:group-data-horizontal/tabs:h-8 tw:group-data-vertical/tabs:h-fit tw:group-data-vertical/tabs:flex-col tw:data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "tw:bg-muted",
        line: "tw:gap-1 tw:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Jg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = kt();
  return /* @__PURE__ */ a(
    ue.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: f("pr-twp", bp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Zg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: f(
        "pr-twp tw:relative tw:inline-flex tw:h-[calc(100%-1px)] tw:flex-1 tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-md tw:border tw:border-transparent tw:px-1.5 tw:py-0.5 tw:text-sm tw:font-medium tw:whitespace-nowrap tw:text-foreground/60 tw:transition-all tw:group-data-vertical/tabs:w-full tw:group-data-vertical/tabs:justify-start tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:focus-visible:outline-1 tw:focus-visible:outline-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:has-data-[icon=inline-end]:pe-1 tw:has-data-[icon=inline-start]:ps-1 tw:dark:text-muted-foreground tw:dark:hover:text-foreground tw:group-data-[variant=default]/tabs-list:data-active:shadow-sm tw:group-data-[variant=line]/tabs-list:data-active:shadow-none tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        "tw:group-data-[variant=line]/tabs-list:bg-transparent tw:group-data-[variant=line]/tabs-list:data-active:bg-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "tw:data-active:bg-background tw:data-active:text-foreground tw:dark:data-active:border-input tw:dark:data-active:bg-input/30 tw:dark:data-active:text-foreground",
        "tw:after:absolute tw:after:bg-foreground tw:after:opacity-0 tw:after:transition-opacity tw:group-data-horizontal/tabs:after:inset-x-0 tw:group-data-horizontal/tabs:after:bottom-[-5px] tw:group-data-horizontal/tabs:after:h-0.5 tw:group-data-vertical/tabs:after:inset-y-0 tw:group-data-vertical/tabs:after:-end-1 tw:group-data-vertical/tabs:after:w-0.5 tw:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        t
      ),
      ...e
    }
  );
}
function Qg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ue.Content,
    {
      "data-slot": "tabs-content",
      className: f("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const tf = (t, e) => {
  W(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function xp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const yp = (t, e, r = {}) => {
  const o = F(e);
  o.current = e;
  const n = F(r);
  n.current = xp(n.current);
  const [i, s] = I(() => o.current), [l, d] = I(!0);
  return W(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const u = await t();
        c && (s(() => u), d(!1));
      }
    })(), () => {
      c = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, Ma = () => !1, ef = (t, e) => {
  const [r] = yp(
    P(async () => {
      if (!t) return Ma;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Ma,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  W(() => () => {
    r !== Ma && r();
  }, [r]);
};
function rf(t) {
  W(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function kp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
kp(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:"IBM Plex Sans Variable", sans-serif;--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:calc(var(--spacing));--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-ease-in-out:cubic-bezier(.4, 0, .2, 1);--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-3{margin-left:calc(calc(var(--spacing)) * 3)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:max-h-\\[500px\\]{max-height:500px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\[var\\(--radix-popper-anchor-width\\,280px\\)\\]{width:var(--radix-popper-anchor-width,280px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[280px\\]{max-width:280px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[200px\\]{min-width:200px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-90{rotate:90deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-help{cursor:help}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-0\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * .5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * .5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-accent-foreground{background-color:var(--accent-foreground)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-card-foreground{background-color:var(--card-foreground)}.tw\\:bg-destructive-foreground{background-color:var(--destructive-foreground)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted{background-color:var(--muted)}.tw\\:bg-muted-foreground{background-color:var(--muted-foreground)}.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-popover-foreground{background-color:var(--popover-foreground)}.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-secondary-foreground{background-color:var(--secondary-foreground)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent{color:var(--accent)}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card{color:var(--card)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted{color:var(--muted)}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover{color:var(--popover)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary{color:var(--secondary)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring,.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:ring-inset{--tw-ring-inset:inset}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  xg as Alert,
  kg as AlertDescription,
  yg as AlertTitle,
  yw as Avatar,
  kw as AvatarFallback,
  uh as AvatarImage,
  eh as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  rh as BOOK_SELECTOR_STRING_KEYS,
  ye as Badge,
  ka as BookChapterControl,
  Ja as BookSelectionMode,
  ah as BookSelector,
  G as Button,
  _o as ButtonGroup,
  Fi as ButtonGroupSeparator,
  oh as ButtonGroupText,
  Gi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  ih as COMMENT_EDITOR_STRING_KEYS,
  sh as COMMENT_LIST_STRING_KEYS,
  Ui as CancelAcceptButtons,
  bw as Card,
  xw as CardContent,
  dh as CardDescription,
  wh as CardFooter,
  lh as CardHeader,
  ch as CardTitle,
  Wc as ChapterRangeSelector,
  Hi as Checkbox,
  fg as Checklist,
  nn as ComboBox,
  $e as Command,
  Lr as CommandEmpty,
  be as CommandGroup,
  vr as CommandInput,
  _e as CommandItem,
  Oe as CommandList,
  nh as CommentEditor,
  hh as CommentList,
  Ng as ContextMenu,
  $g as ContextMenuCheckboxItem,
  Sg as ContextMenuContent,
  Cg as ContextMenuGroup,
  Ig as ContextMenuItem,
  Ag as ContextMenuLabel,
  Eg as ContextMenuPortal,
  zg as ContextMenuRadioGroup,
  Og as ContextMenuRadioItem,
  Mg as ContextMenuSeparator,
  Lg as ContextMenuShortcut,
  Tg as ContextMenuSub,
  Rg as ContextMenuSubContent,
  Dg as ContextMenuSubTrigger,
  _g as ContextMenuTrigger,
  jw as DataTable,
  qa as Dialog,
  Wp as DialogClose,
  Ha as DialogContent,
  Yp as DialogDescription,
  tn as DialogFooter,
  Wa as DialogHeader,
  Oc as DialogOverlay,
  $c as DialogPortal,
  Ya as DialogTitle,
  Hp as DialogTrigger,
  Pg as Drawer,
  Vg as DrawerClose,
  Bg as DrawerContent,
  Kg as DrawerDescription,
  Gg as DrawerFooter,
  Fg as DrawerHeader,
  vp as DrawerOverlay,
  mp as DrawerPortal,
  Ug as DrawerTitle,
  jg as DrawerTrigger,
  ce as DropdownMenu,
  fe as DropdownMenuCheckboxItem,
  we as DropdownMenuContent,
  Ki as DropdownMenuGroup,
  Qe as DropdownMenuItem,
  Zw as DropdownMenuItemType,
  er as DropdownMenuLabel,
  Nw as DropdownMenuPortal,
  _w as DropdownMenuRadioGroup,
  Cw as DropdownMenuRadioItem,
  Ue as DropdownMenuSeparator,
  ph as DropdownMenuShortcut,
  Ew as DropdownMenuSub,
  zw as DropdownMenuSubContent,
  Tw as DropdownMenuSubTrigger,
  de as DropdownMenuTrigger,
  Xw as ERROR_DUMP_STRING_KEYS,
  xh as ERROR_POPOVER_STRING_KEYS,
  au as EditorKeyboardShortcuts,
  ug as ErDictionaryFilteredList,
  wg as ErDictionaryList,
  pg as ErEncyclopediaList,
  hg as ErMediaList,
  Jw as ErrorDump,
  yh as ErrorPopover,
  Th as FOOTNOTE_EDITOR_STRING_KEYS,
  Ch as Filter,
  kh as FilterDropdown,
  _h as Footer,
  Eh as FootnoteEditor,
  vu as FootnoteItem,
  zh as FootnoteList,
  Ah as INVENTORY_STRING_KEYS,
  Mr as Input,
  Mh as Inventory,
  Cn as Kbd,
  zt as Label,
  gg as LexicalDictionaryList,
  mg as LinkedScrRefButton,
  cu as MARKER_MENU_STRING_KEYS,
  bh as MarkdownRenderer,
  wu as MarkerMenu,
  Nh as MoreInfo,
  tu as MultiSelectComboBox,
  ig as NavigationContentSearch,
  Ce as Popover,
  Vc as PopoverAnchor,
  Ee as PopoverContent,
  Qp as PopoverDescription,
  Jp as PopoverHeader,
  xa as PopoverPortalContainerProvider,
  Zp as PopoverTitle,
  Ae as PopoverTrigger,
  qg as Progress,
  Ww as ProjectSelector,
  gi as RadioGroup,
  Xa as RadioGroupItem,
  Bc as RecentSearches,
  ns as ResizableHandle,
  wa as ResizablePanel,
  os as ResizablePanelGroup,
  vg as ResultsCard,
  Zh as SCOPE_SELECTOR_STRING_KEYS,
  dg as SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS,
  Qh as ScopeSelector,
  Jh as ScriptureResultsViewer,
  tg as ScrollGroupSelector,
  Ro as SearchBar,
  pr as Select,
  fr as SelectContent,
  Dw as SelectGroup,
  ie as SelectItem,
  gh as SelectLabel,
  $w as SelectScrollDownButton,
  Rw as SelectScrollUpButton,
  fh as SelectSeparator,
  gr as SelectTrigger,
  hr as SelectValue,
  le as Separator,
  eg as SettingsList,
  ag as SettingsListHeader,
  rg as SettingsListItem,
  Mu as SettingsSidebar,
  Xh as SettingsSidebarContentSearch,
  Su as Sidebar,
  Du as SidebarContent,
  Bh as SidebarFooter,
  zn as SidebarGroup,
  Gh as SidebarGroupAction,
  In as SidebarGroupContent,
  Sn as SidebarGroupLabel,
  Vh as SidebarHeader,
  jh as SidebarInput,
  Iu as SidebarInset,
  Ru as SidebarMenu,
  Uh as SidebarMenuAction,
  Kh as SidebarMenuBadge,
  Au as SidebarMenuButton,
  $u as SidebarMenuItem,
  qh as SidebarMenuSkeleton,
  Hh as SidebarMenuSub,
  Yh as SidebarMenuSubButton,
  Wh as SidebarMenuSubItem,
  zu as SidebarProvider,
  Ph as SidebarRail,
  Fh as SidebarSeparator,
  Lh as SidebarTrigger,
  $r as Skeleton,
  Wg as Slider,
  Hg as Sonner,
  Oo as SourceLanguageIndexedList,
  gp as Spinner,
  Yg as Switch,
  eo as TabDropdownMenu,
  ng as TabFloatingMenu,
  og as TabToolbar,
  zo as Table,
  Io as TableBody,
  vh as TableCaption,
  wr as TableCell,
  mh as TableFooter,
  ca as TableHead,
  So as TableHeader,
  Be as TableRow,
  Xg as Tabs,
  Qg as TabsContent,
  Jg as TabsList,
  Zg as TabsTrigger,
  bg as TextField,
  Xp as Textarea,
  Mi as ToggleGroup,
  ta as ToggleGroupItem,
  lg as Toolbar,
  Dt as Tooltip,
  $t as TooltipContent,
  It as TooltipProvider,
  Rt as TooltipTrigger,
  eu as UNDO_REDO_BUTTONS_STRING_KEYS,
  cg as UiLanguageSelector,
  ru as UndoRedoButtons,
  ts as VerticalTabs,
  rs as VerticalTabsContent,
  es as VerticalTabsList,
  Hu as VerticalTabsTrigger,
  Ar as Z_INDEX_ABOVE_DOCK,
  ii as Z_INDEX_FOOTNOTE_EDITOR,
  si as Z_INDEX_MODAL,
  Ic as Z_INDEX_MODAL_BACKDROP,
  po as Z_INDEX_OVERLAY,
  Dc as Z_INDEX_TOOLTIP,
  vw as badgeVariants,
  hw as buttonGroupVariants,
  li as buttonVariants,
  f as cn,
  Oh as getBookIdFromUSFM,
  fa as getInventoryHeader,
  Rh as getLinesFromUSFM,
  $h as getNumberFromUSFM,
  Nu as getStatusForItem,
  sg as getToolbarOSReservedSpaceClassName,
  Ih as inventoryCountColumn,
  Sh as inventoryItemColumn,
  Dh as inventoryStatusColumn,
  nf as sonner,
  tf as useEvent,
  ef as useEventAsync,
  Eo as useListbox,
  yp as usePromise,
  th as useRecentSearches,
  ma as useSidebar,
  rf as useStylesheet
};
//# sourceMappingURL=index.js.map
