var Vi = Object.defineProperty;
var Li = (t, e, r) => e in t ? Vi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Rt = (t, e, r) => Li(t, typeof e != "symbol" ? e + "" : e, r);
import { r as Ft, Z as ji, B, c as f, a as Fi, C as Te, P as ze, b as Ie, d as De, e as Ve, f as Le, g as pe, h as _r, i as ta, T as ee, S as He, j as re, k as ae, l as oe, D as Ge, m as br, n as _e, o as Ne, p as Ce, u as Bi, q as Nr, s as Ye, t as Re, v as Da, w as cn, x as Ui, y as Ki, z as ln, A as dn, E as qi, F as Gi, G as Hi, H as Yi, I as da, J as wa, K as ir, L as Wi, M as Xi, N as Ji, O as Zi, Q as Qi, R as Cr, U as Ha } from "./resizable-CUvCloPJ.js";
import { V as Zh, W as Qh, X as tg, Y as eg, _ as rg, $ as ag, a0 as og, a1 as ng, a2 as ig } from "./resizable-CUvCloPJ.js";
import { jsx as a, jsxs as u, Fragment as tt } from "react/jsx-runtime";
import { Canon as dt } from "@sillsdev/scripture";
import { includes as Rr, Section as Z, getChaptersForBook as ts, formatScrRef as ye, getSectionForBook as fr, formatRelativeDate as es, formatReplacementString as xe, sanitizeHtml as wn, NumberFormat as rs, formatBytes as as, getCurrentLocale as os, usfmMarkers as jr, getFormatCallerFunction as ns, deepEqual as is, isString as vo, compareScrRefs as Sa, scrRefToBBBCCCVVV as ua, defaultScrRef as pa, formatScrRefRange as ss, getLocalizeKeyForScrollGroupId as bo, collectUsjMarkers as cs } from "platform-bible-utils";
import { Check as Ae, Clock as xo, ChevronsLeft as yo, ChevronsRight as ko, ChevronLeft as Oa, ChevronRight as $a, ArrowLeft as ls, ArrowRight as ds, ChevronDown as or, BoldIcon as ws, ItalicIcon as us, X as ea, AtSign as un, Pencil as ps, Trash2 as hs, ArrowUp as pn, MoreHorizontal as gs, MailOpen as fs, Mail as ms, ChevronUp as vs, FilterIcon as bs, ArrowLeftIcon as xs, ChevronLeftIcon as ys, ChevronRightIcon as ks, ArrowRightIcon as _s, Copy as hn, Filter as Ns, User as Cs, Link as Es, CircleHelp as Ts, ChevronsUpDown as gn, Star as zs, Undo as Ds, Redo as Ss, SquareX as fn, FunctionSquare as mn, SquareSigma as vn, Ban as Os, AlertCircle as Ma, CircleCheckIcon as $s, CircleXIcon as Ms, CircleHelpIcon as Rs, ArrowUpIcon as As, ArrowDownIcon as Ps, Search as Is, LoaderCircle as Vs, ScrollText as Ls, MenuIcon as js, Menu as Fs, EllipsisVertical as Bs, MoreVertical as _o } from "lucide-react";
import ut, { useRef as q, useMemo as L, useState as N, useCallback as j, useEffect as Y, useLayoutEffect as Jt, createContext as Ya, useContext as bn, Component as Us, createElement as No, Suspense as Ks, forwardRef as ra, useId as qs, Fragment as xn } from "react";
import { Dialog as he, Label as Gs, RadioGroup as Ra, ToggleGroup as yn, Slot as sr, Avatar as Wa, Select as Pt, Checkbox as Co, Tabs as le, Menubar as me, ContextMenu as Dt, Progress as Eo, Slider as Ar, Switch as To } from "radix-ui";
import { createEditor as kn, $getRoot as Pe, $createParagraphNode as Er, $getSelection as jt, HISTORY_MERGE_TAG as Xa, ParagraphNode as _n, TextNode as Nn, $getPreviousSelection as Hs, $isRangeSelection as ge, $caretFromPoint as Ys, $getSiblingCaret as Cn, $getChildCaret as Ws, $getAdjacentChildCaret as Xs, $isChildCaret as Js, $normalizeCaret as Zs, $setSelectionFromCaretRange as Qs, $getCollapsedCaretRange as tc, $getCaretInDirection as zo, $splitAtPointCaretNext as ec, $isTextPointCaret as rc, $findMatchingParent as En, $isElementNode as xr, mergeRegister as Ee, getDOMTextNode as ac, isHTMLElement as oc, CLEAR_EDITOR_COMMAND as Tn, COMMAND_PRIORITY_EDITOR as Ja, shallowMergeConfig as nc, defineExtension as ne, safeCast as Qe, createState as ic, FORMAT_TEXT_COMMAND as zn, $isNodeSelection as Dn, COMMAND_PRIORITY_LOW as Sn, RootNode as sc, LineBreakNode as cc, TabNode as lc, $isEditorState as dc, createCommand as wc, CLICK_COMMAND as uc, isDOMNode as pc, $getNodeFromDOMNode as hc, $createNodeSelection as gc, $setSelection as fc, $getEditor as mc, DecoratorNode as Aa, $getState as vc, toggleTextFormatType as Do, TEXT_TYPE_TO_FORMAT as bc, $setState as xc, addClassNamesToElement as On, $create as yc, $getNodeByKey as kc, removeClassNamesFromElement as _c, KEY_TAB_COMMAND as Nc, $isBlockElementNode as Cc, $createRangeSelection as Ec, $normalizeSelection__EXPERIMENTAL as Tc, OUTDENT_CONTENT_COMMAND as zc, INDENT_CONTENT_COMMAND as So, INSERT_TAB_COMMAND as Dc, COMMAND_PRIORITY_CRITICAL as Za, $isDecoratorNode as Sc, $isParagraphNode as Oc, $isTextNode as Pa, SELECTION_CHANGE_COMMAND as $n, $insertNodes as $c } from "lexical";
import { HeadingNode as Mc, QuoteNode as Rc, registerRichText as Ac } from "@lexical/rich-text";
import { flushSync as Pc, createPortal as Ic } from "react-dom";
import { IconX as Vc, IconCheck as aa, IconChevronDown as Lc, IconChevronUp as jc, IconSelector as Fc, IconLayoutSidebar as Bc, IconLayoutSidebarRight as Uc, IconChevronRight as Mn, IconLoader as Kc, IconAlertOctagon as qc, IconAlertTriangle as Gc, IconInfoCircle as Hc, IconCircleCheck as Yc } from "@tabler/icons-react";
import { $isTableSelection as Wc } from "@lexical/table";
import { cva as Tr } from "class-variance-authority";
import { createHeadlessEditor as Rn } from "@lexical/headless";
import { $generateHtmlFromNodes as Xc, $generateNodesFromDOM as Jc } from "@lexical/html";
import { useReactTable as An, getFilteredRowModel as Zc, getSortedRowModel as Pn, getPaginationRowModel as Qc, getCoreRowModel as In, flexRender as mr, getGroupedRowModel as tl, getExpandedRowModel as el } from "@tanstack/react-table";
import rl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Ia, HIDDEN_NOTE_CALLER as Va, getDefaultViewOptions as al, isInsertEmbedOpOfType as Pr, Editorial as ol } from "@eten-tech-foundation/platform-editor";
import { useHotkeys as nl } from "react-hotkeys-hook";
import { Drawer as je } from "vaul";
import { useTheme as il } from "next-themes";
import { Toaster as sl } from "sonner";
import { toast as cg } from "sonner";
function La({ ...t }) {
  return /* @__PURE__ */ a(he.Root, { "data-slot": "dialog", ...t });
}
function qu({ ...t }) {
  return /* @__PURE__ */ a(he.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function cl({ ...t }) {
  return /* @__PURE__ */ a(he.Portal, { "data-slot": "dialog-portal", ...t });
}
function Gu({ ...t }) {
  return /* @__PURE__ */ a(he.Close, { "data-slot": "dialog-close", ...t });
}
function ll({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    he.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: f(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Fi, ...e },
      ...r
    }
  );
}
function ja({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...i
}) {
  const s = Ft();
  return /* @__PURE__ */ u(cl, { children: [
    /* @__PURE__ */ a(ll, { className: o }),
    /* @__PURE__ */ u(
      he.Content,
      {
        "data-slot": "dialog-content",
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ji, ...n },
        dir: s,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ a(he.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ u(B, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ a(Vc, {}),
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function qr({ className: t, ...e }) {
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
function Oo({
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
        e && /* @__PURE__ */ a(he.Close, { asChild: !0, children: /* @__PURE__ */ a(B, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Gr({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    he.Title,
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
function Hu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    he.Description,
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
function zr({ className: t, type: e, ...r }) {
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
function Yu({ className: t, ...e }) {
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
const Vn = (t, e, r, o, n) => {
  switch (t) {
    case Z.OT:
      return e ?? "Old Testament";
    case Z.NT:
      return r ?? "New Testament";
    case Z.DC:
      return o ?? "Deuterocanon";
    case Z.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, dl = (t, e, r, o, n) => {
  switch (t) {
    case Z.OT:
      return e ?? "OT";
    case Z.NT:
      return r ?? "NT";
    case Z.DC:
      return o ?? "DC";
    case Z.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Me(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? dt.bookIdToEnglishName(t);
}
function Qa(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Ln = dt.allBookIds.filter(
  (t) => !dt.isObsolete(dt.bookIdToNumber(t))
), se = Object.fromEntries(
  Ln.map((t) => [t, dt.bookIdToEnglishName(t)])
);
function to(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const n = dt.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(Rr(n.toLowerCase(), o) || Rr(t.toLowerCase(), o) || (i ? Rr(i.localizedName.toLowerCase(), o) || Rr(i.localizedId.toLowerCase(), o) : !1));
}
function jn({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: n,
  section: i,
  className: s,
  showCheck: c = !1,
  localizedBookNames: d,
  commandValue: l,
  disabled: w = !1
}) {
  const p = q(!1), g = () => {
    w || (p.current || o == null || o(e), setTimeout(() => {
      p.current = !1;
    }, 100));
  }, h = (v) => {
    if (w) {
      v.preventDefault();
      return;
    }
    p.current = !0, n ? n(v) : o == null || o(e);
  }, m = L(
    () => Me(e, d),
    [e, d]
  ), y = L(
    () => Qa(e, d),
    [e, d]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: f(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === Z.OT,
          "tw:border-s-purple-200": i === Z.NT,
          "tw:border-s-indigo-200": i === Z.DC,
          "tw:border-s-amber-200": i === Z.Extra
        }
      ),
      children: /* @__PURE__ */ u(
        Te,
        {
          ref: t,
          value: l || `${e} ${dt.bookIdToEnglishName(e)}`,
          onSelect: g,
          onMouseDown: h,
          role: "option",
          "aria-selected": r,
          "aria-disabled": w || void 0,
          "aria-label": `${dt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: w,
          className: f(s, w && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            c && /* @__PURE__ */ a(
              Ae,
              {
                className: f(
                  "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                  r ? "tw:opacity-100" : "tw:opacity-0"
                )
              }
            ),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: m }),
            /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: y })
          ]
        }
      )
    }
  );
}
function Fn(t, e, r) {
  return `${t} ${se[t]}${e ? ` ${Qa(t, e)} ${Me(t, e)}` : ""}`;
}
function wl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: c,
  buttonClassName: d = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: l = "ghost"
}) {
  const [w, p] = N(!1);
  if (t.length === 0)
    return;
  const g = (h) => {
    e(h), p(!1);
  };
  return /* @__PURE__ */ u(ze, { open: w, onOpenChange: p, children: [
    /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ a(
      B,
      {
        variant: l,
        size: "icon",
        className: d,
        "aria-label": n,
        children: /* @__PURE__ */ a(xo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(De, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Ve, { children: /* @__PURE__ */ a(Le, { children: /* @__PURE__ */ a(pe, { heading: i, children: t.map((h) => /* @__PURE__ */ u(
      Te,
      {
        onSelect: () => g(h),
        className: f("tw:flex tw:items-center", c),
        children: [
          /* @__PURE__ */ a(xo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(h) })
        ]
      },
      o(h)
    )) }) }) }) })
  ] });
}
function Wu(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Fr = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, ul = [
  Fr.BOOK_ONLY,
  Fr.BOOK_CHAPTER,
  Fr.BOOK_CHAPTER_VERSE
];
function pl(t) {
  return Fr.BOOK_CHAPTER_VERSE.test(t.trim());
}
function $o(t, e) {
  return dt.bookIdToNumber(t) < dt.bookIdToNumber(e.book);
}
function hl(t, e, r) {
  const o = dt.bookIdToNumber(t) - dt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function ha(t, e, r, o) {
  const n = dt.bookIdToNumber(t) - dt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Mo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function ue(t) {
  return ts(dt.bookIdToNumber(t));
}
function gl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = ul.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, d = void 0, l = void 0] = s.slice(1);
        let w;
        const p = e.filter((g) => to(g, c, r));
        if (p.length === 1 && ([w] = p), !w && d) {
          if (dt.isBookIdValid(c)) {
            const g = c.toUpperCase();
            e.includes(g) && (w = g);
          }
          if (!w && r) {
            const g = Array.from(r.entries()).find(
              ([, h]) => h.localizedId.toLowerCase() === c.toLowerCase()
            );
            g && e.includes(g[0]) && ([w] = g);
          }
        }
        if (!w && d) {
          const h = ((m) => Object.keys(se).find(
            (y) => se[y].toLowerCase() === m.toLowerCase()
          ))(c);
          if (h && e.includes(h) && (w = h), !w && r) {
            const m = Array.from(r.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === c.toLowerCase()
            );
            m && e.includes(m[0]) && ([w] = m);
          }
        }
        if (w) {
          let g = d ? parseInt(d, 10) : void 0;
          g && g > ue(w) && (g = Math.max(ue(w), 1));
          const h = l ? parseInt(l, 10) : void 0;
          return {
            book: w,
            chapterNum: g,
            verseNum: h
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function fl(t, e, r, o) {
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
        const l = e[d - 1], w = Math.max(ue(l), 1);
        o({
          book: l,
          chapterNum: w,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = j(() => {
    const d = ue(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const l = e.indexOf(t.book);
      if (l < e.length - 1) {
        const w = e[l + 1];
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
  }, [t, o]), c = j(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return L(() => [
    {
      onClick: n,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: r === "ltr" ? yo : ko
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: r === "ltr" ? Oa : $a
    },
    {
      onClick: c,
      disabled: e.length === 0,
      title: "Next verse",
      icon: r === "ltr" ? $a : Oa
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === ue(t.book) || ue(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: r === "ltr" ? ko : yo
    }
  ], [
    t,
    e,
    r,
    n,
    s,
    c,
    i
  ]);
}
function Bn({
  count: t,
  valueBuilder: e,
  onSelect: r,
  itemRef: o,
  isDisabled: n,
  isDimmed: i,
  isSelected: s,
  className: c
}) {
  if (!(t <= 0))
    return /* @__PURE__ */ a(pe, { children: /* @__PURE__ */ a("div", { className: f("tw:grid tw:grid-cols-6 tw:gap-1", c), children: Array.from({ length: t }, (d, l) => l + 1).map((d) => {
      const l = (n == null ? void 0 : n(d)) ?? !1;
      return /* @__PURE__ */ a(
        Te,
        {
          value: e(d),
          onSelect: () => {
            l || r(d);
          },
          ref: o(d),
          disabled: l,
          "aria-disabled": l || void 0,
          className: f(
            "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
            {
              "tw:bg-primary tw:text-primary-foreground": (s == null ? void 0 : s(d)) ?? !1
            },
            {
              "tw:bg-muted/50 tw:text-muted-foreground/50": ((i == null ? void 0 : i(d)) ?? !1) && !l
            },
            l && "tw:cursor-not-allowed tw:opacity-40"
          ),
          children: d
        },
        d
      );
    }) }) });
}
function Ro({
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
      Bn,
      {
        count: ue(t),
        valueBuilder: (c) => `${t} ${se[t] || ""} ${c}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: s
      }
    );
}
function Ao({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: i,
  isVerseDimmed: s,
  isVerseDisabled: c,
  className: d
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      Bn,
      {
        count: r,
        valueBuilder: (l) => `${t} ${se[t] || ""} ${e}:${l}`,
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (l) => t === o.book && e === o.chapterNum && l === o.verseNum,
        className: d
      }
    );
}
function ga({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: o,
  localizedBookNames: n,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: c,
  id: d,
  getEndVerse: l,
  disableReferencesUpTo: w,
  submitKeys: p,
  triggerContent: g,
  triggerVariant: h = "outline",
  onOpenChange: m,
  onCloseAutoFocus: y,
  modal: v = !1,
  align: T = "center"
}) {
  const C = Ft(), [k, _] = N(!1), [I, F] = N(""), [V, $] = N(""), [x, z] = N("books"), [A, S] = N(void 0), [O, W] = N(
    void 0
  ), [K, M] = N(void 0), [Q, mt] = N(!1), ct = q(null), Bt = q(!1), bt = q(void 0), St = q(void 0), U = q(void 0), rt = q(void 0), ot = q({}), nt = q({}), it = j(
    (b) => {
      e(b), c && c(b);
    },
    [e, c]
  ), It = L(() => o ? o() : Ln, [o]), vt = L(() => ({
    [Z.OT]: It.filter((G) => dt.isBookOT(G)),
    [Z.NT]: It.filter((G) => dt.isBookNT(G)),
    [Z.DC]: It.filter((G) => dt.isBookDC(G)),
    [Z.Extra]: It.filter((G) => dt.extraBooks().includes(G))
  }), [It]), Ut = L(() => Object.values(vt).flat(), [vt]), Kt = L(() => {
    if (!V.trim()) return vt;
    const b = {
      [Z.OT]: [],
      [Z.NT]: [],
      [Z.DC]: [],
      [Z.Extra]: []
    };
    return [Z.OT, Z.NT, Z.DC, Z.Extra].forEach((J) => {
      b[J] = vt[J].filter((Et) => to(Et, V, n));
    }), b;
  }, [vt, V, n]), D = L(
    () => gl(V, Ut, n),
    [V, Ut, n]
  ), Ot = q(!1);
  Y(() => {
    if (!Ot.current) {
      Ot.current = !0;
      return;
    }
    m == null || m(k);
  }, [k, m]);
  const Vt = j(() => {
    if (D) {
      const b = D.chapterNum ?? 1, G = D.verseNum ?? 1;
      if (w && ha(D.book, b, G, w))
        return;
      it({
        book: D.book,
        chapterNum: b,
        verseNum: G
      }), _(!1), $(""), F("");
    }
  }, [it, D, w]), ie = j(
    (b) => {
      const G = O ?? (D == null ? void 0 : D.book), J = K ?? (D == null ? void 0 : D.chapterNum);
      !G || !J || (it({
        book: G,
        chapterNum: J,
        verseNum: b
      }), _(!1));
    },
    [it, O, K, D]
  ), qt = j(
    (b) => {
      if (w && $o(b, w)) return;
      if (ue(b) <= 1) {
        it({
          book: b,
          chapterNum: 1,
          verseNum: 1
        }), _(!1), $("");
        return;
      }
      S(b), z("chapters");
    },
    [it, w]
  ), $t = j(
    (b) => {
      const G = x === "chapters" ? A : D == null ? void 0 : D.book;
      if (G) {
        if (l && l(G, b) > 1) {
          W(G), M(b), z("verses"), F("");
          return;
        }
        it({
          book: G,
          chapterNum: b,
          verseNum: 1
        }), _(!1);
      }
    },
    [it, x, A, D, l]
  ), Se = j(
    (b) => {
      it(b), _(!1), $("");
    },
    [it]
  ), Gt = fl(t, Ut, C, e), Ht = j(() => {
    z("books"), S(void 0), W(void 0), M(void 0), setTimeout(() => {
      St.current && St.current.focus();
    }, 0);
  }, []), P = j(() => {
    const b = O;
    W(void 0), M(void 0), b ? (S(b), z("chapters"), F("")) : Ht();
  }, [O, Ht]), H = j((b) => {
    _(b), b && (z("books"), S(void 0), W(void 0), M(void 0), $(""));
  }, []), { otLong: st, ntLong: at, dcLong: ht, extraLong: xt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, yt = j(
    (b) => Vn(b, st, at, ht, xt),
    [st, at, ht, xt]
  ), gt = j(
    (b) => D ? !!D.chapterNum && !b.toString().includes(D.chapterNum.toString()) : !1,
    [D]
  ), Ct = L(
    () => ye(
      t,
      n ? Me(t.book, n) : "English"
    ),
    [t, n]
  ), E = j((b) => (G) => {
    ot.current[b] = G;
  }, []), wt = j((b) => (G) => {
    nt.current[b] = G;
  }, []), pt = L(
    () => pl(V),
    [V]
  ), kt = L(() => !l || !D || !D.chapterNum || !pt ? !1 : l(D.book, D.chapterNum) > 0, [l, D, pt]), Fe = j(
    (b) => w ? $o(b, w) : !1,
    [w]
  ), Oe = j(
    (b) => (G) => w ? hl(b, G, w) : !1,
    [w]
  ), lr = j(
    (b, G) => (J) => w ? ha(b, G, J, w) : !1,
    [w]
  ), Be = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", dr = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", wr = j(
    (b) => {
      (b.key === "Home" || b.key === "End") && b.stopPropagation(), p && p.includes(b.key) && D && D.chapterNum !== void 0 && D.verseNum !== void 0 && (b.preventDefault(), b.stopPropagation(), Vt());
    },
    [p, D, Vt]
  ), Dr = j(
    (b) => {
      var Zt, tr, ur;
      if (b.ctrlKey) return;
      const { isLetter: G, isDigit: J } = Mo(b.key);
      if ((x === "chapters" || x === "verses") && (b.key === " " || b.key === "Enter")) {
        const Mt = b.target instanceof HTMLElement ? b.target : void 0;
        if (!!(Mt != null && Mt.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          b.stopPropagation();
          return;
        }
        const Tt = (Zt = bt.current) == null ? void 0 : Zt.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Tt) {
          b.preventDefault(), b.stopPropagation(), Tt.click();
          return;
        }
      }
      if ((x === "chapters" || x === "verses") && (G || J)) {
        b.preventDefault(), b.stopPropagation();
        return;
      }
      if (x === "chapters" && b.key === "Backspace") {
        b.preventDefault(), b.stopPropagation(), Ht();
        return;
      }
      if (x === "verses" && b.key === "Backspace") {
        b.preventDefault(), b.stopPropagation(), P();
        return;
      }
      const Et = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(b.key);
      if (x === "verses" && Et) {
        const Mt = O, _t = K;
        if (!Mt || !_t || !l) return;
        const Tt = l(Mt, _t);
        if (!Tt) return;
        (tr = bt.current) == null || tr.focus();
        const ft = (() => {
          if (!I) return 1;
          const Ue = I.match(/:(\d+)$/);
          return Ue ? parseInt(Ue[1], 10) : 0;
        })();
        let Yt = ft;
        const Wt = 6;
        switch (b.key) {
          case "ArrowLeft":
            ft !== 0 && (Yt = ft > 1 ? ft - 1 : Tt);
            break;
          case "ArrowRight":
            ft !== 0 && (Yt = ft < Tt ? ft + 1 : 1);
            break;
          case "ArrowUp":
            Yt = ft === 0 ? Tt : Math.max(1, ft - Wt);
            break;
          case "ArrowDown":
            Yt = ft === 0 ? 1 : Math.min(Tt, ft + Wt);
            break;
          default:
            return;
        }
        Yt !== ft && (b.preventDefault(), b.stopPropagation(), F(
          `${Mt} ${se[Mt] || ""} ${_t}:${Yt}`
        ), setTimeout(() => {
          const Ue = nt.current[Yt];
          Ue && Ue.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if ((x === "chapters" || x === "books" && D) && Et) {
        const Mt = x === "chapters" ? A : D == null ? void 0 : D.book;
        if (!Mt) return;
        x === "chapters" && ((ur = bt.current) == null || ur.focus());
        const _t = (() => {
          if (!I) return 1;
          const Wt = I.match(/(\d+)$/);
          return Wt ? parseInt(Wt[1], 10) : 0;
        })(), Tt = ue(Mt);
        if (!Tt) return;
        let ft = _t;
        const Yt = 6;
        switch (b.key) {
          case "ArrowLeft":
            _t !== 0 && (ft = _t > 1 ? _t - 1 : Tt);
            break;
          case "ArrowRight":
            _t !== 0 && (ft = _t < Tt ? _t + 1 : 1);
            break;
          case "ArrowUp":
            ft = _t === 0 ? Tt : Math.max(1, _t - Yt);
            break;
          case "ArrowDown":
            ft = _t === 0 ? 1 : Math.min(Tt, _t + Yt);
            break;
          default:
            return;
        }
        ft !== _t && (b.preventDefault(), b.stopPropagation(), F(
          `${Mt} ${se[Mt] || ""} ${ft}`
        ), setTimeout(() => {
          const Wt = ot.current[ft];
          Wt && Wt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      D,
      Ht,
      P,
      A,
      O,
      K,
      l,
      I
    ]
  ), Sr = j((b) => {
    var Et;
    if (b.shiftKey || b.key === "Tab" || b.key === " ") return;
    if (b.key === "Enter") {
      b.stopPropagation();
      return;
    }
    if (b.key === "ArrowUp" || b.key === "ArrowDown") {
      (Et = St.current) == null || Et.focus();
      return;
    }
    const { isLetter: G, isDigit: J } = Mo(b.key);
    (G || J) && (b.preventDefault(), $((Zt) => Zt + b.key), St.current.focus(), mt(!1));
  }, []);
  return Jt(() => {
    const b = setTimeout(() => {
      if (k && x === "books" && U.current && rt.current) {
        const G = U.current, J = rt.current, Et = J.offsetTop, Zt = G.clientHeight, tr = J.clientHeight, ur = Et - Zt / 2 + tr / 2;
        G.scrollTo({
          top: Math.max(0, ur),
          behavior: "smooth"
        }), F(Fn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(b);
    };
  }, [k, x, V, D, t.book]), Jt(() => {
    if (x === "chapters" && A) {
      const b = A === t.book, G = b ? t.chapterNum : 1;
      F(
        `${A} ${se[A] || ""} ${G}`
      ), setTimeout(() => {
        if (U.current)
          if (b) {
            const J = ot.current[t.chapterNum];
            J && J.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            U.current.scrollTo({ top: 0 });
        bt.current && bt.current.focus();
      }, 0);
    }
  }, [x, A, D, t.book, t.chapterNum]), Jt(() => {
    if (x === "verses" && O && K !== void 0) {
      const b = O === t.book && K === t.chapterNum, G = b ? t.verseNum : 1;
      F(
        `${O} ${se[O] || ""} ${K}:${G}`
      ), setTimeout(() => {
        if (U.current)
          if (b) {
            const J = nt.current[t.verseNum];
            J && J.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            U.current.scrollTo({ top: 0 });
        bt.current && bt.current.focus();
      }, 0);
    }
  }, [
    x,
    O,
    K,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u(ze, { open: k, onOpenChange: H, modal: v, children: [
    /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ a(
      B,
      {
        ref: ct,
        "aria-label": "book-chapter-trigger",
        variant: h,
        role: "combobox",
        "aria-expanded": k,
        className: f(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (b) => {
          Bt.current && (Bt.current = !1, b.preventDefault());
        },
        children: g ?? /* @__PURE__ */ a("span", { className: "tw:truncate", children: Ct })
      }
    ) }),
    /* @__PURE__ */ a(
      De,
      {
        id: d,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: T,
        onKeyDownCapture: Dr,
        onKeyDown: (b) => b.stopPropagation(),
        onPointerDownOutside: (b) => {
          const { target: G } = b;
          k && ct.current && G instanceof Node && ct.current.contains(G) && (Bt.current = !0, H(!1));
        },
        onCloseAutoFocus: y,
        children: /* @__PURE__ */ u(
          Ve,
          {
            ref: bt,
            loop: !0,
            value: I,
            onValueChange: F,
            shouldFilter: !1,
            children: [
              x === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    _r,
                    {
                      ref: St,
                      value: V,
                      onValueChange: $,
                      onKeyDown: wr,
                      onFocus: () => mt(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : ""
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    wl,
                    {
                      recentSearches: s,
                      onSearchItemSelect: Se,
                      renderItem: (b) => ye(b, "English"),
                      getItemKey: (b) => `${b.book}-${b.chapterNum}-${b.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: Gt.map(({ onClick: b, disabled: G, title: J, icon: Et }) => /* @__PURE__ */ a(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      mt(!0), b();
                    },
                    disabled: G,
                    className: "tw:h-10 tw:w-4 tw:p-0",
                    title: J,
                    onKeyDown: Sr,
                    children: /* @__PURE__ */ a(Et, {})
                  },
                  J
                )) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: x === "verses" ? P : Ht,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: C === "ltr" ? /* @__PURE__ */ a(ls, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(ds, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                x === "chapters" && A && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: Me(A, n) }),
                x === "verses" && O && K !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${Me(O, n)} ${K}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: x === "verses" ? dr : Be
                  }
                )
              ] }),
              !Q && /* @__PURE__ */ u(Le, { ref: U, children: [
                x === "books" && /* @__PURE__ */ u(tt, { children: [
                  !D && Object.entries(Kt).map(([b, G]) => {
                    if (G.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(pe, { heading: yt(b), children: G.map((J) => /* @__PURE__ */ a(
                          jn,
                          {
                            bookId: J,
                            onSelect: (Et) => qt(Et),
                            section: fr(J),
                            commandValue: `${J} ${se[J]}`,
                            ref: J === t.book ? rt : void 0,
                            localizedBookNames: n,
                            disabled: Fe(J)
                          },
                          J
                        )) }, b)
                      );
                  }),
                  D && /* @__PURE__ */ a(pe, { children: /* @__PURE__ */ a(
                    Te,
                    {
                      value: `${D.book} ${se[D.book]} ${D.chapterNum || ""}:${D.verseNum || ""})}`,
                      onSelect: Vt,
                      disabled: !!w && ha(
                        D.book,
                        D.chapterNum ?? 1,
                        D.verseNum ?? 1,
                        w
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: ye(
                        {
                          book: D.book,
                          chapterNum: D.chapterNum ?? 1,
                          verseNum: D.verseNum ?? 1
                        },
                        n ? Qa(D.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  D && kt && D.chapterNum && l && /* @__PURE__ */ u(tt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${Me(D.book, n)} ${D.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: dr })
                    ] }),
                    /* @__PURE__ */ a(
                      Ao,
                      {
                        bookId: D.book,
                        chapterNum: D.chapterNum,
                        endVerse: l(D.book, D.chapterNum),
                        scrRef: t,
                        onVerseSelect: ie,
                        setVerseRef: wt,
                        isVerseDisabled: lr(D.book, D.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  D && !kt && ue(D.book) > 1 && /* @__PURE__ */ u(tt, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: Me(D.book, n) }),
                      /* @__PURE__ */ a("span", { children: Be })
                    ] }),
                    /* @__PURE__ */ a(
                      Ro,
                      {
                        bookId: D.book,
                        scrRef: t,
                        onChapterSelect: $t,
                        setChapterRef: E,
                        isChapterDimmed: gt,
                        isChapterDisabled: Oe(D.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                x === "chapters" && A && /* @__PURE__ */ a(
                  Ro,
                  {
                    bookId: A,
                    scrRef: t,
                    onChapterSelect: $t,
                    setChapterRef: E,
                    isChapterDisabled: Oe(A),
                    className: "tw:p-4"
                  }
                ),
                x === "verses" && O && K !== void 0 && l && /* @__PURE__ */ a(
                  Ao,
                  {
                    bookId: O,
                    chapterNum: K,
                    endVerse: l(O, K),
                    scrRef: t,
                    onVerseSelect: ie,
                    setVerseRef: wt,
                    isVerseDisabled: lr(
                      O,
                      K
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
const Xu = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function Nt({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Gs.Root,
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
function Un({
  className: t,
  ...e
}) {
  const r = Ft();
  return /* @__PURE__ */ a(
    Ra.Root,
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
function Fa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Ra.Item,
    {
      "data-slot": "radio-group-item",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Ra.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ a("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function ml(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Po({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: d = ml,
  getButtonLabel: l,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: g = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: y = "start",
  isDisabled: v = !1,
  ariaLabel: T,
  ...C
}) {
  const [k, _] = N(!1), I = l ?? d, F = ($) => $.length > 0 && typeof $[0] == "object" && "options" in $[0], V = ($, x) => {
    const z = d($), A = typeof $ == "object" && "secondaryLabel" in $ ? $.secondaryLabel : void 0, S = `${x ?? ""}${z}${A ?? ""}`;
    return /* @__PURE__ */ u(
      Te,
      {
        value: z,
        onSelect: () => {
          c($), _(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Ae,
            {
              className: f("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || d(s) !== z
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            z,
            A && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              A
            ] })
          ] })
        ]
      },
      S
    );
  };
  return /* @__PURE__ */ u(ze, { open: k, onOpenChange: _, ...C, children: [
    /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ u(
      B,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": T,
        id: t,
        className: f(
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
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? I(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(or, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      De,
      {
        align: y,
        className: f("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Ve, { children: [
          /* @__PURE__ */ a(_r, { placeholder: g, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(ta, { children: h }),
          /* @__PURE__ */ a(Le, { children: F(e) ? e.map(($) => /* @__PURE__ */ a(pe, { heading: $.groupHeading, children: $.options.map((x) => V(x, $.groupHeading)) }, $.groupHeading)) : /* @__PURE__ */ a(pe, { children: e.map(($) => V($)) }) })
        ] })
      }
    )
  ] });
}
function vl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = L(
    () => Array.from({ length: i }, (l, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ a(Nt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      Po,
      {
        isDisabled: n,
        onChange: (l) => {
          r(l), l > e && o(l);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (l) => l.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(Nt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      Po,
      {
        isDisabled: n,
        onChange: (l) => {
          o(l), l < t && r(l);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (l) => l.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Ba = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Ba || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Ba || (Ba = {}));
const Ju = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), fa = (t, e) => t[e] ?? e;
function Zu({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: c,
  handleSelectStartChapter: d,
  localizedStrings: l
}) {
  const w = fa(l, "%webView_bookSelector_currentBook%"), p = fa(l, "%webView_bookSelector_choose%"), g = fa(l, "%webView_bookSelector_chooseBooks%"), [h, m] = N(
    "current book"
    /* CurrentBook */
  ), y = (v) => {
    m(v), t(v);
  };
  return /* @__PURE__ */ a(
    Un,
    {
      className: "pr-twp tw:flex",
      value: h,
      onValueChange: (v) => y(v),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Fa, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Nt, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Nt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            vl,
            {
              isDisabled: h === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: s,
              chapterCount: n,
              startChapter: c,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Fa, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Nt, { className: "tw:ms-1", children: g })
          ] }),
          /* @__PURE__ */ a(Nt, { className: "tw:flex tw:items-center", children: o.map((v) => dt.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ a(
            B,
            {
              disabled: h === "current book",
              onClick: () => r(),
              children: p
            }
          )
        ] })
      ] })
    }
  );
}
const Kn = Ya(null);
function bl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ve() {
  const t = bn(Kn);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const qn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, xl = qn ? Jt : Y, Ir = { tag: Xa };
function yl({ initialConfig: t, children: e }) {
  const r = L(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: d } = t, l = bl(null, o), w = kn({ editable: t.editable, html: d, namespace: n, nodes: i, onError: (p) => s(p, w), theme: o });
    return function(p, g) {
      if (g !== null) {
        if (g === void 0) p.update(() => {
          const h = Pe();
          if (h.isEmpty()) {
            const m = Er();
            h.append(m);
            const y = qn ? document.activeElement : null;
            (jt() !== null || y !== null && y === p.getRootElement()) && m.select();
          }
        }, Ir);
        else if (g !== null) switch (typeof g) {
          case "string": {
            const h = p.parseEditorState(g);
            p.setEditorState(h, Ir);
            break;
          }
          case "object":
            p.setEditorState(g, Ir);
            break;
          case "function":
            p.update(() => {
              Pe().isEmpty() && g(p);
            }, Ir);
        }
      }
    }(w, c), [w, l];
  }, []);
  return xl(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Kn.Provider, { value: r, children: e });
}
const kl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Jt : Y;
function _l({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = ve();
  return kl(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: d }) => {
      e && i.size === 0 && s.size === 0 || t && d.has(Xa) || c.isEmpty() || r(n, o, d);
    });
  }, [o, t, e, r]), null;
}
const eo = {
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
}, ro = [
  Mc,
  _n,
  Nn,
  Rc
], Nl = Ya(null), ma = {
  didCatch: !1,
  error: null
};
class Cl extends Us {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = ma;
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
      }), this.setState(ma);
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
    if (o && r.error !== null && El(e.resetKeys, n)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: n,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(ma);
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
    let c = e;
    if (i) {
      const d = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        c = r(d);
      else if (o)
        c = No(o, d);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return No(Nl.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function El() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Tl({ children: t, onError: e }) {
  return a(Cl, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const zl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Jt : Y;
function Dl(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Sl() {
  return function(t) {
    const [e] = ve(), r = L(() => t(e), [e, t]), [o, n] = N(() => r.initialValueFn()), i = q(o);
    return zl(() => {
      const { initialValueFn: s, subscribe: c } = r, d = s();
      return i.current !== d && (i.current = d, n(d)), c((l) => {
        i.current = l, n(l);
      });
    }, [r, t]), o;
  }(Dl);
}
function Ol(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, d = s.length;
  s.sort((l, w) => {
    const p = l.top - w.top;
    return Math.abs(p) <= 3 ? l.left - w.left : p;
  });
  for (let l = 0; l < d; l++) {
    const w = s[l], p = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, g = w.width + i === o.width;
    p || g ? (s.splice(l--, 1), d--) : c = w;
  }
  return s;
}
function Hr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Gn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, $l = Gn && "documentMode" in document ? document.documentMode : null;
!(!Gn || !("InputEvent" in window) || $l) && "getTargetRanges" in new window.InputEvent("input");
function we(t) {
  return `${t}px`;
}
const Ml = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Rl(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function d() {
    o === null && Hr(182), n === null && Hr(183);
    const { left: p, top: g } = n.getBoundingClientRect(), h = Ol(t, e);
    var m, y;
    c.isConnected || (y = c, (m = n).insertBefore(y, m.firstChild));
    let v = !1;
    for (let T = 0; T < h.length; T++) {
      const C = h[T], k = s[T] || document.createElement("div"), _ = k.style;
      _.position !== "absolute" && (_.position = "absolute", v = !0);
      const I = we(C.left - p);
      _.left !== I && (_.left = I, v = !0);
      const F = we(C.top - g);
      _.top !== F && (k.style.top = F, v = !0);
      const V = we(C.width);
      _.width !== V && (k.style.width = V, v = !0);
      const $ = we(C.height);
      _.height !== $ && (k.style.height = $, v = !0), k.parentNode !== c && (c.append(k), v = !0), s[T] = k;
    }
    for (; s.length > h.length; ) s.pop();
    v && r(s);
  }
  function l() {
    n = null, o = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const p of s) p.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function p() {
    const g = t.getRootElement();
    if (g === null) return l();
    const h = g.parentElement;
    if (!oc(h)) return l();
    l(), o = g, n = h, i = new MutationObserver((m) => {
      const y = t.getRootElement(), v = y && y.parentElement;
      if (y !== o || v !== n) return p();
      for (const T of m) if (!c.contains(T.target)) return d();
    }), i.observe(h, Ml), d();
  });
  return () => {
    w(), l();
  };
}
function Io(t, e, r) {
  if (t.type !== "text" && xr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [ac(r) || r, t.offset];
}
function Al(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== we(-1.5) && (r.marginTop = we(-1.5)), r.paddingTop !== we(4) && (r.paddingTop = we(4)), r.paddingBottom !== we(0) && (r.paddingBottom = we(0));
  }
}
function Pl(t, e = Al) {
  let r = null, o = null, n = null, i = null, s = null, c = null, d = () => {
  };
  function l(w) {
    w.read(() => {
      const p = jt();
      if (!ge(p)) return r = null, n = null, i = null, c = null, d(), void (d = () => {
      });
      const [g, h] = function($) {
        const x = $.getStartEndPoints();
        return $.isBackward() ? [x[1], x[0]] : x;
      }(p), m = g.getNode(), y = m.getKey(), v = g.offset, T = h.getNode(), C = T.getKey(), k = h.offset, _ = t.getElementByKey(y), I = t.getElementByKey(C), F = r === null || _ !== o || v !== n || y !== r.getKey(), V = i === null || I !== s || k !== c || C !== i.getKey();
      if ((F || V) && _ !== null && I !== null) {
        const $ = function(x, z, A, S, O, W, K) {
          const M = (x._window ? x._window.document : document).createRange();
          return M.setStart(...Io(z, A, S)), M.setEnd(...Io(O, W, K)), M;
        }(t, g, m, _, h, T, I);
        d(), d = Rl(t, $, e);
      }
      r = m, o = _, n = v, i = T, s = I, c = k;
    });
  }
  return l(t.getEditorState()), Ee(t.registerUpdateListener(({ editorState: w }) => l(w)), () => {
    d();
  });
}
function Il(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Pl(t, e));
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
function Vl(t) {
  const e = En(t, (r) => xr(r) && !r.isInline());
  return xr(e) || Hr(4, t.__key), e;
}
function Ll(t) {
  const e = jt() || Hs();
  let r;
  if (ge(e)) r = Ys(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = Cn(c, "next"));
    }
    r = r || Ws(Pe(), "previous").getFlipped().insert(Er());
  }
  const o = jl(t, r), n = Xs(o), i = Js(n) ? Zs(n) : o;
  return Qs(tc(i)), t.getLatest();
}
function jl(t, e, r) {
  let o = zo(e, "next");
  for (let n = o; n; n = ec(n, r)) o = n;
  return rc(o) && Hr(283), o.insert(t.isInline() ? Er().append(t) : t), zo(Cn(t.getLatest(), "next"), e.direction);
}
function Fl(t) {
  const e = jt();
  if (!ge(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = En(i, (l) => xr(l) && !l.isInline());
    if (c === null) continue;
    const d = c.getKey();
    c.canIndent() && !r.has(d) && (r.add(d), t(c));
  }
  return r.size > 0;
}
const Bl = Symbol.for("preact-signals");
function oa() {
  if (ke > 1) return void ke--;
  let t, e = !1;
  for (!function() {
    let r = Yr;
    for (Yr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); vr !== void 0; ) {
    let r = vr;
    for (vr = void 0, Wr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Hn(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Wr = 0, ke--, e) throw t;
}
function Ul(t) {
  if (ke > 0) return t();
  Ua = ++Kl, ke++;
  try {
    return t();
  } finally {
    oa();
  }
}
let et, vr;
function Vo(t) {
  const e = et;
  et = void 0;
  try {
    return t();
  } finally {
    et = e;
  }
}
let Yr, ke = 0, Wr = 0, Kl = 0, Ua = 0, Br = 0;
function Lo(t) {
  if (et === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== et ? (e = { i: 0, S: t, p: et.s, n: void 0, t: et, e: void 0, x: void 0, r: e }, et.s !== void 0 && (et.s.n = e), et.s = e, t.n = e, 32 & et.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = et.s, e.n = void 0, et.s.n = e, et.s = e), e) : void 0;
}
function At(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function yr(t, e) {
  return new At(t, e);
}
function Hn(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function jo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Yn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Ke(t, e) {
  At.call(this, void 0), this.x = t, this.s = void 0, this.g = Br - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ql(t, e) {
  return new Ke(t, e);
}
function Wn(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    ke++;
    const r = et;
    et = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, ao(t), o;
    } finally {
      et = r, oa();
    }
  }
}
function ao(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Wn(t);
}
function Gl(t) {
  if (et !== this) throw new Error("Out-of-order effect");
  Yn(this), et = t, this.f &= -2, 8 & this.f && ao(this), oa();
}
function rr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function fe(t, e) {
  const r = new rr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function cr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = yr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
At.prototype.brand = Bl, At.prototype.h = function() {
  return !0;
}, At.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Vo(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, At.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Vo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, At.prototype.subscribe = function(t) {
  return fe(() => {
    const e = this.value, r = et;
    et = void 0;
    try {
      t(e);
    } finally {
      et = r;
    }
  }, { name: "sub" });
}, At.prototype.valueOf = function() {
  return this.value;
}, At.prototype.toString = function() {
  return this.value + "";
}, At.prototype.toJSON = function() {
  return this.value;
}, At.prototype.peek = function() {
  const t = et;
  et = void 0;
  try {
    return this.value;
  } finally {
    et = t;
  }
}, Object.defineProperty(At.prototype, "value", { get() {
  const t = Lo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Wr > 100) throw new Error("Cycle detected");
    (function(e) {
      ke !== 0 && Wr === 0 && e.l !== Ua && (e.l = Ua, Yr = { S: e, v: e.v, i: e.i, o: Yr });
    })(this), this.v = t, this.i++, Br++, ke++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      oa();
    }
  }
} }), Ke.prototype = new At(), Ke.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Br)) return !0;
  if (this.g = Br, this.f |= 1, this.i > 0 && !Hn(this)) return this.f &= -2, !0;
  const t = et;
  try {
    jo(this), et = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return et = t, Yn(this), this.f &= -2, !0;
}, Ke.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  At.prototype.S.call(this, t);
}, Ke.prototype.U = function(t) {
  if (this.t !== void 0 && (At.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, Ke.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(Ke.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Lo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), rr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, rr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Wn(this), jo(this), ke++;
  const t = et;
  return et = this, Gl.bind(this, t);
}, rr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = vr, vr = this);
}, rr.prototype.d = function() {
  this.f |= 8, 1 & this.f || ao(this);
}, rr.prototype.dispose = function() {
  this.d();
};
ne({ build: (t, e, r) => cr(e), config: Qe({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return fe(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Xn() {
  const t = Pe(), e = jt(), r = Er();
  t.clear(), t.append(r), e !== null && r.select(), ge(e) && (e.format = 0);
}
function Jn(t, e = Xn) {
  return t.registerCommand(Tn, (r) => (t.update(e), !0), Ja);
}
ne({ build: (t, e, r) => cr(e), config: Qe({ $onClear: Xn }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return fe(() => Jn(t, o.value));
} });
function Hl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const va = ic("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Zn extends Aa {
  $config() {
    return this.config("decorator-text", { extends: Aa, stateConfigs: [{ flat: !0, stateConfig: va }] });
  }
  getFormat() {
    return vc(this, va);
  }
  getFormatFlags(e, r) {
    return Do(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = bc[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return xc(this, va, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = Do(r, e, null);
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
function Yl(t) {
  return t instanceof Zn;
}
ne({ name: "@lexical/extension/DecoratorText", nodes: () => [Zn], register: (t, e, r) => t.registerCommand(zn, (o) => {
  const n = jt();
  if (Dn(n) || ge(n)) for (const i of n.getNodes()) Yl(i) && i.toggleFormat(o);
  return !1;
}, Sn) });
function Qn(t, e) {
  let r;
  return yr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Ka = ne({ build: (t) => Qn(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function lt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ti(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = ti(r[n], o[n]);
    return t;
  }
  return e;
}
const oo = 0, qa = 1, ei = 2, ba = 3, Vr = 4, er = 5, xa = 6, hr = 7;
function ya(t) {
  return t.id === oo;
}
function ri(t) {
  return t.id === ei;
}
function Wl(t) {
  return function(e) {
    return e.id === qa;
  }(t) || lt(305, String(t.id), String(qa)), Object.assign(t, { id: ei });
}
const Xl = /* @__PURE__ */ new Set();
class Jl {
  constructor(e, r) {
    Rt(this, "builder");
    Rt(this, "configs");
    Rt(this, "_dependency");
    Rt(this, "_peerNameSet");
    Rt(this, "extension");
    Rt(this, "state");
    Rt(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: oo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : nc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    ri(r) || lt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, d, l) {
      return Object.assign(c, { config: d, id: ba, registerState: l });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, d, l) {
      return Object.assign(c, { id: Vr, initResult: d, registerState: l });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Vr && lt(307, String(r.id), String(er)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: er, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== er && lt(308, String(o.id), String(er));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: xa });
    }(o), () => {
      const i = this.state;
      i.id !== hr && lt(309, String(o.id), String(hr)), this.state = function(s) {
        return Object.assign(s, { id: er });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== xa && lt(310, String(r.id), String(xa)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: hr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && lt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && lt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Vr;
    }(e) || lt(313, String(e.id), String(Vr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= ba;
    }(e) || lt(314, String(e.id), String(ba)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && lt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && lt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= hr;
    }(e) || lt(316, String(e.id), String(hr)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Xl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([r]) => r)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(r) {
        return r.id >= er;
      })(e) || lt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Fo = { tag: Xa };
function Zl() {
  const t = Pe();
  t.isEmpty() && t.append(Er());
}
const Ql = ne({ config: Qe({ setOptions: Fo, updateOptions: Fo }), init: ({ $initialEditorState: t = Zl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (dc(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [sc, Nn, cc, lc, _n] }), Bo = Symbol.for("@lexical/extension/LexicalBuilder");
function Uo() {
}
function td(t) {
  throw t;
}
function Lr(t) {
  return Array.isArray(t) ? t : [t];
}
const ka = "0.43.0+prod.esm";
class ar {
  constructor(e) {
    Rt(this, "roots");
    Rt(this, "extensionNameMap");
    Rt(this, "outgoingConfigEdges");
    Rt(this, "incomingEdges");
    Rt(this, "conflicts");
    Rt(this, "_sortedExtensionReps");
    Rt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = ka, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Lr(Ql)];
    for (const o of e) r.push(Lr(o));
    return new ar(r);
  }
  static maybeFromEditor(e) {
    const r = e[Bo];
    return r && (r.PACKAGE_VERSION !== ka && lt(292, r.PACKAGE_VERSION, ka), r instanceof ar || lt(293)), r;
  }
  static fromEditor(e) {
    const r = ar.maybeFromEditor(e);
    return r === void 0 && lt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(kn({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [Bo]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = Uo;
    function r() {
      try {
        e();
      } finally {
        e = Uo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Ee(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && lt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && lt(296);
    const r = Lr(e), [o] = r;
    typeof o.name != "string" && lt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && lt(298, o.name), !n) {
      n = new Jl(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && lt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && lt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const c = Lr(s);
        this.addEdge(o.name, c[0].name, c.slice(1)), this.addExtension(c);
      }
      for (const [s, c] of o.peerDependencies || []) this.addEdge(o.name, s, c ? [c] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], r = (o, n) => {
      let i = o.state;
      if (ri(i)) return;
      const s = o.extension.name;
      var c;
      ya(i) || lt(300, s, n || "[unknown]"), ya(c = i) || lt(304, String(c.id), String(oo)), i = Object.assign(c, { id: qa }), o.state = i;
      const d = this.outgoingConfigEdges.get(s);
      if (d) for (const l of d.keys()) {
        const w = this.extensionNameMap.get(l);
        w && r(w, s);
      }
      i = Wl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) ya(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && lt(301, o.name);
      for (const s of n) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const r = this.sortedExtensionReps(), o = new AbortController(), n = [() => o.abort()], i = o.signal;
    for (const s of r) {
      const c = s.register(e, i);
      c && n.push(c);
    }
    for (const s of r) {
      const c = s.afterRegistration(e);
      c && n.push(c);
    }
    return Ee(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const g of Hl(p)) {
        if (typeof g != "function") {
          const h = o.get(g.replace);
          h && lt(302, p.name, g.replace.name, h.extension.name), o.set(g.replace, w);
        }
        r.add(g);
      }
      if (p.html) {
        if (p.html.export) for (const [g, h] of p.html.export.entries()) n.set(g, h);
        p.html.import && Object.assign(i, p.html.import);
      }
      p.theme && ti(s, p.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const d = Object.keys(i).length > 0, l = n.size > 0;
    (d || l) && (e.html = {}, d && (e.html.import = i), l && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = td), e;
  }
}
const ed = /* @__PURE__ */ new Set(), Ko = ne({ build(t, e, r) {
  const o = r.getDependency(Ka).output, n = yr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Qn(() => {
  }, () => fe(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let d, l = !1;
    o.value.read(() => {
      if (jt()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const g = kc(w), h = g && g.isSelected() || !1;
        l = l || h !== (!!s && s.has(w)), h && (d = d || /* @__PURE__ */ new Set(), d.add(w));
      }
    }), !l && d && s && d.size === s.size || (i.value = d);
  }));
  return { watchNodeKey: function(s) {
    const c = ql(() => (i.value || ed).has(s)), { watchedNodeKeys: d } = n.peek();
    let l = d.get(s);
    const w = l !== void 0;
    return l = l || /* @__PURE__ */ new Set(), l.add(c), w || (d.set(s, l), n.value = { watchedNodeKeys: d }), c;
  } };
}, dependencies: [Ka], name: "@lexical/extension/NodeSelection" }), rd = wc("INSERT_HORIZONTAL_RULE_COMMAND");
class nr extends Aa {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new nr(e.__key);
  }
  static importJSON(e) {
    return no().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: ad, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return On(r, e.theme.hr), r;
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
function ad() {
  return { node: no() };
}
function no() {
  return yc(nr);
}
function od(t) {
  return t instanceof nr;
}
ne({ dependencies: [Ka, Ko], name: "@lexical/extension/HorizontalRule", nodes: () => [nr], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Ko).output, n = yr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Ee(t.registerCommand(rd, (s) => {
    const c = jt();
    if (!ge(c)) return !1;
    if (c.focus.getNode() !== null) {
      const d = no();
      Ll(d);
    }
    return !0;
  }, Ja), t.registerCommand(uc, (s) => {
    if (pc(s.target)) {
      const c = hc(s.target);
      if (od(c)) return function(d, l = !1) {
        const w = jt(), p = d.isSelected(), g = d.getKey();
        let h;
        l && Dn(w) ? h = w : (h = gc(), fc(h)), p ? h.delete(g) : h.add(g);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, Sn), t.registerMutationListener(nr, (s, c) => {
    Ul(() => {
      let d = !1;
      const { nodeSelections: l } = n.peek();
      for (const [w, p] of s.entries()) if (p === "destroyed") l.delete(w), d = !0;
      else {
        const g = l.get(w), h = t.getElementByKey(w);
        g ? g.domNode.value = h : (d = !0, l.set(w, { domNode: yr(h), selectedSignal: o(w) }));
      }
      d && (n.value = { nodeSelections: l });
    });
  }), fe(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: d } of n.value.nodeSelections.values()) s.push(fe(() => {
      const l = c.value;
      l && (d.value ? On(l, i) : _c(l, i));
    }));
    return Ee(...s);
  }));
} });
ne({ build: (t, e) => cr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Qe({ $getParentEditor: function() {
  const t = mc();
  return ar.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => fe(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
ne({ build: (t, e, r) => cr(e), config: Qe({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return fe(() => {
    if (!o.disabled.value) return Il(t, o.onReposition.value);
  });
} });
function ai(t) {
  return t.canBeEmpty();
}
function nd(t, e, r = ai) {
  return Ee(t.registerCommand(Nc, (o) => {
    const n = jt();
    if (!ge(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((g) => Cc(g) && g.canIndent()).length > 0) return !0;
      const c = s.anchor, d = s.focus, l = d.isBefore(c) ? d : c, w = l.getNode(), p = Vl(w);
      if (p.canIndent()) {
        const g = p.getKey();
        let h = Ec();
        if (h.anchor.set(g, 0, "element"), h.focus.set(g, 0, "element"), h = Tc(h), h.anchor.is(l)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? zc : So : Dc;
    return t.dispatchCommand(i, void 0);
  }, Ja), t.registerCommand(So, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = jt();
    if (!ge(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return Fl((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, Za));
}
ne({ build: (t, e, r) => cr(e), config: Qe({ $canIndent: ai, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return fe(() => {
    if (!o.value) return nd(t, n, i);
  });
} });
const id = ne({ name: "@lexical/react/ReactProvider" });
function sd() {
  return Pe().getTextContent();
}
function cd(t, e = !0) {
  if (t) return !1;
  let r = sd();
  return e && (r = r.trim()), r === "";
}
function ld(t) {
  if (!cd(t, !1)) return !1;
  const e = Pe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (Sc(n)) return !1;
    if (xr(n)) {
      if (!Oc(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const d = i[o];
        if (!Pa(d)) return !1;
      }
    }
  }
  return !0;
}
function oi(t) {
  return () => ld(t);
}
function ni(t) {
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
        const c = s.payload;
        if (c && c.functionId === "makeChanges") {
          const d = c.args;
          if (d) {
            const [l, w, p, g, h] = d;
            t.update(() => {
              const m = jt();
              if (ge(m)) {
                const y = m.anchor;
                let v = y.getNode(), T = 0, C = 0;
                if (Pa(v) && l >= 0 && w >= 0 && (T = l, C = l + w, m.setTextNodeRange(v, T, v, C)), T === C && p === "" || (m.insertRawText(p), v = y.getNode()), Pa(v)) {
                  T = g, C = g + h;
                  const k = v.getTextContentSize();
                  T = T > k ? k : T, C = C > k ? k : C, m.setTextNodeRange(v, T, v, C);
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
ne({ build: (t, e, r) => cr(e), config: Qe({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => fe(() => r.getOutput().disabled.value ? void 0 : ni(t)) });
function dd(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const io = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Jt : Y;
function wd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = N(() => r.getDecorators());
    return io(() => r.registerDecoratorListener((s) => {
      Pc(() => {
        i(s);
      });
    }), [r]), Y(() => {
      i(r.getDecorators());
    }, [r]), L(() => {
      const s = [], c = Object.keys(n);
      for (let d = 0; d < c.length; d++) {
        const l = c[d], w = a(o, { onError: (g) => r._onError(g), children: a(Ks, { fallback: null, children: n[l] }) }), p = r.getElementByKey(l);
        p !== null && s.push(Ic(w, p, l));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function ud({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = ar.maybeFromEditor(r);
    if (o && o.hasExtensionByName(id.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && dd(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(wd, { editor: t, ErrorBoundary: e });
}
function qo(t) {
  return t.getEditorState().read(oi(t.isComposing()));
}
function pd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = ve();
  return function(n) {
    io(() => Ee(Ac(n), ni(n)), [n]);
  }(o), u(tt, { children: [t, a(hd, { content: e }), a(ud, { editor: o, ErrorBoundary: r })] });
}
function hd({ content: t }) {
  const [e] = ve(), r = function(n) {
    const [i, s] = N(() => qo(n));
    return io(() => {
      function c() {
        const d = qo(n);
        s(d);
      }
      return c(), Ee(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = Sl();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function gd({ defaultSelection: t }) {
  const [e] = ve();
  return Y(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const fd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Jt : Y;
function md({ onClear: t }) {
  const [e] = ve();
  return fd(() => Jn(e, t), [e, t]), null;
}
const ii = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Jt : Y;
function vd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: d, ariaLabelledBy: l, ariaMultiline: w, ariaOwns: p, ariaRequired: g, autoCapitalize: h, className: m, id: y, role: v = "textbox", spellCheck: T = !0, style: C, tabIndex: k, "data-testid": _, ...I }, F) {
  const [V, $] = N(t.isEditable()), x = j((A) => {
    A && A.ownerDocument && A.ownerDocument.defaultView ? t.setRootElement(A) : t.setRootElement(null);
  }, [t]), z = L(() => /* @__PURE__ */ function(...A) {
    return (S) => {
      for (const O of A) typeof O == "function" ? O(S) : O != null && (O.current = S);
    };
  }(F, x), [x, F]);
  return ii(() => ($(t.isEditable()), t.registerEditableListener((A) => {
    $(A);
  })), [t]), a("div", { "aria-activedescendant": V ? e : void 0, "aria-autocomplete": V ? r : "none", "aria-controls": V ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": V && v === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": d, "aria-labelledby": l, "aria-multiline": w, "aria-owns": V ? p : void 0, "aria-readonly": !V || void 0, "aria-required": g, autoCapitalize: h, className: m, contentEditable: V, "data-testid": _, id: y, ref: z, role: v, spellCheck: T, style: C, tabIndex: k, ...I });
}
const bd = ra(vd);
function Go(t) {
  return t.getEditorState().read(oi(t.isComposing()));
}
const xd = ra(yd);
function yd(t, e) {
  const { placeholder: r, ...o } = t, [n] = ve();
  return u(tt, { children: [a(bd, { editor: n, ...o, ref: e }), r != null && a(kd, { editor: n, content: r })] });
}
function kd({ content: t, editor: e }) {
  const r = function(s) {
    const [c, d] = N(() => Go(s));
    return ii(() => {
      function l() {
        const w = Go(s);
        d(w);
      }
      return l(), Ee(s.registerUpdateListener(() => {
        l();
      }), s.registerEditableListener(() => {
        l();
      }));
    }, [s]), c;
  }(e), [o, n] = N(e.isEditable());
  if (Jt(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function _d({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    xd,
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
const si = Ya(void 0);
function Nd({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = L(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(si.Provider, { value: s, children: i });
}
function ci() {
  const t = bn(si);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Cd() {
  const [t, e] = N(void 0), r = j(() => {
    e(void 0);
  }, []), o = L(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(La, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(ja, { children: [
      /* @__PURE__ */ a(qr, { children: /* @__PURE__ */ a(Gr, { children: i }) }),
      s
    ] }) });
  }, [t, r]), n = j(
    (i, s, c = !1) => {
      e({
        closeOnClickOutside: c,
        content: s(r),
        title: i
      });
    },
    [r]
  );
  return [o, n];
}
function Ed({
  children: t
}) {
  const [e] = ve(), [r, o] = N(e), [n, i] = N("paragraph"), [s, c] = Cd(), d = () => {
  };
  return Y(() => r.registerCommand(
    $n,
    (l, w) => (o(w), !1),
    Za
  ), [r]), /* @__PURE__ */ u(
    Nd,
    {
      activeEditor: r,
      $updateToolbar: d,
      blockType: n,
      setBlockType: i,
      showModal: c,
      children: [
        s,
        t({ blockType: n })
      ]
    }
  );
}
function Td(t) {
  const [e] = ve(), { activeEditor: r } = ci();
  Y(() => r.registerCommand(
    $n,
    () => {
      const o = jt();
      return o && t(o), !1;
    },
    Za
  ), [e, t]), Y(() => {
    r.getEditorState().read(() => {
      const o = jt();
      o && t(o);
    });
  }, [r, t]);
}
const zd = Tr(
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
), li = ut.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function di({
  className: t,
  variant: e,
  size: r,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: i,
  ...s
}) {
  const c = Ft();
  return /* @__PURE__ */ a(
    yn.Root,
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
      dir: c,
      ...s,
      children: /* @__PURE__ */ a(
        li.Provider,
        {
          value: ut.useMemo(
            () => ({ variant: e, size: r, spacing: o, orientation: n }),
            [e, r, o, n]
          ),
          children: i
        }
      )
    }
  );
}
function Ur({
  className: t,
  children: e,
  variant: r = "default",
  size: o = "default",
  ...n
}) {
  const i = ut.useContext(li);
  return /* @__PURE__ */ a(
    yn.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || r,
      "data-size": i.size || o,
      "data-spacing": i.spacing,
      className: f(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        zd({
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
const Ho = [
  { format: "bold", icon: ws, label: "Bold" },
  { format: "italic", icon: us, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Dd() {
  const { activeEditor: t } = ci(), [e, r] = N([]), o = j((n) => {
    if (ge(n) || Wc(n)) {
      const i = [];
      Ho.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return Td(o), /* @__PURE__ */ a(
    di,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: Ho.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        Ur,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(zn, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function Sd({ onClear: t }) {
  const [e] = ve();
  Y(() => {
    t && t(() => {
      e.dispatchCommand(Tn, void 0);
    });
  }, [e, t]);
}
function Od({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = N(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(Ed, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(Dd, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        pd,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(_d, { placeholder: t }) }),
          ErrorBoundary: Tl
        }
      ),
      e && /* @__PURE__ */ a(gd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Sd, { onClear: r }),
      /* @__PURE__ */ a(md, {})
    ] })
  ] });
}
const $d = {
  namespace: "commentEditor",
  theme: eo,
  nodes: ro,
  onError: (t) => {
    console.error(t);
  }
};
function Xr({
  editorState: t,
  editorSerializedState: e,
  onChange: r,
  onSerializedChange: o,
  placeholder: n = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: c
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(
          yl,
          {
            initialConfig: {
              ...$d,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(ee, { children: [
              /* @__PURE__ */ a(Od, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                _l,
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
function wi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function ui(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : ui(e.children)
  ) : !1;
}
function Qt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? ui(t.root.children) : !1;
}
function Md(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Rn({
    namespace: "EditorUtils",
    theme: eo,
    nodes: ro,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = Jc(e, n);
      Pe().clear(), $c(i);
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
function Jr(t) {
  const e = Rn({
    namespace: "EditorUtils",
    theme: eo,
    nodes: ro,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = Xc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function so(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const Rd = Tr(
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
function co({
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
        Rd({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Qu({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? sr.Root : "div";
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
function pi({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ a(
    He,
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
const hi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Yo = (t, e) => t[e] ?? e;
function gi({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = Yo(o, "%cancelButton_tooltip%"), c = i ?? Yo(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(co, { children: [
    /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(
        B,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(ea, {})
        }
      ) }),
      /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(pi, {}),
    /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(
        B,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Ae, {})
        }
      ) }),
      /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const fi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function Kr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function lo(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Ad = {
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
function _a(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function tp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = N(Ad), [c, d] = N(n), [l, w] = N(!1), p = q(void 0), g = q(null);
  Y(() => {
    let v = !0;
    const T = g.current;
    if (!T) return;
    const C = setTimeout(() => {
      v && wi(T);
    }, 300);
    return () => {
      v = !1, clearTimeout(C);
    };
  }, []);
  const h = j(() => {
    if (!Qt(i)) return;
    const v = Jr(i);
    e(v, c);
  }, [i, e, c]), m = o["%commentEditor_placeholder%"] ?? "Type your comment here...", y = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: y }),
      /* @__PURE__ */ a(
        gi,
        {
          onCancelClick: r,
          onAcceptClick: h,
          canAccept: Qt(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u(ze, { open: l, onOpenChange: w, children: [
      /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ u(
        B,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(un, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: _a(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        De,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (v) => {
            v.key === "Escape" && (v.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Ve, { children: /* @__PURE__ */ a(Le, { children: t.map((v) => /* @__PURE__ */ a(
            Te,
            {
              onSelect: () => {
                d(v || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: _a(v, o) })
            },
            v || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ a(
      "div",
      {
        ref: g,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-hidden",
        onKeyDownCapture: (v) => {
          v.key === "Escape" ? (v.preventDefault(), v.stopPropagation(), r()) : lo(v) && (v.preventDefault(), v.stopPropagation(), Qt(i) && h());
        },
        onKeyDown: (v) => {
          so(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          Xr,
          {
            editorSerializedState: i,
            onSerializedChange: (v) => s(v),
            placeholder: m,
            onClear: (v) => {
              p.current = v;
            }
          }
        )
      }
    )
  ] });
}
const ep = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...hi
]), rp = Object.freeze([
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
]);
function Pd({
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
function ap({ className: t, ...e }) {
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
function op({ className: t, ...e }) {
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
function np({ className: t, ...e }) {
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
function Id({ className: t, ...e }) {
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
function ip({ className: t, ...e }) {
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
function Vd({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Wa.Root,
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
function sp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Wa.Image,
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
function Ld({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Wa.Fallback,
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
function Wo({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1
}) {
  const [d, l] = N(!1), [w, p] = N(), g = q(null);
  Y(() => {
    if (!d) return;
    let _ = !0;
    const I = g.current;
    if (!I) return;
    const F = setTimeout(() => {
      _ && wi(I);
    }, 300);
    return () => {
      _ = !1, clearTimeout(F);
    };
  }, [d]);
  const h = j(
    (_) => {
      _ && _.stopPropagation(), l(!1), p(void 0), s == null || s(!1);
    },
    [s]
  ), m = j(
    async (_) => {
      if (_ && _.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        Jr(w)
      ) && (l(!1), p(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), y = L(() => {
    const _ = new Date(t.date), I = es(
      _,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), F = _.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return xe(r["%comment_dateAtTime%"], {
      date: I,
      time: F
    });
  }, [t.date, r]), v = L(() => t.user, [t.user]), T = L(
    () => t.user.split(" ").map((_) => _[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), C = L(() => wn(t.contents), [t.contents]), k = L(() => {
    if (o && c)
      return /* @__PURE__ */ u(tt, { children: [
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: (_) => {
              _.stopPropagation(), l(!0), p(Md(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(ps, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          Ge,
          {
            onClick: async (_) => {
              _.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(hs, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    c,
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
      className: f("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Vd, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Ld, { className: "tw:text-xs tw:font-medium", children: T }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: v }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: y }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(br, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              Kr(t.assignedUser, r)
            ] })
          ] }),
          d && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: g,
              onKeyDownCapture: (_) => {
                _.key === "Escape" ? (_.preventDefault(), _.stopPropagation(), h()) : lo(_) && (_.preventDefault(), _.stopPropagation(), Qt(w) && m());
              },
              onKeyDown: (_) => {
                so(_), (_.key === "Enter" || _.key === " ") && _.stopPropagation();
              },
              onClick: (_) => {
                _.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  Xr,
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
                    onSerializedChange: (_) => p(_)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    B,
                    {
                      size: "icon",
                      onClick: h,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(ea, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    B,
                    {
                      size: "icon",
                      onClick: m,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !Qt(w),
                      children: /* @__PURE__ */ a(pn, {})
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
                className: f(
                  // Shared with ConflictNoteCard so note-body HTML renders identically (prose,
                  // max-width override, blockquote de-styling on the first child, no quote marks).
                  fi,
                  // CommentItem-specific layout layered on top.
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: C }
              }
            )
          ] })
        ] }),
        k && /* @__PURE__ */ u(_e, { children: [
          /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ a(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(gs, {}) }) }),
          /* @__PURE__ */ a(Ce, { align: "end", children: k })
        ] })
      ]
    }
  );
}
const Xo = {
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
function jd({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: n,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: c,
  threadId: d,
  thread: l,
  threadStatus: w,
  handleAddCommentToThread: p,
  handleUpdateComment: g,
  handleDeleteComment: h,
  handleReadStatusChange: m,
  assignableUsers: y,
  canUserAddCommentToThread: v,
  canUserAssignThreadCallback: T,
  canUserResolveThreadCallback: C,
  canUserEditOrDeleteCommentCallback: k,
  isRead: _ = !1,
  autoReadDelay: I = 5,
  onVerseRefClick: F,
  initialAssignedUser: V
}) {
  const [$, x] = N(Xo), [z, A] = N(), [S, O] = N(), W = o, [K, M] = N(!1), [Q, mt] = N(!1), [ct, Bt] = N(!1), [bt, St] = N(!1), [U, rt] = N(!1), [ot, nt] = N(_), [it, It] = N(!1), vt = q(void 0), [Ut, Kt] = N(/* @__PURE__ */ new Map());
  Y(() => {
    let E = !0;
    return (async () => {
      const pt = C ? await C(d) : !1;
      E && rt(pt);
    })(), () => {
      E = !1;
    };
  }, [d, C]), Y(() => {
    let E = !0;
    if (!o) {
      St(!1), Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = T ? await T(d) : !1;
      E && St(pt);
    })(), () => {
      E = !1;
    };
  }, [o, d, T]);
  const D = q("idle");
  Y(() => {
    if (!o) {
      D.current !== "idle" && (A(void 0), O(void 0), D.current = "idle");
      return;
    }
    D.current === "idle" && (D.current = "pending"), bt ? D.current === "pending" && V !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    V !== i && (A(V), D.current = "auto-populated") : D.current === "auto-populated" && (A(void 0), D.current = "pending");
  }, [o, V, bt, i]);
  const Ot = L(() => e.filter((E) => !E.deleted), [e]);
  Y(() => {
    let E = !0;
    if (!o || !k) {
      Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const pt = /* @__PURE__ */ new Map();
      await Promise.all(
        Ot.map(async (kt) => {
          const Fe = await k(kt.id);
          E && pt.set(kt.id, Fe);
        })
      ), E && Kt(pt);
    })(), () => {
      E = !1;
    };
  }, [o, Ot, k]);
  const Vt = L(() => Ot[0], [Ot]), ie = q(null), qt = q(void 0), $t = j(() => {
    var E;
    (E = qt.current) == null || E.call(qt), x(Xo);
  }, []), Se = j(() => {
    const E = !ot;
    nt(E), It(!E), m == null || m(d, E);
  }, [ot, m, d]);
  Y(() => {
    M(!1);
  }, [o]), Y(() => {
    if (o && !ot && !it) {
      const E = setTimeout(() => {
        nt(!0), m == null || m(d, !0);
      }, I * 1e3);
      return vt.current = E, () => clearTimeout(E);
    }
    vt.current && (clearTimeout(vt.current), vt.current = void 0);
  }, [o, ot, it, I, d, m]);
  const Gt = L(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), Ht = L(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = Kr(i, r);
    return xe(r["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [i, r]), P = L(() => Ot.slice(1), [Ot]), H = L(() => P.length ?? 0, [P.length]), st = L(() => H > 0, [H]), at = L(() => K || H <= 2 ? P : P.slice(-2), [P, H, K]), ht = L(() => K || H <= 2 ? 0 : H - 2, [H, K]), xt = L(
    () => H === 1 ? Gt.singleReply : xe(Gt.multipleReplies, { count: H }),
    [H, Gt]
  ), yt = L(
    () => ht === 1 ? Gt.singleReply : xe(Gt.multipleReplies, { count: ht }),
    [ht, Gt]
  );
  Y(() => {
    !o && Q && st && mt(!1);
  }, [o, Q, st]);
  const gt = j(
    async (E) => {
      E && E.stopPropagation();
      const wt = Qt($) ? Jr($) : void 0;
      if (z !== void 0) {
        await p({
          threadId: d,
          contents: wt,
          assignedUser: z
        }) && (O(z), wt && $t());
        return;
      }
      wt && await p({ threadId: d, contents: wt }) && $t();
    },
    [
      $t,
      $,
      p,
      z,
      d
    ]
  ), Ct = j(
    async (E) => {
      const wt = Qt($) ? Jr($) : void 0, pt = E.status ? E.assignedUser : z ?? E.assignedUser, kt = await p({
        ...E,
        contents: wt,
        assignedUser: pt
      });
      return kt && (pt !== void 0 && O(pt), wt && $t()), kt;
    },
    [$t, $, p, z]
  );
  if (Ot.length !== 0)
    return /* @__PURE__ */ a(
      Pd,
      {
        role: "option",
        "aria-selected": o,
        id: d,
        className: f(
          "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
          { "tw:cursor-pointer tw:hover:shadow-md": !o },
          {
            "tw:bg-primary-foreground": !o && w !== "Resolved" && ot,
            "tw:bg-background": o && w !== "Resolved" && ot,
            "tw:bg-muted": w === "Resolved",
            "tw:bg-accent": !ot && !o && w !== "Resolved"
          }
        ),
        onClick: () => {
          c(d);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ u(Id, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              Ht && /* @__PURE__ */ a(br, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: Ht }),
              /* @__PURE__ */ a(
                B,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (E) => {
                    E.stopPropagation(), Se();
                  },
                  className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                  "aria-label": ot ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                  children: ot ? /* @__PURE__ */ a(fs, {}) : /* @__PURE__ */ a(ms, {})
                }
              ),
              U && w !== "Resolved" && /* @__PURE__ */ a(
                B,
                {
                  variant: "ghost",
                  size: "icon",
                  className: f(
                    "tw:ms-auto",
                    "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                    "tw:opacity-0 tw:group-hover:opacity-100"
                  ),
                  onClick: (E) => {
                    E.stopPropagation(), Ct({
                      threadId: d,
                      status: "Resolved"
                    });
                  },
                  "aria-label": r["%comment_aria_resolve_thread%"] ?? "Resolve thread",
                  children: /* @__PURE__ */ a(Ae, { className: "tw:h-4 tw:w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
              "p",
              {
                ref: ie,
                className: f(
                  "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                  {
                    "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": W
                  },
                  { "tw:whitespace-nowrap": !W }
                ),
                children: [
                  n && F ? /* @__PURE__ */ a(
                    B,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                      onClick: (E) => {
                        E.stopPropagation(), F(l);
                      },
                      children: n
                    }
                  ) : n,
                  /* @__PURE__ */ u("span", { className: t, children: [
                    Vt.contextBefore,
                    /* @__PURE__ */ a("span", { className: "tw:font-bold", children: Vt.selectedText }),
                    Vt.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ a(
              Wo,
              {
                comment: Vt,
                localizedStrings: r,
                isThreadExpanded: o,
                threadStatus: w,
                handleAddCommentToThread: Ct,
                handleUpdateComment: g,
                handleDeleteComment: h,
                onEditingChange: mt,
                canEditOrDelete: (!Q && Ut.get(Vt.id)) ?? !1,
                canUserResolveThread: U
              }
            )
          ] }),
          /* @__PURE__ */ u(tt, { children: [
            st && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
              /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(He, {}) }),
              /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: xt })
            ] }),
            !o && Qt($) && /* @__PURE__ */ a(
              Xr,
              {
                editorSerializedState: $,
                onSerializedChange: (E) => x(E),
                placeholder: r["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ u(tt, { children: [
              ht > 0 && /* @__PURE__ */ u(
                "div",
                {
                  className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                  onClick: (E) => {
                    E.stopPropagation(), M(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (E) => {
                    (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), M(!0));
                  },
                  children: [
                    /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(He, {}) }),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: yt }),
                      K ? /* @__PURE__ */ a(vs, {}) : /* @__PURE__ */ a(or, {})
                    ] })
                  ]
                }
              ),
              at.map((E) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
                Wo,
                {
                  comment: E,
                  localizedStrings: r,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: g,
                  handleDeleteComment: h,
                  onEditingChange: mt,
                  canEditOrDelete: (!Q && Ut.get(E.id)) ?? !1
                }
              ) }, E.id)),
              v !== !1 && (!Q || Qt($)) && /* @__PURE__ */ u(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw:w-full tw:space-y-2",
                  onClick: (E) => E.stopPropagation(),
                  onKeyDownCapture: (E) => {
                    lo(E) && (E.preventDefault(), E.stopPropagation(), (Qt($) || z !== void 0 && z !== S) && gt());
                  },
                  onKeyDown: (E) => {
                    so(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ a(
                      Xr,
                      {
                        editorSerializedState: $,
                        onSerializedChange: (E) => x(E),
                        placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (E) => {
                          qt.current = E;
                        }
                      }
                    ),
                    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                      z !== void 0 && (Qt($) || z !== S) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: xe(
                        r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: Kr(
                            z,
                            r
                          )
                        }
                      ) }),
                      /* @__PURE__ */ u(ze, { open: ct, onOpenChange: Bt, children: [
                        /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ a(
                          B,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                            disabled: !bt || !y || y.length === 0 || !y.includes(s),
                            "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                            children: /* @__PURE__ */ a(un, {})
                          }
                        ) }),
                        /* @__PURE__ */ a(
                          De,
                          {
                            className: "tw:w-auto tw:p-0",
                            align: "end",
                            onKeyDown: (E) => {
                              E.key === "Escape" && (E.stopPropagation(), Bt(!1));
                            },
                            children: /* @__PURE__ */ a(Ve, { children: /* @__PURE__ */ a(Le, { children: y == null ? void 0 : y.map((E) => /* @__PURE__ */ a(
                              Te,
                              {
                                onSelect: () => {
                                  A(E !== i ? E : void 0), D.current = "user-selected", O(void 0), Bt(!1);
                                },
                                className: "tw:flex tw:items-center",
                                children: /* @__PURE__ */ a("span", { children: Kr(E, r) })
                              },
                              E || "unassigned"
                            )) }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        B,
                        {
                          size: "icon",
                          onClick: gt,
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !Qt($) && (z === void 0 || z === S),
                          "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                          children: /* @__PURE__ */ a(pn, {})
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
function cp({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: c,
  handleReadStatusChange: d,
  assignableUsers: l,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: p,
  canUserResolveThreadCallback: g,
  canUserEditOrDeleteCommentCallback: h,
  selectedThreadId: m,
  onSelectedThreadChange: y,
  onVerseRefClick: v
}) {
  const [T, C] = N(/* @__PURE__ */ new Set()), [k, _] = N(), [I, F] = N(), V = j(
    async (M) => {
      const Q = await i(M);
      return Q !== void 0 && M.assignedUser !== void 0 && M.assignedUser !== "" && F(M.assignedUser), Q;
    },
    [i]
  );
  Y(() => {
    m && (C((M) => new Set(M).add(m)), _(m));
  }, [m]);
  const $ = r.filter(
    (M) => M.comments.some((Q) => !Q.deleted)
  ), x = $.map((M) => ({ id: M.id })), z = j(
    (M) => {
      C((Q) => new Set(Q).add(M.id)), _(M.id), y == null || y(M.id);
    },
    [y]
  ), A = j(
    (M) => {
      const Q = T.has(M);
      C((mt) => {
        const ct = new Set(mt);
        return ct.has(M) ? ct.delete(M) : ct.add(M), ct;
      }), _(M), y == null || y(Q ? void 0 : M);
    },
    [T, y]
  ), { listboxRef: S, activeId: O, handleKeyDown: W } = Bi({
    options: x,
    onOptionSelect: z
  }), K = j(
    (M) => {
      M.key === "Escape" ? (k && T.has(k) && (C((Q) => {
        const mt = new Set(Q);
        return mt.delete(k), mt;
      }), _(void 0), y == null || y(void 0)), M.preventDefault(), M.stopPropagation()) : W(M);
    },
    [k, T, W, y]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: S,
      "aria-activedescendant": O ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: K,
      children: $.map((M) => /* @__PURE__ */ a(
        "div",
        {
          className: f({
            "tw:opacity-60": M.status === "Resolved"
          }),
          children: /* @__PURE__ */ a(
            jd,
            {
              classNameForVerseText: e,
              comments: M.comments,
              localizedStrings: n,
              verseRef: M.verseRef,
              handleSelectThread: A,
              threadId: M.id,
              thread: M,
              isRead: M.isRead,
              isSelected: T.has(M.id),
              currentUser: o,
              assignedUser: M.assignedUser,
              threadStatus: M.status,
              handleAddCommentToThread: V,
              handleUpdateComment: s,
              handleDeleteComment: c,
              handleReadStatusChange: d,
              assignableUsers: l,
              canUserAddCommentToThread: w,
              canUserAssignThreadCallback: p,
              canUserResolveThreadCallback: g,
              canUserEditOrDeleteCommentCallback: h,
              onVerseRefClick: v,
              initialAssignedUser: I
            }
          )
        },
        M.id
      ))
    }
  );
}
const lp = Object.freeze([
  "%conflictNote_description_verseText%",
  "%conflictNote_chooseLabel%",
  "%conflictNote_chooseAriaLabel%",
  "%conflictNote_accept%",
  "%conflictNote_reject%",
  "%conflictNote_rejectedLabel%",
  "%conflictNote_acceptedLabel%",
  "%conflictNote_resultLabel%",
  "%conflictNote_resultUnavailable%"
]);
function We({ ...t }) {
  return /* @__PURE__ */ a(Pt.Root, { "data-slot": "select", ...t });
}
function Fd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Pt.Group,
    {
      "data-slot": "select-group",
      className: f("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function Xe({ ...t }) {
  return /* @__PURE__ */ a(Pt.Value, { "data-slot": "select-value", ...t });
}
function Je({ className: t, size: e = "default", children: r, ...o }) {
  const n = Ft();
  return /* @__PURE__ */ u(
    Pt.Trigger,
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
        /* @__PURE__ */ a(Pt.Icon, { asChild: !0, children: /* @__PURE__ */ a(Fc, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function Ze({
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
  const i = Ft();
  return /* @__PURE__ */ a(Pt.Portal, { children: /* @__PURE__ */ u(
    Pt.Content,
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
        /* @__PURE__ */ a(Bd, {}),
        /* @__PURE__ */ a(
          Pt.Viewport,
          {
            "data-position": r,
            className: f(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ a(Ud, {})
      ]
    }
  ) });
}
function dp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Pt.Label,
    {
      "data-slot": "select-label",
      className: f("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Xt({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    Pt.Item,
    {
      "data-slot": "select-item",
      className: f(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(Pt.ItemIndicator, { children: /* @__PURE__ */ a(aa, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(Pt.ItemText, { children: e })
      ]
    }
  );
}
function wp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pt.Separator,
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
function Bd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(jc, {})
    }
  );
}
function Ud({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Pt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: f(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Lc, {})
    }
  );
}
const Kd = "verseText", qd = f(
  fi,
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-diff-deleted tw:[&_s]:line-through"
), Gd = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1");
function Na({ label: t, rawHtml: e }) {
  const r = L(() => Gd(wn(e)), [e]), o = /* @__PURE__ */ a(
    "div",
    {
      className: qd,
      dangerouslySetInnerHTML: { __html: r }
    }
  );
  return t ? /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("span", { className: "tw:font-medium", children: t }),
    o
  ] }) : o;
}
function up({
  comment: t,
  localizedStrings: e,
  selectedResolution: r,
  onResolutionChange: o,
  canAcceptReject: n = !0
}) {
  const [i, s] = N("accept"), c = r ?? i, d = qs();
  if (!(t.conflictType === Kd)) return /* @__PURE__ */ a(Na, { rawHtml: t.contents });
  const w = r !== void 0, p = (h) => {
    const m = h === "reject" ? "reject" : "accept";
    w || s(m), o == null || o(m);
  }, g = c === "reject" ? t.rejectedResultText : t.resultText;
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", children: [
    /* @__PURE__ */ a("p", { children: (e == null ? void 0 : e["%conflictNote_description_verseText%"]) ?? "Conflicting changes were made to the verse text." }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:gap-2", children: [
      /* @__PURE__ */ a("span", { children: (e == null ? void 0 : e["%conflictNote_chooseLabel%"]) ?? "Choose:" }),
      /* @__PURE__ */ u(We, { value: c, onValueChange: p, disabled: !n, children: [
        /* @__PURE__ */ a(
          Je,
          {
            className: "tw:min-w-32",
            "aria-label": (e == null ? void 0 : e["%conflictNote_chooseAriaLabel%"]) ?? "Choose resolution",
            children: /* @__PURE__ */ a(Xe, {})
          }
        ),
        /* @__PURE__ */ u(Ze, { children: [
          /* @__PURE__ */ a(Xt, { value: "accept", children: (e == null ? void 0 : e["%conflictNote_accept%"]) ?? "Accept" }),
          /* @__PURE__ */ a(Xt, { value: "reject", children: (e == null ? void 0 : e["%conflictNote_reject%"]) ?? "Reject" })
        ] })
      ] })
    ] }),
    !!t.acceptedText && /* @__PURE__ */ a(
      Na,
      {
        label: (e == null ? void 0 : e["%conflictNote_acceptedLabel%"]) ?? "Accepted",
        rawHtml: t.acceptedText
      }
    ),
    !!t.rejectedText && /* @__PURE__ */ a(
      Na,
      {
        label: (e == null ? void 0 : e["%conflictNote_rejectedLabel%"]) ?? "Rejected",
        rawHtml: t.rejectedText
      }
    ),
    /* @__PURE__ */ a(He, {}),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
      /* @__PURE__ */ a("span", { id: d, className: "tw:font-medium", children: (e == null ? void 0 : e["%conflictNote_resultLabel%"]) ?? "Result" }),
      /* @__PURE__ */ a("div", { "aria-live": "polite", "aria-labelledby": d, children: g ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: g }) : (
        // The chosen side has no result USFM to preview. Its absence has two causes we can't tell
        // apart here (the outcome decodes to an empty verse, or the note carries no decodable
        // diff — see rejectedResultText docs), so show a neutral "unavailable" state rather than
        // asserting the verse will be empty.
        /* @__PURE__ */ a("p", { className: "tw:italic tw:text-muted-foreground", children: (e == null ? void 0 : e["%conflictNote_resultUnavailable%"]) ?? "No result preview available." })
      ) })
    ] })
  ] });
}
function Hd({ table: t }) {
  return /* @__PURE__ */ u(_e, { children: [
    /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ u(B, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(bs, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(Ce, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Nr, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Ye, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        Re,
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
function Yd({ table: t }) {
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
        We,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(Je, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(Xe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(Ze, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(Xt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(xs, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(ys, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(ks, { className: "tw:h-4 tw:w-4" })
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
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(_s, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Jo = `
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
function Wd(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function kr(t, e) {
  const r = e ? `${Jo}, ${e}` : Jo;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Wd(o)
  );
}
function na({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const n = ut.useRef(null);
  ut.useEffect(() => {
    typeof r == "function" ? r(n.current) : r && "current" in r && (r.current = n.current);
  }, [r]), ut.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const c = () => {
      requestAnimationFrame(() => {
        kr(s, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const d = new MutationObserver(() => {
      c();
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
    const { current: c } = n;
    if (c) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), kr(c)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === c && s.preventDefault();
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
function wo({
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
function ia({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: f("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function pp({ className: t, ...e }) {
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
function Xd(t) {
  ut.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const n = t.current ? kr(t.current) : [], i = n.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function Jd(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Zd(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function ce({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: n,
  ...i
}) {
  const s = ut.useRef(null);
  ut.useEffect(() => {
    typeof n == "function" ? n(s.current) : n && "current" in n && (n.current = s.current);
  }, [n]), Xd(s);
  const c = ut.useMemo(
    () => s.current ? kr(s.current) : [],
    [s]
  ), d = ut.useCallback(
    (w) => {
      const { current: p } = s;
      if (!p || !p.parentElement) return;
      const g = p.closest("table"), h = g ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        kr(g).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], m = h.indexOf(p), y = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Zd(h, m, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Jd(c, y, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const v = p.closest("table");
        v && v.focus();
      }
      e == null || e(w);
    },
    [s, c, e]
  ), l = ut.useCallback(
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
      onFocus: l,
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
function Zr({ className: t, ...e }) {
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
function te({ className: t, ...e }) {
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
function hp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: f("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Qd({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: c,
  isLoading: d = !1,
  noResultsMessage: l
}) {
  var F;
  const [w, p] = N([]), [g, h] = N([]), [m, y] = N({}), [v, T] = N({}), C = L(() => e ?? [], [e]), k = An({
    data: C,
    columns: t,
    getCoreRowModel: In(),
    ...r && { getPaginationRowModel: Qc() },
    onSortingChange: p,
    getSortedRowModel: Pn(),
    onColumnFiltersChange: h,
    getFilteredRowModel: Zc(),
    onColumnVisibilityChange: y,
    onRowSelectionChange: T,
    state: {
      sorting: w,
      columnFilters: g,
      columnVisibility: m,
      rowSelection: v
    }
  }), _ = k.getVisibleFlatColumns();
  let I;
  return d ? I = Array.from({ length: 10 }).map((x, z) => `skeleton-row-${z}`).map((x) => /* @__PURE__ */ a(ce, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(te, { colSpan: _.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(Da, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, x)) : ((F = k.getRowModel().rows) == null ? void 0 : F.length) > 0 ? I = k.getRowModel().rows.map((V) => /* @__PURE__ */ a(
    ce,
    {
      onClick: () => s(V, k),
      "data-state": V.getIsSelected() && "selected",
      children: V.getVisibleCells().map(($) => /* @__PURE__ */ a(te, { children: mr($.column.columnDef.cell, $.getContext()) }, $.id))
    },
    V.id
  )) : I = /* @__PURE__ */ a(ce, { children: /* @__PURE__ */ a(te, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: l }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Hd, { table: k }),
    /* @__PURE__ */ u(na, { stickyHeader: i, children: [
      /* @__PURE__ */ a(wo, { stickyHeader: i, children: k.getHeaderGroups().map((V) => /* @__PURE__ */ a(ce, { children: V.headers.map(($) => /* @__PURE__ */ a(Zr, { className: "tw:p-0", children: $.isPlaceholder ? void 0 : mr($.column.columnDef.header, $.getContext()) }, $.id)) }, V.id)) }),
      /* @__PURE__ */ a(ia, { children: I })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.previousPage(),
          disabled: !k.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.nextPage(),
          disabled: !k.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(Yd, { table: k })
  ] });
}
function gp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = L(
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
      children: /* @__PURE__ */ a(rl, { options: i, children: e })
    }
  );
}
const tw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Zo = (t, e) => t[e] ?? e;
function ew({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = Zo(r, "%webView_error_dump_header%"), i = Zo(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(hn, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const fp = Object.freeze([
  ...tw,
  "%webView_error_dump_copied_message%"
]);
function mp({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, c] = N(!1), d = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u(ze, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(Ie, { asChild: !0, children: o }),
    /* @__PURE__ */ u(De, { id: i, className: f("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Nt, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        ew,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var rw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(rw || {});
function vp({ id: t, label: e, groups: r }) {
  const [o, n] = N(
    Object.fromEntries(
      r.map(
        (l, w) => l.itemType === 0 ? [w, []] : void 0
      ).filter((l) => !!l)
    )
  ), [i, s] = N({}), c = (l, w) => {
    const p = !o[l][w];
    n((h) => (h[l][w] = p, { ...h }));
    const g = r[l].items[w];
    g.onUpdate(g.id, p);
  }, d = (l, w) => {
    s((g) => (g[l] = w, { ...g }));
    const p = r[l].items.find((g) => g.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(_e, { children: [
    /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ u(B, { variant: "default", children: [
      /* @__PURE__ */ a(Ns, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(or, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(Ce, { children: r.map((l, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(Nr, { children: l.label }),
      /* @__PURE__ */ a(cn, { children: l.itemType === 0 ? /* @__PURE__ */ a(tt, { children: l.items.map((p, g) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        Re,
        {
          checked: o[w][g],
          onCheckedChange: () => c(w, g),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Ui,
        {
          value: i[w],
          onValueChange: (p) => d(w, p),
          children: l.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Ki, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(Ye, {})
    ] }, l.label)) })
  ] }) });
}
function bp({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const d = new rs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, p) => w + p, 0)), l = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ u(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex", children: /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ a(Cs, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
          /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((w) => /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: w.toUpperCase() }, w)) }),
          o.length > 3 && /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => l(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (n || s) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            B,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Es, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            B,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Ts, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function aw({ id: t, versionHistory: e }) {
  const [r, o] = N(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), l = new Date(n.getTime() - d.getTime()), w = l.getUTCFullYear() - 1970, p = l.getUTCMonth(), g = l.getUTCDate() - 1;
    let h = "";
    return w > 0 ? h = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? h = `${p.toString()} month${p === 1 ? "" : "s"} ago` : g === 0 ? h = "today" : h = `${g.toString()} day${g === 1 ? "" : "s"} ago`, h;
  }
  const s = Object.entries(e).sort((c, d) => d[0].localeCompare(c[0]));
  return /* @__PURE__ */ u("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ a("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ a("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (r ? s : s.slice(0, 5)).map((c) => /* @__PURE__ */ u("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ a("div", { className: "tw:text-foreground", children: /* @__PURE__ */ a("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ a("span", { children: c[1].description }) }) }),
      /* @__PURE__ */ u("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ u("div", { children: [
          "Version ",
          c[0]
        ] }),
        /* @__PURE__ */ a("div", { children: i(c[1].date) })
      ] })
    ] }, c[0])) }),
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
function xp({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = L(() => as(r), [r]), d = ((l) => {
    const w = new Intl.DisplayNames(os(), { type: "language" });
    return l.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(aw, { versionHistory: n }),
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
function mi({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  hasToggleAllFeature: n = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: c = "No entries found",
  customSelectedText: d,
  isOpen: l = void 0,
  onOpenChange: w = void 0,
  isDisabled: p = !1,
  sortSelected: g = !1,
  icon: h = void 0,
  className: m = void 0,
  variant: y = "ghost",
  id: v
}) {
  const [T, C] = N(!1), k = j(
    (z) => {
      var S;
      const A = (S = t.find((O) => O.label === z)) == null ? void 0 : S.value;
      A && r(
        e.includes(A) ? e.filter((O) => O !== A) : [...e, A]
      );
    },
    [t, e, r]
  ), _ = () => d || o, I = L(() => {
    if (!g) return t;
    const z = t.filter((S) => S.starred).sort((S, O) => S.label.localeCompare(O.label)), A = t.filter((S) => !S.starred).sort((S, O) => {
      const W = e.includes(S.value), K = e.includes(O.value);
      return W && !K ? -1 : !W && K ? 1 : S.label.localeCompare(O.label);
    });
    return [...z, ...A];
  }, [t, e, g]), F = () => {
    r(t.map((z) => z.value));
  }, V = () => {
    r([]);
  }, $ = l ?? T;
  return /* @__PURE__ */ a("div", { id: v, className: m, children: /* @__PURE__ */ u(ze, { open: $, onOpenChange: w ?? C, children: [
    /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ u(
      B,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": $,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: p,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            h && /* @__PURE__ */ a("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ a("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: h }) }),
            /* @__PURE__ */ a(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: _()
              }
            )
          ] }),
          /* @__PURE__ */ a(gn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(De, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ u(Ve, { children: [
      /* @__PURE__ */ a(_r, { placeholder: `Search ${o.toLowerCase()}...` }),
      n && /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ a(B, { variant: "ghost", size: "sm", onClick: F, children: i }),
        /* @__PURE__ */ a(B, { variant: "ghost", size: "sm", onClick: V, children: s })
      ] }),
      /* @__PURE__ */ u(Le, { children: [
        /* @__PURE__ */ a(ta, { children: c }),
        /* @__PURE__ */ a(pe, { children: I.map((z) => /* @__PURE__ */ u(
          Te,
          {
            value: z.label,
            onSelect: k,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ a("div", { className: "w-4", children: /* @__PURE__ */ a(
                Ae,
                {
                  className: f(
                    "tw:h-4 tw:w-4",
                    e.includes(z.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              z.starred && /* @__PURE__ */ a(zs, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ a("div", { className: "tw:flex-grow", children: z.label }),
              z.secondaryLabel && /* @__PURE__ */ a("div", { className: "tw:text-end tw:text-muted-foreground", children: z.secondaryLabel })
            ]
          },
          z.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function yp({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: c,
  icon: d,
  className: l,
  badgesPlaceholder: w,
  id: p
}) {
  return /* @__PURE__ */ u("div", { id: p, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      mi,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: c,
        icon: d,
        className: l
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((g) => {
      var h;
      return /* @__PURE__ */ u(br, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((m) => m !== g)),
            children: /* @__PURE__ */ a(ea, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (h = t.find((m) => m.value === g)) == null ? void 0 : h.label
      ] }, g);
    }) }) : /* @__PURE__ */ a(Nt, { children: w })
  ] });
}
function Qo({ className: t, ...e }) {
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
function kp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: f("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const ow = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), tn = (t, e) => t[e] ?? e;
function nw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = L(() => /Macintosh/i.test(navigator.userAgent), []), l = tn(n, "%undoButton_tooltip%"), w = tn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(co, { children: [
    /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(
        B,
        {
          "aria-label": l,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Ds, {})
        }
      ) }),
      /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ u("p", { children: [
        l,
        i && /* @__PURE__ */ u(tt, { children: [
          " ",
          /* @__PURE__ */ a(Qo, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(pi, {}),
    e && /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(
        B,
        {
          "aria-label": w,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: c,
          children: /* @__PURE__ */ a(Ss, {})
        }
      ) }),
      /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(tt, { children: [
          " ",
          /* @__PURE__ */ a(Qo, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function iw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = q(null);
  return Y(() => {
    var d;
    const i = /Macintosh/i.test(navigator.userAgent), s = ((d = n.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var p, g, h, m;
      if (!s || document.activeElement !== s) return;
      const w = l.key.toLowerCase();
      if (i) {
        if (!l.metaKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((p = e.current) == null || p.undo())) : l.shiftKey && w === "z" && (l.preventDefault(), o && ((g = e.current) == null || g.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && w === "z" ? (l.preventDefault(), r && ((h = e.current) == null || h.undo())) : (w === "y" || l.shiftKey && w === "z") && (l.preventDefault(), o && ((m = e.current) == null || m.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const sw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(tt, { children: [
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
function cw({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = q(null), s = q(null), c = q(!1), [d, l] = N(t), [w, p] = N(r), [g, h] = N(!1);
  Y(() => {
    l(t);
  }, [t]), Y(() => {
    w !== r && p(r);
  }, [r]);
  const m = (v) => {
    c.current = !1, h(v), v || (d !== "custom" || w ? (e(d), o(w)) : (l(t), p(r)));
  }, y = (v) => {
    var T, C, k, _;
    v.stopPropagation(), document.activeElement === s.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((T = i.current) == null || T.focus(), c.current = !0) : document.activeElement === i.current && v.key === "ArrowUp" ? ((C = s.current) == null || C.focus(), c.current = !1) : document.activeElement === i.current && v.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((_ = s.current) == null || _.focus(), c.current = !1), d === "custom" && v.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && m(!1);
  };
  return /* @__PURE__ */ u(_e, { open: g, onOpenChange: m, children: [
    /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ a(B, { variant: "outline", className: "tw:h-6", children: sw(t, n, r) }) }) }),
      /* @__PURE__ */ a(oe, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      Ce,
      {
        style: { zIndex: ln },
        onClick: () => {
          c.current && (c.current = !1);
        },
        onKeyDown: y,
        onMouseMove: () => {
          var v;
          c.current && ((v = i.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ a(Nr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Ye, {}),
          /* @__PURE__ */ a(
            Re,
            {
              checked: d === "generated",
              onCheckedChange: () => l("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ia })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Re,
            {
              checked: d === "hidden",
              onCheckedChange: () => l("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Va })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            Re,
            {
              ref: s,
              checked: d === "custom",
              onCheckedChange: () => l("custom"),
              onClick: (v) => {
                var T;
                v.stopPropagation(), c.current = !0, (T = i.current) == null || T.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  zr,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), l("custom"), c.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => p(v.target.value)
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
const lw = (t, e) => t === "f" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(mn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(vn, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(tt, { children: [
  /* @__PURE__ */ a(fn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), dw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), xe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ww({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(_e, { children: [
    /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ a(B, { variant: "outline", className: "tw:h-6", children: lw(t, r) }) }) }),
      /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ a("p", { children: dw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(Ce, { style: { zIndex: ln }, children: [
      /* @__PURE__ */ a(Nr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Ye, {}),
      /* @__PURE__ */ u(
        Re,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(fn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Re,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(mn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        Re,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(vn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const uw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These two keys are not read by this component directly; they are provided here so callers can
  // localize them and pass the result into the optional `searchPlaceholder` prop to override the
  // default search-field placeholder.
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function pw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? Os, { className: e, size: 16 });
}
function en({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    Te,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? /* @__PURE__ */ a("span", { className: "tw:text-xs", children: t.marker }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(pw, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ a("p", { className: "tw:text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ a("p", { className: "tw:text-xs tw:text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(qi, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function hw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = N(""), [s, c] = L(() => {
    const d = n.trim().toLowerCase();
    if (!d) {
      const p = e.filter((g) => !g.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const l = e.filter((p) => {
      var h;
      const g = (h = p.marker) == null ? void 0 : h.toLowerCase();
      return p.isDisallowed ? g === d : g == null ? void 0 : g.includes(d);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(d) && !l.includes(p)
    );
    return [l, w];
  }, [n, e]);
  return /* @__PURE__ */ u(Ve, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      _r,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (d) => i(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(Le, { children: [
      /* @__PURE__ */ a(ta, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(pe, { children: s.map((d) => {
        var l;
        return /* @__PURE__ */ a(
          en,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(tt, { children: [
        s.length > 0 && /* @__PURE__ */ a(dn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(pe, { children: c.map((d) => {
          var l;
          return /* @__PURE__ */ a(
            en,
            {
              item: d,
              localizedStrings: t
            },
            `item-${d.marker ?? ((l = d.icon) == null ? void 0 : l.displayName)}-${d.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function gw(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = jr[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((c) => ({
        marker: c,
        title: r[jr[c].description] ?? jr[c].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(c), e();
        }
      }))
    );
  }), i.sort((s, c) => (s.marker ?? s.title).localeCompare(c.marker ?? c.title));
}
function fw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function mw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const vw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function _p({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: c,
  localizedStrings: d,
  parentEditorRef: l
}) {
  const w = q(null), p = q(null), g = q(null), h = q(null);
  Jt(() => {
    if (!h.current) return;
    const { width: P } = h.current.getBoundingClientRect();
    P > 0 && (h.current.style.width = `${P}px`);
  }, []);
  const [m, y] = N("generated"), [v, T] = N("generated"), [C, k] = N("*"), [_, I] = N("*"), [F, V] = N("f"), [$, x] = N(!1), [z, A] = N(!0), [S, O] = N(!1), W = q(!1), K = q(""), [M, Q] = N(!1), [mt, ct] = N(), [Bt, bt] = N(), [St, U] = N(), [rt, ot] = N(), nt = q(null), it = L(
    () => ({
      ...s,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: { ...s.view ?? al(), noteMode: "expanded" }
    }),
    [s, c]
  ), It = L(
    () => gw(
      w,
      () => Q(!1),
      d,
      rt
    ),
    [d, rt]
  );
  Y(() => {
    var P;
    M || (P = w.current) == null || P.focus();
  }, [F, M]), Y(() => {
    var st, at;
    let P;
    W.current = !1, A(!0);
    const H = e == null ? void 0 : e.at(0);
    if (H && Pr("note", H)) {
      const ht = (st = H.insert.note) == null ? void 0 : st.caller;
      let xt = "custom";
      ht === Ia ? xt = "generated" : ht === Va ? xt = "hidden" : ht && (k(ht), I(ht)), y(xt), T(xt), V(((at = H.insert.note) == null ? void 0 : at.style) ?? "f"), P = setTimeout(() => {
        var yt;
        (yt = w.current) == null || yt.applyUpdate([H]);
      }, 0);
    }
    return () => {
      P && clearTimeout(P);
    };
  }, [e, i]);
  const vt = j(
    (P, H, st = !1) => {
      var ht, xt, yt;
      const at = (xt = (ht = w.current) == null ? void 0 : ht.getNoteOps(0)) == null ? void 0 : xt.at(0);
      if (at && Pr("note", at)) {
        if (at.insert.note) {
          let gt;
          P === "custom" ? gt = H : P === "generated" ? gt = Ia : gt = Va, at.insert.note.caller = gt;
        }
        r == null || r([at]), st && l && i && ((yt = l.current) == null || yt.replaceEmbedUpdate(i, [at]));
      }
    },
    [i, r, l]
  ), Ut = j(() => {
    vt(m, C, !0), o();
  }, [m, C, o, vt]), Kt = q(Ut);
  Jt(() => {
    Kt.current = Ut;
  });
  const D = q({ book: n.book, chapterNum: n.chapterNum });
  Jt(() => {
    (D.current.book !== n.book || D.current.chapterNum !== n.chapterNum) && (D.current = { book: n.book, chapterNum: n.chapterNum }, Kt.current());
  }, [n.book, n.chapterNum]);
  const Ot = () => {
    var H;
    const P = (H = p.current) == null ? void 0 : H.getElementsByClassName("editor-input")[0];
    P != null && P.textContent && navigator.clipboard.writeText(P.textContent);
  }, Vt = j(
    (P) => {
      y(P), vt(P, C);
    },
    [C, vt]
  ), ie = j(
    (P) => {
      k(P), vt(m, P);
    },
    [m, vt]
  ), qt = (P) => {
    var st, at, ht, xt, yt;
    V(P);
    const H = (at = (st = w.current) == null ? void 0 : st.getNoteOps(0)) == null ? void 0 : at.at(0);
    if (H && Pr("note", H)) {
      H.insert.note && (H.insert.note.style = P);
      const gt = (xt = (ht = H.insert.note) == null ? void 0 : ht.contents) == null ? void 0 : xt.ops;
      F !== "x" && P === "x" ? gt == null || gt.forEach((Ct) => fw(Ct)) : F === "x" && P !== "x" && (gt == null || gt.forEach((Ct) => mw(Ct))), (yt = w.current) == null || yt.applyUpdate([H, { delete: 1 }]);
    }
  }, $t = (P) => {
    ot(P.contextMarker), O(P.canRedo);
  }, Se = j(
    (P) => {
      var st, at, ht, xt, yt;
      const H = (at = (st = w.current) == null ? void 0 : st.getNoteOps(0)) == null ? void 0 : at.at(0);
      if (H && Pr("note", H)) {
        P.content.length > 1 && setTimeout(() => {
          var E;
          (E = w.current) == null || E.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const gt = (ht = H.insert.note) == null ? void 0 : ht.style, Ct = (yt = (xt = H.insert.note) == null ? void 0 : xt.contents) == null ? void 0 : yt.ops;
        if (gt || x(!1), x(
          gt === "x" ? !!(Ct != null && Ct.every((E) => {
            var pt, kt;
            if (!((pt = E.attributes) != null && pt.char)) return !0;
            const wt = ((kt = E.attributes) == null ? void 0 : kt.char).style;
            return wt === "xt" || wt === "xo" || wt === "xq";
          })) : !!(Ct != null && Ct.every((E) => {
            var pt, kt;
            if (!((pt = E.attributes) != null && pt.char)) return !0;
            const wt = ((kt = E.attributes) == null ? void 0 : kt.char).style;
            return wt === "ft" || wt === "fr" || wt === "fq";
          }))
        ), !W.current) {
          W.current = !0, K.current = JSON.stringify(H), A(!0);
          return;
        }
        A(JSON.stringify(H) === K.current), vt(m, C);
      } else
        x(!1), A(!0);
    },
    [m, C, vt]
  ), Gt = j(() => {
    const P = window.getSelection();
    if (g.current && It.length && P && P.rangeCount > 0) {
      const H = P.getRangeAt(0).getBoundingClientRect(), st = g.current.getBoundingClientRect();
      ct(H.left - st.left), bt(H.top - st.top), U(H.height), Q(!0);
    }
  }, [It, g]);
  Y(() => {
    const P = () => {
      M && Q(!1);
    };
    return window.addEventListener("click", P), () => {
      window.removeEventListener("click", P);
    };
  }, [M]), Y(() => {
    var P;
    M && ((P = nt.current) == null || P.focus());
  }, [M]), Y(() => {
    var st;
    const P = ((st = p.current) == null ? void 0 : st.querySelector(".editor-input")) ?? void 0, H = (at) => {
      !M && P && document.activeElement === P && at.key === c ? (at.preventDefault(), Gt()) : M && at.key === "Escape" && (at.preventDefault(), Q(!1));
    };
    return document.addEventListener("keydown", H), () => {
      document.removeEventListener("keydown", H);
    };
  }, [M, Gt, c]);
  const Ht = d["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ u("div", { ref: h, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            ww,
            {
              isTypeSwitchable: $,
              noteType: F,
              handleNoteTypeChange: qt,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            cw,
            {
              callerType: m,
              updateCallerType: Vt,
              customCaller: C,
              updateCustomCaller: ie,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(co, { children: [
          /* @__PURE__ */ a(
            nw,
            {
              onUndoClick: () => {
                var P;
                return (P = w.current) == null ? void 0 : P.undo();
              },
              onRedoClick: () => {
                var P;
                return (P = w.current) == null ? void 0 : P.redo();
              },
              canUndo: !z,
              canRedo: S,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ a(
            gi,
            {
              onCancelClick: o,
              onAcceptClick: Ut,
              canAccept: !z || v !== m || m === "custom" && C !== _,
              localizedStrings: d,
              acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u(
        "div",
        {
          ref: p,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ a("div", { className: t, children: /* @__PURE__ */ a(
              iw,
              {
                editorRef: w,
                canUndo: !z,
                canRedo: S,
                children: /* @__PURE__ */ a(
                  ol,
                  {
                    options: it,
                    onStateChange: $t,
                    onUsjChange: Se,
                    defaultUsj: vw,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: w
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
              /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ a(
                B,
                {
                  "aria-label": Ht,
                  onClick: Ot,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(hn, {})
                }
              ) }),
              /* @__PURE__ */ a(oe, { children: /* @__PURE__ */ a("p", { children: Ht }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "tw:absolute",
        ref: g,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ u(ze, { open: M, children: [
      /* @__PURE__ */ a(
        Gi,
        {
          className: "tw:absolute",
          style: {
            top: Bt,
            left: mt,
            height: St,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        De,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (P) => {
            P.preventDefault(), P.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            hw,
            {
              markerMenuItems: It,
              localizedStrings: d,
              searchRef: nt
            }
          )
        }
      )
    ] })
  ] });
}
const Np = Object.freeze([
  ...uw,
  ...Object.entries(jr).map(([, t]) => t.description).filter((t) => !!t),
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
  ...ow,
  ...hi
]);
function vi(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((n) => typeof n == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function bw(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let s = [];
  return e.forEach((c) => {
    typeof c != "string" && c.marker === "fp" ? (s.length > 0 && i.push(s), s = [c]) : s.push(c);
  }), s.length > 0 && i.push(s), i.map((c, d) => {
    const l = d === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      uo(t, c, r, !0, n),
      l && o
    ] }, vi(t, c));
  });
}
function uo(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const c = f(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: c, children: i }, s);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(Ma, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(Ma, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return xw(
        i,
        vi(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function xw(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      Ma,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    uo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function yw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let s, c = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...c] = t.content);
  const d = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, l = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: f("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), p = s && /* @__PURE__ */ u(tt, { children: [
    uo(t.marker, [s], o, !1),
    " "
  ] }), g = e === "horizontal" ? "horizontal" : "vertical", h = o ? "marker-visible" : "", m = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", y = f(g, h);
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ u("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", y), children: [
      d,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: f("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", y), children: p }),
    /* @__PURE__ */ a(
      "div",
      {
        className: f(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          m,
          y
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(tt, { children: bw(t.marker, c, o, l) })
      }
    )
  ] });
}
function Cp({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: c = !1,
  formatCaller: d,
  onFootnoteSelected: l
}) {
  const w = d ?? ns(r, void 0), p = (C, k) => {
    l == null || l(C, k, n);
  }, g = i ? r.findIndex((C) => C === i) : -1, [h, m] = N(g), y = (C, k, _) => {
    if (r.length)
      switch (C.key) {
        case "Enter":
        case " ":
          C.preventDefault(), l == null || l(k, _, n);
          break;
      }
  }, v = (C) => {
    if (r.length)
      switch (C.key) {
        case "ArrowDown":
          C.preventDefault(), m((k) => Math.min(k + 1, r.length - 1));
          break;
        case "ArrowUp":
          C.preventDefault(), m((k) => Math.max(k - 1, 0));
          break;
      }
  }, T = q([]);
  return Y(() => {
    var C;
    h >= 0 && h < T.current.length && ((C = T.current[h]) == null || C.focus());
  }, [h]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: h < 0 ? 0 : -1,
      className: f("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: v,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: f(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !c && "formatted-font"
          ),
          children: r.map((C, k) => {
            const _ = C === i, I = `${n}-${k}`;
            return /* @__PURE__ */ u(tt, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: (F) => {
                    T.current[k] = F;
                  },
                  role: "option",
                  "aria-selected": _,
                  "data-marker": C.marker,
                  "data-state": _ ? "selected" : void 0,
                  tabIndex: k === h ? 0 : -1,
                  className: f(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    l && "tw:hover:bg-muted/50",
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
                  onClick: () => p(C, k),
                  onKeyDown: (F) => y(F, C, k),
                  children: /* @__PURE__ */ a(
                    yw,
                    {
                      footnote: C,
                      layout: o,
                      formatCaller: () => w(C.caller, k),
                      showMarkers: s
                    }
                  )
                },
                I
              ),
              k < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(He, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function kw(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function _w({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = L(() => {
    const c = [], d = /* @__PURE__ */ new Set();
    return t.forEach((l) => {
      const w = `${l.reference.book}:${l.reference.chapterNum}:${l.reference.verseNum}:${l.text}`;
      d.has(w) || (d.add(w), c.push(l));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(na, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(wo, { stickyHeader: !0, children: /* @__PURE__ */ u(ce, { children: [
      /* @__PURE__ */ a(Zr, { children: n }),
      /* @__PURE__ */ a(Zr, { children: i })
    ] }) }),
    /* @__PURE__ */ a(ia, { children: s.length > 0 && s.map((c) => /* @__PURE__ */ u(
      ce,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(te, { children: ye(c.reference, "English") }),
          /* @__PURE__ */ a(te, { className: o, children: kw(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function bi({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Co.Root,
    {
      "data-slot": "checkbox",
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Co.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(aa, {})
        }
      )
    }
  );
}
const Nw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(As, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a(Ps, { className: "tw:h-4 tw:w-4" });
}, sa = (t, e, r) => /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
  /* @__PURE__ */ u(
    ae,
    {
      className: f("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Nw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(oe, { side: "bottom", children: e })
] }) }), Ep = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => sa(e, t)
}), Cw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => sa(r, t)
}), Tp = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => sa(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Ca = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((d) => {
    e === "approved" ? s.includes(d) || s.push(d) : s = s.filter((l) => l !== d);
  }), o(s);
  let c = [...n];
  t.forEach((d) => {
    e === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((l) => l !== d);
  }), i(c);
}, zp = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => sa(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(di, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          Ur,
          {
            onClick: (d) => {
              d.stopPropagation(), Ca(
                [c],
                "approved",
                e,
                r,
                o,
                n
              );
            },
            value: "approved",
            className: "tw:rounded-e-none tw:border-e-0",
            children: /* @__PURE__ */ a($s, {})
          }
        ),
        /* @__PURE__ */ a(
          Ur,
          {
            onClick: (d) => {
              d.stopPropagation(), Ca(
                [c],
                "unapproved",
                e,
                r,
                o,
                n
              );
            },
            value: "unapproved",
            className: "tw:rounded-none",
            children: /* @__PURE__ */ a(Ms, {})
          }
        ),
        /* @__PURE__ */ a(
          Ur,
          {
            onClick: (d) => {
              d.stopPropagation(), Ca(
                [c],
                "unknown",
                e,
                r,
                o,
                n
              );
            },
            value: "unknown",
            className: "tw:rounded-s-none tw:border-s-0",
            children: /* @__PURE__ */ a(Rs, {})
          }
        )
      ] }) })
    );
  }
}), Dp = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Sp = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Op = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ew = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", $p = Object.freeze([
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
]), Tw = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, zw = (t, e, r) => t.map((o) => {
  const n = vo(o.key) ? o.key : o.key[0];
  return {
    items: vo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Ew(n, e, r),
    occurrences: o.occurrences || []
  };
}), de = (t, e) => t[e] ?? e;
function Mp({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: i,
  scope: s,
  onScopeChange: c,
  columns: d,
  id: l,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: p,
  onItemSelected: g
}) {
  const h = de(r, "%webView_inventory_all%"), m = de(r, "%webView_inventory_approved%"), y = de(r, "%webView_inventory_unapproved%"), v = de(r, "%webView_inventory_unknown%"), T = de(r, "%webView_inventory_scope_currentBook%"), C = de(r, "%webView_inventory_scope_chapter%"), k = de(r, "%webView_inventory_scope_verse%"), _ = de(r, "%webView_inventory_filter_text%"), I = de(
    r,
    "%webView_inventory_show_additional_items%"
  ), F = de(r, "%webView_inventory_no_results%"), [V, $] = N(!1), [x, z] = N("all"), [A, S] = N(""), [O, W] = N([]), K = L(() => {
    const U = t ?? [];
    return U.length === 0 ? [] : zw(U, n, i);
  }, [t, n, i]), M = L(() => {
    if (V) return K;
    const U = [];
    return K.forEach((rt) => {
      const ot = rt.items[0], nt = U.find(
        (it) => it.items[0] === ot
      );
      nt ? (nt.count += rt.count, nt.occurrences = nt.occurrences.concat(rt.occurrences)) : U.push({
        items: [ot],
        count: rt.count,
        occurrences: rt.occurrences,
        status: rt.status
      });
    }), U;
  }, [V, K]), Q = L(() => M.length === 0 ? [] : Tw(M, x, A), [M, x, A]), mt = L(() => {
    var ot, nt;
    if (!V) return d;
    const U = (ot = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ot.length;
    if (!U) return d;
    const rt = [];
    for (let it = 0; it < U; it++)
      rt.push(
        Cw(
          ((nt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : nt[it]) || "Additional Item",
          it + 1
        )
      );
    return [...rt, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, V]);
  Y(() => {
    Q.length === 0 ? W([]) : Q.length === 1 && W(Q[0].items);
  }, [Q]);
  const ct = (U, rt) => {
    rt.setRowSelection(() => {
      const nt = {};
      return nt[U.index] = !0, nt;
    });
    const ot = U.original.items;
    W(ot), g && ot.length > 0 && g(ot[0]);
  }, Bt = (U) => {
    if (U === "book" || U === "chapter" || U === "verse")
      c(U);
    else
      throw new Error(`Invalid scope value: ${U}`);
  }, bt = (U) => {
    if (U === "all" || U === "approved" || U === "unapproved" || U === "unknown")
      z(U);
    else
      throw new Error(`Invalid status filter value: ${U}`);
  }, St = L(() => {
    if (M.length === 0 || O.length === 0) return [];
    const U = M.filter((rt) => is(
      V ? rt.items : [rt.items[0]],
      O
    ));
    if (U.length > 1) throw new Error("Selected item is not unique");
    return U.length === 0 ? [] : U[0].occurrences;
  }, [O, V, M]);
  return /* @__PURE__ */ a("div", { id: l, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        We,
        {
          onValueChange: (U) => bt(U),
          defaultValue: x,
          children: [
            /* @__PURE__ */ a(Je, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Xe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(Ze, { children: [
              /* @__PURE__ */ a(Xt, { value: "all", children: h }),
              /* @__PURE__ */ a(Xt, { value: "approved", children: m }),
              /* @__PURE__ */ a(Xt, { value: "unapproved", children: y }),
              /* @__PURE__ */ a(Xt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(We, { onValueChange: (U) => Bt(U), defaultValue: s, children: [
        /* @__PURE__ */ a(Je, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(Xe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(Ze, { children: [
          /* @__PURE__ */ a(Xt, { value: "book", children: T }),
          /* @__PURE__ */ a(Xt, { value: "chapter", children: C }),
          /* @__PURE__ */ a(Xt, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ a(
        zr,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: _,
          value: A,
          onChange: (U) => {
            S(U.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(ee, { children: /* @__PURE__ */ u(re, { children: [
        /* @__PURE__ */ a(ae, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            bi,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: V,
              onCheckedChange: (U) => {
                $(U);
              }
            }
          ),
          /* @__PURE__ */ a(Nt, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? I })
        ] }) }),
        /* @__PURE__ */ a(oe, { children: (o == null ? void 0 : o.checkboxText) ?? I })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Qd,
      {
        columns: mt,
        data: Q,
        onRowClickHandler: ct,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: F
      }
    ) }),
    St.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      _w,
      {
        classNameForText: p,
        occurrenceData: St,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const ca = ra(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: n, isDisabled: i = !1, id: s }, c) => {
    const d = Ft();
    return /* @__PURE__ */ u(
      "div",
      {
        id: s,
        className: f("tw:relative tw:@container/search", { "tw:w-full": o }, n),
        children: [
          /* @__PURE__ */ a(
            Is,
            {
              className: f(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ a(
            zr,
            {
              ref: c,
              className: f(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (l) => e(l.target.value),
              disabled: i
            }
          ),
          t && /* @__PURE__ */ u(
            B,
            {
              variant: "ghost",
              size: "icon",
              className: f(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": d === "rtl" },
                { "tw:right-0": d === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ a(ea, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ca.displayName = "SearchBar";
const xi = ra(({ className: t, ...e }, r) => /* @__PURE__ */ a(Vs, { size: 35, className: f("tw:animate-spin", t), ...e, ref: r }));
xi.displayName = "Spinner";
function Dw(t, e = 50) {
  const [r, o] = N(e), n = q(null);
  return Y(() => {
    o(e);
  }, [t, e]), Y(() => {
    if (r >= t.length) return;
    const i = n.current, s = new IntersectionObserver(
      ([c]) => {
        c.isIntersecting && o((d) => Math.min(d + e, t.length));
      },
      { threshold: 0 }
    );
    return i && s.observe(i), () => s.disconnect();
  }, [r, t.length, e]), {
    visibleItems: t.slice(0, r),
    sentinelRef: n,
    hasMore: r < t.length
  };
}
const Rp = Object.freeze([
  "%resourcePicker_title%",
  "%resourcePicker_section_already_selected%",
  "%resourcePicker_section_installed%",
  "%resourcePicker_section_available_to_download%",
  "%resourcePicker_no_results%",
  "%resourcePicker_search_placeholder%",
  "%resourcePicker_language_filter_any%",
  "%resourcePicker_language_filter_multipleSelected%",
  "%resourcePicker_showing_count%"
]), be = (t, e) => t[e] ?? e;
function Ea({
  label: t,
  resources: e,
  onSelect: r
}) {
  if (e.length !== 0)
    return /* @__PURE__ */ u(tt, { children: [
      /* @__PURE__ */ a(ce, { className: "tw:border-0 tw:hover:bg-transparent", children: /* @__PURE__ */ a(te, { colSpan: 4, className: "tw:border-0 tw:pt-4 tw:pb-0", children: /* @__PURE__ */ a(Nt, { className: "tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase", children: t }) }) }),
      e.map((o) => /* @__PURE__ */ u(
        ce,
        {
          className: r ? "tw:cursor-pointer tw:border-0" : "tw:pointer-events-none tw:border-0",
          role: r ? "button" : void 0,
          "aria-label": r ? o.displayName : void 0,
          onClick: r ? () => r(o) : void 0,
          onKeyDown: r ? (n) => {
            (n.key === "Enter" || n.key === " ") && (n.preventDefault(), r(o));
          } : void 0,
          children: [
            /* @__PURE__ */ a(te, { className: "tw:w-5 tw:border-0 tw:py-1 tw:pr-1", children: !r && /* @__PURE__ */ u(tt, { children: [
              /* @__PURE__ */ a(Ae, { className: "tw:h-3.5 tw:w-3.5", "aria-hidden": !0 }),
              /* @__PURE__ */ a("span", { className: "tw:sr-only", children: t })
            ] }) }),
            /* @__PURE__ */ a(te, { className: "tw:border-0 tw:py-1 tw:pr-2 tw:font-normal tw:whitespace-nowrap", children: o.displayName }),
            /* @__PURE__ */ a(te, { className: "tw:border-0 tw:py-1 tw:pl-2", children: o.fullName }),
            /* @__PURE__ */ a(te, { className: "tw:border-0 tw:py-1 tw:pl-4 tw:text-right tw:text-muted-foreground", children: o.bestLanguageName })
          ]
        },
        o.dblEntryUid
      ))
    ] });
}
function Sw(t, e) {
  if (!e) return !0;
  const r = e.toLowerCase();
  return t.displayName.toLowerCase().includes(r) || t.fullName.toLowerCase().includes(r) || t.bestLanguageName.toLowerCase().includes(r);
}
function Ap({
  allResources: t,
  isResourcesLoading: e,
  resourceType: r,
  selectedResourceIds: o,
  localizedStrings: n,
  onSelect: i
}) {
  const [s, c] = N(""), [d, l] = N([]), w = L(
    () => t.filter((O) => !r || O.type === r).filter((O) => Sw(O, s)).filter(
      (O) => d.length === 0 || d.includes(O.bestLanguageName)
    ),
    [t, r, s, d]
  ), p = L(
    () => w.filter((O) => o == null ? void 0 : o.includes(O.dblEntryUid)),
    [w, o]
  ), g = L(
    () => w.filter((O) => O.installed && !(o != null && o.includes(O.dblEntryUid))),
    [w, o]
  ), h = L(
    () => w.filter(
      (O) => !O.installed && !(o != null && o.includes(O.dblEntryUid))
    ),
    [w, o]
  ), { visibleItems: m, sentinelRef: y, hasMore: v } = Dw(h), T = L(
    () => Array.from(new Set(t.map((O) => O.bestLanguageName))).map((O) => ({
      label: O,
      value: O
    })),
    [t]
  ), C = p.length === 0 && g.length === 0 && h.length === 0, k = be(n, "%resourcePicker_title%"), _ = be(n, "%resourcePicker_search_placeholder%"), I = be(n, "%resourcePicker_language_filter_any%"), F = be(
    n,
    "%resourcePicker_section_already_selected%"
  ), V = be(n, "%resourcePicker_section_installed%"), $ = be(
    n,
    "%resourcePicker_section_available_to_download%"
  ), x = be(n, "%resourcePicker_no_results%"), z = be(n, "%resourcePicker_showing_count%"), A = L(() => {
    if (d.length === T.length || d.length === 0)
      return I;
    if (d.length === 1) {
      const O = T.find((W) => W.value === d[0]);
      if (O) return O.label;
    }
    return xe(
      be(n, "%resourcePicker_language_filter_multipleSelected%"),
      {
        selectCount: d.length
      }
    );
  }, [d, T, I, n]), S = s.length > 0 || d.length > 0;
  return /* @__PURE__ */ u(tt, { children: [
    /* @__PURE__ */ a(qr, { className: "tw:px-4 tw:pt-4", children: /* @__PURE__ */ a(Gr, { children: k }) }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-2 tw:p-4", children: [
      /* @__PURE__ */ a(
        ca,
        {
          value: s,
          onSearch: c,
          placeholder: _,
          isFullWidth: !0
        }
      ),
      /* @__PURE__ */ a(
        mi,
        {
          entries: T,
          selected: d,
          onChange: l,
          customSelectedText: A,
          placeholder: I,
          variant: "outline"
        }
      )
    ] }),
    S && /* @__PURE__ */ a("p", { className: "tw:px-4 tw:pb-1 tw:text-right tw:text-xs tw:text-muted-foreground", children: xe(z, {
      filtered: w.length,
      total: t.length
    }) }),
    /* @__PURE__ */ u("div", { className: "tw:flex-1 tw:overflow-y-auto tw:px-4 tw:pb-4", children: [
      e && /* @__PURE__ */ a("p", { className: "tw:py-8 tw:text-center", children: /* @__PURE__ */ a(xi, {}) }),
      C && !e && /* @__PURE__ */ a("p", { className: "tw:py-8 tw:text-center tw:text-muted-foreground", children: x }),
      !C && !e && /* @__PURE__ */ a(na, { children: /* @__PURE__ */ u(ia, { children: [
        /* @__PURE__ */ a(Ea, { label: F, resources: p }),
        /* @__PURE__ */ a(Ea, { label: V, resources: g, onSelect: i }),
        /* @__PURE__ */ a(
          Ea,
          {
            label: $,
            resources: m,
            onSelect: i
          }
        ),
        v && /* @__PURE__ */ a(ce, { className: "tw:border-0", children: /* @__PURE__ */ a(te, { colSpan: 4, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { ref: y, "aria-hidden": !0 }) }) })
      ] }) })
    ] })
  ] });
}
const Ow = "16rem", $w = "3rem", yi = ut.createContext(void 0);
function la() {
  const t = ut.useContext(yi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Mw({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: r,
  className: o,
  style: n,
  children: i,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side: s = "primary",
  ...c
}) {
  const [d, l] = ut.useState(t), w = e ?? d, p = ut.useCallback(
    (k) => {
      const _ = typeof k == "function" ? k(w) : k;
      r ? r(_) : l(_);
    },
    [r, w]
  ), g = ut.useCallback(() => p((k) => !k), [p]), h = w ? "expanded" : "collapsed", v = Ft() === "ltr" ? s : s === "primary" ? "secondary" : "primary", T = ut.useMemo(
    () => ({
      state: h,
      open: w,
      setOpen: p,
      toggleSidebar: g,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: v
    }),
    [h, w, p, g, v]
  ), C = {
    "--sidebar-width": Ow,
    "--sidebar-width-icon": $w,
    ...n
  };
  return /* @__PURE__ */ a(yi.Provider, { value: T, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: C,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar",
        o
      ),
      ...c,
      children: i
    }
  ) });
}
function Rw({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = la();
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
function Pp({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = la();
  return /* @__PURE__ */ u(
    B,
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
        n === "primary" ? /* @__PURE__ */ a(Bc, {}) : /* @__PURE__ */ a(Uc, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function Ip({ className: t, ...e }) {
  const { toggleSidebar: r } = la();
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
function Aw({ className: t, ...e }) {
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
function Vp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    zr,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: f("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Lp({ className: t, ...e }) {
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
function jp({ className: t, ...e }) {
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
function Fp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    He,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: f("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Pw({ className: t, ...e }) {
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
function rn({ className: t, ...e }) {
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
function an({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? sr.Root : "div";
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
function Bp({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? sr.Root : "button";
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
function on({ className: t, ...e }) {
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
function Iw({ className: t, ...e }) {
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
function Vw({ className: t, ...e }) {
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
const Lw = Tr(
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
function jw({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? sr.Root : "button", { state: d } = la(), l = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: f(Lw({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(re, { children: [
    /* @__PURE__ */ a(ae, { asChild: !0, children: l }),
    /* @__PURE__ */ a(
      oe,
      {
        side: "right",
        align: "center",
        hidden: d !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : l;
}
function Up({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? sr.Root : "button";
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
function Kp({ className: t, ...e }) {
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
function qp({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = ut.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: f("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(Da, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          Da,
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
function Gp({ className: t, ...e }) {
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
function Hp({ className: t, ...e }) {
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
function Yp({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? sr.Root : "a";
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
function Fw({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: c,
  className: d
}) {
  const l = j(
    (h, m) => {
      o(h, m);
    },
    [o]
  ), w = j(
    (h) => {
      const m = r.find((y) => y.projectId === h);
      return m ? m.projectName : h;
    },
    [r]
  ), p = L(
    () => r.map((h) => ({
      id: h.projectId,
      shortName: h.projectName,
      fullName: h.projectName
    })),
    [r]
  ), g = j(
    (h) => !n.projectId && h === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Rw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ u(Pw, { children: [
        /* @__PURE__ */ u(rn, { children: [
          /* @__PURE__ */ a(an, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(on, { children: /* @__PURE__ */ a(Iw, { children: Object.entries(e).map(([h, m]) => /* @__PURE__ */ a(Vw, { children: /* @__PURE__ */ a(
            jw,
            {
              onClick: () => l(h),
              isActive: g(h),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: m })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ u(rn, { children: [
          /* @__PURE__ */ a(an, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(on, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: f(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Ls, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Hi,
                  {
                    mode: "project",
                    projects: p,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: h }) => {
                      if (!h) return;
                      const m = w(h);
                      l(m, h);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    buttonPlaceholder: c,
                    ariaLabel: s,
                    popoverContentStyle: { zIndex: Yi }
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
function Wp({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: n,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: c,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: l,
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      ca,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Mw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Fw,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: n,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: l,
              buttonPlaceholderText: w
            }
          ),
          /* @__PURE__ */ a(Aw, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const $e = "scrBook", Bw = "scrRef", qe = "source", Uw = "details", Kw = "Scripture Reference", qw = "Scripture Book", ki = "Type", Gw = "Details";
function Hw(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: $e,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Kw,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? dt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === $e ? ye(n.start) : void 0;
      },
      getGroupingValue: (o) => dt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => Sa(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ye(o.start),
      id: Bw,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ye(n.start);
      },
      sortingFn: (o, n) => Sa(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: qe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? ki : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Uw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Gw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Yw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Sa(t.start, t.end) === 0 ? `${ua(t.start)}+${e}` : `${ua(t.start)}+${e}-${ua(t.end)}+${r}`;
}, nn = (t) => `${Yw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Xp({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: c,
  id: d
}) {
  const [l, w] = N([]), [p, g] = N([{ id: $e, desc: !1 }]), [h, m] = N({}), y = L(
    () => t.flatMap((x) => x.data.map((z) => ({
      ...z,
      source: x.source
    }))),
    [t]
  ), v = L(
    () => Hw(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      r
    ),
    [o, i, s, r]
  );
  Y(() => {
    l.includes(qe) ? g([
      { id: qe, desc: !1 },
      { id: $e, desc: !1 }
    ]) : g([{ id: $e, desc: !1 }]);
  }, [l]);
  const T = An({
    data: y,
    columns: v,
    state: {
      grouping: l,
      sorting: p,
      rowSelection: h
    },
    onGroupingChange: w,
    onSortingChange: g,
    onRowSelectionChange: m,
    getExpandedRowModel: el(),
    getGroupedRowModel: tl(),
    getCoreRowModel: In(),
    getSortedRowModel: Pn(),
    getRowId: nn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Y(() => {
    if (c) {
      const x = T.getSelectedRowModel().rowsById, z = Object.keys(x);
      if (z.length === 1) {
        const A = y.find((S) => nn(S) === z[0]) || void 0;
        A && c(A);
      }
    }
  }, [h, y, c, T]);
  const C = n ?? qw, k = i ?? ki, _ = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [$e] },
    { label: `Group by ${k}`, value: [qe] },
    {
      label: `Group by ${C} and ${k}`,
      value: [$e, qe]
    },
    {
      label: `Group by ${k} and ${C}`,
      value: [qe, $e]
    }
  ], I = (x) => {
    w(JSON.parse(x));
  }, F = (x, z) => {
    !x.getIsGrouped() && !x.getIsSelected() && x.getToggleSelectedHandler()(z);
  }, V = (x, z) => x.getIsGrouped() ? "" : f("banded-row", z % 2 === 0 ? "even" : "odd"), $ = (x, z, A) => {
    if (!((x == null ? void 0 : x.length) === 0 || z.depth < A.column.getGroupedIndex())) {
      if (z.getIsGrouped())
        switch (z.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (z.depth) {
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
      We,
      {
        value: JSON.stringify(l),
        onValueChange: (x) => {
          I(x);
        },
        children: [
          /* @__PURE__ */ a(Je, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(Xe, {}) }),
          /* @__PURE__ */ a(Ze, { position: "item-aligned", children: /* @__PURE__ */ a(Fd, { children: _.map((x) => /* @__PURE__ */ a(Xt, { value: JSON.stringify(x.value), children: x.label }, x.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(na, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(wo, { children: T.getHeaderGroups().map((x) => /* @__PURE__ */ a(ce, { children: x.headers.filter((z) => z.column.columnDef.header).map((z) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Zr, { colSpan: z.colSpan, className: "tw:sticky top-0", children: z.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          z.column.getCanGroup() ? /* @__PURE__ */ a(
            B,
            {
              variant: "ghost",
              title: `Toggle grouping by ${z.column.columnDef.header}`,
              onClick: z.column.getToggleGroupingHandler(),
              type: "button",
              children: z.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          mr(z.column.columnDef.header, z.getContext())
        ] }) }, z.id)
      )) }, x.id)) }),
      /* @__PURE__ */ a(ia, { children: T.getRowModel().rows.map((x, z) => {
        const A = Ft();
        return /* @__PURE__ */ a(
          ce,
          {
            "data-state": x.getIsSelected() ? "selected" : "",
            className: f(V(x, z)),
            onClick: (S) => F(x, S),
            children: x.getVisibleCells().map((S) => {
              if (!(S.getIsPlaceholder() || S.column.columnDef.enableGrouping && !S.getIsGrouped() && (S.column.columnDef.id !== qe || !r)))
                return /* @__PURE__ */ a(
                  te,
                  {
                    className: f(
                      S.column.columnDef.id,
                      "tw:p-[1px]",
                      $(l, x, S)
                    ),
                    children: S.getIsGrouped() ? /* @__PURE__ */ u(
                      B,
                      {
                        variant: "link",
                        onClick: x.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          x.getIsExpanded() && /* @__PURE__ */ a(or, {}),
                          !x.getIsExpanded() && (A === "ltr" ? /* @__PURE__ */ a($a, {}) : /* @__PURE__ */ a(Oa, {})),
                          " ",
                          mr(S.column.columnDef.cell, S.getContext()),
                          " (",
                          x.subRows.length,
                          ")"
                        ]
                      }
                    ) : mr(S.column.columnDef.cell, S.getContext())
                  },
                  S.id
                );
            })
          },
          x.id
        );
      }) })
    ] })
  ] });
}
function _i(t) {
  if (t.length !== dt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  return dt.allBookIds.filter(
    (e, r) => t[r] === "1" && !dt.isObsolete(dt.bookIdToNumber(e))
  );
}
function po(t, e) {
  return t.filter((r) => {
    try {
      return fr(r) === e;
    } catch {
      return !1;
    }
  });
}
const Ni = (t, e, r) => po(t, e).every((o) => r.includes(o));
function Ww({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], c = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], l = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], { otLong: p, ntLong: g, dcLong: h, extraLong: m } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [y, v] = N(!1), [T, C] = N(""), k = q(void 0), _ = q(!1), I = L(
    () => _i(t),
    [t]
  ), F = L(() => {
    if (!T.trim()) {
      const W = {
        [Z.OT]: [],
        [Z.NT]: [],
        [Z.DC]: [],
        [Z.Extra]: []
      };
      return I.forEach((K) => {
        const M = fr(K);
        W[M].push(K);
      }), W;
    }
    const S = I.filter(
      (W) => to(W, T, n)
    ), O = {
      [Z.OT]: [],
      [Z.NT]: [],
      [Z.DC]: [],
      [Z.Extra]: []
    };
    return S.forEach((W) => {
      const K = fr(W);
      O[K].push(W);
    }), O;
  }, [I, T, n]), V = j(
    (S, O = !1) => {
      if (!O || !k.current) {
        r(
          e.includes(S) ? e.filter((ct) => ct !== S) : [...e, S]
        ), k.current = S;
        return;
      }
      const W = I.findIndex((ct) => ct === k.current), K = I.findIndex((ct) => ct === S);
      if (W === -1 || K === -1) return;
      const [M, Q] = [
        Math.min(W, K),
        Math.max(W, K)
      ], mt = I.slice(M, Q + 1).map((ct) => ct);
      r(
        e.includes(S) ? e.filter((ct) => !mt.includes(ct)) : [.../* @__PURE__ */ new Set([...e, ...mt])]
      );
    },
    [e, r, I]
  ), $ = (S) => {
    V(S, _.current), _.current = !1;
  }, x = (S, O) => {
    S.preventDefault(), V(O, S.shiftKey);
  }, z = () => {
    r(I.map((S) => S));
  }, A = () => {
    r([]);
  };
  return /* @__PURE__ */ u(
    ze,
    {
      open: y,
      onOpenChange: (S) => {
        v(S), S || C("");
      },
      children: [
        /* @__PURE__ */ a(Ie, { asChild: !0, children: /* @__PURE__ */ u(
          B,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": y,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : s,
              /* @__PURE__ */ a(gn, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(De, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ u(
          Ve,
          {
            shouldFilter: !1,
            onKeyDown: (S) => {
              S.key === "Enter" && (_.current = S.shiftKey);
            },
            children: [
              /* @__PURE__ */ a(
                _r,
                {
                  placeholder: c,
                  value: T,
                  onValueChange: C
                }
              ),
              /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                /* @__PURE__ */ a(B, { variant: "ghost", size: "sm", onClick: z, children: d }),
                /* @__PURE__ */ a(B, { variant: "ghost", size: "sm", onClick: A, children: l })
              ] }),
              /* @__PURE__ */ u(Le, { children: [
                /* @__PURE__ */ a(ta, { children: w }),
                Object.values(Z).map((S, O) => {
                  const W = F[S];
                  if (W.length !== 0)
                    return /* @__PURE__ */ u(xn, { children: [
                      /* @__PURE__ */ a(
                        pe,
                        {
                          heading: Vn(S, p, g, h, m),
                          children: W.map((K) => /* @__PURE__ */ a(
                            jn,
                            {
                              bookId: K,
                              isSelected: e.includes(K),
                              onSelect: () => $(K),
                              onMouseDown: (M) => x(M, K),
                              section: fr(K),
                              showCheck: !0,
                              localizedBookNames: n,
                              commandValue: Fn(K, n),
                              className: "tw:flex tw:items-center"
                            },
                            K
                          ))
                        }
                      ),
                      O < Object.values(Z).length - 1 && /* @__PURE__ */ a(dn, {})
                    ] }, S);
                })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function Xw({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = po(e, t).length === 0, s = n["%scripture_section_ot_short%"], c = n["%scripture_section_nt_short%"], d = n["%scripture_section_dc_short%"], l = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        Ni(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: dl(
        t,
        s,
        c,
        d,
        l
      )
    }
  );
}
const sn = 5, Ta = 6;
function Jw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_more%"], s = L(
    () => _i(t),
    [t]
  ), c = j(
    (d) => {
      const l = po(s, d).map((w) => w);
      r(
        Ni(s, d, e) ? e.filter((w) => !l.includes(w)) : [.../* @__PURE__ */ new Set([...e, ...l])]
      );
    },
    [e, r, s]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(Z).map((d) => /* @__PURE__ */ a(
      Xw,
      {
        section: d,
        availableBookIds: s,
        selectedBookIds: e,
        onToggle: c,
        localizedStrings: o
      },
      d
    )) }),
    /* @__PURE__ */ a(
      Ww,
      {
        availableBookInfo: t,
        selectedBookIds: e,
        onChangeSelectedBookIds: r,
        localizedStrings: o,
        localizedBookNames: n
      }
    ),
    e.length > 0 && /* @__PURE__ */ u("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === Ta ? Ta : sn
      ).map((d) => /* @__PURE__ */ a(br, { className: "tw:hover:bg-secondary", variant: "secondary", children: Me(d, n) }, d)),
      e.length > Ta && /* @__PURE__ */ a(
        br,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - sn} ${i}`
        }
      )
    ] })
  ] });
}
const Zw = Object.freeze([
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
]), Jp = Object.freeze([
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
  // The ScopeSelector renders a SelectBooks component, so it also needs its
  // localized strings (these cover the former inline book_selector and
  // scripture_section keys).
  ...Zw
]), zt = (t, e) => t[e] ?? e, Qw = Object.freeze([" ", "-"]);
function Zp({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: c,
  id: d,
  variant: l = "radio",
  rangeStart: w,
  rangeEnd: p,
  onRangeStartChange: g,
  onRangeEndChange: h,
  currentScrRef: m,
  onCurrentScrRefChange: y,
  bookChapterControlLocalizedStrings: v,
  getEndVerse: T,
  hideLabel: C = !1,
  buttonClassName: k
}) {
  const _ = zt(
    s,
    "%webView_scope_selector_selected_text%"
  ), I = zt(s, "%webView_scope_selector_verse%"), F = zt(s, "%webView_scope_selector_chapter%"), V = zt(s, "%webView_scope_selector_book%"), $ = zt(
    s,
    "%webView_scope_selector_current_verse%"
  ), x = zt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), z = zt(s, "%webView_scope_selector_current_book%"), A = zt(s, "%webView_scope_selector_choose_books%"), S = zt(s, "%webView_scope_selector_scope%"), O = zt(s, "%webView_scope_selector_select_books%"), W = zt(s, "%webView_scope_selector_range%"), K = zt(s, "%webView_scope_selector_select_range%"), M = zt(s, "%webView_scope_selector_range_start%"), Q = zt(s, "%webView_scope_selector_range_end%"), mt = zt(s, "%webView_scope_selector_ok%"), ct = zt(s, "%webView_scope_selector_cancel%"), Bt = zt(s, "%webView_scope_selector_navigate%"), bt = (R) => {
    if (!m) return;
    const X = m.book.toUpperCase();
    switch (R) {
      case "verse":
        return ye(m, "id");
      case "chapter":
        return `${X} ${m.chapterNum}`;
      case "book":
        return X;
      default:
        return;
    }
  }, St = [
    { value: "selectedText", label: _, id: "scope-selected-text" },
    {
      value: "verse",
      label: I,
      dropdownLabel: $,
      scrRefSuffix: bt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: F,
      dropdownLabel: x,
      scrRefSuffix: bt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: V,
      dropdownLabel: z,
      scrRefSuffix: bt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: A, id: "scope-selected" },
    { value: "range", label: W, id: "scope-range" }
  ], U = (R, X, Lt = !1) => /* @__PURE__ */ u(tt, { children: [
    R,
    X && !Lt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      X
    ] })
  ] }), rt = e ? St.filter((R) => e.includes(R.value)) : St, ot = m ?? pa, nt = w ?? ot, it = p ?? ot, It = () => {
  }, vt = q(null), Ut = q(null), Kt = q(!1), D = q(null), Ot = q(!1), [Vt, ie] = N(void 0), qt = q(!1), $t = q(!1), Se = q(null), Gt = j((R) => {
    if (R) {
      ie("start"), qt.current = !1;
      return;
    }
    ie((X) => X === "start" ? void 0 : X), qt.current && (qt.current = !1, requestAnimationFrame(() => {
      var Lt;
      const X = (Lt = vt.current) == null ? void 0 : Lt.querySelector("button");
      X == null || X.click();
    }));
  }, []), Ht = j((R) => {
    if (R) {
      ie("end"), $t.current = !1;
      return;
    }
    ie((X) => X === "end" ? void 0 : X);
  }, []), P = j(
    (R) => {
      g == null || g(R), h == null || h(R), qt.current = !0;
    },
    [g, h]
  ), H = j(
    (R) => {
      h == null || h(R), $t.current = !0;
    },
    [h]
  ), st = j(
    (R) => {
      r(R), R === "selectedBooks" && n.length === 0 && (m != null && m.book) && i([m.book]);
    },
    [r, n, m, i]
  ), at = rt.find((R) => R.value === t), ht = () => t === "selectedBooks" && n.length > 0 ? n.map((R) => R.toUpperCase()).join(", ") : t === "range" ? ss(nt, it, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : at ? U(at.label, at.scrRefSuffix) : t, xt = rt.filter(
    (R) => R.value !== "selectedBooks" && R.value !== "range"
  ), yt = rt.find((R) => R.value === "selectedBooks"), gt = rt.find((R) => R.value === "range"), [Ct, E] = N(!1), [wt, pt] = N(void 0), [kt, Fe] = N(void 0), [Oe, lr] = N(void 0), [Be, dr] = N(void 0), [wr, Dr] = N([]), Sr = l === "dropdown" && wt === "selectedBooks", b = /* @__PURE__ */ a(
    Jw,
    {
      availableBookInfo: o,
      selectedBookIds: Sr ? wr : n,
      onChangeSelectedBookIds: Sr ? Dr : i,
      localizedStrings: s,
      localizedBookNames: c
    }
  ), G = Vt === "end", J = Vt === "start", Et = "tw:text-muted-foreground", Zt = l === "dropdown" && wt === "range", tr = Zt ? lr : P, Mt = Zt ? dr : h ? H : It, _t = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { htmlFor: "scope-range-start", className: f(G && Et), children: M }),
      /* @__PURE__ */ a(
        ga,
        {
          id: "scope-range-start",
          scrRef: Zt ? Oe ?? nt : nt,
          handleSubmit: tr,
          localizedBookNames: c,
          localizedStrings: v,
          getEndVerse: T,
          submitKeys: Qw,
          onOpenChange: Gt,
          className: f(G && Et),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: vt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { htmlFor: "scope-range-end", className: f(J && Et), children: Q }),
      /* @__PURE__ */ a(
        ga,
        {
          id: "scope-range-end",
          scrRef: Zt ? Be ?? it : it,
          handleSubmit: Mt,
          localizedBookNames: c,
          localizedStrings: v,
          getEndVerse: T,
          disableReferencesUpTo: Zt ? Oe ?? nt : nt,
          onOpenChange: Ht,
          onCloseAutoFocus: (R) => {
            var X;
            $t.current && ($t.current = !1, R.preventDefault(), (X = Se.current) == null || X.focus());
          },
          className: f(J && Et),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Tt = q({}), ft = j(
    (R) => (X) => {
      Tt.current[R] = X;
    },
    []
  ), Yt = q(null);
  Y(() => {
    if (!Ct) return;
    let R = 0;
    const X = requestAnimationFrame(() => {
      R = requestAnimationFrame(() => {
        var Lt;
        (Lt = Tt.current[t]) == null || Lt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(X), R && cancelAnimationFrame(R);
    };
  }, [Ct, t]);
  const [Wt, Ue] = N(null), [Or, $i] = N(null), [$r, Mi] = N(null), Ri = 200, [Ai, Pi] = N(!1);
  Y(() => {
    if (!$r || typeof ResizeObserver > "u") return;
    const R = new ResizeObserver(([X]) => {
      Pi(X.contentRect.width < Ri);
    });
    return R.observe($r), () => R.disconnect();
  }, [$r]);
  const ho = j(
    (R) => {
      Fe(R), lr(nt), dr(it), Dr(n), E(!1), pt(R);
    },
    [nt, it, n]
  ), go = j(() => {
    kt !== void 0 && (kt === "range" ? (Oe && (g == null || g(Oe)), Be && (h == null || h(Be))) : kt === "selectedBooks" && i(wr), st(kt), pt(void 0), Fe(void 0));
  }, [
    kt,
    Oe,
    Be,
    wr,
    g,
    h,
    i,
    st
  ]), Mr = j((R) => {
    R || (pt(void 0), Fe(void 0));
  }, []), fo = j((R) => {
    var X;
    R.preventDefault(), (X = Yt.current) == null || X.focus();
  }, []), mo = (R) => t === R ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ae, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !C && /* @__PURE__ */ a(Nt, { children: S }),
      l === "dropdown" ? /* @__PURE__ */ u(_e, { open: Ct, onOpenChange: E, children: [
        /* @__PURE__ */ a(Ne, { asChild: !0, children: /* @__PURE__ */ u(
          B,
          {
            ref: Yt,
            variant: "outline",
            role: "combobox",
            className: f(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              k
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ht() }),
              /* @__PURE__ */ a(or, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          Ce,
          {
            ref: Mi,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(da, { container: $r, children: [
              xt.map(({ value: R, label: X, dropdownLabel: Lt, scrRefSuffix: pr, id: Ii }) => /* @__PURE__ */ u(
                Ge,
                {
                  ref: ft(R),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => st(R),
                  "data-selected": t === R ? "true" : void 0,
                  children: [
                    t === R && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Ae, { className: "tw:h-4 tw:w-4" }) }),
                    U(Lt ?? X, pr, Ai)
                  ]
                },
                Ii
              )),
              (yt || gt) && /* @__PURE__ */ a(Ye, {}),
              yt && /* @__PURE__ */ u(
                Ge,
                {
                  ref: ft("selectedBooks"),
                  className: f(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ho("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    mo("selectedBooks"),
                    `${yt.label}…`
                  ]
                }
              ),
              gt && /* @__PURE__ */ u(
                Ge,
                {
                  ref: ft("range"),
                  className: f(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => ho("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    mo("range"),
                    `${gt.label}…`
                  ]
                }
              ),
              y && /* @__PURE__ */ u(tt, { children: [
                /* @__PURE__ */ a(Ye, {}),
                /* @__PURE__ */ a(Nr, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: Bt }),
                /* @__PURE__ */ a(
                  Ge,
                  {
                    ref: D,
                    className: "tw:p-0",
                    onSelect: (R) => {
                      var X, Lt;
                      if (R.preventDefault(), Kt.current) {
                        Kt.current = !1;
                        return;
                      }
                      Ot.current || (Lt = (X = Ut.current) == null ? void 0 : X.querySelector("button")) == null || Lt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Ut,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (R) => {
                          const X = R.target instanceof HTMLElement ? R.target : void 0;
                          X != null && X.closest("button") && (Kt.current = !0, requestAnimationFrame(() => {
                            Kt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          ga,
                          {
                            id: "scope-navigate",
                            scrRef: m ?? pa,
                            handleSubmit: y,
                            localizedBookNames: c,
                            localizedStrings: v,
                            getEndVerse: T,
                            triggerVariant: "ghost",
                            onOpenChange: (R) => {
                              Ot.current = R;
                            },
                            onCloseAutoFocus: (R) => {
                              var X;
                              R.preventDefault(), (X = D.current) == null || X.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(tt, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ye(m ?? pa, "id") }),
                              /* @__PURE__ */ a(or, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Un,
        {
          value: t,
          onValueChange: st,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: rt.map(({ value: R, label: X, scrRefSuffix: Lt, id: pr }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Fa, { className: "tw:me-2", value: R, id: pr }),
            /* @__PURE__ */ a(Nt, { htmlFor: pr, children: U(X, Lt) })
          ] }, pr))
        }
      )
    ] }),
    l === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Nt, { children: O }),
      b
    ] }),
    l === "radio" && t === "range" && _t,
    l === "dropdown" && yt && /* @__PURE__ */ a(La, { open: wt === "selectedBooks", onOpenChange: Mr, children: /* @__PURE__ */ a(
      ja,
      {
        ref: $i,
        onCloseAutoFocus: fo,
        onEscapeKeyDown: (R) => {
          Or != null && Or.querySelector('[data-state="open"]') && R.preventDefault();
        },
        children: /* @__PURE__ */ u(da, { container: Or, children: [
          /* @__PURE__ */ a(qr, { className: "tw:pe-8", children: /* @__PURE__ */ a(Gr, { children: A }) }),
          b,
          /* @__PURE__ */ u(Oo, { children: [
            /* @__PURE__ */ a(B, { variant: "outline", onClick: () => Mr(!1), children: ct }),
            /* @__PURE__ */ a(B, { onClick: go, children: mt })
          ] })
        ] })
      }
    ) }),
    l === "dropdown" && gt && /* @__PURE__ */ a(La, { open: wt === "range", onOpenChange: Mr, children: /* @__PURE__ */ a(
      ja,
      {
        ref: Ue,
        onCloseAutoFocus: fo,
        onEscapeKeyDown: (R) => {
          Wt != null && Wt.querySelector('[data-state="open"]') && R.preventDefault();
        },
        children: /* @__PURE__ */ u(da, { container: Wt, children: [
          /* @__PURE__ */ a(qr, { className: "tw:pe-8", children: /* @__PURE__ */ a(Gr, { children: K }) }),
          _t,
          /* @__PURE__ */ u(Oo, { children: [
            /* @__PURE__ */ a(B, { variant: "outline", onClick: () => Mr(!1), children: ct }),
            /* @__PURE__ */ a(B, { ref: Se, onClick: go, children: mt })
          ] })
        ] })
      }
    ) })
  ] });
}
function Qp({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: s
}) {
  const c = {
    ...wa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([l, w]) => [
          l,
          l === w && l in wa ? wa[l] : w
        ]
      )
    )
  }, d = Ft();
  return /* @__PURE__ */ u(
    We,
    {
      value: `${e}`,
      onValueChange: (l) => r(
        l === "undefined" ? void 0 : parseInt(l, 10)
      ),
      children: [
        /* @__PURE__ */ a(Je, { size: n, className: f("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          Xe,
          {
            placeholder: c[bo(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          Ze,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: ir },
            children: t.map((l) => /* @__PURE__ */ a(Xt, { value: `${l}`, children: c[bo(l)] }, `${l}`))
          }
        )
      ]
    }
  );
}
function th({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function eh({
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
function rh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(He, {}) : ""
  ] });
}
function Ci(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function Qr({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: f("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ei = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ u(re, { children: [
  /* @__PURE__ */ a(ae, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    Ge,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(Qr, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(Qr, { icon: c.iconPathAfter, menuLabel: c.label })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(Wi, { children: [
    /* @__PURE__ */ a(Xi, { children: c.label }),
    /* @__PURE__ */ a(Ji, { children: /* @__PURE__ */ a(Zi, { children: Ei(
      t,
      e,
      Ci(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(oe, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function Ga({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(_e, { variant: i, children: [
    /* @__PURE__ */ a(Ne, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(B, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(js, {}) }) }),
    /* @__PURE__ */ a(Ce, { align: "start", style: { zIndex: ir }, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, l]) => typeof d == "boolean" || typeof l == "boolean" ? 0 : d.order - l.order).map(([d], l, w) => /* @__PURE__ */ u(xn, { children: [
      /* @__PURE__ */ a(cn, { children: /* @__PURE__ */ a(ee, { children: Ei(e.groups, e.items, d, t) }) }),
      l < w.length - 1 && /* @__PURE__ */ a(Ye, {})
    ] }, d)) })
  ] });
}
const Ti = ut.forwardRef(
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
function ah({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: c,
  endAreaChildren: d,
  menuButtonIcon: l
}) {
  return /* @__PURE__ */ u(Ti, { className: `tw:w-full tw:border ${i}`, id: n, children: [
    r && /* @__PURE__ */ a(
      Ga,
      {
        onSelectMenuItem: t,
        menuData: r,
        tabLabel: "Project",
        icon: l ?? /* @__PURE__ */ a(Fs, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
    c && /* @__PURE__ */ a("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
    /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ a(
        Ga,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ a(Bs, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
function oh({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Ti, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Ga,
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
const zi = ut.forwardRef(({ className: t, ...e }, r) => {
  const o = Ft();
  return /* @__PURE__ */ a(
    le.Root,
    {
      orientation: "vertical",
      ref: r,
      className: f("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
zi.displayName = le.List.displayName;
const Di = ut.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.List,
  {
    ref: r,
    className: f(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Di.displayName = le.List.displayName;
const tu = ut.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Trigger,
  {
    ref: r,
    ...e,
    className: f(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Si = ut.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Content,
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
Si.displayName = le.Content.displayName;
function nh({
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
        ca,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(zi, { children: [
      /* @__PURE__ */ a(Di, { children: t.map((c) => /* @__PURE__ */ a(tu, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(Si, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function eu({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = ut.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(Qi.Provider, { value: o, children: /* @__PURE__ */ a(
    me.Root,
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
function ru({ ...t }) {
  return /* @__PURE__ */ a(me.Menu, { "data-slot": "menubar-menu", ...t });
}
function au({ ...t }) {
  return /* @__PURE__ */ a(me.Portal, { "data-slot": "menubar-portal", ...t });
}
function ou({
  className: t,
  ...e
}) {
  const r = Cr();
  return /* @__PURE__ */ a(
    me.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: f(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        Ha({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function nu({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Cr();
  return /* @__PURE__ */ a(au, { children: /* @__PURE__ */ a(
    me.Content,
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
function iu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Cr();
  return /* @__PURE__ */ a(
    me.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: f(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        Ha({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function su({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    me.Separator,
    {
      "data-slot": "menubar-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function cu({ ...t }) {
  return /* @__PURE__ */ a(me.Sub, { "data-slot": "menubar-sub", ...t });
}
function lu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Cr();
  return /* @__PURE__ */ u(
    me.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        Ha({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Mn, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function du({
  className: t,
  ...e
}) {
  const r = Cr();
  return /* @__PURE__ */ a(
    me.SubContent,
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
const gr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Oi = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const c = e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ u(re, { children: [
      /* @__PURE__ */ a(ae, { asChild: !0, children: "command" in l ? /* @__PURE__ */ u(
        iu,
        {
          onClick: () => {
            o(l);
          },
          children: [
            l.iconPathBefore && /* @__PURE__ */ a(Qr, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
            l.label,
            l.iconPathAfter && /* @__PURE__ */ a(Qr, { icon: l.iconPathAfter, menuLabel: l.label })
          ]
        },
        `menubar-item-${l.label}-${l.command}`
      ) : /* @__PURE__ */ u(cu, { children: [
        /* @__PURE__ */ a(lu, { children: l.label }),
        /* @__PURE__ */ a(du, { children: Oi(
          t,
          e,
          Ci(t, l.id),
          o
        ) })
      ] }, `menubar-sub-${l.label}-${l.id}`) }),
      l.tooltip && /* @__PURE__ */ a(oe, { children: l.tooltip })
    ] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`)), d = [...c];
    return c.length > 0 && s < n.length - 1 && d.push(/* @__PURE__ */ a(su, {}, `separator-${i}`)), d;
  });
};
function wu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = q(void 0), i = q(void 0), s = q(void 0), c = q(void 0), d = q(void 0), l = (w) => {
    switch (w) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return c;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (nl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var m, y, v, T;
    w.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        gr(i, [g]);
        break;
      case "alt+p":
        (m = i.current) == null || m.focus(), gr(i, [g, h]);
        break;
      case "alt+l":
        (y = s.current) == null || y.focus(), gr(s, [g, h]);
        break;
      case "alt+n":
        (v = c.current) == null || v.focus(), gr(c, [g, h]);
        break;
      case "alt+h":
        (T = d.current) == null || T.focus(), gr(d, [g, h]);
        break;
    }
  }), Y(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((h) => {
      h.forEach((m) => {
        if (m.attributeName === "data-state" && m.target instanceof HTMLElement) {
          const y = m.target.getAttribute("data-state");
          r(y === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((h) => {
      w.observe(h, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(eu, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w, p]) => /* @__PURE__ */ u(ru, { children: [
      /* @__PURE__ */ a(ou, { ref: l(w), children: typeof p == "object" && "label" in p && p.label }),
      /* @__PURE__ */ a(
        nu,
        {
          style: { zIndex: ir },
          children: /* @__PURE__ */ a(ee, { children: Oi(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
function ih(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function sh({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: c,
  shouldUseAsAppDragArea: d,
  menubarVariant: l = "default"
}) {
  const w = q(void 0);
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
                    wu,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: l
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
                children: c
              }
            ) })
          ]
        }
      )
    }
  );
}
const uu = (t, e) => t[e] ?? e;
function ch({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: c,
  id: d
}) {
  const l = uu(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = N(!1), g = (m) => {
    n && n(m), o && o([m, ...r.filter((y) => y !== m)]), i && r.find((y) => y === m) && i([...r.filter((y) => y !== m)]), p(!1);
  }, h = (m, y) => {
    var T, C, k, _, I, F;
    const v = y !== m ? ((C = (T = t[m]) == null ? void 0 : T.uiNames) == null ? void 0 : C[y]) ?? ((_ = (k = t[m]) == null ? void 0 : k.uiNames) == null ? void 0 : _.en) : void 0;
    return v ? `${(I = t[m]) == null ? void 0 : I.autonym} (${v})` : (F = t[m]) == null ? void 0 : F.autonym;
  };
  return /* @__PURE__ */ u("div", { id: d, className: f("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      We,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: w,
        onOpenChange: (m) => p(m),
        children: [
          /* @__PURE__ */ a(Je, { children: /* @__PURE__ */ a(Xe, {}) }),
          /* @__PURE__ */ a(
            Ze,
            {
              style: { zIndex: ir },
              children: Object.keys(t).map((m) => /* @__PURE__ */ a(Xt, { value: m, children: h(m, e) }, m))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Nt, { className: "tw:font-normal tw:text-muted-foreground", children: xe(l, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((m) => h(m, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function pu({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Nt, { children: e(t) }) : r ? /* @__PURE__ */ a(Nt, { children: r(t) }) : /* @__PURE__ */ a(Nt, { children: t });
}
function hu({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: n,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ a("div", { id: t, className: e, children: r.map((c) => /* @__PURE__ */ u("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ a(
      bi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (d) => n(c, d)
      }
    ),
    /* @__PURE__ */ a(
      pu,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const lh = hu;
function dh({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: i,
  children: s,
  selectedButtons: c,
  hoverButtons: d,
  dropdownContent: l,
  additionalContent: w,
  accentColor: p,
  showDropdownOnHover: g = !1
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: (m) => {
        (m.key === "Enter" || m.key === " ") && (m.preventDefault(), r());
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
            /* @__PURE__ */ a("div", { className: "tw:min-w-0 tw:flex-1", children: s }),
            e && c,
            !e && d && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: d }),
            !e && g && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: /* @__PURE__ */ u(_e, { children: [
              /* @__PURE__ */ a(Ne, { className: f(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(B, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(_o, {}) }) }),
              /* @__PURE__ */ a(Ce, { align: "end", children: l })
            ] }) }),
            e && l && /* @__PURE__ */ u(_e, { children: [
              /* @__PURE__ */ a(Ne, { className: f(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(B, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ a(_o, {}) }) }),
              /* @__PURE__ */ a(Ce, { align: "end", children: l })
            ] })
          ] }),
          w && /* @__PURE__ */ a("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: w })
        ] }),
        p && /* @__PURE__ */ a(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${p}`
          }
        )
      ]
    },
    t
  );
}
function wh({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: i,
  placeholder: s,
  isRequired: c = !1,
  className: d,
  defaultValue: l,
  value: w,
  onChange: p,
  onFocus: g,
  onBlur: h
}) {
  return /* @__PURE__ */ u("div", { className: f("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Nt,
      {
        htmlFor: t,
        className: f({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      zr,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: f(d, { "tw:border-red-600": r }),
        defaultValue: l,
        value: w,
        onChange: p,
        onFocus: g,
        onBlur: h
      }
    ),
    /* @__PURE__ */ a("p", { className: f({ "tw:hidden": !n }), children: n })
  ] });
}
const gu = Tr(
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
function uh({
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
        gu({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function ph({ className: t, ...e }) {
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
function hh({ className: t, ...e }) {
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
function gh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Root, { "data-slot": "context-menu", ...t });
}
function fh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: f("tw:select-none", t),
      ...e
    }
  );
}
function mh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Group, { "data-slot": "context-menu-group", ...t });
}
function vh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function bh({ ...t }) {
  return /* @__PURE__ */ a(Dt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function xh({
  ...t
}) {
  return /* @__PURE__ */ a(Dt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function yh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Dt.Portal, { children: /* @__PURE__ */ a(
    Dt.Content,
    {
      "data-slot": "context-menu-content",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: ir, ...e },
      ...r
    }
  ) });
}
function kh({
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
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function _h({
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
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Mn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Nh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Dt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: ir, ...e },
      ...r
    }
  );
}
function Ch({
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
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(aa, {}) }) }),
        e
      ]
    }
  );
}
function Eh({
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
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Dt.ItemIndicator, { children: /* @__PURE__ */ a(aa, {}) }) }),
        e
      ]
    }
  );
}
function Th({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Dt.Label,
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
function zh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Dt.Separator,
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
function Dh({ className: t, ...e }) {
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
function Sh({ ...t }) {
  return /* @__PURE__ */ a(je.Root, { "data-slot": "drawer", ...t });
}
function Oh({ ...t }) {
  return /* @__PURE__ */ a(je.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function fu({ ...t }) {
  return /* @__PURE__ */ a(je.Portal, { "data-slot": "drawer-portal", ...t });
}
function $h({ ...t }) {
  return /* @__PURE__ */ a(je.Close, { "data-slot": "drawer-close", ...t });
}
function mu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    je.Overlay,
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
function Mh({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = Ft();
  return /* @__PURE__ */ u(fu, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(mu, {}),
    /* @__PURE__ */ u(
      je.Content,
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
function Rh({ className: t, ...e }) {
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
function Ah({ className: t, ...e }) {
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
function Ph({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    je.Title,
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
function Ih({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    je.Description,
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
function Vh({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Eo.Root,
    {
      "data-slot": "progress",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Eo.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Lh({ ...t }) {
  const { theme: e = "system" } = il();
  return /* @__PURE__ */ a(
    sl,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(Yc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(Hc, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(Gc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(qc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(Kc, { className: "tw:size-4 tw:animate-spin" })
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
function jh({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = Ft(), c = ut.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    Ar.Root,
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
          Ar.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              Ar.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (d, l) => /* @__PURE__ */ a(
          Ar.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
          },
          l
        ))
      ]
    }
  );
}
function Fh({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    To.Root,
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
        To.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function Bh({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    le.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: f("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const vu = Tr(
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
function Uh({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = Ft();
  return /* @__PURE__ */ a(
    le.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: f("pr-twp", vu({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function Kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Trigger,
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
function qh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Content,
    {
      "data-slot": "tabs-content",
      className: f("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const Gh = (t, e) => {
  Y(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function bu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const xu = (t, e, r = {}) => {
  const o = q(e);
  o.current = e;
  const n = q(r);
  n.current = bu(n.current);
  const [i, s] = N(() => o.current), [c, d] = N(!0);
  return Y(() => {
    let l = !0;
    return d(!!t), (async () => {
      if (t) {
        const w = await t();
        l && (s(() => w), d(!1));
      }
    })(), () => {
      l = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, c];
}, za = () => !1, Hh = (t, e) => {
  const [r] = xu(
    j(async () => {
      if (!t) return za;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    za,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Y(() => () => {
    r !== za && r();
  }, [r]);
};
function Yh(t) {
  Y(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Wh(t) {
  const e = L(() => cs(t).slice().sort().join(" "), [t]);
  return L(() => e ? e.split(" ") : [], [e]);
}
function yu(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
yu(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-50:oklch(98.4% .003 247.858);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-500:oklch(55.4% .046 257.417);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-diff-deleted s{color:var(--diff-deleted)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  uh as Alert,
  hh as AlertDescription,
  ph as AlertTitle,
  Vd as Avatar,
  Ld as AvatarFallback,
  sp as AvatarImage,
  Xu as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Ju as BOOK_SELECTOR_STRING_KEYS,
  br as Badge,
  ga as BookChapterControl,
  Ba as BookSelectionMode,
  Zu as BookSelector,
  B as Button,
  co as ButtonGroup,
  pi as ButtonGroupSeparator,
  Qu as ButtonGroupText,
  hi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  ep as COMMENT_EDITOR_STRING_KEYS,
  rp as COMMENT_LIST_STRING_KEYS,
  lp as CONFLICT_NOTE_STRING_KEYS,
  gi as CancelAcceptButtons,
  Pd as Card,
  Id as CardContent,
  np as CardDescription,
  ip as CardFooter,
  ap as CardHeader,
  op as CardTitle,
  vl as ChapterRangeSelector,
  bi as Checkbox,
  lh as CheckboxGroup,
  hu as Checklist,
  Po as ComboBox,
  Ve as Command,
  ta as CommandEmpty,
  pe as CommandGroup,
  _r as CommandInput,
  Te as CommandItem,
  Le as CommandList,
  tp as CommentEditor,
  cp as CommentList,
  up as ConflictNoteCard,
  gh as ContextMenu,
  Ch as ContextMenuCheckboxItem,
  yh as ContextMenuContent,
  mh as ContextMenuGroup,
  kh as ContextMenuItem,
  Th as ContextMenuLabel,
  vh as ContextMenuPortal,
  xh as ContextMenuRadioGroup,
  Eh as ContextMenuRadioItem,
  zh as ContextMenuSeparator,
  Dh as ContextMenuShortcut,
  bh as ContextMenuSub,
  Nh as ContextMenuSubContent,
  _h as ContextMenuSubTrigger,
  fh as ContextMenuTrigger,
  Qd as DataTable,
  La as Dialog,
  Gu as DialogClose,
  ja as DialogContent,
  Hu as DialogDescription,
  Oo as DialogFooter,
  qr as DialogHeader,
  ll as DialogOverlay,
  cl as DialogPortal,
  Gr as DialogTitle,
  qu as DialogTrigger,
  Sh as Drawer,
  $h as DrawerClose,
  Mh as DrawerContent,
  Ih as DrawerDescription,
  Ah as DrawerFooter,
  Rh as DrawerHeader,
  mu as DrawerOverlay,
  fu as DrawerPortal,
  Ph as DrawerTitle,
  Oh as DrawerTrigger,
  _e as DropdownMenu,
  Re as DropdownMenuCheckboxItem,
  Ce as DropdownMenuContent,
  cn as DropdownMenuGroup,
  Ge as DropdownMenuItem,
  rw as DropdownMenuItemType,
  Nr as DropdownMenuLabel,
  Ji as DropdownMenuPortal,
  Ui as DropdownMenuRadioGroup,
  Ki as DropdownMenuRadioItem,
  Ye as DropdownMenuSeparator,
  Zh as DropdownMenuShortcut,
  Wi as DropdownMenuSub,
  Zi as DropdownMenuSubContent,
  Xi as DropdownMenuSubTrigger,
  Ne as DropdownMenuTrigger,
  tw as ERROR_DUMP_STRING_KEYS,
  fp as ERROR_POPOVER_STRING_KEYS,
  iw as EditorKeyboardShortcuts,
  ew as ErrorDump,
  mp as ErrorPopover,
  Np as FOOTNOTE_EDITOR_STRING_KEYS,
  yp as Filter,
  vp as FilterDropdown,
  xp as Footer,
  _p as FootnoteEditor,
  yw as FootnoteItem,
  Cp as FootnoteList,
  $p as INVENTORY_STRING_KEYS,
  zr as Input,
  Mp as Inventory,
  Qo as Kbd,
  kp as KbdGroup,
  Nt as Label,
  uw as MARKER_MENU_STRING_KEYS,
  gp as MarkdownRenderer,
  hw as MarkerMenu,
  bp as MoreInfo,
  mi as MultiSelectComboBox,
  nh as NavigationContentSearch,
  ze as Popover,
  Gi as PopoverAnchor,
  De as PopoverContent,
  Qh as PopoverDescription,
  tg as PopoverHeader,
  da as PopoverPortalContainerProvider,
  eg as PopoverTitle,
  Ie as PopoverTrigger,
  Vh as Progress,
  Rp as RESOURCE_PICKER_DIALOG_STRING_KEYS,
  Un as RadioGroup,
  Fa as RadioGroupItem,
  wl as RecentSearches,
  rg as ResizableHandle,
  ag as ResizablePanel,
  og as ResizablePanelGroup,
  Ap as ResourcePickerDialog,
  dh as ResultsCard,
  Jp as SCOPE_SELECTOR_STRING_KEYS,
  Zw as SELECT_BOOKS_STRING_KEYS,
  Zp as ScopeSelector,
  Xp as ScriptureResultsViewer,
  Qp as ScrollGroupSelector,
  ca as SearchBar,
  We as Select,
  Jw as SelectBooks,
  Ww as SelectBooksPicker,
  Ze as SelectContent,
  Fd as SelectGroup,
  Xt as SelectItem,
  dp as SelectLabel,
  Ud as SelectScrollDownButton,
  Bd as SelectScrollUpButton,
  wp as SelectSeparator,
  Je as SelectTrigger,
  Xe as SelectValue,
  He as Separator,
  th as SettingsList,
  rh as SettingsListHeader,
  eh as SettingsListItem,
  Fw as SettingsSidebar,
  Wp as SettingsSidebarContentSearch,
  Rw as Sidebar,
  Pw as SidebarContent,
  jp as SidebarFooter,
  rn as SidebarGroup,
  Bp as SidebarGroupAction,
  on as SidebarGroupContent,
  an as SidebarGroupLabel,
  Lp as SidebarHeader,
  Vp as SidebarInput,
  Aw as SidebarInset,
  Iw as SidebarMenu,
  Up as SidebarMenuAction,
  Kp as SidebarMenuBadge,
  jw as SidebarMenuButton,
  Vw as SidebarMenuItem,
  qp as SidebarMenuSkeleton,
  Gp as SidebarMenuSub,
  Yp as SidebarMenuSubButton,
  Hp as SidebarMenuSubItem,
  Mw as SidebarProvider,
  Ip as SidebarRail,
  Fp as SidebarSeparator,
  Pp as SidebarTrigger,
  Da as Skeleton,
  jh as Slider,
  Lh as Sonner,
  xi as Spinner,
  Fh as Switch,
  Ga as TabDropdownMenu,
  oh as TabFloatingMenu,
  ah as TabToolbar,
  na as Table,
  ia as TableBody,
  hp as TableCaption,
  te as TableCell,
  pp as TableFooter,
  Zr as TableHead,
  wo as TableHeader,
  ce as TableRow,
  Bh as Tabs,
  qh as TabsContent,
  Uh as TabsList,
  Kh as TabsTrigger,
  wh as TextField,
  Yu as Textarea,
  di as ToggleGroup,
  Ur as ToggleGroupItem,
  sh as Toolbar,
  re as Tooltip,
  oe as TooltipContent,
  ee as TooltipProvider,
  ae as TooltipTrigger,
  ow as UNDO_REDO_BUTTONS_STRING_KEYS,
  ch as UiLanguageSelector,
  nw as UndoRedoButtons,
  zi as VerticalTabs,
  Si as VerticalTabsContent,
  Di as VerticalTabsList,
  tu as VerticalTabsTrigger,
  ir as Z_INDEX_ABOVE_DOCK,
  ln as Z_INDEX_FOOTNOTE_EDITOR,
  ji as Z_INDEX_MODAL,
  Fi as Z_INDEX_MODAL_BACKDROP,
  Yi as Z_INDEX_OVERLAY,
  ng as badgeVariants,
  Rd as buttonGroupVariants,
  ig as buttonVariants,
  f as cn,
  Op as getBookIdFromUSFM,
  sa as getInventoryHeader,
  Dp as getLinesFromUSFM,
  Sp as getNumberFromUSFM,
  Ew as getStatusForItem,
  ih as getToolbarOSReservedSpaceClassName,
  Tp as inventoryCountColumn,
  Ep as inventoryItemColumn,
  zp as inventoryStatusColumn,
  cg as sonner,
  Gh as useEvent,
  Hh as useEventAsync,
  Wh as useExtraValidMarkers,
  Bi as useListbox,
  xu as usePromise,
  Wu as useRecentSearches,
  la as useSidebar,
  Yh as useStylesheet
};
//# sourceMappingURL=index.js.map
