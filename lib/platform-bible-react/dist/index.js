var Vi = Object.defineProperty;
var Li = (t, e, r) => e in t ? Vi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Ut = (t, e, r) => Li(t, typeof e != "symbol" ? e + "" : e, r);
import { c as v, g as ye, a as Yr, C as Ee, u as ji, T as zt, b as Rt, d as Dt, e as Ot, A as ce, P as $e, f as We, B as G, h as Ie, i as Ae, j as Pe, k as Ne, l as Bi, m as Fi, n as Ui, E as Ki, o as Xa, r as fe, p as qi, q as hn, s as aa, t as oa, L as Ct, R as Ja, v as Wr, D as Oa, w as Ma, x as $a, y as Ia, z as gn, F as jr, G as Za, H as fn, I as Qa, J as He, K as kr, M as Ve, N as Le, O as je, S as _r, Q as er, U as Hi, V as Er, W as Ye, X as De, Z as Xe, Y as Re, _ as rr, $ as to, a0 as eo, a1 as Xr, a2 as ro, a3 as mn, a4 as Gi, a5 as Yi, a6 as Wi, a7 as Aa, a8 as vn, a9 as na, aa as bn, ab as Xi, ac as Ji, ad as Zi, ae as Qi, af as xn, ag as ts, ah as ga, ai as Co, aj as fa, ak as es, al as rs, am as as, an as os, ao as ns, ap as Tr, aq as ao, ar as is, as as ss } from "./resizable-B4uTyxTb.js";
import { at as hg, au as gg, av as fg, aw as mg, ax as vg, ay as bg, az as xg, aA as yg, aB as kg, aC as _g, aD as Ng, aE as Cg, aF as Eg, aG as Tg, aH as Sg, aI as zg, aJ as Rg, aK as Dg, aL as Og, aM as Mg, aN as $g, aO as Ig, aP as Ag, aQ as Pg } from "./resizable-B4uTyxTb.js";
import { jsx as a, jsxs as u, Fragment as ct } from "react/jsx-runtime";
import { Canon as bt } from "@sillsdev/scripture";
import { Check as Oe, Clock as Eo, ChevronsLeft as To, ChevronsRight as So, ChevronLeft as Pa, ChevronRight as Va, ArrowLeft as cs, ArrowRight as ls, ChevronDown as nr, BoldIcon as ds, ItalicIcon as ws, X as oo, AtSign as yn, Pencil as us, Trash2 as ps, ArrowUp as kn, MoreHorizontal as hs, MailOpen as gs, Mail as fs, ChevronUp as ms, FilterIcon as vs, ArrowLeftIcon as bs, ChevronLeftIcon as xs, ChevronRightIcon as ys, ArrowRightIcon as ks, Copy as _n, Filter as _s, User as Ns, Link as Cs, CircleHelp as Es, Undo as Ts, Redo as Ss, SquareX as Nn, FunctionSquare as Cn, SquareSigma as En, Ban as zs, AlertCircle as La, CircleCheckIcon as Rs, CircleXIcon as Ds, CircleHelpIcon as Os, ArrowUpIcon as Ms, ArrowDownIcon as $s, ScrollText as Is, ChevronsUpDown as As, MenuIcon as Ps, Menu as Vs, EllipsisVertical as Ls, MoreVertical as js } from "lucide-react";
import { Section as ut, getChaptersForBook as Bs, formatScrRef as ke, getSectionForBook as br, formatRelativeDate as Fs, formatReplacementString as Ge, sanitizeHtml as no, NumberFormat as Tn, formatBytes as Us, getCurrentLocale as Ks, usfmMarkers as Br, getFormatCallerFunction as qs, deepEqual as Hs, isString as zo, compareScrRefs as ja, scrRefToBBBCCCVVV as ma, defaultScrRef as va, formatScrRefRange as Gs, getLocalizeKeyForScrollGroupId as Ro, formatReplacementStringToArray as Do, collectUsjMarkers as Ys } from "platform-bible-utils";
import Wt, { useRef as U, useMemo as O, createContext as ia, useContext as io, useState as k, useCallback as L, useEffect as W, useImperativeHandle as Ws, useLayoutEffect as Xt, Component as Xs, createElement as Oo, Suspense as Js, forwardRef as Sn, useId as Mo, Fragment as sa } from "react";
import { IconSelector as zn, IconCheck as ca, IconChevronDown as Zs, IconChevronUp as Qs, IconLayoutSidebar as tc, IconLayoutSidebarRight as ec, IconChevronRight as Rn, IconSearch as rc, IconLoader as ac, IconAlertOctagon as oc, IconAlertTriangle as nc, IconInfoCircle as ic, IconCircleCheck as sc } from "@tabler/icons-react";
import { createEditor as Dn, $getRoot as Me, $createParagraphNode as Sr, $getSelection as Jt, HISTORY_MERGE_TAG as so, ParagraphNode as On, TextNode as Mn, $getPreviousSelection as cc, $isRangeSelection as he, $caretFromPoint as lc, $getSiblingCaret as $n, $getChildCaret as dc, $getAdjacentChildCaret as wc, $isChildCaret as uc, $normalizeCaret as pc, $setSelectionFromCaretRange as hc, $getCollapsedCaretRange as gc, $getCaretInDirection as $o, $splitAtPointCaretNext as fc, $isTextPointCaret as mc, $findMatchingParent as In, $isElementNode as Nr, mergeRegister as Ce, getDOMTextNode as vc, isHTMLElement as bc, CLEAR_EDITOR_COMMAND as An, COMMAND_PRIORITY_EDITOR as co, shallowMergeConfig as xc, defineExtension as oe, safeCast as Je, createState as yc, FORMAT_TEXT_COMMAND as Pn, $isNodeSelection as Vn, COMMAND_PRIORITY_LOW as Ln, RootNode as kc, LineBreakNode as _c, TabNode as Nc, $isEditorState as Cc, createCommand as Ec, CLICK_COMMAND as Tc, isDOMNode as Sc, $getNodeFromDOMNode as zc, $createNodeSelection as Rc, $setSelection as Dc, $getEditor as Oc, DecoratorNode as Ba, $getState as Mc, toggleTextFormatType as Io, TEXT_TYPE_TO_FORMAT as $c, $setState as Ic, addClassNamesToElement as jn, $create as Ac, $getNodeByKey as Pc, removeClassNamesFromElement as Vc, KEY_TAB_COMMAND as Lc, $isBlockElementNode as jc, $createRangeSelection as Bc, $normalizeSelection__EXPERIMENTAL as Fc, OUTDENT_CONTENT_COMMAND as Uc, INDENT_CONTENT_COMMAND as Ao, INSERT_TAB_COMMAND as Kc, COMMAND_PRIORITY_CRITICAL as lo, $isDecoratorNode as qc, $isParagraphNode as Hc, $isTextNode as Fa, SELECTION_CHANGE_COMMAND as Bn, $insertNodes as Gc } from "lexical";
import { HeadingNode as Yc, QuoteNode as Wc, registerRichText as Xc } from "@lexical/rich-text";
import { flushSync as Jc, createPortal as Zc } from "react-dom";
import { $isTableSelection as Qc } from "@lexical/table";
import { createHeadlessEditor as Fn } from "@lexical/headless";
import { $generateHtmlFromNodes as tl, $generateNodesFromDOM as el } from "@lexical/html";
import { Avatar as wo, Select as qt, Checkbox as Po, Slot as zr, Tabs as le, Menubar as me, ContextMenu as Mt, Progress as Vo, Slider as $r, Switch as Lo } from "radix-ui";
import { useReactTable as Un, getFilteredRowModel as rl, getSortedRowModel as Kn, getPaginationRowModel as al, getCoreRowModel as qn, flexRender as xr, getGroupedRowModel as ol, getExpandedRowModel as nl } from "@tanstack/react-table";
import il from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Ua, HIDDEN_NOTE_CALLER as Ka, getDefaultViewOptions as sl, isInsertEmbedOpOfType as Ir, Editorial as cl } from "@eten-tech-foundation/platform-editor";
import { cva as la } from "class-variance-authority";
import { useHotkeys as ll } from "react-hotkeys-hook";
import { Drawer as Be } from "vaul";
import { useTheme as dl } from "next-themes";
import { Toaster as wl } from "sonner";
import { toast as Lg } from "sonner";
function ap({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "textarea",
    {
      "data-slot": "textarea",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...e
    }
  );
}
function Hn({
  ref: t,
  bookId: e,
  isSelected: r,
  onSelect: o,
  onMouseDown: n,
  section: i,
  className: s,
  showCheck: c = !1,
  localizedBookNames: l,
  commandValue: d,
  disabled: w = !1
}) {
  const p = U(!1), h = () => {
    w || (p.current || o == null || o(e), setTimeout(() => {
      p.current = !1;
    }, 100));
  }, g = (m) => {
    if (w) {
      m.preventDefault();
      return;
    }
    p.current = !0, n ? n(m) : o == null || o(e);
  }, f = O(
    () => ye(e, l),
    [e, l]
  ), b = O(
    () => Yr(e, l),
    [e, l]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: v(
        "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
        {
          "tw:border-s-red-200": i === ut.OT,
          "tw:border-s-purple-200": i === ut.NT,
          "tw:border-s-indigo-200": i === ut.DC,
          "tw:border-s-amber-200": i === ut.Extra
        }
      ),
      children: /* @__PURE__ */ u(
        Ee,
        {
          ref: t,
          value: d || `${e} ${bt.bookIdToEnglishName(e)}`,
          onSelect: h,
          onMouseDown: g,
          role: "option",
          "aria-selected": r,
          "aria-disabled": w || void 0,
          "aria-label": `${bt.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
          disabled: w,
          className: v(s, w && "tw:cursor-not-allowed tw:opacity-50"),
          children: [
            c && /* @__PURE__ */ a(
              Oe,
              {
                className: v(
                  "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",
                  r ? "tw:opacity-100" : "tw:opacity-0"
                )
              }
            ),
            /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1", children: f }),
            /* @__PURE__ */ a("span", { className: "tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground", children: b })
          ]
        }
      )
    }
  );
}
const Fr = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3
}), uo = ia(Fr.WIDE);
function ul() {
  return io(uo);
}
function pl({
  primary: t,
  secondary: e,
  separator: r = " ",
  secondaryFirst: o = !1,
  showSecondary: n = !0,
  isPartial: i,
  fullText: s,
  className: c
}) {
  const {
    ref: l,
    open: d,
    onPointerEnter: w,
    onPointerLeave: p
  } = ji(), [h, g] = k(!1), f = n && e !== void 0, b = i ?? (e !== void 0 && !n), m = L(() => {
    b && g(!0), f && w();
  }, [b, f, w]), N = L(() => {
    g(!1), p();
  }, [p]), y = /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:shrink tw:truncate", children: t }, "primary"), _ = f ? (
    // Weighted to absorb essentially all of the shrinking, so the primary field only starts losing
    // characters once this one has none left.
    /* @__PURE__ */ a("span", { ref: l, className: "tw:min-w-0 tw:shrink-[9999] tw:truncate", children: e }, "secondary")
  ) : void 0, [D, B] = o ? [_, y] : [y, _];
  return (
    // Nested TooltipProviders are harmless in Radix, so carrying our own means this works in any
    // host, including toolbars that never set one up.
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { open: d || h, children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ u(
        "span",
        {
          onPointerEnter: m,
          onPointerLeave: N,
          onPointerDown: N,
          className: v("tw:flex tw:min-w-0 tw:items-baseline", c),
          children: [
            D,
            D && B && /* @__PURE__ */ a("span", { className: "tw:shrink-0 tw:whitespace-pre", children: r }, "separator"),
            B
          ]
        }
      ) }),
      /* @__PURE__ */ a(Ot, { children: s })
    ] }) })
  );
}
function Gn(t, e, r) {
  return `${t} ${ce[t]}${e ? ` ${Yr(t, e)} ${ye(t, e)}` : ""}`;
}
function hl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: r = (h) => String(h),
  getItemKey: o = (h) => String(h),
  ariaLabel: n = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: c,
  buttonClassName: l = "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
  buttonVariant: d = "ghost",
  open: w,
  onOpenChange: p
}) {
  const [h, g] = k(!1), f = w !== void 0, b = f ? w : h, m = (y) => {
    f || g(y), p == null || p(y);
  };
  if (t.length === 0)
    return;
  const N = (y) => {
    e(y), m(!1);
  };
  return /* @__PURE__ */ u($e, { open: b, onOpenChange: m, children: [
    /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ a(
      G,
      {
        variant: d,
        size: "icon",
        className: l,
        "aria-label": n,
        children: /* @__PURE__ */ a(Eo, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ a(Ie, { id: s, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(Pe, { children: /* @__PURE__ */ a(Ne, { heading: i, children: t.map((y) => /* @__PURE__ */ u(
      Ee,
      {
        onSelect: () => N(y),
        className: v("tw:flex tw:items-center", c),
        children: [
          /* @__PURE__ */ a(Eo, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ a("span", { children: r(y) })
        ]
      },
      o(y)
    )) }) }) }) })
  ] });
}
function op(t, e, r = (n, i) => n === i, o = 15) {
  return (n) => {
    const i = t.filter(
      (c) => !r(c, n)
    ), s = [n, ...i.slice(0, o - 1)];
    e(s);
  };
}
function Ar(t, e) {
  return !e || e.book === t.book && e.chapterNum === t.chapterNum && e.verseNum === t.verseNum;
}
function gl(t, e, r, o) {
  const n = O(
    () => Bi(t, e),
    [t, e]
  ), i = O(
    () => Fi(t, e),
    [t, e]
  ), s = O(
    () => Ui(t, e),
    [t, e]
  ), c = O(
    () => Ki(t, e),
    [t, e]
  ), l = L(
    (d) => {
      d && o(d);
    },
    [o]
  );
  return O(() => [
    {
      onClick: () => l(n),
      disabled: Ar(t, n),
      title: "Previous chapter",
      icon: r === "ltr" ? To : So
    },
    {
      onClick: () => l(s),
      disabled: Ar(t, s),
      title: "Previous verse",
      icon: r === "ltr" ? Pa : Va
    },
    {
      onClick: () => l(c),
      disabled: Ar(t, c),
      title: "Next verse",
      icon: r === "ltr" ? Va : Pa
    },
    {
      onClick: () => l(i),
      disabled: Ar(t, i),
      title: "Next chapter",
      icon: r === "ltr" ? So : To
    }
  ], [
    t,
    r,
    l,
    n,
    s,
    c,
    i
  ]);
}
const Ur = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, fl = [
  Ur.BOOK_ONLY,
  Ur.BOOK_CHAPTER,
  Ur.BOOK_CHAPTER_VERSE
];
function ml(t) {
  return Ur.BOOK_CHAPTER_VERSE.test(t.trim());
}
function jo(t, e) {
  return bt.bookIdToNumber(t) < bt.bookIdToNumber(e.book);
}
function vl(t, e, r) {
  const o = bt.bookIdToNumber(t) - bt.bookIdToNumber(r.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < r.chapterNum;
}
function ba(t, e, r, o) {
  const n = bt.bookIdToNumber(t) - bt.bookIdToNumber(o.book);
  return n < 0 ? !0 : n > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : r < o.verseNum;
}
function Bo(t) {
  const e = /^[a-zA-Z]$/.test(t), r = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: r };
}
function ar(t) {
  return Bs(bt.bookIdToNumber(t));
}
function bl(t, e, r) {
  if (!t.trim() || e.length === 0) return;
  const o = fl.reduce(
    (n, i) => {
      if (n) return n;
      const s = i.exec(t.trim());
      if (s) {
        const [c, l = void 0, d = void 0] = s.slice(1);
        let w;
        const p = e.filter((h) => Xa(h, c, r));
        if (p.length === 1 && ([w] = p), !w && l) {
          if (bt.isBookIdValid(c)) {
            const h = c.toUpperCase();
            e.includes(h) && (w = h);
          }
          if (!w && r) {
            const h = Array.from(r.entries()).find(
              ([, g]) => g.localizedId.toLowerCase() === c.toLowerCase()
            );
            h && e.includes(h[0]) && ([w] = h);
          }
        }
        if (!w && l) {
          const g = ((f) => Object.keys(ce).find(
            (b) => ce[b].toLowerCase() === f.toLowerCase()
          ))(c);
          if (g && e.includes(g) && (w = g), !w && r) {
            const f = Array.from(r.entries()).find(
              ([, b]) => b.localizedName.toLowerCase() === c.toLowerCase()
            );
            f && e.includes(f[0]) && ([w] = f);
          }
        }
        if (w) {
          let h = l ? parseInt(l, 10) : void 0;
          h && h > ar(w) && (h = Math.max(ar(w), 1));
          const g = d ? parseInt(d, 10) : void 0;
          return {
            book: w,
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
function Yn({
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
    return /* @__PURE__ */ a(Ne, { children: /* @__PURE__ */ a("div", { className: v("tw:grid tw:grid-cols-6 tw:gap-1", c), children: Array.from({ length: t }, (l, d) => d + 1).map((l) => {
      const d = (n == null ? void 0 : n(l)) ?? !1;
      return /* @__PURE__ */ a(
        Ee,
        {
          value: e(l),
          onSelect: () => {
            d || r(l);
          },
          ref: o(l),
          disabled: d,
          "aria-disabled": d || void 0,
          className: v(
            "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
            {
              "tw:bg-primary tw:text-primary-foreground": (s == null ? void 0 : s(l)) ?? !1
            },
            {
              "tw:bg-muted/50 tw:text-muted-foreground/50": ((i == null ? void 0 : i(l)) ?? !1) && !d
            },
            d && "tw:cursor-not-allowed tw:opacity-40"
          ),
          children: l
        },
        l
      );
    }) }) });
}
function Fo({
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
      Yn,
      {
        count: ar(t),
        valueBuilder: (c) => `${t} ${ce[t] || ""} ${c}`,
        onSelect: r,
        itemRef: o,
        isDisabled: i,
        isDimmed: n,
        isSelected: (c) => t === e.book && c === e.chapterNum,
        className: s
      }
    );
}
function Uo({
  bookId: t,
  chapterNum: e,
  endVerse: r,
  scrRef: o,
  onVerseSelect: n,
  setVerseRef: i,
  isVerseDimmed: s,
  isVerseDisabled: c,
  className: l
}) {
  if (!(!t || r <= 0))
    return /* @__PURE__ */ a(
      Yn,
      {
        count: r,
        valueBuilder: (d) => `${t} ${ce[t] || ""} ${e}:${d}`,
        onSelect: n,
        itemRef: i,
        isDisabled: c,
        isDimmed: s,
        isSelected: (d) => t === o.book && e === o.chapterNum && d === o.verseNum,
        className: l
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
  onAddRecentSearch: c,
  id: l,
  getEndVerse: d,
  disableReferencesUpTo: w,
  submitKeys: p,
  triggerContent: h,
  triggerVariant: g = "outline",
  showTriggerChevron: f = !1,
  onOpenChange: b,
  onCloseAutoFocus: m,
  modal: N = !1,
  align: y = "center",
  ref: _,
  disabled: D,
  shrinkStep: B
}) {
  const z = fe(), j = ul(), P = B ?? j, [E, V] = k(!1), [H, C] = k(""), [X, F] = k(""), [$, M] = k("books"), [S, tt] = k(void 0), [K, kt] = k(
    void 0
  ), [lt, $t] = k(void 0), [Y, rt] = k(!1), ft = U(null), dt = U(!1), pt = U(void 0), Ht = U(void 0), nt = U(void 0), Zt = U(void 0), Gt = U({}), Qt = U({}), xt = L(
    (x) => {
      e(x), c && c(x);
    },
    [e, c]
  ), te = O(() => o ? o() : qi, [o]), It = O(() => ({
    [ut.OT]: te.filter((q) => bt.isBookOT(q)),
    [ut.NT]: te.filter((q) => bt.isBookNT(q)),
    [ut.DC]: te.filter((q) => bt.isBookDC(q)),
    [ut.Extra]: te.filter((q) => bt.extraBooks().includes(q))
  }), [te]), yt = O(() => Object.values(It).flat(), [It]), At = O(() => {
    if (!X.trim()) return It;
    const x = {
      [ut.OT]: [],
      [ut.NT]: [],
      [ut.DC]: [],
      [ut.Extra]: []
    };
    return [ut.OT, ut.NT, ut.DC, ut.Extra].forEach((Q) => {
      x[Q] = It[Q].filter((Bt) => Xa(Bt, X, n));
    }), x;
  }, [It, X, n]), R = O(
    () => bl(X, yt, n),
    [X, yt, n]
  ), be = U(!1);
  W(() => {
    if (!be.current) {
      be.current = !0;
      return;
    }
    b == null || b(E);
  }, [E, b]);
  const ee = L(() => {
    if (R) {
      const x = R.chapterNum ?? 1, q = R.verseNum ?? 1;
      if (w && ba(R.book, x, q, w))
        return;
      xt({
        book: R.book,
        chapterNum: x,
        verseNum: q
      }), V(!1), F(""), C("");
    }
  }, [xt, R, w]), A = L(
    (x) => {
      const q = K ?? (R == null ? void 0 : R.book), Q = lt ?? (R == null ? void 0 : R.chapterNum);
      !q || !Q || (xt({
        book: q,
        chapterNum: Q,
        verseNum: x
      }), V(!1));
    },
    [xt, K, lt, R]
  ), Z = L(
    (x) => {
      if (w && jo(x, w)) return;
      if (ar(x) <= 1) {
        xt({
          book: x,
          chapterNum: 1,
          verseNum: 1
        }), V(!1), F("");
        return;
      }
      tt(x), M("chapters");
    },
    [xt, w]
  ), at = L(
    (x) => {
      const q = $ === "chapters" ? S : R == null ? void 0 : R.book;
      if (q) {
        if (d && d(q, x) > 1) {
          kt(q), $t(x), M("verses"), C("");
          return;
        }
        xt({
          book: q,
          chapterNum: x,
          verseNum: 1
        }), V(!1);
      }
    },
    [xt, $, S, R, d]
  ), it = L(
    (x) => {
      xt(x), V(!1), F("");
    },
    [xt]
  ), ht = gl(t, yt, z, e), et = L(() => {
    M("books"), tt(void 0), kt(void 0), $t(void 0), setTimeout(() => {
      Ht.current && Ht.current.focus();
    }, 0);
  }, []), gt = L(() => {
    const x = K;
    kt(void 0), $t(void 0), x ? (tt(x), M("chapters"), C("")) : et();
  }, [K, et]), st = L((x) => {
    V(x), x && (M("books"), tt(void 0), kt(void 0), $t(void 0), F(""));
  }, []);
  W(() => {
    D && st(!1);
  }, [D, st]);
  const [mt, Vt] = k(0);
  W(() => {
    var x;
    mt !== 0 && ((x = Ht.current) == null || x.focus());
  }, [mt]), Ws(
    _,
    () => ({
      open: () => {
        D || (st(!0), Vt((x) => x + 1));
      }
    }),
    [st, D]
  );
  const { otLong: Et, ntLong: Lt, dcLong: Tt, extraLong: Te } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, T = L(
    (x) => hn(x, Et, Lt, Tt, Te),
    [Et, Lt, Tt, Te]
  ), jt = L(
    (x) => R ? !!R.chapterNum && !x.toString().includes(R.chapterNum.toString()) : !1,
    [R]
  ), _t = O(
    () => ke(
      t,
      n ? ye(t.book, n) : "English"
    ),
    [t, n]
  ), de = O(
    () => P >= Fr.TIGHT ? Yr(t.book, n) : ye(t.book, n),
    [t.book, n, P]
  ), Fe = `${t.chapterNum}:${t.verseNum}`, ur = L((x) => (q) => {
    Gt.current[x] = q;
  }, []), pr = L((x) => (q) => {
    Qt.current[x] = q;
  }, []), hr = O(
    () => ml(X),
    [X]
  ), gr = O(() => !d || !R || !R.chapterNum || !hr ? !1 : d(R.book, R.chapterNum) > 0, [d, R, hr]), Rr = L(
    (x) => w ? jo(x, w) : !1,
    [w]
  ), Ue = L(
    (x) => (q) => w ? vl(x, q, w) : !1,
    [w]
  ), Se = L(
    (x, q) => (Q) => w ? ba(x, q, Q, w) : !1,
    [w]
  ), Dr = (i == null ? void 0 : i["%webView_bookChapterControl_selectChapter%"]) ?? "Select Chapter", pa = (i == null ? void 0 : i["%webView_bookChapterControl_selectVerse%"]) ?? "Select Verse", ha = L(
    (x) => {
      (x.key === "Home" || x.key === "End") && x.stopPropagation(), p && p.includes(x.key) && R && R.chapterNum !== void 0 && R.verseNum !== void 0 && (x.preventDefault(), x.stopPropagation(), ee());
    },
    [p, R, ee]
  ), Or = L(
    (x) => {
      var ne, Ze, xe;
      if (x.ctrlKey) return;
      const { isLetter: q, isDigit: Q } = Bo(x.key);
      if (($ === "chapters" || $ === "verses") && (x.key === " " || x.key === "Enter")) {
        const Ft = x.target instanceof HTMLElement ? x.target : void 0;
        if (!!(Ft != null && Ft.closest(
          'button, a, input, select, textarea, [role="button"]'
        ))) {
          x.stopPropagation();
          return;
        }
        const Pt = (ne = pt.current) == null ? void 0 : ne.querySelector(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
        );
        if (Pt) {
          x.preventDefault(), x.stopPropagation(), Pt.click();
          return;
        }
      }
      if (($ === "chapters" || $ === "verses") && (q || Q)) {
        x.preventDefault(), x.stopPropagation();
        return;
      }
      if ($ === "chapters" && x.key === "Backspace") {
        x.preventDefault(), x.stopPropagation(), et();
        return;
      }
      if ($ === "verses" && x.key === "Backspace") {
        x.preventDefault(), x.stopPropagation(), gt();
        return;
      }
      const Bt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(x.key);
      if ($ === "verses" && Bt) {
        const Ft = K, Nt = lt;
        if (!Ft || !Nt || !d) return;
        const Pt = d(Ft, Nt);
        if (!Pt) return;
        (Ze = pt.current) == null || Ze.focus();
        const vt = (() => {
          if (!H) return 1;
          const we = H.match(/:(\d+)$/);
          return we ? parseInt(we[1], 10) : 0;
        })();
        let re = vt;
        const ie = 6;
        switch (x.key) {
          case "ArrowLeft":
            vt !== 0 && (re = vt > 1 ? vt - 1 : Pt);
            break;
          case "ArrowRight":
            vt !== 0 && (re = vt < Pt ? vt + 1 : 1);
            break;
          case "ArrowUp":
            re = vt === 0 ? Pt : Math.max(1, vt - ie);
            break;
          case "ArrowDown":
            re = vt === 0 ? 1 : Math.min(Pt, vt + ie);
            break;
          default:
            return;
        }
        re !== vt && (x.preventDefault(), x.stopPropagation(), C(
          `${Ft} ${ce[Ft] || ""} ${Nt}:${re}`
        ), setTimeout(() => {
          const we = Qt.current[re];
          we && we.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
        return;
      }
      if (($ === "chapters" || $ === "books" && R) && Bt) {
        const Ft = $ === "chapters" ? S : R == null ? void 0 : R.book;
        if (!Ft) return;
        $ === "chapters" && ((xe = pt.current) == null || xe.focus());
        const Nt = (() => {
          if (!H) return 1;
          const ie = H.match(/(\d+)$/);
          return ie ? parseInt(ie[1], 10) : 0;
        })(), Pt = ar(Ft);
        if (!Pt) return;
        let vt = Nt;
        const re = 6;
        switch (x.key) {
          case "ArrowLeft":
            Nt !== 0 && (vt = Nt > 1 ? Nt - 1 : Pt);
            break;
          case "ArrowRight":
            Nt !== 0 && (vt = Nt < Pt ? Nt + 1 : 1);
            break;
          case "ArrowUp":
            vt = Nt === 0 ? Pt : Math.max(1, Nt - re);
            break;
          case "ArrowDown":
            vt = Nt === 0 ? 1 : Math.min(Pt, Nt + re);
            break;
          default:
            return;
        }
        vt !== Nt && (x.preventDefault(), x.stopPropagation(), C(
          `${Ft} ${ce[Ft] || ""} ${vt}`
        ), setTimeout(() => {
          const ie = Gt.current[vt];
          ie && ie.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      $,
      R,
      et,
      gt,
      S,
      K,
      lt,
      d,
      H
    ]
  ), Mr = L((x) => {
    var Bt;
    if (x.shiftKey || x.key === "Tab" || x.key === " ") return;
    if (x.key === "Enter") {
      x.stopPropagation();
      return;
    }
    if (x.key === "ArrowUp" || x.key === "ArrowDown") {
      (Bt = Ht.current) == null || Bt.focus();
      return;
    }
    const { isLetter: q, isDigit: Q } = Bo(x.key);
    (q || Q) && (x.preventDefault(), F((ne) => ne + x.key), Ht.current.focus(), rt(!1));
  }, []);
  return Xt(() => {
    const x = setTimeout(() => {
      if (E && $ === "books" && nt.current && Zt.current) {
        const q = nt.current, Q = Zt.current, Bt = Q.offsetTop, ne = q.clientHeight, Ze = Q.clientHeight, xe = Bt - ne / 2 + Ze / 2;
        q.scrollTo({
          top: Math.max(0, xe),
          behavior: "smooth"
        }), C(Gn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(x);
    };
  }, [E, $, X, R, t.book]), Xt(() => {
    if ($ === "chapters" && S) {
      const x = S === t.book, q = x ? t.chapterNum : 1;
      C(
        `${S} ${ce[S] || ""} ${q}`
      ), setTimeout(() => {
        if (nt.current)
          if (x) {
            const Q = Gt.current[t.chapterNum];
            Q && Q.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            nt.current.scrollTo({ top: 0 });
        pt.current && pt.current.focus();
      }, 0);
    }
  }, [$, S, R, t.book, t.chapterNum]), Xt(() => {
    if ($ === "verses" && K && lt !== void 0) {
      const x = K === t.book && lt === t.chapterNum, q = x ? t.verseNum : 1;
      C(
        `${K} ${ce[K] || ""} ${lt}:${q}`
      ), setTimeout(() => {
        if (nt.current)
          if (x) {
            const Q = Qt.current[t.verseNum];
            Q && Q.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            nt.current.scrollTo({ top: 0 });
        pt.current && pt.current.focus();
      }, 0);
    }
  }, [
    $,
    K,
    lt,
    t.book,
    t.chapterNum,
    t.verseNum
  ]), /* @__PURE__ */ u($e, { open: E, onOpenChange: st, modal: N, children: [
    /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ u(
      G,
      {
        ref: ft,
        "aria-label": "book-chapter-trigger",
        variant: g,
        role: "combobox",
        "aria-expanded": E,
        disabled: D,
        className: v(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          r
        ),
        onClick: (x) => {
          dt.current && (dt.current = !1, x.preventDefault());
        },
        children: [
          h ?? /* @__PURE__ */ a(
            pl,
            {
              primary: de,
              secondary: Fe,
              showSecondary: P < Fr.MINIMUM,
              isPartial: P >= Fr.TIGHT,
              fullText: _t
            }
          ),
          f && /* @__PURE__ */ a(
            zn,
            {
              "data-testid": "book-chapter-control-chevron",
              className: "tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ie,
      {
        id: l,
        forceMount: !0,
        className: "tw:w-[280px] tw:p-0",
        align: y,
        onKeyDownCapture: Or,
        onKeyDown: (x) => x.stopPropagation(),
        onPointerDownOutside: (x) => {
          const { target: q } = x;
          E && ft.current && q instanceof Node && ft.current.contains(q) && (dt.current = !0, st(!1));
        },
        onCloseAutoFocus: m,
        children: /* @__PURE__ */ u(
          Ae,
          {
            ref: pt,
            loop: !0,
            value: H,
            onValueChange: C,
            shouldFilter: !1,
            children: [
              $ === "books" ? /* @__PURE__ */ u("div", { className: "tw:flex tw:items-end", children: [
                /* @__PURE__ */ u("div", { className: "tw:relative tw:flex-1", children: [
                  /* @__PURE__ */ a(
                    aa,
                    {
                      ref: Ht,
                      value: X,
                      onValueChange: F,
                      onKeyDown: ha,
                      onFocus: () => rt(!1),
                      className: s && s.length > 0 ? "tw:!pr-10" : ""
                    }
                  ),
                  s && s.length > 0 && /* @__PURE__ */ a(
                    hl,
                    {
                      recentSearches: s,
                      onSearchItemSelect: it,
                      renderItem: (x) => ke(x, "English"),
                      getItemKey: (x) => `${x.book}-${x.chapterNum}-${x.verseNum}`,
                      ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                      groupHeading: i == null ? void 0 : i["%history_recent%"]
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: ht.map(
                  ({ onClick: x, disabled: q, title: Q, icon: Bt }) => /* @__PURE__ */ a(
                    G,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        rt(!0), x();
                      },
                      disabled: q,
                      className: "tw:h-10 tw:w-4 tw:p-0",
                      title: Q,
                      onKeyDown: Mr,
                      children: /* @__PURE__ */ a(Bt, {})
                    },
                    Q
                  )
                ) })
              ] }) : /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
                /* @__PURE__ */ a(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: $ === "verses" ? gt : et,
                    className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                    tabIndex: -1,
                    children: z === "ltr" ? /* @__PURE__ */ a(cs, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ a(ls, { className: "tw:h-4 tw:w-4" })
                  }
                ),
                $ === "chapters" && S && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: ye(S, n) }),
                $ === "verses" && K && lt !== void 0 && /* @__PURE__ */ a("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: `${ye(K, n)} ${lt}` }),
                /* @__PURE__ */ a(
                  "span",
                  {
                    tabIndex: -1,
                    className: "tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground",
                    children: $ === "verses" ? pa : Dr
                  }
                )
              ] }),
              !Y && /* @__PURE__ */ u(Pe, { ref: nt, children: [
                $ === "books" && /* @__PURE__ */ u(ct, { children: [
                  !R && Object.entries(At).map(([x, q]) => {
                    if (q.length !== 0)
                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        /* @__PURE__ */ a(Ne, { heading: T(x), children: q.map((Q) => /* @__PURE__ */ a(
                          Hn,
                          {
                            bookId: Q,
                            onSelect: (Bt) => Z(Bt),
                            section: br(Q),
                            commandValue: `${Q} ${ce[Q]}`,
                            ref: Q === t.book ? Zt : void 0,
                            localizedBookNames: n,
                            disabled: Rr(Q)
                          },
                          Q
                        )) }, x)
                      );
                  }),
                  R && /* @__PURE__ */ a(Ne, { children: /* @__PURE__ */ a(
                    Ee,
                    {
                      value: `${R.book} ${ce[R.book]} ${R.chapterNum || ""}:${R.verseNum || ""})}`,
                      onSelect: ee,
                      disabled: !!w && ba(
                        R.book,
                        R.chapterNum ?? 1,
                        R.verseNum ?? 1,
                        w
                      ),
                      className: "tw:font-semibold tw:text-primary",
                      children: ke(
                        {
                          book: R.book,
                          chapterNum: R.chapterNum ?? 1,
                          verseNum: R.verseNum ?? 1
                        },
                        n ? Yr(R.book, n) : void 0
                      )
                    },
                    "top-match"
                  ) }),
                  R && gr && R.chapterNum && d && /* @__PURE__ */ u(ct, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: `${ye(R.book, n)} ${R.chapterNum}` }),
                      /* @__PURE__ */ a("span", { children: pa })
                    ] }),
                    /* @__PURE__ */ a(
                      Uo,
                      {
                        bookId: R.book,
                        chapterNum: R.chapterNum,
                        endVerse: d(R.book, R.chapterNum),
                        scrRef: t,
                        onVerseSelect: A,
                        setVerseRef: pr,
                        isVerseDisabled: Se(R.book, R.chapterNum),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] }),
                  R && !gr && ar(R.book) > 1 && /* @__PURE__ */ u(ct, { children: [
                    /* @__PURE__ */ u("div", { className: "tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: [
                      /* @__PURE__ */ a("span", { children: ye(R.book, n) }),
                      /* @__PURE__ */ a("span", { children: Dr })
                    ] }),
                    /* @__PURE__ */ a(
                      Fo,
                      {
                        bookId: R.book,
                        scrRef: t,
                        onChapterSelect: at,
                        setChapterRef: ur,
                        isChapterDimmed: jt,
                        isChapterDisabled: Ue(R.book),
                        className: "tw:px-4 tw:pb-4"
                      }
                    )
                  ] })
                ] }),
                $ === "chapters" && S && /* @__PURE__ */ a(
                  Fo,
                  {
                    bookId: S,
                    scrRef: t,
                    onChapterSelect: at,
                    setChapterRef: ur,
                    isChapterDisabled: Ue(S),
                    className: "tw:p-4"
                  }
                ),
                $ === "verses" && K && lt !== void 0 && d && /* @__PURE__ */ a(
                  Uo,
                  {
                    bookId: K,
                    chapterNum: lt,
                    endVerse: d(K, lt),
                    scrRef: t,
                    onVerseSelect: A,
                    setVerseRef: pr,
                    isVerseDisabled: Se(
                      K,
                      lt
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
const np = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%",
  "%webView_bookChapterControl_selectChapter%",
  "%webView_bookChapterControl_selectVerse%"
]);
function xl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Ko({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: o,
  popoverContentClassName: n,
  popoverContentStyle: i,
  value: s,
  onChange: c = () => {
  },
  getOptionLabel: l = xl,
  getButtonLabel: d,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: b = "start",
  isDisabled: m = !1,
  ariaLabel: N,
  ...y
}) {
  const [_, D] = k(!1), B = d ?? l, z = (P) => P.length > 0 && typeof P[0] == "object" && "options" in P[0], j = (P, E) => {
    const V = l(P), H = typeof P == "object" && "secondaryLabel" in P ? P.secondaryLabel : void 0, C = `${E ?? ""}${V}${H ?? ""}`;
    return /* @__PURE__ */ u(
      Ee,
      {
        value: V,
        onSelect: () => {
          c(P), D(!1);
        },
        className: "tw:gap-1.5!",
        children: [
          /* @__PURE__ */ a(
            Oe,
            {
              className: v("tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || l(s) !== V
              })
            }
          ),
          /* @__PURE__ */ u("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            V,
            H && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              H
            ] })
          ] })
        ]
      },
      C
    );
  };
  return /* @__PURE__ */ u($e, { open: _, onOpenChange: D, ...y, children: [
    /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ u(
      G,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": N,
        id: t,
        className: v(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? r
        ),
        disabled: m,
        children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            w && /* @__PURE__ */ a("div", { className: "tw:shrink-0 tw:pe-2", children: w }),
            /* @__PURE__ */ a(
              "span",
              {
                className: v(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? B(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      Ie,
      {
        align: b,
        className: v("tw:w-[200px] tw:p-0", n),
        style: i,
        children: /* @__PURE__ */ u(Ae, { children: [
          /* @__PURE__ */ a(aa, { placeholder: h, className: "tw:text-inherit" }),
          /* @__PURE__ */ a(oa, { children: g }),
          /* @__PURE__ */ a(Pe, { children: z(e) ? e.map((P) => /* @__PURE__ */ a(Ne, { heading: P.groupHeading, children: P.options.map((E) => j(E, P.groupHeading)) }, P.groupHeading)) : /* @__PURE__ */ a(Ne, { children: e.map((P) => j(P)) }) })
        ] })
      }
    )
  ] });
}
function yl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: o,
  isDisabled: n = !1,
  chapterCount: i
}) {
  const s = O(
    () => Array.from({ length: i }, (d, w) => w + 1),
    [i]
  );
  return /* @__PURE__ */ u(ct, { children: [
    /* @__PURE__ */ a(Ct, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ a(
      Ko,
      {
        isDisabled: n,
        onChange: (d) => {
          r(d), d > e && o(d);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ a(Ct, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ a(
      Ko,
      {
        isDisabled: n,
        onChange: (d) => {
          o(d), d < t && r(d);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var qa = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(qa || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(qa || (qa = {}));
const ip = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ya = (t, e) => t[e] ?? e;
function sp({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: o,
  chapterCount: n,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: c,
  handleSelectStartChapter: l,
  localizedStrings: d
}) {
  const w = ya(d, "%webView_bookSelector_currentBook%"), p = ya(d, "%webView_bookSelector_choose%"), h = ya(d, "%webView_bookSelector_chooseBooks%"), [g, f] = k(
    "current book"
    /* CurrentBook */
  ), b = (m) => {
    f(m), t(m);
  };
  return /* @__PURE__ */ a(
    Ja,
    {
      className: "pr-twp tw:flex",
      value: g,
      onValueChange: (m) => b(m),
      children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_25%_50%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wr, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ a(Ct, { className: "tw:ms-1", children: w })
          ] }),
          /* @__PURE__ */ a(Ct, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ a(
            yl,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: l,
              handleSelectEndChapter: s,
              chapterCount: n,
              startChapter: c,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:grid tw:grid-cols-[25%_50%_25%]", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wr, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ a(Ct, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ a(Ct, { className: "tw:flex tw:items-center", children: o.map((m) => bt.bookIdToEnglishName(m)).join(", ") }),
          /* @__PURE__ */ a(
            G,
            {
              disabled: g === "current book",
              onClick: () => r(),
              children: p
            }
          )
        ] })
      ] })
    }
  );
}
const Wn = ia(null);
function kl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ve() {
  const t = io(Wn);
  return t == null && function(e, ...r) {
    const o = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
    n.append("code", e);
    for (const i of r) n.append("v", i);
    throw o.search = n.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Xn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, _l = Xn ? Xt : W, Pr = { tag: so };
function Nl({ initialConfig: t, children: e }) {
  const r = O(() => {
    const { theme: o, namespace: n, nodes: i, onError: s, editorState: c, html: l } = t, d = kl(null, o), w = Dn({ editable: t.editable, html: l, namespace: n, nodes: i, onError: (p) => s(p, w), theme: o });
    return function(p, h) {
      if (h !== null) {
        if (h === void 0) p.update(() => {
          const g = Me();
          if (g.isEmpty()) {
            const f = Sr();
            g.append(f);
            const b = Xn ? document.activeElement : null;
            (Jt() !== null || b !== null && b === p.getRootElement()) && f.select();
          }
        }, Pr);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const g = p.parseEditorState(h);
            p.setEditorState(g, Pr);
            break;
          }
          case "object":
            p.setEditorState(h, Pr);
            break;
          case "function":
            p.update(() => {
              Me().isEmpty() && h(p);
            }, Pr);
        }
      }
    }(w, c), [w, d];
  }, []);
  return _l(() => {
    const o = t.editable, [n] = r;
    n.setEditable(o === void 0 || o);
  }, []), a(Wn.Provider, { value: r, children: e });
}
const Cl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : W;
function El({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [o] = ve();
  return Cl(() => {
    if (r) return o.registerUpdateListener(({ editorState: n, dirtyElements: i, dirtyLeaves: s, prevEditorState: c, tags: l }) => {
      e && i.size === 0 && s.size === 0 || t && l.has(so) || c.isEmpty() || r(n, o, l);
    });
  }, [o, t, e, r]), null;
}
const po = {
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
}, ho = [
  Yc,
  On,
  Mn,
  Wc
], Tl = ia(null), ka = {
  didCatch: !1,
  error: null
};
class Sl extends Xs {
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
    if (o && r.error !== null && zl(e.resetKeys, n)) {
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
    let c = e;
    if (i) {
      const l = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof r == "function")
        c = r(l);
      else if (o)
        c = Oo(o, l);
      else if (n !== void 0)
        c = n;
      else
        throw s;
    }
    return Oo(Tl.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, c);
  }
}
function zl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((r, o) => !Object.is(r, e[o]));
}
function Rl({ children: t, onError: e }) {
  return a(Sl, { fallback: a("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : W;
function Ol(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Ml() {
  return function(t) {
    const [e] = ve(), r = O(() => t(e), [e, t]), [o, n] = k(() => r.initialValueFn()), i = U(o);
    return Dl(() => {
      const { initialValueFn: s, subscribe: c } = r, l = s();
      return i.current !== l && (i.current = l, n(l)), c((d) => {
        i.current = d, n(d);
      });
    }, [r, t]), o;
  }(Ol);
}
function $l(t, e) {
  const r = t.getRootElement();
  if (r === null) return [];
  const o = r.getBoundingClientRect(), n = getComputedStyle(r), i = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s = Array.from(e.getClientRects());
  let c, l = s.length;
  s.sort((d, w) => {
    const p = d.top - w.top;
    return Math.abs(p) <= 3 ? d.left - w.left : p;
  });
  for (let d = 0; d < l; d++) {
    const w = s[d], p = c && c.top <= w.top && c.top + c.height > w.top && c.left + c.width > w.left, h = w.width + i === o.width;
    p || h ? (s.splice(d--, 1), l--) : c = w;
  }
  return s;
}
function Jr(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Jn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Il = Jn && "documentMode" in document ? document.documentMode : null;
!(!Jn || !("InputEvent" in window) || Il) && "getTargetRanges" in new window.InputEvent("input");
function pe(t) {
  return `${t}px`;
}
const Al = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function Pl(t, e, r) {
  let o = null, n = null, i = null, s = [];
  const c = document.createElement("div");
  function l() {
    o === null && Jr(182), n === null && Jr(183);
    const { left: p, top: h } = n.getBoundingClientRect(), g = $l(t, e);
    var f, b;
    c.isConnected || (b = c, (f = n).insertBefore(b, f.firstChild));
    let m = !1;
    for (let N = 0; N < g.length; N++) {
      const y = g[N], _ = s[N] || document.createElement("div"), D = _.style;
      D.position !== "absolute" && (D.position = "absolute", m = !0);
      const B = pe(y.left - p);
      D.left !== B && (D.left = B, m = !0);
      const z = pe(y.top - h);
      D.top !== z && (_.style.top = z, m = !0);
      const j = pe(y.width);
      D.width !== j && (_.style.width = j, m = !0);
      const P = pe(y.height);
      D.height !== P && (_.style.height = P, m = !0), _.parentNode !== c && (c.append(_), m = !0), s[N] = _;
    }
    for (; s.length > g.length; ) s.pop();
    m && r(s);
  }
  function d() {
    n = null, o = null, i !== null && i.disconnect(), i = null, c.remove();
    for (const p of s) p.remove();
    s = [];
  }
  c.style.position = "relative";
  const w = t.registerRootListener(function p() {
    const h = t.getRootElement();
    if (h === null) return d();
    const g = h.parentElement;
    if (!bc(g)) return d();
    d(), o = h, n = g, i = new MutationObserver((f) => {
      const b = t.getRootElement(), m = b && b.parentElement;
      if (b !== o || m !== n) return p();
      for (const N of f) if (!c.contains(N.target)) return l();
    }), i.observe(g, Al), l();
  });
  return () => {
    w(), d();
  };
}
function qo(t, e, r) {
  if (t.type !== "text" && Nr(e)) {
    const o = e.getDOMSlot(r);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [vc(r) || r, t.offset];
}
function Vl(t) {
  for (const e of t) {
    const r = e.style;
    r.background !== "Highlight" && (r.background = "Highlight"), r.color !== "HighlightText" && (r.color = "HighlightText"), r.marginTop !== pe(-1.5) && (r.marginTop = pe(-1.5)), r.paddingTop !== pe(4) && (r.paddingTop = pe(4)), r.paddingBottom !== pe(0) && (r.paddingBottom = pe(0));
  }
}
function Ll(t, e = Vl) {
  let r = null, o = null, n = null, i = null, s = null, c = null, l = () => {
  };
  function d(w) {
    w.read(() => {
      const p = Jt();
      if (!he(p)) return r = null, n = null, i = null, c = null, l(), void (l = () => {
      });
      const [h, g] = function(P) {
        const E = P.getStartEndPoints();
        return P.isBackward() ? [E[1], E[0]] : E;
      }(p), f = h.getNode(), b = f.getKey(), m = h.offset, N = g.getNode(), y = N.getKey(), _ = g.offset, D = t.getElementByKey(b), B = t.getElementByKey(y), z = r === null || D !== o || m !== n || b !== r.getKey(), j = i === null || B !== s || _ !== c || y !== i.getKey();
      if ((z || j) && D !== null && B !== null) {
        const P = function(E, V, H, C, X, F, $) {
          const M = (E._window ? E._window.document : document).createRange();
          return M.setStart(...qo(V, H, C)), M.setEnd(...qo(X, F, $)), M;
        }(t, h, f, D, g, N, B);
        l(), l = Pl(t, P, e);
      }
      r = f, o = D, n = m, i = N, s = B, c = _;
    });
  }
  return d(t.getEditorState()), Ce(t.registerUpdateListener(({ editorState: w }) => d(w)), () => {
    l();
  });
}
function jl(t, e) {
  let r = null;
  const o = () => {
    const n = getSelection(), i = n && n.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? r !== null && (r(), r = null) : r === null && (r = Ll(t, e));
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
function Bl(t) {
  const e = In(t, (r) => Nr(r) && !r.isInline());
  return Nr(e) || Jr(4, t.__key), e;
}
function Fl(t) {
  const e = Jt() || cc();
  let r;
  if (he(e)) r = lc(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), c = s[s.length - 1];
      c && (r = $n(c, "next"));
    }
    r = r || dc(Me(), "previous").getFlipped().insert(Sr());
  }
  const o = Ul(t, r), n = wc(o), i = uc(n) ? pc(n) : o;
  return hc(gc(i)), t.getLatest();
}
function Ul(t, e, r) {
  let o = $o(e, "next");
  for (let n = o; n; n = fc(n, r)) o = n;
  return mc(o) && Jr(283), o.insert(t.isInline() ? Sr().append(t) : t), $o($n(t.getLatest(), "next"), e.direction);
}
function Kl(t) {
  const e = Jt();
  if (!he(e)) return !1;
  const r = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let n = 0; n < o.length; n++) {
    const i = o[n], s = i.getKey();
    if (r.has(s)) continue;
    const c = In(i, (d) => Nr(d) && !d.isInline());
    if (c === null) continue;
    const l = c.getKey();
    c.canIndent() && !r.has(l) && (r.add(l), t(c));
  }
  return r.size > 0;
}
const ql = Symbol.for("preact-signals");
function da() {
  if (_e > 1) return void _e--;
  let t, e = !1;
  for (!function() {
    let r = Zr;
    for (Zr = void 0; r !== void 0; ) r.S.v === r.v && (r.S.i = r.i), r = r.o;
  }(); yr !== void 0; ) {
    let r = yr;
    for (yr = void 0, Qr++; r !== void 0; ) {
      const o = r.u;
      if (r.u = void 0, r.f &= -3, !(8 & r.f) && Zn(r)) try {
        r.c();
      } catch (n) {
        e || (t = n, e = !0);
      }
      r = o;
    }
  }
  if (Qr = 0, _e--, e) throw t;
}
function Hl(t) {
  if (_e > 0) return t();
  Ha = ++Gl, _e++;
  try {
    return t();
  } finally {
    da();
  }
}
let ot, yr;
function Ho(t) {
  const e = ot;
  ot = void 0;
  try {
    return t();
  } finally {
    ot = e;
  }
}
let Zr, _e = 0, Qr = 0, Gl = 0, Ha = 0, Kr = 0;
function Go(t) {
  if (ot === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== ot ? (e = { i: 0, S: t, p: ot.s, n: void 0, t: ot, e: void 0, x: void 0, r: e }, ot.s !== void 0 && (ot.s.n = e), ot.s = e, t.n = e, 32 & ot.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = ot.s, e.n = void 0, ot.s.n = e, ot.s = e), e) : void 0;
}
function Kt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Cr(t, e) {
  return new Kt(t, e);
}
function Zn(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Yo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const r = e.S.n;
    if (r !== void 0 && (e.r = r), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Qn(t) {
  let e, r = t.s;
  for (; r !== void 0; ) {
    const o = r.p;
    r.i === -1 ? (r.S.U(r), o !== void 0 && (o.n = r.n), r.n !== void 0 && (r.n.p = o)) : e = r, r.S.n = r.r, r.r !== void 0 && (r.r = void 0), r = o;
  }
  t.s = e;
}
function Ke(t, e) {
  Kt.call(this, void 0), this.x = t, this.s = void 0, this.g = Kr - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Yl(t, e) {
  return new Ke(t, e);
}
function ti(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    _e++;
    const r = ot;
    ot = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, go(t), o;
    } finally {
      ot = r, da();
    }
  }
}
function go(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, ti(t);
}
function Wl(t) {
  if (ot !== this) throw new Error("Out-of-order effect");
  Qn(this), ot = t, this.f &= -2, 8 & this.f && go(this), da();
}
function tr(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ge(t, e) {
  const r = new tr(t, e);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  const o = r.d.bind(r);
  return o[Symbol.dispose] = o, o;
}
function wr(t, e = {}) {
  const r = {};
  for (const o in t) {
    const n = e[o], i = Cr(n === void 0 ? t[o] : n);
    r[o] = i;
  }
  return r;
}
Kt.prototype.brand = ql, Kt.prototype.h = function() {
  return !0;
}, Kt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Ho(() => {
    var r;
    (r = this.W) == null || r.call(this);
  }));
}, Kt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, r = t.x;
    e !== void 0 && (e.x = r, t.e = void 0), r !== void 0 && (r.e = e, t.x = void 0), t === this.t && (this.t = r, r === void 0 && Ho(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, Kt.prototype.subscribe = function(t) {
  return ge(() => {
    const e = this.value, r = ot;
    ot = void 0;
    try {
      t(e);
    } finally {
      ot = r;
    }
  }, { name: "sub" });
}, Kt.prototype.valueOf = function() {
  return this.value;
}, Kt.prototype.toString = function() {
  return this.value + "";
}, Kt.prototype.toJSON = function() {
  return this.value;
}, Kt.prototype.peek = function() {
  const t = ot;
  ot = void 0;
  try {
    return this.value;
  } finally {
    ot = t;
  }
}, Object.defineProperty(Kt.prototype, "value", { get() {
  const t = Go(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Qr > 100) throw new Error("Cycle detected");
    (function(e) {
      _e !== 0 && Qr === 0 && e.l !== Ha && (e.l = Ha, Zr = { S: e, v: e.v, i: e.i, o: Zr });
    })(this), this.v = t, this.i++, Kr++, _e++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      da();
    }
  }
} }), Ke.prototype = new Kt(), Ke.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Kr)) return !0;
  if (this.g = Kr, this.f |= 1, this.i > 0 && !Zn(this)) return this.f &= -2, !0;
  const t = ot;
  try {
    Yo(this), ot = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return ot = t, Qn(this), this.f &= -2, !0;
}, Ke.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  Kt.prototype.S.call(this, t);
}, Ke.prototype.U = function(t) {
  if (this.t !== void 0 && (Kt.prototype.U.call(this, t), this.t === void 0)) {
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
  const t = Go(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), tr.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, tr.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ti(this), Yo(this), _e++;
  const t = ot;
  return ot = this, Wl.bind(this, t);
}, tr.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = yr, yr = this);
}, tr.prototype.d = function() {
  this.f |= 8, 1 & this.f || go(this);
}, tr.prototype.dispose = function() {
  this.d();
};
oe({ build: (t, e, r) => wr(e), config: Je({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, r) {
  const o = r.getOutput();
  return ge(() => o.disabled.value ? void 0 : t.registerRootListener((n) => {
    t.focus(() => {
      const i = document.activeElement;
      n === null || i !== null && n.contains(i) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function ei() {
  const t = Me(), e = Jt(), r = Sr();
  t.clear(), t.append(r), e !== null && r.select(), he(e) && (e.format = 0);
}
function ri(t, e = ei) {
  return t.registerCommand(An, (r) => (t.update(e), !0), co);
}
oe({ build: (t, e, r) => wr(e), config: Je({ $onClear: ei }), name: "@lexical/extension/ClearEditor", register(t, e, r) {
  const { $onClear: o } = r.getOutput();
  return ge(() => ri(t, o.value));
} });
function Xl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const _a = yc("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ai extends Ba {
  $config() {
    return this.config("decorator-text", { extends: Ba, stateConfigs: [{ flat: !0, stateConfig: _a }] });
  }
  getFormat() {
    return Mc(this, _a);
  }
  getFormatFlags(e, r) {
    return Io(this.getFormat(), e, r);
  }
  hasFormat(e) {
    const r = $c[e];
    return (this.getFormat() & r) !== 0;
  }
  setFormat(e) {
    return Ic(this, _a, e);
  }
  toggleFormat(e) {
    const r = this.getFormat(), o = Io(r, e, null);
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
function Jl(t) {
  return t instanceof ai;
}
oe({ name: "@lexical/extension/DecoratorText", nodes: () => [ai], register: (t, e, r) => t.registerCommand(Pn, (o) => {
  const n = Jt();
  if (Vn(n) || he(n)) for (const i of n.getNodes()) Jl(i) && i.toggleFormat(o);
  return !1;
}, Ln) });
function oi(t, e) {
  let r;
  return Cr(t(), { unwatched() {
    r && (r(), r = void 0);
  }, watched() {
    this.value = t(), r = e(this);
  } });
}
const Ga = oe({ build: (t) => oi(() => t.getEditorState(), (e) => t.registerUpdateListener((r) => {
  e.value = r.editorState;
})), name: "@lexical/extension/EditorState" });
function wt(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ni(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const r = t, o = e;
    for (const n in o) r[n] = ni(r[n], o[n]);
    return t;
  }
  return e;
}
const fo = 0, Ya = 1, ii = 2, Na = 3, Vr = 4, Qe = 5, Ca = 6, mr = 7;
function Ea(t) {
  return t.id === fo;
}
function si(t) {
  return t.id === ii;
}
function Zl(t) {
  return function(e) {
    return e.id === Ya;
  }(t) || wt(305, String(t.id), String(Ya)), Object.assign(t, { id: ii });
}
const Ql = /* @__PURE__ */ new Set();
class td {
  constructor(e, r) {
    Ut(this, "builder");
    Ut(this, "configs");
    Ut(this, "_dependency");
    Ut(this, "_peerNameSet");
    Ut(this, "extension");
    Ut(this, "state");
    Ut(this, "_signal");
    this.builder = e, this.extension = r, this.configs = /* @__PURE__ */ new Set(), this.state = { id: fo };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const r = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : xc;
    for (const o of this.configs) e = r(e, o);
    return e;
  }
  init(e) {
    const r = this.state;
    si(r) || wt(306, String(r.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, n = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(c, l, d) {
      return Object.assign(c, { config: l, id: Na, registerState: d });
    }(r, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(c, l, d) {
      return Object.assign(c, { id: Vr, initResult: l, registerState: d });
    }(i, s, n);
  }
  build(e) {
    const r = this.state;
    let o;
    r.id !== Vr && wt(307, String(r.id), String(Qe)), this.extension.build && (o = this.extension.build(e, r.config, r.registerState));
    const n = { ...r.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, c) {
      return Object.assign(i, { id: Qe, output: s, registerState: c });
    }(r, o, n);
  }
  register(e, r) {
    this._signal = r;
    const o = this.state;
    o.id !== Qe && wt(308, String(o.id), String(Qe));
    const n = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Ca });
    }(o), () => {
      const i = this.state;
      i.id !== mr && wt(309, String(o.id), String(mr)), this.state = function(s) {
        return Object.assign(s, { id: Qe });
      }(i), n && n();
    };
  }
  afterRegistration(e) {
    const r = this.state;
    let o;
    return r.id !== Ca && wt(310, String(r.id), String(Ca)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, r.config, r.registerState)), this.state = function(n) {
      return Object.assign(n, { id: mr });
    }(r), o;
  }
  getSignal() {
    return this._signal === void 0 && wt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && wt(312, this.extension.name);
    const e = this.state;
    return function(r) {
      return r.id >= Vr;
    }(e) || wt(313, String(e.id), String(Vr)), e.initResult;
  }
  getInitPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(r) {
      return r.id >= Na;
    }(e) || wt(314, String(e.id), String(Na)), { config: e.config };
  }
  getPeer(e) {
    const r = this.builder.extensionNameMap.get(e);
    return r ? r.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && wt(315, this.extension.name, e.name), r.getExtensionInitDependency();
  }
  getDependency(e) {
    const r = this.builder.getExtensionRep(e);
    return r === void 0 && wt(315, this.extension.name, e.name), r.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(r) {
      return r.id >= mr;
    }(e) || wt(316, String(e.id), String(mr)), e;
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
        return r.id >= Qe;
      })(e) || wt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Wo = { tag: so };
function ed() {
  const t = Me();
  t.isEmpty() && t.append(Sr());
}
const rd = oe({ config: Je({ setOptions: Wo, updateOptions: Wo }), init: ({ $initialEditorState: t = ed }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: r }, o) {
  const n = o.getInitResult();
  if (!n.initialized) {
    n.initialized = !0;
    const { $initialEditorState: i } = n;
    if (Cc(i)) t.setEditorState(i, r);
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
}, name: "@lexical/extension/InitialState", nodes: [kc, Mn, _c, Nc, On] }), Xo = Symbol.for("@lexical/extension/LexicalBuilder");
function Jo() {
}
function ad(t) {
  throw t;
}
function Lr(t) {
  return Array.isArray(t) ? t : [t];
}
const Ta = "0.43.0+prod.esm";
class or {
  constructor(e) {
    Ut(this, "roots");
    Ut(this, "extensionNameMap");
    Ut(this, "outgoingConfigEdges");
    Ut(this, "incomingEdges");
    Ut(this, "conflicts");
    Ut(this, "_sortedExtensionReps");
    Ut(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Ta, this.roots = e;
    for (const r of e) this.addExtension(r);
  }
  static fromExtensions(e) {
    const r = [Lr(rd)];
    for (const o of e) r.push(Lr(o));
    return new or(r);
  }
  static maybeFromEditor(e) {
    const r = e[Xo];
    return r && (r.PACKAGE_VERSION !== Ta && wt(292, r.PACKAGE_VERSION, Ta), r instanceof or || wt(293)), r;
  }
  static fromEditor(e) {
    const r = or.maybeFromEditor(e);
    return r === void 0 && wt(294), r;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: r, ...o } = this.buildCreateEditorArgs(), n = Object.assign(Dn({ ...o, ...r ? { onError: (i) => {
      r(i, n);
    } } : {} }), { [Xo]: this });
    for (const i of this.sortedExtensionReps()) i.build(n);
    return n;
  }
  buildEditor() {
    let e = Jo;
    function r() {
      try {
        e();
      } finally {
        e = Jo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: r, [Symbol.dispose]: r });
    return e = Ce(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const r = this.extensionNameMap.get(e.name);
    if (r) return r.extension !== e && wt(295, e.name), r;
  }
  addEdge(e, r, o) {
    const n = this.outgoingConfigEdges.get(e);
    n ? n.set(r, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[r, o]]));
    const i = this.incomingEdges.get(r);
    i ? i.add(e) : this.incomingEdges.set(r, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && wt(296);
    const r = Lr(e), [o] = r;
    typeof o.name != "string" && wt(297, typeof o.name);
    let n = this.extensionNameMap.get(o.name);
    if (n !== void 0 && n.extension !== o && wt(298, o.name), !n) {
      n = new td(this, o), this.extensionNameMap.set(o.name, n);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && wt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && wt(299, o.name, s), this.conflicts.set(s, o.name);
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
      if (si(i)) return;
      const s = o.extension.name;
      var c;
      Ea(i) || wt(300, s, n || "[unknown]"), Ea(c = i) || wt(304, String(c.id), String(fo)), i = Object.assign(c, { id: Ya }), o.state = i;
      const l = this.outgoingConfigEdges.get(s);
      if (l) for (const d of l.keys()) {
        const w = this.extensionNameMap.get(d);
        w && r(w, s);
      }
      i = Zl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Ea(o.state) && r(o);
    for (const o of e) for (const [n, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(n);
      if (s) for (const c of i) s.configs.add(c);
    }
    for (const [o, ...n] of this.roots) if (n.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && wt(301, o.name);
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
    return Ce(...n);
  }
  buildCreateEditorArgs() {
    const e = {}, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = {}, s = {}, c = this.sortedExtensionReps();
    for (const w of c) {
      const { extension: p } = w;
      if (p.onError !== void 0 && (e.onError = p.onError), p.disableEvents !== void 0 && (e.disableEvents = p.disableEvents), p.parentEditor !== void 0 && (e.parentEditor = p.parentEditor), p.editable !== void 0 && (e.editable = p.editable), p.namespace !== void 0 && (e.namespace = p.namespace), p.$initialEditorState !== void 0 && (e.$initialEditorState = p.$initialEditorState), p.nodes) for (const h of Xl(p)) {
        if (typeof h != "function") {
          const g = o.get(h.replace);
          g && wt(302, p.name, h.replace.name, g.extension.name), o.set(h.replace, w);
        }
        r.add(h);
      }
      if (p.html) {
        if (p.html.export) for (const [h, g] of p.html.export.entries()) n.set(h, g);
        p.html.import && Object.assign(i, p.html.import);
      }
      p.theme && ni(s, p.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), r.size && (e.nodes = [...r]);
    const l = Object.keys(i).length > 0, d = n.size > 0;
    (l || d) && (e.html = {}, l && (e.html.import = i), d && (e.html.export = n));
    for (const w of c) w.init(e);
    return e.onError || (e.onError = ad), e;
  }
}
const od = /* @__PURE__ */ new Set(), Zo = oe({ build(t, e, r) {
  const o = r.getDependency(Ga).output, n = Cr({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = oi(() => {
  }, () => ge(() => {
    const s = i.peek(), { watchedNodeKeys: c } = n.value;
    let l, d = !1;
    o.value.read(() => {
      if (Jt()) for (const [w, p] of c.entries()) {
        if (p.size === 0) {
          c.delete(w);
          continue;
        }
        const h = Pc(w), g = h && h.isSelected() || !1;
        d = d || g !== (!!s && s.has(w)), g && (l = l || /* @__PURE__ */ new Set(), l.add(w));
      }
    }), !d && l && s && l.size === s.size || (i.value = l);
  }));
  return { watchNodeKey: function(s) {
    const c = Yl(() => (i.value || od).has(s)), { watchedNodeKeys: l } = n.peek();
    let d = l.get(s);
    const w = d !== void 0;
    return d = d || /* @__PURE__ */ new Set(), d.add(c), w || (l.set(s, d), n.value = { watchedNodeKeys: l }), c;
  } };
}, dependencies: [Ga], name: "@lexical/extension/NodeSelection" }), nd = Ec("INSERT_HORIZONTAL_RULE_COMMAND");
class ir extends Ba {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new ir(e.__key);
  }
  static importJSON(e) {
    return mo().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: id, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const r = document.createElement("hr");
    return jn(r, e.theme.hr), r;
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
function id() {
  return { node: mo() };
}
function mo() {
  return Ac(ir);
}
function sd(t) {
  return t instanceof ir;
}
oe({ dependencies: [Ga, Zo], name: "@lexical/extension/HorizontalRule", nodes: () => [ir], register(t, e, r) {
  const { watchNodeKey: o } = r.getDependency(Zo).output, n = Cr({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return Ce(t.registerCommand(nd, (s) => {
    const c = Jt();
    if (!he(c)) return !1;
    if (c.focus.getNode() !== null) {
      const l = mo();
      Fl(l);
    }
    return !0;
  }, co), t.registerCommand(Tc, (s) => {
    if (Sc(s.target)) {
      const c = zc(s.target);
      if (sd(c)) return function(l, d = !1) {
        const w = Jt(), p = l.isSelected(), h = l.getKey();
        let g;
        d && Vn(w) ? g = w : (g = Rc(), Dc(g)), p ? g.delete(h) : g.add(h);
      }(c, s.shiftKey), !0;
    }
    return !1;
  }, Ln), t.registerMutationListener(ir, (s, c) => {
    Hl(() => {
      let l = !1;
      const { nodeSelections: d } = n.peek();
      for (const [w, p] of s.entries()) if (p === "destroyed") d.delete(w), l = !0;
      else {
        const h = d.get(w), g = t.getElementByKey(w);
        h ? h.domNode.value = g : (l = !0, d.set(w, { domNode: Cr(g), selectedSignal: o(w) }));
      }
      l && (n.value = { nodeSelections: d });
    });
  }), ge(() => {
    const s = [];
    for (const { domNode: c, selectedSignal: l } of n.value.nodeSelections.values()) s.push(ge(() => {
      const d = c.value;
      d && (l.value ? jn(d, i) : Vc(d, i));
    }));
    return Ce(...s);
  }));
} });
oe({ build: (t, e) => wr({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Je({ $getParentEditor: function() {
  const t = Oc();
  return or.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, r) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, r) => ge(() => {
  const o = t._parentEditor;
  if (o && r.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
oe({ build: (t, e, r) => wr(e), config: Je({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, r) => {
  const o = r.getOutput();
  return ge(() => {
    if (!o.disabled.value) return jl(t, o.onReposition.value);
  });
} });
function ci(t) {
  return t.canBeEmpty();
}
function cd(t, e, r = ci) {
  return Ce(t.registerCommand(Lc, (o) => {
    const n = Jt();
    if (!he(n)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => jc(h) && h.canIndent()).length > 0) return !0;
      const c = s.anchor, l = s.focus, d = l.isBefore(c) ? l : c, w = d.getNode(), p = Bl(w);
      if (p.canIndent()) {
        const h = p.getKey();
        let g = Bc();
        if (g.anchor.set(h, 0, "element"), g.focus.set(h, 0, "element"), g = Fc(g), g.anchor.is(d)) return !0;
      }
      return !1;
    }(n) ? o.shiftKey ? Uc : Ao : Kc;
    return t.dispatchCommand(i, void 0);
  }, co), t.registerCommand(Ao, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, n = Jt();
    if (!he(n)) return !1;
    const i = typeof r == "function" ? r : r.peek();
    return Kl((s) => {
      if (i(s)) {
        const c = s.getIndent() + 1;
        (!o || c < o) && s.setIndent(c);
      }
    });
  }, lo));
}
oe({ build: (t, e, r) => wr(e), config: Je({ $canIndent: ci, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, r) {
  const { disabled: o, maxIndent: n, $canIndent: i } = r.getOutput();
  return ge(() => {
    if (!o.value) return cd(t, n, i);
  });
} });
const ld = oe({ name: "@lexical/react/ReactProvider" });
function dd() {
  return Me().getTextContent();
}
function wd(t, e = !0) {
  if (t) return !1;
  let r = dd();
  return e && (r = r.trim()), r === "";
}
function ud(t) {
  if (!wd(t, !1)) return !1;
  const e = Me().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let o = 0; o < r; o++) {
    const n = e[o];
    if (qc(n)) return !1;
    if (Nr(n)) {
      if (!Hc(n) || n.__indent !== 0) return !1;
      const i = n.getChildren(), s = i.length;
      for (let c = 0; c < s; c++) {
        const l = i[o];
        if (!Fa(l)) return !1;
      }
    }
  }
  return !0;
}
function li(t) {
  return () => ud(t);
}
function di(t) {
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
          const l = c.args;
          if (l) {
            const [d, w, p, h, g] = l;
            t.update(() => {
              const f = Jt();
              if (he(f)) {
                const b = f.anchor;
                let m = b.getNode(), N = 0, y = 0;
                if (Fa(m) && d >= 0 && w >= 0 && (N = d, y = d + w, f.setTextNodeRange(m, N, m, y)), N === y && p === "" || (f.insertRawText(p), m = b.getNode()), Fa(m)) {
                  N = h, y = h + g;
                  const _ = m.getTextContentSize();
                  N = N > _ ? _ : N, y = y > _ ? _ : y, f.setTextNodeRange(m, N, m, y);
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
oe({ build: (t, e, r) => wr(e), config: Je({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, r) => ge(() => r.getOutput().disabled.value ? void 0 : di(t)) });
function pd(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const n of e) o.append("v", n);
  throw r.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const vo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : W;
function hd({ editor: t, ErrorBoundary: e }) {
  return function(r, o) {
    const [n, i] = k(() => r.getDecorators());
    return vo(() => r.registerDecoratorListener((s) => {
      Jc(() => {
        i(s);
      });
    }), [r]), W(() => {
      i(r.getDecorators());
    }, [r]), O(() => {
      const s = [], c = Object.keys(n);
      for (let l = 0; l < c.length; l++) {
        const d = c[l], w = a(o, { onError: (h) => r._onError(h), children: a(Js, { fallback: null, children: n[d] }) }), p = r.getElementByKey(d);
        p !== null && s.push(Zc(w, p, d));
      }
      return s;
    }, [o, n, r]);
  }(t, e);
}
function gd({ editor: t, ErrorBoundary: e }) {
  return function(r) {
    const o = or.maybeFromEditor(r);
    if (o && o.hasExtensionByName(ld.name)) {
      for (const n of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(n) && pd(320, n);
      return !0;
    }
    return !1;
  }(t) ? null : a(hd, { editor: t, ErrorBoundary: e });
}
function Qo(t) {
  return t.getEditorState().read(li(t.isComposing()));
}
function fd({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [o] = ve();
  return function(n) {
    vo(() => Ce(Xc(n), di(n)), [n]);
  }(o), u(ct, { children: [t, a(md, { content: e }), a(gd, { editor: o, ErrorBoundary: r })] });
}
function md({ content: t }) {
  const [e] = ve(), r = function(n) {
    const [i, s] = k(() => Qo(n));
    return vo(() => {
      function c() {
        const l = Qo(n);
        s(l);
      }
      return c(), Ce(n.registerUpdateListener(() => {
        c();
      }), n.registerEditableListener(() => {
        c();
      }));
    }, [n]), i;
  }(e), o = Ml();
  return r ? typeof t == "function" ? t(o) : t : null;
}
function vd({ defaultSelection: t }) {
  const [e] = ve();
  return W(() => {
    e.focus(() => {
      const r = document.activeElement, o = e.getRootElement();
      o === null || r !== null && o.contains(r) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const bd = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : W;
function xd({ onClear: t }) {
  const [e] = ve();
  return bd(() => ri(e, t), [e, t]), null;
}
const wi = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Xt : W;
function yd({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: o, ariaDescribedBy: n, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: c, ariaLabel: l, ariaLabelledBy: d, ariaMultiline: w, ariaOwns: p, ariaRequired: h, autoCapitalize: g, className: f, id: b, role: m = "textbox", spellCheck: N = !0, style: y, tabIndex: _, "data-testid": D, ...B }, z) {
  const [j, P] = k(t.isEditable()), E = L((H) => {
    H && H.ownerDocument && H.ownerDocument.defaultView ? t.setRootElement(H) : t.setRootElement(null);
  }, [t]), V = O(() => /* @__PURE__ */ function(...H) {
    return (C) => {
      for (const X of H) typeof X == "function" ? X(C) : X != null && (X.current = C);
    };
  }(z, E), [E, z]);
  return wi(() => (P(t.isEditable()), t.registerEditableListener((H) => {
    P(H);
  })), [t]), a("div", { "aria-activedescendant": j ? e : void 0, "aria-autocomplete": j ? r : "none", "aria-controls": j ? o : void 0, "aria-describedby": n, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": j && m === "combobox" ? !!s : void 0, ...c != null ? { "aria-invalid": c } : {}, "aria-label": l, "aria-labelledby": d, "aria-multiline": w, "aria-owns": j ? p : void 0, "aria-readonly": !j || void 0, "aria-required": h, autoCapitalize: g, className: f, contentEditable: j, "data-testid": D, id: b, ref: V, role: m, spellCheck: N, style: y, tabIndex: _, ...B });
}
const kd = Sn(yd);
function tn(t) {
  return t.getEditorState().read(li(t.isComposing()));
}
const _d = Sn(Nd);
function Nd(t, e) {
  const { placeholder: r, ...o } = t, [n] = ve();
  return u(ct, { children: [a(kd, { editor: n, ...o, ref: e }), r != null && a(Cd, { editor: n, content: r })] });
}
function Cd({ content: t, editor: e }) {
  const r = function(s) {
    const [c, l] = k(() => tn(s));
    return wi(() => {
      function d() {
        const w = tn(s);
        l(w);
      }
      return d(), Ce(s.registerUpdateListener(() => {
        d();
      }), s.registerEditableListener(() => {
        d();
      }));
    }, [s]), c;
  }(e), [o, n] = k(e.isEditable());
  if (Xt(() => (n(e.isEditable()), e.registerEditableListener((s) => {
    n(s);
  })), [e]), !r) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : a("div", { "aria-hidden": !0, children: i });
}
function Ed({
  placeholder: t,
  className: e,
  placeholderClassName: r
}) {
  return /* @__PURE__ */ a(
    _d,
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
const ui = ia(void 0);
function Td({
  activeEditor: t,
  $updateToolbar: e,
  blockType: r,
  setBlockType: o,
  showModal: n,
  children: i
}) {
  const s = O(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: r,
      setBlockType: o,
      showModal: n
    }),
    [t, e, r, o, n]
  );
  return /* @__PURE__ */ a(ui.Provider, { value: s, children: i });
}
function pi() {
  const t = io(ui);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Sd() {
  const [t, e] = k(void 0), r = L(() => {
    e(void 0);
  }, []), o = O(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ a(Oa, { open: !0, onOpenChange: r, children: /* @__PURE__ */ u(Ma, { children: [
      /* @__PURE__ */ a($a, { children: /* @__PURE__ */ a(Ia, { children: i }) }),
      s
    ] }) });
  }, [t, r]), n = L(
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
function zd({
  children: t
}) {
  const [e] = ve(), [r, o] = k(e), [n, i] = k("paragraph"), [s, c] = Sd(), l = () => {
  };
  return W(() => r.registerCommand(
    Bn,
    (d, w) => (o(w), !1),
    lo
  ), [r]), /* @__PURE__ */ u(
    Td,
    {
      activeEditor: r,
      $updateToolbar: l,
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
function Rd(t) {
  const [e] = ve(), { activeEditor: r } = pi();
  W(() => r.registerCommand(
    Bn,
    () => {
      const o = Jt();
      return o && t(o), !1;
    },
    lo
  ), [e, t]), W(() => {
    r.getEditorState().read(() => {
      const o = Jt();
      o && t(o);
    });
  }, [r, t]);
}
const en = [
  { format: "bold", icon: ds, label: "Bold" },
  { format: "italic", icon: ws, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Dd() {
  const { activeEditor: t } = pi(), [e, r] = k([]), o = L((n) => {
    if (he(n) || Qc(n)) {
      const i = [];
      en.forEach(({ format: s }) => {
        n.hasFormat(s) && i.push(s);
      }), r((s) => s.length !== i.length || !i.every((c) => s.includes(c)) ? i : s);
    }
  }, []);
  return Rd(o), /* @__PURE__ */ a(
    gn,
    {
      type: "multiple",
      value: e,
      onValueChange: r,
      variant: "outline",
      size: "sm",
      children: en.map(({ format: n, icon: i, label: s }) => /* @__PURE__ */ a(
        jr,
        {
          value: n,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Pn, n);
          },
          children: /* @__PURE__ */ a(i, { className: "tw:h-4 tw:w-4" })
        },
        n
      ))
    }
  );
}
function Od({ onClear: t }) {
  const [e] = ve();
  W(() => {
    t && t(() => {
      e.dispatchCommand(An, void 0);
    });
  }, [e, t]);
}
function Md({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: r
}) {
  const [, o] = k(void 0);
  return /* @__PURE__ */ u("div", { className: "tw:relative", children: [
    /* @__PURE__ */ a(zd, { children: () => /* @__PURE__ */ a("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ a(Dd, {}) }) }),
    /* @__PURE__ */ u("div", { className: "tw:relative", children: [
      /* @__PURE__ */ a(
        fd,
        {
          contentEditable: /* @__PURE__ */ a("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ a(Ed, { placeholder: t }) }),
          ErrorBoundary: Rl
        }
      ),
      e && /* @__PURE__ */ a(vd, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ a(Od, { onClear: r }),
      /* @__PURE__ */ a(xd, {})
    ] })
  ] });
}
const $d = {
  namespace: "commentEditor",
  theme: po,
  nodes: ho,
  onError: (t) => {
    console.error(t);
  }
};
function ta({
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
        className: v(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          c
        ),
        children: /* @__PURE__ */ a(
          Nl,
          {
            initialConfig: {
              ...$d,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ u(zt, { children: [
              /* @__PURE__ */ a(Md, { placeholder: n, autoFocus: i, onClear: s }),
              /* @__PURE__ */ a(
                El,
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
function hi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const r = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), r == null || r.removeAllRanges(), r == null || r.addRange(o), !0;
}
function gi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : gi(e.children)
  ) : !1;
}
function ae(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? gi(t.root.children) : !1;
}
function Id(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Fn({
    namespace: "EditorUtils",
    theme: po,
    nodes: ho,
    onError: (o) => {
      console.error(o);
    }
  });
  let r;
  if (e.update(
    () => {
      const n = new DOMParser().parseFromString(t, "text/html"), i = el(e, n);
      Me().clear(), Gc(i);
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
function ea(t) {
  const e = Fn({
    namespace: "EditorUtils",
    theme: po,
    nodes: ho,
    onError: (n) => {
      console.error(n);
    }
  }), r = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(r);
  let o = "";
  return e.getEditorState().read(() => {
    o = tl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function bo(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const fi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), rn = (t, e) => t[e] ?? e;
function mi({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: n = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = rn(o, "%cancelButton_tooltip%"), c = i ?? rn(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ u(Za, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": s,
          className: n,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ a(oo, {})
        }
      ) }),
      /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ a("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ a(fn, {}),
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": c,
          className: n,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ a(Oe, {})
        }
      ) }),
      /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ a("p", { children: c }) })
    ] }) })
  ] });
}
const Ad = "verseText", cp = Object.freeze([
  "%conflict_note_description_verseText%",
  // Accessible name for the resolution radio group (the group has no other visible <label>).
  "%conflict_note_choose_aria_label%",
  "%conflict_note_stale_notice%",
  "%conflict_note_resolve_failed%",
  "%conflict_note_choose_prompt%",
  "%conflict_note_option_keep_current%",
  "%conflict_note_option_use_other%",
  "%conflict_note_option_combine%",
  "%conflict_note_save_and_resolve%",
  // Tooltip when Save is disabled (keeping the current text is a no-op).
  "%conflict_note_save_disabled_tooltip%",
  // Tooltip when Save is enabled (the resolution is irreversible).
  "%conflict_note_save_warning%",
  // Neutral placeholder when an already-resolved conflict's Result region has no text to show.
  "%conflict_note_no_result%",
  // Consumed by CommentItem for a conflict thread's resolution banner (not by ConflictNoteCard):
  // the neutral outcome line derived from conflictResolutionAction.
  "%conflict_note_outcome_used_other%",
  "%conflict_note_outcome_combined%",
  // Consumed by ConflictThreadSummary (the collapsed conflict-thread preview): a status-aware
  // one-liner shown instead of the raw PT9 note body. Unresolved shows the prompt plus the diff;
  // resolved shows only the outcome sentence keyed off resolvedResolution.
  "%conflict_note_summary_unresolved%",
  "%conflict_note_summary_resolved_kept_current%",
  "%conflict_note_summary_resolved_used_other%",
  "%conflict_note_summary_resolved_combined%"
]), vi = [
  "tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
  "tw:prose-quoteless"
].join(" ");
function bi(t) {
  return (t == null ? void 0 : t.conflictType) === Ad;
}
function xi(t) {
  return t === "replaced" ? "reject" : t === "merged" ? "merged" : "accept";
}
function qr(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function xo(t) {
  const e = Qa();
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Pd = {
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
function Sa(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function lp({
  assignableUsers: t,
  onSave: e,
  onClose: r,
  localizedStrings: o,
  initialAssignedUser: n
}) {
  const [i, s] = k(Pd), [c, l] = k(n), [d, w] = k(!1), p = U(void 0), h = U(null);
  W(() => {
    let m = !0;
    const N = h.current;
    if (!N) return;
    const y = setTimeout(() => {
      m && hi(N);
    }, 300);
    return () => {
      m = !1, clearTimeout(y);
    };
  }, []);
  const g = L(() => {
    if (!ae(i)) return;
    const m = ea(i);
    e(m, c);
  }, [i, e, c]), f = o["%commentEditor_placeholder%"] ?? "Type your comment here...", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ u("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ a("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ a(
        mi,
        {
          onCancelClick: r,
          onAcceptClick: g,
          canAccept: ae(i),
          localizedStrings: o,
          acceptLabel: o["%commentEditor_saveButton_tooltip%"]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ u($e, { open: d, onOpenChange: w, children: [
      /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ u(
        G,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ a(yn, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { children: Sa(c !== void 0 ? c : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Ie,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (m) => {
            m.key === "Escape" && (m.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(Pe, { children: t.map((m) => /* @__PURE__ */ a(
            Ee,
            {
              onSelect: () => {
                l(m || void 0), w(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ a("span", { children: Sa(m, o) })
            },
            m || "unassigned"
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
        onKeyDownCapture: (m) => {
          m.key === "Escape" ? (m.preventDefault(), m.stopPropagation(), r()) : xo(m) && (m.preventDefault(), m.stopPropagation(), ae(i) && g());
        },
        onKeyDown: (m) => {
          bo(m), (m.key === "Enter" || m.key === " ") && m.stopPropagation();
        },
        children: /* @__PURE__ */ a(
          ta,
          {
            editorSerializedState: i,
            onSerializedChange: (m) => s(m),
            placeholder: f,
            onClear: (m) => {
              p.current = m;
            }
          }
        )
      }
    )
  ] });
}
const dp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...fi
]), wp = Object.freeze([
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
]), Vd = "comment-list";
function up(t) {
  return t;
}
function Ld({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card",
      "data-size": e,
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",
        t
      ),
      ...r
    }
  );
}
function pp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-header",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",
        t
      ),
      ...e
    }
  );
}
function hp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-title",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",
        t
      ),
      ...e
    }
  );
}
function gp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-description",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function jd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-content",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",
        t
      ),
      ...e
    }
  );
}
function fp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "card-footer",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",
        t
      ),
      ...e
    }
  );
}
function Bd({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    wo.Root,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",
        t
      ),
      ...r
    }
  );
}
function mp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    wo.Image,
    {
      "data-slot": "avatar-image",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",
        t
      ),
      ...e
    }
  );
}
function Fd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    wo.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",
        t
      ),
      ...e
    }
  );
}
function an({
  comment: t,
  isReply: e = !1,
  localizedStrings: r,
  isThreadExpanded: o = !1,
  handleUpdateComment: n,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: c = !1
}) {
  const [l, d] = k(!1), [w, p] = k(), h = U(null);
  W(() => {
    if (!l) return;
    let z = !0;
    const j = h.current;
    if (!j) return;
    const P = setTimeout(() => {
      z && hi(j);
    }, 300);
    return () => {
      z = !1, clearTimeout(P);
    };
  }, [l]);
  const g = L(
    (z) => {
      z && z.stopPropagation(), d(!1), p(void 0), s == null || s(!1);
    },
    [s]
  ), f = L(
    async (z) => {
      if (z && z.stopPropagation(), !w || !n) return;
      await n(
        t.id,
        ea(w)
      ) && (d(!1), p(void 0), s == null || s(!1));
    },
    [w, n, t.id, s]
  ), b = O(() => {
    const z = new Date(t.date), j = Fs(
      z,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), P = z.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ge(r["%comment_dateAtTime%"], {
      date: j,
      time: P
    });
  }, [t.date, r]), m = O(() => t.user, [t.user]), N = O(
    () => t.user.split(" ").map((z) => z[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = O(() => no(t.contents), [t.contents]), _ = O(
    () => t.contents.replace(/<[^>]*>/g, "").trim().length > 0,
    [t.contents]
  ), D = !!t.conflictResolutionAction && !_, B = O(() => {
    if (o && c)
      return /* @__PURE__ */ u(ct, { children: [
        /* @__PURE__ */ u(
          He,
          {
            onClick: (z) => {
              z.stopPropagation(), d(!0), p(Id(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ a(us, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ u(
          He,
          {
            onClick: async (z) => {
              z.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ a(ps, { className: "tw:me-2 tw:h-4 tw:w-4" }),
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
      className: v("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ a(Bd, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ a(Fd, { className: "tw:text-xs tw:font-medium", children: N }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-medium", children: m }),
            /* @__PURE__ */ a("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: b }),
            /* @__PURE__ */ a("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ u(kr, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              qr(t.assignedUser, r)
            ] })
          ] }),
          l && /* @__PURE__ */ u(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (z) => {
                z.key === "Escape" ? (z.preventDefault(), z.stopPropagation(), g()) : xo(z) && (z.preventDefault(), z.stopPropagation(), ae(w) && f());
              },
              onKeyDown: (z) => {
                bo(z), (z.key === "Enter" || z.key === " ") && z.stopPropagation();
              },
              onClick: (z) => {
                z.stopPropagation();
              },
              children: [
                /* @__PURE__ */ a(
                  ta,
                  {
                    className: v(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: w,
                    onSerializedChange: (z) => p(z)
                  }
                ),
                /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ a(
                    G,
                    {
                      size: "icon",
                      onClick: g,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ a(oo, {})
                    }
                  ),
                  /* @__PURE__ */ a(
                    G,
                    {
                      size: "icon",
                      onClick: f,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !ae(w),
                      children: /* @__PURE__ */ a(kn, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !l && /* @__PURE__ */ u(ct, { children: [
            t.status === "Resolved" && !D && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: r["%comment_status_todo%"] }),
            D ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              /* @__PURE__ */ a("div", { className: "tw:text-sm tw:italic", children: xi(t.conflictResolutionAction) === "merged" ? r["%conflict_note_outcome_combined%"] ?? "Combined both changes." : r["%conflict_note_outcome_used_other%"] ?? "Used the other change instead of the current text." })
            ) : /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  vi,
                  "tw:items-start tw:gap-2",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        B && /* @__PURE__ */ u(Ve, { children: [
          /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "ghost", size: "icon", children: /* @__PURE__ */ a(hs, {}) }) }),
          /* @__PURE__ */ a(je, { align: "end", children: B })
        ] })
      ]
    }
  );
}
function yi({
  show: t,
  disabled: e = !1,
  onClick: r,
  ariaLabel: o
}) {
  if (t)
    return /* @__PURE__ */ a(
      G,
      {
        variant: "ghost",
        size: "icon",
        disabled: e,
        className: v(
          "tw:ms-auto",
          "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
          "tw:opacity-0 tw:group-hover:opacity-100"
        ),
        onClick: (n) => {
          n.stopPropagation(), r();
        },
        "aria-label": o,
        children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" })
      }
    );
}
const on = {
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
function ki({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: r,
  isSelected: o = !1,
  verseRef: n,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: c,
  threadId: l,
  thread: d,
  threadStatus: w,
  handleAddCommentToThread: p,
  handleUpdateComment: h,
  handleDeleteComment: g,
  handleReadStatusChange: f,
  assignableUsers: b,
  canUserAddCommentToThread: m,
  canUserAssignThreadCallback: N,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: _,
  isRead: D = !1,
  autoReadDelay: B = 5,
  onVerseRefClick: z,
  initialAssignedUser: j,
  activeComments: P,
  rootContentSlot: E,
  resolveActionSlot: V,
  spaceRootContentFromReplies: H = !1
}) {
  const [C, X] = k(on), [F, $] = k(), [M, S] = k(), tt = o, [K, kt] = k(!1), [lt, $t] = k(!1), [Y, rt] = k(!1), [ft, dt] = k(!1), [pt, Ht] = k(!1), [nt, Zt] = k(D), [Gt, Qt] = k(!1), xt = U(void 0), [te, It] = k(/* @__PURE__ */ new Map());
  W(() => {
    let T = !0;
    return (async () => {
      const _t = y ? await y(l) : !1;
      T && Ht(_t);
    })(), () => {
      T = !1;
    };
  }, [l, y]), W(() => {
    let T = !0;
    if (!o) {
      dt(!1), It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = N ? await N(l) : !1;
      T && dt(_t);
    })(), () => {
      T = !1;
    };
  }, [o, l, N]);
  const yt = U("idle");
  W(() => {
    if (!o) {
      yt.current !== "idle" && ($(void 0), S(void 0), yt.current = "idle");
      return;
    }
    yt.current === "idle" && (yt.current = "pending"), ft ? yt.current === "pending" && j !== void 0 && // Skip pre-population if the thread is already assigned to this user — doing so
    // would show "Assigning to: Alice" and enable the submit button for a no-op call.
    j !== i && ($(j), yt.current = "auto-populated") : yt.current === "auto-populated" && ($(void 0), yt.current = "pending");
  }, [o, j, ft, i]);
  const At = O(
    () => P ?? e.filter((T) => !T.deleted),
    [P, e]
  );
  W(() => {
    let T = !0;
    if (!o || !_) {
      It(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = /* @__PURE__ */ new Map();
      await Promise.all(
        At.map(async (de) => {
          const Fe = await _(de.id);
          T && _t.set(de.id, Fe);
        })
      ), T && It(_t);
    })(), () => {
      T = !1;
    };
  }, [o, At, _]);
  const R = O(() => At[0], [At]), be = U(null), ee = U(void 0), A = L(() => {
    var T;
    (T = ee.current) == null || T.call(ee), X(on);
  }, []), Z = L(() => {
    const T = !nt;
    Zt(T), Qt(!T), f == null || f(l, T);
  }, [nt, f, l]);
  W(() => {
    kt(!1);
  }, [o]), W(() => {
    if (o && !nt && !Gt) {
      const T = setTimeout(() => {
        Zt(!0), f == null || f(l, !0);
      }, B * 1e3);
      return xt.current = T, () => clearTimeout(T);
    }
    xt.current && (clearTimeout(xt.current), xt.current = void 0);
  }, [o, nt, Gt, B, l, f]);
  const at = O(
    () => ({
      singleReply: r["%comment_thread_single_reply%"],
      multipleReplies: r["%comment_thread_multiple_replies%"]
    }),
    [r]
  ), it = O(() => {
    if (i === void 0)
      return;
    if (i === "")
      return r["%comment_assign_unassigned%"] ?? "Unassigned";
    const T = qr(i, r);
    return Ge(r["%comment_assigned_to%"], {
      assignedUser: T
    });
  }, [i, r]), ht = O(() => At.slice(1), [At]), et = O(() => ht.length ?? 0, [ht.length]), gt = O(() => et > 0, [et]), st = O(() => K || et <= 2 ? ht : ht.slice(-2), [ht, et, K]), mt = O(() => K || et <= 2 ? 0 : et - 2, [et, K]), Vt = O(
    () => et === 1 ? at.singleReply : Ge(at.multipleReplies, { count: et }),
    [et, at]
  ), Et = O(
    () => mt === 1 ? at.singleReply : Ge(at.multipleReplies, { count: mt }),
    [mt, at]
  );
  W(() => {
    !o && lt && gt && $t(!1);
  }, [o, lt, gt]);
  const Lt = L(
    async (T) => {
      T && T.stopPropagation();
      const jt = ae(C) ? ea(C) : void 0;
      if (F !== void 0) {
        await p({
          threadId: l,
          contents: jt,
          assignedUser: F
        }) && (S(F), jt && A());
        return;
      }
      jt && await p({ threadId: l, contents: jt }) && A();
    },
    [
      A,
      C,
      p,
      F,
      l
    ]
  ), Tt = L(
    async (T) => {
      const jt = ae(C) ? ea(C) : void 0, _t = T.status ? T.assignedUser : F ?? T.assignedUser, de = await p({
        ...T,
        contents: jt,
        assignedUser: _t
      });
      return de && (_t !== void 0 && S(_t), jt && A()), de;
    },
    [A, C, p, F]
  );
  if (At.length === 0) return;
  const Te = /* @__PURE__ */ a(
    an,
    {
      comment: R,
      localizedStrings: r,
      isThreadExpanded: o,
      threadStatus: w,
      handleAddCommentToThread: Tt,
      handleUpdateComment: h,
      handleDeleteComment: g,
      onEditingChange: $t,
      canEditOrDelete: (!lt && te.get(R.id)) ?? !1,
      canUserResolveThread: pt
    }
  );
  return /* @__PURE__ */ a(
    Ld,
    {
      role: "option",
      "aria-selected": o,
      id: l,
      className: v(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && w !== "Resolved" && nt,
          "tw:bg-background": o && w !== "Resolved" && nt,
          "tw:bg-muted": w === "Resolved",
          "tw:bg-accent": !nt && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        c(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ u(jd, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            it && /* @__PURE__ */ a(kr, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: it }),
            /* @__PURE__ */ a(
              G,
              {
                variant: "ghost",
                size: "icon",
                onClick: (T) => {
                  T.stopPropagation(), Z();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": nt ? r["%comment_aria_mark_as_unread%"] ?? "Mark as unread" : r["%comment_aria_mark_as_read%"] ?? "Mark as read",
                children: nt ? /* @__PURE__ */ a(gs, {}) : /* @__PURE__ */ a(fs, {})
              }
            ),
            V === void 0 ? (
              // Generic status-resolve check (used by non-conflict threads and, via ConflictThread
              // leaving this slot undefined, by non-verseText conflicts, which resolve through a
              // plain status change). ConflictThread overrides this slot for verseText conflicts.
              /* @__PURE__ */ a(
                yi,
                {
                  show: pt && w !== "Resolved",
                  onClick: () => Tt({ threadId: l, status: "Resolved" }),
                  ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
                }
              )
            ) : V
          ] }),
          /* @__PURE__ */ a("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ u(
            "p",
            {
              ref: be,
              className: v(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": tt
                },
                { "tw:whitespace-nowrap": !tt }
              ),
              children: [
                n && z ? /* @__PURE__ */ a(
                  G,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (T) => {
                      T.stopPropagation(), z(d);
                    },
                    children: n
                  }
                ) : n,
                /* @__PURE__ */ u("span", { className: t, children: [
                  R.contextBefore,
                  /* @__PURE__ */ a("span", { className: "tw:font-bold", children: R.selectedText }),
                  R.contextAfter
                ] })
              ]
            }
          ) }),
          E ?? Te
        ] }),
        /* @__PURE__ */ u(ct, { children: [
          gt && !o && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(_r, {}) }),
            /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Vt })
          ] }),
          !o && ae(C) && /* @__PURE__ */ a(
            ta,
            {
              editorSerializedState: C,
              onSerializedChange: (T) => X(T),
              placeholder: r["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ u(ct, { children: [
            H && st.length > 0 && /* @__PURE__ */ a("div", { className: "tw:h-2", "data-slot": "root-content-reply-gap", "aria-hidden": "true" }),
            mt > 0 && /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (T) => {
                  T.stopPropagation(), kt(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (T) => {
                  (T.key === "Enter" || T.key === " ") && (T.preventDefault(), T.stopPropagation(), kt(!0));
                },
                children: [
                  /* @__PURE__ */ a("div", { className: "tw:w-8", children: /* @__PURE__ */ a(_r, {}) }),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: Et }),
                    K ? /* @__PURE__ */ a(ms, {}) : /* @__PURE__ */ a(nr, {})
                  ] })
                ]
              }
            ),
            st.map((T) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
              an,
              {
                comment: T,
                localizedStrings: r,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: g,
                onEditingChange: $t,
                canEditOrDelete: (!lt && te.get(T.id)) ?? !1
              }
            ) }, T.id)),
            m !== !1 && (!lt || ae(C)) && /* @__PURE__ */ u(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (T) => T.stopPropagation(),
                onKeyDownCapture: (T) => {
                  xo(T) && (T.preventDefault(), T.stopPropagation(), (ae(C) || F !== void 0 && F !== M) && Lt());
                },
                onKeyDown: (T) => {
                  bo(T), (T.key === "Enter" || T.key === " ") && T.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ a(
                    ta,
                    {
                      editorSerializedState: C,
                      onSerializedChange: (T) => X(T),
                      placeholder: w === "Resolved" ? r["%comment_reopenResolved%"] : r["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (T) => {
                        ee.current = T;
                      }
                    }
                  ),
                  /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    F !== void 0 && (ae(C) || F !== M) && /* @__PURE__ */ a("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: Ge(
                      r["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: qr(
                          F,
                          r
                        )
                      }
                    ) }),
                    /* @__PURE__ */ u($e, { open: Y, onOpenChange: rt, children: [
                      /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ a(
                        G,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !ft || !b || b.length === 0 || !b.includes(s),
                          "aria-label": r["%comment_aria_assign_user%"] ?? "Assign user",
                          children: /* @__PURE__ */ a(yn, {})
                        }
                      ) }),
                      /* @__PURE__ */ a(
                        Ie,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (T) => {
                            T.key === "Escape" && (T.stopPropagation(), rt(!1));
                          },
                          children: /* @__PURE__ */ a(Ae, { children: /* @__PURE__ */ a(Pe, { children: b == null ? void 0 : b.map((T) => /* @__PURE__ */ a(
                            Ee,
                            {
                              onSelect: () => {
                                $(T !== i ? T : void 0), yt.current = "user-selected", S(void 0), rt(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ a("span", { children: qr(T, r) })
                            },
                            T || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      G,
                      {
                        size: "icon",
                        onClick: Lt,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !ae(C) && (F === void 0 || F === M),
                        "aria-label": r["%comment_aria_submit_comment%"] ?? "Submit comment",
                        children: /* @__PURE__ */ a(kn, {})
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
const Ud = v(
  vi,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  "tw:[&>blockquote]:my-0 tw:[&_p]:my-0",
  "tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline",
  "tw:[&_s]:text-destructive tw:[&_s]:line-through"
), Kd = (t) => t.replace(/(\s+)(<\/[us]>)/g, "$2$1"), Hr = (t) => Kd(no(t));
function Gr({ html: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: Ud,
      dangerouslySetInnerHTML: { __html: t }
    }
  );
}
function qd({
  comment: t,
  localizedStrings: e,
  availableActions: r = "acceptOrReject",
  resolvedResolution: o,
  onResolve: n,
  isResolving: i = !1
}) {
  const [s, c] = k("accept"), l = Mo(), d = Mo(), w = r === "loading", p = r === "accept", h = r === "none", g = r === "acceptRejectOrMerge", f = p ? "accept" : s, b = O(
    () => Hr(t.rejectedText ?? ""),
    [t.rejectedText]
  ), m = O(
    () => Hr(t.acceptedText ?? ""),
    [t.acceptedText]
  ), N = O(
    () => Hr(t.mergedText ?? ""),
    [t.mergedText]
  ), y = O(() => no(t.contents), [t.contents]);
  if (!bi(t))
    return /* @__PURE__ */ a(Gr, { html: y });
  const _ = (M) => {
    c(M === "reject" || M === "merge" ? M : "accept");
  }, D = e["%conflict_note_stale_notice%"] ?? "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.", B = g ? [
    {
      value: "merge",
      label: e["%conflict_note_option_combine%"] ?? "Combine both changes",
      html: N
    }
  ] : [], z = [
    {
      value: "accept",
      label: e["%conflict_note_option_keep_current%"] ?? "Keep the current text",
      html: m
    },
    {
      value: "reject",
      label: e["%conflict_note_option_use_other%"] ?? "Use the other change",
      html: b
    },
    ...B
  ], j = f === "accept", P = i || j;
  let E;
  j ? E = e["%conflict_note_save_disabled_tooltip%"] ?? "Keeping the current text makes no change — resolve the thread with the ✓ to keep it." : i || (E = e["%conflict_note_save_warning%"] ?? "This can't be undone.");
  const V = e["%conflict_note_no_result%"] ?? "No result preview available.", H = /* @__PURE__ */ a("p", { className: "tw:text-muted-foreground", children: V }), C = (M) => M ? /* @__PURE__ */ a("p", { className: "tw:whitespace-pre-wrap tw:text-foreground", children: M }) : H, X = () => {
    const M = o ?? "accept";
    return M === "merged" ? t.mergedText ? /* @__PURE__ */ a(Gr, { html: N }) : H : C(M === "reject" ? t.rejectedResultText : t.resultText);
  }, F = (M) => p && M.value === "reject", $ = (M) => {
    const S = f === M.value, tt = `${d}-${M.value}`, K = F(M);
    return (
      // The whole card is a label, so a click anywhere in it forwards to the radio and selects the
      // option (no separate click handler needed). The radio keeps role=radio / aria-checked /
      // arrow-key navigation; its aria-label names the option so the inline diff isn't pulled into
      // the accessible name. The visible label text is aria-hidden to avoid announcing it twice (once
      // as the radio's name, once as adjacent text). The radio and title sit side by side on one flex
      // row (a `gap`, not a directional margin, so the browser's own RTL mirroring of `flex-row`
      // puts the radio on the correct logical side without extra dir-aware classes), with the diff
      // below as a sibling.
      /* @__PURE__ */ u(
        "label",
        {
          htmlFor: tt,
          "data-slot": "conflict-resolution-option",
          "data-value": M.value,
          className: v(
            "tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2",
            "tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1",
            S ? "tw:border-border tw:bg-accent/50" : "tw:border-transparent tw:hover:bg-accent/30",
            K ? "tw:cursor-not-allowed tw:opacity-60" : "tw:cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
              /* @__PURE__ */ a(
                Wr,
                {
                  id: tt,
                  value: M.value,
                  "aria-label": M.label,
                  disabled: K,
                  "aria-describedby": K ? l : void 0
                }
              ),
              /* @__PURE__ */ a("span", { "aria-hidden": !0, className: "tw:font-medium", children: M.label })
            ] }),
            K && // aria-describedby links the option to this visually-hidden notice so assistive tech
            // announces why the choice is read-only.
            /* @__PURE__ */ a("span", { id: l, className: "tw:sr-only", children: D }),
            /* @__PURE__ */ a(Gr, { html: M.html })
          ]
        },
        M.value
      )
    );
  };
  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-3 tw:text-sm", onClick: (M) => M.stopPropagation(), children: [
      /* @__PURE__ */ a("p", { children: e["%conflict_note_description_verseText%"] ?? "Conflicting changes were made to the verse text." }),
      w && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2", "data-slot": "conflict-loading", children: [
        /* @__PURE__ */ a(er, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(er, { className: "tw:h-8 tw:w-full" }),
        /* @__PURE__ */ a(er, { className: "tw:h-8 tw:w-24" })
      ] }),
      !w && h && X(),
      !w && !h && /* @__PURE__ */ u(ct, { children: [
        /* @__PURE__ */ a("p", { children: e["%conflict_note_choose_prompt%"] ?? "Select which change to keep:" }),
        /* @__PURE__ */ a(
          Ja,
          {
            value: f,
            onValueChange: _,
            disabled: i,
            "aria-label": e["%conflict_note_choose_aria_label%"] ?? "Choose resolution",
            children: z.map((M) => F(M) ? /* @__PURE__ */ a(zt, { delayDuration: 0, children: /* @__PURE__ */ u(Rt, { children: [
              /* @__PURE__ */ a(Dt, { asChild: !0, children: $(M) }),
              /* @__PURE__ */ a(Ot, { children: D })
            ] }) }, M.value) : $(M))
          }
        ),
        /* @__PURE__ */ a(zt, { delayDuration: 0, children: /* @__PURE__ */ u(Rt, { children: [
          /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "tw:inline-flex tw:self-start", children: /* @__PURE__ */ a(
            G,
            {
              size: "sm",
              disabled: P,
              onClick: () => n == null ? void 0 : n(f),
              children: e["%conflict_note_save_and_resolve%"] ?? "Save and resolve"
            }
          ) }) }),
          E && /* @__PURE__ */ a(Ot, { children: E })
        ] }) })
      ] })
    ] })
  );
}
const Hd = {
  accept: {
    key: "%conflict_note_summary_resolved_kept_current%",
    fallback: "Conflicting edits were resolved. Kept the current text."
  },
  reject: {
    key: "%conflict_note_summary_resolved_used_other%",
    fallback: "Conflicting edits were resolved. Used the other change."
  },
  merged: {
    key: "%conflict_note_summary_resolved_combined%",
    fallback: "Conflicting edits were resolved. Combined both changes."
  }
};
function Gd({
  comment: t,
  localizedStrings: e,
  resolvedResolution: r
}) {
  const o = O(
    () => Hr(t.rejectedText ?? ""),
    [t.rejectedText]
  );
  if (r) {
    const { key: i, fallback: s } = Hd[r];
    return /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: e[i] ?? s });
  }
  const n = e["%conflict_note_summary_unresolved%"] ?? "Conflicting edits. Choose which change to keep.";
  return /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1", children: [
    /* @__PURE__ */ a("p", { className: "tw:text-sm tw:font-normal tw:text-muted-foreground", children: n }),
    o ? /* @__PURE__ */ a(Gr, { html: o }) : void 0
  ] });
}
function Yd(t) {
  return t === "reject" ? "reject" : t === "merge" ? "merged" : "accept";
}
function Wd({
  threadId: t,
  threadStatus: e,
  isSelected: r,
  activeComments: o,
  conflictResolution: n
}) {
  const [i, s] = k("loading"), [c, l] = k(!1), [d, w] = k(), p = n == null ? void 0 : n.getOptions, h = n == null ? void 0 : n.resolve;
  W(() => {
    let y = !0;
    if (!r) {
      s("loading");
      return;
    }
    return (async () => {
      let D;
      try {
        D = p ? await p(t) : "none";
      } catch {
        D = "none";
      }
      y && (s(D), D !== "none" && w(void 0));
    })(), () => {
      y = !1;
    };
  }, [r, t, e, p]);
  const g = U(!1), f = L(
    async (y) => {
      if (!(!h || g.current)) {
        g.current = !0, l(!0);
        try {
          await h(t, y) && (w(Yd(y)), s("none"));
        } catch {
        } finally {
          g.current = !1, l(!1);
        }
      }
    },
    [h, t]
  ), m = O(() => {
    if (e === "Resolved") {
      for (let y = o.length - 1; y >= 0; y -= 1)
        if (o[y].status === "Resolved")
          return xi(o[y].conflictResolutionAction);
      return "accept";
    }
  }, [e, o]) ?? d;
  return { conflictOptions: i, isResolving: c, resolve: f, resolvedResolution: m, showResolveCheck: i !== "loading" && i !== "none" };
}
function Xd(t) {
  const {
    comments: e,
    localizedStrings: r,
    isSelected: o = !1,
    threadId: n,
    threadStatus: i,
    conflictResolution: s
  } = t, c = O(() => e.filter((N) => !N.deleted), [e]), l = O(
    () => c.find((N) => N.conflictType) ?? c[0],
    [c]
  ), { conflictOptions: d, isResolving: w, resolve: p, resolvedResolution: h, showResolveCheck: g } = Wd({
    threadId: n,
    threadStatus: i,
    isSelected: o,
    activeComments: c,
    conflictResolution: s
  }), f = bi(l);
  let b;
  f && l && (b = o ? /* @__PURE__ */ a(
    qd,
    {
      comment: l,
      localizedStrings: r,
      availableActions: d,
      resolvedResolution: h,
      onResolve: p,
      isResolving: w
    }
  ) : /* @__PURE__ */ a(
    Gd,
    {
      comment: l,
      localizedStrings: r,
      resolvedResolution: h
    }
  ));
  let m;
  return f && (m = /* @__PURE__ */ a(
    yi,
    {
      show: g,
      disabled: w,
      onClick: () => p("accept"),
      ariaLabel: r["%comment_aria_resolve_thread%"] ?? "Resolve thread"
    }
  )), /* @__PURE__ */ a(
    ki,
    {
      ...t,
      activeComments: c,
      rootContentSlot: b,
      resolveActionSlot: m,
      spaceRootContentFromReplies: f && o
    }
  );
}
function vp({
  className: t = "",
  classNameForVerseText: e,
  threads: r,
  currentUser: o,
  localizedStrings: n,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: c,
  handleReadStatusChange: l,
  assignableUsers: d,
  canUserAddCommentToThread: w,
  canUserAssignThreadCallback: p,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: g,
  selectedThreadId: f,
  onSelectedThreadChange: b,
  onVerseRefClick: m,
  conflictResolution: N
}) {
  const [y, _] = k(/* @__PURE__ */ new Set()), [D, B] = k(), [z, j] = k(), P = L(
    async (S) => {
      const tt = await i(S);
      return tt !== void 0 && S.assignedUser !== void 0 && S.assignedUser !== "" && j(S.assignedUser), tt;
    },
    [i]
  );
  W(() => {
    f && (_((S) => new Set(S).add(f)), B(f));
  }, [f]);
  const E = r.filter(
    (S) => S.comments.some((tt) => !tt.deleted)
  ), V = E.map((S) => ({ id: S.id })), H = L(
    (S) => {
      _((tt) => new Set(tt).add(S.id)), B(S.id), b == null || b(S.id);
    },
    [b]
  ), C = L(
    (S) => {
      const tt = y.has(S);
      _((K) => {
        const kt = new Set(K);
        return kt.has(S) ? kt.delete(S) : kt.add(S), kt;
      }), B(S), b == null || b(tt ? void 0 : S);
    },
    [y, b]
  ), { listboxRef: X, activeId: F, handleKeyDown: $ } = Hi({
    options: V,
    onOptionSelect: H
  }), M = L(
    (S) => {
      S.key === "Escape" ? (D && y.has(D) && (_((tt) => {
        const K = new Set(tt);
        return K.delete(D), K;
      }), B(void 0), b == null || b(void 0)), S.preventDefault(), S.stopPropagation()) : $(S);
    },
    [D, y, $, b]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      id: Vd,
      role: "listbox",
      tabIndex: 0,
      ref: X,
      "aria-activedescendant": F ?? void 0,
      "aria-label": "Comments",
      className: v(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: M,
      children: E.map((S) => {
        const tt = {
          classNameForVerseText: e,
          comments: S.comments,
          localizedStrings: n,
          verseRef: S.verseRef,
          handleSelectThread: C,
          threadId: S.id,
          thread: S,
          isRead: S.isRead,
          isSelected: y.has(S.id),
          currentUser: o,
          assignedUser: S.assignedUser,
          threadStatus: S.status,
          handleAddCommentToThread: P,
          handleUpdateComment: s,
          handleDeleteComment: c,
          handleReadStatusChange: l,
          assignableUsers: d,
          canUserAddCommentToThread: w,
          canUserAssignThreadCallback: p,
          canUserResolveThreadCallback: h,
          canUserEditOrDeleteCommentCallback: g,
          onVerseRefClick: m,
          initialAssignedUser: z
        };
        return /* @__PURE__ */ a(
          "div",
          {
            className: v({
              "tw:opacity-60": S.status === "Resolved"
            }),
            children: S.type === "Conflict" ? /* @__PURE__ */ a(Xd, { ...tt, conflictResolution: N }) : /* @__PURE__ */ a(ki, { ...tt })
          },
          S.id
        );
      })
    }
  );
}
function Jd({ table: t }) {
  return /* @__PURE__ */ u(Ve, { children: [
    /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ u(G, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ a(vs, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ u(je, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ a(Er, { children: "Toggle columns" }),
      /* @__PURE__ */ a(Ye, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ a(
        De,
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
function sr({ ...t }) {
  return /* @__PURE__ */ a(qt.Root, { "data-slot": "select", ...t });
}
function Zd({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    qt.Group,
    {
      "data-slot": "select-group",
      className: v("tw:scroll-my-1 tw:p-1", t),
      ...e
    }
  );
}
function cr({ ...t }) {
  return /* @__PURE__ */ a(qt.Value, { "data-slot": "select-value", ...t });
}
function lr({ className: t, size: e = "default", children: r, ...o }) {
  const n = fe();
  return /* @__PURE__ */ u(
    qt.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: v(
        "pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      dir: n,
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(qt.Icon, { asChild: !0, children: /* @__PURE__ */ a(zn, { className: "tw:pointer-events-none tw:size-4 tw:text-muted-foreground" }) })
      ]
    }
  );
}
function dr({
  className: t,
  children: e,
  // CUSTOM: Restored 'popper' as the default position (was changed to 'item-aligned' by the shadcn
  // upgrade). In 'popper' mode Radix exposes --radix-select-trigger-width, which is required for
  // min-w-(--radix-select-trigger-width) to work. In 'item-aligned' mode that variable is not set,
  // making the popup width unconstrained. Existing callers all expected popper (dropdown) behavior.
  position: r = "popper",
  align: o = "center",
  // CUSTOM: Destructure style to merge with the shared z-index constant below
  style: n,
  ...i
}) {
  const s = fe();
  return /* @__PURE__ */ a(qt.Portal, { children: /* @__PURE__ */ u(
    qt.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": r === "item-aligned",
      className: v(
        "pr-twp tw:relative tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        r === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      style: { zIndex: Xe, ...n },
      position: r,
      align: o,
      ...i,
      children: [
        /* @__PURE__ */ a(Qd, {}),
        /* @__PURE__ */ a(
          qt.Viewport,
          {
            "data-position": r,
            className: v(
              "tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",
              r === "popper" && "tw:"
            ),
            children: /* @__PURE__ */ a("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ a(tw, {})
      ]
    }
  ) });
}
function bp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    qt.Label,
    {
      "data-slot": "select-label",
      className: v("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground", t),
      ...e
    }
  );
}
function se({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ u(
    qt.Item,
    {
      "data-slot": "select-item",
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center", children: /* @__PURE__ */ a(qt.ItemIndicator, { children: /* @__PURE__ */ a(ca, { className: "tw:pointer-events-none" }) }) }),
        /* @__PURE__ */ a(qt.ItemText, { children: e })
      ]
    }
  );
}
function xp({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qt.Separator,
    {
      "data-slot": "select-separator",
      className: v(
        "pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Qd({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qt.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Qs, {})
    }
  );
}
function tw({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    qt.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: v(
        "pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(Zs, {})
    }
  );
}
function ew({ table: t }) {
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
        sr,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ a(lr, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ a(cr, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ a(dr, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ a(se, { value: `${e}`, children: e }, e)) })
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
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ a(bs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ a(xs, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ a(ys, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ u(
        G,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ a(ks, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function rw({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: n = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: c,
  isLoading: l = !1,
  noResultsMessage: d
}) {
  var z;
  const [w, p] = k([]), [h, g] = k([]), [f, b] = k({}), [m, N] = k({}), y = O(() => e ?? [], [e]), _ = Un({
    data: y,
    columns: t,
    getCoreRowModel: qn(),
    ...r && { getPaginationRowModel: al() },
    onSortingChange: p,
    getSortedRowModel: Kn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: rl(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: N,
    state: {
      sorting: w,
      columnFilters: h,
      columnVisibility: f,
      rowSelection: m
    }
  }), D = _.getVisibleFlatColumns();
  let B;
  return l ? B = Array.from({ length: 10 }).map((E, V) => `skeleton-row-${V}`).map((E) => /* @__PURE__ */ a(Re, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ a(rr, { colSpan: D.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ a(er, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, E)) : ((z = _.getRowModel().rows) == null ? void 0 : z.length) > 0 ? B = _.getRowModel().rows.map((j) => /* @__PURE__ */ a(
    Re,
    {
      onClick: () => s(j, _),
      "data-state": j.getIsSelected() && "selected",
      children: j.getVisibleCells().map((P) => /* @__PURE__ */ a(rr, { children: xr(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    j.id
  )) : B = /* @__PURE__ */ a(Re, { children: /* @__PURE__ */ a(rr, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: d }) }), /* @__PURE__ */ u("div", { className: "pr-twp", id: c, children: [
    n && /* @__PURE__ */ a(Jd, { table: _ }),
    /* @__PURE__ */ u(to, { stickyHeader: i, children: [
      /* @__PURE__ */ a(eo, { stickyHeader: i, children: _.getHeaderGroups().map((j) => /* @__PURE__ */ a(Re, { children: j.headers.map((P) => /* @__PURE__ */ a(Xr, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : xr(P.column.columnDef.header, P.getContext()) }, P.id)) }, j.id)) }),
      /* @__PURE__ */ a(ro, { children: B })
    ] }),
    r && /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ a(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a(
        G,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && o && /* @__PURE__ */ a(ew, { table: _ })
  ] });
}
function yp({
  id: t,
  markdown: e,
  className: r,
  anchorTarget: o,
  truncate: n
}) {
  const i = O(
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
      className: v(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": n
        },
        r
      ),
      children: /* @__PURE__ */ a(il, { options: i, children: e })
    }
  );
}
const aw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), nn = (t, e) => t[e] ?? e;
function ow({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  id: o
}) {
  const n = nn(r, "%webView_error_dump_header%"), i = nn(r, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ a(G, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ a(_n, {}) })
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ a("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const kp = Object.freeze([
  ...aw,
  "%webView_error_dump_copied_message%"
]);
function _p({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: r,
  children: o,
  className: n,
  id: i
}) {
  const [s, c] = k(!1), l = () => {
    c(!0), e && e();
  };
  return /* @__PURE__ */ u($e, { onOpenChange: (w) => {
    w || c(!1);
  }, children: [
    /* @__PURE__ */ a(We, { asChild: !0, children: o }),
    /* @__PURE__ */ u(Ie, { id: i, className: v("tw:min-w-80 tw:max-w-96", n), children: [
      s && r["%webView_error_dump_copied_message%"] && /* @__PURE__ */ a(Ct, { children: r["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ a(
        ow,
        {
          errorDetails: t,
          handleCopyNotify: l,
          localizedStrings: r
        }
      )
    ] })
  ] });
}
var nw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(nw || {});
function Np({ id: t, label: e, groups: r }) {
  const [o, n] = k(
    Object.fromEntries(
      r.map(
        (d, w) => d.itemType === 0 ? [w, []] : void 0
      ).filter((d) => !!d)
    )
  ), [i, s] = k({}), c = (d, w) => {
    const p = !o[d][w];
    n((g) => (g[d][w] = p, { ...g }));
    const h = r[d].items[w];
    h.onUpdate(h.id, p);
  }, l = (d, w) => {
    s((h) => (h[d] = w, { ...h }));
    const p = r[d].items.find((h) => h.id === w);
    p ? p.onUpdate(w) : console.error(`Could not find dropdown radio item with id '${w}'!`);
  };
  return /* @__PURE__ */ a("div", { id: t, children: /* @__PURE__ */ u(Ve, { children: [
    /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ u(G, { variant: "default", children: [
      /* @__PURE__ */ a(_s, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ a(nr, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ a(je, { children: r.map((d, w) => /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a(Er, { children: d.label }),
      /* @__PURE__ */ a(mn, { children: d.itemType === 0 ? /* @__PURE__ */ a(ct, { children: d.items.map((p, h) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
        De,
        {
          checked: o[w][h],
          onCheckedChange: () => c(w, h),
          children: p.label
        }
      ) }, p.id)) }) : /* @__PURE__ */ a(
        Gi,
        {
          value: i[w],
          onValueChange: (p) => l(w, p),
          children: d.items.map((p) => /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(Yi, { value: p.id, children: p.label }) }, p.id))
        }
      ) }),
      /* @__PURE__ */ a(Ye, {})
    ] }, d.label)) })
  ] }) });
}
function Cp({
  id: t,
  category: e,
  downloads: r,
  languages: o,
  moreInfoUrl: n,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: c
}) {
  const l = new Tn("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((w, p) => w + p, 0)), d = () => {
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
            /* @__PURE__ */ a(Ns, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ a("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: l })
          ] }),
          /* @__PURE__ */ a("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:px-4", children: [
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
        (n || s) && /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:px-4", children: [
          n && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            G,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ a(Cs, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ a("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ u(
            G,
            {
              onClick: () => c(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ a(Es, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function iw({ id: t, versionHistory: e }) {
  const [r, o] = k(!1), n = /* @__PURE__ */ new Date();
  function i(c) {
    const l = new Date(c), d = new Date(n.getTime() - l.getTime()), w = d.getUTCFullYear() - 1970, p = d.getUTCMonth(), h = d.getUTCDate() - 1;
    let g = "";
    return w > 0 ? g = `${w.toString()} year${w === 1 ? "" : "s"} ago` : p > 0 ? g = `${p.toString()} month${p === 1 ? "" : "s"} ago` : h === 0 ? g = "today" : g = `${h.toString()} day${h === 1 ? "" : "s"} ago`, g;
  }
  const s = Object.entries(e).sort((c, l) => l[0].localeCompare(c[0]));
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
function Ep({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: o,
  versionHistory: n,
  currentVersion: i
}) {
  const s = O(() => Us(r), [r]), l = ((d) => {
    const w = new Intl.DisplayNames(Ks(), { type: "language" });
    return d.map((p) => w.of(p));
  })(o);
  return /* @__PURE__ */ a("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(n).length > 0 && /* @__PURE__ */ a(iw, { versionHistory: n }),
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
          /* @__PURE__ */ a("span", { className: "tw:font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Tp({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: n,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: c,
  icon: l,
  className: d,
  badgesPlaceholder: w,
  id: p
}) {
  return /* @__PURE__ */ u("div", { id: p, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ a(
      Wi,
      {
        entries: t,
        selected: e,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: n,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: c,
        icon: l,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var g;
      return /* @__PURE__ */ u(kr, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ a(
          G,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => r(e.filter((f) => f !== h)),
            children: /* @__PURE__ */ a(oo, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (g = t.find((f) => f.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ a(Ct, { children: w })
  ] });
}
const sw = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), sn = (t, e) => t[e] ?? e;
function cw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: n = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const l = Qa(), d = sn(n, "%undoButton_tooltip%"), w = sn(n, "%redoButton_tooltip%");
  return /* @__PURE__ */ u(Za, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ a(Ts, {})
        }
      ) }),
      /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ u("p", { children: [
        d,
        i && /* @__PURE__ */ u(ct, { children: [
          " ",
          /* @__PURE__ */ a(Aa, { children: l ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ a(fn, {}),
    e && /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
        G,
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
      /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ u("p", { children: [
        w,
        i && /* @__PURE__ */ u(ct, { children: [
          " ",
          /* @__PURE__ */ a(Aa, { children: l ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function lw({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const n = U(null);
  return W(() => {
    var l;
    const i = Qa(), s = ((l = n.current) == null ? void 0 : l.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var p, h, g, f;
      if (!s || document.activeElement !== s) return;
      const w = d.key.toLowerCase();
      if (i) {
        if (!d.metaKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((p = e.current) == null || p.undo())) : d.shiftKey && w === "z" && (d.preventDefault(), o && ((h = e.current) == null || h.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((g = e.current) == null || g.undo())) : (w === "y" || d.shiftKey && w === "z") && (d.preventDefault(), o && ((f = e.current) == null || f.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o, r, e]), /* @__PURE__ */ a("div", { ref: n, children: t });
}
const dw = (t, e, r) => t === "generated" ? /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function ww({
  callerType: t,
  updateCallerType: e,
  customCaller: r,
  updateCustomCaller: o,
  localizedStrings: n
}) {
  const i = U(null), s = U(null), c = U(!1), [l, d] = k(t), [w, p] = k(r), [h, g] = k(!1);
  W(() => {
    d(t);
  }, [t]), W(() => {
    w !== r && p(r);
  }, [r]);
  const f = (m) => {
    c.current = !1, g(m), m || (l !== "custom" || w ? (e(l), o(w)) : (d(t), p(r)));
  }, b = (m) => {
    var N, y, _, D;
    m.stopPropagation(), document.activeElement === s.current && m.key === "ArrowDown" || m.key === "ArrowRight" ? ((N = i.current) == null || N.focus(), c.current = !0) : document.activeElement === i.current && m.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), c.current = !1) : document.activeElement === i.current && m.key === "ArrowLeft" && ((_ = i.current) == null ? void 0 : _.selectionStart) === 0 && ((D = s.current) == null || D.focus(), c.current = !1), l === "custom" && m.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && f(!1);
  };
  return /* @__PURE__ */ u(Ve, { open: h, onOpenChange: f, children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "outline", className: "tw:h-6", children: dw(t, n, r) }) }) }),
      /* @__PURE__ */ a(Ot, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ u(
      je,
      {
        style: { zIndex: vn },
        onClick: () => {
          c.current && (c.current = !1);
        },
        onKeyDown: b,
        onMouseMove: () => {
          var m;
          c.current && ((m = i.current) == null || m.focus());
        },
        children: [
          /* @__PURE__ */ a(Er, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ a(Ye, {}),
          /* @__PURE__ */ a(
            De,
            {
              checked: l === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ua })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              checked: l === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ a("span", { className: "tw:w-10 tw:text-center", children: Ka })
              ] })
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              ref: s,
              checked: l === "custom",
              onCheckedChange: () => d("custom"),
              onClick: (m) => {
                var N;
                m.stopPropagation(), c.current = !0, (N = i.current) == null || N.focus();
              },
              onSelect: (m) => m.preventDefault(),
              children: /* @__PURE__ */ u("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ a("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ a(
                  na,
                  {
                    tabIndex: 0,
                    onMouseDown: (m) => {
                      m.stopPropagation(), d("custom"), c.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: w,
                    onKeyDown: (m) => {
                      m.key === "Enter" || m.key === "ArrowUp" || m.key === "ArrowDown" || m.key === "ArrowLeft" || m.key === "ArrowRight" || m.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (m) => p(m.target.value)
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
const uw = (t, e) => t === "f" ? /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a(Cn, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a(En, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ u(ct, { children: [
  /* @__PURE__ */ a(Nn, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), pw = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ge(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function hw({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ u(Ve, { children: [
    /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ a(G, { variant: "outline", className: "tw:h-6", children: uw(t, r) }) }) }),
      /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ a("p", { children: pw(t, r) }) })
    ] }) }),
    /* @__PURE__ */ u(je, { style: { zIndex: vn }, children: [
      /* @__PURE__ */ a(Er, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ a(Ye, {}),
      /* @__PURE__ */ u(
        De,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Nn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        De,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(Cn, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ u(
        De,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ a(En, {}),
            /* @__PURE__ */ a("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const gw = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These three keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function fw({ icon: t, className: e }) {
  return /* @__PURE__ */ a(t ?? zs, { className: e, size: 16 });
}
function mw({ state: t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ a(Oe, { size: 16 })
    }
  );
}
function cn({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ u(
    Ee,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ a(mw, { state: t.selectionState }),
        /* @__PURE__ */ a("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ a("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(fw, { icon: t.icon }) }) }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ a("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ a(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: t.subtitle,
              children: t.subtitle
            }
          )
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ a(Xi, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function vw({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [n, i] = k(""), [s, c] = O(() => {
    const l = n.trim().toLowerCase();
    if (!l) {
      const p = e.filter((h) => !h.isDisallowed);
      return [p.length > 0 ? p : e, []];
    }
    const d = e.filter((p) => {
      var g;
      const h = (g = p.marker) == null ? void 0 : g.toLowerCase();
      return p.isDisallowed ? h === l : h == null ? void 0 : h.includes(l);
    }), w = e.filter(
      (p) => p.title.toLowerCase().includes(l) && !d.includes(p)
    );
    return [d, w];
  }, [n, e]);
  return /* @__PURE__ */ u(Ae, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ a(
      aa,
      {
        className: "marker-menu-search",
        ref: r,
        value: n,
        onValueChange: (l) => i(l),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ u(Pe, { children: [
      /* @__PURE__ */ a(oa, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ a(Ne, { children: s.map((l) => {
        var d;
        return /* @__PURE__ */ a(
          cn,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((d = l.icon) == null ? void 0 : d.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      c.length > 0 && /* @__PURE__ */ u(ct, { children: [
        s.length > 0 && /* @__PURE__ */ a(bn, { alwaysRender: !0 }),
        /* @__PURE__ */ a(Ne, { children: c.map((l) => {
          var d;
          return /* @__PURE__ */ a(
            cn,
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
function bw(t, e, r, o) {
  if (!o || o === "p") return [];
  const n = Br[o];
  if (!(n != null && n.children)) return [];
  const i = [];
  return Object.entries(n.children).forEach(([, s]) => {
    i.push(
      ...s.map((c) => ({
        marker: c,
        title: r[Br[c].description] ?? Br[c].description,
        action: () => {
          var l;
          (l = t.current) == null || l.insertMarker(c), e();
        }
      }))
    );
  }), i.sort((s, c) => (s.marker ?? s.title).localeCompare(c.marker ?? c.title));
}
function xw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function yw(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const kw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Sp({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: n,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: c,
  localizedStrings: l,
  parentEditorRef: d
}) {
  const w = U(null), p = U(null), h = U(null), g = U(null);
  Xt(() => {
    if (!g.current) return;
    const { width: A } = g.current.getBoundingClientRect();
    A > 0 && (g.current.style.width = `${A}px`);
  }, []);
  const [f, b] = k("generated"), [m, N] = k("generated"), [y, _] = k("*"), [D, B] = k("*"), [z, j] = k("f"), [P, E] = k(!1), [V, H] = k(!0), [C, X] = k(!1), F = U(!1), $ = U(""), [M, S] = k(!1), [tt, K] = k(), [kt, lt] = k(), [$t, Y] = k(), [rt, ft] = k(), dt = U(null), pt = O(
    () => ({
      ...s,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: { ...s.view ?? sl(), noteMode: "expanded" }
    }),
    [s, c]
  ), Ht = O(
    () => bw(
      w,
      () => S(!1),
      l,
      rt
    ),
    [l, rt]
  );
  W(() => {
    var A;
    M || (A = w.current) == null || A.focus();
  }, [z, M]), W(() => {
    var at, it;
    let A;
    F.current = !1, H(!0);
    const Z = e == null ? void 0 : e.at(0);
    if (Z && Ir("note", Z)) {
      const ht = (at = Z.insert.note) == null ? void 0 : at.caller;
      let et = "custom";
      ht === Ua ? et = "generated" : ht === Ka ? et = "hidden" : ht && (_(ht), B(ht)), b(et), N(et), j(((it = Z.insert.note) == null ? void 0 : it.style) ?? "f"), A = setTimeout(() => {
        var gt;
        (gt = w.current) == null || gt.applyUpdate([Z]);
      }, 0);
    }
    return () => {
      A && clearTimeout(A);
    };
  }, [e, i]);
  const nt = L(
    (A, Z, at = !1) => {
      var ht, et, gt;
      const it = (et = (ht = w.current) == null ? void 0 : ht.getNoteOps(0)) == null ? void 0 : et.at(0);
      if (it && Ir("note", it)) {
        if (it.insert.note) {
          let st;
          A === "custom" ? st = Z : A === "generated" ? st = Ua : st = Ka, it.insert.note.caller = st;
        }
        r == null || r([it]), at && d && i && ((gt = d.current) == null || gt.replaceEmbedUpdate(i, [it]));
      }
    },
    [i, r, d]
  ), Zt = L(() => {
    nt(f, y, !0), o();
  }, [f, y, o, nt]), Gt = U(Zt);
  Xt(() => {
    Gt.current = Zt;
  });
  const Qt = U({ book: n.book, chapterNum: n.chapterNum });
  Xt(() => {
    (Qt.current.book !== n.book || Qt.current.chapterNum !== n.chapterNum) && (Qt.current = { book: n.book, chapterNum: n.chapterNum }, Gt.current());
  }, [n.book, n.chapterNum]);
  const xt = () => {
    var Z;
    const A = (Z = p.current) == null ? void 0 : Z.getElementsByClassName("editor-input")[0];
    A != null && A.textContent && navigator.clipboard.writeText(A.textContent);
  }, te = L(
    (A) => {
      b(A), nt(A, y);
    },
    [y, nt]
  ), It = L(
    (A) => {
      _(A), nt(f, A);
    },
    [f, nt]
  ), yt = (A) => {
    var at, it, ht, et, gt;
    j(A);
    const Z = (it = (at = w.current) == null ? void 0 : at.getNoteOps(0)) == null ? void 0 : it.at(0);
    if (Z && Ir("note", Z)) {
      Z.insert.note && (Z.insert.note.style = A);
      const st = (et = (ht = Z.insert.note) == null ? void 0 : ht.contents) == null ? void 0 : et.ops;
      z !== "x" && A === "x" ? st == null || st.forEach((mt) => xw(mt)) : z === "x" && A !== "x" && (st == null || st.forEach((mt) => yw(mt))), (gt = w.current) == null || gt.applyUpdate([Z, { delete: 1 }]);
    }
  }, At = (A) => {
    ft(A.contextMarker), X(A.canRedo);
  }, R = L(
    (A) => {
      var at, it, ht, et, gt;
      const Z = (it = (at = w.current) == null ? void 0 : at.getNoteOps(0)) == null ? void 0 : it.at(0);
      if (Z && Ir("note", Z)) {
        A.content.length > 1 && setTimeout(() => {
          var Vt;
          (Vt = w.current) == null || Vt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const st = (ht = Z.insert.note) == null ? void 0 : ht.style, mt = (gt = (et = Z.insert.note) == null ? void 0 : et.contents) == null ? void 0 : gt.ops;
        if (st || E(!1), E(
          st === "x" ? !!(mt != null && mt.every((Vt) => {
            var Lt, Tt;
            if (!((Lt = Vt.attributes) != null && Lt.char)) return !0;
            const Et = ((Tt = Vt.attributes) == null ? void 0 : Tt.char).style;
            return Et === "xt" || Et === "xo" || Et === "xq";
          })) : !!(mt != null && mt.every((Vt) => {
            var Lt, Tt;
            if (!((Lt = Vt.attributes) != null && Lt.char)) return !0;
            const Et = ((Tt = Vt.attributes) == null ? void 0 : Tt.char).style;
            return Et === "ft" || Et === "fr" || Et === "fq";
          }))
        ), !F.current) {
          F.current = !0, $.current = JSON.stringify(Z), H(!0);
          return;
        }
        H(JSON.stringify(Z) === $.current), nt(f, y);
      } else
        E(!1), H(!0);
    },
    [f, y, nt]
  ), be = L(() => {
    const A = window.getSelection();
    if (h.current && Ht.length && A && A.rangeCount > 0) {
      const Z = A.getRangeAt(0).getBoundingClientRect(), at = h.current.getBoundingClientRect();
      K(Z.left - at.left), lt(Z.top - at.top), Y(Z.height), S(!0);
    }
  }, [Ht, h]);
  W(() => {
    const A = () => {
      M && S(!1);
    };
    return window.addEventListener("click", A), () => {
      window.removeEventListener("click", A);
    };
  }, [M]), W(() => {
    var A;
    M && ((A = dt.current) == null || A.focus());
  }, [M]), W(() => {
    var at;
    const A = ((at = p.current) == null ? void 0 : at.querySelector(".editor-input")) ?? void 0, Z = (it) => {
      !M && A && document.activeElement === A && it.key === c ? (it.preventDefault(), be()) : M && it.key === "Escape" && (it.preventDefault(), S(!1));
    };
    return document.addEventListener("keydown", Z), () => {
      document.removeEventListener("keydown", Z);
    };
  }, [M, be, c]);
  const ee = l["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ u(ct, { children: [
    /* @__PURE__ */ u("div", { ref: g, className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ u("div", { className: "tw:flex", children: [
        /* @__PURE__ */ u("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ a(
            hw,
            {
              isTypeSwitchable: P,
              noteType: z,
              handleNoteTypeChange: yt,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            ww,
            {
              callerType: f,
              updateCallerType: te,
              customCaller: y,
              updateCustomCaller: It,
              localizedStrings: l
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "tw:flex tw:w-full tw:justify-end", children: /* @__PURE__ */ u(Za, { children: [
          /* @__PURE__ */ a(
            cw,
            {
              onUndoClick: () => {
                var A;
                return (A = w.current) == null ? void 0 : A.undo();
              },
              onRedoClick: () => {
                var A;
                return (A = w.current) == null ? void 0 : A.redo();
              },
              canUndo: !V,
              canRedo: C,
              localizedStrings: l
            }
          ),
          /* @__PURE__ */ a(
            mi,
            {
              onCancelClick: o,
              onAcceptClick: Zt,
              canAccept: !V || m !== f || f === "custom" && y !== D,
              localizedStrings: l,
              acceptLabel: l["%footnoteEditor_saveButton_tooltip%"]
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
              lw,
              {
                editorRef: w,
                canUndo: !V,
                canRedo: C,
                children: /* @__PURE__ */ a(
                  cl,
                  {
                    options: pt,
                    onStateChange: At,
                    onUsjChange: R,
                    defaultUsj: kw,
                    onScrRefChange: () => {
                    },
                    scrRef: n,
                    ref: w
                  }
                )
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
              /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
                G,
                {
                  "aria-label": ee,
                  onClick: xt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ a(_n, {})
                }
              ) }),
              /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ a("p", { children: ee }) })
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
    /* @__PURE__ */ u($e, { open: M, children: [
      /* @__PURE__ */ a(
        Ji,
        {
          className: "tw:absolute",
          style: {
            top: kt,
            left: tt,
            height: $t,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ a(
        Ie,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (A) => {
            A.preventDefault(), A.stopPropagation();
          },
          children: /* @__PURE__ */ a(
            vw,
            {
              markerMenuItems: Ht,
              localizedStrings: l,
              searchRef: dt
            }
          )
        }
      )
    ] })
  ] });
}
const zp = Object.freeze([
  ...gw,
  ...Object.entries(Br).map(([, t]) => t.description).filter((t) => !!t),
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
  ...sw,
  ...fi
]);
function _i(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const r = e.find((n) => typeof n == "string");
  if (r)
    return `key-${t ?? "unknown"}-${r.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function _w(t, e, r = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const n = [], i = [];
  let s = [];
  return e.forEach((c) => {
    typeof c != "string" && c.marker === "fp" ? (s.length > 0 && i.push(s), s = [c]) : s.push(c);
  }), s.length > 0 && i.push(s), i.map((c, l) => {
    const d = l === i.length - 1;
    return /* @__PURE__ */ u("p", { children: [
      yo(t, c, r, !0, n),
      d && o
    ] }, _i(t, c));
  });
}
function yo(t, e, r = !0, o = !0, n = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const c = v(`usfm_${t}`);
          return /* @__PURE__ */ a("span", { className: c, children: i }, s);
        }
        return /* @__PURE__ */ u(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ a(La, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(La, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          s
        );
      }
      return Nw(
        i,
        _i(`${t}\\${i.marker}`, [i]),
        r,
        [...n, t ?? "unknown"]
      );
    });
}
function Nw(t, e, r, o = []) {
  const { marker: n } = t;
  return /* @__PURE__ */ u("span", { children: [
    n ? r && /* @__PURE__ */ a("span", { className: "marker", children: `\\${n} ` }) : /* @__PURE__ */ a(
      La,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    yo(n, t.content, r, !0, [
      ...o,
      n ?? "unknown"
    ])
  ] }, e);
}
function Cw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: r,
  showMarkers: o = !0
}) {
  const n = r ? r(t.caller) : t.caller, i = n !== t.caller;
  let s, c = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...c] = t.content);
  const l = o ? /* @__PURE__ */ a("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, d = o ? /* @__PURE__ */ a("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, w = n && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ u("span", { className: v("note-caller tw:inline-block", { formatted: i }), children: [
    n,
    " "
  ] }), p = s && /* @__PURE__ */ u(ct, { children: [
    yo(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", g = o ? "marker-visible" : "", f = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", b = v(h, g);
  return /* @__PURE__ */ u(ct, { children: [
    /* @__PURE__ */ u("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", b), children: [
      l,
      w
    ] }),
    /* @__PURE__ */ a("div", { className: v("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", b), children: p }),
    /* @__PURE__ */ a(
      "div",
      {
        className: v(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          f,
          b
        ),
        children: c && c.length > 0 && /* @__PURE__ */ a(ct, { children: _w(t.marker, c, o, d) })
      }
    )
  ] });
}
function Rp({
  className: t,
  classNameForItems: e,
  footnotes: r,
  layout: o = "horizontal",
  listId: n,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: c = !1,
  formatCaller: l,
  onFootnoteSelected: d
}) {
  const w = l ?? qs(r, void 0), p = (y, _) => {
    d == null || d(y, _, n);
  }, h = i ? r.findIndex((y) => y === i) : -1, [g, f] = k(h), b = (y, _, D) => {
    if (r.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), d == null || d(_, D, n);
          break;
      }
  }, m = (y) => {
    if (r.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), f((_) => Math.min(_ + 1, r.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), f((_) => Math.max(_ - 1, 0));
          break;
      }
  }, N = U([]);
  return W(() => {
    var y;
    g >= 0 && g < N.current.length && ((y = N.current[g]) == null || y.focus());
  }, [g]), /* @__PURE__ */ a(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: g < 0 ? 0 : -1,
      className: v("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: m,
      children: /* @__PURE__ */ a(
        "ul",
        {
          className: v(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !c && "formatted-font"
          ),
          children: r.map((y, _) => {
            const D = y === i, B = `${n}-${_}`;
            return /* @__PURE__ */ u(ct, { children: [
              /* @__PURE__ */ a(
                "li",
                {
                  ref: (z) => {
                    N.current[_] = z;
                  },
                  role: "option",
                  "aria-selected": D,
                  "data-marker": y.marker,
                  "data-state": D ? "selected" : void 0,
                  tabIndex: _ === g ? 0 : -1,
                  className: v(
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
                  onClick: () => p(y, _),
                  onKeyDown: (z) => b(z, y, _),
                  children: /* @__PURE__ */ a(
                    Cw,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => w(y.caller, _),
                      showMarkers: s
                    }
                  )
                },
                B
              ),
              _ < r.length - 1 && o === "vertical" && /* @__PURE__ */ a(_r, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Ew(t) {
  const e = [];
  let r = 0;
  const o = /\\\\(.+?)\\\\/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    n.index > r && e.push(t.substring(r, n.index)), e.push(/* @__PURE__ */ a("strong", { children: n[1] }, n.index)), r = o.lastIndex;
  return r < t.length && e.push(t.substring(r)), e.length > 0 ? e : [t];
}
function Tw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r,
  classNameForText: o
}) {
  const n = r["%webView_inventory_occurrences_table_header_reference%"], i = r["%webView_inventory_occurrences_table_header_occurrence%"], s = O(() => {
    const c = [], l = /* @__PURE__ */ new Set();
    return t.forEach((d) => {
      const w = `${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;
      l.has(w) || (l.add(w), c.push(d));
    }), c;
  }, [t]);
  return /* @__PURE__ */ u(to, { stickyHeader: !0, children: [
    /* @__PURE__ */ a(eo, { stickyHeader: !0, children: /* @__PURE__ */ u(Re, { children: [
      /* @__PURE__ */ a(Xr, { children: n }),
      /* @__PURE__ */ a(Xr, { children: i })
    ] }) }),
    /* @__PURE__ */ a(ro, { children: s.length > 0 && s.map((c) => /* @__PURE__ */ u(
      Re,
      {
        onClick: () => {
          e(c.reference);
        },
        children: [
          /* @__PURE__ */ a(rr, { children: ke(c.reference, "English") }),
          /* @__PURE__ */ a(rr, { className: o, children: Ew(c.text) })
        ]
      },
      `${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`
    )) })
  ] });
}
function Ni({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Po.Root,
    {
      "data-slot": "checkbox",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:peer tw:relative tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:border-input tw:transition-colors tw:outline-none tw:group-has-disabled/field:opacity-50 tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ a(
        Po.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "tw:grid tw:place-content-center tw:text-current tw:transition-none tw:[&>svg]:size-3.5",
          children: /* @__PURE__ */ a(ca, {})
        }
      )
    }
  );
}
const Sw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ a(Ms, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ a($s, { className: "tw:h-4 tw:w-4" });
}, wa = (t, e, r) => /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
  /* @__PURE__ */ u(
    Dt,
    {
      className: v("tw:flex tw:w-full tw:justify-start", r),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ a("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        Sw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ a(Ot, { side: "bottom", children: e })
] }) }), Dp = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => wa(e, t)
}), zw = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => wa(r, t)
}), Op = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => wa(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), za = (t, e, r, o, n, i) => {
  let s = [...r];
  t.forEach((l) => {
    e === "approved" ? s.includes(l) || s.push(l) : s = s.filter((d) => d !== l);
  }), o(s);
  let c = [...n];
  t.forEach((l) => {
    e === "unapproved" ? c.includes(l) || c.push(l) : c = c.filter((d) => d !== l);
  }), i(c);
}, Mp = (t, e, r, o, n) => ({
  accessorKey: "status",
  header: ({ column: i }) => wa(i, t, "tw:justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), c = i.getValue("item");
    return (
      // Center the status buttons in the cell to match the centered status column header (the
      // ToggleGroup would otherwise sit left-aligned).
      /* @__PURE__ */ a("div", { className: "tw:flex tw:justify-center", children: /* @__PURE__ */ u(gn, { value: s, variant: "outline", type: "single", className: "tw:gap-0", children: [
        /* @__PURE__ */ a(
          jr,
          {
            onClick: (l) => {
              l.stopPropagation(), za(
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
            children: /* @__PURE__ */ a(Rs, {})
          }
        ),
        /* @__PURE__ */ a(
          jr,
          {
            onClick: (l) => {
              l.stopPropagation(), za(
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
            children: /* @__PURE__ */ a(Ds, {})
          }
        ),
        /* @__PURE__ */ a(
          jr,
          {
            onClick: (l) => {
              l.stopPropagation(), za(
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
            children: /* @__PURE__ */ a(Os, {})
          }
        )
      ] }) })
    );
  }
}), $p = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ip = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ap = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Rw = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Pp = Object.freeze([
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
]), Dw = (t, e, r) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (n) => e === "approved" && n.status === "approved" || e === "unapproved" && n.status === "unapproved" || e === "unknown" && n.status === "unknown"
  )), r !== "" && (o = o.filter((n) => n.items[0].includes(r))), o;
}, Ow = (t, e, r) => t.map((o) => {
  const n = zo(o.key) ? o.key : o.key[0];
  return {
    items: zo(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Rw(n, e, r),
    occurrences: o.occurrences || []
  };
}), ue = (t, e) => t[e] ?? e;
function Vp({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: o,
  approvedItems: n,
  unapprovedItems: i,
  scope: s,
  onScopeChange: c,
  columns: l,
  id: d,
  areInventoryItemsLoading: w = !1,
  classNameForVerseText: p,
  onItemSelected: h
}) {
  const g = ue(r, "%webView_inventory_all%"), f = ue(r, "%webView_inventory_approved%"), b = ue(r, "%webView_inventory_unapproved%"), m = ue(r, "%webView_inventory_unknown%"), N = ue(r, "%webView_inventory_scope_currentBook%"), y = ue(r, "%webView_inventory_scope_chapter%"), _ = ue(r, "%webView_inventory_scope_verse%"), D = ue(r, "%webView_inventory_filter_text%"), B = ue(
    r,
    "%webView_inventory_show_additional_items%"
  ), z = ue(r, "%webView_inventory_no_results%"), [j, P] = k(!1), [E, V] = k("all"), [H, C] = k(""), [X, F] = k([]), $ = O(() => {
    const Y = t ?? [];
    return Y.length === 0 ? [] : Ow(Y, n, i);
  }, [t, n, i]), M = O(() => {
    if (j) return $;
    const Y = [];
    return $.forEach((rt) => {
      const ft = rt.items[0], dt = Y.find(
        (pt) => pt.items[0] === ft
      );
      dt ? (dt.count += rt.count, dt.occurrences = dt.occurrences.concat(rt.occurrences)) : Y.push({
        items: [ft],
        count: rt.count,
        occurrences: rt.occurrences,
        status: rt.status
      });
    }), Y;
  }, [j, $]), S = O(() => M.length === 0 ? [] : Dw(M, E, H), [M, E, H]), tt = O(() => {
    var ft, dt;
    if (!j) return l;
    const Y = (ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft.length;
    if (!Y) return l;
    const rt = [];
    for (let pt = 0; pt < Y; pt++)
      rt.push(
        zw(
          ((dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt[pt]) || "Additional Item",
          pt + 1
        )
      );
    return [...rt, ...l];
  }, [o == null ? void 0 : o.tableHeaders, l, j]);
  W(() => {
    S.length === 0 ? F([]) : S.length === 1 && F(S[0].items);
  }, [S]);
  const K = (Y, rt) => {
    rt.setRowSelection(() => {
      const dt = {};
      return dt[Y.index] = !0, dt;
    });
    const ft = Y.original.items;
    F(ft), h && ft.length > 0 && h(ft[0]);
  }, kt = (Y) => {
    if (Y === "book" || Y === "chapter" || Y === "verse")
      c(Y);
    else
      throw new Error(`Invalid scope value: ${Y}`);
  }, lt = (Y) => {
    if (Y === "all" || Y === "approved" || Y === "unapproved" || Y === "unknown")
      V(Y);
    else
      throw new Error(`Invalid status filter value: ${Y}`);
  }, $t = O(() => {
    if (M.length === 0 || X.length === 0) return [];
    const Y = M.filter((rt) => Hs(
      j ? rt.items : [rt.items[0]],
      X
    ));
    if (Y.length > 1) throw new Error("Selected item is not unique");
    return Y.length === 0 ? [] : Y[0].occurrences;
  }, [X, j, M]);
  return /* @__PURE__ */ a("div", { id: d, className: "pr-twp tw:h-full tw:overflow-auto", children: /* @__PURE__ */ u("div", { className: "tw:flex tw:h-full tw:w-full tw:min-w-min tw:flex-col", children: [
    /* @__PURE__ */ u("div", { className: "tw:flex tw:items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ u(
        sr,
        {
          onValueChange: (Y) => lt(Y),
          defaultValue: E,
          children: [
            /* @__PURE__ */ a(lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(cr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ u(dr, { children: [
              /* @__PURE__ */ a(se, { value: "all", children: g }),
              /* @__PURE__ */ a(se, { value: "approved", children: f }),
              /* @__PURE__ */ a(se, { value: "unapproved", children: b }),
              /* @__PURE__ */ a(se, { value: "unknown", children: m })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u(sr, { onValueChange: (Y) => kt(Y), defaultValue: s, children: [
        /* @__PURE__ */ a(lr, { className: "tw:m-1 tw:w-auto tw:flex-1", children: /* @__PURE__ */ a(cr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ u(dr, { children: [
          /* @__PURE__ */ a(se, { value: "book", children: N }),
          /* @__PURE__ */ a(se, { value: "chapter", children: y }),
          /* @__PURE__ */ a(se, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ a(
        na,
        {
          className: "tw:m-1 tw:flex-1 tw:rounded-md tw:border",
          placeholder: D,
          value: H,
          onChange: (Y) => {
            C(Y.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
        /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ u("div", { className: "tw:m-1 tw:flex tw:w-fit tw:min-w-[26px] tw:items-center tw:rounded-md tw:border", children: [
          /* @__PURE__ */ a(
            Ni,
            {
              className: "tw:m-1 tw:shrink-0",
              checked: j,
              onCheckedChange: (Y) => {
                P(Y);
              }
            }
          ),
          /* @__PURE__ */ a(Ct, { className: "tw:m-1 tw:truncate", children: (o == null ? void 0 : o.checkboxText) ?? B })
        ] }) }),
        /* @__PURE__ */ a(Ot, { children: (o == null ? void 0 : o.checkboxText) ?? B })
      ] }) })
    ] }),
    /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      rw,
      {
        columns: tt,
        data: S,
        onRowClickHandler: K,
        stickyHeader: !0,
        isLoading: w,
        noResultsMessage: z
      }
    ) }),
    $t.length > 0 && /* @__PURE__ */ a("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ a(
      Tw,
      {
        classNameForText: p,
        occurrenceData: $t,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] }) });
}
const Mw = "16rem", $w = "3rem", Ci = Wt.createContext(void 0);
function ua() {
  const t = Wt.useContext(Ci);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function Iw({
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
  const [l, d] = Wt.useState(t), w = e ?? l, p = Wt.useCallback(
    (_) => {
      const D = typeof _ == "function" ? _(w) : _;
      r ? r(D) : d(D);
    },
    [r, w]
  ), h = Wt.useCallback(() => p((_) => !_), [p]), g = w ? "expanded" : "collapsed", m = fe() === "ltr" ? s : s === "primary" ? "secondary" : "primary", N = Wt.useMemo(
    () => ({
      state: g,
      open: w,
      setOpen: p,
      toggleSidebar: h,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: m
    }),
    [g, w, p, h, m]
  ), y = {
    "--sidebar-width": Mw,
    "--sidebar-width-icon": $w,
    ...n
  };
  return /* @__PURE__ */ a(Ci.Provider, { value: N, children: /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: y,
      className: v(
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
function Aw({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: r,
  children: o,
  ...n
}) {
  const i = ua();
  return e === "none" ? /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar",
      className: v(
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
            className: v(
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
            className: v(
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
function Lp({ className: t, onClick: e, ...r }) {
  const { toggleSidebar: o, side: n } = ua();
  return /* @__PURE__ */ u(
    G,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: v(t),
      onClick: (i) => {
        e == null || e(i), o();
      },
      ...r,
      children: [
        n === "primary" ? /* @__PURE__ */ a(tc, {}) : /* @__PURE__ */ a(ec, {}),
        /* @__PURE__ */ a("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function jp({ className: t, ...e }) {
  const { toggleSidebar: r } = ua();
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
      className: v(
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
function Pw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: v(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        "tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        t
      ),
      ...e
    }
  );
}
function Bp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    na,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: v("tw:h-8 tw:w-full tw:bg-background tw:shadow-none", t),
      ...e
    }
  );
}
function Fp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: v("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Up({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: v("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...e
    }
  );
}
function Kp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    _r,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: v("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...e
    }
  );
}
function Vw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: v(
        "tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function ln({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: v("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...e
    }
  );
}
function dn({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? zr.Root : "div";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: v(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function qp({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? zr.Root : "button";
  return /* @__PURE__ */ a(
    o,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: v(
        "tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        t
      ),
      ...r
    }
  );
}
function wn({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: v("tw:w-full tw:text-sm", t),
      ...e
    }
  );
}
function Lw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: v("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0", t),
      ...e
    }
  );
}
function jw({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: v("tw:group/menu-item tw:relative", t),
      ...e
    }
  );
}
const Bw = la(
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
function Fw({
  asChild: t = !1,
  isActive: e = !1,
  variant: r = "default",
  size: o = "default",
  tooltip: n,
  className: i,
  ...s
}) {
  const c = t ? zr.Root : "button", { state: l } = ua(), d = /* @__PURE__ */ a(
    c,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: v(Bw({ variant: r, size: o }), i),
      ...s
    }
  );
  return n ? /* @__PURE__ */ u(Rt, { children: [
    /* @__PURE__ */ a(Dt, { asChild: !0, children: d }),
    /* @__PURE__ */ a(
      Ot,
      {
        side: "right",
        align: "center",
        hidden: l !== "collapsed",
        ...typeof n == "string" ? { children: n } : n
      }
    )
  ] }) : d;
}
function Hp({
  className: t,
  asChild: e = !1,
  showOnHover: r = !1,
  ...o
}) {
  const n = e ? zr.Root : "button";
  return /* @__PURE__ */ a(
    n,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: v(
        "tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        r && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Gp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: v(
        "tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Yp({
  className: t,
  showIcon: e = !1,
  ...r
}) {
  const [o] = Wt.useState(() => `${Math.floor(Math.random() * 40) + 50}%`), n = { "--skeleton-width": o };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: v("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ a(er, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ a(
          er,
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
function Wp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: v(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...e
    }
  );
}
function Xp({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: v("tw:group/menu-sub-item tw:relative", t),
      ...e
    }
  );
}
function Jp({
  asChild: t = !1,
  size: e = "md",
  isActive: r = !1,
  className: o,
  ...n
}) {
  const i = t ? zr.Root : "a";
  return /* @__PURE__ */ a(
    i,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: v(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        o
      ),
      ...n
    }
  );
}
function Uw({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: n,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: c,
  className: l
}) {
  const d = L(
    (g, f) => {
      o(g, f);
    },
    [o]
  ), w = L(
    (g) => {
      const f = r.find((b) => b.projectId === g);
      return f ? f.projectName : g;
    },
    [r]
  ), p = O(
    () => r.map((g) => ({
      id: g.projectId,
      shortName: g.projectName,
      fullName: g.projectName
    })),
    [r]
  ), h = L(
    (g) => !n.projectId && g === n.label,
    [n]
  );
  return /* @__PURE__ */ a(
    Aw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: v("tw:w-96 tw:gap-2 tw:overflow-y-auto", l),
      children: /* @__PURE__ */ u(Vw, { children: [
        /* @__PURE__ */ u(ln, { children: [
          /* @__PURE__ */ a(dn, { className: "tw:text-sm", children: i }),
          /* @__PURE__ */ a(wn, { children: /* @__PURE__ */ a(Lw, { children: Object.entries(e).map(([g, f]) => /* @__PURE__ */ a(jw, { children: /* @__PURE__ */ a(
            Fw,
            {
              onClick: () => d(g),
              isActive: h(g),
              children: /* @__PURE__ */ a("span", { className: "tw:pl-3", children: f })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ u(ln, { children: [
          /* @__PURE__ */ a(dn, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ a(wn, { className: "tw:pl-3", children: /* @__PURE__ */ u(
            "div",
            {
              className: v(
                "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",
                {
                  "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": n == null ? void 0 : n.projectId
                }
              ),
              children: [
                /* @__PURE__ */ a(Is, { className: "tw:h-4 tw:w-4 tw:shrink-0" }),
                /* @__PURE__ */ a(
                  Zi,
                  {
                    mode: "project",
                    projects: p,
                    openTabs: [],
                    selection: { projectId: (n == null ? void 0 : n.projectId) ?? "" },
                    onChangeSelection: ({ projectId: g }) => {
                      if (!g) return;
                      const f = w(g);
                      d(f, g);
                    },
                    buttonVariant: "ghost",
                    buttonClassName: "tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",
                    buttonPlaceholder: c,
                    ariaLabel: s,
                    popoverContentStyle: { zIndex: Qi }
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
function Zp({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: o,
  handleSelectSidebarItem: n,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: c,
  extensionsSidebarGroupLabel: l,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: w
}) {
  return /* @__PURE__ */ u("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ a("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ a(
      xn,
      {
        className: "tw:w-9/12",
        value: s,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ u(
      Iw,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ a(
            Uw,
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
          /* @__PURE__ */ a(Pw, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ze = "scrBook", Kw = "scrRef", qe = "source", qw = "details", Hw = "Scripture Reference", Gw = "Scripture Book", Ei = "Type", Yw = "Details";
function Ww(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ze,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Hw,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? bt.bookIdToEnglishName(n.start.book) : o.row.groupingColumnId === ze ? ke(n.start) : void 0;
      },
      getGroupingValue: (o) => bt.bookIdToNumber(o.start.book),
      sortingFn: (o, n) => ja(o.original.start, n.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ke(o.start),
      id: Kw,
      header: void 0,
      cell: (o) => {
        const n = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ke(n.start);
      },
      sortingFn: (o, n) => ja(o.original.start, n.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: qe,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ei : void 0,
      cell: (o) => r || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, n) => o.original.source.displayName.localeCompare(n.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: qw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Yw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Xw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || ja(t.start, t.end) === 0 ? `${ma(t.start)}+${e}` : `${ma(t.start)}+${e}-${ma(t.end)}+${r}`;
}, un = (t) => `${Xw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Qp({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: n,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: c,
  id: l
}) {
  const [d, w] = k([]), [p, h] = k([{ id: ze, desc: !1 }]), [g, f] = k({}), b = O(
    () => t.flatMap((E) => E.data.map((V) => ({
      ...V,
      source: E.source
    }))),
    [t]
  ), m = O(
    () => Ww(
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
    d.includes(qe) ? h([
      { id: qe, desc: !1 },
      { id: ze, desc: !1 }
    ]) : h([{ id: ze, desc: !1 }]);
  }, [d]);
  const N = Un({
    data: b,
    columns: m,
    state: {
      grouping: d,
      sorting: p,
      rowSelection: g
    },
    onGroupingChange: w,
    onSortingChange: h,
    onRowSelectionChange: f,
    getExpandedRowModel: nl(),
    getGroupedRowModel: ol(),
    getCoreRowModel: qn(),
    getSortedRowModel: Kn(),
    getRowId: un,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  W(() => {
    if (c) {
      const E = N.getSelectedRowModel().rowsById, V = Object.keys(E);
      if (V.length === 1) {
        const H = b.find((C) => un(C) === V[0]) || void 0;
        H && c(H);
      }
    }
  }, [g, b, c, N]);
  const y = n ?? Gw, _ = i ?? Ei, D = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ze] },
    { label: `Group by ${_}`, value: [qe] },
    {
      label: `Group by ${y} and ${_}`,
      value: [ze, qe]
    },
    {
      label: `Group by ${_} and ${y}`,
      value: [qe, ze]
    }
  ], B = (E) => {
    w(JSON.parse(E));
  }, z = (E, V) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(V);
  }, j = (E, V) => E.getIsGrouped() ? "" : v("banded-row", V % 2 === 0 ? "even" : "odd"), P = (E, V, H) => {
    if (!((E == null ? void 0 : E.length) === 0 || V.depth < H.column.getGroupedIndex())) {
      if (V.getIsGrouped())
        switch (V.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (V.depth) {
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
      sr,
      {
        value: JSON.stringify(d),
        onValueChange: (E) => {
          B(E);
        },
        children: [
          /* @__PURE__ */ a(lr, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ a(cr, {}) }),
          /* @__PURE__ */ a(dr, { position: "item-aligned", children: /* @__PURE__ */ a(Zd, { children: D.map((E) => /* @__PURE__ */ a(se, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ u(to, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ a(eo, { children: N.getHeaderGroups().map((E) => /* @__PURE__ */ a(Re, { children: E.headers.filter((V) => V.column.columnDef.header).map((V) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ a(Xr, { colSpan: V.colSpan, className: "tw:sticky top-0", children: V.isPlaceholder ? void 0 : /* @__PURE__ */ u("div", { children: [
          V.column.getCanGroup() ? /* @__PURE__ */ a(
            G,
            {
              variant: "ghost",
              title: `Toggle grouping by ${V.column.columnDef.header}`,
              onClick: V.column.getToggleGroupingHandler(),
              type: "button",
              children: V.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          xr(V.column.columnDef.header, V.getContext())
        ] }) }, V.id)
      )) }, E.id)) }),
      /* @__PURE__ */ a(ro, { children: N.getRowModel().rows.map((E, V) => {
        const H = fe();
        return /* @__PURE__ */ a(
          Re,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: v(j(E, V)),
            onClick: (C) => z(E, C),
            children: E.getVisibleCells().map((C) => {
              if (!(C.getIsPlaceholder() || C.column.columnDef.enableGrouping && !C.getIsGrouped() && (C.column.columnDef.id !== qe || !r)))
                return /* @__PURE__ */ a(
                  rr,
                  {
                    className: v(
                      C.column.columnDef.id,
                      "tw:p-[1px]",
                      P(d, E, C)
                    ),
                    children: C.getIsGrouped() ? /* @__PURE__ */ u(
                      G,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ a(nr, {}),
                          !E.getIsExpanded() && (H === "ltr" ? /* @__PURE__ */ a(Va, {}) : /* @__PURE__ */ a(Pa, {})),
                          " ",
                          xr(C.column.columnDef.cell, C.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : xr(C.column.columnDef.cell, C.getContext())
                  },
                  C.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
function Ti(t) {
  if (t.length !== bt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  return bt.allBookIds.filter(
    (e, r) => t[r] === "1" && !bt.isObsolete(bt.bookIdToNumber(e))
  );
}
function ko(t, e) {
  return t.filter((r) => {
    try {
      return br(r) === e;
    } catch {
      return !1;
    }
  });
}
const Si = (t, e, r) => ko(t, e).every((o) => r.includes(o));
function Jw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], c = o["%webView_book_selector_search_books%"], l = o["%webView_book_selector_select_all%"], d = o["%webView_book_selector_clear_all%"], w = o["%webView_book_selector_no_book_found%"], { otLong: p, ntLong: h, dcLong: g, extraLong: f } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, m] = k(!1), [N, y] = k(""), _ = U(void 0), D = U(!1), B = O(
    () => Ti(t),
    [t]
  ), z = O(() => {
    if (!N.trim()) {
      const F = {
        [ut.OT]: [],
        [ut.NT]: [],
        [ut.DC]: [],
        [ut.Extra]: []
      };
      return B.forEach(($) => {
        const M = br($);
        F[M].push($);
      }), F;
    }
    const C = B.filter(
      (F) => Xa(F, N, n)
    ), X = {
      [ut.OT]: [],
      [ut.NT]: [],
      [ut.DC]: [],
      [ut.Extra]: []
    };
    return C.forEach((F) => {
      const $ = br(F);
      X[$].push(F);
    }), X;
  }, [B, N, n]), j = L(
    (C, X = !1) => {
      if (!X || !_.current) {
        r(
          e.includes(C) ? e.filter((K) => K !== C) : [...e, C]
        ), _.current = C;
        return;
      }
      const F = B.findIndex((K) => K === _.current), $ = B.findIndex((K) => K === C);
      if (F === -1 || $ === -1) return;
      const [M, S] = [
        Math.min(F, $),
        Math.max(F, $)
      ], tt = B.slice(M, S + 1).map((K) => K);
      r(
        e.includes(C) ? e.filter((K) => !tt.includes(K)) : [.../* @__PURE__ */ new Set([...e, ...tt])]
      );
    },
    [e, r, B]
  ), P = (C) => {
    j(C, D.current), D.current = !1;
  }, E = (C, X) => {
    C.preventDefault(), j(X, C.shiftKey);
  }, V = () => {
    r(B.map((C) => C));
  }, H = () => {
    r([]);
  };
  return /* @__PURE__ */ u(
    $e,
    {
      open: b,
      onOpenChange: (C) => {
        m(C), C || y("");
      },
      children: [
        /* @__PURE__ */ a(We, { asChild: !0, children: /* @__PURE__ */ u(
          G,
          {
            variant: "outline",
            role: "combobox",
            "aria-expanded": b,
            className: "tw:max-w-64 tw:justify-between",
            children: [
              e.length > 0 ? `${i}: ${e.length}` : s,
              /* @__PURE__ */ a(As, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(Ie, { className: "tw:w-[500px] tw:max-w-[calc(100vw-2rem)] tw:p-0", align: "start", children: /* @__PURE__ */ u(
          Ae,
          {
            shouldFilter: !1,
            onKeyDown: (C) => {
              C.key === "Enter" && (D.current = C.shiftKey);
            },
            children: [
              /* @__PURE__ */ a(
                aa,
                {
                  placeholder: c,
                  value: N,
                  onValueChange: y
                }
              ),
              /* @__PURE__ */ u("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: V, children: l }),
                /* @__PURE__ */ a(G, { variant: "ghost", size: "sm", onClick: H, children: d })
              ] }),
              /* @__PURE__ */ u(Pe, { children: [
                /* @__PURE__ */ a(oa, { children: w }),
                Object.values(ut).map((C, X) => {
                  const F = z[C];
                  if (F.length !== 0)
                    return /* @__PURE__ */ u(sa, { children: [
                      /* @__PURE__ */ a(
                        Ne,
                        {
                          heading: hn(C, p, h, g, f),
                          children: F.map(($) => /* @__PURE__ */ a(
                            Hn,
                            {
                              bookId: $,
                              isSelected: e.includes($),
                              onSelect: () => P($),
                              onMouseDown: (M) => E(M, $),
                              section: br($),
                              showCheck: !0,
                              localizedBookNames: n,
                              commandValue: Gn($, n),
                              className: "tw:flex tw:items-center"
                            },
                            $
                          ))
                        }
                      ),
                      X < Object.values(ut).length - 1 && /* @__PURE__ */ a(bn, {})
                    ] }, C);
                })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function Zw({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: o,
  localizedStrings: n
}) {
  const i = ko(e, t).length === 0, s = n["%scripture_section_ot_short%"], c = n["%scripture_section_nt_short%"], l = n["%scripture_section_dc_short%"], d = n["%scripture_section_extra_short%"];
  return /* @__PURE__ */ a(
    G,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: v(
        Si(e, t, r) && !i && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: i,
      children: ts(
        t,
        s,
        c,
        l,
        d
      )
    }
  );
}
const pn = 5, Ra = 6;
function Qw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: o,
  localizedBookNames: n
}) {
  const i = o["%webView_book_selector_more%"], s = O(
    () => Ti(t),
    [t]
  ), c = L(
    (l) => {
      const d = ko(s, l).map((w) => w);
      r(
        Si(s, l, e) ? e.filter((w) => !d.includes(w)) : [.../* @__PURE__ */ new Set([...e, ...d])]
      );
    },
    [e, r, s]
  );
  return /* @__PURE__ */ u("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ a("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(ut).map((l) => /* @__PURE__ */ a(
      Zw,
      {
        section: l,
        availableBookIds: s,
        selectedBookIds: e,
        onToggle: c,
        localizedStrings: o
      },
      l
    )) }),
    /* @__PURE__ */ a(
      Jw,
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
        e.length === Ra ? Ra : pn
      ).map((l) => /* @__PURE__ */ a(kr, { className: "tw:hover:bg-secondary", variant: "secondary", children: ye(l, n) }, l)),
      e.length > Ra && /* @__PURE__ */ a(
        kr,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - pn} ${i}`
        }
      )
    ] })
  ] });
}
const tu = Object.freeze([
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
]), th = Object.freeze([
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
  ...tu
]), St = (t, e) => t[e] ?? e, eu = Object.freeze([" ", "-"]);
function eh({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: o,
  selectedBookIds: n,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: c,
  id: l,
  variant: d = "radio",
  rangeStart: w,
  rangeEnd: p,
  onRangeStartChange: h,
  onRangeEndChange: g,
  currentScrRef: f,
  onCurrentScrRefChange: b,
  bookChapterControlLocalizedStrings: m,
  getEndVerse: N,
  hideLabel: y = !1,
  buttonClassName: _
}) {
  const D = St(
    s,
    "%webView_scope_selector_selected_text%"
  ), B = St(s, "%webView_scope_selector_verse%"), z = St(s, "%webView_scope_selector_chapter%"), j = St(s, "%webView_scope_selector_book%"), P = St(
    s,
    "%webView_scope_selector_current_verse%"
  ), E = St(
    s,
    "%webView_scope_selector_current_chapter%"
  ), V = St(s, "%webView_scope_selector_current_book%"), H = St(s, "%webView_scope_selector_choose_books%"), C = St(s, "%webView_scope_selector_scope%"), X = St(s, "%webView_scope_selector_select_books%"), F = St(s, "%webView_scope_selector_range%"), $ = St(s, "%webView_scope_selector_select_range%"), M = St(s, "%webView_scope_selector_range_start%"), S = St(s, "%webView_scope_selector_range_end%"), tt = St(s, "%webView_scope_selector_ok%"), K = St(s, "%webView_scope_selector_cancel%"), kt = St(s, "%webView_scope_selector_navigate%"), lt = (I) => {
    if (!f) return;
    const J = f.book.toUpperCase();
    switch (I) {
      case "verse":
        return ke(f, "id");
      case "chapter":
        return `${J} ${f.chapterNum}`;
      case "book":
        return J;
      default:
        return;
    }
  }, $t = [
    { value: "selectedText", label: D, id: "scope-selected-text" },
    {
      value: "verse",
      label: B,
      dropdownLabel: P,
      scrRefSuffix: lt("verse"),
      id: "scope-verse"
    },
    {
      value: "chapter",
      label: z,
      dropdownLabel: E,
      scrRefSuffix: lt("chapter"),
      id: "scope-chapter"
    },
    {
      value: "book",
      label: j,
      dropdownLabel: V,
      scrRefSuffix: lt("book"),
      id: "scope-book"
    },
    { value: "selectedBooks", label: H, id: "scope-selected" },
    { value: "range", label: F, id: "scope-range" }
  ], Y = (I, J, Yt = !1) => /* @__PURE__ */ u(ct, { children: [
    I,
    J && !Yt && /* @__PURE__ */ u("span", { className: "tw:text-muted-foreground", children: [
      ": ",
      J
    ] })
  ] }), rt = e ? $t.filter((I) => e.includes(I.value)) : $t, ft = f ?? va, dt = w ?? ft, pt = p ?? ft, Ht = () => {
  }, nt = U(null), Zt = U(null), Gt = U(!1), Qt = U(null), xt = U(!1), [te, It] = k(void 0), yt = U(!1), At = U(!1), R = U(null), be = L((I) => {
    if (I) {
      It("start"), yt.current = !1;
      return;
    }
    It((J) => J === "start" ? void 0 : J), yt.current && (yt.current = !1, requestAnimationFrame(() => {
      var Yt;
      const J = (Yt = nt.current) == null ? void 0 : Yt.querySelector("button");
      J == null || J.click();
    }));
  }, []), ee = L((I) => {
    if (I) {
      It("end"), At.current = !1;
      return;
    }
    It((J) => J === "end" ? void 0 : J);
  }, []), A = L(
    (I) => {
      h == null || h(I), g == null || g(I), yt.current = !0;
    },
    [h, g]
  ), Z = L(
    (I) => {
      g == null || g(I), At.current = !0;
    },
    [g]
  ), at = L(
    (I) => {
      r(I), I === "selectedBooks" && n.length === 0 && (f != null && f.book) && i([f.book]);
    },
    [r, n, f, i]
  ), it = rt.find((I) => I.value === t), ht = () => t === "selectedBooks" && n.length > 0 ? n.map((I) => I.toUpperCase()).join(", ") : t === "range" ? Gs(dt, pt, {
    optionOrLocalizedBookName: "id",
    endRefOptionOrLocalizedBookName: "id",
    repeatBookName: !0
  }) : it ? Y(it.label, it.scrRefSuffix) : t, et = rt.filter(
    (I) => I.value !== "selectedBooks" && I.value !== "range"
  ), gt = rt.find((I) => I.value === "selectedBooks"), st = rt.find((I) => I.value === "range"), [mt, Vt] = k(!1), [Et, Lt] = k(void 0), [Tt, Te] = k(void 0), [T, jt] = k(void 0), [_t, de] = k(void 0), [Fe, ur] = k([]), pr = d === "dropdown" && Et === "selectedBooks", hr = /* @__PURE__ */ a(
    Qw,
    {
      availableBookInfo: o,
      selectedBookIds: pr ? Fe : n,
      onChangeSelectedBookIds: pr ? ur : i,
      localizedStrings: s,
      localizedBookNames: c
    }
  ), gr = te === "end", Rr = te === "start", Ue = "tw:text-muted-foreground", Se = d === "dropdown" && Et === "range", Dr = Se ? jt : A, ha = Se ? de : g ? Z : Ht, Or = /* @__PURE__ */ u("div", { className: "tw:flex tw:flex-wrap tw:items-end tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ct, { htmlFor: "scope-range-start", className: v(gr && Ue), children: M }),
      /* @__PURE__ */ a(
        xa,
        {
          id: "scope-range-start",
          scrRef: Se ? T ?? dt : dt,
          handleSubmit: Dr,
          localizedBookNames: c,
          localizedStrings: m,
          getEndVerse: N,
          submitKeys: eu,
          onOpenChange: be,
          className: v(gr && Ue),
          modal: !0
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { ref: nt, className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ct, { htmlFor: "scope-range-end", className: v(Rr && Ue), children: S }),
      /* @__PURE__ */ a(
        xa,
        {
          id: "scope-range-end",
          scrRef: Se ? _t ?? pt : pt,
          handleSubmit: ha,
          localizedBookNames: c,
          localizedStrings: m,
          getEndVerse: N,
          disableReferencesUpTo: Se ? T ?? dt : dt,
          onOpenChange: ee,
          onCloseAutoFocus: (I) => {
            var J;
            At.current && (At.current = !1, I.preventDefault(), (J = R.current) == null || J.focus());
          },
          className: v(Rr && Ue),
          modal: !0,
          align: "start"
        }
      )
    ] })
  ] }), Mr = U({}), x = L(
    (I) => (J) => {
      Mr.current[I] = J;
    },
    []
  ), q = U(null);
  W(() => {
    if (!mt) return;
    let I = 0;
    const J = requestAnimationFrame(() => {
      I = requestAnimationFrame(() => {
        var Yt;
        (Yt = Mr.current[t]) == null || Yt.focus();
      });
    });
    return () => {
      cancelAnimationFrame(J), I && cancelAnimationFrame(I);
    };
  }, [mt, t]);
  const [Q, Bt] = k(null), [ne, Ze] = k(null), [xe, Ft] = k(null), Nt = 200, [Pt, vt] = k(!1);
  W(() => {
    if (!xe || typeof ResizeObserver > "u") return;
    const I = new ResizeObserver(([J]) => {
      vt(J.contentRect.width < Nt);
    });
    return I.observe(xe), () => I.disconnect();
  }, [xe]);
  const re = L(
    (I) => {
      Te(I), jt(dt), de(pt), ur(n), Vt(!1), Lt(I);
    },
    [dt, pt, n]
  ), ie = L(() => {
    Tt !== void 0 && (Tt === "range" ? (T && (h == null || h(T)), _t && (g == null || g(_t))) : Tt === "selectedBooks" && i(Fe), at(Tt), Lt(void 0), Te(void 0));
  }, [
    Tt,
    T,
    _t,
    Fe,
    h,
    g,
    i,
    at
  ]), we = L((I) => {
    I || (Lt(void 0), Te(void 0));
  }, []), _o = L((I) => {
    var J;
    I.preventDefault(), (J = q.current) == null || J.focus();
  }, []), No = (I) => t === I ? /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) }) : void 0;
  return /* @__PURE__ */ u("div", { id: l, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      !y && /* @__PURE__ */ a(Ct, { children: C }),
      d === "dropdown" ? /* @__PURE__ */ u(Ve, { open: mt, onOpenChange: Vt, children: [
        /* @__PURE__ */ a(Le, { asChild: !0, children: /* @__PURE__ */ u(
          G,
          {
            ref: q,
            variant: "outline",
            role: "combobox",
            className: v(
              "tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal",
              _
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ht() }),
              /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ a(
          je,
          {
            ref: Ft,
            className: "tw:w-[var(--radix-dropdown-menu-trigger-width)] tw:min-w-[12rem]",
            align: "start",
            children: /* @__PURE__ */ u(ga, { container: xe, children: [
              et.map(({ value: I, label: J, dropdownLabel: Yt, scrRefSuffix: fr, id: Pi }) => /* @__PURE__ */ u(
                He,
                {
                  ref: x(I),
                  className: "tw:relative tw:ps-8 data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground",
                  onSelect: () => at(I),
                  "data-selected": t === I ? "true" : void 0,
                  children: [
                    t === I && /* @__PURE__ */ a("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) }),
                    Y(Yt ?? J, fr, Pt)
                  ]
                },
                Pi
              )),
              (gt || st) && /* @__PURE__ */ a(Ye, {}),
              gt && /* @__PURE__ */ u(
                He,
                {
                  ref: x("selectedBooks"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => re("selectedBooks"),
                  "data-selected": t === "selectedBooks" ? "true" : void 0,
                  children: [
                    No("selectedBooks"),
                    `${gt.label}…`
                  ]
                }
              ),
              st && /* @__PURE__ */ u(
                He,
                {
                  ref: x("range"),
                  className: v(
                    "tw:relative tw:ps-8",
                    "data-[highlighted]:tw:bg-accent data-[highlighted]:tw:text-accent-foreground"
                  ),
                  onSelect: () => re("range"),
                  "data-selected": t === "range" ? "true" : void 0,
                  children: [
                    No("range"),
                    `${st.label}…`
                  ]
                }
              ),
              b && /* @__PURE__ */ u(ct, { children: [
                /* @__PURE__ */ a(Ye, {}),
                /* @__PURE__ */ a(Er, { className: "tw:px-2 tw:py-1.5 tw:text-xs tw:font-medium tw:text-muted-foreground", children: kt }),
                /* @__PURE__ */ a(
                  He,
                  {
                    ref: Qt,
                    className: "tw:p-0",
                    onSelect: (I) => {
                      var J, Yt;
                      if (I.preventDefault(), Gt.current) {
                        Gt.current = !1;
                        return;
                      }
                      xt.current || (Yt = (J = Zt.current) == null ? void 0 : J.querySelector("button")) == null || Yt.click();
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        ref: Zt,
                        className: "tw:w-full tw:px-1 tw:pb-1",
                        onPointerDownCapture: (I) => {
                          const J = I.target instanceof HTMLElement ? I.target : void 0;
                          J != null && J.closest("button") && (Gt.current = !0, requestAnimationFrame(() => {
                            Gt.current = !1;
                          }));
                        },
                        children: /* @__PURE__ */ a(
                          xa,
                          {
                            id: "scope-navigate",
                            scrRef: f ?? va,
                            handleSubmit: b,
                            localizedBookNames: c,
                            localizedStrings: m,
                            getEndVerse: N,
                            triggerVariant: "ghost",
                            onOpenChange: (I) => {
                              xt.current = I;
                            },
                            onCloseAutoFocus: (I) => {
                              var J;
                              I.preventDefault(), (J = Qt.current) == null || J.focus();
                            },
                            modal: !0,
                            className: "tw:w-full tw:min-w-0 tw:max-w-none tw:justify-between tw:px-2 tw:font-normal",
                            triggerContent: /* @__PURE__ */ u(ct, { children: [
                              /* @__PURE__ */ a("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: ke(f ?? va, "id") }),
                              /* @__PURE__ */ a(nr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
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
        Ja,
        {
          value: t,
          onValueChange: at,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: rt.map(({ value: I, label: J, scrRefSuffix: Yt, id: fr }) => /* @__PURE__ */ u("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ a(Wr, { className: "tw:me-2", value: I, id: fr }),
            /* @__PURE__ */ a(Ct, { htmlFor: fr, children: Y(J, Yt) })
          ] }, fr))
        }
      )
    ] }),
    d === "radio" && t === "selectedBooks" && /* @__PURE__ */ u("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ a(Ct, { children: X }),
      hr
    ] }),
    d === "radio" && t === "range" && Or,
    d === "dropdown" && gt && /* @__PURE__ */ a(Oa, { open: Et === "selectedBooks", onOpenChange: we, children: /* @__PURE__ */ a(
      Ma,
      {
        ref: Ze,
        onCloseAutoFocus: _o,
        onEscapeKeyDown: (I) => {
          ne != null && ne.querySelector('[data-state="open"]') && I.preventDefault();
        },
        children: /* @__PURE__ */ u(ga, { container: ne, children: [
          /* @__PURE__ */ a($a, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ia, { children: H }) }),
          hr,
          /* @__PURE__ */ u(Co, { children: [
            /* @__PURE__ */ a(G, { variant: "outline", onClick: () => we(!1), children: K }),
            /* @__PURE__ */ a(G, { onClick: ie, children: tt })
          ] })
        ] })
      }
    ) }),
    d === "dropdown" && st && /* @__PURE__ */ a(Oa, { open: Et === "range", onOpenChange: we, children: /* @__PURE__ */ a(
      Ma,
      {
        ref: Bt,
        onCloseAutoFocus: _o,
        onEscapeKeyDown: (I) => {
          Q != null && Q.querySelector('[data-state="open"]') && I.preventDefault();
        },
        children: /* @__PURE__ */ u(ga, { container: Q, children: [
          /* @__PURE__ */ a($a, { className: "tw:pe-8", children: /* @__PURE__ */ a(Ia, { children: $ }) }),
          Or,
          /* @__PURE__ */ u(Co, { children: [
            /* @__PURE__ */ a(G, { variant: "outline", onClick: () => we(!1), children: K }),
            /* @__PURE__ */ a(G, { ref: R, onClick: ie, children: tt })
          ] })
        ] })
      }
    ) })
  ] });
}
function rh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: o = {},
  size: n = "sm",
  className: i,
  id: s,
  disabled: c
}) {
  const l = {
    ...fa,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in fa ? fa[w] : p
        ]
      )
    )
  }, d = fe();
  return /* @__PURE__ */ u(
    sr,
    {
      value: `${e}`,
      onValueChange: (w) => r(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      disabled: c,
      children: [
        /* @__PURE__ */ a(lr, { size: n, className: v("pr-twp tw:w-auto", i), children: /* @__PURE__ */ a(
          cr,
          {
            placeholder: l[Ro(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ a(
          dr,
          {
            id: s,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: Xe },
            children: t.map((w) => /* @__PURE__ */ a(se, { value: `${w}`, children: l[Ro(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function ah({ children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-twp tw:grid", children: t });
}
function oh({
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
function nh({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ u("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ a("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ a("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ a(_r, {}) : ""
  ] });
}
function zi(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : r[0];
}
function ra({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ a(
    "img",
    {
      className: v("tw:max-h-5 tw:max-w-5", r ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ri = (t, e, r, o) => r ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === r || i === r
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((c) => c.group === i).sort((c, l) => c.order - l.order).map((c) => /* @__PURE__ */ u(Rt, { children: [
  /* @__PURE__ */ a(Dt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ u(
    He,
    {
      onClick: () => {
        o(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ a(ra, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ a(ra, { icon: c.iconPathAfter, menuLabel: c.label })
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`
  ) : /* @__PURE__ */ u(es, { children: [
    /* @__PURE__ */ a(rs, { children: c.label }),
    /* @__PURE__ */ a(as, { children: /* @__PURE__ */ a(os, { children: Ri(
      t,
      e,
      zi(t, c.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`) }),
  c.tooltip && /* @__PURE__ */ a(Ot, { children: c.tooltip })
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`))) : void 0;
function Wa({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: o,
  className: n,
  variant: i,
  buttonVariant: s = "ghost",
  id: c
}) {
  return /* @__PURE__ */ u(Ve, { variant: i, children: [
    /* @__PURE__ */ a(Le, { "aria-label": r, className: n, asChild: !0, id: c, children: /* @__PURE__ */ a(G, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ a(Ps, {}) }) }),
    /* @__PURE__ */ a(je, { align: "start", style: { zIndex: Xe }, children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, d]) => typeof l == "boolean" || typeof d == "boolean" ? 0 : l.order - d.order).map(([l], d, w) => /* @__PURE__ */ u(sa, { children: [
      /* @__PURE__ */ a(mn, { children: /* @__PURE__ */ a(zt, { children: Ri(e.groups, e.items, l, t) }) }),
      d < w.length - 1 && /* @__PURE__ */ a(Ye, {})
    ] }, l)) })
  ] });
}
const ru = 8;
function au(t, e, r) {
  const o = e.findIndex((s) => t >= s), n = o === -1 ? e.length : o;
  if (n >= r) return n;
  const i = e.findIndex(
    (s) => t >= s + ru
  );
  return i === -1 ? r : Math.min(r, Math.max(i, n));
}
function Di(t, e) {
  const [r, o] = k(0);
  return Xt(() => {
    if (!t || typeof ResizeObserver > "u") return;
    const n = () => {
      const { width: s } = t.getBoundingClientRect();
      o((c) => au(s, e, c));
    };
    n();
    const i = new ResizeObserver(n);
    return i.observe(t), () => i.disconnect();
  }, [t, e]), r;
}
const ou = Object.freeze([520, 420, 340]), Oi = Wt.forwardRef(
  ({ id: t, className: e, children: r, shrinkStep: o }, n) => {
    const [i, s] = k(void 0), c = L(
      (w) => {
        s(w ?? void 0), typeof n == "function" ? n(w) : n && (n.current = w);
      },
      [n]
    ), l = Di(i, ou), d = o ?? l;
    return /* @__PURE__ */ a(uo.Provider, { value: d, children: /* @__PURE__ */ a(
      "div",
      {
        ref: c,
        className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
        id: t,
        children: r
      }
    ) });
  }
);
function ih({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: o,
  id: n,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: c,
  endAreaChildren: l,
  menuButtonIcon: d,
  shrinkStep: w
}) {
  return /* @__PURE__ */ u(
    Oi,
    {
      className: `tw:w-full tw:border-b ${i}`,
      id: n,
      shrinkStep: w,
      children: [
        r && /* @__PURE__ */ a(
          Wa,
          {
            onSelectMenuItem: t,
            menuData: r,
            tabLabel: "Project",
            icon: d ?? /* @__PURE__ */ a(Vs, {}),
            buttonVariant: "ghost"
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: s }),
        c && /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: c }),
        /* @__PURE__ */ u("div", { className: "tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
          o && /* @__PURE__ */ a(
            Wa,
            {
              onSelectMenuItem: e,
              menuData: o,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ a(Ls, {}),
              className: "tw:h-full"
            }
          ),
          l
        ] })
      ]
    }
  );
}
function sh({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: r,
  className: o,
  menuButtonIcon: n
}) {
  return /* @__PURE__ */ a(Oi, { className: "tw:pointer-events-none", id: r, children: e && /* @__PURE__ */ a(
    Wa,
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
const Mi = Wt.forwardRef(({ className: t, ...e }, r) => {
  const o = fe();
  return /* @__PURE__ */ a(
    le.Root,
    {
      orientation: "vertical",
      ref: r,
      className: v("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Mi.displayName = le.List.displayName;
const $i = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.List,
  {
    ref: r,
    className: v(
      "tw:flex tw:items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
$i.displayName = le.List.displayName;
const nu = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Trigger,
  {
    ref: r,
    ...e,
    className: v(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm tw:overflow-clip",
      t
    )
  }
)), Ii = Wt.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  le.Content,
  {
    ref: r,
    className: v(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Ii.displayName = le.Content.displayName;
function ch({
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
        xn,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ u(Mi, { children: [
      /* @__PURE__ */ a($i, { children: t.map((c) => /* @__PURE__ */ a(nu, { value: c.value, children: c.value }, c.key)) }),
      t.map((c) => /* @__PURE__ */ a(Ii, { value: c.value, children: c.content }, c.key))
    ] })
  ] });
}
function iu({
  className: t,
  // CUSTOM: Added variant prop to allow callers to apply visual style variants to all menu items
  variant: e = "default",
  ...r
}) {
  const o = Wt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ a(ns.Provider, { value: o, children: /* @__PURE__ */ a(
    me.Root,
    {
      "data-slot": "menubar",
      className: v(
        "tw:flex tw:h-8 tw:items-center tw:gap-0.5 tw:rounded-lg tw:border tw:p-[3px]",
        t
      ),
      ...r
    }
  ) });
}
function su({ ...t }) {
  return /* @__PURE__ */ a(me.Menu, { "data-slot": "menubar-menu", ...t });
}
function cu({ ...t }) {
  return /* @__PURE__ */ a(me.Portal, { "data-slot": "menubar-portal", ...t });
}
function lu({
  className: t,
  ...e
}) {
  const r = Tr();
  return /* @__PURE__ */ a(
    me.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: v(
        "tw:flex tw:items-center tw:rounded-sm tw:px-1.5 tw:py-[2px] tw:text-sm tw:font-medium tw:outline-hidden tw:select-none tw:hover:bg-muted tw:aria-expanded:bg-muted",
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation (portal-rendered content needs this)
        "pr-twp",
        // CUSTOM: Apply variant-driven styles from menu context
        ao({ variant: r.variant, className: t })
      ),
      ...e
    }
  );
}
function du({
  className: t,
  align: e = "start",
  alignOffset: r = -4,
  sideOffset: o = 8,
  ...n
}) {
  const i = Tr();
  return /* @__PURE__ */ a(cu, { children: /* @__PURE__ */ a(
    me.Content,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: r,
      sideOffset: o,
      className: v(
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
function wu({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const n = Tr();
  return /* @__PURE__ */ a(
    me.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        "tw:group/menubar-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive!",
        // CUSTOM: Apply variant-driven styles from menu context
        ao({ variant: n.variant, className: t })
      ),
      ...o
    }
  );
}
function uu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    me.Separator,
    {
      "data-slot": "menubar-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function pu({ ...t }) {
  return /* @__PURE__ */ a(me.Sub, { "data-slot": "menubar-sub", ...t });
}
function hu({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const n = Tr();
  return /* @__PURE__ */ u(
    me.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-none tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg:not([class*=size-])]:size-4",
        // CUSTOM: Apply variant-driven styles from menu context
        ao({ variant: n.variant, className: t })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Rn, { className: "tw:ms-auto tw:size-4" })
      ]
    }
  );
}
function gu({
  className: t,
  ...e
}) {
  const r = Tr();
  return /* @__PURE__ */ a(
    me.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: v(
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
const vr = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Ai = (t, e, r, o) => {
  if (!r) return;
  const n = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === r || i === r
  ).sort(([, i], [, s]) => i.order - s.order);
  return n.flatMap(([i], s) => {
    const c = e.filter((d) => d.group === i).sort((d, w) => d.order - w.order).map((d) => /* @__PURE__ */ u(Rt, { children: [
      /* @__PURE__ */ a(Dt, { asChild: !0, children: "command" in d ? /* @__PURE__ */ u(
        wu,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ a(ra, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ a(ra, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ u(pu, { children: [
        /* @__PURE__ */ a(hu, { children: d.label }),
        /* @__PURE__ */ a(gu, { children: Ai(
          t,
          e,
          zi(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ a(Ot, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), l = [...c];
    return c.length > 0 && s < n.length - 1 && l.push(/* @__PURE__ */ a(uu, {}, `separator-${i}`)), l;
  });
};
function fu({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: o
}) {
  const n = U(void 0), i = U(void 0), s = U(void 0), c = U(void 0), l = U(void 0), d = (w) => {
    switch (w) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return c;
      case "platform.help":
        return l;
      default:
        return;
    }
  };
  if (ll(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (w, p) => {
    var f, b, m, N;
    w.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (p.hotkey) {
      case "alt":
        vr(i, [h]);
        break;
      case "alt+p":
        (f = i.current) == null || f.focus(), vr(i, [h, g]);
        break;
      case "alt+l":
        (b = s.current) == null || b.focus(), vr(s, [h, g]);
        break;
      case "alt+n":
        (m = c.current) == null || m.focus(), vr(c, [h, g]);
        break;
      case "alt+h":
        (N = l.current) == null || N.focus(), vr(l, [h, g]);
        break;
    }
  }), W(() => {
    if (!r || !n.current) return;
    const w = new MutationObserver((g) => {
      g.forEach((f) => {
        if (f.attributeName === "data-state" && f.target instanceof HTMLElement) {
          const b = f.target.getAttribute("data-state");
          r(b === "open");
        }
      });
    });
    return n.current.querySelectorAll("[data-state]").forEach((g) => {
      w.observe(g, { attributes: !0 });
    }), () => w.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ a(iu, { ref: n, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w, p]) => /* @__PURE__ */ u(su, { children: [
      /* @__PURE__ */ a(lu, { ref: d(w), children: typeof p == "object" && "label" in p && p.label }),
      /* @__PURE__ */ a(
        du,
        {
          style: { zIndex: Xe },
          children: /* @__PURE__ */ a(zt, { children: Ai(t.groups, t.items, w, e) })
        }
      )
    ] }, w)) });
}
const mu = Object.freeze([950, 800, 700]);
function lh(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function dh({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: o,
  id: n,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: c,
  shouldUseAsAppDragArea: l,
  menubarVariant: d = "default",
  shrinkStep: w
}) {
  const [p, h] = k(void 0), g = L(
    (m) => h(m ?? void 0),
    []
  ), f = Di(p, mu), b = w ?? f;
  return /* @__PURE__ */ a(uo.Provider, { value: b, children: /* @__PURE__ */ a(
    "div",
    {
      className: v("tw:border tw:px-4 tw:text-foreground", o),
      style: { position: "relative" },
      id: n,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          ref: g,
          style: l ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ a("div", { className: "tw:flex tw:shrink-0 tw:grow tw:basis-0", children: /* @__PURE__ */ u(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ a(
                    fu,
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
                className: "tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:px-2",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ a("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ a(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
                style: l ? { WebkitAppRegion: "no-drag" } : void 0,
                children: c
              }
            ) })
          ]
        }
      )
    }
  ) });
}
const vu = (t, e) => t[e] ?? e;
function wh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: n,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: c,
  id: l
}) {
  const d = vu(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [w, p] = k(!1), h = (f) => {
    n && n(f), o && o([f, ...r.filter((b) => b !== f)]), i && r.find((b) => b === f) && i([...r.filter((b) => b !== f)]), p(!1);
  }, g = (f, b) => {
    var N, y, _, D, B, z;
    const m = b !== f ? ((y = (N = t[f]) == null ? void 0 : N.uiNames) == null ? void 0 : y[b]) ?? ((D = (_ = t[f]) == null ? void 0 : _.uiNames) == null ? void 0 : D.en) : void 0;
    return m ? `${(B = t[f]) == null ? void 0 : B.autonym} (${m})` : (z = t[f]) == null ? void 0 : z.autonym;
  };
  return /* @__PURE__ */ u("div", { id: l, className: v("pr-twp tw:max-w-sm", c), children: [
    /* @__PURE__ */ u(
      sr,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: w,
        onOpenChange: (f) => p(f),
        children: [
          /* @__PURE__ */ a(lr, { children: /* @__PURE__ */ a(cr, {}) }),
          /* @__PURE__ */ a(
            dr,
            {
              style: { zIndex: Xe },
              children: Object.keys(t).map((f) => /* @__PURE__ */ a(se, { value: f, children: g(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ a("div", { className: "tw:pt-3", children: /* @__PURE__ */ a(Ct, { className: "tw:font-normal tw:text-muted-foreground", children: Ge(d, {
      fallbackLanguages: (r == null ? void 0 : r.length) > 0 ? r.map((f) => g(f, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
const uh = Object.freeze([
  "%firstRun_language_search_placeholder%",
  "%firstRun_language_noResults%",
  "%firstRun_language_selected%"
]);
function bu(t) {
  return [...t].sort(([e, r], [o, n]) => e === "en" && o !== "en" ? -1 : o === "en" && e !== "en" ? 1 : r.autonym.localeCompare(n.autonym));
}
function ph({
  languages: t,
  value: e,
  onChange: r,
  localizedStrings: o,
  className: n,
  id: i
}) {
  const [s, c] = k(""), l = O(
    () => bu(Object.entries(t)).map(([f, b]) => ({
      tag: f,
      info: b,
      keywords: [b.autonym, ...Object.values(b.uiNames ?? {}), ...b.otherNames ?? []]
    })),
    [t]
  ), d = O(() => {
    if (!s) return l;
    const f = s.toLowerCase();
    return l.filter(({ keywords: b }) => b.some((m) => m.toLowerCase().includes(f)));
  }, [l, s]), w = l.length > 1, p = o["%firstRun_language_search_placeholder%"] ?? "", h = o["%firstRun_language_noResults%"] ?? "", g = o["%firstRun_language_selected%"] ?? "";
  return /* @__PURE__ */ u(Ae, { id: i, className: v("pr-twp", n), shouldFilter: !1, children: [
    w && // Plain <input> (not CommandPrimitive.Input) so cmdk cannot update this field after
    // item selection. Arrow-key and Enter events from here bubble to the Command root div
    // where cmdk's keydown handler picks them up for list navigation.
    /* @__PURE__ */ a("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", children: /* @__PURE__ */ u(is, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ a(
        "input",
        {
          "data-slot": "command-input",
          type: "text",
          placeholder: p,
          "aria-label": p,
          value: s,
          onChange: (f) => c(f.currentTarget.value),
          className: "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ a(ss, { children: /* @__PURE__ */ a(rc, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) }),
    /* @__PURE__ */ u(Pe, { children: [
      /* @__PURE__ */ a(oa, { children: h }),
      d.map(({ tag: f, info: b }) => {
        const m = f === e;
        return /* @__PURE__ */ u(
          Ee,
          {
            value: f,
            "aria-current": m ? "true" : void 0,
            "data-checked": m ? "true" : void 0,
            onSelect: () => r(f),
            children: [
              /* @__PURE__ */ a("span", { dir: "auto", children: b.autonym }),
              m && /* @__PURE__ */ a("span", { className: "tw:sr-only", children: g })
            ]
          },
          f
        );
      })
    ] })
  ] });
}
function xu({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ a(Ct, { children: e(t) }) : r ? /* @__PURE__ */ a(Ct, { children: r(t) }) : /* @__PURE__ */ a(Ct, { children: t });
}
function yu({
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
      Ni,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(c),
        onCheckedChange: (l) => n(c, l)
      }
    ),
    /* @__PURE__ */ a(
      xu,
      {
        item: c,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, c)) });
}
const hh = yu;
function ku(t, e) {
  const [r, o] = k(t), [n, i] = k(e);
  return t !== r && (o(t), t && i(e)), t ? e : n;
}
function gh({
  open: t,
  anchorRect: e,
  message: r,
  confirmingKeyLabel: o,
  side: n = "bottom",
  align: i = "start",
  showArrow: s = !0
}) {
  const c = t ? Do(r, { key: o }).join("") : "", {
    anchorRect: l,
    message: d,
    confirmingKeyLabel: w,
    showArrow: p
  } = ku(t, { anchorRect: e, message: r, confirmingKeyLabel: o, showArrow: s });
  return /* @__PURE__ */ u(zt, { children: [
    /* @__PURE__ */ a("span", { role: "status", className: "tw:sr-only", children: c }),
    /* @__PURE__ */ u(Rt, { open: t, onOpenChange: () => {
    }, children: [
      /* @__PURE__ */ a(
        Dt,
        {
          "aria-hidden": "true",
          tabIndex: -1,
          className: v(
            "tw:absolute tw:opacity-0 tw:pointer-events-none",
            "tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0"
          ),
          style: {
            top: l.top,
            left: l.left,
            width: l.width,
            height: l.height
          }
        }
      ),
      /* @__PURE__ */ a(
        Ot,
        {
          side: n,
          align: i,
          showArrow: p,
          arrowPadding: 8,
          className: v(
            // Rely on TooltipContent's default tw:max-w-xs (320px) and normal wrapping: this hint's
            // text is short and usually fits on one line, but locale length varies (e.g. Spanish runs
            // longer than English), so allow it to wrap rather than force tw:whitespace-nowrap, which
            // could clip or overflow on a narrow webview.
            "tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"
          ),
          arrowClassName: "tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",
          children: /* @__PURE__ */ a("div", { className: "tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5", children: Do(d, {
            key: /* @__PURE__ */ a(
              Aa,
              {
                className: v(
                  // Kbd's base styling sets text-muted-foreground (unconditioned) plus
                  // in-data-[slot=tooltip-content]:text-background (for the default dark
                  // tooltip). Override both forms explicitly so tailwind-merge drops both base
                  // rules instead of leaving the winner up to CSS cascade order.
                  "tw:border tw:border-destructive tw:in-data-[slot=tooltip-content]:text-destructive",
                  // Kbd is an inline-flex box, which defaults to vertical-align: baseline in
                  // normal inline flow — that sits its bottom edge on the surrounding text's
                  // baseline rather than centering it against the line. Align to the line's
                  // midline instead.
                  "tw:align-middle"
                ),
                children: w
              }
            )
          }).map((h, g) => (
            // The array is static per render (one fixed localized string + one kbd), so index is
            // a stable, safe key — same rationale as source-language-indexed-list.component.tsx's
            // disable.
            // eslint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ a(sa, { children: h }, `key-${g}`)
          )) })
        }
      )
    ] })
  ] });
}
function _u({
  children: t,
  isDisabled: e,
  disabledExplanation: r,
  ...o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      ...o,
      role: e ? "group" : void 0,
      tabIndex: e ? 0 : void 0,
      "aria-label": e ? r : void 0,
      children: t
    }
  );
}
function fh({
  disabled: t,
  tooltipText: e,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ u(Rt, { children: [
    /* @__PURE__ */ a(Dt, { asChild: !0, children: /* @__PURE__ */ a(
      _u,
      {
        className: o,
        isDisabled: t,
        disabledExplanation: e,
        children: r
      }
    ) }),
    t && /* @__PURE__ */ a(Ot, { children: /* @__PURE__ */ a("p", { className: "tw:max-w-xs tw:whitespace-pre-line", children: e }) })
  ] }) });
}
function mh({
  cardKey: t,
  isSelected: e,
  onSelect: r,
  isDenied: o,
  isHidden: n = !1,
  className: i,
  children: s,
  selectedButtons: c,
  hoverButtons: l,
  dropdownContent: d,
  additionalContent: w,
  accentColor: p,
  showDropdownOnHover: h = !1
}) {
  const g = (m) => {
    if (m.key === "Enter" || m.key === " ") {
      if (m.target !== m.currentTarget) return;
      m.preventDefault(), r();
    }
  }, [f, b] = k(!1);
  return /* @__PURE__ */ u(
    "div",
    {
      hidden: n,
      onClick: r,
      onKeyDown: g,
      onMouseEnter: () => b(!0),
      onFocus: () => b(!0),
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: v(
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
            !e && l && /* @__PURE__ */ a("div", { className: "tw:invisible tw:group-hover:visible", children: l }),
            d && (e || h && f) && /* @__PURE__ */ a(
              "div",
              {
                className: v(
                  !e && h && "tw:invisible tw:group-hover:visible"
                ),
                children: /* @__PURE__ */ u(Ve, { children: [
                  /* @__PURE__ */ a(Le, { className: v(p && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ a(
                    G,
                    {
                      className: "tw:m-1 tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      onClick: (m) => m.stopPropagation(),
                      onFocus: (m) => m.stopPropagation(),
                      children: /* @__PURE__ */ a(js, {})
                    }
                  ) }),
                  /* @__PURE__ */ a(je, { align: "end", children: d })
                ] })
              }
            )
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
function vh({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ a(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: v("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function bh({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: n,
  label: i,
  placeholder: s,
  isRequired: c = !1,
  className: l,
  defaultValue: d,
  value: w,
  onChange: p,
  onFocus: h,
  onBlur: g
}) {
  return /* @__PURE__ */ u("div", { className: v("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ a(
      Ct,
      {
        htmlFor: t,
        className: v({
          "tw:text-red-600": r,
          "tw:hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ a(
      na,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: c,
        className: v(l, { "tw:border-red-600": r }),
        defaultValue: d,
        value: w,
        onChange: p,
        onFocus: h,
        onBlur: g
      }
    ),
    /* @__PURE__ */ a("p", { className: v({ "tw:hidden": !n }), children: n })
  ] });
}
function xh({ currentStep: t, totalSteps: e, locale: r }) {
  const o = r || "en", n = O(() => {
    const c = new Tn(o);
    return (l) => c.format(l);
  }, [o]), i = Math.min(Math.max(t, 1), e), s = Array.from({ length: e }, (c, l) => l + 1);
  return /* @__PURE__ */ a("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: s.map((c) => {
    let l = "upcoming";
    return c === i ? l = "active" : c < i && (l = "complete"), /* @__PURE__ */ u(sa, { children: [
      c > 1 && /* @__PURE__ */ a("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ a(
        "div",
        {
          "data-state": l,
          className: v(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            l === "active" && "tw:bg-primary tw:text-primary-foreground",
            l === "complete" && "tw:bg-muted tw:text-muted-foreground",
            l === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: l === "complete" ? /* @__PURE__ */ a(Oe, { className: "tw:h-4 tw:w-4" }) : n(c)
        }
      )
    ] }, c);
  }) });
}
const Nu = la(
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
function yh({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Nu({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-title",
      className: v(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function _h({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-description",
      className: v(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function Nh({ ...t }) {
  return /* @__PURE__ */ a(Mt.Root, { "data-slot": "context-menu", ...t });
}
function Ch({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Mt.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: v("tw:select-none", t),
      ...e
    }
  );
}
function Eh({ ...t }) {
  return /* @__PURE__ */ a(Mt.Group, { "data-slot": "context-menu-group", ...t });
}
function Th({ ...t }) {
  return /* @__PURE__ */ a(Mt.Portal, { "data-slot": "context-menu-portal", ...t });
}
function Sh({ ...t }) {
  return /* @__PURE__ */ a(Mt.Sub, { "data-slot": "context-menu-sub", ...t });
}
function zh({
  ...t
}) {
  return /* @__PURE__ */ a(Mt.RadioGroup, { "data-slot": "context-menu-radio-group", ...t });
}
function Rh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(Mt.Portal, { children: /* @__PURE__ */ a(
    Mt.Content,
    {
      "data-slot": "context-menu-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop)
        "pr-twp tw:max-h-(--radix-context-menu-content-available-height) tw:min-w-36 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Xe, ...e },
      ...r
    }
  ) });
}
function Dh({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  return /* @__PURE__ */ a(
    Mt.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/context-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:focus:*:[svg]:text-accent-foreground tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t
      ),
      ...o
    }
  );
}
function Oh({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Mt.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ a(Rn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Mh({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Mt.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop), keeping
        // submenus on the same above-dock layer as their parent ContextMenuContent (PT-3877)
        "pr-twp tw:min-w-32 tw:origin-(--radix-context-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Xe, ...e },
      ...r
    }
  );
}
function $h({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...n
}) {
  return /* @__PURE__ */ u(
    Mt.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": o,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      checked: r,
      ...n,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Mt.ItemIndicator, { children: /* @__PURE__ */ a(ca, {}) }) }),
        e
      ]
    }
  );
}
function Ih({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  return /* @__PURE__ */ u(
    Mt.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": r,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ a("span", { className: "tw:pointer-events-none tw:absolute tw:end-2", children: /* @__PURE__ */ a(Mt.ItemIndicator, { children: /* @__PURE__ */ a(ca, {}) }) }),
        e
      ]
    }
  );
}
function Ah({
  className: t,
  inset: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Mt.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Ph({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Mt.Separator,
    {
      "data-slot": "context-menu-separator",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Vh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/context-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Lh({ ...t }) {
  return /* @__PURE__ */ a(Be.Root, { "data-slot": "drawer", ...t });
}
function jh({ ...t }) {
  return /* @__PURE__ */ a(Be.Trigger, { "data-slot": "drawer-trigger", ...t });
}
function Cu({ ...t }) {
  return /* @__PURE__ */ a(Be.Portal, { "data-slot": "drawer-portal", ...t });
}
function Bh({ ...t }) {
  return /* @__PURE__ */ a(Be.Close, { "data-slot": "drawer-close", ...t });
}
function Eu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Be.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      ...e
    }
  );
}
function Fh({
  className: t,
  children: e,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle: r = !1,
  ...o
}) {
  const n = fe();
  return /* @__PURE__ */ u(Cu, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ a(Eu, {}),
    /* @__PURE__ */ u(
      Be.Content,
      {
        "data-slot": "drawer-content",
        className: v(
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
function Uh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-header",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start",
        t
      ),
      ...e
    }
  );
}
function Kh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "drawer-footer",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4",
        t
      ),
      ...e
    }
  );
}
function qh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    Be.Title,
    {
      "data-slot": "drawer-title",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Hh({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    Be.Description,
    {
      "data-slot": "drawer-description",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Gh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Yh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-header",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Tu = la(
  "tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        icon: "tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Wh({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Tu({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Xh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-title",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Jh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-description",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function Zh({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-content",
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Qh({
  className: t,
  value: e,
  ...r
}) {
  return /* @__PURE__ */ a(
    Vo.Root,
    {
      "data-slot": "progress",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Vo.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "tw:size-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function tg({ ...t }) {
  const { theme: e = "system" } = dl();
  return /* @__PURE__ */ a(
    wl,
    {
      theme: e === "light" || e === "dark" || e === "system" ? e : "system",
      className: "tw:toaster tw:group",
      icons: {
        success: /* @__PURE__ */ a(sc, { className: "tw:size-4" }),
        info: /* @__PURE__ */ a(ic, { className: "tw:size-4" }),
        warning: /* @__PURE__ */ a(nc, { className: "tw:size-4" }),
        error: /* @__PURE__ */ a(oc, { className: "tw:size-4" }),
        loading: /* @__PURE__ */ a(ac, { className: "tw:size-4 tw:animate-spin" })
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
function eg({
  className: t,
  defaultValue: e,
  value: r,
  min: o = 0,
  max: n = 100,
  ...i
}) {
  const s = fe(), c = Wt.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(e) ? e : [o, n],
    [r, e, o, n]
  );
  return /* @__PURE__ */ u(
    $r.Root,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: r,
      min: o,
      max: n,
      className: v(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        t
      ),
      dir: s,
      ...i,
      children: [
        /* @__PURE__ */ a(
          $r.Track,
          {
            "data-slot": "slider-track",
            className: "tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1",
            children: /* @__PURE__ */ a(
              $r.Range,
              {
                "data-slot": "slider-range",
                className: "tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              }
            )
          }
        ),
        Array.from({ length: c.length }, (l, d) => /* @__PURE__ */ a(
          $r.Thumb,
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
function rg({
  className: t,
  size: e = "default",
  ...r
}) {
  return /* @__PURE__ */ a(
    Lo.Root,
    {
      "data-slot": "switch",
      "data-size": e,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. tw:peer
        // precedes pr-twp here because the peer class must be the first peer-related class for
        // Tailwind's peer selector to work correctly; pr-twp is still present as required.
        "tw:peer pr-twp tw:group/switch tw:relative tw:inline-flex tw:shrink-0 tw:items-center tw:rounded-full tw:border tw:border-transparent tw:transition-all tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-[size=default]:h-[18.4px] tw:data-[size=default]:w-[32px] tw:data-[size=sm]:h-[14px] tw:data-[size=sm]:w-[24px] tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:bg-primary tw:data-unchecked:bg-input tw:dark:data-unchecked:bg-input/80 tw:data-disabled:cursor-not-allowed tw:data-disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ a(
        Lo.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "tw:pointer-events-none tw:block tw:rounded-full tw:bg-background tw:ring-0 tw:transition-transform tw:group-data-[size=default]/switch:size-4 tw:group-data-[size=sm]/switch:size-3 tw:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] tw:rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] tw:dark:data-checked:bg-primary-foreground tw:group-data-[size=default]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 tw:group-data-[size=sm]/switch:data-unchecked:translate-x-0 tw:rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 tw:dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}
function ag({
  className: t,
  orientation: e = "horizontal",
  ...r
}) {
  return /* @__PURE__ */ a(
    le.Root,
    {
      "data-slot": "tabs",
      "data-orientation": e,
      className: v("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col", t),
      ...r
    }
  );
}
const Su = la(
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
function og({
  className: t,
  variant: e = "default",
  ...r
}) {
  const o = fe();
  return /* @__PURE__ */ a(
    le.List,
    {
      "data-slot": "tabs-list",
      "data-variant": e,
      className: v("pr-twp", Su({ variant: e }), t),
      dir: o,
      ...r
    }
  );
}
function ng({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: v(
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
function ig({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    le.Content,
    {
      "data-slot": "tabs-content",
      className: v("pr-twp tw:flex-1 tw:text-sm tw:outline-none", t),
      ...e
    }
  );
}
const sg = (t, e) => {
  W(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function zu(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ru = (t, e, r = {}) => {
  const o = U(e);
  o.current = e;
  const n = U(r);
  n.current = zu(n.current);
  const [i, s] = k(() => o.current), [c, l] = k(!0);
  return W(() => {
    let d = !0;
    return l(!!t), (async () => {
      if (t) {
        const w = await t();
        d && (s(() => w), l(!1));
      }
    })(), () => {
      d = !1, n.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, c];
}, Da = () => !1, cg = (t, e) => {
  const [r] = Ru(
    L(async () => {
      if (!t) return Da;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Da,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  W(() => () => {
    r !== Da && r();
  }, [r]);
};
function lg(t) {
  W(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function dg(t) {
  const e = O(() => Ys(t).slice().sort().join(" "), [t]);
  return O(() => e ? e.split(" ") : [], [e]);
}
const Du = () => {
  const [t, e] = k(
    () => document.body.getBoundingClientRect().height > 0
  );
  return W(() => {
    const r = new IntersectionObserver((o) => {
      const n = o[o.length - 1];
      n && e(n.isIntersecting);
    });
    return r.observe(document.body), () => {
      r.disconnect();
    };
  }, []), t;
};
function Ou(t, e, r) {
  return t ? r.dark : e === void 0 ? r.lightDefault : r.lightUnselected;
}
function wg(t, e) {
  const r = Du();
  return Ou(t, r, e);
}
function Mu(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), o = r.querySelector(":first-child"), n = document.createElement("style");
  n.appendChild(document.createTextNode(t)), e === "top" && o ? r.insertBefore(n, o) : r.appendChild(n);
}
Mu(`/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
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
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-amber-400:oklch(82.8% .189 84.429);--tw-color-amber-500:oklch(76.9% .188 70.08);--tw-color-amber-600:oklch(66.6% .179 58.318);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-50:oklch(98.4% .003 247.858);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-400:oklch(70.4% .04 256.788);--tw-color-slate-500:oklch(55.4% .046 257.417);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-xs:.125rem;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/search{container:search/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:inset-s-3{inset-inline-start:calc(calc(var(--spacing)) * 3)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:inset-e-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:top-full{top:100%}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-1\\/2{left:50%}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:my-auto{margin-block:auto}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-0\\.5{margin-top:calc(calc(var(--spacing)) * .5)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-1{margin-left:calc(calc(var(--spacing)) * 1)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-10{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-80{height:calc(calc(var(--spacing)) * 80)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[260px\\]{height:260px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[400px\\]{height:400px}.tw\\:h-\\[600px\\]{height:600px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-\\[200px\\]{min-height:200px}.tw\\:min-h-full{min-height:100%}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-14{width:calc(calc(var(--spacing)) * 14)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[260px\\]{width:260px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[320px\\]{width:320px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[420px\\]{width:420px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[560px\\]{width:560px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-4{min-width:calc(calc(var(--spacing)) * 4)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:shrink-\\[9999\\]{flex-shrink:9999}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-not-allowed{cursor:not-allowed}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:grid-flow-row{grid-auto-flow:row}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[auto_auto_auto_auto\\]{grid-template-columns:auto auto auto auto}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-nowrap{flex-wrap:nowrap}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-xs{border-radius:var(--tw-radius-xs)}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-destructive{border-color:var(--destructive)}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground,.tw\\:border-muted-foreground\\/40{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-muted-foreground\\/40{border-color:color-mix(in oklab, var(--muted-foreground) 40%, transparent)}}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{background-color:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:bg-accent,.tw\\:bg-accent\\/50{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-accent\\/50{background-color:color-mix(in oklab, var(--accent) 50%, transparent)}}.tw\\:bg-amber-500,.tw\\:bg-amber-500\\/5{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/5{background-color:color-mix(in oklab, var(--tw-color-amber-500) 5%, transparent)}}.tw\\:bg-amber-500\\/15{background-color:var(--tw-color-amber-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-amber-500\\/15{background-color:color-mix(in oklab, var(--tw-color-amber-500) 15%, transparent)}}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted,.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover,.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-primary\\/30{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-primary\\/30{background-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-\\[color-mix\\(in_oklab\\,var\\(--destructive\\)_10\\%\\,var\\(--background\\)\\)\\]{fill:color-mix(in oklab,var(--destructive) 10%,var(--background))}}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-0\\.5{padding-inline:calc(calc(var(--spacing)) * .5)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-4{padding-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pe-\\[…\\]{padding-inline-end:…}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-1{padding-right:calc(calc(var(--spacing)) * 1)}.tw\\:pr-2{padding-right:calc(calc(var(--spacing)) * 2)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-12{padding-bottom:calc(calc(var(--spacing)) * 12)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-sm\\/relaxed{font-size:var(--tw-text-sm);line-height:var(--tw-leading-relaxed)}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-6{--tw-leading:calc(calc(var(--spacing)) * 6);line-height:calc(calc(var(--spacing)) * 6)}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:whitespace-pre{white-space:pre}.tw\\:whitespace-pre-line{white-space:pre-line}.tw\\:whitespace-pre-wrap{white-space:pre-wrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-amber-600{color:var(--tw-color-amber-600)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-foreground{color:var(--foreground)}.tw\\:text-foreground\\!{color:var(--foreground)!important}.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-40{opacity:.4}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:ring-offset-white{--tw-ring-offset-color:var(--tw-color-white)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:placeholder\\:text-slate-400::placeholder{color:var(--tw-color-slate-400)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}.tw\\:focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-within\\:ring-ring:focus-within{--tw-ring-color:var(--ring)}.tw\\:focus-within\\:ring-offset-1:focus-within{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover,.tw\\:hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab, var(--accent) 30%, transparent)}}.tw\\:hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab, var(--accent) 80%, transparent)}}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-slate-400:focus-visible{--tw-ring-color:var(--tw-color-slate-400)}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}.tw\\:focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:transform-\\[translateY\\(1px\\)\\]:active:not([aria-haspopup]){transform:translateY(1px)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=bottom]) .tw\\:in-data-\\[side\\=bottom\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:translate-y-\\[calc\\(-50\\%-1px\\)\\]{--tw-translate-y:calc(-50% - 1px);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=top]) .tw\\:in-data-\\[side\\=top\\]\\:\\[clip-path\\:polygon\\(100\\%_0\\,100\\%_100\\%\\,0_100\\%\\)\\]{clip-path:polygon(100% 0,100% 100%,0 100%)}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-destructive{color:var(--destructive)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-0:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-approved\\)\\][data-state=on]{background-color:var(--inv-soft-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unapproved\\)\\][data-state=on]{background-color:var(--inv-soft-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-soft-unknown\\)\\][data-state=on]{background-color:var(--inv-soft-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-approved\\)\\][data-state=on]{background-color:var(--inv-vivid-approved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unapproved\\)\\][data-state=on]{background-color:var(--inv-vivid-unapproved)}.tw\\:data-\\[state\\=on\\]\\:bg-\\[var\\(--inv-vivid-unknown\\)\\][data-state=on]{background-color:var(--inv-vivid-unknown)}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on]{background-color:var(--muted)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-approved\\)\\][data-state=on]{color:var(--inv-icon-approved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unapproved\\)\\][data-state=on]{color:var(--inv-icon-unapproved)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-icon-unknown\\)\\][data-state=on]{color:var(--inv-icon-unknown)}.tw\\:data-\\[state\\=on\\]\\:text-\\[var\\(--inv-on\\)\\][data-state=on]{color:var(--inv-on)}.tw\\:data-\\[state\\=on\\]\\:text-foreground[data-state=on]{color:var(--foreground)}.tw\\:data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@media (min-width:80rem){.tw\\:xl\\:auto-cols-fr{grid-auto-columns:minmax(0,1fr)}.tw\\:xl\\:grid-flow-col{grid-auto-flow:column}.tw\\:xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:xl\\:grid-cols-none{grid-template-columns:none}.tw\\:xl\\:grid-rows-2{grid-template-rows:repeat(2,minmax(0,1fr))}}@container search not (min-width:7rem){.tw\\:\\@max-\\[7rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[7rem\\]\\/search\\:ps-3{padding-inline-start:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:4rem){.tw\\:\\@max-\\[4rem\\]\\/search\\:hidden{display:none}.tw\\:\\@max-\\[4rem\\]\\/search\\:pe-3{padding-inline-end:calc(calc(var(--spacing)) * 3)}}@container search not (min-width:3rem){.tw\\:\\@max-\\[3rem\\]\\/search\\:ps-0{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\@max-\\[3rem\\]\\/search\\:pe-0{padding-inline-end:calc(calc(var(--spacing)) * 0)}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-amber-400:is(.dark *){color:var(--tw-color-amber-400)}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\]\\:my-0 p{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_s\\]\\:text-destructive s{color:var(--destructive)}.tw\\:\\[\\&_s\\]\\:line-through s{text-decoration-line:line-through}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&_u\\]\\:font-semibold u{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:\\[\\&_u\\]\\:text-success-foreground u{color:var(--success-foreground)}.tw\\:\\[\\&_u\\]\\:no-underline u{text-decoration-line:none}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.tw\\:\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.tw\\:\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--primary)}.tw\\:\\[\\&\\>blockquote\\]\\:my-0>blockquote{margin-block:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--diff-deleted:oklch(57.7% .245 27.325);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--diff-deleted:oklch(70.4% .191 22.216);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`, "after-all");
export {
  mu as APP_TOOLBAR_SHRINK_THRESHOLDS_PX,
  yh as Alert,
  _h as AlertDescription,
  kh as AlertTitle,
  Bd as Avatar,
  Fd as AvatarFallback,
  mp as AvatarImage,
  np as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ip as BOOK_SELECTOR_STRING_KEYS,
  kr as Badge,
  xa as BookChapterControl,
  qa as BookSelectionMode,
  sp as BookSelector,
  G as Button,
  Za as ButtonGroup,
  fn as ButtonGroupSeparator,
  hg as ButtonGroupText,
  fi as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  dp as COMMENT_EDITOR_STRING_KEYS,
  Vd as COMMENT_LIST_ELEMENT_ID,
  wp as COMMENT_LIST_STRING_KEYS,
  cp as CONFLICT_NOTE_STRING_KEYS,
  mi as CancelAcceptButtons,
  Ld as Card,
  jd as CardContent,
  gp as CardDescription,
  fp as CardFooter,
  pp as CardHeader,
  hp as CardTitle,
  yl as ChapterRangeSelector,
  Ni as Checkbox,
  hh as CheckboxGroup,
  yu as Checklist,
  Ko as ComboBox,
  Ae as Command,
  oa as CommandEmpty,
  Ne as CommandGroup,
  aa as CommandInput,
  Ee as CommandItem,
  Pe as CommandList,
  lp as CommentEditor,
  vp as CommentList,
  qd as ConflictNoteCard,
  Nh as ContextMenu,
  $h as ContextMenuCheckboxItem,
  Rh as ContextMenuContent,
  Eh as ContextMenuGroup,
  Dh as ContextMenuItem,
  Ah as ContextMenuLabel,
  Th as ContextMenuPortal,
  zh as ContextMenuRadioGroup,
  Ih as ContextMenuRadioItem,
  Ph as ContextMenuSeparator,
  Vh as ContextMenuShortcut,
  Sh as ContextMenuSub,
  Mh as ContextMenuSubContent,
  Oh as ContextMenuSubTrigger,
  Ch as ContextMenuTrigger,
  rw as DataTable,
  gh as DestructiveKeyConfirmation,
  Oa as Dialog,
  gg as DialogClose,
  Ma as DialogContent,
  fg as DialogDescription,
  Co as DialogFooter,
  $a as DialogHeader,
  mg as DialogOverlay,
  vg as DialogPortal,
  Ia as DialogTitle,
  bg as DialogTrigger,
  fh as DisabledActionTooltip,
  _u as DisabledTooltipWrapper,
  Lh as Drawer,
  Bh as DrawerClose,
  Fh as DrawerContent,
  Hh as DrawerDescription,
  Kh as DrawerFooter,
  Uh as DrawerHeader,
  Eu as DrawerOverlay,
  Cu as DrawerPortal,
  qh as DrawerTitle,
  jh as DrawerTrigger,
  Ve as DropdownMenu,
  De as DropdownMenuCheckboxItem,
  je as DropdownMenuContent,
  mn as DropdownMenuGroup,
  He as DropdownMenuItem,
  nw as DropdownMenuItemType,
  Er as DropdownMenuLabel,
  as as DropdownMenuPortal,
  Gi as DropdownMenuRadioGroup,
  Yi as DropdownMenuRadioItem,
  Ye as DropdownMenuSeparator,
  xg as DropdownMenuShortcut,
  es as DropdownMenuSub,
  os as DropdownMenuSubContent,
  rs as DropdownMenuSubTrigger,
  Le as DropdownMenuTrigger,
  aw as ERROR_DUMP_STRING_KEYS,
  kp as ERROR_POPOVER_STRING_KEYS,
  lw as EditorKeyboardShortcuts,
  Gh as Empty,
  Zh as EmptyContent,
  Jh as EmptyDescription,
  Yh as EmptyHeader,
  Wh as EmptyMedia,
  vh as EmptyState,
  Xh as EmptyTitle,
  ow as ErrorDump,
  _p as ErrorPopover,
  zp as FOOTNOTE_EDITOR_STRING_KEYS,
  Tp as Filter,
  Np as FilterDropdown,
  Ep as Footer,
  Sp as FootnoteEditor,
  Cw as FootnoteItem,
  Rp as FootnoteList,
  uh as INTERFACE_LANGUAGE_PICKER_STRING_KEYS,
  Pp as INVENTORY_STRING_KEYS,
  na as Input,
  ph as InterfaceLanguagePicker,
  Vp as Inventory,
  Aa as Kbd,
  yg as KbdGroup,
  Ct as Label,
  gw as MARKER_MENU_STRING_KEYS,
  yp as MarkdownRenderer,
  vw as MarkerMenu,
  Cp as MoreInfo,
  Wi as MultiSelectComboBox,
  ch as NavigationContentSearch,
  $e as Popover,
  Ji as PopoverAnchor,
  Ie as PopoverContent,
  kg as PopoverDescription,
  _g as PopoverHeader,
  ga as PopoverPortalContainerProvider,
  Ng as PopoverTitle,
  We as PopoverTrigger,
  Qh as Progress,
  Ja as RadioGroup,
  Wr as RadioGroupItem,
  hl as RecentSearches,
  Cg as ResizableHandle,
  Eg as ResizablePanel,
  Tg as ResizablePanelGroup,
  mh as ResultsCard,
  th as SCOPE_SELECTOR_STRING_KEYS,
  tu as SELECT_BOOKS_STRING_KEYS,
  Fr as SHRINK_STEP,
  ru as SHRINK_STEP_HYSTERESIS_PX,
  eh as ScopeSelector,
  Qp as ScriptureResultsViewer,
  rh as ScrollGroupSelector,
  xn as SearchBar,
  sr as Select,
  Qw as SelectBooks,
  Jw as SelectBooksPicker,
  dr as SelectContent,
  Zd as SelectGroup,
  se as SelectItem,
  bp as SelectLabel,
  tw as SelectScrollDownButton,
  Qd as SelectScrollUpButton,
  xp as SelectSeparator,
  lr as SelectTrigger,
  cr as SelectValue,
  _r as Separator,
  ah as SettingsList,
  nh as SettingsListHeader,
  oh as SettingsListItem,
  Uw as SettingsSidebar,
  Zp as SettingsSidebarContentSearch,
  uo as ShrinkStepContext,
  Aw as Sidebar,
  Vw as SidebarContent,
  Up as SidebarFooter,
  ln as SidebarGroup,
  qp as SidebarGroupAction,
  wn as SidebarGroupContent,
  dn as SidebarGroupLabel,
  Fp as SidebarHeader,
  Bp as SidebarInput,
  Pw as SidebarInset,
  Lw as SidebarMenu,
  Hp as SidebarMenuAction,
  Gp as SidebarMenuBadge,
  Fw as SidebarMenuButton,
  jw as SidebarMenuItem,
  Yp as SidebarMenuSkeleton,
  Wp as SidebarMenuSub,
  Jp as SidebarMenuSubButton,
  Xp as SidebarMenuSubItem,
  Iw as SidebarProvider,
  jp as SidebarRail,
  Kp as SidebarSeparator,
  Lp as SidebarTrigger,
  er as Skeleton,
  eg as Slider,
  tg as Sonner,
  Sg as Spinner,
  rg as Switch,
  ou as TAB_TOOLBAR_SHRINK_THRESHOLDS_PX,
  Wa as TabDropdownMenu,
  sh as TabFloatingMenu,
  ih as TabToolbar,
  Oi as TabToolbarContainer,
  to as Table,
  ro as TableBody,
  zg as TableCaption,
  rr as TableCell,
  Rg as TableFooter,
  Xr as TableHead,
  eo as TableHeader,
  Re as TableRow,
  ag as Tabs,
  ig as TabsContent,
  og as TabsList,
  ng as TabsTrigger,
  bh as TextField,
  ap as Textarea,
  gn as ToggleGroup,
  jr as ToggleGroupItem,
  dh as Toolbar,
  pl as ToolbarCompoundLabel,
  Rt as Tooltip,
  Ot as TooltipContent,
  zt as TooltipProvider,
  Dt as TooltipTrigger,
  sw as UNDO_REDO_BUTTONS_STRING_KEYS,
  wh as UiLanguageSelector,
  cw as UndoRedoButtons,
  Mi as VerticalTabs,
  Ii as VerticalTabsContent,
  $i as VerticalTabsList,
  nu as VerticalTabsTrigger,
  xh as WizardStepper,
  Xe as Z_INDEX_ABOVE_DOCK,
  Dg as Z_INDEX_FIRST_RUN,
  vn as Z_INDEX_FOOTNOTE_EDITOR,
  Og as Z_INDEX_MODAL,
  Mg as Z_INDEX_MODAL_BACKDROP,
  Qi as Z_INDEX_OVERLAY,
  $g as badgeVariants,
  Ig as buttonGroupVariants,
  Ag as buttonVariants,
  v as cn,
  Ap as getBookIdFromUSFM,
  up as getCommentThreadElementId,
  wa as getInventoryHeader,
  $p as getLinesFromUSFM,
  Ip as getNumberFromUSFM,
  au as getShrinkStep,
  Rw as getStatusForItem,
  lh as getToolbarOSReservedSpaceClassName,
  Op as inventoryCountColumn,
  Dp as inventoryItemColumn,
  Mp as inventoryStatusColumn,
  Qa as isMacOs,
  Pg as isWindows,
  Ou as pickTabIconUrl,
  Lg as sonner,
  sg as useEvent,
  cg as useEventAsync,
  dg as useExtraValidMarkers,
  Hi as useListbox,
  Ru as usePromise,
  op as useRecentSearches,
  Di as useShrinkStep,
  ul as useShrinkStepValue,
  ua as useSidebar,
  lg as useStylesheet,
  wg as useTabIconSelection,
  ji as useTruncationTooltip,
  Du as useViewVisibility
};
//# sourceMappingURL=index.js.map
