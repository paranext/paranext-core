var is = Object.defineProperty;
var ss = (t, e, r) => e in t ? is(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Pt = (t, e, r) => ss(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx as a, jsxs as u, Fragment as tt } from "react/jsx-runtime";
import at, { useRef as K, useMemo as G, useState as I, useCallback as j, useEffect as X, useLayoutEffect as ee, createContext as da, useContext as to, Component as ls, createElement as Oo, Suspense as cs, forwardRef as wa, Fragment as eo } from "react";
import { Command as er } from "cmdk";
import { clsx as ds } from "clsx";
import { extendTailwindMerge as ws, twMerge as us } from "tailwind-merge";
import { Slot as Ge, Dialog as pe, Popover as Sr, Label as ps, RadioGroup as Oa, Tooltip as lr, ToggleGroup as Sn, Separator as gs, Avatar as ro, DropdownMenu as It, Select as jt, Checkbox as Ao, Tabs as le, Menubar as xe, ContextMenu as Dt, Progress as Mo, Slider as Br, Switch as Po } from "radix-ui";
import { cva as ye } from "class-variance-authority";
import { IconX as hs, IconSearch as fs, IconCheck as rr, IconChevronRight as ao, IconChevronDown as ms, IconChevronUp as vs, IconSelector as bs, IconLayoutSidebar as xs, IconLayoutSidebarRight as ys, IconLoader as ks, IconAlertOctagon as Ns, IconAlertTriangle as _s, IconInfoCircle as Cs, IconCircleCheck as Es } from "@tabler/icons-react";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as Fr, Section as Q, getChaptersForBook as zs, formatScrRef as Ee, getSectionForBook as Er, formatRelativeDate as Ts, formatReplacementString as Xe, sanitizeHtml as Ss, DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS as Wr, getLocalizeKeyForScrollGroupId as Aa, NumberFormat as Is, formatBytes as Ds, getCurrentLocale as Rs, usfmMarkers as Yr, getFormatCallerFunction as $s, deepEqual as Os, isString as Lo, compareScrRefs as Ma, scrRefToBBBCCCVVV as fa, defaultScrRef as ma, formatScrRefRange as As } from "platform-bible-utils";
import { Check as Be, Clock as jo, ChevronsLeft as Vo, ChevronsRight as Bo, ChevronLeft as Pa, ChevronRight as La, ArrowLeft as Ms, ArrowRight as In, ChevronDown as Ze, BoldIcon as Ps, ItalicIcon as Ls, X as ua, AtSign as Dn, Pencil as js, Trash2 as Vs, ArrowUp as Rn, MoreHorizontal as Bs, MailOpen as Fs, Mail as Gs, ChevronUp as Us, FilterIcon as Ks, ArrowLeftIcon as qs, ChevronLeftIcon as Hs, ChevronRightIcon as Ws, ArrowRightIcon as Ys, ChevronsUpDown as oo, Filter as $n, Copy as On, User as Xs, Link as Js, CircleHelp as Zs, Star as Qs, Undo as tl, Redo as el, SquareX as An, FunctionSquare as Mn, SquareSigma as Pn, Ban as rl, AlertCircle as ja, CircleCheckIcon as al, CircleXIcon as ol, CircleHelpIcon as nl, ArrowUpIcon as il, ArrowDownIcon as sl, ScrollText as ll, Search as cl, MenuIcon as dl, Menu as wl, EllipsisVertical as ul, MoreVertical as Fo, LoaderCircle as pl } from "lucide-react";
import { createEditor as Ln, $getRoot as Se, $createParagraphNode as fr, $getSelection as Gt, HISTORY_MERGE_TAG as no, ParagraphNode as jn, TextNode as Vn, $isTokenOrSegmented as gl, $getCharacterOffsets as hl, $cloneWithPropertiesEphemeral as fl, $getPreviousSelection as ml, $isRangeSelection as ge, $caretFromPoint as vl, $getSiblingCaret as Bn, $getChildCaret as bl, $getAdjacentChildCaret as xl, $isChildCaret as yl, $normalizeCaret as kl, $setSelectionFromCaretRange as Nl, $getCollapsedCaretRange as _l, $getCaretInDirection as Go, $splitAtPointCaretNext as Cl, $isTextPointCaret as El, $findMatchingParent as Fn, $isElementNode as ze, mergeRegister as Ie, getDOMTextNode as zl, isHTMLElement as Gn, CLEAR_EDITOR_COMMAND as Un, COMMAND_PRIORITY_EDITOR as io, shallowMergeConfig as Tl, defineExtension as oe, safeCast as ar, createState as Sl, FORMAT_TEXT_COMMAND as Kn, $isNodeSelection as qn, COMMAND_PRIORITY_LOW as Hn, RootNode as Il, LineBreakNode as Dl, TabNode as Rl, $isEditorState as $l, createCommand as Ol, CLICK_COMMAND as Al, isDOMNode as Ml, $getNodeFromDOMNode as Pl, $createNodeSelection as Ll, $setSelection as jl, $getEditor as Vl, DecoratorNode as Va, $getState as Bl, toggleTextFormatType as Uo, TEXT_TYPE_TO_FORMAT as Fl, $setState as Gl, addClassNamesToElement as Wn, $create as Ul, $getNodeByKey as Kl, removeClassNamesFromElement as ql, KEY_TAB_COMMAND as Hl, $isBlockElementNode as ta, $createRangeSelection as Wl, $normalizeSelection__EXPERIMENTAL as Yl, OUTDENT_CONTENT_COMMAND as Xl, INDENT_CONTENT_COMMAND as Ko, INSERT_TAB_COMMAND as Jl, COMMAND_PRIORITY_CRITICAL as so, $isDecoratorNode as Zl, $isParagraphNode as Ql, $isTextNode as ea, SELECTION_CHANGE_COMMAND as Yn, getRegisteredNode as tc, isDocumentFragment as qo, isDOMDocumentNode as ec, ArtificialNode__DO_NOT_USE as Xn, $createLineBreakNode as Jn, $isRootOrShadowRoot as rc, isBlockDomNode as Ho, isInlineDomNode as Wo, $insertNodes as ac } from "lexical";
import { HeadingNode as oc, QuoteNode as nc, registerRichText as ic } from "@lexical/rich-text";
import { flushSync as sc, createPortal as lc } from "react-dom";
import { $isTableSelection as cc } from "@lexical/table";
import { createHeadlessEditor as Zn } from "@lexical/headless";
import { useReactTable as Qn, getFilteredRowModel as dc, getSortedRowModel as ti, getPaginationRowModel as wc, getCoreRowModel as ei, flexRender as zr, getGroupedRowModel as uc, getExpandedRowModel as pc } from "@tanstack/react-table";
import gc from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Ba, HIDDEN_NOTE_CALLER as Fa, getDefaultViewOptions as hc, isInsertEmbedOpOfType as Gr, Editorial as fc } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as mc } from "react-hotkeys-hook";
import * as lo from "react-resizable-panels";
import { Drawer as Ue } from "vaul";
import { useTheme as vc } from "next-themes";
import { Toaster as bc } from "sonner";
import { toast as Uh } from "sonner";
const xc = ws({ prefix: "tw" });
function Ga(t) {
  const e = [];
  let r = "", o = 0;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    i === "[" ? o += 1 : i === "]" && (o -= 1), i === ":" && o === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function yc(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Ga(t), r = e.findIndex((i) => i.startsWith("-tw-"));
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
function kc(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Ga(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), n = r[r.length - 1], i = Ga(e), s = i.some((d) => d.startsWith("-tw-")), l = i.some((d) => d.startsWith("!tw-"));
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
function h(...t) {
  const e = ds(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return xc(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), n = [];
  return r.forEach((d) => {
    const c = yc(d);
    o.set(c.normalized, c.original), n.push(c.normalized);
  }), us(n.join(" ")).split(" ").filter(Boolean).map((d) => {
    const c = o.get(d);
    return c ? kc(d, c) : d;
  }).join(" ");
}
const $r = 250, ri = 300, co = 400, Nc = 450, _c = 500, Cc = 550, ai = ye(
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
function F({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...n
}) {
  const i = o ? Ge.Root : "button";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(ai({ variant: e, size: r, className: t })),
      ...n
    }
  );
}
const Ec = "layoutDirection";
function bt() {
  const t = localStorage.getItem(Ec);
  return t === "rtl" ? t : "ltr";
}
function Ua({ ...t }) {
  return /* @__PURE__ */ a(pe.Root, { "data-slot": "dialog", ...t });
}
function Mp({ ...t }) {
  return /* @__PURE__ */ a(pe.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function zc({ ...t }) {
  return /* @__PURE__ */ a(pe.Portal, { "data-slot": "dialog-portal", ...t });
}
function Pp({ ...t }) {
  return /* @__PURE__ */ a(pe.Close, { "data-slot": "dialog-close", ...t });
}
function Tc({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    pe.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: h(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Nc, ...e },
      ...r
    }
  );
}
function Ka({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...i
}) {
  const s = bt();
  return /* @__PURE__ */ u(zc, { children: [
    /* @__PURE__ */ a(Tc, { className: o }),
    /* @__PURE__ */ u(
      pe.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: _c, ...n },
        dir: s,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ a(pe.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ u(F, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ a(hs, {}),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "dialog-header",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Yo({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "dialog-footer",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        r,
        e && /* @__PURE__ */ a(pe.Close, { asChild: !0, children: /* @__PURE__ */ a(F, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    pe.Title,
    {
      "data-slot": "dialog-title",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function Lp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    pe.Description,
    {
      "data-slot": "dialog-description",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Or({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ a(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: h(
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
function jp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function Sc({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Ic = ye(
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
function Dc({
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
        className: h(Ic({ align: e }), t),
        onClick: (o) => {
          var n, i;
          o.target instanceof HTMLElement && o.target.closest("button") || (i = (n = o.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || i.focus();
        },
        ...r
      }
    )
  );
}
ye("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Re({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    er,
    {
      "data-slot": "command",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function mr({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...r
}) {
  const o = bt(), n = at.useCallback(
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
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ u(Sc, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        er.Input,
        {
          "data-slot": "command-input",
          className: h(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: n,
          ...r
        }
      ),
      /* @__PURE__ */ a(Dc, { children: /* @__PURE__ */ a(fs, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function $e({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    er.List,
    {
      "data-slot": "command-list",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function Ar({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Empty,
    {
      "data-slot": "command-empty",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function he({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Group,
    {
      "data-slot": "command-group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function wo({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    er.Separator,
    {
      "data-slot": "command-separator",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function ke({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    er.Item,
    {
      "data-slot": "command-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ a(rr, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Rc({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "command-shortcut",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const oi = (t, e, r, o, n) => {
  switch (t) {
    case Q.OT:
      return e ?? "Old Testament";
    case Q.NT:
      return r ?? "New Testament";
    case Q.DC:
      return o ?? "Deuterocanon";
    case Q.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, $c = (t, e, r, o, n) => {
  switch (t) {
    case Q.OT:
      return e ?? "OT";
    case Q.NT:
      return r ?? "NT";
    case Q.DC:
      return o ?? "DC";
    case Q.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function je(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? wt.bookIdToEnglishName(t);
}
function uo(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ni = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), se = Object.fromEntries(
  ni.map((t) => [t, wt.bookIdToEnglishName(t)])
);
function po(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const n = wt.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(Fr(n.toLowerCase(), o) || Fr(t.toLowerCase(), o) || (i ? Fr(i.localizedName.toLowerCase(), o) || Fr(i.localizedId.toLowerCase(), o) : !1));
}
function ii({
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
  disabled: w = !1
}) {
  const g = K(!1), m = () => {
    w || (g.current || o == null || o(e), setTimeout(() => {
      g.current = !1;
    }, 100));
  }, p = (v) => {
    if (w) {
      v.preventDefault();
      return;
    }
    g.current = !0, n ? n(v) : o == null || o(e);
  }, f = G(
    () => je(e, d),
    [e, d]
  ), y = G(
    () => uo(e, d),
    [e, d]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: h(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === Q.OT,
          "tw:border-s-purple-200": i === Q.NT,
          "tw:border-s-indigo-200": i === Q.DC,
          "tw:border-s-amber-200": i === Q.Extra
        }
      ),
      children: /* @__PURE__ */ u(
        ke,
        {
          ref: t,
          value: c || `${e} ${wt.bookIdToEnglishName(e)}`,
          onSelect: m,
          onMouseDown: p,
          role: "option",
          "aria-selected": r,
          "aria-disabled": w || void 0,
          "aria-label": `${wt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: w,
          className: h(s, w && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            l && /* @__PURE__ */ a(
              Be,
              {
                className: h(
                  "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                  r ? "tw:opacity-100" : "tw:opacity-0"
                )
              }
            ),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: f }),
            /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: y })
          ]
        }
      )
    }
  );
}
function Ne({ ...t }) {
  return /* @__PURE__ */ a(Sr.Root, { "data-slot": "popover", ...t });
}
function Oe({ ...t }) {
  return /* @__PURE__ */ a(Sr.Trigger, { "data-slot": "popover-trigger", ...t });
}
const si = at.createContext(null);
function va({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ a(si.Provider, { value: t, children: e });
}
function _e({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...n
}) {
  const i = bt(), s = at.useContext(si);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ a(Sr.Portal, { container: s ?? void 0, children: /* @__PURE__ */ a(
      Sr.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: $r, ...o },
        dir: i,
        ...n
      }
    ) })
  );
}
function Oc({ ...t }) {
  return /* @__PURE__ */ a(Sr.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Vp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Bp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Fp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function li(t, e, r) {
  return `${t} ${se[t]}${e ? ` ${uo(t, e)} ${je(t, e)}` : ""}`;
}
function Ac({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: d = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: c = "ghost"
}) {
  const [w, g] = I(!1);
  if (t.length === 0)
    return;
  const m = (p) => {
    e(p), g(!1);
  };
  return /* @__PURE__ */ u(Ne, { open: w, onOpenChange: g, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ a(
      F,
      {
        variant: c,
        size: "icon",
        className: d,
        "aria-label": n,
        children: /* @__PURE__ */ a(jo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(_e, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Re, { children: /* @__PURE__ */ a($e, { children: /* @__PURE__ */ a(he, { heading: i, children: t.map((p) => /* @__PURE__ */ u(
      ke,
      {
        onSelect: () => m(p),
        className: h("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ a(jo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function Gp(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (l) => !r(l, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Xr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Mc = [
  Xr.BOOK_ONLY,
  Xr.BOOK_CHAPTER,
  Xr.BOOK_CHAPTER_VERSE
];
function Pc(t) {
  return Xr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function Xo(t, e) {
  return wt.bookIdToNumber(t) < wt.bookIdToNumber(e.book);
}
function Lc(t, e, r) {
  const o = wt.bookIdToNumber(t) - wt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function ba(t, e, r, o) {
  const n = wt.bookIdToNumber(t) - wt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Jo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function we(t) {
  return zs(wt.bookIdToNumber(t));
}
function jc(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Mc.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [l, d = void 0, c = void 0] = s.slice(1);
        let w;
        const g = e.filter((m) => po(m, l, r));
        if (g.length === 1 && ([w] = g), !w && d) {
          if (wt.isBookIdValid(l)) {
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
        if (!w && d) {
          const p = ((f) => Object.keys(se).find(
            (y) => se[y].toLowerCase() === f.toLowerCase()
          ))(l);
          if (p && e.includes(p) && (w = p), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let m = d ? parseInt(d, 10) : void 0;
          m && m > we(w) && (m = Math.max(we(w), 1));
          const p = c ? parseInt(c, 10) : void 0;
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
function Vc(t, e, r, o) {
  const n = j(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], w = Math.max(we(c), 1);
        o({
          book: c,
          chapterNum: w,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = j(() => {
    const d = we(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const w = e[c + 1];
        o({
          book: w,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = j(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = j(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return G(() => [
    {
      onClick: n,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? Vo : Bo
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Pa : La
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? La : Pa
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === we(t.book) || we(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? Bo : Vo
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
function ci({
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
    return /* @__PURE__ */ a(he, { children: /* @__PURE__ */ a("div", { className: h("tw:grid tw:grid-cols-6 tw:gap-1", l), children: Array.from({ length: t }, (d, c) => c + 1).map((d) => {
      const c = (n == null ? void 0 : n(d)) ?? !1;
      return /* @__PURE__ */ a(
        ke,
        {
          value: e(d),
          onSelect: () => {
            c || r(d);
          },
          ref: o(d),
          disabled: c,
          "aria-disabled": c || void 0,
          className: h(
            "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
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
function Zo({
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
      ci,
      {
        count: we(t),
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
function Qo({
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
      ci,
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
function xa({
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
  disableReferencesUpTo: w,
  submitKeys: g,
  triggerContent: m,
  triggerVariant: p = "outline",
  onOpenChange: f,
  onCloseAutoFocus: y,
  modal: v = !1,
  align: E = "center"
}) {
  const z = bt(), [T, C] = I(!1), [V, M] = I(""), [k, x] = I(""), [b, N] = I("books"), [S, B] = I(void 0), [O, A] = I(
    void 0
  ), [U, D] = I(void 0), [W, pt] = I(!1), _t = K(null), Rt = K(!1), et = K(void 0), $t = K(void 0), q = K(void 0), ot = K(void 0), it = K({}), st = K({}), lt = j(
    (_) => {
      e(_), l && l(_);
    },
    [e, l]
  ), Vt = G(() => o ? o() : ni, [o]), vt = G(() => ({
    [Q.OT]: Vt.filter((H) => wt.isBookOT(H)),
    [Q.NT]: Vt.filter((H) => wt.isBookNT(H)),
    [Q.DC]: Vt.filter((H) => wt.isBookDC(H)),
    [Q.Extra]: Vt.filter((H) => wt.extraBooks().includes(H))
  }), [Vt]), Wt = G(() => Object.values(vt).flat(), [vt]), Yt = G(() => {
    if (!k.trim()) return vt;
    const _ = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return [Q.OT, Q.NT, Q.DC, Q.Extra].forEach((Z) => {
      _[Z] = vt[Z].filter((zt) => po(zt, k, n));
    }), _;
  }, [vt, k, n]), $ = G(
    () => jc(k, Wt, n),
    [k, Wt, n]
  ), Ot = K(!1);
  X(() => {
    if (!Ot.current) {
      Ot.current = !0;
      return;
    }
    f == null || f(T);
  }, [T, f]);
  const Bt = j(() => {
    if ($) {
      const _ = $.chapterNum ?? 1, H = $.verseNum ?? 1;
      if (w && ba($.book, _, H, w))
        return;
      lt({
        book: $.book,
        chapterNum: _,
        verseNum: H
      }), C(!1), x(""), M("");
    }
  }, [lt, $, w]), ne = j(
    (_) => {
      const H = O ?? ($ == null ? void 0 : $.book), Z = U ?? ($ == null ? void 0 : $.chapterNum);
      !H || !Z || (lt({
        book: H,
        chapterNum: Z,
        verseNum: _
      }), C(!1));
    },
    [lt, O, U, $]
  ), Xt = j(
    (_) => {
      if (w && Xo(_, w)) return;
      if (we(_) <= 1) {
        lt({
          book: _,
          chapterNum: 1,
          verseNum: 1
        }), C(!1), x("");
        return;
      }
      B(_), N("chapters");
    },
    [lt, w]
  ), At = j(
    (_) => {
      const H = b === "chapters" ? S : $ == null ? void 0 : $.book;
      if (H) {
        if (c && c(H, _) > 1) {
          A(H), D(_), N("verses"), M("");
          return;
        }
        lt({
          book: H,
          chapterNum: _,
          verseNum: 1
        }), C(!1);
      }
    },
    [lt, b, S, $, c]
  ), Me = j(
    (_) => {
      lt(_), C(!1), x("");
    },
    [lt]
  ), Jt = Vc(t, Wt, z, e), Zt = j(() => {
    N("books"), B(void 0), A(void 0), D(void 0), setTimeout(() => {
      $t.current && $t.current.focus();
    }, 0);
  }, []), L = j(() => {
    const _ = O;
    A(void 0), D(void 0), _ ? (B(_), N("chapters"), M("")) : Zt();
  }, [O, Zt]), Y = j((_) => {
    C(_), _ && (N("books"), B(void 0), A(void 0), D(void 0), x(""));
  }, []), { otLong: ct, ntLong: nt, dcLong: ht, extraLong: xt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, yt = j(
    (_) => oi(_, ct, nt, ht, xt),
    [ct, nt, ht, xt]
  ), ft = j(
    (_) => $ ? !!$.chapterNum && !_.toString().includes($.chapterNum.toString()) : !1,
    [$]
  ), Ct = G(
    () => Ee(
      t,
      n ? je(t.book, n) : "English"
    ),
    [t, n]
  ), R = j((_) => (H) => {
    it.current[_] = H;
  }, []), ut = j((_) => (H) => {
    st.current[_] = H;
  }, []), gt = G(
    () => Pc(k),
    [k]
  ), kt = G(() => !c || !$ || !$.chapterNum || !gt ? !1 : c($.book, $.chapterNum) > 0, [c, $, gt]), Ke = j(
    (_) => w ? Xo(_, w) : !1,
    [w]
  ), Pe = j(
    (_) => (H) => w ? Lc(_, H, w) : !1,
    [w]
  ), br = j(
    (_, H) => (Z) => w ? ba(_, H, Z, w) : !1,
    [w]
  ), qe = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", xr = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", yr = j(
    (_) => {
      (_.key === "Home" || _.key === "End") && _.stopPropagation(), g && g.includes(_.key) && $ && $.chapterNum !== void 0 && $.verseNum !== void 0 && (_.preventDefault(), _.stopPropagation(), Bt());
    },
    [g, $, Bt]
  ), Mr = j(
    (_) => {
      var re, nr, kr;
      if (_.ctrlKey) return;
      const { isLetter: H, isDigit: Z } = Jo(_.key);
      if ((b === "chapters" || b === "verses") && (_.key === " " || _.key === "Enter")) {
        const Mt = _.target instanceof HTMLElement ? _.target : void 0;
        if (!!(Mt != null && Mt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          _.stopPropagation();
          return;
        }
        const Tt = (re = et.current) == null ? void 0 : re.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Tt) {
          _.preventDefault(), _.stopPropagation(), Tt.click();
          return;
        }
      }
      if ((b === "chapters" || b === "verses") && (H || Z)) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      if (b === "chapters" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), Zt();
        return;
      }
      if (b === "verses" && _.key === "Backspace") {
        _.preventDefault(), _.stopPropagation(), L();
        return;
      }
      const zt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(_.key);
      if (b === "verses" && zt) {
        const Mt = O, Nt = U;
        if (!Mt || !Nt || !c) return;
        const Tt = c(Mt, Nt);
        if (!Tt) return;
        (nr = et.current) == null || nr.focus();
        const mt = (() => {
          if (!V) return 1;
          const He = V.match(/:(\d+)$/);
          return He ? parseInt(He[1], 10) : 0;
        })();
        let Qt = mt;
        const te = 6;
        switch (_.key) {
          case "ArrowLeft":
            mt !== 0 && (Qt = mt > 1 ? mt - 1 : Tt);
            break;
          case "ArrowRight":
            mt !== 0 && (Qt = mt < Tt ? mt + 1 : 1);
            break;
          case "ArrowUp":
            Qt = mt === 0 ? Tt : Math.max(1, mt - te);
            break;
          case "ArrowDown":
            Qt = mt === 0 ? 1 : Math.min(Tt, mt + te);
            break;
          default:
            return;
        }
        Qt !== mt && (_.preventDefault(), _.stopPropagation(), M(
          `${Mt} ${se[Mt] || ""} ${Nt}:${Qt}`
        ), setTimeout(() => {
          const He = st.current[Qt];
          He && He.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((b === "chapters" || b === "books" && $) && zt) {
        const Mt = b === "chapters" ? S : $ == null ? void 0 : $.book;
        if (!Mt) return;
        b === "chapters" && ((kr = et.current) == null || kr.focus());
        const Nt = (() => {
          if (!V) return 1;
          const te = V.match(/(\d+)$/);
          return te ? parseInt(te[1], 10) : 0;
        })(), Tt = we(Mt);
        if (!Tt) return;
        let mt = Nt;
        const Qt = 6;
        switch (_.key) {
          case "ArrowLeft":
            Nt !== 0 && (mt = Nt > 1 ? Nt - 1 : Tt);
            break;
          case "ArrowRight":
            Nt !== 0 && (mt = Nt < Tt ? Nt + 1 : 1);
            break;
          case "ArrowUp":
            mt = Nt === 0 ? Tt : Math.max(1, Nt - Qt);
            break;
          case "ArrowDown":
            mt = Nt === 0 ? 1 : Math.min(Tt, Nt + Qt);
            break;
          default:
            return;
        }
        mt !== Nt && (_.preventDefault(), _.stopPropagation(), M(
          `${Mt} ${se[Mt] || ""} ${mt}`
        ), setTimeout(() => {
          const te = it.current[mt];
          te && te.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      $,
      Zt,
      L,
      S,
      O,
      U,
      c,
      V
    ]
  ), Pr = j((_) => {
    var zt;
    if (_.shiftKey || _.key === "Tab" || _.key === " ") return;
    if (_.key === "Enter") {
      _.stopPropagation();
      return;
    }
    if (_.key === "ArrowUp" || _.key === "ArrowDown") {
      (zt = $t.current) == null || zt.focus();
      return;
    }
    const { isLetter: H, isDigit: Z } = Jo(_.key);
    (H || Z) && (_.preventDefault(), x((re) => re + _.key), $t.current.focus(), pt(!1));
  }, []);
  return ee(() => {
    const _ = setTimeout(() => {
      if (T && b === "books" && q.current && ot.current) {
        const H = q.current, Z = ot.current, zt = Z.offsetTop, re = H.clientHeight, nr = Z.clientHeight, kr = zt - re / 2 + nr / 2;
        H.scrollTo({
          top: Math.max(0, kr),
          behavior: "smooth"
        }), M(li(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(_);
    };
  }, [T, b, k, $, t.book]), ee(() => {
    if (b === "chapters" && S) {
      const _ = S === t.book, H = _ ? t.chapterNum : 1;
      M(
        `${S} ${se[S] || ""} ${H}`
      ), setTimeout(() => {
        if (q.current)
          if (_) {
            const Z = it.current[t.chapterNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        et.current && et.current.focus();
      }, 0);
    }
  }, [b, S, $, t.book, t.chapterNum]), ee(() => {
    if (b === "verses" && O && U !== void 0) {
      const _ = O === t.book && U === t.chapterNum, H = _ ? t.verseNum : 1;
      M(
        `${O} ${se[O] || ""} ${U}:${H}`
      ), setTimeout(() => {
        if (q.current)
          if (_) {
            const Z = st.current[t.verseNum];
            Z && Z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            q.current.scrollTo({ top: 0 });
        et.current && et.current.focus();
      }, 0);
    }
  }, [
    b,
    O,
    U,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u(Ne, { open: T, onOpenChange: Y, modal: v, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ a(
      F,
      {
        ref: _t,
        "aria-label": "book-chapter-trigger",
        variant: p,
        role: "combobox",
        "aria-expanded": T,
        className: h(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (_) => {
          Rt.current && (Rt.current = !1, _.preventDefault());
        },
        children: m ?? /* @__PURE__ */ a("span", { className: "tw:truncate", children: Ct })
      }
    ) }),
    /* @__PURE__ */ a(
      _e,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: E,
        onKeyDownCapture: Mr,
        onKeyDown: (_) => _.stopPropagation(),
        onPointerDownOutside: (_) => {
          const { target: H } = _;
          T && _t.current && H instanceof Node && _t.current.contains(H) && (Rt.current = !0, Y(!1));
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ u(
          Re,
          {
            ref: et,
            loop: !0,
            value: V,
            onValueChange: M,
            shouldFilter: !1,
            children: [
              b === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    mr,
                    {
                      ref: $t,
                      value: k,
                      onValueChange: x,
                      onKeyDown: yr,
                      onFocus: () => pt(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : ""
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    Ac,
                    {
                      recentSearches: s,
                      onSearchItemSelect: Me,
                      renderItem: (_) => Ee(_, "English"),
                      getItemKey: (_) => `${_.book}-${_.chapterNum}-${_.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: Jt.map(({ onClick: _, disabled: H, title: Z, icon: zt }) => /* @__PURE__ */ a(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      pt(!0), _();
                    },
                    disabled: H,
                    className: "tw:h-10 tw:w-4 tw:p-0",
                    title: Z,
                    onKeyDown: Pr,
                    children: /* @__PURE__ */ a(zt, {})
                  },
                  Z
                )) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: b === "verses" ? L : Zt,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: z === "ltr" ? /* @__PURE__ */ a(Ms, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(In, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                b === "chapters" && S && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: je(S, n) }),
                b === "verses" && O && U !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${je(O, n)} ${U}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: b === "verses" ? xr : qe
                  }
                )
              ] }),
              !W && /* @__PURE__ */ u($e, { ref: q, children: [
                b === "books" && /* @__PURE__ */ u(tt, { children: [
                  !$ && Object.entries(Yt).map(([_, H]) => {
                    if (H.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(he, { heading: yt(_), children: H.map((Z) => /* @__PURE__ */ a(
                          ii,
                          {
                            bookId: Z,
                            onSelect: (zt) => Xt(zt),
                            section: Er(Z),
                            commandValue: `${Z} ${se[Z]}`,
                            ref: Z === t.book ? ot : void 0,
                            localizedBookNames: n,
                            disabled: Ke(Z)
                          },
                          Z
                        )) }, _)
                      );
                  }),
                  $ && /* @__PURE__ */ a(he, { children: /* @__PURE__ */ a(
                    ke,
                    {
                      value: `${$.book} ${se[$.book]} ${$.chapterNum || ""}:${$.verseNum || ""})}`,
                      onSelect: Bt,
                      disabled: !!w && ba(
                        $.book,
                        $.chapterNum ?? 1,
                        $.verseNum ?? 1,
                        w
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: Ee(
                        {
                          book: $.book,
                          chapterNum: $.chapterNum ?? 1,
                          verseNum: $.verseNum ?? 1
                        },
                        n ? uo($.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  $ && kt && $.chapterNum && c && /* @__PURE__ */ u(tt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${je($.book, n)} ${$.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: xr })
                    ] }),
                    /* @__PURE__ */ a(
                      Qo,
                      {
                        bookId: $.book,
                        chapterNum: $.chapterNum,
                        endVerse: c($.book, $.chapterNum),
                        scrRef: t,
                        onVerseSelect: ne,
                        setVerseRef: ut,
                        isVerseDisabled: br($.book, $.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  $ && !kt && we($.book) > 1 && /* @__PURE__ */ u(tt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: je($.book, n) }),
                      /* @__PURE__ */ a("span", { children: qe })
                    ] }),
                    /* @__PURE__ */ a(
                      Zo,
                      {
                        bookId: $.book,
                        scrRef: t,
                        onChapterSelect: At,
                        setChapterRef: R,
                        isChapterDimmed: ft,
                        isChapterDisabled: Pe($.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                b === "chapters" && S && /* @__PURE__ */ a(
                  Zo,
                  {
                    bookId: S,
                    scrRef: t,
                    onChapterSelect: At,
                    setChapterRef: R,
                    isChapterDisabled: Pe(S),
                    className: "tw:p-4"
                  }
                ),
                b === "verses" && O && U !== void 0 && c && /* @__PURE__ */ a(
                  Qo,
                  {
                    bookId: O,
                    chapterNum: U,
                    endVerse: c(O, U),
                    scrRef: t,
                    onVerseSelect: ne,
                    setVerseRef: ut,
                    isVerseDisabled: br(
                      O,
                      U
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
const Up = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function Et({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ps.Root,
    {
      "data-slot": "label",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function di({
  className: t,
  ...e
}) {
  const r = bt();
  return /* @__PURE__ */ a(
    Oa.Root,
    {
      "data-slot": "radio-group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Wa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Oa.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Oa.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ a("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function Bc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function tn({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: d = Bc,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: g = "",
  textPlaceholder: m = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: y = "start",
  isDisabled: v = !1,
  ariaLabel: E,
  ...z
}) {
  const [T, C] = I(!1), V = c ?? d, M = (x) => x.length > 0 && typeof x[0] == "object" && "options" in x[0], k = (x, b) => {
    const N = d(x), S = typeof x == "object" && "secondaryLabel" in x ? x.secondaryLabel : void 0, B = `${b ?? ""}${N}${S ?? ""}`;
    return /* @__PURE__ */ u(
      ke,
      {
        value: N,
        onSelect: () => {
          l(x), C(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ a(
            Be,
            {
              className: h("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== N
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            N,
            S && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      B
    );
  };
  return /* @__PURE__ */ u(Ne, { open: T, onOpenChange: C, ...z, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ u(
      F,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": T,
        "aria-label": E,
        id: t,
        className: h(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? V(s) : g
              }
            )
          ] }),
          /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      _e,
      {
        align: y,
        className: h("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Re, { children: [
          /* @__PURE__ */ a(mr, { placeholder: m, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(Ar, { children: p }),
          /* @__PURE__ */ a($e, { children: M(e) ? e.map((x) => /* @__PURE__ */ a(he, { heading: x.groupHeading, children: x.options.map((b) => k(b, x.groupHeading)) }, x.groupHeading)) : e.map((x) => k(x)) })
        ] })
      }
    )
  ] });
}
function Fc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = G(
    () => Array.from({ length: i }, (c, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ a(Et, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      tn,
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
    /* @__PURE__ */ a(Et, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      tn,
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
var Ya = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Ya || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Ya || (Ya = {}));
const Kp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ya = (t, e) => t[e] ?? e;
function qp({
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
  const w = ya(c, "%webView_bookSelector_currentBook%"), g = ya(c, "%webView_bookSelector_choose%"), m = ya(c, "%webView_bookSelector_chooseBooks%"), [p, f] = I(
    "current book"
    /* CurrentBook */
  ), y = (v) => {
    f(v), t(v);
  };
  return /* @__PURE__ */ a(
    di,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (v) => y(v),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Et, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Et, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Fc,
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
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Et, { className: "tw:ms-1", children: m })
          ] }),
          /* @__PURE__ */ a(Et, { className: "tw:flex tw:items-center", children: o.map((v) => wt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ a(
            F,
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
const wi = da(null);
function Gc(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Ce() {
  const t = to(wi);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const ui = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Uc = ui ? ee : X, Ur = { tag: no };
function Kc({ initialConfig: t, children: e }) {
  const r = G(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: l, html: d } = t, c = Gc(null, o), w = Ln({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (g) => s(g, w), theme: o });
    return function(g, m) {
      if (m !== null) {
        if (m === void 0) g.update(() => {
          const p = Se();
          if (p.isEmpty()) {
            const f = fr();
            p.append(f);
            const y = ui ? document.activeElement : null;
            (Gt() !== null || y !== null && y === g.getRootElement()) && f.select();
          }
        }, Ur);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const p = g.parseEditorState(m);
            g.setEditorState(p, Ur);
            break;
          }
          case "object":
            g.setEditorState(m, Ur);
            break;
          case "function":
            g.update(() => {
              Se().isEmpty() && m(g);
            }, Ur);
        }
      }
    }(w, l), [w, c];
  }, []);
  return Uc(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(wi.Provider, { value: r, children: e });
}
const qc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : X;
function Hc({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Ce();
  return qc(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(no) || l.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const go = {
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
function Ut({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ a(
    lr.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Kt({ ...t }) {
  return /* @__PURE__ */ a(lr.Root, { "data-slot": "tooltip", ...t });
}
function qt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    lr.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(ai({ variant: e }), t) : t,
      ...r
    }
  );
}
function Ht({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ a(lr.Portal, { children: /* @__PURE__ */ u(
    lr.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Cc, ...r },
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ a(lr.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
const ho = [
  oc,
  jn,
  Vn,
  nc
], Wc = da(null), ka = {
  didCatch: !1,
  error: null
};
class Yc extends ls {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = ka;
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
      }), this.setState(ka);
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
    if (o && r.error !== null && Xc(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(ka);
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
        l = Oo(o, d);
      else if (n !== void 0)
        l = n;
      else
        throw s;
    }
    return Oo(Wc.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Xc() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Jc({ children: t, onError: e }) {
  return a(Yc, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Zc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : X;
function Qc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function td() {
  return function(t) {
    const [e] = Ce(), r = G(() => t(e), [e, t]), [o, n] = I(() => r.initialValueFn()), i = K(o);
    return Zc(() => {
      const { initialValueFn: s, subscribe: l } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), l((c) => {
        i.current = c, n(c);
      });
    }, [r, t]), o;
  }(Qc);
}
function ed(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let l, d = s.length;
  s.sort((c, w) => {
    const g = c.top - w.top;
    return Math.abs(g) <= 3 ? c.left - w.left : g;
  });
  for (let c = 0; c < d; c++) {
    const w = s[c], g = l && l.top <= w.top && l.top + l.height > w.top && l.left + l.width > w.left, m = w.width + i === o.width;
    g || m ? (s.splice(c--, 1), d--) : l = w;
  }
  return s;
}
function rd(t, e, r = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !gl(e) && o !== null) {
    const [n, i] = o, s = t.isBackward(), l = n.getNode(), d = i.getNode(), c = e.is(l), w = e.is(d);
    if (c || w) {
      const [g, m] = hl(t), p = l.is(d), f = e.is(s ? d : l), y = e.is(s ? l : d);
      let v, E = 0;
      p ? (E = g > m ? m : g, v = g > m ? g : m) : f ? (E = s ? m : g, v = void 0) : y && (E = 0, v = s ? g : m);
      const z = e.__text.slice(E, v);
      z !== e.__text && (r === "clone" && (e = fl(e)), e.__text = z);
    }
  }
  return e;
}
function ra(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const pi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, ad = pi && "documentMode" in document ? document.documentMode : null;
!(!pi || !("InputEvent" in window) || ad) && "getTargetRanges" in new window.InputEvent("input");
function de(t) {
  return `${t}px`;
}
const od = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function nd(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const l = document.createElement("div");
  function d() {
    o === null && ra(182), n === null && ra(183);
    const { left: g, top: m } = n.getBoundingClientRect(), p = ed(t, e);
    var f, y;
    l.isConnected || (y = l, (f = n).insertBefore(y, f.firstChild));
    let v = !1;
    for (let E = 0; E < p.length; E++) {
      const z = p[E], T = s[E] || document.createElement("div"), C = T.style;
      C.position !== "absolute" && (C.position = "absolute", v = !0);
      const V = de(z.left - g);
      C.left !== V && (C.left = V, v = !0);
      const M = de(z.top - m);
      C.top !== M && (T.style.top = M, v = !0);
      const k = de(z.width);
      C.width !== k && (T.style.width = k, v = !0);
      const x = de(z.height);
      C.height !== x && (T.style.height = x, v = !0), T.parentNode !== l && (l.append(T), v = !0), s[E] = T;
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
  const w = t.registerRootListener(function g() {
    const m = t.getRootElement();
    if (m === null) return c();
    const p = m.parentElement;
    if (!Gn(p)) return c();
    c(), o = m, n = p, i = new MutationObserver((f) => {
      const y = t.getRootElement(), v = y && y.parentElement;
      if (y !== o || v !== n) return g();
      for (const E of f) if (!l.contains(E.target)) return d();
    }), i.observe(p, od), d();
  });
  return () => {
    w(), c();
  };
}
function en(t, e, r) {
  if (t.type !== "text" && ze(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [zl(r) || r, t.offset];
}
function id(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== de(-1.5) && (r.marginTop = de(-1.5)), r.paddingTop !== de(4) && (r.paddingTop = de(4)), r.paddingBottom !== de(0) && (r.paddingBottom = de(0));
  }
}
function sd(t, e = id) {
  let r = null, o = null, n = null, i = null, s = null, l = null, d = () => {
  };
  function c(w) {
    w.read(() => {
      const g = Gt();
      if (!ge(g)) return r = null, n = null, i = null, l = null, d(), void (d = () => {
      });
      const [m, p] = function(x) {
        const b = x.getStartEndPoints();
        return x.isBackward() ? [b[1], b[0]] : b;
      }(g), f = m.getNode(), y = f.getKey(), v = m.offset, E = p.getNode(), z = E.getKey(), T = p.offset, C = t.getElementByKey(y), V = t.getElementByKey(z), M = r === null || C !== o || v !== n || y !== r.getKey(), k = i === null || V !== s || T !== l || z !== i.getKey();
      if ((M || k) && C !== null && V !== null) {
        const x = function(b, N, S, B, O, A, U) {
          const D = (b._window ? b._window.document : document).createRange();
          return D.setStart(...en(N, S, B)), D.setEnd(...en(O, A, U)), D;
        }(t, m, f, C, p, E, V);
        d(), d = nd(t, x, e);
      }
      r = f, o = C, n = v, i = E, s = V, l = T;
    });
  }
  return c(t.getEditorState()), Ie(t.registerUpdateListener(({ editorState: w }) => c(w)), () => {
    d();
  });
}
function ld(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = sd(t, e));
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
function cd(t) {
  const e = Fn(t, (r) => ze(r) && !r.isInline());
  return ze(e) || ra(4, t.__key), e;
}
function dd(t) {
  const e = Gt() || ml();
  let r;
  if (ge(e)) r = vl(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (r = Bn(l, "next"));
    }
    r = r || bl(Se(), "previous").getFlipped().insert(fr());
  }
  const o = wd(t, r), n = xl(o), i = yl(n) ? kl(n) : o;
  return Nl(_l(i)), t.getLatest();
}
function wd(t, e, r) {
  let o = Go(e, "next");
  for (let n = o; n; n = Cl(n, r)) o = n;
  return El(o) && ra(283), o.insert(t.isInline() ? fr().append(t) : t), Go(Bn(t.getLatest(), "next"), e.direction);
}
function ud(t) {
  const e = Gt();
  if (!ge(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const l = Fn(i, (c) => ze(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !r.has(d) && (r.add(d), t(l));
  }
  return r.size > 0;
}
const pd = Symbol.for("preact-signals");
function pa() {
  if (Te > 1) return void Te--;
  let t, e = !1;
  for (!function() {
    let r = aa;
    for (aa = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); Tr !== void 0; ) {
    let r = Tr;
    for (Tr = void 0, oa++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && gi(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (oa = 0, Te--, e) throw t;
}
function gd(t) {
  if (Te > 0) return t();
  Xa = ++hd, Te++;
  try {
    return t();
  } finally {
    pa();
  }
}
let rt, Tr;
function rn(t) {
  const e = rt;
  rt = void 0;
  try {
    return t();
  } finally {
    rt = e;
  }
}
let aa, Te = 0, oa = 0, hd = 0, Xa = 0, Jr = 0;
function an(t) {
  if (rt === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== rt ? (e = { i: 0, S: t, p: rt.s, n: void 0, t: rt, e: void 0, x: void 0, r: e }, rt.s !== void 0 && (rt.s.n = e), rt.s = e, t.n = e, 32 & rt.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = rt.s, e.n = void 0, rt.s.n = e, rt.s = e), e) : void 0;
}
function Lt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ir(t, e) {
  return new Lt(t, e);
}
function gi(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function on(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function hi(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function We(t, e) {
  Lt.call(this, void 0), this.x = t, this.s = void 0, this.g = Jr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function fd(t, e) {
  return new We(t, e);
}
function fi(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Te++;
    const r = rt;
    rt = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, fo(t), o;
    } finally {
      rt = r, pa();
    }
  }
}
function fo(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, fi(t);
}
function md(t) {
  if (rt !== this) throw new Error("Out-of-order effect");
  hi(this), rt = t, this.f &= -2, 8 & this.f && fo(this), pa();
}
function sr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function fe(t, e) {
  const r = new sr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function vr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Ir(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Lt.prototype.brand = pd, Lt.prototype.h = function() {
  return !0;
}, Lt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : rn(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Lt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && rn(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Lt.prototype.subscribe = function(t) {
  return fe(() => {
    const e = this.value, r = rt;
    rt = void 0;
    try {
      t(e);
    } finally {
      rt = r;
    }
  }, { name: "sub" });
}, Lt.prototype.valueOf = function() {
  return this.value;
}, Lt.prototype.toString = function() {
  return this.value + "";
}, Lt.prototype.toJSON = function() {
  return this.value;
}, Lt.prototype.peek = function() {
  const t = rt;
  rt = void 0;
  try {
    return this.value;
  } finally {
    rt = t;
  }
}, Object.defineProperty(Lt.prototype, "value", { get() {
  const t = an(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (oa > 100) throw new Error("Cycle detected");
    (function(e) {
      Te !== 0 && oa === 0 && e.l !== Xa && (e.l = Xa, aa = { S: e, v: e.v, i: e.i, o: aa });
    })(this), this.v = t, this.i++, Jr++, Te++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      pa();
    }
  }
} }), We.prototype = new Lt(), We.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Jr)) return !0;
  if (this.g = Jr, this.f |= 1, this.i > 0 && !gi(this)) return this.f &= -2, !0;
  const t = rt;
  try {
    on(this), rt = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return rt = t, hi(this), this.f &= -2, !0;
}, We.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Lt.prototype.S.call(this, t);
}, We.prototype.U = function(t) {
  if (this.t !== void 0 && (Lt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, We.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(We.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = an(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), sr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, sr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, fi(this), on(this), Te++;
  const t = rt;
  return rt = this, md.bind(this, t);
}, sr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = Tr, Tr = this);
}, sr.prototype.d = function() {
  this.f |= 8, 1 & this.f || fo(this);
}, sr.prototype.dispose = function() {
  this.d();
};
oe({ build: (t, e, r) => vr(e), config: ar({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return fe(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function mi() {
  const t = Se(), e = Gt(), r = fr();
  t.clear(), t.append(r), e !== null && r.select(), ge(e) && (e.format = 0);
}
function vi(t, e = mi) {
  return t.registerCommand(Un, (r) => (t.update(e), !0), io);
}
oe({ build: (t, e, r) => vr(e), config: ar({ $onClear: mi }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return fe(() => vi(t, o.value));
} });
function vd(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Na = Sl("format", { parse: (t) => typeof t == "number" ? t : 0 });
class bi extends Va {
  $config() {
    return this.config("decorator-text", { extends: Va, stateConfigs: [{ flat: !0, stateConfig: Na }] });
  }
  getFormat() {
    return Bl(this, Na);
  }
  getFormatFlags(e, r) {
    return Uo(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = Fl[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Gl(this, Na, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = Uo(r, e, null);
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
function bd(t) {
  return t instanceof bi;
}
oe({ name: "@lexical/extension/DecoratorText", nodes: () => [bi], register: (t, e, r) => t.registerCommand(Kn, (o) => {
  const n = Gt();
  if (qn(n) || ge(n)) for (const i of n.getNodes()) bd(i) && i.toggleFormat(o);
  return !1;
}, Hn) });
function xi(t, e) {
  let r;
  return Ir(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Ja = oe({ build: (t) => xi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function dt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function yi(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = yi(r[n], o[n]);
    return t;
  }
  return e;
}
const mo = 0, Za = 1, ki = 2, _a = 3, Kr = 4, ir = 5, Ca = 6, _r = 7;
function Ea(t) {
  return t.id === mo;
}
function Ni(t) {
  return t.id === ki;
}
function xd(t) {
  return function(e) {
    return e.id === Za;
  }(t) || dt(305, String(t.id), String(Za)), Object.assign(t, { id: ki });
}
const yd = /* @__PURE__ */ new Set();
class kd {
  constructor(e, r) {
    Pt(this, "builder");
    Pt(this, "configs");
    Pt(this, "_dependency");
    Pt(this, "_peerNameSet");
    Pt(this, "extension");
    Pt(this, "state");
    Pt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: mo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Tl;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Ni(r) || dt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, d, c) {
      return Object.assign(l, { config: d, id: _a, registerState: c });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: Kr, initResult: d, registerState: c });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Kr && dt(307, String(r.id), String(ir)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: ir, output: s, registerState: l });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== ir && dt(308, String(o.id), String(ir));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Ca });
    }(o), () => {
      const i = this.state;
      i.id !== _r && dt(309, String(o.id), String(_r)), this.state = function(s) {
        return Object.assign(s, { id: ir });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Ca && dt(310, String(r.id), String(Ca)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: _r });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && dt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && dt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Kr;
    }(e) || dt(313, String(e.id), String(Kr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= _a;
    }(e) || dt(314, String(e.id), String(_a)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && dt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && dt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= _r;
    }(e) || dt(316, String(e.id), String(_r)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || yd;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= ir;
      })(e) || dt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const nn = { tag: no };
function Nd() {
  const t = Se();
  t.isEmpty() && t.append(fr());
}
const _d = oe({ config: ar({ setOptions: nn, updateOptions: nn }), init: ({ $initialEditorState: t = Nd }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if ($l(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [Il, Vn, Dl, Rl, jn] }), sn = Symbol.for("@lexical/extension/LexicalBuilder");
function ln() {
}
function Cd(t) {
  throw t;
}
function qr(t) {
  return Array.isArray(t) ? t : [t];
}
const za = "0.43.0+prod.esm";
class cr {
  constructor(e) {
    Pt(this, "roots");
    Pt(this, "extensionNameMap");
    Pt(this, "outgoingConfigEdges");
    Pt(this, "incomingEdges");
    Pt(this, "conflicts");
    Pt(this, "_sortedExtensionReps");
    Pt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = za, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [qr(_d)];
    for (const o of e) r.push(qr(o));
    return new cr(r);
  }
  static maybeFromEditor(e) {
    const r = e[sn];
    return r && (r.PACKAGE_VERSION !== za && dt(292, r.PACKAGE_VERSION, za), r instanceof cr || dt(293)), r;
  }
  static fromEditor(e) {
    const r = cr.maybeFromEditor(e);
    return r === void 0 && dt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(Ln({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [sn]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = ln;
    function r() {
      try {
        e();
      } finally {
        e = ln;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Ie(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && dt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && dt(296);
    const r = qr(e), [o] = r;
    typeof o.name != "string" && dt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && dt(298, o.name), !n) {
      n = new kd(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && dt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && dt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = qr(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (Ni(i)) return;
      const s = o.extension.name;
      var l;
      Ea(i) || dt(300, s, n || "[unknown]"), Ea(l = i) || dt(304, String(l.id), String(mo)), i = Object.assign(l, { id: Za }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const c of d.keys()) {
        const w = this.extensionNameMap.get(c);
        w && r(w, s);
      }
      i = xd(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Ea(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && dt(301, o.name);
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
    return Ie(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const w of l) {
      const { extension: g } = w;
      if (g.onError !== void 0 && (e.onError = g.onError), g.disableEvents !== void 0 && (e.disableEvents = g.disableEvents), g.parentEditor !== void 0 && (e.parentEditor = g.parentEditor), g.editable !== void 0 && (e.editable = g.editable), g.namespace !== void 0 && (e.namespace = g.namespace), g.$initialEditorState !== void 0 && (e.$initialEditorState = g.$initialEditorState), g.nodes) for (const m of vd(g)) {
        if (typeof m != "function") {
          const p = o.get(m.replace);
          p && dt(302, g.name, m.replace.name, p.extension.name), o.set(m.replace, w);
        }
        r.add(m);
      }
      if (g.html) {
        if (g.html.export) for (const [m, p] of g.html.export.entries()) n.set(m, p);
        g.html.import && Object.assign(i, g.html.import);
      }
      g.theme && yi(s, g.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, c = n.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = i), c && (e.html.export = n));
    for (const w of l) w.init(e);
    return e.onError || (e.onError = Cd), e;
  }
}
const Ed = /* @__PURE__ */ new Set(), cn = oe({ build(t, e, r) {
  const o = r.getDependency(Ja).output, n = Ir({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = xi(() => {
  }, () => fe(() => {
    const s = i.peek(), { watchedNodeKeys: l } = n.value;
    let d, c = !1;
    o.value.read(() => {
      if (Gt()) for (const [w, g] of l.entries()) {
        if (g.size === 0) {
          l.delete(w);
          continue;
        }
        const m = Kl(w), p = m && m.isSelected() || !1;
        c = c || p !== (!!s && s.has(w)), p && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !c && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const l = fd(() => (i.value || Ed).has(s)), { watchedNodeKeys: d } = n.peek();
    let c = d.get(s);
    const w = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), w || (d.set(s, c), n.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [Ja], name: "@lexical/extension/NodeSelection" }), zd = Ol("INSERT_HORIZONTAL_RULE_COMMAND");
class wr extends Va {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new wr(e.__key);
  }
  static importJSON(e) {
    return vo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Td, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Wn(r, e.theme.hr), r;
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
function Td() {
  return { node: vo() };
}
function vo() {
  return Ul(wr);
}
function Sd(t) {
  return t instanceof wr;
}
oe({ dependencies: [Ja, cn], name: "@lexical/extension/HorizontalRule", nodes: () => [wr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(cn).output, n = Ir({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Ie(t.registerCommand(zd, (s) => {
    const l = Gt();
    if (!ge(l)) return !1;
    if (l.focus.getNode() !== null) {
      const d = vo();
      dd(d);
    }
    return !0;
  }, io), t.registerCommand(Al, (s) => {
    if (Ml(s.target)) {
      const l = Pl(s.target);
      if (Sd(l)) return function(d, c = !1) {
        const w = Gt(), g = d.isSelected(), m = d.getKey();
        let p;
        c && qn(w) ? p = w : (p = Ll(), jl(p)), g ? p.delete(m) : p.add(m);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Hn), t.registerMutationListener(wr, (s, l) => {
    gd(() => {
      let d = !1;
      const { nodeSelections: c } = n.peek();
      for (const [w, g] of s.entries()) if (g === "destroyed") c.delete(w), d = !0;
      else {
        const m = c.get(w), p = t.getElementByKey(w);
        m ? m.domNode.value = p : (d = !0, c.set(w, { domNode: Ir(p), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: c });
    });
  }), fe(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: d } of n.value.nodeSelections.values()) s.push(fe(() => {
      const c = l.value;
      c && (d.value ? Wn(c, i) : ql(c, i));
    }));
    return Ie(...s);
  }));
} });
oe({ build: (t, e) => vr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: ar({ $getParentEditor: function() {
  const t = Vl();
  return cr.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => fe(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
oe({ build: (t, e, r) => vr(e), config: ar({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return fe(() => {
    if (!o.disabled.value) return ld(t, o.onReposition.value);
  });
} });
function _i(t) {
  return t.canBeEmpty();
}
function Id(t, e, r = _i) {
  return Ie(t.registerCommand(Hl, (o) => {
    const n = Gt();
    if (!ge(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((m) => ta(m) && m.canIndent()).length > 0) return !0;
      const l = s.anchor, d = s.focus, c = d.isBefore(l) ? d : l, w = c.getNode(), g = cd(w);
      if (g.canIndent()) {
        const m = g.getKey();
        let p = Wl();
        if (p.anchor.set(m, 0, "element"), p.focus.set(m, 0, "element"), p = Yl(p), p.anchor.is(c)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Xl : Ko : Jl;
    return t.dispatchCommand(i, void 0);
  }, io), t.registerCommand(Ko, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = Gt();
    if (!ge(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return ud((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, so));
}
oe({ build: (t, e, r) => vr(e), config: ar({ $canIndent: _i, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return fe(() => {
    if (!o.value) return Id(t, n, i);
  });
} });
const Dd = oe({ name: "@lexical/react/ReactProvider" });
function Rd() {
  return Se().getTextContent();
}
function $d(t, e = !0) {
  if (t) return !1;
  let r = Rd();
  return e && (r = r.trim()), r === "";
}
function Od(t) {
  if (!$d(t, !1)) return !1;
  const e = Se().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Zl(n)) return !1;
    if (ze(n)) {
      if (!Ql(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const d = i[o];
        if (!ea(d)) return !1;
      }
    }
  }
  return !0;
}
function Ci(t) {
  return () => Od(t);
}
function Ei(t) {
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
            const [c, w, g, m, p] = d;
            t.update(() => {
              const f = Gt();
              if (ge(f)) {
                const y = f.anchor;
                let v = y.getNode(), E = 0, z = 0;
                if (ea(v) && c >= 0 && w >= 0 && (E = c, z = c + w, f.setTextNodeRange(v, E, v, z)), E === z && g === "" || (f.insertRawText(g), v = y.getNode()), ea(v)) {
                  E = m, z = m + p;
                  const T = v.getTextContentSize();
                  E = E > T ? T : E, z = z > T ? T : z, f.setTextNodeRange(v, E, v, z);
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
oe({ build: (t, e, r) => vr(e), config: ar({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => fe(() => r.getOutput().disabled.value ? void 0 : Ei(t)) });
function Ad(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const bo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : X;
function Md({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = I(() => r.getDecorators());
    return bo(() => r.registerDecoratorListener((s) => {
      sc(() => {
        i(s);
      });
    }), [r]), X(() => {
      i(r.getDecorators());
    }, [r]), G(() => {
      const s = [], l = Object.keys(n);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], w = a(o, { onError: (m) => r._onError(m), children: a(cs, { fallback: null, children: n[c] }) }), g = r.getElementByKey(c);
        g !== null && s.push(lc(w, g, c));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function Pd({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = cr.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Dd.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Ad(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Md, { editor: t, ErrorBoundary: e });
}
function dn(t) {
  return t.getEditorState().read(Ci(t.isComposing()));
}
function Ld({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Ce();
  return function(n) {
    bo(() => Ie(ic(n), Ei(n)), [n]);
  }(o), u(tt, { children: [t, a(jd, { content: e }), a(Pd, { editor: o, ErrorBoundary: r })] });
}
function jd({ content: t }) {
  const [e] = Ce(), r = function(n) {
    const [i, s] = I(() => dn(n));
    return bo(() => {
      function l() {
        const d = dn(n);
        s(d);
      }
      return l(), Ie(n.registerUpdateListener(() => {
        l();
      }), n.registerEditableListener(() => {
        l();
      }));
    }, [n]), i;
  }(e), o = td();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Vd({ defaultSelection: t }) {
  const [e] = Ce();
  return X(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Bd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : X;
function Fd({ onClear: t }) {
  const [e] = Ce();
  return Bd(() => vi(e, t), [e, t]), null;
}
const zi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ee : X;
function Gd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: w, ariaOwns: g, ariaRequired: m, autoCapitalize: p, className: f, id: y, role: v = "textbox", spellCheck: E = !0, style: z, tabIndex: T, "data-testid": C, ...V }, M) {
  const [k, x] = I(t.isEditable()), b = j((S) => {
    S && S.ownerDocument && S.ownerDocument.defaultView ? t.setRootElement(S) : t.setRootElement(null);
  }, [t]), N = G(() => /* @__PURE__ */ function(...S) {
    return (B) => {
      for (const O of S) typeof O == "function" ? O(B) : O != null && (O.current = B);
    };
  }(M, b), [b, M]);
  return zi(() => (x(t.isEditable()), t.registerEditableListener((S) => {
    x(S);
  })), [t]), a("div", { "aria-activedescendant": k ? e : void 0, "aria-autocomplete": k ? r : "none", "aria-controls": k ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": k && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": w, "aria-owns": k ? g : void 0, "aria-readonly": !k || void 0, "aria-required": m, autoCapitalize: p, className: f, contentEditable: k, "data-testid": C, id: y, ref: N, role: v, spellCheck: E, style: z, tabIndex: T, ...V });
}
const Ud = wa(Gd);
function wn(t) {
  return t.getEditorState().read(Ci(t.isComposing()));
}
const Kd = wa(qd);
function qd(t, e) {
  const { placeholder: r, ...o } = t, [n] = Ce();
  return u(tt, { children: [a(Ud, { editor: n, ...o, ref: e }), r != null && a(Hd, { editor: n, content: r })] });
}
function Hd({ content: t, editor: e }) {
  const r = function(s) {
    const [l, d] = I(() => wn(s));
    return zi(() => {
      function c() {
        const w = wn(s);
        d(w);
      }
      return c(), Ie(s.registerUpdateListener(() => {
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
function Wd({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    Kd,
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
const Ti = da(void 0);
function Yd({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = G(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(Ti.Provider, { value: s, children: i });
}
function Si() {
  const t = to(Ti);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Xd() {
  const [t, e] = I(void 0), r = j(() => {
    e(void 0);
  }, []), o = G(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(Ua, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Ka, { children: [
      /* @__PURE__ */ a(qa, { children: /* @__PURE__ */ a(Ha, { children: i }) }),
      s
    ] }) });
  }, [t, r]), n = j(
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
function Jd({
  children: t
}) {
  const [e] = Ce(), [r, o] = I(e), [n, i] = I("paragraph"), [s, l] = Xd(), d = () => {
  };
  return X(() => r.registerCommand(
    Yn,
    (c, w) => (o(w), !1),
    so
  ), [r]), /* @__PURE__ */ u(
    Yd,
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
function Zd(t) {
  const [e] = Ce(), { activeEditor: r } = Si();
  X(() => r.registerCommand(
    Yn,
    () => {
      const o = Gt();
      return o && t(o), !1;
    },
    so
  ), [e, t]), X(() => {
    r.getEditorState().read(() => {
      const o = Gt();
      o && t(o);
    });
  }, [r, t]);
}
const Qd = ye(
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
), Ii = at.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Di({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const l = bt();
  return /* @__PURE__ */ a(
    Sn.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: h(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...s,
      children: /* @__PURE__ */ a(
        Ii.Provider,
        {
          value: at.useMemo(
            () => ({ variant: e, size: r, spacing: o, orientation: n }),
            [e, r, o, n]
          ),
          children: i
        }
      )
    }
  );
}
function Zr({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = at.useContext(Ii);
  return /* @__PURE__ */ a(
    Sn.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: h(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Qd({
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
const un = [
  { format: "bold", icon: Ps, label: "Bold" },
  { format: "italic", icon: Ls, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function tw() {
  const { activeEditor: t } = Si(), [e, r] = I([]), o = j((n) => {
    if (ge(n) || cc(n)) {
      const i = [];
      un.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Zd(o), /* @__PURE__ */ a(
    Di,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: un.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        Zr,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Kn, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function ew({ onClear: t }) {
  const [e] = Ce();
  X(() => {
    t && t(() => {
      e.dispatchCommand(Un, void 0);
    });
  }, [e, t]);
}
function rw({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = I(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Jd, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(tw, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Ld,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(Wd, { placeholder: t }) }),
          ErrorBoundary: Jc
        }
      ),
      e && /* @__PURE__ */ a(Vd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(ew, { onClear: r }),
      /* @__PURE__ */ a(Fd, {})
    ] })
  ] });
}
const aw = {
  namespace: "commentEditor",
  theme: go,
  nodes: ho,
  onError: (t) => {
    console.error(t);
  }
};
function na({
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
        className: h(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ a(
          Kc,
          {
            initialConfig: {
              ...aw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(Ut, { children: [
              /* @__PURE__ */ a(rw, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                Hc,
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
function ow(t, e) {
  const r = ec(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const n = [];
  for (const i of r) if (!$i.has(i.nodeName)) {
    const s = Oi(i, t, n, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Xn && s.insertAfter(Jn());
    for (const s of i) {
      const l = s.getChildren();
      for (const d of l) s.insertBefore(d);
      s.remove();
    }
  }(n), o;
}
function nw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), o = Se().getChildren();
  for (let n = 0; n < o.length; n++)
    Ri(t, o[n], r, e);
  return r.innerHTML;
}
function Ri(t, e, r, o = null) {
  let n = o === null || e.isSelected(o);
  const i = ze(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && ea(e) && (s = rd(o, e, "clone"));
  const l = ze(s) ? s.getChildren() : [], d = tc(t, s.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, s) : s.exportDOM(t);
  const { element: w, after: g } = c;
  if (!w) return !1;
  const m = document.createDocumentFragment();
  for (let p = 0; p < l.length; p++) {
    const f = l[p], y = Ri(t, f, m, o);
    !n && ze(e) && y && e.extractWithChild(f, o, "html") && (n = !0);
  }
  if (n && !i) {
    if ((Gn(w) || qo(w)) && w.append(m), r.append(w), g) {
      const p = g.call(s, w);
      p && (qo(w) ? w.replaceChildren(p) : w.replaceWith(p));
    }
  } else r.append(m);
  return n;
}
const $i = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Oi(t, e, r, o, n = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if ($i.has(t.nodeName)) return s;
  let l = null;
  const d = function(f, y) {
    const { nodeName: v } = f, E = y._htmlConversions.get(v.toLowerCase());
    let z = null;
    if (E !== void 0) for (const T of E) {
      const C = T(f);
      C !== null && (z === null || (z.priority || 0) <= (C.priority || 0)) && (z = C);
    }
    return z !== null ? z.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let w = null;
  if (c !== null) {
    w = c.after;
    const f = c.node;
    if (l = Array.isArray(f) ? f[f.length - 1] : f, l !== null) {
      for (const [, y] of n) if (l = y(l, i), !l) break;
      l && s.push(...Array.isArray(f) ? f : [l]);
    }
    c.forChild != null && n.set(t.nodeName, c.forChild);
  }
  const g = t.childNodes;
  let m = [];
  const p = (l == null || !rc(l)) && (l != null && ta(l) || o);
  for (let f = 0; f < g.length; f++) m.push(...Oi(g[f], e, r, p, new Map(n), l));
  return w != null && (m = w(m)), Ho(t) && (m = iw(t, m, p ? () => {
    const f = new Xn();
    return r.push(f), f;
  } : fr)), l == null ? m.length > 0 ? s = s.concat(m) : Ho(t) && function(f) {
    return f.nextSibling == null || f.previousSibling == null ? !1 : Wo(f.nextSibling) && Wo(f.previousSibling);
  }(t) && (s = s.concat(Jn())) : ze(l) && l.append(...m), s;
}
function iw(t, e, r) {
  const o = t.style.textAlign, n = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (ta(l)) o && !l.getFormat() && l.setFormat(o), n.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && ta(e[s + 1])) {
      const d = r();
      d.setFormat(o), d.append(...i), n.push(d), i = [];
    }
  }
  return n;
}
function Ai(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Mi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Mi(e.children)
  ) : !1;
}
function ae(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Mi(t.root.children) : !1;
}
function sw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Zn({
    namespace: "EditorUtils",
    theme: go,
    nodes: ho,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = ow(e, n);
      Se().clear(), ac(i);
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
function ia(t) {
  const e = Zn({
    namespace: "EditorUtils",
    theme: go,
    nodes: ho,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = nw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function xo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function Qe({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ a(
    gs.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const lw = ye(
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
function yo({
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
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        lw({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Hp({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ge.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function Pi({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ a(
    Qe,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
const Li = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), pn = (t, e) => t[e] ?? e;
function ji({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = pn(o, "%cancelButton_tooltip%"), l = i ?? pn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(yo, { children: [
    /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(
        F,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ua, {})
        }
      ) }),
      /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(Pi, {}),
    /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(
        F,
        {
          "aria-label": l,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Be, {})
        }
      ) }),
      /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ a("p", { children: l }) })
    ] }) })
  ] });
}
function Qr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function ko(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const cw = {
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
function Ta(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Wp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = I(cw), [l, d] = I(n), [c, w] = I(!1), g = K(void 0), m = K(null);
  X(() => {
    let v = !0;
    const E = m.current;
    if (!E) return;
    const z = setTimeout(() => {
      v && Ai(E);
    }, 300);
    return () => {
      v = !1, clearTimeout(z);
    };
  }, []);
  const p = j(() => {
    if (!ae(i)) return;
    const v = ia(i);
    e(v, l);
  }, [i, e, l]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: y }),
      /* @__PURE__ */ a(
        ji,
        {
          onCancelClick: r,
          onAcceptClick: p,
          canAccept: ae(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(Ne, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ u(
        F,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(Dn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Ta(l !== void 0 ? l : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        _e,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Re, { children: /* @__PURE__ */ a($e, { children: t.map((v) => /* @__PURE__ */ a(
            ke,
            {
              onSelect: () => {
                d(v || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Ta(v, o) })
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
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : ko(v) && (v.preventDefault(), v.stopPropagation(), ae(i) && p());
        },
        onKeyDown: (v) => {
          xo(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          na,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: f,
            onClear: (v) => {
              g.current = v;
            }
          }
        )
      }
    )
  ] });
}
const Yp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Li
]), Xp = [
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
], dw = ["input", "select", "textarea", "button"], ww = ["button", "textbox"], Vi = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const n = K(null), [i, s] = I(void 0), [l, d] = I(void 0), c = j(
    (p) => {
      s(p);
      const f = t.find((v) => v.id === p);
      f && (e == null || e(f));
      const y = document.getElementById(p);
      y && (y.scrollIntoView({ block: "center" }), y.focus()), n.current && n.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), w = j(
    (p) => {
      const f = t.find((y) => y.id === p);
      f && (d((y) => y === p ? void 0 : p), r == null || r(f));
    },
    [r, t]
  ), g = (p) => {
    if (!p) return !1;
    const f = p.tagName.toLowerCase();
    if (p.isContentEditable || dw.includes(f)) return !0;
    const y = p.getAttribute("role");
    if (y && ww.includes(y)) return !0;
    const v = p.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, m = j(
    (p) => {
      var k;
      const f = p.target, y = (x) => x ? document.getElementById(x) : void 0, v = y(l), E = y(i);
      if (!!(v && f && v.contains(f) && f !== v) && g(f)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !f.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const x = t.find((b) => b.id === l);
            x && c(x.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!v) return;
          const x = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (x.length === 0) return;
          const b = x.findIndex((S) => S === f);
          if (b === -1) return;
          let N;
          p.key === "ArrowDown" ? N = Math.min(b + 1, x.length - 1) : N = Math.max(b - 1, 0), N !== b && (p.preventDefault(), p.stopPropagation(), (k = x[N]) == null || k.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((x) => x.id === i);
      let V = C;
      switch (p.key) {
        case "ArrowDown":
          V = Math.min(C + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          V = Math.max(C - 1, 0), p.preventDefault();
          break;
        case "Home":
          V = 0, p.preventDefault();
          break;
        case "End":
          V = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          i && w(i), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const x = E;
          if (x) {
            const b = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), N = x.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), S = b ?? N;
            if (S) {
              p.preventDefault(), S.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (g(f) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const M = t[V];
      M && c(M.id);
    },
    [t, c, i, l, w, o]
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
}, uw = ye(
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
function De({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const n = r ? Ge.Root : "span";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        uw({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function pw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function Jp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function Zp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        t
      ),
      ...e
    }
  );
}
function Qp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-description",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function gw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
        t
      ),
      ...e
    }
  );
}
function tg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        t
      ),
      ...e
    }
  );
}
function hw({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    ro.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function eg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ro.Image,
    {
      "data-slot": "avatar-image",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        t
      ),
      ...e
    }
  );
}
function fw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ro.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
const No = da(void 0);
function Ae() {
  const t = to(No);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const or = ye("", {
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
function me({ variant: t = "default", ...e }) {
  const r = bt(), o = at.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ a(No.Provider, { value: o, children: /* @__PURE__ */ a(It.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function mw({
  ...t
}) {
  return /* @__PURE__ */ a(It.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ve({
  ...t
}) {
  return /* @__PURE__ */ a(It.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function be({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  children: o,
  ...n
}) {
  const i = bt();
  return /* @__PURE__ */ a(It.Portal, { children: /* @__PURE__ */ a(
    It.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
      align: e,
      className: h(
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
function Bi({ ...t }) {
  return /* @__PURE__ */ a(It.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Je({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = bt(), i = Ae();
  return /* @__PURE__ */ a(
    It.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: i.variant })
      ),
      dir: n,
      ...o
    }
  );
}
function ue({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  const i = bt(), s = Ae();
  return /* @__PURE__ */ u(
    It.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: s.variant })
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
            children: /* @__PURE__ */ a(It.ItemIndicator, { children: /* @__PURE__ */ a(rr, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vw({
  ...t
}) {
  return /* @__PURE__ */ a(It.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function bw({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const n = bt(), i = Ae();
  return /* @__PURE__ */ u(
    It.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: i.variant })
      ),
      dir: n,
      ...o,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ a(It.ItemIndicator, { children: /* @__PURE__ */ a(rr, {}) })
          }
        ),
        e
      ]
    }
  );
}
function tr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ a(
    It.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: h(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Fe({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    It.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function rg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: h(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function xw({ ...t }) {
  return /* @__PURE__ */ a(It.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function yw({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Ae();
  return /* @__PURE__ */ u(
    It.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: n.variant })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ao, { className: "tw:ms-auto" })
      ]
    }
  );
}
function kw({ className: t, children: e, ...r }) {
  const o = bt();
  return /* @__PURE__ */ a(
    It.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: h(
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
function gn({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [d, c] = I(!1), [w, g] = I(), m = K(null);
  X(() => {
    if (!d) return;
    let C = !0;
    const V = m.current;
    if (!V) return;
    const M = setTimeout(() => {
      C && Ai(V);
    }, 300);
    return () => {
      C = !1, clearTimeout(M);
    };
  }, [d]);
  const p = j(
    (C) => {
      C && C.stopPropagation(), c(!1), g(void 0), s == null || s(!1);
    },
    [s]
  ), f = j(
    async (C) => {
      if (C && C.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        ia(w)
      ) && (c(!1), g(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), y = G(() => {
    const C = new Date(t.date), V = Ts(
      C,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), M = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Xe(r["%comment_dateAtTime%"], {
      date: V,
      time: M
    });
  }, [t.date, r]), v = G(() => t.user, [t.user]), E = G(
    () => t.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), z = G(() => Ss(t.contents), [t.contents]), T = G(() => {
    if (o && l)
      return /* @__PURE__ */ u(tt, { children: [
        /* @__PURE__ */ u(
          Je,
          {
            onClick: (C) => {
              C.stopPropagation(), c(!0), g(sw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(js, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Je,
          {
            onClick: async (C) => {
              C.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(Vs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
      className: h("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(hw, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(fw, { className: "tw:text-xs tw:font-medium", children: E }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: v }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: y }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(De, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              Qr(t.assignedUser, r)
            ] })
          ] }),
          d && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: m,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), p()) : ko(C) && (C.preventDefault(), C.stopPropagation(), ae(w) && f());
              },
              onKeyDown: (C) => {
                xo(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              onClick: (C) => {
                C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  na,
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
                    onSerializedChange: (C) => g(C)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    F,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(ua, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    F,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ae(w),
                      children: /* @__PURE__ */ a(Rn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ u(tt, { children: [
            t.status === "Resolved" && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ a(
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
                dangerouslySetInnerHTML: { __html: z }
              }
            )
          ] })
        ] }),
        T && /* @__PURE__ */ u(me, { children: [
          /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ a(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Bs, {}) }) }),
          /* @__PURE__ */ a(be, { align: "end", children: T })
        ] })
      ]
    }
  );
}
const hn = {
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
function Nw({
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
  threadStatus: w,
  handleAddCommentToThread: g,
  handleUpdateComment: m,
  handleDeleteComment: p,
  handleReadStatusChange: f,
  assignableUsers: y,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: E,
  canUserResolveThreadCallback: z,
  canUserEditOrDeleteCommentCallback: T,
  isRead: C = !1,
  autoReadDelay: V = 5,
  onVerseRefClick: M,
  initialAssignedUser: k
}) {
  const [x, b] = I(hn), [N, S] = I(), [B, O] = I(), A = o, [U, D] = I(!1), [W, pt] = I(!1), [_t, Rt] = I(!1), [et, $t] = I(!1), [q, ot] = I(!1), [it, st] = I(C), [lt, Vt] = I(!1), vt = K(void 0), [Wt, Yt] = I(/* @__PURE__ */ new Map());
  X(() => {
    let R = !0;
    return (async () => {
      const gt = z ? await z(d) : !1;
      R && ot(gt);
    })(), () => {
      R = !1;
    };
  }, [d, z]), X(() => {
    let R = !0;
    if (!o) {
      $t(!1), Yt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const gt = E ? await E(d) : !1;
      R && $t(gt);
    })(), () => {
      R = !1;
    };
  }, [o, d, E]);
  const $ = K("idle");
  X(() => {
    if (!o) {
      $.current !== "idle" && (S(void 0), O(void 0), $.current = "idle");
      return;
    }
    $.current === "idle" && ($.current = "pending"), et ? $.current === "pending" && k !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    k !== i && (S(k), $.current = "auto-populated") : $.current === "auto-populated" && (S(void 0), $.current = "pending");
  }, [o, k, et, i]);
  const Ot = G(() => e.filter((R) => !R.deleted), [e]);
  X(() => {
    let R = !0;
    if (!o || !T) {
      Yt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const gt = /* @__PURE__ */ new Map();
      await Promise.all(
        Ot.map(async (kt) => {
          const Ke = await T(kt.id);
          R && gt.set(kt.id, Ke);
        })
      ), R && Yt(gt);
    })(), () => {
      R = !1;
    };
  }, [o, Ot, T]);
  const Bt = G(() => Ot[0], [Ot]), ne = K(null), Xt = K(void 0), At = j(() => {
    var R;
    (R = Xt.current) == null || R.call(Xt), b(hn);
  }, []), Me = j(() => {
    const R = !it;
    st(R), Vt(!R), f == null || f(d, R);
  }, [it, f, d]);
  X(() => {
    D(!1);
  }, [o]), X(() => {
    if (o && !it && !lt) {
      const R = setTimeout(() => {
        st(!0), f == null || f(d, !0);
      }, V * 1e3);
      return vt.current = R, () => clearTimeout(R);
    }
    vt.current && (clearTimeout(vt.current), vt.current = void 0);
  }, [o, it, lt, V, d, f]);
  const Jt = G(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Zt = G(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const R = Qr(i, r);
    return Xe(r["%comment_assigned_to%"], {
      assignedUser: R
    });
  }, [i, r]), L = G(() => Ot.slice(1), [Ot]), Y = G(() => L.length ?? 0, [L.length]), ct = G(() => Y > 0, [Y]), nt = G(() => U || Y <= 2 ? L : L.slice(-2), [L, Y, U]), ht = G(() => U || Y <= 2 ? 0 : Y - 2, [Y, U]), xt = G(
    () => Y === 1 ? Jt.singleReply : Xe(Jt.multipleReplies, { count: Y }),
    [Y, Jt]
  ), yt = G(
    () => ht === 1 ? Jt.singleReply : Xe(Jt.multipleReplies, { count: ht }),
    [ht, Jt]
  );
  X(() => {
    !o && W && ct && pt(!1);
  }, [o, W, ct]);
  const ft = j(
    async (R) => {
      R && R.stopPropagation();
      const ut = ae(x) ? ia(x) : void 0;
      if (N !== void 0) {
        await g({
          threadId: d,
          contents: ut,
          assignedUser: N
        }) && (O(N), ut && At());
        return;
      }
      ut && await g({ threadId: d, contents: ut }) && At();
    },
    [
      At,
      x,
      g,
      N,
      d
    ]
  ), Ct = j(
    async (R) => {
      const ut = ae(x) ? ia(x) : void 0, gt = R.status ? R.assignedUser : N ?? R.assignedUser, kt = await g({
        ...R,
        contents: ut,
        assignedUser: gt
      });
      return kt && (gt !== void 0 && O(gt), ut && At()), kt;
    },
    [At, x, g, N]
  );
  if (Ot.length !== 0)
    return /* @__PURE__ */ a(
      pw,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: h(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !o },
          {
            "tw:bg-primary-foreground": !o && w !== "Resolved" && it,
            "tw:bg-background": o && w !== "Resolved" && it,
            "tw:bg-muted": w === "Resolved",
            "tw:bg-accent": !it && !o && w !== "Resolved"
          }
        ),
        onClick: () => {
          l(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ u(gw, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              Zt && /* @__PURE__ */ a(De, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Zt }),
              /* @__PURE__ */ a(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (R) => {
                    R.stopPropagation(), Me();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": it ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: it ? /* @__PURE__ */ a(Fs, {}) : /* @__PURE__ */ a(Gs, {})
                }
              ),
              q && w !== "Resolved" && /* @__PURE__ */ a(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (R) => {
                    R.stopPropagation(), Ct({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
              "p",
              {
                ref: ne,
                className: h(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": A
                  },
                  { "tw:whitespace-nowrap": !A }
                ),
                children: [
                  n && M ? /* @__PURE__ */ a(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (R) => {
                        R.stopPropagation(), M(c);
                      },
                      children: n
                    }
                  ) : n,
                  /* @__PURE__ */ u("span", { className: t, children: [
                    Bt.contextBefore,
                    /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Bt.selectedText }),
                    Bt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ a(
              gn,
              {
                comment: Bt,
                localizedStrings: r,
                isThreadExpanded: o,
                threadStatus: w,
                handleAddCommentToThread: Ct,
                handleUpdateComment: m,
                handleDeleteComment: p,
                onEditingChange: pt,
                canEditOrDelete: (!W && Wt.get(Bt.id)) ?? !1,
                canUserResolveThread: q
              }
            )
          ] }),
          /* @__PURE__ */ u(tt, { children: [
            ct && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Qe, {}) }),
              /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: xt })
            ] }),
            !o && ae(x) && /* @__PURE__ */ a(
              na,
              {
                editorSerializedState: x,
                onSerializedChange: (R) => b(R),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ u(tt, { children: [
              ht > 0 && /* @__PURE__ */ u(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (R) => {
                    R.stopPropagation(), D(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (R) => {
                    (R.key === "Enter" || R.key === " ") && (R.preventDefault(), R.stopPropagation(), D(!0));
                  },
                  children: [
                    /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(Qe, {}) }),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: yt }),
                      U ? /* @__PURE__ */ a(Us, {}) : /* @__PURE__ */ a(Ze, {})
                    ] })
                  ]
                }
              ),
              nt.map((R) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                gn,
                {
                  comment: R,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: m,
                  handleDeleteComment: p,
                  onEditingChange: pt,
                  canEditOrDelete: (!W && Wt.get(R.id)) ?? !1
                }
              ) }, R.id)),
              v !== !1 && (!W || ae(x)) && /* @__PURE__ */ u(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (R) => R.stopPropagation(),
                  onKeyDownCapture: (R) => {
                    ko(R) && (R.preventDefault(), R.stopPropagation(), (ae(x) || N !== void 0 && N !== B) && ft());
                  },
                  onKeyDown: (R) => {
                    xo(R), (R.key === "Enter" || R.key === " ") && R.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ a(
                      na,
                      {
                        editorSerializedState: x,
                        onSerializedChange: (R) => b(R),
                        placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (R) => {
                          Xt.current = R;
                        }
                      }
                    ),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      N !== void 0 && (ae(x) || N !== B) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Xe(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: Qr(
                            N,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ u(Ne, { open: _t, onOpenChange: Rt, children: [
                        /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ a(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !et || !y || y.length === 0 || !y.includes(s),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ a(Dn, {})
                          }
                        ) }),
                        /* @__PURE__ */ a(
                          _e,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (R) => {
                              R.key === "Escape" && (R.stopPropagation(), Rt(!1));
                            },
                            children: /* @__PURE__ */ a(Re, { children: /* @__PURE__ */ a($e, { children: y == null ? void 0 : y.map((R) => /* @__PURE__ */ a(
                              ke,
                              {
                                onSelect: () => {
                                  S(R !== i ? R : void 0), $.current = "user-selected", O(void 0), Rt(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: Qr(R, r) })
                              },
                              R || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        F,
                        {
                          size: "icon",
                          onClick: ft,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !ae(x) && (N === void 0 || N === B),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ a(Rn, {})
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
function ag({
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
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: g,
  canUserResolveThreadCallback: m,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: f,
  onSelectedThreadChange: y,
  onVerseRefClick: v
}) {
  const [E, z] = I(/* @__PURE__ */ new Set()), [T, C] = I(), [V, M] = I(), k = j(
    async (D) => {
      const W = await i(D);
      return W !== void 0 && D.assignedUser !== void 0 && D.assignedUser !== "" && M(D.assignedUser), W;
    },
    [i]
  );
  X(() => {
    f && (z((D) => new Set(D).add(f)), C(f));
  }, [f]);
  const x = r.filter(
    (D) => D.comments.some((W) => !W.deleted)
  ), b = x.map((D) => ({ id: D.id })), N = j(
    (D) => {
      z((W) => new Set(W).add(D.id)), C(D.id), y == null || y(D.id);
    },
    [y]
  ), S = j(
    (D) => {
      const W = E.has(D);
      z((pt) => {
        const _t = new Set(pt);
        return _t.has(D) ? _t.delete(D) : _t.add(D), _t;
      }), C(D), y == null || y(W ? void 0 : D);
    },
    [E, y]
  ), { listboxRef: B, activeId: O, handleKeyDown: A } = Vi({
    options: b,
    onOptionSelect: N
  }), U = j(
    (D) => {
      D.key === "Escape" ? (T && E.has(T) && (z((W) => {
        const pt = new Set(W);
        return pt.delete(T), pt;
      }), C(void 0), y == null || y(void 0)), D.preventDefault(), D.stopPropagation()) : A(D);
    },
    [T, E, A, y]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: B,
      "aria-activedescendant": O ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: U,
      children: x.map((D) => /* @__PURE__ */ a(
        "div",
        {
          className: h({
            "tw:opacity-60": D.status === "Resolved"
          }),
          children: /* @__PURE__ */ a(
            Nw,
            {
              classNameForVerseText: e,
              comments: D.comments,
              localizedStrings: n,
              verseRef: D.verseRef,
              handleSelectThread: S,
              threadId: D.id,
              thread: D,
              isRead: D.isRead,
              isSelected: E.has(D.id),
              currentUser: o,
              assignedUser: D.assignedUser,
              threadStatus: D.status,
              handleAddCommentToThread: k,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: w,
              canUserAssignThreadCallback: g,
              canUserResolveThreadCallback: m,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: v,
              initialAssignedUser: V
            }
          )
        },
        D.id
      ))
    }
  );
}
function _w({ table: t }) {
  return /* @__PURE__ */ u(me, { children: [
    /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ u(F, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Ks, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(be, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(tr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Fe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        ue,
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
function ur({ ...t }) {
  return /* @__PURE__ */ a(jt.Root, { "data-slot": "select", ...t });
}
function Cw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    jt.Group,
    {
      "data-slot": "select-group",
      className: h("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function pr({ ...t }) {
  return /* @__PURE__ */ a(jt.Value, { "data-slot": "select-value", ...t });
}
function gr({ className: t, size: e = "default", children: r, ...o }) {
  const n = bt();
  return /* @__PURE__ */ u(
    jt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: h(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(jt.Icon, { asChild: !0, children: /* @__PURE__ */ a(bs, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function hr({
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
  const i = bt();
  return /* @__PURE__ */ a(jt.Portal, { children: /* @__PURE__ */ u(
    jt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: h(
        "pr-twp tw:relative tw:z-50 tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: r,
      align: o,
      ...n,
      children: [
        /* @__PURE__ */ a(Ew, {}),
        /* @__PURE__ */ a(
          jt.Viewport,
          {
            "data-position": r,
            className: h(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(zw, {})
      ]
    }
  ) });
}
function og({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    jt.Label,
    {
      "data-slot": "select-label",
      className: h("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ie({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    jt.Item,
    {
      "data-slot": "select-item",
      className: h(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(jt.ItemIndicator, { children: /* @__PURE__ */ a(rr, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(jt.ItemText, { children: e })
      ]
    }
  );
}
function ng({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    jt.Separator,
    {
      "data-slot": "select-separator",
      className: h(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Ew({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    jt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: h(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(vs, {})
    }
  );
}
function zw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    jt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: h(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(ms, {})
    }
  );
}
function Tw({ table: t }) {
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ a("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ u(
        ur,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(pr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(hr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(ie, { value: `${e}`, children: e }, e)) })
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
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(qs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(Hs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Ws, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Ys, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const fn = `
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
function Sw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Dr(t, e) {
  const r = e ? `${fn}, ${e}` : fn;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Sw(o)
  );
}
function _o({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const n = at.useRef(null);
  at.useEffect(() => {
    typeof r == "function" ? r(n.current) : r && "current" in r && (r.current = n.current);
  }, [r]), at.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        Dr(s, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
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
        s.preventDefault(), Dr(l)[0].focus();
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
        className: h("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ a(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
            onKeyDown: i,
            className: h(
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
function Co({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: h(
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
function Eo({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: h(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function Iw(t) {
  at.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const n = t.current ? Dr(t.current) : [], i = n.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function Dw(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Rw(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ve({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: n,
  ...i
}) {
  const s = at.useRef(null);
  at.useEffect(() => {
    typeof n == "function" ? n(s.current) : n && "current" in n && (n.current = s.current);
  }, [n]), Iw(s);
  const l = at.useMemo(
    () => s.current ? Dr(s.current) : [],
    [s]
  ), d = at.useCallback(
    (w) => {
      const { current: g } = s;
      if (!g || !g.parentElement) return;
      const m = g.closest("table"), p = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Dr(m).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], f = p.indexOf(g), y = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Rw(p, f, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Dw(l, y, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const v = g.closest("table");
        v && v.focus();
      }
      e == null || e(w);
    },
    [s, l, e]
  ), c = at.useCallback(
    (w) => {
      o && (r == null || r(w));
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
      className: h(
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
function sa({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: h(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: h(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function sg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function la({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function $w({
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
  var M;
  const [w, g] = I([]), [m, p] = I([]), [f, y] = I({}), [v, E] = I({}), z = G(() => e ?? [], [e]), T = Qn({
    data: z,
    columns: t,
    getCoreRowModel: ei(),
    ...r && { getPaginationRowModel: wc() },
    onSortingChange: g,
    getSortedRowModel: ti(),
    onColumnFiltersChange: p,
    getFilteredRowModel: dc(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: E,
    state: {
      sorting: w,
      columnFilters: m,
      columnVisibility: f,
      rowSelection: v
    }
  }), C = T.getVisibleFlatColumns();
  let V;
  return d ? V = Array.from({ length: 10 }).map((b, N) => `skeleton-row-${N}`).map((b) => /* @__PURE__ */ a(Ve, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(dr, { colSpan: C.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(la, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, b)) : ((M = T.getRowModel().rows) == null ? void 0 : M.length) > 0 ? V = T.getRowModel().rows.map((k) => /* @__PURE__ */ a(
    Ve,
    {
      onClick: () => s(k, T),
      "data-state": k.getIsSelected() && "selected",
      children: k.getVisibleCells().map((x) => /* @__PURE__ */ a(dr, { children: zr(x.column.columnDef.cell, x.getContext()) }, x.id))
    },
    k.id
  )) : V = /* @__PURE__ */ a(Ve, { children: /* @__PURE__ */ a(dr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: c }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: l, children: [
    n && /* @__PURE__ */ a(_w, { table: T }),
    /* @__PURE__ */ u(_o, { stickyHeader: i, children: [
      /* @__PURE__ */ a(Co, { stickyHeader: i, children: T.getHeaderGroups().map((k) => /* @__PURE__ */ a(Ve, { children: k.headers.map((x) => /* @__PURE__ */ a(sa, { className: "tw:p-0", children: x.isPlaceholder ? void 0 : zr(x.column.columnDef.header, x.getContext()) }, x.id)) }, k.id)) }),
      /* @__PURE__ */ a(Eo, { children: V })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.previousPage(),
          disabled: !T.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.nextPage(),
          disabled: !T.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Tw, { table: T })
  ] });
}
function Ow(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = e.get(r.projectId), n = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === r.scrollGroupId) || o.push(n) : e.set(r.projectId, [n]);
  }), e.forEach((r) => r.sort((o, n) => o.scrollGroupId - n.scrollGroupId)), e;
}
function mn(t, e, r) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === r);
}
function Sa(t) {
  const e = Ow(t.openTabs);
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
        isSelected: mn(r, n.id, void 0),
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
        isSelected: mn(r, n.id, s.scrollGroupId),
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
function vn(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Ia(t, e) {
  const r = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - n;
}
function Aw(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Ia) }];
  const r = t.filter(vn).sort(Ia), o = t.filter((i) => !vn(i)).sort(Ia);
  if (r.length === 0)
    return [{ kind: "flat", rows: o }];
  const n = [{ kind: "openTabs", rows: r }];
  return o.length > 0 && n.push({ kind: "other", rows: o }), n;
}
const Mw = {
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
function Pw(t) {
  return { ...Mw, ...t };
}
function Rr(t) {
  return Wr[Aa(t)] ?? String(t);
}
const Lw = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function jw({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Rr(t);
  return e ? /* @__PURE__ */ a(
    De,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Lw,
      children: r
    }
  ) : /* @__PURE__ */ a(De, { variant: "secondary", children: r });
}
function Vw({ row: t, mode: e, strings: r, onClick: o, onOpen: n, selectedRowRef: i }) {
  const [s, l] = I(!1), d = K(null), c = !!(t.language || t.languageCode), w = c || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, g = j(() => {
    if (w) {
      l(!0);
      return;
    }
    const E = d.current;
    E && E.scrollWidth > E.clientWidth && l(!0);
  }, [w]), m = /* @__PURE__ */ a(Be, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let p;
  e === "project" ? t.openGroups.length > 0 && (p = /* @__PURE__ */ a("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((E) => /* @__PURE__ */ a(De, { variant: "secondary", children: Rr(E) }, E)) })) : t.scrollGroupId !== void 0 && (p = /* @__PURE__ */ u("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      jw,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ u(
      F,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (E) => {
          E.stopPropagation(), n(t);
        },
        onMouseDown: (E) => E.stopPropagation(),
        "aria-label": r.openButtonLabel,
        title: r.openButtonLabel,
        children: [
          /* @__PURE__ */ a(In, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const f = /* @__PURE__ */ u(
    ke,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: g,
      onPointerLeave: () => l(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: m }),
        /* @__PURE__ */ u(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ a("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              /* @__PURE__ */ a("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        p
      ]
    }
  ), y = t.scrollGroupId !== void 0 ? Rr(t.scrollGroupId) : void 0, v = t.isBoundButClosed && y ? r.boundButClosedTooltip.replace("{group}", y) : void 0;
  return /* @__PURE__ */ u(Kt, { open: s, delayDuration: 400, children: [
    /* @__PURE__ */ a(qt, { asChild: !0, children: f }),
    /* @__PURE__ */ u(
      Ht,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: co },
        children: [
          /* @__PURE__ */ a("div", { className: "tw:font-semibold", children: t.fullName }),
          c && /* @__PURE__ */ u("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && y && /* @__PURE__ */ u("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " (",
              y,
              ")"
            ] })
          ] }),
          v && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: v }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Bw({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: o,
  strings: n
}) {
  const i = !!r;
  return /* @__PURE__ */ u(me, { children: [
    /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ a(
      F,
      {
        variant: "ghost",
        size: "sm",
        className: h(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": n.filterAriaLabel,
        "aria-pressed": i,
        title: n.filterAriaLabel,
        onMouseDown: (s) => s.preventDefault(),
        children: /* @__PURE__ */ a($n, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ u(be, { align: "end", className: "tw:w-56", style: { zIndex: co }, children: [
      /* @__PURE__ */ a(tr, { children: n.groupSectionLabel }),
      /* @__PURE__ */ a(
        ue,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (s) => s.preventDefault(),
          children: n.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ u(tt, { children: [
        /* @__PURE__ */ a(Fe, {}),
        /* @__PURE__ */ a(tr, { children: n.filterSectionLabel }),
        /* @__PURE__ */ a(
          ue,
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
function Fw(t) {
  const [e, r] = I(!1), [o, n] = I(""), [i, s] = I(t.defaultGroupByOpenTabs ?? !0), [l, d] = I(!1), c = K(null), w = j((k) => {
    r(k), k || n("");
  }, []);
  X(() => {
    if (!e) return;
    const k = window.requestAnimationFrame(() => {
      const x = c.current;
      x && x.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(k);
  }, [e]);
  const g = Pw(t.localizedStrings), m = G(() => t.mode === "project" ? Sa({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Sa({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Sa({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), p = G(() => {
    const k = o.trim().toLowerCase();
    let x = m;
    return k && (x = x.filter(
      (b) => b.shortName.toLowerCase().includes(k) || b.fullName.toLowerCase().includes(k) || (b.language ?? "").toLowerCase().includes(k) || (b.languageCode ?? "").toLowerCase().includes(k)
    )), t.mode === "project-multi" && l && (x = x.filter((b) => b.isSelected)), x;
  }, [m, o, t.mode, l]), f = G(
    () => Aw(p, i),
    [p, i]
  ), y = G(() => {
    if (t.mode !== "project-multi") return [];
    const k = [];
    return t.projects.forEach((x) => {
      const b = t.openTabs.filter((S) => S.projectId === x.id);
      if (b.length === 0) {
        k.push({ projectId: x.id });
        return;
      }
      const N = /* @__PURE__ */ new Set();
      b.forEach((S) => {
        N.has(S.scrollGroupId) || (N.add(S.scrollGroupId), k.push({ projectId: x.id, scrollGroupId: S.scrollGroupId }));
      });
    }), k;
  }, [t.mode, t.projects, t.openTabs]), v = (k) => {
    if (k.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(k.projectId, k.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(k.projectId, k.scrollGroupId);
    }
  }, E = (k) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: k.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const x = t.selection.pairs, b = (S) => S.projectId === k.projectId && S.scrollGroupId === k.scrollGroupId, N = x.some(b) ? x.filter((S) => !b(S)) : [...x, { projectId: k.projectId, scrollGroupId: k.scrollGroupId }];
        t.onChangeSelection({ pairs: N }), N.length === 0 && l && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (k.isBoundButClosed && k.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(k.projectId, k.scrollGroupId), r(!1);
          return;
        }
        if (k.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: k.projectId,
            scrollGroupId: k.scrollGroupId
          }), r(!1);
          return;
        }
        const x = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: k.projectId, scrollGroupId: x }), t.onOpenProjectInGroup(k.projectId, x), r(!1);
      }
    }
  }, z = () => {
    if (t.mode !== "project-multi") return;
    const k = t.selection.pairs, x = new Set(k.map((N) => `${N.projectId}:${N.scrollGroupId ?? ""}`)), b = [...k];
    y.forEach((N) => {
      const S = `${N.projectId}:${N.scrollGroupId ?? ""}`;
      x.has(S) || (x.add(S), b.push(N));
    }), t.onChangeSelection({ pairs: b });
  }, T = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && d(!1));
  }, C = G(() => {
    switch (t.mode) {
      case "project": {
        const k = t.projects.find((b) => b.id === t.selection.projectId), x = k ? k.shortName : t.buttonPlaceholder ?? "";
        return { node: x, title: x };
      }
      case "project-multi": {
        const { pairs: k } = t.selection;
        if (k.length === 0) {
          const S = t.buttonPlaceholder ?? "";
          return { node: S, title: S };
        }
        const x = [];
        if (k.forEach((S) => {
          const B = t.projects.find((O) => O.id === S.projectId);
          B && x.push({ project: B, scrollGroupId: S.scrollGroupId });
        }), x.length === 0) {
          const S = t.buttonPlaceholder ?? "";
          return { node: S, title: S };
        }
        if (t.getSelectedText) {
          const S = t.getSelectedText(x);
          return { node: S, title: S };
        }
        const b = x.map(
          ({ project: S, scrollGroupId: B }) => B === void 0 ? S.shortName : `${S.shortName} (${Rr(B)})`
        ).join(", ");
        if (x.length === 1) return { node: b, title: b };
        const N = x.length.toString();
        return {
          node: /* @__PURE__ */ u(tt, { children: [
            /* @__PURE__ */ a(De, { variant: "muted", className: "tw:shrink-0", children: N }),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${N} ${b}`
        };
      }
      case "projectScrollGroup": {
        const k = t.projects.find((N) => N.id === t.selection.projectId);
        if (!k) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        const x = t.selection.scrollGroupId;
        if (x === void 0)
          return { node: k.shortName, title: k.shortName };
        const b = `${k.shortName} · ${Rr(x)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), V = t.mode === "project-multi" ? /* @__PURE__ */ a(oo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }), M = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? v : void 0;
  return /* @__PURE__ */ u(Ne, { open: e, onOpenChange: w, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ u(
      F,
      {
        variant: t.buttonVariant ?? "outline",
        role: "combobox",
        "aria-expanded": e,
        "aria-label": t.ariaLabel,
        disabled: t.isDisabled ?? !1,
        className: h(
          "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
          t.buttonClassName
        ),
        children: [
          /* @__PURE__ */ a("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof C.node == "string" ? /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:truncate", children: C.node }) : C.node }),
          V
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      _e,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: h("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ a(Ut, { delayDuration: 400, children: /* @__PURE__ */ u(Re, { shouldFilter: !1, children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ a("div", { className: "tw:flex-1", children: /* @__PURE__ */ a(
              mr,
              {
                value: o,
                onValueChange: n,
                placeholder: g.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            /* @__PURE__ */ a(
              Bw,
              {
                groupByOpenTabs: i,
                onChangeGroupByOpenTabs: s,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: g
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: z, children: `${g.selectAll} (${y.length.toString()})` }),
            /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: T, children: `${g.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ u($e, { children: [
            /* @__PURE__ */ a(Ar, { children: t.commandEmptyMessage ?? "No projects found" }),
            f.map((k, x) => /* @__PURE__ */ u(eo, { children: [
              /* @__PURE__ */ a(he, { heading: Gw(k, g), children: k.rows.map((b) => /* @__PURE__ */ a(
                Vw,
                {
                  row: b,
                  mode: t.mode,
                  strings: g,
                  onClick: E,
                  onOpen: M,
                  selectedRowRef: c
                },
                b.rowKey
              )) }),
              x < f.length - 1 && /* @__PURE__ */ a(wo, {})
            ] }, k.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function Gw(t, e) {
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
function lg({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = G(
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
      className: h(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(gc, { options: i, children: e })
    }
  );
}
const Uw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), bn = (t, e) => t[e] ?? e;
function Kw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = bn(r, "%webView_error_dump_header%"), i = bn(r, "%webView_error_dump_info_message%");
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
            /* @__PURE__ */ a("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: n }),
            /* @__PURE__ */ a("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ a(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(On, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const cg = Object.freeze([
  ...Uw,
  "%webView_error_dump_copied_message%"
]);
function dg({
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
  return /* @__PURE__ */ u(Ne, { onOpenChange: (w) => {
    w || l(!1);
  }, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: o }),
    /* @__PURE__ */ u(_e, { id: i, className: h("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Et, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        Kw,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var qw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(qw || {});
function wg({ id: t, label: e, groups: r }) {
  const [o, n] = I(
    Object.fromEntries(
      r.map(
        (c, w) => c.itemType === 0 ? [w, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = I({}), l = (c, w) => {
    const g = !o[c][w];
    n((p) => (p[c][w] = g, { ...p }));
    const m = r[c].items[w];
    m.onUpdate(m.id, g);
  }, d = (c, w) => {
    s((m) => (m[c] = w, { ...m }));
    const g = r[c].items.find((m) => m.id === w);
    g ? g.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(me, { children: [
    /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ u(F, { variant: "default", children: [
      /* @__PURE__ */ a($n, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(Ze, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(be, { children: r.map((c, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(tr, { children: c.label }),
      /* @__PURE__ */ a(Bi, { children: c.itemType === 0 ? /* @__PURE__ */ a(tt, { children: c.items.map((g, m) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        ue,
        {
          checked: o[w][m],
          onCheckedChange: () => l(w, m),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ a(
        vw,
        {
          value: i[w],
          onValueChange: (g) => d(w, g),
          children: c.items.map((g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(bw, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ a(Fe, {})
    ] }, c.label)) })
  ] }) });
}
function ug({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const d = new Is("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, g) => w + g, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ u(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex", children: /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ a(Xs, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
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
        (n || s) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            F,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Js, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Zs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Hw({ id: t, versionHistory: e }) {
  const [r, o] = I(!1), n = /* @__PURE__ */ new Date();
  function i(l) {
    const d = new Date(l), c = new Date(n.getTime() - d.getTime()), w = c.getUTCFullYear() - 1970, g = c.getUTCMonth(), m = c.getUTCDate() - 1;
    let p = "";
    return w > 0 ? p = `${w.toString()} year${w === 1 ? "" : "s"} ago` : g > 0 ? p = `${g.toString()} month${g === 1 ? "" : "s"} ago` : m === 0 ? p = "today" : p = `${m.toString()} day${m === 1 ? "" : "s"} ago`, p;
  }
  const s = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
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
function pg({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = G(() => Ds(r), [r]), d = ((c) => {
    const w = new Intl.DisplayNames(Rs(), { type: "language" });
    return c.map((g) => w.of(g));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Hw, { versionHistory: n }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: s })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Ww({
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
  onOpenChange: w = void 0,
  isDisabled: g = !1,
  sortSelected: m = !1,
  icon: p = void 0,
  className: f = void 0,
  variant: y = "ghost",
  id: v
}) {
  const [E, z] = I(!1), T = j(
    (N) => {
      var B;
      const S = (B = t.find((O) => O.label === N)) == null ? void 0 : B.value;
      S && r(
        e.includes(S) ? e.filter((O) => O !== S) : [...e, S]
      );
    },
    [t, e, r]
  ), C = () => d || o, V = G(() => {
    if (!m) return t;
    const N = t.filter((B) => B.starred).sort((B, O) => B.label.localeCompare(O.label)), S = t.filter((B) => !B.starred).sort((B, O) => {
      const A = e.includes(B.value), U = e.includes(O.value);
      return A && !U ? -1 : !A && U ? 1 : B.label.localeCompare(O.label);
    });
    return [...N, ...S];
  }, [t, e, m]), M = () => {
    r(t.map((N) => N.value));
  }, k = () => {
    r([]);
  }, x = c ?? E;
  return /* @__PURE__ */ a("div", { id: v, className: f, children: /* @__PURE__ */ u(Ne, { open: x, onOpenChange: w ?? z, children: [
    /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ u(
      F,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": x,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: g,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ a("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ a("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ a(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: C()
              }
            )
          ] }),
          /* @__PURE__ */ a(oo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(_e, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ u(Re, { children: [
      /* @__PURE__ */ a(mr, { placeholder: `Search ${o.toLowerCase()}...` }),
      n && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: M, children: i }),
        /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: k, children: s })
      ] }),
      /* @__PURE__ */ u($e, { children: [
        /* @__PURE__ */ a(Ar, { children: l }),
        /* @__PURE__ */ a(he, { children: V.map((N) => /* @__PURE__ */ u(
          ke,
          {
            value: N.label,
            onSelect: T,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ a("div", { className: "w-4", children: /* @__PURE__ */ a(
                Be,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(N.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              N.starred && /* @__PURE__ */ a(Qs, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ a("div", { className: "tw:flex-grow", children: N.label }),
              N.secondaryLabel && /* @__PURE__ */ a("div", { className: "tw:text-end tw:text-muted-foreground", children: N.secondaryLabel })
            ]
          },
          N.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function gg({
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
  badgesPlaceholder: w,
  id: g
}) {
  return /* @__PURE__ */ u("div", { id: g, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Ww,
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
      return /* @__PURE__ */ u(De, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== m)),
            children: /* @__PURE__ */ a(ua, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((f) => f.value === m)) == null ? void 0 : p.label
      ] }, m);
    }) }) : /* @__PURE__ */ a(Et, { children: w })
  ] });
}
function xn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "kbd",
    {
      "data-slot": "kbd",
      className: h(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
const Yw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), yn = (t, e) => t[e] ?? e;
function Xw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = G(() => /Macintosh/i.test(navigator.userAgent), []), c = yn(n, "%undoButton_tooltip%"), w = yn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(yo, { children: [
    /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(
        F,
        {
          "aria-label": c,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ a(tl, {})
        }
      ) }),
      /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ u("p", { children: [
        c,
        i && /* @__PURE__ */ u(tt, { children: [
          " ",
          /* @__PURE__ */ a(xn, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ a(Pi, {}),
    e && /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(
        F,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ a(el, {})
        }
      ) }),
      /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(tt, { children: [
          " ",
          /* @__PURE__ */ a(xn, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Jw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = K(null);
  return X(() => {
    var d;
    const i = /Macintosh/i.test(navigator.userAgent), s = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (c) => {
      var g, m, p, f;
      if (!s || document.activeElement !== s) return;
      const w = c.key.toLowerCase();
      if (i) {
        if (!c.metaKey) return;
        !c.shiftKey && w === "z" ? (c.preventDefault(), r && ((g = e.current) == null || g.undo())) : c.shiftKey && w === "z" && (c.preventDefault(), o && ((m = e.current) == null || m.redo()));
      } else {
        if (!c.ctrlKey) return;
        !c.shiftKey && w === "z" ? (c.preventDefault(), r && ((p = e.current) == null || p.undo())) : (w === "y" || c.shiftKey && w === "z") && (c.preventDefault(), o && ((f = e.current) == null || f.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const Zw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Qw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = K(null), s = K(null), l = K(!1), [d, c] = I(t), [w, g] = I(r), [m, p] = I(!1);
  X(() => {
    c(t);
  }, [t]), X(() => {
    w !== r && g(r);
  }, [r]);
  const f = (v) => {
    l.current = !1, p(v), v || (d !== "custom" || w ? (e(d), o(w)) : (c(t), g(r)));
  }, y = (v) => {
    var E, z, T, C;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((E = i.current) == null || E.focus(), l.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((z = s.current) == null || z.focus(), l.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((T = i.current) == null ? void 0 : T.selectionStart) === 0 && ((C = s.current) == null || C.focus(), l.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && f(!1);
  };
  return /* @__PURE__ */ u(me, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ a(F, { variant: "outline", className: "tw:h-6", children: Zw(t, n, r) }) }) }),
      /* @__PURE__ */ a(Ht, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      be,
      {
        style: { zIndex: ri },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: y,
        onMouseMove: () => {
          var v;
          l.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ a(tr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Fe, {}),
          /* @__PURE__ */ a(
            ue,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ba })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            ue,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Fa })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            ue,
            {
              ref: s,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var E;
                v.stopPropagation(), l.current = !0, (E = i.current) == null || E.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  Or,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
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
const tu = (t, e) => t === "f" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(Mn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(Pn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(An, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), eu = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Xe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ru({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(me, { children: [
    /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ a(F, { variant: "outline", className: "tw:h-6", children: tu(t, r) }) }) }),
      /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ a("p", { children: eu(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(be, { style: { zIndex: ri }, children: [
      /* @__PURE__ */ a(tr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Fe, {}),
      /* @__PURE__ */ u(
        ue,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(An, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ue,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Mn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        ue,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Pn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const au = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function ou({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? rl, { className: e, size: 16 });
}
function kn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    ke,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(ou, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ a("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Rc, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function nu({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [o, n] = I(""), [i, s] = G(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const d = e.filter(
      (w) => {
        var g;
        return (g = w.marker) == null ? void 0 : g.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (w) => w.title.toLowerCase().includes(l) && !d.includes(w)
    );
    return [d, c];
  }, [o, e]);
  return /* @__PURE__ */ u(Re, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      mr,
      {
        className: "marker-menu-search",
        ref: r,
        value: o,
        onValueChange: (l) => n(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u($e, { children: [
      /* @__PURE__ */ a(Ar, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(he, { children: i.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          kn,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ u(tt, { children: [
        i.length > 0 && /* @__PURE__ */ a(wo, { alwaysRender: !0 }),
        /* @__PURE__ */ a(he, { children: s.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            kn,
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
function iu(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = Yr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: r[Yr[l].description] ?? Yr[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function su(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function lu(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const cu = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function hg({
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
  const w = K(null), g = K(null), m = K(null), p = K(null);
  ee(() => {
    if (!p.current) return;
    const { width: L } = p.current.getBoundingClientRect();
    L > 0 && (p.current.style.width = `${L}px`);
  }, []);
  const [f, y] = I("generated"), [v, E] = I("generated"), [z, T] = I("*"), [C, V] = I("*"), [M, k] = I("f"), [x, b] = I(!1), [N, S] = I(!0), [B, O] = I(!1), A = K(!1), U = K(""), [D, W] = I(!1), [pt, _t] = I(), [Rt, et] = I(), [$t, q] = I(), [ot, it] = I(), st = K(null), lt = G(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? hc(), noteMode: "expanded" }
    }),
    [s, l]
  ), Vt = G(
    () => iu(
      w,
      () => W(!1),
      d,
      ot
    ),
    [d, ot]
  );
  X(() => {
    var L;
    D || (L = w.current) == null || L.focus();
  }, [M, D]), X(() => {
    var ct, nt;
    let L;
    A.current = !1, S(!0);
    const Y = e == null ? void 0 : e.at(0);
    if (Y && Gr("note", Y)) {
      const ht = (ct = Y.insert.note) == null ? void 0 : ct.caller;
      let xt = "custom";
      ht === Ba ? xt = "generated" : ht === Fa ? xt = "hidden" : ht && (T(ht), V(ht)), y(xt), E(xt), k(((nt = Y.insert.note) == null ? void 0 : nt.style) ?? "f"), L = setTimeout(() => {
        var yt;
        (yt = w.current) == null || yt.applyUpdate([Y]);
      }, 0);
    }
    return () => {
      L && clearTimeout(L);
    };
  }, [e, i]);
  const vt = j(
    (L, Y, ct = !1) => {
      var ht, xt, yt;
      const nt = (xt = (ht = w.current) == null ? void 0 : ht.getNoteOps(0)) == null ? void 0 : xt.at(0);
      if (nt && Gr("note", nt)) {
        if (nt.insert.note) {
          let ft;
          L === "custom" ? ft = Y : L === "generated" ? ft = Ba : ft = Fa, nt.insert.note.caller = ft;
        }
        r == null || r([nt]), ct && c && i && ((yt = c.current) == null || yt.replaceEmbedUpdate(i, [nt]));
      }
    },
    [i, r, c]
  ), Wt = j(() => {
    vt(f, z, !0), o();
  }, [f, z, o, vt]), Yt = K(Wt);
  ee(() => {
    Yt.current = Wt;
  });
  const $ = K({ book: n.book, chapterNum: n.chapterNum });
  ee(() => {
    ($.current.book !== n.book || $.current.chapterNum !== n.chapterNum) && ($.current = { book: n.book, chapterNum: n.chapterNum }, Yt.current());
  }, [n.book, n.chapterNum]);
  const Ot = () => {
    var Y;
    const L = (Y = g.current) == null ? void 0 : Y.getElementsByClassName("editor-input")[0];
    L != null && L.textContent && navigator.clipboard.writeText(L.textContent);
  }, Bt = j(
    (L) => {
      y(L), vt(L, z);
    },
    [z, vt]
  ), ne = j(
    (L) => {
      T(L), vt(f, L);
    },
    [f, vt]
  ), Xt = (L) => {
    var ct, nt, ht, xt, yt;
    k(L);
    const Y = (nt = (ct = w.current) == null ? void 0 : ct.getNoteOps(0)) == null ? void 0 : nt.at(0);
    if (Y && Gr("note", Y)) {
      Y.insert.note && (Y.insert.note.style = L);
      const ft = (xt = (ht = Y.insert.note) == null ? void 0 : ht.contents) == null ? void 0 : xt.ops;
      M !== "x" && L === "x" ? ft == null || ft.forEach((Ct) => su(Ct)) : M === "x" && L !== "x" && (ft == null || ft.forEach((Ct) => lu(Ct))), (yt = w.current) == null || yt.applyUpdate([Y, { delete: 1 }]);
    }
  }, At = (L) => {
    it(L.contextMarker), O(L.canRedo);
  }, Me = j(
    (L) => {
      var ct, nt, ht, xt, yt;
      const Y = (nt = (ct = w.current) == null ? void 0 : ct.getNoteOps(0)) == null ? void 0 : nt.at(0);
      if (Y && Gr("note", Y)) {
        L.content.length > 1 && setTimeout(() => {
          var R;
          (R = w.current) == null || R.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const ft = (ht = Y.insert.note) == null ? void 0 : ht.style, Ct = (yt = (xt = Y.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : yt.ops;
        if (ft || b(!1), b(
          ft === "x" ? !!(Ct != null && Ct.every((R) => {
            var gt, kt;
            if (!((gt = R.attributes) != null && gt.char)) return !0;
            const ut = ((kt = R.attributes) == null ? void 0 : kt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(Ct != null && Ct.every((R) => {
            var gt, kt;
            if (!((gt = R.attributes) != null && gt.char)) return !0;
            const ut = ((kt = R.attributes) == null ? void 0 : kt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !A.current) {
          A.current = !0, U.current = JSON.stringify(Y), S(!0);
          return;
        }
        S(JSON.stringify(Y) === U.current), vt(f, z);
      } else
        b(!1), S(!0);
    },
    [f, z, vt]
  ), Jt = j(() => {
    const L = window.getSelection();
    if (m.current && Vt.length && L && L.rangeCount > 0) {
      const Y = L.getRangeAt(0).getBoundingClientRect(), ct = m.current.getBoundingClientRect();
      _t(Y.left - ct.left), et(Y.top - ct.top), q(Y.height), W(!0);
    }
  }, [Vt, m]);
  X(() => {
    const L = () => {
      D && W(!1);
    };
    return window.addEventListener("click", L), () => {
      window.removeEventListener("click", L);
    };
  }, [D]), X(() => {
    var L;
    D && ((L = st.current) == null || L.focus());
  }, [D]), X(() => {
    var ct;
    const L = ((ct = g.current) == null ? void 0 : ct.querySelector(".editor-input")) ?? void 0, Y = (nt) => {
      !D && L && document.activeElement === L && nt.key === l ? (nt.preventDefault(), Jt()) : D && nt.key === "Escape" && (nt.preventDefault(), W(!1));
    };
    return document.addEventListener("keydown", Y), () => {
      document.removeEventListener("keydown", Y);
    };
  }, [D, Jt, l]);
  const Zt = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ u("div", { ref: p, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            ru,
            {
              isTypeSwitchable: x,
              noteType: M,
              handleNoteTypeChange: Xt,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            Qw,
            {
              callerType: f,
              updateCallerType: Bt,
              customCaller: z,
              updateCustomCaller: ne,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(yo, { children: [
          /* @__PURE__ */ a(
            Xw,
            {
              onUndoClick: () => {
                var L;
                return (L = w.current) == null ? void 0 : L.undo();
              },
              onRedoClick: () => {
                var L;
                return (L = w.current) == null ? void 0 : L.redo();
              },
              canUndo: !N,
              canRedo: B,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            ji,
            {
              onCancelClick: o,
              onAcceptClick: Wt,
              canAccept: !N || v !== f || f === "custom" && z !== C,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u(
        "div",
        {
          ref: g,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              Jw,
              {
                editorRef: w,
                canUndo: !N,
                canRedo: B,
                children: /* @__PURE__ */ a(
                  fc,
                  {
                    options: lt,
                    onStateChange: At,
                    onUsjChange: Me,
                    defaultUsj: cu,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: w
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
              /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ a(
                F,
                {
                  "aria-label": Zt,
                  onClick: Ot,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(On, {})
                }
              ) }),
              /* @__PURE__ */ a(Ht, { children: /* @__PURE__ */ a("p", { children: Zt }) })
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
    /* @__PURE__ */ u(Ne, { open: D, children: [
      /* @__PURE__ */ a(
        Oc,
        {
          className: "tw:absolute",
          style: {
            top: Rt,
            left: pt,
            height: $t,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        _e,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (L) => {
            L.preventDefault(), L.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            nu,
            {
              markerMenuItems: Vt,
              localizedStrings: d,
              searchRef: st
            }
          )
        }
      )
    ] })
  ] });
}
const fg = Object.freeze([
  ...au,
  ...Object.entries(Yr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Yw,
  ...Li
]);
function Fi(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((n) => typeof n == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function du(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, d) => {
    const c = d === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      zo(t, l, r, !0, n),
      c && o
    ] }, Fi(t, l));
  });
}
function zo(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(ja, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(ja, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return wu(
        i,
        Fi(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function wu(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      ja,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    zo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function uu({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: h("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), g = s && /* @__PURE__ */ u(tt, { children: [
    zo(t.marker, [s], o, !1),
    " "
  ] }), m = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", f = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", y = h(m, p);
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ u("div", { className: h("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", y), children: [
      d,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: h("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", y), children: g }),
    /* @__PURE__ */ a(
      "div",
      {
        className: h(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          f,
          y
        ),
        children: l && l.length > 0 && /* @__PURE__ */ a(tt, { children: du(t.marker, l, o, c) })
      }
    )
  ] });
}
function mg({
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
  const w = d ?? $s(r, void 0), g = (z, T) => {
    c == null || c(z, T, n);
  }, m = i ? r.findIndex((z) => z === i) : -1, [p, f] = I(m), y = (z, T, C) => {
    if (r.length)
      switch (z.key) {
        case "Enter":
        case " ":
          z.preventDefault(), c == null || c(T, C, n);
          break;
      }
  }, v = (z) => {
    if (r.length)
      switch (z.key) {
        case "ArrowDown":
          z.preventDefault(), f((T) => Math.min(T + 1, r.length - 1));
          break;
        case "ArrowUp":
          z.preventDefault(), f((T) => Math.max(T - 1, 0));
          break;
      }
  }, E = K([]);
  return X(() => {
    var z;
    p >= 0 && p < E.current.length && ((z = E.current[p]) == null || z.focus());
  }, [p]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: h("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: v,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: h(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: r.map((z, T) => {
            const C = z === i, V = `${n}-${T}`;
            return /* @__PURE__ */ u(tt, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: (M) => {
                    E.current[T] = M;
                  },
                  role: "option",
                  "aria-selected": C,
                  "data-marker": z.marker,
                  "data-state": C ? "selected" : void 0,
                  tabIndex: T === p ? 0 : -1,
                  className: h(
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
                  onClick: () => g(z, T),
                  onKeyDown: (M) => y(M, z, T),
                  children: /* @__PURE__ */ a(
                    uu,
                    {
                      footnote: z,
                      layout: o,
                      formatCaller: () => w(z.caller, T),
                      showMarkers: s
                    }
                  )
                },
                V
              ),
              T < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(Qe, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function pu(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function gu({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = G(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const w = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(w) || (d.add(w), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ u(_o, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(Co, { stickyHeader: !0, children: /* @__PURE__ */ u(Ve, { children: [
      /* @__PURE__ */ a(sa, { children: n }),
      /* @__PURE__ */ a(sa, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Eo, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ u(
      Ve,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ a(dr, { children: Ee(l.reference, "English") }),
          /* @__PURE__ */ a(dr, { className: o, children: pu(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function Gi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ao.Root,
    {
      "data-slot": "checkbox",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Ao.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(rr, {})
        }
      )
    }
  );
}
const hu = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(il, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(sl, { className: "tw:h-4 tw:w-4" });
}, ga = (t, e, r) => /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
  /* @__PURE__ */ u(
    qt,
    {
      className: h("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        hu(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ht, { side: "bottom", children: e })
] }) }), vg = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => ga(e, t)
}), fu = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => ga(r, t)
}), bg = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => ga(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Da = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((c) => c !== d);
  }), o(s);
  let l = [...n];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), i(l);
}, xg = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => ga(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ u(Di, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ a(
        Zr,
        {
          onClick: (d) => {
            d.stopPropagation(), Da(
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
          children: /* @__PURE__ */ a(al, {})
        }
      ),
      /* @__PURE__ */ a(
        Zr,
        {
          onClick: (d) => {
            d.stopPropagation(), Da(
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
          children: /* @__PURE__ */ a(ol, {})
        }
      ),
      /* @__PURE__ */ a(
        Zr,
        {
          onClick: (d) => {
            d.stopPropagation(), Da(
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
          children: /* @__PURE__ */ a(nl, {})
        }
      )
    ] });
  }
}), yg = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), kg = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ng = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, mu = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", _g = Object.freeze([
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
]), vu = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, bu = (t, e, r) => t.map((o) => {
  const n = Lo(o.key) ? o.key : o.key[0];
  return {
    items: Lo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || mu(n, e, r),
    occurrences: o.occurrences || []
  };
}), ce = (t, e) => t[e] ?? e;
function Cg({
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
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: g,
  onItemSelected: m
}) {
  const p = ce(r, "%webView_inventory_all%"), f = ce(r, "%webView_inventory_approved%"), y = ce(r, "%webView_inventory_unapproved%"), v = ce(r, "%webView_inventory_unknown%"), E = ce(r, "%webView_inventory_scope_currentBook%"), z = ce(r, "%webView_inventory_scope_chapter%"), T = ce(r, "%webView_inventory_scope_verse%"), C = ce(r, "%webView_inventory_filter_text%"), V = ce(
    r,
    "%webView_inventory_show_additional_items%"
  ), M = ce(r, "%webView_inventory_no_results%"), [k, x] = I(!1), [b, N] = I("all"), [S, B] = I(""), [O, A] = I([]), U = G(() => {
    const q = t ?? [];
    return q.length === 0 ? [] : bu(q, n, i);
  }, [t, n, i]), D = G(() => {
    if (k) return U;
    const q = [];
    return U.forEach((ot) => {
      const it = ot.items[0], st = q.find(
        (lt) => lt.items[0] === it
      );
      st ? (st.count += ot.count, st.occurrences = st.occurrences.concat(ot.occurrences)) : q.push({
        items: [it],
        count: ot.count,
        occurrences: ot.occurrences,
        status: ot.status
      });
    }), q;
  }, [k, U]), W = G(() => D.length === 0 ? [] : vu(D, b, S), [D, b, S]), pt = G(() => {
    var it, st;
    if (!k) return d;
    const q = (it = o == null ? void 0 : o.tableHeaders) == null ? void 0 : it.length;
    if (!q) return d;
    const ot = [];
    for (let lt = 0; lt < q; lt++)
      ot.push(
        fu(
          ((st = o == null ? void 0 : o.tableHeaders) == null ? void 0 : st[lt]) || "Additional Item",
          lt + 1
        )
      );
    return [...ot, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, k]);
  X(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const _t = (q, ot) => {
    ot.setRowSelection(() => {
      const st = {};
      return st[q.index] = !0, st;
    });
    const it = q.original.items;
    A(it), m && it.length > 0 && m(it[0]);
  }, Rt = (q) => {
    if (q === "book" || q === "chapter" || q === "verse")
      l(q);
    else
      throw new Error(`Invalid scope value: ${q}`);
  }, et = (q) => {
    if (q === "all" || q === "approved" || q === "unapproved" || q === "unknown")
      N(q);
    else
      throw new Error(`Invalid status filter value: ${q}`);
  }, $t = G(() => {
    if (D.length === 0 || O.length === 0) return [];
    const q = D.filter((ot) => Os(
      k ? ot.items : [ot.items[0]],
      O
    ));
    if (q.length > 1) throw new Error("Selected item is not unique");
    return q.length === 0 ? [] : q[0].occurrences;
  }, [O, k, D]);
  return /* @__PURE__ */ a("div", { id: c, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        ur,
        {
          onValueChange: (q) => et(q),
          defaultValue: b,
          children: [
            /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(pr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(hr, { children: [
              /* @__PURE__ */ a(ie, { value: "all", children: p }),
              /* @__PURE__ */ a(ie, { value: "approved", children: f }),
              /* @__PURE__ */ a(ie, { value: "unapproved", children: y }),
              /* @__PURE__ */ a(ie, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(ur, { onValueChange: (q) => Rt(q), defaultValue: s, children: [
        /* @__PURE__ */ a(gr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(pr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(hr, { children: [
          /* @__PURE__ */ a(ie, { value: "book", children: E }),
          /* @__PURE__ */ a(ie, { value: "chapter", children: z }),
          /* @__PURE__ */ a(ie, { value: "verse", children: T })
        ] })
      ] }),
      /* @__PURE__ */ a(
        Or,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: C,
          value: S,
          onChange: (q) => {
            B(q.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(Ut, { children: /* @__PURE__ */ u(Kt, { children: [
        /* @__PURE__ */ a(qt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Gi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: k,
              onCheckedChange: (q) => {
                x(q);
              }
            }
          ),
          /* @__PURE__ */ a(Et, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? V })
        ] }) }),
        /* @__PURE__ */ a(Ht, { children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      $w,
      {
        columns: pt,
        data: W,
        onRowClickHandler: _t,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: M
      }
    ) }),
    $t.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      gu,
      {
        classNameForText: g,
        occurrenceData: $t,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const xu = "16rem", yu = "3rem", Ui = at.createContext(void 0);
function ha() {
  const t = at.useContext(Ui);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function ku({
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
  const [d, c] = at.useState(t), w = e ?? d, g = at.useCallback(
    (T) => {
      const C = typeof T == "function" ? T(w) : T;
      r ? r(C) : c(C);
    },
    [r, w]
  ), m = at.useCallback(() => g((T) => !T), [g]), p = w ? "expanded" : "collapsed", v = bt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", E = at.useMemo(
    () => ({
      state: p,
      open: w,
      setOpen: g,
      toggleSidebar: m,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: v
    }),
    [p, w, g, m, v]
  ), z = {
    "--sidebar-width": xu,
    "--sidebar-width-icon": yu,
    ...n
  };
  return /* @__PURE__ */ a(Ui.Provider, { value: E, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: z,
      className: h(
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
function Nu({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = ha();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: h(
        "tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        r
      ),
      ...n,
      children: o
    }
  ) : /* @__PURE__ */ u(
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
            className: h(
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
            className: h(
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
function Eg({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = ha();
  return /* @__PURE__ */ u(
    F,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: h(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(xs, {}) : /* @__PURE__ */ a(ys, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function zg({ className: t, ...e }) {
  const { toggleSidebar: r } = ha();
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
      className: h(
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
function _u({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: h(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function Tg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Or,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: h("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Sg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: h("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: h("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Dg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Qe,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: h("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Cu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: h(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function Nn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: h("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function _n({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ge.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: h(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Rg({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ge.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: h(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function Cn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: h("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function Eu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: h("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function zu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: h("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Tu = ye(
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
function Su({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const l = t ? Ge.Root : "button", { state: d } = ha(), c = /* @__PURE__ */ a(
    l,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: h(Tu({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(Kt, { children: [
    /* @__PURE__ */ a(qt, { asChild: !0, children: c }),
    /* @__PURE__ */ a(
      Ht,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : c;
}
function $g({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? Ge.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: h(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Og({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: h(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Ag({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = at.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: h("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(la, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          la,
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
function Mg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: h(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function Pg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: h("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function Lg({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? Ge.Root : "a";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: h(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...n
    }
  );
}
function Iu({
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
  const c = j(
    (p, f) => {
      o(p, f);
    },
    [o]
  ), w = j(
    (p) => {
      const f = r.find((y) => y.projectId === p);
      return f ? f.projectName : p;
    },
    [r]
  ), g = G(
    () => r.map((p) => ({
      id: p.projectId,
      shortName: p.projectName,
      fullName: p.projectName
    })),
    [r]
  ), m = j(
    (p) => !n.projectId && p === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Nu,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ u(Cu, { children: [
        /* @__PURE__ */ u(Nn, { children: [
          /* @__PURE__ */ a(_n, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(Cn, { children: /* @__PURE__ */ a(Eu, { children: Object.entries(e).map(([p, f]) => /* @__PURE__ */ a(zu, { children: /* @__PURE__ */ a(
            Su,
            {
              onClick: () => c(p),
              isActive: m(p),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, p)) }) })
        ] }),
        /* @__PURE__ */ u(Nn, { children: [
          /* @__PURE__ */ a(_n, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(Cn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: h(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(ll, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Fw,
                  {
                    mode: "project",
                    projects: g,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: p }) => {
                      if (!p) return;
                      const f = w(p);
                      c(f, p);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    buttonPlaceholder: l,
                    ariaLabel: s,
                    popoverContentStyle: { zIndex: co }
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
const To = wa(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: n, isDisabled: i = !1, id: s }, l) => {
    const d = bt();
    return /* @__PURE__ */ u("div", { id: s, className: h("tw:relative", { "tw:w-full": o }, n), children: [
      /* @__PURE__ */ a(
        cl,
        {
          className: h(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": d === "rtl" },
            { "tw:left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ a(
        Or,
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
        F,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": d === "rtl" },
            { "tw:right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ a(ua, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
To.displayName = "SearchBar";
function jg({
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
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      To,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      ku,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Iu,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: n,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ a(_u, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Le = "scrBook", Du = "scrRef", Ye = "source", Ru = "details", $u = "Scripture Reference", Ou = "Scripture Book", Ki = "Type", Au = "Details";
function Mu(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Le,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? $u,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === Le ? Ee(n.start) : void 0;
      },
      getGroupingValue: (o) => wt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Ma(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ee(o.start),
      id: Du,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ee(n.start);
      },
      sortingFn: (o, n) => Ma(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ye,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ki : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Ru,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Au,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Pu = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Ma(t.start, t.end) === 0 ? `${fa(t.start)}+${e}` : `${fa(t.start)}+${e}-${fa(t.end)}+${r}`;
}, En = (t) => `${Pu({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Vg({
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
  const [c, w] = I([]), [g, m] = I([{ id: Le, desc: !1 }]), [p, f] = I({}), y = G(
    () => t.flatMap((b) => b.data.map((N) => ({
      ...N,
      source: b.source
    }))),
    [t]
  ), v = G(
    () => Mu(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  X(() => {
    c.includes(Ye) ? m([
      { id: Ye, desc: !1 },
      { id: Le, desc: !1 }
    ]) : m([{ id: Le, desc: !1 }]);
  }, [c]);
  const E = Qn({
    data: y,
    columns: v,
    state: {
      grouping: c,
      sorting: g,
      rowSelection: p
    },
    onGroupingChange: w,
    onSortingChange: m,
    onRowSelectionChange: f,
    getExpandedRowModel: pc(),
    getGroupedRowModel: uc(),
    getCoreRowModel: ei(),
    getSortedRowModel: ti(),
    getRowId: En,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  X(() => {
    if (l) {
      const b = E.getSelectedRowModel().rowsById, N = Object.keys(b);
      if (N.length === 1) {
        const S = y.find((B) => En(B) === N[0]) || void 0;
        S && l(S);
      }
    }
  }, [p, y, l, E]);
  const z = n ?? Ou, T = i ?? Ki, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${z}`, value: [Le] },
    { label: `Group by ${T}`, value: [Ye] },
    {
      label: `Group by ${z} and ${T}`,
      value: [Le, Ye]
    },
    {
      label: `Group by ${T} and ${z}`,
      value: [Ye, Le]
    }
  ], V = (b) => {
    w(JSON.parse(b));
  }, M = (b, N) => {
    !b.getIsGrouped() && !b.getIsSelected() && b.getToggleSelectedHandler()(N);
  }, k = (b, N) => b.getIsGrouped() ? "" : h("banded-row", N % 2 === 0 ? "even" : "odd"), x = (b, N, S) => {
    if (!((b == null ? void 0 : b.length) === 0 || N.depth < S.column.getGroupedIndex())) {
      if (N.getIsGrouped())
        switch (N.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (N.depth) {
        case 1:
          return "tw:ps-8";
        case 2:
          return "tw:ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ u("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ u(
      ur,
      {
        value: JSON.stringify(c),
        onValueChange: (b) => {
          V(b);
        },
        children: [
          /* @__PURE__ */ a(gr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(pr, {}) }),
          /* @__PURE__ */ a(hr, { position: "item-aligned", children: /* @__PURE__ */ a(Cw, { children: C.map((b) => /* @__PURE__ */ a(ie, { value: JSON.stringify(b.value), children: b.label }, b.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(_o, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(Co, { children: E.getHeaderGroups().map((b) => /* @__PURE__ */ a(Ve, { children: b.headers.filter((N) => N.column.columnDef.header).map((N) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(sa, { colSpan: N.colSpan, className: "tw:sticky top-0", children: N.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          N.column.getCanGroup() ? /* @__PURE__ */ a(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${N.column.columnDef.header}`,
              onClick: N.column.getToggleGroupingHandler(),
              type: "button",
              children: N.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          zr(N.column.columnDef.header, N.getContext())
        ] }) }, N.id)
      )) }, b.id)) }),
      /* @__PURE__ */ a(Eo, { children: E.getRowModel().rows.map((b, N) => {
        const S = bt();
        return /* @__PURE__ */ a(
          Ve,
          {
            "data-state": b.getIsSelected() ? "selected" : "",
            className: h(k(b, N)),
            onClick: (B) => M(b, B),
            children: b.getVisibleCells().map((B) => {
              if (!(B.getIsPlaceholder() || B.column.columnDef.enableGrouping && !B.getIsGrouped() && (B.column.columnDef.id !== Ye || !r)))
                return /* @__PURE__ */ a(
                  dr,
                  {
                    className: h(
                      B.column.columnDef.id,
                      "tw:p-[1px]",
                      x(c, b, B)
                    ),
                    children: B.getIsGrouped() ? /* @__PURE__ */ u(
                      F,
                      {
                        variant: "link",
                        onClick: b.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          b.getIsExpanded() && /* @__PURE__ */ a(Ze, {}),
                          !b.getIsExpanded() && (S === "ltr" ? /* @__PURE__ */ a(La, {}) : /* @__PURE__ */ a(Pa, {})),
                          " ",
                          zr(B.column.columnDef.cell, B.getContext()),
                          " (",
                          b.subRows.length,
                          ")"
                        ]
                      }
                    ) : zr(B.column.columnDef.cell, B.getContext())
                  },
                  B.id
                );
            })
          },
          b.id
        );
      }) })
    ] })
  ] });
}
const So = (t, e) => t.filter((r) => {
  try {
    return Er(r) === e;
  } catch {
    return !1;
  }
}), qi = (t, e, r) => So(t, e).every((o) => r.includes(o));
function Lu({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = So(e, t).length === 0, s = n["%scripture_section_ot_short%"], l = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], c = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        qi(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: $c(
        t,
        s,
        l,
        d,
        c
      )
    }
  );
}
const zn = 5, Ra = 6;
function ju({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], g = o["%webView_book_selector_more%"], { otLong: m, ntLong: p, dcLong: f, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, E] = I(!1), [z, T] = I(""), C = K(void 0), V = K(!1);
  if (t.length !== wt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const M = G(() => wt.allBookIds.filter(
    (A, U) => t[U] === "1" && !wt.isObsolete(wt.bookIdToNumber(A))
  ), [t]), k = G(() => {
    if (!z.trim()) {
      const D = {
        [Q.OT]: [],
        [Q.NT]: [],
        [Q.DC]: [],
        [Q.Extra]: []
      };
      return M.forEach((W) => {
        const pt = Er(W);
        D[pt].push(W);
      }), D;
    }
    const A = M.filter(
      (D) => po(D, z, n)
    ), U = {
      [Q.OT]: [],
      [Q.NT]: [],
      [Q.DC]: [],
      [Q.Extra]: []
    };
    return A.forEach((D) => {
      const W = Er(D);
      U[W].push(D);
    }), U;
  }, [M, z, n]), x = j(
    (A, U = !1) => {
      if (!U || !C.current) {
        r(
          e.includes(A) ? e.filter((et) => et !== A) : [...e, A]
        ), C.current = A;
        return;
      }
      const D = M.findIndex((et) => et === C.current), W = M.findIndex((et) => et === A);
      if (D === -1 || W === -1) return;
      const [pt, _t] = [
        Math.min(D, W),
        Math.max(D, W)
      ], Rt = M.slice(pt, _t + 1).map((et) => et);
      r(
        e.includes(A) ? e.filter((et) => !Rt.includes(et)) : [.../* @__PURE__ */ new Set([...e, ...Rt])]
      );
    },
    [e, r, M]
  ), b = (A) => {
    x(A, V.current), V.current = !1;
  }, N = (A, U) => {
    A.preventDefault(), x(U, A.shiftKey);
  }, S = j(
    (A) => {
      const U = So(M, A).map((D) => D);
      r(
        qi(M, A, e) ? e.filter((D) => !U.includes(D)) : [.../* @__PURE__ */ new Set([...e, ...U])]
      );
    },
    [e, r, M]
  ), B = () => {
    r(M.map((A) => A));
  }, O = () => {
    r([]);
  };
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Q).map((A) => /* @__PURE__ */ a(
      Lu,
      {
        section: A,
        availableBookIds: M,
        selectedBookIds: e,
        onToggle: S,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ u(
      Ne,
      {
        open: v,
        onOpenChange: (A) => {
          E(A), A || T("");
        },
        children: [
          /* @__PURE__ */ a(Oe, { asChild: !0, children: /* @__PURE__ */ u(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ a(oo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ a(_e, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ u(
            Re,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (V.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ a(
                  mr,
                  {
                    placeholder: l,
                    value: z,
                    onValueChange: T
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: B, children: d }),
                  /* @__PURE__ */ a(F, { variant: "ghost", size: "sm", onClick: O, children: c })
                ] }),
                /* @__PURE__ */ u($e, { children: [
                  /* @__PURE__ */ a(Ar, { children: w }),
                  Object.values(Q).map((A, U) => {
                    const D = k[A];
                    if (D.length !== 0)
                      return /* @__PURE__ */ u(eo, { children: [
                        /* @__PURE__ */ a(
                          he,
                          {
                            heading: oi(A, m, p, f, y),
                            children: D.map((W) => /* @__PURE__ */ a(
                              ii,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => b(W),
                                onMouseDown: (pt) => N(pt, W),
                                section: Er(W),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: li(W, n),
                                className: "tw:flex tw:items-center"
                              },
                              W
                            ))
                          }
                        ),
                        U < Object.values(Q).length - 1 && /* @__PURE__ */ a(wo, {})
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
        e.length === Ra ? Ra : zn
      ).map((A) => /* @__PURE__ */ a(De, { className: "tw:hover:bg-secondary", variant: "secondary", children: je(A, n) }, A)),
      e.length > Ra && /* @__PURE__ */ a(
        De,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - zn} ${g}`
        }
      )
    ] })
  ] });
}
const Bg = Object.freeze([
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
]), St = (t, e) => t[e] ?? e, Vu = Object.freeze([" ", "-"]);
function Fg({
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
  rangeStart: w,
  rangeEnd: g,
  onRangeStartChange: m,
  onRangeEndChange: p,
  currentScrRef: f,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: v,
  getEndVerse: E,
  hideLabel: z = !1,
  buttonClassName: T
}) {
  const C = St(
    s,
    "%webView_scope_selector_selected_text%"
  ), V = St(s, "%webView_scope_selector_verse%"), M = St(s, "%webView_scope_selector_chapter%"), k = St(s, "%webView_scope_selector_book%"), x = St(
    s,
    "%webView_scope_selector_current_verse%"
  ), b = St(
    s,
    "%webView_scope_selector_current_chapter%"
  ), N = St(s, "%webView_scope_selector_current_book%"), S = St(s, "%webView_scope_selector_choose_books%"), B = St(s, "%webView_scope_selector_scope%"), O = St(s, "%webView_scope_selector_select_books%"), A = St(s, "%webView_scope_selector_range%"), U = St(s, "%webView_scope_selector_select_range%"), D = St(s, "%webView_scope_selector_range_start%"), W = St(s, "%webView_scope_selector_range_end%"), pt = St(s, "%webView_scope_selector_ok%"), _t = St(s, "%webView_scope_selector_cancel%"), Rt = St(s, "%webView_scope_selector_navigate%"), et = (P) => {
    if (!f) return;
    const J = f.book.toUpperCase();
    switch (P) {
      case "verse":
        return Ee(f, "id");
      case "chapter":
        return `${J} ${f.chapterNum}`;
      case "book":
        return J;
      default:
        return;
    }
  }, $t = [
    { value: "selectedText", label: C, id: "scope-selected-text" },
    {
      value: "verse",
      label: V,
      dropdownLabel: x,
      scrRefSuffix: et("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: M,
      dropdownLabel: b,
      scrRefSuffix: et("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: k,
      dropdownLabel: N,
      scrRefSuffix: et("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: S, id: "scope-selected" },
    { value: "range", label: A, id: "scope-range" }
  ], q = (P, J, Ft = !1) => /* @__PURE__ */ u(tt, { children: [
    P,
    J && !Ft && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      J
    ] })
  ] }), ot = e ? $t.filter((P) => e.includes(P.value)) : $t, it = f ?? ma, st = w ?? it, lt = g ?? it, Vt = () => {
  }, vt = K(null), Wt = K(null), Yt = K(!1), $ = K(null), Ot = K(!1), [Bt, ne] = I(void 0), Xt = K(!1), At = K(!1), Me = K(null), Jt = j((P) => {
    if (P) {
      ne("start"), Xt.current = !1;
      return;
    }
    ne((J) => J === "start" ? void 0 : J), Xt.current && (Xt.current = !1, requestAnimationFrame(() => {
      var Ft;
      const J = (Ft = vt.current) == null ? void 0 : Ft.querySelector("button");
      J == null || J.click();
    }));
  }, []), Zt = j((P) => {
    if (P) {
      ne("end"), At.current = !1;
      return;
    }
    ne((J) => J === "end" ? void 0 : J);
  }, []), L = j(
    (P) => {
      m == null || m(P), p == null || p(P), Xt.current = !0;
    },
    [m, p]
  ), Y = j(
    (P) => {
      p == null || p(P), At.current = !0;
    },
    [p]
  ), ct = j(
    (P) => {
      r(P), P === "selectedBooks" && n.length === 0 && (f != null && f.book) && i([f.book]);
    },
    [r, n, f, i]
  ), nt = ot.find((P) => P.value === t), ht = () => t === "selectedBooks" && n.length > 0 ? n.map((P) => P.toUpperCase()).join(", ") : t === "range" ? As(st, lt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : nt ? q(nt.label, nt.scrRefSuffix) : t, xt = ot.filter(
    (P) => P.value !== "selectedBooks" && P.value !== "range"
  ), yt = ot.find((P) => P.value === "selectedBooks"), ft = ot.find((P) => P.value === "range"), [Ct, R] = I(!1), [ut, gt] = I(void 0), [kt, Ke] = I(void 0), [Pe, br] = I(void 0), [qe, xr] = I(void 0), [yr, Mr] = I([]), Pr = c === "dropdown" && ut === "selectedBooks", _ = /* @__PURE__ */ a(
    ju,
    {
      availableBookInfo: o,
      selectedBookIds: Pr ? yr : n,
      onChangeSelectedBookIds: Pr ? Mr : i,
      localizedStrings: s,
      localizedBookNames: l
    }
  ), H = Bt === "end", Z = Bt === "start", zt = "tw:text-muted-foreground", re = c === "dropdown" && ut === "range", nr = re ? br : L, Mt = re ? xr : p ? Y : Vt, Nt = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Et, { htmlFor: "scope-range-start", className: h(H && zt), children: D }),
      /* @__PURE__ */ a(
        xa,
        {
          id: "scope-range-start",
          scrRef: re ? Pe ?? st : st,
          handleSubmit: nr,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: E,
          submitKeys: Vu,
          onOpenChange: Jt,
          className: h(H && zt),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: vt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Et, { htmlFor: "scope-range-end", className: h(Z && zt), children: W }),
      /* @__PURE__ */ a(
        xa,
        {
          id: "scope-range-end",
          scrRef: re ? qe ?? lt : lt,
          handleSubmit: Mt,
          localizedBookNames: l,
          localizedStrings: v,
          getEndVerse: E,
          disableReferencesUpTo: re ? Pe ?? st : st,
          onOpenChange: Zt,
          onCloseAutoFocus: (P) => {
            var J;
            At.current && (At.current = !1, P.preventDefault(), (J = Me.current) == null || J.focus());
          },
          className: h(Z && zt),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Tt = K({}), mt = j(
    (P) => (J) => {
      Tt.current[P] = J;
    },
    []
  ), Qt = K(null);
  X(() => {
    if (!Ct) return;
    let P = 0;
    const J = requestAnimationFrame(() => {
      P = requestAnimationFrame(() => {
        var Ft;
        (Ft = Tt.current[t]) == null || Ft.focus();
      });
    });
    return () => {
      cancelAnimationFrame(J), P && cancelAnimationFrame(P);
    };
  }, [Ct, t]);
  const [te, He] = I(null), [Lr, ts] = I(null), [jr, es] = I(null), rs = 200, [as, os] = I(!1);
  X(() => {
    if (!jr || typeof ResizeObserver > "u") return;
    const P = new ResizeObserver(([J]) => {
      os(J.contentRect.width < rs);
    });
    return P.observe(jr), () => P.disconnect();
  }, [jr]);
  const Io = j(
    (P) => {
      Ke(P), br(st), xr(lt), Mr(n), R(!1), gt(P);
    },
    [st, lt, n]
  ), Do = j(() => {
    kt !== void 0 && (kt === "range" ? (Pe && (m == null || m(Pe)), qe && (p == null || p(qe))) : kt === "selectedBooks" && i(yr), ct(kt), gt(void 0), Ke(void 0));
  }, [
    kt,
    Pe,
    qe,
    yr,
    m,
    p,
    i,
    ct
  ]), Vr = j((P) => {
    P || (gt(void 0), Ke(void 0));
  }, []), Ro = j((P) => {
    var J;
    P.preventDefault(), (J = Qt.current) == null || J.focus();
  }, []), $o = (P) => t === P ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !z && /* @__PURE__ */ a(Et, { children: B }),
      c === "dropdown" ? /* @__PURE__ */ u(me, { open: Ct, onOpenChange: R, children: [
        /* @__PURE__ */ a(ve, { asChild: !0, children: /* @__PURE__ */ u(
          F,
          {
            ref: Qt,
            variant: "outline",
            role: "combobox",
            className: h(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              T
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ht() }),
              /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          be,
          {
            ref: es,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(va, { container: jr, children: [
              xt.map(({ value: P, label: J, dropdownLabel: Ft, scrRefSuffix: Nr, id: ns }) => /* @__PURE__ */ u(
                Je,
                {
                  ref: mt(P),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => ct(P),
                  "data-selected": t === P ? "true" : void 0,
                  children: [
                    t === P && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Be, { className: "tw:h-4 tw:w-4" }) }),
                    q(Ft ?? J, Nr, as)
                  ]
                },
                ns
              )),
              (yt || ft) && /* @__PURE__ */ a(Fe, {}),
              yt && /* @__PURE__ */ u(
                Je,
                {
                  ref: mt("selectedBooks"),
                  className: h(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Io("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    $o("selectedBooks"),
                    `${yt.label}…`
                  ]
                }
              ),
              ft && /* @__PURE__ */ u(
                Je,
                {
                  ref: mt("range"),
                  className: h(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => Io("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    $o("range"),
                    `${ft.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ u(tt, { children: [
                /* @__PURE__ */ a(Fe, {}),
                /* @__PURE__ */ a(tr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: Rt }),
                /* @__PURE__ */ a(
                  Je,
                  {
                    ref: $,
                    className: "tw:p-0",
                    onSelect: (P) => {
                      var J, Ft;
                      if (P.preventDefault(), Yt.current) {
                        Yt.current = !1;
                        return;
                      }
                      Ot.current || (Ft = (J = Wt.current) == null ? void 0 : J.querySelector("button")) == null || Ft.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Wt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (P) => {
                          const J = P.target instanceof HTMLElement ? P.target : void 0;
                          J != null && J.closest("button") && (Yt.current = !0, requestAnimationFrame(() => {
                            Yt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          xa,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? ma,
                            handleSubmit: y,
                            localizedBookNames: l,
                            localizedStrings: v,
                            getEndVerse: E,
                            triggerVariant: "ghost",
                            onOpenChange: (P) => {
                              Ot.current = P;
                            },
                            onCloseAutoFocus: (P) => {
                              var J;
                              P.preventDefault(), (J = $.current) == null || J.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(tt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: Ee(f ?? ma, "id") }),
                              /* @__PURE__ */ a(Ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        di,
        {
          value: t,
          onValueChange: ct,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: ot.map(({ value: P, label: J, scrRefSuffix: Ft, id: Nr }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wa, { className: "tw:me-2", value: P, id: Nr }),
            /* @__PURE__ */ a(Et, { htmlFor: Nr, children: q(J, Ft) })
          ] }, Nr))
        }
      )
    ] }),
    c === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Et, { children: O }),
      _
    ] }),
    c === "radio" && t === "range" && Nt,
    c === "dropdown" && yt && /* @__PURE__ */ a(Ua, { open: ut === "selectedBooks", onOpenChange: Vr, children: /* @__PURE__ */ a(
      Ka,
      {
        ref: ts,
        onCloseAutoFocus: Ro,
        onEscapeKeyDown: (P) => {
          Lr != null && Lr.querySelector('[data-state="open"]') && P.preventDefault();
        },
        children: /* @__PURE__ */ u(va, { container: Lr, children: [
          /* @__PURE__ */ a(qa, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ha, { children: S }) }),
          _,
          /* @__PURE__ */ u(Yo, { children: [
            /* @__PURE__ */ a(F, { variant: "outline", onClick: () => Vr(!1), children: _t }),
            /* @__PURE__ */ a(F, { onClick: Do, children: pt })
          ] })
        ] })
      }
    ) }),
    c === "dropdown" && ft && /* @__PURE__ */ a(Ua, { open: ut === "range", onOpenChange: Vr, children: /* @__PURE__ */ a(
      Ka,
      {
        ref: He,
        onCloseAutoFocus: Ro,
        onEscapeKeyDown: (P) => {
          te != null && te.querySelector('[data-state="open"]') && P.preventDefault();
        },
        children: /* @__PURE__ */ u(va, { container: te, children: [
          /* @__PURE__ */ a(qa, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ha, { children: U }) }),
          Nt,
          /* @__PURE__ */ u(Yo, { children: [
            /* @__PURE__ */ a(F, { variant: "outline", onClick: () => Vr(!1), children: _t }),
            /* @__PURE__ */ a(F, { ref: Me, onClick: Do, children: pt })
          ] })
        ] })
      }
    ) })
  ] });
}
function Gg({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...Wr,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, w]) => [
          c,
          c === w && c in Wr ? Wr[c] : w
        ]
      )
    )
  }, d = bt();
  return /* @__PURE__ */ u(
    ur,
    {
      value: `${e}`,
      onValueChange: (c) => r(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ a(gr, { size: n, className: h("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          pr,
          {
            placeholder: l[Aa(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          hr,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: $r },
            children: t.map((c) => /* @__PURE__ */ a(ie, { value: `${c}`, children: l[Aa(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Ug({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function Kg({
  primary: t,
  secondary: e,
  children: r,
  isLoading: o = !1,
  loadingMessage: n
}) {
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: n }) : /* @__PURE__ */ a("div", { children: r })
  ] });
}
function qg({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(Qe, {}) : ""
  ] });
}
function Hi(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function ca({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: h("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Wi = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ u(Kt, { children: [
  /* @__PURE__ */ a(qt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
    Je,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ a(ca, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ a(ca, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ u(xw, { children: [
    /* @__PURE__ */ a(yw, { children: l.label }),
    /* @__PURE__ */ a(mw, { children: /* @__PURE__ */ a(kw, { children: Wi(
      t,
      e,
      Hi(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ a(Ht, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function Qa({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ u(me, { variant: i, children: [
    /* @__PURE__ */ a(ve, { "aria-label": r, className: n, asChild: !0, id: l, children: /* @__PURE__ */ a(F, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(dl, {}) }) }),
    /* @__PURE__ */ a(be, { align: "start", style: { zIndex: $r }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, w) => /* @__PURE__ */ u(eo, { children: [
      /* @__PURE__ */ a(Bi, { children: /* @__PURE__ */ a(Ut, { children: Wi(e.groups, e.items, d, t) }) }),
      c < w.length - 1 && /* @__PURE__ */ a(Fe, {})
    ] }, d)) })
  ] });
}
const Yi = at.forwardRef(
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
function Hg({
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
  return /* @__PURE__ */ u(Yi, { className: `tw:w-full tw:border ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Qa,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ a(wl, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    l && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Qa,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(ul, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
function Wg({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Yi, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Qa,
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
const Xi = at.forwardRef(({ className: t, ...e }, r) => {
  const o = bt();
  return /* @__PURE__ */ a(
    le.Root,
    {
      orientation: "vertical",
      ref: r,
      className: h("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Xi.displayName = le.List.displayName;
const Ji = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.List,
  {
    ref: r,
    className: h(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Ji.displayName = le.List.displayName;
const Bu = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Trigger,
  {
    ref: r,
    ...e,
    className: h(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Zi = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Content,
  {
    ref: r,
    className: h(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Zi.displayName = le.Content.displayName;
function Yg({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: n,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ u("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ u("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ a("h1", { children: n }) : "",
      /* @__PURE__ */ a(
        To,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Xi, { children: [
      /* @__PURE__ */ a(Ji, { children: t.map((l) => /* @__PURE__ */ a(Bu, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ a(Zi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Fu({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = at.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(No.Provider, { value: o, children: /* @__PURE__ */ a(
    xe.Root,
    {
      "data-slot": "menubar",
      className: h(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function Gu({ ...t }) {
  return /* @__PURE__ */ a(xe.Menu, { "data-slot": "menubar-menu", ...t });
}
function Uu({ ...t }) {
  return /* @__PURE__ */ a(xe.Portal, { "data-slot": "menubar-portal", ...t });
}
function Ku({
  className: t,
  ...e
}) {
  const r = Ae();
  return /* @__PURE__ */ a(
    xe.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: h(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function qu({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Ae();
  return /* @__PURE__ */ a(Uu, { children: /* @__PURE__ */ a(
    xe.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: h(
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
function Hu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Ae();
  return /* @__PURE__ */ a(
    xe.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function Wu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    xe.Separator,
    {
      "data-slot": "menubar-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Yu({ ...t }) {
  return /* @__PURE__ */ a(xe.Sub, { "data-slot": "menubar-sub", ...t });
}
function Xu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Ae();
  return /* @__PURE__ */ u(
    xe.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        or({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ao, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Ju({
  className: t,
  ...e
}) {
  const r = Ae();
  return /* @__PURE__ */ a(
    xe.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: h(
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
const Cr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Qi = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, w) => c.order - w.order).map((c) => /* @__PURE__ */ u(Kt, { children: [
      /* @__PURE__ */ a(qt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
        Hu,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ a(ca, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ a(ca, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ u(Yu, { children: [
        /* @__PURE__ */ a(Xu, { children: c.label }),
        /* @__PURE__ */ a(Ju, { children: Qi(
          t,
          e,
          Hi(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ a(Ht, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && s < n.length - 1 && d.push(/* @__PURE__ */ a(Wu, {}, `separator-${i}`)), d;
  });
};
function Zu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = K(void 0), i = K(void 0), s = K(void 0), l = K(void 0), d = K(void 0), c = (w) => {
    switch (w) {
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
  if (mc(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, g) => {
    var f, y, v, E;
    w.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        Cr(i, [m]);
        break;
      case "alt+p":
        (f = i.current) == null || f.focus(), Cr(i, [m, p]);
        break;
      case "alt+l":
        (y = s.current) == null || y.focus(), Cr(s, [m, p]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), Cr(l, [m, p]);
        break;
      case "alt+h":
        (E = d.current) == null || E.focus(), Cr(d, [m, p]);
        break;
    }
  }), X(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((p) => {
      p.forEach((f) => {
        if (f.attributeName === "data-state" && f.target instanceof HTMLElement) {
          const y = f.target.getAttribute("data-state");
          r(y === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((p) => {
      w.observe(p, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(Fu, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, g]) => typeof w == "boolean" || typeof g == "boolean" ? 0 : w.order - g.order).map(([w, g]) => /* @__PURE__ */ u(Gu, { children: [
      /* @__PURE__ */ a(Ku, { ref: c(w), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ a(
        qu,
        {
          style: { zIndex: $r },
          children: /* @__PURE__ */ a(Ut, { children: Qi(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function Xg(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Jg({
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
  const w = K(void 0);
  return /* @__PURE__ */ a(
    "div",
    {
      className: h("tw:border tw:px-4 tw:text-foreground", o),
      ref: w,
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ a(
                    Zu,
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
const Qu = (t, e) => t[e] ?? e;
function Zg({
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
  const c = Qu(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, g] = I(!1), m = (f) => {
    n && n(f), o && o([f, ...r.filter((y) => y !== f)]), i && r.find((y) => y === f) && i([...r.filter((y) => y !== f)]), g(!1);
  }, p = (f, y) => {
    var E, z, T, C, V, M;
    const v = y !== f ? ((z = (E = t[f]) == null ? void 0 : E.uiNames) == null ? void 0 : z[y]) ?? ((C = (T = t[f]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return v ? `${(V = t[f]) == null ? void 0 : V.autonym} (${v})` : (M = t[f]) == null ? void 0 : M.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: h("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ u(
      ur,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: m,
        open: w,
        onOpenChange: (f) => g(f),
        children: [
          /* @__PURE__ */ a(gr, { children: /* @__PURE__ */ a(pr, {}) }),
          /* @__PURE__ */ a(
            hr,
            {
              style: { zIndex: $r },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(ie, { value: f, children: p(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Et, { className: "tw:font-normal tw:text-muted-foreground", children: Xe(c, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => p(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function tp({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    lo.Group,
    {
      "data-slot": "resizable-panel-group",
      className: h(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (i) => r(Object.values(i)) : void 0,
      ...n
    }
  );
}
function Hr(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Tn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    lo.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Hr(t),
      minSize: Hr(e),
      maxSize: Hr(r),
      collapsedSize: Hr(o),
      ...n
    }
  );
}
function ep({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    lo.Separator,
    {
      "data-slot": "resizable-handle",
      className: h(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ a("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
function Qg({
  items: t,
  renderItem: e,
  renderDetailContent: r,
  onItemClick: o,
  selectedItemId: n,
  emptyStateMessage: i = "No items found",
  detailRegionLabel: s = "Selected item details",
  isLoading: l = !1,
  variant: d = "text",
  showSourceLanguage: c = !1,
  showTransliteration: w = !1,
  onCharacterPress: g,
  className: m
}) {
  const [p, f] = I(), y = K(null), v = n ?? p, E = G(
    () => p ? t.find((O) => O.id === p) : void 0,
    [p, t]
  ), z = G(() => t.map((O) => ({ id: O.id })), [t]), T = (O) => {
    o == null || o(O), r && f(O.id === p ? void 0 : O.id);
  }, C = (O) => {
    const A = t.find((U) => U.id === O.id);
    A && T(A);
  }, { listboxRef: V, activeId: M, handleKeyDown: k, focusOption: x } = Vi({
    options: z,
    onOptionSelect: C,
    onCharacterPress: g
  }), b = () => {
    const O = p;
    f(void 0), O && requestAnimationFrame(() => {
      var A;
      x(O), (A = V.current) == null || A.focus();
    });
  }, N = K(null);
  if (X(() => {
    if (!E) return;
    const O = N.current;
    if (!O) return;
    const A = (U) => {
      U.key === "Escape" && (U.preventDefault(), b());
    };
    return O.addEventListener("keydown", A), () => O.removeEventListener("keydown", A);
  }, [E]), l)
    return /* @__PURE__ */ a("div", { className: h("tw:flex tw:flex-col tw:gap-2 tw:p-2", m), children: Array.from({ length: 6 }, (O, A) => /* @__PURE__ */ a(
      la,
      {
        className: h("tw:h-12 tw:w-full tw:rounded", {
          "tw:h-20": d === "thumbnail"
        })
      },
      A
    )) });
  if (t.length === 0)
    return /* @__PURE__ */ a(
      "div",
      {
        className: h(
          "tw:flex tw:items-center tw:justify-center tw:p-8 tw:text-sm tw:text-muted-foreground",
          m
        ),
        children: i
      }
    );
  const S = /* @__PURE__ */ a(
    "ul",
    {
      role: "listbox",
      tabIndex: 0,
      ref: V,
      "aria-activedescendant": M ?? void 0,
      className: "tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
      onKeyDown: k,
      children: t.map((O) => {
        const A = v === O.id;
        return /* @__PURE__ */ a(
          "li",
          {
            id: O.id,
            role: "option",
            "aria-selected": A,
            tabIndex: -1,
            onClick: () => T(O),
            onKeyDown: (U) => {
              (U.key === "Enter" || U.key === " ") && (U.preventDefault(), T(O));
            },
            className: h(
              "tw:flex tw:cursor-pointer tw:items-center tw:gap-3 tw:p-2 tw:outline-none",
              {
                "tw:bg-muted": A,
                "tw:hover:bg-muted": !A
              }
            ),
            children: e ? e(O) : /* @__PURE__ */ a(
              rp,
              {
                item: O,
                variant: d,
                showSourceLanguage: c,
                showTransliteration: w
              }
            )
          },
          O.id
        );
      })
    }
  ), B = r && E ? r(E, b) : void 0;
  return /* @__PURE__ */ a(
    "div",
    {
      ref: y,
      className: h("tw:relative tw:flex tw:h-full tw:overflow-hidden", m),
      children: B ? (
        // Side-by-side ResizablePanelGroup split per PR #2209 stories pattern: list at ~33% with
        // a draggable handle, detail at ~67%. The detail is a sibling of the list (not an overlay)
        // so all controls outside the SLI remain interactive while the detail is open.
        /* @__PURE__ */ u(tp, { direction: "horizontal", className: "tw:h-full tw:w-full", children: [
          /* @__PURE__ */ a(Tn, { defaultSize: 33.3333, minSize: 20, children: /* @__PURE__ */ a("div", { className: "tw:h-full tw:overflow-y-auto", children: S }) }),
          /* @__PURE__ */ a(ep, {}),
          /* @__PURE__ */ a(Tn, { defaultSize: 66.6667, minSize: 30, children: /* @__PURE__ */ a(
            "div",
            {
              ref: N,
              role: "region",
              "aria-label": s,
              className: "tw:h-full tw:overflow-y-auto tw:bg-background tw:p-4",
              children: B
            }
          ) })
        ] })
      ) : /* @__PURE__ */ a("div", { className: "tw:h-full tw:w-full tw:overflow-y-auto", children: S })
    }
  );
}
function rp({
  item: t,
  variant: e,
  showSourceLanguage: r,
  showTransliteration: o
}) {
  return /* @__PURE__ */ u(tt, { children: [
    e === "thumbnail" && t.thumbnailUrl && /* @__PURE__ */ a(
      "img",
      {
        src: t.thumbnailUrl,
        alt: t.thumbnailAlt ?? t.primaryText,
        className: "tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"
      }
    ),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:items-baseline tw:gap-4 tw:overflow-hidden", children: [
      /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:truncate tw:text-sm", children: t.primaryText }),
      r && t.sourceLanguageText && /* @__PURE__ */ u("span", { className: "tw:truncate tw:text-sm tw:text-muted-foreground", children: [
        t.sourceLanguageText,
        o && t.transliteration && /* @__PURE__ */ u("span", { className: "tw:ml-1", children: [
          "(",
          t.transliteration,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a(Qe, { className: "tw:absolute tw:bottom-0 tw:left-0 tw:right-0" })
  ] });
}
const th = [
  "%sourceLanguageIndexedList_emptyState%",
  "%sourceLanguageIndexedList_loading%",
  "%sourceLanguageIndexedList_occurrenceCount%",
  "%sourceLanguageIndexedList_strongsCode%",
  "%sourceLanguageIndexedList_filterByDomain%",
  "%sourceLanguageIndexedList_navigationModeTree%",
  "%sourceLanguageIndexedList_navigationModeDropdown%",
  "%sourceLanguageIndexedList_backToList%"
];
function ap({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Et, { children: e(t) }) : r ? /* @__PURE__ */ a(Et, { children: r(t) }) : /* @__PURE__ */ a(Et, { children: t });
}
function eh({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      Gi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => n(l, d)
      }
    ),
    /* @__PURE__ */ a(
      ap,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function rh({
  scrRef: t,
  onClick: e,
  tooltipContent: r,
  ariaLabel: o,
  className: n,
  testId: i = "linked-scr-ref-button"
}) {
  if (t === "") return;
  const s = /* @__PURE__ */ a(
    F,
    {
      type: "button",
      variant: "link",
      onClick: e,
      disabled: !e,
      "aria-label": o,
      className: h(
        // Tight, inline link-button styling — no extra padding / height. Consumers can override
        // typography (font, size) via the `className` prop.
        "tw:h-auto tw:p-0 tw:text-start tw:font-mono tw:text-sm",
        n
      ),
      "data-testid": i,
      children: t
    }
  );
  return r ? /* @__PURE__ */ a(Ut, { delayDuration: 0, children: /* @__PURE__ */ u(Kt, { children: [
    /* @__PURE__ */ a(qt, { asChild: !0, children: s }),
    /* @__PURE__ */ a(Ht, { children: r })
  ] }) }) : s;
}
function ah({
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
  additionalContent: w,
  accentColor: g,
  showDropdownOnHover: m = !1
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: (f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), r());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: h(
        "tw:group tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && l,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            !e && m && c && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(me, { children: [
              /* @__PURE__ */ a(ve, { className: h(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(F, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Fo, {}) }) }),
              /* @__PURE__ */ a(be, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ u(me, { children: [
              /* @__PURE__ */ a(ve, { className: h(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(F, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Fo, {}) }) }),
              /* @__PURE__ */ a(be, { align: "end", children: c })
            ] })
          ] }),
          w && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
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
const op = wa(({ className: t, ...e }, r) => /* @__PURE__ */ a(pl, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
op.displayName = "Spinner";
function oh({
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
  value: w,
  onChange: g,
  onFocus: m,
  onBlur: p
}) {
  return /* @__PURE__ */ u("div", { className: h("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Et,
      {
        htmlFor: t,
        className: h({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      Or,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: h(d, { "tw:border-red-600": r }),
        defaultValue: c,
        value: w,
        onChange: g,
        onFocus: m,
        onBlur: p
      }
    ),
    /* @__PURE__ */ a("p", { className: h({ "tw:hidden": !n }), children: n })
  ] });
}
const np = ye(
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
function nh({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        np({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function ih({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-title",
      className: h(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function sh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-description",
      className: h(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function lh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Root, { "data-slot": "context-menu", ...t });
}
function ch({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: h("tw:select-none", t),
      ...e
    }
  );
}
function dh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Group, { "data-slot": "context-menu-group", ...t });
}
function wh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function uh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function ph({
  ...t
}) {
  return /* @__PURE__ */ a(Dt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function gh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(Dt.Portal, { children: /* @__PURE__ */ a(
    Dt.Content,
    {
      "data-slot": "context-menu-content",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...e
    }
  ) });
}
function hh({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Dt.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function fh({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Dt.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ao, { className: "tw:ms-auto" })
      ]
    }
  );
}
function mh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...e
    }
  );
}
function vh({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Dt.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(rr, {}) }) }),
        e
      ]
    }
  );
}
function bh({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Dt.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(rr, {}) }) }),
        e
      ]
    }
  );
}
function xh({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Dt.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function yh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.Separator,
    {
      "data-slot": "context-menu-separator",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Nh({ ...t }) {
  return /* @__PURE__ */ a(Ue.Root, { "data-slot": "drawer", ...t });
}
function _h({ ...t }) {
  return /* @__PURE__ */ a(Ue.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function ip({ ...t }) {
  return /* @__PURE__ */ a(Ue.Portal, { "data-slot": "drawer-portal", ...t });
}
function Ch({ ...t }) {
  return /* @__PURE__ */ a(Ue.Close, { "data-slot": "drawer-close", ...t });
}
function sp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ue.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      ...e
    }
  );
}
function Eh({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = bt();
  return /* @__PURE__ */ u(ip, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(sp, {}),
    /* @__PURE__ */ u(
      Ue.Content,
      {
        "data-slot": "drawer-content",
        className: h(
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
function zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function Th({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        t
      ),
      ...e
    }
  );
}
function Sh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ue.Title,
    {
      "data-slot": "drawer-title",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Ih({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ue.Description,
    {
      "data-slot": "drawer-description",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Dh({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Mo.Root,
    {
      "data-slot": "progress",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Mo.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Rh({ ...t }) {
  const { theme: e = "system" } = vc();
  return /* @__PURE__ */ a(
    bc,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Es, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Cs, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(_s, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(Ns, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(ks, { className: "tw:size-4 tw:animate-spin" })
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
function $h({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = bt(), l = at.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Br.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: h(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          Br.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Br.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: l.length }, (d, c) => /* @__PURE__ */ a(
          Br.Thumb,
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
function Oh({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Po.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Po.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Ah({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    le.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: h("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const lp = ye(
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
function Mh({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = bt();
  return /* @__PURE__ */ a(
    le.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: h("pr-twp", lp({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: h(
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
function Lh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Content,
    {
      "data-slot": "tabs-content",
      className: h("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const jh = (t, e) => {
  X(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function cp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const dp = (t, e, r = {}) => {
  const o = K(e);
  o.current = e;
  const n = K(r);
  n.current = cp(n.current);
  const [i, s] = I(() => o.current), [l, d] = I(!0);
  return X(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const w = await t();
        c && (s(() => w), d(!1));
      }
    })(), () => {
      c = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, $a = () => !1, Vh = (t, e) => {
  const [r] = dp(
    j(async () => {
      if (!t) return $a;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    $a,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  X(() => () => {
    r !== $a && r();
  }, [r]);
};
function Bh(t) {
  X(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function wp(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
wp(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:"IBM Plex Sans Variable", sans-serif;--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:calc(var(--spacing));--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-ease-in-out:cubic-bezier(.4, 0, .2, 1);--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-accent-foreground{background-color:var(--accent-foreground)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-card-foreground{background-color:var(--card-foreground)}.tw\\:bg-destructive-foreground{background-color:var(--destructive-foreground)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted{background-color:var(--muted)}.tw\\:bg-muted-foreground{background-color:var(--muted-foreground)}.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-popover-foreground{background-color:var(--popover-foreground)}.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-secondary-foreground{background-color:var(--secondary-foreground)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent{color:var(--accent)}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card{color:var(--card)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted{color:var(--muted)}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover{color:var(--popover)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary{color:var(--secondary)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  nh as Alert,
  sh as AlertDescription,
  ih as AlertTitle,
  hw as Avatar,
  fw as AvatarFallback,
  eg as AvatarImage,
  Up as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Kp as BOOK_SELECTOR_STRING_KEYS,
  De as Badge,
  xa as BookChapterControl,
  Ya as BookSelectionMode,
  qp as BookSelector,
  F as Button,
  yo as ButtonGroup,
  Pi as ButtonGroupSeparator,
  Hp as ButtonGroupText,
  Li as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Yp as COMMENT_EDITOR_STRING_KEYS,
  Xp as COMMENT_LIST_STRING_KEYS,
  ji as CancelAcceptButtons,
  pw as Card,
  gw as CardContent,
  Qp as CardDescription,
  tg as CardFooter,
  Jp as CardHeader,
  Zp as CardTitle,
  Fc as ChapterRangeSelector,
  Gi as Checkbox,
  eh as Checklist,
  tn as ComboBox,
  Re as Command,
  Ar as CommandEmpty,
  he as CommandGroup,
  mr as CommandInput,
  ke as CommandItem,
  $e as CommandList,
  Wp as CommentEditor,
  ag as CommentList,
  lh as ContextMenu,
  vh as ContextMenuCheckboxItem,
  gh as ContextMenuContent,
  dh as ContextMenuGroup,
  hh as ContextMenuItem,
  xh as ContextMenuLabel,
  wh as ContextMenuPortal,
  ph as ContextMenuRadioGroup,
  bh as ContextMenuRadioItem,
  yh as ContextMenuSeparator,
  kh as ContextMenuShortcut,
  uh as ContextMenuSub,
  mh as ContextMenuSubContent,
  fh as ContextMenuSubTrigger,
  ch as ContextMenuTrigger,
  $w as DataTable,
  Ua as Dialog,
  Pp as DialogClose,
  Ka as DialogContent,
  Lp as DialogDescription,
  Yo as DialogFooter,
  qa as DialogHeader,
  Tc as DialogOverlay,
  zc as DialogPortal,
  Ha as DialogTitle,
  Mp as DialogTrigger,
  Nh as Drawer,
  Ch as DrawerClose,
  Eh as DrawerContent,
  Ih as DrawerDescription,
  Th as DrawerFooter,
  zh as DrawerHeader,
  sp as DrawerOverlay,
  ip as DrawerPortal,
  Sh as DrawerTitle,
  _h as DrawerTrigger,
  me as DropdownMenu,
  ue as DropdownMenuCheckboxItem,
  be as DropdownMenuContent,
  Bi as DropdownMenuGroup,
  Je as DropdownMenuItem,
  qw as DropdownMenuItemType,
  tr as DropdownMenuLabel,
  mw as DropdownMenuPortal,
  vw as DropdownMenuRadioGroup,
  bw as DropdownMenuRadioItem,
  Fe as DropdownMenuSeparator,
  rg as DropdownMenuShortcut,
  xw as DropdownMenuSub,
  kw as DropdownMenuSubContent,
  yw as DropdownMenuSubTrigger,
  ve as DropdownMenuTrigger,
  Uw as ERROR_DUMP_STRING_KEYS,
  cg as ERROR_POPOVER_STRING_KEYS,
  Jw as EditorKeyboardShortcuts,
  Kw as ErrorDump,
  dg as ErrorPopover,
  fg as FOOTNOTE_EDITOR_STRING_KEYS,
  gg as Filter,
  wg as FilterDropdown,
  pg as Footer,
  hg as FootnoteEditor,
  uu as FootnoteItem,
  mg as FootnoteList,
  _g as INVENTORY_STRING_KEYS,
  Or as Input,
  Cg as Inventory,
  xn as Kbd,
  Et as Label,
  rh as LinkedScrRefButton,
  au as MARKER_MENU_STRING_KEYS,
  lg as MarkdownRenderer,
  nu as MarkerMenu,
  ug as MoreInfo,
  Ww as MultiSelectComboBox,
  Yg as NavigationContentSearch,
  Ne as Popover,
  Oc as PopoverAnchor,
  _e as PopoverContent,
  Fp as PopoverDescription,
  Vp as PopoverHeader,
  va as PopoverPortalContainerProvider,
  Bp as PopoverTitle,
  Oe as PopoverTrigger,
  Dh as Progress,
  Fw as ProjectSelector,
  di as RadioGroup,
  Wa as RadioGroupItem,
  Ac as RecentSearches,
  ep as ResizableHandle,
  Tn as ResizablePanel,
  tp as ResizablePanelGroup,
  ah as ResultsCard,
  Bg as SCOPE_SELECTOR_STRING_KEYS,
  th as SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS,
  Fg as ScopeSelector,
  Vg as ScriptureResultsViewer,
  Gg as ScrollGroupSelector,
  To as SearchBar,
  ur as Select,
  hr as SelectContent,
  Cw as SelectGroup,
  ie as SelectItem,
  og as SelectLabel,
  zw as SelectScrollDownButton,
  Ew as SelectScrollUpButton,
  ng as SelectSeparator,
  gr as SelectTrigger,
  pr as SelectValue,
  Qe as Separator,
  Ug as SettingsList,
  qg as SettingsListHeader,
  Kg as SettingsListItem,
  Iu as SettingsSidebar,
  jg as SettingsSidebarContentSearch,
  Nu as Sidebar,
  Cu as SidebarContent,
  Ig as SidebarFooter,
  Nn as SidebarGroup,
  Rg as SidebarGroupAction,
  Cn as SidebarGroupContent,
  _n as SidebarGroupLabel,
  Sg as SidebarHeader,
  Tg as SidebarInput,
  _u as SidebarInset,
  Eu as SidebarMenu,
  $g as SidebarMenuAction,
  Og as SidebarMenuBadge,
  Su as SidebarMenuButton,
  zu as SidebarMenuItem,
  Ag as SidebarMenuSkeleton,
  Mg as SidebarMenuSub,
  Lg as SidebarMenuSubButton,
  Pg as SidebarMenuSubItem,
  ku as SidebarProvider,
  zg as SidebarRail,
  Dg as SidebarSeparator,
  Eg as SidebarTrigger,
  la as Skeleton,
  $h as Slider,
  Rh as Sonner,
  Qg as SourceLanguageIndexedList,
  op as Spinner,
  Oh as Switch,
  Qa as TabDropdownMenu,
  Wg as TabFloatingMenu,
  Hg as TabToolbar,
  _o as Table,
  Eo as TableBody,
  sg as TableCaption,
  dr as TableCell,
  ig as TableFooter,
  sa as TableHead,
  Co as TableHeader,
  Ve as TableRow,
  Ah as Tabs,
  Lh as TabsContent,
  Mh as TabsList,
  Ph as TabsTrigger,
  oh as TextField,
  jp as Textarea,
  Di as ToggleGroup,
  Zr as ToggleGroupItem,
  Jg as Toolbar,
  Kt as Tooltip,
  Ht as TooltipContent,
  Ut as TooltipProvider,
  qt as TooltipTrigger,
  Yw as UNDO_REDO_BUTTONS_STRING_KEYS,
  Zg as UiLanguageSelector,
  Xw as UndoRedoButtons,
  Xi as VerticalTabs,
  Zi as VerticalTabsContent,
  Ji as VerticalTabsList,
  Bu as VerticalTabsTrigger,
  $r as Z_INDEX_ABOVE_DOCK,
  ri as Z_INDEX_FOOTNOTE_EDITOR,
  _c as Z_INDEX_MODAL,
  Nc as Z_INDEX_MODAL_BACKDROP,
  co as Z_INDEX_OVERLAY,
  Cc as Z_INDEX_TOOLTIP,
  uw as badgeVariants,
  lw as buttonGroupVariants,
  ai as buttonVariants,
  h as cn,
  Ng as getBookIdFromUSFM,
  ga as getInventoryHeader,
  yg as getLinesFromUSFM,
  kg as getNumberFromUSFM,
  mu as getStatusForItem,
  Xg as getToolbarOSReservedSpaceClassName,
  bg as inventoryCountColumn,
  vg as inventoryItemColumn,
  xg as inventoryStatusColumn,
  Uh as sonner,
  jh as useEvent,
  Vh as useEventAsync,
  Vi as useListbox,
  dp as usePromise,
  Gp as useRecentSearches,
  ha as useSidebar,
  Bh as useStylesheet
};
//# sourceMappingURL=index.js.map
