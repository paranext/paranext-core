var si = Object.defineProperty;
var ci = (t, e, r) => e in t ? si(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var xt = (t, e, r) => ci(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx as a, jsxs as u, Fragment as ot } from "react/jsx-runtime";
import { Command as ze } from "cmdk";
import { clsx as li } from "clsx";
import { extendTailwindMerge as di, twMerge as wi } from "tailwind-merge";
import { Slot as fe, Dialog as Kt, Popover as ar, Tooltip as Pe, DropdownMenu as ft, Label as ui, RadioGroup as na, ToggleGroup as Ro, Separator as pi, Avatar as xa, Select as kt, Checkbox as Ka, Tabs as Ft, Menubar as Ht, ContextMenu as mt, Progress as qa, Slider as pr, Switch as Ga } from "radix-ui";
import { cva as Wt } from "class-variance-authority";
import { IconX as gi, IconCheck as Te, IconSearch as hi, IconChevronRight as ya, IconChevronDown as fi, IconChevronUp as mi, IconSelector as vi, IconLayoutSidebar as bi, IconLayoutSidebarRight as xi, IconLoader as yi, IconAlertOctagon as ki, IconAlertTriangle as _i, IconInfoCircle as Ni, IconCircleCheck as Ci } from "@tabler/icons-react";
import { Canon as st } from "@sillsdev/scripture";
import { includes as gr, Section as J, getChaptersForBook as Ei, formatScrRef as Ce, getSectionForBook as tr, formatRelativeDate as zi, formatReplacementString as ee, sanitizeHtml as Ti, NumberFormat as Si, formatBytes as Di, getCurrentLocale as Ri, usfmMarkers as xr, getFormatCallerFunction as Mi, deepEqual as $i, isString as Ha, compareScrRefs as ia, scrRefToBBBCCCVVV as Ur, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Check as ir, Clock as Wa, ChevronsLeft as Ya, ChevronsRight as Xa, ChevronUp as Mo, ChevronDown as sr, ArrowLeft as Ai, ArrowRight as Oi, BoldIcon as Ii, ItalicIcon as Pi, X as Ar, AtSign as $o, Pencil as Li, Trash2 as Vi, ArrowUp as Ao, MoreHorizontal as Fi, MailOpen as ji, Mail as Bi, FilterIcon as Ui, ArrowLeftIcon as Ki, ChevronLeftIcon as qi, ChevronRightIcon as Gi, ArrowRightIcon as Hi, Copy as Oo, Filter as Wi, User as Yi, Link as Xi, CircleHelp as Ji, ChevronsUpDown as Io, Star as Zi, Undo as Qi, Redo as ts, SquareX as Po, FunctionSquare as Lo, SquareSigma as Vo, Ban as es, AlertCircle as sa, CircleCheckIcon as rs, CircleXIcon as as, CircleHelpIcon as os, ArrowUpIcon as ns, ArrowDownIcon as is, Search as ss, LoaderCircle as cs, ScrollText as ls, ChevronRight as ds, ChevronLeft as ws, MenuIcon as us, Menu as ps, EllipsisVertical as gs, MoreVertical as Ja } from "lucide-react";
import at, { forwardRef as cr, useRef as Y, useMemo as P, createContext as Or, useContext as ka, useState as R, useCallback as B, useLayoutEffect as Dt, Fragment as _a, useEffect as W, Component as hs, createElement as Za, Suspense as fs } from "react";
import { createEditor as Fo, $getRoot as ne, $createParagraphNode as He, $getSelection as St, HISTORY_MERGE_TAG as Na, ParagraphNode as jo, TextNode as Bo, $isTokenOrSegmented as ms, $getCharacterOffsets as vs, $cloneWithPropertiesEphemeral as bs, $getPreviousSelection as xs, $isRangeSelection as qt, $caretFromPoint as ys, $getSiblingCaret as Uo, $getChildCaret as ks, $getAdjacentChildCaret as _s, $isChildCaret as Ns, $normalizeCaret as Cs, $setSelectionFromCaretRange as Es, $getCollapsedCaretRange as zs, $getCaretInDirection as Qa, $splitAtPointCaretNext as Ts, $isTextPointCaret as Ss, $findMatchingParent as Ko, $isElementNode as ae, mergeRegister as ie, getDOMTextNode as Ds, isHTMLElement as qo, CLEAR_EDITOR_COMMAND as Go, COMMAND_PRIORITY_EDITOR as Ca, shallowMergeConfig as Rs, defineExtension as Ot, safeCast as Se, createState as Ms, FORMAT_TEXT_COMMAND as Ho, $isNodeSelection as Wo, COMMAND_PRIORITY_LOW as Yo, RootNode as $s, LineBreakNode as As, TabNode as Os, $isEditorState as Is, createCommand as Ps, CLICK_COMMAND as Ls, isDOMNode as Vs, $getNodeFromDOMNode as Fs, $createNodeSelection as js, $setSelection as Bs, $getEditor as Us, DecoratorNode as ca, $getState as Ks, toggleTextFormatType as to, TEXT_TYPE_TO_FORMAT as qs, $setState as Gs, addClassNamesToElement as Xo, $create as Hs, $getNodeByKey as Ws, removeClassNamesFromElement as Ys, KEY_TAB_COMMAND as Xs, $isBlockElementNode as Nr, $createRangeSelection as Js, $normalizeSelection__EXPERIMENTAL as Zs, OUTDENT_CONTENT_COMMAND as Qs, INDENT_CONTENT_COMMAND as eo, INSERT_TAB_COMMAND as tc, COMMAND_PRIORITY_CRITICAL as Ea, $isDecoratorNode as ec, $isParagraphNode as rc, $isTextNode as Cr, SELECTION_CHANGE_COMMAND as Jo, getRegisteredNode as ac, isDocumentFragment as ro, isDOMDocumentNode as oc, ArtificialNode__DO_NOT_USE as Zo, $createLineBreakNode as Qo, $isRootOrShadowRoot as nc, isBlockDomNode as ao, isInlineDomNode as oo, $insertNodes as ic } from "lexical";
import { HeadingNode as sc, QuoteNode as cc, registerRichText as lc } from "@lexical/rich-text";
import { flushSync as dc, createPortal as wc } from "react-dom";
import { $isTableSelection as uc } from "@lexical/table";
import { createHeadlessEditor as tn } from "@lexical/headless";
import { useReactTable as en, getFilteredRowModel as pc, getSortedRowModel as rn, getPaginationRowModel as gc, getCoreRowModel as an, flexRender as er, getGroupedRowModel as hc, getExpandedRowModel as fc } from "@tanstack/react-table";
import mc from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as la, HIDDEN_NOTE_CALLER as da, getDefaultViewOptions as vc, isInsertEmbedOpOfType as hr, Editorial as bc } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as xc } from "react-hotkeys-hook";
import { Drawer as me } from "vaul";
import * as za from "react-resizable-panels";
import { useTheme as yc } from "next-themes";
import { Toaster as kc } from "sonner";
import { toast as Fg } from "sonner";
const _c = di({ prefix: "tw" });
function wa(t) {
  const e = [];
  let r = "", o = 0;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    i === "[" ? o += 1 : i === "]" && (o -= 1), i === ":" && o === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function Nc(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = wa(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== r), `-${i}`].join(":")}`, original: t };
  }
  const o = e.findIndex((i) => i.startsWith("!tw-"));
  if (o !== -1) {
    const i = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== o), `!${i}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const i = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Cc(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = wa(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), n = r[r.length - 1], i = wa(e), c = i.some((l) => l.startsWith("-tw-")), s = i.some((l) => l.startsWith("!tw-"));
  if (c && n.startsWith("-")) {
    const l = n.slice(1);
    return [...o, `-tw-${l}`].join(":");
  }
  if (s && n.startsWith("!")) {
    const l = n.slice(1);
    return [...o, `!tw-${l}`].join(":");
  }
  return [...o, `tw-${n}`].join(":");
}
function f(...t) {
  const e = li(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return _c(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), n = [];
  return r.forEach((l) => {
    const d = Nc(l);
    o.set(d.normalized, d.original), n.push(d.normalized);
  }), wi(n.join(" ")).split(" ").filter(Boolean).map((l) => {
    const d = o.get(l);
    return d ? Cc(l, d) : l;
  }).join(" ");
}
const We = 250, on = 300, nn = 400, Ec = 450, zc = 500, sn = Wt(
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
function j({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...n
}) {
  const i = o ? fe.Root : "button";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: f(sn({ variant: e, size: r, className: t })),
      ...n
    }
  );
}
const Tc = "layoutDirection";
function it() {
  const t = localStorage.getItem(Tc);
  return t === "rtl" ? t : "ltr";
}
function Sc({ ...t }) {
  return /* @__PURE__ */ a(Kt.Root, { "data-slot": "dialog", ...t });
}
function Tu({ ...t }) {
  return /* @__PURE__ */ a(Kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Dc({ ...t }) {
  return /* @__PURE__ */ a(Kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function Su({ ...t }) {
  return /* @__PURE__ */ a(Kt.Close, { "data-slot": "dialog-close", ...t });
}
function Rc({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Kt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: f(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Ec, ...e },
      ...r
    }
  );
}
function Mc({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...i
}) {
  const c = it();
  return /* @__PURE__ */ u(Dc, { children: [
    /* @__PURE__ */ a(Rc, { className: o }),
    /* @__PURE__ */ u(
      Kt.Content,
      {
        "data-slot": "dialog-content",
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: zc, ...n },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ a(Kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ u(j, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ a(gi, {}),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function cn({ className: t, ...e }) {
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
function Du({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
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
        e && /* @__PURE__ */ a(Kt.Close, { asChild: !0, children: /* @__PURE__ */ a(j, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function ln({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Kt.Title,
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
function Ru({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Kt.Description,
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
function lr({ className: t, type: e, ...r }) {
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
function Mu({ className: t, ...e }) {
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
function $c({ className: t, ...e }) {
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
const Ac = Wt(
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
function Oc({
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
        className: f(Ac({ align: e }), t),
        onClick: (o) => {
          var n, i;
          o.target instanceof HTMLElement && o.target.closest("button") || (i = (n = o.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || i.focus();
        },
        ...r
      }
    )
  );
}
Wt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function De({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ze,
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
function dr({
  className: t,
  ...e
}) {
  const r = it();
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ u($c, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        ze.Input,
        {
          "data-slot": "command-input",
          className: f(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          ...e
        }
      ),
      /* @__PURE__ */ a(Oc, { children: /* @__PURE__ */ a(hi, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Re({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ze.List,
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
function Ir({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ze.Empty,
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
function he({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ze.Group,
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
function dn({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    ze.Separator,
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
function ve({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    ze.Item,
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
        /* @__PURE__ */ a(Te, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ic({ className: t, ...e }) {
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
const wn = (t, e, r, o, n) => {
  switch (t) {
    case J.OT:
      return e ?? "Old Testament";
    case J.NT:
      return r ?? "New Testament";
    case J.DC:
      return o ?? "Deuterocanon";
    case J.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Pc = (t, e, r, o, n) => {
  switch (t) {
    case J.OT:
      return e ?? "OT";
    case J.NT:
      return r ?? "NT";
    case J.DC:
      return o ?? "DC";
    case J.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Le(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? st.bookIdToEnglishName(t);
}
function Ta(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Sa = "tw:data-selected:ring-3 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset", un = st.allBookIds.filter(
  (t) => !st.isObsolete(st.bookIdToNumber(t))
), Ee = Object.fromEntries(
  un.map((t) => [t, st.bookIdToEnglishName(t)])
);
function Da(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const n = st.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(gr(n.toLowerCase(), o) || gr(t.toLowerCase(), o) || (i ? gr(i.localizedName.toLowerCase(), o) || gr(i.localizedId.toLowerCase(), o) : !1));
}
const pn = cr(
  ({
    bookId: t,
    isSelected: e,
    onSelect: r,
    onMouseDown: o,
    section: n,
    className: i,
    showCheck: c = !1,
    localizedBookNames: s,
    commandValue: l,
    showActiveRing: d = !0
  }, w) => {
    const g = Y(!1), h = () => {
      g.current || r == null || r(t), setTimeout(() => {
        g.current = !1;
      }, 100);
    }, p = (b) => {
      g.current = !0, o ? o(b) : r == null || r(t);
    }, v = P(
      () => Le(t, s),
      [t, s]
    ), x = P(
      () => Ta(t, s),
      [t, s]
    );
    return /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": n === J.OT,
            "tw:border-s-purple-200": n === J.NT,
            "tw:border-s-indigo-200": n === J.DC,
            "tw:border-s-amber-200": n === J.Extra
          }
        ),
        children: /* @__PURE__ */ u(
          ve,
          {
            ref: w,
            value: l || `${t} ${st.bookIdToEnglishName(t)}`,
            onSelect: h,
            onMouseDown: p,
            role: "option",
            "aria-selected": e,
            "aria-label": `${st.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: f(
              // Hide the CommandItem's built-in trailing check icon (we render our own leading
              // <Check/> for multiselect via showCheck).
              "tw:[&>svg:last-child]:hidden",
              // Suppress shadcn CommandItem's default data-selected:bg-muted / text-foreground —
              // DOM focus is the source of truth for the visible focus indicator; hover is the
              // pointer-feedback channel.
              "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
              // Hover indication (pointer feedback) — kept distinct from the focus ring.
              "tw:hover:bg-muted",
              // Keyboard focus ring on the data-selected item. cmdk's pointer selection is
              // disabled on the parent Command, so data-selected only reflects keyboard nav.
              // Suppressed when another element owns the focus indicator (e.g. the input). Uses the
              // shared LIST_ITEM_KEYBOARD_FOCUS_RING (shadcn's standard ring tokens).
              d && Sa,
              i
            ),
            children: [
              c && /* @__PURE__ */ a(
                ir,
                {
                  className: f(
                    "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: v }),
              /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: x })
            ]
          }
        )
      }
    );
  }
);
function be({ ...t }) {
  return /* @__PURE__ */ a(ar.Root, { "data-slot": "popover", ...t });
}
function Me({ ...t }) {
  return /* @__PURE__ */ a(ar.Trigger, { "data-slot": "popover-trigger", ...t });
}
function xe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...n
}) {
  const i = it();
  return /* @__PURE__ */ a(ar.Portal, { children: /* @__PURE__ */ a(
    ar.Content,
    {
      "data-slot": "popover-content",
      align: e,
      sideOffset: r,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
        "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      style: { zIndex: We, ...o },
      dir: i,
      ...n
    }
  ) });
}
function Lc({ ...t }) {
  return /* @__PURE__ */ a(ar.Anchor, { "data-slot": "popover-anchor", ...t });
}
function $u({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-header",
      className: f("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Au({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "popover-title",
      className: f("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ou({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "popover-description",
      className: f("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function _t({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pe.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Nt({ ...t }) {
  return /* @__PURE__ */ a(Pe.Root, { "data-slot": "tooltip", ...t });
}
function Ct({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Pe.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? f(sn({ variant: e }), t) : t,
      ...r
    }
  );
}
function Et({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ a(Pe.Portal, { children: /* @__PURE__ */ u(
    Pe.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: We, ...r },
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ a(Pe.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function Qe(t, e, r) {
  return `${t} ${Ee[t]}${e ? ` ${Ta(t, e)} ${Le(t, e)}` : ""}${r ? ` ${r}` : ""}`;
}
const Ra = Or(void 0);
function de() {
  const t = ka(Ra);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const $e = Wt("", {
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
function se({ variant: t = "default", ...e }) {
  const r = it(), o = at.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ a(Ra.Provider, { value: o, children: /* @__PURE__ */ a(ft.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Vc({
  ...t
}) {
  return /* @__PURE__ */ a(ft.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ce({
  ...t
}) {
  return /* @__PURE__ */ a(ft.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function le({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  children: o,
  ...n
}) {
  const i = it();
  return /* @__PURE__ */ a(ft.Portal, { children: /* @__PURE__ */ a(
    ft.Content,
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
function gn({ ...t }) {
  return /* @__PURE__ */ a(ft.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Er({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = it(), i = de();
  return /* @__PURE__ */ a(
    ft.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: i.variant })
      ),
      dir: n,
      ...o
    }
  );
}
function pe({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  const i = it(), c = de();
  return /* @__PURE__ */ u(
    ft.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: c.variant })
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
            children: /* @__PURE__ */ a(ft.ItemIndicator, { children: /* @__PURE__ */ a(Te, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Fc({
  ...t
}) {
  return /* @__PURE__ */ a(ft.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function jc({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const n = it(), i = de();
  return /* @__PURE__ */ u(
    ft.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: f(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: i.variant })
      ),
      dir: n,
      ...o,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ a(ft.ItemIndicator, { children: /* @__PURE__ */ a(Te, {}) })
          }
        ),
        e
      ]
    }
  );
}
function wr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ a(
    ft.Label,
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
function ur({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ft.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Iu({ className: t, ...e }) {
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
function Bc({ ...t }) {
  return /* @__PURE__ */ a(ft.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Uc({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = de();
  return /* @__PURE__ */ u(
    ft.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: n.variant })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ya, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Kc({ className: t, children: e, ...r }) {
  const o = it();
  return /* @__PURE__ */ a(
    ft.SubContent,
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
function qc({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: c,
  classNameForItems: s,
  buttonClassName: l = "tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: d = "ghost"
}) {
  const [w, g] = R(!1);
  if (t.length === 0)
    return;
  const h = (p) => {
    e(p), g(!1);
  };
  return /* @__PURE__ */ u(se, { open: w, onOpenChange: g, children: [
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ a(
        j,
        {
          variant: d,
          size: "icon",
          className: l,
          "aria-label": n,
          children: /* @__PURE__ */ a(Wa, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ a(Et, { children: n })
    ] }) }),
    /* @__PURE__ */ u(le, { id: c, align: "start", style: { zIndex: nn }, children: [
      /* @__PURE__ */ a(wr, { children: i }),
      t.map((p) => /* @__PURE__ */ u(
        Er,
        {
          className: s,
          onSelect: () => h(p),
          children: [
            /* @__PURE__ */ a(Wa, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
            /* @__PURE__ */ a("span", { children: r(p) })
          ]
        },
        o(p)
      ))
    ] })
  ] });
}
function Pu(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (s) => !r(s, n)
    ), c = [n, ...i.slice(0, o - 1)];
    e(c);
  };
}
const Kr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Gc = [
  Kr.BOOK_ONLY,
  Kr.BOOK_CHAPTER,
  Kr.BOOK_CHAPTER_VERSE
];
function qr(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
const hn = 6, Hc = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
function Wc(t) {
  return Hc.some((e) => e === t);
}
function Yc(t, e, r, o) {
  const n = Math.min(o, r), i = Math.floor((r - 1) / o) * o + 1;
  switch (e) {
    case "ArrowLeft":
      return t === 0 ? n : t > 1 ? t - 1 : r;
    case "ArrowRight":
      return t === 0 ? 1 : t < r ? t + 1 : 1;
    case "ArrowUp":
      return t === 0 ? i : Math.max(1, t - o);
    case "ArrowDown":
      return t === 0 ? 1 : Math.min(r, t + o);
    default:
      return t;
  }
}
function Vt(t) {
  return Ei(st.bookIdToNumber(t));
}
function Xc(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = Gc.reduce(
    (n, i) => {
      if (n) return n;
      const c = i.exec(t.trim());
      if (c) {
        const [s, l = void 0, d = void 0] = c.slice(1);
        let w;
        const g = e.filter((h) => Da(h, s, r));
        if (g.length === 1 && ([w] = g), !w && l) {
          if (st.isBookIdValid(s)) {
            const h = s.toUpperCase();
            e.includes(h) && (w = h);
          }
          if (!w && r) {
            const h = Array.from(r.entries()).find(
              ([, p]) => p.localizedId.toLowerCase() === s.toLowerCase()
            );
            h && e.includes(h[0]) && ([w] = h);
          }
        }
        if (!w && l) {
          const p = ((v) => Object.keys(Ee).find(
            (x) => Ee[x].toLowerCase() === v.toLowerCase()
          ))(s);
          if (p && e.includes(p) && (w = p), !w && r) {
            const v = Array.from(r.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === s.toLowerCase()
            );
            v && e.includes(v[0]) && ([w] = v);
          }
        }
        if (w) {
          let h = l ? parseInt(l, 10) : void 0;
          h && h > Vt(w) && (h = Math.max(Vt(w), 1));
          const p = d ? parseInt(d, 10) : void 0;
          return {
            book: w,
            chapterNum: h,
            verseNum: p
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function Jc(t, e, r, o, n) {
  const i = B(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const w = e[d - 1], g = Math.max(Vt(w), 1);
        o({
          book: w,
          chapterNum: g,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), c = B(() => {
    const d = Vt(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w < e.length - 1) {
        const g = e[w + 1];
        o({
          book: g,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = B(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = B(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return P(() => [
    {
      onClick: i,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: (n == null ? void 0 : n["%bookChapterControl_previousChapter%"]) ?? "Previous chapter",
      icon: r === "ltr" ? Ya : Xa
    },
    {
      onClick: c,
      disabled: e.length === 0 || (t.chapterNum === Vt(t.book) || Vt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: (n == null ? void 0 : n["%bookChapterControl_nextChapter%"]) ?? "Next chapter",
      icon: r === "ltr" ? Xa : Ya
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: (n == null ? void 0 : n["%bookChapterControl_previousVerse%"]) ?? "Previous verse",
      icon: Mo
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: (n == null ? void 0 : n["%bookChapterControl_nextVerse%"]) ?? "Next verse",
      icon: sr
    }
  ], [
    t,
    e,
    r,
    n,
    i,
    s,
    l,
    c
  ]);
}
function no({
  bookId: t,
  scrRef: e,
  onChapterSelect: r,
  setChapterRef: o,
  isChapterDimmed: n,
  className: i,
  showActiveRing: c = !0
}) {
  if (t)
    return /* @__PURE__ */ a(he, { children: /* @__PURE__ */ a(
      "div",
      {
        className: f("tw:grid tw:gap-1", i),
        style: { gridTemplateColumns: `repeat(${hn}, minmax(0, 1fr))` },
        children: Array.from({ length: Vt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ a(
          ve,
          {
            value: `${t} ${Ee[t] || ""} ${s}`,
            onSelect: () => r(s),
            ref: o(s),
            className: f(
              "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:gap-0 tw:rounded-md tw:p-0 tw:text-center tw:text-sm tw:[&>svg]:hidden",
              // Suppress shadcn CommandItem's default data-selected:bg-muted / text-foreground —
              // for chapter cells keyboard focus is indicated by a ring only, with no background
              // or text-color change.
              "tw:data-selected:bg-transparent tw:data-selected:text-inherit",
              // Hover indication (pointer feedback) — kept distinct from the focus ring so it
              // doesn't imply that hovering changes the keyboard/submit target.
              "tw:hover:bg-muted",
              // cmdk sets data-selected only on keyboard-highlighted items (pointer selection is
              // disabled on the parent Command), so this ring is keyboard-focus only. Suppressed
              // when another element owns the focus indicator (e.g. the back button or input).
              // Uses the shared LIST_ITEM_KEYBOARD_FOCUS_RING (shadcn's standard ring-3 +
              // ring-ring/50 tokens, matching the Button focus ring).
              c && Sa,
              {
                // Dimmed (non-matching) chapters: muted text only, no background — the absence of a
                // background already reads as "de-emphasized" without adding visual weight.
                "tw:text-muted-foreground/50": ((n == null ? void 0 : n(s)) ?? !1) && !(t === e.book && s === e.chapterNum)
              },
              {
                // Re-assert the primary highlight under data-selected so the currently-selected
                // chapter keeps its primary background/text when keyboard focus also lands on it.
                // hover:bg-primary overrides the grid's general hover:bg-muted so the selected
                // chapter shows no hover effect (its appearance doesn't change on pointer-over).
                "tw:bg-primary tw:text-primary-foreground tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:hover:bg-primary": t === e.book && s === e.chapterNum
              }
            ),
            children: s
          },
          s
        ))
      }
    ) });
}
function Lu({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  localizedBookNames: n,
  localizedStrings: i,
  recentSearches: c,
  onAddRecentSearch: s,
  id: l
}) {
  const d = it(), [w, g] = R(!1), [h, p] = R(""), [v, x] = R(""), [b, N] = R("books"), [y, _] = R(void 0), [k, I] = R(!1), $ = Y(void 0), A = Y(void 0), C = Y(void 0), T = Y(void 0), E = Y({}), [O, V] = R(!1);
  Dt(() => {
    A.current && (A.current.tabIndex = 0);
  });
  const G = B(
    (m) => {
      e(m), s && s(m);
    },
    [e, s]
  ), M = P(() => o ? o() : un, [o]), H = P(() => ({
    [J.OT]: M.filter((D) => st.isBookOT(D)),
    [J.NT]: M.filter((D) => st.isBookNT(D)),
    [J.DC]: M.filter((D) => st.isBookDC(D)),
    [J.Extra]: M.filter((D) => st.extraBooks().includes(D))
  }), [M]), S = P(() => Object.values(H).flat(), [H]), U = P(() => {
    if (!v.trim()) return H;
    const m = {
      [J.OT]: [],
      [J.NT]: [],
      [J.DC]: [],
      [J.Extra]: []
    };
    return [J.OT, J.NT, J.DC, J.Extra].forEach((F) => {
      m[F] = H[F].filter((q) => Da(q, v, n));
    }), m;
  }, [H, v, n]), L = P(
    () => Xc(v, S, n),
    [v, S, n]
  ), zt = B(() => {
    L && (G({
      book: L.book,
      chapterNum: L.chapterNum ?? 1,
      verseNum: L.verseNum ?? 1
    }), g(!1), x(""), p(""));
  }, [G, L]), Rt = B(
    (m) => {
      if (Vt(m) <= 1) {
        G({
          book: m,
          chapterNum: 1,
          verseNum: 1
        }), g(!1), x("");
        return;
      }
      _(m), N("chapters");
    },
    [G]
  ), ct = B(
    (m) => {
      const D = b === "chapters" ? y : L == null ? void 0 : L.book;
      D && (G({
        book: D,
        chapterNum: m,
        verseNum: 1
      }), g(!1), N("books"), _(void 0), x(""));
    },
    [G, b, y, L]
  ), Xt = B(
    (m) => {
      G(m), g(!1), x("");
    },
    [G]
  ), K = Jc(
    t,
    S,
    d,
    e,
    i
  ), nt = (i == null ? void 0 : i["%bookChapterControl_backToBooks%"]) ?? "Back to books", et = B(() => {
    N("books"), _(void 0), setTimeout(() => {
      $.current && $.current.focus();
    }, 0);
  }, []), dt = B(
    (m) => {
      if (!m && b === "chapters") {
        et();
        return;
      }
      g(m), m && (N("books"), _(void 0), x(""));
    },
    [b, et]
  ), { otLong: Tt, ntLong: Jt, dcLong: vt, extraLong: Zt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, we = B(
    (m) => wn(m, Tt, Jt, vt, Zt),
    [Tt, Jt, vt, Zt]
  ), bt = B(
    (m) => L ? !!L.chapterNum && !m.toString().includes(L.chapterNum.toString()) : !1,
    [L]
  ), Mt = P(() => {
    if (L) {
      if (!h.includes(":")) {
        const m = h.match(/(\d+)$/);
        if (m) {
          const D = parseInt(m[1], 10), F = Vt(L.book);
          if (D >= 1 && (F <= 0 || D <= F)) return D;
        }
      }
      return L.chapterNum ?? 1;
    }
  }, [h, L]), Qt = P(
    () => Ce(
      t,
      n ? Le(t.book, n) : "English"
    ),
    [t, n]
  ), Ae = B((m) => (D) => {
    E.current[m] = D;
  }, []), $t = B((m) => {
    var Z, X;
    (Z = A.current) == null || Z.focus();
    const D = (X = A.current) == null ? void 0 : X.querySelectorAll(
      '[cmdk-item]:not([data-disabled="true"])'
    );
    if (!D || D.length === 0) return;
    const F = m === "first" ? D[0] : D[D.length - 1], q = F.getAttribute("data-value");
    q && p(q), setTimeout(() => {
      F.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, 0);
  }, []), te = B(
    (m) => {
      if (m.key === "Home" || m.key === "End") {
        m.stopPropagation();
        return;
      }
      if (m.key === "ArrowLeft" || m.key === "ArrowRight") {
        m.stopPropagation();
        return;
      }
      (m.key === "ArrowUp" || m.key === "ArrowDown") && (m.preventDefault(), m.stopPropagation(), $t(m.key === "ArrowDown" ? "first" : "last"));
    },
    [$t]
  ), Xe = B(
    (m) => {
      var q, Z;
      if (m.ctrlKey) return;
      const { isLetter: D, isDigit: F } = qr(m.key);
      if (b === "chapters" && m.key === "Backspace") {
        m.preventDefault(), m.stopPropagation(), et();
        return;
      }
      if (O && (D || F)) {
        if (m.preventDefault(), m.stopPropagation(), b === "chapters") {
          if (N("books"), F && y) {
            const X = Ee[y];
            x(`${X} ${m.key}`);
          } else
            x(m.key);
          _(void 0);
        } else
          x((X) => X + m.key);
        setTimeout(() => {
          var X;
          return (X = $.current) == null ? void 0 : X.focus();
        }, 0);
        return;
      }
      if (O && b === "books" && m.key === "Backspace") {
        m.preventDefault(), x((X) => X.slice(0, -1)), (q = $.current) == null || q.focus();
        return;
      }
      if (O && m.key === " ") {
        m.preventDefault();
        const X = (Z = A.current) == null ? void 0 : Z.querySelector(
          '[cmdk-item][data-selected="true"]'
        );
        X == null || X.click();
        return;
      }
      if ((b === "chapters" || b === "books" && L) && Wc(m.key) && document.activeElement === A.current) {
        const X = b === "chapters" ? y : L == null ? void 0 : L.book;
        if (!X) return;
        const wt = (() => {
          if (!h || h.includes(":")) return 0;
          const z = h.match(/(\d+)$/);
          return z ? parseInt(z[1], 10) : 0;
        })(), lt = Vt(X);
        if (!lt) return;
        const ht = Yc(
          wt,
          m.key,
          lt,
          hn
        );
        ht !== wt && (m.preventDefault(), m.stopPropagation(), p(Qe(X, n, ht)), setTimeout(() => {
          const z = E.current[ht];
          z && z.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      L,
      et,
      y,
      h,
      n,
      O
    ]
  ), It = B(
    (m) => {
      var D, F;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(m.key)) {
        (D = A.current) == null || D.focus();
        return;
      }
      if (m.key === "Tab") {
        m.preventDefault(), m.stopPropagation(), y && p(Qe(y, n, 1)), (F = A.current) == null || F.focus(), setTimeout(() => {
          var q;
          (q = E.current[1]) == null || q.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 0);
        return;
      }
      (m.key === "Enter" || m.key === " ") && m.stopPropagation();
    },
    [y, n]
  ), ye = B(
    (m) => {
      if (m.shiftKey || m.key === "Tab" || m.key === " ") return;
      if (m.key === "ArrowUp" || m.key === "ArrowDown") {
        m.preventDefault(), m.stopPropagation(), I(!1), $t(m.key === "ArrowDown" ? "first" : "last");
        return;
      }
      const { isLetter: D, isDigit: F } = qr(m.key);
      (D || F) && (m.preventDefault(), x((q) => q + m.key), $.current.focus(), I(!1));
    },
    [$t]
  );
  return Dt(() => {
    const m = setTimeout(() => {
      if (w && b === "books" && A.current && C.current) {
        const D = A.current, F = C.current, q = F.offsetTop, Z = D.clientHeight, X = F.clientHeight, wt = q - Z / 2 + X / 2;
        D.scrollTo({
          top: Math.max(0, wt),
          behavior: "smooth"
        }), p(Qe(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(m);
    };
  }, [w, b, v, L, t.book]), Dt(() => {
    b !== "chapters" || !y || (p(Qe(y, n)), setTimeout(() => {
      A.current && A.current.scrollTo({ top: 0 }), T.current && T.current.focus();
    }, 0));
  }, [b, y, n]), /* @__PURE__ */ u(be, { open: w, onOpenChange: dt, children: [
    /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ a(
      j,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": w,
        className: f(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        children: /* @__PURE__ */ a("span", { className: "tw:truncate", children: Qt })
      }
    ) }),
    /* @__PURE__ */ a(
      xe,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: "center",
        onEscapeKeyDown: (m) => {
          b === "chapters" && (m.preventDefault(), et());
        },
        onFocusOutside: (m) => m.preventDefault(),
        children: /* @__PURE__ */ u(
          De,
          {
            onKeyDown: Xe,
            loop: !0,
            value: h,
            onValueChange: p,
            shouldFilter: !1,
            disablePointerSelection: !0,
            children: [
              b === "books" ? /* @__PURE__ */ u("div", { className: f("tw:flex tw:items-end", k && "tw:pb-1"), children: [
                /* @__PURE__ */ u(
                  "div",
                  {
                    className: "tw:relative tw:flex-1",
                    onKeyDown: (m) => {
                      var q;
                      if (m.target === $.current && (m.key === "ArrowUp" || m.key === "ArrowDown")) {
                        m.preventDefault(), m.stopPropagation(), $t(m.key === "ArrowDown" ? "first" : "last");
                        return;
                      }
                      if (m.target === $.current || m.key === "Tab" || m.key === "Escape") return;
                      const { isLetter: D, isDigit: F } = qr(m.key);
                      (D || F) && (m.preventDefault(), m.stopPropagation(), x((Z) => Z + m.key), (q = $.current) == null || q.focus());
                    },
                    children: [
                      /* @__PURE__ */ a(
                        dr,
                        {
                          ref: $,
                          value: v,
                          onValueChange: x,
                          onKeyDown: te,
                          onFocus: () => I(!1),
                          className: c && c.length > 0 ? "tw:pe-8!" : ""
                        }
                      ),
                      c && c.length > 0 && /* @__PURE__ */ a(
                        qc,
                        {
                          recentSearches: c,
                          onSearchItemSelect: Xt,
                          renderItem: (m) => Ce(m, "English"),
                          getItemKey: (m) => `${m.book}-${m.chapterNum}-${m.verseNum}`,
                          ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                          groupHeading: i == null ? void 0 : i["%history_recent%"],
                          buttonClassName: "tw:absolute tw:end-1 tw:top-1"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:translate-y-px tw:items-center tw:pe-2", children: /* @__PURE__ */ a(_t, { children: K.map(({ onClick: m, disabled: D, title: F, icon: q }, Z) => /* @__PURE__ */ u(_a, { children: [
                  Z === 2 && /* @__PURE__ */ a("div", { className: "tw:mx-1 tw:h-5 tw:w-px tw:bg-border", "aria-hidden": "true" }),
                  /* @__PURE__ */ u(Nt, { children: [
                    /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
                      j,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => {
                          I(!0), m();
                        },
                        disabled: D,
                        className: "tw:h-8.5 tw:w-6 tw:p-0",
                        "aria-label": F,
                        onKeyDown: ye,
                        children: /* @__PURE__ */ a(q, {})
                      }
                    ) }),
                    /* @__PURE__ */ a(Et, { children: F })
                  ] })
                ] }, F)) }) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1", children: [
                /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
                  /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
                    j,
                    {
                      ref: T,
                      variant: "ghost",
                      size: "sm",
                      onClick: et,
                      onKeyDown: It,
                      className: "tw:mr-2 tw:h-8 tw:w-8 tw:p-0",
                      "aria-label": nt,
                      children: d === "ltr" ? /* @__PURE__ */ a(Ai, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(Oi, { className: "tw:h-4 tw:w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ a(Et, { children: nt })
                ] }) }),
                y && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Le(y, n) })
              ] }),
              !k && /* @__PURE__ */ u(
                Re,
                {
                  ref: A,
                  tabIndex: 0,
                  onFocus: (m) => {
                    m.target === m.currentTarget && V(!0);
                  },
                  onBlur: (m) => {
                    m.target === m.currentTarget && V(!1);
                  },
                  className: "tw:outline-none tw:scroll-pt-10 tw:![scrollbar-width:thin] tw:[&::-webkit-scrollbar]:!block tw:[&::-webkit-scrollbar]:!w-2 tw:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 tw:[&::-webkit-scrollbar-thumb]:rounded",
                  children: [
                    b === "books" && /* @__PURE__ */ u(ot, { children: [
                      !L && Object.entries(U).map(([m, D]) => {
                        if (D.length !== 0)
                          return (
                            // We are mapping over filteredBooksByType, which uses Section as key type
                            // eslint-disable-next-line no-type-assertion/no-type-assertion
                            /* @__PURE__ */ a(he, { heading: we(m), children: D.map((F) => /* @__PURE__ */ a(
                              pn,
                              {
                                bookId: F,
                                onSelect: (q) => Rt(q),
                                section: tr(F),
                                commandValue: `${F} ${Ee[F]}`,
                                ref: F === t.book ? C : void 0,
                                localizedBookNames: n,
                                showActiveRing: O
                              },
                              F
                            )) }, m)
                          );
                      }),
                      L && /* @__PURE__ */ u(
                        ve,
                        {
                          value: `${L.book} ${Ee[L.book]} ${L.chapterNum ?? 1}:${L.verseNum ?? 1}`,
                          onSelect: zt,
                          className: f(
                            "tw:font-semibold tw:text-primary tw:[&_svg]:hidden",
                            // Pin to the top of the scrollable CommandList so the parsed reference
                            // stays visible while the user navigates the chapter grid below it.
                            // bg-popover is required because position:sticky elements need a solid
                            // background; otherwise scrolling chapter cells show through.
                            "tw:sticky tw:top-0 tw:z-10 tw:bg-popover",
                            // Override shadcn's default data-selected:bg-muted / text-foreground —
                            // keep tw:text-primary and a solid popover background even when this
                            // row is the cmdk-active item. bg-popover (not bg-transparent) so the
                            // sticky stays opaque against the scrolling chapter cells underneath.
                            "tw:data-selected:bg-popover tw:data-selected:text-primary",
                            // Pointer-feedback background; distinct from the focus ring.
                            "tw:hover:bg-muted",
                            // Keyboard focus ring only when the list/grid owns DOM focus. Uses the
                            // shared LIST_ITEM_KEYBOARD_FOCUS_RING (shadcn's standard ring tokens).
                            O && Sa
                          ),
                          children: [
                            /* @__PURE__ */ a("span", { className: "tw:flex-1", children: Ce(
                              {
                                book: L.book,
                                chapterNum: Mt ?? 1,
                                verseNum: Mt === L.chapterNum ? L.verseNum ?? 1 : 1
                              },
                              Le(L.book, n)
                            ) }),
                            /* @__PURE__ */ a("span", { className: "tw:font-normal tw:text-muted-foreground", children: Ta(L.book, n) })
                          ]
                        },
                        "top-match"
                      ),
                      L && Vt(L.book) > 1 && /* @__PURE__ */ a(
                        no,
                        {
                          bookId: L.book,
                          scrRef: t,
                          onChapterSelect: ct,
                          setChapterRef: Ae,
                          isChapterDimmed: bt,
                          showActiveRing: O,
                          className: "tw:px-4 tw:pb-4"
                        }
                      )
                    ] }),
                    b === "chapters" && y && /* @__PURE__ */ a(
                      no,
                      {
                        bookId: y,
                        scrRef: t,
                        onChapterSelect: ct,
                        setChapterRef: Ae,
                        showActiveRing: O,
                        className: "tw:p-4"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
const Vu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%bookChapterControl_backToBooks%",
  "%bookChapterControl_previousChapter%",
  "%bookChapterControl_nextChapter%",
  "%bookChapterControl_previousVerse%",
  "%bookChapterControl_nextVerse%"
]);
function gt({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    ui.Root,
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
function fn({
  className: t,
  ...e
}) {
  const r = it();
  return /* @__PURE__ */ a(
    na.Root,
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
function ua({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    na.Item,
    {
      "data-slot": "radio-group-item",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        na.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ a("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function Zc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function pa({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: c,
  onChange: s = () => {
  },
  getOptionLabel: l = Zc,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: g = "",
  textPlaceholder: h = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: v = "outline",
  alignDropDown: x = "start",
  isDisabled: b = !1,
  ariaLabel: N,
  ...y
}) {
  const [_, k] = R(!1), I = d ?? l, $ = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], A = (C, T) => {
    const E = l(C), O = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, V = `${T ?? ""}${E}${O ?? ""}`;
    return /* @__PURE__ */ u(
      ve,
      {
        value: E,
        onSelect: () => {
          s(C), k(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            ir,
            {
              className: f("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !c || l(c) !== E
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
      V
    );
  };
  return /* @__PURE__ */ u(be, { open: _, onOpenChange: k, ...y, children: [
    /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ u(
      j,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": N,
        id: t,
        className: f(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: c ? I(c) : g
              }
            )
          ] }),
          /* @__PURE__ */ a(sr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      xe,
      {
        align: x,
        className: f("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(De, { children: [
          /* @__PURE__ */ a(dr, { placeholder: h, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(Ir, { children: p }),
          /* @__PURE__ */ a(Re, { children: $(e) ? e.map((C) => /* @__PURE__ */ a(he, { heading: C.groupHeading, children: C.options.map((T) => A(T, C.groupHeading)) }, C.groupHeading)) : /* @__PURE__ */ a(he, { children: e.map((C) => A(C)) }) })
        ] })
      }
    )
  ] });
}
function Qc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const c = P(
    () => Array.from({ length: i }, (d, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(ot, { children: [
    /* @__PURE__ */ a(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      pa,
      {
        isDisabled: n,
        onChange: (d) => {
          r(d), d > e && o(d);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: c,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      pa,
      {
        isDisabled: n,
        onChange: (d) => {
          o(d), d < t && r(d);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: c,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var ga = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(ga || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(ga || (ga = {}));
const Fu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Gr = (t, e) => t[e] ?? e;
function ju({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: i,
  handleSelectEndChapter: c,
  startChapter: s,
  handleSelectStartChapter: l,
  localizedStrings: d
}) {
  const w = Gr(d, "%webView_bookSelector_currentBook%"), g = Gr(d, "%webView_bookSelector_choose%"), h = Gr(d, "%webView_bookSelector_chooseBooks%"), [p, v] = R(
    "current book"
    /* CurrentBook */
  ), x = (b) => {
    v(b), t(b);
  };
  return /* @__PURE__ */ a(
    fn,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (b) => x(b),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ua, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(gt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(gt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            Qc,
            {
              isDisabled: p === "choose books",
              handleSelectStartChapter: l,
              handleSelectEndChapter: c,
              chapterCount: n,
              startChapter: s,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ua, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(gt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(gt, { className: "tw:flex tw:items-center", children: o.map((b) => st.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ a(
            j,
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
const mn = Or(null);
function tl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Yt() {
  const t = ka(mn);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const vn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, el = vn ? Dt : W, fr = { tag: Na };
function rl({ initialConfig: t, children: e }) {
  const r = P(() => {
    const { theme: o, namespace: n, nodes: i, onError: c, editorState: s, html: l } = t, d = tl(null, o), w = Fo({ editable: t.editable, html: l, namespace: n, nodes: i, onError: (g) => c(g, w), theme: o });
    return function(g, h) {
      if (h !== null) {
        if (h === void 0) g.update(() => {
          const p = ne();
          if (p.isEmpty()) {
            const v = He();
            p.append(v);
            const x = vn ? document.activeElement : null;
            (St() !== null || x !== null && x === g.getRootElement()) && v.select();
          }
        }, fr);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const p = g.parseEditorState(h);
            g.setEditorState(p, fr);
            break;
          }
          case "object":
            g.setEditorState(h, fr);
            break;
          case "function":
            g.update(() => {
              ne().isEmpty() && h(g);
            }, fr);
        }
      }
    }(w, s), [w, d];
  }, []);
  return el(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(mn.Provider, { value: r, children: e });
}
const al = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : W;
function ol({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = Yt();
  return al(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: c, prevEditorState: s, tags: l }) => {
      e && i.size === 0 && c.size === 0 || t && l.has(Na) || s.isEmpty() || r(n, o, l);
    });
  }, [o, t, e, r]), null;
}
const Ma = {
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
}, $a = [
  sc,
  jo,
  Bo,
  cc
], nl = Or(null), Hr = {
  didCatch: !1,
  error: null
};
class il extends hs {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Hr;
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
      for (var r, o, n = arguments.length, i = new Array(n), c = 0; c < n; c++)
        i[c] = arguments[c];
      (r = (o = this.props).onReset) === null || r === void 0 || r.call(o, {
        args: i,
        reason: "imperative-api"
      }), this.setState(Hr);
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
    if (o && r.error !== null && sl(e.resetKeys, n)) {
      var i, c;
      (i = (c = this.props).onReset) === null || i === void 0 || i.call(c, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Hr);
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
      error: c
    } = this.state;
    let s = e;
    if (i) {
      const l = {
        error: c,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        s = r(l);
      else if (o)
        s = Za(o, l);
      else if (n !== void 0)
        s = n;
      else
        throw c;
    }
    return Za(nl.Provider, {
      value: {
        didCatch: i,
        error: c,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, s);
  }
}
function sl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function cl({ children: t, onError: e }) {
  return a(il, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ll = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : W;
function dl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function wl() {
  return function(t) {
    const [e] = Yt(), r = P(() => t(e), [e, t]), [o, n] = R(() => r.initialValueFn()), i = Y(o);
    return ll(() => {
      const { initialValueFn: c, subscribe: s } = r, l = c();
      return i.current !== l && (i.current = l, n(l)), s((d) => {
        i.current = d, n(d);
      });
    }, [r, t]), o;
  }(dl);
}
function ul(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), c = Array.from(e.getClientRects());
  let s, l = c.length;
  c.sort((d, w) => {
    const g = d.top - w.top;
    return Math.abs(g) <= 3 ? d.left - w.left : g;
  });
  for (let d = 0; d < l; d++) {
    const w = c[d], g = s && s.top <= w.top && s.top + s.height > w.top && s.left + s.width > w.left, h = w.width + i === o.width;
    g || h ? (c.splice(d--, 1), l--) : s = w;
  }
  return c;
}
function pl(t, e, r = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ms(e) && o !== null) {
    const [n, i] = o, c = t.isBackward(), s = n.getNode(), l = i.getNode(), d = e.is(s), w = e.is(l);
    if (d || w) {
      const [g, h] = vs(t), p = s.is(l), v = e.is(c ? l : s), x = e.is(c ? s : l);
      let b, N = 0;
      p ? (N = g > h ? h : g, b = g > h ? g : h) : v ? (N = c ? h : g, b = void 0) : x && (N = 0, b = c ? g : h);
      const y = e.__text.slice(N, b);
      y !== e.__text && (r === "clone" && (e = bs(e)), e.__text = y);
    }
  }
  return e;
}
function zr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const bn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, gl = bn && "documentMode" in document ? document.documentMode : null;
!(!bn || !("InputEvent" in window) || gl) && "getTargetRanges" in new window.InputEvent("input");
function Ut(t) {
  return `${t}px`;
}
const hl = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function fl(t, e, r) {
  let o = null, n = null, i = null, c = [];
  const s = document.createElement("div");
  function l() {
    o === null && zr(182), n === null && zr(183);
    const { left: g, top: h } = n.getBoundingClientRect(), p = ul(t, e);
    var v, x;
    s.isConnected || (x = s, (v = n).insertBefore(x, v.firstChild));
    let b = !1;
    for (let N = 0; N < p.length; N++) {
      const y = p[N], _ = c[N] || document.createElement("div"), k = _.style;
      k.position !== "absolute" && (k.position = "absolute", b = !0);
      const I = Ut(y.left - g);
      k.left !== I && (k.left = I, b = !0);
      const $ = Ut(y.top - h);
      k.top !== $ && (_.style.top = $, b = !0);
      const A = Ut(y.width);
      k.width !== A && (_.style.width = A, b = !0);
      const C = Ut(y.height);
      k.height !== C && (_.style.height = C, b = !0), _.parentNode !== s && (s.append(_), b = !0), c[N] = _;
    }
    for (; c.length > p.length; ) c.pop();
    b && r(c);
  }
  function d() {
    n = null, o = null, i !== null && i.disconnect(), i = null, s.remove();
    for (const g of c) g.remove();
    c = [];
  }
  s.style.position = "relative";
  const w = t.registerRootListener(function g() {
    const h = t.getRootElement();
    if (h === null) return d();
    const p = h.parentElement;
    if (!qo(p)) return d();
    d(), o = h, n = p, i = new MutationObserver((v) => {
      const x = t.getRootElement(), b = x && x.parentElement;
      if (x !== o || b !== n) return g();
      for (const N of v) if (!s.contains(N.target)) return l();
    }), i.observe(p, hl), l();
  });
  return () => {
    w(), d();
  };
}
function io(t, e, r) {
  if (t.type !== "text" && ae(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [Ds(r) || r, t.offset];
}
function ml(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== Ut(-1.5) && (r.marginTop = Ut(-1.5)), r.paddingTop !== Ut(4) && (r.paddingTop = Ut(4)), r.paddingBottom !== Ut(0) && (r.paddingBottom = Ut(0));
  }
}
function vl(t, e = ml) {
  let r = null, o = null, n = null, i = null, c = null, s = null, l = () => {
  };
  function d(w) {
    w.read(() => {
      const g = St();
      if (!qt(g)) return r = null, n = null, i = null, s = null, l(), void (l = () => {
      });
      const [h, p] = function(C) {
        const T = C.getStartEndPoints();
        return C.isBackward() ? [T[1], T[0]] : T;
      }(g), v = h.getNode(), x = v.getKey(), b = h.offset, N = p.getNode(), y = N.getKey(), _ = p.offset, k = t.getElementByKey(x), I = t.getElementByKey(y), $ = r === null || k !== o || b !== n || x !== r.getKey(), A = i === null || I !== c || _ !== s || y !== i.getKey();
      if (($ || A) && k !== null && I !== null) {
        const C = function(T, E, O, V, G, M, H) {
          const S = (T._window ? T._window.document : document).createRange();
          return S.setStart(...io(E, O, V)), S.setEnd(...io(G, M, H)), S;
        }(t, h, v, k, p, N, I);
        l(), l = fl(t, C, e);
      }
      r = v, o = k, n = b, i = N, c = I, s = _;
    });
  }
  return d(t.getEditorState()), ie(t.registerUpdateListener(({ editorState: w }) => d(w)), () => {
    l();
  });
}
function bl(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, c = t.getRootElement();
    i !== null && c !== null && c.contains(i) ? r !== null && (r(), r = null) : r === null && (r = vl(t, e));
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
function xl(t) {
  const e = Ko(t, (r) => ae(r) && !r.isInline());
  return ae(e) || zr(4, t.__key), e;
}
function yl(t) {
  const e = St() || xs();
  let r;
  if (qt(e)) r = ys(e.focus, "next");
  else {
    if (e != null) {
      const c = e.getNodes(), s = c[c.length - 1];
      s && (r = Uo(s, "next"));
    }
    r = r || ks(ne(), "previous").getFlipped().insert(He());
  }
  const o = kl(t, r), n = _s(o), i = Ns(n) ? Cs(n) : o;
  return Es(zs(i)), t.getLatest();
}
function kl(t, e, r) {
  let o = Qa(e, "next");
  for (let n = o; n; n = Ts(n, r)) o = n;
  return Ss(o) && zr(283), o.insert(t.isInline() ? He().append(t) : t), Qa(Uo(t.getLatest(), "next"), e.direction);
}
function _l(t) {
  const e = St();
  if (!qt(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], c = i.getKey();
    if (r.has(c)) continue;
    const s = Ko(i, (d) => ae(d) && !d.isInline());
    if (s === null) continue;
    const l = s.getKey();
    s.canIndent() && !r.has(l) && (r.add(l), t(s));
  }
  return r.size > 0;
}
const Nl = Symbol.for("preact-signals");
function Pr() {
  if (oe > 1) return void oe--;
  let t, e = !1;
  for (!function() {
    let r = Tr;
    for (Tr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); rr !== void 0; ) {
    let r = rr;
    for (rr = void 0, Sr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && xn(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Sr = 0, oe--, e) throw t;
}
function Cl(t) {
  if (oe > 0) return t();
  ha = ++El, oe++;
  try {
    return t();
  } finally {
    Pr();
  }
}
let Q, rr;
function so(t) {
  const e = Q;
  Q = void 0;
  try {
    return t();
  } finally {
    Q = e;
  }
}
let Tr, oe = 0, Sr = 0, El = 0, ha = 0, yr = 0;
function co(t) {
  if (Q === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== Q ? (e = { i: 0, S: t, p: Q.s, n: void 0, t: Q, e: void 0, x: void 0, r: e }, Q.s !== void 0 && (Q.s.n = e), Q.s = e, t.n = e, 32 & Q.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = Q.s, e.n = void 0, Q.s.n = e, Q.s = e), e) : void 0;
}
function yt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function or(t, e) {
  return new yt(t, e);
}
function xn(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function lo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function yn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function _e(t, e) {
  yt.call(this, void 0), this.x = t, this.s = void 0, this.g = yr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function zl(t, e) {
  return new _e(t, e);
}
function kn(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    oe++;
    const r = Q;
    Q = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Aa(t), o;
    } finally {
      Q = r, Pr();
    }
  }
}
function Aa(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, kn(t);
}
function Tl(t) {
  if (Q !== this) throw new Error("Out-of-order effect");
  yn(this), Q = t, this.f &= -2, 8 & this.f && Aa(this), Pr();
}
function Ie(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Gt(t, e) {
  const r = new Ie(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function Ye(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = or(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
yt.prototype.brand = Nl, yt.prototype.h = function() {
  return !0;
}, yt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : so(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, yt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && so(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, yt.prototype.subscribe = function(t) {
  return Gt(() => {
    const e = this.value, r = Q;
    Q = void 0;
    try {
      t(e);
    } finally {
      Q = r;
    }
  }, { name: "sub" });
}, yt.prototype.valueOf = function() {
  return this.value;
}, yt.prototype.toString = function() {
  return this.value + "";
}, yt.prototype.toJSON = function() {
  return this.value;
}, yt.prototype.peek = function() {
  const t = Q;
  Q = void 0;
  try {
    return this.value;
  } finally {
    Q = t;
  }
}, Object.defineProperty(yt.prototype, "value", { get() {
  const t = co(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Sr > 100) throw new Error("Cycle detected");
    (function(e) {
      oe !== 0 && Sr === 0 && e.l !== ha && (e.l = ha, Tr = { S: e, v: e.v, i: e.i, o: Tr });
    })(this), this.v = t, this.i++, yr++, oe++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Pr();
    }
  }
} }), _e.prototype = new yt(), _e.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === yr)) return !0;
  if (this.g = yr, this.f |= 1, this.i > 0 && !xn(this)) return this.f &= -2, !0;
  const t = Q;
  try {
    lo(this), Q = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return Q = t, yn(this), this.f &= -2, !0;
}, _e.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  yt.prototype.S.call(this, t);
}, _e.prototype.U = function(t) {
  if (this.t !== void 0 && (yt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, _e.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(_e.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = co(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ie.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, Ie.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, kn(this), lo(this), oe++;
  const t = Q;
  return Q = this, Tl.bind(this, t);
}, Ie.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = rr, rr = this);
}, Ie.prototype.d = function() {
  this.f |= 8, 1 & this.f || Aa(this);
}, Ie.prototype.dispose = function() {
  this.d();
};
Ot({ build: (t, e, r) => Ye(e), config: Se({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return Gt(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function _n() {
  const t = ne(), e = St(), r = He();
  t.clear(), t.append(r), e !== null && r.select(), qt(e) && (e.format = 0);
}
function Nn(t, e = _n) {
  return t.registerCommand(Go, (r) => (t.update(e), !0), Ca);
}
Ot({ build: (t, e, r) => Ye(e), config: Se({ $onClear: _n }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return Gt(() => Nn(t, o.value));
} });
function Sl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Wr = Ms("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Cn extends ca {
  $config() {
    return this.config("decorator-text", { extends: ca, stateConfigs: [{ flat: !0, stateConfig: Wr }] });
  }
  getFormat() {
    return Ks(this, Wr);
  }
  getFormatFlags(e, r) {
    return to(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = qs[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Gs(this, Wr, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = to(r, e, null);
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
function Dl(t) {
  return t instanceof Cn;
}
Ot({ name: "@lexical/extension/DecoratorText", nodes: () => [Cn], register: (t, e, r) => t.registerCommand(Ho, (o) => {
  const n = St();
  if (Wo(n) || qt(n)) for (const i of n.getNodes()) Dl(i) && i.toggleFormat(o);
  return !1;
}, Yo) });
function En(t, e) {
  let r;
  return or(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const fa = Ot({ build: (t) => En(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function rt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function zn(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = zn(r[n], o[n]);
    return t;
  }
  return e;
}
const Oa = 0, ma = 1, Tn = 2, Yr = 3, mr = 4, Oe = 5, Xr = 6, Je = 7;
function Jr(t) {
  return t.id === Oa;
}
function Sn(t) {
  return t.id === Tn;
}
function Rl(t) {
  return function(e) {
    return e.id === ma;
  }(t) || rt(305, String(t.id), String(ma)), Object.assign(t, { id: Tn });
}
const Ml = /* @__PURE__ */ new Set();
class $l {
  constructor(e, r) {
    xt(this, "builder");
    xt(this, "configs");
    xt(this, "_dependency");
    xt(this, "_peerNameSet");
    xt(this, "extension");
    xt(this, "state");
    xt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Oa };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Rs;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    Sn(r) || rt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(s, l, d) {
      return Object.assign(s, { config: l, id: Yr, registerState: d });
    }(r, this.mergeConfigs(), o);
    let c;
    this.state = i, this.extension.init && (c = this.extension.init(e, i.config, o)), this.state = function(s, l, d) {
      return Object.assign(s, { id: mr, initResult: l, registerState: d });
    }(i, c, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== mr && rt(307, String(r.id), String(Oe)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, c, s) {
      return Object.assign(i, { id: Oe, output: c, registerState: s });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Oe && rt(308, String(o.id), String(Oe));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Xr });
    }(o), () => {
      const i = this.state;
      i.id !== Je && rt(309, String(o.id), String(Je)), this.state = function(c) {
        return Object.assign(c, { id: Oe });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Xr && rt(310, String(r.id), String(Xr)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: Je });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && rt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && rt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= mr;
    }(e) || rt(313, String(e.id), String(mr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Yr;
    }(e) || rt(314, String(e.id), String(Yr)), { config: e.config };
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
      return r.id >= Je;
    }(e) || rt(316, String(e.id), String(Je)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Ml;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= Oe;
      })(e) || rt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const wo = { tag: Na };
function Al() {
  const t = ne();
  t.isEmpty() && t.append(He());
}
const Ol = Ot({ config: Se({ setOptions: wo, updateOptions: wo }), init: ({ $initialEditorState: t = Al }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Is(i)) t.setEditorState(i, r);
    else if (typeof i == "function") t.update(() => {
      i(t);
    }, e);
    else if (i && (typeof i == "string" || typeof i == "object")) {
      const c = t.parseEditorState(i);
      t.setEditorState(c, r);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [$s, Bo, As, Os, jo] }), uo = Symbol.for("@lexical/extension/LexicalBuilder");
function po() {
}
function Il(t) {
  throw t;
}
function vr(t) {
  return Array.isArray(t) ? t : [t];
}
const Zr = "0.43.0+prod.esm";
class Ve {
  constructor(e) {
    xt(this, "roots");
    xt(this, "extensionNameMap");
    xt(this, "outgoingConfigEdges");
    xt(this, "incomingEdges");
    xt(this, "conflicts");
    xt(this, "_sortedExtensionReps");
    xt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Zr, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [vr(Ol)];
    for (const o of e) r.push(vr(o));
    return new Ve(r);
  }
  static maybeFromEditor(e) {
    const r = e[uo];
    return r && (r.PACKAGE_VERSION !== Zr && rt(292, r.PACKAGE_VERSION, Zr), r instanceof Ve || rt(293)), r;
  }
  static fromEditor(e) {
    const r = Ve.maybeFromEditor(e);
    return r === void 0 && rt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(Fo({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [uo]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = po;
    function r() {
      try {
        e();
      } finally {
        e = po;
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
    if (r) return r.extension !== e && rt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && rt(296);
    const r = vr(e), [o] = r;
    typeof o.name != "string" && rt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && rt(298, o.name), !n) {
      n = new $l(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && rt(299, o.name, i);
      for (const c of o.conflictsWith || []) this.extensionNameMap.has(c) && rt(299, o.name, c), this.conflicts.set(c, o.name);
      for (const c of o.dependencies || []) {
        const s = vr(c);
        this.addEdge(o.name, s[0].name, s.slice(1)), this.addExtension(s);
      }
      for (const [c, s] of o.peerDependencies || []) this.addEdge(o.name, c, s ? [s] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (Sn(i)) return;
      const c = o.extension.name;
      var s;
      Jr(i) || rt(300, c, n || "[unknown]"), Jr(s = i) || rt(304, String(s.id), String(Oa)), i = Object.assign(s, { id: ma }), o.state = i;
      const l = this.outgoingConfigEdges.get(c);
      if (l) for (const d of l.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, c);
      }
      i = Rl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Jr(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const c = this.extensionNameMap.get(n);
      if (c) for (const s of i) c.configs.add(s);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && rt(301, o.name);
      for (const c of n) i.configs.add(c);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), n = [() => o.abort()], i = o.signal;
    for (const c of r) {
      const s = c.register(e, i);
      s && n.push(s);
    }
    for (const c of r) {
      const s = c.afterRegistration(e);
      s && n.push(s);
    }
    return ie(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, c = {}, s = this.sortedExtensionReps();
    for (const w of s) {
      const { extension: g } = w;
      if (g.onError !== void 0 && (e.onError = g.onError), g.disableEvents !== void 0 && (e.disableEvents = g.disableEvents), g.parentEditor !== void 0 && (e.parentEditor = g.parentEditor), g.editable !== void 0 && (e.editable = g.editable), g.namespace !== void 0 && (e.namespace = g.namespace), g.$initialEditorState !== void 0 && (e.$initialEditorState = g.$initialEditorState), g.nodes) for (const h of Sl(g)) {
        if (typeof h != "function") {
          const p = o.get(h.replace);
          p && rt(302, g.name, h.replace.name, p.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (g.html) {
        if (g.html.export) for (const [h, p] of g.html.export.entries()) n.set(h, p);
        g.html.import && Object.assign(i, g.html.import);
      }
      g.theme && zn(c, g.theme);
    }
    Object.keys(c).length > 0 && (e.theme = c), r.size && (e.nodes = [...r]);
    const l = Object.keys(i).length > 0, d = n.size > 0;
    (l || d) && (e.html = {}, l && (e.html.import = i), d && (e.html.export = n));
    for (const w of s) w.init(e);
    return e.onError || (e.onError = Il), e;
  }
}
const Pl = /* @__PURE__ */ new Set(), go = Ot({ build(t, e, r) {
  const o = r.getDependency(fa).output, n = or({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = En(() => {
  }, () => Gt(() => {
    const c = i.peek(), { watchedNodeKeys: s } = n.value;
    let l, d = !1;
    o.value.read(() => {
      if (St()) for (const [w, g] of s.entries()) {
        if (g.size === 0) {
          s.delete(w);
          continue;
        }
        const h = Ws(w), p = h && h.isSelected() || !1;
        d = d || p !== (!!c && c.has(w)), p && (l = l || /* @__PURE__ */ new Set(), l.add(w));
      }
    }), !d && l && c && l.size === c.size || (i.value = l);
  }));
  return { watchNodeKey: function(c) {
    const s = zl(() => (i.value || Pl).has(c)), { watchedNodeKeys: l } = n.peek();
    let d = l.get(c);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(s), w || (l.set(c, d), n.value = { watchedNodeKeys: l }), s;
  } };
}, dependencies: [fa], name: "@lexical/extension/NodeSelection" }), Ll = Ps("INSERT_HORIZONTAL_RULE_COMMAND");
class Fe extends ca {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Fe(e.__key);
  }
  static importJSON(e) {
    return Ia().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Vl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return Xo(r, e.theme.hr), r;
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
function Vl() {
  return { node: Ia() };
}
function Ia() {
  return Hs(Fe);
}
function Fl(t) {
  return t instanceof Fe;
}
Ot({ dependencies: [fa, go], name: "@lexical/extension/HorizontalRule", nodes: () => [Fe], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(go).output, n = or({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ie(t.registerCommand(Ll, (c) => {
    const s = St();
    if (!qt(s)) return !1;
    if (s.focus.getNode() !== null) {
      const l = Ia();
      yl(l);
    }
    return !0;
  }, Ca), t.registerCommand(Ls, (c) => {
    if (Vs(c.target)) {
      const s = Fs(c.target);
      if (Fl(s)) return function(l, d = !1) {
        const w = St(), g = l.isSelected(), h = l.getKey();
        let p;
        d && Wo(w) ? p = w : (p = js(), Bs(p)), g ? p.delete(h) : p.add(h);
      }(s, c.shiftKey), !0;
    }
    return !1;
  }, Yo), t.registerMutationListener(Fe, (c, s) => {
    Cl(() => {
      let l = !1;
      const { nodeSelections: d } = n.peek();
      for (const [w, g] of c.entries()) if (g === "destroyed") d.delete(w), l = !0;
      else {
        const h = d.get(w), p = t.getElementByKey(w);
        h ? h.domNode.value = p : (l = !0, d.set(w, { domNode: or(p), selectedSignal: o(w) }));
      }
      l && (n.value = { nodeSelections: d });
    });
  }), Gt(() => {
    const c = [];
    for (const { domNode: s, selectedSignal: l } of n.value.nodeSelections.values()) c.push(Gt(() => {
      const d = s.value;
      d && (l.value ? Xo(d, i) : Ys(d, i));
    }));
    return ie(...c);
  }));
} });
Ot({ build: (t, e) => Ye({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Se({ $getParentEditor: function() {
  const t = Us();
  return Ve.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => Gt(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
Ot({ build: (t, e, r) => Ye(e), config: Se({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return Gt(() => {
    if (!o.disabled.value) return bl(t, o.onReposition.value);
  });
} });
function Dn(t) {
  return t.canBeEmpty();
}
function jl(t, e, r = Dn) {
  return ie(t.registerCommand(Xs, (o) => {
    const n = St();
    if (!qt(n)) return !1;
    o.preventDefault();
    const i = function(c) {
      if (c.getNodes().filter((h) => Nr(h) && h.canIndent()).length > 0) return !0;
      const s = c.anchor, l = c.focus, d = l.isBefore(s) ? l : s, w = d.getNode(), g = xl(w);
      if (g.canIndent()) {
        const h = g.getKey();
        let p = Js();
        if (p.anchor.set(h, 0, "element"), p.focus.set(h, 0, "element"), p = Zs(p), p.anchor.is(d)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Qs : eo : tc;
    return t.dispatchCommand(i, void 0);
  }, Ca), t.registerCommand(eo, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = St();
    if (!qt(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return _l((c) => {
      if (i(c)) {
        const s = c.getIndent() + 1;
        (!o || s < o) && c.setIndent(s);
      }
    });
  }, Ea));
}
Ot({ build: (t, e, r) => Ye(e), config: Se({ $canIndent: Dn, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return Gt(() => {
    if (!o.value) return jl(t, n, i);
  });
} });
const Bl = Ot({ name: "@lexical/react/ReactProvider" });
function Ul() {
  return ne().getTextContent();
}
function Kl(t, e = !0) {
  if (t) return !1;
  let r = Ul();
  return e && (r = r.trim()), r === "";
}
function ql(t) {
  if (!Kl(t, !1)) return !1;
  const e = ne().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (ec(n)) return !1;
    if (ae(n)) {
      if (!rc(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), c = i.length;
      for (let s = 0; s < c; s++) {
        const l = i[o];
        if (!Cr(l)) return !1;
      }
    }
  }
  return !0;
}
function Rn(t) {
  return () => ql(t);
}
function Mn(t) {
  const e = window.location.origin, r = (o) => {
    if (o.origin !== e) return;
    const n = t.getRootElement();
    if (document.activeElement !== n) return;
    const i = o.data;
    if (typeof i == "string") {
      let c;
      try {
        c = JSON.parse(i);
      } catch {
        return;
      }
      if (c && c.protocol === "nuanria_messaging" && c.type === "request") {
        const s = c.payload;
        if (s && s.functionId === "makeChanges") {
          const l = s.args;
          if (l) {
            const [d, w, g, h, p] = l;
            t.update(() => {
              const v = St();
              if (qt(v)) {
                const x = v.anchor;
                let b = x.getNode(), N = 0, y = 0;
                if (Cr(b) && d >= 0 && w >= 0 && (N = d, y = d + w, v.setTextNodeRange(b, N, b, y)), N === y && g === "" || (v.insertRawText(g), b = x.getNode()), Cr(b)) {
                  N = h, y = h + p;
                  const _ = b.getTextContentSize();
                  N = N > _ ? _ : N, y = y > _ ? _ : y, v.setTextNodeRange(b, N, b, y);
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
Ot({ build: (t, e, r) => Ye(e), config: Se({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => Gt(() => r.getOutput().disabled.value ? void 0 : Mn(t)) });
function Gl(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Pa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : W;
function Hl({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = R(() => r.getDecorators());
    return Pa(() => r.registerDecoratorListener((c) => {
      dc(() => {
        i(c);
      });
    }), [r]), W(() => {
      i(r.getDecorators());
    }, [r]), P(() => {
      const c = [], s = Object.keys(n);
      for (let l = 0; l < s.length; l++) {
        const d = s[l], w = a(o, { onError: (h) => r._onError(h), children: a(fs, { fallback: null, children: n[d] }) }), g = r.getElementByKey(d);
        g !== null && c.push(wc(w, g, d));
      }
      return c;
    }, [o, n, r]);
  }(t, e);
}
function Wl({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = Ve.maybeFromEditor(r);
    if (o && o.hasExtensionByName(Bl.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && Gl(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(Hl, { editor: t, ErrorBoundary: e });
}
function ho(t) {
  return t.getEditorState().read(Rn(t.isComposing()));
}
function Yl({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = Yt();
  return function(n) {
    Pa(() => ie(lc(n), Mn(n)), [n]);
  }(o), u(ot, { children: [t, a(Xl, { content: e }), a(Wl, { editor: o, ErrorBoundary: r })] });
}
function Xl({ content: t }) {
  const [e] = Yt(), r = function(n) {
    const [i, c] = R(() => ho(n));
    return Pa(() => {
      function s() {
        const l = ho(n);
        c(l);
      }
      return s(), ie(n.registerUpdateListener(() => {
        s();
      }), n.registerEditableListener(() => {
        s();
      }));
    }, [n]), i;
  }(e), o = wl();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function Jl({ defaultSelection: t }) {
  const [e] = Yt();
  return W(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Zl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : W;
function Ql({ onClear: t }) {
  const [e] = Yt();
  return Zl(() => Nn(e, t), [e, t]), null;
}
const $n = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Dt : W;
function td({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: c, ariaInvalid: s, ariaLabel: l, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: g, ariaRequired: h, autoCapitalize: p, className: v, id: x, role: b = "textbox", spellCheck: N = !0, style: y, tabIndex: _, "data-testid": k, ...I }, $) {
  const [A, C] = R(t.isEditable()), T = B((O) => {
    O && O.ownerDocument && O.ownerDocument.defaultView ? t.setRootElement(O) : t.setRootElement(null);
  }, [t]), E = P(() => /* @__PURE__ */ function(...O) {
    return (V) => {
      for (const G of O) typeof G == "function" ? G(V) : G != null && (G.current = V);
    };
  }($, T), [T, $]);
  return $n(() => (C(t.isEditable()), t.registerEditableListener((O) => {
    C(O);
  })), [t]), a("div", { "aria-activedescendant": A ? e : void 0, "aria-autocomplete": A ? r : "none", "aria-controls": A ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": A && b === "combobox" ? !!c : void 0, ...s != null ? { "aria-invalid": s } : {}, "aria-label": l, "aria-labelledby": d, "aria-multiline": w, "aria-owns": A ? g : void 0, "aria-readonly": !A || void 0, "aria-required": h, autoCapitalize: p, className: v, contentEditable: A, "data-testid": k, id: x, ref: E, role: b, spellCheck: N, style: y, tabIndex: _, ...I });
}
const ed = cr(td);
function fo(t) {
  return t.getEditorState().read(Rn(t.isComposing()));
}
const rd = cr(ad);
function ad(t, e) {
  const { placeholder: r, ...o } = t, [n] = Yt();
  return u(ot, { children: [a(ed, { editor: n, ...o, ref: e }), r != null && a(od, { editor: n, content: r })] });
}
function od({ content: t, editor: e }) {
  const r = function(c) {
    const [s, l] = R(() => fo(c));
    return $n(() => {
      function d() {
        const w = fo(c);
        l(w);
      }
      return d(), ie(c.registerUpdateListener(() => {
        d();
      }), c.registerEditableListener(() => {
        d();
      }));
    }, [c]), s;
  }(e), [o, n] = R(e.isEditable());
  if (Dt(() => (n(e.isEditable()), e.registerEditableListener((c) => {
    n(c);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function nd({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    rd,
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
const An = Or(void 0);
function id({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const c = P(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(An.Provider, { value: c, children: i });
}
function On() {
  const t = ka(An);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function sd() {
  const [t, e] = R(void 0), r = B(() => {
    e(void 0);
  }, []), o = P(() => {
    if (t === void 0)
      return;
    const { title: i, content: c } = t;
    return /* @__PURE__ */ a(Sc, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Mc, { children: [
      /* @__PURE__ */ a(cn, { children: /* @__PURE__ */ a(ln, { children: i }) }),
      c
    ] }) });
  }, [t, r]), n = B(
    (i, c, s = !1) => {
      e({
        closeOnClickOutside: s,
        content: c(r),
        title: i
      });
    },
    [r]
  );
  return [o, n];
}
function cd({
  children: t
}) {
  const [e] = Yt(), [r, o] = R(e), [n, i] = R("paragraph"), [c, s] = sd(), l = () => {
  };
  return W(() => r.registerCommand(
    Jo,
    (d, w) => (o(w), !1),
    Ea
  ), [r]), /* @__PURE__ */ u(
    id,
    {
      activeEditor: r,
      $updateToolbar: l,
      blockType: n,
      setBlockType: i,
      showModal: s,
      children: [
        c,
        t({ blockType: n })
      ]
    }
  );
}
function ld(t) {
  const [e] = Yt(), { activeEditor: r } = On();
  W(() => r.registerCommand(
    Jo,
    () => {
      const o = St();
      return o && t(o), !1;
    },
    Ea
  ), [e, t]), W(() => {
    r.getEditorState().read(() => {
      const o = St();
      o && t(o);
    });
  }, [r, t]);
}
const dd = Wt(
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
), In = at.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Pn({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...c
}) {
  const s = it();
  return /* @__PURE__ */ a(
    Ro.Root,
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
      dir: s,
      ...c,
      children: /* @__PURE__ */ a(
        In.Provider,
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
function kr({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = at.useContext(In);
  return /* @__PURE__ */ a(
    Ro.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: f(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        dd({
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
const mo = [
  { format: "bold", icon: Ii, label: "Bold" },
  { format: "italic", icon: Pi, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function wd() {
  const { activeEditor: t } = On(), [e, r] = R([]), o = B((n) => {
    if (qt(n) || uc(n)) {
      const i = [];
      mo.forEach(({ format: c }) => {
        n.hasFormat(c) && i.push(c);
      }), r((c) => c.length !== i.length || !i.every((s) => c.includes(s)) ? i : c);
    }
  }, []);
  return ld(o), /* @__PURE__ */ a(
    Pn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: mo.map(({ format: n, icon: i, label: c }) => /* @__PURE__ */ a(
        kr,
        {
          value: n,
          "aria-label": c,
          onClick: () => {
            t.dispatchCommand(Ho, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function ud({ onClear: t }) {
  const [e] = Yt();
  W(() => {
    t && t(() => {
      e.dispatchCommand(Go, void 0);
    });
  }, [e, t]);
}
function pd({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = R(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(cd, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(wd, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        Yl,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(nd, { placeholder: t }) }),
          ErrorBoundary: cl
        }
      ),
      e && /* @__PURE__ */ a(Jl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(ud, { onClear: r }),
      /* @__PURE__ */ a(Ql, {})
    ] })
  ] });
}
const gd = {
  namespace: "commentEditor",
  theme: Ma,
  nodes: $a,
  onError: (t) => {
    console.error(t);
  }
};
function Dr({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: i = !1,
  onClear: c,
  className: s
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          s
        ),
        children: /* @__PURE__ */ a(
          rl,
          {
            initialConfig: {
              ...gd,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(_t, { children: [
              /* @__PURE__ */ a(pd, { placeholder: n, autoFocus: i, onClear: c }),
              /* @__PURE__ */ a(
                ol,
                {
                  ignoreSelectionChange: !0,
                  onChange: (l) => {
                    r == null || r(l), o == null || o(l.toJSON());
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
function hd(t, e) {
  const r = oc(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const n = [];
  for (const i of r) if (!Vn.has(i.nodeName)) {
    const c = Fn(i, t, n, !1);
    c !== null && (o = o.concat(c));
  }
  return function(i) {
    for (const c of i) c.getNextSibling() instanceof Zo && c.insertAfter(Qo());
    for (const c of i) {
      const s = c.getChildren();
      for (const l of s) c.insertBefore(l);
      c.remove();
    }
  }(n), o;
}
function fd(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), o = ne().getChildren();
  for (let n = 0; n < o.length; n++)
    Ln(t, o[n], r, e);
  return r.innerHTML;
}
function Ln(t, e, r, o = null) {
  let n = o === null || e.isSelected(o);
  const i = ae(e) && e.excludeFromCopy("html");
  let c = e;
  o !== null && Cr(e) && (c = pl(o, e, "clone"));
  const s = ae(c) ? c.getChildren() : [], l = ac(t, c.getType());
  let d;
  d = l && l.exportDOM !== void 0 ? l.exportDOM(t, c) : c.exportDOM(t);
  const { element: w, after: g } = d;
  if (!w) return !1;
  const h = document.createDocumentFragment();
  for (let p = 0; p < s.length; p++) {
    const v = s[p], x = Ln(t, v, h, o);
    !n && ae(e) && x && e.extractWithChild(v, o, "html") && (n = !0);
  }
  if (n && !i) {
    if ((qo(w) || ro(w)) && w.append(h), r.append(w), g) {
      const p = g.call(c, w);
      p && (ro(w) ? w.replaceChildren(p) : w.replaceWith(p));
    }
  } else r.append(h);
  return n;
}
const Vn = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Fn(t, e, r, o, n = /* @__PURE__ */ new Map(), i) {
  let c = [];
  if (Vn.has(t.nodeName)) return c;
  let s = null;
  const l = function(v, x) {
    const { nodeName: b } = v, N = x._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (N !== void 0) for (const _ of N) {
      const k = _(v);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(t, e), d = l ? l(t) : null;
  let w = null;
  if (d !== null) {
    w = d.after;
    const v = d.node;
    if (s = Array.isArray(v) ? v[v.length - 1] : v, s !== null) {
      for (const [, x] of n) if (s = x(s, i), !s) break;
      s && c.push(...Array.isArray(v) ? v : [s]);
    }
    d.forChild != null && n.set(t.nodeName, d.forChild);
  }
  const g = t.childNodes;
  let h = [];
  const p = (s == null || !nc(s)) && (s != null && Nr(s) || o);
  for (let v = 0; v < g.length; v++) h.push(...Fn(g[v], e, r, p, new Map(n), s));
  return w != null && (h = w(h)), ao(t) && (h = md(t, h, p ? () => {
    const v = new Zo();
    return r.push(v), v;
  } : He)), s == null ? h.length > 0 ? c = c.concat(h) : ao(t) && function(v) {
    return v.nextSibling == null || v.previousSibling == null ? !1 : oo(v.nextSibling) && oo(v.previousSibling);
  }(t) && (c = c.concat(Qo())) : ae(s) && s.append(...h), c;
}
function md(t, e, r) {
  const o = t.style.textAlign, n = [];
  let i = [];
  for (let c = 0; c < e.length; c++) {
    const s = e[c];
    if (Nr(s)) o && !s.getFormat() && s.setFormat(o), n.push(s);
    else if (i.push(s), c === e.length - 1 || c < e.length - 1 && Nr(e[c + 1])) {
      const l = r();
      l.setFormat(o), l.append(...i), n.push(l), i = [];
    }
  }
  return n;
}
function jn(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function Bn(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Bn(e.children)
  ) : !1;
}
function At(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Bn(t.root.children) : !1;
}
function vd(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = tn({
    namespace: "EditorUtils",
    theme: Ma,
    nodes: $a,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = hd(e, n);
      ne().clear(), ic(i);
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
function Rr(t) {
  const e = tn({
    namespace: "EditorUtils",
    theme: Ma,
    nodes: $a,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = fd(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function La(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function je({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ a(
    pi.Root,
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
const bd = Wt(
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
function Va({
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
        bd({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Bu({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? fe.Root : "div";
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
function Un({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ a(
    je,
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
const Kn = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), vo = (t, e) => t[e] ?? e;
function qn({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const c = vo(o, "%cancelButton_tooltip%"), s = i ?? vo(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Va, { children: [
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
        j,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(Ar, {})
        }
      ) }),
      /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) }),
    /* @__PURE__ */ a(Un, {}),
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
        j,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(ir, {})
        }
      ) }),
      /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) })
  ] });
}
function _r(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Fa(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const xd = {
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
function Qr(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Uu({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, c] = R(xd), [s, l] = R(n), [d, w] = R(!1), g = Y(void 0), h = Y(null);
  W(() => {
    let b = !0;
    const N = h.current;
    if (!N) return;
    const y = setTimeout(() => {
      b && jn(N);
    }, 300);
    return () => {
      b = !1, clearTimeout(y);
    };
  }, []);
  const p = B(() => {
    if (!At(i)) return;
    const b = Rr(i);
    e(b, s);
  }, [i, e, s]), v = o["%commentEditor_placeholder%"] ?? "Type your comment here...", x = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: x }),
      /* @__PURE__ */ a(
        qn,
        {
          onCancelClick: r,
          onAcceptClick: p,
          canAccept: At(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(be, { open: d, onOpenChange: w, children: [
      /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ u(
        j,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a($o, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Qr(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        xe,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (b) => {
            b.key === "Escape" && (b.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(De, { children: /* @__PURE__ */ a(Re, { children: t.map((b) => /* @__PURE__ */ a(
            ve,
            {
              onSelect: () => {
                l(b || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Qr(b, o) })
            },
            b || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ a(
      "div",
      {
        ref: h,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (b) => {
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), r()) : Fa(b) && (b.preventDefault(), b.stopPropagation(), At(i) && p());
        },
        onKeyDown: (b) => {
          La(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Dr,
          {
            editorSerializedState: i,
            onSerializedChange: (b) => c(b),
            placeholder: v,
            onClear: (b) => {
              g.current = b;
            }
          }
        )
      }
    )
  ] });
}
const Ku = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...Kn
]), qu = [
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
], yd = ["input", "select", "textarea", "button"], kd = ["button", "textbox"], _d = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const n = Y(null), [i, c] = R(void 0), [s, l] = R(void 0), d = B(
    (p) => {
      c(p);
      const v = t.find((b) => b.id === p);
      v && (e == null || e(v));
      const x = document.getElementById(p);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), n.current && n.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), w = B(
    (p) => {
      const v = t.find((x) => x.id === p);
      v && (l((x) => x === p ? void 0 : p), r == null || r(v));
    },
    [r, t]
  ), g = (p) => {
    if (!p) return !1;
    const v = p.tagName.toLowerCase();
    if (p.isContentEditable || yd.includes(v)) return !0;
    const x = p.getAttribute("role");
    if (x && kd.includes(x)) return !0;
    const b = p.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, h = B(
    (p) => {
      var A;
      const v = p.target, x = (C) => C ? document.getElementById(C) : void 0, b = x(s), N = x(i);
      if (!!(b && v && b.contains(v) && v !== b) && g(v)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !v.isContentEditable) {
          if (s) {
            p.preventDefault(), p.stopPropagation();
            const C = t.find((T) => T.id === s);
            C && d(C.id);
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
          const T = C.findIndex((O) => O === v);
          if (T === -1) return;
          let E;
          p.key === "ArrowDown" ? E = Math.min(T + 1, C.length - 1) : E = Math.max(T - 1, 0), E !== T && (p.preventDefault(), p.stopPropagation(), (A = C[E]) == null || A.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((C) => C.id === i);
      let I = k;
      switch (p.key) {
        case "ArrowDown":
          I = Math.min(k + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          I = Math.max(k - 1, 0), p.preventDefault();
          break;
        case "Home":
          I = 0, p.preventDefault();
          break;
        case "End":
          I = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          i && w(i), p.preventDefault(), p.stopPropagation();
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
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (g(v) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const $ = t[I];
      $ && d($.id);
    },
    [t, d, i, s, w, o]
  );
  return {
    listboxRef: n,
    activeId: i,
    selectedId: s,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Nd = Wt(
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
function Be({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const n = r ? fe.Root : "span";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Nd({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Cd({
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
function Gu({ className: t, ...e }) {
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
function Hu({ className: t, ...e }) {
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
function Wu({ className: t, ...e }) {
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
function Ed({ className: t, ...e }) {
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
function Yu({ className: t, ...e }) {
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
function zd({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    xa.Root,
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
function Xu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    xa.Image,
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
function Td({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    xa.Fallback,
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
function bo({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: c,
  canEditOrDelete: s = !1
}) {
  const [l, d] = R(!1), [w, g] = R(), h = Y(null);
  W(() => {
    if (!l) return;
    let k = !0;
    const I = h.current;
    if (!I) return;
    const $ = setTimeout(() => {
      k && jn(I);
    }, 300);
    return () => {
      k = !1, clearTimeout($);
    };
  }, [l]);
  const p = B(
    (k) => {
      k && k.stopPropagation(), d(!1), g(void 0), c == null || c(!1);
    },
    [c]
  ), v = B(
    async (k) => {
      if (k && k.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        Rr(w)
      ) && (d(!1), g(void 0), c == null || c(!1));
    },
    [w, n, t.id, c]
  ), x = P(() => {
    const k = new Date(t.date), I = zi(
      k,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), $ = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ee(r["%comment_dateAtTime%"], {
      date: I,
      time: $
    });
  }, [t.date, r]), b = P(() => t.user, [t.user]), N = P(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = P(() => Ti(t.contents), [t.contents]), _ = P(() => {
    if (o && s)
      return /* @__PURE__ */ u(ot, { children: [
        /* @__PURE__ */ u(
          Er,
          {
            onClick: (k) => {
              k.stopPropagation(), d(!0), g(vd(t.contents)), c == null || c(!0);
            },
            children: [
              /* @__PURE__ */ a(Li, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Er,
          {
            onClick: async (k) => {
              k.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(Vi, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    s,
    o,
    r,
    t.contents,
    t.id,
    i,
    c
  ]);
  return /* @__PURE__ */ u(
    "div",
    {
      className: f("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(zd, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Td, { className: "tw:text-xs tw:font-medium", children: N }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: x }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(Be, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              _r(t.assignedUser, r)
            ] })
          ] }),
          l && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (k) => {
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), p()) : Fa(k) && (k.preventDefault(), k.stopPropagation(), At(w) && v());
              },
              onKeyDown: (k) => {
                La(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
              },
              onClick: (k) => {
                k.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  Dr,
                  {
                    className: f(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: w,
                    onSerializedChange: (k) => g(k)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    j,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(Ar, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    j,
                    {
                      size: "icon",
                      onClick: v,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !At(w),
                      children: /* @__PURE__ */ a(Ao, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !l && /* @__PURE__ */ u(ot, { children: [
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
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ u(se, { children: [
          /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ a(j, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Fi, {}) }) }),
          /* @__PURE__ */ a(le, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const xo = {
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
function Sd({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: n,
  assignedUser: i,
  currentUser: c,
  handleSelectThread: s,
  threadId: l,
  thread: d,
  threadStatus: w,
  handleAddCommentToThread: g,
  handleUpdateComment: h,
  handleDeleteComment: p,
  handleReadStatusChange: v,
  assignableUsers: x,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: I = 5,
  onVerseRefClick: $,
  initialAssignedUser: A
}) {
  const [C, T] = R(xo), [E, O] = R(), [V, G] = R(), M = o, [H, S] = R(!1), [U, L] = R(!1), [zt, Rt] = R(!1), [ct, Xt] = R(!1), [K, nt] = R(!1), [et, dt] = R(k), [Tt, Jt] = R(!1), vt = Y(void 0), [Zt, we] = R(/* @__PURE__ */ new Map());
  W(() => {
    let z = !0;
    return (async () => {
      const pt = y ? await y(l) : !1;
      z && nt(pt);
    })(), () => {
      z = !1;
    };
  }, [l, y]), W(() => {
    let z = !0;
    if (!o) {
      Xt(!1), we(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = N ? await N(l) : !1;
      z && Xt(pt);
    })(), () => {
      z = !1;
    };
  }, [o, l, N]);
  const bt = Y("idle");
  W(() => {
    if (!o) {
      bt.current !== "idle" && (O(void 0), G(void 0), bt.current = "idle");
      return;
    }
    bt.current === "idle" && (bt.current = "pending"), ct ? bt.current === "pending" && A !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    A !== i && (O(A), bt.current = "auto-populated") : bt.current === "auto-populated" && (O(void 0), bt.current = "pending");
  }, [o, A, ct, i]);
  const Mt = P(() => e.filter((z) => !z.deleted), [e]);
  W(() => {
    let z = !0;
    if (!o || !_) {
      we(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = /* @__PURE__ */ new Map();
      await Promise.all(
        Mt.map(async (Pt) => {
          const ii = await _(Pt.id);
          z && pt.set(Pt.id, ii);
        })
      ), z && we(pt);
    })(), () => {
      z = !1;
    };
  }, [o, Mt, _]);
  const Qt = P(() => Mt[0], [Mt]), Ae = Y(null), $t = Y(void 0), te = B(() => {
    var z;
    (z = $t.current) == null || z.call($t), T(xo);
  }, []), Xe = B(() => {
    const z = !et;
    dt(z), Jt(!z), v == null || v(l, z);
  }, [et, v, l]);
  W(() => {
    S(!1);
  }, [o]), W(() => {
    if (o && !et && !Tt) {
      const z = setTimeout(() => {
        dt(!0), v == null || v(l, !0);
      }, I * 1e3);
      return vt.current = z, () => clearTimeout(z);
    }
    vt.current && (clearTimeout(vt.current), vt.current = void 0);
  }, [o, et, Tt, I, l, v]);
  const It = P(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), ye = P(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const z = _r(i, r);
    return ee(r["%comment_assigned_to%"], {
      assignedUser: z
    });
  }, [i, r]), m = P(() => Mt.slice(1), [Mt]), D = P(() => m.length ?? 0, [m.length]), F = P(() => D > 0, [D]), q = P(() => H || D <= 2 ? m : m.slice(-2), [m, D, H]), Z = P(() => H || D <= 2 ? 0 : D - 2, [D, H]), X = P(
    () => D === 1 ? It.singleReply : ee(It.multipleReplies, { count: D }),
    [D, It]
  ), wt = P(
    () => Z === 1 ? It.singleReply : ee(It.multipleReplies, { count: Z }),
    [Z, It]
  );
  W(() => {
    !o && U && F && L(!1);
  }, [o, U, F]);
  const lt = B(
    async (z) => {
      z && z.stopPropagation();
      const ut = At(C) ? Rr(C) : void 0;
      if (E !== void 0) {
        await g({
          threadId: l,
          contents: ut,
          assignedUser: E
        }) && (G(E), ut && te());
        return;
      }
      ut && await g({ threadId: l, contents: ut }) && te();
    },
    [
      te,
      C,
      g,
      E,
      l
    ]
  ), ht = B(
    async (z) => {
      const ut = At(C) ? Rr(C) : void 0, pt = z.status ? z.assignedUser : E ?? z.assignedUser, Pt = await g({
        ...z,
        contents: ut,
        assignedUser: pt
      });
      return Pt && (pt !== void 0 && G(pt), ut && te()), Pt;
    },
    [te, C, g, E]
  );
  if (Mt.length !== 0)
    return /* @__PURE__ */ a(
      Cd,
      {
        role: "option",
        "aria-selected": o,
        id: l,
        className: f(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !o },
          {
            "tw:bg-primary-foreground": !o && w !== "Resolved" && et,
            "tw:bg-background": o && w !== "Resolved" && et,
            "tw:bg-muted": w === "Resolved",
            "tw:bg-accent": !et && !o && w !== "Resolved"
          }
        ),
        onClick: () => {
          s(l);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ u(Ed, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              ye && /* @__PURE__ */ a(Be, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: ye }),
              /* @__PURE__ */ a(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (z) => {
                    z.stopPropagation(), Xe();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": et ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: et ? /* @__PURE__ */ a(ji, {}) : /* @__PURE__ */ a(Bi, {})
                }
              ),
              K && w !== "Resolved" && /* @__PURE__ */ a(
                j,
                {
                  variant: "ghost",
                  size: "icon",
                  className: f(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (z) => {
                    z.stopPropagation(), ht({
                      threadId: l,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ a(ir, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
              "p",
              {
                ref: Ae,
                className: f(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": M
                  },
                  { "tw:whitespace-nowrap": !M }
                ),
                children: [
                  n && $ ? /* @__PURE__ */ a(
                    j,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (z) => {
                        z.stopPropagation(), $(d);
                      },
                      children: n
                    }
                  ) : n,
                  /* @__PURE__ */ u("span", { className: t, children: [
                    Qt.contextBefore,
                    /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Qt.selectedText }),
                    Qt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ a(
              bo,
              {
                comment: Qt,
                localizedStrings: r,
                isThreadExpanded: o,
                threadStatus: w,
                handleAddCommentToThread: ht,
                handleUpdateComment: h,
                handleDeleteComment: p,
                onEditingChange: L,
                canEditOrDelete: (!U && Zt.get(Qt.id)) ?? !1,
                canUserResolveThread: K
              }
            )
          ] }),
          /* @__PURE__ */ u(ot, { children: [
            F && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(je, {}) }),
              /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: X })
            ] }),
            !o && At(C) && /* @__PURE__ */ a(
              Dr,
              {
                editorSerializedState: C,
                onSerializedChange: (z) => T(z),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ u(ot, { children: [
              Z > 0 && /* @__PURE__ */ u(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (z) => {
                    z.stopPropagation(), S(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (z) => {
                    (z.key === "Enter" || z.key === " ") && (z.preventDefault(), z.stopPropagation(), S(!0));
                  },
                  children: [
                    /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(je, {}) }),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: wt }),
                      H ? /* @__PURE__ */ a(Mo, {}) : /* @__PURE__ */ a(sr, {})
                    ] })
                  ]
                }
              ),
              q.map((z) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                bo,
                {
                  comment: z,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: h,
                  handleDeleteComment: p,
                  onEditingChange: L,
                  canEditOrDelete: (!U && Zt.get(z.id)) ?? !1
                }
              ) }, z.id)),
              b !== !1 && (!U || At(C)) && /* @__PURE__ */ u(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (z) => z.stopPropagation(),
                  onKeyDownCapture: (z) => {
                    Fa(z) && (z.preventDefault(), z.stopPropagation(), (At(C) || E !== void 0 && E !== V) && lt());
                  },
                  onKeyDown: (z) => {
                    La(z), (z.key === "Enter" || z.key === " ") && z.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ a(
                      Dr,
                      {
                        editorSerializedState: C,
                        onSerializedChange: (z) => T(z),
                        placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (z) => {
                          $t.current = z;
                        }
                      }
                    ),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      E !== void 0 && (At(C) || E !== V) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: ee(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: _r(
                            E,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ u(be, { open: zt, onOpenChange: Rt, children: [
                        /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ a(
                          j,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !ct || !x || x.length === 0 || !x.includes(c),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ a($o, {})
                          }
                        ) }),
                        /* @__PURE__ */ a(
                          xe,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (z) => {
                              z.key === "Escape" && (z.stopPropagation(), Rt(!1));
                            },
                            children: /* @__PURE__ */ a(De, { children: /* @__PURE__ */ a(Re, { children: x == null ? void 0 : x.map((z) => /* @__PURE__ */ a(
                              ve,
                              {
                                onSelect: () => {
                                  O(z !== i ? z : void 0), bt.current = "user-selected", G(void 0), Rt(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: _r(z, r) })
                              },
                              z || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        j,
                        {
                          size: "icon",
                          onClick: lt,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !At(C) && (E === void 0 || E === V),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ a(Ao, {})
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
function Ju({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: i,
  handleUpdateComment: c,
  handleDeleteComment: s,
  handleReadStatusChange: l,
  assignableUsers: d,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: g,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: v,
  onSelectedThreadChange: x,
  onVerseRefClick: b
}) {
  const [N, y] = R(/* @__PURE__ */ new Set()), [_, k] = R(), [I, $] = R(), A = B(
    async (S) => {
      const U = await i(S);
      return U !== void 0 && S.assignedUser !== void 0 && S.assignedUser !== "" && $(S.assignedUser), U;
    },
    [i]
  );
  W(() => {
    v && (y((S) => new Set(S).add(v)), k(v));
  }, [v]);
  const C = r.filter(
    (S) => S.comments.some((U) => !U.deleted)
  ), T = C.map((S) => ({ id: S.id })), E = B(
    (S) => {
      y((U) => new Set(U).add(S.id)), k(S.id), x == null || x(S.id);
    },
    [x]
  ), O = B(
    (S) => {
      const U = N.has(S);
      y((L) => {
        const zt = new Set(L);
        return zt.has(S) ? zt.delete(S) : zt.add(S), zt;
      }), k(S), x == null || x(U ? void 0 : S);
    },
    [N, x]
  ), { listboxRef: V, activeId: G, handleKeyDown: M } = _d({
    options: T,
    onOptionSelect: E
  }), H = B(
    (S) => {
      S.key === "Escape" ? (_ && N.has(_) && (y((U) => {
        const L = new Set(U);
        return L.delete(_), L;
      }), k(void 0), x == null || x(void 0)), S.preventDefault(), S.stopPropagation()) : M(S);
    },
    [_, N, M, x]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: V,
      "aria-activedescendant": G ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: H,
      children: C.map((S) => /* @__PURE__ */ a(
        "div",
        {
          className: f({
            "tw:opacity-60": S.status === "Resolved"
          }),
          children: /* @__PURE__ */ a(
            Sd,
            {
              classNameForVerseText: e,
              comments: S.comments,
              localizedStrings: n,
              verseRef: S.verseRef,
              handleSelectThread: O,
              threadId: S.id,
              thread: S,
              isRead: S.isRead,
              isSelected: N.has(S.id),
              currentUser: o,
              assignedUser: S.assignedUser,
              threadStatus: S.status,
              handleAddCommentToThread: A,
              handleUpdateComment: c,
              handleDeleteComment: s,
              handleReadStatusChange: l,
              assignableUsers: d,
              canUserAddCommentToThread: w,
              canUserAssignThreadCallback: g,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: b,
              initialAssignedUser: I
            }
          )
        },
        S.id
      ))
    }
  );
}
function Dd({ table: t }) {
  return /* @__PURE__ */ u(se, { children: [
    /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ u(j, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(Ui, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(le, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(wr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(ur, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        pe,
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
function Ue({ ...t }) {
  return /* @__PURE__ */ a(kt.Root, { "data-slot": "select", ...t });
}
function Rd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    kt.Group,
    {
      "data-slot": "select-group",
      className: f("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Ke({ ...t }) {
  return /* @__PURE__ */ a(kt.Value, { "data-slot": "select-value", ...t });
}
function qe({ className: t, size: e = "default", children: r, ...o }) {
  const n = it();
  return /* @__PURE__ */ u(
    kt.Trigger,
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
        /* @__PURE__ */ a(kt.Icon, { asChild: !0, children: /* @__PURE__ */ a(vi, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Ge({
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
  const i = it();
  return /* @__PURE__ */ a(kt.Portal, { children: /* @__PURE__ */ u(
    kt.Content,
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
        /* @__PURE__ */ a(Md, {}),
        /* @__PURE__ */ a(
          kt.Viewport,
          {
            "data-position": r,
            className: f(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a($d, {})
      ]
    }
  ) });
}
function Zu({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    kt.Label,
    {
      "data-slot": "select-label",
      className: f("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Lt({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    kt.Item,
    {
      "data-slot": "select-item",
      className: f(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(kt.ItemIndicator, { children: /* @__PURE__ */ a(Te, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(kt.ItemText, { children: e })
      ]
    }
  );
}
function Qu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    kt.Separator,
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
function Md({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    kt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(mi, {})
    }
  );
}
function $d({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    kt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(fi, {})
    }
  );
}
function Ad({ table: t }) {
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
        Ue,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(qe, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Ke, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Ge, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(Lt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(Ki, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(qi, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(Gi, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(Hi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const yo = `
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
function Od(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function nr(t, e) {
  const r = e ? `${yo}, ${e}` : yo;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Od(o)
  );
}
function Lr({
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
    const c = n.current;
    if (!c) return;
    const s = () => {
      requestAnimationFrame(() => {
        nr(c, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    s();
    const l = new MutationObserver(() => {
      s();
    });
    return l.observe(c, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      l.disconnect();
    };
  }, []);
  const i = (c) => {
    const { current: s } = n;
    if (s) {
      if (c.key === "ArrowDown") {
        c.preventDefault(), nr(s)[0].focus();
        return;
      }
      c.key === " " && document.activeElement === s && c.preventDefault();
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
function ja({
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
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: f("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function tp({ className: t, ...e }) {
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
function Id(t) {
  at.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const n = t.current ? nr(t.current) : [], i = n.indexOf(document.activeElement), c = o.key === "ArrowRight" ? i + 1 : i - 1;
          c >= 0 && c < n.length && n[c].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function Pd(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ld(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function re({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: n,
  ...i
}) {
  const c = at.useRef(null);
  at.useEffect(() => {
    typeof n == "function" ? n(c.current) : n && "current" in n && (n.current = c.current);
  }, [n]), Id(c);
  const s = at.useMemo(
    () => c.current ? nr(c.current) : [],
    [c]
  ), l = at.useCallback(
    (w) => {
      const { current: g } = c;
      if (!g || !g.parentElement) return;
      const h = g.closest("table"), p = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        nr(h).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], v = p.indexOf(g), x = s.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Ld(p, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Pd(s, x, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const b = g.closest("table");
        b && b.focus();
      }
      e == null || e(w);
    },
    [c, s, e]
  ), d = at.useCallback(
    (w) => {
      o && (r == null || r(w));
    },
    [o, r]
  );
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      ref: c,
      tabIndex: -1,
      onKeyDown: l,
      onFocus: d,
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
function Mr({ className: t, ...e }) {
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
function ge({ className: t, ...e }) {
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
function ep({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: f("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function va({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "skeleton",
      className: f("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Vd({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: i = !1,
  onRowClickHandler: c = () => {
  },
  id: s,
  isLoading: l = !1,
  noResultsMessage: d
}) {
  var $;
  const [w, g] = R([]), [h, p] = R([]), [v, x] = R({}), [b, N] = R({}), y = P(() => e ?? [], [e]), _ = en({
    data: y,
    columns: t,
    getCoreRowModel: an(),
    ...r && { getPaginationRowModel: gc() },
    onSortingChange: g,
    getSortedRowModel: rn(),
    onColumnFiltersChange: p,
    getFilteredRowModel: pc(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: N,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: v,
      rowSelection: b
    }
  }), k = _.getVisibleFlatColumns();
  let I;
  return l ? I = Array.from({ length: 10 }).map((T, E) => `skeleton-row-${E}`).map((T) => /* @__PURE__ */ a(re, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(ge, { colSpan: k.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(va, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, T)) : (($ = _.getRowModel().rows) == null ? void 0 : $.length) > 0 ? I = _.getRowModel().rows.map((A) => /* @__PURE__ */ a(
    re,
    {
      onClick: () => c(A, _),
      "data-state": A.getIsSelected() && "selected",
      children: A.getVisibleCells().map((C) => /* @__PURE__ */ a(ge, { children: er(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    A.id
  )) : I = /* @__PURE__ */ a(re, { children: /* @__PURE__ */ a(ge, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: s, children: [
    n && /* @__PURE__ */ a(Dd, { table: _ }),
    /* @__PURE__ */ u(Lr, { stickyHeader: i, children: [
      /* @__PURE__ */ a(ja, { stickyHeader: i, children: _.getHeaderGroups().map((A) => /* @__PURE__ */ a(re, { children: A.headers.map((C) => /* @__PURE__ */ a(Mr, { className: "tw:p-0", children: C.isPlaceholder ? void 0 : er(C.column.columnDef.header, C.getContext()) }, C.id)) }, A.id)) }),
      /* @__PURE__ */ a(Vr, { children: I })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        j,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
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
    r && o && /* @__PURE__ */ a(Ad, { table: _ })
  ] });
}
function rp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = P(
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
      children: /* @__PURE__ */ a(mc, { options: i, children: e })
    }
  );
}
const Fd = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ko = (t, e) => t[e] ?? e;
function jd({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = ko(r, "%webView_error_dump_header%"), i = ko(r, "%webView_error_dump_info_message%");
  function c() {
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
          /* @__PURE__ */ a(j, { variant: "secondary", size: "icon", className: "size-8", onClick: () => c(), children: /* @__PURE__ */ a(Oo, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const ap = Object.freeze([
  ...Fd,
  "%webView_error_dump_copied_message%"
]);
function op({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [c, s] = R(!1), l = () => {
    s(!0), e && e();
  };
  return /* @__PURE__ */ u(be, { onOpenChange: (w) => {
    w || s(!1);
  }, children: [
    /* @__PURE__ */ a(Me, { asChild: !0, children: o }),
    /* @__PURE__ */ u(xe, { id: i, className: f("tw:min-w-80 tw:max-w-96", n), children: [
      c && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(gt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        jd,
        {
          errorDetails: t,
          handleCopyNotify: l,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var Bd = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Bd || {});
function np({ id: t, label: e, groups: r }) {
  const [o, n] = R(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [i, c] = R({}), s = (d, w) => {
    const g = !o[d][w];
    n((p) => (p[d][w] = g, { ...p }));
    const h = r[d].items[w];
    h.onUpdate(h.id, g);
  }, l = (d, w) => {
    c((h) => (h[d] = w, { ...h }));
    const g = r[d].items.find((h) => h.id === w);
    g ? g.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(se, { children: [
    /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ u(j, { variant: "default", children: [
      /* @__PURE__ */ a(Wi, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(sr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(le, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(wr, { children: d.label }),
      /* @__PURE__ */ a(gn, { children: d.itemType === 0 ? /* @__PURE__ */ a(ot, { children: d.items.map((g, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        pe,
        {
          checked: o[w][h],
          onCheckedChange: () => s(w, h),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ a(
        Fc,
        {
          value: i[w],
          onValueChange: (g) => l(w, g),
          children: d.items.map((g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(jc, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ a(ur, {})
    ] }, d.label)) })
  ] }) });
}
function ip({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: c,
  handleSupportLinkClick: s
}) {
  const l = new Si("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, g) => w + g, 0)), d = () => {
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
            /* @__PURE__ */ a(Yi, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: l })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
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
        (n || c) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            j,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Xi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          c && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            j,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Ji, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Ud({ id: t, versionHistory: e }) {
  const [r, o] = R(!1), n = /* @__PURE__ */ new Date();
  function i(s) {
    const l = new Date(s), d = new Date(n.getTime() - l.getTime()), w = d.getUTCFullYear() - 1970, g = d.getUTCMonth(), h = d.getUTCDate() - 1;
    let p = "";
    return w > 0 ? p = `${w.toString()} year${w === 1 ? "" : "s"} ago` : g > 0 ? p = `${g.toString()} month${g === 1 ? "" : "s"} ago` : h === 0 ? p = "today" : p = `${h.toString()} day${h === 1 ? "" : "s"} ago`, p;
  }
  const c = Object.entries(e).sort((s, l) => l[0].localeCompare(s[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? c : c.slice(0, 5)).map((s) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: s[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
          "Version ",
          s[0]
        ] }),
        /* @__PURE__ */ a("div", { children: i(s[1].date) })
      ] })
    ] }, s[0])) }),
    c.length > 5 && /* @__PURE__ */ a(
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
function sp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const c = P(() => Di(r), [r]), l = ((d) => {
    const w = new Intl.DisplayNames(Ri(), { type: "language" });
    return d.map((g) => w.of(g));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(Ud, { versionHistory: n }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ a("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ u("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Publisher" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ a("span", { children: "Size" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: c })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ u("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ a("span", { children: "Version" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: i }),
          /* @__PURE__ */ a("span", { children: "Languages" }),
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Gn({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  hasToggleAllFeature: n = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: s = "No entries found",
  customSelectedText: l,
  isOpen: d = void 0,
  onOpenChange: w = void 0,
  isDisabled: g = !1,
  sortSelected: h = !1,
  icon: p = void 0,
  className: v = void 0,
  variant: x = "ghost",
  id: b
}) {
  const [N, y] = R(!1), _ = B(
    (E) => {
      var V;
      const O = (V = t.find((G) => G.label === E)) == null ? void 0 : V.value;
      O && r(
        e.includes(O) ? e.filter((G) => G !== O) : [...e, O]
      );
    },
    [t, e, r]
  ), k = () => l || o, I = P(() => {
    if (!h) return t;
    const E = t.filter((V) => V.starred).sort((V, G) => V.label.localeCompare(G.label)), O = t.filter((V) => !V.starred).sort((V, G) => {
      const M = e.includes(V.value), H = e.includes(G.value);
      return M && !H ? -1 : !M && H ? 1 : V.label.localeCompare(G.label);
    });
    return [...E, ...O];
  }, [t, e, h]), $ = () => {
    r(t.map((E) => E.value));
  }, A = () => {
    r([]);
  }, C = d ?? N;
  return /* @__PURE__ */ a("div", { id: b, className: v, children: /* @__PURE__ */ u(be, { open: C, onOpenChange: w ?? y, children: [
    /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ u(
      j,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: g,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ a("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ a("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ a(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ a(Io, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(xe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ u(De, { children: [
      /* @__PURE__ */ a(dr, { placeholder: `Search ${o.toLowerCase()}...` }),
      n && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ a(j, { variant: "ghost", size: "sm", onClick: $, children: i }),
        /* @__PURE__ */ a(j, { variant: "ghost", size: "sm", onClick: A, children: c })
      ] }),
      /* @__PURE__ */ u(Re, { children: [
        /* @__PURE__ */ a(Ir, { children: s }),
        /* @__PURE__ */ a(he, { children: I.map((E) => /* @__PURE__ */ u(
          ve,
          {
            value: E.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ a("div", { className: "w-4", children: /* @__PURE__ */ a(
                ir,
                {
                  className: f(
                    "tw:h-4 tw:w-4",
                    e.includes(E.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              E.starred && /* @__PURE__ */ a(Zi, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ a("div", { className: "tw:flex-grow", children: E.label }),
              E.secondaryLabel && /* @__PURE__ */ a("div", { className: "tw:text-end tw:text-muted-foreground", children: E.secondaryLabel })
            ]
          },
          E.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function cp({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: i,
  isDisabled: c,
  sortSelected: s,
  icon: l,
  className: d,
  badgesPlaceholder: w,
  id: g
}) {
  return /* @__PURE__ */ u("div", { id: g, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Gn,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: i,
        isDisabled: c,
        sortSelected: s,
        icon: l,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var p;
      return /* @__PURE__ */ u(Be, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          j,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((v) => v !== h)),
            children: /* @__PURE__ */ a(Ar, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((v) => v.value === h)) == null ? void 0 : p.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(gt, { children: w })
  ] });
}
function _o({ className: t, ...e }) {
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
const Kd = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), No = (t, e) => t[e] ?? e;
function qd({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: c = "tw:h-6 tw:w-6",
  variant: s = "ghost"
}) {
  const l = P(() => /Macintosh/i.test(navigator.userAgent), []), d = No(n, "%undoButton_tooltip%"), w = No(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Va, { children: [
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
        j,
        {
          "aria-label": d,
          className: c,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: s,
          children: /* @__PURE__ */ a(Qi, {})
        }
      ) }),
      /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ u("p", { children: [
        d,
        i && /* @__PURE__ */ u(ot, { children: [
          " ",
          /* @__PURE__ */ a(_o, { children: l ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (s === "secondary" || s === "default") && /* @__PURE__ */ a(Un, {}),
    e && /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
        j,
        {
          "aria-label": w,
          className: c,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: s,
          children: /* @__PURE__ */ a(ts, {})
        }
      ) }),
      /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(ot, { children: [
          " ",
          /* @__PURE__ */ a(_o, { children: l ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Gd({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = Y(null);
  return W(() => {
    var l;
    const i = /Macintosh/i.test(navigator.userAgent), c = ((l = n.current) == null ? void 0 : l.querySelector(".editor-input")) ?? void 0, s = (d) => {
      var g, h, p, v;
      if (!c || document.activeElement !== c) return;
      const w = d.key.toLowerCase();
      if (i) {
        if (!d.metaKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((g = e.current) == null || g.undo())) : d.shiftKey && w === "z" && (d.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((p = e.current) == null || p.undo())) : (w === "y" || d.shiftKey && w === "z") && (d.preventDefault(), o && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const Hd = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Wd({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = Y(null), c = Y(null), s = Y(!1), [l, d] = R(t), [w, g] = R(r), [h, p] = R(!1);
  W(() => {
    d(t);
  }, [t]), W(() => {
    w !== r && g(r);
  }, [r]);
  const v = (b) => {
    s.current = !1, p(b), b || (l !== "custom" || w ? (e(l), o(w)) : (d(t), g(r)));
  }, x = (b) => {
    var N, y, _, k;
    b.stopPropagation(), document.activeElement === c.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((N = i.current) == null || N.focus(), s.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((y = c.current) == null || y.focus(), s.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((k = c.current) == null || k.focus(), s.current = !1), l === "custom" && b.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && v(!1);
  };
  return /* @__PURE__ */ u(se, { open: h, onOpenChange: v, children: [
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ a(j, { variant: "outline", className: "tw:h-6", children: Hd(t, n, r) }) }) }),
      /* @__PURE__ */ a(Et, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      le,
      {
        style: { zIndex: on },
        onClick: () => {
          s.current && (s.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var b;
          s.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ a(wr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(ur, {}),
          /* @__PURE__ */ a(
            pe,
            {
              checked: l === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: la })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            pe,
            {
              checked: l === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: da })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            pe,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => d("custom"),
              onClick: (b) => {
                var N;
                b.stopPropagation(), s.current = !0, (N = i.current) == null || N.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  lr,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), d("custom"), s.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => g(b.target.value)
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
const Yd = (t, e) => t === "f" ? /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a(Lo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a(Vo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(ot, { children: [
  /* @__PURE__ */ a(Po, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Xd = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), ee(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Jd({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(se, { children: [
    /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(ce, { asChild: !0, children: /* @__PURE__ */ a(j, { variant: "outline", className: "tw:h-6", children: Yd(t, r) }) }) }),
      /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ a("p", { children: Xd(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(le, { style: { zIndex: on }, children: [
      /* @__PURE__ */ a(wr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(ur, {}),
      /* @__PURE__ */ u(
        pe,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Po, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        pe,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Lo, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        pe,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Vo, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Zd = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Qd({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? es, { className: e, size: 16 });
}
function Co({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    ve,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Qd, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ a("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Ic, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function tw({ localizedStrings: t, markerMenuItems: e, searchRef: r }) {
  const [o, n] = R(""), [i, c] = P(() => {
    const s = o.trim().toLowerCase();
    if (!s)
      return [e, []];
    const l = e.filter(
      (w) => {
        var g;
        return (g = w.marker) == null ? void 0 : g.toLowerCase().includes(s);
      }
    ), d = e.filter(
      (w) => w.title.toLowerCase().includes(s) && !l.includes(w)
    );
    return [l, d];
  }, [o, e]);
  return /* @__PURE__ */ u(De, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      dr,
      {
        className: "marker-menu-search",
        ref: r,
        value: o,
        onValueChange: (s) => n(s),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(Re, { children: [
      /* @__PURE__ */ a(Ir, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(he, { children: i.map((s) => {
        var l;
        return /* @__PURE__ */ a(
          Co,
          {
            item: s,
            localizedStrings: t
          },
          `item-${s.marker ?? ((l = s.icon) == null ? void 0 : l.displayName)}-${s.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(ot, { children: [
        i.length > 0 && /* @__PURE__ */ a(dn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(he, { children: c.map((s) => {
          var l;
          return /* @__PURE__ */ a(
            Co,
            {
              item: s,
              localizedStrings: t
            },
            `item-${s.marker ?? ((l = s.icon) == null ? void 0 : l.displayName)}-${s.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function ew(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = xr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, c]) => {
    i.push(
      ...c.map((s) => ({
        marker: s,
        title: r[xr[s].description] ?? xr[s].description,
        action: () => {
          var l;
          (l = t.current) == null || l.insertMarker(s), e();
        }
      }))
    );
  }), i.sort((c, s) => (c.marker ?? c.title).localeCompare(s.marker ?? s.title));
}
function rw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function aw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ow = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function lp({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: c,
  defaultMarkerMenuTrigger: s,
  localizedStrings: l,
  parentEditorRef: d
}) {
  const w = Y(null), g = Y(null), h = Y(null), p = Y(null);
  Dt(() => {
    if (!p.current) return;
    const { width: m } = p.current.getBoundingClientRect();
    m > 0 && (p.current.style.width = `${m}px`);
  }, []);
  const [v, x] = R("generated"), [b, N] = R("generated"), [y, _] = R("*"), [k, I] = R("*"), [$, A] = R("f"), [C, T] = R(!1), [E, O] = R(!0), [V, G] = R(!1), M = Y(!1), H = Y(""), [S, U] = R(!1), [L, zt] = R(), [Rt, ct] = R(), [Xt, K] = R(), [nt, et] = R(), dt = Y(null), Tt = P(
    () => ({
      ...c,
      markerMenuTrigger: s,
      hasExternalUI: !0,
      view: { ...c.view ?? vc(), noteMode: "expanded" }
    }),
    [c, s]
  ), Jt = P(
    () => ew(
      w,
      () => U(!1),
      l,
      nt
    ),
    [l, nt]
  );
  W(() => {
    var m;
    S || (m = w.current) == null || m.focus();
  }, [$, S]), W(() => {
    var F, q;
    let m;
    M.current = !1, O(!0);
    const D = e == null ? void 0 : e.at(0);
    if (D && hr("note", D)) {
      const Z = (F = D.insert.note) == null ? void 0 : F.caller;
      let X = "custom";
      Z === la ? X = "generated" : Z === da ? X = "hidden" : Z && (_(Z), I(Z)), x(X), N(X), A(((q = D.insert.note) == null ? void 0 : q.style) ?? "f"), m = setTimeout(() => {
        var wt;
        (wt = w.current) == null || wt.applyUpdate([D]);
      }, 0);
    }
    return () => {
      m && clearTimeout(m);
    };
  }, [e, i]);
  const vt = B(
    (m, D, F = !1) => {
      var Z, X, wt;
      const q = (X = (Z = w.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : X.at(0);
      if (q && hr("note", q)) {
        if (q.insert.note) {
          let lt;
          m === "custom" ? lt = D : m === "generated" ? lt = la : lt = da, q.insert.note.caller = lt;
        }
        r == null || r([q]), F && d && i && ((wt = d.current) == null || wt.replaceEmbedUpdate(i, [q]));
      }
    },
    [i, r, d]
  ), Zt = B(() => {
    vt(v, y, !0), o();
  }, [v, y, o, vt]), we = Y(Zt);
  Dt(() => {
    we.current = Zt;
  });
  const bt = Y({ book: n.book, chapterNum: n.chapterNum });
  Dt(() => {
    (bt.current.book !== n.book || bt.current.chapterNum !== n.chapterNum) && (bt.current = { book: n.book, chapterNum: n.chapterNum }, we.current());
  }, [n.book, n.chapterNum]);
  const Mt = () => {
    var D;
    const m = (D = g.current) == null ? void 0 : D.getElementsByClassName("editor-input")[0];
    m != null && m.textContent && navigator.clipboard.writeText(m.textContent);
  }, Qt = B(
    (m) => {
      x(m), vt(m, y);
    },
    [y, vt]
  ), Ae = B(
    (m) => {
      _(m), vt(v, m);
    },
    [v, vt]
  ), $t = (m) => {
    var F, q, Z, X, wt;
    A(m);
    const D = (q = (F = w.current) == null ? void 0 : F.getNoteOps(0)) == null ? void 0 : q.at(0);
    if (D && hr("note", D)) {
      D.insert.note && (D.insert.note.style = m);
      const lt = (X = (Z = D.insert.note) == null ? void 0 : Z.contents) == null ? void 0 : X.ops;
      $ !== "x" && m === "x" ? lt == null || lt.forEach((ht) => rw(ht)) : $ === "x" && m !== "x" && (lt == null || lt.forEach((ht) => aw(ht))), (wt = w.current) == null || wt.applyUpdate([D, { delete: 1 }]);
    }
  }, te = (m) => {
    et(m.contextMarker), G(m.canRedo);
  }, Xe = B(
    (m) => {
      var F, q, Z, X, wt;
      const D = (q = (F = w.current) == null ? void 0 : F.getNoteOps(0)) == null ? void 0 : q.at(0);
      if (D && hr("note", D)) {
        m.content.length > 1 && setTimeout(() => {
          var z;
          (z = w.current) == null || z.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const lt = (Z = D.insert.note) == null ? void 0 : Z.style, ht = (wt = (X = D.insert.note) == null ? void 0 : X.contents) == null ? void 0 : wt.ops;
        if (lt || T(!1), T(
          lt === "x" ? !!(ht != null && ht.every((z) => {
            var pt, Pt;
            if (!((pt = z.attributes) != null && pt.char)) return !0;
            const ut = ((Pt = z.attributes) == null ? void 0 : Pt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(ht != null && ht.every((z) => {
            var pt, Pt;
            if (!((pt = z.attributes) != null && pt.char)) return !0;
            const ut = ((Pt = z.attributes) == null ? void 0 : Pt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !M.current) {
          M.current = !0, H.current = JSON.stringify(D), O(!0);
          return;
        }
        O(JSON.stringify(D) === H.current), vt(v, y);
      } else
        T(!1), O(!0);
    },
    [v, y, vt]
  ), It = B(() => {
    const m = window.getSelection();
    if (h.current && Jt.length && m && m.rangeCount > 0) {
      const D = m.getRangeAt(0).getBoundingClientRect(), F = h.current.getBoundingClientRect();
      zt(D.left - F.left), ct(D.top - F.top), K(D.height), U(!0);
    }
  }, [Jt, h]);
  W(() => {
    const m = () => {
      S && U(!1);
    };
    return window.addEventListener("click", m), () => {
      window.removeEventListener("click", m);
    };
  }, [S]), W(() => {
    var m;
    S && ((m = dt.current) == null || m.focus());
  }, [S]), W(() => {
    var F;
    const m = ((F = g.current) == null ? void 0 : F.querySelector(".editor-input")) ?? void 0, D = (q) => {
      !S && m && document.activeElement === m && q.key === s ? (q.preventDefault(), It()) : S && q.key === "Escape" && (q.preventDefault(), U(!1));
    };
    return document.addEventListener("keydown", D), () => {
      document.removeEventListener("keydown", D);
    };
  }, [S, It, s]);
  const ye = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(ot, { children: [
    /* @__PURE__ */ u("div", { ref: p, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            Jd,
            {
              isTypeSwitchable: C,
              noteType: $,
              handleNoteTypeChange: $t,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            Wd,
            {
              callerType: v,
              updateCallerType: Qt,
              customCaller: y,
              updateCustomCaller: Ae,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Va, { children: [
          /* @__PURE__ */ a(
            qd,
            {
              onUndoClick: () => {
                var m;
                return (m = w.current) == null ? void 0 : m.undo();
              },
              onRedoClick: () => {
                var m;
                return (m = w.current) == null ? void 0 : m.redo();
              },
              canUndo: !E,
              canRedo: V,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            qn,
            {
              onCancelClick: o,
              onAcceptClick: Zt,
              canAccept: !E || b !== v || v === "custom" && y !== k,
              localizedStrings: l,
              acceptLabel: l["%footnoteEditor_saveButton_tooltip%"]
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
              Gd,
              {
                editorRef: w,
                canUndo: !E,
                canRedo: V,
                children: /* @__PURE__ */ a(
                  bc,
                  {
                    options: Tt,
                    onStateChange: te,
                    onUsjChange: Xe,
                    defaultUsj: ow,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: w
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
              /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ a(
                j,
                {
                  "aria-label": ye,
                  onClick: Mt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(Oo, {})
                }
              ) }),
              /* @__PURE__ */ a(Et, { children: /* @__PURE__ */ a("p", { children: ye }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "tw:absolute",
        ref: h,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ u(be, { open: S, children: [
      /* @__PURE__ */ a(
        Lc,
        {
          className: "tw:absolute",
          style: {
            top: Rt,
            left: L,
            height: Xt,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        xe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (m) => {
            m.preventDefault(), m.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            tw,
            {
              markerMenuItems: Jt,
              localizedStrings: l,
              searchRef: dt
            }
          )
        }
      )
    ] })
  ] });
}
const dp = Object.freeze([
  ...Zd,
  ...Object.entries(xr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Kd,
  ...Kn
]);
function Hn(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((n) => typeof n == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function nw(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let c = [];
  return e.forEach((s) => {
    typeof s != "string" && s.marker === "fp" ? (c.length > 0 && i.push(c), c = [s]) : c.push(s);
  }), c.length > 0 && i.push(c), i.map((s, l) => {
    const d = l === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      Ba(t, s, r, !0, n),
      d && o
    ] }, Hn(t, s));
  });
}
function Ba(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const c = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const s = f(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: s, children: i }, c);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(sa, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(sa, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          c
        );
      }
      return iw(
        i,
        Hn(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function iw(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      sa,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ba(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function sw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let c, s = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([c, ...s] = t.content);
  const l = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, d = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: f("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), g = c && /* @__PURE__ */ u(ot, { children: [
    Ba(t.marker, [c], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", v = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", x = f(h, p);
  return /* @__PURE__ */ u(ot, { children: [
    /* @__PURE__ */ u("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: [
      l,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", x), children: g }),
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          v,
          x
        ),
        children: s && s.length > 0 && /* @__PURE__ */ a(ot, { children: nw(t.marker, s, o, d) })
      }
    )
  ] });
}
function wp({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: i,
  showMarkers: c = !0,
  suppressFormatting: s = !1,
  formatCaller: l,
  onFootnoteSelected: d
}) {
  const w = l ?? Mi(r, void 0), g = (y, _) => {
    d == null || d(y, _, n);
  }, h = i ? r.findIndex((y) => y === i) : -1, [p, v] = R(h), x = (y, _, k) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), d == null || d(_, k, n);
          break;
      }
  }, b = (y) => {
    if (r.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), v((_) => Math.min(_ + 1, r.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), v((_) => Math.max(_ - 1, 0));
          break;
      }
  }, N = Y([]);
  return W(() => {
    var y;
    p >= 0 && p < N.current.length && ((y = N.current[p]) == null || y.focus());
  }, [p]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: f("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: f(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !s && "formatted-font"
          ),
          children: r.map((y, _) => {
            const k = y === i, I = `${n}-${_}`;
            return /* @__PURE__ */ u(ot, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: ($) => {
                    N.current[_] = $;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": y.marker,
                  "data-state": k ? "selected" : void 0,
                  tabIndex: _ === p ? 0 : -1,
                  className: f(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    d && "tw:hover:bg-muted/50",
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
                  onClick: () => g(y, _),
                  onKeyDown: ($) => x($, y, _),
                  children: /* @__PURE__ */ a(
                    sw,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => w(y.caller, _),
                      showMarkers: c
                    }
                  )
                },
                I
              ),
              _ < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(je, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function cw(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function lw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], c = P(() => {
    const s = [], l = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      l.has(w) || (l.add(w), s.push(d));
    }), s;
  }, [t]);
  return /* @__PURE__ */ u(Lr, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(ja, { stickyHeader: !0, children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(Mr, { children: n }),
      /* @__PURE__ */ a(Mr, { children: i })
    ] }) }),
    /* @__PURE__ */ a(Vr, { children: c.length > 0 && c.map((s) => /* @__PURE__ */ u(
      re,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ a(ge, { children: Ce(s.reference, "English") }),
          /* @__PURE__ */ a(ge, { className: o, children: cw(s.text) })
        ]
      },
      `${s.reference.book} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
function Wn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ka.Root,
    {
      "data-slot": "checkbox",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Ka.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(Te, {})
        }
      )
    }
  );
}
const dw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(ns, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(is, { className: "tw:h-4 tw:w-4" });
}, Fr = (t, e, r) => /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
  /* @__PURE__ */ u(
    Ct,
    {
      className: f("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        dw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Et, { side: "bottom", children: e })
] }) }), up = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Fr(e, t)
}), ww = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => Fr(r, t)
}), pp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Fr(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), ta = (t, e, r, o, n, i) => {
  let c = [...r];
  t.forEach((l) => {
    e === "approved" ? c.includes(l) || c.push(l) : c = c.filter((d) => d !== l);
  }), o(c);
  let s = [...n];
  t.forEach((l) => {
    e === "unapproved" ? s.includes(l) || s.push(l) : s = s.filter((d) => d !== l);
  }), i(s);
}, gp = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => Fr(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const c = i.getValue("status"), s = i.getValue("item");
    return /* @__PURE__ */ u(Pn, { value: c, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ a(
        kr,
        {
          onClick: (l) => {
            l.stopPropagation(), ta(
              [s],
              "approved",
              e,
              r,
              o,
              n
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ a(rs, {})
        }
      ),
      /* @__PURE__ */ a(
        kr,
        {
          onClick: (l) => {
            l.stopPropagation(), ta(
              [s],
              "unapproved",
              e,
              r,
              o,
              n
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ a(as, {})
        }
      ),
      /* @__PURE__ */ a(
        kr,
        {
          onClick: (l) => {
            l.stopPropagation(), ta(
              [s],
              "unknown",
              e,
              r,
              o,
              n
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ a(os, {})
        }
      )
    ] });
  }
}), hp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), fp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, mp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, uw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", vp = Object.freeze([
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
]), pw = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, gw = (t, e, r) => t.map((o) => {
  const n = Ha(o.key) ? o.key : o.key[0];
  return {
    items: Ha(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || uw(n, e, r),
    occurrences: o.occurrences || []
  };
}), jt = (t, e) => t[e] ?? e;
function bp({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: i,
  scope: c,
  onScopeChange: s,
  columns: l,
  id: d,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: g,
  onItemSelected: h
}) {
  const p = jt(r, "%webView_inventory_all%"), v = jt(r, "%webView_inventory_approved%"), x = jt(r, "%webView_inventory_unapproved%"), b = jt(r, "%webView_inventory_unknown%"), N = jt(r, "%webView_inventory_scope_currentBook%"), y = jt(r, "%webView_inventory_scope_chapter%"), _ = jt(r, "%webView_inventory_scope_verse%"), k = jt(r, "%webView_inventory_filter_text%"), I = jt(
    r,
    "%webView_inventory_show_additional_items%"
  ), $ = jt(r, "%webView_inventory_no_results%"), [A, C] = R(!1), [T, E] = R("all"), [O, V] = R(""), [G, M] = R([]), H = P(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : gw(K, n, i);
  }, [t, n, i]), S = P(() => {
    if (A) return H;
    const K = [];
    return H.forEach((nt) => {
      const et = nt.items[0], dt = K.find(
        (Tt) => Tt.items[0] === et
      );
      dt ? (dt.count += nt.count, dt.occurrences = dt.occurrences.concat(nt.occurrences)) : K.push({
        items: [et],
        count: nt.count,
        occurrences: nt.occurrences,
        status: nt.status
      });
    }), K;
  }, [A, H]), U = P(() => S.length === 0 ? [] : pw(S, T, O), [S, T, O]), L = P(() => {
    var et, dt;
    if (!A) return l;
    const K = (et = o == null ? void 0 : o.tableHeaders) == null ? void 0 : et.length;
    if (!K) return l;
    const nt = [];
    for (let Tt = 0; Tt < K; Tt++)
      nt.push(
        ww(
          ((dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt[Tt]) || "Additional Item",
          Tt + 1
        )
      );
    return [...nt, ...l];
  }, [o == null ? void 0 : o.tableHeaders, l, A]);
  W(() => {
    U.length === 0 ? M([]) : U.length === 1 && M(U[0].items);
  }, [U]);
  const zt = (K, nt) => {
    nt.setRowSelection(() => {
      const dt = {};
      return dt[K.index] = !0, dt;
    });
    const et = K.original.items;
    M(et), h && et.length > 0 && h(et[0]);
  }, Rt = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      s(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, ct = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      E(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, Xt = P(() => {
    if (S.length === 0 || G.length === 0) return [];
    const K = S.filter((nt) => $i(
      A ? nt.items : [nt.items[0]],
      G
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [G, A, S]);
  return /* @__PURE__ */ a("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        Ue,
        {
          onValueChange: (K) => ct(K),
          defaultValue: T,
          children: [
            /* @__PURE__ */ a(qe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Ke, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Ge, { children: [
              /* @__PURE__ */ a(Lt, { value: "all", children: p }),
              /* @__PURE__ */ a(Lt, { value: "approved", children: v }),
              /* @__PURE__ */ a(Lt, { value: "unapproved", children: x }),
              /* @__PURE__ */ a(Lt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(Ue, { onValueChange: (K) => Rt(K), defaultValue: c, children: [
        /* @__PURE__ */ a(qe, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Ke, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Ge, { children: [
          /* @__PURE__ */ a(Lt, { value: "book", children: N }),
          /* @__PURE__ */ a(Lt, { value: "chapter", children: y }),
          /* @__PURE__ */ a(Lt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ a(
        lr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: k,
          value: O,
          onChange: (K) => {
            V(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(_t, { children: /* @__PURE__ */ u(Nt, { children: [
        /* @__PURE__ */ a(Ct, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Wn,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: A,
              onCheckedChange: (K) => {
                C(K);
              }
            }
          ),
          /* @__PURE__ */ a(gt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? I })
        ] }) }),
        /* @__PURE__ */ a(Et, { children: (o == null ? void 0 : o.checkboxText) ?? I })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Vd,
      {
        columns: L,
        data: U,
        onRowClickHandler: zt,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: $
      }
    ) }),
    Xt.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      lw,
      {
        classNameForText: g,
        occurrenceData: Xt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const jr = cr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: n, isDisabled: i = !1, id: c }, s) => {
    const l = it();
    return /* @__PURE__ */ u("div", { id: c, className: f("tw:relative", { "tw:w-full": o }, n), children: [
      /* @__PURE__ */ a(
        ss,
        {
          className: f(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": l === "rtl" },
            { "tw:left-3": l === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ a(
        lr,
        {
          ref: s,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: r,
          value: t,
          onChange: (d) => e(d.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ u(
        j,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": l === "rtl" },
            { "tw:right-0": l === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ a(Ar, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
jr.displayName = "SearchBar";
const Yn = cr(({ className: t, ...e }, r) => /* @__PURE__ */ a(cs, { size: 35, className: f("tw:animate-spin", t), ...e, ref: r }));
Yn.displayName = "Spinner";
function hw(t, e = 50) {
  const [r, o] = R(e), n = Y(null);
  return W(() => {
    o(e);
  }, [t, e]), W(() => {
    if (r >= t.length) return;
    const i = n.current, c = new IntersectionObserver(
      ([s]) => {
        s.isIntersecting && o((l) => Math.min(l + e, t.length));
      },
      { threshold: 0 }
    );
    return i && c.observe(i), () => c.disconnect();
  }, [r, t.length, e]), {
    visibleItems: t.slice(0, r),
    sentinelRef: n,
    hasMore: r < t.length
  };
}
const xp = Object.freeze([
  "%resourcePicker_title%",
  "%resourcePicker_section_already_selected%",
  "%resourcePicker_section_installed%",
  "%resourcePicker_section_available_to_download%",
  "%resourcePicker_button_use%",
  "%resourcePicker_no_results%",
  "%resourcePicker_search_placeholder%",
  "%resourcePicker_language_filter_any%",
  "%resourcePicker_language_filter_multipleSelected%",
  "%resourcePicker_showing_count%"
]), Bt = (t, e) => t[e] ?? e;
function ea({
  label: t,
  resources: e,
  useLabel: r,
  onSelect: o
}) {
  if (e.length !== 0)
    return /* @__PURE__ */ u(ot, { children: [
      /* @__PURE__ */ a(gt, { className: "tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground", children: t }),
      /* @__PURE__ */ a(Lr, { children: /* @__PURE__ */ a(Vr, { children: e.map((n) => /* @__PURE__ */ u(re, { children: [
        /* @__PURE__ */ a(ge, { className: "tw:border-0", children: /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ a("span", { className: "tw:font-medium", children: n.fullName }),
          " (",
          /* @__PURE__ */ a("span", { children: n.displayName }),
          ")",
          /* @__PURE__ */ a(Be, { variant: "secondary", className: "tw:ml-2", children: n.bestLanguageName })
        ] }) }),
        o && r && /* @__PURE__ */ a(ge, { className: "tw:border-0 tw:text-right", children: /* @__PURE__ */ a(j, { variant: "outline", onClick: () => o(n), children: r }) })
      ] }, n.dblEntryUid)) }) })
    ] });
}
function fw(t, e) {
  if (!e) return !0;
  const r = e.toLowerCase();
  return t.displayName.toLowerCase().includes(r) || t.fullName.toLowerCase().includes(r) || t.bestLanguageName.toLowerCase().includes(r);
}
function yp({
  allResources: t,
  isResourcesLoading: e,
  resourceType: r,
  selectedResourceIds: o,
  localizedStrings: n,
  onSelect: i
}) {
  const [c, s] = R(""), [l, d] = R([]), w = P(
    () => t.filter((M) => !r || M.type === r).filter((M) => fw(M, c)).filter(
      (M) => l.length === 0 || l.includes(M.bestLanguageName)
    ),
    [t, r, c, l]
  ), g = P(
    () => w.filter((M) => o == null ? void 0 : o.includes(M.dblEntryUid)),
    [w, o]
  ), h = P(
    () => w.filter((M) => M.installed && !(o != null && o.includes(M.dblEntryUid))),
    [w, o]
  ), p = P(
    () => w.filter(
      (M) => !M.installed && !(o != null && o.includes(M.dblEntryUid))
    ),
    [w, o]
  ), { visibleItems: v, sentinelRef: x, hasMore: b } = hw(p), N = P(
    () => Array.from(new Set(t.map((M) => M.bestLanguageName))).map((M) => ({
      label: M,
      value: M
    })),
    [t]
  ), y = g.length === 0 && h.length === 0 && p.length === 0, _ = Bt(n, "%resourcePicker_title%"), k = Bt(n, "%resourcePicker_search_placeholder%"), I = Bt(n, "%resourcePicker_language_filter_any%"), $ = Bt(
    n,
    "%resourcePicker_section_already_selected%"
  ), A = Bt(n, "%resourcePicker_section_installed%"), C = Bt(
    n,
    "%resourcePicker_section_available_to_download%"
  ), T = Bt(n, "%resourcePicker_button_use%"), E = Bt(n, "%resourcePicker_no_results%"), O = Bt(n, "%resourcePicker_showing_count%"), V = P(() => {
    if (l.length === N.length || l.length === 0)
      return I;
    if (l.length === 1) {
      const M = N.find((H) => H.value === l[0]);
      if (M) return M.label;
    }
    return ee(
      Bt(n, "%resourcePicker_language_filter_multipleSelected%"),
      {
        selectCount: l.length
      }
    );
  }, [l, N, I, n]), G = c.length > 0 || l.length > 0;
  return /* @__PURE__ */ u(ot, { children: [
    /* @__PURE__ */ a(cn, { className: "tw:px-4 tw:pt-4", children: /* @__PURE__ */ a(ln, { children: _ }) }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-2 tw:p-4", children: [
      /* @__PURE__ */ a(
        jr,
        {
          value: c,
          onSearch: s,
          placeholder: k,
          isFullWidth: !0
        }
      ),
      /* @__PURE__ */ a(
        Gn,
        {
          entries: N,
          selected: l,
          onChange: d,
          customSelectedText: V,
          placeholder: I,
          variant: "outline"
        }
      )
    ] }),
    G && /* @__PURE__ */ a("p", { className: "tw:px-4 tw:pb-1 tw:text-right tw:text-xs tw:text-muted-foreground", children: ee(O, {
      filtered: w.length,
      total: t.length
    }) }),
    /* @__PURE__ */ u("div", { className: "tw:flex-1 tw:overflow-y-auto tw:px-4 tw:pb-4", children: [
      y && !e && /* @__PURE__ */ a("p", { className: "tw:py-8 tw:text-center tw:text-muted-foreground", children: E }),
      e && /* @__PURE__ */ a("p", { className: "tw:py-8 tw:text-center", children: /* @__PURE__ */ a(Yn, {}) }),
      !y && !e && /* @__PURE__ */ u(ot, { children: [
        /* @__PURE__ */ a(ea, { label: $, resources: g }),
        /* @__PURE__ */ a(
          ea,
          {
            label: A,
            resources: h,
            useLabel: T,
            onSelect: i
          }
        ),
        /* @__PURE__ */ a(
          ea,
          {
            label: C,
            resources: v,
            useLabel: T,
            onSelect: i
          }
        ),
        b && /* @__PURE__ */ a("div", { ref: x, "aria-hidden": !0 })
      ] })
    ] })
  ] });
}
const mw = "16rem", vw = "3rem", Xn = at.createContext(void 0);
function Br() {
  const t = at.useContext(Xn);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function bw({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: n,
  children: i,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: c = "primary",
  ...s
}) {
  const [l, d] = at.useState(t), w = e ?? l, g = at.useCallback(
    (_) => {
      const k = typeof _ == "function" ? _(w) : _;
      r ? r(k) : d(k);
    },
    [r, w]
  ), h = at.useCallback(() => g((_) => !_), [g]), p = w ? "expanded" : "collapsed", b = it() === "ltr" ? c : c === "primary" ? "secondary" : "primary", N = at.useMemo(
    () => ({
      state: p,
      open: w,
      setOpen: g,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: b
    }),
    [p, w, g, h, b]
  ), y = {
    "--sidebar-width": mw,
    "--sidebar-width-icon": vw,
    ...n
  };
  return /* @__PURE__ */ a(Xn.Provider, { value: N, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: y,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...s,
      children: i
    }
  ) });
}
function xw({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = Br();
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
function kp({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = Br();
  return /* @__PURE__ */ u(
    j,
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
        n === "primary" ? /* @__PURE__ */ a(bi, {}) : /* @__PURE__ */ a(xi, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function _p({ className: t, ...e }) {
  const { toggleSidebar: r } = Br();
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
function yw({ className: t, ...e }) {
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
function Np({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    lr,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: f("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Cp({ className: t, ...e }) {
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
function Ep({ className: t, ...e }) {
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
function zp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    je,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: f("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function kw({ className: t, ...e }) {
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
function Eo({ className: t, ...e }) {
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
function zo({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? fe.Root : "div";
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
function Tp({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? fe.Root : "button";
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
function To({ className: t, ...e }) {
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
function _w({ className: t, ...e }) {
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
function Nw({ className: t, ...e }) {
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
const Cw = Wt(
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
function Ew({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...c
}) {
  const s = t ? fe.Root : "button", { state: l } = Br(), d = /* @__PURE__ */ a(
    s,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: f(Cw({ variant: r, size: o }), i),
      ...c
    }
  );
  return n ? /* @__PURE__ */ u(Nt, { children: [
    /* @__PURE__ */ a(Ct, { asChild: !0, children: d }),
    /* @__PURE__ */ a(
      Et,
      {
        side: "right",
        align: "center",
        hidden: l !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : d;
}
function Sp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? fe.Root : "button";
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
function Dp({ className: t, ...e }) {
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
function Rp({
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
      className: f("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(va, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          va,
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
function Mp({ className: t, ...e }) {
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
function $p({ className: t, ...e }) {
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
function Ap({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? fe.Root : "a";
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
function zw({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: s,
  className: l
}) {
  const d = B(
    (h, p) => {
      o(h, p);
    },
    [o]
  ), w = B(
    (h) => {
      const p = r.find((v) => v.projectId === h);
      return p ? p.projectName : h;
    },
    [r]
  ), g = B(
    (h) => !n.projectId && h === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    xw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw:w-96 tw:gap-2 tw:overflow-y-auto", l),
      children: /* @__PURE__ */ u(kw, { children: [
        /* @__PURE__ */ u(Eo, { children: [
          /* @__PURE__ */ a(zo, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(To, { children: /* @__PURE__ */ a(_w, { children: Object.entries(e).map(([h, p]) => /* @__PURE__ */ a(Nw, { children: /* @__PURE__ */ a(
            Ew,
            {
              onClick: () => d(h),
              isActive: g(h),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: p })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ u(Eo, { children: [
          /* @__PURE__ */ a(zo, { className: "tw:text-sm", children: c }),
          /* @__PURE__ */ a(To, { className: "tw:pl-3", children: /* @__PURE__ */ a(
            pa,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
              }),
              popoverContentStyle: { zIndex: nn },
              options: r.flatMap((h) => h.projectId),
              getOptionLabel: w,
              buttonPlaceholder: s,
              onChange: (h) => {
                const p = w(h);
                d(p, h);
              },
              value: (n == null ? void 0 : n.projectId) ?? void 0,
              icon: /* @__PURE__ */ a(ls, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function Op({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: n,
  selectedSidebarItem: i,
  searchValue: c,
  onSearch: s,
  extensionsSidebarGroupLabel: l,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      jr,
      {
        className: "tw:w-9/12",
        value: c,
        onSearch: s,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      bw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            zw,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: n,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: l,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ a(yw, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ue = "scrBook", Tw = "scrRef", Ne = "source", Sw = "details", Dw = "Scripture Reference", Rw = "Scripture Book", Jn = "Type", Mw = "Details";
function $w(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ue,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Dw,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? st.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === ue ? Ce(n.start) : void 0;
      },
      getGroupingValue: (o) => st.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => ia(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ce(o.start),
      id: Tw,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ce(n.start);
      },
      sortingFn: (o, n) => ia(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Ne,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Jn : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Sw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Mw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Aw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || ia(t.start, t.end) === 0 ? `${Ur(t.start)}+${e}` : `${Ur(t.start)}+${e}-${Ur(t.end)}+${r}`;
}, So = (t) => `${Aw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ip({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: i,
  detailsColumnName: c,
  onRowSelected: s,
  id: l
}) {
  const [d, w] = R([]), [g, h] = R([{ id: ue, desc: !1 }]), [p, v] = R({}), x = P(
    () => t.flatMap((T) => T.data.map((E) => ({
      ...E,
      source: T.source
    }))),
    [t]
  ), b = P(
    () => $w(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: c
      },
      r
    ),
    [o, i, c, r]
  );
  W(() => {
    d.includes(Ne) ? h([
      { id: Ne, desc: !1 },
      { id: ue, desc: !1 }
    ]) : h([{ id: ue, desc: !1 }]);
  }, [d]);
  const N = en({
    data: x,
    columns: b,
    state: {
      grouping: d,
      sorting: g,
      rowSelection: p
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: v,
    getExpandedRowModel: fc(),
    getGroupedRowModel: hc(),
    getCoreRowModel: an(),
    getSortedRowModel: rn(),
    getRowId: So,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  W(() => {
    if (s) {
      const T = N.getSelectedRowModel().rowsById, E = Object.keys(T);
      if (E.length === 1) {
        const O = x.find((V) => So(V) === E[0]) || void 0;
        O && s(O);
      }
    }
  }, [p, x, s, N]);
  const y = n ?? Rw, _ = i ?? Jn, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ue] },
    { label: `Group by ${_}`, value: [Ne] },
    {
      label: `Group by ${y} and ${_}`,
      value: [ue, Ne]
    },
    {
      label: `Group by ${_} and ${y}`,
      value: [Ne, ue]
    }
  ], I = (T) => {
    w(JSON.parse(T));
  }, $ = (T, E) => {
    !T.getIsGrouped() && !T.getIsSelected() && T.getToggleSelectedHandler()(E);
  }, A = (T, E) => T.getIsGrouped() ? "" : f("banded-row", E % 2 === 0 ? "even" : "odd"), C = (T, E, O) => {
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
  return /* @__PURE__ */ u("div", { id: l, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ u(
      Ue,
      {
        value: JSON.stringify(d),
        onValueChange: (T) => {
          I(T);
        },
        children: [
          /* @__PURE__ */ a(qe, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Ke, {}) }),
          /* @__PURE__ */ a(Ge, { position: "item-aligned", children: /* @__PURE__ */ a(Rd, { children: k.map((T) => /* @__PURE__ */ a(Lt, { value: JSON.stringify(T.value), children: T.label }, T.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(Lr, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(ja, { children: N.getHeaderGroups().map((T) => /* @__PURE__ */ a(re, { children: T.headers.filter((E) => E.column.columnDef.header).map((E) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Mr, { colSpan: E.colSpan, className: "tw:sticky top-0", children: E.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          E.column.getCanGroup() ? /* @__PURE__ */ a(
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
          er(E.column.columnDef.header, E.getContext())
        ] }) }, E.id)
      )) }, T.id)) }),
      /* @__PURE__ */ a(Vr, { children: N.getRowModel().rows.map((T, E) => {
        const O = it();
        return /* @__PURE__ */ a(
          re,
          {
            "data-state": T.getIsSelected() ? "selected" : "",
            className: f(A(T, E)),
            onClick: (V) => $(T, V),
            children: T.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== Ne || !r)))
                return /* @__PURE__ */ a(
                  ge,
                  {
                    className: f(
                      V.column.columnDef.id,
                      "tw:p-[1px]",
                      C(d, T, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ u(
                      j,
                      {
                        variant: "link",
                        onClick: T.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          T.getIsExpanded() && /* @__PURE__ */ a(sr, {}),
                          !T.getIsExpanded() && (O === "ltr" ? /* @__PURE__ */ a(ds, {}) : /* @__PURE__ */ a(ws, {})),
                          " ",
                          er(V.column.columnDef.cell, V.getContext()),
                          " (",
                          T.subRows.length,
                          ")"
                        ]
                      }
                    ) : er(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          T.id
        );
      }) })
    ] })
  ] });
}
const Ua = (t, e) => t.filter((r) => {
  try {
    return tr(r) === e;
  } catch {
    return !1;
  }
}), Zn = (t, e, r) => Ua(t, e).every((o) => r.includes(o));
function Ow({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = Ua(e, t).length === 0, c = n["%scripture_section_ot_short%"], s = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], d = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    j,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        Zn(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: Pc(
        t,
        c,
        s,
        l,
        d
      )
    }
  );
}
const Do = 5, ra = 6;
function Iw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], c = o["%webView_book_selector_select_books%"], s = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], d = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], g = o["%webView_book_selector_more%"], { otLong: h, ntLong: p, dcLong: v, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, N] = R(!1), [y, _] = R(""), k = Y(void 0), I = Y(!1);
  if (t.length !== st.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const $ = P(() => st.allBookIds.filter(
    (M, H) => t[H] === "1" && !st.isObsolete(st.bookIdToNumber(M))
  ), [t]), A = P(() => {
    if (!y.trim()) {
      const S = {
        [J.OT]: [],
        [J.NT]: [],
        [J.DC]: [],
        [J.Extra]: []
      };
      return $.forEach((U) => {
        const L = tr(U);
        S[L].push(U);
      }), S;
    }
    const M = $.filter(
      (S) => Da(S, y, n)
    ), H = {
      [J.OT]: [],
      [J.NT]: [],
      [J.DC]: [],
      [J.Extra]: []
    };
    return M.forEach((S) => {
      const U = tr(S);
      H[U].push(S);
    }), H;
  }, [$, y, n]), C = B(
    (M, H = !1) => {
      if (!H || !k.current) {
        r(
          e.includes(M) ? e.filter((ct) => ct !== M) : [...e, M]
        ), k.current = M;
        return;
      }
      const S = $.findIndex((ct) => ct === k.current), U = $.findIndex((ct) => ct === M);
      if (S === -1 || U === -1) return;
      const [L, zt] = [
        Math.min(S, U),
        Math.max(S, U)
      ], Rt = $.slice(L, zt + 1).map((ct) => ct);
      r(
        e.includes(M) ? e.filter((ct) => !Rt.includes(ct)) : [.../* @__PURE__ */ new Set([...e, ...Rt])]
      );
    },
    [e, r, $]
  ), T = (M) => {
    C(M, I.current), I.current = !1;
  }, E = (M, H) => {
    M.preventDefault(), C(H, M.shiftKey);
  }, O = B(
    (M) => {
      const H = Ua($, M).map((S) => S);
      r(
        Zn($, M, e) ? e.filter((S) => !H.includes(S)) : [.../* @__PURE__ */ new Set([...e, ...H])]
      );
    },
    [e, r, $]
  ), V = () => {
    r($.map((M) => M));
  }, G = () => {
    r([]);
  };
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(J).map((M) => /* @__PURE__ */ a(
      Ow,
      {
        section: M,
        availableBookIds: $,
        selectedBookIds: e,
        onToggle: O,
        localizedStrings: o
      },
      M
    )) }),
    /* @__PURE__ */ u(
      be,
      {
        open: b,
        onOpenChange: (M) => {
          N(M), M || _("");
        },
        children: [
          /* @__PURE__ */ a(Me, { asChild: !0, children: /* @__PURE__ */ u(
            j,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : c,
                /* @__PURE__ */ a(Io, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ a(xe, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ u(
            De,
            {
              shouldFilter: !1,
              onKeyDown: (M) => {
                M.key === "Enter" && (I.current = M.shiftKey);
              },
              children: [
                /* @__PURE__ */ a(
                  dr,
                  {
                    placeholder: s,
                    value: y,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ a(j, { variant: "ghost", size: "sm", onClick: V, children: l }),
                  /* @__PURE__ */ a(j, { variant: "ghost", size: "sm", onClick: G, children: d })
                ] }),
                /* @__PURE__ */ u(Re, { children: [
                  /* @__PURE__ */ a(Ir, { children: w }),
                  Object.values(J).map((M, H) => {
                    const S = A[M];
                    if (S.length !== 0)
                      return /* @__PURE__ */ u(_a, { children: [
                        /* @__PURE__ */ a(
                          he,
                          {
                            heading: wn(M, h, p, v, x),
                            children: S.map((U) => /* @__PURE__ */ a(
                              pn,
                              {
                                bookId: U,
                                isSelected: e.includes(U),
                                onSelect: () => T(U),
                                onMouseDown: (L) => E(L, U),
                                section: tr(U),
                                showCheck: !0,
                                localizedBookNames: n,
                                commandValue: Qe(U, n),
                                className: "tw:flex tw:items-center"
                              },
                              U
                            ))
                          }
                        ),
                        H < Object.values(J).length - 1 && /* @__PURE__ */ a(dn, {})
                      ] }, M);
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
        e.length === ra ? ra : Do
      ).map((M) => /* @__PURE__ */ a(Be, { className: "tw:hover:bg-secondary", variant: "secondary", children: Le(M, n) }, M)),
      e.length > ra && /* @__PURE__ */ a(
        Be,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - Do} ${g}`
        }
      )
    ] })
  ] });
}
const Pp = Object.freeze([
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
]), ke = (t, e) => t[e] ?? e;
function Lp({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: c,
  localizedBookNames: s,
  id: l
}) {
  const d = ke(
    c,
    "%webView_scope_selector_selected_text%"
  ), w = ke(
    c,
    "%webView_scope_selector_current_verse%"
  ), g = ke(
    c,
    "%webView_scope_selector_current_chapter%"
  ), h = ke(c, "%webView_scope_selector_current_book%"), p = ke(c, "%webView_scope_selector_choose_books%"), v = ke(c, "%webView_scope_selector_scope%"), x = ke(c, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: d, id: "scope-selected-text" },
    { value: "verse", label: w, id: "scope-verse" },
    { value: "chapter", label: g, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: p, id: "scope-selected" }
  ], N = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ u("div", { id: l, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(gt, { children: v }),
      /* @__PURE__ */ a(
        fn,
        {
          value: t,
          onValueChange: r,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: N.map(({ value: y, label: _, id: k }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(ua, { className: "tw:me-2", value: y, id: k }),
            /* @__PURE__ */ a(gt, { htmlFor: k, children: _ })
          ] }, k))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(gt, { children: x }),
      /* @__PURE__ */ a(
        Iw,
        {
          availableBookInfo: o,
          selectedBookIds: n,
          onChangeSelectedBookIds: i,
          localizedStrings: c,
          localizedBookNames: s
        }
      )
    ] })
  ] });
}
const aa = {
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
function Vp({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: c
}) {
  const s = {
    ...aa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([d, w]) => [
          d,
          d === w && d in aa ? aa[d] : w
        ]
      )
    )
  }, l = it();
  return /* @__PURE__ */ u(
    Ue,
    {
      value: `${e}`,
      onValueChange: (d) => r(
        d === "undefined" ? void 0 : parseInt(d, 10)
      ),
      children: [
        /* @__PURE__ */ a(qe, { size: n, className: f("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          Ke,
          {
            placeholder: s[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Ge,
          {
            id: c,
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: We },
            children: t.map((d) => /* @__PURE__ */ a(Lt, { value: `${d}`, children: s[tt(d)] }, `${d}`))
          }
        )
      ]
    }
  );
}
function Fp({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function jp({
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
function Bp({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(je, {}) : ""
  ] });
}
function Qn(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function $r({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: f("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ti = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, c]) => "column" in c && c.column === r || i === r
).sort(([, i], [, c]) => i.order - c.order).flatMap(([i]) => e.filter((s) => s.group === i).sort((s, l) => s.order - l.order).map((s) => /* @__PURE__ */ u(Nt, { children: [
  /* @__PURE__ */ a(Ct, { asChild: !0, children: "command" in s ? /* @__PURE__ */ u(
    Er,
    {
      onClick: () => {
        o(s);
      },
      children: [
        s.iconPathBefore && /* @__PURE__ */ a($r, { icon: s.iconPathBefore, menuLabel: s.label, leading: !0 }),
        s.label,
        s.iconPathAfter && /* @__PURE__ */ a($r, { icon: s.iconPathAfter, menuLabel: s.label })
      ]
    },
    `dropdown-menu-item-${s.label}-${s.command}`
  ) : /* @__PURE__ */ u(Bc, { children: [
    /* @__PURE__ */ a(Uc, { children: s.label }),
    /* @__PURE__ */ a(Vc, { children: /* @__PURE__ */ a(Kc, { children: ti(
      t,
      e,
      Qn(t, s.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${s.label}-${s.id}`) }),
  s.tooltip && /* @__PURE__ */ a(Et, { children: s.tooltip })
] }, `tooltip-${s.label}-${"command" in s ? s.command : s.id}`))) : void 0;
function ba({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: c = "ghost",
  id: s
}) {
  return /* @__PURE__ */ u(se, { variant: i, children: [
    /* @__PURE__ */ a(ce, { "aria-label": r, className: n, asChild: !0, id: s, children: /* @__PURE__ */ a(j, { variant: c, size: "icon", children: o ?? /* @__PURE__ */ a(us, {}) }) }),
    /* @__PURE__ */ a(le, { align: "start", style: { zIndex: We }, children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, d]) => typeof l == "boolean" || typeof d == "boolean" ? 0 : l.order - d.order).map(([l], d, w) => /* @__PURE__ */ u(_a, { children: [
      /* @__PURE__ */ a(gn, { children: /* @__PURE__ */ a(_t, { children: ti(e.groups, e.items, l, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ a(ur, {})
    ] }, l)) })
  ] });
}
const ei = at.forwardRef(
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
function Up({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: i,
  startAreaChildren: c,
  centerAreaChildren: s,
  endAreaChildren: l,
  menuButtonIcon: d
}) {
  return /* @__PURE__ */ u(ei, { className: `tw:w-full tw:border ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      ba,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ a(ps, {}),
        buttonVariant: "ghost"
      }
    ),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: c }),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: s }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        ba,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(gs, {}),
          className: "tw:h-full"
        }
      ),
      l
    ] })
  ] });
}
function Kp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(ei, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    ba,
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
const ri = at.forwardRef(({ className: t, ...e }, r) => {
  const o = it();
  return /* @__PURE__ */ a(
    Ft.Root,
    {
      orientation: "vertical",
      ref: r,
      className: f("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
ri.displayName = Ft.List.displayName;
const ai = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ft.List,
  {
    ref: r,
    className: f(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
ai.displayName = Ft.List.displayName;
const Pw = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ft.Trigger,
  {
    ref: r,
    ...e,
    className: f(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), oi = at.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  Ft.Content,
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
oi.displayName = Ft.Content.displayName;
function qp({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: o,
  headerTitle: n,
  searchClassName: i,
  id: c
}) {
  return /* @__PURE__ */ u("div", { id: c, className: "pr-twp", children: [
    /* @__PURE__ */ u("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      n ? /* @__PURE__ */ a("h1", { children: n }) : "",
      /* @__PURE__ */ a(
        jr,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(ri, { children: [
      /* @__PURE__ */ a(ai, { children: t.map((s) => /* @__PURE__ */ a(Pw, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ a(oi, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
function Lw({
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
  return /* @__PURE__ */ a(Ra.Provider, { value: o, children: /* @__PURE__ */ a(
    Ht.Root,
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
function Vw({ ...t }) {
  return /* @__PURE__ */ a(Ht.Menu, { "data-slot": "menubar-menu", ...t });
}
function Fw({ ...t }) {
  return /* @__PURE__ */ a(Ht.Portal, { "data-slot": "menubar-portal", ...t });
}
function jw({
  className: t,
  ...e
}) {
  const r = de();
  return /* @__PURE__ */ a(
    Ht.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: f(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function Bw({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = de();
  return /* @__PURE__ */ a(Fw, { children: /* @__PURE__ */ a(
    Ht.Content,
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
function Uw({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = de();
  return /* @__PURE__ */ a(
    Ht.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function Kw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ht.Separator,
    {
      "data-slot": "menubar-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function qw({ ...t }) {
  return /* @__PURE__ */ a(Ht.Sub, { "data-slot": "menubar-sub", ...t });
}
function Gw({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = de();
  return /* @__PURE__ */ u(
    Ht.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        $e({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(ya, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function Hw({
  className: t,
  ...e
}) {
  const r = de();
  return /* @__PURE__ */ a(
    Ht.SubContent,
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
const Ze = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, ni = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, c]) => "column" in c && c.column === r || i === r
  ).sort(([, i], [, c]) => i.order - c.order);
  return n.flatMap(([i], c) => {
    const s = e.filter((d) => d.group === i).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(Nt, { children: [
      /* @__PURE__ */ a(Ct, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        Uw,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ a($r, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ a($r, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(qw, { children: [
        /* @__PURE__ */ a(Gw, { children: d.label }),
        /* @__PURE__ */ a(Hw, { children: ni(
          t,
          e,
          Qn(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ a(Et, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), l = [...s];
    return s.length > 0 && c < n.length - 1 && l.push(/* @__PURE__ */ a(Kw, {}, `separator-${i}`)), l;
  });
};
function Ww({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = Y(void 0), i = Y(void 0), c = Y(void 0), s = Y(void 0), l = Y(void 0), d = (w) => {
    switch (w) {
      case "platform.app":
        return i;
      case "platform.window":
        return c;
      case "platform.layout":
        return s;
      case "platform.help":
        return l;
      default:
        return;
    }
  };
  if (xc(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, g) => {
    var v, x, b, N;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        Ze(i, [h]);
        break;
      case "alt+p":
        (v = i.current) == null || v.focus(), Ze(i, [h, p]);
        break;
      case "alt+l":
        (x = c.current) == null || x.focus(), Ze(c, [h, p]);
        break;
      case "alt+n":
        (b = s.current) == null || b.focus(), Ze(s, [h, p]);
        break;
      case "alt+h":
        (N = l.current) == null || N.focus(), Ze(l, [h, p]);
        break;
    }
  }), W(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((p) => {
      p.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const x = v.target.getAttribute("data-state");
          r(x === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((p) => {
      w.observe(p, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(Lw, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, g]) => typeof w == "boolean" || typeof g == "boolean" ? 0 : w.order - g.order).map(([w, g]) => /* @__PURE__ */ u(Vw, { children: [
      /* @__PURE__ */ a(jw, { ref: d(w), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ a(
        Bw,
        {
          style: { zIndex: We },
          children: /* @__PURE__ */ a(_t, { children: ni(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function Gp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function Hp({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuAreaChildren: c,
  configAreaChildren: s,
  shouldUseAsAppDragArea: l,
  menubarVariant: d = "default"
}) {
  const w = Y(void 0);
  return /* @__PURE__ */ a(
    "div",
    {
      className: f("tw:border tw:px-4 tw:text-foreground", o),
      ref: w,
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: l ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  c,
                  t && /* @__PURE__ */ a(
                    Ww,
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
            /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ) })
          ]
        }
      )
    }
  );
}
const Yw = (t, e) => t[e] ?? e;
function Wp({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: c,
  className: s,
  id: l
}) {
  const d = Yw(
    c,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, g] = R(!1), h = (v) => {
    n && n(v), o && o([v, ...r.filter((x) => x !== v)]), i && r.find((x) => x === v) && i([...r.filter((x) => x !== v)]), g(!1);
  }, p = (v, x) => {
    var N, y, _, k, I, $;
    const b = x !== v ? ((y = (N = t[v]) == null ? void 0 : N.uiNames) == null ? void 0 : y[x]) ?? ((k = (_ = t[v]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return b ? `${(I = t[v]) == null ? void 0 : I.autonym} (${b})` : ($ = t[v]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ u("div", { id: l, className: f("pr-twp tw:max-w-sm", s), children: [
    /* @__PURE__ */ u(
      Ue,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (v) => g(v),
        children: [
          /* @__PURE__ */ a(qe, { children: /* @__PURE__ */ a(Ke, {}) }),
          /* @__PURE__ */ a(
            Ge,
            {
              style: { zIndex: We },
              children: Object.keys(t).map((v) => /* @__PURE__ */ a(Lt, { value: v, children: p(v, e) }, v))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(gt, { className: "tw:font-normal tw:text-muted-foreground", children: ee(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((v) => p(v, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Xw({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(gt, { children: e(t) }) : r ? /* @__PURE__ */ a(gt, { children: r(t) }) : /* @__PURE__ */ a(gt, { children: t });
}
function Yp({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: c
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((s) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      Wn,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(s),
        onCheckedChange: (l) => n(s, l)
      }
    ),
    /* @__PURE__ */ a(
      Xw,
      {
        item: s,
        createLabel: i,
        createComplexLabel: c
      }
    )
  ] }, s)) });
}
function Xp({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: i,
  children: c,
  selectedButtons: s,
  hoverButtons: l,
  dropdownContent: d,
  additionalContent: w,
  accentColor: g,
  showDropdownOnHover: h = !1
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: (v) => {
        (v.key === "Enter" || v.key === " ") && (v.preventDefault(), r());
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
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: c }),
            e && s,
            !e && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: l }),
            !e && h && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(se, { children: [
              /* @__PURE__ */ a(ce, { className: f(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(j, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ja, {}) }) }),
              /* @__PURE__ */ a(le, { align: "end", children: d })
            ] }) }),
            e && d && /* @__PURE__ */ u(se, { children: [
              /* @__PURE__ */ a(ce, { className: f(g && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(j, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(Ja, {}) }) }),
              /* @__PURE__ */ a(le, { align: "end", children: d })
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
function Jp({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: i,
  placeholder: c,
  isRequired: s = !1,
  className: l,
  defaultValue: d,
  value: w,
  onChange: g,
  onFocus: h,
  onBlur: p
}) {
  return /* @__PURE__ */ u("div", { className: f("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      gt,
      {
        htmlFor: t,
        className: f({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      lr,
      {
        id: t,
        disabled: e,
        placeholder: c,
        required: s,
        className: f(l, { "tw:border-red-600": r }),
        defaultValue: d,
        value: w,
        onChange: g,
        onFocus: h,
        onBlur: p
      }
    ),
    /* @__PURE__ */ a("p", { className: f({ "tw:hidden": !n }), children: n })
  ] });
}
const Jw = Wt(
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
function Zp({
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
        Jw({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Qp({ className: t, ...e }) {
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
function tg({ className: t, ...e }) {
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
function eg({ ...t }) {
  return /* @__PURE__ */ a(mt.Root, { "data-slot": "context-menu", ...t });
}
function rg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    mt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: f("tw:select-none", t),
      ...e
    }
  );
}
function ag({ ...t }) {
  return /* @__PURE__ */ a(mt.Group, { "data-slot": "context-menu-group", ...t });
}
function og({ ...t }) {
  return /* @__PURE__ */ a(mt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function ng({ ...t }) {
  return /* @__PURE__ */ a(mt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function ig({
  ...t
}) {
  return /* @__PURE__ */ a(mt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function sg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(mt.Portal, { children: /* @__PURE__ */ a(
    mt.Content,
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
function cg({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    mt.Item,
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
function lg({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    mt.SubTrigger,
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
        /* @__PURE__ */ a(ya, { className: "tw:ms-auto" })
      ]
    }
  );
}
function dg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    mt.SubContent,
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
function wg({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    mt.CheckboxItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(mt.ItemIndicator, { children: /* @__PURE__ */ a(Te, {}) }) }),
        e
      ]
    }
  );
}
function ug({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    mt.RadioItem,
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
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(mt.ItemIndicator, { children: /* @__PURE__ */ a(Te, {}) }) }),
        e
      ]
    }
  );
}
function pg({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    mt.Label,
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
function gg({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    mt.Separator,
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
function hg({ className: t, ...e }) {
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
function fg({ ...t }) {
  return /* @__PURE__ */ a(me.Root, { "data-slot": "drawer", ...t });
}
function mg({ ...t }) {
  return /* @__PURE__ */ a(me.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Zw({ ...t }) {
  return /* @__PURE__ */ a(me.Portal, { "data-slot": "drawer-portal", ...t });
}
function vg({ ...t }) {
  return /* @__PURE__ */ a(me.Close, { "data-slot": "drawer-close", ...t });
}
function Qw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    me.Overlay,
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
function bg({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = it();
  return /* @__PURE__ */ u(Zw, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Qw, {}),
    /* @__PURE__ */ u(
      me.Content,
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
function xg({ className: t, ...e }) {
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
function yg({ className: t, ...e }) {
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
function kg({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    me.Title,
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
function _g({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    me.Description,
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
function Ng({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    qa.Root,
    {
      "data-slot": "progress",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        qa.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Cg({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    za.Group,
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
function br(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Eg({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...n
}) {
  return /* @__PURE__ */ a(
    za.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: br(t),
      minSize: br(e),
      maxSize: br(r),
      collapsedSize: br(o),
      ...n
    }
  );
}
function zg({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    za.Separator,
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
function Tg({ ...t }) {
  const { theme: e = "system" } = yc();
  return /* @__PURE__ */ a(
    kc,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Ci, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Ni, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(_i, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(ki, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(yi, { className: "tw:size-4 tw:animate-spin" })
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
function Sg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const c = it(), s = at.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    pr.Root,
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
      dir: c,
      ...i,
      children: [
        /* @__PURE__ */ a(
          pr.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              pr.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: s.length }, (l, d) => /* @__PURE__ */ a(
          pr.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
          },
          d
        ))
      ]
    }
  );
}
function Dg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Ga.Root,
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
        Ga.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Rg({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    Ft.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: f("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const tu = Wt(
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
function Mg({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = it();
  return /* @__PURE__ */ a(
    Ft.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: f("pr-twp", tu({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function $g({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ft.Trigger,
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
function Ag({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Ft.Content,
    {
      "data-slot": "tabs-content",
      className: f("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Og = (t, e) => {
  W(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function eu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const ru = (t, e, r = {}) => {
  const o = Y(e);
  o.current = e;
  const n = Y(r);
  n.current = eu(n.current);
  const [i, c] = R(() => o.current), [s, l] = R(!0);
  return W(() => {
    let d = !0;
    return l(!!t), (async () => {
      if (t) {
        const w = await t();
        d && (c(() => w), l(!1));
      }
    })(), () => {
      d = !1, n.current.preserveValue || c(() => o.current);
    };
  }, [t]), [i, s];
}, oa = () => !1, Ig = (t, e) => {
  const [r] = ru(
    B(async () => {
      if (!t) return oa;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    oa,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  W(() => () => {
    r !== oa && r();
  }, [r]);
};
function Pg(t) {
  W(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function au(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
au(`.banded-row:hover {
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1{top:calc(calc(var(--spacing)) * 1)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-8\\.5{height:calc(calc(var(--spacing)) * 8.5)}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-px{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-pt-10{scroll-padding-top:calc(calc(var(--spacing)) * 10)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-accent-foreground{background-color:var(--accent-foreground)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-card-foreground{background-color:var(--card-foreground)}.tw\\:bg-destructive-foreground{background-color:var(--destructive-foreground)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted{background-color:var(--muted)}.tw\\:bg-muted-foreground{background-color:var(--muted-foreground)}.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-popover-foreground{background-color:var(--popover-foreground)}.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-secondary-foreground{background-color:var(--secondary-foreground)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-8\\!{padding-inline-end:calc(calc(var(--spacing)) * 8)!important}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent{color:var(--accent)}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card{color:var(--card)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted{color:var(--muted)}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover{color:var(--popover)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary{color:var(--secondary)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:\\!\\[scrollbar-width\\:thin\\]{scrollbar-width:thin!important}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary:hover,.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/50:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/50:hover{background-color:color-mix(in oklab, var(--secondary) 50%, transparent)}}.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on],.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:bg-popover:where([data-selected=true]){background-color:var(--popover)}.tw\\:data-selected\\:bg-primary:where([data-selected=true]){background-color:var(--primary)}.tw\\:data-selected\\:bg-secondary:where([data-selected=true]){background-color:var(--secondary)}.tw\\:data-selected\\:bg-transparent:where([data-selected=true]){background-color:#0000}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-selected\\:text-inherit:where([data-selected=true]){color:inherit}.tw\\:data-selected\\:text-primary:where([data-selected=true]){color:var(--primary)}.tw\\:data-selected\\:text-primary-foreground:where([data-selected=true]){color:var(--primary-foreground)}.tw\\:data-selected\\:text-secondary-foreground:where([data-selected=true]){color:var(--secondary-foreground)}.tw\\:data-selected\\:ring-3:where([data-selected=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-selected\\:ring-ring\\/50:where([data-selected=true]){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:data-selected\\:ring-inset:where([data-selected=true]){--tw-ring-inset:inset}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:hidden svg{display:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:\\:-webkit-scrollbar\\]\\:\\!block::-webkit-scrollbar{display:block!important}.tw\\:\\[\\&\\:\\:-webkit-scrollbar\\]\\:\\!w-2::-webkit-scrollbar{width:calc(calc(var(--spacing)) * 2)!important}.tw\\:\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:rounded::-webkit-scrollbar-thumb{border-radius:.25rem}.tw\\:\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-muted-foreground\\/30::-webkit-scrollbar-thumb{background-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-muted-foreground\\/30::-webkit-scrollbar-thumb{background-color:color-mix(in oklab, var(--muted-foreground) 30%, transparent)}}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:hidden>svg{display:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg,.tw\\:\\[\\&\\>svg\\:last-child\\]\\:hidden>svg:last-child{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  Zp as Alert,
  tg as AlertDescription,
  Qp as AlertTitle,
  zd as Avatar,
  Td as AvatarFallback,
  Xu as AvatarImage,
  Vu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Fu as BOOK_SELECTOR_STRING_KEYS,
  Be as Badge,
  Lu as BookChapterControl,
  ga as BookSelectionMode,
  ju as BookSelector,
  j as Button,
  Va as ButtonGroup,
  Un as ButtonGroupSeparator,
  Bu as ButtonGroupText,
  Kn as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  Ku as COMMENT_EDITOR_STRING_KEYS,
  qu as COMMENT_LIST_STRING_KEYS,
  qn as CancelAcceptButtons,
  Cd as Card,
  Ed as CardContent,
  Wu as CardDescription,
  Yu as CardFooter,
  Gu as CardHeader,
  Hu as CardTitle,
  Qc as ChapterRangeSelector,
  Wn as Checkbox,
  Yp as Checklist,
  pa as ComboBox,
  De as Command,
  Ir as CommandEmpty,
  he as CommandGroup,
  dr as CommandInput,
  ve as CommandItem,
  Re as CommandList,
  Uu as CommentEditor,
  Ju as CommentList,
  eg as ContextMenu,
  wg as ContextMenuCheckboxItem,
  sg as ContextMenuContent,
  ag as ContextMenuGroup,
  cg as ContextMenuItem,
  pg as ContextMenuLabel,
  og as ContextMenuPortal,
  ig as ContextMenuRadioGroup,
  ug as ContextMenuRadioItem,
  gg as ContextMenuSeparator,
  hg as ContextMenuShortcut,
  ng as ContextMenuSub,
  dg as ContextMenuSubContent,
  lg as ContextMenuSubTrigger,
  rg as ContextMenuTrigger,
  Vd as DataTable,
  Sc as Dialog,
  Su as DialogClose,
  Mc as DialogContent,
  Ru as DialogDescription,
  Du as DialogFooter,
  cn as DialogHeader,
  Rc as DialogOverlay,
  Dc as DialogPortal,
  ln as DialogTitle,
  Tu as DialogTrigger,
  fg as Drawer,
  vg as DrawerClose,
  bg as DrawerContent,
  _g as DrawerDescription,
  yg as DrawerFooter,
  xg as DrawerHeader,
  Qw as DrawerOverlay,
  Zw as DrawerPortal,
  kg as DrawerTitle,
  mg as DrawerTrigger,
  se as DropdownMenu,
  pe as DropdownMenuCheckboxItem,
  le as DropdownMenuContent,
  gn as DropdownMenuGroup,
  Er as DropdownMenuItem,
  Bd as DropdownMenuItemType,
  wr as DropdownMenuLabel,
  Vc as DropdownMenuPortal,
  Fc as DropdownMenuRadioGroup,
  jc as DropdownMenuRadioItem,
  ur as DropdownMenuSeparator,
  Iu as DropdownMenuShortcut,
  Bc as DropdownMenuSub,
  Kc as DropdownMenuSubContent,
  Uc as DropdownMenuSubTrigger,
  ce as DropdownMenuTrigger,
  Fd as ERROR_DUMP_STRING_KEYS,
  ap as ERROR_POPOVER_STRING_KEYS,
  Gd as EditorKeyboardShortcuts,
  jd as ErrorDump,
  op as ErrorPopover,
  dp as FOOTNOTE_EDITOR_STRING_KEYS,
  cp as Filter,
  np as FilterDropdown,
  sp as Footer,
  lp as FootnoteEditor,
  sw as FootnoteItem,
  wp as FootnoteList,
  vp as INVENTORY_STRING_KEYS,
  lr as Input,
  bp as Inventory,
  _o as Kbd,
  gt as Label,
  Zd as MARKER_MENU_STRING_KEYS,
  rp as MarkdownRenderer,
  tw as MarkerMenu,
  ip as MoreInfo,
  Gn as MultiSelectComboBox,
  qp as NavigationContentSearch,
  be as Popover,
  Lc as PopoverAnchor,
  xe as PopoverContent,
  Ou as PopoverDescription,
  $u as PopoverHeader,
  Au as PopoverTitle,
  Me as PopoverTrigger,
  Ng as Progress,
  xp as RESOURCE_PICKER_DIALOG_STRING_KEYS,
  fn as RadioGroup,
  ua as RadioGroupItem,
  qc as RecentSearches,
  zg as ResizableHandle,
  Eg as ResizablePanel,
  Cg as ResizablePanelGroup,
  yp as ResourcePickerDialog,
  Xp as ResultsCard,
  Pp as SCOPE_SELECTOR_STRING_KEYS,
  Lp as ScopeSelector,
  Ip as ScriptureResultsViewer,
  Vp as ScrollGroupSelector,
  jr as SearchBar,
  Ue as Select,
  Ge as SelectContent,
  Rd as SelectGroup,
  Lt as SelectItem,
  Zu as SelectLabel,
  $d as SelectScrollDownButton,
  Md as SelectScrollUpButton,
  Qu as SelectSeparator,
  qe as SelectTrigger,
  Ke as SelectValue,
  je as Separator,
  Fp as SettingsList,
  Bp as SettingsListHeader,
  jp as SettingsListItem,
  zw as SettingsSidebar,
  Op as SettingsSidebarContentSearch,
  xw as Sidebar,
  kw as SidebarContent,
  Ep as SidebarFooter,
  Eo as SidebarGroup,
  Tp as SidebarGroupAction,
  To as SidebarGroupContent,
  zo as SidebarGroupLabel,
  Cp as SidebarHeader,
  Np as SidebarInput,
  yw as SidebarInset,
  _w as SidebarMenu,
  Sp as SidebarMenuAction,
  Dp as SidebarMenuBadge,
  Ew as SidebarMenuButton,
  Nw as SidebarMenuItem,
  Rp as SidebarMenuSkeleton,
  Mp as SidebarMenuSub,
  Ap as SidebarMenuSubButton,
  $p as SidebarMenuSubItem,
  bw as SidebarProvider,
  _p as SidebarRail,
  zp as SidebarSeparator,
  kp as SidebarTrigger,
  va as Skeleton,
  Sg as Slider,
  Tg as Sonner,
  Yn as Spinner,
  Dg as Switch,
  ba as TabDropdownMenu,
  Kp as TabFloatingMenu,
  Up as TabToolbar,
  Lr as Table,
  Vr as TableBody,
  ep as TableCaption,
  ge as TableCell,
  tp as TableFooter,
  Mr as TableHead,
  ja as TableHeader,
  re as TableRow,
  Rg as Tabs,
  Ag as TabsContent,
  Mg as TabsList,
  $g as TabsTrigger,
  Jp as TextField,
  Mu as Textarea,
  Pn as ToggleGroup,
  kr as ToggleGroupItem,
  Hp as Toolbar,
  Nt as Tooltip,
  Et as TooltipContent,
  _t as TooltipProvider,
  Ct as TooltipTrigger,
  Kd as UNDO_REDO_BUTTONS_STRING_KEYS,
  Wp as UiLanguageSelector,
  qd as UndoRedoButtons,
  ri as VerticalTabs,
  oi as VerticalTabsContent,
  ai as VerticalTabsList,
  Pw as VerticalTabsTrigger,
  We as Z_INDEX_ABOVE_DOCK,
  on as Z_INDEX_FOOTNOTE_EDITOR,
  zc as Z_INDEX_MODAL,
  Ec as Z_INDEX_MODAL_BACKDROP,
  nn as Z_INDEX_OVERLAY,
  Nd as badgeVariants,
  bd as buttonGroupVariants,
  sn as buttonVariants,
  f as cn,
  mp as getBookIdFromUSFM,
  Fr as getInventoryHeader,
  hp as getLinesFromUSFM,
  fp as getNumberFromUSFM,
  uw as getStatusForItem,
  Gp as getToolbarOSReservedSpaceClassName,
  pp as inventoryCountColumn,
  up as inventoryItemColumn,
  gp as inventoryStatusColumn,
  Fg as sonner,
  Og as useEvent,
  Ig as useEventAsync,
  _d as useListbox,
  ru as usePromise,
  Pu as useRecentSearches,
  Br as useSidebar,
  Pg as useStylesheet
};
//# sourceMappingURL=index.js.map
