<<<<<<< HEAD
<<<<<<< HEAD
var cs = Object.defineProperty;
var ds = (t, e, n) => e in t ? cs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => ds(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as d, Fragment as ct } from "react/jsx-runtime";
import b, { forwardRef as nn, useRef as Y, useMemo as F, useState as R, useCallback as K, useLayoutEffect as Zt, createContext as kn, useContext as mr, useEffect as q, Component as ps, createElement as Lr, Suspense as us, Fragment as uo } from "react";
import { Command as kt } from "cmdk";
import { X as $e, Search as mo, Check as Vt, Clock as Vr, ChevronsLeft as jr, ChevronsRight as zr, ChevronLeft as Yn, ChevronRight as Se, ArrowLeft as ms, ArrowRight as fs, Circle as _n, ChevronDown as Le, BoldIcon as hs, ItalicIcon as gs, AtSign as fo, Pencil as bs, Trash2 as vs, ArrowUp as ho, MoreHorizontal as xs, MailOpen as ys, Mail as Ns, ChevronUp as go, FilterIcon as ks, ArrowLeftIcon as _s, ChevronLeftIcon as Cs, ChevronRightIcon as Es, ArrowRightIcon as Ts, Copy as bo, Filter as Rs, User as Ss, Link as Ds, CircleHelp as Ms, ChevronsUpDown as vo, Star as Os, SquareX as xo, FunctionSquare as yo, SquareSigma as No, Ban as Is, AlertCircle as Xn, CircleCheckIcon as As, CircleXIcon as Ps, CircleHelpIcon as $s, ArrowUpIcon as Ls, ArrowDownIcon as Vs, PanelLeft as js, PanelRight as zs, ScrollText as Fs, MenuIcon as Bs, Menu as Ks, EllipsisVertical as Gs, MoreVertical as Fr, LoaderCircle as qs, GripVertical as Us } from "lucide-react";
import { clsx as Hs } from "clsx";
import { extendTailwindMerge as Ys } from "tailwind-merge";
import * as $t from "@radix-ui/react-dialog";
import { Canon as wt } from "@sillsdev/scripture";
import { includes as ln, Section as U, getChaptersForBook as Xs, formatScrRef as ve, getSectionForBook as He, formatRelativeDate as Ws, formatReplacementString as be, sanitizeHtml as Js, NumberFormat as Zs, formatBytes as Qs, getCurrentLocale as ti, usfmMarkers as un, getFormatCallerFunction as ei, deepEqual as ni, isString as Br, compareScrRefs as Wn, scrRefToBBBCCCVVV as An, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as Ve } from "@radix-ui/react-slot";
import { cva as pe } from "class-variance-authority";
import * as De from "@radix-ui/react-popover";
import * as ko from "@radix-ui/react-label";
import * as Ze from "@radix-ui/react-radio-group";
import { createEditor as _o, $getRoot as le, $createParagraphNode as Cn, $getSelection as Lt, HISTORY_MERGE_TAG as fr, ParagraphNode as Co, TextNode as Eo, $isTokenOrSegmented as ri, $getCharacterOffsets as oi, $cloneWithPropertiesEphemeral as ai, $findMatchingParent as To, $isElementNode as se, $isRangeSelection as Ne, CLEAR_EDITOR_COMMAND as Ro, COMMAND_PRIORITY_EDITOR as So, mergeRegister as we, shallowMergeConfig as si, defineExtension as Gt, safeCast as rn, createState as ii, FORMAT_TEXT_COMMAND as Do, $isNodeSelection as Mo, COMMAND_PRIORITY_LOW as Oo, RootNode as li, LineBreakNode as wi, TabNode as ci, $isEditorState as di, createCommand as pi, CLICK_COMMAND as ui, isDOMNode as mi, $getNodeFromDOMNode as fi, $createNodeSelection as hi, $setSelection as gi, DecoratorNode as Jn, $getState as bi, toggleTextFormatType as Kr, TEXT_TYPE_TO_FORMAT as vi, $setState as xi, addClassNamesToElement as Io, $create as yi, $getNodeByKey as Ni, removeClassNamesFromElement as ki, KEY_TAB_COMMAND as _i, $isBlockElementNode as hn, $createRangeSelection as Ci, $normalizeSelection__EXPERIMENTAL as Ei, OUTDENT_CONTENT_COMMAND as Ti, INDENT_CONTENT_COMMAND as Gr, INSERT_TAB_COMMAND as Ri, COMMAND_PRIORITY_CRITICAL as hr, $isDecoratorNode as Si, $isParagraphNode as Di, $isTextNode as gn, SELECTION_CHANGE_COMMAND as Ao, getRegisteredNode as Mi, isHTMLElement as Oi, isDocumentFragment as qr, isDOMDocumentNode as Ii, ArtificialNode__DO_NOT_USE as Po, $createLineBreakNode as $o, $isRootOrShadowRoot as Ai, isBlockDomNode as Ur, isInlineDomNode as Hr, $insertNodes as Pi } from "lexical";
import * as je from "@radix-ui/react-tooltip";
import { TooltipTrigger as $i } from "@radix-ui/react-tooltip";
import { HeadingNode as Li, QuoteNode as Vi, registerRichText as ji } from "@lexical/rich-text";
import { flushSync as zi, createPortal as Fi } from "react-dom";
import { $isTableSelection as Bi } from "@lexical/table";
import * as En from "@radix-ui/react-toggle-group";
import * as Lo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Vo } from "@lexical/headless";
import * as jo from "@radix-ui/react-separator";
import * as ze from "@radix-ui/react-avatar";
import * as ot from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ki } from "@radix-ui/react-dropdown-menu";
import { useReactTable as zo, getFilteredRowModel as Gi, getSortedRowModel as Fo, getPaginationRowModel as qi, getCoreRowModel as Bo, flexRender as Ye, getGroupedRowModel as Ui, getExpandedRowModel as Hi } from "@tanstack/react-table";
import * as lt from "@radix-ui/react-select";
import Yi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Zn, HIDDEN_NOTE_CALLER as Qn, getDefaultViewOptions as Xi, isInsertEmbedOpOfType as wn, Editorial as Wi } from "@eten-tech-foundation/platform-editor";
import * as tr from "@radix-ui/react-checkbox";
import * as _t from "@radix-ui/react-tabs";
import * as at from "@radix-ui/react-menubar";
import { useHotkeys as Ji } from "react-hotkeys-hook";
import * as st from "@radix-ui/react-context-menu";
import { Drawer as jt } from "vaul";
import * as er from "@radix-ui/react-progress";
import * as gr from "react-resizable-panels";
import { Toaster as Zi } from "sonner";
import { toast as fu } from "sonner";
import * as Ue from "@radix-ui/react-slider";
import * as nr from "@radix-ui/react-switch";
const Qi = Ys({ prefix: "tw-" });
function m(...t) {
  return Qi(Hs(t));
}
const tl = "layoutDirection";
function ft() {
  const t = localStorage.getItem(tl);
  return t === "rtl" ? t : "ltr";
}
const el = $t.Root, nl = $t.Portal, Ko = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Overlay,
=======
var Es = Object.defineProperty;
var Ts = (t, e, n) => e in t ? Es(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => Ts(t, typeof e != "symbol" ? e + "" : e, n);
=======
var Ts = Object.defineProperty;
var Rs = (t, e, n) => e in t ? Ts(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => Rs(t, typeof e != "symbol" ? e + "" : e, n);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
import { jsx as r, jsxs as w, Fragment as et } from "react/jsx-runtime";
import b, { forwardRef as an, useRef as H, useMemo as K, useState as T, useCallback as j, useLayoutEffect as ne, createContext as Tn, useContext as br, useEffect as G, Component as Ss, createElement as Wr, Suspense as Ds, Fragment as Eo } from "react";
import { Command as kt } from "cmdk";
import { X as je, Search as To, Check as zt, Clock as Jr, ChevronsLeft as Zr, ChevronsRight as Qr, ChevronLeft as Zn, ChevronRight as Oe, ArrowLeft as Ms, ArrowRight as Os, Circle as Rn, ChevronDown as ze, BoldIcon as Is, ItalicIcon as As, AtSign as Ro, Pencil as Ps, Trash2 as Ls, ArrowUp as So, MoreHorizontal as Do, MailOpen as $s, Mail as Vs, ChevronUp as Mo, FilterIcon as js, ArrowLeftIcon as zs, ChevronLeftIcon as Fs, ChevronRightIcon as Bs, ArrowRightIcon as Ks, Copy as Oo, Filter as Gs, User as Us, Link as Hs, CircleHelp as qs, ChevronsUpDown as Io, Star as Ys, SquareX as Ao, FunctionSquare as Po, SquareSigma as Lo, Ban as Xs, AlertCircle as Qn, CircleCheckIcon as Ws, CircleXIcon as Js, CircleHelpIcon as Zs, ArrowUpIcon as Qs, ArrowDownIcon as ti, PanelLeft as ei, PanelRight as ni, ScrollText as ri, MenuIcon as oi, Menu as ai, EllipsisVertical as si, LoaderCircle as ii, GripVertical as li } from "lucide-react";
import { clsx as ci } from "clsx";
import { extendTailwindMerge as di } from "tailwind-merge";
import * as Dt from "@radix-ui/react-dialog";
import { Canon as dt } from "@sillsdev/scripture";
import { includes as pn, Section as q, getChaptersForBook as wi, formatScrRef as xe, getSectionForBook as Xe, formatRelativeDate as pi, formatReplacementString as ve, sanitizeHtml as ui, NumberFormat as mi, formatBytes as fi, getCurrentLocale as hi, usfmMarkers as gn, getFormatCallerFunction as gi, deepEqual as bi, isString as to, compareScrRefs as tr, scrRefToBBBCCCVVV as Vn, getLocalizeKeyForScrollGroupId as tt } from "platform-bible-utils";
import { Slot as Fe } from "@radix-ui/react-slot";
import { cva as pe } from "class-variance-authority";
import * as le from "@radix-ui/react-popover";
import * as $o from "@radix-ui/react-label";
import * as tn from "@radix-ui/react-radio-group";
import { createEditor as Vo, $getRoot as ce, $createParagraphNode as Sn, $getSelection as Vt, HISTORY_MERGE_TAG as vr, ParagraphNode as jo, TextNode as zo, $isTokenOrSegmented as vi, $getCharacterOffsets as xi, $cloneWithPropertiesEphemeral as yi, $findMatchingParent as Fo, $isElementNode as se, $isRangeSelection as ke, CLEAR_EDITOR_COMMAND as Bo, COMMAND_PRIORITY_EDITOR as Ko, mergeRegister as de, shallowMergeConfig as Ni, defineExtension as Xt, safeCast as sn, createState as ki, FORMAT_TEXT_COMMAND as Go, $isNodeSelection as Uo, COMMAND_PRIORITY_LOW as Ho, RootNode as _i, LineBreakNode as Ci, TabNode as Ei, $isEditorState as Ti, createCommand as Ri, CLICK_COMMAND as Si, isDOMNode as Di, $getNodeFromDOMNode as Mi, $createNodeSelection as Oi, $setSelection as Ii, DecoratorNode as er, $getState as Ai, toggleTextFormatType as eo, TEXT_TYPE_TO_FORMAT as Pi, $setState as Li, addClassNamesToElement as qo, $create as $i, $getNodeByKey as Vi, removeClassNamesFromElement as ji, KEY_TAB_COMMAND as zi, $isBlockElementNode as yn, $createRangeSelection as Fi, $normalizeSelection__EXPERIMENTAL as Bi, OUTDENT_CONTENT_COMMAND as Ki, INDENT_CONTENT_COMMAND as no, INSERT_TAB_COMMAND as Gi, COMMAND_PRIORITY_CRITICAL as xr, $isDecoratorNode as Ui, $isParagraphNode as Hi, $isTextNode as Nn, SELECTION_CHANGE_COMMAND as Yo, getRegisteredNode as qi, isHTMLElement as Yi, isDocumentFragment as ro, isDOMDocumentNode as Xi, ArtificialNode__DO_NOT_USE as Xo, $createLineBreakNode as Wo, $isRootOrShadowRoot as Wi, isBlockDomNode as oo, isInlineDomNode as ao, $insertNodes as Ji } from "lexical";
import * as Be from "@radix-ui/react-tooltip";
import { TooltipTrigger as Zi } from "@radix-ui/react-tooltip";
import { HeadingNode as Qi, QuoteNode as tl, registerRichText as el } from "@lexical/rich-text";
import { flushSync as nl, createPortal as rl } from "react-dom";
import { $isTableSelection as ol } from "@lexical/table";
import * as Dn from "@radix-ui/react-toggle-group";
import * as Jo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Zo } from "@lexical/headless";
import * as Qo from "@radix-ui/react-separator";
import * as Ke from "@radix-ui/react-avatar";
import * as at from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as al } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ta, getFilteredRowModel as sl, getSortedRowModel as ea, getPaginationRowModel as il, getCoreRowModel as na, flexRender as We, getGroupedRowModel as ll, getExpandedRowModel as cl } from "@tanstack/react-table";
import * as ct from "@radix-ui/react-select";
import dl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as nr, HIDDEN_NOTE_CALLER as rr, getDefaultViewOptions as wl, isInsertEmbedOpOfType as un, Editorial as pl } from "@eten-tech-foundation/platform-editor";
import * as or from "@radix-ui/react-checkbox";
import * as _t from "@radix-ui/react-tabs";
import * as st from "@radix-ui/react-menubar";
import { useHotkeys as ul } from "react-hotkeys-hook";
import * as it from "@radix-ui/react-context-menu";
import { Drawer as Ft } from "vaul";
import * as ar from "@radix-ui/react-progress";
import * as yr from "react-resizable-panels";
import { Toaster as ml } from "sonner";
import { toast as Qu } from "sonner";
import * as Ye from "@radix-ui/react-slider";
import * as sr from "@radix-ui/react-switch";
const fl = di({ prefix: "tw-" });
function f(...t) {
  return fl(ci(t));
}
const hl = "layoutDirection";
function wt() {
  const t = localStorage.getItem(hl);
  return t === "rtl" ? t : "ltr";
}
const ra = Dt.Root, oa = Dt.Portal, Nr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Overlay,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Ko.displayName = $t.Overlay.displayName;
const Go = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ft();
  return /* @__PURE__ */ d(nl, { children: [
    /* @__PURE__ */ r(Ko, {}),
    /* @__PURE__ */ d(
      $t.Content,
=======
yr.displayName = Dt.Overlay.displayName;
const ra = b.forwardRef(({ className: t, children: e, ...n }, o) => {
=======
Nr.displayName = Dt.Overlay.displayName;
const aa = b.forwardRef(({ className: t, children: e, ...n }, o) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const a = wt();
  return /* @__PURE__ */ w(oa, { children: [
    /* @__PURE__ */ r(Nr, {}),
    /* @__PURE__ */ w(
      Dt.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
                /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
aa.displayName = Dt.Content.displayName;
function kr({ className: t, ...e }) {
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
kr.displayName = "DialogHeader";
function _r({ className: t, ...e }) {
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
_r.displayName = "DialogFooter";
const Cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Uo.displayName = $t.Title.displayName;
const rl = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Description,
=======
_r.displayName = Dt.Title.displayName;
const Cr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Cr.displayName = Dt.Title.displayName;
const Er = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  Dt.Description,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
rl.displayName = $t.Description.displayName;
=======
Cr.displayName = Dt.Description.displayName;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
const ee = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Er.displayName = Dt.Description.displayName;
const Wt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
ee.displayName = kt.displayName;
<<<<<<< HEAD
const Fe = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(mo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
=======
const Be = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Co, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Wt.displayName = kt.displayName;
const Ee = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(To, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Fe.displayName = kt.Input.displayName;
=======
Be.displayName = kt.Input.displayName;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
const ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ee.displayName = kt.Input.displayName;
const Jt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  kt.List,
  {
    ref: n,
    className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
<<<<<<< HEAD
ne.displayName = kt.List.displayName;
<<<<<<< HEAD
const on = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
on.displayName = kt.Empty.displayName;
const Qt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
const an = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
an.displayName = kt.Empty.displayName;
const te = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Jt.displayName = kt.List.displayName;
const Ge = b.forwardRef((t, e) => /* @__PURE__ */ r(kt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ge.displayName = kt.Empty.displayName;
const jt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
const sa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  kt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
sa.displayName = kt.Separator.displayName;
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
function ia({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ia.displayName = "CommandShortcut";
const la = (t, e, n, o, a) => {
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
<<<<<<< HEAD
<<<<<<< HEAD
}, ol = (t, e, n, o, a) => {
=======
}, hl = (t, e, n, o, a) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, gl = (t, e, n, o, a) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Re(t, e) {
=======
function De(t, e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Me(t, e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? dt.bookIdToEnglishName(t);
}
function Tr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
<<<<<<< HEAD
<<<<<<< HEAD
const Wo = wt.allBookIds.filter(
  (t) => !wt.isObsolete(wt.bookIdToNumber(t))
), xe = Object.fromEntries(
  Wo.map((t) => [t, wt.bookIdToEnglishName(t)])
=======
const ia = dt.allBookIds.filter(
  (t) => !dt.isObsolete(dt.bookIdToNumber(t))
), xe = Object.fromEntries(
  ia.map((t) => [t, dt.bookIdToEnglishName(t)])
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const ca = dt.allBookIds.filter(
  (t) => !dt.isObsolete(dt.bookIdToNumber(t))
), ye = Object.fromEntries(
  ca.map((t) => [t, dt.bookIdToEnglishName(t)])
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
);
function Rr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = dt.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
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
<<<<<<< HEAD
    commandValue: c
  }, w) => {
    const p = Y(!1), f = () => {
=======
    commandValue: d
  }, c) => {
    const p = H(!1), u = () => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (x) => {
      p.current = !0, o ? o(x) : n == null || n(t);
<<<<<<< HEAD
<<<<<<< HEAD
    }, u = F(
      () => Re(t, l),
=======
    }, f = K(
      () => De(t, l),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    }, m = K(
      () => Me(t, l),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      [t, l]
    ), g = K(
      () => Tr(t, l),
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
<<<<<<< HEAD
            ref: w,
            value: c || `${t} ${wt.bookIdToEnglishName(t)}`,
            onSelect: f,
=======
            ref: c,
            value: d || `${t} ${dt.bookIdToEnglishName(t)}`,
            onSelect: u,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${dt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
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
<<<<<<< HEAD
<<<<<<< HEAD
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: u }),
=======
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: f }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: m }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
<<<<<<< HEAD
<<<<<<< HEAD
), Zo = pe(
=======
), ca = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
), wa = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
), B = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ve : "button", { className: m(Zo({ variant: e, size: n, className: t })), ref: i, ...a })
);
B.displayName = "Button";
const re = De.Root, ue = De.Trigger, al = De.Anchor, Ut = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(De.Portal, { children: /* @__PURE__ */ r(
    De.Content,
=======
), F = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? ze : "button", { className: f(wa({ variant: e, size: n, className: t })), ref: s, ...a })
=======
), z = b.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Fe : "button", { className: f(wa({ variant: e, size: n, className: t })), ref: s, ...a })
>>>>>>> 5dcbb312b7 (Address all PR comments)
);
z.displayName = "Button";
const ln = 250, pa = 300, Ie = 400, bl = 450, vl = 500, Kt = le.Root, ue = le.Trigger, Sr = le.Anchor, Mt = b.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, s) => {
  const i = wt();
<<<<<<< HEAD
  return /* @__PURE__ */ r(Ne.Portal, { children: /* @__PURE__ */ r(
    Ne.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return /* @__PURE__ */ r(le.Portal, { children: /* @__PURE__ */ r(
    le.Content,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    {
      ref: s,
      align: e,
      sideOffset: n,
<<<<<<< HEAD
      className: m(
<<<<<<< HEAD
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
=======
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: ln, ...o },
      ...a,
      dir: i
    }
  ) });
});
<<<<<<< HEAD
<<<<<<< HEAD
Ut.displayName = De.Content.displayName;
function rr(t, e, n) {
  return `${t} ${xe[t]}${e ? ` ${br(t, e)} ${Re(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function sl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (p) => String(p),
  getItemKey: o = (p) => String(p),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: c = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: w = "ghost"
}) {
  const [p, f] = R(!1);
  if (t.length === 0)
    return;
  const h = (u) => {
    e(u), f(!1);
  };
  return /* @__PURE__ */ d(re, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      B,
=======
zt.displayName = Ne.Content.displayName;
function sr(t, e, n) {
  return `${t} ${xe[t]}${e ? ` ${Er(t, e)} ${De(t, e)}` : ""}${n ? ` ${n}` : ""}`;
=======
Mt.displayName = le.Content.displayName;
function ir(t, e, n) {
  return `${t} ${ye[t]}${e ? ` ${Tr(t, e)} ${Me(t, e)}` : ""}${n ? ` ${n}` : ""}`;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
function xl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l
}) {
  const [d, c] = T(!1);
  if (t.length === 0)
    return;
  const p = (u) => {
    e(u), c(!1);
  };
  return /* @__PURE__ */ w(Kt, { open: d, onOpenChange: c, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
<<<<<<< HEAD
      F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(Jr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ r(Ut, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(Qt, { heading: i, children: t.map((u) => /* @__PURE__ */ d(
      qt,
      {
        onSelect: () => h(u),
=======
    /* @__PURE__ */ r(zt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(te, { heading: s, children: t.map((u) => /* @__PURE__ */ w(
      qt,
      {
        onSelect: () => p(u),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        className: m("tw-flex tw-items-center", l),
=======
    /* @__PURE__ */ r(Mt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(jt, { heading: s, children: t.map((u) => /* @__PURE__ */ w(
      Bt,
      {
        onSelect: () => p(u),
        className: f("tw-flex tw-items-center", l),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        children: [
          /* @__PURE__ */ r(Jr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function ip(t, e, n = (a, i) => a === i, o = 15) {
=======
function $p(t, e, n = (a, s) => a === s, o = 15) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Fp(t, e, n = (a, s) => a === s, o = 15) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
}, il = [
  Pn.BOOK_ONLY,
  Pn.BOOK_CHAPTER,
  Pn.BOOK_CHAPTER_VERSE
];
function Yr(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Kt(t) {
  return Xs(wt.bookIdToNumber(t));
}
function ll(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = il.reduce(
    (a, i) => {
=======
}, xl = [
  Vn.BOOK_ONLY,
  Vn.BOOK_CHAPTER,
  Vn.BOOK_CHAPTER_VERSE
=======
}, yl = [
  jn.BOOK_ONLY,
  jn.BOOK_CHAPTER,
  jn.BOOK_CHAPTER_VERSE
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
];
function so(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function qt(t) {
  return wi(dt.bookIdToNumber(t));
}
function Nl(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = yl.reduce(
    (a, s) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [l, d = void 0, c = void 0] = i.slice(1);
        let p;
<<<<<<< HEAD
<<<<<<< HEAD
        const f = e.filter((h) => vr(h, l, n));
        if (f.length === 1 && ([p] = f), !p && c) {
          if (wt.isBookIdValid(l)) {
=======
        const u = e.filter((h) => Tr(h, l, n));
=======
        const u = e.filter((h) => Rr(h, l, n));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        if (u.length === 1 && ([p] = u), !p && d) {
          if (dt.isBookIdValid(l)) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
            const h = l.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
<<<<<<< HEAD
<<<<<<< HEAD
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
=======
              ([, f]) => f.localizedId.toLowerCase() === l.toLowerCase()
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              ([, m]) => m.localizedId.toLowerCase() === l.toLowerCase()
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
<<<<<<< HEAD
        if (!p && c) {
          const u = ((g) => Object.keys(xe).find(
            (x) => xe[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (p = u), !p && n) {
=======
        if (!p && d) {
          const m = ((g) => Object.keys(ye).find(
            (x) => ye[x].toLowerCase() === g.toLowerCase()
          ))(l);
<<<<<<< HEAD
          if (f && e.includes(f) && (p = f), !p && n) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          if (m && e.includes(m) && (p = m), !p && n) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
<<<<<<< HEAD
          let h = c ? parseInt(c, 10) : void 0;
          h && h > Kt(p) && (h = Math.max(Kt(p), 1));
          const u = w ? parseInt(w, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
            verseNum: u
=======
          let h = d ? parseInt(d, 10) : void 0;
          h && h > qt(p) && (h = Math.max(qt(p), 1));
          const m = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
<<<<<<< HEAD
            verseNum: f
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            verseNum: m
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
<<<<<<< HEAD
<<<<<<< HEAD
function wl(t, e, n, o) {
  const a = K(() => {
=======
function Nl(t, e, n, o) {
  const a = z(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function kl(t, e, n, o) {
<<<<<<< HEAD
  const a = $(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  const a = j(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], p = Math.max(qt(c), 1);
        o({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = j(() => {
    const d = qt(t.book);
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
  }, [t, e, o]), i = j(() => {
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
  return K(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Zr : Qr
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
<<<<<<< HEAD
<<<<<<< HEAD
      icon: n === "ltr" ? Yn : Se
=======
      icon: n === "ltr" ? Jn : Me
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      icon: n === "ltr" ? Zn : Oe
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
<<<<<<< HEAD
<<<<<<< HEAD
      icon: n === "ltr" ? Se : Yn
=======
      icon: n === "ltr" ? Me : Jn
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      icon: n === "ltr" ? Oe : Zn
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === qt(t.book) || qt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Qr : Zr
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
<<<<<<< HEAD
<<<<<<< HEAD
function Xr({
=======
function so({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function io({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
<<<<<<< HEAD
<<<<<<< HEAD
    return /* @__PURE__ */ r(Qt, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Kt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      qt,
      {
        value: `${t} ${xe[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
=======
    return /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Gt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      qt,
=======
    return /* @__PURE__ */ r(jt, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: qt(t) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      Bt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        value: `${t} ${ye[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
<<<<<<< HEAD
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        className: m(
=======
        className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function lp({
=======
function Vp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Bp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const w = ft(), [p, f] = R(!1), [h, u] = R(""), [g, x] = R(""), [v, y] = R("books"), [N, _] = R(void 0), [k, z] = R(!1), L = Y(void 0), T = Y(void 0), $ = Y(void 0), C = Y(void 0), S = Y({}), V = K(
=======
  const c = wt(), [p, u] = T(!1), [h, f] = T(""), [g, x] = T(""), [v, y] = T("books"), [N, _] = T(void 0), [k, B] = T(!1), $ = H(void 0), R = H(void 0), L = H(void 0), C = H(void 0), S = H({}), V = z(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const c = wt(), [p, u] = T(!1), [h, m] = T(""), [g, x] = T(""), [v, y] = T("books"), [N, _] = T(void 0), [k, B] = T(!1), V = H(void 0), R = H(void 0), L = H(void 0), C = H(void 0), S = H({}), j = $(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  const c = wt(), [p, u] = T(!1), [h, m] = T(""), [g, x] = T(""), [v, y] = T("books"), [N, _] = T(void 0), [k, B] = T(!1), F = H(void 0), L = H(void 0), D = H(void 0), C = H(void 0), R = H({}), $ = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (E) => {
      e(E), l && l(E);
    },
    [e, l]
  ), V = K(() => o ? o() : ca, [o]), I = K(() => ({
    [q.OT]: V.filter((X) => dt.isBookOT(X)),
    [q.NT]: V.filter((X) => dt.isBookNT(X)),
    [q.DC]: V.filter((X) => dt.isBookDC(X)),
    [q.Extra]: V.filter((X) => dt.extraBooks().includes(X))
  }), [V]), A = K(() => Object.values(I).flat(), [I]), Y = K(() => {
    if (!g.trim()) return I;
    const E = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return [q.OT, q.NT, q.DC, q.Extra].forEach((rt) => {
      E[rt] = I[rt].filter((ot) => Rr(ot, g, a));
    }), E;
<<<<<<< HEAD
  }, [I, g, a]), M = F(
    () => ll(g, A, a),
=======
  }, [I, g, a]), M = K(
<<<<<<< HEAD
    () => yl(g, A, a),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    () => Nl(g, A, a),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    [g, A, a]
  ), W = j(() => {
    M && ($({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
<<<<<<< HEAD
<<<<<<< HEAD
    }), f(!1), x(""), u(""));
  }, [V, M]), Ct = K(
=======
    }), u(!1), x(""), f(""));
  }, [V, M]), Ct = z(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    }), u(!1), x(""), m(""));
<<<<<<< HEAD
  }, [j, M]), Ct = $(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  }, [$, M]), Ct = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (E) => {
      if (qt(E) <= 1) {
        $({
          book: E,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), x("");
        return;
      }
      _(E), y("chapters");
    },
    [$]
  ), Ot = j(
    (E) => {
      const X = v === "chapters" ? N : M == null ? void 0 : M.book;
      X && ($({
        book: X,
        chapterNum: E,
        verseNum: 1
      }), f(!1), y("books"), _(void 0), x(""));
    },
    [$, v, N, M]
  ), It = j(
    (E) => {
<<<<<<< HEAD
<<<<<<< HEAD
      V(E), f(!1), x("");
    },
    [V]
<<<<<<< HEAD
  ), dt = wl(t, A, w, e), P = K(() => {
=======
  ), pt = Nl(t, A, c, e), P = z(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      j(E), u(!1), x("");
    },
    [j]
  ), pt = kl(t, A, c, e), P = $(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      $(E), u(!1), x("");
    },
    [$]
  ), pt = kl(t, A, c, e), P = j(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
    y("books"), _(void 0), setTimeout(() => {
      L.current && L.current.focus();
    }, 0);
  }, []), S = j(
    (E) => {
      if (!E && v === "chapters") {
        P();
        return;
      }
      f(E), E && (y("books"), _(void 0), x(""));
    },
    [v, P]
  ), { otLong: U, ntLong: Z, dcLong: Q, extraLong: lt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, xt = j(
    (E) => la(E, U, Z, Q, lt),
    [U, Z, Q, lt]
  ), ut = j(
    (E) => M ? !!M.chapterNum && !E.toString().includes(M.chapterNum.toString()) : !1,
    [M]
<<<<<<< HEAD
  ), yt = F(
    () => ve(
      t,
      a ? Re(t.book, a) : "English"
=======
  ), yt = K(
    () => xe(
      t,
<<<<<<< HEAD
      a ? De(t.book, a) : "English"
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      a ? Me(t.book, a) : "English"
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ),
    [t, a]
  ), At = j((E) => (X) => {
    R.current[E] = X;
  }, []), ht = j((E) => {
    (E.key === "Home" || E.key === "End") && E.stopPropagation();
  }, []), gt = j(
    (E) => {
      if (E.ctrlKey) return;
<<<<<<< HEAD
<<<<<<< HEAD
      const { isLetter: X, isDigit: nt } = Yr(E.key);
=======
      const { isLetter: X, isDigit: rt } = ao(E.key);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      const { isLetter: X, isDigit: rt } = so(E.key);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      if (v === "chapters") {
        if (E.key === "Backspace") {
          E.preventDefault(), E.stopPropagation(), P();
          return;
        }
<<<<<<< HEAD
        if (X || nt) {
          if (E.preventDefault(), E.stopPropagation(), y("books"), _(void 0), nt && N) {
            const rt = xe[N];
            x(`${rt} ${E.key}`);
=======
        if (X || rt) {
          if (E.preventDefault(), E.stopPropagation(), y("books"), _(void 0), rt && N) {
            const ot = ye[N];
            x(`${ot} ${E.key}`);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
          } else
            x(E.key);
          setTimeout(() => {
            L.current && L.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(E.key)) {
        const ot = v === "chapters" ? N : M == null ? void 0 : M.book;
        if (!ot) return;
        const mt = (() => {
          if (!h) return 1;
<<<<<<< HEAD
          const me = h.match(/(\d+)$/);
          return me ? parseInt(me[1], 10) : 0;
<<<<<<< HEAD
        })(), Xt = Kt(rt);
        if (!Xt) return;
        let Nt = ut;
        const sn = 6;
=======
        })(), Jt = Gt(ot);
        if (!Jt) return;
        let Nt = mt;
        const dn = 6;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          const fe = h.match(/(\d+)$/);
          return fe ? parseInt(fe[1], 10) : 0;
        })(), te = qt(ot);
        if (!te) return;
        let Nt = mt;
        const wn = 6;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
        Nt !== ut && (E.preventDefault(), E.stopPropagation(), u(rr(rt, a, Nt)), setTimeout(() => {
=======
        Nt !== mt && (E.preventDefault(), E.stopPropagation(), f(sr(ot, a, Nt)), setTimeout(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
          const me = S.current[Nt];
          me && me.scrollIntoView({ block: "nearest", behavior: "smooth" });
=======
        Nt !== mt && (E.preventDefault(), E.stopPropagation(), m(ir(ot, a, Nt)), setTimeout(() => {
          const fe = R.current[Nt];
          fe && fe.scrollIntoView({ block: "nearest", behavior: "smooth" });
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
  ), Qt = j((E) => {
    if (E.shiftKey || E.key === "Tab" || E.key === " ") return;
<<<<<<< HEAD
<<<<<<< HEAD
    const { isLetter: X, isDigit: nt } = Yr(E.key);
    (X || nt) && (E.preventDefault(), x((rt) => rt + E.key), T.current.focus(), z(!1));
=======
    const { isLetter: X, isDigit: rt } = ao(E.key);
=======
    const { isLetter: X, isDigit: rt } = so(E.key);
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    (X || rt) && (E.preventDefault(), x((ot) => ot + E.key), R.current.focus(), B(!1));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    (X || rt) && (E.preventDefault(), x((ot) => ot + E.key), L.current.focus(), B(!1));
>>>>>>> 5dcbb312b7 (Address all PR comments)
  }, []);
  return ne(() => {
    const E = setTimeout(() => {
      if (p && v === "books" && D.current && C.current) {
        const X = D.current, rt = C.current, ot = rt.offsetTop, mt = X.clientHeight, te = rt.clientHeight, Nt = ot - mt / 2 + te / 2;
        X.scrollTo({
          top: Math.max(0, Nt),
          behavior: "smooth"
<<<<<<< HEAD
<<<<<<< HEAD
        }), u(rr(t.book));
=======
        }), f(sr(t.book));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        }), m(ir(t.book));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
    }, 0);
    return () => {
      clearTimeout(E);
    };
  }, [p, v, g, M, t.book]), ne(() => {
    if (v === "chapters" && N) {
      const E = N === t.book;
      setTimeout(() => {
        if (D.current)
          if (E) {
            const X = R.current[t.chapterNum];
            X && X.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            D.current.scrollTo({ top: 0 });
        F.current && F.current.focus();
      }, 0);
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ d(re, { open: p, onOpenChange: D, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      B,
=======
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ w(Yt, { open: p, onOpenChange: D, children: [
    /* @__PURE__ */ r(pe, { asChild: !0, children: /* @__PURE__ */ r(
=======
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ w(Kt, { open: p, onOpenChange: D, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  }, [v, N, M, t.book, t.chapterNum]), /* @__PURE__ */ w(Kt, { open: p, onOpenChange: S, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ r(Ut, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
=======
    /* @__PURE__ */ r(zt, { id: d, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ w(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      ee,
=======
    /* @__PURE__ */ r(Mt, { id: d, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ w(
      Wt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        ref: F,
        onKeyDown: gt,
        loop: !0,
        value: h,
<<<<<<< HEAD
<<<<<<< HEAD
        onValueChange: u,
=======
        onValueChange: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        onValueChange: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ w("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ w("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
                Fe,
=======
                Be,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                Ee,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                {
                  ref: L,
                  value: g,
                  onValueChange: x,
                  onKeyDown: ht,
                  onFocus: () => B(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
<<<<<<< HEAD
              s && s.length > 0 && /* @__PURE__ */ r(
                sl,
                {
                  recentSearches: s,
                  onSearchItemSelect: Mt,
=======
              i && i.length > 0 && /* @__PURE__ */ r(
                xl,
                {
                  recentSearches: i,
<<<<<<< HEAD
                  onSearchItemSelect: Ot,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
                  renderItem: (E) => ve(E, "English"),
=======
                  onSearchItemSelect: It,
                  renderItem: (E) => xe(E, "English"),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                  getItemKey: (E) => `${E.book}-${E.chapterNum}-${E.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: pt.map(({ onClick: E, disabled: X, title: rt, icon: ot }) => /* @__PURE__ */ r(
              z,
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
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: P,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" })
              }
            ),
<<<<<<< HEAD
<<<<<<< HEAD
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Re(N, a) })
          ] }),
          !k && /* @__PURE__ */ d(ne, { ref: $, children: [
            v === "books" && /* @__PURE__ */ d(ct, { children: [
              !M && Object.entries(H).map(([E, X]) => {
=======
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: De(N, a) })
=======
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Me(N, a) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          ] }),
          !k && /* @__PURE__ */ w(Jt, { ref: D, children: [
            v === "books" && /* @__PURE__ */ w(et, { children: [
              !M && Object.entries(Y).map(([E, X]) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
                if (X.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(jt, { heading: xt(E), children: X.map((rt) => /* @__PURE__ */ r(
                      da,
                      {
<<<<<<< HEAD
                        bookId: nt,
                        onSelect: (rt) => Ct(rt),
                        section: He(nt),
                        commandValue: `${nt} ${xe[nt]}`,
                        ref: nt === t.book ? C : void 0,
=======
                        bookId: rt,
                        onSelect: (ot) => Ct(ot),
                        section: Xe(rt),
                        commandValue: `${rt} ${ye[rt]}`,
                        ref: rt === t.book ? C : void 0,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
                    a ? Tr(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
<<<<<<< HEAD
<<<<<<< HEAD
              M && Kt(M.book) > 1 && /* @__PURE__ */ d(ct, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Re(M.book, a) }),
                /* @__PURE__ */ r(
                  Xr,
=======
              M && Gt(M.book) > 1 && /* @__PURE__ */ w(et, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: De(M.book, a) }),
                /* @__PURE__ */ r(
                  so,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              M && qt(M.book) > 1 && /* @__PURE__ */ w(et, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Me(M.book, a) }),
                /* @__PURE__ */ r(
                  io,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
              Xr,
=======
              so,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              io,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
const wp = Object.freeze([
=======
const jp = Object.freeze([
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Kp = Object.freeze([
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
<<<<<<< HEAD
<<<<<<< HEAD
]), cl = pe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), mt = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(ko.Root, { ref: n, className: m("pr-twp", cl(), t), ...e }));
mt.displayName = ko.Root.displayName;
const xr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
=======
]), kl = we(
=======
]), _l = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ft = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r($o.Root, { ref: n, className: f("pr-twp", _l(), t), ...e }));
ft.displayName = $o.Root.displayName;
const Dr = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  return /* @__PURE__ */ r(
    tn.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Dr.displayName = tn.Root.displayName;
const kn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tn.Item,
  {
    ref: n,
    className: f(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(tn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Rn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
bn.displayName = Ze.Item.displayName;
function dl(t) {
=======
Nn.displayName = Ze.Item.displayName;
function _l(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
kn.displayName = Qe.Item.displayName;
=======
kn.displayName = tn.Item.displayName;
>>>>>>> 5dcbb312b7 (Address all PR comments)
function Cl(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function lr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: s,
  value: i,
  onChange: l = () => {
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  getOptionLabel: l = dl,
  getButtonLabel: c,
  icon: w = void 0,
=======
  getOptionLabel: l = _l,
=======
  getOptionLabel: l = Cl,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  getButtonLabel: d,
  icon: c = void 0,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  buttonPlaceholder: p = "",
  textPlaceholder: f = "",
  commandEmptyMessage: h = "No option found",
<<<<<<< HEAD
<<<<<<< HEAD
  buttonVariant: u = "outline",
=======
  buttonVariant: f = "outline",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  buttonVariant: m = "outline",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...y
=======
  getOptionLabel: d = Cl,
  getButtonLabel: c,
  icon: p = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: h = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: x = "start",
  isDisabled: v = !1,
  ariaLabel: y,
  ...N
>>>>>>> 5dcbb312b7 (Address all PR comments)
}) {
  const [_, k] = T(!1), B = c ?? d, F = (D) => D.length > 0 && typeof D[0] == "object" && "options" in D[0], L = (D, C) => {
    const R = d(D), $ = typeof D == "object" && "secondaryLabel" in D ? D.secondaryLabel : void 0, V = `${C ?? ""}${R}${$ ?? ""}`;
    return /* @__PURE__ */ w(
      Bt,
      {
        value: R,
        onSelect: () => {
          l(D), k(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            zt,
            {
<<<<<<< HEAD
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
<<<<<<< HEAD
                "tw-opacity-0": !i || l(i) !== C
=======
=======
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                "tw-opacity-0": !s || l(s) !== C
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                "tw-opacity-0": !i || d(i) !== R
>>>>>>> 5dcbb312b7 (Address all PR comments)
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            R,
            $ && /* @__PURE__ */ w("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              $
            ] })
          ] })
        ]
      },
      V
    );
  };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(re, { open: N, onOpenChange: _, ...y, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
      B,
      {
        variant: u,
=======
  return /* @__PURE__ */ w(Yt, { open: N, onOpenChange: _, ...y, children: [
    /* @__PURE__ */ r(pe, { asChild: !0, children: /* @__PURE__ */ w(
      F,
      {
        variant: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return /* @__PURE__ */ w(Kt, { open: N, onOpenChange: _, ...y, children: [
=======
  return /* @__PURE__ */ w(Kt, { open: _, onOpenChange: k, ...N, children: [
>>>>>>> 5dcbb312b7 (Address all PR comments)
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
      z,
      {
<<<<<<< HEAD
        variant: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        variant: g,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        role: "combobox",
        "aria-expanded": _,
        "aria-label": y,
        id: t,
        className: f(
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
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: i ? B(i) : u
              }
            )
          ] }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(Le, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
=======
          /* @__PURE__ */ r(Ve, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          /* @__PURE__ */ r(je, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          /* @__PURE__ */ r(ze, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
>>>>>>> 5dcbb312b7 (Address all PR comments)
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Mt,
      {
<<<<<<< HEAD
        align: g,
<<<<<<< HEAD
        className: m("tw-w-[200px] tw-p-0", a),
<<<<<<< HEAD
        children: /* @__PURE__ */ d(ee, { children: [
          /* @__PURE__ */ r(Fe, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(on, { children: h }),
          /* @__PURE__ */ r(ne, { children: z(e) ? e.map((T) => /* @__PURE__ */ r(Qt, { heading: T.groupHeading, children: T.options.map(($) => L($, T.groupHeading)) }, T.groupHeading)) : e.map((T) => L(T)) })
=======
        children: /* @__PURE__ */ w(ee, { children: [
          /* @__PURE__ */ r(Be, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(an, { children: h }),
          /* @__PURE__ */ r(ne, { children: B(e) ? e.map((R) => /* @__PURE__ */ r(te, { heading: R.groupHeading, children: R.options.map((L) => $(L, R.groupHeading)) }, R.groupHeading)) : e.map((R) => $(R)) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
=======
        align: x,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        className: f("tw-w-[200px] tw-p-0", a),
        style: s,
        children: /* @__PURE__ */ w(Wt, { children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(Ee, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ke, { children: h }),
          /* @__PURE__ */ r(Jt, { children: B(e) ? e.map((R) => /* @__PURE__ */ r(jt, { heading: R.groupHeading, children: R.options.map((L) => V(L, R.groupHeading)) }, R.groupHeading)) : e.map((R) => V(R)) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          /* @__PURE__ */ r(Ee, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ge, { children: m }),
          /* @__PURE__ */ r(Jt, { children: F(e) ? e.map((D) => /* @__PURE__ */ r(jt, { heading: D.groupHeading, children: D.options.map((C) => L(C, D.groupHeading)) }, D.groupHeading)) : e.map((D) => L(D)) })
>>>>>>> 5dcbb312b7 (Address all PR comments)
        ] })
      }
    )
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function pl({
=======
function Cl({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function El({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = K(
    () => Array.from({ length: s }, (c, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(ft, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(ft, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var cr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(cr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
<<<<<<< HEAD
<<<<<<< HEAD
})(ar || (ar = {}));
const cp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), $n = (t, e) => t[e] ?? e;
function dp({
=======
})(lr || (lr = {}));
const zp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), jn = (t, e) => t[e] ?? e;
function Fp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
})(cr || (cr = {}));
const Gp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zn = (t, e) => t[e] ?? e;
function Up({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: c
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const p = $n(w, "%webView_bookSelector_currentBook%"), f = $n(w, "%webView_bookSelector_choose%"), h = $n(w, "%webView_bookSelector_chooseBooks%"), [u, g] = R(
=======
  const p = jn(c, "%webView_bookSelector_currentBook%"), u = jn(c, "%webView_bookSelector_choose%"), h = jn(c, "%webView_bookSelector_chooseBooks%"), [f, g] = T(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const p = zn(c, "%webView_bookSelector_currentBook%"), u = zn(c, "%webView_bookSelector_choose%"), h = zn(c, "%webView_bookSelector_chooseBooks%"), [m, g] = T(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    "current book"
    /* CurrentBook */
  ), x = (v) => {
    g(v), t(v);
  };
  return /* @__PURE__ */ r(
    Dr,
    {
      className: "pr-twp tw-flex",
<<<<<<< HEAD
<<<<<<< HEAD
      value: u,
=======
      value: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      value: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(kn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
            pl,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
=======
            Cl,
=======
            El,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: i,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ft, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(ft, { className: "tw-flex tw-items-center", children: o.map((v) => dt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            z,
            {
<<<<<<< HEAD
<<<<<<< HEAD
              disabled: u === "current book",
=======
              disabled: f === "current book",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              disabled: m === "current book",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const Qo = kn(null);
function ul(t, e) {
=======
const pa = En(null);
function El(t, e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const ua = Tn(null);
function Tl(t, e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Zt() {
  const t = br(ua);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
<<<<<<< HEAD
<<<<<<< HEAD
const ta = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, ml = ta ? Zt : q, cn = { tag: fr };
function fl({ initialConfig: t, children: e }) {
  const n = F(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = ul(null, o), p = _o({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (f) => s(f, p), theme: o });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const u = le();
          if (u.isEmpty()) {
            const g = Cn();
            u.append(g);
            const x = ta ? document.activeElement : null;
            (Lt() !== null || x !== null && x === f.getRootElement()) && g.select();
=======
const ua = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Tl = ua ? Qt : G, un = { tag: br };
function Rl({ initialConfig: t, children: e }) {
=======
const ma = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Rl = ma ? ne : G, mn = { tag: vr };
function Sl({ initialConfig: t, children: e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = K(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: d } = t, c = Tl(null, o), p = Vo({ editable: t.editable, html: d, namespace: a, nodes: s, onError: (u) => i(u, p), theme: o });
    return function(u, h) {
      if (h !== null) {
        if (h === void 0) u.update(() => {
<<<<<<< HEAD
          const f = le();
          if (f.isEmpty()) {
            const g = Rn();
            f.append(g);
            const x = ua ? document.activeElement : null;
            ($t() !== null || x !== null && x === u.getRootElement()) && g.select();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          const m = ce();
          if (m.isEmpty()) {
            const g = Sn();
            m.append(g);
            const x = ma ? document.activeElement : null;
            (Vt() !== null || x !== null && x === u.getRootElement()) && g.select();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          }
        }, mn);
        else if (h !== null) switch (typeof h) {
          case "string": {
<<<<<<< HEAD
<<<<<<< HEAD
            const u = f.parseEditorState(h);
            f.setEditorState(u, cn);
            break;
          }
          case "object":
            f.setEditorState(h, cn);
            break;
          case "function":
            f.update(() => {
              le().isEmpty() && h(f);
            }, cn);
=======
            const f = u.parseEditorState(h);
            u.setEditorState(f, un);
=======
            const m = u.parseEditorState(h);
            u.setEditorState(m, mn);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            break;
          }
          case "object":
            u.setEditorState(h, mn);
            break;
          case "function":
            u.update(() => {
<<<<<<< HEAD
              le().isEmpty() && h(u);
            }, un);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              ce().isEmpty() && h(u);
            }, mn);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      }
    }(p, l), [p, c];
  }, []);
<<<<<<< HEAD
<<<<<<< HEAD
  return ml(() => {
=======
  return Tl(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return Rl(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ua.Provider, { value: n, children: e });
}
<<<<<<< HEAD
<<<<<<< HEAD
const hl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function gl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Ht();
  return hl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(fr) || l.isEmpty() || n(a, o, c);
=======
const Sl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Qt : G;
function Dl({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Xt();
  return Sl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(br) || l.isEmpty() || n(a, o, d);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function Ml({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Zt();
  return Dl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && i.size === 0 || t && d.has(vr) || l.isEmpty() || n(a, o, d);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    });
  }, [o, t, e, n]), null;
}
const Mr = {
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
}, Rt = je.Provider, At = je.Root, Pt = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  je.Trigger,
  {
    ref: o,
    className: e ? m(Zo({ variant: e }), t) : t,
    ...n
  }
));
Pt.displayName = je.Trigger.displayName;
const St = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  je.Content,
=======
}, Rt = ze.Provider, Pt = ze.Root, Lt = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  ze.Trigger,
=======
}, Rt = Fe.Provider, Lt = Fe.Root, $t = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Fe.Trigger,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
}, Rt = Be.Provider, Lt = Be.Root, $t = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Be.Trigger,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  {
    ref: o,
    className: e ? f(wa({ variant: e }), t) : t,
    ...n
  }
));
$t.displayName = Be.Trigger.displayName;
const St = b.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
  ze.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  Fe.Content,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  Be.Content,
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
St.displayName = je.Content.displayName;
const Nr = [
  Li,
  Co,
  Eo,
  Vi
], bl = kn(null), Ln = {
  didCatch: !1,
  error: null
};
class vl extends ps {
=======
St.displayName = ze.Content.displayName;
const Mr = [
  Zi,
  $o,
  Vo,
  Qi
], Ml = En(null), zn = {
  didCatch: !1,
  error: null
};
class Ol extends Rs {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
St.displayName = Fe.Content.displayName;
=======
St.displayName = Be.Content.displayName;
>>>>>>> 5dcbb312b7 (Address all PR comments)
const Or = [
  Qi,
  jo,
  zo,
  tl
], Ol = Tn(null), Fn = {
  didCatch: !1,
  error: null
};
class Il extends Ss {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
    if (o && n.error !== null && xl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
=======
    if (o && n.error !== null && Il(e.resetKeys, a)) {
=======
    if (o && n.error !== null && Al(e.resetKeys, a)) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
      const d = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(d);
      else if (o)
        l = Wr(o, d);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    return Lr(bl.Provider, {
=======
    return Xr(Ml.Provider, {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return Wr(Ol.Provider, {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
function xl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function yl({ children: t, onError: e }) {
  return r(vl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Nl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function kl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function _l() {
  return function(t) {
    const [e] = Ht(), n = F(() => t(e), [e, t]), [o, a] = R(() => n.initialValueFn()), i = Y(o);
    return Nl(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(kl);
}
function Cl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ri(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), p = e.is(c);
    if (w || p) {
      const [f, h] = oi(t), u = l.is(c), g = e.is(s ? c : l), x = e.is(s ? l : c);
      let v, y = 0;
      u ? (y = f > h ? h : f, v = f > h ? f : h) : g ? (y = s ? h : f, v = void 0) : x && (y = 0, v = s ? f : h);
      const N = e.__text.slice(y, v);
      N !== e.__text && (n === "clone" && (e = ai(e)), e.__text = N);
=======
function Il() {
=======
function Al() {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
      const { initialValueFn: i, subscribe: l } = n, d = i();
      return s.current !== d && (s.current = d, a(d)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, t]), o;
  }($l);
}
function jl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !vi(e) && o !== null) {
    const [a, s] = o, i = t.isBackward(), l = a.getNode(), d = s.getNode(), c = e.is(l), p = e.is(d);
    if (c || p) {
      const [u, h] = xi(t), m = l.is(d), g = e.is(i ? d : l), x = e.is(i ? l : d);
      let v, y = 0;
      m ? (y = u > h ? h : u, v = u > h ? u : h) : g ? (y = i ? h : u, v = void 0) : x && (y = 0, v = i ? u : h);
      const N = e.__text.slice(y, v);
<<<<<<< HEAD
      N !== e.__text && (n === "clone" && (e = xi(e)), e.__text = N);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      N !== e.__text && (n === "clone" && (e = yi(e)), e.__text = N);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }
  }
  return e;
}
<<<<<<< HEAD
<<<<<<< HEAD
function El(t, ...e) {
=======
function jl(t, ...e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function zl(t, ...e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
<<<<<<< HEAD
<<<<<<< HEAD
const ea = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Tl = ea && "documentMode" in document ? document.documentMode : null;
!(!ea || !("InputEvent" in window) || Tl) && "getTargetRanges" in new window.InputEvent("input");
function Rl(t) {
  const e = To(t, (n) => se(n) && !n.isInline());
  return se(e) || El(4, t.__key), e;
}
function Sl(t) {
  const e = Lt();
  if (!Ne(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = To(i, (w) => se(w) && !w.isInline());
=======
const ma = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, zl = ma && "documentMode" in document ? document.documentMode : null;
!(!ma || !("InputEvent" in window) || zl) && "getTargetRanges" in new window.InputEvent("input");
function Fl(t) {
  const e = jo(t, (n) => se(n) && !n.isInline());
  return se(e) || jl(4, t.__key), e;
}
=======
const fa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fl = fa && "documentMode" in document ? document.documentMode : null;
!(!fa || !("InputEvent" in window) || Fl) && "getTargetRanges" in new window.InputEvent("input");
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
function Bl(t) {
  const e = Fo(t, (n) => se(n) && !n.isInline());
  return se(e) || zl(4, t.__key), e;
}
function Kl(t) {
  const e = Vt();
  if (!ke(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const s = o[a], i = s.getKey();
    if (n.has(i)) continue;
<<<<<<< HEAD
    const l = jo(s, (c) => se(c) && !c.isInline());
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const l = Fo(s, (c) => se(c) && !c.isInline());
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
<<<<<<< HEAD
<<<<<<< HEAD
const Dl = Symbol.for("preact-signals");
function Tn() {
=======
const Kl = Symbol.for("preact-signals");
function Dn() {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Gl = Symbol.for("preact-signals");
function Mn() {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (ie > 1) return void ie--;
  let t, e = !1;
  for (; Je !== void 0; ) {
    let n = Je;
    for (Je = void 0, dr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && ha(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
  if (sr = 0, ie--, e) throw t;
}
function Ml(t) {
=======
  if (cr = 0, ie--, e) throw t;
}
function Gl(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  if (dr = 0, ie--, e) throw t;
}
function Ul(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (ie > 0) return t();
  ie++;
  try {
    return t();
  } finally {
    Mn();
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
let J, Xe;
<<<<<<< HEAD
function Wr(t) {
=======
function io(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
let J, We;
=======
let J, Je;
>>>>>>> 5dcbb312b7 (Address all PR comments)
function lo(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
let ie = 0, sr = 0, mn = 0;
function Jr(t) {
=======
let ie = 0, cr = 0, gn = 0;
function lo(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
let ie = 0, dr = 0, bn = 0;
function co(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
function ha(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
<<<<<<< HEAD
<<<<<<< HEAD
function Zr(t) {
=======
function co(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function wo(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function ga(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
<<<<<<< HEAD
function he(t, e) {
<<<<<<< HEAD
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = mn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ol(t, e) {
=======
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = gn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ul(t, e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  return new he(t, e);
=======
function ge(t, e) {
  vt.call(this, void 0), this.x = t, this.s = void 0, this.g = bn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Hl(t, e) {
  return new ge(t, e);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
function ba(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    ie++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Ir(t), o;
    } finally {
      J = n, Mn();
    }
  }
}
function Ir(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ba(t);
}
<<<<<<< HEAD
<<<<<<< HEAD
function Il(t) {
=======
function Hl(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function ql(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (J !== this) throw new Error("Out-of-order effect");
  ga(this), J = t, this.f &= -2, 8 & this.f && Ir(this), Mn();
}
<<<<<<< HEAD
<<<<<<< HEAD
function Te(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ce(t, e) {
  const n = new Te(t, e);
=======
function Se(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function de(t, e) {
  const n = new Se(t, e);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function De(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function we(t, e) {
  const n = new De(t, e);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
vt.prototype.brand = Dl, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Wr(() => {
=======
vt.prototype.brand = Kl, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : io(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
vt.prototype.brand = Gl, vt.prototype.h = function() {
  return !0;
}, vt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : lo(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, vt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
<<<<<<< HEAD
<<<<<<< HEAD
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Wr(() => {
=======
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && io(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && lo(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, vt.prototype.subscribe = function(t) {
<<<<<<< HEAD
<<<<<<< HEAD
  return ce(() => {
=======
  return de(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return we(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
  const t = Jr(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (sr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, mn++, ie++;
=======
  const t = lo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (cr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, gn++, ie++;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const t = co(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (dr > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, bn++, ie++;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Mn();
    }
  }
} }), ge.prototype = new vt(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === bn)) return !0;
  if (this.g = bn, this.f |= 1, this.i > 0 && !ha(this)) return this.f &= -2, !0;
  const t = J;
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    Zr(this), J = this;
=======
    co(this), J = this;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    wo(this), J = this;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
<<<<<<< HEAD
<<<<<<< HEAD
  return J = t, ra(this), this.f &= -2, !0;
=======
  return J = t, ha(this), this.f &= -2, !0;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
}, he.prototype.S = function(t) {
=======
  return J = t, ga(this), this.f &= -2, !0;
}, ge.prototype.S = function(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
  const t = Jr(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Te.prototype.c = function() {
=======
  const t = lo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Se.prototype.c = function() {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const t = co(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), De.prototype.c = function() {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
<<<<<<< HEAD
<<<<<<< HEAD
}, Te.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, oa(this), Zr(this), ie++;
  const t = J;
  return J = this, Il.bind(this, t);
}, Te.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Xe, Xe = this);
}, Te.prototype.d = function() {
  this.f |= 8, 1 & this.f || kr(this);
}, Te.prototype.dispose = function() {
=======
}, Se.prototype.S = function() {
=======
}, De.prototype.S = function() {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ba(this), wo(this), ie++;
  const t = J;
<<<<<<< HEAD
  return J = this, Hl.bind(this, t);
}, Se.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Xe, Xe = this);
}, Se.prototype.d = function() {
  this.f |= 8, 1 & this.f || Or(this);
}, Se.prototype.dispose = function() {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return J = this, ql.bind(this, t);
}, De.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Je, Je = this);
}, De.prototype.d = function() {
  this.f |= 8, 1 & this.f || Ir(this);
}, De.prototype.dispose = function() {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  this.d();
};
Xt({ build: (t, e, n) => On(e), config: sn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
<<<<<<< HEAD
<<<<<<< HEAD
  return ce(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
=======
  return de(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return we(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    t.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
<<<<<<< HEAD
<<<<<<< HEAD
function aa() {
  const t = le(), e = Lt(), n = Cn();
  t.clear(), t.append(n), e !== null && n.select(), Ne(e) && (e.format = 0);
=======
function ba() {
  const t = le(), e = $t(), n = Rn();
=======
function va() {
  const t = ce(), e = Vt(), n = Sn();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  t.clear(), t.append(n), e !== null && n.select(), ke(e) && (e.format = 0);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
}
function xa(t, e = va) {
  return t.registerCommand(Bo, (n) => (t.update(e), !0), Ko);
}
Xt({ build: (t, e, n) => On(e), config: sn({ $onClear: va }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
<<<<<<< HEAD
<<<<<<< HEAD
  return ce(() => sa(t, o.value));
} });
function Al(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Vn = ii("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ia extends Jn {
=======
  return de(() => va(t, o.value));
=======
  return we(() => xa(t, o.value));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
} });
function Yl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
<<<<<<< HEAD
const Fn = Ni("format", { parse: (t) => typeof t == "number" ? t : 0 });
class xa extends tr {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Bn = ki("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ya extends er {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  $config() {
    return this.config("decorator-text", { extends: er, stateConfigs: [{ flat: !0, stateConfig: Bn }] });
  }
  getFormat() {
<<<<<<< HEAD
<<<<<<< HEAD
    return bi(this, Vn);
  }
  getFormatFlags(e, n) {
    return Kr(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = vi[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return xi(this, Vn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Kr(n, e, null);
=======
    return Ii(this, Fn);
=======
    return Ai(this, Bn);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
  getFormatFlags(e, n) {
    return eo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Pi[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Li(this, Bn, e);
  }
  toggleFormat(e) {
<<<<<<< HEAD
    const n = this.getFormat(), o = to(n, e, null);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const n = this.getFormat(), o = eo(n, e, null);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Pl(t) {
  return t instanceof ia;
}
Gt({ name: "@lexical/extension/DecoratorText", nodes: () => [ia], register: (t, e, n) => t.registerCommand(Do, (o) => {
  const a = Lt();
  if (Mo(a) || Ne(a)) for (const i of a.getNodes()) Pl(i) && i.toggleFormat(o);
=======
function Yl(t) {
  return t instanceof xa;
}
Ht({ name: "@lexical/extension/DecoratorText", nodes: () => [xa], register: (t, e, n) => t.registerCommand(Bo, (o) => {
  const a = $t();
  if (Ko(a) || ke(a)) for (const s of a.getNodes()) Yl(s) && s.toggleFormat(o);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Xl(t) {
  return t instanceof ya;
}
Xt({ name: "@lexical/extension/DecoratorText", nodes: () => [ya], register: (t, e, n) => t.registerCommand(Go, (o) => {
  const a = Vt();
  if (Uo(a) || ke(a)) for (const s of a.getNodes()) Xl(s) && s.toggleFormat(o);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return !1;
}, Ho) });
function Na(t, e) {
  let n;
  return en(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const wr = Xt({ build: (t) => Na(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ka(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ka(n[a], o[a]);
    return t;
  }
  return e;
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const _r = 0, lr = 1, ca = 2, jn = 3, dn = 4, Ee = 5, zn = 6, Ge = 7;
function Fn(t) {
  return t.id === _r;
=======
const Ir = 0, wr = 1, ka = 2, Bn = 3, mn = 4, Re = 5, Kn = 6, Ge = 7;
function Gn(t) {
  return t.id === Ir;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Ar = 0, pr = 1, _a = 2, Kn = 3, fn = 4, Se = 5, Gn = 6, Ue = 7;
=======
const Ar = 0, pr = 1, _a = 2, Kn = 3, fn = 4, Se = 5, Gn = 6, He = 7;
>>>>>>> 5dcbb312b7 (Address all PR comments)
function Un(t) {
  return t.id === Ar;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
function Ca(t) {
  return t.id === _a;
}
<<<<<<< HEAD
<<<<<<< HEAD
function $l(t) {
=======
function Xl(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Wl(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return function(e) {
    return e.id === pr;
  }(t) || nt(305, String(t.id), String(pr)), Object.assign(t, { id: _a });
}
<<<<<<< HEAD
<<<<<<< HEAD
const Ll = /* @__PURE__ */ new Set();
class Vl {
=======
const Wl = /* @__PURE__ */ new Set();
class Jl {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Jl = /* @__PURE__ */ new Set();
class Zl {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  constructor(e, n) {
    bt(this, "builder");
    bt(this, "configs");
    bt(this, "_dependency");
    bt(this, "_peerNameSet");
    bt(this, "extension");
    bt(this, "state");
    bt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Ar };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
<<<<<<< HEAD
<<<<<<< HEAD
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : si;
=======
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : yi;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ni;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Ca(n) || nt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, c) {
      return Object.assign(l, { config: d, id: Kn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(e, s.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: fn, initResult: d, registerState: c });
    }(s, i, a);
  }
  build(e) {
    const n = this.state;
    let o;
<<<<<<< HEAD
<<<<<<< HEAD
    n.id !== dn && et(307, String(n.id), String(Ee)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Ee, output: s, registerState: l });
=======
    n.id !== mn && nt(307, String(n.id), String(Re)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Re, output: i, registerState: l });
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    n.id !== fn && nt(307, String(n.id), String(Se)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Se, output: i, registerState: l });
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
<<<<<<< HEAD
<<<<<<< HEAD
    o.id !== Ee && et(308, String(o.id), String(Ee));
=======
    o.id !== Re && nt(308, String(o.id), String(Re));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    o.id !== Se && nt(308, String(o.id), String(Se));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Gn });
    }(o), () => {
<<<<<<< HEAD
      const i = this.state;
      i.id !== Ge && et(309, String(o.id), String(Ge)), this.state = function(s) {
        return Object.assign(s, { id: Ee });
      }(i), a && a();
=======
      const s = this.state;
      s.id !== He && nt(309, String(o.id), String(He)), this.state = function(i) {
        return Object.assign(i, { id: Se });
      }(s), a && a();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Gn && nt(310, String(n.id), String(Gn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: He });
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
      return n.id >= He;
    }(e) || nt(316, String(e.id), String(He)), e;
  }
  getDirectDependentNames() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.builder.incomingEdges.get(this.extension.name) || Ll;
=======
    return this.builder.incomingEdges.get(this.extension.name) || Wl;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return this.builder.incomingEdges.get(this.extension.name) || Jl;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
<<<<<<< HEAD
<<<<<<< HEAD
        return n.id >= Ee;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
=======
        return n.id >= Re;
=======
        return n.id >= Se;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    }
    return this._dependency;
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
const Qr = { tag: fr };
function jl() {
  const t = le();
  t.isEmpty() && t.append(Cn());
}
const zl = Gt({ config: rn({ setOptions: Qr, updateOptions: Qr }), init: ({ $initialEditorState: t = jl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (di(i)) t.setEditorState(i, n);
    else if (typeof i == "function") t.update(() => {
      i(t);
=======
const wo = { tag: br };
function Zl() {
  const t = le();
  t.isEmpty() && t.append(Rn());
=======
const po = { tag: vr };
function Ql() {
  const t = ce();
  t.isEmpty() && t.append(Sn());
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
const tc = Xt({ config: sn({ setOptions: po, updateOptions: po }), init: ({ $initialEditorState: t = Ql }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (Ti(s)) t.setEditorState(s, n);
    else if (typeof s == "function") t.update(() => {
      s(t);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = t.parseEditorState(s);
      t.setEditorState(i, n);
    }
  }
  return () => {
  };
<<<<<<< HEAD
<<<<<<< HEAD
}, name: "@lexical/extension/InitialState", nodes: [li, Eo, wi, ci, Co] }), to = Symbol.for("@lexical/extension/LexicalBuilder");
function eo() {
}
function Fl(t) {
=======
}, name: "@lexical/extension/InitialState", nodes: [ki, Vo, _i, Ci, $o] }), po = Symbol.for("@lexical/extension/LexicalBuilder");
function uo() {
}
function tc(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, name: "@lexical/extension/InitialState", nodes: [_i, zo, Ci, Ei, jo] }), uo = Symbol.for("@lexical/extension/LexicalBuilder");
function mo() {
}
function ec(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  throw t;
}
function hn(t) {
  return Array.isArray(t) ? t : [t];
}
const Hn = "0.41.0+prod.esm";
class Ze {
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
<<<<<<< HEAD
<<<<<<< HEAD
    const n = [pn(zl)];
    for (const o of e) n.push(pn(o));
    return new We(n);
  }
  static maybeFromEditor(e) {
    const n = e[to];
    return n && (n.PACKAGE_VERSION !== Bn && et(292, n.PACKAGE_VERSION, Bn), n instanceof We || et(293)), n;
=======
    const n = [fn(Ql)];
    for (const o of e) n.push(fn(o));
    return new We(n);
  }
  static maybeFromEditor(e) {
    const n = e[po];
    return n && (n.PACKAGE_VERSION !== Un && nt(292, n.PACKAGE_VERSION, Un), n instanceof We || nt(293)), n;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const n = [hn(tc)];
    for (const o of e) n.push(hn(o));
    return new Ze(n);
  }
  static maybeFromEditor(e) {
    const n = e[uo];
<<<<<<< HEAD
    return n && (n.PACKAGE_VERSION !== Hn && nt(292, n.PACKAGE_VERSION, Hn), n instanceof Je || nt(293)), n;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    return n && (n.PACKAGE_VERSION !== Hn && nt(292, n.PACKAGE_VERSION, Hn), n instanceof Ze || nt(293)), n;
>>>>>>> 5dcbb312b7 (Address all PR comments)
  }
  static fromEditor(e) {
    const n = Ze.maybeFromEditor(e);
    return n === void 0 && nt(294), n;
  }
  constructEditor() {
<<<<<<< HEAD
<<<<<<< HEAD
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(_o({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [to]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = eo;
=======
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Lo({ ...o, ...n ? { onError: (s) => {
=======
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Vo({ ...o, ...n ? { onError: (s) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      n(s, a);
    } } : {} }), { [uo]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
<<<<<<< HEAD
    let e = uo;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    let e = mo;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    function n() {
      try {
        e();
      } finally {
<<<<<<< HEAD
<<<<<<< HEAD
        e = eo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = we(this.registerEditor(o), () => o.setRootElement(null)), o;
=======
        e = uo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = ce(this.registerEditor(o), () => o.setRootElement(null)), o;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        e = mo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = de(this.registerEditor(o), () => o.setRootElement(null)), o;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new Vl(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && et(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && et(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = pn(s);
=======
    if (a !== void 0 && a.extension !== o && nt(298, o.name), !a) {
      a = new Zl(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && nt(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && nt(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
<<<<<<< HEAD
        const l = fn(i);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        const l = hn(i);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let s = o.state;
      if (Ca(s)) return;
      const i = o.extension.name;
      var l;
      Un(s) || nt(300, i, a || "[unknown]"), Un(l = s) || nt(304, String(l.id), String(Ar)), s = Object.assign(l, { id: pr }), o.state = s;
      const d = this.outgoingConfigEdges.get(i);
      if (d) for (const c of d.keys()) {
        const p = this.extensionNameMap.get(c);
        p && n(p, i);
      }
<<<<<<< HEAD
<<<<<<< HEAD
      i = $l(i), o.state = i, e.push(o);
=======
      s = Xl(s), o.state = s, e.push(o);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      s = Wl(s), o.state = s, e.push(o);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
    return we(...a);
=======
    return ce(...a);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return de(...a);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
<<<<<<< HEAD
      const { extension: f } = p;
      if (f.onError !== void 0 && (e.onError = f.onError), f.disableEvents !== void 0 && (e.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (e.parentEditor = f.parentEditor), f.editable !== void 0 && (e.editable = f.editable), f.namespace !== void 0 && (e.namespace = f.namespace), f.$initialEditorState !== void 0 && (e.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of Al(f)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && et(302, f.name, h.replace.name, u.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, u] of f.html.export.entries()) a.set(h, u);
        f.html.import && Object.assign(i, f.html.import);
      }
      f.theme && wa(s, f.theme);
=======
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
<<<<<<< HEAD
      u.theme && Na(i, u.theme);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      u.theme && ka(i, u.theme);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }
    Object.keys(i).length > 0 && (e.theme = i), n.size && (e.nodes = [...n]);
    const d = Object.keys(s).length > 0, c = a.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = s), c && (e.html.export = a));
    for (const p of l) p.init(e);
<<<<<<< HEAD
<<<<<<< HEAD
    return e.onError || (e.onError = Fl), e;
  }
}
const Bl = /* @__PURE__ */ new Set(), no = Gt({ build(t, e, n) {
  const o = n.getDependency(ir).output, a = Qe({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = la(() => {
  }, () => ce(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Lt()) for (const [p, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(p);
          continue;
        }
        const h = Ni(p), u = h && h.isSelected() || !1;
        w = w || u !== (!!s && s.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
=======
    return e.onError || (e.onError = tc), e;
=======
    return e.onError || (e.onError = ec), e;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
}
const nc = /* @__PURE__ */ new Set(), fo = Xt({ build(t, e, n) {
  const o = n.getDependency(wr).output, a = en({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Na(() => {
  }, () => we(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let d, c = !1;
    o.value.read(() => {
      if (Vt()) for (const [p, u] of l.entries()) {
        if (u.size === 0) {
          l.delete(p);
          continue;
        }
<<<<<<< HEAD
        const h = $i(p), f = h && h.isSelected() || !1;
        c = c || f !== (!!i && i.has(p)), f && (d = d || /* @__PURE__ */ new Set(), d.add(p));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        const h = Vi(p), m = h && h.isSelected() || !1;
        c = c || m !== (!!i && i.has(p)), m && (d = d || /* @__PURE__ */ new Set(), d.add(p));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
    }), !c && d && i && d.size === i.size || (s.value = d);
  }));
<<<<<<< HEAD
  return { watchNodeKey: function(s) {
    const l = Ol(() => (i.value || Bl).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [ir], name: "@lexical/extension/NodeSelection" });
pi("INSERT_HORIZONTAL_RULE_COMMAND");
class Me extends Jn {
=======
  return { watchNodeKey: function(i) {
    const l = Hl(() => (s.value || nc).has(i)), { watchedNodeKeys: d } = a.peek();
    let c = d.get(i);
    const p = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), p || (d.set(i, c), a.value = { watchedNodeKeys: d }), l;
  } };
<<<<<<< HEAD
}, dependencies: [dr], name: "@lexical/extension/NodeSelection" });
Ti("INSERT_HORIZONTAL_RULE_COMMAND");
class Oe extends tr {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, dependencies: [wr], name: "@lexical/extension/NodeSelection" });
Ri("INSERT_HORIZONTAL_RULE_COMMAND");
<<<<<<< HEAD
class Ie extends er {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
class Ae extends er {
>>>>>>> 5dcbb312b7 (Address all PR comments)
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    return new Me(e.__key);
=======
    return new Oe(e.__key);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return new Ie(e.__key);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    return new Ae(e.__key);
>>>>>>> 5dcbb312b7 (Address all PR comments)
  }
  static importJSON(e) {
    return Ea().updateFromJSON(e);
  }
  static importDOM() {
<<<<<<< HEAD
<<<<<<< HEAD
    return { hr: () => ({ conversion: Kl, priority: 0 }) };
=======
    return { hr: () => ({ conversion: nc, priority: 0 }) };
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return { hr: () => ({ conversion: rc, priority: 0 }) };
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return qo(n, e.theme.hr), n;
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
<<<<<<< HEAD
<<<<<<< HEAD
function Kl() {
  return { node: pa() };
}
function pa() {
  return yi(Me);
}
function Gl(t) {
  return t instanceof Me;
}
Gt({ dependencies: [ir, no], name: "@lexical/extension/HorizontalRule", nodes: () => [Me], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(no).output, a = Qe({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return we(t.registerCommand(ui, (s) => {
    if (mi(s.target)) {
      const l = fi(s.target);
      if (Gl(l)) return function(c, w = !1) {
        const p = Lt(), f = c.isSelected(), h = c.getKey();
        let u;
        w && Mo(p) ? u = p : (u = hi(), gi(u)), f ? u.delete(h) : u.add(h);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Oo), t.registerMutationListener(Me, (s, l) => {
    Ml(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, f] of s.entries()) if (f === "destroyed") w.delete(p), c = !0;
      else {
        const h = w.get(p), u = t.getElementByKey(p);
        h ? h.domNode.value = u : (c = !0, w.set(p, { domNode: Qe(u), selectedSignal: o(p) }));
=======
function nc() {
  return { node: Ca() };
=======
function rc() {
  return { node: Ea() };
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
function Ea() {
  return $i(Ae);
}
function oc(t) {
  return t instanceof Ae;
}
Xt({ dependencies: [wr, fo], name: "@lexical/extension/HorizontalRule", nodes: () => [Ae], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(fo).output, a = en({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return de(t.registerCommand(Si, (i) => {
    if (Di(i.target)) {
      const l = Mi(i.target);
      if (oc(l)) return function(d, c = !1) {
        const p = Vt(), u = d.isSelected(), h = d.getKey();
        let m;
        c && Uo(p) ? m = p : (m = Oi(), Ii(m)), u ? m.delete(h) : m.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Ho), t.registerMutationListener(Ae, (i, l) => {
    Ul(() => {
      let d = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, u] of i.entries()) if (u === "destroyed") c.delete(p), d = !0;
      else {
<<<<<<< HEAD
        const h = c.get(p), f = t.getElementByKey(p);
        h ? h.domNode.value = f : (d = !0, c.set(p, { domNode: Qe(f), selectedSignal: o(p) }));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      }
      d && (a.value = { nodeSelections: c });
    });
<<<<<<< HEAD
  }), ce(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(ce(() => {
      const w = l.value;
      w && (c.value ? Io(w, i) : ki(w, i));
    }));
    return we(...s);
=======
  }), de(() => {
=======
        const h = c.get(p), m = t.getElementByKey(p);
        h ? h.domNode.value = m : (d = !0, c.set(p, { domNode: en(m), selectedSignal: o(p) }));
      }
      d && (a.value = { nodeSelections: c });
    });
  }), we(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    const i = [];
    for (const { domNode: l, selectedSignal: d } of a.value.nodeSelections.values()) i.push(we(() => {
      const c = l.value;
      c && (d.value ? qo(c, s) : ji(c, s));
    }));
<<<<<<< HEAD
    return ce(...i);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return de(...i);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }));
} });
function Ta(t) {
  return t.canBeEmpty();
}
<<<<<<< HEAD
<<<<<<< HEAD
function ql(t, e, n = ua) {
  return we(t.registerCommand(_i, (o) => {
    const a = Lt();
    if (!Ne(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => hn(h) && h.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, p = w.getNode(), f = Rl(p);
      if (f.canIndent()) {
        const h = f.getKey();
        let u = Ci();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = Ei(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Ti : Gr : Ri;
    return t.dispatchCommand(i, void 0);
  }, So), t.registerCommand(Gr, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Lt();
    if (!Ne(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return Sl((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
=======
function oc(t, e, n = Ea) {
  return ce(t.registerCommand(ji, (o) => {
    const a = $t();
=======
function ac(t, e, n = Ta) {
  return de(t.registerCommand(zi, (o) => {
    const a = Vt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    if (!ke(a)) return !1;
    o.preventDefault();
    const s = function(i) {
      if (i.getNodes().filter((h) => yn(h) && h.canIndent()).length > 0) return !0;
      const l = i.anchor, d = i.focus, c = d.isBefore(l) ? d : l, p = c.getNode(), u = Bl(p);
      if (u.canIndent()) {
        const h = u.getKey();
        let m = Fi();
        if (m.anchor.set(h, 0, "element"), m.focus.set(h, 0, "element"), m = Bi(m), m.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? Ki : no : Gi;
    return t.dispatchCommand(s, void 0);
  }, Ko), t.registerCommand(no, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Vt();
    if (!ke(a)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return Kl((i) => {
      if (s(i)) {
        const l = i.getIndent() + 1;
        (!o || l < o) && i.setIndent(l);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      }
    });
  }, xr));
}
<<<<<<< HEAD
<<<<<<< HEAD
Gt({ build: (t, e, n) => Rn(e), config: rn({ $canIndent: ua, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return ce(() => {
    if (!o.value) return ql(t, a, i);
  });
} });
const Ul = Gt({ name: "@lexical/react/ReactProvider" });
function Hl() {
  return le().getTextContent();
}
function Yl(t, e = !0) {
  if (t) return !1;
  let n = Hl();
  return e && (n = n.trim()), n === "";
}
function Xl(t) {
  if (!Yl(t, !1)) return !1;
=======
Ht({ build: (t, e, n) => Mn(e), config: on({ $canIndent: Ea, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
=======
Xt({ build: (t, e, n) => On(e), config: sn({ $canIndent: Ta, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const { disabled: o, maxIndent: a, $canIndent: s } = n.getOutput();
  return we(() => {
    if (!o.value) return ac(t, a, s);
  });
} });
const sc = Xt({ name: "@lexical/react/ReactProvider" });
function ic() {
  return ce().getTextContent();
}
function lc(t, e = !0) {
  if (t) return !1;
  let n = ic();
  return e && (n = n.trim()), n === "";
}
<<<<<<< HEAD
function lc(t) {
  if (!ic(t, !1)) return !1;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  const e = le().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
<<<<<<< HEAD
    if (Si(a)) return !1;
    if (se(a)) {
      if (!Di(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!gn(c)) return !1;
=======
    if (Gi(a)) return !1;
=======
function cc(t) {
  if (!lc(t, !1)) return !1;
  const e = ce().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (Ui(a)) return !1;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    if (se(a)) {
      if (!Hi(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const d = s[o];
<<<<<<< HEAD
        if (!yn(d)) return !1;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        if (!Nn(d)) return !1;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
    }
  }
  return !0;
}
<<<<<<< HEAD
<<<<<<< HEAD
function ma(t) {
  return () => Xl(t);
=======
function Ta(t) {
  return () => lc(t);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
}
=======
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
function Ra(t) {
  return () => cc(t);
}
function Sa(t) {
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
<<<<<<< HEAD
          const c = l.args;
          if (c) {
            const [w, p, f, h, u] = c;
            t.update(() => {
              const g = Lt();
              if (Ne(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (gn(v) && w >= 0 && p >= 0 && (y = w, N = w + p, g.setTextNodeRange(v, y, v, N)), y === N && f === "" || (g.insertRawText(f), v = x.getNode()), gn(v)) {
                  y = h, N = h + u;
=======
          const d = l.args;
          if (d) {
            const [c, p, u, h, m] = d;
            t.update(() => {
              const g = Vt();
              if (ke(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
<<<<<<< HEAD
                if (yn(v) && c >= 0 && p >= 0 && (y = c, N = c + p, g.setTextNodeRange(v, y, v, N)), y === N && u === "" || (g.insertRawText(u), v = x.getNode()), yn(v)) {
                  y = h, N = h + f;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                if (Nn(v) && c >= 0 && p >= 0 && (y = c, N = c + p, g.setTextNodeRange(v, y, v, N)), y === N && u === "" || (g.insertRawText(u), v = x.getNode()), Nn(v)) {
                  y = h, N = h + m;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Gt({ build: (t, e, n) => Rn(e), config: rn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => ce(() => n.getOutput().disabled.value ? void 0 : fa(t)) });
function Wl(t, ...e) {
=======
Ht({ build: (t, e, n) => Mn(e), config: on({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => de(() => n.getOutput().disabled.value ? void 0 : Ra(t)) });
function cc(t, ...e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Xt({ build: (t, e, n) => On(e), config: sn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => we(() => n.getOutput().disabled.value ? void 0 : Sa(t)) });
function dc(t, ...e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
<<<<<<< HEAD
<<<<<<< HEAD
const Cr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function Jl({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = R(() => n.getDecorators());
    return Cr(() => n.registerDecoratorListener((s) => {
      zi(() => {
        i(s);
      });
    }), [n]), q(() => {
      i(n.getDecorators());
    }, [n]), F(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (h) => n._onError(h), children: r(us, { fallback: null, children: a[w] }) }), f = n.getElementByKey(w);
        f !== null && s.push(Fi(p, f, w));
=======
const Ar = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Qt : G;
function dc({ editor: t, ErrorBoundary: e }) {
=======
const Pr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function wc({ editor: t, ErrorBoundary: e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return function(n, o) {
    const [a, s] = T(() => n.getDecorators());
    return Pr(() => n.registerDecoratorListener((i) => {
      nl(() => {
        s(i);
      });
    }), [n]), G(() => {
      s(n.getDecorators());
    }, [n]), K(() => {
      const i = [], l = Object.keys(a);
      for (let d = 0; d < l.length; d++) {
<<<<<<< HEAD
        const c = l[d], p = r(o, { onError: (h) => n._onError(h), children: r(Ss, { fallback: null, children: a[c] }) }), u = n.getElementByKey(c);
        u !== null && i.push(nl(p, u, c));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        const c = l[d], p = r(o, { onError: (h) => n._onError(h), children: r(Ds, { fallback: null, children: a[c] }) }), u = n.getElementByKey(c);
        u !== null && i.push(rl(p, u, c));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
      return i;
    }, [o, a, n]);
  }(t, e);
}
<<<<<<< HEAD
<<<<<<< HEAD
function Zl({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = We.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Ul.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Wl(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Jl, { editor: t, ErrorBoundary: e });
}
function ro(t) {
  return t.getEditorState().read(ma(t.isComposing()));
}
function Ql({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Ht();
  return function(a) {
    Cr(() => we(ji(a), fa(a)), [a]);
  }(o), d(ct, { children: [t, r(tw, { content: e }), r(Zl, { editor: o, ErrorBoundary: n })] });
}
function tw({ content: t }) {
  const [e] = Ht(), n = function(a) {
    const [i, s] = R(() => ro(a));
    return Cr(() => {
      function l() {
        const c = ro(a);
        s(c);
      }
      return l(), we(a.registerUpdateListener(() => {
=======
function wc({ editor: t, ErrorBoundary: e }) {
=======
function pc({ editor: t, ErrorBoundary: e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return function(n) {
    const o = Ze.maybeFromEditor(n);
    if (o && o.hasExtensionByName(sc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && dc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(wc, { editor: t, ErrorBoundary: e });
}
function ho(t) {
  return t.getEditorState().read(Ra(t.isComposing()));
}
function uc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Zt();
  return function(a) {
    Pr(() => de(el(a), Sa(a)), [a]);
  }(o), w(et, { children: [t, r(mc, { content: e }), r(pc, { editor: o, ErrorBoundary: n })] });
}
function mc({ content: t }) {
  const [e] = Zt(), n = function(a) {
    const [s, i] = T(() => ho(a));
    return Pr(() => {
      function l() {
        const d = ho(a);
        i(d);
      }
<<<<<<< HEAD
      return l(), ce(a.registerUpdateListener(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      return l(), de(a.registerUpdateListener(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
<<<<<<< HEAD
    }, [a]), i;
  }(e), o = _l();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function ew({ defaultSelection: t }) {
  const [e] = Ht();
  return q(() => {
=======
    }, [a]), s;
  }(e), o = Vl();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function fc({ defaultSelection: t }) {
  const [e] = Zt();
  return G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
<<<<<<< HEAD
<<<<<<< HEAD
const nw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function rw({ onClear: t }) {
  const [e] = Ht();
  return nw(() => sa(e, t), [e, t]), null;
}
const ha = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Zt : q;
function ow({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: f, ariaRequired: h, autoCapitalize: u, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...z }, L) {
  const [T, $] = R(t.isEditable()), C = K((V) => {
=======
const fc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Qt : G;
function hc({ onClear: t }) {
  const [e] = Xt();
  return fc(() => va(e, t), [e, t]), null;
}
const Sa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Qt : G;
function gc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: u, ariaRequired: h, autoCapitalize: f, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...B }, $) {
  const [R, L] = T(t.isEditable()), C = z((V) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), S = K(() => /* @__PURE__ */ function(...V) {
    return (j) => {
      for (const I of V) typeof I == "function" ? I(j) : I != null && (I.current = j);
    };
<<<<<<< HEAD
  }(L, C), [C, L]);
  return ha(() => ($(t.isEditable()), t.registerEditableListener((V) => {
    $(V);
  })), [t]), r("div", { "aria-activedescendant": T ? e : void 0, "aria-autocomplete": T ? n : "none", "aria-controls": T ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": T && v === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": T ? f : void 0, "aria-readonly": !T || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: T, "data-testid": k, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: _, ...z });
}
const aw = nn(ow);
function oo(t) {
  return t.getEditorState().read(ma(t.isComposing()));
}
const sw = nn(iw);
function iw(t, e) {
  const { placeholder: n, ...o } = t, [a] = Ht();
  return d(ct, { children: [r(aw, { editor: a, ...o, ref: e }), n != null && r(lw, { editor: a, content: n })] });
}
function lw({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = R(() => oo(s));
    return ha(() => {
      function w() {
        const p = oo(s);
        c(p);
      }
      return w(), we(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
=======
  }($, C), [C, $]);
  return Sa(() => (L(t.isEditable()), t.registerEditableListener((V) => {
    L(V);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": R && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": R ? u : void 0, "aria-readonly": !R || void 0, "aria-required": h, autoCapitalize: f, className: g, contentEditable: R, "data-testid": k, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: _, ...B });
=======
const hc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function gc({ onClear: t }) {
  const [e] = Zt();
  return hc(() => xa(e, t), [e, t]), null;
}
const Da = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? ne : G;
function bc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: u, ariaRequired: h, autoCapitalize: m, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: _, "data-testid": k, ...B }, F) {
  const [L, D] = T(t.isEditable()), C = j(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? t.setRootElement($) : t.setRootElement(null);
  }, [t]), R = K(() => /* @__PURE__ */ function(...$) {
    return (V) => {
      for (const I of $) typeof I == "function" ? I(V) : I != null && (I.current = V);
    };
<<<<<<< HEAD
  }(V, C), [C, V]);
  return Da(() => (L(t.isEditable()), t.registerEditableListener((j) => {
    L(j);
  })), [t]), r("div", { "aria-activedescendant": R ? e : void 0, "aria-autocomplete": R ? n : "none", "aria-controls": R ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": R && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": R ? u : void 0, "aria-readonly": !R || void 0, "aria-required": h, autoCapitalize: m, className: g, contentEditable: R, "data-testid": k, id: x, ref: S, role: v, spellCheck: y, style: N, tabIndex: _, ...B });
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  }(F, C), [C, F]);
  return Da(() => (D(t.isEditable()), t.registerEditableListener(($) => {
    D($);
  })), [t]), r("div", { "aria-activedescendant": L ? e : void 0, "aria-autocomplete": L ? n : "none", "aria-controls": L ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": L && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": p, "aria-owns": L ? u : void 0, "aria-readonly": !L || void 0, "aria-required": h, autoCapitalize: m, className: g, contentEditable: L, "data-testid": k, id: x, ref: R, role: v, spellCheck: y, style: N, tabIndex: _, ...B });
>>>>>>> 5dcbb312b7 (Address all PR comments)
}
const vc = an(bc);
function go(t) {
  return t.getEditorState().read(Ra(t.isComposing()));
}
const xc = an(yc);
function yc(t, e) {
  const { placeholder: n, ...o } = t, [a] = Zt();
  return w(et, { children: [r(vc, { editor: a, ...o, ref: e }), n != null && r(Nc, { editor: a, content: n })] });
}
function Nc({ content: t, editor: e }) {
  const n = function(i) {
    const [l, d] = T(() => go(i));
    return Da(() => {
      function c() {
        const p = go(i);
        d(p);
      }
      return c(), de(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      }));
    }, [i]), l;
  }(e), [o, a] = T(e.isEditable());
  if (ne(() => (a(e.isEditable()), e.registerEditableListener((i) => {
    a(i);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
<<<<<<< HEAD
<<<<<<< HEAD
function ww({
=======
function Nc({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function kc({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
    sw,
=======
    vc,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    xc,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
const ga = kn(void 0);
function cw({
=======
const Da = En(void 0);
function kc({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Ma = Tn(void 0);
function _c({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
  return /* @__PURE__ */ r(Ma.Provider, { value: i, children: s });
}
function Oa() {
  const t = br(Ma);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
<<<<<<< HEAD
<<<<<<< HEAD
function dw() {
  const [t, e] = R(void 0), n = K(() => {
=======
function _c() {
  const [t, e] = T(void 0), n = z(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Cc() {
<<<<<<< HEAD
  const [t, e] = T(void 0), n = $(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  const [t, e] = T(void 0), n = j(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
    e(void 0);
  }, []), o = K(() => {
    if (t === void 0)
      return;
<<<<<<< HEAD
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(el, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(Go, { children: [
      /* @__PURE__ */ r(qo, { children: /* @__PURE__ */ r(Uo, { children: i }) }),
      s
=======
    const { title: s, content: i } = t;
    return /* @__PURE__ */ r(ra, { open: !0, onOpenChange: n, children: /* @__PURE__ */ w(aa, { children: [
      /* @__PURE__ */ r(kr, { children: /* @__PURE__ */ r(Cr, { children: s }) }),
      i
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    ] }) });
  }, [t, n]), a = j(
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
<<<<<<< HEAD
<<<<<<< HEAD
function pw({
  children: t
}) {
  const [e] = Ht(), [n, o] = R(e), [a, i] = R("paragraph"), [s, l] = dw(), c = () => {
  };
  return q(() => n.registerCommand(
    Ao,
    (w, p) => (o(p), !1),
    hr
  ), [n]), /* @__PURE__ */ d(
    cw,
=======
function Cc({
=======
function Ec({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  children: t
}) {
  const [e] = Zt(), [n, o] = T(e), [a, s] = T("paragraph"), [i, l] = Cc(), d = () => {
  };
  return G(() => n.registerCommand(
    Yo,
    (c, p) => (o(p), !1),
    xr
  ), [n]), /* @__PURE__ */ w(
<<<<<<< HEAD
    kc,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    _c,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    {
      activeEditor: n,
      $updateToolbar: d,
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
<<<<<<< HEAD
<<<<<<< HEAD
function uw(t) {
  const [e] = Ht(), { activeEditor: n } = ba();
  q(() => n.registerCommand(
    Ao,
=======
function Ec(t) {
  const [e] = Xt(), { activeEditor: n } = Ma();
  G(() => n.registerCommand(
    Ho,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Tc(t) {
  const [e] = Zt(), { activeEditor: n } = Oa();
  G(() => n.registerCommand(
    Yo,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    () => {
      const o = Vt();
      return o && t(o), !1;
    },
    xr
  ), [e, t]), G(() => {
    n.getEditorState().read(() => {
      const o = Vt();
      o && t(o);
    });
  }, [n, t]);
}
<<<<<<< HEAD
<<<<<<< HEAD
const va = pe(
=======
const Oa = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Ia = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
), mw = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Lo.Root,
  {
    ref: a,
    className: m(va({ variant: e, size: n, className: t })),
    ...o
  }
));
mw.displayName = Lo.Root.displayName;
const xa = b.createContext({
=======
), Tc = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Xo.Root,
=======
), Rc = b.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Jo.Root,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  {
    ref: a,
    className: f(Ia({ variant: e, size: n, className: t })),
    ...o
  }
));
<<<<<<< HEAD
Tc.displayName = Xo.Root.displayName;
const Ia = b.createContext({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Rc.displayName = Jo.Root.displayName;
const Aa = b.createContext({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  size: "default",
  variant: "default"
}), Lr = b.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = wt();
  return /* @__PURE__ */ r(
    Dn.Root,
    {
<<<<<<< HEAD
      ref: i,
=======
      ref: s,
<<<<<<< HEAD
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
=======
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        Aa.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Lr.displayName = Dn.Root.displayName;
const Qe = b.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(Aa);
  return /* @__PURE__ */ r(
    Dn.Item,
    {
<<<<<<< HEAD
      ref: i,
      className: m(
        va({
          variant: s.variant || n,
          size: s.size || o
=======
      ref: s,
      className: f(
        Ia({
          variant: i.variant || n,
          size: i.size || o
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Je.displayName = En.Item.displayName;
const ao = [
  { format: "bold", icon: hs, label: "Bold" },
  { format: "italic", icon: gs, label: "Italic" }
=======
Je.displayName = Sn.Item.displayName;
const go = [
  { format: "bold", icon: Os, label: "Bold" },
  { format: "italic", icon: Is, label: "Italic" }
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ze.displayName = Dn.Item.displayName;
=======
Qe.displayName = Dn.Item.displayName;
>>>>>>> 5dcbb312b7 (Address all PR comments)
const bo = [
  { format: "bold", icon: Is, label: "Bold" },
  { format: "italic", icon: As, label: "Italic" }
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
<<<<<<< HEAD
<<<<<<< HEAD
function fw() {
  const { activeEditor: t } = ba(), [e, n] = R([]), o = K((a) => {
    if (Ne(a) || Bi(a)) {
      const i = [];
      ao.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return uw(o), /* @__PURE__ */ r(
    Er,
=======
function Rc() {
  const { activeEditor: t } = Ma(), [e, n] = T([]), o = z((a) => {
    if (ke(a) || rl(a)) {
=======
function Sc() {
  const { activeEditor: t } = Oa(), [e, n] = T([]), o = j((a) => {
    if (ke(a) || ol(a)) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      const s = [];
      bo.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
<<<<<<< HEAD
  return Ec(o), /* @__PURE__ */ r(
    Pr,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return Tc(o), /* @__PURE__ */ r(
    Lr,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
<<<<<<< HEAD
<<<<<<< HEAD
      children: ao.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
=======
      children: go.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        Je,
=======
      children: bo.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
<<<<<<< HEAD
        Ze,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        Qe,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            t.dispatchCommand(Go, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function hw({ onClear: t }) {
  const [e] = Ht();
  q(() => {
=======
function Sc({ onClear: t }) {
  const [e] = Xt();
=======
function Dc({ onClear: t }) {
  const [e] = Zt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    t && t(() => {
      e.dispatchCommand(Bo, void 0);
    });
  }, [e, t]);
}
<<<<<<< HEAD
<<<<<<< HEAD
function gw({
=======
function Dc({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Mc({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
<<<<<<< HEAD
  const [, o] = R(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(pw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(fw, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Ql,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(ww, { placeholder: t }) }),
          ErrorBoundary: yl
        }
      ),
      e && /* @__PURE__ */ r(ew, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(hw, { onClear: n }),
      /* @__PURE__ */ r(rw, {})
    ] })
  ] });
}
const bw = {
=======
  const [, o] = T(void 0);
  return /* @__PURE__ */ w("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Ec, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Sc, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        uc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(kc, { placeholder: t }) }),
          ErrorBoundary: Pl
        }
      ),
      e && /* @__PURE__ */ r(fc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Dc, { onClear: n }),
      /* @__PURE__ */ r(gc, {})
    ] })
  ] });
}
<<<<<<< HEAD
const Mc = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Oc = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  namespace: "commentEditor",
  theme: Mr,
  nodes: Or,
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
<<<<<<< HEAD
<<<<<<< HEAD
          fl,
          {
            initialConfig: {
              ...bw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ d(Rt, { children: [
              /* @__PURE__ */ r(gw, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                gl,
=======
          Rl,
=======
          Sl,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          {
            initialConfig: {
              ...Oc,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(Rt, { children: [
              /* @__PURE__ */ r(Mc, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
<<<<<<< HEAD
                Dl,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                Ml,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function vw(t, e) {
  const n = Ii(e) ? e.body.childNodes : e.childNodes;
=======
function Oc(t, e) {
  const n = Yi(e) ? e.body.childNodes : e.childNodes;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Ic(t, e) {
  const n = Xi(e) ? e.body.childNodes : e.childNodes;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  let o = [];
  const a = [];
  for (const s of n) if (!La.has(s.nodeName)) {
    const i = $a(s, t, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Xo && i.insertAfter(Wo());
    for (const i of s) {
      const l = i.getChildren();
      for (const d of l) i.insertBefore(d);
      i.remove();
    }
  }(a), o;
}
<<<<<<< HEAD
<<<<<<< HEAD
function xw(t, e) {
=======
function Ic(t, e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Ac(t, e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ce().getChildren();
  for (let a = 0; a < o.length; a++)
    Pa(t, o[a], n, e);
  return n.innerHTML;
}
function Pa(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
<<<<<<< HEAD
  const i = se(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && gn(e) && (s = Cl(o, e, "clone"));
  const l = se(s) ? s.getChildren() : [], c = Mi(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: p, after: f } = w;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = ya(t, g, h, o);
    !a && se(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Oi(p) || qr(p)) && p.append(h), n.append(p), f) {
      const u = f.call(s, p);
      u && (qr(p) ? p.replaceChildren(u) : p.replaceWith(u));
=======
  const s = se(e) && e.excludeFromCopy("html");
  let i = e;
  o !== null && Nn(e) && (i = jl(o, e, "clone"));
  const l = se(i) ? i.getChildren() : [], d = qi(t, i.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, i) : i.exportDOM(t);
  const { element: p, after: u } = c;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let m = 0; m < l.length; m++) {
    const g = l[m], x = Pa(t, g, h, o);
    !a && se(e) && x && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
<<<<<<< HEAD
    if ((qi(p) || no(p)) && p.append(h), n.append(p), u) {
      const f = u.call(i, p);
      f && (no(p) ? p.replaceChildren(f) : p.replaceWith(f));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    if ((Yi(p) || ro(p)) && p.append(h), n.append(p), u) {
      const m = u.call(i, p);
      m && (ro(p) ? p.replaceChildren(m) : p.replaceWith(m));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }
  } else n.append(h);
  return a;
}
const La = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function $a(t, e, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (La.has(t.nodeName)) return i;
  let l = null;
  const d = function(g, x) {
    const { nodeName: v } = g, y = x._htmlConversions.get(v.toLowerCase());
    let N = null;
    if (y !== void 0) for (const _ of y) {
      const k = _(g);
      k !== null && (N === null || (N.priority || 0) <= (k.priority || 0)) && (N = k);
    }
    return N !== null ? N.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let p = null;
  if (c !== null) {
    p = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const f = t.childNodes;
  let h = [];
<<<<<<< HEAD
<<<<<<< HEAD
  const u = (l == null || !Ai(l)) && (l != null && hn(l) || o);
  for (let g = 0; g < f.length; g++) h.push(...ka(f[g], e, n, u, new Map(a), l));
  return p != null && (h = p(h)), Ur(t) && (h = yw(t, h, u ? () => {
    const g = new Po();
    return n.push(g), g;
  } : Cn)), l == null ? h.length > 0 ? s = s.concat(h) : Ur(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Hr(g.nextSibling) && Hr(g.previousSibling);
  }(t) && (s = s.concat($o())) : se(l) && l.append(...h), s;
}
function yw(t, e, n) {
=======
  const f = (l == null || !Xi(l)) && (l != null && xn(l) || o);
  for (let g = 0; g < u.length; g++) h.push(...La(u[g], e, n, f, new Map(a), l));
  return p != null && (h = p(h)), ro(t) && (h = Ac(t, h, f ? () => {
    const g = new qo();
=======
  const m = (l == null || !Wi(l)) && (l != null && yn(l) || o);
  for (let g = 0; g < u.length; g++) h.push(...$a(u[g], e, n, m, new Map(a), l));
  return p != null && (h = p(h)), oo(t) && (h = Pc(t, h, m ? () => {
    const g = new Xo();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    return n.push(g), g;
  } : Sn)), l == null ? h.length > 0 ? i = i.concat(h) : oo(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : ao(g.nextSibling) && ao(g.previousSibling);
  }(t) && (i = i.concat(Wo())) : se(l) && l.append(...h), i;
}
<<<<<<< HEAD
function Ac(t, e, n) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Pc(t, e, n) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const o = t.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i];
    if (yn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === e.length - 1 || i < e.length - 1 && yn(e[i + 1])) {
      const d = n();
      d.setFormat(o), d.append(...s), a.push(d), s = [];
    }
  }
  return a;
}
function Va(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function ja(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ja(e.children)
  ) : !1;
}
function Pt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ja(t.root.children) : !1;
}
<<<<<<< HEAD
<<<<<<< HEAD
function Nw(t) {
=======
function Pc(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Lc(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Zo({
    namespace: "EditorUtils",
    theme: Mr,
    nodes: Or,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const a = new DOMParser().parseFromString(t, "text/html"), i = vw(e, a);
      le().clear(), Pi(i);
=======
      const a = new DOMParser().parseFromString(t, "text/html"), s = Oc(e, a);
      le().clear(), Wi(s);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      const a = new DOMParser().parseFromString(t, "text/html"), s = Ic(e, a);
      ce().clear(), Ji(s);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
  const e = Zo({
    namespace: "EditorUtils",
    theme: Mr,
    nodes: Or,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    o = xw(e);
=======
    o = Ic(e);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    o = Ac(e);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function $r(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function vn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Vr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
<<<<<<< HEAD
<<<<<<< HEAD
const kw = {
=======
const Lc = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const $c = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function pp({
=======
function Bp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Hp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const [a, i] = R(kw), [s, l] = R(void 0), [c, w] = R(!1), p = Y(void 0), f = Y(null);
  q(() => {
=======
  const [a, s] = T(Lc), [i, l] = T(void 0), [d, c] = T(!1), p = H(void 0), u = H(null);
=======
  const [a, s] = T($c), [i, l] = T(void 0), [d, c] = T(!1), p = H(void 0), u = H(null);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    let y = !0;
    const N = f.current;
    if (!N) return;
    const _ = setTimeout(() => {
      y && Va(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, []);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const h = K(() => {
    if (!It(a)) return;
    const y = xn(a);
    e(y, s);
  }, [a, e, s]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(B, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r($e, {}) }) }),
=======
  const h = z(() => {
    if (!At(a)) return;
    const y = _n(a);
=======
  const h = $(() => {
=======
  const h = j(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
    if (!Pt(a)) return;
    const y = Cn(a);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    e(y, i);
  }, [a, e, i]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-2", children: [
<<<<<<< HEAD
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Pt, { children: [
          /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r($e, {}) }) }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
<<<<<<< HEAD
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ve, {}) }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(z, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(je, {}) }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
          /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
          /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
            z,
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
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(re, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
        B,
=======
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Yt, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(pe, { asChild: !0, children: /* @__PURE__ */ w(
=======
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ w(Kt, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(fo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Kn(s !== void 0 ? s : "", o) })
=======
            /* @__PURE__ */ r(Eo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Hn(i !== void 0 ? i : "", o) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(Ro, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: qn(i !== void 0 ? i : "", o) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Mt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(Jt, { children: t.map((y) => /* @__PURE__ */ r(
            Bt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), c(!1);
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
        ref: f,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (y) => {
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : Vr(y) && (y.preventDefault(), y.stopPropagation(), Pt(a) && h());
        },
        onKeyDown: (y) => {
          $r(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          _n,
          {
            editorSerializedState: a,
<<<<<<< HEAD
            onSerializedChange: (y) => i(y),
            placeholder: u,
=======
            onSerializedChange: (y) => s(y),
<<<<<<< HEAD
            placeholder: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            placeholder: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            onClear: (y) => {
              p.current = y;
            }
          }
        )
      }
    )
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const up = Object.freeze([
=======
const Kp = Object.freeze([
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const qp = Object.freeze([
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
<<<<<<< HEAD
<<<<<<< HEAD
]), mp = [
=======
]), Gp = [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
]), Yp = [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
], _w = ["input", "select", "textarea", "button"], Cw = ["button", "textbox"], Ew = ({
=======
], $c = ["input", "select", "textarea", "button"], Vc = ["button", "textbox"], jc = ({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
], Vc = ["input", "select", "textarea", "button"], jc = ["button", "textbox"], zc = ({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const a = Y(null), [i, s] = R(void 0), [l, c] = R(void 0), w = K(
    (u) => {
      s(u);
      const g = t.find((v) => v.id === u);
      g && (e == null || e(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), p = K(
    (u) => {
      const g = t.find((x) => x.id === u);
      g && (c((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || _w.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && Cw.includes(x)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = K(
    (u) => {
      var T;
      const g = u.target, x = ($) => $ ? document.getElementById($) : void 0, v = x(l), y = x(i);
      if (!!(v && g && v.contains(g) && g !== v) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const $ = t.find((C) => C.id === l);
            $ && w($.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
=======
  const a = H(null), [s, i] = T(void 0), [l, d] = T(void 0), c = z(
    (f) => {
      i(f);
      const g = t.find((v) => v.id === f);
=======
  const a = H(null), [s, i] = T(void 0), [l, d] = T(void 0), c = $(
=======
  const a = H(null), [s, i] = T(void 0), [l, d] = T(void 0), c = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (m) => {
      i(m);
      const g = t.find((v) => v.id === m);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      g && (e == null || e(g));
      const x = document.getElementById(m);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), p = j(
    (m) => {
      const g = t.find((x) => x.id === m);
      g && (d((x) => x === m ? void 0 : m), n == null || n(g));
    },
    [n, t]
  ), u = (m) => {
    if (!m) return !1;
    const g = m.tagName.toLowerCase();
    if (m.isContentEditable || Vc.includes(g)) return !0;
    const x = m.getAttribute("role");
    if (x && jc.includes(x)) return !0;
    const v = m.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = j(
    (m) => {
      var L;
      const g = m.target, x = (D) => D ? document.getElementById(D) : void 0, v = x(l), y = x(s);
      if (!!(v && g && v.contains(g) && g !== v) && u(g)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const D = t.find((C) => C.id === l);
            D && c(D.id);
          }
          return;
        }
<<<<<<< HEAD
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          if (!v) return;
          const D = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const C = D.findIndex(($) => $ === g);
          if (C === -1) return;
<<<<<<< HEAD
          let S;
<<<<<<< HEAD
<<<<<<< HEAD
          u.key === "ArrowDown" ? S = Math.min(C + 1, $.length - 1) : S = Math.max(C - 1, 0), S !== C && (u.preventDefault(), u.stopPropagation(), (T = $[S]) == null || T.focus());
=======
          f.key === "ArrowDown" ? S = Math.min(C + 1, L.length - 1) : S = Math.max(C - 1, 0), S !== C && (f.preventDefault(), f.stopPropagation(), (R = L[S]) == null || R.focus());
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          m.key === "ArrowDown" ? S = Math.min(C + 1, L.length - 1) : S = Math.max(C - 1, 0), S !== C && (m.preventDefault(), m.stopPropagation(), (R = L[S]) == null || R.focus());
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          let R;
          m.key === "ArrowDown" ? R = Math.min(C + 1, D.length - 1) : R = Math.max(C - 1, 0), R !== C && (m.preventDefault(), m.stopPropagation(), (L = D[R]) == null || L.focus());
>>>>>>> 5dcbb312b7 (Address all PR comments)
          return;
        }
        return;
      }
<<<<<<< HEAD
<<<<<<< HEAD
      const k = t.findIndex(($) => $.id === i);
      let z = k;
      switch (u.key) {
        case "ArrowDown":
          z = Math.min(k + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(k - 1, 0), u.preventDefault();
          break;
        case "Home":
          z = 0, u.preventDefault();
          break;
        case "End":
          z = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && p(i), u.preventDefault(), u.stopPropagation();
=======
      const k = t.findIndex((L) => L.id === s);
=======
      const k = t.findIndex((D) => D.id === s);
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
          s && p(s), f.preventDefault(), f.stopPropagation();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          s && p(s), m.preventDefault(), m.stopPropagation();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          return;
        case "ArrowRight": {
          const D = y;
          if (D) {
            const C = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), R = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
<<<<<<< HEAD
<<<<<<< HEAD
            ), V = C ?? S;
            if (V) {
<<<<<<< HEAD
              u.preventDefault(), V.focus();
=======
              f.preventDefault(), V.focus();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            ), j = C ?? S;
            if (j) {
              m.preventDefault(), j.focus();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
            ), $ = C ?? R;
            if ($) {
              m.preventDefault(), $.focus();
>>>>>>> 5dcbb312b7 (Address all PR comments)
              return;
            }
          }
          break;
        }
        default:
<<<<<<< HEAD
<<<<<<< HEAD
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (o == null || o(u.key), u.preventDefault()));
=======
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (u(g) || (o == null || o(f.key), f.preventDefault()));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          m.key.length === 1 && !m.metaKey && !m.ctrlKey && !m.altKey && (u(g) || (o == null || o(m.key), m.preventDefault()));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          return;
      }
      const F = t[B];
      F && c(F.id);
    },
    [t, c, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: c
  };
<<<<<<< HEAD
<<<<<<< HEAD
}, Tw = pe(
=======
}, zc = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, Fc = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
), Oe = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", Tw({ variant: e }), t), ...n })
);
Oe.displayName = "Badge";
const Ea = b.forwardRef(
=======
), Ie = b.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", zc({ variant: e }), t), ...n })
);
Ie.displayName = "Badge";
const ja = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
), Ae = b.forwardRef(
=======
), Pe = b.forwardRef(
>>>>>>> 5dcbb312b7 (Address all PR comments)
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: f("pr-twp", Fc({ variant: e }), t), ...n })
);
Pe.displayName = "Badge";
const za = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Ea.displayName = "Card";
const Rw = b.forwardRef(
=======
ja.displayName = "Card";
const Fc = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
za.displayName = "Card";
const Bc = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
<<<<<<< HEAD
<<<<<<< HEAD
Rw.displayName = "CardHeader";
const Sw = b.forwardRef(
=======
Fc.displayName = "CardHeader";
const Bc = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Bc.displayName = "CardHeader";
const Kc = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Sw.displayName = "CardTitle";
const Dw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Dw.displayName = "CardDescription";
const Ta = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ta.displayName = "CardContent";
const Mw = b.forwardRef(
=======
Bc.displayName = "CardTitle";
const Kc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Kc.displayName = "CardDescription";
const za = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
za.displayName = "CardContent";
const Gc = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Kc.displayName = "CardTitle";
const Gc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: f("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Gc.displayName = "CardDescription";
const Fa = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Fa.displayName = "CardContent";
const Uc = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
<<<<<<< HEAD
<<<<<<< HEAD
Mw.displayName = "CardFooter";
const Ie = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  jo.Root,
=======
Gc.displayName = "CardFooter";
const Ae = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Jo.Root,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Uc.displayName = "CardFooter";
const Le = b.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Qo.Root,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Ie.displayName = jo.Root.displayName;
const Ra = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Root,
=======
Ae.displayName = Jo.Root.displayName;
const Fa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Fe.Root,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Pe.displayName = Qo.Root.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Root,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
Le.displayName = Qo.Root.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ke.Root,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  {
    ref: n,
    className: f(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Ra.displayName = ze.Root.displayName;
const Ow = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Image,
=======
Fa.displayName = Fe.Root.displayName;
const Uc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Fe.Image,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ba.displayName = Be.Root.displayName;
const Hc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Image,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
Ba.displayName = Ke.Root.displayName;
const Hc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ke.Image,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  {
    ref: n,
    className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Ow.displayName = ze.Image.displayName;
const Sa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ze.Fallback,
=======
Uc.displayName = Fe.Image.displayName;
const Ba = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Fe.Fallback,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Hc.displayName = Be.Image.displayName;
const Ka = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Fallback,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
Hc.displayName = Ke.Image.displayName;
const Ka = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ke.Fallback,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  {
    ref: n,
    className: f(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Sa.displayName = ze.Fallback.displayName;
const Sr = kn(void 0);
function zt() {
  const t = mr(Sr);
=======
Ba.displayName = Fe.Fallback.displayName;
const Vr = En(void 0);
function Ft() {
  const t = gr(Vr);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ka.displayName = Be.Fallback.displayName;
=======
Ka.displayName = Ke.Fallback.displayName;
>>>>>>> 5dcbb312b7 (Address all PR comments)
const jr = Tn(void 0);
function Gt() {
  const t = br(jr);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
<<<<<<< HEAD
<<<<<<< HEAD
const oe = pe("", {
=======
const re = we("", {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const re = pe("", {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
<<<<<<< HEAD
<<<<<<< HEAD
}), ke = ot.Trigger, Da = ot.Group, Iw = ot.Portal, Aw = ot.Sub, Pw = ot.RadioGroup;
function de({ variant: t = "default", ...e }) {
=======
}), Ee = at.Trigger, Ka = at.Group, Ga = at.Portal, Ua = at.Sub, Ha = at.RadioGroup;
function ue({ variant: t = "default", ...e }) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}), Te = at.Trigger, Ga = at.Group, Ua = at.Portal, Ha = at.Sub, qa = at.RadioGroup;
function me({ variant: t = "default", ...e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(jr.Provider, { value: n, children: /* @__PURE__ */ r(at.Root, { ...e }) });
}
const zr = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Gt();
  return /* @__PURE__ */ w(
    at.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
<<<<<<< HEAD
        oe({ variant: i.variant })
=======
        re({ variant: s.variant })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
=======
        /* @__PURE__ */ r(Me, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Ma.displayName = ot.SubTrigger.displayName;
const Oa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Oa.displayName = ot.SubContent.displayName;
const te = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
    ot.Content,
=======
jr.displayName = at.SubTrigger.displayName;
const zr = b.forwardRef(({ className: t, children: e, ...n }, o) => {
=======
zr.displayName = at.SubTrigger.displayName;
const Fr = b.forwardRef(({ className: t, children: e, ...n }, o) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
Fr.displayName = at.SubContent.displayName;
const oe = b.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
    at.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
te.displayName = ot.Content.displayName;
const yn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ft(), i = zt();
=======
oe.displayName = at.Content.displayName;
<<<<<<< HEAD
const tn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = wt(), s = Ft();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const nn = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = wt(), s = Gt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r(
    at.Item,
    {
      ref: o,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
<<<<<<< HEAD
        oe({ variant: i.variant })
=======
        re({ variant: s.variant })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
        oe({ variant: i.variant })
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
const Br = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = wt(), s = Gt();
  return /* @__PURE__ */ w(
    at.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
<<<<<<< HEAD
        oe({ variant: a.variant })
=======
        re({ variant: s.variant })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
Br.displayName = at.RadioItem.displayName;
const cn = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
cn.displayName = at.Label.displayName;
const Re = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Be.displayName = ot.Separator.displayName;
function $w({ className: t, ...e }) {
=======
Te.displayName = at.Separator.displayName;
function qa({ className: t, ...e }) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Re.displayName = at.Separator.displayName;
function Ya({ className: t, ...e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
$w.displayName = "DropdownMenuShortcut";
function so({
=======
qa.displayName = "DropdownMenuShortcut";
function bo({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ya.displayName = "DropdownMenuShortcut";
function vo({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
<<<<<<< HEAD
  const [c, w] = R(!1), [p, f] = R(), h = Y(null);
  q(() => {
    if (!c) return;
=======
  const [d, c] = T(!1), [p, u] = T(), h = H(null);
  G(() => {
    if (!d) return;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    let k = !0;
    const B = h.current;
    if (!B) return;
    const F = setTimeout(() => {
      k && Va(B);
    }, 300);
    return () => {
      k = !1, clearTimeout(F);
    };
<<<<<<< HEAD
  }, [c]);
  const u = K(
    (k) => {
      k && k.stopPropagation(), w(!1), f(void 0), s == null || s(!1);
=======
  }, [d]);
  const m = j(
    (k) => {
      k && k.stopPropagation(), c(!1), u(void 0), i == null || i(!1);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    },
    [i]
  ), g = j(
    async (k) => {
      if (k && k.stopPropagation(), !p || !a) return;
      await a(
        t.id,
<<<<<<< HEAD
<<<<<<< HEAD
        xn(p)
      ) && (w(!1), f(void 0), s == null || s(!1));
    },
    [p, a, t.id, s]
  ), x = F(() => {
    const k = new Date(t.date), z = Ws(
=======
        _n(p)
=======
        Cn(p)
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ) && (c(!1), u(void 0), i == null || i(!1));
    },
    [p, a, t.id, i]
  ), x = K(() => {
<<<<<<< HEAD
    const k = new Date(t.date), B = wi(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const k = new Date(t.date), B = pi(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      k,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), F = k.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
<<<<<<< HEAD
    return be(n["%comment_dateAtTime%"], {
<<<<<<< HEAD
      date: z,
      time: L
=======
      date: B,
      time: $
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return ve(n["%comment_dateAtTime%"], {
      date: B,
<<<<<<< HEAD
      time: V
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      time: F
>>>>>>> 5dcbb312b7 (Address all PR comments)
    });
  }, [t.date, n]), v = K(() => t.user, [t.user]), y = K(
    () => t.user.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
<<<<<<< HEAD
<<<<<<< HEAD
  ), N = F(() => Js(t.contents), [t.contents]), _ = F(() => {
=======
  ), N = K(() => pi(t.contents), [t.contents]), _ = K(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  ), N = K(() => ui(t.contents), [t.contents]), _ = K(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    if (o && l)
      return /* @__PURE__ */ w(et, { children: [
        /* @__PURE__ */ w(
          nn,
          {
            onClick: (k) => {
<<<<<<< HEAD
<<<<<<< HEAD
              k.stopPropagation(), w(!0), f(Nw(t.contents)), s == null || s(!0);
=======
              k.stopPropagation(), c(!0), u(Pc(t.contents)), i == null || i(!0);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              k.stopPropagation(), c(!0), u(Lc(t.contents)), i == null || i(!0);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            },
            children: [
              /* @__PURE__ */ r(Ps, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
              /* @__PURE__ */ r(Ls, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
        /* @__PURE__ */ r(Ba, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ka, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            e && t.assignedUser !== void 0 && /* @__PURE__ */ d(Oe, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
=======
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ie, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ae, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Pe, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
>>>>>>> 5dcbb312b7 (Address all PR comments)
              "→ ",
              vn(t.assignedUser, n)
            ] })
          ] }),
          d && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (k) => {
<<<<<<< HEAD
<<<<<<< HEAD
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), u()) : Rr(k) && (k.preventDefault(), k.stopPropagation(), It(p) && g());
=======
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), f()) : $r(k) && (k.preventDefault(), k.stopPropagation(), At(p) && g());
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                k.key === "Escape" ? (k.preventDefault(), k.stopPropagation(), m()) : Vr(k) && (k.preventDefault(), k.stopPropagation(), Pt(p) && g());
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              },
              onKeyDown: (k) => {
                $r(k), (k.key === "Enter" || k.key === " ") && k.stopPropagation();
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
                    onSerializedChange: (k) => f(k)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
<<<<<<< HEAD
<<<<<<< HEAD
                      onClick: u,
=======
                      onClick: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                      onClick: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(je, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    z,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
<<<<<<< HEAD
<<<<<<< HEAD
                      disabled: !It(p),
                      children: /* @__PURE__ */ r(ho, {})
=======
                      disabled: !At(p),
                      children: /* @__PURE__ */ r(To, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                      disabled: !Pt(p),
                      children: /* @__PURE__ */ r(So, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(et, { children: [
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
<<<<<<< HEAD
<<<<<<< HEAD
        _ && /* @__PURE__ */ d(de, { children: [
          /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(xs, {}) }) }),
          /* @__PURE__ */ r(te, { align: "end", children: _ })
=======
        _ && /* @__PURE__ */ w(ue, { children: [
          /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ro, {}) }) }),
=======
        _ && /* @__PURE__ */ w(me, { children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Do, {}) }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Do, {}) }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
          /* @__PURE__ */ r(oe, { align: "end", children: _ })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const io = {
=======
const vo = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const xo = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Lw({
=======
function Hc({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function qc({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: d,
  thread: c,
  threadStatus: p,
  handleAddCommentToThread: f,
  handleUpdateComment: h,
<<<<<<< HEAD
<<<<<<< HEAD
  handleDeleteComment: u,
=======
  handleDeleteComment: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  handleDeleteComment: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  handleReadStatusChange: g,
  assignableUsers: x,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: y,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: _,
  isRead: k = !1,
  autoReadDelay: B = 5,
  onVerseRefClick: F
}) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [T, $] = R(io), [C, S] = R(
=======
  const [R, L] = T(vo), [C, S] = T(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const [R, L] = T(xo), [C, S] = T(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  const [L, D] = T(xo), [C, R] = T(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    void 0
  ), $ = o, [V, I] = T(!1), [A, Y] = T(!1), [M, W] = T(!1), [Ct, Ot] = T(!1), [It, pt] = T(!1), [P, S] = T(k), [U, Z] = T(!1), Q = H(void 0), [lt, xt] = T(/* @__PURE__ */ new Map());
  G(() => {
    let O = !0;
    return (async () => {
      const Et = N ? await N(d) : !1;
      O && pt(Et);
    })(), () => {
      O = !1;
    };
  }, [d, N]), G(() => {
    let O = !0;
    if (!o) {
      Ot(!1), xt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Et = y ? await y(d) : !1;
      O && Ot(Et);
    })(), () => {
      O = !1;
    };
  }, [o, d, y]);
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
        ut.map(async (Xr) => {
          const Es = await _(Xr.id);
          O && Et.set(Xr.id, Es);
        })
      ), O && xt(Et);
    })(), () => {
      O = !1;
    };
  }, [o, ut, _]);
  const yt = K(() => ut[0], [ut]), At = H(null), ht = H(void 0), gt = j(() => {
    var O;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    (O = ht.current) == null || O.call(ht), $(io);
  }, []), Yt = K(() => {
=======
    (O = ht.current) == null || O.call(ht), L(vo);
  }, []), Wt = z(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    (O = ht.current) == null || O.call(ht), L(xo);
  }, []), Qt = $(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    (O = ht.current) == null || O.call(ht), D(xo);
  }, []), Qt = j(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
    const O = !P;
    S(O), Z(!O), g == null || g(d, O);
  }, [P, g, d]);
  G(() => {
    I(!1);
  }, [o]), G(() => {
    if (o && !P && !U) {
      const O = setTimeout(() => {
        S(!0), g == null || g(d, !0);
      }, B * 1e3);
      return Q.current = O, () => clearTimeout(O);
    }
    Q.current && (clearTimeout(Q.current), Q.current = void 0);
  }, [o, P, U, B, d, g]);
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
<<<<<<< HEAD
<<<<<<< HEAD
    const O = fn(i, n);
    return be(n["%comment_assigned_to%"], {
      assignedUser: O
    });
  }, [i, n]), nt = F(() => pt.slice(1), [pt]), rt = F(() => nt.length ?? 0, [nt.length]), ut = F(() => rt > 0, [rt]), Xt = F(() => j || rt <= 2 ? nt : nt.slice(-2), [nt, rt, j]), Nt = F(() => j || rt <= 2 ? 0 : rt - 2, [rt, j]), sn = F(
    () => rt === 1 ? E.singleReply : be(E.multipleReplies, { count: rt }),
    [rt, E]
  ), me = F(
=======
    const O = bn(s, n);
    return be(n["%comment_assigned_to%"], {
=======
    const O = vn(s, n);
    return ve(n["%comment_assigned_to%"], {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      assignedUser: O
    });
  }, [s, n]), rt = K(() => ut.slice(1), [ut]), ot = K(() => rt.length ?? 0, [rt.length]), mt = K(() => ot > 0, [ot]), te = K(() => V || ot <= 2 ? rt : rt.slice(-2), [rt, ot, V]), Nt = K(() => V || ot <= 2 ? 0 : ot - 2, [ot, V]), wn = K(
    () => ot === 1 ? E.singleReply : ve(E.multipleReplies, { count: ot }),
    [ot, E]
<<<<<<< HEAD
  ), me = K(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    () => Nt === 1 ? E.singleReply : be(E.multipleReplies, { count: Nt }),
=======
  ), fe = K(
    () => Nt === 1 ? E.singleReply : ve(E.multipleReplies, { count: Nt }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    [Nt, E]
  );
  G(() => {
    !o && A && mt && Y(!1);
  }, [o, A, mt]);
  const qr = j(
    async (O) => {
      O && O.stopPropagation();
      const Ut = Pt(L) ? Cn(L) : void 0;
      if (C !== void 0) {
<<<<<<< HEAD
        await f({
          threadId: c,
          contents: Ft,
=======
        await u({
          threadId: d,
<<<<<<< HEAD
          contents: Bt,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          contents: Ut,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          assignedUser: C
        }) && (R(void 0), Ut && gt());
        return;
      }
<<<<<<< HEAD
<<<<<<< HEAD
      Ft && await f({ threadId: c, contents: Ft }) && gt();
    },
    [
      gt,
      T,
      f,
=======
      Bt && await u({ threadId: d, contents: Bt }) && gt();
=======
      Ut && await u({ threadId: d, contents: Ut }) && gt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    },
    [
      gt,
      L,
      u,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      C,
      d
    ]
  ), Yr = j(
    async (O) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const Ft = It(T) ? xn(T) : void 0, Et = await f({
=======
      const Bt = At(R) ? _n(R) : void 0, Et = await u({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      const Ut = Pt(R) ? Cn(R) : void 0, Et = await u({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      const Ut = Pt(L) ? Cn(L) : void 0, Et = await u({
>>>>>>> 5dcbb312b7 (Address all PR comments)
        ...O,
        contents: Ut,
        assignedUser: C ?? O.assignedUser
      });
      return Et && Ut && gt(), Et && C !== void 0 && R(void 0), Et;
    },
<<<<<<< HEAD
<<<<<<< HEAD
    [gt, T, f, C]
=======
    [gt, R, u, C]
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    [gt, L, u, C]
>>>>>>> 5dcbb312b7 (Address all PR comments)
  );
  return /* @__PURE__ */ r(
    za,
    {
      role: "option",
      "aria-selected": o,
<<<<<<< HEAD
      id: c,
=======
      id: d,
<<<<<<< HEAD
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      className: m(
=======
      className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && p !== "Resolved" && P,
          "tw-bg-background": o && p !== "Resolved" && P,
          "tw-bg-muted": p === "Resolved",
          "tw-bg-accent": !P && !o && p !== "Resolved"
        }
      ),
      onClick: () => {
        l(d);
      },
      tabIndex: -1,
<<<<<<< HEAD
<<<<<<< HEAD
      children: /* @__PURE__ */ d(Ta, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            X && /* @__PURE__ */ r(Oe, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
=======
      children: /* @__PURE__ */ w(za, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            X && /* @__PURE__ */ r(Ie, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      children: /* @__PURE__ */ w(Fa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
<<<<<<< HEAD
            X && /* @__PURE__ */ r(Ae, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
            X && /* @__PURE__ */ r(Pe, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                onClick: (O) => {
                  O.stopPropagation(), Qt();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": P ? "Mark as unread" : "Mark as read",
<<<<<<< HEAD
<<<<<<< HEAD
                children: P ? /* @__PURE__ */ r(ys, {}) : /* @__PURE__ */ r(Ns, {})
=======
                children: P ? /* @__PURE__ */ r(Ls, {}) : /* @__PURE__ */ r($s, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                children: P ? /* @__PURE__ */ r($s, {}) : /* @__PURE__ */ r(Vs, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              }
            ),
            It && p !== "Resolved" && /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "icon",
                className: f(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (O) => {
                  O.stopPropagation(), Yr({
                    threadId: d,
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
<<<<<<< HEAD
<<<<<<< HEAD
              ref: Ot,
=======
              ref: It,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
              className: m(
=======
              ref: At,
              className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": $
                },
                { "tw-whitespace-nowrap": !$ }
              ),
              children: [
                a && F ? /* @__PURE__ */ r(
                  z,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (O) => {
                      O.stopPropagation(), F(c);
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
<<<<<<< HEAD
<<<<<<< HEAD
            so,
=======
            bo,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            vo,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              comment: yt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: p,
              handleAddCommentToThread: Yr,
              handleUpdateComment: h,
<<<<<<< HEAD
<<<<<<< HEAD
              handleDeleteComment: u,
              onEditingChange: H,
              canEditOrDelete: (!A && it.get(yt.id)) ?? !1,
              canUserResolveThread: Mt
            }
          )
        ] }),
        /* @__PURE__ */ d(ct, { children: [
          ut && !o && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: sn })
=======
              handleDeleteComment: f,
=======
              handleDeleteComment: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              onEditingChange: Y,
              canEditOrDelete: (!A && lt.get(yt.id)) ?? !1,
              canUserResolveThread: It
            }
          )
        ] }),
        /* @__PURE__ */ w(et, { children: [
          mt && !o && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ae, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: dn })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Pe, {}) }),
=======
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Le, {}) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: wn })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          ] }),
          !o && Pt(L) && /* @__PURE__ */ r(
            _n,
            {
              editorSerializedState: L,
              onSerializedChange: (O) => D(O),
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ie, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: me }),
                    j ? /* @__PURE__ */ r(go, {}) : /* @__PURE__ */ r(Le, {})
=======
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Ae, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: me }),
                    j ? /* @__PURE__ */ r(So, {}) : /* @__PURE__ */ r(Ve, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Pe, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: fe }),
                    z ? /* @__PURE__ */ r(Mo, {}) : /* @__PURE__ */ r(je, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Le, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: fe }),
                    V ? /* @__PURE__ */ r(Mo, {}) : /* @__PURE__ */ r(ze, {})
>>>>>>> 5dcbb312b7 (Address all PR comments)
                  ] })
                ]
              }
            ),
<<<<<<< HEAD
<<<<<<< HEAD
            Xt.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              so,
=======
            Jt.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              bo,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            te.map((O) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              vo,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              {
                comment: O,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
<<<<<<< HEAD
<<<<<<< HEAD
                handleDeleteComment: u,
                onEditingChange: H,
                canEditOrDelete: (!A && it.get(O.id)) ?? !1
=======
                handleDeleteComment: f,
=======
                handleDeleteComment: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                onEditingChange: Y,
                canEditOrDelete: (!A && lt.get(O.id)) ?? !1
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
              }
            ) }, O.id)),
            v !== !1 && (!A || Pt(L)) && /* @__PURE__ */ w(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (O) => O.stopPropagation(),
                onKeyDownCapture: (O) => {
                  Vr(O) && (O.preventDefault(), O.stopPropagation(), (Pt(L) || C !== void 0) && qr());
                },
                onKeyDown: (O) => {
                  $r(O), (O.key === "Enter" || O.key === " ") && O.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    _n,
                    {
                      editorSerializedState: L,
                      onSerializedChange: (O) => D(O),
                      placeholder: p === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (O) => {
                        ht.current = O;
                      }
                    }
                  ),
<<<<<<< HEAD
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
=======
                  /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
<<<<<<< HEAD
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: be(
=======
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ve(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: vn(
                          C,
                          n
                        )
                      }
                    ) }),
<<<<<<< HEAD
<<<<<<< HEAD
                    /* @__PURE__ */ d(re, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
                        B,
=======
                    /* @__PURE__ */ w(Yt, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(pe, { asChild: !0, children: /* @__PURE__ */ r(
=======
                    /* @__PURE__ */ w(Kt, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                        F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                        z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !x || x.length === 0 || !x.includes(i),
                          "aria-label": "Assign user",
<<<<<<< HEAD
<<<<<<< HEAD
                          children: /* @__PURE__ */ r(fo, {})
=======
                          children: /* @__PURE__ */ r(Eo, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                          children: /* @__PURE__ */ r(Ro, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
                                R(O !== s ? O : void 0), W(!1);
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
                      z,
                      {
                        size: "icon",
                        onClick: qr,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Pt(L) && C === void 0,
                        "aria-label": "Submit comment",
<<<<<<< HEAD
<<<<<<< HEAD
                        children: /* @__PURE__ */ r(ho, {})
=======
                        children: /* @__PURE__ */ r(To, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                        children: /* @__PURE__ */ r(So, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function fp({
=======
function Up({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Xp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: c,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: h,
<<<<<<< HEAD
<<<<<<< HEAD
  canUserEditOrDeleteCommentCallback: u,
=======
  canUserEditOrDeleteCommentCallback: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  canUserEditOrDeleteCommentCallback: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
  ), F = B.map((I) => ({
    id: I.id
  })), L = j(
    (I) => {
      N((A) => new Set(A).add(I.id)), k(I.id), x == null || x(I.id);
    },
    [x]
  ), D = j(
    (I) => {
      const A = y.has(I);
      N((Y) => {
        const M = new Set(Y);
        return M.has(I) ? M.delete(I) : M.add(I), M;
      }), k(I), x == null || x(A ? void 0 : I);
    },
    [y, x]
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  ), { listboxRef: C, activeId: S, handleKeyDown: V } = Ew({
    options: L,
    onOptionSelect: T
  }), j = K(
=======
  ), { listboxRef: C, activeId: S, handleKeyDown: V } = jc({
    options: $,
    onOptionSelect: R
  }), j = z(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  ), { listboxRef: C, activeId: S, handleKeyDown: j } = zc({
    options: V,
    onOptionSelect: R
  }), z = $(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  ), { listboxRef: C, activeId: R, handleKeyDown: $ } = zc({
    options: F,
    onOptionSelect: L
  }), V = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (I) => {
      I.key === "Escape" ? (_ && y.has(_) && (N((A) => {
        const Y = new Set(A);
        return Y.delete(_), Y;
      }), k(void 0), x == null || x(void 0)), I.preventDefault(), I.stopPropagation()) : $(I);
    },
    [_, y, $, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": R ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: B.map((I) => /* @__PURE__ */ r(
        "div",
        {
          id: I.id,
          className: f({
            "tw-opacity-60": I.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
            Lw,
=======
            Hc,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            qc,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              classNameForVerseText: e,
              comments: I.comments,
              localizedStrings: a,
              verseRef: I.verseRef,
              handleSelectThread: D,
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
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: h,
<<<<<<< HEAD
<<<<<<< HEAD
              canUserEditOrDeleteCommentCallback: u,
=======
              canUserEditOrDeleteCommentCallback: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              canUserEditOrDeleteCommentCallback: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              onVerseRefClick: v
            }
          )
        },
        I.id
      ))
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function Vw({ table: t }) {
  return /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(Ki, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(ks, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(te, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(an, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Be, {}),
=======
function qc({ table: t }) {
  return /* @__PURE__ */ w(ue, { children: [
    /* @__PURE__ */ r(ol, { asChild: !0, children: /* @__PURE__ */ w(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Vs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(oe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ln, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Te, {}),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Yc({ table: t }) {
  return /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(al, { asChild: !0, children: /* @__PURE__ */ w(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(js, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(oe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(cn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Re, {}),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const Ae = lt.Root, jw = lt.Group, Pe = lt.Value, zw = pe(
=======
const Pe = ct.Root, Yc = ct.Group, Le = ct.Value, Xc = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Le = ct.Root, Xc = ct.Group, $e = ct.Value, Wc = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
const $e = ct.Root, Xc = ct.Group, Ve = ct.Value, Wc = pe(
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
  const i = ft();
  return /* @__PURE__ */ d(
    lt.Trigger,
    {
      className: m(zw({ size: n, className: t })),
=======
  const s = wt();
  return /* @__PURE__ */ w(
    ct.Trigger,
    {
<<<<<<< HEAD
      className: m(Xc({ size: n, className: t })),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      className: f(Wc({ size: n, className: t })),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r(lt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
=======
        /* @__PURE__ */ r(ct.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ve, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        /* @__PURE__ */ r(ct.Icon, { asChild: !0, children: /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        /* @__PURE__ */ r(ct.Icon, { asChild: !0, children: /* @__PURE__ */ r(ze, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> 5dcbb312b7 (Address all PR comments)
      ]
    }
  );
});
<<<<<<< HEAD
_e.displayName = lt.Trigger.displayName;
const Aa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.ScrollUpButton,
=======
_e.displayName = ct.Trigger.displayName;
const Xa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.ScrollUpButton,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Mo, { className: "tw-h-4 tw-w-4" })
  }
));
Xa.displayName = ct.ScrollUpButton.displayName;
const Wa = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.ScrollDownButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    children: /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4" })
  }
));
Pa.displayName = lt.ScrollDownButton.displayName;
const Ce = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(lt.Portal, { children: /* @__PURE__ */ d(
    lt.Content,
=======
    children: /* @__PURE__ */ r(Ve, { className: "tw-h-4 tw-w-4" })
=======
    children: /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    children: /* @__PURE__ */ r(ze, { className: "tw-h-4 tw-w-4" })
>>>>>>> 5dcbb312b7 (Address all PR comments)
  }
));
Wa.displayName = ct.ScrollDownButton.displayName;
const Ce = b.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(ct.Portal, { children: /* @__PURE__ */ w(
    ct.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
        /* @__PURE__ */ r(Xa, {}),
        /* @__PURE__ */ r(
          ct.Viewport,
          {
            className: f(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Wa, {})
      ]
    }
  ) });
});
<<<<<<< HEAD
Ce.displayName = lt.Content.displayName;
const Fw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Label,
=======
Ce.displayName = ct.Content.displayName;
const Jc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Label,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Fw.displayName = lt.Label.displayName;
const Tt = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ d(
  lt.Item,
=======
Wc.displayName = ct.Label.displayName;
=======
Jc.displayName = ct.Label.displayName;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
const Tt = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
  ct.Item,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ct.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(ct.ItemText, { children: e })
    ]
  }
));
<<<<<<< HEAD
Tt.displayName = lt.Item.displayName;
const Bw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
=======
Tt.displayName = ct.Item.displayName;
const Zc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Separator,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Bw.displayName = lt.Separator.displayName;
function Kw({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
=======
Jc.displayName = ct.Separator.displayName;
function Zc({ table: t }) {
=======
Zc.displayName = ct.Separator.displayName;
function Qc({ table: t }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
<<<<<<< HEAD
      /* @__PURE__ */ d(
        Ae,
=======
      /* @__PURE__ */ w(
<<<<<<< HEAD
<<<<<<< HEAD
        Pe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        Le,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        $e,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Pe, { placeholder: t.getState().pagination.pageSize }) }),
=======
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Le, { placeholder: t.getState().pagination.pageSize }) }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r($e, { placeholder: t.getState().pagination.pageSize }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
            /* @__PURE__ */ r(_e, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ve, { placeholder: t.getState().pagination.pageSize }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(_s, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ r(js, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(zs, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(Cs, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ r(zs, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(Fs, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(Es, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ r(Fs, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(Bs, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(Ts, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ r(Bs, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(Ks, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          ]
        }
      )
    ] })
  ] }) });
}
<<<<<<< HEAD
<<<<<<< HEAD
const lo = `
=======
const xo = `
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const yo = `
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Gw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function tn(t, e) {
  const n = e ? `${lo}, ${e}` : lo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Gw(o)
=======
function Qc(t) {
=======
function td(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function rn(t, e) {
  const n = e ? `${yo}, ${e}` : yo;
  return Array.from(t.querySelectorAll(n)).filter(
<<<<<<< HEAD
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Qc(o)
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && td(o)
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(i, {
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
<<<<<<< HEAD
<<<<<<< HEAD
Dn.displayName = "TableHeader";
const Mn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", t), ...e }));
Mn.displayName = "TableBody";
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
In.displayName = "TableHeader";
const An = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", t), ...e }));
An.displayName = "TableBody";
const td = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
An.displayName = "TableHeader";
const Pn = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: f("[&_tr:last-child]:tw-border-0", t), ...e }));
Pn.displayName = "TableBody";
const ed = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "tfoot",
  {
    ref: n,
    className: f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
qw.displayName = "TableFooter";
function Uw(t) {
=======
td.displayName = "TableFooter";
function ed(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ed.displayName = "TableFooter";
function nd(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Hw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Yw(t, e, n) {
=======
function nd(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function rd(t, e, n) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function rd(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function od(t, e, n) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const ee = b.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
<<<<<<< HEAD
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), Uw(s);
=======
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
<<<<<<< HEAD
  }, [s]), ed(i);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  }, [s]), nd(i);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const l = b.useMemo(
    () => i.current ? rn(i.current) : [],
    [i]
  ), d = b.useCallback(
    (p) => {
<<<<<<< HEAD
      const { current: f } = s;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), u = h ? (
=======
      const { current: u } = i;
      if (!u || !u.parentElement) return;
<<<<<<< HEAD
      const h = u.closest("table"), f = h ? (
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      const h = u.closest("table"), m = h ? (
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rn(h).filter(
          (v) => v.tagName === "TR"
        )
<<<<<<< HEAD
<<<<<<< HEAD
      ) : [], g = u.indexOf(f), x = l.indexOf(
=======
      ) : [], g = f.indexOf(u), x = l.indexOf(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      ) : [], g = m.indexOf(u), x = l.indexOf(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
<<<<<<< HEAD
<<<<<<< HEAD
        p.preventDefault(), Yw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Hw(l, x, p.key);
=======
        p.preventDefault(), rd(f, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), nd(l, x, p.key);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        p.preventDefault(), od(m, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), rd(l, x, p.key);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = f.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [i, l, e]
  ), c = b.useCallback(
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
<<<<<<< HEAD
      onKeyDown: c,
      onFocus: w,
=======
      onKeyDown: d,
      onFocus: c,
<<<<<<< HEAD
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      className: m(
=======
      className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
en.displayName = "TableHead";
=======
nn.displayName = "TableHead";
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
const ye = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
on.displayName = "TableHead";
const Ne = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "td",
  {
    ref: n,
    className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
<<<<<<< HEAD
ye.displayName = "TableCell";
<<<<<<< HEAD
const Xw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
const od = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ne.displayName = "TableCell";
const ad = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "caption",
  {
    ref: n,
    className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Xw.displayName = "TableCaption";
function wr({ className: t, ...e }) {
=======
od.displayName = "TableCaption";
function pr({ className: t, ...e }) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ad.displayName = "TableCaption";
function ur({ className: t, ...e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function Ww({
=======
function ad({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function sd({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: d = !1,
  noResultsMessage: c
}) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  var L;
  const [p, f] = R([]), [h, u] = R([]), [g, x] = R({}), [v, y] = R({}), N = F(() => e ?? [], [e]), _ = zo({
    data: N,
    columns: t,
    getCoreRowModel: Bo(),
    ...n && { getPaginationRowModel: qi() },
    onSortingChange: f,
    getSortedRowModel: Fo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Gi(),
=======
  var $;
  const [p, u] = T([]), [h, f] = T([]), [g, x] = T({}), [v, y] = T({}), N = K(() => e ?? [], [e]), _ = Zo({
=======
  var V;
=======
  var F;
>>>>>>> 5dcbb312b7 (Address all PR comments)
  const [p, u] = T([]), [h, m] = T([]), [g, x] = T({}), [v, y] = T({}), N = K(() => e ?? [], [e]), _ = ta({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    data: N,
    columns: t,
    getCoreRowModel: na(),
    ...n && { getPaginationRowModel: il() },
    onSortingChange: u,
<<<<<<< HEAD
    getSortedRowModel: Qo(),
    onColumnFiltersChange: f,
    getFilteredRowModel: al(),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    getSortedRowModel: ea(),
    onColumnFiltersChange: m,
    getFilteredRowModel: sl(),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: p,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: v
    }
  }), k = _.getVisibleFlatColumns();
<<<<<<< HEAD
  let z;
  return c ? z = Array.from({ length: 10 }).map((C, S) => `skeleton-row-${S}`).map((C) => /* @__PURE__ */ r(Wt, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(ye, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(wr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((L = _.getRowModel().rows) == null ? void 0 : L.length) > 0 ? z = _.getRowModel().rows.map((T) => /* @__PURE__ */ r(
    Wt,
    {
      onClick: () => s(T, _),
      "data-state": T.getIsSelected() && "selected",
      children: T.getVisibleCells().map(($) => /* @__PURE__ */ r(ye, { children: Ye($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    T.id
  )) : z = /* @__PURE__ */ r(Wt, { children: /* @__PURE__ */ r(ye, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Vw, { table: _ }),
    /* @__PURE__ */ d(Sn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Dn, { stickyHeader: i, children: _.getHeaderGroups().map((T) => /* @__PURE__ */ r(Wt, { children: T.headers.map(($) => /* @__PURE__ */ r(en, { className: "tw-p-0", children: $.isPlaceholder ? void 0 : Ye($.column.columnDef.header, $.getContext()) }, $.id)) }, T.id)) }),
      /* @__PURE__ */ r(Mn, { children: z })
=======
  let B;
  return d ? B = Array.from({ length: 10 }).map((C, R) => `skeleton-row-${R}`).map((C) => /* @__PURE__ */ r(ee, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Ne, { colSpan: k.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(ur, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((F = _.getRowModel().rows) == null ? void 0 : F.length) > 0 ? B = _.getRowModel().rows.map((L) => /* @__PURE__ */ r(
    ee,
    {
      onClick: () => i(L, _),
      "data-state": L.getIsSelected() && "selected",
      children: L.getVisibleCells().map((D) => /* @__PURE__ */ r(Ne, { children: We(D.column.columnDef.cell, D.getContext()) }, D.id))
    },
<<<<<<< HEAD
    R.id
<<<<<<< HEAD
  )) : B = /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(ye, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(qc, { table: _ }),
    /* @__PURE__ */ w(On, { stickyHeader: s, children: [
      /* @__PURE__ */ r(In, { stickyHeader: s, children: _.getHeaderGroups().map((R) => /* @__PURE__ */ r(Zt, { children: R.headers.map((L) => /* @__PURE__ */ r(nn, { className: "tw-p-0", children: L.isPlaceholder ? void 0 : Ye(L.column.columnDef.header, L.getContext()) }, L.id)) }, R.id)) }),
      /* @__PURE__ */ r(An, { children: B })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
=======
    L.id
>>>>>>> 5dcbb312b7 (Address all PR comments)
  )) : B = /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(Ne, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Yc, { table: _ }),
    /* @__PURE__ */ w(In, { stickyHeader: s, children: [
      /* @__PURE__ */ r(An, { stickyHeader: s, children: _.getHeaderGroups().map((L) => /* @__PURE__ */ r(ee, { children: L.headers.map((D) => /* @__PURE__ */ r(on, { className: "tw-p-0", children: D.isPlaceholder ? void 0 : We(D.column.columnDef.header, D.getContext()) }, D.id)) }, L.id)) }),
      /* @__PURE__ */ r(Pn, { children: B })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
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
<<<<<<< HEAD
<<<<<<< HEAD
    n && o && /* @__PURE__ */ r(Kw, { table: _ })
  ] });
}
function hp({
=======
    n && o && /* @__PURE__ */ r(Zc, { table: _ })
  ] });
}
function Hp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    n && o && /* @__PURE__ */ r(Qc, { table: _ })
  ] });
}
function Wp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
      children: /* @__PURE__ */ r(Yi, { options: i, children: e })
    }
  );
}
const Jw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), wo = (t, e) => t[e] ?? e;
function Zw({
=======
      children: /* @__PURE__ */ r(cl, { options: s, children: e })
=======
      children: /* @__PURE__ */ r(dl, { options: s, children: e })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }
  );
}
const id = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
<<<<<<< HEAD
]), yo = (t, e) => t[e] ?? e;
function id({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
]), No = (t, e) => t[e] ?? e;
function ld({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const a = wo(n, "%webView_error_dump_header%"), i = wo(n, "%webView_error_dump_info_message%");
  function s() {
=======
  const a = yo(n, "%webView_error_dump_header%"), s = yo(n, "%webView_error_dump_info_message%");
=======
  const a = No(n, "%webView_error_dump_header%"), s = No(n, "%webView_error_dump_info_message%");
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  function i() {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
          /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Oo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const gp = Object.freeze([
  ...Jw,
  "%webView_error_dump_copied_message%"
]);
function bp({
=======
const qp = Object.freeze([
  ...sd,
  "%webView_error_dump_copied_message%"
]);
function Yp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Jp = Object.freeze([
  ...id,
  "%webView_error_dump_copied_message%"
]);
function Zp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = T(!1), d = () => {
    l(!0), e && e();
  };
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(re, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: o }),
    /* @__PURE__ */ d(Ut, { id: i, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(mt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Zw,
=======
  return /* @__PURE__ */ w(Yt, { onOpenChange: (p) => {
=======
  return /* @__PURE__ */ w(Kt, { onOpenChange: (p) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: o }),
    /* @__PURE__ */ w(Mt, { id: s, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ft, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
<<<<<<< HEAD
        id,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        ld,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
var Qw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Qw || {});
function vp({ id: t, label: e, groups: n }) {
  const [o, a] = R(
=======
var ld = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(ld || {});
function Xp({ id: t, label: e, groups: n }) {
=======
var cd = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(cd || {});
function Qp({ id: t, label: e, groups: n }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const [o, a] = T(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
<<<<<<< HEAD
  ), [i, s] = R({}), l = (w, p) => {
    const f = !o[w][p];
    a((u) => (u[w][p] = f, { ...u }));
    const h = n[w].items[p];
    h.onUpdate(h.id, f);
  }, c = (w, p) => {
    s((h) => (h[w] = p, { ...h }));
    const f = n[w].items.find((h) => h.id === p);
    f ? f.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ d(B, { variant: "default", children: [
      /* @__PURE__ */ r(Rs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Le, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(te, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(an, { children: w.label }),
      /* @__PURE__ */ r(Da, { children: w.itemType === 0 ? /* @__PURE__ */ r(ct, { children: w.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Jt,
=======
  ), [s, i] = T({}), l = (c, p) => {
    const u = !o[c][p];
    a((m) => (m[c][p] = u, { ...m }));
    const h = n[c].items[p];
    h.onUpdate(h.id, u);
  }, d = (c, p) => {
    i((h) => (h[c] = p, { ...h }));
    const u = n[c].items.find((h) => h.id === p);
    u ? u.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ w(z, { variant: "default", children: [
      /* @__PURE__ */ r(Gs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(ze, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(oe, { children: n.map((c, p) => /* @__PURE__ */ w("div", { children: [
<<<<<<< HEAD
      /* @__PURE__ */ r(ln, { children: c.label }),
      /* @__PURE__ */ r(Ka, { children: c.itemType === 0 ? /* @__PURE__ */ r(et, { children: c.items.map((u, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Ut,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      /* @__PURE__ */ r(cn, { children: c.label }),
      /* @__PURE__ */ r(Ga, { children: c.itemType === 0 ? /* @__PURE__ */ r(et, { children: c.items.map((u, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Yt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
          children: f.label
        }
<<<<<<< HEAD
      ) }, f.id)) }) : /* @__PURE__ */ r(
        Pw,
        {
          value: i[p],
          onValueChange: (f) => c(p, f),
          children: w.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Ia, { value: f.id, children: f.label }) }, f.id))
=======
      ) }, u.id)) }) : /* @__PURE__ */ r(
        qa,
        {
          value: s[p],
          onValueChange: (u) => d(p, u),
<<<<<<< HEAD
          children: c.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Fr, { value: u.id, children: u.label }) }, u.id))
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          children: c.items.map((u) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Br, { value: u.id, children: u.label }) }, u.id))
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      ) }),
      /* @__PURE__ */ r(Re, {})
    ] }, c.label)) })
  ] }) });
}
<<<<<<< HEAD
<<<<<<< HEAD
function xp({
=======
function Wp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function tu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const c = new Zs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, f) => p + f, 0)), w = () => {
=======
  const d = new ui("en", {
=======
  const d = new mi("en", {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, u) => p + u, 0)), c = () => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Ss, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
=======
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Us, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
        (a || i) && /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            z,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
<<<<<<< HEAD
<<<<<<< HEAD
                /* @__PURE__ */ r(Ds, { className: "tw-h-4 tw-w-4" })
=======
                /* @__PURE__ */ r(Us, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ w(
            z,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
<<<<<<< HEAD
<<<<<<< HEAD
                /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" })
=======
                /* @__PURE__ */ r(Hs, { className: "tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                /* @__PURE__ */ r(qs, { className: "tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function tc({ id: t, versionHistory: e }) {
  const [n, o] = R(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, f = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
=======
function cd({ id: t, versionHistory: e }) {
  const [n, o] = T(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), p = c.getUTCFullYear() - 1970, u = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let f = "";
    return p > 0 ? f = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? f = `${u.toString()} month${u === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function dd({ id: t, versionHistory: e }) {
  const [n, o] = T(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(a.getTime() - d.getTime()), p = c.getUTCFullYear() - 1970, u = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let m = "";
    return p > 0 ? m = `${p.toString()} year${p === 1 ? "" : "s"} ago` : u > 0 ? m = `${u.toString()} month${u === 1 ? "" : "s"} ago` : h === 0 ? m = "today" : m = `${h.toString()} day${h === 1 ? "" : "s"} ago`, m;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }
  const i = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
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
<<<<<<< HEAD
<<<<<<< HEAD
function yp({
=======
function Jp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function eu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const s = F(() => Qs(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(ti(), { type: "language" });
    return w.map((f) => p.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(tc, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
=======
  const i = K(() => mi(n), [n]), d = ((c) => {
    const p = new Intl.DisplayNames(fi(), { type: "language" });
=======
  const i = K(() => fi(n), [n]), d = ((c) => {
    const p = new Intl.DisplayNames(hi(), { type: "language" });
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    return c.map((u) => p.of(u));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(dd, { versionHistory: a }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
<<<<<<< HEAD
<<<<<<< HEAD
function ec({
=======
function dd({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function wd({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
<<<<<<< HEAD
<<<<<<< HEAD
  icon: u = void 0,
=======
  icon: f = void 0,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  icon: m = void 0,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = T(!1), _ = j(
    (R) => {
      var V;
      const $ = (V = t.find((I) => I.label === R)) == null ? void 0 : V.value;
      $ && n(
        e.includes($) ? e.filter((I) => I !== $) : [...e, $]
      );
    },
    [t, e, n]
  ), k = () => d || o, B = K(() => {
    if (!h) return t;
    const R = t.filter((V) => V.starred).sort((V, I) => V.label.localeCompare(I.label)), $ = t.filter((V) => !V.starred).sort((V, I) => {
      const A = e.includes(V.value), Y = e.includes(I.value);
      return A && !Y ? -1 : !A && Y ? 1 : V.label.localeCompare(I.label);
    });
    return [...R, ...$];
  }, [t, e, h]), F = () => {
    n(t.map((R) => R.value));
  }, L = () => {
    n([]);
<<<<<<< HEAD
<<<<<<< HEAD
  }, $ = w ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ d(re, { open: $, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
      B,
=======
  }, L = c ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ w(Kt, { open: L, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
      F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  }, D = c ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ w(Kt, { open: D, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
      z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
      {
        variant: x,
        role: "combobox",
        "aria-expanded": D,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
=======
          /* @__PURE__ */ w("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
<<<<<<< HEAD
            f && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: f }) }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            m && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: m }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
          /* @__PURE__ */ r(Io, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ r(Ut, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(ee, { children: [
      /* @__PURE__ */ r(Fe, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: L, children: i }),
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: T, children: s })
      ] }),
      /* @__PURE__ */ d(ne, { children: [
        /* @__PURE__ */ r(on, { children: l }),
        /* @__PURE__ */ r(Qt, { children: z.map((S) => /* @__PURE__ */ d(
=======
    /* @__PURE__ */ r(zt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(ee, { children: [
      /* @__PURE__ */ r(Be, { placeholder: `Search ${o.toLowerCase()}...` }),
=======
    /* @__PURE__ */ r(Mt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(Wt, { children: [
      /* @__PURE__ */ r(Ee, { placeholder: `Search ${o.toLowerCase()}...` }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      a && /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: F, children: s }),
        /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: L, children: i })
      ] }),
<<<<<<< HEAD
      /* @__PURE__ */ w(ne, { children: [
        /* @__PURE__ */ r(an, { children: l }),
        /* @__PURE__ */ r(te, { children: B.map((S) => /* @__PURE__ */ w(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
          qt,
=======
      /* @__PURE__ */ w(Jt, { children: [
        /* @__PURE__ */ r(Ge, { children: l }),
        /* @__PURE__ */ r(jt, { children: B.map((R) => /* @__PURE__ */ w(
          Bt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          {
            value: R.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                zt,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    e.includes(R.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              S.starred && /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" }),
=======
              S.starred && /* @__PURE__ */ r(qs, { className: "tw-h-4 tw-w-4" }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              S.starred && /* @__PURE__ */ r(Ys, { className: "tw-h-4 tw-w-4" }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: S.secondaryLabel })
=======
              R.starred && /* @__PURE__ */ r(Ys, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: R.label }),
              R.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: R.secondaryLabel })
>>>>>>> 5dcbb312b7 (Address all PR comments)
            ]
          },
          R.label
        )) })
      ] })
    ] }) })
  ] }) });
}
<<<<<<< HEAD
<<<<<<< HEAD
function Np({
=======
function Zp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function nu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: d,
  className: c,
  badgesPlaceholder: p,
  id: f
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      ec,
=======
  return /* @__PURE__ */ w("div", { id: u, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
<<<<<<< HEAD
      dd,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      wd,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: d,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
<<<<<<< HEAD
<<<<<<< HEAD
      var u;
      return /* @__PURE__ */ d(Oe, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
=======
      var f;
      return /* @__PURE__ */ w(Ie, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      var m;
<<<<<<< HEAD
      return /* @__PURE__ */ w(Ae, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      return /* @__PURE__ */ w(Pe, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> 5dcbb312b7 (Address all PR comments)
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(je, { className: "tw-h-3 tw-w-3" })
          }
        ),
<<<<<<< HEAD
<<<<<<< HEAD
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
=======
        (f = t.find((g) => g.value === h)) == null ? void 0 : f.label
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        (m = t.find((g) => g.value === h)) == null ? void 0 : m.label
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ] }, h);
    }) }) : /* @__PURE__ */ r(ft, { children: p })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function nc({ children: t, editorRef: e }) {
  const n = Y(null);
  return q(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var c, w;
      a && document.activeElement === a && (o ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (c = e.current) == null || c.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (w = e.current) == null || w.undo()));
=======
function wd({ children: t, editorRef: e }) {
=======
function pd({ children: t, editorRef: e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = H(null);
  return G(() => {
    var i;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((i = n.current) == null ? void 0 : i.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var d, c;
      a && document.activeElement === a && (o ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (d = e.current) == null || d.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (c = e.current) == null || c.undo()));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    };
    return a == null || a.addEventListener("keydown", s), () => {
      a == null || a.removeEventListener("keydown", s);
    };
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
const Ue = b.forwardRef(
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
<<<<<<< HEAD
<<<<<<< HEAD
Ke.displayName = "Input";
<<<<<<< HEAD
const rc = (t, e, n) => t === "generated" ? /* @__PURE__ */ d(ct, { children: [
=======
const pd = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(et, { children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ge.displayName = "Input";
=======
Ue.displayName = "Input";
>>>>>>> 5dcbb312b7 (Address all PR comments)
const ud = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(et, { children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function oc({
=======
function ud({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function md({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const i = Y(null), s = Y(null), l = Y(!1), [c, w] = R(t), [p, f] = R(n), [h, u] = R(!1);
  q(() => {
    w(t);
  }, [t]), q(() => {
    p !== n && f(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (c !== "custom" || p ? (e(c), o(p)) : (w(t), f(n)));
=======
  const s = H(null), i = H(null), l = H(!1), [d, c] = T(t), [p, u] = T(n), [h, f] = T(!1);
=======
  const s = H(null), i = H(null), l = H(!1), [d, c] = T(t), [p, u] = T(n), [h, m] = T(!1);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  G(() => {
    c(t);
  }, [t]), G(() => {
    p !== n && u(n);
  }, [n]);
  const g = (v) => {
<<<<<<< HEAD
    l.current = !1, f(v), v || (d !== "custom" || p ? (e(d), o(p)) : (c(t), u(n)));
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    l.current = !1, m(v), v || (d !== "custom" || p ? (e(d), o(p)) : (c(t), u(n)));
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }, x = (v) => {
    var y, N, _, k;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = s.current) == null || y.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((N = i.current) == null || N.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((_ = s.current) == null ? void 0 : _.selectionStart) === 0 && ((k = i.current) == null || k.focus(), l.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(de, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Pt, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: rc(t, a, n) }) }) }),
      /* @__PURE__ */ r(St, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      te,
=======
  return /* @__PURE__ */ w(ue, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Pt, { children: [
      /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: pd(t, a, n) }) }) }),
=======
  return /* @__PURE__ */ w(me, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
<<<<<<< HEAD
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: ud(t, a, n) }) }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: ud(t, a, n) }) }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
      /* @__PURE__ */ r(St, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      oe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      {
        style: { zIndex: pa },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(cn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Re, {}),
          /* @__PURE__ */ r(
            Yt,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: nr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Yt,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
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
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var y;
                v.stopPropagation(), l.current = !0, (y = s.current) == null || y.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Ue,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => f(v.target.value)
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
<<<<<<< HEAD
<<<<<<< HEAD
const ac = (t, e) => t === "f" ? /* @__PURE__ */ d(ct, { children: [
  /* @__PURE__ */ r(yo, {}),
=======
const md = (t, e) => t === "f" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Io, {}),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const fd = (t, e) => t === "f" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Po, {}),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Lo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(et, { children: [
  /* @__PURE__ */ r(Ao, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
<<<<<<< HEAD
<<<<<<< HEAD
] }), sc = (t, e) => {
=======
] }), fd = (t, e) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
] }), hd = (t, e) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ve(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
<<<<<<< HEAD
<<<<<<< HEAD
function ic({
=======
function hd({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function gd({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(de, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r($i, { asChild: !0, children: /* @__PURE__ */ r(ke, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw-h-6", children: ac(t, n) }) }) }),
      /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: sc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ d(te, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(an, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Be, {}),
      /* @__PURE__ */ d(
        Jt,
=======
  return /* @__PURE__ */ w(ue, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Pt, { children: [
      /* @__PURE__ */ r(Ji, { asChild: !0, children: /* @__PURE__ */ r(Ee, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: md(t, n) }) }) }),
      /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: fd(t, n) }) })
=======
  return /* @__PURE__ */ w(me, { children: [
    /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r(Zi, { asChild: !0, children: /* @__PURE__ */ r(Te, { asChild: !0, children: /* @__PURE__ */ r(z, { variant: "outline", className: "tw-h-6", children: fd(t, n) }) }) }),
      /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: hd(t, n) }) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ] }) }),
    /* @__PURE__ */ w(oe, { style: { zIndex: pa }, children: [
      /* @__PURE__ */ r(cn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Re, {}),
      /* @__PURE__ */ w(
<<<<<<< HEAD
        Ut,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        Yt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Ao, {}),
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
            /* @__PURE__ */ r(Po, {}),
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
            /* @__PURE__ */ r(Lo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const lc = Object.freeze([
=======
const gd = Object.freeze([
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const bd = Object.freeze([
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
<<<<<<< HEAD
<<<<<<< HEAD
function wc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Is, { className: e, size: 16 });
}
function cc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = R(""), i = F(() => {
    const s = o.trim().toLowerCase();
    return s ? e.filter(
      (l) => {
        var c;
        return ((c = l.marker) == null ? void 0 : c.toLowerCase().includes(s)) || l.title.toLowerCase().includes(s);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ d(ee, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Fe,
=======
function bd({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Ys, { className: e, size: 16 });
=======
function vd({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Xs, { className: e, size: 16 });
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
}
function xd({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = T(""), s = K(() => {
    const i = o.trim().toLowerCase();
    return i ? e.filter(
      (l) => {
        var d;
        return l.marker && ((d = l.marker) == null ? void 0 : d.toLowerCase().includes(i)) || !l.marker && l.title.toLowerCase().includes(i);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ w(Wt, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Be,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Ee,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (i) => a(i),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ d(ne, { children: [
      /* @__PURE__ */ r(on, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Qt, { children: i.map((s) => {
=======
    /* @__PURE__ */ w(ne, { children: [
      /* @__PURE__ */ r(an, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(te, { children: s.map((i) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    /* @__PURE__ */ w(Jt, { children: [
      /* @__PURE__ */ r(Ge, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(jt, { children: s.map((i) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        var l;
        return /* @__PURE__ */ w(
          Bt,
          {
            className: "tw-flex tw-gap-2 hover:tw-bg-accent",
            disabled: i.isDisallowed || i.isDeprecated,
            onSelect: i.action,
            children: [
<<<<<<< HEAD
<<<<<<< HEAD
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: s.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(wc, { icon: s.icon }) }) }),
              /* @__PURE__ */ d("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: s.title }),
                s.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
=======
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: i.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: i.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(bd, { icon: i.icon }) }) }),
=======
              /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: i.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: i.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(vd, { icon: i.icon }) }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              /* @__PURE__ */ w("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw-text-sm", children: i.title }),
                i.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: i.subtitle })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
              ] }),
              (i.isDisallowed || i.isDeprecated) && /* @__PURE__ */ r(ia, { className: "tw-font-sans", children: i.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${i.marker ?? ((l = i.icon) == null ? void 0 : l.displayName)}-${i.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function dc(t, e, n, o) {
=======
function xd(t, e, n, o) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function yd(t, e, n, o) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((i, l) => (i.marker ?? i.title).localeCompare(l.marker ?? l.title));
}
<<<<<<< HEAD
<<<<<<< HEAD
function pc(t) {
=======
function yd(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Nd(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
<<<<<<< HEAD
<<<<<<< HEAD
function uc(t) {
=======
function Nd(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function kd(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
<<<<<<< HEAD
<<<<<<< HEAD
const mc = {
=======
const kd = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const _d = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
<<<<<<< HEAD
<<<<<<< HEAD
function kp({
=======
function Qp({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function ru({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  classNameForEditor: t,
  noteOps: e,
  onSave: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const w = Y(null), p = Y(null), f = Y(null), [h, u] = R("generated"), [g, x] = R("*"), [v, y] = R("f"), [N, _] = R(!1), [k, z] = R(!1), [L, T] = R(), [$, C] = R(), [S, V] = R(), [j, I] = R(), A = Y(null), H = F(
=======
  const c = H(null), p = H(null), u = H(null), [h, f] = T("generated"), [g, x] = T("*"), [v, y] = T("f"), [N, _] = T(!1), [k, B] = T(!1), [$, R] = T(), [L, C] = T(), [S, V] = T(), [j, I] = T(), A = H(null), Y = K(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const c = H(null), p = H(null), u = H(null), [h, m] = T("generated"), [g, x] = T("*"), [v, y] = T("f"), [N, _] = T(!1), [k, B] = T(!1), [V, R] = T(), [L, C] = T(), [S, j] = T(), [z, I] = T(), A = H(null), Y = K(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  const c = H(null), p = H(null), u = H(null), [h, m] = T("generated"), [g, x] = T("*"), [v, y] = T("f"), [N, _] = T(!1), [k, B] = T(!1), [F, L] = T(), [D, C] = T(), [R, $] = T(), [V, I] = T(), A = H(null), Y = K(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    () => ({
      ...i,
      markerMenuTrigger: l,
      hasExternalUI: !0,
<<<<<<< HEAD
<<<<<<< HEAD
      view: { ...s.view ?? Xi(), noteMode: "expanded" }
    }),
    [s, l]
  ), M = F(
    () => dc(
      w,
      () => z(!1),
=======
      view: { ...i.view ?? dl(), noteMode: "expanded" }
    }),
    [i, l]
  ), M = K(
    () => xd(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      view: { ...i.view ?? wl(), noteMode: "expanded" }
    }),
    [i, l]
  ), M = K(
    () => yd(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      c,
      () => B(!1),
      d,
      V
    ),
    [d, V]
  );
  G(() => {
    var P;
    k || (P = c.current) == null || P.focus();
  }, [v, k]), G(() => {
    var U, Z;
    let P;
<<<<<<< HEAD
    const D = e == null ? void 0 : e.at(0);
<<<<<<< HEAD
<<<<<<< HEAD
    if (D && wn("note", D)) {
      const Q = (G = D.insert.note) == null ? void 0 : G.caller;
      let it = "custom";
      Q === Zn ? it = "generated" : Q === Qn ? it = "hidden" : Q && x(Q), u(it), y(((Z = D.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
=======
    if (D && pn("note", D)) {
      const Q = (U = D.insert.note) == null ? void 0 : U.caller;
      let lt = "custom";
      Q === er ? lt = "generated" : Q === nr ? lt = "hidden" : Q && x(Q), f(lt), y(((Z = D.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    if (D && un("note", D)) {
      const Q = (U = D.insert.note) == null ? void 0 : U.caller;
      let lt = "custom";
      Q === nr ? lt = "generated" : Q === rr ? lt = "hidden" : Q && x(Q), m(lt), y(((Z = D.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    const S = e == null ? void 0 : e.at(0);
    if (S && un("note", S)) {
      const Q = (U = S.insert.note) == null ? void 0 : U.caller;
      let lt = "custom";
      Q === nr ? lt = "generated" : Q === rr ? lt = "hidden" : Q && x(Q), m(lt), y(((Z = S.insert.note) == null ? void 0 : Z.style) ?? "f"), P = setTimeout(() => {
>>>>>>> 5dcbb312b7 (Address all PR comments)
        var xt;
        (xt = c.current) == null || xt.applyUpdate([S]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [e, s]);
  const W = j(() => {
    var S, U;
    const P = (U = (S = c.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : U.at(0);
    P && un("note", P) && (P.insert.note && (h === "custom" ? P.insert.note.caller = g : P.insert.note.caller = h === "generated" ? nr : rr), n([P]));
  }, [h, g, n]), Ct = () => {
    var S;
    const P = (S = p.current) == null ? void 0 : S.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
<<<<<<< HEAD
<<<<<<< HEAD
  }, Dt = (P) => {
    var G, Z, Q, it, xt;
    y(P);
    const D = (Z = (G = w.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (D && wn("note", D)) {
      D.insert.note && (D.insert.note.style = P);
      const pt = (it = (Q = D.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : it.ops;
      v !== "x" && P === "x" ? pt == null || pt.forEach((yt) => pc(yt)) : v === "x" && P !== "x" && (pt == null || pt.forEach((yt) => uc(yt))), (xt = w.current) == null || xt.applyUpdate([D, { delete: 1 }]);
    }
=======
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  }, Mt = (P) => {
=======
  }, Ot = (P) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    var U, Z, Q, lt, xt;
    y(P);
    const S = (Z = (U = c.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (S && un("note", S)) {
      S.insert.note && (S.insert.note.style = P);
      const ut = (lt = (Q = S.insert.note) == null ? void 0 : Q.contents) == null ? void 0 : lt.ops;
      v !== "x" && P === "x" ? ut == null || ut.forEach((yt) => Nd(yt)) : v === "x" && P !== "x" && (ut == null || ut.forEach((yt) => kd(yt))), (xt = c.current) == null || xt.applyUpdate([S, { delete: 1 }]);
    }
  }, It = (P) => {
    var U, Z, Q, lt, xt, ut;
    (U = c.current) == null || U.focus();
    const S = (Q = (Z = c.current) == null ? void 0 : Z.getNoteOps(0)) == null ? void 0 : Q.at(0);
    if (S && un("note", S)) {
      P.content.length > 1 && setTimeout(() => {
        var ht;
        (ht = c.current) == null || ht.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const yt = (lt = S.insert.note) == null ? void 0 : lt.style, At = (ut = (xt = S.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : ut.ops;
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
  }, pt = j(() => {
    const P = window.getSelection();
<<<<<<< HEAD
    if (f.current && M.length && P && P.rangeCount > 0) {
      const D = P.getRangeAt(0).getBoundingClientRect(), G = f.current.getBoundingClientRect();
      T(D.left - G.left), C(D.top - G.top), V(D.height), z(!0);
    }
  }, [M, f]);
  return q(() => {
=======
    if (u.current && M.length && P && P.rangeCount > 0) {
      const S = P.getRangeAt(0).getBoundingClientRect(), U = u.current.getBoundingClientRect();
      L(S.left - U.left), C(S.top - U.top), $(S.height), B(!0);
    }
  }, [M, u]);
  return G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
    const P = ((U = p.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0, S = (Z) => {
      !k && P && document.activeElement === P && Z.key === l ? (Z.preventDefault(), pt()) : k && Z.key === "Escape" && (Z.preventDefault(), B(!1));
    };
    return document.addEventListener("keydown", S), () => {
      document.removeEventListener("keydown", S);
    };
  }, [k, pt, l]), /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ w("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
            ic,
=======
            hd,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            gd,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              isTypeSwitchable: N,
              noteType: v,
              handleNoteTypeChange: Ot,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
            oc,
            {
              callerType: h,
              updateCallerType: u,
=======
            ud,
            {
              callerType: h,
              updateCallerType: f,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            md,
            {
              callerType: h,
              updateCallerType: m,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              customCaller: g,
              updateCustomCaller: x,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              z,
              {
                onClick: o,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ r(je, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
            /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
              z,
              {
                onClick: W,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ r(zt, {})
              }
            ) }),
            /* @__PURE__ */ r(St, { children: d["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: p,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(nc, { editorRef: w, children: /* @__PURE__ */ r(
              Wi,
=======
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(wd, { editorRef: c, children: /* @__PURE__ */ r(
              wl,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
              {
                options: Y,
                onStateChange: (P) => I(P.contextMarker),
<<<<<<< HEAD
                onUsjChange: Mt,
                defaultUsj: mc,
=======
                onUsjChange: Ot,
                defaultUsj: kd,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(pd, { editorRef: c, children: /* @__PURE__ */ r(
              pl,
              {
                options: Y,
                onStateChange: (P) => I(P.contextMarker),
                onUsjChange: It,
                defaultUsj: _d,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: c
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
              /* @__PURE__ */ r($t, { asChild: !0, children: /* @__PURE__ */ r(
                z,
                {
                  onClick: Ct,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Oo, {})
                }
              ) }),
              /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
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
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ d(re, { open: k, children: [
      /* @__PURE__ */ r(
        al,
=======
    /* @__PURE__ */ w(Yt, { open: k, children: [
      /* @__PURE__ */ r(
        wa,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    /* @__PURE__ */ w(Kt, { open: k, children: [
      /* @__PURE__ */ r(
        Sr,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        {
          className: "tw-absolute",
          style: {
            top: D,
            left: F,
            height: R,
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
<<<<<<< HEAD
<<<<<<< HEAD
            cc,
=======
            vd,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            xd,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              markerMenuItems: M,
              localizedStrings: d,
              searchRef: A
            }
          )
        }
      )
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const _p = Object.freeze([
  ...lc,
  ...Object.entries(un).map(([, t]) => t.description).filter((t) => !!t),
=======
const tu = Object.freeze([
  ...gd,
  ...Object.entries(hn).map(([, t]) => t.description).filter((t) => !!t),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const ou = Object.freeze([
  ...bd,
  ...Object.entries(gn).map(([, t]) => t.description).filter((t) => !!t),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
function Ja(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
<<<<<<< HEAD
<<<<<<< HEAD
function fc(t, e, n = !0, o = void 0) {
=======
function _d(t, e, n = !0, o = void 0) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Cd(t, e, n = !0, o = void 0) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, d) => {
    const c = d === s.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Kr(t, l, n, !0, a),
      c && o
    ] }, Ja(t, l));
  });
}
function Kr(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
<<<<<<< HEAD
          const l = m(`usfm_${t}`);
<<<<<<< HEAD
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
=======
=======
          const l = f(`usfm_${t}`);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
      return hc(
        i,
        $a(`${t}\\${i.marker}`, [i]),
=======
      return Cd(
        s,
        Wa(`${t}\\${s.marker}`, [s]),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      return Ed(
        s,
        Ja(`${t}\\${s.marker}`, [s]),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        n,
        [...a, t ?? "unknown"]
      );
    });
}
<<<<<<< HEAD
<<<<<<< HEAD
function hc(t, e, n, o = []) {
=======
function Cd(t, e, n, o = []) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Ed(t, e, n, o = []) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const { marker: a } = t;
  return /* @__PURE__ */ w("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Qn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Kr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
<<<<<<< HEAD
<<<<<<< HEAD
function gc({
=======
function Ed({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Td({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...l] = t.content);
  const d = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
<<<<<<< HEAD
<<<<<<< HEAD
  /* @__PURE__ */ d("span", { className: m("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), f = s && /* @__PURE__ */ d(ct, { children: [
    Dr(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = m(h, u);
  return /* @__PURE__ */ d(ct, { children: [
    /* @__PURE__ */ d("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: f }),
=======
  /* @__PURE__ */ w("span", { className: m("note-caller tw-inline-block", { formatted: s }), children: [
=======
  /* @__PURE__ */ w("span", { className: f("note-caller tw-inline-block", { formatted: s }), children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    a,
    " "
  ] }), u = i && /* @__PURE__ */ w(et, { children: [
    Kr(t.marker, [i], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", m = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = f(h, m);
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ w("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      d,
      p
    ] }),
<<<<<<< HEAD
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: u }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    /* @__PURE__ */ r("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: u }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
<<<<<<< HEAD
<<<<<<< HEAD
        children: l && l.length > 0 && /* @__PURE__ */ r(ct, { children: fc(t.marker, l, o, w) })
=======
        children: l && l.length > 0 && /* @__PURE__ */ r(et, { children: _d(t.marker, l, o, c) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        children: l && l.length > 0 && /* @__PURE__ */ r(et, { children: Cd(t.marker, l, o, c) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
    )
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function Cp({
=======
function eu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function au({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: c
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const p = c ?? ei(n, void 0), f = (N, _) => {
    w == null || w(N, _, a);
  }, h = i ? n.findIndex((N) => N === i) : -1, [u, g] = R(h), x = (N, _, k) => {
=======
  const p = d ?? hi(n, void 0), u = (N, _) => {
    c == null || c(N, _, a);
  }, h = s ? n.findIndex((N) => N === s) : -1, [f, g] = T(h), x = (N, _, k) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const p = d ?? gi(n, void 0), u = (N, _) => {
    c == null || c(N, _, a);
  }, h = s ? n.findIndex((N) => N === s) : -1, [m, g] = T(h), x = (N, _, k) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), c == null || c(_, k, a);
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
<<<<<<< HEAD
<<<<<<< HEAD
    u >= 0 && u < y.current.length && ((N = y.current[u]) == null || N.focus());
  }, [u]), /* @__PURE__ */ r(
=======
    f >= 0 && f < y.current.length && ((N = y.current[f]) == null || N.focus());
  }, [f]), /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    m >= 0 && m < y.current.length && ((N = y.current[m]) == null || N.focus());
  }, [m]), /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
<<<<<<< HEAD
<<<<<<< HEAD
      tabIndex: u < 0 ? 0 : -1,
=======
      tabIndex: f < 0 ? 0 : -1,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      className: m("tw-h-full tw-overflow-y-auto", t),
=======
      tabIndex: m < 0 ? 0 : -1,
      className: f("tw-h-full tw-overflow-y-auto", t),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
                  ref: (F) => {
                    y.current[_] = F;
                  },
                  role: "option",
                  "aria-selected": k,
                  "data-marker": N.marker,
                  "data-state": k ? "selected" : void 0,
<<<<<<< HEAD
<<<<<<< HEAD
                  tabIndex: _ === u ? 0 : -1,
=======
                  tabIndex: _ === f ? 0 : -1,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
                  className: m(
=======
                  tabIndex: _ === m ? 0 : -1,
                  className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
                  onClick: () => f(N, _),
                  onKeyDown: (L) => x(L, N, _),
                  children: /* @__PURE__ */ r(
                    gc,
=======
                  onClick: () => u(N, _),
                  onKeyDown: (F) => x(F, N, _),
                  children: /* @__PURE__ */ r(
<<<<<<< HEAD
                    Ed,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                    Td,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Ie, { tabIndex: -1, className: "tw-col-span-2" })
=======
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Ae, { tabIndex: -1, className: "tw-col-span-2" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Pe, { tabIndex: -1, className: "tw-col-span-2" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Le, { tabIndex: -1, className: "tw-col-span-2" })
>>>>>>> 5dcbb312b7 (Address all PR comments)
            ] });
          })
        }
      )
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function bc(t) {
=======
function Td(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Rd(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
<<<<<<< HEAD
<<<<<<< HEAD
function vc({
=======
function Rd({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Sd({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = K(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const p = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(p) || (d.add(p), l.push(c));
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
<<<<<<< HEAD
          /* @__PURE__ */ r(ye, { children: ve(l.reference, "English") }),
<<<<<<< HEAD
          /* @__PURE__ */ r(ye, { className: o, children: bc(l.text) })
=======
          /* @__PURE__ */ r(ye, { className: o, children: Td(l.text) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          /* @__PURE__ */ r(Ne, { children: xe(l.reference, "English") }),
          /* @__PURE__ */ r(Ne, { className: o, children: Rd(l.text) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Gr = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
<<<<<<< HEAD
<<<<<<< HEAD
Mr.displayName = tr.Root.displayName;
const xc = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(Ls, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(Vs, { className: "tw-h-4 tw-w-4" });
}, On = (t, e, n) => /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ d(At, { children: [
  /* @__PURE__ */ d(
    Pt,
=======
Kr.displayName = rr.Root.displayName;
const Sd = (t) => {
=======
Gr.displayName = or.Root.displayName;
const Dd = (t) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (t === "asc")
    return /* @__PURE__ */ r(Qs, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(ti, { className: "tw-h-4 tw-w-4" });
}, Ln = (t, e, n) => /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ w(Lt, { children: [
  /* @__PURE__ */ w(
<<<<<<< HEAD
    Lt,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    $t,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    {
      className: f("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
<<<<<<< HEAD
<<<<<<< HEAD
        xc(t.getIsSorted())
=======
        Sd(t.getIsSorted())
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        Dd(t.getIsSorted())
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ]
    }
  ),
  /* @__PURE__ */ r(St, { side: "bottom", children: e })
<<<<<<< HEAD
<<<<<<< HEAD
] }) }), Ep = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => On(e, t)
}), yc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => On(n, t)
}), Tp = (t) => ({
=======
] }) }), nu = (t) => ({
=======
] }) }), su = (t) => ({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Ln(e, t)
}), Md = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
<<<<<<< HEAD
  header: ({ column: n }) => Pn(n, t)
}), ru = (t) => ({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  header: ({ column: n }) => Ln(n, t)
}), iu = (t) => ({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  accessorKey: "count",
  header: ({ column: e }) => Ln(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Yn = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((d) => {
    e === "approved" ? i.includes(d) || i.push(d) : i = i.filter((c) => c !== d);
  }), o(i);
  let l = [...a];
<<<<<<< HEAD
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, Rp = (t, e, n, o, a) => ({
=======
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), s(l);
<<<<<<< HEAD
}, ou = (t, e, n, o, a) => ({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, lu = (t, e, n, o, a) => ({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  accessorKey: "status",
  header: ({ column: s }) => Ln(s, t, "tw-justify-center"),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(Lr, { value: i, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        Qe,
        {
          onClick: (d) => {
            d.stopPropagation(), Yn(
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
<<<<<<< HEAD
<<<<<<< HEAD
          children: /* @__PURE__ */ r(As, {})
=======
          children: /* @__PURE__ */ r(Xs, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          children: /* @__PURE__ */ r(Ws, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      ),
      /* @__PURE__ */ r(
        Qe,
        {
          onClick: (d) => {
            d.stopPropagation(), Yn(
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
<<<<<<< HEAD
<<<<<<< HEAD
          children: /* @__PURE__ */ r(Ps, {})
=======
          children: /* @__PURE__ */ r(Ws, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          children: /* @__PURE__ */ r(Js, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      ),
      /* @__PURE__ */ r(
        Qe,
        {
          onClick: (d) => {
            d.stopPropagation(), Yn(
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
<<<<<<< HEAD
<<<<<<< HEAD
          children: /* @__PURE__ */ r($s, {})
=======
          children: /* @__PURE__ */ r(Js, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          children: /* @__PURE__ */ r(Zs, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      )
    ] });
  }
<<<<<<< HEAD
<<<<<<< HEAD
}), Sp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Dp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Mp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Nc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Op = Object.freeze([
=======
}), au = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), su = (t) => {
=======
}), cu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), du = (t) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, wu = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
<<<<<<< HEAD
}, Md = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", lu = Object.freeze([
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, Od = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", pu = Object.freeze([
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
]), kc = (t, e, n) => {
=======
]), Od = (t, e, n) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
]), Id = (t, e, n) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
<<<<<<< HEAD
<<<<<<< HEAD
}, _c = (t, e, n) => t.map((o) => {
  const a = Br(o.key) ? o.key : o.key[0];
  return {
    items: Br(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Nc(a, e, n),
    occurrences: o.occurrences || []
  };
}), Bt = (t, e) => t[e] ?? e;
function Ip({
=======
}, Id = (t, e, n) => t.map((o) => {
  const a = Qr(o.key) ? o.key : o.key[0];
=======
}, Ad = (t, e, n) => t.map((o) => {
  const a = to(o.key) ? o.key : o.key[0];
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return {
    items: to(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Od(a, e, n),
    occurrences: o.occurrences || []
  };
<<<<<<< HEAD
}), Kt = (t, e) => t[e] ?? e;
function cu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}), Ht = (t, e) => t[e] ?? e;
function uu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: d,
  id: c,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: f,
  onItemSelected: h
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const u = Bt(n, "%webView_inventory_all%"), g = Bt(n, "%webView_inventory_approved%"), x = Bt(n, "%webView_inventory_unapproved%"), v = Bt(n, "%webView_inventory_unknown%"), y = Bt(n, "%webView_inventory_scope_currentBook%"), N = Bt(n, "%webView_inventory_scope_chapter%"), _ = Bt(n, "%webView_inventory_scope_verse%"), k = Bt(n, "%webView_inventory_filter_text%"), z = Bt(
=======
  const f = Kt(n, "%webView_inventory_all%"), g = Kt(n, "%webView_inventory_approved%"), x = Kt(n, "%webView_inventory_unapproved%"), v = Kt(n, "%webView_inventory_unknown%"), y = Kt(n, "%webView_inventory_scope_currentBook%"), N = Kt(n, "%webView_inventory_scope_chapter%"), _ = Kt(n, "%webView_inventory_scope_verse%"), k = Kt(n, "%webView_inventory_filter_text%"), B = Kt(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const m = Ht(n, "%webView_inventory_all%"), g = Ht(n, "%webView_inventory_approved%"), x = Ht(n, "%webView_inventory_unapproved%"), v = Ht(n, "%webView_inventory_unknown%"), y = Ht(n, "%webView_inventory_scope_currentBook%"), N = Ht(n, "%webView_inventory_scope_chapter%"), _ = Ht(n, "%webView_inventory_scope_verse%"), k = Ht(n, "%webView_inventory_filter_text%"), B = Ht(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    n,
    "%webView_inventory_show_additional_items%"
<<<<<<< HEAD
  ), V = Ht(n, "%webView_inventory_no_results%"), [R, L] = T(!1), [C, S] = T("all"), [j, z] = T(""), [I, A] = T([]), Y = K(() => {
    const D = t ?? [];
<<<<<<< HEAD
<<<<<<< HEAD
    return D.length === 0 ? [] : _c(D, a, i);
  }, [t, a, i]), M = F(() => {
    if (T) return H;
=======
    return D.length === 0 ? [] : Id(D, a, s);
=======
    return D.length === 0 ? [] : Ad(D, a, s);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  }, [t, a, s]), M = K(() => {
    if (R) return Y;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    const D = [];
=======
  ), F = Ht(n, "%webView_inventory_no_results%"), [L, D] = T(!1), [C, R] = T("all"), [$, V] = T(""), [I, A] = T([]), Y = K(() => {
    const S = t ?? [];
    return S.length === 0 ? [] : Ad(S, a, s);
  }, [t, a, s]), M = K(() => {
    if (L) return Y;
    const S = [];
>>>>>>> 5dcbb312b7 (Address all PR comments)
    return Y.forEach((U) => {
      const Z = U.items[0], Q = S.find(
        (lt) => lt.items[0] === Z
      );
      Q ? (Q.count += U.count, Q.occurrences = Q.occurrences.concat(U.occurrences)) : S.push({
        items: [Z],
        count: U.count,
        occurrences: U.occurrences,
        status: U.status
      });
<<<<<<< HEAD
    }), D;
<<<<<<< HEAD
<<<<<<< HEAD
  }, [T, H]), W = F(() => M.length === 0 ? [] : kc(M, C, V), [M, C, V]), Ct = F(() => {
=======
  }, [R, Y]), W = K(() => M.length === 0 ? [] : Od(M, C, V), [M, C, V]), Ct = K(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  }, [R, Y]), W = K(() => M.length === 0 ? [] : Id(M, C, j), [M, C, j]), Ct = K(() => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    var Z, Q;
    if (!R) return d;
    const D = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
<<<<<<< HEAD
    if (!D) return c;
    const G = [];
    for (let it = 0; it < D; it++)
      G.push(
        yc(
          ((Q = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Q[it]) || "Additional Item",
          it + 1
=======
    if (!D) return d;
=======
    }), S;
  }, [L, Y]), W = K(() => M.length === 0 ? [] : Id(M, C, $), [M, C, $]), Ct = K(() => {
    var Z, Q;
    if (!L) return d;
    const S = (Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z.length;
    if (!S) return d;
>>>>>>> 5dcbb312b7 (Address all PR comments)
    const U = [];
    for (let lt = 0; lt < S; lt++)
      U.push(
        Md(
          ((Q = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Q[lt]) || "Additional Item",
          lt + 1
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        )
      );
    return [...U, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, L]);
  G(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const Ot = (S, U) => {
    U.setRowSelection(() => {
      const Q = {};
      return Q[S.index] = !0, Q;
    });
    const Z = S.original.items;
    A(Z), h && Z.length > 0 && h(Z[0]);
  }, It = (S) => {
    if (S === "book" || S === "chapter" || S === "verse")
      l(S);
    else
      throw new Error(`Invalid scope value: ${S}`);
  }, pt = (S) => {
    if (S === "all" || S === "approved" || S === "unapproved" || S === "unknown")
      R(S);
    else
      throw new Error(`Invalid status filter value: ${S}`);
  }, P = K(() => {
    if (M.length === 0 || I.length === 0) return [];
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const D = M.filter((G) => ni(
      T ? G.items : [G.items[0]],
=======
    const D = M.filter((U) => gi(
=======
    const D = M.filter((U) => bi(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      R ? U.items : [U.items[0]],
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      I
    ));
    if (D.length > 1) throw new Error("Selected item is not unique");
    return D.length === 0 ? [] : D[0].occurrences;
<<<<<<< HEAD
  }, [I, T, M]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Ae,
=======
  }, [I, R, M]);
  return /* @__PURE__ */ w("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ w(
<<<<<<< HEAD
        Pe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        Le,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    const S = M.filter((U) => bi(
      L ? U.items : [U.items[0]],
      I
    ));
    if (S.length > 1) throw new Error("Selected item is not unique");
    return S.length === 0 ? [] : S[0].occurrences;
  }, [I, L, M]);
  return /* @__PURE__ */ w("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ w(
        $e,
>>>>>>> 5dcbb312b7 (Address all PR comments)
        {
          onValueChange: (S) => pt(S),
          defaultValue: C,
          children: [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Ce, { children: [
              /* @__PURE__ */ r(Tt, { value: "all", children: u }),
=======
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Le, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Ce, { children: [
              /* @__PURE__ */ r(Tt, { value: "all", children: f }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r($e, { placeholder: "Select filter" }) }),
=======
            /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Ve, { placeholder: "Select filter" }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
            /* @__PURE__ */ w(Ce, { children: [
              /* @__PURE__ */ r(Tt, { value: "all", children: m }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
              /* @__PURE__ */ r(Tt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Tt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(Tt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      /* @__PURE__ */ d(Ae, { onValueChange: (D) => Mt(D), defaultValue: s, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Pe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Ce, { children: [
=======
      /* @__PURE__ */ w(Pe, { onValueChange: (D) => Ot(D), defaultValue: i, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Le, { placeholder: "Select scope" }) }),
=======
      /* @__PURE__ */ w(Le, { onValueChange: (D) => It(D), defaultValue: i, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r($e, { placeholder: "Select scope" }) }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      /* @__PURE__ */ w($e, { onValueChange: (S) => It(S), defaultValue: i, children: [
        /* @__PURE__ */ r(_e, { className: "tw-m-1", children: /* @__PURE__ */ r(Ve, { placeholder: "Select scope" }) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
        /* @__PURE__ */ w(Ce, { children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
          /* @__PURE__ */ r(Tt, { value: "book", children: y }),
          /* @__PURE__ */ r(Tt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(Tt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ue,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: $,
          onChange: (S) => {
            V(S.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Gr,
          {
            className: "tw-m-1",
            checked: L,
            onCheckedChange: (S) => {
              D(S);
            }
          }
        ),
        /* @__PURE__ */ r(ft, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? B })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
      Ww,
=======
      ad,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      sd,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        columns: Ct,
        data: W,
        onRowClickHandler: Ot,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: F
      }
    ) }),
    P.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
      vc,
=======
      Rd,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Sd,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        classNameForText: f,
        occurrenceData: P,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const Cc = "16rem", Ec = "3rem", La = b.createContext(void 0);
function In() {
  const t = b.useContext(La);
=======
const vn = "hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]", Ad = 150, Pd = 100;
function Ld({
=======
const xn = "hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]", Pd = 150, Ld = 100;
function $d({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  label: t,
  items: e,
  onSelect: n
}) {
  const [o, a] = T(!1), s = H(), i = H(), l = j(() => {
    clearTimeout(i.current), s.current = setTimeout(() => a(!0), Pd);
  }, []), d = j(() => {
    clearTimeout(s.current), i.current = setTimeout(() => a(!1), Ld);
  }, []), c = j(() => {
    clearTimeout(i.current);
  }, []);
  return G(() => () => {
    clearTimeout(s.current), clearTimeout(i.current);
  }, []), /* @__PURE__ */ w(Ha, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ r(
      zr,
      {
        className: xn,
        onPointerEnter: l,
        onPointerLeave: d,
        children: t
      }
    ),
    /* @__PURE__ */ r(Ua, { children: /* @__PURE__ */ r(
      Fr,
      {
        className: "overlay-context-menu-content",
        style: { zIndex: Ie },
        onPointerEnter: c,
        onPointerLeave: d,
        children: Za(e, n)
      }
    ) })
  ] });
}
function Za(t, e) {
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
              s.shortcut && /* @__PURE__ */ r(Ya, { children: s.shortcut })
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
        const c = t[o];
        if (c.type === "radio" && c.group === i)
          l.push(c), o += 1;
        else
          break;
      }
      const d = ((a = l.find((c) => c.checked)) == null ? void 0 : a.value) ?? "";
      n.push(
        /* @__PURE__ */ r(
          qa,
          {
            value: d,
            onValueChange: (c) => {
              const p = l.find((u) => u.value === c);
              p && e({ itemId: p.id, checked: !0 });
            },
            children: l.map((c) => /* @__PURE__ */ r(
              Br,
              {
                className: xn,
                value: c.value,
                children: c.label
              },
              c.id
            ))
          },
          `radio-group-${i}`
        )
      );
    } else s.type === "submenu" && n.push(
      /* @__PURE__ */ r(
        $d,
        {
          label: typeof s.label == "string" ? s.label : String(s.label),
          items: s.items,
          onSelect: e
        },
        `submenu-${o}`
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
            style: { zIndex: Ie },
            align: "start",
            side: "bottom",
            sideOffset: 0,
            children: Za(t, n)
          }
        )
      ]
    }
  );
}
const Qa = "OK", Vd = "Cancel", jd = "Alert", zd = "Confirm", Fd = "Dialog";
function Bd({
  options: t,
  onOk: e
}) {
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(Er, { children: t.message }),
    /* @__PURE__ */ r(_r, { children: /* @__PURE__ */ r(z, { onClick: e, children: t.okLabel ?? Qa }) })
  ] });
}
function Kd({
  options: t,
  onOk: e,
  onCancel: n
}) {
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(Er, { children: t.message }),
    /* @__PURE__ */ w(_r, { children: [
      /* @__PURE__ */ r(z, { variant: "outline", onClick: n, children: t.cancelLabel ?? Vd }),
      /* @__PURE__ */ r(z, { variant: t.destructive ? "destructive" : "default", onClick: e, children: t.okLabel ?? Qa })
    ] })
  ] });
}
function Gd(t) {
  return t === "alert" || t === "confirm" ? "alertdialog" : "dialog";
}
function Ud(t) {
  switch (t) {
    case "alert":
      return jd;
    case "confirm":
      return zd;
    default:
      return Fd;
  }
}
function Hd(t, e, n, o) {
  switch (t) {
    case "alert":
      return /* @__PURE__ */ r(
        Bd,
        {
          options: e,
          onOk: () => n(!0)
        }
      );
    case "confirm":
      return /* @__PURE__ */ r(
        Kd,
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
  const a = H(!1), s = j(
    (p) => {
      a.current || (a.current = !0, n(p));
    },
    [n]
  ), i = j(() => {
    s(!1);
  }, [s]), l = j(
    (p) => {
      if (!p) {
        if (a.current) return;
        a.current = !0, o();
      }
    },
    [o]
  ), d = Gd(t), c = ("title" in e && typeof e.title == "string" ? e.title : void 0) || Ud(t);
  return /* @__PURE__ */ r(ra, { open: !0, onOpenChange: l, children: /* @__PURE__ */ w(oa, { children: [
    /* @__PURE__ */ r(
      Nr,
      {
        className: "overlay-modal-backdrop tw-bg-black/40",
        style: { zIndex: bl }
      }
    ),
    /* @__PURE__ */ w(
      Dt.Content,
      {
        "data-overlay-modal-dialog": !0,
        role: d,
        "aria-modal": "true",
        className: "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        style: { zIndex: vl },
        onKeyDown: (p) => {
          p.key === "Enter" && t === "alert" && (p.preventDefault(), s(!0));
        },
        children: [
          /* @__PURE__ */ r(kr, { children: /* @__PURE__ */ r(Cr, { children: c }) }),
          Hd(t, e, s, i)
        ]
      }
    )
  ] }) });
}
const qd = 320, Yd = 400;
function dn({ title: t }) {
  if (t)
    return /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-font-bold", children: t });
}
function Xd({ content: t }) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(dn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("p", { className: "tw-m-0", children: t.body })
  ] });
}
function Wd({ content: t }) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(dn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("ul", { className: "tw-m-0 tw-pl-5 [&>li]:tw-mb-1", children: t.items.map((n, o) => (
      // List items are plain strings with no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r("li", { children: n }, o)
    )) })
  ] });
}
function Jd({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(dn, { title: (e = t.title) == null ? void 0 : e.toString() }),
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
function Zd({ run: t }) {
  let e = t.text;
  return t.bold && (e = /* @__PURE__ */ r("strong", { children: e })), t.italic && (e = /* @__PURE__ */ r("em", { children: e })), t.scriptureRef && (e = /* @__PURE__ */ r("span", { className: "tw-italic", children: e })), e;
}
function Qd({
  content: t
}) {
  var e;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(dn, { title: (e = t.title) == null ? void 0 : e.toString() }),
    /* @__PURE__ */ r("div", { children: t.body.map((n, o) => (
      // Rich text runs have no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ r(Zd, { run: n }, o)
    )) })
  ] });
}
function tw({
  content: t,
  onAction: e
}) {
  var n;
  return /* @__PURE__ */ w(et, { children: [
    /* @__PURE__ */ r(dn, { title: (n = t.title) == null ? void 0 : n.toString() }),
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
function ew({
  content: t,
  onAction: e
}) {
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ r(Xd, { content: t });
    case "list":
      return /* @__PURE__ */ r(Wd, { content: t });
    case "description":
      return /* @__PURE__ */ r(Jd, { content: t });
    case "richText":
      return /* @__PURE__ */ r(Qd, { content: t });
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
  maxWidth: a = qd,
  showArrow: s = !0,
  onAction: i,
  onDismiss: l
}) {
  const d = j(
    (u) => {
      u || l();
    },
    [l]
  ), c = j(
    (u) => {
      u.key === "Escape" && (u.preventDefault(), l());
    },
    [l]
  ), p = j(
    (u) => {
      i && i(u);
    },
    [i]
  );
  return /* @__PURE__ */ w(Kt, { open: !0, onOpenChange: d, children: [
    /* @__PURE__ */ r(Sr, { asChild: !0, children: /* @__PURE__ */ r(
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
          zIndex: Ie,
          maxWidth: a,
          maxHeight: Yd
        },
        onKeyDown: c,
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
<<<<<<< HEAD
const ew = "16rem", nw = "3rem", Qa = b.createContext(void 0);
function Ln() {
  const t = b.useContext(Qa);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const nw = 500, rw = 400;
function ko({
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
  return n.size > 1 || n.size === 1 && !n.has("") ? /* @__PURE__ */ r(et, { children: Array.from(n.entries()).map(([a, s]) => /* @__PURE__ */ r(jt, { heading: a || void 0, children: s.map((i) => /* @__PURE__ */ r(ko, { item: i, onSelect: e }, i.id)) }, a)) }) : /* @__PURE__ */ r(jt, { children: t.map((a) => /* @__PURE__ */ r(ko, { item: a, onSelect: e }, a.id)) });
}
function gu({
  items: t,
  position: e,
  anchor: n,
  side: o = "bottom",
  placeholder: a = "Search...",
  noResultsText: s = "No results found",
  maxWidth: i = nw,
  maxHeight: l = rw,
  onSelect: d,
  onDismiss: c
}) {
  const p = H(null);
  G(() => {
    var g;
    (g = p.current) == null || g.focus();
  }, []);
  const u = j(
    (g) => {
      g.key === "Escape" && (g.preventDefault(), c());
    },
    [c]
  ), h = /* @__PURE__ */ w(
    Wt,
    {
      "data-overlay-command-palette": !0,
      className: "tw-rounded-lg tw-border tw-shadow-md",
      onKeyDown: u,
      children: [
        /* @__PURE__ */ r(Ee, { ref: p, placeholder: a }),
        /* @__PURE__ */ w(Jt, { style: { maxHeight: l - 44 }, children: [
          /* @__PURE__ */ r(Ge, { children: s }),
          /* @__PURE__ */ r(ow, { items: t, onSelect: d })
        ] })
      ]
    }
  );
  return e ? /* @__PURE__ */ w(Kt, { open: !0, onOpenChange: (g) => {
    g || c();
  }, children: [
    /* @__PURE__ */ r(Sr, { asChild: !0, children: /* @__PURE__ */ r(
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
          zIndex: Ie,
          width: i,
          maxWidth: i
        },
        onOpenAutoFocus: (g) => g.preventDefault(),
        onCloseAutoFocus: (g) => g.preventDefault(),
        children: [
          /* @__PURE__ */ r(le.Arrow, { className: "tw-fill-popover tw-stroke-border tw-stroke-1" }),
          h
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
        style: { zIndex: Ie },
        onClick: (g) => {
          g.target === g.currentTarget && c();
        },
        children: /* @__PURE__ */ r("div", { style: { width: i, maxWidth: i }, children: h })
      }
    )
  );
}
const aw = "16rem", sw = "3rem", ts = b.createContext(void 0);
function $n() {
  const t = b.useContext(ts);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const es = b.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
<<<<<<< HEAD
  }, c) => {
    const [w, p] = b.useState(t), f = e ?? w, h = b.useCallback(
=======
  }, d) => {
    const [c, p] = b.useState(t), u = e ?? c, h = b.useCallback(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      (_) => {
        const k = typeof _ == "function" ? _(f) : _;
        n ? n(k) : p(k);
      },
<<<<<<< HEAD
      [n, f]
    ), u = b.useCallback(() => h((_) => !_), [h]), g = f ? "expanded" : "collapsed", y = ft() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = b.useMemo(
=======
      [n, u]
<<<<<<< HEAD
    ), f = b.useCallback(() => h((_) => !_), [h]), g = u ? "expanded" : "collapsed", y = wt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = b.useMemo(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    ), m = b.useCallback(() => h((_) => !_), [h]), g = u ? "expanded" : "collapsed", y = wt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = b.useMemo(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      () => ({
        state: g,
        open: f,
        setOpen: h,
<<<<<<< HEAD
<<<<<<< HEAD
        toggleSidebar: u,
        side: y
      }),
      [g, f, h, u, y]
=======
        toggleSidebar: f,
        side: y
      }),
      [g, u, h, f, y]
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        toggleSidebar: m,
        side: y
      }),
      [g, u, h, m, y]
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    );
    return /* @__PURE__ */ r(ts.Provider, { value: N, children: /* @__PURE__ */ r(Rt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
<<<<<<< HEAD
<<<<<<< HEAD
            "--sidebar-width": Cc,
            "--sidebar-width-icon": Ec,
=======
            "--sidebar-width": ew,
            "--sidebar-width-icon": nw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            "--sidebar-width": aw,
            "--sidebar-width-icon": sw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            ...a
          }
        ),
        className: f(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: d,
        ...l,
        children: s
      }
    ) }) });
  }
);
es.displayName = "SidebarProvider";
const ns = b.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
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
<<<<<<< HEAD
<<<<<<< HEAD
ja.displayName = "Sidebar";
const Tc = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = In();
  return /* @__PURE__ */ d(
    B,
=======
es.displayName = "Sidebar";
const rw = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Ln();
=======
ns.displayName = "Sidebar";
const iw = b.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = $n();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ w(
<<<<<<< HEAD
    F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
<<<<<<< HEAD
      className: m("tw-h-7 tw-w-7", t),
<<<<<<< HEAD
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(js, {}) : /* @__PURE__ */ r(zs, {}),
=======
=======
      className: f("tw-h-7 tw-w-7", t),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      onClick: (s) => {
        e == null || e(s), a.toggleSidebar();
      },
      ...n,
      children: [
<<<<<<< HEAD
        a.side === "primary" ? /* @__PURE__ */ r(ti, {}) : /* @__PURE__ */ r(ei, {}),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        a.side === "primary" ? /* @__PURE__ */ r(ei, {}) : /* @__PURE__ */ r(ni, {}),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Tc.displayName = "SidebarTrigger";
const Rc = b.forwardRef(
=======
rw.displayName = "SidebarTrigger";
const ow = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
iw.displayName = "SidebarTrigger";
const lw = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Rc.displayName = "SidebarRail";
const za = b.forwardRef(
=======
ow.displayName = "SidebarRail";
const ns = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
lw.displayName = "SidebarRail";
const rs = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
za.displayName = "SidebarInset";
const Sc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ns.displayName = "SidebarInset";
const aw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  Ke,
=======
rs.displayName = "SidebarInset";
const cw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
<<<<<<< HEAD
  Ge,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  Ue,
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
Sc.displayName = "SidebarInput";
const Dc = b.forwardRef(
=======
aw.displayName = "SidebarInput";
const sw = b.forwardRef(
=======
cw.displayName = "SidebarInput";
const dw = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
sw.displayName = "SidebarHeader";
const iw = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
<<<<<<< HEAD
      "data-sidebar": "header",
=======
      "data-sidebar": "footer",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Dc.displayName = "SidebarHeader";
const Mc = b.forwardRef(
=======
dw.displayName = "SidebarHeader";
const ww = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
Mc.displayName = "SidebarFooter";
const Oc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ie,
=======
iw.displayName = "SidebarFooter";
const lw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ae,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ww.displayName = "SidebarFooter";
const pw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
<<<<<<< HEAD
  Pe,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  Le,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  {
    ref: n,
    "data-sidebar": "separator",
    className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Oc.displayName = "SidebarSeparator";
const Fa = b.forwardRef(
=======
lw.displayName = "SidebarSeparator";
const rs = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
pw.displayName = "SidebarSeparator";
const os = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
os.displayName = "SidebarContent";
const mr = b.forwardRef(
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
<<<<<<< HEAD
<<<<<<< HEAD
cr.displayName = "SidebarGroup";
const dr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ve : "div",
=======
ur.displayName = "SidebarGroup";
const mr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? je : "div",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
mr.displayName = "SidebarGroup";
const fr = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
<<<<<<< HEAD
  e ? ze : "div",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  e ? Fe : "div",
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
dr.displayName = "SidebarGroupLabel";
const Ic = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ve : "button",
=======
mr.displayName = "SidebarGroupLabel";
const cw = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? je : "button",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
fr.displayName = "SidebarGroupLabel";
const uw = b.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
<<<<<<< HEAD
  e ? ze : "button",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  e ? Fe : "button",
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
Ic.displayName = "SidebarGroupAction";
const pr = b.forwardRef(
=======
cw.displayName = "SidebarGroupAction";
const fr = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
uw.displayName = "SidebarGroupAction";
const hr = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
hr.displayName = "SidebarGroupContent";
const as = b.forwardRef(
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
as.displayName = "SidebarMenu";
const ss = b.forwardRef(
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
<<<<<<< HEAD
<<<<<<< HEAD
Ka.displayName = "SidebarMenuItem";
const Ac = pe(
=======
as.displayName = "SidebarMenuItem";
const dw = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ss.displayName = "SidebarMenuItem";
const mw = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
), is = b.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const c = t ? Ve : "button", { state: w } = In(), p = /* @__PURE__ */ r(
      c,
=======
    const d = t ? je : "button", { state: c } = Ln(), p = /* @__PURE__ */ r(
=======
    const d = t ? ze : "button", { state: c } = $n(), p = /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    const d = t ? Fe : "button", { state: c } = $n(), p = /* @__PURE__ */ r(
>>>>>>> 5dcbb312b7 (Address all PR comments)
      d,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
<<<<<<< HEAD
<<<<<<< HEAD
        className: m(Ac({ variant: n, size: o }), i),
        ...s
=======
        className: m(dw({ variant: n, size: o }), s),
=======
        className: f(mw({ variant: n, size: o }), s),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        ...i
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: p }),
      /* @__PURE__ */ r(St, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
<<<<<<< HEAD
<<<<<<< HEAD
Ga.displayName = "SidebarMenuButton";
const Pc = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ve : "button",
=======
ss.displayName = "SidebarMenuButton";
const ww = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? je : "button",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
is.displayName = "SidebarMenuButton";
const fw = b.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
<<<<<<< HEAD
  e ? ze : "button",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  e ? Fe : "button",
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
Pc.displayName = "SidebarMenuAction";
const $c = b.forwardRef(
=======
ww.displayName = "SidebarMenuAction";
const pw = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
fw.displayName = "SidebarMenuAction";
const hw = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
$c.displayName = "SidebarMenuBadge";
const Lc = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
=======
pw.displayName = "SidebarMenuBadge";
const uw = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
hw.displayName = "SidebarMenuBadge";
const gw = b.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(ur, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          ur,
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
<<<<<<< HEAD
<<<<<<< HEAD
Lc.displayName = "SidebarMenuSkeleton";
const Vc = b.forwardRef(
=======
uw.displayName = "SidebarMenuSkeleton";
const mw = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
gw.displayName = "SidebarMenuSkeleton";
const bw = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Vc.displayName = "SidebarMenuSub";
const jc = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
jc.displayName = "SidebarMenuSubItem";
const zc = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ve : "a",
=======
mw.displayName = "SidebarMenuSub";
const fw = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
fw.displayName = "SidebarMenuSubItem";
const hw = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? je : "a",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
bw.displayName = "SidebarMenuSub";
const vw = b.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
vw.displayName = "SidebarMenuSubItem";
const xw = b.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
<<<<<<< HEAD
  t ? ze : "a",
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  t ? Fe : "a",
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
<<<<<<< HEAD
<<<<<<< HEAD
zc.displayName = "SidebarMenuSubButton";
function Fc({
=======
hw.displayName = "SidebarMenuSubButton";
function gw({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
xw.displayName = "SidebarMenuSubButton";
function yw({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const w = K(
    (h, u) => {
      o(h, u);
=======
  const c = z(
    (h, f) => {
      o(h, f);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const c = $(
=======
  const c = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (h, m) => {
      o(h, m);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    },
    [o]
  ), p = j(
    (h) => {
<<<<<<< HEAD
<<<<<<< HEAD
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), f = K(
=======
      const f = n.find((g) => g.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), u = z(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      const m = n.find((g) => g.projectId === h);
      return m ? m.projectName : h;
    },
    [n]
<<<<<<< HEAD
  ), u = $(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
  ), u = j(
>>>>>>> 5dcbb312b7 (Address all PR comments)
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    ns,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
<<<<<<< HEAD
<<<<<<< HEAD
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Fa, { children: [
        /* @__PURE__ */ d(cr, { children: [
          /* @__PURE__ */ r(dr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(pr, { children: /* @__PURE__ */ r(Ba, { children: Object.entries(e).map(([h, u]) => /* @__PURE__ */ r(Ka, { children: /* @__PURE__ */ r(
            Ga,
            {
              onClick: () => w(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
=======
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ w(rs, { children: [
        /* @__PURE__ */ w(ur, { children: [
          /* @__PURE__ */ r(mr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(fr, { children: /* @__PURE__ */ r(os, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(as, { children: /* @__PURE__ */ r(
            ss,
            {
              onClick: () => c(h),
              isActive: u(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ w(os, { children: [
        /* @__PURE__ */ w(mr, { children: [
          /* @__PURE__ */ r(fr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(hr, { children: /* @__PURE__ */ r(as, { children: Object.entries(e).map(([h, m]) => /* @__PURE__ */ r(ss, { children: /* @__PURE__ */ r(
            is,
            {
              onClick: () => c(h),
              isActive: u(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ w(mr, { children: [
          /* @__PURE__ */ r(fr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(hr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            lr,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Ie },
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (h) => {
<<<<<<< HEAD
<<<<<<< HEAD
                const u = p(h);
                w(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Fs, {})
=======
                const f = p(h);
                c(f, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ni, {})
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                const m = p(h);
                c(m, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ri, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            }
          ) })
        ] })
      ] })
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const Or = nn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = ft();
    return /* @__PURE__ */ d("div", { id: s, className: m("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        mo,
=======
const Gr = rn(
=======
const Ur = an(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = wt();
    return /* @__PURE__ */ w("div", { id: i, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
<<<<<<< HEAD
        Co,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        To,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        {
          className: f(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": d === "rtl" },
            { "tw-left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ue,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ w(
        z,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": d === "rtl" },
            { "tw-right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(je, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
<<<<<<< HEAD
<<<<<<< HEAD
Or.displayName = "SearchBar";
function Ap({
=======
Gr.displayName = "SearchBar";
function uu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Ur.displayName = "SearchBar";
function bu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Ur,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      es,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
            Fc,
=======
            gw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            yw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(rs, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const ae = "scrBook", Bc = "scrRef", ge = "source", Kc = "details", Gc = "Scripture Reference", qc = "Scripture Book", qa = "Type", Uc = "Details";
function Hc(t, e) {
=======
const ae = "scrBook", bw = "scrRef", ge = "source", vw = "details", xw = "Scripture Reference", yw = "Scripture Book", is = "Type", Nw = "Details";
function kw(t, e) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const ae = "scrBook", Nw = "scrRef", be = "source", kw = "details", _w = "Scripture Reference", Cw = "Scripture Book", ls = "Type", Ew = "Details";
function Tw(t, e) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ae,
<<<<<<< HEAD
<<<<<<< HEAD
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Gc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? wt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ae ? ve(a.start) : void 0;
=======
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? xw,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? dt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ae ? ve(a.start) : void 0;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? _w,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? dt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ae ? xe(a.start) : void 0;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      },
      getGroupingValue: (o) => dt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => tr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
<<<<<<< HEAD
      accessorFn: (o) => ve(o.start),
<<<<<<< HEAD
      id: Bc,
=======
      id: bw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      accessorFn: (o) => xe(o.start),
      id: Nw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
      id: ge,
<<<<<<< HEAD
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? qa : void 0,
=======
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? is : void 0,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? ls : void 0,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
<<<<<<< HEAD
<<<<<<< HEAD
      id: Kc,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Uc,
=======
      id: vw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Nw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      id: kw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Ew,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
<<<<<<< HEAD
<<<<<<< HEAD
const Yc = (t) => {
=======
const _w = (t) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Rw = (t) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
<<<<<<< HEAD
<<<<<<< HEAD
  return t.end && ({ offset: n } = t.end), !t.end || Wn(t.start, t.end) === 0 ? `${An(t.start)}+${e}` : `${An(t.start)}+${e}-${An(t.end)}+${n}`;
}, co = (t) => `${Yc({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Pp({
=======
  return t.end && ({ offset: n } = t.end), !t.end || Qn(t.start, t.end) === 0 ? `${$n(t.start)}+${e}` : `${$n(t.start)}+${e}-${$n(t.end)}+${n}`;
}, No = (t) => `${_w({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function mu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return t.end && ({ offset: n } = t.end), !t.end || tr(t.start, t.end) === 0 ? `${Vn(t.start)}+${e}` : `${Vn(t.start)}+${e}-${Vn(t.end)}+${n}`;
}, _o = (t) => `${Rw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function vu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const [w, p] = R([]), [f, h] = R([{ id: ae, desc: !1 }]), [u, g] = R({}), x = F(
=======
  const [c, p] = T([]), [u, h] = T([{ id: ae, desc: !1 }]), [f, g] = T({}), x = K(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const [c, p] = T([]), [u, h] = T([{ id: ae, desc: !1 }]), [m, g] = T({}), x = K(
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    () => t.flatMap((C) => C.data.map((S) => ({
      ...S,
=======
    () => t.flatMap((C) => C.data.map((R) => ({
      ...R,
>>>>>>> 5dcbb312b7 (Address all PR comments)
      source: C.source
    }))),
    [t]
<<<<<<< HEAD
  ), v = F(
    () => Hc(
=======
  ), v = K(
<<<<<<< HEAD
    () => kw(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    () => Tw(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
<<<<<<< HEAD
  q(() => {
    w.includes(ge) ? h([
      { id: ge, desc: !1 },
      { id: ae, desc: !1 }
    ]) : h([{ id: ae, desc: !1 }]);
  }, [w]);
  const y = zo({
    data: x,
    columns: v,
    state: {
      grouping: w,
      sorting: f,
      rowSelection: u
=======
  G(() => {
    c.includes(be) ? h([
      { id: be, desc: !1 },
      { id: ae, desc: !1 }
    ]) : h([{ id: ae, desc: !1 }]);
  }, [c]);
  const y = ta({
    data: x,
    columns: v,
    state: {
      grouping: c,
      sorting: u,
<<<<<<< HEAD
      rowSelection: f
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      rowSelection: m
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: g,
<<<<<<< HEAD
<<<<<<< HEAD
    getExpandedRowModel: Hi(),
    getGroupedRowModel: Ui(),
    getCoreRowModel: Bo(),
    getSortedRowModel: Fo(),
    getRowId: co,
=======
    getExpandedRowModel: ll(),
    getGroupedRowModel: il(),
    getCoreRowModel: ta(),
    getSortedRowModel: Qo(),
    getRowId: No,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    getExpandedRowModel: cl(),
    getGroupedRowModel: ll(),
    getCoreRowModel: na(),
    getSortedRowModel: ea(),
    getRowId: _o,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  G(() => {
    if (l) {
<<<<<<< HEAD
      const C = y.getSelectedRowModel().rowsById, S = Object.keys(C);
      if (S.length === 1) {
<<<<<<< HEAD
<<<<<<< HEAD
        const V = x.find((j) => co(j) === S[0]) || void 0;
        V && l(V);
      }
    }
  }, [u, x, l, y]);
  const N = a ?? qc, _ = i ?? qa, k = [
=======
        const V = x.find((j) => No(j) === S[0]) || void 0;
        V && l(V);
      }
    }
  }, [f, x, l, y]);
  const N = a ?? yw, _ = s ?? is, k = [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        const j = x.find((z) => _o(z) === S[0]) || void 0;
        j && l(j);
=======
      const C = y.getSelectedRowModel().rowsById, R = Object.keys(C);
      if (R.length === 1) {
        const $ = x.find((V) => _o(V) === R[0]) || void 0;
        $ && l($);
>>>>>>> 5dcbb312b7 (Address all PR comments)
      }
    }
  }, [m, x, l, y]);
  const N = a ?? Cw, _ = s ?? ls, k = [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
  }, V = (C, S) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(S);
<<<<<<< HEAD
<<<<<<< HEAD
  }, T = (C, S) => C.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), $ = (C, S, V) => {
=======
  }, R = (C, S) => C.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), L = (C, S, V) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    if (!((C == null ? void 0 : C.length) === 0 || S.depth < V.column.getGroupedIndex())) {
=======
  }, R = (C, S) => C.getIsGrouped() ? "" : f("banded-row", S % 2 === 0 ? "even" : "odd"), L = (C, S, j) => {
    if (!((C == null ? void 0 : C.length) === 0 || S.depth < j.column.getGroupedIndex())) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      if (S.getIsGrouped())
        switch (S.depth) {
=======
  }, F = (C, R) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(R);
  }, L = (C, R) => C.getIsGrouped() ? "" : f("banded-row", R % 2 === 0 ? "even" : "odd"), D = (C, R, $) => {
    if (!((C == null ? void 0 : C.length) === 0 || R.depth < $.column.getGroupedIndex())) {
      if (R.getIsGrouped())
        switch (R.depth) {
>>>>>>> 5dcbb312b7 (Address all PR comments)
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (R.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ d(
      Ae,
=======
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ w(
<<<<<<< HEAD
<<<<<<< HEAD
      Pe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Le,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      $e,
>>>>>>> 5dcbb312b7 (Address all PR comments)
      {
        value: JSON.stringify(c),
        onValueChange: (C) => {
          B(C);
        },
        children: [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(jw, { children: k.map((C) => /* @__PURE__ */ r(Tt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
=======
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Le, {}) }),
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(Yc, { children: k.map((C) => /* @__PURE__ */ r(Tt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r($e, {}) }),
=======
          /* @__PURE__ */ r(_e, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ve, {}) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
          /* @__PURE__ */ r(Ce, { position: "item-aligned", children: /* @__PURE__ */ r(Xc, { children: k.map((C) => /* @__PURE__ */ r(Tt, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        ]
      }
    ),
    /* @__PURE__ */ w(In, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(An, { children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(ee, { children: C.headers.filter((R) => R.column.columnDef.header).map((R) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(on, { colSpan: R.colSpan, className: "top-0 tw-sticky", children: R.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          R.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${R.column.columnDef.header}`,
              onClick: R.column.getToggleGroupingHandler(),
              type: "button",
              children: R.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          We(R.column.columnDef.header, R.getContext())
        ] }) }, R.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(Pn, { children: y.getRowModel().rows.map((C, R) => {
        const $ = wt();
        return /* @__PURE__ */ r(
          ee,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            className: m(T(C, S)),
            onClick: (j) => L(C, j),
=======
            className: m(R(C, S)),
            onClick: (j) => $(C, j),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
            children: C.getVisibleCells().map((j) => {
              if (!(j.getIsPlaceholder() || j.column.columnDef.enableGrouping && !j.getIsGrouped() && (j.column.columnDef.id !== ge || !n)))
=======
            className: f(R(C, S)),
            onClick: (z) => V(C, z),
            children: C.getVisibleCells().map((z) => {
              if (!(z.getIsPlaceholder() || z.column.columnDef.enableGrouping && !z.getIsGrouped() && (z.column.columnDef.id !== be || !n)))
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
            className: f(L(C, R)),
            onClick: (V) => F(C, V),
            children: C.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== be || !n)))
>>>>>>> 5dcbb312b7 (Address all PR comments)
                return /* @__PURE__ */ r(
                  Ne,
                  {
                    className: f(
                      V.column.columnDef.id,
                      "tw-p-[1px]",
                      D(c, C, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ w(
                      z,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                          C.getIsExpanded() && /* @__PURE__ */ r(Le, {}),
                          !C.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ r(Se, {}) : /* @__PURE__ */ r(Yn, {})),
=======
                          C.getIsExpanded() && /* @__PURE__ */ r(Ve, {}),
                          !C.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ r(Me, {}) : /* @__PURE__ */ r(Jn, {})),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                          C.getIsExpanded() && /* @__PURE__ */ r(je, {}),
                          !C.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Oe, {}) : /* @__PURE__ */ r(Zn, {})),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
                          C.getIsExpanded() && /* @__PURE__ */ r(ze, {}),
                          !C.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(Oe, {}) : /* @__PURE__ */ r(Zn, {})),
>>>>>>> 5dcbb312b7 (Address all PR comments)
                          " ",
                          We(V.column.columnDef.cell, V.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : We(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Hr = (t, e) => t.filter((n) => {
  try {
    return Xe(n) === e;
  } catch {
    return !1;
  }
<<<<<<< HEAD
<<<<<<< HEAD
}), Ua = (t, e, n) => Ir(t, e).every((o) => n.includes(o));
function Xc({
=======
}), ls = (t, e, n) => Ur(t, e).every((o) => n.includes(o));
function Cw({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}), cs = (t, e, n) => Hr(t, e).every((o) => n.includes(o));
function Sw({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Hr(e, t).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], d = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
<<<<<<< HEAD
      className: m(
<<<<<<< HEAD
        Ua(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: ol(
=======
        ls(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: hl(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      className: f(
        cs(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: gl(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        t,
        i,
        l,
        d,
        c
      )
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const po = 5, qn = 6;
function Wc({
=======
const ko = 5, Yn = 6;
function Ew({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Co = 5, Xn = 6;
function Dw({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: x } = {
=======
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: h, ntLong: f, dcLong: g, extraLong: x } = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], u = o["%webView_book_selector_more%"], { otLong: h, ntLong: m, dcLong: g, extraLong: x } = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = T(!1), [N, _] = T(""), k = H(void 0), B = H(!1);
  if (t.length !== dt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const F = K(() => dt.allBookIds.filter(
    (A, Y) => t[Y] === "1" && !dt.isObsolete(dt.bookIdToNumber(A))
  ), [t]), L = K(() => {
    if (!N.trim()) {
      const M = {
        [q.OT]: [],
        [q.NT]: [],
        [q.DC]: [],
        [q.Extra]: []
      };
      return F.forEach((W) => {
        const Ct = Xe(W);
        M[Ct].push(W);
      }), M;
    }
    const A = F.filter(
      (M) => Rr(M, N, a)
    ), Y = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return A.forEach((M) => {
      const W = Xe(M);
      Y[W].push(M);
    }), Y;
  }, [F, N, a]), D = j(
    (A, Y = !1) => {
      if (!Y || !k.current) {
        n(
          e.includes(A) ? e.filter((pt) => pt !== A) : [...e, A]
        ), k.current = A;
        return;
      }
      const M = F.findIndex((pt) => pt === k.current), W = F.findIndex((pt) => pt === A);
      if (M === -1 || W === -1) return;
      const [Ct, Ot] = [
        Math.min(M, W),
        Math.max(M, W)
      ], It = F.slice(Ct, Ot + 1).map((pt) => pt);
      n(
        e.includes(A) ? e.filter((pt) => !It.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...It])]
      );
    },
    [e, n, F]
  ), C = (A) => {
    D(A, B.current), B.current = !1;
  }, R = (A, Y) => {
    A.preventDefault(), D(Y, A.shiftKey);
  }, $ = j(
    (A) => {
      const Y = Hr(F, A).map((M) => M);
      n(
        cs(F, A, e) ? e.filter((M) => !Y.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...Y])]
      );
    },
    [e, n, F]
  ), V = () => {
    n(F.map((A) => A));
  }, I = () => {
    n([]);
  };
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(U).map((A) => /* @__PURE__ */ r(
      Xc,
=======
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(q).map((A) => /* @__PURE__ */ r(
<<<<<<< HEAD
      Cw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Sw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        section: A,
        availableBookIds: F,
        selectedBookIds: e,
        onToggle: $,
        localizedStrings: o
      },
      A
    )) }),
<<<<<<< HEAD
    /* @__PURE__ */ d(
      re,
=======
    /* @__PURE__ */ w(
<<<<<<< HEAD
      Yt,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Kt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        open: v,
        onOpenChange: (A) => {
          y(A), A || _("");
        },
        children: [
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ d(
            B,
=======
          /* @__PURE__ */ r(pe, { asChild: !0, children: /* @__PURE__ */ w(
=======
          /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ w(
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            F,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
            z,
>>>>>>> 5dcbb312b7 (Address all PR comments)
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(Io, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(Ut, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
=======
          /* @__PURE__ */ r(zt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ w(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
            ee,
=======
          /* @__PURE__ */ r(Mt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ w(
            Wt,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (B.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
                  Fe,
=======
                  Be,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                  Ee,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: V, children: d }),
                  /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: I, children: c })
                ] }),
<<<<<<< HEAD
<<<<<<< HEAD
                /* @__PURE__ */ d(ne, { children: [
                  /* @__PURE__ */ r(on, { children: p }),
                  Object.values(U).map((A, H) => {
                    const M = T[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ d(uo, { children: [
=======
                /* @__PURE__ */ w(ne, { children: [
                  /* @__PURE__ */ r(an, { children: p }),
                  Object.values(q).map((A, Y) => {
                    const M = R[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ w(_o, { children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                /* @__PURE__ */ w(Jt, { children: [
                  /* @__PURE__ */ r(Ge, { children: p }),
                  Object.values(q).map((A, Y) => {
                    const M = L[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ w(Eo, { children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                        /* @__PURE__ */ r(
                          jt,
                          {
<<<<<<< HEAD
<<<<<<< HEAD
                            heading: Xo(A, h, u, g, x),
=======
                            heading: sa(A, h, f, g, x),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                            heading: la(A, h, m, g, x),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
                            children: M.map((W) => /* @__PURE__ */ r(
                              da,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => C(W),
                                onMouseDown: (Ct) => R(Ct, W),
                                section: Xe(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ir(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        Y < Object.values(q).length - 1 && /* @__PURE__ */ r(sa, {})
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
<<<<<<< HEAD
<<<<<<< HEAD
        e.length === qn ? qn : po
      ).map((A) => /* @__PURE__ */ r(Oe, { className: "hover:tw-bg-secondary", variant: "secondary", children: Re(A, a) }, A)),
      e.length > qn && /* @__PURE__ */ r(
        Oe,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - po} ${f}`
=======
        e.length === Yn ? Yn : ko
      ).map((A) => /* @__PURE__ */ r(Ie, { className: "hover:tw-bg-secondary", variant: "secondary", children: De(A, a) }, A)),
      e.length > Yn && /* @__PURE__ */ r(
        Ie,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - ko} ${u}`
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        e.length === Xn ? Xn : Co
      ).map((A) => /* @__PURE__ */ r(Pe, { className: "hover:tw-bg-secondary", variant: "secondary", children: Me(A, a) }, A)),
      e.length > Xn && /* @__PURE__ */ r(
        Pe,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Co} ${u}`
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        }
      )
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const $p = Object.freeze([
=======
const fu = Object.freeze([
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const xu = Object.freeze([
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
]), fe = (t, e) => t[e] ?? e;
<<<<<<< HEAD
function Lp({
=======
function hu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
]), he = (t, e) => t[e] ?? e;
function yu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const w = fe(
    s,
    "%webView_scope_selector_selected_text%"
  ), p = fe(
    s,
    "%webView_scope_selector_current_verse%"
  ), f = fe(
    s,
    "%webView_scope_selector_current_chapter%"
  ), h = fe(s, "%webView_scope_selector_current_book%"), u = fe(s, "%webView_scope_selector_choose_books%"), g = fe(s, "%webView_scope_selector_scope%"), x = fe(s, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
=======
  const c = fe(
=======
  const c = he(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    i,
    "%webView_scope_selector_selected_text%"
  ), p = he(
    i,
    "%webView_scope_selector_current_verse%"
  ), u = he(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = he(i, "%webView_scope_selector_current_book%"), m = he(i, "%webView_scope_selector_choose_books%"), g = he(i, "%webView_scope_selector_scope%"), x = he(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
<<<<<<< HEAD
<<<<<<< HEAD
    { value: "selectedBooks", label: u, id: "scope-selected" }
=======
    { value: "selectedBooks", label: f, id: "scope-selected" }
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    { value: "selectedBooks", label: m, id: "scope-selected" }
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  ], y = e ? v.filter((N) => e.includes(N.value)) : v;
  return /* @__PURE__ */ w("div", { id: d, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ft, { children: g }),
      /* @__PURE__ */ r(
        Dr,
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
<<<<<<< HEAD
<<<<<<< HEAD
        Wc,
=======
        Ew,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        Dw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Vp({
=======
function gu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Nu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
        ([c, p]) => [
          c,
          c === p && c in Wn ? Wn[c] : p
        ]
      )
    )
<<<<<<< HEAD
  }, c = ft();
  return /* @__PURE__ */ d(
    Ae,
=======
  }, d = wt();
  return /* @__PURE__ */ w(
<<<<<<< HEAD
<<<<<<< HEAD
    Pe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    Le,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    $e,
>>>>>>> 5dcbb312b7 (Address all PR comments)
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r(_e, { size: a, className: m("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Pe,
=======
        /* @__PURE__ */ r(_e, { size: a, className: m("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Le,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        /* @__PURE__ */ r(_e, { size: a, className: f("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
<<<<<<< HEAD
          $e,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
          Ve,
>>>>>>> 5dcbb312b7 (Address all PR comments)
          {
            placeholder: l[tt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ce,
          {
            id: i,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: ln },
            children: t.map((c) => /* @__PURE__ */ r(Tt, { value: `${c}`, children: l[tt(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function jp({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function zp({
=======
function bu({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function vu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function ku({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function _u({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function Fp({
=======
function xu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Cu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    n ? /* @__PURE__ */ r(Ie, {}) : ""
=======
    n ? /* @__PURE__ */ r(Ae, {}) : ""
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    n ? /* @__PURE__ */ r(Pe, {}) : ""
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    n ? /* @__PURE__ */ r(Le, {}) : ""
>>>>>>> 5dcbb312b7 (Address all PR comments)
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
const ws = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Lt, { children: [
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
<<<<<<< HEAD
<<<<<<< HEAD
  ) : /* @__PURE__ */ d(Aw, { children: [
    /* @__PURE__ */ r(Ma, { children: l.label }),
    /* @__PURE__ */ r(Iw, { children: /* @__PURE__ */ r(Oa, { children: Ya(
=======
  ) : /* @__PURE__ */ w(Ua, { children: [
    /* @__PURE__ */ r(jr, { children: l.label }),
    /* @__PURE__ */ r(Ga, { children: /* @__PURE__ */ r(zr, { children: ds(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  ) : /* @__PURE__ */ w(Ha, { children: [
    /* @__PURE__ */ r(zr, { children: l.label }),
    /* @__PURE__ */ r(Ua, { children: /* @__PURE__ */ r(Fr, { children: ws(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      t,
      e,
      ds(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(St, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function gr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(de, { variant: i, children: [
    /* @__PURE__ */ r(ke, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(B, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(Bs, {}) }) }),
    /* @__PURE__ */ r(te, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(uo, { children: [
      /* @__PURE__ */ r(Da, { children: /* @__PURE__ */ r(Rt, { children: Ya(e.groups, e.items, c, t) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Be, {})
    ] }, c)) })
=======
  return /* @__PURE__ */ w(ue, { variant: s, children: [
    /* @__PURE__ */ r(Ee, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(ri, {}) }) }),
    /* @__PURE__ */ r(oe, { align: "start", style: { zIndex: sn }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, p) => /* @__PURE__ */ w(_o, { children: [
      /* @__PURE__ */ r(Ka, { children: /* @__PURE__ */ r(Rt, { children: ds(e.groups, e.items, d, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(Te, {})
=======
  return /* @__PURE__ */ w(me, { variant: s, children: [
    /* @__PURE__ */ r(Te, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(z, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(oi, {}) }) }),
    /* @__PURE__ */ r(oe, { align: "start", style: { zIndex: ln }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, p) => /* @__PURE__ */ w(Eo, { children: [
      /* @__PURE__ */ r(Ga, { children: /* @__PURE__ */ r(Rt, { children: ws(e.groups, e.items, d, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(Re, {})
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ] }, d)) })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  ] });
}
const ps = b.forwardRef(
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
<<<<<<< HEAD
<<<<<<< HEAD
function Bp({
=======
function yu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Eu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ w(ps, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      gr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
<<<<<<< HEAD
<<<<<<< HEAD
        icon: w ?? /* @__PURE__ */ r(Ks, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
=======
        icon: c ?? /* @__PURE__ */ r(oi, {}),
=======
        icon: c ?? /* @__PURE__ */ r(ai, {}),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      o && /* @__PURE__ */ r(
        gr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
<<<<<<< HEAD
<<<<<<< HEAD
          icon: /* @__PURE__ */ r(Gs, {}),
=======
          icon: /* @__PURE__ */ r(ai, {}),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          icon: /* @__PURE__ */ r(si, {}),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          className: "tw-h-full"
        }
      ),
      d
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function Kp({
=======
function Nu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Tu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(ps, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    gr,
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
const us = b.forwardRef(({ className: t, ...e }, n) => {
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
us.displayName = _t.List.displayName;
const ms = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
<<<<<<< HEAD
<<<<<<< HEAD
Ja.displayName = _t.List.displayName;
const Jc = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
us.displayName = _t.List.displayName;
const Tw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ms.displayName = _t.List.displayName;
const Mw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), fs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
<<<<<<< HEAD
<<<<<<< HEAD
Za.displayName = _t.Content.displayName;
function Gp({
=======
ms.displayName = _t.Content.displayName;
function ku({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
fs.displayName = _t.Content.displayName;
function Ru({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
        Ur,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ d(Wa, { children: [
      /* @__PURE__ */ r(Ja, { children: t.map((l) => /* @__PURE__ */ r(Jc, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Za, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Zc({ ...t }) {
  return /* @__PURE__ */ r(at.Menu, { ...t });
}
function Qc({ ...t }) {
  return /* @__PURE__ */ r(at.Sub, { "data-slot": "menubar-sub", ...t });
=======
    /* @__PURE__ */ w(ps, { children: [
      /* @__PURE__ */ r(us, { children: t.map((l) => /* @__PURE__ */ r(Tw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(ms, { value: l.value, children: l.content }, l.key))
=======
    /* @__PURE__ */ w(us, { children: [
      /* @__PURE__ */ r(ms, { children: t.map((l) => /* @__PURE__ */ r(Mw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(fs, { value: l.value, children: l.content }, l.key))
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ] })
  ] });
}
function Ow({ ...t }) {
  return /* @__PURE__ */ r(st.Menu, { ...t });
}
function Iw({ ...t }) {
  return /* @__PURE__ */ r(st.Sub, { "data-slot": "menubar-sub", ...t });
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
}
const hs = b.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(jr.Provider, { value: a, children: /* @__PURE__ */ r(
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
hs.displayName = st.Root.displayName;
const gs = b.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    st.Trigger,
    {
      ref: n,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        oe({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
gs.displayName = st.Trigger.displayName;
const bs = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = Gt();
  return /* @__PURE__ */ w(
    st.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
<<<<<<< HEAD
        oe({ variant: i.variant, className: t }),
=======
        re({ variant: s.variant, className: t }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
=======
        /* @__PURE__ */ r(Me, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      ]
    }
  );
});
bs.displayName = st.SubTrigger.displayName;
const vs = b.forwardRef(({ className: t, ...e }, n) => {
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
vs.displayName = st.SubContent.displayName;
const xs = b.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
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
xs.displayName = st.Content.displayName;
const ys = b.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ r(
    st.Item,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        oe({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
os.displayName = at.Item.displayName;
const td = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = zt();
  return /* @__PURE__ */ d(
    at.CheckboxItem,
=======
xs.displayName = st.Item.displayName;
const Dw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Ft();
=======
ys.displayName = st.Item.displayName;
const Aw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = Gt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ w(
    st.CheckboxItem,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
<<<<<<< HEAD
        oe({ variant: i.variant, className: t }),
=======
        re({ variant: s.variant, className: t }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
td.displayName = at.CheckboxItem.displayName;
const ed = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = zt();
  return /* @__PURE__ */ d(
    at.RadioItem,
=======
Dw.displayName = st.CheckboxItem.displayName;
const Mw = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Ft();
=======
Aw.displayName = st.CheckboxItem.displayName;
const Pw = b.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Gt();
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ w(
    st.RadioItem,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        oe({ variant: a.variant, className: t }),
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
<<<<<<< HEAD
<<<<<<< HEAD
ed.displayName = at.RadioItem.displayName;
const nd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
=======
Mw.displayName = st.RadioItem.displayName;
const Ow = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
=======
Pw.displayName = st.RadioItem.displayName;
const Lw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  st.Label,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
nd.displayName = at.Label.displayName;
const as = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
=======
Ow.displayName = st.Label.displayName;
const ys = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Lw.displayName = st.Label.displayName;
const Ns = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  st.Separator,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ns.displayName = st.Separator.displayName;
const qe = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ks = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = e.filter((c) => c.group === s).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ w(Lt, { children: [
      /* @__PURE__ */ r($t, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
        ys,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(En, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(En, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
<<<<<<< HEAD
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ d(Qc, { children: [
        /* @__PURE__ */ r(es, { children: w.label }),
        /* @__PURE__ */ r(ns, { children: ss(
=======
        `menubar-item-${c.label}-${c.command}`
<<<<<<< HEAD
      ) : /* @__PURE__ */ w(Sw, { children: [
        /* @__PURE__ */ r(gs, { children: c.label }),
        /* @__PURE__ */ r(bs, { children: Ns(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      ) : /* @__PURE__ */ w(Iw, { children: [
        /* @__PURE__ */ r(bs, { children: c.label }),
        /* @__PURE__ */ r(vs, { children: ks(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
          t,
          e,
          ds(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(St, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && i < a.length - 1 && d.push(/* @__PURE__ */ r(Ns, {}, `separator-${s}`)), d;
  });
};
<<<<<<< HEAD
<<<<<<< HEAD
function rd({
=======
function Iw({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function $w({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = H(void 0), s = H(void 0), i = H(void 0), l = H(void 0), d = H(void 0), c = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
<<<<<<< HEAD
<<<<<<< HEAD
  if (Ji(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
=======
  if (pl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
=======
  if (ul(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, u) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (u.hotkey) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      case "alt":
        qe(s, [h]);
        break;
      case "alt+p":
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        (g = i.current) == null || g.focus(), qe(i, [h, u]);
        break;
      case "alt+l":
        (x = s.current) == null || x.focus(), qe(s, [h, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), qe(l, [h, u]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), qe(c, [h, u]);
=======
        (g = s.current) == null || g.focus(), Ue(s, [h, f]);
=======
        (g = s.current) == null || g.focus(), He(s, [h, m]);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        (g = s.current) == null || g.focus(), qe(s, [h, m]);
>>>>>>> 5dcbb312b7 (Address all PR comments)
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), qe(i, [h, m]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), qe(l, [h, m]);
        break;
      case "alt+h":
<<<<<<< HEAD
<<<<<<< HEAD
        (y = d.current) == null || y.focus(), Ue(d, [h, f]);
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        (y = d.current) == null || y.focus(), He(d, [h, m]);
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
        (y = d.current) == null || y.focus(), qe(d, [h, m]);
>>>>>>> 5dcbb312b7 (Address all PR comments)
        break;
    }
  }), G(() => {
    if (!n || !a.current) return;
<<<<<<< HEAD
<<<<<<< HEAD
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
=======
    const p = new MutationObserver((f) => {
      f.forEach((g) => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    const p = new MutationObserver((m) => {
      m.forEach((g) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
<<<<<<< HEAD
<<<<<<< HEAD
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Qa, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ d(Zc, { children: [
      /* @__PURE__ */ r(ts, { ref: w(p), children: typeof f == "object" && "label" in f && f.label }),
=======
    return a.current.querySelectorAll("[data-state]").forEach((f) => {
      p.observe(f, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(fs, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ w(Rw, { children: [
      /* @__PURE__ */ r(hs, { ref: c(p), children: typeof u == "object" && "label" in u && u.label }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    return a.current.querySelectorAll("[data-state]").forEach((m) => {
      p.observe(m, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(hs, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, u]) => typeof p == "boolean" || typeof u == "boolean" ? 0 : p.order - u.order).map(([p, u]) => /* @__PURE__ */ w(Ow, { children: [
      /* @__PURE__ */ r(gs, { ref: c(p), children: typeof u == "object" && "label" in u && u.label }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      /* @__PURE__ */ r(
        xs,
        {
          style: { zIndex: ln },
          children: /* @__PURE__ */ r(Rt, { children: ks(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
<<<<<<< HEAD
<<<<<<< HEAD
function qp(t) {
=======
function _u(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Su(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
function Up({
=======
function Cu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Du({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: c = "default"
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
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
                    rd,
=======
                    Iw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
                    $w,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
                children: s
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
<<<<<<< HEAD
<<<<<<< HEAD
const od = (t, e) => t[e] ?? e;
function Hp({
=======
const Aw = (t, e) => t[e] ?? e;
function Eu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Vw = (t, e) => t[e] ?? e;
function Mu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: d
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const w = od(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, f] = R(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), i && n.find((x) => x === g) && i([...n.filter((x) => x !== g)]), f(!1);
  }, u = (g, x) => {
    var y, N, _, k, z, L;
=======
  const c = Aw(
=======
  const c = Vw(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, u] = T(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), u(!1);
<<<<<<< HEAD
  }, f = (g, x) => {
    var y, N, _, k, B, $;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  }, m = (g, x) => {
<<<<<<< HEAD
    var y, N, _, k, B, V;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    var y, N, _, k, B, F;
>>>>>>> 5dcbb312b7 (Address all PR comments)
    const v = x !== g ? ((N = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((k = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : k.en) : void 0;
    return v ? `${(B = t[g]) == null ? void 0 : B.autonym} (${v})` : (F = t[g]) == null ? void 0 : F.autonym;
  };
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { id: c, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Ae,
=======
  return /* @__PURE__ */ w("div", { id: d, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      Pe,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  return /* @__PURE__ */ w("div", { id: d, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
<<<<<<< HEAD
      Le,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
      $e,
>>>>>>> 5dcbb312b7 (Address all PR comments)
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => f(g),
        children: [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Pe, {}) }),
          /* @__PURE__ */ r(
            Ce,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Tt, { value: g, children: u(g, e) }, g))
=======
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Le, {}) }),
          /* @__PURE__ */ r(
            Ce,
            {
              style: { zIndex: sn },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Tt, { value: g, children: f(g, e) }, g))
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r($e, {}) }),
=======
          /* @__PURE__ */ r(_e, { children: /* @__PURE__ */ r(Ve, {}) }),
>>>>>>> 5dcbb312b7 (Address all PR comments)
          /* @__PURE__ */ r(
            Ce,
            {
              style: { zIndex: ln },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Tt, { value: g, children: m(g, e) }, g))
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
            }
          )
        ]
      }
    ),
<<<<<<< HEAD
<<<<<<< HEAD
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(mt, { className: "tw-font-normal tw-text-muted-foreground", children: be(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function ad({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(mt, { children: e(t) }) : n ? /* @__PURE__ */ r(mt, { children: n(t) }) : /* @__PURE__ */ r(mt, { children: t });
}
function Yp({
=======
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ft, { className: "tw-font-normal tw-text-muted-foreground", children: be(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => f(g, e)).join(", ") : t.en.autonym
=======
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ft, { className: "tw-font-normal tw-text-muted-foreground", children: ve(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => m(g, e)).join(", ") : t.en.autonym
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }) }) })
  ] });
}
function jw({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ft, { children: e(t) }) : n ? /* @__PURE__ */ r(ft, { children: n(t) }) : /* @__PURE__ */ r(ft, { children: t });
}
<<<<<<< HEAD
function Tu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Ou({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
      Gr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => a(l, d)
      }
    ),
    /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
      ad,
=======
      Pw,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      jw,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
<<<<<<< HEAD
<<<<<<< HEAD
function Xp({
=======
function Ru({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function Iu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
<<<<<<< HEAD
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: c,
  dropdownContent: w,
  additionalSelectedContent: p,
  accentColor: f,
  showDropdownOnHover: h = !1
=======
  className: s,
  children: i,
  dropdownContent: l,
  additionalSelectedContent: d,
  accentColor: c
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
      className: m(
<<<<<<< HEAD
        "tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
=======
=======
      className: f(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        s
      ),
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: s }),
            e && l,
            !e && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: c }),
            !e && h && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ d(de, { children: [
              /* @__PURE__ */ r(ke, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Fr, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ d(de, { children: [
              /* @__PURE__ */ r(ke, { className: m(f && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Fr, {}) }) }),
              /* @__PURE__ */ r(te, { align: "end", children: w })
            ] })
          ] }),
          e && p && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: p })
        ] }),
        f && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${f}`
=======
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && l && /* @__PURE__ */ w(me, { children: [
              /* @__PURE__ */ r(Te, { className: f(c && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(z, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Do, {}) }) }),
              /* @__PURE__ */ r(oe, { align: "end", children: l })
            ] })
          ] }),
          e && d && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: d })
        ] }),
        c && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
          }
        )
      ]
    },
    t
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const sd = nn(({ className: t, ...e }, n) => /* @__PURE__ */ r(qs, { size: 35, className: m("tw-animate-spin", t), ...e, ref: n }));
sd.displayName = "Spinner";
function Wp({
=======
const Lw = rn(({ className: t, ...e }, n) => /* @__PURE__ */ r(si, { size: 35, className: m("tw-animate-spin", t), ...e, ref: n }));
Lw.displayName = "Spinner";
function Su({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const zw = an(({ className: t, ...e }, n) => /* @__PURE__ */ r(ii, { size: 35, className: f("tw-animate-spin", t), ...e, ref: n }));
zw.displayName = "Spinner";
function Au({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: d,
  defaultValue: c,
  value: p,
  onChange: f,
  onFocus: h,
<<<<<<< HEAD
<<<<<<< HEAD
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
=======
  onBlur: f
}) {
  return /* @__PURE__ */ w("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  onBlur: m
}) {
  return /* @__PURE__ */ w("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
      Ue,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
<<<<<<< HEAD
<<<<<<< HEAD
        className: m(c, { "tw-border-red-600": n }),
        defaultValue: w,
=======
        className: m(d, { "tw-border-red-600": n }),
=======
        className: f(d, { "tw-border-red-600": n }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
        defaultValue: c,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
        value: p,
        onChange: f,
        onFocus: h,
<<<<<<< HEAD
<<<<<<< HEAD
        onBlur: u
=======
        onBlur: f
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
        onBlur: m
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const id = pe(
=======
const $w = we(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Fw = pe(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
), ld = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
=======
), Vw = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
), Bw = b.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  "div",
  {
    ref: o,
    role: "alert",
    className: f(
      // CUSTOM
      "pr-twp",
<<<<<<< HEAD
<<<<<<< HEAD
      id({ variant: e }),
=======
      $w({ variant: e }),
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
      Fw({ variant: e }),
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
      t
    ),
    ...n
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
ld.displayName = "Alert";
const wd = b.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ d(
=======
Vw.displayName = "Alert";
const jw = b.forwardRef(
=======
Bw.displayName = "Alert";
const Kw = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  ({ className: t, ...e }, n) => /* @__PURE__ */ w(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
wd.displayName = "AlertTitle";
const cd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
cd.displayName = "AlertDescription";
const Jp = st.Root, Zp = st.Trigger, Qp = st.Group, tu = st.Portal, eu = st.Sub, nu = st.RadioGroup, dd = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ d(
  st.SubTrigger,
=======
jw.displayName = "AlertTitle";
const zw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
zw.displayName = "AlertDescription";
const Du = it.Root, Mu = it.Trigger, Ou = it.Group, Iu = it.Portal, Au = it.Sub, Pu = it.RadioGroup, Fw = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
=======
Kw.displayName = "AlertTitle";
const Gw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Gw.displayName = "AlertDescription";
const Pu = it.Root, Lu = it.Trigger, $u = it.Group, Vu = it.Portal, ju = it.Sub, zu = it.RadioGroup, Uw = b.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ w(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.SubTrigger,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
      /* @__PURE__ */ r(Se, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
dd.displayName = st.SubTrigger.displayName;
const pd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.SubContent,
=======
      /* @__PURE__ */ r(Me, { className: "tw-ml-auto tw-h-4 tw-w-4" })
=======
      /* @__PURE__ */ r(Oe, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    ]
  }
));
Uw.displayName = it.SubTrigger.displayName;
const Hw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.SubContent,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
pd.displayName = st.SubContent.displayName;
const ud = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(st.Portal, { children: /* @__PURE__ */ r(
  st.Content,
=======
Bw.displayName = it.SubContent.displayName;
const Kw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(it.Portal, { children: /* @__PURE__ */ r(
=======
Hw.displayName = it.SubContent.displayName;
const qw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(it.Portal, { children: /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.Content,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
<<<<<<< HEAD
<<<<<<< HEAD
ud.displayName = st.Content.displayName;
const md = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Item,
=======
Kw.displayName = it.Content.displayName;
const Gw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
=======
qw.displayName = it.Content.displayName;
const Yw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.Item,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
md.displayName = st.Item.displayName;
const fd = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ d(
  st.CheckboxItem,
=======
Gw.displayName = it.Item.displayName;
const Uw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
=======
Yw.displayName = it.Item.displayName;
const Xw = b.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ w(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.CheckboxItem,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
fd.displayName = st.CheckboxItem.displayName;
const hd = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ d(
  st.RadioItem,
=======
Uw.displayName = it.CheckboxItem.displayName;
const Hw = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
=======
Xw.displayName = it.CheckboxItem.displayName;
const Ww = b.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ w(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.RadioItem,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
hd.displayName = st.RadioItem.displayName;
const gd = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  st.Label,
=======
Hw.displayName = it.RadioItem.displayName;
const qw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
=======
Ww.displayName = it.RadioItem.displayName;
const Jw = b.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.Label,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
gd.displayName = st.Label.displayName;
const bd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  st.Separator,
=======
qw.displayName = it.Label.displayName;
const Yw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Jw.displayName = it.Label.displayName;
const Zw = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  it.Separator,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
bd.displayName = st.Separator.displayName;
function vd({ className: t, ...e }) {
=======
Yw.displayName = it.Separator.displayName;
function Xw({ className: t, ...e }) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Zw.displayName = it.Separator.displayName;
function Qw({ className: t, ...e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
vd.displayName = "ContextMenuShortcut";
const is = b.createContext({
  direction: "bottom"
});
function xd({
=======
Xw.displayName = "ContextMenuShortcut";
const ks = b.createContext({
  direction: "bottom"
});
function Ww({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Qw.displayName = "ContextMenuShortcut";
const _s = b.createContext({
  direction: "bottom"
});
function tp({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(_s.Provider, { value: o, children: /* @__PURE__ */ r(
    Ft.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
<<<<<<< HEAD
<<<<<<< HEAD
xd.displayName = "Drawer";
const ru = jt.Trigger, yd = jt.Portal, ou = jt.Close, ls = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ww.displayName = "Drawer";
const Lu = jt.Trigger, Jw = jt.Portal, $u = jt.Close, _s = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  jt.Overlay,
=======
tp.displayName = "Drawer";
const Fu = Ft.Trigger, ep = Ft.Portal, Bu = Ft.Close, Cs = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Overlay,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  {
    ref: n,
    className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
ls.displayName = jt.Overlay.displayName;
const Nd = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = b.useContext(is), s = {
=======
_s.displayName = jt.Overlay.displayName;
const Zw = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(ks), i = {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
Cs.displayName = Ft.Overlay.displayName;
const np = b.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(_s), i = {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(yd, { children: [
    /* @__PURE__ */ r(ls, {}),
    /* @__PURE__ */ d(
=======
  return /* @__PURE__ */ w(Jw, { children: [
    /* @__PURE__ */ r(_s, {}),
    /* @__PURE__ */ w(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      jt.Content,
=======
  return /* @__PURE__ */ w(ep, { children: [
    /* @__PURE__ */ r(Cs, {}),
    /* @__PURE__ */ w(
      Ft.Content,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Nd.displayName = "DrawerContent";
function kd({ className: t, ...e }) {
=======
Zw.displayName = "DrawerContent";
function Qw({ className: t, ...e }) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
np.displayName = "DrawerContent";
function rp({ className: t, ...e }) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
kd.displayName = "DrawerHeader";
function _d({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
_d.displayName = "DrawerFooter";
const Cd = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Qw.displayName = "DrawerHeader";
function tp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
tp.displayName = "DrawerFooter";
const ep = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  jt.Title,
=======
rp.displayName = "DrawerHeader";
function op({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
op.displayName = "DrawerFooter";
const ap = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Title,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Cd.displayName = jt.Title.displayName;
const Ed = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ep.displayName = jt.Title.displayName;
const np = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
  jt.Description,
=======
ap.displayName = Ft.Title.displayName;
const sp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Description,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Ed.displayName = jt.Description.displayName;
const Td = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  er.Root,
=======
np.displayName = jt.Description.displayName;
const rp = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  or.Root,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
sp.displayName = Ft.Description.displayName;
const ip = b.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  ar.Root,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Td.displayName = er.Root.displayName;
function au({
=======
rp.displayName = or.Root.displayName;
function Vu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
ip.displayName = ar.Root.displayName;
function Ku({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    yr.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const su = gr.Panel;
function iu({
=======
const ju = xr.Panel;
function zu({
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const Gu = yr.Panel;
function Uu({
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    yr.PanelResizeHandle,
    {
      className: f(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
<<<<<<< HEAD
<<<<<<< HEAD
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(Us, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function lu({ ...t }) {
  return /* @__PURE__ */ r(
    Zi,
=======
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(ii, { className: "tw-h-2.5 tw-w-2.5" }) })
=======
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(li, { className: "tw-h-2.5 tw-w-2.5" }) })
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
    }
  );
}
function Hu({ ...t }) {
  return /* @__PURE__ */ r(
<<<<<<< HEAD
    ul,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
    ml,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
const Rd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ d(
    Ue.Root,
=======
const op = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w(
    He.Root,
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
const lp = b.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ w(
<<<<<<< HEAD
    qe.Root,
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
=======
    Ye.Root,
>>>>>>> 5dcbb312b7 (Address all PR comments)
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Ye.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Ye.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Ye.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Rd.displayName = Ue.Root.displayName;
const Sd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
=======
op.displayName = He.Root.displayName;
const ap = b.forwardRef(({ className: t, ...e }, n) => {
=======
lp.displayName = qe.Root.displayName;
=======
lp.displayName = Ye.Root.displayName;
>>>>>>> 5dcbb312b7 (Address all PR comments)
const cp = b.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const o = wt();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
Sd.displayName = nr.Root.displayName;
const wu = _t.Root, Dd = b.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
=======
ap.displayName = ar.Root.displayName;
const Bu = _t.Root, sp = b.forwardRef(({ className: t, ...e }, n) => {
=======
cp.displayName = sr.Root.displayName;
const qu = _t.Root, dp = b.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const o = wt();
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
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
<<<<<<< HEAD
<<<<<<< HEAD
Dd.displayName = _t.List.displayName;
const Md = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
sp.displayName = _t.List.displayName;
const ip = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
dp.displayName = _t.List.displayName;
const wp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Md.displayName = _t.Trigger.displayName;
const Od = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ip.displayName = _t.Trigger.displayName;
const lp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
wp.displayName = _t.Trigger.displayName;
const pp = b.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Od.displayName = _t.Content.displayName;
const Id = b.forwardRef(
=======
lp.displayName = _t.Content.displayName;
const cp = b.forwardRef(
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
pp.displayName = _t.Content.displayName;
const up = b.forwardRef(
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
Id.displayName = "Textarea";
const cu = (t, e) => {
  q(() => {
=======
cp.displayName = "Textarea";
const Ku = (t, e) => {
=======
up.displayName = "Textarea";
const Yu = (t, e) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
<<<<<<< HEAD
<<<<<<< HEAD
function Ad(t) {
=======
function dp(t) {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function mp(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  return {
    preserveValue: !0,
    ...t
  };
}
<<<<<<< HEAD
<<<<<<< HEAD
const Pd = (t, e, n = {}) => {
  const o = Y(e);
  o.current = e;
  const a = Y(n);
  a.current = Ad(a.current);
  const [i, s] = R(() => o.current), [l, c] = R(!0);
  return q(() => {
    let w = !0;
    return c(!!t), (async () => {
=======
const wp = (t, e, n = {}) => {
=======
const fp = (t, e, n = {}) => {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  const o = H(e);
  o.current = e;
  const a = H(n);
  a.current = mp(a.current);
  const [s, i] = T(() => o.current), [l, d] = T(!0);
  return G(() => {
    let c = !0;
    return d(!!t), (async () => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
      if (t) {
        const p = await t();
        c && (i(() => p), d(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => o.current);
    };
<<<<<<< HEAD
  }, [t]), [i, l];
}, Hn = () => !1, du = (t, e) => {
  const [n] = Pd(
    K(async () => {
      if (!t) return Hn;
=======
  }, [t]), [s, l];
<<<<<<< HEAD
}, Wn = () => !1, Gu = (t, e) => {
  const [n] = wp(
    z(async () => {
      if (!t) return Wn;
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
}, Jn = () => !1, Xu = (t, e) => {
  const [n] = fp(
    j(async () => {
      if (!t) return Jn;
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
function pu(t) {
  q(() => {
=======
function Uu(t) {
=======
function Wu(t) {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  G(() => {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
<<<<<<< HEAD
<<<<<<< HEAD
function $d(t, e = "top") {
=======
function pp(t, e = "top") {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
function hp(t, e = "top") {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
<<<<<<< HEAD
<<<<<<< HEAD
$d(`*, ::before, ::after {
=======
pp(`*, ::before, ::after {
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
hp(`*, ::before, ::after {
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
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
<<<<<<< HEAD
<<<<<<< HEAD
  ld as Alert,
  cd as AlertDescription,
  wd as AlertTitle,
  Ra as Avatar,
  Sa as AvatarFallback,
  Ow as AvatarImage,
  wp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  cp as BOOK_SELECTOR_STRING_KEYS,
  Oe as Badge,
  lp as BookChapterControl,
  ar as BookSelectionMode,
  dp as BookSelector,
  B as Button,
  up as COMMENT_EDITOR_STRING_KEYS,
  mp as COMMENT_LIST_STRING_KEYS,
  Ea as Card,
  Ta as CardContent,
  Dw as CardDescription,
  Mw as CardFooter,
  Rw as CardHeader,
  Sw as CardTitle,
  pl as ChapterRangeSelector,
  Mr as Checkbox,
  Yp as Checklist,
  or as ComboBox,
  ee as Command,
  on as CommandEmpty,
  Qt as CommandGroup,
  Fe as CommandInput,
  qt as CommandItem,
  ne as CommandList,
  pp as CommentEditor,
  fp as CommentList,
  Jp as ContextMenu,
  fd as ContextMenuCheckboxItem,
  ud as ContextMenuContent,
  Qp as ContextMenuGroup,
  md as ContextMenuItem,
  gd as ContextMenuLabel,
  tu as ContextMenuPortal,
  nu as ContextMenuRadioGroup,
  hd as ContextMenuRadioItem,
  bd as ContextMenuSeparator,
  vd as ContextMenuShortcut,
  eu as ContextMenuSub,
  pd as ContextMenuSubContent,
  dd as ContextMenuSubTrigger,
  Zp as ContextMenuTrigger,
  Ww as DataTable,
  xd as Drawer,
  ou as DrawerClose,
  Nd as DrawerContent,
  Ed as DrawerDescription,
  _d as DrawerFooter,
  kd as DrawerHeader,
  ls as DrawerOverlay,
  yd as DrawerPortal,
  Cd as DrawerTitle,
  ru as DrawerTrigger,
  de as DropdownMenu,
  Jt as DropdownMenuCheckboxItem,
  te as DropdownMenuContent,
  Da as DropdownMenuGroup,
  yn as DropdownMenuItem,
  Qw as DropdownMenuItemType,
  an as DropdownMenuLabel,
  Iw as DropdownMenuPortal,
  Pw as DropdownMenuRadioGroup,
  Ia as DropdownMenuRadioItem,
  Be as DropdownMenuSeparator,
  $w as DropdownMenuShortcut,
  Aw as DropdownMenuSub,
  Oa as DropdownMenuSubContent,
  Ma as DropdownMenuSubTrigger,
  ke as DropdownMenuTrigger,
  Jw as ERROR_DUMP_STRING_KEYS,
  gp as ERROR_POPOVER_STRING_KEYS,
  nc as EditorKeyboardShortcuts,
  Zw as ErrorDump,
  bp as ErrorPopover,
  _p as FOOTNOTE_EDITOR_STRING_KEYS,
  Np as Filter,
  vp as FilterDropdown,
  yp as Footer,
  kp as FootnoteEditor,
  gc as FootnoteItem,
  Cp as FootnoteList,
  Op as INVENTORY_STRING_KEYS,
  Ke as Input,
  Ip as Inventory,
  mt as Label,
  lc as MARKER_MENU_STRING_KEYS,
  hp as MarkdownRenderer,
  cc as MarkerMenu,
  xp as MoreInfo,
  ec as MultiSelectComboBox,
  Gp as NavigationContentSearch,
  re as Popover,
  al as PopoverAnchor,
  Ut as PopoverContent,
  ue as PopoverTrigger,
  Td as Progress,
  xr as RadioGroup,
  bn as RadioGroupItem,
  sl as RecentSearches,
  iu as ResizableHandle,
  su as ResizablePanel,
  au as ResizablePanelGroup,
  Xp as ResultsCard,
  $p as SCOPE_SELECTOR_STRING_KEYS,
  Lp as ScopeSelector,
  Pp as ScriptureResultsViewer,
  Vp as ScrollGroupSelector,
  Or as SearchBar,
  Ae as Select,
  Ce as SelectContent,
  jw as SelectGroup,
  Tt as SelectItem,
  Fw as SelectLabel,
  Pa as SelectScrollDownButton,
  Aa as SelectScrollUpButton,
  Bw as SelectSeparator,
  _e as SelectTrigger,
  Pe as SelectValue,
  Ie as Separator,
  jp as SettingsList,
  Fp as SettingsListHeader,
  zp as SettingsListItem,
  Fc as SettingsSidebar,
  Ap as SettingsSidebarContentSearch,
  ja as Sidebar,
  Fa as SidebarContent,
  Mc as SidebarFooter,
  cr as SidebarGroup,
  Ic as SidebarGroupAction,
  pr as SidebarGroupContent,
  dr as SidebarGroupLabel,
  Dc as SidebarHeader,
  Sc as SidebarInput,
  za as SidebarInset,
  Ba as SidebarMenu,
  Pc as SidebarMenuAction,
  $c as SidebarMenuBadge,
  Ga as SidebarMenuButton,
  Ka as SidebarMenuItem,
  Lc as SidebarMenuSkeleton,
  Vc as SidebarMenuSub,
  zc as SidebarMenuSubButton,
  jc as SidebarMenuSubItem,
  Va as SidebarProvider,
  Rc as SidebarRail,
  Oc as SidebarSeparator,
  Tc as SidebarTrigger,
  wr as Skeleton,
  Rd as Slider,
  lu as Sonner,
  sd as Spinner,
  Sd as Switch,
  ur as TabDropdownMenu,
  Kp as TabFloatingMenu,
  Bp as TabToolbar,
  Sn as Table,
  Mn as TableBody,
  Xw as TableCaption,
  ye as TableCell,
  qw as TableFooter,
  en as TableHead,
  Dn as TableHeader,
  Wt as TableRow,
  wu as Tabs,
  Od as TabsContent,
  Dd as TabsList,
  Md as TabsTrigger,
  Wp as TextField,
  Id as Textarea,
  Er as ToggleGroup,
  Je as ToggleGroupItem,
  Up as Toolbar,
  At as Tooltip,
  St as TooltipContent,
  Rt as TooltipProvider,
  Pt as TooltipTrigger,
  Hp as UiLanguageSelector,
  Wa as VerticalTabs,
  Za as VerticalTabsContent,
  Ja as VerticalTabsList,
  Jc as VerticalTabsTrigger,
  Tw as badgeVariants,
  Zo as buttonVariants,
  m as cn,
  Mp as getBookIdFromUSFM,
  On as getInventoryHeader,
  Sp as getLinesFromUSFM,
  Dp as getNumberFromUSFM,
  Nc as getStatusForItem,
  qp as getToolbarOSReservedSpaceClassName,
  Tp as inventoryCountColumn,
  Ep as inventoryItemColumn,
  Rp as inventoryStatusColumn,
  zw as selectTriggerVariants,
  fu as sonner,
  cu as useEvent,
  du as useEventAsync,
  Ew as useListbox,
  Pd as usePromise,
  ip as useRecentSearches,
  In as useSidebar,
  pu as useStylesheet
=======
  Vw as Alert,
  zw as AlertDescription,
  jw as AlertTitle,
  Fa as Avatar,
  Ba as AvatarFallback,
  Uc as AvatarImage,
  jp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  zp as BOOK_SELECTOR_STRING_KEYS,
  Ie as Badge,
  Vp as BookChapterControl,
  lr as BookSelectionMode,
  Fp as BookSelector,
=======
  Bw as Alert,
  Gw as AlertDescription,
  Kw as AlertTitle,
  Ba as Avatar,
  Ka as AvatarFallback,
  Hc as AvatarImage,
  Kp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Gp as BOOK_SELECTOR_STRING_KEYS,
  Pe as Badge,
  Bp as BookChapterControl,
  cr as BookSelectionMode,
  Up as BookSelector,
<<<<<<< HEAD
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
  F as Button,
=======
  z as Button,
>>>>>>> 5dcbb312b7 (Address all PR comments)
  qp as COMMENT_EDITOR_STRING_KEYS,
  Yp as COMMENT_LIST_STRING_KEYS,
  za as Card,
  Fa as CardContent,
  Gc as CardDescription,
  Uc as CardFooter,
  Bc as CardHeader,
  Kc as CardTitle,
  El as ChapterRangeSelector,
  Gr as Checkbox,
  Ou as Checklist,
  lr as ComboBox,
  Wt as Command,
  Ge as CommandEmpty,
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
  sd as DataTable,
  tp as Drawer,
  Bu as DrawerClose,
  np as DrawerContent,
  sp as DrawerDescription,
  op as DrawerFooter,
  rp as DrawerHeader,
  Cs as DrawerOverlay,
  ep as DrawerPortal,
  ap as DrawerTitle,
  Fu as DrawerTrigger,
  me as DropdownMenu,
  Yt as DropdownMenuCheckboxItem,
  oe as DropdownMenuContent,
  Ga as DropdownMenuGroup,
  nn as DropdownMenuItem,
  cd as DropdownMenuItemType,
  cn as DropdownMenuLabel,
  Ua as DropdownMenuPortal,
  qa as DropdownMenuRadioGroup,
  Br as DropdownMenuRadioItem,
  Re as DropdownMenuSeparator,
  Ya as DropdownMenuShortcut,
  Ha as DropdownMenuSub,
  Fr as DropdownMenuSubContent,
  zr as DropdownMenuSubTrigger,
  Te as DropdownMenuTrigger,
  id as ERROR_DUMP_STRING_KEYS,
  Jp as ERROR_POPOVER_STRING_KEYS,
  pd as EditorKeyboardShortcuts,
  ld as ErrorDump,
  Zp as ErrorPopover,
  ou as FOOTNOTE_EDITOR_STRING_KEYS,
  nu as Filter,
  Qp as FilterDropdown,
  eu as Footer,
  ru as FootnoteEditor,
  Td as FootnoteItem,
  au as FootnoteList,
  pu as INVENTORY_STRING_KEYS,
  Ue as Input,
  uu as Inventory,
  ft as Label,
  bd as MARKER_MENU_STRING_KEYS,
  Wp as MarkdownRenderer,
  xd as MarkerMenu,
  tu as MoreInfo,
  wd as MultiSelectComboBox,
  Ru as NavigationContentSearch,
  gu as OverlayCommandPalette,
  mu as OverlayContextMenu,
  fu as OverlayModalDialog,
  hu as OverlayPopover,
  Kt as Popover,
  Sr as PopoverAnchor,
  Mt as PopoverContent,
  ue as PopoverTrigger,
  ip as Progress,
  Dr as RadioGroup,
  kn as RadioGroupItem,
  xl as RecentSearches,
  Uu as ResizableHandle,
  Gu as ResizablePanel,
  Ku as ResizablePanelGroup,
  Iu as ResultsCard,
  xu as SCOPE_SELECTOR_STRING_KEYS,
  yu as ScopeSelector,
  vu as ScriptureResultsViewer,
  Nu as ScrollGroupSelector,
  Ur as SearchBar,
  $e as Select,
  Ce as SelectContent,
  Xc as SelectGroup,
  Tt as SelectItem,
  Jc as SelectLabel,
  Wa as SelectScrollDownButton,
  Xa as SelectScrollUpButton,
  Zc as SelectSeparator,
  _e as SelectTrigger,
  Ve as SelectValue,
  Le as Separator,
  ku as SettingsList,
  Cu as SettingsListHeader,
  _u as SettingsListItem,
  yw as SettingsSidebar,
  bu as SettingsSidebarContentSearch,
  ns as Sidebar,
  os as SidebarContent,
  ww as SidebarFooter,
  mr as SidebarGroup,
  uw as SidebarGroupAction,
  hr as SidebarGroupContent,
  fr as SidebarGroupLabel,
  dw as SidebarHeader,
  cw as SidebarInput,
  rs as SidebarInset,
  as as SidebarMenu,
  fw as SidebarMenuAction,
  hw as SidebarMenuBadge,
  is as SidebarMenuButton,
  ss as SidebarMenuItem,
  gw as SidebarMenuSkeleton,
  bw as SidebarMenuSub,
  xw as SidebarMenuSubButton,
  vw as SidebarMenuSubItem,
  es as SidebarProvider,
  lw as SidebarRail,
  pw as SidebarSeparator,
  iw as SidebarTrigger,
  ur as Skeleton,
  lp as Slider,
  Hu as Sonner,
  zw as Spinner,
  cp as Switch,
  gr as TabDropdownMenu,
  Tu as TabFloatingMenu,
  Eu as TabToolbar,
  In as Table,
  Pn as TableBody,
  ad as TableCaption,
  Ne as TableCell,
  ed as TableFooter,
  on as TableHead,
  An as TableHeader,
  ee as TableRow,
  qu as Tabs,
  pp as TabsContent,
  dp as TabsList,
  wp as TabsTrigger,
  Au as TextField,
  up as Textarea,
  Lr as ToggleGroup,
  Qe as ToggleGroupItem,
  Du as Toolbar,
  Lt as Tooltip,
  St as TooltipContent,
  Rt as TooltipProvider,
<<<<<<< HEAD
  Lt as TooltipTrigger,
  Eu as UiLanguageSelector,
  ps as VerticalTabs,
  ms as VerticalTabsContent,
  us as VerticalTabsList,
  Tw as VerticalTabsTrigger,
  sn as Z_INDEX_ABOVE_DOCK,
  da as Z_INDEX_FOOTNOTE_EDITOR,
  bl as Z_INDEX_MODAL,
  gl as Z_INDEX_MODAL_BACKDROP,
  Rr as Z_INDEX_OVERLAY,
  zc as badgeVariants,
  ca as buttonVariants,
  m as cn,
  iu as getBookIdFromUSFM,
  Pn as getInventoryHeader,
  au as getLinesFromUSFM,
  su as getNumberFromUSFM,
  Md as getStatusForItem,
  _u as getToolbarOSReservedSpaceClassName,
  ru as inventoryCountColumn,
  nu as inventoryItemColumn,
  ou as inventoryStatusColumn,
  Xc as selectTriggerVariants,
  Yu as sonner,
  Ku as useEvent,
  Gu as useEventAsync,
  jc as useListbox,
  wp as usePromise,
  $p as useRecentSearches,
  Ln as useSidebar,
  Uu as useStylesheet
>>>>>>> 3bbb61865c (Add overlay service for context menus, modal dialogs, and popovers)
=======
  $t as TooltipTrigger,
  Mu as UiLanguageSelector,
  us as VerticalTabs,
  fs as VerticalTabsContent,
  ms as VerticalTabsList,
  Mw as VerticalTabsTrigger,
  ln as Z_INDEX_ABOVE_DOCK,
  pa as Z_INDEX_FOOTNOTE_EDITOR,
  vl as Z_INDEX_MODAL,
  bl as Z_INDEX_MODAL_BACKDROP,
  Ie as Z_INDEX_OVERLAY,
  Fc as badgeVariants,
  wa as buttonVariants,
  f as cn,
  wu as getBookIdFromUSFM,
  Ln as getInventoryHeader,
  cu as getLinesFromUSFM,
  du as getNumberFromUSFM,
  Od as getStatusForItem,
  Su as getToolbarOSReservedSpaceClassName,
  iu as inventoryCountColumn,
  su as inventoryItemColumn,
  lu as inventoryStatusColumn,
  Wc as selectTriggerVariants,
  Qu as sonner,
  Yu as useEvent,
  Xu as useEventAsync,
  zc as useListbox,
  fp as usePromise,
  Fp as useRecentSearches,
  $n as useSidebar,
  Wu as useStylesheet
>>>>>>> c0a8b83d46 (Add command palette overlay type for searchable item picker)
};
//# sourceMappingURL=index.js.map
