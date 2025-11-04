import { jsx as r, jsxs as l, Fragment as _t } from "react/jsx-runtime";
import m, { forwardRef as ut, createElement as ot, useRef as nt, useMemo as J, useState as A, useCallback as X, useLayoutEffect as Vn, createContext as Qr, useContext as to, useEffect as Vt, Fragment as Gn } from "react";
import { Command as lt } from "cmdk";
import { clsx as eo } from "clsx";
import { extendTailwindMerge as no } from "tailwind-merge";
import * as xt from "@radix-ui/react-dialog";
import { includes as be, Section as D, getChaptersForBook as ro, formatScrRef as Yt, getSectionForBook as le, NumberFormat as oo, formatBytes as ao, getCurrentLocale as so, getFormatCallerFunction as io, deepEqual as nn, isString as De, compareScrRefs as Be, scrRefToBBBCCCVVV as Oe, getLocalizeKeyForScrollGroupId as z, formatReplacementString as wo } from "platform-bible-utils";
import { Check as rn, Clock as Mn, ChevronsLeft as In, ChevronsRight as Dn, ChevronLeft as Ge, ChevronRight as Xe, ArrowLeft as lo, ArrowRight as co, ChevronsUpDown as on, FilterIcon as po, ArrowLeftIcon as uo, ChevronLeftIcon as mo, ChevronRightIcon as ho, ArrowRightIcon as fo, Copy as go, Filter as bo, ChevronDown as Xn, User as vo, Link as xo, CircleHelp as yo, Star as No, X as Fn, AlertCircle as Fe, CircleCheckIcon as ko, CircleXIcon as Co, CircleHelpIcon as _o, ArrowUpIcon as Ro, ArrowDownIcon as So, ArrowUpDownIcon as To, ScrollText as Eo, Search as Vo, MenuIcon as Mo, Menu as Io, EllipsisVertical as Do, MoreHorizontal as Oo, LoaderCircle as Ao } from "lucide-react";
import { Slot as Wt } from "@radix-ui/react-slot";
import { cva as Mt } from "class-variance-authority";
import * as Ut from "@radix-ui/react-popover";
import * as Hn from "@radix-ui/react-label";
import * as ce from "@radix-ui/react-radio-group";
import { useReactTable as Yn, getFilteredRowModel as Po, getSortedRowModel as Kn, getPaginationRowModel as Lo, getCoreRowModel as Un, flexRender as de, getGroupedRowModel as $o, getExpandedRowModel as zo } from "@tanstack/react-table";
import * as Y from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as jo } from "@radix-ui/react-dropdown-menu";
import * as Z from "@radix-ui/react-select";
import Bo from "markdown-to-jsx";
import * as He from "@radix-ui/react-checkbox";
import * as Ne from "@radix-ui/react-toggle-group";
import * as qn from "@radix-ui/react-toggle";
import * as Jn from "@radix-ui/react-separator";
import * as qt from "@radix-ui/react-tooltip";
import * as dt from "@radix-ui/react-tabs";
import * as K from "@radix-ui/react-menubar";
import { useHotkeys as Go } from "react-hotkeys-hook";
import * as Qt from "@radix-ui/react-avatar";
import * as U from "@radix-ui/react-context-menu";
import { Drawer as mt } from "vaul";
import * as Ye from "@radix-ui/react-progress";
import * as an from "react-resizable-panels";
import { useTheme as Xo } from "next-themes";
import { Toaster as Fo } from "sonner";
import { toast as tl } from "sonner";
import * as we from "@radix-ui/react-slider";
import * as Ke from "@radix-ui/react-switch";
const Ho = no({ prefix: "tw-" });
function d(...t) {
  return Ho(eo(t));
}
function St(t, e) {
  if (t == null) return {};
  var n = {}, o = Object.keys(t), a, s;
  for (s = 0; s < o.length; s++)
    a = o[s], !(e.indexOf(a) >= 0) && (n[a] = t[a]);
  return n;
}
var Yo = ["color"], me = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, Yo);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Ko = ["color"], Zn = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, Ko);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Uo = ["color"], sn = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, Uo);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), qo = ["color"], Jo = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, qo);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Zo = ["color"], Wo = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, Zo);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Qo = ["color"], ke = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, Qo);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z",
    fill: o
  }));
}), ta = ["color"], ea = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, ta);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), na = ["color"], ra = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, na);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), oa = ["color"], aa = /* @__PURE__ */ ut(function(t, e) {
  var n = t.color, o = n === void 0 ? "currentColor" : n, a = St(t, oa);
  return ot("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, a, {
    ref: e
  }), ot("path", {
    d: "M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z",
    fill: o,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
const sa = "layoutDirection";
function at() {
  const t = localStorage.getItem(sa);
  return t === "rtl" ? t : "ltr";
}
const ia = xt.Portal, Wn = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Overlay,
  {
    ref: n,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Wn.displayName = xt.Overlay.displayName;
const wa = m.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = at();
  return /* @__PURE__ */ l(ia, { children: [
    /* @__PURE__ */ r(Wn, {}),
    /* @__PURE__ */ l(
      xt.Content,
      {
        ref: o,
        className: d(
          "pr-twp",
          // CUSTOM
          "tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ l(
            xt.Close,
            {
              className: d(
                // CUSTOM: removed tw-right-4
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                // CUSTOM: Support RTL
                { "tw-left-4": a === "rtl" }
                // CUSTOM: Support RTL
              ),
              children: [
                /* @__PURE__ */ r(Wo, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
wa.displayName = xt.Content.displayName;
const la = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
la.displayName = xt.Title.displayName;
const da = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
da.displayName = xt.Description.displayName;
const te = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt,
  {
    ref: n,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
te.displayName = lt.displayName;
const he = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return (
    // CUSTOM: Suppress warning produced by imported shadcn code
    // eslint-disable-next-line react/no-unknown-property
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", "cmdk-input-wrapper": "", dir: o, children: [
      /* @__PURE__ */ r(ra, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
      /* @__PURE__ */ r(
        lt.Input,
        {
          ref: n,
          className: d(
            "tw-flex tw-h-10 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
            t
          ),
          ...e
        }
      )
    ] })
  );
});
he.displayName = lt.Input.displayName;
const ee = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.List,
  {
    ref: n,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ee.displayName = lt.List.displayName;
const Ce = m.forwardRef((t, e) => /* @__PURE__ */ r(lt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ce.displayName = lt.Empty.displayName;
const zt = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Group,
  {
    ref: n,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
zt.displayName = lt.Group.displayName;
const Qn = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Qn.displayName = lt.Separator.displayName;
const Xt = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Item,
  {
    ref: n,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
      t
    ),
    ...e
  }
));
Xt.displayName = lt.Item.displayName;
var ca = Object.defineProperty, pa = (t, e, n) => e in t ? ca(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, M = (t, e, n) => pa(t, typeof e != "symbol" ? e + "" : e, n);
const jt = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  // 10
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  // 20
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  // 30
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  // 40
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  // 50
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  // 60
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  // 70
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  // 80
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "JSA",
  // actual variant text for JOS, now in LXA text
  "JDB",
  // actual variant text for JDG, now in LXA text
  "TBS",
  // actual variant text for TOB, now in LXA text
  "SST",
  // actual variant text for SUS, now in LXA text // 90
  "DNT",
  // actual variant text for DAN, now in LXA text
  "BLT",
  // actual variant text for BEL, now in LXA text
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  // 100
  "BAK",
  "OTH",
  "3ES",
  // Used previously but really should be 2ES
  "EZA",
  // Used to be called 4ES, but not actually in any known project
  "5EZ",
  // Used to be called 5ES, but not actually in any known project
  "6EZ",
  // Used to be called 6ES, but not actually in any known project
  "INT",
  "CNC",
  "GLO",
  "TDX",
  // 110
  "NDX",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  // 120
  "REP",
  "4BA",
  "LAO"
], wn = [
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX"
], tr = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther (Hebrew)",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel (Hebrew)",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
  "Tobit",
  "Judith",
  "Esther Greek",
  "Wisdom of Solomon",
  "Sirach (Ecclesiasticus)",
  "Baruch",
  "Letter of Jeremiah",
  "Song of 3 Young Men",
  "Susanna",
  "Bel and the Dragon",
  "1 Maccabees",
  "2 Maccabees",
  "3 Maccabees",
  "4 Maccabees",
  "1 Esdras (Greek)",
  "2 Esdras (Latin)",
  "Prayer of Manasseh",
  "Psalm 151",
  "Odes",
  "Psalms of Solomon",
  // WARNING, if you change the spelling of the *obsolete* tag be sure to update
  // IsObsolete routine
  "Joshua A. *obsolete*",
  "Judges B. *obsolete*",
  "Tobit S. *obsolete*",
  "Susanna Th. *obsolete*",
  "Daniel Th. *obsolete*",
  "Bel Th. *obsolete*",
  "Extra A",
  "Extra B",
  "Extra C",
  "Extra D",
  "Extra E",
  "Extra F",
  "Extra G",
  "Front Matter",
  "Back Matter",
  "Other Matter",
  "3 Ezra *obsolete*",
  "Apocalypse of Ezra",
  "5 Ezra (Latin Prologue)",
  "6 Ezra (Latin Epilogue)",
  "Introduction",
  "Concordance ",
  "Glossary ",
  "Topical Index",
  "Names Index",
  "Daniel Greek",
  "Psalms 152-155",
  "2 Baruch (Apocalypse)",
  "Letter of Baruch",
  "Jubilees",
  "Enoch",
  "1 Meqabyan",
  "2 Meqabyan",
  "3 Meqabyan",
  "Reproof (Proverbs 25-31)",
  "4 Baruch (Rest of Baruch)",
  "Laodiceans"
], On = Na();
function ne(t, e = !0) {
  return e && (t = t.toUpperCase()), t in On ? On[t] : 0;
}
function ln(t) {
  return ne(t) > 0;
}
function ua(t) {
  const e = typeof t == "string" ? ne(t) : t;
  return e >= 40 && e <= 66;
}
function ma(t) {
  return (typeof t == "string" ? ne(t) : t) <= 39;
}
function er(t) {
  return t <= 66;
}
function ha(t) {
  const e = typeof t == "string" ? ne(t) : t;
  return or(e) && !er(e);
}
function* fa() {
  for (let t = 1; t <= jt.length; t++) yield t;
}
const ga = 1, nr = jt.length;
function ba() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function dn(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= jt.length ? e : jt[n];
}
function rr(t) {
  return t <= 0 || t > nr ? "******" : tr[t - 1];
}
function va(t) {
  return rr(ne(t));
}
function or(t) {
  const e = typeof t == "number" ? dn(t) : t;
  return ln(e) && !wn.includes(e);
}
function xa(t) {
  const e = typeof t == "number" ? dn(t) : t;
  return ln(e) && wn.includes(e);
}
function ya(t) {
  return tr[t - 1].includes("*obsolete*");
}
function Na() {
  const t = {};
  for (let e = 0; e < jt.length; e++)
    t[jt[e]] = e + 1;
  return t;
}
const j = {
  allBookIds: jt,
  nonCanonicalIds: wn,
  bookIdToNumber: ne,
  isBookIdValid: ln,
  isBookNT: ua,
  isBookOT: ma,
  isBookOTNT: er,
  isBookDC: ha,
  allBookNumbers: fa,
  firstBook: ga,
  lastBook: nr,
  extraBooks: ba,
  bookNumberToId: dn,
  bookNumberToEnglishName: rr,
  bookIdToEnglishName: va,
  isCanonical: or,
  isExtraMaterial: xa,
  isObsolete: ya
};
var bt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(bt || {});
const ct = class {
  // private versInfo: Versification;
  constructor(e) {
    if (M(this, "name"), M(this, "fullPath"), M(this, "isPresent"), M(this, "hasVerseSegments"), M(this, "isCustomized"), M(this, "baseVersification"), M(this, "scriptureBooks"), M(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = bt[e]) : (this._type = e, this.name = bt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
M(ct, "Original", new ct(bt.Original)), M(ct, "Septuagint", new ct(bt.Septuagint)), M(ct, "Vulgate", new ct(bt.Vulgate)), M(ct, "English", new ct(bt.English)), M(ct, "RussianProtestant", new ct(bt.RussianProtestant)), M(ct, "RussianOrthodox", new ct(bt.RussianOrthodox));
let At = ct;
function An(t, e) {
  const n = e[0];
  for (let o = 1; o < e.length; o++)
    t = t.split(e[o]).join(n);
  return t.split(n);
}
var ar = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(ar || {});
const wt = class O {
  constructor(e, n, o, a) {
    if (M(this, "firstChapter"), M(this, "lastChapter"), M(this, "lastVerse"), M(this, "hasSegmentsDefined"), M(this, "text"), M(this, "BBBCCCVVVS"), M(this, "longHashCode"), M(this, "versification"), M(this, "rtlMark", "‏"), M(this, "_bookNum", 0), M(this, "_chapterNum", 0), M(this, "_verseNum", 0), M(this, "_verse"), o == null && a == null)
      if (e != null && typeof e == "string") {
        const s = e, i = n != null && n instanceof At ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof At ? n : void 0;
        this.setEmpty(s), this._verseNum = e % O.chapterDigitShifter, this._chapterNum = Math.floor(
          e % O.bookDigitShifter / O.chapterDigitShifter
        ), this._bookNum = Math.floor(e / O.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof O) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof At ? e : O.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && o != null)
      if (typeof e == "string" && typeof n == "string" && typeof o == "string")
        this.setEmpty(a), this.updateInternal(e, n, o);
      else if (typeof e == "number" && typeof n == "number" && typeof o == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = o, this.versification = a ?? O.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let n;
    try {
      return n = new O(e), { success: !0, verseRef: n };
    } catch (o) {
      if (o instanceof se)
        return n = new O(), { success: !1, verseRef: n };
      throw o;
    }
  }
  /**
   * Gets the reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   * @param bookNum - Book number (this is 1-based, not an index).
   * @param chapterNum - Chapter number.
   * @param verseNum - Verse number.
   * @returns The reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   */
  static getBBBCCCVVV(e, n, o) {
    return e % O.bcvMaxValue * O.bookDigitShifter + (n >= 0 ? n % O.bcvMaxValue * O.chapterDigitShifter : 0) + (o >= 0 ? o % O.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: o, verseNum: a, verse: s, versificationStr: i } = e, w = s || a.toString();
    let u;
    return i && (u = new At(i)), n ? new O(n, o.toString(), w, u) : new O();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let o;
    for (let a = 0; a < e.length; a++) {
      if (o = e[a], o < "0" || o > "9")
        return a === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +o - 0, n > O.bcvMaxValue)
        return n = -1, { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return this.bookNum === 0 && this.chapterNum === 0 && this.verseNum === 0 && this.versification == null;
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return this._verse != null && (this._verse.includes(O.verseRangeSeparator) || this._verse.includes(O.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return j.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = j.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: o } = O.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = o, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = O.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > j.lastBook)
      throw new se(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = e;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new At(e) : void 0;
  }
  /**
   * Determines if the reference is valid.
   */
  get valid() {
    return this.validStatus === 0;
  }
  /**
   * Get the valid status for this reference.
   */
  get validStatus() {
    return this.validateVerse(O.verseRangeSeparators, O.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  /**
   * Gets whether the verse is defined as an excluded verse in the versification.
   * Does not handle verse ranges.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isExcluded() {
    return !1;
  }
  /**
   * Parses the reference in the specified string.
   * Optionally versification can follow reference as in GEN 3:11/4
   * Throw an exception if
   * - invalid book name
   * - chapter number is missing or not a number
   * - verse number is missing or does not start with a number
   * - versification is invalid
   * @param verseStr - string to parse e.g. 'MAT 3:11'
   */
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const s = e.split("/");
      if (e = s[0], s.length > 1)
        try {
          const i = +s[1].trim();
          this.versification = new At(bt[i]);
        } catch {
          throw new se("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new se("Invalid reference : " + e);
    const o = n[1].split(":"), a = +o[0];
    if (o.length !== 2 || j.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !O.isVerseParseable(o[1]))
      throw new se("Invalid reference : " + e);
    this.updateInternal(n[0], o[0], o[1]);
  }
  /**
   * Simplifies this verse ref so that it has no bridging of verses or
   * verse segments like `'1a'`.
   */
  simplify() {
    this._verse = void 0;
  }
  /**
   * Makes a clone of the reference.
   *
   * @returns The cloned VerseRef.
   */
  clone() {
    return new O(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof O ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
  }
  /**
   * Enumerate all individual verses contained in a VerseRef.
   * Verse ranges are indicated by "-" and consecutive verses by ","s.
   * Examples:
   * GEN 1:2 returns GEN 1:2
   * GEN 1:1a-3b,5 returns GEN 1:1a, GEN 1:2, GEN 1:3b, GEN 1:5
   * GEN 1:2a-2c returns //! ??????
   *
   * @param specifiedVersesOnly - if set to <c>true</c> return only verses that are
   * explicitly specified only, not verses within a range. Defaults to `false`.
   * @param verseRangeSeparators - Verse range separators.
   * Defaults to `VerseRef.verseRangeSeparators`.
   * @param verseSequenceSeparators - Verse sequence separators.
   * Defaults to `VerseRef.verseSequenceIndicators`.
   * @returns An array of all single verse references in this VerseRef.
   */
  allVerses(e = !1, n = O.verseRangeSeparators, o = O.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = An(this._verse, o);
    for (const i of s.map((w) => An(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const u = w.verseNum;
      if (a.push(w), i.length > 1) {
        const c = this.clone();
        if (c.verse = i[1], !e)
          for (let p = u + 1; p < c.verseNum; p++) {
            const f = new O(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || a.push(f);
          }
        a.push(c);
      }
    }
    return a;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let o = 0;
    for (const a of this.allVerses(!0, e, n)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const i = a.BBBCCCVVV;
      if (o > i)
        return 3;
      if (o === i)
        return 4;
      o = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > j.lastBook ? 2 : (j.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = O.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, o) {
    this.bookNum = j.bookIdToNumber(e), this.chapter = n, this.verse = o;
  }
};
M(wt, "defaultVersification", At.English), M(wt, "verseRangeSeparator", "-"), M(wt, "verseSequenceIndicator", ","), M(wt, "verseRangeSeparators", [wt.verseRangeSeparator]), M(wt, "verseSequenceIndicators", [wt.verseSequenceIndicator]), M(wt, "chapterDigitShifter", 1e3), M(wt, "bookDigitShifter", wt.chapterDigitShifter * wt.chapterDigitShifter), M(wt, "bcvMaxValue", wt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
M(wt, "ValidStatusType", ar);
class se extends Error {
}
const sr = (t, e, n, o, a) => {
  switch (t) {
    case D.OT:
      return e ?? "Old Testament";
    case D.NT:
      return n ?? "New Testament";
    case D.DC:
      return o ?? "Deuterocanon";
    case D.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ka = (t, e, n, o, a) => {
  switch (t) {
    case D.OT:
      return e ?? "OT";
    case D.NT:
      return n ?? "NT";
    case D.DC:
      return o ?? "DC";
    case D.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Kt(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? j.bookIdToEnglishName(t);
}
function cn(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ir = j.allBookIds.filter(
  (t) => !j.isObsolete(j.bookIdToNumber(t))
), Lt = Object.fromEntries(
  ir.map((t) => [t, j.bookIdToEnglishName(t)])
);
function pn(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = j.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(be(a.toLowerCase(), o) || be(t.toLowerCase(), o) || (s ? be(s.localizedName.toLowerCase(), o) || be(s.localizedId.toLowerCase(), o) : !1));
}
const wr = ut(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: w,
    commandValue: u
  }, c) => {
    const p = nt(!1), f = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (y) => {
      p.current = !0, o ? o(y) : n == null || n(t);
    }, g = J(
      () => Kt(t, w),
      [t, w]
    ), b = J(
      () => cn(t, w),
      [t, w]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: d(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === D.OT,
            "tw-border-s-purple-200": a === D.NT,
            "tw-border-s-indigo-200": a === D.DC,
            "tw-border-s-amber-200": a === D.Extra
          }
        ),
        children: /* @__PURE__ */ l(
          Xt,
          {
            ref: c,
            value: u || `${t} ${j.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${j.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                rn,
                {
                  className: d(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: g }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: b })
            ]
          }
        )
      }
    );
  }
), Ca = Mt(
  d(
    "pr-twp",
    // CUSTOM
    "tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0"
  ),
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground tw-shadow-sm hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background tw-shadow-sm hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground tw-shadow-sm hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline"
      },
      size: {
        default: "tw-h-9 tw-px-4 tw-py-2",
        sm: "tw-h-8 tw-rounded-md tw-px-3 tw-text-xs",
        lg: "tw-h-10 tw-rounded-md tw-px-8",
        icon: "tw-h-9 tw-w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), I = m.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Wt : "button", { className: d(Ca({ variant: e, size: n, className: t })), ref: s, ...a })
);
I.displayName = "Button";
const re = Ut.Root, oe = Ut.Trigger, Zi = Ut.Anchor, Ft = m.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const s = at();
  return /* @__PURE__ */ r(Ut.Portal, { children: /* @__PURE__ */ r(
    Ut.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-z-[250]",
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-w-72 tw-origin-[--radix-popover-content-transform-origin] tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      dir: s
    }
  ) });
});
Ft.displayName = Ut.Content.displayName;
function Ue(t, e, n) {
  return `${t} ${Lt[t]}${e ? ` ${cn(t, e)} ${Kt(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function _a({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i
}) {
  const [w, u] = A(!1);
  if (t.length === 0)
    return;
  const c = (p) => {
    e(p), u(!1);
  };
  return /* @__PURE__ */ l(re, { open: w, onOpenChange: u, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ r(
      I,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(Mn, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Ft, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(ee, { children: /* @__PURE__ */ r(zt, { heading: s, children: t.map((p) => /* @__PURE__ */ l(
      Xt,
      {
        onSelect: () => c(p),
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(Mn, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function Wi(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (w) => !n(w, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Ae = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ra = [
  Ae.BOOK_ONLY,
  Ae.BOOK_CHAPTER,
  Ae.BOOK_CHAPTER_VERSE
];
function Pn(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function vt(t) {
  return ro(j.bookIdToNumber(t));
}
function Sa(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Ra.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [w, u = void 0, c = void 0] = i.slice(1);
        let p;
        const f = e.filter((h) => pn(h, w, n));
        if (f.length === 1 && ([p] = f), !p && u) {
          if (j.isBookIdValid(w)) {
            const h = w.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, g]) => g.localizedId.toLowerCase() === w.toLowerCase()
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && u) {
          const g = ((b) => Object.keys(Lt).find(
            (y) => Lt[y].toLowerCase() === b.toLowerCase()
          ))(w);
          if (g && e.includes(g) && (p = g), !p && n) {
            const b = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === w.toLowerCase()
            );
            b && e.includes(b[0]) && ([p] = b);
          }
        }
        if (p) {
          let h = u ? parseInt(u, 10) : void 0;
          h && h > vt(p) && (h = Math.max(vt(p), 1));
          const g = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
            verseNum: g
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function Ta(t, e, n, o) {
  const a = X(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const u = e.indexOf(t.book);
      if (u > 0) {
        const c = e[u - 1], p = Math.max(vt(c), 1);
        o({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = X(() => {
    const u = vt(t.book);
    if (t.chapterNum < u)
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
  }, [t, e, o]), i = X(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), w = X(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return J(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? In : Dn
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Ge : Xe
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Xe : Ge
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === vt(t.book) || vt(t.book) === -1) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Dn : In
    }
  ], [
    t,
    e,
    n,
    a,
    i,
    w,
    s
  ]);
}
function Ln({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r("div", { className: d("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: vt(t) }, (i, w) => w + 1).map((i) => /* @__PURE__ */ r(
      Xt,
      {
        value: `${t} ${Lt[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: d(
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
function Qi({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: w,
  id: u
}) {
  const c = at(), [p, f] = A(!1), [h, g] = A(""), [b, y] = A(""), [N, V] = A("books"), [x, _] = A(void 0), [G, L] = A(!1), P = nt(void 0), F = nt(void 0), H = nt(void 0), R = nt(void 0), C = nt({}), B = X(
    (v) => {
      e(v), w && w(v);
    },
    [e, w]
  ), E = J(() => o ? o() : ir, [o]), W = J(() => ({
    [D.OT]: E.filter(($) => j.isBookOT($)),
    [D.NT]: E.filter(($) => j.isBookNT($)),
    [D.DC]: E.filter(($) => j.isBookDC($)),
    [D.Extra]: E.filter(($) => j.extraBooks().includes($))
  }), [E]), S = J(() => Object.values(W).flat(), [W]), q = J(() => {
    if (!b.trim()) return W;
    const v = {
      [D.OT]: [],
      [D.NT]: [],
      [D.DC]: [],
      [D.Extra]: []
    };
    return [D.OT, D.NT, D.DC, D.Extra].forEach((et) => {
      v[et] = W[et].filter((st) => pn(st, b, a));
    }), v;
  }, [W, b, a]), k = J(
    () => Sa(b, S, a),
    [b, S, a]
  ), Q = X(() => {
    k && (B({
      book: k.book,
      chapterNum: k.chapterNum ?? 1,
      verseNum: k.verseNum ?? 1
    }), f(!1), y(""), g(""));
  }, [B, k]), Nt = X(
    (v) => {
      if (vt(v) <= 1) {
        B({
          book: v,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), y("");
        return;
      }
      _(v), V("chapters");
    },
    [B]
  ), Ht = X(
    (v) => {
      const $ = N === "chapters" ? x : k == null ? void 0 : k.book;
      $ && (B({
        book: $,
        chapterNum: v,
        verseNum: 1
      }), f(!1), V("books"), _(void 0), y(""));
    },
    [B, N, x, k]
  ), It = X(
    (v) => {
      B(v), f(!1), y("");
    },
    [B]
  ), T = Ta(t, S, c, e), tt = X(() => {
    V("books"), _(void 0), setTimeout(() => {
      F.current && F.current.focus();
    }, 0);
  }, []), ht = X(
    (v) => {
      if (!v && N === "chapters") {
        tt();
        return;
      }
      f(v), v && (V("books"), _(void 0), y(""));
    },
    [N, tt]
  ), { otLong: ft, ntLong: kt, dcLong: Rn, extraLong: Sn } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Kr = X(
    (v) => sr(v, ft, kt, Rn, Sn),
    [ft, kt, Rn, Sn]
  ), Ur = X(
    (v) => k ? !!k.chapterNum && !v.toString().includes(k.chapterNum.toString()) : !1,
    [k]
  ), qr = J(
    () => Yt(
      t,
      a ? Kt(t.book, a) : "English"
    ),
    [t, a]
  ), Tn = X((v) => ($) => {
    C.current[v] = $;
  }, []), Jr = X((v) => {
    (v.key === "Home" || v.key === "End") && v.stopPropagation();
  }, []), Zr = X(
    (v) => {
      if (v.ctrlKey) return;
      const { isLetter: $, isDigit: et } = Pn(v.key);
      if (N === "chapters") {
        if (v.key === "Backspace") {
          v.preventDefault(), v.stopPropagation(), tt();
          return;
        }
        if ($ || et) {
          if (v.preventDefault(), v.stopPropagation(), V("books"), _(void 0), et && x) {
            const st = Lt[x];
            y(`${st} ${v.key}`);
          } else
            y(v.key);
          setTimeout(() => {
            F.current && F.current.focus();
          }, 0);
          return;
        }
      }
      if ((N === "chapters" || N === "books" && k) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(v.key)) {
        const st = N === "chapters" ? x : k == null ? void 0 : k.book;
        if (!st) return;
        const it = (() => {
          if (!h) return 1;
          const ae = h.match(/(\d+)$/);
          return ae ? parseInt(ae[1], 10) : 0;
        })(), Dt = vt(st);
        if (!Dt) return;
        let Ct = it;
        const En = 6;
        switch (v.key) {
          case "ArrowLeft":
            it !== 0 && (Ct = it > 1 ? it - 1 : Dt);
            break;
          case "ArrowRight":
            it !== 0 && (Ct = it < Dt ? it + 1 : 1);
            break;
          case "ArrowUp":
            Ct = it === 0 ? Dt : Math.max(1, it - En);
            break;
          case "ArrowDown":
            Ct = it === 0 ? 1 : Math.min(Dt, it + En);
            break;
          default:
            return;
        }
        Ct !== it && (v.preventDefault(), v.stopPropagation(), g(Ue(st, a, Ct)), setTimeout(() => {
          const ae = C.current[Ct];
          ae && ae.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      N,
      k,
      tt,
      x,
      h,
      a
    ]
  ), Wr = X((v) => {
    if (v.shiftKey || v.key === "Tab" || v.key === " ") return;
    const { isLetter: $, isDigit: et } = Pn(v.key);
    ($ || et) && (v.preventDefault(), y((st) => st + v.key), F.current.focus(), L(!1));
  }, []);
  return Vn(() => {
    const v = setTimeout(() => {
      if (p && N === "books" && H.current && R.current) {
        const $ = H.current, et = R.current, st = et.offsetTop, it = $.clientHeight, Dt = et.clientHeight, Ct = st - it / 2 + Dt / 2;
        $.scrollTo({
          top: Math.max(0, Ct),
          behavior: "smooth"
        }), g(Ue(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(v);
    };
  }, [p, N, b, k, t.book]), Vn(() => {
    if (N === "chapters" && x) {
      const v = x === t.book;
      setTimeout(() => {
        if (H.current)
          if (v) {
            const $ = C.current[t.chapterNum];
            $ && $.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            H.current.scrollTo({ top: 0 });
        P.current && P.current.focus();
      }, 0);
    }
  }, [N, x, k, t.book, t.chapterNum]), /* @__PURE__ */ l(re, { open: p, onOpenChange: ht, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ r(
      I,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: d(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: qr })
      }
    ) }),
    /* @__PURE__ */ r(Ft, { id: u, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ l(
      te,
      {
        ref: P,
        onKeyDown: Zr,
        loop: !0,
        value: h,
        onValueChange: g,
        shouldFilter: !1,
        children: [
          N === "books" ? /* @__PURE__ */ l("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ l("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                he,
                {
                  ref: F,
                  value: b,
                  onValueChange: y,
                  onKeyDown: Jr,
                  onFocus: () => L(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                _a,
                {
                  recentSearches: i,
                  onSearchItemSelect: It,
                  renderItem: (v) => Yt(v, "English"),
                  getItemKey: (v) => `${v.book}-${v.chapterNum}-${v.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: T.map(({ onClick: v, disabled: $, title: et, icon: st }) => /* @__PURE__ */ r(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  L(!0), v();
                },
                disabled: $,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: et,
                onKeyDown: Wr,
                children: /* @__PURE__ */ r(st, {})
              },
              et
            )) })
          ] }) : /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: tt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(lo, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(co, { className: "tw-h-4 tw-w-4" })
              }
            ),
            x && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Kt(x, a) })
          ] }),
          !G && /* @__PURE__ */ l(ee, { ref: H, children: [
            N === "books" && /* @__PURE__ */ l(_t, { children: [
              !k && Object.entries(q).map(([v, $]) => {
                if ($.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(zt, { heading: Kr(v), children: $.map((et) => /* @__PURE__ */ r(
                      wr,
                      {
                        bookId: et,
                        onSelect: (st) => Nt(st),
                        section: le(et),
                        commandValue: `${et} ${Lt[et]}`,
                        ref: et === t.book ? R : void 0,
                        localizedBookNames: a
                      },
                      et
                    )) }, v)
                  );
              }),
              k && /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r(
                Xt,
                {
                  value: `${k.book} ${Lt[k.book]} ${k.chapterNum || ""}:${k.verseNum || ""})}`,
                  onSelect: Q,
                  className: "tw-font-semibold tw-text-primary",
                  children: Yt(
                    {
                      book: k.book,
                      chapterNum: k.chapterNum ?? 1,
                      verseNum: k.verseNum ?? 1
                    },
                    a ? cn(k.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              k && vt(k.book) > 1 && /* @__PURE__ */ l(_t, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Kt(k.book, a) }),
                /* @__PURE__ */ r(
                  Ln,
                  {
                    bookId: k.book,
                    scrRef: t,
                    onChapterSelect: Ht,
                    setChapterRef: Tn,
                    isChapterDimmed: Ur,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            N === "chapters" && x && /* @__PURE__ */ r(
              Ln,
              {
                bookId: x,
                scrRef: t,
                onChapterSelect: Ht,
                setChapterRef: Tn,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const tw = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Ea = Mt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), rt = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Hn.Root,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      Ea(),
      t
    ),
    ...e
  }
));
rt.displayName = Hn.Root.displayName;
const un = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return /* @__PURE__ */ r(
    ce.Root,
    {
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-grid tw-gap-2",
        t
      ),
      ...e,
      ref: n,
      dir: o
    }
  );
});
un.displayName = ce.Root.displayName;
const xe = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ce.Item,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-shadow focus:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(ce.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ke, { className: "tw-h-3.5 tw-w-3.5 tw-fill-primary" }) })
  }
));
xe.displayName = ce.Item.displayName;
function Va(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function qe({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: w = Va,
  icon: u = void 0,
  buttonPlaceholder: c = "",
  textPlaceholder: p = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: g = "start",
  isDisabled: b = !1,
  ...y
}) {
  const [N, V] = A(!1);
  return /* @__PURE__ */ l(re, { open: N, onOpenChange: V, ...y, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ l(
      I,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": N,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: u }),
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : c })
          ] }),
          /* @__PURE__ */ r(on, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Ft,
      {
        align: g,
        className: d("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ l(te, { children: [
          /* @__PURE__ */ r(he, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ce, { children: f }),
          /* @__PURE__ */ r(ee, { children: e.map((x) => /* @__PURE__ */ l(
            Xt,
            {
              value: w(x),
              onSelect: () => {
                i(x), V(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  rn,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || w(s) !== w(x)
                    })
                  }
                ),
                w(x)
              ]
            },
            w(x)
          )) })
        ] })
      }
    )
  ] });
}
function Ma({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = J(
    () => Array.from({ length: s }, (c, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ l(_t, { children: [
    /* @__PURE__ */ r(rt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      qe,
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
    /* @__PURE__ */ r(rt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      qe,
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
var Ia = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Ia || {});
const ew = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Pe = (t, e) => t[e] ?? e;
function nw({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: w,
  handleSelectStartChapter: u,
  localizedStrings: c
}) {
  const p = Pe(c, "%webView_bookSelector_currentBook%"), f = Pe(c, "%webView_bookSelector_choose%"), h = Pe(c, "%webView_bookSelector_chooseBooks%"), [g, b] = A(
    "current book"
    /* CURRENT_BOOK */
  ), y = (N) => {
    b(N), t(N);
  };
  return /* @__PURE__ */ r(
    un,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (N) => y(N),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(xe, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(rt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(rt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Ma,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: u,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: w,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(xe, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(rt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(rt, { className: "tw-flex tw-items-center", children: o.map((N) => j.bookIdToEnglishName(N)).join(", ") }),
          /* @__PURE__ */ r(
            I,
            {
              disabled: g === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
const mn = Qr(void 0);
function yt() {
  const t = to(mn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Tt = Mt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function _e({ variant: t = "default", ...e }) {
  const n = m.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(mn.Provider, { value: n, children: /* @__PURE__ */ r(Y.Root, { ...e }) });
}
const hn = Y.Trigger, lr = Y.Group, Da = Y.Portal, Oa = Y.Sub, Aa = Y.RadioGroup, dr = m.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = yt();
  return /* @__PURE__ */ l(
    Y.SubTrigger,
    {
      ref: a,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
        e && "tw-ps-8",
        // CUSTOM: Support RTL (was inset && tw-pl-8)
        t,
        Tt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(sn, { className: "tw-ms-auto" }),
        " "
      ]
    }
  );
});
dr.displayName = Y.SubTrigger.displayName;
const cr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Y.SubContent,
  {
    ref: n,
    className: d(
      "tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-dropdown-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
cr.displayName = Y.SubContent.displayName;
const fe = m.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = at();
  return /* @__PURE__ */ r(Y.Portal, { children: /* @__PURE__ */ l(
    Y.Content,
    {
      ref: a,
      sideOffset: e,
      className: d(
        "pr-twp",
        // CUSTOM adding pr twp because the dropdown content is added to the dom as a sibling to the app root
        "tw-z-50 tw-max-h-[var(--radix-dropdown-menu-content-available-height)] tw-min-w-[8rem] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md",
        "tw-origin-[--radix-dropdown-menu-content-transform-origin] data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("div", { dir: s, children: n }),
        " "
      ]
    }
  ) });
});
fe.displayName = Y.Content.displayName;
const pr = m.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = at(), s = yt();
  return /* @__PURE__ */ r(
    Y.Item,
    {
      ref: o,
      className: d(
        // CUSTOM: removed tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        e && "tw-ps-8",
        // CUSTOM: Support RTL (was inset && tw-pl-8)
        t,
        Tt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
pr.displayName = Y.Item.displayName;
const fn = m.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = yt();
  return /* @__PURE__ */ l(
    Y.CheckboxItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        "tw-pe-2 tw-ps-8",
        // CUSTOM: Support RTL
        t,
        Tt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: d(
              "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",
              "ltr:tw-left-2 rtl:tw-right-2"
              // CUSTOM: Support RTL
            ),
            children: /* @__PURE__ */ r(Y.ItemIndicator, { children: /* @__PURE__ */ r(me, { className: "tw-h-4 tw-w-4" }) })
          }
        ),
        e
      ]
    }
  );
});
fn.displayName = Y.CheckboxItem.displayName;
const ur = m.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = yt();
  return /* @__PURE__ */ l(
    Y.RadioItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        "tw-pe-2 tw-ps-8",
        // CUSTOM: Support RTL
        t,
        Tt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: d(
              "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",
              "ltr:tw-left-2 rtl:tw-right-2"
              // CUSTOM: Support RTL
            ),
            children: /* @__PURE__ */ r(Y.ItemIndicator, { children: /* @__PURE__ */ r(ke, { className: "tw-h-2 tw-w-2 tw-fill-current" }) })
          }
        ),
        e
      ]
    }
  );
});
ur.displayName = Y.RadioItem.displayName;
const gn = m.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  Y.Label,
  {
    ref: o,
    className: d(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",
      e && "tw-ps-8",
      // CUSTOM: Support RTL (was inset && tw-pl-8)
      t
    ),
    ...n
  }
));
gn.displayName = Y.Label.displayName;
const Re = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Y.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Re.displayName = Y.Separator.displayName;
function Pa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d(
        "tw-text-xs tw-tracking-widest tw-opacity-60",
        "tw-ms-auto",
        // CUSTOM: Support RTL (was tw-ml-auto)
        t
      ),
      ...e
    }
  );
}
Pa.displayName = "DropdownMenuShortcut";
function La({ table: t }) {
  return /* @__PURE__ */ l(_e, { children: [
    /* @__PURE__ */ r(jo, { asChild: !0, children: /* @__PURE__ */ l(I, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(po, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(fe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(gn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Re, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        fn,
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
const Jt = Z.Root, $a = Z.Group, Zt = Z.Value, za = Mt(
  "tw-flex tw-h-9 tw-w-full tw-items-center tw-justify-between tw-whitespace-nowrap tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-2 tw-text-sm tw-shadow-sm tw-ring-offset-background data-[placeholder]:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
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
), Bt = m.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = at();
  return /* @__PURE__ */ l(
    Z.Trigger,
    {
      className: d(za({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(Z.Icon, { asChild: !0, children: /* @__PURE__ */ r(Zn, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Bt.displayName = Z.Trigger.displayName;
const mr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.ScrollUpButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Jo, { className: "tw-h-4 tw-w-4" })
  }
));
mr.displayName = Z.ScrollUpButton.displayName;
const hr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.ScrollDownButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Zn, { className: "tw-h-4 tw-w-4" })
  }
));
hr.displayName = Z.ScrollDownButton.displayName;
const Gt = m.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = at();
  return /* @__PURE__ */ r(Z.Portal, { children: /* @__PURE__ */ l(
    Z.Content,
    {
      ref: a,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-relative tw-z-50 tw-max-h-[--radix-select-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-select-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(mr, {}),
        /* @__PURE__ */ l(
          Z.Viewport,
          {
            className: d(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: [
              /* @__PURE__ */ r("div", { dir: s, children: e }),
              " "
            ]
          }
        ),
        /* @__PURE__ */ r(hr, {})
      ]
    }
  ) });
});
Gt.displayName = Z.Content.displayName;
const ja = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.Label,
  {
    ref: n,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
ja.displayName = Z.Label.displayName;
const pt = m.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  Z.Item,
  {
    ref: o,
    className: d(
      // CUSTOM: removed tw-pl-2 tw-pr-8
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      "tw-pe-8 tw-ps-2",
      // CUSTOM: Support RTL
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-end-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Z.ItemIndicator, { children: /* @__PURE__ */ r(me, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(Z.ItemText, { children: e })
    ]
  }
));
pt.displayName = Z.Item.displayName;
const Ba = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ba.displayName = Z.Separator.displayName;
function Ga({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ l(
        Jt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Bt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Zt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Gt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(pt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ l(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(uo, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(mo, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(ho, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(fo, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const $n = `
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
function Xa(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function pe(t, e) {
  const n = e ? `${$n}, ${e}` : $n;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Xa(o)
  );
}
const Se = m.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = m.useRef(null);
  m.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), m.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const w = () => {
      requestAnimationFrame(() => {
        pe(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    w();
    const u = new MutationObserver(() => {
      w();
    });
    return u.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      u.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: w } = a;
    if (w) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), pe(w)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === w && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-relative tw-w-full tw-overflow-auto",
        { "tw-p-1": e }
        // CUSTOM
      ),
      children: /* @__PURE__ */ r(
        "table",
        {
          tabIndex: 0,
          onKeyDown: s,
          ref: a,
          className: d(
            "tw-w-full tw-caption-bottom tw-text-sm",
            "tw-outline-none",
            // CUSTOM: Add outline-none to remove duplicate outline
            "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
            // CUSTOM: Add focus styles
            t
          ),
          "aria-label": "Table",
          "aria-labelledby": "table-label",
          ...n
        }
      )
    }
  );
});
Se.displayName = "Table";
const Te = m.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: d(
      "[&_tr]:tw-border-b",
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
        // CUSTOM
      },
      t
    ),
    ...n
  }
));
Te.displayName = "TableHeader";
const Ee = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
Ee.displayName = "TableBody";
const Fa = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Fa.displayName = "TableFooter";
function Ha(t) {
  m.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? pe(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
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
function Ya(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ka(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Rt = m.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = m.useRef(null);
  m.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Ha(i);
  const w = m.useMemo(
    () => i.current ? pe(i.current) : [],
    [i]
  ), u = m.useCallback(
    (p) => {
      const { current: f } = i;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), g = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        pe(h).filter(
          (N) => N.tagName === "TR"
        )
      ) : [], b = g.indexOf(f), y = w.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), Ka(g, b, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Ya(w, y, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const N = f.closest("table");
        N && N.focus();
      }
      e == null || e(p);
    },
    [i, w, e]
  ), c = m.useCallback(
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
      onKeyDown: u,
      onFocus: c,
      className: d(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        "tw-outline-none",
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      ...a
    }
  );
});
Rt.displayName = "TableRow";
const ue = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: d(
      // CUSTOM: start instead of left, pe instead of pr to support RTL
      "tw-h-10 tw-px-2 tw-text-left tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pr-0 [&>[role=checkbox]]:tw-translate-y-[2px]",
      t
    ),
    ...e
  }
));
ue.displayName = "TableHead";
const $t = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: d(
      "tw-p-2 tw-align-middle [&:has([role=checkbox])]:tw-pr-0 [&>[role=checkbox]]:tw-translate-y-[2px]",
      t
    ),
    ...e
  }
));
$t.displayName = "TableCell";
const Ua = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ua.displayName = "TableCaption";
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-animate-pulse tw-rounded-md tw-bg-primary/10",
        t
      ),
      ...e
    }
  );
}
function qa({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: w,
  isLoading: u = !1,
  noResultsMessage: c
}) {
  var P;
  const [p, f] = A([]), [h, g] = A([]), [b, y] = A({}), [N, V] = A({}), x = J(() => e ?? [], [e]), _ = Yn({
    data: x,
    columns: t,
    getCoreRowModel: Un(),
    ...n && { getPaginationRowModel: Lo() },
    onSortingChange: f,
    getSortedRowModel: Kn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: Po(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: V,
    state: {
      sorting: p,
      columnFilters: h,
      columnVisibility: b,
      rowSelection: N
    }
  }), G = _.getVisibleFlatColumns();
  let L;
  return u ? L = Array.from({ length: 10 }).map((R, C) => `skeleton-row-${C}`).map((R) => /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ r($t, { colSpan: G.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(Je, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, R)) : ((P = _.getRowModel().rows) == null ? void 0 : P.length) > 0 ? L = _.getRowModel().rows.map((F) => /* @__PURE__ */ r(
    Rt,
    {
      onClick: () => i(F, _),
      "data-state": F.getIsSelected() && "selected",
      children: F.getVisibleCells().map((H) => /* @__PURE__ */ r($t, { children: de(H.column.columnDef.cell, H.getContext()) }, H.id))
    },
    F.id
  )) : L = /* @__PURE__ */ r(Rt, { children: /* @__PURE__ */ r($t, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ l("div", { className: "pr-twp", id: w, children: [
    a && /* @__PURE__ */ r(La, { table: _ }),
    /* @__PURE__ */ l(Se, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Te, { stickyHeader: s, children: _.getHeaderGroups().map((F) => /* @__PURE__ */ r(Rt, { children: F.headers.map((H) => /* @__PURE__ */ r(ue, { children: H.isPlaceholder ? void 0 : de(H.column.columnDef.header, H.getContext()) }, H.id)) }, F.id)) }),
      /* @__PURE__ */ r(Ee, { children: L })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        I,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        I,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Ga, { table: _ })
  ] });
}
function rw({ id: t, markdown: e, className: n, anchorTarget: o }) {
  const a = J(
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
  return /* @__PURE__ */ r("div", { id: t, className: d("pr-twp tw-prose", n), children: /* @__PURE__ */ r(Bo, { options: a, children: e }) });
}
const Ja = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), zn = (t, e) => t[e] ?? e;
function Za({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = zn(n, "%webView_error_dump_header%"), s = zn(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(I, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(go, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const ow = Object.freeze([
  ...Ja,
  "%webView_error_dump_copied_message%"
]);
function aw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, w] = A(!1), u = () => {
    w(!0), e && e();
  };
  return /* @__PURE__ */ l(re, { onOpenChange: (p) => {
    p || w(!1);
  }, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: o }),
    /* @__PURE__ */ l(Ft, { id: s, className: d("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(rt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Za,
        {
          errorDetails: t,
          handleCopyNotify: u,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Wa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Wa || {});
function sw({ id: t, label: e, groups: n }) {
  const [o, a] = A(
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = A({}), w = (c, p) => {
    const f = !o[c][p];
    a((g) => (g[c][p] = f, { ...g }));
    const h = n[c].items[p];
    h.onUpdate(h.id, f);
  }, u = (c, p) => {
    i((h) => (h[c] = p, { ...h }));
    const f = n[c].items.find((h) => h.id === p);
    f ? f.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(_e, { children: [
    /* @__PURE__ */ r(hn, { asChild: !0, children: /* @__PURE__ */ l(I, { variant: "default", children: [
      /* @__PURE__ */ r(bo, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Xn, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(fe, { children: n.map((c, p) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(gn, { children: c.label }),
      /* @__PURE__ */ r(lr, { children: c.itemType === 0 ? /* @__PURE__ */ r(_t, { children: c.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        fn,
        {
          checked: o[p][h],
          onCheckedChange: () => w(p, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ r(
        Aa,
        {
          value: s[p],
          onValueChange: (f) => u(p, f),
          children: c.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(ur, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ r(Re, {})
    ] }, c.label)) })
  ] }) });
}
function iw({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: w
}) {
  const u = new oo("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, f) => p + f, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        e && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(vo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: u })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ l(
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
        (a || i) && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            I,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(xo, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            I,
            {
              onClick: () => w(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(yo, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Qa({ id: t, versionHistory: e }) {
  const [n, o] = A(!1), a = /* @__PURE__ */ new Date();
  function s(w) {
    const u = new Date(w), c = new Date(a.getTime() - u.getTime()), p = c.getUTCFullYear() - 1970, f = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let g = "";
    return p > 0 ? g = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? g = "today" : g = `${h.toString()} day${h === 1 ? "" : "s"} ago`, g;
  }
  const i = Object.entries(e).sort((w, u) => u[0].localeCompare(w[0]));
  return /* @__PURE__ */ l("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((w) => /* @__PURE__ */ l("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: w[1].description }) }) }),
      /* @__PURE__ */ l("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ l("div", { children: [
          "Version ",
          w[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(w[1].date) })
      ] })
    ] }, w[0])) }),
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
function ww({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = J(() => ao(n), [n]), u = ((c) => {
    const p = new Intl.DisplayNames(so(), { type: "language" });
    return c.map((f) => p.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Qa, { versionHistory: a }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ l("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: u.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const ts = Mt(
  d(
    "pr-twp",
    // CUSTOM
    "tw-inline-flex tw-items-center tw-rounded-md tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2"
  ),
  {
    variants: {
      variant: {
        default: "tw-border-transparent tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/80",
        secondary: "tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        destructive: "tw-border-transparent tw-bg-destructive tw-text-destructive-foreground tw-shadow hover:tw-bg-destructive/80",
        outline: "tw-text-foreground",
        /*  CUSTOM VARIANTS  */
        muted: "tw-border-transparent tw-bg-muted tw-text-muted-foreground tw-shadow hover:tw-bg-muted/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        blueIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",
        mutedIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Ze({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ r("div", { className: d("pr-twp", ts({ variant: e }), t), ...n });
}
function es({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: w = "No entries found",
  customSelectedText: u,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: g = void 0,
  className: b = void 0,
  variant: y = "ghost",
  id: N
}) {
  const [V, x] = A(!1), _ = X(
    (C) => {
      var E;
      const B = (E = t.find((W) => W.label === C)) == null ? void 0 : E.value;
      B && n(
        e.includes(B) ? e.filter((W) => W !== B) : [...e, B]
      );
    },
    [t, e, n]
  ), G = () => u || o, L = J(() => {
    if (!h) return t;
    const C = t.filter((E) => E.starred).sort((E, W) => E.label.localeCompare(W.label)), B = t.filter((E) => !E.starred).sort((E, W) => {
      const S = e.includes(E.value), q = e.includes(W.value);
      return S && !q ? -1 : !S && q ? 1 : E.label.localeCompare(W.label);
    });
    return [...C, ...B];
  }, [t, e, h]), P = () => {
    n(t.map((C) => C.value));
  }, F = () => {
    n([]);
  }, H = c ?? V;
  return /* @__PURE__ */ r("div", { id: N, className: b, children: /* @__PURE__ */ l(re, { open: H, onOpenChange: p ?? x, children: [
    /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ l(
      I,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": H,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            g && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: g }) }),
            /* @__PURE__ */ r("div", { className: "tw-font-normal", children: G() })
          ] }),
          /* @__PURE__ */ r(on, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Ft, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(te, { children: [
      /* @__PURE__ */ r(he, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: P, children: s }),
        /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: F, children: i })
      ] }),
      /* @__PURE__ */ l(ee, { children: [
        /* @__PURE__ */ r(Ce, { children: w }),
        /* @__PURE__ */ r(zt, { children: L.map((C) => /* @__PURE__ */ l(
          Xt,
          {
            value: C.label,
            onSelect: _,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                rn,
                {
                  className: d(
                    "tw-h-4 tw-w-4",
                    e.includes(C.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              C.starred && /* @__PURE__ */ r(No, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: C.label }),
              C.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: C.secondaryLabel })
            ]
          },
          C.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function lw({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: w,
  icon: u,
  className: c,
  badgesPlaceholder: p,
  id: f
}) {
  return /* @__PURE__ */ l("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      es,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: w,
        icon: u,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var g;
      return /* @__PURE__ */ l(Ze, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          I,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((b) => b !== h)),
            children: /* @__PURE__ */ r(Fn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (g = t.find((b) => b.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(rt, { children: p })
  ] });
}
function fr(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function ns(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], s = [];
  let i = [];
  return e.forEach((w) => {
    typeof w != "string" && w.marker === "fp" ? (i.length > 0 && s.push(i), i = [w]) : i.push(w);
  }), i.length > 0 && s.push(i), s.map((w, u) => {
    const c = u === s.length - 1;
    return /* @__PURE__ */ l("p", { className: "tw-mb-2", children: [
      bn(t, w, n, !0, a),
      c && o
    ] }, fr(t, w));
  });
}
function bn(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const i = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const w = d(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: w, children: s }, i);
        }
        return /* @__PURE__ */ l(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Fe, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Fe, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return rs(
        s,
        fr(`${t}\\${s.marker}`, [s]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function rs(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ l("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Fe,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    bn(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function os({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, w = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...w] = t.content);
  const u = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, p = /* @__PURE__ */ l(_t, { children: [
    a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
    // specific class name in case styling is needed.
    /* @__PURE__ */ l("span", { className: d("note-caller", { formatted: s }), children: [
      a,
      " "
    ] }),
    i && /* @__PURE__ */ l(_t, { children: [
      bn(t.marker, [i], o, !1),
      " "
    ] })
  ] }), g = d(e === "horizontal" ? "horizontal tw-table-cell" : "vertical", o ? "marker-visible" : "");
  return /* @__PURE__ */ l(_t, { children: [
    /* @__PURE__ */ l("div", { className: d("textual-note-header tw-text-nowrap tw-pr-2", g), children: [
      u,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: d("textual-note-body", g), children: w && w.length > 0 && /* @__PURE__ */ r(_t, { children: ns(t.marker, w, o, c) }) })
  ] });
}
const gr = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-rounded-xl tw-border tw-bg-card tw-text-card-foreground tw-shadow",
        t
      ),
      ...e
    }
  )
);
gr.displayName = "Card";
const as = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",
        t
      ),
      ...e
    }
  )
);
as.displayName = "CardHeader";
const ss = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e
    }
  )
);
ss.displayName = "CardTitle";
const is = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-text-sm tw-text-muted-foreground",
        t
      ),
      ...e
    }
  )
);
is.displayName = "CardDescription";
const ws = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-p-6 tw-pt-0",
        t
      ),
      ...e
    }
  )
);
ws.displayName = "CardContent";
const ls = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-flex tw-items-center tw-p-6 tw-pt-0",
        t
      ),
      ...e
    }
  )
);
ls.displayName = "CardFooter";
const ds = (t, e) => t[e] ?? e;
function dw({
  className: t,
  footnotes: e,
  layout: n = "horizontal",
  listId: o,
  selectedFootnote: a,
  showMarkers: s = !0,
  suppressFormatting: i = !1,
  formatCaller: w,
  onFootnoteSelected: u,
  localizedStrings: c
}) {
  const p = c ? ds(c, "%webView_footnoteList_header%") : "Footnotes", f = w ?? io(e, void 0), h = (x, _) => {
    u == null || u(x, _, o);
  }, g = a ? e.findIndex((x) => x === a) : 0, [b, y] = A(g), N = (x) => {
    if (e.length)
      switch (x.key) {
        case "ArrowDown":
          x.preventDefault(), y((_) => Math.min(_ + 1, e.length - 1));
          break;
        case "ArrowUp":
          x.preventDefault(), y((_) => Math.max(_ - 1, 0));
          break;
        case "Enter":
        case " ":
          x.preventDefault(), u == null || u(e[b], b, o);
          break;
      }
  }, V = nt([]);
  return Vt(() => {
    var x;
    b >= 0 && b < V.current.length && ((x = V.current[b]) == null || x.focus());
  }, [b]), /* @__PURE__ */ l(_t, { children: [
    n === "vertical" && /* @__PURE__ */ r("h2", { className: "tw-mb-1 tw-font-semibold", children: p }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "listbox",
        "aria-label": "Footnotes",
        tabIndex: 0,
        className: d("tw-h-full tw-overflow-y-auto", t),
        onKeyDown: N,
        children: /* @__PURE__ */ r(
          "div",
          {
            className: d(
              "tw-p-0.5",
              n === "horizontal" ? "tw-table" : "tw-flex tw-flex-col tw-gap-1",
              !i && "formatted-font"
            ),
            children: e.map((x, _) => {
              const G = x === a, L = `${o}-${_}`;
              return /* @__PURE__ */ r(
                gr,
                {
                  ref: (P) => {
                    V.current[_] = P;
                  },
                  role: "option",
                  "aria-selected": G,
                  "data-marker": x.marker,
                  "data-state": G ? "selected" : void 0,
                  tabIndex: -1,
                  className: d(
                    "data-[state=selected]:tw-bg-muted",
                    u && "tw-cursor-pointer hover:tw-bg-muted/50",
                    "tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-py-0 tw-shadow-none",
                    n === "horizontal" ? "horizontal tw-table-row" : "vertical tw-block tw-text-sm"
                  ),
                  onClick: () => h(x, _),
                  children: /* @__PURE__ */ r(
                    os,
                    {
                      footnote: x,
                      layout: n,
                      formatCaller: () => f(x.caller, _),
                      showMarkers: s
                    }
                  )
                },
                L
              );
            })
          }
        )
      }
    )
  ] });
}
function cs({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], s = J(() => {
    const i = [];
    return t.forEach((w) => {
      i.some((u) => nn(u, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ l(Se, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Te, { stickyHeader: !0, children: /* @__PURE__ */ l(Rt, { children: [
      /* @__PURE__ */ r(ue, { children: o }),
      /* @__PURE__ */ r(ue, { children: a })
    ] }) }),
    /* @__PURE__ */ r(Ee, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      Rt,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ r($t, { children: `${j.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r($t, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const vn = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  He.Root,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-peer tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-shadow focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      He.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(me, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
vn.displayName = He.Root.displayName;
const ge = m.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: d(
        "tw-flex tw-h-9 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-1 tw-text-base tw-shadow-sm tw-transition-colors file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: o,
      ...n
    }
  )
);
ge.displayName = "Input";
const br = Mt(
  d(
    "pr-twp",
    // CUSTOM
    "tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0"
  ),
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline: "tw-border tw-border-input tw-bg-transparent tw-shadow-sm hover:tw-bg-accent hover:tw-text-accent-foreground"
      },
      size: {
        default: "tw-h-9 tw-px-2 tw-min-w-9",
        sm: "tw-h-8 tw-px-1.5 tw-min-w-8",
        lg: "tw-h-10 tw-px-2.5 tw-min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ps = m.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  qn.Root,
  {
    ref: a,
    className: d(br({ variant: e, size: n, className: t })),
    ...o
  }
));
ps.displayName = qn.Root.displayName;
const vr = m.createContext({
  size: "default",
  variant: "default"
}), xr = m.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = at();
  return /* @__PURE__ */ r(
    Ne.Root,
    {
      ref: s,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-flex tw-items-center tw-justify-center tw-gap-1",
        t
      ),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        vr.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
xr.displayName = Ne.Root.displayName;
const ve = m.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = m.useContext(vr);
  return /* @__PURE__ */ r(
    Ne.Item,
    {
      ref: s,
      className: d(
        br({
          variant: i.variant || n,
          size: i.size || o
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
ve.displayName = Ne.Item.displayName;
const Ve = (t) => t === "asc" ? /* @__PURE__ */ r(Ro, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(So, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(To, { className: "tw-ms-2 tw-h-4 tw-w-4" }), cw = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(I, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Ve(e.getIsSorted())
  ] })
}), us = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(I, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    Ve(n.getIsSorted())
  ] })
}), pw = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(I, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Ve(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Le = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((u) => {
    e === "approved" ? i.includes(u) || i.push(u) : i = i.filter((c) => c !== u);
  }), o(i);
  let w = [...a];
  t.forEach((u) => {
    e === "unapproved" ? w.includes(u) || w.push(u) : w = w.filter((c) => c !== u);
  }), s(w);
}, uw = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(I, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    Ve(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ l(xr, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        ve,
        {
          onClick: (u) => {
            u.stopPropagation(), Le(
              [w],
              "approved",
              e,
              n,
              o,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(ko, {})
        }
      ),
      /* @__PURE__ */ r(
        ve,
        {
          onClick: (u) => {
            u.stopPropagation(), Le(
              [w],
              "unapproved",
              e,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Co, {})
        }
      ),
      /* @__PURE__ */ r(
        ve,
        {
          onClick: (u) => {
            u.stopPropagation(), Le(
              [w],
              "unknown",
              e,
              n,
              o,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(_o, {})
        }
      )
    ] });
  }
}), mw = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), hw = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, fw = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, ms = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", gw = Object.freeze([
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
]), hs = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, fs = (t, e, n) => {
  const o = [];
  return t.forEach((a) => {
    const s = o.find(
      (i) => nn(
        i.items,
        De(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: De(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: ms(
          De(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
          e,
          n
        ),
        occurrences: [
          {
            reference: a.verseRef,
            text: a.verse
          }
        ]
      };
      o.push(i);
    }
  }), o;
}, gt = (t, e) => t[e] ?? e;
function bw({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: w,
  columns: u,
  id: c,
  areInventoryItemsLoading: p = !1
}) {
  const f = gt(n, "%webView_inventory_all%"), h = gt(n, "%webView_inventory_approved%"), g = gt(n, "%webView_inventory_unapproved%"), b = gt(n, "%webView_inventory_unknown%"), y = gt(n, "%webView_inventory_scope_currentBook%"), N = gt(n, "%webView_inventory_scope_chapter%"), V = gt(n, "%webView_inventory_scope_verse%"), x = gt(n, "%webView_inventory_filter_text%"), _ = gt(
    n,
    "%webView_inventory_show_additional_items%"
  ), G = gt(n, "%webView_inventory_no_results%"), [L, P] = A(!1), [F, H] = A("all"), [R, C] = A(""), [B, E] = A([]), W = J(() => {
    const T = t ?? [];
    return T.length === 0 ? [] : fs(T, a, s);
  }, [t, a, s]), S = J(() => {
    if (L) return W;
    const T = [];
    return W.forEach((tt) => {
      const ht = tt.items[0], ft = T.find(
        (kt) => kt.items[0] === ht
      );
      ft ? (ft.count += tt.count, ft.occurrences = ft.occurrences.concat(tt.occurrences)) : T.push({
        items: [ht],
        count: tt.count,
        occurrences: tt.occurrences,
        status: tt.status
      });
    }), T;
  }, [L, W]), q = J(() => S.length === 0 ? [] : hs(S, F, R), [S, F, R]), k = J(() => {
    var ht, ft;
    if (!L) return u;
    const T = (ht = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ht.length;
    if (!T) return u;
    const tt = [];
    for (let kt = 0; kt < T; kt++)
      tt.push(
        us(
          ((ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft[kt]) || "Additional Item",
          kt + 1
        )
      );
    return [...tt, ...u];
  }, [o == null ? void 0 : o.tableHeaders, u, L]);
  Vt(() => {
    q.length === 0 ? E([]) : q.length === 1 && E(q[0].items);
  }, [q]);
  const Q = (T, tt) => {
    tt.setRowSelection(() => {
      const ht = {};
      return ht[T.index] = !0, ht;
    }), E(T.original.items);
  }, Nt = (T) => {
    if (T === "book" || T === "chapter" || T === "verse")
      w(T);
    else
      throw new Error(`Invalid scope value: ${T}`);
  }, Ht = (T) => {
    if (T === "all" || T === "approved" || T === "unapproved" || T === "unknown")
      H(T);
    else
      throw new Error(`Invalid status filter value: ${T}`);
  }, It = J(() => {
    if (S.length === 0 || B.length === 0) return [];
    const T = S.filter((tt) => nn(
      L ? tt.items : [tt.items[0]],
      B
    ));
    if (T.length > 1) throw new Error("Selected item is not unique");
    return T.length === 0 ? [] : T[0].occurrences;
  }, [B, L, S]);
  return /* @__PURE__ */ l("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        Jt,
        {
          onValueChange: (T) => Ht(T),
          defaultValue: F,
          children: [
            /* @__PURE__ */ r(Bt, { className: "tw-m-1", children: /* @__PURE__ */ r(Zt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(Gt, { children: [
              /* @__PURE__ */ r(pt, { value: "all", children: f }),
              /* @__PURE__ */ r(pt, { value: "approved", children: h }),
              /* @__PURE__ */ r(pt, { value: "unapproved", children: g }),
              /* @__PURE__ */ r(pt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(Jt, { onValueChange: (T) => Nt(T), defaultValue: i, children: [
        /* @__PURE__ */ r(Bt, { className: "tw-m-1", children: /* @__PURE__ */ r(Zt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(Gt, { children: [
          /* @__PURE__ */ r(pt, { value: "book", children: y }),
          /* @__PURE__ */ r(pt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(pt, { value: "verse", children: V })
        ] })
      ] }),
      /* @__PURE__ */ r(
        ge,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: x,
          value: R,
          onChange: (T) => {
            C(T.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          vn,
          {
            className: "tw-m-1",
            checked: L,
            onCheckedChange: (T) => {
              P(T);
            }
          }
        ),
        /* @__PURE__ */ r(rt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? _ })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      qa,
      {
        columns: k,
        data: q,
        onRowClickHandler: Q,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: G
      }
    ) }),
    It.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      cs,
      {
        occurrenceData: It,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const xn = m.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Jn.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
xn.displayName = Jn.Root.displayName;
const yn = qt.Provider, Nn = qt.Root, kn = qt.Trigger, Me = m.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(qt.Portal, { children: /* @__PURE__ */ r(
  qt.Content,
  {
    ref: o,
    sideOffset: e,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-z-50 tw-origin-[--radix-tooltip-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-bg-primary tw-px-3 tw-py-1.5 tw-text-xs tw-text-primary-foreground tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
) }));
Me.displayName = qt.Content.displayName;
const gs = "sidebar_state", bs = 60 * 60 * 24 * 7, vs = "16rem", xs = "3rem", yr = m.createContext(void 0);
function Ie() {
  const t = m.useContext(yr);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Nr = m.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    // CUSTOM
    ...w
  }, u) => {
    const [c, p] = m.useState(t), f = e ?? c, h = m.useCallback(
      (_) => {
        const G = typeof _ == "function" ? _(f) : _;
        n ? n(G) : p(G), document.cookie = `${gs}=${G}; path=/; max-age=${bs}`;
      },
      [n, f]
    ), g = m.useCallback(() => h((_) => !_), [h]), b = f ? "expanded" : "collapsed", V = at() === "ltr" ? i : i === "primary" ? "secondary" : "primary", x = m.useMemo(
      () => ({
        state: b,
        open: f,
        setOpen: h,
        toggleSidebar: g,
        side: V
      }),
      [b, f, h, g, V]
    );
    return /* @__PURE__ */ r(yr.Provider, { value: x, children: /* @__PURE__ */ r(yn, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CUSTOM: Suppress warning produced by imported shadcn code
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": vs,
            "--sidebar-width-icon": xs,
            ...a
          }
        ),
        className: d(
          "pr-twp",
          // CUSTOM
          // CUSTOM: removed tw-min-h-svh
          "tw-group/sidebar-wrapper tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: u,
        ...w,
        children: s
      }
    ) }) });
  }
);
Nr.displayName = "SidebarProvider";
const kr = m.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Ie();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ l(
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
            className: d(
              "tw-relative tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=right]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: d(
              "tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              "tw-absolute",
              // CUSTOM: Switched tw-fixed to tw-absolute to scope the sidebar inside of it's container
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              // CUSTOM: direction aware side handling
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
kr.displayName = "Sidebar";
const ys = m.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const { toggleSidebar: a } = Ie();
  return /* @__PURE__ */ l(
    I,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), a();
      },
      ...n,
      children: [
        /* @__PURE__ */ r(aa, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ys.displayName = "SidebarTrigger";
const Ns = m.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Ie();
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
        className: d(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border sm:tw-flex",
          "group-data-[side=primary]:tw--end-4 group-data-[side=secondary]:tw-left-0",
          // CUSTOM: direction aware side handling
          "[[data-side=primary]_&]:tw-cursor-w-resize [[data-side=secondary]_&]:tw-cursor-e-resize",
          // CUSTOM: direction aware side handling
          "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
          // CUSTOM: direction aware side handling
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-start-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          // CUSTOM: direction aware side handling
          "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
          t
        ),
        ...e
      }
    );
  }
);
Ns.displayName = "SidebarRail";
const Cr = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: d(
        "tw-relative tw-flex tw-w-full tw-flex-1 tw-flex-col tw-bg-background",
        "md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Cr.displayName = "SidebarInset";
const ks = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ge,
  {
    ref: n,
    "data-sidebar": "input",
    className: d(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
ks.displayName = "SidebarInput";
const Cs = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Cs.displayName = "SidebarHeader";
const _s = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
_s.displayName = "SidebarFooter";
const Rs = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Rs.displayName = "SidebarSeparator";
const _r = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: d(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
_r.displayName = "SidebarContent";
const We = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
We.displayName = "SidebarGroup";
const Qe = m.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Wt : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: d(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opacity] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Qe.displayName = "SidebarGroupLabel";
const Ss = m.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Wt : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: d(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Ss.displayName = "SidebarGroupAction";
const tn = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: d("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
tn.displayName = "SidebarGroupContent";
const Rr = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Rr.displayName = "SidebarMenu";
const Sr = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: d("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Sr.displayName = "SidebarMenuItem";
const Ts = Mt(
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
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
), Tr = m.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, w) => {
    const u = t ? Wt : "button", { state: c } = Ie(), p = /* @__PURE__ */ r(
      u,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: d(Ts({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ l(Nn, { children: [
      /* @__PURE__ */ r(kn, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Me, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
Tr.displayName = "SidebarMenuButton";
const Es = m.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Wt : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: d(
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
Es.displayName = "SidebarMenuAction";
const Vs = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: d(
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
Vs.displayName = "SidebarMenuBadge";
const Ms = m.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = m.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(Je, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          Je,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // CUSTOM: Suppress warning produced by imported shadcn code
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
Ms.displayName = "SidebarMenuSkeleton";
const Is = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: d(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Is.displayName = "SidebarMenuSub";
const Ds = m.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Ds.displayName = "SidebarMenuSubItem";
const Os = m.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? Wt : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: d(
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
Os.displayName = "SidebarMenuSubButton";
function As({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: w,
  className: u
}) {
  const c = X(
    (h, g) => {
      o(h, g);
    },
    [o]
  ), p = X(
    (h) => {
      const g = n.find((b) => b.projectId === h);
      return g ? g.projectName : h;
    },
    [n]
  ), f = X(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    kr,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", u),
      children: /* @__PURE__ */ l(_r, { children: [
        /* @__PURE__ */ l(We, { children: [
          /* @__PURE__ */ r(Qe, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(tn, { children: /* @__PURE__ */ r(Rr, { children: Object.entries(e).map(([h, g]) => /* @__PURE__ */ r(Sr, { children: /* @__PURE__ */ r(
            Tr,
            {
              onClick: () => c(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: g })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ l(We, { children: [
          /* @__PURE__ */ r(Qe, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(tn, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            qe,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: w,
              onChange: (h) => {
                const g = p(h);
                c(g, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Eo, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Cn = ut(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, w) => {
    const u = at();
    return /* @__PURE__ */ l("div", { id: i, className: d("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Vo,
        {
          className: d(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": u === "rtl" },
            { "tw-left-3": u === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        ge,
        {
          ref: w,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ l(
        I,
        {
          variant: "ghost",
          size: "icon",
          className: d(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": u === "rtl" },
            { "tw-right-0": u === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Fn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Cn.displayName = "SearchBar";
function vw({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: w,
  extensionsSidebarGroupLabel: u,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Cn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      Nr,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            As,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: u,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(Cr, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Et = "scrBook", Ps = "scrRef", Pt = "source", Ls = "details", $s = "Scripture Reference", zs = "Scripture Book", Er = "Type", js = "Details";
function Bs(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Et,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? $s,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? j.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Et ? Yt(a.start) : void 0;
      },
      getGroupingValue: (o) => j.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Be(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Yt(o.start),
      id: Ps,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Yt(a.start);
      },
      sortingFn: (o, a) => Be(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Pt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Er : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Ls,
      header: (t == null ? void 0 : t.detailsColumnName) ?? js,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Gs = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Be(t.start, t.end) === 0 ? `${Oe(t.start)}+${e}` : `${Oe(t.start)}+${e}-${Oe(t.end)}+${n}`;
}, jn = (t) => `${Gs({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function xw({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w,
  id: u
}) {
  const [c, p] = A([]), [f, h] = A([{ id: Et, desc: !1 }]), [g, b] = A({}), y = J(
    () => t.flatMap((R) => R.data.map((C) => ({
      ...C,
      source: R.source
    }))),
    [t]
  ), N = J(
    () => Bs(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  Vt(() => {
    c.includes(Pt) ? h([
      { id: Pt, desc: !1 },
      { id: Et, desc: !1 }
    ]) : h([{ id: Et, desc: !1 }]);
  }, [c]);
  const V = Yn({
    data: y,
    columns: N,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: g
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: b,
    getExpandedRowModel: zo(),
    getGroupedRowModel: $o(),
    getCoreRowModel: Un(),
    getSortedRowModel: Kn(),
    getRowId: jn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Vt(() => {
    if (w) {
      const R = V.getSelectedRowModel().rowsById, C = Object.keys(R);
      if (C.length === 1) {
        const B = y.find((E) => jn(E) === C[0]) || void 0;
        B && w(B);
      }
    }
  }, [g, y, w, V]);
  const x = a ?? zs, _ = s ?? Er, G = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${x}`, value: [Et] },
    { label: `Group by ${_}`, value: [Pt] },
    {
      label: `Group by ${x} and ${_}`,
      value: [Et, Pt]
    },
    {
      label: `Group by ${_} and ${x}`,
      value: [Pt, Et]
    }
  ], L = (R) => {
    p(JSON.parse(R));
  }, P = (R, C) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(C);
  }, F = (R, C) => R.getIsGrouped() ? "" : d("banded-row", C % 2 === 0 ? "even" : "odd"), H = (R, C, B) => {
    if (!((R == null ? void 0 : R.length) === 0 || C.depth < B.column.getGroupedIndex())) {
      if (C.getIsGrouped())
        switch (C.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (C.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ l("div", { id: u, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ l(
      Jt,
      {
        value: JSON.stringify(c),
        onValueChange: (R) => {
          L(R);
        },
        children: [
          /* @__PURE__ */ r(Bt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Zt, {}) }),
          /* @__PURE__ */ r(Gt, { position: "item-aligned", children: /* @__PURE__ */ r($a, { children: G.map((R) => /* @__PURE__ */ r(pt, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(Se, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Te, { children: V.getHeaderGroups().map((R) => /* @__PURE__ */ r(Rt, { children: R.headers.filter((C) => C.column.columnDef.header).map((C) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(ue, { colSpan: C.colSpan, className: "top-0 tw-sticky", children: C.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          C.column.getCanGroup() ? /* @__PURE__ */ r(
            I,
            {
              variant: "ghost",
              title: `Toggle grouping by ${C.column.columnDef.header}`,
              onClick: C.column.getToggleGroupingHandler(),
              type: "button",
              children: C.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          de(C.column.columnDef.header, C.getContext())
        ] }) }, C.id)
      )) }, R.id)) }),
      /* @__PURE__ */ r(Ee, { children: V.getRowModel().rows.map((R, C) => {
        const B = at();
        return /* @__PURE__ */ r(
          Rt,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: d(F(R, C)),
            onClick: (E) => P(R, E),
            children: R.getVisibleCells().map((E) => {
              if (!(E.getIsPlaceholder() || E.column.columnDef.enableGrouping && !E.getIsGrouped() && (E.column.columnDef.id !== Pt || !n)))
                return /* @__PURE__ */ r(
                  $t,
                  {
                    className: d(
                      E.column.columnDef.id,
                      "tw-p-[1px]",
                      H(c, R, E)
                    ),
                    children: E.getIsGrouped() ? /* @__PURE__ */ l(
                      I,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ r(Xn, {}),
                          !R.getIsExpanded() && (B === "ltr" ? /* @__PURE__ */ r(Xe, {}) : /* @__PURE__ */ r(Ge, {})),
                          " ",
                          de(E.column.columnDef.cell, E.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : de(E.column.columnDef.cell, E.getContext())
                  },
                  E.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
const _n = (t, e) => t.filter((n) => {
  try {
    return le(n) === e;
  } catch {
    return !1;
  }
}), Vr = (t, e, n) => _n(t, e).every((o) => n.includes(o));
function Xs({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = _n(e, t).length === 0, i = a["%scripture_section_ot_short%"], w = a["%scripture_section_nt_short%"], u = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    I,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: d(
        Vr(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: ka(
        t,
        i,
        w,
        u,
        c
      )
    }
  );
}
const Bn = 5, $e = 6;
function Fs({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], w = o["%webView_book_selector_search_books%"], u = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: g, dcLong: b, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [N, V] = A(!1), [x, _] = A(""), G = nt(void 0), L = nt(!1);
  if (t.length !== j.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const P = J(() => j.allBookIds.filter(
    (S, q) => t[q] === "1" && !j.isObsolete(j.bookIdToNumber(S))
  ), [t]), F = J(() => {
    if (!x.trim()) {
      const k = {
        [D.OT]: [],
        [D.NT]: [],
        [D.DC]: [],
        [D.Extra]: []
      };
      return P.forEach((Q) => {
        const Nt = le(Q);
        k[Nt].push(Q);
      }), k;
    }
    const S = P.filter(
      (k) => pn(k, x, a)
    ), q = {
      [D.OT]: [],
      [D.NT]: [],
      [D.DC]: [],
      [D.Extra]: []
    };
    return S.forEach((k) => {
      const Q = le(k);
      q[Q].push(k);
    }), q;
  }, [P, x, a]), H = X(
    (S, q = !1) => {
      if (!q || !G.current) {
        n(
          e.includes(S) ? e.filter((T) => T !== S) : [...e, S]
        ), G.current = S;
        return;
      }
      const k = P.findIndex((T) => T === G.current), Q = P.findIndex((T) => T === S);
      if (k === -1 || Q === -1) return;
      const [Nt, Ht] = [
        Math.min(k, Q),
        Math.max(k, Q)
      ], It = P.slice(Nt, Ht + 1).map((T) => T);
      n(
        e.includes(S) ? e.filter((T) => !It.includes(T)) : [.../* @__PURE__ */ new Set([...e, ...It])]
      );
    },
    [e, n, P]
  ), R = (S) => {
    H(S, L.current), L.current = !1;
  }, C = (S, q) => {
    S.preventDefault(), H(q, S.shiftKey);
  }, B = X(
    (S) => {
      const q = _n(P, S).map((k) => k);
      n(
        Vr(P, S, e) ? e.filter((k) => !q.includes(k)) : [.../* @__PURE__ */ new Set([...e, ...q])]
      );
    },
    [e, n, P]
  ), E = () => {
    n(P.map((S) => S));
  }, W = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(D).map((S) => /* @__PURE__ */ r(
      Xs,
      {
        section: S,
        availableBookIds: P,
        selectedBookIds: e,
        onToggle: B,
        localizedStrings: o
      },
      S
    )) }),
    /* @__PURE__ */ l(
      re,
      {
        open: N,
        onOpenChange: (S) => {
          V(S), S || _("");
        },
        children: [
          /* @__PURE__ */ r(oe, { asChild: !0, children: /* @__PURE__ */ l(
            I,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": N,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(on, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Ft, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
            te,
            {
              shouldFilter: !1,
              onKeyDown: (S) => {
                S.key === "Enter" && (L.current = S.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  he,
                  {
                    placeholder: w,
                    value: x,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: E, children: u }),
                  /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: W, children: c })
                ] }),
                /* @__PURE__ */ l(ee, { children: [
                  /* @__PURE__ */ r(Ce, { children: p }),
                  Object.values(D).map((S, q) => {
                    const k = F[S];
                    if (k.length !== 0)
                      return /* @__PURE__ */ l(Gn, { children: [
                        /* @__PURE__ */ r(
                          zt,
                          {
                            heading: sr(S, h, g, b, y),
                            children: k.map((Q) => /* @__PURE__ */ r(
                              wr,
                              {
                                bookId: Q,
                                isSelected: e.includes(Q),
                                onSelect: () => R(Q),
                                onMouseDown: (Nt) => C(Nt, Q),
                                section: le(Q),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Ue(Q, a),
                                className: "tw-flex tw-items-center"
                              },
                              Q
                            ))
                          }
                        ),
                        q < Object.values(D).length - 1 && /* @__PURE__ */ r(Qn, {})
                      ] }, S);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ l("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === $e ? $e : Bn
      ).map((S) => /* @__PURE__ */ r(Ze, { className: "hover:tw-bg-secondary", variant: "secondary", children: Kt(S, a) }, S)),
      e.length > $e && /* @__PURE__ */ r(
        Ze,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Bn} ${f}`
        }
      )
    ] })
  ] });
}
const yw = Object.freeze([
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
]), Ot = (t, e) => t[e] ?? e;
function Nw({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w,
  id: u
}) {
  const c = Ot(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = Ot(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = Ot(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = Ot(i, "%webView_scope_selector_current_book%"), g = Ot(i, "%webView_scope_selector_choose_books%"), b = Ot(i, "%webView_scope_selector_scope%"), y = Ot(i, "%webView_scope_selector_select_books%"), N = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: g, id: "scope-selected" }
  ], V = e ? N.filter((x) => e.includes(x.value)) : N;
  return /* @__PURE__ */ l("div", { id: u, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(rt, { children: b }),
      /* @__PURE__ */ r(
        un,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: V.map(({ value: x, label: _, id: G }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(xe, { className: "tw-me-2", value: x, id: G }),
            /* @__PURE__ */ r(rt, { htmlFor: G, children: _ })
          ] }, G))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(rt, { children: y }),
      /* @__PURE__ */ r(
        Fs,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: w
        }
      )
    ] })
  ] });
}
const ze = {
  [z("undefined")]: "Ø",
  [z(0)]: "A",
  [z(1)]: "B",
  [z(2)]: "C",
  [z(3)]: "D",
  [z(4)]: "E",
  [z(5)]: "F",
  [z(6)]: "G",
  [z(7)]: "H",
  [z(8)]: "I",
  [z(9)]: "J",
  [z(10)]: "K",
  [z(11)]: "L",
  [z(12)]: "M",
  [z(13)]: "N",
  [z(14)]: "O",
  [z(15)]: "P",
  [z(16)]: "Q",
  [z(17)]: "R",
  [z(18)]: "S",
  [z(19)]: "T",
  [z(20)]: "U",
  [z(21)]: "V",
  [z(22)]: "W",
  [z(23)]: "X",
  [z(24)]: "Y",
  [z(25)]: "Z"
};
function kw({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const w = {
    ...ze,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, p]) => [
          c,
          c === p && c in ze ? ze[c] : p
        ]
      )
    )
  }, u = at();
  return /* @__PURE__ */ l(
    Jt,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Bt, { size: a, className: d("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Zt,
          {
            placeholder: w[z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Gt,
          {
            id: i,
            align: u === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(pt, { value: `${c}`, children: w[z(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Cw({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function _w({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Rw({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(xn, {}) : ""
  ] });
}
function Mr(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function ye({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ir = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, u) => w.order - u.order).map((w) => /* @__PURE__ */ l(Nn, { children: [
  /* @__PURE__ */ r(kn, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    pr,
    {
      onClick: () => {
        o(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(ye, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(ye, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(Oa, { children: [
    /* @__PURE__ */ r(dr, { children: w.label }),
    /* @__PURE__ */ r(Da, { children: /* @__PURE__ */ r(cr, { children: Ir(
      t,
      e,
      Mr(t, w.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(Me, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function en({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: w
}) {
  return /* @__PURE__ */ l(_e, { variant: s, children: [
    /* @__PURE__ */ r(hn, { "aria-label": n, className: a, asChild: !0, id: w, children: /* @__PURE__ */ r(I, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Mo, {}) }) }),
    /* @__PURE__ */ r(fe, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, c]) => typeof u == "boolean" || typeof c == "boolean" ? 0 : u.order - c.order).map(([u], c, p) => /* @__PURE__ */ l(Gn, { children: [
      /* @__PURE__ */ r(lr, { children: /* @__PURE__ */ r(yn, { children: Ir(e.groups, e.items, u, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(Re, {})
    ] }, u)) })
  ] });
}
const Dr = m.forwardRef(
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
function Sw({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: w,
  endAreaChildren: u,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ l(Dr, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      en,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(Io, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    w && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        en,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Do, {}),
          className: "tw-h-full"
        }
      ),
      u
    ] })
  ] });
}
function Tw({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Dr, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    en,
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
const Or = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return /* @__PURE__ */ r(
    dt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Or.displayName = dt.List.displayName;
const Ar = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.List,
  {
    ref: n,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ar.displayName = dt.List.displayName;
const Hs = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Trigger,
  {
    ref: n,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Pr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Content,
  {
    ref: n,
    className: d(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Pr.displayName = dt.Content.displayName;
function Ew({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ l("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ l("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Cn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ l(Or, { children: [
      /* @__PURE__ */ r(Ar, { children: t.map((w) => /* @__PURE__ */ r(Hs, { value: w.value, children: w.value }, w.key)) }),
      t.map((w) => /* @__PURE__ */ r(Pr, { value: w.value, children: w.content }, w.key))
    ] })
  ] });
}
function Ys({ ...t }) {
  return /* @__PURE__ */ r(K.Menu, { ...t });
}
function Ks({ ...t }) {
  return /* @__PURE__ */ r(K.Sub, { "data-slot": "menubar-sub", ...t });
}
const Lr = m.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = m.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(mn.Provider, { value: a, children: /* @__PURE__ */ r(
    K.Root,
    {
      ref: o,
      className: d(
        "tw-flex tw-h-9 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1 tw-shadow-sm",
        t
      ),
      ...n
    }
  ) });
});
Lr.displayName = K.Root.displayName;
const $r = m.forwardRef(({ className: t, ...e }, n) => {
  const o = yt();
  return /* @__PURE__ */ r(
    K.Trigger,
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        Tt({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
$r.displayName = K.Trigger.displayName;
const zr = m.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = yt();
  return /* @__PURE__ */ l(
    K.SubTrigger,
    {
      ref: a,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Tt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(sn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
zr.displayName = K.SubTrigger.displayName;
const jr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.SubContent,
  {
    ref: n,
    className: d(
      "tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-menubar-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
jr.displayName = K.SubContent.displayName;
const Br = m.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = yt();
  return /* @__PURE__ */ r(K.Portal, { children: /* @__PURE__ */ r(
    K.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-z-50 tw-min-w-[12rem] tw-origin-[--radix-menubar-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
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
Br.displayName = K.Content.displayName;
const Gr = m.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = yt();
  return /* @__PURE__ */ r(
    K.Item,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Tt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Gr.displayName = K.Item.displayName;
const Us = m.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = yt();
  return /* @__PURE__ */ l(
    K.CheckboxItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Tt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(K.ItemIndicator, { children: /* @__PURE__ */ r(me, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Us.displayName = K.CheckboxItem.displayName;
const qs = m.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = yt();
  return /* @__PURE__ */ l(
    K.RadioItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Tt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(K.ItemIndicator, { children: /* @__PURE__ */ r(ke, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
qs.displayName = K.RadioItem.displayName;
const Js = m.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  K.Label,
  {
    ref: o,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Js.displayName = K.Label.displayName;
const Xr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Xr.displayName = K.Separator.displayName;
const ie = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Fr = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const w = e.filter((c) => c.group === s).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ l(Nn, { children: [
      /* @__PURE__ */ r(kn, { asChild: !0, children: "command" in c ? /* @__PURE__ */ l(
        Gr,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(ye, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(ye, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ l(Ks, { children: [
        /* @__PURE__ */ r(zr, { children: c.label }),
        /* @__PURE__ */ r(jr, { children: Fr(
          t,
          e,
          Mr(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Me, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), u = [...w];
    return w.length > 0 && i < a.length - 1 && u.push(/* @__PURE__ */ r(Xr, {}, `separator-${s}`)), u;
  });
};
function Zs({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = nt(void 0), s = nt(void 0), i = nt(void 0), w = nt(void 0), u = nt(void 0), c = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return w;
      case "platform.help":
        return u;
      default:
        return;
    }
  };
  if (Go(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var b, y, N, V;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        ie(s, [h]);
        break;
      case "alt+p":
        (b = s.current) == null || b.focus(), ie(s, [h, g]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), ie(i, [h, g]);
        break;
      case "alt+n":
        (N = w.current) == null || N.focus(), ie(w, [h, g]);
        break;
      case "alt+h":
        (V = u.current) == null || V.focus(), ie(u, [h, g]);
        break;
    }
  }), Vt(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((g) => {
      g.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const y = b.target.getAttribute("data-state");
          n(y === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((g) => {
      p.observe(g, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Lr, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ l(Ys, { children: [
      /* @__PURE__ */ r($r, { ref: c(p), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ r(
        Br,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(yn, { children: Fr(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function Vw(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Mw({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: w,
  shouldUseAsAppDragArea: u,
  menubarVariant: c = "default"
}) {
  const p = nt(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ l(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: u ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ l(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    Zs,
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
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: w
              }
            ) })
          ]
        }
      )
    }
  );
}
const Ws = (t, e) => t[e] ?? e;
function Iw({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w,
  id: u
}) {
  const c = Ws(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, f] = A(!1), h = (b) => {
    a && a(b), o && o([b, ...n.filter((y) => y !== b)]), s && n.find((y) => y === b) && s([...n.filter((y) => y !== b)]), f(!1);
  }, g = (b, y) => {
    var V, x, _, G, L, P;
    const N = y !== b ? ((x = (V = t[b]) == null ? void 0 : V.uiNames) == null ? void 0 : x[y]) ?? ((G = (_ = t[b]) == null ? void 0 : _.uiNames) == null ? void 0 : G.en) : void 0;
    return N ? `${(L = t[b]) == null ? void 0 : L.autonym} (${N})` : (P = t[b]) == null ? void 0 : P.autonym;
  };
  return /* @__PURE__ */ l("div", { id: u, className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      Jt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (b) => f(b),
        children: [
          /* @__PURE__ */ r(Bt, { children: /* @__PURE__ */ r(Zt, {}) }),
          /* @__PURE__ */ r(
            Gt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((b) => /* @__PURE__ */ r(pt, { value: b, children: g(b, e) }, b))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(rt, { className: "tw-font-normal tw-text-muted-foreground", children: wo(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((b) => g(b, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Qs({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(rt, { children: e(t) }) : n ? /* @__PURE__ */ r(rt, { children: n(t) }) : /* @__PURE__ */ r(rt, { children: t });
}
function Dw({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ l("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      vn,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(w),
        onCheckedChange: (u) => a(w, u)
      }
    ),
    /* @__PURE__ */ r(
      Qs,
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
function Ow({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: w,
  additionalSelectedContent: u,
  accentColor: c
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: d(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && w && /* @__PURE__ */ l(_e, { children: [
              /* @__PURE__ */ r(hn, { className: d(c && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(I, { className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Oo, {}) }) }),
              /* @__PURE__ */ r(fe, { align: "end", children: w })
            ] })
          ] }),
          e && u && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: u })
        ] }),
        c && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`
          }
        )
      ]
    },
    t
  );
}
const ti = ut(({ className: t, ...e }, n) => /* @__PURE__ */ r(Ao, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
ti.displayName = "Spinner";
function Aw({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: w = !1,
  className: u,
  defaultValue: c,
  value: p,
  onChange: f,
  onFocus: h,
  onBlur: g
}) {
  return /* @__PURE__ */ l("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      rt,
      {
        htmlFor: t,
        className: d({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${w ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      ge,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
        className: d(u, { "tw-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: f,
        onFocus: h,
        onBlur: g
      }
    ),
    /* @__PURE__ */ r("p", { className: d({ "tw-hidden": !a }), children: a })
  ] });
}
const ei = Mt(
  d(
    "tw-relative tw-w-full tw-rounded-lg tw-border tw-px-4 tw-py-3 tw-text-sm [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>svg~*]:tw-pl-7",
    // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
    // images (or svgs from file) as icons
    // Implemented by TJ Couch
    // Approved by Alex Mercado
    // 20 February 2025
    "[&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground"
  ),
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: d(
          "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive",
          // CUSTOM: see above
          "[&>img]:tw-text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), ni = m.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: d(
      "pr-twp",
      // CUSTOM
      ei({ variant: e }),
      t
    ),
    ...n
  }
));
ni.displayName = "Alert";
const ri = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ l(
    "h5",
    {
      ref: n,
      className: d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
ri.displayName = "AlertTitle";
const oi = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
oi.displayName = "AlertDescription";
const ai = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qt.Root,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
ai.displayName = Qt.Root.displayName;
const si = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qt.Image,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-aspect-square tw-h-full tw-w-full",
      t
    ),
    ...e
  }
));
si.displayName = Qt.Image.displayName;
const ii = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qt.Fallback,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
ii.displayName = Qt.Fallback.displayName;
const Pw = U.Root, Lw = U.Trigger, $w = U.Group, zw = U.Portal, jw = U.Sub, Bw = U.RadioGroup, wi = m.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ l(
  U.SubTrigger,
  {
    ref: a,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-ps-8",
      // CUSTOM: RTL support (was inset && tw-pl-8)
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(sn, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
wi.displayName = U.SubTrigger.displayName;
const li = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.SubContent,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
li.displayName = U.SubContent.displayName;
const di = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(U.Portal, { children: /* @__PURE__ */ r(
  U.Content,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
di.displayName = U.Content.displayName;
const ci = m.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  U.Item,
  {
    ref: o,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-ps-8",
      // CUSTOM: RTL support (was inset && tw-pl-8)
      t
    ),
    ...n
  }
));
ci.displayName = U.Item.displayName;
const pi = m.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ l(
  U.CheckboxItem,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r(
        "span",
        {
          className: d(
            // CUSTOM: removed tw-left-2
            "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",
            "tw-start-2"
            // CUSTOM: Support RTL
          ),
          children: /* @__PURE__ */ r(U.ItemIndicator, { children: /* @__PURE__ */ r(me, { className: "tw-h-4 tw-w-4" }) })
        }
      ),
      e
    ]
  }
));
pi.displayName = U.CheckboxItem.displayName;
const ui = m.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  U.RadioItem,
  {
    ref: o,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(U.ItemIndicator, { children: /* @__PURE__ */ r(ke, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
ui.displayName = U.RadioItem.displayName;
const mi = m.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  U.Label,
  {
    ref: o,
    className: d(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
mi.displayName = U.Label.displayName;
const hi = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
hi.displayName = U.Separator.displayName;
function fi({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
fi.displayName = "ContextMenuShortcut";
const Hr = m.createContext({
  direction: "bottom"
});
function gi({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = m.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Hr.Provider, { value: o, children: /* @__PURE__ */ r(
    mt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
gi.displayName = "Drawer";
const Gw = mt.Trigger, bi = mt.Portal, Xw = mt.Close, Yr = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Overlay,
  {
    ref: n,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Yr.displayName = mt.Overlay.displayName;
const vi = m.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = m.useContext(Hr), i = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-start-0 tw-me-24 tw-rounded-e-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-end-0 tw-ms-24 tw-rounded-s-[10px] tw-w-auto tw-max-w-sm"
  }, w = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    // same as shadcn default
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-me-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ms-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ l(bi, { children: [
    /* @__PURE__ */ r(Yr, {}),
    /* @__PURE__ */ l(
      mt.Content,
      {
        ref: a,
        className: d(
          // CUSTOM: Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "tw-fixed tw-z-50 tw-flex tw-h-auto tw-rounded-t-[10px] tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          // CUSTOM
          i[s],
          // CUSTOM
          t
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: w[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: w[s] })
        ]
      }
    )
  ] });
});
vi.displayName = "DrawerContent";
function xi({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
xi.displayName = "DrawerHeader";
function yi({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
yi.displayName = "DrawerFooter";
const Ni = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ni.displayName = mt.Title.displayName;
const ki = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ki.displayName = mt.Description.displayName;
const Ci = m.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Ye.Root,
  {
    ref: o,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-relative tw-h-2 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-primary/20",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Ye.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Ci.displayName = Ye.Root.displayName;
function Fw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    an.PanelGroup,
    {
      className: d(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const Hw = an.Panel;
function Yw({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    an.PanelResizeHandle,
    {
      className: d(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(ea, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Kw({ ...t }) {
  const { theme: e = "system" } = Xo();
  return /* @__PURE__ */ r(
    Fo,
    {
      theme: e,
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
const _i = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return /* @__PURE__ */ l(
    we.Root,
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(we.Track, { className: "tw-relative tw-h-1.5 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-primary/20", children: /* @__PURE__ */ r(we.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(we.Thumb, { className: "tw-block tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary/50 tw-bg-background tw-shadow tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
_i.displayName = we.Root.displayName;
const Ri = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return /* @__PURE__ */ r(
    Ke.Root,
    {
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-peer tw-inline-flex tw-h-5 tw-w-9 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-shadow-sm tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Ke.Thumb,
        {
          className: d(
            "pr-twp",
            // CUSTOM
            "tw-pointer-events-none tw-block tw-h-4 tw-w-4 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-4 data-[state=unchecked]:tw-translate-x-0",
            {
              // CUSTOM: Support RTL
              "data-[state=checked]:tw-translate-x-[-16px] data-[state=unchecked]:tw-translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
});
Ri.displayName = Ke.Root.displayName;
const Uw = dt.Root, Si = m.forwardRef(({ className: t, ...e }, n) => {
  const o = at();
  return /* @__PURE__ */ r(
    dt.List,
    {
      ref: n,
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-inline-flex tw-h-9 tw-items-center tw-justify-center tw-rounded-lg tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
Si.displayName = dt.List.displayName;
const Ti = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Trigger,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow",
      t
    ),
    ...e
  }
));
Ti.displayName = dt.Trigger.displayName;
const Ei = m.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Content,
  {
    ref: n,
    className: d(
      "pr-twp",
      // CUSTOM
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ei.displayName = dt.Content.displayName;
const Vi = m.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: d(
        "pr-twp",
        // CUSTOM
        "tw-flex tw-min-h-[60px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-2 tw-text-base tw-shadow-sm placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Vi.displayName = "Textarea";
const qw = (t, e) => {
  Vt(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Mi(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ii = (t, e, n = {}) => {
  const o = nt(e);
  o.current = e;
  const a = nt(n);
  a.current = Mi(a.current);
  const [s, i] = A(() => o.current), [w, u] = A(!0);
  return Vt(() => {
    let c = !0;
    return u(!!t), (async () => {
      if (t) {
        const p = await t();
        c && (i(() => p), u(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, w];
}, je = () => !1, Jw = (t, e) => {
  const [n] = Ii(
    X(async () => {
      if (!t) return je;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    je,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Vt(() => () => {
    n !== je && n();
  }, [n]);
}, Zw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = nt(null), [s, i] = A(void 0), [w, u] = A(void 0), c = X(
    (h) => {
      i(h);
      const g = t.find((y) => y.id === h);
      g && (e == null || e(g));
      const b = document.getElementById(h);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), a.current && a.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), p = X(
    (h) => {
      const g = t.find((b) => b.id === h);
      g && (u((b) => b === h ? void 0 : h), n == null || n(g));
    },
    [n, t]
  ), f = X(
    (h) => {
      const g = t.findIndex((N) => N.id === s);
      let b = g;
      switch (h.key) {
        case "ArrowDown":
          b = Math.min(g + 1, t.length - 1), h.preventDefault();
          break;
        case "ArrowUp":
          b = Math.max(g - 1, 0), h.preventDefault();
          break;
        case "Home":
          b = 0, h.preventDefault();
          break;
        case "End":
          b = t.length - 1, h.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), h.preventDefault(), h.stopPropagation();
          return;
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (o == null || o(h.key), h.preventDefault());
          return;
      }
      const y = t[b];
      y && c(y.id);
    },
    [t, c, s, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: w,
    handleKeyDown: f,
    focusOption: c
  };
};
function Di(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Di(`*, ::before, ::after {
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
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
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
  quotes: "0o201C""0o201D""0o2018""0o2019";
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
.tw-bottom-0 {
  bottom: 0px;
}
.tw-end-0 {
  inset-inline-end: 0px;
}
.tw-end-2 {
  inset-inline-end: 0.5rem;
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
.tw-right-2 {
  right: 0.5rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-0 {
  inset-inline-start: 0px;
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
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
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
.tw-me-24 {
  margin-inline-end: 6rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
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
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-24 {
  margin-inline-start: 6rem;
}
.tw-ms-4 {
  margin-inline-start: 1rem;
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
.tw-table {
  display: table;
}
.tw-table-cell {
  display: table-cell;
}
.tw-table-row {
  display: table-row;
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
.tw-h-1\\.5 {
  height: 0.375rem;
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
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[--radix-select-content-available-height\\] {
  max-height: var(--radix-select-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-max-h-\\[var\\(--radix-dropdown-menu-content-available-height\\)\\] {
  max-height: var(--radix-dropdown-menu-content-available-height);
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-\\[60px\\] {
  min-height: 60px;
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
.tw-min-w-10 {
  min-width: 2.5rem;
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
.tw-min-w-9 {
  min-width: 2.25rem;
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw-origin-\\[--radix-dropdown-menu-content-transform-origin\\] {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}
.tw-origin-\\[--radix-menubar-content-transform-origin\\] {
  transform-origin: var(--radix-menubar-content-transform-origin);
}
.tw-origin-\\[--radix-popover-content-transform-origin\\] {
  transform-origin: var(--radix-popover-content-transform-origin);
}
.tw-origin-\\[--radix-select-content-transform-origin\\] {
  transform-origin: var(--radix-select-content-transform-origin);
}
.tw-origin-\\[--radix-tooltip-content-transform-origin\\] {
  transform-origin: var(--radix-tooltip-content-transform-origin);
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
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-disc {
  list-style-type: disc;
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
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
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
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
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
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
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
.tw-rounded-e-\\[10px\\] {
  border-start-end-radius: 10px;
  border-end-end-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-s-\\[10px\\] {
  border-start-start-radius: 10px;
  border-end-start-radius: 10px;
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
.tw-border-l-4 {
  border-left-width: 4px;
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
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-primary\\/50 {
  border-color: hsl(var(--primary) / 0.5);
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
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
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
.tw-bg-primary\\/10 {
  background-color: hsl(var(--primary) / 0.1);
}
.tw-bg-primary\\/20 {
  background-color: hsl(var(--primary) / 0.2);
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
.tw-fill-primary {
  fill: hsl(var(--primary));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
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
.tw-pe-8 {
  padding-inline-end: 2rem;
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
.tw-pl-8 {
  padding-left: 2rem;
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
.tw-pr-8 {
  padding-right: 2rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-2 {
  padding-inline-start: 0.5rem;
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
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
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
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
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
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opacity\\] {
  transition-property: margin,opacity;
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
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
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
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
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
.focus\\:tw-ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
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
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
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
.data-\\[state\\=checked\\]\\:tw-translate-x-4[data-state="checked"] {
  --tw-translate-x: 1rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-16px\\][data-state="checked"] {
  --tw-translate-x: -16px;
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
.data-\\[placeholder\\]\\:tw-text-muted-foreground[data-placeholder] {
  color: hsl(var(--muted-foreground));
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
.data-\\[state\\=active\\]\\:tw-shadow[data-state="active"] {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--end-4 {
  inset-inline-end: -1rem;
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
.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-rotate-180 {
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
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-start-full::after {
  content: var(--tw-content);
  inset-inline-start: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
.dark\\:tw-border-destructive:is(.tw-dark *) {
  border-color: hsl(var(--destructive));
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
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}
.\\[\\&\\>\\[role\\=checkbox\\]\\]\\:tw-translate-y-\\[2px\\]>[role=checkbox] {
  --tw-translate-y: 2px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
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
[data-side=primary] .\\[\\[data-side\\=primary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "after-all");
export {
  ni as Alert,
  oi as AlertDescription,
  ri as AlertTitle,
  ai as Avatar,
  ii as AvatarFallback,
  si as AvatarImage,
  tw as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ew as BOOK_SELECTOR_STRING_KEYS,
  Ze as Badge,
  Qi as BookChapterControl,
  Ia as BookSelectionMode,
  nw as BookSelector,
  I as Button,
  gr as Card,
  ws as CardContent,
  is as CardDescription,
  ls as CardFooter,
  as as CardHeader,
  ss as CardTitle,
  Ma as ChapterRangeSelector,
  vn as Checkbox,
  Dw as Checklist,
  qe as ComboBox,
  te as Command,
  Ce as CommandEmpty,
  zt as CommandGroup,
  he as CommandInput,
  Xt as CommandItem,
  ee as CommandList,
  Pw as ContextMenu,
  pi as ContextMenuCheckboxItem,
  di as ContextMenuContent,
  $w as ContextMenuGroup,
  ci as ContextMenuItem,
  mi as ContextMenuLabel,
  zw as ContextMenuPortal,
  Bw as ContextMenuRadioGroup,
  ui as ContextMenuRadioItem,
  hi as ContextMenuSeparator,
  fi as ContextMenuShortcut,
  jw as ContextMenuSub,
  li as ContextMenuSubContent,
  wi as ContextMenuSubTrigger,
  Lw as ContextMenuTrigger,
  qa as DataTable,
  gi as Drawer,
  Xw as DrawerClose,
  vi as DrawerContent,
  ki as DrawerDescription,
  yi as DrawerFooter,
  xi as DrawerHeader,
  Yr as DrawerOverlay,
  bi as DrawerPortal,
  Ni as DrawerTitle,
  Gw as DrawerTrigger,
  _e as DropdownMenu,
  fn as DropdownMenuCheckboxItem,
  fe as DropdownMenuContent,
  lr as DropdownMenuGroup,
  pr as DropdownMenuItem,
  Wa as DropdownMenuItemType,
  gn as DropdownMenuLabel,
  Da as DropdownMenuPortal,
  Aa as DropdownMenuRadioGroup,
  ur as DropdownMenuRadioItem,
  Re as DropdownMenuSeparator,
  Pa as DropdownMenuShortcut,
  Oa as DropdownMenuSub,
  cr as DropdownMenuSubContent,
  dr as DropdownMenuSubTrigger,
  hn as DropdownMenuTrigger,
  Ja as ERROR_DUMP_STRING_KEYS,
  ow as ERROR_POPOVER_STRING_KEYS,
  Za as ErrorDump,
  aw as ErrorPopover,
  lw as Filter,
  sw as FilterDropdown,
  ww as Footer,
  os as FootnoteItem,
  dw as FootnoteList,
  gw as INVENTORY_STRING_KEYS,
  ge as Input,
  bw as Inventory,
  rt as Label,
  rw as MarkdownRenderer,
  iw as MoreInfo,
  es as MultiSelectComboBox,
  Ew as NavigationContentSearch,
  re as Popover,
  Zi as PopoverAnchor,
  Ft as PopoverContent,
  oe as PopoverTrigger,
  Ci as Progress,
  un as RadioGroup,
  xe as RadioGroupItem,
  _a as RecentSearches,
  Yw as ResizableHandle,
  Hw as ResizablePanel,
  Fw as ResizablePanelGroup,
  Ow as ResultsCard,
  yw as SCOPE_SELECTOR_STRING_KEYS,
  Nw as ScopeSelector,
  xw as ScriptureResultsViewer,
  kw as ScrollGroupSelector,
  Cn as SearchBar,
  Jt as Select,
  Gt as SelectContent,
  $a as SelectGroup,
  pt as SelectItem,
  ja as SelectLabel,
  hr as SelectScrollDownButton,
  mr as SelectScrollUpButton,
  Ba as SelectSeparator,
  Bt as SelectTrigger,
  Zt as SelectValue,
  xn as Separator,
  Cw as SettingsList,
  Rw as SettingsListHeader,
  _w as SettingsListItem,
  As as SettingsSidebar,
  vw as SettingsSidebarContentSearch,
  kr as Sidebar,
  _r as SidebarContent,
  _s as SidebarFooter,
  We as SidebarGroup,
  Ss as SidebarGroupAction,
  tn as SidebarGroupContent,
  Qe as SidebarGroupLabel,
  Cs as SidebarHeader,
  ks as SidebarInput,
  Cr as SidebarInset,
  Rr as SidebarMenu,
  Es as SidebarMenuAction,
  Vs as SidebarMenuBadge,
  Tr as SidebarMenuButton,
  Sr as SidebarMenuItem,
  Ms as SidebarMenuSkeleton,
  Is as SidebarMenuSub,
  Os as SidebarMenuSubButton,
  Ds as SidebarMenuSubItem,
  Nr as SidebarProvider,
  Ns as SidebarRail,
  Rs as SidebarSeparator,
  ys as SidebarTrigger,
  Je as Skeleton,
  _i as Slider,
  Kw as Sonner,
  ti as Spinner,
  Ri as Switch,
  en as TabDropdownMenu,
  Tw as TabFloatingMenu,
  Sw as TabToolbar,
  Se as Table,
  Ee as TableBody,
  Ua as TableCaption,
  $t as TableCell,
  Fa as TableFooter,
  ue as TableHead,
  Te as TableHeader,
  Rt as TableRow,
  Uw as Tabs,
  Ei as TabsContent,
  Si as TabsList,
  Ti as TabsTrigger,
  Aw as TextField,
  Vi as Textarea,
  xr as ToggleGroup,
  ve as ToggleGroupItem,
  Mw as Toolbar,
  Nn as Tooltip,
  Me as TooltipContent,
  yn as TooltipProvider,
  kn as TooltipTrigger,
  Iw as UiLanguageSelector,
  Or as VerticalTabs,
  Pr as VerticalTabsContent,
  Ar as VerticalTabsList,
  Hs as VerticalTabsTrigger,
  ts as badgeVariants,
  Ca as buttonVariants,
  d as cn,
  fw as getBookIdFromUSFM,
  mw as getLinesFromUSFM,
  hw as getNumberFromUSFM,
  ms as getStatusForItem,
  Vw as getToolbarOSReservedSpaceClassName,
  pw as inventoryCountColumn,
  cw as inventoryItemColumn,
  uw as inventoryStatusColumn,
  za as selectTriggerVariants,
  tl as sonner,
  qw as useEvent,
  Jw as useEventAsync,
  Zw as useListbox,
  Ii as usePromise,
  Wi as useRecentSearches,
  Ie as useSidebar
};
//# sourceMappingURL=index.js.map
